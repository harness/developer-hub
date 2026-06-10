---
id: linux-network-latency
title: Linux network latency
sidebar_label: Linux Network Latency
description: Add network latency to traffic leaving a target Linux machine for a configurable duration so you can test how the workload behaves when the network is slow.
keywords:
  - chaos engineering
  - linux network latency
  - linux fault
  - network chaos
tags:
  - chaos-engineering
  - linux-faults
  - network-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-network-latency
- /docs/chaos-engineering/chaos-faults/linux/linux-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux network latency is a chaos fault that adds `NETWORK_LATENCY` milliseconds of delay (plus optional `JITTER`) to packets leaving the target Linux machine on `NETWORK_INTERFACES` for `DURATION`, then restores normal connectivity. Delay is restricted to traffic destined for `DESTINATION_HOSTS`/`DESTINATION_IPS` and the configured port filters; SSH ports stay reachable when `WHITELIST_SSH` is `true`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when the network is slow: whether application timeouts fire cleanly, whether retries amplify the delay, whether tail latency exceeds the SLA, and whether monitoring detects the degradation within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Latency tolerance:** When traffic to `DESTINATION_HOSTS` is delayed by `NETWORK_LATENCY` milliseconds, does the application stay inside its p95/p99 SLA?
- **Timeout behavior:** Do client timeouts fire cleanly, or do connections pile up and exhaust thread pools?
- **Retry storms:** Do retries amplify the slow traffic, or do exponential backoff and jitter contain it?
- **Monitoring fidelity:** Do alerts on end-to-end latency, queue depth, and timeout counters fire within the alerting SLA?

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

Configure the following fault parameters when you add Linux network latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `NETWORK_LATENCY` | Latency to inject in milliseconds. | `2000` |
| `JITTER` | Additional jitter (variance) to apply with `NETWORK_LATENCY`, in milliseconds. | `0` |
| `NETWORK_INTERFACES` | Comma-separated network interfaces to apply chaos on. | `eth0` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Target filters (provide at least one host or IP to limit blast radius)**

| Tunable | Description | Default |
| --- | --- | --- |
| `DESTINATION_HOSTS` | Comma-separated destination host names to target. | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs to target. Per-IP ports can be specified using the `ip\|port` format. | `""` |
| `SOURCE_PORTS` | Comma-separated source ports to target. Prefix with `!` to whitelist instead of target. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports to target. Prefix with `!` to whitelist instead of target. | `""` |
| `WHITELIST_SSH` | Keep SSH ports (`22,2222`) excluded from chaos to preserve management access. | `true` |

When neither `DESTINATION_HOSTS` nor `DESTINATION_IPS` is set, the fault applies to all destinations on the interface.

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Adds a `netem` qdisc on `NETWORK_INTERFACES` that delays egress packets matching the configured destination and port filters by `NETWORK_LATENCY` (with optional `JITTER`) for `DURATION`, then removes the qdisc.

---

## Expected behavior during fault execution

- Round-trip time to matched destinations rises by approximately `NETWORK_LATENCY` (with `+/- JITTER` variance).
- Application calls take longer; tail latency (`p99`) is most affected.
- Time-sensitive protocols (synchronous RPC, database keep-alives) may exceed their timeouts.
- After the duration ends, the qdisc is removed and packet delay returns to baseline.

:::info When the fault ends
The chaos pod removes the `netem` qdisc. Packets flow normally on the next send; queued packets drain within the configured delay.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Network RTT:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `ping -c 5 <target>` and assert the RTT rose by `NETWORK_LATENCY`.
- **Application latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application p95/p99 metrics.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm latency was added and then removed:

1. **Inspect the active qdisc.**

   ```bash
   tc -s qdisc show dev <interface>
   ```

   A `netem` qdisc with the configured `delay` should be present during the chaos window and removed afterwards.

2. **Run ping against a matched destination.**

   ```bash
   ping -c 10 <one-of-DESTINATION_HOSTS>
   ```

   RTT should rise by approximately `NETWORK_LATENCY` (with `+/- JITTER` variance) during the chaos window.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `netem` qdisc when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the qdisc.
- **Manual recovery:** If the qdisc survives an abort, remove it with `sudo tc qdisc del dev <interface> root`.
- **Workload recovery:** Applications resume normal latency on the next send.

---

## Limitations

- **Egress only:** The fault delays packets leaving the VM on the configured interfaces; inbound packets are not delayed.
- **Single VM scope:** Each fault run targets one VM.
- **Delay variance:** With `JITTER` set, delay is randomized within `+/- JITTER` of `NETWORK_LATENCY`; the actual distribution approximates a uniform random over many packets.
- **SSH whitelisting:** When `WHITELIST_SSH` is `false`, your SSH session may stall if SSH ports match the filter.
- **Existing qdisc:** If a custom qdisc is already attached, the fault may fail; review with `tc qdisc show` before running.

---

## Troubleshooting

<Troubleshoot
  issue="Linux network latency fault shows no measurable RTT increase in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the destination filter matches your test traffic. Run tc -s qdisc show dev <interface> to verify the netem qdisc is installed. NETWORK_LATENCY values below the baseline RTT may not be observable."
/>

<Troubleshoot
  issue="SSH session became slow during the experiment"
  mode="docs"
  fallback="WHITELIST_SSH defaults to true to exclude ports 22 and 2222. If your SSH session became slow, your SSH may be on a different port; add it with the ! prefix in SOURCE_PORTS to whitelist it."
/>

<Troubleshoot
  issue="Latency persists after the experiment ends"
  mode="docs"
  fallback="If the netem qdisc was not removed, remove it manually with sudo tc qdisc del dev <interface> root. Inspect with tc qdisc show dev <interface> first."
/>

---

## Related faults

- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets instead of delaying them.
- [Linux network corruption](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-corruption): Corrupt packets instead of delaying them.
- [Linux network rate limit](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-rate-limit): Throttle bandwidth instead of adding delay.
