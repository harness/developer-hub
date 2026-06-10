---
id: linux-jvm-cpu-stress
title: Linux JVM CPU stress
sidebar_label: Linux JVM CPU Stress
description: Apply CPU stress inside a target Java process on a Linux machine for a configurable duration so you can test how the JVM behaves under compute pressure.
keywords:
  - chaos engineering
  - linux jvm cpu stress
  - linux fault
  - jvm chaos
tags:
  - chaos-engineering
  - linux-faults
  - jvm-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-jvm-cpu-stress
- /docs/chaos-engineering/chaos-faults/linux/linux-jvm-cpu-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux JVM CPU stress is a chaos fault that uses Byteman to pin `CPU` cores of busy work inside the target Java process for `DURATION`, then releases the threads. The target Java process is selected by `PID`, by `STARTUP_COMMAND`, or by attaching to a running Byteman agent on `PORT`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a Java workload behaves when its own threads pin the CPU: whether GC keeps up, whether request handlers slow down, whether thread-pool exhaustion appears, and whether monitoring detects the in-JVM pressure within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU tail behavior:** When `CPU` JVM threads pin cores, does the request handler tail (`p99`) stay inside its SLA?
- **GC pressure:** Does GC absorb the additional CPU pressure, or does it degrade throughput further?
- **Thread-pool starvation:** Do worker pools or async executors back up when CPU is starved inside the JVM?
- **Monitoring fidelity:** Do alerts on JVM CPU, request latency, and queue depth fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target JVM identifiable:** Provide one of `PID` or `STARTUP_COMMAND`, or ensure a Byteman agent is already listening on `PORT`.
- **`JAVA_HOME` reachable:** The fault uses Byteman, which requires `JAVA_HOME` resolvable to the JDK that the target process is running. Set `JAVA_HOME` if it is not on `PATH`.
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

Configure the following fault parameters when you add Linux JVM CPU stress to an experiment in Chaos Studio. Defaults are shown for reference.

**JVM selectors (provide one or rely on `PORT`)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PID` | PID of the target Java process. Set to `0` to fall back to `STARTUP_COMMAND` or `PORT`. | `0` |
| `STARTUP_COMMAND` | Substring of the Java process command line used to identify the target. | `""` |
| `PORT` | Port of the Byteman agent. The fault installs Byteman on this port if no listener exists. | `9091` |
| `JAVA_HOME` | Path to the JDK used by the target JVM. Required if `JAVA_HOME` is not on the LCI service environment. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `CPU` | Number of in-JVM threads that pin CPU cores. | `2` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Attaches Byteman to the target JVM on `PORT`, installs a rule that spawns `CPU` busy threads for `DURATION`, then removes the rule and releases the threads.

---

## Expected behavior during fault execution

- CPU usage attributed to the target Java process rises sharply.
- Request latency inside the JVM grows; `p99` shifts upward as worker threads compete for CPU.
- GC may extend pause times if it competes with the busy threads.
- After the duration ends, the Byteman rule is removed and the busy threads exit.

:::info When the fault ends
The chaos pod removes the Byteman rule and the busy threads exit. CPU returns to baseline within the JVM and on the host.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **JVM CPU:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `process_cpu_seconds_total{job="<app>"}` and assert it rose.
- **GC pause:** Use a Prometheus probe on `jvm_gc_pause_seconds` and assert the maximum stayed inside the SLA.
- **Request latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **Observe live CPU on the target JVM.**

   ```bash
   sudo top -bn1 -p <pid> | tail
   sudo jstack <pid> | grep -E "RUNNABLE|stress" | head -20
   ```

2. **Inspect Byteman state.**

   ```bash
   sudo $JAVA_HOME/bin/bmtool -p <PORT> -l
   ```

   The injected rule should be listed during the chaos window and removed afterwards.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the Byteman rule when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the rule.
- **Manual recovery:** If the rule survives an abort, remove it manually with `sudo $JAVA_HOME/bin/bmtool -p <PORT> -u <rule>` (rule name is recorded in the LCI logs). If the Byteman listener itself is orphaned, restart the target JVM.

---

## Limitations

- **JVM-only:** The fault stresses CPU inside the target JVM only; non-JVM processes on the same host are not affected.
- **Byteman dependency:** The target JVM must allow Byteman attachment; some hardened JVMs (sealed containers, AppArmor-restricted) reject attachment.
- **Single JVM scope:** Each fault run targets one Java process.
- **CPU vs cores:** `CPU` controls the number of busy threads but cannot exceed the JVM's effective CPU limits (cgroups, taskset).

---

## Troubleshooting

<Troubleshoot
  issue="Linux JVM CPU stress fault could not attach to target JVM in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm PID or STARTUP_COMMAND resolves to a running Java process and that the LCI service has permission to attach (same user namespace, no AppArmor block). Set JAVA_HOME explicitly to the JDK matching the target JVM."
/>

<Troubleshoot
  issue="No measurable CPU rise inside the JVM"
  mode="docs"
  fallback="Confirm CPU is greater than 0. If the JVM is cgroup-restricted to one core, only one busy thread runs at a time. Increase CPU or run the JVM with more cores."
/>

<Troubleshoot
  issue="CPU stayed elevated after the experiment ended"
  mode="docs"
  fallback="If the Byteman rule was not removed, list rules with sudo $JAVA_HOME/bin/bmtool -p <PORT> -l and remove with -u <rule>. If the rule cannot be removed, restart the target JVM to clear all injected rules."
/>

---

## Related faults

- [Linux JVM memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-memory-stress): Stress JVM heap or stack instead of CPU.
- [Linux JVM trigger GC](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-trigger-gc): Force GC events instead of CPU pressure.
- [Linux CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-cpu-stress): Stress CPU on the whole host instead of one JVM.
