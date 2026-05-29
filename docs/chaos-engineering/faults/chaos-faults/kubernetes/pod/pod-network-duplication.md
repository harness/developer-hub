---
id: pod-network-duplication
title: Pod network duplication
sidebar_label: Pod Network Duplication
description: Duplicate a configurable percentage of packets on a target Kubernetes pod's network namespace to test idempotency and dedup behavior.
keywords:
  - chaos engineering
  - pod network duplication
  - duplicate packets
  - network chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-duplication
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-network-duplication
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-network-duplication
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod network duplication is a Kubernetes pod-level chaos fault that duplicates a configurable percentage of packets on the network path serving a target pod for a configurable duration. The receiver gets two copies of selected packets, which exercises TCP duplicate-segment handling and application-level dedup logic. Only the selected pods are affected; other pods on the node and the node's host networking are unaffected.

Use this fault to test how a service behaves when the network delivers duplicates: link flapping, mis-configured equal-cost multi-path (ECMP) routing, retransmit storms from an upstream proxy, or middleboxes that mirror traffic.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Idempotency of writes:** Do duplicate requests on a non-idempotent API double-charge customers, double-publish events, or otherwise corrupt state?
- **UDP dedup:** For DNS, QUIC, and custom UDP protocols, do clients dedup duplicate responses correctly, or do they get confused?
- **Mesh and proxy behavior:** Do service mesh sidecars and load balancers drop the duplicates they receive, or do they forward them upstream?
- **Event-driven dedup:** If your event bus uses at-least-once delivery, duplicates on the wire add to the workload. Does the consumer dedup using message IDs, or does it process the same event twice?

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

Configure the following fault parameters when you add Pod network duplication to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_PACKET_DUPLICATION_PERCENTAGE` | Percentage of packets to duplicate on the matched flows. `100` duplicates every packet; `50` duplicates half. | `100` |
| `CORRELATION` | Duplication correlation as a percentage. `0` makes each packet independent; higher values clump duplicates. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Traffic filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of destination IPs. Duplication applies only to packets headed to these IPs. Empty matches all destinations. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames. The helper resolves them and adds the resolved IPs to the filter. | `""` |
| `SOURCE_PORTS` | Comma-separated list of source ports on the target pod. Empty matches all source ports. | `""` |
| `DESTINATION_PORTS` | Comma-separated list of destination ports. Empty matches all destination ports. | `""` |
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

### Configure for your container runtime

Set `CONTAINER_RUNTIME` and `SOCKET_PATH` to match the runtime on the target node:

| `CONTAINER_RUNTIME` | `SOCKET_PATH` |
| --- | --- |
| `containerd` (default) | `/run/containerd/containerd.sock` |
| `docker` | `/var/run/docker.sock` |
| `crio` | `/var/run/crio/crio.sock` |

---

## Fault execution in brief

Configures the container's network interface to duplicate a specified percentage of packets (each duplicate carrying the same sequence number as the original), optionally scoping the effect to only certain destination IPs, hosts, or ports so other traffic passes through unaffected.

---

## Expected behavior during fault execution

- TCP receivers detect duplicate sequence numbers and discard the second copy; the connection continues normally. The cost is doubled traffic on the wire, which can saturate links.
- UDP receivers (DNS, QUIC, custom protocols) see two packets. If the application is not idempotent, it processes the request twice.
- TCP retransmit counters rise on the receiver side. CNI plugins that count packets may report inflated throughput.
- For low duplication percentages (`10-25`%), the impact is mainly bandwidth overhead. At high percentages (`75+`%), the receiver buffer can fill, and the connection slows or drops.
- Service mesh dedup at the proxy layer typically handles TCP duplicates well; UDP-based protocols are more exposed.

:::info When the fault ends
The duplication configuration is removed, and the pod's network returns to normal immediately.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application-level dedup:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on an endpoint that tracks request idempotency, or a custom [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe).
- **Bandwidth usage:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your CNI's bytes-transferred metric.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the pod oscillates `NotReady`.

---

## Verify the fault execution effect

While the experiment is running, send traffic and confirm duplicates are reaching the receiver:

1. **Send UDP traffic and count packets at the receiver.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     sh -c "echo hi | nc -u -w 1 <target-ip> <udp-port>"
   ```

   Use `tcpdump` on the receiver to count incoming packets — you should see roughly `(1 + NETWORK_PACKET_DUPLICATION_PERCENTAGE/100)` × the sent count on matched flows.

2. **Observe TCP retransmit counters.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <target-container> -- cat /proc/net/snmp | grep -A 1 ^Tcp:
   ```

   TCP receivers discard duplicate segments and counters reflect the activity.

---

## Recovery and cleanup

- **End of duration:** The duplication configuration is removed automatically and connectivity returns to normal within seconds.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **CNI plugins that bypass the pod's `eth0`:** Custom CNI plugins routing host-side may not be affected by this fault.
- **`hostNetwork` pods:** The fault refuses to inject on `hostNetwork: true` pods to avoid duplicating host traffic.
- **Saturated links:** Doubling traffic on a near-capacity link causes packet drops at the upstream switch or NIC. This can mask the duplication effect with apparent loss.

---

## Troubleshooting

<Troubleshoot
  issue="Pod network duplication experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints, insufficient resources, or PodSecurity admission blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No duplicate packets observed during pod-network-duplication"
  mode="docs"
  fallback="The most common causes are: NETWORK_INTERFACE does not match (verify with kubectl exec <pod> -- ip link show); the filter is too narrow and matches no real traffic (broaden DESTINATION_IPS/HOSTS/PORTS); or the receiving end's NIC offload is silently deduping. Send UDP traffic from another pod and count packets on the receiver with tcpdump to confirm matched flows are duplicated."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-network-duplication in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Duplication persists after pod-network-duplication ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop packets instead of duplicating them.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add delay to packets.
- [Pod network corruption](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-corruption): Corrupt packets to test checksum handling.
- [Pod network rate limit](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-rate-limit): Throttle bandwidth on the path.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
