---
title: Skill Catalog
description: Browse the Harness Skills catalog, grouped by workflow mode, to find the right skill for creating, running, governing, or analyzing Harness resources.
keywords:
  - harness skills
  - skill catalog
  - workflow modes
  - create pipeline
  - manage resources
  - governance
  - cost analysis
tags:
  - ai
  - automation
sidebar_label: Skill catalog
sidebar_position: 2
---

Harness Skills follow a shared operating model irrespective of the resource type they target, and group into workflow modes so you can quickly find the right skill for a task. This topic describes every available skill by category.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Follow the operating model](#operating-model) that skills use to establish scope and verify dependencies.
- [Identify the right workflow mode](#workflow-modes) for a task.
- [Find a specific skill](#available-skills) in the full catalog.

---

## Before you begin

Before you invoke a skill from this catalog, ensure you have the following:

- **AI coding assistant**: Claude Code, Cursor, GitHub Copilot, OpenAI Codex, or Windsurf, configured to load skill instructions. For more information, see <a href="/docs/platform/harness-ai/govern-ai-output/overview#set-up-skills" target="_blank">Set up skills</a>.
- **Harness MCP Server**: A configured <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">MCP server</a> for tool execution.
- **Harness API key**: An <a href="/docs/platform/automation/api/add-and-manage-api-keys/" target="_blank">API key</a> to authenticate with the Harness platform.

---

## Operating model

The best Harness skills follow the same flow of control even when they target different resource types. This consistency keeps skill behavior predictable regardless of the resource you are working with.

1. **Establish scope first**: Confirm account, org, and project context before listing, creating, updating, or deleting resources.
2. **Verify dependencies before generating dependents**: Confirm that every connector, secret, environment, infrastructure definition, and template exists before a generated resource references it.
3. **Discover schema before writing payloads**: Use `harness_describe` and API validation feedback instead of guessing field names or payload shape.

---

## Workflow modes

Skills are grouped into four workflow modes based on the type of task you are performing. Use this table to identify which skills apply to your current task.

| Workflow mode | Representative skills | When to use |
|---------------|-----------------------|-------------|
| **Create and scaffold** | `/create-pipeline`, `/create-service`, `/create-connector`, `/create-template` | Define or generate new Harness resources and their YAML or MCP payloads. |
| **Run and debug** | `/run-pipeline`, `/debug-pipeline`, `/migrate-pipeline`, `/manage-delegates` | Execute, diagnose, or repair behavior for resources that already exist. |
| **Govern and secure** | `/manage-roles`, `/manage-users`, `/create-policy`, `/security-report`, `/audit-report` | Handle RBAC, policy, compliance, or security workflows. |
| **Analyze and report** | `/dora-metrics`, `/analyze-costs`, `/scorecard-review`, `/template-usage` | Generate structured reports, recommendations, or adoption analysis. |

---

## Available skills

The skills repository organizes skills into five categories based on the platform area they cover.

### Pipeline and template creation

Use the following skills to generate the pipelines, templates, triggers, and agents that define how your software gets built and delivered.

| Skill | Description |
|-------|-------------|
| `/create-pipeline` | Generate v0 pipeline YAML (CI, CD, approvals, matrix strategies). |
| `/create-pipeline-v1` | Generate v1 simplified pipeline YAML (alpha, internal testing only). |
| `/create-template` | Create reusable step, stage, pipeline, or step group templates. |
| `/create-trigger` | Create webhook, scheduled, and artifact triggers. |
| `/create-agent` | Create and update Harness AI agent instances for automated code and infrastructure tasks. |
| `/create-agent-template` | Create AI-powered agent templates (alpha, internal testing only). |

### Resource management

Use the following skills to create and manage the resources your pipelines depend on, from services and connectors to secrets, registries, and workspaces.

| Skill | Description |
|-------|-------------|
| `/create-service` | Create service definitions (Kubernetes, Helm, ECS, Lambda). |
| `/create-environment` | Create environment definitions with overrides. |
| `/create-infrastructure` | Create infrastructure definitions. |
| `/create-connector` | Create connectors (Git, cloud, registries, clusters). |
| `/create-secret` | Create secrets (text, file, SSH, WinRM). |
| `/manage-artifacts` | Manage Harness Artifact Registry: Docker, Helm, Maven, and generic registries. |
| `/manage-iacm` | Manage IaCM Terraform workspaces, state files, and drift detection. |
| `/manage-idp` | Manage IDP service catalog templates, workflows, and scorecards. |
| `/manage-supply-chain` | Manage Software Supply Chain Assurance, including SBOM generation and policy enforcement. |
| `/manage-cde` | Manage Cloud Development Environments (CDE) for on-demand dev workspaces. |

### Access control and feature flags

Use the following skills to control who can do what in your account, and to manage the feature flags that gate your releases.

| Skill | Description |
|-------|-------------|
| `/manage-users` | Manage users, user groups, and service accounts. |
| `/manage-roles` | Manage role assignments and RBAC. |
| `/manage-feature-flags` | Create, list, toggle, and delete feature flags. |

### Operate and debug

Use the following skills on resources that already exist, whether you are running a pipeline, diagnosing a failure, or checking that a deployment is safe to ship.

| Skill | Description |
|-------|-------------|
| `/run-pipeline` | Execute pipelines, monitor progress, handle approvals. |
| `/debug-pipeline` | Analyze execution failures, diagnose root causes. |
| `/optimize-pipeline` | Optimize CI/CD pipeline performance: parallel execution, caching, resource tuning. |
| `/migrate-pipeline` | Convert pipelines from v0 to v1 format. |
| `/deployment-readiness` | Pre-deployment readiness checks with go or no-go assessments. |
| `/incident-response` | Correlate incidents with recent deployments and analyze impact. |
| `/pr-analysis` | Analyze pull request impact on Harness pipelines. |
| `/template-usage` | Track template dependencies and adoption. |
| `/manage-delegates` | Monitor delegate health and manage tokens. |

### Platform intelligence

Use the following skills to get reports and analysis across cost, security, reliability, and engineering performance, spanning modules such as CCM, STO, IDP, and AIDI.

| Skill | Description |
|-------|-------------|
| `/analyze-costs` | Cloud cost analysis and optimization (CCM). |
| `/security-report` | Vulnerability reports, SBOMs, compliance (SCS/STO). |
| `/dora-metrics` | DORA metrics and engineering performance (AIDI). |
| `/gitops-status` | GitOps application health and sync status. |
| `/chaos-experiment` | Create and run chaos experiments. |
| `/scorecard-review` | Service maturity scorecards (IDP). |
| `/audit-report` | Audit trails and compliance reports. |
| `/create-policy` | Create OPA governance policies for supply chain security. |
| `/ai-operations` | Configure Harness AI-powered operations (AIDA), covering predictive failure analysis and automation. |
| `/manage-slos` | Manage Service Reliability: SLOs, SLIs, and error budgets. |
| `/sei-analytics` | Advanced engineering analytics through AI DLC Insights (AIDI). |

---

## Related articles

- <a href="/docs/platform/harness-ai/govern-ai-output/overview" target="_blank">Harness Skills overview</a>: Prerequisites and editor setup.
- <a href="/docs/platform/harness-ai/govern-ai-output/workflow-and-references" target="_blank">Workflows and reference</a>: Chain skills into end-to-end workflows and review the skill file structure.