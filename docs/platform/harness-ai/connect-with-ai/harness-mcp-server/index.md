---
title: Harness MCP Server
description: Give AI agents full access to the Harness platform through 11 consolidated tools and 139 resource types using the Model Context Protocol (MCP).
sidebar_label: MCP Server
keywords:
  - mcp
  - model context protocol
  - mcp server
  - ai agents
  - claude
  - cursor
  - windsurf
tags:
  - harness-ai
  - mcp
redirect_from:
  - /docs/platform/harness-aida/harness-mcp-server
  - /docs/platform/harness-ai/harness-mcp-server
---

The Harness MCP Server is an open-source [Model Context Protocol](https://modelcontextprotocol.io/introduction) server that gives AI agents full access to the Harness platform. It uses a registry-based dispatch system that routes 11 consolidated tools (`harness_list`, `harness_get`, `harness_create`, and others) to 139 resource types across 30 toolsets, covering CI/CD, GitOps, Feature Management & Experimentation, Cloud Cost Management, Security Testing, Chaos Engineering, Internal Developer Portal, Software Supply Chain, and more.

Unlike MCP servers that map one tool per API endpoint (which degrades LLM tool-selection accuracy as tool count grows), this server keeps the tool count small and the schema footprint minimal. Agents discover organizations and projects dynamically, so multi-project workflows work out of the box without hardcoded environment variables. Twenty-seven pre-built prompt templates cover common workflows such as debugging failed pipelines, reviewing DORA metrics, triaging vulnerabilities, and optimizing cloud costs.

- **Source code:** [github.com/harness/mcp-server](https://github.com/harness/mcp-server)
- **npm package:** [harness-mcp-v2 on npm](https://www.npmjs.com/package/harness-mcp-v2)

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Configure your AI client](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/configure-ai-clients) by adding the server to Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, and Amazon Q Developer CLI with an API key.
- [Connect to the Harness-managed endpoint](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/hosted-mcp) with OAuth instead of an API key.
- [Run the server](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/self-hosted-deployment) with Docker, Kubernetes, MCP gateways, or HTTP transport in multi-user mode.
- [Use pre-built workflow prompts](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/prompt-templates).
- [Elicitate](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/approvals-and-safety) risk-based auto-approve, and platform safeguards.
- [Troubleshoot common errors](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/troubleshooting) and interactive debugging with MCP Inspector.

---

## Before you begin

Before you configure MCP server, ensure you have the following:

- **Harness API key**: A personal access token (PAT) in the format `pat.<accountId>.<tokenId>.<secret>`. The account ID is auto-extracted from PAT tokens. To create one, go to **My Profile** > **API Keys** > **+ New API Key**, then create a **Token**. Go to [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/) to review detailed instructions.
- **Node.js**: Required when you use `npx` or `npm install`. This is not required for Docker.

:::note
If you use the [Harness Hosted MCP](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/hosted-mcp) endpoint, you need to authenticate with OAuth through Harness ID. This does not need an API key in your client configuration.
:::

---

## Quick start

This set up does not require any installation. Run the server directly with `npx` command described below:

```bash
HARNESS_API_KEY=pat.xxx.xxx.xxx npx harness-mcp-v2@latest
```

The server defaults to **stdio** transport (for Claude Desktop, Cursor, Windsurf, and similar clients). For remote or shared deployments, use **http** as described below:

```bash
# Stdio transport (default)
HARNESS_API_KEY=pat.xxx npx harness-mcp-v2

# HTTP transport
HARNESS_API_KEY=pat.xxx npx harness-mcp-v2 http --port 8080
```

Once the server runs, go to [Configure your AI client](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/configure-ai-clients) to connect your editor or terminal.

---

## Install with an alternative method

In this set up, use a global install or a source build when `npx` does not fit your environment.

### Global install

```bash
npm install -g harness-mcp-v2
harness-mcp-v2
```

### Build from source

```bash
git clone https://github.com/harness/mcp-server.git
cd mcp-server
pnpm install
pnpm build

pnpm start              # Stdio transport
pnpm start:http         # HTTP transport
pnpm inspect            # Test with MCP Inspector
```

---

## CLI usage

```bash
harness-mcp-v2 [stdio|http] [--port <number>]
```

| Option | Description |
|--------|-------------|
| `--port <number>` | Port for HTTP transport (default: `3000`, or `PORT` env var) |
| `--help` | Show help message and exit |
| `--version` | Print version and exit |

---

## How it works

The image below describes the flow of control from AI agent (such as Claude) to Harness REST API.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/communication-api-ai.png')} width="35%" alt="Flow of control from an AI agent through the MCP Server, registry, and HarnessClient to the Harness REST API" title="Click to view full size image" /> </div>

1. **Tools** are generic verbs (`harness_list`, `harness_get`, and others) that accept a `resource_type` parameter to route to the correct API endpoint.
2. **The Registry** maps each `resource_type` to a declarative `ResourceDefinition` specifying the HTTP method, URL path, parameter mappings, and response extraction.
3. **Dispatch** resolves the resource definition, builds the HTTP request, calls the Harness API, and extracts the relevant response data.
4. **Toolset filtering** controls which resource definitions load at startup.
5. **Deep links** are automatically appended to responses, providing direct Harness UI URLs.
6. **Compact mode** strips verbose metadata from list results to minimize token usage.

---

## Next steps

- [Configure your AI client](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/configure-ai-clients): Add the server to your editor or terminal.
- [Tools reference](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/tools-reference): Review the 11 tools and their parameters.
- [Model Context Protocol specification](https://modelcontextprotocol.io/introduction): Understand the underlying protocol.
