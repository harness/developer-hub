---
title: BigPanda Integration
sidebar_label: BigPanda
sidebar_position: 10
description: Connect BigPanda to Harness AI SRE to ingest alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - bigpanda
tags:
  - integrations
---

BigPanda is an event correlation and alert aggregation platform. Harness AI SRE ingests BigPanda alerts through a webhook to create and enrich incidents.

## How AI SRE supports BigPanda

BigPanda POSTs alert notifications to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up BigPanda

- Go to the [BigPanda webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/bigpanda) to review the field mappings AI SRE applies to BigPanda payloads and connect the webhook to AI SRE.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Prometheus integration](/docs/ai-sre/integrations/monitoring/prometheus) to ingest Prometheus Alertmanager alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
