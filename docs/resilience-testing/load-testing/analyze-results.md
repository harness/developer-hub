---
title: Analyze Load Test Results
sidebar_label: Test Results
sidebar_position: 4
description: Understand and interpret load test execution results in Harness Resilience Testing
keywords:
  - load test results
  - performance metrics
  - error rate
  - response time
tags:
  - load-testing
  - results
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

After you run a load test, Harness opens the **Run detail** page and streams results in real time. The same page shows the final results after the run finishes.

The Locust and k6 results views share the same layout but differ in a few areas, such as the summary cards, the k6-only Thresholds and Checks tables, and the k6 Response Time Histogram. Select your framework below to see the walkthrough that matches your test.

---

## Access results

1. Go to **Resilience Testing** > **Load Testing**.
2. Click a test name to open its list of executions.
3. Select a run (for example, **Run #2**) to open the Run detail page.

Each execution is numbered and keeps its own results, so you can compare runs over time.

---

## Read the Run detail page

<DynamicMarkdownSelector
  options={{
    "Locust": {
      path: "/resilience-testing/content/load-testing/results-locust.md"
    },
    "k6": {
      path: "/resilience-testing/content/load-testing/results-k6.md"
    },
  }}
  toc={toc}
  precedingHeadingID="read-the-run-detail-page"
  nextHeadingID="interpret-the-results"
  disableSort={true}
/>

---

## Interpret the results

The following guidance applies to both frameworks. Where a metric name differs, the Locust name is given first.

### Healthy test indicators

- **Error Rate** (or **Failed Rate**) stays at or near `0.00%`.
- **Avg Response Time** and the **P95** / **P99** percentiles stay within your SLA or performance budget.
- **Request Per Second** scales with active users during ramp-up.
- The response time distribution clusters consistently without upward drift.

### Warning signs

- **Error rate climbing during ramp-up:** the system may hit capacity before reaching the target user count.
- **Response times rising over time:** a possible memory leak, connection pool exhaustion, or resource saturation.
- **Throughput plateauing while users increase:** a bottleneck is capping request processing, such as CPU, database connections, or rate limiting.
- **Scattered response time outliers:** intermittent issues like garbage collection pauses, DNS delays, or cold starts.
- **One endpoint failing in Endpoint Statistics:** the problem is scoped to that route, not the whole service.

### Failed status

A run shows **Failed** status when:

- The test infrastructure lost connectivity during execution.
- The load test process exited with an error.
- The test was stopped before completion.
- A k6 threshold was breached (for example, the 95th-percentile response time exceeded its limit).

:::info Status reflects execution health, not application health
A high error rate does not by itself mark the run as **Failed**. A test that completes with a 100% error rate still shows as a completed run. Read the **Error Rate** or **Failed Rate** metric to assess how the application behaved, and use **Status** to confirm the test itself ran to completion.
:::

---

## Next steps

- Go to [Get started with load testing](./get-started) to create and run your first load test.
- Go to [k6](./create-load-test/k6) to configure thresholds that gate a release on performance.
- Go to [Key concepts](./get-started#key-concepts) to review virtual users, load profiles, and assertions.
