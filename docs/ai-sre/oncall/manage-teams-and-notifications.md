---
title: Manage Teams and Notifications
description: Define team structures, configure notification channels, and set up team-based routing in Harness AI SRE.
sidebar_label: Manage Teams & Notifications
sidebar_position: 6
---

# Manage Teams and Notifications

Teams are the organizational unit that ties schedules, escalation policies, and alert routing together. 

As an administrator, you'll define team structures, configure notification channels, and set up team-based routing rules.

## Define Team Structures

1. Navigate to **On-Call** → **Teams**.
2. Click **Create Team**.
3. Configure the team:
   - **Name** — A clear team name (e.g., "Payments", "Platform Infrastructure").
   - **Members** — Add team members who will participate in on-call rotations.
   - **Responsibilities** — Assign the services this team owns.
4. Click **Save**.

Once a team is created, you can attach on-call schedules, escalation policies, and alert rules to it.

## Configure Notification Channels

AI SRE supports multi-channel notifications to ensure pages reach responders reliably. As an administrator, you configure which channels are available at the organization level:

- **Email** — Enabled by default for all users.
- **Slack** — Available automatically when your organization's Slack workspace is connected via the AI SRE integration. See [Integrate Collaboration Tools](/docs/ai-sre/get-started/onboarding-guide-admins/#1-integrate-your-collaboration-and-monitoring-tools).
- **SMS and Phone** — Currently supports US phone numbers. Per-organization customization for international numbers may be available — contact your Harness representative.
- **Mobile push notifications** — Available when team members install the Harness On-Call app ([Google Play](https://play.google.com/store/apps/details?id=com.harness.aisre) | [App Store](https://apps.apple.com/us/app/harness-on-call/id6753579217)).

Individual team members configure their own contact preferences from the On-Call menu. As an administrator, your role is to ensure the organizational integrations (Slack, SMS/phone provider) are in place.

### Set Up Custom Notification Rules

You can configure notification behavior per team or per individual:

- **Notification delays** — Add a short delay before sending to allow for smart batching of related alerts.
- **Channel preferences** — Define which channels are used for different severity levels (e.g., SMS + phone for critical, Slack + email for warning).

## Set Up Team-Based Routing

Team-based routing ensures that alerts for a given service reach the correct team's on-call responder:

1. **Map services to teams** in the [service directory](./integrate-service-directory.md).
2. **Create alert rules** that route alerts for those services to the team's [escalation policy](./define-escalation-policies.md).
3. **Attach schedules** to the escalation policy so the system knows who to page.

This creates a complete chain: alert → service → team → escalation policy → schedule → on-call responder.

## Monitor On-Call Load

Use the on-call dashboard to track:

- **Coverage distribution** — How evenly on-call hours are spread across team members.
- **Paging activity** — Timeline view of all pages, acknowledgments, and escalations.
- **Burnout indicators** — Identify team members who are carrying a disproportionate on-call load.

Review these metrics regularly and adjust schedules and team sizes to maintain sustainable on-call practices.

## Best Practices

- **Keep teams aligned with service ownership** — The team that builds and deploys a service should be the team on call for it.
- **Ensure every team has a schedule and escalation policy** — A team without both is a gap in your on-call coverage.
- **Verify Slack integration is active** — Slack is often the primary notification channel. Confirm the integration is healthy and that the bot is present in relevant channels.
- **Communicate notification expectations** — Let team members know which channels are available and recommend they configure at least two contact methods for redundancy.
- **Review load metrics monthly** — Uneven on-call distribution leads to burnout. Use the dashboard data to rebalance rotations proactively.