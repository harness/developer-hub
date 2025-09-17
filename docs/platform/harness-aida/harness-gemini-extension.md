---
title: Harness AI x Gemini CLI Extension
description: Leverage Gemini CLI with Harness AI MCP Server to unleash your developer workflows
sidebar_position: 11
---

# Harness MCP with Gemini CLI Extension

Harness MCP (Model Context Protocol) integrates seamlessly with **Gemini CLI**, enabling developers to interact with Harness directly from their terminal. With this extension, you can create pipelines, troubleshoot executions, and manage connectors using natural language prompts.

---

## Prerequisites

Before getting started, ensure you have:

- Installed [Harness MCP Server](https://developer.harness.io/docs/platform/harness-aida/harness-mcp-server/)  
- [Gemini CLI](https://github.com/google-gemini/cli) installed (requires Node.js v18+)  
- Harness API key with required permissions
- Docker installed (for running the MCP server)


## Introduction

Harness MCP with Gemini CLI brings the power of Harness directly into the developer’s command line, turning everyday DevOps tasks into natural language conversations. Developers can instantly generate and modify pipelines, analyze failed executions with AI-powered insights, and create or manage connectors without navigating the Harness UI. Teams gain faster feedback loops, reduced context switching, and easier governance by surfacing policy checks and approval flows directly in the CLI. This integration empowers developers to move from idea to deployment in minutes, improving productivity, accelerating time-to-market, and ensuring every action aligns with enterprise standards—all while staying in the environment they use most: the terminal.

## Installation

### Step 1: Install the Harness MCP Extension
Install the extension directly from the GitHub repository:

```bash
gemini extensions install https://github.com/harness/mcp-server
```


### Step 2: Configure Harness Access

Export your Harness API key as an environment variable:

```
export HARNESS_API_KEY="your_api_key_here"
```

Optional Environment Variables:

- `HARNESS_DEFAULT_ORG_ID` – Set a default organization ID
- `HARNESS_DEFAULT_PROJECT_ID` – Set a default project ID
- `HARNESS_BASE_URL` – Defaults to https://app.harness.io

###  Step 3: Start Using Gemini with Harness

Launch Gemini CLI:

```
gemini
```

## Example Prompts

### Pipeline Management

```bash
Create a Harness pipeline that deploys a Kubernetes service using the account-level template "Golden Pipeline Template".
```

### Error Analysis

```bash
Why did my last Harness CD pipeline named go deploy fail? Suggest a fix.
```

### Service Discovery 

```bash
Show me all services connected to my production pipelines in Harness.
```

### Policy & Approvals

```bash
Configure a Pipeline that has a Harness Approval stage that requires the account administrator user group to approve. Minimum 2 users must approve.
```

## How It Works

The extension uses Docker to run the Harness MCP server with the following configuration:

- Docker Image: harness/mcp-server:latest
- Communication: Standard I/O (stdio)
- Environment: Inherits your HARNESS_API_KEY and other Harness environment variables
- Base URL: Defaults to https://app.harness.io

## Extension Management

- List Installed Extensions

```shell 
gemini extensions list
```

- Update the Extension

```shell
gemini extensions update harness-platform
```

- Disable the Extension

```shell
gemini extensions disable harness-platform
```

- Uninstall the Extension

```shell
gemini extensions uninstall harness-platform
```

## Best Practices

#### Secrets
 
- Keep all API keys in environment variables, never hardcode them.

#### Review Before Apply

- Always review generated YAML/configurations before applying them.

#### RBAC Enforcement

- The Harness MCP enforces RBAC, so ensure your API key has the correct permissions.

 #### Scope Management
 
- Use organization and project environment variables to set appropriate defaults.

## Troubleshooting

### Extension Installation Issues

- Ensure you have a valid internet connection
- Verify Docker is running if you encounter Docker-related errors
- Check that the GitHub repository is accessible

### Authentication Issues

- Verify your HARNESS_API_KEY is valid and has appropriate permissions
- Check that the API key hasn’t expired
- Ensure you’re using the correct base URL for your Harness instance

### Docker Issues

- Ensure Docker is installed and running
- Verify you have permission to pull Docker images
- Check Docker daemon status if container startup fails

## References
- [Harness MCP GitHub Repository](https://github.com/harness/mcp-server)
- [Gemini CLI Extensions Documentation](https://ai.google.dev/gemini-api/docs/cli)
- [Harness API Documentation](https://developer.harness.io/docs)
