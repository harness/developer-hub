The Splunk Observability probe allows you to query Splunk Observability (SignalFx) metrics and compare the results against specified criteria.

## When to use

- Validate infrastructure or application metrics tracked in Splunk Observability during fault injection
- Use SignalFx metric time series as steady-state indicators for chaos experiments
- Monitor host-level metrics (CPU, memory, network) from Splunk while running chaos on the underlying infrastructure

## Prerequisites

* An active Splunk Observability (SignalFx) account
* Access to the Splunk Observability API from the Kubernetes execution plane
* An API token for authentication

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Splunk Observability** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Splunk Observability Connector**, select an existing connector or click **+ New Connector** to create one. Provide the Splunk Observability credentials and API token, configure the delegate, verify the connection, and click **Finish**.

5. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Splunk Observability Query** | Search criteria for the metric time series (MTS) you want to retrieve. Supports metrics, dimensions, properties, and tags. <br /> Example: `sf_metric:cpu.utilization AND host.name:gke-default-pool-667be17c-t588.c.test.internal`. See [Splunk Observability API docs](https://dev.splunk.com/observability/reference/api/retrieve_timeserieswindow/latest) |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now, over which data is aggregated |

   Under **Splunk Observability Data Comparison**, provide:

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
