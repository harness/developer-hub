---
id: disk-fill
title: Disk fill
sidebar_label: Disk Fill
description: Fill a target Kubernetes container's ephemeral storage as a percentage of its limit to test ephemeral-storage eviction, retention, and back-pressure logic.
keywords:
  - chaos engineering
  - disk fill
  - ephemeral storage
  - storage eviction
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - storage-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/disk-fill
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/disk-fill
  - /docs/chaos-engineering/chaos-faults/kubernetes/disk-fill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Disk fill is a Kubernetes pod-level chaos fault that consumes a configurable percentage of a target container's ephemeral storage. The fault writes data into the container's writable layer until the configured percentage of the container's `ephemeral-storage` limit is reached, then holds the consumption for the rest of the duration.

Use this fault to test how a workload behaves when its scratch space, log directory, or temp files exceed the budget you have set: whether the kubelet evicts the pod under `DiskPressure`, whether the application gracefully rotates and discards data, and whether downstream systems detect the disrupted writes.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Ephemeral-storage limits:** When the container fills its `resources.limits.ephemeral-storage`, does the kubelet evict the pod with a `DiskPressure` reason inside your expected window?
- **Log rotation under pressure:** Does the application's log rotation policy keep the writable layer below the limit when log volume spikes, or do uncapped logs themselves cause the eviction?
- **Temp-file cleanup:** Does the workload clean up temp files on `SIGTERM`, or does an eviction leak temp data into the next replacement pod?
- **Disk-bound back-pressure:** When the disk fills, does the application detect write failures and shed load, surface 5xx, or hang on the next `write()`?
- **Replica recovery after eviction:** Does the workload's controller (Deployment, StatefulSet) reschedule the evicted pod onto a node with capacity inside your SLO?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The pods you intend to fill are in the `Running` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. The fault writes into the target container's writable layer through the container runtime.
- **Container runtime access:** The chaos infrastructure can reach the container runtime on the target nodes. The default `containerd` socket path is mounted automatically.
- **Ephemeral-storage limit configured (recommended):** The target container has `resources.limits.ephemeral-storage` set. Without a limit, `FILL_PERCENTAGE` is interpreted against the node's filesystem capacity and the experiment can spill onto neighboring pods.

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

Configure the following fault parameters when you add Disk fill to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILL_PERCENTAGE` | Percentage of the target container's `ephemeral-storage` limit to consume. | `80` |
| `DATA_BLOCK_SIZE` | Write block size in KB. Larger blocks fill the disk faster; smaller blocks generate more I/O syscalls. | `256` |
| `EPHEMERAL_STORAGE_MEBIBYTES` | Override for the detected ephemeral-storage limit, in MiB. Set to `0` to auto-detect from the container's resource spec. | `0` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The fill is held for the duration once the target percentage is reached. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose ephemeral storage is filled. Empty targets the first container in the pod spec. | `""` |
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

:::warning Without an ephemeral-storage limit, the fault has no boundary
If the target container does not have `resources.limits.ephemeral-storage` set, the fault falls back to the node's filesystem size for the percentage calculation. A `FILL_PERCENTAGE` of 80 then targets 80 percent of the entire node disk and can starve neighboring pods. Set a sensible container limit or use the `EPHEMERAL_STORAGE_MEBIBYTES` override.
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

Writes data into the target container's writable layer until the configured percentage of its ephemeral-storage limit is consumed, holds the fill for the duration, and frees the data when the fault ends.

---

## Expected behavior during fault execution

- The container's ephemeral-storage usage rises toward the configured `FILL_PERCENTAGE` of its limit and stays there for the duration.
- If the fill exceeds `resources.limits.ephemeral-storage`, the kubelet evicts the pod with `Reason: Evicted` and `Message: container ... has used ... ephemeral-storage which exceeds limit`. The pod's controller reschedules a replacement on another Ready node.
- Application writes to the writable layer (logs, temp files, scratch space) may fail with `ENOSPC` (no space left on device) before the eviction completes. How the application handles that error determines the user-visible behavior.
- Reads are not affected. Existing files remain readable; only new writes can fail.
- Volume-backed paths (`emptyDir.medium: Memory`, PVCs, `hostPath` mounts) are not affected by ephemeral-storage limits and continue to function normally.
- The kubelet may also apply node-level `DiskPressure` if the node's filesystem fills past the eviction threshold; this is a node-wide condition, not specific to the target pod.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the fault removes the data it wrote and the container's ephemeral-storage usage returns to baseline within seconds. If the pod was evicted before the fault completed, the eviction stands; the replacement pod is a fresh container.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Application error rate:** Watch for spikes in 5xx and disk-related error logs (`ENOSPC`, `no space left`) during the fault. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to assert direct endpoint health.
- **Eviction events:** Track `kube_pod_status_reason{reason="Evicted"}` for the target workload's namespace. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to confirm whether the eviction did or did not happen, depending on what you are testing.
- **Replica recovery:** Look for `SuccessfulCreate` events on the workload after the eviction. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the workload does not converge back to its declared replicas inside your SLO.

---

## Verify the fault execution effect

While the experiment is running, confirm that the target container's storage is actually being consumed:

1. **Check ephemeral-storage usage on the pod.**

   ```bash
   kubectl describe pod -n <namespace> <pod-name> | grep -A 3 'ephemeral-storage'
   ```

   The `Usage` line should be near `FILL_PERCENTAGE` of the configured limit.

2. **List disk usage inside the target container.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <container> -- df -h /
   ```

   The root filesystem usage should be elevated. If the container has its own emptyDir or hostPath mounts, check those separately; ephemeral-storage is the writable layer of the container itself.

3. **Look for eviction events.**

   ```bash
   kubectl get events -n <namespace> --field-selector reason=Evicted --sort-by='.lastTimestamp'
   ```

   At `FILL_PERCENTAGE` above 100, expect an `Evicted` event referencing `ephemeral-storage`. Below 100, no eviction should occur.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the written data is removed and the container's ephemeral-storage usage returns to baseline within seconds.
- **Evicted pods reschedule:** If the fault exceeded the container's limit and the pod was evicted, the replacement is scheduled by the workload's controller on any Ready node with capacity.
- **Replacement on the same node may re-evict immediately:** If the replacement lands on a node that is itself under `DiskPressure`, it may be evicted before becoming Ready. Free node space or wait for the kubelet to garbage-collect unused images.
- **Application-level retention:** Applications that keep state in the writable layer (caches, scratch space, intermediate files) lose that state when evicted. Validate that the workload reconstructs the state cleanly on the replacement pod.
- **Abort the experiment early:** Stopping the experiment from Chaos Studio triggers cleanup of the written data. Any eviction that has already happened cannot be undone.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Containers without an ephemeral-storage limit:** Without a limit, the percentage calculation falls back to the node's filesystem and the blast radius extends beyond the target. Set a container limit before running this fault in production.
- **Volume-backed writable paths:** This fault fills the container's writable layer. It does not fill `emptyDir` volumes, PVCs, or `hostPath` mounts. Use a workload-specific fault if you need to fill those.
- **Read-only root filesystems:** Containers configured with `readOnlyRootFilesystem: true` reject writes from the fault. Use [FS fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/fs-fill) against a writable mount path instead.
- **Tiny ephemeral-storage limits:** Limits below a few hundred MiB fill in well under a second and may not give the kubelet time to detect the breach. Raise the limit or use a larger duration with a lower `FILL_PERCENTAGE` to produce sustained pressure.

---

## Troubleshooting

<Troubleshoot
  issue="Disk fill experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, missing RBAC for the chaos service account, or a PodSecurity admission policy blocking privileged pods. Confirm the service account has the permissions listed above and the chaos namespace has the required Pod Security level."
/>

<Troubleshoot
  issue="Disk fill runs but the target container's ephemeral-storage usage does not increase"
  mode="docs"
  fallback="The most common causes are: TARGET_CONTAINER does not match any container in the pod spec, the container has readOnlyRootFilesystem set to true, or the writable layer is too small to register a measurable change. Verify the container name with kubectl get pod <name> -o jsonpath='{.spec.containers[*].name}', check the container's securityContext, and consider using FS fill with a writable mount path instead."
/>

<Troubleshoot
  issue="Pod was evicted but the workload's replica count did not recover"
  mode="docs"
  fallback="The replacement pod is failing to schedule. Run kubectl describe pod -n <namespace> <new-pod-name> for the message. Common causes: every node is under DiskPressure (the fault filled too aggressively), insufficient CPU or memory available cluster-wide, or PV topology constraints. Lower FILL_PERCENTAGE so the fault stays under the limit, or add cluster capacity."
/>

<Troubleshoot
  issue="Connection to container runtime fails for disk-fill in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. If your nodes use Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock. Confirm the path by SSHing to the node and running ls -l on each candidate socket file."
/>

---

## Related faults

- [FS fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/fs-fill): Write a specific size of data to a specific path inside the container, useful for filling mounted volumes or non-root paths.
- [Pod CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-cpu-hog) and [Pod memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-memory-hog): Apply CPU or memory pressure on the target container.
- [Node I/O stress](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-io-stress): Drive disk I/O at the node level rather than against a single container.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
