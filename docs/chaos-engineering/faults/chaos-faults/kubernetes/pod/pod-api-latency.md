---
id: pod-api-latency
title: Pod API latency
sidebar_label: Pod API Latency
description: Add a configurable delay to selected API calls on a target Kubernetes pod using path, method, header, query, and source or destination filters to test client timeouts, retries, and tail-latency budgets.
keywords:
  - chaos engineering
  - pod api latency
  - api chaos
  - api gateway fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - api-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-latency
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-api-latency
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-api-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod API latency is a Kubernetes pod-level chaos fault that adds a configurable delay to selected API calls on the target pod for a configurable duration. It accepts a rich set of filters: HTTP path, method, headers, query parameters, source host/IP, destination host/IP/port, and direction (ingress or egress). It also supports HTTPS through user-supplied TLS certificates, so it can intercept and delay encrypted API calls. When the fault ends, latency returns to baseline immediately.

Use this fault when you need to slow down one specific dependency or endpoint while leaving the rest of the pod's traffic fast: simulate a slow upstream for `payments.example.com`, add latency only to `POST /v2/users`, or delay calls only from one tenant.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Timeout budget validation for one dependency:** Add latency only to `DESTINATION_HOSTS=payments.example.com` to verify whether your code times out at the right moment and falls back without affecting other upstreams.
- **Path-specific tail latency:** Slow down `PATH_FILTER=/v2/checkout` to test how a single hot endpoint's latency affects the calling page's overall load time.
- **Tenant-scoped degradation:** Use `HEADERS_FILTERS` (for example `X-Tenant: prod-eu`) to inject latency for one tenant only.
- **Egress vs ingress impact:** `SERVICE_DIRECTION=egress` slows the pod's outbound calls; `SERVICE_DIRECTION=ingress` slows requests coming into the pod.
- **HTTPS dependency testing:** With TLS certificates supplied, you can add latency to encrypted gRPC and REST traffic the [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency) fault cannot.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **API service on a known port:** The target container serves HTTP, HTTPS, or gRPC traffic on a port you can specify with `TARGET_SERVICE_PORT`.
- **TLS material for HTTPS targets:** When `HTTPS_ENABLED=true`, you provide CA, server, and (optionally) client certificate secrets so the proxy can terminate TLS and apply filters.
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
| `secrets` (`""`) | `get`, `list` | Read TLS certificate secrets when `HTTPS_ENABLED=true` |

The default Harness chaos infrastructure service account already includes these permissions.

---

## Fault tunables

Configure the following fault parameters when you add Pod API latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each matched API call. Accepts Go duration strings such as `200ms`, `2s`, `1m`. | `"2s"` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched API calls to delay, between `0` and `100`. `0` delays none; `100` delays every match. | `0` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for API traffic. | `80` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters (API matching)**

All filters are optional. Leave empty to match everything in that dimension. Combining filters narrows the match (AND across dimensions).

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | URL path the fault matches. Empty matches all paths. | `""` |
| `METHODS` | Comma-separated HTTP methods to match (for example `GET,POST`). Empty matches all methods. | `""` |
| `QUERY_PARAMS` | Query-parameter filter (for example `tenant=prod`). Empty matches all query strings. | `""` |
| `HEADERS_FILTERS` | Header filter (for example `X-Tenant: prod`). Empty matches all headers. | `""` |

**Filters (traffic source and destination)**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_DIRECTION` | Whether to filter `ingress` traffic (received by the pod) or `egress` traffic (sent from the pod). | `ingress` |
| `SOURCE_HOSTS` | Hostnames of the calling client (ingress only). Empty matches any source. | `""` |
| `SOURCE_IPS` | Source IPs of the calling client (ingress only). Empty matches any source. | `""` |
| `DESTINATION_HOSTS` | Destination hostnames for the call (egress only). Empty matches any destination. | `""` |
| `DESTINATION_IPS` | Destination IPs for the call (egress only). Empty matches any destination. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports (egress only). Empty matches any port. | `""` |

**TLS (for HTTPS targets)**

| Tunable | Description | Default |
| --- | --- | --- |
| `HTTPS_ENABLED` | Set to `true` when the target serves HTTPS so the proxy terminates TLS to apply filters. | `false` |
| `CA_CERTIFICATES` | Kubernetes secret holding the Base64-encoded CA certificate (`ca.key`, `ca.crt`) used by the proxy. | `""` |
| `SERVER_CERTIFICATES` | Secret holding the Base64-encoded server certificate (`server.key`, `server.crt`) the proxy presents. | `""` |
| `CLIENT_CERTIFICATES` | Secret holding the Base64-encoded client certificate (`client.key`, `client.crt`) for mTLS upstreams. | `""` |

**Proxy and interface**

| Tunable | Description | Default |
| --- | --- | --- |
| `PROXY_PORT` | Port the chaos proxy listens on inside the container's network namespace. | `20000` |
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

:::tip Set `LATENCY` just past your client timeout
Picking a `LATENCY` value slightly larger than the caller's configured timeout (for example `LATENCY=6s` when the caller times out at `5s`) reliably triggers the timeout path without making the experiment unnecessarily long.
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

Intercepts API traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and adds `LATENCY` to the configured percentage of calls that match the path, method, header, query, and source or destination filters, optionally terminating TLS to apply the same logic to HTTPS calls.

---

## Expected behavior during fault execution

- API calls that match every configured filter are delayed by `LATENCY`. Calls outside the filter set pass through with normal latency.
- Only the percentage of matched calls selected by `TRANSACTION_PERCENTAGE` is delayed; the rest pass through unchanged.
- For HTTPS targets, the proxy terminates TLS using the supplied certificates so it can read the request before delaying.
- Clients with timeouts shorter than `LATENCY` see request timeouts (and may retry); clients with longer timeouts succeed but with elevated tail latency.
- gRPC unary calls are delayed the same way HTTP responses are. Streaming RPCs are delayed at the next frame boundary.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and API latency returns to baseline within a couple of seconds. Calls already buffered for delay are released as soon as cleanup runs.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Tail latency on the scoped path:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the API's p99 latency metric, filtered to the path you delayed, to confirm the increase matches `LATENCY`.
- **Client timeouts and retries:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect timeout-induced errors.
- **Unrelated traffic stays fast:** Use a Prometheus probe on the same p99 metric scoped to an unaffected path to confirm no collateral latency.

---

## Verify the fault execution effect

While the experiment is running, confirm the right calls are being delayed:

1. **Time a matched call and an unmatched call.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s \
       "http://<target-pod-ip>:<TARGET_SERVICE_PORT><PATH_FILTER>"
   ```

   `time_total` should reflect the added `LATENCY` for matched calls. A request to a non-matched path should return at baseline latency.

2. **Confirm the proxy is intercepting the right port.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -- ss -tlnp
   ```

   The proxy listens on `PROXY_PORT` and reroutes `TARGET_SERVICE_PORT` through it for the fault's duration.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and API latency returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without certificates:** When `HTTPS_ENABLED=true`, the proxy must terminate TLS. If the supplied certificates do not chain to one the client trusts, the client will refuse the connection before any filter is applied.
- **Long-lived streaming RPCs:** Delay applies to new frames once the proxy intercepts them; frames already in flight when the fault starts may not be delayed.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod API latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No API latency observed during pod-api-latency"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no calls are delayed; filters are over-specified and match no real traffic (broaden PATH_FILTER and METHODS); HTTPS_ENABLED is false but the target serves HTTPS, so the proxy cannot read the request to evaluate filters; or the supplied TLS certificates do not chain correctly. Re-run with TRANSACTION_PERCENTAGE=100 and a broad single filter to confirm the path."
/>

<Troubleshoot
  issue="TLS handshake fails for pod-api-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the secrets referenced by CA_CERTIFICATES, SERVER_CERTIFICATES, and CLIENT_CERTIFICATES exist in the chaos namespace and contain Base64-encoded key/crt pairs (ca.key/ca.crt, server.key/server.crt, client.key/client.crt). The server certificate must include the target pod's service name in its SAN list. If the client uses cert pinning, this fault cannot delay its traffic without disabling the pin."
/>

<Troubleshoot
  issue="API latency persists after pod-api-latency ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Drop API calls entirely instead of delaying them.
- [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code): Return a specific status code instead of delaying the call.
- [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body): Overwrite API request or response bodies.
- [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header): Modify API request or response headers.
- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Simpler HTTP-only latency without API-level filters.
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add packet-level latency at the network layer rather than per-call.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
