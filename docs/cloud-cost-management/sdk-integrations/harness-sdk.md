---
title: Harness SDK (Python)
sidebar_label: Harness SDK
description: Instrument a Python application that calls a model SDK directly (LiteLLM, OpenAI, or Anthropic) to emit GenAI traces to Cloud & AI Cost Management.
keywords:
  - Harness SDK
  - AI cost traces
  - OpenTelemetry
  - GenAI instrumentation
tags:
  - cloud-cost-management
  - ai-cost-management
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use the Harness SDK when your Python application calls a model provider SDK directly (LiteLLM, OpenAI, or Anthropic), with no orchestration framework, and does not yet emit GenAI OpenTelemetry traces. You add two lines of instrumentation and the SDK emits spans with GenAI semantic conventions.

If you came from the quickstart's **Instrument your application** path, the snippet there is the short version. This page is the full setup: install, configure the endpoint, add instrumentation, and the per-client examples for LiteLLM, OpenAI, and Anthropic.

Before you start, generate an ingestion token and connect a provider. Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) for those steps.

:::info GenAI semantic conventions required
Cost is calculated from OpenTelemetry traces with GenAI semantic conventions. Standard HTTP, database, or function spans do not carry the model name or token counts CACM needs. Go to [how GenAI traces differ from standard OpenTelemetry](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work#genai-traces-are-not-the-same-as-standard-opentelemetry) to understand why, or to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## How Instrumentation Works

GenAI instrumentation has three parts: the OpenTelemetry SDK, the GenAI instrumentation libraries, and the OTLP exporter. The Harness SDK bundles all three, so the two lines below turn all of them on at once. Go to [the three parts of instrumentation](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work#the-three-parts-of-instrumentation) to understand what each part does.

If your calls run through an orchestration framework such as LangChain or Google ADK, use the matching [open-source SDK integration](/docs/cloud-cost-management/sdk-integrations/langchain) instead, so the full workflow is captured.

---

## Install the SDK

Install the SDK with the extra for your LLM client. <!-- TODO(harness-team): VERIFY — confirm the current pinned SDK versions below. -->

```bash
# For LiteLLM
pip install "harness-sdk[litellm]==1.0.1"

# For Anthropic Python client
pip install "harness-sdk[anthropic]==1.0.1"

# For OpenAI SDK
pip install "harness-sdk[openai]==1.0.1"
```

**Note for the Anthropic extra:** The Anthropic extra requires additional packages. Install them separately if not already present:

```bash
pip install opentelemetry-instrumentation-anthropic opentelemetry-util-genai
```

---

## Configure the SDK

Set these environment variables to point the SDK at the Harness endpoint. Replace `<ACCOUNT_ID>` with your account identifier (find it in the Harness URL when logged in) and `<YOUR_TOKEN>` with the ingestion token.

```bash
export HA_SERVICE_NAME="my-ai-service"
export HA_REPORTING_ENDPOINT="https://app.harness.io/udp-ingest/otel/v1/traces?accountIdentifier=<ACCOUNT_ID>&routingId=<ACCOUNT_ID>"
export HA_REPORTING_TRACE_REPORTER_TYPE=OTLP_HTTP
export HA_REPORTING_TOKEN="<YOUR_TOKEN>"
```

| Variable | Purpose |
|----------|---------|
| `HA_SERVICE_NAME` | Service name that appears in Cost Explorer (example: `customer-support-bot`). |
| `HA_REPORTING_ENDPOINT` | Harness UDP ingest endpoint with account ID. |
| `HA_REPORTING_TRACE_REPORTER_TYPE` | Transport type. Use `OTLP_HTTP`. |
| `HA_REPORTING_TOKEN` | The ingestion token generated in the Quickstart. |

---

## Add Instrumentation

Add these two lines at the **start of the application**, before importing any AI library:

```python
from harness_sdk.agent import Agent
Agent().instrument()
```

:::warning Call instrument() before importing AI libraries
The SDK patches LLM libraries (LiteLLM, OpenAI, Anthropic) and web frameworks (FastAPI, Flask) at import time via monkey-patching. Python executes module code once, so if `import openai` runs before `Agent().instrument()`, the client is never patched and no spans are emitted.
:::

Select the client your application uses:

<Tabs>
<TabItem value="litellm" label="LiteLLM" default>

**Use case:** Application uses LiteLLM to call multiple LLM providers (OpenAI, Anthropic, Bedrock, etc.).

```python
from harness_sdk.agent import Agent
Agent().instrument()  # Must be called before importing AI libraries

import litellm

# Every litellm.completion() call now emits a span with gen_ai.* attributes
resp = litellm.completion(
    model="anthropic/claude-3-5-sonnet-20241022",
    messages=[{"role": "user", "content": "Reply with one short sentence."}],
    max_tokens=64,
)
print(resp.choices[0].message.content)
```

**What this produces:**
- One span per `litellm.completion()` call.
- Span attributes: `gen_ai.system=anthropic`, `gen_ai.request.model=claude-3-5-sonnet-20241022`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`.
- Cost calculated from token counts and Anthropic pricing.

</TabItem>
<TabItem value="anthropic" label="Anthropic Python client">

**Use case:** Application uses the Anthropic Python client directly (not LiteLLM).

```python
from harness_sdk.agent import Agent
Agent().instrument()  # Must be called before importing AI libraries

import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env
msg = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=64,
    messages=[{"role": "user", "content": "Reply with one short sentence."}],
)
print(msg.content[0].text)
```

**What this produces:**
- One span per `client.messages.create()` call.
- Span attributes: `gen_ai.system=anthropic`, `gen_ai.request.model=claude-3-5-sonnet-20241022`, token usage.
- Cost calculated from token counts and Anthropic pricing.

</TabItem>
<TabItem value="openai" label="OpenAI SDK">

**Use case:** Application uses the OpenAI SDK directly.

```python
from harness_sdk.agent import Agent
Agent().instrument()  # Must be called before importing AI libraries

import openai

client = openai.OpenAI()  # reads OPENAI_API_KEY from env
resp = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[{"role": "user", "content": "Reply with one short sentence."}],
    max_tokens=64,
)
print(resp.choices[0].message.content)
```

**What this produces:**
- One span per `client.chat.completions.create()` call.
- Span attributes: `gen_ai.system=openai`, `gen_ai.request.model=gpt-4-turbo`, token usage.
- Cost calculated from token counts and OpenAI pricing.

</TabItem>
</Tabs>

---

## Reduce Trace Data Volume

Large prompt and response payloads inflate span volume and storage cost. To keep trace data manageable in high-traffic production:

- **Disable payload capture (Harness SDK only):** Set `HA_GEN_AI_PAYLOAD_CAPTURE_ENABLED=false` so raw prompt and response text is not stored on spans.
- **Scope instrumentation to LLM calls:** Instrument the model calls that carry cost, not every function.
- **Sample a percentage of traces:** Export a representative sample rather than every trace.

---

## Verify Traces in Cost Explorer

1. Run the application and trigger an LLM call.
2. Wait for traces to appear. They usually land within a few minutes; allow up to about 20 minutes.
3. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
4. Select the **AI Traces** view or group by **Service Name**, and find your service (from `HA_SERVICE_NAME`).
5. Select a service row to open the **Service Traces** drawer, and drill from a session down to the exact LLM call that drove the cost.

---

## Next Steps

- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads.
- Go to [How AI traces work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand trace attribution in depth.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
