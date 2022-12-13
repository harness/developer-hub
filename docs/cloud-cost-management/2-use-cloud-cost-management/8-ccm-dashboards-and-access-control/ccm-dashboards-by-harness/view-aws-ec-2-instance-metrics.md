---
title: View AWS EC2 Instance Metrics Dashboard
description: This topic describes how to view the AWS EC2 Instance Metrics Dashboard and get more information about that data.
# sidebar_position: 2
helpdocs_topic_id: mwhraec911
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
---

**Dashboards** are a collection of charts and data tables with filters that you can use to get at the data you're interested in. Dashboards serve as a platform for data modeling and analytics using a combination of available business metrics and operational data. You can use this data to make data-driven informed business decisions.

:::note
For information on core Dashboard functionality, see [Create Dashboards](https://docs.harness.io/article/ardf4nbvcy-create-dashboards).
:::

Harness provides pre-loaded **By Harness** (pre-defined) and **Custom** (user-defined) Dashboards to visualize cloud cost data across clusters and cloud accounts. Using the **AWS EC2** **Instance Metrics** **Dashboard** you can:

* Discover new analytical insights into your AWS EC2 instances metrics
* Track various cloud cost indicators across different zones and time range
* Explore the cloud cost data in a logical and structured manner
* View your cloud costs at a glance, understand what is costing the most, and analyze cost trends

This Dashboard will not be available if you have not selected **AWS ECS and Resource Inventory Management** feature when setting up [CCM for AWS](/docs/cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md).This topic describes how to view the **AWS EC2 Instance Metrics** **Dashboard** and get more information about that data.

![](./static/view-aws-ec-2-instance-metrics-50.png)


## Before You Begin

* [Set Up Cloud Cost Management for AWS](/docs/cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md)
* [Manage Access Control for CCM Dashboards](/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/access-control/manage-access-control-for-ccm-dashboards)

## Prerequisites

* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](/docs/cloud-cost-management/use-cloud-cost-management/ccm-dashboards-and-access-control/access-control/manage-access-control-for-ccm-dashboards).
* Ensure that you have set up Cloud Cost Management (CCM) for the [AWS](/docs/cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md) cloud provider.
* Ensure that you have selected **AWS ECS and Resource Inventory Management** feature when creating the AWS connector. 

## Data Ingestion for Dashboard

Once you have set up cost visibility for the AWS cloud provider and the data is available in the Perspective, you can view the dashboard. The data in the Dashboard is updated dynamically.

## View AWS EC2 Instance Metrics Dashboard

Perform the following steps to view AWS EC2 Instance Metrics Dashboard:

1. In Harness, click **Dashboards**.
2. In **All Dashboards**, click **AWS EC2 Instance Metrics Dashboard**.
3. Select **EC2 Instance Id** from the drop-down list for which you want to view the details. You can select multiple IDs.
4. In **Metrics start time date**, select the time duration. You can select the preset value or use custom.  
By default, the **Last 30 Days** is selected.
   1. **Presets**: Select a Preset filter. For example, Today, Yesterday, etc.
   
     ![](./static/view-aws-ec-2-instance-metrics-51.png)
   2. **Custom**: Custom allows you to select the date range.
   
     ![](./static/view-aws-ec-2-instance-metrics-52.png)
5. Select the Public IP Address.
6. Once you have selected all the filters, click **Update**.  
  
The **EC2 Instance Metrics Dashboard** is displayed.

### See Also

Once you have set up cost visibility for your Kubernetes clusters, AWS, GCP, and Azure cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](/docs/platform/Dashboards/create-dashboards)
* [Create Visualizations and Graphs](/docs/platform/Dashboards/create-visualizations-and-graphs)

### Next Steps

* [Use Dashboard Actions](/docs/platform/Dashboards/use-dashboard-actions)
* [Download Dashboard Data](/docs/platform/Dashboards/download-dashboard-data)
* [Create Conditional Alerts](/docs/platform/Dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](/docs/platform/Dashboards/share-dashboards)

