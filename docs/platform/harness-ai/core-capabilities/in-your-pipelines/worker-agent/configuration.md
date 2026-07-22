---
title: Worker Agent configuration
description: Configure Worker Agent instructions, MCP connectors, inputs, environment variables, triggers, and notifications.
sidebar_label: Configuration
sidebar_position: 6
keywords:
  - worker agent
  - configuration
  - mcp connector
  - instructions
  - inputs
  - environment variables
  - pipeline triggers
  - slack notifications
tags:
  - harness-ai
  - worker-agents
---

Worker Agents require configuration across several areas: instructions (the agent's system prompt), MCP connectors for platform access, typed inputs, environment variables, pipeline triggers, and notification channels. This page explains how to configure each component and provides examples for common use cases.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Configure instructions with Harness expressions for dynamic context](#configure-instructions-and-harness-expressions).
- [Set up MCP connectors to access Harness platform data and external services](#configure-mcp-connectors).
- [Define typed inputs to parameterize agent behavior](#configure-inputs).
- [Set environment variables for runtime configuration](#configure-environment-variables).
- [Configure pipeline triggers to automate agent execution](#configure-pipeline-triggers).
- [Send Worker Agent results to Slack via multiple methods](#configure-slack-notifications).

---

## Before you begin

Before you configure a Worker Agent, ensure you have the following:

- **Worker Agent created**: A Worker Agent must exist in your Harness account. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents" target="_blank">Worker Agents</a> to create one if needed.
- **Model Connector configured**: Anthropic or OpenAI connector for the LLM provider. Go to <a href="/docs/platform/harness-ai/model-connector/#choose-a-connector" target="_blank">Choose a Model Connector</a> for setup instructions.
- **Harness API key**: Required for MCP connector authentication. Go to <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a> to create one.
- **Access to Agent Definition**: Permission to view and edit Worker Agent definitions in AI > Worker Agents.

---

## Configure Model Connectors

The Model Connector defines the LLM provider and default model for your Worker Agent. When you create or select a connector, you choose a default model that the agent uses at runtime unless overridden by the optional **Model Name** field.

Harness supports the following Model Connectors:

- **Anthropic Model Connector:** Run agents on Claude models through direct Anthropic or AWS Bedrock endpoints. Go to <a href="/docs/platform/harness-ai/model-connector/anthropic-model-connector" target="_blank">Anthropic Model Connector</a> to review supported models and setup options.
- **OpenAI Model Connector:** Run agents on GPT-5.5 with configurable reasoning effort. Go to <a href="/docs/platform/harness-ai/model-connector/openai-model-connector" target="_blank">OpenAI Model Connector</a> to review supported models, effort levels, and setup options.

If you do not have access to a model provider, use a Harness-managed LLM connector instead of configuring your own credentials. Harness auto-provisions view-only managed connectors at the account level, `harnessAnthropic` for Claude models and `harnessOpenAI` for GPT models, that route requests through the Harness **LLM Gateway**. Inspect them under **Account Settings** > **Account Resources** > **Connectors**; you cannot edit or delete them.

Managed LLM connectors are controlled by the **Enable Harness Managed LLM Connectors** default setting under **Account Settings** > **General** > **Default Settings** > **Harness AI**. Worker Agents authenticate to the LLM Gateway through the `ML_HARNESS_MANAGED_LLM_CONNECTORS` permission, which is included in the agent scoped token by default. If you define an explicit <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/permissions" target="_blank">agent permission block</a>, add `ai_llm_gateway: access` to retain LLM Gateway access.

:::note Managed connector billing
Until August 2026, usage of the Harness-managed LLM connector is included in your Harness subscription at no additional cost. After August 2026, Harness bills managed LLM connector usage separately, in addition to your Harness subscription.
:::

---

## Configure instructions and Harness expressions

The **Instructions** field is the agent's system prompt. It defines what the agent does, how it reasons, and what it outputs.

Configure instructions in the **Worker Agent definition** (AI > Worker Agents > select the agent > **Instructions** field or **YAML** tab), not in the pipeline step. The pipeline's Agent step references the agent by name and version. It does not contain a separate prompt field.

If you need the agent to behave differently in a specific pipeline, use agent **Inputs** to parameterize the instructions, or supply pipeline-specific context via **Agent Settings** (which inject environment variables at runtime). The recommended approach is to edit the instructions directly in the agent definition. This keeps the prompt centralized, versioned, and reusable across pipelines.

:::tip
Use agent **Inputs** (such as `<+inputs.repoName>` or `<+inputs.planFile>`) to make instructions dynamic without duplicating the agent. Each pipeline can supply different input values at runtime while sharing the same prompt logic.
:::

The table below lists expressions commonly used in Worker Agent instructions. For the full list of available variables and expressions, go to:

- <a href="/docs/platform/variables-and-expressions/add-a-variable" target="_blank">Add a variable</a>: Create custom pipeline, stage, and service variables.
- <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank">Built-in and custom Harness variables reference</a>: Complete reference for all built-in variables including pipeline, stage, step, trigger, and deployment variables.
- <a href="/docs/platform/variables-and-expressions/harness-expressions-reference" target="_blank">Harness expressions reference</a>: Syntax, usage patterns, and methods for working with expressions.

### Supported expressions

| Expression | Resolves to |
|---|---|
| `<+trigger.repoName>` | Name of the repository that triggered the pipeline |
| `<+trigger.branch>` | Branch name from the trigger event |
| `<+trigger.prNumber>` | Pull request number from the trigger event |
| `<+trigger.sourceBranch>` | Source branch of the pull request |
| `<+trigger.targetBranch>` | Target branch of the pull request |
| `<+trigger.commitSha>` | Head commit SHA of the PR |
| `<+trigger.baseCommitSha>` | Base commit SHA for the diff range |
| `<+inputs.accountID>` | Harness Account ID passed as a pipeline input |
| `<+inputs.orgId>` | Harness Organization ID passed as a pipeline input |
| `<+secret.getValue("secretName")>` | Value of a Harness secret (recommended for environment variables) |

### Example instructions with dynamic context

The following system prompt uses trigger expressions to inject repository and branch context at runtime:

```
You are a Principal-level Staff Engineer and Security Architect acting as an
automated Pull Request reviewer.

Repository Name: <+trigger.repoName>
Branch: <+trigger.branch>

Review the diff across four domains: Security, Compliance, Schema/Architecture,
and Engineering Judgment. Output a structured findings table and architectural
assessment with a clear Approve / Request Changes / Block recommendation.
```

:::warning
Harness expressions in the Instructions field are resolved at **pipeline execution time**, not when you save the agent.
:::

---

## Configure MCP connectors

MCP (Model Context Protocol) connectors give the Worker Agent real-time access to Harness platform data and external services.

Each connector requires two values:

- **MCP Server URL**: The hosted MCP endpoint (such as the Harness Hosted MCP URL).
- **API Key**: The authentication credential for that MCP server.

**Harness Hosted MCP** is the recommended connector for accessing Harness-native data, including pipelines, executions, services, and environments. GitHub is also supported as an MCP source.

:::warning GitHub MCP Connector
The **GitHub MCP Connector** in the Harness Connector Catalog is designed for use with **AI Chat only**. It is not compatible with Worker Agents at this time. To give a Worker Agent access to GitHub data, use the Harness Hosted MCP connector or configure a custom MCP server endpoint.
:::

### Harness Hosted MCP endpoints

| Cluster | MCP URL |
|---|---|
| prod0 | `https://unifiedpipeline.harness.io/mcp-server-external/mcp` |
| prod0 (devday) | `https://devday.harness.io/mcp-server-external/mcp` |
| prod1 | `https://app.harness.io/prod1/mcp-server-external/mcp` |
| prod2 | `https://app.harness.io/gratis/mcp-server-external/mcp` |
| prod3 | `https://app3.harness.io/mcp-server-external/mcp` |
| harness0 | `https://harness0.harness.io/mcp-server-external/mcp` |
| eu1 | `https://accounts.eu.harness.io/mcp-server-external/mcp` |
| qa | `https://qa.harness.io/mcp-server-external/mcp` |

### Set up an MCP Server Connector

<div align="center">
  <DocImage path={require('./static/mcp-connector-setup.png')} alt="MCP Server Connector configuration showing server URL, authentication type, header name, and header value fields" title="Click to view full size" width="50%" />
  <p align="center"><em>MCP Server Connector setup with server URL and custom header authentication</em></p>
</div>

To create an MCP Server Connector in Harness:

1. Navigate to **Connectors** in your project, organization, or account settings.
2. Search for **MCP** in the connector catalog and select **MCP Server**.
3. In the **Details** step, enter the **Server URL** from the table above.
4. Under **Authentication**, select **Custom Header**.
5. Set the **Header Name** to `X-Api-Key`.
6. Set the **Header Value** to your API key, stored as a Harness secret.
7. Click **Continue**, select a connectivity mode, and run the connection test.

:::warning
MCP connectors require **both** a valid hosted MCP URL and an API key. A connector name alone is not sufficient.
:::

### MCP Connector YAML examples

The following examples show the connector YAML for Harness MCP and GitHub MCP. You can create these connectors via the API or by importing the YAML in the Harness Connector settings.

**Harness MCP Connector:**

```yaml
connector:
  name: Harness MCP
  identifier: connector_Mcp_66c8
  accountIdentifier: <your_account_id>
  orgIdentifier: default
  projectIdentifier: <your_project>
  type: Mcp
  spec:
    serverUrl: https://unifiedpipeline.harness.io/mcp-server-external/mcp
    auth:
      type: CustomHeader
      spec:
        headerName: X-Api-Key
        headerValueRef: <your_harness_api_key_secret>
    executeOnDelegate: false
```

**GitHub MCP Connector:**

```yaml
connector:
  name: Github_MCP
  identifier: Github_MCP
  accountIdentifier: <your_account_id>
  orgIdentifier: default
  projectIdentifier: <your_project>
  type: Mcp
  spec:
    serverUrl: https://api.githubcopilot.com/mcp
    auth:
      type: ApiKey
      spec:
        apiKeyRef: <your_github_oauth_token_secret>
    executeOnDelegate: false
```

Replace the placeholder values (`<your_account_id>`, `<your_project>`, `<your_harness_api_key_secret>`, `<your_github_oauth_token_secret>`) with your actual account identifier, project identifier, and secret references.

---

## Configure inputs

Inputs are typed parameters defined on the agent. They surface in the pipeline step UI and can be passed from upstream steps, trigger payloads, or set manually.

Supported input types: `string`, `connector`, `array`

### YAML reference

```yaml
inputs:
  llmConnector:
    type: connector
    required: true
    default: anthropic_bedrock_99cf4be5
  modelName:
    type: string
    required: true
    default: arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/a1b2c3d4e5f6
  mcpConnectors:
    type: array
    default:
      - harness_hosted_mcp
```

---

## Configure environment variables

Environment variables configure the agent's runtime container. They support two value types:

- **Fixed value**: A static string (such as a model ARN or feature flag).
- **Secret expression**: `<+secret.getValue("secretName")>` to pull from Harness Secrets Manager at runtime.

### Common variables

| Variable | Purpose |
|---|---|
| `PLUGIN_HARNESS_CONNECTOR` | Connector ID used by the agent plugin to authenticate with Harness APIs |
| `ANTHROPIC_MODEL` | Overrides the model for Claude CLI-compatible runtimes |
| `REPO_NAME` | Passes repository context to the agent for repo-scoped tasks |

---

## Configure pipeline triggers

Worker Agents support all standard Harness pipeline trigger types, including webhook, artifact, manifest, and scheduled triggers.

Add a trigger to your pipeline, then reference its expressions (`<+trigger.prNumber>`, `<+trigger.repoName>`, and others) in your agent's Instructions to scope behavior to the triggering event.

<DocImage path={require('./static/pipeline-triggers.png')} alt="Harness pipeline trigger catalog showing webhook, artifact, manifest, and scheduled trigger options" title="Click to view full size" />
<p align="center"><em>All Harness pipeline trigger types are supported for Worker Agent pipelines</em></p>

Go to <a href="/docs/platform/triggers/triggers-overview" target="_blank">Triggers overview</a> for more information on available trigger types.

---

## Configure Slack notifications

Worker Agent results can be forwarded to Slack using pipeline notifications, user group notifications, the Slack Notify step, or custom scripts.

### Pipeline notifications (native)

Pipeline notifications send alerts based on pipeline events.

1. Click the **Notify** icon in the Harness pipeline studio.
2. Add a name and select the **Pipeline Events** to trigger the notification.
3. In **Notification Method**, select `Slack`.
4. Paste your Slack Incoming Webhook URL, or reference it as a secret: `<+secrets.getValue("slackwebhookURL")>`.

Go to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-pipeline-notifications" target="_blank">Configure pipeline notifications</a> for complete setup instructions.

### User group notifications

User group notifications alert specific teams based on pipeline events.

1. Navigate to **Access Control**, then select **User Groups**.
2. Select a User Group and navigate to **Notification Preferences**.
3. Select **Slack Webhook URL** and paste your webhook.

Go to <a href="/docs/platform/notifications/send-notifications-using-slack/" target="_blank">Send notifications using Slack</a> for complete setup instructions.

### Slack Notify step (CD pipelines)

A dedicated **Slack Notify Step** is available in CD and custom stages. It must be inside a step group with container-based execution. It supports channel ID or email targeting, plain text or Slack Block Kit, and threading via `thread_ts`.

```yaml
- step:
    type: SlackNotify
    name: SlackNotify_1
    identifier: SlackNotify_1
    spec:
      channel: CHANNEL_ID
      messageContent: <+input>
      token: SLACK_TOKEN
      threadTs: THREAD_ID
```

### Custom Slack messages via script

To include additional pipeline data in Slack notifications, use a Shell Script or Run step with `curl`:

```bash
curl -X POST -H 'Content-type: application/json' --data '{
  "text": "Slack notifications - Harness",
  "attachments": [{
    "fields": [
      {"title": "Pipeline Name", "value": "<+pipeline.name>", "short": true},
      {"title": "Triggered by", "value": "<+pipeline.triggeredBy.email>", "short": true}
    ]
  }]
}' https://hooks.slack.com/services/<your-webhook>
```

:::tip
Always store your Slack webhook URL as an encrypted text secret in Harness and reference it via `<+secrets.getValue("your-secret-id")>`. Go to <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank">Add and use text secrets</a> for more information on setting up encrypted secrets.
:::

---

## Agent settings

**Agent Settings** is a key-value configuration field on the Agent step that maps directly to environment variables at runtime. Any key-value pair you define is injected into the agent's execution context as an environment variable, scoped to the step level rather than the agent definition.

This is useful when you have a Worker Agent template with multiple input fields and you want to supply values at the pipeline step level without modifying the agent definition itself. For example, if your agent template defines five input fields (`targetEnv`, `slackChannel`, `approvalPolicy`, `maxRetries`, `notifyOnFailure`), you provide those values in Agent Settings when adding the step to your pipeline. Each one is converted into a corresponding environment variable available to the agent at runtime.

---

## Configure agent outputs

Worker Agents can publish **output variables** that downstream pipeline steps consume. This lets you chain agent results into approval gates, conditional logic, notifications, or other steps in the same pipeline.

### Declare outputs in the agent definition

To expose output variables from a Worker Agent, add an `output` array to the `with` block in your agent YAML. Each entry maps a `name` (the key written to the output file at runtime) to an `alias` (the variable name exposed to downstream steps).

```yaml
with:
  task: |
    # Agent instructions that write KEY=value lines to $HARNESS_OUTPUT
  output:
    - name: RECOMMENDATION
      alias: RECOMMENDATION
    - name: RISK_LEVEL
      alias: RISK_LEVEL
```

Without this declaration, the agent can still write to `$HARNESS_OUTPUT` and `$DRONE_OUTPUT`, but the keys are not surfaced as named output variables on the step. Declaring them makes the outputs visible in the pipeline execution UI and referenceable by downstream steps.

Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/example-agents#example-iac-plan-safety-agent-with-output-variables" target="_blank">Example: IaC Plan Safety Agent with output variables</a> to see a complete agent definition with output declarations.

### How outputs work

The agent runtime exposes output files via the `$HARNESS_OUTPUT` and `$DRONE_OUTPUT` environment variables. To publish outputs, the agent writes `KEY=value` lines to these files during execution. Each key becomes an **Output Variable** visible on the step's **Output** tab in the pipeline execution UI.

<DocImage path={require('./static/agent-step-outputs.png')} alt="Agent step Output tab showing output variables such as RECOMMENDATION, RISK_LEVEL, MAX_RISK_SCORE, VALIDATION_STATUS, and SUMMARY" title="Click to view full size" />
<p align="center"><em>Agent step Output tab displaying published output variables from an IaC Plan Safety agent</em></p>

### Publish outputs from agent instructions

Include shell commands in your agent's Instructions that append `KEY=value` lines to the output files. The following pattern writes outputs from a JSON assessment file:

```bash
REPORT="/harness/agent/output/assessment.json"
RECOMMENDATION=$(jq -r '.recommendation // "REJECT"' "$REPORT")
RISK_LEVEL=$(jq -r '.risk_level // "CRITICAL"' "$REPORT")
MAX_RISK_SCORE=$(jq -r '.max_risk_score // 10' "$REPORT")
SUMMARY=$(jq -r '.summary // ""' "$REPORT" | tr '\n' ' ' | cut -c 1-500)

VALIDATION_STATUS=PASS
if [ "$RECOMMENDATION" = "REJECT" ] || [ "$RISK_LEVEL" = "CRITICAL" ]; then
  VALIDATION_STATUS=FAIL
fi

for OUTPUT_FILE in "${HARNESS_OUTPUT:-}" "${DRONE_OUTPUT:-}"; do
  if [ -n "$OUTPUT_FILE" ] && [ "$OUTPUT_FILE" != "${LAST_OUTPUT_FILE:-}" ]; then
    printf 'RECOMMENDATION=%s\n' "$RECOMMENDATION" >> "$OUTPUT_FILE"
    printf 'RISK_LEVEL=%s\n' "$RISK_LEVEL" >> "$OUTPUT_FILE"
    printf 'MAX_RISK_SCORE=%s\n' "$MAX_RISK_SCORE" >> "$OUTPUT_FILE"
    printf 'VALIDATION_STATUS=%s\n' "$VALIDATION_STATUS" >> "$OUTPUT_FILE"
    printf 'RISK_ASSESSMENT_PATH=%s\n' "$REPORT" >> "$OUTPUT_FILE"
    printf 'SUMMARY=%s\n' "$SUMMARY" >> "$OUTPUT_FILE"
    LAST_OUTPUT_FILE="$OUTPUT_FILE"
  fi
done
```

### Reference outputs in downstream steps

Once an agent publishes outputs, reference them in subsequent steps using Harness expressions:

```
<+steps.<step_identifier>.output.outputVariables.RECOMMENDATION>
<+steps.<step_identifier>.output.outputVariables.RISK_LEVEL>
<+steps.<step_identifier>.output.outputVariables.VALIDATION_STATUS>
```

For example, to gate a deployment based on an agent's risk assessment, add a conditional execution on a downstream step:

```
<+steps.iacm_plan_safety_agent_1.output.outputVariables.VALIDATION_STATUS> == "PASS"
```

### Best practices for agent outputs

- **Write to both output files:** Check both `$HARNESS_OUTPUT` and `$DRONE_OUTPUT`. If both point to the same path, write only once to avoid duplicate entries.
- **Validate before publishing:** Read back any generated JSON and verify it is valid before extracting output values. If invalid, overwrite with corrected JSON first.
- **Use consistent key names:** Define output keys that are descriptive and stable across agent versions so downstream steps do not break.
- **Keep values concise:** Output values are visible in the pipeline UI. Limit strings (such as summaries) to 500 characters or fewer.

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents" target="_blank">Worker Agents</a>: Learn how to create and manage Worker Agents.
- <a href="/docs/platform/harness-ai/model-connector" target="_blank">Choose a Model Connector</a>: Configure Anthropic or OpenAI connectors for your agents.
- <a href="/docs/platform/variables-and-expressions/harness-expressions-reference" target="_blank">Harness expressions reference</a>: Master expression syntax for dynamic agent configuration.