---
title: Configure Incident Fields
description: Add and customize the fields captured on every incident.
sidebar_label: Configure Incident Fields
sidebar_position: 2
keywords:
  - incident fields
  - custom fields
  - severity
  - field validation
tags:
  - ai-sre
redirect_from:
- /docs/incident-response/incidents/incident-fields
---

Learn how to configure and customize fields for incidents in Harness AI SRE.

## Overview

Incident fields help you:
- Capture essential incident data
- Standardize incident reporting
- Enable effective filtering
- Support automation
- Generate insights

---

## Field types

### Required fields

#### Basic information
```yaml
field_definitions:
  title:
    type: string
    required: true
    template: "[service] - [issue_type]"
  severity:
    type: enum
    values: [P1, P2, P3, P4, P5]
    required: true
  status:
    type: enum
    values: [detected, investigating, mitigating, resolved]
    required: true
```

#### Severity field values

The severity field uses numeric string values internally. When configuring runbook triggers or API integrations, use these exact values:

| Value | Display Label | Severity Level |
|-------|---------------|----------------|
| `"0"` | SEV0:Critical | Highest severity |
| `"1"` | SEV1:Major | High severity |
| `"2"` | SEV2:Moderate | Moderate severity |
| `"3"` | SEV3:Minor | Low severity |
| `"4"` | SEV4:Cosmetic | Lowest severity |

**Important:** Severity is stored as a string, not a number. When using severity in runbook triggers or API calls, always use the string format (for example, `"0"` not `0`).

**Customize severity labels:** You can customize the display labels for severity levels to match your organization's terminology. Go to [Customize severity and priority labels](/docs/ai-sre/incidents/severities-priorities) to configure custom labels while maintaining compatibility with integrations and APIs.

**Alternative severity names:** The system accepts alternative severity names from external integrations and maps them automatically:

- **Maps to "0":** `SEV0`, `SECURITY0`, `CUSTOMER-P0`
- **Maps to "1":** `SEV1`, `INTERNAL-PROD`, `SECURITY1`, `CUSTOMER-P1`
- **Maps to "2":** `SEV2`, `DEPLOYMENT`, `SECURITY2`
- **Maps to "3":** `SEV3`, `INTERNAL-NONPROD`, `MAINTENANCE`
- **Maps to "4":** Any other value

Go to [Configure runbook triggers](/docs/ai-sre/runbooks/triggers/create-trigger#severity-field-values) to use severity values in trigger conditions.

#### Service context
```yaml
field_definitions:
  service:
    type: string
    required: true
    source: service_catalog
  environment:
    type: enum
    values: [production, staging, development]
    required: true
  team:
    type: string
    required: true
    source: team_directory
```

### Optional fields

#### Impact assessment
```yaml
field_definitions:
  affected_users:
    type: number
    description: "Number of affected users"
  error_rate:
    type: float
    unit: "percentage"
  regions:
    type: array
    items:
      type: string
      source: region_list
```

#### Timeline data
```yaml
field_definitions:
  detected_at:
    type: timestamp
    format: "ISO8601"
  resolved_at:
    type: timestamp
    format: "ISO8601"
  duration:
    type: duration
    computed: true
    formula: "resolved_at - detected_at"
```

---

## Field configuration

### Custom fields
```yaml
custom_fields:
  customer_impact:
    type: enum
    values: [none, low, medium, high, critical]
    description: "Impact level on customers"
  root_cause:
    type: string
    multiline: true
    description: "Root cause analysis"
  follow_up:
    type: array
    items:
      type: object
      properties:
        action: string
        owner: string
        due_date: timestamp
```

### Field dependencies
```yaml
dependencies:
  - if:
      severity: P1
    then:
      required: [customer_impact, root_cause]
  - if:
      status: resolved
    then:
      required: [resolution_summary, follow_up]
```

### Field validation
```yaml
validation:
  title:
    pattern: "[A-Za-z0-9\\s\\-]+"
    min_length: 10
    max_length: 100
  description:
    min_length: 50
    max_length: 1000
  affected_users:
    min: 0
    max: 1000000
```

---

## Field templates

### Service incident
```yaml
template:
  name: "Service Incident"
  fields:
    title: "[service] - Service Degradation"
    severity: [severity]
    service: [service]
    environment: [environment]
    team: [team]
    description: "Service degradation detected in [service]"
```

### Security incident
```yaml
template:
  name: "Security Incident"
  fields:
    title: "[service] - Security Alert"
    severity: P1
    service: [service]
    environment: [environment]
    team: "security"
    description: "Security incident detected in [service]"
```

### Infrastructure incident
```yaml
template:
  name: "Infrastructure Incident"
  fields:
    title: "[service] - Infrastructure Issue"
    severity: [severity]
    service: [service]
    environment: [environment]
    team: "platform"
    description: "Infrastructure issue detected in [service]"
```

---

## Field usage

### Incident creation
```yaml
create_incident:
  template: "Service Incident"
  values:
    service: [service]
    severity: P2
    environment: production
    team: [team]
```

### Status updates
```yaml
update_status:
  status: investigating
  fields:
    assignee: [user]
    notes: "Investigation started by [user]"
```

### Resolution
```yaml
resolve_incident:
  status: resolved
  fields:
    resolution_summary: [summary]
    root_cause: [root_cause]
    follow_up:
      - action: "Update runbook"
        owner: [team]
        due_date: [timestamp]
```

---

## Best practices

### Field design
- Use clear names
- Add descriptions
- Set validations
- Group related fields
- Support automation

### Templates
- Create for common cases
- Include required fields
- Set smart defaults
- Document usage
- Review periodically

### Field management
- Audit field usage
- Clean unused fields
- Update validations
- Monitor effectiveness
- Gather feedback

---

## Next steps

### Documentation
- [Incident overview](/docs/ai-sre/incidents): Understand the incident lifecycle.
- [Incident workflows](/docs/ai-sre/incidents/incident-workflows): Automate incident response.
- [Incident templates](/docs/ai-sre/incidents/incident-templates): Standardize incident creation.
- [Severity and priority labels](/docs/ai-sre/incidents/severities-priorities): Configure severity and priority.

### Related topics
- [Configure fields](/docs/ai-sre/runbooks/workflows/overview): Build workflow actions.
- [Route alerts](/docs/ai-sre/alerts/alert-rules/overview): Route alerts to incidents.
