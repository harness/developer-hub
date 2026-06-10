---
id: linux
title: Chaos Faults for Linux
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux
- /docs/chaos-engineering/chaos-faults/linux
- /docs/chaos-engineering/faults/chaos-faults/linux/redis-cache-expire
- /docs/chaos-engineering/chaos-faults/linux/redis-cache-expire
- /docs/chaos-engineering/faults/chaos-faults/linux/redis-cache-limit
- /docs/chaos-engineering/chaos-faults/linux/redis-cache-limit
- /docs/chaos-engineering/faults/chaos-faults/linux/redis-cache-penetration
- /docs/chaos-engineering/chaos-faults/linux/redis-cache-penetration
- /docs/chaos-engineering/faults/chaos-faults/linux/redis-sentinel-stop
- /docs/chaos-engineering/chaos-faults/linux/redis-sentinel-stop
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Linux faults disrupt resources on a target Linux machine through the Linux Chaos Infrastructure (LCI) systemd service installed on the VM. Use them to test how a workload behaves under CPU/memory/disk pressure, network degradation, DNS outages, JVM-level faults, and API-level faults injected by a local proxy.

Go to [Linux Chaos Infrastructure](/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/linux) to install the agent and connect a VM to the control plane, then go to [Linux fault requirements](/docs/chaos-engineering/faults/chaos-faults/linux/permissions) for the supported OS distributions and the basic/advanced permission tiers.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="linux">

### Linux CPU stress

Linux CPU stress runs `WORKERS` busy workers at `LOAD` percent utilization each on the target Linux machine for `DURATION`, then frees the CPU. Use it to test how a workload behaves when compute headroom shrinks.

<Accordion color="green">
<summary>Use cases</summary>

- Validate application latency under sustained CPU pressure.
- Verify CPU-driven autoscaling reacts within the alerting SLA.
- Surface noisy-neighbour effects on co-located processes.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux memory stress

Linux memory stress allocates `MEMORY` of memory across `WORKERS` workers on the target Linux machine for `DURATION`, then frees the memory. Use it to test how a workload behaves under memory pressure and OOM conditions.

<Accordion color="green">
<summary>Use cases</summary>

- Validate application latency when free memory shrinks.
- Verify the kernel OOM killer targets the expected process.
- Confirm alerts on memory pressure and swap usage fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux disk fill

Linux disk fill writes a file under `FILL_PATH` until it occupies `FILL_STORAGE` for `DURATION`, then removes the file. Use it to test how a workload behaves when its writable storage fills up.

<Accordion color="green">
<summary>Use cases</summary>

- Validate `ENOSPC` handling in write paths.
- Verify log rotation kicks in before the volume fills.
- Confirm disk-space alerts fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux disk IO stress

Linux disk I/O stress runs `WORKERS` I/O workers that consume `FILE_SYSTEM_UTILISATION` of the filesystem at `VOLUME_MOUNT_PATH` for `DURATION`. Use it to test how a workload behaves when disk bandwidth is saturated.

<Accordion color="green">
<summary>Use cases</summary>

- Validate database throughput under I/O contention.
- Surface noisy-neighbour effects on co-located processes sharing the disk.
- Confirm alerts on disk saturation fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux fs fill

Linux fs fill writes a file under `FILL_PATH` until it occupies `FILL_STORAGE` for `DURATION`, then removes the file. It targets a filesystem path with a smaller tunable surface than Linux disk fill.

<Accordion color="green">
<summary>Use cases</summary>

- Validate `ENOSPC` handling in write paths.
- Verify log rotation kicks in before the volume fills.
- Confirm disk-space alerts fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS error

Linux DNS error returns DNS failures for host names matching `HOST_NAMES` (filtered by `MATCH_SCHEME`) on the target Linux machine for `DURATION`. Use it to test how a workload behaves during a DNS outage.

<Accordion color="green">
<summary>Use cases</summary>

- Validate DNS-failure handling in application clients.
- Verify local DNS caches absorb failures for previously resolved entries.
- Confirm alerts on DNS failures and connection errors fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS spoof

Linux DNS spoof resolves host names in `SPOOF_MAP` to the configured spoofed IP addresses on the target Linux machine for `DURATION`. Use it to test how a workload behaves when DNS resolves to unexpected endpoints.

<Accordion color="green">
<summary>Use cases</summary>

- Validate TLS pinning by routing real host names to attacker-controlled IPs.
- Verify host header and certificate verification at the destination.
- Route a dependency to a stub server without changing application configuration.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network loss

Linux network loss drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of packets leaving the target Linux machine on `NETWORK_INTERFACES` for `DURATION`. Use it to test how a workload behaves when the network is unreliable.

<Accordion color="green">
<summary>Use cases</summary>

- Validate client timeout handling under packet loss.
- Verify circuit breakers open within the configured threshold.
- Surface retry-storm behavior on dropped traffic.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network latency

Linux network latency adds `NETWORK_LATENCY` milliseconds of delay (plus optional `JITTER`) to packets leaving the target Linux machine on `NETWORK_INTERFACES` for `DURATION`. Use it to test how a workload behaves when the network is slow.

<Accordion color="green">
<summary>Use cases</summary>

- Validate client timeout handling when the network gets slow.
- Verify p95/p99 stays inside the SLA under added latency.
- Surface thread-pool starvation when callers hold threads waiting for responses.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network corruption

Linux network corruption bit-flips `NETWORK_PACKET_CORRUPTION_PERCENTAGE` percent of egress packets on `NETWORK_INTERFACES` of the target Linux machine for `DURATION`. Use it to test how a workload behaves when packet payloads are damaged.

<Accordion color="green">
<summary>Use cases</summary>

- Validate TCP retransmit recovery under corruption.
- Verify UDP-based protocols reject or recover from bad packets.
- Confirm alerts on retransmits and decode errors fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network duplication

Linux network duplication duplicates `NETWORK_PACKET_DUPLICATION_PERCENTAGE` percent of egress packets on `NETWORK_INTERFACES` of the target Linux machine for `DURATION`. Use it to test how a workload behaves under at-least-once delivery.

<Accordion color="green">
<summary>Use cases</summary>

- Verify application handlers stay idempotent (no double-charges, no double-writes).
- Confirm queue consumers detect duplicate messages.
- Validate inflated egress counters trigger the right alerts.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network rate limit

Linux network rate limit throttles egress bandwidth on `NETWORK_INTERFACES` of the target Linux machine to `NETWORK_BANDWIDTH` (with `BURST` and `LIMIT`) for `DURATION`. Use it to test how a workload behaves when bandwidth is constrained.

<Accordion color="green">
<summary>Use cases</summary>

- Validate bulk-transfer behavior when egress is throttled.
- Verify back-pressure flows through producers without OOM.
- Confirm alerts on transmit queue length and SLA breach fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux process kill

Linux process kill terminates processes matching `PROCESS_IDS`, `PROCESS_NAMES`, or `PROCESS_COMMAND` on the target Linux machine for `DURATION`. Use it to test how a workload behaves when a critical process disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate systemd/supervisor restart behavior.
- Verify graceful shutdown on `SIGTERM` vs abrupt termination on `SIGKILL`.
- Confirm alerts on process absence fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux service restart

Linux service restart stops the systemd services in `SERVICES` and starts them again after `INTERVAL`, repeating for `DURATION`. With `SELF_HEALING_SERVICES=true`, the fault relies on systemd auto-restart.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean restart and reconnect behavior of dependents.
- Verify systemd `Restart=on-failure` triggers within the expected window.
- Confirm alerts on `systemd_unit_state` and end-to-end availability fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux time chaos

Linux time chaos skews the system clock on the target Linux machine by `OFFSET` for `DURATION`. With `DISABLE_NTP=true`, NTP is paused to keep the skew stable.

<Accordion color="green">
<summary>Use cases</summary>

- Validate TLS certificate-expiry handling when time jumps forward.
- Verify JWT/HMAC validation surfaces clean errors under clock skew.
- Confirm scheduled jobs do not double-fire or skip across the boundary.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM CPU stress

Linux JVM CPU stress uses Byteman to pin `CPU` cores of busy work inside the target Java process for `DURATION`. Use it to test how a Java workload behaves when its own threads pin the CPU.

<Accordion color="green">
<summary>Use cases</summary>

- Validate request handler tail latency under in-JVM CPU pressure.
- Verify GC keeps up under additional CPU pressure.
- Confirm thread-pool occupancy stays inside bounds.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM memory stress

Linux JVM memory stress uses Byteman to consume memory in the `heap` or `stack` of the target Java process for `DURATION`. Use it to test how a Java workload behaves under memory pressure.

<Accordion color="green">
<summary>Use cases</summary>

- Validate application latency when the heap fills up.
- Verify clean `OutOfMemoryError` handling and recovery.
- Confirm alerts on JVM memory usage and full GC rate fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM method exception

Linux JVM method exception uses Byteman to throw `EXCEPTION` from `CLASS.METHOD` of the target Java process for `DURATION`. Use it to test how a Java workload handles unexpected exceptions from a hot method.

<Accordion color="green">
<summary>Use cases</summary>

- Validate caller `try/catch` discipline.
- Verify higher-level error handling surfaces clean user-visible errors.
- Confirm retry storms are contained by backoff and circuit breakers.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM method latency

Linux JVM method latency uses Byteman to add `LATENCY` milliseconds of delay to every invocation of `CLASS.METHOD` in the target Java process for `DURATION`. Use it to test how a Java workload behaves when an internal method gets slow.

<Accordion color="green">
<summary>Use cases</summary>

- Validate p99 stays inside the SLA when a hot method slows down.
- Verify caller timeouts fire cleanly without thread-pool starvation.
- Confirm tail-latency alerts fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM modify return

Linux JVM modify return uses Byteman to overwrite the return value of `CLASS.METHOD` with `RETURN` in the target Java process for `DURATION`. Use it to test how callers handle unexpected return data.

<Accordion color="green">
<summary>Use cases</summary>

- Validate caller-side validation of internal method returns.
- Inject edge-case values (empty, null, `Integer.MAX_VALUE`) to surface boundary errors.
- Simulate stale-cache returns to verify dependent behavior.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM trigger GC

Linux JVM trigger GC uses Byteman to force garbage collection events in the target Java process for `DURATION`. Use it to test how a Java workload behaves under repeated GC pressure.

<Accordion color="green">
<summary>Use cases</summary>

- Validate request handler tail latency under repeated GC events.
- Verify the chosen collector keeps pause time inside the SLA.
- Confirm alerts on `jvm_gc_pause_seconds` fire when expected.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API block

Linux API block starts a local proxy on the target Linux machine and returns `STATUS_CODE` for matching API calls (filtered by path, header, method, source/destination, and direction) for `DURATION`. Use it to test how callers handle a sudden API outage.

<Accordion color="green">
<summary>Use cases</summary>

- Validate caller error handling under API failure.
- Verify circuit breakers open within the configured threshold.
- Confirm fallback paths or cached responses kick in correctly.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API latency

Linux API latency starts a local proxy on the target Linux machine and adds `LATENCY` of delay to matching API requests (in `request`, `response`, or `both` directions) for `DURATION`. Use it to test how callers handle slow API responses.

<Accordion color="green">
<summary>Use cases</summary>

- Validate caller timeout handling when an API gets slow.
- Verify retries and backoff contain the failure.
- Confirm alerts on end-to-end p99 fire within the alerting SLA.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API modify body

Linux API modify body starts a local proxy on the target Linux machine and overwrites the body of matching API calls with `RESPONSE_BODY` (in `request`, `response`, or `both` directions) for `DURATION`. Use it to test how callers handle unexpected payloads.

<Accordion color="green">
<summary>Use cases</summary>

- Validate body schema validation in dependent code.
- Test PII redaction by substituting redacted strings.
- Inject stub responses to exercise downstream paths.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API modify header

Linux API modify header starts a local proxy on the target Linux machine and replaces header values in matching API calls with the keys/values from `HEADERS_MAP` (in `request`, `response`, or `both` directions) for `DURATION`. Use it to test how callers handle altered headers.

<Accordion color="green">
<summary>Use cases</summary>

- Validate behavior when `Authorization` is stale or invalid.
- Test content negotiation by overriding `Accept` or `Content-Type`.
- Verify cache-validation behavior by overriding `Cache-Control` or `ETag`.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API status code

Linux API status code starts a local proxy on the target Linux machine and overrides matching API responses with `STATUS_CODE` (and optionally `RESPONSE_BODY`) for `DURATION`. Use it to test how callers handle specific error responses.

<Accordion color="green">
<summary>Use cases</summary>

- Validate retry behavior on `5xx` vs `4xx` classes.
- Simulate rate-limit responses (`429`) to verify back-off.
- Verify "not found" semantics (`404`) for content filtering.

</Accordion>

</FaultDetailsCard>
