---
title: Route Alerts
description: Learn how to configure alert rules in Harness AI SRE to route, filter, and enrich incoming alerts.
sidebar_label: Overview
sidebar_position: 1
---

# Route Alerts

Alert Rules define how incoming alerts are processed and when incidents should be created.

## Overview

Alert rules help you:
- Create incidents from incoming alerts
- Map alert data to incident fields
- Set up automated responses with conditional logic
- Configure Harness AI SRE on-call notifications and paging
- Associate relevant runbooks for automated response

---

## Alert Rule Capabilities

### Field-Based Conditions

The default mode for alert rules uses a visual builder where you can:
- Select alert fields from your monitoring integrations
- Choose comparison operators (equals, contains, greater than, etc.)
- Combine multiple conditions with AND/OR logic
- No coding required

### CEL Expression Conditions

Write advanced boolean expressions for complex filtering:
- Regex pattern matching for service names
- Complex multi-field logic
- String operations and numeric comparisons
- More concise than multiple field-based conditions

Go to [Use CEL to Route Alerts](./use-cel-alert-rules.md) to learn about CEL expression mode.

### Incident Creation

Automatically create incidents from matching alerts:
- Map alert fields to incident properties
- Set incident severity and priority
- Associate services and environments
- Populate custom fields

### On-Call Paging

Page the on-call team when critical alerts arrive:
- Select impacted services
- Configure escalation policies
- Choose notification channels
- Set response time expectations

### Runbook Association

Attach automated response procedures:
- Automatically trigger runbooks on incident creation
- Suggest runbooks to responders
- Provide reference documentation

---

## Getting Started

Go to [Create an Alert Rule](./create-alert-rule.md) for step-by-step configuration instructions.

---

## Best Practices

- Create specific rules for different types of alerts
- Use clear, descriptive names for your rules
- Test rules with sample alerts before activating
- Review and update rules as your services evolve
- Document your rule configurations for team reference

---

## Next Steps

- Go to [Create an Alert Rule](./create-alert-rule.md) to configure your first alert rule.
- Go to [Use CEL to Route Alerts](./use-cel-alert-rules.md) to learn advanced conditional logic.
- Go to [Ingest Alerts](../webhooks/overview.md) to receive alerts from any monitoring system.
- Go to [Create Runbooks](../../runbooks/create-runbook.md) to automate alert responses.
