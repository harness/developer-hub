---
title: View audit trail
description: Describes how to use the Audit Trail feature to track/debug/investigate changes to your resources in your Harness accounts.
sidebar_position: 2
helpdocs_topic_id: r5ytrnpcgr
helpdocs_category_id: cgjcdl8vdn
helpdocs_is_private: false
helpdocs_is_published: true
---

With Audit Trail in Harness, you can view and track changes to your Harness resources within your Harness account.

The audit data retention period is 2 years. Harness reserves the right to delete audit data after 2 years. You can request a longer retention period by contacting Harness. For example, if you require audit data for legal discoveries, etc, contact Harness and we can help.

This topic shows you how to view Audit Trails for your Harness account.

### Before you begin

* [Learn Harness' Key Concepts](../../../get-started/key-concepts.md)
* [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness)

### Step: View an Audit Trail

You can view Audit Trail data at the Account or Org scope. This topic explains how to view Audit Trail data at the account scope.

:::info note
The events in the scope of accounts will not be displayed if you are viewing the Audit Trail at the Org. 
:::

In Harness, go to **Account Settings**, and then select **Audit Trail**.

The **Audit Trail** page appears, displaying a record for each event that changed the setup of your Harness account, Modules, or Harness entities. By default, Harness shows the Audit logs for the previous 7 days.

It may take a few minutes for events to appear on the Audit Trail. Wait a minute and then refresh your browser if you don't notice an event right away.

![](../../governance/audit-trail/static/audit-trail-00.png)

For each event record, this view shows the:

* Date and time (**Time**).
* The user who made the change (**User)**.
* **Action** by the user like create, update, delete.
* Harness entity affected (**Resource**).
* **Organization** corresponding to the affected entity.
* **Project** corresponding to the affected entity.
* **Module** corresponding to the affected entity.
* **Event Summary** with YAML difference.

![](../../governance/audit-trail/static/audit-trail-01.png)


:::info IMPORTANT 

By default, the pipeline execution audit events such as Pipeline Start, Pipeline End, Stage Start, and Stage End are not captured in the Audit Trail. To enable capturing these events, you must enable the `Enable Pipeline Execution Audit Events` setting available under the pipeline category in the account level settings. This setting is only available at the account level. 

:::

#### Exclude Audit Trail Records

You can view all the records or filter the displayed records by selecting one of the following:

* **Exclude Login Events:** For excluding login events like successful, or unsuccessful logins, 2FA, etc, from the displayed records.
* **Exclude System Events:** For excluding system events from the displayed records.

![](../../governance/audit-trail/static/audit-trail-02.png)

These can be applied with or without your [custom filters](#option-add-a-filter) for Audit Trails.

### Step: Set Date/Time Range

You can restrict the Audit Trail's displayed events by date and time.

Use the Date Picker to restrict events to a predefined date range, or to a custom date/time range:

![](../../governance/audit-trail/static/audit-trail-03.png)
Selecting **Custom Date Range** enables you to set arbitrary limits by date and time of day.

### Option: Add a Filter

To add a Filter, perform the following steps:

1. In Harness, in **Account Settings** click **Audit Trail**.
2. In **Account Audit Trail**, click the filter icon.![](../../governance/audit-trail/static/audit-trail-04.png)
3. In the **New Filter** settings, select the filters to scope down the viewable audit events.  
You can scope down the viewable audit events by adding Filters and selecting:

   * User
   * Organization
   * Project
   * Resource Type
   * Resource Identifier
   * Action

   :::info note
   The Resource Identifier operates in conjunction with the Resource Type. It allows you to use the resource identifier to filter audit events related to a specific resource using that identifier.
   :::
   
4. In **Filter** **Name**, enter a name for your filter.
5. In **Who can view and edit the filter?** select **Only Me** or **Everyone** based on the visibility you want to set for this filter.
6. Click **Save**. Your filter is now created.

   ![](../../governance/audit-trail/static/audit-trail-05.png)

Click **Apply** to view the Audit Events as per the filter you just created.

![](../../governance/audit-trail/static/audit-trail-06.png)

By default, the events of the last 7 days are returned for the filter. To view more results, you can select the date range accordingly.

![](../../governance/audit-trail/static/audit-trail-07.png)
