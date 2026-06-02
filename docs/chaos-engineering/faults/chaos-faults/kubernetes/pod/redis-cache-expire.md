---
id: redis-cache-expire
title: Redis cache expire
sidebar_label: Redis Cache Expire
description: Expire one or more keys (or all keys) in a target Redis instance for a configurable duration so you can test how the application behaves when its cache is suddenly evicted.
keywords:
  - chaos engineering
  - redis cache expire
  - cache chaos
  - redis fault
tags:
  - chaos-engineering
  - pod-faults
  - cache-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import AuthenticationDetails from './shared/redis-auth.md'

Redis cache expire is a Kubernetes pod-level chaos fault that expires a configurable set of keys (or all keys) on a target Redis server for a configurable duration. Only the chosen keys are affected; unrelated keys and other Redis databases keep serving normal traffic. When the fault ends, the chaos pod stops issuing expirations; keys that were not re-set by the application stay gone.

Use this fault to test how a service behaves when its cache is suddenly cold: read latency rises, downstream databases see a query burst, and stampede protection (if present) decides whether the system survives the burst.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Cold-cache resilience:** When a hot key disappears, does the application refill from the source of truth or fail closed?
- **Cache-stampede protection:** Do single-flight, request coalescing, or probabilistic refresh patterns hold up when many callers race to refill the same key?
- **Database back-pressure:** Does the downstream database survive the surge of refill queries, or do connections saturate?
- **TTL-driven invalidation:** For applications that intentionally use short TTLs, confirm the refill path is fast enough to keep p99 acceptable.
- **Critical-key blast radius:** Expire only an `EXPIRY_OPTION`-controlled subset to validate behavior for important keys without touching the whole cache.

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

Configure the following fault parameters when you add Redis cache expire to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `ADDRESS` | Redis server address as `host:port` (for example `redis.svc:6379`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `KEYS` | Comma-separated list of Redis keys to expire. Empty pairs with `EXPIRY_OPTION` to expire a broader set. | `""` |
| `EXPIRY_OPTION` | How to choose keys when `KEYS` is empty. Common values: `all` (every key in the database) or a pattern matching a key namespace. | `""` |
| `EXPIRATION` | Expiration time string (for example `0` for immediate, `60s` for delayed expiry). | `""` |
| `DATABASE` | Redis database index. | `0` |
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

:::warning Scope key expiry carefully
Setting `EXPIRY_OPTION=all` expires every key in the chosen database. Verify the database index and run this against a recoverable environment before using it in shared infrastructure.
:::

---

## Fault execution in brief

Connects to the Redis server at `ADDRESS` and issues expire commands for keys matching `KEYS` or `EXPIRY_OPTION` on database `DATABASE`, repeating across `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Calls to `GET` on expired keys return `nil`. Applications that treat `nil` as a cache miss fall through to the source of truth.
- Downstream databases see a surge in queries as the application refills the cache; if rate-limited or under-provisioned, those queries can saturate.
- Application p99 latency rises until the cache warms back up.
- Logs typically show an increase in `cache miss` events.

:::info When the fault ends
The chaos pod stops issuing expirations. Any keys that were refilled by the application stay; keys that were not refilled remain expired.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Cache hit ratio:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `cache_hits_total / cache_requests_total`.
- **Downstream database load:** Use a Prometheus probe on database query rate or connection count to detect stampede.
- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a cache-backed endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm keys are missing:

1. **Check a known key with redis-cli.**

   ```bash
   kubectl run -n <namespace> tester --image=redis:alpine --rm -it -- \
     redis-cli -h <redis-host> -p <port> -n <DATABASE> GET <known-key>
   ```

   The reply should be `(nil)` while the fault runs.

2. **Confirm cache miss rate in metrics.**

   The cache hit ratio should drop sharply and downstream database query rate should rise.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Refill state:** Keys are refilled organically as the application receives requests. For pre-warming, run a known refill workload after the experiment ends.

---

## Limitations

- **Cluster mode:** Some `EXPIRY_OPTION=all` semantics rely on a single-node view. For Redis Cluster, expirations apply to keys reachable from the connected node only.
- **AOF/RDB persistence:** Expired keys are not undone by AOF/RDB; they are simply expired entries. Plan recovery if your application depends on keys outliving the fault.
- **Read replicas:** Expirations propagate to replicas; replica reads also miss until refill.
- **Authentication or TLS errors block the fault:** If `SECRET_FILE_PATH` references the wrong file or the secret contents are malformed, the chaos pod fails fast.

---

## Troubleshooting

<Troubleshoot
  issue="Redis cache expire experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. Common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a missing secrets mount when SECRET_FILE_PATH is set. Add the required tolerations or correct the secret mount path."
/>

<Troubleshoot
  issue="No expiration observed during redis-cache-expire"
  mode="docs"
  fallback="The most common causes are: ADDRESS points to the wrong host or port; DATABASE index does not contain the expected keys; KEYS lists names the application does not use; EXPIRY_OPTION is empty and no explicit KEYS are given; or authentication is required and SECRET_FILE_PATH is not set. Re-run with EXPIRY_OPTION=all on a test database to confirm the path is working, then narrow the scope."
/>

<Troubleshoot
  issue="Authentication errors connecting to Redis during redis-cache-expire"
  mode="docs"
  fallback="Verify the Kubernetes secret name in REDIS_PASSWORD or REDIS_TLS_FILE matches an existing secret in the experiment namespace, that SECRET_FILE_PATH points to the mounted file, and that the file contents include the correct address, password, and (if needed) TLS certificate. Test the same credentials with redis-cli from a debug pod."
/>

---

## Related faults

- [Redis cache limit](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/redis-cache-limit): Cap Redis memory to a configurable limit to force evictions.
- [Redis cache penetration](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/redis-cache-penetration): Generate cache-miss queries that bypass the cache.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
