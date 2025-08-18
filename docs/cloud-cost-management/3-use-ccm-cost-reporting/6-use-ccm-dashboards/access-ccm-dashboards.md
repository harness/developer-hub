---
title: View CCM dashboards
description: This topic describes how to access CCM Dashboards and get more information about the data.
# sidebar_position: 2
helpdocs_topic_id: n7vpieto0n
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
   - /docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/aws-reservation-coverage-and-service-cost/
---


Dashboards are a collection of charts and data tables with filters that you can use to get at the data you are interested. Dashboards serve as a platform for data modeling and analytics using a combination of available business metrics and operational data. You can use this data to make data-driven, informed business decisions.


:::note
For information on core Dashboard functionality, go to [Create Dashboards](https://docs.harness.io/article/ardf4nbvcy-create-dashboards).
:::

:::warning Important

We have deprecated the Dimensions Current CPU/Memory Avg(%), Current CPU/Memory Max(%), Current CPU/Memory Min(%) and introduced new Measures Average CPU Utilization (%), Minimum CPU Utilization (%), Maximum CPU Utilization (%), Average memory utilization percentage, Maximum memory utilization percentage, Minimum memory utilization percentage in Azure VM Inventory metrics.
:::

Harness provides pre-loaded **By Harness** (pre-defined) and **Custom** (user-defined) dashboards to visualize cloud cost data across clusters and cloud accounts.


## Access the CCM dashboards

To access the dashboards from the CCM module, perform the following steps:

1. In the **Harness** application, click **Cloud Costs**.
2. Click **BI Dashboards**. 

     ![](./static/BI-Dashboards.png)

3. Select the cloud provider to view the dashboards available for the specific cloud provider.
4. Click the required tile.

    The **Dashboards** page opens. 


To access the dashboards outside the CCM module, perform the following steps:

1. In the **Harness** application, click **Dashboards**. 

       ![](./static/Dashboards-home.png)

2. Select **By Harness** or **Cloud Cost** to filter the list.
3. Click the required tile to view the corresponding dashboard.

:::important note
The data scan limit is 350 GB per query. Users can avoid hitting this limit by applying necessary filters to reduce the result-set as per their requirements.
:::

## See also
* [Use Dashboard Actions](../../../platform/dashboards/use-dashboard-actions.md)

## Billing Export Fields Expansion in Unified Explore

We’ve expanded our billing data capabilities across all three cloud providers: AWS, GCP, and Azure by exposing all standard billing export fields directly in Unified Explore.

These fields allow for deeper visibility, granular filtering, and improved analysis of cloud spend across providers.

Managing cloud costs effectively requires access to detailed and accurate data. By exposing native billing export fields in Unified Explore, you can:

- Filter and group data using familiar cloud-native terms

- Perform cost attribution with greater precision

- Simplify audits, budgeting, and forecasting

### What’s Included

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