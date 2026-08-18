---
title: Configure notifications
description: Configure notification channels and pipeline notifications for Slack, Microsoft Teams, email, webhooks, PagerDuty, and Datadog.
keywords:
  - Notification Settings
  - Slack notifications
  - Microsoft Teams notifications
  - webhook notifications
  - PagerDuty notifications
  - Datadog notifications
  - notification channels
  - pipeline notifications
  - connectivity mode
sidebar_position: 3
redirect_from:
  - /docs/platform/notifications/notification-settings#get-started-with-pipeline-notifications
  - /docs/platform/notifications/configure-notifications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Notifications keep your teams informed about pipeline events such as start, success, failure, and pause. You can create a reusable notification channel at the scope you need, then attach notifications to a pipeline so that the relevant people are alerted through Slack, Microsoft Teams, email, webhooks, PagerDuty, or Datadog.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Create a reusable notification channel](#configure-new-channels) at any scope and select its connectivity mode.
- [Configure pipeline notifications](#configure-pipeline-notifications) for the pipeline events you want to track.
- Identify the credentials each channel type requires, such as a webhook URL, a PagerDuty service key, or a Datadog API key.

---

## Before you begin

Before you configure notifications, ensure you have the following:

- A Harness pipeline with active delegates and connectors. You can follow the <a href="/docs/continuous-delivery/get-started/tutorials/kubernetes-container-deployments/manifest" target="_blank">tutorial to get started with Harness Continuous Delivery (CD)</a> to set up a sample pipeline.
- These steps use <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Harness user groups</a> to manage user access. If you want to follow along, create a user group named `notification-demo` at the account level, and then add yourself as a user in that group.

---

## Configure new channels

Follow the interactive walkthrough to see the flow end to end, or the next section for the step-by-step instructions.

<!--ARCADE EMBED START-->
<div style={{ position: 'relative', paddingBottom: 'calc(50.5208% + 41px)', height: '0', width: '100%' }}><iframe src="https://demo.arcade.software/jkqOeBievR5MDNVdwNOF?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true" title="Notification channels" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write; autoplay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', colorScheme: 'light' }}></iframe></div>
<!--ARCADE EMBED END-->

1. To set up a channel, navigate to **Settings** in your desired scope (Account or Organization or Project scope) -> **General** -> **Notifications and alerts**, and click **Notification Channels**.

2. Click **New Channel** and enter a **Channel Name**. Click **Continue**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/new-channel.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

   The **Select Connectivity Mode** tab appears.

3. Select a **Connectivity Mode**. You can send notifications directly through the Harness Platform or through a Harness Delegate. Click **Continue**.

   The **Notification Method** tab appears.

4. Once the connectivity mode is configured, select the [Channel Type](#configure-pipeline-notifications) and add details related to the channel type to proceed. Click **Submit**.

   :::note
   If you select the **Connectivity Mode** as "Connect through a Harness Delegate" and **Channel Type** as "Email", add a <a href="/docs/platform/notifications/add-smtp-configuration" target="_blank">Simple Mail Transfer Protocol (SMTP) configuration</a> to which the Harness delegate has access. If this is not done, then the email notifications fail.
   :::

   :::warning User groups require a notification preference
   If you target a Harness user group instead of entering a recipient directly, the channel delivers through the channels configured in that group's **Notification Preferences**. When the group has no preference configured for the channel type you selected, no notification is delivered and Harness does not report an error.

   Add the preference to the user group before you rely on the channel. Go to [Edit notification preferences](/docs/platform/role-based-access-control/add-user-groups#edit-notification-preferences) to add a channel to a user group.
   :::

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('../static/create-new-channel.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

The channel is now available at the scope where you created it, and you can reference it when you configure pipeline notifications.

---

## Configure pipeline notifications

When you configure pipeline notifications, you select the **Pipeline Events** that trigger the notification. Available pipeline-level events include start, end, success, failure, pause, and **Waiting for User Action**. The **Waiting for User Action** event fires whenever a pipeline pauses because it needs user input, such as an **Approval** step, **Manual Intervention**, or runtime execution input. For the full list of events and their behavior, see <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events#select-events" target="_blank">Add a pipeline notification strategy</a>.

Select the tab for the channel type you want to use. Each channel type requires different delivery details.

<Tabs>
<TabItem value="Email">

1. Click the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Email`.
For email notifications, enter the email addresses that you want to notify.
   - Enter multiple addresses as a comma-separated list. For example, `john.doe@example.io,qateam@example.io`.
   - You can also use the user group that you created above to receive notifications.
5. You can optionally add **notification templates** to get custom notifications based on the event. For more information, see <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>.
6. Select the **Connectivity Mode**.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Click **Submit** and your notification is created.

</TabItem>
<TabItem value="Slack">

To configure Slack notifications, you need to create a Slack webhook. For more information, see the <a href="https://api.slack.com/messaging/webhooks" target="_blank">sending messages using incoming webhooks</a> tutorial provided by Slack. Copy and store the webhook URL for use in Harness.

1. Click the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Slack`.
   - Paste the webhook in **Slack Webhook URL**. Harness recommends that you add the webhook as an <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank">encrypted text secret</a> and reference it in **Slack Webhook URL** as an expression, such as `<+secrets.getValue("slackwebhookURL")>`.
   - You can also use the user group created above, if it is associated with the Slack channels to send notifications. For more information, see <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events#notify-slack-channels-in-user-groups" target="_blank">Notify Slack channels in user groups</a>.
5. You can optionally add **notification templates** to get custom notifications based on the event. For more information, see <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>.
6. Select the **Connectivity Mode**.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Click **Submit** and your notification is created.

</TabItem>
<TabItem value="PagerDuty">

To configure PagerDuty notifications, you need a PagerDuty <a href="https://support.pagerduty.com/docs/services-and-integrations" target="_blank">service key</a> to integrate with Harness. Copy or store this key from PagerDuty's **Configuration** > **Services** > **Service Details dialog** > **Integrations** tab.

1. Click the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Pagerduty`.
   - Create an <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank">encrypted text</a> secret with the name `pagerdutykey` for the PagerDuty service you created above, and reference it in **PagerDuty Key** using an expression. Harness sends notifications using this key.

   For example, you can reference a secret within the **Organization** scope using an expression with `org`:
   ```
   <+secrets.getvalue("org.your-secret-Id")>
   ```
5. You can optionally add **notification templates** to get custom notifications based on the event. For more information, see <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>.
6. Select the **Connectivity Mode**.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Click **Submit** and your notification is created.

</TabItem>
<TabItem value="Microsoft Teams">

In Microsoft Teams, you can use webhook notifications to inform an external application of a pipeline or stage event.

1. Click the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Microsoft Teams`.
   In **Enter the Microsoft Teams Webhook URL**, paste the webhook URL for your Microsoft Teams channel.

5. You can optionally add **notification templates** to get custom notifications based on the event. For more information, see <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>.
6. Select the **Connectivity Mode**.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Click **Submit** and your notification is created.

</TabItem>
<TabItem value="Webhook">

In Harness you can use webhook notifications to inform an external application of a pipeline or stage event.

1. Click the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Webhook`.
   In **Enter the URL to be called**, use expressions to compose the URL to be called when the event occurs. For example, `https://companyurl.notify.com/execution=-<+pipeline.executionId>`.
   - The webhook call is made as a POST request, and includes a JavaScript Object Notation (JSON) object containing the properties of the triggered event.
   - The expression must be evaluated in the context of the event. For example, stage-related expressions might not be valid for pipeline start events.

5. You can optionally add **notification templates** to get custom notifications based on the event. For more information, see <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>.
6. Select the **Connectivity Mode**.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Click **Submit** and your notification is created.

</TabItem>
<TabItem value="Datadog">

:::note
Currently, the Datadog notifications feature is behind the feature flag `PIPE_DATADOG_NOTIFICATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

To configure Datadog notifications, you need a Datadog <a href="https://docs.datadoghq.com/account_management/api_keys/" target="_blank">API key</a> to integrate with Harness. Copy or store this key from Datadog's **Configuration** > **API Keys** > **API Key Details dialog** > **Integrations** tab.

1. Click the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Datadog`.
   Create an <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank">encrypted text</a> secret with the name `datadogkey` for the Datadog service you created above, and reference it in **Datadog Key** using an expression. Harness sends notifications using this key.
   - For example, you can reference a secret within the **Organization** scope using an expression with `org`:
   ```
   <+secrets.getvalue("org.your-secret-Id")>
   ```
5. You can optionally add **notification templates** to get custom notifications based on the event. For more information, see <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>.
6. Select the **Connectivity Mode**.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Click **Submit** and your notification is created.

</TabItem>
</Tabs>

When you run the pipeline, you receive notifications on the platform you set up.

---

## Next steps

- <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events" target="_blank">Notify users of pipeline events</a>: Configure the notification at the receiver end and review the full list of pipeline events.
- <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates</a>: Customize the content of a notification based on the event that triggers it.
- <a href="/docs/platform/notifications/add-smtp-configuration" target="_blank">Add SMTP configuration</a>: Configure SMTP for email-based deployment notifications, approvals, and tracking.
