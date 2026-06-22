---
id: windows-blackhole-chaos
title: Windows blackhole chaos
sidebar_label: Windows Blackhole Chaos
description: Block all network traffic to selected destination hosts or IP addresses from a Windows VM so you can test how the workload behaves during a network blackout.
keywords:
  - chaos engineering
  - windows blackhole chaos
  - windows fault
  - network chaos
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-network-blackhole-chaos
- /docs/chaos-engineering/chaos-faults/windows/windows-network-blackhole-chaos
- /docs/chaos-engineering/faults/chaos-faults/windows/windows-network-blackhole-chaos
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-blackhole-chaos
- /docs/chaos-engineering/chaos-faults/windows/windows-blackhole-chaos
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-blackhole-chaos
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-blackhole-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows blackhole chaos is a Windows chaos fault that blocks all network traffic from the target Windows VM to the destinations listed in `DESTINATION_HOSTS` and `IP_ADDRESSES` for `DURATION`, then removes the block. The fault runs through the Windows chaos agent installed as a service on the target VM. Use `SERVER_HOST` to spare the target VM's own management endpoint when the chaos pod needs to reach the VM during the experiment.

Use this fault to test how a workload on a Windows VM behaves when a downstream dependency is unreachable: whether retries and timeouts work, whether circuit breakers open correctly, whether the workload fails over to a backup endpoint, and whether monitoring detects the regression within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Dependency outage:** When a downstream dependency is unreachable, does the caller honour its timeout and circuit-breaker policy?
- **Backup endpoint failover:** Does the workload fail over to a backup endpoint inside the SLA?
- **Alert fidelity:** Do downstream alerts fire inside the alerting SLA?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions).
- **Administrator privileges:** Blackhole chaos is an Advanced fault and requires the agent to run as administrator.
- **Destination known:** You know the destination hosts or IPs to block.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [VMware network loss](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-loss) or [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss) to approximate a blackhole) |

---

## Permissions required

This fault is classified as **Advanced**. The chaos agent must be installed and running with administrator privileges to mutate Windows Firewall (or equivalent) rules.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`, `5m`). | `30s` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames to block. | `""` |
| `IP_ADDRESSES` | Comma-separated list of destination IPs/CIDRs to block. | `""` |
| `SERVER_HOST` | Hostname/IP of an endpoint to exclude from the block (typically your control-plane endpoint). | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Provide at least one of `DESTINATION_HOSTS` or `IP_ADDRESSES`. To block all egress traffic to every destination, leave both empty (in which case `SERVER_HOST` is the only sanctioned reachable endpoint).

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM installs firewall rules that drop traffic to each host in `DESTINATION_HOSTS` and each IP/CIDR in `IP_ADDRESSES` (excluding `SERVER_HOST`) for `DURATION`, then removes the rules.

---

## Expected behavior during fault execution

- All egress traffic from the VM to the blocked destinations is dropped.
- Callers may see timeouts and connection failures.
- After the duration ends, the firewall rules are removed and connectivity returns to baseline.

:::info When the fault ends
The chaos agent removes the firewall rules. Connectivity to the blocked destinations returns to baseline within seconds.
:::

### Signals to watch

- **Reachability:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `Test-NetConnection <host>` and assert success after the fault ends.
- **Workload:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error budget is respected.

---

## Verify the fault execution effect

1. **During the chaos window, from the target VM run `Test-NetConnection <DESTINATION_HOSTS_entry>` in PowerShell.**

   The probe should report unreachable.

2. **Inspect the Windows Firewall rules.**

   ```powershell
   Get-NetFirewallRule | Where-Object DisplayName -like "*HCE*"
   ```

   The chaos rules should be present during the window and removed afterwards.

---

## Recovery and cleanup

- **End of duration:** The chaos agent removes the firewall rules.
- **Abort:** Stopping the experiment also removes the rules.
- **Manual recovery:** If the rules survive, remove them with `Remove-NetFirewallRule -DisplayName "*HCE*"` as administrator.

---

## Limitations

- **Outbound only:** The fault blocks outbound traffic from the VM. Inbound is unaffected.
- **DNS at start:** `DESTINATION_HOSTS` is resolved when the rules are installed. DNS changes during the chaos window are not picked up.
- **Administrator required:** This is an Advanced fault and requires the agent to run as administrator.

---

## Troubleshooting

<Troubleshoot
  issue="Windows blackhole chaos has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the firewall rules were installed (Get-NetFirewallRule | Where-Object DisplayName -like *HCE*). Confirm DESTINATION_HOSTS resolves to the IP the workload actually contacts. If your workload uses a different egress path (proxy, VPN), the rule may not match."
/>

<Troubleshoot
  issue="Windows blackhole chaos fails with access denied"
  mode="docs"
  fallback="The chaos agent must run as administrator to mutate firewall rules. Reinstall the agent as administrator and retry."
/>

---

## Related faults

- [Windows network latency](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-latency): Add latency instead of blocking traffic.
- [Windows network loss](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-loss): Drop a percentage of packets instead of blocking entirely.
