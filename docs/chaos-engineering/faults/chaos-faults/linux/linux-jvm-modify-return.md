---
id: linux-jvm-modify-return
title: Linux JVM modify return
sidebar_label: Linux JVM Modify Return
description: Override the return value of a target class and method in a Java process on a Linux machine so you can test how callers handle unexpected return data.
keywords:
  - chaos engineering
  - linux jvm modify return
  - linux fault
  - jvm chaos
tags:
  - chaos-engineering
  - linux-faults
  - jvm-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-jvm-modify-return
- /docs/chaos-engineering/chaos-faults/linux/linux-jvm-modify-return
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux JVM modify return is a chaos fault that uses Byteman to overwrite the return value of `CLASS.METHOD` with `RETURN` in the target Java process for `DURATION`, then removes the rule. The target Java process is selected by `PID`, by `STARTUP_COMMAND`, or by attaching to a running Byteman agent on `PORT`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a Java workload behaves when an internal method returns unexpected data: whether callers validate inputs from neighbours, whether stale or edge-case values surface clear errors, whether downstream dependencies tolerate the modified data, and whether monitoring detects the anomaly within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Caller validation:** When `CLASS.METHOD` returns the modified value, does the caller validate it or pass it through blindly?
- **Edge cases:** Does substituting an empty string, null, or extreme value (`0`, `Integer.MAX_VALUE`) trigger a clean error or a crash?
- **Stale-data tolerance:** With `RETURN` simulating a cache stale value, does the dependent code do the right thing?
- **Monitoring fidelity:** Do alerts on data validation failures or business-metric anomalies fire within the alerting SLA?

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

Configure the following fault parameters when you add Linux JVM modify return to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLASS` | Fully qualified class name containing the target method. | (required) |
| `METHOD` | Method name within `CLASS` whose return value will be overwritten. | (required) |
| `RETURN` | New return value to inject. Must be compatible with the method's declared return type (for example, `"down"` for `String`, `0` for `int`, `false` for `boolean`). | (required) |

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

Attaches Byteman to the target JVM on `PORT`, installs a rule that returns `RETURN` from `CLASS.METHOD` (bypassing the method body) for `DURATION`, then removes the rule.

---

## Expected behavior during fault execution

- Every invocation of `CLASS.METHOD` returns `RETURN` (the method body does not execute) for the duration of the fault.
- Callers that rely on side effects of the method (DB writes, cache updates) skip those side effects.
- Validation in dependent code may catch the unexpected value; uncaught cases may produce business logic errors.
- After the duration ends, the Byteman rule is removed and the method runs normally.

:::info When the fault ends
The chaos pod removes the Byteman rule. The next invocation of the method executes the original body; side effects that were skipped during chaos are not retroactively performed.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application validation:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on validation-error counters.
- **End-to-end behavior:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises the method.
- **Business metrics:** Use a Prometheus probe on a business-level success metric (orders accepted, payments completed) and assert it stays inside the SLA.

---

## Verify the fault execution effect

1. **Trigger the method via a user-visible endpoint.**

   ```bash
   curl -v https://<app>/<endpoint-that-calls-CLASS.METHOD>
   ```

   The response should reflect the overridden return value during the chaos window.

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
- **Workload recovery:** Side effects skipped during chaos are not retroactively performed; reconcile data if business state requires it.

---

## Limitations

- **Type-compatible return only:** `RETURN` must be parseable as the method's declared return type. Mismatched types fail to inject.
- **Method body skipped:** The method body does not execute; expected side effects are silently dropped during chaos.
- **Overload resolution:** Byteman matches on method name; all overloads return the configured value.
- **Byteman dependency:** The target JVM must allow Byteman attachment.
- **Single JVM scope:** Each fault run targets one Java process.

---

## Troubleshooting

<Troubleshoot
  issue="Linux JVM modify return fault failed with type mismatch in Harness Chaos Engineering"
  mode="docs"
  fallback='RETURN must be compatible with the method declared return type. Use 0 for int, false for boolean, "text" for String, and so on. Inspect the method signature with javap -p -classpath <jar> <class> and adjust RETURN.'
/>

<Troubleshoot
  issue="Method side effects did not happen during the experiment"
  mode="docs"
  fallback="This is by design: the method body is skipped and only RETURN is produced. To exercise the side effects with a different return value, modify the method to compute RETURN at the end instead of using modify return."
/>

<Troubleshoot
  issue="Return value override persisted after the experiment ended"
  mode="docs"
  fallback="If the Byteman rule was not removed, list with sudo bmtool -p <PORT> -l and remove with -u <rule>. If the rule cannot be removed, restart the target JVM."
/>

---

## Related faults

- [Linux JVM method exception](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-method-exception): Throw an exception from the method instead of overriding the return.
- [Linux JVM method latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-method-latency): Add latency to the method instead of overriding the return.
- [Linux API modify body](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-body): Modify HTTP response body at the network layer instead of inside the JVM.
