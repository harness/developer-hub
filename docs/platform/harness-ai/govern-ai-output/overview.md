---
title: Harness Skills Overview
description: Use Harness Skills, prompt templates that teach AI coding assistants how to generate pipeline YAML, manage resources, debug failures, and analyze costs on the Harness platform.
keywords:
  - harness skills
  - AI coding assistant
  - Claude Code
  - MCP server
  - Cursor
  - GitHub Copilot
  - OpenAI Codex
  - Windsurf
tags:
  - ai
  - automation
  - mcp-server
sidebar_label: Overview
sidebar_position: 1
redirect_from:
  - /docs/platform/harness-ai/harness-skills
---

Harness Skills are specialized prompt templates that teach AI coding assistants how to interact with the Harness platform. Each skill encapsulates the domain knowledge needed to accomplish a specific task, such as generating pipeline YAML, creating services, debugging executions, or analyzing costs. 

Invoke the skills using natural language in your editor, and the AI assistant handles the underlying interactions with Harness.

For more information on the source code for Harness skills, see <a href="https://github.com/harness/harness-skills" target="_blank">github.com/harness/harness-skills</a>.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Understand how skills work](#how-skills-work) with the Harness MCP Server.
- [Set up skills](#set-up-skills) in Claude Code, Cursor, GitHub Copilot, OpenAI Codex, or Windsurf.

---

## Before you begin

Before you set up Harness Skills, ensure you have the following:

- **AI coding assistant**: Claude Code, Cursor, GitHub Copilot, OpenAI Codex, or Windsurf.
- **Harness MCP Server**: A configured <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">MCP server</a> for tool execution.
- **Harness API key**: An <a href="/docs/platform/automation/api/add-and-manage-api-keys/" target="_blank">API key</a> to authenticate with the Harness platform.

---

## How skills work

Skills are markdown files with structured instructions that AI editors load as context. Understanding this flow helps you troubleshoot skill behavior and extend skills with your own workflows.

The repository is designed as a workflow system, not a folder of prompts. Top level instructions (`CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`) establish shared behavior, while individual skills specialize in creation, debugging, governance, and reporting tasks.

When you invoke a skill (for example, `/create-pipeline`), the AI reads the skill's instructions and uses the <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a> tools to execute actions against the Harness platform:

```
Natural language prompt
    → AI editor loads skill instructions
        → Skill orchestrates MCP tool calls (harness_list, harness_create, etc.)
            → Harness MCP Server
                → Harness Platform APIs
```

Skills do not embed API schemas directly. Instead, they use the `harness_describe` MCP tool to discover resource schemas at runtime, keeping skills lightweight and always up to date.

---

## Set up skills

You can configure your AI coding assistant to load skill instructions and connect to the Harness MCP Server. The setup instructions for different editors are described below:

### Claude Code

Claude Code discovers skills from the repository itself, so start it from the cloned folder and invoke skills by name.

Clone the skills repository and start Claude Code from it:

```bash
git clone https://github.com/harness/harness-skills.git
cd harness-skills
claude
```

Configure the Harness MCP server in `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "harness-mcp-v2": {
      "command": "npx",
      "args": ["-y", "harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

Skills are auto-discovered from the `CLAUDE.md` file and the `skills/` directory. Invoke a skill by name:

```
/create-pipeline
Create a CI pipeline for a Node.js app that builds, tests, and pushes a Docker image to ECR
```

### Cursor

Cursor picks up shared behavior from the project rules, and you point it at individual skills with an `@file` reference.

Cursor auto-loads the project rules from `.cursor/rules/harness.mdc`.

1. Open the `harness-skills` folder in Cursor.
2. Configure the MCP server in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "harness-mcp-v2": {
      "command": "npx",
      "args": ["-y", "harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

3. Reference skills using `@file`:

```
@harness-skills/skills/create-pipeline/SKILL.md
Create a CI pipeline for my Go microservice
```

### GitHub Copilot

Copilot reads shared instructions from the repository, and you reference individual skills with a `#file` mention.

GitHub Copilot auto-loads instructions from `.github/copilot-instructions.md`.

1. Open the `harness-skills` folder in VS Code.
2. Configure the MCP server in `.vscode/mcp.json`:

```json
{
  "servers": {
    "harness-mcp-v2": {
      "command": "npx",
      "args": ["-y", "harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

3. Reference skills using `#file`:

```
#file:harness-skills/skills/create-pipeline/SKILL.md
Create a CI/CD pipeline for my Python app
```

For GitHub Copilot on GitHub.com, attach skill files as context in Copilot Chat, or add them as knowledge base references in your Copilot organization settings.

### OpenAI Codex

Codex takes its shared behavior from `AGENTS.md`, and you name the skill file you want in the prompt itself.

Codex auto-loads the `AGENTS.md` file as system instructions.

1. Clone the repository into your working directory:

```bash
git clone https://github.com/harness/harness-skills.git
```

2. Configure the MCP server in your Codex MCP configuration:

```json
{
  "mcpServers": {
    "harness-mcp-v2": {
      "command": "npx",
      "args": ["-y", "harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

3. Reference skill files as context when prompting:

```
Using the instructions in harness-skills/skills/debug-pipeline/SKILL.md,
diagnose why my deploy pipeline failed
```

### Windsurf and other AI editors

Skills are not tied to a specific editor, so any tool that can load instructions, connect to an MCP server, and reference files can use them.

The skills are plain Markdown files with YAML frontmatter. They work with any AI coding tool that supports:

- **System instructions**: Use `CLAUDE.md` as project level context.
- **MCP servers**: Connect the <a href="https://github.com/harness/mcp-server" target="_blank">Harness MCP Server</a> for API access.
- **File context**: Reference individual `skills/*/SKILL.md` files in prompts.

---

## Next steps

- <a href="/docs/platform/harness-ai/govern-ai-output/harness-skills" target="_blank">Skill catalog</a>: Browse the full list of skills grouped by workflow mode.
- <a href="/docs/platform/harness-ai/govern-ai-output/workflow-and-references" target="_blank">Workflows and reference</a>: Chain skills into end-to-end workflows and review the skill file structure.