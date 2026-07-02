New Relic probe allows you to query New Relic metrics using NRQL and compare the results against specified criteria.

## When to use

- Run NRQL queries to validate transaction durations, throughput, or error counts during chaos
- Use New Relic APM data as steady-state indicators for services under test
- Validate that alerting thresholds in New Relic are not breached during fault injection

## Prerequisites

* An active New Relic account
* Access to the New Relic NerdGraph API from the Kubernetes execution plane
* A New Relic User API key for authentication
* Proper configuration of your application to send metrics to New Relic

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **New Relic** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **New Relic Connector**, select an existing connector or click **+ New Connector** to create one. Provide the NerdGraph API endpoint, Account ID, and a User API key (not a License key), configure the delegate, verify the connection, and click **Finish**. See [New Relic API keys documentation](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/) for details.

   :::info note
   Only the NerdGraph API is supported for New Relic integration. Use `https://api.newrelic.com/graphql` (US) or `https://api.eu.newrelic.com/graphql` (EU).
   :::

5. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **New Relic Query** | NRQL query to retrieve the desired metrics. <br /> Example: `SELECT average(duration) FROM Transaction WHERE appName = 'your-app-name' SINCE 5 minutes ago`. See [NRQL documentation](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/) |
   | **New Relic Query Metric** | The specific metric field to extract from the NRQL response. <br /> Example: `average.duration` (for a query using `SELECT average(duration)`) |

   Under **New Relic Data Comparison**, provide:

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
