---
title: OpenAI Agents SDK
sidebar_label: OpenAI Agents SDK
description: Instrument OpenAI Agents SDK applications to emit GenAI traces to Cloud & AI Cost Management using the OpenInference OpenAI Agents instrumentation.
keywords:
  - OpenAI Agents SDK
  - OpenInference
  - AI cost traces
  - OpenTelemetry
tags:
  - cloud-cost-management
  - ai-cost-management
---

Use this integration for OpenAI Agents SDK applications. Add the OpenInference OpenAI Agents instrumentation and point it at Harness. This is a code-based integration, because the OpenAI Agents SDK has no external tracing service to route from. The instrumentation captures the full workflow: function calls, tool uses, and LLM interactions, not just the LLM call.

Before you start, generate an ingestion token and connect a provider. Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) for those steps. Replace `<YOUR_TOKEN>` below with that token and adjust the endpoint for your Harness cluster.

:::info GenAI semantic conventions required
Cost is calculated from OpenTelemetry traces with GenAI semantic conventions. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## Instrument the OpenAI Agents SDK

The [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/tracing/) has built-in tracing. Use the [OpenInference OpenAI Agents instrumentation](https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-openai-agents) to export traces to Harness.

Install the instrumentation library:

```bash
pip install openinference-instrumentation-openai-agents \
  opentelemetry-sdk opentelemetry-exporter-otlp
```

Configure the OpenTelemetry exporter once at application startup, then add the framework instrumentor:

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from openinference.instrumentation.openai_agents import OpenAIAgentsInstrumentor

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

OpenAIAgentsInstrumentor().instrument(tracer_provider=provider)
```

**What this produces:**
- One trace per agent run.
- Nested spans for function calls, tool uses, and LLM interactions.
- GenAI semantic conventions on LLM spans.
- Cost calculated from token counts.

Go to the [OpenAI Agents SDK tracing docs](https://openai.github.io/openai-agents-python/tracing/) to configure custom processors.

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
