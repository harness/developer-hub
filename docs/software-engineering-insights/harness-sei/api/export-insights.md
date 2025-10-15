---
title: Export Productivity and Efficiency Metrics Using the Harness SEI API
description: Learn how to use the Harness SEI API to programmatically export team productivity and efficiency metrics in CSV format.
sidebar_label: Export Productivity and Efficiency Metrics
sidebar_position: 3
---

## Overview

This page explains how to export team productivity and efficiency metrics, provides guidance on configuring request parameters, and includes best practices for interpreting and using the CSV output.

The SEI Insights Export API enables you to export team productivity and efficiency metrics in CSV format. The CSV output contains one row per team and one column per metric, making it easy to analyze and compare performance across teams and time periods.

With this API, you can:

- Export [Productivity](/docs/software-engineering-insights/harness-sei/analytics-and-reporting/productivity) metrics such as PR velocity, coding days, and completed work items per developer.
- Export [Efficiency (DORA)](/docs/software-engineering-insights/harness-sei/analytics-and-reporting/efficiency) metrics such as lead time for changes, deployment frequency, and mean time to restore.
- Include all child teams under a specified team in a single CSV export.

## Export team reports

Use this endpoint to export data reports for teams. 

**Endpoint**: `POST /v2/insights/teams/reports`

**Authentication**: Requires an `x-api-key` header with an API key generated from your Harness account. For more information about generating an API key, see [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys/).

**Request Body:** `ExportRequestDTO` (see the [Request body structure section](#request-body-structure) below)

**Response:** CSV file download with appropriate headers.

## Request body structure

For `ExportRequestDTO`: 

```json
{
  "dateStart": "2024-01-01",
  "dateEnd": "2024-12-31",
  "teamRefId": 123,
  "granularity": "weekly",
  "productivity": {
    "metrics": ["PR_VELOCITY_PER_DEV", "CODING_DAYS_PER_DEV"]
  },
  "efficiency": {
    "metrics": ["LEAD_TIME_FOR_CHANGES", "DEPLOYMENT_FREQUENCY"],
    "calculationType": "MEAN"
  }
}
```

### Field descriptions

| Field          | Type                   | Required | Description                                                                      |
| -------------- | ---------------------- | -------- | -------------------------------------------------------------------------------- |
| `dateStart`    | `Date (yyyy-MM-dd)`      | Yes      | Start date for the report period.                                                 |
| `dateEnd`      | `Date (yyyy-MM-dd)`      | Yes      | End date for the report period.                                                   |
| `teamRefId`    | `Number`                 | No       | Team identifier. CSV will include this team and all child teams under it.        |
| `granularity`  | `String`                 | No       | Time unit for rate-based metrics (daily, weekly, monthly). Defaults to `weekly`. |
| `productivity` | `ProductivityRequestDto` | No       | Productivity metrics configuration.                                               |
| `efficiency`   | `EfficiencyRequestDto`   | No       | Efficiency metrics configuration.                                                 |

### Granularity

The `granularity` field specifies the time unit for rate-based metrics, which measure counts over time. It affects how certain metrics are calculated and reported.

Metrics affected by granularity include the following:

- `CODING_DAYS_PER_DEV`: For example, 3 coding days per week.
- `WORKTYPE_COMPLETED_PER_DEV`: For example, 1.22 work items completed per week.
- `DEPLOYMENT_FREQUENCY`: For example, 20 deployments per week.

Common granularity values include the following:

- `daily`: Metrics calculated per day.
- `weekly` (default): Metrics calculated per week.
- `monthly`: Metrics calculated per month.

:::info
Duration-based metrics like `LEAD_TIME_FOR_CHANGES`, `MEAN_TIME_TO_RESTORE`, `AVG_TIME_TO_COMPLETE`, or `TIME_TO_FIRST_COMMENT` are always measured in days and are not affected by granularity.
:::

### Nested objects

To configure Productivity metrics with `ProductivityRequestDto`:

```json
{
  "metrics": ["PR_VELOCITY_PER_DEV", "CODING_DAYS_PER_DEV"]
}
```

- `metrics` (required): List of productivity metric names to include in the export.

The following Productivity metrics are available:

| Metric Name | Context | Unit | Description |
|---|---|---|---|
| `TIME_TO_FIRST_COMMENT` | Time to First Comment | Days (CSV contains numeric values without unit labels) | Measures the average time taken for the first comment to be made on a pull request.<br /><br />Helps track review responsiveness and team collaboration speed.<br /><br />Lower values indicate faster initial engagement on PRs. |
| `PR_VELOCITY_PER_DEV` | PR Velocity per Developer | Lines of code per developer per time period (affected by `granularity`) | Measures the average PR size (lines of code changed) per developer.<br /><br />Indicates developer productivity in terms of code contribution volume.<br /><br />Helps identify development throughput patterns. |
| `WORKTYPE_COMPLETED_PER_DEV` | Work Completed per Developer | Work items per developer per time period (affected by `granularity`) | Tracks bugs resolved with priority per developer.<br /><br />Measures developer contribution to bug resolution and issue completion.<br /><br />Provides insights into issue resolution capacity.<br /><br />Example: 1.22 means ~1.22 work items completed per week (if granularity is weekly). |
| `CODING_DAYS_PER_DEV` | Coding Days per Developer | Days per time period (affected by `granularity`) | Counts the number of days a developer actively contributed code.<br /><br />Helps track developer engagement and activity levels.<br /><br />Useful for understanding work patterns and availability.<br /><br />Example: 3 means 3 coding days per week (if granularity is weekly). |
| `NUMBER_OF_COMMENTS_PER_PR` | Number of Comments per PR | Count (dimensionless number) | Average number of review comments per pull request.<br /><br />Indicates code review thoroughness and collaboration intensity.<br /><br />Higher values may suggest more complex changes or detailed review processes. |
| `AVG_TIME_TO_COMPLETE` | Average Time to Complete | Days (CSV contains numeric values without unit labels) | Average time to complete a work item from start to finish.<br /><br />Measures development cycle efficiency.<br /><br />Helps identify bottlenecks in the development process. |

To configure Efficiency metrics with `EfficiencyRequestDto`:

```json
{
  "metrics": ["LEAD_TIME_FOR_CHANGES", "DEPLOYMENT_FREQUENCY"],
  "calculationType": "MEAN"
}
```

- `metrics` (required): List of efficiency metric names to include in the export.
- `calculationType` (optional): Aggregation method (defaults to `MEAN`).

The following Efficiency (DORA) metrics are available:

| Metric Name | Context | Unit | Description |
|---|---|---|---|
| `LEAD_TIME_FOR_CHANGES` | Lead Time for Changes | Days (CSV contains numeric values without unit labels) | Measures the time from code commit to production deployment.<br /><br />Key indicator of delivery speed and process efficiency.<br /><br />Lower lead times indicate faster feature delivery and more agile development.<br /><br />Industry benchmark: Elite performers achieve lead times under 1 day. |
| `DEPLOYMENT_FREQUENCY` | Deployment Frequency | Deployments per time period (affected by `granularity`) | Tracks how often code is deployed to production.<br /><br />Indicates team's ability to deliver value continuously.<br /><br />Higher frequency suggests better automation and CI/CD maturity.<br /><br />Example: 20 means 20 deployments per week (if granularity is weekly).<br /><br />Industry benchmark: Elite performers deploy multiple times per day. |
| `CHANGE_FAILURE_RATE` | Change Failure Rate | Percentage (0–100, CSV contains numeric values without unit labels) | Percentage of deployments that cause failures in production.<br /><br />Measures quality and stability of releases.<br /><br />Lower rates indicate better testing, quality assurance, and deployment practices.<br /><br />Industry benchmark: Elite performers maintain CFR below 15%. |
| `MEAN_TIME_TO_RESTORE` | Mean Time to Restore (MTTR) | Days (CSV contains numeric values without unit labels) | Time to recover from a production failure or incident (aggregated using `calculationType`).<br /><br />Indicates team's incident response capability and system resilience.<br /><br />Lower MTTR suggests effective monitoring, alerting, and rollback procedures.<br /><br />Industry benchmark: Elite performers restore service in under 1 hour. |
| `OVERALL_DORA` | Overall DORA Score | Score/Rating (implementation-specific) | Composite metric combining all four DORA metrics.<br /><br />Provides holistic view of team's DevOps performance.<br /><br />Used to classify teams as Elite, High, Medium, or Low performers.<br /><br />Based on Google's DORA State of DevOps research. |

The following calculation types are available:

| Aggregation Type | Description |
|---|---|
| `MEAN` (Average) | Calculates the arithmetic mean of all metric values. Provides a balanced view of typical performance. <br /><br /> Best for understanding overall trends. Can be skewed by outliers. |
| `MEDIAN` (50th Percentile) | The middle value when all metrics are sorted. More resistant to outliers than mean. Represents typical performance for half the team. <br /><br /> Best for understanding central tendency when data has outliers. |
| `P90` (90th Percentile) | 90% of metric values fall below this threshold. Highlights performance of top performers. <br /><br /> Useful for identifying best-case scenarios. Helps set aspirational targets. |
| `P95` (95th Percentile) | 95% of metric values fall below this threshold. Focuses on exceptional performance. <br /><br /> Useful for capacity planning and SLA definitions. Helps identify peak performance patterns. |

## Response format

### Success Response (200 OK)

- **Content-Type:** `text/csv`
- **Content-Disposition:** `attachment; filename="<report_name>.csv"`
- **Body:** CSV file with report data.

The CSV file structure contains:

- One row per team (including child teams)
- One column per metric
- First row: Column headers with metric names
- Subsequent rows: Data rows with metric values for each team

## Usage examples

### Example 1: Export Team Productivity Report

```bash
curl -X POST "https://api.example.com/v2/insights/teams/reports?format=csv" \
  -H "Content-Type: application/json" \
  -H "x-api-key: <YOUR_API_KEY>" \
  -d '{
    "dateStart": "2024-01-01",
    "dateEnd": "2024-03-31",
    "teamRefId": 456,
    "granularity": "weekly",
    "productivity": {
      "metrics": ["PR_VELOCITY_PER_DEV", "CODING_DAYS_PER_DEV", "NUMBER_OF_COMMENTS_PER_PR"]
    }
  }' \
  --output team_productivity_report.csv
```

### Example 2: Export Team Efficiency Report (DORA Metrics)

```bash
curl -X POST "https://api.example.com/v2/insights/teams/reports?format=csv&projectIdentifier=myproject" \
  -H "Content-Type: application/json" \
  -H "x-api-key: <YOUR_API_KEY>" \
  -d '{
    "dateStart": "2024-01-01",
    "dateEnd": "2024-12-31",
    "teamRefId": 123,
    "efficiency": {
      "metrics": ["LEAD_TIME_FOR_CHANGES", "DEPLOYMENT_FREQUENCY", "MEAN_TIME_TO_RESTORE"],
      "calculationType": "MEDIAN"
    }
  }' \
  --output efficiency_report.csv
```

### Example 3: Export All Productivity Metrics (Empty Array)

```bash
curl -X POST "https://api.example.com/v2/insights/teams/reports?format=csv" \
  -H "Content-Type: application/json" \
  -H "x-api-key: <YOUR_API_KEY>" \
  -d '{
    "dateStart": "2024-01-01",
    "dateEnd": "2024-12-31",
    "teamRefId": 789,
    "productivity": {
      "metrics": []
    }
  }' \
  --output all_productivity_metrics.csv
```

When the `metrics` array is empty, all available metrics for that category will be exported.

## Best practices

- **Format Support:** Currently, only CSV format is supported. Attempting to use other formats will result in an error.
- **Date Format:** All date fields must be in `yyyy-MM-dd` format.
- **Filename Generation:** The export service automatically generates appropriate filenames based on the report content.
- **Empty Results:** Empty or null result sets will return an empty CSV file (0 bytes).
- **Child Teams:** The CSV automatically includes the specified team and all child teams under it.
- **Metric Names:** Metric names are case-insensitive (e.g., `lead_time_for_changes` or `LEAD_TIME_FOR_CHANGES` both work).
- **Empty Metrics Array:** If the `metrics` array is empty or not provided, all available metrics for that category will be exported.
- **Default Calculation Type:** If `calculationType` is not specified for Efficiency metrics, it defaults to `MEAN`.