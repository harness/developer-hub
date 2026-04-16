---
title: Harness Agents
description: Autonomous AI agents that run inside your pipelines — building, deploying, testing, remediating, and optimizing your software delivery lifecycle.
sidebar_label: Agents
sidebar_position: 6
redirect_from:
  - /docs/platform/harness-aida/harness-agents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Harness Agents

:::info
Agent templates are open source and available on [GitHub](https://github.com/thisrohangupta/agents).
:::

Harness Agents are **AI-powered autonomous workers** that execute DevOps tasks inside Harness pipelines. Instead of relying on brittle scripts or external bots, teams can use Harness pipelines as a secure control plane for AI-driven automation — combining governance, observability, and flexibility in one flow.

Agents are pipeline-native — they inherit your pipeline's context, permissions, secrets, and governance controls while taking multi-step actions across your SDLC. Pipelines become the orchestration layer for your AI automation — able to generate, fix, and optimize your software delivery while staying under enterprise controls.

**Runtime:** Harness Pipeline Engine &nbsp;|&nbsp; **Models:** Anthropic, OpenAI, Gemini

---

## What are Harness Agents?

Agents go beyond simple AI chat. Under the hood, an agent is a pipeline containing a stage with one or more AI-powered steps. These steps invoke an LLM (Claude, Gemini, Codex, or the Harness Coding Agent) and can be referenced in any pipeline as a step template. Agents are available at the **Account**, **Org**, and **Project** scope and appear in the Step Palette under the **Agents** section.

### Pipeline-native execution

Agents run as first-class pipeline steps — not as external scripts or webhook callbacks. They share the pipeline's execution context, secrets, connectors, and RBAC scope. Every action is logged, auditable, and governed. Agents can be composed with standard Harness pipeline steps, meaning you can combine AI-powered steps with your existing build, test, deploy, and approval steps in a single workflow.

### System and custom agents

Harness provides two categories of agents:

- **System Agents** — Harness-maintained, pre-built agents that are automatically loaded into your account and ready to run out of the box. These agents are not editable but can be forked to create customized variants.
- **Custom Agents** — User-defined agents built with Agent Steps and standard Harness pipeline steps. Custom agents can be stored in Git via GitX, versioned, and shared across your organization. They follow the same OPA governance as any other pipeline step.

System Agents can be forked and customized at the Account, Org, or Project level. Forked agents become pipeline templates that you can extend, version, and manage independently.

### Context-aware intelligence

Agents access your **Knowledge Graph** — pipelines, infrastructure, services, configs, and history. They understand your environment and make decisions grounded in your actual platform state, not generic suggestions. Harness AI builds memory across builds, tests, and releases — optimizing performance, reliability, and governance automatically. Organizational rules and memories persist across sessions, encoding your team's conventions and domain knowledge.

### Example: Code coverage agent pipeline

```yaml
version: 1
pipeline:
  clone:
    depth: 1
    ref:
      name: <+inputs.branch>
      type: branch
  repo: <+inputs.repo>
  connector: "<+inputs.gitConnector>"
  stages:
    - name: code-coverage
      steps:
        - name: coding_agent              # ← AI-powered step
          run:
            container:
              image: harness/codecov:coding-agent
            with:
              max_iterations: "300"
              code_coverage: "true"
              verify: "true"
              prompt: "Analyze the current codebase and identify
                test coverage. Generate comprehensive unit tests
                to increase overall coverage to at least 90%
                and each file coverage to at least 80%.
                Generate a CONCISE COVERAGE.md file."
            env:
              ANTHROPIC_API_KEY: <+inputs.llmConnector.token>

        - name: push_and_create_pr        # ← Opens PR with tests
          run:
            container:
              image: harness/coding-agent-pr-skill
            env:
              PLUGIN_PR_TITLE: "Code Coverage: Automated
                coverage increase by Harness AI"
              PLUGIN_CREATE_PR: "true"

        - name: post_coverage_comment     # ← Posts report to PR
          run:
            container:
              image: harness/coding-agent-comment-skill

      platform:
        os: linux
        arch: arm64
  inputs:
    llmConnector:
      type: connector              # LLM provider connector
    gitConnector:
      type: connector              # SCM connector
    repo:
      type: string
    branch:
      type: string
      default: main
```

> Agent templates are modular pipeline definitions with metadata, YAML, docs, and logo. Browse templates at [thisrohangupta/agents](https://github.com/thisrohangupta/agents/tree/main/templates/code-coverage).

---

## Architecture

Agents compose three layers: the **execution runtime** (Harness Pipelines), the **intelligence layer** (LLM + Knowledge Graph), and the **tool layer** (MCP + Harness APIs). Each layer is independently configurable.

For an interactive visual overview of the architecture, see the [Harness Agents Architecture Diagram](https://v0-harness-agents-marketing.vercel.app/#architecture).

<Tabs>
<TabItem value="runtime" label="Runtime" default>

| Component | Description |
|---|---|
| **Pipeline Engine** | Agents execute within the Harness pipeline runtime — inheriting job semantics, parallel execution, failure strategies, rollback, and the full orchestration model. No new runtime to manage. |
| **Step Templates** | Agents are packaged as Step Templates and Step Group Templates. Reference them by name, version them in your template library, and compose them into any pipeline. Step templates can be managed in Git via GitX and versioned independently. |
| **Agents Are Pipelines** | Every agent is backed by a pipeline definition under the hood. Fork an agent, edit the YAML, publish your own variant. Full transparency — no black boxes. |
| **API Access** | Agents can be invoked via the Harness Pipeline API, enabling programmatic execution of AI-powered workflows from external systems and automation toolchains. |

</TabItem>
<TabItem value="intelligence" label="Intelligence">

| Component | Description |
|---|---|
| **BYOM — Bring Your Own Model** | Connect Anthropic, OpenAI, or Gemini via LLM Connectors. Switch models per agent, per environment, per pipeline. Use SaaS-hosted models or bring self-hosted models with a custom endpoint. |
| **Knowledge Graph** | Agents query your organizational Knowledge Graph for real-time context: service topology, pipeline history, deployment state, config drift, and incident patterns. |
| **Memory and Rules** | Agents learn from past interactions. Organizational rules and memories persist across sessions — encoding your team's conventions, preferences, and domain knowledge. Rules are fetched dynamically from Harness and injected into the agent's execution context. |

LLM Connectors use the `AIModel` connector type and follow the same RBAC and scoping requirements as regular Harness connectors. They support both **Harness Platform Mode** and **Delegate Mode**.

```yaml
connector:
  name: Anthropic_SaaS
  identifier: Anthropic_SaaS
  orgIdentifier: default
  projectIdentifier: default
  type: AIModel
  spec:
    provider: Anthropic
    credentials:
      type: Token
      tokenRef: account.anthropic_api_key   # secret reference
    # endpoint omitted for SaaS (uses provider default)
```

For self-hosted models, add an `endpoint` field pointing to your internal deployment:

```yaml
connector:
  name: Anthropic_SelfHosted
  identifier: Anthropic_SelfHosted
  type: AIModel
  spec:
    provider: Anthropic
    credentials:
      type: Token
      tokenRef: account.anthropic_api_key
    endpoint: https://anthropic.mycompany.internal/v1
```

</TabItem>
<TabItem value="tools" label="Tools and MCP">

| Component | Description |
|---|---|
| **MCP Integration** | Agents use Model Context Protocol to access external tools — Git, Jira, Slack, monitoring systems, cloud APIs. Internal and external MCP servers are supported via the MCP Gateway. LLM Connectors can also point to MCP Servers directly. |
| **Harness-Native Tools** | Purpose-built tools for pipeline CRUD, deployment operations, log analysis, artifact management, and infrastructure provisioning. All scoped to RBAC permissions. Agents can fetch and reason about Services, Environments, Connectors, and Secrets, and can create or update Pipelines via the Harness API. |
| **Extensible Toolkits** | Register custom tools for your domain — internal APIs, compliance scanners, proprietary systems. Custom agents are built as containerized programs (similar to Drone plugins) and can be registered with Harness for use in any pipeline. |

</TabItem>
<TabItem value="governance" label="Governance">

| Component | Description |
|---|---|
| **OPA Policy Enforcement** | Every agent action is evaluated against OPA policies before execution. Define what agents can and cannot do with the same policy-as-code framework you use for pipelines. |
| **Human-in-the-Loop** | Configure approval gates, PR-based review, and manual checkpoints. Agents propose — humans approve. You can add an approval step before any PR-creation step for governance review. |
| **Full Audit Trail** | Agent decisions, tool invocations, model responses, and mutations are captured in pipeline logs. Compliance teams can inspect the complete reasoning chain end-to-end. |

</TabItem>
</Tabs>

---

## Use cases

Agents handle the high-value, judgment-intensive work that can't be reduced to simple scripts — but shouldn't require a human in the loop for every instance. The following System Agents are available in the agent library:

### CI: Autofix

When a PR fails CI/CD, the agent inspects logs, test failures, and config errors, proposes concrete fixes, and either commits them to the PR branch (auto-fix) or adds suggested patches as comments for the author to apply. Reduces MTTR from hours to minutes.

### Testing: Code coverage

Analyzes coverage reports and code hotspots, identifies under-tested modules, and generates unit tests (and sometimes integration tests) to improve coverage to 90%+ overall and 80%+ per file. Opens a PR with new tests and an updated coverage report — fully autonomous.

### Code quality: Code review

Reads the PR diff, linked issues, and test results to produce an opinionated review: summarizes the change, highlights risk areas, detects style violations and anti-patterns, suggests refactors, and calls out missing tests or documentation.

### Feature flags: FF cleanup

Detects stale or fully rolled-out feature flags across code and config, validates that they are safe to remove, and generates PRs that delete the flag definitions, flag checks, and related dead code from the codebase.

### CD: Manifest remediator

Analyzes failed Kubernetes deployments (events, kubectl errors, logs), identifies issues in manifests — API versions, resource limits, selectors, mounts — and generates corrected YAML plus a PR or patch.

### CD: Helm chart autofix

Reviews a failed Helm chart deployment (values, templates, release errors) and fixes chart configuration issues such as invalid values, missing templates, misconfigured selectors, or version mismatches, then proposes an updated chart/values file.

### Platform: Onboarding

Scans repositories, infers build/deploy topology, and auto-creates CI/CD pipelines. New repos get pipelines in minutes, not days — with human approval before activation.

### Migration: Library upgrade

Scans projects for outdated dependencies, recommends safe version upgrades, and opens PRs with updated dependency files plus an optional test run to validate changes. Supports multiple ecosystems:

- **Java** — Maven/Gradle upgrades (e.g., Java 16 to 21)
- **React/TypeScript** — Package.json and lockfile upgrades (e.g., React 16 to 18)
- **Python** — Requirements/Poetry/Pipenv upgrades with regenerated lockfiles (e.g., Python 2 to 3)

### Security: Vulnerability remediation

Takes security vulnerabilities from scan results (SCA, SAST, container scans), identifies the impacted code or dependency, and opens a PR with targeted fixes — library upgrades, config hardening, or code changes — wired back to the failing pipeline.

### Platform: Unified agent

Central orchestration agent that can fetch and reason about Services, Environments, Connectors, and Secrets, and can create or update Pipelines directly inside your workflow. Use natural language prompts to generate complete pipeline definitions for CI, CD, or combined workflows.

---

## Design principles

Agents don't replace your pipeline infrastructure — they extend it. Same YAML, same RBAC, same audit trail. New intelligence, same control plane.

| Principle | Description |
|---|---|
| **Pipeline-native** | Agents inherit pipeline semantics — triggers, secrets, environments, failure strategies, and approval gates. No new execution model to learn or secure. |
| **Model independent** | BYOM by default. Connect Anthropic, OpenAI, or Gemini. Use SaaS endpoints or self-hosted models. All agents use a standardized LLM connector mapping (`token`, `vendor`, `model`, optional `endpoint`), so you can swap providers without rewriting agent definitions. |
| **Forkable and shareable** | Every agent is a pipeline. Fork System Agents, customize the logic, share via the Agent Marketplace. Forked agents become pipeline templates that you can extend via Flexible Templates, version, and manage in Git via GitX. |
| **Security first** | Least-privilege by default. OPA-governed actions. Scoped tools. Human-in-the-loop for effectful operations. Every agent decision is logged and reviewable. |
| **Observable** | No hidden prompts. Full reasoning chains in pipeline logs. Inspect exactly what the agent saw, decided, and executed. You own the behavior end-to-end. |
| **Enterprise-grade** | Built for regulated industries. Data residency controls, RBAC integration, compliance audit trails, and governance policies that scale to thousands of pipelines. |

---

## Security and governance

Agentic automation introduces new attack surfaces — prompt injection, tool side-effects, data exfiltration. The Harness Agents security model is built on explicit constraints over implicit trust.

| Control | Description |
|---|---|
| **Scoped permissions** | Agents inherit pipeline RBAC. They can only access resources, connectors, and secrets that the pipeline execution context permits. Agents are available at Project, Org, and Account scope — a Project-scoped agent is only available within that project. |
| **Agent RBAC** | Dedicated permissions for agents: **View**, **Edit**, **Create**, **Execute**, and **Delete**. If a user has pipeline execute access at the account level, they can run account-level agents. |
| **OPA policy gates** | Every effectful action is evaluated against OPA policies before execution. Block, warn, or require approval based on declarative rules. Agent steps follow the same OPA governance as any other pipeline step. |
| **Allow-listed tools** | Agents can only invoke explicitly declared tools. No ambient permissions. Tool specifications are reviewed and versioned like code. |
| **Visible artifacts only** | Agents create PRs, comments, and logs — never silent mutations. Every output is visible to the team for review and approval. |
| **MCP Gateway proxy** | External MCP server calls are filtered and proxied through the Harness MCP Gateway — enabling allow-listing, rate limiting, and content inspection. |
| **Compliance audit trail** | Full chain-of-thought logging. Model inputs, tool calls, outputs, and decisions are captured for SOC 2, FedRAMP, and enterprise compliance requirements. |

---

## Agents vs. traditional automation

| Dimension | Scripts and Webhooks | Standalone AI Assistants | Harness Agents |
|---|---|---|---|
| **Execution model** | External processes, custom infrastructure | API calls, no pipeline context | Pipeline-native steps with full orchestration |
| **Context** | Manual wiring via env vars | Chat history only | Knowledge Graph — services, infra, history |
| **Governance** | DIY approval scripts | None / per-provider | OPA policies, RBAC, audit logs |
| **Model flexibility** | Hard-coded API calls | Vendor lock-in | BYOM — Anthropic, OpenAI, Gemini, per-agent |
| **Extensibility** | Custom code for each integration | Plugin-dependent | MCP + forkable agents + marketplace |
| **Observability** | Custom logging | Chat logs | Full reasoning chain in pipeline logs |
| **API access** | Custom orchestration | No pipeline integration | Pipeline API for programmatic execution |

---

## Roadmap

:::note
All dates below are tentative forecasts and subject to change.
:::

### February 2026 — Foundation release ✅

Agent runtime, LLM Connectors (Anthropic, OpenAI, Gemini — SaaS and self-hosted), and System Agent templates including: Autofix, Code Coverage, Code Review, FF Cleanup, Manifest Remediator, Helm Chart Autofix, Onboarding, Library Upgrades (Java, React, Python), Vulnerability Remediation, and Unified Agent. Pipeline YAML integration, Step Templates, Agent RBAC, and Harness Auth for agent execution.

### April 2026 — Agent extensibility (MVP 1)

Fork and customize agents. Reference agents across pipelines. Onboarding Agent for guided first-run experience. Agent Marketplace with curated community agents. Custom agent CRUD via MCP Server (`agent` and `agent_run` resource types).

### H2 2026 — Autonomous operations (Planned)

Event-driven agent triggers (incidents, drift detection, SLA breaches). Multi-agent orchestration for complex workflows. Advanced MCP Gateway with content inspection and policy enforcement.

---

## Get started

Harness Agents are available as open-source pipeline templates. When adding an agent to a pipeline, select it from the **Agents** section in the Step Palette. You can choose between System Agents and Custom Agents, and provide the required inputs at runtime or define them as fixed values in the pipeline:

- **Connector** — Which LLM connector to use (Anthropic, OpenAI, or Gemini)
- **Prompt** — An optional expanded prompt to customize the agent's behavior
- **Environment variables** — Any environment variables the agent requires
- **Secrets** — If the agent needs access to a protected resource

To explore the agent templates and try them in your Harness pipelines:

- [Agent Templates on GitHub](https://github.com/thisrohangupta/agents)
- [Interactive Architecture Overview](https://v0-harness-agents-marketing.vercel.app/#architecture)
