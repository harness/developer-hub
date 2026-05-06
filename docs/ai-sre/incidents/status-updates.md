---
title: Configure Status Updates and Service Subscribers
description: Set up stakeholder subscriptions at the service level to enable automated status update delivery during incidents in Harness AI SRE.
sidebar_label: Configure Status Updates and Service Subscribers
sidebar_position: 6
---

# Configure Status Updates and Service Subscribers

Status updates enable incident commanders to broadcast structured communications to stakeholders during active incidents. Subscribers are configured at the service level, and recipients are resolved dynamically based on the incident's impacted services.

This ensures stakeholders receive updates for incidents affecting services they care about without needing to join the incident war room.

## How Service Subscriptions Work

### Subscription Model

- **Service-level subscriptions**: Subscribers are configured on individual services in the Service Directory, not on specific incidents.
- **Dynamic recipient resolution**: When a status update is sent, the system automatically gathers all subscribers from every impacted service on the incident.
- **Automatic deduplication**: If a stakeholder is subscribed to multiple impacted services, they receive only one copy of the update.

### Subscriber Types

AI SRE supports two types of subscribers:

- **Individual users**: Specific users in your Harness organization
- **User groups**: Harness platform User Groups (expanded to member emails at send time via the Harness V2 API)

## Add Subscribers to a Service

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Select the service you want to configure.
3. Click the **Subscribers** tab.
4. Click **Add Subscriber**.
5. Choose the subscriber type:
   - **User**: Select an individual user from your organization
   - **User Group**: Select a Harness User Group
6. Click **Save**.

Repeat this process for each service where you want to configure stakeholder notifications.

## Delivery Channel

- **Email only**: Status updates are delivered via email from `aisre-noreply@harness.io` (sender name: "AI SRE").
- **Branded format**: Emails include header and footer images and are rendered as HTML with incident context.
- **No Slack delivery**: Slack notifications are not currently supported for status updates.

## Who Can Send Status Updates

Any user with access to the incident detail page can send a status update. RBAC controls for subscription management (who can add or remove subscribers from services) are planned for a future release.

## Status Update Contents

When an incident commander sends a status update, the system pre-populates a default template with:

- **Incident ID**: Unique identifier for the incident
- **Incident title**: Short description of the incident
- **Incident summary**: Current understanding of the issue
- **Impacted services**: List of affected services
- **Current status**: Investigating, Identified, Monitoring, or Resolved

The sender can edit both the subject line and message body before sending. The default subject line follows this format:

```
AI SRE Status update for incident [incident-ID]
```

## Recipient Preview

Before sending, the UI displays:

- **Resolved recipients**: Names of all users and expanded user groups who will receive the update
- **Email count**: Total number of unique email addresses (after deduplication)

This allows the sender to verify the recipient list before delivery.

## Best Practices

### For Administrators

- **Map service ownership clearly**: Ensure every production service has a defined owner team so stakeholders know which services to subscribe to.
- **Use user groups for role-based subscriptions**: Subscribe user groups (e.g., "Platform Leadership", "Customer Success") rather than individual users to reduce maintenance when team membership changes.
- **Keep subscriptions current**: Review subscriber lists periodically and remove users who no longer need updates.
- **Align with on-call structure**: Subscribers typically mirror your escalation policies — if a team is on-call for a service, their leadership should be subscribed for status updates.

### For Incident Commanders

- **Send updates at key milestones**: Status changes (Identified → Monitoring), mitigation actions, or significant scope changes are good times to send an update.
- **Edit the default template**: The pre-populated content is a starting point. Add business context, customer impact, and next steps relevant to your stakeholders.
- **Review recipients before sending**: Use the recipient preview to confirm the right stakeholders will receive the update.

## Next Steps

- Go to [Send Status Updates](/docs/ai-sre/users/manage-incidents/update-incident-details#send-status-updates) to learn how incident commanders send updates during active incidents.
- Go to [Integrate with the Service Directory](/docs/ai-sre/oncall/integrate-service-directory) to configure service-to-team mappings.
