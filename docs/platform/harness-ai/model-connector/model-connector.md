---
title: Model connector
description: Select and configure the right model connector for your Harness AI Worker Agents.
sidebar_label: Model Connector
sidebar_position: 1
keywords:
  - model connector
  - anthropic
  - openai
  - claude
  - gpt
  - worker agents
  - llm connector
  - ai models
tags:
  - harness-ai
  - connectors
---

Model connectors enable Harness AI Worker Agents to access large language models (LLMs) from Anthropic and OpenAI. Choose the connector that matches your AI model provider and configure it to run autonomous agents inside your pipelines.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#available-model-connectors">Understand available model connector options</a>.
- <a href="#choose-a-connector">Select the right connector for your use case</a>.
- <a href="#configure-your-connector">Configure your chosen model connector</a>.

---

## Before you begin

Before you configure a model connector, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **API access**: API key or credentials from your chosen model provider (Anthropic, OpenAI, or AWS Bedrock).
- **Connector permissions**: Permission to create and manage connectors in your Harness project. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.

---

## Available model connectors

Harness AI supports three model connector types to access different LLM providers.

### Anthropic Model Connector

Connect to Claude models through direct Anthropic API or AWS Bedrock endpoints.

**Supported models:**
- Claude Opus (latest)
- Claude Sonnet (latest)
- Claude Haiku (latest)

**Connection methods:**
- Direct Anthropic API
- AWS Bedrock (cross-region inference profiles supported)

**Best for:** Teams using Claude models for Worker Agents, especially those with AWS Bedrock infrastructure.

Go to <a href="/docs/platform/harness-ai/model-connector/anthropic-model-connector" target="_blank">Anthropic Model Connector</a> for more information on configuration steps.


### Anthropic Connector (OAuth)

Connect to Claude.ai using OAuth authentication for direct access to Anthropic hosted models.

**Authentication method:**
- OAuth 2.0 with Claude.ai

**Best for:** Teams who prefer OAuth authentication and direct access to Claude.ai without managing API keys.

Go to <a href="/docs/platform/harness-ai/model-connector/anthropic-harness-connector" target="_blank">Anthropic Connector</a> for more information on configuration steps.

### OpenAI Model Connector

Connect to GPT models with configurable reasoning effort levels.

**Supported models:**
- GPT-5.5 with reasoning effort configuration

**Reasoning effort levels:**
- Low
- Medium
- High

**Best for:** Teams using OpenAI GPT models with specific reasoning requirements for complex tasks.

Go to <a href="/docs/platform/harness-ai/model-connector/openai-model-connector" target="_blank">OpenAI Model Connector</a> for more information on configuration steps.

---

## Choose a connector

Select your model connector based on your infrastructure, model preference, and authentication requirements.

### Decision criteria

Consider these factors when choosing a connector.

**Infrastructure:**
- Do you have existing AWS Bedrock infrastructure? Use Anthropic Model Connector with Bedrock.
- Do you prefer direct API access? Use Anthropic Model Connector or OpenAI Model Connector.
- Do you need OAuth authentication? Use Anthropic Connector (OAuth).

**Model preference:**
- Need Claude models (Opus, Sonnet, Haiku)? Use Anthropic Model Connector or Anthropic Connector (OAuth).
- Need GPT models with reasoning effort control? Use OpenAI Model Connector.
- Need cross-region model access via Bedrock? Use Anthropic Model Connector with inference profiles.

**Authentication:**
- API key management: Anthropic Model Connector or OpenAI Model Connector.
- OAuth 2.0: Anthropic Connector (OAuth).
- AWS IAM / Bedrock: Anthropic Model Connector with Bedrock.

**Cost and billing:**
- AWS consolidated billing: Anthropic Model Connector with Bedrock.
- Direct provider billing: Anthropic Model Connector (direct API) or OpenAI Model Connector.
- Claude.ai subscription: Anthropic Connector (OAuth).

---

## Configure your connector

Once you have chosen a connector type, follow the configuration steps for your selected provider.

### Configuration steps

1. Navigate to **Connectors** in your Harness project, organization, or account settings.
2. Search for your chosen connector type in the connector catalog.
3. Follow the provider-specific configuration steps:
   - <a href="/docs/platform/harness-ai/model-connector/anthropic-model-connector" target="_blank">Anthropic Model Connector configuration</a>
   - <a href="/docs/platform/harness-ai/model-connector/openai-model-connector" target="_blank">OpenAI Model Connector configuration</a>
   - <a href="/docs/platform/harness-ai/model-connector/anthropic-harness-connector" target="_blank">Anthropic Connector (OAuth) configuration</a>

### Common configuration elements

All model connectors require the following configuration elements.

- **Connector name**: Unique identifier for the connector.
- **Authentication credentials**: API key, OAuth token, or AWS IAM role.
- **Default model selection**: Choose the default model for Worker Agents using this connector.

---

## Configure Model Connectors

The Model Connector defines the LLM provider and default model for your Worker Agent. When you create or select a connector, you choose a default model that the agent uses at runtime unless overridden by the optional **Model Name** field.

Harness supports the following Model Connectors:

- **Anthropic Model Connector:** Run agents on Claude models through direct Anthropic or AWS Bedrock endpoints. Go to [Anthropic Model Connector](/docs/platform/harness-ai/model-connector/anthropic-model-connector) to review supported models and setup options.
- **OpenAI Model Connector:** Run agents on GPT-5.5 with configurable reasoning effort. Go to [OpenAI Model Connector](/docs/platform/harness-ai/model-connector/openai-model-connector) to review supported models, effort levels, and setup options.

If you do not have access to a model provider, Harness offers a managed LLM connector you can use instead.

---

## Managed connector option

Harness offers a managed LLM connector for teams without their own model provider access.

:::note Managed connector billing
Until August 2026, usage of the Harness-managed LLM connector is included in your Harness subscription at no additional cost. After August 2026, Harness bills managed LLM connector usage separately, in addition to your Harness subscription.
:::

**When to use:**
- Evaluating Harness AI Worker Agents.
- No existing model provider relationship.
- Want simplified setup without managing API keys.

---

## Next steps

- Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/worker-agent" target="_blank">Worker Agents</a> for more information on creating AI-powered agents that use your configured model connector.
- Go to <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a> for more information on using AI to create and manage pipelines.
