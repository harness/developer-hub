---
title: Datadog Integration
sidebar_label: Datadog
sidebar_position: 1
description: Connect Datadog to Harness AI SRE to ingest monitor alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - datadog
tags:
  - integrations
---

Datadog is a monitoring and observability platform. Harness AI SRE ingests Datadog monitor alerts through a webhook to create and enrich incidents.

## How AI SRE supports Datadog

Datadog POSTs monitor alerts to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Datadog

- Go to the [Datadog integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/datadog) to configure the webhook in Datadog and connect it to AI SRE.
- Go to the [Datadog webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/datadog) to review the field mappings AI SRE applies to Datadog payloads.

## Related integrations

- Go to the [New Relic integration](/docs/ai-sre/integrations/monitoring/new-relic) to ingest New Relic alert conditions.
- Go to the [Grafana integration](/docs/ai-sre/integrations/monitoring/grafana) to ingest Grafana alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
