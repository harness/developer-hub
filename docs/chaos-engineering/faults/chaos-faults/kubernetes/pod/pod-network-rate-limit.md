---
id: pod-network-rate-limit
title: Pod network rate limit
sidebar_label: Pod Network Rate Limit
description: Cap bandwidth on a target Kubernetes pod's network path to test throughput-sensitive workloads, batch jobs, and bandwidth-bound flows.
keywords:
  - chaos engineering
  - pod network rate limit
  - bandwidth limit
  - network chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-rate-limit
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-network-rate-limit
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-network-rate-limit
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod network rate limit is a Kubernetes pod-level chaos fault that caps the bandwidth available on a target pod's network path for a configurable duration. The pod can still reach all destinations, but matched flows are shaped to the configured rate. Only the selected pods are affected; other pods on the node and the node's host networking are unaffected.

Use this fault to test how a service behaves when its outbound (or inbound, depending on filter direction) link is saturated: a noisy neighbor consuming shared bandwidth, a misconfigured node-level rate limit, a slow WAN link, or a backup taking over the path.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Throughput-sensitive workloads:** When a streaming or batch service has its egress bandwidth capped, does it back-pressure cleanly to upstream producers, or does it OOM by buffering?
- **Large object transfers:** During an S3 multipart upload or a large image push, do callers handle a sudden bandwidth crunch with reasonable timeouts and resumption?
- **Database replication lag:** If replication traffic is throttled, does the workload recover (eventual consistency) or thrash (split brain)?
- **Service mesh and proxy behavior:** Do sidecars respect connection-level flow control and propagate back-pressure, or do they accumulate buffers and OOM?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace.
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

Configure the following fault parameters when you add Pod network rate limit to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_BANDWIDTH` | Sustained bandwidth cap. Use units like `1mbit`, `512kbit`, `100mbit`. | `"1mbit"` |
| `BURST` | Number of bytes the bucket can accumulate when idle, used to absorb short bursts. | `"32kb"` |
| `LIMIT` | Maximum bytes queued by the shaper before packets are dropped. Larger values smooth bursts at the cost of higher latency. | `"2mb"` |
| `MIN_BURST` | Minimum burst size, useful on slow links to avoid starving small packets. Leave empty for the kernel default. | `""` |
| `PEAK_RATE` | Optional second bucket allowing short bursts above `NETWORK_BANDWIDTH`. Leave empty to disable. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Traffic filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of destination IPs. The cap applies only to packets headed to these IPs. Empty matches all destinations. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames. The helper resolves them and adds the resolved IPs to the filter. | `""` |
| `NETWORK_INTERFACE` | Network interface inside the target container's namespace. Almost always `eth0` for standard CNI plugins. | `eth0` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod whose network namespace to enter. Empty targets the first container in the pod spec. | `""` |
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

:::tip Choose realistic values
A `1mbit` cap reproduces ADSL-grade WAN. `10-100mbit` mimics a busy cloud network. `1gbit` or higher rarely triggers visible application behavior. Pick a rate noticeably below what your workload normally consumes.
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

Configures the container's network interface to cap outbound bandwidth at a specified rate (with configurable burst and queue behavior), optionally scoping the effect to only certain destination IPs, hosts, or ports so other traffic passes through unaffected.

---

## Expected behavior during fault execution

- Outbound throughput from the pod to matched destinations is capped at `NETWORK_BANDWIDTH`. Existing TCP connections see their congestion window collapse to match the bottleneck.
- Bursts up to `BURST` are allowed when the bucket has accumulated tokens (typically after the pod has been idle).
- When the queue fills past `LIMIT`, the shaper drops new packets; the application sees these as connection-level slowdowns and potential retransmits.
- gRPC and HTTP/2 connections accommodate the lower throughput with longer transfer times. Streaming clients (video, log shippers) back-pressure their producers; if the producer cannot slow down, it buffers and may OOM.
- Database replication, object-storage upload, and similar bandwidth-bound flows take longer in direct proportion to the new cap.

:::info When the fault ends
The cap is removed and the pod's full bandwidth is restored immediately. Any queued packets are flushed at line rate.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Throughput and queue length:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your CNI's bytes-transferred metric and your application's queue depth.
- **Back-pressure propagation:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on upstream services to confirm they slow down rather than buffer to OOM.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for endpoint health; latency rises in proportion to the bandwidth crunch.

---

## Verify the fault execution effect

While the experiment is running, measure throughput and confirm the cap is in effect:

1. **Measure throughput from inside the pod.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <target-container> -- \
     sh -c "time curl -o /dev/null -s http://<test-endpoint>/large-file"
   ```

   The transfer rate should plateau near `NETWORK_BANDWIDTH`.

2. **Measure throughput from another pod to the target.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     iperf3 -c <target-pod-ip> -t 10
   ```

   Reported throughput on matched flows should be capped near `NETWORK_BANDWIDTH`; unmatched flows transit at the link's natural ceiling.

---

## Recovery and cleanup

- **End of duration:** The cap is removed automatically and bandwidth returns to normal within seconds.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **CNI plugins that bypass the pod's `eth0`:** Some eBPF-based plugins route packets host-side and may not be affected by this fault.
- **`hostNetwork` pods:** The fault refuses to inject on `hostNetwork: true` pods to avoid throttling host traffic.
- **Asymmetric flows:** The cap is enforced on egress from the target pod. Inbound traffic from the destination is not shaped, so request-response patterns are throttled only on the response leg.

---

## Troubleshooting

<Troubleshoot
  issue="Pod network rate limit experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints, insufficient resources, or PodSecurity admission blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Throughput not capped during pod-network-rate-limit"
  mode="docs"
  fallback="The most common causes are: NETWORK_INTERFACE does not match the pod's interface (verify with kubectl exec <pod> -- ip link show); the filter is too narrow and matches no real traffic (broaden DESTINATION_IPS/HOSTS); NETWORK_BANDWIDTH is higher than the path's natural ceiling; or BURST is larger than the test transfer so the entire payload fits in one burst. Lower BURST and re-run iperf3 from another pod to confirm matched flows are capped."
/>

<Troubleshoot
  issue="Application OOMs during pod-network-rate-limit"
  mode="docs"
  fallback="The application is buffering data faster than the rate limit can drain, and is not propagating back-pressure to its producer. This is a real reliability finding, not a fault setup issue. Lower the producer rate, add a bounded queue with drop semantics, or raise the application's memory limit."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-network-rate-limit in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Bandwidth cap persists after pod-network-rate-limit ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop packets instead of throttling bandwidth.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add delay to packets instead of throttling.
- [Pod network corruption](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-corruption): Corrupt packets to test checksum handling.
- [Pod network duplication](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-duplication): Duplicate packets to test idempotency and dedup.
- [Pod network partition](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-partition): Block traffic entirely using a NetworkPolicy.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
