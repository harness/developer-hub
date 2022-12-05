---
title: View AWS Resource Breakdown Dashboard
description: Dashboards are a collection of charts and data tables with filters that you can use to get at the data you're interested in. Dashboards serve as a platform for data modeling and analytics using a com…
# sidebar_position: 2
helpdocs_topic_id: aeluxvvheb
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
---

**Dashboards** are a collection of charts and data tables with filters that you can use to get at the data you're interested in. Dashboards serve as a platform for data modeling and analytics using a combination of available business metrics and operational data. You can use this data to make data-driven informed business decisions.

For information on core Dashboard functionality, see [Create Dashboards](/article/ardf4nbvcy-create-dashboards).Harness provides pre-loaded **By Harness** (pre-defined) and **Custom** (user-defined) Dashboards to visualize cloud cost data across clusters and cloud accounts. Using the **AWS Resource Breakdown Dashboard** you can:

* Discover new analytical insights into your AWS Services
* Track various cloud cost indicators across different zones and time range
* View instance metrics
* Explore the cloud cost data in a logical and structured manner
* View your cloud costs at a glance, understand what is costing the most, and analyze cost trends

This Dashboard will not be available if you have not selected **AWS** **Resource Breakdown Dashboard** feature when setting up [CCM for AWS](https://ngdocs.harness.io/article/80vbt5jv0q-set-up-cost-visibility-for-aws).This topic describes how to view the **By Harness AWS Resource Breakdown Dashboard** and get more information about that data.

![](./static/view-aws-resource-breakdown-cost-dashboard-47.png)In this topic:

* [Prerequisites](https://ngdocs.harness.io/article/aeluxvvheb-view-aws-resource-level-cost-dashboard#prerequisites)
* [Data Ingestion for AWS Resource Breakdown Dashboard](https://ngdocs.harness.io/article/aeluxvvheb-view-aws-resource-level-cost-dashboard#data_ingestion_for_aws_resource_breakdown_dashboard)
* [Step: View AWS Resource Breakdown Dashboard](https://ngdocs.harness.io/article/aeluxvvheb-view-aws-resource-level-cost-dashboard#step_view_aws_resource_breakdown_dashboard)
* [See Also](https://ngdocs.harness.io/article/aeluxvvheb-view-aws-resource-level-cost-dashboard#see_also)
* [Next Steps](https://ngdocs.harness.io/article/aeluxvvheb-view-aws-resource-level-cost-dashboard#next_steps)

### Prerequisites

* Review [Set Up Cloud Cost Management for AWS](https://ngdocs.harness.io/article/80vbt5jv0q-set-up-cost-visibility-for-aws)
* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](https://ngdocs.harness.io/article/ng6yaxqi2r-manage-access-control-for-ccm-dashboards).
* Ensure that you have set up Cloud Cost Management (CCM) for the [AWS](https://ngdocs.harness.io/article/80vbt5jv0q-set-up-cost-visibility-for-aws) cloud provider.
* Ensure that you have added all the required permissions for your cloud provider. The data available in the Dashboard depends on the permissions you provided to the AWS cloud provider when setting up the CCM. For more information, see [Select Features](https://ngdocs.harness.io/article/80vbt5jv0q-set-up-cost-visibility-for-aws#step_3_select_features).

### Data Ingestion for AWS Resource Breakdown Dashboard

Once you have set up cost visibility for the [AWS](https://ngdocs.harness.io/article/80vbt5jv0q-set-up-cost-visibility-for-aws) cloud provider and the data is available in the Perspective, you can view **AWS Cost Dashboards**. The data in the Dashboard is updated dynamically.

### Step: View AWS Resource Breakdown Dashboard

Perform the following steps to view AWS Resource Breakdown Dashboard:

1. In Harness, click **Dashboards**.
2. In **All Dashboards**, select **By Harness** and click **AWS** **Resource Breakdown**.  
  
The **AWS Resource Breakdown Dashboard** is displayed:  


|  |  |
| --- | --- |
| **Dimension** | **Description** |
| Monthly Cost Breakdown | Includes the monthly cost of all the AWS resources. |
| Resource Level Cost Breakdown | Includes the resource level cost breakdown. |
3. In **Reporting Timeframe**, select the time duration.
4. In **Account**, select the account for which you want to view the cost. You can select multiple accounts.![](./static/view-aws-resource-breakdown-cost-dashboard-48.png)
5. In **Service**, select the service for which you want to view the cost. You can select multiple Services.
6. In **Region**, select the region. You can select multiple regions.
7. Once you have made all the selections, click **Update**.  The data is refreshed with the latest data from the database.![](./static/view-aws-resource-breakdown-cost-dashboard-49.png)

### See Also

You can also perform the following actions on the Dashboard:

* [Use Dashboard Actions](https://ngdocs.harness.io/article/y1oh7mkwmh-use-dashboard-actions)
* [Download Dashboard Data](https://ngdocs.harness.io/article/op59lb1pxv-download-dashboard-data)
* [Create Conditional Alerts](https://ngdocs.harness.io/article/ro0i58mvby-create-conditional-alerts)
* [Schedule and Share Dashboards](https://ngdocs.harness.io/article/35gfke0rl8-share-dashboards)

### Next Steps

Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](https://ngdocs.harness.io/article/ardf4nbvcy-create-dashboards)
* [Create Visualizations and Graphs](https://ngdocs.harness.io/article/n2jqctdt7c-create-visualizations-and-graphs)

