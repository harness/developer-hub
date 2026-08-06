---
title: Harness AI Support Agent
description: Harness AI Support Agent provides instant answers to product and documentation questions.
sidebar_label: Support Agent
sidebar_position: 9
keywords:
  - support agent
  - harness ai
  - documentation search
  - troubleshooting
  - natural language queries
  - session context
  - code examples
tags:
  - harness-ai
  - support-agent
  - troubleshooting
redirect_from:
  - /docs/platform/harness-aida/support-agent
  - /docs/platform/harness-ai/support-agent
---

The Harness AI Support Agent is your first line of support inside the Harness platform. It draws on Harness documentation and knowledge base content to answer product questions, offer troubleshooting guidance, and pull contextual examples straight from the official docs, so you get an answer in seconds instead of filing a ticket and waiting.

:::note AI model
The Support Agent uses **OpenAI GPT-4o** to process your questions and retrieve relevant documentation.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Enable and access the Support Agent](#installation-and-setup).
- [Ask questions and retrieve documentation examples](#use-the-support-agent).
- [Understand what the agent can search and remember](#features).
- [Write questions that return accurate answers](#best-practices).
- [Recognize what the agent cannot do](#limitations).

---

## Before you begin

Before you use the Support Agent, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI overview</a> for more information on activating Harness AI.
- **Account settings access**: Permission to view and edit default settings if you enable Harness AI yourself. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.
- **License type**: No specific license tier. The Support Agent is available to all Harness users with Harness AI enabled, regardless of license type.

---

## Installation and setup

The Support Agent ships as part of the Harness AI feature set, so there is nothing separate to install. You only need to turn Harness AI on.

1. Navigate to **Account Settings** in the left navigation.
2. Under **General**, select <a href="/docs/platform/settings/default-settings" target="_blank">Default Settings</a>.
3. Find **Harness AI** and enable the **Harness AI** setting.
4. Optional: Enable **Allow Overrides** to let individual **Organizations** and **Projects** override this setting.

Once enabled, the Support Agent is accessible through the Harness AI assistant interface.

---

## Use the Support Agent

Access the Support Agent through the Harness AI chat interface. The agent recognizes documentation-related questions on its own and retrieves the relevant content, so you do not need to route your question anywhere special.

### Ask questions

Ask the Support Agent anything about Harness products, features, or configurations. The agent searches the documentation knowledge base and returns the relevant information.

**Example questions:**

- "How do I create a Kubernetes connector?"
- "What are the required permissions for a GitHub connector?"
- "Explain the difference between rolling and canary deployments"
- "How do I configure failure strategies in a pipeline?"
- "What environment variables are available in CI build steps?"

### Get documentation examples

The Support Agent retrieves specific examples from the documentation, including YAML configurations, API examples, and step-by-step guides.

**Example prompts:**

- "Show me an example of a Kubernetes deployment manifest"
- "Give me a sample pipeline YAML for a CI/CD workflow"
- "What does a Terraform connector configuration look like?"
- "Show me how to configure an approval stage"

### Ask contextual follow-up questions

The Support Agent keeps track of your conversation within a chat session, so you can ask follow-up questions without restating what you already told it.

**Example conversation:**

1. **You:** "How do I set up a Docker connector?"
2. **Support Agent:** *Provides documentation on Docker connector setup*
3. **You:** "What permissions does it need?"
4. **Support Agent:** *Provides permissions information specific to Docker connectors, understanding the context from the previous question*

### Get troubleshooting guidance

When you hit an error, the Support Agent helps you find the troubleshooting documentation that covers it.

**Example prompts:**

- "I'm getting a 'delegate not found' error. How do I fix this?"
- "My pipeline is failing with a connection timeout. What should I check?"
- "How do I debug a failed Kubernetes deployment?"
- "What are common causes for artifact download failures?"

---

## Features

The Support Agent combines natural language understanding with full documentation coverage and session memory. The following table summarizes what each capability gives you.

| **Feature** | **Description** |
|-------------|-----------------|
| **Natural language queries** | Ask questions in plain English and receive clear, concise answers. |
| **Documentation search** | Searches across all Harness documentation to find relevant content. |
| **Code examples** | Retrieves YAML, JSON, and code examples directly from documentation. |
| **Session context** | Maintains conversation history for contextual follow-up questions. |
| **Multi-module coverage** | Answers questions across all Harness modules (CI, CD, CCM, STO, and others). |

### Natural language queries

The Support Agent interprets your intent rather than matching keywords, so you do not need to know the exact terminology to find the right page.

**How it works:**

1. You ask a question in natural language.
2. The agent analyzes your question to understand the intent.
3. The agent searches the documentation knowledge base.
4. Relevant sections are retrieved and synthesized into a response.

The Support Agent supports the same languages as Harness AI, including English, Spanish, French, German, Hindi, Korean, Mandarin, Dutch and more. Go to <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI overview</a> for more information on supported languages.

### Documentation search

The Support Agent has access to the complete Harness documentation, including:

- Platform documentation
- Module-specific guides (CI, CD, CCM, STO, CE, FF, SRM, IDP, IACM)
- API references
- Tutorials and quickstarts
- Troubleshooting guides
- Best practices and reference architectures

The Support Agent pulls from the latest published Harness documentation. Documentation updates are reflected in Support Agent responses after they are published.

### Code examples

When documentation includes code samples, the Support Agent retrieves and displays them in your chat. This includes:

- Pipeline YAML configurations
- Connector definitions
- Service and environment manifests
- API request and response examples
- Shell commands and scripts
- Terraform and infrastructure code

### Session context

The Support Agent uses session memory to maintain context throughout your conversation. This enables:

- **Follow-up questions**: Ask clarifying questions without restating context.
- **Progressive learning**: Build understanding through a series of related questions.
- **Refinement**: Ask the agent to elaborate or provide more specific examples.
- **Comparative questions**: Ask how concepts relate to previously discussed topics.

Session context lasts for the duration of your chat session. Starting a new session clears the context, and each new session starts fresh without memory of previous conversations.

---

## Best practices

How you phrase a question has a direct effect on how useful the answer is. The following guidance helps you get precise responses instead of general overviews.

### Write effective questions

To get the most accurate responses from the Support Agent:

- **Be specific**: Include relevant details like module names, resource types, or error messages.
- **Provide context**: Mention what you are trying to accomplish.
- **Use follow-ups**: Start broad and narrow down with follow-up questions.
- **Include error messages**: When troubleshooting, include the exact error text.

**Good example:**
> "How do I configure a GitHub connector with a personal access token for a private repository?"

**Less effective example:**
> "How do connectors work?"

### Use session context effectively

Take advantage of session memory to have productive conversations:

1. **Start with the main topic**: Ask your primary question first.
2. **Build incrementally**: Ask follow-up questions that build on previous answers.
3. **Reference previous answers**: Use phrases like "In that example..." or "For that connector...".
4. **Request elaboration**: Ask "Can you explain more about..." when you need details.

### Choose between the Support Agent and the DevOps Agent

The two agents solve different problems. Use the Support Agent to learn and diagnose, and the <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a> to build and change things.

| **Use Support Agent** | **Use DevOps Agent** |
|-----------------------|----------------------|
| Learning about Harness features | Creating pipelines, stages, or steps |
| Finding documentation and examples | Modifying existing configurations |
| Troubleshooting guidance | Generating services, environments, or connectors |
| Understanding best practices | Automating DevOps tasks |
| Exploring configuration options | Building and editing resources |

---

## Data privacy

The Support Agent follows the same data privacy policies as all Harness AI features:

- **No training on your data**: Your questions are not used to train AI models.
- **Ephemeral processing**: Questions are processed in real time and not stored.
- **Documentation-only responses**: Answers are sourced from public Harness documentation.
- **No account data access**: The Support Agent cannot view your pipelines, configurations, secrets, or any account-specific data.

For more information, see <a href="/docs/platform/harness-ai/core-capabilities/#data-storage-and-privacy-policies" target="_blank">Data storage and privacy policies</a>.

---

## Limitations

The Support Agent answers questions based on Harness documentation. Knowing where that boundary sits tells you when to escalate instead of rephrasing.

- **Documentation scope**: Can only answer questions covered in the official documentation.
- **No account access**: Cannot view or access your specific account configurations, including your pipelines, configurations, and secrets.
- **No action execution**: Cannot create or modify resources. Use the <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a> for that.
- **Public documentation only**: Does not have access to internal or private documentation.

For issues not covered in the documentation, go to [Harness Support](mailto:support@harness.io). You can also submit feedback through the UI by selecting **Help** > **Give us feedback**.

---

## Related articles

- <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI overview</a>: Activate Harness AI and review supported languages and models.
- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">Harness AI DevOps Agent</a>: Create and edit pipelines, resources, and policies with AI.
- <a href="/docs/platform/settings/default-settings" target="_blank">Default settings</a>: Manage account, organization, and project level settings.
