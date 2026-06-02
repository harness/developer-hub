---
id: pod-jvm-modify-return
title: Pod JVM modify return
sidebar_label: Pod JVM Modify Return
description: Override the return value of a specific Java method in a JVM running in a target Kubernetes pod so you can test how callers behave when a method silently returns wrong data.
keywords:
  - chaos engineering
  - pod jvm modify return
  - java chaos
  - jvm fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - jvm-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod JVM modify return is a Kubernetes pod-level chaos fault that overrides the return value of a specific Java method in a JVM running in a target container for a configurable duration. The method runs as usual but returns the configured value instead of its real result. When the fault ends, the method returns its real result again immediately.

Use this fault to test how callers handle silently wrong data: a feature flag that always returns true, an authorization check that always returns false, a price lookup that returns a stale value, or a serialization helper that returns null.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Null-safety coverage:** When the method returns `null` instead of an object, does the caller crash with `NullPointerException` or handle it gracefully?
- **Boolean-flag flipping:** Force a feature flag, permission check, or rate-limit decision to a specific value and verify downstream behavior.
- **Stale-data handling:** Return an outdated value and confirm whether caches, validation, or staleness checks catch it.
- **Type-coercion bugs:** Return an edge-case value (empty string, zero, `MAX_VALUE`) and look for unguarded parsing or arithmetic.
- **Defensive copying:** If the method returns a mutable collection, a forced empty or shared instance can expose bugs in callers that assume per-call uniqueness.

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

Configure the following fault parameters when you add Pod JVM modify return to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLASS` | Fully qualified class name containing the target method (for example `com.example.payments.PaymentService`). | (required) |
| `METHOD` | Name of the method whose return value to override. | (required) |
| `RETURN` | Value to return from the method. Must be compatible with the method's declared return type. Use `null` for nullable references, a quoted string for `String`, or a numeric literal for primitives. | (required) |

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

:::tip Match the declared return type
The `RETURN` value must be assignable to the method's declared return type. For boxed primitives, prefer the unboxed literal (for example `true` for `boolean`, `0` for `int`). For object types, `null` is always valid.
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

Attaches a Java agent to the target JVM and instruments `CLASS.METHOD` so that each invocation runs as usual but returns the value in `RETURN` to the caller, for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Every call to the named method returns the configured value. Side effects of the real method execution (writes, network calls, state mutations) still happen.
- Direct callers see the overridden value and may branch differently, throw `NullPointerException`, or pass the wrong value downstream.
- Tracing systems see the method span complete successfully; only the return value is unusual.
- Self-consistency invariants (`if (getX() == lookUpX()) ...`) may fail silently.

:::info When the fault ends
The method returns its real result again immediately.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Caller error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that consume the method's return value to detect downstream failures.
- **Method invariants:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application metrics that should be sensitive to the overridden value.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to grep for unexpected `NullPointerException` or coercion errors.

---

## Verify the fault execution effect

While the experiment is running, confirm the overridden return:

1. **Exercise the method from a client.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -s http://<service>:<port>/<endpoint-that-uses-the-return-value>
   ```

   The response should reflect the overridden value.

2. **Compare against baseline.**

   Capture the same endpoint's response before the fault starts and after it ends; only the fault window should show the overridden behavior.

---

## Recovery and cleanup

- **End of duration:** The method returns its real result again automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Cached overridden value:** If the caller cached the overridden return, the application may keep using the wrong value until the cache refreshes; clear the cache or restart the pod if needed.

---

## Limitations

- **Serverless Kubernetes (EKS Fargate, ACI virtual nodes):** These platforms do not expose container runtime sockets and reject the privileged access the fault needs. GKE Autopilot is supported once the one-time setup in [Chaos on GKE Autopilot](/docs/resilience-testing/chaos-testing/gke-autopilot) is in place.
- **Windows containers:** This fault is supported on Linux pods only.
- **Non-JVM processes:** This fault targets a Java process.
- **Inlined methods:** Methods inlined by the JIT compiler may not be interceptable.
- **Method overloads:** Only the method name is matched. If multiple overloads with different return types share a name, only those whose return type is compatible with `RETURN` work as expected.

---

## Troubleshooting

<Troubleshoot
  issue="Pod JVM modify return experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy blocking privileged pods. Add the required tolerations or run in a namespace with privileged Pod Security level."
/>

<Troubleshoot
  issue="Return value not overridden during pod-jvm-modify-return"
  mode="docs"
  fallback="The most common causes are: CLASS or METHOD does not match; RETURN is not assignable to the method's declared return type; the method is JIT-inlined; or the wrong container is targeted. Re-run with a simple known-compatible RETURN such as null (for objects) or 0 (for ints) to confirm the path is working."
/>

<Troubleshoot
  issue="Connection to container runtime fails for pod-jvm-modify-return in Harness Chaos Engineering"
  mode="docs"
  fallback="The default SOCKET_PATH is /run/containerd/containerd.sock. For Docker, set CONTAINER_RUNTIME=docker and SOCKET_PATH=/var/run/docker.sock. For CRI-O, set CONTAINER_RUNTIME=crio and SOCKET_PATH=/var/run/crio/crio.sock."
/>

---

## Related faults

- [Pod JVM method exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-exception): Throw an exception from the method instead of overriding the return.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): Add latency to a method invocation.
- [Pod application function error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-application-function-error): Language-agnostic function-level error for instrumented applications.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
