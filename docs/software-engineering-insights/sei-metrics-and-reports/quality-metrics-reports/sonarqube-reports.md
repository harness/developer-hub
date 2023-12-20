---
title: SonarQube reports
description: SonarQube is a tool that inspects code quality.
sidebar_position: 50
---

SonarQube is an open-source platform designed for continuous inspection of code quality. It provides valuable insights into code issues, trends, and metrics to help organizations maintain high-quality software.

To analyze your SonarQube data in SEI, set up a [SonarQube SEI integration](../../sei-integrations/automated-integrations/sei-integration-sonarqube.md), and then add the following SonarQube reports to your Insight.

The data is collected from all the branches available in the project and is not restricted only to the main or master branch. Currently, the data is fetched from SonarQube for the last year.

### Available Reports

* **SonarQube Code Complexity Report:** Analyze code complexity scores using the Cognitive & Cyclomatic complexity metrics.
* **SonarQube Code Complexity Trend Report:** Analyze changes over time in code complexity scores.
* **SonarQube Code Duplication Report:** Analyze code duplication scores.
* **SonarQube Code Duplication Trend Report:** Analyze changes over time in code duplication scores.
* **SonarQube Effort Report:** Analyze effort estimates.
* **SonarQube Effort Trend Report:** Analyze changes over time in effort estimates.
* **SonarQube Issues Report:** Analyze the number of issues by type, time range, or severity.
* **SonarQube Issues Trend Report:** Analyze changes over time in issue volume.
* **SonarQube Metrics Report:** Analyze SonarQube scores.
* **SonarQube Metrics Trend Report:** Analyze changes over time in SonarQube scores.

Users can apply various filters at both the widget and collection level to narrow down the displayed values. The available filter criteria include Author, Organization, Project, Severity, Status, and Type.

Drill-down functionality in the reports, allows users to access detailed information such as Issue ID, Effort, Status, Severity, Organization, Author, Type, and Project.

The Drill Down support is currently available for the SonarQube Issues Report, SonarQube Issues Reports Trend, SonarQube Effort Report, and SonarQube Effort Report Trends. All the other reports currently do not support the drill-down feature.

### SonarQube Issues Report

This report provides a detailed analysis on the number of code issues, including Bugs, Vulnerabilities, and Code Smells. It allows users to examine issues on a per-project, per-branch, and per-pull request basis. By default, this report displays issues for all projects. The report supports drill down functionality

Users can use the open report for further detailed analysis.

:::info
Note: Please note that there might be a count mismatch due to real-time updates in the repository, as SEI compares the data with the snapshot captured during ingestion.
:::

### SonarQube Issues Trend Report

The SonarQube Issues Trend Report provides a trend line that displays the number of issues per day. This report helps track changes in issue volume over time. The report initially displays issues for all projects. The report supports metric stacking & drill down.

### SonarQube Metrics Report

The SonarQube Metrics Report provides an overview of the overall code coverage for projects. It is designed to help users assess the quality of code coverage in their software projects. Initially, the report displays metrics for all projects. Users can apply project-specific filters at the widget and collection level to narrow down the data.

<details>

<summary>How data is ingested from SonarQube into SEI</summary>

1. By default SonarQube shows open issues, while SEI fetches all issues irrespective of status. To align counts, users can manually adjust filters in SonarQube specifically removing the default `'resolve=false'` filter.
2. SEI fetches data within a 360-day timeline, impacting the issue counts. Issues created outside this timeline may not be reflected in SEI.
3. SEI includes issues from both the master branch and associated pull requests. This leads to higher counts in SEI compared to SonarQube, which might focus solely on the master branch. SEI does not visually differentiate between issues originating from the master branch and those associated with pull requests.
4. While fetching bug counts, SEI does not show the bugs which are present in pull requests explicitly. Users need to consider both master and pull request data when analyzing bug counts for a comprehensive understanding.

</details>

### Code Complexity Report

For the Code Complexity reports SEI provides two metrics: Cognitive Complexity and Cyclomatic Complexity to help users analyze code quality, track issue trends, and assess code coverage in their projects.&#x20;

Cyclomatic Complexity measures the minimum number of test cases required for full test coverage. It determines how difficult your code will be to test.

Cognitive Complexity is a measure of how difficult a unit of code is to effortlessly understand. Unlike Cyclomatic Complexity, it tells you how difficult your code will be to read and understand.

Currently, we support the code complexity report and the code complexity trend report. For more information on this, go to [SonarQube Documentation](https://docs.sonarsource.com/sonarqube/latest/user-guide/metric-definitions/)You can use either of these two metrics or a combination of both in the code complexity trend report.

* When using both metrics, the report will display the median of the scores.
* When using a single metric, the report will display the minimum, maximum, median, and total values for the specific selected metric.