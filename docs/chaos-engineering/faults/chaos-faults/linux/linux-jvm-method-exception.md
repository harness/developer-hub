---
id: linux-jvm-method-exception
title: Linux JVM method exception
sidebar_label: Linux JVM Method Exception
description: Throw a configured exception from a target class and method in a Java process on a Linux machine so you can test how the application handles unexpected exceptions.
keywords:
  - chaos engineering
  - linux jvm method exception
  - linux fault
  - jvm chaos
tags:
  - chaos-engineering
  - linux-faults
  - jvm-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-jvm-method-exception
- /docs/chaos-engineering/chaos-faults/linux/linux-jvm-method-exception
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux JVM method exception is a chaos fault that uses Byteman to throw `EXCEPTION` from the target `CLASS.METHOD` of the target Java process for `DURATION`, then removes the rule. The target Java process is selected by `PID`, by `STARTUP_COMMAND`, or by attaching to a running Byteman agent on `PORT`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a Java workload behaves when a hot method throws unexpected exceptions: whether the call site catches the exception cleanly, whether higher-level error handling surfaces a clear user-visible error, whether retry logic amplifies the failure, and whether monitoring detects the exception within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Exception handling:** When `CLASS.METHOD` throws `EXCEPTION`, does the caller catch it cleanly or does it bubble up to the request handler?
- **User-visible error:** Does the resulting user-visible error message match the expected error contract (5xx status code, structured error body)?
- **Retry storms:** Do retries amplify the failure, or do circuit breakers fire?
- **Monitoring fidelity:** Do alerts on application exception counters and 5xx error rate fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target JVM identifiable:** Provide one of `PID` or `STARTUP_COMMAND`, or ensure a Byteman agent is already listening on `PORT`.
- **`JAVA_HOME` reachable:** Set `JAVA_HOME` if it is not on the LCI service environment.
- **Target class loaded:** The JVM must have `CLASS` loaded and the matching `METHOD` defined (overloads are resolved by name).

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

Configure the following fault parameters when you add Linux JVM method exception to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLASS` | Fully qualified class name containing the target method (for example, `com.example.OrderService`). | (required) |
| `METHOD` | Method name within `CLASS` to inject the exception into. | (required) |
| `EXCEPTION` | Fully qualified exception class to throw (for example, `java.lang.RuntimeException` or `java.io.IOException`). | (required) |

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
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Attaches Byteman to the target JVM on `PORT`, installs a rule that throws `EXCEPTION` from `CLASS.METHOD` for `DURATION`, then removes the rule.

---

## Expected behavior during fault execution

- Every invocation of `CLASS.METHOD` throws the configured exception for the duration of the fault.
- Callers see the exception propagate per their `try/catch` discipline; uncaught exceptions surface as request failures.
- Application exception counters increase; downstream services that retry may see a burst of errors.
- After the duration ends, the Byteman rule is removed and the method runs normally.

:::info When the fault ends
The chaos pod removes the Byteman rule. The next invocation of the method executes normally; queued retries from the chaos window may still surface delayed errors.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application exception count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the application exception or 5xx counter.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises the method.
- **Log inspection:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to assert the application log contains the injected exception stack.

---

## Verify the fault execution effect

1. **Trigger the method via a user-visible endpoint.**

   ```bash
   curl -v https://<app>/<endpoint-that-calls-CLASS.METHOD>
   ```

   The response should surface the expected user-visible error during the chaos window.

2. **Inspect Byteman state.**

   ```bash
   sudo $JAVA_HOME/bin/bmtool -p <PORT> -l
   ```

3. **Tail the application log.**

   ```bash
   sudo tail -f <app-log> | grep -E "<EXCEPTION>|Exception"
   ```

4. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the Byteman rule when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the rule.
- **Manual recovery:** If the rule survives an abort, remove it with `sudo $JAVA_HOME/bin/bmtool -p <PORT> -u <rule>` (rule name is recorded in the LCI logs).
- **Workload recovery:** Retries from the chaos window may continue briefly; clients reconnect on the next attempt.

---

## Limitations

- **Method visibility:** The target method must be defined on a loaded class; lazy-loaded classes are not affected until first use.
- **Overload resolution:** Byteman matches on method name; if multiple overloads exist, all overloads throw.
- **Byteman dependency:** The target JVM must allow Byteman attachment.
- **Single JVM scope:** Each fault run targets one Java process.

---

## Troubleshooting

<Troubleshoot
  issue="Linux JVM method exception fault did not throw the configured exception in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm CLASS is the fully qualified name (com.example.OrderService) and that METHOD is defined on a loaded class. Trigger the method explicitly and check application logs for the injected exception."
/>

<Troubleshoot
  issue="Multiple overloads of METHOD are affected"
  mode="docs"
  fallback="This is expected: Byteman matches on method name. Rename the method to a unique name in the test environment, or limit the fault DURATION to a brief window if other overloads are critical."
/>

<Troubleshoot
  issue="Exception continued after the experiment ended"
  mode="docs"
  fallback="If the Byteman rule was not removed, list with sudo bmtool -p <PORT> -l and remove with -u <rule>. If the rule cannot be removed, restart the target JVM to clear injected rules."
/>

---

## Related faults

- [Linux JVM method latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-method-latency): Add latency to the method instead of throwing.
- [Linux JVM modify return](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-modify-return): Override the return value instead of throwing.
- [Linux JVM trigger GC](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-trigger-gc): Force GC events instead of injecting an exception.
