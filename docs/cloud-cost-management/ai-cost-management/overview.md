---
title: AI Cost Management
sidebar_label: Overview
description: See AI spend across LLM providers next to your cloud costs, attribute it to teams and agents, and govern it with the same FinOps workflow you use for cloud.
keywords:
  - AI cost management
  - LLM cost
  - AI spend
  - FinOps
tags:
  - cloud-cost-management
  - ai-cost-management
redirect_from:
  - /docs/cloud-cost-management/ai-cost-management/introduction-to-ai-cost-management
---

Harness AI Cost Management extends the Cloud & AI Cost Management (CACM) platform to track AI spend across LLM providers, managed AI services, and AI applications. See AI spend next to your cloud costs, attribute it to teams, agents, and outcomes, and govern it with the same FinOps workflow you already use for cloud.

<DocImage path={require('../static/get-cost-visibility-ai.png')} width="100%" height="100%" title="Get cost visibility into your AI environment" />

---

## How AI Cost Tracking Works

Harness tracks AI cost two ways:

- **Provider costs** come from a connector that pulls billed spend from the provider's billing API. Go to [Get Started](/docs/cloud-cost-management/get-started/quickstart) to connect a billing provider.
- **Trace attribution** comes from telemetry your application emits, which breaks that spend down to the agent, session, or request that caused it.

Trace attribution builds on provider costs. Connect a provider first, then add traces when you need to know what drove the spend.

| | Provider costs | Trace attribution |
|---|---|---|
| **Answers** | How much did we spend, and on which models? | Which agent, session, or request drove it, and was it worth it? |
| **Needs** | A provider connector. No code changes. | A provider connector, plus GenAI-instrumented traces (code changes). |
| **Accuracy** | Billed-accurate. Source of truth for finance. | Approximate, calculated from tokens and list pricing. |
| **Time to value** | Minutes to connect, 6 to 12 hours to first data. | An afternoon to instrument, then continuous. |

### Trace Attribution

A connector tells you how much you spent and on which model, but not which agent, session, or request drove the cost. To go one level deeper, instrument your application to emit GenAI traces. Traces give you cost per agent run, session, and inference, cost per business outcome, and drill-down to the exact LLM call or tool loop that drove spend.

Go to [How AI traces work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand code instrumentation, data flow architecture, and more.

:::warning Alerts fire on ingested data, not live usage
[Budget](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) and [anomaly detection](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/getting-started-with-ccm-anomaly-detection) alerts evaluate data after ingestion. Provider connector spikes can take 6 to 12 hours to surface. Trace data usually lands within a few minutes, but allow up to about 20 minutes. Factor this into alert thresholds.
:::

### When Do You Need Traces On Top of Provider Costs

A provider connector groups spend by provider, model, account, and token type. That is enough for finance-grade totals, chargeback by provider or model, and budgets. It cannot attribute spend below the model, because the billing API does not know which agent, session, or request made each call.

Add trace attribution when you need answers the connector cannot give:

- **Attribute spend below the model:** map cost to a specific team, agent, feature, or customer with [Cost Categories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories) and [Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective).
- **Debug a cost spike:** trace an expensive session to the exact LLM call, retry, or tool loop that drove it.
- **Measure unit economics:** compute cost per business outcome, such as cost per resolved ticket or per completed order.

Traces require GenAI-instrumented code, so you do not enable them everywhere at once. Instrument the applications where per-agent or per-outcome attribution is worth the code change, and leave the rest on provider costs. Go to [Set up AI cost traces](/docs/cloud-cost-management/ai-cost-management/set-up-ai-cost-traces) to instrument an application.

<details>
<summary>Example: From a Monthly Total to Cost Per Outcome</summary>

Say a customer-support copilot costs USD 28,000 a month. On a provider bill, that is a single line item. It tells you the copilot is expensive, but not whether it is worth the money.

Attribution changes the question. Divide that spend by the tickets the copilot resolves, and the cost becomes **USD 0.60 per resolved ticket**, which you can break down further by team and agent.

Now the number means something. If the copilot resolves tickets on its own at USD 0.60 each, that is a clear win, cheaper than a human agent. If some sessions cost USD 4.00 because the agent loops through unnecessary tool calls, that is a code problem to fix, not a budget line to negotiate. The monthly total alone could never tell you which was happening.

</details>


## Next Steps

- Go to [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to connect a provider and see your first data.
- Go to [How AI traces work](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work) to understand trace attribution before you instrument anything.
