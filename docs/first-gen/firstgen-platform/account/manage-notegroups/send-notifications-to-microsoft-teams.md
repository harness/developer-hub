---
title: Send Notifications to Microsoft Teams
description: Harness notifies your User Groups of events in Workflows, Pipelines, Delegates, Service Guard 24/7, and general alerts. You can integrate your Harness User Group with Microsoft Teams and receive noti…
# sidebar_position: 2
helpdocs_topic_id: b84f0pu1cl
helpdocs_category_id: fmttl9hxzc
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness notifies your User Groups of events in Workflows, Pipelines, Delegates, Service Guard 24/7, and general alerts.

You can integrate your Harness User Group with Microsoft Teams and receive notifications in Teams channels.

Setup is a simple process of generating a Webhook in Microsoft Teams and adding it to a Harness User Group. Let's get started.

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Step 1: Create Connector for Microsoft Teams Channel](#step_1_create_connector_for_microsoft_teams_channel)
* [Step 2: Generate Channel Webhook](#step_2_generate_channel_webhook)
* [Step 3: Add Webhook to Harness User Group Notifications Settings](#step_3_add_webhook_to_harness_user_group_notifications_settings)
* [Example: Workflow Notification Strategy](#example_workflow_notification_strategy)
* [Option: Send a Message to Microsoft Teams using cURL](#option_send_a_message_to_microsoft_teams_using_c_url)

### Before You Begin

Review the following topics to understand Harness notification and alert options:

* [Manage User Notifications](/article/kf828e347t-notification-groups)
* [Add a Workflow Notification Strategy](/article/duu0gbhejn-add-notification-strategy-new-template)
* [Manage Alert Notifications](/article/rt7zvmzlgx-manage-alert-notifications)

We assume that you have a Microsoft Teams administrator account.

### Visual Summary

As stated earlier, setup is a simple process of generating a Webhook in Microsoft Teams and adding it to a Harness User Group.

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591227882016/image.png)The following steps walk you through this process.

Here's a video summary:

### Step 1: Create Connector for Microsoft Teams Channel

You create a channel connector in Microsoft Teams to generate the Webhook Harness needs for notification.

1. In Microsoft Teams, right-click the channel where you want to send notifications, and select **Connectors**.![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591223660180/image.png)
2. In **Connectors**, locate **Incoming Webhook**, and click **Configure**.![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591223752411/image.png)
3. In **Incoming Webhook**, enter a name, such as **Harness**.
4. Right-click [here](https://github.com/wings-software/harness-docs/blob/main/harness_logo.png) and click **Save Link As** to download the Harness icon, or right-click and save the image from here:![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591224300575/harness.png)
5. Click **Upload Image** and add the Harness icon you downloaded.

Next, you'll create the Webhook URL needed by Harness.

### Step 2: Generate Channel Webhook

1. In your Microsoft Teams Connector, click **Create**. The Webhook URL is generated.

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591224446751/image.png)1. Click the copy button to copy the Webhook URL, and then click **Done**.

The channel indicates that the Connector was set up.

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591224581962/image.png)Next, you will add the Webhook URL to the Harness User Group you want to notify using Microsoft Teams.

### Step 3: Add Webhook to Harness User Group Notifications Settings

1. In Harness, click **Continuous Security**, and then click **Access Management**.
2. Click **User Groups**.
3. In **User Groups**, select the User Group you want to receive Microsoft Teams notifications.
4. In **Notification Settings**, click **Edit**.![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591224857588/image.png)
5. In **Microsoft Teams Webhook URL**, enter the Webhook URL you copied from your Microsoft Teams connector.![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591227873519/image.png)
6. Click **Submit**.

That's it. Your Microsoft Teams channel will now receive notifications for events in Workflows, Pipelines, Delegates, Service Guard 24/7, and general alerts.

Click back in User Groups to see that the User Group now indicates that it is integrated with Microsoft Teams:

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591226350153/image.png)### Example: Workflow Notification Strategy

The most common example of notifications is a [Workflow Notification Strategy](/article/duu0gbhejn-add-notification-strategy-new-template).

When you add the User Group to the Notification Strategy of a Workflow, you will see the Microsoft Teams icon next to its name:

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591226261579/image.png)Let's look at an example message sent to the integrated Microsoft Teams channel when a Workflow is aborted:

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591226540827/image.png)You can click any links in the message to open the corresponding Harness components.

For Workflow notifications to Microsoft Teams, ensure that the **Send notification to me only** option in the **Start New Deployment** setting is not selected:

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591227399193/image.png)### Option: Send a Message to Microsoft Teams using cURL

You can send a message to any Microsoft Teams channel that has a Webhook enabled using cURL.

Here is an example of a Harness [Shell Script](/article/1fjrjbau7x-capture-shell-script-step-output) step in a Workflow executing the cURL command:

![](https://files.helpdocs.io/kw8ldg1itf/articles/b84f0pu1cl/1591227607336/image.png)You will notice that Harness built-in and custom Workflow variable expressions can be used in the message. See [Variables and Expressions in Harness](/article/9dvxcegm90-variables) and [Set Workflow Variables](/article/766iheu1bk-add-workflow-variables-new-template).

Here is an example of the cURL command in the Shell Script step:


```
curl --location --request POST 'https://outlook.office.com/webhook/xxxxx-xxx-xxx-xxx-xxxx@xxxx-xxx-xxx-bce0-xxx/IncomingWebhook/xxxxxxxxxxx-xxx-xxx-xxx-xxxxx' \  
--header 'Content-Type: application/json' \  
--data-raw '{  
    "@type": "MessageCard",  
    "@context": "http://schema.org/extensions",  
    "themeColor": "0076D7",  
    "summary": "Rolling Workflow started",  
    "sections": [{  
        "activityTitle": "Rolling Workflow started",  
        "activitySubtitle": "Workflow Notification",  
        "activityImage": "",  
        "facts": [{  
            "name": "URL",  
            "value": "[Rolling Workflow](${deploymentUrl}"  
        },  
        {  
            "name": "Application",  
            "value": "${app.name}"  
        },  
        {  
            "name": "Services",  
            "value": "${service.name}"  
        },  
        {  
            "name": "Artifacts",  
            "value": "${artifact.buildFullDisplayName}"  
        },  
        {  
        	"name": "Triggered By",  
            "value": "${deploymentTriggeredBy}"  
        }],  
        "markdown": true  
    }]  
}'
```
