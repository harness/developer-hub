---
title: AI Cost Troubleshooting
sidebar_label: AI Cost Troubleshooting
description: Resolve common issues with AI Cost Management, from connectors that show no spend to traces that appear without cost.
keywords:
  - AI cost troubleshooting
  - trace ingestion
  - connector issues
  - OTLP
tags:
  - cloud-cost-management
  - ai-cost-management
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use this page to resolve common issues with AI Cost Management, whether you are connecting a provider or instrumenting traces. Each entry expands to a solution.

---

## Connector Issues

Issues with provider connectors and billed cost.

<Troubleshoot
  issue="AI spend does not appear in Cost Explorer after 12 hours"
  mode="docs"
  fallback="Confirm the connector uses an org-wide admin API key, not a project-level or workspace-level key. Verify the key has read access to the provider's usage and billing endpoints, and that the connector saved without errors. First sync can take up to 12 hours; if data is still missing after that, contact Harness Support with your account ID and connector details."
/>

<Troubleshoot
  issue="Historical AI cost data is missing before a certain date"
  mode="docs"
  fallback="Historical data on first sync is capped per provider: OpenAI provides 90 days, Anthropic provides 30 days, and cloud connectors are limited to the underlying billing-export retention. Data cannot be backfilled past these limits. Export older data from the provider directly if you need it."
/>

---

## Trace Issues

Issues with GenAI trace instrumentation and trace-based cost.

<Troubleshoot
  issue="No traces appear in Cost Explorer after 20 minutes"
  mode="docs"
  fallback="Confirm the OTLP endpoint matches your Harness cluster (for example app.harness.io vs app3.harness.io), the service account token is valid, and the application can reach https://app.harness.io/udp-ingest/otel/v1/traces (test with curl from the same environment). Check the application logs for OTLP exporter activity, and for the Harness SDK make sure Agent().instrument() runs before importing AI libraries. Set OTEL_LOG_LEVEL=debug to surface export errors."
/>
{/* VERIFY: OTEL_LOG_LEVEL is the Python SDK convention; exporter debug-logging variables vary by language SDK. */}

<Troubleshoot
  issue="Traces appear but no cost is shown"
  mode="docs"
  fallback="Cost calculation requires the GenAI attributes gen_ai.provider.name (or the legacy gen_ai.system), gen_ai.request.model, gen_ai.usage.input_tokens, and gen_ai.usage.output_tokens on each span, with non-zero token counts and a model identifier that matches Harness pricing data. Open Cloud and AI Cost Management, then Cost Explorer, select the AI Traces view, open the Service Traces drawer, inspect a span, and confirm these attributes are present and non-zero. If they are missing, update your instrumentation to emit them; if they are present but cost is still zero, contact Harness Support with the trace ID and model identifier."
/>

<Troubleshoot
  issue="High trace data volume or storage cost"
  mode="docs"
  fallback="Large prompt and response payloads and over-instrumentation inflate span volume and storage cost. Disable payload capture (HARNESS_GEN_AI_PAYLOAD_CAPTURE_ENABLED=false for the Harness SDK), scope instrumentation to LLM calls only, and sample a percentage of traces in high-traffic production."
/>

<Troubleshoot
  issue="Trace costs do not match provider invoices"
  mode="docs"
  fallback="This is expected. Trace costs are approximate, calculated from token counts and published model pricing, so they differ from billed costs due to volume discounts, credits, refunds, and pricing changes. Pair traces with a provider connector for accurate billed costs, and use traces for debugging and relative comparisons rather than finance reporting."
/>

<Troubleshoot
  issue="Harness SDK does not instrument LLM calls even though spans are emitted"
  mode="docs"
  fallback="Call Agent().instrument() before importing any AI library (litellm, openai, anthropic) or web framework. The SDK patches these libraries at import time, so importing them first prevents instrumentation."
/>

---

## Get Help

If you are still stuck, [contact Harness Support](https://support.harness.io/) or your Harness account team. To speed up diagnosis, include:

- Your **account ID** and **Harness cluster** (for example `app3.harness.io`).
- A **trace ID** and the **model identifier** (`gen_ai.request.model`) for any span that shows no cost.
- Which setup path you are on (route existing traces, Harness SDK, or framework instrumentation), and your instrumentation method.

<!-- TODO(harness-team): VERIFY — official support channel URL and response-time SLA by plan tier -->

---

## Next Steps

- Go to [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to connect a provider.
- Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to instrument your application.
- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM needs to price a span.
