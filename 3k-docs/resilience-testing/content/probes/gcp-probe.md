GCP Cloud Monitoring probe allows you to query Google Cloud Platform monitoring metrics using PromQL and compare the results against specified criteria.

## When to use

- Validate GCP infrastructure metrics (e.g., instance CPU utilization, network throughput) during chaos targeting GCP resources
- Use GCP Cloud Monitoring SLOs or custom metrics as experiment pass/fail criteria
- Monitor GKE cluster or Compute Engine instance health via PromQL while running chaos experiments

## Prerequisites

* An active GCP account with Cloud Monitoring enabled
* Access to the GCP Cloud Monitoring API from the Kubernetes execution plane
* GCP service account credentials with appropriate permissions (either using Chaos Infra IAM or GCP Service Account Key)

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **GCP Cloud Monitoring** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Choose your authentication method:

   | Method | Description |
   |--------|-------------|
   | **Use Chaos Infra IAM** | Uses the service account and workload identity already configured for your chaos infrastructure |
   | **Use GCP Service Account Key** | Authenticates using a specific GCP service account key stored in Harness Secret Manager. The service account must have the `monitoring.timeSeries.list` permission. See [GCP Service Account Keys documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) |

5. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Project ID** | Your GCP project ID (e.g., `my-gcp-project-123456`) |
   | **Query** | PromQL query to retrieve metrics from GCP Cloud Monitoring. <br /> Example: `avg_over_time(compute.googleapis.com/instance/cpu/utilization{instance_name="my-instance"}[5m])`. See [GCP Cloud Monitoring PromQL docs](https://cloud.google.com/monitoring/promql) |

   Under **GCP Cloud Monitoring Data Comparison**, provide:

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
