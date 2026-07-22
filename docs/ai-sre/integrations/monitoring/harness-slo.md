---
title: Harness SLO Integration
sidebar_label: Harness SLO
sidebar_position: 12
description: Connect Harness Service Reliability Management SLO alerts to AI SRE to trigger incidents.
keywords:
  - ai-sre
  - integrations
  - harness-slo
tags:
  - integrations
---

Harness Service Reliability Management (SRM) tracks service level objectives and error budgets. Harness AI SRE ingests SRM SLO alerts to create and enrich incidents. This is a Harness-native source, not a third-party webhook.

## How AI SRE supports Harness SLO

When an SRM SLO breaches its error budget, the SLO alert is delivered to AI SRE. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Harness SLO

- Go to the [Harness SLO webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/harness-slo) to review the field mappings AI SRE applies to SRM SLO alerts and connect the source to AI SRE.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Prometheus integration](/docs/ai-sre/integrations/monitoring/prometheus) to ingest Prometheus Alertmanager alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
