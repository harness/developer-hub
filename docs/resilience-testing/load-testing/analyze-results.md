---
title: Analyze Load Test Results
sidebar_label: Test Results
sidebar_position: 4
description: Understand and interpret load test execution results in Harness Resilience Testing
---

After you run a load test, Harness displays real-time and post-execution results on the **Run** detail page. This page explains every section of the results view and how to interpret the data.

## Accessing Results

1. Navigate to **Resilience Testing** > **Load Testing**
2. Click on a test name to view its executions
3. Select a specific run (e.g., **Run #1**) to open the results view

## Run Overview

The left panel shows metadata about the test and its execution:

| Field | Description |
|---|---|
| **Test Name** | Name of the load test |
| **Load Test Infrastructure** | The Linux infrastructure that executed the test, along with its connection status |
| **Type** | Load testing framework used (e.g., Locust) |
| **Users** | Peak concurrent virtual users configured |
| **Duration** | Total configured test duration |
| **Ramp-Up Duration** | Time to linearly ramp from 0 to peak users |
| **Run Started** | Timestamp when the execution began |
| **Time Elapsed** | How long the test has been running (or total runtime if complete) |
| **Status** | Current execution status: **Running**, **Finished**, or **Failed** |

## Summary Cards

Four key metrics are displayed as summary cards at the top of the results panel:

| Metric | What it measures |
|---|---|
| **Total Requests** | Total number of HTTP requests sent during the test |
| **Request Per Second** | Average throughput (requests/second) across the entire test duration |
| **Error Rate** | Percentage of requests that returned errors (non-2xx responses or assertion failures) |
| **Avg Response Time** | Mean response time across all requests, in milliseconds |

## Charts

### Active Users

A time-series line chart showing the number of concurrent virtual users over time. This visualizes:

- The **ramp-up phase** as users increase linearly from 0 to the configured peak
- The **steady-state phase** where user count plateaus at the configured maximum
- Any early termination if the test is stopped or fails before completing

### Total Requests Per Second

A time-series chart with two lines:

- **Request Per Second** (green) — throughput over time
- **Errors/sec** (red) — error rate over time

Use this chart to identify:
- Whether throughput remains stable under sustained load
- Spikes in error rate that may indicate the system is reaching capacity
- Correlation between increasing users (from the Active Users chart) and throughput changes

### Response Time Distribution

A scatter plot showing individual request response times over the test duration. Each dot represents a request, color-coded by request name and outcome:

- **Success** — requests that returned a successful response and passed all assertions
- **Failure** — requests that failed or violated an assertion

Use this chart to spot:
- Response time degradation as load increases
- Outlier requests with abnormally high latency
- Whether response times remain within acceptable thresholds

## Interpreting Results

### Healthy test indicators

- **Error Rate** stays at or near `0.00%`
- **Avg Response Time** remains within your SLA or performance budget
- **Requests Per Second** scales proportionally with active users during ramp-up
- Response time distribution shows consistent clustering without upward drift

### Warning signs

- **Error rate climbing during ramp-up** — your system may be hitting capacity before reaching the target user count
- **Response times increasing over time** — potential memory leak, connection pool exhaustion, or resource saturation
- **Throughput plateauing while users increase** — a bottleneck is capping request processing (CPU, database connections, rate limiting, etc.)
- **Scattered response time outliers** — intermittent issues like garbage collection pauses, DNS resolution delays, or cold starts

### Failed status

A test run shows **Failed** status when:
- The test infrastructure lost connectivity during execution
- The Locust process exited with an error
- The test was manually stopped before completion

:::note
A high error rate does not automatically mark the test as Failed. The status reflects execution health, not application health. A test that completes with 100% error rate still shows as a completed run — review the Error Rate metric to assess application behavior.
:::

## Next Steps

- [Get Started with Load Testing](./get-started): Create and run your first load test
- [Concepts](./concepts): Understand virtual users, load profiles, and assertions
- [Load Test Infrastructure](./infrastructure): Set up and manage Linux infrastructure for load tests
