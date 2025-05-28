---
title: "View scan results - Security Tests tab" 
description: View, navigate, discover, and investigate detected issues from an individual scan 
sidebar_position: 10
sidebar_label: "View scan results - Security Tests tab"
redirect_from: 
  - /docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/view-scan-results
  - /docs/category/view-and-troubleshoot-vulnerabilities
  - docs/security-testing-orchestration/dashboards/view-scan-results
---

After your pipeline completes a security scan, you can view the scan results in the **Security Tests** tab. You can access the **Security Tests** tab from two locations:

- **Execution History**: Select a specific pipeline execution from your pipeline's **Execution History**.
- **Executions Section**: Navigate to the **Executions** section from the left navigation in the STO module and select a pipeline execution.

## Navigate to Security Test results

Follow these steps to view the scan results:

1. Navigate to either the **Execution History** of your pipeline or the **Executions** section from the left navigation in the STO module.
2. Select the specific execution that performed the security scan.
3. Click the **Security Tests** tab.

The **Security Tests** tab provides a comprehensive view of all issues detected during the scan.

<DocImage path={require('./static/security-tests-tab.png')} width="100%" height="100%" title="Click to view full size image" />

## Understanding issue categories

Issues identified in the scan are categorized as follows:

- **Only in \<target>:\<variant>**: Issues detected only in the scanned variant.
- **Common to \<target>:\<baseline>**: Issues present both in the scanned variant and the baseline.
- **Common to previous scan**:
  - Issues found in the previous scan (if no baseline is set), OR
  - Issues found in the previous baseline scan (if the current variant is the baseline).

<DocImage path={require('./static/scan-comparison.png')} width="100%" height="100%" title="Click to view full size image" />

:::note
- For optimal results, define a baseline for each target in STO. See [Targets, Baselines, and Variants in STO](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines).
- Issue categorization (**Only in \<target>:\<variant>** and **Remediated**) relies on the baseline used during the scan execution, which may differ from the current baseline if dynamic baselines based on regular expressions are used. See [Dynamic Baselines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines#specify-dynamic-baselines-using-regular-expressions).
:::

## Filtering issues

You can filter issues using multiple criteria in the **Security Tests** tab:

- **Targets**: Filter issues by target name.
- **Target Type**: Filter by target type (e.g., repository, container, etc.).
- **Stage**: Filter by pipeline stages.
- **Step**: Filter by pipeline steps.
- **Scanner**: Filter issues by specific scanners.
- **Issue Type**: Filter by issue types (e.g., SAST, DAST, SCA, IaC, Secret etc.).

### Severity-based filtering

Issues are summarized by severity levels (**Critical**, **High**, **Medium**, **Low**, **Info**) as clickable tiles, serving as additional filters. You can select multiple tiles.

<DocImage path={require('./static/filter-issue-by-severity.png')} width="90%" height="90%" title="Click to view full size image" />

The **Exempted** tile displays the number of exempted issues. Clicking it shows all exempted issues.

## Issue list details

Below the filters and severity tiles, you'll find detailed information:

- **Severity**: Issue criticality.
- **Issue**: Description or name of the issue.
- **Occurrences**: Number of times the issue was detected.
- **Status**: Issue status (e.g., Remediated, Exempted).

## View issue details

Click an issue to open the **Issue Details** pane. This pane contains two tabs: **[Overview](#overview-tab)** and **[Occurrence](#occurrence-tab)**.

<DocImage path={require('./static/issue-details-side-pane.png')} width="100%" height="100%" title="Click to view full size image" />

If an exemption applies or was requested for an issue, the **Exemption Status at Scan** section appears at the top of the pane. Here, you can view exemption details or take actions (**Approve**, **Reject**, **Re-open**) based on your permissions. Learn more in [Issue Exemption Workflow](/docs/security-testing-orchestration/exemptions/exemption-workflows).

<DocImage path={require('./static/exemption-details-in-issue-details.png')} width="100%" height="100%" title="Click to view full size image" />

:::tip
From the **Issue Details** pane, you can create Jira tickets using the **Create Ticket** button (see [Create Jira tickets](/docs/security-testing-orchestration/jira-integrations)) or request issue exemptions using the **Request Exemption** button (see [Issue Exemption Workflow](/docs/security-testing-orchestration/exemptions/exemption-workflows)).
:::

### Overview tab

The **Overview** tab includes:

- **Details**: Issue-related information varying by issue type (SAST, SCA, DAST, IaC, Secret).
- **Remediation**: Remediation steps from **Harness AI** and **Scanner**. If scanning a repository, you can raise PRs or get code suggestions from Harness AI (see [Fix security issues using Harness AI](/docs/security-testing-orchestration/remediations/ai-based-remediations)).

  <DocImage path={require('./static/remediation-section-issue-details-pane.png')} width="100%" height="100%" title="Click to view full size image" />

- **Code Snippet**: Code snippet provided by the scanner. Enable **Allow Vulnerable Content Extraction** in **Default Settings** if the snippet isn't provided.
- **Issue Raw Details**: Raw scanner details.

### Occurrence tab

The **Occurrence** tab lists all issue occurrences with fields varying by issue type. For example, SAST issues include **Severity**, **File Name**, and **Line Number**.

<DocImage path={require('./static/occurrence-list.png')} width="100%" height="100%" title="Click to view full size image" />

Clicking an occurrence opens the **Occurrence Details** pane, including:

- **Details**: Information based on issue type.
- **Remediation**: Steps from **Harness AI** and **Scanner** (see [Fix security issues using Harness AI](/docs/security-testing-orchestration/remediations/ai-based-remediations)).
- **Code Snippet**: Provided by scanner or fetched by enabling **Allow Vulnerable Content Extraction**.
- **Occurrence Raw Details**: Raw scanner details.

<DocImage path={require('./static/occurrence-details-pane.png')} width="100%" height="100%" title="Click to view full size image" />

Use carousel navigation (**Next ( > )** and **Previous ( < )**) to navigate occurrences.

<DocImage path={require('./static/occurrence-tab-carousel-buttons.png')} width="100%" height="100%" title="Click to view full size image" />
