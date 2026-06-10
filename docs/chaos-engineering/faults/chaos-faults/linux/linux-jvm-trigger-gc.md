---
id: linux-jvm-trigger-gc
title: Linux JVM trigger GC
sidebar_label: Linux JVM Trigger GC
description: Force garbage collection in a target Java process on a Linux machine for a configurable duration so you can test how the workload behaves under repeated GC events.
keywords:
  - chaos engineering
  - linux jvm trigger gc
  - linux fault
  - jvm chaos
tags:
  - chaos-engineering
  - linux-faults
  - jvm-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-jvm-trigger-gc
- /docs/chaos-engineering/chaos-faults/linux/linux-jvm-trigger-gc
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux JVM trigger GC is a chaos fault that uses Byteman to force garbage collection events in the target Java process for `DURATION`, then removes the rule. The target Java process is selected by `PID`, by `STARTUP_COMMAND`, or by attaching to a running Byteman agent on `PORT`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a Java workload behaves under repeated GC pressure: whether application threads pause noticeably, whether tail latency exceeds the SLA, whether GC absorbs the work safely, and whether monitoring detects the increased pause time within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **GC pause tolerance:** When GC runs more often, do request handlers stay inside their p99 SLA?
- **Stop-the-world impact:** Does the application surface user-visible jitter when collectors trigger?
- **Memory reclaim verification:** Does forced GC actually reclaim memory (heap usage drops), or does the workload regenerate it instantly?
- **Monitoring fidelity:** Do alerts on `jvm_gc_pause_seconds` and full-GC rate fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target JVM identifiable:** Provide one of `PID` or `STARTUP_COMMAND`, or ensure a Byteman agent is already listening on `PORT`.
- **`JAVA_HOME` reachable:** Set `JAVA_HOME` if it is not on the LCI service environment.
- **GC operations allowed:** The target JVM should not block `System.gc()` (some JVMs disable explicit GC with `-XX:+DisableExplicitGC`).

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

Configure the following fault parameters when you add Linux JVM trigger GC to an experiment in Chaos Studio. Defaults are shown for reference.

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

Attaches Byteman to the target JVM on `PORT`, installs a rule that repeatedly calls `System.gc()` for `DURATION`, then removes the rule.

---

## Expected behavior during fault execution

- GC pause time increases for the duration of the fault; pause count rises sharply.
- Application threads pause during each stop-the-world GC event; tail latency (`p99`) shifts upward.
- Heap usage drops after each GC cycle; long-lived objects are unaffected.
- After the duration ends, the Byteman rule is removed and GC returns to its normal schedule.

:::info When the fault ends
The chaos pod removes the Byteman rule. GC returns to its normal schedule determined by the collector and the application's allocation rate.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **GC pause time:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `jvm_gc_pause_seconds_sum` and assert it rose during the chaos window.
- **GC count:** Use a Prometheus probe on `jvm_gc_collection_seconds_count` and assert the increment.
- **Request latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint and assert p95/p99 stays inside the SLA.

---

## Verify the fault execution effect

1. **Watch GC activity in real time.**

   ```bash
   sudo jstat -gcutil <pid> 1s 30
   ```

   `YGC`/`FGC` counters should increase during the chaos window.

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

- **DisableExplicitGC:** If the target JVM runs with `-XX:+DisableExplicitGC`, the fault has no effect; `System.gc()` becomes a no-op.
- **Collector behavior:** Different collectors (G1, ZGC, Parallel, Shenandoah) react differently; ZGC and Shenandoah may produce minimal pause time even under forced GC.
- **Byteman dependency:** The target JVM must allow Byteman attachment.
- **Single JVM scope:** Each fault run targets one Java process.
- **Allocation rate matters:** On low-allocation workloads, forced GC may have little observable effect on tail latency.

---

## Troubleshooting

<Troubleshoot
  issue="Linux JVM trigger GC fault did not produce measurable GC activity in Harness Chaos Engineering"
  mode="docs"
  fallback="If the JVM runs with -XX:+DisableExplicitGC, System.gc() becomes a no-op. Check JVM flags with sudo jcmd <pid> VM.flags or remove the flag. Use jstat -gcutil <pid> 1s to confirm GC counter changes."
/>

<Troubleshoot
  issue="No observable application latency change"
  mode="docs"
  fallback="ZGC and Shenandoah are designed to keep pauses small even under forced GC. On these collectors, p99 may not shift noticeably; assert on jvm_gc_pause_seconds directly instead of request latency."
/>

<Troubleshoot
  issue="GC activity persisted after the experiment ended"
  mode="docs"
  fallback="If the Byteman rule was not removed, list with sudo bmtool -p <PORT> -l and remove with -u <rule>. If the rule cannot be removed, restart the target JVM to clear injected rules."
/>

---

## Related faults

- [Linux JVM memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-memory-stress): Allocate memory in the JVM instead of forcing GC.
- [Linux JVM CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-cpu-stress): Stress JVM CPU instead of GC.
- [Linux JVM method latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-method-latency): Slow a specific method instead of triggering GC.
