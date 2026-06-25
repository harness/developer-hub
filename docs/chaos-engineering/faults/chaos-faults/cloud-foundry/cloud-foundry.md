---
id: cloud-foundry
title: Chaos faults for Cloud Foundry
sidebar_label: Cloud Foundry
description: Catalog of Cloud Foundry chaos faults that disrupt apps, JVM runtimes, and the network between app instances and their dependencies.
keywords:
  - chaos engineering
  - cloud foundry chaos
  - cf faults
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry
- /docs/chaos-engineering/chaos-faults/cloud-foundry
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

## Introduction

Cloud Foundry chaos faults disrupt the running state of an app, the JVM inside an app instance, or the network that connects an app to its dependencies. Use them to validate platform self-healing (CF restarting crashed instances), application resilience (timeouts, retries, fallbacks), and downstream behavior (consumer error rates, alert fidelity) on TAS, PCF, or open-source Cloud Foundry deployments.

All Cloud Foundry faults run from a Linux chaos infrastructure (LCI) that authenticates to the Cloud Foundry API and, for JVM and network faults, to the BOSH director that manages the Diego cells.

Go to [Cloud Foundry chaos deployment](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-chaos-components-and-their-deployment-architecture) to read the supported LCI deployment models, and [Cloud Foundry permissions](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/permissions) to set up the required CF and BOSH credentials.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="cloud-foundry">

### CF app stop

CF app stop stops a Cloud Foundry app for a configurable duration and then re-starts it. Use it to validate how the platform, routers, and downstream consumers behave when an app goes offline cleanly.

<accordion color="green">
<summary>Use cases</summary>

- Validate consumer fallbacks and retries when the app returns 5xx from the CF router.
- Confirm CF restarts the app and reports it healthy after `duration` elapses.
- Tune alert thresholds around route-level health checks.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app container kill

CF app container kill terminates the container of one or more app instances and lets Cloud Foundry reschedule them. Use it to validate platform self-healing and peer absorption.

<accordion color="green">
<summary>Use cases</summary>

- Confirm peer instances absorb traffic while the killed instance is rescheduled.
- Validate Diego restarts the instance inside its expected window.
- Verify in-flight requests fail cleanly so callers retry.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app route unmap

CF app route unmap detaches a specific route from an app for a configurable duration, then re-maps it. The app keeps running; only its inbound route is disrupted.

<accordion color="green">
<summary>Use cases</summary>

- Validate gateway and consumer behavior when a route returns 404 from the CF router.
- Confirm secondary routes mapped to the same app continue serving.
- Practice runbooks for accidental route removal.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM CPU stress

CF app JVM CPU stress drives high CPU usage inside the JVM of a Java app instance for a configurable duration. Use it to test the app and autoscaler under sustained CPU pressure.

<accordion color="green">
<summary>Use cases</summary>

- Measure latency under CPU saturation.
- Validate autoscaling rules trigger and pull traffic away from the stressed instance.
- Surface thread-pool and concurrency bugs.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM memory stress

CF app JVM memory stress drives sustained heap or non-heap memory pressure inside the JVM of a Java app instance. Use it to test GC behavior and `OutOfMemoryError` handling.

<accordion color="green">
<summary>Use cases</summary>

- Surface long GC pauses under heap pressure.
- Detect runaway metaspace consumption with non-heap pressure.
- Validate memory-based autoscaling.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM trigger GC

CF app JVM trigger GC forces a full garbage-collection cycle inside the JVM of a Java app instance. Use it to measure stop-the-world pause times and validate that health checks tolerate them.

<accordion color="green">
<summary>Use cases</summary>

- Quantify worst-case GC pause time.
- Confirm liveness/readiness probes do not falsely fail during a full GC.
- Measure the tail-latency cost of a GC under production-shaped traffic.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM method exception

CF app JVM method exception forces a specific JVM method to throw a configurable exception. Use it to validate error-handling paths, retry budgets, and circuit-breaker behavior.

<accordion color="green">
<summary>Use cases</summary>

- Confirm catch blocks map the exception to the right user-visible response.
- Validate retry and circuit-breaker thresholds.
- Test observability tags for the configured exception class.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM method latency

CF app JVM method latency adds artificial delay to every invocation of a specific JVM method. Use it to simulate a slow downstream call at the method boundary.

<accordion color="green">
<summary>Use cases</summary>

- Tune timeouts to trip before the user-visible SLO is breached.
- Quantify the latency contribution of a single slow method.
- Validate caller retry budgets do not amplify the slowdown.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM modify return

CF app JVM modify return overrides the return value of a specific JVM method. Use it to test defensive checks and fallbacks against unexpected values like `null` or wrong-type returns.

<accordion color="green">
<summary>Use cases</summary>

- Validate null-safety in callers of a non-null method.
- Force a feature flag off by overriding its accessor.
- Simulate a poisoned cache layer.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network latency

CF app network latency adds a configurable amount of latency (with optional jitter) on the egress traffic of an app instance. Use it to simulate a slow downstream dependency at the network layer.

<accordion color="green">
<summary>Use cases</summary>

- Simulate a slow database or third-party API.
- Quantify how added round-trip time affects user-visible P99.
- Approximate cross-region latency to test caching decisions.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network loss

CF app network loss drops a configurable percentage of egress packets from an app instance. Use it to test retransmissions, timeouts, and circuit-breaker behavior under packet loss.

<accordion color="green">
<summary>Use cases</summary>

- Validate the app's retry budget on a flaky downstream.
- Confirm circuit breakers open at the configured loss rate.
- Test alert tuning for elevated TCP retransmissions.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network corruption

CF app network corruption corrupts a configurable percentage of egress packets from an app instance. Corrupted packets are discarded by the receiver, triggering retransmissions.

<accordion color="green">
<summary>Use cases</summary>

- Quantify retransmission overhead on end-to-end latency.
- Test protocol parsers reject malformed frames cleanly.
- Validate L4 monitoring detects elevated retransmission rates.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network duplication

CF app network duplication duplicates a configurable percentage of egress packets from an app instance. Use it to validate idempotency assumptions and deduplication logic.

<accordion color="green">
<summary>Use cases</summary>

- Confirm duplicate HTTP requests do not cause double writes.
- Validate deduplication keys on message-bus consumers.
- Test that UDP receivers tolerate duplicate datagrams.

</accordion>

</FaultDetailsCard>
