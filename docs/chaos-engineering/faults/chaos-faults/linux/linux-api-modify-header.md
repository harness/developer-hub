---
id: linux-api-modify-header
title: Linux API modify header
sidebar_label: Linux API Modify Header
description: Override HTTP headers on API requests or responses passing through a target Linux machine for a configurable duration so you can test how callers handle altered headers.
keywords:
  - chaos engineering
  - linux api modify header
  - linux fault
  - api chaos
tags:
  - chaos-engineering
  - linux-faults
  - api-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-api-modify-header
- /docs/chaos-engineering/chaos-faults/linux/linux-api-modify-header
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux API modify header is a chaos fault that starts a local proxy on the target Linux machine, redirects traffic to/from `TARGET_SERVICE_PORT` through the proxy on `PROXY_PORT`, and replaces header values in matching API calls with the keys/values defined in `HEADERS_MAP` for `DURATION`. `DATA_DIRECTION` chooses whether to modify the `request`, `response`, or `both`. Filters and HTTPS interception controls mirror [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block). The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how callers handle altered headers: whether authentication breaks with invalid tokens, whether content-type changes affect parsing, whether cache headers cause stale or missed cache lookups, and whether monitoring detects the resulting errors within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Authentication failures:** When `Authorization` is replaced with a stale token, do upstream services return clean `401`s?
- **Content negotiation:** Replace `Accept` or `Content-Type` to drive different code paths in the dependent service.
- **Cache headers:** Override `Cache-Control` or `ETag` to validate cache-validation behavior.
- **Monitoring fidelity:** Do alerts on authentication failures, content-type mismatches, and downstream errors fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target service port reachable:** `TARGET_SERVICE_PORT` is the port the application listens on (ingress) or the upstream service port (egress).
- **Proxy port free:** `PROXY_PORT` (default `20000`) is not bound by another process.
- **HTTPS material if `HTTPS_ENABLED=true`:** Provide a CA bundle in `HTTPS_ROOT_CERT_FILE`.
- **`/tmp` is exec-mountable.**

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

This fault is classified as an **Advanced** Linux fault. It requires the Linux Chaos Infrastructure systemd service to run with the root user and root user group on the target VM so it can install iptables redirects and bind the proxy port. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux API modify header to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `HEADERS_MAP` | JSON map of header keys to override and the new values (for example, `{"Authorization":"Bearer stale","Cache-Control":"no-cache"}`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `TARGET_SERVICE_PORT` | Port of the application (ingress) or upstream service (egress) to intercept. | `80` |
| `PROXY_PORT` | Port on which the local proxy listens. | `20000` |
| `NETWORK_INTERFACE` | Network interface used for ingress redirection. | `eth0` |
| `DATA_DIRECTION` | Direction of data to modify. Accepts `request`, `response`, or `both`. | `both` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Request filters (combine as needed)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | API path glob to match. | `""` |
| `HEADERS_FILTERS` | HTTP headers filter (used to match traffic, distinct from `HEADERS_MAP`). | `""` |
| `METHODS` | Comma-separated HTTP methods to match. | `""` |

**Direction and source/destination filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_DIRECTION` | `ingress` or `egress`. | `ingress` |
| `SOURCE_HOSTS` | Comma-separated source host names (ingress only). | `""` |
| `SOURCE_IPS` | Comma-separated source IPs (ingress only). | `""` |
| `DESTINATION_HOSTS` | Comma-separated destination host names (egress only). | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs (egress only). | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports (egress only). | `""` |

**HTTPS interception (egress)**

| Tunable | Description | Default |
| --- | --- | --- |
| `HTTPS_ENABLED` | Enable HTTPS interception. | `false` |
| `HTTPS_ROOT_CERT_FILE` | Path to the root CA bundle. | `""` |
| `CUSTOM_CERTIFICATES` | Base64-encoded custom certificates. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Adds an iptables redirect that routes `TARGET_SERVICE_PORT` traffic through the local proxy on `PROXY_PORT` for `DURATION`. Matching API calls have header values replaced per `HEADERS_MAP` (in `DATA_DIRECTION`) before being forwarded. On exit, the iptables redirect and proxy are removed.

---

## Expected behavior during fault execution

- Headers listed in `HEADERS_MAP` are replaced with the configured values on matching API calls.
- Headers not in `HEADERS_MAP` pass through unchanged.
- The status code and body are unchanged unless paired with [Linux API status code](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-status-code) or [Linux API modify body](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-body).
- After the duration ends, the iptables redirect is removed and the proxy stops; headers pass through unchanged.

:::info When the fault ends
The chaos pod removes the iptables redirect and stops the local proxy. The next request flows directly with the original headers.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Authentication failures:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `401`/`403` counters.
- **Cache hit ratio:** Use a Prometheus probe on cache-hit-ratio metrics when overriding cache headers.
- **End-to-end behavior:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **Send a matching request from the VM.**

   ```bash
   curl -i http://localhost:<TARGET_SERVICE_PORT><PATH_FILTER-example>
   ```

   The response headers should reflect the overrides in `HEADERS_MAP` during the chaos window.

2. **Inspect iptables redirects.**

   ```bash
   sudo iptables -t nat -L -n -v | grep <PROXY_PORT>
   ```

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the iptables redirect and stops the proxy when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the redirect and stops the proxy.
- **Manual recovery:** If the redirect survives an abort, inspect with `sudo iptables -t nat -L -n -v` and delete the rule; kill the proxy on `PROXY_PORT`.

---

## Limitations

- **Header replacement, not addition:** `HEADERS_MAP` replaces existing headers. To add headers that do not yet exist, the proxy still injects them as the new value.
- **Authentication contracts:** Replacing `Authorization` may break TLS-bound or signed requests if the upstream verifies the signature against original headers.
- **HTTPS requires certificates** for matching and rewriting HTTPS traffic.
- **Single VM scope:** Each fault run targets one VM.
- **`/tmp` exec required.**

---

## Troubleshooting

<Troubleshoot
  issue="Linux API modify header fault did not modify any header in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify HEADERS_MAP is valid JSON and PATH_FILTER/METHODS match your test traffic. For HTTPS endpoints, set HTTPS_ENABLED=true and provide HTTPS_ROOT_CERT_FILE."
/>

<Troubleshoot
  issue="HEADERS_MAP parsing error"
  mode="docs"
  fallback='HEADERS_MAP must be a single-line valid JSON object such as {"Header-Name":"value"}. Validate with jq before running the fault.'
/>

<Troubleshoot
  issue="Header overrides persisted after the experiment ended"
  mode="docs"
  fallback="If the iptables redirect was not removed, inspect with sudo iptables -t nat -L -n -v and delete the rule. Kill any orphan proxy on PROXY_PORT."
/>

---

## Related faults

- [Linux API modify body](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-body): Override the body instead of headers.
- [Linux API status code](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-status-code): Change the status code (and optionally the body).
- [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block): Block requests entirely instead of modifying headers.
