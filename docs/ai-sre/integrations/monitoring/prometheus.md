---
title: Prometheus Integration
sidebar_label: Prometheus
sidebar_position: 6
description: Connect Prometheus to Harness AI SRE to ingest Alertmanager alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - prometheus
tags:
  - integrations
---

Prometheus is an open-source metrics and alerting toolkit. Harness AI SRE ingests Prometheus alerts through Alertmanager, which POSTs to a webhook to create and enrich incidents.

## How AI SRE supports Prometheus

Prometheus routes firing alerts to Alertmanager, which POSTs them to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Prometheus

- Go to the [Prometheus integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/prometheus) to configure the Alertmanager webhook receiver and connect it to AI SRE.
- Go to the [Prometheus webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/prometheus) to review the field mappings AI SRE applies to Alertmanager payloads. The in-product template is named **AlertManager**.

## Related integrations

- Go to the [Grafana integration](/docs/ai-sre/integrations/monitoring/grafana) to ingest Grafana alerts.
- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
