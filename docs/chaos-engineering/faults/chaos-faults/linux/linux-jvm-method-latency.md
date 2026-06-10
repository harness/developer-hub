---
id: linux-jvm-method-latency
title: Linux JVM method latency
sidebar_label: Linux JVM Method Latency
description: Add latency to a target class and method in a Java process on a Linux machine so you can test how the application behaves when an internal method slows down.
keywords:
  - chaos engineering
  - linux jvm method latency
  - linux fault
  - jvm chaos
tags:
  - chaos-engineering
  - linux-faults
  - jvm-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-jvm-method-latency
- /docs/chaos-engineering/chaos-faults/linux/linux-jvm-method-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux JVM method latency is a chaos fault that uses Byteman to add `LATENCY` milliseconds of delay to every invocation of `CLASS.METHOD` in the target Java process for `DURATION`, then removes the rule. The target Java process is selected by `PID`, by `STARTUP_COMMAND`, or by attaching to a running Byteman agent on `PORT`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a Java workload behaves when a hot method gets slow: whether the caller honors its own timeout, whether thread-pool exhaustion appears, whether circuit breakers fire, and whether monitoring detects the in-JVM slowdown within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Method slowdown tolerance:** When `CLASS.METHOD` slows by `LATENCY` milliseconds, do request handlers stay inside their p99 SLA?
- **Thread-pool starvation:** Do worker pools or async executors back up when a hot method blocks?
- **Caller timeouts:** Do callers honor their own timeouts, or do they hold the thread until the method returns?
- **Monitoring fidelity:** Do alerts on method-level latency, queue depth, and request latency fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target JVM identifiable:** Provide one of `PID` or `STARTUP_COMMAND`, or ensure a Byteman agent is already listening on `PORT`.
- **`JAVA_HOME` reachable:** Set `JAVA_HOME` if it is not on the LCI service environment.
- **Target class loaded:** The JVM must have `CLASS` loaded and the matching `METHOD` defined.

---

## Supported environments

The fault has been tested on the following Linux distributions. Go to [Linux fault requirements](/docs/chaos-engineering/faults/chaos-faults/linux/permissions) to see the full compatibility matrix.

| Platform | Support status |
| --- | --- |
| Ubuntu 16+, Debian 10+ | Supported |
| CentOS 7+, RHEL 7+, Fedora 30+ | Supported |
| openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+ | Supported |
| JVM versions | OpenJDK 8, 11, 17, 21 (any JVM compatible with Byteman) |

---

## Permissions required

This fault is classified as a **Basic** Linux fault. It runs with the privileges of the Linux Chaos Infrastructure systemd service (root user and root user group) on the target VM. The LCI service must have permission to attach to the target Java process. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux JVM method latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLASS` | Fully qualified class name containing the target method. | (required) |
| `METHOD` | Method name within `CLASS` to delay. | (required) |

**JVM selectors (provide one or rely on `PORT`)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PID` | PID of the target Java process. Set to `0` to fall back to `STARTUP_COMMAND` or `PORT`. | `0` |
| `STARTUP_COMMAND` | Substring of the Java process command line used to identify the target. | `""` |
| `PORT` | Port of the Byteman agent. | `9091` |
| `JAVA_HOME` | Path to the JDK used by the target JVM. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `LATENCY` | Latency to inject per method call, in milliseconds. | `2000` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Attaches Byteman to the target JVM on `PORT`, installs a rule that sleeps `LATENCY` milliseconds before `CLASS.METHOD` executes (per invocation) for `DURATION`, then removes the rule.

---

## Expected behavior during fault execution

- Every invocation of `CLASS.METHOD` takes `LATENCY` milliseconds longer than usual for the duration of the fault.
- Request handlers that depend on the method are delayed; thread-pool occupancy rises.
- Tail latency (`p99`) for endpoints exercising the method shifts upward by approximately `LATENCY`.
- Callers that have shorter timeouts than `LATENCY` see clean timeout errors.
- After the duration ends, the Byteman rule is removed and the method runs at baseline speed.

:::info When the fault ends
The chaos pod removes the Byteman rule. The next invocation of the method runs at baseline speed; in-flight invocations complete after their delay.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Method latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application method-level latency metrics.
- **Request latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises the method.
- **Thread-pool occupancy:** Use a Prometheus probe on `jvm_threads_state` or a custom thread-pool gauge.

---

## Verify the fault execution effect

1. **Trigger the method via a user-visible endpoint.**

   ```bash
   curl -w '%{time_total}\n' -o /dev/null -s https://<app>/<endpoint>
   ```

   Latency for the endpoint should rise by approximately `LATENCY` (per method call) during the chaos window.

2. **Inspect Byteman state.**

   ```bash
   sudo $JAVA_HOME/bin/bmtool -p <PORT> -l
   ```

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the Byteman rule when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the rule.
- **Manual recovery:** If the rule survives an abort, remove it with `sudo $JAVA_HOME/bin/bmtool -p <PORT> -u <rule>`.

---

## Limitations

- **Per-invocation delay:** `LATENCY` is added per invocation; methods called in tight loops will accumulate large delays.
- **Method visibility:** The target method must be defined on a loaded class; lazy-loaded classes are not affected until first use.
- **Overload resolution:** Byteman matches on method name; all overloads are delayed.
- **Byteman dependency:** The target JVM must allow Byteman attachment.
- **Single JVM scope:** Each fault run targets one Java process.

---

## Troubleshooting

<Troubleshoot
  issue="Linux JVM method latency fault did not slow the method in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm CLASS is the fully qualified name and that METHOD is defined on a loaded class. Trigger the method explicitly and measure the response time with curl. Verify Byteman attached with sudo bmtool -p <PORT> -l."
/>

<Troubleshoot
  issue="Latency accumulated faster than expected"
  mode="docs"
  fallback="LATENCY is added per invocation. If the method is called many times per request, total request latency is approximately N x LATENCY. Reduce LATENCY or instrument the call site to see the actual invocation count."
/>

<Troubleshoot
  issue="Latency persisted after the experiment ended"
  mode="docs"
  fallback="If the Byteman rule was not removed, list with sudo bmtool -p <PORT> -l and remove with -u <rule>. If the rule cannot be removed, restart the target JVM to clear injected rules."
/>

---

## Related faults

- [Linux JVM method exception](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-method-exception): Throw an exception from the method instead of delaying it.
- [Linux JVM modify return](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-modify-return): Override the return value instead of delaying.
- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Add latency at the network layer instead of inside the JVM.
