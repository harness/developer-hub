---
title: LangChain / LangGraph
sidebar_label: LangChain / LangGraph
description: Instrument LangChain or LangGraph applications to emit GenAI traces to Cloud & AI Cost Management, using LangSmith OTel export or the OpenInference instrumentation.
keywords:
  - LangChain
  - LangGraph
  - LangSmith
  - OpenInference
  - AI cost traces
tags:
  - cloud-cost-management
  - ai-cost-management
---

Use this integration for LangChain or LangGraph applications. LangChain can emit GenAI traces two ways, and both quickstart paths lead here:

- **Already using LangSmith (no code changes):** Turn on LangSmith's OpenTelemetry export and point it at Harness. Go to [Route existing traces (LangSmith)](#route-existing-traces-langsmith) below.
- **Not using LangSmith:** Add the OpenInference instrumentation to your application code. Go to [Instrument your app (OpenInference)](#instrument-your-app-openinference) below.

Both methods capture the full workflow: chains, tool calls, retries, and loops, not just the LLM call.

Before you start, generate an ingestion token and connect a provider. Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) for those steps. Replace `<YOUR_TOKEN>` below with that token and adjust the endpoint for your Harness cluster.

:::info GenAI semantic conventions required
Cost is calculated from OpenTelemetry traces with GenAI semantic conventions. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## Route existing traces (LangSmith)

Use this method if LangSmith already traces your application. It needs no code changes: LangChain and LangGraph emit OTel when LangSmith's OpenTelemetry export is enabled with `LANGSMITH_OTEL_ENABLED=true`, so you add that flag and point the exporter at Harness. Go to [LangSmith's OpenTelemetry support](https://docs.smith.langchain.com/observability/how_to_guides/trace_with_opentelemetry) to review the export options.

Set these environment variables, then restart the application:

```bash
export LANGSMITH_OTEL_ENABLED=true
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

:::note Alternative LangSmith configuration
Some LangSmith setups also set `LANGSMITH_TRACING=true`. If traces do not appear with the configuration above, try adding `LANGSMITH_TRACING=true`:

```bash
export LANGSMITH_OTEL_ENABLED=true
export LANGSMITH_TRACING=true
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
```
:::

---

## Instrument your app (OpenInference)

Use this method if you are not using LangSmith and need to instrument the application yourself. The [OpenInference LangChain instrumentation](https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-langchain) exports traces to Harness with a few lines of setup code.

Install the instrumentation library:

```bash
pip install openinference-instrumentation-langchain \
  opentelemetry-sdk opentelemetry-exporter-otlp
```

Configure the OpenTelemetry exporter once at application startup, then add the framework instrumentor:

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from openinference.instrumentation.langchain import LangChainInstrumentor

provider = TracerProvider()
provider.add_span_processor(
    BatchSpanProcessor(
        OTLPSpanExporter(
            endpoint="https://app.harness.io/udp-ingest/otel/v1/traces",
            headers={"Authorization": "Bearer <YOUR_TOKEN>"},
        )
    )
)
trace.set_tracer_provider(provider)

LangChainInstrumentor().instrument(tracer_provider=provider)
```

**What this produces:**
- One trace per LangChain invocation (chain, agent, tool).
- Nested spans for each step (LLM call, tool use, retrieval).
- GenAI semantic conventions on LLM spans.
- Cost calculated from token counts.

---

## Reduce Trace Data Volume

Large payloads and over-instrumentation inflate span volume and storage cost. To keep trace data manageable in high-traffic production:

- **Scope instrumentation to LLM calls:** Instrument the model calls that carry cost, not every function in the application.
- **Sample a percentage of traces:** Export a representative sample rather than every trace.

---

## Verify Traces in Cost Explorer

1. Run the application so traces flow. They usually appear within a few minutes; allow up to about 20 minutes.
2. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
3. Select the **AI Traces** view or group by **Service Name**, and find your service.
4. Select a service row to open the **Service Traces** drawer and inspect the span waterfall.

---

## Next Steps

- Go to [Supported Providers and Frameworks](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check native GenAI export support.
- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
