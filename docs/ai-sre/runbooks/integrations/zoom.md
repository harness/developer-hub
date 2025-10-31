---
title: Zoom Integration for Runbooks
sidebar_label: Zoom
sidebar_position: 3
description: Learn how to integrate Zoom with Harness AI SRE Runbooks using the Connector-based approach for automated incident bridges and team collaboration.
redirect_from:
- /docs/incident-response/runbooks/integrations/zoom
---

# Zoom Integration for Runbooks

Harness AI SRE integrates with Zoom through a Connector-based approach, enabling automated meeting management for incident response.

## Overview

Zoom integration enables your runbooks to:
- Create incident bridges automatically
- Schedule follow-up meetings
- Manage participant access
- Share meeting recordings
- Track attendance

## Setting Up the Zoom Connector

### Prerequisites
Before configuring Zoom integration:
1. [Configure a Zoom project connector](../configure-project-connectors.md#zoom-connector) for your project
2. Ensure you have appropriate Zoom permissions

### Step-by-Step Setup for Organization Connector

1. Navigate to **Account Settings** → **Connectors**
2. Click **+ Add Connector**
3. Select **Zoom**
4. Enter a connector name in the format: `[Organization Name] - Zoom Connector`
5. In the Authorization step:
   - Choose between OAuth (recommended) or Account ID and Secret (default)
   - For OAuth: Click "Sign in with Zoom" and authorize access
6. For Connectivity Mode:
   - Verify "Connect through the Harness Platform" is selected
   - Click Continue
7. Complete the setup process

### Required Permissions

The Zoom integration requires specific API scopes depending on the actions your runbooks will perform. Below are the required scopes organized by functionality:

#### Basic Meeting Management
- **`meeting:write`** - Create, update, and delete meetings
- **`meeting:read`** - Read meeting details and settings
- **`user:read`** - Read user information for meeting hosts and participants

#### Advanced Meeting Actions
- **`meeting:write:admin`** - **Required for ending meetings** and advanced meeting control
- **`meeting:update:admin`** - Modify meeting settings for meetings you don't host
- **`meeting:read:admin`** - Access detailed meeting information across the organization

#### Recording Management
- **`recording:read`** - Access meeting recordings
- **`recording:write`** - Manage recording settings and permissions
- **`cloud_recording:read`** - Read cloud recording details
- **`cloud_recording:write`** - Manage cloud recordings

#### Participant and User Management
- **`user:read`** - Read basic user information
- **`user:write`** - Manage user settings (for participant management)
- **`group:read`** - Read group information for bulk participant management

#### Webinar Support (if applicable)
- **`webinar:write`** - Create and manage webinars
- **`webinar:read`** - Read webinar information

### Scope Requirements by Action

| Action | Required Scopes | Notes |
|--------|----------------|-------|
| Create Meeting | `meeting:write`, `user:read` | Basic meeting creation |
| End Meeting | `meeting:write:admin` | **Critical for meeting termination** |
| Update Meeting Settings | `meeting:write`, `meeting:update:admin` | Admin scope needed for meetings you don't host |
| Manage Participants | `meeting:write`, `user:read`, `user:write` | For adding/removing participants |
| Access Recordings | `recording:read`, `cloud_recording:read` | For post-meeting analysis |
| Schedule Recurring Meetings | `meeting:write`, `user:read` | For incident follow-ups |

### Permission Troubleshooting

If you encounter permission errors:

1. **"Insufficient privileges" error**: Add `meeting:write:admin` scope
2. **"Cannot end meeting" error**: Ensure `meeting:write:admin` is granted
3. **"Recording access denied"**: Add `recording:read` and `cloud_recording:read` scopes
4. **"User not found" errors**: Verify `user:read` scope is active

For detailed information about Zoom API scopes, refer to the [official Zoom API documentation](https://developers.zoom.us/docs/api/rest/reference/).

## Using the Zoom Connector

### Creating a Zoom Meeting Runbook
1. Create a new runbook or edit an existing one
2. Add a new Action
3. From the Action Picker, select **Create Zoom Meeting**
4. No additional configuration is required - the default Zoom connector will be used

### Executing the Runbook
1. Open an existing incident or create a new one
2. Navigate to the Runbooks tab
3. Click **Execute a Runbook**
4. Select your runbook with the Zoom meeting action
5. Click the run/play icon to execute
6. View the results in the incident timeline

## Disabling the Connector

### Remove from Zoom Marketplace
1. Go to the [Zoom Marketplace](https://marketplace.zoom.us)
2. Navigate to **Manage → Installed Apps**
3. Locate the Harness app
4. Click **Remove** or **Uninstall**
5. Confirm the removal
6. Verify in Harness:
   - Navigate to **Account Settings** → **Connectors**
   - Confirm the Zoom connector is no longer listed
   - Check that related secrets have been automatically removed

## Zoom Actions and Features

### Create Incident Bridge
When adding a Zoom action to your runbook, you can configure:
- Meeting Topic (e.g., "P1 Incident - [service name]")
- Meeting Agenda
- Meeting Settings:
  - Allow participants to join before host
  - Enable/disable waiting room
  - Set up automatic cloud recording

### Schedule Follow-up Meeting
You can schedule follow-up meetings by configuring:
- Meeting Topic
- Start Time (can use incident resolution time + offset)
- Duration
- Participant List (can include incident owner and team members)

### Update Existing Meeting
Modify meeting settings such as:
- Enable/disable breakout rooms
- Add or remove participants
- Update meeting security settings
- Modify recording settings

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
