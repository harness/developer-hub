---
title: Worker Agents
description: Create and configure AI-powered worker agents that run inside Harness pipelines to automate code review, incident response, data synthesis, and other intelligent workflows.
sidebar_label: Worker Agents
sidebar_position: 6
keywords:
  - worker agents
  - harness agents
  - ai agents
  - mcp connectors
  - pipeline agents
tags:
  - ai
  - agents
  - pipelines
redirect_from:
  - /docs/platform/harness-aida/harness-agents
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import DocImage from '@site/src/components/DocImage';

Worker Agents are AI-powered automation units that execute tasks inside Harness pipelines using a language model, MCP-connected data sources, and configurable inputs. Each Worker Agent pairs a prompt (Instructions), a Model Connector, and optional MCP Servers into a single, reusable, governed step you can add to CI, CD, IaCM, STO, SCS, or Custom stages.

---

## Prerequisites

- **Harness account with AI Agents enabled:** You need **AI Agents** under the **AI** section in the Harness module selector. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support

    If AI Agents does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). An administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Connector permissions:** You need **View**, **Create/Edit**, and **Delete** for [Connectors](/docs/platform/role-based-access-control/permissions-reference#connectors) to create and manage the Model Provider Connector and MCP Connector.
- **Secret permissions:** You need **View** and **Access** (reference) for [Secrets](/docs/platform/role-based-access-control/permissions-reference#secrets) at a minimum, since both the Model Provider Connector and MCP Connector reference secrets for authentication.
- **Model Connector:** An Anthropic Connector configured with a default model. Go to [Configure Model Connectors](#configure-model-connectors) to review supported models and setup options.
- **MCP Connector (optional):** An MCP Server Connector with a valid hosted MCP URL and API key. Go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to set up MCP access.

---

## Navigate to Worker Agents

1. From any Harness module, open the **Module Selector** in the left navigation bar.
2. Locate the **AI** section.
3. Select **Worker Agents** to open the **Worker Agent Catalog**.

The catalog displays all available worker agents for your project scope, including system agents and custom agents you have created.

---

## Create a Worker Agent

Custom agents appear in the **Custom** tab of the Worker Agent Catalog. These are agents you or your team have created or forked from the Marketplace.

<DocImage path={require('./static/custom-agents-catalog.png')} alt="Worker Agent Catalog Custom tab showing user-created agents including Approval review, Code review, IaCM plan safety, Pipeline failure summarizer, and PR review agents" title="Click to view full size" />
<p align="center"><em>The Custom tab displays all user-created and forked Worker Agents in your project</em></p>

To create a new custom agent:

1. In the Worker Agent Catalog, select **+ Create**.
2. Complete all required fields in the **Create Agent** form. Go to the [field reference](#worker-agent-form-field-reference) below to review details on each field.
3. Select **Save agent** to publish the agent to your catalog.

<DocImage path={require('./static/create-agent-form.png')} alt="Create Agent form showing fields for Agent name, Description, Instructions, Model provider, Model name, MCP connectors, Inputs, and Environment variables" title="Click to view full size" />
<p align="center"><em>The Create Agent form with Visual and YAML tabs for defining your custom Worker Agent</em></p>

:::tip
You can view the agent definition in both Visual and YAML modes. Switch to the **YAML** tab to see the full agent configuration, including the container image, instructions, inputs, and environment variables.
:::

---

## Agent Marketplace

The Worker Agent Catalog includes a **Marketplace** tab and a **Custom** tab. The Marketplace provides pre-built agents maintained by Harness that you can use immediately or fork into custom agents.

<DocImage path={require('./static/agent-marketplace.png')} alt="Worker Agent Catalog showing the Marketplace tab with Harness-managed agents including Feature flag cleanup, Manifest remediator, Autofix, Onboarding, Code review, Zero day remediation, Code coverage, IaCM remediation, and React upgrade agents" title="Click to view full size" />
<p align="center"><em>The Agent Marketplace with Harness-managed agents available for your project</em></p>

### Agent categories

The Marketplace includes three categories of agents:

| Category | Description |
|---|---|
| **Harness Certified** | Agents verified and certified by Harness for production use. These agents meet strict quality, security, and performance standards. |
| **Harness Managed** | Agents maintained and owned by Harness. These are loaded into your account by default and receive ongoing updates. |
| **Community** | Agents contributed by the Harness community. Available for use but not officially maintained by Harness. |

By default, your account includes **Harness Managed** agents. These agents are ready to use out of the box and cover common use cases such as code review, autofix, code coverage, manifest remediation, onboarding, feature flag cleanup, zero day remediation, IaCM remediation, and library upgrades.

### Fork and customize a Marketplace agent

You can fork any Marketplace agent to create a custom version:

1. In the **Marketplace** tab, select the agent you want to customize.
2. Review the agent's instructions, inputs, and configuration.
3. Select **Fork** (or copy the agent definition) to create a new custom agent based on the Marketplace agent.
4. Modify the instructions, inputs, environment variables, or MCP connectors to fit your requirements.
5. Select **Save** to publish your custom agent to the **Custom** tab.

Forked agents are independent of the original Marketplace agent. Changes to the Marketplace version do not affect your custom copy.

---

## Worker Agent form field reference

The following fields define a Worker Agent. Required fields are marked in the **Required** column.

| Field | Required | Description | Example |
|---|---|---|---|
| **Name** | Yes | Human-readable identifier displayed in the catalog and pipeline step picker. | `PR Reviewer Agent` |
| **Description** | No | Free-text summary of what the agent does. Helps teams discover and reuse agents from the catalog. | `Reviews PRs for security, schema, and architectural issues.` |
| **Instructions** | Yes | The system prompt sent to the model at runtime. Supports Harness variable expressions for dynamic context injection. Go to [Configure instructions and Harness expressions](#configure-instructions-and-harness-expressions) to review dynamic context injection. | Example below |
| **Model Connector** | Yes | The LLM provider connector. When you configure the connector, you select a default model. Go to [Configure Model Connectors](#configure-model-connectors) for supported providers and models. | `anthropic_bedrock_99cf4be5` |
| **Model Name** | No | Optional override for the model used at runtime. If not specified, the agent uses the default model configured on the Model Connector. Accepts an AWS Bedrock inference profile ARN for Anthropic connectors. | `arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/a1b2c3d4e5f6` |
| **MCP Connectors** | No | One or more MCP server connectors granting the agent access to Harness platform data and external services (such as GitHub). Each connector requires a URL and API key. | `rohan_hosted_mcp` |
| **Inputs** | No | Named parameters the agent accepts at runtime. Populated from pipeline step outputs, triggers, or manual values. Injected into the agent prompt as context. | `llmConnector`, `modelName`, `mcpConnectors` |
| **Environment Variables** | No | Key-value pairs passed to the agent runtime. Used for third-party authentication or model behavior configuration. Supports fixed values or Harness secret expressions. | `PLUGIN_HARNESS_CONNECTOR`, `ANTHROPIC_MODEL` |

---

## Supported stage types

The **Agent** step can be added to any of the following Harness stage types:

| Stage type | Identifier |
|---|---|
| Custom | `Custom` |
| Continuous Integration | `CI` |
| Continuous Delivery | `CD` |
| Infrastructure as Code Management | `IACM` |
| Security Testing Orchestration | `STO` |
| **Model Connector** | Yes | The LLM provider connector. When you configure the connector, you select a default model. Go to [Configure Model Connectors](#configure-model-connectors) to view supported providers and models. | `anthropic_bedrock_99cf4be5` |

This means a Worker Agent can be embedded as a step in any pipeline stage where you want AI-driven automation, from PR review in CI to compliance checks in SCS.

:::info CD and Custom stages
For CD and Custom stages, the Agent step must be placed inside a **Containerized Step Group**. Go to [Containerized step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups) to set up container-based execution in these stage types.
:::

---

## Configure Model Connectors

The Model Connector defines the LLM provider and default model for your Worker Agent. When you create or select a connector, you choose a default model that the agent uses at runtime unless overridden by the optional **Model Name** field.

### Anthropic Connector

The Anthropic Connector supports both **direct Anthropic** endpoints and **AWS Bedrock** endpoints. When creating the connector, select the **Authentication Type** (Personal Token for direct Anthropic, or Amazon Bedrock API Key), the **Region**, and the default **Model Name**.

<div align="center">
  <DocImage path={require('./static/anthropic-connector-setup.png')} alt="Anthropic Connector configuration showing authentication type, region, and model name fields" title="Click to view full size" width="50%" />
  <p align="center"><em>Anthropic Connector setup with authentication type selection and model configuration</em></p>
</div>

The following default models are available when configuring the connector:

| Model | Description |
|---|---|
| Claude Sonnet 4.6 | Fast, high-capability model for most tasks |
| Claude Opus 4.6 | Most capable model for complex reasoning |
| Claude Sonnet 4.5 | Previous-generation fast model |
| Claude Opus 4.5 | Previous-generation reasoning model |

### OpenAI Connector (coming soon)

OpenAI Connector support is under development. The following models will be available:

| Model | Description |
|---|---|
| GPT-4o | Multimodal flagship model |
| GPT-4o mini | Lightweight, cost-efficient model |
| GPT-4.1 | Latest generation model |
| GPT-4.1 mini | Lightweight latest generation model |
| GPT-4.1 nano | Ultra-lightweight latest generation model |

---

## Infrastructure and execution

Worker Agents run inside Docker containers in an isolated VM. You can run agents on **Harness Cloud** or on your own infrastructure in a **Kubernetes cluster**.

- **Harness Cloud:** Harness manages the compute infrastructure. Select `Cloud` as the runtime type in your pipeline stage configuration. Available for CI, STO, SCS, and IACM stages.
- **Self-hosted infrastructure:** Run agents on your own Kubernetes cluster using a Harness Delegate. The agent container executes in an isolated VM on your infrastructure, giving you full control over networking, data residency, and compute resources.

For CD and Custom stages, the Agent step requires a [Containerized Step Group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups) to provide the container execution environment.

---

## Security

Worker Agents execute inside Docker containers in isolated VMs, whether on Harness Cloud or your self-hosted infrastructure. The agent's access is controlled by a **scoped token** that is provided at runtime.

### Scoped token behavior

The scoped token operates with the same credentials as the user who authored the agent when the agent was configured. This means the agent can access only the resources, connectors, and secrets that the authoring user has permissions for within the pipeline execution context.

### Isolation model

- **Container isolation:** Each agent runs in its own Docker container within an isolated VM. Agents do not share memory, filesystem, or network namespaces with other workloads.
- **Network scoping:** The agent can only reach external services and APIs that the scoped token and network configuration permit.
- **No ambient permissions:** Agents have no implicit access beyond what the scoped token grants. MCP connectors, secrets, and connectors must be explicitly configured on the agent definition.

---

## RBAC for Worker Agents

Worker Agents have dedicated RBAC permissions in Harness. Administrators can control who can view, create, modify, and delete agents.

### Available permissions

| Permission | Description |
|---|---|
| **View** | View agent definitions in the catalog |
| **Create** | Create new Worker Agents |
| **Edit** | Modify existing Worker Agent definitions |
| **Delete** | Remove Worker Agents from the catalog |

### Configure agent permissions

1. Go to **Settings**, then select **Access Control**.
2. Select or create a **Role**.
3. Under the **AI Agents** resource, enable the permissions you want to grant (**View**, **Create**, **Edit**, **Delete**).
4. Assign the role to the appropriate users or user groups.

Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to learn about role-based access control. Go to [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to create and assign roles.

---

## Configure instructions and Harness expressions

The **Instructions** field is the agent's system prompt. It accepts Harness variable expressions, which allows a single agent definition to operate dynamically across different repositories, branches, accounts, and organizations.

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

MCP (Model Context Protocol) connectors give the Worker Agent real-time access to Harness platform data and external services. Each connector requires two values:

- **MCP Server URL:** The hosted MCP endpoint (such as the Harness Hosted MCP URL).
- **API Key:** The authentication credential for that MCP server.

**Harness Hosted MCP** is the recommended connector for accessing Harness-native data, including pipelines, executions, services, and environments. GitHub is also supported as an MCP source.

### Harness Hosted MCP endpoints

| Cluster | Endpoint |
|---|---|
| Prod0 | `https://unifiedpipeline.harness.io/mcp-server-external/mcp` |
| Prod0 | `https://prod0.harness.io/mcp-server-external/mcp` |
| Prod0 (DevDays) | `https://devdays.harness.io/mcp-server-external/mcp` |
| Prod1 and Prod2 | `https://mcp.harness.io/mcp` |

### Set up an MCP Server Connector

<div align="center">
  <DocImage path={require('./static/mcp-connector-setup.png')} alt="MCP Server Connector configuration showing server URL, authentication type, header name, and header value fields" title="Click to view full size" width="50%" />
  <p align="center"><em>MCP Server Connector setup with server URL and custom header authentication</em></p>
</div>

To create an MCP Server Connector in Harness:

1. Go to **Connectors** in your project, organization, or account settings.
2. Search for **MCP** in the connector catalog and select **MCP Server**.
3. In the **Details** step, enter the **Server URL** from the table above.
4. Under **Authentication**, select **Custom Header**.
5. Set the **Header Name** to `X-Api-Key`.
6. Set the **Header Value** to your API key, stored as a Harness secret.
7. Select **Continue**, choose a connectivity mode, and run the connection test.

:::warning
MCP connectors require **both** a valid hosted MCP URL and an API key. A connector name alone is not sufficient.
:::

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
      - rohan_hosted_mcp
```

---

## Configure environment variables

Environment variables configure the agent's runtime container. They support two value types:

- **Fixed value:** A static string (such as a model ARN or feature flag).
- **Secret expression:** `<+secret.getValue("secretName")>` to pull from Harness Secrets Manager at runtime.

### Common variables

| Variable | Purpose |
|---|---|
| `PLUGIN_HARNESS_CONNECTOR` | Connector ID used by the agent plugin to authenticate with Harness APIs |
| `ANTHROPIC_MODEL` | Overrides the model for Claude CLI-compatible runtimes |
| `REPO_NAME` | Passes repository context to the agent for repo-scoped tasks |

---

## Configure pipeline triggers

Worker Agents support all standard Harness pipeline trigger types, including webhook, artifact, manifest, and scheduled triggers. Add a trigger to your pipeline, then reference its expressions (`<+trigger.prNumber>`, `<+trigger.repoName>`, and others) in your agent's Instructions to scope behavior to the triggering event.

<DocImage path={require('./static/pipeline-triggers.png')} alt="Harness pipeline trigger catalog showing webhook, artifact, manifest, and scheduled trigger options" title="Click to view full size" />
<p align="center"><em>All Harness pipeline trigger types are supported for Worker Agent pipelines</em></p>

Go to [Triggers overview](/docs/platform/triggers/triggers-overview) to learn about the full range of available trigger types.

---

## Configure Slack notifications

Worker Agent results can be forwarded to Slack using pipeline notifications, user group notifications, the Slack Notify step, or custom scripts.

### Pipeline notifications (native)

1. Select the **Notify** icon in the Harness pipeline studio.
2. Add a name and select the **Pipeline Events** to trigger the notification.
3. In **Notification Method**, select `Slack`.
4. Paste your Slack Incoming Webhook URL, or reference it as a secret: `<+secrets.getValue("slackwebhookURL")>`.

Go to [Configure pipeline notifications](/docs/platform/notifications/notification-settings/#configure-pipeline-notifications) to review the full setup.

### User group notifications

1. Go to **Access Control**, then select **User Groups**.
2. Select a User Group and go to **Notification Preferences**.
3. Select **Slack Webhook URL** and paste your webhook.

Go to [Send notifications using Slack](/docs/platform/notifications/send-notifications-using-slack/) to review the full setup.

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
Always store your Slack webhook URL as an encrypted text secret in Harness and reference it via `<+secrets.getValue("your-secret-id")>`. Go to [Add and use text secrets](/docs/platform/secrets/add-use-text-secrets) to set up encrypted secrets.
:::

---

## Example: Staff Engineer PR Review Agent

This agent acts as a Principal-level Staff Engineer and Security Architect. It performs deep, opinionated review across four domains: Security, Compliance, Schema/Architecture, and Engineering Judgment. It is suited for high-risk or architecture-sensitive changes.

```yaml
version: 1
agent:
  step:
    run:
      container:
        image: pkg.harness.io/vrvdt5ius7uwygso8s0bia/harness-agents/harness-ai-agent:latest
      with:
        task: |
          You are a Principal-level Staff Engineer and Security Architect acting as an
          automated Pull Request reviewer. Your role is to provide rigorous, opinionated,
          and actionable code review across four domains: Security, Compliance,
          Schema/Architecture, and Engineering Judgment.

          Repository Name: <+trigger.repoName>
          Branch: <+trigger.branch>

          ## REVIEW SCOPE
          1. SECURITY - Injection risks, auth gaps, insecure defaults, OWASP Top 10
          2. COMPLIANCE - GDPR, SOC 2, PII handling, audit trail gaps
          3. SCHEMA & ARCHITECTURE - Migration safety, API contracts, distributed consistency
          4. ARCHITECTURAL JUDGMENT - Strategic fit, complexity tradeoffs, tech debt

          ## OUTPUT FORMAT
          - Summary (risk tier: Low / Medium / High / Critical)
          - Findings Table (Severity | Domain | File | Finding | Recommendation)
          - Detailed Findings for anything above Info severity
          - Architectural Assessment
          - Approval Decision: Approve / Approve with Changes / Request Changes / Block
        max_turns: 150
        mcp_format: harness
        mcp_servers: <+connectorInputs.resolveList(<+inputs.mcpConnectors>)>
      env:
        REPO_NAME: go-example
        PLUGIN_HARNESS_CONNECTOR: <+inputs.llmConnector.id>
        ANTHROPIC_MODEL: <+inputs.modelName>
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
        - rohan_hosted_mcp
```

---

## Example: Diff-scoped PR Reviewer

This agent is trigger-aware and diff-scoped. It retrieves the exact PR and diff identified by the pipeline trigger context, including PR number, source/target branch, and commit SHAs, and reviews only the changed lines. It avoids broad architectural commentary not caused by the diff, making it well-suited for high-frequency PR pipelines where precision and low noise matter.

Key differences from the Staff Engineer example:

- **Trigger-aware targeting:** Uses `<+trigger.prNumber>`, `<+trigger.sourceBranch>`, `<+trigger.targetBranch>`, `<+trigger.commitSha>`, and `<+trigger.baseCommitSha>` for precise PR targeting via Harness MCP.
- **Diff-scoped review:** Reviews only files and lines changed by the diff, not the entire repository.
- **Lower cost:** `max_turns: 40` (compared to 150) for faster, lower-cost execution.
- **Explicit failure mode:** Stops and reports if the exact diff cannot be retrieved.

```yaml
version: 1
agent:
  step:
    run:
      container:
        image: pkg.harness.io/vrvdt5ius7uwygso8s0bia/harness-agents/harness-ai-agent:latest
      with:
        task: |
          You are an automated pull request reviewer. Review exactly the pull request that
          triggered this pipeline run.

          ## Trigger Context
          - Repository: <+trigger.repoName>
          - PR number: <+trigger.prNumber>
          - Source branch: <+trigger.sourceBranch>
          - Target branch: <+trigger.targetBranch>
          - Head commit: <+trigger.commitSha>
          - Base commit: <+trigger.baseCommitSha>

          ## Required Workflow
          1. Use Harness MCP to retrieve the exact PR identified above.
          2. Retrieve the exact PR diff, or the base-to-head diff for the trigger commit range.
          3. Review only files and lines changed by that diff.
          4. Do not use branch name alone to identify the PR.
          5. Do not inspect other PRs, old PRs, or repository-wide historical issues.
          6. If the exact PR diff cannot be retrieved, stop and report failure with context.
          7. Base every finding strictly on the diff and directly relevant surrounding context.

          ## Review Criteria
          Prioritize high-signal issues introduced by the changed lines:
          - Security flaws such as injection, unsafe auth/authz behavior, secret exposure,
            unsafe deserialization, or unsafe input handling.
          - API, schema, data model, or compatibility risks introduced by the diff.
          - Test, build, correctness, concurrency, or maintainability risks introduced by the diff.
          - Compliance issues only when the diff directly touches PII, authentication,
            authorization, audit logs, retention, payments, regulated data, or sensitive logging.

          ## Output Format
          - Summary (one paragraph, risk tier, recommendation)
          - Findings Table (# | Domain | Severity | File | Finding | Recommendation)
          - Detailed Findings for anything above Info
          - Approval Decision with one-sentence rationale
        max_turns: 40
        mcp_format: harness
        mcp_servers: <+connectorInputs.resolveList(<+inputs.mcpConnectors>)>
      env:
        PLUGIN_HARNESS_CONNECTOR: <+inputs.llmConnector.id>
        ANTHROPIC_MODEL: <+inputs.modelName>
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
        - rohan_qa_mcp
      ui:
        component: array
        input:
          inputType: connector
```

---

## Use a Worker Agent in a pipeline

Worker Agents are referenced in pipeline YAML using the `Agent` step type. The step specifies the agent by name and version (`agentName: <name>@<version>`) and inherits all inputs and environment variables from the agent definition.

### Add an Agent step

1. Open your pipeline in the Pipeline Studio.
2. Select **Add Step** in the stage execution panel.
3. In the step library, select **Agents** in the right sidebar, then select **Agent**.

<DocImage path={require('./static/agent-step-palette.png')} alt="Pipeline Studio step library showing the Agent step under the Agents category" title="Click to view full size" />
<p align="center"><em>Select the Agent step from the Agents category in the step library</em></p>

4. In the **Step Parameters** panel, enter a **Name** for the step.
5. Select the **Agent** from the dropdown. This lists all Worker Agents available in your project scope.
6. Select the **Version** to pin the step to a specific agent version, or choose **Always use stable** to use the latest stable version automatically.
7. Fill in any agent-specific input fields (such as LLM Connector, Model Name, or custom inputs defined on the agent).
8. Select **Apply Changes**.

<div align="center">
  <DocImage path={require('./static/agent-step-config.png')} alt="Agent step configuration panel showing agent selection, version picker, and input fields" title="Click to view full size" width="50%" />
  <p align="center"><em>Agent step configuration with version selection and input fields</em></p>
</div>

### Step reference syntax

```yaml
- step:
    type: Agent
    name: <Display Name>
    identifier: <step_identifier>
    spec:
      agentName: <agent_name>@<version>
      agentSettings: ""
```

The following table describes each field in the Agent step:

| Field | Description |
|---|---|
| `type: Agent` | Identifies this as a Worker Agent step. |
| `agentName` | The agent identifier and version in `name@version` format (such as `pr_review_agent@1.0.6`). |
| `agentSettings` | Reserved for future per-step agent overrides. Leave as empty string. |

### Example: PR pipeline with Agent step in a CI stage

This pipeline runs on every pull request, clones the codebase from the `go-example` repository, and executes the `pr_review_agent` Worker Agent inside the CI stage.

```yaml
pipeline:
  name: PR Pipeline V0
  identifier: pr_pipeline_v0
  tags: {}
  projectIdentifier: testhm
  orgIdentifier: default
  stages:
    - stage:
        name: ci
        identifier: ci
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: false
          execution:
            steps:
              - step:
                  type: Agent
                  name: PR Review Agent
                  identifier: pr_review_agent
                  spec:
                    agentName: pr_review_agent@1.0.6
                    agentSettings: ""
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  properties:
    ci:
      codebase:
        connectorRef: connector_git_go_example
        repoName: go-example
        prCloneStrategy: SourceBranch
        build:
          type: PR
          spec:
            number: <+trigger.prNumber>
```

### How it works end-to-end

1. A PR is opened or updated on the `go-example` repository.
2. The pipeline trigger fires and populates `<+trigger.prNumber>`, `<+trigger.repoName>`, `<+trigger.sourceBranch>`, `<+trigger.targetBranch>`, `<+trigger.commitSha>`, and `<+trigger.baseCommitSha>`.
3. The CI stage clones the source branch at the head commit.
4. The `Agent` step launches the `pr_review_agent` Worker Agent container.
5. The agent uses Harness MCP to fetch the exact PR diff and produces a structured review with findings and an approval decision.

### Example: IaC plan safety gate with agent outputs

This pipeline prepares a Terraform plan, runs a safety assessment agent, and gates deployment based on the agent's output variables. It demonstrates a three-step pattern: prepare data, run the agent, and validate outputs in a downstream step.

```yaml
pipeline:
  name: haya_iacm_agent_test
  identifier: haya_iacm_agent_test
  tags: {}
  projectIdentifier: testhm
  orgIdentifier: default
  stages:
    - stage:
        name: ci
        identifier: ci
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: false
          execution:
            steps:
              - step:
                  type: Run
                  name: Prepare Terraform Plan
                  identifier: prepare_terraform_plan
                  spec:
                    shell: Sh
                    command: |
                      set -eu
                      mkdir -p /harness/.agent/output
                      test -f deployment-risk-score-plugin/testdata/small_plan.json
                      cp deployment-risk-score-plugin/testdata/small_plan.json \
                        /harness/.agent/output/tfplan.json
                      echo "Prepared plan at /harness/.agent/output/tfplan.json"
                      jq '.resource_changes | length' /harness/.agent/output/tfplan.json
              - step:
                  type: Agent
                  name: Assess Plan Safety
                  identifier: assess_plan_safety
                  spec:
                    agentName: haya_iacm_plan_safety_agent@1.0.8
                    agentSettings: ""
                    agentIdentifier: assess_plan_safety
              - step:
                  type: Run
                  name: Gate On Agent Outputs
                  identifier: gate_on_agent_outputs
                  spec:
                    shell: Sh
                    command: |
                      set -eu

                      RECOMMENDATION="<+pipeline.stages.ci.spec.execution.steps.assess_plan_safety.steps.haya_iacm_plan_safety_agent_1.output.outputVariables.RECOMMENDATION>"
                      RISK_LEVEL="<+pipeline.stages.ci.spec.execution.steps.assess_plan_safety.steps.haya_iacm_plan_safety_agent_1.output.outputVariables.RISK_LEVEL>"
                      MAX_RISK_SCORE="<+pipeline.stages.ci.spec.execution.steps.assess_plan_safety.steps.haya_iacm_plan_safety_agent_1.output.outputVariables.MAX_RISK_SCORE>"
                      VALIDATION_STATUS="<+pipeline.stages.ci.spec.execution.steps.assess_plan_safety.steps.haya_iacm_plan_safety_agent_1.output.outputVariables.VALIDATION_STATUS>"
                      RISK_ASSESSMENT_PATH="<+pipeline.stages.ci.spec.execution.steps.assess_plan_safety.steps.haya_iacm_plan_safety_agent_1.output.outputVariables.RISK_ASSESSMENT_PATH>"

                      echo "Recommendation: $RECOMMENDATION"
                      echo "Risk level: $RISK_LEVEL"
                      echo "Max score: $MAX_RISK_SCORE"
                      echo "Validation status: $VALIDATION_STATUS"
                      echo "Risk assessment path: $RISK_ASSESSMENT_PATH"

                      if [ "$VALIDATION_STATUS" = "FAIL" ]; then
                        echo "IaC plan rejected by safety agent."
                        exit 1
                      fi

                      echo "IaC plan passed safety gate."
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  properties:
    ci:
      codebase:
        connectorRef: harness0_agentplugins_v0
        repoName: agentPlugins
        build:
          type: branch
          spec:
            branch: feat/IAC-6528
```

This pipeline follows three steps:

1. **Prepare Terraform Plan:** Copies a Terraform JSON plan file to the shared agent output directory at `/harness/.agent/output/tfplan.json`.
2. **Assess Plan Safety:** The `haya_iacm_plan_safety_agent` Worker Agent reads the plan, evaluates risk across destructive actions, public exposure, encryption removal, and IAM expansion, then publishes output variables (`RECOMMENDATION`, `RISK_LEVEL`, `MAX_RISK_SCORE`, `VALIDATION_STATUS`, `RISK_ASSESSMENT_PATH`).
3. **Gate On Agent Outputs:** A downstream Run step reads the agent's output variables using Harness expressions and fails the pipeline if `VALIDATION_STATUS` is `FAIL`, blocking unsafe infrastructure changes from proceeding.

---

## Agent settings

**Agent Settings** is a key-value configuration field on the Agent step that maps directly to environment variables at runtime. Any key-value pair you define is injected into the agent's execution context as an environment variable, scoped to the step level rather than the agent definition.

This is useful when you have a Worker Agent template with multiple input fields and you want to supply values at the pipeline step level without modifying the agent definition itself. For example, if your agent template defines five input fields (`targetEnv`, `slackChannel`, `approvalPolicy`, `maxRetries`, `notifyOnFailure`), you provide those values in Agent Settings when adding the step to your pipeline. Each one is converted into a corresponding environment variable available to the agent at runtime.

---

## Configure agent outputs

Worker Agents can publish **output variables** that downstream pipeline steps consume. This lets you chain agent results into approval gates, conditional logic, notifications, or other steps in the same pipeline.

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
<+steps.haya_iacm_plan_safety_agent_1.output.outputVariables.VALIDATION_STATUS> == "PASS"
```

### Best practices for agent outputs

- **Write to both output files:** Check both `$HARNESS_OUTPUT` and `$DRONE_OUTPUT`. If both point to the same path, write only once to avoid duplicate entries.
- **Validate before publishing:** Read back any generated JSON and verify it is valid before extracting output values. If invalid, overwrite with corrected JSON first.
- **Use consistent key names:** Define output keys that are descriptive and stable across agent versions so downstream steps do not break.
- **Keep values concise:** Output values are visible in the pipeline UI. Limit strings (such as summaries) to 500 characters or fewer.

---

## Constraints and known limitations

:::warning Model Name override format
If you override the default model using the optional **Model Name** field, you must provide an AWS Bedrock **inference profile ARN** in the format: `arn:aws:bedrock:<region>:<account-id>:application-inference-profile/<profile-id>`. Bare foundation model IDs (such as `claude-opus-4-6`) are not supported as overrides.
:::

The following limitations apply to Worker Agents:

- **MCP connector requirements:** MCP connectors require both a valid hosted MCP URL and an API key. A connector name alone is not sufficient.
- **Model provider support:** Only **direct Anthropic** and **AWS Bedrock** endpoints are supported as model providers. OpenAI Connector support is coming soon.
- **Expression resolution timing:** Harness expressions in the Instructions field are resolved at pipeline execution time, not at agent save time.
- **Max turns:** The `max_turns` parameter caps the agent's reasoning steps per execution to manage cost and latency.
- **Network access:** The agent container image must be accessible from your Harness delegate network.
- **Agent settings:** The `agentSettings` field is currently reserved. Leave it as an empty string.

---

## Troubleshooting

<Troubleshoot
  issue="Worker Agent step fails with model connector error in Harness pipeline"
  mode="docs"
  fallback="Verify that the Model Connector is an Anthropic Connector backed by AWS Bedrock and that the Model Name is a valid inference profile ARN, not a bare foundation model ID."
/>

<Troubleshoot
  issue="MCP connector connection test fails for Worker Agent in Harness"
  mode="docs"
  fallback="Ensure the MCP Server URL matches your cluster endpoint from the Harness Hosted MCP endpoints table and that the API key is stored as a Harness secret with the header name set to X-Api-Key."
/>

<Troubleshoot
  issue="Harness expressions not resolving in Worker Agent Instructions"
  mode="docs"
  fallback="Expressions such as <+trigger.repoName> resolve at pipeline execution time, not when the agent is saved. Verify that a pipeline trigger is configured and that the pipeline is executed via that trigger."
/>

---

## Next steps

You have learned how to create, configure, and run Worker Agents inside Harness pipelines. You can now build custom agents for code review, incident response, compliance checks, and other intelligent workflows.

- [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server): Set up MCP access for your agents.
- [Triggers overview](/docs/platform/triggers/triggers-overview): Configure triggers to automate agent execution on PR events, schedules, or artifacts.
- [Harness AI overview](/docs/platform/harness-ai/overview): Explore other AI-powered capabilities in the Harness platform.
