---
title: PagerDuty Integration
sidebar_label: PagerDuty
sidebar_position: 2
description: Sync on-call schedules, ingest alerts, and page responders from runbooks.
keywords:
  - ai-sre
  - integrations
  - pagerduty
tags:
  - integrations
---

PagerDuty is an on-call and incident response platform. Harness AI SRE syncs PagerDuty on-call schedules, ingests PagerDuty alerts through a webhook, and runs PagerDuty actions from runbooks.

## How AI SRE supports PagerDuty

AI SRE integrates with PagerDuty in the following ways:

- **On-call schedule sync:** AI SRE reads PagerDuty schedules and escalation policies to identify the current on-call responder for an incident.
- **Alert webhook:** PagerDuty POSTs alerts to an AI SRE webhook URL, and AI SRE maps the payload to create or update an incident.
- **Runbook actions:** AI SRE runs PagerDuty actions from runbooks, including create incident, add responder, and resolve incident.

## Set up PagerDuty

Use these resources to connect PagerDuty to AI SRE:

- Go to the [PagerDuty on-call integration](/docs/ai-sre/oncall/integrations/pagerduty) to sync PagerDuty schedules with AI SRE.
- Go to the [PagerDuty alert webhook guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/pagerduty) to configure the webhook in PagerDuty and connect it to AI SRE.
- Go to the [PagerDuty runbook actions](/docs/ai-sre/runbooks/integrations/incident-management/pagerduty) to run PagerDuty actions from runbooks.

## Related integrations

Explore other on-call integrations that work with AI SRE:

- Go to the [OpsGenie integration](/docs/ai-sre/integrations/oncall/opsgenie) to sync OpsGenie schedules and run incident actions.
- Go to the [xMatters integration](/docs/ai-sre/integrations/oncall/xmatters) to sync xMatters on-call schedules.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.

## Next steps

- Go to the [on-call documentation](/docs/ai-sre/oncall) to manage schedules and alert rules.
