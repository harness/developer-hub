---
title: Harness Agents reference
description: Harness Agents Reference
sidebar_label: Harness Agents reference
sidebar_position: 11
keywords:
  - harness ai
  - worker agents
  - ai agents
  - agent configuration
  - yaml reference
  - agent definition
  - mcp connectors
tags:
  - Harness AI
  - Worker Agents
  - Reference
redirect_from:
  - /docs/platform/harness-ai/harness-agents#worker-agent-form-field-reference
  - /docs/platform/harness-ai/harness-agents#agent-definition-yaml-reference
  - /docs/platform/harness-ai/harness-agents#yaml-field-reference
---

## Worker Agent form field reference

The following fields define a Worker Agent. Required fields are marked in the **Required** column.

| Field | Required | Description | Example |
|---|---|---|---|
| **Name** | Yes | Human-readable identifier displayed in the catalog and pipeline step picker. | `PR Reviewer Agent` |
| **Description** | No | Free-text summary of what the agent does. Helps teams discover and reuse agents from the catalog. | `Reviews PRs for security, schema, and architectural issues.` |
| **Instructions** | Yes | The system prompt sent to the model at runtime. Supports Harness variable expressions for dynamic context injection. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration#configure-instructions-and-harness-expressions" target="_blank">Configure instructions and Harness expressions</a> to review dynamic context injection. | Example below |
| **Model Connector** | Yes | The LLM provider connector. When you configure the connector, you select a default model. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration#configure-model-connectors" target="_blank">Configure Model Connectors</a> for supported providers and models. | `anthropic_bedrock_99cf4be5` |
| **Model Name** | No | Optional override for the model used at runtime. If not specified, the agent uses the default model configured on the Model Connector. Accepts an AWS Bedrock inference profile ARN for Anthropic connectors. | `arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/a1b2c3d4e5f6` |
| **MCP Connectors** | No | One or more MCP server connectors granting the agent access to Harness platform data and external services (such as GitHub). Each connector requires a URL and API key. | `harness_hosted_mcp` |
| **Inputs** | No | Named parameters the agent accepts at runtime. Populated from pipeline step outputs, triggers, or manual values. Injected into the agent prompt as context. | `llmConnector`, `modelName`, `mcpConnectors` |
| **Environment Variables** | No | Key-value pairs passed to the agent runtime. Used for third-party authentication or model behavior configuration. Supports fixed values or Harness secret expressions. | `PLUGIN_HARNESS_CONNECTOR`, `ANTHROPIC_MODEL` |

---

## Agent definition YAML reference

The following YAML shows the full structure of a Worker Agent definition. This is the YAML visible in the **YAML** tab when you view or edit an agent in the Worker Agent Catalog (AI > Worker Agents > select agent > YAML tab).

```yaml
version: 1
agent:
  step:
    group:
      steps:
        - name: Agent
          if: <+Always>
          id: agent
          run:
            container:
              image: pkg.harness.io/vrvdt5ius7uwygso8s0bia/harness-agents/harness-ai-agent:latest
            env:
              PLUGIN_MAX_TURNS: 150
              PLUGIN_TASK: |
                # Agent instructions (system prompt) go here.
                # Supports Harness expressions for dynamic context injection.
              PLUGIN_HARNESS_CONNECTOR: ${{inputs.llmConnector.id}}
              PLUGIN_MCP_FORMAT: harness
              PLUGIN_MCP_SERVERS: <+connectorInputs.resolveList(<+inputs.mcpConnectors>)>
  inputs:
    llmConnector:
      type: connector
      required: true
      default: connector_Anthropic_112e
      ui:
        connectorCategories:
          - AI
    mcpConnectors:
      type: array
      default:
        - connector_Mcp_66c8
      ui:
        component: array
        input:
          inputType: connector
          inputConfig:
            connectorTypes:
              - Mcp
  layout:
    - title: Agent Configuration
      items:
        - llmConnector
        - mcpConnectors
```

### YAML field reference

| Field | Description |
|---|---|
| `version` | Schema version. Always `1`. |
| `agent.step.group.steps` | Array of steps executed inside the agent container. The primary step has `id: agent` and `if: <+Always>`. |
| `run.container.image` | Docker image for the agent runtime. You can override this with your own registry path if you have pulled the Harness base image and published it to your own repository (for example, to add custom tools or dependencies on top of the base image). |
| `env.PLUGIN_MAX_TURNS` | Maximum reasoning turns the agent can take per execution. |
| `env.PLUGIN_TASK` | The agent's system prompt (Instructions). Supports Harness expressions and built-in Harness environment variables (`$HARNESS_ACCOUNT_ID`, `$HARNESS_ORG_ID`, `$HARNESS_PROJECT_ID`). |
| `env.PLUGIN_HARNESS_CONNECTOR` | References the LLM connector input using `${{inputs.llmConnector.id}}`. |
| `env.PLUGIN_MCP_FORMAT` | MCP protocol format. Use `harness` for Harness MCP connectors. |
| `env.PLUGIN_MCP_SERVERS` | Resolves MCP connector references at runtime using `<+connectorInputs.resolveList(...)>`. |
| `inputs` | Typed parameters the agent accepts. Each input has a `type`, optional `required`, `default`, and `ui` configuration. |
| `inputs.<name>.ui` | Controls how the input renders in the Visual editor. `connectorCategories` filters connector types; `inputConfig.connectorTypes` restricts to specific connector kinds. |
| `layout` | Defines the Visual editor layout. Groups inputs under titled sections. |