---
id: vmware-service-stop
title: VMware service stop
sidebar_label: VMware Service Stop
description: Stop one or more services inside a Linux VMware VM for a configurable duration so you can test how the workload behaves when a managed service is down.
keywords:
  - chaos engineering
  - vmware service stop
  - vmware fault
  - service resilience
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-service-stop
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-service-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware service stop is a VMware chaos fault that stops the services listed in `SERVICE_NAME` (comma-separated systemd unit names) on the Linux VM `VM_NAME` for `TOTAL_CHAOS_DURATION` seconds, then optionally restarts them based on `SELF_HEALING_SERVICES`. Use `SERVICE_EXIT_TYPE=graceful` for a normal stop or `forceful` for a hard kill. The fault uses VMware Tools (Guest Operations API) to act inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when a critical service is down: whether dependent services degrade gracefully, whether load balancers route around the outage, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Service outage:** When the service is stopped, does the workload route around the outage inside the SLO?
- **Health-check fidelity:** Do health checks fail correctly when the service is down?
- **Recovery time:** When the service is restarted, how long until the workload is healthy again?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **vCenter reachable:** The chaos infrastructure can reach `GOVC_URL` over port 443.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **Service management permissions:** `VM_USER_NAME` can stop and start `SERVICE_NAME` (typically requires `sudo systemctl stop|start <unit>`).
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs with `systemd` (any distro with VMware Tools) | Supported |
| Linux VMs with other init systems (`upstart`, `sysvinit`) | Partial: the fault uses `systemctl` by default; adapt to your environment |
| Windows VMs | Not supported (use [Windows service stop](/docs/chaos-engineering/faults/chaos-faults/windows/windows-process-kill)) |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs Guest Operations (Program execution, Modifications, Queries).

**On the guest OS.** `VM_USER_NAME` must be able to run `systemctl stop <unit>` and `systemctl start <unit>`.

---

## Authentication

| Layer | Tunables |
| --- | --- |
| vCenter | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE` |
| Guest OS | `VM_USER_NAME`, `VM_PASSWORD` |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |
| `SERVICE_NAME` | Comma-separated list of systemd unit names to stop. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_EXIT_TYPE` | `graceful` (normal stop) or `forceful` (hard kill). | `graceful` |
| `SELF_HEALING_SERVICES` | If `enable`, the fault explicitly restarts the service at the end. Set to `disable` when an external supervisor restarts it. | `disable` |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between iterations. | `10` |
| `SEQUENCE` | `parallel` or `serial` when multiple services are targeted. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**vCenter authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GOVC_URL` | vCenter server URL. | `""` |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. | `""` |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. | `true` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, runs `systemctl stop <SERVICE_NAME>` (or a forceful equivalent when `SERVICE_EXIT_TYPE=forceful`), waits `TOTAL_CHAOS_DURATION` seconds, and starts the service again when `SELF_HEALING_SERVICES=enable`.

---

## Expected behavior during fault execution

- The targeted service is stopped on `VM_NAME` for the chaos window.
- Dependent workloads see connection failures or unhealthy health checks.
- After the duration ends, the service is restarted (either by the fault when `SELF_HEALING_SERVICES=enable`, or by an external supervisor).

:::info When the fault ends
If `SELF_HEALING_SERVICES=enable`, the chaos pod runs `systemctl start <SERVICE_NAME>` to restore the service. Otherwise, recovery depends on an external supervisor or the user.
:::

### Signals to watch

- **Service up:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `systemctl is-active <unit>` and assert the service returns to `active`.
- **Workload health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **SSH into the VM during the chaos window.**

   ```bash
   systemctl status <SERVICE_NAME>
   ```

   The service should be `inactive (dead)` during the window.

2. **After the fault ends, confirm recovery.**

   ```bash
   systemctl status <SERVICE_NAME>
   ```

   The service should be back to `active (running)`.

---

## Recovery and cleanup

- **Auto-restart:** With `SELF_HEALING_SERVICES=enable`, the chaos pod restarts the service.
- **Abort:** Stopping the experiment from Chaos Studio also triggers the restart when `SELF_HEALING_SERVICES=enable`.
- **Manual recovery:** SSH into the VM and run `sudo systemctl start <SERVICE_NAME>` if the service is still stopped.

---

## Limitations

- **Systemd-centric:** The fault expects `systemctl`. Non-systemd init systems may need a custom approach.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.
- **No mid-flight resize:** Adjusting `SERVICE_NAME` or `SERVICE_EXIT_TYPE` mid-run is not supported; abort and re-run.
- **Single VM per run:** Each fault run targets one `VM_NAME`.

---

## Troubleshooting

<Troubleshoot
  issue="VMware service stop fails with unit not found in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify the exact systemd unit name with systemctl list-units --type=service inside the VM. SERVICE_NAME must match the unit name (with or without .service suffix as systemctl accepts both)."
/>

<Troubleshoot
  issue="Service did not restart after fault ended"
  mode="docs"
  fallback="If SELF_HEALING_SERVICES=disable, the fault relies on an external supervisor to restart the service. Either set SELF_HEALING_SERVICES=enable or restart the service manually with sudo systemctl start <SERVICE_NAME>."
/>

---

## Related faults

- [VMware process kill](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-process-kill): Kill a process by PID instead of stopping a systemd unit.
