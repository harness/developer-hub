---
title: Managing Incidents in Slack
description: Manage incidents directly from your Slack workspace with slash commands
sidebar_label: Slack Commands
sidebar_position: 6
---

Harness AI SRE provides a set of Slack slash commands that enable you to manage incidents directly from your workspace. These commands work within incident channels and provide quick access to common incident management actions.

## Prerequisites

Before using Slack commands, ensure your organization has completed the [Slack integration setup](../runbooks/runbook-action-integrations/slack.md).

## Available Commands

### Incident Management

| Command | Description |
|---------|-------------|
| `/harness new` | Create a new incident |
| `/harness edit` | Edit the incident associated with the current channel |
| `/harness close` | Close the incident associated with the current channel |
| `/harness reopen` | Reopen a closed incident associated with the current channel |

### Incident Information

| Command | Description |
|---------|-------------|
| `/harness summarize` | Display the current incident summary (visible only to you) |
| `/harness key-events` | Edit key events for the incident associated with the current channel |

### Collaboration

| Command | Description |
|---------|-------------|
| `/harness attach-meeting` | Link a video conference to this incident and automatically transcribe and detect key events from the discussion |
| `/harness runbook` | View runbook steps and run scripts for the incident associated with the current channel |

### On-Call Paging

:::info On-Call Feature Required
The following commands are available when your organization uses [Harness On-Call](../oncall/oncall.md). These commands enable you to page responders and track page status directly from Slack.
:::

| Command | Description |
|---------|-------------|
| `/harness page` | Page a user, user group, or service |
| `/harness page-status` | View page status for the incident associated with the current channel |

## Usage Examples

### Creating a New Incident

Type `/harness new` in any Slack channel to open the incident creation dialog. Fill in the incident details and submit to create a new incident with an associated Slack channel.

### Paging On-Call Responders

From an incident channel, use `/harness page` to page a user, user group, or service. When paging a service, notifications are sent through all configured contact methods (email, SMS, phone, mobile app) based on the service's [escalation policy](../oncall/oncall.md#escalation-policies).

To use paging commands, ensure your team has configured [on-call schedules](../oncall/oncall.md#schedule-management) and [escalation policies](../oncall/oncall.md#escalation-policies).

### Viewing Incident Summary

Use `/harness summarize` in an incident channel to get a quick overview of the current incident status, including severity, impacted services, and timeline of key events. The summary is displayed as a Slack ephemeral message visible only to you.

## Related Documentation

- [Slack Integration for Runbooks](../runbooks/runbook-action-integrations/slack.md)
- [On-Call Management](../oncall/oncall.md)
- [AI Scribe Agent](../ai-agent/ai-agent.md)
