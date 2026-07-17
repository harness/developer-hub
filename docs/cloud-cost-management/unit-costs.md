---
title: Unit Cost Metrics
description: "Unit Cost Metrics documentation for Harness Cloud & AI Cost Management"
sidebar_position: 8
helpdocs_is_private: false
helpdocs_is_published: true
---

## Overview

Unit Cost Metrics is a feature in Harness Cloud & AI Cost Management (CACM) that allows you to track and analyze custom business metrics over time. These metrics help you correlate cloud costs with business drivers like headcount, transactions, users, or any other quantifiable measure that's meaningful to your organization.

By tracking unit metrics alongside your cloud costs, you can calculate **unit economics** — understanding not just how much you're spending, but how efficiently you're spending relative to business growth.

**What you can do with Unit Cost Metrics:**
- Track business metrics (headcount, users, transactions, etc.) over time
- Ingest data via API, CSV upload, or JSON paste
- Visualize metric trends with interactive charts
- Monitor key statistics (totals, averages, date ranges)
- Calculate cost-per-unit (Coming soon)

### What is a Unit Metric?

A unit metric is a time-series measurement of any quantifiable business value that helps you understand your cloud spending efficiency. Instead of just knowing you spent USD50,000 last month, you can calculate that you spent USD1,000 per developer or USD0.05 per transaction.

### Metric Components

Each unit metric consists of:

1. **Metric Name**: A descriptive name for your metric (e.g., "Active Developers", "Monthly Active Users")
   - This appears in the UI and should be clear to all stakeholders
   - Auto-generates an identifier like `active_developers` for API usage
2. **Description** (Optional): Additional context about what this metric measures
   - Example: "Count of developers who committed code in the last 30 days, by team"
   - Helps future users understand the exact definition and data source
3. **Records**: Time-stamped data points with numeric values
   - Each record is a single measurement at a specific point in time
   - Example: `{ "usageTimeStamp": "2026-01-15T00:00:00Z", "value": 45 }`
4. **Labels** (Optional): Key-value pairs for segmenting your metrics
   - **Why use labels?** They let you track the same metric across different dimensions
   - Example: Track "developers" with labels `{"team": "platform"}`, `{"team": "frontend"}`, `{"team": "mobile"}`
   - This allows you to calculate unit costs per team: platform team's infrastructure cost / platform team's developer count
   - You can have multiple label dimensions: `{"team": "platform", "region": "us-east", "env": "production"}`
5. **Aggregation Type**: How multiple values should be combined when viewing data at different time ranges
   - More on this in the next section - this is critical to get right!

### Understanding Aggregation Types

Aggregation determines how your metric values are combined when you're viewing data over longer time periods or when multiple records exist for the same time period.

**When does aggregation matter?**
- When you have multiple records for different labels on the same day
- When viewing weekly or monthly charts (combining daily data)
- When calculating statistics like averages or totals

**The Four Aggregation Types:**

- **Sum** - Add all values together
  - **Use when:** Your metric represents a **cumulative count** across independent entities.
  - **Examples:**
    - Total headcount across teams: Platform (45) + Frontend (32) + Mobile (18) = **95 total employees**
    - Total API calls across regions: US (1M) + EU (800K) + APAC (500K) = **2.3M total calls**

- **Average** - Calculate the average
  - **Use when:** Your metric represents a **rate or intensity** that shouldn't be added together.
  - **Examples:**
    - Average CPU utilization across servers: Server1 (80%) + Server2 (60%) + Server3 (40%) = **60% average** (not 180%)

- **MAX** - Show the maximum value
  - **Use when:** You care about the **peak or capacity** across measurements.

  - **Examples:**
    - Peak concurrent users: Shows your highest load point (critical for capacity planning)
    - Maximum database connections: Helps understand peak resource needs
    - Highest transaction volume: Shows your busiest day

- **MIN** - Show the minimum value
  - **Use when:** You care about the **baseline or lowest point**.
  - **Examples:**
    - Minimum daily active users: Understanding your floor helps with baseline cost allocation
    - Lowest available capacity: Identifies constraints
    - Minimum SLA compliance: Finding your worst-performing period

:::note
All unit metric data is stored at **daily granularity** as cloud provider bills are typically calculated and delivered at daily granularity
:::
----

## Creating a Unit Metric

Go to **CACM > Account Settings > Unit Metrics >Create New** to create a new metric.

<Tabs>
<TabItem value="create" label="Define Metric">

When creating a new metric, add:

- **Metric Name** (required): A descriptive name for your metric
- **Metric Identifier**: Auto-generated from the name (e.g., "Active Users" → "active_users")
- **Description** (optional): Additional context about the metric
- **Default Aggregation Type**:
  - `SUM`: Add values together (useful for cumulative metrics like total users)
  - `AVG`: Calculate average (useful for rate metrics)
  - `MIN`: Show minimum value
  - `MAX`: Show maximum value
- **Missing Data Handling**: Real-world data collection isn't perfect. Your data pipeline might fail, your source system might have downtime, or you simply might not have data for weekends. Missing data handling tells Harness what to do with those gaps.
  - `Show previous value`: Carry forward the last known value. If there's no data for a day, use the last known value.
  - `Show as 0`: Fill gaps with zero. If there's no data for a day, assume the value was zero.
  - `Leave blank`: Don't fill gaps (not recommended). This simply skips that day in charts and calculations.

</TabItem>
<TabItem value="edit" label="Ingestion Method">

<DocImage path={require('./static/ingestion-one.png')} width="60%" height="60%" title="Click to view full size image" />

CACM supports three ways to ingest metric data:

1. **Invoke Ingestion API (Recommended for Automation)**: Use the REST API to programmatically send metric data from your systems. Gather the metric values from your internal systems (HRIS, billing, observability, etc.) and format them as JSON. Each API call sends data for one metric + one label combination.

    - **Create API Key**: Use your Harness API key in the x-api-key header. The key must have CACM metric write permissions.
    - **Execute CURL command to update metric data (PUT)**: Your screen shows the exact CURL command to run.
    
    **API Endpoint:**
    ```
    PUT https://app.harness.io/ccm/api/unit-metric?accountIdentifier={accountId}
    ```
2. **Upload .CSV/Paste JSON**: Upload CSV files or paste JSON data directly through the UI for quick imports or historical data loads.
    - **Upload .CSV**: Structure your CSV with one row per data point. Each row needs a timestamp and a numeric value. You may add an optional label column (e.g., by team). Granularity: daily or monthly. Max 10,000 rows per file.

    Expected format
    ```
    usageTimeStamp,value
    2025-02-01T00:00:00Z,12345
    2025-03-01T00:00:00Z,12389
    2025-04-01T00:00:00Z,11980
    ```

    With a label column (optional)
    ```
    usageTimeStamp,team,value
    2025-02-01T00:00:00Z,ccm,12345
    2025-02-01T00:00:00Z,ci,8920
    2025-03-01T00:00:00Z,ccm,12389
    ```
    The UI validates your CSV and reports errors for: Invalid header format, Missing or malformed timestamps, Non-numeric values, Future dates, Duplicate timestamps.

    <DocImage path={require('./static/ingestion-two.png')} width="60%" height="60%" title="Click to view full size image" />
    
    - **Paste JSON**: For quick testing or small datasets, paste JSON directly into the UI. Paste a JSON array of objects. Each object needs a timestamp and a numeric value. Add an optional label object if applicable.

    Expected format
    ```json
    [
        { "usageTimeStamp": "2025-02-01T00:00:00Z", "value": 12345 },
        { "usageTimeStamp": "2025-03-01T00:00:00Z", "value": 12389 },
        { "usageTimeStamp": "2025-04-01T00:00:00Z", "value": 11980 }
    ]
    ```
    
    With a label column (optional)
    ```json
    [
        { "usageTimeStamp": "2025-02-01T00:00:00Z", "labels": { "team": "ccm" }, "value": 12345 },
        { "usageTimeStamp": "2025-02-01T00:00:00Z", "labels": { "team": "ci" }, "value": 8920 }
    ]
    ```
    
    <DocImage path={require('./static/ingestion-three.png')} width="60%" height="60%" title="Click to view full size image" />

3. **Using Harness Pipelines**: Coming Soon.

</TabItem>
</Tabs>

----

## Viewing Unit Metrics


### Metrics List View

The main Cloud Integration page shows all your unit metrics in a table with:
- **Metric Name**: Click to view details
- **Labels**: Tag-based segmentation
- **Last Updated**: Timestamp of most recent data ingestion


### Metric Details Page

<DocImage path={require('./static/unit-cost-dashboard.png')} width="60%" height="60%" title="Click to view full size image" />

Each metric has a dedicated details page showing:

- **Metric Configuration**: Aggregation type, Missing data handling strategy, Last updated timestamp

- **Statistics Cards**: Total record count (with granularity), Date range coverage (with duration), Latest value, Average value (with min/max range)

3. **Metric Over Time Chart**: Time-series visualization of metric values with adjustable time range (default: last 6 months) 

## Editing and Managing Metrics

#### Edit Metric Configuration

You can update:
- Metric name
- Description
- Default aggregation type
- Missing data handling

**Note:** The metric identifier cannot be changed after creation.

<DocImage path={require('./static/edit.png')} width="60%" height="60%" title="Click to view full size image" />

#### Add Data to Existing Metrics

Use the "Add Data" button to append new records using any ingestion method:
- API: Send additional records via PUT request
- CSV: Upload new data files
- JSON: Paste additional data points

New data is automatically merged with existing records based on timestamps.
