---
title: Configure Alert Rules
description: Learn how to configure alert rules in Harness AI SRE to route, filter, and enrich incoming alerts.
sidebar_label: Alert Rules
sidebar_position: 4
---

# Alert Rules

Alert Rules define how incoming alerts are processed and when incidents should be created. This guide walks you through configuring alert rules in Harness AI SRE.

## Overview

Alert rules help you:
- Create incidents from incoming alerts
- Map alert data to incident fields
- Set up automated responses
- Configure Harness AI SRE on-call notifications (Coming in Q2)
- Associate relevant runbooks

## Accessing Alert Rules

1. From the main menu, select **Alerts**
2. Click **Configure Alert Rules**
3. Select the integration you want to create rules for (e.g., Datadog, PagerDuty, etc.)

## Configuration Steps

### Step 1: Define Alert Conditions

Use the visual condition builder to specify when incidents should be created. You can create conditions based on any field from your alert payload, such as:
- Alert severity or priority
- Service or application name
- Environment
- Alert message content
- Custom alert fields

The condition builder allows you to combine multiple conditions using AND/OR operators.

### Step 2: Map Alert Fields to Incident Fields

The field mapper shows you available fields from your alert payload that can be mapped to incident fields:

Standard incident fields include:
- Title
- Description
- Severity
- Priority
- Service
- Environment
- Custom fields

### Step 3: Configure On-Call Notifications (Coming in Q2)

:::note
The Harness AI SRE on-call module will be available in Q2. This will enable native on-call management within Harness AI SRE.
:::

When the Harness AI SRE on-call module becomes available, you will be able to configure:
- Which teams should be notified
- Escalation policies to use
- Response time expectations
- Notification channels

### Step 4: Associate Runbooks

Connect relevant runbooks to your alert rule. These runbooks can be:
- Automatically triggered when an incident is created
- Suggested to responders during incident resolution
- Used as reference documentation for AI SRE

## Best Practices

- Create specific rules for different types of alerts
- Use clear, descriptive names for your rules
- Test rules with sample alerts before activating
- Review and update rules as your services evolve
- Document your rule configurations for team reference

## Next Steps

- [Configure Webhooks](./webhooks.md)
- [Create Runbooks](../runbooks/create-runbook.md)
