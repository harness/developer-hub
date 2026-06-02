---
id: redis-cache-limit
title: Redis cache limit
sidebar_label: Redis Cache Limit
description: Cap the maximum memory of a target Redis instance to force evictions and write errors so you can test how the application behaves when Redis runs out of memory.
keywords:
  - chaos engineering
  - redis cache limit
  - redis memory pressure
  - cache chaos
  - redis fault
tags:
  - chaos-engineering
  - pod-faults
  - cache-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import AuthenticationDetails from './shared/redis-auth.md'

Redis cache limit is a Kubernetes pod-level chaos fault that temporarily caps the `maxmemory` setting on a target Redis server for a configurable duration. Depending on the configured eviction policy, Redis evicts existing keys or rejects new writes once the cap is exceeded. When the fault ends, the original `maxmemory` is restored.

Use this fault to test how a service behaves when its Redis instance is starved for memory: evictions of hot keys, write errors from `SET`, and degraded throughput as the cache stops serving traffic that it used to.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Eviction policy validation:** Does the configured eviction policy (`allkeys-lru`, `volatile-lru`, `noeviction`, and so on) match the application's expectations under pressure?
- **Write-error handling:** With `noeviction`, `SET` fails. Does the application retry, queue, or surface the error?
- **Hot-key behavior:** When LRU evicts keys, does the application notice the missing keys quickly enough to refill, or does p99 degrade?
- **Capacity planning:** Confirm that the chosen `maxmemory` headroom matches realistic burst behavior.
- **Multi-tenant isolation:** If multiple workloads share the Redis instance, does memory pressure on one tenant affect others as expected?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Redis reachable:** The chaos pod can resolve and connect to `ADDRESS`.
- **`CONFIG SET` allowed:** The Redis credentials used by the fault have permission to run `CONFIG SET maxmemory`. Many managed Redis offerings disable `CONFIG`; check first.
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

Configure the following fault parameters when you add Redis cache limit to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `ADDRESS` | Redis server address as `host:port` (for example `redis.svc:6379`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MAX_MEMORY` | Memory cap to apply to Redis during the fault. Accepts byte units (`100mb`, `1gb`) or a percentage of currently-used memory (`50%`). | `"50%"` |
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

:::tip Confirm the eviction policy
Behavior under `MAX_MEMORY` depends entirely on Redis's `maxmemory-policy`. Check the running policy with `CONFIG GET maxmemory-policy` before running the fault so you can predict whether keys evict (LRU/LFU) or writes start failing (`noeviction`).
:::

---

## Fault execution in brief

Connects to the Redis server at `ADDRESS`, lowers `maxmemory` to the configured `MAX_MEMORY` for `TOTAL_CHAOS_DURATION` seconds, and restores the original `maxmemory` setting when the fault ends.

---

## Expected behavior during fault execution

- Once Redis crosses the new `maxmemory`, it acts according to its `maxmemory-policy`: eviction (LRU/LFU/random) or write rejection (`noeviction`).
- Applications see either elevated cache miss rates (with eviction) or `OOM command not allowed when used memory > 'maxmemory'` errors on writes (with `noeviction`).
- Reads against still-present keys succeed normally.
- Replicas mirror evictions.

:::info When the fault ends
The original `maxmemory` is restored. Redis stops evicting and writes succeed again; previously evicted keys remain gone until refilled.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Eviction rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `redis_evicted_keys_total`.
- **Used memory:** Use a Prometheus probe on `redis_memory_used_bytes` to confirm Redis tracks toward the cap.
- **Write error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against a write-heavy endpoint to detect failures.

---

## Verify the fault execution effect

While the experiment is running, confirm the cap is applied:

1. **Check `maxmemory` from redis-cli.**

   ```bash
   kubectl run -n <namespace> tester --image=redis:alpine --rm -it -- \
     redis-cli -h <redis-host> -p <port> CONFIG GET maxmemory
   ```

   The reply should show the lowered value during the fault.

2. **Inspect evictions or write errors.**

   ```bash
   kubectl run -n <namespace> tester --image=redis:alpine --rm -it -- \
     redis-cli -h <redis-host> -p <port> INFO stats | grep evicted_keys
   ```

   `evicted_keys` should rise (with eviction policies), or writes should start failing with `OOM` (with `noeviction`).

---

## Recovery and cleanup

- **End of duration:** The original `maxmemory` is restored automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Failed cleanup:** If the original value was not restored, run `CONFIG SET maxmemory <original>` manually. Capture chaos pod logs and share with Harness support.

---

## Limitations

- **Managed Redis:** Many managed Redis offerings disable `CONFIG SET`. Confirm with your provider before running this fault.
- **Cluster mode:** `CONFIG SET maxmemory` applies per node. For Redis Cluster, run the fault against each node or accept that only one node will be constrained.
- **`noeviction` policy:** With `noeviction`, writes fail with explicit OOM errors rather than silently evicting; expect application-visible errors.
- **Authentication or TLS errors block the fault:** If `SECRET_FILE_PATH` references the wrong file or the secret contents are malformed, the chaos pod fails fast.

---

## Troubleshooting

<Troubleshoot
  issue="Redis cache limit experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. Common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a missing secrets mount when SECRET_FILE_PATH is set. Add the required tolerations or correct the secret mount path."
/>

<Troubleshoot
  issue="CONFIG SET fails during redis-cache-limit"
  mode="docs"
  fallback="The Redis user does not have permission to change CONFIG, or the Redis offering disables CONFIG SET entirely (common on managed Redis). Run CONFIG SET maxmemory <value> manually with the same credentials to confirm; switch to a Redis instance that allows runtime configuration if needed."
/>

<Troubleshoot
  issue="No evictions observed during redis-cache-limit"
  mode="docs"
  fallback="The most common causes are: maxmemory-policy is noeviction (writes will fail instead of evictions); MAX_MEMORY is higher than current used_memory so the cap is not actually constrained; or the application has stopped writing during the test. Confirm with INFO stats and CONFIG GET maxmemory-policy."
/>

<Troubleshoot
  issue="Authentication errors connecting to Redis during redis-cache-limit"
  mode="docs"
  fallback="Verify the Kubernetes secret name in REDIS_PASSWORD or REDIS_TLS_FILE matches an existing secret in the experiment namespace, that SECRET_FILE_PATH points to the mounted file, and that the file contents include the correct address, password, and (if needed) TLS certificate. Test the same credentials with redis-cli from a debug pod."
/>

---

## Related faults

- [Redis cache expire](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/redis-cache-expire): Expire selected keys to simulate a cold cache.
- [Redis cache penetration](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/redis-cache-penetration): Generate cache-miss queries that bypass the cache.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
