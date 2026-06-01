---
id: pod-http-reset-peer
title: Pod HTTP reset peer
sidebar_label: Pod HTTP Reset Peer
description: Forcibly reset TCP connections carrying HTTP requests to a target Kubernetes pod to test client retry, connection-pool, and circuit-breaker behavior on abrupt disconnects.
keywords:
  - chaos engineering
  - pod http reset peer
  - http chaos
  - tcp reset
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - http-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-reset-peer
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-http-reset-peer
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-http-reset-peer
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod HTTP reset peer is a Kubernetes pod-level chaos fault that forcibly resets the TCP connection carrying an HTTP request to the target pod after a configurable delay. The client sees an abrupt `connection reset by peer` error (RST), as if a load balancer or stateful firewall had killed the connection mid-request. When the fault ends, connections complete normally again.

Use this fault to test how a client handles abrupt connection failures rather than graceful timeouts: a backend that crashes during a request, a network device that resets idle sessions, or a kubelet that restarts a pod mid-stream.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Retry classification:** Does the client distinguish a connection reset (often safe to retry) from a `5xx` response (which may have side effects)? Does it follow idempotency rules before retrying?
- **Connection pool health:** When a pooled connection is reset, does the client drop it from the pool, or does it keep handing out a broken connection to subsequent requests?
- **Circuit breaker tripping:** Do repeated `RST`s trip the upstream circuit breaker, or are they handled silently?
- **Long-polling and SSE behavior:** A reset on a long-lived stream looks different from a reset on a short request. Does the client reconnect cleanly, and with backoff?
- **Service-mesh failover:** Does the sidecar move traffic to a healthy replica after a few resets, or does it keep retrying the same one?

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

Configure the following fault parameters when you add Pod HTTP reset peer to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RESET_TIMEOUT` | Time in milliseconds the proxy waits after receiving the request before resetting the connection. `0` resets immediately. | `0` |
| `TARGET_SERVICE_PORT` | Port the target container listens on for HTTP traffic. | `80` |
| `TOXICITY` | Percentage of intercepted requests whose connection is reset, between `0` and `100`. `100` resets every request. | `100` |
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

:::tip Reset after a delay to simulate mid-request failures
Setting `RESET_TIMEOUT=500` resets the connection after 500 ms of work, mimicking a backend that crashed midway through processing the request. This is a different failure shape from an immediate reset and exercises different code paths in the client.
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

Intercepts TCP connections on `TARGET_SERVICE_PORT` inside the container's network namespace and forcibly resets them (sends a TCP RST to the client) after `RESET_TIMEOUT` milliseconds, optionally limited to a configurable percentage of requests so other traffic is unaffected.

---

## Expected behavior during fault execution

- For each request that hits the proxy, the TCP connection is closed with an `RST` after `RESET_TIMEOUT` milliseconds.
- Clients on the receiving end see one of: `ECONNRESET` / "connection reset by peer" (Linux), `WSAECONNRESET` (Windows), `IOException: Connection reset` (JVM), or equivalent.
- Only requests selected by `TOXICITY` are reset; the rest pass through cleanly. Traffic on other ports of the same container is not affected.
- For pooled connections, the client typically removes the broken connection from the pool and either retries on a new connection or surfaces an error to the caller depending on its retry policy.
- Long-lived HTTP/2 or gRPC connections that were established before the fault began are reset together with whatever streams are open on them when the proxy decides to reset.

:::info When the fault ends
After `TOTAL_CHAOS_DURATION`, the proxy is torn down and new TCP connections complete normally. Connections that were reset during the fault remain closed; clients re-establish them on the next request.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Client error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the calling service to detect a spike in connection-reset errors (often surfaced as `502` or `503` to end users).
- **Connection pool churn:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on connection-pool create/close counters to verify the pool ejects reset connections instead of reusing them.
- **Retry budget:** Use a Prometheus probe on the client's retry counter to confirm retries fire and back off correctly.

---

## Verify the fault execution effect

While the experiment is running, confirm the proxy resets connections:

1. **Make a request from a client and observe the error.**

   ```bash
   kubectl run -n <namespace> tester --image=curlimages/curl --rm -it -- \
     curl -v http://<target-pod-ip>:<TARGET_SERVICE_PORT>/<known-path>
   ```

   `curl` reports `curl: (56) Recv failure: Connection reset by peer` (or similar) on resets.

2. **Capture packets to confirm the RST.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     tcpdump -i any -nn "host <target-pod-ip> and port <TARGET_SERVICE_PORT>"
   ```

   You should see `R` flag (RST) packets from the proxy back to the client during the fault window on the percentage of requests selected by `TOXICITY`.

---

## Recovery and cleanup

- **End of duration:** The proxy is removed automatically and new TCP connections complete normally.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If automated cleanup did not complete, restart the target pod to reset its network state.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **HTTPS without supplied certificates:** This fault does not terminate TLS. If the target serves HTTPS and you need the proxy to read the request before deciding to reset, use [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block) (which supports TLS certificates and offers richer filtering).
- **TCP-only RST:** This fault resets the TCP connection. To return an HTTP error response instead (such as `502`), use [Pod HTTP status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-status-code).
- **Port already bound:** If `PROXY_PORT` collides with a port the target container is already using, the fault fails to start. Pick a port number outside the application's range.

---

## Troubleshooting

<Troubleshoot
  issue="Pod HTTP reset peer experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations to the experiment or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No connection resets observed during pod-http-reset-peer"
  mode="docs"
  fallback="The most common causes are: TARGET_SERVICE_PORT does not match the port the application actually listens on (verify with kubectl exec <pod> -- ss -tlnp); the traffic is HTTPS and the chaos proxy is not handling TLS (use Pod API block instead); or TOXICITY is set too low so only a small fraction of requests are reset. Re-run with TOXICITY=100 and confirm the application is reachable on the configured port."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-http-reset-peer in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

<Troubleshoot
  issue="Connections continue to reset after pod-http-reset-peer ends"
  mode="docs"
  fallback="Automated cleanup did not complete. Restart the target pod to reset its network state. If the issue recurs, capture the chaos pod logs from the experiment namespace before the next run and share them with Harness support."
/>

---

## Related faults

- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Slow HTTP responses instead of resetting connections.
- [Pod HTTP modify body](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-body): Overwrite the HTTP response body.
- [Pod HTTP modify header](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-modify-header): Modify or remove HTTP headers.
- [Pod HTTP status code](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-status-code): Return a different HTTP status code instead of resetting the connection.
- [Pod API block](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-api-block): Block requests with richer filters and TLS support.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
