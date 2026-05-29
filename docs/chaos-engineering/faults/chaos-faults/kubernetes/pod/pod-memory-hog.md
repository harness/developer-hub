---
id: pod-memory-hog
title: Pod memory hog
sidebar_label: Pod Memory Hog
description: Consume memory inside a target Kubernetes pod's container to test OOM behavior, eviction order, request handling under pressure, and limit enforcement.
keywords:
  - chaos engineering
  - pod memory hog
  - memory pressure
  - OOMKilled
  - cgroup
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - resource-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-memory-hog
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-memory-hog/
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-memory-hog
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod memory hog is a Kubernetes pod-level chaos fault that allocates a configurable amount of memory inside a target container for a configurable duration. The allocation is contained inside the selected container, so the kernel enforces any `resources.limits.memory` you have configured. If the allocation pushes the container past its limit, the OOM killer terminates a process inside the container — usually the application itself. Sibling containers and other pods on the node are not directly affected unless the node itself runs out of memory.

Use this fault to test how a service responds when one or more replicas suddenly consume far more memory than expected: a memory leak, a runaway cache, an unexpectedly large request payload, or a JVM heap surge.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **OOM behavior:** When the container exceeds its memory limit, does the kernel `OOMKill` it cleanly? Does Kubernetes restart it with the correct backoff? Does the workload converge or enter a crash loop?
- **Memory-based autoscaling:** Does the HorizontalPodAutoscaler scale out within your window when memory utilization crosses the target threshold, and does it scale back in once the fault ends?
- **Eviction order on the node:** When the node experiences memory pressure (because a `Burstable` pod blew through its request), does the kubelet evict `BestEffort` and over-quota pods first, leaving `Guaranteed` pods running?
- **Request handling under pressure:** Do callers degrade gracefully, retry effectively, or amplify the failure when a replica becomes memory-bound?
- **JVM and runtime tuning:** Does the JVM's `-Xmx` (or Go's `GOGC`, or Node's `--max-old-space-size`) match the container's memory limit? An over-provisioned heap forces OOM kills before the GC reclaims memory.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Workload selector defined:** The chaos experiment knows the target workload (`Deployment`, `StatefulSet`, `DaemonSet`, `Rollout`, etc.) by kind, namespace, and either names or labels.

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

The default Harness chaos infrastructure service account already includes these permissions.

---

## Fault tunables

Configure the following fault parameters when you add Pod memory hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MEMORY_CONSUMPTION` | Amount of memory to allocate inside the target container, in megabytes (1 MB = 10<sup>6</sup> bytes). | `500` |
| `NUMBER_OF_WORKERS` | Number of memory worker threads used to perform the allocation. Increase for faster ramp-up. | `1` |
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

:::warning Pick MEMORY_CONSUMPTION carefully
If `MEMORY_CONSUMPTION` plus the container's normal working set exceeds the container's `resources.limits.memory`, the kernel `OOMKill`s the container. Whether this is desired depends on what you are testing. To raise pressure without triggering OOM, set `MEMORY_CONSUMPTION` to roughly `(limit - baseline) * 0.8`.
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

Allocates a specified amount of memory inside the target container for the configured duration, with the allocation bounded by any `resources.limits.memory` set on the container; if the limit is breached, the kernel OOM-kills a process inside the container.

---

## Expected behavior during fault execution

- The container's memory usage rises rapidly to the configured `MEMORY_CONSUMPTION` plus baseline.
- If the container has no memory limit and the node has free memory, the allocation succeeds and the workload may continue normally.
- If the container has a memory limit and the allocation exceeds it, the kernel triggers an OOM kill inside the cgroup. The container restarts with `Last State: OOMKilled`.
- If multiple replicas are targeted and the node is small, the node itself can enter `MemoryPressure`. The kubelet starts evicting `BestEffort` and over-request pods.
- HPA controllers configured on memory metrics scale out, with the usual sync and stabilization delays.
- Liveness probes that allocate memory themselves may fail under pressure, accelerating restart.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the allocation is freed and the container's memory usage returns to baseline. If the container was OOM-killed during the run, the new container restarts at baseline.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Container memory and OOM kills:** Watch `container_memory_working_set_bytes` and pod restart count. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail when restarts cross a threshold.
- **HPA behavior:** Track `kube_hpa_status_current_replicas` vs `kube_hpa_status_desired_replicas`. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail if scale-out does not happen within your SLO.
- **Application health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health; latency and error rate signal whether callers degrade or amplify.

---

## Verify the fault execution effect

While the experiment is running, confirm that memory pressure is reaching the target container:

1. **Watch memory usage on the target pod.**

   ```bash
   kubectl top pod -n <namespace> <pod-name> --containers
   ```

   The targeted container's memory should rise to `MEMORY_CONSUMPTION` plus its baseline working set.

2. **Look for OOM kill events (if the container hit its limit).**

   ```bash
   kubectl describe pod -n <namespace> <pod-name> | grep -A 3 'Last State'
   ```

   `Reason: OOMKilled` confirms the kernel terminated the container.

---

## Recovery and cleanup

- **End of duration:** The allocation is freed automatically and container memory drops back to baseline within seconds.
- **OOM kill during the run:** The container is restarted by the kubelet. The replacement container starts fresh; no manual cleanup is needed.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Persistent restart loop:** If the workload's normal memory footprint exceeds its limit (independently of chaos), the OOM kill recurs and the pod enters `CrashLoopBackOff`. Lower `MEMORY_CONSUMPTION` or raise the container's memory limit.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux containers only.
- **Containers with a very small memory limit:** A container limited to `64Mi` cannot absorb the default `500` MB allocation; the OOM kill fires immediately and you cannot observe steady-state pressure. Lower `MEMORY_CONSUMPTION` to a value below the limit.
- **Pods using `hostNetwork` or `hostPID`:** These bypass the standard namespace model and the fault may behave unexpectedly.

---

## Troubleshooting

<Troubleshoot
  issue="Pod memory hog experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, insufficient memory on the node, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Memory usage on the target container does not rise during pod-memory-hog"
  mode="docs"
  fallback="The most common causes are: MEMORY_CONSUMPTION smaller than the container's headroom, so the allocation completes too quickly to observe; NUMBER_OF_WORKERS too low so the allocation paces below your monitoring scrape interval; or TARGET_CONTAINER does not match any container in the pod. Verify with kubectl get pod <name> -o jsonpath='{.spec.containers[*].name}' and raise MEMORY_CONSUMPTION."
/>

<Troubleshoot
  issue="Container is OOMKilled immediately for pod-memory-hog in Harness Chaos Engineering"
  mode="docs"
  fallback="MEMORY_CONSUMPTION plus the container's existing working set exceeds its resources.limits.memory. The kernel triggers an OOM kill before the fault can run steady-state. Lower MEMORY_CONSUMPTION below (limit - baseline), or raise the container memory limit. If the immediate OOM kill is what you wanted to test, that is the expected outcome."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-memory-hog in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock. Confirm the path by SSHing to the node and running ls -l on each candidate socket file."
/>

---

## Related faults

- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Apply CPU pressure to a container instead of memory pressure.
- [Node memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog): Apply memory pressure to the entire node rather than a single container.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
