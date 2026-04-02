---
title: Microsoft Teams Integration for Runbooks
sidebar_label: Microsoft Teams
sidebar_position: 2
description: Learn how to integrate Microsoft Teams with Harness AI SRE Runbooks using the Connector-based approach.
redirect_from:
- /docs/incident-response/runbooks/integrations/teams
---


Harness AI SRE integrates with Microsoft Teams at the project level, enabling automated incident communication and team collaboration.

## Overview

Teams integration enables your runbooks to:
- Send automated notifications
- Create incident-specific channels
- Schedule and manage meetings
- Share incident updates
- Coordinate response teams

## Integration Setup

### Prerequisites
- Microsoft Teams admin access
- Azure AD application registration
- Harness Project Admin role

### Setup Steps
1. Navigate to **Project Settings** → **Third Party Integrations (AI SRE)**
2. Select **Microsoft Teams** from the available integrations
3. Configure Azure AD settings:
   - Application (client) ID
   - Directory (tenant) ID
   - Client secret
4. Grant required permissions:
   - Channel.Create
   - ChannelMessage.Send
   - Team.ReadBasic.All
   - TeamMember.ReadWrite.All
5. Test the connection

### Verification
1. Test connector connectivity
2. Send test message
3. Create test channel
4. Verify permissions

## Using Teams Actions in Runbooks

When you add Microsoft Teams actions to a runbook, you'll configure them through a form-based interface. The specific fields depend on the action type you select.

### Send Teams Message Action

Sends a message to a specified Teams channel.

**Form Fields:**
- **Team**: Team name or ID
- **Channel**: Channel name within the team
- **Message**: Message text to send
  - Supports Mustache variables: `{{Activity.title}}`, `{{Activity.summary}}`
  - Can include formatting and mentions

### Create Teams Channel Action

Creates a new Teams channel for incident coordination.

**Form Fields:**
- **Team**: Team where the channel will be created
- **Channel Name**: Name for the new channel
  - Example: `incident-{{Activity.id}}`
- **Description**: Channel description

**Available Mustache Variables:**
- `{{Activity.title}}` - AI SRE incident title
- `{{Activity.id}}` - AI SRE incident ID
- `{{Activity.severity}}` - AI SRE incident severity
- `{{Activity.status}}` - AI SRE incident status
- Any custom incident fields configured in your incident template

## Best Practices

### Channel Management
- Use consistent naming conventions
- Archive resolved incident channels
- Limit channel creation to active incidents
- Document channel purpose

### Message Structure
- Use clear formatting
- Include severity indicators
- Add relevant links
- Mention appropriate teams

### Permissions
- Follow least privilege principle
- Regular permission audits
- Document access requirements
- Monitor usage

## Common Use Cases

### Incident Coordination
1. Create dedicated channel
2. Notify stakeholders
3. Share initial assessment
4. Track response actions

### Status Updates
1. Send periodic updates
2. Track resolution progress
3. Share incident metrics
4. Document action items

### Meeting Management
1. Schedule incident bridges
2. Send meeting reminders
3. Share meeting notes
4. Track action items

## Troubleshooting

### Common Issues
1. **Authentication Failures**
   - Verify Azure AD settings
   - Check permission scopes
   - Confirm application registration

2. **Channel Creation Errors**
   - Check naming conventions
   - Verify team access
   - Confirm bot permissions

3. **Message Failures**
   - Validate channel existence
   - Check message formatting
   - Verify rate limits

## Next Steps

- [Configure Slack Integration](./slack.md)
- [Configure Zoom Integration](./zoom.md)
- [Return to Runbook Overview](../runbooks.md)
