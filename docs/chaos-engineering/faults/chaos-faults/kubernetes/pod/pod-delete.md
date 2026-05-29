---
id: pod-delete
title: Pod delete
sidebar_label: Pod Delete
description: Delete one or more pods of a Kubernetes workload to test replica availability, controller recovery, graceful termination, and disruption budgets.
keywords:
  - chaos engineering
  - pod delete
  - pod failure
  - kubernetes pod fault
  - lifecycle chaos
tags:
  - chaos-engineering
  - pod-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-delete
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-delete
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-delete
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod delete is a Kubernetes pod-level chaos fault that removes one or more pods of a target workload through the Kubernetes API. The pod's controller (Deployment, StatefulSet, DaemonSet, ReplicaSet, Rollout, or DeploymentConfig) is expected to detect the missing replica and create a replacement.

Use this fault to verify how quickly a workload absorbs the loss of a replica: whether request volume is preserved by the remaining replicas, whether the new pod starts and becomes Ready inside your SLO, and whether downstream consumers degrade gracefully while the replacement comes up.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Replica availability:** Does the workload stay above its minimum-available threshold while a replica is recreated, or does the loss of one pod tip it into partial outage?
- **Graceful termination:** When `FORCE` is `false`, do your application's `preStop` hooks, `terminationGracePeriodSeconds`, and connection-draining logic run to completion?
- **PodDisruptionBudget compliance:** Does the eviction respect any `PodDisruptionBudget` you have configured, and how does the controller behave when the PDB blocks the deletion?
- **Leader-election in clustered apps:** For workloads that elect a leader (etcd, Redis Sentinel, Kafka controllers), does the cluster re-elect within your SLO when the current leader pod is deleted?
- **Stateful recovery:** For `StatefulSet` pods backed by persistent storage, do volume detachment and reattachment complete within an acceptable window, and does the application catch up on replay or replication state?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The pods you intend to delete are in the `Running` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Workload selector defined:** The chaos experiment knows the target workload (`Deployment`, `StatefulSet`, `DaemonSet`, `Rollout`, etc.) by kind, namespace, and either names or labels. The fault scopes deletion to pods owned by the selected workload.
- **PodDisruptionBudget awareness:** If the target workload is covered by a PDB, plan the experiment so the deletion does not permanently block the PDB. The fault retries through the standard eviction path; a PDB that allows zero disruptions makes the experiment fail.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EKS | Supported |
| Azure AKS | Supported |
| Google GKE | Supported |
| GKE Autopilot | Supported with [Autopilot setup](/docs/resilience-testing/chaos-testing/gke-autopilot) |
| Red Hat OpenShift | Supported |
| Rancher | Supported |
| VMware Tanzu | Supported |
| Self-managed Kubernetes (CNCF-certified) | Supported |

---

## Permissions required

The fault runs under the chaos infrastructure's service account.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Resolve target pods and delete them |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `configmaps` (`""`) | `get`, `list` | Mount configuration into the chaos pod when specified |
| `deployments`, `statefulsets`, `replicasets`, `daemonsets` (`apps`) | `get`, `list` | Resolve the parent controller for each target pod |
| `replicationcontrollers` (`""`) | `get`, `list` | Resolve the parent controller for legacy workloads |
| `deploymentconfigs` (`apps.openshift.io`) | `get`, `list` | Resolve the parent controller on OpenShift |
| `rollouts` (`argoproj.io`) | `get`, `list` | Resolve the parent controller for Argo Rollouts |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |
| `chaosengines`, `chaosexperiments`, `chaosresults` (`litmuschaos.io`) | `get`, `list`, `create`, `patch`, `update`, `delete` | Manage the chaos engine, experiment, and result CRDs |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Pod delete to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The fault iterates pod deletions across this window. | `30` |
| `CHAOS_INTERVAL` | Time between successive deletion iterations in seconds. Can be a fixed value or a range like `5-10` when `RANDOMNESS` is enabled. | `10` |
| `FORCE` | Deletion mode. `true` deletes with `gracePeriodSeconds=0` (immediate). `false` issues a graceful delete and waits for `terminationGracePeriodSeconds`. | `false` |
| `RANDOMNESS` | When `true`, picks a random interval within the bounds of `CHAOS_INTERVAL`. | `false` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to delete. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to delete in each iteration. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, delete `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Common**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Forceful deletion bypasses graceful shutdown
With `FORCE: true`, the pod is removed from the API immediately and the kubelet never sends `SIGTERM` to your container. In-flight requests are dropped, `preStop` hooks do not run, and connections are not drained. Use `FORCE: false` to validate graceful-shutdown paths.
:::

---

## Fault execution in brief

Deletes one or more pods of the target workload through the Kubernetes API at the configured interval, either gracefully (honoring `terminationGracePeriodSeconds`) or forcefully (immediate deletion with no shutdown signal).

---

## Expected behavior during fault execution

- The selected pod (or pods) enter the `Terminating` state. With `FORCE: false`, the kubelet sends `SIGTERM` and waits up to the pod's `terminationGracePeriodSeconds`; with `FORCE: true`, the pod is removed immediately from the API.
- The pod's controller (Deployment, StatefulSet, DaemonSet, ReplicaSet, Rollout, DeploymentConfig) observes the missing replica and creates a replacement on a Ready node.
- For `Deployment` and `ReplicaSet`, the replacement is scheduled wherever the scheduler finds capacity. For `StatefulSet`, the replacement waits for the previous pod's PVC to detach before binding.
- Service endpoints for the deleted pod are removed from the relevant `EndpointSlice` once the kubelet acknowledges the deletion. Existing in-flight connections terminate or drain depending on the application.
- HPA controllers do not react to deletions directly; they react to whatever resource utilization shift the deletion causes on the remaining replicas.
- If the target workload is covered by a `PodDisruptionBudget` that is already at its disruption threshold, the eviction request returns `429 Too Many Requests` and the fault iteration retries.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, no further deletions are issued. Replicas that were recreated during the fault remain in their new locations; the fault does not migrate them back.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Application availability:** Watch error rate and request volume for the workload during the fault. A spike in 5xx (or dropped requests) signals that traffic shifting did not keep up with deletion. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **Replica recovery:** Track `kube_deployment_status_replicas_available` (or the equivalent for your workload kind). It should return to its declared target within your acceptable recovery window. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to assert this automatically.
- **Eviction events:** Look for `kubelet` events with reason `Killing` and controller events such as `SuccessfulCreate`. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the expected events do not appear.

---

## Verify the fault execution effect

While the experiment is running, confirm that pods are actually being deleted and recreated:

1. **Watch the target workload's pods.**

   ```bash
   kubectl get pods -n <namespace> -l <workload-label> -w
   ```

   You should see pods transition through `Terminating` and new pods appear with fresh names. The total `Running` count should stabilize back at the declared replicas of the workload.

2. **Check the workload's available-replica count.**

   ```bash
   kubectl get deployment -n <namespace> <name>
   ```

   The `AVAILABLE` column should briefly drop below `DESIRED` during each iteration, then recover. If it stays below for the full fault duration, the replacement pods are failing to start.

3. **Inspect Kubernetes events.**

   ```bash
   kubectl get events -n <namespace> --sort-by='.lastTimestamp' | tail -20
   ```

   Expect `Killing`, `SuccessfulCreate`, and `Started` events around each iteration. Lack of `SuccessfulCreate` typically points to a PDB block or insufficient node capacity.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the fault stops issuing deletions. The workload converges to its declared replica count as soon as the most recent replacement becomes Ready.
- **Replicas land on different nodes:** Replacement pods are scheduled wherever the scheduler finds capacity. They do not return to their original nodes unless `nodeAffinity` or topology spread constraints force them to.
- **`Pending` replacements:** If your cluster lacks capacity (no Ready nodes with sufficient CPU, memory, or volume topology), replacement pods sit in `Pending`. The cluster autoscaler should add capacity if configured; otherwise, free resources before the workload converges.
- **PDB blocks:** If a `PodDisruptionBudget` rejects the eviction, the fault retries that pod on the next iteration. If the PDB blocks every attempt, the fault reports a failure at the end of `TOTAL_CHAOS_DURATION`.
- **Abort the experiment early:** Stopping the experiment from Chaos Studio prevents any further deletion. Already-deleted pods proceed through their normal controller-driven replacement.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Unmanaged (bare) pods:** Pods not owned by any controller (no `OwnerReferences`) are deleted and never recreated. The fault still succeeds, but the workload is permanently down until you redeploy.
- **Single-replica workloads where any disruption is unacceptable:** If the workload has `replicas: 1` and no failover mechanism, the deletion guarantees an outage for at least the pod's start-up time. Use this knowledge intentionally rather than accidentally.
- **Pods with `tolerationSeconds: 0` on the unreachable taint:** These pods are designed to be evicted instantly when their node is unhealthy and rarely need this fault to test deletion paths.
- **StatefulSets with `OrderedReady` pod-management and tight startup probes:** Recreating a deleted pod can block the rolling order. Validate that downstream pods do not deadlock waiting for the deleted index to become Ready.

---

## Troubleshooting

<Troubleshoot
  issue="Pod delete experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the experiment namespace's nodes, missing RBAC for the chaos service account, or a PodSecurity admission policy blocking the chaos pod. Confirm the service account has the permissions listed above and the chaos namespace has the required Pod Security level."
/>

<Troubleshoot
  issue="Pod delete runs but the workload's replica count does not recover"
  mode="docs"
  fallback="The replacement pods are failing to start. Run kubectl describe pod -n <namespace> <new-pod-name> and look for ImagePullBackOff, CrashLoopBackOff, or volume-attach failures. For StatefulSets, also check whether the previous pod's PVC has detached. A PodDisruptionBudget at its threshold can also block subsequent deletions; verify with kubectl get pdb."
/>

<Troubleshoot
  issue="Pod delete reports a PodDisruptionBudget block in Harness Chaos Engineering"
  mode="docs"
  fallback="The target workload is covered by a PDB that does not allow further disruptions. Run kubectl get pdb -n <namespace> to inspect minAvailable and currentHealthy. Wait for the workload to recover, raise the PDB threshold for the duration of the experiment, or lower POD_AFFECTED_PERCENTAGE so fewer pods are evicted per iteration."
/>

<Troubleshoot
  issue="Graceful deletion did not wait for preStop hooks or terminationGracePeriodSeconds"
  mode="docs"
  fallback="Check that FORCE is set to false. With FORCE: true, the API server removes the pod immediately and the kubelet never invokes preStop or honors the grace period. Set FORCE to false to validate graceful-shutdown paths, and verify terminationGracePeriodSeconds is set high enough on the pod spec for your preStop hook to complete."
/>

---

## Related faults

- [Container kill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/container-kill): Kill one container inside a pod instead of deleting the whole pod.
- [Pod autoscaler](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-autoscaler): Scale a workload's replicas up or down to test capacity and autoscaling.
- [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Evict every eligible pod from a node, exercising the same recovery path at node scale.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
