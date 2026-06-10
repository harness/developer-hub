---
id: linux-memory-stress
title: Linux memory stress
sidebar_label: Linux Memory Stress
description: Consume memory on a target Linux machine for a configurable duration so you can test how the workload behaves under memory pressure and OOM conditions.
keywords:
  - chaos engineering
  - linux memory stress
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-memory-stress
- /docs/chaos-engineering/chaos-faults/linux/linux-memory-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux memory stress is a chaos fault that allocates `MEMORY` of memory across `WORKERS` workers on the target Linux machine for `DURATION`, then frees the memory back to the system. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when free memory shrinks: whether applications swap or get OOM-killed, whether monitoring detects the pressure within the alerting SLA, whether the kernel's OOM killer targets the right process, and whether downstream consumers degrade gracefully when callers crash.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Memory headroom:** When `MEMORY` of additional memory is consumed by `WORKERS` workers, does the application stay inside its latency SLA?
- **OOM behavior:** Does the kernel OOM killer target the chaos workers or the application process when the host runs out of memory?
- **Monitoring fidelity:** Do alerts on memory pressure, swap usage, and `node_memory_MemAvailable_bytes` fire within the alerting SLA?
- **Caller behavior:** Do upstream callers degrade gracefully when the function under test slows down due to GC pressure or swap?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Memory headroom for chaos:** The VM has enough free memory and swap to absorb `WORKERS x MEMORY` (or sufficient swap to back the allocation without an OOM kill, if that is not the intent).
- **stress-ng available:** The fault uses [`stress-ng`](https://github.com/ColinIanKing/stress-ng), which is installed by the LCI installer.

---

## Supported environments

The fault has been tested on the following Linux distributions. Go to [Linux fault requirements](/docs/chaos-engineering/faults/chaos-faults/linux/permissions) to see the full compatibility matrix.

| Platform | Support status |
| --- | --- |
| Ubuntu 16+, Debian 10+ | Supported |
| CentOS 7+, RHEL 7+, Fedora 30+ | Supported |
| openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+ | Supported |
| Architectures | x86_64, arm64 (matches the LCI agent installer) |

---

## Permissions required

This fault is classified as a **Basic** Linux fault. It runs with the privileges of the Linux Chaos Infrastructure systemd service (root user and root user group) on the target VM. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux memory stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`, `1h3m2s`). | `30s` |
| `MEMORY` | Memory to consume per worker. Accepts absolute values (for example, `256m`, `1g`) or a percentage of total memory (for example, `50%`). | `256m` |
| `WORKERS` | Number of memory workers to start. Total memory consumed is approximately `WORKERS x MEMORY`. | `1` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Spawns `WORKERS` `stress-ng` memory workers each allocating `MEMORY` for `DURATION`, then releases the memory back to the system.

---

## Expected behavior during fault execution

- Memory utilization on the target VM rises by approximately `WORKERS x MEMORY`.
- `MemAvailable` decreases; swap usage may rise if the host is configured with swap.
- If total allocation exceeds host memory and swap, the kernel OOM killer may terminate the largest memory consumer.
- After the duration ends, the workers exit and memory returns to baseline.

:::info When the fault ends
The chaos workers exit when `DURATION` elapses and the allocated memory is freed back to the system. Page cache may take time to re-warm.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Memory utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_memory_MemAvailable_bytes` and assert it dropped during the chaos window.
- **OOM events:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to scan `dmesg` for `Out of memory: Killed process` entries on the target VM.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint and assert p95/p99 stays inside the SLA.

---

## Verify the fault execution effect

While the experiment is running, confirm memory was consumed and then released:

1. **Observe live memory on the target VM.**

   ```bash
   free -m
   vmstat 1 5
   ```

   `used` rises by approximately `WORKERS x MEMORY` during the chaos window and returns to baseline afterwards.

2. **List the chaos workers.**

   ```bash
   ps -ef | grep -E "stress-ng" | grep -v grep
   ```

   The workers exit when the chaos duration ends.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the configured memory and worker count, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos workers exit when `DURATION` elapses; memory returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio signals the chaos workers to exit.
- **Manual recovery:** If a worker survives an abort, kill it with `sudo pkill -f stress-ng` on the target VM.
- **OOM kill recovery:** If the kernel OOM killer terminated the application instead of a chaos worker, restart the application service (`sudo systemctl restart <service>`).

---

## Limitations

- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **Allocation only:** The fault allocates memory but does not exercise specific memory access patterns; for pattern-driven tests use `stress-ng` directly.
- **OOM is process-wide:** If the kernel OOM killer fires, it may pick the application process instead of a chaos worker; size `MEMORY` accordingly.
- **No mid-flight resize:** The configured memory cannot be changed during the chaos window; abort and re-run the experiment to adjust.

---

## Troubleshooting

<Troubleshoot
  issue="Linux memory stress fault shows no measurable memory rise in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the linux-chaos-infrastructure systemd service is active on the target VM and the infrastructure is in CONNECTED state. Check that MEMORY is a valid value (for example, 256m, 50%, 1g) and that WORKERS is at least 1."
/>

<Troubleshoot
  issue="OOM killer terminated the application instead of the chaos worker"
  mode="docs"
  fallback="The OOM killer scores processes by memory footprint; large applications can be picked over the chaos workers. Reduce MEMORY to leave more headroom or tune oom_score_adj on the application process if you intend the chaos workers to be the OOM target."
/>

<Troubleshoot
  issue="Memory stays elevated after the experiment ends"
  mode="docs"
  fallback="If stress-ng workers survive an abort, kill them with sudo pkill -f stress-ng on the target VM. The kernel may keep memory in page cache after release; this is normal and is reclaimed on demand."
/>

---

## Related faults

- [Linux CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-cpu-stress): Apply CPU stress instead of memory.
- [Linux JVM memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-memory-stress): Apply memory pressure inside a target Java process instead of the whole VM.
- [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill): Consume disk space instead of memory.
