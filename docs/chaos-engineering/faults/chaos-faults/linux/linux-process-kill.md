---
id: linux-process-kill
title: Linux process kill
sidebar_label: Linux Process Kill
description: Kill target processes on a Linux machine for a configurable duration so you can test how the workload behaves when a critical process disappears.
keywords:
  - chaos engineering
  - linux process kill
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-process-kill
- /docs/chaos-engineering/chaos-faults/linux/linux-process-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux process kill is a chaos fault that terminates processes matching `PROCESS_IDS`, `PROCESS_NAMES`, or `PROCESS_COMMAND` on the target Linux machine. Termination uses `SIGTERM` by default, or `SIGKILL` when `FORCE_KILL` is `true`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when a critical process disappears: whether the system restarts it via systemd or a supervisor, whether dependent services degrade gracefully, whether work-in-progress is recovered cleanly, and whether monitoring detects the absence within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Restart resilience:** When a target process is killed, does systemd (or the supervisor) restart it within the expected window?
- **Graceful shutdown:** Does the process honor `SIGTERM` and shut down cleanly, or does it leak files, sockets, or locks?
- **Force-kill recovery:** With `FORCE_KILL=true`, does the application recover from an abrupt termination without data loss?
- **Monitoring fidelity:** Do alerts on process absence and service unavailability fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **At least one selector provided:** Provide at least one of `PROCESS_IDS`, `PROCESS_NAMES`, or `PROCESS_COMMAND`. With none set, the fault has no targets and exits.

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

Configure the following fault parameters when you add Linux process kill to an experiment in Chaos Studio. Defaults are shown for reference. Provide at least one of `PROCESS_IDS`, `PROCESS_NAMES`, or `PROCESS_COMMAND`.

**Process selectors (provide at least one)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PROCESS_IDS` | Comma-separated process IDs to kill (for example, `1234,5678`). | `""` |
| `PROCESS_NAMES` | Comma-separated process names to match (for example, `nginx,httpd`). | `""` |
| `PROCESS_COMMAND` | Substring of the command line used to select target processes. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`). During the duration, the fault repeatedly kills matching processes that respawn. | `30s` |
| `FORCE_KILL` | Send `SIGKILL` (`true`) instead of `SIGTERM` (`false`). `SIGTERM` lets the process clean up; `SIGKILL` is immediate and cannot be trapped. | `false` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Resolves the target processes from `PROCESS_IDS`/`PROCESS_NAMES`/`PROCESS_COMMAND` and sends `SIGTERM` (or `SIGKILL` if `FORCE_KILL` is `true`) for `DURATION`. Processes that respawn within the duration are killed again.

---

## Expected behavior during fault execution

- Matching processes receive the configured signal and terminate.
- If a supervisor (systemd, runit, monit, custom script) restarts the process, the fault kills it again until the duration ends.
- Application clients connected to the process see connection resets or timeouts.
- After the duration ends, no more kill signals are sent; the process can stay running on the next respawn.

:::info When the fault ends
The chaos pod stops sending kill signals when `DURATION` elapses. The targeted process can run normally on the next respawn.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Process presence:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `pgrep -f <name>` and assert the PID changed (indicating restart).
- **Service availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint served by the process.
- **Restart metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on systemd `node_systemd_unit_state` or application restart counters.

---

## Verify the fault execution effect

1. **Confirm the process was killed.**

   ```bash
   pgrep -f <process-name-or-command>
   sudo systemctl status <service>
   ```

   The PID should change (or the service report a restart) during the chaos window.

2. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the resolved targets and the kill signal sent.

3. **Check the service log for graceful-shutdown evidence.**

   ```bash
   sudo journalctl -u <service> --since "5 minutes ago" --no-pager
   ```

   With `SIGTERM`, you should see clean shutdown logs; with `SIGKILL`, the process stops without farewell entries.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops killing the process when `DURATION` elapses. The supervisor restarts the process on the next attempt.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops the kill loop.
- **Manual recovery:** If the process did not restart automatically (no supervisor), restart it manually with `sudo systemctl start <service>` or the appropriate command.
- **Workload recovery:** Clients that lost their connections must reconnect; any work-in-progress lost on a `SIGKILL` must be reconciled by the application.

---

## Limitations

- **Selector dependency:** A typo in `PROCESS_NAMES` or `PROCESS_COMMAND` results in no targets and no chaos.
- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **Self-kill safeguard:** The fault cannot reliably kill the LCI service itself; if your selector matches the LCI process, the fault may abort early.
- **Supervisor dependency:** Without a supervisor, killed processes stay dead until you start them manually.
- **No data recovery:** `SIGKILL` may leave open files, lock files, or in-memory state in an inconsistent state; recovery is application-specific.

---

## Troubleshooting

<Troubleshoot
  issue="Linux process kill fault did not kill any process in Harness Chaos Engineering"
  mode="docs"
  fallback="The selectors did not match any running process. Verify with pgrep -f <PROCESS_NAMES> or pgrep -f <PROCESS_COMMAND> on the target VM. Also confirm at least one of PROCESS_IDS, PROCESS_NAMES, or PROCESS_COMMAND is set."
/>

<Troubleshoot
  issue="Process keeps respawning before the fault ends"
  mode="docs"
  fallback="This is expected: the fault kills matching processes throughout DURATION. The supervisor restarts them and the fault kills them again. Increase DURATION to extend the disruption window or use FORCE_KILL=true if SIGTERM is not enough."
/>

<Troubleshoot
  issue="Process did not restart after the experiment ended"
  mode="docs"
  fallback="If no supervisor is configured (no systemd unit, no runit/monit script), the process will stay dead. Start it manually with sudo systemctl start <service> or the appropriate command and configure a supervisor for future runs."
/>

---

## Related faults

- [Linux service restart](/docs/chaos-engineering/faults/chaos-faults/linux/linux-service-restart): Stop and restart a systemd service end-to-end instead of killing a process.
- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Disrupt the process via the network instead of killing it.
- [Linux CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-cpu-stress): Slow down the process via CPU starvation instead of killing it.
