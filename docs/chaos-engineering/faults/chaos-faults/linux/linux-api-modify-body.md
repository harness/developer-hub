---
id: linux-api-modify-body
title: Linux API modify body
sidebar_label: Linux API Modify Body
description: Replace API request or response bodies passing through a target Linux machine for a configurable duration so you can test how callers handle unexpected payloads.
keywords:
  - chaos engineering
  - linux api modify body
  - linux fault
  - api chaos
tags:
  - chaos-engineering
  - linux-faults
  - api-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-api-modify-body
- /docs/chaos-engineering/chaos-faults/linux/linux-api-modify-body
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux API modify body is a chaos fault that starts a local proxy on the target Linux machine, redirects traffic to/from `TARGET_SERVICE_PORT` through the proxy on `PROXY_PORT`, and overwrites the request or response body with `RESPONSE_BODY` for matching API calls for `DURATION`. `DATA_DIRECTION` chooses whether to modify the `request`, `response`, or `both`. Filters and HTTPS interception controls mirror [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block). The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how callers handle unexpected payloads: whether body validation catches malformed data, whether response parsers crash or recover, whether PII redaction works correctly, and whether monitoring detects the unexpected data within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Body validation:** When `RESPONSE_BODY` substitutes an unexpected payload, do callers validate it cleanly or crash?
- **PII redaction:** Substitute redacted strings to verify the application does not leak sensitive data through logs or downstream calls.
- **Stub responses:** Inject a fixed payload to exercise downstream paths without changing the upstream service.
- **Monitoring fidelity:** Do alerts on schema-validation failures and business-metric anomalies fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target service port reachable:** `TARGET_SERVICE_PORT` is the port the application listens on (ingress) or the upstream service port (egress).
- **Proxy port free:** `PROXY_PORT` (default `20000`) is not bound by another process.
- **HTTPS material if `HTTPS_ENABLED=true`:** Provide a CA bundle in `HTTPS_ROOT_CERT_FILE` and additional certificates in `CUSTOM_CERTIFICATES`.
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

Configure the following fault parameters when you add Linux API modify body to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RESPONSE_BODY` | Body string used to overwrite matching request or response payloads. | (required) |

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

Adds an iptables redirect that routes `TARGET_SERVICE_PORT` traffic through the local proxy on `PROXY_PORT` for `DURATION`. Matching API calls have their body (per `DATA_DIRECTION`) overwritten with `RESPONSE_BODY` before being forwarded. On exit, the iptables redirect and proxy are removed.

---

## Expected behavior during fault execution

- Matching API calls deliver `RESPONSE_BODY` in place of the real body (or in addition to the real body, depending on `DATA_DIRECTION`).
- Body schema validators in dependent code fire if the new body does not match the expected schema.
- Status code and headers are unchanged unless paired with [Linux API status code](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-status-code) or [Linux API modify header](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-header).
- After the duration ends, the iptables redirect is removed and the proxy stops; bodies pass through unchanged.

:::info When the fault ends
The chaos pod removes the iptables redirect and stops the local proxy. The next request flows directly with the original body.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Validation errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on body-validation or schema-mismatch counters.
- **End-to-end behavior:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint.
- **Business metrics:** Use a Prometheus probe on a business-level success metric (orders accepted, payments completed).

---

## Verify the fault execution effect

1. **Send a matching request from the VM.**

   ```bash
   curl -i http://localhost:<TARGET_SERVICE_PORT><PATH_FILTER-example>
   ```

   The response body should equal `RESPONSE_BODY` during the chaos window.

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
- **Manual recovery:** If the redirect survives an abort, inspect with `sudo iptables -t nat -L -n -v` and delete the rule; kill the proxy with `sudo lsof -i :<PROXY_PORT>` followed by `sudo kill <pid>`.

---

## Limitations

- **Body replacement, not patch:** `RESPONSE_BODY` overwrites the body entirely; partial JSON patches are not supported.
- **Content-Length:** The proxy updates `Content-Length` to match `RESPONSE_BODY`. Chunked encodings are handled but very large bodies may incur overhead.
- **HTTPS requires certificates** for matching by path/header/method.
- **Single VM scope:** Each fault run targets one VM.
- **`/tmp` exec required.**

---

## Troubleshooting

<Troubleshoot
  issue="Linux API modify body fault did not modify any body in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify PATH_FILTER and METHODS match your test traffic. For HTTPS endpoints, set HTTPS_ENABLED=true and provide HTTPS_ROOT_CERT_FILE. Confirm the iptables redirect is in place with sudo iptables -t nat -L -n -v."
/>

<Troubleshoot
  issue="Content-Length mismatch errors in callers"
  mode="docs"
  fallback="The proxy updates Content-Length to match RESPONSE_BODY. If callers still see length errors, they may be parsing chunked responses; ensure RESPONSE_BODY is valid for the target Content-Type."
/>

<Troubleshoot
  issue="Body modification persisted after the experiment ended"
  mode="docs"
  fallback="If the iptables redirect was not removed, inspect with sudo iptables -t nat -L -n -v and delete the rule. Kill any orphan proxy on PROXY_PORT."
/>

---

## Related faults

- [Linux API modify header](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-header): Override headers instead of the body.
- [Linux API status code](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-status-code): Change the status code (and optionally the body).
- [Linux JVM modify return](/docs/chaos-engineering/faults/chaos-faults/linux/linux-jvm-modify-return): Override method return values inside the JVM instead of at the HTTP layer.
