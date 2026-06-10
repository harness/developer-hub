---
id: linux-service-restart
title: Linux service restart
sidebar_label: Linux Service Restart
description: Stop and restart systemd services on a target Linux machine for a configurable duration so you can test how the workload behaves when a service flaps.
keywords:
  - chaos engineering
  - linux service restart
  - linux fault
  - resource chaos
tags:
  - chaos-engineering
  - linux-faults
  - resource-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-service-restart
- /docs/chaos-engineering/chaos-faults/linux/linux-service-restart
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux service restart is a chaos fault that stops the systemd services in `SERVICES` on the target Linux machine and then starts them again after `INTERVAL`, repeating the stop-start cycle for `DURATION`. Multiple services run in `parallel` or `serial` based on `SEQUENCE`. When `SELF_HEALING_SERVICES` is `true`, the fault relies on systemd auto-restart instead of explicitly starting the services. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when a critical service flaps: whether dependents reconnect cleanly, whether work-in-progress is recovered, whether monitoring detects the down/up transitions, and whether systemd auto-restart kicks in within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Restart resilience:** Does the service come back cleanly after a stop, or does it leave stale state behind?
- **Dependent behavior:** Do clients reconnect cleanly when the service flaps, or do connections pile up?
- **Self-healing:** With `SELF_HEALING_SERVICES=true`, does systemd auto-restart trigger within the expected window?
- **Monitoring fidelity:** Do alerts on `node_systemd_unit_state` and end-to-end availability fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target services exist:** Each entry in `SERVICES` is a systemd unit visible to `systemctl status <name>` on the target VM.
- **systemd present:** The fault uses `systemctl` to stop and start services.

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

This fault is classified as an **Advanced** Linux fault. It requires the Linux Chaos Infrastructure systemd service to run with the root user and root user group on the target VM so it can manage systemd units. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux service restart to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICES` | Comma-separated list of systemd services to restart (for example, `nginx.service,postgresql.service`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `SEQUENCE` | Execution order for multiple services. Accepts `parallel` (stop all then start all) or `serial` (one at a time). | `parallel` |
| `SELF_HEALING_SERVICES` | When `true`, the fault stops services and relies on systemd auto-restart instead of explicitly starting them. Useful for testing systemd `Restart=on-failure`. | `false` |
| `INTERVAL` | Time between stop and start cycles for each service. Accepts `[hours]h[minutes]m[seconds]s`. | `30s` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Stops each service in `SERVICES` (in `parallel` or `serial`), waits `INTERVAL`, then starts the service. Repeats until `DURATION` ends. With `SELF_HEALING_SERVICES=true`, the fault stops the services and lets systemd auto-restart handle the recovery.

---

## Expected behavior during fault execution

- Each target service transitions to `inactive` (or `failed`) after the stop, then back to `active` after the start.
- `systemctl status <service>` reports the down/up cycles.
- Application clients connected to the service see connection resets during the stop window; reconnects succeed after start.
- After the duration ends, the services are left in their started state.

:::info When the fault ends
The chaos pod stops the start-stop loop when `DURATION` elapses. Services are left in their started state. If `SELF_HEALING_SERVICES=true`, the fault relies on systemd to bring them back; verify with `systemctl status <service>`.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Service state:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_systemd_unit_state{name="<service>"}` and assert the active/inactive flips happened.
- **Restart count:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `systemctl show <service> -p NRestarts` and assert it incremented.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint served by the service.

---

## Verify the fault execution effect

1. **Inspect the service state during chaos.**

   ```bash
   sudo systemctl status <service>
   sudo systemctl show <service> -p ActiveState,SubState,NRestarts
   ```

   The active/inactive transitions and the `NRestarts` counter should reflect the chaos cycles.

2. **Tail the service journal.**

   ```bash
   sudo journalctl -u <service> --since "5 minutes ago" --no-pager
   ```

   Look for stop and start markers for each cycle.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the cycle loop when `DURATION` elapses. The last action is a start, so services are left running (unless `SELF_HEALING_SERVICES=true`).
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops the cycle loop and attempts a final start.
- **Manual recovery:** If a service is left in `inactive` or `failed` after the fault, start it manually with `sudo systemctl start <service>` and investigate the journal.
- **Workload recovery:** Clients reconnect on the next attempt; any work-in-progress lost during the stop window must be reconciled by the application.

---

## Limitations

- **systemd only:** The fault uses `systemctl`. SysV-init or other process supervisors are not directly supported.
- **Single VM scope:** Each fault run targets one VM.
- **Service typo:** A non-existent service in `SERVICES` causes the fault to fail without affecting valid entries.
- **Self-kill safeguard:** Targeting `linux-chaos-infrastructure.service` will sever the fault's connection to the control plane and is not allowed in practice.
- **Parallel sequence:** With `SEQUENCE=parallel`, all services are stopped at the same time, which can cascade failures across dependents.

---

## Troubleshooting

<Troubleshoot
  issue="Linux service restart fault failed with unit not found in Harness Chaos Engineering"
  mode="docs"
  fallback="One of the SERVICES entries does not exist on the target VM. Verify with sudo systemctl list-units --all | grep <name>. Use the full unit name including the .service suffix (for example, nginx.service)."
/>

<Troubleshoot
  issue="Service did not restart with SELF_HEALING_SERVICES=true"
  mode="docs"
  fallback="systemd auto-restart only triggers when the unit has Restart=on-failure (or always) configured. Verify with sudo systemctl show <service> -p Restart. If unset, set SELF_HEALING_SERVICES=false to let the fault start the service explicitly."
/>

<Troubleshoot
  issue="Service left in failed state after the experiment"
  mode="docs"
  fallback="The service may have failed to start cleanly. Inspect with sudo systemctl status <service> and sudo journalctl -u <service> --since '5 minutes ago'. Reset and restart with sudo systemctl reset-failed <service> && sudo systemctl start <service>."
/>

---

## Related faults

- [Linux process kill](/docs/chaos-engineering/faults/chaos-faults/linux/linux-process-kill): Kill the underlying process without involving systemd.
- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Disrupt the service via the network instead of restarting it.
- [Linux CPU stress](/docs/chaos-engineering/faults/chaos-faults/linux/linux-cpu-stress): Slow the service via CPU starvation instead of restarting it.
