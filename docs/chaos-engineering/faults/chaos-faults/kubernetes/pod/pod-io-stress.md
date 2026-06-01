---
id: pod-io-stress
title: Pod IO stress
sidebar_label: Pod IO Stress
description: Generate sustained filesystem read and write load inside a target Kubernetes pod to test how the application handles disk pressure, slow IO, and ephemeral storage exhaustion.
keywords:
  - chaos engineering
  - pod io stress
  - io chaos
  - filesystem stress
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - resource-stress
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-io-stress
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-io-stress
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod IO stress is a Kubernetes pod-level chaos fault that generates sustained filesystem read and write activity inside the target container's mounted volume for a configurable duration. Disk IO bandwidth is consumed by the injected workload, ephemeral storage usage rises toward the configured target, and the application competes for IO against the chaos load. When the fault ends, the chaos data is cleaned up and IO returns to baseline.

Use this fault to test how a service behaves under disk pressure: a logger that backs up when the disk gets slow, a process that fails on `ENOSPC`, a sidecar that thrashes when the volume hits 95% full, or a noisy-neighbor pod monopolizing IO on a shared node.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Ephemeral storage limits:** Push the container's `emptyDir` toward its `sizeLimit`. Does the kubelet evict the pod with `Evicted: The node was low on resource: ephemeral-storage`, or does the application surface a clean error first?
- **Disk-full handling:** At 95% volume utilization, does the application's logger, cache, or queue degrade gracefully or panic on `ENOSPC`?
- **Slow-disk latency:** Sustained IO contention raises read and write latency. Do background tasks (sync, fsync, log rotation) complete on time, or do they back up?
- **Noisy-neighbor isolation:** Stressing IO on one pod on a node verifies whether other pods on the same node maintain their IO SLOs (cgroup IO limits, dedicated PVs).
- **Backpressure validation:** Does the queue or buffer in front of the disk surface backpressure to upstream callers, or silently grow until OOM?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **Writable filesystem:** The target container has a writable mounted volume (or writable `emptyDir`) that the fault can use to generate IO load.
- **Workload selector defined:** The chaos experiment knows the target workload by kind, namespace, and either names or labels.

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

Configure the following fault parameters when you add Pod IO stress to an experiment in Chaos Studio. Defaults are shown for reference. Use either `FILESYSTEM_UTILIZATION_PERCENTAGE` or `FILESYSTEM_UTILIZATION_BYTES`, not both.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILESYSTEM_UTILIZATION_PERCENTAGE` | Target filesystem utilization as a percentage of free space on the mounted volume. Use this when you want to drive the volume toward a specific fill level. | `10` |
| `FILESYSTEM_UTILIZATION_BYTES` | Target filesystem utilization in gigabytes. Use this when you know exactly how much data you want to write. Empty defers to `FILESYSTEM_UTILIZATION_PERCENTAGE`. | `""` |
| `NUMBER_OF_WORKERS` | Number of concurrent IO worker threads. Higher values produce more IO contention. | `4` |
| `VOLUME_MOUNT_PATH` | Path inside the target container where the IO load is written. Empty uses a sensible default in `/`. Set this to a specific PV mount path to scope the stress to a particular volume. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose filesystem to stress. Empty targets the first container in the pod spec. | `""` |
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

:::tip Match `VOLUME_MOUNT_PATH` to the volume under test
If you want to stress only the application's persistent volume (not the container's root filesystem), set `VOLUME_MOUNT_PATH` to that volume's mount point. If you want to test ephemeral storage limits, leave it at the default to stress the writable layer.
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

Drives sustained read and write activity against the target container's filesystem (rooted at `VOLUME_MOUNT_PATH`), filling it toward either `FILESYSTEM_UTILIZATION_PERCENTAGE` of free space or `FILESYSTEM_UTILIZATION_BYTES` gigabytes using `NUMBER_OF_WORKERS` parallel writers, so the application competes for IO and storage capacity.

---

## Expected behavior during fault execution

- The mounted volume's free space drops toward the configured target. The application's IO calls compete with the injected workload for disk bandwidth.
- Read and write latency for the application rises while the fault runs. fsync-heavy workloads (databases, log writers) feel this most.
- If the target fills ephemeral storage past the container's `ephemeral-storage` limit, the kubelet evicts the pod with the reason `Evicted: The node was low on resource: ephemeral-storage` (or similar).
- Writes that fail with `ENOSPC` surface to the application as `No space left on device`. Whether the application crashes, retries, or degrades depends on its code paths.
- IO load may bleed into other containers in the same pod (they share volumes and the host disk) and to other pods on the same node (they share the underlying disk).

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the IO workers stop and the data they wrote is removed. The volume's free space returns to roughly its pre-fault level within seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Disk utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `kubelet_volume_stats_used_bytes` to confirm the volume rose to the configured target.
- **IO latency:** Use a Prometheus probe on disk-read/write latency metrics to verify the application's IO got slower as expected.
- **Pod eviction events:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to detect `Evicted` events on the target pod; the experiment intentionally pushes ephemeral storage when ephemeral storage limits are tight.

---

## Verify the fault execution effect

While the experiment is running, confirm IO load and disk usage on the target:

1. **Inspect filesystem usage inside the container.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <TARGET_CONTAINER> -- \
     df -h <VOLUME_MOUNT_PATH or />
   ```

   The `Used` column should be rising toward the configured target (`FILESYSTEM_UTILIZATION_PERCENTAGE` of free or `FILESYSTEM_UTILIZATION_BYTES`).

2. **Check application-level impact.**

   - Application logs should show slower IO operations or, if the volume fills, `No space left on device` errors.
   - On the host, `iostat` (or your monitoring) should show elevated `await`/`r_await`/`w_await` and high `%util` on the underlying device.

---

## Recovery and cleanup

- **End of duration:** The IO workers stop and any files written by the fault are removed automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If the target pod was evicted mid-fault, the kubelet recycles its ephemeral storage when the pod restarts. For PVs, leftover chaos files at `VOLUME_MOUNT_PATH` (named with a recognizable chaos prefix) can be removed manually.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Read-only filesystems:** If the container's root filesystem is mounted read-only and no writable volume is supplied via `VOLUME_MOUNT_PATH`, the fault has nowhere to write and fails to start.
- **Eviction risk:** Filling ephemeral storage past the pod's `ephemeral-storage` limit (or the node's eviction threshold) causes the kubelet to evict the pod. This is sometimes the test; other times it is unintended. Calibrate `FILESYSTEM_UTILIZATION_*` against the volume's free space and the pod's storage limits.
- **Shared volumes:** Multiple containers in the same pod that share a volume see the fault on each shared mount.
- **Underlying device contention:** On bare metal or shared local storage, the IO load can affect other pods on the same node even if `POD_AFFECTED_PERCENTAGE` targets only one pod.

---

## Troubleshooting

<Troubleshoot
  issue="Pod IO stress experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Volume usage does not rise during pod-io-stress"
  mode="docs"
  fallback="The most common causes are: VOLUME_MOUNT_PATH points to a path that is not writable inside the container (verify with kubectl exec <pod> -- touch <path>/x); both FILESYSTEM_UTILIZATION_PERCENTAGE and FILESYSTEM_UTILIZATION_BYTES are set so the fault picked one and ignored the other; or the target volume has very little free space to fill. Re-run with VOLUME_MOUNT_PATH empty and FILESYSTEM_UTILIZATION_PERCENTAGE=50 to confirm the path."
/>

<Troubleshoot
  issue="Target pod was evicted during pod-io-stress"
  mode="docs"
  fallback="The fault filled ephemeral storage past the pod's ephemeral-storage limit (or the node's eviction threshold), and the kubelet evicted the pod. If this is the test, the eviction event is the result; if not, lower FILESYSTEM_UTILIZATION_PERCENTAGE or set FILESYSTEM_UTILIZATION_BYTES to a value below the pod's ephemeral-storage limit. Inspect the pod's previous instance with kubectl describe pod <pod> to see the eviction reason."
/>

<Troubleshoot
  issue="Chaos files remain after pod-io-stress ends"
  mode="docs"
  fallback="If the target pod was evicted mid-fault, the kubelet recycles ephemeral storage on pod restart. For files left behind on a persistent volume, locate them under VOLUME_MOUNT_PATH (named with a chaos prefix) and remove manually, or restart the application pod so the PV cleanup logic runs."
/>

---

## Related faults

- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog): Stress CPU on the target pod instead of disk IO.
- [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog): Stress memory on the target pod instead of disk IO.
- [Disk fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill): Fill a container's writable layer with a single large file (no concurrent IO workers).
- [FS fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/fs-fill): Fill a specific filesystem path with bounded write activity.
- [Node IO stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress): Apply IO stress at the node level rather than to one pod.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
