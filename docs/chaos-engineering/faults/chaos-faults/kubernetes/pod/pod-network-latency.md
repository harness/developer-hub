---
id: pod-network-latency
title: Pod network latency
sidebar_label: Pod Network Latency
description: Add a configurable delay to packets on a target Kubernetes pod's network path to test timeout, retry, and tail-latency behavior of upstream and downstream calls.
keywords:
  - chaos engineering
  - pod network latency
  - jitter
  - network chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-latency
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-network-latency
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod network latency is a Kubernetes pod-level chaos fault that adds a configurable delay to packets on the network path serving a target pod for a configurable duration. Only the selected pods experience the delay; other pods on the node and the node's host networking are unaffected. When the fault ends, the delay is removed and the pod's network returns to normal immediately.

Use this fault to test how a service behaves when one or more replicas suddenly experience high latency to upstream dependencies, peers, or callers: a cross-region failover, a degraded WAN, a slow database, or a queue backed up under load.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Timeout and retry budgets:** When a downstream call takes 5 seconds instead of 50 ms, do clients honor sensible timeouts? Does the retry budget hold, or do callers amplify load?
- **Cross-region latency simulation:** Before a multi-region migration, simulate inter-region latency and verify whether your read-after-write semantics still hold.
- **Connection pool sizing:** Higher latency means more in-flight requests for the same throughput. Does the pool size up, or does the workload starve?
- **Service mesh failover:** Does the mesh shift traffic away from the slow replica through outlier detection, or do the slow responses propagate?
- **Probe sensitivity:** Are readiness and liveness probes resilient to short latency spikes, or do they oscillate the pod in and out of service?

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

Configure the following fault parameters when you add Pod network latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_LATENCY` | Latency to add to each packet. Accepts Go duration strings such as `100ms`, `2s`, `500us`. | `"2s"` |
| `JITTER` | Random variation around `NETWORK_LATENCY` in milliseconds. `0` means perfectly fixed delay. | `0` |
| `CORRELATION` | Latency correlation as a percentage. `0` makes each packet's delay independent; higher values smooth the variation. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Traffic filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of destination IPs. Latency applies only to packets headed to these IPs. Empty matches all destinations. | `""` |
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

:::tip Scope latency to one dependency
Setting `DESTINATION_HOSTS=db.example.svc` or `DESTINATION_PORTS=5432` adds latency only to that dependency. Mesh control plane, metrics, DNS, and other traffic stay fast, so you isolate the variable under test.
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

Configures the container's network interface to add a specified delay (with optional jitter) to outbound packets, optionally scoping the effect to only certain destination IPs, hosts, or ports so other traffic passes through unaffected.

---

## Expected behavior during fault execution

- Packets matching the filter are buffered and released after the configured delay. Round-trip times rise by `NETWORK_LATENCY` plus any `JITTER` variation.
- TCP throughput drops in proportion to the latency increase (bandwidth-delay product). HTTP/2 and gRPC connections accommodate the delay, but each call takes correspondingly longer.
- UDP traffic (DNS, QUIC) is delayed but not dropped. DNS lookups that previously took 5 ms now take `5 + NETWORK_LATENCY` ms; clients with short DNS timeouts may consider the lookup failed.
- At very high latencies (10+ seconds), TCP keepalive can fail and connections drop. Health probes can time out.
- Service meshes with outlier detection on slow response times may eject the pod from upstream load-balancing pools.

:::info When the fault ends
The delay is removed and the pod's network returns to normal immediately. Any in-flight delayed packets are released as soon as the configuration is torn down.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Tail latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your p99 latency metric to confirm the increase matches the injected delay.
- **Client timeouts and retries:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health; rising timeouts signal that the client is not budgeted for the delay.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady` due to probe timeouts.

---

## Verify the fault execution effect

While the experiment is running, measure round-trip time and confirm the increase:

1. **Measure round-trip time from another pod.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     ping -c 5 <target-pod-ip>
   ```

   The reported RTT should increase by approximately `NETWORK_LATENCY` (plus any `JITTER`) on matched flows.

2. **Confirm application-level impact.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s http://<target-pod-ip>:<port>/healthz
   ```

   `time_total` should reflect the added delay. Application timeouts shorter than `NETWORK_LATENCY` fail; longer ones succeed but with elevated tail latency.

---

## Recovery and cleanup

- **End of duration:** The delay configuration is removed automatically and latency returns to baseline within seconds.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **CNI plugins that bypass the pod's `eth0`:** Some eBPF-based plugins route packets host-side and may not be affected by this fault.
- **`hostNetwork` pods:** The fault would apply to the host interface and affect the entire node. It refuses to inject on `hostNetwork: true` pods.

---

## Troubleshooting

<Troubleshoot
  issue="Pod network latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No latency observed during pod-network-latency"
  mode="docs"
  fallback="The most common causes are: NETWORK_INTERFACE does not match the pod's interface (verify with kubectl exec <pod> -- ip link show); the filter is too narrow and matches no real traffic (broaden DESTINATION_IPS/HOSTS/PORTS); or the pod uses hostNetwork and the fault was refused. Run ping from another pod to the target pod IP and confirm whether matched flows are slower."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-network-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Latency persists after pod-network-latency ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop packets instead of delaying them.
- [Pod network corruption](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-corruption): Corrupt a percentage of packets.
- [Pod network duplication](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-duplication): Duplicate a percentage of packets.
- [Pod network rate limit](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-rate-limit): Throttle bandwidth instead of adding delay.
- [Node network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-latency): Apply latency at the node level rather than to a single pod.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
