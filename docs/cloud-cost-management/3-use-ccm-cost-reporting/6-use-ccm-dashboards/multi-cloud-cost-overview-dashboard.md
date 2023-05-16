---
title: Multi-cloud Cost Overview Dashboard
description: This topic describes how to view By Harness Multi-cloud Cost Overview Dashboard and get more information about that data.
# sidebar_position: 2
helpdocs_topic_id: ff5f08g4v4
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
---

# View Multi-cloud Cost Overview Dashboard

Harness provides **By Harness** (pre-defined) and **Custom** (user-defined) Dashboards to visualize cloud cost data across cloud providers. Using the **Multi-cloud Cost Overview Dashboard** you can:

* Get a unified view of your cloud cost data across the cloud environment. For example, AWS, Azure, GCP, and Cluster
* Discover new analytical insights into your cluster costs across cloud providers
* Track various cloud cost indicators across different zones and time range
* Explore the cloud cost data in a logical and structured manner
* View your cloud costs at a glance, understand what is costing the most, and analyze cost trends

This topic describes how to view the **By Harness** **Multi-cloud Cost Overview** **Dashboard** and get more information about that data.

![](./static/multi-cloud-cost-overview-dashboard-14.png)


### Prerequisites

* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](../../2-getting-started-ccm/5-access-control/manage-access-control-for-ccm-dashboards.md).
* Ensure that you have set up Cloud Cost Management (CCM) for the [Kubernetes clusters](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-kubernetes.md), [AWS](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md), [GCP](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-gcp.md), and [Azure](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-azure.md) cloud accounts.
* Ensure that you have added all the required permissions for your cloud account. The data available in the Dashboard depends on the permissions you provided to the cloud accounts or clusters when setting up CCM.

### Data Ingestion for Multi-cloud Cost Overview Dashboard

Once you have set up cost visibility for your clusters and cloud accounts and the data is available in the Perspective, you can view the **Multi-cloud Cost Overview Dashboard**. The data in the Dashboard is updated dynamically.

### Step: View Multi-cloud Cost Overview Dashboard

Perform the following steps to view the Multi-cloud Cost Overview Dashboard:

1. In **Harness**, click **Dashboard****s**.
2. Select **By Harness** and click **Multi-cloud Cost Overview Dashboard**.
   
     ![](./static/multi-cloud-cost-overview-dashboard-15.png)
	 
	 The cost data is displayed.  

| **Dimension** | **Description** |
| --- | --- |
| Total Cost | The total cloud cost across clusters and cloud accounts with cost trend. |
| Forecasted Cost | The forecasted cluster and cloud accounts cost with cost trend. Forecasted cost is the prediction based on your historical cost data and it is predicted for the same future time period as your selected time range. |
| Cost by Cloud Providers | The cost of each cloud provider. For example, AWS, GCP, Azure, and Kubernetes cluster. |
| Cost by Services or Products | The cost of each Service and Product across cloud providers. |
| Weekly Cost Trend | The weekly cost trend across cloud providers. |
3. Select **Time Range** to filter the data based on pre-defined time range filters. The available filters are:
	* Last 7 Days
	* Last 30 Days
	* Last 90 Days
	* Last year
4. Once you have selected the **Time Range**, click **Reload**. The data is refreshed with the latest data from the database. By default, **Last 30 Days** is selected.
   
     ![](./static/multi-cloud-cost-overview-dashboard-16.png)
5. Hover over the chart to see the cost details.
   
     ![](./static/multi-cloud-cost-overview-dashboard-17.png)
6. In **Cost by Cloud Providers**, click the cloud provider to view the cost of a specific cloud provider. For example, click GCP to update the dashboard data only for GCP.
7. In the resulting dashboard, you can further refine your view. In **Weekly Cost Trend**, click **Time period/Week** for which you want to view the cost.
8. In **Cost by Services or Products**, hover over the chart to view the cost of **Products**. The applied filters are also displayed.
   
     ![](./static/multi-cloud-cost-overview-dashboard-18.png)
9.  Click the **Filter** icon to hide or show the filters.
    
	  ![](./static/multi-cloud-cost-overview-dashboard-19.png)

### See Also

Once you have set up cost visibility for your Kubernetes clusters, AWS, GCP, and Azure cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](https://developer.harness.io/docs/platform/Dashboards/create-dashboards)
* [Create Visualizations and Graphs](https://developer.harness.io/docs/platform/Dashboards/create-visualizations-and-graphs)

### Next Steps

* [Use Dashboard Actions](https://developer.harness.io/docs/platform/Dashboards/use-dashboard-actions)
* [Download Dashboard Data](https://developer.harness.io/docs/platform/Dashboards/download-dashboard-data)
* [Create Conditional Alerts](https://developer.harness.io/docs/platform/Dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](https://developer.harness.io/docs/platform/Dashboards/share-dashboards)


