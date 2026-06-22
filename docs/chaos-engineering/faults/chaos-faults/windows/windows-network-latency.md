---
id: windows-network-latency
title: Windows network latency
sidebar_label: Windows Network Latency
description: Inject network latency on egress traffic from a Windows VM so you can test how the workload behaves when a downstream dependency slows down.
keywords:
  - chaos engineering
  - windows network latency
  - windows fault
  - network chaos
tags:
  - chaos-engineering
  - windows-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows/windows-network-latency
- /docs/chaos-engineering/chaos-faults/windows/windows-network-latency
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-network-latency
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows network latency is a Windows chaos fault that adds `NETWORK_LATENCY` milliseconds (with optional `NETWORK_JITTER`) of latency to egress traffic from the target Windows VM to the destinations listed in `DESTINATION_HOSTS`/`DESTINATION_IPS` on ports `DESTINATION_PORTS` and protocols `NETWORK_PROTOCOLS` for `DURATION`, then removes the rule. The fault runs through the Windows chaos agent installed as a service on the target VM. Use the `NETWORK_WHITELIST_*` tunables to spare specific destinations from the latency.

Use this fault to test how a workload on a Windows VM behaves when a downstream dependency becomes slow: whether retries and timeouts work, whether circuit breakers open correctly, and whether monitoring detects the regression within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Slow dependency:** When latency to a specific dependency spikes, does the caller honour its timeout and circuit-breaker policy?
- **End-to-end SLO:** Does the end-user SLO degrade gracefully?
- **Retry storms:** Does retry logic amplify load when the dependency is slow?

---

## Prerequisites

- **Windows chaos infrastructure:** Install the chaos agent on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions).
- **Administrator privileges:** Network latency is an Advanced fault and requires the agent to run as administrator.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server VMs with the Windows chaos agent installed | Supported |
| Linux VMs | Not supported (use [VMware network latency](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-latency)) |

---

## Permissions required

This fault is classified as **Advanced** and requires the chaos agent to run as administrator on the target VM.

---

## Fault tunables

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault as a Go duration string (for example `30s`). | `30s` |
| `NETWORK_LATENCY` | Latency to inject in milliseconds. | `2000` |
| `NETWORK_JITTER` | Random jitter added on top of the latency, in milliseconds. | `0` |
| `DESTINATION_HOSTS` | Comma-separated destination hostnames to slow. | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs/CIDRs to slow. | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports to filter on. | `""` |
| `NETWORK_PROTOCOLS` | Comma-separated protocols (`tcp`, `udp`, `icmp`). | `""` |
| `NETWORK_WHITELIST_DESTINATION_HOSTS` | Hostnames excluded from latency. | `""` |
| `NETWORK_WHITELIST_DESTINATION_IPS` | IPs/CIDRs excluded from latency. | `""` |
| `NETWORK_WHITELIST_DESTINATION_PORTS` | Ports excluded from latency. | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

The Windows chaos agent on the target VM installs a network filter that adds `NETWORK_LATENCY` ms (+/- `NETWORK_JITTER` ms) to egress traffic matching `DESTINATION_HOSTS`/`DESTINATION_IPS`, `DESTINATION_PORTS`, and `NETWORK_PROTOCOLS` (minus the whitelist) for `DURATION`, then removes the filter.

---

## Expected behavior during fault execution

- Egress latency from the VM to matched destinations rises by `NETWORK_LATENCY` ms.
- Upstream callers see higher round-trip latency.
- After the duration ends, the filter is removed and latency returns to baseline.

:::info When the fault ends
The chaos agent removes the network filter. Latency returns to baseline within seconds.
:::

### Signals to watch

- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) from outside the VM.
- **Caller behavior:** Use a Prometheus probe on caller-side timeout and circuit-breaker metrics.

---

## Verify the fault execution effect

1. **Run `Test-NetConnection <DESTINATION_HOSTS_entry> -InformationLevel Detailed` from the target VM.**

   `PingReplyDetails.RoundtripTime` should rise by `NETWORK_LATENCY` during the chaos window.

2. **Run a quick HTTP call from a peer machine.**

   Round-trip should rise during the window.

---

## Recovery and cleanup

- **End of duration:** The chaos agent removes the filter.
- **Abort:** Stopping the experiment also removes the filter.
- **Manual recovery:** Restart the chaos agent service (`Restart-Service HCEAgent`) if filters survive.

---

## Limitations

- **Egress only:** The rule affects egress traffic from the VM. Ingress is not slowed.
- **DNS at start:** `DESTINATION_HOSTS` is resolved when the rule is installed.
- **Administrator required:** This is an Advanced fault and requires the agent to run as administrator.

---

## Troubleshooting

<Troubleshoot
  issue="Windows network latency has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify DESTINATION_HOSTS or DESTINATION_IPS actually match the traffic you are measuring. If the workload uses a proxy or VPN, the rule may not match the real egress path."
/>

<Troubleshoot
  issue="Windows network latency fails with access denied"
  mode="docs"
  fallback="The chaos agent must run as administrator to install network filters. Reinstall the agent as administrator and retry."
/>

---

## Related faults

- [Windows network loss](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-loss): Drop packets instead of delaying them.
- [Windows blackhole chaos](/docs/chaos-engineering/faults/chaos-faults/windows/windows-blackhole-chaos): Block traffic entirely instead of slowing it.
