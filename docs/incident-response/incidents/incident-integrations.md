---
title: Configure Incident Integrations
description: Learn how to configure incident integrations in Harness Incident Response for collaboration, communication, and automation.
sidebar_label: Integrations
sidebar_position: 5
---

# Configure Incident Integrations

Learn how to configure and manage incident integrations in Harness IR.

## Overview

Incident integrations help you:
- Coordinate team responses
- Automate communication
- Track incident progress
- Manage collaboration
- Streamline workflows

## Communication Integrations

### Slack
```yaml
integration:
  name: "Slack Integration"
  features:
    - channel_management
    - thread_management
    - user_mentions
  actions:
    create_channel:
      name: "inc-[incident.id]-[service]"
      template: incident_channel
    invite_users:
      teams: ["[team]", "sre"]
    pin_message:
      content: |
        🚨 *Incident Summary*
        *Service:* [service]
        *Severity:* [severity]
        *Status:* [status]
        *Owner:* [owner]
```

### Microsoft Teams
```yaml
integration:
  name: "Teams Integration"
  features:
    - team_notifications
    - meeting_management
    - channel_threads
  actions:
    create_meeting:
      title: "[service] Incident Bridge"
      description: "Incident response for [service]"
      attendees: ["[team]"]
    post_message:
      channel: "Incidents"
      content: |
        ## 🚨 New Incident: [service]
        **Severity:** [severity]
        **Status:** [status]
        **Team:** [team]
```

### Zoom
```yaml
integration:
  name: "Zoom Integration"
  features:
    - meeting_management
    - recording_management
    - participant_tracking
  actions:
    create_meeting:
      name: "[service] Incident Bridge"
      participants: ["[team]"]
      settings:
        record: true
        waiting_room: false
    notify_participants:
      message: "Join incident call: [zoom_url]"
```

## Ticketing Integrations

### Jira
```yaml
integration:
  name: "Jira Integration"
  features:
    - issue_management
    - workflow_automation
    - field_mapping
  actions:
    create_issue:
      project: [project]
      type: Incident
      title: "[title]"
      description: |
        h2. Incident Details
        * Service: [service]
        * Severity: [severity]
        * Status: [status]
        * Owner: [owner]
    create_subtasks:
      - title: "Investigation"
        assignee: [owner]
      - title: "Communication"
        assignee: [comms_lead]
```

### ServiceNow
```yaml
integration:
  name: "ServiceNow Integration"
  features:
    - incident_management
    - change_management
    - cmdb_integration
  actions:
    create_incident:
      category: "incident"
      impact: [severity]
      service: [service]
      description: |
        Incident Details:
        - Service: [service]
        - Environment: [environment]
        - Impact: [impact_description]
    update_cmdb:
      ci_name: [service]
      status: degraded
```

## On-Call Integrations

### PagerDuty
```yaml
integration:
  name: "PagerDuty Integration"
  features:
    - on_call_management
    - escalation_policies
    - incident_tracking
  actions:
    create_incident:
      severity: [severity]
      service: [service]
      title: "[title]"
      description: |
        [severity] incident detected in [service]
        Environment: [environment]
        Impact: [impact_description]
    escalate_to:
      policy: [escalation_policy]
      message: "Requires immediate attention"
```

### OpsGenie
```yaml
integration:
  name: "OpsGenie Integration"
  features:
    - alert_management
    - team_routing
    - on_call_scheduling
  actions:
    create_alert:
      priority: [severity]
      message: "[title]"
      description: |
        Service: [service]
        Environment: [environment]
        Status: [status]
      teams: ["[team]"]
    add_timeline:
      note: "Alert created from incident"
```

## Automation Integrations

### GitHub Actions
```yaml
integration:
  name: "GitHub Integration"
  features:
    - workflow_automation
    - repository_management
    - issue_tracking
  actions:
    trigger_workflow:
      workflow: "incident-response"
      inputs:
        service: [service]
        environment: [environment]
    create_issue:
      title: "Incident: [title]"
      labels: ["incident", "[severity]"]
      assignees: ["[team]"]
```

### Jenkins
```yaml
integration:
  name: "Jenkins Integration"
  features:
    - job_execution
    - pipeline_automation
    - build_management
  actions:
    trigger_job:
      name: "incident-response"
      parameters:
        SERVICE: [service]
        ENVIRONMENT: [environment]
        SEVERITY: [severity]
```

## Integration Setup

### General Steps
1. Navigate to **Settings** → **Integrations**
2. Click **+ New Integration**
3. Select integration type
4. Configure authentication
5. Test connection

### Authentication
Most integrations support:
- API tokens
- OAuth 2.0
- Service accounts
- Role-based access

### Field Mapping
Map integration fields to Harness IR:
```yaml
field_mapping:
  severity:
    jira: priority
    servicenow: impact
    pagerduty: severity
  status:
    jira: status
    servicenow: state
    pagerduty: status
  owner:
    jira: assignee
    servicenow: assigned_to
    pagerduty: assigned_to
```

## Best Practices

### Integration Setup
- Use service accounts
- Configure proper permissions
- Test with sample data
- Document configuration
- Monitor health

### Communication Flow
- Define clear channels
- Set update frequency
- Use templates
- Enable threading
- Follow security rules

### Automation Rules
- Start simple
- Test thoroughly
- Monitor effectiveness
- Handle failures
- Document workflows

## Next Steps

### Documentation
- [Incident Overview](./incidents.md)
- [Incident Fields](./incident-fields.md)
- [Incident Workflows](./incident-workflows.md)

### Related Topics
- [Alert Integrations](../alerts/integrations.md)
- [Create a Runbook](../runbooks/create-runbook.md)
