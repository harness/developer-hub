---
title: Add a pipeline notification strategy
description: Notify users of different pipeline events.
sidebar_position: 3
---

This topic describes how to notify users of different pipeline events using popular notification methods.

You can send pipeline event notifications using email and popular communication and incident management platforms.

Event notifications are set up using **Notification Rules** in your pipeline. You select the types of events to send, and then select how you want to send notifications. When those events occur, Harness sends event information to those channels and recipients.

This topic describes how to set up **Notification Rules** in your pipeline.

You can set notifications preferences on user groups also. Go to [Manage user groups](/docs/platform/role-based-access-control/add-user-groups) for more information.


## Limitations

Currently, Harness supports several communication and incident management platforms. If you don't see yours, contact Harness.

## Requirements

To create or enable a notification rule, a user must belong to a user group with a role that has the pipeline **Create/Edit** permission.

## Add a notification rule

In your pipeline, select **Notify**.

![](./static/notify-users-of-pipeline-events-00.png)

To create a new notification rule, select **Notifications**. The **Notification Rule** settings appear.

Enter a name for the notification rule. You might want to edit the name after you've selected the events that trigger the rule.

Select **Next**.

## Select events

In **Pipeline Events**, select the events that will trigger the notification.

You can select events for the pipeline or stages.

If you select the stage events, you can select which stages to use.

![](./static/notify-users-of-pipeline-events-01.png)

Select **Continue**.

There are different communication and incident management platforms to use for the notification rule. Their settings are described below.

The events are self-explanatory, but there are a few considerations:

* If you select both **Pipeline End** and **Pipeline Success**, you'll get two notifications.
* **Pipeline Pause** only applies to a manual pause of the pipeline execution. Pending approval steps don't trigger the pipeline pause event.

## Email notifications

For email notifications, simply type in the email addresses that you want to notify.

Enter multiple addresses as a comma-separated list. For example, `john.doe@example.io,qateam@example.io`.

Here's an example of an email notification for the pipeline Start event:

![](./static/notify-users-of-pipeline-events-02.png)

Along with the start date and who triggered the pipeline, the email includes a link to the pipeline execution in Harness.

## Slack notifications

For Slack notifications, you simply create a webhook in Slack and paste it into the **Slack Webhook URL** setting in the notification rule.

Follow the steps in Slack documentation for creating a Slack app, selecting your channel, and creating a webhook: [sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks).

When you are done, you'll have a webhook that looks something like this:

![](./static/notify-users-of-pipeline-events-03.png)

Copy the webhook.

You either paste the Webhook into **Slack Webhook URL** or add it as an [encrypted text](/docs/platform/Secrets/add-use-text-secrets) in Harness and reference it here.

For example, if you have a text secret with the identifier `slackwebhookURL`, you can reference it like this:​


```bash
<+secrets.getValue("slackwebhookURL")>​
```

You can reference a secret within the Org scope using an expression with `org`:​


```bash
<+secrets.getValue("org.your-secret-Id")>​​
```

You can reference a secret within the Account scope using an expression with `account`:​


```bash
<+secrets.getValue(“account.your-secret-Id”)>​​​
```
![](./static/notify-users-of-pipeline-events-04.png)

## PagerDuty notifications

For PagerDuty notifications, enter the key for a PagerDuty account or service or add it as an [encrypted text](/docs/platform/Secrets/add-use-text-secrets) in Harness and reference it in **PagerDuty Key**. Harness will send notifications using this key.

For example, if you have a text secret with the identifier `pagerdutykey`, you can reference it like this:​


```bash
<+secrets.getValue("pagerdutykey")>​
```
You can reference a secret within the Org scope using an expression with `org`:


```bash
<+secrets.getvalue("org.your-secret-Id")>
```

You can reference a secret within the Account scope using an expression with `account`:


```bash
<+secrets.getvalue("account.your-secret-Id")>
```

You can copy or paste this key from PagerDuty's **Configuration** > **Services** > **Service Details** dialog > **Integrations** tab, as shown below.

![](./static/notify-users-of-pipeline-events-05.png)

For details, see PagerDuty's documentation on [creating integrations](https://support.pagerduty.com/docs/services-and-integrations).

## Microsoft Teams notifications

For Microsoft Teams notifications, you enter in the Webhook URL for your Microsoft Teams channel in **Microsoft Teams Webhook URL**.

You create a channel connector in Microsoft Teams to generate the webhook Harness needs for notification.

In Microsoft Teams, right-click the channel where you want to send notifications, and select **Connectors**.

![](./static/notify-users-of-pipeline-events-06.png)

In **Connectors**, locate **Incoming Webhook**, and select **Configure.**

![](./static/notify-users-of-pipeline-events-07.png)

In **Incoming Webhook**, enter a name, such as **Harness**.

Right-click and save the Harness icon from here:

![](./static/notify-users-of-pipeline-events-08.png)

Select **Upload Image** and add the Harness icon you downloaded.

Next, you'll create the webhook URL needed by Harness.

In your Microsoft Teams connector, select **Create**. The webhook URL is generated.

![](./static/notify-users-of-pipeline-events-09.png)

Click the copy button to copy the webhook URL, and then select **Done**.

The channel indicates that the connector was set up.

![](./static/notify-users-of-pipeline-events-10.png)

In Harness, in **Notification Method** settings, enter the webhook URL for your Microsoft Teams channel in **Microsoft Teams Webhook URL** or add it as an [encrypted text](/docs/platform/Secrets/add-use-text-secrets) and reference it here.

For example, if you have a text secret with the identifier `teamswebhookURL`, you can reference it like this:​


```bash
<+secrets.getValue("teamswebhookURL")>​​
```
You can reference a secret within the Org scope using an expression with `org`:


```bash
<+secrets.getvalue("org.your-secret-Id")>​
```
You can reference a secret within the Account scope using an expression with `account`:​


```bash
<+secrets.getvalue("account.your-secret-Id")>​​
```

## Webhook Notifications

:::info 

Currently, this feature is behind the feature flag, `PIE_WEBHOOK_NOTIFICATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Use Webhook notifications to inform an external application of an event. 

Select the Webhook notification method, and then enter the URL to be called when the event occurs. 

You can also use expressions to compose this URL. For example, `https://companyurl.notify.com/execution=-<+pipeline.executionId>`. 

Note that the expression must be evaluated in the context of the event. For example, stage related expressions may not be valid for pipeline start events. 

The webhook call is made as a POST request, and includes a JSON object containing the properties of the triggered event.

## Notify Slack channels in user groups

If you have Harness user groups that have Slack webhooks set up in their **Notification Preferences**, you can select those groups and Harness will notify them in addition to the Email, Slack, or PagerDuty settings.

Go to [send notifications using Slack](/docs/platform/Notifications/send-notifications-using-slack) for more information.

## Enable or disable notification rules

Once you've created notification rules, you can enable and disable them in the **Notifications** page.

![](./static/notify-users-of-pipeline-events-11.png)

