---
title: BI Dashboards
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Overview
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

BI Dashboards are a collection of charts and data tables with filters that you can use to get at the data you are interested. BI Dashboards serve as a platform for data modeling and analytics using a combination of available business metrics and operational data. You can use this data to make data-driven, informed business decisions.

Harness provides pre-loaded **[By Harness](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/overview#bi-dashboards-by-harness)** (pre-defined) and **[Custom](/docs/platform/dashboards/create-dashboards)** (user-defined) dashboards to visualize cloud cost data across clusters and cloud accounts.


-------

## Before You Begin

* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](/docs/cloud-cost-management/access-control/manage-access-control-for-ccm-dashboards.md).
* Ensure that you have set up [Cloud Cost Management (CCM) for your cloud provider](../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md).

After setting up cost visibility for the cloud provider and the data is available in the Perspective, you can view the dashboard. The data in the Dashboard is updated dynamically.

## Creating Custom Dashboards

Harness BI Dashboards are available across all Harness modules as a platform-wide capability. This guide descibes Dashboard available by Harness for Cloud Costs. To create and customize your own dashboards, refer to the following comprehensive resources:

* [Create Dashboards](/docs/platform/dashboards/create-dashboards)
* [Create Visualizations and Graphs](/docs/platform/dashboards/create-visualizations-and-graphs)
* [Use Dashboard Actions](/docs/platform/dashboards/use-dashboard-actions)
* [Download Dashboard Data](/docs/platform/dashboards/download-dashboard-data)
* [Create Conditional Alerts](/docs/platform/dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](/docs/platform/dashboards/share-dashboards)

-------

## How to Create Custom Dashboards and Add Tiles for CCM

<DocVideo src="https://app.tango.us/app/embed/7365df2b-2dd2-4539-a1fd-5f2513c42af4?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" style="min-height:720px" title="How to Create Custom Dashboards and Add Tiles for CCM" />

-------

## BI Dashboards by Harness
To access the dashboards from the CCM module, perform the following steps:

1. In the **Harness** application, click **Cloud Costs** > **BI Dashboards** or select **Dashboards** directly.
2. Click on **By Harness** to view the pre-defined dashboards available. The dashboards with "Cloud Costs" tags are pre-defined CCM dashboards.

To access the dashboards from the CCM module, in the **Harness** application, click **Dashboards**.Click on **Cloud Costs**. You can see the OOTB dashboards available for the specific cloud provider as listed below

:::important note
The data scan limit is 350 GB per query. Users can avoid hitting this limit by applying necessary filters to reduce the result-set as per their requirements.
:::

-------

<DynamicMarkdownSelector
  options={{
    Kubernetes: {
      path: "/cloud-cost-management/content/dashboard/kubernetes.md",
      logo: "/cloud-providers/kubernetes-logo.svg",
      logoSize: 32
    },
    AWS: {
      path: "/cloud-cost-management/content/dashboard/aws.md",
      logo: "/cloud-providers/aws-logo.svg",
      iconOnly: true,
      logoSize: 40
    },
    GCP: {
      path: "/cloud-cost-management/content/dashboard/gcp.md",
      logo: "/cloud-providers/gcp-logo.svg",
      logoSize: 32
    },
    Azure: {
      path: "/cloud-cost-management/content/dashboard/azure.md",
      logo: "/cloud-providers/azure-logo.svg",
      logoSize: 32
    }
  }}
/>

-------
### See Also

Once you have set up cost visibility for your Kubernetes clusters, AWS, GCP, and Azure cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](/docs/platform/dashboards/create-dashboards)
* [Create Visualizations and Graphs](/docs/platform/dashboards/create-visualizations-and-graphs)
* [Use Dashboard Actions](/docs/platform/dashboards/use-dashboard-actions)
* [Download Dashboard Data](/docs/platform/dashboards/download-dashboard-data)
* [Create Conditional Alerts](/docs/platform/dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](/docs/platform/dashboards/share-dashboards)

-------

## FAQs

<details>
<summary>How can we identify unused portions of Reserved Instances (RI) in Azure billing data?</summary>
By filtering on ChargeType = UnusedReservation and PricingModel = Reservation, then summing the Quantity and Cost columns, you can calculate the unused reservation portion and its cost.
</details>

<details>
<summary>What is the Billing Export Fields Expansion in Unified Explore?</summary>

We've expanded our billing data capabilities across all three cloud providers: AWS, GCP, and Azure by exposing all standard billing export fields directly in Unified Explore.

These fields allow for deeper visibility, granular filtering, and improved analysis of cloud spend across providers.

Managing cloud costs effectively requires access to detailed and accurate data. By exposing native billing export fields in Unified Explore, you can:

- Filter and group data using familiar cloud-native terms
- Perform cost attribution with greater precision
- Simplify audits, budgeting, and forecasting

### What's Included

#### AWS

All standard fields from AWS Cost and Usage Reports (CUR) are now available.

Example fields: lineItem/UsageAccountId, lineItem/UsageType, product/instanceType, lineItem/UnblendedCost, and more.

[AWS Data Dictionary →](https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html)

#### GCP

Support for both Standard and Detailed billing export schemas.

Fields from cost_type, project.id, service.description, and more are available.

[GCP Standard Schema →](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/standard-usage#standard-usage-cost-data-schema)

[GCP Detailed Schema →](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage#detailed-usage-cost-data-schema)

#### Azure

Standard billing dataset fields such as resourceGroup, meterCategory, costInBillingCurrency, etc. are now exposed.

[Azure Schema Reference →](https://learn.microsoft.com/en-us/azure/cost-management-billing/dataset-schema/schema-index)

### Unified FOCUS Schema Mapping

Unified Explore now supports billing export fields aligned with the [FOCUS v1.1 Specification](https://focus.finops.org/focus-specification/v1-1/). This brings consistency across cloud billing data, enabling standardized cost analysis and easier comparison across providers.

#### What is FOCUS?

FOCUS (FinOps Open Cost and Usage Specification) is a vendor-neutral schema that defines a standard format for cloud billing data. It provides a consistent data structure across AWS, GCP, and Azure, simplifying multi-cloud cost management.

Read more about [FOCUS](https://focus.finops.org/focus-specification/v1-1/).

### How to Use These Fields in Unified Explore

1. Navigate to **BI Dashboards** → **+Dashboard**
2. Click on **Add Widget** and choose **Unified**
3. Use all the listed fields in filters, group-bys, or as columns in your reports
</details>

