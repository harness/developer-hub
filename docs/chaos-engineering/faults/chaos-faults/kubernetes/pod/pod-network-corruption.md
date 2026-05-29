---
id: pod-network-corruption
title: Pod network corruption
sidebar_label: Pod Network Corruption
description: Corrupt a configurable percentage of packets on a target Kubernetes pod's network namespace to test checksum, retransmit, and integrity behavior.
keywords:
  - chaos engineering
  - pod network corruption
  - packet corruption
  - network chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-corruption
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-network-corruption
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-network-corruption
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod network corruption is a Kubernetes pod-level chaos fault that flips random bits in a configurable percentage of packets on the network path serving a target pod for a configurable duration. Corrupted packets fail their IP, TCP, or UDP checksums and are silently discarded by the receiver, so corruption manifests to the application as packet loss but with normal round-trip time. Only the selected pods are affected; other pods on the node and the node's host networking are unaffected.

Use this fault to test how a service behaves when the network mangles bytes on the wire: a faulty NIC, a degraded fiber link, MTU mismatches with fragmentation issues, or a misbehaving overlay encapsulation.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Checksum-based retransmit:** Does TCP recover from corrupted packets via retransmission, or does the connection stall?
- **Application-level integrity:** For protocols that carry their own checksums (databases, RPCs, file transfers), does the application detect corruption and refuse the data, or does it silently accept bad bytes?
- **TLS handshake under corruption:** TLS records are checksum-protected; what happens to the handshake when 25% of packets get corrupted? Does the client retry cleanly?
- **gRPC and HTTP/2 framing:** Are gRPC and HTTP/2 framed correctly enough to drop only the corrupted frames, or does corruption tear down the whole connection?

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

Configure the following fault parameters when you add Pod network corruption to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_PACKET_CORRUPTION_PERCENTAGE` | Percentage of packets to corrupt on the matched flows. `100` corrupts every packet; `25` flips bits on a quarter of them. | `100` |
| `CORRELATION` | Corruption correlation as a percentage. `0` makes each packet independent; higher values clump corrupt packets. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Traffic filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of destination IPs. Corruption applies only to packets headed to these IPs. Empty matches all destinations. | `""` |
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

Configures the container's network interface to corrupt a specified percentage of packets (flipping a random bit in each), optionally scoping the effect to only certain destination IPs, hosts, or ports so other traffic passes through unaffected.

---

## Expected behavior during fault execution

- TCP connections retransmit corrupted segments. At low corruption (`10`%), throughput drops modestly. At high corruption (`50+`%), the connection effectively halts because every retransmit is also likely corrupted.
- UDP traffic (DNS, QUIC, video) loses corrupted packets without retransmission. Application-level logic determines whether the call fails or recovers.
- TLS handshakes can fail if the corruption rate exceeds the renegotiation tolerance of the TLS stack. Modern stacks typically retry the handshake a few times before giving up.
- gRPC and HTTP/2 detect framing errors and may tear down the entire connection; the client typically reconnects.
- Health probes that route through the corrupted path can fail; the kubelet may mark the pod `NotReady`.

:::info When the fault ends
The corruption configuration is removed, and the pod's network returns to normal immediately. Active TCP connections resume retransmits without corruption and recover.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **TCP retransmit and error counters:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_netstat_Tcp_RetransSegs` or your CNI's equivalent.
- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for endpoint health; checksum failures appear as connection errors, not slow responses.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod stays `NotReady` longer than your SLO.

---

## Verify the fault execution effect

While the experiment is running, confirm corruption is reaching the application:

1. **Look for TCP retransmits inside the target container.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -c <target-container> -- cat /proc/net/snmp | grep -A 1 ^Tcp:
   ```

   `RetransSegs` should rise sharply during the fault as receivers discard corrupted segments and senders retransmit.

2. **Drive traffic from another pod and watch for errors.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -m 5 http://<target-pod-ip>:<port>/healthz
   ```

   At high `NETWORK_PACKET_CORRUPTION_PERCENTAGE`, requests fail or stall on retransmits. At lower values, latency rises while throughput drops.

---

## Recovery and cleanup

- **End of duration:** The corruption configuration is removed automatically and connectivity returns to normal within a few seconds.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **CNI plugins that bypass the pod's `eth0`:** Custom CNI plugins routing host-side may not be affected by this fault.
- **`hostNetwork` pods:** The fault refuses to inject on `hostNetwork: true` pods to avoid corrupting host traffic.

---

## Troubleshooting

<Troubleshoot
  issue="Pod network corruption experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints, insufficient resources, or PodSecurity admission blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No application errors observed during pod-network-corruption"
  mode="docs"
  fallback="The most common causes are: corruption percentage too low to overwhelm TCP retransmits (try 50% or higher); the filter is too narrow and matches no real traffic (broaden DESTINATION_IPS/HOSTS/PORTS); or NETWORK_INTERFACE does not match the pod's interface. Drive traffic from another pod with curl or ping and watch for retransmits on the target container's /proc/net/snmp."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-network-corruption in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Corruption persists after pod-network-corruption ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop packets entirely instead of corrupting them.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add delay to packets instead of corrupting them.
- [Pod network duplication](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-duplication): Duplicate packets to simulate path flapping.
- [Pod network rate limit](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-rate-limit): Throttle bandwidth on the path.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
