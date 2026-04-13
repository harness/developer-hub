GCP Cloud Monitoring probe allows you to query Google Cloud Platform monitoring metrics using PromQL and compare the results against specified criteria.

## When to use

- Validate GCP infrastructure metrics (e.g., instance CPU utilization, network throughput) during chaos targeting GCP resources
- Use GCP Cloud Monitoring SLOs or custom metrics as experiment pass/fail criteria
- Monitor GKE cluster or Compute Engine instance health via PromQL while running chaos experiments

## Prerequisites

* An active GCP account with Cloud Monitoring enabled
* Access to the GCP Cloud Monitoring API from the kubernetes execution plane
* GCP service account credentials with appropriate permissions (either using Chaos Infra IAM or GCP Service Account Key)

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **New Probe**

2. Select the **APM Probe**

3. Provide the name of the probe and select **GCP Cloud Monitoring** under APM Type

    ![Select GCP Cloud Monitoring Probe](./static/apm-probe/gcp/choose-gcp.png)

4. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

5. Choose your authentication method:
   * **Use Chaos Infra IAM**: Uses the service account and workload identity already configured for your chaos infrastructure to authenticate with GCP Cloud Monitoring
   * **Use GCP Service Account Key**: Authenticates using a specific GCP service account key stored in Harness Secret Manager\

   ![Choose Authentication Method](./static/apm-probe/gcp/choose-auth-method.png)

6. If you selected **Use GCP Service Account Key**:
   * Click on **Create or Select a Secret** to provide your GCP Service Account Key
   * The service account must have the `monitoring.timeSeries.list` permission
   * For more details on creating service account keys, refer to [GCP Service Account Keys documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

7. Click on **Configure Details**

8. Under Probe Properties, provide the required parameters:
   * **Project ID**: Enter your GCP project ID
     * You can find your project ID in the GCP Console or in your project URL
     * **Example**: `my-gcp-project-123456`
   * **Query**: Enter your PromQL query to retrieve the desired metrics from GCP Cloud Monitoring
     * GCP Cloud Monitoring supports PromQL for querying metrics
     * **Example**: `avg_over_time(compute.googleapis.com/instance/cpu/utilization{instance_name="my-instance"}[5m])`
     * For more details, refer to [GCP Cloud Monitoring PromQL documentation](https://cloud.google.com/monitoring/promql)

9. Provide the comparison criteria under GCP Cloud Monitoring Data Comparison:
   * **Type**: Select the data type for comparison (e.g., Float, Int)
   * **Comparison Criteria**: Select the comparison operator (e.g., `>=`, `<=`, `==`, `!=`, `>`, `<`)
   * **Value**: Enter the expected value to compare against the metric result

10. Provide the Run Properties:
   * **Timeout**: Set the timeout duration for the probe execution (e.g., 10s)
   * **Interval**: Set the interval between probe executions (e.g., 2s)
   * **Attempt**: Number of attempts for the probe (e.g., 1)
   * **Polling Interval**: Time between successive probe polls (e.g., 30s)
   * **Initial Delay**: Delay before the first probe execution (e.g., 5s)
   * **Verbosity**: Set the verbosity level for probe logs
   * **Stop On Failure** (Optional): Toggle to stop the experiment if the probe fails

11. Then click on **Create Probe**
