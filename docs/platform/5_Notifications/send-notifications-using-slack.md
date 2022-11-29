---
title: Send Notifications Using Slack
description: This topic explains how to send user group notifications using slack.
# sidebar_position: 2
helpdocs_topic_id: h5n2oj8y5y
helpdocs_category_id: y9pmm3ig37
helpdocs_is_private: false
helpdocs_is_published: true
---

You can notify your User Group members using Slack as one of the notification channels. To do this, add a Slack Incoming Webhook into your Harness User Groups' [Notification Preferences](/article/dfwuvmy33m-add-user-groups#option_notification_preferences).

Then you can add your User Group to a Notification Strategy and receive alert info in Slack.

### Before you begin

* See [User Group Notification Preferences](../4_Role-Based-Access-Control/3-add-user-groups.md#option-notification-preferences)

### Visual summary

Adding a Slack channel to your Harness User Groups **Notification Preferences** is as simple as pasting in a Slack Webhook:

![](https://files.helpdocs.io/i5nl071jo5/articles/h5n2oj8y5y/1656393007672/screenshot-2022-06-28-at-10-37-12-am.png)

### Step 1: Create a Slack app and webhook for your channel

Follow the steps in Slack documentation for creating a Slack app, selecting your channel, and creating a webhook: [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks).

When you are done, you'll have a webhook that looks something like this:

![](https://files.helpdocs.io/i5nl071jo5/articles/h5n2oj8y5y/1630946219550/slack-web-hook.png)Copy the Webhook.

### Step 2: Add the webhook to the user group notification preferences

1. In your **Account**/**Organization**/**Project** click Access Control.
2. Click **User Groups**.
3. Select the User Group to which you want to add notification preferences.
4. In **Notification Preferences**, select **Slack Webhook URL**.
5. Paste the Webhook into **Slack Webhook URL**  or add it as an [Encrypted Text](../6_Security/2-add-use-text-secrets.md) in Harness and reference it here.  
For example, if you have a text secret with the identifier slackwebhookURL, you can reference it like this:
```
<+secrets.getValue("slackwebhookURL")>​​
```
  
You can reference a secret within the Org scope using an expression with `org`:​
```
<+secrets.getValue("org.your-secret-Id")>​
```
  
You can reference a secret within the Account scope using an expression with `account`:​
```
<+secrets.getValue("account.your-secret-Id")>​
```
6. Click **Save**.![](https://files.helpdocs.io/i5nl071jo5/articles/h5n2oj8y5y/1656393164636/screenshot-2022-06-28-at-10-37-12-am.png)

Now your Slack channel will be used to notify this User Group of alerts.

