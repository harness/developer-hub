---
title: Use Slack Commands
description: Manage incidents directly from your Slack workspace with slash commands
sidebar_position: 8
---

Harness AI SRE provides a set of Slack slash commands that enable you to manage incidents directly from your workspace. 

These commands work within incident channels and provide quick access to common incident management actions.

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

### Runbook Execution

| Command | Description |
|---------|-------------|
| `/harness run <slug>` | Execute a runbook by its slug (requires Slack authentication) |
| `/harness run` | List all available runbook slugs for the current project |

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

### Running Runbooks with Slugs

Runbook slugs enable you to execute automated response procedures directly from Slack without navigating the Harness UI. This feature is designed for on-call responders who need to trigger runbooks instantly during high-pressure incidents.

#### Prerequisites

- **Slack authentication**: You must authenticate Slack with Harness AI SRE. The first time you use a slug command, you will be prompted to authenticate.
- **Runbook configuration**: Runbooks must have slugs configured by your administrator. Go to [Create Runbooks](/docs/ai-sre/runbooks/create-runbook#configure-runbook-slugs) to learn how administrators assign slugs.

#### Execute a Runbook by Slug

From an incident Slack channel, type:

```
/harness run <slug>
```

Replace `<slug>` with the runbook's short identifier (e.g., `/harness run restart-pods`).

**What happens:**
1. Slack validates your authentication.
2. Harness looks up the runbook associated with the slug for the current project and incident.
3. The runbook executes, and you receive confirmation in Slack.
4. Execution progress appears in the incident timeline.

#### List Available Slugs

If you do not know which slugs are available, type:

```
/harness run
```

**Output:**
- If slugs are configured, you will see a list formatted as:
  ```
  Use /harness run <slug> to run script:
  • restart-pods: Restart Kubernetes Pods
  • scale-up: Scale Up Infrastructure
  • rollback: Rollback Recent Deployment
  ```
- If no slugs are configured, you will see:
  ```
  No script slugs are available to run
  ```

The list shows all slugs available for the current project and incident context.

#### Best Practices

- **Memorize common slugs**: Frequently used runbooks (e.g., `restart-pods`, `rollback`) build muscle memory and reduce MTTR.
- **Use descriptive slug names**: Short but meaningful slugs make it easier to remember which runbook does what.
- **Authenticate early**: Complete Slack authentication during onboarding, not during an active incident.
- **Verify before execution**: Use `/harness run` (no argument) to confirm the slug name before executing.

### Paging On-Call Responders

From an incident channel, use `/harness page` to page a user, user group, or service. When paging a service, notifications are sent through all configured contact methods (email, SMS, phone, mobile app) based on the service's [escalation policy](../oncall/oncall.md#escalation-policies).

To use paging commands, ensure your team has configured [on-call schedules](../oncall/oncall.md#schedule-management) and [escalation policies](../oncall/oncall.md#escalation-policies).

### Viewing Incident Summary

Use `/harness summarize` in an incident channel to get a quick overview of the current incident status, including severity, impacted services, and timeline of key events. The summary is displayed as a Slack ephemeral message visible only to you.

## Related Documentation

- [Slack Integration for Runbooks](../runbooks/runbook-action-integrations/slack.md)
- [On-Call Management](../oncall/oncall.md)
- [AI Scribe Agent](/docs/ai-sre/ai-agent)
