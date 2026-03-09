---
title: Harness Skills
description: Specialized prompt templates that enable AI coding assistants to interact with the Harness platform through natural language using the MCP protocol.
sidebar_label: Skills
sidebar_position: 12
---

Harness Skills are specialized prompt templates that teach AI coding assistants how to interact with the Harness platform. Each skill encapsulates the domain knowledge needed to accomplish a specific task — generating pipeline YAML, creating services, debugging executions, analyzing costs, and more — so you can work with Harness using natural language in your editor.

:::info Early Preview — Open Source
Harness Skills is available as an **Early Preview** release. It is fully open source and community feedback is welcome.

- **Source Code:** [github.com/harness/harness-skills](https://github.com/harness/harness-skills)
:::

## How skills work

Skills are Markdown files with structured instructions that AI editors load as context. When you invoke a skill (e.g., `/create-pipeline`), the AI reads the skill's instructions and uses the [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) tools to execute actions against the Harness platform.

```
Natural language prompt
    → AI editor loads skill instructions
        → Skill orchestrates MCP tool calls (harness_list, harness_create, etc.)
            → Harness MCP V2 Server
                → Harness Platform APIs
```

Skills don't embed API schemas directly. Instead, they use the `harness_describe` MCP tool to discover resource schemas at runtime, keeping skills lightweight and always up to date.

## Requirements

- **AI coding assistant:** Claude Code, Cursor, GitHub Copilot, OpenAI Codex, or Windsurf
- **Harness MCP V2 Server:** Required for tool execution. See [MCP V2 setup](/docs/platform/harness-ai/harness-mcp-server#harness-mcp-v2-server-early-preview)
- **Harness API Key:** [Generate an API key](/docs/platform/automation/api/add-and-manage-api-keys/)

## Setup

### Claude Code

1. Clone the skills repository and start Claude Code from it:

```bash
git clone https://github.com/harness/harness-skills.git
cd harness-skills
claude
```

2. Configure the Harness MCP V2 server in `~/.claude/settings.json`:

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

Skills are auto-discovered from the `CLAUDE.md` file and the `skills/` directory.

**Invoke a skill:**

```
/create-pipeline
Create a CI pipeline for a Node.js app that builds, tests, and pushes a Docker image to ECR
```

### Cursor

No manual setup needed — Cursor auto-loads the project rules from `.cursor/rules/harness.mdc`.

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

GitHub Copilot auto-loads instructions from `.github/copilot-instructions.md`.

1. Open the `harness-skills` folder in VS Code.
2. Configure the MCP server in `.vscode/mcp.json`:

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

3. Reference skills using `#file`:

```
#file:harness-skills/skills/create-pipeline/SKILL.md
Create a CI/CD pipeline for my Python app
```

### OpenAI Codex

Codex auto-loads the `AGENTS.md` file as system instructions. Configure the MCP server in your Codex MCP configuration and invoke skills by referencing the skill files.

## Available skills

### Pipeline and execution

| Skill | Description |
|-------|-------------|
| `/create-pipeline` | Generate pipeline YAML for CI, CD, or combined workflows with support for approvals, matrix strategies, and multi-stage deployments |
| `/create-pipeline-v1` | Generate v1 simplified pipeline YAML (alpha) |
| `/run-pipeline` | Execute pipelines, monitor runs, and handle input sets |
| `/debug-pipeline` | Analyze execution failures, identify root causes, and suggest fixes |
| `/migrate-pipeline` | Convert v0 pipelines to v1 format |
| `/create-trigger` | Create webhook, scheduled, and artifact triggers for pipelines |
| `/create-template` | Create reusable step, stage, pipeline, and step group templates |

### Resource management

| Skill | Description |
|-------|-------------|
| `/create-service` | Define services for Kubernetes, Helm, ECS, Lambda, SSH, and WinRM deployments |
| `/create-environment` | Create environments with overrides and configurations |
| `/create-infrastructure` | Define infrastructure definitions for target clusters and hosts |
| `/create-connector` | Create connectors for Git providers, cloud platforms, container registries, and Kubernetes clusters |
| `/create-secret` | Manage secrets including text secrets, secret files, SSH keys, and WinRM credentials |

### Access control and governance

| Skill | Description |
|-------|-------------|
| `/manage-users` | Manage users, user groups, and service accounts |
| `/manage-roles` | Configure RBAC roles, role assignments, permissions, and resource groups |
| `/manage-feature-flags` | Create, list, toggle, and delete feature flags |

### Platform operations

| Skill | Description |
|-------|-------------|
| `/manage-delegates` | Monitor delegate health and manage registration tokens |

### Observability and analysis

| Skill | Description |
|-------|-------------|
| `/analyze-costs` | Cloud cost analysis, optimization recommendations, and anomaly detection (CCM) |
| `/security-report` | Security vulnerability reports, SBOMs, and compliance status (SCS/STO) |
| `/dora-metrics` | DORA metrics and engineering performance insights (SEI) |
| `/gitops-status` | GitOps application health, sync status, and drift detection |
| `/chaos-experiment` | Create and run chaos engineering experiments |
| `/scorecard-review` | Service maturity scorecards and compliance checks (IDP) |
| `/audit-report` | Audit trails and compliance reports for SOC2, GDPR, and HIPAA |
| `/template-usage` | Template dependency tracking and adoption analysis |

### Governance policies

| Skill | Description |
|-------|-------------|
| `/create-policy` | Create OPA governance policies for supply chain security |

### Agents

| Skill | Description |
|-------|-------------|
| `/create-agent-template` | Generate AI-powered agent templates (metadata, pipeline YAML, and documentation) |

## Skill anatomy

Each skill lives in `skills/<skill-name>/SKILL.md` and follows a consistent structure:

```
skills/create-pipeline/
├── SKILL.md              # Skill definition (required)
└── references/           # Supplementary docs (optional)
    ├── native-steps.md
    ├── v0-pipeline-schema.md
    └── codebase-analysis.md
```

The `SKILL.md` file contains:

- **Frontmatter** — Name, description, version, MCP server dependency, and license metadata
- **Instructions** — Step-by-step guidance with MCP tool calls and parameters
- **Examples** — Real invocation scenarios
- **Performance notes** — Best practices and optimization tips
- **Troubleshooting** — Common errors and solutions

Reference files in the `references/` subdirectory provide supplementary knowledge like schema definitions, decision trees, and template libraries that the AI loads on demand.

## Cross-skill workflows

Skills can be chained together for end-to-end workflows. Resources that depend on other resources must be created in the correct order.

### New microservice setup

A typical workflow for onboarding a new microservice:

1. `/create-connector` — Git, Docker registry, and Kubernetes cluster connectors
2. `/create-secret` — Credentials for connector authentication
3. `/create-service` — Service definition referencing connectors
4. `/create-environment` — Target environment configuration
5. `/create-infrastructure` — Infrastructure definition for the target cluster
6. `/create-pipeline` — CI/CD pipeline referencing the service, environment, and infrastructure
7. `/create-trigger` — Webhook or schedule trigger to automate the pipeline

### Codebase-aware pipeline generation

The `/create-pipeline` skill includes codebase analysis capabilities. It can scan your project files to auto-detect:

- **Language and runtime** from source files (`package.json` → Node.js, `go.mod` → Go)
- **Build tools** from build configuration (`Dockerfile`, `webpack.config.js`, `pom.xml`)
- **Test frameworks** from test configuration (`jest.config.*`, `pytest.ini`)
- **Deployment targets** from manifests (`Chart.yaml` → Helm, `task-definition.json` → ECS)

This allows the skill to generate pipeline YAML tailored to your project without manual configuration.

## References

- [Harness Skills Repository](https://github.com/harness/harness-skills)
- [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server)
- [Contributing Guide](https://github.com/harness/harness-skills/blob/main/CONTRIBUTING.md)
