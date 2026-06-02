---
id: pod-jvm-method-latency
title: Pod JVM method latency
sidebar_label: Pod JVM Method Latency
description: Add a configurable delay to every invocation of a specific Java method in a JVM running in a target Kubernetes pod so you can test how callers and dependents behave under slow methods.
keywords:
  - chaos engineering
  - pod jvm method latency
  - java chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/spring-boot/spring-boot-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM method latency is a Kubernetes pod-level chaos fault that adds a configurable delay to every invocation of a specific Java method in a JVM running in a target container for a configurable duration. Only the named method is slowed; all other code paths run at normal speed. When the fault ends, the method returns to its normal latency immediately.

Use this fault to test how callers and dependents behave when a specific method becomes slow: a database wrapper hitting a slow query, a third-party SDK on a degraded link, or a business-logic method blocked on a slow lock.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Timeout-budget validation:** When the method takes 2 seconds instead of 20 ms, do callers honor their timeouts or hang?
- **Thread-pool saturation:** Does slow method invocation block worker threads enough to stall the application?
- **Tail-latency budget:** Does the added method latency push end-to-end p99 over your SLO?
- **Caller fallback paths:** If the method represents a non-critical call, does the application skip it and continue, or block on the slow path?
- **Bulk-operation impact:** For methods called in batch loops, does the cumulative delay produce timeouts or out-of-memory pressure as queues grow?

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

Configure the following fault parameters when you add Pod JVM method latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLASS` | Fully qualified class name containing the target method (for example `com.example.payments.PaymentService`). | (required) |
| `METHOD` | Name of the method to add latency to. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each invocation of the target method, in milliseconds. | `2000` |
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

:::tip Start near the caller's timeout
Set `LATENCY` slightly below the caller's configured timeout to validate that timeout handling is correct, then increase it above the timeout to confirm the caller cancels the call cleanly.
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

Attaches a Java agent to the target JVM and instruments `CLASS.METHOD` so that each invocation blocks for `LATENCY` milliseconds before returning, for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Every call to the named method takes longer by approximately `LATENCY` ms. Other methods run normally.
- Caller-side metrics (request latency, queue depth, in-flight requests) rise to reflect the added delay.
- Clients with timeouts shorter than `LATENCY` cancel the call and may retry.
- Thread-pool-bound applications saturate quickly if many concurrent callers wait on the slow method.
- Tracing systems show the method span growing by `LATENCY`; downstream spans are unchanged.

:::info When the fault ends
The method returns to its normal latency immediately. Calls already in flight finish at the delayed time and then the system returns to baseline.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Method-level latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the method's p99 duration to confirm the rise matches `LATENCY`.
- **Caller timeouts:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that exercise the method to detect rising timeouts.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady`.

---

## Verify the fault execution effect

While the experiment is running, confirm the method is slower:

1. **Time a request that calls the method.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s http://<service>:<port>/<endpoint-that-calls-the-method>
   ```

   `time_total` should rise by approximately `LATENCY` ms.

2. **Confirm method span in tracing.**

   In your APM, the configured method span should be roughly `LATENCY` ms longer than its baseline.

---

## Recovery and cleanup

- **End of duration:** The method returns to its normal latency automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck threads:** If the application is wedged because of saturated thread pools, restart the pod.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM processes:** This fault targets a Java process.
- **Inlined methods:** Methods inlined by the JIT compiler may not be interceptable; run with `-XX:-Inline` for verification if needed.
- **Method overloads:** Only the method name is matched. All overloads with the same name are affected.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM method latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="No latency observed during pod-jvm-method-latency"
  mode="docs"
  fallback="The most common causes are: CLASS or METHOD does not match (verify the fully qualified class name and case-sensitive method name); the method is JIT-inlined; the wrong container is targeted (set TARGET_CONTAINER explicitly); or JAVA_HOME is not detectable. Re-run with a larger LATENCY value and time a known client call to confirm."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-method-latency in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM method exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-exception): Make the method throw instead of slowing it.
- [Pod JVM modify return](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-modify-return): Modify the return value of a Java method.
- [Pod application function latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-application-function-latency): Language-agnostic function-level latency for instrumented applications.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
