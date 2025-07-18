---
title: Configure Incident Templates
description: Learn how to create and manage incident templates in Harness AI SRE.
sidebar_label: Incident Templates
sidebar_position: 4
redirects_from:
- /docs/incident-response/incidents/incident-templates
---

# Configure Incident Templates

Learn how to create and manage incident templates in Harness AI SRE.

## Overview

Incident templates help you:
- Standardize incident handling
- Ensure consistent data collection
- Speed up incident creation
- Enable automation
- Support compliance

## Template Types

### Service Incident
```yaml
template:
  name: "Service Degradation"
  fields:
    title: "[service] - Performance Degradation"
    severity: [severity]
    service: [service]
    environment: [environment]
    team: [team]
  timeline:
    - type: "detection"
      description: "Performance degradation detected in [service]"
    - type: "action"
      description: "Investigating root cause"
  communication:
    channel: "#[service]-incidents"
    initial_message: |
      🚨 *New Incident: [service] Degradation*
      *Severity:* [severity]
      *Environment:* [environment]
      *Team:* [team]
      *Status:* Investigating
```

### Security Incident
```yaml
template:
  name: "Security Alert"
  fields:
    title: "[service] - Security Incident"
    severity: P1
    service: [service]
    environment: [environment]
    team: "security"
  timeline:
    - type: "detection"
      description: "Security alert detected for [service]"
    - type: "action"
      description: "Security team notified"
  runbook:
    name: "Security Incident Response"
    variables:
      service: [service]
      environment: [environment]
  communication:
    channel: "#security-incidents"
    restricted: true
    initial_message: |
      🔒 *Security Incident: [service]*
      *Environment:* [environment]
      *Status:* Investigation Started
      
      Please maintain security protocols.
```

### Infrastructure Incident
```yaml
template:
  name: "Infrastructure Issue"
  fields:
    title: "[service] - Infrastructure Problem"
    severity: [severity]
    service: [service]
    environment: [environment]
    team: "platform"
  timeline:
    - type: "detection"
      description: "Infrastructure issue detected in [service]"
    - type: "action"
      description: "Platform team investigating"
  metrics:
    - name: "cpu_usage"
      threshold: 90
    - name: "memory_usage"
      threshold: 85
    - name: "error_rate"
      threshold: 5
  communication:
    channel: "#platform-incidents"
    initial_message: |
      ⚠️ *Infrastructure Alert: [service]*
      *Issue:* [issue_type]
      *Environment:* [environment]
      *Impact:* [impact_description]
```

## Template Components

### Status Templates
```yaml
status_updates:
  investigating:
    message: |
      ℹ️ *Investigation Update*
      *Current Status:* Investigating
      *Findings:* [findings]
      *Next Steps:* [next_steps]
  mitigating:
    message: |
      🔧 *Mitigation Update*
      *Current Status:* Mitigating
      *Actions:* [actions]
      *Progress:* [progress]
  resolved:
    message: |
      ✅ *Resolution Update*
      *Status:* Resolved
      *Resolution:* [resolution]
      *Duration:* [duration]
      *Follow-up:* [follow_up]
```

### Communication Templates
```yaml
communication_templates:
  status_update:
    template: |
      *Status Update: [service]*
      *Current Status:* [status]
      *Update:* [message]
      *Next Update:* [next_update_time]
  action_taken:
    template: |
      ⚡ *Action Taken*
      *Action:* [action]
      *Result:* [result]
      *Next Steps:* [next_steps]
  escalation:
    template: |
      🔔 *Incident Escalated*
      *From:* [current_owner]
      *To:* [new_owner]
      *Reason:* [reason]
```

### Review Templates
```yaml
review_templates:
  timeline_summary:
    template: |
      *Incident Timeline*
      *Detection:* [detected_at]
      *Resolution:* [resolved_at]
      *Duration:* [duration]
      
      *Key Events:*
      [timeline_events]
  impact_summary:
    template: |
      *Impact Assessment*
      *Users Affected:* [affected_users]
      *Services Affected:* [affected_services]
      *Duration:* [duration]
      *Business Impact:* [business_impact]
  action_items:
    template: |
      *Follow-up Actions*
      [action_items]
      
      *Owners:* [owners]
      *Due Dates:* [due_dates]
```

## Template Usage

### Creating Incidents
```yaml
create_incident:
  template: "Service Degradation"
  variables:
    service: [service]
    severity: P2
    environment: production
    team: [team]
```

### Updating Status
```yaml
update_status:
  template: status_updates.investigating
  variables:
    findings: "High CPU usage detected"
    next_steps: "Scaling service instances"
```

### Resolving Incidents
```yaml
resolve_incident:
  template: status_updates.resolved
  variables:
    resolution: "Scaled service and optimized queries"
    duration: "45 minutes"
    follow_up: "Review scaling policies"
```

## Best Practices

### Template Design
- Keep it simple
- Include essential fields
- Use clear language
- Support automation
- Enable customization

### Communication
- Be clear and concise
- Include key details
- Use consistent format
- Follow security protocols
- Update regularly

### Template Management
- Review regularly
- Update as needed
- Gather feedback
- Monitor usage
- Document changes

## Next Steps

### Documentation
- [Incident Overview](./incidents.md)
- [Incident Fields](./incident-fields.md)
- [Incident Workflows](./incident-workflows.md)

### Related Topics
- [Alert Rules](../alerts/alert-rules.md)
- [Create a Runbook](../runbooks/create-runbook.md)
