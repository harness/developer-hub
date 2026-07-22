---
title: AlertSite Integration
sidebar_label: AlertSite
sidebar_position: 9
description: Connect AlertSite to Harness AI SRE to ingest monitoring alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - alertsite
tags:
  - integrations
---

AlertSite is a synthetic and API monitoring platform. Harness AI SRE ingests AlertSite monitoring alerts through a webhook to create and enrich incidents.

## How AI SRE supports AlertSite

AlertSite POSTs monitoring alerts to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up AlertSite

- Go to the [AlertSite webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/alertsite) to review the field mappings AI SRE applies to AlertSite payloads and connect the webhook to AI SRE.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Sentry integration](/docs/ai-sre/integrations/monitoring/sentry) to ingest Sentry issue alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
