---
id: pod-api-block
title: Pod API block
sidebar_label: Pod API Block
description: Block selected API requests or responses on a target Kubernetes pod using path, method, header, query parameter, and source or destination filters to test client retry and failover behavior.
keywords:
  - chaos engineering
  - pod api block
  - api chaos
  - api gateway fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - api-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-block
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-api-block
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-api-block
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod API block is a Kubernetes pod-level chaos fault that blocks API traffic going to or from the target pod for a configurable duration. Unlike its HTTP siblings, this fault accepts a rich set of filters: HTTP path, method, headers, query parameters, source host/IP, destination host/IP/port, and direction (ingress or egress). It also supports HTTPS through user-supplied TLS certificates, so it can intercept and block encrypted API calls. When the fault ends, traffic flows normally again.

Use this fault when you need to make one specific dependency or endpoint unreachable while leaving everything else on the pod working: block calls to a single upstream, block one URL path while serving others, or block only `POST` requests while `GET` continues unaffected.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Single-dependency outage:** Block `DESTINATION_HOSTS=payments.example.com` and verify whether the application degrades gracefully, returns a sensible error, or hangs.
- **Path-level rollback validation:** Block only `PATH_FILTER=/v2/users` to simulate a deploy rollback of one endpoint while the rest of the API serves traffic normally.
- **Mutation-only outages:** Block `METHODS=POST,PUT,PATCH,DELETE` to keep reads working but break writes. Useful for testing read-only failover modes.
- **Tenant-scoped failure:** Use `HEADERS_FILTERS` (for example `X-Tenant: prod-us-east`) to block only one tenant's traffic to a multi-tenant service.
- **Ingress vs egress isolation:** `SERVICE_DIRECTION=ingress` blocks traffic the pod receives; `SERVICE_DIRECTION=egress` blocks the pod's outbound calls.

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

Configure the following fault parameters when you add Pod API block to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DATA_DIRECTION` | Whether to block the `request` (pod never sees it) or the `response` (pod processed it but the answer is dropped). | `request` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched API calls to block, between `0` and `100`. `0` blocks none; `100` blocks every match. | `0` |
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

:::tip Start with one filter at a time
The match is AND across filters. Specify only what you need (for example, just `PATH_FILTER=/health`) so the fault matches a clear, verifiable set of calls. Add more filters once you have confirmed the basic match works.
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

Intercepts API traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and drops the configured percentage of requests (or responses) that match the path, method, header, query, and source or destination filters, optionally terminating TLS to apply the same logic to HTTPS calls.

---

## Expected behavior during fault execution

- API calls that match every configured filter are blocked at the rate set by `TRANSACTION_PERCENTAGE`. When `DATA_DIRECTION=request`, the application never sees the call; the client receives an error (`502`/`503`-style) from the proxy. When `DATA_DIRECTION=response`, the application processes the call but the response is dropped before reaching the client.
- Calls that do not match the filters pass through unchanged. Traffic on other ports of the same container is not affected.
- For HTTPS targets, the proxy terminates TLS using the supplied certificates so it can read the path, method, and headers needed to evaluate filters.
- Clients with retry logic typically retry blocked calls. Whether retries succeed depends on the rest of your topology (other replicas, fallback paths).

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and API traffic flows normally within a couple of seconds. In-flight calls already blocked during the fault remain failed; clients re-issue them on the next attempt.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **API error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the calling service's error counter, scoped to the path or destination you blocked.
- **End-user impact:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the top-level API to detect whether the blocked dependency leaks an error to end users.
- **Retry budget consumption:** Use a Prometheus probe on the client's retry counter to confirm the retry policy holds.

---

## Verify the fault execution effect

While the experiment is running, confirm the right calls are being blocked:

1. **Send a call that matches the filters and observe the failure.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i -X <METHOD> "http://<target-pod-ip>:<TARGET_SERVICE_PORT><PATH_FILTER>?<QUERY_PARAMS>" \
     -H "<HEADER>: <VALUE>"
   ```

   Matching calls should fail or hang. Non-matching calls (different path, method, header, or destination) should succeed.

2. **Confirm the unaffected traffic.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i "http://<target-pod-ip>:<TARGET_SERVICE_PORT>/health"
   ```

   If you scoped the block correctly (for example, only `/v2/users`), unrelated endpoints continue to return `200 OK`.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and API traffic returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without certificates:** When `HTTPS_ENABLED=true`, the proxy must terminate TLS. If the supplied certificates do not chain to one the client trusts, the client will refuse the connection before any filter is applied.
- **gRPC unary calls work; bidirectional streaming is best-effort:** Status codes returned for streaming RPCs depend on the client library's behavior on broken streams.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod API block experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No API calls are blocked during pod-api-block"
  mode="docs"
  fallback="The most common causes are: TRANSACTION_PERCENTAGE is 0 (default) so no calls are blocked; filters are over-specified and match no real traffic (broaden PATH_FILTER and METHODS); HTTPS_ENABLED is false but the target serves HTTPS, so the proxy cannot read the request to evaluate filters; or the supplied TLS certificates do not chain correctly. Re-run with TRANSACTION_PERCENTAGE=100 and a single broad filter to confirm the path."
/>

<Troubleshoot
  issue="TLS handshake fails for pod-api-block in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the secrets referenced by CA_CERTIFICATES, SERVER_CERTIFICATES, and CLIENT_CERTIFICATES exist in the chaos namespace and contain Base64-encoded key/crt pairs (ca.key/ca.crt, server.key/server.crt, client.key/client.crt). The server certificate must include the target pod's service name in its SAN list. If the client uses cert pinning, this fault cannot block its traffic without disabling the pin."
/>

<Troubleshoot
  issue="API traffic stays blocked after pod-api-block ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency): Delay API responses instead of blocking them.
- [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code): Return a specific status code (such as `503`) instead of dropping the request.
- [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body): Overwrite API request or response bodies.
- [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header): Modify API request or response headers.
- [Pod API modify response custom](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-response-custom): Combine body, header, and status code modifications in one fault.
- [Pod HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-reset-peer): Reset TCP connections rather than dropping individual API calls.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
