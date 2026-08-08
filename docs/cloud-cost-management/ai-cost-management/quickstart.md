---
title: AI Cost Management Quickstart
sidebar_label: AI Cost Quickstart
description: Turn on AI trace attribution to break AI spend down to the agent, session, and request that caused it, from generating an ingestion token to verifying traces in Cost Explorer.
keywords:
  - AI cost management
  - AI cost traces
  - OpenTelemetry
  - OTLP
  - Harness SDK
tags:
  - cloud-cost-management
  - ai-cost-management
redirect_from:
  - /docs/cloud-cost-management/ai-cost-management/get-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This quickstart walks you through setting up AI trace attribution so you can see exactly which agent, session, or request drove your AI spend. If you have not connected a billing provider yet, start with [Get Started](/docs/cloud-cost-management/get-started/quickstart) first.

---

## Before You Begin

- **AI Cost Management enabled:** Confirm that **AI Cloud Providers** appears under **Cloud & AI Cost Management** > **Account Settings**. If it does not, contact [Harness Support](https://support.harness.io) to enable it for your account.
- **A provider connector (recommended):** Needed for invoice-accurate costs to compare against trace estimates. Go to the [CACM Get Started](/docs/cloud-cost-management/get-started/quickstart) to connect one.
- **Permission to create a service account:** You generate the ingestion token from a service account. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to confirm your role.
- **A runtime:** You need one of the following: Python 3.8+ to instrument your app with the Harness SDK, or `curl` to send a quick test trace and verify the setup works.
- **Network access:** From your app or shell to the Harness OTLP endpoint (`https://app.harness.io/udp-ingest/otel/v1/traces`, or your cluster's equivalent).

---

## Set Up Trace Attribution

### Step 1: Generate an Ingestion Token

Harness authenticates trace ingestion with a bearer token against the account's OTLP endpoint. Create a dedicated service account for ingestion so the credential is isolated and easy to rotate.

1. [Create a service account](/docs/platform/role-based-access-control/add-and-manage-service-account) (example: `ai-telemetry-ingest`) with the minimum permissions required for ingestion.
2. [Create a service account API key and token](/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
3. Select **Generate Token** and copy it.

:::warning Store the token securely
The token is displayed once. Save it to a secret manager or environment variable and do not commit it to source control.
:::


### Step 2: Choose Your Path

Select your onboarding path based on whether your application or gateway currently emits GenAI OpenTelemetry traces:

- **Traces are already emitted:** Select [Route Existing Traces](#route-existing-traces) to forward your telemetry to Harness without code changes.
- **Application requires instrumentation:** [Instrument your code](#instrument-your-application) to emit GenAI traces, then route them to Harness. Use the Harness SDK for direct Python model SDK calls, or a compatible open-source SDK for orchestration frameworks.

Not sure whether your stack emits GenAI traces? Go to [Compatibility Matrix](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check.

| Path | Use when | What you do |
|------|----------|-------------|
| **Route Existing Traces** | Your app or gateway already emits GenAI OpenTelemetry traces (LangSmith, OpenInference, a LiteLLM proxy, or native framework export). | Generate a token and point the existing exporter at the Harness endpoint. No code changes. |
| **Instrument Your Application** | Your app does not emit GenAI traces yet. | Add the Harness SDK (direct Python SDK calls) or an open-source SDK (orchestration frameworks), then route the traces to Harness. |

### Step 3: Instrument Your Application

:::info GenAI semantic conventions required
Trace attribution depends on OpenTelemetry traces with GenAI semantic conventions, not just standard OpenTelemetry traces. Standard HTTP, database, or function spans do not carry the model name or token counts CACM needs to calculate cost. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

Follow the path you chose in Step 2.

<Tabs queryString="path">
<TabItem value="route-existing" label="Route Existing Traces" default>

Use this path if your app or gateway already emits OpenTelemetry traces with GenAI semantic conventions (from LangSmith, OpenInference, a LiteLLM proxy, or a framework with native export). You repoint the existing exporter at Harness, with no code changes.

<DocImage path={require('../static/step-one.png')} width="100%" title="Enable Telemetry screen: telemetry needs instrumentation that produces traces and an endpoint for those traces to land. Select 'Yes, route my existing traces' when your app already produces OTel traces and only the OTLP endpoint needs configuring." />

Set these OpenTelemetry environment variables, then restart the application or gateway:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

Replace `app.harness.io` with your cluster if different (example: `app3.harness.io`).

<details>
<summary>What each variable does</summary>

| Variable | Purpose |
|----------|---------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Harness OTLP trace ingestion endpoint. Replace `app.harness.io` with the account's cluster if different (example: `app3.harness.io`). Find the cluster in the URL when logged in to Harness. |
| `OTEL_EXPORTER_OTLP_HEADERS` | Bearer token for authentication. Use the literal token value or reference it from a secret or environment variable. |
| `OTEL_TRACES_EXPORTER` | Selects the OTLP exporter for traces. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Selects HTTP/protobuf OTLP transport (Harness expects this format). |

</details>

Some frameworks and tools need one extra flag to turn telemetry on before the variables above take effect. Go to the matching integration page for the exact flag:

| Framework or tool | Extra step |
|-------------------|-----------|
| [LangChain / LangGraph](/docs/cloud-cost-management/sdk-integrations/langchain#route-existing-traces-langsmith) | Set `LANGSMITH_OTEL_ENABLED=true` |
| [LiteLLM Proxy](/docs/cloud-cost-management/sdk-integrations/litellm-proxy#instrument-the-litellm-proxy) | Enable the `otel` callback in `config.yaml` |
| [Claude Code](/docs/cloud-cost-management/sdk-integrations/claude-code#configure-claude-code) | Set `CLAUDE_CODE_ENABLE_TELEMETRY=1` |

</TabItem>
<TabItem value="instrument" label="Instrument Your Application">

Use this path if your app does not emit GenAI traces yet. Add instrumentation, then route the traces to Harness. Pick the tab that matches your stack.

<Tabs>
<TabItem value="harness-sdk" label="Harness SDK" default>

Use this if your Python app calls a model SDK directly (LiteLLM, OpenAI, or Anthropic) with no orchestration framework:

1. **Install** the Harness SDK for your client (for example, `pip install "harness-sdk[openai]"`).
2. **Set** the endpoint environment variables to point at Harness.
3. **Add** these two lines at the very start of your app, before importing any AI library:

```python
from harness_sdk.agent import Agent
Agent().instrument()  # Call before importing litellm, openai, or anthropic
```

Go to the [Harness SDK integration](/docs/cloud-cost-management/sdk-integrations/harness-sdk) for the exact install commands, the endpoint variables, and per-client examples.

</TabItem>
<TabItem value="open-source" label="Open-Source SDK">

Use this if a framework such as LangChain, LlamaIndex, or Google ADK runs your LLM calls. Each framework has its own open-source instrumentation that captures the full workflow, not just the model call, so you see the tool calls, retries, and loops around it. Follow the setup page for your framework:

| Framework | Framework |
|-----------|-----------|
| [LangChain / LangGraph](/docs/cloud-cost-management/sdk-integrations/langchain#instrument-your-app-openinference) | [OpenAI Agents SDK](/docs/cloud-cost-management/sdk-integrations/openai-agents#instrument-the-openai-agents-sdk) |
| [LlamaIndex](/docs/cloud-cost-management/sdk-integrations/llamaindex#instrument-llamaindex) | [LiteLLM Proxy](/docs/cloud-cost-management/sdk-integrations/litellm-proxy#instrument-the-litellm-proxy) |
| [Google ADK](/docs/cloud-cost-management/sdk-integrations/google-adk#instrument-google-adk) | [Claude Code](/docs/cloud-cost-management/sdk-integrations/claude-code#configure-claude-code) |

For other languages (Go, Java, .NET), go to [Manual instrumentation](/docs/cloud-cost-management/sdk-integrations/manual-instrumentation).

</TabItem>
</Tabs>

</TabItem>
</Tabs>

### Step 4: Verify Traces in Cost Explorer

1. Run the application, or restart the exporter, so traces flow. They usually appear within a few minutes; allow up to about 20 minutes.
2. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
3. Select the **AI Traces** view or group by **Service Name**, and find your service.
4. Select a service row to open the **Service Traces** drawer, and drill from a session down to the exact LLM call, retry, or tool loop that drove the cost.

Once traces are flowing and you can see cost attributed by service, you have full AI cost visibility: invoice-accurate totals from the connector and a code-level breakdown from traces.

### Step 5: Send a test trace

To confirm the endpoint and token work without instrumenting an application, send a single test span with `curl`. This is useful before you wire up a full app, or to isolate whether a problem is with the ingestion setup or the instrumentation.

Replace `<ACCOUNT_ID>` with your account identifier and `<YOUR_TOKEN>` with the token from Step 1, then run:

<details>
<summary>Test trace curl command</summary>

```bash
curl --request POST \
  --url 'https://app.harness.io/udp-ingest/otel/v1/traces?accountIdentifier=<ACCOUNT_ID>&routingId=<ACCOUNT_ID>' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer <YOUR_TOKEN>' \
  --data '{
  "resourceSpans": [
    {
      "resource": {
        "attributes": [
          { "key": "harness.account.id", "value": { "stringValue": "<ACCOUNT_ID>" } },
          { "key": "service.name", "value": { "stringValue": "test-service" } }
        ]
      },
      "scopeSpans": [
        {
          "scope": { "name": "otlp-test-client" },
          "spans": [
            {
              "traceId": "aabbccdd11223344aabbccdd11223344",
              "spanId": "0000000000000001",
              "name": "test-span",
              "startTimeUnixNano": "1786104000000000000",
              "endTimeUnixNano": "1786104000500000000"
            }
          ]
        }
      ]
    }
  ]
}'
```

Replace `startTimeUnixNano` and `endTimeUnixNano` with current values by running `date +%s%N`.

</details>

Open the **AI Traces** view in Cost Explorer and look for `test-service`. It usually appears within a few minutes; allow up to about 20 minutes.

:::note Which number to trust
Trace cost is computed from tokens and list price, so it is an estimate, typically 95 to 98% accurate against the invoice. Use the connector for any billed figure and traces for attribution. Go to [Which number to trust when they differ](/docs/cloud-cost-management/ai-cost-management/how-ai-traces-work#which-number-to-trust-when-they-differ) for the full explanation.
:::

---

## Next Steps

- Go to [Cost Explorer](/docs/cloud-cost-management/cost-explorer) to explore AI spend by model, agent, session, and service.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if data does not appear as expected.
