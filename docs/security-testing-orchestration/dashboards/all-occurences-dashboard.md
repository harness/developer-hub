---
title: "STO All Occurrences Dashboard"
description: View, search, filter, and export all raw scanner findings (occurrences) across your Harness account.
sidebar_label: "STO All Occurrences Dashboard"
sidebar_position: 43
---

The **STO All Occurrences Dashboard** provides an account-level view of all vulnerability occurrences (raw scanner findings) across your Harness account. Unlike the [Security Testing Dashboard](/docs/security-testing-orchestration/dashboards/security-testing-dashboard), which focuses on deduplicated issues, this dashboard exposes all raw occurrences as first-class records, enabling you to analyze, investigate, and export underlying scanner results.

This dashboard is useful to:
- View all raw scanner findings across pipelines, targets, target types, scanners, and projects within the account
- Validate how deduplicated issues are derived from raw findings
- Export occurrence-level data for offline analysis, reporting, and audit use cases
- Provide development teams with actionable details such as file paths, line numbers, and repository names to fix vulnerabilities

For steps to navigate to this dashboard, refer to [View STO dashboards](/docs/security-testing-orchestration/dashboards/sto-dashboards-overview#view-sto-dashboards) page.


:::note
- Access to this dashboard requires an **Enterprise** account.
- The dashboard shows active occurrences from the latest baseline scan and displays up to 5,000 rows. Use the **Download** button to export the full dataset.
:::

The dashboard includes a single data table:

- **All Occurrences Detail**: Displays all active occurrences from the latest baseline scan. Each row represents a raw scanner finding along with relevant metadata.

### Table columns

The table includes the following columns:

#### Core Identity
- **Organization**: Name of the Harness Organization.
- **Project**: Name of the Project where the scan was executed.
- **Issue Title**: Name or description of the security issue.
- **Issue Description**: Detailed description of the issue.
- **Issue Type**: Type of issue (e.g., SAST, SCA, Container, Secret Detection).
- **Reference Identifiers**: External reference identifiers such as CVE ID, CWE, GHSA, or BDSA.
- **Scanner**: Name of the scanner that detected the issue.
- **Sub Product**: Sub-product or tool variant used by the scanner.

#### Risk
- **Severity**: Severity level of the issue (Critical, High, Medium, Low, Info).
- **CVSS Score**: Common Vulnerability Scoring System score.
- **EPSS Score**: Exploit Prediction Scoring System score indicating the likelihood of exploitation.
- **EPSS Percentile**: Percentile ranking of the EPSS score.
- **Reachability**: Indicates whether the vulnerable code path is reachable.

#### Context
- **Target Name**: Name of the scanned target where the issue was found.
- **Target Type**: Type of target (e.g., repository, container, instance, configuration).
- **Target URL**: The associated URL or path for the scanned target.
- **Variant Name**: Name of the variant or branch where the issue was identified.
- **Pipeline Execution ID**: Identifier for the pipeline execution.
- **Execution ID**: Unique identifier for the specific scan execution.

#### Location
- **File Name**: Path to the file where the issue was detected.
- **Line Number**: Line number in the file where the issue occurs.

#### Lifecycle
- **First Seen**: Date when the occurrence was first detected.
- **Last Seen**: Date when the occurrence was most recently detected.

#### Status & Workflow
- **Status**: Current status of the occurrence (e.g., Active).
- **Exemption**: Indicates whether an exemption exists for this occurrence.
- **Is Exemption Scope**: Scope of the exemption if applicable.
- **Exemption Expiration**: Expiration date of the exemption.
- **Exemption Requester Email**: Email of the user who requested the exemption.
- **Exemption Approver Email**: Email of the user who approved the exemption.

<DocImage path={require('./static/all-occurrences-dashboard.png')} width="100%" height="100%" title="Click to view full size image" />

### Filters on STO All Occurrences Dashboard

The **STO All Occurrences Dashboard** includes filters to help you narrow down the data based on specific criteria. After applying any filter, click **Reload** icon at the top right of the dashboard for the changes to take effect.

The available filters include:

- **Organization**: Filters data by the selected Harness Organization.
- **Project**: Filters results within a specific Project under the selected Organization.
- **Last Seen**: Filters occurrences based on when they were last detected. You can select from preset ranges (e.g., Last 14 Days) or define a custom date range.
- **Pipeline**: Filters results for a specific pipeline name.
- **Severity**: Filters occurrences by severity level (Critical, High, Medium, Low, or combinations).
- **Issue Type**: Filters by the type of issue (e.g., SAST, SCA, Container).
- **Target**: Filters data by the selected STO scan target.
- **Target Type**: Filters data based on the type of target (repository, container, instance, configuration).
- **Scanner**: Filters results by the scanner used to detect issues.
- **Exempted (Yes/No)**: Filters based on whether occurrences have exemptions.
- **Severity Overridden (Yes/No)**: Filters based on whether the severity has been manually overridden.

:::info
This dashboard is currently available to limited accounts and will be rolled out to all accounts soon. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

### Export occurrence data

To export the full dataset:

1. Apply the desired filters to narrow down the data.
2. Click the **Download** button at the top right of the table.
3. The exported file includes all occurrences matching your filter criteria, not just the 5,000 rows displayed in the UI.

The exported data provides development teams with actionable information including repository names, file paths, line numbers, and issue types needed to remediate vulnerabilities at scale.
