---
id: pod-api-modify-body
title: Pod API modify body
sidebar_label: Pod API Modify Body
description: Overwrite API request or response bodies on a target Kubernetes pod using path, method, header, query, and source or destination filters to test client behavior under corrupted payloads.
keywords:
  - chaos engineering
  - pod api modify body
  - api chaos
  - response body
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - api-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-api-modify-body
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-api-modify-body
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod API modify body is a Kubernetes pod-level chaos fault that overwrites the request or response body of selected API calls on the target pod for a configurable duration. It accepts a rich set of filters (path, method, headers, query parameters, source, destination) and supports HTTPS through user-supplied TLS certificates. When the fault ends, request and response bodies return to normal immediately.

Use this fault when you need to corrupt or replace the payload of one specific API call while leaving everything else on the pod working: return an empty body for one endpoint, replace a JSON object with malformed content, or strip out a critical field on a write path.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Defensive deserialization:** Replace the response body of `GET /v2/users/me` with `{}` and verify whether the calling service tolerates missing fields or crashes.
- **Schema-evolution resilience:** Overwrite the response with a payload missing a field the client expects. Does the client fail safely, log and degrade, or panic?
- **Write-path validation:** Overwrite the request body for `POST /v2/orders` so the server receives a malformed payload, and verify whether validation rejects it cleanly.
- **Empty payload handling:** Force the body to empty to expose clients that assume a non-empty response on success.
- **Tenant-scoped corruption:** Use `HEADERS_FILTERS` (for example `X-Tenant: prod-us`) to corrupt only one tenant's responses while the rest succeed.

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

Configure the following fault parameters when you add Pod API modify body to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RESPONSE_BODY` | String used to overwrite the body. Despite the name, the same string is used for both request and response when `DATA_DIRECTION=both`. Empty string produces an empty body. | `""` |
| `DATA_DIRECTION` | Which direction to modify: `request` (body sent to the server), `response` (body returned to the client), or `both`. | `both` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched API calls whose body is overwritten, between `0` and `100`. | `0` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for API traffic. | `80` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters (API matching)**

All filters are optional. Leave empty to match everything in that dimension. Combining filters narrows the match (AND across dimensions).

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | URL path the fault matches. Empty matches all paths. | `""` |
| `METHODS` | Comma-separated HTTP methods to match (for example `GET,POST`). Empty matches all methods. | `""` |
| `QUERY_PARAMS` | Query-parameter filter. Empty matches all query strings. | `""` |
| `HEADERS_FILTERS` | Header filter. Empty matches all headers. | `""` |

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

:::tip Use `DATA_DIRECTION` deliberately
`DATA_DIRECTION=response` corrupts what the client sees from the server (tests client parsing). `DATA_DIRECTION=request` corrupts what the server receives (tests server input validation). `both` runs both at once.
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

Intercepts API traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and overwrites the body (on requests, responses, or both, as set by `DATA_DIRECTION`) of the configured percentage of calls that match the path, method, header, query, and source or destination filters, optionally terminating TLS to apply the same logic to HTTPS calls.

---

## Expected behavior during fault execution

- API calls that match every configured filter have their body replaced with `RESPONSE_BODY`. Calls outside the filter set pass through unchanged.
- When `DATA_DIRECTION=request`, the server receives the modified body. When `=response`, the client receives it. When `=both`, both are overwritten with the same payload.
- Only the percentage selected by `TRANSACTION_PERCENTAGE` is modified; the rest pass through unchanged.
- For HTTPS targets, the proxy terminates TLS using the supplied certificates so it can read and rewrite the body.
- Clients (or servers) that parse the body strictly error at the parser; ones that read bytes succeed but with unexpected content.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and bodies return to their original values within a couple of seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect parser-related 5xx responses or exceptions.
- **Server validation errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the server's request-validation failure counter when `DATA_DIRECTION=request`.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to look for parser stack traces during the experiment window.

---

## Verify the fault execution effect

While the experiment is running, confirm the body is being overwritten:

1. **Make a matched call and inspect the body.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i -X <METHOD> "http://<target-pod-ip>:<TARGET_SERVICE_PORT><PATH_FILTER>"
   ```

   For `DATA_DIRECTION=response`, the response body should equal `RESPONSE_BODY`. For `DATA_DIRECTION=request`, have the server log the incoming body and confirm it matches `RESPONSE_BODY` rather than what the client sent.

2. **Confirm an unmatched call is untouched.**

   A call to a different path, method, or destination should return the application's normal body unchanged.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and API request and response bodies return to their original values.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without certificates:** When `HTTPS_ENABLED=true`, the proxy must terminate TLS. If the supplied certificates do not chain to one the client trusts, the client will refuse the connection before any filter is applied.
- **Streaming responses:** gRPC server-streaming and HTTP chunked responses larger than what fits in a single proxy buffer may be truncated rather than cleanly overwritten.
- **Single body value:** This fault replaces the entire body with a fixed string. To rewrite headers or status alongside the body, use [Pod API modify response custom](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-response-custom).
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start.

---

## Troubleshooting

<Troubleshoot
  issue="Pod API modify body experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Body is unchanged during pod-api-modify-body"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no calls are modified; DATA_DIRECTION is response but you are checking the request side (or vice versa); filters are over-specified and match no real traffic; HTTPS_ENABLED is false but the target serves HTTPS; or the supplied TLS certificates do not chain correctly. Re-run with TRANSACTION_PERCENTAGE=100 and a single broad filter to confirm the path."
/>

<Troubleshoot
  issue="TLS handshake fails for pod-api-modify-body in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the secrets referenced by CA_CERTIFICATES, SERVER_CERTIFICATES, and CLIENT_CERTIFICATES exist in the chaos namespace and contain Base64-encoded key/crt pairs (ca.key/ca.crt, server.key/server.crt, client.key/client.crt). The server certificate must include the target pod's service name in its SAN list."
/>

<Troubleshoot
  issue="Bodies remain modified after pod-api-modify-body ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Drop API calls instead of modifying their body.
- [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency): Delay API calls.
- [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code): Return a specific status code instead of changing the body.
- [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header): Modify API request or response headers.
- [Pod API modify response custom](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-response-custom): Combine body, header, and status code modifications in one fault.
- [Pod HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-body): Simpler HTTP-only body modification without API-level filters.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
