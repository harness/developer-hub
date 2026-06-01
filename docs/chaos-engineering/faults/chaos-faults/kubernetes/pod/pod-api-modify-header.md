---
id: pod-api-modify-header
title: Pod API modify header
sidebar_label: Pod API Modify Header
description: Override API request or response headers on a target Kubernetes pod using path, method, query, and source or destination filters to test resilience to missing, altered, or unexpected header values.
keywords:
  - chaos engineering
  - pod api modify header
  - api chaos
  - http headers
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - api-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-header
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-api-modify-header
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-api-modify-header
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod API modify header is a Kubernetes pod-level chaos fault that overrides headers on selected API requests or responses on the target pod for a configurable duration. You provide a map of header keys to values that the proxy then injects, replaces, or removes (when the value is empty). It accepts the same rich filter set as other API faults (path, method, headers, query, source, destination) and supports HTTPS through user-supplied TLS certificates. When the fault ends, headers return to normal immediately.

Use this fault to test how a client or server behaves when a header it depends on is missing, malformed, or carries an unexpected value, scoped to one specific endpoint or upstream rather than every call on the pod.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Auth header tampering on one path:** Remove `Authorization` only on `PATH_FILTER=/v2/admin` to verify whether the admin endpoint returns a clean `401` rather than crashing.
- **Cache-control flips:** Change `Cache-Control` to `max-age=3600` on responses from a specific microservice to see whether intermediate caches store data they should not.
- **Tracing continuity:** Strip `X-Request-ID` or `traceparent` only on calls to a particular upstream to expose tracing gaps in your observability pipeline.
- **Tenant-scoped header chaos:** Use `HEADERS_FILTERS` to match a tenant header and `HEADERS_MAP` to tamper with another header only for that tenant.
- **Security header removal:** Strip `Content-Security-Policy` from a specific endpoint's responses to test browser fallback behavior.

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

Configure the following fault parameters when you add Pod API modify header to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `HEADERS_MAP` | JSON object of header key-value pairs to inject or replace. Set a value to `""` to remove that header. Example: `{"X-Auth-Token":"deadbeef","X-Trace-Id":""}`. | `""` |
| `DATA_DIRECTION` | Which direction to modify: `request` (headers sent to the server), `response` (headers returned to the client), or `both`. | `both` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched API calls whose headers are modified, between `0` and `100`. | `0` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for API traffic. | `80` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters (API matching)**

All filters are optional. Leave empty to match everything in that dimension. Combining filters narrows the match (AND across dimensions).

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | URL path the fault matches. Empty matches all paths. | `""` |
| `METHODS` | Comma-separated HTTP methods to match (for example `GET,POST`). Empty matches all methods. | `""` |
| `QUERY_PARAMS` | Query-parameter filter. Empty matches all query strings. | `""` |
| `HEADERS_FILTERS` | Header filter used to match incoming calls (distinct from `HEADERS_MAP`, which is used to inject). Empty matches all headers. | `""` |

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
| `CA_CERTIFICATES` | Kubernetes secret holding the Base64-encoded CA certificate (`ca.key`, `ca.crt`). | `""` |
| `SERVER_CERTIFICATES` | Secret holding the Base64-encoded server certificate (`server.key`, `server.crt`). | `""` |
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

:::tip Remove a header
Set the header's value in `HEADERS_MAP` to an empty string to remove the header. For example, `{"Authorization":""}` removes `Authorization` rather than setting it to an empty value.
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

Intercepts API traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and rewrites headers on the request, response, or both (as set by `DATA_DIRECTION`) for the configured percentage of calls that match the path, method, header, query, and source or destination filters, optionally terminating TLS to apply the same logic to HTTPS calls.

---

## Expected behavior during fault execution

- API calls that match every configured filter have their headers rewritten according to `HEADERS_MAP`. Existing headers with matching keys are replaced; new headers are added; headers with an empty value in the map are removed.
- When `DATA_DIRECTION=request`, the server sees the modified headers. When `=response`, the client sees them. When `=both`, both sides are modified the same way.
- Only the percentage selected by `TRANSACTION_PERCENTAGE` is modified; the rest pass through unchanged. Bodies, status codes, and other headers are preserved.
- For HTTPS targets, the proxy terminates TLS using the supplied certificates so it can read and rewrite headers.
- Clients or servers that fail validation on missing or unexpected headers surface their own error responses (typically `400` or `401`); ones that silently fall back may continue to operate, which is itself a finding.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and headers return to their original values within a couple of seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect 4xx responses driven by missing or unexpected headers.
- **Authentication and authorization metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on auth-failure counters when modifying `Authorization` or session headers.
- **Trace continuity:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) against your tracing system for orphan spans during the experiment window.

---

## Verify the fault execution effect

While the experiment is running, confirm the headers are being rewritten:

1. **Inspect headers on a matched call.**

   For `DATA_DIRECTION=response`, run:

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i -X <METHOD> "http://<target-pod-ip>:<TARGET_SERVICE_PORT><PATH_FILTER>"
   ```

   The response headers should reflect `HEADERS_MAP`: added or modified keys present with the configured values, removed keys absent.

2. **Inspect headers on the server side (when `DATA_DIRECTION=request`).**

   Have the target application log incoming request headers (or use an echo endpoint) and confirm the modifications appear there. Status codes, body, and headers outside `HEADERS_MAP` should be unchanged.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and API headers return to their original values.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without certificates:** When `HTTPS_ENABLED=true`, the proxy must terminate TLS. If the supplied certificates do not chain to one the client trusts, the client refuses the connection before any filter is applied.
- **Pseudo-headers (HTTP/2 `:method`, `:path`, `:status`, `:authority`):** These cannot be modified through `HEADERS_MAP`. Use other faults (such as Pod API status code) to control them.
- **Hop-by-hop headers:** Headers like `Connection` and `Transfer-Encoding` are owned by the proxy itself and are not safe to override through `HEADERS_MAP`.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start.

---

## Troubleshooting

<Troubleshoot
  issue="Pod API modify header experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Headers are unchanged during pod-api-modify-header"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no calls are modified; DATA_DIRECTION is set to a side you are not inspecting; HEADERS_MAP is not valid JSON; filters are over-specified; HTTPS_ENABLED is false but the target serves HTTPS; or the supplied TLS certificates do not chain correctly. Re-run with TRANSACTION_PERCENTAGE=100 and a minimal one-entry HEADERS_MAP to confirm the path."
/>

<Troubleshoot
  issue="TLS handshake fails for pod-api-modify-header in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the secrets referenced by CA_CERTIFICATES, SERVER_CERTIFICATES, and CLIENT_CERTIFICATES exist in the chaos namespace and contain Base64-encoded key/crt pairs (ca.key/ca.crt, server.key/server.crt, client.key/client.crt). The server certificate must include the target pod's service name in its SAN list."
/>

<Troubleshoot
  issue="Headers remain modified after pod-api-modify-header ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Drop API calls instead of modifying headers.
- [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency): Delay API calls.
- [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body): Overwrite API request or response bodies.
- [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code): Return a specific status code instead of changing headers.
- [Pod API modify response custom](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-response-custom): Combine body, header, and status code modifications in one fault.
- [Pod HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-header): Simpler HTTP-only header modification without API-level filters.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
