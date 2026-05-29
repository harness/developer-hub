---
id: pod-network-partition
title: Pod network partition
sidebar_label: Pod Network Partition
description: Apply a temporary Kubernetes NetworkPolicy to isolate a target pod from its peers, dependencies, or namespaces and test split-brain behavior.
keywords:
  - chaos engineering
  - pod network partition
  - networkpolicy
  - split brain
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-partition
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-network-partition
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-network-partition
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod network partition is a Kubernetes pod-level chaos fault that isolates a target pod by creating a temporary `NetworkPolicy` that blocks ingress, egress, or both for a configurable duration. The partition is enforced by the cluster's CNI at the dataplane, so this fault has lighter prerequisites than the other pod network faults — it works wherever the cluster CNI supports `NetworkPolicy` (Calico, Cilium, AWS VPC CNI in policy mode, Azure CNI, etc.). When the fault ends, the policy is deleted and connectivity is restored immediately.

Use this fault to test how a service behaves when it is fully cut off from a specific peer or dependency: a network partition between leader and follower, a failed gateway, a split namespace, or an annotated dependency you want to isolate without changing application code.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Leader-follower partition:** Cut off the leader of a stateful service from its followers. Does the follower set elect a new leader within the configured timeout? Does the original leader step down cleanly when the partition heals?
- **Cross-namespace isolation:** Block one workload from a specific peer namespace and confirm the workload either fails fast or degrades to a documented fallback (cache, default value, error response).
- **Dependency cutoff:** Isolate a workload from its database, message bus, or external API and confirm the circuit breaker engages, the cache serves stale data, and callers are not exposed to long timeouts.
- **Probe and ejection behavior:** Does the kubelet mark the pod `NotReady` because its outbound health check fails? Does the service mesh outlier-detection eject the pod from upstream pools within the SLO?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **CNI with NetworkPolicy enforcement:** The cluster's CNI plugin must enforce `NetworkPolicy`. Plain Flannel and the default AWS VPC CNI in non-policy mode do not. Verify with `kubectl api-resources | grep networkpolicy`.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Workload selector defined:** The chaos experiment knows the target workload (`Deployment`, `StatefulSet`, etc.) by kind, namespace, and either names or labels.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EKS (with Calico, Cilium, or VPC CNI in policy mode) | Supported |
| Azure AKS | Supported |
| Google GKE | Supported |
| Red Hat OpenShift | Supported |
| Rancher | Supported |
| VMware Tanzu | Supported |
| Self-managed Kubernetes with policy-enforcing CNI | Supported |
| GKE Autopilot | Supported with [Autopilot setup](/docs/resilience-testing/chaos-testing/gke-autopilot) |
| Clusters with no NetworkPolicy enforcement | Not supported (the policy is created but has no effect) |

---

## Permissions required

The fault runs under the chaos infrastructure's service account.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `networkpolicies` (`networking.k8s.io`) | `get`, `list`, `create`, `delete`, `patch` | Create and delete the chaos `NetworkPolicy` in the target namespace |
| `pods` (`""`) | `get`, `list` | Discover target pods and confirm they are Running |
| `deployments`, `statefulsets`, `replicasets`, `daemonsets` (`apps`) | `get`, `list` | Resolve the target workload to the pods it owns |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions.

---

## Fault tunables

Configure the following fault parameters when you add Pod network partition to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `POLICY_TYPES` | Which traffic direction to block. One of `ingress`, `egress`, or `all`. | `all` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Partition scope (what is blocked)**

If you set none of the following, the partition blocks all traffic in the chosen direction. Combine them to narrow the partition.

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated CIDRs to block (for example, `10.0.0.0/16,192.168.1.0/24`). | `""` |
| `DESTINATION_HOSTS` | Comma-separated hostnames to block. The helper resolves them and adds the resolved IPs to the policy. | `""` |
| `POD_SELECTOR` | Label selector matching peer pods to block, in `key=value,key=value` form. | `""` |
| `NAMESPACE_SELECTOR` | Label selector matching peer namespaces to block, in `key=value,key=value` form. | `""` |
| `PORTS` | Comma-separated ports (or `port/protocol` pairs) the policy should restrict to. | `""` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Empty partition scope blocks everything
With no `DESTINATION_*`, `POD_SELECTOR`, or `NAMESPACE_SELECTOR` set, the chaos `NetworkPolicy` denies all traffic in the chosen direction, including DNS to kube-system. If you only want to cut off a single dependency, always set at least one scope tunable.
:::

---

## Fault execution in brief

Creates a Kubernetes `NetworkPolicy` in the target pod's namespace that denies ingress, egress, or both for the configured duration, optionally scoped to specific destinations, namespaces, pod selectors, or ports so other traffic remains unaffected.

---

## Expected behavior during fault execution

- TCP connections in the blocked direction stop progressing. Existing sockets time out per their `tcp_user_timeout` and OS keepalive settings (often 5 to 15 minutes). New connection attempts fail immediately with `connection refused` or `host unreachable`.
- UDP traffic (DNS, QUIC) drops silently. If you blocked egress without explicitly allowing DNS, name resolution fails.
- The target pod can still reach anything not covered by the policy. With `POD_SELECTOR=app=foo`, only pods with that label are blocked.
- Health probes from the kubelet still work (kubelet talks to the pod over the node's network, which is not subject to pod-level `NetworkPolicy`).
- Service meshes that use sidecar-to-sidecar TCP detect the failures and may eject the pod from upstream pools.

:::info When the fault ends
The `NetworkPolicy` is deleted, and connectivity is restored as fast as the CNI can reconcile (typically within one second). TCP connections that timed out during the partition do not automatically reconnect; the application must handle that itself.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application failover:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the dependency to confirm the partition is in effect, and a second HTTP probe against the application's user-facing endpoint to confirm graceful degradation.
- **Cluster events:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to confirm the `NetworkPolicy` was created and deleted as expected.
- **Mesh ejection:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on Istio/Envoy `cluster.outlier_detection.ejections_active` or your mesh's equivalent.

---

## Verify the fault execution effect

While the experiment is running, confirm that the partition is actually in effect:

1. **Inspect the chaos NetworkPolicy.**

   ```bash
   kubectl get networkpolicy -n <namespace> -l harness.io/chaos=pod-network-partition -o yaml
   ```

   You should see the policy with `policyTypes` and the rules you configured.

2. **Test connectivity from the target pod.**

   ```bash
   kubectl exec -n <namespace> <pod-name> -- nc -zv -w 2 <blocked-host> <port>
   ```

   The connection should fail. For an unblocked destination, the same command should succeed.

---

## Recovery and cleanup

- **End of duration:** The chaos `NetworkPolicy` is deleted automatically. The CNI reconciles within seconds and connectivity returns.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, delete the chaos NetworkPolicy manually:

  ```bash
  kubectl delete networkpolicy -n <namespace> -l harness.io/chaos=pod-network-partition
  ```

- **Stuck connections:** TCP sockets that timed out during the partition stay closed; the application reconnects on its own schedule.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **CNI plugins without NetworkPolicy enforcement:** Plain Flannel, default AWS VPC CNI (without policy mode), and a few others do not enforce policies. The fault creates the policy but it has no effect.
- **`hostNetwork` pods:** Pods using the host network namespace are not subject to namespaced `NetworkPolicy`. The fault refuses to inject on `hostNetwork: true` pods.
- **Cluster-scoped resources:** This fault works at the pod level. To partition a node from the rest of the cluster, use [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss) with `NETWORK_PACKET_LOSS_PERCENTAGE: 100`.
- **kubelet-to-pod traffic:** `NetworkPolicy` does not apply to kubelet probe traffic in most CNI implementations, so liveness and readiness probes still work even under "block all" rules. To break probes, target a different layer.

---

## Troubleshooting

<Troubleshoot
  issue="Pod network partition created but the target pod can still reach the blocked destination"
  mode="docs"
  fallback="The cluster CNI does not enforce NetworkPolicy. Verify with kubectl describe pod -n kube-system -l k8s-app=<cni> or your CNI's docs. Plain Flannel and the default AWS VPC CNI in non-policy mode do not enforce policies. Switch to Calico, Cilium, or enable AWS VPC CNI policy mode."
/>

<Troubleshoot
  issue="Pod network partition blocks more traffic than expected in Harness Chaos Engineering"
  mode="docs"
  fallback="With no DESTINATION_*, POD_SELECTOR, or NAMESPACE_SELECTOR set, the chaos NetworkPolicy denies all traffic in the chosen direction, including DNS to kube-system. Either set scope tunables to narrow the partition, or add an explicit allow rule outside this fault for DNS (UDP/53 to kube-system pods)."
/>

<Troubleshoot
  issue="NetworkPolicy not deleted after pod-network-partition ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Delete the chaos NetworkPolicy manually with kubectl delete networkpolicy -n <namespace> -l harness.io/chaos=pod-network-partition. Verify connectivity returns with a test from inside the target pod."
/>

<Troubleshoot
  issue="Permission denied creating NetworkPolicy for pod-network-partition"
  mode="docs"
  fallback="The chaos service account lacks the create verb on networkpolicies in the networking.k8s.io group for the target namespace. Verify with kubectl auth can-i create networkpolicies --as=system:serviceaccount:<chaos-ns>:<sa-name> -n <target-ns>. Grant the missing role binding."
/>

---

## Related faults

- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop a percentage of packets without creating a NetworkPolicy. Useful when the CNI does not enforce policies.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add delay rather than blocking traffic.
- [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss): Partition an entire node from the rest of the cluster.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
