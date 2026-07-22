---
title: Splunk Integration
sidebar_label: Splunk
sidebar_position: 3
description: Connect Splunk to Harness AI SRE to ingest alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - splunk
tags:
  - integrations
---

Splunk is a platform for searching, monitoring, and analyzing machine data. Harness AI SRE ingests Splunk alerts through a webhook to create and enrich incidents.

## How AI SRE supports Splunk

Splunk POSTs alert actions to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Splunk

- Go to the [Splunk integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/splunk) to configure the webhook alert action in Splunk and connect it to AI SRE.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Dynatrace integration](/docs/ai-sre/integrations/monitoring/dynatrace) to ingest Dynatrace problem notifications.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
