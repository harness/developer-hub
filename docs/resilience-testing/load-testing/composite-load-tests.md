---
title: Composite Load Tests
sidebar_label: Composite Load Tests
sidebar_position: 60
description: Run a load test and a health probe together in one pipeline stage so you can measure how a service behaves while it is under load
keywords:
  - composite load test
  - load test pipeline
  - composite load stage
  - load and probe
  - resilience testing
tags:
  - load-testing
  - pipelines
---

A **composite load test** runs a load test and a health probe at the same time, in one pipeline stage. The load test applies traffic while the probe watches the service, so the run answers a question a load test alone cannot: not just how fast the service responded, but whether it stayed healthy while it was busy.

:::info Feature flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to enable it for your account.
:::

---

## What you will learn from this topic

- **Why load and probe run together:** What a composite run shows that a standalone load test cannot.
- **Where composite tests live:** The Composite Load Tests list and what each column reports.
- **How Harness builds one:** The stage and step types behind a composite test, and how to create and extend it.

---

## Why run a load test and a probe together

A standalone load test reports throughput, latency, and error rate. Those numbers describe the traffic, not the service. A run can report a healthy 100 percent success rate while the workload behind it restarts twice, or while pods are evicted and rescheduled under memory pressure.

A composite load test closes that gap:

- The **load test** applies the traffic and measures the response.
- The **probe** checks the service against a condition throughout the run, such as whether pods stay in a `Running` state or whether an endpoint keeps returning the expected status.

Because the two steps run in parallel, the probe observes the service while it is under load. A probe that passes when the service is idle but fails at peak traffic is only visible when the two run together.

---

## Review your composite load tests

Go to **Resilience Testing** > **Load Tests** and open the **Composite Load Tests** tab. The list sorts by **Last Modified**, newest first, and a **Tag(s)** filter narrows it.

| Column | What it shows |
|---|---|
| **Composite load test (pipeline)** | The name of the composite test, with the pipeline identifier beneath it. |
| **No. of load tests** | How many load test steps the pipeline contains. A value of `0` means the pipeline exists but carries no load test yet. |
| **Recent executions** | The most recent runs, oldest to newest from left to right, so a run of failures reads as a trend rather than a single result. |
| **Last modified** | When the pipeline was last edited. |

A composite load test is a Harness pipeline. Opening one from this list takes you to Pipeline Studio, where you edit it the same way you edit any other pipeline.

---

## Create a composite load test

1. Go to **Resilience Testing** > **Load Tests** and open the **Composite Load Tests** tab.
2. Select **+ New Composite Load Test**.
3. Under **Create a new pipeline**, enter a **Name**. Harness derives the **Id** from it. Add a **Description** and **Tags** if you want them.
4. Under **Add a load test and probe**, select one existing load test in **Load Test** and one probe in **Probe**. Both are required to create the composite test, and you can add more later.
5. Select **Continue in Pipeline Studio**.

Harness creates the pipeline with the stage and both steps already in place, then opens it in Pipeline Studio. Select **Run** to execute it.

:::tip Pair the probe with what the load is likely to break
Choose a probe that checks the failure mode the traffic is most likely to trigger. For a service you expect to scale under load, a pod status check catches restarts and evictions that the response-time numbers hide. Go to [Probes](/docs/resilience-testing/chaos-testing/probes) to review what each probe validates.
:::

---

## What Harness builds

A composite load test is a pipeline with a single stage of type `CompositeLoadTest`. Inside it, the load test and the probe sit in a `parallel` block, which is what makes them run at the same time.

```yaml
stages:
  - stage:
      name: checkout-under-load
      identifier: checkoutunderload
      type: CompositeLoadTest
      spec:
        execution:
          steps:
            - parallel:
                - step:
                    type: LoadTest
                    name: checkout-k6
                    identifier: loadtest_1
                    timeout: 10m
                    spec:
                      loadTestRef: checkout-k6
                - step:
                    type: ChaosProbe
                    name: checkout-http
                    identifier: probe_1
                    timeout: 10m
                    spec:
                      identity: checkout-http
                      infraReference: <+input>
                      duration: 10m
                      tasks:
                        - identifier: checkout-http
                          values:
                            - name: VARIABLES_URL
                              value: <+input>
```

Two step types make up the stage:

| Step type | What it does |
|---|---|
| `LoadTest` | Runs an existing load test. `loadTestRef` names the test, so the step reuses the test you already created rather than redefining it. |
| `ChaosProbe` | Runs the probe named in `identity` against the infrastructure in `infraReference` for the given `duration`, and fails the step when the probe condition is not met. `infraReference` takes the form `<environment>/<infrastructure>`. |

Each entry under `tasks` supplies the probe's own inputs as name and value pairs, such as the URL an HTTP probe calls. Values written as `<+input>` are runtime inputs, so Harness prompts for them when the pipeline runs. Go to [Run a load test in a pipeline](./run-in-pipeline) to review how runtime inputs are supplied.

### Add more steps

The pipeline is a normal Harness pipeline, so you extend it in Pipeline Studio. Add another `LoadTest` step to drive traffic at more than one service in the same run, or another `ChaosProbe` step to watch more than one condition.

Placement decides timing, and it is easy to get wrong. Steps inside a `parallel` block run at the same time, which is the point of a composite load test. A step added as a sibling of the `parallel` block runs only after everything in that block has finished, so a probe placed there measures the service once the traffic has stopped rather than while it is under load. Keep the probe inside the `parallel` block unless you specifically want a post-load check.

---

## Read the results

Select a run from **Recent executions**, or open the pipeline and go to **Execution History**. A composite load test uses the standard pipeline execution view, so the stage graph shows the load test step and the probe step side by side, and selecting either one opens its own logs and output.

The stage fails if either step fails. A run where the load test passes and the probe fails is the interesting case: the service served the traffic but did not stay healthy doing it.

### The load test step

The step logs stream the run and end with a summary of the same metrics the Run detail page reports:

```
Load test execution completed. Processing results...
Total RPS: 12.00
Error Rate: 0.00%
Total Requests: 5552
Total Failures: 0
Avg Response Time: 0.97ms
P95 Response Time: 1.00ms
P99 Response Time: 2.00ms
Load Test Ended: Finished
```

Select **View Load Test Execution** on the step to open the full Run detail page, with the charts and the per-endpoint breakdown. Go to [Analyze load test results](./analyze-results) to interpret them.

### The probe step

The probe step logs each stage of the validation, name the probe it triggered, and end with the phase it reached:

```
Starting Chaos Probe validation
Runtime configuration provided for 1 chaos task(s)
Building DR Probe request with identity: ping-google-k8s
DR Probe ping-google-k8s triggered successfully. Waiting for results...
DR Probe 'ping-google-k8s' completed successfully. Phase: passed.
```

A failed probe reports `Chaos step failed with phase: error` and fails the stage.

:::info No composite resilience score today
A composite load test reports the outcome of each step, not a combined score. The execution view's **Resilience Tests** tab is a separate feature for adding chaos experiments to a pipeline, and it stays on its empty state for a composite load test even after a successful run. Judge the run from the two steps.
:::

---

## Next steps

- [Analyze load test results](./analyze-results): Interpret the throughput, latency, and error rate the load test step reports.
- [Probes](/docs/resilience-testing/chaos-testing/probes): Review the probe types you can pair with a load test.
- [Run a load test in a pipeline](./run-in-pipeline): Add a standalone Load Test step to an existing delivery pipeline instead.
