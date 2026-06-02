---
id: pod-io-mistake
title: Pod IO mistake
sidebar_label: Pod IO Mistake
description: Seed wrong data into reads or writes against a target Kubernetes pod's mounted volume so you can validate how the application detects and recovers from silent data corruption.
keywords:
  - chaos engineering
  - pod io mistake
  - data corruption
  - filesystem chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - io-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-io-mistake
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-io-mistake
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-io-mistake
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import IOFaultsCaution from './shared/io-faults-caution.md'

Pod IO mistake is a Kubernetes pod-level chaos fault that overwrites a configurable number of bytes in matched filesystem read or write syscalls on a target container's mounted volume for a configurable duration. The application sees the call succeed, but the data flowing through it has been seeded with wrong bytes. When the fault ends, syscalls behave normally again immediately.

Use this fault to test how a service detects and recovers from silent data corruption: a flaky disk that flips bytes, a buggy controller that returns shuffled blocks, or a hardware error that escapes parity checks.

<IOFaultsCaution />

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Checksum coverage:** Does the application verify checksums on read, or does it silently propagate corrupted data downstream?
- **Format-level validation:** When a JSON or Protobuf payload is read with zeroed bytes in the middle, does the parser reject the message or crash on it?
- **Replication conflict handling:** For replicated stateful workloads, does a corrupted write cause the follower to diverge, and does the cluster detect the split?
- **Backup integrity:** If a backup process reads corrupted bytes from a snapshot, does the resulting backup get flagged or stored as-is?
- **Recovery story:** Once the fault ends, can the application repair its in-memory state, or does it stay broken until restart?

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

Configure the following fault parameters when you add Pod IO mistake to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SEED` | Wrong-data pattern to substitute. Common values: `zero` (zero bytes), `random`, or a literal string. | `"zero"` |
| `MAX_TIMES` | Maximum number of places per syscall payload to seed the wrong data. | `1` |
| `MAX_SIZE` | Maximum size in bytes of each seeded chunk. | `8` |
| `PERCENTAGE` | Percentage of matching IO requests to corrupt, between `0` and `100`. `100` corrupts every request. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MOUNT_PATH` | Volume mount path inside the container to scope the fault. Empty applies to all mounts. | `""` |
| `FILE_PATH` | File path or glob beneath `MOUNT_PATH` to scope the fault. Empty applies to all files under `MOUNT_PATH`. | `""` |
| `METHOD_TYPES` | Comma-separated syscall types to corrupt: `read`, `write`, `open`. Empty applies to all three. | `""` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose filesystem to corrupt. Empty targets the first container in the pod spec. | `""` |
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

:::warning Writes seed corruption to disk
When `METHOD_TYPES` includes `write`, the wrong bytes can land on disk and survive the fault. Always run against a recoverable test environment with backups; never run against production data.
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

Intercepts filesystem syscalls (`read`, `write`, `open`) inside the target container's mount namespace and substitutes up to `MAX_TIMES` slices of up to `MAX_SIZE` bytes in the payload with `SEED`, optionally limited to a configurable percentage so other IO is unaffected.

---

## Expected behavior during fault execution

- Matched syscalls return success with corrupted payloads. Applications that do not checksum what they read or write pass the corruption downstream.
- Format-aware parsers (JSON, Protobuf, BSON) typically fail loudly with parse errors when the corruption falls in a structural region.
- Checksumming layers (RocksDB, etcd, MongoDB) surface verification failures and may close affected segments or trip read-repair.
- Writes can persist corrupted bytes to the backing volume. The corruption survives until overwritten or repaired by the application.

:::info When the fault ends
Syscalls behave normally again immediately. Any corrupted data already written to the volume remains until the application overwrites or repairs it.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to detect parse or checksum errors surfacing as 5xx.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod stops being `Ready` because of failing self-checks.
- **Checksum / corruption metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on workload-specific counters (RocksDB `block_checksum_mismatch`, MongoDB `wiredTiger` cursor errors, etc.).

---

## Verify the fault execution effect

While the experiment is running, confirm the data is corrupted:

1. **Read a matched file and inspect a hexdump.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <target-container> -- \
     sh -c "head -c 64 <MOUNT_PATH>/<FILE_PATH> | hexdump -C"
   ```

   The leading bytes should contain the `SEED` pattern instead of the original content.

2. **Confirm application-level impact.**

   ```bash
   kubectl logs -n <namespace> <target-pod> -c <target-container> --tail=200
   ```

   Look for parse errors, checksum mismatches, or rejected payloads.

---

## Recovery and cleanup

- **End of duration:** Syscalls behave normally again automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Persisted corruption:** Bytes written to the volume during the fault remain corrupted. Restore from backup, replay from a clean source, or rebuild affected state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Read-only volumes:** `ConfigMap`, `Secret`, and downward API volumes are read-only.
- **Persisted corruption is not undone:** Writes that succeeded during the fault leave corrupted bytes on disk. Plan recovery before running.
- **Page cache and `mmap`:** Bytes already in the page cache or mapped pages may bypass the syscall path; behavior on these reads is not guaranteed.

---

## Troubleshooting

<Troubleshoot
  issue="Pod IO mistake experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No corruption observed during pod-io-mistake"
  mode="docs"
  fallback="The most common causes are: MOUNT_PATH does not match a real mount inside the container (verify with kubectl exec <pod> -- mount); FILE_PATH or METHOD_TYPES filters are too narrow; or the application reads through the page cache and never hits the patched syscall. Re-run with PERCENTAGE=100, empty filters, drop caches if possible, and hexdump a fresh read."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-io-mistake in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Data is still corrupted after pod-io-mistake ends"
  mode="docs"
  fallback="Writes that landed on disk during the fault remain corrupted. Restore the affected files from backup, replay from a known-good source, or rebuild the volume. Run this fault only against test data that can be recreated."
/>

---

## Related faults

- [Pod IO error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-error): Fail filesystem syscalls with a configurable error code instead of corrupting data.
- [Pod IO latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-latency): Add delay to filesystem syscalls.
- [Pod IO attribute override](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-attribute-override): Override file attributes on the mounted volume.
- [Pod IO stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-stress): Generate sustained read and write load.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
