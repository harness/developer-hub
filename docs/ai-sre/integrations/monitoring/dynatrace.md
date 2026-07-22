---
title: Dynatrace Integration
sidebar_label: Dynatrace
sidebar_position: 4
description: Connect Dynatrace to Harness AI SRE to ingest problem notifications and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - dynatrace
tags:
  - integrations
---

Dynatrace is an observability and application performance monitoring platform. Harness AI SRE ingests Dynatrace problem notifications through a webhook to create and enrich incidents.

## How AI SRE supports Dynatrace

Dynatrace POSTs problem notifications to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the problem.

## Set up Dynatrace

- Go to the [Dynatrace integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/dynatrace) to configure the problem notification webhook in Dynatrace and connect it to AI SRE.
- Go to the [Dynatrace webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/dynatrace) to review the field mappings AI SRE applies to Dynatrace payloads.

## Related integrations

- Go to the [New Relic integration](/docs/ai-sre/integrations/monitoring/new-relic) to ingest New Relic alert conditions.
- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
