---
title: Configure your AI client
description: Add the Harness MCP Server to Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, and Amazon Q Developer CLI using a Harness API key.
sidebar_label: Configure AI Clients
sidebar_position: 2
keywords:
  - mcp client configuration
  - claude desktop
  - cursor
  - windsurf
  - vs code
  - gemini cli
  - amazon q
tags:
  - harness-ai
  - mcp
---

Add the Harness MCP Server to your editor or terminal so your AI assistant can call Harness tools. Each client below uses the same `npx harness-mcp-v2` command with a Harness API key supplied through the `env` block.

---

## Before you begin

Before you configure AI client, ensure you have the following:

- **Harness API key**: A PAT in the format `pat.<accountId>.<tokenId>.<secret>`. Go to [Harness MCP Server](./index.md) to review prerequisites.
- **Node.js**: Required for `npx`. Go to [Install with an alternative method](./index.md#install-with-an-alternative-method) to review other options.

:::info
`HARNESS_ORG` and `HARNESS_PROJECT` are optional. Agents can discover orgs and projects dynamically using `harness_list(resource_type="organization")` and `harness_list(resource_type="project")`. Set them only when you want to pin a default scope. The deprecated names `HARNESS_DEFAULT_ORG_ID` and `HARNESS_DEFAULT_PROJECT_ID` are still accepted for backward compatibility.
:::

:::tip Troubleshoot `npx ENOENT` or `node: No such file or directory`
GUI apps (Cursor, Claude Desktop, Windsurf, VS Code) do not inherit your shell's `PATH`, so they often cannot find `npx` or `node`. Fix this by using absolute paths and explicitly setting `PATH` in the `env` block:

```json
{
  "mcpServers": {
    "harness": {
      "command": "/absolute/path/to/npx",
      "args": ["-y", "harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx",
        "PATH": "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

Find your paths with `which npx` and `which node` in a terminal. Common locations:
- **Homebrew (macOS):** `/opt/homebrew/bin/npx`
- **nvm:** `~/.nvm/versions/node/v20.x.x/bin/npx` (run `nvm which current` for the exact path)
- **System Node:** `/usr/local/bin/npx`
:::

---

## Claude Desktop

To set up AI client on Claude Desktop, navigate to the file location specified below:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
      }
    }
  }
}
```

---

## Claude Code

To set up AI client on Claude code, run the following commands on the terminal:

```bash
claude mcp add harness -- npx harness-mcp-v2
```

Then set `HARNESS_API_KEY` in your environment or `.env` file.

---

## Cursor

To set up AI client on Cursor, add the following JSON file to `.cursor/mcp.json`, and replace the Harness API key appropriately:

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
      }
    }
  }
}
```

---

## VS Code

To set up AI client on VS Code, add the following JSON file to `.vscode/mcp.json` or to your VS Code settings, and replace the Harness API key appropriately:

```json
{
  "mcp": {
    "servers": {
      "harness": {
        "command": "npx",
        "args": ["harness-mcp-v2"],
        "env": {
          "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
        }
      }
    }
  }
}
```

---

## Windsurf

To set up AI client on Windsurf, add the following JSON file to `~/.windsurf/mcp.json`, and replace the Harness API key appropriately:

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
      }
    }
  }
}
```

---

## Gemini CLI

To set up AI client on Gemini CLI, add the following JSON file to `~/.gemini/settings.json`, and replace the Harness API key appropriately:

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
      }
    }
  }
}
```

### Gemini CLI Extensions

You can install AI client using Gemini CLI Extensions. You can run the following command in your terminal:

```bash
gemini extensions install https://github.com/harness/mcp-server
export HARNESS_API_KEY="pat.xxx.xxx.xxx"
gemini
```

---

## Amazon Q Developer CLI

To set up AI client on Amazon Q Developer CLI, add the following JSON file to `~/.aws/amazonq/mcp.json`, and replace the Harness API key appropriately:

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
      }
    }
  }
}
```

---

## Next steps

- [Tools reference](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/tools-reference): Review the tools your agent can now call.
- [Environment variables](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/environment-variables): Restrict scope, enable read-only mode, or filter toolsets.
- [Troubleshooting](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/troubleshooting): Resolve connection and configuration errors.
