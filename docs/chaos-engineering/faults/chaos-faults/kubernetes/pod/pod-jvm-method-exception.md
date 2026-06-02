---
id: pod-jvm-method-exception
title: Pod JVM method exception
sidebar_label: Pod JVM Method Exception
description: Cause a specific Java method in a JVM running in a target Kubernetes pod to throw a configurable exception so you can test how callers handle the failure.
keywords:
  - chaos engineering
  - pod jvm method exception
  - java chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/spring-boot/spring-boot-exceptions
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM method exception is a Kubernetes pod-level chaos fault that causes a specific Java method in a JVM running in a target container to throw a configurable exception on every invocation for a configurable duration. Only the named method is affected; all other code paths run normally. When the fault ends, the method returns to its normal behavior immediately.

Use this fault to test how callers and dependents react when a specific method starts throwing: a database wrapper that raises a connection error, a third-party SDK call that fails, or a business-logic method that hits an invariant.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Caller exception handling:** Does the calling code catch the exception, propagate it, or crash the thread?
- **Retry semantics:** Does the caller honor a retry budget, or do retries amplify load on the rest of the system?
- **Circuit breaker tripping:** Does a circuit breaker around the failing method open after the configured failure threshold and short-circuit subsequent calls?
- **Trace and log coverage:** Does the failure surface in tracing and logs with enough context to be diagnosable in production?
- **Compensating transactions:** For multi-step business operations, do rollback paths complete cleanly when one step fails?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The Java application pod is in the `Running` state.
- **Java agent attach available:** The Java process allows agent attach. Utilities such as `ps`, `pgrep`, and `bash` are present in the container, and the JVM is not built with a restricted runtime that strips attach modules.
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

Configure the following fault parameters when you add Pod JVM method exception to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLASS` | Fully qualified class name containing the target method (for example `com.example.payments.PaymentService`). | (required) |
| `METHOD` | Name of the method to throw the exception from. | (required) |
| `EXCEPTION` | Fully qualified exception class to throw (for example `java.lang.IllegalStateException`). | (required) |

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

:::tip Pick the right exception type
Choose an exception that the caller can plausibly receive in production (for example `java.sql.SQLException` for a database wrapper, `java.io.IOException` for a network helper). Picking an unrelated exception type often surfaces uncaught-exception bugs that would not happen in real failures.
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

Attaches a Java agent to the target JVM and instruments `CLASS.METHOD` so that each invocation throws an instance of `EXCEPTION` for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Every call to the named method raises the configured exception. Other methods run normally.
- Direct callers surface the failure as caught exceptions, error responses, or queued retries depending on the framework.
- Tracing systems show the method span ending in error; downstream calls that depended on the method's return value do not happen for failed invocations.
- Error dashboards see a spike in the configured exception type.

:::info When the fault ends
The method returns to its normal behavior immediately. Cached state (open circuits, exhausted retry budgets) in callers may take additional time to reset.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Method-level error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the method's error counter to confirm the injection took effect.
- **Caller error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that exercise the method to detect 5xx spikes.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to grep container logs for the injected exception's class name.

---

## Verify the fault execution effect

While the experiment is running, confirm the method is throwing:

1. **Exercise the method from a client.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -s http://<service>:<port>/<endpoint-that-calls-the-method>
   ```

   The response should reflect the failure.

2. **Confirm the exception in logs.**

   ```bash
   kubectl logs -n <namespace> <target-pod> --tail=200 | grep <EXCEPTION>
   ```

   The configured exception class should appear in stack traces.

---

## Recovery and cleanup

- **End of duration:** The method returns to its normal behavior automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck state:** If a downstream circuit breaker stays open or a retry budget is exhausted, follow the application's recovery procedure or restart the pod.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM processes:** This fault targets a Java process.
- **Inlined or intrinsified methods:** Methods that the JIT compiler has inlined may not be interceptable; consider running with `-XX:-Inline` for verification.
- **Method overloads:** Only the method name is matched. If multiple overloads share a name, all are affected for the duration.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM method exception experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No exception observed during pod-jvm-method-exception"
  mode="docs"
  fallback="The most common causes are: CLASS or METHOD does not match (verify the fully qualified class name and case-sensitive method name); the method is JIT-inlined and not interceptable; the wrong container is targeted (set TARGET_CONTAINER explicitly); or JAVA_HOME is not detectable. Re-run with EXCEPTION set to a common type like java.lang.IllegalStateException to confirm the path is working."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-method-exception in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Add latency to a Java method instead of throwing.
- [Pod JVM modify return](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-modify-return): Modify the return value of a Java method.
- [Pod application function error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-application-function-error): Language-agnostic function-level error for instrumented applications.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
