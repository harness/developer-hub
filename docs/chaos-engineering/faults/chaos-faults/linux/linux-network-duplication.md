---
id: linux-network-duplication
title: Linux network duplication
sidebar_label: Linux Network Duplication
description: Duplicate a percentage of network packets leaving a target Linux machine for a configurable duration so you can test how the workload behaves when packets are duplicated.
keywords:
  - chaos engineering
  - linux network duplication
  - linux fault
  - network chaos
tags:
  - chaos-engineering
  - linux-faults
  - network-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-network-duplication
- /docs/chaos-engineering/chaos-faults/linux/linux-network-duplication
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux network duplication is a chaos fault that duplicates `NETWORK_PACKET_DUPLICATION_PERCENTAGE` percent of egress packets on `NETWORK_INTERFACES` of the target Linux machine for `DURATION`, then restores normal connectivity. Duplication is restricted to traffic destined for `DESTINATION_HOSTS`/`DESTINATION_IPS` and the configured port filters; SSH ports stay reachable when `WHITELIST_SSH` is `true`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when packets arrive twice: whether the application is idempotent under at-least-once delivery, whether duplicate detection works in queues, and whether monitoring distinguishes duplication from new traffic.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Idempotency:** When `NETWORK_PACKET_DUPLICATION_PERCENTAGE` of packets are duplicated, do application handlers stay idempotent (no double-charges, no double-writes)?
- **Queue deduplication:** Do queue consumers detect duplicate messages and discard them?
- **TCP behavior:** Do TCP sessions handle the duplicates cleanly via sequence numbers?
- **Monitoring fidelity:** Do alerts on inflated request counts or duplicate keys fire when expected?

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

Configure the following fault parameters when you add Linux network duplication to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `NETWORK_PACKET_DUPLICATION_PERCENTAGE` | Percentage of packets to duplicate (0 to 100). | `100` |
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

Adds a `netem` qdisc on `NETWORK_INTERFACES` that duplicates `NETWORK_PACKET_DUPLICATION_PERCENTAGE` percent of egress packets matching the configured filters for `DURATION`, then removes the qdisc.

---

## Expected behavior during fault execution

- The configured percentage of egress packets to matched destinations is duplicated on the wire.
- TCP collapses duplicates via sequence numbers; the application sees one copy per logical message.
- UDP-based protocols deliver duplicates to the application; if the application is not idempotent, side effects fire twice.
- After the duration ends, the qdisc is removed and packet delivery returns to baseline.

:::info When the fault ends
The chaos pod removes the `netem` qdisc. Packets flow normally on the next send.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Inflated egress counters:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_network_transmit_packets_total` and assert it rose.
- **Duplicate detection:** Use a Prometheus probe on application-level "duplicate detected" counters if available.
- **End-to-end correctness:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) to assert no double-writes occurred in the database.

---

## Verify the fault execution effect

1. **Inspect the active qdisc.**

   ```bash
   tc -s qdisc show dev <interface>
   ```

2. **Capture traffic on the interface and confirm duplicates.**

   ```bash
   sudo tcpdump -i <interface> -c 100 host <target>
   ```

   Duplicate sequence numbers or repeated UDP datagrams should be visible during the chaos window.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `netem` qdisc when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the qdisc.
- **Manual recovery:** If the qdisc survives an abort, remove it with `sudo tc qdisc del dev <interface> root`.
- **Workload recovery:** If duplicate messages caused state divergence (double-writes, double-charges), reconcile the data using application-level cleanup.

---

## Limitations

- **Egress only:** The fault duplicates packets leaving the VM on the configured interfaces.
- **Single VM scope:** Each fault run targets one VM.
- **TCP collapses duplicates:** TCP-based applications usually see one logical message regardless; the failure surface is on UDP and on raw counters.
- **SSH whitelisting:** When `WHITELIST_SSH` is `false`, SSH session control messages may be duplicated and disrupt the terminal.

---

## Troubleshooting

<Troubleshoot
  issue="Linux network duplication fault shows no measurable duplicates in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the destination filter matches your test traffic. Run tcpdump on the interface to see duplicate packets directly. TCP applications hide duplicates; assert on raw egress counters or use a UDP-based test."
/>

<Troubleshoot
  issue="SSH session behaving oddly during the experiment"
  mode="docs"
  fallback="WHITELIST_SSH defaults to true to exclude ports 22 and 2222. If your SSH session is disrupted, your SSH may be on a different port; add it with the ! prefix in SOURCE_PORTS to whitelist it."
/>

<Troubleshoot
  issue="Duplicates persist after the experiment ends"
  mode="docs"
  fallback="If the netem qdisc was not removed, remove it manually with sudo tc qdisc del dev <interface> root."
/>

---

## Related faults

- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets instead of duplicating them.
- [Linux network corruption](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-corruption): Corrupt packets instead of duplicating them.
- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Add latency instead of duplicating packets.
