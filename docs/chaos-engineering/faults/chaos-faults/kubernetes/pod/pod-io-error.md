---
id: pod-io-error
title: Pod IO error
sidebar_label: Pod IO Error
description: Make filesystem syscalls on a target Kubernetes pod's mounted volume return a configurable error code, so you can validate how the application handles failed reads, writes, and opens.
keywords:
  - chaos engineering
  - pod io error
  - filesystem chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - io-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-io-error
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-io-error
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-io-error
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import IOFaultsCaution from './shared/io-faults-caution.md'

Pod IO error is a Kubernetes pod-level chaos fault that makes filesystem syscalls on a target container's mounted volume return a configurable error code (for example `EIO` or `ENOSPC`) for a configurable duration. The fault scope is the container's mount namespace, so other pods on the same node and unrelated paths are unaffected. When the fault ends, syscalls behave normally again immediately.

Use this fault to test how a service behaves when reads, writes, or opens against a backing volume start failing: a stuck CSI driver, a full disk that returns `ENOSPC`, a misconfigured `subPath`, or a kernel that hands back `EIO` on a failing disk.

<IOFaultsCaution />

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Write-path resilience:** When `write` on the application's log file returns `EIO`, does the process crash, retry, or silently lose data?
- **Read-path fallbacks:** If reads from a config or cache file fail with `ENOENT` or `EACCES`, does the application fall back to a default or refuse to start?
- **Disk-full simulation:** Force `ENOSPC` (error code `28`) on writes and verify whether the queue back-pressures correctly instead of OOMing in memory.
- **Health-check sensitivity:** Do readiness probes that touch the filesystem fail safely, or do they oscillate the pod in and out of service?
- **Persistence guarantees:** Does the application call `fsync` and surface the resulting error, or does it report success while data is silently dropped?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The pod you intend to target is in the `Running` state with a mounted volume.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **Mounted volume:** The target container has at least one writable mounted volume reachable at `MOUNT_PATH`.
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

Configure the following fault parameters when you add Pod IO error to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `ERROR_CODE` | Linux error code returned by matched syscalls. Common values: `5` (`EIO`), `13` (`EACCES`), `28` (`ENOSPC`), `5` is the default. | `5` |
| `PERCENTAGE` | Percentage of matching IO requests to fail, between `0` and `100`. `100` fails every request. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MOUNT_PATH` | Volume mount path inside the container to scope the fault. Empty applies to all mounts. | `""` |
| `FILE_PATH` | File path or glob beneath `MOUNT_PATH` to scope the fault. Empty applies to all files under `MOUNT_PATH`. | `""` |
| `METHOD_TYPES` | Comma-separated syscall types to fail: `read`, `write`, `open`. Empty applies to all three. | `""` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose filesystem to fail. Empty targets the first container in the pod spec. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to target. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, inject `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Common pod selection tunables (`TARGET_WORKLOAD_KIND`, `TARGET_WORKLOAD_NAMESPACE`, `TARGET_WORKLOAD_NAMES`, `TARGET_WORKLOAD_LABELS`) are documented in [common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults). Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Scope the failure narrowly
Combine `MOUNT_PATH`, `FILE_PATH`, and `METHOD_TYPES` to fail only the path under test, for example only `write` calls under `/var/log/app/`. This keeps unrelated startup reads and library loads unaffected, so you isolate the variable you actually want to test.
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

Intercepts filesystem syscalls (`read`, `write`, `open`) inside the target container's mount namespace and returns `ERROR_CODE` for a configurable percentage of requests against the configured `MOUNT_PATH` and `FILE_PATH`.

---

## Expected behavior during fault execution

- Matched syscalls fail with the configured error code. Applications that check syscall return values see `errno` set accordingly.
- Logs typically show stack traces from filesystem libraries (Go `*PathError`, Java `IOException`, Python `OSError`).
- Health probes that read or write files start failing if their paths are covered by the filter.
- Stateful applications may surface write failures as transaction rollbacks, queue back-pressure, or replication lag depending on the workload.

:::info When the fault ends
Syscalls behave normally again immediately. Open file descriptors that hit errors during the fault remain in whatever state the application left them; restart the pod if it cannot recover on its own.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service to detect IO-related 5xx responses.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod stops being `Ready` due to failing filesystem-backed health checks.
- **Filesystem-error logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to grep container logs for the expected errno text (`Input/output error`, `No space left on device`).

---

## Verify the fault execution effect

While the experiment is running, confirm syscalls are failing:

1. **Trigger a matched syscall from inside the container.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <target-container> -- \
     sh -c "echo test > <MOUNT_PATH>/<FILE_PATH>"
   ```

   The command should fail with the configured error code.

2. **Confirm application-level impact.**

   ```bash
   kubectl logs -n <namespace> <target-pod> -c <target-container> --tail=200
   ```

   Look for the expected `errno` string (for example `Input/output error` for `EIO`, `No space left on device` for `ENOSPC`).

---

## Recovery and cleanup

- **End of duration:** Syscalls return to normal behavior automatically as soon as the fault duration elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If the application is left in a broken state (for example a partially written file or wedged file descriptor), restart the target pod to reset.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Read-only volumes:** `ConfigMap`, `Secret`, and downward API volumes are read-only and may not be affected by `write` filters.
- **`hostPath` and `tmpfs`:** Effects vary by kernel and mount options; behavior on these volumes is not guaranteed.
- **Async IO and `mmap`:** Errors are surfaced on syscall boundaries; pages already mapped before the fault began may not see new errors until they are evicted.

---

## Troubleshooting

<Troubleshoot
  issue="Pod IO error experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No errors observed during pod-io-error"
  mode="docs"
  fallback="The most common causes are: MOUNT_PATH does not match a real mount inside the container (verify with kubectl exec <pod> -- mount); FILE_PATH or METHOD_TYPES filters are too narrow and match no real traffic; the application reads from a different path than expected (verify with strace or kubectl logs). Re-run with PERCENTAGE=100 and empty MOUNT_PATH/FILE_PATH/METHOD_TYPES to confirm the path is working, then tighten filters."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-io-error in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Application is wedged after pod-io-error ends"
  mode="docs"
  fallback="Some applications do not recover from mid-flight syscall errors and need a restart. Restart the target pod and, if the issue recurs, capture chaos pod logs before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod IO latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-latency): Add delay to filesystem syscalls instead of failing them.
- [Pod IO mistake](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-mistake): Corrupt filesystem read or write data with wrong values instead of failing.
- [Pod IO attribute override](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-attribute-override): Override file attributes (such as permissions) on the mounted volume.
- [Pod IO stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-stress): Generate sustained read and write load to test disk pressure.
- [Disk fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill): Fill the container's ephemeral storage to trigger eviction.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
