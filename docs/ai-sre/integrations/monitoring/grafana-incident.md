---
title: Grafana Incident Integration
sidebar_label: Grafana Incident
sidebar_position: 6.5
description: Ingest incident events through a webhook to open and enrich incidents.
keywords:
  - ai-sre
  - integrations
  - grafana incident
tags:
  - integrations
---

Grafana Incident is Grafana's incident response platform. Harness AI SRE ingests Grafana Incident events through a webhook to create and enrich incidents. This integration is distinct from the [Grafana integration](/docs/ai-sre/integrations/monitoring/grafana), which ingests Grafana alerts.

## How AI SRE supports Grafana Incident

Grafana Incident POSTs incident events to an AI SRE webhook URL. AI SRE maps the payload with a webhook template, reading the incident title, ID, and severity, and creates a new incident or updates an existing one.

## Set up Grafana Incident

- Go to the [Grafana Incident webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/grafana-incident) to review the field mappings AI SRE applies to Grafana Incident payloads.
- Go to [Create a Webhook](/docs/ai-sre/alerts/webhooks/create-webhook) to create the webhook URL and connect it to AI SRE.

## Related integrations

- Go to the [Grafana integration](/docs/ai-sre/integrations/monitoring/grafana) to ingest Grafana alerts.
- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
