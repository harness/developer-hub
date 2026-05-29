---
id: node-cpu-hog
title: Node CPU hog
sidebar_label: Node CPU Hog
description: Exhaust CPU on a Kubernetes node to test scheduler behavior, pod eviction under pressure, HPA reactions, and noisy-neighbor isolation.
keywords:
  - chaos engineering
  - node cpu hog
  - cpu stress
  - resource exhaustion
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - resource-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-cpu-hog
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-cpu-hog
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node CPU hog is a Kubernetes node-level chaos fault that drives sustained CPU pressure on a target node for a configurable duration. Every workload that shares the node competes for the remaining cycles: application pods, DaemonSets, kube-proxy, and the kubelet itself.

Use this fault to simulate a CPU-starved neighbor: a runaway batch job, a misconfigured workload that ignores its CPU limit, an autoscaler that has not caught up with traffic, or a node that has lost a CPU socket to a hardware fault.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU isolation between pods:** Do `Guaranteed` and `Burstable` pods with CPU requests stay protected when a `BestEffort` workload monopolises the node, or does the CFS fail to enforce isolation?
- **Horizontal Pod Autoscaler reaction:** Does the HPA scale the workload out fast enough when CPU on its target pods spikes, or does the lag cause SLO breaches?
- **Vertical scaling and VPA:** When a single pod's CPU usage climbs because the node is busy, does VPA bump the request, and does the scheduler find a healthier node?
- **Cluster autoscaler reaction:** When scheduling stalls because available CPU is exhausted, does the cluster autoscaler add a node within the expected window?
- **Application performance under CPU starvation:** Do request handlers, garbage collectors, and background workers degrade gracefully, or does throughput collapse non-linearly?
- **Kubelet stability under pressure:** Does the kubelet keep renewing the node lease and serving readiness checks when the node is saturated, or does the node flip to `NotReady` because critical control loops missed their cadence?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. The fault runs CPU pressure against the host's resources.
- **Container runtime access:** The chaos infrastructure can reach the container runtime on the target nodes. The default `containerd` socket path is mounted automatically.
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Workload protections in place:** The workloads under test have CPU requests and (ideally) limits configured. Without requests, the scheduler cannot reason about CPU pressure and the experiment observes generic slowness rather than meaningful eviction or throttling signals.
- **Chaos infrastructure isolation:** The target nodes are not single points of failure for the chaos infrastructure itself. If chaos control-plane pods are scheduled on the saturated node, the experiment loses observability and may fail to roll back.

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
| GKE Autopilot | Not supported (Autopilot does not expose the node-level access this fault requires; only Node Network Loss and Node Network Latency are allowlisted, see [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot)) |

---

## Permissions required

The fault runs under the chaos infrastructure's service account. The account must be able to perform the following operations against the target cluster.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Run the chaos pod that injects CPU pressure on the target node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `nodes` (`""`) | `get`, `list` | Discover target nodes and validate selectors |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Node CPU hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NODE_CPU_CORE` | Number of CPU cores to fully consume on the target node. Set to `0` to use `CPU_LOAD` instead. | `1` |
| `CPU_LOAD` | Percentage of total node CPU to consume. Honored only when `NODE_CPU_CORE` is `0`. | `100` |
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

:::warning Pick cores or load, not both
`NODE_CPU_CORE` and `CPU_LOAD` are mutually exclusive. If both are non-zero, `NODE_CPU_CORE` wins. To use `CPU_LOAD`, set `NODE_CPU_CORE: '0'` explicitly.
:::

---

## Fault execution in brief

Drives sustained CPU load on the target node for the configured duration, consuming a specified number of cores or a percentage of total CPU, so workloads sharing the node experience throttling, contention, and elevated tail latency.

The blast radius spans several layers of the node:

| Layer | What happens under CPU pressure |
| --- | --- |
| Kernel CFS scheduler | `Guaranteed` pods (CPU requests = limits) keep their slice. `Burstable` pods get proportional shares above their request. `BestEffort` pods are starved first. |
| Kubelet | Heartbeats, lease renewals, and probe execution slow. At sustained 100% saturation, kubelet itself can miss its `node-monitor-grace-period`. |
| Application pods | Latency rises, queue depth grows, and SLOs degrade. CPU throttling shows up in cgroup metrics (`container_cpu_cfs_throttled_seconds_total`). |
| Autoscalers | HPA reacts on CPU metrics; cluster autoscaler reacts on unschedulable pods. Both have minute-scale reaction times. |

---

## Expected behavior during fault execution

- CPU usage on the target node rises to the cores listed in `NODE_CPU_CORE`. If you set `NODE_CPU_CORE` higher than the node has, the fault still saturates whatever is available.
- Pods with CPU requests keep their guaranteed slice via the CFS scheduler. Pods without requests (`BestEffort`) are the first to degrade.
- Application latency rises before throughput drops. Watch p99 latency, not just average CPU usage.
- If `TOTAL_CHAOS_DURATION` is short (under 30 seconds), most clusters absorb the spike without any pod eviction or `NotReady` transition. Longer durations at 100% load can trigger eviction policies tuned in the kubelet.
- HPA and cluster autoscaler reactions have a built-in delay (default scrape interval plus the reaction window, usually 1 to 5 minutes). Experiments shorter than the reaction window are not testing autoscaling — they are testing burst absorption.

:::info Hog and reschedule are different signals
This fault tests how the cluster handles a CPU-saturated node that is still reachable. To test eviction and rescheduling specifically, use [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain) or [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart). To test pod-level isolation, use [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog).
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state:** Run `kubectl top node <name>` to see CPU saturation in real time and `kubectl get pods --field-selector spec.nodeName=<name> -o wide -w` to track any eviction. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to validate that no critical pods leave `Running` state.
- **Application service-level indicators:** Watch error rate, p99 latency, and queue depth for workloads on the affected node. The signal that matters is whether the affected pods degrade gracefully or amplify the failure. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint latency.
- **Autoscaler and throttling metrics:** Track `container_cpu_cfs_throttled_seconds_total`, HPA replica counts, and cluster autoscaler scale-up events. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when throttling exceeds your safe ceiling or autoscaling does not kick in within its expected window.

---

## Verify the fault execution effect

While the experiment is running, confirm that CPU pressure is reaching the node:

1. **Check CPU usage on the node.**

   ```bash
   kubectl top node <target-node>
   ```

   Total CPU usage should jump close to the number of cores you allocated (or the percentage if you used `CPU_LOAD`). If it stays flat, the fault is not driving load on the expected node.

2. **Look for throttling in the affected workloads.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -- \
     cat /sys/fs/cgroup/cpu.stat 2>/dev/null | grep -E 'nr_throttled|throttled_usec'
   ```

   `nr_throttled` should be non-zero and increasing for pods with CPU limits on the affected node.

3. **Watch application latency.** Open your dashboard for any service with pods on the affected node and confirm p99 has stepped up. If you do not see the step, either the pod has plenty of headroom in its CPU request, or it is scheduled on a different node.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the CPU load is removed automatically and node CPU usage returns to baseline within seconds. There is no state to clean up.
- **No pod eviction in the common case:** Short experiments at default settings do not normally evict pods. If your `TOTAL_CHAOS_DURATION` is long (several minutes at 100%) and your kubelet has CPU-pressure-based eviction enabled, pods may have been evicted. Verify with `kubectl get events --field-selector reason=Evicted`.
- **Autoscaled replicas stay scaled:** If HPA scaled the workload up during the fault, the extra replicas remain until HPA's scale-down policy reclaims them (default 5 minutes of stabilization).
- **If automated cleanup did not complete:** CPU pressure stops as soon as the chaos pod exits. No node-level cleanup is required.
- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. CPU usage returns to baseline once the chaos pod exits.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** These platforms do not expose real nodes or allow the privileged access this fault needs.
- **Windows nodes:** This fault is supported on Linux nodes only. Use a Windows-equivalent CPU stress fault on Windows-only workloads.
- **Single-node clusters or co-located chaos infrastructure:** If the chaos infrastructure pods live on the node you are about to saturate, the experiment loses observability and the chaos infrastructure may itself be throttled out. Schedule chaos infrastructure on a node outside the blast radius.
- **Workloads without CPU requests or limits:** Without resource requests, the scheduler treats every pod as `BestEffort` and the experiment observes only generic slowness, with no meaningful isolation or eviction signal.
- **Very short durations:** Experiments shorter than the HPA reaction window (typically 1 to 5 minutes) test burst absorption, not autoscaling. Use a `TOTAL_CHAOS_DURATION` of at least one full HPA reaction cycle to test scale-out behavior.

---

## Troubleshooting

<Troubleshoot
  issue="Node CPU hog experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, insufficient CPU available to schedule the chaos pod, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations, free resources on the node, or run the experiment in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Node CPU hog runs but kubectl top shows CPU usage unchanged on the target node"
  mode="docs"
  fallback="The chaos pod may be constrained by its own CPU limit, or it may be scheduled on a different node than expected. Verify with kubectl get pods -n <chaos-namespace> -o wide that the chaos pod is on the intended target node, and remove or raise its CPU limit if it is constrained."
/>

<Troubleshoot
  issue="Node flips to NotReady during node-cpu-hog and does not recover after the experiment ends"
  mode="docs"
  fallback="At sustained 100% CPU, kubelet may miss lease renewals long enough for the controller-manager to taint the node. When CPU returns to baseline, the node usually recovers automatically within a minute or two. If it does not, check kubelet logs on the node (journalctl -u kubelet) for crashes or panics, and verify with kubectl describe node <node-name> that no NoExecute taint remains."
/>

<Troubleshoot
  issue="HorizontalPodAutoscaler does not scale up during node-cpu-hog even though CPU usage is high"
  mode="docs"
  fallback="HPA reacts on the metric you configured, usually average CPU utilization across the deployment. If only one pod (on the affected node) is hot and the others are idle, the average may stay below the scale-up threshold. Configure the HPA against a per-pod metric or use a longer chaos duration so the cluster autoscaler has time to spread the workload. Verify with kubectl describe hpa <name> what the current metric value is during the fault."
/>

<Troubleshoot
  issue="Pods on the target node get evicted during node-cpu-hog and stay Pending after recovery"
  mode="docs"
  fallback="If the kubelet has CPU-pressure eviction enabled and the chaos duration crosses the eviction threshold, BestEffort pods are evicted first. After the fault, the scheduler tries to reschedule them. If they stay Pending, check kubectl describe pod for scheduler hints; common causes are insufficient capacity on other nodes or taints/affinities that pin them to the affected node."
/>

---

## Related faults

- [Node memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog): Same blast-radius shape but applies memory pressure instead of CPU. Use it to test eviction by `memory.available` instead of throttling.
- [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress): Stresses disk I/O on the node rather than CPU. Use it to test disk-bound workloads.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Scope CPU pressure to a single pod rather than the whole node. Use it to test pod-level CPU limits and throttling.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
