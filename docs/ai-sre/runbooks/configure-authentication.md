---
title: Configure Authentication for Runbook Actions
sidebar_label: Configure Authentication
sidebar_position: 3
description: Learn how to set up and manage authentication for different runbook actions and integrations in Harness AI SRE.
redirect_from:
- /docs/incident-response/runbooks/configure-authentication
---

# Configure Authentication

This guide explains how to configure authentication for your Harness AI SRE integrations. 

For information about setting up project-level connectors for runbook actions, see [Configure Project Connectors](./configure-project-connectors.md).

## Overview

Each integration type requires specific authentication setup to ensure secure communication between Harness AI SRE and the external service.

## Communication Tools

### [Slack](./runbook-action-integrations/slack.md)
1. Navigate to **Organization Settings** → **Third Party Integrations (AI SRE)**
2. Click **Connect** for Slack
3. Follow the OAuth flow to authorize Harness
4. Configure workspace permissions

### [Microsoft Teams](./runbook-action-integrations/teams.md)
1. Navigate to **Project Settings** → **Third Party Integrations (AI SRE)**
2. Select **Microsoft Teams** from the available integrations
3. Enter your Azure AD credentials
4. Grant necessary permissions

### [Zoom](./runbook-action-integrations/zoom.md)
1. Navigate to **Project Settings** → **Third Party Integrations (AI SRE)**
2. Select **Zoom** from the available integrations
3. Configure OAuth settings
4. Set meeting defaults

## Ticketing Systems

### [Jira](./runbook-action-integrations/jira.md)
1. Navigate to **Project Settings** → **Third Party Integrations (AI SRE)**
2. Select **Jira** from the available integrations
3. Enter your API key
4. Configure project mapping

### [ServiceNow](./runbook-action-integrations/servicenow.md)
1. Navigate to **Project Settings** → **Third Party Integrations (AI SRE)**
2. Select **ServiceNow** from the available integrations
3. Enter your instance URL and credentials
4. Set up incident mapping

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
  - [Slack Integration](./runbook-action-integrations/slack.md)
  - [Microsoft Teams Integration](./runbook-action-integrations/teams.md)
  - [Zoom Integration](./runbook-action-integrations/zoom.md)
- Ticketing Systems
  - [Jira Integration](./runbook-action-integrations/jira.md)
  - [ServiceNow Integration](./runbook-action-integrations/servicenow.md)
