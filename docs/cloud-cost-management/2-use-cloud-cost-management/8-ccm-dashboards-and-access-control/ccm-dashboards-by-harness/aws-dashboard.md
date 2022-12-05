---
title: View AWS Cost Dashboard
description: This topic describes how to view By Harness AWS Cost Dashboard and get more information about that data.
# sidebar_position: 2
helpdocs_topic_id: u3yxrebj6r
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
---

Dashboards help you model and analyze business metrics and operational data. You can use this data to make data-driven business decisions. Using charts, data tables, and filters, Dashboards help you get the most useful cost data.

For information on core Dashboard functionality, see [Create Dashboards](/article/ardf4nbvcy-create-dashboards).Harness provides pre-loaded **By Harness** (pre-defined) and **Custom** (user-defined) Dashboards to visualize cloud cost data across clusters and cloud accounts. Using the **AWS Cost Dashboard** you can:

* Discover new analytical insights into your AWS cloud costs
* Track various cloud cost indicators across different zones and time range
* Explore the cloud cost data in a logical and structured manner
* View your cloud costs at a glance, understand what is costing the most, and analyze cost trends

This topic describes how to view the **By Harness AWS Cost Dashboard** and get more information about that data.

![](./static/aws-dashboard-00.png)In this topic:

* [Prerequisites](https://ngdocs.harness.io/article/u3yxrebj6r-aws-dashboard#prerequisites)
* [Data Ingestion for Dashboard](https://ngdocs.harness.io/article/u3yxrebj6r-aws-dashboard#data_ingestion_for_dashboard)
* [Step: View AWS Cost Dashboard](https://ngdocs.harness.io/article/u3yxrebj6r-aws-dashboard#step_view_aws_cost_dashboard)
* [See Also](https://ngdocs.harness.io/article/u3yxrebj6r-aws-dashboard#see_also)
* [Next Steps](https://ngdocs.harness.io/article/u3yxrebj6r-aws-dashboard#next_steps)

### Prerequisites

* Review [Set Up Cloud Cost Management for AWS](/article/80vbt5jv0q-set-up-cost-visibility-for-aws).
* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](https://ngdocs.harness.io/article/ng6yaxqi2r-manage-access-control-for-ccm-dashboards).
* Ensure that you have set up Cloud Cost Management (CCM) for the [AWS](/article/80vbt5jv0q-set-up-cost-visibility-for-aws) cloud provider.
* Ensure that you have added all the required permissions for your cloud provider. The data available in the Dashboard depends on the permissions you provided to the AWS cloud provider when setting up the CCM. For more information, see [Select Features](/article/80vbt5jv0q-set-up-cost-visibility-for-aws#step_3_select_features).

### Data Ingestion for Dashboard

Once you have set up cost visibility for the [AWS](/article/80vbt5jv0q-set-up-cost-visibility-for-aws) cloud provider and the data is available in the Perspective, you can view **AWS Cost Dashboard**. The data in the Dashboard is updated dynamically.

### Step: View AWS Cost Dashboard

Perform the following steps to view AWS Cost Dashboard:

1. In Harness, click **Dashboards**.
2. In **All Dashboards**, select **By Harness** and click **AWS Cost Dashboard**.![](./static/aws-dashboard-01.png)The AWS Cost Dashboard is displayed:  
  


|  |  |  |
| --- | --- | --- |
| **Dimensions** | **Description** | **Context and Visibility** |
| Total Cost | The total AWS cost with cost trend. |  |
| Forecasted Cost | The forecasted cloud cost with cost trend. Forecasted cost is the prediction based on your historical cost data and it is predicted for the same future time period as your selected time range. |  |
| Cost by AWS Account | The cost of each AWS account you are using to connect Harness to AWS via a Harness AWS Cloud Provider. |  |
| Top Cost Trend by Services | The top AWS services by cost increase or decrease |  |
| Historical and Forecasted Cost | The historical and forecasted AWS cost. Forecasted cost is the prediction based on your historical cost data and it is predicted for the same future time period as your selected time range. |  |
| Current Period vs Last Period | The cost of the current and previous time range. |  |
| Most Expensive Services by Month | Top five services that incurred the maximum cost per month. |  |
3. Select **Time Range** to filter the data based on pre-defined time range filters. The available filters are:
	* Last 7 Days
	* Last 30 Days
	* Last 90 Days
	* Last year
4. Once you have selected the Time Range filter, click **Reload**. The data is refreshed with the latest data from the database.![](./static/aws-dashboard-02.png)
5. Hover on the chart to see the cost details.![](./static/aws-dashboard-03.png)
6. In **Cost by AWS** **Account**, click the up or down arrow button to scroll up or down the list. The list shows the percentage of each AWS account with respect to the cost contribution.![](./static/aws-dashboard-04.png)
7. In **Historical and Forecasted Cost**, click on the chart to further drill into the cost details **by Time Period/Time**.![](./static/aws-dashboard-05.png)The cost for the selected Time period is displayed.![](./static/aws-dashboard-06.png)
8. In **Most Expensive Services by Month**, click on the chart to further drill into the cost details:
	* by Time Period/Week
	* by Time Period/Date
	* by Time Period/Time![](./static/aws-dashboard-07.png)The cost data for the selected filter is displayed.![](./static/aws-dashboard-08.png)
9. You can further drill into **by Time Period/Date** and **by Time Period/Time** cost details in the resulting dashboard.![](./static/aws-dashboard-09.png)The cost data for the selected filter is displayed.![](./static/aws-dashboard-10.png)
10. You can further drill into **by Time Period/Time** cost details in the resulting dashboard.![](./static/aws-dashboard-11.png)The cost data for the selected filter is displayed.![](./static/aws-dashboard-12.png)
11. Click **Back** to go back to the previous page in the Dashboard.
12. Click **Download** to download the Dashboard. See [Download Dashboard Data](/article/op59lb1pxv-download-dashboard-data).
13. Click the **Filter** icon to hide or show the filters.![](./static/aws-dashboard-13.png)

### See Also

Once you have set up cost visibility for your [Kubernetes clusters](/article/ltt65r6k39-set-up-cost-visibility-for-kubernetes), [AWS](/article/80vbt5jv0q-set-up-cost-visibility-for-aws), [GCP](/article/kxnsritjls-set-up-cost-visibility-for-gcp), and [Azure](/article/v682mz6qfd-set-up-cost-visibility-for-azure) cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](/article/ardf4nbvcy-create-dashboards)
* [Create Visualizations and Graphs](/article/n2jqctdt7c-create-visualizations-and-graphs)

### Next Steps

* [Use Dashboard Actions](https://ngdocs.harness.io/article/y1oh7mkwmh-use-dashboard-actions)
* [Download Dashboard Data](https://ngdocs.harness.io/article/op59lb1pxv-download-dashboard-data)
* [Create Conditional Alerts](/article/ro0i58mvby-create-conditional-alerts)
* [Schedule and Share Dashboards](/article/35gfke0rl8-share-dashboards)

