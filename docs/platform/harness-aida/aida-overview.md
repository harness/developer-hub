---
title: Overview of Harness AI 
description: Learn about how AI improves your experience on the Harness platform.
sidebar_label: Overview
sidebar_position: 1
---

The Harness Platform leverages Harness AI to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.

## Enable AI

To enable module-specific AI features in your Harness account, do the following:

#### Navigation 1.0

1. Go to **Account Settings**.
2. Select **Account Resources**, then select **Default Settings**.
3. Select the **Harness AI** tile.
4. Enable the **Harness AI** setting.
5. Optional: Select **Allow Overrides** if you want to be able to enable/disable AI for individual projects.

#### Navigation 2.0

1. Go to **Account Settings**.
2. Under **General**, select **Default Settings**. 
3. Select the **Harness AI** tile.
4. Enable the **Harness AI** setting.
5. Optional: Select **Allow Overrides** if you want to be able to enable/disable Harness AI for individual projects.

For more information about navigation 2.0, go to [Harness navigation 2.0](https://developer.harness.io/docs/platform/get-started/harness-ui-overview/#harness-navigation-version-20).

## Harness AI features

| Module | Feature | Description | Availability |
|---|---|---|---|
| **Platform** | [Harness AI DevOps Agent](/docs/platform/harness-aida/ai-devops) | Agentic AI assistant that creates and manages pipelines, stages, steps, services, environments, connectors, and secrets through natural language prompts. | Generally available |
| Platform | [DevOps Agent - Error Analyzer](/docs/platform/harness-aida/ai-devops#error-analyzer) | AI-powered root cause analysis for pipeline failures with automated fix recommendations and YAML auto-repair. | Generally available |
| Platform | [DevOps Agent - Policy Generation](/docs/platform/harness-aida/ai-devops#policy-generation-and-integration) | Generate and integrate Open Policy Agent (OPA) Rego policies to meet compliance standards. | Generally available |
| Platform | [DevOps Agent - Pipeline Summarizer](/docs/platform/harness-aida/ai-devops#pipeline-summarizer) | AI-generated natural language summaries of pipelines, executions, and dependent resources. | Generally available |
| Platform | [DevOps Agent - Resource Creation](/docs/platform/harness-aida/harness-create-with-ai) | Create Services, Environments, Connectors, and Secrets through conversational AI prompts. | Generally available |
| Platform | Harness Support | Harness AI answers questions, suggests relevant documentation, and provides content recommendations when you create a support ticket. | Generally available |
| Platform | [Dashboard Intelligence](/docs/platform/dashboards/use-dashboard-intelligence-by-aida) | Craft customized dashboards with widget-level control through interactive AI prompts. | Generally available |
| Platform | [MCP Server](/docs/platform/harness-aida/harness-mcp-server) | Model Context Protocol server enabling integration with external AI tools like Cursor, Windsurf, Claude Desktop, and VS Code. | Beta |
| **Code Repository** | [PR Summaries & Code Review](/docs/platform/harness-aida/aida-code-pr) | AI-generated pull request descriptions with code change analysis, file-level summaries, and impact assessment to facilitate code review. | Generally available |
| Code Repository | Semantic Code Search | Natural language code search that understands semantic meaning across your entire codebase. | Generally available |
| **Code Agent** | [AI Code Agent](/docs/platform/harness-aida/code-agent) | IDE extension for intelligent code generation, real-time suggestions, automated test generation, contextual code explanations, and interactive chat. | Beta |
| Code Agent | [API Spec Generation](/docs/platform/harness-aida/code-agent#api-spec-generation) | Generate OpenAPI and Swagger API specifications from your codebase using AI. | Beta |
| **CI** | [Troubleshoot CI builds](/docs/continuous-integration/troubleshoot-ci/aida) | Resolve build failures with Harness AI DevOps Agent's root cause analysis. | Generally available |
| CI | Multi-Module Pipeline Creation | AI DevOps Agent creates CI, CD, IACM, IDP, SCS, STO, DB DevOps, and Chaos Engineering pipelines and stages. | Generally available |
| **CD** | Troubleshoot CD deployments | Resolve deployment failures with AI root cause analysis (RCA). | Generally available |
| **IACM** | IACM Pipeline Creation | AI DevOps Agent creates Infrastructure as Code Management pipelines for provisioning infrastructure with Terraform and other IaC tools. | Generally available |
| **CCM** | [Generate governance rules](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/recommendations#rules-generating-recommendations) | Generate rules for asset governance with detailed descriptions to optimize cloud spend. | Generally available |
| **STO** | [Security remediation](/docs/security-testing-orchestration/remediations/ai-based-remediations) | AI-powered vulnerability analysis and remediation recommendations to secure applications. | Generally available |
| **CE** | [ChaosGuard](/docs/chaos-engineering/guides/governance/governance-in-execution/) | Generate conditions for chaos experiments with ChaosGuard. | Generally available |
| **FME** | [Release Agent](/docs/platform/harness-aida/release-agent) | AI-powered release intelligence with documentation summarization and experiment result analysis. | Generally available |
| **SEI** | [AI Productivity Insights](/docs/software-engineering-insights/propelo-sei/ai-productivity-insights/aipi-overview) | AI-powered analysis of developer productivity, AI tool adoption impact, and engineering metrics including DORA and SPACE frameworks. | Generally available |
| **AI SRE** | AI Scribe Agent | Automated incident documentation with real-time communication monitoring across Slack, Zoom, and Microsoft Teams. | Generally available |
| **AI Test** | [AI Test Copilot](/docs/ai-test-automation/test-authoring/harness-ai-copilot/natural-language-tests) | Natural language test generation with intent-driven testing, automated step decomposition, and AI assertions. | Generally available |

## Harness AI terms and data privacy information

Visit the following Harness Legal pages for information about Harness AI data privacy and terms of use:

- [Harness AI Terms](https://www.harness.io/legal/aida-terms)
- [Harness AI Data Privacy](https://www.harness.io/legal/aida-privacy)

## FAQ

### What natural languages does Harness AI support?

Harness AI can generate in widely used languages such as English, Dutch, Spanish, French, German, Hindi, Korean, Mandarin and more.

### Does Harness AI support code translation between programming languages?

Yes. Harness AI provides advanced code translation capabilities powered by large language models (LLMs). You can easily convert logic from one programming language to another using natural language prompts—directly within your IDE. For example, you can say, *“Convert this Python script to Java”* or *“Refactor this C++ logic into Go.”*

Our system achieves high-fidelity translations through specialized models that understand language-specific idioms and framework equivalences.
Currently supported languages and versions include:

| Programming Language                | Version                                    |
| ----------------------------------- | ------------------------------------------ |
| Java                                | 8, 11, 17, 21                              |
| Python                              | 2.7, 3.6-3.12                              |
| JavaScript/TypeScript               | ES6+, TypeScript 4.x-5.x                   |
| C#                                  | .NET Framework 4.x, .NET Core 3.x, .NET 5+ |
| C/C++ (C11/C14/C17, C++11/14/17/20) | C11/C14/C17, C++11/14/17/20                |
| COBOL (IBM Enterprise COBOL)        | IBM Enterprise COBOL                       |
| FORTRAN (77, 90, 2003, 2008)        | 77, 90, 2003, 2008                         |
| Go (1.16+)                          | 1.16+                                      |
| Rust (2018, 2021 editions)          | 2018, 2021 editions                        |
| Ruby (2.x, 3.x)                     | 2.x, 3.x                                   |
| PHP (5.x, 7.x, 8.x)                 | 5.x, 7.x, 8.x                              |
| Kotlin (1.4+)                       | 1.4+                                       |
| Swift (5.x)                         | 5.x                                        |


### Does Harness support LLM-powered translation? 

Yes. Harness AI uses powerful LLMs to generate and adapt code like the following:
    - OpenAI GPT-4o
    - Google Gemini Flash
    - Claude 3.7 Sonnet

### Are domain-specific use cases supported?

Yes. Harness AI supports domain-specific tasks such as DevOps policy creation, YAML generation, and semantic validation using specialized language models. This ensures high relevance and accuracy for industry-specific needs.

### Does Harness AI support runtime awareness features?

Harness AI offers comprehensive runtime awareness capabilities that go far beyond code completion—empowering developers and DevOps teams to manage, automate, and optimize their software delivery processes with precision. We proudly support a comprehensive variety of runtime interaction features, fully integrated into the Harness platform and IDE-based workflows.

### Which application delivery features do you support?

Harness AI is designed to supercharge developer productivity by bringing intelligent automation directly into the IDE. It supports the following set of application delivery features that help teams move from idea to deployment faster, with less friction and higher confidence.

- In-line Autocomplete in IDE
- Multi-file Edits and Code Generation via Chat
- Agentic Task Completion (e.g., Refactoring)
- Build File Generation
- Non-code Artifact 
- Prompt-to-App (Create & Deploy from a Prompt)
- Harness AI’s open architecture allows teams to bring their own AI model, templates, tailored to internal frameworks or delivery pipelines.

### What agentic features does Harness support?

Harness AI natively supports event-based triggers like commits, bug creation, or test failures. These workflows can be configured through integrations with Git hooks, issue trackers, or CI/CD pipelines—allowing organizations to build automated assistants that react to defined events.

### Does Harness support multi-modal input for debugging to identify the source?

Harness AI supports comprehensive multi-modal debugging through:
- Stack traces: Advanced parsing and analysis of stack traces with context-aware identification of root causes, even in complex distributed systems. Our system correlates traces with codebase history to identify recently changed components that may have introduced issues.
- UI errors: Visual analysis of UI error screenshots, DOM structures, and console logs to pinpoint frontend issues. The system can identify responsive design breakages, JavaScript exceptions, and CSS conflicts.
