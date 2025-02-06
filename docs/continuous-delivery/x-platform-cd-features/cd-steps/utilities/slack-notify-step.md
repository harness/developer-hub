---
title: Slack Notify Step
description: Send notification from pipeline to slack channel
sidebar_position: 5

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the settings for the Slack Notify step available in Continuous Delivery (CD) and custom stages.

The Slack Notify step lets you easily send notifications to slack channel and slack threads during a pipeline execution.

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
   - Select the **Channel checkbox**.
   - Provide the channel details where you want your message to be published.
   - Optionally, send a custom text message or a JSON block.
   - Under **Slack Secret Key**, create or select your Slack secret key.
   - Optionally, specify the thread in which you want the notification to be received.

7. **Save and Run**  
   - Save your pipeline configuration and run the pipeline.


</TabItem>
</Tabs>

The Slack Notify step **can be added in any stage**, but it is **only available within a step group**.

Please ensure you have the necessary **write permissions** for your Slack token.

On a successful run of the pipeline, you will receive the message you posted in the Slack channel.

![Execution](./static/slack-notify.png)