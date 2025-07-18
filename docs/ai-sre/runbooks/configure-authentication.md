---
title: Configure Authentication for Runbook Actions
sidebar_label: Configure Authentication
sidebar_position: 3
description: Learn how to set up and manage authentication for different runbook actions and integrations in Harness AI SRE.
redirects_from:
- /docs/incident-response/runbooks/configure-authentication
---

# Configure Authentication

This guide explains how to configure authentication for your Harness AI SRE integrations. For information about setting up project-level connectors for runbook actions, see [Configure Project Connectors](./configure-project-connectors.md).

## Overview

Each integration type requires specific authentication setup to ensure secure communication between Harness AI SRE and the external service.

## Communication Tools

### [Slack](./integrations/slack.md)
1. Navigate to **Settings** → **Connectors** → **Collaboration**
2. Click **+ New Connector**
3. Select **Slack**
4. Follow the OAuth flow to authorize Harness
5. Configure channel permissions

### [Microsoft Teams](./integrations/teams.md)
1. Navigate to **Settings** → **Connectors** → **Collaboration**
2. Click **+ New Connector**
3. Select **Microsoft Teams**
4. Enter your Azure AD credentials
5. Grant necessary permissions

### [Zoom](./integrations/zoom.md)
1. Navigate to **Settings** → **Connectors** → **Collaboration**
2. Click **+ New Connector**
3. Select **Zoom**
4. Configure OAuth settings
5. Set meeting defaults

## Ticketing Systems

### [Jira](./integrations/jira.md)
1. Navigate to **Settings** → **Connectors** → **AI SRE**
2. Click **+ New Connector**
3. Select **Jira**
4. Enter your API key
5. Configure project mapping

### [ServiceNow](./integrations/servicenow.md)
1. Navigate to **Settings** → **Connectors** → **AI SRE**
2. Click **+ New Connector**
3. Select **ServiceNow**
4. Enter your instance URL and credentials
5. Set up incident mapping

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

### Documentation
- [Create a Runbook](./create-runbook.md)
- [Configure Incident Fields](./configure-incident-fields.md)
- [Return to Overview](./runbooks.md)

### Integration Guides
- Communication Tools
  - [Slack Integration](./integrations/slack.md)
  - [Microsoft Teams Integration](./integrations/teams.md)
  - [Zoom Integration](./integrations/zoom.md)
- Ticketing Systems
  - [Jira Integration](./integrations/jira.md)
  - [ServiceNow Integration](./integrations/servicenow.md)
