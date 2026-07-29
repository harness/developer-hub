## Path A: Route Existing Traces to Harness

**Use this path if** your app or gateway already emits **OpenTelemetry traces with GenAI semantic conventions** (from LangSmith, OpenInference, a LiteLLM Proxy, LangChain, or a framework with native export). No code changes: you repoint the existing exporter at Harness.

<DocImage path={require('../../../static/step-one.png')} width="100%" title="Enable Telemetry screen: telemetry needs instrumentation that produces traces and an endpoint for those traces to land. Select 'Yes, route my existing traces' when your app already produces OTel traces and only the OTLP endpoint needs configuring." />

### Step 1: Generate an Authentication Token

Harness uses a bearer token to authenticate trace ingestion against the account's OTLP endpoint.

**Recommended:** Create a dedicated [service account](/docs/platform/role-based-access-control/add-and-manage-service-account) for telemetry ingestion and generate an API key under that account. This isolates the credential, makes it easy to rotate, and keeps trace ingestion working independently of any individual user.

1. [Create a service account](/docs/platform/role-based-access-control/add-and-manage-service-account) (example: `ai-telemetry-ingest`) and assign it a role with the minimum permissions required for ingestion.
2. [Create a service account API key and token](/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
3. Select **Generate Token** and copy the token.

:::warning Store the token securely
- The token is only displayed once. Store it securely (secret manager, environment variable, or vault).
- Treat it like a password. Never commit it to source control.
- Rotate it periodically (every 90 days recommended).
:::

### Step 2: Configure the OTLP Exporter

Point the existing OTLP exporter at the Harness endpoint by setting these OpenTelemetry environment variables:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel/v1/traces
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <YOUR_TOKEN>"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

<details>
<summary>What each variable does</summary>

| Variable | Purpose |
|----------|---------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Harness OTLP trace ingestion endpoint. Replace `app.harness.io` with the account's cluster if different (example: `app3.harness.io`). Find the cluster in the URL when logged in to Harness. |
| `OTEL_EXPORTER_OTLP_HEADERS` | Bearer token for authentication. Use the literal token value or reference it from a secret/environment variable. |
| `OTEL_TRACES_EXPORTER` | Selects the OTLP exporter for traces. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Selects HTTP/protobuf OTLP transport (Harness expects this format). |

</details>

**Framework-specific configuration**

The four variables above are the standard OpenTelemetry exporter settings and work for most stacks. Some frameworks and tools also require a framework-specific flag to turn telemetry on. Pick your framework below.

<Tabs>
<TabItem value="otel" label="Standard OTel SDK" default>

No extra flag is needed — the standard variables are enough:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel/v1/traces
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
<TabItem value="claude-code" label="Anthropic Agent SDK (Claude Code)">

Claude Code additionally requires `CLAUDE_CODE_ENABLE_TELEMETRY=1`:

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel/v1/traces
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
<TabItem value="langsmith" label="LangChain / LangSmith">

LangChain emits OTel when LangSmith's OTel export is enabled with `LANGSMITH_OTEL_ENABLED=true`:

```bash
export LANGSMITH_OTEL_ENABLED=true
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel/v1/traces
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
<TabItem value="litellm" label="LiteLLM Proxy">

Enable the `otel` callback in your LiteLLM proxy config, then set the standard exporter variables:

```yaml
# config.yaml
litellm_settings:
  callbacks: ["otel"]
```

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://app.harness.io/udp-ingest/otel/v1/traces
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${HARNESS_OTEL_TOKEN}"
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

</TabItem>
</Tabs>

After setting the variables, restart the application or gateway so they take effect.

### Step 3: Verify Traces in Cost Explorer

1. Wait 1–2 minutes for traces to flow (telemetry is near real-time).
2. Go to **Cloud & AI Cost Management** > **Cost Explorer**.
3. Select the **AI Traces** view or group by **Service Name**.
4. Look for the service name (from `service.name` attribute in traces).
5. Select a service row to open the **Service Traces** drawer.
6. Inspect recent runs, span waterfalls, and per-span cost attribution.

<!-- SCREENSHOT NEEDED: Cost Explorer with the AI Traces view (or Service Name grouping) showing the service row -->
<!-- SCREENSHOT NEEDED: Service Traces drawer showing the span waterfall and per-span cost -->

### Step 4: (Optional) Send a Test Trace

Before wiring up the full application, confirm the endpoint and token work by sending a single test span with `curl`.

Replace `<ACCOUNT_ID>` with the account identifier and `<YOUR_TOKEN>` with the token from Step 1, then run:

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
              "startTimeUnixNano": "1778241600000000000",
              "endTimeUnixNano": "1778241600500000000"
            }
          ]
        }
      ]
    }
  ]
}'
```

**Note:** `startTimeUnixNano` and `endTimeUnixNano` are example nanosecond timestamps (they resolve to a 2026 date). If the test span does not appear, regenerate current values — for example, run `date +%s` and append nine zeros for nanoseconds.

Then open the **AI Traces** view in Cost Explorer and look for `test-service`. It may take 1–2 minutes to appear. <!-- SCREENSHOT NEEDED: Cost Explorer AI Traces view showing the test-service test span -->
