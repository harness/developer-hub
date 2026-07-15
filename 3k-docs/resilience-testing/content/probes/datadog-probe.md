Datadog APM probe allows you to query Datadog metrics or run Synthetic tests and compare the results against specified criteria. It supports a legacy single-query metrics path and a **Datadog v2 timeseries** path for structured, multi-query validation.

## When to use

- Monitor Datadog metrics (e.g., `system.cpu.user`, `trace.servlet.request.duration`) as steady-state indicators during chaos
- Query Datadog APM metrics (e.g., P95 latency, error rate) for a specific service using the v2 timeseries API
- Use Datadog Synthetic tests to validate end-to-end user flows under failure conditions
- Validate that Datadog-monitored SLOs remain within acceptable thresholds during fault injection
- Reuse a probe template across services by supplying service and environment values at runtime through probe variables

## Prerequisites

* An active Datadog account
* Access to the Datadog API from the Kubernetes execution plane
* A Datadog API key and Application key for authentication. See [Datadog API Keys](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys) and [Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys)

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Datadog** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime. Use expressions such as `<+probe.variables.SERVICE_NAME>` in query parameters to make a probe reusable across services.

4. Under **Datadog Connector**, select an existing connector or click **+ New Connector** to create one. Provide the Datadog instance URL, Application key, and API key, configure the delegate, verify the connection, and click **Finish**.

5. Under **Probe Properties**, select the query mode and configure:

   **Legacy metrics mode (v1):**

   | Field | Description |
   |-------|-------------|
   | **Datadog Query** | Single Datadog metrics query string. <br /> Example: `avg:system.cpu.user{host:my-host}`. See [Datadog Metrics documentation](https://docs.datadoghq.com/metrics/) |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now |

   **v2 timeseries mode:**

   Use this mode when you need structured queries, APM metrics, or formulas across multiple named queries. Set `queryType` to `v2` and define one or more named queries.

   | Field | Description |
   |-------|-------------|
   | **Query Type** | Set to `v2` to use the Datadog Timeseries Formula Query API |
   | **Queries** | List of named queries evaluated by Datadog. Each query has a `name`, `dataSource`, and `params` |
   | **Formula** | Expression evaluated against the named queries (for example, `p95*1000` or `errors / hits`). If only one query is defined, the formula defaults to that query's name |
   | **Aggregation** | How datapoints in the lookback window are collapsed before comparison. Supported values: `mean` (default), `max`, `min`, `last` |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now (`durationInMin`) |

   **Supported query data sources:**

   | Data source | Description | Required params |
   |-------------|-------------|-----------------|
   | `metrics` | Datadog metrics query | `query` — Datadog metrics query string (for example, `sum:trace.servlet.request.hits{service:account-service}.as_count()`) |
   | `apm_metrics` | Datadog APM metrics | `stat` — APM statistic (for example, `latency_p95`, `error_rate`). `service` is typically required. `env`, `span_kind`, `group_by`, and `query_filter` are optional |

   **Synthetic Test mode:**

   | Field | Description |
   |-------|-------------|
   | **Synthetic Test** | Provide the Synthetic test details (API test or Browser test) to evaluate the probe outcome. See [Datadog Synthetics documentation](https://docs.datadoghq.com/synthetics/) |

   Under **Datadog Data Comparison**, provide:

   | Field | Description |
   |-------|-------------|
   | **Type** | Data type for comparison: `Float` or `Int` |
   | **Comparison Criteria** | Comparison operator: `>=`, `<=`, `==`, `!=`, `>`, `<`, `oneOf`, `between` |
   | **Value** | The expected value to compare against the metric result |

6. Provide the **Run Properties**:

   | Field | Description |
   |-------|-------------|
   | **Timeout** | Maximum time for probe execution (e.g., `10s`) |
   | **Interval** | Time between successive executions (e.g., `2s`) |
   | **Attempt** | Number of retry attempts (e.g., `1`) |
   | **Polling Interval** | Time between retries (e.g., `30s`) |
   | **Initial Delay** | Delay before first execution (e.g., `5s`) |
   | **Verbosity** | Log detail level |
   | **Stop On Failure** (optional) | Stop the experiment if the probe fails |

7. Click **Create Probe**

## Datadog v2 APM metrics example

The following probe template checks the P95 latency of a service using Datadog APM metrics. The service name is supplied at runtime; the environment is optional.

```yaml
identity: datadog-p95-latency-check
name: Datadog P95 Latency Check
type: apmProbe
infrastructureType: Kubernetes
probeProperties:
  apmProbe:
    comparator:
      type: float
      value: <+input>
      criteria: <=
    type: Datadog
    datadogApmProbeInputs:
      connectorID: <+input>
      durationInMin: <+input>
      queryType: v2
      queries:
        - name: p95
          dataSource: apm_metrics
          params:
            env: <+probe.variables.ENV>
            service: <+probe.variables.SERVICE_NAME>
            stat: latency_p95
      formula: p95*1000
      aggregation: mean
runProperties:
  timeout: 30s
  interval: 5s
  attempt: 1
  pollingInterval: 30s
  initialDelay: 1s
  verbosity: debug
variables:
  - name: SERVICE_NAME
    value: <+input>
    type: String
    description: The name of the service to monitor.
    required: true
  - name: ENV
    value: <+input>
    type: String
    description: The APM environment of the service to monitor.
    required: false
```

In this example:

- `queryType: v2` selects the Datadog v2 timeseries path
- `dataSource: apm_metrics` queries Datadog APM metrics for the target service
- `stat: latency_p95` requests the P95 latency statistic
- `formula: p95*1000` converts seconds to milliseconds before comparison
- `aggregation: mean` averages datapoints across the lookback window
- `SERVICE_NAME` is required at runtime; `ENV` is optional and can be omitted when not needed

## Multi-query metrics example

Use multiple named queries and a formula when validating a ratio or derived metric:

```yaml
datadogApmProbeInputs:
  connectorID: <+input>
  durationInMin: 5
  queryType: v2
  queries:
    - name: errors
      dataSource: metrics
      params:
        query: sum:trace.servlet.request.errors{service:account-service}.as_count()
    - name: hits
      dataSource: metrics
      params:
        query: sum:trace.servlet.request.hits{service:account-service}.as_count()
  formula: errors / hits
  aggregation: mean
```

## Probe YAML reference (v2)

```yaml
apmProbe/inputs:
  type: Datadog
  comparator:
    type: float
    value: "500"
    criteria: <=
  datadogApmProbeInputs:
    connectorID: my-datadog-connector
    durationInMin: 5
    queryType: v2
    queries:
      - name: p95
        dataSource: apm_metrics
        params:
          service: cartservice
          stat: latency_p95
          env: production
    formula: p95*1000
    aggregation: mean
runProperties:
  timeout: 30s
  interval: 5s
  attempt: 1
```

:::info note
- The v2 path is selected when `queryType` is `v2` or when `queries` is populated. Legacy probes that use a single `query` string continue to work without changes.
- For `apm_metrics` queries, `stat` is required. Optional parameters such as `env` can be left unset when not needed.
- Synthetic test probes are evaluated in **EOT** mode only.
:::
