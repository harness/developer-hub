---
title: OpenAI Model Connector
description: Configure the OpenAI Model Connector to run Harness Worker Agents on GPT models with configurable reasoning effort.
sidebar_position: 4
keywords:
  - openai connector
  - model connector
  - gpt
  - worker agents
  - reasoning effort
  - llm
tags:
  - ai
  - agents
  - connectors
redirect_from:
  - /docs/platform/harness-ai/openai-model-connector
---

The OpenAI Model Connector defines OpenAI as the LLM provider and default model for your <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a>.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#supported-models">Understand which OpenAI models the connector supports</a>.
- <a href="#reasoning-effort-levels">Configure reasoning effort levels for cost and latency tradeoffs</a>.
- <a href="#connector-configuration">Configure authentication, the default model, and reasoning effort</a>.
- <a href="#harness-managed-connector">Use the Harness-managed connector if you do not have model access</a>.

---

## Before you begin

Before you configure the OpenAI Model Connector, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **OpenAI API access**: An active OpenAI account with API key access for GPT models.
- **Harness secret**: A configured secret to store your OpenAI API key. Go to <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank">Add and reference text secrets</a> for more information on creating secrets.
- **Connector permissions**: Permission to create and manage connectors in your Harness project. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.

---

## Supported models

The OpenAI Model Connector supports GPT-5.5 with configurable reasoning effort. Select the model that best fits your Worker Agent use case based on reasoning requirements, speed, and cost.

The OpenAI Model Connector supports **GPT-5.5** with configurable reasoning effort.

---

## Reasoning effort levels

The reasoning effort level controls how much reasoning the model applies before responding, trading latency and cost against depth. Set the reasoning effort level on the connector configuration form based on your task complexity requirements.

| Effort level | Description |
|---|---|
| `low` | Fastest, lowest-cost responses for simple tasks |
| `medium` | Balanced reasoning and latency for most tasks |
| `high` | Deeper reasoning for complex tasks |
| `xhigh` | Maximum reasoning depth for the most demanding tasks |

---

## Connector configuration

Configure the connector with your OpenAI authentication, default model, and reasoning effort settings.

When you create the connector, set the following:

- **Authentication**: Provide an OpenAI API key. Reference the key from a <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank">Harness secret</a> rather than entering it in plain text.
- **Model Name**: Select the default model (GPT-5.5) the agent uses at runtime.
- **Reasoning Effort**: Select the default effort level (`low`, `medium`, `high`, or `xhigh`).

---

## Next steps

- Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a> for more information on creating and configuring agents that use this connector.
- Go to <a href="/docs/platform/harness-ai/model-connector/anthropic-model-connector" target="_blank">Anthropic Model Connector</a> for more information on configuring Claude as your model provider.
