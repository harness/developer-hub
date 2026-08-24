---
title: Analyze Load Test Results
sidebar_label: Test Results
sidebar_position: 70
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

Every Load Test Engine uses the same Run detail layout: an **About This Test** panel, a row of summary cards, charts of users and throughput over time, the load test logs, and a per-endpoint statistics table. The engines differ in the detail. JavaScript (k6) reports **Failed Rate** with P50, P95, and P99 cards and adds a Response Time Histogram, while Java (JMeter) reports **Error Rate** and **Avg Response Time**. Select your engine below to see the walkthrough that matches your test.

---

## Access results

Go to **Resilience Testing** > **Load Tests**. The page has three tabs.

| Tab | What it lists |
|---|---|
| **Executions** | Every run across all load tests, newest first. Each row reports the run identifier, **Users**, **Duration**, **Avg Response Time**, **Success Rate**, **Status**, and who started it. Filter by **Status** to isolate failures. |
| **Load Tests** | The tests themselves, with **Mode**, **Infrastructure**, recent executions, and when each was last modified. Filter by **Type** or **Tag(s)**. |
| **Composite Load Tests** | Pipelines that pair a load test with a probe. Go to [Composite load tests](./composite-load-tests) to review them. |

To open a single run, select it from **Executions**, or open a test from **Load Tests** and choose a run from its execution list. Each execution is numbered and keeps its own results, so you can compare runs over time.

A run in the **Executions** list that reports **Not Available** for response time or success rate did not produce metrics, which usually means it failed before generating load. Open the run and read its logs rather than the summary columns.

---

## Read the Run detail page

<DynamicMarkdownSelector
  options={{
    "Python": {
      path: "/resilience-testing/content/load-testing/results-locust.md"
    },
    "JavaScript": {
      path: "/resilience-testing/content/load-testing/results-k6.md"
    },
    "Java": {
      path: "/resilience-testing/content/load-testing/results-jmeter.md"
    },
  }}
  toc={toc}
  precedingHeadingID="read-the-run-detail-page"
  nextHeadingID="interpret-the-results"
  disableSort={true}
/>

---

## Interpret the results

The following guidance applies to every engine. Where a metric name differs, the Python (Locust) name is given first.

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
- A threshold was breached, such as the 95th-percentile response time exceeding its limit.

:::info Status reflects execution health, not application health
A high error rate does not by itself mark the run as **Failed**. A test that completes with a 100% error rate still shows as a completed run. Read the **Error Rate** or **Failed Rate** metric to assess how the application behaved, and use **Status** to confirm the test itself ran to completion.
:::

---

## Next steps

- Go to [Get started with load testing](./get-started) to create and run your first load test.
- Go to [JavaScript](./create-load-test/k6) to declare thresholds that gate a release on performance.
- Go to [Composite load tests](./composite-load-tests) to pair a run with a probe that reports whether the service stayed healthy under load.
- Go to [Key concepts](./get-started#key-concepts) to review virtual users, load profiles, and thresholds.
