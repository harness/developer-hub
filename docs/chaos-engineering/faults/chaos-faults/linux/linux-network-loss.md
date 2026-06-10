---
id: linux-network-loss
title: Linux network loss
sidebar_label: Linux Network Loss
description: Drop a percentage of network packets leaving a target Linux machine for a configurable duration so you can test how the workload behaves when packets are lost.
keywords:
  - chaos engineering
  - linux network loss
  - linux fault
  - network chaos
tags:
  - chaos-engineering
  - linux-faults
  - network-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-network-loss
- /docs/chaos-engineering/chaos-faults/linux/linux-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux network loss is a chaos fault that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of packets leaving the target Linux machine on `NETWORK_INTERFACES` for `DURATION`, then restores normal connectivity. Loss is restricted to traffic destined for `DESTINATION_HOSTS`/`DESTINATION_IPS` and the configured port filters; SSH ports stay reachable when `WHITELIST_SSH` is `true`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when the network is unreliable: whether application clients honor their own timeouts, whether retries amplify the loss, whether circuit breakers fire correctly, and whether monitoring detects the connectivity degradation within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Packet-loss tolerance:** When `NETWORK_PACKET_LOSS_PERCENTAGE` of packets to `DESTINATION_HOSTS` are dropped, do application clients honor their own timeouts cleanly?
- **Retry storms:** Do retries amplify the lost traffic, or do exponential backoff and jitter prevent it?
- **Circuit breakers:** Does the service-mesh or application circuit breaker open within the configured threshold?
- **Monitoring fidelity:** Do alerts on connection errors, retransmits (`node_netstat_TcpExt_TCPLostRetransmit`), and end-to-end p99 fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target interface exists:** Each entry in `NETWORK_INTERFACES` exists on the target VM. Confirm with `ip -br link`.
- **`tc` available:** The fault uses Linux Traffic Control (`tc`) with the `netem` qdisc to apply loss. Provided by iproute2, installed on all supported distributions.

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

Configure the following fault parameters when you add Linux network loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of packets to drop (0 to 100). | `100` |
| `NETWORK_INTERFACES` | Comma-separated network interfaces to apply chaos on (for example, `eth0,ens192`). | `eth0` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Target filters (provide at least one host or IP to limit blast radius)**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_HOSTS` | Comma-separated destination host names to target (for example, `google.com,api.example.com`). | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs to target. Per-IP ports can be specified using the `ip\|port` format (for example, `1.1.1.1,35.24.108.92\|3000\|8080`). | `""` |
| `SOURCE_PORTS` | Comma-separated source ports to target. Prefix with `!` to whitelist instead of target (for example, `!22,2222` excludes SSH). | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports to target. Prefix with `!` to whitelist instead of target. | `""` |
| `WHITELIST_SSH` | Keep SSH ports (`22,2222`) excluded from chaos to preserve management access. | `true` |

When neither `DESTINATION_HOSTS` nor `DESTINATION_IPS` is set, the fault applies to all destinations on the interface.

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Adds a `netem` qdisc on `NETWORK_INTERFACES` that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of egress packets matching the configured destination and port filters for `DURATION`, then removes the qdisc.

---

## Expected behavior during fault execution

- The configured percentage of egress packets to matched destinations is dropped for the duration of the fault.
- TCP connections see retransmissions (`TCPLostRetransmit`); UDP traffic loses datagrams silently.
- Application calls to the matched destinations time out or fail; retries may succeed when they hit the surviving packets.
- After the duration ends, the qdisc is removed and packet flow returns to baseline.

:::info When the fault ends
The chaos pod removes the `netem` qdisc. Packets flow normally on the next send; in-flight retransmissions may take a few RTTs to settle.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **TCP retransmits:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `node_netstat_TcpExt_TCPLostRetransmit` and assert it rose during the chaos window.
- **Application timeouts:** Use a Prometheus probe on application timeout/connection-error counters.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that depends on the matched destinations.

---

## Verify the fault execution effect

While the experiment is running, confirm packets were dropped and then recovered:

1. **Inspect the active qdisc.**

   ```bash
   tc -s qdisc show dev <interface>
   ```

   A `netem` qdisc with the configured `loss` parameter should be present during the chaos window and removed afterwards.

2. **Run ping or curl against a matched destination.**

   ```bash
   ping -c 20 <one-of-DESTINATION_HOSTS>
   curl -w '%{http_code}\n' -m 5 https://<one-of-DESTINATION_HOSTS>
   ```

   Packet loss and curl timeouts should match approximately `NETWORK_PACKET_LOSS_PERCENTAGE`.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the resolved targets, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `netem` qdisc when `DURATION` elapses; packets flow normally.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the qdisc.
- **Manual recovery:** If the qdisc survives an abort, remove it with `sudo tc qdisc del dev <interface> root` (or `parent ffff:` for ingress qdiscs created by the fault).
- **Workload recovery:** Applications resume normal throughput as soon as the qdisc is removed; long-lived connections that broke must be re-established by the client.

---

## Limitations

- **Egress only:** The fault drops packets leaving the VM on the configured interfaces; inbound packets are not directly dropped.
- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **Loss is uniform random:** Drops are random per packet; the actual drop rate approximates `NETWORK_PACKET_LOSS_PERCENTAGE` over many packets.
- **SSH whitelisting:** When `WHITELIST_SSH` is `false`, the fault may sever your SSH session to the target VM if the SSH ports match the filter.
- **Existing qdisc:** If a custom qdisc is already attached to the interface, the fault adds a child or fails; review with `tc qdisc show` before running.

---

## Troubleshooting

<Troubleshoot
  issue="Linux network loss fault shows no packet loss in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the destination filter matches your test traffic and that you are sending egress traffic on the configured NETWORK_INTERFACES. Run tc -s qdisc show dev <interface> during the chaos window to see the netem statistics."
/>

<Troubleshoot
  issue="SSH session dropped during the experiment"
  mode="docs"
  fallback="WHITELIST_SSH defaults to true to keep ports 22 and 2222 reachable. If SSH dropped, your session may be on a custom port. Add that port to SOURCE_PORTS with the ! prefix to whitelist it (for example, !22,2222,2200)."
/>

<Troubleshoot
  issue="Packet loss persists after the experiment ends"
  mode="docs"
  fallback="If the netem qdisc was not removed (for example, the experiment aborted ungracefully), remove it manually with sudo tc qdisc del dev <interface> root. Inspect with tc qdisc show dev <interface> first."
/>

---

## Related faults

- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Add latency instead of dropping packets.
- [Linux network corruption](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-corruption): Corrupt packets instead of dropping them.
- [Linux network rate limit](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-rate-limit): Throttle bandwidth instead of dropping packets.
