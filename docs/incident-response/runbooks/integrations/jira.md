---
title: Jira Integration for Runbooks
sidebar_label: Jira
sidebar_position: 4
description: Learn how to integrate Jira with Harness Incident Response Runbooks using the Connector-based approach and enable bidirectional synchronization.
---

# Jira Integration for Runbooks

Harness Incident Response integrates with Jira through a Connector-based approach, enabling automated ticket management and incident tracking. While organization-level connectors are configured here, you'll also need to set up project-level connectors to ensure proper attribution of runbook actions.

## Overview

Jira integration enables your runbooks to:
- Create and update issues
- Track incident progress
- Manage custom fields
- Automate workflow transitions
- Sync incident updates bidirectionally

## Organization-Level Connector Setup

The following steps describe how to configure Jira at the organization level. For project-level connector configuration required for runbooks, see [Configure Project Connectors](../configure-project-connectors.md).

### Prerequisites
- Jira admin access
- API token or OAuth credentials
- Harness Project Admin role

### Setup Steps
1. Navigate to **Settings** → **Connectors**
2. Click **+ New Connector**
3. Select **Jira**
4. Configure authentication:
   - Server URL
   - Username
   - API token/OAuth credentials
5. Test connection

### Required Permissions
- Create issues
- Transition issues
- Add comments
- Update fields
- View projects

## Using Jira in Runbooks

### Issue Creation
```yaml
- Action Type: Jira
  Operation: Create Issue
  Project: "IR"
  IssueType: "Incident"
  Summary: "[incident.severity] - [incident.service] Incident"
  Description: |
    Impact: [incident.description]
    Service: [incident.service]
    Environment: [incident.environment]
```

### Field Updates
```yaml
- Action Type: Jira
  Operation: Update Fields
  IssueKey: "[jira.key]"
  Fields:
    Priority: "[incident.severity]"
    Environment: "[incident.environment]"
    Components: ["[incident.service]"]
```

### Status Transitions
```yaml
- Action Type: Jira
  Operation: Transition
  IssueKey: "[jira.key]"
  Transition: "In Progress"
  Comment: "Incident response initiated"
```

## Directional Synchronization with IR

Harness IR uses runbook triggers to update Jira when incident fields change. When a field in IR changes, a runbook can automatically update the corresponding Jira issue.

### Field Change Triggers
Configure runbooks to trigger on field changes:
- State changes
- Priority updates
- Severity modifications
- Assignment changes

### Example: State Change Sync
```yaml
Trigger:
  Type: Field Change
  Field: state
  
Actions:
  - Action Type: Jira
    Operation: Transition
    IssueKey: "[jira.key]"
    Transition: "[incident.state]"
    Comment: "State updated from IR"
```

### Example: Priority Sync
```yaml
Trigger:
  Type: Field Change
  Field: priority
  
Actions:
  - Action Type: Jira
    Operation: Update Fields
    IssueKey: "[jira.key]"
    Fields:
      Priority: "[incident.priority]"
    Comment: "Priority updated from IR"
```

## Advanced Features

### Bidirectional Sync (Coming Soon)
:::note Future Capability
The following features are planned for future releases:
- Real-time status synchronization
- Comment mirroring
- Field value propagation
- Workflow state mapping
:::

#### Planned Capabilities
1. **Status Sync**
   - Jira → Harness IR status mapping
   - Automatic state transitions
   - Custom workflow support

2. **Comment Sync**
   - Bidirectional comment flow
   - Attachment synchronization
   - User mapping

3. **Field Mapping**
   ```yaml
   # Issue Creation
   fields:
     summary: "{{incident.title}}"
     description: "{{incident.description}}"
     priority: "{{incident.severity}}"
     assignee: "{{incident.owner}}"
     labels: ["incident", "{{incident.service}}", "{{incident.environment}}"]
     components: ["{{incident.component}}"]
     customfield_10001: "{{incident.timeline}}"
   ```

   Common mappings:
   - **Basic Fields**: Title, description, priority
   - **Team Fields**: Assignee, components, labels
   - **Context Fields**: Service, environment
   - **Custom Fields**: Timeline, metrics, impact

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
