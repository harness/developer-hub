---
title: Export Efficiency and Productivity Metrics Using the Harness SEI API
description: Learn how to programmatically export developer, team, and org-level Efficiency and Productivity metrics using export APIs.
sidebar_label: Export Efficiency and Productivity Metrics
sidebar_position: 3
redirect_from:
  - /docs/software-engineering-insights/harness-sei/api/productivity-export-api
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

SEI 2.0 provides APIs to export [Productivity](/docs/software-engineering-insights/harness-sei/insights/productivity) and [Efficiency](/docs/software-engineering-insights/harness-sei/insights/efficiency) metrics in CSV format for team, developer, and organization-level reporting. There are two available APIs:

- **V2 Export API (recommended)**: Asynchronous, scalable, and designed for large datasets and org-wide exports.
- **Legacy Reports API**: Synchronous export API for team and contributor reporting use cases.

Both APIs return CSV output but differ in execution model and request structure. 

| Feature     | V2 Export API              | Legacy Reports API       |
| ----------- | ------------------- | ---------------- |
| Execution model | Asynchronous | Synchronous |
| Scale | Supports org-level exports | Best for team-level exports |
| Workflow | Job-based export lifecycle | Single request/response |

Harness recommends the following best practices: 

- Prefer team-scoped exports over full organization exports when possible.
- Use `metricGroups` instead of long lists of individual metrics.
- Poll export status instead of repeatedly recreating export jobs.
- Schedule exports during off-peak hours for large organizations.

## Select an API

<Tabs queryString="api-version">
<TabItem value="v2" label="V2 Export API (Recommended)">

The V2 Export API provides asynchronous export of productivity metrics at the developer, team, or organization scope. The export workflow looks like:

```mermaid
graph LR
    A[Create an export job] --> B[Receive <code>exportId</code>]
    B --> C[Poll the export status]
    C --> D[Download a completed CSV export]
```

This API is designed for large organization exports, automated reporting pipelines, scheduled data exports, historical analytics processing, and bulk developer or team reporting.

### Authentication

All V2 export requests require authentication headers.

| Header       | Value                |
| ------------ | -------------------- |
| authorization  | `ApiKey <YOUR_SEI_API_KEY>` |
| Content-Type | `application/json`     |

You must also include the following query parameters on all requests:

| Parameter           | Description                     |
| ------------------- | ------------------------------- |
| `projectIdentifier` | Harness project identifier      |
| `orgIdentifier`     | Harness organization identifier |

### Create Export Job

Create an asynchronous export job. 

```bash
POST /v2/insights/productivity/exports
```

#### Request Body

```json
{
  "scope": {
    "orgTreeName": "Engineering",
    "teamId": "456"
  },
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "metricGroups": ["activity", "velocity", "volume", "quality", "collaboration"], // You can provide `metricGroups` only, `metrics` only, or both `metricGroups` and `metrics`; if both are provided, the API merges and deduplicates the metrics automatically.
  "metrics": ["PR_Merged", "Work_Completed"],
  "options": {
    "aggregation": "mean",
    "aggregationLevel": "developer",
    "granularity": "monthly",
    "format": "csv"
  }
}
```

#### Configuration

| Field            | Description                                               |
|------------------|-----------------------------------------------------------|
| scope            | Defines the export scope (organization or team)           |
| dateRange        | Start and end dates for the export period                 |
| metricGroups     | Groups of metrics to export.                                |
| metrics          | Individual metrics to export                              |
| aggregation      | Aggregation method used for metric calculations           |
| aggregationLevel | Export data grouped by `developer` (each CSV row represents a developer and time period) or `team` (each CSV row represents a team and time period)             |
| granularity      | Reporting interval (`weekly`, `monthly`, `quarterly`)     |
| format           | Export format (`csv`)                                     |

To export an entire organization tree: 

```json
{
  "scope": {
    "orgTreeName": "Engineering" // This exports all teams and developers within the specified org tree.
  }
}
```

To export a specific team:

```json
{
  "scope": {
    "orgTreeName": "Engineering",
    "teamId": "456" // This exports metrics only for the specified team.
  }
}
```

#### Example Request 

```json
curl -X POST "${BASE_URL}/v2/insights/productivity/exports?projectIdentifier=${PROJECT_ID}&orgIdentifier=${ORG_ID}" \
  -H "Content-Type: application/json" \
  -H "authorization: ApiKey <YOUR_SEI_API_KEY>" \
  -d '{
    "scope": {
      "orgTreeName": "Engineering",
      "teamId": "456"
    },
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "metricGroups": ["activity", "velocity"],
    "options": {
      "aggregation": "mean",
      "aggregationLevel": "developer",
      "granularity": "monthly",
      "format": "csv"
    }
  }'
```

#### Responses

<details>
<summary>202 Accepted</summary>

Returned when a new export job is successfully created.

```bash
{
  "exportId": "exp_7a8b9c0d",
  "createdAt": "2025-12-29T10:00:00Z",
  "message": "Export created successfully"
}
```

</details>
<details>
<summary>200 OK (Existing Export Reused)</summary>

Returned when an identical export already exists.

```bash
{
  "exportId": "exp_7a8b9c0d",
  "createdAt": "2025-12-29T09:58:00Z",
  "message": "Using existing export with identical parameters"
}
```

</details>

### Check Export Status

Poll the export status endpoint until the export reaches the `completed` state.

```bash
GET /v2/insights/productivity/exports/{exportId}
```

#### Example Response

```json
{
  "exportId": "exp_7a8b9c0d",
  "status": "completed",
  "createdAt": "2025-12-29T10:00:00Z",
  "completedAt": "2025-12-29T10:02:15Z",
  "download": {
    "url": "/v2/insights/productivity/exports/exp_7a8b9c0d/download",
    "filename": "developer-insights-2024.csv",
    "contentType": "text/csv"
  }
}
```

The following export statuses are available:

| Status       | Description             |
| ------------ | ----------------------- |
| `queued`     | Export is waiting to be processed |
| `processing` | Export is currently being generated    |
| `completed`  | Export is ready for download      |
| `failed`     | Export failed due to an error     |
| `cancelled`  | Export was cancelled by user      |

### Download Export

Downloads the generated CSV file. 

```bash
GET /v2/insights/productivity/exports/{exportId}/download
```

Large exports may be automatically compressed as `.gz` files.

#### Example Request

```bash
curl -X GET "<BASE_URL>/v2/insights/productivity/exports/<EXPORT_ID>/download?projectIdentifier=<HARNESS_PROJECT_ID>&orgIdentifier=<HARNESS_ORG_ID>" \
--header 'authorization: Apikey <SEI_API_KEY>' > ~/<PATH>/<FILE_NAME>.csv.gz
```

### List Exports

Retrieve historical export jobs.

```bash
GET /v2/insights/productivity/exports
```

The following query parameters are available:

| Parameter   | Description                          |
| ----------- | ------------------------------------ |
| `status`    | Filter by export status              |
| `scope`     | `all` (default) or `mine`            |
| `teamId`    | Filter by team ID                    |
| `createdBy` | Filter by user ID                    |
| `dateFrom`  | Filter exports created after a date  |
| `dateTo`    | Filter exports created before a date |
| `limit`     | Maximum results returned (default 50, max 100) |
| `page`      | Page number (0-based)                |
| `sortBy`    | `createdAt`, `completedAt`, `status` |
| `sortOrder` | `asc` or `desc`                      |

The following example demonstrates how to create an export job, poll for export completion, and download the generated CSV file.

```python
import time
import requests

BASE_URL = "<HARNESS_BASE_URL>"
API_KEY = "YOUR_SEI_API_KEY"

HEADERS = {
    "SEI_API_KEY": API_KEY,
    "Content-Type": "application/json"
}

PROJECT = "<HARNESS_PROJECT_ID>"
ORG = "<HARNESS_ORG_NAME>"

payload = {
    "scope": {"orgTreeName": "<ORG_TREE_NAME>"},
    "dateRange": {"start": "2024-01-01", "end": "2024-12-31"},
    "metricGroups": ["activity", "velocity"],
    "options": {
        "aggregation": "mean",
        "aggregationLevel": "developer",
        "granularity": "monthly",
        "format": "csv"
    }
}

create_url = f"{BASE_URL}/v2/insights/productivity/exports?projectIdentifier={PROJECT}&orgIdentifier={ORG}"
resp = requests.post(create_url, headers=HEADERS, json=payload)
export_id = resp.json()["exportId"]

status_url = f"{BASE_URL}/v2/insights/productivity/exports/{export_id}?projectIdentifier={PROJECT}&orgIdentifier={ORG}"

while True:
    status = requests.get(status_url, headers=HEADERS).json()["status"]
    if status == "completed":
        break
    time.sleep(5)

download_url = f"{BASE_URL}/v2/insights/productivity/exports/{export_id}/download?projectIdentifier={PROJECT}&orgIdentifier={ORG}"
file_resp = requests.get(download_url, headers=HEADERS)

with open(f"{export_id}.csv", "wb") as f:
    f.write(file_resp.content)
```

</TabItem>
<TabItem value="v1" label="Legacy Reports API">

The Legacy Reports API provides synchronous CSV exports for team and contributor-level productivity and efficiency metrics.

:::info
This API is maintained for backward compatibility. Use the V2 Export API for new integrations.
:::

Both team-level and individual-level exports use the same endpoint. The behavior depends on the parameters you include in the request body.  

**Endpoint**: `POST /v2/insights/teams/reports`

**Authentication**: Requires an `x-api-key` header with an API key generated from your Harness account. For more information about generating an API key, see [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys/).

<Tabs queryString="export-type">
<TabItem value="team" label="Team-Level Reports">

Exports aggregate productivity and efficiency metrics per team.

**Request Body:** `ExportRequestDTO` (see the [Request body structure section](#request-body-structure) below)

**Response:** A CSV file containing one row per team and one column per metric.

**Request body structure**

For `ExportRequestDTO`: 

```json
{
  "collectionId": "123",
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

**Field descriptions**

| Field          | Type                   | Required | Description                                                                      |
| -------------- | ---------------------- | -------- | -------------------------------------------------------------------------------- |
| `collectionId` | `String`                 | Yes      | Identifier for the team of developers. If your in-app URL contains `?insightType=productivity&collectionId=6036`, then the `collectionId` is `6036`.                                           |
| `dateStart`    | `Date (yyyy-MM-dd)`      | Yes      | Start date for the report period.                                                 |
| `dateEnd`      | `Date (yyyy-MM-dd)`      | Yes      | End date for the report period.                                                   |
| `granularity`  | `String`                 | Yes      | Time unit for rate-based metrics (daily, weekly, monthly).                       |
| `teamRefId`    | `Number`                 | No       | Team identifier. CSV will include this team and all child teams under it.         |
| `productivity` | `ProductivityRequestDto` | No       | Productivity metrics configuration.                                               |
| `efficiency`   | `EfficiencyRequestDto`   | No       | Efficiency metrics configuration.                                                 |

:::tip 
`teamRefId` and `collectionId` refer to the same underlying team/collection identifier. Use the same value for both fields when exporting by team. 

To find your collection ID in Harness SEI, navigate to any team in the Org Tree on the **Insights** page, look at the page URL, and copy the value after `collectionId=`.
:::

**Granularity**

The `granularity` field specifies the time unit for rate-based metrics, which measure counts over time. It affects how certain metrics are calculated and reported.

Metrics affected by granularity include the following:

- `CODING_DAYS_PER_DEV`: For example, 3 coding days per week.
- `WORKTYPE_COMPLETED_PER_DEV`: For example, 1.22 work items completed per week.
- `DEPLOYMENT_FREQUENCY`: For example, 20 deployments per week.

Common granularity values include the following:

- `daily`: Metrics calculated per day.
- `weekly`: Metrics calculated per week.
- `monthly`: Metrics calculated per month.

:::info
Duration-based metrics like `LEAD_TIME_FOR_CHANGES`, `MEAN_TIME_TO_RESTORE`, `AVG_TIME_TO_COMPLETE`, or `TIME_TO_FIRST_COMMENT` are always measured in days and are not affected by granularity.
:::

**Nested objects**

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

**Response format**

**Success Response (200 OK)**

- **Content-Type:** `text/csv`
- **Content-Disposition:** `attachment; filename="<report_name>.csv"`
- **Body:** CSV file with report data.

The CSV file structure contains:

- One row per team (including child teams)
- One column per metric
- First row: Column headers with metric names
- Subsequent rows: Data rows with metric values for each team

</TabItem>
<TabItem value="individual" label="Team-level Metrics (Individual Developers)">

Exports productivity metrics for individual developers within a team.

**Request Body:** `ContributorExportRequestDTO` (see the [Request body structure section](#request-body-structure) below)

**Response:** A CSV file containing one row per developer and one column per metric.

**Request body structure**

For `ContributorExportRequestDTO`: 

```json
{
  "collectionId": "1",
  "dateStart": "2025-11-03",
  "dateEnd": "2025-11-30",
  "granularity": "WEEKLY",
  "includeRatings": true,
  "productivityContributors": {
    "metrics": [
      "PR_VELOCITY",
      "WORK_TYPE_COMPLETED",
      "CODING_DAYS",
      "TIME_TO_FIRST_COMMENT",
      "NUMBER_OF_COMMENTS_PER_PR",
      "AVG_TIME_TO_COMPLETE",
      "NO_OF_PRS_WITH_MISSING_TICKETS"
    ]
  }
}
```

**Field descriptions**

| Field                      | Type                       | Required | Description                                            |
| -------------------------- | -------------------------- | -------- | ------------------------------------------------------ |
| `collectionId`             | `String`                   | Yes      | Identifier for the team of developers. If your in-app URL contains `?insightType=productivity&collectionId=6036`, then the `collectionId` is `6036`.               |
| `dateStart`                | `Date (yyyy-MM-dd)`        | Yes      | Start date for the report period.                      |
| `dateEnd`                  | `Date (yyyy-MM-dd)`        | Yes      | End date for the report period.                        |
| `granularity`              | `String`                   | Yes      | Time unit for rate-based metrics.                      |
| `includeRatings`           | `Boolean`                  | No       | Whether to include developer rating summaries.         |
| `productivityContributors` | `ContributorMetricsConfig` | Yes      | Metrics to include in the developer export.            |

**Granularity**

The `granularity` field specifies the time unit used to normalize rate-based team metrics, which measure counts or activity over time. Granularity determines how these metrics are aggregated and represented in the CSV output.

Team-level metrics affected by granularity include the following:

- `CODING_DAYS`: For example, 3 coding days per week.
- `WORKTYPE_COMPLETED`: For example, 1.22 work items completed per week.
- `DEPLOYMENT_FREQUENCY`: For example, 20 deployments per week.

Common granularity values include the following:

- `daily`: Metrics calculated per day.
- `weekly`: Metrics calculated per week.
- `monthly`: Metrics calculated per month.

**Nested objects**

To configure Productivity metrics with `ContributorExportRequestDTO`:

```json
{
  "metrics": [
    "PR_VELOCITY",
    "WORK_TYPE_COMPLETED",
    "CODING_DAYS",
    "TIME_TO_FIRST_COMMENT",
    "NUMBER_OF_COMMENTS_PER_PR",
    "AVG_TIME_TO_COMPLETE",
    "NO_OF_PRS_WITH_MISSING_TICKETS"
  ]
}
```

- `metrics` (required): List of metric names to include in the export.

The following Productivity metrics are available:

| Metric Name                      | Context                  | Unit                                                                    | Description                                                                                                                                                                                              |
| -------------------------------- | ------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PR_VELOCITY`                    | PR Velocity              | Lines of code per developer per time period (affected by `granularity`) | Measures average PR size (lines of code changed) per developer.<br /><br />Indicates code contribution throughput over time.<br /><br />Useful for understanding development volume across contributors. |
| `WORK_TYPE_COMPLETED`            | Work Items Completed     | Count per developer per time period (affected by `granularity`)         | Number of prioritized work items completed by a contributor.<br /><br />Helps assess individual delivery output.<br /><br />Example: 2.1 means ~2.1 items/week if granularity is weekly.                 |
| `CODING_DAYS`                    | Coding Days              | Days per time period (affected by `granularity`)                        | Number of days the contributor actively wrote code.<br /><br />Correlates with availability and engagement.                                                                                              |
| `TIME_TO_FIRST_COMMENT`          | Time to First Comment    | Days (CSV contains numeric values without units)                        | Time between PR creation and the first review comment.<br /><br />Lower values reflect faster review responsiveness.                                                                                     |
| `NUMBER_OF_COMMENTS_PER_PR`      | Review Intensity         | Count                                                                   | Average number of review comments per PR.<br /><br />Indicates review depth or PR complexity.                                                                                                            |
| `AVG_TIME_TO_COMPLETE`           | Average Time to Complete | Days                                                                    | Time from work start to completion.<br /><br />Higher values may indicate delays or larger tasks.                                                                                                        |
| `NO_OF_PRS_WITH_MISSING_TICKETS` | PR Hygiene               | Count                                                                   | Number of pull requests missing linked work items.<br /><br />Useful for tracking process adherence and hygiene issues.                                                                                  |

**Contributor ratings**

If you set `"includeRatings": true`, the CSV file includes rating columns for applicable metrics. Ratings appear only for metrics where performance tiers exist and reflect developer-specific data, not the team's aggregated value.

For example: 

| Collection Name     | Lead Time for Changes (mean) | Lead Time for Changes Rating | Deployment Frequency | Deployment Frequency Rating | Mean Time to Restore (mean) | Mean Time to Restore Rating |
| ------------------- | ---------------------------- | ---------------------------- | -------------------- | --------------------------- | --------------------------- | --------------------------- |
| Parent Team        | 15.53                        | Medium                       | 0                    | —                           | 45.97                       | Low                         |

**Response format**

**Success Response (200 OK)**

- **Content-Type:** `text/csv`
- **Content-Disposition:** `attachment; filename="<report_name>.csv"`
- **Body:** A CSV file with team-level report data.

The CSV file structure contains:

- One row per collection, including: the org tree, each manager, the manager's direct reports, and individual contributors
- One column for the collection name
- One column per metric included in the export (for example, `PR Velocity per Developer`)

**Usage examples**

**Example 1: Export Team Productivity Report**

```bash
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
curl -X POST "${BASE_URL}/v2/insights/teams/reports?format=csv" \  
  -H "Content-Type: application/json" \
  -H "authorization: ApiKey <YOUR_API_KEY>" \
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

**Example 2: Export Team Efficiency Report (DORA Metrics)**

```bash
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
curl -X POST "${BASE_URL}/v2/insights/teams/reports?format=csv&projectIdentifier=myproject" \  
  -H "Content-Type: application/json" \
  -H "authorization: ApiKey <YOUR_API_KEY>" \
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

**Example 3: Export All Productivity Metrics (Empty Array)**

```bash
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
curl -X POST "${BASE_URL}/v2/insights/teams/reports?format=csv" \  
  -H "Content-Type: application/json" \
  -H "authorization: ApiKey <YOUR_API_KEY>" \
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

</TabItem>
</Tabs>

**Best practices**

- **Format Support:** Currently, only CSV format is supported. Attempting to use other formats will result in an error.
- **Date Format:** All date fields must be in `yyyy-MM-dd` format.
- **Filename Generation:** The export service automatically generates appropriate filenames based on the report content.
- **Empty Results:** Empty or null result sets will return an empty CSV file (0 bytes).
- **Child Teams:** The CSV automatically includes the specified team and all child teams under it.
- **Metric Names:** Metric names are case-insensitive (e.g., `lead_time_for_changes` or `LEAD_TIME_FOR_CHANGES` both work).
- **Empty Metrics Array:** If the `metrics` array is empty or not provided, all available metrics for that category will be exported.
- **Default Calculation Type:** If `calculationType` is not specified for Efficiency metrics, it defaults to `MEAN`.

</TabItem>
</Tabs>

## Troubleshooting

<details>
<summary>Why does exporting Productivity metrics for the entire org sometimes time out?</summary>

Exporting Productivity metrics for the entire org from the root node can time out due to the size of large org trees (same limitation as the UI). 

To avoid timeouts when exporting, export at the team or group-level instead of requesting the entire org tree at once. Optionally, split large exports into multiple, smaller team-specific API calls.

</details>