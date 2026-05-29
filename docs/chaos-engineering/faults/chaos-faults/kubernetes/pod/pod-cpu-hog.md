---
id: pod-cpu-hog
title: Pod CPU hog
sidebar_label: Pod CPU Hog
description: Consume CPU on a target Kubernetes pod's container to test autoscaling, throttling, latency budgets, and noisy-neighbor tolerance.
keywords:
  - chaos engineering
  - pod cpu hog
  - cpu pressure
  - resource stress
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - resource-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-cpu-hog
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-cpu-hog
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod CPU hog is a Kubernetes pod-level chaos fault that drives sustained CPU pressure inside a target container for a configurable duration. The load is contained inside the selected container, so the kernel enforces any `resources.limits.cpu` you have configured. Sibling containers in the same pod and other pods on the node are not directly throttled.

Use this fault to test how a service degrades when one or more replicas suddenly become CPU-bound: a runaway request handler, an inefficient deserialization path, an unexpected GC storm, or a coroutine leak.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Autoscaling response:** Does the HorizontalPodAutoscaler scale out within your scale-up window when CPU utilization crosses the target threshold, and does it scale back in cleanly when the fault ends?
- **Latency budget under throttling:** When a single replica saturates its CPU, do callers route around it (via readiness probes, service mesh outlier detection, or load-balancer health checks) before tail latency cascades?
- **Resource limits enforcement:** If the container has `resources.limits.cpu` set, does the kernel CFS throttle it as expected, or does the workload exceed its quota?
- **QoS and noisy-neighbor isolation:** On a busy node, does a `Guaranteed` pod hold its CPU when a `Burstable` neighbor saturates? Does a single hot container starve sidecars in the same pod?
- **Probe and circuit-breaker tuning:** Are liveness, readiness, and startup probes tuned with deadlines that survive a CPU spike, or do they kick in too aggressively and amplify the failure?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Workload selector defined:** The chaos experiment knows the target workload (`Deployment`, `StatefulSet`, `DaemonSet`, `Rollout`, etc.) by kind, namespace, and either names or labels. The fault scopes to pods owned by the selected workload.

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
| GKE Autopilot | Supported with [Autopilot setup](/docs/resilience-testing/chaos-testing/gke-autopilot) |
| EKS Fargate, ACI virtual nodes | Not supported (no access to container runtime sockets) |

---

## Permissions required

The fault runs under the chaos infrastructure's service account.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Discover target pods and run the chaos pod on the same node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `deployments`, `statefulsets`, `replicasets`, `daemonsets` (`apps`) | `get`, `list` | Resolve the target workload to the pods it owns |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Pod CPU hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_CORES` | Number of CPU cores to fully consume inside the target container. Set to `0` to use `CPU_LOAD` instead. | `1` |
| `CPU_LOAD` | Percentage of total container CPU to consume. Honored only when `CPU_CORES` is `0`. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod to stress. Empty targets the first container in the pod spec. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to target. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, inject `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Pick cores or load, not both
`CPU_CORES` and `CPU_LOAD` are mutually exclusive. If both are non-zero, `CPU_CORES` wins. To use `CPU_LOAD`, set `CPU_CORES` to `0` explicitly.
:::

### Configure for your container runtime

Set `CONTAINER_RUNTIME` and `SOCKET_PATH` to match the runtime on the target node:

| `CONTAINER_RUNTIME` | `SOCKET_PATH` |
| --- | --- |
| `containerd` (default) | `/run/containerd/containerd.sock` |
| `docker` | `/var/run/docker.sock` |
| `crio` | `/var/run/crio/crio.sock` |

---

## Fault execution in brief

Applies CPU stress inside the target container for the configured duration, consuming either a specified number of cores or a percentage of the container's CPU allowance, with the load bounded by any `resources.limits.cpu` set on the container.

---

## Expected behavior during fault execution

- The container's CPU usage spikes to the configured `CPU_CORES` (or `CPU_LOAD`%) and stays there for the duration.
- If the container has a CPU limit, the kernel throttles it. `kubectl top pod` reports usage at the limit; `kubectl describe` shows non-zero `cpu.throttled_periods`.
- Any process inside the container competes with the injected CPU load. Application handlers slow down, request queues build up, and tail latency rises sharply.
- HPA controllers see elevated CPU utilization and start scaling out (if configured). The scale-up takes one `--horizontal-pod-autoscaler-sync-period` (15 seconds by default) plus the `behavior.scaleUp` stabilization window.
- Liveness and readiness probes execute against the same CPU-starved container. If their `timeoutSeconds` is short, they fail; the pod can be restarted or removed from service.
- Sibling containers in the same pod (e.g. sidecars) are not directly throttled but may experience reduced CPU if the node is busy.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the CPU load is removed and the container's CPU usage returns to baseline within seconds. The container is not restarted; only the load was synthetic.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Application latency and error rate:** Watch p95/p99 latency and error percentage for the workload. The signal that matters is whether callers degrade gracefully, retry effectively, or amplify the failure. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **HPA behavior:** Track `kube_hpa_status_current_replicas` vs `kube_hpa_status_desired_replicas` to confirm the autoscaler reacted in time. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when the replica count does not change within your SLO.
- **Probe failures and restarts:** Look for `kubelet` events with reason `Unhealthy` or `Killing`. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the pod restart count increases unexpectedly.

---

## Verify the fault execution effect

While the experiment is running, confirm that CPU pressure is reaching the target container:

1. **Watch CPU usage on the target pod.**

   ```bash
   kubectl top pod -n <namespace> <pod-name> --containers
   ```

   The targeted container's CPU should be at or near its limit. Other containers in the pod stay at their normal baseline.

2. **Inspect throttling counters.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <container> -- cat /sys/fs/cgroup/cpu.stat
   ```

   `nr_throttled` and `throttled_time` should increase rapidly if the container has a CPU limit set.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the CPU load is removed automatically and container CPU returns to baseline within seconds.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its state. The container itself is never restarted by this fault.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux containers only.
- **Containers with a very low CPU limit:** A container limited to `100m` cannot generate meaningful pressure regardless of `CPU_CORES`. Raise the limit or use the same fault on a sibling workload to test cluster-level scheduling.
- **Pods using `hostNetwork` or `hostPID`:** These bypass the standard namespace model and the fault may behave unexpectedly.

---

## Troubleshooting

<Troubleshoot
  issue="Pod CPU hog experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, insufficient CPU or memory on the node, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="CPU usage on the target container does not increase during pod-cpu-hog"
  mode="docs"
  fallback="The most common causes are: the container has a low CPU limit and is being throttled (check cpu.stat); CPU_CORES was set higher than the container's limit; or TARGET_CONTAINER does not match any container in the pod (verify with kubectl get pod <name> -o jsonpath='{.spec.containers[*].name}'). Lower CPU_CORES or raise the container limit."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-cpu-hog in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. If your nodes use Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock. Confirm the path by SSHing to the node and running ls -l on each candidate socket file."
/>

<Troubleshoot
  issue="CPU pressure persists after pod-cpu-hog ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its state. Verify with kubectl top pod -n <namespace> <pod-name> --containers, which should drop to baseline. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog): Apply memory pressure to a container instead of CPU pressure.
- [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog): Apply CPU pressure to the entire node rather than a single container.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
