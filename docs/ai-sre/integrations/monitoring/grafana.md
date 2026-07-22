---
title: Grafana Integration
sidebar_label: Grafana
sidebar_position: 5
description: Connect Grafana to Harness AI SRE to ingest alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - grafana
tags:
  - integrations
---

Grafana is a visualization and alerting platform for metrics and logs. Harness AI SRE ingests Grafana alerts through a webhook to create and enrich incidents.

## How AI SRE supports Grafana

Grafana POSTs alert notifications to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Grafana

- Go to the [Grafana integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/grafana) to configure the contact point webhook in Grafana and connect it to AI SRE.
- Go to the [Grafana webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/grafana) to review the field mappings AI SRE applies to Grafana alerting payloads.
- Go to the [Grafana Incident webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/grafana-incident) to map payloads from Grafana Incident.

## Related integrations

- Go to the [Prometheus integration](/docs/ai-sre/integrations/monitoring/prometheus) to ingest Prometheus Alertmanager alerts.
- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
