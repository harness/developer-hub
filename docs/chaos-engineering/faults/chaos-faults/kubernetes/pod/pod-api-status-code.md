---
id: pod-api-status-code
title: Pod API status code
sidebar_label: Pod API Status Code
description: Override the HTTP status code returned by selected API calls on a target Kubernetes pod using path, method, header, query, and source or destination filters to test client error handling and circuit-breaker behavior.
keywords:
  - chaos engineering
  - pod api status code
  - api chaos
  - status code
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - api-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-status-code
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-api-status-code
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-api-status-code
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod API status code is a Kubernetes pod-level chaos fault that overrides the HTTP status code returned by selected API calls on the target pod for a configurable duration. You can also overwrite the response body to match the new status. It accepts the same rich filter set as other API faults (path, method, headers, query, source, destination) and supports HTTPS through user-supplied TLS certificates. When the fault ends, status codes return to whatever the application produces naturally.

Use this fault to test client error handling on specific endpoints: return `429` only on a rate-limited path, force `503` on calls to one upstream, or simulate `401` on the auth refresh endpoint.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Path-scoped error injection:** Return `503` only on `PATH_FILTER=/v2/checkout` to test that other endpoints continue serving traffic while one degrades.
- **Retry classification:** Does the client retry on `503` but not on `400`? Does it honor `Retry-After` on `429`?
- **Tenant-scoped failure:** Use `HEADERS_FILTERS=X-Tenant: prod-eu` to return `429` only to one tenant's calls.
- **Error budget burn:** Force a calibrated percentage of `500`s on a specific endpoint to validate your SLO alerting.
- **Auth token expiry simulation:** Return `401` on the user-info endpoint to verify the client refreshes its token instead of looping.

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

Configure the following fault parameters when you add Pod API status code to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `STATUS_CODE` | HTTP status code to return. `0` picks one at random from the supported set (`200`, `201`, `202`, `204`, `300`, `301`, `302`, `304`, `307`, `400`, `401`, `403`, `404`, `500`, `501`, `502`, `503`, `504`). | `0` |
| `RESPONSE_BODY` | Body to return alongside the modified status code. Empty falls back to a default body matching the status. | `""` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched API calls whose status is overridden, between `0` and `100`. | `0` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for API traffic. | `80` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters (API matching)**

All filters are optional. Leave empty to match everything in that dimension. Combining filters narrows the match (AND across dimensions).

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | URL path the fault matches. Empty matches all paths. | `""` |
| `METHODS` | Comma-separated HTTP methods to match (for example `GET,POST`). Empty matches all methods. | `""` |
| `QUERY_PARAMS` | Query-parameter filter. Empty matches all query strings. | `""` |
| `HEADERS_FILTERS` | Header filter used to match incoming calls. Empty matches all headers. | `""` |

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

:::tip Combine `STATUS_CODE` with `RESPONSE_BODY` for realistic errors
Returning `429` with a body like `{"error":"rate_limited","retry_after":30}` (and the matching `Retry-After` header set via [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header) or [Pod API modify response custom](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-response-custom)) more closely matches what a real rate-limited upstream would send.
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

Intercepts API responses on `TARGET_SERVICE_PORT` inside the container's network namespace and replaces the status code with `STATUS_CODE` (and optionally rewrites the body with `RESPONSE_BODY`) for the configured percentage of calls that match the path, method, header, query, and source or destination filters, optionally terminating TLS to apply the same logic to HTTPS calls.

---

## Expected behavior during fault execution

- API responses for calls that match every configured filter return `STATUS_CODE` instead of the application's original status. When `RESPONSE_BODY` is non-empty it replaces the body; otherwise a default body matching the status code is returned.
- Calls outside the filter set return the application's normal status code unchanged. Only the percentage selected by `TRANSACTION_PERCENTAGE` is modified.
- For HTTPS targets, the proxy terminates TLS using the supplied certificates so it can intercept responses.
- Clients that branch on status codes execute their corresponding error-handling paths: retry, fail-fast, refresh tokens, back off, and so on.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and API status codes return to whatever the application produces.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Status-code distribution per path:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `http_requests_total{path="...",status="..."}` to confirm the injected codes match `STATUS_CODE` only on the filtered path.
- **Client retry counter:** Use a Prometheus probe on the calling service's retry counter to verify it backs off correctly.
- **End-user error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the top-level API to detect whether injected errors leak through to end users.

---

## Verify the fault execution effect

While the experiment is running, confirm the status code is being overridden on the right calls:

1. **Make a matched request and inspect the status line.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i -X <METHOD> "http://<target-pod-ip>:<TARGET_SERVICE_PORT><PATH_FILTER>"
   ```

   The status line should equal `HTTP/1.1 <STATUS_CODE> ...` on at least `TRANSACTION_PERCENTAGE` percent of matched calls.

2. **Confirm an unmatched call returns the application's original status.**

   A call to a different path or method should return the application's normal status code unchanged.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and API status codes return to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without certificates:** When `HTTPS_ENABLED=true`, the proxy must terminate TLS. If the supplied certificates do not chain to one the client trusts, the client refuses the connection before any filter is applied.
- **gRPC status:** gRPC carries status in HTTP/2 trailers (`grpc-status`), not the HTTP status line. This fault overrides the HTTP status; gRPC clients also check `grpc-status` and may behave differently.
- **Status codes outside the supported set:** Only the codes listed under `STATUS_CODE` are supported.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start.

---

## Troubleshooting

<Troubleshoot
  issue="Pod API status code experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Status code is unchanged during pod-api-status-code"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no calls are modified; STATUS_CODE is outside the supported list; filters are over-specified and match no real traffic; HTTPS_ENABLED is false but the target serves HTTPS; or the supplied TLS certificates do not chain correctly. Re-run with TRANSACTION_PERCENTAGE=100, STATUS_CODE=503, and a single broad filter to confirm the path."
/>

<Troubleshoot
  issue="TLS handshake fails for pod-api-status-code in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the secrets referenced by CA_CERTIFICATES, SERVER_CERTIFICATES, and CLIENT_CERTIFICATES exist in the chaos namespace and contain Base64-encoded key/crt pairs (ca.key/ca.crt, server.key/server.crt, client.key/client.crt). The server certificate must include the target pod's service name in its SAN list."
/>

<Troubleshoot
  issue="Status code overrides persist after pod-api-status-code ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Drop API calls instead of returning a different status.
- [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency): Delay API calls.
- [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body): Overwrite API request or response bodies without changing the status code.
- [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header): Modify API request or response headers.
- [Pod API modify response custom](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-response-custom): Combine body, header, and status code modifications in one fault.
- [Pod HTTP status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-status-code): Simpler HTTP-only status code override without API-level filters.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
