---
id: windows-network-loss
title: Windows network loss
sidebar_label: Windows Network Loss
description: Drop a configurable percentage of egress packets from a Windows VM so you can test how the workload behaves when packet loss spikes.
keywords:
  - chaos engineering
  - windows network loss
  - windows fault
  - packet loss
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-network-loss
- /docs/chaos-engineering/chaos-faults/windows/windows-network-loss
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-network-loss
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows network loss is a Windows chaos fault that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of egress packets from the target Windows VM to destinations listed in `DESTINATION_HOSTS`/`DESTINATION_IPS` on ports `DESTINATION_PORTS` and protocols `NETWORK_PROTOCOLS` for `DURATION`, then removes the filter. The fault runs through the Windows chaos agent installed as a service on the target VM. Use the `NETWORK_WHITELIST_*` tunables to spare specific destinations from the loss.

Use this fault to test how a workload on a Windows VM behaves when packet loss spikes: whether TCP retransmits stay within the SLA, whether application-layer retries recover correctly, and whether monitoring detects the regression within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Lossy network:** When packet loss spikes, do TCP retransmits and application retries recover the request inside the SLA?
- **Cluster membership:** Does Windows Failover Cluster stay healthy when heartbeats lose a percentage of packets?
- **Real-time workloads:** Does media or voice quality degrade gracefully under loss?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions).
- **Administrator privileges:** Network loss is an Advanced fault and requires the agent to run as administrator.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [VMware network loss](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-loss)) |

---

## Permissions required

This fault is classified as **Advanced** and requires the chaos agent to run as administrator on the target VM.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`). | `30s` |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of egress packets to drop (0-100). | `100` |
| `DESTINATION_HOSTS` | Comma-separated destination hostnames. | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs/CIDRs. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports. | `""` |
| `NETWORK_PROTOCOLS` | Comma-separated protocols (`tcp`, `udp`, `icmp`). | `""` |
| `NETWORK_WHITELIST_DESTINATION_HOSTS` | Hostnames excluded from loss. | `""` |
| `NETWORK_WHITELIST_DESTINATION_IPS` | IPs/CIDRs excluded from loss. | `""` |
| `NETWORK_WHITELIST_DESTINATION_PORTS` | Ports excluded from loss. | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM installs a network filter that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of egress packets matching the destination/port/protocol filters (minus the whitelist) for `DURATION`, then removes the filter.

---

## Expected behavior during fault execution

- A configurable share of egress packets are dropped.
- TCP retransmits rise; throughput drops.
- Application-layer error rates may rise; retry budgets may be consumed.
- After the duration ends, the filter is removed and packet loss returns to baseline.

:::info When the fault ends
The chaos agent removes the network filter. Packet loss returns to baseline within seconds.
:::

### Signals to watch

- **Connectivity:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `Test-NetConnection <host> -InformationLevel Detailed`.
- **Workload:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error budget is respected.

---

## Verify the fault execution effect

1. **Ping a target host from the VM during the chaos window.**

   ```powershell
   ping <DESTINATION_HOSTS_entry> -n 100
   ```

   Loss percentage should match `NETWORK_PACKET_LOSS_PERCENTAGE`.

2. **Run a quick HTTP call from a peer machine.**

   Error rate should reflect the loss.

---

## Recovery and cleanup

- **End of duration:** The chaos agent removes the filter.
- **Abort:** Stopping the experiment also removes the filter.
- **Manual recovery:** Restart the chaos agent service if filters survive.

---

## Limitations

- **Egress only:** The rule affects egress packets only.
- **Administrator required:** This is an Advanced fault and requires the agent to run as administrator.

---

## Troubleshooting

<Troubleshoot
  issue="Windows network loss has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify DESTINATION_HOSTS or DESTINATION_IPS match the traffic you are measuring. Confirm the agent is running as administrator. If the workload uses a proxy or VPN, the rule may not match the real egress path."
/>

<Troubleshoot
  issue="Windows network loss fails with access denied"
  mode="docs"
  fallback="The chaos agent must run as administrator to install network filters. Reinstall the agent as administrator and retry."
/>

---

## Related faults

- [Windows network latency](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-latency): Add latency instead of dropping packets.
- [Windows blackhole chaos](/docs/chaos-engineering/faults/chaos-faults/windows/windows-blackhole-chaos): Block traffic entirely instead of dropping a percentage.
