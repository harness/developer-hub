---
id: linux-fs-fill
title: Linux fs fill
sidebar_label: Linux FS Fill
description: Fill a filesystem path on a target Linux machine to a configured size for a configurable duration so you can test how the workload behaves when storage runs out.
keywords:
  - chaos engineering
  - linux fs fill
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-fs-fill
- /docs/chaos-engineering/chaos-faults/linux/linux-fs-fill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux fs fill is a chaos fault that writes a file under `FILL_PATH` until it occupies `FILL_STORAGE` of space on the target Linux machine for `DURATION`, then removes the file and frees the space. It targets a filesystem path with a smaller tunable surface than [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill). The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when its writable storage fills up: whether the application surfaces a clean `ENOSPC` error or wedges, whether log rotation kicks in, whether monitoring detects low disk space within the alerting SLA, and whether the system recovers automatically once space is reclaimed.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Write paths under ENOSPC:** When `FILL_PATH` runs out of space, do application writes fail cleanly or wedge?
- **Log rotation:** Does logrotate (or equivalent) kick in and free space before the volume fills?
- **Monitoring fidelity:** Do disk-space alerts fire within the alerting SLA?
- **Recovery:** After the fill file is removed, do the application and monitoring return to baseline without a restart?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Writable target path:** `FILL_PATH` exists, is writable by the LCI service, and resides on a filesystem with enough headroom for `FILL_STORAGE`.

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

Configure the following fault parameters when you add Linux fs fill to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILL_PATH` | Absolute path where the fill file is created. Must exist and be writable by the LCI service. | (required) |
| `FILL_STORAGE` | Amount of storage to fill. Accepts absolute values (for example, `256m`, `1g`) or a percentage of the volume (for example, `50%`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`, `1h3m2s`). | `30s` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Writes a fill file under `FILL_PATH` until it occupies `FILL_STORAGE`, holds for `DURATION`, then deletes the file and frees the space.

---

## Expected behavior during fault execution

- Free space on the volume hosting `FILL_PATH` drops by approximately `FILL_STORAGE` for the duration of the fault.
- New writes by other processes on the same volume may fail with `ENOSPC` ("No space left on device") if the volume reaches 100%.
- Disk-space monitoring reports the reduced free space.
- After the duration ends, the fill file is removed and free space returns to baseline.

:::info When the fault ends
The chaos pod deletes the fill file. Free space returns immediately.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Disk space:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_filesystem_avail_bytes{mountpoint="<mount>"}` and assert it dropped during the chaos window.
- **Write errors:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to scan application logs for `ENOSPC` or "No space left on device" entries.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises a write path.

---

## Verify the fault execution effect

While the experiment is running, confirm the volume filled and was reclaimed:

1. **Observe free space on the target volume.**

   ```bash
   df -h <mount-of-FILL_PATH>
   ls -lh <FILL_PATH>
   ```

   Free space should drop by approximately `FILL_STORAGE` during the chaos window and return to baseline afterwards.

2. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the fill file path, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos pod deletes the fill file when `DURATION` elapses; free space returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the cleanup.
- **Manual recovery:** If the fill file survives an abort, remove it with `sudo rm <FILL_PATH>/<fill-file>` (the LCI logs record the exact filename).
- **Workload recovery:** Applications that experienced `ENOSPC` may need to be restarted if they cached the failure state.

---

## Limitations

- **Filesystem-level only:** The fault fills space at the filesystem level; it does not exhaust inodes.
- **One path per run:** A single experiment fills exactly one path on the target VM.
- **No data block tuning:** Unlike [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill), this fault does not expose `DATA_BLOCK_SIZE`; use disk fill for finer write control.
- **No mid-flight resize:** `FILL_STORAGE` cannot be adjusted during the chaos window; abort and re-run the experiment to change it.

---

## Troubleshooting

<Troubleshoot
  issue="Linux fs fill fault fails with no such file or directory in Harness Chaos Engineering"
  mode="docs"
  fallback="FILL_PATH must exist on the target VM and be writable by the linux-chaos-infrastructure service. Verify with sudo test -w FILL_PATH and create the directory if missing with sudo mkdir -p FILL_PATH."
/>

<Troubleshoot
  issue="Volume did not fill to the configured FILL_STORAGE"
  mode="docs"
  fallback="If the volume has less free space than FILL_STORAGE, the fault fills to whatever is available. Reduce FILL_STORAGE or run df -h to confirm headroom before the experiment."
/>

<Troubleshoot
  issue="Disk space stays low after the experiment ends"
  mode="docs"
  fallback="If the fill file was not removed (for example, the experiment aborted ungracefully), delete it manually with sudo rm FILL_PATH/<fill-file>. The exact filename is recorded in sudo journalctl -u linux-chaos-infrastructure logs."
/>

---

## Related faults

- [Linux disk fill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-fill): Same intent with extra tunables for data block size.
- [Linux disk I/O stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-disk-io-stress): Stress disk I/O bandwidth instead of capacity.
- [Linux memory stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-memory-stress): Consume memory instead of disk space.
