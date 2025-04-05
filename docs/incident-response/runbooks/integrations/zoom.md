---
title: Zoom Integration for Runbooks
sidebar_label: Zoom
sidebar_position: 3
description: Learn how to integrate Zoom with Harness Incident Response Runbooks using the Connector-based approach for automated incident bridges and team collaboration.
---

# Zoom Integration for Runbooks

Harness Incident Response integrates with Zoom through a Connector-based approach, enabling automated meeting management for incident response.

## Overview

Zoom integration enables your runbooks to:
- Create incident bridges automatically
- Schedule follow-up meetings
- Manage participant access
- Share meeting recordings
- Track attendance

## Connector-Based Integration

### Prerequisites
- Zoom admin access
- OAuth credentials
- Harness Project Admin role

### Setup Steps
1. Navigate to **Settings** → **Connectors**
2. Click **+ New Connector**
3. Select **Zoom**
4. Configure OAuth:
   - Client ID
   - Client Secret
   - Account-level token
5. Test connection

### Required Permissions
- Meeting:Write
- Recording:Read
- User:Read
- Group:Read

## Using Zoom in Runbooks

### Create Incident Bridge
```yaml
- Action Type: Zoom
  Operation: Create Meeting
  Topic: "P1 Incident - [incident.service]"
  Agenda: "Incident Response Bridge for [incident.id]"
  Settings:
    JoinBeforeHost: true
    WaitingRoom: false
    AutoRecording: "cloud"
```

### Schedule Follow-up
```yaml
- Action Type: Zoom
  Operation: Schedule Meeting
  Topic: "Incident [incident.id] Review"
  StartTime: "[incident.resolved_time + 1 day]"
  Duration: 30
  Participants: ["@incident.owner", "@incident.team"]
```

### Update Meeting
```yaml
- Action Type: Zoom
  Operation: Update Meeting
  MeetingId: "[zoom.meeting_id]"
  Settings:
    EnableBreakout: true
    Rooms:
      - Name: "Technical Discussion"
      - Name: "Stakeholder Updates"
```

## Best Practices

### Meeting Setup
- Use consistent naming
- Enable auto-recording
- Configure waiting rooms appropriately
- Set proper security settings

### Participant Management
- Control host privileges
- Manage waiting room
- Set up co-hosts
- Configure breakout rooms

### Recording Management
- Set retention policies
- Configure sharing settings
- Manage access controls
- Archive important meetings

## Common Use Cases

### Incident Response
1. Create immediate bridge
2. Add response team
3. Enable recording
4. Share meeting link

### Status Updates
1. Schedule regular updates
2. Invite stakeholders
3. Prepare agenda
4. Share previous recording

### Post-Incident Review
1. Schedule retrospective
2. Invite participants
3. Share incident timeline
4. Record discussions

## Troubleshooting

### Common Issues
1. **Authentication Failures**
   - Verify OAuth tokens
   - Check permissions
   - Confirm account access

2. **Meeting Creation Errors**
   - Check scheduling conflicts
   - Verify user limits
   - Confirm host rights

3. **Recording Issues**
   - Check storage space
   - Verify permissions
   - Confirm settings

## Next Steps

- [Configure Slack Integration](./slack.md)
- [Configure Teams Integration](./teams.md)
- [Return to Runbook Overview](../runbooks.md)
