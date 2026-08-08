---
title: Claude Code
sidebar_label: Claude Code
description: Route Claude Code OpenTelemetry telemetry to Cloud & AI Cost Management to track its AI cost.
keywords:
  - Claude Code
  - Anthropic
  - OpenTelemetry
  - AI cost traces
tags:
  - cloud-cost-management
  - ai-cost-management
---

Use this integration for teams using Claude Code to generate or debug AI applications. Claude Code has OpenTelemetry export built in, so you do not add any instrumentation code. You enable telemetry and point the exporter at Harness.

Because the telemetry is native, both quickstart paths lead here to the same setup:

- **Route existing traces:** If you already run Claude Code with OpenTelemetry, you add one flag and set the Harness endpoint. No other changes.
- **Instrument your application:** If Claude Code is not emitting telemetry yet, the steps below turn it on. There is no separate SDK to install, because the exporter ships with Claude Code.

Before you start, generate an ingestion token and connect a provider. Go to the [AI Cost Management Quickstart](/docs/cloud-cost-management/ai-cost-management/quickstart) for those steps. Replace `<YOUR_TOKEN>` below with that token and adjust the endpoint for your Harness cluster.

:::info GenAI semantic conventions required
Cost is calculated from OpenTelemetry traces with GenAI semantic conventions. Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the attributes CACM reads.
:::

---

## Configure Claude Code

[Claude Code](https://code.claude.com/docs/en/monitoring-usage) emits OpenTelemetry telemetry when you enable it. On top of the standard OpenTelemetry exporter variables, Claude Code additionally requires `CLAUDE_CODE_ENABLE_TELEMETRY=1` to turn telemetry on.

Set these environment variables in your shell profile, CI environment, or `~/.claude/settings.json`:

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
```

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_ENABLE_TELEMETRY` | The Claude Code flag that turns telemetry on. Without it, no traces are emitted. |
| `OTEL_TRACES_EXPORTER` | Selects the OTLP exporter for traces. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Selects HTTP/protobuf OTLP transport (Harness expects this format). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Harness OTLP trace ingestion endpoint. Replace `app.harness.io` with your cluster if different (example: `app3.harness.io`). |
| `OTEL_EXPORTER_OTLP_HEADERS` | Bearer token for authentication. Use the literal token value or reference it from a secret or environment variable. |

After setting the variables, restart Claude Code so they take effect.

:::note Trace export is a beta capability
Trace export from Claude Code is a beta capability. Go to the [Claude Code monitoring docs](https://code.claude.com/docs/en/monitoring-usage) to review the latest configuration and the list of emitted metrics, events, and traces.
:::

---

## Verify Traces in Cost Explorer

1. Run Claude Code so telemetry flows. Traces usually appear within a few minutes; allow up to about 20 minutes.
2. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
3. Select the **AI Traces** view or group by **Service Name**, and find your service.
4. Select a service row to open the **Service Traces** drawer and inspect the span waterfall.

---

## Next Steps

- Go to [Supported Providers and Frameworks](/docs/cloud-cost-management/ai-cost-management/supported-providers-and-frameworks) to check native GenAI export support.
- Go to the [GenAI Span Attribute Reference](/docs/cloud-cost-management/ai-cost-management/genai-span-attribute-reference) to review the exact attributes CACM reads.
- Go to [AI Cost Troubleshooting](/docs/cloud-cost-management/ai-cost-troubleshooting) if traces do not appear or show no cost.
