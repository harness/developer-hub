---
title: Customised notification template for Pipeline
description: Configure notification template for pipeline
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info note
Currently this feature is behind Feature Flag: `PIPE_CUSTOM_NOTIFICATION_TEMPLATES`
However, since this is supported for centralised notification, we need `PL_CENTRAL_NOTIFICATIONS` and `PIPE_CENTRALISED_NOTIFICATION` to be enabled first.
:::

Users can now create notification templates, allowing users to customize notification content and reuse templates across multiple pipelines. Templates support Pipeline Expressions and RBAC controls, ensuring flexibility and security.

We are going to discuss about setting up notificatio template for Pipeline at a given scope. 

You can set up notification template for Pipeline at following [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes): **Account**, **Organization** and **Project Level**. 

## Setting Up Notifications Template

:::info note
1. Custom Notification template will work only with Centralized Notifications. 
2. Custom Notification templates will work only for webhook notifications.
3. Custom notiification templates don't support usage of template variables.
:::

<Tabs>
<TabItem value="Interactive guide">
<iframe src="https://app.tango.us/app/embed/fc86f283-ef3a-4199-88a1-8de92b845754" style={{ minHeight: '800px' }} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Creating a Notification Template in Harness" width="100%" height="100%" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
</TabItem>

<TabItem value="Step-by-step">
In this example, we are going to discuss setting up notification template for Pipeline at Project Level:-

1. In your Harness, go to your project.
2. Select **Project Settings**, then, under **Project-level resources**, select **Templates**.
3. Select **+ New Template**, and then select **Notifications**. The **Create New Notifications Template** settings open.
4. In **Name**, enter a name for the template.
5. (Optional) Select the pencil icon to enter a **Description**.
6. (Optional) Select the pencil icon to add **Tags**.
7. In **Version Label**, enter the version of the template, for example, `v1`. Versioning a template enables you to create a new template without modifying the existing one. For more information, go to [Versioning](template.md).
8. In Text Type you can choose text type as **HTML**, **JSON**, **YAML** or **String** for content body.

![](./static/notification-template-1.png)


9. When you select text type as per your need you will be asked to provide the body of notification template.

![](./static/notification-template-3.png)

10. Click on **Save**.

Now, let's add this notification template to a notification rule:-

1. In this example, we are going to discuss setting up notification management of Pipeline resource at Project Level:-

1. In Harness, go to **Organization Settings**.
2. Under **General**, select **Notifications Management**. 
3. Under **Overview**, provide **Notification Name** and **Continue** to select Resource type.
4. Under **Resources**, Select Resource Type as **Pipeline**. 
5. Under **Condition** , select **+ Add Condition** to define pipeline events based on which you want to be notified.

Under events you can select the following **pipeline events**:-

1. Pipeline Start
2. Pipeline Success
3. Pipeline Failed
4. Stage Start
5. Stage Success
5. Stage Failed

:::info note
Stage start/success/failed events will apply to all stages within a pipeline. There is no option to configure notifications for specific stages, if you want to do that you can configure it via [Pipeline level notification](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events.md).
:::

Under **Create Condition** provide, Condition Name and **Select Pipeline Events**. Click on **Continue** to set channel where you want to send the notification.

6. Under **Notification Templates**, select your Notification template and select **Use Template** and click on **Continue**.

7. Under **Set Channels**, **Select Channels** where you want notification to be sent.

Under **Select Channel** you can chose the already created channel at that scope or you can create a [**New Channel**](/docs/platform/notifications/notification-settings.md).


8. Select **Submit** to save your notification configuration.


You can also view **Referenced By** in your Notification Template to see notification rule it is attached to.

![](./static/notification-referenced-by.png)

You can also check audit trail events for notification template created. 

![](./static/notification-template-audit.png)


</TabItem>
</Tabs>

## YAML Structure

YAML of notification template will look like:-

:::info note
You can choose text type for your content body as **HTML**, **JSON**, **YAML** or **String**.
:::

```yaml
template:
  name: Notification_template
  identifier: Notification_template
  versionLabel: v1
  type: Notification
  projectIdentifier: Krishika_test
  orgIdentifier: default
  tags: {}
  spec:
    body:
      type: JSON
      content: |-
        {
                "pipeline name" : "<+pipeline.name>",
                "stage Name" : "<+stage.name>",
                "service Name" : "deploy_azure_function",
                "status" : "<+pipeline.status>"
         }
```