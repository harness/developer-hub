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

Before you start this tutorial, you need to have a **Harness CD pipeline** with active delegates and connectors. Please follow this [tutorial](tutorials/cd-pipelines/kubernetes/manifest.md) that gets you started with Harness Continuous Delivery (CD). The tutorial below uses the Harness resources created as part of the get-started tutorial. 

**Harness User Group:** This tutorial uses [Harness User Groups](/docs/platform/role-based-access-control/add-user-groups/) to manage user access. Create a user group named `approval-demo` at the account level, and add yourself as a user. 


## Set Notifications

1. Select the **Notify** icon on the right side of the Harness Pipeline Studio. 
2. In the **New Notification** dialog box add a `name` for your notification.
3. Now select the **events(pipeline or stages)** that will trigger the notification.
4. For stage based events select the stage name from the drop-down for which you want to trigger the notification and click **Next**. 

```mdx-code-block
<Tabs>
<TabItem value="Email">
```
5. From the dropdown select the **Notification Method** as `Email`.
6. For email notifications, simply type in the email addresses that you want to notify.
    - Enter multiple addresses as a comma-separated list. For example, `john.doe@example.io,qateam@example.io`
7. Now additionally use the **user-group** that you created above as well to receive notifications. 
8. Select **finish** and your Notification is created. 

```mdx-code-block
</TabItem>
<TabItem value="Slack">
```
### Pre-Requisites
- Create a Slack Webhook, for [sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks) tutorial provided by slack. 
- Copy and store the webhook URL for further use. 

5. From the dropdown select the **Notification Method** as `Slack`.
6. Paste the Webhook in the Slack Webhook URL field, but it is suggested to add it as an **[Encrytped Text](https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets)** and refernce it in the Slack Webhook URL field as an **expression**.
    - Example `<+secrets.getValue("slackwebhookURL")>​`
7. Now additionally you can use the **user-group** created above, if it is associated with the slack channels to send notifications, for more information on the same follow the instructions mentioned [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#notify-slack-channels-in-user-groups)

8. Select **finish** and your Notification is created. 

```mdx-code-block
</TabItem>
<TabItem value="PagerDuty">
```
### Pre-Requisites
- Create a PagerDuty [service key](https://support.pagerduty.com/docs/services-and-integrations), for itegrating it with Harness.  
- Copy or store this key from PagerDuty's **Configuration** > **Services** > **Service Details dialog** > **Integrations tab**

5. From the dropdown select the **Notification Method** as `Pagerduty`.
6. Create a **[Encrytped Text](https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets)** with the name `pagerdutykey` for the **PagerDuty service** you have created above and refernce it in PagerDuty Key as an **Expression**, Harness will send notifications using this key.
    - For example:
    You can reference a secret within the Org scope using an expression with `org`:
    
    ```
    <+secrets.getvalue("org.your-secret-Id")>
    ```
7. Select **finish** and your PagerDuty Notification is created.

```mdx-code-block
</TabItem>
<TabItem value="Microsoft Teams">
```
Follow the detailed instructions [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#microsoft-teams-notifications) on Harness Docs, for creating the Microsoft Teams Notifications.

```mdx-code-block
</TabItem>
<TabItem value="Webhook">
```
:::info

Currently, this feature is behind the feature flag, `PIE_WEBHOOK_NOTIFICATION`. Contact [Harness Support](support@harness.io) to enable the feature.

:::

In Harness you can use Webhook notifications to inform an **external application** of an Pipeline/stage event. 

5. From the dropdown select the **Notification Method** as `Webhook`.
6. Use expressions to compose the URL to be called when the event occurs. For example, `https://companyurl.notify.com/execution=-<+pipeline.executionId>`.

:::note

The expression must be evaluated in the context of the event. For example, stage related expressions may not be valid for pipeline start events.

The webhook call is made as a POST request, and includes a JSON object containing the properties of the triggered event.

:::

7. Select **finish** and your Webhook Notification is created.


```mdx-code-block
</TabItem>
</Tabs>
```

9. Now run the pipeline and you'll recieve notificatons on the platform you set-up the same for. 
