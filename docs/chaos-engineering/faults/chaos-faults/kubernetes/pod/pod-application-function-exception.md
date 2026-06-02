---
id: pod-application-function-exception
title: Pod application function exception
sidebar_label: Pod Application Function Exception
description: Throw a configurable exception from a specific function of an instrumented application running in a Kubernetes pod so you can test how callers and dependents handle the failure.
keywords:
  - chaos engineering
  - pod application function exception
  - application chaos
  - function-level fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - application-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-application-function-exception
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-application-function-exception
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-application-function-exception
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod application function exception is a Kubernetes pod-level chaos fault that causes a specific function in an instrumented application to throw a configurable exception for a configurable duration. Only the named function is affected; other application code paths run normally. When the fault ends, the function returns to its normal behavior immediately.

Use this fault to validate how callers and dependents behave when a specific business function starts throwing: an unchecked exception from a library wrapper, a domain-specific exception from a validation routine, or any failure path that propagates as a thrown exception rather than a returned error.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Unchecked exception propagation:** When a deep function throws, does the request boundary catch the exception, log it, and return a clean response, or does the stack trace leak to the client?
- **Exception-aware fallback paths:** Does a wrapper that catches a specific exception type route to a fallback implementation, or does it rethrow and break the caller?
- **Retry filter correctness:** Do retry policies treat the injected exception as retryable or non-retryable as intended, and does the policy match the framework's behavior?
- **Circuit breaker behavior:** Does a circuit breaker that counts exceptions open after the configured failure threshold and short-circuit subsequent calls?
- **Observability coverage:** Does the exception surface in traces, logs, and alerts with the right error type and message?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The application pod is in the `Running` state.
- **Application is instrumented:** The application registers a name and exposes the target function to the chaos infrastructure. Without instrumentation, the chaos pod cannot reach the function.
- **Function is identifiable:** The function to fail is reachable by the name set in `TARGET_APPLICATION_FUNCTION`.
- **Workload selector defined:** The chaos experiment knows the target application by name.

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
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Discover the target pod and run the chaos pod |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream chaos pod logs for status and debugging |
| `deployments`, `statefulsets`, `replicasets`, `daemonsets` (`apps`) | `get`, `list` | Resolve the target workload to the pods it owns |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions.

---

## Fault tunables

Configure the following fault parameters when you add Pod application function exception to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_APPLICATION_NAME` | Name of the target application as registered with the chaos infrastructure. | (required) |
| `TARGET_APPLICATION_FUNCTION` | Name of the function inside the target application to throw the exception from. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MESSAGE` | Exception message attached to the injected throw. Empty uses a default message. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Use a recognizable exception message
Set `MESSAGE` to a unique string so you can grep logs and traces to confirm the injected exception during analysis.
:::

---

## Fault execution in brief

Signals the instrumented application to make the function named in `TARGET_APPLICATION_FUNCTION` throw an exception containing `MESSAGE` for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Calls to the named function throw the configured exception. Other functions in the same application run normally.
- Direct callers see the exception propagate up the stack unless they catch it. Frameworks may surface it as a 5xx response, a queued message rollback, or a propagated failure depending on the runtime.
- Downstream services may see reduced or absent traffic if the throwing function fronted upstream calls.
- Error dashboards and traces should show the injected exception type and message alongside any cascading failures.

:::info When the fault ends
The function returns to its normal behavior immediately. In-flight calls that already threw stay failed; new calls succeed as before.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that exercise the function to detect 4xx/5xx spikes.
- **Function-level metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the function's exception counter or success rate to confirm the injection.
- **Application logs:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to grep container logs for the configured `MESSAGE`.

---

## Verify the fault execution effect

While the experiment is running, confirm the function is throwing:

1. **Exercise the function from a client.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -s http://<service>:<port>/<endpoint-that-calls-the-function>
   ```

   The response should reflect the failure, either as an HTTP error or an error payload that mentions the injected exception.

2. **Confirm the exception surfaces in logs.**

   ```bash
   kubectl logs -n <namespace> <target-pod> --tail=200 | grep "<MESSAGE>"
   ```

   The configured `MESSAGE` should appear in stack traces or error logs for each thrown invocation.

---

## Recovery and cleanup

- **End of duration:** The function returns to its normal behavior automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck state:** If the application caches the failure (for example by tripping a circuit breaker that does not reset on its own), restart the pod to clear the cached state.

---

## Limitations

- **Instrumentation required:** The fault only affects applications that have registered themselves and their functions with the chaos infrastructure. Uninstrumented applications cannot be targeted.
- **Function-name granularity:** Only one function at a time is targeted. Use multiple experiments in sequence for multi-function scenarios.
- **Exception type is fixed by the instrumentation:** The runtime exception type thrown is determined by the application's instrumentation layer; only `MESSAGE` is configurable. Use Pod JVM method exception for JVM-specific exception-type control.

---

## Troubleshooting

<Troubleshoot
  issue="Pod application function exception experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy. Add the required tolerations to the experiment or adjust the namespace's Pod Security level."
/>

<Troubleshoot
  issue="No exceptions observed during pod-application-function-exception"
  mode="docs"
  fallback="The most common causes are: TARGET_APPLICATION_NAME does not match the registered application name; TARGET_APPLICATION_FUNCTION does not match a registered function; the application image does not include the chaos instrumentation; or the call path under test never invokes the named function. Verify registration by listing instrumented applications and confirm by exercising the function with a known client."
/>

<Troubleshoot
  issue="Function appears to throw intermittently after pod-application-function-exception ends"
  mode="docs"
  fallback="Check whether the application has a circuit breaker or cooldown window that keeps the function in a degraded state after the injection ends. Adjust the circuit breaker reset interval or restart the pod to clear it."
/>

---

## Related faults

- [Pod application function error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-application-function-error): Inject an error from a function instead of throwing an exception.
- [Pod application function latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-application-function-latency): Inject latency into a function instead of failing it.
- [Pod JVM method exception](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-exception): JVM-specific method-level exception injection with full exception-type control.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
