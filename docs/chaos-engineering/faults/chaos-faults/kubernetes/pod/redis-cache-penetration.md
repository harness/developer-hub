---
id: redis-cache-penetration
title: Redis cache penetration
sidebar_label: Redis Cache Penetration
description: Generate a configurable burst of cache-miss requests against a target Redis instance so you can test how the application and its downstream database behave when the cache is bypassed.
keywords:
  - chaos engineering
  - redis cache penetration
  - cache miss storm
  - cache chaos
  - redis fault
tags:
  - chaos-engineering
  - pod-faults
  - cache-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import AuthenticationDetails from './shared/redis-auth.md'

Redis cache penetration is a Kubernetes pod-level chaos fault that issues a configurable number of cache-miss reads (requests for keys that do not exist) against a target Redis server for a configurable duration. The fault simulates a cache-penetration attack or runaway client behavior, where every request bypasses the cache and pushes load onto the downstream source of truth. When the fault ends, the chaos pod stops issuing requests and traffic returns to normal.

Use this fault to test how a service behaves when a workload starts asking for non-existent keys: client retries that hammer the database, missing null-cache protection, or a flood that exhausts connection pools downstream.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Null-cache protection:** Does the application cache misses (negative caching) to prevent repeated database hits, or does every miss reach the database?
- **Rate-limit and quota coverage:** Do rate limits at the application or gateway layer catch the surge before it reaches the database?
- **Bloom-filter / pre-check guards:** If a Bloom filter or existence check fronts Redis, does it correctly stop most penetration attempts?
- **Downstream connection pool:** Does the database connection pool size up gracefully, or do connections starve?
- **Logging and detection:** Do dashboards and alerts surface the miss-rate spike fast enough to drive manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Redis reachable:** The chaos pod can resolve and connect to `ADDRESS`.
- **Credentials available (if needed):** If Redis requires authentication or TLS, a Kubernetes secret is mounted at `SECRET_FILE_PATH` (see Redis authentication below).
- **No privileged access required:** The fault connects to Redis over the network and does not require container runtime sockets or privileged pods.

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
| GKE Autopilot | Supported (no privileged access required) |
| EKS Fargate, ACI virtual nodes | Supported (no container runtime socket required) |

---

## Permissions required

The fault runs under the chaos infrastructure's service account.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Run the chaos pod that connects to Redis |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |
| `secrets` (`""`) | `get`, `list` | Mount the Redis credentials secret (only if `SECRET_FILE_PATH` is used) |

The default Harness chaos infrastructure service account already includes these permissions.

---

<AuthenticationDetails />

---

## Fault tunables

Configure the following fault parameters when you add Redis cache penetration to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `ADDRESS` | Redis server address as `host:port` (for example `redis.svc:6379`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REQUEST_COUNT` | Number of cache-miss requests to issue over the fault duration. | `1000` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `SECRET_FILE_PATH` | Path to the mounted Redis credentials file inside the chaos pod. Required only if Redis needs authentication or TLS. | `""` |
| `REDIS_PASSWORD` | Name of the Kubernetes secret that contains the Redis password. | `""` |
| `REDIS_TLS_FILE` | Name of the Kubernetes secret that contains the Redis TLS certificate. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

**Targeting**

For Redis cache faults, target selection refers to the Kubernetes workload that produces the test load against Redis. Use the common workload tunables (`TARGET_WORKLOAD_KIND`, `TARGET_WORKLOAD_NAMESPACE`, `TARGET_WORKLOAD_NAMES`, `TARGET_WORKLOAD_LABELS`) documented in [common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults).

:::tip Pair with a downstream watch
The interesting failures during cache penetration usually happen downstream of Redis, not in Redis itself. Watch database query rate, connection pool saturation, and application error rate while the fault runs.
:::

---

## Fault execution in brief

Connects to the Redis server at `ADDRESS` and issues `REQUEST_COUNT` reads against keys that do not exist, spread across `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Redis `GET` commands return `nil` for every requested key. Redis itself handles the load without significant CPU or memory impact.
- Applications that do not cache misses fall through to the source of truth for each request, multiplying database load.
- Caller-side metrics show a sharp drop in cache hit ratio and a corresponding spike in database query rate.
- Connection pools may saturate if the downstream database has fewer slots than concurrent miss handlers.

:::info When the fault ends
The chaos pod stops issuing requests. Traffic returns to whatever the application was generating before, and the downstream surge subsides.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Cache hit ratio:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `cache_hits_total / cache_requests_total` to confirm the miss spike.
- **Downstream database load:** Use a Prometheus probe on database query rate or connection count to detect saturation.
- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint backed by the cache to detect failures triggered by downstream saturation.

---

## Verify the fault execution effect

While the experiment is running, confirm the miss storm:

1. **Inspect Redis command rate.**

   ```bash
   kubectl run -n <namespace> tester --image=redis:alpine --rm -it -- \
     redis-cli -h <redis-host> -p <port> INFO stats | grep instantaneous_ops_per_sec
   ```

   Operations per second should rise during the fault.

2. **Compare cache miss ratio in metrics.**

   The cache hit ratio dashboard should drop sharply and downstream database query rate should rise.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Lingering load:** If downstream connection pools or queues built up during the fault, they typically drain within seconds. If the application has retried failed downstream calls onto an internal queue, allow time for the queue to flush.

---

## Limitations

- **No actual data modification:** This fault only issues reads against non-existent keys. It does not change Redis state.
- **Synthetic miss only:** Requests originate from the chaos pod, not from real application clients, so connection-pool effects upstream of Redis are not exercised.
- **Authentication or TLS errors block the fault:** If `SECRET_FILE_PATH` references the wrong file or the secret contents are malformed, the chaos pod fails fast.
- **Cluster mode:** Requests connect to one node; for Redis Cluster, the miss storm focuses on the connected node's keyspace.

---

## Troubleshooting

<Troubleshoot
  issue="Redis cache penetration experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. Common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a missing secrets mount when SECRET_FILE_PATH is set. Add the required tolerations or correct the secret mount path."
/>

<Troubleshoot
  issue="No miss spike observed during redis-cache-penetration"
  mode="docs"
  fallback="The most common causes are: ADDRESS points to the wrong host or port; REQUEST_COUNT is too small relative to TOTAL_CHAOS_DURATION to be measurable; or authentication is required and SECRET_FILE_PATH is not set. Re-run with a larger REQUEST_COUNT and verify the chaos pod logs show successful connections to Redis."
/>

<Troubleshoot
  issue="Authentication errors connecting to Redis during redis-cache-penetration"
  mode="docs"
  fallback="Verify the Kubernetes secret name in REDIS_PASSWORD or REDIS_TLS_FILE matches an existing secret in the experiment namespace, that SECRET_FILE_PATH points to the mounted file, and that the file contents include the correct address, password, and (if needed) TLS certificate. Test the same credentials with redis-cli from a debug pod."
/>

---

## Related faults

- [Redis cache expire](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/redis-cache-expire): Expire selected keys to simulate a cold cache.
- [Redis cache limit](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/redis-cache-limit): Cap Redis memory to force evictions or write errors.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
