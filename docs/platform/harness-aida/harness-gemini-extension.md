---
title: Harness AI x Gemini CLI 
description: Leverage Gemini CLI with Harness AI MCP Server to unleash your developer workflows
sidebar_position: 11
---

# Harness MCP with Gemini CLI Extension

Harness MCP (Model Context Protocol) integrates seamlessly with **Gemini CLI**, enabling developers to interact with Harness directly from their terminal. With this extension, you can create pipelines, troubleshoot executions, and manage connectors using natural language prompts.

---

## Prerequisites

- Installed [Harness MCP Server](https://developer.harness.io/docs/platform/harness-aida/harness-mcp-server/)  
- [Gemini CLI](https://github.com/google-gemini/cli) installed (requires Node.js v18+)  
- Access to the [Harness MCP GitHub repo](https://github.com/harness/mcp-server)  
- Harness API key with required permissions  

---

## Introduction

Harness MCP with Gemini CLI brings the power of Harness directly into the developer’s command line, turning everyday DevOps tasks into natural language conversations. Developers can instantly generate and modify pipelines, analyze failed executions with AI-powered insights, and create or manage connectors without navigating complex UIs. Teams gain faster feedback loops, reduced context switching, and easier governance by surfacing policy checks and approval flows directly in the CLI. This integration empowers developers to move from idea to deployment in minutes, improving productivity, accelerating time-to-market, and ensuring every action aligns with enterprise standards—all while staying in the environment they use most: the terminal.

## Step 1: Create a Gemini CLI Extension for Harness MCP

Gemini CLI extensions are defined in a manifest file named `gemini-extension.json`.  
Below is an example manifest to connect Gemini CLI with Harness MCP:

```json
{
  "name": "harness-mcp-extension",
  "version": "1.0.0",
  "description": "Gemini CLI extension that connects Gemini to the Harness MCP Server for CI/CD and DevOps automation.",
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["-y", "@harness/mcp-server"],
      "env": {
        "HARNESS_ACCOUNT_ID": "${env:HARNESS_ACCOUNT_ID}",
        "HARNESS_ORG_ID": "${env:HARNESS_ORG_ID}",
        "HARNESS_PROJECT_ID": "${env:HARNESS_PROJECT_ID}",
        "HARNESS_API_KEY": "${env:HARNESS_API_KEY}",
        "HARNESS_ENDPOINT": "${env:HARNESS_ENDPOINT}"
      },
      "cwd": "${extensionPath}"
    }
  },
  "commands": [
    {
      "name": "harness:whoami",
      "description": "Confirm Harness credentials are valid by fetching current principal via MCP.",
      "prompt": "Use the Harness MCP to verify my identity and current account/org/project access."
    }
  ]
}
```

## Step 2: Install and Enable the Extension

1. Create a folder for your extension:  
   ```bash
   mkdir harness-mcp-extension && cd harness-mcp-extension
   ```

2.	Save the gemini-extension.json file at the repo root.

3.	Add the extension:
   ```bash
    gemini extension add .
   ```

4. Verify installation:
   ```bash
   gemini extension list
   ```

## Step 3: Configure Harness Access

Export the following environment variables before running commands:

```bash
export HARNESS_ENDPOINT="https://app.harness.io/gateway"
export HARNESS_ACCOUNT_ID="<your_account_id>"
export HARNESS_ORG_ID="<your_org_id>"
export HARNESS_PROJECT_ID="<your_project_id>"
export HARNESS_API_KEY="<your_api_key>"
```

## Step 4: Validate the Integration

Run a quick test to confirm that the extension can reach Harness MCP:

```bash
gemini run harness:whoami
```

Or simply ask Gemini:

```bash
gemini> Using the Harness MCP, confirm my identity and list the default account/org/project in scope.
```

## Step 5: Example Prompts

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



