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

In this topic:

* [Before You Begin](https://ngdocs.harness.io/article/h5n2oj8y5y-send-notifications-using-slack#before_you_begin)
* [Visual Summary](https://ngdocs.harness.io/article/h5n2oj8y5y-send-notifications-using-slack#visual_summary)
* [Step 1: Create a Slack App and Webhook for Your Channel](https://ngdocs.harness.io/article/h5n2oj8y5y-send-notifications-using-slack#step_1_create_a_slack_app_and_webhook_for_your_channel)
* [Step 2: Add the Webhook to the User Group Notification Preferences](https://ngdocs.harness.io/article/h5n2oj8y5y-send-notifications-using-slack#step_2_add_the_webhook_to_the_user_group_notification_preferences)

### Before You Begin

* See [User Group Notification Preferences](https://ngdocs.harness.io/article/dfwuvmy33m-add-user-groups#option_notification_preferences)

### Visual Summary

Adding a Slack channel to your Harness User Groups **Notification Preferences** is as simple as pasting in a Slack Webhook:

![](https://files.helpdocs.io/i5nl071jo5/articles/h5n2oj8y5y/1656393007672/screenshot-2022-06-28-at-10-37-12-am.png)### Step 1: Create a Slack App and Webhook for Your Channel

Follow the steps in Slack documentation for creating a Slack app, selecting your channel, and creating a webhook: [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks).

When you are done, you'll have a webhook that looks something like this:

![](https://files.helpdocs.io/i5nl071jo5/articles/h5n2oj8y5y/1630946219550/slack-web-hook.png)Copy the Webhook.

### Step 2: Add the Webhook to the User Group Notification Preferences

1. In your **Account**/**Organization**/**Project** click Access Control.
2. Click **User Groups**.
3. Select the User Group to which you want to add notification preferences.
4. In **Notification Preferences**, select **Slack Webhook URL**.
5. Paste the Webhook into **Slack Webhook URL**  or add it as an [Encrypted Text](/article/osfw70e59c-add-use-text-secrets) in Harness and reference it here.  
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

