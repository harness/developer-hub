---
title: Core capabilities of Harness AI 
description: Harness AI brings intelligence to every stage of your software delivery lifecycle through three integrated capabilities.
sidebar_label: Overview
sidebar_position: 1
keywords:
  - harness ai
  - devops agent
  - worker agents
  - ai capabilities
  - ide integration
  - pipeline automation
  - core capabilities
tags:
  - harness-ai
  - automation
---

The Harness AI platform provides three integrated capability areas that work together to accelerate delivery, reduce manual work, and improve software quality. These areas include the <a href="#in-harness-ui">Harness UI</a>, <a href="#in-your-ide">your IDE</a>, and <a href="#in-your-pipelines">your pipelines</a>.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#in-harness-ui">Understand how AI works in the Harness UI</a>.
- <a href="#in-your-ide">Integrate Harness AI into your development environment</a>.
- <a href="#in-your-pipelines">Deploy autonomous AI agents in your pipelines</a>.
- <a href="#data-storage-and-privacy-policies">Review data privacy and security policies</a>.

---

## Before you begin

Before you use Harness AI core capabilities, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **Module access**: Access to the Harness modules where you want to use AI capabilities (CI, CD, IaCM, IDP, SCS, STO, DB DevOps, Chaos Engineering).
- **RBAC permissions**: Permission to create and manage pipelines, resources, and policies based on which AI capabilities you use. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.

---

## Core capability areas

Harness AI operates across three distinct environments where your teams work, providing contextual assistance and automation at each stage.

### In Harness UI

Work directly inside Harness to create, configure, and troubleshoot your pipelines and resources through natural language conversations.

The <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a> enables you to:
- Create and edit pipelines, stages, and steps across all Harness modules (CI, CD, IaCM, IDP, SCS, STO, DB DevOps, Chaos Engineering)
- Generate and integrate OPA Rego policies for compliance
- Analyze pipeline failures with AI-powered root cause analysis and automated fix recommendations
- Create and update Harness resources (Services, Environments, Connectors, Secrets) through conversational prompts
- Manage GitOps resources including applications, ApplicationSets, clusters, and repositories
- Generate natural language summaries of pipelines, executions, and dependent resources

Additional UI-based agents provide specialized capabilities:
- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/ci-agent" target="_blank">Troubleshoot builds and deployments</a> with AI-powered error analysis
- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/ccm-agent" target="_blank">Optimize cloud costs</a> by generating governance rules for asset management
- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/sto-agent" target="_blank">Fix security vulnerabilities</a> with enhanced AI-powered remediation recommendations

---

### In your IDE

Integrate Harness directly into your development environment to monitor pipelines, manage approvals, and access AI assistance without leaving your editor.

IDE integrations bring Harness context into your daily workflow:
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/vscode-extension" target="_blank">VS Code Extension</a>: Monitor pipelines, view logs, manage approvals, and use AI-assisted debugging in Visual Studio Code
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/cursor-plugin" target="_blank">Cursor Plugin</a>: Access Harness AI capabilities directly within the Cursor IDE
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/harness-gemini-extension" target="_blank">Gemini Extension</a>: Leverage Google Gemini AI integration for Harness workflows

These integrations eliminate context switching by bringing pipeline status, execution details, and AI-powered troubleshooting into the editor where you write code.

---

### In your pipelines

Deploy autonomous AI agents as pipeline steps to handle complex tasks like building, testing, reviewing code, and remediating security issues.

<a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents" target="_blank">Worker Agents</a> run inside your pipelines as containerized steps, performing multi-step workflows autonomously:
- Build and deploy applications with natural language instructions
- Review pull requests for code quality, security, and best practices
- Remediate security vulnerabilities identified in scans
- Generate and maintain documentation
- Run tests and validate deployments
- Perform infrastructure provisioning tasks

Worker Agents use configurable <a href="/docs/platform/harness-ai/model-connector" target="_blank">model connectors</a> to access Claude (Anthropic) or GPT (OpenAI) models, with support for both direct API access and AWS Bedrock endpoints.

The <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/release-agent" target="_blank">Release Agent</a> provides specialized capabilities for feature flag management, enabling you to deploy, target, and manage flags with AI assistance.

---

## How the capabilities work together

These three capability areas complement each other throughout the software delivery lifecycle.

1. **Development phase (In your IDE)**: Developers write code, monitor pipeline status, and manage approvals directly in their editor without context switching.

2. **Pipeline configuration (In Harness UI)**: DevOps engineers use the DevOps Agent to create pipelines, configure stages, generate policies, and troubleshoot failures through conversational AI.

3. **Execution phase (In your pipelines)**: Worker Agents run autonomously inside pipeline steps, performing complex multi-step tasks like code review, security remediation, and deployment validation.

The result is an end-to-end AI-assisted workflow where intelligence augments human work at every stage, from code commit to production deployment.

---

## Data storage and privacy policies

Harness AI is designed with strict data privacy and security principles. Harness AI Chat and the DevOps Agent use provider-hosted models through Harness-managed connections.

This section explains what data is used, how it is handled, and how it is discarded when you interact with the DevOps Agent or any AI-powered features in Harness. No configuration is necessary to ensure your privacy since Harness applies strict privacy defaults:

- Training is disabled across all AI integrations.
- Data is not persisted or exposed to model providers beyond inference.
- Fallback mechanisms are used only when necessary and are compliant with strict retention policies.
- Harness enforces account-scoped controls, RBAC, and auditability for Harness-managed AI features.

This section discusses these policies in greater detail. 

### Data privacy and subscription terms

Go to <a href="https://www.harness.io/legal/harness-ai-data-privacy" target="_blank">Harness AI Data Privacy</a> for more information on AI privacy practices. Go to <a href="https://www.harness.io/legal/subscription-terms-2025" target="_blank">Subscription Terms 2025</a> for more information on subscription terms.

### No data use

Harness AI processes real-time user input and relevant context (for example, pipeline metadata or error logs) to generate responses. This data is not stored, not logged, and never used for training by Harness or its model providers.

### Minimum data retention

Data discard behavior depends on the underlying AI provider.

| **Provider**           | **Model**        | **Discard Mechanism**              | **Retention** | **Used for Training?** |
| ---------------------- | ---------------- | ---------------------------------- | ------------- | ---------------------- |
| AWS Bedrock and Google Vertex AI | Claude Opus 4.6 | Immediately purged after inference | 0 days | No |
| OpenAI (fallback only) | GPT-4o | Excluded from retention under Zero Data Retention | 0 days | No |

### Failover and fallback scenarios

In rare scenarios, such as outage or capacity limits, Harness AI may fall back to OpenAI APIs. Harness is approved for OpenAI Zero Data Retention for this path.

- OpenAI does not retain prompt or response customer content after inference.
- Harness does not permit OpenAI to train on this data.
- Customer content retention is 0 days under Zero Data Retention.

The 0-day retention statement applies to the Harness-approved OpenAI fallback path. It does not apply to arbitrary OpenAI organizations, projects, endpoints, or features.

### No anonymization or tokenization required

No anonymization or tokenization is needed because:

- Data is not stored or used for analytics or training.
- All processing is done in ephemeral memory.
- Discard mechanisms are managed by the underlying model providers.

---

## FAQ

<details>
<summary>Is this available for SMP customers?</summary>

No, Harness AI is not available for SMP.

</details>

<details>
<summary>Who is the AI DevOps Agent available to?</summary>

Enterprise licenses, including Dev360, Service, SI, and Users, include AI DevOps at no additional charge. Any module with pipeline access is entitled to AI DevOps, not only CI or CD. This includes all Harness modules except CCM. The AI DevOps Agent scope follows the modules in your license. For example, a CI-only customer cannot create a CD stage.

</details>

<details>
<summary>Can I use my own model provider with Harness AI Chat?</summary>

No. Harness AI Chat and the DevOps Agent use Harness-managed model providers. Bring your own model is not supported for Harness AI Chat.

</details>

<details>
<summary>Where can I submit feedback?</summary>

Submit feedback by emailing <a href="mailto:support@harness.io" target="_blank">Harness Support</a> or through the UI by clicking **Help** in the bottom left corner, then **Give us feedback**.

</details>

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a>: Create pipelines and resources with AI in the Harness UI.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents" target="_blank">Worker Agents</a>: Run autonomous AI agents inside your pipeline steps.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-ide/vscode-extension" target="_blank">VS Code Extension</a>: Integrate Harness into your development environment.