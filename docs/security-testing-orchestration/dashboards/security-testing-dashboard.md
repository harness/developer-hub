---
title: "Security Testing Dashboard"
description: View, navigate, discover, and investigate detected issues in the Security Testing Dashboard. 
sidebar_label: "Security Testing Dashboard"
sidebar_position: 40
redirect_from: 
  - /docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/security-testing-dashboard
---

The **Security Testing Dashboard** provides an overview of security issues identified across the account. It includes [filters](#filters-on-security-testing-dashboard) that help narrow down data by Organization, Project, creation date, scanner, target, pipeline, severity, and more. The dashboard components are interactive. You can hover over charts, graphs, and other visual elements to view tooltips with additional context. Clicking on a component lets you drill down into related data or navigate to specific detail pages within STO for deeper investigation. For steps to navigate to this dashboard, refer to [View STO dashboards](/docs/security-testing-orchestration/dashboards/sto-dashboards-overview#view-sto-dashboards).

:::note
- This dashboard requires an **Enterprise** account.
- This dashboard shows only results for targets that have baselines defined. You should [define a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines) in your project. 
:::

The dashboard includes the following sections:

#### Security Issues Overall
- **Unique Active Issues**: Lists unique active issues discovered on STO targets with baselines.
- **Vulnerable Targets**: Shows the total number of targets with baselines that have associated active issues.
- **Total Active Issues**: Displays all active issues discovered in STO across all targets with baselines.
- **Unique Active Issues By Severity**: Shows the total number of unique active issues categorized by severity.
- **Total Active Issues By Age**: Shows the total number of unique active issues categorized by age.
- **Top Vulnerable Projects**: Lists the top five projects with the highest vulnerability weight.
- **Top Vulnerable Targets**: Lists the top five targets based on their vulnerability weight.
- **Total Active Issue Count By Scanner**: Shows the total number of unique active issues, categorized by scanner and severity.
- **Active Issue Overview**: Displays all active issues identified across STO targets and baselines.
- **Active Issues By Occurrences**: Lists unique active issues based on how frequently they occur across STO targets and baselines.

#### Issue Trends and Detections

- **Active Issues Trend**: Shows a chronological view of active vulnerabilities across baseline targets.
- **New Issue Detections**: Tracks newly identified active issues on STO targets with baselines, within a specified timeframe.
- **Remediations Over Time**: Displays the number of issues remediated, categorized by severity.

<DocImage path={require('./static/security-testing-dashboard.png')} width="100%" height="100%" title="Click to view full size image" />

### Filters on Security Testing Dashboard
The **Security Testing Dashboard** supports multiple filters to help you narrow down and analyze specific subsets of data. After applying any filter, you must click **Reload** at the top right of the dashboard for the changes to take effect.

The available filters include:

- **Organization**: Filters data based on the selected Harness Organization.
- **Project**: Filters results within a specific Project under the selected Organization.
- **Date**: Allows filtering by predefined presets (e.g., last 7 days) or a custom date range.
- **Reference Identifier**: Filters issues based on a specific reference identifier.
- **Target**: Filters data by the selected STO scan target.
- **Target Type**: Filters data based on the type of target, such as container, repository, instance, or configuration.
- **Scanner**: Filters results by the scanner used to detect issues.
- **Pipeline**: Filters issues based on the pipeline that executed the scan.
- **Severity**: Filters issues by severity level (e.g., Critical, High, Medium, Low, Info).
- **Exempted**: Allows filtering based on whether issues are marked as exempted (Yes or No).
