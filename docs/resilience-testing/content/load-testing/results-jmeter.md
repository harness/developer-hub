## Run overview

The left panel, titled **About This Test**, shows the test metadata and the live status of the execution.

| Field | Description |
|---|---|
| **Test Name** | Name of the load test. |
| **Load Test Infrastructure** | The infrastructure that ran the test, with its connection status. |
| **Type** | Reads **Java**. |
| **Users** | Peak concurrent virtual users. Reads `0` when the thread count comes from the plan rather than the Load Test Studio. |
| **Duration** | Total configured test duration. Reads `-` when the plan controls the duration. |
| **Ramp Up Duration** | Time to reach peak threads. Reads `-` when the plan controls the ramp. |
| **Worker Count** | Number of workers the load was distributed across, for example `1 worker(s)`. |
| **Run Started By** | Who triggered the run, and when. |
| **Time Elapsed** | How long the test has run, or the total runtime once complete. |
| **Status** | Execution status: **Running**, **Finished**, or **Failed**. |

:::info Empty Users, Duration, and Ramp Up values are expected
Harness runs a JMeter plan exactly as uploaded, so a plan that sets its own thread group controls these values rather than the Load Test Studio. The panel then reports `0` and `-` even though the run drove real load. Read **Total Requests** and the charts instead, or set the values through [property overrides](/docs/resilience-testing/load-testing/create-load-test/jmeter#override-jmeter-properties) so they surface here.
:::

## Summary cards

The cards across the top of the results panel report the headline metrics for a JMeter run:

| Metric | What it measures |
|---|---|
| **Total Requests** | Total number of samples sent during the test. |
| **Request Per Second** | Average throughput across the whole run, in requests per second. |
| **Error Rate** | Percentage of samples that failed. |
| **Avg Response Time** | Mean response time across every sample, in milliseconds. |

A JMeter run reports **Error Rate** and **Avg Response Time** where a k6 run reports **Failed Rate** and the P50, P95, and P99 percentiles. The percentiles are still available per sampler in the **Endpoint Statistics** table.

## Thresholds

When the test defines [thresholds](/docs/resilience-testing/load-testing/create-load-test/jmeter#gate-a-release-with-passfail-thresholds), a **Thresholds** table appears below the summary cards with each criterion and its outcome. A breached threshold marks the whole run as **Failed**, which is how a JMeter test becomes a release gate. A test with no thresholds shows no Thresholds table.

## Charts

The charts visualize how the test behaved over time.

### Active users

A time-series line chart of concurrent threads. Use it to confirm the load followed the shape the plan defines, including the ramp to peak, the plateau, and the ramp-down or an early drop if the run stopped.

### Total requests per second

A time-series chart with two lines:

- **Request Per Second** (green): throughput over time.
- **Errors/sec** (red): errors over time.

Read the two lines together to see whether throughput holds under sustained load and whether errors climb as threads increase.

### Response time distribution

A scatter plot of individual sample response times over the run, color-coded by transaction name and outcome, such as `readScenario (Success)` or `crudScenario (Success)`. The names come from the samplers and transaction controllers in your plan, so a well-named plan produces a readable chart.

Use it to spot latency that drifts upward as load increases, and to see which transaction is responsible for outliers.

## Console logs and endpoint statistics

Below the charts, two sections give you the raw detail behind the summary.

- **Load Test Logs:** An expandable **Console Logs** panel with the streamed output. You can search, download, or open it full screen. It begins with the Harness orchestrator lines that set the run up, then streams the JMeter master output.
- **Endpoint Statistics:** A per-sampler breakdown. Each row shows the **Endpoint**, **Requests**, **Fails**, a **Latency (ms)** bar marking the median (M), 95th (95), and 99th (99) percentiles, the **Avg (ms)**, and the **Current RPS**. An **Aggregated** row totals every sampler.

### Read the orchestrator lines first

The first few log lines describe how Harness prepared the run, before any JMeter output appears:

```
Preparing JMeter runner: creating Kubernetes resources...
Waiting for 1 JMeter injectors to start...
All 1 injectors ready (IPs: 10.52.8.188); starting master...
JMeter master pod scheduled; waiting for test to start...
Load test starting: tool=jmeter, mode=distributed, workers=1, image=my-registry/my-jmeter:latest, source=image, duration=
```

These lines are the fastest way to diagnose a run that produced no metrics. A run that stalls at **Waiting for injectors to start** points at the cluster, such as an image that cannot be pulled or insufficient resources, rather than at your plan. The `mode`, `workers`, and `source` values also confirm that the run used the configuration you expected.

Everything after those lines is JMeter's own output, including the Apache JMeter version and any plan errors.
