---
id: node-memory-hog
title: Node memory hog
sidebar_label: Node Memory Hog
description: Exhaust memory on a Kubernetes node to test kubelet eviction order, QoS-based pod prioritization, OOM behavior, and noisy-neighbor isolation.
keywords:
  - chaos engineering
  - node memory hog
  - memory pressure
  - oom
  - eviction
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - resource-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-memory-hog
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-memory-hog
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node memory hog is a Kubernetes node-level chaos fault that consumes a configurable share of a target node's memory. Harness Chaos Engineering schedules a privileged helper pod (`harness/chaos-ddcr-faults`) on the node, which runs Linux `stress-ng` VM workers that allocate and touch memory pages. As free memory drops, the kubelet's eviction thresholds trip and pods are evicted in QoS order: `BestEffort` first, then `Burstable` (the pods that exceed their request the most), then `Guaranteed` only as a last resort.

Use this fault to simulate a memory-leak neighbor: a runaway batch process, a JVM heap that grew past its node-level budget, or a container that ignores its memory limit and consumes whatever the kernel gives it.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **QoS-based eviction order:** When the kubelet starts evicting, do `Guaranteed` workloads stay protected while `BestEffort` and over-quota `Burstable` pods are reclaimed first?
- **Pod priority and preemption:** Does pod priority correctly influence which workloads survive an eviction sweep?
- **HPA and VPA reactions:** When the memory footprint of a service grows because the node is under pressure, do autoscaling controllers add capacity in time?
- **OOM kill behavior at the container level:** Does the application restart cleanly after an OOM kill, or does it leave behind leaked state (open file handles, half-written files, orphaned children)?
- **Restart-loop and crash-loop containment:** Does a single OOM kill stay contained, or does it cascade into a `CrashLoopBackOff` because the new pod immediately hits the same constraint?
- **Memory-leak detection in monitoring:** Do your alerts fire on the right signal (working set growth, eviction rate, OOM count), and at the right severity?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. The helper pod runs the memory workers against the host.
- **Container runtime socket:** The chaos infrastructure has access to the container runtime socket on the target nodes. The default `containerd` socket path is mounted automatically.
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Workloads have memory requests and limits:** Without memory requests, the kubelet cannot reason about QoS class, every pod is treated as `BestEffort`, and the experiment observes generic eviction noise rather than meaningful prioritization.
- **Chaos infrastructure isolation:** The target nodes are not single points of failure for the chaos infrastructure itself. If chaos control-plane pods are scheduled on the saturated node and end up evicted, the experiment loses observability.

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

---

## Permissions required

The fault runs under the chaos infrastructure's service account. The account must be able to perform the following operations against the target cluster.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Create the helper pod that runs the memory workers on the target node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs from the helper pod for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress and any pod evictions as Kubernetes events |
| `nodes` (`""`) | `get`, `list` | Discover target nodes and validate selectors |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Node memory hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MEMORY_CONSUMPTION_PERCENTAGE` | Memory to consume as a percentage of the node's total capacity. When non-zero, it takes precedence over `MEMORY_CONSUMPTION_MEBIBYTES`. | `0` |
| `MEMORY_CONSUMPTION_MEBIBYTES` | Memory to consume as an absolute value in MiB. Used when `MEMORY_CONSUMPTION_PERCENTAGE` is `0` (the default). | `500` |
| `NUMBER_OF_WORKERS` | Number of VM workers used to allocate memory. More workers reach the target faster but use more CPU. | `1` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODES` | Comma-separated list of node names to target. Go to [target multiple nodes](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes) to read more. | `""` |
| `NODE_LABEL` | Label selector for choosing target nodes. Go to [target nodes with labels](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels) to read more. | `""` |
| `NODES_AFFECTED_PERCENTAGE` | Percentage of nodes (matching the selector) to target. `0` means one node. | `0` |
| `SEQUENCE` | When multiple nodes are targeted, inject `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Pick percentage or absolute bytes, not both
`MEMORY_CONSUMPTION_PERCENTAGE` and `MEMORY_CONSUMPTION_MEBIBYTES` are mutually exclusive. The default configuration consumes `500` MiB (the `MEMORY_CONSUMPTION_PERCENTAGE` default of `0` cedes precedence to the absolute value). To consume a percentage of node memory instead, set `MEMORY_CONSUMPTION_PERCENTAGE` to a non-zero value; start at 30% to 50% on production-shaped nodes because higher values cross kubelet eviction thresholds quickly.
:::

---

## Fault execution in brief

Memory pressure does not have a single failure mode. The kubelet runs an eviction manager loop that watches signals like `memory.available` and ranks pods for eviction:

| Eviction order | What is reclaimed |
| --- | --- |
| `BestEffort` pods (no memory request) | Reclaimed first. Cheapest cost to the cluster. |
| `Burstable` pods using more than their memory request | Reclaimed next, ranked by how far over request they are. |
| `Guaranteed` pods (memory request = limit) | Reclaimed last, only when the kernel itself is about to OOM. |
| OOM killer | Fires inside individual containers that exceed their per-container memory limit. |

The kubelet emits `Evicted` events naming the evicted pod and the eviction signal. Watch for them with `kubectl get events --field-selector reason=Evicted`.

---

## Expected behavior during fault execution

- Memory consumed by the helper is added on top of whatever the node was already using. A 30% setting on a node already at 60% utilization pushes the node to 90% and likely trips kubelet eviction thresholds.
- The kubelet evicts whole pods, not individual containers. Once a pod is evicted, the scheduler tries to place it on another node with capacity.
- Application containers that hit their own memory limit are OOM-killed by the kernel and counted in `kube_pod_container_status_restarts_total`. This is independent of node eviction.
- If `NUMBER_OF_WORKERS` is high, memory is allocated faster but consumes more CPU. For most experiments, the default `1` is enough; raise it only if you want to reach the target memory consumption in the first few seconds.
- The node almost never flips to `NotReady` from memory pressure alone. Eviction is the expected outcome, not partition.

:::info Hog and OOM are different signals
This fault tests how the cluster handles a memory-saturated node. To test how a single pod handles hitting its container memory limit specifically, use [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog). The mechanisms and observed signals are different.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state and eviction:** Run `kubectl top node <name>` and `kubectl get events --field-selector reason=Evicted -n <namespace> -w` to see eviction in real time. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to validate that critical pods stay scheduled and `Running`.
- **Application service-level indicators:** Watch error rate and request availability for the affected workloads. The signal that matters is whether QoS protected the right pods. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **Eviction and OOM metrics:** Track `kube_pod_status_reason{reason="Evicted"}`, `node_memory_MemAvailable_bytes`, and `kube_pod_container_status_restarts_total` for OOM-driven restarts. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when an unexpected pod is evicted or when restart counts spike.

---

## Verify the fault execution effect

While the experiment is running, confirm that memory pressure is actually being applied. From a workstation with `kubectl` access:

1. **Confirm the helper pod is on the target node.**

   ```bash
   kubectl get pods -n <chaos-namespace> -o wide | grep node-memory-hog-helper
   ```

   The pod's `NODE` column must match the target node and its status must be `Running`.

2. **Check memory usage on the node.**

   ```bash
   kubectl top node <target-node>
   ```

   Memory usage should rise toward the percentage you configured. If it stays flat, the workers did not start; check the helper pod logs.

3. **Watch for eviction events.**

   ```bash
   kubectl get events --field-selector reason=Evicted --all-namespaces -w
   ```

   At higher consumption levels you should see `Evicted` events listing `MemoryPressure` as the reason. If no evictions occur, either the node had plenty of free memory or `MEMORY_CONSUMPTION_PERCENTAGE` was set too low to cross the kubelet's eviction threshold.

4. **Look for OOM kills in pods that breached their own limit.**

   ```bash
   kubectl get pods --field-selector spec.nodeName=<target-node> -o wide
   kubectl describe pod <restarted-pod> | grep -A3 'Last State'
   ```

   `Reason: OOMKilled` and `Exit Code: 137` indicate a container-level OOM, separate from kubelet eviction.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the helper pod terminates and its memory pages are reclaimed. Node memory returns to baseline within a few seconds.
- **Evicted pods reschedule:** Pods that were evicted during the fault are scheduled on other Ready nodes by the scheduler. They are not placed back on the recovered node automatically.
- **Pods stuck `Pending`:** If your cluster lacks capacity on other nodes, evicted pods may sit in `Pending`. The cluster autoscaler should add capacity if configured. Otherwise, the pods land back on the recovered node only after another scheduling cycle.
- **Container OOM restarts:** Containers that were OOM-killed during the fault are restarted by the kubelet. If a container hits its limit again immediately on restart, it can enter `CrashLoopBackOff`. Investigate and raise the per-container memory limit before re-running.
- **If the helper pod is killed mid-experiment:** The memory workers run in the helper's namespace and exit when the helper exits. No node-level cleanup is required.
- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. The helper pod terminates and memory is reclaimed.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** Fargate and ACI virtual nodes do not expose real nodes or the ability to schedule privileged pods. GKE Autopilot blocks the privileged security context this fault requires.
- **Windows nodes:** The `stress-ng` utility this fault relies on is Linux-only.
- **Single-node clusters or co-located chaos infrastructure:** If the chaos infrastructure pods (ddci and fault-specific pods) live on the node you are about to saturate, the kubelet may evict them along with everything else, and the experiment loses observability. Schedule chaos infrastructure on a node outside the blast radius.
- **Workloads without memory requests:** Without requests, every pod is `BestEffort` and the experiment observes generic eviction rather than meaningful QoS prioritization.
- **Very large consumption values on small nodes:** Setting `MEMORY_CONSUMPTION_PERCENTAGE` close to 100% on a node with less headroom than the helper needs can OOM the helper itself before it produces useful signal. Start at 30% to 50% and tune from there.

---

## Troubleshooting

<Troubleshoot
  issue="Node memory hog helper pod stays Pending or never schedules on the target node in Harness Chaos Engineering"
  mode="docs"
  fallback="Check the helper pod with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the helper does not tolerate, insufficient memory available to schedule the helper itself, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations, free resources on the node, or run the experiment in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Node memory hog runs but kubectl top shows memory usage unchanged on the target node"
  mode="docs"
  fallback="Either the stress-ng workers failed to start or the helper pod is constrained by its own memory limit. Check the helper pod logs with kubectl logs -n <chaos-namespace> <helper-pod-name>. If the helper has a small memory limit, its workers cannot allocate beyond that limit even with high MEMORY_CONSUMPTION_PERCENTAGE. Raise the helper's memory limit or remove it for the experiment."
/>

<Troubleshoot
  issue="No pods are evicted during node-memory-hog even at high MEMORY_CONSUMPTION_PERCENTAGE"
  mode="docs"
  fallback="The kubelet's eviction thresholds (memory.available, nodefs.available) may not be set, or the node simply has enough free memory left after the hog. Check kubelet config on the node with kubectl get --raw /api/v1/nodes/<node>/proxy/configz | jq .evictionHard. Raise the consumption value or lower the eviction threshold (in a non-production cluster) to reproduce eviction reliably."
/>

<Troubleshoot
  issue="Helper pod is killed with OOMKilled during node-memory-hog instead of evicting other pods"
  mode="docs"
  fallback="The helper hit its own container memory limit before the kubelet reached its node-level eviction threshold. Remove or raise the helper's memory limit, or lower MEMORY_CONSUMPTION_MEBIBYTES so the helper stays within bounds. Also confirm with kubectl describe pod <helper> that the last state shows OOMKilled and Exit Code 137."
/>

<Troubleshoot
  issue="Critical Guaranteed pods are evicted during node-memory-hog"
  mode="docs"
  fallback="Guaranteed pods should be the last to be evicted. If they are reclaimed first, verify their QoS class with kubectl describe pod <name> | grep QoS. The most common cause is that their memory request and limit are not exactly equal, downgrading them to Burstable. Set request == limit for both memory and CPU on critical pods."
/>

---

## Related faults

- [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog): Same blast-radius shape but applies CPU pressure instead of memory. Use it to test throttling rather than eviction.
- [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress): Stresses disk I/O on the node. Use it to test disk-bound workloads.
- [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog) and [Pod memory hog exec](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog-exec): Scope memory pressure to a single pod rather than the whole node. Use them to test per-container OOM behavior.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
