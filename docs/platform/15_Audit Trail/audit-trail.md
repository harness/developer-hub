---
title: View Audit Trail
description: Describes how to use the Audit Trail feature to track/debug/investigate changes to your resources in your Harness accounts.
# sidebar_position: 2
helpdocs_topic_id: r5ytrnpcgr
helpdocs_category_id: cgjcdl8vdn
helpdocs_is_private: false
helpdocs_is_published: true
---

With Audit Trail in Harness, you can view and track changes to your Harness resources within your Harness account.

The audit data retention period is 2 years. Harness reserves the right to delete audit data after 2 years. You can request a longer retention period by contacting Harness. For example, if you require audit data for legal discoveries, etc, contact Harness and we can help.

This topic shows you how to view Audit Trails for your Harness account.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step: View an Audit Trail](#step_view_an_audit_trail)
* [Step: Set Date/Time Range](#step_set_date_time_range)
* [Option: Add a Filter](#option_add_a_filter)

### Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)
* [Access Management (RBAC) Overview](/article/vz5cq0nfg2-rbac-in-harness)

### Step: View an Audit Trail

You can view Audit Trail data at Account/Org/Project scope. This topic explains how to view Audit Trail data at the account scope.

The events in the scope of accounts will not be displayed if you are viewing the Audit Trail at the Org or Project scope.In Harness, go to **Account Settings**.

Click **Audit Trail**.

The **Audit Trail** page appears, displaying a record for each event that changed the setup of your Harness account, Modules, or Harness entities. By default, Harness shows the Audit logs for the previous 7 days.

It may take a few minutes for events to appear on the Audit Trail. Wait a minute and then refresh your browser if you don't notice an event right away.

![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1649827568509/screenshot-2022-04-13-at-10-52-11-am.png)For each event record, this view shows the:

* Date and time (**Time**).
* The user who made the change (**User)**.
* **Action** by the user like create, update, delete.
* Harness entity affected (**Resource**).
* **Organization** corresponding to the affected entity.
* **Project** corresponding to the affected entity.
* **Module** corresponding to the affected entity.
* **Event Summary** with YAML difference.![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1648203425460/screenshot-2022-03-25-at-3-46-29-pm.png)

From here, you have multiple options to [Modify the Audit Trail View](#modify_the_audit_trail_view).

#### Exclude Audit Trail Records

You can view all the records or filter the displayed records by selecting one of the following:

* **Exclude Login Events** - For excluding login events like successful, or unsuccessful logins, 2FA, etc, from the displayed records.
* **Exclude System Events** - For excluding system events from the displayed records.![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1649915491985/screenshot-2022-04-14-at-11-19-29-am.png)These can be applied with or without your [custom filters](#option-add-a-filter) for Audit Trails.

### Step: Set Date/Time Range

You can restrict the Audit Trail's displayed events by date and time.

Use the Date Picker to restrict events to a predefined date range, or to a custom date/time range:

![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1641468004475/screenshot-2022-01-06-at-4-48-54-pm.png)Selecting **Custom Date Range** enables you to set arbitrary limits by date and time of day.

### Option: Add a Filter

To add a Filter, perform the following steps:

1. In Harness, in **Account Settings** click **Audit Trail**.
2. In **Account Audit Trail**, click the filter icon.![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1648546356548/screenshot-2022-03-29-at-3-01-37-pm.png)
3. In the **New Filter** settings, select the filters to scope down the viewable audit events.  
You can scope down the viewable audit events by adding Filters and selecting:
	* User
	* Organization
	* Project
	* Resource Type
	* Action
4. In **Filter** **Name**, enter a name for your filter.
5. In **Who can view and edit the filter?** select **Only Me** or **Everyone** based on the visibility you want to set for this filter.
6. Click **Save**. Your filter is now created.![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1648444624444/screenshot-2022-03-28-at-10-40-45-am.png)

Click **Apply** to view the Audit Events as per the filter you just created.

![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1648546971990/screenshot-2022-03-29-at-3-10-50-pm.png)By default, the events of the last 7 days are returned for the filter. To view more results, you can select the date range accordingly.

![](https://files.helpdocs.io/i5nl071jo5/articles/r5ytrnpcgr/1648713980418/screenshot-2022-01-06-at-4-48-54-pm.png)