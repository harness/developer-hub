---
id: linux-network-corruption
title: Linux network corruption
sidebar_label: Linux Network Corruption
description: Corrupt a percentage of network packets leaving a target Linux machine for a configurable duration so you can test how the workload behaves when packet contents are damaged.
keywords:
  - chaos engineering
  - linux network corruption
  - linux fault
  - network chaos
tags:
  - chaos-engineering
  - linux-faults
  - network-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-network-corruption
- /docs/chaos-engineering/chaos-faults/linux/linux-network-corruption
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux network corruption is a chaos fault that flips bits in `NETWORK_PACKET_CORRUPTION_PERCENTAGE` percent of egress packets on `NETWORK_INTERFACES` of the target Linux machine for `DURATION`, then restores normal connectivity. Corruption is restricted to traffic destined for `DESTINATION_HOSTS`/`DESTINATION_IPS` and the configured port filters; SSH ports stay reachable when `WHITELIST_SSH` is `true`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when packet payloads are damaged in transit: whether TCP retransmits keep the connection alive, whether UDP-based protocols recover, whether application checksum/verification layers reject the corrupt data, and whether monitoring detects the degradation within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **TCP recovery:** When `NETWORK_PACKET_CORRUPTION_PERCENTAGE` of egress packets are corrupted, does the application stay inside its latency SLA via TCP retransmits?
- **UDP behavior:** Do UDP-based protocols (DNS, syslog, application metrics) drop the corrupt packets or surface bad data?
- **Application validation:** Does the application reject malformed payloads cleanly when corruption sneaks past TCP?
- **Monitoring fidelity:** Do alerts on retransmits and connection errors fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target interface exists:** Each entry in `NETWORK_INTERFACES` exists on the target VM. Confirm with `ip -br link`.
- **`tc` available:** The fault uses Linux Traffic Control (`tc`) with the `netem` qdisc. Provided by iproute2.

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

This fault is classified as an **Advanced** Linux fault. It requires the Linux Chaos Infrastructure systemd service to run with the root user and root user group on the target VM so it can manage the `tc` qdisc. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux network corruption to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `NETWORK_PACKET_CORRUPTION_PERCENTAGE` | Percentage of packets to corrupt (0 to 100). | `100` |
| `NETWORK_INTERFACES` | Comma-separated network interfaces to apply chaos on. | `eth0` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Target filters (provide at least one host or IP to limit blast radius)**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_HOSTS` | Comma-separated destination host names to target. | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs to target. Per-IP ports can be specified using the `ip\|port` format. | `""` |
| `SOURCE_PORTS` | Comma-separated source ports to target. Prefix with `!` to whitelist. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports to target. Prefix with `!` to whitelist. | `""` |
| `WHITELIST_SSH` | Keep SSH ports (`22,2222`) excluded from chaos. | `true` |

When neither `DESTINATION_HOSTS` nor `DESTINATION_IPS` is set, the fault applies to all destinations on the interface.

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Adds a `netem` qdisc on `NETWORK_INTERFACES` that corrupts `NETWORK_PACKET_CORRUPTION_PERCENTAGE` percent of egress packets matching the configured filters for `DURATION`, then removes the qdisc.

---

## Expected behavior during fault execution

- The configured percentage of egress packets to matched destinations is bit-flipped.
- TCP detects the corruption via checksum and retransmits; throughput drops and retransmits rise sharply.
- UDP-based protocols may receive bad data (depending on whether the application validates payloads).
- After the duration ends, the qdisc is removed and packet integrity returns to baseline.

:::info When the fault ends
The chaos pod removes the `netem` qdisc. Packets flow normally on the next send; TCP recovers quickly via standard retransmission.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **TCP retransmits:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_netstat_TcpExt_TCPLostRetransmit`.
- **Application errors:** Use a Prometheus probe on application checksum or decode error counters.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **Inspect the active qdisc.**

   ```bash
   tc -s qdisc show dev <interface>
   ```

2. **Run TCP throughput against a matched destination.**

   ```bash
   iperf3 -c <target> -t 30
   ```

   Throughput drops sharply during the chaos window and returns to baseline afterwards.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `netem` qdisc when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the qdisc.
- **Manual recovery:** If the qdisc survives an abort, remove it with `sudo tc qdisc del dev <interface> root`.

---

## Limitations

- **Egress only:** The fault corrupts packets leaving the VM on the configured interfaces.
- **Single VM scope:** Each fault run targets one VM.
- **Corruption is random:** Bit-flips happen at random positions; payloads are usually rejected by TCP checksum, occasionally accepted as bad UDP data.
- **SSH whitelisting:** When `WHITELIST_SSH` is `false`, your SSH session may break.

---

## Troubleshooting

<Troubleshoot
  issue="Linux network corruption fault shows no measurable retransmits in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the destination filter matches your test traffic. Run tc -s qdisc show dev <interface> to verify the netem qdisc is installed and check ss -ti for retransmit counts."
/>

<Troubleshoot
  issue="SSH session became unresponsive during the experiment"
  mode="docs"
  fallback="WHITELIST_SSH defaults to true to exclude ports 22 and 2222. If your SSH session broke, your SSH may be on a different port; add it with the ! prefix in SOURCE_PORTS to whitelist it."
/>

<Troubleshoot
  issue="Corruption persists after the experiment ends"
  mode="docs"
  fallback="If the netem qdisc was not removed, remove it manually with sudo tc qdisc del dev <interface> root."
/>

---

## Related faults

- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets entirely instead of corrupting them.
- [Linux network duplication](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-duplication): Duplicate packets instead of corrupting them.
- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Add latency instead of corrupting packets.
