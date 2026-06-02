---
id: pod-io-latency
title: Pod IO latency
sidebar_label: Pod IO Latency
description: Add configurable delay to filesystem syscalls against a target Kubernetes pod's mounted volume so you can test how the application behaves under slow storage.
keywords:
  - chaos engineering
  - pod io latency
  - slow disk
  - filesystem chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - io-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-io-latency
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-io-latency
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-io-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import IOFaultsCaution from './shared/io-faults-caution.md'

Pod IO latency is a Kubernetes pod-level chaos fault that adds a configurable delay to filesystem syscalls on a target container's mounted volume for a configurable duration. The scope is the container's mount namespace, so other pods on the same node and unrelated paths see normal IO performance. When the fault ends, syscalls return to their baseline latency immediately.

Use this fault to test how a service behaves when reads or writes against a backing volume suddenly become slow: a degraded CSI driver, an EBS volume hitting burst-credit exhaustion, a network-attached volume on a saturated link, or a noisy-neighbor disk.

<IOFaultsCaution />

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Slow disk simulation:** When a database `fsync` takes 5 seconds instead of 5 ms, do transactions block, time out, or retry correctly?
- **Log-write back-pressure:** If log writes get slow, does the application back off or does the in-memory buffer grow without bound until OOM?
- **Liveness probe robustness:** Does a probe that reads a status file fail when the read is slow, oscillating the pod in and out of `Ready`?
- **Tail-latency budgets:** A p99 of 5 seconds on disk reads, does the service still meet its SLO or do upstream timeouts cascade?
- **Volume failover validation:** For workloads with read replicas backed by separate volumes, does traffic shift away from the slow replica?

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

Configure the following fault parameters when you add Pod IO latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each matched syscall. Accepts Go duration strings such as `200ms`, `5s`, `1m`. | `"5s"` |
| `PERCENTAGE` | Percentage of matching IO requests to delay, between `0` and `100`. `100` delays every request. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MOUNT_PATH` | Volume mount path inside the container to scope the fault. Empty applies to all mounts. | `""` |
| `FILE_PATH` | File path or glob beneath `MOUNT_PATH` to scope the fault. Empty applies to all files under `MOUNT_PATH`. | `""` |
| `METHOD_TYPES` | Comma-separated syscall types to delay: `read`, `write`, `open`. Empty applies to all three. | `""` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose filesystem to slow. Empty targets the first container in the pod spec. | `""` |
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

:::tip Scope the delay narrowly
Combine `MOUNT_PATH`, `FILE_PATH`, and `METHOD_TYPES` to slow only the path under test. Slowing every read in the container often delays library loads and probes in ways that are difficult to interpret.
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

Intercepts filesystem syscalls (`read`, `write`, `open`) inside the target container's mount namespace and delays each matched call by `LATENCY`, optionally limited to a configurable percentage so other IO is unaffected.

---

## Expected behavior during fault execution

- Matched syscalls block for `LATENCY` before returning. The kernel reports normal success once the delay elapses; no errors are injected.
- Wall-clock metrics on the application (request latency, transaction time, queue depth) rise to reflect the added delay.
- TCP-backed services that hold a connection across the slow syscall may see clients time out before the syscall completes.
- Concurrency-bound applications (thread pools, semaphore-guarded code paths) saturate quickly as more requests wait on slow IO.
- Health probes that touch the filesystem may exceed their `timeoutSeconds` and mark the pod `NotReady`.

:::info When the fault ends
Syscalls return to baseline latency immediately. Threads already waiting on a delayed syscall complete on schedule and return to the pool.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on p99 request latency to confirm the rise matches the injected delay.
- **Filesystem-bound endpoints:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on an endpoint backed by the slow volume to detect client timeouts.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady`.

---

## Verify the fault execution effect

While the experiment is running, confirm the syscalls are slower:

1. **Time a matched syscall from inside the container.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <target-container> -- \
     sh -c "time cat <MOUNT_PATH>/<FILE_PATH>"
   ```

   Wall-clock time should rise by approximately `LATENCY`.

2. **Confirm application-level impact.**

   Watch the application's p99 latency metric or an HTTP probe against an endpoint that exercises the slow path. The increase should track `LATENCY`.

---

## Recovery and cleanup

- **End of duration:** Syscalls return to baseline latency automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck threads:** If the application is wedged because of saturated thread pools, restart the target pod to clear in-flight blocked work.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Read-only volumes:** `ConfigMap`, `Secret`, and downward API volumes may not respond to the delay.
- **Async IO and `mmap`:** Delay applies on syscall boundaries; data already in the page cache or mapped before the fault began may bypass the delay.

---

## Troubleshooting

<Troubleshoot
  issue="Pod IO latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No delay observed during pod-io-latency"
  mode="docs"
  fallback="The most common causes are: MOUNT_PATH does not match a real mount inside the container (verify with kubectl exec <pod> -- mount); FILE_PATH or METHOD_TYPES filters are too narrow; or the application reads through the page cache and never hits the slow syscall. Re-run with PERCENTAGE=100 and empty filters, time a fresh cat or dd against the mount, and confirm the wall-clock increase."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-io-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Threads or connections wedged after pod-io-latency ends"
  mode="docs"
  fallback="Some applications cannot drain saturated thread or connection pools after slow IO and need a restart. Restart the target pod to recover, and if the issue recurs, lower LATENCY or PERCENTAGE for subsequent runs."
/>

---

## Related faults

- [Pod IO error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-error): Fail filesystem syscalls with a configurable error code instead of slowing them.
- [Pod IO mistake](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-mistake): Corrupt filesystem data with wrong values.
- [Pod IO stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-stress): Generate sustained read and write load to create contention.
- [Disk fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill): Fill the container's ephemeral storage to trigger eviction.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
