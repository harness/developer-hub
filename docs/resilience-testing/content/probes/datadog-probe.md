Datadog APM probe allows you to query Datadog metrics or run Synthetic tests and compare the results against specified criteria.

## When to use

- Monitor Datadog metrics (e.g., `system.cpu.user`, `trace.servlet.request.duration`) as steady-state indicators during chaos
- Use Datadog Synthetic tests to validate end-to-end user flows under failure conditions
- Validate that Datadog-monitored SLOs remain within acceptable thresholds during fault injection

## Prerequisites

* An active Datadog account
* Access to the Datadog API from the Kubernetes execution plane
* A Datadog API key and Application key for authentication. See [Datadog API Keys](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys) and [Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys)

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Datadog** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Datadog Connector**, select an existing connector or click **+ New Connector** to create one. Provide the Datadog instance URL, Application key, and API key, configure the delegate, verify the connection, and click **Finish**.

5. Under **Probe Properties**, select the query mode and configure:

   **Metrics mode:**

   | Field | Description |
   |-------|-------------|
   | **Datadog Query** | Datadog metrics query. <br /> Example: `avg:system.cpu.user{host:my-host}`. See [Datadog Metrics documentation](https://docs.datadoghq.com/metrics/) |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now |

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
