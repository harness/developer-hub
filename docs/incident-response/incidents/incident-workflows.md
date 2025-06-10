---
title: Configure Incident Workflows
description: Learn how to configure automated workflows for incident management in Harness Incident Response.
sidebar_label: Incident Workflows
sidebar_position: 3
---

# Configure Incident Workflows

Learn how to create and manage automated incident workflows in Harness IR.

## Overview

Incident workflows help you:
- Automate response actions
- Standardize processes
- Coordinate teams
- Track progress
- Ensure compliance

## Workflow Types

### Detection Workflow
```yaml
name: "Service Alert to Incident"
trigger:
  type: alert
  conditions:
    service: [service]
    severity: [P1, P2]
actions:
  - create_incident:
      template: "Service Incident"
      fields:
        service: [alert.service]
        severity: [alert.severity]
  - notify:
      channel: "#[service]-incidents"
      message: "🚨 New [severity] incident created for [service]"
```

### Response Workflow
```yaml
name: "P1 Incident Response"
trigger:
  type: incident
  conditions:
    severity: P1
    status: detected
actions:
  - create_zoom:
      name: "[service] P1 Incident Bridge"
      participants: ["[team]"]
  - notify_oncall:
      team: [team]
      message: "🔴 Join P1 incident call: [zoom_url]"
  - trigger_runbook:
      name: "Incident Response"
      variables:
        service: [incident.service]
        severity: [incident.severity]
```

### Update Workflow
```yaml
name: "Status Update Notification"
trigger:
  type: incident_update
  conditions:
    field: status
actions:
  - notify:
      channel: "#[service]-incidents"
      message: "ℹ️ Status changed to [status] for [service]"
  - update_timeline:
      type: status_change
      description: "Status updated to [status]"
```

### Resolution Workflow
```yaml
name: "Incident Resolution"
trigger:
  type: incident_update
  conditions:
    status: resolved
actions:
  - trigger_runbook:
      name: "Post-Incident Tasks"
      variables:
        incident_id: [incident.id]
  - schedule_review:
      title: "[service] Incident Review"
      team: [team]
      due: "+3d"
  - notify:
      channel: "#[service]-incidents"
      message: "✅ Incident resolved: [title]"
```

## Workflow Components

### Triggers
```yaml
triggers:
  alert_trigger:
    type: alert
    conditions:
      service: [service]
      severity: [severity]
  incident_trigger:
    type: incident
    conditions:
      status: [status]
      team: [team]
  update_trigger:
    type: incident_update
    conditions:
      field: [field]
      value: [value]
```

### Actions
```yaml
actions:
  notification:
    type: notify
    channel: "#[channel]"
    message: "[message]"
  runbook:
    type: trigger_runbook
    name: [runbook]
    variables: [variables]
  meeting:
    type: create_meeting
    platform: [zoom, teams]
    title: "[title]"
  ticket:
    type: create_ticket
    type: [jira, servicenow]
    template: [template]
```

### Conditions
```yaml
conditions:
  severity_check:
    field: severity
    operator: in
    values: [P1, P2]
  team_check:
    field: team
    operator: equals
    value: [team]
  status_check:
    field: status
    operator: changed_to
    value: [status]
```

## Integration Examples

### Slack Integration
```yaml
slack_workflow:
  name: "Slack Incident Management"
  actions:
    - create_channel:
        name: "inc-[incident.id]-[service]"
        template: incident_channel
    - invite_users:
        teams: ["[team]", "sre"]
    - pin_message:
        content: |
          🚨 *Incident Summary*
          *Service:* [service]
          *Severity:* [severity]
          *Status:* [status]
          *Owner:* [owner]
```

### Jira Integration
```yaml
jira_workflow:
  name: "Jira Incident Tracking"
  actions:
    - create_issue:
        project: [project]
        type: Incident
        title: "[title]"
        description: |
          h2. Incident Details
          * Service: [service]
          * Severity: [severity]
          * Status: [status]
          * Owner: [owner]
    - create_subtasks:
        - title: "Investigation"
          assignee: [owner]
        - title: "Communication"
          assignee: [comms_lead]
```

### PagerDuty Integration
```yaml
pagerduty_workflow:
  name: "PagerDuty Escalation"
  actions:
    - create_incident:
        severity: [severity]
        service: [service]
        title: "[title]"
    - escalate_to:
        policy: [escalation_policy]
        message: "P1 incident requires immediate attention"
```

## Best Practices

### Workflow Design
- Start simple
- Add automation gradually
- Test thoroughly
- Monitor effectiveness
- Document clearly

### Action Configuration
- Set timeouts
- Handle failures
- Add retries
- Log actions
- Verify results

### Integration Management
- Use service accounts
- Secure credentials
- Monitor usage
- Update regularly
- Test connections

## Next Steps

### Documentation
- [Incident Overview](./incidents.md)
- [Incident Fields](./incident-fields.md)
- [Incident Templates](./incident-templates.md)

### Related Topics
- [Alert Rules](../alerts/alert-rules.md)
- [Create a Runbook](../runbooks/create-runbook.md)
