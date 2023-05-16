---
title: GCP Cost Dashboard
description: This topic describes how to view By Harness GCP Cost Dashboard and get more information about that data.
# sidebar_position: 2
helpdocs_topic_id: tk55quhfi4
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
---

# View GCP Cost Dashboard

Harness provides **By Harness** (pre-defined) and **Custom** (user-defined) Dashboards to visualize cloud cost data across clusters and cloud accounts. Using the GCP Cost Dashboard you can:

* Discover new analytical insights into your GCP cloud costs
* Track various cloud cost indicators across different zones and time range
* Explore the cloud cost data in a logical and structured manner
* View your cloud costs at a glance, understand what is costing the most, and analyze cost trends

This topic describes how to view the **By Harness GCP Cost Dashboard** and get more information about that data.

![](./static/gcp-dashboard-20.png)



## Prerequisites

* Ensure that you have **Dashboard-All View** permissions assigned. Go to [Manage Access Control for CCM Dashboards](../../2-getting-started-ccm/5-access-control/manage-access-control-for-ccm-dashboards.md).
* Ensure that you have set up Cloud Cost Management (CCM) for the [GCP](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-gcp.md) cloud account.
* Ensure that you have added all the required permissions for your cloud provider. The data available in the Dashboard depends on the permissions you provided to the GCP cloud provider when setting up CCM.

## Data Ingestion for GCP Dashboard

Once you have set up cost visibility for the [GCP](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-gcp.md) cloud account and the data is available in the Perspective, you can view the **GCP Cost Dashboard**. The data in the Dashboard is updated dynamically.

## View GCP Dashboard

Perform the following steps to view the GCP Cost Dashboard:

1. In the **Harness** application, click **Dashboards**.
2. Select **By Harness** and then, click **GCP Cost Dashboard**. The GCP Cost Dashboard is displayed.

| **Dimension** | **Description** |
| --- | --- |
| Total Cost | The total GCP cost with cost trend. |
| Projected Cost | The projected cloud cost with cost trend. The projected cost is calculated based on the forecasted cost. Forecasted cost is the prediction based on your historical cost data and it is predicted for the same future time period as your selected time range. |
| Cost By GCP Accounts | The cost of each GCP account you are using to connect Harness to GCP via a Harness GCP Cloud Provider. |
| Top Cost Trend by Products | The top GCP products by cost increase or decrease. |
| Historical and Forecasted Cost | The historical and forecasted AWS cost. Forecasted cost is the prediction based on your historical cost data and it is predicted for the same future time period as your selected time range. |
| Current Period vs Last Period | The cost of the current and previous time range (as selected in the time range filter). |
| Most Expensive Products by Month | Top five products that incurred the maximum cost per month in last 1 year. |
3. Select **Time Range** to filter the data based on pre-defined time range filters. The available filters are:
	* Last 7 Days
	* Last 30 Days
	* Last 90 Days
	* Last 12 months
	* last 24 months
4. Select **Cost Type** to filter the data based on different cost types. The available filters are:
	* **Total Cost**: Displays the total cost for the specified time range
	* **Discounts and Promotions**: Displays the following data:
		+ **Discounts**: GCP provides certain discounts depending on your usage and commitment, such as:
			- ​Sustained use discounts are automatic discounts for running specific Compute Engine resources for a significant portion of the billing month.
			- ​Committed use discounts (CUDs) provide discounted prices in exchange for your commitment to use a minimum level of resources for a specified term. The discounts are flexible, cover a wide range of resources, and are ideal for workloads with predictable resource needs.
		+ **Promotions**: Promotions are things like Google Cloud Free Trial and marketing campaign credits, or other grants to use Google Cloud. Promotional credits are typically considered a form of payment. When available, promotional credits are automatically applied to reduce your total bill.
	* **Actual Cost**: the actual cost for the specified time range
5. Once you have selected the **Time Range** and **Cost Type** filter, click **Reload**. The data is refreshed with the latest data from the database. By default, **Last 30 Days** and **Total Cost** is selected.
   
     ![](./static/gcp-dashboard-22.png)
6. Hover over the chart to see the cost details.
   
     ![](./static/gcp-dashboard-23.png)
7. In **Cost by GCP Accounts**, click the up or down arrow button to scroll up or down the list. The list shows the percentage of each account with respect to the cost contribution.
   
     ![](./static/gcp-dashboard-24.png)
8. In **Cost by GCP Accounts**, click on the chart to further drill into the cost details of Product, Region, or SKU. You can drill down by:
	* by Product
	* by Region
	* by SKU
  
    ![](./static/gcp-dashboard-25.png)
9. The dashboard displays the cost data based on the selection in the previous step.
    
	  ![](./static/gcp-dashboard-26.png)
10. You can further drill down and view the cloud cost of a specific **Product**. For example, drill into Compute Engine and view the cost **by Project**, **by Region**, and **by SKU**.
  
    ![](./static/gcp-dashboard-27.png)
  
  The following example displays **by Region** cost details in the Dashboard. You can also view the details of the filters applied.
  
    
	  ![](./static/gcp-dashboard-28.png)
11. In the resulting dashboard, you can further drill into a specific region and view **by Project**, **by Product**, and **by SKU** cost details.
      ![](./static/gcp-dashboard-29.png)
	For example, drill into **by SKU** and view the details in the Dashboard. You can also view the details of the filters applied.
	
	  ![](./static/gcp-dashboard-30.png)
12. Click **Back** to go back to the previous page in the Dashboard.
13. Click **Download** to download the Dashboard. See [Download Dashboard Data](../../../platform/18_Dashboards/download-dashboard-data.md).
14. You can also drill into Most Expensive Products by Month and view details in the Dashboard.
    
	  ![](./static/gcp-dashboard-31.png)
15. Click the **Filter** icon to hide or show the filters.
    
	  ![](./static/gcp-dashboard-32.png)

### See Also

Once you have set up cost visibility for your Kubernetes clusters, AWS, GCP, and Azure cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](https://developer.harness.io/docs/platform/Dashboards/create-dashboards)
* [Create Visualizations and Graphs](https://developer.harness.io/docs/platform/Dashboards/create-visualizations-and-graphs)

### Next Steps

* [Use Dashboard Actions](https://developer.harness.io/docs/platform/Dashboards/use-dashboard-actions)
* [Download Dashboard Data](https://developer.harness.io/docs/platform/Dashboards/download-dashboard-data)
* [Create Conditional Alerts](https://developer.harness.io/docs/platform/Dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](https://developer.harness.io/docs/platform/Dashboards/share-dashboards)
