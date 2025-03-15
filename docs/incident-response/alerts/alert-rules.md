---
title: Configure Alert Rules
description: Learn how to configure alert rules in Harness Incident Response to route, filter, and enrich incoming alerts.
sidebar_label: Alert Rules
sidebar_position: 4
---

# Configure Alert Rules

Learn how to create and manage alert rules to effectively handle incoming alerts.

## Overview

Alert rules in Harness IR help you:
- Route alerts to the right teams
- Filter out noise
- Enrich alerts with context
- Trigger automated responses
- Standardize alert handling

## Rule Components

### Conditions
Define when a rule should trigger:
```yaml
conditions:
  service: [service]
  environment: [environment]
  severity: [P1, P2]
  source: [source]
  custom_field: [value]
```

### Actions
Specify what happens when conditions match:
```yaml
actions:
  - create_incident:
      severity: [incident.severity]
      service: [incident.service]
  - trigger_runbook:
      name: "CPU Response"
      variables:
        affected_service: [incident.service]
        alert_severity: [incident.severity]
  - notify:
      channel: "#[service]-alerts"
      message: "🚨 [incident.severity] alert in [incident.service]"
```

### Enrichment
Add context to incoming alerts:
```yaml
enrichment:
  add_fields:
    team: [team]
    component: [component]
  add_tags:
    - [environment]
    - [service]-system
  add_links:
    - name: "Service Dashboard"
      url: "https://grafana.example.com/d/[service]"
```

## Rule Types

### Routing Rules
Direct alerts to specific teams or channels:
```yaml
name: "Production Routing"
conditions:
  environment: production
actions:
  route_to:
    team: [team]
    severity_override:
      P1: immediate_response
      P2: next_business_hour
```

### Filtering Rules
Reduce alert noise:
```yaml
name: "Development Filter"
conditions:
  environment: development
  severity: P3
actions:
  suppress: true
  log_only: true
```

### Enrichment Rules
Add context to alerts:
```yaml
name: "Service Context"
conditions:
  service: [service]
enrichment:
  add_fields:
    owner: [team]
    oncall_rotation: [team]-primary
  add_links:
    - name: "Service Docs"
      url: "https://docs.example.com/[service]"
```

### Correlation Rules
Group related alerts:
```yaml
name: "Database Correlation"
conditions:
  service_type: database
correlation:
  window: 5m
  group_by: [cluster, instance]
  threshold: 3
actions:
  create_incident: true
```

## Rule Configuration

### Step 1: Create Rule
1. Navigate to **Settings** → **Alert Rules**
2. Click **+ New Rule**
3. Select rule type
4. Configure conditions and actions

### Step 2: Set Priority
1. Assign rule priority (1-100)
2. Higher priority rules execute first
3. Configure rule ordering

### Step 3: Test Rule
1. Use test alert payload
2. Verify condition matching
3. Check action execution
4. Validate enrichment

## Best Practices

### Rule Design
- Start with broad rules
- Refine based on patterns
- Use clear rule names
- Document rule purpose
- Review periodically

### Conditions
- Be specific but not brittle
- Use multiple conditions
- Consider edge cases
- Test thoroughly
- Monitor effectiveness

### Actions
- Start with logging
- Add actions gradually
- Test automated responses
- Monitor action success
- Have fallbacks

## Common Use Cases

### Service-Based Routing
```yaml
name: "Service Team Routing"
conditions:
  service: [service]
actions:
  route_to:
    team: [team]
    channel: "#[service]-alerts"
```

### Environment-Based Handling
```yaml
name: "Production Priority"
conditions:
  environment: production
actions:
  adjust_severity:
    P3: P2
    P2: P1
  notify_additional:
    - "#sre-management"
```

### Business Hours Handling
```yaml
name: "After Hours P2"
conditions:
  severity: P2
  business_hours: false
actions:
  route_to: oncall_backup
  adjust_severity: P1
```

### Runbook Integration
```yaml
name: "High CPU Response"
conditions:
  metric: cpu.usage
  threshold: 90
  duration: 5m
actions:
  trigger_runbook:
    name: "CPU Remediation"
    variables:
      affected_service: [incident.service]
      alert_severity: [incident.severity]
      threshold: [metric.threshold]
```

## Next Steps

### Documentation
- [Alert Overview](./alerts.md)
- [Configure Webhooks](./webhooks.md)
- [Alert Integrations](./integrations.md)

### Related Topics
- [Create a Runbook](../runbooks/create-runbook.md)
- [Configure Fields](../runbooks/configure-incident-fields.md)
