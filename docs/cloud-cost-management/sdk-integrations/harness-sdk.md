---
title: Harness SDK (Python)
sidebar_label: Harness SDK
description: Instrument a Python application that calls a model SDK directly (LiteLLM, OpenAI, Anthropic, or Google GenAI) to emit GenAI traces to Cloud & AI Cost Management.
keywords:
  - Harness SDK
  - AI cost traces
  - OpenTelemetry
  - GenAI instrumentation
  - Google GenAI
  - Gemini
  - Vertex AI
tags:
  - cloud-cost-management
  - ai-cost-management
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use the Harness SDK when your Python application calls a model provider SDK directly (LiteLLM, OpenAI, Anthropic, or Google GenAI), with no orchestration framework, and does not yet emit GenAI OpenTelemetry traces. You add two lines of instrumentation and the SDK emits spans with GenAI semantic conventions.

If you came from the quickstart's **Instrument your application** path, the snippet there is the short version. This page is the full setup: install, configure the endpoint, add instrumentation, and the per-client examples for LiteLLM, OpenAI, Anthropic, and Google GenAI.

Before you start, generate an ingestion token and connect a provider. Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) for those steps.

:::info GenAI semantic conventions required
Cost is calculated from OpenTelemetry traces with GenAI semantic conventions. Standard HTTP, database, or function spans do not carry the model name or token counts CACM needs. Go to [how GenAI traces differ from standard OpenTelemetry](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work#genai-traces-are-not-the-same-as-standard-opentelemetry) to understand why, or to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## How Instrumentation Works

GenAI instrumentation has three parts: the OpenTelemetry SDK, the GenAI instrumentation libraries, and the OTLP exporter. The Harness SDK bundles all three, so the two lines below turn all of them on at once. Go to [the three parts of instrumentation](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work#the-three-parts-of-instrumentation) to understand what each part does.

:::tip
By default, the SDK traces none of your AI providers. Enable each provider your application uses (OpenAI, Anthropic, Google GenAI, or LiteLLM) with a single environment variable, so Harness captures cost data only for the calls you want to track. Go to [Configure the SDK](#configure-the-sdk) to set the correct environment variable for each provider.
:::

If your calls run through an orchestration framework such as LangChain or Google ADK, use the matching [open-source SDK integration](/docs/cloud-cost-management/sdk-integrations/langchain) instead, so the full workflow is captured.

---

## Install the SDK

Install the SDK with the extra for your LLM client.

```bash
# For LiteLLM
pip install "harness-sdk[litellm]"

# For Anthropic Python client
pip install "harness-sdk[anthropic]"

# For OpenAI SDK
pip install "harness-sdk[openai]"

# For Google GenAI / Gemini / Vertex AI
pip install "harness-sdk[google-genai]"
```

:::note
The Anthropic extra requires additional packages. Install them separately if they are not already present:

```bash
pip install opentelemetry-instrumentation-anthropic opentelemetry-util-genai
```
:::

:::tip
If your application uses more than one provider, combine the extras in a single install with a comma-separated list:

```bash
pip install "harness-sdk[anthropic,google-genai,openai]"
```
:::

---

## Configure the SDK

Set these environment variables to point the SDK at the Harness endpoint. Replace `<ACCOUNT_ID>` with your account identifier (find it in the Harness URL when logged in) and `<YOUR_TOKEN>` with the ingestion token.

```bash
export HARNESS_SERVICE_NAME="my-ai-service"
export HARNESS_REPORTING_ENDPOINT="https://app.harness.io/udp-ingest/otel/v1/traces?accountIdentifier=<ACCOUNT_ID>&routingId=<ACCOUNT_ID>"
export HARNESS_REPORTING_TRACE_REPORTER_TYPE=OTLP_HTTP
export HARNESS_REPORTING_TOKEN="<YOUR_TOKEN>"

# Enable only the providers your application uses.
export HARNESS_ENABLE_AI_OPENAI=true
export HARNESS_ENABLE_AI_ANTHROPIC=true
export HARNESS_ENABLE_AI_GOOGLE_GENAI=true
export HARNESS_ENABLE_AI_LITELLM=true
```

| Variable | Purpose |
|----------|---------|
| `HARNESS_SERVICE_NAME` | Service name that appears in Cost Explorer (example: `customer-support-bot`). |
| `HARNESS_REPORTING_ENDPOINT` | Harness UDP ingest endpoint with account ID. |
| `HARNESS_REPORTING_TRACE_REPORTER_TYPE` | Transport type. Use `OTLP_HTTP`. |
| `HARNESS_REPORTING_TOKEN` | The ingestion token generated in the Quickstart. |

### Enable per-provider instrumentation

Nothing is instrumented by default. Set the flag for each provider your application uses. Each flag must be exactly `true`.

| Flag | What it traces |
|------|----------------|
| `HARNESS_ENABLE_AI_OPENAI=true` | OpenAI SDK |
| `HARNESS_ENABLE_AI_ANTHROPIC=true` | Anthropic SDK (including Vertex) |
| `HARNESS_ENABLE_AI_GOOGLE_GENAI=true` | Google GenAI / Gemini / Vertex |
| `HARNESS_ENABLE_AI_LITELLM=true` | LiteLLM |

---

## Add Instrumentation

Add these two lines at the **start of the application**, before importing any AI library:

```python
from harness_sdk.agent import Agent
Agent().instrument()
```

:::warning Call instrument() before importing AI libraries
The SDK patches LLM libraries (LiteLLM, OpenAI, Anthropic, Google GenAI) and web frameworks (FastAPI, Flask) at import time via monkey-patching. Python executes module code once, so if `import openai` runs before `Agent().instrument()`, the client is never patched and no spans are emitted.
:::

Select the client your application uses:

<Tabs>
<TabItem value="litellm" label="LiteLLM" default>

**Use case:** Application uses LiteLLM to call multiple LLM providers (OpenAI, Anthropic, Bedrock, etc.).

Before you run the application, enable LiteLLM tracing in your environment. Without this, the SDK emits no spans.

```bash
export HARNESS_ENABLE_AI_LITELLM=true
```

With the provider enabled, instrument the application before it makes any model call. Every call is then traced automatically:

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

Before you run the application, enable Anthropic tracing in your environment. Without this, the SDK emits no spans.

```bash
export HARNESS_ENABLE_AI_ANTHROPIC=true
```

With the provider enabled, instrument the application before it makes any model call. Every call is then traced automatically:

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

Before you run the application, enable OpenAI tracing in your environment. Without this, the SDK emits no spans.

```bash
export HARNESS_ENABLE_AI_OPENAI=true
```

With the provider enabled, instrument the application before it makes any model call. Every call is then traced automatically:

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
<TabItem value="google-genai" label="Google GenAI / Gemini">

**Use case:** Application uses the Google GenAI SDK to call Gemini, either through the Gemini API or Vertex AI.

Before you run the application, enable Google GenAI tracing in your environment. Without this, the SDK emits no spans.

```bash
export HARNESS_ENABLE_AI_GOOGLE_GENAI=true
```

With the provider enabled, instrument the application before it makes any model call. Every call is then traced automatically:

```python
from harness_sdk.agent import Agent
Agent().instrument()  # Must be called before importing AI libraries

from google import genai

client = genai.Client(
    vertexai=True,
    project="my-gcp-project",
    location="us-central1",
)
resp = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Reply with one short sentence.",
)
print(resp.text)
```

**What this produces:**
- One span per `client.models.generate_content()` call.
- Span attributes: `gen_ai.system=gcp.vertex_ai`, `gen_ai.request.model=gemini-2.5-flash`, token usage.
- Cost calculated from token counts and Gemini pricing.

</TabItem>
</Tabs>

---

## Enrich Trace Data with Custom Attributes

By default, each span records the **model**, the **token counts**, and the **cost** of a call. This adds up to one combined cost figure, for example your total Gemini spend for the month, but with no breakdown of which customer or feature drove it. So when the bill jumps, you cannot tell what caused it.

Custom attributes solve this. You tag each call with the context you want to track, such as the customer or the feature, so you can answer questions such as "how much is each customer costing me?" or "which feature is the most expensive?"

For example, if one application serves many customers from the same code (a multi-tenant application), you can tag every call with the customer it belongs to. The example below adds two attributes:

- **`tenant.id`:** which customer made the call, so you can see cost per customer.
- **`agent.action.type`:** what the call was doing, such as generating an answer, so you can see cost per feature.

An attribute attaches to whichever span is active at the time, so you wrap the model call in a span and set the attributes inside it:

```python
from google import genai
from opentelemetry import trace
from harness_sdk import set_span_attributes

client = genai.Client(
    vertexai=True,
    project="my-gcp-project",
    location="us-central1",
)
tracer = trace.get_tracer(__name__)

def generate_answer(tenant_id: str, prompt: str) -> str:
    with tracer.start_as_current_span("tenant.vertex.request"):
        set_span_attributes({
            "tenant.id": tenant_id,
            "agent.action.type": "generate-answer",
        })
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return response.text
```

Every span this function produces now carries the customer ID and the action type. In Cost Explorer, you can then group or filter your AI cost by customer or by feature, instead of seeing only a single combined total.

---

## Reduce Trace Data Volume

Large prompt and response payloads inflate span volume and storage cost. To keep trace data manageable in high-traffic production:

- **Disable payload capture (Harness SDK only):** Set `HARNESS_GEN_AI_PAYLOAD_CAPTURE_ENABLED=false` so raw prompt and response text is not stored on spans.
- **Scope instrumentation to LLM calls:** Instrument the model calls that carry cost, not every function.
- **Sample a percentage of traces:** Export a representative sample rather than every trace.

---

## Verify Traces in Cost Explorer

1. Run the application and trigger an LLM call.
2. Wait for traces to appear. They usually land within a few minutes; allow up to about 20 minutes.
3. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
4. Select the **AI Traces** view or group by **Service Name**, and find your service (from `HARNESS_SERVICE_NAME`).
5. Select a service row to open the **Service Traces** drawer, and drill from a session down to the exact LLM call that drove the cost.

---

## Debug Instrumentation Locally

When traces do not appear in Cost Explorer, it is hard to tell where the problem is, because the SDK sends spans straight to Harness where you cannot see them. These two environment variables make the SDK show its work on your own machine, so you can see a span created before it leaves your application:

| Variable | What it does |
|---|---|
| `HARNESS_ENABLE_CONSOLE_SPAN_EXPORTER=true` | Prints a copy of every span to your terminal the moment it is created, so you can confirm the SDK is capturing your model calls. |
| `HARNESS_LOG_LEVEL=DEBUG` | Prints detailed SDK activity, including which libraries it instruments, which providers you enabled, and each attempt to send spans to Harness along with the response. |

Add both to your existing setup, then run the application and trigger one model call:

```bash
# Add these to your existing configuration and provider flags
export HARNESS_ENABLE_CONSOLE_SPAN_EXPORTER=true
export HARNESS_LOG_LEVEL=DEBUG
```

Then match the terminal output to find the cause:

| What you see | What it means | What to do |
|---|---|---|
| A span prints with `gen_ai.*` attributes | Instrumentation works. Your calls are captured, so the problem is getting them to Harness. | Go to [Troubleshooting](#troubleshooting) to fix the connection to Harness. |
| No span prints | The SDK is not capturing your calls. Usually the instrumentation call `Agent().instrument()` runs after the AI library is imported, or the provider flag for your client is not set to `true`. | Go to [Add Instrumentation](#add-instrumentation) to fix the order, and [Enable per-provider instrumentation](#enable-per-provider-instrumentation) to set the flag. |

:::warning
Turn both variables off in production. They add noise and overhead, and printing spans to the console is only useful while you are debugging.
:::

---

## Troubleshooting

<Troubleshoot
  issue="The Harness SDK logs a 403 Forbidden response when exporting spans, and no traces reach Harness"
  mode="general"
  fallback="A 403 means the ingestion token is invalid, expired, or lacks permission. Regenerate the token, set it as HARNESS_REPORTING_TOKEN, and confirm HARNESS_REPORTING_ENDPOINT includes the correct account identifier. If the error persists, contact Harness Support with your account ID and service account details."
/>

<Troubleshoot
  issue="The application calls Claude through the Anthropic SDK but no span appears in Cost Explorer"
  mode="general"
  fallback="The SDK instruments no providers by default. Set HARNESS_ENABLE_AI_ANTHROPIC=true before running the application, and confirm Agent().instrument() runs before the Anthropic client is imported. To check locally, set HARNESS_ENABLE_CONSOLE_SPAN_EXPORTER=true and verify a span with gen_ai.* attributes prints to the terminal."
/>

<Troubleshoot
  issue="The application calls Gemini through the Google GenAI SDK but no span appears in Cost Explorer"
  mode="general"
  fallback="The SDK instruments no providers by default. Set HARNESS_ENABLE_AI_GOOGLE_GENAI=true before running the application, and confirm Agent().instrument() runs before the Google GenAI client is imported. To check locally, set HARNESS_ENABLE_CONSOLE_SPAN_EXPORTER=true and verify a span with gen_ai.* attributes prints to the terminal."
/>

---

## Next Steps

- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads.
- Go to [How AI traces work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand trace attribution in depth.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
