---
title: PagerDuty
description: Configure PagerDuty change source to monitor incidents.
sidebar_position: 10
---

# PagerDuty change source

You can configure PagerDuty as a change source in a monitored service. 


## Add PagerDuty connector to Harness

To add a PagerDuty connector:

1. In your Harness project, navigate to **Projects** > **Connectors** > **+ New Connector**.

2. In the Connectors page, under **Monitoring and Logging Systems**, select **PagerDuty**.

3. In the Overview page, enter name for the connector, optional description, and optional tags, and then select **Continue** to go to the Credentials page.
4. Create or select a secret to authenticate Harness with PagerDuty, and select **Next** to go to the Delegates Setup page.

5. Choose one of the following delegate setup options:

   - **Use any available Delegate**: This option allows Harness to automatically select a Delegate at runtime.
   - **Only use Delegates with all of the following tags**: This option lets you specify the tags of specific Delegates to use. Add the specific Delegate by selecting the tags from the dropdown list or entering the delegate tag manually.

6. Select **Save and Continue**. Harness verifies the connection to PagerDuty using the secret you provided.

7. Select **Finish**. The connector gets added to the Project Connects list. 


### Add PagerDuty as change source

To add PagerDuty as a change source:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.
   
2.  Locate the monitored service for which you want to add the PagerDuty as change source, select the three vertical dots next to it, and then select **Edit**.

3.  In the **Configurations** tab, under **Define Your Sources**, select **+ Add New Change Source**.
   
4.  In the Edit Change Source page, under **Select Change Source**, choose **Incident** as **Provider Type**, and then select **PagerDuty**.

5.  Enter a name for the change source.

6.  Select the Select Connector dropdown.

7.  In the Create or Select an Existing Connector dialog, select the **PagerDuty** Connector that you have configured with Harness

8.  Select **Apply Selected** and then **Submit**.

PagerDuty is added as a change source. Incidents reported by PagerDuty are displayed in the Service Health page of the monitored service.