## Path B: Instrument Your Application with the Harness SDK

**Use this path if** your app calls the model provider SDK directly, with no orchestration framework, and does not yet emit GenAI OTel traces. You add the OTel SDK and GenAI instrumentation to the provider SDK calls.

### Instrumentation Overview

OpenTelemetry GenAI instrumentation has three parts:

1. **OTel SDK:** Initialized inside the application process. Manages trace context, span creation, and export.
2. **GenAI instrumentation libraries:** Auto-instrument LLM SDKs (OpenAI, Anthropic, Bedrock via LiteLLM) and AI frameworks (LangChain, LlamaIndex) to emit spans with **GenAI semantic conventions** — this is the critical part that standard OTel instrumentation does not provide.
3. **OTLP exporter:** Ships spans to Harness OTLP endpoint over HTTPS with bearer token authentication.

<details>
<summary>How GenAI instrumentation differs from standard OTel</summary>

- **Standard OTel:** Instruments HTTP requests, database queries, function calls — captures latency, errors, status codes
- **GenAI OTel:** Instruments LLM calls specifically — captures model name, token counts, prompt/response (optional), cost calculation inputs
- **Key attributes only in GenAI instrumentation:** `gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`

**You need both for full observability:** Standard OTel shows how the application works, GenAI OTel shows what the LLM costs.

</details>

### Choose an Instrumentation Approach

Three options depending on the stack:

| Approach | Best for |
|----------|----------|
| **Harness SDK (Python)** | Python apps using LiteLLM, Anthropic SDK, OpenAI SDK, FastAPI, Flask, Django |
| **Framework-specific OTel** | LangChain, LlamaIndex, OpenAI Agents SDK, Google ADK |
| **Manual instrumentation** | Custom agents, non-standard frameworks, polyglot apps |

---

### Harness SDK (Python)

The Harness SDK is a Python wrapper around OpenTelemetry that simplifies instrumentation with a two-line integration. It auto-instruments popular AI libraries and frameworks, and exports spans directly to Harness with minimal configuration.

<details>
<summary>Supported libraries</summary>

- **LLM clients:** LiteLLM, Anthropic Python client, OpenAI SDK
- **Web frameworks:** FastAPI, Flask, Django
- **RPC:** gRPC (client and server)
- **HTTP clients:** requests, httpx, aiohttp
- **Cloud SDKs:** botocore (AWS SDK)
- **MCP:** Model Context Protocol

</details>

#### Installation

Install the SDK with the extra for the LLM client. <!-- TODO(harness-team): VERIFY — confirm the current pinned SDK versions below. Last verified: [date — to be confirmed] -->

```bash
# For LiteLLM
pip install "harness-sdk[litellm]==1.0.1"

# For Anthropic Python client
pip install "harness-sdk[anthropic]==1.0.1"

# For OpenAI SDK
pip install "harness-sdk[openai]==1.0.1"
```

**Note for Anthropic extra:**
The Anthropic extra requires additional packages. Install them separately if not already present:

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
| `HA_SERVICE_NAME` | Service name that appears in Cost Explorer (example: `customer-support-bot`, `research-agent`) |
| `HA_REPORTING_ENDPOINT` | Harness UDP ingest endpoint with account ID. Replace `<ACCOUNT_ID>` with the actual account identifier (find it in the Harness URL when logged in). |
| `HA_REPORTING_TOKEN` | Service account token generated in Path A, Step 1 |

**Where to get these values:**
- `<ACCOUNT_ID>`: In the Harness URL when logged in (example: `app.harness.io/ng/account/abc123/...` → account ID is `abc123`)
- `<YOUR_TOKEN>`: Generated in Path A, Step 1

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

##### Complete Examples

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
- One span per `litellm.completion()` call
- Span attributes: `gen_ai.system=anthropic`, `gen_ai.request.model=claude-3-5-sonnet-20241022`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`
- Cost calculated from token counts and Anthropic pricing

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
- One span per `client.messages.create()` call
- Span attributes: `gen_ai.system=anthropic`, `gen_ai.request.model=claude-3-5-sonnet-20241022`, token usage
- Cost calculated from token counts and Anthropic pricing

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
- One span per `client.chat.completions.create()` call
- Span attributes: `gen_ai.system=openai`, `gen_ai.request.model=gpt-4-turbo`, token usage
- Cost calculated from token counts and OpenAI pricing

</TabItem>
</Tabs>

### Verify Traces in Cost Explorer

1. Run the application with instrumentation enabled.
2. Trigger an LLM call (via API request, CLI, or test script).
3. Wait for traces to appear. They usually show within a few minutes; allow up to about 20 minutes for ingestion and cost enrichment.
4. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
5. Select the **AI Traces** view or group by **Service Name**.
6. Look for the service name (from `HA_SERVICE_NAME` environment variable).
7. Select a service row to open the **Service Traces** drawer.
8. Inspect spans, token counts, and per-span cost.

<!-- SCREENSHOT NEEDED: Cost Explorer AI Traces view showing the instrumented service and its spans -->
<!-- SCREENSHOT NEEDED: Service Traces drawer with the span waterfall and per-span token counts -->
