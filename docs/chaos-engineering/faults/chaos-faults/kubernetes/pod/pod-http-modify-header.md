---
id: pod-http-modify-header
title: Pod HTTP modify header
sidebar_label: Pod HTTP Modify Header
description: Override HTTP request or response headers served by a target Kubernetes pod to test client and server resilience to missing, altered, or unexpected header values.
keywords:
  - chaos engineering
  - pod http modify header
  - http chaos
  - http headers
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - http-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-modify-header
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-http-modify-header
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-http-modify-header
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod HTTP modify header is a Kubernetes pod-level chaos fault that overrides HTTP request or response headers on the target pod for a configurable duration. You provide a map of header keys to values that the proxy then injects, replaces, or removes (when the value is empty). When the fault ends, headers return to normal immediately.

Use this fault to test how a client or server behaves when a header it depends on is missing, malformed, or carries an unexpected value: a missing `Authorization`, a flipped `Cache-Control`, a removed `Content-Type`, or a tampered correlation ID.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Authentication header tampering:** Removing `Authorization` from the request or modifying its value verifies whether the server returns a clean `401` or leaks information about authentication failures.
- **Cache directive resilience:** Flipping `Cache-Control` from `no-store` to `max-age=3600` on responses reveals whether intermediate caches store sensitive data they should not.
- **Tracing and correlation IDs:** Stripping `X-Request-ID` or `traceparent` shows whether logs and traces still correlate, or whether the request becomes invisible to observability.
- **Content-type coercion:** Changing `Content-Type` from `application/json` to `text/html` exposes clients that select parsers based on the header.
- **Custom security headers:** Removing `X-Frame-Options`, `Content-Security-Policy`, or `Strict-Transport-Security` from responses verifies whether browsers and downstream services degrade safely.

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

Configure the following fault parameters when you add Pod HTTP modify header to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `HEADERS_MAP` | JSON object of header key-value pairs to inject or replace. Set a value to `""` to remove that header. Example: `{"X-Auth-Token":"deadbeef","X-Trace-Id":""}`. | `{}` |
| `HEADER_MODE` | Whether to modify `request` headers (sent to the server) or `response` headers (sent to the client). | `response` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for HTTP traffic. | `80` |
| `TOXICITY` | Percentage of intercepted messages whose headers are modified, between `0` and `100`. `100` modifies every matching message. | `100` |
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

:::tip Removing a header
Set the header's value in `HEADERS_MAP` to an empty string to remove the header. For example, `{"Authorization":""}` removes the `Authorization` header rather than setting it to an empty value.
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

Intercepts HTTP traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and rewrites headers on either the request or response stream (as configured by `HEADER_MODE`) using the entries in `HEADERS_MAP`, optionally limited to a percentage of messages so other traffic is unaffected.

---

## Expected behavior during fault execution

- HTTP and HTTPS messages on `TARGET_SERVICE_PORT` are rewritten according to `HEADER_MODE` and `HEADERS_MAP`. Existing headers with matching keys are replaced; new headers are added; headers with an empty value in the map are removed.
- Only messages selected by `TOXICITY` are modified; the rest pass through unchanged. Bodies, status codes, and other headers are preserved.
- Traffic on other ports of the same container is not affected. gRPC headers and trailers carried over HTTP/2 are modified the same way.
- Clients or servers that fail validation on missing or unexpected headers surface their own error responses (often `400` or `401`); ones that silently fall back may continue to operate, which is itself a finding.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and headers return to their original values within a couple of seconds. In-flight messages already buffered for modification are released as soon as cleanup runs.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the calling service to detect 4xx responses driven by missing or unexpected headers.
- **Authentication and authorization metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on auth failure counters when modifying `Authorization` or session headers.
- **Trace continuity:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to query your tracing system for orphan spans during the experiment window.

---

## Verify the fault execution effect

While the experiment is running, confirm the headers are being rewritten:

1. **Inspect headers returned to a client (when `HEADER_MODE=response`).**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i http://<target-pod-ip>:<TARGET_SERVICE_PORT>/<known-path>
   ```

   The response headers should reflect `HEADERS_MAP`: added or modified keys present with the configured values, removed keys absent.

2. **Inspect headers received by the server (when `HEADER_MODE=request`).**

   Have the target application log the incoming request headers (or use an echo endpoint) and confirm the modifications appear there. Status codes, the response body, and headers outside `HEADERS_MAP` should be unchanged.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and HTTP headers return to their original values.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without supplied certificates:** This fault does not terminate TLS. If the target serves HTTPS and you need to modify encrypted headers, use [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header), which accepts CA, server, and client certificates as TLS inputs.
- **Pseudo-headers (HTTP/2 `:method`, `:path`, `:status`, `:authority`):** These cannot be modified through `HEADERS_MAP`. Use other faults (such as Pod HTTP status code) to control them.
- **Hop-by-hop headers:** Headers like `Connection` and `Transfer-Encoding` are owned by the proxy itself and are not safe to override through `HEADERS_MAP`.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod HTTP modify header experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Headers are unchanged during pod-http-modify-header"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not match the port the application actually listens on (verify with kubectl exec <pod> -- ss -tlnp); HEADER_MODE is set to response but you are inspecting request headers (or vice versa); the traffic is HTTPS and the chaos proxy is not terminating TLS (use Pod API modify header instead); or HEADERS_MAP is not valid JSON. Re-run with TOXICITY=100 and a minimal one-entry HEADERS_MAP to confirm the path is working."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-http-modify-header in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Headers remain modified after pod-http-modify-header ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Delay HTTP responses instead of changing headers.
- [Pod HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-body): Overwrite the HTTP response body.
- [Pod HTTP status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-status-code): Change the HTTP response status code returned to the client.
- [Pod HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-reset-peer): Reset HTTP TCP connections instead of altering headers.
- [Pod API modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-header): Modify request or response headers with rich path, method, header, source, and destination filters (and HTTPS support via supplied TLS certificates).
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
