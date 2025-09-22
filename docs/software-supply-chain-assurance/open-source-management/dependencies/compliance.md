---
title: Compliance Reports
sidebar_label: Compliance Reports
description: View Compliance Reports across the Repos using Harness Dashboards
sidebar_position: 3
redirect_from:
- /docs/software-supply-chain-assurance/open-source-management/dependencies/compliance

tags:
  - harness-scs 
  - compliance-report
  - open-source-management
  - dashboards
---


The Compliance Report provides detailed insights into your organization's compliance status. Reports are generated for each compliance standard, including Top 10 OWASP CI/CD and CIS Benchmarks, helps you identify repository-level security gaps. The dashboard supports multiple filters to help narrow down and analyze specific subsets of data. You can download or email the report for further analysis. After applying any filter, click **Reload** icon at the top right of the dashboard for the changes to take effect.

You can generate the compliance report for a [single repository](/docs/software-supply-chain-assurance/open-source-management/dependencies/compliance#compliance-report-repo), or [summary report for all repositories](/docs/software-supply-chain-assurance/open-source-management/dependencies/compliance#compliance-report-summary) within a project or organization of your choice


### Compliance Report (Repo)


This dashboard provides a centralized view of repository-level compliance evaluations against widely accepted security benchmarks such as Top 10 OWASP CI/CD and CIS Benchmarks.



**Repo URL**: Select the repository to view its compliance report.

**Rules Evaluated**: Total number of compliance rules evaluated for the selected repository.

**Rules Passed**: Number of rules the repository complies with.

**Rules Failed**: Number of rules the repository fails to meet.

**Scan Status**: Pie chart showing the percentage of passed vs failed rules.


<DocImage path={require('./static/repo-url.png')} width="80%" height="80%" title="Click to view full size image" />

### Detailed Repo Summary:


**Rule ID**: Unique identifier of the compliance rule.

**Rule Name**: Name/summary of the compliance check.

**Remediation**: Recommended fix or policy to meet the rule.

**Status**: PASS or FAIL status of the rule.

**Severity**: Criticality of the rule (CRITICAL, HIGH, MEDIUM, LOW).

**Standards**: Compliance standards the rule maps to (e.g., CIS, OWASP).

<DocImage path={require('./static/repo-summary.png')} width="80%" height="100%" title="Click to view full size image" />


### Failed Issues Trend by Severity

Tracks the daily count of failed compliance checks by severity, helps you to quickly spot spikes, regressions, and assess repository risk posture over time.

<DocImage path={require('./static/repo-severity.png')} width="80%" height="100%" title="Click to view full size image" />

### Rules Evaluation Trend

Tracks the total number of passed vs failed rule evaluations over time, helps you to visualize changes in compliance posture across scans.

<DocImage path={require('./static/repo-trend.png')} width="80%" height="100%" title="Click to view full size image" />


### Compliance Report (Summary)

The Compliance Report (Summary) aggregates compliance status across multiple repositories.

**Organization**: Filter data by selected Harness Organization.

**Project**: Limit results to a specific Project within the Organization.

**Scan Time**: Filter using predefined presets (e.g., Last 7 Days) or a custom date range.

**Standards**: Filter by compliance standards such as CIS or OWASP.

**Repos Evaluated**: Total number of repositories scanned.

**Repos Passed**: Repositories that are fully compliant.

**Repos Failed**: Repositories with one or more violations.

**Latest Repositories Status**: Lists recently evaluated repositories, including branch names and compliance status.

**Scan Status**: Pie chart showing the percentage of passed vs failed repositories.

<DocImage path={require('./static/compliance-report-summary.png')} width="80%" height="100%" title="Click to view full size image" />


### Detailed Rule Analysis



**Rule ID**: Unique identifier of the compliance rule.

**Rule Name**: Summary of the compliance check.

**Remediation**: Recommended fix to meet the rule.

**Severity**: Rule severity (CRITICAL, HIGH, MEDIUM, LOW).

**Repos Passed**: Number of repositories that passed this rule.

**Repos Failed**: Number of repositories that failed this rule.

**List of Failed Repos**: Names of failed repositories.

<DocImage path={require('./static/compliance-rule-analysis.png')} width="80%" height="100%" title="Click to view full size image" />


### Rules Summary

Provides a breakdown of all evaluated compliance rules, showing the number of repositories that passed or failed each rule which helps to pinpoint compliance gaps across standards like CIS and OWASP.

<DocImage path={require('./static/compliance-rule-summary.png')} width="80%" height="100%" title="Click to view full size image" />

You can also view the [Failed Issues Trend by Severity](/docs/software-supply-chain-assurance/open-source-management/dependencies/compliance#failed-issues-trend-by-severity) and [Rules Evaluation Trend](/docs/software-supply-chain-assurance/open-source-management/dependencies/compliance#rules-evaluation-trend) graphs in the compliance Report Summary dashboard for all repositories within the organization or project.