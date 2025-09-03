---
title: Slack Notify Step
description: Send notification from pipeline to slack channel
sidebar_position: 5

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the settings for the Slack Notify step available in Continuous Delivery (CD) and custom stages.

The Slack Notify step lets you easily send notifications to slack channel and slack threads during a pipeline execution.

## Step-by-Step Guide

<Tabs>
<TabItem value="Interactive guide">

<iframe 
    src="https://app.tango.us/app/embed/230e7552-81fa-4a42-9baa-3a11100ef8ad" 
    style={{ minHeight: '800px'}}  
    sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
    security="restricted" 
    title="Setting Up Slack Notifications in Harness Pipeline" 
    width="100%" 
    height="100%" 
    referrerpolicy="strict-origin-when-cross-origin" 
    frameborder="0" 
    webkitallowfullscreen="webkitallowfullscreen" 
    mozallowfullscreen="mozallowfullscreen" 
    allowfullscreen="allowfullscreen"></iframe>


</TabItem>

<TabItem value="Step-by-step guide">


**Setting Up a Slack Notify Step**

Follow the steps below to set up a Slack notify step:

1. **Create Pipeline**  
   - Click on **Create Pipeline** and type in your pipeline name.

2. **Add Stage**  
   - Click on **Add Stage**. You can select any stage as this step is available across stages.

3. **Navigate to Execution Tab**  
   - Within the stage, go to the **Execution** tab.

4. **Add a Step Group**  
   - Add a step group.
   - Enable **Container Based Execution** by setting it to `true`.
   - Select a **Kubernetes Cluster**.
   - Save the step group.

5. **Add Slack Notify Step**  
   - Within the step group, add a step.
   - Select **Slack Notify** under **Miscellaneous**.

6. **Configure Slack Notify Step**  
   - Select the **Channel** checkbox or the **Email** checkbox.
   - For sending notifications to a channel, provide the channel details where you want your message to be published.
   - For sending notifications to an email address, provide the email details where you want your message to be published.
   - Optionally, send a custom text message or a Slack block.
   - Under **Slack Secret Key**, create or select your Slack secret key.
   - Optionally, specify the thread in which you want the notification to be received.

7. **Save and Run**  
   - Save your pipeline configuration and run the pipeline.


</TabItem>
</Tabs>

:::note
The Slack Notify step **can be added in any stage**, but it is **only available within a step group**.
:::

## Types of Recipients Supported:

- **Email**: The email address associated with the Slack account. This can be used to send notifications to a specific recipient.
- **Channel**: The channel where the notification is to be sent. Provide the **channel-id** of the channel.

## Types of Messages Supported:

- **Message**: A plain text format. This can be a fixed value, runtime input, or an expression.
- **Block**: You can send Slack Block notifications. Ensure that the block is enclosed in an array. For more information on Slack Blocks, refer to [Slack documentation](https://api.slack.com/reference/block-kit/blocks#header).

<details>
<summary>Sample Block Message</summary>

```
[{
    "type": "header",
    "text": {
        "type": "plain_text",
        "text": "This is a Header block"
        }
}]
```
This block will send the notification This is a Header block in heading 1 format to the recipient.

</details>

## Sending Notifications to a Specific Thread in a Channel
To send notifications to a specific **thread**, provide the `thread_ts` details under Thread. For more information on how to get **thread_ts** details, refer to [Slack documentation](https://api.slack.com/methods/conversations.replies#:~:text=Conversation%20ID%20to%20fetch%20thread%20from.&text=Unique%20identifier%20of%20either%20a,just%20an%20ordinary%2C%20unthreaded%20message.)

**YAML example**

<details>
<summary>Sample YAML describing the Slack Notify Step</summary>

```
stages:
    - stage:
        name: slack-step
        identifier: slack-step
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - stepGroup:
                  name: container
                  identifier: container
                  steps:
                    - step:
                        type: SlackNotify
                        name: SlackNotify_1
                        identifier: SlackNotify_1
                        spec:
                          channel: CHANNEL_ID
                          messageContent: <+input>
                          token: SLACK_TOKEN
                          threadTs: THREAD_ID
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: KUBERNETES_DELEGATE
                      namespace: NAMESPACE
            rollbackSteps: []
          serviceDependencies: []
        tags: {}
```

</details>

Upon a successful pipeline run, the message you configured in the Slack Notify step will be sent to the designated Slack channel or recipient.

![Execution](./static/slack-notify.png)

## Slack Notify Step Sample 

To see an example of how to deploy Slack Notify Step in Harness, visit the [Harness Community Repository](https://github.com/harness-community/harnesscd-example-apps/tree/master/cd-features/slack-notify-step).

This repository provides a ready-to-use sample application and the necessary configuration files to help you get started quickly.
