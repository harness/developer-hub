---
id: node-network-latency
title: Node network latency
sidebar_label: Node Network Latency
description: Inject configurable network latency on a Kubernetes node's interface to test application timeouts, retry tuning, and tail-latency resilience.
keywords:
  - chaos engineering
  - node network latency
  - network delay
  - tc
  - netem
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-network-latency
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-network-latency
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node network latency is a Kubernetes node-level chaos fault that adds a configurable delay to packets leaving a target node. Harness Chaos Engineering schedules a privileged helper pod (`harness/chaos-ddcr-faults`) on the node, which applies Linux traffic control (`tc`) rules using the `sch_netem` qdisc with a `delay` parameter. Every workload that shares the node's network stack experiences the added round-trip time: application pods, DaemonSets, kube-proxy, CNI agents, and the kubelet itself.

Use this fault to simulate a slow network neighbor: a congested transit link, a saturated NIC, an overloaded service mesh sidecar, or a cross-region failover that has stretched east-west latency.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Client timeout configuration:** Are HTTP, gRPC, and database client timeouts tuned for realistic tail latency, or do they fire so aggressively that a brief spike collapses connection pools?
- **Retry and hedging behavior:** Do retries spread over time as designed, or do they pile on at the same instant and amplify the slowdown?
- **Service-mesh and load balancer behavior:** Do outlier detection and latency-aware load balancing evict the slow node's endpoints from the rotation, and how quickly?
- **Asynchronous queue depth:** When upstream calls take longer, do queues, thread pools, and goroutine counts stay bounded, or do they grow until the application runs out of memory?
- **SLO and error budget validation:** Does your latency SLO fire before user-visible degradation, or only after?
- **Cross-region or cross-AZ failover:** When latency to a dependency stretches to cross-region levels (for example, 100 to 300 ms), does the application keep serving from the local replica, or does it amplify the slowness by waiting?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Kernel module:** The `sch_netem` kernel module is loadable on every node you intend to target. It is in-tree and ships with most distribution kernels. Confirm it is available with `lsmod | grep sch_netem` or `modprobe sch_netem`. On RHEL-family hosts, install `kernel-modules-extra` if the module is missing.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods with `NET_ADMIN` and `SYS_ADMIN` capabilities in the chaos namespace. GKE Autopilot and other locked-down distributions reject these. Go to [Limitations](#limitations) to review unsupported configurations.
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Application timeouts are configured:** Without explicit client timeouts, your application cannot distinguish a slow request from a hung one. Run this fault against services that have realistic timeouts; otherwise the observation has no failure boundary.

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
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Create the helper pod that applies `tc` rules on the target node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs from the helper pod for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `nodes` (`""`) | `get`, `list` | Discover target nodes and validate selectors |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope, for example a namespace-scoped install where you have removed cluster-wide node access.

---

## Fault tunables

Configure the following fault parameters when you add Node network latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_LATENCY` | Delay added to each packet on the shaped path. Accepts a Go-style duration string (for example, `500ms`, `2s`, `1m`). | `"2s"` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Scoping**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of IP addresses or CIDRs to scope the delay to. Empty means all destinations. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of DNS names or FQDNs to scope the delay to. Empty means all destinations. | `""` |
| `NETWORK_INTERFACE` | Interface on which `tc` rules are applied. | `eth0` |

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

:::warning Start small and scope aggressively
The default `2s` latency is high enough to break most service-level objectives. For experiments that target a single dependency path, set `DESTINATION_HOSTS` to the FQDN of the slow dependency and start with a smaller `NETWORK_LATENCY` (for example, `100ms` to `500ms`). Apply the default `2s` only when you intend to simulate a near-partition.
:::

---

## Fault execution in brief

Because the delay is added at the node's network path, every connection passing through it sees a longer round-trip time. The paths and behaviors most commonly affected are:

| Path | What is affected |
| --- | --- |
| Pod to pod across nodes | East-west RPC latency grows. Connection pools that assume tight RTTs may exhaust. |
| Pod to external endpoints | Egress to image registries, third-party APIs, managed databases, and SaaS providers. TLS handshake and TCP keepalive timers stretch. |
| Pod to kube-apiserver | In-cluster API calls take longer, but kubelet heartbeats survive unless the added latency is comparable to `node-monitor-grace-period`. |
| Node to node | Overlay and underlay traffic between nodes slows. CNI control-plane chatter slows but rarely breaks. |

Pods on the same node that talk over `localhost` or the node's CNI bridge are typically unaffected. Bridge-mode CNIs (for example `kindnet`, `flannel` with VXLAN, default Calico) keep intra-node traffic local; some overlay configurations hairpin through the host NIC and pick up the delay.

---

## Expected behavior during fault execution

At the default `2s` delay, applications with realistic timeouts (typically 1 to 5 seconds for HTTP, lower for in-cluster RPCs) will see immediate failures: timeouts firing, retries piling up, and connection pools draining.

In detail:

- TCP round-trip time on the shaped path increases by `NETWORK_LATENCY`. Existing connections survive; new connections take longer to establish because the TLS handshake adds two extra RTTs.
- Application-level timeouts decide what users see. If the client timeout is shorter than `NETWORK_LATENCY`, every call fails. If it is longer, the call succeeds but tail latency spikes.
- Connection pools that bound concurrency to a small number can exhaust quickly. A pool of size 50 that serves 1000 req/s at 5 ms RTT can suddenly hold every connection for 2 seconds, instantly turning into a bottleneck.
- The kubelet's node lease renewal RPC keeps working at the default `2s` delay because the `node-monitor-grace-period` (40 to 50 seconds in current Kubernetes versions) is well above the added latency. At extreme delays (tens of seconds), the node can still flip to `NotReady`.
- Retries that lack jitter and exponential backoff amplify the load on upstream services, sometimes triggering rate limiting or cascading failures further upstream.

:::info Latency, not loss
Unlike packet loss, this fault rarely produces a `NotReady` node transition at the default delay. If you need to test the cluster's partition-handling behavior (pod eviction, taint manager, StatefulSet stuck-Terminating), use [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss) instead.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Application service-level indicators:** Watch p50, p95, and p99 latency for the affected workloads. The signal that matters is whether your timeouts catch the degradation before users do. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint latency assertions.
- **Connection pool and concurrency metrics:** Look for in-flight request counts, queue depth, thread pool saturation, and goroutine counts. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when concurrency exceeds your safe ceiling.
- **Upstream amplification:** Track RPS to the slow dependency before and during the fault. Retries without jitter often double or triple the load. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the upstream's request rate to detect the amplification pattern.

---

## Verify the fault execution effect

While the experiment is running, confirm that latency is actually being injected. From a workstation with `kubectl` access:

1. **Confirm the helper pod is on the target node.**

   ```bash
   kubectl get pods -n <chaos-namespace> -o wide | grep node-network-latency-helper
   ```

   The pod's `NODE` column must match the target node and its status must be `Running`.

2. **Inspect the active `tc` rules on the target node** by execing into the helper pod:

   ```bash
   kubectl exec -n <chaos-namespace> <helper-pod-name> -- tc qdisc show dev eth0
   ```

   You should see a `netem` qdisc with `delay <latency>ms`. If the output shows only `pfifo_fast`, the rule has not been applied yet or `NETWORK_INTERFACE` does not match the node's actual interface name.

3. **Measure RTT from outside the node.** From another pod on a different node:

   ```bash
   kubectl run -it --rm netshoot --image=nicolaka/netshoot --restart=Never -- \
     ping -c 20 <target-pod-ip-or-svc>
   ```

   Average RTT should be close to baseline + `NETWORK_LATENCY`. Packet loss should remain at zero; that is the signature that distinguishes latency from loss injection.

4. **Watch application latency metrics.** Open the dashboard for the affected service and confirm p99 has stepped up by approximately `NETWORK_LATENCY`. If you do not see the step, traffic is routing around the slow path (for example, in-cluster `localhost` or sidecar bypass).

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the helper pod removes the `tc` qdisc it created and terminates. RTT returns to baseline within a few seconds.
- **Backlogged requests drain:** Application connection pools, retry queues, and request backlogs that built up during the fault take longer to drain than the fault itself. Plan a post-experiment observation window of two to three minutes before declaring recovery complete.
- **No node reboot or pod eviction:** Unlike [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss), this fault does not normally cause the controller-manager to mark the node `NotReady`, so no taint is applied and no pods are evicted by the taint manager.
- **If the helper pod is killed mid-experiment:** The `netem` rule may not be removed. To clean it up manually, exec into a privileged pod on the affected node (or use a debug pod with `kubectl debug node/<node-name>`) and run:

  ```bash
  tc qdisc del dev <interface> root
  ```

  Then verify with `tc qdisc show dev <interface>`.

- **Abort the experiment early:** Stop the experiment from Harness Chaos Studio. The helper pod terminates and runs its cleanup hook.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** Fargate and ACI virtual nodes do not expose real nodes, container runtime sockets, or the ability to schedule privileged pods. GKE Autopilot blocks the security context this fault requires.
- **Windows nodes:** Linux `tc`/`netem` is not available. Use the equivalent [Windows network fault](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-blackhole-chaos) on Windows-only workloads.
- **Single-node clusters or co-located chaos infrastructure:** If the chaos infrastructure pods (ddci and fault-specific pods) live on the slow node, the experiment loses observability. Schedule chaos infrastructure on a node outside the blast radius.
- **Pods using `hostNetwork: true`:** These bypass per-pod network namespaces. Delay is still applied to the node, but observed behavior depends on how the pod uses the host stack.
- **Hardened kernels without `sch_netem`:** Some custom or stripped distribution kernels omit the netem qdisc. The fault fails fast with `Specified qdisc kind is unknown.`
- **Applications without explicit timeouts:** Without client timeouts, slowness is indistinguishable from a hang and there is no observable failure boundary. Configure timeouts in the application under test before running this fault.

---

## Troubleshooting

<Troubleshoot
  issue="Node network latency helper pod stays Pending or never schedules on the target node in Harness Chaos Engineering"
  mode="docs"
  fallback="Check the helper pod with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the helper does not tolerate, insufficient CPU or memory on the node, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment, free resources on the node, or run the experiment in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Node network latency fails immediately with tc 'Specified qdisc kind is unknown' or 'Cannot find device' in Harness Chaos Engineering"
  mode="docs"
  fallback="The sch_netem kernel module is missing or the NETWORK_INTERFACE value does not match a real interface on the node. SSH to the node and run lsmod | grep sch_netem and ip -br link to confirm. On RHEL-family hosts install kernel-modules-extra and reboot; otherwise set NETWORK_INTERFACE to the actual interface name (for example ens5 on EKS, eth0 on most others)."
/>

<Troubleshoot
  issue="Node network latency fault runs but application latency does not increase"
  mode="docs"
  fallback="Three common causes: (1) the workload routes intra-node over the CNI bridge and never crosses the shaped interface, (2) DESTINATION_HOSTS resolves to IPs not on the shaped path, or (3) the application talks to a sidecar over localhost which bypasses tc. Exec into the helper pod and run tc qdisc show dev <interface> to confirm the netem rule is active, then ping the target service from a pod on a different node to verify the delay end-to-end."
/>

<Troubleshoot
  issue="Node flips to NotReady when running node-network-latency at high delay values"
  mode="docs"
  fallback="At delays comparable to or greater than node-monitor-grace-period (40 to 50 seconds in current Kubernetes), kubelet lease renewals can miss their window and the controller-manager flips the node to NotReady. Use a lower NETWORK_LATENCY value, or exclude the kube-apiserver IP from the shaped path by scoping with DESTINATION_HOSTS to the specific dependency you want to slow down."
/>

---

## Related faults

- [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss): Same delivery mechanism, but drops packets instead of delaying them. Use it to test the cluster's partition-handling path.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Scopes the delay to a single pod's network namespace rather than the whole node.
- [Pod network corruption](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-corruption) and [Pod network duplication](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-duplication): Other `netem` variants for testing how applications handle malformed or repeated packets.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
