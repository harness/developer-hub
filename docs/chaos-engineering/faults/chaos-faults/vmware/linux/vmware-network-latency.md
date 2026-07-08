---
id: vmware-network-latency
title: VMware network latency
sidebar_label: VMware Network Latency
description: Inject network latency on egress traffic from a Linux VMware VM for a configurable duration so you can test how the workload behaves under slow networks.
keywords:
  - chaos engineering
  - vmware network latency
  - vmware fault
  - network chaos
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-network-latency
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware network latency is a VMware chaos fault that adds `NETWORK_LATENCY` milliseconds (with optional `JITTER`) of latency to egress traffic on the network interface `NETWORK_INTERFACE` of the Linux VM `VM_NAME` for `TOTAL_CHAOS_DURATION` seconds, then removes the latency rule. You can scope the impact to specific destinations via `DESTINATION_IPS` or `DESTINATION_HOSTS` and to specific ports via `SOURCE_PORTS`/`DESTINATION_PORTS`. The fault uses VMware Tools (Guest Operations API) to apply the rule inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when a downstream dependency becomes slow: whether retries and timeouts work, whether circuit breakers open correctly, and whether monitoring detects the regression within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Slow downstream:** When latency to a specific dependency spikes, does the caller honor its timeout and circuit-breaker policy?
- **End-to-end SLO:** Does the end-user SLO degrade gracefully or breach when the network slows?
- **Retry storms:** Does retry logic amplify load when the dependency is slow?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **Linux `tc` (iproute2) installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation).
- **Sudo or capability for `tc`:** `VM_USER_NAME` can run `tc qdisc` (typically requires `sudo` or `CAP_NET_ADMIN`).
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools and `tc`) | Supported |
| Windows VMs | Not supported (use [VMware Windows network latency](/docs/chaos-engineering/faults/chaos-faults/windows/windows-network-latency)) |

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

Configure the following fault parameters when you add VMware network latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VM_NAME` | Name of the target VM as it appears in vCenter. | (required) |
| `VM_USER_NAME` | OS user account on the target VM. | (required) |
| `VM_PASSWORD` | Password for `VM_USER_NAME`. | (required) |

**Network chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Name of the interface to apply the latency rule to (for example `eth0`). | `eth0` |
| `NETWORK_LATENCY` | Network latency to inject in milliseconds. | `2000` |
| `JITTER` | Jitter to add to the latency, in milliseconds. | `0` |
| `DESTINATION_IPS` | Comma-separated list of destination IPv4/IPv6/CIDR ranges to affect. Empty means all destinations. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination DNS names to affect. Resolved at fault start. | `""` |
| `SOURCE_PORTS` | Comma-separated list of source ports to filter on. | `""` |
| `DESTINATION_PORTS` | Comma-separated list of destination ports to filter on. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between iterations. | `10` |
| `SEQUENCE` | Order in which multiple targets are stressed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

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

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, installs a queueing discipline on `NETWORK_INTERFACE` that delays egress packets matching `DESTINATION_IPS` / `DESTINATION_HOSTS` / `SOURCE_PORTS` / `DESTINATION_PORTS` by `NETWORK_LATENCY` ms (+/- `JITTER` ms) for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- Egress latency from `VM_NAME` to the matched destinations rises by `NETWORK_LATENCY` ms.
- Upstream callers see higher round-trip latency; SLO-sensitive paths may breach.
- After the duration ends, the `tc` rule is removed and latency returns to baseline.

:::info When the fault ends
The chaos pod removes the `tc qdisc` rule from `NETWORK_INTERFACE`. Latency returns to baseline within seconds.
:::

### Signals to watch

- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) from outside the VM.
- **Caller behavior:** Use a Prometheus probe on caller-side timeout and circuit-breaker metrics.

---

## Verify the fault execution effect

1. **SSH into the VM and inspect the qdisc.**

   ```bash
   sudo tc qdisc show dev eth0
   ```

   You should see the `netem` rule with the configured delay during the chaos window, and it should be removed afterwards.

2. **Ping the target from outside the VM.**

   Round-trip should rise by `NETWORK_LATENCY` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the `tc qdisc` rule via Guest Operations.
- **Abort the experiment:** Stopping the experiment also removes the rule.
- **Manual recovery:** SSH into the VM and run `sudo tc qdisc del dev <NETWORK_INTERFACE> root` to clear lingering rules.

---

## Limitations

- **Egress only:** The rule affects egress traffic from the VM. Ingress is not slowed (peer egress is unaffected).
- **Single interface per run:** Each fault run scopes one `NETWORK_INTERFACE`. Repeat the fault for additional interfaces.
- **`tc` required:** Without `tc` (iproute2) and the netem kernel module, the fault cannot run.
- **DNS at start time:** `DESTINATION_HOSTS` is resolved once at fault start. DNS changes during the chaos window are not picked up.

---

## Troubleshooting

<Troubleshoot
  issue="VMware network latency has no effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify NETWORK_INTERFACE matches the active interface (run ip a inside the VM). Verify VM_USER_NAME has sudo for tc. Verify DESTINATION_IPS / DESTINATION_HOSTS actually match the traffic you are measuring."
/>

<Troubleshoot
  issue="tc qdisc rule left behind after experiment in HCE"
  mode="docs"
  fallback="Run sudo tc qdisc del dev <NETWORK_INTERFACE> root inside the guest to remove lingering rules. This can happen if VMware Tools or the chaos pod was killed mid-run."
/>

---

## Related faults

- [VMware network loss](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-loss): Drop packets instead of delaying them.
- [VMware network rate limit](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-rate-limit): Cap bandwidth instead of injecting latency.
