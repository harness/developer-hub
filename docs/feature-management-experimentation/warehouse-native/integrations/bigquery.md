---
title: Connect Google BigQuery 
description: Learn how to integrate Google BigQuery with Harness FME to enable Warehouse Native Experimentation.
sidebar_label: Google BigQuery
sidebar_position: 3
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native Experimentation is GA!"
  tagline="Run Harness FME experiments directly in your data warehouse. Contact Sales or your account manager to enable access."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

<Tooltip id="fme.warehouse-native.warehouse-native">Warehouse Native Experimentation</Tooltip> allows you to run experiments on data that already lives in your <Tooltip id="fme.warehouse-native.data-warehouse">data warehouse</Tooltip>. By connecting Harness FME directly to your Google BigQuery instance, you can securely query and analyze experiment data from your source of truth. 

To begin, connect your Google BigQuery instance as a data source.

### Prerequisites

Ensure that you have the following before getting started:

- Access to your Google Cloud project with BigQuery enabled
- A dataset containing your experiment data
- A designated results table where experiment results are stored
- A [service account](https://docs.cloud.google.com/bigquery/docs/use-service-accounts) with `Read` access to assignment and metric source tables, and `Write` access to a results table
- A service account key in JSON format

## Setup

Harness recommends the following best practices:

- Use a service account rather than a personal Google Cloud user.
- Grant read-only access to the datasets containing the assignment and event data.
- Grant write access only to the experiment results table.

To integrate BigQuery as a data warehouse for Warehouse Native Experimentation:

1. From the Harness FME navigation menu, click **FME Settings** and click **View** on a project on the **Projects** page. Then, navigate to the **Data Source** tab.
1. Select BigQuery as your data warehouse. In the **Data Sources** tab of your Harness FME project, select **BigQuery** from the list of supported data warehouses.

   :::info Project experimentation type
   A project uses a single experimentation type based on the metric source used.

   When you add a data source to a project, the project’s experimentation type is set to `Warehouse Native`. All metrics in the project must then use Warehouse Native metric sources.

   If a project instead uses metrics created from an [ingested event source](/docs/feature-management-experimentation/getting-started/overview/send-event-data/), the project’s experimentation type is set to `Cloud`.
   :::

1. Enter the following connection details:

   | Field | Description | Example |
   |---|---|---|
   | Project ID | Your Google Cloud project ID. | `my-gcp-project` |
   | Dataset | The BigQuery dataset containing experiment data. | `analytics_dataset` |
   | Service Account Email | The Google Cloud service account used for authentication. | `whn-team-access@project-id.iam.gserviceaccount.com` |
   | Results Table Name | The table where experiment results are stored. | `metric_results` | 

   Harness FME respects BigQuery IAM permissions. The connection only has access to resources granted to the service account.
  
1. Provide authentication credentials by clicking **Upload file** to upload a JSON key file for your service account or clicking **Paste text** to enter the JSON key contents. Ensure the key corresponds to the service account email provided.

1. Test the connection by clicking **Test Connection**. Harness FME confirms the following:

   * The service account credentials are valid.
   * The dataset exists and is accessible.
   * The service account has required read and write permissions.

   If the test fails, verify that:

   * The service account has sufficient BigQuery permissions.
   * The Project ID and dataset are correct.
   * The JSON key is valid and active.

1. Select a dataset. After authentication, you can browse available datasets and tables based on your permissions. Select the dataset containing your assignment and metric source tables.
   
1. Specify a results table. Create a results table where Harness FME will write experiment analysis results, and ensure that:

   * The table exists in your database.
   * The schema matches the expected format for experiment results below.

   <br />
   | Field | Type | Description |
   |---|---|---|
   | `METRICID`   | `STRING` | Unique identifier for the metric being calculated. |
   | `METRICNAME` | `STRING` | Human-readable name of the metric being calculated. |
   | `METRICRESULTID` | `STRING` | Unique identifier representing a specific calculation per metric, per experiment, per analysis run. |
   | `EXPID`      | `STRING` | Unique identifier for the experiment associated with this metric calculation. |
   | `EXPNAME`    | `STRING` | Human-readable name of the experiment associated with this metric calculation. |
   | `TREATMENT` | `STRING` | The experiment variant (e.g., Control or Treatment) associated with the metric results. |
   | `DIMENSIONNAME` | `STRING` | The name of the dimension being analyzed (e.g., country, platform). |
   | `DIMENSIONVALUE` | `STRING` | The corresponding value of the analyzed dimension. |
   | `ATTRIBUTEDKEYSCOUNT` | `INT64` | Count of unique keys (users, sessions, etc.) attributed to this metric result. |
   | `REQUESTTIMESTAMP` | `TIMESTAMP` | Timestamp when the metric computation request occurred. |
   | `MIN` | `FLOAT64` | Minimum observed value for the metric. |
   | `MAX` | `FLOAT64` | Maximum observed value for the metric. |
   | `COUNT` | `INT64` | Total number of observations included in the metric calculation. |
   | `SUM` | `FLOAT64` | Sum of all observed metric values. |
   | `MEAN` | `FLOAT64` | Average (mean) of the metric values. |
   | `P50` | `FLOAT64` | 50th percentile (median) metric value. |
   | `P95` | `FLOAT64` | 95th percentile metric value. |
   | `P99` | `FLOAT64` | 99th percentile metric value. |
   | `VARIANCE` | `FLOAT64` | Variance of the metric values. |
   | `EXCLUDEDUSERCOUNT` | `INT64` | Number of users excluded from the analysis (due to filters, SRM, etc.). |
   | `ASOFTIMESTAMP` | `TIMESTAMP` | Timestamp representing when the result snapshot was written. |
   
   To create the results table with the correct structure, run the following SQL statement in Google BigQuery:

   ```sql
   CREATE OR REPLACE TABLE `your_project.your_dataset.metric_results` (
      METRICID STRING,
      METRICNAME STRING,
      METRICRESULTID STRING,
      EXPID STRING,
      EXPNAME STRING,
      TREATMENT STRING,
      DIMENSIONNAME STRING,
      DIMENSIONVALUE STRING,
      ATTRIBUTEDKEYSCOUNT INT64,
      REQUESTTIMESTAMP TIMESTAMP,
      MIN FLOAT64,
      MAX FLOAT64,
      COUNT INT64,
      SUM FLOAT64,
      MEAN FLOAT64,
      P50 FLOAT64,
      P95 FLOAT64,
      P99 FLOAT64,
      VARIANCE FLOAT64,
      EXCLUDEDUSERCOUNT INT64,
      ASOFTIMESTAMP TIMESTAMP
   );
   ```

1. Save and activate. Once the test passes, click **Save** to create the connection. 

Your BigQuery data source can now be used to create assignment and metric sources for Warehouse Native Experimentation.

## Example BigQuery configuration

| **Setting**         | **Example**                                |
|-----------------|----------------------------------------|
| Vendor          | `BigQuery`                               |
| Project ID      | `my-gcp-project`                         |
| Dataset         | `analytics_dataset`                      |
| Service Account | `fme-sa@project.iam.gserviceaccount.com` |
| Results Table   | `metric_results`                         |