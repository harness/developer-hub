---
title: AI Costs Management [NEW]
description: Currently, this feature is behind the feature flag AUDIT_TRAIL_WEB_INTERFACE. Contact Harness Support to enable the feature. Your Harness account Audit Trail includes events for CACM changes. CACM Even…
sidebar_position: 7
---

#  AI Costs Management [NEW]

**Beta Release | Feature Flag Required**

> **This feature is currently in beta and available behind a feature flag. Contact your Harness account team to enable it for your account.**

---

## Overview

Harness AI Cost Management brings AI spend into the same FinOps platform Harness customers already use for cloud cost. The same Cost Categories, the same Perspectives, the same Budgets, the same Anomaly Detection, now extended to AI workloads.

At the center is unit economics. Every dollar of AI spent is tied to the agent, session, and outcome it produced, so the question shifts from "what did we spend" to "what did we get for it." Your customer-support copilot didn't cost USD28,000 last month — it cost USD0.60 per resolved ticket. Agent ROI becomes a number you can act on, not an estimate buried in an invoice. Around that core, the release delivers unified visibility across every provider and managed service, anomaly detection that catches cost spikes before they hit the invoice, and budget governance that holds AI spend to what the business actually approved. AI spend can be explored across providers, attributed to teams and products, and decomposed at the level where AI workloads actually run — application, agent, run, step, and LLM call.

---

## What's New

This beta release introduces end-to-end AI cost visibility across eight areas:

- **AI Dimensions** : Cost attribution across Team, Application, Component, and Tenant.
- **Perspectives Integration**: Unified view of AI provider costs (OpenAI, Anthropic) alongside cloud costs.
- **AI Connector Setup**: Guided flow to connect LLM providers via admin API key configuration.
- **Waterfall View** : Drill into individual trace execution chains (agent → gateway → LLM) with per-span cost attribution.
- **Trace List View** : Paginated browsing of traces with duration, cost, and span count.
- **Telemetry Setup** : OTEL endpoint configuration with service account token generation and data flow validation.

---

## Getting Started

:::note
AI Cost Management is gated behind a feature flag. Contact your Harness account team.
:::

AI cost data lives in several places, and each one tells you something different. Harness supports three ingestion paths so customers can match the depth of attribution to what they actually need:

- Provider connectors for OpenAI, Anthropic, AWS Bedrock, GCP Vertex AI, and other major sources
- AI gateway integration, ingesting telemetry from your existing gateway for per-request attribution
- OpenTelemetry traces using GenAI semantic conventions, for full session and workflow attribution from any OTel-compatible source

To get started, just go to **Cloud & AI Cost Management** > **Account Settings** > **AI Cloud Providers** and select **Add AI Provider**. Supported providers: OpenAI, Anthropic. 

<Tabs>
<TabItem value="OpenAI">
**Step 1:** Add Name, Description (optional), Tags (optional)

- **Name**: A required identifier for the connector
- **Description**: An optional field to add context about what this connector is used for
- **Tags**: Optional labels to organize and filter connectors, useful when you have multiple AI provider connections

<DocImage  path={require('./static/openai-one.png')} width="100%" height="100%" title="Click to view full size image" />

**Step 2:** Add URL and API Key. Make sure the API key is an Admin API key with read-only access. Check more [here](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys/methods/create).

- **URL**: The OpenAI API endpoint URL. Use the default in UI unless you have a custom endpoint.
- **API Key**: Your OpenAI Admin API key with read-only access. This key is used to fetch usage and cost data from your OpenAI account.
- **Model Name**: Select the OpenAI model(s) you want to track costs for (e.g., GPT-4).

<DocImage  path={require('./static/openai-two.png')} width="100%" height="100%" title="Click to view full size image" />

Click on **Continue** and wait for connection test.

</TabItem>
<TabItem value="Anthropic">

**Step 1:** Add Name, Description (optional), Tags (optional)

- **Name**: A required identifier for the connector
- **Description**: An optional field to add context about what this connector is used for
- **Tags**: Optional labels to organize and filter connectors, useful when you have multiple AI provider connections

<DocImage  path={require('./static/an-one.png')} width="100%" height="100%" title="Click to view full size image" />

**Step 2:** Add Authentication (either Personal Token or Bedrock API Key) and API Key. Make sure the API key is an Admin API key.

- **API Key**: Your Anthropic Admin API key
- **Model Name**: Select the Anthropic model(s) you want to track costs for (e.g., Claude 3.5 Sonnet).

<DocImage  path={require('./static/an-two.png')} width="100%" height="100%" title="Click to view full size image" />

Click on **Continue** and wait for connection test.

</TabItem>
</Tabs>

---

## Feature Reference

### AI Cost Economics Dashboard

Unit economics surfaced natively, for measuring AI outcomes. 

- Cost per agent run
- Cost per session, including multi-turn conversations
- Cost per inference
- Cost broken down by token type, session, inference and use-case 
- Agent ROI tied to business outcomes (cost per resolved ticket, cost per completed workflow, cost per customer interaction)

### Cost By Provider

Unified visibility across native LLM providers and managed AI services. OpenAI and Anthropic for direct API spend. AWS Bedrock and GCP Vertex AI for managed AI services. Spend is normalized across providers so comparisons and analysis don’t require custom pipelines.

### Cost By Model

Per-model and per-version cost tracking, with input and output token volumes, inference counts, and trends. Useful for evaluating model choice, watching the impact of a model upgrade, and identifying which models are growing fastest in spend.

### Unit Economics By Agent

Cost attributed to AI agents, whether internal copilots, customer-facing assistants, or background automations. Inferences, session cost, token usage, and trends, surfaced per agent so engineering and product teams can evaluate cost-per-outcome at the agent level.

### Custom Unit Economics Using Cost Categories

Attribute AI spend to any customer-defined construct, including business unit, product line, customer tier, or feature. Built on the existing Cost Categories framework, so the rules teams have already written for cloud chargeback now apply to AI spend with no extra setup.

### Session And Conversation Level Granularity

Cost per session, cost per multi-turn interaction, and token composition broken down by call. This is the level of detail provider billing APIs can’t give. A multi-turn conversation that costs four times an average session because the agent is looping through a tool chain becomes visible, attributable, and fixable.

Take a customer-support copilot as an example. The total invoice tells you the bot cost twenty-eight thousand dollars last month. Useful, but it doesn’t tell you whether that’s good or bad. Unit cost reframes the same data as cost per resolved ticket. If a session costs sixty cents and the bot resolves the issue without a human, that’s a deal. If a session costs four dollars because the agent is looping through tools it shouldn’t be using, that’s a problem to fix in code, not in finance.

### AI Cost Explorer

Filter and group AI spend by the dimensions that matter for AI workloads:

- Provider, account, and project
- Model and model version
- Token type, including input, output, and cache reads and writes
- Context type and inference profile, including standard, long context, and global routing
- Region
- Labels and custom dimensions
- Drill down from business-level metrics to raw cost data, with filters that compose the way they do everywhere else in CACM.
---
