---
title: Notification settings
description: Configure notification settings for the account.
keywords: [Notification Settings, Slack notifications, Microsoft Teams notifications, webhook notifications, PagerDuty notifications]
sidebar_position: 1
redirect_from:
  - /tutorials/cd-pipelines/notifications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With notification settings, you can enable or disable notification channels at an account level. By default, all notification channels are enabled on an account. Organizations and projects in the account inherit the account-level settings.

When a notification channel is in the disabled state, no notification is sent for that channel, whether existing or new, until you enable the channel again.

You can enable or disable the following notification channels:
- Slack
- Microsoft Teams
- Webhooks
- PagerDuty

To disable a given notification channel, in Harness, go to **Account Settings** > **Account Resources** > **Default Settings** > **Notifications**, and then turn off the corresponding toggle.

With notification settings, you can add domain allowlists for notification channels at the account level. This feature enables you to specify fixed URL domains to which notifications can be sent. Expression URLs are not yet supported.

To add a domain filter to a notification channel, navigate to **Account Settings** > **Account Resources** > **Default Settings** > **Notifications** in the Harness platform and add the fixed URL domain to the corresponding notification setting.

![](./static/notification-settings-url-filters.png)

You can add domain filter to the following notification channels:
- Email
- Slack
- Microsoft Teams
- Webhooks
- PagerDuty
- Datadog

When a domain is added to a notification channel's domain allowlist, only recipients whose domains are present in the allowlist will receive notifications from that channel. This applies to both existing and new recipients until their domain is added to the channel's domain allowlist.

## Get started with notifications

Learn how to notify users of different pipeline events using popular notification methods.

### Prerequisites

* You need a Harness pipeline with active delegates and connectors. You can follow the [tutorial to get started with Harness Continuous Delivery (CD)](/docs/continuous-delivery/get-started/cd-tutorials/manifest) to set up a sample pipeline.
* These steps use [Harness user groups](/docs/platform/role-based-access-control/add-user-groups/) to manage user access. If you want to follow along, create a user group named `notification-demo` at the account level, and then add yourself as a user in that group.

### Configure New Channels to sent notification

A new channel can be configured across all scopes. To set up a channel, go to Settings for your desired scope → General → Notification Management, and click Channels as shown below:

   ![](./static/notify-channel.gif)

1. Click New Channel and enter a Channel Name.
            
   ![](./static/new-channel.png)

2. Choose a Connectivity Mode — you can send notifications either directly through the Harness Platform or via a Harness Delegate.

   ![connectivity-mode](./static/connectiviy-mode.png)

   If you choose to send notifications through a Harness Delegate, select the appropriate delegate in the Delegate Setup window.

   ![delegate-mode](./static/delegate-setup.png)

3. Notification Method: Once the connectivity mode is configured, select the [**Channel Type**](#configure-pipeline-notifications) and add details related to the channel type to proceed.
            
   :::note
   If you select the Connectivity Mode as "Connect through a Harness Delegate" and Channel Type as "Email", ensure to add an [SMTP configuration](https://developer.harness.io/docs/platform/notifications/add-smtp-configuration) to which the Harness delegate has access. If this is not done, then the Email notifications will fail.
   :::

  ![](./static/create-new-channel.png)

### Configure pipeline notifications

<Tabs>
<TabItem value="Email">

1. Select the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Email`. 
For email notifications, simply type in the email addresses that you want to notify.
   - Enter multiple addresses as a comma-separated list. For example, `john.doe@example.io,qateam@example.io`.
   - Additionally, use the user group that you created above to receive notifications.
   - You can also use the user group that you created above to receive notifications.
5. You can optionally add **notification templates** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).
6. Select the Connectivity Mode.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
8. Select **Submit** and your notification is created.

</TabItem>
<TabItem value="Slack">

To configure Slack notifications, you need to create a Slack webhook. For more information, go to the [sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks) tutorial provided by Slack. Copy and store the webhook URL for use in Harness.

1. Select the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Slack`.
   - Paste the webhook in **Slack Webhook URL**. Harness recommends that you add the webhook as an [encrypted text secret](/docs/platform/secrets/add-use-text-secrets) and reference it in **Slack Webhook URL** as an expression, such as `<+secrets.getValue("slackwebhookURL")>`.
   - Now additionally you can use the **user-group** created above, if it is associated with the slack channels to send notifications, for more information on the same follow the instructions mentioned [here](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#notify-slack-channels-in-user-groups)
5. You can optionally add **notification templates** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).
6. Select the Connectivity Mode.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Select **Submit** and your notification is created.

</TabItem>
<TabItem value="PagerDuty">

To configure PagerDuty notification, you need a PagerDuty [service key](https://support.pagerduty.com/docs/services-and-integrations) to integrate with Harness. Copy or store this key from PagerDuty's **Configuration** > **Services** > **Service Details dialog** > **Integrations** tab.

1. Select the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Pagerduty`.
   - Create an **[encrypted text](/docs/platform/secrets/add-use-text-secrets)** secret with the name `pagerdutykey` for the PagerDuty service you have created above, and reference it in **PagerDuty Key** using an expression. Harness will send notifications using this key.
   
   For example, you can reference a secret within the Org scope using an expression with `org`:
   ```
   <+secrets.getvalue("org.your-secret-Id")>
   ```
5. You can optionally add **notification templates** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).
6. Select the Connectivity Mode.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Select **Submit** and your notification is created.

</TabItem>
<TabItem value="Microsoft Teams">

In Microsoft Teams, you can use webhook notifications to inform an external application of a pipeline/stage event.

1. Select the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Microsoft Teams`.
   In **Enter the Microsoft Teams Webhook URL**, paste the webhook URL for your Microsoft Teams channel.

5. You can optionally add **notification templates** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).
6. Select the Connectivity Mode.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Select **Submit** and your notification is created.

</TabItem>
<TabItem value="Webhook">

In Harness you can use webhook notifications to inform an external application of a pipeline/stage event.

1. Select the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Webhook`.
   In **Enter the URL to be called**, use expressions to compose the URL to be called when the event occurs. For example, `https://companyurl.notify.com/execution=-<+pipeline.executionId>`.
   - The webhook call is made as a POST request, and includes a JSON object containing the properties of the triggered event.
   - The expression must be evaluated in the context of the event. For example, stage-related expressions might not be valid for pipeline start events.

5. You can optionally add **notification templates** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).
6. Select the Connectivity Mode.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Select **Submit** and your notification is created.

</TabItem>
<TabItem value="Datadog">

To configure Datadog notification, you need a Datadog [API key](https://docs.datadoghq.com/account_management/api_keys/) to integrate with Harness. Copy or store this key from Datadog's **Configuration** > **API Keys** > **API Key Details dialog** > **Integrations** tab.

1. Select the **Notify** icon on the right side of the Harness pipeline studio.
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
   - For stage-based events, select the stage name that you want to trigger the notification and click **Next**.
4. In **Notification Method**, select `Datadog`.
   Create an **[encrypted text](/docs/platform/secrets/add-use-text-secrets)** secret with the name `datadogkey` for the Datadog service you have created above, and reference it in **Datadog Key** using an expression. Harness will send notifications using this key.
   - For example, you can reference a secret within the Org scope using an expression with `org`:
   ```
   <+secrets.getvalue("org.your-secret-Id")>
   ```
5. You can optionally add **notification templates** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).
6. Select the Connectivity Mode.
   - Connect through Harness Platform to send notifications.
   - Connect through Harness Delegate to send notifications.
      - Select the delegate that you want to use to send notifications.
7. Select **Submit** and your notification is created.

</TabItem>
</Tabs>

More detailed information on how to configure the notification at the receiver end can be found [here](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/).

When you run the pipeline, you'll receive notifications on the platform you set up.

