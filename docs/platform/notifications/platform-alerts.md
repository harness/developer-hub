---
title: Platform alerts
description: Learn how Harness platform alerts work, what types exist, and how to control who receives them in your account.
sidebar_position: 4
---

Resource limits can block workflows without warning, and release changes can go unnoticed until they affect your application.
Platform alerts could prevent this by notifying you directly in the Harness UI, with no external channels or configuration required.

Harness sends these platform alerts automatically for events such as:
- A new release deploying to your account
- A resource limit you are approaching

Unlike platform alerts, <a href="/docs/platform/notifications/centralised-notification">notifications</a> are configured based on rules for resources such as pipelines, delegates, and GitOps applications.

:::note Feature Availability
Currently, the platform alerts feature is behind the feature flag `PL_ENABLE_IN_APP_ALERTS`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

---

## What will you learn by the end of this topic?

By the end of this topic, you will know how to:

- [Distinguish platform alerts from notifications](#platform-alerts-vs-notification-rules).
- [Identify alert categories](#platform-alert-categories), and know which ones affect you.
- [View](#view-platform-alerts) and [manage](#manage-platform-alerts) your alerts.

---

## Before you begin

Before you [configure platform alerts](#configure-platform-alerts), ensure you have a Harness account with permissions to view and edit platform alerts.

---

## Platform alerts vs. notifications


| | Platform alerts | Notifications |
|---|---|---|
| **Triggered by** | Harness (automatically) for platform events such as releases, resource limit breaches | Rules configured for resources such as pipelines, delegates, etc,. |
| **Delivered via** | Harness UI (in-app) | External channels such as Slack, email, PagerDuty, MS Teams |


## Platform alert categories

Platform alerts are grouped into categories. Each category describes the type of event that triggered the alert. Harness currently supports the following **System** alert categories and will expand this list as new alert categories are added.

- **Resource Utilization:** These alerts are triggered when your account has reached a [platform resource limit](/docs/platform/account-license-limits/) (for example, Feature Flags, Secrets, Pipelines).

- **Major SaaS Release:** These alerts are triggered when Harness [deploys a new version](https://developer.harness.io/release-notes/) to your account.

If you have the permissions to edit these system alerts, you can [configure these alert categories](#configure-platform-alerts). By default, **all alert categories are enabled** and visible to all users in the account.

---

## View platform alerts

Alerts are sent to your alerts inbox. To access your alerts inbox, look for the **bell icon** in the left sidebar, above the **Help** option.

- Select **Alerts** to open the **alerts popover**. The popover gives you a quick-access view of your most recent alerts without leaving your current page.

  <DocImage path={require('./static/alert-inbox-1.png')} alt="Alerts popover showing unread alerts in the Harness left sidebar" title="Click to view full size image" />

- Select an alert to open the full detail view. This automatically marks it as read and shows the alert's context.

- You can also view the alerts from your user profile menu's inbox. To view your alerts inbox, go to your User Profile Menu -> **Inbox**.

  <DocImage path={require('./static/view-inbox-1.png')} alt="System alerts types" title="Click to view full size image" />


- Go to your **User Profile menu**, select **Inbox** and select **Show All** at the bottom of the popover to view all alerts.

### Clear unread alerts

Select **Mark all as read** to mark all unread alerts as read.

  <DocImage path={require('./static/show-all.png')} alt="Alerts popover showing unread alerts in the Harness left sidebar" title="Click to view full size image" />

### Filter inbox

To filter alerts, select **Alerts** -> **Show All** and use the filters at the top. You can filter by **Group** and **Modules**.

  <DocImage path={require('./static/filter-1.png')} alt="Inbox filter options including show only unread, by type, and by module" title="Click to view full size image" />

---

## Manage platform alerts

Any user with the permissions to edit platform alert settings can control which alert categories are active and who receives them. This permission is assigned to Account Admins by default but can be granted to custom roles.

For each category, a user with appropriate permissions can:

- **Enable alerts for all users**: Everyone in the account sees these alerts. 
- **Restrict to specific users/user groups**: Only selected users/user groups can view these alerts. 

### Configure platform alerts

To limit the alerts to specific user(s) / user group(s), follow the steps below:

1. Go to your Harness account -> **Account Settings** -> **Platform Alerts**.

    <DocImage path={require('./static/config-alerts-0.png')} alt="Configure alerts" title="Click to view full size image" />

2. Based on the system alert you want to limit to specific user(s) / user group(s), select the corresponding button on the extreme right. This button shows the current user configuration.

    <DocImage path={require('./static/system-alerts.png')} alt="System alerts types" title="Click to view full size image" />

3. Select the user(s) and user group(s) you want to add, and click **Save**.

    <DocImage path={require('./static/configure-alerts.png')} alt="Configure alerts" title="Click to view full size image" />

---

## Disable platform alerts

1. To disable platform alerts, go to your account, select **Account Settings** -> **Default Settings** -> **Notifications**. 

2. Disable the **Platform Alerts** button and click **Save**.

    <DocImage path={require('./static/default-settings.png')} alt="System alerts types" title="Click to view full size image" />


---

## Platform alert retention

Harness retains alerts in your Inbox for **90 days**. After that, they are no longer visible in your alert list. New alerts always appear at the top of the inbox.

---


## Related articles

- <a href="/docs/platform/notifications/notification-settings" target="_blank">Notification settings</a>: Learn how to configure additional notification channels like email and Slack.
- <a href="/docs/platform/notifications/centralised-notification" target="_blank">Centralised notifications</a>: Understand how to set up event-based rules for pipeline and resource notifications.
- <a href="/docs/platform/account-license-limits" target="_blank">Account license limits</a>: Understand platform resource limits and avoid hitting them unexpectedly.
