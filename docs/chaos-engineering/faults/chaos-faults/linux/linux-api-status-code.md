---
id: linux-api-status-code
title: Linux API status code
sidebar_label: Linux API Status Code
description: Override the HTTP status code (and optionally the response body) of API responses passing through a target Linux machine for a configurable duration.
keywords:
  - chaos engineering
  - linux api status code
  - linux fault
  - api chaos
tags:
  - chaos-engineering
  - linux-faults
  - api-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-api-status-code
- /docs/chaos-engineering/chaos-faults/linux/linux-api-status-code
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux API status code is a chaos fault that starts a local proxy on the target Linux machine, redirects traffic to/from `TARGET_SERVICE_PORT` through the proxy on `PROXY_PORT`, and overrides matching API responses with `STATUS_CODE` (and optionally `RESPONSE_BODY`) for `DURATION`. Filters and HTTPS interception controls mirror [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block). The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how callers handle specific error responses: whether they retry safely on `5xx`, give up on `4xx`, parse the override body correctly, and whether monitoring detects the elevated error rate within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Error class handling:** When matching responses return `STATUS_CODE`, do callers do the right thing (retry on `5xx`, give up on `4xx`)?
- **Rate-limit simulation:** Return `429 Too Many Requests` with a `Retry-After` body to validate back-off behavior.
- **Content filtering:** Return `404 Not Found` for specific paths to confirm callers honor "missing resource" semantics.
- **Monitoring fidelity:** Do alerts on the chosen status-code class fire within the alerting SLA?

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

Configure the following fault parameters when you add Linux API status code to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `STATUS_CODE` | HTTP status code to return for matching API calls. | `404` |
| `RESPONSE_BODY` | Optional body string to return with `STATUS_CODE`. Leave empty to keep the original body. | `""` |
| `TARGET_SERVICE_PORT` | Port of the application (ingress) or upstream service (egress) to intercept. | `80` |
| `PROXY_PORT` | Port on which the local proxy listens. | `20000` |
| `NETWORK_INTERFACE` | Network interface used for ingress redirection. | `eth0` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Request filters (combine as needed)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | API path glob to match. | `""` |
| `HEADERS_FILTERS` | HTTP headers filter. | `""` |
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

Adds an iptables redirect that routes `TARGET_SERVICE_PORT` traffic through the local proxy on `PROXY_PORT` for `DURATION`. Matching API responses are replaced with `STATUS_CODE` (and `RESPONSE_BODY` when set). On exit, the iptables redirect and proxy are removed.

---

## Expected behavior during fault execution

- Matching API calls return `STATUS_CODE` (with the optional `RESPONSE_BODY`) for the duration of the fault.
- Non-matching calls pass through to the original destination unchanged.
- Callers react per the status-code class: `5xx` typically triggers retries, `4xx` typically does not.
- After the duration ends, the iptables redirect is removed and the proxy stops; responses pass through unchanged.

:::info When the fault ends
The chaos pod removes the iptables redirect and stops the local proxy. The next request returns the original response.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Caller error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on caller counters for the chosen status-code class.
- **Retry behavior:** Use a Prometheus probe on retry counters.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.

---

## Verify the fault execution effect

1. **Send a matching request from the VM.**

   ```bash
   curl -i http://localhost:<TARGET_SERVICE_PORT><PATH_FILTER-example>
   ```

   The response should report `STATUS_CODE` (and `RESPONSE_BODY` if configured) during the chaos window.

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

- **Single status code per run:** Each fault run uses one `STATUS_CODE`. Combine multiple experiments to test mixed responses.
- **Body replacement is optional:** Leaving `RESPONSE_BODY` empty preserves the upstream body with the new status; the combination may break Content-Length-sensitive callers.
- **HTTPS requires certificates** for matching and rewriting HTTPS traffic.
- **Single VM scope:** Each fault run targets one VM.
- **`/tmp` exec required.**

---

## Troubleshooting

<Troubleshoot
  issue="Linux API status code fault did not change any status in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify PATH_FILTER and METHODS match your test traffic. For HTTPS endpoints, set HTTPS_ENABLED=true and provide HTTPS_ROOT_CERT_FILE. Confirm the iptables redirect with sudo iptables -t nat -L -n -v."
/>

<Troubleshoot
  issue="Content-Length mismatch in callers"
  mode="docs"
  fallback="When RESPONSE_BODY is empty, the upstream body and Content-Length pass through with the new status. If callers complain about length mismatches, set RESPONSE_BODY to a small string that matches the expected Content-Type."
/>

<Troubleshoot
  issue="Status override persisted after the experiment ended"
  mode="docs"
  fallback="If the iptables redirect was not removed, inspect with sudo iptables -t nat -L -n -v and delete the rule. Kill any orphan proxy on PROXY_PORT."
/>

---

## Related faults

- [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block): Block matching API calls (returns the configured status code, similar to status code).
- [Linux API modify body](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-body): Override the body without changing the status code.
- [Linux API modify header](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-header): Override headers without changing the status code.
