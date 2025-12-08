---
title: Microsoft Teams Integration for Runbooks
sidebar_label: Microsoft Teams
sidebar_position: 2
description: Learn how to integrate Microsoft Teams with Harness AI SRE Runbooks using the Connector-based approach.
redirect_from:
- /docs/incident-response/runbooks/integrations/teams
---

# Microsoft Teams Integration for Runbooks

Harness AI SRE integrates with Microsoft Teams through a Connector-based approach, enabling automated incident communication and team collaboration.

## Overview

Teams integration enables your runbooks to:
- Send automated notifications
- Create incident-specific channels
- Schedule and manage meetings
- Share incident updates
- Coordinate response teams

## Connector-Based Integration

### Prerequisites
- Microsoft Teams admin access
- Azure AD application registration
- Harness Project Admin role

### Setup Steps
1. Navigate to **Settings** → **Connectors**
2. Click **+ New Connector**
3. Select **Microsoft Teams**
4. Configure Azure AD settings:
   - Application (client) ID
   - Directory (tenant) ID
   - Client secret
5. Grant required permissions:
   - Channel.Create
   - ChannelMessage.Send
   - Team.ReadBasic.All
   - TeamMember.ReadWrite.All

### Verification
1. Test connector connectivity
2. Send test message
3. Create test channel
4. Verify permissions

## Using Teams in Runbooks

### Channel Creation
```yaml
- Action Type: Teams
  Operation: Create Channel
  Team: "Incident Response"
  Name: "incident-[incident.id]"
  Description: "Channel for incident [incident.id]"
  Members: ["@oncall", "@sre-team"]
```

### Notifications
```yaml
- Action Type: Teams
  Operation: Send Message
  Channel: "incident-[incident.id]"
  Message: "🚨 [incident.severity] incident detected"
  Sections:
    - Title: "Impact"
      Content: "[incident.description]"
```

### Meeting Management
```yaml
- Action Type: Teams
  Operation: Schedule Meeting
  Title: "Incident [incident.id] Bridge"
  Attendees: ["@oncall", "@sre-team"]
  Duration: 60
```

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
