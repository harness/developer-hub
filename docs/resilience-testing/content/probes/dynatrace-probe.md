Dynatrace probe allows you to query Dynatrace metrics and compare the results against specified criteria.

## When to use

- Validate service response times or failure rates monitored by Dynatrace during chaos
- Use Dynatrace entity-level metrics (e.g., per-service, per-host) as experiment pass/fail criteria
- Confirm that Dynatrace-detected SLOs remain healthy under failure conditions

## Prerequisites

* An active Dynatrace account
* Access to the Dynatrace API from the kubernetes execution plane
* A Dynatrace API token with `metrics.read` scope

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **New Probe**

2. Select the **APM Probe**

3. Provide the name of the probe and select **Dynatrace** under APM Type

    ![Select Dynatrace Probe](./static/apm-probe/dynatrace-probe/dynatrace-choose.png)

4. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

5. Under Dynatrace connector, click on **Select a Connector**

6. In Connector settings, you can either choose an existing connector or click **+ New Connector**

    ![Select Dynatrace Connector](./static/apm-probe/dynatrace-probe/choose-connector.png)

7. Provide the connector details:
   * **Name**: Enter a name for your Dynatrace connector
   * **Description** (optional): Add a description for the connector
   * **Tags** (optional): Add tags for better organization

8. Configure the Dynatrace connector credentials:
   * **URL**: Enter your Dynatrace environment URL
     * **Example**: `https://your-environment-id.live.dynatrace.com` or `https://your-managed-domain/e/your-environment-id`
   * **API Token**: Click on **Create or Select a Secret** to provide your Dynatrace API token
     * The API token must have `metrics.read` scope
     * For more details on creating API tokens, refer to [Dynatrace API tokens documentation](https://www.dynatrace.com/support/help/dynatrace-api/basics/dynatrace-api-authentication)

9. Select the delegate and verify the connection, then click on **Finish**

10. Once the connector is created and selected, click on **Configure Details**

11. Under Probe Properties, provide the required parameters:
    * **Metrics Selector**: Enter the Dynatrace metrics selector query to retrieve the desired metrics
      * Metrics selector is used to specify which metrics to query from Dynatrace
      * **Example**: `builtin:service.response.time:avg:filter(eq("dt.entity.service","SERVICE-1234567890"))`
      * For more details, refer to [Dynatrace Metrics API documentation](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/metric-v2/get-all-metrics)
    * **Entity Selector**: Specify the entity selector to filter the metrics by specific entities
      * Entity selector is used to filter metrics based on entity properties
      * **Example**: `type("SERVICE"),tag("environment:production")`
      * For more details, refer to [Dynatrace Entity Selector documentation](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/entity-v2/entity-selector)
    * **Lookback Window (in minutes)**: Specify the time range in minutes to look back for metrics
      * The lookback window refers to the time range from a specified number of minutes ago up to the current moment

12. Provide the comparison criteria under Dynatrace Data Comparison:
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
