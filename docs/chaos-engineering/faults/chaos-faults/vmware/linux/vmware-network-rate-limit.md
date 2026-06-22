---
id: vmware-network-rate-limit
title: VMware network rate limit
sidebar_label: VMware Network Rate Limit
description: Cap egress bandwidth on a Linux VMware VM so you can test how the workload behaves when network throughput is throttled.
keywords:
  - chaos engineering
  - vmware network rate limit
  - vmware fault
  - bandwidth throttle
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-network-rate-limit
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-network-rate-limit
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware network rate limit is a VMware chaos fault that caps egress bandwidth on the network interface `NETWORK_INTERFACE` of the Linux VM `VM_NAME` to `NETWORK_BANDWIDTH` (with optional `BURST` and `LIMIT`) for `TOTAL_CHAOS_DURATION` seconds, then removes the cap. The fault uses VMware Tools (Guest Operations API) to apply the rule inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when bandwidth is constrained: whether streaming/transfer workloads degrade gracefully, whether retries amplify the slowdown, and whether monitoring detects the regression within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Constrained bandwidth:** When bandwidth is throttled, does the workload degrade inside the SLA?
- **Replication backlog:** Does database replication catch up after the cap is removed?
- **Backup window:** Does a backup job complete within the maintenance window when bandwidth halves?

---

## Prerequisites

- **VMware Tools** running on the guest.
- **`tc` (iproute2)** installed inside the guest. Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation).
- **Sudo for `tc`:** `VM_USER_NAME` can run `tc qdisc` on `NETWORK_INTERFACE`.
- **vCenter chaos role:** per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools and `tc`) | Supported |
| Windows VMs | Not supported |

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

**Rate-limit parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Name of the interface to throttle. | `eth0` |
| `NETWORK_BANDWIDTH` | Bandwidth cap with unit (for example `1mbit`, `512kbit`). | `1mbit` |
| `BURST` | Maximum burst size with unit (for example `2kb`). | `""` |
| `LIMIT` | Queue limit in bytes (for example `20mb`). | `""` |
| `PEAK_RATE` | Peak rate for the bucket (for example `1mb`). | `""` |
| `MIN_BURST` | Minimum chunk size with unit (for example `1540`). | `""` |

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

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, installs a token-bucket queueing discipline on `NETWORK_INTERFACE` that caps egress bandwidth at `NETWORK_BANDWIDTH` (with `BURST`, `LIMIT`, `PEAK_RATE`, `MIN_BURST` when set) for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- Egress throughput from `VM_NAME` is capped at `NETWORK_BANDWIDTH`.
- Large transfers slow down; replication may fall behind.
- After the duration ends, the cap is removed and throughput returns to baseline.

:::info When the fault ends
The chaos pod removes the `tc qdisc` rule via Guest Operations. Throughput returns to baseline within seconds.
:::

### Signals to watch

- **Throughput:** Use a Prometheus probe on `node_network_transmit_bytes_total`.
- **Replication lag:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that reads the replication lag from your database.

---

## Verify the fault execution effect

1. **Inspect the qdisc on the guest.**

   ```bash
   sudo tc qdisc show dev eth0
   ```

   Look for the token-bucket filter with the configured rate.

2. **Run an iperf/scp transfer from the VM.**

   Throughput should be capped at `NETWORK_BANDWIDTH` during the window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the rule.
- **Abort:** Stopping the experiment also removes the rule.
- **Manual recovery:** `sudo tc qdisc del dev <NETWORK_INTERFACE> root`.

---

## Limitations

- **Egress only:** The cap applies to egress traffic only.
- **Single interface per run:** Repeat the fault for additional interfaces.
- **Unit format:** `NETWORK_BANDWIDTH` must include a `tc`-compatible unit (`kbit`, `mbit`, etc).

---

## Troubleshooting

<Troubleshoot
  issue="VMware network rate limit has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify NETWORK_INTERFACE matches the active interface inside the guest (ip a). Verify the workload actually transmits more than NETWORK_BANDWIDTH before the cap. Verify VM_USER_NAME can run tc with sudo."
/>

<Troubleshoot
  issue="tc rule remains after the experiment"
  mode="docs"
  fallback="Run sudo tc qdisc del dev <NETWORK_INTERFACE> root inside the guest to remove lingering rules."
/>

---

## Related faults

- [VMware network latency](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-latency): Add latency instead of throttling bandwidth.
- [VMware network loss](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-loss): Drop packets instead of throttling.
