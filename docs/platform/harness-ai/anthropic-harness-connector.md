---
title: Anthropic Harness Connector
description: Connect Harness to Claude.ai and Claude Desktop using the Anthropic Harness Connector with OAuth authentication.
sidebar_label: Anthropic Connector
sidebar_position: 12
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The Anthropic Harness Connector is an integration available on the [Anthropic integrations directory](https://www.anthropic.com/integrations) that brings Harness platform context directly into Claude.ai and Claude Desktop. Once connected, you can query pipelines, deployments, services, and other Harness resources through natural language conversations without leaving Claude.

The connector is backed by the [Harness Hosted MCP Server](/docs/platform/harness-ai/harness-mcp-server), which provides 11 consolidated tools and 139 resource types across the Harness platform. It uses OAuth to authenticate with your Harness account, so no API keys or PATs are required.

:::info
The Anthropic Harness Connector works with **Claude.ai** and **Claude Desktop** only. For Claude Code, go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to set up Harness integration.
:::

---

## Before you begin

- **Harness account:** An active Harness account with appropriate RBAC permissions for the resources you want to access.
- **OAuth enabled:** OAuth must be enabled at the account level. Go to [Harness Support](https://support.harness.io) to request OAuth enablement for your account.
- **Claude account:** An active Claude Pro, Team, or Enterprise account on [claude.ai](https://claude.ai) or Claude Desktop installed locally.

---

## Enable OAuth for your Harness account

The Anthropic Harness Connector requires OAuth to be enabled on your Harness account before you can authenticate.

1. Open a support ticket with [Harness Support](https://support.harness.io) requesting OAuth enablement for your account.
2. Provide your Harness **Account ID** (found in **Account Settings** > **Overview**).
3. Once Support confirms OAuth is enabled, proceed with the connection steps below.

---

## Connect Harness to Claude

### From Claude.ai

1. Log in to [claude.ai](https://claude.ai).
2. Select your profile icon in the bottom-left corner, then select **Settings**.
3. Select **Integrations** in the left sidebar.
4. Locate **Harness** in the list of available integrations.
5. Select **Connect** to initiate the OAuth flow.
6. Sign in with your Harness credentials when prompted.
7. Review the requested permissions and select **Authorize**.
8. Claude confirms the connection is active. You can now use Harness context in your conversations.

### From Claude Desktop

1. Open Claude Desktop and select the menu icon in the top-left corner.
2. Select **Settings** > **Integrations**.
3. Locate **Harness** in the list of available integrations.
4. Select **Connect** and complete the OAuth authorization in the browser window that opens.
5. Return to Claude Desktop after authorization completes.

---

## Use the connector

Once connected, you can reference Harness resources directly in Claude conversations. Example prompts:

- "Show me the last 5 failed pipeline executions in my production project."
- "What services are deployed in the staging environment?"
- "Summarize the DORA metrics for my team this week."
- "Why did my latest CD pipeline fail?"

The connector respects your Harness RBAC permissions. You can only access resources that your authenticated user has permission to view or manage.

---

## Disconnect the connector

### From Claude.ai

1. Go to [claude.ai](https://claude.ai) and navigate to **Settings** > **Integrations**.
2. Locate the **Harness** integration.
3. Select **Disconnect**.

### From Claude Desktop

1. Open Claude Desktop and navigate to **Settings** > **Integrations**.
2. Locate the **Harness** integration.
3. Select **Disconnect**.

This revokes the OAuth token. To reconnect, repeat the connection steps above.

---

## Troubleshooting

<Troubleshoot
  issue="OAuth authorization fails with 'OAuth not enabled' error"
  mode="docs"
  fallback="OAuth must be enabled at the account level before you can use the connector. Open a support ticket at support.harness.io with your Account ID to request enablement."
/>

<Troubleshoot
  issue="Connector shows 'connected' but Claude cannot access Harness resources"
  mode="docs"
  fallback="Verify that your Harness user has the required RBAC permissions for the resources you are querying. The connector inherits your user permissions."
/>

---

## Next steps

- Go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to integrate Harness with Claude Code and other MCP-compatible tools.
- Go to [Harness AI Cursor Plugin](/docs/platform/harness-ai/cursor-plugin) to use Harness inside the Cursor IDE.
- Go to [Harness Skills](/docs/platform/harness-ai/harness-skills) to extend Claude Code with structured Harness workflows.
