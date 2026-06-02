---
id: pod-jvm-mongo-exception
title: Pod JVM Mongo exception
sidebar_label: Pod JVM Mongo Exception
description: Cause MongoDB operations from a JVM running in a target Kubernetes pod to throw a configurable exception on a chosen database, collection, and operation so you can test caller error handling.
keywords:
  - chaos engineering
  - pod jvm mongo exception
  - mongodb chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM Mongo exception is a Kubernetes pod-level chaos fault that causes MongoDB driver calls from a JVM running in a target container to throw a configurable exception on a chosen database, collection, and operation for a configurable duration. Only matched calls fail; unrelated MongoDB operations and other code paths run normally. When the fault ends, MongoDB calls behave normally again immediately.

Use this fault to test how a Java service handles MongoDB failures: a primary that becomes unreachable mid-write, a collection that returns errors on `find`, or a permission change that breaks specific operations.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Driver-level error handling:** When `MongoCollection.find()` throws, does the caller retry, return cached data, or fail closed?
- **Write-path resilience:** If `insert` or `update` raises an exception on a specific collection, does the application surface a clear error or silently lose the write?
- **Retry behavior:** Does the application honor MongoDB driver retry semantics, or do user-code retries amplify load?
- **Transaction rollback:** For multi-document transactions, does an exception inside the transaction trigger a clean rollback?
- **Mixed-operation scope:** Confirm that failing `find` on one collection does not unintentionally fail other collections or other operations on the same collection.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The Java application pod is in the `Running` state.
- **Java agent attach available:** The Java process allows agent attach. Utilities such as `ps`, `pgrep`, and `bash` are present in the container, and the JVM is not built with a restricted runtime that strips attach modules.
- **MongoDB Java driver in classpath:** The target JVM uses the MongoDB Java driver and exercises the configured `DATABASE`, `COLLECTION`, and `METHOD`.
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

Configure the following fault parameters when you add Pod JVM Mongo exception to an experiment in Chaos Studio. Defaults are shown for reference.

**MongoDB filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DATABASE` | Target MongoDB database name. Empty matches all databases. | `""` |
| `COLLECTION` | Target MongoDB collection name. Empty matches all collections in the database. | `""` |
| `METHOD` | MongoDB operation to target. Common values: `find`, `insert`, `update`, `delete`, `aggregate`. | `"find"` |
| `TRANSACTION_PERCENTAGE` | Percentage of matched MongoDB operations to fail, between `0` and `100`. `0` fails none; `100` fails every match. | `0` |

**Exception**

| Tunable | Description | Default |
| --- | --- | --- |
| `EXCEPTION_CLASS` | Exception class to throw. Defaults to a common runtime exception. | `"IllegalArgumentException"` |
| `EXCEPTION_MESSAGE` | Message attached to the thrown exception. | `"CHAOS BOOM!"` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
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

:::tip Use realistic exception types
Choose an exception the application's caller code can plausibly receive (for example `com.mongodb.MongoSocketException`). Picking an unrelated exception type often surfaces uncaught-exception bugs that would not happen in real failures.
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

Attaches a Java agent to the target JVM and intercepts MongoDB driver operations matching `DATABASE`, `COLLECTION`, and `METHOD` to throw an instance of `EXCEPTION_CLASS` with `EXCEPTION_MESSAGE` on the configured percentage of calls, for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Matched MongoDB operations throw the configured exception. Other operations and unrelated collections succeed normally.
- Application logs show stack traces from the configured exception class. Caller code paths surface the failure as application-level errors, retries, or fallbacks.
- The MongoDB driver itself is not stressed; from the cluster's perspective, no real operation was sent for the failed calls.
- Tracing systems show the driver span ending in error.

:::info When the fault ends
MongoDB calls behave normally again immediately. Cached state in callers (open circuits, exhausted retry budgets) may take additional time to reset.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that read or write to the targeted collection to detect 5xx spikes.
- **Driver-error metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `mongodb.driver.commands` or your APM's MongoDB error counter.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to grep container logs for the configured `EXCEPTION_MESSAGE`.

---

## Verify the fault execution effect

While the experiment is running, confirm operations are failing:

1. **Exercise the matched operation from a client.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -s http://<service>:<port>/<endpoint-that-uses-the-collection>
   ```

   The response should reflect the failure.

2. **Confirm the exception in logs.**

   ```bash
   kubectl logs -n <namespace> <target-pod> --tail=200 | grep "<EXCEPTION_MESSAGE>"
   ```

   The configured exception class and message should appear in stack traces.

---

## Recovery and cleanup

- **End of duration:** MongoDB calls behave normally again automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck state:** If a downstream circuit breaker stays open or a connection pool is exhausted, follow the application's recovery procedure or restart the pod.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM and non-Mongo workloads:** This fault targets the MongoDB Java driver inside a JVM.
- **Reactive drivers:** Reactive MongoDB driver variants may emit errors as `onError` signals rather than throws; behavior depends on the caller's subscription handling.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM Mongo exception experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No exception observed during pod-jvm-mongo-exception"
  mode="docs"
  fallback="The most common causes are: DATABASE or COLLECTION does not match the names used by the application; METHOD does not match the driver operation (use find, insert, update, delete, aggregate); TRANSACTION_PERCENTAGE is 0 (default) so no operations are intercepted; or the application uses a reactive driver path that does not throw. Re-run with TRANSACTION_PERCENTAGE=100 and an empty COLLECTION to broaden the match."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-mongo-exception in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM Mongo latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-mongo-latency): Add latency to MongoDB operations instead of failing them.
- [Pod JVM SQL exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-sql-exception): SQL equivalent for JDBC drivers.
- [Pod JVM method exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-exception): Generic Java method-level exception injection.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
