---
id: linux-cpu-stress
title: Linux CPU stress
sidebar_label: Linux CPU Stress
description: Apply CPU load to a target Linux machine for a configurable duration so you can test how the workload behaves when compute is starved.
keywords:
  - chaos engineering
  - linux cpu stress
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-cpu-stress
- /docs/chaos-engineering/chaos-faults/linux/linux-cpu-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux CPU stress is a chaos fault that runs `WORKERS` busy workers at `LOAD` percent utilization each on the target Linux machine for `DURATION`, then stops the workers and frees the CPU. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM and consumes CPU cycles in the same process tree.

Use this fault to test how a workload behaves when compute headroom shrinks: whether application latency stays inside the SLA, whether autoscaling reacts on CPU pressure, whether noisy-neighbour effects appear on other processes on the same VM, and whether monitoring detects the load within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU headroom:** When `WORKERS` cores are pinned at `LOAD`%, does the application stay inside its latency SLA?
- **Autoscaling fidelity:** Do CPU-driven autoscaling rules (VM autoscaler, custom scripts) trigger within the alerting SLA?
- **Noisy neighbour:** Do other processes co-located on the same VM degrade when the chaos workers consume their share?
- **Throttling and back-pressure:** Do upstream callers honor back-pressure when the function under test slows down?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **CPU headroom for chaos:** The VM has at least `WORKERS` available cores. Pinning more workers than the host has cores still works but does not increase total load.
- **stress-ng available:** The fault uses [`stress-ng`](https://github.com/ColinIanKing/stress-ng), which is installed by the LCI installer. No manual install is required.

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

Configure the following fault parameters when you add Linux CPU stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`, `1h3m2s`). | `30s` |
| `LOAD` | CPU load percentage to apply per worker (0 to 100). A value of `0` is treated as full load (100%). | `0` |
| `WORKERS` | Number of CPU workers to stress. Each worker pins one core at `LOAD` percent utilization. | `1` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Spawns `WORKERS` `stress-ng` workers at `LOAD` percent utilization for `DURATION`, then stops the workers and releases CPU back to the system.

---

## Expected behavior during fault execution

- CPU utilization on the target VM rises by approximately `WORKERS x LOAD` percent for the duration of the fault.
- Application processes co-located on the VM slow down in proportion to their CPU share.
- CPU-driven monitoring (`cpu_user`, `cpu_system`, `node_cpu_seconds_total{mode!="idle"}`) reports the elevated utilization.
- After the duration ends, the workers exit and CPU returns to baseline.

:::info When the fault ends
The chaos workers exit when `DURATION` elapses. CPU returns to baseline immediately; no rollback is required.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **CPU utilization on the VM:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_cpu_seconds_total` (rate over the chaos window) and assert it rises by the expected amount.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint and assert p95/p99 stays inside the SLA.
- **Autoscaling:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to verify the autoscaler added the expected capacity.

---

## Verify the fault execution effect

While the experiment is running, confirm CPU was loaded and then released:

1. **Observe live CPU on the target VM.**

   ```bash
   top -bn1 | head -5
   mpstat -P ALL 1 5
   ```

   You should see `WORKERS` worker cores pinned near the configured `LOAD` percent.

2. **List the chaos workers.**

   ```bash
   ps -ef | grep -E "stress-ng" | grep -v grep
   ```

   The workers exit when the chaos duration ends.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the worker count, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos workers exit when `DURATION` elapses; CPU returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio signals the chaos workers to exit.
- **Manual recovery:** If a worker survives an abort, kill it with `sudo pkill -f stress-ng` on the target VM.
- **Workload recovery:** Application processes resume normal CPU share as soon as the workers exit.

---

## Limitations

- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **Worker pinning:** `WORKERS` is honored but pinning more workers than the host has cores does not increase total load beyond 100% per core.
- **Time-bounded only:** The fault is duration-based; there is no signal-driven exit before `DURATION` ends (other than aborting the experiment).
- **Same process tree:** Workers run inside the LCI service tree. If the LCI service is killed mid-experiment, the workers exit with it.

---

## Troubleshooting

<Troubleshoot
  issue="Linux CPU stress fault shows no measurable CPU rise in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the linux-chaos-infrastructure systemd service is active on the target VM and the infrastructure is in CONNECTED state in Chaos Studio. Then verify LOAD is greater than 0 (or left at the default of 0 which maps to 100%) and that WORKERS is at least 1."
/>

<Troubleshoot
  issue="stress-ng not found"
  mode="docs"
  fallback="stress-ng is installed by the Linux Chaos Infrastructure installer. Re-run the installer or install it manually with the distro package manager (for example, sudo apt install stress-ng on Ubuntu)."
/>

<Troubleshoot
  issue="CPU stays elevated after the experiment ends"
  mode="docs"
  fallback="If stress-ng workers survive an abort, kill them with sudo pkill -f stress-ng on the target VM and check the linux-chaos-infrastructure systemd service logs with sudo journalctl -u linux-chaos-infrastructure for the abort path."
/>

---

## Related faults

- [Linux memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-memory-stress): Apply memory stress instead of CPU.
- [Linux disk I/O stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-io-stress): Apply I/O stress to the disk.
- [Linux JVM CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-cpu-stress): Apply CPU stress inside a target Java process instead of the whole VM.
