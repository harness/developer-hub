---
title: "View and manage security Issues" 
description: View and manage issues across all scans in the project
sidebar_position: 10
sidebar_label: "View and manage issues"
---

After performing security scans in your pipelines, you can review the identified issues from the **[Issues](#navigate-to-issues-section)** section at the **Project** level. This section provides a consolidated view of all security issues affecting your configured baselines, providing a comprehensive list of issue identified across scans in the selected **Project**. **Issues** section is currently available only at the **Project** level. Support for **Organization** and **Account** levels will be available soon.

:::note
This is a new feature currently behind the feature flag `STO_ALL_ISSUES_PAGE` and will be generally available soon. If you’d like to try it before general availability, please contact [Harness Support](mailto:support@harness.io) to enable it for your account.

Please note that, as this feature is still in early access, you may encounter occasional issues. If you do, we kindly request that you report them to your support representative.
:::

From the **Issues** section, you can:

- [View all project issues](#navigate-to-issues-section)
- [Review issue details](#issue-details)
- [Identify impacted targets](#target-details)
- [Inspect occurrences of issues](#occurrence-details)
- [Create Jira tickets from issues](/docs/security-testing-orchestration/jira-integrations)
- [Request issue exemptions](/docs/security-testing-orchestration/exemptions/exemption-workflows)

:::info
The **Issues** section displays only the issues impacting your project's [baselines](https://developer.harness.io/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines/). If your project has no targets or baselines configured, this page will not present the issues, even if scans have been executed against non-baseline targets.
:::

## Navigate to Issues section

Access the **Issues** section from the left navigation in the STO module. You can apply filters to effectively navigate through the issues in your project. See [Filters in Issues section](#filters-in-issues-section) for details.

<DocImage path={require('./static/issues-navigation.png')} width="100%" height="100%" title="Click to view full size image" />

## Issue details

Select an issue from the list in the **Issues** section to open the **Issue Details** pane. This pane shows detailed information about the issue and the affected targets.

From the **Issue Details** pane, you can:
- [Create a Jira ticket](/docs/security-testing-orchestration/jira-integrations): Create project-scoped and target-scoped Jira tickets directly from the **Issues** section.
- [Request an exemption](/docs/security-testing-orchestration/exemptions/exemption-workflows): Submit and respond to exemption requests from the **Issues** section.
- [View impacted targets](#target-details): View targets that are impacted by the selected issue.
  - [View occurrences of the issue](#occurrence-details): View occurrences of the issue for the selected target.


<DocImage path={require('./static/issues-issue-details-pane.png')} width="100%" height="100%" title="Click to view full size image" />

### Exemption status

If an issue has an exemption status, the **Exemption Status** section will appear, showing the overall details of the exemption request. Depending on your permissions, you can take actions such as approving, rejecting, or reopening exemptions. See [Issue Exemption Workflow](/docs/security-testing-orchestration/exemptions/exemption-workflows).

<DocImage path={require('./static/issues-exemption-status.png')} width="100%" height="100%" title="Click to view full size image" />

:::info
The **Issues** section displays the overall exemption status. The exemption status at scan time is shown only in the [**Vulnerabilities** tab](./view-scan-results.md).
:::

## Target details

From the **Issue Details** pane, select a target to open the **Target Details** pane. This pane provides information about the specific target and details about each occurrence of the selected issue.

<DocImage path={require('./static/issues-target-details-pane.png')} width="100%" height="100%" title="Click to view full size image" />

## Occurrence details

In the **Target Details** pane, you can explore individual occurrences from the latest baseline scan of the selected target and issue. Click an occurrence to open the **Occurrence Details** pane, which includes specific details, remediation recommendations, and raw occurrence data.


<DocImage path={require('./static/issues-occurrence-details-pane.png')} width="100%" height="100%" title="Click to view full size image" />

:::info
Remediation suggestions for each occurrence are provided by the scanner itself. AI-based remediation powered by Harness AI is not available from the Issues section; it is only available from the [**Vulnerabilities** tab](./view-scan-results.md).
:::

Use the carousel navigation buttons (**\<** and **\>**) to move through occurrences related to the selected target.

## Filters in Issues section

The **Issues** section offers various filters to help narrow down issues:

### Issue Type

Filter issues by type. Multiple selections are allowed.

- SAST
- DAST
- SCA
- IaC
- Secret
- Misconfig
- Bug Smells
- Code Smells
- Code Coverage
- External Policy

### Targets

Filter issues by target names. Multiple selections are allowed. The dropdown lists all targets scanned within the project.

### Target Type

Filter issues by target type. Multiple selections are allowed.

- Repository
- Container
- Configuration
- Instance

### Pipelines

Filter issues by pipeline names. Multiple selections are allowed. The dropdown lists all pipelines used in the project.

### Scanner

Filter issues by scanner names. Multiple selections are allowed. The dropdown lists all scanners used in the project.

### Severity

Filter issues by severity levels. Multiple selections are allowed.

- Critical
- High
- Medium
- Low
- Info

### Exemption Status

Filter issues by exemption status. Multiple selections are allowed.

- None
- Pending
- Approved
- Rejected
- Expired
