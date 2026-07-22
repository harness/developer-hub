---
title: AWS CloudWatch Integration
sidebar_label: AWS CloudWatch
sidebar_position: 7
description: Connect AWS CloudWatch to Harness AI SRE to ingest alarms and trigger incidents.
keywords:
  - ai-sre
  - integrations
  - aws-cloudwatch
tags:
  - integrations
---

AWS CloudWatch is the monitoring and alarms service for AWS resources. Harness AI SRE ingests CloudWatch alarms through an Amazon SNS webhook to create and enrich incidents.

## How AI SRE supports AWS CloudWatch

CloudWatch alarms publish to an Amazon SNS topic, and SNS POSTs the notification to an AI SRE webhook URL. AI SRE maps the payload with a webhook template and creates a new incident or updates an existing one based on the alarm.

## Set up AWS CloudWatch

- Go to the [AWS CloudWatch integration guide](/docs/ai-sre/alerts/webhooks/integration-guides/cloud/aws-cloudwatch) to configure the SNS topic and HTTPS subscription and connect it to AI SRE.
- Go to the [AWS CloudWatch webhook template](/docs/ai-sre/alerts/webhooks/templates/cloud/aws-cloudwatch) to review the field mappings AI SRE applies to SNS payloads.

## Related integrations

- Go to the [Datadog integration](/docs/ai-sre/integrations/monitoring/datadog) to ingest Datadog monitor alerts.
- Go to the [Prometheus integration](/docs/ai-sre/integrations/monitoring/prometheus) to ingest Prometheus Alertmanager alerts.
- Go to the [Integration Management overview](/docs/ai-sre/integrations) to see all supported tools.
