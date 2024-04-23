---
title: Create a new chaos dashboard
sidebar_position: 2
description: Guide to create a new dashboard and visualize entities of a chaos experiment
redirect_from:
	- /docs/chaos-engineering/configure-chaos-experiments/chaos-dashboard/create-a-new-dashboard
---

import Descriptions from './shared/field-descriptions.md'

This section will guide you through creating a new chaos dashboard, and creating custom visualizations for various entities of a chaos experiment.

## Before you begin

Refer to [overview of chaos dashboards](/docs/chaos-engineering/features/chaos-dashboard/overview.md) to understand what a chaos dashboard is, and how you can view a predefined chaos dashboard.

## Create a new visualization
To create a new visualization in a new dashboard, follow the steps mentioned below.

### Step 1: Click Dashboard
* To create a new dashboard, navigate to **Chaos Dashboards** and select **Go to Dashboards**.

![click-dashboard](./static/create-a-new-dashboard/click-dashboard-1.png)

### Step 2: Specify parameters
* Click **+ Dashboard**, and filter by **chaos** dashboards.

![go-to-board](./static/create-a-new-dashboard/go-to-board-2.png)

* Add values for **Folder**, **Name**, and **Tags** (compulsory).

![specify-params](./static/create-a-new-dashboard/specify-parameters-3.png)

:::tip
Don't forget to add the **Tags** value because this is the field based on which the dashboards are filtered by modules.
:::

* Click **Continue**. This creates an empty dashboard. You can add visualizations (also known as **panels**) by editing this dashboard.

### Step 3: Edit dashboard

As mentioned earlier, you can edit a dashboard that you created.

* Click **Edit Dashboard** to edit the dashboard that you created in the previous step.

![edit-4](./static/create-a-new-dashboard/edit-4.png)

### Step 4: Add a visualization dashboard

* Click **Add** and select **Visualization**.

![edit-5](./static/create-a-new-dashboard/add-5.png)

### Visualize the number of experiment runs for a time period

To visualize the number of successful experiment runs for a specific time period (months in this example), you need three fields:

1. Count of successful experiments
2. Experiment runs
3. Months

### Step 5: Select a table
* Select a table whose fields you wish to visualize. HCE currently supports **Chaos Experiment Runs**, **Chaos Experiments**, **Chaos Hub**, and **Chaos Infrastructures**. In this example, select **Chaos Experiment Runs**.

![select-fields](./static/create-a-new-dashboard/select-fields-6.png)

* This will display a left bar with different fields.

![add-7](./static/create-a-new-dashboard/add-7.png)

### Step 6: Select fields
* Select 2 or more fields which you wish to visualize. In this example, the first field would be **Month**. To select it, go to **Chaos Experiment Runs** -> **Created time** -> **Month**.

![params-8](./static/create-a-new-dashboard/params-8.png)

* The second field would be **count**.

![params-9](./static/create-a-new-dashboard/params-9.png)

* The third field is not readily available, hence you can create a custom field.

### Step 7: Create a custom field

* To create a custom field, click **Custom Fields** -> **Add** -> **Custom Dimension**.

![custom field](./static/create-a-new-dashboard/custom-field-10.png)

* To create the query to customize the field, use [lookML](https://cloud.google.com/looker/docs/what-is-lookml) query. Provide a name and click **Save**.

![save-field](./static/create-a-new-dashboard/lookML-11.png)

### Step 8: Pivot the results

* To visualize the results with respect to passed and failed experiment runs, click the settings button of the **Experiment Status** and select **Pivot**.

![save-field](./static/create-a-new-dashboard/pivot-12.png)

### Step 9: Click Run to view the graph
* When you click **Run**, chaos dashboard displays the graph of number of failed and passed experiment runs (x-axis) over different months (y-axis).

![bar-graph](./static/create-a-new-dashboard/bar-graph-13.png)

### Step 10: Click Save (Optional)
* If you wish to save your visualization, click **Save**. Otherwise, you can **Cancel** and add visualizations again.

:::info note
You can find the definitions for many of the fields [here](/docs/chaos-engineering/architecture-and-security/architecture/components).
:::

## Description of fields used

<Descriptions />

## Next steps

* [Best practices to build effective dashboards](/docs/platform/dashboards/dashboard-best-practices.md)