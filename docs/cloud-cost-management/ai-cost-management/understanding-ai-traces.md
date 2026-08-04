---
title: Attribute AI Costs with Traces
sidebar_label: Attribute AI Costs with Traces
sidebar_position: 2
description: What AI traces are, how Cloud & AI Cost Management attributes cost from GenAI OpenTelemetry spans, and the semantic conventions required for pricing.
keywords:
  - AI traces
  - OpenTelemetry
  - GenAI semantic conventions
  - AI cost attribution
tags:
  - cloud-cost-management
  - ai-cost-management
---

Provider connectors (OpenAI, Anthropic, AWS Bedrock, GCP Vertex AI) give accurate invoice-level costs, but they cannot answer questions like:

- Which agent is driving 80% of AI spend?
- Why did this customer conversation cost USD 4.00 when the average is USD 0.60?
- What is the cost per resolved support ticket?
- Which LLM call in this workflow loop drove the cost spike?

The provider invoice is a single lump sum with no agent, session, or step-level detail. **AI traces close that gap.** By instrumenting your AI applications to emit **OpenTelemetry traces with GenAI semantic conventions**, Harness Cloud & AI Cost Management (CACM) attributes cost down to the individual agent run, session, inference, and business outcome. The result is visibility that provider billing APIs cannot provide: you see not just *what* you spent, but *why*, and where to act.

:::info GenAI semantic conventions required
This feature requires **OpenTelemetry (OTel) traces with GenAI semantic conventions**, not just standard OTel traces. Standard HTTP, database, or function traces do not contain the LLM-specific attributes (model name, token counts) needed for cost calculation. Go to [Required span attributes for cost attribution](./set-up-ai-traces.md#required-span-attributes-for-cost-attribution) to review the attributes CACM reads.
:::

:::note Ready to instrument?
Go to [Configure AI Cost Traces](./set-up-ai-traces.md) to instrument your application and route traces to Harness.
:::

---

## What Are AI Traces?

<DocImage path={require('../static/what-is-trace.png')} width="100%" title="A single AI request represented as a trace, with each step (database lookup, LLM call, response conversion) shown as a span." />

AI traces are the telemetry records that show what happened inside an AI application when it handled a request, session, or agent run.

AI cost attribution depends on three nested ideas:

- **Telemetry** is the umbrella term for the data your application emits about its own behavior.
- **A trace** is the end-to-end record of one AI run, such as a chatbot session, an agent execution, or a pipeline job.
- **A span** is one step inside that trace, such as a retrieval step, a tool call, a function call, or an LLM call.

<div style={{backgroundColor: '#FFF8E1', border: '1px solid #FFE082', borderRadius: '6px', padding: '1rem 1.25rem'}}>

**Example: one support-agent session as a trace**

A user asks a support copilot, "Where is my order?" That single session is **one trace**.

To answer, the agent runs a few steps:

1. It **looks up the order** in the database.
2. It **sends the order details to a model** (`gpt-4-turbo`), which uses input tokens and output tokens to generate a reply.
3. It **converts the model's text response** into a chat-friendly format.

Each of these steps is a **span**, and each is costed separately. The database lookup and the conversion have zero AI cost. Only the model call step incurs a cost.

</div>

---

## What CACM Captures from a Span

For every LLM span, CACM captures:

- **Provider and model:** `gen_ai.provider.name` (preferred; legacy `gen_ai.system`) with values like `openai`, `anthropic`, and `bedrock`, plus `gen_ai.request.model` (`gpt-4-turbo`, `claude-3-5-sonnet`).
- **Token usage:** `gen_ai.usage.input_tokens` and `gen_ai.usage.output_tokens`.
- **Context:** the agent, session, tenant, team, and environment the call belongs to.
- **Prompt and completion text:** optional, for debugging. Disable it to reduce data volume.

CACM computes the cost of every span as **tokens × model price**, then rolls those costs up by agent, session, inference, and business outcome. Because the full execution path is preserved, you can drill from a session down to the exact step, and the exact LLM call, that drove the cost.

Harness attributes those costs across several levels:

- **Agent:** cost per AI agent (support copilot, research assistant, data pipeline agent).
- **Session:** cost per multi-turn conversation or workflow run.
- **Inference:** cost per individual LLM call.
- **Business outcome:** cost per resolved ticket, completed order, or answered question (custom metrics).
- **Span:** cost per step in an agent execution chain (tool call, retrieval, LLM generation).

CACM relies on GenAI semantic conventions, defined by OpenTelemetry, to calculate and attribute AI costs. By instrumenting AI workloads with these conventions, applications expose standardized attributes such as the provider, model name, input tokens, and output tokens, enabling accurate LLM cost calculation. Standard OpenTelemetry spans continue to provide end-to-end observability and execution tracing, while GenAI semantic conventions provide the AI-specific context needed for cost attribution. Go to [Required span attributes for cost attribution](./set-up-ai-traces.md#required-span-attributes-for-cost-attribution) to review the complete list of what each span must include.

At minimum, an LLM span must include:

```text
gen_ai.provider.name   # newer convention (preferred); gen_ai.system is also supported as a legacy fallback
gen_ai.request.model
gen_ai.usage.input_tokens
gen_ai.usage.output_tokens
gen_ai.agent.name      # identifies the agent the cost belongs to
```

:::note
Harness supports both the newer `gen_ai.provider.name` attribute and the legacy `gen_ai.system` attribute for identifying the provider. Prefer `gen_ai.provider.name` for new instrumentation.

`gen_ai.agent.name` is required so Harness can associate the cost with a specific agent. Without it, the LLM cost cannot be attributed to anything.
:::

Without these attributes, Harness can still receive the trace, but it cannot calculate cost for that LLM span.

Non-LLM spans are still useful. Retrieval, tool, and function spans provide the execution context around the LLM call. They help explain why a session was expensive, whether an agent looped too many times, which tool chain caused a spike, or which step in the workflow drove token usage.

This diagram shows how AI traces flow from AI applications to Harness Cost Explorer:

<DocImage path={require('../static/ai-traces-architecture.png')} width="100%" title="AI traces flow: an AI application emits GenAI spans through the OpenTelemetry SDK, an OTLP exporter ships them over HTTPS to Harness ingestion, which prices spans and stores them in Cost Explorer." />

---

## Capabilities

| Capability | What it enables |
|------------|-----------------|
| **Cost per agent** | Total cost for each AI agent (support bot, research assistant, data pipeline). Compare agent efficiency, identify high-cost agents, and set per-agent budgets with alerts. |
| **Cost per session** | Total cost for a multi-turn conversation or workflow run. Drill into a session to see every LLM call, tool use, and token count, and debug sessions that cost 4× the average. |
| **Cost per inference** | Cost for a single LLM call. Compare across models, providers, and prompt variations, and measure the cost impact of caching, batching, or other optimizations. |
| **Cost per business outcome** | Define custom outcomes (resolved ticket, completed order, answered question), measure cost per outcome against revenue or customer value, and report AI ROI with concrete numbers. |
| **Span-level cost attribution** | Drill down from session to agent to run to step to LLM call to see which step drove cost (retrieval, tool call, LLM generation) and spot loops or retries that inflate cost. |
| **Token-level breakdown** | Input tokens vs output tokens per call, plus cache reads vs cache writes for models that support prompt caching, useful for optimizing prompt design and caching strategies. |

---

## The Three Layers of an AI Request

Before choosing a setup path, it helps to separate the three layers involved in an AI request: inference, orchestration, and instrumentation.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1.5rem 0', alignItems: 'start'}}>

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
<span style={{fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ifm-color-success-dark)', border: '1px solid var(--ifm-color-success)', borderRadius: '999px', padding: '0.1rem 0.6rem', whiteSpace: 'nowrap'}}>Needed for visibility</span>
<span style={{fontWeight: 600, fontSize: '1.05rem'}}>Instrumentation layer</span>
</div>

Observes what happened and emits OpenTelemetry traces with GenAI semantic conventions. This is the layer Harness CACM reads.

- **Examples:** Harness SDK, OpenTelemetry SDK, OpenInference, framework tracing, LiteLLM proxy OTel export, custom spans.
- **Records, does not decide:** It captures what happened and the GenAI attributes Harness needs to calculate cost; it does not choose which calls to make.

</div>

</div>

---

## The Problems AI Traces Solve

AI traces are not only about collecting more telemetry. They give CACM enough context to explain AI spend at the level you care about: agent, session, tenant, team, environment, model, workflow step, or business outcome.

Provider billing tells you how much you spent with a model provider. AI traces explain why that spend happened, who or what caused it, and where to optimize.

| If you want to | You are trying to answer | How CACM helps |
| --- | --- | --- |
| Understand spend by agent | Which agent, copilot, or AI feature is driving most of our cost? | Groups AI cost by agent in [Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective) so you can compare usage, identify expensive agents, and set budgets. |
| Debug expensive sessions | Why did this one conversation or agent run cost more than usual? | Lets you drill into a session and see which model call, retry, tool use, or loop drove the cost. |
| Allocate cost to customers | Which tenant, customer, or organization generated this AI spend? | Attributes AI cost to customers or tenants with [Cost Categories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories) so teams can support customer-level reporting. |
| Allocate cost to teams or services | Which internal team, service, or environment owns this AI usage? | Groups spend by ownership dimensions with [Cost Categories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories) for showback, chargeback, budgeting, and accountability. |
| Optimize model usage | Which provider or model is most expensive for this workflow? | Compares cost across providers, models, and workflows in [Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective) so teams can optimize routing or model choice. |
| Find workflow inefficiencies | Are tool calls, retries, retrieval steps, or agent loops causing cost spikes? | Shows the execution path around LLM calls so teams can find repeated calls, unnecessary loops, or inefficient workflows. |
| Measure unit economics | What is the cost per resolved ticket, completed task, generated report, or business outcome? | Rolls AI cost up to business outcomes so teams can evaluate ROI, not just raw spend. |
| Monitor and control AI spend | Can we budget, alert, or investigate spend by agent, tenant, team, or environment? | Enables [Budgets](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) and [anomaly detection](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/getting-started-with-ccm-anomaly-detection) based on the dimensions that matter. |

---

## Limitations and Caveats

Understand these before presenting AI trace costs to finance or relying on them for production decisions.

<details>
<summary>Costs are approximate, not billed</summary>

- Telemetry calculates cost from token counts (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`) and published model pricing.
- **Typical accuracy is ~95-98%** compared to actual invoices for standard API usage at list pricing.
- Actual billed costs may differ due to:
  - **Volume discounts or enterprise pricing:** customer-specific pricing not reflected in published rates.
  - **Promotional credits or free-tier usage:** discounts applied at billing time.
  - **Billing adjustments or refunds:** manual corrections by the provider.
  - **Pricing changes:** rate changes between call time and invoice date.
  - **Batching or caching discounts:** provider-specific cost optimizations. For example, prompt caching reduces input token costs by 90% on cache hits, but telemetry uses the full rate unless cache attributes are captured.
- **Typical delta:** for most customers, telemetry costs are within 2-5% of invoiced costs. Customers with volume discounts may see 10-20% deltas.
- **Rule:** use telemetry for relative comparisons (Agent A costs 3× Agent B), debugging high-cost sessions, and trend analysis. Use [provider connectors](../get-started/get-started.md) for finance reporting, invoice reconciliation, and chargeback. When a connector and traces disagree, trust the connector.

</details>

<details>
<summary>Only shows costs for instrumented code</summary>

- If only 50% of AI calls are instrumented, telemetry only shows 50% of costs.
- Uninstrumented code paths (legacy systems, third-party services) do not appear in Cost Explorer.

</details>

<details>
<summary>Requires ongoing maintenance</summary>

- When you add new AI features, agents, or frameworks, instrument them or they do not appear in telemetry.
- When you upgrade frameworks or LLM SDKs, verify that instrumentation still works.

</details>

<details>
<summary>No historical data</summary>

- Telemetry tracks costs only from the moment instrumentation is enabled. No historical backfill is available.
- For historical AI spend, use provider connectors (OpenAI provides 90 days, Anthropic provides 30 days).
- **Common scenario:** you instrument telemetry in production on June 1. Cost Explorer shows telemetry data starting June 1, but provider connector data goes back 90 days (to March 1 for OpenAI).

</details>

<details>
<summary>Not a replacement for observability platforms</summary>

- Harness telemetry focuses on cost attribution, not latency, errors, or debugging.
- For full observability (logs, metrics, traces, error tracking), use Datadog, New Relic, Honeycomb, or a similar platform alongside Harness.
- You can send traces to both Harness and another backend. Configure multiple OTLP exporters or use a collector to fan out traces.

</details>

---

## Glossary

<details>
<summary>Expand the glossary</summary>

- **CACM (Cloud & AI Cost Management):** the Harness module this feature belongs to.
- **Telemetry:** the umbrella term for the data your application emits about its own behavior. Here it means the traces and spans Harness reads to attribute AI cost.
- **Trace:** the end-to-end record of one request or run: one chatbot session, one agent execution, one pipeline job.
- **Span:** a single timed operation inside a trace: one LLM call, one tool call, one retrieval step. A trace is a tree of spans.
- **Instrumentation:** the code or library that observes your application and emits spans. Examples: the Harness SDK, OpenInference, a framework's native export, or manual OpenTelemetry.
- **OpenTelemetry (OTel):** the open standard for generating and exporting telemetry (traces, metrics, and logs).
- **OTLP (OpenTelemetry Protocol):** the wire protocol OpenTelemetry uses to send telemetry to a backend such as Harness. When this page says "OTLP endpoint," it means the Harness URL that receives your traces.
- **OpenTelemetry SDK:** the in-process library that creates spans, manages trace context, and exports them over OTLP.
- **GenAI semantic conventions:** the OpenTelemetry attribute names for AI calls (for example `gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`). Harness needs these to calculate cost. Go to [Required span attributes for cost attribution](./set-up-ai-traces.md#required-span-attributes-for-cost-attribution) to review the full list.
- **Bearer token:** a secret string sent in the `Authorization` header that authenticates your trace export to Harness. Treat it like a password.
- **Monkey-patching:** a technique where the Harness Python SDK wraps LLM libraries at import time so their calls are traced automatically. This is why `Agent().instrument()` must run before you import those libraries.
- **OTel callback:** a hook (for example in a LiteLLM proxy) that emits an OpenTelemetry span for each call without changing your application code.

</details>

---

## Next Steps

- Go to [Configure AI Cost Traces](./set-up-ai-traces.md) to instrument your application and route traces to Harness.
- Go to [Introduction to AI cost management](./introduction-to-ai-cost-management.md) to review the three levels of AI cost visibility.
