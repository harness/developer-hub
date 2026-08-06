---
title: Configure External Systems to Send Webhooks
sidebar_label: Overview
sidebar_position: 1
description: Configure external monitoring tools, CI/CD systems, and cloud platforms to send webhooks to AI SRE.
keywords:
  - webhooks
  - integrations
  - external systems
  - configuration
tags:
  - ai-sre
  - alerts
redirect_from:
- /docs/incident-response/alerts/webhooks/integrations
- /docs/ai-sre/alerts/webhooks/integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

After creating a webhook integration in Harness AI SRE, configure your external monitoring tool, CI/CD system, or cloud platform to send webhook notifications to the unique webhook URL.

## Overview

This section provides step-by-step configuration guides for popular external systems. Each guide walks you through:

1. **Locating webhook settings** in the external platform
2. **Configuring the webhook URL** provided by Harness
3. **Selecting events and triggers** to send
4. **Testing the integration** to verify data flow
5. **Troubleshooting** common configuration issues

---

## How to use these guides

### Step 1: Create a webhook in Harness

Before configuring the external system:

1. Navigate to **Integrations**, then **New Integration** in Harness AI SRE.
2. Select the appropriate **webhook template** for your tool.
3. Copy the **webhook URL** displayed after saving.

Go to [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview) for detailed webhook creation steps.

### Step 2: Configure the external system

Use the relevant guide below to configure your external tool to send webhooks to Harness. Each guide provides:

- **Navigation paths** to webhook settings in the external platform
- **Required configuration** (URL, headers, authentication)
- **Event selection** guidance
- **Payload examples** showing what data is sent
- **Test procedures** to verify the integration

### Step 3: Verify alert creation

After configuration:

1. Trigger a test alert in the external system.
2. Check that the alert appears in Harness AI SRE.
3. Verify field mapping is correct.
4. Review the alert timeline for any errors.

---

## Available integration guides

### Monitoring and observability

Detailed external setup guides are available for these monitoring platforms:

- [Datadog](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/datadog): Configure Datadog monitors to send alerts via webhook.
- [PagerDuty](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/pagerduty): Set up PagerDuty webhook extensions and V3 webhooks.
- [Prometheus (AlertManager)](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/prometheus): Configure AlertManager webhook receivers.
- [Grafana](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/grafana): Set up Grafana Unified Alerting contact points.
- [New Relic](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/new-relic): Configure New Relic Applied Intelligence workflows.
- [Opsgenie](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/opsgenie): Set up Opsgenie outgoing webhook integrations.
- [Splunk](/docs/ai-sre/alerts/webhooks/integration-guides/monitoring/splunk): Configure Splunk alert actions to send webhooks.

#### Additional monitoring tools

These tools have webhook templates in Harness but use standard webhook configuration (go to each tool's official documentation for details):

- **Dynatrace:** Go to the [Dynatrace webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/dynatrace) to configure the integration.
- **Sentry:** Go to the [Sentry webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/sentry) to configure the integration.
- **Lacework:** Go to the [Lacework webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/lacework) to configure the integration.
- **BigPanda:** Go to the [BigPanda webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/bigpanda) to configure the integration.
- **AlertSite:** Go to the [AlertSite webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/alertsite) to configure the integration.
- **Grafana Incident:** Go to the [Grafana Incident webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/grafana-incident) to configure the integration.
- **Harness SLO:** Go to the [Harness SLO webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/harness-slo) to configure the integration.

### Cloud platforms

- [AWS CloudWatch](/docs/ai-sre/alerts/webhooks/integration-guides/cloud/aws-cloudwatch): Configure CloudWatch alarms with SNS and HTTPS subscriptions.

### CI/CD and development

Detailed external setup guides are available for:

- [GitHub](/docs/ai-sre/alerts/webhooks/integration-guides/cicd/github): Set up GitHub repository and organization webhooks.
- [GitLab](/docs/ai-sre/alerts/webhooks/integration-guides/cicd/gitlab): Configure GitLab project and group webhooks.

#### Additional CI/CD tools

These tools have webhook templates in Harness but use standard webhook configuration:

- **Bitbucket:** Go to the [Bitbucket webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/bitbucket) to configure the integration.
- **Travis CI:** Go to the [Travis CI webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/travis-ci) to configure the integration.
- **Octopus Deploy:** Go to the [Octopus Deploy webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/octopus-deploy) to configure the integration.

### ITSM and ticketing

These tools have webhook templates in Harness but use standard webhook configuration:

- **Jira:** Go to the [Jira webhook template](/docs/ai-sre/alerts/webhooks/templates/itsm/jira) to configure the integration.
- **ServiceNow:** Go to the [ServiceNow webhook template](/docs/ai-sre/alerts/webhooks/templates/itsm/servicenow) to configure the integration.

For bidirectional synchronization with Jira and ServiceNow, also configure:
- Go to the [Jira runbook integration](/docs/ai-sre/runbooks/integrations/jira) to create and update issues.
- Go to the [ServiceNow runbook integration](/docs/ai-sre/runbooks/integrations/servicenow) to post work notes and updates.

---

## Common configuration patterns

### Basic webhook configuration

Most tools follow this pattern:

1. **Webhook URL:** Paste the Harness webhook URL.
2. **HTTP method:** POST (default for most tools).
3. **Content-Type:** `application/json`.
4. **Events:** Select relevant events (alerts, incidents, deployments).
5. **Authentication:** Usually none required (secret in URL path).

### Advanced configuration

Some platforms support:

- **Custom headers:** Add authentication tokens or metadata.
- **Payload templates:** Customize the JSON structure before sending.
- **Conditional triggers:** Only send webhooks for specific conditions.
- **Batch delivery:** Group multiple events in a single webhook.
- **Retry logic:** Automatic retry on delivery failure.

### Testing webhooks

Always test webhook configuration:

1. **Trigger a test event** in the external system.
2. **Check delivery logs** in the external platform (if available).
3. **Verify alert creation** in Harness AI SRE.
4. **Review field mapping** to ensure correct data extraction.
5. **Check error logs** if webhook delivery fails.

---

## Troubleshooting common issues

<Troubleshoot
  issue="External system reports webhook delivery failure or timeout to Harness"
  mode="docs"
  fallback="Verify the webhook URL is exactly as provided by Harness with no extra spaces or characters, check network connectivity from the external system to Harness, ensure no firewall rules block outbound HTTPS traffic, and confirm the webhook is enabled and not in Quiet Mode."
/>

<Troubleshoot
  issue="Webhook delivery succeeds but alerts do not appear in Harness AI SRE"
  mode="docs"
  fallback="Confirm field mapping extracts required fields such as title and description, verify the payload structure matches the webhook template, review route alerts so alerts are not filtered out, confirm the correct template was selected, and check the webhook event log for parsing errors."
/>

<Troubleshoot
  issue="Alerts appear in Harness with missing or incorrect field mapping"
  mode="docs"
  fallback="Review the webhook payload structure in the external system, update JSONPath expressions in saved fields to match the payload, adjust Mustache templates in mapped fields, and test with sample payloads using the webhook test feature."
/>

<Troubleshoot
  issue="The same webhook alert appears multiple times in Harness"
  mode="docs"
  fallback="Confirm only one webhook integration is configured for the external system, review route alerts for duplicate routing, verify the external system is not sending duplicate webhook POSTs, and consider alert deduplication rules based on unique identifiers."
/>

<Troubleshoot
  issue="External system requires webhook authentication that is not configured"
  mode="docs"
  fallback="Most Harness webhooks do not require authentication because the secret is in the URL path. For a challenge response, contact Harness support. For SNS subscription confirmation with AWS CloudWatch, follow the CloudWatch guide, and confirm the webhook URL includes the secret key portion."
/>

---

## Best practices

### Configuration management

- **Document webhook URLs:** Store webhook URLs securely (they contain secrets).
- **Use descriptive names:** Name webhooks clearly in both systems.
- **Version control:** Document webhook configurations in runbooks.
- **Test thoroughly:** Always test before relying on webhooks in production.

### Security

- **Protect webhook URLs:** Treat webhook URLs as secrets (they contain authentication).
- **Rotate secrets:** If a webhook URL is compromised, delete and recreate the integration.
- **Limit access:** Only authorized users should access webhook configuration.
- **Use HTTPS:** All Harness webhooks use HTTPS by default.

### Maintenance

- **Monitor webhook health:** Check delivery success rates in external systems.
- **Update on platform changes:** External system updates may change payload structure.
- **Clean up unused webhooks:** Delete integrations that are no longer needed.
- **Document changes:** Record any modifications to webhook configuration.

### Performance

- **Batch when possible:** Some tools support batching multiple events.
- **Set appropriate retry policies:** Configure external system retry behavior.
- **Monitor volume:** High-volume webhooks may require rate limiting.
- **Use filters:** Only send relevant events to reduce noise.

---

## Next steps

### Get started
- [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview): Create a webhook integration in Harness.
- [Webhook Templates](/docs/ai-sre/alerts/webhooks/templates/overview): Browse available templates.
- [Use CEL in Webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks): Filter webhook payloads.

### Advanced configuration
- [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview): Route and process webhook-generated alerts.
- [Create a Runbook](/docs/ai-sre/runbooks/create-runbook): Automate responses to webhook alerts.
- [AI SRE Best Practices](/docs/ai-sre/resources/ai-sre-best-practices): Optimize webhook integrations.

### Get help
If you encounter issues not covered in these guides:
- Go to the external system's official webhook documentation to confirm required settings.
- Review the webhook event log in Harness for detailed error messages.
- Contact Harness support with webhook delivery logs from both systems.
