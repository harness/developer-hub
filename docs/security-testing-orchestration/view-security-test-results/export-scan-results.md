---
title: "Export security test results" 
description: Export security test results of a specific pipeline execution.
sidebar_position: 30
sidebar_label: "Export security test results"
---

After a successful pipeline scan execution, you can view the scan results in the **[Security Tests](/docs/security-testing-orchestration/view-security-test-results/view-scan-results)** tab of the Pipeline Execution UI. Currently, the Security Tests tab does not provide an option to export scan results directly. Instead, you can export scan results using the [**STO Pipeline Execution Summary Dashboard**](/docs/security-testing-orchestration/dashboards/sto-pipeline-execution-summary).

You can export security test results in two ways:

1. **[Direct export from Dashboard](#export-scan-results-from-dashboard):** Manually download scan results from the STO Pipeline Execution Summary Dashboard UI.
2. **[Automated export via pipeline](#automated-export-using-a-pipeline-run-step):** Configure a pipeline with a **Run** step to automatically generate and email a report of the scan results.


## Export scan results from Dashboard

To export scan results directly from the dashboard:

1. Navigate to the [**STO Pipeline Execution Summary Dashboard**](/docs/security-testing-orchestration/dashboards/sto-dashboards-overview#view-sto-dashboards).
2. Set the **Pipeline** and **Execution ID** filters to identify the specific scan execution you want to export results from.
   To locate the **Execution ID**:
   - Go to your pipeline's **Execution History**.
   - Select the specific pipeline execution.
   - In the URL, the execution ID follows the `/executions/` segment:
   ```
   https://app.harness.io/ng/account/ACCOUNT_ID/module/MODULE/orgs/ORG/projects/PROJECT/pipelines/PIPELINE/executions/EXECUTION_ID/pipeline
   ```
3. After the results load, click the **Options** menu in the upper-right corner of the dashboard page and select **Download**.
4. Choose your download format (**PDF** or **CSV**) to export the scan results.

<DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/download-results-from-dashboard.png')} width="100%" height="100%" title="Click to view full size image" />


## Automated export using a pipeline Run step

<DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/export-results-pipeline.png')} width="60%" height="60%" title="Click to view full size image" />

You can set up your pipeline to automatically generate and email the scan results. This requires configuring a **Run** step that interacts with the Harness API.

### Prerequisites

Before configuring this step, ensure you have:

- A **Harness API Key**: Refer to [Add and Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys). Store this API key securely as a [Harness Secret](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).
- The **Dashboard ID** of the **STO Pipeline Execution Summary Dashboard**:
  - Navigate to the [STO Pipeline Execution Summary Dashboard](/docs/security-testing-orchestration/dashboards/sto-dashboards-overview#view-sto-dashboards).
  - Obtain the Dashboard ID from the dashboard URL, e.g., `https://app.harness.io/ng/account/ACCOUNT/dashboards/folder/shared/view/30442`. In this URL, the ID is `30442`.

### Configure the Run step in your pipeline

1. **Create a pipeline variable** named `TOKEN` and reference the stored Harness API key as a secret using Harness expressions.

   <DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/export-results-pipeline-variable.png')} width="70%" height="70%" title="Click to view full size image" />
   
2. Add a **Run** step to your pipeline. This step must be placed after your security scan steps. If your pipeline includes multiple security steps, place the Run step after the final security scan step.

3. Configure the **Run** step:

   - **Name**: Set a descriptive name, e.g., "Export PDF"
   - **Registry Type**: Configure your container registry with **Harness Artifact Registry** or **Third-Party Artifact Registry**
   - **Image**: Set to `curlimages/curl`
   - **Shell**: Set to `Sh`

4. Use the following script in the **Command** field, replacing `<YOUR_DASHBOARD_ID>` and `example@harness.io` with your actual Dashboard ID and recipient email addresses:

   ```shell
   EXECUTION_ID=<+pipeline.executionId>
   ACCOUNT_ID=<+account.identifier>
   TOKEN=<+pipeline.variables.TOKEN>
   PIPELINE=<+pipeline.name>
   DASHBOARD_ID=<YOUR_DASHBOARD_ID>

   echo 'Sleeping for a couple of seconds'
   sleep 20

   echo 'Scheduling Report Generation'
   curl --location "https://app.harness.io/dashboard/schedules/run_once?accountId=${ACCOUNT_ID}" \
   --header "x-api-key: ${TOKEN}" \
   --header 'Accept: */*' \
   --header 'Content-Type: application/json' \
   --data-raw "{
       \"dashboard_id\":\"${DASHBOARD_ID}\",
       \"destination_emails\":\"example@harness.io\",
       \"file_type\":\"wysiwyg_pdf\",
       \"name\": \"${PIPELINE}:${EXECUTION_ID}\",
       \"filters\": \"Execution=${EXECUTION_ID}\"
   }"
   ```

After configuration, this Run step automatically fetches the scan results, generates a PDF report, and emails the report to the specified email addresses.

