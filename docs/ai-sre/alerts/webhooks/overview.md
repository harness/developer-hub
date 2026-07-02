---
title: Ingest Alerts
description: Learn how to configure webhooks in Harness AI SRE to receive alerts from any monitoring system or custom application.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/alerts/webhooks/overview
- /docs/ai-sre/alerts/webhooks
---

import DocImage from '@site/src/components/DocImage';

# Ingest Alerts

Harness AI SRE webhooks receive alerts from any system that can send HTTP requests.

## Overview

Webhooks provide a flexible way to integrate with any monitoring system or custom application. 

The webhook integration supports **any** JSON payload format with advanced filtering capabilities, making it easy to integrate with:
- **Custom monitoring solutions**: Internal tools and homegrown systems
- **Internal applications**: Business logic alerts and custom triggers
- **Third-party services**: Any service with webhook support
- **Legacy monitoring systems**: Older tools without native integrations

---

## Webhook Capabilities

### Flexible Payload Support

Accept any JSON structure:
- No schema restrictions
- Nested field support
- Array handling
- Custom field mapping

### Custom Field Mapping

Map webhook payload fields to alert properties:
- **Dynamic values**: Populate alert fields from incoming payloads
- **Nested field access**: Access nested data with dot notation
- **Mustache templates**: Reference webhook fields with `{{webhook.field_name}}`
- **CEL expressions**: Complex boolean logic for advanced scenarios

   <DocImage path={require('../static/webhook-field-mapping-advanced-cel.png')} width="100%" height="100%" title="Advanced webhook field mapping with CEL expressions for data extraction and transformation" />

Go to [Use CEL in Webhooks](./use-cel-webhooks.md) for details.

Go to [Use Mustache in Webhooks](./use-mustache-webhooks.md) for details.

---

## Getting Started

### Step 1: Choose your integration approach

Select the integration method that fits your use case:

- **Use a webhook template** — Pre-configured templates for popular monitoring tools with field mappings already set up. Go to [Webhook Templates](./templates/overview.md) for Datadog, PagerDuty, Grafana, and other supported tools.
- **Create a custom webhook** — Configure your own webhook for any tool that can send HTTP requests. Go to [Create a Webhook](./create-webhook.md) for step-by-step instructions.

### Step 2: Configure the external system

After creating your webhook in Harness, configure the external monitoring tool to send alerts to your webhook URL. Go to [External System Setup](./integration-guides/overview.md) for detailed guides on configuring Datadog, PagerDuty, Splunk, and other tools.

:::tip Service Paging Webhooks
For services that need dedicated on-call paging from external systems, use **Service Paging Webhooks** instead. Service paging webhooks automatically create alerts and page the on-call team via HTTP POST or email. Go to [Service Paging Webhook](/docs/ai-sre/oncall/service-paging-webhook) to learn more.
:::

---

## Next Steps

- Go to [Create a Webhook](./create-webhook.md) to set up your webhook endpoint.
- Go to [External System Setup](./integration-guides/overview.md) to configure Datadog, PagerDuty, Splunk, and other tools to send webhooks to Harness.
- Go to [Use CEL in Webhooks](./use-cel-webhooks.md) to filter webhook payloads with conditional logic.
- Go to [Use Mustache in Webhooks](./use-mustache-webhooks.md) to map webhook fields to alert properties.
- Go to [Route Alerts](../alert-rules/overview.md) to route and process incoming alerts.
