---
id: linux-disk-io-stress
title: Linux disk I/O stress
sidebar_label: Linux Disk IO Stress
description: Apply disk I/O load to a target Linux machine for a configurable duration so you can test how the workload behaves when disk bandwidth is saturated.
keywords:
  - chaos engineering
  - linux disk io stress
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-disk-io-stress
- /docs/chaos-engineering/chaos-faults/linux/linux-disk-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux disk I/O stress is a chaos fault that runs `WORKERS` I/O workers that consume `FILE_SYSTEM_UTILISATION` of the filesystem at `VOLUME_MOUNT_PATH` on the target Linux machine for `DURATION`, then stops the workers and frees the I/O bandwidth. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when disk I/O slows down: whether application latency stays inside the SLA when reads and writes are slower, whether the database under test maintains throughput, whether noisy-neighbour effects appear on co-located processes, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **I/O headroom:** When `WORKERS` workers saturate `FILE_SYSTEM_UTILISATION` of the volume, does the application stay inside its latency SLA?
- **Database resilience:** Does the database surface clean degradation under I/O contention, or does it crash or hang?
- **Noisy neighbour:** Do other processes on the same disk degrade when the chaos workers consume their share of I/O bandwidth?
- **Monitoring fidelity:** Do alerts on `node_disk_io_time_seconds_total` and disk saturation fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target volume exists:** `VOLUME_MOUNT_PATH` is mounted and writable by the LCI service. Leave empty to stress the default volume.
- **stress-ng available:** The fault uses [`stress-ng`](https://github.com/ColinIanKing/stress-ng), which is installed by the LCI installer.

---

## Supported environments

The fault has been tested on the following Linux distributions. Go to [Linux fault requirements](/docs/chaos-engineering/faults/chaos-faults/linux/permissions) to see the full compatibility matrix.

| Platform | Support status |
| --- | --- |
| Ubuntu 16+, Debian 10+ | Supported |
| CentOS 7+, RHEL 7+, Fedora 30+ | Supported |
| openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+ | Supported |

---

## Permissions required

This fault is classified as a **Basic** Linux fault. It runs with the privileges of the Linux Chaos Infrastructure systemd service (root user and root user group) on the target VM. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux disk I/O stress to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`, `1h3m2s`). | `30s` |
| `FILE_SYSTEM_UTILISATION` | Filesystem utilization to apply per worker. Accepts absolute values (for example, `256m`, `1g`) or a percentage of the volume (for example, `10%`). | `10%` |
| `VOLUME_MOUNT_PATH` | Volume mount path on which to apply the I/O stress. Leave empty to use the default volume. | `""` |
| `WORKERS` | Number of disk I/O workers to start. | `1` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Spawns `WORKERS` `stress-ng` I/O workers that exercise `FILE_SYSTEM_UTILISATION` of `VOLUME_MOUNT_PATH` for `DURATION`, then stops the workers.

---

## Expected behavior during fault execution

- Disk I/O on the target volume rises sharply; `iostat` reports elevated `%util`, await, and IOPS.
- Application reads and writes on the same volume slow down in proportion to their I/O share.
- Other processes co-located on the volume experience degraded I/O latency.
- After the duration ends, the workers exit and I/O returns to baseline.

:::info When the fault ends
The chaos workers exit when `DURATION` elapses. Disk I/O returns to baseline immediately.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Disk utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `rate(node_disk_io_time_seconds_total[1m])` and assert it rose during the chaos window.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises a read or write path.
- **Database throughput:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to assert the database under test maintains acceptable QPS.

---

## Verify the fault execution effect

While the experiment is running, confirm I/O was saturated and then released:

1. **Observe live disk I/O.**

   ```bash
   iostat -xz 1 5
   iotop -bn1 | head -20
   ```

   You should see elevated `%util` and high I/O bandwidth from the `stress-ng` workers during the chaos window.

2. **List the chaos workers.**

   ```bash
   ps -ef | grep -E "stress-ng" | grep -v grep
   ```

   The workers exit when the chaos duration ends.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the worker count, the target volume, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos workers exit when `DURATION` elapses; I/O returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio signals the chaos workers to exit.
- **Manual recovery:** If a worker survives an abort, kill it with `sudo pkill -f stress-ng` on the target VM.
- **Workload recovery:** Applications resume normal I/O throughput as soon as the workers exit.

---

## Limitations

- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **Bandwidth-only stress:** The fault saturates I/O bandwidth; it does not exhaust filesystem capacity (use [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill) for that).
- **Volume dependent:** Effectiveness depends on the volume's baseline IOPS and bandwidth. On large NVMe disks the workers may need to be increased to produce a measurable effect.
- **Worker scaling:** Spawning many workers may saturate CPU before disk bandwidth on small instances.

---

## Troubleshooting

<Troubleshoot
  issue="Linux disk I/O stress fault shows no measurable I/O rise in Harness Chaos Engineering"
  mode="docs"
  fallback="On fast volumes (NVMe, SSD), a single worker may not saturate the disk. Increase WORKERS or FILE_SYSTEM_UTILISATION and verify with iostat -xz 1 that %util rises. Also confirm the linux-chaos-infrastructure systemd service is active and CONNECTED."
/>

<Troubleshoot
  issue="VOLUME_MOUNT_PATH not writable"
  mode="docs"
  fallback="The path must be writable by the linux-chaos-infrastructure service (which runs as root). Verify with sudo test -w VOLUME_MOUNT_PATH. Leave the field empty to fall back to the default volume."
/>

<Troubleshoot
  issue="CPU is saturated before disk during the experiment"
  mode="docs"
  fallback="On small VMs, many stress-ng I/O workers may saturate CPU first. Reduce WORKERS or run on a larger VM. Use top or mpstat to confirm whether CPU is the bottleneck."
/>

---

## Related faults

- [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill): Fill the disk instead of stressing I/O bandwidth.
- [Linux memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-memory-stress): Apply memory pressure instead of I/O.
- [Linux fs fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-fs-fill): Fill a filesystem path with a smaller tunable surface.
