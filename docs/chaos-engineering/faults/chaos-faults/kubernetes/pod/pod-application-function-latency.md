---
id: pod-application-function-latency
title: Pod application function latency
sidebar_label: Pod Application Function Latency
description: Add a configurable delay to a specific function of an instrumented application running in a Kubernetes pod so you can test timeout, retry, and tail-latency behavior of callers.
keywords:
  - chaos engineering
  - pod application function latency
  - application chaos
  - function-level fault
  - kubernetes pod fault
tags:
  - chaos-engineering
  - pod-faults
  - application-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-application-function-latency
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-application-function-latency
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod-application-function-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Pod application function latency is a Kubernetes pod-level chaos fault that adds a configurable delay to a specific function in an instrumented application for a configurable duration. Only the named function is slowed; other application code paths run at their normal speed. When the fault ends, the function returns to its normal latency immediately.

Use this fault to test how callers and dependents behave when a specific business function suddenly becomes slow: a third-party SDK that stalls on a code path, a wrapper around a slow database call, or a side-effecting operation that needs to obey strict client timeouts.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Function-level timeout sensitivity:** When a payment-processing function takes 10 seconds instead of 100 ms, does the caller honor its timeout or hang?
- **Retry storms:** Does a slow function cause clients to retry, amplifying load on the rest of the system?
- **Thread-pool saturation:** Do slow function calls block worker threads to the point where the application stops accepting new work?
- **Circuit breaker tripping:** Does a slow function trip the circuit breaker after the configured slow-call ratio, and does the breaker recover correctly when the fault ends?
- **End-to-end SLO impact:** Does the added function-level latency cause a measurable regression in service-level p99, or does back-pressure absorb it cleanly?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target pod is Running:** The application pod is in the `Running` state.
- **Application is instrumented:** The application registers a name and exposes the target function to the chaos infrastructure. Without instrumentation, the chaos pod cannot reach the function.
- **Function is identifiable:** The function to slow is reachable by the name set in `TARGET_APPLICATION_FUNCTION`.
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

Configure the following fault parameters when you add Pod application function latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_APPLICATION_NAME` | Name of the target application as registered with the chaos infrastructure. | (required) |
| `TARGET_APPLICATION_FUNCTION` | Name of the function inside the target application to add latency to. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LATENCY` | Delay to add to each invocation of the target function, in milliseconds. | `10000` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::tip Start small, increase gradually
Start with a latency value close to the callers' configured timeout. If callers handle that gracefully, increase `LATENCY` to test how the system behaves under more extreme slowdown.
:::

---

## Fault execution in brief

Signals the instrumented application to add `LATENCY` milliseconds to every invocation of the function named in `TARGET_APPLICATION_FUNCTION` for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- Calls to the named function take longer by approximately `LATENCY` ms. Other functions run at their normal speed.
- Caller-side metrics (request latency, queue depth, in-flight requests) rise to reflect the added delay.
- Clients with timeouts shorter than `LATENCY` cancel the call and may retry, multiplying load on the rest of the system.
- Thread-pool-bound applications saturate quickly if many concurrent callers wait on the slow function.
- Tracing systems show the function span growing by `LATENCY` ms; downstream spans are unchanged.

:::info When the fault ends
The function returns to its normal latency immediately. Calls already in flight finish at the delayed time and then the system returns to baseline.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Function-level latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the function's p99 duration to confirm the rise matches `LATENCY`.
- **Caller timeouts:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against endpoints that exercise the function to detect rising timeouts.
- **Pod readiness:** Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) to fail when the target pod oscillates `NotReady` because of saturated probe paths.

---

## Verify the fault execution effect

While the experiment is running, confirm the function is slower:

1. **Time a call to the function from a client.**

   ```bash
   kubectl run -n <namespace> tester --image=nicolaka/netshoot --rm -it -- \
     curl -w "time=%{time_total}\n" -o /dev/null -s http://<service>:<port>/<endpoint-that-calls-the-function>
   ```

   `time_total` should rise by approximately `LATENCY` ms.

2. **Confirm the rise in your APM dashboard.**

   The named function's p99 latency should track `LATENCY`. Spans downstream of the function should remain unchanged.

---

## Recovery and cleanup

- **End of duration:** The function returns to its normal latency automatically.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same cleanup path.
- **Stuck threads:** If the application is wedged because of saturated thread pools, restart the pod to clear in-flight blocked work.

---

## Limitations

- **Instrumentation required:** The fault only affects applications that have registered themselves and their functions with the chaos infrastructure. Uninstrumented applications cannot be targeted.
- **Function-name granularity:** Only one function at a time is targeted. Use multiple experiments in sequence for multi-function scenarios.
- **No payload control:** The fault delays the function call; it does not modify return values, arguments, or error behavior. Use Pod application function error to inject a failure instead.

---

## Troubleshooting

<Troubleshoot
  issue="Pod application function latency experiment stays Pending or never starts in Harness Chaos Engineering"
  mode="docs"
  fallback="Inspect the chaos pods in the experiment namespace with kubectl describe pod -n <chaos-namespace>. The most common causes are taints on the target node that the chaos pods do not tolerate, insufficient resources, or a PodSecurity admission policy. Add the required tolerations to the experiment or adjust the namespace's Pod Security level."
/>

<Troubleshoot
  issue="No latency observed during pod-application-function-latency"
  mode="docs"
  fallback="The most common causes are: TARGET_APPLICATION_NAME does not match the registered application name; TARGET_APPLICATION_FUNCTION does not match a registered function; the application image does not include the chaos instrumentation; or the call path under test never invokes the named function. Verify registration by listing instrumented applications and confirm by timing a known client call before, during, and after the fault."
/>

<Troubleshoot
  issue="Function calls remain slow after pod-application-function-latency ends"
  mode="docs"
  fallback="Check whether the application has saturated thread or connection pools that have not drained. Restart the pod to recover, and consider lowering LATENCY or shortening TOTAL_CHAOS_DURATION for the next run."
/>

---

## Related faults

- [Pod application function error](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-application-function-error): Inject an error into a function instead of slowing it.
- [Pod JVM method latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-jvm-method-latency): JVM-specific method-level latency injection.
- [Pod HTTP latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-http-latency): Add latency to HTTP responses at the network layer.
- [Common pod fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults): Shared environment variables for selecting target pods and workloads.
