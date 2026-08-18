---
title: Harness AI Cursor Plugin
description: Install the Harness AI plugin for Cursor to manage pipelines, debug deployments, and interact with Harness using natural language directly from your IDE.
sidebar_label: Cursor Plugin
sidebar_position: 11
keywords:
  - harness ai
  - cursor
  - cursor plugin
  - ide
  - mcp
  - oauth
  - pipeline
  - skills
  - governance hooks
  - natural language
tags:
  - harness-ai
  - ide
redirect_from:
  - /docs/platform/harness-ai/cursor-plugin
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness AI Cursor Plugin brings the full power of the Harness platform into Cursor. Search "Harness" in the Cursor Plugin Marketplace to install it, authenticate with OAuth, and start managing <a href="/docs/continuous-delivery/getting-started#step-1-create-your-pipeline" target="_blank">pipelines</a>, debugging executions, creating infrastructure, and governing deployments using natural language.

The plugin bundles 30 skills, 11 Model Context Protocol (MCP) tools covering 160+ resource types, workspace rules, and governance hooks so the agent follows Harness conventions out of the box.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Enable OAuth for your Harness account](#step-1-enable-oauth-for-your-harness-account).
- [Install the plugin from the Cursor Marketplace or from source](#step-2-install-the-plugin).
- [Authenticate the plugin through the browser consent flow](#step-3-authenticate).
- [Manage Harness resources with natural language prompts in Cursor](#use-harness-in-cursor).
- [Apply workspace rules and governance hooks to enforce Harness standards](#governance-hooks).

---

## Before you begin

Before you install the Harness AI Cursor Plugin, ensure you have the following:

- **Cursor IDE**: Version 0.48 or later with plugin support enabled.
- **Harness account**: An active Harness account. 
- **OAuth enabled**: Account-level OAuth, which the plugin requires to authenticate through the browser consent flow. Enablement requires a support ticket, which is the first step below.

---

## Step 1: Enable OAuth for your Harness account

The Cursor Plugin uses OAuth to authenticate with Harness, so enable OAuth at the account level before you install the plugin.

1. Open a support ticket with <a href="https://support.harness.io" target="_blank">Harness Support</a> requesting OAuth enablement for your account.
2. Provide your Harness **Account ID**, found in **Account Settings** > **Overview**.
3. After Support confirms OAuth is enabled, continue with the installation steps.

---

## Step 2: Install the plugin

Install the plugin from the Cursor Marketplace for the fastest setup, or install from source when you need to run a specific build. Marketplace installation also lets you choose whether the plugin applies to your user account or your whole Cursor organization.

<Tabs>
<TabItem value="marketplace" label="Cursor Marketplace" default>

1. Open Cursor and navigate to **Settings** > **Plugins** > **Marketplace**.
2. Search for **Harness**.
3. Select the **Harness** plugin by Harness, Inc.
4. Click **Install** and select the installation scope:
   - **Personal**: Installs the plugin for your user only.
   - **Organization**: Installs the plugin for all members of your Cursor organization.
5. Restart Cursor after installation completes.

</TabItem>
<TabItem value="github" label="GitHub Source">

Install from source when you prefer to build from the repository:

```bash
git clone https://github.com/harness/harness-ai.git
```

Then add the plugin path `plugins/cursor/` from the cloned repository to your Cursor plugin configuration.

</TabItem>
</Tabs>

---

## Step 3: Authenticate

Authentication uses OAuth, so no API keys or manual configuration are required to authenticate the plugin. Governance hooks are the one exception, and they need the environment variables from Step 4.

The plugin connects to the remote Harness MCP server at `https://mcp.harness.io/mcp`.

1. Open Cursor after you install the plugin.
2. Open the **Agent** or **Chat** panel and invoke any Harness action. For example, type "List my Harness pipelines".
3. Cursor opens a browser window with the Harness OAuth consent screen.
4. Sign in with your Harness credentials and approve the consent.
5. Return to Cursor. The plugin is now authenticated and ready to use.

Subsequent sessions reuse the cached OAuth token automatically. If the token expires, the consent flow triggers again on the next tool call.

---

## Step 4: Set environment variables for governance hooks

Complete this step only if you use governance hooks. The hooks call the Harness API directly, so they need an API key and account ID in addition to the OAuth token that authenticates the plugin.

Set the following variables before you start Cursor:

```bash
export HARNESS_API_KEY="pat.xxxxx.xxxxx.xxxxx"
export HARNESS_ACCOUNT_ID="your-account-id"
```

Without these variables, governance hooks fail open and the rest of the plugin works normally. Go to <a href="#governance-hooks" target="_self">Governance hooks</a> to review what each hook enforces.

---

## Use Harness in Cursor

Natural language is the primary interface, so you describe the outcome you want instead of assembling YAML by hand. After you authenticate, interact with Harness in the Cursor Agent panel. The plugin interprets your intent and routes requests through the appropriate MCP tools and skills.

### Example prompts

Use the following prompts as starting points for common workflows.

**Pipeline management:**

```text
Create a CI pipeline for my Node.js app that builds, tests, and pushes a Docker image to ECR
```

```text
Debug my last failed deployment. What went wrong and how do I fix it?
```

**Infrastructure and resources:**

```text
Create a GitHub connector for harness/my-repo using the PAT stored in secret github_pat
```

```text
Set up staging and production environments for the payments service
```

**Governance and observability:**

```text
Show me DORA metrics for the platform project over the last quarter
```

```text
Find cost anomalies in the last 30 days and recommend optimizations
```

---

## Skills

Skills encode Harness-specific procedures, so the agent follows a known-good sequence instead of improvising. The plugin ships with 30 skills that teach the Cursor agent how to accomplish specific Harness tasks. Skills are invoked automatically based on your prompt, or you reference them directly with `@file`.

| Category | Skills |
|----------|--------|
| **Pipeline and templates** | `create-pipeline`, `create-pipeline-v1`, `create-template`, `create-trigger`, `run-pipeline`, `debug-pipeline`, `migrate-pipeline` |
| **Infrastructure** | `create-service`, `create-environment`, `create-infrastructure`, `create-connector`, `create-secret` |
| **Access control** | `manage-users`, `manage-roles`, `manage-feature-flags` |
| **Operations** | `manage-delegates`, `manage-freeze-windows`, `manage-pull-requests`, `manage-slos` |
| **Intelligence** | `analyze-costs`, `dora-metrics`, `security-report`, `gitops-status`, `chaos-experiment`, `scorecard-review`, `audit-report`, `template-usage` |
| **AI agents** | `create-agent`, `create-agent-template` |

For more information on the full skill catalog and how skills orchestrate MCP tool calls, see <a href="/docs/platform/harness-ai/govern-ai-output/harness-skills" target="_blank">Harness Skills</a>.

---

## MCP tools

The tool set is deliberately small so the agent selects the right tool reliably as resource coverage grows. The plugin exposes 11 consolidated MCP tools that cover 160+ Harness resource types.

| Tool | Purpose |
|------|---------|
| `harness_list` | List resources with filters, pagination, and search |
| `harness_get` | Fetch a single resource by ID |
| `harness_create` | Create a new resource |
| `harness_update` | Update an existing resource |
| `harness_delete` | Delete a resource |
| `harness_execute` | Run, retry, approve, reject, or toggle actions |
| `harness_search` | Cross-resource keyword search |
| `harness_describe` | Discover resource types and operations (no API call) |
| `harness_schema` | Get the JSON Schema for create and update payloads |
| `harness_diagnose` | Analyze pipeline failures with stage and step breakdown |
| `harness_status` | Get project health overview |

Go to <a href="/docs/platform/harness-ai/connect-with-ai/harness-mcp-server" target="_blank">Harness MCP Server</a> to review the full MCP server documentation and configuration options.

### Resources the tools reach

Resource access lets the agent read your existing configuration before it writes anything new. The MCP server exposes Harness resources through URI-based access, and the agent reads and references the following:

- **Pipelines** (v0 and v1), services, environments, and infrastructure definitions
- **Connectors** (Git, cloud, registry, cluster) and secrets
- **Templates** (step, stage, pipeline, step group)
- **Feature flags**, delegates, SLOs, and policy definitions
- **Organizations** and projects for multi-scope operations

The agent discovers resources dynamically. You do not need to hardcode **Organization** or **Project** IDs.

---

## Workspace rules

Workspace rules constrain how the agent operates, which prevents malformed or out-of-order resource creation. The plugin includes a workspace rule (`harness.mdc`) that applies to Cursor sessions automatically. This rule teaches the agent to:

- Establish **Organization** and **Project** scope before write operations.
- Verify referenced resources exist before creating dependents.
- Follow the correct dependency order: connectors, secrets, services, environments, infrastructure, pipelines, and triggers.
- Request user confirmation for write, delete, and execute operations.
- Recover from common API errors (`DUPLICATE_IDENTIFIER`, `CONNECTOR_NOT_FOUND`, `ACCESS_DENIED`).

---

## Governance hooks

Governance hooks apply your organization's standards at the moment of creation, so agent-generated pipelines follow approved patterns. The plugin includes two hooks:

- **Template governance (before create)**: When you create a pipeline without referencing a template, the hook surfaces available templates at **Account**, **Organization**, and **Project** scope so you reuse approved patterns.
- **Policy validation (after create or update)**: After a pipeline write, the hook evaluates the YAML against <a href="https://www.openpolicyagent.org/docs/latest/policy-language/" target="_blank">OPA</a> policies bound to your account and reports pass and fail results.

Both hooks call the Harness API, so they stay inactive until you set the required environment variables. Go to <a href="#step-4-set-environment-variables-for-governance-hooks" target="_self">Set environment variables for governance hooks</a> to activate them.

---

## Troubleshooting

Use the following guidance to resolve the most common installation, authentication, and governance failures.

<Troubleshoot
  issue="OAuth consent screen does not appear when I invoke a Harness tool"
  mode="docs"
  fallback="Verify OAuth is enabled for your account by contacting Harness Support. Ensure you are running Cursor 0.48 or later and that the Harness plugin is installed and active in Settings > Plugins."
/>

<Troubleshoot
  issue="Plugin installed but no Harness tools appear in Cursor"
  mode="docs"
  fallback="Restart Cursor after installing the plugin. Open Settings > Plugins and verify the Harness plugin shows as active. If installed from GitHub, confirm the plugin path points to the plugins/cursor/ directory."
/>

<Troubleshoot
  issue="Authentication fails with ACCESS_DENIED after OAuth approval"
  mode="docs"
  fallback="Your Harness user may lack the required permissions. Verify your role has access to the target organization and project. Navigate to Account Settings > Access Control to check your role assignments."
/>

<Troubleshoot
  issue="Governance hooks are not enforcing template or policy checks"
  mode="docs"
  fallback="Governance hooks require HARNESS_API_KEY and HARNESS_ACCOUNT_ID environment variables set in your shell before starting Cursor. Without these, hooks fail open and do not call the Harness API."
/>

---

## Next steps

Extend the plugin with the wider Harness AI tooling and prompt patterns.

- <a href="/docs/platform/harness-ai/govern-ai-output/harness-skills" target="_blank">Harness Skills</a>: Explore the full skill catalog.
- <a href="/docs/platform/harness-ai/connect-with-ai/harness-mcp-server" target="_blank">Harness MCP Server</a>: Review advanced MCP configuration and deployment options.
- <a href="/docs/platform/harness-ai/harness-create-with-ai/effective-prompting-ai" target="_blank">Effective Prompting</a>: Learn prompt patterns that produce better results with Harness AI.
