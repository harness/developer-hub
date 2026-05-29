---
id: node-drain
title: Node drain
sidebar_label: Node Drain
description: Cordon and drain a Kubernetes node using the Eviction API to test PodDisruptionBudget enforcement, graceful shutdown, and rescheduling behavior.
keywords:
  - chaos engineering
  - node drain
  - pod eviction
  - pdb
  - graceful shutdown
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-drain
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-drain
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-drain
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node drain is a Kubernetes node-level chaos fault that cordons a target node and evicts every pod on it using the Kubernetes Eviction API. The node is marked `Unschedulable` so the scheduler stops placing new pods on it, and existing pods are evicted one by one, respecting any `PodDisruptionBudget` you have configured. At the end of the fault duration, the node is uncordoned and rejoins the schedulable pool.

Use this fault to simulate planned operations that touch a node: a rolling Kubernetes upgrade, hardware refresh, OS patching, cluster autoscaler scale-down, or an operator pulling a node out of rotation for maintenance.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **PodDisruptionBudget correctness:** Does your PDB prevent the drain from evicting too many replicas at once, or is the budget set too loose to protect availability?
- **Graceful shutdown handling:** Do application pods drain in-flight requests, flush in-memory state, and signal readiness=false within their `terminationGracePeriodSeconds`?
- **StatefulSet behavior on drain:** Do StatefulSet pods with PVCs reschedule cleanly on another node, or do they get stuck waiting on volume detachment?
- **Topology and anti-affinity correctness:** When pods reschedule, do they spread correctly across zones, racks, or other failure domains as your `topologySpreadConstraints` and anti-affinity rules dictate?
- **Cluster capacity headroom:** Is there enough room on the remaining nodes to absorb the drained pods, or does the cluster need autoscaling intervention you have not budgeted for?
- **Operator and controller resilience:** Do your operators (cert-manager, ingress controllers, custom controllers) reconcile cleanly when their pods are moved?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **PDBs configured on critical workloads:** Without PDBs, every replica on the target node can be evicted simultaneously. PDBs are the protection mechanism this fault tests.
- **Application graceful shutdown:** Workloads under test handle `SIGTERM` and flush state within `terminationGracePeriodSeconds`. Otherwise the eviction is graceless and the test outcome is a forced kill, not a planned drain.
- **Node selection:** You know which node you intend to drain. Use `TARGET_NODE` to name it explicitly or `NODE_LABEL` to select by label.
- **Chaos infrastructure isolation:** The chaos infrastructure pods are not scheduled on the node you are about to drain. If they are evicted along with everything else, the fault loses observability and may fail to uncordon at the end.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EKS | Supported |
| Azure AKS | Supported |
| Google GKE | Supported |
| Red Hat OpenShift | Supported |
| Rancher | Supported |
| VMware Tanzu | Supported |
| Self-managed Kubernetes (CNCF-certified) | Supported |
| GKE Autopilot | Not supported (Autopilot does not expose nodes you can cordon or drain; only Node Network Loss and Node Network Latency are allowlisted, see [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot)) |

This fault is API-driven and does not require host-level access on the target node.

---

## Permissions required

The fault runs under the chaos infrastructure's service account. Because node-drain works through the Kubernetes Eviction API rather than host-level commands, it needs API permissions to cordon nodes and evict pods.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `nodes` (`""`) | `get`, `list`, `patch`, `update` | Cordon and uncordon the target node by patching `spec.unschedulable` |
| `pods` (`""`) | `get`, `list`, `delete`, `deletecollection` | List pods on the target node and create eviction requests |
| `pods/eviction` (`"policy"`) | `create` | Issue eviction requests that respect PodDisruptionBudgets |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress and per-pod evictions as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope, for example a namespace-scoped install where you have removed cluster-wide node access.

---

## Fault tunables

Configure the following fault parameters when you add Node drain to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration the node stays cordoned before it is uncordoned, in seconds. | `60` |
| `FORCE` | Drain the node even when it has non-controller-managed pods (static pods, mirror pods, or pods that are not part of a Deployment, ReplicaSet, StatefulSet, or DaemonSet). When `false`, the drain aborts if such pods exist. | `true` |
| `DRAIN_TIMEOUT` | Time (in seconds) the drain command waits for evictions to complete before giving up. Acts as the `--timeout` flag passed to `kubectl drain`. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODE` | Name of the node to drain. | `""` |
| `NODE_LABEL` | Label selector for choosing the target node when `TARGET_NODE` is not set. Go to [target nodes with labels](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels) to read more. | `""` |
| `NODES_AFFECTED_PERCENTAGE` | Percentage of nodes (matching the label selector) to drain. `0` means one node. | `0` |
| `SEQUENCE` | When multiple nodes are targeted, drain `parallel` (all at once) or `serial` (one after another). Use `serial` to mimic a rolling upgrade. | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Without PDBs, every replica on the node is evicted at once
A drain treats every pod individually. If you have not configured a `PodDisruptionBudget` for the workloads on the target node, all of their replicas on that node can be evicted simultaneously. PDB protection is the whole point of this experiment; configure it before you run.
:::

---

## Fault execution in brief

Cordons the target node and evicts all eligible (non-DaemonSet) pods through the Kubernetes Eviction API for the configured duration, so workloads must reschedule onto other nodes; the node is uncordoned automatically at the end of the fault.

The drain has three distinct stages that the API server orchestrates:

| Stage | What happens |
| --- | --- |
| Cordon | The node's `spec.unschedulable` is set to `true`. The scheduler stops placing new pods on it; existing pods are not affected yet. |
| Evict | An `Eviction` API request is issued for every non-DaemonSet pod on the node. The API server consults the relevant PDB before allowing each eviction. |
| Uncordon | At the end of `TOTAL_CHAOS_DURATION`, the node's `spec.unschedulable` is set back to `false`. New pods can be scheduled on it again. Already-evicted pods do not migrate back automatically. |

DaemonSet pods are not evicted, since their controller would immediately recreate them on the same node.

---

## Expected behavior during fault execution

- The eviction is graceful: each pod receives `SIGTERM` and has up to `terminationGracePeriodSeconds` (default 30 seconds) to exit cleanly. After that window, the kubelet sends `SIGKILL`.
- A pod's controller (Deployment, ReplicaSet, StatefulSet) is what recreates it after eviction. For Deployment and ReplicaSet, the new pod is scheduled wherever the scheduler finds capacity. For StatefulSet, the new pod waits for the previous pod's PVC to detach, which can introduce a delay.
- If a PDB cannot accommodate any more disruptions, the eviction request returns `429 Too Many Requests`. The chaos infrastructure retries; the pod stays running until the PDB allows the eviction.
- Pods with `hostPath` storage, local persistent volumes, or strict node affinity that pins them to the target node cannot reschedule and will remain `Pending` until the node is uncordoned (or until you remove the affinity).
- Pods controlled by DaemonSets are skipped during drain. The DaemonSet controller leaves them in place since they are expected to run on every node.

:::info Drain is not the same as delete
A drain is graceful and respects PDB. To test what happens when the node disappears suddenly, use [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart) or simulate the partition with [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss). The pod-eviction paths are different.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state:** Run `kubectl get pod -o wide -w` and `kubectl get pdb -A` during the drain. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to validate that the workload's `availableReplicas` never drops below the PDB minimum.
- **Application service-level indicators:** Watch error rate and request availability for the workload whose pods are being evicted. The signal that matters is whether traffic continued to flow during the drain. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health throughout the experiment.
- **Eviction and scheduler metrics:** Track `kube_pod_status_reason{reason="Evicted"}` (should not include unexpected pods), `kube_poddisruptionbudget_status_current_healthy`, and pod scheduling latency. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when a PDB violation occurs or when reschedule latency exceeds your ceiling.

---

## Verify the fault execution effect

While the experiment is running, confirm that the drain is actually progressing. From a workstation with `kubectl` access:

1. **Confirm the node is cordoned.**

   ```bash
   kubectl get node <target-node> -o jsonpath='{.spec.unschedulable}'
   ```

   Output should be `true` while the fault is active and `false` after it ends.

2. **Watch pod eviction in real time.**

   ```bash
   kubectl get pods --field-selector spec.nodeName=<target-node> -o wide -w
   ```

   Expect to see pods transition to `Terminating` and then disappear. DaemonSet pods remain on the node.

3. **Look for `Evicted` events and PDB-related rejections.**

   ```bash
   kubectl get events -A --field-selector reason=Evicted -w
   kubectl get events -A | grep -i 'disruption'
   ```

   `Cannot evict pod as it would violate the pod's disruption budget` is the message the API server emits when a PDB blocks the eviction.

4. **Confirm the workload availability stayed above the PDB minimum.**

   ```bash
   kubectl get deployment <name> -o jsonpath='{.status.availableReplicas}'
   kubectl get pdb <name> -o jsonpath='{.status.currentHealthy} {.status.desiredHealthy}'
   ```

   `currentHealthy` should stay greater than or equal to `desiredHealthy` throughout the drain.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the chaos infrastructure uncordons the node. New pods can be scheduled on it again.
- **Evicted pods do not migrate back:** Pods that were evicted during the fault stay on the replacement nodes the scheduler placed them on. They are not moved back to the recovered node.
- **Pods stuck in `Pending`:** If your cluster lacks capacity on other Ready nodes, evicted pods may remain `Pending` until either the cluster autoscaler adds capacity or you uncordon manually with `kubectl uncordon <node>`.
- **StatefulSet pods stuck `Terminating`:** A StatefulSet pod can stay `Terminating` if its PVC is taking a long time to detach. Force-delete to release the slot:

  ```bash
  kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
  ```

- **If the chaos infrastructure crashes mid-experiment:** The node may stay cordoned past `TOTAL_CHAOS_DURATION`. Uncordon manually:

  ```bash
  kubectl uncordon <target-node>
  ```

- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. The chaos infrastructure uncordons the node and stops issuing eviction requests.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** These environments either do not expose nodes you can cordon or apply their own scheduling controls that override drain semantics.
- **Workloads without PDBs that you cannot tolerate losing:** Without a PDB, every replica on the node can be evicted at the same time. If a workload cannot survive that, configure a PDB before running.
- **Pods pinned to the target node:** Pods with `hostPath` volumes, local PVs, or strict node affinity to the target node cannot reschedule. They remain `Pending` for the duration of the fault.
- **Single-node clusters:** Drain has no other node to reschedule to. Every workload becomes `Pending` for the entire duration.
- **Co-located chaos infrastructure:** If the chaos infrastructure pods live on the node being drained, the experiment may fail to uncordon at the end. Schedule chaos infrastructure on a node outside the blast radius.

---

## Troubleshooting

<Troubleshoot
  issue="Node drain fault completes successfully but pods on the target node were not evicted in Harness Chaos Engineering"
  mode="docs"
  fallback="The most common cause is that all the pods on the node are DaemonSet-managed, which the Eviction API does not touch. Confirm with kubectl get pods --field-selector spec.nodeName=<target-node> -o wide and check the OWNER column. If the only pods were DaemonSets, the fault behaved correctly. Choose a node with workload pods to test eviction."
/>

<Troubleshoot
  issue="PodDisruptionBudget blocks eviction and the node-drain experiment makes no progress"
  mode="docs"
  fallback="A PDB that requires more healthy replicas than the cluster currently has prevents the API server from allowing any eviction. Check kubectl get pdb -A -o wide and look at the ALLOWED DISRUPTIONS column. If it is zero, either scale the workload up first (so the PDB allows one disruption) or relax minAvailable on the PDB for the experiment."
/>

<Troubleshoot
  issue="Target node remains cordoned (Unschedulable) after node-drain completes"
  mode="docs"
  fallback="The chaos infrastructure failed to issue the uncordon request, usually because the chaos infrastructure pods were themselves evicted or crashed. Uncordon manually with kubectl uncordon <target-node>, then verify scheduling resumes with kubectl describe node <target-node>. Schedule chaos infrastructure on a node outside the blast radius for future runs."
/>

<Troubleshoot
  issue="Pods stuck in Pending after node-drain because no other node has capacity"
  mode="docs"
  fallback="The cluster lacks Ready-node capacity to absorb the drained workload. If you run a cluster autoscaler, check its logs for scale-up attempts; if not, this is a capacity planning gap the experiment surfaced. Either uncordon the original node so pods can return, or add capacity manually."
/>

<Troubleshoot
  issue="StatefulSet pods stay Terminating after eviction during node-drain"
  mode="docs"
  fallback="The StatefulSet pod is waiting on PVC detachment or its finalizer to complete. Force-delete with kubectl delete pod <name> -n <namespace> --force --grace-period=0, then confirm the PVC is released and the new pod can attach. Investigate the storage driver's logs if this happens repeatedly."
/>

---

## Related faults

- [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart): Tests the same rescheduling logic but with no graceful eviction; the node disappears and comes back. Use it to test the cluster's reaction to a hard reboot rather than a planned drain.
- [Node taint](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-taint): Adds a taint to the node, optionally with the `NoExecute` effect that evicts non-tolerating pods. Use it to test scheduling-policy enforcement without a full drain.
- [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete): Deletes individual pods to test workload-level resilience without involving the node.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
