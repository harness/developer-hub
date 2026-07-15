Datadog APM probe allows you to query Datadog metrics or run Synthetic tests and compare the results against specified criteria. It supports a legacy single-query metrics path and a **Datadog v2 timeseries** path for structured, multi-query validation.

## When to use

- Monitor Datadog metrics (e.g., `system.cpu.user`, `trace.servlet.request.duration`) as steady-state indicators during chaos
- Query Datadog APM metrics (e.g., P95 latency, error rate) for a specific service using the v2 timeseries API
- Use Datadog Synthetic tests to validate end-to-end user flows under failure conditions
- Validate that Datadog-monitored SLOs remain within acceptable thresholds during fault injection
- Reuse a probe template across services by supplying service and environment values at runtime through probe variables

## Prerequisites

To use the Datadog APM probe, you need:

* An active Datadog account
* Access to the Datadog API from the Kubernetes execution plane
* A Datadog API key and Application key. Go to [Datadog API Keys](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys) to create an API key and go to [Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys) to create an application key for the Harness Datadog connector.

### Datadog application key scopes

When you create the application key in Datadog, grant the scopes that match the query mode you use. Grant the minimum scopes required for your probe configuration.

| Scope | Required for | Purpose |
|-------|--------------|---------|
| `timeseries_query` | **Metrics** and **Metrics (v2)** | Query metric timeseries data via the Datadog Metrics API (legacy v1 and v2 timeseries endpoints) |
| `apm_read` | **Metrics (v2)** with **APM Metrics** data source | Query APM service metrics such as latency percentiles and error rate |
| `synthetics_read` | **Synthetic Test** | Read Synthetic test configuration and results |

:::tip Minimum scopes by mode
* **Legacy Metrics** or **Metrics (v2)** with the **Metrics** data source: `timeseries_query`
* **Metrics (v2)** with the **APM Metrics** data source: `timeseries_query` and `apm_read`
* **Synthetic Test**: `synthetics_read`
:::

Go to [Datadog API and Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/) to create scoped application keys.

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Datadog** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime. Use expressions such as `<+probe.variables.SERVICE_NAME>` in query parameters to make a probe reusable across services.

4. Under **Datadog Connector**, select an existing connector or click **+ New Connector** to create one. Provide the Datadog instance URL, Application key, and API key, configure the delegate, verify the connection, and click **Finish**.

5. Under **Probe Properties**, select the query mode at the top. Harness sets the query type automatically from your selection. You do **not** need to enter a **Query Type** field in the UI.

   **Legacy metrics mode (Metrics):**

   | Field | Description |
   |-------|-------------|
   | **Datadog Query** | Single Datadog metrics query string. <br /> Example: `avg:system.cpu.user{host:my-host}`. Go to [Datadog Metrics documentation](https://docs.datadoghq.com/metrics/) to learn query syntax. |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now |

   **v2 timeseries mode (Metrics (v2)):**

   Use this mode when you need structured queries, APM metrics, or formulas across multiple named queries. Select **Metrics (v2)** at the top of **Probe Properties** and define one or more named queries.

   | Field | Description |
   |-------|-------------|
   | **Queries** | List of named queries evaluated by Datadog. Each query has a **Name**, **Data Source**, and params |
   | **Formula** | Expression evaluated against the named queries (for example, `p95*1000` or `errors / hits`). If only one query is defined, the formula defaults to that query's name |
   | **Aggregation** | How datapoints in the lookback window are collapsed before comparison. Supported values: `mean` (default), `max`, `min`, `last` |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now (`durationInMin`) |

   **Supported query data sources:**

   | Data source | UI label | Description | Params format |
   |-------------|----------|-------------|---------------|
   | `metrics` | Metrics | Datadog metrics query | `query` string (for example, `sum:trace.servlet.request.hits{service:account-service}.as_count()`) |
   | `apm_metrics` | APM Metrics | Datadog APM service metrics | JSON object in **Params (JSON)**. `stat` is required; `service` is typically required. `env`, `span_kind`, `group_by`, and `query_filter` are optional |

   **Synthetic Test mode:**

   | Field | Description |
   |-------|-------------|
   | **Synthetic Test** | Provide the Synthetic test details (API test or Browser test) to evaluate the probe outcome. Go to [Datadog Synthetics documentation](https://docs.datadoghq.com/synthetics/) to create and manage tests. |

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

## APM Metrics JSON format

When you select **Metrics (v2)** and set **Data Source** to **APM Metrics**, enter JSON in the **Params (JSON)** field. Do **not** include `data_source` or `name`. Harness adds those from the **Data Source** dropdown and **Name** field.

**Minimal Params (JSON) for the UI:**

```json
{
  "service": "account-service",
  "stat": "latency_p95"
}
```

**With optional filters:**

```json
{
  "service": "<+probe.variables.SERVICE_NAME>",
  "stat": "error_rate",
  "env": "prod",
  "span_kind": "server",
  "query_filter": "version:v2"
}
```

**Complete `apm_metrics` query (Datadog v2 timeseries API shape):**

The JSON below shows how a single named query appears inside the v2 timeseries request after Harness merges your Params JSON with the data source and query name. You do not paste this full object in the UI. Enter only the inner `apm_metrics_query` fields in **Params (JSON)**.

```json
{
  "data_source": "apm_metrics",
  "name": "p95",
  "apm_metrics_query": {
    "service": "account-service",
    "stat": "latency_p95",
    "env": "prod",
    "span_kind": "server",
    "query_filter": "version:v2"
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `stat` | Yes | APM statistic to query. Common values: `latency_p95`, `latency_p99`, `error_rate`, `hits`, `apdex` |
| `service` | Recommended | Datadog APM service name. Required in practice for meaningful results. |
| `env` | No | APM environment (for example, `prod`, `staging`) |
| `span_kind` | No | Span kind filter: `server`, `client`, `consumer`, `producer`, or `internal` |
| `query_filter` | No | Additional filters in Datadog query syntax (for example, `env:prod,version:2.1.0`) |

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

- Select **Metrics (v2)** in the UI. Harness sets `queryType: v2` in YAML templates automatically.
- `dataSource: apm_metrics` queries Datadog APM metrics for the target service
- `stat: latency_p95` requests the P95 latency statistic
- `formula: p95*1000` converts seconds to milliseconds before comparison
- `aggregation: mean` averages datapoints across the lookback window
- `SERVICE_NAME` is required at runtime; `ENV` is optional and can be omitted when not needed

**Equivalent UI settings:**

* Mode: **Metrics (v2)**
* Data Source: **APM Metrics**
* Name: `p95`
* Params (JSON):

```json
{
  "service": "<+probe.variables.SERVICE_NAME>",
  "stat": "latency_p95",
  "env": "<+probe.variables.ENV>"
}
```

* Formula: `p95*1000`
* Aggregation: `mean`
* Comparator: `<=` / `500` (milliseconds)

## Multi-query metrics example

Use multiple named queries and a formula when validating a ratio or derived metric:

```yaml
datadogApmProbeInputs:
  connectorID: <+input>
  durationInMin: 5
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
- In the UI, **Metrics** and **Metrics (v2)** are separate choices. Harness maps them to the correct Datadog API path. In YAML templates, `queryType: v2` (or a populated `queries` list) selects the v2 path.
- For `apm_metrics` queries, `stat` is required. Optional parameters such as `env` can be left unset when not needed.
- Synthetic test probes are evaluated in **EOT** mode only.
:::
