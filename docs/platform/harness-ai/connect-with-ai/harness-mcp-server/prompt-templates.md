---
title: Prompt templates
description: The 27 pre-built Harness MCP Server prompt templates for DevOps, FinOps, DevSecOps, and Harness Code workflows.
sidebar_label: Prompt Templates
sidebar_position: 8
keywords:
  - prompt templates
  - mcp prompts
  - workflows
  - dora metrics
  - cost optimization
tags:
  - harness-ai
  - mcp
---

The server includes 27 pre-built prompt templates for common workflows. Clients that support MCP prompts surface these as slash commands or a prompt picker, so you can start a multi-step workflow without composing tool calls by hand.

---

## DevOps

| Prompt | Description |
|--------|-------------|
| `build-deploy-app` | End-to-end CI/CD: scan a repo, generate a CI pipeline, create a CD pipeline, deploy with auto-retry |
| `debug-pipeline-failure` | Analyze a failed execution with stage and step breakdown, failure details, and root cause analysis |
| `create-pipeline` | Generate a new pipeline YAML from natural language requirements |
| `create-agent` | Create a custom AI agent definition with YAML spec, rules, skills, and MCP servers |
| `onboard-service` | Walk through onboarding a new service with environments and a deployment pipeline |
| `dora-metrics-review` | Review DORA metrics with Elite, High, Medium, and Low classification and improvement recommendations |
| `setup-gitops-application` | Guide through onboarding a GitOps application |
| `chaos-resilience-test` | Design a chaos experiment to test service resilience |
| `feature-flag-rollout` | Plan and execute a progressive feature flag rollout with safety gates |
| `migrate-pipeline-to-template` | Analyze a pipeline and extract reusable stage and step templates |
| `delegate-health-check` | Check delegate connectivity, health, and token status |
| `developer-portal-scorecard` | Review IDP scorecards and identify gaps |
| `pending-approvals` | Find executions waiting for approval and offer to approve or reject |

---

## FinOps

| Prompt | Description |
|--------|-------------|
| `optimize-costs` | Analyze cloud cost data, surface recommendations and anomalies |
| `cloud-cost-breakdown` | Deep-dive into cloud costs by service, environment, or cluster |
| `commitment-utilization-review` | Analyze reserved instance and savings plan utilization |
| `cost-anomaly-investigation` | Investigate cost anomalies and determine root cause |
| `rightsizing-recommendations` | Review and prioritize rightsizing recommendations |

---

## DevSecOps

| Prompt | Description |
|--------|-------------|
| `security-review` | Review security issues and suggest remediations by severity |
| `vulnerability-triage` | Triage vulnerabilities across pipelines and artifacts |
| `sbom-compliance-check` | Audit SBOM and compliance posture for artifacts |
| `supply-chain-audit` | End-to-end software supply chain security audit |
| `security-exemption-review` | Review pending security exemptions for batch decisions |
| `access-control-audit` | Audit user permissions and enforce least-privilege |

---

## Harness Code

| Prompt | Description |
|--------|-------------|
| `code-review` | Review a pull request with structured feedback on bugs, security, performance, and style |
| `pr-summary` | Auto-generate a PR title and description from commit history and diff |
| `branch-cleanup` | Analyze branches and recommend stale or merged branches to delete |

---

## Related articles

- [Tools reference](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/tools-reference): Review the tools these prompts orchestrate.
- [Approvals and safety](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/approvals-and-safety): Understand what happens when a prompt reaches a write operation.
- [Configure your AI client](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/configure-ai-clients): Confirm your client supports MCP prompts.
