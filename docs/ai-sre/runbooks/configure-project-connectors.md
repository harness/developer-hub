---
title: Configure Project Connectors for Runbook Actions
description: Set up project-level connectors for Zoom, GitHub, and Jira to ensure proper attribution of runbook actions in Harness AI SRE
sidebar_position: 4
redirect_from:
- /docs/incident-response/runbooks/configure-project-connectors
---

# Configure Project Connectors for Runbook Actions

This guide explains how to set up project-level connectors for Zoom, GitHub, and Jira in Harness AI SRE. These connectors ensure that actions performed by your runbooks are properly attributed to specific service accounts.

:::note
Project-level connectors provide better accountability and access control compared to organization-level connectors.
:::

## Why Project Connectors?

When executing runbook actions that interact with external tools (Zoom, GitHub, Jira), Harness AI SRE needs to authenticate as a specific user or service account. Project connectors ensure:

* Actions are performed using dedicated service accounts
* Activities can be properly tracked and audited
* Access permissions are scoped to project needs
* Integration credentials are managed at the project level

## Accessing Project Connectors

To configure project connectors:

1. Sign in to your Harness account
2. Navigate to your project
3. Go to **Project Settings** → **Third-Party Integrations (IR)**
4. Select the integration type you want to configure

## Configuring Project Connectors

### Best Practices

When setting up project connectors:

1. Create dedicated service accounts for runbook actions
2. Use project-specific service accounts rather than shared accounts
3. Document the purpose and ownership of each connector

### Selecting or Creating Connectors

In **Project Settings** → **Third-Party Integrations (IR)**, you can either:

* Select an existing connector from the list if one is already configured with appropriate permissions
* Create a new connector if you need a dedicated service account for your project's runbook actions

### Creating New Connectors

Only follow these steps if you need to create a new connector. If an appropriate connector already exists, you can select it from the list.

#### Zoom Connector

If you need a new Zoom connector:

1. Click **Add Zoom Connector**
2. Configure:
   * Name: A descriptive name for the service account's purpose
   * Authentication: OAuth (recommended)
   * Service Account: Dedicated Zoom account for runbook actions
3. Test the connection
4. Save the configuration

#### GitHub Connector

If you need a new GitHub connector:

1. Click **Add GitHub Connector**
2. Configure:
   * Name: A descriptive name for the service account's purpose
   * Authentication: GitHub App or OAuth
   * Repository Access: Only repositories needed for runbook actions
3. Test the connection
4. Save the configuration

#### Jira Connector

If you need a new Jira connector:

1. Click **Add Jira Connector**
2. Configure:
   * Name: A descriptive name for the service account's purpose
   * Authentication: API Token (recommended)
   * Project Access: Only projects needed for runbook actions
3. Test the connection
4. Save the configuration

## Using Project Connectors in Runbooks

When creating runbook actions:

1. Add an integration action (Create Jira Issue, Schedule Zoom Meeting, etc.)
2. The project connector you configured will be automatically used
3. The action will be performed using the service account associated with the connector

:::tip
Always test runbook actions in a non-production environment to verify proper authentication and permissions.
:::

## Next Steps

* [Configure Authentication](./configure-authentication.md)
* [Create a Runbook](./create-runbook.md)
* [Integration Guides](./integrations/jira.md)
