---
title: Harness Skills
description: Claude Code skills for the Harness CI/CD platform — generate pipeline YAML, manage resources, debug failures, analyze costs, and more from natural language.
sidebar_label: Skills
sidebar_position: 12
---

Harness Skills are specialized prompt templates that teach AI coding assistants how to interact with the Harness platform. Each skill encapsulates the domain knowledge needed to accomplish a specific task — generating pipeline YAML, creating services, debugging executions, analyzing costs, and more — so you can work with Harness using natural language in your editor.

The repository is designed as a workflow system, not just a folder of prompts. Top-level instructions (`CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`) establish shared behavior, while individual skills specialize in creation, debugging, governance, and reporting tasks.

- **Source code:** [github.com/harness/harness-skills](https://github.com/harness/harness-skills)

## How skills work

Skills are Markdown files with structured instructions that AI editors load as context. When you invoke a skill (for example, `/create-pipeline`), the AI reads the skill's instructions and uses the [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) tools to execute actions against the Harness platform.

```
Natural language prompt
    → AI editor loads skill instructions
        → Skill orchestrates MCP tool calls (harness_list, harness_create, etc.)
            → Harness MCP Server
                → Harness Platform APIs
```

Skills don't embed API schemas directly. Instead, they use the `harness_describe` MCP tool to discover resource schemas at runtime, keeping skills lightweight and always up to date.

## Prerequisites

- **AI coding assistant:** Claude Code, Cursor, GitHub Copilot, OpenAI Codex, or Windsurf
- **Harness MCP Server:** Required for tool execution. See [MCP Server setup](/docs/platform/harness-ai/harness-mcp-server)
- **Harness API key:** [Generate an API key](/docs/platform/automation/api/add-and-manage-api-keys/)

## Set up skills

### Claude Code

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

For GitHub Copilot on GitHub.com, attach skill files as context in Copilot Chat or add them as knowledge base references in your Copilot organization settings.

### OpenAI Codex

Codex auto-loads the `AGENTS.md` file as system instructions.

1. Clone the repo into your working directory:

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

The skills are plain Markdown files with YAML frontmatter. They work with any AI coding tool that supports:

- **System instructions:** Use `CLAUDE.md` as project-level context.
- **MCP servers:** Connect the [Harness MCP Server](https://github.com/harness/mcp-server) for API access.
- **File context:** Reference individual `skills/*/SKILL.md` files in prompts.

## Operating model

The best Harness skills follow the same control flow even when they target different resource types:

1. **Establish scope first** — Confirm account, org, and project context before listing, creating, updating, or deleting resources.
2. **Verify dependencies before generating dependents** — Do not reference connectors, secrets, environments, infrastructure, or templates that have not been confirmed to exist.
3. **Discover schema before writing payloads** — Use `harness_describe` and API validation feedback instead of guessing field names or payload shape.

## Workflow modes

| Workflow mode | Representative skills | When to use |
|---------------|-----------------------|-------------|
| **Create and scaffold** | `/create-pipeline`, `/create-service`, `/create-connector`, `/create-template` | You need to define or generate new Harness resources and their YAML or MCP payloads |
| **Run and debug** | `/run-pipeline`, `/debug-pipeline`, `/migrate-pipeline`, `/manage-delegates` | You already have resources and need to execute, diagnose, or repair behavior |
| **Govern and secure** | `/manage-roles`, `/manage-users`, `/create-policy`, `/security-report`, `/audit-report` | You need RBAC, policy, compliance, or security workflows |
| **Analyze and report** | `/dora-metrics`, `/analyze-costs`, `/scorecard-review`, `/template-usage` | You need structured reports, recommendations, or adoption analysis |

## Available skills

### Pipeline and template creation

| Skill | Description |
|-------|-------------|
| `/create-pipeline` | Generate v0 pipeline YAML (CI, CD, approvals, matrix strategies) |
| `/create-pipeline-v1` | Generate v1 simplified pipeline YAML — alpha: internal testing only |
| `/create-template` | Create reusable step, stage, pipeline, or step group templates |
| `/create-trigger` | Create webhook, scheduled, and artifact triggers |
| `/create-agent` | Create and update Harness AI agent instances for automated code and infrastructure tasks |
| `/create-agent-template` | Create AI-powered agent templates — alpha: internal testing only |

### Resource management

| Skill | Description |
|-------|-------------|
| `/create-service` | Create service definitions (Kubernetes, Helm, ECS, Lambda) |
| `/create-environment` | Create environment definitions with overrides |
| `/create-infrastructure` | Create infrastructure definitions |
| `/create-connector` | Create connectors (Git, cloud, registries, clusters) |
| `/create-secret` | Create secrets (text, file, SSH, WinRM) |
| `/manage-artifacts` | Manage Harness Artifact Registry — Docker, Helm, Maven, and generic registries |
| `/manage-iacm` | Manage IaCM Terraform workspaces, state files, and drift detection |
| `/manage-idp` | Manage IDP service catalog templates, workflows, and scorecards |
| `/manage-supply-chain` | Manage Software Supply Chain Assurance — SBOM generation, policy enforcement |
| `/manage-cde` | Manage Cloud Development Environments (CDE) for on-demand dev workspaces |

### Access control and feature flags

| Skill | Description |
|-------|-------------|
| `/manage-users` | Manage users, user groups, and service accounts |
| `/manage-roles` | Manage role assignments and RBAC |
| `/manage-feature-flags` | Create, list, toggle, and delete feature flags |

### Operations and debugging

| Skill | Description |
|-------|-------------|
| `/run-pipeline` | Execute pipelines, monitor progress, handle approvals |
| `/debug-pipeline` | Analyze execution failures, diagnose root causes |
| `/optimize-pipeline` | Optimize CI/CD pipeline performance — parallel execution, caching, resource tuning |
| `/migrate-pipeline` | Convert pipelines from v0 to v1 format |
| `/deployment-readiness` | Pre-deployment readiness checks with go/no-go assessments |
| `/incident-response` | Correlate incidents with recent deployments and analyze impact |
| `/pr-analysis` | Analyze pull request impact on Harness pipelines |
| `/template-usage` | Track template dependencies and adoption |
| `/manage-delegates` | Monitor delegate health and manage tokens |

### Platform intelligence

| Skill | Description |
|-------|-------------|
| `/analyze-costs` | Cloud cost analysis and optimization (CCM) |
| `/security-report` | Vulnerability reports, SBOMs, compliance (SCS/STO) |
| `/dora-metrics` | DORA metrics and engineering performance (SEI) |
| `/gitops-status` | GitOps application health and sync status |
| `/chaos-experiment` | Create and run chaos experiments |
| `/scorecard-review` | Service maturity scorecards (IDP) |
| `/audit-report` | Audit trails and compliance reports |
| `/create-policy` | Create OPA governance policies for supply chain security |
| `/ai-operations` | Configure Harness AI-powered operations (AIDA) — predictive failure analysis and automation |
| `/manage-slos` | Manage Service Reliability — SLOs, SLIs, and error budgets |
| `/sei-analytics` | Advanced engineering analytics via Software Engineering Insights (SEI) |

## End-to-end workflows

Skills can be chained together for multi-step workflows. Resources that depend on other resources must be created in the correct order.

### New microservice setup

Use these skills in order:

1. `/create-connector` — Git, Docker registry, and Kubernetes cluster connectors
2. `/create-secret` — Credentials for connector authentication
3. `/create-service` — Service definition referencing connectors
4. `/create-environment` — Target environment configuration
5. `/create-infrastructure` — Infrastructure definition for the target cluster
6. `/create-pipeline` — CI/CD pipeline referencing the service, environment, and infrastructure
7. `/create-trigger` — Webhook or schedule trigger to automate the pipeline

### Debug a failed deployment

Typical sequence:

1. `/run-pipeline` — Identify the latest execution or reproduce the issue
2. `/debug-pipeline` — Classify the failure and inspect root cause
3. `/template-usage` — Check if shared templates propagated the issue
4. `/manage-delegates` — Investigate delegate capacity or connectivity if relevant

### Codebase-aware pipeline generation

The `/create-pipeline` skill includes codebase analysis capabilities. It can scan your project files to auto-detect:

- **Language and runtime** from source files (`package.json` → Node.js, `go.mod` → Go)
- **Build tools** from build configuration (`Dockerfile`, `webpack.config.js`, `pom.xml`)
- **Test frameworks** from test configuration (`jest.config.*`, `pytest.ini`)
- **Deployment targets** from manifests (`Chart.yaml` → Helm, `task-definition.json` → ECS)

This allows the skill to generate pipeline YAML tailored to your project without manual configuration.

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

- **Frontmatter:** Name, description, version, MCP server dependency, and license metadata.
- **Instructions:** Phase-based steps with MCP tool calls and parameters.
- **Examples:** Real invocation scenarios and worked examples.
- **Performance notes:** Validation checks, tradeoffs, and optimization guidance.
- **Troubleshooting:** Common errors and recovery steps.

Reference files in the `references/` subdirectory provide supplementary knowledge like schema definitions, decision trees, and template libraries that the AI loads on demand.

## MCP tools

Skills use the [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server), which provides 11 generic tools dispatched by `resource_type`:

| Tool | Purpose |
|------|---------|
| `harness_list` | List resources |
| `harness_get` | Get resource details |
| `harness_create` | Create a resource |
| `harness_update` | Update a resource |
| `harness_delete` | Delete a resource |
| `harness_execute` | Execute an action |
| `harness_search` | Search across resources |
| `harness_describe` | Get resource schema |
| `harness_schema` | Fetch JSON Schema definitions |
| `harness_diagnose` | Diagnose issues |
| `harness_status` | Check system status |

## Project structure

```
harness-skills/
├── skills/
│   ├── create-pipeline/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── create-template/
│   │   └── SKILL.md
│   ├── debug-pipeline/
│   │   └── SKILL.md
│   └── ...
├── references/              # Shared repo-level playbooks
├── templates/               # Shared repo-level output templates
├── examples/
│   ├── v0/                  # v0 pipeline examples
│   ├── v1/                  # v1 pipeline examples
│   ├── templates/
│   ├── triggers/
│   ├── services/
│   ├── environments/
│   ├── connectors/
│   └── ...
├── .cursor/rules/harness.mdc
├── .github/copilot-instructions.md
├── AGENTS.md
├── CLAUDE.md
└── CONTRIBUTING.md
```

## Next steps

- [Harness Skills repository](https://github.com/harness/harness-skills)
- [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server)
- [Contributing guide](https://github.com/harness/harness-skills/blob/main/CONTRIBUTING.md)
