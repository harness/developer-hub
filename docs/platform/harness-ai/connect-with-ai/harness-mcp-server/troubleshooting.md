---
title: Troubleshooting
description: Resolve common Harness MCP Server errors and debug tool calls interactively with MCP Inspector.
sidebar_label: Troubleshooting
sidebar_position: 10
keywords:
  - troubleshooting
  - mcp inspector
  - errors
  - debug
tags:
  - harness-ai
  - mcp
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use this page to resolve errors related to startup, authentication, and tool-calls. For more information on Hosted MCP OAuth failures, see [Harness Hosted MCP](./hosted-mcp.md#troubleshooting). If sign-in fails at your SAML or OIDC Identity Provider, add the MCP-specific ACS URL or redirect URI as described in [Single Sign-On (SSO) for Harness MCP](/docs/platform/authentication/single-sign-on-for-harness-mcp).

---

## Debug with MCP Inspector

Use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to debug the server interactively:

```bash
npx @modelcontextprotocol/inspector npx harness-mcp-v2
```

The Inspector displays a URL you can open in your browser to inspect tool calls and responses.

---

## Common issues

<Troubleshoot
  issue="HARNESS_ACCOUNT_ID is required when the API key is not a PAT"
  mode="fallback-only"
  fallback="Your API key is not in PAT format (pat.<accountId>.<tokenId>.<secret>), so the account ID cannot be auto-extracted. Set the HARNESS_ACCOUNT_ID environment variable explicitly."
/>

<Troubleshoot
  issue="npx ENOENT or node: No such file or directory when using GUI clients"
  mode="fallback-only"
  fallback="GUI apps (Cursor, Claude Desktop, Windsurf, VS Code) do not inherit your shell's PATH. Use absolute paths for the command and explicitly set PATH in the env block of your MCP config. Run 'which npx' and 'which node' in a terminal to find the correct paths."
/>

<Troubleshoot
  issue="Unknown resource_type error from tools"
  mode="fallback-only"
  fallback="The resource type is misspelled or filtered out via HARNESS_TOOLSETS. Call harness_describe (with optional search_term) to discover valid resource types."
/>

<Troubleshoot
  issue="Missing required field for path parameter"
  mode="fallback-only"
  fallback="A project or org scoped call is missing identifiers. Set the HARNESS_ORG and HARNESS_PROJECT environment variables, or pass org_id and project_id per tool call."
/>

<Troubleshoot
  issue="Read-only mode is enabled and write operations are not allowed"
  mode="fallback-only"
  fallback="HARNESS_READ_ONLY=true blocks create, update, delete, and execute operations. Set HARNESS_READ_ONLY=false if write operations are intended."
/>

<Troubleshoot
  issue="Pipeline run fails with unresolved required inputs"
  mode="fallback-only"
  fallback="Your inputs did not cover all required runtime placeholders. Fetch the runtime_input_template first, then supply missing keys via inputs or use input_set_ids for structural inputs."
/>

<Troubleshoot
  issue="HARNESS_BASE_URL must use HTTPS"
  mode="fallback-only"
  fallback="The server enforces HTTPS by default. If you need HTTP for local development, set HARNESS_ALLOW_HTTP=true."
/>

<Troubleshoot
  issue="Operation declined by user"
  mode="fallback-only"
  fallback="The user declined the elicitation confirmation dialog. Verify the operation details and retry if intended."
/>

<Troubleshoot
  issue="HTTP mcp-session-id header is required or Session not found"
  mode="fallback-only"
  fallback="Send an initialize request first to create a session, then include the mcp-session-id header on all subsequent POST, GET, and DELETE requests to /mcp. Sessions expire after 30 minutes of idle time."
/>

---

## Next steps

- [Environment variables](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/environment-variables): Configure logging and audit output.
- [Harness MCP Server source code](https://github.com/harness/mcp-server): Open an issue against the server.
- [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/): Rotate or recreate a token.