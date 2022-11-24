---
title: Send Notifications to Microsoft Teams
description: This topic explains how to send user group notifications using Microsoft Teams.
# sidebar_position: 2
helpdocs_topic_id: xcb28vgn82
helpdocs_category_id: y9pmm3ig37
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness notifies your User Groups of events in Pipelines, and general alerts.

You can integrate your Harness User Group with Microsoft Teams and receive notifications in Teams channels.

Setup is a simple process of generating a Webhook in Microsoft Teams and adding it to a Harness User Group's Notification Preferences. Let's get started.

In this topic:

* [Before You Begin](https://ngdocs.harness.io/article/xcb28vgn82-send-notifications-to-microsoft-teams#before_you_begin)
* [Step 1: Create a Connector for Microsoft Teams Channel](https://ngdocs.harness.io/article/xcb28vgn82-send-notifications-to-microsoft-teams#step_1_create_a_connector_for_microsoft_teams_channel)
* [Step 2: Generate Channel Webhook](https://ngdocs.harness.io/article/xcb28vgn82-send-notifications-to-microsoft-teams#step_2_generate_channel_webhook)
* [Step 3: Add Webhook to Harness User Group Notification Preferences](https://ngdocs.harness.io/article/xcb28vgn82-send-notifications-to-microsoft-teams#step_3_add_webhook_to_harness_user_group_notification_preferences)

### Before You Begin

* See [User Group Notification Preferences](/article/dfwuvmy33m-add-user-groups#option_notification_preferences)

### Review: Requirements

We assume you have a Microsoft Teams administrator account.

### Step 1: Create a Connector for Microsoft Teams Channel

You create a channel connector in Microsoft Teams to generate the Webhook Harness needs for notification.

In Microsoft Teams, right-click the channel where you want to send notifications, and select **Connectors**.

![](https://files.helpdocs.io/i5nl071jo5/articles/xcb28vgn82/1630577686052/screenshot-2021-09-02-at-3-43-07-pm.png)In **Connectors**, locate **Incoming Webhook**, and click **Configure.**

![](https://files.helpdocs.io/i5nl071jo5/articles/xcb28vgn82/1630577879194/screenshot-2021-09-02-at-3-47-11-pm.png)In **Incoming Webhook**, enter a name, such as **Harness**.

Right-click and save the Harness icon from here:

![](https://files.helpdocs.io/i5nl071jo5/articles/xcb28vgn82/1630578123520/harness.png)Click **Upload Image** and add the Harness icon you downloaded.

Next, you'll create the Webhook URL needed by Harness.

### Step 2: Generate Channel Webhook

In your Microsoft Teams Connector, click **Create**. The Webhook URL is generated.

![](https://files.helpdocs.io/i5nl071jo5/articles/xcb28vgn82/1630579026940/screenshot-2021-09-02-at-3-55-13-pm.png)Click the copy button to copy the Webhook URL, and then click **Done**.

The channel indicates that the Connector was set up.

![](https://files.helpdocs.io/i5nl071jo5/articles/xcb28vgn82/1630579556276/screenshot-2021-09-02-at-4-13-29-pm.png)### Step 3: Add Webhook to Harness User Group Notification Preferences

In your **Account**/**Organization**/**Project** click Access Control.

Click **User Groups**.

Select the User Group to which you want to add notification preferences.

In **Notification Preferences**, select **Microsoft Teams Webhook URL**.

Paste the Webhook into **Microsoft Teams Webhook URL** or add it as an [Encrypted Text](/article/osfw70e59c-add-use-text-secrets) in Harness and reference it here.

For example, if you have a text secret with the identifier `teamswebhookURL`, you can reference it like this: ​


```
<+secrets.getValue("teamswebhookURL")>​​
```
You can reference a secret within the Org scope using an expression with `org`:​


```
<+secrets.getvalue("org.your-secret-Id")>​
```
You can reference a secret within the Account scope using an expression with `account`:​


```
<+secrets.getvalue("account.your-secret-Id")>​
```
Click **Save**.

![](https://files.helpdocs.io/i5nl071jo5/articles/xcb28vgn82/1656394229644/screenshot-2022-06-28-at-10-59-24-am.png)Now your Microsoft Teams channel will be used to notify this User Group of alerts.

