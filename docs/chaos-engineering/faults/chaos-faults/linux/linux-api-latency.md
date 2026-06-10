---
id: linux-api-latency
title: Linux API latency
sidebar_label: Linux API Latency
description: Add latency to API requests passing through a target Linux machine for a configurable duration so you can test how callers handle slow API responses.
keywords:
  - chaos engineering
  - linux api latency
  - linux fault
  - api chaos
tags:
  - chaos-engineering
  - linux-faults
  - api-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-api-latency
- /docs/chaos-engineering/chaos-faults/linux/linux-api-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux API latency is a chaos fault that starts a local proxy on the target Linux machine, redirects traffic to/from `TARGET_SERVICE_PORT` through the proxy on `PROXY_PORT`, and adds `LATENCY` of delay to matching API requests for `DURATION`. `DATA_DIRECTION` chooses whether the delay is applied to the `request`, `response`, or `both`. Filters and HTTPS interception controls mirror [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block). The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how callers behave when an API gets slow: whether they honor their own timeouts, whether retries amplify the delay, whether thread pools exhaust, and whether monitoring detects the elevated tail latency within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Caller timeouts:** When the API takes `LATENCY` longer than usual, do callers honor their own timeouts cleanly?
- **Thread-pool starvation:** Do upstream worker pools back up when responses get slow?
- **Retry storms:** Do retries amplify the slow traffic, or do exponential backoff and jitter contain it?
- **Monitoring fidelity:** Do alerts on end-to-end p99, queue depth, and timeout counters fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Target service port reachable:** `TARGET_SERVICE_PORT` is the port the application listens on (ingress) or the upstream service port (egress).
- **Proxy port free:** `PROXY_PORT` (default `20000`) is not bound by another process on the target VM.
- **HTTPS material if `HTTPS_ENABLED=true`:** Provide a CA bundle in `HTTPS_ROOT_CERT_FILE` and additional certificates in `CUSTOM_CERTIFICATES`.
- **`/tmp` is exec-mountable:** Verify with `findmnt -l | grep noexec | grep /tmp`. If `/tmp` is mounted `noexec`, remount with `sudo mount /tmp -o remount,exec`.

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

Configure the following fault parameters when you add Linux API latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format. | `30s` |
| `LATENCY` | Latency to inject per matching request (for example, `2s`, `500ms`). | `2s` |
| `TARGET_SERVICE_PORT` | Port of the application (ingress) or upstream service (egress) to intercept. | `80` |
| `PROXY_PORT` | Port on which the local proxy listens. | `20000` |
| `NETWORK_INTERFACE` | Network interface used for ingress redirection. | `eth0` |
| `DATA_DIRECTION` | Direction of data to delay. Accepts `request`, `response`, or `both`. | `both` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Request filters (combine as needed)**

| Tunable | Description | Default |
| --- | --- | --- |
| `PATH_FILTER` | API path glob to match. Leave empty to match all paths. | `""` |
| `HEADERS_FILTERS` | HTTP headers filter (comma-separated `Header=value` pairs). | `""` |
| `METHODS` | Comma-separated HTTP methods to match. | `""` |

**Direction and source/destination filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_DIRECTION` | `ingress` (delay requests arriving at the VM) or `egress` (delay requests leaving the VM). | `ingress` |
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

Adds an iptables redirect on `NETWORK_INTERFACE` that routes `TARGET_SERVICE_PORT` traffic through the local proxy on `PROXY_PORT` for `DURATION`. Matching requests are held by `LATENCY` (in `DATA_DIRECTION`) before being forwarded; non-matching requests pass through unchanged. On exit, the iptables redirect and proxy are removed.

---

## Expected behavior during fault execution

- Matching API calls take `LATENCY` longer than usual for the duration of the fault.
- Callers see slower responses; tail latency (`p99`) shifts upward by approximately `LATENCY`.
- Callers with shorter timeouts than `LATENCY` see clean timeout errors.
- After the duration ends, the iptables redirect is removed and the proxy stops; traffic resumes its original path with no added latency.

:::info When the fault ends
The chaos pod removes the iptables redirect and stops the local proxy. The next request flows directly with no added latency.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **End-to-end latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application p95/p99 metrics.
- **Caller timeout counters:** Use a Prometheus probe on caller timeout/connection-error counters.
- **HTTP probe:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that exercises the slowed API.

---

## Verify the fault execution effect

1. **Send a matching request from the VM.**

   ```bash
   curl -w '%{time_total}\n' -o /dev/null -s http://localhost:<TARGET_SERVICE_PORT><PATH_FILTER-example>
   ```

   Latency should rise by approximately `LATENCY` during the chaos window.

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
- **Manual recovery:** If the redirect survives an abort, inspect with `sudo iptables -t nat -L -n -v` and delete the rule added by the fault; kill the proxy with `sudo lsof -i :<PROXY_PORT>` followed by `sudo kill <pid>`.

---

## Limitations

- **HTTP/3 (QUIC) not intercepted.**
- **HTTPS requires certificates:** Without `HTTPS_ROOT_CERT_FILE`, HTTPS traffic cannot be matched on path/header/method.
- **Single VM scope:** Each fault run targets one VM.
- **Per-request delay:** `LATENCY` is applied per matching request; high-request-rate workloads accumulate large delays.
- **`/tmp` exec required.**

---

## Troubleshooting

<Troubleshoot
  issue="Linux API latency fault did not slow any request in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify PATH_FILTER, METHODS, and HEADERS_FILTERS match your test traffic. For HTTPS endpoints, set HTTPS_ENABLED=true and provide HTTPS_ROOT_CERT_FILE. Confirm the iptables redirect is in place with sudo iptables -t nat -L -n -v."
/>

<Troubleshoot
  issue="Proxy port already in use"
  mode="docs"
  fallback="PROXY_PORT (default 20000) conflicted with another listener. Change PROXY_PORT to a free port and re-run."
/>

<Troubleshoot
  issue="Latency persists after the experiment ends"
  mode="docs"
  fallback="If the iptables redirect was not removed, inspect with sudo iptables -t nat -L -n -v and delete the rule added by the fault. Kill any orphan proxy on PROXY_PORT."
/>

---

## Related faults

- [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block): Block requests entirely instead of delaying them.
- [Linux API status code](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-status-code): Change the status code without adding latency.
- [Linux network latency](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-latency): Delay at the network layer instead of the application layer.
