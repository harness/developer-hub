---
title: Route Alerts
description: Configure alert rules to route, filter, and enrich incoming alerts.
sidebar_label: Overview
sidebar_position: 1
keywords:
  - alert rules
  - routing
  - conditions
  - incidents
tags:
  - ai-sre
  - alerts
---

Alert rules define how incoming alerts are processed and when incidents should be created.

## Overview

Alert rules help you:
- Create incidents from incoming alerts
- Map alert data to incident fields
- Set up automated responses with conditional logic
- Configure Harness AI SRE on-call notifications and paging
- Associate relevant runbooks for automated response

---

## Alert rule capabilities

### Field-based conditions

The default mode for alert rules uses a visual builder where you can:
- Select alert fields from your monitoring integrations
- Choose comparison operators (equals, contains, greater than, and others)
- Combine multiple conditions with AND/OR logic
- No coding required

### CEL expression conditions

Write advanced boolean expressions for complex filtering:
- Regex pattern matching for service names
- Complex multi-field logic
- String operations and numeric comparisons
- More concise than multiple field-based conditions

Go to [Use CEL to Route Alerts](/docs/ai-sre/alerts/alert-rules/use-cel-alert-rules) to understand CEL expression mode.

### Incident creation

Automatically create incidents from matching alerts:
- Map alert fields to incident properties
- Set incident severity and priority
- Associate services and environments
- Populate custom fields

### On-call notifications

Page the on-call team when critical alerts arrive:
- Select impacted services
- Configure escalation policies
- Choose notification channels
- Set response time expectations

### Runbook association

Attach automated response procedures:
- Automatically trigger runbooks on incident creation
- Suggest runbooks to responders
- Provide reference documentation

---

## Getting started

Go to [Create an Alert Rule](/docs/ai-sre/alerts/alert-rules/create-alert-rule) for step-by-step configuration instructions.

---

## Best practices

Keep these guidelines in mind when you create and maintain alert rules:

- Create specific rules for different types of alerts
- Use clear, descriptive names for your rules
- Test rules with sample alerts before activating
- Review and update rules as your services evolve
- Document your rule configurations for team reference

---

## Next steps

- [Create an Alert Rule](/docs/ai-sre/alerts/alert-rules/create-alert-rule): Configure your first alert rule.
- [Use CEL to Route Alerts](/docs/ai-sre/alerts/alert-rules/use-cel-alert-rules): Apply advanced conditional logic.
- [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview): Receive alerts from any monitoring system.
- [Create Runbooks](/docs/ai-sre/runbooks/create-runbook): Automate alert responses.
