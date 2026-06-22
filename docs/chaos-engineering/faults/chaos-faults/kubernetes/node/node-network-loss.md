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
  - network chaos
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

Node network loss is a Kubernetes node-level chaos fault that drops a configurable percentage of packets on the network path serving a target node for a configurable duration. The fault affects every workload that shares the node's network stack: application pods, DaemonSets, kube-proxy, CNI agents, and the kubelet itself.

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
- **Standard Linux networking modules:** Target nodes run a Linux kernel that includes the standard networking modules (present by default on most distributions). On minimal or hardened images, your platform team may need to install `kernel-modules-extra` (RHEL-family) or the equivalent package.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods with `NET_ADMIN` and `SYS_ADMIN` capabilities in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
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
| GKE Autopilot | Supported with [Autopilot setup](/docs/resilience-testing/chaos-testing/gke-autopilot) |

---

## Permissions required

The fault runs under the chaos infrastructure's service account. The account must be able to perform the following operations against the target cluster.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Run the chaos pod that injects the fault on the target node |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
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

Configures the target node's network interface to drop a specified percentage of packets for the configured duration, optionally scoped to certain destination IPs or hosts so other traffic passes through unaffected.

Because loss is applied at the node's network path, every connection passing through it is affected unless you scope it. The traffic paths most commonly impacted are:

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

While the experiment is running, confirm loss is reaching the node:

1. **Confirm loss from outside the node.** From another pod (on a different node):

   ```bash
   kubectl run -it --rm netshoot --image=nicolaka/netshoot --restart=Never -- \
     ping -c 50 -W 1 <target-pod-ip-or-svc>
   ```

   Loss should be close to the configured `NETWORK_PACKET_LOSS_PERCENTAGE`. Tail latency from successful packets stays close to baseline; that is the signature that distinguishes loss from latency injection.

2. **Watch node and pod state.**

   ```bash
   kubectl get node <target-node> -w
   kubectl get pods --field-selector spec.nodeName=<target-node> -o wide -w
   ```

   At 100% loss, expect the node to transition to `NotReady` within roughly one minute.

---

## Recovery and cleanup

- **End of duration:** When `TOTAL_CHAOS_DURATION` elapses, the loss configuration is removed automatically and packet flow returns to baseline within a few seconds. There is no node reboot.
- **Node Ready state:** Once the kubelet successfully renews its lease, the controller-manager removes the `node.kubernetes.io/unreachable:NoExecute` taint and the node transitions back to `Ready`. New pods can be scheduled on it again.
- **Evicted Deployment pods:** Pods that were evicted during the fault are not automatically rescheduled back to the recovered node. They remain on the replacement nodes the scheduler placed them on.
- **Terminating StatefulSet pods:** Force-delete to release the StatefulSet identity slot:

  ```bash
  kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
  ```

- **If automated cleanup did not complete:** Reboot the affected node (or have your admin reset its network configuration). The fault does not persist across a node reboot.
- **Abort the experiment early:** Stop the experiment from the Harness Chaos Studio. Cleanup runs before the chaos pod exits.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose real nodes or allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows nodes:** This fault is supported on Linux nodes only. Use the equivalent [Windows network loss](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-loss) on Windows-only workloads.
- **Single-node clusters or co-located chaos infrastructure:** If the chaos infrastructure pods live on the node you are about to partition, the experiment loses observability and may fail to roll back. Schedule chaos infrastructure on a node outside the blast radius.
- **Pods using `hostNetwork: true`:** These bypass per-pod network namespaces. Loss is still applied to the node, but observed behavior depends on how the pod uses the host stack.
- **Hardened or stripped kernels:** Some custom distribution kernels omit the networking modules this fault depends on, and the fault fails immediately on those nodes. On RHEL-family hosts, install `kernel-modules-extra` and reboot to restore the missing modules.

---

## Troubleshooting

<Troubleshoot
  issue="Node network loss experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node, insufficient CPU or memory on the node, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment, free resources on the node, or run the experiment in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Node network loss fails immediately on hardened nodes or with an unknown interface"
  mode="docs"
  fallback="Either the required Linux networking kernel modules are missing on the target node, or the NETWORK_INTERFACE value does not match a real interface on the node. SSH to the node and run ip -br link to list interfaces. On RHEL-family hosts install kernel-modules-extra and reboot to restore the missing modules; otherwise set NETWORK_INTERFACE to the actual interface name (for example ens5 on EKS, eth0 on most others)."
/>

<Troubleshoot
  issue="Node network loss fault runs but no packet loss is observed on the target node"
  mode="docs"
  fallback="Three common causes: (1) DESTINATION_HOSTS resolves to IPs not on the shaped path so loss never matches, (2) the workload you are probing routes over a different interface than NETWORK_INTERFACE, or (3) traffic stays intra-node and never crosses the shaped interface. Probe loss with ping from a pod on a different node to confirm whether matched flows are degrading."
/>

<Troubleshoot
  issue="Node remains NotReady after node-network-loss completes in Harness Chaos Engineering"
  mode="docs"
  fallback="Automated cleanup likely did not complete. Reboot the affected node to reset its network state. The node returns to Ready once the kubelet successfully renews its lease. If this recurs, capture the chaos pod logs from the experiment namespace and share them with Harness support."
/>

---

## Related faults

- [Node network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-latency): Same delivery mechanism, but injects delay instead of drops. Use it to test timeouts without provoking the unreachable-node path.
- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Scopes the impact to a single pod's network path rather than the whole node.
- [Node restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart) and [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Test planned and unplanned node loss, which is the failure mode network loss eventually escalates into.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
