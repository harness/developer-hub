---
id: node-taint
title: Node taint
sidebar_label: Node Taint
description: Apply a temporary taint to a Kubernetes node to test toleration correctness, scheduling policies, and NoExecute eviction behavior.
keywords:
  - chaos engineering
  - node taint
  - toleration
  - scheduling
  - noschedule
  - noexecute
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-taint
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-taint
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-taint
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node taint is a Kubernetes node-level chaos fault that adds a temporary taint to a target node and removes it again at the end of the fault duration. The taint's `effect` decides what happens: `NoSchedule` keeps new pods off the node, `PreferNoSchedule` makes the scheduler avoid the node when possible, and `NoExecute` evicts every pod on the node that does not have a matching toleration.

Use this fault to validate the toleration story for your workloads: which pods are tagged correctly to land on dedicated node pools, which workloads survive an operator marking a node `NoExecute` for maintenance, and which pods slip through because the right toleration is missing.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Toleration correctness:** Do the workloads you intend to keep on a dedicated node pool (GPU pool, spot pool, regulated workload pool) actually have the matching tolerations, and do unintended workloads stay off?
- **Operator maintenance simulation:** When an operator taints a node with `NoExecute` for maintenance, do critical pods reschedule cleanly, and do pods that should stay (DaemonSets, system pods) tolerate it correctly?
- **Spot or preemptible instance behavior:** When a spot node receives a "going down" taint, do your applications evict quickly enough to gracefully reschedule before the node is reclaimed?
- **`NoSchedule` and capacity planning:** When you reserve a node for a future workload by tainting it `NoSchedule`, does scheduling on other nodes absorb the loss of capacity?
- **PodDisruptionBudget behavior with `NoExecute`:** Unlike `kubectl drain`, a `NoExecute` taint does not respect PDBs. Does your workload notice the violation, and do your alerts fire?
- **Toleration with `tolerationSeconds`:** Do pods that tolerate the taint for a bounded time (`tolerationSeconds`) exit cleanly when their window expires?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Tolerations configured intentionally:** Workloads under test have explicit `tolerations` or explicit absence of tolerations. Running the fault against a cluster where every pod tolerates everything tests nothing.
- **Node selection:** You know which node you intend to taint. Use `TARGET_NODE` to name it explicitly or `NODE_LABEL` to select by label.
- **Chaos infrastructure isolation:** The chaos infrastructure pods either tolerate the taint you are about to apply or are not scheduled on the target node. If they are evicted by your `NoExecute` taint, the experiment loses observability and may fail to remove the taint at the end.

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

This fault is API-driven and does not require host-level access on the target node.

---

## Permissions required

The fault runs under the chaos infrastructure's service account. Because tainting works through the Kubernetes API rather than host-level commands, it needs API permissions to patch the node and (for `NoExecute`) to observe pod eviction.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `nodes` (`""`) | `get`, `list`, `patch`, `update` | Add and remove the taint on the target node |
| `pods` (`""`) | `get`, `list`, `delete` | Observe pod eviction when `effect=NoExecute` |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs from the helper pod for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress and per-pod evictions as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Node taint to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TAINTS` | Taint to apply, in the form `key=value:effect`. `effect` must be one of `NoSchedule`, `PreferNoSchedule`, or `NoExecute`. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration the taint stays on the node before it is removed, in seconds. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODES` | Comma-separated list of node names to taint. Go to [target multiple nodes](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes) to read more. | `""` |
| `NODE_LABEL` | Label selector for choosing target nodes when `TARGET_NODES` is empty. Go to [target nodes with labels](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels) to read more. | `""` |
| `NODES_AFFECTED_PERCENTAGE` | Percentage of nodes (matching the selector) to target. `0` means one node. | `0` |
| `SEQUENCE` | When multiple nodes are targeted, taint `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning NoExecute does not respect PodDisruptionBudgets
A `NoExecute` taint evicts pods directly, bypassing the Eviction API and any `PodDisruptionBudget` you have configured. Use `NoExecute` only when you intend to test what happens when PDB protection is unavailable. To test PDB enforcement, use [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain) instead.
:::

---

## Fault execution in brief

The blast radius depends entirely on which `effect` you pick:

| Effect | What happens to existing pods | What happens to new pods |
| --- | --- | --- |
| `NoSchedule` | Existing pods unaffected. | Scheduler will not place pods that lack a matching toleration. |
| `PreferNoSchedule` | Existing pods unaffected. | Scheduler tries to avoid this node but may still place pods if no alternative exists. |
| `NoExecute` | Pods without a matching toleration are evicted immediately. Pods with a toleration that includes `tolerationSeconds` are evicted when that window expires. | Same as `NoSchedule` for new pods. |

DaemonSet pods that the controller wants to keep on the node typically include a wildcard toleration; this fault does not normally remove them.

---

## Expected behavior during fault execution

- The fault patches the node's `spec.taints` array. The Kubernetes scheduler and the controller-manager react to the change immediately; no helper pod runs on the node itself.
- With `NoExecute`, the eviction is direct. A pod without a matching toleration is evicted on the next reconciliation pass. Unlike `kubectl drain`, no `PodDisruptionBudget` evaluation occurs.
- A pod with a toleration that includes `tolerationSeconds: N` survives for `N` seconds after the taint is applied, then is evicted. This is the same mechanism the default `DefaultTolerationSeconds` admission controller uses to apply `tolerationSeconds: 300` to most pods for the built-in `unreachable` taint, although your `TAINTS` value will not get that default automatically.
- `Deployment` pods are recreated on other Ready nodes. `StatefulSet` pods that share identity remain `Terminating` until the slot is reclaimed.
- DaemonSet pods are rarely affected because their controllers typically attach tolerations that match every common chaos taint.
- The node is never marked `NotReady` by this fault. The kubelet keeps running normally; only scheduling and eviction policies change.

:::info Taint, not drain
This fault is a thin wrapper around `kubectl taint`. It does not cordon, does not respect PDBs, and (for `NoSchedule`) does not move any existing pod. Use [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain) when you want the full planned-maintenance semantic.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state:** Run `kubectl describe node <name> | grep -A2 Taints` to confirm the taint is on the node, then `kubectl get pods --field-selector spec.nodeName=<name> -o wide -w` to track eviction (for `NoExecute`). Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to validate that the right pods stay and the wrong pods leave.
- **Application service-level indicators:** For `NoExecute`, watch error rate and request availability for the evicted workloads. The signal that matters is whether replicas elsewhere absorbed the traffic. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **Scheduler and admission metrics:** Track `scheduler_pending_pods` and `kube_pod_status_reason{reason="Evicted"}`. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when unexpected pods are evicted or when scheduling latency exceeds your ceiling.

---

## Verify the fault execution effect

While the experiment is running, confirm that the taint is in place and behaving as expected. From a workstation with `kubectl` access:

1. **Confirm the taint is on the node.**

   ```bash
   kubectl describe node <target-node> | grep -A2 Taints
   ```

   You should see the `TAINTS` value listed under `Taints`. After the fault ends, the same command should show only the cluster's default taints (or none).

2. **For `NoSchedule`, attempt to schedule a pod without the toleration.**

   ```bash
   kubectl run noschedule-probe --image=busybox --restart=Never \
     --overrides='{"spec":{"nodeName":"<target-node>"}}' -- echo hi
   ```

   The pod should fail with a scheduling event citing the taint.

3. **For `NoExecute`, watch pods leave the node.**

   ```bash
   kubectl get pods --field-selector spec.nodeName=<target-node> -o wide -w
   ```

   Pods without matching tolerations should disappear shortly after the taint is applied; pods that tolerate it should remain.

4. **Check eviction events.**

   ```bash
   kubectl get events --field-selector reason=TaintManagerEviction -A
   ```

   For `NoExecute`, the controller-manager records one event per evicted pod.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the chaos infrastructure removes the taint. The scheduler resumes placing pods on the node normally.
- **Evicted pods (NoExecute only) do not migrate back:** Pods that were evicted during the fault stay on the replacement nodes the scheduler placed them on.
- **Pods stuck `Pending`:** If the right tolerations are missing on every other node, evicted pods may stay `Pending` until you uncordon, add capacity, or restore the toleration.
- **If the chaos infrastructure crashes mid-experiment:** The taint may remain past `TOTAL_CHAOS_DURATION`. Remove it manually:

  ```bash
  kubectl taint node <target-node> <key>=<value>:<effect>-
  ```

  Note the trailing `-`, which signals removal.

- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. The chaos infrastructure removes the taint and stops the experiment.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Co-located chaos infrastructure with `NoExecute`:** If chaos infrastructure pods are scheduled on the tainted node and do not tolerate the taint, they get evicted along with everything else and the fault loses observability. Add the matching toleration to chaos infrastructure, or schedule it on a different node.
- **Workloads with wildcard tolerations:** Pods with `tolerations: - operator: Exists` tolerate every taint and will not respond to this fault. The experiment will produce no observable effect on them.
- **Single-node clusters with `NoExecute`:** Eviction has no other node to place pods on. Every workload that lacks the toleration becomes `Pending` for the entire fault duration.
- **Production critical nodes without staged rollout:** A `NoExecute` taint on a node hosting many critical workloads triggers a thundering herd of reschedules. Test on a non-critical node first, or use `NoSchedule` to test toleration logic without eviction.

---

## Troubleshooting

<Troubleshoot
  issue="Node taint fault completes but no pods were evicted on a NoExecute taint in Harness Chaos Engineering"
  mode="docs"
  fallback="Most likely every pod on the node either tolerates the taint or is a DaemonSet pod that the controller protects. Verify with kubectl get pods --field-selector spec.nodeName=<target-node> -o wide and inspect each pod's tolerations with kubectl get pod <name> -o jsonpath='{.spec.tolerations}'. Wildcard tolerations (operator: Exists) match every taint and prevent eviction by design."
/>

<Troubleshoot
  issue="TAINTS value is rejected with an admission error during node-taint"
  mode="docs"
  fallback="The TAINTS value must be in the form key=value:effect, and effect must be one of NoSchedule, PreferNoSchedule, or NoExecute. The key must follow Kubernetes label naming rules (DNS subdomain). Common mistakes: missing colon, lowercase effect names, or special characters in the key. Example of a valid value: chaos=test:NoExecute."
/>

<Troubleshoot
  issue="Taint remains on the node after node-taint completes"
  mode="docs"
  fallback="The chaos infrastructure failed to issue the remove-taint request, usually because the infrastructure pods themselves were evicted by the NoExecute taint they applied. Remove the taint manually with kubectl taint node <target-node> <key>=<value>:<effect>- (note the trailing minus). For future runs, either use a smaller effect or add the matching toleration to the chaos infrastructure."
/>

<Troubleshoot
  issue="Critical pods are evicted during node-taint with NoExecute, including pods that should have tolerated"
  mode="docs"
  fallback="Either the toleration on those pods does not match the TAINTS value exactly (key, value, effect, and operator must all align), or they have tolerationSeconds set and the seconds have elapsed. Verify the toleration with kubectl get pod <name> -o jsonpath='{.spec.tolerations}' and compare each field against the taint."
/>

<Troubleshoot
  issue="Newly created pods do not get scheduled on the tainted node after the taint is removed"
  mode="docs"
  fallback="The scheduler reacts to taint changes on its next sync cycle. Allow a few seconds for the scheduler to re-evaluate. If pods remain Pending, check kubectl describe pod <name> for scheduling hints; the issue is usually unrelated to the chaos taint and points at other constraints (resource requests, affinity, other taints)."
/>

---

## Related faults

- [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Cordons and evicts respecting PDBs. Use it for graceful planned-maintenance testing.
- [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart): Triggers the built-in `unreachable` taint by stopping the kubelet entirely. Use it to test sudden node loss.
- [Pod delete](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-delete): Deletes individual pods directly without changing node state.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
