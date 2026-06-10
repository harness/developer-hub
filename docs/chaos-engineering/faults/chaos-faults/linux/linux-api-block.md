---
id: linux-api-block
title: Linux API block
sidebar_label: Linux API Block
description: Block API requests passing through a target Linux machine for a configurable duration by returning a configured status code, so you can test how callers handle a sudden API outage.
keywords:
  - chaos engineering
  - linux api block
  - linux fault
  - api chaos
tags:
  - chaos-engineering
  - linux-faults
  - api-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-api-block
- /docs/chaos-engineering/chaos-faults/linux/linux-api-block
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux API block is a chaos fault that starts a local proxy on the target Linux machine, redirects traffic to/from `TARGET_SERVICE_PORT` through the proxy on `PROXY_PORT`, and responds to matching API calls with `STATUS_CODE` for `DURATION`. Match filters include `PATH_FILTER`, `HEADERS_FILTERS`, `METHODS`, `SOURCE_HOSTS`/`SOURCE_IPS` (ingress) and `DESTINATION_HOSTS`/`DESTINATION_IPS`/`DESTINATION_PORTS` (egress), with `SERVICE_DIRECTION` choosing ingress or egress. HTTPS interception is enabled with `HTTPS_ENABLED` and the supplied certificate material. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how callers behave when a specific API endpoint suddenly returns errors: whether retries amplify the failure, whether circuit breakers fire, whether fallback responses kick in, and whether monitoring detects the elevated error rate within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Caller error handling:** When `PATH_FILTER` returns `STATUS_CODE`, do callers surface a clean error or retry indefinitely?
- **Circuit breakers:** Does the service-mesh or application circuit breaker open within the configured threshold?
- **Fallback paths:** Do fallback code paths or cached responses kick in correctly?
- **Monitoring fidelity:** Do alerts on 5xx error rate, retry counters, and end-to-end p99 fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target service port reachable:** `TARGET_SERVICE_PORT` is the port the application listens on (ingress) or the upstream service port (egress).
- **Proxy port free:** `PROXY_PORT` (default `20000`) is not bound by another process on the target VM.
- **HTTPS material if `HTTPS_ENABLED=true`:** Provide a CA bundle in `HTTPS_ROOT_CERT_FILE` and additional certificates in `CUSTOM_CERTIFICATES` so the proxy can decrypt egress HTTPS traffic.
- **`/tmp` is exec-mountable:** The proxy binary executes from `/tmp`. Verify with `findmnt -l | grep noexec | grep /tmp`. If `/tmp` is mounted `noexec`, remount with `sudo mount /tmp -o remount,exec`.

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

Configure the following fault parameters when you add Linux API block to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `STATUS_CODE` | HTTP status code returned for blocked API calls. | `404` |
| `TARGET_SERVICE_PORT` | Port of the application (ingress) or upstream service (egress) to intercept. | `80` |
| `PROXY_PORT` | Port on which the local proxy listens. | `20000` |
| `NETWORK_INTERFACE` | Network interface used for ingress redirection. | `eth0` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Request filters (combine as needed)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | API path glob to match (for example, `/api/v1/orders/*`). Leave empty to match all paths. | `""` |
| `HEADERS_FILTERS` | HTTP headers filter (comma-separated `Header=value` pairs). | `""` |
| `METHODS` | Comma-separated HTTP methods to match (for example, `GET,POST`). Leave empty to match all methods. | `""` |

**Direction and source/destination filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_DIRECTION` | Direction of service traffic. Accepts `ingress` (block requests arriving at the VM) or `egress` (block requests leaving the VM). | `ingress` |
| `SOURCE_HOSTS` | Comma-separated source host names to match (ingress only). | `""` |
| `SOURCE_IPS` | Comma-separated source IPs to match (ingress only). | `""` |
| `DESTINATION_HOSTS` | Comma-separated destination host names to match (egress only). | `""` |
| `DESTINATION_IPS` | Comma-separated destination IPs to match (egress only). | `""` |
| `DESTINATION_PORTS` | Comma-separated destination ports for egress traffic. | `""` |

**HTTPS interception (egress)**

| Tunable | Description | Default |
| --- | --- | --- |
| `HTTPS_ENABLED` | Enable HTTPS interception. Required for matching HTTPS traffic by `PATH_FILTER`, headers, or methods. | `false` |
| `HTTPS_ROOT_CERT_FILE` | Path to the root CA bundle used by the proxy to terminate egress HTTPS. | `""` |
| `CUSTOM_CERTIFICATES` | Base64-encoded custom certificates added to the proxy trust store. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Adds an iptables redirect on `NETWORK_INTERFACE` that routes `TARGET_SERVICE_PORT` traffic (in `SERVICE_DIRECTION`) to the local proxy on `PROXY_PORT` for `DURATION`. Requests matching the filters return `STATUS_CODE`; non-matching requests are forwarded to the original destination. On exit, the iptables redirect and proxy are removed.

---

## Expected behavior during fault execution

- Matching API calls receive `STATUS_CODE` instead of the real response.
- Non-matching calls pass through to the original destination.
- Callers see immediate failures with the configured status code; their retry and circuit-breaker logic engages.
- After the duration ends, the iptables redirect is removed and the proxy stops; traffic resumes its original path.

:::info When the fault ends
The chaos pod removes the iptables redirect and stops the local proxy. Traffic resumes its original path on the next packet; clients may need to reconnect for long-lived sessions.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Caller error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on caller 5xx counters.
- **Circuit-breaker state:** Use a Prometheus probe on circuit-breaker open/close transitions.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises the blocked API.

---

## Verify the fault execution effect

1. **Send a matching request from the VM.**

   ```bash
   curl -i http://localhost:<TARGET_SERVICE_PORT><PATH_FILTER-example>
   ```

   The response should report `STATUS_CODE` during the chaos window and the original response afterwards.

2. **Inspect iptables redirects.**

   ```bash
   sudo iptables -t nat -L -n -v | grep <PROXY_PORT>
   ```

   The redirect rule should be present during the chaos window and removed afterwards.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the iptables redirect and stops the proxy when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the redirect and stops the proxy.
- **Manual recovery:** If the redirect survives an abort, inspect with `sudo iptables -t nat -L -n -v` and delete the rules added by the fault; kill the proxy with `sudo lsof -i :<PROXY_PORT>` followed by `sudo kill <pid>`.
- **Workload recovery:** Clients that hit retries during the chaos window may continue retrying briefly; rate-limited or circuit-broken callers recover per their own policy.

---

## Limitations

- **HTTP/1.1 and HTTP/2 over TLS:** The proxy supports common HTTP semantics. HTTP/3 (QUIC) is not intercepted.
- **HTTPS requires certificates:** Without `HTTPS_ROOT_CERT_FILE` and a trusted CA, HTTPS traffic cannot be matched on path/header/method.
- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **Long-lived connections:** Streaming or WebSocket connections established before the redirect may not be intercepted until the next reconnect.
- **`/tmp` exec required:** A `noexec` mount on `/tmp` prevents the proxy from starting.

---

## Troubleshooting

<Troubleshoot
  issue="Linux API block fault did not block any request in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify PATH_FILTER, METHODS, and HEADERS_FILTERS match your test traffic. For HTTPS endpoints, set HTTPS_ENABLED=true and provide HTTPS_ROOT_CERT_FILE. Check sudo iptables -t nat -L -n -v during the chaos window to confirm the redirect is present."
/>

<Troubleshoot
  issue="Proxy port already in use"
  mode="docs"
  fallback="PROXY_PORT (default 20000) conflicted with another listener. Change PROXY_PORT to a free port and re-run. Confirm availability with sudo ss -lntp | grep <port>."
/>

<Troubleshoot
  issue="/tmp mounted noexec prevents the proxy from starting"
  mode="docs"
  fallback="Remount /tmp with exec permissions for the duration of the experiment: sudo mount /tmp -o remount,exec. Restore the original mount options after the experiment if required by your security policy."
/>

<Troubleshoot
  issue="Requests still blocked after the experiment ended"
  mode="docs"
  fallback="If the iptables redirect was not removed, inspect with sudo iptables -t nat -L -n -v and delete the rule added by the fault. Kill any orphan proxy with sudo lsof -i :<PROXY_PORT> followed by sudo kill <pid>."
/>

---

## Related faults

- [Linux API latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-latency): Add latency to matching requests instead of blocking them.
- [Linux API status code](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-status-code): Change the status code (and optionally the body) instead of blocking outright.
- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets at the network layer instead of blocking at the API.
