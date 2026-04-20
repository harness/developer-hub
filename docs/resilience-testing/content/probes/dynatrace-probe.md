Dynatrace probe allows you to query Dynatrace metrics and compare the results against specified criteria.

## When to use

- Validate service response times or failure rates monitored by Dynatrace during chaos
- Use Dynatrace entity-level metrics (e.g., per-service, per-host) as experiment pass/fail criteria
- Confirm that Dynatrace-detected SLOs remain healthy under failure conditions

## Prerequisites

* An active Dynatrace account
* Access to the Dynatrace API from the Kubernetes execution plane
* A Dynatrace API token with `metrics.read` scope

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Dynatrace** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Dynatrace Connector**, select an existing connector or click **+ New Connector** to create one. Provide the Dynatrace environment URL and an API token with `metrics.read` scope, configure the delegate, verify the connection, and click **Finish**. See [Dynatrace API tokens documentation](https://www.dynatrace.com/support/help/dynatrace-api/basics/dynatrace-api-authentication) for details.

5. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Metrics Selector** | Dynatrace metrics selector query. <br /> Example: `builtin:service.response.time:avg:filter(eq("dt.entity.service","SERVICE-1234567890"))`. See [Dynatrace Metrics API docs](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/metric-v2/get-all-metrics) |
   | **Entity Selector** | Filter metrics by specific entities. <br /> Example: `type("SERVICE"),tag("environment:production")`. See [Entity Selector docs](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/entity-v2/entity-selector) |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now, over which metrics are queried |

   Under **Dynatrace Data Comparison**, provide:

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
