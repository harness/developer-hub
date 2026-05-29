---
id: pod-autoscaler
title: Pod autoscaler
sidebar_label: Pod Autoscaler
description: Scale a Kubernetes workload's replicas up to a target count to test cluster capacity, node autoscaling, scheduling pressure, and rollback behavior.
keywords:
  - chaos engineering
  - pod autoscaler
  - replica scaling
  - cluster autoscaler
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-autoscaler
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-autoscaler
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-autoscaler
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod autoscaler is a Kubernetes pod-level chaos fault that scales a target `Deployment` or `StatefulSet` to a configurable replica count for a fixed duration, then restores the original count when the fault ends. The fault patches the workload's `spec.replicas` field through the Kubernetes API; no container runtime access is required.

Use this fault to test whether your cluster has the capacity to absorb a sudden scale-up: whether the cluster autoscaler reacts in time, whether existing nodes accommodate the new replicas, and whether the application starts cleanly enough to be useful at the larger replica count before the fault rolls back.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Cluster capacity headroom:** When the workload is suddenly scaled up to `REPLICA_COUNT`, does the cluster have enough Ready nodes to schedule the new replicas, or do they sit `Pending`?
- **Node autoscaling reaction time:** If existing nodes cannot fit the new replicas, does the cluster autoscaler add nodes inside your SLO, and does the workload converge before the fault rolls back?
- **Resource budget validation:** Do the workload's CPU and memory requests fit within the available `Allocatable` on the candidate nodes, or do they trip scheduling errors and reveal undersized requests?
- **Startup-time amplification:** When ten replicas start at once, do shared dependencies (database connection pools, central caches, external APIs) survive the thundering herd of fresh connections?
- **Rollback safety:** When the fault scales back to the original replica count, does the controller terminate excess pods gracefully, or do in-flight requests fail during the down-scale?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target workload is Deployment or StatefulSet:** This fault patches `spec.replicas` on a `Deployment` or `StatefulSet`. DaemonSets (which run one pod per node) and bare pods are not supported.
- **Target pods are Running:** The pods you intend to scale are in the `Running` state before the fault is launched. The fault reports a precheck failure otherwise.
- **HPA disabled for the duration:** If a `HorizontalPodAutoscaler` manages the target workload, disable it (or scale its `minReplicas` and `maxReplicas` to bracket your `REPLICA_COUNT`) before running this fault. Otherwise, the HPA fights the fault and may roll back the scale-up mid-experiment.
- **Workload selector defined:** The chaos experiment knows the target workload by kind, namespace, and either names or labels.

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
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Discover the workload's pods and run the chaos pod |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `configmaps` (`""`) | `get`, `list` | Mount configuration into the chaos pod when specified |
| `deployments`, `statefulsets` (`apps`) | `get`, `list`, `patch`, `update` | Patch the target workload's `spec.replicas` and read it back |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |
| `chaosengines`, `chaosexperiments`, `chaosresults` (`litmuschaos.io`) | `get`, `list`, `create`, `patch`, `update`, `delete` | Manage the chaos engine, experiment, and result CRDs |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Pod autoscaler to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REPLICA_COUNT` | Target replica count for the workload during the fault. The original count is restored when the fault ends. | `5` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The workload is held at `REPLICA_COUNT` for this window before being restored. | `60` |

**Common**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Disable HPA during the experiment
If a `HorizontalPodAutoscaler` is attached to the target workload, it will revert this fault's scale-up within one HPA sync interval (15 seconds by default). Either pause the HPA, or scale `minReplicas` and `maxReplicas` so the HPA tolerates the fault's `REPLICA_COUNT` for the duration.
:::

---

## Fault execution in brief

Patches the target workload's `spec.replicas` to the configured target count, holds the workload at that count for the configured duration, then restores the original replica count when the fault ends.

---

## Expected behavior during fault execution

- The target workload's `spec.replicas` is updated to `REPLICA_COUNT`. The deployment or statefulset controller observes the change and creates the additional pods.
- New pods are scheduled wherever the scheduler finds capacity. If existing nodes do not have enough `Allocatable` CPU, memory, or topology slots, the new pods stay `Pending` until the cluster autoscaler adds nodes (if configured) or until you intervene.
- Existing replicas are not disturbed. Their pods continue running with no restarts.
- If the cluster autoscaler is configured, it sees the unschedulable pods and provisions additional nodes within its reaction window (provider-dependent, typically 1 to 5 minutes).
- After the fault duration elapses, `spec.replicas` is patched back to the original value. The deployment or statefulset controller terminates excess pods using its standard rolling strategy.
- Down-scale terminations honor each pod's `terminationGracePeriodSeconds`. Pods receive `SIGTERM` and have their grace window to drain in-flight work.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the workload is restored to its original `spec.replicas`. Excess pods are terminated by the controller; remaining pods continue running unchanged. If new nodes were added by the cluster autoscaler during scale-up, they remain until the autoscaler's scale-down policy reclaims them.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Replica convergence:** Track `kube_deployment_status_replicas_available` against `kube_deployment_spec_replicas` for the target workload. The available count should reach `REPLICA_COUNT` within your acceptable window. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to assert this automatically.
- **Cluster autoscaler reaction:** If you expected the autoscaler to add capacity, track `cluster_autoscaler_unschedulable_pods_count` or the equivalent metric from your provider. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail when the unschedulable count does not drop inside your SLO.
- **Application health at the new scale:** Watch p99 latency, error rate, and the workload's downstream dependencies. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to assert the workload still serves traffic correctly at the larger replica count.

---

## Verify the fault execution effect

While the experiment is running, confirm that the workload is actually scaling:

1. **Watch the workload's replica count.**

   ```bash
   kubectl get deployment -n <namespace> <name> -w
   ```

   The `DESIRED` column should jump to `REPLICA_COUNT` shortly after the fault begins and the `AVAILABLE` column should catch up as new pods become Ready.

2. **List newly created pods.**

   ```bash
   kubectl get pods -n <namespace> -l <workload-label> --sort-by='.metadata.creationTimestamp'
   ```

   Pods created during the fault should appear at the bottom of the list. Their statuses should transition from `Pending` to `Running` to `Ready`.

3. **Inspect scheduling events for any `Pending` pods.**

   ```bash
   kubectl describe pod -n <namespace> <pending-pod-name>
   ```

   The `Events` section reveals why the scheduler could not place the pod: insufficient resources, taint mismatches, or topology violations. If the cluster autoscaler is configured, expect a `TriggeredScaleUp` event shortly after.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the workload's `spec.replicas` is restored to its original value. Excess pods are terminated by the controller using the workload's rolling strategy.
- **Pods stuck `Pending` at fault end:** If new pods were still `Pending` when the fault ended, the rollback terminates the unschedulable pods first (no work in flight) before scaling back to the original count. No manual cleanup is required.
- **Cluster autoscaler nodes remain:** If the autoscaler added nodes during scale-up, those nodes stay until the autoscaler's scale-down policy reclaims them. The default cool-down is typically 10 minutes after the last pod leaves.
- **HPA interference at rollback:** If an HPA is enabled, it may immediately scale back up after the fault restores the original count. Verify the HPA is paused or its bounds match your expectation.
- **Abort the experiment early:** Stopping the experiment from Chaos Studio restores `spec.replicas` to the original value immediately. The down-scale follows the controller's normal rolling rules.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **DaemonSets:** DaemonSets run one pod per node and do not have a `spec.replicas` to patch. Use [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete) or [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain) to disrupt DaemonSet pods.
- **Bare pods (no controller):** Pods without an owner reference cannot be scaled. They are managed individually.
- **Workloads with an active HPA you cannot pause:** The HPA wins. If you cannot pause it, this fault has no useful effect.
- **Custom CRD-based workloads:** This fault patches `apps/v1` `Deployment` and `StatefulSet`. Workloads managed by custom CRDs (Argo Rollouts, Knative, Operator-managed CRDs) are not supported here. Use a Pod delete or controller-specific fault instead.
- **Scale-down testing:** This fault scales **up** to `REPLICA_COUNT` and restores the original count. To test scale-down behavior, run the experiment with `REPLICA_COUNT` set lower than the current replicas, and validate that callers tolerate the reduction.

---

## Troubleshooting

<Troubleshoot
  issue="Pod autoscaler experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are missing RBAC for the chaos service account (specifically the patch verb on deployments/statefulsets), or a PodSecurity admission policy blocking the chaos pod. Confirm the service account has the permissions listed above."
/>

<Troubleshoot
  issue="Pod autoscaler patches the replicas, but new pods never become Ready"
  mode="docs"
  fallback="The new pods are likely stuck Pending due to insufficient cluster capacity. Run kubectl describe pod -n <namespace> <pending-pod-name> to see the scheduler's reason. Common causes: not enough CPU or memory across all Ready nodes, taints without matching tolerations, or topology spread constraints that exclude available nodes. Add capacity, adjust requests, or wait for the cluster autoscaler."
/>

<Troubleshoot
  issue="HPA reverts the replica change immediately after pod-autoscaler runs"
  mode="docs"
  fallback="The HPA observes CPU or memory utilization at the new replica count and decides to scale back down. Before the experiment, either pause the HPA by patching its behavior.scaleDown.selectPolicy to Disabled, set minReplicas to match your REPLICA_COUNT, or remove the HPA for the duration of the experiment."
/>

<Troubleshoot
  issue="Original replica count is not restored when pod-autoscaler ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Patch the workload manually with kubectl scale --replicas=<original> deployment/<name> -n <namespace>. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete): Test recovery from the loss of a single replica rather than capacity for scale-up.
- [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Evict every eligible pod from a node, forcing the cluster to find capacity elsewhere.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Apply CPU pressure to existing replicas to drive HPA-based scale-up instead of patching replicas directly.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
