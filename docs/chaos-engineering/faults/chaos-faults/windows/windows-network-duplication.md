---
id: windows-network-duplication
title: Windows network duplication
sidebar_label: Windows Network Duplication
description: Duplicate a configurable percentage of egress packets from a Windows VM so you can test how the workload behaves when packets are duplicated.
keywords:
  - chaos engineering
  - windows network duplication
  - windows fault
  - packet duplication
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-network-duplication
- /docs/chaos-engineering/chaos-faults/windows/windows-network-duplication
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-network-duplication
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-network-duplication
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows network duplication is a Windows chaos fault that duplicates `NETWORK_PACKET_DUPLICATION_PERCENTAGE` percent of egress packets from the target Windows VM to destinations listed in `DESTINATION_HOSTS`/`DESTINATION_IPS` on ports `DESTINATION_PORTS` and protocols `NETWORK_PROTOCOLS` for `DURATION`, then removes the filter. The fault runs through the Windows chaos agent installed as a service on the target VM. Use the `NETWORK_WHITELIST_*` tunables to spare specific destinations.

Use this fault to test how a workload on a Windows VM behaves when packets are duplicated: whether TCP de-duplication handles the load, whether UDP receivers handle duplicate packets at the application layer, whether monitoring detects bandwidth spikes, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Duplicate packets on the wire:** Does TCP de-duplicate correctly, or does the workload's TCP stack misbehave?
- **UDP idempotency:** Do UDP receivers handle duplicates correctly, or does the workload process the same event twice?
- **Bandwidth spike:** Does the bandwidth spike trigger alerts and/or violate rate limits?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions).
- **Administrator privileges:** Network duplication is an Advanced fault and requires the agent to run as administrator.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [Linux network duplication](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-duplication)) |

---

## Permissions required

This fault is classified as **Advanced** and requires the chaos agent to run as administrator on the target VM.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`). | `30s` |
| `NETWORK_PACKET_DUPLICATION_PERCENTAGE` | Percentage of egress packets to duplicate (0-100). | `100` |
| `DESTINATION_HOSTS` | Comma-separated destination hostnames. | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs/CIDRs. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports. | `""` |
| `NETWORK_PROTOCOLS` | Comma-separated protocols (`tcp`, `udp`, `icmp`). | `""` |
| `NETWORK_WHITELIST_DESTINATION_HOSTS` | Hostnames excluded from duplication. | `""` |
| `NETWORK_WHITELIST_DESTINATION_IPS` | IPs/CIDRs excluded from duplication. | `""` |
| `NETWORK_WHITELIST_DESTINATION_PORTS` | Ports excluded from duplication. | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM installs a network filter that duplicates `NETWORK_PACKET_DUPLICATION_PERCENTAGE` percent of egress packets matching the destination/port/protocol filters (minus the whitelist) for `DURATION`, then removes the filter.

---

## Expected behavior during fault execution

- A configurable share of egress packets are sent twice.
- TCP receivers de-duplicate; UDP receivers see duplicates.
- Egress bandwidth approximately doubles for affected flows.
- After the duration ends, the filter is removed and traffic returns to baseline.

:::info When the fault ends
The chaos agent removes the network filter. Egress bandwidth returns to baseline within seconds.
:::

### Signals to watch

- **Egress bandwidth:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on Windows Exporter network counters.
- **Workload:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe).

---

## Verify the fault execution effect

1. **Inspect egress bytes on the VM during the chaos window.**

   ```powershell
   Get-Counter '\Network Interface(*)\Bytes Sent/sec' -Continuous
   ```

   Bytes sent per second should rise during the window.

---

## Recovery and cleanup

- **End of duration:** The chaos agent removes the filter.
- **Abort:** Stopping the experiment also removes the filter.
- **Manual recovery:** Restart the chaos agent service if filters survive.

---

## Limitations

- **Egress only:** The rule affects egress packets only.
- **TCP often masks duplication:** TCP receivers de-duplicate, so the visible effect is bandwidth doubling, not duplicate processing at the app layer.
- **Administrator required:** This is an Advanced fault and requires the agent to run as administrator.

---

## Troubleshooting

<Troubleshoot
  issue="Windows network duplication has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="TCP de-duplicates transparently, so the most visible signal is egress-bandwidth doubling. For UDP workloads, the workload must check for duplicate messages itself."
/>

---

## Related faults

- [Windows network loss](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-loss): Drop packets instead of duplicating them.
- [Windows network corruption](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-corruption): Corrupt packets instead of duplicating them.
