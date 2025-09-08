---
title: Set up Notifications for Exemptions
description: Set up notifications for STO exemption events.
sidebar_label: Notifications for Exemptions
sidebar_position: 63
--- 


The STO module is integrated with the [Harness Platform's notification system](/docs/platform/notifications/notification-settings/) to keep you informed about key events in the lifecycle of an issue exemption. You can configure notification rules to send alerts to individuals or groups via various channels like **Email**, **Microsoft Teams**, **Slack**, **PagerDuty**, or **Webhook**. You can set up notifications for the following events:

- [Notify on Exemption Requested](#exemption-requested)
- [Notify on Exemption Status Changed](#exemption-status-changed)

:::note
To use this feature, you need to have two feature flags enabled:

- **`PL_CENTRAL_NOTIFICATIONS`**: This flag enables the central notification system on the Harness Platform.
- **`STO_EXEMPTION_NOTIFICATION`**: This flag enables STO exemptions support within the notification system.

If you’d like to use this feature, please contact [Harness Support](mailto:support@harness.io) to enable these flags for your account. 
:::

## How to Configure Notifications for Exemption Events

To start receiving notifications for STO exemptions, you need to configure **[Notification Channels](#configure-notification-channels)** and **[Notification Rules](#configure-notification-rules)**. They can be set up at the **Project**, **Organization**, or **Account** level.

### Configure Notification Channels

Channels are the delivery methods for your notifications. You can use existing channels or create new ones.

1. Navigate to the desired scope (**Project**, **Organization**, or **Account**) and select **Settings**.
2. Select **Notifications Management**.
3. Go to the **Channels** tab.

For detailed instructions on setting up different channel types, go to the Harness Platform documentation on [Notification Settings](/docs/platform/notifications/notification-settings/#configure-new-channels-to-sent-notification).

### Configure Notification Rules

Once you have your channels, you can create rules to trigger notifications for specific STO events.

1. In **Notifications Management**, go to the **Rules** tab.
2. Select **New Notification Rule**.
3. Enter a **Name** for your rule (e.g., "STO Pending Exemption Alerts").
4. Under **Select Resource Type**, choose **Security Test Exemptions** from the dropdown menu.
5. Depending on the scope you're in, you can select specific **Organizations** or **Projects**. You can also choose to apply the rule to all.   
:::warning
Users can be notified about exemption events even if they do not have direct access to the project where the event occurred. Ensure your notification channels are configured for the appropriate audience.
:::
6. Under **Conditions**, select **Add Condition**.
7. Enter a **Condition Name** and select one or more events from the **Add Events** dropdown:
   - `Security Test Exemption Requested`: Triggers when a new exemption is requested. See the [Exemption Requested](#exemption-requested) section for details.
   - `Security Test Exemption Status Changed`: Triggers when an exemption is approved or rejected. See the [Exemption Status Changed](#exemption-status-changed) section for details.

<DocImage path={require('./static/notification-events.png')} width="60%" height="60%" title="Notification Events" />

8. Click **Apply** and then **Continue**.
9. In the **Notification Method** section, choose the channel(s) where you want to send the alerts.
10. Click **Submit**.

You have now successfully created a notification rule for STO exemptions.

## Supported Exemption Events

You can trigger notifications for the following STO exemption events. For details on how to set these up, see the [configuration section](#how-to-configure-notifications-for-exemption-events).

### Exemption Requested

This notification is sent when an exemption is requested for a security issue. The event name in the notification rule is `Security Test Exemption Requested`. This event is triggered in the following scenarios:
- A user creates a new exemption request for an issue. The exemption request is in the `Pending` state.
- A user resubmits a previously `Rejected` or `Expired` exemption for re-approval. The exemption's status is reset to `Pending`.

This notification is useful for alerting security teams or designated approvers that a new exemption request requires their review.

<details>
<summary>Example: Exemption Requested Notification</summary>

Below is an example of a Slack notification for a new exemption request.

<DocImage path={require('./static/exemptions-notification-exemption-requested.png')} width="60%" height="60%" title="Exemption Requested Notification" />

**Notification Fields Explained:**

- **Issue Title**: The title of the vulnerability for which the exemption is requested.
- **Severity**: The severity level of the issue (e.g., High, Critical).
- **Scan Tool**: The security scanner that detected the issue.
- **Org / Project**: The Harness organization and project where the issue was found.
- **Scope**: Requested scope for the exemption (e.g., Target, Pipeline, Project).
- **Requester**: The email address of the user who requested the exemption.
- **Expiration**: The requested duration for the exemption (e.g., 30 days).
- **Reason**: The justification provided by the requester for the exemption.

</details>

### Exemption Status Changed

This notification is sent when the status of an exemption request changes. The event name in the notification rule is `Security Test Exemption Status Changed`. This event is triggered when an approver takes action on an exemption request:
- The exemption request is **Approved**.
- The exemption request is **Rejected**.
- The exemption request is **Expired**.

This notification helps keep the original requester and other stakeholders informed about the outcome of the review process. For example, a developer can be notified immediately when their exemption request has been approved, allowing them to proceed with their work.

<details>
<summary>Example: Exemption Status Changed Notification</summary>

Below is an example of a Slack notification for a change in an exemption's status.

<DocImage path={require('./static/exemptions-notification-status-change.png')} width="60%" height="60%" title="Exemption Status Changed Notification" />

**Notification Fields Explained:**

- **Issue Title**: The title of the vulnerability associated with the exemption.
- **Severity**: The severity level of the issue.
- **Scan Tool**: The security scanner that detected the issue.
- **New Status**: The updated status of the exemption (e.g., Approved, Rejected).
- **Org / Project**: The Harness organization and project where the issue was found.
- **Scope**: The scope at which the exemption request was approved.
- **Requester**: The email address of the user who originally requested the exemption.
- **Approver**: The email address of the user who approved or rejected the request.
- **Expiration**: The date and time when the exemption will expire.
- **Reason**: The original justification provided for the exemption.

</details>
