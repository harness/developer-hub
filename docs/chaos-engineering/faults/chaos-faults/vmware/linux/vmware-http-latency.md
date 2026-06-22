---
id: vmware-http-latency
title: VMware HTTP latency
sidebar_label: VMware HTTP Latency
description: Inject HTTP response latency on a target service running inside a Linux VMware VM so you can test how callers behave when a downstream service slows down.
keywords:
  - chaos engineering
  - vmware http latency
  - vmware fault
  - http chaos
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-http-latency
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-http-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware HTTP latency is a VMware chaos fault that adds `LATENCY` milliseconds to HTTP responses from the service listening on `TARGET_SERVICE_PORT` inside the Linux VM `VM_NAME`. The fault inserts an HTTP proxy on `PROXY_PORT` (on interface `NETWORK_INTERFACE`) that intercepts a `TOXICITY` percentage of traffic for `TOTAL_CHAOS_DURATION` seconds, then restores normal routing. The proxy is launched via VMware Tools (Guest Operations API) as `VM_USER_NAME`.

Use this fault to test how callers behave when a service slows down: whether the caller honours its timeout, whether circuit breakers trip, whether retries amplify load, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Slow downstream service:** When the service slows by `LATENCY` ms, does the caller honour its timeout?
- **Partial slowdown:** With `TOXICITY < 100`, only a percentage of requests slow down: do tail-latency dashboards reflect this correctly?
- **Retry-storm risk:** Do retries amplify the load when responses slow?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **HTTP proxy binary installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install the HTTP chaos prerequisite.
- **Free port:** `PROXY_PORT` is not already in use on `NETWORK_INTERFACE`.
- **Capability for the port:** `VM_USER_NAME` can bind `PROXY_PORT` (ports below 1024 require `sudo` or `CAP_NET_BIND_SERVICE`).
- **Traffic redirected to the proxy:** The fault's traffic-redirection requires `iptables` or equivalent to send service traffic through `PROXY_PORT`.
- **vCenter chaos role:** `GOVC_USERNAME` is mapped to the chaos role per [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs hosted on vSphere / vCenter (any distro with VMware Tools, `iptables`, and the HTTP chaos binary) | Supported |
| Windows VMs | Not supported |

---

## Permissions required

**On vCenter.** Map `GOVC_USERNAME` to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions). The role needs Guest Operations (Program execution, Modifications, Queries).

**On the guest OS.** `VM_USER_NAME` must be able to launch the HTTP chaos binary, bind `PROXY_PORT`, and update `iptables` rules for traffic redirection.

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

**HTTP chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Interface where the proxy is inserted. | `ens160` |
| `TARGET_SERVICE_PORT` | Port of the target HTTP service on the guest. | `80` |
| `PROXY_PORT` | Port the chaos proxy listens on. | `8080` |
| `LATENCY` | HTTP response latency to inject in milliseconds. | `2000` |
| `TOXICITY` | Percentage of intercepted requests affected (0-100). | `100` |

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

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, runs an HTTP chaos proxy on `PROXY_PORT` of `NETWORK_INTERFACE`, redirects traffic destined for `TARGET_SERVICE_PORT` through the proxy, applies `LATENCY` ms of latency to `TOXICITY` percent of requests for `TOTAL_CHAOS_DURATION` seconds, then removes the redirection and stops the proxy.

---

## Expected behavior during fault execution

- HTTP response latency on `TARGET_SERVICE_PORT` rises by `LATENCY` ms for `TOXICITY` percent of requests.
- Callers see higher round-trip latency; SLO-sensitive paths may breach.
- After the duration ends, the redirection is removed and the proxy stopped; latency returns to baseline.

:::info When the fault ends
The chaos pod removes the traffic redirection and stops the proxy via Guest Operations. HTTP latency returns to baseline within seconds.
:::

### Signals to watch

- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) from outside the VM and assert p95 within the SLA.
- **Caller behavior:** Use a Prometheus probe on caller-side timeout, retry, and circuit-breaker metrics.

---

## Verify the fault execution effect

1. **Send an HTTP request to the target service during the chaos window.**

   ```bash
   time curl http://<VM_IP>:<TARGET_SERVICE_PORT>/health
   ```

   Latency should rise by `LATENCY` (within `TOXICITY` percent of requests).

2. **Inspect `iptables` rules on the guest.**

   ```bash
   sudo iptables -t nat -L -n
   ```

   You should see the chaos redirection during the window and it should be removed afterwards.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the redirection and stops the proxy.
- **Abort:** Stopping the experiment also removes the redirection and stops the proxy.
- **Manual recovery:** If the redirection remains, SSH into the VM and remove the offending `iptables` rule, and kill the chaos process listening on `PROXY_PORT`.

---

## Limitations

- **HTTP only:** The fault affects HTTP traffic. HTTPS (TLS) requires the proxy to terminate TLS or the client to trust the proxy CA.
- **Single port per run:** Each fault run targets one `TARGET_SERVICE_PORT`.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.
- **Traffic redirection invasive:** The fault mutates `iptables` NAT rules. Workloads that depend on specific NAT behavior may interact in unexpected ways.

---

## Troubleshooting

<Troubleshoot
  issue="VMware HTTP latency has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify that traffic is actually flowing through the chaos proxy (sudo iptables -t nat -L -n on the guest). Confirm TARGET_SERVICE_PORT matches the live service port. Confirm the workload talks HTTP, not HTTPS."
/>

<Troubleshoot
  issue="VMware HTTP latency fails with address already in use"
  mode="docs"
  fallback="Another process is already listening on PROXY_PORT. Either stop that process or choose a different PROXY_PORT in the experiment tunables."
/>

---

## Related faults

- [VMware HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-reset-peer): Reset TCP connections instead of slowing them.
- [VMware HTTP response modify](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-response-modify): Modify HTTP responses (status code, body, headers) instead of slowing them.
- [VMware network latency](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-network-latency): Inject latency at the network layer instead of at HTTP layer.
