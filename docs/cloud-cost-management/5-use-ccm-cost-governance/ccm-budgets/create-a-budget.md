---
title: Budgets
description: This topic describes how to create a new budget.
# sidebar_position: 2
helpdocs_topic_id: 08r3t4z0jo
helpdocs_category_id: lpq8glhiyc
helpdocs_is_private: false
helpdocs_is_published: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness CCM Budgets provide comprehensive cost governance capabilities that help you proactively manage and control your cloud spending. With CCM Budgets, you can:

- **Set Custom Budget Limits**: Define spending thresholds for specific cloud resources, services, or entire projects based on your organizational needs
- **Receive Proactive Alerts**: Get notified when your actual costs exceed or are forecasted to exceed your predefined budget limits
- **Monitor Multiple Time Periods**: Create budgets for various timeframes including monthly, quarterly, or yearly periods
- **Track Actual vs. Forecasted Costs**: Compare real-time spending against predicted costs to make informed financial decisions
- **Organize with Budget Groups**: Combine multiple budgets into hierarchical groups for better organization and cascading budget management

## Prerequisites

* [Set Up Cloud Cost Management for AWS](../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md)
* [Create Cost Perspectives](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md): Budgets are created on Perspectives. If you do not have a Perspective of the resources you would like to budget, first create a new Perspective and then proceed to set a budget. 

## Create a Budget

## Interactive guide

<DocVideo src="https://app.tango.us/app/embed/951ab084-1997-49aa-b854-a532dd972952?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add AWS Cloud Cost Connector in Harness" />

## Step-by-Step Guide

1. Navigate to the **Cloud Cost Management** module and click **Budgets.**
2. Click **New Budget**.

### Step 1: Define Target

<DocImage path={require('./static/budget-stepone.png')} width="90%" height="90%" title="Click to view full-size image" />

- **Select Perspective**, select the Perspective for which you want to set a budget.  
Budgets are created on Perspectives. If you do not have a Perspective of the resources you would like to budget, first [create a new Perspective](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md) and then proceed to set a budget. You can add multiple budgets for a single Perspective.

- **Budget Name**: enter a name for your budget that will appear in the budget dashboard to identify this budget. 

- Click **Continue**.

---------

### Step 2: Set Budget Amount

:::note
Budgets' start date cannot be later than the 28th of any month. 
:::

<DocImage path={require('./static/budget-steptwo.png')} width="90%" height="90%" title="Click to view full-size image" />

- **Budget Period**: Select the time period for your budget. Available options include:
  * **Monthly**: Set a budget for each calendar month
  * **Daily**: Set a daily budget
  * **Weekly**: Set a weekly budget
  * **Quarterly**: Set a budget for each quarter
  * **Yearly**: Set an annual budget

  When selecting **Yearly**, you can choose your budget breakdown as either:
  * **Yearly**: One budget amount for the entire year
  * **Monthly**: Individual budget amounts for each month of the year, with the option to override forecasted spend for each month.

<DocImage path={require('./static/monthly-yearly-breakdown.png')} width="90%" height="90%" title="Click to view full-size image" />

- **Period starts from**: Use the date picker to set the start date for your budget.
- **Budget Type**: select a Budget Type:  
	* **Specified Amount**: Enter the amount that you want to set as the budget limit.
	* **Previous Month Spend**: Sets the previous month spent as your budget.

- **Specify amount ($)**: Enter the amount that you want to set as the budget limit if you have selected **Specified Amount** in the **Budget Type**.

- **[Optional] Add growth rate to budget amount**: Growth rate refers to the percentage change of the budgeted amount within the specified time period. When you've decided to add growth rate to the budget amount, specify the growth rate percentage.  
     - **Specify Growth rate**: Enter the percentage of the growth rate to the budget amount. You can select this option only if you have selected **Specified Amount** in the **Budget Type**.  
	  
	You can view the increased amount of your budget in the graph. The graph displays the amount and budget period.
	
- Click **Continue**.

#### Projected Cost

Budget also displays the projected cost based on the actual spend, cost of the last 30 days, and remaining days in the budget period.

**Formula Breakdown:**

```
Projected Cost = Actual Spend + Estimated Remaining Cost

Where:
• Actual Spend = Cost incurred from budget start to current date
• Estimated Remaining Cost = (Last 30 days average) × (Remaining days in period ÷ 30)
```

#### Examples

| Budget Type | Scenario | Calculation Formula |
|-------------|----------|--------------------|
| **Monthly Budget** | Current date: January 10<br/>Budget period: Full month | `Actual spend (Jan 1-10)` + `(Last 30 days cost) × (21 remaining days ÷ 30)` |
| **Weekly Budget** | Week: January 1-7<br/>Current date: January 6 | `Actual spend (Jan 1-6)` + `(Last 30 days cost) × (1 remaining day ÷ 30)` |
| **Daily Budget** | Any single day | `Actual spend (current day)` + `(Last 30 days cost ÷ 30)` |

---------

### (Optional) Step 3: Configure Alerts 

<DocImage path={require('./static/budget-stepthree.png')} width="90%" height="90%" title="Click to view full-size image" />

Harness will send an alert to the specified email addresses and Harness User Groups when the actual or forecasted cost exceeds a percentage of your monthly budget

- Click on **+Add New Alert**. 
- Specify the **Percentage of Budget** based on the **Actual Cost** or **Forecasted Cost**. Harness sends alerts when the Actual Cost or Forecasted Cost exceeds the threshold.  
- In **Send Alert To**, select one of the following options to receive budget notifications. 
  1. **Email**: Enter the email address (you can enter more than one email address or email groups).
  2. **Slack Webhook URL**: Enter the webhook URL.!
- Click **Save**. Your budget is listed.

------

## Using the Budget Dashboard

<Tabs>
<TabItem value="dashboard-overview" label="Dashboard Overview" default>

<DocImage path={require('./static/budget-dashboard.gif')} width="100%" height="100%" title="Click to view full-size image" />

When you click on a specific budget, you'll see a detailed view containing:

### Budget Overview Cards

Each budget displays the following key metrics:

- **Budget Period**: The time frame for your budget (daily, weekly, monthly, quarterly, or yearly)
- **Spend Till Date**: The actual amount spent from the budget start date to the current date
- **Budget Amount**: The total budget limit you've set for the specified period
- **Forecasted Cost**: Predicted spending based on current usage patterns and historical data
- **Alerts At**: The threshold percentages and notification settings you've configured

### Budget History Graph
An interactive graph displaying:
- **Forecasted Cost Trend**: Projected spending over the budget period
- **Period-to-Date Cost**: Cumulative actual spending from the start of the latest budget period to current date where "Period" refers to the budget period. For example, if you have a monthly budget, the Month-to-Date Cost will show the cumulative cost from the start of the current month to the current date.
- **Actual Cost**: Real-time comparison of spending against your budget limit
- **Budget**: Visual indicators showing your alert thresholds

### Budget Details Table
A detailed breakdown corresponding to the Budget History Graph:

| Metric | Description |
|--------|-------------|
| **Budget Period** | The specific time frame (e.g., January 2024, Q1 2024) |
| **Actual Cost** | Real spending incurred during the period |
| **Budgeted Cost** | The allocated budget amount for the period |
| **Budget Variance ($)** | Dollar difference between actual and budgeted costs |
| **Budget Variance (%)** | Percentage variance showing over/under budget performance |

</TabItem>
<TabItem value="interactive-guide" label="Interactive Guide">

### Visual Walkthrough

Follow this interactive guide to understand how to navigate and use the Budget Dashboard effectively:

<DocVideo src="https://app.tango.us/app/embed/ea06db3f-b081-44b6-8f13-3aaa14bce1d1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Budget Dashboard Navigation Guide" />


</TabItem>
</Tabs>

-------

## Edit/Delete Budgets

### Edit a Budget

To edit a budget:

1. In **All Budgets**, select the budget that you want to edit.
2. Click **Edit**.
   
     ![](./static/create-a-budget-12.png)
3. The Budget settings appear. Follow the steps in **Create a New Budget** to edit the details of the budget.  

:::note
You cannot edit the **Budget Period**.
:::

### Delete a Budget

:::warning
Once a budget is deleted, it cannot be restored.
:::

To delete a budget:

1. In **All Budgets**, select the budget that you want to delete.
   
     ![](./static/create-a-budget-13.png)
2. Click **Delete**.
   
     ![](./static/create-a-budget-14.png)

<<<<<<< HEAD
=======


>>>>>>> b2311c8e31 (new changes)
