---
id: node-io-stress
title: Node I/O stress
sidebar_label: Node IO Stress
description: Stress disk I/O on a Kubernetes node to test ephemeral-storage eviction, etcd write tolerance, log shipper backpressure, and noisy-neighbor isolation.
keywords:
  - chaos engineering
  - node io stress
  - disk pressure
  - ephemeral storage
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - resource-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-io-stress
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-io-stress
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node I/O stress is a Kubernetes node-level chaos fault that drives sustained disk I/O pressure on a target node. Harness Chaos Engineering schedules a privileged helper pod (`harness/chaos-ddcr-faults`) on the node, which runs Linux `stress-ng` I/O workers that read, write, and sync files on the node's filesystem. Every workload that touches the disk competes for bandwidth and IOPS: application pods writing logs or data, the kubelet writing its own logs and lease state, the container runtime pulling images, and (on single-disk clusters) etcd.

Use this fault to simulate a disk-saturated neighbor: a misbehaving log shipper, an ETL job writing temp files faster than they can be flushed, or a node whose underlying disk has hit its provisioned IOPS ceiling.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Ephemeral-storage eviction:** When disk fills past the kubelet's `ephemeral-storage` eviction threshold, do pods that exceed their request get evicted in the expected order?
- **Log shipper and tail behavior:** When disk write latency spikes, do log shippers back-pressure cleanly, or do they drop logs and hide signal during the very incident you would want to investigate?
- **Etcd write tolerance on small clusters:** On clusters where etcd shares a disk with workloads, does the I/O storm cause etcd write latency to spike and leader elections to flap?
- **Container image pulls under disk pressure:** When the container runtime is competing for I/O, do image pulls back off cleanly or do they time out and trigger a pull loop?
- **Application performance under slow disk:** Do disk-bound services (databases, search indexers, write-ahead logs) degrade gracefully, or does throughput collapse beyond the disk's ceiling?
- **Persistent volume isolation:** When the node's filesystem is hot, do pods backed by their own PVs stay isolated, or do they degrade because the underlying storage shares queues?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. The helper pod writes against the host filesystem.
- **Container runtime socket:** The chaos infrastructure has access to the container runtime socket on the target nodes. The default `containerd` socket path is mounted automatically.
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Sufficient free disk space:** The helper writes large temp files. If you set `FILESYSTEM_UTILIZATION_BYTES` higher than the node has free, the fault may fill the disk and trigger unintended eviction. Inspect free space with `kubectl describe node <name>` (look at `ephemeral-storage`) before tuning.
- **Workloads have ephemeral-storage requests and limits:** Without ephemeral-storage requests, the kubelet cannot rank pods for eviction by ephemeral-storage usage.

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

---

## Permissions required

The fault runs under the chaos infrastructure's service account. The account must be able to perform the following operations against the target cluster.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Create the helper pod that runs the I/O workers on the target node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs from the helper pod for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress and any pod evictions as Kubernetes events |
| `nodes` (`""`) | `get`, `list` | Discover target nodes and validate selectors |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Node I/O stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILESYSTEM_UTILIZATION_PERCENTAGE` | Disk to consume as a percentage of free space on the node's filesystem. | `10` |
| `FILESYSTEM_UTILIZATION_BYTES` | Disk to consume as an absolute value in GB. Mutually exclusive with `FILESYSTEM_UTILIZATION_PERCENTAGE`. | `""` |
| `NUMBER_OF_WORKERS` | Number of I/O workers used to drive disk pressure. | `4` |
| `VM_WORKERS` | Number of VM workers used to drive memory churn alongside disk I/O. | `1` |
| `CPU` | Number of CPU cores used by the stress workers (helps keep the helper from getting throttled). | `1` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

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

:::warning Pick percentage or absolute bytes, not both
`FILESYSTEM_UTILIZATION_PERCENTAGE` and `FILESYSTEM_UTILIZATION_BYTES` are mutually exclusive. If both are set, `FILESYSTEM_UTILIZATION_PERCENTAGE` wins. The default 10% reproduces bandwidth and IOPS pressure without filling the disk. Use absolute byte values only when you want to cross the kubelet's `nodefs.available` eviction threshold deliberately.
:::

---

## Fault execution in brief

I/O pressure has two distinct failure shapes depending on how you tune it:

| Tuning | Primary failure mode |
| --- | --- |
| Default (`FILESYSTEM_UTILIZATION_PERCENTAGE=10`, many workers) | Bandwidth/IOPS saturation. Writes slow down; nothing fills up. |
| Large `FILESYSTEM_UTILIZATION_BYTES` close to free space | Disk fills, `nodefs.available` drops past the kubelet's eviction threshold, pods are evicted in ephemeral-storage usage order. |

---

## Expected behavior during fault execution

- The helper writes temp files in its own directory and continuously read/writes through them. When `TOTAL_CHAOS_DURATION` elapses, the files are removed and the disk space is reclaimed.
- I/O is shared across every process on the node. Application write latency depends on how the storage stack handles parallelism: SSDs absorb more than HDDs; EBS gp3 is bound by provisioned IOPS rather than physical limits.
- On clusters where etcd shares the same disk as workload nodes (rare in production, common in development), the fault can cause etcd write latency to spike and trigger leader re-elections.
- When `nodefs.available` drops below the eviction threshold, the kubelet evicts pods that exceed their `ephemeral-storage` request. Among those, `BestEffort` pods (which have no request) are evicted first, then `Burstable` pods exceeding their request.
- The kubelet keeps renewing its lease as long as it can write to its log directory. Saturating I/O to the point that lease writes stall is unusual and indicates the disk is the bottleneck for everything else on the node too.

:::info I/O stress is local
This fault stresses the local node's disk. It does not affect remote storage (S3, GCS, networked databases) unless the application caches data on the local disk before sending it remotely.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state and eviction:** Run `kubectl get events --field-selector reason=Evicted -n <namespace> -w` to see eviction in real time. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to validate that critical pods stay `Running`.
- **Application service-level indicators:** Watch error rate, p99 write latency, and queue depth for disk-bound workloads on the affected node. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for endpoint health, or a custom probe on application metrics like database write commit time.
- **Disk and runtime metrics:** Track `node_disk_io_time_seconds_total`, `kubelet_volume_stats_available_bytes`, and image pull failure counts. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when disk saturation crosses an unacceptable ceiling.

---

## Verify the fault execution effect

While the experiment is running, confirm that disk pressure is actually being applied. From a workstation with `kubectl` access:

1. **Confirm the helper pod is on the target node.**

   ```bash
   kubectl get pods -n <chaos-namespace> -o wide | grep node-io-stress-helper
   ```

   The pod's `NODE` column must match the target node and its status must be `Running`.

2. **Watch disk I/O on the node.** From a privileged debug pod on the affected node:

   ```bash
   kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host \
     bash -c "iostat -xz 2 5"
   ```

   `%util` should approach 100% and `await` should rise. If both are near baseline, the workers did not start or the helper is constrained by its own resource limits.

3. **Watch for eviction events (when running with `FILESYSTEM_UTILIZATION_BYTES`).**

   ```bash
   kubectl get events --field-selector reason=Evicted --all-namespaces -w
   ```

   Expect events with reason `Evicted` and a message referencing `DiskPressure` or `ephemeral-storage` once the disk fills past the threshold.

4. **Measure application write latency.** Open the dashboard for any disk-bound service on the affected node and confirm write latency has stepped up. If you do not see the step, the application's writes may go to a separate PV that has its own queue.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the helper pod removes its temp files and terminates. Disk I/O returns to baseline within a few seconds.
- **Evicted pods reschedule:** Pods that were evicted during the fault are scheduled on other Ready nodes by the scheduler. They are not placed back on the recovered node automatically.
- **Containers that crashed on write failures may need restart:** Applications that treat a `EIO` or `ENOSPC` as fatal may be in `CrashLoopBackOff`. Investigate logs and decide whether to retry or roll back.
- **If the helper pod is killed mid-experiment:** The temp files it created may remain on the node's filesystem. Clean them up with a debug pod:

  ```bash
  kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host \
    bash -c "find /tmp -name 'stress-ng-*' -mtime -1 -delete"
  ```

  Then confirm with `df -h /` that free space has returned to baseline.

- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. The helper pod terminates and cleans up its temp files.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** Fargate and ACI virtual nodes do not expose real nodes or allow privileged pods to write at the host level. GKE Autopilot blocks the privileged security context this fault requires.
- **Windows nodes:** The `stress-ng` utility this fault relies on is Linux-only.
- **Single-node clusters or co-located chaos infrastructure:** If the chaos infrastructure pods (ddci and fault-specific pods) live on the saturated node and depend on disk writes, the experiment may lose observability. Schedule chaos infrastructure on a node outside the blast radius.
- **Networked storage only:** If your workloads write exclusively to networked persistent volumes (EBS, NFS, Ceph), local disk pressure may produce little observable signal at the application layer. Use a workload that writes locally, or stress the storage backend directly.
- **Production etcd on shared disks:** If etcd shares a disk with workloads in production, this fault can destabilize the control plane. Confirm topology before running.

---

## Troubleshooting

<Troubleshoot
  issue="Node I/O stress helper pod stays Pending or never schedules on the target node in Harness Chaos Engineering"
  mode="docs"
  fallback="Check the helper pod with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the helper does not tolerate, insufficient ephemeral storage to schedule the helper, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations, free disk space on the node, or run the experiment in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Node I/O stress runs but disk metrics show no change on the target node"
  mode="docs"
  fallback="Either the stress-ng workers failed to start or the helper pod is constrained by its own resource limits. Check the helper pod logs with kubectl logs -n <chaos-namespace> <helper-pod-name>. Confirm with iostat on the node that the helper's PID is the one driving I/O. Increase NUMBER_OF_WORKERS if you need more pressure but the helper is running."
/>

<Troubleshoot
  issue="Node disk fills during node-io-stress and pods are evicted with DiskPressure"
  mode="docs"
  fallback="This is the expected behavior when FILESYSTEM_UTILIZATION_BYTES is set close to or above the node's free space. To prevent disk-fill eviction in future runs, use FILESYSTEM_UTILIZATION_PERCENTAGE (which targets bandwidth/IOPS) or set FILESYSTEM_UTILIZATION_BYTES well below kubectl describe node <name>'s ephemeral-storage available value."
/>

<Troubleshoot
  issue="Etcd reports slow disk warnings during node-io-stress on a small cluster"
  mode="docs"
  fallback="Etcd is sharing the disk that the I/O stress is hitting. In production, etcd should be on a dedicated disk; in development this is a known limitation. Reduce NUMBER_OF_WORKERS, lower FILESYSTEM_UTILIZATION_PERCENTAGE, or schedule the fault to a worker node where etcd is not co-located."
/>

<Troubleshoot
  issue="Helper pod's temp files remain on the node after node-io-stress completes"
  mode="docs"
  fallback="The helper pod was killed before its cleanup hook ran (for example by an out-of-memory event or by the experiment being aborted). Use kubectl debug node/<target-node> -it --image=ubuntu -- chroot /host to enter the node, then find /tmp -name 'stress-ng-*' -mtime -1 -delete. Verify with df -h / that free space has returned to baseline."
/>

---

## Related faults

- [Node CPU hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog): Same blast-radius shape but applies CPU pressure. Use it to test throttling rather than disk saturation.
- [Node memory hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog): Same blast-radius shape but applies memory pressure. Use it to test eviction by `memory.available`.
- [Disk fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/disk-fill) and [Filesystem fill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/fs-fill): Scope disk pressure to a single pod's ephemeral storage rather than the whole node.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
