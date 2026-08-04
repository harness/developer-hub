---
title: Introduction to AI cost management
sidebar_label: Introduction to AI cost management
sidebar_position: 1
description: See AI spend across LLM providers next to your cloud costs, attribute it to teams, agents, and outcomes, and govern it with the same FinOps workflow you already use.
keywords:
  - AI cost management
  - AI spend
  - LLM cost
  - FinOps
tags:
  - cloud-cost-management
  - ai-cost-management
---

Harness AI Cost Management brings your AI spend into Cloud & AI Cost Management (CACM), the same place you already track cloud costs. Connect an LLM provider such as OpenAI or Anthropic, and within hours your AI spend appears in Cost Explorer next to your cloud bill: grouped by provider, model, team, or environment, and ready for the same budgets, alerts, and chargeback you use everywhere else.

<DocImage path={require('../static/get-cost-visibility-ai.png')} width="100%" height="100%" title="Get cost visibility into your AI environment" />

---

## Why AI Cost Management

AI costs are invisible until the invoice arrives, and provider dashboards only show a single total. You cannot answer the questions that actually drive decisions:

- Which team spent USD 12,000 on GPT-4 last week?
- Why did AI spend double on Tuesday?
- Is this agent worth what it costs?

Answering these today means building custom pipelines against each provider's billing API. AI Cost Management answers them out of the box, in the FinOps workflow you already run for cloud.

**The reframe that matters:** A customer-support copilot costs USD 28,000 a month. Is that good or bad?

| Provider dashboard shows | AI Cost Management shows |
|---|---|
| USD 28,000 total spend | USD 0.60 per resolved ticket, per team, per agent |
| One number, once a month | Cost per agent, session, and outcome, updated continuously |
| No way to act | A clear signal: keep it, or fix the agent looping through unnecessary tool calls |

USD 28,000 is a budget line. USD 0.60 per resolved ticket is a business decision. If the bot resolves issues without human intervention, that is a clear win. If sessions cost USD 4.00 because the agent loops through unnecessary tool calls, that is a code problem to fix, not a budget to negotiate.

---

## How it works

AI Cost Management provides visibility in two levels. **Level 1** reports your total AI spend, grouped by provider and model, alongside your cloud costs. **Level 2** attributes that spend to a specific agent, session, or request.

Level 2 builds on Level 1. Connect a provider to establish Level 1, then instrument your application with traces to add Level 2.

| | Level 1: Provider costs | Level 2: Trace attribution |
|---|---|---|
| **Question it answers** | How much did we spend, and on which models? | Which agent, session, or request drove that spend, and was it worth it? |
| **What you see** | Invoice-accurate totals, grouped by provider, model, account, region, and label. Chargeback through Cost Categories. | Cost per agent, session, and request, down to individual LLM calls and tool loops. Cost per business outcome (per ticket, per order). |
| **What it needs** | A provider connector. No code changes. | Level 1, plus GenAI-instrumented traces (code changes in your app). |
| **How accurate** | Billed-accurate. The source of truth for finance. | Approximate, calculated from tokens and list pricing. Best for comparison and debugging. |
| **Time to value** | Minutes to connect, 6-12 hours to first data. | An afternoon to instrument, then continuous. |

Most teams start at Level 1 to get finance-grade totals and chargeback, then adopt Level 2 for the applications where they need to attribute cost to a specific agent or tie it to a business outcome.

### Level 1: Connect a provider

In [Get started](../get-started/get-started.md), select the **AI** tab and connect a provider. The connector pulls billed costs from the provider's billing API with no code changes. Within 6-12 hours, your AI spend appears in the same Cost Explorer as your cloud costs.

Once data is flowing, group and filter by:

- **Provider:** A unified, normalized view of OpenAI, Anthropic, Bedrock, and Vertex AI spend, comparable side by side.
- **Model:** Per-model and per-version cost, input/output token volumes, and inference counts. Useful for evaluating model upgrades.
- **Account and region:** Separate dev, staging, and prod accounts, and geographic spend patterns.
- **Token type:** Input vs output tokens, cache reads and writes. Useful for optimizing prompts and caching.
- **Custom labels:** Plus automatic chargeback via Cost Categories, CSV export, and BI integration.

Connector data is 100% billed-accurate and is the source of truth for finance. **Who it is for:** finance, FinOps, and engineering leaders who need accurate totals and chargeback.

### Level 2: Attribute cost with AI traces

A connector tells you *how much* you spent and *on which model*, but not *which agent, session, or request* drove the cost. To go deeper, instrument your application to emit GenAI traces. With traces you get:

- Cost per agent run, session, and inference, including multi-turn conversations.
- Cost per business outcome: per resolved ticket, completed order, or customer interaction.
- Drill-down to the exact LLM call and tool invocation within a run.
- High-cost session debugging: surface the runs and tool loops that drive spend.

Go to [How AI traces work](./understanding-ai-traces.md) to understand trace-based attribution, then [Set up AI traces](./set-up-ai-traces.md) to instrument your application.

:::note Alerts fire on ingested data, not live usage
Budget and anomaly alerts evaluate data after it is ingested, not the instant it is spent. For provider connectors, a cost spike can take 6-12 hours to surface. For traces, ingestion and cost enrichment usually complete within a few minutes, but allow up to about 20 minutes. Factor this delay in when you set alert thresholds.
:::

---

## What is supported

### Providers

Connect any of these providers to bring billed AI spend into Cost Explorer.

| Provider | Connector type | Historical data on first sync | Requirement |
|----------|----------------|-------------------------------|-------------|
| **OpenAI** | Provider connector | Last 90 days | [Admin API key (read-only)](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys/methods/create) |
| **Anthropic** | Provider connector | Last 30 days | [Admin API key (read-only)](https://docs.anthropic.com/en/api/getting-started) |
| **AWS Bedrock** | Cloud connector | Limited to AWS CUR retention | [AWS connector permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws) |
| **GCP Vertex AI** (Gemini) | Cloud connector | Limited to GCP billing export retention | [GCP connector permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp) |
| **Azure AI Foundry** | Cloud connector | Limited to Azure billing export retention | [Azure connector permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure) |

**Historical data cannot be backfilled beyond these limits.** If you need older data, export it from the provider before connecting to Harness.

**API keys must be org-wide Admin keys.** A standard project key (OpenAI) or workspace-level key (Anthropic) does not return org-wide data. Harness only reads usage and cost data; it never writes to your provider account.

### Traces

Traces follow the [GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/). How you get them depends on your stack, and there are three setup paths:

- **Your stack already sends GenAI traces:** If your app or gateway already exports OpenTelemetry traces (for example, through a LiteLLM proxy or a framework with native export), you point that existing exporter at Harness. No code changes.
- **You call an LLM SDK directly in Python:** Add the Harness SDK. It auto-instruments common Python stacks (OpenAI, Anthropic, LiteLLM, and more) with two lines of code.
- **You use an agent framework:** Add the framework's OpenTelemetry instrumentation (for example, for LangChain or LlamaIndex) to capture the full workflow, including tool calls and retries.

For other languages such as Go, Java, and .NET, you instrument with OpenTelemetry directly.

Go to [Set up AI traces](./set-up-ai-traces.md#select-your-path) to find your exact SDK, gateway, or framework in the compatibility matrix and follow the matching path.

---

## Limitations

Understand these before presenting AI cost data to finance or relying on it for production decisions.

<details>
<summary>Connectors are authoritative, traces are approximate</summary>

- **Provider connectors** pull billed costs from the provider's billing API. This is the source of truth for finance reporting and chargeback. Use these numbers when reporting to leadership or reconciling invoices.
- **OpenTelemetry traces** calculate cost from token counts and published model pricing. These costs are approximate and can differ from billed costs due to volume discounts, promotional credits, or billing adjustments. Use traces for relative cost comparisons (this agent costs 3x that agent) and debugging, not for finance totals.

**Rule:** When a connector and traces disagree, trust the connector.

</details>

<details>
<summary>Trace costs have no historical backfill</summary>

Traces track cost only from the moment instrumentation is enabled. There is no historical backfill. For historical AI spend, rely on the provider connector (OpenAI provides 90 days, Anthropic provides 30 days). Go to [How AI traces work](./understanding-ai-traces.md#limitations-and-caveats) to review the full list of trace caveats.

</details>

---

## Next steps

- Go to [Get started](../get-started/get-started.md) to connect your first provider (Level 1).
- Go to [How AI traces work](./understanding-ai-traces.md) to understand trace-based attribution before you instrument.
- Go to [Set up AI traces](./set-up-ai-traces.md) to instrument your application (Level 2).
