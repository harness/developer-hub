---
id: pod-io-attribute-override
title: Pod IO attribute override
sidebar_label: Pod IO Attribute Override
description: Override file attributes (such as permissions, size, or ownership) returned by stat syscalls on a target Kubernetes pod's mounted volume to test how the application reacts to changed metadata.
keywords:
  - chaos engineering
  - pod io attribute override
  - filesystem chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - io-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-io-attribute-override
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-io-attribute-override
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-io-attribute-override
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import IOFaultsCaution from './shared/io-faults-caution.md'

Pod IO attribute override is a Kubernetes pod-level chaos fault that rewrites the attributes returned by filesystem stat-family syscalls (`stat`, `lstat`, `fstat`) on a target container's mounted volume for a configurable duration. The application sees the wrong attributes (permissions, size, owner, mode, and so on) without the on-disk file actually changing. When the fault ends, the original attributes are reported again immediately.

Use this fault to test how a service behaves when filesystem metadata changes unexpectedly: a permissions drift, a misconfigured `subPath`, a CSI driver that returns inconsistent ownership, or a file that suddenly appears to be a different size.

<IOFaultsCaution />

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Permission-drift detection:** When the application reads a file's mode and sees `0`, does it refuse to use it, fall back to a default, or crash?
- **Ownership-driven authorization:** If `stat()` reports a different UID for a credentials file, does the runtime continue to load it or treat it as untrusted?
- **Size-based pre-allocation:** Backups and uploaders that pre-allocate based on file size, do they handle a reported size that does not match real bytes?
- **Modification-time caches:** Does an mtime-keyed cache invalidate or thrash when timestamps flicker?
- **Symlink and special-file handling:** Override the file mode to a different type (regular vs symlink vs device) and confirm the application's type checks.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The pod you intend to target is in the `Running` state with a mounted volume.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **Mounted volume:** The target container has at least one mounted volume reachable at `MOUNT_PATH`.
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

Configure the following fault parameters when you add Pod IO attribute override to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `ATTRIBUTES` | JSON object of file attributes and their override values. Common keys: `perm` (mode bits), `size`, `uid`, `gid`, `atime`, `mtime`, `ctime`. Example: `'{"perm":72}'` sets the mode bits to octal `0110`. | `'{"perm":72}'` |
| `PERCENTAGE` | Percentage of matching stat requests to override, between `0` and `100`. `100` overrides every request. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MOUNT_PATH` | Volume mount path inside the container to scope the fault. Empty applies to all mounts. | `""` |
| `FILE_PATH` | File path or glob beneath `MOUNT_PATH` to scope the fault. Empty applies to all files under `MOUNT_PATH`. | `""` |
| `METHOD_TYPES` | Comma-separated syscall types to override: `read`, `write`, `open`. Empty applies to all three. | `""` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose filesystem to affect. Empty targets the first container in the pod spec. | `""` |
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

:::tip Reference for common attribute keys
Mode bits in `perm` are decimal representations of the underlying octal mode. For example, `420` is octal `0644` (rw-r--r--), and `493` is octal `0755` (rwxr-xr-x).
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

Intercepts filesystem stat-family syscalls inside the target container's mount namespace and rewrites the attributes returned to the caller using the keys and values in `ATTRIBUTES`, optionally limited to a configurable percentage and scoped by path and method.

---

## Expected behavior during fault execution

- Matched stat syscalls return the overridden attribute values. The on-disk attributes are not modified.
- Applications that gate behavior on `stat()` (permission checks, size pre-allocation, owner-based trust) see the wrong values and react accordingly.
- File-system-walking tools (`ls -l`, `find`, build systems) display the overridden values for files under the filter.
- Operations like `open()`, `read()`, `write()` still go through the real on-disk file unless their behavior depends on the overridden attribute first.

:::info When the fault ends
Stat syscalls return the real on-disk attributes again immediately.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Permission errors:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to grep container logs for `permission denied` or `EACCES` strings.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod stops being `Ready`.
- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to detect 5xx responses that correlate with the fault window.

---

## Verify the fault execution effect

While the experiment is running, confirm `stat()` returns the override:

1. **Stat a matched file from inside the container.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <target-container> -- \
     stat <MOUNT_PATH>/<FILE_PATH>
   ```

   The reported mode (or other overridden attribute) should match the values in `ATTRIBUTES`.

2. **Confirm application-level impact.**

   ```bash
   kubectl logs -n <namespace> <target-pod> -c <target-container> --tail=200
   ```

   Look for permission errors, type-mismatch errors, or unexpected fallbacks tied to the overridden attribute.

---

## Recovery and cleanup

- **End of duration:** Stat syscalls return real attributes again automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If the application cached the wrong attributes and cannot refresh, restart the target pod.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Attributes are reported, not stored:** The on-disk file is unchanged. Use Pod IO mistake or Pod IO error if you need actual writes to be corrupted or rejected.
- **Cached attributes:** Applications that cache stat results (Go's `os.FileInfo`, Java's `File` metadata) may continue to see the overridden values briefly after the fault ends until the cache refreshes.

---

## Troubleshooting

<Troubleshoot
  issue="Pod IO attribute override experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No attribute change observed during pod-io-attribute-override"
  mode="docs"
  fallback="The most common causes are: MOUNT_PATH does not match a real mount inside the container (verify with kubectl exec <pod> -- mount); FILE_PATH filter is too narrow; ATTRIBUTES is not valid JSON; or the application reads cached metadata rather than calling stat. Re-run with PERCENTAGE=100, empty FILE_PATH, and a minimal ATTRIBUTES value to confirm the path is working."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-io-attribute-override in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod IO error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-error): Fail filesystem syscalls with a configurable error code.
- [Pod IO latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-latency): Add delay to filesystem syscalls.
- [Pod IO mistake](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-mistake): Corrupt filesystem read or write data with wrong values.
- [Pod IO stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-io-stress): Generate sustained read and write load.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
