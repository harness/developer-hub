---
title: SLO notifications
description: Notify your team on error budget status.
sidebar_position: 20
---

Set up notifications for SLOs' error budget to keep your team informed about the remaining percentage and minutes, as well as the burn rate. With these alerts, you can ensure that your team is aware of any changes in your service's performance and take appropriate action as needed.


To set up notifications for a SLO:

1. In your Harness project, navigate to **Service Reliability Management** > **SLOs**, and then select the SLO to set up notification.

2. In the SLO page, go to the **Configuration** tab, and under **Error Budget Policy (Optional)**, select **+ New Notification Rule**.

3. In the New Notification wizard, do the following:
   
   1. Enter a name for the notification and select **Continue**.

   2. In the Conditions page, you can set the following conditions to trigger a notification:

      * Error budget remaining percentage reaches a specified value.
      * Error budget remaining minutes reaches a specified value.
      * Error budget burn rate is above a specified value.

      You can add multiple conditions.

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

   6. Select **Finish** to save the settings. You should now see the notification rule displayed in the **Error Budget Policy (Optional)** section.

4.  Enable the notification rule using toggle switch associated with it to start receiving alert notifications.