---
id: pod-http-status-code
title: Pod HTTP status code
sidebar_label: Pod HTTP Status Code
description: Override the HTTP response status code returned by a target Kubernetes pod to test client error handling, retry classification, and circuit-breaker behavior on specific HTTP status codes.
keywords:
  - chaos engineering
  - pod http status code
  - http chaos
  - status code
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - http-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-status-code
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-http-status-code
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-http-status-code
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod HTTP status code is a Kubernetes pod-level chaos fault that overrides the HTTP response status code returned by the target pod for a configurable duration. You can also overwrite the response body to match the new status (for example, return a `500` with an error payload), or leave the body untouched. When the fault ends, status codes return to whatever the application produces naturally.

Use this fault to test how a client handles specific HTTP error codes: a `429` from a rate-limited dependency, a `503` from an overloaded backend, a `404` from a missing resource, or a deliberate `200` returned over a "successful" but broken response.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Retry classification:** Does the client retry on `503` but not on `400`? Does it honor `Retry-After` on `429`?
- **Error budget consumption:** Forcing a percentage of `500`s reveals whether your SLO alerting and error-budget burn rules fire as expected.
- **Cache invalidation:** Returning `404` for resources the client previously cached as `200` exposes stale-cache handling.
- **Auth failure handling:** A targeted `401` or `403` reveals whether the client refreshes tokens, prompts the user, or simply loops.
- **Rate-limit handling:** Returning `429` with a `Retry-After` body verifies whether the client backs off and resumes rather than thrashing.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pods are Running:** The application pods you intend to target are in the `Running` state before the fault is launched.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **HTTP service on a known port:** The target container serves HTTP, HTTPS, or gRPC traffic on a port you can specify with `TARGET_SERVICE_PORT`.
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

Configure the following fault parameters when you add Pod HTTP status code to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `STATUS_CODE` | HTTP status code to return. Supported values: `200`, `201`, `202`, `204`, `300`, `301`, `302`, `304`, `307`, `400`, `401`, `403`, `404`, `500`, `501`, `502`, `503`, `504`. `0` picks one at random from the supported list. | `0` |
| `MODIFY_RESPONSE_BODY` | When `true`, replaces the response body with `RESPONSE_BODY` (or a default body matching the status code if `RESPONSE_BODY` is empty). When `false`, the original body is returned alongside the new status code. | `true` |
| `RESPONSE_BODY` | Body string to overwrite the response when `MODIFY_RESPONSE_BODY` is `true`. Empty falls back to a default body matching the status code. | `""` |
| `CONTENT_TYPE` | `Content-Type` header set on the modified response. | `text/plain` |
| `CONTENT_ENCODING` | Encoding applied to the body. Supported values: `gzip`, `deflate`, or empty for no encoding. | `""` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for HTTP traffic. | `80` |
| `TOXICITY` | Percentage of intercepted responses whose status is overridden, between `0` and `100`. `100` modifies every response. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**Proxy and interface**

| Tunable | Description | Default |
| --- | --- | --- |
| `PROXY_PORT` | Port the chaos proxy listens on inside the container's network namespace. Must not conflict with any port already in use on the target container. | `20000` |
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

:::tip Test a class of failures with random codes
Setting `STATUS_CODE=0` cycles through the supported codes at random. This is useful for fuzz-style testing of a client's error handling across the full spectrum of HTTP failures.
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

Intercepts HTTP responses on `TARGET_SERVICE_PORT` inside the container's network namespace and replaces the status code with `STATUS_CODE` (and optionally rewrites the body), optionally limited to a configurable percentage of responses so other traffic is unaffected.

---

## Expected behavior during fault execution

- HTTP and HTTPS responses on `TARGET_SERVICE_PORT` return the configured `STATUS_CODE` instead of the application's original status.
- When `MODIFY_RESPONSE_BODY=true`, the body is replaced with `RESPONSE_BODY` (or a default error body matching the status code). `Content-Type` and `Content-Length` are updated accordingly. When `false`, only the status line changes.
- Only responses selected by `TOXICITY` are modified; the rest pass through unchanged.
- Traffic on other ports of the same container is not affected. gRPC responses (which carry status in trailers) are not currently overridden; use [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code) for gRPC-style status injection.
- Clients that branch on status codes execute their corresponding error-handling paths: retry, fail-fast, prompt for auth, back off, and so on.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and HTTP status codes return to whatever the application produces. In-flight responses already buffered for modification are released as soon as cleanup runs.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Status-code distribution:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the service's HTTP status counter (`http_requests_total{status="503"}`) to confirm the injected codes match `STATUS_CODE`.
- **Client retry counter:** Use a Prometheus probe on the calling service's retry counter to verify it backs off correctly.
- **End-user error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the top-level API to detect whether the injected errors leak through to end users.

---

## Verify the fault execution effect

While the experiment is running, confirm the status code is being overridden:

1. **Make a request and inspect the status line.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i http://<target-pod-ip>:<TARGET_SERVICE_PORT>/<known-path>
   ```

   The status line should equal `HTTP/1.1 <STATUS_CODE> ...` on at least `TOXICITY` percent of repeated calls. The body matches `RESPONSE_BODY` (or the default for the status code) when `MODIFY_RESPONSE_BODY=true`.

2. **Confirm the proxy is intercepting the right port.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -- ss -tlnp
   ```

   The proxy listens on `PROXY_PORT` and reroutes the configured `TARGET_SERVICE_PORT` through it for the fault's duration.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and HTTP status codes return to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without supplied certificates:** This fault does not terminate TLS. If the target serves HTTPS and you need to modify encrypted responses, use [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code), which accepts CA, server, and client certificates as TLS inputs.
- **gRPC status:** gRPC carries status in HTTP/2 trailers (`grpc-status`), not the HTTP status line. Use [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code) when you need to override gRPC status codes.
- **Status codes outside the supported set:** Only the codes listed under `STATUS_CODE` are supported. Arbitrary three-digit codes are not accepted.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod HTTP status code experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Status code is unchanged during pod-http-status-code"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not match the port the application actually listens on (verify with kubectl exec <pod> -- ss -tlnp); the traffic is HTTPS and the chaos proxy is not terminating TLS (use Pod API status code instead); STATUS_CODE is set to a value outside the supported list; or TOXICITY is set lower than expected. Re-run with TOXICITY=100 and a known status code like 503 to confirm the path is working."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-http-status-code in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Status code overrides persist after pod-http-status-code ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Slow HTTP responses instead of changing their status code.
- [Pod HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-body): Overwrite the HTTP response body without changing the status code.
- [Pod HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-header): Modify or remove HTTP headers on requests and responses.
- [Pod HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-reset-peer): Reset HTTP TCP connections instead of returning a status code.
- [Pod API status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-status-code): Override status codes with rich path, method, header, source, and destination filters (and HTTPS support via supplied TLS certificates).
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
