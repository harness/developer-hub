---
title: Anthropic Model Connector
description: Configure the Anthropic Model Connector to run Harness Worker Agents on Claude models through direct Anthropic or AWS Bedrock endpoints.
sidebar_position: 6.1
keywords:
  - anthropic connector
  - model connector
  - claude
  - worker agents
tags:
  - ai
  - agents
  - connectors
---

import DocImage from '@site/src/components/DocImage';

The Anthropic Model Connector defines Claude as the LLM provider and default model for your [Worker Agents](/docs/platform/harness-ai/harness-agents). It supports both **direct Anthropic** endpoints and **AWS Bedrock** endpoints.

---

## What you will learn

- Which Claude models the connector supports.
- How to configure authentication, region, and the default model.
- How to override the default model at runtime.
- How the Harness-managed connector offering works if you do not have model access.

---

## Supported models

The following models are available when configuring the connector:

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

When you create the connector, set the **Authentication Type** (Personal Token for direct Anthropic, or Amazon Bedrock API Key), the **Region**, and the default **Model Name**.

<div align="center">
  <DocImage path={require('./static/anthropic-connector-setup.png')} alt="Anthropic Connector configuration showing authentication type, region, and model name fields" title="Click to view full size" width="50%" />
  <p align="center"><em>Anthropic Connector setup with authentication type selection and model configuration</em></p>
</div>

---

## Runtime model override

Each Worker Agent uses the default model configured on the connector unless you set the optional **Model Name** field on the agent. For Anthropic connectors, the **Model Name** field also accepts an AWS Bedrock inference profile ARN, for example `arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/a1b2c3d4e5f6`.

---

## Harness-managed connector

If you do not have access to a model provider, Harness offers a managed LLM connector you can use instead.

:::note Managed connector billing
Until August 2026, usage of the Harness-managed LLM connector is included in your Harness subscription at no additional cost. After August 2026, Harness bills managed LLM connector usage separately, in addition to your Harness subscription.
:::

---

## Related concepts

- Go to [Worker Agents](/docs/platform/harness-ai/harness-agents) to create and configure agents that use this connector.
- Go to [OpenAI Model Connector](/docs/platform/harness-ai/openai-model-connector) to configure OpenAI as your model provider.
