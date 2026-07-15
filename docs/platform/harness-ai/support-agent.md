---
title: Harness AI Support Agent
description: Harness AI Support Agent provides instant answers to product and documentation questions.
sidebar_label: Support Agent
sidebar_position: 9
redirect_from:
  - /docs/platform/harness-aida/support-agent
---

# Harness AI Support Agent

The **Harness AI Support Agent** serves as your first line of support within the Harness platform. By leveraging Harness documentation and knowledge base content, the Support Agent provides instant answers to product questions, troubleshooting guidance, and contextual examples directly from the official documentation.

:::note AI Model

The Support Agent uses **OpenAI GPT-4o** to process your questions and retrieve relevant documentation.

:::

## Overview

The Support Agent is designed to help developers and platform users quickly find answers without leaving their workflow. Instead of searching through documentation manually, you can ask natural language questions and receive accurate, contextual responses with links to relevant documentation.

**Key benefits:**

- **Instant answers** - Get responses to product questions in seconds
- **Documentation-backed** - All answers are sourced from official Harness documentation
- **Contextual examples** - Receive code snippets, YAML examples, and configuration samples from the docs
- **Session memory** - The agent remembers context from earlier in your conversation for follow-up questions
- **Always current** - Pulls from the latest published documentation

## Installation and Setup

The Harness AI Support Agent is enabled as part of the Harness AI feature set. No separate installation is required.

1. Select **Account Settings** in the left nav.
2. Under **General**, select [**Default Settings**](/docs/platform/settings/default-settings).
3. Find **Harness AI** and enable the **Harness AI** setting.
4. Optionally, enable **Allow Overrides** to let individual organizations and projects override this setting.

Once enabled, the Support Agent is accessible through the Harness AI assistant interface.

## Using the Support Agent

Access the Support Agent through the Harness AI chat interface. The agent automatically identifies documentation-related questions and retrieves relevant content.

### Asking Questions

You can ask the Support Agent any question related to Harness products, features, or configurations. The agent searches the documentation knowledge base and returns relevant information.

**Example questions:**

- "How do I create a Kubernetes connector?"
- "What are the required permissions for a GitHub connector?"
- "Explain the difference between rolling and canary deployments"
- "How do I configure failure strategies in a pipeline?"
- "What environment variables are available in CI build steps?"

### Getting Documentation Examples

The Support Agent can retrieve specific examples from the documentation, including YAML configurations, API examples, and step-by-step guides.

**Example prompts:**

- "Show me an example of a Kubernetes deployment manifest"
- "Give me a sample pipeline YAML for a CI/CD workflow"
- "What does a Terraform connector configuration look like?"
- "Show me how to configure an approval stage"

### Contextual Follow-up Questions

The Support Agent maintains conversation context within a chat session. This allows you to ask follow-up questions that build on previous responses without repeating context.

**Example conversation:**

1. **You:** "How do I set up a Docker connector?"
2. **Support Agent:** *Provides documentation on Docker connector setup*
3. **You:** "What permissions does it need?"
4. **Support Agent:** *Provides permissions information specific to Docker connectors, understanding the context from the previous question*

### Troubleshooting Guidance

When you encounter errors or issues, the Support Agent can help you find relevant troubleshooting documentation.

**Example prompts:**

- "I'm getting a 'delegate not found' error. How do I fix this?"
- "My pipeline is failing with a connection timeout. What should I check?"
- "How do I debug a failed Kubernetes deployment?"
- "What are common causes for artifact download failures?"

## Features

| **Feature** | **Description** |
|-------------|-----------------|
| **Natural Language Queries** | Ask questions in plain English and receive clear, concise answers. |
| **Documentation Search** | Searches across all Harness documentation to find relevant content. |
| **Code Examples** | Retrieves YAML, JSON, and code examples directly from documentation. |
| **Session Context** | Maintains conversation history for contextual follow-up questions. |
| **Multi-Module Coverage** | Answers questions across all Harness modules (CI, CD, CCM, STO, etc.). |

### Natural Language Queries

The Support Agent understands natural language questions and interprets your intent to find the most relevant documentation. You don't need to use specific keywords or exact terminology.

**How it works:**

1. You ask a question in natural language
2. The agent analyzes your question to understand the intent
3. The agent searches the documentation knowledge base
4. Relevant sections are retrieved and synthesized into a response

### Documentation Search

The Support Agent has access to the complete Harness documentation, including:

- Platform documentation
- Module-specific guides (CI, CD, CCM, STO, CE, FF, SRM, IDP, IACM)
- API references
- Tutorials and quickstarts
- Troubleshooting guides
- Best practices and reference architectures

### Code Examples

When documentation includes code samples, the Support Agent can retrieve and display them in your chat. This includes:

- Pipeline YAML configurations
- Connector definitions
- Service and environment manifests
- API request/response examples
- Shell commands and scripts
- Terraform and infrastructure code

### Session Context

The Support Agent uses session memory to maintain context throughout your conversation. This enables:

- **Follow-up questions** - Ask clarifying questions without restating context
- **Progressive learning** - Build understanding through a series of related questions
- **Refinement** - Ask the agent to elaborate or provide more specific examples
- **Comparative questions** - Ask how concepts relate to previously discussed topics

Session context is maintained for the duration of your chat session. Starting a new session clears the context.

## Best Practices

### Writing Effective Questions

To get the most accurate responses from the Support Agent:

- **Be specific** - Include relevant details like module names, resource types, or error messages
- **Provide context** - Mention what you're trying to accomplish
- **Use follow-ups** - Start broad and narrow down with follow-up questions
- **Include error messages** - When troubleshooting, include the exact error text

**Good example:**
> "How do I configure a GitHub connector with a personal access token for a private repository?"

**Less effective example:**
> "How do connectors work?"

### Using Session Context Effectively

Take advantage of session memory to have productive conversations:

1. **Start with the main topic** - Ask your primary question first
2. **Build incrementally** - Ask follow-up questions that build on previous answers
3. **Reference previous answers** - Use phrases like "In that example..." or "For that connector..."
4. **Request elaboration** - Ask "Can you explain more about..." when you need details

### When to Use Support Agent vs. DevOps Agent

| **Use Support Agent** | **Use DevOps Agent** |
|-----------------------|----------------------|
| Learning about Harness features | Creating pipelines, stages, or steps |
| Finding documentation and examples | Modifying existing configurations |
| Troubleshooting guidance | Generating services, environments, or connectors |
| Understanding best practices | Automating DevOps tasks |
| Exploring configuration options | Building and editing resources |

## Data Privacy

The Support Agent follows the same data privacy policies as all Harness AI features:

- **No training on your data** - Your questions are not used to train AI models
- **Ephemeral processing** - Questions are processed in real-time and not stored
- **Documentation-only responses** - Answers are sourced from public Harness documentation

For complete data privacy information, refer to [Data Storage and Privacy Policies](/docs/platform/harness-ai/core-capabilities/#data-storage-and-privacy-policies).

## Limitations

The Support Agent is designed to answer questions based on Harness documentation. It has the following limitations:

- **Documentation scope** - Can only answer questions covered in the official documentation
- **No account access** - Cannot view or access your specific account configurations
- **No action execution** - Cannot create or modify resources (use the [DevOps Agent](/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent) for that)
- **Public documentation only** - Does not have access to internal or private documentation

## FAQ

### Is the Support Agent available for all license types?

Yes, the Support Agent is available to all Harness users with Harness AI enabled, regardless of license type.

### Can the Support Agent access my account data?

No, the Support Agent only has access to public Harness documentation. It cannot view your pipelines, configurations, secrets, or any account-specific data.

### How current is the documentation the Support Agent uses?

The Support Agent pulls from the latest published Harness documentation. Documentation updates are reflected in Support Agent responses after they are published.

### Can I use the Support Agent for issues not covered in documentation?

For issues not covered in documentation, please contact [Harness Support](mailto:support@harness.io) directly. You can also submit feedback through the UI by selecting **Help** > **Give us feedback**.

### Does the Support Agent remember previous sessions?

No, session context is cleared when you start a new chat session. Each new session starts fresh without memory of previous conversations.

### What languages does the Support Agent support?

The Support Agent supports the same languages as Harness AI, including English, Spanish, French, German, Hindi, Korean, Mandarin, and more.
