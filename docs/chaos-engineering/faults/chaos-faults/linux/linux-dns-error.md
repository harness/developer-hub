---
id: linux-dns-error
title: Linux DNS error
sidebar_label: Linux DNS Error
description: Force DNS resolution failures for target host names on a Linux machine for a configurable duration so you can test how the workload behaves during a DNS outage.
keywords:
  - chaos engineering
  - linux dns error
  - linux fault
  - dns chaos
tags:
  - chaos-engineering
  - linux-faults
  - dns-chaos
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-dns-error
- /docs/chaos-engineering/chaos-faults/linux/linux-dns-error
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Linux DNS error is a chaos fault that returns DNS failures for host names matching `HOST_NAMES` (filtered by `MATCH_SCHEME`) on the target Linux machine for `DURATION`, then restores normal DNS resolution. Queries that do not match are forwarded to `UPSTREAM_SERVER`. The fault runs through the Linux Chaos Infrastructure (LCI) systemd service installed on the target VM.

Use this fault to test how a workload behaves during a partial or full DNS outage: whether the application surfaces clean resolution errors or hangs, whether DNS caching layers absorb the failure, whether retries amplify the outage, and whether monitoring detects the resolution failures within the alerting SLA.

:::info Run your first experiment
If you have not installed the Linux Chaos Infrastructure yet, go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect the VM to the control plane.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **DNS failure paths:** When `HOST_NAMES` fail to resolve, do application clients surface clean errors or hang on the resolver?
- **Cache absorption:** Do local DNS caches (nscd, systemd-resolved) absorb the failure for previously resolved entries?
- **Retry storms:** Do dependent services retry the failed lookups in a way that amplifies the outage?
- **Monitoring fidelity:** Do alerts on DNS failures, connection errors, and end-to-end p99 fire within the alerting SLA?

---

## Prerequisites

- **Linux Chaos Infrastructure installed:** The `linux-chaos-infrastructure` systemd service is `active` on the target VM and the infrastructure is in `CONNECTED` state. Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install it.
- **DNS interceptor port available:** `DNS_PORT` (default `53`) is not bound by another resolver on the target VM, or the fault is configured to coexist with a local resolver.
- **`/tmp` is exec-mountable:** The DNS interceptor binary executes from `/tmp`. Verify with `findmnt -l | grep noexec | grep /tmp`. If `/tmp` is mounted `noexec`, remount with `sudo mount /tmp -o remount,exec`.

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

Configure the following fault parameters when you add Linux DNS error to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `DURATION` | Total duration of the fault. Accepts `[hours]h[minutes]m[seconds]s` format (for example, `30s`, `1m25s`, `1h3m2s`). | `30s` |
| `HOST_NAMES` | Comma-separated host names to fail. Leave empty to fail every query forwarded to the interceptor. | `""` |
| `MATCH_SCHEME` | Match type for host names. Accepts `exact` or `substring`. | `exact` |
| `UPSTREAM_SERVER` | Upstream DNS server used for forwarding queries that do not match `HOST_NAMES`. Leave empty to use the system resolver. | `""` |
| `DNS_PORT` | Port on which the DNS interceptor listens for redirected queries. | `53` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Redirects DNS traffic on the target VM to a local interceptor on `DNS_PORT` for `DURATION`. Queries matching `HOST_NAMES` per `MATCH_SCHEME` are answered with a failure; other queries are forwarded to `UPSTREAM_SERVER` (or the system resolver).

---

## Expected behavior during fault execution

- Lookups for `HOST_NAMES` return a failure (`SERVFAIL` or equivalent) for the duration of the fault.
- Application clients see DNS errors when they attempt to resolve the matched hosts; subsequent TCP/HTTP calls fail with `nodename nor servname provided`-style errors.
- Lookups for hosts that do not match continue to succeed via `UPSTREAM_SERVER`.
- After the duration ends, DNS redirection is removed and normal resolution resumes.

:::info When the fault ends
The chaos pod removes the DNS redirect rule and stops the interceptor. New lookups go to the system resolver. Cached resolutions in `nscd` or `systemd-resolved` may persist for the cache TTL.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **DNS failures:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `dig @127.0.0.1 -p <DNS_PORT> <host>` and assert it returns `SERVFAIL` during the chaos window.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application DNS or connection-error metrics.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint that depends on the matched hosts.

---

## Verify the fault execution effect

While the experiment is running, confirm DNS was failing and then recovered:

1. **Query a matched host.**

   ```bash
   dig +tries=1 +time=2 <one-of-HOST_NAMES>
   getent hosts <one-of-HOST_NAMES>
   ```

   The query should return `SERVFAIL` (or empty `getent`) during the chaos window and resolve normally afterwards.

2. **Query a non-matched host.**

   ```bash
   dig +tries=1 +time=2 example.com
   ```

   The query should resolve normally throughout, confirming the filter is working.

3. **Inspect Linux Chaos Infrastructure logs.**

   ```bash
   sudo journalctl -u linux-chaos-infrastructure -n 100 --no-pager
   ```

   Look for the fault start, the redirect setup, and the fault end markers.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the DNS redirect and stops the interceptor when `DURATION` elapses.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also removes the redirect.
- **Manual recovery:** If the redirect survives an abort, flush iptables rules created by the fault (`sudo iptables -t nat -L -n -v` to inspect) and kill the interceptor with `sudo pkill -f <interceptor-binary>` (the binary name is recorded in the LCI logs).
- **Cache purge:** Flush local DNS caches with `sudo systemd-resolve --flush-caches` or `sudo nscd -i hosts` if cached failures persist after the chaos window.

---

## Limitations

- **Single VM scope:** Each fault run targets one VM (the VM hosting the selected Linux Chaos Infrastructure).
- **System resolver coexistence:** If a local resolver (systemd-resolved, dnsmasq) already binds port `53`, configure `DNS_PORT` to a free port and verify clients use it.
- **TTL-bound cache:** Previously resolved hosts may continue to resolve from `nscd` or `systemd-resolved` cache until the TTL expires.
- **No partial failure mode:** Matched lookups always fail; there is no failure rate tunable. Use a smaller `HOST_NAMES` set to limit blast radius.

---

## Troubleshooting

<Troubleshoot
  issue="Linux DNS error fault did not cause resolution failures in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm clients are using the interceptor port (DNS_PORT) and that nscd or systemd-resolved is not serving cached answers. Flush local DNS caches and re-test. Also verify the linux-chaos-infrastructure systemd service is active and CONNECTED."
/>

<Troubleshoot
  issue="Port 53 already in use"
  mode="docs"
  fallback="systemd-resolved or dnsmasq commonly bind port 53. Configure DNS_PORT to a free port (for example, 1053) and update /etc/resolv.conf or the application config to use it, or stop the local resolver before running the fault."
/>

<Troubleshoot
  issue="/tmp mounted noexec prevents the interceptor from starting"
  mode="docs"
  fallback="Remount /tmp with exec permissions for the duration of the experiment: sudo mount /tmp -o remount,exec. Restore the original mount options after the experiment if required by your security policy."
/>

---

## Related faults

- [Linux DNS spoof](/docs/chaos-engineering/faults/chaos-faults/linux/linux-dns-spoof): Return spoofed IPs instead of failures.
- [Linux network loss](/docs/chaos-engineering/faults/chaos-faults/linux/linux-network-loss): Drop packets entirely instead of failing DNS.
- [Linux API block](/docs/chaos-engineering/faults/chaos-faults/linux/linux-api-block): Block API responses through a proxy instead of DNS.
