---
title: Lacework Integration
sidebar_label: Lacework
sidebar_position: 11
description: Connect Lacework to Harness AI SRE to ingest security alerts and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - lacework
tags:
  - integrations
---

Lacework is a cloud security and compliance platform. Harness AI SRE ingests Lacework security alerts through a webhook to create and enrich incidents.

## How AI SRE supports Lacework

Lacework POSTs security alert notifications to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alert.

## Set up Lacework

- Go to the [Lacework webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/lacework) to review the field mappings AI SRE applies to Lacework payloads and connect the webhook to AI SRE.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [AWS CloudWatch integration](/docs/ai-sre/integrations/monitoring/aws-cloudwatch) to ingest CloudWatch alarms.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
