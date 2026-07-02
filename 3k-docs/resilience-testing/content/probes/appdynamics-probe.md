The AppDynamics probe allows you to query AppDynamics metrics and compare the results against specified criteria.

## When to use

- Monitor application performance tiers and nodes managed by AppDynamics during chaos
- Validate that business transaction response times or error rates stay within acceptable bounds
- Use AppDynamics infrastructure metrics (CPU, memory) as steady-state health indicators

## Prerequisites

* An active AppDynamics account
* Access to the AppDynamics API from the Kubernetes execution plane
* Authentication credentials (either basic auth or API client)

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **AppDynamics** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **AppDynamics Connector**, select an existing connector or click **+ New Connector** to create one. Provide the controller URL and credentials, configure the delegate, verify the connection, and click **Finish**.

   :::info note
   If you select **API Client** as the authentication type, ensure that the API client has at minimum the **Applications & Dashboards Viewer (Default)** role assigned.
   :::

5. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **AppDynamics Metric Full Path** | The complete hierarchical string that uniquely identifies a metric. Find it in the Browse Metrics section of the AppDynamics controller. <br /> Example: `Application Infrastructure Performance\|Root\|Individual Nodes\|boutique/adservice-xxx\|Hardware Resources\|CPU\|%Busy`. See [AppDynamics Metric Browser docs](https://docs.appdynamics.com/appd/23.x/latest/en/appdynamics-essentials/metrics-and-graphs/metric-browser) |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now, over which data is aggregated |

   Under **AppDynamics Data Comparison**, provide:

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
