---
title: Configure AI Cost Traces
sidebar_label: Configure AI Cost Traces
sidebar_position: 3
---


import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

After you understand [how AI traces work](./understanding-ai-traces.md), the next step is to set them up so your AI applications send OpenTelemetry traces to Harness Cloud & AI Cost Management (CACM). There are multiple setup paths depending on your stack. This page helps you choose the one that fits and walks you through it, from generating an ingestion token to verifying traces in Cost Explorer.

:::info GenAI semantic conventions required
This feature requires **OpenTelemetry (OTel) traces with GenAI semantic conventions** — not just standard OTel traces. Standard HTTP, database, or function traces do not contain the LLM-specific attributes (model name, token counts) needed for cost calculation. Go to [Required span attributes](#required-span-attributes-for-cost-attribution) to see what attributes are needed.
:::

## Before You Begin

Before you start, confirm you have:

- **A Harness account with AI Cost Management enabled.** The feature is gated by a feature flag; verify that **AI Cloud Providers** appears under **Cloud & AI Cost Management** > **Account Settings**. If it does not, [contact Harness Support](#get-help) to enable it. <!-- TODO(harness-team): VERIFY — required plan/edition tier for AI Traces -->
- **Permission to create a service account** (or an existing service-account token for trace ingestion). Path A generates this token as its first step.
- **A provider connector (recommended).** Needed for invoice-accurate costs and to verify coverage across providers.
- **A runtime for the quickstart:** Python 3.8+ if you plan to use the Harness SDK, or just `curl` for the test trace. <!-- TODO(harness-team): VERIFY — minimum supported Python version -->
- **Network egress** from your app or shell to the Harness OTLP endpoint (`https://app.harness.io/udp-ingest/otel/v1/traces`, or your cluster's equivalent).

---

## Required Span Attributes for Cost Attribution

**GenAI semantic conventions** are the standard OpenTelemetry attribute names for AI calls. They are what let CACM read a span and calculate cost: the model, the provider, and the token counts all come from these fields. A span that lacks them is still a valid trace, but it cannot be priced.

For CACM to price and attribute an AI call, each LLM span must be emitted with **OpenTelemetry GenAI semantic-convention attributes**. These are the standard attribute names for AI calls: the provider, model, and token counts all come from these fields, and a span without them cannot be priced.

<details>
<summary>Expand the full attribute reference</summary>

Each LLM span is expected to carry the following attributes:

| Attribute | Purpose |
|-----------|---------|
| `service.name` | Application or service that made the call |
| `service.namespace` | Logical grouping (domain, product area) |
| `deployment.environment.name` | Environment (`production`, `staging`, `dev`) |
| `gen_ai.operation.name` | Operation type (`chat`, `embeddings`, `tool`) |
| `gen_ai.provider.name` | LLM provider (`openai`, `anthropic`, `bedrock`) |
| `gen_ai.request.model` | Model requested |
| `gen_ai.response.model` | Model that actually served the response |
| `gen_ai.response.id` | Provider response identifier |
| `gen_ai.conversation.id` | Session or conversation grouping |
| `gen_ai.request.max_tokens` | Requested token cap |
| `gen_ai.request.temperature` | Sampling temperature |
| `gen_ai.response.finish_reasons` | Why generation stopped |
| `gen_ai.usage.input_tokens` | Input tokens (priced) |
| `gen_ai.usage.cache_read.input_tokens` | Cached input tokens read (priced at cache-read rate) |
| `gen_ai.usage.cache_creation.input_tokens` | Input tokens written to cache (priced at cache-write rate) |
| `gen_ai.usage.output_tokens` | Output tokens (priced) |
| `gen_ai.usage.reasoning.output_tokens` | Reasoning tokens (priced at reasoning rate) |
| `gen_ai.input.messages` | Raw prompt text |
| `gen_ai.output.messages` | Raw response text |
| `tenant.id` | Customer or tenant attribution |
| `user.id` | End-user attribution |

</details>

:::note Minimum for pricing
If you can only send a subset, the four fields CACM needs to calculate cost at all are `gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`, and `gen_ai.usage.output_tokens`. The remaining attributes improve pricing accuracy (cache and reasoning tokens) and enable grouping by service, session, tenant, and user.
:::

---

## Select Your Path

Your setup path depends on one question: ***Does your app or gateway already emit GenAI OpenTelemetry traces?*** (For example, through OpenInference, a LiteLLM Proxy, the OpenAI Agents SDK, or Google ADK.)

If yes, you just point those traces at Harness. If no, you add instrumentation first. Not sure? Check the compatibility matrix below. Most teams start without GenAI traces.

<details>
<summary>Expand the compatibility matrix</summary>

**Model client SDKs (used for LLM inference)**

| SDK | GenAI semconv export? | Support in Harness instrumentation SDK |
|-----|-----------------------|----------------------------------------|
| OpenAI Python SDK | ✅ Yes (most mature) | ✅ Yes |
| Anthropic SDK | ✅ Yes | ✅ Yes |
| Google GenAI / Vertex SDK | ✅ Yes | ✅ Yes |
| AWS Bedrock | ✅ Yes | Coming Soon |

**Gateways**

| SDK | GenAI semconv export? | Support in Harness instrumentation SDK |
|-----|-----------------------|----------------------------------------|
| LiteLLM | ✅ Yes | ✅ Yes |
| Envoy | ❌ No | N/A |

**Agent orchestration frameworks**

| Framework | GenAI semconv export? |
|-----------|-----------------------|
| Google Agent Development Kit | ✅ Native |
| OpenAI Agents SDK ("OpenAI ADK") | ✅ Yes |
| Anthropic Agents SDK | ✅ Yes |
| Microsoft Agent Framework ("Microsoft ADK") | ✅ Native (partial) |
| Microsoft Semantic Kernel | ✅ Native (opt-in) |
| AWS Strands Agents SDK | ✅ Native |
| LangGraph / LangChain | ⚠️ Not native |
| CrewAI | ⚠️ Mixed |
| LlamaIndex | ⚠️ Not native |
| Pydantic AI | ✅ Native |
| AutoGen / AG2 | ⚠️ Partial |
| Haystack | ⚠️ Not native |
| Smolagents | ⚠️ Not native |

</details>

Select the answer that matches your stack to jump to the full setup steps.

<DynamicMarkdownSelector
  options={{
    "Yes: Route existing traces (Path A)": {
      path: "/cloud-cost-management/content/ai-cost-management/set-up-ai-traces/path-a.md"
    },
    "No, I call the SDK directly: Harness SDK (Path B)": {
      path: "/cloud-cost-management/content/ai-cost-management/set-up-ai-traces/path-b.md"
    },
    "No, I use a framework: Framework-specific (Path C)": {
      path: "/cloud-cost-management/content/ai-cost-management/set-up-ai-traces/path-c.md"
    }
  }}
  disableSort={true}
/>

## Manual Instrumentation (Advanced)

Use manual instrumentation for languages the Harness SDK does not cover (Go, Java, .NET), custom agents, or when you need full control over span structure. You create spans with a standard OpenTelemetry SDK and set the [required GenAI attributes](#required-span-attributes-for-cost-attribution) yourself.

At minimum, each LLM span must set `gen_ai.provider.name` (preferred; the legacy `gen_ai.system` is also supported), `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, and `gen_ai.agent.name` (so the cost can be associated with an agent), and export over OTLP to the Harness endpoint. Reuse the shared OpenTelemetry exporter setup from Path C (which registers the global tracer provider that `trace.get_tracer()` reads from), then wrap each LLM call:

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

For other languages, use the equivalent OpenTelemetry SDK (Go, Java, .NET) and set the same attributes. See [Required span attributes](#required-span-attributes-for-cost-attribution) for the full list.

---

## Troubleshooting

<Troubleshoot
  issue="No traces appear in Cost Explorer after 5 minutes"
  mode="docs"
  fallback="Confirm the OTLP endpoint matches your Harness cluster (for example app.harness.io vs app3.harness.io), the service account token is valid, and the application can reach https://app.harness.io/udp-ingest/otel/v1/traces (test with curl from the same environment). Check the application logs for OTLP exporter activity, and for the Harness SDK make sure Agent().instrument() runs before importing AI libraries. Set OTEL_LOG_LEVEL=debug to surface export errors."
/>
<!-- VERIFY: OTEL_LOG_LEVEL is the Python SDK convention; exporter debug-logging variables vary by language SDK. -->

<Troubleshoot
  issue="Traces appear but no cost is shown"
  mode="docs"
  fallback="Cost calculation requires the GenAI attributes gen_ai.system, gen_ai.request.model, gen_ai.usage.input_tokens, and gen_ai.usage.output_tokens on each span, with non-zero token counts and a model identifier that matches Harness pricing data. Open Cloud and AI Cost Management, then Cost Explorer, select the AI Traces view, open the Service Traces drawer, inspect a span, and confirm these attributes are present and non-zero. If they are missing, update your instrumentation to emit them; if they are present but cost is still zero, contact Harness Support with the trace ID and model identifier."
/>

<Troubleshoot
  issue="High data volume or cost"
  mode="docs"
  fallback="Large prompt and response payloads and over-instrumentation inflate span volume and storage cost. Disable payload capture (HA_GEN_AI_PAYLOAD_CAPTURE_ENABLED=false for the Harness SDK), scope instrumentation to LLM calls only, and sample a percentage of traces in high-traffic production. See the Reduce trace data volume section for configuration examples."
/>

<Troubleshoot
  issue="Costs do not match provider invoices"
  mode="docs"
  fallback="This is expected. Telemetry costs are approximate, calculated from token counts and published model pricing, so they differ from billed costs due to volume discounts, credits, refunds, and pricing changes. Pair telemetry with a provider connector for accurate billed costs, and use telemetry for debugging and relative comparisons rather than finance reporting."
/>

---

## FAQ

**Do I need a provider connector?** Not to start, but it is strongly recommended. Trace costs are approximate; a [provider connector](../get-started/get-started.md) gives invoice-accurate totals. See [Before you begin](#before-you-begin).

**Will instrumentation slow down my app?** Export is batched on a background thread and should not block LLM calls.

**My framework is not listed, what do I do?** Check the [compatibility matrix](#select-your-path). If it emits OpenTelemetry, route existing traces with Path A; otherwise use [manual instrumentation](#manual-instrumentation-advanced).

**Can I test without touching production?** Yes. Send a test trace with Path A, or instrument a dev/staging service first.

**Why do the costs not match my provider bill?** They are approximate by design (~95-98%). Use a provider connector for finance. See [Before you begin](#before-you-begin) and [Limitations and caveats](./understanding-ai-traces.md#limitations-and-caveats).

**Who can see my prompts and completions?** Access maps to Harness RBAC (specifics [to be confirmed]). If prompts may contain sensitive data, disable payload capture.

**What does the feature cost?** Whether ingestion or storage carries a charge is [to be confirmed].

**How long is trace data kept?** Retention is [to be confirmed].

---

## Get Help

If you are stuck, [contact Harness Support](https://support.harness.io/) or your Harness account team. To speed up diagnosis, include:

- Your **account ID** and **Harness cluster** (for example `app3.harness.io`).
- A **trace ID** and the **model identifier** (`gen_ai.request.model`) for any span that shows no cost.
- Which setup path you are on (route existing traces, Harness SDK, or framework-specific), and your instrumentation method.

<!-- TODO(harness-team): VERIFY — official support channel URL and response-time SLA by plan tier -->

---

## Next Steps

**After telemetry is flowing:**
- Go to [Explore and analyze AI spend](../get-started/overview.md) to filter costs by agent, session, or tenant.
- Go to [Set up budgets and anomaly detection](/docs/category/budgets) to govern AI spend.
- Go to [Cost Categories](../3-use-ccm-cost-reporting/2-ccm-cost-categories/cost-categories.md) to map AI spend to teams and products.

**Optimize instrumentation:**
- Review span volume and data size in Cost Explorer. Disable payload capture if spans are too large.
- Add custom attributes (team, environment, customer) to enable richer cost attribution.
- Instrument additional agents or services as the AI stack grows.

**Measure business outcomes:**
- Define custom outcome metrics (cost per resolved ticket, cost per completed order).
- Track cost per outcome over time and set targets (example: reduce cost per ticket by 20% this quarter).
- Compare agent efficiency (which agent delivers the best cost per outcome?).
