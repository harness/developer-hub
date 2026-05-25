---
id: node-network-loss
title: Node network loss
sidebar_label: Node Network Loss
description: Drop a configurable percentage of packets on a Kubernetes node's network interface to test cluster, application, and control-plane resilience.
keywords:
  - chaos engineering
  - node network loss
  - packet loss
  - network partition
  - tc
  - netem
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-network-loss
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-network-loss
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node network loss is a Kubernetes node-level chaos fault that drops a configurable percentage/number of packets on the network path serving a target node. Harness Chaos Engineering schedules a privileged helper pod (`harness/chaos-ddcr-faults`) on the node, which applies Linux traffic control (`tc`) rules using the `sch_netem` qdisc. The fault therefore affects every workload that shares the node's network stack: application pods, DaemonSets, kube-proxy, CNI agents, and the kubelet itself.

Use this fault to simulate a node becoming a lossy network neighbor: a flapping NIC, an overloaded top-of-rack switch, a misconfigured CNI overlay, or an unhealthy underlay route.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Control-plane resilience:** Does the cluster detect, taint, and reschedule workloads from a partially or fully unreachable node within your service-level objective?
- **Stateful workload behavior:** When a node hosting a database or stateful replica (for example PostgreSQL, Kafka, Cassandra, etcd) becomes lossy, do leader election, quorum, and failover happen as expected, and do clients converge before timeouts cascade?
- **Load balancer and traffic routing:** Do your service-mesh or external load balancer health checks evict the degraded node's endpoints quickly enough, and how long does residual traffic continue to hit it?
- **Client retry and timeout configuration:** Are application HTTP and gRPC clients tuned with sensible deadlines, retries, and hedging, so that calls into a degraded node do not exhaust caller resources?
- **DaemonSet-delivered platform services:** When a node hosting CoreDNS, log shippers, or a CNI agent loses packets, does it cause regressions visible from other nodes (for example, cluster-wide DNS resolution delays)?
- **Observability and alerting:** Do your dashboards and alerts surface partial network failures, or does the failure hide as elevated error rates without a clear root cause?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Kernel module:** The `sch_netem` (also referred to as `netem`) kernel module is loadable on every node you intend to target. It is in-tree and ships with most distribution kernels. On minimal or hardened images, confirm it is available with `lsmod | grep sch_netem` or `modprobe sch_netem`. On RHEL-family hosts, install `kernel-modules-extra` if the module is missing.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods with `NET_ADMIN` and `SYS_ADMIN` capabilities in the chaos namespace. GKE Autopilot and other locked-down distributions reject these. Go to [Limitations](#limitations) to review unsupported configurations.
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Chaos infrastructure isolation:** The target nodes are not single points of failure for the chaos infrastructure itself. If chaos control-plane pods are scheduled on the node you are about to partition, the experiment loses the ability to observe and roll back.

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

Configure the following fault parameters when you add Node network loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of packets dropped on the shaped path. Accepts an integer from `0` to `100`. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Scoping**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of IP addresses or CIDRs to scope the loss to. Empty means all destinations. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of DNS names or FQDNs to scope the loss to. Empty means all destinations. | `""` |
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

:::warning Default blast radius is the entire node
When `DESTINATION_IPS` and `DESTINATION_HOSTS` are both empty, every flow leaving the node is affected, including kubelet to apiserver. That is the right setting for simulating a true node partition, but it is a large blast radius. For experiments that test a specific service-to-service path, set `DESTINATION_HOSTS` to the FQDN of the target service to keep the rest of the node healthy.
:::

---

## Fault execution in brief

Because loss is applied at the node's network path, every connection passing through it is affected unless you scope it with `DESTINATION_IPS` or `DESTINATION_HOSTS`. The traffic paths most commonly impacted are:

| Path | What is affected |
| --- | --- |
| Pod to kube-apiserver | Kubelet heartbeats and node lease renewals, in-cluster Kubernetes API calls made from any pod on this node |
| Pod to pod across nodes | East-west service traffic for any pod on this node, including DaemonSets such as CoreDNS, log shippers, and CNI agents |
| Pod to external endpoints | Egress to image registries, third-party APIs, managed databases, and SaaS providers |
| Node to node | Overlay and underlay traffic between nodes; etcd peer traffic if the target is a control-plane node |

Pods on the same node that talk to each other over `localhost` or the node's CNI bridge are typically unaffected, since that traffic does not traverse the shaped path. This depends on your CNI: bridge-mode CNIs (for example `kindnet`, `flannel` with VXLAN, default Calico) keep intra-node traffic local, while some overlay configurations hairpin through the host NIC and are affected.

---

## Expected behavior during fault execution

At 100% loss (the default), the node behaves as if it has been network-partitioned from the rest of the cluster. The controller-manager and the taint manager drive the following sequence while the fault is active:

- After the `node-monitor-grace-period` elapses without a successful node lease renewal (default 40 seconds, raised to 50 seconds in Kubernetes 1.32), the controller-manager flips the node's Ready condition to `Unknown` and applies the `node.kubernetes.io/unreachable:NoExecute` taint.
- Pods on the node tolerate that taint for `tolerationSeconds: 300` by default (set by the `DefaultTolerationSeconds` admission controller). After that 5-minute window, the taint manager evicts them.
- `Deployment` pods are recreated on other Ready nodes. `StatefulSet` pods remain `Terminating` because the StatefulSet controller will not recreate a pod that still exists with the same identity; you must force-delete it to reclaim the slot.
- Pods bound to local persistent volumes or `hostPath` storage cannot reschedule and remain `Pending` with a volume node-affinity conflict until the node recovers.
- On the node itself, kubelet keeps the existing containers running. Liveness probes execute locally and may still restart containers.

At lower loss percentages (for example, 30 to 60%), most TCP connections survive but throughput collapses and tail latency spikes. This is the more interesting regime for testing application-level retries, circuit breakers, and timeout tuning.

:::info Exact timings vary by cluster
Both `node-monitor-grace-period` and the default toleration seconds are kube-controller-manager flags. Managed Kubernetes providers and hardened clusters often tune them. Go to [Kubernetes node status](https://kubernetes.io/docs/reference/node/node-status/) to read how the controller-manager observes nodes, and use the numbers above as defaults rather than guarantees.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state:** Run `kubectl get node <name> -w` to confirm the `NotReady` transition, and `kubectl get pods -o wide --field-selector spec.nodeName=<name> -w` to track eviction and reschedule. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) or the [node status check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/node-status-check) template to validate these conditions.
- **Application service-level indicators:** Watch error rate, p99 latency, and saturation for the workloads that route to or through the affected node. The signal that matters is whether callers degraded gracefully or the failure amplified. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **Platform signals:** Service-mesh outlier statistics, load balancer health-check states, and alert firings. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when your platform misses the incident.

---

## Verify the fault execution effect

While the experiment is running, confirm that loss is actually being injected. From a workstation with `kubectl` access:

1. **Confirm the helper pod is on the target node.**

   ```bash
   kubectl get pods -n <chaos-namespace> -o wide | grep node-network-loss-helper
   ```

   The pod's `NODE` column must match the target node and its status must be `Running`.

2. **Inspect the active `tc` rules on the target node** by execing into the helper pod:

   ```bash
   kubectl exec -n <chaos-namespace> <helper-pod-name> -- tc qdisc show dev eth0
   ```

   You should see a `netem` qdisc with `loss <percentage>%`. If the output shows only `pfifo_fast`, the rule has not been applied yet or `NETWORK_INTERFACE` does not match the node's actual interface name.

3. **Confirm loss from outside the node.** From another pod (on a different node):

   ```bash
   kubectl run -it --rm netshoot --image=nicolaka/netshoot --restart=Never -- \
     ping -c 50 -W 1 <target-pod-ip-or-svc>
   ```

   Loss should be close to the configured `NETWORK_PACKET_LOSS_PERCENTAGE`. Tail latency from successful packets stays close to baseline; that is the signature that distinguishes loss from latency injection.

4. **Watch node and pod state.**

   ```bash
   kubectl get node <target-node> -w
   kubectl get pods --field-selector spec.nodeName=<target-node> -o wide -w
   ```

   At 100% loss, expect the node to transition to `NotReady` within roughly one minute.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the helper pod removes the `tc` qdisc it created and terminates. Packet flow returns to baseline within a few seconds. There is no node reboot.
- **Node Ready state:** Once the kubelet successfully renews its lease, the controller-manager removes the `node.kubernetes.io/unreachable:NoExecute` taint and the node transitions back to `Ready`. New pods can be scheduled on it again.
- **Evicted Deployment pods:** Pods that were evicted during the fault are not automatically rescheduled back to the recovered node. They remain on the replacement nodes the scheduler placed them on.
- **Terminating StatefulSet pods:** Force-delete to release the StatefulSet identity slot:

  ```bash
  kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
  ```

- **If the helper pod is killed mid-experiment:** The `tc` rule may not be removed. To clean it up manually, exec into a privileged pod on the affected node (or use a debug pod with `kubectl debug node/<node-name>`) and run:

  ```bash
  tc qdisc del dev <interface> root
  ```

  Then verify with `tc qdisc show dev <interface>`.

- **Abort the experiment early:** Stop the experiment from the Harness Chaos Studio. The helper pod terminates and runs its cleanup hook.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes, GKE Autopilot):** Fargate and ACI virtual nodes do not expose real nodes, container runtime sockets, or the ability to schedule privileged pods on them. GKE Autopilot blocks the security context this fault requires.
- **Windows nodes:** Linux `tc`/`netem` is not available. Use the equivalent [Windows network fault](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-blackhole-chaos) on Windows-only workloads.
- **Single-node clusters or co-located chaos infrastructure:** If the chaos infrastructure pods (ddci and fault-specific pods) live on the node you are about to partition, the experiment loses observability and may fail to roll back. Schedule chaos infrastructure on a node outside the blast radius.
- **Pods using `hostNetwork: true`:** These bypass per-pod network namespaces. Loss is still applied to the node, but observed behavior depends on how the pod uses the host stack.
- **Hardened kernels without `sch_netem`:** Some custom or stripped distribution kernels omit the netem qdisc. The fault fails fast with `Cannot find device ... Error: Specified qdisc kind is unknown.`

---

## Troubleshooting

<Troubleshoot
  issue="Node network loss helper pod stays Pending or never schedules on the target node in Harness Chaos Engineering"
  mode="docs"
  fallback="Check the helper pod with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the helper does not tolerate, insufficient CPU or memory on the node, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment, free resources on the node, or run the experiment in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Node network loss fails immediately with tc 'Specified qdisc kind is unknown' or 'Cannot find device' in Harness Chaos Engineering"
  mode="docs"
  fallback="The sch_netem kernel module is missing or the NETWORK_INTERFACE value does not match a real interface on the node. SSH to the node and run lsmod | grep sch_netem and ip -br link to confirm. On RHEL-family hosts install kernel-modules-extra and reboot; otherwise set NETWORK_INTERFACE to the actual interface name (for example ens5 on EKS, eth0 on most others)."
/>

<Troubleshoot
  issue="Node network loss fault runs but no packet loss is observed on the target node"
  mode="docs"
  fallback="Three common causes: (1) DESTINATION_HOSTS resolves to IPs not on the shaped path so loss never matches, (2) the workload you are probing routes over a different interface than NETWORK_INTERFACE, or (3) traffic stays intra-node and never crosses the shaped interface. Exec into the helper pod and run tc qdisc show dev <interface> to confirm the netem rule is active, and probe loss from a pod on a different node."
/>

<Troubleshoot
  issue="Node remains NotReady after node-network-loss completes in Harness Chaos Engineering"
  mode="docs"
  fallback="The helper pod likely did not run its cleanup hook. Exec a debug pod onto the node with kubectl debug node/<node-name> -it --image=ubuntu and run tc qdisc del dev <interface> root, then tc qdisc show <interface> to confirm only pfifo_fast remains. The node returns to Ready once the kubelet successfully renews its lease."
/>

---

## Related faults

- [Node network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-latency): Same delivery mechanism, but injects delay instead of drops. Use it to test timeouts without provoking the unreachable-node path.
- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Scopes the impact to a single pod's network namespace rather than the whole node.
- [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart) and [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Test planned and unplanned node loss, which is the failure mode network loss eventually escalates into.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
