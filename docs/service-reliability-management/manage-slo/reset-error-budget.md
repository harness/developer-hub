---
title: Reset error budget
description: Reset error budget to restore burn alerts after resolving issues that previously depleted the error budget.
sidebar_position: 10
---

An error budget policy is a way to manage the risk of outages by reserving a specific duration during which a service can experience downtime without adversely affecting customer satisfaction. This budget is established through [Policy as Code](/docs/service-reliability-management/slo-driven-deployment-governance), enabling automated enforcement within pipelines.

For instance, an error budget policy might be configured to block deployments if a service's remaining error budget falls below 70%. This restriction prevents deployments to services that are already at risk of an outage.

In some cases, a critical hotfix might need deployment even when the error budget is below 70%. Here, an error budget reset can be employed to temporarily expand the error budget, allowing the deployment to proceed. Error budget resets are a valuable tool for handling unforeseen situations. They ensure that essential updates are deployed without interrupting service availability. 

Additionally, error budget resets can be configured in such a way that only specific user-defined roles can reset the error budget. This prevents unauthorized users from resetting the error budget and compromising overall service reliability. To define a Service Reliability Management specific role in Harness, navigate to **Account Settings** > **Access Control** > **Roles**. Select **Create New Role** > **Service Reliability Management**, and then check the **Create/Edit** box under **SLO**. To learn more about creating user roles, go to [Manage roles in Harness](/docs/platform/role-based-access-control/add-manage-roles/#manage-roles-in-harness).



:::info note
You can only perform error budget resets on SLOs with the time period type configured as **Calendar**.
:::


To reset the error budget of an SLO:

1. In your Harness project, navigate to **Service Reliability Management** > **SLOs**, and then select the SLO for which you need to reset the error budget.

2. On the **Details** tab, select **Reset Error Budget** at the top.
   
   :::info note
   The **Reset Error Budget** option is available only for SLOs with the time period type configured as **Calendar**.
   :::

   The **Reset Error Budget** dialog appears. It displays the total error budget and the remaining error budget values. Expand the **Previous Error Budget reset history** section to review the reset history.

   <docimage path={require('./static/reset-error-budget.png')} />

3. Specify the number of minutes by which you want to extend the error budget, and provide a reason for this adjustment. The updated error budget and the remaining budget are displayed.

4. Select **Save**.  
   The error budget will be successfully reset. A marker appears on the SLO performance trend chart indicating the time when the error budget was reset. When you hover over the icon, error budget details are displayed. It may take up to 30 minutes for the reset icon to appear on the SLO performance trend chart.

   <docimage path={require('./static/reset-error-budget-marker.png')} />

   