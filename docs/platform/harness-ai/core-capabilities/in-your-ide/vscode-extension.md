---
title: Harness VS Code Extension
sidebar_label: VS Code Extension
description: Install the Harness VS Code Extension to monitor pipelines, view logs, manage approvals, and use AI-assisted debugging directly in Visual Studio Code.
sidebar_position: 8
keywords:
  - harness
  - vs code
  - vscode
  - cursor
  - windsurf
  - antigravity
  - extension
  - pipeline
  - ide
  - ai
  - openvsx
tags:
  - harness-ai
  - ide
redirect_from:
  - /docs/platform/harness-ai/code-agent
  - /docs/platform/harness-ai/vscode-extension
  - /docs/platform/harness-aida/code-assistant
  - /docs/platform/harness-aida/code-agent
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness VS Code Extension brings Harness CI/CD <a href="/docs/continuous-delivery/getting-started/#step-1-create-your-pipeline" target="_blank">pipeline</a> monitoring, log viewing, deployment approvals, and AI-assisted debugging directly into your IDE. You can track pipeline executions, inspect logs, approve deployments, and re-run or abort pipelines without leaving your editor.

The extension is available in VS Code, Cursor, Windsurf, and Antigravity.

:::note
Harness AI Code Agent (AI code completions and chat) has been updated. For more information, see <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI overview</a>.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Install the extension in VS Code, Cursor, Windsurf, and Antigravity](#install-the-extension).
- [Configure authentication with a personal access token or environment variables](#configure-the-extension).
- [Monitor pipelines, view logs, and re-run or abort executions](#monitor-pipelines).
- [Respond to deployment approvals without opening the Harness UI](#manage-approvals).
- [Use AI-assisted debugging with automatic pipeline context injection](#use-ai-assisted-debugging).

---

## Before you begin

Before you install the Harness VS Code Extension, ensure you have the following:

- **VS Code**: Version 1.85.0 or later.
- **Cursor, Windsurf, or Antigravity**: A build that supports OpenVSX extensions and the VS Code 1.85.0 extension API.
- **Harness account**: An active Harness account with project access.
- **Personal access token (PAT)**: A token generated in your Harness account. Go to <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a> to create one.

---

## Install the extension

Install the extension from your IDE marketplace so the Harness views appear in the Activity Bar. The installation steps differ slightly depending on which editor you use.

<Tabs>
<TabItem value="vscode" label="VS Code" default>

1. Open the Extensions view (`Cmd+Shift+X` on macOS or `Ctrl+Shift+X` on Windows and Linux).
2. Search for **Harness**.
3. Select the **Harness** extension published by Harness, Inc.
4. Click **Install**.

Alternatively, install from the command line:

```bash
code --install-extension harness-inc.harness-vscode
```

You can also install the extension from the <a href="https://marketplace.visualstudio.com/items?itemName=harness-inc.harness-vscode" target="_blank">VS Code Marketplace</a> and click **Install**.

</TabItem>
<TabItem value="openvsx" label="Cursor, Windsurf, and Antigravity">

The extension is published to the <a href="https://open-vsx.org/extension/harness-inc/harness-vscode" target="_blank">OpenVSX Registry</a> and is available directly in the Extensions panel of Cursor, Windsurf, and Antigravity.

1. Open the Extensions panel in your IDE.
2. Search for **Harness**.
3. Select the **Harness** extension published by Harness, Inc.
4. Click **Install**.

</TabItem>
</Tabs>

---

## Configure the extension

You can connect the extension to your Harness account to read pipelines and executions for the correct organization and project. To configure your credentials interactively, follow the steps below. For automated setups, supply the same credentials through <a href="#use-environment-variables">environment variables</a> instead.

1. Select the Harness icon in the Activity Bar.
2. Run the command **Harness: Configure API Key** from the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`).
3. Enter your Harness instance URL (default: `https://app.harness.io`).
4. Enter your PAT. The extension automatically extracts your account ID from the token.
5. Select your organization and project.

### Use environment variables

Environment variable authentication skips the credential prompts, which suits CI/CD environments and shared development images where no one is present to answer them. Set the following environment variables before you launch your IDE:

```bash
export HARNESS_API_KEY="your-pat"
export HARNESS_BASE_URL="https://app.harness.io"
export HARNESS_ACCOUNT_ID="your-account-id"
```

Set `harness.authSource` to `env` in your editor settings to activate environment variable authentication.

---

## Monitor pipelines

Pipeline monitoring keeps execution status in your editor. This way, you can triage failures without switching to the Harness UI. There are two views in the Harness Activity Bar panel:

- **Pipelines**: Browse all accessible pipelines. Search, filter by status, and pin favorites.
- **Executions**: View full execution history filtered by pipeline or status.

Both views refresh automatically on a configurable interval (default: 10 seconds). The extension pauses polling when the sidebar is hidden or the IDE loses focus to conserve resources.

### View pipeline logs

You can select any execution to open step-level logs in a dedicated editor tab with syntax highlighting. Failed steps are highlighted, so you can find the step that broke without reading through the ones that passed.

### Re-run or abort a pipeline

- **Re-run**: Click the `re-run` button on any finished execution to restart it with the original inputs. The extension confirms before triggering and navigates to the new execution automatically.
- **Abort**: Click the `abort` button on a running execution and select an interrupt type: **Abort All** or **Mark as Failed**.

The action button adapts to execution status: `re-run` appears for terminal executions, and `abort` appears for running ones.

### View execution detail tabs

Select an execution to open stage-level detail tabs:

- **Build**: Repository, branch, commits, and published image or SBOM artifacts.
- **Deploy**: Per-stage services with manifests, environments, and skip reasons, plus a live rollup of active stages and environments.
- **Security**: STO scanner results with per-severity tiles and new-vulnerability deltas. The tab badge updates live during an in-progress scan.

### Export an execution

Select **Export Current Execution to JSON** from the Command Palette to export the latest execution details for offline debugging or sharing with your team.

---

## Manage approvals

Approval prompts appear inline in the extension, so a paused deployment does not require a context switch. When a pipeline reaches an approval gate, the extension surfaces a prompt in the Executions view. Click **Approve** or **Reject** to respond without opening the Harness UI.

The extension supports the following approval types:

- Harness native approvals
- Jira approvals
- ServiceNow approvals

---

## Use AI-assisted debugging

AI-assisted debugging gives your AI assistant the failure context it needs, so you do not copy log output between windows yourself. When the extension detects a failure, it automatically injects pipeline context (pipeline name, execution status, step logs, branch, and commit) into your AI assistant.

The extension supports the following AI platforms:

| Platform | Mode | Configuration |
|----------|------|---------------|
| **Claude Code** | CLI: fully automated; Extension: semi-automated | Active Claude Code session required |
| **GitHub Copilot** | Auto-detected through the VS Code platform | Uses `.vscode/mcp.json` |
| **Cursor** | Auto-detected with auto-paste | Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/cursor-plugin" target="_blank">Harness AI Cursor Plugin</a> to configure the Cursor integration |

### Configure MCP scope for Claude Code

The Model Context Protocol (MCP) scope determines whether your configuration is shared with your team or kept local to your machine. The extension writes MCP configuration at two scopes:

| Scope | Path | Sharing |
|-------|------|---------|
| **Project** | `.mcp.json` in workspace root | Commit to share with your team |
| **Global** | `~/.claude.json` | Personal only, applies to all projects |

---

## Configuration reference

These settings control connectivity, refresh behavior, and log verbosity. You configure them in your editor settings, either at the user level or per workspace.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `harness.baseUrl` | string | `https://app.harness.io` | Harness instance URL. Supports on-premises deployments. |
| `harness.accountIdentifier` | string | `""` | Account ID. Auto-extracted from PAT if left empty. |
| `harness.authSource` | enum | `pat` | Authentication source: `pat` or `env`. |
| `harness.orgIdentifier` | string | `default` | Organization identifier. |
| `harness.projectIdentifier` | string | `""` | Project identifier. |
| `harness.pollingIntervalSeconds` | number | `10` | Pipeline status refresh interval in seconds (5 to 120). |
| `harness.defaultView` | enum | `thisCommit` | Default sidebar view: `thisCommit` or `allExecutions`. |
| `harness.logLevel` | enum | `info` | Log verbosity: `off`, `error`, `warn`, `info`, or `debug`. |

---

## Switch projects per workspace

A per-workspace override lets each repository point at the **Organization** and **Project** that owns its pipelines. Run **Harness: Switch Project (This Workspace)** from the Command Palette to set a different organization and project for the current workspace. This override is stored in workspace settings and does not affect other projects.

---

## Troubleshooting

If the extension does not connect or the views stay empty, the cause is usually one of the following. Each entry covers what to check.

<BrowserOnly>
  {() => (
    <>
      <Troubleshoot
        issue="Authentication fails with 401 Token is not valid"
        mode="docs"
        fallback="Navigate to Account Settings in Harness and regenerate your PAT. Run Harness: Reset Auth Configuration from the Command Palette, then re-enter your credentials. If you use environment variable auth, verify HARNESS_API_KEY is set correctly and harness.authSource is set to env."
      />

      <Troubleshoot
        issue="Pipelines view is empty after configuration"
        mode="docs"
        fallback="Verify your account ID, organization, and project are correct by running Harness: Configure API Key. Confirm your PAT has View permissions on Pipelines in the target project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to check your role assignments."
      />

      <Troubleshoot
        issue="Logs do not open or show blank content"
        mode="docs"
        fallback="Run Harness: Show Debug Output from the Command Palette and check for API errors. Confirm your Harness instance URL is reachable from your machine. If you are behind a corporate proxy, verify proxy support is enabled in your editor settings."
      />

      <Troubleshoot
        issue="AI context injection does not trigger after a pipeline failure"
        mode="docs"
        fallback="For Claude Code, ensure an active Claude Code session is running. For GitHub Copilot, verify the extension is installed and a .vscode/mcp.json file is present. For Cursor, go to the [Harness AI Cursor Plugin](/docs/platform/harness-ai/core-capabilities/in-your-ide/cursor-plugin) to configure the Cursor plugin."
      />
    </>
  )}
</BrowserOnly>

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/cursor-plugin" target="_blank">Harness AI Cursor Plugin</a>: Set up AI pipeline management in Cursor.
- <a href="/docs/platform/harness-ai/connect-with-ai/harness-mcp-server" target="_blank">Harness MCP Server</a>: Configure the Harness MCP server for your AI assistant.
- <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a>: Create or rotate your PAT.
