---
title: Compatibility Matrix
sidebar_label: Compatibility Matrix
description: Which SDKs, gateways, and frameworks emit GenAI traces natively for AI Cost Management trace attribution.
keywords:
  - compatibility matrix
  - GenAI semantic conventions
  - LLM frameworks
  - supported SDKs
tags:
  - cloud-cost-management
  - ai-cost-management
---

Trace attribution needs OpenTelemetry traces with GenAI semantic conventions. The tables below show which model SDKs, gateways, and frameworks emit those attributes natively, and which are supported by the Harness instrumentation SDK.

Use this matrix to decide your setup path: if your stack already emits GenAI traces, route them to Harness; if not, add instrumentation. Go to [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) for the steps.

### Model Client SDKs

Used for LLM inference.

| SDK | GenAI semconv export? | Support in Harness instrumentation SDK |
|-----|-----------------------|----------------------------------------|
| OpenAI Python SDK | ✅ Yes (most mature) | ✅ Yes |
| Anthropic SDK | ✅ Yes | ✅ Yes |
| Google GenAI / Vertex SDK | ✅ Yes | ✅ Yes |
| AWS Bedrock | ✅ Yes | Coming soon |

### Gateways

| Gateway | GenAI semconv export? | Support in Harness instrumentation SDK |
|---------|-----------------------|----------------------------------------|
| LiteLLM | ✅ Yes | ✅ Yes |
| Envoy | ❌ No | N/A |

### Agent Orchestration Frameworks

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

:::note Frameworks marked "Not native" still work
A framework that does not emit GenAI semantic conventions natively can still be instrumented. Use the OpenInference instrumentation or the LangSmith OTel export for LangChain and LangGraph, or the Harness SDK when the framework routes through LiteLLM. Go to [SDK Integrations](/docs/cloud-cost-management/sdk-integrations) for per-framework steps.
:::

---

## Next Steps

- Go to [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to connect a provider and see billed cost.
- Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) to instrument your application for trace attribution.
- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads from each span.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if data does not appear as expected.
- Go to the [AI Cost Management FAQ](/docs/cloud-cost-management/faq) to review common questions.
