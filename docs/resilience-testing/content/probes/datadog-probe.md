Datadog APM probe allows you to query Datadog metrics or run Synthetic tests and compare the results against specified criteria.

## When to use

- Monitor Datadog metrics (e.g., `system.cpu.user`, `trace.servlet.request.duration`) as steady-state indicators during chaos
- Use Datadog Synthetic tests to validate end-to-end user flows under failure conditions
- Validate that Datadog-monitored SLOs remain within acceptable thresholds during fault injection

## Prerequisites

* An active Datadog account
* Access to the Datadog API from the Kubernetes execution plane
* A Datadog API key and Application key for authentication

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **New Probe**

2. Select the **APM Probe**

3. Provide the name of the probe and select **Datadog** under APM Type

    ![Select Datadog Probe](./static/apm-probe/datadog-probe/select-datadog-probe.png)

4. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

5. Under Datadog connector, click on **Select a Connector**

6. In Connector settings, you can either choose an existing connector or click **+ New Connector**

7. Provide the connector details:
   * **Name**: Enter a name for your Datadog connector
   * **Description** (optional): Add a description for the connector
   * **Tags** (optional): Add tags for better organization

8. Configure the Datadog connector credentials:
   * **URL**: Enter your Datadog instance URL
   * **Encrypted Application Key**: Click on **Create or Select a Secret** to provide your Datadog Application key
     * For more details, refer to [Datadog Application Keys documentation](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys)
   * **Encrypted API Key**: Click on **Create or Select a Secret** to provide your Datadog API key
     * For more details, refer to [Datadog API Keys documentation](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys)

    ![Datadog Connector Details](./static/apm-probe/datadog-probe/datadog-connector-details.png)

9. Click **Next** to proceed to **Delegates Setup**. Select the delegate this connector will use:
   * **Use any available Delegate**: Harness will use any available delegate
   * **Only use Delegates with all of the following tags**: Select a specific delegate by tag

    ![Delegates Setup](./static/apm-probe/datadog-probe/delegates-setup.png)

10. Click **Save and Continue** to verify the connection, then click **Finish**

11. Once the connector is created and selected, click on **Configure Details**

12. Under **Probe Properties**, select the query mode and provide the required parameters:
    * **Metrics** mode:
      * **Datadog Query**: Enter your Datadog metrics query
        * **Example**: `avg:system.cpu.user{host:my-host}`
        * For more details, refer to [Datadog Metrics documentation](https://docs.datadoghq.com/metrics/)
      * **Lookback Window (in minutes)**: Specify the time range in minutes to look back for metrics

        ![Probe Properties - Metrics](./static/apm-probe/datadog-probe/probe-properties-metrics.png)

    * **Synthetic Test** mode:
      * Provide the Synthetic test details to evaluate the probe outcome based on test results
      * For more details, refer to [Datadog Synthetics documentation](https://docs.datadoghq.com/synthetics/)

        ![Probe Properties - Synthetic Test](./static/apm-probe/datadog-probe/probe-properties-synthetic.png)

13. Under **Datadog Data Comparison**, provide the comparison criteria:
    * **Type**: Select the data type for comparison (e.g., Float)
    * **Comparison Criteria**: Select the comparison operator (e.g., `>=`, `<=`, `==`, `!=`, `>`, `<`)
    * **Value**: Enter the expected value to compare against the metric result

14. Click **Configure Properties** to proceed to **Associated Risks**. Optionally associate one or more resilience risks with this probe, then click **Next**

15. Provide the **Run Properties**:
    * **Timeout**: Set the timeout duration for the probe execution (e.g., 10s)
    * **Interval**: Set the interval between probe executions (e.g., 2s)
    * **Attempt**: Number of attempts for the probe (e.g., 1)
    * **Polling Interval**: Time between successive probe polls (e.g., 30s)
    * **Initial Delay**: Delay before the first probe execution (e.g., 5s)
    * **Verbosity**: Set the verbosity level for probe logs
    * **Stop On Failure** (Optional): Toggle to stop the experiment if the probe fails

    ![Run Properties](./static/apm-probe/datadog-probe/run-properties.png)

16. Then click on **Create Probe**
