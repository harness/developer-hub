---
title: Configure External Systems to Send Webhooks
sidebar_label: Overview
sidebar_position: 1
description: Learn how to configure external monitoring tools, CI/CD systems, and cloud platforms to send webhooks to Harness AI SRE.
redirect_from:
- /docs/incident-response/alerts/webhooks/integrations
- /docs/ai-sre/alerts/webhooks/integrations
---

# Configure External Systems to Send Webhooks

After creating a webhook integration in Harness AI SRE, configure your external monitoring tool, CI/CD system, or cloud platform to send webhook notifications to the unique webhook URL.

## Overview

This section provides step-by-step configuration guides for popular external systems. Each guide walks you through:

1. **Locating webhook settings** in the external platform
2. **Configuring the webhook URL** provided by Harness
3. **Selecting events and triggers** to send
4. **Testing the integration** to verify data flow
5. **Troubleshooting** common configuration issues

---

## How to Use These Guides

### Step 1: Create Webhook in Harness

Before configuring the external system:

1. Navigate to **Integrations** → **New Integration** in Harness AI SRE
2. Select the appropriate **webhook template** for your tool
3. Copy the **webhook URL** displayed after saving

Go to [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview) for detailed webhook creation steps.

### Step 2: Configure External System

Use the relevant guide below to configure your external tool to send webhooks to Harness. Each guide provides:

- **Navigation paths** to webhook settings in the external platform
- **Required configuration** (URL, headers, authentication)
- **Event selection** guidance
- **Payload examples** showing what data is sent
- **Test procedures** to verify the integration

### Step 3: Verify Alert Creation

After configuration:

1. Trigger a test alert in the external system
2. Check that the alert appears in Harness AI SRE
3. Verify field mapping is correct
4. Review the alert timeline for any errors

---

## Available Integration Guides

### Monitoring and Observability

Detailed external setup guides available for these monitoring platforms:

- **[Datadog](./monitoring/datadog.md)** - Configure Datadog monitors to send alerts via webhook
- **[PagerDuty](./monitoring/pagerduty.md)** - Set up PagerDuty webhook extensions and V3 webhooks
- **[Prometheus (AlertManager)](./monitoring/prometheus.md)** - Configure AlertManager webhook receivers
- **[Grafana](./monitoring/grafana.md)** - Set up Grafana Unified Alerting contact points
- **[New Relic](./monitoring/new-relic.md)** - Configure New Relic Applied Intelligence workflows
- **[OpsGenie](./monitoring/opsgenie.md)** - Set up OpsGenie outgoing webhook integrations
- **[Splunk](./monitoring/splunk.md)** - Configure Splunk alert actions to send webhooks

#### Additional Monitoring Tools

These tools have webhook templates in Harness but use standard webhook configuration (refer to their official documentation):

- **Dynatrace** - Go to [Dynatrace webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/dynatrace)
- **Sentry** - Go to [Sentry webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/sentry)
- **Lacework** - Go to [Lacework webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/lacework)
- **BigPanda** - Go to [BigPanda webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/bigpanda)
- **AlertSite** - Go to [AlertSite webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/alertsite)
- **Grafana Incident** - Go to [Grafana Incident webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/grafana-incident)
- **Harness SLO** - Go to [Harness SLO webhook template](/docs/ai-sre/alerts/webhooks/templates/monitoring/harness-slo)

### Cloud Platforms

- **[AWS CloudWatch](./cloud/aws-cloudwatch.md)** - Configure CloudWatch alarms with SNS and HTTPS subscriptions

### CI/CD and Development

Detailed external setup guides available for:

- **[GitHub](./cicd/github.md)** - Set up GitHub repository and organization webhooks
- **[GitLab](./cicd/gitlab.md)** - Configure GitLab project and group webhooks

#### Additional CI/CD Tools

These tools have webhook templates in Harness but use standard webhook configuration:

- **Bitbucket** - Go to [Bitbucket webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/bitbucket)
- **Travis CI** - Go to [Travis CI webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/travis-ci)
- **Octopus Deploy** - Go to [Octopus Deploy webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/octopus-deploy)

### ITSM and Ticketing

These tools have webhook templates in Harness but use standard webhook configuration:

- **Jira** - Go to [Jira webhook template](/docs/ai-sre/alerts/webhooks/templates/itsm/jira)
- **ServiceNow** - Go to [ServiceNow webhook template](/docs/ai-sre/alerts/webhooks/templates/itsm/servicenow)

For bidirectional synchronization with Jira and ServiceNow, also configure:
- [Jira runbook integration](/docs/ai-sre/runbooks/integrations/jira) for creating and updating issues
- [ServiceNow runbook integration](/docs/ai-sre/runbooks/integrations/servicenow) for posting work notes and updates

---

## Common Configuration Patterns

### Basic Webhook Configuration

Most tools follow this pattern:

1. **Webhook URL**: Paste the Harness webhook URL
2. **HTTP Method**: POST (default for most tools)
3. **Content-Type**: `application/json`
4. **Events**: Select relevant events (alerts, incidents, deployments)
5. **Authentication**: Usually none required (secret in URL path)

### Advanced Configuration

Some platforms support:

- **Custom headers**: Add authentication tokens or metadata
- **Payload templates**: Customize JSON structure before sending
- **Conditional triggers**: Only send webhooks for specific conditions
- **Batch delivery**: Group multiple events in a single webhook
- **Retry logic**: Automatic retry on delivery failure

### Testing Webhooks

Always test webhook configuration:

1. **Trigger test event** in external system
2. **Check delivery logs** in external platform (if available)
3. **Verify alert creation** in Harness AI SRE
4. **Review field mapping** to ensure correct data extraction
5. **Check error logs** if webhook delivery fails

---

## Troubleshooting Common Issues

### Webhook URL Not Working

**Symptom**: External system reports delivery failure or timeout

**Solutions**:
- Verify the webhook URL is exactly as provided by Harness (no extra spaces or characters)
- Check network connectivity from the external system to Harness
- Ensure no firewall rules block outbound HTTPS traffic
- Verify the webhook is enabled in Harness (not in quiet mode)

### Alerts Not Appearing in Harness

**Symptom**: External system shows successful delivery, but no alerts in Harness

**Solutions**:
- Check that field mapping extracts required fields (title, description)
- Verify payload structure matches the webhook template expectations
- Review route alerts to ensure alerts are not being filtered out
- Check that the correct webhook template was selected
- Look for parsing errors in the webhook event log

### Incorrect Field Mapping

**Symptom**: Alerts appear but with missing or incorrect information

**Solutions**:
- Review the webhook payload structure in the external system
- Update JSONPath expressions in saved fields to match payload structure
- Adjust Mustache templates in mapped fields
- Test with sample payloads using the webhook test feature
- Refer to the external system's webhook documentation for field names

### Duplicate Alerts

**Symptom**: Same alert appears multiple times in Harness

**Solutions**:
- Check that only one webhook integration is configured for the external system
- Review route alerts for duplicate routing
- Verify the external system is not sending duplicate webhook POSTs
- Consider using alert deduplication rules based on unique identifiers

### Authentication Errors

**Symptom**: External system requires authentication that is not configured

**Solutions**:
- Most Harness webhooks do not require authentication (secret is in URL)
- If the external system requires a response to a challenge, contact Harness support
- For SNS subscription confirmation (AWS CloudWatch), follow the specific guide
- Check that webhook URL includes the secret key portion

---

## Best Practices

### Configuration Management

- **Document webhook URLs**: Store webhook URLs securely (they contain secrets)
- **Use descriptive names**: Name webhooks clearly in both systems
- **Version control**: Document webhook configurations in runbooks
- **Test thoroughly**: Always test before relying on webhooks in production

### Security

- **Protect webhook URLs**: Treat webhook URLs as secrets (they contain authentication)
- **Rotate secrets**: If a webhook URL is compromised, delete and recreate the integration
- **Limit access**: Only authorized users should access webhook configuration
- **Use HTTPS**: All Harness webhooks use HTTPS by default

### Maintenance

- **Monitor webhook health**: Check delivery success rates in external systems
- **Update on platform changes**: External system updates may change payload structure
- **Clean up unused webhooks**: Delete integrations that are no longer needed
- **Document changes**: Record any modifications to webhook configuration

### Performance

- **Batch when possible**: Some tools support batching multiple events
- **Set appropriate retry policies**: Configure external system retry behavior
- **Monitor volume**: High-volume webhooks may require rate limiting
- **Use filters**: Only send relevant events to reduce noise

---

## Next Steps

### Get Started
- Go to [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview) to create a webhook integration in Harness.
- Go to [Webhook Templates](/docs/ai-sre/alerts/webhooks/templates/overview) to browse available templates.
- Go to [Use CEL in Webhooks](/docs/ai-sre/alerts/webhooks/use-cel-webhooks) to filter webhook payloads.

### Advanced Configuration
- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route and process webhook-generated alerts.
- Go to [Create a Runbook](/docs/ai-sre/runbooks/create-runbook) to automate responses to webhook alerts.
- Go to [AI SRE Best Practices](/docs/ai-sre/resources/ai-sre-best-practices) for webhook integration optimization.

### Get Help
If you encounter issues not covered in these guides:
- Check the external system's official webhook documentation
- Review the webhook event log in Harness for detailed error messages
- Contact Harness support with webhook delivery logs from both systems
