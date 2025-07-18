---
title: Configure Incident Fields for Runbooks
sidebar_label: Configure Fields
sidebar_position: 4
description: Learn how to configure and use incident fields in your runbook workflows for dynamic, context-aware automation.
redirects_from:
- /docs/incident-response/runbooks/configure-incident-fields
---

# Configure Incident Fields for Runbooks

This guide explains how to configure and use incident fields in your runbook workflows.

## Overview

Incident fields allow you to pass contextual information from incidents to your runbook actions. This enables dynamic, context-aware automation based on incident details.

## Available Field Types

### System Fields
These are automatically available in all runbooks:
- Incident ID
- Severity
- Status
- Creation Time
- Last Updated Time
- Source
- Service
- Environment

### Custom Fields
You can define custom fields to capture additional information:
- Text fields
- Number fields
- Boolean fields
- Dropdown fields
- Multi-select fields
- Date/Time fields

## Using Fields in Runbooks

### Field References
Access field values in your runbook actions using the following syntax:
```
[incident.field_name]
```

Example usages:
- Slack message: "🚨 [incident.severity] incident detected in [incident.service]"
- Pipeline variable: service_name: [incident.service]
- Jira ticket: "Issue in [incident.environment]"

### Dynamic Behavior
Fields can be used to:
- Route notifications to different channels
- Set priority levels in tickets
- Control pipeline behavior
- Determine escalation paths

## Best Practices

### Field Naming
- Use clear, descriptive names
- Follow a consistent naming convention
- Avoid special characters
- Keep names concise

### Field Values
- Define clear value ranges
- Use consistent formats
- Include default values
- Document valid options

### Field Usage
- Only create necessary fields
- Reuse fields when possible
- Group related fields
- Maintain field descriptions

## Examples

### Service Routing
```yaml
# Example field configuration
Field Name: affected_service
Type: Dropdown
Options:
  - API Gateway
  - Database
  - Frontend
  - Backend
```

### Environment Classification
```yaml
# Example field configuration
Field Name: environment
Type: Multi-select
Options:
  - Production
  - Staging
  - Development
  - QA
```

### Impact Assessment
```yaml
# Example field configuration
Field Name: business_impact
Type: Dropdown
Options:
  - Customer Facing
  - Internal Only
  - Revenue Impact
  - Security Risk
```

## Field Configuration Steps

1. **Navigate to Field Settings**
   - Go to **Settings** → **Incident Fields**
   - Click **+ New Field**

2. **Define Field Properties**
   - Name
   - Type
   - Description
   - Default Value
   - Required/Optional

3. **Configure Field Options**
   - For dropdown/multi-select:
     - Add options
     - Set default selections
     - Order options

4. **Set Field Visibility**
   - Choose when field appears
   - Set edit permissions
   - Configure field dependencies

5. **Test Field Configuration**
   - Create test incident
   - Verify field behavior
   - Check runbook integration

## Common Use Cases

### Integration Examples

#### Slack Notifications
```yaml
if [incident.severity] == "P1" then
  notify: #sre-urgent
  message: "🚨 [incident.service] incident in [incident.environment]"
else
  notify: #sre-standard
```

#### Jira Tickets
```yaml
ticket_template: "[incident.service]-incident-[incident.id]"
description: "Issue in [incident.service] affecting [incident.environment]"
priority: "[incident.severity]"
```

#### Teams Channels
```yaml
channel_name: "incident-[incident.id]-[incident.service]"
description: "[incident.severity] incident in [incident.environment]"
```

## Next Steps

### Documentation
- [Create a Runbook](./create-runbook.md)
- [Configure Authentication](./configure-authentication.md)
- [Return to Overview](./runbooks.md)

### Integration Guides
- Communication Tools
  - [Slack Integration](./integrations/slack.md)
  - [Microsoft Teams Integration](./integrations/teams.md)
  - [Zoom Integration](./integrations/zoom.md)
- Ticketing Systems
  - [Jira Integration](./integrations/jira.md)
  - [ServiceNow Integration](./integrations/servicenow.md)
