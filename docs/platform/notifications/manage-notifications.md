---
title: Manage delegate notifications
description: This topic describes how to manage notifications for Harness Delegate.
keywords: [Notification Settings, Slack notifications, Microsoft Teams notifications, webhook notifications, PagerDuty notifications, Harness Delegate]
sidebar_position: 2
---

:::info note
Currently, this feature is behind the feature flag `PL_CENTRAL_NOTIFICATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

With the notifications management, you can configure notifications for the delegate events below: 

- Delegate is down 
- Delegate has expired
- Delegate expires in 1, 2, 3, or 4 weeks

## Manage notification rules

You can use notifications management to configure and edit notifications for delegate events from the account, project, or org scope in Harness.

### Add a delegate event notification

You can add delegate event notifications at the account, project, or org scope. In this example, we'll add a new delegate event notification in the account scope.

To add a new delegate event notification, do the following:

1. Sign in to Harness.
2. Select your account.
3. Select **Account Settings**, then select **Account Resources**. The Account Resources page opens.
4. Under **General**, select **Notifications Management**. The Notification Management page opens to the **Rules** tab by default.
5. Select **Setup New Notification**. The **New Notification Setup** wizard opens.

   1. On the **Overview** screen, enter a **Notification Name**, then select **Continue**. The **Resources** screen opens.
   2. Under **Select Resource Type**, **Delegate** is selected for you by default. Additional resources will be available with future development.
   3. Under **Select Delegates**, select the delegate for which you want to set up notifications, then select **Continue**. The **Set Conditions** screen opens. Here, you define the events for which you want to be notified.
   4. Select **Add Condition**. The **Create Condition** dialog opens.
   5. In **Condition Name**, enter a name for your notification condition, for example, `Delegate expires soon`.
   6. Click **Add Events**, and then select the event for which you want to set your notification. In this example, we've selected **About to expire in 2 weeks**.

   :::info note
   You can select multiple events on which to receive notifications. **Added Events** increments with each selection you make.
   :::

   7. Select **Apply**, then select **Continue**. The **Set Channels** screen opens.
   8. Select your **Notification Channels**, then select **Submit**.

   You new notification is added to the Notifications Management page.

### Edit a delegate event notification

You can use notifications management to edit notifications for delegate events from the account, project, or org scope. In this example, we'll edit a delegate event notification in the account scope.

To manage delegate event notifications, do the following:

1. Sign in to Harness.
2. Select your account.
3. Select **Account Settings**, then select **Account Resources**. The Account Resources page opens.
4. Under **General**, select **Notifications Management**. The Notification Management page opens to the **Rules** tab by default.
5. Select **More Options** (&vellip;) corresponding to the notification you want to update, and then select **Edit**. The **Edit Notification Setup** wizard opens. 
6. Edit your notification information on the necessary screen, selecting **Continue** to step through the wizard until you reach the **Set Channels** screen, then select **Submit** to save your changes.

### Delete a delegate event notification

You delete notifications for delegate events from the account, project, or org scope. In this example, we'll delete a delegate event notification in the account scope.

To delete a delegate event notification, do the following:

1. Sign in to Harness.
2. Select your account.
3. Select **Account Settings**, then select **Account Resources**. The Account Resources page opens.
4. Under **General**, select **Notifications Management**. The Notification Management page opens to the **Rules** tab by default.
5. Select **More Options** (&vellip;) corresponding to the notification you want to delete, and then select **Delete**. A confirmation dialog opens.
6. Select **Delete**.

## Manage event notification channels

With notifications management, you can enable or disable notification channels at the account, project, and org scopes.

### Add a new channel

In this example, we'll add a new notification channel in the account scope.

To add a new channel, do the following:

1. Sign in to Harness.
2. Select your account.
3. Select **Account Settings**, then select **Account Resources**. The Account Resources page opens.
4. Under **General**, select **Notifications Management**. The Notification Management page opens to the **Rules** tab by default.
5. Select **Channels**, then select **New Channel**. The **Create Channel** dialog opens.
6. Enter your **Channel Name**.
7. Select the **Channel Type**. You can enable or disable the following notification channels:

   - Slack
   - Email
   - Microsoft Teams
   - PagerDuty
   - Webhooks

8. (Optional). Select **+ Add** to add additional channels.
9. Select **Apply** to save your changes.

### Edit a channel

In this example, we'll edit a notification channel in the account scope.

To edit a channel, do the following:

1. Sign in to Harness.
2. Select your account.
3. Select **Account Settings**, then select **Account Resources**. The Account Resources page opens.
4. Under **General**, select **Notifications Management**. The Notification Management page opens to the **Rules** tab by default.
5. Select **Channels**.
6. Select **More Options** (&vellip;) corresponding to the channel you want to update, and then select **Edit**. The **Edit Channel** dialog opens.
7. Update your channel settings as required, then select **Apply** to save your changes.

