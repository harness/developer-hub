---
title: Introduction to AI cost management
sidebar_label: Introduction to AI cost management
sidebar_position: 1
---

Harness AI Cost Management extends the existing Cloud & AI Cost Management (CACM) platform to track AI spend across LLM providers, managed AI services, and AI applications. Track costs from invoice-level totals down to individual agent sessions, attribute spend to teams and products, and measure ROI per AI outcome.

<DocImage path={require('../static/get-cost-visibility-ai.png')} width="100%" height="100%" title="Get cost visibility into your AI environment" />

## Why AI Cost Management?

AI costs are invisible until the invoice arrives, and provider dashboards only show totals. Questions like "which team spent USD 12,000 on GPT-4 last week" or "why did AI spend double on Tuesday" cannot be answered without building custom pipelines.

Harness brings AI spend into the same FinOps workflow already used for cloud costs: one dashboard across providers, automatic chargeback through Cost Categories, budget alerts, and anomaly detection.

**Real example:** A customer-support copilot cost USD 28,000 last month. Is that good or bad? Harness reframes it as USD 0.60 per resolved ticket. If the bot resolves issues without human intervention, that is a clear win. If sessions cost USD 4.00 because the agent loops through unnecessary tool calls, that is a code problem to fix, not a budget problem to negotiate.

## How It Works

Connecting a provider is all you need to start. Costs flow in automatically and you can group and filter them right away. Adding traces builds on that foundation to give you per-agent and per-session attribution.

| | Requires |
|---|---|
| **Level 1: Invoice-accurate totals** | A provider connector |
| **Level 2: Cost per agent and session** | Level 1 + GenAI-instrumented traces (code changes) |

### Level 1: Connect a Provider and See Costs Flow In

In [Get started](../get-started/get-started.md), select the **AI** tab and connect OpenAI, Anthropic, AWS Bedrock, or GCP Vertex AI. The connector pulls billed costs from the provider's billing API, with no code changes required. Within 6-12 hours, your AI spend appears in the same Cost Explorer as your cloud costs.

Once data is flowing, you can group and filter by:

- **Provider:** Unified, normalized view of OpenAI, Anthropic, Bedrock, and Vertex AI spend, comparable side by side.
- **Model:** Per-model and per-version cost, input/output token volumes, and inference counts; useful for evaluating model upgrades.
- **Account and region:** Separate dev, staging, and prod accounts; geographic spend patterns.
- **Token type:** Input vs output tokens, cache reads and writes; useful for optimizing prompts and caching.
- **Custom labels:** Plus automatic chargeback via Cost Categories, CSV export, and BI integration.

**Who it's for:** Finance, FinOps, and engineering leaders who need accurate totals and chargeback. Connector data is 100% billed-accurate and is the source of truth for finance.

### Level 2: Attribute Cost to Agents and Sessions with AI Traces

A connector tells you *how much* you spent and *on which model*, but not *which agent, session, or request* drove the cost. To go one level deeper, instrument your application to emit GenAI traces. With traces you get:

- Cost per agent run, session, and inference, including multi-turn conversations
- Cost per business outcome: per resolved ticket, completed order, or customer interaction
- Drill-down to the exact LLM call and tool invocation within a run
- High-cost session debugging: surface the runs and tool loops that drive spend

Go to [Configure AI Cost Traces](./set-up-ai-traces.md) to complete the full setup: supported languages and frameworks, SDK instrumentation, and validation.

## Limitations and Known Issues

Understand these before presenting AI cost data to finance or relying on it for production decisions.

<details>
<summary>Data accuracy: connectors are authoritative, traces are approximate</summary>

- **Provider connectors** pull billed costs from the provider's billing API. This is the source of truth for finance reporting and chargeback. Use these numbers when reporting to leadership or reconciling invoices.
- **OpenTelemetry traces** calculate cost from token counts and published model pricing. These costs are approximate and can differ from billed costs due to volume discounts, promotional credits, or billing adjustments. Use traces for relative cost comparisons (this agent costs 3x that agent) and debugging, not for finance totals.

**Rule:** When a connector and traces disagree, trust the connector.

</details>

<details>
<summary>Historical data retention: how much data is available on first connect</summary>

| Provider | Historical data | Notes |
|----------|----------------|-------|
| OpenAI | 90 days | Full usage and cost data |
| Anthropic | 30 days | Full usage and cost data |
| AWS Bedrock | Depends on CUR retention | Typically 12-13 months if CUR is enabled |
| GCP Vertex AI | Depends on billing export | Typically 12 months if billing export is enabled |

**Data cannot be backfilled beyond these limits.** If older data is needed, export it from the provider before connecting to Harness.

</details>

<details>
<summary>Data freshness and ingestion delay: when costs appear in Harness</summary>

| Ingestion method | Typical delay | Notes |
|------------------|---------------|-------|
| Provider connector (OpenAI, Anthropic) | 6-12 hours | Depends on provider billing API update frequency |
| OpenTelemetry traces | 1-2 minutes | Near real-time; traces appear as soon as they are ingested |
| Cloud connector (Bedrock, Vertex AI) | 12-24 hours | Depends on CUR or billing export processing time |

**Implication for alerts:** Budget and anomaly alerts fire based on ingested data, not real-time usage. A cost spike that happens at 10:00 AM might not trigger an alert until 4:00 PM (for provider connectors) or 10:02 AM (for traces).

</details>

<details>
<summary>API key requirements: Admin keys required, not project keys</summary>

- **OpenAI:** Must be an **Admin API key** with read access to usage and billing endpoints. A standard project key will not return org-wide data. Go to [OpenAI Admin API Keys](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys/methods/create) to create one.
- **Anthropic:** Must be an **Admin API key** with read access to billing data. A workspace-level key will not return org-wide data.

**Read-only access is sufficient.** Harness does not need write permissions.

</details>