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

## What you will learn in this topic?

By the end of this topic, you will be able to:

- <a href="#enable-ai">Enable Harness AI in your account</a>.
- <a href="#harness-ai-features">Understand available AI features across Harness modules</a>.
- <a href="#ai-models">Identify AI models used by Harness AI</a>.
- <a href="#terms-and-data-privacy">Review data privacy and terms of use</a>.

---

## Before you begin

Before you enable Harness AI, ensure you have the following:

- **Harness account access:** Account-level permissions to enable Harness AI. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to create or access your account.

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
| **Platform** | [Harness Agents](/docs/platform/harness-ai/harness-agents) | Autonomous AI agents that run inside pipelines, building, deploying, testing, remediating, and optimizing the software delivery lifecycle from commit to production. | Generally available |
---

## AI models

Harness AI features use the following AI models:

- **DevOps Agent**: Claude Sonnet 4.6, hosted through AWS Bedrock and Google Vertex AI.
- **Support Agent**: Claude Sonnet 4.6, hosted through AWS Bedrock and Google Vertex AI.
- **OPA Agent**: Claude Sonnet 4.6, hosted through AWS Bedrock and Google Vertex AI.
- **Error Analyzer**: Claude Sonnet 4.6, hosted through AWS Bedrock and Google Vertex AI.
---

## Terms and data privacy

Visit the following Harness Legal pages for information about Harness AI data privacy and terms of use:

- <a href="https://www.harness.io/legal/aida-terms" target="_blank" rel="noopener noreferrer">Harness AI Terms</a>
- <a href="https://www.harness.io/legal/harness-ai-data-privacy" target="_blank" rel="noopener noreferrer">Harness AI Data Privacy</a>

---

## FAQ

import { FAQ } from '@site/src/components/AdaptiveAIContent';

<details>
<summary>What languages does Harness AI support?</summary>

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

- <a href="/docs/platform/harness-ai/devops-agent" target="_blank">DevOps Agent</a>: Create pipelines with natural language. 
- <a href="/docs/platform/harness-ai/harness-agents" target="_blank">Worker Agents</a>: Build autonomous AI that runs inside pipeline steps. 
- <a href="/docs/platform/harness-ai/harness-ai-rules" target="_blank">Harness AI Rules</a>: Tailor AI output to your enterprise standards.
