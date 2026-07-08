---
id: windows-network-corruption
title: Windows network corruption
sidebar_label: Windows Network Corruption
description: Corrupt a configurable percentage of egress packets from a Windows VM so you can test how the workload behaves when packets arrive damaged.
keywords:
  - chaos engineering
  - windows network corruption
  - windows fault
  - packet corruption
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-network-corruption
- /docs/chaos-engineering/chaos-faults/windows/windows-network-corruption
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-network-corruption
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-network-corruption
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows network corruption is a Windows chaos fault that corrupts `NETWORK_PACKET_CORRUPTION_PERCENTAGE` percent of egress packets from the target Windows VM to destinations listed in `DESTINATION_HOSTS`/`DESTINATION_IPS` on ports `DESTINATION_PORTS` and protocols `NETWORK_PROTOCOLS` for `DURATION`, then removes the filter. The fault runs through the Windows chaos agent installed as a service on the target VM. Use the `NETWORK_WHITELIST_*` tunables to spare specific destinations.

Use this fault to test how a workload on a Windows VM behaves when packets are corrupted: whether TCP checksums catch the corruption, whether application retries recover, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Corrupted packets on the wire:** When packet payloads are corrupted, does TCP detect the corruption and retransmit?
- **UDP workloads:** Does the application detect and recover from corrupted UDP packets?
- **Cluster heartbeat fragility:** Does cluster membership stay healthy when heartbeat packets are corrupted?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions).
- **Administrator privileges:** Network corruption is an Advanced fault and requires the agent to run as administrator.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [Linux network corruption](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-corruption)) |

---

## Permissions required

This fault is classified as **Advanced** and requires the chaos agent to run as administrator on the target VM.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`). | `30s` |
| `NETWORK_PACKET_CORRUPTION_PERCENTAGE` | Percentage of egress packets to corrupt (0-100). | `100` |
| `DESTINATION_HOSTS` | Comma-separated destination hostnames. | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs/CIDRs. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports. | `""` |
| `NETWORK_PROTOCOLS` | Comma-separated protocols (`tcp`, `udp`, `icmp`). | `""` |
| `NETWORK_WHITELIST_DESTINATION_HOSTS` | Hostnames excluded from corruption. | `""` |
| `NETWORK_WHITELIST_DESTINATION_IPS` | IPs/CIDRs excluded from corruption. | `""` |
| `NETWORK_WHITELIST_DESTINATION_PORTS` | Ports excluded from corruption. | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM installs a network filter that corrupts `NETWORK_PACKET_CORRUPTION_PERCENTAGE` percent of egress packets matching the destination/port/protocol filters (minus the whitelist) for `DURATION`, then removes the filter.

---

## Expected behavior during fault execution

- A configurable share of egress packets have their payload corrupted.
- TCP receivers detect bad checksums and discard the packets; retransmits follow.
- UDP receivers either drop or process garbled payloads depending on the workload's checksum behavior.
- After the duration ends, the filter is removed and traffic returns to baseline.

:::info When the fault ends
The chaos agent removes the network filter. Packet integrity returns to baseline within seconds.
:::

### Signals to watch

- **TCP retransmits:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on Windows Exporter `windows_net_*` TCP retransmit counters.
- **Workload:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error budget is respected.

---

## Verify the fault execution effect

1. **From a peer machine, observe TCP retransmits to the target VM during the chaos window.**

   ```bash
   tcpdump host <vm-ip> | grep retransmission
   ```

2. **Run a quick HTTP transfer from the VM.**

   Throughput should drop because of retransmits.

---

## Recovery and cleanup

- **End of duration:** The chaos agent removes the filter.
- **Abort:** Stopping the experiment also removes the filter.
- **Manual recovery:** Restart the chaos agent service if filters survive.

---

## Limitations

- **Egress only:** The rule affects egress packets only.
- **TCP often masks corruption:** TCP receivers discard corrupted packets and trigger retransmits, so the visible effect is throughput loss, not data corruption at the app layer.
- **Administrator required:** This is an Advanced fault and requires the agent to run as administrator.

---

## Troubleshooting

<Troubleshoot
  issue="Windows network corruption has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="TCP recovers from corruption with retransmits, so the most visible signal is throughput drop. Verify with packet capture that retransmits are happening. For UDP workloads, the workload itself must detect and handle the corruption."
/>

---

## Related faults

- [Windows network latency](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-latency): Add latency instead of corrupting packets.
- [Windows network loss](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-loss): Drop packets instead of corrupting them.
