---
title: Export Productivity Metrics
description: Learn how to programmatically export developer, team, and org-level Productivity metrics using export APIs.
sidebar_label: Export Productivity Metrics
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

AI DLC Insights provides APIs to export [Productivity](/docs/software-engineering-insights/harness-sei/insights/productivity) metrics in CSV format for team, developer, and organization-level reporting. There are two available APIs:

- **V2 Export API (recommended)**: Asynchronous, scalable, and designed for large datasets and org-wide exports.
- **Legacy Reports API**: Synchronous export API for team and contributor reporting use cases.

Both APIs return CSV output but differ in execution model and request structure. The V2 Export API is recommended for new integrations and large-scale exports.

<Tabs queryString="api-version">
<TabItem value="v2" label="V2 Export API (Recommended)">

The V2 Export API provides asynchronous exports of Productivity metrics at the developer, team, or organization scope. The export workflow looks like:

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
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
POST {BASE_URL}/v2/insights/productivity/exports
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
  "metricGroups": [
    "activity",
    "velocity",
    "volume",
    "quality",
    "collaboration"
  ],
  "metrics": [
    "PR_MERGED",
    "WORK_COMPLETED"
  ],
  "options": {
    "metricLevel": "developer",
    "aggregation": "mean",
    "granularity": "monthly",
    "format": "csv"
  }
}
```

#### Configuration

| Field | Description |
| --- | --- |
| `scope` | Defines the export scope (organization tree or specific team). |
| `dateRange` | Start and end dates for the export period. |
| `metricGroups` | Groups of Productivity metrics to export. |
| `metrics` | Individual metrics to export. |
| `options.metricLevel` | Export level: `developer` or `team`. |
| `options.aggregation` | Aggregation method used for metric calculations. |
| `options.granularity` | Reporting interval (`weekly`, `monthly`, or `quarterly`). |
| `options.format` | Export format (`csv`). |

### Available metric groups

The following Productivity metric groups are available:

| Metric Group | Developer-level Metrics | Team-level Metrics |
| --- | --- | --- |
| `activity` | `CODING_DAYS` | `CODING_DAYS` |
| `velocity` | `PR_CYCLE_TIME_DAYS_AVG`, `AVG_TIME_TO_COMPLETE` | `PR_CYCLE_TIME_DAYS_AVG`, `PR_VELOCITY`, `AVG_TIME_TO_COMPLETE` |
| `volume` | `PR_MERGED`, `PR_MERGED_SMALL`, `PR_MERGED_MEDIUM`, `PR_MERGED_LARGE`, `LOC_ADDED`, `LOC_REMOVED`, `WORK_COMPLETED`, `WORK_FEATURES_COMPLETED`, `WORK_BUGS_COMPLETED`, `WORK_OTHER_COMPLETED` | `PR_MERGED`, `PR_MERGED_SMALL`, `PR_MERGED_MEDIUM`, `PR_MERGED_LARGE`, `WORK_COMPLETED`, `WORK_FEATURES_COMPLETED`, `WORK_BUGS_COMPLETED`, `WORK_OTHER_COMPLETED` |
| `quality` | `REWORK_PERCENT`, `REWORK_PERCENT_RECENT`, `REWORK_PERCENT_LEGACY`, `LOC_REFACTORED`, `LOC_REFACTORED_RECENT`, `LOC_REFACTORED_LEGACY`, `PR_MISSING_TICKETS` | `REWORK_PERCENT`, `REWORK_PERCENT_RECENT`, `REWORK_PERCENT_LEGACY`, `LOC_REFACTORED`, `LOC_REFACTORED_RECENT`, `LOC_REFACTORED_LEGACY`, `PR_MISSING_TICKETS`, `LOC_TOTAL` |
| `collaboration` | `REVIEW_COMMENTS_PER_PR_AVG`, `REVIEW_TIME_TO_FIRST_COMMENT_HRS_AVG` | `REVIEW_COMMENTS_PER_PR_AVG`, `REVIEW_TIME_TO_FIRST_COMMENT_HRS_AVG` |

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

```json title="Create Productivity Export"
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
    "metricGroups": [
      "activity",
      "velocity"
    ],
    "options": {
      "metricLevel": "developer",
      "aggregation": "mean",
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
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
GET {BASE_URL}/v2/insights/productivity/exports/{exportId}
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
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
GET {BASE_URL}/v2/insights/productivity/exports/{exportId}/download
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
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
GET {BASE_URL}/v2/insights/productivity/exports
```

</TabItem>
<TabItem value="v1" label="Legacy Reports API">

The Legacy Reports API provides synchronous exports for team and contributor-level Productivity metrics.

:::info
This API is maintained for backward compatibility. Use the V2 Export API for new integrations.
:::

Both team-level and individual-level exports use the same endpoint. The behavior depends on the parameters you include in the request body.  

**Endpoint**: `POST /v2/insights/teams/reports`

**Authentication**: Requires an `x-api-key` header with an API key generated from your Harness account. For more information about generating an API key, see [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys/).

<Tabs queryString="export-type">
<TabItem value="team" label="Team-Level Reports">

Exports aggregate Productivity metrics per team.

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

:::tip 
`teamRefId` and `collectionId` refer to the same underlying team/collection identifier. Use the same value for both fields when exporting by team. 

To find your collection ID in Harness AIDI, navigate to any team in the Org Tree on the **Insights** page, look at the page URL, and copy the value after `collectionId=`.
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

```bash title="Export Team Productivity Report"
# Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
curl -X POST "${BASE_URL}/v2/insights/teams/reports?format=csv" \
  -H "Content-Type: application/json" \
  -H "authorization: ApiKey <YOUR_API_KEY>" \
  -d '{
    "dateStart": "2024-01-01",
    "dateEnd": "2024-03-31",
    "teamRefId": 456,
    "metricGroups": [
      "activity",
      "velocity",
      "volume",
      "quality",
      "collaboration"
    ],
    "options": {
      "metricLevel": "developer",
      "granularity": "weekly"
    },
    "productivity": {
      "metrics": [
        "PR_VELOCITY_PER_DEV",
        "CODING_DAYS_PER_DEV",
        "NUMBER_OF_COMMENTS_PER_PR"
      ]
    }
  }' \
  --output team_productivity_report.csv
```

```bash title="Export All Productivity Metrics (Empty Array)"
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

Harness recommends the following best practices when working with Productivity export APIs:

- Only CSV format is currently supported.
- All date fields must use the `yyyy-MM-dd` format.
- Export responses automatically include child teams beneath the specified team scope.
- Metric names are case-insensitive.
- If the `metrics` array is empty or omitted, all available metrics for that category are exported.
- Large exports may be automatically compressed as `.gz` files.
- For large organizations, prefer team-scoped exports over root org tree exports to reduce export size and avoid timeouts.

</TabItem>
</Tabs>

## Troubleshooting

<details>
<summary>Why does exporting Productivity metrics for the entire org sometimes time out?</summary>

Exporting Productivity metrics for the entire org from the root node can time out due to the size of large org trees (same limitation as the UI). 

To avoid timeouts when exporting, export at the team or group-level instead of requesting the entire org tree at once. Optionally, split large exports into multiple, smaller team-specific API calls.

</details>