---
title: New Relic Integration
sidebar_label: New Relic
sidebar_position: 2
description: Connect New Relic to Harness AI SRE to ingest alert conditions and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - new-relic
tags:
  - integrations
---

New Relic is an observability platform for applications and infrastructure. Harness AI SRE ingests New Relic alert conditions through a webhook to create and enrich incidents.

## How AI SRE supports New Relic

New Relic POSTs alert notifications to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up New Relic

- Go to the [New Relic integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/new-relic) to configure the webhook in New Relic and connect it to AI SRE.
- Go to the [New Relic webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/new-relic) to review the field mappings AI SRE applies to New Relic payloads.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Dynatrace integration](/docs/ai-sre/integrations/monitoring/dynatrace) to ingest Dynatrace problem notifications.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
