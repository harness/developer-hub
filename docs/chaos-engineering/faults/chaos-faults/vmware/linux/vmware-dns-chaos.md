---
id: vmware-dns-chaos
title: VMware DNS chaos
sidebar_label: VMware DNS Chaos
description: Force DNS resolution failures for specific hostnames inside a Linux VMware VM so you can test how the workload behaves when DNS is unhealthy.
keywords:
  - chaos engineering
  - vmware dns chaos
  - vmware fault
  - dns resilience
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-dns-chaos
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-dns-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware DNS chaos is a VMware chaos fault that intercepts DNS queries on the Linux VM `VM_NAME` and returns errors for hostnames matching `TARGET_HOSTNAMES` (compared via `MATCH_SCHEME`) for `TOTAL_CHAOS_DURATION` seconds, then restores normal resolution. Non-matching queries are forwarded to `UPSTREAM_SERVER` (or the guest's existing resolver when empty). The fault listens on `PORT` and uses VMware Tools (Guest Operations API) to act inside the guest as `VM_USER_NAME`.

Use this fault to test how a workload on a VMware-hosted VM behaves when DNS resolution fails for a specific dependency: whether the caller retries correctly, whether circuit breakers trip, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **DNS-driven dependency outage:** When DNS fails for one dependency, does the caller honour its timeout and circuit breaker?
- **Caching behavior:** Does the workload's local DNS cache absorb short blips, or does it fail on the first failure?
- **Alert fidelity:** Do downstream alerts fire when DNS resolution starts failing?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **DNS chaos binary installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install the DNS interceptor prerequisite.
- **Resolver configuration on the guest:** The workload's DNS resolver on the VM is configured to query `127.0.0.1:<PORT>` (or the interceptor sits on the guest's default DNS port). Without that, the interceptor cannot affect the workload.
- **Capability for the port:** `VM_USER_NAME` can bind `PORT` (ports below 1024 require `sudo` or `CAP_NET_BIND_SERVICE`).
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools) | Supported |
| Windows VMs | Not supported |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs Guest Operations (Program execution, Modifications, Queries).

**On the guest OS.** `VM_USER_NAME` must be able to launch the DNS chaos binary, bind `PORT`, and update the resolver configuration (`/etc/resolv.conf`) if required.

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

**DNS chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_HOSTNAMES` | Comma-separated list of hostnames to fail. Empty means fail every query. | `""` |
| `MATCH_SCHEME` | Matching scheme: `exact` or `substring`. | `substring` |
| `UPSTREAM_SERVER` | DNS server (IP) to forward unmatched queries to. Empty uses the guest's existing resolver. | `""` |
| `PORT` | UDP port the DNS interceptor binds to on the guest. | `54` |

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

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, runs a DNS interceptor on `PORT` that fails queries matching `TARGET_HOSTNAMES` (per `MATCH_SCHEME`) and forwards the rest to `UPSTREAM_SERVER`, for `TOTAL_CHAOS_DURATION` seconds, then stops the interceptor.

---

## Expected behavior during fault execution

- DNS queries for `TARGET_HOSTNAMES` fail (NXDOMAIN or SERVFAIL).
- Workloads that resolve those names get connection failures; callers may retry or trip circuit breakers.
- After the duration ends, the interceptor is stopped and normal DNS resolution resumes.

:::info When the fault ends
The chaos pod stops the DNS interceptor via Guest Operations. DNS resolution returns to baseline within seconds.
:::

### Signals to watch

- **DNS failure rate:** Use a Prometheus probe on your DNS metrics (CoreDNS, BIND) or a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `dig <hostname>` and asserting `NOERROR`.
- **Workload:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert error budget is respected.

---

## Verify the fault execution effect

1. **From inside the VM, query a target hostname.**

   ```bash
   dig <hostname> @127.0.0.1 -p <PORT>
   ```

   For names in `TARGET_HOSTNAMES`, expect a failure status. For other names, expect `NOERROR`.

2. **After the fault ends, repeat the query.**

   All queries should resolve normally.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the interceptor via Guest Operations.
- **Abort:** Stopping the experiment also stops the interceptor.
- **Manual recovery:** If the interceptor survived, SSH into the VM, find the listening process on `PORT` (`sudo ss -lnup`), and kill it.

---

## Limitations

- **Resolver configuration:** The workload must use the DNS interceptor's port for the fault to take effect. If the workload uses an external DNS server directly, the fault has no impact.
- **`MATCH_SCHEME` semantics:** `substring` matches any hostname that contains the target string; use `exact` for stricter matching.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.
- **Single VM per run:** Each fault run targets one `VM_NAME`.

---

## Troubleshooting

<Troubleshoot
  issue="VMware DNS chaos has no effect on the workload in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the workload uses the DNS interceptor. If the workload caches DNS or uses its own resolver, update /etc/resolv.conf inside the VM to point to 127.0.0.1:<PORT>, or run the interceptor on the system DNS port (53) with appropriate capability."
/>

<Troubleshoot
  issue="VMware DNS chaos fails with bind permission denied"
  mode="docs"
  fallback="Binding to ports below 1024 requires sudo or CAP_NET_BIND_SERVICE. Either run the interceptor as root or use a port >= 1024 (default 54)."
/>

---

## Related faults

- [VMware HTTP latency](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-latency): Inject HTTP-level latency instead of breaking DNS.
- [VMware network loss](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-loss): Drop packets at the network layer instead of failing DNS.
