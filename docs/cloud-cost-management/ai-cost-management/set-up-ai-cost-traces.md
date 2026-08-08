---
title: Set Up AI Cost Traces
sidebar_label: Set Up AI Cost Traces
unlisted: true
description: Instrument your application to send GenAI OpenTelemetry traces to Cloud & AI Cost Management, from generating an ingestion token to verifying traces in Cost Explorer.
toc_max_heading_level: 3
keywords:
  - AI cost traces
  - OpenTelemetry
  - OTLP
  - Harness SDK
  - GenAI instrumentation
tags:
  - cloud-cost-management
  - ai-cost-management
redirect_from:
  - /docs/cloud-cost-management/ai-cost-management/set-up-ai-traces
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After you understand [how AI traces work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work), instrument your application to send OpenTelemetry traces with GenAI semantic conventions to Cloud & AI Cost Management (CACM). This page walks you through every setup path, from generating an ingestion token to verifying traces in Cost Explorer.

:::info GenAI semantic conventions required
This depends on OpenTelemetry traces with GenAI semantic conventions, not just standard OpenTelemetry traces. Standard HTTP, database, or function spans do not carry the model name or token counts CACM needs to calculate cost. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## Before You Begin

- **AI Cost Management enabled:** Confirm that **AI Cloud Providers** appears under **Cloud & AI Cost Management** > **Account Settings**. Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if it does not.
- **Permission to create a service account:** Route Existing Traces generates the ingestion token as its first step. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to confirm your role.
- **A provider connector (recommended):** Needed for invoice-accurate costs. Go to [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to connect one.
- **A runtime:** Python 3.8+ for the Harness SDK, or `curl` for a test trace.
- **Network egress:** From your app or shell to the Harness OTLP endpoint (`https://app.harness.io/udp-ingest/otel/v1/traces`, or your cluster's equivalent).

---

## Choose Your Path

Your setup path depends on one question: ***Does your app or gateway already emit GenAI OpenTelemetry traces?***

- **Yes, my stack already emits GenAI traces:** Route those traces to Harness with no code changes. Use **Route Existing Traces**.
- **No, I need to instrument my application:** Add instrumentation that emits GenAI traces, then route them to Harness. Use the **Harness SDK** if you call a model SDK directly in Python, or an **open-source SDK** if an orchestration framework runs your calls.

Not sure whether your stack emits GenAI traces? Go to [Supported Providers and Frameworks](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check the compatibility matrix.

| Path | Use when | What you do |
|------|----------|-------------|
| **Route Existing Traces** | Your app or gateway already emits GenAI OpenTelemetry traces (LangSmith, OpenInference, a LiteLLM proxy, or native framework export). | Generate a token and point the existing exporter at the Harness endpoint. No code changes. |
| **Instrument Your Application** | Your app does not emit GenAI traces yet. | Add the Harness SDK (direct Python SDK calls) or an open-source SDK (orchestration frameworks), then route the traces to Harness. |

---

## Instrument Your Application

Select the tab that matches your stack. Each tab is a complete, self-contained setup, from the ingestion token to verification in Cost Explorer.

<Tabs queryString="path">
<TabItem value="route-existing" label="Route Existing Traces" default>

### Route Existing Traces

**Use this path if** your app or gateway already emits **OpenTelemetry traces with GenAI semantic conventions** (from LangSmith, OpenInference, a LiteLLM Proxy, LangChain, or a framework with native export). No code changes: you repoint the existing exporter at Harness.

<DocImage path={require('../static/step-one.png')} width="100%" title="Enable Telemetry screen: telemetry needs instrumentation that produces traces and an endpoint for those traces to land. Select 'Yes, route my existing traces' when your app already produces OTel traces and only the OTLP endpoint needs configuring." />

#### Step 1: Generate an Authentication Token

Harness uses a bearer token to authenticate trace ingestion against the account's OTLP endpoint.

**Recommended:** Create a dedicated [service account](/docs/platform/role-based-access-control/add-and-manage-service-account) for telemetry ingestion and generate an API key under that account. This isolates the credential, makes it easy to rotate, and keeps trace ingestion working independently of any individual user.

1. [Create a service account](/docs/platform/role-based-access-control/add-and-manage-service-account) (example: `ai-telemetry-ingest`) and assign it a role with the minimum permissions required for ingestion.
2. [Create a service account API key and token](/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
3. Select **Generate Token** and copy the token.

:::warning Store the token securely
- The token is only displayed once. Store it securely (secret manager, environment variable, or vault).
- Treat it like a password. Never commit it to source control.
- Rotate it periodically (every 90 days recommended).
:::

#### Step 2: Configure the OTLP Exporter

Point the existing OTLP exporter at the Harness endpoint by setting these OpenTelemetry environment variables:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

<details>
<summary>What each variable does</summary>

| Variable | Purpose |
|----------|---------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Harness OTLP trace ingestion endpoint. Replace `app.harness.io` with the account's cluster if different (example: `app3.harness.io`). Find the cluster in the URL when logged in to Harness. |
| `OTEL_EXPORTER_OTLP_HEADERS` | Bearer token for authentication. Use the literal token value or reference it from a secret/environment variable. |
| `OTEL_TRACES_EXPORTER` | Selects the OTLP exporter for traces. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Selects HTTP/protobuf OTLP transport (Harness expects this format). |

</details>

**Framework-specific configuration**

The four variables above are the standard OpenTelemetry exporter settings and work for most stacks. Some frameworks and tools also require a framework-specific flag to turn telemetry on. Pick your framework below.

<Tabs>
<TabItem value="otel" label="Standard OTel SDK" default>

No extra flag is needed. The standard variables are enough:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
<TabItem value="claude-code" label="Anthropic Agent SDK (Claude Code)">

Claude Code additionally requires `CLAUDE_CODE_ENABLE_TELEMETRY=1`:

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
<TabItem value="langsmith" label="LangChain / LangSmith">

LangChain emits OTel when LangSmith's OTel export is enabled with `LANGSMITH_OTEL_ENABLED=true`:

```bash
export LANGSMITH_OTEL_ENABLED=true
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
<TabItem value="litellm" label="LiteLLM Proxy">

Enable the `otel` callback in your LiteLLM proxy config, then set the standard exporter variables:

```yaml
# config.yaml
litellm_settings:
  callbacks: ["otel"]
```

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
</Tabs>

After setting the variables, restart the application or gateway so they take effect.

#### Step 3: Verify Traces in Cost Explorer

1. Wait for traces to flow. They usually appear within a few minutes; allow up to about 20 minutes.
2. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
3. Select the **AI Traces** view or group by **Service Name**.
4. Look for the service name (from the `service.name` attribute in traces).
5. Select a service row to open the **Service Traces** drawer.
6. Inspect recent runs, span waterfalls, and per-span cost attribution.

<!-- SCREENSHOT NEEDED: Cost Explorer with the AI Traces view (or Service Name grouping) showing the service row -->
<!-- SCREENSHOT NEEDED: Service Traces drawer showing the span waterfall and per-span cost -->

#### Step 4: (Optional) Send a Test Trace

Before wiring up the full application, confirm the endpoint and token work by sending a single test span with `curl`.

Replace `<ACCOUNT_ID>` with the account identifier and `<YOUR_TOKEN>` with the token from Step 1, then run:

```bash
curl --request POST \
  --url 'https://app.harness.io/udp-ingest/otel/v1/traces?accountIdentifier=<ACCOUNT_ID>&routingId=<ACCOUNT_ID>' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer <YOUR_TOKEN>' \
  --data '{
  "resourceSpans": [
    {
      "resource": {
        "attributes": [
          { "key": "harness.account.id", "value": { "stringValue": "<ACCOUNT_ID>" } },
          { "key": "service.name", "value": { "stringValue": "test-service" } }
        ]
      },
      "scopeSpans": [
        {
          "scope": { "name": "otlp-test-client" },
          "spans": [
            {
              "traceId": "aabbccdd11223344aabbccdd11223344",
              "spanId": "0000000000000001",
              "name": "test-span",
              "startTimeUnixNano": "1786104000000000000",
              "endTimeUnixNano": "1786104000500000000"
            }
          ]
        }
      ]
    }
  ]
}'
```

**Note:** `startTimeUnixNano` and `endTimeUnixNano` are example nanosecond timestamps (they resolve to a 2026 date). If the test span does not appear, regenerate current values. For example, run `date +%s` and append nine zeros for nanoseconds.

Then open the **AI Traces** view in Cost Explorer and look for `test-service`. It usually appears within a few minutes; allow up to about 20 minutes. <!-- SCREENSHOT NEEDED: Cost Explorer AI Traces view showing the test-service test span -->

</TabItem>
<TabItem value="harness-sdk" label="Harness SDK (Python)">

### Harness SDK (Python)

**Use this path if** your app calls the model provider SDK directly, with no orchestration framework, and does not yet emit GenAI OTel traces. You add the OTel SDK and GenAI instrumentation to the provider SDK calls.

#### Instrumentation Overview

OpenTelemetry GenAI instrumentation has three parts:

1. **OTel SDK:** Initialized inside the application process. Manages trace context, span creation, and export.
2. **GenAI instrumentation libraries:** Auto-instrument LLM SDKs (OpenAI, Anthropic, Bedrock via LiteLLM) and AI frameworks (LangChain, LlamaIndex) to emit spans with **GenAI semantic conventions**. This is the critical part that standard OTel instrumentation does not provide.
3. **OTLP exporter:** Ships spans to the Harness OTLP endpoint over HTTPS with bearer token authentication.

<details>
<summary>How GenAI instrumentation differs from standard OTel</summary>

- **Standard OTel:** Instruments HTTP requests, database queries, and function calls. Captures latency, errors, and status codes.
- **GenAI OTel:** Instruments LLM calls specifically. Captures model name, token counts, prompt/response (optional), and cost calculation inputs.
- **Key attributes only in GenAI instrumentation:** `gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`.

**You need both for full observability:** Standard OTel shows how the application works, GenAI OTel shows what the LLM costs.

</details>

#### Choose an Instrumentation Approach

Three options depending on the stack:

| Approach | Best for |
|----------|----------|
| **Harness SDK (Python)** | Python apps using LiteLLM, Anthropic SDK, OpenAI SDK, FastAPI, Flask, Django. |
| **Framework Instrumentation** | LangChain, LlamaIndex, OpenAI Agents SDK, Google ADK. Go to the **Framework Instrumentation** tab. |
| **Manual instrumentation** | Custom agents, non-standard frameworks, polyglot apps. Go to [Manual Instrumentation](#manual-instrumentation-advanced). |

The rest of this tab covers the Harness SDK.

#### Installation

Install the SDK with the extra for the LLM client.

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

#### Configuration

Set these environment variables to point the SDK at the Harness endpoint:

```bash
export HA_SERVICE_NAME="my-ai-service"
export HA_REPORTING_ENDPOINT="https://app.harness.io/udp-ingest/otel/v1/traces?accountIdentifier=<ACCOUNT_ID>&routingId=<ACCOUNT_ID>"
export HA_REPORTING_TRACE_REPORTER_TYPE=OTLP_HTTP
export HA_REPORTING_TOKEN="<YOUR_TOKEN>"
```

<details>
<summary>What each variable does, and where to get the values</summary>

| Variable | Purpose |
|----------|---------|
| `HA_SERVICE_NAME` | Service name that appears in Cost Explorer (example: `customer-support-bot`, `research-agent`). |
| `HA_REPORTING_ENDPOINT` | Harness UDP ingest endpoint with account ID. Replace `<ACCOUNT_ID>` with the actual account identifier (find it in the Harness URL when logged in). |
| `HA_REPORTING_TOKEN` | Service account token generated in the Route Existing Traces tab, Step 1. |

**Where to get these values:**
- `<ACCOUNT_ID>`: In the Harness URL when logged in (example: `app.harness.io/ng/account/abc123/...` → account ID is `abc123`).
- `<YOUR_TOKEN>`: Generated in the Route Existing Traces tab, Step 1.

</details>

#### Instrumentation Code

Add these two lines at the **start of the application**, before importing AI libraries:

```python
from harness_sdk.agent import Agent
Agent().instrument()
```

:::warning Call instrument() before importing AI libraries
Call `Agent().instrument()` **before** importing LLM SDKs (LiteLLM, OpenAI, Anthropic) or web frameworks (FastAPI, Flask). The SDK patches these libraries at import time via monkey-patching. If libraries are imported first, they will not be instrumented.

Python's import system executes module code once. If `import openai` runs before `Agent().instrument()`, the SDK cannot patch the OpenAI client and spans will not be emitted.
:::

**Complete examples**

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

#### Verify Traces in Cost Explorer

1. Run the application with instrumentation enabled.
2. Trigger an LLM call (via API request, CLI, or test script).
3. Wait for traces to appear. They usually land within a few minutes; allow up to about 20 minutes.
4. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
5. Select the **AI Traces** view or group by **Service Name**.
6. Look for the service name (from the `HA_SERVICE_NAME` environment variable).
7. Select a service row to open the **Service Traces** drawer.
8. Inspect spans, token counts, and per-span cost.

<!-- SCREENSHOT NEEDED: Cost Explorer AI Traces view showing the instrumented service and its spans -->
<!-- SCREENSHOT NEEDED: Service Traces drawer with the span waterfall and per-span token counts -->

</TabItem>
<TabItem value="framework" label="Framework Instrumentation">

### Framework Instrumentation

**Use this path if** an orchestration framework (LangChain, LlamaIndex, OpenAI Agents SDK, Google ADK) runs your calls and has built-in OpenTelemetry support or official instrumentation libraries. This captures the full workflow: tool calls, retries, and loops.

:::note
The Harness SDK also works if your framework routes through LiteLLM, but it captures only the LLM call, not the surrounding workflow.
:::

#### Shared OpenTelemetry Setup

Every framework tab below uses the same OpenTelemetry exporter setup. Run it **once** at application startup, then add the framework-specific instrumentor from the matching tab. Replace `<YOUR_TOKEN>` with your service account token (generated in the Route Existing Traces tab, Step 1) and adjust the endpoint for your Harness cluster.

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

provider = TracerProvider()
provider.add_span_processor(
    BatchSpanProcessor(
        OTLPSpanExporter(
            endpoint="https://app.harness.io/udp-ingest/otel/v1/traces",
            headers={"Authorization": "Bearer <YOUR_TOKEN>"},
        )
    )
)

# Register `provider` as the global tracer provider so instrumentors and
# `trace.get_tracer(...)` calls below pick it up.
trace.set_tracer_provider(provider)
```

<Tabs>
<TabItem value="langchain" label="LangChain / LangGraph" default>

**Best for:** LangChain or LangGraph applications without LiteLLM.

LangChain and LangGraph can export traces through [LangSmith's OpenTelemetry support](https://docs.smith.langchain.com/observability/how_to_guides/trace_with_opentelemetry) or the [OpenInference LangChain instrumentation](https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-langchain).

**Option 1: LangSmith OTel (official)**

Set these environment variables:

```bash
export LANGSMITH_OTEL_ENABLED=true
export LANGSMITH_TRACING=true
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
```

**Note:** LangSmith appends `/v1/traces` to the endpoint, so use the base path (`/udp-ingest/otel`) here.

**Option 2: OpenInference LangChain instrumentation (community)**

Install the instrumentation library:

```bash
pip install openinference-instrumentation-langchain \
  opentelemetry-sdk opentelemetry-exporter-otlp
```

Complete the shared OpenTelemetry setup once, then add the framework instrumentor:

```python
from openinference.instrumentation.langchain import LangChainInstrumentor

# `provider` comes from the shared setup above
LangChainInstrumentor().instrument(tracer_provider=provider)
```

**What this produces:**
- One trace per LangChain invocation (chain, agent, tool).
- Nested spans for each step (LLM call, tool use, retrieval).
- GenAI semantic conventions on LLM spans.
- Cost calculated from token counts.

</TabItem>
<TabItem value="llamaindex" label="LlamaIndex">

**Best for:** LlamaIndex applications.

LlamaIndex has [built-in OpenTelemetry support](https://docs.llamaindex.ai/en/stable/module_guides/observability/observability/). Use the [OpenInference LlamaIndex instrumentation](https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-llama-index) to export traces to Harness.

Install the instrumentation library:

```bash
pip install openinference-instrumentation-llama-index \
  opentelemetry-sdk opentelemetry-exporter-otlp
```

Complete the shared OpenTelemetry setup once, then add the framework instrumentor:

```python
from openinference.instrumentation.llama_index import LlamaIndexInstrumentor

# `provider` comes from the shared setup above
LlamaIndexInstrumentor().instrument(tracer_provider=provider)
```

**What this produces:**
- One trace per LlamaIndex query or agent invocation.
- Nested spans for retrieval, LLM calls, and post-processing.
- GenAI semantic conventions on LLM spans.
- Cost calculated from token counts.

</TabItem>
<TabItem value="google-adk" label="Google ADK">

**Best for:** Google Agent Development Kit (ADK) applications.

Google's [Agent Development Kit (ADK)](https://google.github.io/adk-docs/) is instrumented with OpenTelemetry. Use the [OpenInference ADK instrumentation](https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-google-adk) to route traces to Harness.

Install the instrumentation library:

```bash
pip install openinference-instrumentation-google-adk \
  opentelemetry-sdk opentelemetry-exporter-otlp
```

Complete the shared OpenTelemetry setup once, then add the framework instrumentor:

```python
from openinference.instrumentation.google_adk import GoogleADKInstrumentor

# `provider` comes from the shared setup above
GoogleADKInstrumentor().instrument(tracer_provider=provider)
```

**What this produces:**
- One trace per ADK agent invocation.
- Nested spans for tools, LLM calls, and agent steps.
- GenAI semantic conventions on LLM spans.
- Cost calculated from token counts.

Go to the [ADK observability docs](https://google.github.io/adk-docs/observability/) to review the built-in tracing model.

</TabItem>
<TabItem value="openai-agents" label="OpenAI Agents SDK">

**Best for:** OpenAI Agents SDK applications.

The [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/tracing/) has built-in tracing. Use the [OpenInference OpenAI Agents instrumentation](https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-openai-agents) to export traces to Harness.

Install the instrumentation library:

```bash
pip install openinference-instrumentation-openai-agents \
  opentelemetry-sdk opentelemetry-exporter-otlp
```

Complete the shared OpenTelemetry setup once, then add the framework instrumentor:

```python
from openinference.instrumentation.openai_agents import OpenAIAgentsInstrumentor

# `provider` comes from the shared setup above
OpenAIAgentsInstrumentor().instrument(tracer_provider=provider)
```

**What this produces:**
- One trace per agent run.
- Nested spans for function calls, tool uses, and LLM interactions.
- GenAI semantic conventions on LLM spans.
- Cost calculated from token counts.

Go to the [OpenAI Agents SDK tracing docs](https://openai.github.io/openai-agents-python/tracing/) to configure custom processors.

</TabItem>
<TabItem value="litellm-gateway" label="LiteLLM Proxy">

**Best for:** Teams routing all LLM traffic through a LiteLLM proxy.

[LiteLLM proxy](https://docs.litellm.ai/docs/observability/opentelemetry_integration) can emit OTel traces for every LLM call via its `otel` callback.

Enable the callback in `config.yaml`:

```yaml
litellm_settings:
  callbacks: ["otel"]
```

Set these environment variables on the proxy:

```bash
export OTEL_EXPORTER="otlp_http"
export OTEL_ENDPOINT="https://app.harness.io/udp-ingest/otel/v1/traces"
export OTEL_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
```

:::note
`OTEL_EXPORTER`, `OTEL_ENDPOINT`, and `OTEL_HEADERS` are **LiteLLM-proxy-specific** variable names, not the standard OpenTelemetry SDK variables (`OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_HEADERS`, and so on) used elsewhere on this page. Use these exact names only for the LiteLLM proxy; the standard names still apply everywhere else.
:::

Restart the LiteLLM proxy. All requests routed through the proxy now emit traces to Harness.

**What this produces:**
- One span per LLM call routed through the proxy.
- Span attributes: `gen_ai.system`, `gen_ai.request.model`, token usage.
- Cost calculated from token counts and model pricing.

**Note:** This instruments the proxy, not the application code. If the application makes direct LLM calls (bypassing the proxy), those calls will not appear in telemetry.

<details>
<summary>LiteLLM Proxy vs LiteLLM SDK</summary>

- **LiteLLM SDK:** Python library imported in application code (`import litellm`). Instrument with the Harness SDK (go to the **Harness SDK** tab).
- **LiteLLM Proxy:** Standalone server that routes LLM traffic. Instrument at the proxy level (this section).
- **When to use proxy instrumentation:** All applications already route traffic through the proxy and you do not want to change application code.
- **When to use SDK instrumentation:** Applications call LLMs directly (not through a proxy) or you want instrumentation at the application level.

</details>

</TabItem>
<TabItem value="claude-code" label="Claude Code">

**Best for:** Teams using Claude Code to generate or debug AI applications.

[Claude Code](https://code.claude.com/docs/en/monitoring-usage) emits OpenTelemetry metrics and events, and trace export is available as a beta.

Set these environment variables (in shell profile, CI environment, or `~/.claude/settings.json`):

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
```

**Note:** Trace export from Claude Code is a beta capability. Go to the [Claude Code monitoring docs](https://code.claude.com/docs/en/monitoring-usage) to review the latest configuration and the list of emitted metrics, events, and traces.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

---

## Manual Instrumentation (Advanced)

Use manual instrumentation for languages the Harness SDK does not cover (Go, Java, .NET), custom agents, or when you need full control over span structure. You create spans with a standard OpenTelemetry SDK and set the [required GenAI attributes](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) yourself.

At minimum, each LLM span must set `gen_ai.provider.name` (preferred; the legacy `gen_ai.system` is also supported), `gen_ai.request.model`, `gen_ai.usage.input_tokens`, and `gen_ai.usage.output_tokens`, and export over OTLP to the Harness endpoint. Set `gen_ai.agent.name` if you want cost grouped by agent in Cost Explorer. Reuse the shared OpenTelemetry exporter setup from the **Framework Instrumentation** tab (which registers the global tracer provider that `trace.get_tracer()` reads from), then wrap each LLM call:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("llm.call") as span:
    span.set_attribute("gen_ai.provider.name", "openai")  # preferred; "gen_ai.system" also supported
    span.set_attribute("gen_ai.agent.name", "support-copilot")  # optional: groups cost by agent in Cost Explorer
    span.set_attribute("gen_ai.request.model", "gpt-4-turbo")
    # ... make the LLM call ...
    span.set_attribute("gen_ai.usage.input_tokens", resp.usage.prompt_tokens)
    span.set_attribute("gen_ai.usage.output_tokens", resp.usage.completion_tokens)
```

For other languages, use the equivalent OpenTelemetry SDK (Go, Java, .NET) and set the same attributes. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the full list.

---

## Reduce Trace Data Volume

Large prompt and response payloads and over-instrumentation inflate span volume and storage cost. To keep trace data manageable in high-traffic production:

- **Disable payload capture:** Set `HA_GEN_AI_PAYLOAD_CAPTURE_ENABLED=false` for the Harness SDK so raw prompt and response text is not stored on spans.
- **Scope instrumentation to LLM calls:** Instrument the model calls that carry cost, not every function in the application.
- **Sample a percentage of traces:** In high-traffic production, export a representative sample rather than every trace.

---

## Next Steps

- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads from each span.
- Go to [Supported Providers and Frameworks](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check which SDKs and frameworks emit these attributes natively.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
- Go to the [AI Cost Management FAQ](/docs/cloud-cost-management/faq) to review common questions.
