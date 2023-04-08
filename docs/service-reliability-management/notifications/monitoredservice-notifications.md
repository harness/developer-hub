---
title: Monitored service notifications
description: Notify your team about any changes to your monitored service.
sidebar_position: 10
---

You can configure notifications for monitored services. Your team will receive alerts whenever there are modifications made to a service's code, configuration, behavior, deployment, or infrastructure. These notifications can help your team stay up to date and ensure that any problems are resolved promptly.


To set up notifications for a monitored service:

1. In your Harness project, navigate to **Service Reliability Management** > **Monitored Services**, and then select the monitored service to set up notification.

2. In the monitored service details page, go to the **Configuration** tab, and under **Notifications**, select **+New Notification Rule**.

3. In the New Notification wizard, do the following:
   
   1. Enter a name for the notification and select **Continue**.

   2. In the Conditions page, select a condition to trigger a notification. You can add multiple conditions. The table below describes various conditions that you can set:

     | Condition | Settings    |
     | ---------- | --- |
     | **Change Impact**     |    Choose a **Change Type**, such as deployment, infrastructure, or incident. A notification will be triggered when its **health score falls below** a certain value. |
     | **Health Score**          |   Set a threshold value for the overall health score and a duration. A notification will be sent when the overall health score remains below the threshold value for the specified duration of time.   |
     | **Change Observed**       |  Choose a **Change Type**. A notification is sent whenever changes are detected for that change type.   |
     | **Code Errors**      |   Choose the desired **Events**, such as new, critical, or resurface events, and the **Event Type**, such as log errors. A notification will be triggered when an event of the selected type occurs.  |
   
   3. Select **Next** to go the Notification Method page.
   
   4. Select a **Notification Method** such as Slack, Email, PagerDuty, or Microsoft Teams and complete the following settings:
   
     | Notification Method | Settings |
     | ------------------- | -------- |
     | **Slack**               |    Enter the **Slack Webhook URL** to which the notification should be sent.   |
     | **Email**               |    Enter the email addresses to which the notifications should be sent.      |
     | **PagerDuty**           |    Enter the PagerDuty account or service key to the notifications should be sent.   |
     | **Microsoft Teams**     |    Enter the **Microsoft Teams Webhook URL(s)** to which the notifications should be sent. You add multiple Micorsoft webhook URLs by selecting **+ Add**.     |

      If you choose Slack, PagerDuty, or Microsoft Teams as your notification method, you can select a Harness user group that is part of a Harness project, organization, or an account. Notifications are sent to the Slack or Microsoft Teams channels that are associated with the selected user group.

      To create a new user group, click on **Select User Group(s)** and then **+ User Group**. In the New User Group dialog, enter name for the group, an optional **description** and **tags**, and then **Add Users**. Select **Save**. The new user group appears in the user groups list.
   
   5. Select **Test** to verify that the alert is functioning correctly.

   6. Select **Finish** to save the settings. You should now see the notification rule displayed in the **Notifications** section. 

4.  Enable the notification rule using toggle switch associated with it to start receiving alert notifications.