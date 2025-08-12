import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## View GCP Cost Dashboard

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
   

6. Hover over the chart to see the cost details.
   

7. In **Cost by GCP Accounts**, click the up or down arrow button to scroll up or down the list. The list shows the percentage of each account with respect to the cost contribution.
   

8. In **Cost by GCP Accounts**, click on the chart to further drill into the cost details of Product, Region, or SKU. You can drill down by:
    * by Product
    * by Region
    * by SKU
  

9. The dashboard displays the cost data based on the selection in the previous step.

10. You can further drill down and view the cloud cost of a specific **Product**. For example, drill into Compute Engine and view the cost **by Project**, **by Region**, and **by SKU**.
  The following example displays **by Region** cost details in the Dashboard. You can also view the details of the filters applied.
  
11. In the resulting dashboard, you can further drill into a specific region and view **by Project**, **by Product**, and **by SKU** cost details.

    For example, drill into **by SKU** and view the details in the Dashboard. You can also view the details of the filters applied.
    
12. Click **Back** to go back to the previous page in the Dashboard.
13. Click **Download** to download the Dashboard. See [Download Dashboard Data](../../../platform/dashboards/download-dashboard-data.md).
14. You can also drill into Most Expensive Products by Month and view details in the Dashboard.

15. Click the **Filter** icon to hide or show the filters.
    
