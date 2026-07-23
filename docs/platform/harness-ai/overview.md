---
title: Overview of Harness AI 
description: Learn about how AI improves your experience on the Harness platform.
sidebar_label: Overview
sidebar_position: 1
keywords:
  - harness ai
  - ai automation
  - devops ai
  - worker agents
  - ai pipelines
  - model context protocol
tags:
  - harness-ai
redirect_from:
  - /docs/platform/harness-aida/aida-overview
---


Harness AI brings intelligence to every stage of the software delivery lifecycle. 
The Harness Platform leverages Harness AI by combining AI capabilities with DevOps tools, features, and practices to accelerate the software delivery lifecycle.
Create <a href="/docs/continuous-delivery/getting-started/#step-1-create-your-pipeline" target="_blank">pipelines</a> with natural language, troubleshoot failures with root cause analysis, optimize cloud costs with AI-powered governance, and automate code review with autonomous agents running inside your pipelines.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#enable-ai">Enable Harness AI in your account</a>.
- <a href="#harness-ai-features">Understand available AI features across Harness modules</a>.
- <a href="#ai-models">Identify AI models used by Harness AI</a>.
- <a href="#terms-and-data-privacy">Review data privacy and terms of use</a>.

---

## Before you begin

Before you enable Harness AI, ensure you have the following:

- **Harness account access**: Account-level permissions to enable Harness AI. Go to <a href="/docs/platform/get-started/onboarding-guide" target="_blank">Getting started with Harness Platform</a> for more information on creating or accessing your account.
- **Account Settings permissions**: Permission to modify account settings to enable AI features.

---

## Enable AI

Enable Harness AI to use AI-powered features across all Harness modules.

Go to <a href="/docs/platform/get-started/harness-ui-overview/#harness-navigation-version-20" target="_blank">Harness navigation 2.0</a> for more information on the updated navigation experience.


1. Navigate to **Account Settings**.
2. Under **General**, select **Default Settings**. 
3. Select the **Harness AI** tile.
4. Enable the **Harness AI** setting.
5. Optional: Select **Allow Overrides** to let organizations and projects enable or disable Harness AI independently.


---

## Harness AI features

Harness AI provides capabilities across platform, code repository, and module-specific features. The following table lists all available AI features organized by module.

| Module | Feature | Description | Availability |
|---|---|---|---|
| **Platform** | <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Harness Agents</a> | Autonomous AI agents that run inside pipelines, building, deploying, testing, remediating, and optimizing the software delivery lifecycle from commit to production. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a> | Agentic AI assistant that creates and manages pipelines, stages, steps, services, environments, connectors, and secrets through natural language prompts. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#error-analyzer" target="_blank">DevOps Agent (Error Analyzer)</a> | AI-powered root cause analysis for pipeline failures with automated fix recommendations and YAML auto-repair. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#policy-generation-and-integration" target="_blank">DevOps Agent (Policy Generation)</a> | Generate and integrate <a href="/docs/platform/governance/policy-as-code/harness-governance-overview" target="_blank">Open Policy Agent</a> (OPA) Rego policies to meet compliance standards. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#pipeline-summarizer" target="_blank">DevOps Agent (Pipeline Summarizer)</a> | AI-generated natural language summaries of pipelines, executions, and dependent resources. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/harness-create-with-ai/harness-create-with-ai" target="_blank">DevOps Agent (Resource Creation)</a> | Create Services, Environments, Connectors, and Secrets through conversational AI prompts. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/harness-ai-rules" target="_blank">Harness AI Rules</a> | Configure account, organization, project, and personal rules that guide Harness AI output for pipelines, builds, security, cost, code, and other SDLC workflows. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/harness-ai-memories" target="_blank">Harness AI Memories</a> | Personalize Harness AI responses with private user-level context captured from chat interactions. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/support-agent" target="_blank">Support Agent</a> | AI-powered first line of support that answers product and documentation questions with contextual examples from the knowledge base. | Generally available |
| **Platform** | <a href="/docs/platform/dashboards/use-dashboard-intelligence-by-ai" target="_blank">Dashboard Intelligence</a> | Craft customized dashboards with widget-level control through interactive AI prompts. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">MCP Server</a> | <a href="https://modelcontextprotocol.io/introduction" target="_blank">Model Context Protocol</a> (MCP) server with 11 tools and 139 resource types enabling integration with external AI tools like Cursor, Windsurf, Claude Desktop, and VS Code. | Generally available |
| **Platform** | <a href="/docs/platform/harness-cli/harness-cli-overview" target="_blank">Harness CLI 3.0</a> | Harness Unified CLI is the officially supported command-line tool for the Harness platform. It replaces module-specific CLIs with a single interface. Built for secure DevSecOps, it provides a consistent workflow for developers and reliable execution for AI agents. | Public Beta |
| **Code Repository** | <a href="/docs/platform/harness-ai/code-pr" target="_blank">PR Summaries & Code Review</a> | AI-generated pull request descriptions with code change analysis, file-level summaries, and impact assessment to facilitate code review. | Generally available |
| **Code Repository** | <a href="/docs/platform/harness-ai/code-search" target="_blank">Semantic Code Search</a> | Natural language code search that understands semantic meaning across your entire codebase. | Generally available |
| **Platform** | <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/vscode-extension" target="_blank">VS Code Extension</a> | Monitor Harness pipelines, view logs, manage approvals, and use AI-assisted debugging in Visual Studio Code. | Generally available |
| **CI** | <a href="/docs/continuous-integration/troubleshoot-ci/ai" target="_blank">Troubleshoot CI builds</a> | Resolve build failures with Harness AI DevOps Agent root cause analysis. | Generally available |
| **CI** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#multi-module-pipeline-creation" target="_blank">DevOps Agent (Multi-Module Pipeline Creation)</a> | AI DevOps Agent creates CI, CD, IaCM, IDP, SCS, STO, DB DevOps, and Chaos Engineering pipelines and stages. | Generally available |
| **CD** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/ci-agent" target="_blank">Troubleshoot CD deployments</a> | Resolve deployment failures with AI root cause analysis. | Generally available |
| **CD** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#gitops-operations" target="_blank">DevOps Agent (GitOps Operations)</a> | AI-powered management of 13 <a href="/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics" target="_blank">GitOps</a> resource types including applications, ApplicationSets, agents, clusters, and repositories. Query status, sync, inspect events and logs, and manage resources through natural language. | Generally available |
| **IaCM** | <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#multi-module-pipeline-creation" target="_blank">DevOps Agent (IaCM Pipeline Creation)</a> | AI DevOps Agent creates <a href="/docs/infrastructure-as-code-management" target="_blank">Infrastructure as Code Management</a> (IaCM) pipelines for provisioning infrastructure with Terraform and other IaC tools. | Generally available |
| **CCM** | <a href="/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/recommendations#rules-generating-recommendations" target="_blank">Generate governance rules</a> | Generate rules for asset governance with detailed descriptions to optimize cloud spend. | Generally available |
| **STO** | <a href="/docs/security-testing-orchestration/remediations/ai-based-remediations" target="_blank">Security remediation</a> | AI-powered vulnerability analysis and remediation recommendations to secure applications. | Generally available |
| **SCS** | <a href="/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation" target="_blank">Vulnerability Remediation</a> | AI-powered dependency analysis of repository-generated <a href="/docs/software-supply-chain-assurance/sbom/generate-sbom" target="_blank">SBOMs</a> with actionable remediation recommendations to secure applications. | Generally available |
| **CE** | <a href="/docs/chaos-engineering/guides/governance/governance-in-execution/" target="_blank">ChaosGuard</a> | Generate conditions for chaos experiments with ChaosGuard. | Generally available |
| **FME** | <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/release-agent" target="_blank">Release Agent</a> | AI-powered release intelligence with documentation summarization and experiment result analysis. | Generally available |
| **AIDI** | <a href="/docs/software-engineering-insights/harness-sei/sei-overview" target="_blank">AI DLC Insights</a> | AI-powered analysis of developer productivity, AI tool adoption impact, and engineering metrics including <a href="/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics" target="_blank">DORA</a> and SPACE frameworks. | Generally available |
| **AI SRE** | <a href="/docs/ai-sre/ai-agent/" target="_blank">AI Scribe Agent</a> | Automated incident documentation with real-time communication monitoring across Slack, Zoom, and Microsoft Teams. | Generally available |
| **AI Test Automation** | <a href="/docs/ai-test-automation/test-authoring/harness-ai-copilot/natural-language-tests" target="_blank">AI Test Copilot</a> | Natural language test generation with intent-driven testing, automated step decomposition, and AI assertions. | Generally available |

---

## AI models

Harness AI features use the following AI models:

- **DevOps Agent**: Claude Opus 4.6, hosted through AWS Bedrock and Google Vertex AI.
- **Support Agent**: Claude Opus 4.6, hosted through AWS Bedrock and Google Vertex AI.
- **OPA Agent**: Claude Opus 4.6, hosted through AWS Bedrock and Google Vertex AI.
- **Error Analyzer**: Claude Opus 4.6, hosted through AWS Bedrock and Google Vertex AI.

---

## Terms and data privacy

Visit the following Harness Legal pages for information about Harness AI data privacy and terms of use:

- <a href="https://www.harness.io/legal/aida-terms" target="_blank">Harness AI Terms</a>
- <a href="https://www.harness.io/legal/harness-ai-data-privacy" target="_blank">Harness AI Data Privacy</a>

---

## FAQ

<details>
<summary>What natural languages does Harness AI support?</summary>

Harness AI can generate in widely used languages including English, Dutch, Spanish, French, German, Hindi, Korean, and Mandarin.

</details>

<details>
<summary>Does Harness AI support code translation between programming languages?</summary>

Yes. Harness AI provides code translation capabilities powered by large language models (LLMs). You can convert logic from one programming language to another using natural language prompts directly within your IDE.

**Example prompts:**
- "Convert this Python script to Java"
- "Refactor this C++ logic into Go"

The system achieves high-fidelity translations through specialized models that understand language-specific idioms and framework equivalences.

**Supported languages and versions:**

| Programming Language | Version |
|---------------------|---------|
| Java | 8, 11, 17, 21 |
| Python | 2.7, 3.6-3.12 |
| JavaScript/TypeScript | ES6+, TypeScript 4.x-5.x |
| C# | .NET Framework 4.x, .NET Core 3.x, .NET 5+ |
| C/C++ | C11/C14/C17, C++11/14/17/20 |
| COBOL | IBM Enterprise COBOL |
| FORTRAN | 77, 90, 2003, 2008 |
| Go | 1.16+ |
| Rust | 2018, 2021 editions |
| Ruby | 2.x, 3.x |
| PHP | 5.x, 7.x, 8.x |
| Kotlin | 1.4+ |
| Swift | 5.x |

</details>

<details>
<summary>Does Harness support LLM-powered translation?</summary>

Yes. Harness AI uses the following large language models to generate and adapt code:
- OpenAI GPT-4o
- Google Gemini Flash
- Claude Opus 4.5

</details>

<details>
<summary>Are domain-specific use cases supported?</summary>

Yes. Harness AI supports domain-specific tasks such as DevOps policy creation, YAML generation, and semantic validation using specialized language models. This ensures high relevance and accuracy for industry-specific needs.

</details>

<details>
<summary>Does Harness AI support runtime awareness features?</summary>

Harness AI offers comprehensive runtime awareness capabilities that empower developers and DevOps teams to manage, automate, and optimize software delivery processes with precision. Runtime interaction features are fully integrated into the Harness platform and IDE-based workflows.

</details>

<details>
<summary>Which application delivery features does Harness AI support?</summary>

Harness AI supports the following application delivery features:

- In-line autocomplete in IDE
- Multi-file edits and code generation via chat
- Agentic task completion (for example, refactoring)
- Build file generation
- Non-code artifact generation
- Prompt-to-app (create and deploy from a prompt)

Harness AI uses an open architecture that allows teams to bring their own AI model and templates tailored to internal frameworks or delivery pipelines.

</details>

<details>
<summary>What agentic features does Harness support?</summary>

Harness AI natively supports event-based triggers like commits, bug creation, or test failures. These workflows can be configured through integrations with Git hooks, issue trackers, or CI/CD pipelines, allowing organizations to build automated assistants that react to defined events.

</details>

<details>
<summary>Does Harness support multi-modal input for debugging?</summary>

Harness AI supports comprehensive multi-modal debugging:

- **Stack traces**: Advanced parsing and analysis of stack traces with context-aware identification of root causes, even in complex distributed systems. The system correlates traces with codebase history to identify recently changed components that may have introduced issues.
- **UI errors**: Visual analysis of UI error screenshots, DOM structures, and console logs to pinpoint frontend issues. The system can identify responsive design breakages, JavaScript exceptions, and CSS conflicts.

</details>

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a>: Create pipelines with natural language. 
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a>: Build autonomous AI that runs inside pipeline steps. 
- <a href="/docs/platform/harness-ai/harness-ai-rules" target="_blank">Harness AI Rules</a>: Tailor AI output to your enterprise standards.
