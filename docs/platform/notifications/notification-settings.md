---
title: Notification settings
description: Configure notification settings for the account.
keywords: [Notification Settings, Slack notifications, Microsoft Teams notifications, webhook notifications, PagerDuty notifications]
sidebar_position: 1
---

With notification settings, you can enable or disable notification channels at an account level. By default, all notification channels are enabled on an account. Organizations and projects in the account inherit the account-level settings.

When a notification channel is in the disabled state, no notification is sent for that channel, whether existing or new, until you enable the channel again.

You can enable or disable the following notification channels:
- Slack
- Microsoft Teams
- Webhooks
- PagerDuty

To disable a given notification channel, in Harness, go to **Account Settings** > **Account Resources** > **Default Settings** > **Notifications**, and then turn off the corresponding toggle. 

With notification settings, you can add domain allowlists for notification channels at the account level. This feature enables you to specify fixed URL domains to which notifications can be sent. Expression URLs are not yet supported.

To add a domain filter to a notification channel, navigate to **Account Settings** > **Account Resources** > **Default Settings** > **Notifications** in the Harness platform and add the fixed URL domain to the corresponding notification setting.

You can add domain filter to the following notification channels:
- Email
- Slack
- Microsoft Teams
- Webhooks
- PagerDuty

Once a domain is added to a notification channel's domain allowlist, no notifications will be sent to recipients whose domains are not present in the allowlist for that channel. This applies to both existing and new recipients until their domain is added to the channel's domain allowlist.
