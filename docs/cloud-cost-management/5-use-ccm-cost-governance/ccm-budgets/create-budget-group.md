---
title: Budget Groups
description: This topic describes how to create a new budget group.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
Currently, this feature is behind the feature flag CCM_BUDGET_CASCADES. Contact Harness Support to enable the feature.
:::

A Budget Group helps you manage multiple budgets rolled up as a single high level budget. You can combine multiple budgets into a Budget Group and monitor them.

## Creating a Budget Group

- Navigate to the **Cloud Cost Management** module and click **Budgets.** Click **Create a new Budget Group**.

### Step 1: Define Group
- Enter a **Budget group name**.
- Select the **Budgets** to create a group OR **Budget groups** to create a group. You cannot combine a budget and a budget group to create a Budget Group.
- When selecting Budgets to group, ensure that they have the same **Start date**, **Budget Type**, and **Period**. If you are creating a **group of Budget Groups**, the **cascading type** must also be similar. After selecting the first budget or budget group, the remaining budgets or budget groups that have a different **Start date**, **Budget Type**, **Period** or **Cascading Type** are disabled.
- Click **Continue**.

### Step 2: Configure your budget group
- **Budget amount for the group**: The sum of the budgets or budget groups selected in the previous step is displayed by default. You can edit this value. If you make any changes to this amount, you will have to specify the **Cascading** strategy to split the balance.
- **Cascading**: If you wish to split the budget group amount across the budgets in the Budget Group, select one of the following cascading options:

  - **Equally**: Selecting this option splits the amount equally between the budgets in the group.
  - **Proportionally**: Specify the percentage split for each budget by selecting this option. For example, if you have a budget group with three budgets - Budget A, Budget B, and Budget C, you must specify the percentage of the total budget amount allotted to each of the three budgets. Ensure that the sum of the three percentages equals 100%.

- Click **Continue**.

### Step 3: (Optional) Set Alerts
- **Set Alerts for your budget group**:
   - Select **Actual** or **Forecasted** from the dropdown list.
   - Enter the threshold percentage of the budget that will trigger an alert.
   - In **Send Alert To**, select one of the following options to receive budget notifications.
     -  **Email**: Enter the email address (you can enter more than one email address or email groups).
     -  **Slack Webhook URL**: Enter the webhook URL.
   - Click **Save**. 

## Using the Budget Group Dashboard

#### Read Your Budget

The **Budgets** dashboard further shows you the details of your selected budget at a glance. You can also navigate to the [Perspective](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md) on which the budget is created from the budget dashboard.

![](./static/create-a-budget-09.png)

Select a budget from the list to view the following information:

* **Budget Status**: This is your budget period. For example, monthly, yearly, weekly, etc.
* **Spend Till Date Cost**: The actual incurred cost.
* **Budget Amount**: The amount that you set as the budget limit.
* **Forecasted Cost**: Your forecasted cost compared to your budgeted cost. Forecasted costs are predictions based on your historical cost data. The Forecasted Cost is the actual cost plus the projected cost, based on the spend pattern of previous months.
* **Alerts at**: Alerts configured for the set threshold percentage for the budget. An alert is sent when the Actual and/or Forecasted cost exceeds the specified percentage of your budgeted amount.
* **Budget History**: The monthly history of your budget. The dashboard displays the data as a chart and table. You can view, understand, and analyze your budget using either of them.
  + **Actual Cost**: The actual incurred cost.
  + **Budgeted Cost**: The budgeted amount.
  + **Budget variance**: The difference between the budgeted and actual cost in percentage and dollars. The variance data is available only in the tabular format.
  
    ![](./static/create-a-budget-10.png)

You can also **Edit** and **Delete** a budget from the dashboard.

![](./static/create-a-budget-11.png)

## Edit/Delete Budget Groups

### Edit a Budget Group

To update a budget group:

1. In the Budgets homepage, select the budget group that you want to edit.
2. Click **Edit** from the vertical ellipsis (⋮) icon.
3. You can update the name of the budget group.
4. You can exclude existing budgets or budget groups and include new ones with the same parameters.

:::note
You cannot modify the budget amount and the **Cascading** settings if you have selected the option while creating the budget group, but the proportions can be modified if **Proportional Cascading** is selected.
:::

#### Cascading Budget Recalculation

Whenever there is a change in the budget values within a nested budget group, the adjustment will cascade upwards, causing a readjustment of the budget ratios all the way to the top. Consequently, the budget amounts in that pathway will increase by a consistent delta amount.

**Example of cascading monthly budget recalculation:**

Original monthly budgets:
- Jan, Feb, Mar - $80
- May - $90
- June, July - $100
- Aug, Sep, Oct, Nov - $120
- Dec - $110

The overall budget is USD1200. When this amount is increased to USD1800, the difference in the amount (USD600) is redistributed across months in the same ratio as their initial splits. For example, the budget amount for January will increase by USD40 (80/1200 * 600 = 40).

### Delete a Budget Group

To delete a budget group:

1. In **All Budgets**, select the budget group that you want to delete.
2. Click **Delete** from the vertical ellipsis (⋮) icon.
3. Click **Delete** in the confirmation dialog.

#### What happens when a budget group is deleted?

- The budget group is deleted from your account.
- The budgets and budget groups within the deleted budget group are moved to the common pool where they retain their autonomy and function independently.
- If the budget group was part of a cascade, all the upward budget group ratios will be readjusted and computed accordingly.

:::info
When a perspective is deleted, all associated entities, such as reports, alerts, budgets, and budget groups are also deleted. If all children of a budget group are deleted as part of the perspective deletion, then the budget group itself will also be deleted.
:::
