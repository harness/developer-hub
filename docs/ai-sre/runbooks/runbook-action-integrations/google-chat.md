---
title: Google Chat Integration for Runbooks
sidebar_label: Google Chat
sidebar_position: 3
description: Learn how to integrate Google Chat with Harness AI SRE Runbooks for automated incident communication in Google Workspace.
---

# Google Chat Integration for Runbooks

Harness AI SRE integrates with Google Chat at the organization level, enabling automated incident communication and team collaboration for organizations using Google Workspace.

## Overview

Google Chat integration enables your runbooks to:

- Send automated notifications to Google Chat spaces
- Post incident updates to linked spaces
- Coordinate response teams using Google Workspace tools
- Maintain communication history in the incident timeline

## Integration Setup

Before using Google Chat actions in runbooks, configure the organization-level Google Chat integration.

### Prerequisites

- **Google Cloud Platform project**: With Pub/Sub API enabled
- **Google Chat admin access**: For your Google Workspace organization
- **Harness Organization Admin role**: To configure third-party integrations

### Setup Steps

1. Navigate to **Organization Settings** → **Third-Party Integrations (AI SRE)**.
2. Click **Connect** for **Google Chat**.
3. Complete the OAuth authorization flow.
4. Configure GCP Project ID and Pub/Sub Topic Name.
5. Test the connection with a Space ID.
6. Click **Save**.

Go to [Google Chat Integration](/docs/ai-sre/integrations/google-chat) for complete setup instructions, including GCP Pub/Sub configuration.

## Using Google Chat Actions in Runbooks

When you add Google Chat actions to a runbook, configure them through a form-based interface.

### Google Chat Post Message Action

Sends a message to a specified Google Chat space.

**Form Fields:**

- **Space ID**: The Google Chat space identifier
  - Find this in the Google Chat space URL: `https://chat.google.com/room/SPACE_ID`
  - Supports Mustache variables: `{{incident.chat_space_id}}`
- **Message**: Message text to send
  - Supports Mustache variables: `{{Activity.title}}`, `{{Activity.summary}}`
  - Plain text format (HTML formatting not currently supported)

**Example Configuration:**

```yaml
Space ID: {{incident.chat_space_id}}
Message: |
  🚨 Incident Alert: {{Activity.title}}
  
  Severity: {{Activity.severity}}
  Status: {{Activity.status}}
  
  Summary: {{Activity.summary}}
  
  View incident: https://app.harness.io/incidents/{{Activity.id}}
```

**Available Mustache Variables:**

- `{{Activity.title}}`: AI SRE incident title
- `{{Activity.id}}`: AI SRE incident ID
- `{{Activity.severity}}`: AI SRE incident severity
- `{{Activity.status}}`: AI SRE incident status
- `{{Activity.summary}}`: AI SRE incident summary
- Any custom incident fields configured in your incident template

## Best Practices

### Message Structure

- **Use clear formatting**: Break messages into sections with blank lines for readability.
- **Include severity indicators**: Use emoji or text indicators for severity (🚨 Critical, ⚠️ High, ℹ️ Low).
- **Link to dashboards**: Include links to monitoring dashboards, runbooks, or incident details.
- **Keep messages concise**: Google Chat messages should be scannable; avoid large blocks of text.

### Space Management

- **Use dedicated incident spaces**: Create a Google Chat space for each incident rather than posting to shared channels.
- **Document space IDs**: Store frequently used space IDs as custom incident fields or runbook variables.
- **Link spaces to incidents**: Use the Incident Details page to link Google Chat spaces so all messages appear in the timeline.

### Runbook Design

- **Send updates at key milestones**: Post messages when status changes, mitigation is applied, or resolution is confirmed.
- **Avoid message spam**: Do not send messages in tight loops; use conditional logic to limit frequency.
- **Test with a sandbox space**: Validate runbook actions in a test Google Chat space before using in production incidents.

## Common Use Cases

### Incident Notification

Send an initial notification when an incident is created:

**Runbook Action:**
- **Action**: Google Chat Post Message
- **Space ID**: `{{incident.chat_space_id}}`
- **Message**:
```
🚨 New Incident Created

Title: {{Activity.title}}
Severity: {{Activity.severity}}
Assigned to: {{Activity.assignee}}

Link: https://app.harness.io/incidents/{{Activity.id}}
```

### Status Update Broadcast

Send a status update when the incident status changes:

**Runbook Action:**
- **Action**: Google Chat Post Message
- **Space ID**: `{{incident.chat_space_id}}`
- **Message**:
```
ℹ️ Status Update

Incident: {{Activity.title}}
Previous Status: {{Activity.previous_status}}
New Status: {{Activity.status}}

Updated by: {{Activity.updated_by}}
```

### Resolution Notification

Notify the team when the incident is resolved:

**Runbook Action:**
- **Action**: Google Chat Post Message
- **Space ID**: `{{incident.chat_space_id}}`
- **Message**:
```
✅ Incident Resolved

Incident: {{Activity.title}}
Resolution Time: {{Activity.resolution_time}}

Root Cause: {{Activity.root_cause}}

Post-mortem: https://app.harness.io/incidents/{{Activity.id}}/postmortem
```

## Troubleshooting

<details>
<summary><strong>Message does not appear in the Google Chat space</strong></summary>

**Check the following**:

1. Verify the Google Chat integration is connected in **Organization Settings**
2. Confirm the Space ID is correct (check the Google Chat space URL)
3. Ensure the authorized Google account has access to the target space
4. Check runbook execution logs for error messages

**If the space ID is incorrect**, update the runbook action or incident field with the correct Space ID.

</details>

<details>
<summary><strong>Mustache variables do not render in the message</strong></summary>

**Possible causes**:

- Variable name is misspelled or does not exist
- Custom incident field is not populated
- Variable syntax is incorrect (use `{{variable_name}}`, not `{variable_name}`)

**Resolution**:

1. Verify the variable name matches the incident field exactly (case-sensitive)
2. Test the runbook action and inspect the rendered message in the execution log
3. Use default values for optional fields: `{{Activity.custom_field | default: "N/A"}}`

</details>

<details>
<summary><strong>Runbook action fails with "Unauthorized" error</strong></summary>

**Possible causes**:

- OAuth token expired or was revoked
- Google Workspace admin disabled the Harness app
- Authorized account lost access to the target space

**Resolution**:

1. Re-authorize the Google Chat integration in **Organization Settings**
2. Confirm the Harness app is approved by your Google Workspace admin
3. Verify the authorized account can access the target space in Google Chat

</details>

## Permissions

The Google Chat integration requires these permissions:

- **chat.messages.create**: Send messages to Google Chat spaces
- **chat.spaces.readonly**: Read space metadata (for space ID validation)

These permissions are requested during the OAuth authorization flow.

## Next Steps

- Go to [Google Chat Integration](/docs/ai-sre/integrations/google-chat) to set up the organization-level integration.
- Go to [Create a Runbook](/docs/ai-sre/runbooks/create-runbook) to learn how to build automated response workflows.
- Go to [AI Scribe Agent](/docs/ai-sre/ai-agent) to enable automatic capture of key events from Google Chat conversations.
