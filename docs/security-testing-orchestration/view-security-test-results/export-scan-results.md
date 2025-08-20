---
title: "Export security test results" 
description: Export security test results of a specific pipeline execution.
sidebar_position: 20
sidebar_label: "Export security test results"
---

After a successful pipeline scan execution, you can view results in the **[Vulnerabilities](/docs/security-testing-orchestration/view-security-test-results/view-scan-results)** tab of the pipeline execution window.

You can export scan results in two ways:

1. **[Export from the Vulnerabilities tab](#export-from-the-vulnerabilities-tab):** Download scan results directly as **CSV**, or open the [Pipeline Execution Summary Dashboard](/docs/security-testing-orchestration/dashboards/sto-pipeline-execution-summary) for **PDF/CSV** export.
2. **[Automated export via pipeline](#automated-export-using-a-pipeline-run-step):** Configure a pipeline with a **Run** step to automatically generate and email reports.

## Export from the Vulnerabilities tab

The **Vulnerabilities** tab provides two options for exporting scan results:

- **Download CSV**: Instantly export results in CSV format.  
- **View in Dashboard**: Opens the **[Pipeline Execution Summary Dashboard](/docs/security-testing-orchestration/dashboards/sto-pipeline-execution-summary)**, where you can also export as **PDF** or **CSV**.

<DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/download-csv-vulnerability-tab.png')} width="100%" height="100%" title="Click to view full size image" />

<details>
<summary>Example CSV export</summary>

| Organisation Name | Project Name | Pipeline Name          | Execution ID               | Issue ID                  | Issue Title             | Severity  | Severity Score | No. of Occurrences | Target Type | Target Name        | Variant | Exemption Status | Scanner Name | Exemption Requestor Email | Exemption Approver Email | Only in Current Scan |
|-------------------|--------------|------------------------|----------------------------|---------------------------|-------------------------|-----------|----------------|--------------------|-------------|--------------------|---------|------------------|--------------|---------------------------|--------------------------|----------------------|
| default           | STO          | twistlock with policy  | 0om495LeS-Wc9WD8HsoVQg     | gfPVsGE_X8j5Q6y4IqacdJ    | babel-traverse@6.11.4   | Critical  | 9.4            | 1                  | container   | 1njected/nodegoat  | latest  | Pending          | twistlock    | john.doe@company.com      | security-team@company.com | no                   |
| default           | STO          | twistlock with policy  | 0om495LeS-Wc9WD8HsoVQg     | zj8auAxKD-tNAh5EIFpW3c    | bson@1.0.4              | Critical  | 9.8            | 3                  | container   | 1njected/nodegoat  | latest  | Approved         | twistlock    | sarah.smith@company.com   | security-lead@company.com | no                   |
| default           | STO          | twistlock with policy  | 0om495LeS-Wc9WD8HsoVQg     | YCJDZf9HbKQt5mNw9kzSTO    | deep-extend@0.4.1       | Critical  | 9.8            | 1                  | container   | 1njected/nodegoat  | latest  | Pending          | twistlock    | mike.johnson@company.com  | sec-admin@company.com     | no                   |

</details>

For the **View in Dashboard** option, click the button to open the [Pipeline Execution Summary Dashboard](/docs/security-testing-orchestration/dashboards/sto-pipeline-execution-summary). The dashboard automatically applies your pipeline execution ID as a filter, so you can view the results without additional filtering. From there, click the **Options** menu (top-right) and select **Download** (choose **PDF** or **CSV**).

You can also access the dashboard directly and set the filters manually. See [Pipeline Execution Summary Dashboard](/docs/security-testing-orchestration/dashboards/sto-pipeline-execution-summary) to learn more.

:::info
You can find the **Execution ID** in your pipeline’s execution URL. For example:  
```https://app.harness.io/ng/account/ACCOUNT_ID/module/MODULE/orgs/ORG/projects/PROJECT/pipelines/PIPELINE/executions/EXECUTION_ID/pipeline```  
In this URL, the value after `/executions/` is the **Execution ID**.
:::

<DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/download-results-from-dashboard.png')} width="100%" height="100%" title="Click to view full size image" />

## Automated export using a pipeline Run step

<DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/export-results-pipeline.png')} width="60%" height="60%" title="Click to view full size image" />

You can configure your pipeline to automatically generate and email scan results using a **Run** step that interacts with the Harness API.

### Prerequisites

- **Harness API Key**: Refer to [Add and Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys). Store this API key securely as a [Harness Secret](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).  
- **Dashboard ID** of the **Pipeline Execution Summary Dashboard**:  
  - Navigate to the [STO Pipeline Execution Summary Dashboard](/docs/security-testing-orchestration/dashboards/sto-dashboards-overview#view-sto-dashboards).  
  - Obtain the Dashboard ID from the dashboard URL, e.g., `https://app.harness.io/ng/account/ACCOUNT/dashboards/folder/shared/view/30442`. In this URL, the ID is `30442`.

### Configure the Run step

1. Create a pipeline variable named `TOKEN` and reference the stored Harness API key as a secret.

   <DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/export-results-pipeline-variable.png')} width="70%" height="70%" title="Click to view full size image" />
   
2. Add a **Run** step after your security scan steps.

3. Configure the step with:  
   - **Image**: `curlimages/curl`  
   - **Shell**: `Sh`

4. Use the following script, replacing `<YOUR_DASHBOARD_ID>` and `example@harness.io`:

```sh
EXECUTION_ID=<+pipeline.executionId>
ACCOUNT_ID=<+account.identifier>
TOKEN=<+pipeline.variables.TOKEN>
PIPELINE=<+pipeline.name>
DASHBOARD_ID=<YOUR_DASHBOARD_ID>

echo 'Sleeping for a few seconds to ensure dashboard data is available'
sleep 20

echo 'Scheduling report generation'
curl --location "https://app.harness.io/dashboard/schedules/run_once?accountId=${ACCOUNT_ID}" \
  --header "x-api-key: ${TOKEN}" \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw "{
    \"dashboard_id\":\"${DASHBOARD_ID}\",
    \"destination_emails\":\"example@harness.io\",
    \"file_type\":\"wysiwyg_pdf\",
    \"name\":\"${PIPELINE}:${EXECUTION_ID}\",
    \"filters\":\"Execution=${EXECUTION_ID}\"
  }"
