---
id: linux-jvm-memory-stress
title: Linux JVM memory stress
sidebar_label: Linux JVM Memory Stress
description: Apply memory stress inside a target Java process on a Linux machine for a configurable duration so you can test how the JVM behaves under memory pressure.
keywords:
  - chaos engineering
  - linux jvm memory stress
  - linux fault
  - jvm chaos
tags:
  - chaos-engineering
  - linux-faults
  - jvm-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-jvm-memory-stress
- /docs/chaos-engineering/chaos-faults/linux/linux-jvm-memory-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux JVM memory stress is a chaos fault that uses Byteman to consume memory in the heap or stack of the target Java process for `DURATION`, then releases the memory. The memory region is selected by `MEMORY_TYPE` (`heap` or `stack`). The target Java process is selected by `PID`, by `STARTUP_COMMAND`, or by attaching to a running Byteman agent on `PORT`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a Java workload behaves under memory pressure: whether GC keeps up, whether OutOfMemoryError surfaces cleanly, whether the application slows down via excessive GC, and whether monitoring detects the pressure within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Heap headroom:** When the heap fills up, does the application stay inside its latency SLA, or does GC dominate?
- **OOM handling:** Does the application surface `OutOfMemoryError` cleanly, or does it crash with a stuck JVM?
- **Stack pressure:** With `MEMORY_TYPE=stack`, does the application handle `StackOverflowError` without leaking threads?
- **Monitoring fidelity:** Do alerts on `jvm_memory_bytes_used`, GC pause time, and full GC rate fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target JVM identifiable:** Provide one of `PID` or `STARTUP_COMMAND`, or ensure a Byteman agent is already listening on `PORT`.
- **`JAVA_HOME` reachable:** Set `JAVA_HOME` if it is not on the LCI service environment.
- **Byteman port reachable:** `PORT` (default `9091`) must be free or already hosting the Byteman listener for the target JVM.

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

Configure the following fault parameters when you add Linux JVM memory stress to an experiment in Chaos Studio. Defaults are shown for reference.

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
| `MEMORY_TYPE` | JVM memory region to stress. Accepts `heap` or `stack`. | `heap` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Attaches Byteman to the target JVM on `PORT`, installs a rule that allocates memory in the `MEMORY_TYPE` region for `DURATION`, then removes the rule and releases the memory.

---

## Expected behavior during fault execution

- Memory utilization for the target JVM rises for the duration of the fault.
- With `MEMORY_TYPE=heap`, full GC events increase; with `MEMORY_TYPE=stack`, `StackOverflowError` may fire.
- Request latency inside the JVM grows; throughput drops.
- If the JVM hits its configured `-Xmx`, `OutOfMemoryError` is thrown and the application may exit.
- After the duration ends, the Byteman rule is removed; allocated objects become eligible for GC.

:::info When the fault ends
The chaos pod removes the Byteman rule and allocated memory becomes eligible for GC. The next GC cycle reclaims the space; the JVM does not need to restart.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Heap usage:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `jvm_memory_bytes_used{area="heap"}` and assert it rose.
- **Full GC rate:** Use a Prometheus probe on `jvm_gc_collection_seconds_count` for the full collector.
- **OutOfMemoryError:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to scan the application log for `OutOfMemoryError`.

---

## Verify the fault execution effect

1. **Observe live JVM memory.**

   ```bash
   sudo jstat -gc <pid> 1s 30
   sudo jmap -heap <pid>
   ```

   Used heap should rise during the chaos window. With `stack`, observe stack-depth warnings in the application log.

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
- **Manual recovery:** If the rule survives an abort, remove it with `sudo $JAVA_HOME/bin/bmtool -p <PORT> -u <rule>`. If the JVM exited with `OutOfMemoryError`, restart the application service.

---

## Limitations

- **JVM-only:** The fault stresses JVM memory only; host-level memory pressure is not produced (use [Linux memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-memory-stress) for that).
- **Byteman dependency:** The target JVM must allow Byteman attachment.
- **OOM kills the JVM:** With `MEMORY_TYPE=heap`, an `OutOfMemoryError` may take down the JVM; the fault cannot recover from a process exit.
- **Single JVM scope:** Each fault run targets one Java process.

---

## Troubleshooting

<Troubleshoot
  issue="Linux JVM memory stress fault could not attach to target JVM in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm PID or STARTUP_COMMAND resolves to a running Java process and that JAVA_HOME points to a JDK matching the target JVM major version. Verify the LCI service has permission to attach (same user namespace, no AppArmor block)."
/>

<Troubleshoot
  issue="JVM crashed with OutOfMemoryError during the experiment"
  mode="docs"
  fallback="This is the intended observation for some heap experiments. If unintended, reduce DURATION or increase -Xmx on the application. Capture a heap dump with -XX:+HeapDumpOnOutOfMemoryError to analyze the allocation pattern."
/>

<Troubleshoot
  issue="Heap stayed elevated after the experiment ended"
  mode="docs"
  fallback="GC reclaims the chaos allocations on the next cycle. Trigger a full GC if needed (sudo jcmd <pid> GC.run). If the rule was not removed, list and remove with bmtool -l / -u as documented in cleanup."
/>

---

## Related faults

- [Linux JVM CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-cpu-stress): Stress JVM CPU instead of memory.
- [Linux JVM trigger GC](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-trigger-gc): Force GC events instead of allocating memory.
- [Linux memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-memory-stress): Apply memory pressure at the host level instead of inside one JVM.
