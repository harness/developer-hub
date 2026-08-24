---
title: Custom Cost Provider
sidebar_label: Custom Cost Provider
description: Bring cost data from third-party vendors into Cloud & AI Cost Management using the FOCUS CSV format.
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/cloud-cost-management/get-started/onboarding-guide/external-data-ingestion
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';

The Custom Cost Provider lets you bring cost data from any third-party vendor, such as SaaS tools, data centers, or cloud resellers, into Cloud & AI Cost Management (CACM). Once ingested, the data appears alongside your cloud and AI costs in Cost Explorer, Perspectives, Budgets, and Cost Categories.

You upload cost data in the [FOCUS](https://focus.finops.org/what-is-focus/) CSV format — a standard billing schema that maps any vendor's data into a consistent structure CACM can process.

---

## Before You Begin

- A Harness account with Cloud & AI Cost Management enabled.
- Cost data from your vendor exported as a CSV file. Go to [Report Format](#report-format) to review the required fields.
- File size limit: 20 MB per upload. Split larger files before uploading.

---

## Add a Custom Cost Source

1. In Harness, go to **Cloud & AI Cost Management** > **Account Settings** > **Integration for cloud & AI cost**.
2. Select the **External Cost Data Sources** tab.
3. Click **+ Create New**.
4. Fill in the required details and upload your FOCUS CSV file.
5. Click **Finish**. Ingestion starts immediately and data is usually available within a few minutes.

---

## Supported Features

| Feature | Supported |
|---|---|
| Perspectives | ✅ |
| Budgets | ✅ |
| Cost Categories | ✅ |
| Dashboards | ✅ |
| Anomalies | Coming soon |
| Granular RBAC | Coming soon |
| Audit Trail | Coming soon |

:::note Dashboard support means Unified explore fields
Dashboard support for external cost data means ingested rows are queryable through the **Unified** data source in BI Dashboards Explore, not that an existing out-of-the-box dashboard automatically adds rows from a new source. Out-of-the-box dashboards built against cloud-provider fields don't reference a source you add later. To see external data in a dashboard, build or edit a widget, select the **Unified** tab, and choose fields from there. Go to [CACM Explore](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/ccm-explore) to see the full list of available Unified fields.
:::

---

## Report Format

All uploads must follow the [FOCUSv1 specification](https://focus.finops.org/wp-content/uploads/2024/11/FOCUS-spec-v1_1.pdf). The following fields are mandatory.

| Field | Description | Requirements |
|---|---|---|
| **BillingAccountId** | Provider-assigned identifier for a billing account. | MUST be present, type String, no nulls, globally unique within a provider. |
| **BillingAccountName** | Display name for the billing account. | MUST be present, type String. MUST NOT be null when the provider supports display names. |
| **BillingPeriodStart** | Inclusive start date and time of the billing period. Example: `2024-01-01T00:00:00Z`. | MUST be present, type Date/Time, inclusive, no nulls. Must match invoice month on upload. |
| **BillingPeriodEnd** | Exclusive end date and time of the billing period. Example: `2024-02-01T00:00:00Z`. | MUST be present, type Date/Time, exclusive, no nulls. |
| **ChargeCategory** | Highest-level classification of the charge. | MUST be present, no nulls. Allowed values: `Usage`, `Purchase`, `Tax`, `Credit`, `Adjustment`. |
| **ChargePeriodStart** | Inclusive start date and time of the charge period. | MUST be present, type Date/Time, inclusive, no nulls. |
| **ChargePeriodEnd** | Exclusive end date and time of the charge period. | MUST be present, type Date/Time, exclusive, no nulls. |
| **ConsumedQuantity** | Volume of a metered SKU consumed. | See [FOCUSv1 spec](https://focus.finops.org/wp-content/uploads/2024/11/FOCUS-spec-v1_1.pdf) for details. |
| **EffectiveCost** | Amortized cost after discounts and prepaid purchases. | MUST be present, type Decimal, no nulls. MUST be 0 when ChargeCategory is "Purchase" covering future charges. |
| **ProviderName** | Entity that makes resources or services available. | MUST be present, type String, no nulls. Should match the `ProviderType` used when setting up the integration. |
| **RegionName** | Display name for the geographic area where the resource is provisioned. | MUST be present when the provider supports regions. Type String. MAY be null when the resource is not region-specific. |
| **ResourceId** | Identifier assigned to a resource by the provider. | MUST be present when the provider bills by resource. Type String. MAY be null when a row is not associated with a resource. |
| **ServiceName** | Display name for a purchasable offering (for example, a cloud VM or SaaS database). | MUST be present, type String, no nulls. |
| **SkuId** | Unique identifier for a SKU. | MUST be present when the provider publishes a SKU list. Type String. MUST NOT be null for Usage or Purchase charges (unless ChargeClass is "Correction"). |
| **SubAccountId** | Provider-assigned identifier for a sub account. | MUST be present when the provider supports sub accounts. Type String. Null if the charge does not apply to a sub account. |
| **SubAccountName** | Display name for a sub account. | MUST be present when the provider supports sub accounts. Type String. Null if the charge does not apply to a sub account. |
| **Tags** | Tags assigned to tag sources for cost allocation. | See [FOCUSv1 spec](https://focus.finops.org/wp-content/uploads/2024/11/FOCUS-spec-v1_1.pdf) for details. |

:::note
For the complete specification, go to [FOCUSv1 Specification](https://focus.finops.org/wp-content/uploads/2024/11/FOCUS-spec-v1_1.pdf).
:::

---

## FAQ

<FAQ
  question="Are default Perspectives created automatically after upload?"
  mode="docs"
  fallback="Yes. Default Perspectives are created as soon as ingestion completes, usually within a few minutes of clicking Finish."
/>

<FAQ
  question="Which group-by options and filters are supported for custom cost data?"
  mode="docs"
  fallback="Custom cost data supports the same group-by and filter options as cloud cost data in Perspectives and Cost Explorer, including service, region, billing account, and any tags present in the uploaded file."
/>

<FAQ
  question="How long does it take for uploaded data to appear?"
  mode="docs"
  fallback="Ingestion starts immediately when you click Finish. Depending on file size, data is usually available within a few minutes."
/>

<FAQ
  question="My file is larger than 20 MB. What should I do?"
  mode="docs"
  fallback="Split the file into multiple CSV files under 20 MB each using a CSV splitting tool, then upload them separately."
/>

<FAQ
  question="My external data source shows up in Perspectives, but rows don't appear in a Unified BI Dashboard widget. Why?"
  mode="docs"
  fallback="Perspectives and the Unified dashboard explore query ingested data differently. Confirm the widget itself was built or edited by selecting fields from the Unified explore tab rather than a cloud-provider-specific tab, since out-of-the-box dashboards don't automatically reference a source added after they were built. If a widget already scoped to Unified still doesn't show the row, check that every mandatory FOCUS field in your upload is valid, in particular ChargeCategory (must be one of Usage, Purchase, Tax, Credit, or Adjustment) and ChargePeriodStart/ChargePeriodEnd (must be ISO-conformant per the FOCUS spec)."
/>

<FAQ
  question="I uploaded a file but data has not appeared after 10 minutes."
  mode="fallback-only"
  fallback="Contact Harness Support at https://support.harness.io with your account ID and the file details."
/>
