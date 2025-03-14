---
title: Configure Authentication for Runbook Actions
sidebar_label: Configure Authentication
description: Learn how to set up and manage authentication for different runbook actions and integrations in Harness Incident Response.
---

# Configure Authentication for Runbook Actions

This guide explains how to configure authentication for various integrations used in Harness IR runbooks.

## Overview

Each integration type requires specific authentication setup to ensure secure communication between Harness IR and the external service.

## Communication Tools

### Slack
1. Navigate to **Settings** → **Connectors** → **Collaboration**
2. Click **+ New Connector**
3. Select **Slack**
4. Follow the OAuth flow to authorize Harness
5. Configure channel permissions

### Microsoft Teams
1. Navigate to **Settings** → **Connectors** → **Collaboration**
2. Click **+ New Connector**
3. Select **Microsoft Teams**
4. Enter your Azure AD credentials
5. Grant necessary permissions

### Zoom
1. Navigate to **Settings** → **Connectors** → **Collaboration**
2. Click **+ New Connector**
3. Select **Zoom**
4. Configure OAuth settings
5. Set meeting defaults

## Incident Response Tools

### PagerDuty
1. Navigate to **Settings** → **Connectors** → **Incident Response**
2. Click **+ New Connector**
3. Select **PagerDuty**
4. Enter your API key
5. Configure service mapping

### OpsGenie
1. Navigate to **Settings** → **Connectors** → **Incident Response**
2. Click **+ New Connector**
3. Select **OpsGenie**
4. Enter your API key
5. Set up team mappings

## CI/CD and Feature Management

### Jenkins
1. Navigate to **Settings** → **Connectors** → **CI/CD**
2. Click **+ New Connector**
3. Select **Jenkins**
4. Enter your Jenkins URL and credentials
5. Test the connection

### GitHub Actions
1. Navigate to **Settings** → **Connectors** → **CI/CD**
2. Click **+ New Connector**
3. Select **GitHub**
4. Configure GitHub App or PAT
5. Set repository access

### Split
1. Navigate to **Settings** → **Connectors** → **Feature Management**
2. Click **+ New Connector**
3. Select **Split**
4. Enter your API key
5. Configure environments

## Monitoring Tools

### Datadog
1. Navigate to **Settings** → **Connectors** → **Monitoring**
2. Click **+ New Connector**
3. Select **Datadog**
4. Enter API and Application keys
5. Configure metric access

### Grafana
1. Navigate to **Settings** → **Connectors** → **Monitoring**
2. Click **+ New Connector**
3. Select **Grafana**
4. Enter your API key
5. Configure dashboard access

## Best Practices

### Security
- Use service accounts where possible
- Regularly rotate API keys
- Follow the principle of least privilege
- Monitor authentication logs
- Use OAuth when available

### Maintenance
- Document all authentication configurations
- Set up key rotation schedules
- Monitor connector health
- Maintain backup access methods
- Review permissions regularly

## Troubleshooting

### Common Issues
1. **Invalid Credentials**
   - Verify API key validity
   - Check token expiration
   - Confirm correct scopes

2. **Connection Failures**
   - Verify network connectivity
   - Check firewall rules
   - Validate endpoint URLs

3. **Permission Issues**
   - Review required scopes
   - Check service account permissions
   - Verify organization access

## Next Steps

- [Configure Incident Fields](./configure-incident-fields.md)
- [Set Up Integrations](./configure-integrations.md)
- [Return to Overview](./runbooks.md)
