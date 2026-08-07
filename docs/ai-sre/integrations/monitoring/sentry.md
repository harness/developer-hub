---
title: Sentry Integration
sidebar_label: Sentry
sidebar_position: 11
description: Ingest issue alerts through a webhook to open and enrich incidents.
keywords:
  - ai-sre
  - integrations
  - sentry
tags:
  - integrations
---

Sentry is an application error tracking and performance monitoring platform. Harness AI SRE ingests Sentry issue alerts through a webhook to create and enrich incidents.

## How AI SRE supports Sentry

Sentry POSTs issue alert notifications to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Sentry

Use this resource to connect Sentry to AI SRE:

- Go to the [Sentry webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/sentry) to review the field mappings AI SRE applies to Sentry payloads and connect the webhook to AI SRE.

## Related integrations

Explore other monitoring integrations that ingest alerts into AI SRE:

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [New Relic integration](/docs/ai-sre/integrations/monitoring/new-relic) to ingest New Relic alert conditions.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.

## Next steps

- Go to the [incidents documentation](/docs/ai-sre/incidents) to work with incidents created from Sentry alerts.
