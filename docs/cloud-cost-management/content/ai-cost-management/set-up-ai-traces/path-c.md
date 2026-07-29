## Path C: Framework-Specific Instrumentation

**Use this path if** an orchestration framework (LangChain, LlamaIndex, OpenAI Agents SDK, Google ADK) runs your calls and has built-in OpenTelemetry support or official instrumentation libraries. This captures the full workflow: tool calls, retries, and loops.

:::note
The Harness SDK (Path B) also works if your framework routes through LiteLLM, but it captures only the LLM call, not the surrounding workflow.
:::

#### Shared OpenTelemetry Setup

Every framework tab below uses the same OpenTelemetry exporter setup. Run it **once** at application startup, then add the framework-specific instrumentor from the matching tab. Replace `<YOUR_TOKEN>` with your service account token (generated in Path A, Step 1) and adjust the endpoint for your Harness cluster.

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
- One trace per LangChain invocation (chain, agent, tool)
- Nested spans for each step (LLM call, tool use, retrieval)
- GenAI semantic conventions on LLM spans
- Cost calculated from token counts

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
- One trace per LlamaIndex query or agent invocation
- Nested spans for retrieval, LLM calls, and post-processing
- GenAI semantic conventions on LLM spans
- Cost calculated from token counts

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
- One trace per ADK agent invocation
- Nested spans for tools, LLM calls, and agent steps
- GenAI semantic conventions on LLM spans
- Cost calculated from token counts

See the [ADK observability docs](https://google.github.io/adk-docs/observability/) for the built-in tracing model.

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
- One trace per agent run
- Nested spans for function calls, tool uses, and LLM interactions
- GenAI semantic conventions on LLM spans
- Cost calculated from token counts

See the [OpenAI Agents SDK tracing docs](https://openai.github.io/openai-agents-python/tracing/) for custom processors.

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
- One span per LLM call routed through the proxy
- Span attributes: `gen_ai.system`, `gen_ai.request.model`, token usage
- Cost calculated from token counts and model pricing

**Note:** This instruments the proxy, not the application code. If the application makes direct LLM calls (bypassing the proxy), those calls will not appear in telemetry.

<details>
<summary>LiteLLM Proxy vs LiteLLM SDK</summary>

- **LiteLLM SDK:** Python library imported in application code (`import litellm`). Instrument with Harness SDK (see Path B examples).
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
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel/v1/traces
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
```

**Note:** Trace export from Claude Code is a beta capability. See the [Claude Code monitoring docs](https://code.claude.com/docs/en/monitoring-usage) for the latest configuration and the list of emitted metrics, events, and traces.

</TabItem>
</Tabs>
