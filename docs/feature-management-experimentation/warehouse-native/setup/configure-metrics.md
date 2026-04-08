---
title: Configuring Metric Sources for Warehouse Native Experimentation
description: Learn how to configure your metric source tables in your data warehouse for Warehouse Native Experimentation.
sidebar_label: Configure Metric Sources
sidebar_position: 4
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native Experimentation is GA!"
  tagline="Run Harness FME experiments directly in your data warehouse. Contact Sales or your account manager to enable access."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Metric Source defines where Harness FME reads metric and outcome data used to evaluate experiment results from your data warehouse.

When creating or editing a <Tooltip id="fme.warehouse-native.metric-source">Metric Source</Tooltip>, navigate to the **Metrics** page from the FME navigation menu and click the **Metric Sources** tab. Then, click **+ Create metric source**.

* **Name**: Enter a name for the metric source.
* **Owners**: Assign one or more owners to make clear who is responsible for maintaining the metric source.
* **Description**: Enter a description for the metric source.

To define the metric source table, select **Table name** or **SQL query** in the `Source table` section. 

<Tabs>
<TabItem value="table" label="Table Name">

### Select a table

:::info
Recommended if your event data is already modeled into a clean event table.
:::

1. Select an existing table name directly from the schema.
1. Click **Test connection** to validate that Harness can query the table successfully before continuing.


</TabItem>
<TabItem value="query" label="SQL Query">

### Use a custom SQL query

:::info
Recommended for light data transformations (e.g., extracting values from JSON), joins across multiple tables, or filtering by event type.
:::

You must have permissions to access all tables referenced in your query, based on the role and credentials configured when setting up your warehouse connection.

1. Write a SQL query that outputs the required fields.
1. After entering your query, click **Run query** to validate and preview results before proceeding.

</TabItem>
</Tabs>

After setting up Metric Sources, you can create metric definitions to aggregate event data by type (i.e., count, sum, or average). With Metric Sources configured, your metrics remain consistent, standardized, and reusable across experiments and analyses.

Harness shows a preview of the data returned from your table so you can validate that the expected rows and columns are present.

### Configure your environments

<Tabs groupId="mapping-values">
<TabItem value="column" label="Column Mapping">

Select an environment column and map its values to Harness FME environments.

For example, select the `ENV_NAME` column and map its values (`US-Prod`, `UK-Prod`) to your Harness project’s `Production` environment and map the `Stg` values (`US-Stg`, `UK-Stg`) to your Harness project’s `Staging` environment.

This is recommended if a single metric source spans multiple environments.

</TabItem>
<TabItem value="value" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME environment for the entire Metric Source (e.g., always `Production`).

This is recommended if the source is scoped to one environment.

</TabItem>
</Tabs>

### Configure your traffic types

Similar to environments, traffic types can be set up in two ways:

<Tabs groupId="mapping-values">
<TabItem value="column" label="Column Mapping">

Select a traffic type column (e.g., `ttid`) and map its values to Harness FME traffic types (e.g., `user`, `account`, or `anonymous`).

This is recommended if the same Metric Source covers multiple population types.

</TabItem>
<TabItem value="value" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME traffic type for the entire Metric Source (e.g., always `account`).

This is recommended if the data set only represents one population type.

</TabItem>
</Tabs>

### Configure events

Metric Sources allow flexibility in how event types are set up.

<Tabs groupId="mapping-values">
<TabItem value="column" label="Column Mapping">

Select an event type column (e.g., `EVENT_NAME`) so the metric source can be reused across multiple metric definitions.

This is recommended for general-purpose event sources.

</TabItem>
<TabItem value="value" label="Hardcoded Value">

Instead of selecting a column, set a fixed event name for the entire metric source (e.g., always `product_page_view`).

This is recommended if the source is meant to be tightly scoped to a single event.

</TabItem>
</Tabs>

For each Metric Source, the following fields are required:

| Field | Description |
|---|---|
| Key | A unique identifier that matches the key in the associated Assignment Source. This allows Harness FME to join exposures and metrics correctly. |
| Timestamp | The timestamp when the event occurred. This is used to calculate metric values over time. |

:::info Event Value (optional)
If you plan to create **Sum** or **Average** metrics from this metric source, map an **Event Value** column that contains numeric data (for example, `page_load_time_seconds` or `order_value`). The **Event Value** field is optional and is only used for sum or average metrics.
:::

### Add custom fields

Click **+ Add new custom field** to map any additional columns from your metric source that are not included in the required fields section.  

1. Select a column from the dropdown menu.  
2. Enter a label for the field.  
3. Click **Save**.

Custom fields can later be used to [filter data when creating metrics](/docs/feature-management-experimentation/warehouse-native/setup/metrics#calculation-logic). Common examples include `PLAN_TIER`, `DEVICE`, and `COUNTRY`.

## Manage metric sources

In order to maintaining general-purpose reusable sources while also creating custom sources for sensitive or high-volume use cases, you can adopt a hybrid approach:

* Reusable, standardized sources are recommended if you want one source to power many metric definitions (e.g., a general events table with filtering by event type).
* Custom sources are useful if you want to tightly scope data for privacy, relevancy, or performance.

Once you've set up the metric sources that best fit your workflow, you can manage them directly in Harness FME. 

- **Edit**: Update the query, mappings, or field configuration to align with schema changes in your warehouse. Changes may disrupt metrics or experiments relying on this source.
- **Delete**: Remove unused or invalid sources to prevent accidental use. Before deletion, confirm no metric definitions depend on the source.

## Troubleshooting

If you encounter issues when configuring a Metric Source:

<details>
<summary>Test Connection or Run Query Fails</summary>

1. Ensure the table or query is valid and accessible with your warehouse connection credentials.
1. Verify that schemas and table names are spelled correctly.
</details>

<details>
<summary>No Data Appears in Preview</summary>

1. Confirm the query/table returns rows for the event(s) you expect.
1. If you are using event filtering in SQL, test the query directly in your warehouse.
</details>

<details>
<summary>Missing Columns</summary>

Verify that the required fields exist and are returned by your query.
</details>

<details>
<summary>Timestamp Format Issues</summary>

Event timestamps can be provided in **epoch milliseconds** (numeric) or in a **timestamp/datetime** format.  

If you are using epoch values (e.g., `EVENT_TIMESTAMP_MS`), there is no need to convert them in your SQL query; Harness FME can handle both formats directly.
</details>

<details>
<summary>Incorrect Environment/Traffic Type Mapping</summary>

1. Check that each warehouse value is mapped to the intended Harness environment or traffic type.
1. Use hardcoded values if everything should map to a single option.
</details>

<details>
<summary>Unable to Delete Source</summary>

Check which metric definitions are currently using it. Delete or reassign those metrics before removing the source.
</details>