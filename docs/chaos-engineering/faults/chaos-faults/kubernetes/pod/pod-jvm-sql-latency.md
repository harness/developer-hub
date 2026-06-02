---
id: pod-jvm-sql-latency
title: Pod JVM SQL latency
sidebar_label: Pod JVM SQL Latency
description: Add a configurable delay to JDBC calls from a JVM running in a target Kubernetes pod, scoped by table and SQL operation, so you can test timeout and back-pressure behavior under a slow database.
keywords:
  - chaos engineering
  - pod jvm sql latency
  - jdbc chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM SQL latency is a Kubernetes pod-level chaos fault that adds a configurable delay to JDBC calls from a JVM running in a target container, scoped to a chosen table and SQL operation, for a configurable duration. Only matched calls are slowed; unrelated queries and other code paths run at normal speed. When the fault ends, JDBC calls return to baseline latency immediately.

Use this fault to test how a Java service behaves when the database becomes slow on a specific code path: a heavy join, a write that contends on row locks, or a read replica falling behind.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Driver timeout sensitivity:** When a `SELECT` takes 2 seconds instead of 20 ms, does the application surface the slow query or block worker threads?
- **Connection-pool saturation:** Does the application's connection pool back-pressure correctly or starve under slow queries?
- **Write-path back-pressure:** Slow `INSERT` or `UPDATE` and see whether the application throttles producers or queues writes in memory.
- **Reporting tail latency:** Slow `SELECT` only on reporting tables and verify whether the reporting paths cope.
- **Circuit breaker behavior:** Does a circuit breaker around the slow operation trip and recover correctly when the fault ends?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The Java application pod is in the `Running` state.
- **Java agent attach available:** The Java process allows agent attach. Utilities such as `ps`, `pgrep`, and `bash` are present in the container, and the JVM is not built with a restricted runtime that strips attach modules.
- **JDBC driver in classpath:** The target JVM uses a supported JDBC driver matching `SQL_DATA_ACCESS_FRAMEWORK`.
- **Privileged pods allowed:** The cluster lets you schedule privileged pods in the chaos namespace. GKE Autopilot supports this fault but requires the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot); other locked-down distributions may need similar exemptions.
- **Container runtime access:** The chaos pod can reach the container runtime socket on the target node (`/run/containerd/containerd.sock`, `/var/run/docker.sock`, or `/var/run/crio/crio.sock`).
- **Workload selector defined:** The chaos experiment knows the target workload by kind, namespace, and either names or labels.

:::info JVM chaos uses the Byteman agent
This fault attaches a [Byteman](https://byteman.jboss.org/) agent to the target JVM over `BYTEMAN_PORT`. The port must be reachable from the chaos pod and must not be in use by the application.
:::

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

Configure the following fault parameters when you add Pod JVM SQL latency to an experiment in Chaos Studio. Defaults are shown for reference.

**SQL filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TABLE` | Target database table name. Empty matches all tables. | `""` |
| `SQL_OPERATION` | SQL operation to target. Common values: `SELECT`, `INSERT`, `UPDATE`, `DELETE`. Empty matches all operations. | `""` |
| `SQL_DATA_ACCESS_FRAMEWORK` | JDBC driver framework identifier. For example `MYSQL8`. | `"MYSQL8"` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched SQL statements to delay, between `0` and `100`. `0` delays none; `100` delays every match. | `0` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each matched statement, in milliseconds. | `2000` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |

**JVM**

| Tunable | Description | Default |
| --- | --- | --- |
| `BYTEMAN_PORT` | Port on which the Byteman agent listens inside the container. Must not conflict with any port already in use. | `9091` |
| `JAVA_HOME` | Absolute path to the Java installation inside the container. Empty auto-detects from `PATH`. | `""` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_PODS` | Comma-separated list of pod names to target. Empty selects from the workload's pods using `POD_AFFECTED_PERCENTAGE`. | `""` |
| `TARGET_CONTAINER` | Container in the pod running the JVM. Empty targets the first container in the pod spec. | `""` |
| `NODE_LABEL` | Label selector to filter target pods by the node they run on. Empty disables node-based filtering. | `""` |
| `POD_AFFECTED_PERCENTAGE` | Percentage of the workload's pods to target. `0` means one pod. | `0` |
| `SEQUENCE` | When multiple pods are targeted, inject `parallel` (all at once) or `serial` (one after another). | `parallel` |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `CONTAINER_RUNTIME` | Container runtime on the target nodes. One of `containerd`, `docker`, `crio`. | `containerd` |
| `SOCKET_PATH` | Path to the container runtime socket on the target node. Set to match `CONTAINER_RUNTIME`. | `/run/containerd/containerd.sock` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Common pod selection tunables (`TARGET_WORKLOAD_KIND`, `TARGET_WORKLOAD_NAMESPACE`, `TARGET_WORKLOAD_NAMES`, `TARGET_WORKLOAD_LABELS`) are documented in [common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults). Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Match operation to scenario
For read-heavy workloads, target `SELECT`. For ingest paths, target `INSERT` and `UPDATE`. Scoping the slow operation matches a production failure mode and keeps the blast radius small.
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

Attaches a Java agent to the target JVM and intercepts JDBC statements matching `TABLE` and `SQL_OPERATION` for the configured `SQL_DATA_ACCESS_FRAMEWORK` to add `LATENCY` milliseconds to each matched call on the configured percentage, for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Matched SQL statements take longer by approximately `LATENCY` ms. Other statements and unrelated tables run normally.
- Caller-side metrics (request latency, queue depth, connection-pool waiters) rise to reflect the added delay.
- Clients with statement timeouts shorter than `LATENCY` cancel the call and may retry.
- Thread-pool-bound applications saturate quickly if many concurrent callers wait on the slow operation.
- Tracing systems show the matched JDBC span growing by `LATENCY` ms.

:::info When the fault ends
JDBC calls return to baseline latency immediately. Calls in flight finish at the delayed time and then the system returns to normal.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Driver-level latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `jdbc.connections` duration or your APM's SQL latency metric.
- **Caller timeouts:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that read or write to the targeted table.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady`.

---

## Verify the fault execution effect

While the experiment is running, confirm operations are slower:

1. **Time a request that exercises the matched operation.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s http://<service>:<port>/<endpoint>
   ```

2. **Confirm in tracing.**

   The JDBC span for the matched operation should be approximately `LATENCY` ms longer than its baseline.

---

## Recovery and cleanup

- **End of duration:** JDBC calls return to baseline latency automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck threads:** If the application is wedged because of saturated thread or connection pools, restart the pod.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM and non-JDBC workloads:** This fault targets JDBC drivers inside a JVM.
- **ORM caching:** ORMs that cache results may continue to serve queries from cache, bypassing the slowdown on those calls.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM SQL latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No latency observed during pod-jvm-sql-latency"
  mode="docs"
  fallback="The most common causes are: TABLE does not match the table name used by the application; SQL_OPERATION does not match the executed verb; SQL_DATA_ACCESS_FRAMEWORK does not match the driver in classpath; or TRANSACTION_PERCENTAGE is 0 (default). Re-run with TRANSACTION_PERCENTAGE=100 and empty filters to confirm the path is working."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-sql-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM SQL exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-sql-exception): Throw an exception from SQL statements instead of slowing them.
- [Pod JVM Mongo latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-mongo-latency): MongoDB equivalent for the MongoDB Java driver.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Generic Java method-level latency injection.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
