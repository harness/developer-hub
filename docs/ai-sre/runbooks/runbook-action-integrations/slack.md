---
title: Slack Integration for Runbooks
sidebar_label: Slack
sidebar_position: 1
description: Learn how to integrate Slack with Harness AI SRE Runbooks for automated incident communication and collaboration.
redirect_from:
- /docs/incident-response/runbooks/integrations/slack
---


Harness AI SRE integrates with Slack at the organization level, enabling automated incident communication and team collaboration across all projects.

## Overview

Slack integration enables your runbooks to:
- Send automated notifications
- Create incident-specific channels
- Manage threaded discussions
- Coordinate response teams
- Track incident updates

## Integration Setup

### Prerequisites
- Slack Workspace Admin access
- Harness Organization Admin role

### Setup Steps
1. Navigate to **Organization Settings** → **Third Party Integrations (AI SRE)**
2. Click **Connect** for Slack
3. Follow the OAuth flow to authorize Harness
4. Configure workspace permissions

### Required Slack Permissions
The Harness Slack bot requires these permissions:
- `channels:manage` - Create and manage channels
- `chat:write` - Send messages
- `groups:write` - Manage private channels
- `im:write` - Send direct messages

### Features
- Global Slack workspace access across all projects
- Unified authentication
- Centralized channel management
- Cross-project notifications

## Using Slack Actions in Runbooks

When you add Slack actions to a runbook, you'll configure them through a form-based interface. The specific fields depend on the action type you select.

### Send Slack Message Action

Sends a message to a specified Slack channel.

**Form Fields:**
- **Channel**: Channel name or ID (e.g., `#incidents` or `{{Activity.slack_channel}}`)
- **Message**: Message text to send
  - Supports Mustache variables: `{{Activity.title}}`, `{{Activity.summary}}`
  - Can include Slack formatting (bold, italics, links)

### Create Slack Channel Action

Creates a new Slack channel for incident coordination.

**Form Fields:**
- **Channel Name**: Name for the new channel (must follow Slack naming rules)
  - Example: `incident-{{Activity.id}}`
- **Description**: Channel topic/description
- **Is Private**: Whether to create a private channel

**Available Mustache Variables:**
- `{{Activity.title}}` - AI SRE incident title
- `{{Activity.id}}` - AI SRE incident ID
- `{{Activity.severity}}` - AI SRE incident severity
- `{{Activity.status}}` - AI SRE incident status
- Any custom incident fields configured in your incident template

## Best Practices

### Channel Naming
- Use consistent prefixes
- Include incident IDs
- Keep names descriptive
- Follow workspace conventions

### Message Structure
- Use clear formatting
- Include severity indicators
- Link to relevant dashboards
- Mention appropriate teams

### Permissions
- Use least privilege access
- Regularly audit permissions
- Document access requirements
- Monitor usage patterns

## Common Use Cases

### Incident Coordination
1. Create incident channel
2. Notify stakeholders
3. Share initial assessment
4. Track response actions

### Status Updates
1. Send periodic updates
2. Track resolution progress
3. Share metrics and graphs
4. Document action items

### Post-Incident
1. Archive incident channel
2. Share incident summary
3. Schedule retrospective
4. Document lessons learned

## Troubleshooting

### Common Issues
1. **Authentication Failures**
   - Verify OAuth tokens
   - Check permission scopes
   - Confirm workspace access

2. **Channel Creation Errors**
   - Check naming conventions
   - Verify channel limits
   - Confirm bot permissions

3. **Message Failures**
   - Validate channel existence
   - Check message formatting
   - Verify rate limits

## Next Steps

- [Slack Commands](/docs/ai-sre/get-started/slack-commands)
- [Configure Microsoft Teams Integration](./teams.md)
- [Configure Zoom Integration](./zoom.md)
- [Return to Runbook Overview](../runbooks.md)
