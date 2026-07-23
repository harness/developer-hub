---
title: Agent permissions
description: Configure and manage Worker Agent permissions at pipeline level and through RBAC.
sidebar_label: Agent permissions
sidebar_position: 4
keywords:
  - agent permissions
  - worker agents
  - rbac
  - pipeline permissions
  - scoped token
tags:
  - ai
  - agents
  - rbac
redirect_from:
  - /docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents#agent-permissions-pipeline-level
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Agent permissions control what Worker Agents can access and modify within Harness at runtime. You can configure permissions at two levels: pipeline-level permissions for runtime execution scope, and Role-Based Access Control (RBAC) permissions for managing agent lifecycle operations.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Configure pipeline-level agent permissions for runtime execution](#agent-permissions-pipeline-level).
- [Understand supported entities and permission values](#supported-permissions).
- [Configure RBAC permissions for agent management](#rbac-for-worker-agents).

---

## Before you begin

Before you configure agent permissions, ensure you have the following:

- **Worker Agent created**: At least one Worker Agent configured in your project. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a> for more information on creating agents.
- **Admin or RBAC permissions**: Access to configure roles and permissions in your Harness account.
- **Pipeline edit access**: Permissions to edit pipeline YAML if configuring pipeline-level agent permissions.

---

## Agent permissions (pipeline-level)

Configure resource-level permissions for Worker Agents directly in pipeline stage YAML to control runtime access.

:::note Feature flag
Currently, this feature is behind the feature flag `HARNESS_TOKEN_INJECT`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

Agent permissions allow you to define explicit resource-level permissions for a Worker Agent directly in the pipeline stage YAML. Each Agent step declares the permissions it needs as a set of `resource: verb` pairs, and Harness evaluates that grant against two things before the agent can act:

- **The declared grant**: the resource/verb pairs you list in the pipeline YAML.
- **The invoking principal's RBAC**: the effective permissions of the user or service account that triggers the pipeline, at that pipeline's account, org, or project scope.

:::note Effective permission is an intersection
An agent's effective permission is the intersection of the two. A declared grant can only narrow what the agent can do; it can never grant an agent more access than the invoking principal already has. This uses your existing RBAC scopes and resource groups. It is not a separate permission system to manage.
:::

Permissions are declared **per stage (CI, STO, SCS, IaCM) or per Containerized Step Group (CD, Custom)**, not pipeline-wide, so agents in different stages or step groups can carry different, narrowly scoped access. The scoped token applies to every step in the stage or step group where the block is declared.

### Declare permissions on an Agent step

The placement of the `permissions` block differs by stage type. Select your stage below. Each resource key accepts a pipe-separated (`|`) list of verbs. Harness builds one permission per pair in the form `module_resource_verb` and intersects it with the invoking principal's RBAC when the pipeline runs.

Two rules govern what is accepted:

- **Resource keys are validated.** Only the keys listed under <a href="#supported-permissions">Supported permissions</a> are recognized. An unrecognized key is dropped, so no permission is granted for it.
- **Verbs are not checked against a fixed enum.** Harness concatenates whatever verb you list into the permission key. The verb must match a real RBAC action for that resource (for example `view`, `edit`, `execute`, `access`), otherwise the resulting key matches nothing and the grant resolves to no access.

<Tabs>
<TabItem value="ci" label="CI, STO, SCS, IaCM (Stage Level)" default>

In CI, STO, SCS, and IaCM stages, the Agent step runs directly in the stage. Add a `permissions` block under `spec` in the stage definition:

```yaml
stages:
  - stage:
      name: Agent
      identifier: Agent
      description: ""
      type: CI
      spec:
        permissions:
          pipeline: view|edit|create|delete|execute|abort
          code_repository: view|edit|create|delete|push|review
          artifact_registry: view|edit|delete|uploadartifact|downloadartifact|deleteartifact|quarantineartifact|firewallexceptionapprove
          user: view|manage|invite|impersonate
```

</TabItem>
<TabItem value="cd" label="CD, Custom (Step Group Level)">

Add the `permissions` block to the Containerized Step Group, not the stage. The scoped token is injected into every step in the group and exposed as the `HARNESS_TOKEN` and `HARNESS_BASE_URL` environment variables, which steps read to authenticate with Harness APIs.

```yaml
- stepGroup:
    name: Container
    identifier: Container
    permissions:
      pipeline: execute|view
      code_repository: view
      artifact_registry: view|downloadartifact
    steps:
      - step:
          type: Run
          name: Run_1
          identifier: Run_1
          spec:
            connectorRef: account.your_docker_connector
            image: busybox
            shell: Sh
            command: |-
              # Do not run 'env' in production. It dumps all environment
              # variables, including HARNESS_TOKEN, to the build log.
              echo "HARNESS_TOKEN: $HARNESS_TOKEN"
              echo "HARNESS_BASE_URL: $HARNESS_BASE_URL"
    stepGroupInfra:
      type: KubernetesDirect
      spec:
        connectorRef: account.your_k8s_connector
        namespace: your-delegate-namespace
```

The token is scoped to exactly the permissions declared on the step group. In the example above, every step in the `Container` group can execute and view pipelines, view code repositories, and view or download artifacts. No other actions are permitted, even if the agent author holds broader permissions.

</TabItem>
</Tabs>

:::note llmConnector access
If an Agent step references an `llmConnector`, grant `connector: view|access` for that connector ID. Connector access is governed by this same grammar.
:::

:::warning LLM Gateway access and scoped token gotcha
When you use a <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration#configure-model-connectors" target="_blank">Harness-managed LLM connector</a>, the agent authenticates to the LLM Gateway through the `ML_HARNESS_MANAGED_LLM_CONNECTORS` permission. This permission is included in the scoped token by default, so an agent that does **not** declare a `permissions` block has LLM Gateway access automatically.

Because a declared `permissions` block grants **only** the pairs you list, you must add `ai_llm_gateway: access` explicitly when you use a managed connector. Omit it and the scoped token no longer carries LLM Gateway access, so the agent cannot reach the managed connector.

```yaml
permissions:
  ai_llm_gateway: access
  pipeline: view|execute
  code_repository: view
```
:::

#### Example: least-privilege "deploy and reconcile" agent

Because this agent rolls back deployments and syncs GitOps apps, it runs in a CD stage, so the `permissions` block sits on the Containerized Step Group:

```yaml
- stepGroup:
    name: Deploy & Reconcile
    identifier: Deploy_Reconcile
    permissions:
      pipeline:           view|execute
      environment:        view|access|rollback
      service:            view|access
      gitops_application: view|sync
      gitops_cluster:     view
      connector:          view|access
      secret:             view|access
    steps:
      - step:
          type: Agent
          name: Deploy & Reconcile
          identifier: Deploy_Reconcile
          spec:
            agentName: ca_deploy_reconcile_agent
            llmConnector: connector_Anthropic_112e
    stepGroupInfra:
      type: KubernetesDirect
      spec:
        connectorRef: account.your_k8s_connector
        namespace: your-delegate-namespace
```

This agent can run and roll back deployments and sync GitOps apps. It cannot create, edit, or delete any resource, because those verbs were never granted.

---

## Supported permissions

Each resource key accepts verbs that match real Harness RBAC actions for that resource. Pair any recognized key with a verb, separated by the pipe (`|`) character.

### Verbs

Verbs are not drawn from a fixed list. Whatever you type is concatenated into the permission key `module_resource_verb`, so a verb only takes effect when it matches a real RBAC action for that resource. Use the same action names Harness RBAC uses. The table below groups the actions you will reach for most often.

| Class | Common verbs | Use |
| --- | --- | --- |
| CRUD | `view`, `create`, `edit`, `delete` | Standard object lifecycle |
| Lifecycle / execution | `execute`, `abort`, `rollback`, `sync`, `toggle` | Runtime actions; higher blast radius |
| Usage | `access` | Reference or use a resource at runtime (secrets, connectors, templates, services) |
| Review / approval | `approve`, `reject`, `review`, `reportstatuscheck` | Approval workflows |
| Admin | `manage`, `invite`, `impersonate` | Administrative actions; use sparingly |

Because there is no verb enum, a mistyped or unsupported verb does not raise an error. It produces a permission key that matches nothing, so the agent silently gets no access for that pair. Confirm the exact action names against the resource's RBAC permissions before relying on them. Go to the <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">permissions reference</a> to review the actions each resource supports.

Treat high blast-radius verbs, including `delete`, `execute`, `abort`, `rollback`, and any admin-class verb, as opt-in. Declare them explicitly only on the resource keys where the agent needs them.

### Supported resources by module

These are the resource keys each module recognizes. A key not listed here is dropped when the token is built, so it grants nothing. Pair any recognized key with a verb that matches a real RBAC action for that resource (see <a href="#verbs">Verbs</a>). Expand a module to review its keys.

<details>
<summary>Core (Platform)</summary>

`pipeline`, `user`, `secret`, `connector`, `service`, `environment`, `environment_group`, `template`, `variable`, `setting`, `delegate`, `organization`, `project`, `usergroup`, `role`, `resourcegroup`, `serviceaccount`, `inputset`, `gitxwebhooks`, `deploymentfreeze`, `dashboards`, `audit`

</details>

<details>
<summary>Artifact Registry</summary>

`artifact_registry`

</details>

<details>
<summary>Code Repository</summary>

`code_repository`

</details>

<details>
<summary>Harness AI</summary>

`ai_rules`, `ai_llm_gateway`

</details>

<details>
<summary>Continuous Delivery and GitOps</summary>

`gitops_agent`, `gitops_application`, `gitops_repository`, `gitops_cluster`, `gitops_gpgkey`, `gitops_cert`, `gitops_applicationset`, `gitops_argoproject`

</details>

<details>
<summary>Infrastructure as Code Management (IaCM)</summary>

`iac_workspace`, `iac_registry`, `iac_provider_registry`, `iac_variable_set`, `iac_inventory`, `iac_playbook`

</details>

<details>
<summary>Database DevOps</summary>

`db_instance`, `db_schema`

</details>

<details>
<summary>Feature Flags</summary>

`feature_flag`, `ff_environment`, `ff_target_group`, `ff_target`, `ff_proxy_api_key`

</details>

<details>
<summary>Feature Management and Experimentation (FME)</summary>

`fme_environment`, `fme_traffic_type`, `fme_feature_flag`, `fme_segment`, `fme_large_segment`, `fme_metric`, `fme_experiment`

</details>

<details>
<summary>Chaos Engineering</summary>

`chaos_hub`, `chaos_infrastructure`, `chaos_experiment`, `chaos_gameday`, `chaos_image_registry`, `chaos_probe`, `chaos_fault`, `chaos_action`, `chaos_security_governance`, `dr_test`

</details>

<details>
<summary>Security Testing Orchestration (STO)</summary>

`sto_test_target`, `sto_exemption`, `sto_issue`, `sto_scan`, `sto_ticket`

</details>

<details>
<summary>Supply Chain Security (SCS)</summary>

`ssca_remediation_tracker`, `ssca_enforcement_exemption`, `scs_integration`, `scs_external_ticket`, `scs_configuration`, `scs_pr_creation`, `scs_evidence_vault`

</details>

<details>
<summary>Cloud Cost Management (CCM)</summary>

`ccm_perspective`, `ccm_budget`, `ccm_cost_category`, `ccm_autostopping_rule`, `ccm_folder`, `ccm_unit_cost`, `ccm_currency_preference`, `ccm_governance_rule`, `ccm_governance_rule_set`, `ccm_governance_enforcement`, `ccm_anomalies`, `ccm_recommendations`

</details>

<details>
<summary>Internal Developer Portal (IDP)</summary>

`idp_catalog`, `idp_workflow`, `idp_plugin`, `idp_scorecard`, `idp_layout`, `idp_catalog_access_policy`, `idp_integration`, `idp_advanced_configuration`, `idp_environment`, `idp_environment_blueprint`, `idp_aggregation_rule`

</details>

<details>
<summary>Incident Response (IRO)</summary>

`iro_manager`, `iro_metric_source`, `iro_alert`, `iro_alert_rule`, `iro_incident`, `iro_runbook`, `iro_escalation_policy`, `iro_schedule`, `iro_schedule_override`, `iro_service_directory`, `iro_third_party_integrations`

</details>

<details>
<summary>Software Engineering Insights (SEI)</summary>

`sei_data_settings`, `sei_developers`, `sei_integrations`, `sei_teams`, `sei_canvas`, `sei_profiles`, `sei_goals`, `sei_insights_category`

</details>

<details>
<summary>Monitoring and Service Discovery</summary>

`monitoring_agent`, `network_map`

</details>

### Default permissions

If a stage or step group has no `permissions` block, Harness injects a small read-only default so the agent can still resolve common context. Most modules inject nothing; only the modules below define a default.

| Module | Default permission key |
| --- | --- |
| Core | `core_pipeline_view`, `core_user_view`, `core_service_view`, `core_environment_view`, `core_environmentgroup_view`, `core_connector_view`, `core_usergroup_view`, `core_inputset_view` |
| Artifact Registry | `artifact_artregistry_view` |
| Code Repository | `code_repo_view` |
| Harness AI | `ai_rules_view` |
| CCM | `ccm_perspective_view` |
| FME | `fme_fmefeatureflag_view` |
| IaCM | `iac_workspace_view` |
| IRO | `iro_incident_view` |
| STO | `sto_scan_view` |

Modules not listed (Chaos, Database DevOps, Feature Flags, GitOps, IDP, Monitoring, SEI, Service Discovery, SCS) inject no default. To grant an agent any access in those modules, declare an explicit `permissions` block. Once you declare a block, only the keys you list apply. The defaults are not merged in.

---

## How agent permissions work

Understand how pipeline-level agent permissions are evaluated and applied at runtime.

- The `permissions` block scopes the agent's access token down to only the specified entities and actions. The token cannot perform any action you do not list, even if the agent author holds broader permissions.
- The agent receives a runtime token with these permissions injected, then intersected with the invoking principal's RBAC, independent of the pipeline author's personal permissions.
- This replaces the default behavior where the agent inherits the authoring user's credentials via an MCP Connector for Harness.
- Permissions are evaluated at pipeline execution time and apply for the duration of the agent step.

An agent gets no access for a pair when any of these is true:

- The pair is not in the declared grant.
- The verb exceeds the invoking principal's own RBAC, so the intersection removes it.
- The resource key is not recognized, or the verb does not match a real RBAC action, so the built permission key matches nothing.

The first two cases surface as a permission-denied error when the agent calls the corresponding Harness API. The third is silent, since the invalid key or verb is simply dropped when the token is built.

---

## Best practices

- Grant only the resource types and verbs the agent's task requires. Start narrow and add verbs as needed rather than granting broadly.
- Avoid `manage` where an atomic verb (`view`, `create`, `edit`, `delete`) covers the same action. Reserve `manage` for resources that do not expose atomic verbs.
- Treat `delete*`, `impersonate`, and other admin-class verbs as opt-in only, and review them explicitly during pipeline review.
- Remember the grant is a ceiling, not a guarantee. An agent's actual access still depends on the invoking principal's RBAC at that pipeline's scope.

---

## Current limitations

- **Trigger-initiated runs:** Agents run by a pipeline trigger do not currently have a scoped token injected, so declared permissions cannot be resolved against an invoking principal for those runs. This permission model applies to manually and API-triggered runs where a principal is available. Trigger support is on the roadmap.
- **Verbs are unvalidated:** There is no verb enum, so a mistyped or unsupported verb fails silently rather than raising an error. Confirm every verb against the resource's RBAC actions.
- **Resource keys not listed are dropped:** Any key outside <a href="#supported-resources-by-module">Supported resources by module</a> grants nothing. New keys are added as modules onboard to the scoped-token model.
- **`scs_evidence_vault` (Beta):** Requires the corresponding feature flag.

---

## RBAC for Worker Agents

Worker Agents have dedicated RBAC permissions in Harness. Administrators can control who can view, create, modify, and delete agents through role-based access control.

### Available permissions

| Permission | Description |
|---|---|
| **View** | View agent definitions in the catalog |
| **Create** | Create new Worker Agents |
| **Edit** | Modify existing Worker Agent definitions |
| **Delete** | Remove Worker Agents from the catalog |

### Configure RBAC permissions

1. Navigate to **Settings**, then select **Access Control**.
2. Select or create a **Role**.
3. Under the **AI Agents** resource, enable the permissions you want to grant (**View**, **Create**, **Edit**, **Delete**).
4. Assign the role to the appropriate users or user groups.

Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on role-based access control. Go to <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">Manage roles</a> for more information on creating and assigning roles.


## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/"target="_blank">Harness worker agents</a>: Execute tasks inside Harness pipelines.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/example-agents"target="_blank">Harness agents example</a>: Use different roles for Harness agents.