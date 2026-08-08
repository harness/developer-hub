---
title: GenAI Span Attribute Reference
sidebar_label: GenAI Span Attribute Reference
description: The OpenTelemetry GenAI semantic-convention attributes Cloud & AI Cost Management reads from each span to price and attribute AI cost.
keywords:
  - GenAI semantic conventions
  - span attributes
  - OpenTelemetry attributes
  - AI cost attribution
  - gen_ai
tags:
  - cloud-cost-management
  - ai-cost-management
---

**GenAI semantic conventions** are the standard OpenTelemetry attribute names for AI calls. They are what allow Cloud & AI Cost Management (CACM) to read a span and calculate cost: the provider, the model, and the token counts all come from these fields. A span that lacks them is still a valid trace, but it cannot be priced.

This page lists the attributes CACM reads, which ones are required to price a call, and which ones improve accuracy or enable grouping.

:::info GenAI semantic conventions required
CACM prices only spans that carry GenAI semantic-convention attributes. Standard HTTP, database, or function spans do not carry the model name or token counts needed for cost, so they appear in a trace but are never priced. Go to [How AI Traces Work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand how spans become cost.
:::

---

## Minimum Attributes for Pricing

If you can only send a subset of attributes, CACM needs at minimum the following to calculate cost:

| Attribute | Purpose |
|-----------|---------|
| `gen_ai.provider.name` | LLM provider (`openai`, `anthropic`, `bedrock`). The legacy `gen_ai.system` is also supported. |
| `gen_ai.request.model` | Model requested, matched against Harness pricing data. |
| `gen_ai.usage.input_tokens` | Input tokens (priced). |
| `gen_ai.usage.output_tokens` | Output tokens (priced). |

A span missing any of these cannot be priced. If you also want cost associated with a specific agent, set `gen_ai.agent.name`.

---

## Full Attribute Reference

Each LLM span is expected to carry the following attributes. The four pricing-critical fields are marked in [Minimum attributes for pricing](#minimum-attributes-for-pricing); the rest improve pricing accuracy or enable grouping by service, session, tenant, and user.

| Attribute | Purpose |
|-----------|---------|
| `service.name` | Application or service that made the call. |
| `service.namespace` | Logical grouping (domain, product area). |
| `deployment.environment.name` | Environment (`production`, `staging`, `dev`). |
| `gen_ai.operation.name` | Operation type (`chat`, `embeddings`, `tool`). |
| `gen_ai.provider.name` | LLM provider (`openai`, `anthropic`, `bedrock`). |
| `gen_ai.request.model` | Model requested. |
| `gen_ai.response.model` | Model that actually served the response. |
| `gen_ai.response.id` | Provider response identifier. |
| `gen_ai.conversation.id` | Session or conversation grouping. |
| `gen_ai.request.max_tokens` | Requested token cap. |
| `gen_ai.request.temperature` | Sampling temperature. |
| `gen_ai.response.finish_reasons` | Why generation stopped. |
| `gen_ai.usage.input_tokens` | Input tokens (priced). |
| `gen_ai.usage.cache_read.input_tokens` | Cached input tokens read (priced at cache-read rate). |
| `gen_ai.usage.cache_creation.input_tokens` | Input tokens written to cache (priced at cache-write rate). |
| `gen_ai.usage.output_tokens` | Output tokens (priced). |
| `gen_ai.usage.reasoning.output_tokens` | Reasoning tokens (priced at reasoning rate). |
| `gen_ai.input.messages` | Raw prompt text. |
| `gen_ai.output.messages` | Raw response text. |
| `tenant.id` | Customer or tenant attribution. |
| `user.id` | End-user attribution. |

---

## How Attributes Map to Cost and Grouping

The attributes fall into three roles:

- **Pricing inputs:** `gen_ai.provider.name`, `gen_ai.request.model`, and the `gen_ai.usage.*` token counts. CACM prices a span as tokens times model price using these fields.
- **Accuracy refinements:** the cache and reasoning token counts (`gen_ai.usage.cache_read.input_tokens`, `gen_ai.usage.cache_creation.input_tokens`, `gen_ai.usage.reasoning.output_tokens`) allow CACM to price at the correct per-token rate rather than the standard input/output rate.
- **Grouping dimensions:** `service.name`, `deployment.environment.name`, `gen_ai.conversation.id`, `gen_ai.agent.name`, `tenant.id`, and `user.id` allow you to group and filter cost by service, environment, session, agent, tenant, and user in Cost Explorer.

:::note Raw prompt and response text is optional
`gen_ai.input.messages` and `gen_ai.output.messages` carry the raw prompt and completion. They are useful for debugging but inflate span size. Disable payload capture if spans contain sensitive data or grow too large. Go to [Set Up AI Cost Traces](/docs/cloud-cost-management/ai-cost-management/set-up-ai-cost-traces#reduce-trace-data-volume) to reduce trace data volume.
:::

---

## Next Steps

- Go to [Set Up AI Cost Traces](/docs/cloud-cost-management/ai-cost-management/set-up-ai-cost-traces) to emit these attributes from your application.
- Go to [Supported Providers and Frameworks](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check which SDKs and frameworks emit these attributes natively.
- Go to [How AI Traces Work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand how spans become cost.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces appear without cost.
- Go to the [AI Cost Management FAQ](/docs/cloud-cost-management/faq) to review common questions.
