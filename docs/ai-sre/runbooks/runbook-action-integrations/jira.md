---
title: Jira Integration for Runbooks
sidebar_label: Jira
sidebar_position: 4
description: Learn how to integrate Jira with Harness AI SRE Runbooks using the Connector-based approach and enable bidirectional synchronization.
redirect_from:
- /docs/incident-response/runbooks/integrations/jira
---


Harness AI SRE integrates with Jira through a Connector-based approach, enabling automated ticket management and incident tracking. While organization-level connectors are configured here, you'll also need to set up project-level connectors to ensure proper attribution of runbook actions.

## Overview

Jira integration enables your runbooks to:
- Create and update issues
- Track incident progress
- Manage custom fields
- Automate workflow transitions
- Sync incident updates bidirectionally

## Integration Setup

### Prerequisites
- Jira admin access
- API token or OAuth credentials
- Harness Project Admin role

### Configure Jira Connector
1. Navigate to **Project Settings** → **Third Party Integrations (AI SRE)**
2. Select **Jira** from the available integrations
3. Configure authentication:
   - Server URL
   - Username
   - API token/OAuth credentials
4. Test connection

### Required Permissions
- Create issues
- Transition issues
- Add comments
- Update fields
- View projects

## Using Jira Actions in Runbooks

When you add a Jira action to a runbook, you'll configure it through a form-based interface. The specific fields depend on the action type you select.

### Create Jira Issue Action

Creates a new Jira issue and can automatically update the AI SRE incident with the issue key.

**Common Form Fields:**
- **Project**: Jira project key
- **Issue Type**: Type of issue (Bug, Task, Story, etc.)
- **Summary**: Brief title for the issue
  - Example: `{{Activity.title}}`
- **Description**: Detailed description
  - Example: `{{Activity.summary}}`
- **Priority**: Issue priority
- **Labels**: Tags for categorization
- **Assignee**: Jira username to assign the issue to

**Available Mustache Variables:**
- `{{Activity.title}}` - AI SRE incident title
- `{{Activity.summary}}` - AI SRE incident summary
- `{{Activity.severity}}` - AI SRE incident severity
- `{{Activity.status}}` - AI SRE incident status
- Any custom incident fields configured in your incident template

### Field Change Triggers

You can configure runbooks to trigger when specific AI SRE incident fields change, enabling automatic updates to Jira:

**Supported Trigger Types:**
- State changes
- Priority updates
- Severity modifications
- Assignment changes

When a field changes in AI SRE, the runbook can execute Jira actions to keep both systems synchronized.

## Advanced Features

### Sync Architecture
<!-- CHANGED (comment #11): The previous :::note said "Bidirectional sync is available by leveraging Harness Pipelines" and listed capabilities as if they were a built-in feature. This framing was misleading — outbound sync (AI SRE → Jira) is native via runbook actions, but inbound sync (Jira → AI SRE) requires the customer to configure a Harness Pipeline with webhooks from Jira. Rewritten to make that distinction explicit. -->
:::note
**Outbound sync (AI SRE → Jira) is native** and handled via runbook actions as described above.

**Inbound sync (Jira → AI SRE)** is not a built-in feature. It can be configured using Harness Pipelines as the integration mechanism — you set up a webhook from Jira that triggers a Pipeline, which then updates the corresponding AI SRE incident. This requires customer-side configuration.
:::

#### Capabilities
1. **Status Sync**
   - Jira → Harness AI SRE status mapping
   - Automatic state transitions
   - Custom workflow support

2. **Comment Sync**
   - Bidirectional comment flow
   - Attachment synchronization
   - User mapping

3. **Field Mapping**
   When creating Jira actions in runbooks, you can map AI SRE incident data to Jira fields using Mustache variables:

   Common mappings:
   - **Basic Fields**: Summary (`{{Activity.title}}`), Description (`{{Activity.summary}}`), Priority
   - **Team Fields**: Assignee, Components, Labels
   - **Context Fields**: Service, Environment
   - **Custom Fields**: Use custom incident field variables

## Best Practices

### Issue Management
- Use consistent naming conventions
- Include key incident details
- Link related issues
- Keep field mappings simple
- Test template rendering

### Workflow Integration
- Define clear state mappings
- Document transition rules
- Set up appropriate triggers
- Monitor sync status

### Field Configuration
- Map essential fields
- Use custom fields appropriately
- Document field purposes
- Validate field values

## Common Use Cases

### Incident Tracking
1. Create Jira issue
2. Update incident details
3. Track resolution progress
4. Document action items

### Status Management
1. Sync incident states
2. Update priorities
3. Track SLA compliance
4. Generate reports

### Team Collaboration
1. Share updates
2. Assign tasks
3. Track dependencies
4. Document decisions

## Troubleshooting

### Common Issues
1. **Authentication Failures**
   - Verify API tokens
   - Check permissions
   - Confirm server access

2. **Field Update Errors**
   - Validate field names
   - Check required fields
   - Verify field formats

3. **Transition Issues**
   - Check workflow rules
   - Verify state mappings
   - Confirm permissions

## Next Steps

* [Configure Project Connectors](../configure-project-connectors.md) - Set up project-level Jira connectors for runbook actions
* [Create a Runbook](../create-runbook.md) - Start creating runbooks with Jira actions
* [Configure Authentication](../configure-authentication.md) - Learn more about authentication options
