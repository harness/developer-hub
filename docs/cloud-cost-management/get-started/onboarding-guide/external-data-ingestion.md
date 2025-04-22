---
title: External Cost Data Ingestion (Beta)
description: This topic describes how to set up External Cost Data Sources
# sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

External Cost Data Ingestion allows users to bring cost data from third-party vendors  such as Mongo, Snowflake, etc., into Harness Cloud Cost Management (CCM). This allows users to see unified visibility and analysis across their cloud and external spend. Instead of managing these costs in spreadsheets or siloed tools, users can now consolidate them in Harness CCM for a single source of truth across all the cloud and non-cloud spend.

Harness provides a standard CSV-based ingestion format, called [FOCUS](https://focus.finops.org/what-is-focus/), which allows you to map any third-party billing data into a consistent structure. Once uploaded, Harness ingests, validates, and processes the data, automatically generating default Perspective so you can immediately begin analyzing costs, tracking budgets, and organizing spend by teams, business units, or environments.

:::info
Note: This feature is currently in early access and behind  `CCM_EXTERNAL_DATA_INGESTION` feature flag. Please reach out to our support team to enable it.
:::

## Why Use External Cost Data Ingestion?

Organizations today operate in increasingly complex environments where teams also rely on:

- SaaS services
- Cloud resellers or channel partners
- Hybrid infrastructure vendors, etc.

These external vendors often provide cost and usage data outside of traditional cloud billing APIs, typically in formats like CSVs, PDFs, or through emailed invoices. Without a native integration or ingestion capability, cost data from these vendors becomes hard to manage making it hard to get a complete view of the total cloud + third-party spend, allocate external costs back to teams, include vendor costs in budgeting, reporting, and forecasting, etc.

Without a centralized way to ingest and normalize this data, teams are forced to rely on manual spreadsheets, inaccurate or incomplete reports, which leads to delayed insights. 

External Cost Data Ingestion in Harness CCM solves this by allowing users to upload cost data in a standardized CSV format (FOCUS). Once ingested, Harness treats this data just like native cloud costs enabling you to:

- Analyze external spend with Perspectives
- Set Budgets and Alerts on vendor costs
- Organize costs by projects, environments, or cost categories
- Visualize insights quickly (time to value is typically under 10 minutes)

### Supported Features

The following CCM features are supported with external cost data:

✅ Perspectives

✅ Budgets

✅ Cost Categories

✅ Dashboards

**Coming Soon: Anomalies, Audit Trails, Granular RBAC, and more in future releases.**

## Steps to add External Cost Data Sources

Step 1: Navigate to "Account Settings" in the navigatation bar. Then click on "External Data Sources".
Step 2: Click on "+Create New". 

![](./static/step-one-external.png)
 
Step 3: Users will be asked to asked to fill in necessary details as shown below:

![](./static/step-two-external.png)
![](./static/step-three-external.png)

## Report Format

To ensure smooth and consistent ingestion of external data into our system, we require all incoming reports to follow the `FOCUSv1` specification for report formatting. Your report must include the following mandatory fields:

| FOCUSv1 Field         | Comments                                                                 | Description                                                                                                                                                                                                 |
|-----------------------|--------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BillingAccountId      |                                                                          | The identifier assigned to a billing account by the provider. Example: `509679112041`.                                                                                                                      |
| BillingAccountName    |                                                                          | The display name assigned to a billing account. Example: `harness-aws-ct-master`.                                                                                                                           |
| BillingPeriodStart    | Must match invoice month during upload                                   | The inclusive start date and time of a billing period. Equivalent to AWS `billingperiodstartdate`. Must be in UTC and formatted using ISO 8601 standard.                                                   |
| BillingPeriodEnd      | Equivalent to AWS `billingperiodenddate`                                 | The exclusive end date and time of a billing period. Must be in UTC and formatted using ISO 8601 standard to ensure consistency across time zones.                                                         |
| ChargeCategory        | Must be one of: Usage, Purchase, Tax, Credit, Adjustment                 | Represents the highest-level classification of a charge based on the nature of how it is billed.                                                                                                            |
| ChargePeriodStart     | Equivalent to usage start date                                           | The inclusive start date and time within a charge period. Must be in ISO 8601 format.                                                                                                                       |
| ChargePeriodEnd       | Equivalent to usage end date                                             | The exclusive end date and time of a charge period. Must be in ISO 8601 format.                                                                                                                             |
| ConsumedQuantity      |                                                                          | The amount of a given SKU consumed, based on the unit specified (e.g., hours, GB).                                                                                                                          |
| EffectiveCost         |                                                                          | The final cost after applying discounts, credits, and amortization of any prepaid purchases.                                                                                                                |
| ProviderName          | Should match the `ProviderType` used when setting up the integration     | The name of the entity that made the resources or services available for purchase.                                                                                    |
| RegionName            |                                                                          | The name of the geographic region where the resource is provisioned or the service is provided.                                                                                                             |
| ResourceId            |                                                                          | A unique identifier assigned to the resource by the provider.                                                                                                                                                |
| ServiceName           |                                                                          | An offering that can be purchased from a provider (e.g., cloud virtual machine, SaaS database, professional services from a systems integrator).                                                          |
| SkuId                 |                                                                          | A unique identifier that defines a provider-supported construct for organizing properties that are common across one or more SKU Prices.                                                                                           |
| SubAccountId          |                                                                          | The identifier assigned to a sub-account or grouping of services/resources, often used for cost or access management. Example: `759984737373`.                                                             |
| SubAccountName        |                                                                          | A name assigned to a grouping of resources or services, often used to manage access and/or cost. Example: `harness-aws-sales`.                                                                                                                 |
| Tags                  |     | JSON type. The set of tags assigned to tag sources that account for potential provider-defined or user-defined tag evaluations.                                |



### FAQs:
Q: Which FeatureFlag needs to be enabled ?

A: `CCM_EXTERNAL_DATA_INGESTION``

Q: When this is going GA ?

A: Dates are not confirmed yet. We expect early/mid Q2 as the GA date.

Q: Are there default perspectives for this ?

A: Yes. The perspectives are created right after user clicks on finish and ingestion is completed. Reducing the time to value to few minutes.
![](./static/faq-one.png)

Q: What all "Group Bys" or filters are supported?

A: ![](./static/faq-two.png)
 
Q: How long does it take for data to be available once we upload ?

A: After upload, when we click on finish, the ingestion gets triggered right away. Depending on the file sizes for that invoice period, this can take couple minutes or more. 

Q: What all features supported on external cost data ?

A: Perspectives, Budgets, CostCategories, Dashboards are only supported features in this release. We will add more support in future releases. Anomaly,  Granular RBAC, Audit Trail etc. are some of those.

Q: What is the time to value ?

A: The time to value reduces significantly with this feature. From once a day in case of Cloud to under 10 minutes to visualize and consume the data.

Q: I uploaded the file, but data is not showing up its been more than 10 minutes. 

A: This needs to be looked into by backend team. Please cut a ticket.

Q: My file sizes are more than 20MB. What should I do ?

A: Its advisable to keep the file sizes under 20MB. Tools to split into multiple CSVs can be used as well. In future, we might increase the limit. 

Q: What are other system limits ?

A: Currently, no limits on number of files per invoice period, no limits on number of files per provider or account, no limits on concurrent uploads.
