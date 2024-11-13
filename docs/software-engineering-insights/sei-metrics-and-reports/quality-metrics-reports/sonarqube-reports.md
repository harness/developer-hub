---
title: SonarQube reports
description: SonarQube is a tool that inspects code quality.
sidebar_position: 50
---

SonarQube is an open-source platform designed for continuous inspection of code quality. It provides valuable insights into code issues, trends, and metrics to help organizations maintain high-quality software.

To analyze your SonarQube data in SEI, set up a [SonarQube SEI integration](/docs/software-engineering-insights/sei-integrations/beta-integrations/sonarqube/sei-integration-sonarqube), and then add the following SonarQube reports to your Insight.

The data is collected from all the branches available in the project and is not restricted only to the main or master branch. Currently, the data is fetched from SonarQube for the last year.

## Available Reports

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

## SonarQube Issues Report

### Definition

This report provides a detailed analysis on the number of code issues, including Bugs, Vulnerabilities, and Code Smells. It allows users to examine issues on a per-project, per-branch, and per-pull request basis. 

By default, this report displays issues for all projects. The report supports drill down functionality. Users can use the open report for further detailed analysis.

<img
  src={require('./static/sonar-issues-report.png').default}
  alt="Example banner" height="50%" width="70%" border="1"
/>

:::info
Note: Please note that there might be a count mismatch due to real-time updates in the repository, as SEI compares the data with the snapshot captured during ingestion.
:::

### Add the report

To configure the **SonarQube Issues report**, follow these steps:

#### Step 1: Add the widget

* Select **Settings**, then **Add Widget**.
* Choose the **SonarQube Issues report** widget.

#### Step 2: Configure the Filters on the widget

* Select the **SonarQube Project** for which you want to display the data
* .Add additional conditions to specify what data feeds into the widget by creating inclusive and exclusive filters.
* If you include multiple filters, they are inherently combined with an `AND` operator.

#### Step 3: Select the Metrics to measure on the widget

To customize the **Bar Chart** for displaying data based on the selected filter criteria, you can choose the appropriate **Stack**. The available filter criteria include **Author**, **Organization**, **Project**, **Severity**, **Status**, and **Type**.

#### Step 4: Configure the Aggregations for the widget

Select the type of data you want to display on the **X-axis** of the widget. The available filter criteria include **Author**, **Organization**, **Project**, **Severity**, **Status**, and **Type**.

#### Step 5: Configure the Settings

Select the maximum number of items that you want to display on the **X-axis**. You can choose to display up to 100 items.

#### Step 6: Save the widget

Select the **Place Widget** button and place the widget in the **Insight** by dragging it to the desired location within the dashboard. Click on the **Save Layout** button to save your configuration.

## SonarQube Issues Trend Report

### Definition

The SonarQube Issues Trend Report provides a trend line that displays the number of issues per day. This report helps track changes in issue volume over time. The report initially displays issues for all projects. The report supports metric stacking & drill down.

<img
  src={require('./static/sonar-issues-trend.png').default}
  alt="Example banner" height="50%" width="70%" border="1"
/>

By default, the report displays the issues for all projects. Users can leverage the following features to customize and analyze the report:

1. **Metric Stacking**: The report supports the stacking of metrics, allowing users to compare the trends of different issue types (e.g., Bugs, Vulnerabilities, Code Smells) simultaneously.
2. **Drill-down Functionality**: The report supports drill-down functionality, enabling users to access more detailed information about the issues, such as Issue ID, Effort, Status, Severity, Organization, Author, Type, and Project.

### Add the report

To configure the **SonarQube Issues Report Trends** report, follow these steps:

#### Step 1: Add the widget

* Select **Settings**, then **Add Widget**.
* Choose the **SonarQube Issues Report Trends** widget.

#### Step 2: Configure the Filters for the widget

Add conditions to specify what data feeds into the widget by creating inclusive and exclusive filters. For example: You can add the **Type** filter to display the data for a particular issue type such as **BUGS**.

You can stack multiple metrics by adding more reports.

#### Step 3: Save the widget

Complete the widget settings and select **Next: Place Widget**, place the widget on Insight and then select **Save Layout**.

## SonarQube Metrics Report

The SonarQube Metrics Report provides an overview of the overall code coverage for projects. It is designed to help users assess the quality of code coverage in their software projects. Initially, the report displays metrics for all projects. Users can apply project-specific filters at the widget and collection level to narrow down the data.

<img
  src={require('./static/sonar-metrics.png').default}
  alt="Example banner" height="50%" width="70%" border="1"
/>

<details>
<summary>How data is ingested from SonarQube into SEI</summary>

1. By default SonarQube shows open issues, while SEI fetches all issues irrespective of status. To align counts, users can manually adjust filters in SonarQube specifically removing the default `'resolve=false'` filter.
2. SEI fetches data within a 360-day timeline, impacting the issue counts. Issues created outside this timeline may not be reflected in SEI.
3. SEI includes issues from both the master branch and associated pull requests. This leads to higher counts in SEI compared to SonarQube, which might focus solely on the master branch. SEI does not visually differentiate between issues originating from the master branch and those associated with pull requests.
4. While fetching bug counts, SEI does not show the bugs which are present in pull requests explicitly. Users need to consider both master and pull request data when analyzing bug counts for a comprehensive understanding.

</details>

## Code Complexity Report

For the Code Complexity reports SEI provides two metrics: Cognitive Complexity and Cyclomatic Complexity to help users analyze code quality, track issue trends, and assess code coverage in their projects.

**Cyclomatic Complexity** measures the minimum number of test cases required for full test coverage. It determines how difficult your code will be to test.

**Cognitive Complexity** is a measure of how difficult a unit of code is to effortlessly understand. Unlike Cyclomatic Complexity, it tells you how difficult your code will be to read and understand.

<img
  src={require('./static/sonar-code-complexity.png').default}
  alt="Example banner" height="50%" width="70%" border="1"
/>

Currently, we support the code complexity report and the code complexity trend report. 
For more information on this, go to [SonarQube Documentation](https://docs.sonarsource.com/sonarqube/latest/user-guide/metric-definitions/)

You can use either of these two metrics or a combination of both in the code complexity trend report.

* When using both metrics, the report will display the median of the scores.
* When using a single metric, the report will display the minimum, maximum, median, and total values for the specific selected metric.