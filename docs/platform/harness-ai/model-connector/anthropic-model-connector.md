---
title: Anthropic Model Connector
description: Configure the Anthropic Model Connector to run Harness Worker Agents on Claude models through direct Anthropic or AWS Bedrock endpoints.
sidebar_position: 2
keywords:
  - anthropic connector
  - model connector
  - claude
  - worker agents
  - bedrock
  - llm
tags:
  - ai
  - agents
  - connectors
redirect_from:
  - /docs/platform/harness-ai/anthropic-model-connector
---

The Anthropic Model Connector defines Claude as the LLM provider and default model for your <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a>. It supports both direct Anthropic endpoints and AWS Bedrock endpoints.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#supported-models">Understand which Claude models the connector supports</a>.
- <a href="#connector-configuration">Configure authentication, region, and the default model</a>.
- <a href="#runtime-model-override">Override the default model at runtime</a>.
- <a href="#harness-managed-connector">Use the Harness-managed connector if you do not have model access</a>.

---

## Before you begin

Before you configure the Anthropic Model Connector, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **Model provider access**: API key from Anthropic or AWS Bedrock access with appropriate IAM permissions for Claude models.
- **Connector permissions**: Permission to create and manage connectors in your Harness project. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.

---

## Supported models

The Anthropic Model Connector supports the following Claude models. Select the model that best fits your Worker Agent use case based on complexity, speed, and cost requirements.

| Model | Description |
|---|---|
| Claude Opus 4.8 | Latest and most capable model for complex reasoning |
| Claude Opus 4.7 | High-capability model for complex reasoning |
| Claude Opus 4.6 | High-capability model for complex reasoning |
| Claude Sonnet 4.6 | Fast, high-capability model for most tasks |
| Claude Sonnet 4.5 | Previous-generation fast model |
| Claude Haiku 4.5 | Lightweight, low-latency model for simple tasks |

---

## Connector configuration

Configure the connector with your authentication method, region, and default model selection.

When you create the connector, set the **Authentication Type** (Personal Token for direct Anthropic, or Amazon Bedrock API Key), the **Region**, and the default **Model Name**.

<div align="center">
  <DocImage path={require('./static/anthropic-connector-setup.png')} alt="Anthropic Connector configuration showing authentication type, region, and model name fields" title="Click to view full size" width="50%" />
  <p align="center"><em>Anthropic Connector setup with authentication type selection and model configuration</em></p>
</div>

---

## Runtime model override

Override the connector default model on individual Worker Agents to use different Claude models for specific tasks.

Each Worker Agent uses the default model configured on the connector unless you set the optional **Model Name** field on the agent. For Anthropic connectors, the **Model Name** field also accepts an AWS Bedrock inference profile ARN, for example `arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/a1b2c3d4e5f6`.

---


## Next steps

- Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a> for more information on creating and configuring agents that use this connector.
- Go to <a href="/docs/platform/harness-ai/model-connector/openai-model-connector" target="_blank">OpenAI Model Connector</a> for more information on configuring OpenAI as your model provider.
