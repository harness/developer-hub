---
title: OpsGenie Integration
sidebar_label: OpsGenie
sidebar_position: 1
description: Connect OpsGenie to Harness AI SRE to sync on-call schedules, ingest alerts, and run incident actions.
keywords:
  - ai-sre
  - integrations
  - opsgenie
tags:
  - integrations
---

OpsGenie is an on-call and alerting platform. Harness AI SRE syncs OpsGenie on-call schedules, ingests OpsGenie alerts through a webhook, and runs OpsGenie actions from runbooks.

## How AI SRE supports OpsGenie

- **On-call schedule sync:** AI SRE reads OpsGenie schedules and rotations to identify the current on-call responder for an incident.
- **Alert webhook:** OpsGenie POSTs alerts to an AI SRE webhook URL, and AI SRE maps the payload to create or update an incident.
- **Runbook actions:** AI SRE runs OpsGenie actions from runbooks, including create alert, add responder, and close alert.

## Set up OpsGenie

- Go to the [OpsGenie on-call integration](/docs/ai-sre/oncall/integrations/opsgenie) to sync OpsGenie schedules with AI SRE.
- Go to the [OpsGenie alert webhook guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/opsgenie) to configure the webhook in OpsGenie and connect it to AI SRE.
- Go to the [OpsGenie runbook actions](/docs/ai-sre/runbooks/integrations/incident-management/opsgenie) to run OpsGenie actions from runbooks.

## Related integrations

- Go to the [PagerDuty integration](/docs/ai-sre/integrations/oncall/pagerduty) to sync PagerDuty schedules and run incident actions.
- Go to the [xMatters integration](/docs/ai-sre/integrations/oncall/xmatters) to sync xMatters on-call schedules.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
