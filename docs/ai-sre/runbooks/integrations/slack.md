---
title: Slack Integration for Runbooks
sidebar_label: Slack
sidebar_position: 1
description: Learn how to integrate Slack with Harness AI SRE Runbooks for automated incident communication and collaboration.
redirects_from:
- /docs/incident-response/runbooks/integrations/slack
---

# Slack Integration for Runbooks

Harness AI SRE supports two methods of Slack integration: Organization-level and Connector-based. This guide covers both approaches and their use cases.

## Overview

Slack integration enables your runbooks to:
- Send automated notifications
- Create incident-specific channels
- Manage threaded discussions
- Coordinate response teams
- Track incident updates

## Organization-Level Integration

### Setup
1. Navigate to **Settings** → **Organization**
2. Select **Slack Settings**
3. Click **Connect Slack**
4. Follow the OAuth flow to authorize Harness

### Features
- Global Slack workspace access
- Unified authentication
- Centralized channel management
- Cross-project notifications

### Permissions Required
- Slack Workspace Admin access
- Harness Organization Admin role
- Slack bot permissions:
  * channels:manage
  * chat:write
  * groups:write
  * im:write

## Connector-Based Integration

### Setup
1. Navigate to **Settings** → **Connectors**
2. Click **+ New Connector**
3. Select **Slack**
4. Configure workspace access
5. Set channel permissions

### Features
- Project-specific access
- Custom bot settings
- Granular permissions
- Independent configurations

### Permissions Required
- Slack Workspace Member
- Harness Project Admin role
- Selected channel access

## Using Slack in Runbooks

### Channel Creation
```yaml
- Action Type: Slack
  Operation: Create Channel
  Name: "incident-[incident.id]"
  Description: "Channel for incident [incident.id]"
  AddUsers: ["@oncall", "@sre-team"]
```

### Notifications
```yaml
- Action Type: Slack
  Operation: Send Message
  Channel: "#[incident.channel]"
  Message: "🚨 [incident.severity] incident detected in [incident.service]"
  Blocks:
    - Type: section
      Text: "*Impact*: [incident.description]"
```

### Thread Management
```yaml
- Action Type: Slack
  Operation: Create Thread
  Channel: "#[incident.channel]"
  Message: "Updates for incident [incident.id]"
  ThreadUpdates: true
```

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

- [Configure Microsoft Teams Integration](./teams.md)
- [Configure Zoom Integration](./zoom.md)
- [Return to Runbook Overview](../runbooks.md)
