---
title: Create widgets
description: Add data and text widgets to your Harness dashboards, configure queries, and customize visualizations.
sidebar_position: 4
keywords:
  - widgets
  - HQL
  - queries
  - filters
  - formatting
  - charts
  - data widget
  - text widget
tags:
  - Dashboards
---

import DocImage from '@site/src/components/DocImage';

## Overview

Widgets are the building blocks of a dashboard. Each widget displays a piece of information — either data from a query or static text that you type in. You can mix both types on the same dashboard to create a clear, organized view.

This topic explains how to add widgets, configure their data, and customize how they look.



## Step-by-step interactive guide - Create widgets 

The following video provides a complete walkthrough of creating a widget from start to finish.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/1ad3603c-109f-49e7-ac75-920a440cef78?narrationType=voice1"
    title="Create widgets manually"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div>

## Widget categories

There are two categories of widgets:

- **Data widgets:** Pull data from a data source and display it as a chart, table, number, or gauge. You configure what data to show by building a query.
- **Text widgets:** Display static text that you type in. Use them for titles, descriptions, notes, or any other context you want to add to the dashboard.

## Add a widget

To add a widget to your dashboard:

1. Open the dashboard and select **Edit** in the header to enter edit mode.
2. Select **New Widget**. The widget editor opens.

   At the top of the editor, you see a row of icons representing the available widget types. The first group of icons represents data widgets (Table, Metric, Donut, Single Value, Bar, Column, Line, Area, Scatter). The last icon represents the text widget.

3. Select a widget type. The editor updates to show the configuration options for that type.
4. Give the widget a name by editing the **New Widget** title at the top. You can also add a subtitle.
5. Configure the widget using the **Data** and **Customizations** tabs on the right side of the editor.
6. Select **Add Widget** to place the widget on your dashboard.

The widget appears on the dashboard grid. You can drag it to reposition it or resize it by dragging the bottom-right corner.

### Widget actions

In edit mode, each widget shows action icons when you hover over it:

- **Edit** (pencil icon) — Open the widget editor to change the query, type, or display settings. Available on data widgets only.
- **Clone** — Create an exact copy of the widget with the same configuration.
- **Delete** — Remove the widget from the dashboard.

Text widgets support **Clone** and **Delete** only. To change the text, select the text widget directly in edit mode.

### Data and Query

The **Data** tab is where you define what data the widget displays. The Query section lets you build a query to retrieve data. You can use the visual builder (default) or switch to the code editor.

#### Datasource

A datasource determines which data the widget can access. The following are examples; the full list depends on your RBAC permissions and the modules enabled in your account:

| Datasource | Description |
|------------|-------------|
| **CCM Cloud Costs Daily** | Daily cost data across AWS, Azure, and GCP cloud providers. |
| **CD Pipeline Execution Summary** | CD pipeline runs including status, duration, trigger type, branch, environment, and MTTR. |
| **CI Pipeline Execution Summary** | CI build runs including status, duration, trigger type, branch, and license tier. |
| **Universal Pipeline Executions** | Cross-module pipeline executions including status, duration, trigger, and policy violations. |
| **Licensing Billing Raw Events** | 15-minute billing event data with usage metrics at the org and account level. |
| **STO Security Scans** | Security scan results including vulnerabilities, severity, scan tool, and target. |
| **Artifact Registry** | Artifact registry metadata including artifacts, versions, and registry information. |
| **Organizations** | Organization-level metadata across all modules. |
| **Projects** | Project-level metadata across all modules. |

The list of available datasources depends on the modules enabled in your Harness account.

#### Select

After choosing a datasource, use the **Select** section to pick the columns (data points) you want to display. For each selected column, you can optionally choose an **Aggregation** (such as count, sum, average, min, or max) and an **Alias** to rename the column in the results.

Select **+ Select** to add more columns. You can add as many columns as you need, and they are combined when the widget is built.

#### Dashboard filters

The Dashboard Filters section shows any filters that are applied at the dashboard level. These filters pass variables to the widget query. For example, a **Time Range** filter with the field `window_start_time` and range `Last 1 Month` applies automatically to the widget.

#### Filter

Select **+ Filter** to add conditions that narrow down the results. For each filter, you select a field, a condition, and a value. The available conditions include:

- Equals
- Not equals
- Contains
- Not contains
- Greater than
- Less than
- Is null
- Is not null

You can add multiple filters and they are combined together.

#### Sort

Select **+ Sort** to order the results by a specific column. Choose the column, an optional aggregation, and the sort direction (**Ascending** or **Descending**).

#### Time field and variables

- **Time field:** Select the timestamp field used to filter data by time range (for example, `window_start_time` or `start_time`).
- **Variables:** Define query variables that make the widget dynamic. Variables can be referenced using `${variableName}` in the query.

### Code view

Next to the **Query** heading, there is a **Code View** toggle. Turn it on to switch from the visual builder to a code editor where you can write queries directly using Harness Query Language (HQL).

In code view, you can:

- Write HQL queries with full syntax support.
- Run the query to test the results.
- Use the **Format** button to clean up indentation.

Go to [Harness Query Language (HQL)](./harness-query-language.md) for the complete syntax reference.

:::info
You can switch between the visual builder and code view at any time. If you write a query in code view that uses features the visual builder does not support (such as JOINs or OR conditions), the builder displays a message indicating the query cannot be represented visually.
:::

## Filters

You can filter the data shown in your widgets at two levels: at the dashboard level (applies to all widgets) and at the widget level (applies to a single widget's query).

### Dashboard-level filters

When you open a dashboard in edit mode, a filter bar appears below the dashboard header. This bar lets you apply filters that affect all widgets on the dashboard at once.

The filter bar includes the following controls:

- **Variables** (curly braces icon) — View and manage query variables that are passed to all widgets.
- **Time range** (clock icon with a dropdown, for example `30d`) — Set a time range that applies to every widget. Widgets that reference a time field automatically use this range.
- **+ Add Filter** — Add a field-based filter that narrows down results across all widgets. You can filter by any field available in the datasource, using conditions such as equals, not equals, contains, and more.

Dashboard-level filters are useful when you want viewers to be able to change the time range or filter the entire dashboard without editing individual widgets.

### Widget-level filters

Inside the widget editor, the **Data** tab includes a **+ Filter** option within the query section. These filters apply only to the specific widget you are editing.

For each filter, you select a field, a condition, and a value. The available conditions include:

- Equals
- Not equals
- Contains
- Not contains
- Greater than
- Less than
- Is null
- Is not null

You can add multiple filters to a single widget. All filters are combined together when the query runs.

:::tip
Use dashboard-level filters for settings that viewers should be able to change (such as time range or environment). Use widget-level filters for conditions that should always apply to a specific widget regardless of the dashboard filters.
:::

## Customizations tab

The **Customizations** tab controls how the widget looks. The available settings depend on the widget type you selected.

### Table

| Setting | Description |
|---------|-------------|
| **Pagination** | Split large result sets into pages. |
| **Column Formatting** | Control how individual columns display values (timestamp format, number format). |

### Metric (Single Value)

| Setting | Description |
|---------|-------------|
| **Unit** | A text label shown after the number (for example, "req/s", "%"). |
| **Value Type** | How the number is formatted: Auto, Integer, Percentage, Duration, File Size, or Raw. |
| **Decimal Places** | Number of digits shown after the decimal point. |

### Donut

| Setting | Description |
|---------|-------------|
| **Categories** | The column that provides segment names. |
| **Value** | The column that provides the value for each segment. |
| **Color Column** | An optional column that determines segment colors. Select "None (use color palette)" to use the default colors. |
| **Show Center Total** | Display the total of all segments in the center of the donut. |
| **Center Title** | A label shown above the center total (for example, "Total"). |
| **Center Value Format** | How the center number is formatted (for example, "Auto (Number)"). |
| **Donut Alignment** | Horizontal position of the chart: Left, Center, or Right. |
| **Legend Position** | Where the legend appears: Bottom, Right, Top, Left, Auto, or Hidden. |
| **Show Tooltip on Hover** | Show the value and percentage when you hover over a segment. |

### Bar and Column

| Setting | Description |
|---------|-------------|
| **Series Mapping** | Which columns map to the X-axis and Y-axis. |
| **Legend Position** | Where the legend appears. |
| **Show X-axis / Show Y-axis** | Toggle the visibility of each axis. |
| **Stacking** | Stack multiple data series on top of each other instead of overlapping. |

### Line and Area

| Setting | Description |
|---------|-------------|
| **Series Mapping** | Which columns map to the X-axis and Y-axis. |
| **Legend Position** | Where the legend appears. |
| **Show X-axis / Show Y-axis** | Toggle the visibility of each axis. |
| **Line Style** | Solid or dashed lines. |

### Scatter

| Setting | Description |
|---------|-------------|
| **Series Mapping** | Which columns map to the X-axis and Y-axis. |
| **Legend Position** | Where the legend appears. |
| **Show X-axis / Show Y-axis** | Toggle the visibility of each axis. |

## HQL reference

For details on writing queries in code view, including the full list of operators, functions, and syntax, go to [Harness Query Language (HQL)](./harness-query-language.md).

### Common operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `service = "api"` |
| `!=` | Does not equal | `status != "success"` |
| `>`, `>=` | Greater than (or equal to) | `duration > 100` |
| `<`, `<=` | Less than (or equal to) | `duration <= 500` |
| `in` | Matches any value in a list | `service in ("api", "web")` |
| `contains` | Contains the specified text | `name contains "pay"` |
| `!contains` | Does not contain the specified text | `name !contains "test"` |
| `is null` | Has no value | `error is null` |
| `is not null` | Has a value | `error is not null` |

### Common functions

| Function | Description |
|----------|-------------|
| `count()` | Total number of records. |
| `sum(field)` | Total of all values in a field. |
| `avg(field)` | Average of all values. |
| `min(field)` | Smallest value. |
| `max(field)` | Largest value. |
| `distinct_count(field)` | Number of unique values. |
| `median(field)` | Middle value (50th percentile). |
| `p95(field)` | 95th percentile. |
| `p99(field)` | 99th percentile. |

## Value formatting

### Metric value types

| Type | Description | Example input | Example output |
|------|-------------|---------------|----------------|
| **Auto** | Detects the format and scales large numbers. | `1234` | `1.23K` |
| **Integer** | Whole number with automatic scaling. | `1234` | `1K` |
| **Decimal** | Fixed decimal places with comma separators. | `1234.5678` | `1,234.57` |
| **Percentage** | Number followed by a percent sign. | `99.5` | `99.5%` |
| **Duration** | Converts milliseconds to readable time. | `3661000` | `1h 1m 1s` |
| **File Size** | Converts bytes to readable file size. | `1048576` | `1 MB` |
| **Date** | Converts epoch milliseconds to a formatted date. | `1704067200000` | `Jan 1, 2024` |
| **Raw** | Exact number with no formatting. | `1234.5678` | `1234.5678` |

### Column formatting for tables

| Format | Description |
|--------|-------------|
| **Locale** | Browser's local date and time format. |
| **UTC** | Coordinated Universal Time. |
| **ISO** | ISO 8601 format (for example, `2024-01-15T14:30:00Z`). |
| **Raw** | Raw numeric value without conversion. |

## Troubleshooting

### Widget shows "No Data"

- **Test the query:** Open the widget in edit mode and run the query in code view to check for results.
- **Check field names:** Make sure the selected columns exist in the chosen datasource.
- **Review filters:** Check both dashboard-level and widget-level filters. Try removing filters one at a time to identify the issue.
- **Check the time range:** Make sure the time range covers a period that has data.

### Query errors

- **Read the error message:** The editor highlights the problem and shows a description.
- **Check field names:** Field names are case-sensitive.
- **Match select and group_by:** If you use an aggregation function in your select, every non-aggregated field must also appear in the group by section.
- **Check variables:** Make sure each `${variableName}` is defined and has a value.

## Next steps

- [Dashboards overview](./overview.md) — Browse and manage your dashboards.
- [AI-assisted dashboards](./ai-assisted-dashboard.md) — Create widgets using plain language instead of manual configuration.
- [Harness Query Language (HQL)](./harness-query-language.md) — Full query syntax reference.
