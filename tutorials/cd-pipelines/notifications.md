---
sidebar_position: 6
title: Events Notifications
description: Tutorial to send notifiactions based on pipeline events.
---
# Notifications 

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Delivery & GitOps Certification today!"
  link="/certifications/continuous-delivery"
  closable={true}
  target="_self"
/>

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This tutorial focuses on how to notify users of different pipeline events using popular notification methods.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-approvals).

:::

## Before you begin

- Before you start this tutorial, you need to have a **Harness CD pipeline** with active delegates and connectors. Please follow this [tutorial](tutorials/cd-pipelines/kubernetes/manifest.md) to get started with Harness Continuous Delivery (CD). The tutorial below uses the Harness resources created as part of the get started tutorial. 

- **Harness User Group:** This tutorial uses [Harness user groups](/docs/platform/role-based-access-control/add-user-groups/) to manage user access. Create a user group named `notification-demo` at the account level, and add yourself as a user. 


## Get Started with Notifications

1. Select the **Notify** icon on the right side of the Harness pipeline studio. 
2. In **New Notification**, add a name for your notification.
3. In **Pipeline Events**, select the events (pipeline or stages) that will trigger the notification.
4. For stage-based events, select the stage name that you want to trigger the notification and click **Next**.

```mdx-code-block
<Tabs>
<TabItem value="Email">
```
5. In **Notification Method**, select `Email`.
6. For email notifications, simply type in the email addresses that you want to notify.
    - Enter multiple addresses as a comma-separated list. For example, `john.doe@example.io,qateam@example.io`.
7. Additionally, use the user group that you created above to receive notifications. 
8. Select **Finish** and your notification is created. 

```mdx-code-block
</TabItem>
<TabItem value="Slack">
```
### Prerequisite
- Create a Slack webhook. For more information, go to the [sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks) tutorial provided by Slack. 
- Copy and store the webhook URL for further use. 

5. In **Notification Method**, select `Slack`.
6. Paste the webhook in **Slack Webhook URL**. Harness recommends that you add the webhook as an **[encrypted text](https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets)** secret and reference it in **Slack Webhook URL** as an **expression**.
    - For example, `<+secrets.getValue("slackwebhookURL")>​`.
7. Now additionally you can use the **user-group** created above, if it is associated with the slack channels to send notifications, for more information on the same follow the instructions mentioned [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#notify-slack-channels-in-user-groups)

8. Select **Finish** and your notification is created. 

```mdx-code-block
</TabItem>
<TabItem value="PagerDuty">
```
### Prerequisite
- Create a PagerDuty [service key](https://support.pagerduty.com/docs/services-and-integrations) to integrate with Harness.  
- Copy or store this key from PagerDuty's **Configuration** > **Services** > **Service Details dialog** > **Integrations** tab.

5. In **Notification Method**, select `Pagerduty`.
6. Create an **[encrypted text](https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets)** secret with the name `pagerdutykey` for the PagerDuty service you have created above, and reference it in **PagerDuty Key** using an expression. Harness will send notifications using this key.
    - For example, you can reference a secret within the Org scope using an expression with `org`:  
      
    ```
    <+secrets.getvalue("org.your-secret-Id")>
    ```
7. Select **Finish** and your PagerDuty notification is created.

```mdx-code-block
</TabItem>
<TabItem value="Microsoft Teams">
```

For steps on creating Microsoft Teams notifications, follow the detailed instructions [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#microsoft-teams-notifications) in Harness Docs.

```mdx-code-block
</TabItem>
<TabItem value="Webhook">
```
:::info

Currently, this feature is behind the feature flag, `PIE_WEBHOOK_NOTIFICATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

In Harness you can use webhook notifications to inform an external application of a pipeline/stage event. 

5. In **Notification Method**, select `Webhook`.
6. In **Enter the URL to be called**, use expressions to compose the URL to be called when the event occurs. For example, `https://companyurl.notify.com/execution=-<+pipeline.executionId>`.
   
   The webhook call is made as a POST request, and includes a JSON object containing the properties of the triggered event.

:::note

The expression must be evaluated in the context of the event. For example, stage-related expressions might not be valid for pipeline start events.

:::

7. Select **Finish** and your Webhook notification is created.


```mdx-code-block
</TabItem>
</Tabs>
```

Now, in the pipeline, select **Run**. The pipeline executes and you'll receive notifications on the platform you set up. 


