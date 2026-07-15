---
id: index
title: Harness Agents
sidebar_label: Harness Agents
description: Bring AI automation directly into your pipelines with Harness Agents; governed by RBAC, OPA policies, audit logs, and GitX versioning.
sidebar_position: 1
---

Harness Agents let you bring powerful AI automation directly into your pipelines without losing control, security, or governance. Using your own models (OpenAI, Anthropic, Gemini) or Harness AI, agents analyze, fix, refactor, and optimize code and configs within the same guardrails you already trust for CI/CD. Each agent is a reusable template governed by RBAC, OPA policies, audit logs, and GitX versioning.

| Stat | Label | Details |
|---|---|---|
| **13+** | Agents Available | Pre-built catalog spanning code quality, security, and productivity |
| **BYOM** | Bring Your Own Model | OpenAI, Anthropic, Gemini, MCP |
| **Governed** | Enterprise Controls | RBAC, OPA, Audit Logs |
| **Multi-SCM** | Source Control | GitHub, GitLab, Bitbucket, Harness Code |

---

## How Agents work

Agents follow a consistent execution flow from trigger to pull request. Every agent adheres to this lifecycle regardless of its specific task.

1. **Trigger**: An agent is triggered from the Harness UI, API, or automatically in response to events (e.g., CI failure, new PR).
2. **Clone**: The agent clones the target repository using configured SCM credentials.
3. **Analyze**: AI analyzes the codebase, logs, or PR diff to understand context.
4. **Execute**: The coding agent performs the task; writing code, generating tests, or creating fixes.
5. **Review**: Changes are pushed to a new branch and a pull request is created for human review.
6. **No Auto-Merge**: All agent-generated changes require human approval before merging.

:::warning PR-Based Workflow
Agents follow a strict PR-based workflow. No changes are ever auto-merged; every modification goes through your team's standard review process.
:::

---

## AI Model connectors (Bring Your Own Model)

Agents use `AIModel` connectors to communicate with LLMs. You can connect SaaS providers, self-hosted endpoints, or MCP servers. Each connector respects Harness RBAC and scoping (Account / Org / Project) and can run on Delegates (inside your network) or on the Harness Platform.

| Provider | SaaS | Self-Hosted | MCP Support |
|---|---|---|---|
| OpenAI | Yes | Yes (custom endpoint) | Yes |
| Anthropic | Yes | Yes (custom endpoint) | Yes |
| Gemini | Yes | Yes (custom endpoint) | Yes |

Each connector requires a token (stored as a Harness secret) and an optional endpoint for self-hosted or gateway URLs.

```yaml title="connector-anthropic-saas.yaml"
connector:
  name: Anthropic_SaaS
  identifier: Anthropic_SaaS
  type: AIModel
  spec:
    provider: Anthropic
    credentials:
      type: Token
      tokenRef: account.anthropic_api_key
```

```yaml title="connector-anthropic-selfhosted.yaml"
connector:
  name: Anthropic_SelfHosted
  identifier: Anthropic_SelfHosted
  orgIdentifier: default
  projectIdentifier: default
  type: AIModel
  spec:
    provider: Anthropic
    credentials:
      type: Token
      tokenRef: account.anthropic_api_key
    endpoint: https://anthropic.mycompany.internal/v1
```

### Connector scoping

`AIModel` connectors follow the same scoping rules as all Harness connectors. Define them at Account, Org, or Project level depending on your team's access needs. Once created, a connector can be passed as an `llm` input to any agent.

---

## System Agents vs Custom Agents

Agents come in two flavors: System Agents shipped by Harness and Custom Agents built by your team. Both are implemented as pipeline templates and governed by the same RBAC and policy controls.

| Aspect | System Agents | Custom Agents |
|---|---|---|
| Source | Shipped and maintained by Harness | Built by your team |
| Editable | No (fork to customize) | Yes |
| Delivery | Auto-loaded as pipeline templates | Created via agent steps + standard steps |
| Versioning | Managed by Harness releases | Versioned via GitX |
| Scope | Account / Org / Project | Account / Org / Project |
| Customization | Fork, then modify prompts, containers, steps | Full control over all components |

### Forking System Agents

You can fork any System Agent to create a Custom Agent that you fully control. This lets you adjust prompts, target languages, containers, and approval flows while starting from a proven template. Forked agents can be stored in Git using GitX and versioned like any other pipeline template.

---

## Template architecture

Each agent template is a directory under `templates/` containing the files that define the agent's identity, pipeline logic, and documentation.

| File | Required | Purpose |
|---|---|---|
| `metadata.json` | Yes | Name, description, semantic version |
| `pipeline.yaml` | Yes | Harness CI pipeline v1 YAML defining stages, steps, containers, and inputs |
| `wiki.MD` | Optional | User-facing documentation with overview, capabilities, and troubleshooting |
| `logo.svg` | Optional | Visual icon displayed in the Harness UI |

```json title="metadata.json"
{
  "name": "code review",
  "description": "Reviews code changes in pull requests and posts intelligent feedback",
  "version": "1.0.0"
}
```

```yaml title="pipeline.yaml"
pipeline:
  clone:
    depth: 50
  stages:
    - name: agent-stage
      steps:
        - name: analyze
          run:
            container:
              image: agent-container:latest
            env:
              API_KEY: <+inputs.apiKey>
            script: |
              # Agent logic here
      platform:
        os: linux
        arch: arm64
  inputs:
    apiKey:
      type: secret
      description: API key for AI service
```

---

## Agent catalog

Harness provides a growing catalog of pre-built agents spanning code quality, security, developer productivity, and library upgrades. Each agent is a self-contained template that can be configured, triggered independently, or forked and customized.

| Agent | Category | Description | Key Capability |
|---|---|---|---|
| Code Review | Code Quality | Reviews PR changes and posts intelligent feedback | 3-stage review process with AI-generated comments |
| Code Coverage | Code Quality | Generates comprehensive unit tests for 90%+ coverage | Up to 300 AI iterations, auto-posted coverage reports |
| Autofix | Code Quality | Diagnoses and fixes CI pipeline failures automatically | Two-stage AI: remediation agent + coding agent |
| Zero Day Remediation | Security | Remediates critical vulnerabilities across multiple repos | CVE-based fixes across Java, JS, Python, Go, C# |
| Manifest Remediator | Security | Analyzes K8s/Helm deployment failures and generates fixes | Root cause analysis from execution logs |
| Feature Flag Cleanup | Productivity | Removes stale feature flags from codebases | AI-powered flag reference detection and removal |
| React Upgrade | Productivity | Automates React upgrades and code modifications | Accepts custom prompts for any upgrade task |
| Onboarding | Productivity | Imports repos into Harness and auto-generates CI pipelines | Uses Sonnet for analysis, Opus for pipeline generation |
| Library Upgrade (Java) | Upgrades | Scans Maven/Gradle projects for outdated dependencies | Updates `pom.xml` / `build.gradle` with optional test runs |
| Library Upgrade (Python) | Upgrades | Reviews Python dependencies (requirements/Poetry/Pipenv) | Regenerates lockfiles and opens a PR |
| Helm Chart Autofix | Security | Troubleshoots failed Helm releases and diagnoses misconfigurations | Proposes fixed templates and values as a PR |
| Unified Agent | Orchestration | Central orchestration agent for services, environments, connectors, secrets, and pipelines | Can create and update pipelines in-line |
| Vulnerability Remediation | Security | Takes SAST/SCA scan results and generates targeted fixes | Wires fixes back to the failing pipeline |

---

## Input types

Agents use three standardized input types to accept configuration values. These types ensure consistent handling of plain text, encrypted credentials, and platform integrations across all agent templates.

| Type | Description | Example |
|---|---|---|
| `string` | Plain text values like repo names, branch names, URLs | `repo`, `branch`, `prompt` |
| `secret` | Encrypted credentials, never logged or exposed | `anthropicKey`, `harnessKey`, `repoAccessToken` |
| `connector` | Pre-configured Harness connectors for SCM and AI services | `llmConnector`, `gitConnector` |

```yaml title="pipeline.yaml"
pipeline:
  inputs:
    llmConnector:
      type: connector
      description: LLM connector for AI operations
    gitConnector:
      type: connector
      description: Git connector for repository access
    repo:
      type: string
      description: Repository name
    branch:
      type: string
      description: Target branch
      default: main
    harnessKey:
      type: secret
      description: Harness API key for platform operations
```

Inputs are referenced in pipeline YAML via expression syntax. Use `<+inputs.inputName>` to reference an input value, `<+steps.stepName.output.outputVariables.VAR>` for step outputs, and built-in variables like `<+account.identifier>` for platform context.

---

## Using Agents in pipelines

Agents appear in the Step Palette under an **Agents / AI** section. When you add an Agent step to a pipeline, you choose the agent (System or Custom), configure its inputs (LLM connector, prompt, repo details), and optionally add approval steps before the agent applies changes.

### Agent template definition

An agent template declares its inputs including the LLM connector, repository details, and a prompt. The `oneof` field constrains which connector types are valid.

```yaml title="agent-template.yaml"
agent:
  name: pr_autofix
  inputs:
    ref:
      type: string
    pr:
      type: string
    prompt:
      type: string
      default: "Detect and fix common issues (lint, import, simple bugs)."
    llm:
      type: connector
      oneof: [claude, openai, gemini]
    repo:
      type: connector
      oneof: [GitHub]
```

### Reference an Agent in a pipeline

Reference an agent by name and template from within any pipeline stage. Agent inputs can be fixed in YAML or provided at runtime.

```yaml title="pipeline-with-agent.yaml"
pipeline:
  stages:
  - name: autofix-pr
    steps:
    - agent:
        name: autofix
        template: pr-autofix
        on-failure:
          strategy: always-run
```

### Agent steps

Agents are built from reusable AI steps implemented as containers (similar to Drone plugins). Step types include `ai-code-review`, `ai-autofix`, `ai-dep-upgrade`, `ai-error-analyzer`, and `ai-ff-cleanup`. Each step receives LLM credentials, repo context, and task-specific inputs. These steps can be used directly or composed into higher-level agents.

---

## SCM Integration

Agents support multiple SCM providers with automatic detection. The platform determines the correct SCM provider and authentication method based on the repository configuration.

| SCM Provider | Push Support | PR Creation | Auto-Detection |
|---|---|---|---|
| Harness Code | Yes | Yes (via API) | Yes |
| GitHub | Yes | Yes | Yes |
| GitLab | Yes | Yes | Yes |
| Bitbucket | Yes | Yes | Yes |

Agents analyze the git remote URL to determine the SCM provider and configure authentication accordingly. The `create-pr-plugin` container handles multi-SCM PR creation, abstracting provider-specific API differences into a single unified step.

:::info Input Patterns
Two input patterns exist across agents: newer agents use connector-based inputs (`llmConnector`, `gitConnector`) while older agents use direct secret inputs (`anthropicKey`). Both patterns are fully supported.
:::

---

## Governance, RBAC, and security

Agents respect all the controls you already expect from Harness. Every AI action is a pipeline step; fully auditable, subject to OPA policies, and eligible for template approval workflows.

### RBAC permissions

| Permission | Description |
|---|---|
| View | See agent templates and execution history |
| Create | Create new custom agents |
| Edit | Modify custom agent templates (System Agents cannot be edited) |
| Execute | Run agents via UI, YAML, or API |
| Delete | Remove custom agent templates |

### Scoping

| Scope | Visibility |
|---|---|
| Account | Global across the entire account |
| Org | Shared across all projects in an organization |
| Project | Visible only within that project |

### Security principles

- **No hardcoded secrets**: All credentials are passed via Harness secrets or connectors
- **PR-based review**: All changes go through pull requests; no direct commits to main branches
- **No auto-merge**: Agent-generated PRs always require human approval
- **OPA policy enforcement**: Agent steps are subject to OPA policies like any other pipeline step
- **Full audit trail**: Every agent execution is logged with inputs, outputs, and user context
- **Container isolation**: Each agent step runs in an isolated container with no persistent state

:::warning Secret Management
Never commit API keys or secrets directly in agent templates. Always use Harness secrets (`type: secret`) or connectors (`type: connector`) for sensitive values.
:::

---

## Call Agents using the API

In addition to using agents from the UI or YAML, you can invoke agents programmatically via the Harness API. Since agents are pipelines with AI steps, they use the same API surface as standard pipeline executions.

- **Trigger an agent run**: Start an agent execution with specified inputs
- **Pass inputs**: Provide connector, repo, prompt, and other parameters
- **Track execution**: Monitor status and outputs like any other pipeline

---

## Get started

1. Create an `AIModel` connector for your LLM provider
2. Explore System Agents in the Step Palette
3. Try **PR Autofix** or **Code Review** on a non-critical repo
4. Add approval steps for governance
5. Fork a System Agent to customize it for your environment