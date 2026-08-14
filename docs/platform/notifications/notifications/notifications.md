---
title: Notifications
description: Configure notification settings for the account.
keywords:
  - Notification Settings
  - Slack notifications
  - Microsoft Teams notifications
  - webhook notifications
  - PagerDuty notifications
  - Datadog notifications
  - email filters
  - platform limit alerts
  - account settings
tags:
  - notifications
  - platform
  - account-settings
sidebar_position: 1
slug: /platform/notifications/notifications-overview
redirect_from:
  - /tutorials/cd-pipelines/notifications
  - /docs/platform/notifications/notification-settings
---

Notification settings allow you to control which notification channels are available across your Harness account. These settings are managed at the **Account** scope and apply to all **Organizations** and **Projects** within the account.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Identify the [notification channels that Harness supports](#supported-notification-channels) at the account level.
- [Enable and disable a notification channel](#manage-notification-channels) for the entire account.
- [Restrict notification recipients](#email-filters) to an allowlist of email domains.
- [Configure email recipients](#emails-for-platform-limit-alerts) for platform resource limit alerts.

---

## Before you begin

Notification settings are managed at the **Account** scope, so confirm the following access and references before you change them.

- Account Admin permissions to manage notification settings.
- Review the <a href="/docs/platform/account-license-limits" target="_blank">platform resource limits</a> if you plan to configure limit alerts.

---

## Supported notification channels

By default, all supported notification channels are enabled. **Organizations** and **Projects** inherit the account-level notification settings and cannot override them.

Harness supports the following notification channels:

- Slack
- Microsoft Teams
- Webhooks
- PagerDuty
- Email
- Datadog

---

## Manage notification channels

Control channel availability at the account level to determine which channels can deliver notifications anywhere in your account.

To enable or disable a notification channel, navigate to **Account Settings** > **Account Resources** > **Default Settings** > **Notifications**, and use the corresponding toggle.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/notification-settings-url-filters.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

When a notification channel is disabled at the account level:

- No notifications are sent through that channel.
- This applies to both existing and newly configured notifications.
- Notifications resume automatically when the channel is enabled.

### Email filters

Email filters allow you to restrict where notifications are sent by enforcing a domain allowlist at the account level. When enabled, notifications are delivered only to email addresses included in the allowlist.

Only fixed domains are supported. Expression-based URLs or dynamic domains are not allowed.

**Example**: If you add `example.com` to the email filters, only email addresses from that domain such as `alerts@example.com` receive notifications.

### Emails for platform limit alerts

:::note Feature Availability
Currently, the platform limit alerts feature is behind the feature flag `PL_ENABLE_LIMIT_ALERTS_NOTIFICATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

You can configure email recipients to receive alerts as your account approaches the default <a href="/docs/platform/account-license-limits" target="_blank">platform resource limits</a>. Email alerts are sent when usage reaches 80%, 95%, and 100% of the allowed limit, giving you visibility and time to act. You can add up to five email addresses to receive these alerts.

Platform limits are enforced at the **Account** level, and these alerts help you proactively manage usage before limits are reached.

#### Platform resource mapping

These variables are used in email notifications to alert users when platform resources are approaching their limits. For more information, see <a href="/docs/platform/account-license-limits" target="_blank">platform resource limits</a>.

| Resource Name    | Resource Variable                                   |
| ---------------- | ------------------------------------------ |
| Organizations    | `MULTIPLE_ORGANIZATIONS`                   |
| Projects         | `MULTIPLE_PROJECTS`                        |
| Secrets          | `MULTIPLE_SECRETS`                         |
| User Groups      | `MULTIPLE_USER_GROUPS`                     |
| Users            | `MULTIPLE_USERS`                           |
| Service Accounts | `MULTIPLE_SERVICE_ACCOUNTS`                |
| Variables        | `MULTIPLE_VARIABLES`                       |
| API Keys         | `MULTIPLE_API_KEYS`                        |
| API Key Tokens   | `MULTIPLE_API_TOKENS`                      |
| Connectors       | `MULTIPLE_CONNECTORS`                      |
| Secret Managers  | `SECRET_MANAGERS`                          |
| Roles            | `CUSTOM_ROLES`                             |
| Resource Groups  | `CUSTOM_RESOURCE_GROUPS`                   |
| Role Bindings    | `ROLE_ASSIGNMENT`                          |
| Audit streaming  | `AUDIT_STREAMING_DESTINATION`              |
| Delegates        | `MULTIPLE_DELEGATES`                       |
| Data Sinks       | `DATA_SINKS`                               |

---

## Next steps

- <a href="/docs/platform/notifications/send-notifications-using-slack" target="_blank">Send notifications using Slack</a>: Send user group notifications through Slack.
- <a href="/docs/platform/notifications/send-notifications-to-microsoft-teams" target="_blank">Send notifications to Microsoft Teams</a>: Send user group notifications through Microsoft Teams.
- <a href="/docs/platform/notifications/add-smtp-configuration" target="_blank">Add SMTP configuration</a>: Configure SMTP for email-based deployment notifications, approvals, and tracking.
