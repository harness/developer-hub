---
title: How AI Traces Work
sidebar_label: How AI Traces Work
description: How Cloud & AI Cost Management attributes cost from GenAI OpenTelemetry spans, the three layers of an AI request, and the limits of trace-based cost.
keywords:
  - AI traces
  - OpenTelemetry
  - GenAI semantic conventions
  - AI cost attribution
tags:
  - cloud-cost-management
  - ai-cost-management
redirect_from:
  - /docs/cloud-cost-management/ai-cost-management/understanding-ai-traces
---

A provider invoice arrives as a single lump sum: it shows total spend, but not which agent, session, or request incurred it.

AI traces break that lump sum down. When your application emits OpenTelemetry traces with GenAI semantic conventions, Cloud & AI Cost Management (CACM) attributes cost to the individual agent run, session, inference, and business outcome. This page explains how that works, before you set it up.

:::info GenAI semantic conventions required
This depends on OpenTelemetry traces with GenAI semantic conventions, not just standard OpenTelemetry traces. Standard HTTP, database, or function spans do not carry the model name or token counts CACM needs to calculate cost. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## Traces and Spans

<DocImage path={require('../static/what-is-trace.png')} width="100%" title="A single AI request represented as a trace, with each step (database lookup, LLM call, response conversion) shown as a span." />

AI cost attribution depends on three nested ideas:

| Term | What it means |
|------|---------------|
| **Telemetry** | The umbrella term for the data your application emits about its own behavior. |
| **Trace** | The end-to-end record of one AI run, such as a chatbot session, an agent execution, or a pipeline job. |
| **Span** | One step inside that trace, such as a retrieval step, a tool call, a function call, or an LLM call. |

Consider one support-agent session. A user asks a support copilot, ***"Where is my order?"*** That whole exchange is **one trace**. Inside it:

1. The agent **looks up the order** in a database. This is a span with *zero AI cost*.
2. It **sends the order details to a model** (`gpt-4-turbo`), which uses input and output tokens. This is the span that *actually costs money*.
3. It **converts the model's response** into a chat-friendly format. This is another *zero-cost* span.

CACM prices each LLM span as **tokens times model price**, then rolls those costs up by agent, session, inference, and any business outcome you define. Because the full execution path is preserved, you can drill from a session down to the exact LLM call that drove the cost.

Non-LLM spans carry no cost themselves, but they provide the execution context that explains why a session was expensive: whether an agent looped too many times, which tool chain caused a spike, or which step drove token usage.

### GenAI traces are not the same as standard OpenTelemetry

If you already run OpenTelemetry, your existing traces do not automatically produce AI cost. Standard OpenTelemetry and GenAI instrumentation capture different things:

- **Standard OpenTelemetry:** Instruments HTTP requests, database queries, and function calls. Captures latency, errors, and status codes.
- **GenAI OpenTelemetry:** Instruments LLM calls specifically. Captures the model name, token counts, optional prompt and response text, and the inputs CACM needs to calculate cost.

The attributes CACM prices from, such as `gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`, and `gen_ai.usage.output_tokens`, only appear when the calls are instrumented with GenAI semantic conventions. A standard HTTP or database span does not carry them, so CACM records it but cannot attribute cost to it.

You need both for full visibility: standard OpenTelemetry shows how the application behaves, and GenAI OpenTelemetry shows what the LLM costs.

<DocImage path={require('../static/ai-traces-architecture.png')} width="100%" title="AI traces flow: an AI application emits GenAI spans through the OpenTelemetry SDK, an OTLP exporter ships them over HTTPS to Harness ingestion, which prices spans and stores them in Cost Explorer." />

---

## The Three Layers of an AI Request

Before you choose a setup path, it helps to separate the three layers involved in an AI request: inference, orchestration, and instrumentation.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0', alignItems: 'start'}}>

<div style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start'}}>
<span style={{fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ifm-color-primary)', border: '1px solid var(--ifm-color-primary)', borderRadius: '999px', padding: '0.1rem 0.6rem', whiteSpace: 'nowrap'}}>Required</span>
<span style={{fontWeight: 600, fontSize: '1.05rem'}}>Inference layer</span>
</div>

Generates the model response.

- **Examples:** OpenAI, Anthropic, AWS Bedrock, GCP Vertex AI, Azure AI Foundry.
- **Always present:** Every AI application calls a model, even with no framework or orchestration logic.

</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start'}}>
<span style={{fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ifm-color-emphasis-700)', border: '1px solid var(--ifm-color-emphasis-400)', borderRadius: '999px', padding: '0.1rem 0.6rem', whiteSpace: 'nowrap'}}>Optional</span>
<span style={{fontWeight: 600, fontSize: '1.05rem'}}>Orchestration layer</span>
</div>

Decides the steps, tools, retries, routing, retrieval, memory, and agent loops.

- **Examples:** LangChain, LlamaIndex, LiteLLM, OpenAI Agents SDK, Google ADK.
- **Why it matters:** It creates the full execution path around the model calls, so it explains why a session looped, retried, or ran expensive.

</div>

<div style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>

<div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start'}}>
<span style={{fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ifm-color-success-dark)', border: '1px solid var(--ifm-color-success)', borderRadius: '999px', padding: '0.1rem 0.6rem', whiteSpace: 'nowrap'}}>Needed for trace attribution</span>
<span style={{fontWeight: 600, fontSize: '1.05rem'}}>Instrumentation layer</span>
</div>

Observes what happened and emits OpenTelemetry traces with GenAI semantic conventions. This is the layer Harness CACM reads.

- **Examples:** Harness SDK, OpenTelemetry SDK, OpenInference, framework tracing, LiteLLM proxy OTel export, custom spans.
- **Records, does not decide:** It captures what happened and the GenAI attributes Harness needs to calculate cost. It does not choose which calls to make.

</div>

</div>

### The three parts of instrumentation

Whichever integration you use, the instrumentation layer is built from the same three parts. The Harness SDK bundles all three; an open-source setup wires them up individually.

1. **OpenTelemetry SDK:** Initialized inside the application process. Manages trace context, span creation, and export.
2. **GenAI instrumentation libraries:** Auto-instrument LLM SDKs (OpenAI, Anthropic, Bedrock via LiteLLM) and AI frameworks (LangChain, LlamaIndex) to emit spans with GenAI semantic conventions. This is the part that standard OpenTelemetry instrumentation does not provide.
3. **OTLP exporter:** Ships spans to the Harness OTLP endpoint over HTTPS with bearer token authentication.

---

## What You Can Do with Traces

Provider billing tells you how much you spent with a provider. AI traces explain why that spend happened, who or what caused it, and where to optimize.

| You want to | CACM shows you |
|-------------|----------------|
| Find which agent drives spend | Cost grouped by agent in [Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective), so you can compare usage and set per-agent budgets. |
| Debug an expensive session | Drill into a session to the exact LLM call, retry, or tool loop that drove the cost. |
| Allocate cost to customers or teams | [Cost Categories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories) map spend to tenant, team, or service for chargeback. |
| Compare models or providers | Side-by-side cost per provider and model per workflow, for routing decisions. |
| Find workflow inefficiencies | The execution path around LLM calls, so you can spot repeated calls, unnecessary loops, or inefficient workflows. |
| Measure unit economics | Cost per resolved ticket, completed order, or any custom outcome you define. |
| Monitor and control spend | [Budgets](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) and [anomaly detection](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/getting-started-with-ccm-anomaly-detection) on the dimensions that matter. |

Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads from each span.

---

## What Traces Cannot Tell You

Understand the following limitations before presenting AI trace costs to finance or using them for production decisions.

- **Approximate, not billed:** Trace cost is calculated from tokens and list pricing, so it is not the source of truth for finance. Go to [Which number to trust when they differ](#which-number-to-trust-when-they-differ) to understand how provider costs and traces diverge and which to trust.
- **Only as complete as your instrumentation:** If you instrument half your AI calls, you see half your cost. Uninstrumented code paths do not appear in Cost Explorer.
- **Requires ongoing maintenance:** When you add new agents or frameworks, instrument them or they do not appear. When you upgrade frameworks or LLM SDKs, verify that instrumentation still works.
- **No historical backfill:** Trace cost starts the moment instrumentation is enabled. For history, use a provider connector.
- **Not a general observability tool:** This is cost attribution, not latency or error tracking. Run it alongside Datadog, New Relic, or a similar platform. You can export the same traces to both.

---

## Glossary

<details>
<summary>Expand the glossary</summary>

- **CACM (Cloud & AI Cost Management):** The Harness module this feature belongs to.
- **Telemetry:** The umbrella term for the data your application emits about its own behavior. Here it means the traces and spans Harness reads to attribute AI cost.
- **Trace:** The end-to-end record of one request or run: one chatbot session, one agent execution, one pipeline job.
- **Span:** A single timed operation inside a trace: one LLM call, one tool call, one retrieval step. A trace is a tree of spans.
- **Instrumentation:** The code or library that observes your application and emits spans. Examples include the Harness SDK, OpenInference, a framework's native export, or manual OpenTelemetry.
- **OpenTelemetry (OTel):** The open standard for generating and exporting telemetry (traces, metrics, and logs).
- **OTLP (OpenTelemetry Protocol):** The wire protocol OpenTelemetry uses to send telemetry to a backend such as Harness. The OTLP endpoint is the Harness URL that receives your traces.
- **OpenTelemetry SDK:** The in-process library that creates spans, manages trace context, and exports them over OTLP.
- **GenAI semantic conventions:** The OpenTelemetry attribute names for AI calls, such as `gen_ai.provider.name`, `gen_ai.request.model`, and `gen_ai.usage.input_tokens`. Harness needs these to calculate cost. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the full list.
- **Bearer token:** A secret string sent in the `Authorization` header that authenticates your trace export to Harness. Treat it like a password.
- **Monkey-patching:** A technique where the Harness Python SDK wraps LLM libraries at import time so their calls are traced automatically. This is why `Agent().instrument()` must run before you import those libraries.
- **OTel callback:** A hook (for example in a LiteLLM proxy) that emits an OpenTelemetry span for each call without changing your application code.

</details>

---

## Which Number to Trust When They Differ

Provider costs and trace costs are computed differently, so their totals will not match exactly:

- **Provider costs** are the billed amounts from the provider's billing API. They include volume discounts, promotional credits, and billing adjustments, which makes them the source of truth for finance.
- **Trace costs** are computed by Harness as token count times published list price. List price does not include your discounts, credits, or billing adjustments, so trace totals are an estimate, typically 95 to 98% accurate against the invoice.

Use traces for attribution and relative comparison, and use the connector for any billed figure. When a connector and traces disagree on an absolute amount, trust the connector.

---

## Historical Data on First Sync

When you connect a provider, Harness backfills as much history as the provider exposes. The window is capped per provider: OpenAI provides 90 days and Anthropic provides 30 days. Cloud connectors (Bedrock, Vertex AI, Azure AI Foundry) are limited to the underlying billing-export retention. Trace cost has no backfill; it starts the moment instrumentation is enabled.

---

## Next Steps

- Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to instrument your application and route traces to Harness.
- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads.
- Go to [Supported Providers and Frameworks](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check which SDKs and frameworks emit these attributes natively.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
- Go to the [AI Cost Management FAQ](/docs/cloud-cost-management/faq) to review common questions.
