New Relic probe allows you to query New Relic metrics using NRQL and compare the results against specified criteria.

## When to use

- Run NRQL queries to validate transaction durations, throughput, or error counts during chaos
- Use New Relic APM data as steady-state indicators for services under test
- Validate that alerting thresholds in New Relic are not breached during fault injection

## Prerequisites

* An active New Relic account
* Access to the New Relic NerdGraph API from the kubernetes execution plane
* A New Relic User API key for authentication
* Proper configuration of your application to send metrics to New Relic

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **New Probe**

2. Select the **APM Probe**

3. Provide the name of the probe and select **New Relic** under APM Type

    ![Select New Relic Probe](./static/apm-probe/new-relic-probe/choose-new-relic.png)

4. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

5. Under New Relic connector, click on **Select a Connector**

6. In Connector settings, you can either choose an existing connector or click **+ New Connector**

    ![Select New Relic Connector](./static/apm-probe/new-relic-probe/choose-connector.png)

7. Provide the connector details:
   * **Name**: Enter a name for your New Relic connector
   * **Description** (optional): Add a description for the connector
   * **Tags** (optional): Add tags for better organization

8. Configure the New Relic connector credentials:
   * **New Relic URL**: Select the NerdGraph API endpoint based on your account region:
     * `https://api.newrelic.com/graphql` (US region)
     * `https://api.eu.newrelic.com/graphql` (EU region)
   
   :::info note
   Only the NerdGraph API is supported for New Relic integration.
   :::

   ![New Relic Connector](./static/apm-probe/new-relic-probe/nerdgraph-api.png)

   * **New Relic Account ID**: Enter your New Relic account ID
     * You can find your account ID in the New Relic UI or in your account URL
   * **Encrypted API Key**: Click on **Create or Select a Secret** to provide your New Relic User API key
     * You must use a User key (not a License key) for NerdGraph API authentication
     * For more details on API keys, refer to [New Relic API keys documentation](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/)

9. Select the delegate and verify the connection, then click on **Finish**

10. Once the connector is created and selected, click on **Configure Details**

11. Under Probe Properties, provide the required parameters:
    * **New Relic Query**: Enter your New Relic Query Language (NRQL) query to retrieve the desired metrics
      * NRQL is New Relic's SQL-like query language for querying data
      * **Example**: `SELECT average(duration) FROM Transaction WHERE appName = 'your-app-name' SINCE 5 minutes ago`
      * For more details, refer to [New Relic NRQL documentation](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/introduction-nrql-new-relics-query-language/)
    * **New Relic Query Metric**: Specify the metric name to retrieve from the query results
      * This is the specific metric field you want to extract from the NRQL query response
      * **Example**: `average.duration` - if your query uses `SELECT average(duration)`, the metric would be `average.duration`

12. Provide the comparison criteria under New Relic Data Comparison:
    * **Type**: Select the data type for comparison (e.g., Float, Int)
    * **Comparison Criteria**: Select the comparison operator (e.g., `>=`, `<=`, `==`, `!=`, `>`, `<`)
    * **Value**: Enter the expected value to compare against the metric result

13. Provide the Run Properties:
    * **Timeout**: Set the timeout duration for the probe execution (e.g., 10s)
    * **Interval**: Set the interval between probe executions (e.g., 2s)
    * **Attempt**: Number of attempts for the probe (e.g., 1)
    * **Polling Interval**: Time between successive probe polls (e.g., 30s)
    * **Initial Delay**: Delay before the first probe execution (e.g., 5s)
    * **Verbosity**: Set the verbosity level for probe logs
    * **Stop On Failure** (Optional): Toggle to stop the experiment if the probe fails

14. Then click on **Create Probe**
