---
id: pod-api-modify-response-custom
title: Pod API modify response custom
sidebar_label: Pod API Modify Response Custom
description: Combine status code, header, and body modifications on selected API calls of a target Kubernetes pod in a single fault, with filtering by path, method, query, source, or destination.
keywords:
  - chaos engineering
  - pod api modify response custom
  - api chaos
  - custom response
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - api-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-response-custom
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-api-modify-response-custom
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-api-modify-response-custom
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod API modify response custom is a Kubernetes pod-level chaos fault that combines status code, header, and body modifications on selected API calls in a single experiment. Think of it as [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body), [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header), and [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code) rolled into one fault. It accepts the same rich filter set (path, method, headers, query, source, destination) and supports HTTPS through user-supplied TLS certificates. When the fault ends, responses return to whatever the application produces.

Use this fault when one realistic failure scenario requires changing multiple aspects of a response at once: returning `429` with a `Retry-After` header and a JSON `{"error":"rate_limited"}` body, or simulating an upstream that returns `200` with corrupted JSON, or returning `503` with a custom `X-Maintenance` header to model planned downtime.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Realistic rate-limit responses:** Set `STATUS_CODE=429`, `HEADERS_MAP={"Retry-After":"30"}`, and `RESPONSE_BODY={"error":"rate_limited"}` to simulate a real-world rate-limited upstream. Does the client honor `Retry-After`?
- **Maintenance-window simulation:** Return `503` with a custom `X-Maintenance: planned` header and an HTML maintenance page body. Does the client surface a useful message to end users?
- **Auth refresh path:** Return `401` with `WWW-Authenticate: Bearer error="invalid_token"` and a matching JSON body. Does the client trigger the token-refresh flow rather than failing?
- **Backwards-compatibility breakage:** Return `200` with a body missing a field the client expects. Does the client tolerate the new shape, or does it crash on the missing field?
- **Tenant-specific custom errors:** Use `HEADERS_FILTERS=X-Tenant: prod-eu` to apply a different status, body, and headers only to one tenant.

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

Configure the following fault parameters when you add Pod API modify response custom to an experiment in Chaos Studio. Defaults are shown for reference. Any modification field (`STATUS_CODE`, `HEADERS_MAP`, `RESPONSE_BODY`) left empty is not applied; you can use any subset of the three.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `STATUS_CODE` | HTTP status code to return. `0` keeps the application's original status code. | `0` |
| `HEADERS_MAP` | JSON object of header key-value pairs to inject or replace. Set a value to `""` to remove that header. Empty leaves all headers unchanged. | `""` |
| `RESPONSE_BODY` | Body string to overwrite the response (or request, when `DATA_DIRECTION` includes `request`). Empty leaves the body unchanged. | `""` |
| `DATA_DIRECTION` | Which direction to modify: `request`, `response`, or `both`. | `both` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched API calls to modify, between `0` and `100`. | `0` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for API traffic. | `80` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Filters (API matching)**

All filters are optional. Leave empty to match everything in that dimension. Combining filters narrows the match (AND across dimensions).

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | URL path the fault matches. Empty matches all paths. | `""` |
| `METHODS` | Comma-separated HTTP methods to match. Empty matches all methods. | `""` |
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

:::tip Use just what you need
If you only want to change the body, use [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body) instead. Reach for this fault when a realistic failure requires more than one of status, body, and headers to change together.
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

Intercepts API traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and, for the configured percentage of calls that match the path, method, header, query, and source or destination filters, simultaneously overrides the status code, headers, and body with the supplied values, optionally terminating TLS to apply the same logic to HTTPS calls.

---

## Expected behavior during fault execution

- API calls that match every configured filter have their response (and optionally request, depending on `DATA_DIRECTION`) rewritten with whatever combination of `STATUS_CODE`, `HEADERS_MAP`, and `RESPONSE_BODY` you set. Any of the three left empty is preserved as the application produced it.
- Calls outside the filter set pass through unchanged. Only the percentage selected by `TRANSACTION_PERCENTAGE` is modified.
- For HTTPS targets, the proxy terminates TLS using the supplied certificates so it can intercept and rewrite the call.
- Clients see a single coherent response (for example, status + headers + body that all match the simulated scenario), exercising the same code paths a real upstream failure would.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and API responses return to whatever the application produces.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client behavior matches the scenario:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to verify the client honors the headers you injected (such as `Retry-After`).
- **End-user error rate:** Use a Prometheus probe on the top-level error counter to detect leakage of the simulated failure to end users.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to look for stack traces from clients that did not handle the combined response correctly.

---

## Verify the fault execution effect

While the experiment is running, confirm all three modifications land together:

1. **Make a matched call and inspect status, headers, and body.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i -X <METHOD> "http://<target-pod-ip>:<TARGET_SERVICE_PORT><PATH_FILTER>"
   ```

   The status line should equal `HTTP/1.1 <STATUS_CODE> ...`, headers from `HEADERS_MAP` should appear (and removed keys should be absent), and the body should equal `RESPONSE_BODY` (or remain unchanged if it was empty).

2. **Confirm an unmatched call is untouched.**

   A call to a different path or method should return the application's normal status, headers, and body.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and API traffic returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without certificates:** When `HTTPS_ENABLED=true`, the proxy must terminate TLS. If the supplied certificates do not chain to one the client trusts, the client refuses the connection before any filter is applied.
- **gRPC status:** gRPC carries status in HTTP/2 trailers (`grpc-status`). This fault overrides HTTP status; gRPC clients also check `grpc-status` and may behave differently.
- **Pseudo-headers (HTTP/2):** `:method`, `:path`, `:status`, `:authority` cannot be modified through `HEADERS_MAP`.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start.

---

## Troubleshooting

<Troubleshoot
  issue="Pod API modify response custom experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Responses are unchanged during pod-api-modify-response-custom"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no calls are modified; STATUS_CODE, HEADERS_MAP, and RESPONSE_BODY are all empty (nothing to apply); filters are over-specified and match no real traffic; HTTPS_ENABLED is false but the target serves HTTPS; or the supplied TLS certificates do not chain correctly. Re-run with TRANSACTION_PERCENTAGE=100 and a known STATUS_CODE like 503 to confirm the path."
/>

<Troubleshoot
  issue="TLS handshake fails for pod-api-modify-response-custom in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the secrets referenced by CA_CERTIFICATES, SERVER_CERTIFICATES, and CLIENT_CERTIFICATES exist in the chaos namespace and contain Base64-encoded key/crt pairs (ca.key/ca.crt, server.key/server.crt, client.key/client.crt). The server certificate must include the target pod's service name in its SAN list."
/>

<Troubleshoot
  issue="Custom responses persist after pod-api-modify-response-custom ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Drop API calls instead of returning a custom response.
- [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency): Delay API calls.
- [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body): Only overwrite the body.
- [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header): Only modify headers.
- [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code): Only change the status code.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
