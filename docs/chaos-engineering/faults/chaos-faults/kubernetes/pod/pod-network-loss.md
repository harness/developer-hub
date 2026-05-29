---
id: pod-network-loss
title: Pod network loss
sidebar_label: Pod Network Loss
description: Drop a configurable percentage of packets on a target Kubernetes pod's network path to test retry, timeout, and failover behavior.
keywords:
  - chaos engineering
  - pod network loss
  - packet loss
  - network chaos
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-loss
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-network-loss
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod network loss is a Kubernetes pod-level chaos fault that drops a configurable percentage of packets on the network path serving a target pod for a configurable duration. Only the selected pods experience the loss; other pods on the node and the node's host networking are unaffected. When the fault ends, the configuration is removed and the pod's network returns to normal immediately.

Use this fault to test how a service behaves when one or more replicas suddenly lose packets to upstream dependencies, peers, or callers: a flaky NIC, a degraded overlay link, a CNI hiccup, or a stretched cluster across noisy WAN.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Client retry and timeout tuning:** When packets to a downstream dependency drop, do clients retry with reasonable backoff, or do they amplify load and trigger a thundering-herd?
- **Connection pool resilience:** Do gRPC and HTTP/2 connections recover after a packet-loss burst, or does the pool exhaust and the workload stall?
- **Service mesh failover:** Does the mesh detect endpoint health and shift traffic away from the lossy replica? Does outlier detection eject it within a useful window?
- **Database client behavior:** When the pod loses packets to its database, does the driver reconnect cleanly or hold dead connections?
- **Probe sensitivity:** Are readiness and liveness probes resilient to short loss bursts, or do they oscillate the pod in and out of service?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Workload selector defined:** The chaos experiment knows the target workload (`Deployment`, `StatefulSet`, `DaemonSet`, `Rollout`, etc.) by kind, namespace, and either names or labels.

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

Configure the following fault parameters when you add Pod network loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of packets to drop on the matched flows. `100` means total loss; `30` simulates a flaky link. | `100` |
| `CORRELATION` | Loss correlation as a percentage. `0` makes each packet independent; `25` clumps losses (more bursty). | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Traffic filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_IPS` | Comma-separated list of destination IPs. Loss applies only to packets headed to these IPs. Empty matches all destinations. | `""` |
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

:::tip Scope loss to a specific dependency
Setting `DESTINATION_HOSTS=db.example.svc` or `DESTINATION_PORTS=5432` restricts loss to traffic for one dependency. Other connections (mesh control plane, metrics, DNS) keep working, so you isolate the variable under test.
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

Configures the container's network interface to drop a specified percentage of packets, optionally scoping the effect to only certain destination IPs, hosts, or ports so other traffic passes through unaffected.

---

## Expected behavior during fault execution

- Packets matching the filter drop at the configured rate. Connections that retransmit (TCP, gRPC, HTTP/2) experience longer round-trip times and timeouts depending on the loss percentage.
- At `NETWORK_PACKET_LOSS_PERCENTAGE: 100`, all matched flows fail. TCP connections enter retransmit storms and eventually time out; UDP traffic (DNS, QUIC) drops outright.
- At `25-50`%, TCP backoffs kick in, throughput drops sharply, and tail latency spikes. This is the most useful range for resilience testing because it stresses retry logic without giving up entirely.
- Health probes that route through the lossy path can fail; the kubelet may mark the pod `NotReady`. Service endpoints are then removed and traffic shifts to remaining replicas.
- Service meshes with outlier detection observe failures and eject the pod from upstream load-balancing pools within the detection window.

:::info When the fault ends
The loss configuration is removed, and the pod's network returns to normal immediately. No application restart is required.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client-side error rate and tail latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) or a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to confirm callers degrade and recover.
- **Mesh ejection:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on Istio/Envoy `cluster.outlier_detection.ejections_active` or your mesh's equivalent.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod stays `NotReady` longer than your SLO allows.

---

## Verify the fault execution effect

While the experiment is running, generate traffic and confirm loss is observed:

1. **From inside another pod or the cluster, hit the target pod and watch for failures.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -m 3 http://<target-pod-ip>:<port>/healthz
   ```

   At high `NETWORK_PACKET_LOSS_PERCENTAGE`, requests time out or return errors. At 25-50%, latency rises sharply and tail-latency probes degrade.

2. **Sample loss directly from a peer.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     ping -c 50 <target-pod-ip>
   ```

   The summary line reports the observed loss percentage, which should be close to the configured `NETWORK_PACKET_LOSS_PERCENTAGE` on matched flows.

---

## Recovery and cleanup

- **End of duration:** The loss configuration is removed automatically and connectivity returns to normal within a few seconds.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not allow the privileged access this fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **CNI plugins that bypass the pod's `eth0`:** Custom CNI configurations (for example some eBPF-based plugins routing host-side) may not be affected by this fault.
- **`hostNetwork` pods:** Pods using the host's network would affect the entire node. The fault refuses to inject on `hostNetwork: true` pods.

---

## Troubleshooting

<Troubleshoot
  issue="Pod network loss experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No packet loss is observed during pod-network-loss"
  mode="docs"
  fallback="The most common causes are: NETWORK_INTERFACE does not match the pod's interface (verify with kubectl exec <pod> -- ip link show); the filter is too narrow and matches no real traffic (broaden DESTINATION_IPS/HOSTS/PORTS); or the pod uses hostNetwork and the fault was refused. Generate live traffic from another pod with ping or curl and confirm whether matched flows are degrading."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-network-loss in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock. Confirm by SSHing to the node and running ls -l on each candidate socket file."
/>

<Troubleshoot
  issue="Loss persists after pod-network-loss ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add latency to the pod's network path instead of dropping packets.
- [Pod network corruption](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-corruption): Corrupt a percentage of packets instead of dropping them.
- [Pod network duplication](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-duplication): Duplicate a percentage of packets.
- [Pod network partition](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-partition): Block ingress or egress entirely using a NetworkPolicy.
- [Pod network rate limit](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-rate-limit): Throttle bandwidth instead of dropping packets.
- [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss): Apply packet loss at the node level rather than to a single pod.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
