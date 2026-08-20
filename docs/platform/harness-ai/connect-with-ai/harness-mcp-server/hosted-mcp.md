---
title: Harness Hosted MCP
description: Connect MCP-compatible clients to the Harness-managed MCP endpoint using OAuth through Harness ID, with no API key in your client configuration.
sidebar_label: Hosted MCP
sidebar_position: 3
keywords:
  - hosted mcp
  - oauth
  - harness id
  - saas
tags:
  - harness-ai
  - mcp
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness provides a **hosted MCP** endpoint for **Harness SaaS** customers. You add the hosted URL to your MCP-compatible client, and when you first connect, you complete **OAuth through Harness ID** (browser or embedded sign-in, depending on the client). After authentication, the server runs MCP **on your behalf** using your Harness user identity, including **RBAC** and permissions from the platform. You do **not** configure a Harness API key in the client for this flow.

Hosted MCP requires **OAuth to be enabled** on your Harness account. Contact **[Harness Support](https://support.harness.io)** to enable OAuth before you use Hosted MCP. Without OAuth enabled, you receive authentication errors even when your Harness login credentials are valid.

If your account authenticates through a SAML or OIDC Identity Provider, sign-in also requires an MCP-specific ACS URL (SAML) or redirect URI (OIDC) in that Identity Provider. Add it by following [Single Sign-On (SSO) for Harness MCP](/docs/platform/authentication/single-sign-on-for-harness-mcp) before you configure a client.

:::note SaaS only

Hosted MCP with OAuth is available for **Harness SaaS** accounts only. If you run the MCP server self-hosted or open source, use an API key instead. Go to [Configure your AI client](./configure-ai-clients.md) to set up API key authentication. **OAuth for open source and self-hosted MCP is coming soon.**

:::

---

## Hosted endpoint

For the primary Harness SaaS control plane, you can use the following URL:

`https://mcp.harness.io/mcp`

If your organization uses a dedicated SaaS cluster or a non-default region, confirm the MCP base URL with [Harness Support](mailto:support@harness.io). The MCP path is typically `/mcp` on that host.


### Authentication flow

The following flow of control describes how authentication works with hosted MCP configuration:

1. Save the hosted MCP configuration in your client using the URL above.
2. When prompted, sign in with your **Harness email and password** through Harness ID.
3. You may be asked to **confirm your password** on a second Harness ID screen.
4. After a successful login, you return to your editor or terminal. The client loads MCP tools exposed for your account. **Which tools appear depends on your Harness licensing**, consistent with the capabilities of the open source MCP server.

---

## OAuth client ID

When a client asks for an OAuth **client ID** for Harness hosted MCP, use **`mcp-client`**. For example, with Claude Code's `--client-id` flag or in Cursor's `auth` block.

---

## Configure a client for hosted MCP

Each client below points at the hosted URL instead of running a local process.

### Cursor

Add a hosted MCP entry in Cursor's MCP settings (for example, **Settings** > **MCP**), using the HTTP URL and client ID:

```json
{
  "mcpServers": {
    "harness-hosted": {
      "url": "https://mcp.harness.io/mcp",
      "auth": {
        "CLIENT_ID": "mcp-client"
      }
    }
  }
}
```

After you enable the server, Cursor prompts you to connect and complete Harness ID authentication. For more information, see [Cursor MCP documentation](https://cursor.com/docs/context/mcp).

### Claude Code

```bash
claude mcp add --transport http \
  --client-id mcp-client \
  harness-hosted-mcp https://mcp.harness.io/mcp
```

For more information, see [Claude Code MCP documentation](https://docs.claude.com/en/docs/claude-code/mcp).

### Windsurf

In your Windsurf MCP configuration (for example, `~/.codeium/windsurf/mcp_config.json` on macOS and Linux, or `%USERPROFILE%\.codeium\windsurf\mcp_config.json` on Windows), add a server entry that points at the hosted URL and supplies the client ID:

```json
{
  "mcpServers": {
    "harness-hosted": {
      "url": "https://mcp.harness.io/mcp",
      "auth": {
        "CLIENT_ID": "mcp-client"
      }
    }
  }
}
```

For more information, see [Windsurf MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp#model-context-protocol-mcp).

### Visual Studio Code

Add an HTTP MCP server in `.vscode/mcp.json` (workspace) or your [user MCP configuration](https://code.visualstudio.com/docs/copilot/chat/mcp-servers). VS Code negotiates OAuth with the server when supported:

```json
{
  "servers": {
    "harness-hosted": {
      "type": "http",
      "url": "https://mcp.harness.io/mcp"
    }
  },
  "inputs": []
}
```

Accept any trust prompt for the server, then follow Copilot chat prompts to sign in with Harness when authentication is required. For more information, see [VS Code MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration).

---

## Troubleshooting

<Troubleshoot
  issue="Invalid credentials error when connecting to Hosted MCP through OAuth"
  mode="general"
  fallback="OAuth has not been enabled for your Harness account. This is the most common issue when first setting up Hosted MCP, and it occurs even when the same credentials work for a normal Harness login. Contact Harness Support to request OAuth enablement and account data migration, then retry the connection once support confirms the migration is complete."
/>

<Troubleshoot
  issue="Hosted MCP sign-in fails at the SAML or OIDC Identity Provider with a reply URL or redirect URI mismatch"
  mode="general"
  fallback="The MCP-specific ACS URL (SAML) or redirect URI (OIDC) is missing from your Identity Provider, so the IdP rejects the MCP authentication response even though Harness platform login works. In Harness, go to Account Settings > Security and Governance > Authentication, edit your SAML or OIDC provider, and copy the value from Additional Reply URL for MCP (Optional). Add that exact value to your Harness application in the IdP, then retry the connection. For per-IdP steps, see /docs/platform/authentication/single-sign-on-for-harness-mcp."
/>

---

## Next steps

- [Tools reference](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/tools-reference): Review tools available through the hosted endpoint.
- [Approvals and safety](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/approvals-and-safety): Understand how write operations request confirmation.
- [Self-hosted deployment](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/self-hosted-deployment): Run the server yourself with Docker or Kubernetes instead.
