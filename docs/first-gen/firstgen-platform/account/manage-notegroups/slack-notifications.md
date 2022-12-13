---
title: Send Slack Messages from Workflows
description: Send a Slack message at any point in a Workflow.
# sidebar_position: 2
helpdocs_topic_id: 4zd81qhhiu
helpdocs_category_id: fmttl9hxzc
helpdocs_is_private: false
helpdocs_is_published: true
---

You can send a Slack message at any point in a Workflow using a Slack webhook and a Harness Shell Script step.

This simple integration allows you to notify team members at any point in a deployment.

For more advanced integrations, see [Manage User Notifications](notification-groups.md), [Manage Alert Notifications](manage-alert-notifications.md), and [Approvals](../../../continuous-delivery/model-cd-pipeline/approvals/approvals.md).

:::note
For steps on sending all User Group notifications to a Slack channel, see [Send Notifications Using Slack](send-notification-using-slack.md).
:::

In this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Create a Slack App and Webhook for your Channel](#step-1-create-a-slack-app-and-webhook-for-your-channel)
* [Step 2: Add a Shell Script Step using your Webhook](#step-2-add-a-shell-script-step-using-your-webhook)
* [Option: Improve Your Message](#option-improve-your-message)
* [Next Steps](#next-steps)

## Before You Begin

* [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks) from Slack.
* [Using the Shell Script Step](../../../continuous-delivery/model-cd-pipeline/workflows/capture-shell-script-step-output.md)
* [Workflows](../../../continuous-delivery/model-cd-pipeline/workflows/workflow-configuration.md)

## Step 1: Create a Slack App and Webhook for your Channel

Follow the steps in Slack documentation for creating a Slack app, selecting your channel, and creating a webhook: [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks).

When you are done, you'll have a webhook that looks something like this:

![](./static/slack-notifications-23.png)


## Step 2: Add a Shell Script Step using your Webhook

At any place in your Harness Workflow, add a [Shell Script step](../../../continuous-delivery/model-cd-pipeline/workflows/capture-shell-script-step-output.md).

In **Script**, enter the Slack message using your webhook.

Here is a simple example using the cURL command Slack provides in its Incoming Webhooks page.


```
curl -X POST -H 'Content-type: application/json' --data '{"text":"simple cURL command example!"}' https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```
When you deploy the Workflow, the message will look something like this:

![](./static/slack-notifications-24.png)

Here is a more advanced example using bash and Harness [built-in variable expressions](../../techref-category/variables/variables.md):


```
url=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX  
    
payload='  
{  
  "text": "Deployed to *${infra.name}*",  
  "attachments": [  
    {  
      "author_name": "${deploymentTriggeredBy}",  
      "text": "Deployment text",  
      "color": "#00a3e0"  
    }  
  ]  
}'  
    
curl -s -X POST -H "Content-type: application/json" --data "$payload" $url
```
When you deploy the Workflow, the message will look something like this:

![](./static/slack-notifications-25.png)

You can use different variable expressions in your messages. See the following:

* [Passing Variables into Workflows and Pipelines from Triggers](../../../continuous-delivery/model-cd-pipeline/expressions/passing-variable-into-workflows.md)
* [Set Workflow Variables](../../../continuous-delivery/model-cd-pipeline/workflows/add-workflow-variables-new-template.md)
* [Add Service Config Variables](../../../continuous-delivery/model-cd-pipeline/setup-services/add-service-level-config-variables.md)
* [Override a Service Configuration in an Environment](../../../continuous-delivery/model-cd-pipeline/environments/override-service-files-and-variables-in-environments.md)

## Option: Improve Your Message

Slack messages have many formatting and interactive features. You can improve the Slack messages you send from your Workflow using these features.

See the following Slack docs:

* [Creating rich message layouts](https://api.slack.com/messaging/composing/layouts)
* [Creating interactive messages](https://api.slack.com/messaging/interactivity)

## Next Steps

* [Manage User Notifications](notification-groups.md)
* [Manage Alert Notifications](manage-alert-notifications.md)
* [Approvals](../../../continuous-delivery/model-cd-pipeline/approvals/approvals.md)

