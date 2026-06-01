---
id: pod-dns-error
title: Pod DNS error
sidebar_label: Pod DNS Error
description: Block DNS resolution for selected hostnames inside a target Kubernetes pod to test how the application handles upstream lookup failures and cluster DNS outages.
keywords:
  - chaos engineering
  - pod dns error
  - dns chaos
  - dns failure
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - dns-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-dns-error
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-dns-error
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-dns-error
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod DNS error is a Kubernetes pod-level chaos fault that makes DNS lookups from inside the target pod fail for a configurable list of hostnames (or all hostnames) for a configurable duration. The target pod's resolver returns errors as if the upstream DNS server were unreachable. When the fault ends, DNS resolution returns to normal immediately.

Use this fault to test how an application handles DNS failures: a partial CoreDNS outage that breaks one upstream service, a misconfigured `Service` entry, or a transient resolver hiccup that strands a long-lived client.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Scoped upstream outage:** Block resolution of `payments.example.com` only and verify whether the application surfaces a clear "upstream unavailable" error or hangs at the connect step.
- **DNS caching behavior:** Many runtimes cache DNS lookups indefinitely. Does the application re-resolve when the lookup fails, or does it serve a stale, now-broken address?
- **Client retry budgets:** When a DNS lookup fails, does the client retry the lookup, surface the failure to the caller, or thrash?
- **Service discovery resilience:** A `Service` selector matches no pods. Does the discovery path tolerate `NXDOMAIN` for the service's DNS name, or does the entire request pipeline fail?
- **Partial cluster DNS outage simulation:** Block resolution for a specific keyword (with `MATCH_SCHEME=substring`) to simulate a failing CoreDNS plugin for one zone.

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

Configure the following fault parameters when you add Pod DNS error to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_HOSTNAMES` | JSON-formatted list of hostnames or keywords to fail. Example: `'["payments.example.com","auth"]'`. Empty fails all DNS lookups. | `""` |
| `MATCH_SCHEME` | How `TARGET_HOSTNAMES` entries are matched against incoming queries: `exact` (full hostname match) or `substring` (any query containing the keyword). | `exact` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched DNS queries to fail, between `0` and `100`. `0` fails none; `100` fails every matched query. | `0` |
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

:::tip Scope to a single dependency
Set `TARGET_HOSTNAMES='["payments.example.com"]'` and `MATCH_SCHEME=exact` to break only the lookup for `payments.example.com`. Other dependencies remain reachable, so you can isolate the impact and avoid false-positive failures from unrelated services.
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

Intercepts DNS queries from inside the target container and returns an error response for the configured percentage of queries whose hostname matches `TARGET_HOSTNAMES` (or all queries if no list is supplied), so the application's resolver sees the lookup as failed.

---

## Expected behavior during fault execution

- DNS queries from inside the target container for hostnames that match `TARGET_HOSTNAMES` and `MATCH_SCHEME` return an error (typically `SERVFAIL` or equivalent), as if the upstream resolver were unreachable.
- The percentage of matched queries failed is set by `TRANSACTION_PERCENTAGE`; the rest are forwarded to the cluster DNS resolver and answered normally.
- Queries that do not match (different hostname) are not affected. Already-resolved addresses cached by the runtime are not invalidated; the failure surfaces on the next lookup after the cache expires.
- The application typically surfaces lookup failures as `getaddrinfo failed`, `temporary failure in name resolution`, or `dial tcp: lookup ... no such host`. Some runtimes back off and retry; others fail the call immediately.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, DNS resolution returns to normal within a couple of seconds. Existing connections established before the fault remain open; new lookups succeed.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Lookup error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your DNS metrics or application's "name resolution failed" counter.
- **Caller error surface:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect whether DNS errors leak through to end users as `5xx` or hang as timeouts.
- **Other dependencies stay reachable:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to confirm a different hostname resolves correctly throughout the fault, isolating the impact to your target.

---

## Verify the fault execution effect

While the experiment is running, confirm the right lookups are failing:

1. **Resolve the target hostname from inside the pod.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <TARGET_CONTAINER> -- \
     getent hosts payments.example.com
   ```

   The lookup should fail. With `nslookup`, you should see `server can't find ... SERVFAIL` (or similar).

2. **Resolve an unaffected hostname.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -c <TARGET_CONTAINER> -- \
     getent hosts kubernetes.default.svc.cluster.local
   ```

   The lookup should succeed at baseline speed, confirming the scope is contained to `TARGET_HOSTNAMES`.

---

## Recovery and cleanup

- **End of duration:** The DNS interception is removed automatically and resolution returns to normal.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its DNS state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Long DNS caches:** Some runtimes (Java is a common example) cache successful lookups for a long time. The fault only affects new lookups; already-resolved IPs remain reachable until the cache expires.
- **`hostNetwork` pods:** The fault operates inside the pod's network namespace. Pods using `hostNetwork: true` share the host's resolver and are not affected.
- **Custom DNS configurations:** Pods that bypass cluster DNS (for example, with a custom `dnsConfig` pointing to an external resolver) may not route queries through the path the fault intercepts.

---

## Troubleshooting

<Troubleshoot
  issue="Pod DNS error experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="DNS lookups still succeed during pod-dns-error"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no queries are failed; TARGET_HOSTNAMES does not match the queried name (verify with MATCH_SCHEME=substring or set TARGET_HOSTNAMES empty to fail all queries); the application has cached the address from a previous lookup; or the pod uses hostNetwork and bypasses cluster DNS. Re-run with TRANSACTION_PERCENTAGE=100 and an empty TARGET_HOSTNAMES to confirm the path."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-dns-error in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="DNS resolution still fails after pod-dns-error ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its DNS state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod DNS spoof](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-dns-spoof): Return a wrong address for the lookup instead of failing it.
- [Pod network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-loss): Drop packets between the pod and upstreams instead of failing DNS.
- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Block API calls without breaking DNS.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
