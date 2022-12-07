---
title: Send Notifications Using Slack
description: You can receive Harness notifications in your Slack channels. You simply add a Slack Incoming Webhook into a Harness User Groups' Notification Settings. Then you can add your User Group to a Workflow…
# sidebar_position: 2
helpdocs_topic_id: 4blpfqwfdc
helpdocs_category_id: fmttl9hxzc
helpdocs_is_private: false
helpdocs_is_published: true
---

You can receive Harness notifications in your Slack channels. You simply add a Slack Incoming Webhook into a Harness User Groups' Notification Settings.

Then you can add your User Group to a Workflow [Notification Strategy](/article/duu0gbhejn-add-notification-strategy-new-template) and other settings and receive deployment and alert info in Slack. 

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Step 1: Create a Slack App and Webhook for your Channel](#undefined)
* [Step 2: Add the Webhook to the User Group Notification Settings](#step_2_add_the_webhook_to_the_user_group_notification_settings)
* [Related Topics](#related_topics)

### Before You Begin

* [Manage User Notifications](/article/kf828e347t-notification-groups)

### Visual Summary

Adding a Slack channel to your Harness User Groups **Notification Settings** is as simple as pasting in a Slack Webhook:

![](https://files.helpdocs.io/kw8ldg1itf/articles/4blpfqwfdc/1591745791199/image.png)### Step 1: Create a Slack App and Webhook for your Channel

Follow the steps in Slack documentation for creating a Slack app, selecting your channel, and creating a webhook:  [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks).

When you are done, you'll have a webhook that looks something like this:

[![](https://files.helpdocs.io/kw8ldg1itf/articles/4zd81qhhiu/1589479083422/image.png)](https://files.helpdocs.io/kw8ldg1itf/articles/4zd81qhhiu/1589479083422/image.png)Copy the Webhook.

### Step 2: Add the Webhook to the User Group Notification Settings

1. In Harness Manager, click **Continuous Security**, and then click **Access Management**.
2. In **Access Management**, click **User Groups**.
3. Click the name of an existing User Group, or create a new User Group with the steps in  [Managing Users and Groups (RBAC)](https://docs.harness.io/article/ven0bvulsj-users-and-permissions).
4. Locate the **Notification Settings** section.[![](https://files.helpdocs.io/kw8ldg1itf/articles/4hbsywt7nc/1559022310973/image.png)](https://files.helpdocs.io/kw8ldg1itf/articles/4hbsywt7nc/1559022310973/image.png)
5. Click more options (⋮), then click **Edit**. The **Notification Settings** appear.
6. Paste the Webhook into **Slack Webhook URL** and click **Submit**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/4blpfqwfdc/1591745799498/image.png)Now your Slack channel will be used to notify this User Group when it is added to a Workflow [Notification Strategy](/article/duu0gbhejn-add-notification-strategy-new-template), as well as other alerts.

### Related Topics

* [Send Slack Messages from Workflows](/article/4zd81qhhiu-slack-notifications)

