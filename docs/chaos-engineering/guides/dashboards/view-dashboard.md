---
title: View dashboard
sidebar_position: 1
redirect_from:
- /docs/chaos-engineering/features/chaos-dashboard/overview
- /docs/chaos-engineering/configure-chaos-experiments/chaos-dashboard/overview
- /docs/chaos-engineering/guides/dashboards/view-dashboard
---

## Before you begin, review the following:

- [Chaos Dashboard](/docs/chaos-engineering/concepts/explore-features#resilience-insights)

## View Default Chaos Dashboard

1. Go to **Chaos Dashboards** and click **Go to Dashboards**.

    ![chaos-dashboard](./static/view/chaos-dashboard-intro.png)

2. From the modules displayed at the top, select **Chaos**. You can see a number of predefined chaos dashboards. You can either select one of the experiments or [create a new dashboard](/docs/chaos-engineering/guides/dashboards/create-new). Here, you can select a predefined chaos dashboard named **Chaos Experiment Insights**. You will see multiple visualizations in this predefined dashboard.

    ![select-chaos](./static/view/select-default.png)

:::tip
The values represented in the dashboards refer to previous week, month, and year. These visualizations don't consider the ongoing (or current) week, month, or year.
:::

The default dashboard displays the following insights on the chaos experiments:
- Top 10 trending experiments.
- Visualization of the number of experiments that passed versus ones that failed.
- Resilience trend.
- Top 10 failed experiments.

    ![analysis-one](./static/view/analysis-1.png)
    ![analysis-one](./static/view/analysis-2.png)
    ![analysis-one](./static/view/analysis-3.png)

:::info note
You can view the data, and download the data in different formats (such as JSON, excel, and so on.)

    ![download-data](./static/view/download-data.png)
:::

## Next steps

- [Create New Dashboard](/docs/chaos-engineering/guides/dashboards/create-new)
- [Best practices to build effective dashboards](/docs/platform/dashboards/dashboard-best-practices.md)