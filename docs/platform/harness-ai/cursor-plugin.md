---
title: Harness AI Cursor Plugin
description: Install the Harness AI plugin for Cursor to manage pipelines, debug deployments, and interact with Harness using natural language directly from your IDE.
sidebar_label: Cursor Plugin
sidebar_position: 11
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The Harness AI Cursor Plugin brings the full power of the Harness platform into Cursor. Search "Harness" in the Cursor Plugin Marketplace to install it, authenticate with OAuth, and start managing pipelines, debugging executions, creating infrastructure, and governing deployments using natural language.

The plugin bundles 30 skills, 11 MCP tools covering 160+ resource types, workspace rules, and governance hooks so the agent follows Harness conventions out of the box.

---

## Prerequisites

- **Cursor IDE:** Version 0.48 or later with plugin support enabled.
- **Harness account:** An active Harness account with OAuth enabled. Go to [Harness Support](https://support.harness.io) to request OAuth enablement for your account.
- **OAuth enabled:** Contact Harness Support to enable OAuth for your Harness account. This is required for the plugin to authenticate through the browser consent flow.

---

## Enable OAuth for your Harness account

The Cursor Plugin uses OAuth to authenticate with Harness. OAuth must be enabled at the account level before you can use the plugin.

1. Open a support ticket with [Harness Support](https://support.harness.io) requesting OAuth enablement for your account.
2. Provide your Harness **Account ID** (found in **Account Settings** > **Overview**).
3. Once Support confirms OAuth is enabled, proceed with the installation steps below.

---

## Install the plugin

You can install the Harness plugin to your personal Cursor workspace or to your organization.

### Install from the Cursor Marketplace

1. Open Cursor and navigate to **Settings** > **Plugins** > **Marketplace**.
2. Search for **Harness**.
3. Select the **Harness** plugin by Harness, Inc.
4. Select **Install** and choose the installation scope:
   - **Personal:** Installs the plugin for your user only.
   - **Organization:** Installs the plugin for all members of your Cursor organization.
5. Restart Cursor after installation completes.

### Install from GitHub (alternative)

If you prefer to install from source:

```bash
git clone https://github.com/harness/harness-ai.git
```

Then add the plugin path `plugins/cursor/` from the cloned repository to your Cursor plugin configuration.

---

## Authenticate

The plugin connects to the remote Harness MCP server at `https://mcp.harness.io/mcp` using OAuth. No API keys or manual configuration required.

1. Open Cursor after installing the plugin.
2. Open the **Agent** or **Chat** panel and invoke any Harness action (for example, type "List my Harness pipelines").
3. Cursor opens a browser window with the Harness OAuth consent screen.
4. Sign in with your Harness credentials and approve the consent.
5. Return to Cursor. The plugin is now authenticated and ready to use.

Subsequent sessions reuse the cached OAuth token automatically. If the token expires, the consent flow triggers again on the next tool call.

---

## Start using Harness in Cursor

Once authenticated, interact with Harness using natural language in the Cursor Agent panel. The plugin understands your intent and routes requests through the appropriate MCP tools and skills.

### Example prompts

**Pipeline management:**

```text
Create a CI pipeline for my Node.js app that builds, tests, and pushes a Docker image to ECR
```

```text
Debug my last failed deployment — what went wrong and how do I fix it?
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

The plugin ships with 30 skills that teach the Cursor agent how to accomplish specific Harness tasks. Skills are invoked automatically based on your prompt, or you can reference them directly with `@file`.

| Category | Skills |
|----------|--------|
| **Pipeline and templates** | `create-pipeline`, `create-pipeline-v1`, `create-template`, `create-trigger`, `run-pipeline`, `debug-pipeline`, `migrate-pipeline` |
| **Infrastructure** | `create-service`, `create-environment`, `create-infrastructure`, `create-connector`, `create-secret` |
| **Access control** | `manage-users`, `manage-roles`, `manage-feature-flags` |
| **Operations** | `manage-delegates`, `manage-freeze-windows`, `manage-pull-requests`, `manage-slos` |
| **Intelligence** | `analyze-costs`, `dora-metrics`, `security-report`, `gitops-status`, `chaos-experiment`, `scorecard-review`, `audit-report`, `template-usage` |
| **AI agents** | `create-agent`, `create-agent-template` |

Go to [Harness Skills](/docs/platform/harness-ai/harness-skills) to review the full skill catalog and learn how skills orchestrate MCP tool calls.

---

## MCP tools

The plugin exposes 11 consolidated MCP tools that cover 160+ Harness resource types:

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
| `harness_schema` | Get the JSON Schema for create/update payloads |
| `harness_diagnose` | Analyze pipeline failures with stage/step breakdown |
| `harness_status` | Get project health overview |

Go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to review the full MCP server documentation and configuration options.

---

## Resources

The MCP server exposes Harness resources via URI-based access. The agent can read and reference:

- **Pipelines** (v0 and v1), services, environments, and infrastructure definitions
- **Connectors** (Git, cloud, registry, cluster) and secrets
- **Templates** (step, stage, pipeline, step group)
- **Feature flags**, delegates, SLOs, and policy definitions
- **Organizations** and projects for multi-scope operations

The agent discovers resources dynamically. You do not need to hardcode org or project IDs.

---

## Workspace rules

The plugin includes a workspace rule (`harness.mdc`) that automatically applies to Cursor sessions. This rule teaches the agent to:

- Establish org and project scope before write operations.
- Verify referenced resources exist before creating dependents.
- Follow the correct dependency order (connectors, secrets, services, environments, infrastructure, pipelines, triggers).
- Request user confirmation for write, delete, and execute operations.
- Recover from common API errors (`DUPLICATE_IDENTIFIER`, `CONNECTOR_NOT_FOUND`, `ACCESS_DENIED`).

---

## Governance hooks

The plugin includes two governance hooks that enforce Harness standards automatically:

- **Template governance (before create):** When you create a pipeline without referencing a template, the hook surfaces available templates at account, org, and project scope so you can reuse approved patterns.
- **Policy validation (after create/update):** After a pipeline write, the hook evaluates the YAML against OPA policies bound to your account and reports pass/fail results.

To activate governance hooks, set these environment variables before starting Cursor:

```bash
export HARNESS_API_KEY="pat.xxxxx.xxxxx.xxxxx"
export HARNESS_ACCOUNT_ID="your-account-id"
```

Without these variables, governance hooks fail open and the plugin continues to work normally.

---

## Troubleshooting

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
  fallback="Your Harness user may lack the required permissions. Verify your role has access to the target organization and project. Go to Account Settings > Access Control to check your role assignments."
/>

<Troubleshoot
  issue="Governance hooks are not enforcing template or policy checks"
  mode="docs"
  fallback="Governance hooks require HARNESS_API_KEY and HARNESS_ACCOUNT_ID environment variables set in your shell before starting Cursor. Without these, hooks fail open and do not call the Harness API."
/>

---

## Next steps

- Go to [Harness Skills](/docs/platform/harness-ai/harness-skills) to explore the full skill catalog.
- Go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to review advanced MCP configuration and deployment options.
- Go to [Effective Prompting](/docs/platform/harness-ai/effective-prompting-ai) to learn prompt patterns that produce better results with Harness AI.
