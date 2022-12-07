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

For more advanced integrations, see [Manage User Notifications](/article/kf828e347t-notification-groups), [Manage Alert Notifications](/article/rt7zvmzlgx-manage-alert-notifications), and [Approvals](/article/0ajz35u2hy-approvals).

For steps on sending all User Group notifications to a Slack channel, see [Send Notifications Using Slack](/article/4blpfqwfdc-send-notification-using-slack).In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Create a Slack App and Webhook for your Channel](#step_1_create_a_slack_app_and_webhook_for_your_channel)
* [Step 2: Add a Shell Script Step using your Webhook](#step_2_add_shell_script_step_using_your_webhook)
* [Option: Improve Your Message](#option_improve_your_message)
* [Next Steps](#next_steps)

### Before You Begin

* [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks) from Slack.
* [Using the Shell Script Step](/article/1fjrjbau7x-capture-shell-script-step-output)
* [Workflows](/article/m220i1tnia-workflow-configuration)

### Step 1: Create a Slack App and Webhook for your Channel

Follow the steps in Slack documentation for creating a Slack app, selecting your channel, and creating a webhook: [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks).

When you are done, you'll have a webhook that looks something like this:

![](https://files.helpdocs.io/kw8ldg1itf/articles/4zd81qhhiu/1589479083422/image.png)### Step 2: Add a Shell Script Step using your Webhook

At any place in your Harness Workflow, add a [Shell Script step](/article/1fjrjbau7x-capture-shell-script-step-output).

In **Script**, enter the Slack message using your webhook.

Here is a simple example using the cURL command Slack provides in its Incoming Webhooks page.


```
curl -X POST -H 'Content-type: application/json' --data '{"text":"simple cURL command example!"}' https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```
When you deploy the Workflow, the message will look something like this:

![](https://files.helpdocs.io/kw8ldg1itf/articles/4zd81qhhiu/1589477832229/image.png)Here is a more advanced example using bash and Harness [built-in variable expressions](/article/9dvxcegm90-variables):


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

![](https://files.helpdocs.io/kw8ldg1itf/articles/4zd81qhhiu/1589478107071/image.png)You can use different variable expressions in your messages. See the following:

* [Passing Variables into Workflows and Pipelines from Triggers](/article/revc37vl0f-passing-variable-into-workflows)
* [Set Workflow Variables](/article/766iheu1bk-add-workflow-variables-new-template)
* [Add Service Config Variables](/article/q78p7rpx9u-add-service-level-config-variables)
* [Override a Service Configuration in an Environment](/article/4m2kst307m-override-service-files-and-variables-in-environments)

### Option: Improve Your Message

Slack messages have many formatting and interactive features. You can improve the Slack messages you send from your Workflow using these features.

See the following Slack docs:

* [Creating rich message layouts](https://api.slack.com/messaging/composing/layouts)
* [Creating interactive messages](https://api.slack.com/messaging/interactivity)

### Next Steps

* [Manage User Notifications](/article/kf828e347t-notification-groups)
* [Manage Alert Notifications](/article/rt7zvmzlgx-manage-alert-notifications)
* [Approvals](/article/0ajz35u2hy-approvals)

