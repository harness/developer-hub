---
title: Harness AI x Gemini CLI Extension
description: Leverage Gemini CLI with Harness AI MCP Server to unleash your developer workflows.
sidebar_position: 12
keywords:
  - gemini cli
  - mcp server
  - harness ai
  - cli extension
  - terminal integration
  - natural language
  - pipeline management
tags:
  - harness-ai
  - ide-integration
  - cli
redirect_from:
  - /docs/platform/harness-aida/harness-gemini-extension
  - /docs/platform/harness-ai/harness-gemini-extension
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness Model Context Protocol (MCP) integrates seamlessly with Gemini CLI, enabling developers to interact with Harness directly from their terminal. With this extension, you can create pipelines, troubleshoot executions, and manage connectors using natural language prompts. This integration brings the power of Harness into the command line, reducing context switching and accelerating developer workflows.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#install-the-harness-mcp-extension">Install the Harness MCP Extension for Gemini CLI</a>.
- <a href="#configure-harness-access">Configure Harness authentication and default settings</a>.
- <a href="#example-prompts">Use natural language prompts to manage pipelines, services, and approvals</a>.
- <a href="#troubleshooting">Troubleshoot common extension and authentication issues</a>.

---

## Before you begin

Before you install and use the Harness MCP extension with Gemini CLI, ensure you have the following:

- **Harness MCP Server**: Installed and configured. Go to <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a> for more information on installation.
- **Gemini CLI**: Installed (requires Node.js v18 or later). Go to <a href="https://github.com/google-gemini/cli" target="_blank">Gemini CLI</a> for more information on installation.
- **Harness API key**: An active API key with required permissions for your organization and projects.
- **Docker**: Installed and running (required for running the MCP server).

---

## Introduction

Harness MCP with Gemini CLI brings Harness directly into the developer's command line, turning DevOps tasks into natural language conversations. Developers can instantly generate and modify pipelines, analyze failed executions with AI-powered insights, and create or manage connectors without navigating the Harness UI. Teams gain faster feedback loops, reduced context switching, and easier governance by surfacing policy checks and approval flows directly in the CLI. This integration empowers developers to move from idea to deployment in minutes, improving productivity, accelerating time-to-market, and ensuring every action aligns with enterprise standards.

---

## Install the Harness MCP extension

Install the extension directly from the GitHub repository:

```bash
gemini extensions install https://github.com/harness/mcp-server
```

---

## Configure Harness access

Export your Harness API key as an environment variable:

```bash
export HARNESS_API_KEY="your_api_key_here"
```

### Optional environment variables

Configure additional environment variables to set defaults for your Harness instance:

- **HARNESS_DEFAULT_ORG_ID**: Set a default organization ID to scope commands to a specific organization.
- **HARNESS_DEFAULT_PROJECT_ID**: Set a default project ID to scope commands to a specific project.
- **HARNESS_BASE_URL**: Set the Harness instance base URL (defaults to `https://app.harness.io`).

---

## Start using Gemini with Harness

Launch Gemini CLI to begin interacting with Harness using natural language:

```bash
gemini
```

---

## Example prompts

Use natural language prompts to perform Harness operations directly from the CLI.

### Pipeline management

```bash
Create a Harness pipeline that deploys a Kubernetes service using the account-level template "Golden Pipeline Template".
```

### Error analysis

```bash
Why did my last Harness CD pipeline named go deploy fail? Suggest a fix.
```

### Service discovery 

```bash
Show me all services connected to my production pipelines in Harness.
```

### Policy and approvals

```bash
Configure a Pipeline that has a Harness Approval stage that requires the account administrator user group to approve. Minimum 2 users must approve.
```

---

## How it works

The extension uses Docker to run the Harness MCP server with the following configuration:

- **Docker image**: `harness/mcp-server:latest`
- **Communication**: Standard input/output (stdio)
- **Environment**: Inherits your `HARNESS_API_KEY` and other Harness environment variables
- **Base URL**: Defaults to `https://app.harness.io`

---

## Extension management

Manage your Gemini CLI extensions with these commands.

### List installed extensions

```bash
gemini extensions list
```

### Update the extension

```bash
gemini extensions update harness-platform
```

### Disable the extension

```bash
gemini extensions disable harness-platform
```

### Uninstall the extension

```bash
gemini extensions uninstall harness-platform
```

---

## Best practices

Follow these best practices to ensure secure and efficient use of the Harness MCP extension.

- **Secrets management**: Keep all API keys in environment variables. Never hardcode API keys in scripts or configuration files.
- **Review before applying**: Always review generated YAML configurations and pipeline definitions before applying them to your Harness instance.
- **RBAC enforcement**: The Harness MCP enforces Role-Based Access Control (RBAC), so ensure your API key has the correct permissions for the operations you intend to perform.
- **Scope management**: Use organization and project environment variables to set appropriate defaults and reduce the need to specify scope in every command.

---

## Troubleshooting

<Troubleshoot
  issue="Extension installation fails or cannot connect to GitHub repository"
  mode="general"
  fallback="Ensure you have a valid internet connection and that Docker is running. Verify that the GitHub repository https://github.com/harness/mcp-server is accessible and that you have permission to pull Docker images."
/>

<Troubleshoot
  issue="Authentication fails with INVALID_API_KEY or permission errors"
  mode="docs"
  fallback="Verify your HARNESS_API_KEY is valid and has appropriate permissions for the target organization and project. Check that the API key has not expired. Ensure you are using the correct HARNESS_BASE_URL for your Harness instance."
/>

<Troubleshoot
  issue="Docker container fails to start or extension cannot communicate with MCP server"
  mode="general"
  fallback="Ensure Docker is installed and running on your system. Verify you have permission to pull Docker images and that the Docker daemon is active. Check Docker logs for specific error messages if container startup fails."
/>

---

## Next steps

- <a href="https://github.com/harness/mcp-server" target="_blank">Harness MCP GitHub Repository</a>: Review the MCP server source code and contribute to development.
- <a href="https://ai.google.dev/gemini-api/docs/cli" target="_blank">Gemini CLI Extensions Documentation</a>: Learn more about Gemini CLI capabilities and extension development.
- <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a>: Review advanced MCP configuration and deployment options.