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
  - /docs/platform/harness-aida/code-assistant
  - /docs/platform/harness-aida/code-agent
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import BrowserOnly from '@docusaurus/BrowserOnly';

The Harness VS Code Extension brings Harness CI/CD pipeline monitoring, log viewing, deployment approvals, and AI-assisted debugging directly into your IDE. You can track pipeline executions, inspect logs, approve deployments, and re-run or abort pipelines without leaving your editor.

The extension is available in VS Code, Cursor, Windsurf, and AntiGravity.

:::note
Looking for the Harness AI Code Agent (AI code completions and chat)? That feature has been updated. Go to [Harness AI overview](/docs/platform/harness-ai/overview) to find current AI-assisted development tools.
:::

---

## Before you begin

- **VS Code:** Version 1.85.0 or later.
- **Cursor, Windsurf, or AntiGravity:** A build that supports OpenVSX extensions and the VS Code 1.85.0 extension API.
- **Harness account:** An active Harness account with project access.
- **Personal Access Token (PAT):** Generated in your Harness account. Go to [Manage API keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) to create one.

---

## Install the extension

### VS Code

1. Open the Extensions view (`Cmd+Shift+X` on macOS or `Ctrl+Shift+X` on Windows/Linux).
2. Search for **Harness**.
3. Select the **Harness** extension published by Harness, Inc.
4. Select **Install**.

Alternatively, install from the command line:

```bash
code --install-extension harness-inc.harness-vscode
```

Or go to the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=harness-inc.harness-vscode) and select **Install**.

### Cursor, Windsurf, and AntiGravity

The extension is published to the [OpenVSX Registry](https://open-vsx.org/extension/harness-inc/harness-vscode) and is available directly in the Extensions panel of Cursor, Windsurf, and AntiGravity.

1. Open the Extensions panel in your IDE.
2. Search for **Harness**.
3. Select the **Harness** extension published by Harness, Inc.
4. Select **Install**.

---

## Configure the extension

1. Select the Harness icon in the Activity Bar.
2. Run the command **Harness: Configure API Key** from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).
3. Enter your Harness instance URL (default: `https://app.harness.io`).
4. Enter your PAT. The extension automatically extracts your account ID from the token.
5. Select your organization and project.

### Use environment variables (CI/CD-friendly)

Set the following environment variables before launching your IDE to skip the credential prompts:

```bash
export HARNESS_API_KEY="your-pat"
export HARNESS_BASE_URL="https://app.harness.io"
export HARNESS_ACCOUNT_ID="your-account-id"
```

Set `harness.authSource` to `env` in your editor settings to activate environment variable authentication.

---

## Monitor pipelines

The extension adds two views to the Harness Activity Bar panel:

- **Pipelines:** Browse all accessible pipelines. Search, filter by status, and pin favorites.
- **Executions:** View full execution history filtered by pipeline or status.

Both views refresh automatically on a configurable interval (default: 10 seconds). The extension pauses polling when the sidebar is hidden or the IDE loses focus to conserve resources.

### View pipeline logs

Select any execution to open step-level logs in a dedicated editor tab with syntax highlighting. Failed steps are highlighted for quick triage.

### Re-run or abort a pipeline

- **Re-run:** Select the re-run button on any finished execution to restart it with the original inputs. The extension confirms before triggering and navigates to the new execution automatically.
- **Abort:** Select the abort button on a running execution and choose an interrupt type: **Abort All** or **Mark as Failed**.

The action button adapts to execution status: re-run appears for terminal executions, abort appears for running ones.

### View execution detail tabs

Select an execution to open stage-level detail tabs:

- **Build:** Repository, branch, commits, and published image or SBOM artifacts.
- **Deploy:** Per-stage services with manifests, environments, and skip reasons, plus a live rollup of active stages and environments.
- **Security:** STO scanner results with per-severity tiles and new-vulnerability deltas. The tab badge updates live during an in-progress scan.

### Export an execution

Select **Export Current Execution to JSON** from the Command Palette to export the latest execution details for offline debugging or sharing with your team.

---

## Manage approvals

When a pipeline reaches an approval gate, the extension surfaces an inline prompt in the Executions view. Select **Approve** or **Reject** to respond without opening the Harness UI.

Supported approval types:
- Harness native approvals
- Jira approvals
- ServiceNow approvals

---

## Use AI-assisted debugging

The extension automatically injects pipeline context (pipeline name, execution status, step logs, branch and commit) into AI assistants when a failure is detected.

Supported AI platforms:

| Platform | Mode | Configuration |
|----------|------|---------------|
| **Claude Code** | CLI: fully automated; Extension: semi-automated | Active Claude Code session required |
| **GitHub Copilot** | Auto-detected via VS Code platform | Uses `.vscode/mcp.json` |
| **Cursor** | Auto-detected with auto-paste | Go to [Harness AI Cursor Plugin](https://developer.harness.io/docs/platform/harness-ai/cursor-plugin) to configure the Cursor integration |

### Configure MCP scope for Claude Code

The extension can write MCP configuration at two scopes:

| Scope | Path | Sharing |
|-------|------|---------|
| **Project** | `.mcp.json` in workspace root | Commit to share with your team |
| **Global** | `~/.claude.json` | Personal only, applies to all projects |

---

## Configuration reference

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `harness.baseUrl` | string | `https://app.harness.io` | Harness instance URL. Supports on-premises deployments. |
| `harness.accountIdentifier` | string | `""` | Account ID. Auto-extracted from PAT if left empty. |
| `harness.authSource` | enum | `pat` | Authentication source: `pat` or `env`. |
| `harness.orgIdentifier` | string | `default` | Organization identifier. |
| `harness.projectIdentifier` | string | `""` | Project identifier. |
| `harness.pollingIntervalSeconds` | number | `10` | Pipeline status refresh interval in seconds (5–120). |
| `harness.defaultView` | enum | `thisCommit` | Default sidebar view: `thisCommit` or `allExecutions`. |
| `harness.logLevel` | enum | `info` | Log verbosity: `off`, `error`, `warn`, `info`, or `debug`. |

---

## Switch projects per workspace

Run **Harness: Switch Project (This Workspace)** from the Command Palette to set a different org and project for the current workspace. This override is stored in workspace settings and does not affect other projects.

---

## Troubleshooting

<BrowserOnly>
  {() => (
    <>
      <Troubleshoot
        issue="Authentication fails with 401 Token is not valid"
        mode="docs"
        fallback="Go to Account Settings in Harness and regenerate your PAT. Run Harness: Reset Auth Configuration from the Command Palette, then re-enter your credentials. If you use environment variable auth, verify HARNESS_API_KEY is set correctly and harness.authSource is set to env."
      />

      <Troubleshoot
        issue="Pipelines view is empty after configuration"
        mode="docs"
        fallback="Verify your account ID, org, and project are correct by running Harness: Configure API Key. Confirm your PAT has View permissions on Pipelines in the target project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to check your role assignments."
      />

      <Troubleshoot
        issue="Logs do not open or show blank content"
        mode="docs"
        fallback="Run Harness: Show Debug Output from the Command Palette and check for API errors. Confirm your Harness instance URL is reachable from your machine. If you are behind a corporate proxy, verify proxy support is enabled in your editor settings."
      />

      <Troubleshoot
        issue="AI context injection does not trigger after a pipeline failure"
        mode="docs"
        fallback="For Claude Code, ensure an active Claude Code session is running. For GitHub Copilot, verify the extension is installed and a .vscode/mcp.json file is present. For Cursor, go to the [Harness AI Cursor Plugin](/docs/platform/harness-ai/cursor-plugin) to configure the Cursor plugin."
      />
    </>
  )}
</BrowserOnly>

---

## Next steps

- Go to [Harness AI Cursor Plugin](https://developer.harness.io/docs/platform/harness-ai/cursor-plugin) to set up AI pipeline management in Cursor.
- Go to [Harness MCP Server](https://developer.harness.io/docs/platform/harness-ai/harness-mcp-server) to configure the Harness MCP server for your AI assistant.
- Go to [Manage API keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) to create or rotate your PAT.
