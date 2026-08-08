---
title: Manual Instrumentation
sidebar_label: Manual Instrumentation
description: Create GenAI spans by hand with a standard OpenTelemetry SDK for languages the Harness SDK does not cover, or when you need full control over span structure.
keywords:
  - manual instrumentation
  - OpenTelemetry
  - GenAI semantic conventions
  - AI cost traces
tags:
  - cloud-cost-management
  - ai-cost-management
---

Use this page for Go, Java, .NET, or any language the Harness SDK does not cover. You instrument LLM calls using a standard OpenTelemetry SDK and set the GenAI attributes directly — there is no wrapper. You need an ingestion token before you start; go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to get one.

:::info GenAI semantic conventions required
Cost is calculated from OpenTelemetry traces with GenAI semantic conventions. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## Required Attributes

At minimum, each LLM span must set:

- `gen_ai.provider.name` (preferred; the legacy `gen_ai.system` is also supported)
- `gen_ai.request.model`
- `gen_ai.usage.input_tokens`
- `gen_ai.usage.output_tokens`
- `gen_ai.agent.name` (so the cost can be associated with an agent)

Export the spans over OTLP to the Harness endpoint.

---

## Instrument an LLM Call

Reuse the OpenTelemetry exporter setup from the [Harness SDK](/docs/cloud-cost-management/sdk-integrations/harness-sdk) or any framework page — that registers the global tracer provider that `trace.get_tracer()` reads from. Then wrap each LLM call in a span and set the GenAI attributes:

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("llm.call") as span:
    span.set_attribute("gen_ai.provider.name", "openai")  # preferred; "gen_ai.system" also supported
    span.set_attribute("gen_ai.agent.name", "support-copilot")  # required for cost attribution
    span.set_attribute("gen_ai.request.model", "gpt-4-turbo")
    # ... make the LLM call ...
    span.set_attribute("gen_ai.usage.input_tokens", resp.usage.prompt_tokens)
    span.set_attribute("gen_ai.usage.output_tokens", resp.usage.completion_tokens)
```

For other languages, use the equivalent OpenTelemetry SDK (Go, Java, .NET) and set the same attributes.

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

- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the full attribute list.
- Go to [How AI traces work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand trace attribution in depth.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
