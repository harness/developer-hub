---
title: Anthropic Harness Connector
description: Connect Harness to the Claude apps with the Anthropic Harness Connector so Claude can read and act on your pipelines, deployments, services, and costs using OAuth.
sidebar_label: Anthropic Connector
sidebar_position: 12
keywords:
  - anthropic connector
  - claude connector
  - claude.ai
  - claude desktop
  - harness mcp server
  - hosted mcp
  - oauth
  - natural language
tags:
  - harness-ai
  - mcp
redirect_from:
  - /docs/platform/harness-ai/anthropic-harness-connector
  - /docs/platform/harness-ai/model-connector/anthropic-harness-connector
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Anthropic Harness Connector is an integration in the <a href="https://claude.com/connectors/harness" target="_blank">Claude connectors directory</a> that brings Harness platform context into the Claude apps. Once connected, you can query pipelines, deployments, services, and cloud costs through natural language, and you can ask Claude to act on them, such as triggering a build or toggling a feature flag.

The connector is backed by the [Harness Hosted MCP Server](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server), which provides 11 consolidated tools and 139 resource types across the Harness platform over the <a href="https://modelcontextprotocol.io/introduction" target="_blank">Model Context Protocol (MCP)</a>. It authenticates with OAuth against your Harness account, so you do not create an API key or a personal access token (PAT) for it.

:::info
You connect the connector once in your Claude account, and it applies to the Claude web, desktop, and mobile apps. Claude Code, Cursor, Windsurf, and VS Code connect to the [hosted MCP endpoint](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server#harness-hosted-mcp-saas-oauth) instead.
:::

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Enable OAuth on your Harness account so the connector can authenticate](#enable-oauth-for-your-harness-account).
- [Connect Harness to Claude on an individual, Team, or Enterprise plan](#connect-harness-to-claude).
- [Enable the connector in a conversation so Claude calls Harness tools](#enable-the-connector-in-a-conversation).
- [Understand how Harness RBAC and write confirmations apply to connector requests](#how-permissions-and-confirmations-work).
- [Remove the connector and revoke its OAuth token](#remove-the-connector).

---

## Before you begin

Before you configure the Anthropic Harness Connector, ensure you have the following:

- **Harness SaaS account**: An active Harness SaaS account, which is the deployment type that [hosted MCP with OAuth](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server#harness-hosted-mcp-saas-oauth) supports.
- **OAuth enabled**: OAuth enabled at the account level, which [Harness Support](https://support.harness.io) turns on for your account.
- **SSO configured for MCP**: On a SAML or OIDC Identity Provider, the MCP-specific ACS URL or redirect URI added to your IdP, as described in [Single Sign-On (SSO) for Harness MCP](/docs/platform/authentication/single-sign-on-for-harness-mcp).
- **Harness permissions**: A [role](/docs/platform/role-based-access-control/add-manage-roles) with **View** on the resources you query, plus **Create/Edit** and **Execute** on any resource you want Claude to change or run.
- **Claude account**: An active Claude Pro, Max, Team, or Enterprise account, where on Team and Enterprise plans an organization Owner adds the connector first.

---

## Set up the connector

### Enable OAuth for your Harness account

Harness Support enables OAuth for your account. To raise the request, do the following:

1. Find your Harness **Account ID** in **Account Settings** > **Overview**.
2. Open a ticket with <a href="https://support.harness.io" target="_blank">Harness Support</a> requesting OAuth enablement and account data migration for that Account ID.
3. Wait for Support to confirm that the migration is complete, then connect Harness to Claude.

### Connect Harness to Claude

Select the tab for your Claude plan.

<Tabs>
<TabItem value="pro" label="Pro or Max" default>

On Pro and Max plans, you add and authorize the connector yourself:

1. Sign in to <a href="https://claude.ai" target="_blank">claude.ai</a>.
2. Select your profile icon, then select **Settings**.
3. Select **Customize**, then select **Connectors**.
4. Locate **Harness.io** in the connectors list.
5. Click **Connect** to start the OAuth flow.
6. Sign in with your Harness credentials when prompted.
7. Review the requested permissions, then click **Authorize**.

</TabItem>
<TabItem value="team" label="Team or Enterprise">

An organization Owner does the following:

1. Sign in to <a href="https://claude.ai" target="_blank">claude.ai</a> as an organization Owner.
2. Select **Organization settings**, then select **Connectors**.
3. Click **Add**, then select **Harness.io** from the directory.
4. Confirm the addition to make the connector available to the organization.

Each member then authorizes the connector with their own Harness identity:

1. Select your profile icon, then select **Settings**.
2. Select **Customize**, then select **Connectors**.
3. Locate **Harness.io**, then click **Connect**.
4. Sign in with your Harness credentials, then click **Authorize**.

</TabItem>
</Tabs>

:::tip Add it as a custom connector

If the directory entry is unavailable on your plan, add the hosted MCP endpoint as a custom connector. Use the URL `https://mcp.harness.io/mcp` and the OAuth client ID `mcp-client`.

:::

### Enable the connector in a conversation

Enable the connector in each conversation where you want Claude to call Harness tools:

1. Click the **+** icon in the chat composer.
2. Select **Connectors**.
3. Turn on **Harness.io** for that conversation.

---

## Use the connector

Reference Harness resources in plain language, and Claude calls the matching Harness tools.

### Example prompts

These prompts show the read and write requests the connector handles:

- "Show me the last 5 failed pipeline executions in my production project."
- "What services are deployed in the staging environment?"
- "Summarize the DORA metrics for my team this week."
- "Why did my latest CD pipeline fail?"
- "What is our cloud spend this month compared to last month?"
- "Trigger the staging deploy for the api-gateway pipeline."

### How permissions and confirmations work

The connector acts as your Harness user, so Harness RBAC applies to every request. Claude reports that it could not retrieve a resource when your role lacks access to it. To widen access, an administrator updates your role in Harness.

Write operations depend on MCP elicitation, the mechanism that asks you to confirm a change before Harness applies it. In a client without elicitation support, Harness applies create, update, and execute operations with no confirmation dialog, and blocks delete operations so Claude cannot remove a resource:

- **Claude Desktop**: Elicitation support is pending, so writes apply without a confirmation dialog and deletes are blocked.
- **Claude web and mobile apps**: The [elicitation support matrix](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server#elicitation) does not list these apps yet, so treat write confirmation as unavailable on both.

Grant **Create/Edit** and **Execute** only on the resources you intend Claude to change, because the Claude apps apply those changes without a confirmation step.

For more information about the full tool list, see [Harness MCP Server](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server).

---

## Remove the connector

To remove the connector, do the following:

1. Sign in to <a href="https://claude.ai" target="_blank">claude.ai</a>.
2. Select your profile icon, then select **Settings**.
3. Select **Customize**, then select **Connectors**.
4. Locate **Harness.io**, then click **Remove**.

This revokes the OAuth token, and Claude loses access to Harness in existing conversations. Claude does not support editing a connector entry, so remove it and add it again to change its configuration. On Team and Enterprise plans, an Owner removes the organization-level entry from **Organization settings** > **Connectors** to remove it for every member.

---

## Troubleshooting

<Troubleshoot
  issue="Harness Hosted MCP OAuth fails with invalid credentials"
  mode="docs"
  fallback="OAuth is not enabled on the account. Open a ticket at support.harness.io with your Harness Account ID and request OAuth enablement and account data migration, then retry the connection."
/>

<Troubleshoot
  issue="Harness connector is connected but returns no resources"
  mode="docs"
  fallback="Confirm your Harness user has View permission on the resources you are querying. The connector runs as your Harness user, so RBAC restrictions on your role apply to every request."
/>

<Troubleshoot
  issue="Claude does not call the Harness connector"
  mode="general"
  fallback="The connector is not enabled for that conversation. Click the + icon in the chat composer, select Connectors, and turn on Harness.io, then send the request again."
/>

<Troubleshoot
  issue="Harness.io is missing from Claude connector settings"
  mode="general"
  fallback="On Team and Enterprise plans an organization Owner must add the connector under Organization settings > Connectors before members can connect it. Ask an Owner to add it, then reload your Connectors panel."
/>

---

## Next steps

- [Harness MCP Server](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server): Connect Claude Code, Cursor, Windsurf, and VS Code to the same hosted endpoint.
- [Harness AI Cursor Plugin](/docs/platform/harness-ai/core-capabilities/in-your-ide/cursor-plugin): Use Harness inside the Cursor IDE.
- [Harness Skills](/docs/platform/harness-ai/govern-ai-output/harness-skills): Extend Claude Code with structured Harness workflows.
