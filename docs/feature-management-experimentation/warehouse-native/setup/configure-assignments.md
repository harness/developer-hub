---
title: Configuring Assignment Sources for Warehouse Native Experimentation
description: Learn how to configure your assignment source tables in your data warehouse for Warehouse Native Experimentation.
sidebar_label: Configure Assignment Sources
sidebar_position: 3
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

When creating or editing an Assignment Source in the Harness FME UI, you have two options for defining the assignment source table: **Table name** or **SQL query**. 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="table" label="Table Name">

### Select a table

:::info
Recommended if your data is already modeled into a clean impression/exposure table.
:::

1. Select an existing table name directly from the schema.
1. Click **Test connection** to validate that Harness can query the table successfully before continuing.

With Assignment Sources configured, you can can confidently create experiments, knowing all exposures are correctly captured, standardized, and reusable across analyses.

</TabItem>
<TabItem value="query" label="SQL Query">

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

<Tabs groupId="mapping-values">
<TabItem value="column" label="Column Mapping">

Select an environment column and map its values to Harness FME environments. For example, select the `ENV_NAME` column and map its values (`US-Prod`, `UK-Prod`) to your Harness project’s `Production` environment and map the `Stg` values (`US-Stg`, `UK-Stg`) to your Harness project’s `Staging` environment.

This allows a single Assignment Source to span multiple environments.

</TabItem>
<TabItem value="value" label="Hardcoded Value">

Instead of selecting a column, set a fixed Harness FME environment for the entire Assignment Source (e.g., always `Production`).

This is recommended if the entire source table is scoped to one environment.

</TabItem>
</Tabs>

### Configure your traffic types

Similar to environments, traffic types can be set up in two ways:

<Tabs groupId="mapping-values">
<TabItem value="column" label="Column Mapping">

Select a traffic type column (e.g., `ttid`) and map its values to Harness FME traffic types (e.g., `user`, `account`, or `anonymous`).

This is recommended if the same Assignment Source covers multiple population types.

</TabItem>
<TabItem value="value" label="Hardcoded Value">

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

## Troubleshooting

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