---
id: fs-fill
title: FS fill
sidebar_label: FS Fill
description: Write a configurable amount of data into a specific path inside a Kubernetes container to test mounted-volume capacity, eviction, and write-failure handling.
keywords:
  - chaos engineering
  - fs fill
  - filesystem fill
  - ephemeral storage
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - storage-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/fs-fill
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod/fs-fill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

FS fill is a Kubernetes pod-level chaos fault that writes a configurable amount of data into a specific path inside a target container. Unlike [Disk fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill), which works as a percentage of the container's ephemeral-storage limit, FS fill writes an absolute size (`FILL_SIZE`) at a specific `FILE_PATH` (`/tmp` by default), so you can target a mounted volume, a writable subdirectory, or any specific filesystem path your application depends on.

Use this fault to test how the workload reacts when the directory it writes to runs out of space: whether it surfaces useful errors, whether log rotation or temp cleanup kicks in, and whether the kubelet evicts the pod for breaching its ephemeral-storage budget.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Path-specific capacity testing:** When `/tmp`, a working directory, or a mounted volume fills up, does the application fail cleanly with a clear log line and `ENOSPC`, or does it hang indefinitely on the next write?
- **Mounted-volume back-pressure:** When the fault writes into a path backed by an `emptyDir` or PVC, do consumers downstream of that path (queue producers, log shippers, batch jobs) detect the failure and shed load?
- **Log-rotation effectiveness:** Filling the log directory simulates uncontrolled log growth. Does the rotation policy catch up and reclaim space, or does the pod tip into eviction before rotation runs?
- **Cleanup hooks on shutdown:** When the kubelet evicts the pod for filling its ephemeral budget, does the application clean up temp data on `SIGTERM`, or does the next pod inherit a polluted directory?
- **Failure-mode coverage for batch jobs:** A batch job that writes intermediate output to a path that runs out of space tests whether the job framework retries, marks the job failed, or hangs.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The pods you intend to fill are in the `Running` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. The fault writes into the target container through the container runtime.
- **Container runtime access:** The chaos infrastructure can reach the container runtime on the target nodes. The default `containerd` socket path is mounted automatically.
- **Writable path inside the container:** The `FILE_PATH` you target is writable from the container. The fault fails immediately if the path is missing or read-only.

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

Configure the following fault parameters when you add FS fill to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILL_SIZE` | Amount of data to write at `FILE_PATH`. Accepts unit suffixes `K`, `KB`, `M`, `MB`, `G`, `GB`. | `100M` |
| `FILE_PATH` | Absolute path inside the target container where the data is written. Must exist and be writable. | `/tmp` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The data is held at `FILE_PATH` for the duration. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose filesystem is filled. Empty targets the first container in the pod spec. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to target. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, fill `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Pick FS fill vs Disk fill deliberately
Use **FS fill** when you want to target a specific path (mounted volume, `/tmp`, log directory) with a known absolute size. Use [**Disk fill**](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill) when you want to consume a percentage of the container's ephemeral-storage limit without caring about the exact location.
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

Writes `FILL_SIZE` of data at `FILE_PATH` inside the target container, holds the data there for the configured duration, and removes the data when the fault ends.

---

## Expected behavior during fault execution

- `FILE_PATH` accumulates data until `FILL_SIZE` is reached, then the fill is held for the rest of the duration.
- If `FILE_PATH` lives on the container's writable layer and the total writable usage crosses the container's `resources.limits.ephemeral-storage`, the kubelet evicts the pod with an ephemeral-storage breach reason.
- If `FILE_PATH` lives on a mounted volume (`emptyDir`, PVC, `hostPath`), the fill is confined to that volume. Ephemeral-storage limits do not apply, but the volume itself can run out of space, and writes from the application to that path fail with `ENOSPC`.
- Application writes to `FILE_PATH` may fail with `ENOSPC` (no space left on device) before the kubelet acts. The blast radius depends on which subsystem of the application uses that path.
- Reads from `FILE_PATH` are not affected. Files that already existed remain readable.
- The node-level filesystem stays untouched unless `FILE_PATH` resolves to a host-mounted path. The fault is scoped to the target container's view of the filesystem.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the fault removes the data it wrote at `FILE_PATH`. If the pod was evicted before the fault completed, the eviction stands; the replacement pod starts with a fresh filesystem.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Application error rate and disk-error logs:** Watch for `ENOSPC`, `No space left on device`, and any disk-related stack traces in your logs. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to assert direct endpoint health.
- **Eviction events:** Track `kube_pod_status_reason{reason="Evicted"}` for the target workload's namespace if you expect the fill to breach the ephemeral-storage limit. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) for an automatic check.
- **Volume usage (if `FILE_PATH` is a mounted volume):** Use the appropriate volume-level metric (PVC usage, node filesystem free space) to confirm the fill is hitting the intended path. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) when you have a relevant Kubernetes object to watch.

---

## Verify the fault execution effect

While the experiment is running, confirm that the target path is actually filling up:

1. **List disk usage at the target path inside the container.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <container> -- df -h <FILE_PATH>
   ```

   The usage on the filesystem backing `FILE_PATH` should increase by approximately `FILL_SIZE`.

2. **List the largest files at the target path.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <container> -- ls -lhS <FILE_PATH>
   ```

   You should see the file the fault wrote (named by the fault, with a size near `FILL_SIZE`).

3. **Look for eviction or `ENOSPC` events.**

   ```bash
   kubectl get events -n <namespace> --sort-by='.lastTimestamp' | tail -20
   ```

   Expect `Evicted` events only if the fill exceeds the container's ephemeral-storage limit. Otherwise, expect application-level errors instead.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the data written at `FILE_PATH` is removed and disk usage at the path returns to baseline within seconds.
- **Evicted pods reschedule:** If the fault tripped an ephemeral-storage eviction, the workload's controller schedules a replacement pod on any Ready node with capacity.
- **Mounted volumes retain their state:** If `FILE_PATH` lived on a PVC and the pod was evicted, the next pod that mounts the same PVC sees an empty path (because the fault removed its data), not a fresh volume.
- **Stale application state:** Applications that wrote real data to `FILE_PATH` during the fault may have lost data due to `ENOSPC`. Check the application's recovery logic before assuming the workload is healthy.
- **Abort the experiment early:** Stopping the experiment from Chaos Studio triggers cleanup of the data at `FILE_PATH`. Any eviction that has already happened cannot be undone.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Read-only paths:** If `FILE_PATH` is read-only (because of `readOnlyRootFilesystem`, `securityContext`, or a volume mounted read-only), the fault fails immediately with a write error.
- **Paths outside the container:** This fault writes inside the target container's filesystem view. It does not write to the host node directly. Use [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress) to fill the node filesystem.
- **Sub-MiB `FILL_SIZE`:** A fill below the noise floor of `df` does not produce a measurable effect. Use a fill of at least a few MiB to see meaningful change.
- **Network-attached volumes with thin-provisioning quirks:** Some cloud storage classes report a different "free" size than the underlying provisioned volume. A fill that succeeds on the file system may still produce inconsistent quota signals from the storage backend.

---

## Troubleshooting

<Troubleshoot
  issue="FS fill experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, missing RBAC for the chaos service account, or a PodSecurity admission policy blocking privileged pods. Confirm the service account has the permissions listed above and the chaos namespace has the required Pod Security level."
/>

<Troubleshoot
  issue="FS fill reports no space at FILE_PATH or fails to write"
  mode="docs"
  fallback="The most common causes are: FILE_PATH does not exist inside the target container, the path is mounted read-only, or the underlying volume is already at capacity. Verify the path with kubectl exec -n <namespace> <pod-name> -c <container> -- ls -ld <FILE_PATH>. Check securityContext.readOnlyRootFilesystem and the volume's mount options."
/>

<Troubleshoot
  issue="FS fill runs but the application does not surface any disk error"
  mode="docs"
  fallback="The application may not write to FILE_PATH at all, or it may write to a different path. Set FILE_PATH to the directory the application actually uses (log directory, working directory, scratch space), not just /tmp. Verify by listing open file descriptors with kubectl exec <pod> -c <container> -- ls -l /proc/1/fd."
/>

<Troubleshoot
  issue="Connection to container runtime fails for fs-fill in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. If your nodes use Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock. Confirm the path by SSHing to the node and running ls -l on each candidate socket file."
/>

---

## Related faults

- [Disk fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill): Fill a percentage of the container's ephemeral-storage limit instead of writing an absolute size at a specific path.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog) and [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog): Apply CPU or memory pressure on the target container.
- [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress): Drive disk I/O at the node level rather than against a single container.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
