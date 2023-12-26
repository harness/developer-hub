---
title: Use Dashboard Intelligence by AIDA
description: Learn how to use Dashboard Intelligence by AIDA to create dashboards.
sidebar_position: 30
---

Dashboard Intelligence by AIDA™ is your copilot for dashboard creation in Harness. This feature is available directly in the **Dashboard Editor** when you create or edit a dashboard.

This topic provides details on the current features, limitations, and best practices for dashboard engineering.

:::info note
Although the documentation is written in English and assumes an English-speaking user, Dashboard Intelligence by AIDA's natural language widget generation is not limited to English.

:::

### Before you begin

- [Dashboards overview](/docs/platform/dashboards/dashboards-overview)
- [Create Dashboards](/docs/platform/dashboards/create-dashboards)
- [Create visualizations and graphs](/docs/platform/dashboards/create-visualizations-and-graphs/)

### Supported query types

Dashboard Intelligence by AIDA currently supports three levels of Business Intelligence abstractions: quick queries, constrained queries, and custom queries.

#### Quick queries

Quick queries provide quick answers to high-level data questions. These queries include rollups and non-filtered interests, for example:
   - What are my total AWS costs?
   - What is my deployment failure rate?
   - How many of my feature flags are active?

#### Constrained queries

Constrained queries add filter constraints for deliberate answers. Constrained queries typically involve a time filter, for example:
   - What are my total AWS costs for project `qa-stage`? Filter for the past 45 days.
   - Show me my daily deployment success rate. Filter for the last 60 days.
   - What is my monthly build count by project. Filter for the last 90 days.

#### Custom queries

Custom queries involve custom fields. Currently, Dashboard Intelligence by AIDA only supports table calculations, for example: 
   - What are my total costs by region? Filter for the last 30 days. Include a table calculation returning yes if region is `us-west1`, else no.

### Supported visualization types

Dashboard Intelligence by AIDA infers the most relevant data visualization for the natural language query by default. If you want to bypass the inference and enforce an explicit visualization type, explicitly state the desired visualization type in your query. For example, “What is my monthly deployment count? Filter for the past 12 months. Make this a line chart.”

Harness currently supports the following visualization types:

**Charts**
- Bar
- Column
- Line
- Pie
- Scatterplot

**Tables**
- Single Value
- Table

:::info note
Dashboard Intelligence by AIDA does not currently support customizing visualization optics within the natural language query itself. This constraint includes titles, color preferences, and so on.

:::

## Best practices and guidelines for Dashboard Intelligence by AIDA

If you have trouble with a particular data point, pass both the view name and the field name in the prompt. For example, if you were trying to grab the “Count” field within the 

When constructing a query, it is important to avoid unnecessary information. The more concise and direct the query is, the better it will be. Avoid using irrelevant details and focus on the essential information that is required.

Do:

```
Project id, git repository, git event type, error message and failure rate. Filter for the last 72 days. Filter repository failure rate > 0. Make this a table.
```

Don’t:

```
Construct a detailed table for me that presents project id, git repository, git event type, error message and failure rate. This should be filtered for the last 72 days, and I would like to have the failure rate greater than 0.
```

Break your query into smaller, bite-sized sentences. Explicitly tell the agent your intentions (for example, filtering, pivots, table calculations, and so on) instead of chaining instructions into a single sentence.

Do:

```
Show me total costs. Pivot by region. Filter for the last 30 days. Include a table calculation returning yes if region is "us-west1" else no.
```

Don’t:

```
Show me total costs by region within the last 30 days with a table calculation returning yes if region is "us-west1" else no.
```

## Dashboard Intelligence by AIDA tips

- When you tell AIDA to plot something "by" another dimension, it enforces a pivot in the visualization. For example, you can say: "Show me total deployments by project."

- For table calculations or string filters, wrap the expression in double quotes, for example: Include a table calculation returning yes if region is "us-west1" else no.

- For number filters, use operators instead of words (for example, use “>” instead of “greater than”).
