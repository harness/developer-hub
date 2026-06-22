---
id: vmware-http-response-modify
title: VMware HTTP response modify
sidebar_label: VMware HTTP Response Modify
description: Rewrite HTTP responses (status code, body, headers) from a service running inside a Linux VMware VM so you can test how callers behave when responses are corrupted.
keywords:
  - chaos engineering
  - vmware http response modify
  - vmware fault
  - http chaos
tags:
  - chaos-engineering
  - vmware-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-http-modify-response
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-http-modify-response
- /docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-modify-response
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/linux/vmware-http-response-modify
- /docs/chaos-engineering/chaos-faults/vmware/linux/vmware-http-response-modify
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VMware HTTP response modify is a VMware chaos fault that rewrites HTTP responses from the service listening on `TARGET_SERVICE_PORT` inside the Linux VM `VM_NAME`. Depending on `HTTP_CHAOS_TYPE`, the fault overrides the status code (`STATUS_CODE`, optionally with a body via `MODIFY_RESPONSE_BODY` and `RESPONSE_BODY`) or modifies headers (`HEADERS_MAP`, `HEADER_MODE`). The fault inserts an HTTP proxy on `PROXY_PORT` (on interface `NETWORK_INTERFACE`) that affects a `TOXICITY` percentage of traffic for `TOTAL_CHAOS_DURATION` seconds, then restores normal routing.

Use this fault to test how callers behave when responses are corrupted: whether the caller honors error semantics for non-2xx status codes, whether body-parsing handles unexpected payloads gracefully, whether monitoring detects the regression within the alerting SLA, and whether on-call alerts fire correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Bad status codes:** When the service returns `503` instead of `200`, does the caller retry inside the SLO budget?
- **Garbled body:** When the body is replaced with arbitrary content, does the caller's parser handle the error gracefully?
- **Header injection / removal:** Does the workload depend on a header that may disappear?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **VMware Tools running on the guest:** Verify with `vmware-toolbox-cmd -v`.
- **HTTP proxy binary installed inside the guest:** Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install the HTTP chaos prerequisite.
- **Free port:** `PROXY_PORT` is not already in use on `NETWORK_INTERFACE`.
- **Capability for the port:** `VM_USER_NAME` can bind `PROXY_PORT` (ports below 1024 require `sudo` or `CAP_NET_BIND_SERVICE`).
- **Traffic redirected to the proxy:** The fault requires `iptables` (or equivalent) on the guest to route service traffic through `PROXY_PORT`.
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
| `HTTP_CHAOS_TYPE` | Type of modification: `status_code`, `body`, or `header`. | `status_code` |
| `TARGET_SERVICE_PORT` | Port of the target HTTP service on the guest. | `80` |

**Status code / body parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `STATUS_CODE` | Status code to return when `HTTP_CHAOS_TYPE=status_code`. | `""` |
| `MODIFY_RESPONSE_BODY` | If `true`, the body is also replaced with a default error payload matching the status code. | `true` |
| `RESPONSE_BODY` | Custom body to return instead of the default. Used with `HTTP_CHAOS_TYPE=body` or as the override body when `MODIFY_RESPONSE_BODY=true`. | `""` |

**Header parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `HEADERS_MAP` | JSON object of headers to add or modify, for example `{"X-Source":"chaos"}`. | `{}` |
| `HEADER_MODE` | `response` (rewrite response headers) or `request` (rewrite request headers). | `response` |

**Proxy parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_INTERFACE` | Interface where the proxy is inserted. | `ens160` |
| `PROXY_PORT` | Port the chaos proxy listens on. | `8080` |
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

Authenticates to vCenter, opens a Guest Operations session on `VM_NAME` as `VM_USER_NAME`, runs an HTTP chaos proxy on `PROXY_PORT` of `NETWORK_INTERFACE`, redirects traffic destined for `TARGET_SERVICE_PORT` through the proxy, and rewrites responses (status code / body / headers per `HTTP_CHAOS_TYPE`) for `TOXICITY` percent of requests for `TOTAL_CHAOS_DURATION` seconds, then removes the redirection and stops the proxy.

---

## Expected behavior during fault execution

- HTTP responses on `TARGET_SERVICE_PORT` are mutated according to `HTTP_CHAOS_TYPE`:
  - `status_code`: Status is replaced with `STATUS_CODE`. If `MODIFY_RESPONSE_BODY=true`, the body is replaced as well.
  - `body`: The body is replaced with `RESPONSE_BODY`.
  - `header`: Headers are modified per `HEADERS_MAP` in `HEADER_MODE` direction.
- Callers may treat modified responses as errors and retry, or may surface incorrect data.
- After the duration ends, the redirection is removed; responses return to baseline.

:::info When the fault ends
The chaos pod removes the traffic redirection and stops the proxy via Guest Operations. HTTP responses return to baseline within seconds.
:::

### Signals to watch

- **HTTP error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe).
- **Caller retry behavior:** Use a Prometheus probe on caller-side retry and error metrics.

---

## Verify the fault execution effect

1. **Send an HTTP request to the target service during the chaos window.**

   ```bash
   curl -v http://<VM_IP>:<TARGET_SERVICE_PORT>/health
   ```

   For `HTTP_CHAOS_TYPE=status_code`, the response should show `STATUS_CODE` instead of the original.

2. **After the fault ends, repeat the request.**

   The response should match the original behavior of the service.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the redirection and stops the proxy.
- **Abort:** Stopping the experiment also removes the redirection.
- **Manual recovery:** If the redirection remains, SSH into the VM and remove the offending `iptables` rule, and kill the chaos process listening on `PROXY_PORT`.

---

## Limitations

- **HTTP only:** The fault affects HTTP traffic. HTTPS requires the proxy to terminate TLS or the client to trust the proxy CA.
- **Single port per run:** Each fault run targets one `TARGET_SERVICE_PORT`.
- **`HEADERS_MAP` format:** Must be valid JSON; invalid JSON causes the fault to error out.
- **VMware Tools required:** Without VMware Tools, the fault cannot run.

---

## Troubleshooting

<Troubleshoot
  issue="VMware HTTP response modify has no observable effect in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify that traffic is actually flowing through the chaos proxy (sudo iptables -t nat -L -n on the guest). Confirm TARGET_SERVICE_PORT matches the live service port. Confirm the workload talks HTTP, not HTTPS."
/>

<Troubleshoot
  issue="HEADERS_MAP rejected as invalid JSON in HCE"
  mode="docs"
  fallback='HEADERS_MAP must be a flat JSON object of strings, for example {"X-Source":"chaos"}. Validate the JSON before submitting the experiment.'
/>

---

## Related faults

- [VMware HTTP latency](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-latency): Slow responses instead of modifying them.
- [VMware HTTP reset peer](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/vmware-http-reset-peer): Reset connections instead of modifying responses.
