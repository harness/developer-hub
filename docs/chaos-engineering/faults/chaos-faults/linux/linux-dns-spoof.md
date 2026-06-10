---
id: linux-dns-spoof
title: Linux DNS spoof
sidebar_label: Linux DNS Spoof
description: Return spoofed IP addresses for target host names on a Linux machine for a configurable duration so you can test how the workload behaves when DNS resolves to unexpected endpoints.
keywords:
  - chaos engineering
  - linux dns spoof
  - linux fault
  - dns chaos
tags:
  - chaos-engineering
  - linux-faults
  - dns-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-dns-spoof
- /docs/chaos-engineering/chaos-faults/linux/linux-dns-spoof
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux DNS spoof is a chaos fault that resolves host names in `SPOOF_MAP` to the configured spoofed IP addresses on the target Linux machine for `DURATION`, then restores normal DNS resolution. Queries for hosts not in the map are forwarded to `UPSTREAM_SERVER`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves when DNS resolves to unexpected endpoints: whether the application connects, fails TLS verification, surfaces an authentication mismatch, or follows redirects safely. This is useful for validating mTLS pinning, host header validation, and dependency fault-injection tests where you need to route a real client to a stub server.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **TLS pinning:** When a real host name resolves to an attacker-controlled IP, does the TLS layer reject the connection cleanly?
- **Host header validation:** Does the destination service reject requests with mismatched Host headers?
- **Dependency redirection:** Can you route the application to a stub server by spoofing only one dependency without touching the rest of the config?
- **Cache absorption:** Do local DNS caches absorb the spoofed answer for the cache TTL, and is the recovery behavior acceptable?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **Spoof map prepared:** `SPOOF_MAP` is a valid JSON object mapping host names to spoofed IPs.
- **DNS interceptor port available:** `DNS_PORT` (default `53`) is not bound by another resolver on the target VM, or the fault is configured to coexist with a local resolver.
- **`/tmp` is exec-mountable:** The DNS interceptor binary executes from `/tmp`. Verify with `findmnt -l | grep noexec | grep /tmp`.

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

This fault is classified as an **Advanced** Linux fault. It requires the Linux Chaos Infrastructure systemd service to run with the root user and root user group on the target VM so it can bind the DNS interceptor port and rewrite resolution. No cloud credentials are needed.

---

## Fault tunables

Configure the following fault parameters when you add Linux DNS spoof to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SPOOF_MAP` | JSON object mapping host names to spoofed IPv4 addresses (for example, `{"example.com":"10.0.0.10","api.example.com":"10.0.0.11"}`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`, `1h3m2s`). | `30s` |
| `UPSTREAM_SERVER` | Upstream DNS server used for forwarding queries that are not in `SPOOF_MAP`. Leave empty to use the system resolver. | `""` |
| `DNS_PORT` | Port on which the DNS interceptor listens for redirected queries. | `53` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Redirects DNS traffic on the target VM to a local interceptor on `DNS_PORT` for `DURATION`. Queries matching entries in `SPOOF_MAP` are answered with the mapped IPs; other queries are forwarded to `UPSTREAM_SERVER` (or the system resolver).

---

## Expected behavior during fault execution

- Lookups for hosts in `SPOOF_MAP` return the mapped IP for the duration of the fault.
- Application clients connect to the spoofed IP (which may be a stub server, a black hole, or any IP you choose).
- Lookups for hosts not in the map continue to resolve normally via `UPSTREAM_SERVER`.
- After the duration ends, DNS redirection is removed and normal resolution resumes.

:::info When the fault ends
The chaos pod removes the DNS redirect rule and stops the interceptor. New lookups go to the system resolver. Cached resolutions in `nscd` or `systemd-resolved` may persist for the cache TTL.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Spoofed resolution:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `dig @127.0.0.1 -p <DNS_PORT> <host>` and assert the answer matches the spoofed IP.
- **TLS errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application TLS-error counters.
- **End-to-end behavior:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that depends on the spoofed hosts.

---

## Verify the fault execution effect

While the experiment is running, confirm DNS was spoofed and then restored:

1. **Resolve a spoofed host.**

   ```bash
   dig +short <host-in-SPOOF_MAP>
   getent hosts <host-in-SPOOF_MAP>
   ```

   The answer should match the spoofed IP during the chaos window and the real IP afterwards.

2. **Resolve a non-spoofed host.**

   ```bash
   dig +short example.com
   ```

   The answer should be the real IP throughout, confirming the filter is working.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the parsed spoof map, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the DNS redirect and stops the interceptor when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the redirect.
- **Manual recovery:** If the redirect survives an abort, inspect with `sudo iptables -t nat -L -n -v` and remove rules added by the fault; kill the interceptor with `sudo pkill -f <interceptor-binary>` (the binary name is recorded in the LCI logs).
- **Cache purge:** Flush local DNS caches with `sudo systemd-resolve --flush-caches` or `sudo nscd -i hosts` if spoofed answers persist after the chaos window.

---

## Limitations

- **IPv4 only:** `SPOOF_MAP` accepts IPv4 addresses; IPv6 (`AAAA`) responses are not spoofed.
- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **System resolver coexistence:** If a local resolver already binds port `53`, configure `DNS_PORT` to a free port.
- **TLS layer enforcement:** Spoofing DNS does not bypass TLS pinning; that is the intended observation for many use cases.
- **TTL-bound cache:** Previously resolved hosts may continue to resolve from local cache until the TTL expires.

---

## Troubleshooting

<Troubleshoot
  issue="Linux DNS spoof fault did not spoof resolution in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm SPOOF_MAP is valid JSON and that clients are using the interceptor port (DNS_PORT). Flush local DNS caches (sudo systemd-resolve --flush-caches) and re-test. Verify the linux-chaos-infrastructure systemd service is active and CONNECTED."
/>

<Troubleshoot
  issue="SPOOF_MAP parsing error"
  mode="docs"
  fallback='SPOOF_MAP must be a single-line valid JSON object mapping host names to IPv4 addresses, such as {"example.com":"10.0.0.10"}. Validate with jq before running the fault.'
/>

<Troubleshoot
  issue="Application connected but TLS failed"
  mode="docs"
  fallback="This is expected: the spoofed IP serves a different certificate (or no certificate). To stub the dependency end-to-end, terminate TLS on the spoofed IP with the same SAN as the real host name or test on plain HTTP/HTTPS without pinning."
/>

---

## Related faults

- [Linux DNS error](/docs/chaos-engineering/faults/chaos-faults/linux/linux-dns-error): Fail DNS resolution instead of spoofing it.
- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets entirely instead of redirecting them.
- [Linux API modify body](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-modify-body): Modify API responses through a proxy instead of redirecting endpoints.
