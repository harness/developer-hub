---
title: Worker Agents overview
description: Create and configure AI-powered Worker Agents that run inside Harness pipelines to automate code review, incident response, data synthesis, and other intelligent workflows.
sidebar_label: Worker Agents
sidebar_position: 2
keywords:
  - worker agents
  - harness agents
  - ai agents
  - mcp connectors
  - pipeline agents
  - agent catalog
  - custom agents
  - agent instructions
tags:
  - harness-ai
  - worker-agents
  - pipelines
redirect_from:
  - /docs/platform/harness-aida/harness-agents
  - /docs/platform/harness-ai/harness-agents
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Worker Agents are AI-powered automation units that execute tasks inside Harness pipelines using a language model, MCP-connected data sources, and configurable inputs. Each Worker Agent pairs a prompt (Instructions), a Model Connector, and optional MCP Servers into a single, reusable, governed step you can add to CI, CD, IaCM, STO, SCS, or Custom stages.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [View the Worker Agent Catalog and browse available agents](#view-worker-agents).
- [Create a custom Worker Agent using the Harness UI](#create-a-worker-agent).
- [Create agents using Harness AI Chat or your IDE via MCP](#create-agents-via-ai-chat-and-ide).

---

## Before you begin

Before you create a Worker Agent, ensure you have the following:

- **Harness account with AI Agents enabled**: **AI Agents** section under **AI** in the Harness module selector. Go to <a href="/docs/platform/get-started/onboarding-guide" target="_blank">Getting started with Harness Platform</a> to access or create a Harness account.

    :::info Contact Harness support

    If AI Agents does not appear, contact your account administrator or <a href="mailto:support@harness.io">Harness Support</a>.

    :::

- **Pipeline permissions**: **View**, **Create/Edit**, and **Execute** permissions for <a href="/docs/platform/role-based-access-control/permissions-reference#pipelines" target="_blank">Pipelines</a>. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to configure roles.
- **Connector permissions**: **View**, **Create/Edit**, and **Delete** permissions for <a href="/docs/platform/role-based-access-control/permissions-reference#connectors" target="_blank">Connectors</a> to create and manage the Model Provider Connector and MCP Connector.
- **Secret permissions**: **View** and **Access** (reference) permissions for <a href="/docs/platform/role-based-access-control/permissions-reference#secrets" target="_blank">Secrets</a> at a minimum, since both the Model Provider Connector and MCP Connector reference secrets for authentication.
- **Model Connector**: An Anthropic or OpenAI Model Connector configured with a default model. Go to <a href="/docs/platform/harness-ai/model-connector/" target="_blank">Model Connectors</a> to review supported providers, models, and setup options.
- **MCP Connector (optional)**: An MCP Server Connector with a valid hosted MCP URL and API key. Go to <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a> to set up MCP access.

---

## View Worker Agents

Access the Worker Agent Catalog to browse all available agents in your project scope, including system-provided agents and custom agents your team has created.

1. From any Harness module, open the **Module Selector** in the left navigation bar.
2. Locate the **AI** section.
3. Select **Worker Agents** to open the **Worker Agent Catalog**.

The catalog displays all available Worker Agents for your project scope, including system agents and custom agents you have created.

---

## Create a Worker Agent

Create custom Worker Agents that appear in the **Custom** tab of the Worker Agent Catalog. Custom agents are reusable across pipelines in your project and can be versioned, shared, and governed through RBAC.

<DocImage path={require('./static/custom-agents-catalog.png')} alt="Worker Agent Catalog Custom tab showing user-created agents including Approval review, Code review, IaCM plan safety, Pipeline failure summarizer, and PR review agents" title="Click to view full size" />
<p align="center"><em>The Custom tab displays all user-created Worker Agents in your project</em></p>

To create a new custom agent:

1. In the Worker Agent Catalog, click **+ Create**.
2. Complete all required fields in the **Create Agent** form including Agent name, Instructions, Model provider, and optional MCP connectors.
3. Click **Save agent** to publish the agent to your catalog.

<DocImage path={require('./static/create-agent-form.png')} alt="Create Agent form showing fields for Agent name, Description, Instructions, Model provider, Model name, MCP connectors, Inputs, and Environment variables" title="Click to view full size" />
<p align="center"><em>The Create Agent form with Visual and YAML tabs for defining your custom Worker Agent</em></p>

:::tip
You can view the agent definition in both Visual and YAML modes. Switch to the **YAML** tab to see the full agent configuration, including the container image, instructions, inputs, and environment variables.
:::

---

## Create agents via AI Chat and IDE

In addition to the Harness UI, you can create Worker Agents using **Harness AI Chat** or directly from your **IDE or terminal** via the Harness MCP Server.

### Harness AI Chat

The Harness AI Chat interface supports an interactive agent creation workflow. When you ask the chat to create an agent (such as "Create a PR Review Agent"), it:

1. Checks existing agents in your project to avoid duplicates.
2. Gathers requirements interactively (review focus, output format, platform).
3. Generates a complete agent YAML spec.
4. Presents the spec for your review and approval.
5. Creates the agent in your project via the Harness Agent API.

You can also ask Harness AI Chat to create pipelines that reference your agents. For example, "Create a CI pipeline that runs my PR Review Agent on every pull request" generates a pipeline YAML with the Agent step pre-configured, including trigger setup and codebase configuration. This lets you go from agent creation to a working pipeline entirely through the chat interface.

This approach is useful for quickly scaffolding agents and pipelines using natural language without manually filling out each form field.

### IDE and terminal (via Harness MCP)

You can also create and manage Worker Agents from any IDE or terminal that supports MCP, including Cursor, Windsurf, VS Code (Copilot), and Claude Code. With the <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a> installed, your IDE gains access to `agent` and `agent_run` resource types, enabling you to:

- **List existing agents:** View all agents in your project.
- **Create new agents:** Provide the agent YAML spec to create an agent.
- **Update agent configurations:** Modify instructions, inputs, and environment variables.
- **Trigger agent runs:** Execute agents and inspect outputs.

Go to <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a> to install and configure the MCP Server for your IDE or terminal.

---

## Agent Marketplace

The Worker Agent Catalog includes a **Marketplace** tab and a **Custom** tab. The Marketplace provides pre-built agents maintained by Harness that you can use immediately.

<DocImage path={require('./static/agent-marketplace.png')} alt="Worker Agent Catalog showing the Marketplace tab with agents including Code review, Feature flag cleanup, Spec authoring, IaCM cost remediation, Code coverage generation, IaCM remediation, Feature spec planning, Kubernetes manifest remediation, CI failure autofix, Plan execution, Template audit, Regression repair, Test failure classification, and Vulnerability remediation agents" title="Click to view full size" />
<p align="center"><em>The Agent Marketplace with agents available for your project</em></p>

### Agent categories

The Marketplace includes three categories of agents:

| Category | Description |
|---|---|
| **Harness Certified** | Agents verified and certified by Harness for production use. These agents meet strict quality, security, and performance standards. |
| **Harness Managed** | Agents maintained and owned by Harness. These are loaded into your account by default and receive ongoing updates. |
| **Community** | Agents contributed by the Harness community. Available for use but not officially maintained by Harness. |

By default, your account includes **Harness Managed** agents. These agents are ready to use out of the box and cover common use cases such as code review, autofix, code coverage, manifest remediation, onboarding, feature flag cleanup, zero day remediation, IaCM remediation, and library upgrades.

### Contribute a Worker Agent to the Marketplace

You can submit your own Worker Agents to the **Community** category so other Harness users can discover and use them. Go to <a href="#agent-categories">Agent categories</a> to understand how Community agents differ from Harness Certified and Harness Managed agents.

Go to the <a href="https://docs.google.com/forms/d/e/1FAIpQLSezpouRTRs3pOl9r6svUmf5L98dQZGgxIQl0FUOkgnCLvcPOg/viewform" target="_blank">Worker Agent submission form</a> to submit your agent for review. Include the agent name, a clear description, the agent definition YAML, and the use case it solves. The Harness team reviews each submission before publishing it to the Marketplace. If you do not receive a response within 10 business days, contact [Harness Support](mailto:support@harness.io).

---

### Use a custom container image

The `run.container.image` field defaults to the Harness-managed agent image (`pkg.harness.io/vrvdt5ius7uwygso8s0bia/harness-agents/harness-ai-agent:latest`). You can override this value to point to your own container registry if you need to add customizations on top of the base image.

Common reasons to use a custom image:

- Install additional CLI tools or language runtimes the agent needs at runtime.
- Bundle internal certificates or proxy configuration for air-gapped environments.
- Pin a specific image tag for reproducibility instead of using `latest`.

To use a custom image, pull the Harness base image, extend it with your changes, publish it to your own registry, and update the `image` field:

```yaml
run:
  container:
    image: your-registry.example.com/your-org/harness-ai-agent-custom:1.0.0
```

Alternatively, if you prefer to pull the image from the Harness DockerHub registry instead of the default Harness private registry, use the following image reference (requires a Docker connector configured in your pipeline):

```yaml
run:
  container:
    image: harness/harness-ai-agent:0.1.40
```

The custom image must be accessible from your Harness delegate or Harness Cloud network at pipeline execution time.

### Example: Pipeline Discovery Agent

The following complete agent definition lists and summarizes pipelines in a Harness account using Harness MCP Server tools:

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
              # You can also reference built-in Harness environment variables in the prompt:
              # $HARNESS_ACCOUNT_ID, $HARNESS_ORG_ID, $HARNESS_PROJECT_ID
              # These are automatically available at runtime without defining them as inputs.
              PLUGIN_TASK: |
                You are a Harness Pipeline Discovery Agent. Your job is to list and summarize
                pipelines and list and summarize their executions in a Harness account using
                the Harness MCP Server tools.

                ## Harness context:
                $HARNESS_ACCOUNT_ID
                $HARNESS_ORG_ID
                $HARNESS_PROJECT_ID

                ## Tool usage rules
                - Use the Harness MCP pipeline tools (e.g., list_pipelines) for all pipeline data.
                  Never fabricate pipeline names, IDs, or metadata.
                  configurations return unreliable or truncated results.
                - Default to account-level scope. If the user specifies an org or project,
                  narrow scope using orgIdentifier / projectIdentifier parameters.
                - If results are paginated, retrieve all pages before responding unless the
                  user asks for a sample or top-N.

                ## Scoping behavior
                - If the user's request is ambiguous (e.g., "show me pipelines"), list at the
                  account level and note the scope in your response.
                - If a specified org/project returns zero results, confirm the identifiers are
                  correct and suggest listing available orgs/projects rather than returning
                  an empty answer.

                ## Output format
                - Return results as a table: Pipeline Name | Identifier | Project | Org |
                  Last Modified | Status (if available).
                - Lead with a one-line summary (e.g., "Found 42 pipelines across 6 projects").
                - If >25 results, group by project and offer to filter.

                ## Error handling
                - On auth or permission errors: report the failure plainly, state which scope
                  failed, and suggest verifying API key permissions — do not retry silently
                  more than once.
                - On empty results: state scope searched and parameters used so the user can
                  verify, never imply pipelines don't exist without confirming scope.

                ## Constraints
                - Read-only: never create, update, delete, or execute pipelines.
                - Do not expose API keys, tokens, or full request payloads in responses.
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

---

## Supported stage types

Worker Agents can execute in any Harness pipeline stage type. This flexibility allows you to embed AI-powered automation across your entire delivery workflow, from CI builds to CD deployments to security scans.

The **Agent** step can be added to any of the following Harness stage types:

| Stage type | Identifier |
|---|---|
| Custom | `Custom` |
| Continuous Integration | `CI` |
| Continuous Delivery | `CD` |
| Infrastructure as Code Management | `IACM` |
| Security Testing Orchestration | `STO` |
| Software Supply Chain Security | `SCS` |

This means a Worker Agent can be embedded as a step in any pipeline stage where you want AI-driven automation, from PR review in CI to compliance checks in SCS.

:::info CD and Custom stages
For CD and Custom stages, the Agent step must be placed inside a **Containerized Step Group**. Go to <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups" target="_blank">Containerized step groups</a> to set up container-based execution in these stage types.
:::

---

## Infrastructure and execution

Worker Agents execute in isolated Docker containers to ensure secure, reproducible runs. Choose between Harness-managed cloud infrastructure for zero-ops execution or your own Kubernetes cluster for full infrastructure control.

Worker Agents run inside Docker containers in an isolated VM. You can run agents on **Harness Cloud** or on your own infrastructure in a **Kubernetes cluster**.

- **Harness Cloud:** Harness manages the compute infrastructure. Select `Cloud` as the runtime type in your pipeline stage configuration. Available for CI, STO, SCS, and IACM stages.
- **Self-hosted infrastructure:** Run agents on your own Kubernetes cluster using a Harness Delegate. The agent container executes in an isolated VM on your infrastructure, giving you full control over networking, data residency, and compute resources.

For CD and Custom stages, the Agent step requires a <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups" target="_blank">Containerized Step Group</a> to provide the container execution environment.

---

## Security

Worker Agents execute inside Docker containers in isolated VMs, whether on Harness Cloud or your self-hosted infrastructure. The agent's access is controlled by a **scoped token** that is provided at runtime.

### Scoped token behavior

The scoped token grants the agent access based on the `permissions` block declared on the stage or Containerized Step Group that contains the Agent step, evaluated against the RBAC of the principal that invokes the pipeline. An agent's effective permission is the intersection of the two: the declared grant can only narrow what the invoking principal is already allowed to do, never expand it. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/permissions" target="_blank">Agent permissions</a> to review the permission grammar and supported resources.

### Isolation model

- **Container isolation:** Each agent runs in its own Docker container within an isolated VM. Agents do not share memory, filesystem, or network namespaces with other workloads.
- **Network scoping:** The agent can only reach external services and APIs that the scoped token and network configuration permit.
- **No ambient permissions:** Agents have no implicit access beyond what the scoped token grants. MCP connectors, secrets, and connectors must be explicitly configured on the agent definition.

---

## Policy governance for agents

Enforce organizational standards on Worker Agents using Harness OPA-based governance policies. Platform administrators can control which models, connectors, and configurations are allowed in agent definitions and pipeline steps.

Harness supports OPA-based governance policies for Worker Agents. Platform administrators can enforce organizational standards on agent definitions and on how agents are used in pipelines.

With policy governance on agents, you can write policies that:

- Restrict which models or model connectors an agent is allowed to use.
- Require specific MCP connectors or block unauthorized ones.
- Enforce naming conventions, description requirements, or maximum `max_turns` values.
- Prevent agents from using overly broad permissions or sensitive environment variables.

Policies are evaluated at two points:

- **On save:** When a user creates or updates a Worker Agent, Harness evaluates the agent configuration against your policies. An agent that violates a policy cannot be saved until the violation is resolved.
- **On run:** When a pipeline runs an Agent step, Harness evaluates whether the agent is properly configured in the pipeline before execution proceeds.

Go to <a href="/docs/platform/governance/policy-as-code/harness-governance-overview" target="_blank">Harness Policy As Code overview</a> to learn about OPA-based governance in Harness.

---

## Constraints and known limitations

Understand the current constraints and known limitations before deploying Worker Agents in production pipelines. These limitations cover model provider support, MCP connector requirements, and configuration format constraints.

:::warning Model Name override format
If you override the default model using the optional **Model Name** field, you must provide an AWS Bedrock inference profile ARN in the format: `arn:aws:bedrock:<region>:<account-id>:application-inference-profile/<profile-id>`. Bare foundation model IDs (such as `claude-opus-4-6`) are not supported as overrides.
:::

The following limitations apply to Worker Agents:

- **MCP connector requirements:** MCP connectors require both a valid hosted MCP URL and an API key. A connector name alone is not sufficient.
- **Model provider support:** Anthropic (**direct Anthropic** and **AWS Bedrock** endpoints) and **OpenAI** are supported as model providers.
- **Expression resolution timing:** Harness expressions in the Instructions field are resolved at pipeline execution time, not at agent save time.
- **Max turns:** The `max_turns` parameter caps the agent's reasoning steps per execution to manage cost and latency.
- **Network access:** The agent container image must be accessible from your Harness delegate network.
- **Agent settings:** The `agentSettings` field is currently reserved. Leave it as an empty string.

---

## Troubleshooting

<Troubleshoot
  issue={`Worker Agent step fails with "Model connector not found" error`}
  mode="fallback-only"
  fallback={`Here are some checks you can perform for connector-related errors in Harness pipelines:
- Verify that the Model Connector exists and is accessible in your project scope. Navigate to **Account Settings > Connectors** and confirm the connector ID matches what is configured in your agent definition. If the connector was created at a different scope (organization or account level), ensure your agent has permission to access it.

- General Connector Error Checks

    - Verify that the connector's credentials (API tokens, secrets) are not expired, as expired credentials are a common cause of connector failures. [[Pipeline FAQs](https://developer.harness.io/docs/platform/pipeline-faq#pipeline-executions-and-logs)]
    - Check that the secret reference syntax is correct: \`<+secrets.getValue("secret_name")>\` [[Investigator Agent Troubleshooting](https://developer.harness.io/docs/ai-sre/ai-agent/investigator-agent-pipelines/#troubleshooting)]
    - Rotate the API token if it has expired and re-test. [[Investigator Agent Troubleshooting](https://developer.harness.io/docs/ai-sre/ai-agent/investigator-agent-pipelines/#troubleshooting)]
    - Confirm the secret exists in Harness Secrets Manager. [[Investigator Agent Troubleshooting](https://developer.harness.io/docs/ai-sre/ai-agent/investigator-agent-pipelines/#troubleshooting)]

- Connectivity Mode Checks

    - If using Harness Cloud build infrastructure, ensure the connector is set to **Connect through Harness Platform** (not via delegate), as all connectors must use this mode with Harness Cloud. [[CI FAQs - Connector errors](https://developer.harness.io/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#connector-errors-with-harness-cloud-build-infrastructure)]
    - To change connectivity mode: go to **Connectors** → select the connector → **Edit Details** → navigate to **Select Connectivity Mode** → select **Connect through Harness Platform**. [[CI FAQs - Connector errors](https://developer.harness.io/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#connector-errors-with-harness-cloud-build-infrastructure)]

- Delegate Checks (if using delegate connectivity)

    - Confirm the delegate is running and has the required permissions. [[Delegate FAQs](https://developer.harness.io/docs/faqs/harness-delegate-faqs/#troubleshooting-the-delegate)]
    - Verify the delegate can reach the target resource (check network, firewall, and outbound HTTPS 443). [[Delegate can't connect](https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen/#delegate-cant-connect-to-harness-manager)]

- Viewing Logs

    - In the failed pipeline execution, check if a **View Delegate Tasks Logs** option is available to inspect StackDriver logs for the failing task. [[Pipeline execution failures](https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen/#pipeline-execution-failures)]
    - Use **Analyze Error** (Harness AI) on the failed execution for root cause analysis and automated fix recommendations. [[Harness AI Error Analyzer](https://developer.harness.io/docs/platform/harness-ai/devops-agent#error-analyzer)]`}
/>

<Troubleshoot
  issue="Anthropic Connector fails during setup when using AWS Bedrock for Worker Agents"
  mode="fallback-only"
  fallback={`- When configuring the Anthropic Connector for AWS Bedrock, select Amazon Bedrock API Key as the authentication type, not Personal Token. Personal Token is for direct Anthropic API access only. If you are using a provisioned Bedrock endpoint, select Amazon Bedrock API Key, enter the AWS Access Key ID and Secret Access Key, select the correct AWS Region, and choose a model. Using the wrong authentication type causes connection test failures and runtime errors in Agent steps.

- Connector Configuration Checks [[Worker Agents](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-model-connectors)]

    - Ensure you select **Amazon Bedrock API Key** as the **Authentication Type** (not Personal Token, which is for direct Anthropic endpoints).
    - Verify the correct **Region** is selected for your AWS Bedrock endpoint.
    - Confirm a valid default **Model Name** is chosen from the supported list: Claude Sonnet 4.6, Claude Opus 4.6, Claude Sonnet 4.5, or Claude Opus 4.5.

- Model Name Override Check [[Constraints](https://developer.harness.io/docs/platform/harness-ai/harness-agents#constraints-and-known-limitations)]

    - If overriding the default model via the **Model Name** field, you **must** provide a full AWS Bedrock inference profile ARN in the format: \`arn:aws:bedrock:<region>:<account-id>:application-inference-profile/<profile-id>\`
    - Bare model IDs (e.g., \`claude-opus-4-6\`) are **not** supported as overrides.

- Credentials & Secrets Checks [[Troubleshooting](https://developer.harness.io/docs/platform/harness-ai/harness-agents#troubleshooting)]

    - Confirm the API key/secret referenced in the connector has not expired.
    - Verify the secret exists in Harness Secrets Manager and the reference syntax is correct.
    - Ensure you have **View** and **Access** permissions for the secret being referenced.

- Connectivity Mode Checks [[Troubleshooting](https://developer.harness.io/docs/platform/harness-ai/harness-agents#troubleshooting)]

    - If using Harness Cloud build infrastructure, set the connector to **Connect through Harness Platform**.
    - If using delegate connectivity, confirm the delegate is running, reachable, and has outbound HTTPS (port 443) access.
    - Verify the connector exists at the correct scope (account, org, or project).

- Permissions Check [[Worker Agents](https://developer.harness.io/docs/platform/harness-ai/harness-agents)]

    - Ensure you have **View**, **Create/Edit**, and **Delete** permissions for Connectors in Harness RBAC.`}
/>

<Troubleshoot
  issue={`MCP connector returns "Authentication failed" during agent execution`}
  mode="fallback-only"
  fallback={`Here are the relevant checks you can perform:
- Ensure the MCP Server URL matches your cluster endpoint from the Harness Hosted MCP endpoints table and that the API key is stored as a Harness secret with the header name set to X-Api-Key."

- General Connector Connection Test Troubleshooting

    - Check Delegate Task Logs: If \`executeOnDelegate\` is set to \`true\`, a View Delegate Tasks Logs option appears on the Connector Details page. Use it to inspect Google StackDriver logs for the failing task. [[Connector troubleshooting](https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen/#connectors)]

    - Verify credentials and permissions: Confirm that the credentials (API key, token, username/password) used in the connector are correct, have not expired, and have the required permissions/scopes for the target service.

    - Check connector scope: Ensure the connector exists at the correct scope (account, org, or project) and that the referenced resource has not been deleted. [[Connector troubleshooting](https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen/#connectors)]

- Check network connectivity from the Delegate host:

    - Use ping and traceroute to app.harness.io to verify network reachability.
    - Use nslookup to confirm DNS resolution is working.
    - Ensure outbound HTTPS (port 443) is allowed in security groups or firewall rules. [[Delegate connectivity](https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen/#delegate-cant-connect-to-harness-manager)]

- Skip preflight checks if network restrictions are the cause: If the connection test fails due to proxy, split DNS, or firewall policies but the connector works at runtime, you can:

    - Contact [Harness Support](mailto:support@harness.io) to enable the \`CI_IGNORE_TEST_CONNECTION\` feature flag.
    - Add \`ignoreTestConnection: true\` to the connector's YAML. [[Skip preflight checks](https://developer.harness.io/docs/platform/connectors/create-a-connector-using-yaml/#optional-skip-connector-preflight-checks)]

- Use the Test Connection API to programmatically diagnose the failure and review the \`errors\` and \`error_summary\` fields in the response. [[API docs](https://apidocs.harness.io/)]`}
/>

<Troubleshoot
  issue="Harness expressions not resolving in Worker Agent Instructions"
  mode="fallback-only"
  fallback={`- Expressions such as \`<+trigger.repoName>\` resolve at pipeline execution time, not when the agent is saved. Verify that a pipeline trigger is configured and that the pipeline is executed via that trigger.

- Verify the expression exists and is correctly scoped

    - Confirm the variable exists in the Harness UI (Service → Variables or Environment → Variables)
    - Check that the variable name matches exactly (expressions are case-sensitive)
    - Ensure you're using the correct scope (e.g., \`<+serviceVariables.*>\` vs \`<+env.variables.*>\`) [[Expression troubleshooting](https://developer.harness.io/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications/#troubleshoot-common-issues)]

- Check expression syntax

    - No extra spaces or special characters inside \`<+...>\`
    - Correct format, e.g., \`<+serviceVariables.variableName>\` or \`<+env.variables.varName>\` [[Expression troubleshooting](https://developer.harness.io/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications/#troubleshoot-common-issues)]

- Ensure the expression is used only after its value is available

    - Expressions referencing a step/stage output cannot be used before that step/stage has executed [[Expression usage](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#use-expressions-only-after-they-can-be-resolved)]

- Check for undefined variables

    - In Harness NG, undefined variables cause pipeline failures (unlike FirstGen where they default to \`null\`) [[Expression evaluation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#expression-evaluation)]

- For GitOps / ArgoCD contexts specifically:

    - Verify the ArgoCD Harness Plugin is enabled on your GitOps agent (minimum agent version \`v0.105.x\`) [[GitOps expressions](https://developer.harness.io/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications/)]
    - For existing agent installations, run the patch script to configure the plugin [[GitOps expressions](https://developer.harness.io/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications/)]
    - Perform a hard refresh of the application to invalidate cache [[Expression troubleshooting](https://developer.harness.io/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications/#troubleshoot-common-issues)]

- For numeric variables appearing as strings:

    - Ensure the variable type is set to Number, not String [[Expression troubleshooting](https://developer.harness.io/docs/continuous-delivery/gitops/application/harness-expressions-in-gitops-applications/#troubleshoot-common-issues)]

- For Kubernetes build infrastructure (CI):

    - Step-level variables may resolve as null during pod initialization — promote them to stage or pipeline variables if needed [[CI FAQs](https://developer.harness.io/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#pipeline-initialization-and-harness-ci-images)]

- Use Compiled Mode for debugging:
    
    - In Pipeline Studio, open Variables and enable View in Compiled Mode to see resolved values and identify broken expressions [[Debugging expressions](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#troubleshooting-expressions)]`}
/>

<Troubleshoot
  issue="Agent output variable expression is unresolved or shows as an input field in the Run step"
  mode="fallback-only"
  fallback={`The Agent step expands to a step group at runtime, so the expression path must include both the outer Agent step identifier and the inner step name. Use the format \`<+steps.<agent_step_id>.steps.<agent_name_version>.output.outputVariables.<KEY>>\`. Run the pipeline once and expand the Agent step group in the execution view to find the inner step name.

Here are the key checks and steps to resolve an agent output variable expression that is unresolved or appears as an input field in a downstream Run step:

- Verify the expression syntax is correct. Within the same stage, use:

\`<+steps.<step_identifier>.output.outputVariables.VAR_NAME>\`
\`<+execution.steps.<step_identifier>.output.outputVariables.VAR_NAME>\`

Across stages, use:

\`<+stages.<stageID>.spec.execution.steps.<stepID>.output.outputVariables.VAR_NAME>\`
\`<+pipeline.stages.<stageID>.spec.execution.steps.<stepID>.output.outputVariables.VAR_NAME>\`
[[Reference output variable](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings#reference-an-output-variable)]

- Confirm the agent has published the output. The agent must write \`KEY=value\` lines to \`$HARNESS_OUTPUT\` or \`$DRONE_OUTPUT\` during execution. If the agent step failed or the output file was never written to, the variable will be empty. [[Configure agent outputs](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-agent-outputs)]

- Ensure the agent step has already completed before the referencing step runs. Expressions can only be resolved after the step that produces them has finished. Do not reference an output variable in a step that runs before or in parallel with the agent step. [[Expression usage](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#use-expressions-only-after-they-can-be-resolved)]

- Check if the step is inside a step group. If the agent step is inside a step group, include the step group ID in the expression:

\`<+execution.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.VAR_NAME>\`
[[Reference output variable](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings#reference-an-output-variable)]

- Check for exit statements in the agent instructions. If the script uses \`exit 0\` or any explicit exit call, output variables will not be available — the output will be empty. Let the script complete naturally without explicit exit calls. [[Run step settings](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings#output-variables)]

- Check for looping strategies. If the agent step uses a looping strategy, append the iteration index to the step identifier (e.g., \`my_agent_step_0\` instead of \`my_agent_step\`). [[Troubleshooting](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-provisioning#troubleshooting)]

- Check variable name case sensitivity. Expression variable names are case-sensitive. Confirm the key name in the expression exactly matches what the agent wrote to the output file. [[Harness Agents](https://developer.harness.io/docs/platform/harness-ai/harness-agents)]

- Check output variable length. Output variables exceeding 64KB can cause steps to fail or truncate output. Keep values concise (summaries should be 500 characters or fewer). [[Output Variables](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings#output-variables)]

- Use execution details to copy the correct expression. In the pipeline execution UI, select the agent step → Output tab, and use the Copy icon next to the variable name to get the exact, correct expression path. [[Input and output variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#input-and-output-variables)]

- For Kubernetes build infrastructure specifically: Step-level variables may resolve as \`null\` during pod initialization. If this is the case, generate the output in a prior stage and reference it using a cross-stage expression. [[CI FAQs](https://developer.harness.io/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#pipeline-initialization-and-harness-ci-images)]`}
/>

<Troubleshoot
  issue="Cannot find Agent YAML for instructions, inputs, or output variable configuration"
  mode="fallback-only"
  fallback={`The pipeline YAML only contains a reference to the agent (\`agentName: name@version\`). The full agent definition with instructions, outputs, inputs, and environment variables is stored in the Worker Agent Catalog. Go to **AI > Worker Agents**, select the agent, and switch to the **YAML** tab to view or edit the full configuration.

Here are the key steps and checks for finding and working with Worker Agent YAML configuration for instructions, inputs, and output variables:

- Finding the Agent YAML
    - In the Worker Agent Catalog, open your agent and switch to the YAML tab to view the full agent configuration, including container image, instructions, inputs, and environment variables. [[Create a Worker Agent](https://developer.harness.io/docs/platform/harness-ai/harness-agents#create-a-worker-agent)]

- Instructions Configuration
    - The Instructions field is the agent's system prompt and supports Harness variable expressions (e.g., \`<+trigger.repoName>\`, \`<+trigger.prNumber>\`). [[Configure instructions](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-instructions-and-harness-expressions)]
    - Expressions are resolved at pipeline execution time, not when you save the agent — verify expressions are only used after their values are available.
    - Check that expression syntax has no extra spaces or special characters inside \`<+...>\` and that variable names match exactly (case-sensitive).

- Inputs Configuration
    - Inputs are defined in the agent YAML under the inputs key. Supported types are string, connector, and array. [[Configure inputs](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-inputs)]
    - Example YAML:
    \`\`\`
      inputs:
        llmConnector:
          type: connector
          required: true
          default: anthropic_bedrock_99cf4be5
        modelName:
          type: string
          required: true
        mcpConnectors:
          type: array
          default:
            - rohan_hosted_mcp
      \`\`\`

- Output Variable Configuration
    - Outputs are published by writing KEY=value lines to the $HARNESS_OUTPUT or $DRONE_OUTPUT files during agent execution. [[Configure agent outputs](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-agent-outputs)]
    - Reference outputs in downstream steps using:
    \`<+steps.<step_identifier>.output.outputVariables.KEY_NAME>\`
    - Write to both output files ($HARNESS_OUTPUT and $DRONE_OUTPUT), but check if they point to the same path to avoid duplicates.
    - Keep output values concise (500 characters or fewer for strings).

- Agent Step YAML in a Pipeline
    - Reference the agent in a pipeline using the Agent step type with agentName: \`<name>@<version>\` format. [[Use a Worker Agent](https://developer.harness.io/docs/platform/harness-ai/harness-agents#use-a-worker-agent-in-a-pipeline)]
    - Example: YAML
    \`\`\`
      step:
        type: Agent
        name: PR Review Agent
        identifier: pr_review_agent
        spec:
          agentName: pr_review_agent@1.0.6
          agentSettings:
    \`\`\``}
/>

<Troubleshoot
  issue="Where do I configure the prompt for my Worker Agent, in the pipeline step or the agent definition?"
  mode="fallback-only"
  fallback={`Configure the prompt in the agent definition (**AI > Worker Agents** > select the agent > **Instructions** field). The pipeline Agent step references the agent by name and version and does not contain a separate prompt field. Use agent Inputs to make the instructions dynamic across pipelines without duplicating the agent.

The prompt for a Worker Agent is configured in the agent definition, not the pipeline step. Here's a summary:

- The Instructions field in the agent definition serves as the system prompt sent to the model at runtime. [[Worker Agent fields](https://developer.harness.io/docs/platform/harness-ai/harness-agents#worker-agent-form-field-reference)]
- To configure it, go to the Worker Agent Catalog → select or create an agent → fill in the Instructions field in the Create Agent (or Edit Agent) form. [[Create a Worker Agent](https://developer.harness.io/docs/platform/harness-ai/harness-agents#create-a-worker-agent)]
- The Instructions field supports Harness variable expressions (e.g., \`<+trigger.repoName>\`, \`<+trigger.prNumber>\`) so the prompt can be dynamic at runtime without changing the agent definition each time. [[Configure instructions](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-instructions-and-harness-expressions)]
- Expressions in the Instructions field are resolved at pipeline execution time, not when you save the agent.
- The pipeline step (Agent step) only specifies which agent to use (by name and version) and supplies runtime input values - it does not define the prompt itself. [[Use a Worker Agent](https://developer.harness.io/docs/platform/harness-ai/harness-agents#use-a-worker-agent-in-a-pipeline)]`}
/>

<Troubleshoot
  issue="Do I set up the LLM Connector in the agent definition or in the pipeline Agent step?"
  mode="fallback-only"
  fallback={`Configure the Model Connector in the agent definition (**AI > Worker Agents** > select the agent). The **LLM Connector** field on the pipeline Agent step is an optional override. Leave it empty to use the connector configured on the agent. Use the pipeline-level override only when a specific pipeline needs a different connector or model than the agent default.

The LLM Connector (Model Connector) is set up in both the agent definition and referenced in the pipeline Agent step. Here's how each part works:

In the Agent Definition:

- Go to **Worker Agents** in the AI section of the Harness module selector. [[Worker Agents](https://developer.harness.io/docs/platform/harness-ai/harness-agents)]
- Create or select a **Model Connector** (the currently supported provider), configuring:
    - Authentication type (Personal Token for direct Anthropic, or Amazon Bedrock API Key)
    - Region
    - Default Model Name (e.g., Claude Sonnet 4.6, Claude Opus 4.6, etc.)
- Set the **Model Connector** field on the agent — this is a required field. [[Model Connectors](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-model-connectors)]
- Optionally define an \`llmConnector\` input (type: \`connector\`) so the connector can be overridden at the pipeline step level. [[Configure inputs](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-inputs)]

In the Pipeline Agent Step:

- When adding the Agent step to your pipeline, fill in the \`llmConnector\` input field (if defined on the agent) to supply or override the connector at runtime. [[Use a Worker Agent](https://developer.harness.io/docs/platform/harness-ai/harness-agents#use-a-worker-agent-in-a-pipeline)]
- The connector ID is typically passed via an environment variable like \`PLUGIN_HARNESS_CONNECTOR: <+inputs.llmConnector.id>\`. [[Configure environment variables](https://developer.harness.io/docs/platform/harness-ai/harness-agents#configure-environment-variables)]
If no override is provided in the step, the agent uses the default Model Connector configured in the agent definition.

Summary check:

- Model Connector is required on the agent definition.
- It can optionally be overridden per pipeline step via an llmConnector input.
- If no override is set in the step, the agent falls back to the connector defined in the agent definition.`}
/>

<Troubleshoot
  issue="Connect a Worker Agent pipeline on Harness Cloud to a local MCP server"
  mode="fallback-only"
  fallback={`Worker Agents on Harness Cloud cannot reach localhost directly. Use a tunneling tool such as ngrok to expose your local MCP server (for example, \`npx harness-mcp-v2 http --port 8080\`) and use the resulting public URL as the MCP Server URL in your MCP Connector.

**Note**: If your organization uses Zscaler, ngrok URLs may be blocked under the Anonymizer category (error D22, policy HAR-ISMS-1001). If this occurs, escalate to your network or IT team to allowlist the URL, or use an alternative tunneling tool.

Here are the troubleshooting steps to resolve the connectivity issue between your Harness Cloud pipeline and your local MCP (Model Context Protocol) server:

- **Expose the local server via tunnel**: Establish a secure public tunnel using a tool like ngrok or Cloudflare Tunnel to expose your local MCP server's port to the internet, as Harness Cloud cannot directly access your local network.
- **Use a Self-Hosted Delegate**: Alternatively, switch from Harness Cloud to a Self-Hosted Harness Delegate running on your local machine or private network to allow direct local network access to the MCP server without internet exposure.
- **Configure SSE transport**: Ensure your local MCP server is configured to use the SSE (Server-Sent Events) transport protocol over HTTP/HTTPS, as the default stdio (Standard I/O) transport is not compatible with remote cloud executions.
- **Secure the connection with secrets**: Secure your exposed MCP endpoint with an API key or token, and pass these credentials securely to your Harness pipeline using Harness Secrets.`}
/>

<Troubleshoot
  issue="Worker Agent creation fails with Internal Server Error"
  mode="fallback-only"
  fallback={`Agent names cannot contain special characters. Use only alphanumeric characters, hyphens, and underscores. Remove any special characters from the agent name and try saving again.`}
/>

<Troubleshoot
  issue="Worker Agent cannot connect to Harness APIs because BASE_URL is not set correctly"
  mode="fallback-only"
  fallback={`If the agent fails to reach Harness APIs because the \`HARNESS_BASE_URL\` is not being resolved correctly at runtime, add it as an explicit stage variable. The \`HARNESS_BASE_URL\` variable allows the agent to get the base URL of the account to authenticate with MCP at runtime.

This stage variable workaround only works for **CI** stage types. For **CD** and **Custom** stages, you must configure an MCP Connector for Harness MCP instead. Go to [Configure MCP connectors](#configure-mcp-connectors) to set up the connector.

Add the following \`variables\` block to your stage definition:

\`\`\`yaml
stages:
  - stage:
      name: Agent
      identifier: Agent
      description: ""
      type: CI
      spec:
        # ... stage spec ...
      variables:
        - name: HARNESS_BASE_URL
          type: String
          description: ""
          required: false
          value: https://app.harness.io
\`\`\`

Replace the \`value\` with your cluster's base URL (for example, \`https://app3.harness.io\`, \`https://accounts.eu.harness.io\`, or your vanity domain such as \`https://customer-hackathon.harness.io\`).`}
/>

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/worker-agent-in-pipeline" target="_blank">Use Worker Agents in pipelines</a>: Add Worker Agent steps to pipelines and reference agent outputs.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration" target="_blank">Worker Agent configuration</a>: Configure instructions, MCP connectors, inputs, and environment variables.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/example-agents" target="_blank">Worker Agent examples</a>: Explore PR review, IaC plan safety, and spec-driven development examples.
- <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a>: Set up MCP access for your agents.
- <a href="/docs/platform/triggers/triggers-overview" target="_blank">Triggers overview</a>: Configure triggers to automate agent execution on PR events, schedules, or artifacts.
