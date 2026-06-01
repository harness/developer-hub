---
id: pod-dns-spoof
title: Pod DNS spoof
sidebar_label: Pod DNS Spoof
description: Redirect DNS lookups for selected hostnames inside a target Kubernetes pod to a different address to test how the application handles misdirected upstream traffic and cache poisoning.
keywords:
  - chaos engineering
  - pod dns spoof
  - dns chaos
  - dns spoofing
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - dns-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-dns-spoof
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-dns-spoof
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-dns-spoof
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod DNS spoof is a Kubernetes pod-level chaos fault that redirects DNS lookups for selected hostnames inside the target pod to a different hostname or IP for a configurable duration. The lookup succeeds, but the application opens its TCP connection to the wrong destination. When the fault ends, DNS resolution returns to normal immediately.

Use this fault to test how an application handles correct lookups that point to the wrong upstream: a misconfigured CoreDNS override, a DNS cache poisoning attempt, a stale ExternalName service, or a regional failover that misroutes traffic to a degraded replica.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Misconfigured service discovery:** Spoof `payments.example.com` to point to a healthy decoy service and verify that TLS validation rejects the certificate mismatch instead of silently sending data to the wrong endpoint.
- **Failover misrouting:** Map a production hostname to a staging IP and confirm that the application does not commit production data against staging.
- **TLS pinning enforcement:** Spoof a hostname whose certificate the client pins. Does the client refuse to connect, or does it accept whatever certificate it receives?
- **Cross-region steering bugs:** Spoof `us-east.api.example.com` to a `us-west` IP and measure whether application latency degrades silently, or whether the client detects the regional mismatch.
- **Loopback isolation tests:** Spoof a dependency to `127.0.0.1` (where nothing listens) to verify the application fails fast with a clear `connection refused` rather than hanging.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
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

Configure the following fault parameters when you add Pod DNS spoof to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SPOOF_MAP` | JSON map of source hostnames to spoofed targets. Example: `'{"payments.example.com":"decoy.svc.cluster.local"}'` or `'{"api.example.com":"10.0.0.42"}'`. Empty means no spoofing. | `""` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched DNS queries to spoof, between `0` and `100`. `0` spoofs none; `100` spoofs every match. | `0` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

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

:::tip Pick a spoof target carefully
The spoof target must be reachable from the pod's network namespace for the test to be meaningful. Pointing at a non-routable IP (`127.0.0.1`, `0.0.0.0`) is useful for "connection refused" testing; pointing at a real service exercises TLS validation and authorization paths.
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

Intercepts DNS queries from inside the target container and, for the configured percentage of queries whose hostname is a key in `SPOOF_MAP`, returns the spoofed address instead of the genuine one, so the application's resolver succeeds but points at the wrong destination.

---

## Expected behavior during fault execution

- DNS queries from inside the target container for hostnames in `SPOOF_MAP` return the spoofed target (resolved to an IP if the spoof value is a hostname) instead of the genuine answer.
- Queries outside `SPOOF_MAP` are forwarded to the cluster DNS resolver and answered normally.
- The percentage of matched queries spoofed is set by `TRANSACTION_PERCENTAGE`.
- The application opens connections to the spoofed IP. TLS clients that validate the server certificate against the requested hostname see a certificate mismatch and refuse the connection. Plain TCP and HTTP clients connect to whatever listens at the spoofed address.
- Already-resolved addresses cached by the runtime are not invalidated; the spoof takes effect on the next lookup after the cache expires.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, DNS resolution returns to normal within a couple of seconds. Existing connections established before the fault remain open against the spoofed destination until they are closed and re-opened.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **TLS validation failures:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on TLS handshake-failure counters when spoofing an HTTPS upstream.
- **Connection error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect connection failures driven by the spoof.
- **Other hostnames stay correct:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to confirm a different hostname still resolves to the genuine address throughout the fault.

---

## Verify the fault execution effect

While the experiment is running, confirm the spoofed lookups return the wrong address:

1. **Resolve the spoofed hostname from inside the pod.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <TARGET_CONTAINER> -- \
     getent hosts payments.example.com
   ```

   The address returned should match the spoofed target in `SPOOF_MAP` rather than the genuine address.

2. **Verify an unspoofed hostname still resolves correctly.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <TARGET_CONTAINER> -- \
     getent hosts kubernetes.default.svc.cluster.local
   ```

   The address should be the cluster API server, confirming the scope is contained to `SPOOF_MAP`.

---

## Recovery and cleanup

- **End of duration:** The DNS interception is removed automatically and resolution returns to normal.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its DNS state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Long DNS caches:** Some runtimes (Java is a common example) cache successful lookups for a long time. The fault only affects new lookups; addresses already resolved before the fault began remain in use until the cache expires.
- **`hostNetwork` pods:** The fault operates inside the pod's network namespace. Pods using `hostNetwork: true` share the host's resolver and are not affected.
- **Custom DNS configurations:** Pods that bypass cluster DNS (for example, with a custom `dnsConfig` pointing to an external resolver) may not route queries through the path the fault intercepts.
- **Hard-coded IPs:** Code that bypasses DNS by using a hard-coded address is not affected.

---

## Troubleshooting

<Troubleshoot
  issue="Pod DNS spoof experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="DNS lookups return the genuine address during pod-dns-spoof"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no queries are spoofed; SPOOF_MAP is empty or not valid JSON; the queried hostname does not match a key in SPOOF_MAP exactly; the application cached the genuine address before the fault began; or the pod uses hostNetwork and bypasses cluster DNS. Re-run with TRANSACTION_PERCENTAGE=100 and a minimal SPOOF_MAP that maps one hostname to a loopback address to confirm the path."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-dns-spoof in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="DNS spoofing persists after pod-dns-spoof ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its DNS state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod DNS error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-dns-error): Fail the lookup entirely instead of returning a wrong address.
- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop packets between the pod and upstreams without touching DNS.
- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Block API calls at the application protocol layer.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
