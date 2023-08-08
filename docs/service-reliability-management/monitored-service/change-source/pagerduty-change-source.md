---
title: PagerDuty
description: Configure PagerDuty change source to monitor incidents.
sidebar_position: 10
---

# PagerDuty change source

You can configure PagerDuty as a change source for a monitored service. 


## Add PagerDuty connector to Harness

To add a PagerDuty connector:

1. In your Harness project, navigate to **Projects** > **Connectors** > **+ New Connector**.

2. On the Connectors page, under **Monitoring and Logging Systems**, select **PagerDuty**.

3. On the Overview page, enter a name for the connector, an optional description, and optional tags, and then select **Continue** to go to the Credentials page.

4. Create or select a secret to authenticate Harness with PagerDuty, and select **Next** to go to the Delegates Setup page.

5. Choose one of the following delegate setup options:

   - **Use any available Delegate**: Allows Harness to automatically select a delegate at runtime.

    - **Only use delegates with all of the following tags**: This lets you specify the tags of specific delegates that you want to use. Add the specific delegate by selecting the tags from the dropdown list or entering the delegate tag manually.

7. Select **Save and Continue**. Harness verifies the connection to PagerDuty using the secret you provided.

8. Select **Finish**. The connector gets added to the Project Connects list. 


### Add PagerDuty as change source

To add PagerDuty as a change source:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.
   
2. Locate the monitored service for which you want to add the PagerDuty as the change source, select the three vertical dots next to it, and then select **Edit**.

3. In the **Configurations** tab, under **Define Your Sources**, select **+ Add New Change Source**.
   
4. On the Edit Change Source page, under **Select Change Source**, from the **Provider Type** dropdown, choose **Incident**, and then select the **PagerDuty** icon.

5. Enter a name for the change source.

6. Select the **Select Connector** dropdown. In the Create or Select an Existing Connector dialog that appears, select the **PagerDuty** connector that you have configured with Harness.

7. In the **PagerDuty** field, select a PagerDuty service. You have two options for selecting a service. You can either choose the PagerDuty service from the dropdown list, or you can manually type the service name, search for it, and then select it from the search results.

8. Select **Apply Selected** and then **Submit**.  
   
    PagerDuty is added as a change source. Incidents reported by PagerDuty are displayed on the Service Health page of the monitored service.
   
