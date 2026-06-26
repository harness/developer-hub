---
title: OpenAI Model Connector
description: Configure the OpenAI Model Connector to run Harness Worker Agents on GPT models with configurable reasoning effort.
sidebar_position: 6.2
keywords:
  - openai connector
  - model connector
  - gpt
  - worker agents
tags:
  - ai
  - agents
  - connectors
---

The OpenAI Model Connector defines OpenAI as the LLM provider and default model for your [Worker Agents](/docs/platform/harness-ai/harness-agents).

---

## What you will learn

- Which OpenAI models the connector supports.
- What each reasoning effort level means for cost and latency.
- How to configure authentication, the default model, and reasoning effort.
- How the Harness-managed connector offering works if you do not have model access.

---

## Supported models

The OpenAI Model Connector supports **GPT-5.5** with configurable reasoning effort.

---

## Reasoning effort levels

The reasoning effort level controls how much reasoning the model applies before responding, trading latency and cost against depth. Set it on the connector configuration form.

| Effort level | Description |
|---|---|
| `low` | Fastest, lowest-cost responses for simple tasks |
| `medium` | Balanced reasoning and latency for most tasks |
| `high` | Deeper reasoning for complex tasks |
| `xhigh` | Maximum reasoning depth for the most demanding tasks |

---

## Connector configuration

When you create the connector, set the following:

- **Authentication:** Provide an OpenAI API key. Reference the key from a [Harness secret](/docs/platform/secrets/add-use-text-secrets) rather than entering it in plain text.
- **Model Name:** Select the default model (GPT-5.5) the agent uses at runtime.
- **Reasoning Effort:** Select the default effort level (`low`, `medium`, `high`, or `xhigh`).

---

## Harness-managed connector

If you do not have access to a model provider, Harness offers a managed LLM connector you can use instead.

:::note Managed connector billing
Until August 2026, usage of the Harness-managed LLM connector is included in your Harness subscription at no additional cost. After August 2026, Harness bills managed LLM connector usage separately, in addition to your Harness subscription.
:::

---

## Related concepts

- Go to [Worker Agents](/docs/platform/harness-ai/harness-agents) to create and configure agents that use this connector.
- Go to [Anthropic Model Connector](/docs/platform/harness-ai/anthropic-model-connector) to configure Claude as your model provider.
