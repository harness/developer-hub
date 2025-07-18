---
title: Incident Overview
description: Learn about incident management in Harness AI SRE, including incident creation, workflows, and best practices.
sidebar_label: Overview
sidebar_position: 1
redirects_from:
- /docs/incident-response/incidents/incidents
---

# Incident Management

Learn how to effectively manage incidents in Harness AI SRE.

## Overview

Incidents in Harness AI SRE help you:
- Track and manage service disruptions
- Coordinate response efforts
- Document incident timelines
- Automate remediation steps
- Generate post-mortems

## Incident Components

### Basic Information
```yaml
incident:
  title: "[service] - [issue_type]"
  severity: [severity]
  status: [status]
  owner: [team]
  created_at: [timestamp]
```

### Service Context
```yaml
service_context:
  name: [service]
  environment: [environment]
  team: [team]
  components:
    - name: [component]
      status: [status]
```

### Timeline Events
```yaml
timeline:
  - timestamp: [timestamp]
    type: "detection"
    description: "Issue detected by [source]"
  - timestamp: [timestamp]
    type: "action"
    description: "Executed [runbook] in response"
  - timestamp: [timestamp]
    type: "update"
    description: "Status changed to [status]"
```

## Incident Creation

### From Alert
```yaml
alert_to_incident:
  title: "[alert.service] - [alert.message]"
  severity: [alert.severity]
  source: [alert.source]
  context:
    service: [alert.service]
    environment: [alert.environment]
```

### Manual Creation
```yaml
manual_incident:
  title: "[service] Degradation"
  severity: P2
  owner: [team]
  description: "Customer reported issues with [service]"
```

### SLO Violation
```yaml
slo_incident:
  title: "SLO Breach - [service]"
  severity: P1
  slo:
    name: [slo_name]
    current: [current_value]
    threshold: [threshold]
```

## Incident Management

### Status Updates
```yaml
status_update:
  status: [status]
  timestamp: [timestamp]
  message: "Updated status to [status]"
  notify:
    - channel: "#[service]-incidents"
    - team: [team]
```

### Ownership Changes
```yaml
ownership_change:
  from: [current_owner]
  to: [new_owner]
  reason: "Escalating to [team] for [reason]"
  notify:
    - current_owner
    - new_owner
```

### Communication
```yaml
communication:
  channel: "#[service]-incidents"
  mentions: ["@[team]"]
  updates:
    - type: "status"
      template: "ℹ️ Status Update: [message]"
    - type: "action"
      template: "⚡ Action Taken: [action]"
```

## Best Practices

### Incident Response
- Acknowledge quickly
- Assess impact
- Communicate status
- Document actions
- Update stakeholders

### Documentation
- Use clear titles
- Include context
- Track timeline
- Document decisions
- Note follow-ups

### Communication
- Be clear and concise
- Update regularly
- Use right channels
- Include key details
- Follow templates

## Next Steps

### Documentation
- [Incident Fields](./incident-fields.md)
- [Incident Workflows](./incident-workflows.md)
- [Incident Templates](./incident-templates.md)

### Related Topics
- [Alert Rules](../alerts/alert-rules.md)
- [Create a Runbook](../runbooks/create-runbook.md)
