---
title: Custom incident
description: Configure a custom change source to monitor incidents.
sidebar_position: 40
---

# Custom incident change source

With Harness' custom incident change source feature, you can easily integrate a monitored service with any incident monitoring tool that supports webhook URLs or cURL commands. 

You just need to add a custom change source to the monitored service and configure the incident monitoring tool using the webhook URL or cURL commands.


## Add an incident custom change source

To add an incident custom change source to a monitored service:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.

2. Locate the monitored service for which you want to add a custom change source, select the three vertical dots next to it, and then select **Edit service**.  
   The Configurations page appears.

3. Go to the **Service** tab, and under **Define Your Sources**, select **+ Add New Change Source**.  

4. In the Edit Change Source page, under **Select Change Source**, choose **Incident** as **Provider Type**, and then select **Custom**.

5. Enter a name for the change source.

6.  Select **Submit**.  
    The custom incident change source gets added to the monitored service. A webhook URL and cURL commands are generated.

    ![Add custom change source](./static/custom-change-source-add-change-source.png)


## Copy webhook and cURL command

You need a webhook or cURL commands to configure your custom change source so that it can send events to the Harness monitored service.

To copy the webhook URL or cURL commands from the monitored service:
1. From the list of monitored services, select the monitored service to which you have added the custom incident change source, and then go to the **Configuration** tab.  

2. On the **Service** page, in the **Define Your Sources** section, you will see a list of change sources that have been added to the monitored service. The list also displays webhook URLs and cURL commands next to each change source.

![Copy webhook URL and cURL](./static/custom-change-source-copy-webhook.png)

3. Locate the custom incident change source that you want to configure, and then copy the webhook URL or cURL commands.


## Configure your change source

Based on how your change source works, configure it to send events to the Harness monitored service using a webhook URL or cURL commands.

The change events sent by your change monitoring system are displayed on the **Service Health** page of the Harness monitored service. This helps you identify recent incidents in your service around the time performance deteriorated.