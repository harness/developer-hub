---
title: Setup
description: Learn how to set up assignment and metric sources to run FME experiments in your data warehouse using Warehouse Native.
sidebar_label: Setup
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

This page explains how to prepare your assignment and metric source tables, configure assignment and metric sources, and defining your metrics and experiments.

* An **assignment source** defines how Harness FME should read impression/exposure events from your data warehouse and map them to experiments. It ensures that users are correctly assigned to treatments, environments, and traffic types, enabling accurate metric analysis across experiments.
* A **metric source** defines how Harness FME reads and interprets raw event data from your warehouse. It ensures that metric events are correctly captured, timestamped, scoped to environments and traffic types, and made available for metric definitions.

## Prepare assignment and metric source tables

* For assignment sources, see [Preparing Assignment Source Tables](/docs/feature-management-experimentation/warehouse-native/setup/assignment-sources).
* For metric sources, see [Preparing Metric Source Tables](/docs/feature-management-experimentation/warehouse-native/setup/metric-sources).

## Configure an assignment source

When creating or editing an Assignment Source in the Harness FME UI, you have two options for defining the assignment source table: **Table name** or **SQL query**. 

<Tabs>
<TabItem value="1" label="Table Name">

### Select a table

:::info
Recommended if your data is already modeled into a clean impression/exposure table.
:::

1. Select an existing table name directly from the schema.
1. Click **Test connection** to validate that Harness can query the table successfully before continuing.

With Assignment Sources configured, you can can confidently create experiments, knowing all exposures are correctly captured, standardized, and reusable across analyses.

</TabItem>
<TabItem value="2" label="SQL Query">

### Use a custom SQL query

:::info
Recommended for light data transformations (e.g., extracting values from JSON), joins across multiple tables, or scoping to a subset of data.
:::

You must have permissions to access all tables referenced in your query, based on the role and credentials configured when setting up your warehouse connection.

1. Write a SQL query that outputs the required fields.
1. After entering your query, click **Run query** to validate and preview results before proceeding.

</TabItem>
</Tabs>

Harness FME will preview the query output so you can confirm the correct fields are returned.

## Add field mappings

Define the following fields from your assignment source to Harness FME:

| Field | Description |
|---|---|
| Unique Identifier | Maps to the column representing the unique key for user, account, or entity. |
| Impression Timestamp | Maps to the column representing when the user was assigned to a treatment. |
| Treatment | Maps to the column that stores the treatment or experiment variant (e.g., `control`, `variant_a`). |

### Configure your environments

<Tabs>
<TabItem value="3" label="Column Mapping">

Select an environment column and map its values to Harness FME environments.

For example, select the `ENV_NAME` column and map its values (`US-Prod`, `UK-Prod`) to your Harness project’s `Production` environment and map the `Stg` values (`US-Stg`, `UK-Stg`) to your Harness project’s `Staging` environment.

This allows a single Assignment Source to span multiple environments.

</TabItem>
<TabItem value="4" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME environment for the entire Assignment Source (e.g., always `Production`).

This is recommended if the entire source table is scoped to one environment.

</TabItem>
</Tabs>

### Configure your traffic types

Similar to environments, traffic types can be set up in two ways:

<Tabs>
<TabItem value="5" label="Column Mapping">

Select a traffic type column (e.g., `ttid`) and map its values to Harness FME traffic types (e.g., `user`, `account`, or `anonymous`).

This is recommended if the same Assignment Source covers multiple population types.

</TabItem>
<TabItem value="6" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME traffic type for the entire Assignment Source (e.g., always `account`).

This is recommended if the entire source table is scoped to one population type.

</TabItem>
</Tabs>

### Additional configuration options

* **Preview data**: Harness shows a preview of the data returned from your table or query so you can validate that the expected rows and columns are present.
* **Owners**: Assign one or more owners to make clear who is responsible for maintaining the Assignment Source.
* **Tags**: Add tags (e.g., by team, environment, or use case) to make sources easier to discover and organize.

## Manage assignment sources

Assignment Sources can be reusable and standardized, or tailored to individual experiments depending on your organization’s needs:

* Reusable, standardized sources are recommended if you have a general impressions/exposures table.

  This approach makes setup faster and consistent across teams. Be mindful of potential query processing speed and warehouse costs when working with very large shared tables.

* Custom per-experiment sources are recommended if you want to scope data more tightly for privacy, relevancy, or performance.

  Limits experiment creators to a specific subset of data, reducing query volume and potential data access concerns.

Ultimately, it’s up to your organization whether to centralize around a single reusable source or create smaller, experiment-specific sources. Many teams use a mix of both strategies depending on scale and governance needs.

Once you've set up the assignment sources that best fit your workflow, you can manage them directly in Harness FME. 

* **Edit**: You can update the table reference, query, or mappings as your data model evolves. Changes to an existing Assignment Source may disrupt any experiments that are actively using it.
* **Delete**: Remove outdated or misconfigured sources to reduce clutter and prevent accidental use.

## Configure a metric source

Metric Sources are building blocks: once created, you can reuse them to define consistent, standardized metrics across multiple experiments.

When creating or editing a Metric Source, you have two options for defining the metric source table: **Table name** or **SQL query**. 

<Tabs>
<TabItem value="1" label="Table Name">

### Select a table

:::info
Recommended if your event data is already modeled into a clean event table.
:::

1. Select an existing table name directly from the schema.
1. Click **Test connection** to validate that Harness can query the table successfully before continuing.


</TabItem>
<TabItem value="2" label="SQL Query">

### Use a custom SQL query

:::info
Recommended for light data transformations (e.g., extracting values from JSON), joins across multiple tables, or filtering by event type.
:::

You must have permissions to access all tables referenced in your query, based on the role and credentials configured when setting up your warehouse connection.

1. Write a SQL query that outputs the required fields.
1. After entering your query, click **Run query** to validate and preview results before proceeding.

</TabItem>
</Tabs>

Harness FME will show a data preview so you can confirm the expected fields are returned.

After setting up Metric Sources, you can create metric definitions to aggregate event data by type (i.e., count, sum, or average).

### Configure your environments

<Tabs>
<TabItem value="7" label="Column Mapping">

Select an environment column and map its values to Harness FME environments.

For example, select the `ENV_NAME` column and map its values (`US-Prod`, `UK-Prod`) to your Harness project’s `Production` environment and map the `Stg` values (`US-Stg`, `UK-Stg`) to your Harness project’s `Staging` environment.

This is recommended if a single metric source spans multiple environments.

</TabItem>
<TabItem value="8" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME environment for the entire Metric Source (e.g., always `Production`).

This is recommended if the source is scoped to one environment.

</TabItem>
</Tabs>

### Configure your traffic types

Similar to environments, traffic types can be set up in two ways:

<Tabs>
<TabItem value="9" label="Column Mapping">

Select a traffic type column (e.g., `ttid`) and map its values to Harness FME traffic types (e.g., `user`, `account`, or `anonymous`).

This is recommended if the same Metric Source covers multiple population types.

</TabItem>
<TabItem value="10" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME traffic type for the entire Metric Source (e.g., always `account`).

This is recommended if the data set only represents one population type.

</TabItem>
</Tabs>

### Configure events

Metric Sources allow flexibility in how event types are set up.

<Tabs>
<TabItem value="11" label="Column Mapping">

Select an event type column (e.g., `EVENT_NAME`) so the metric source can be reused across multiple metric definitions.

This is recommended for general-purpose event sources.

</TabItem>
<TabItem value="12" label="Hardcoded Value">

Instead of selecting a column, set a fixed event name for the entire metric source (e.g., always `product_page_view`).

This is recommended if the source is meant to be tightly scoped to a single event.

</TabItem>
</Tabs>

### Additional configuration options

* **Preview data**: Harness shows a preview of the data returned from your table so you can validate that the expected rows and columns are present.
* **Owners**: Assign one or more owners to make clear who is responsible for maintaining the Metric Source.
* **Tags**: Add tags (e.g., by team, environment, or use case) to make sources easier to discover and organize.

## Manage metric sources

In order to maintaining general-purpose reusable sources while also creating custom sources for sensitive or high-volume use cases, you can adopt a hybrid approach:

* Reusable, standardized sources are recommended if you want one source to power many metric definitions (e.g., a general events table with filtering by event type).
* Custom sources are useful if you want to tightly scope data for privacy, relevancy, or performance.

Once you've set up the metric sources that best fit your workflow, you can manage them directly in Harness FME. 

- **Edit**: Update the query, mappings, or field configuration to align with schema changes in your warehouse. Changes may disrupt metrics or experiments relying on this source.
- **Delete**: Remove unused or invalid sources to prevent accidental use. Before deletion, confirm no metric definitions depend on the source.

## Create and run experiments

Once you've configured assignment and metric sources in Harness FME, you can create [metrics](/docs/feature-management-experimentation/warehouse-native/metrics/) and start running [experiments](/docs/feature-management-experimentation/warehouse-native/setup/experiments) in your data warehouse. For more information, see [Create a metric](/docs/feature-management-experimentation/warehouse-native/setup/metric-sources/).

## Troubleshooting

### Assignment sources

If you encounter issues when configuring an Assignment Source:

<details>
<summary>Test Connection or Run Query Fails</summary>

1. Ensure your table or SQL query is valid and accessible with the credentials tied to your warehouse connection.

1. Check that you have permission to query all referenced schemas/tables.

1. Verify that the schema and table names are spelled correctly.
</details>

<details>
<summary>No Data Appears in Preview</summary>

If you are using a SQL query, try running it directly in your warehouse to confirm output.

</details>

<details>
<summary>Column Not Detected or Missing</summary>

Verify that your source table/query outputs the required columns: unique identifier, timestamp, and treatment.
</details>

<details>
<summary>Incorrect Environment or Traffic Type Mapping</summary>

1. Double-check that each warehouse value (e.g., `UK-Prod`) is mapped to the correct Harness environment (e.g., `Production`).
1. If everything should map to one environment or type, consider using the hardcoded value option instead of column mapping.
</details>

<details>
<summary>Assignment Source Not Showing in Experiment Setup</summary>

1. Make sure you clicked **Save** after configuration.
1. Confirm that the source hasn’t been deleted, disabled, or restricted to owners only.
</details>

### Metric sources

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

Ensure event timestamps are in a supported `TIMESTAMP` or `DATETIME` format.

If you are using epoch values (e.g., `EVENT_TIMESTAMP_MS`), convert them in your SQL query.
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
