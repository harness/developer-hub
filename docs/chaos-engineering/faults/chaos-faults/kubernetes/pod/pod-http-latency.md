---
id: pod-http-latency
title: Pod HTTP latency
sidebar_label: Pod HTTP Latency
description: Add a configurable delay to HTTP responses served by a target Kubernetes pod to test timeouts, retries, and tail-latency behavior at the application protocol layer.
keywords:
  - chaos engineering
  - pod http latency
  - http chaos
  - api latency
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - http-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-latency
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-http-latency
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-http-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod HTTP latency is a Kubernetes pod-level chaos fault that adds a configurable delay to HTTP responses served by the target pod for a configurable duration. The delay is applied at the application protocol layer on the chosen service port; non-HTTP traffic and traffic on other ports passes through unaffected. When the fault ends, the delay is removed and HTTP responses return to normal immediately.

Use this fault to test how a service behaves when a downstream HTTP API or internal handler becomes slow: a sluggish dependency, a backed-up worker pool, or a GC pause that adds tens of milliseconds to every response.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Client timeout budgets:** When the dependency takes 2 seconds instead of 50 ms, do callers honor their timeout configuration, or do they hang waiting for a response?
- **Retry storms:** Does the client's retry policy amplify the slowdown into a thundering herd, or does it apply backoff and jitter?
- **Tail-latency SLOs:** Adding 500 ms to a small fraction of requests reproduces realistic tail-latency degradation. Does your p99 alert fire, and does the runbook hold up?
- **Circuit breaker tripping:** Does the upstream client trip its circuit breaker after `n` slow responses, or does it keep sending traffic to the degraded replica?
- **HTTP/2 and gRPC stream behavior:** A long-lived stream multiplexes many calls. Do per-call deadlines fire, or do all multiplexed calls share the same delay?

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

Configure the following fault parameters when you add Pod HTTP latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each HTTP response, in milliseconds. | `2000` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for HTTP traffic. | `80` |
| `TOXICITY` | Percentage of intercepted requests to delay, between `0` and `100`. `100` delays every request; `0` delays none. | `100` |
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

:::tip Use `TOXICITY` to model partial failures
Setting `TOXICITY=10` slows roughly 10% of requests instead of all of them. This is closer to real-world partial degradation and exercises clients' tail-latency handling, not just hard timeouts.
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

Intercepts HTTP traffic on `TARGET_SERVICE_PORT` inside the container's network namespace and adds `LATENCY` milliseconds to each response, optionally limited to a configurable percentage of requests so other traffic is unaffected.

---

## Expected behavior during fault execution

- HTTP and HTTPS responses on `TARGET_SERVICE_PORT` are delayed by `LATENCY` milliseconds before being returned to the client. gRPC unary calls (built on HTTP/2) are delayed the same way.
- Only requests selected by `TOXICITY` are delayed; the rest pass through with normal latency.
- Traffic on other ports of the same container is not affected. Non-HTTP TCP traffic on the same port is passed through but no chaos is applied.
- Long-lived HTTP/2 or gRPC streams that were established before the fault began continue to serve frames; new requests through those streams are delayed.
- Clients with timeouts shorter than `LATENCY` see request timeouts; clients with longer timeouts succeed but with elevated p99.
- Service-mesh outlier detection that triggers on slow responses may eject the pod from upstream load-balancing pools.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and HTTP responses return to baseline latency within a couple of seconds. In-flight requests already buffered for delay are released as soon as cleanup runs.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Tail latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the service's p99 HTTP latency metric to confirm the increase matches `LATENCY` scaled by `TOXICITY`.
- **Client error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect timeout-induced 5xx responses.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady` because its own readiness probe times out at the new latency.

---

## Verify the fault execution effect

While the experiment is running, measure HTTP response time and confirm the increase:

1. **Time a request to the target service from another pod.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s \
       http://<target-pod-ip>:<TARGET_SERVICE_PORT>/<known-path>
   ```

   `time_total` should reflect the added delay on at least `TOXICITY` percent of repeated calls.

2. **Confirm the proxy is intercepting the right port.**

   ```bash
   kubectl exec -n <namespace> <target-pod> -- ss -tlnp
   ```

   The proxy listens on `PROXY_PORT` and reroutes the configured `TARGET_SERVICE_PORT` through it for the fault's duration.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and HTTP latency returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **TLS-terminated traffic on the same container:** If the target container serves HTTPS and the chaos proxy does not have the matching certificate, the proxy cannot inspect or delay encrypted bodies. For HTTPS scenarios with a custom CA, use [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency), which supports the TLS certificate inputs needed to terminate HTTPS at the proxy.
- **Long-lived HTTP/2 connections:** Frames on streams already in flight when the fault starts are not delayed; only new requests routed through the proxy are.
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod HTTP latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No HTTP latency observed during pod-http-latency"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not match the port the application actually listens on (verify with kubectl exec <pod> -- ss -tlnp); the traffic you are measuring is HTTPS but the chaos proxy is not terminating TLS (use Pod API latency instead); or TOXICITY is set lower than expected so only a fraction of requests are delayed. Re-run the experiment with TOXICITY=100 and confirm the application is reachable on the configured port."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-http-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Latency persists after pod-http-latency ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-body): Overwrite the HTTP response body instead of delaying it.
- [Pod HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-header): Modify or remove HTTP headers on request or response.
- [Pod HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-reset-peer): Reset HTTP TCP connections instead of slowing them.
- [Pod HTTP status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-status-code): Change the HTTP response status code returned to the client.
- [Pod API latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-latency): Add HTTP-protocol latency with rich path, method, header, source, and destination filters (and HTTPS support via supplied TLS certificates).
- [Pod network latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency): Add packet-level delay at the network layer instead of the HTTP layer.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
