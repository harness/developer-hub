---
title: ServiceNow Integration for Runbooks
sidebar_label: ServiceNow
sidebar_position: 5
description: Learn how to integrate ServiceNow with Harness Incident Response Runbooks using the Connector-based approach and enable bidirectional synchronization.
---

# ServiceNow Integration for Runbooks

Harness Incident Response integrates with ServiceNow through a Connector-based approach, enabling automated incident management and tracking.

## Overview

ServiceNow integration enables your runbooks to:
- Create and update incidents
- Track incident progress
- Manage CMDB records
- Automate workflow transitions
- Sync incident updates bidirectionally

## Connector-Based Integration

### Prerequisites
- ServiceNow admin access
- Instance URL
- Service account credentials
- Harness Project Admin role

### Setup Steps
1. Navigate to **Settings** → **Connectors**
2. Click **+ New Connector**
3. Select **ServiceNow**
4. Configure authentication:
   - Instance URL
   - Username
   - Password/OAuth credentials
5. Test connection

### Required Permissions
- incident_manager role
- itil role
- rest_service role
- web_service_admin role

## Using ServiceNow in Runbooks

### Incident Creation
```yaml
- Action Type: ServiceNow
  Operation: Create Incident
  Category: "Infrastructure"
  Impact: "[incident.severity]"
  ShortDescription: "[incident.service] Incident"
  Description: |
    Impact: [incident.description]
    Service: [incident.service]
    Environment: [incident.environment]
```

### Update Incident
```yaml
- Action Type: ServiceNow
  Operation: Update Incident
  Number: "[servicenow.number]"
  Fields:
    Priority: "[incident.severity]"
    Assignment_group: "SRE Team"
    Comments: "Automated response initiated"
```

### State Management
```yaml
- Action Type: ServiceNow
  Operation: Update State
  Number: "[servicenow.number]"
  State: "In Progress"
  WorkNotes: "Incident response team engaged"
```

## Directional Synchronization with IR

Harness IR uses runbook triggers to update ServiceNow when incident fields change. When a field in IR changes, a runbook can automatically update the corresponding ServiceNow incident.

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
  - Action Type: ServiceNow
    Operation: Update State
    Number: "[servicenow.number]"
    State: "[incident.state]"
    WorkNotes: "State updated from IR"
```

### Example: Priority Sync
```yaml
Trigger:
  Type: Field Change
  Field: priority
  
Actions:
  - Action Type: ServiceNow
    Operation: Update Incident
    Number: "[servicenow.number]"
    Fields:
      Priority: "[incident.priority]"
      WorkNotes: "Priority updated from IR"
```

## Advanced Features

### Bidirectional Sync (Coming Soon)
:::note Future Capability
The following features are planned for future releases:
- Real-time incident synchronization
- Work notes mirroring
- CMDB integration
- Workflow state mapping
:::

#### Planned Capabilities
1. **Incident Sync**
   - ServiceNow → Harness IR status mapping
   - Automatic state transitions
   - Priority synchronization

2. **Work Notes Sync**
   - Bidirectional updates flow
   - Attachment synchronization
   - User mapping

3. **CMDB Integration**
   - CI relationship mapping
   - Impact analysis
   - Service dependency tracking

## Best Practices

### Incident Management
- Use standard categorization
- Include business impact
- Link configuration items
- Maintain SLA tracking

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

### Major Incident Management
1. Create ServiceNow incident
2. Assign response teams
3. Track resolution progress
4. Update stakeholders

### Change Management
1. Create change requests
2. Track approvals
3. Document implementations
4. Update CMDB

### SLA Compliance
1. Monitor response times
2. Track resolution progress
3. Generate reports
4. Escalate as needed

## Troubleshooting

### Common Issues
1. **Authentication Failures**
   - Verify credentials
   - Check roles/permissions
   - Confirm instance access

2. **Field Update Errors**
   - Validate field names
   - Check required fields
   - Verify field formats

3. **State Transition Issues**
   - Check workflow rules
   - Verify state mappings
   - Confirm permissions

## Next Steps

- [Configure Jira Integration](./jira.md)
- [Configure Teams Integration](./teams.md)
- [Return to Runbook Overview](../runbooks.md)
