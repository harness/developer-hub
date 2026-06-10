---
id: linux-time-chaos
title: Linux time chaos
sidebar_label: Linux Time Chaos
description: Skew the system clock on a target Linux machine for a configurable duration so you can test how the workload behaves when time jumps forward or backward.
keywords:
  - chaos engineering
  - linux time chaos
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-time-chaos
- /docs/chaos-engineering/chaos-faults/linux/linux-time-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux time chaos is a chaos fault that skews the system clock on the target Linux machine by `OFFSET` for `DURATION`, then restores the original time. When `DISABLE_NTP` is `true`, NTP synchronization is paused before the skew so the clock does not snap back; NTP is re-enabled during revert. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when time jumps unexpectedly: whether short-lived TLS certificates are rejected, whether HMAC/JWT validation surfaces clean errors, whether scheduled jobs misfire, whether database transactions and replication tolerate the skew, and whether monitoring detects the drift within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Certificate validation:** When the clock jumps forward by `OFFSET`, do TLS certificates that just expired fail cleanly?
- **JWT/HMAC tolerance:** Are JWTs or HMAC tokens rejected for `iat`/`exp` skew, and does the application surface a clear error?
- **Scheduled jobs:** Do cron, systemd timers, or quartz schedulers double-fire (or skip) when time jumps?
- **Database safety:** Does the database/replication layer tolerate the time skew, or does it abort transactions with "clock went backwards" errors?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **NTP daemon controllable:** When `DISABLE_NTP=true`, the fault stops and restarts `systemd-timesyncd`, `chronyd`, or `ntpd`. Confirm one of these is the active time sync daemon with `timedatectl status`.

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

This fault is classified as an **Advanced** Linux fault. It requires the Linux Chaos Infrastructure systemd service to run with the root user and root user group on the target VM so it can call `date` (or `clock_settime`) and manage the NTP daemon. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux time chaos to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `OFFSET` | Signed time offset to apply (for example, `+24h`, `-30m`, `+5m`). | `+24h` |
| `DISABLE_NTP` | Stop the NTP daemon before applying the skew (so NTP does not snap the clock back) and re-enable it during revert. | `true` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

(Optionally) stops the NTP daemon, sets the system clock to `now + OFFSET`, holds for `DURATION`, restores the original time, and re-enables the NTP daemon.

---

## Expected behavior during fault execution

- The system clock reports a time offset by `OFFSET` from real time for the duration of the fault.
- `date` and `timedatectl` reflect the skewed time.
- Applications that read the system clock (TLS, JWT, scheduled jobs, distributed coordination) see the skewed time.
- After the duration ends, the clock is set back to the (NTP-corrected or pre-fault) real time, and NTP resumes if it was disabled.

:::info When the fault ends
The chaos pod restores the original time and re-enables the NTP daemon. NTP-driven re-synchronization may take a few seconds to converge.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **System clock:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `date -u` on the target VM and assert the value is offset by `OFFSET`.
- **TLS errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on TLS-error counters for clients that hit certificate-expiry boundaries.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that depends on time (token validation, scheduling).

---

## Verify the fault execution effect

1. **Confirm the clock skew on the target VM.**

   ```bash
   date -u
   timedatectl status
   ```

   `date` reports a time offset by `OFFSET` during the chaos window and returns to real time afterwards.

2. **Confirm NTP state.**

   ```bash
   timedatectl status | grep -E "synchronized|NTP service"
   sudo systemctl status systemd-timesyncd chronyd ntpd 2>/dev/null | grep Active
   ```

   With `DISABLE_NTP=true`, NTP is inactive during the chaos window and active afterwards.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod sets the clock back and re-enables NTP when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same restore.
- **Manual recovery:** If the clock is left skewed, run `sudo timedatectl set-ntp true` and (on systemd-timesyncd) `sudo systemctl restart systemd-timesyncd` to force re-sync.
- **Workload recovery:** Applications that cached the skewed time should be restarted if they hold long-lived clock-derived state (for example, JWT issuance windows).

---

## Limitations

- **Forward skew is more disruptive:** A negative `OFFSET` may break monotonic-clock assumptions in some libraries and is the highest-risk variant.
- **NTP daemon dependency:** If the active NTP daemon is none of `systemd-timesyncd`, `chronyd`, or `ntpd`, the `DISABLE_NTP` toggle has no effect.
- **Single VM scope:** Each fault run targets one VM.
- **Snap-back risk:** With `DISABLE_NTP=false`, NTP may correct the skew within seconds, dampening the chaos effect.
- **Subsecond precision:** `OFFSET` is applied via `date`/`clock_settime`; subsecond drift relative to other machines is not controlled.

---

## Troubleshooting

<Troubleshoot
  issue="Linux time chaos fault did not skew the clock in Harness Chaos Engineering"
  mode="docs"
  fallback="If DISABLE_NTP=false, the NTP daemon may have snapped the clock back within seconds. Set DISABLE_NTP=true and re-run. Confirm with date -u that the clock is skewed during the chaos window."
/>

<Troubleshoot
  issue="NTP did not re-enable after the experiment"
  mode="docs"
  fallback="The fault restarts the NTP daemon during revert. If NTP is still off, enable it manually with sudo timedatectl set-ntp true and sudo systemctl start systemd-timesyncd (or chronyd/ntpd, whichever your distro uses)."
/>

<Troubleshoot
  issue="Application kept seeing the old time after the experiment"
  mode="docs"
  fallback="Some applications cache clock readings or derive deadlines from a wall clock at startup. Restart the application after the experiment to flush cached time-based state."
/>

---

## Related faults

- [Linux service restart](/docs/chaos-engineering/faults/chaos-faults/linux/linux-service-restart): Restart the application to flush time-derived state.
- [Linux DNS spoof](/docs/chaos-engineering/faults/chaos-faults/linux/linux-dns-spoof): Redirect dependencies instead of skewing time.
- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Add network latency instead of skewing time.
