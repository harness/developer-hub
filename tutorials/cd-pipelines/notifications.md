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
7. Now additionally you can use the **user-group** created above, if it is associated with the slack channels to send notifications. 
8. Select **finish** and your Notification is created. 

```mdx-code-block
</TabItem>
<TabItem value="PagerDuty">
```

```mdx-code-block
</TabItem>
<TabItem value="Microsoft Teams">
```

```mdx-code-block
</TabItem>
<TabItem value="Webhook">
```

```mdx-code-block
</TabItem>
</Tabs>
```


