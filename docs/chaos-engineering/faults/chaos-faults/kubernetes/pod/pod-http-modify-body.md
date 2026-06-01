---
id: pod-http-modify-body
title: Pod HTTP modify body
sidebar_label: Pod HTTP Modify Body
description: Overwrite the HTTP response body returned by a target Kubernetes pod to test client behavior under corrupted, empty, or unexpected response payloads.
keywords:
  - chaos engineering
  - pod http modify body
  - http chaos
  - response body
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - http-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-modify-body
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-http-modify-body
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-http-modify-body
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod HTTP modify body is a Kubernetes pod-level chaos fault that overwrites the HTTP response body served by the target pod for a configurable duration. Status codes and headers continue to indicate success while the body is replaced with a value you specify (or made empty). When the fault ends, response bodies return to normal immediately.

Use this fault to test how a client behaves when an upstream service returns a syntactically valid response with corrupted, truncated, empty, or unexpected payload content: a JSON parser that crashes on a malformed object, a deserializer that swallows missing fields silently, or a UI that renders a blank screen on an empty body.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Defensive parsing:** When a JSON response is replaced with an empty body or a different content type, does the client panic, log and continue, or surface a user-visible error?
- **Schema-evolution resilience:** Does the client tolerate missing fields it expects to be present, or does it cast `null` into a primitive and crash?
- **Cache poisoning prevention:** A downstream service returns a malformed body. Does the caller cache the response and serve it to other users, or does it refuse to cache invalid payloads?
- **Content negotiation:** Switching the `Content-Type` from `application/json` to `text/plain` reveals whether the client checks the header before parsing.
- **Empty payload handling:** Forcing the body to be empty (`RESPONSE_BODY=""`) exposes clients that assume a non-empty success response.

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

Configure the following fault parameters when you add Pod HTTP modify body to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RESPONSE_BODY` | String used to overwrite the HTTP response body. Empty string produces an empty body. | `""` |
| `CONTENT_TYPE` | `Content-Type` header set on the modified response. Common values: `application/json`, `text/plain`, `text/html`. | `text/plain` |
| `CONTENT_ENCODING` | Encoding applied to the body. Supported values: `gzip`, `deflate`, or empty for no encoding. | `""` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for HTTP traffic. | `80` |
| `TOXICITY` | Percentage of intercepted responses whose body is overwritten, between `0` and `100`. `100` modifies every response. | `100` |
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

:::tip Keep `CONTENT_TYPE` consistent with the body
If the client expects `application/json` but the fault sets `text/plain` with a string payload, you will see the client fail at the content-type check rather than the parser. Pick the combination that exercises the layer you want to test.
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

Intercepts HTTP responses on `TARGET_SERVICE_PORT` inside the container's network namespace and overwrites the response body with the configured `RESPONSE_BODY` (and `CONTENT_TYPE`/`CONTENT_ENCODING`), optionally limited to a configurable percentage of responses so other traffic is unaffected.

---

## Expected behavior during fault execution

- HTTP and HTTPS responses on `TARGET_SERVICE_PORT` continue to use the same status code and headers (apart from `Content-Type` and `Content-Length`, which are updated to match the new body).
- The body returned to the client is replaced with `RESPONSE_BODY`. If `RESPONSE_BODY` is empty, the body is empty (`Content-Length: 0`).
- Only the percentage of responses selected by `TOXICITY` are modified; the rest pass through unchanged.
- Traffic on other ports of the same container is not affected. gRPC unary calls have their response payload overwritten the same way HTTP/1.1 responses do.
- Clients that parse the body strictly (JSON schema, protobuf) error at the parser. Clients that read raw bytes succeed but with unexpected content.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and HTTP responses return to their original bodies within a couple of seconds. In-flight responses already buffered for modification are released as soon as cleanup runs.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect parse-related 5xx responses or exceptions.
- **Application logs:** Tail caller logs with a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) for stack traces from JSON, XML, or protobuf parsers.
- **Successful response payload validation:** Use an HTTP probe with response-body assertions on a stable endpoint to confirm whether modified bodies are reaching production-shaped clients.

---

## Verify the fault execution effect

While the experiment is running, confirm the response body is being overwritten:

1. **Inspect the body returned to a client.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -i http://<target-pod-ip>:<TARGET_SERVICE_PORT>/<known-path>
   ```

   The body should equal `RESPONSE_BODY` (or be empty if `RESPONSE_BODY` was empty), and `Content-Type` should equal the configured value.

2. **Confirm headers signal a successful response.**

   The status code and original headers (apart from `Content-Type`, `Content-Length`, and any encoding header) remain unchanged. Clients that rely on `200 OK` to mean "valid payload" will be misled, which is the test.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and HTTP response bodies return to their original values.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without supplied certificates:** This fault does not terminate TLS. If the target serves HTTPS and you need to modify encrypted bodies, use [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body), which accepts CA, server, and client certificates as TLS inputs.
- **Streaming responses:** gRPC server-streaming and HTTP chunked responses larger than what fits in a single proxy buffer may be truncated rather than cleanly overwritten.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod HTTP modify body experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Response body is unchanged during pod-http-modify-body"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not match the port the application actually listens on (verify with kubectl exec <pod> -- ss -tlnp); the traffic is HTTPS and the chaos proxy is not terminating TLS (use Pod API modify body instead); or TOXICITY is set lower than expected so only a fraction of responses are modified. Re-run with TOXICITY=100 and confirm the application is reachable on the configured port."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-http-modify-body in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Response bodies remain modified after pod-http-modify-body ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Delay HTTP responses instead of changing their body.
- [Pod HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-header): Modify or remove HTTP headers on requests and responses.
- [Pod HTTP status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-status-code): Change the HTTP response status code returned to the client.
- [Pod HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-reset-peer): Reset HTTP TCP connections instead of altering payloads.
- [Pod API modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-modify-body): Overwrite request or response bodies with rich path, method, header, source, and destination filters (and HTTPS support via supplied TLS certificates).
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
