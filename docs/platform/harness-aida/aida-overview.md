---
title: Overview of Harness AI 
description: Learn about how AI improves your experience on the Harness platform.
sidebar_position: 2
---

The Harness Platform leverages Harness AI to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.

## Enable AI

To enable module-specific AI features in your Harness account, do the following:

#### Navigation 1.0

1. Go to **Account Settings**.
2. Select **Account Resources**, then select **Default Settings**.
3. Select the **Harness AI ** tile.
4. Enable the **Harness AI ** setting.
5. Optional: Select **Allow Overrides** if you want to be able to enable/disable AI for individual projects.

#### Navigation 2.0

1. Go to **Account Settings**.
2. Under **General**, select **Default Settings**. 
3. Select the **Harness AI** tile.
4. Enable the **Harness AI ** setting.
5. Optional: Select **Allow Overrides** if you want to be able to enable/disable Harness AI for individual projects.

For more information about navigation 2.0, go to [Harness navigation 2.0](https://developer.harness.io/docs/platform/get-started/harness-ui-overview/#harness-navigation-version-20).

## Harness AI features

| Module   | Feature                                                                                         | Description                                                                                                                                                                                                               | Availability        |
|----------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| Platform | Harness Support                                                                                 | Harness AI can answer questions and suggest relevant documentation to help you browse and discover Harness features and documentation.                                                                                          | Generally available |
| Platform | Harness Support                                                                                 | Harness AI provides content recommendations when you create a support ticket.                                                                                                                                                   | Generally available |
| Platform | [Dashboard Intelligence](/docs/platform/dashboards/use-dashboard-intelligence-by-aida)          | Harness AI empowers you to craft customized dashboards with widget-level control through interactive prompts.                                                                                                                   | Generally available |
| Platform | [Code Generation](/docs/platform/harness-aida/code-agent)                                    | With the Harness AI Code Agent IDE extension, you can increase productivity by generating multi-line code updates through comments in your IDE, eliminating the need to manually write common functions or look up unknown syntax. | Beta         |
| CCM      | [Generate governance rules](/docs/category/harness-aida-for-asset-governance)                   | Generate rules for asset governance accompanied with detailed descriptions to optimize your cloud spend.                                                                                                                  | Generally available |
| CD       | Troubleshoot CD deployments                                                                     | Resolve your deployment failures with AI's root cause analysis (RCA).                                                                                                                                                   | Generally available |
| CD       | Policy As Code Assistant                                                                        | Generate and integrate Open Policy Agent (OPA) Rego policies to meet your compliance standards with the Harness AI DevOps Agent.                                                                                                                           | Generally available         |
| CE       | [ChaosGuard](/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/)        | Generate conditions for your chaos experiments with ChaosGuard.                                                                                                                                                           | Generally available |
| CODE     | [Semantic Search](/docs/code-repository/work-in-repos/semantic-search)                          | Search code repositories to provide accurate and context-aware results in Harness Code.                                                                                                                                   | Generally available |
| CODE     | [Pull Request Summaries](/docs/code-repository/pull-requests/aida-code-pr)                      | Automatically generate comprehensive and informative PR descriptions.                                                                                                                                                     | Generally available |
| CI       | [Troubleshoot CI builds](/docs/continuous-integration/troubleshoot-ci/aida)                     | Resolve your build failures with Harness AI DevOps Agent's RCA.                                                                                                                                                                              | Generally available |
| STO      | [Security remediation](/docs/security-testing-orchestration/remediations/ai-based-remediations) | Leverage AI to quickly analyze vulnerabilities and secure applications.                                                                                                                                                 | Generally available |

## Harness AI terms and data privacy information

Visit the following Harness Legal pages for information about Harness AI data privacy and terms of use:

- [Harness AI Terms](https://www.harness.io/legal/aida-terms)
- [Harness AI Data Privacy](https://www.harness.io/legal/aida-privacy)

## FAQ

### What natural languages does Harness AI support?

Harness AI can generate in widely used languages such as English, Dutch, Spanish, French, German, Hindi, Korean, Mandarin and more.

### Does Harness AI support code translation between programming languages?

Yes. Harness AI provides advanced code translation capabilities powered by large language models (LLMs). You can easily convert logic from one programming language to another using natural language prompts—directly within your IDE. For example, you can say, *“Convert this Python script to Java”* or *“Refactor this C++ logic into Go.”*

### Does Harness support LLM-powered translation? 

Yes. Harness AI uses powerful LLMs like GPT-4 and Gemini Flash to generate and adapt code.

### Are domain-specific use cases supported?

Yes. Harness AI supports domain-specific tasks such as DevOps policy creation, YAML generation, and semantic validation using specialized language models. This ensures high relevance and accuracy for industry-specific needs.

### Which runtime awareness features are supported?

Yes, we support all of them. 
Harness AI offers comprehensive runtime awareness capabilities that go far beyond code completion—empowering developers and DevOps teams to manage, automate, and optimize their software delivery processes with precision. We proudly support all of the listed runtime interaction features, fully integrated into the Harness platform and IDE-based workflows.

### Which of the following application delivery features do you support?

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

### How effectively does Harness AI support the transformation of code between different programming languages?

Harness AI excels at code transformation with semantic preservation across multiple language paradigms. Our system achieves high-fidelity translations through specialized models that understand language-specific idioms and framework equivalences.
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

### Does Harness support multi-modal input for debugging to identify the source?

Harness AI supports comprehensive multi-modal debugging through:
- Stack traces: Advanced parsing and analysis of stack traces with context-aware identification of root causes, even in complex distributed systems. Our system correlates traces with codebase history to identify recently changed components that may have introduced issues.
- UI errors: Visual analysis of UI error screenshots, DOM structures, and console logs to pinpoint frontend issues. The system can identify responsive design breakages, JavaScript exceptions, and CSS conflicts.
