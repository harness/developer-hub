---
id: linux-network-rate-limit
title: Linux network rate limit
sidebar_label: Linux Network Rate Limit
description: Throttle network bandwidth leaving a target Linux machine for a configurable duration so you can test how the workload behaves when bandwidth is constrained.
keywords:
  - chaos engineering
  - linux network rate limit
  - linux fault
  - network chaos
tags:
  - chaos-engineering
  - linux-faults
  - network-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-network-rate-limit
- /docs/chaos-engineering/chaos-faults/linux/linux-network-rate-limit
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux network rate limit is a chaos fault that throttles egress bandwidth on `NETWORK_INTERFACES` of the target Linux machine to `NETWORK_BANDWIDTH` (with a burst of `BURST` and queue limit `LIMIT`) for `DURATION`, then restores normal connectivity. Rate limiting is restricted to traffic destined for `DESTINATION_HOSTS`/`DESTINATION_IPS` and the configured port filters; SSH ports stay reachable when `WHITELIST_SSH` is `true`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when bandwidth is constrained: whether large transfers degrade gracefully, whether back-pressure flows through the application correctly, whether buffer pools and queue depths stay inside bounds, and whether monitoring detects the saturation within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Bandwidth headroom:** When egress is throttled to `NETWORK_BANDWIDTH`, do bulk transfers complete inside the SLA?
- **Back-pressure:** Do producers slow down cleanly when the pipe is full, or do they OOM the local buffer?
- **Queue depth:** Do queue depths in the application stay inside bounds when downstream is throttled?
- **Monitoring fidelity:** Do alerts on transmit queue length, congestion, and SLA breach fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target interface exists:** Each entry in `NETWORK_INTERFACES` exists on the target VM. Confirm with `ip -br link`.
- **`tc` available:** The fault uses Linux Traffic Control (`tc`) with the token bucket filter (`tbf`) qdisc. Provided by iproute2.

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

Configure the following fault parameters when you add Linux network rate limit to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `NETWORK_BANDWIDTH` | Bandwidth ceiling for egress traffic (for example, `1mbit`, `512kbit`). | `1mbit` |
| `BURST` | Burst size that the bucket allows above `NETWORK_BANDWIDTH` (for example, `32kb`). | `32kb` |
| `LIMIT` | Queue limit before packets start to be dropped (for example, `2mb`). | `2mb` |
| `PEAK_RATE` | Peak rate ceiling (for example, `2mbit`). Leave empty to skip the peak rate cap. | `""` |
| `MIN_BURST` | Minimum burst size, in bytes, used with `PEAK_RATE`. Leave empty to skip. | `""` |
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

Adds a token bucket filter (`tbf`) qdisc on `NETWORK_INTERFACES` that caps egress bandwidth at `NETWORK_BANDWIDTH` (with `BURST` and `LIMIT`) for `DURATION` against the configured filters, then removes the qdisc.

---

## Expected behavior during fault execution

- Egress throughput to matched destinations is capped at approximately `NETWORK_BANDWIDTH`.
- Burst traffic up to `BURST` is allowed; sustained traffic is throttled.
- The transmit queue grows until it hits `LIMIT`, after which packets are dropped.
- Application bulk transfers slow down; small request/response patterns may still complete inside the SLA.
- After the duration ends, the qdisc is removed and bandwidth returns to baseline.

:::info When the fault ends
The chaos pod removes the `tbf` qdisc. Bandwidth returns to baseline; queued packets drain into the underlying interface.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Egress throughput:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `rate(node_network_transmit_bytes_total[1m])` and assert it dropped to the configured ceiling.
- **Queue depth:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `tc -s qdisc show dev <interface>` and inspect the qdisc stats.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible bulk endpoint.

---

## Verify the fault execution effect

1. **Inspect the active qdisc.**

   ```bash
   tc -s qdisc show dev <interface>
   ```

   A `tbf` qdisc with the configured `rate` and `burst` should be present during the chaos window.

2. **Run a bandwidth test against a matched destination.**

   ```bash
   iperf3 -c <target> -t 30
   ```

   Throughput should cap at approximately `NETWORK_BANDWIDTH` during the chaos window and return to line rate afterwards.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `tbf` qdisc when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the qdisc.
- **Manual recovery:** If the qdisc survives an abort, remove it with `sudo tc qdisc del dev <interface> root`.

---

## Limitations

- **Egress only:** The fault throttles packets leaving the VM on the configured interfaces; ingress bandwidth is not capped.
- **Single VM scope:** Each fault run targets one VM.
- **TBF behavior:** Token bucket filtering allows short bursts above `NETWORK_BANDWIDTH`; tune `BURST` to constrain bursting.
- **SSH whitelisting:** When `WHITELIST_SSH` is `false`, your SSH session may slow down or stall if SSH ports match the filter.

---

## Troubleshooting

<Troubleshoot
  issue="Linux network rate limit fault shows no measurable throttling in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the destination filter matches your test traffic. Run tc -s qdisc show dev <interface> to verify the tbf qdisc is installed. NETWORK_BANDWIDTH values above the line rate have no effect."
/>

<Troubleshoot
  issue="Bursts above NETWORK_BANDWIDTH visible in monitoring"
  mode="docs"
  fallback="Token bucket filtering allows short bursts up to BURST. Reduce BURST (for example, to 1kb) to constrain bursting. PEAK_RATE caps the maximum instantaneous rate when set."
/>

<Troubleshoot
  issue="Throttling persists after the experiment ends"
  mode="docs"
  fallback="If the tbf qdisc was not removed, remove it manually with sudo tc qdisc del dev <interface> root."
/>

---

## Related faults

- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Add delay instead of capping bandwidth.
- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets instead of throttling.
- [Linux network corruption](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-corruption): Corrupt packets instead of throttling.
