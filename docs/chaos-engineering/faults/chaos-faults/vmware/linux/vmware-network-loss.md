---
id: vmware-network-loss
title: VMware network loss
sidebar_label: VMware Network Loss
description: Drop a configurable percentage of egress packets on a Linux VMware VM so you can test how the workload behaves when packet loss spikes.
keywords:
  - chaos engineering
  - vmware network loss
  - vmware fault
  - packet loss
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-network-loss
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware network loss is a VMware chaos fault that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of egress packets on the network interface `NETWORK_INTERFACE` of the Linux VM `VM_NAME` for `TOTAL_CHAOS_DURATION` seconds, then removes the loss rule. You can scope the impact to specific destinations via `DESTINATION_IPS` or `DESTINATION_HOSTS` and to specific ports via `SOURCE_PORTS`/`DESTINATION_PORTS`. The fault uses VMware Tools (Guest Operations API) to apply the rule inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when packet loss spikes: whether TCP retransmits stay within the SLA, whether application-layer retries recover correctly, and whether monitoring detects the regression within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Lossy network:** When packet loss spikes, do TCP retransmits and application retries recover the request inside the SLA?
- **Heartbeat fragility:** Does cluster membership stay healthy when heartbeats lose a percentage of packets?
- **Real-time workloads:** Does media or voice quality degrade gracefully under loss?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **Linux `tc` (iproute2) installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation).
- **Sudo for `tc`:** `VM_USER_NAME` can run `tc qdisc` (typically requires `sudo` or `CAP_NET_ADMIN`).
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools and `tc`) | Supported |
| Windows VMs | Not supported (use [VMware Windows network loss](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-loss)) |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs Guest Operations (Program execution, Modifications, Queries).

**On the guest OS.** `VM_USER_NAME` must be able to run `tc qdisc` on `NETWORK_INTERFACE`.

---

## Authentication

| Layer | Tunables |
| --- | --- |
| vCenter | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE` |
| Guest OS | `VM_USER_NAME`, `VM_PASSWORD` |

Store each credential as a text secret in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) and reference the secret identifier when configuring the experiment.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |

**Network chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Name of the interface to apply the loss rule to (for example `eth0`). | `eth0` |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of egress packets to drop (0-100). | `100` |
| `DESTINATION_IPS` | Comma-separated list of destination IPv4/IPv6/CIDR ranges to affect. Empty means all. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination DNS names to affect. Resolved at fault start. | `""` |
| `SOURCE_PORTS` | Comma-separated list of source ports to filter on. | `""` |
| `DESTINATION_PORTS` | Comma-separated list of destination ports to filter on. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between iterations. | `10` |
| `SEQUENCE` | `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**vCenter authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GOVC_URL` | vCenter server URL. | `""` |
| `GOVC_USERNAME` | vCenter user mapped to the chaos role. | `""` |
| `GOVC_PASSWORD` | Password for `GOVC_USERNAME`. | `""` |
| `GOVC_INSECURE` | Skip SSL certificate verification when set to `true`. | `true` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, installs a queueing discipline on `NETWORK_INTERFACE` that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of egress packets matching the destination/port filters for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- A configurable share of egress packets are dropped on `NETWORK_INTERFACE`.
- TCP retransmits rise; throughput drops.
- Application-layer error rates may rise; retry budgets may be consumed.
- After the duration ends, the rule is removed and loss returns to baseline.

:::info When the fault ends
The chaos pod removes the `tc qdisc` rule from `NETWORK_INTERFACE`. Packet loss returns to baseline within seconds.
:::

### Signals to watch

- **TCP retransmits:** Use a Prometheus probe on `node_netstat_Tcp_RetransSegs`.
- **Application:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error budget is respected.

---

## Verify the fault execution effect

1. **Inspect the qdisc on the guest.**

   ```bash
   sudo tc qdisc show dev eth0
   ```

   Look for a `netem` rule with `loss <percentage>%`.

2. **Ping the target from outside the VM.**

   Packet loss percentage should match `NETWORK_PACKET_LOSS_PERCENTAGE` during the window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the rule.
- **Abort:** Stopping the experiment also removes the rule.
- **Manual recovery:** `sudo tc qdisc del dev <NETWORK_INTERFACE> root`.

---

## Limitations

- **Egress only:** The rule affects egress packets only.
- **Single interface per run:** Repeat the fault for additional interfaces.
- **`tc` required:** Without `tc` and netem, the fault cannot run.

---

## Troubleshooting

<Troubleshoot
  issue="VMware network loss has no effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify NETWORK_INTERFACE matches the active interface (ip a). Verify VM_USER_NAME can run tc with sudo. Verify DESTINATION_IPS or DESTINATION_HOSTS match the traffic you are measuring."
/>

<Troubleshoot
  issue="tc qdisc rule left behind after experiment in HCE"
  mode="docs"
  fallback="Run sudo tc qdisc del dev <NETWORK_INTERFACE> root inside the guest to remove lingering rules."
/>

---

## Related faults

- [VMware network latency](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-latency): Add latency instead of loss.
- [VMware network rate limit](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-rate-limit): Cap bandwidth instead of loss.
