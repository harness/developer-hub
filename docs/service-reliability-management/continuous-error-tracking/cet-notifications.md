---
title: Notifications
description: Notify your team when an event occurs.
sidebar_position: 50
---

# CET notifications

Set up notifications for new, resurfaced, or critical events. These events can include exceptions, log events, or custom events.
With these alerts, you can ensure that your team is aware of important events and take appropriate action as needed.

To set up notifications in CET:

1. In your Harness project, navigate to **Service Reliability Management** > **Monitored Services**, and then select the monitored service to set up notification.

2. In the monitored service details page, go to the **Configuration** tab, and under **Notifications**, select **+New Notification Rule**.

3. In the New Notification wizard, do the following:
   
   1. Enter a name for the notification and select **Continue**.

   2. In the Conditions page, select **Code Errors** in the **Condition** dropdown, choose the desired **Events** (such as new, critical, or resurface events), and the **Event Type** (such as log errors). You can choose multiple events and event types.
   
   3. Optionally you can add multiple conditions by selecting **+ Add Condition**.
   
   4. Select **Next** to go the Notification Method page.
   
   5. Select a **Notification Method** such as Slack or Email and complete the following settings:
   
        | Notification Method | Settings |
        | ------------------- | -------- |
        | **Slack**               |    Enter the **Slack Webhook URL** to which the notification should be sent.   |
        | **Email**               |    Enter the email addresses to which the notifications should be sent.      |

        If you choose Slack as your notification method, you can select a Harness user group that is part of a Harness project, organization, or an account. Notifications are sent to the Slack channels that are associated with the selected user group.

        To create a new user group, click on **Select User Group(s)** and then **+ User Group**. In the New User Group dialog, enter name for the group, an optional **description** and **tags**, and then **Add Users**. Select **Save**. The new user group appears in the user groups list.
   
   6.  Select **Test** to verify that the alert is functioning correctly.

   7.  Select **Finish** to save the settings. You should now see the notification rule displayed in the **Notifications** section. 
   
   8. Enable the notification rule using toggle switch associated with it to start receiving alert notifications.

