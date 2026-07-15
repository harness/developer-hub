---
title: Agent permissions
description: Configure and manage Worker Agent permissions at pipeline level and through RBAC.
sidebar_label: Agent permissions
sidebar_position: 1
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

- <a href="#agent-permissions-pipeline-level">Configure pipeline-level agent permissions for runtime execution</a>.
- <a href="#supported-permissions">Understand supported entities and permission values</a>.
- <a href="#rbac-for-worker-agents">Configure RBAC permissions for agent management</a>.

---

## Before you begin

Before you configure agent permissions, ensure you have the following:

- **Worker Agent created**: At least one Worker Agent configured in your project. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents" target="_blank">Worker Agents</a> for more information on creating agents.
- **Admin or RBAC permissions**: Access to configure roles and permissions in your Harness account.
- **Pipeline edit access**: Permissions to edit pipeline YAML if configuring pipeline-level agent permissions.

---

## Agent permissions (pipeline-level)

Configure resource-level permissions for Worker Agents directly in pipeline stage YAML to control runtime access.

:::note Feature flag
Currently, this feature is behind the feature flag `HARNESS_TOKEN_INJECT`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

Agent permissions allow you to define explicit resource-level permissions for a Worker Agent directly in the pipeline stage YAML. When configured, the agent uses its own scoped permissions to access Harness entities during execution, rather than relying on a user's configured permissions via an Model Context Protocol (MCP) Connector.

This provides fine-grained control over what the agent can do at runtime without requiring a separate user identity or connector-level permission grants.

### Configure agent permissions

The placement of the `permissions` block differs by stage type. Select your stage below.

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

---

## Supported permissions

The following table lists the supported entities and their available permission values. Separate multiple permissions with the pipe (`|`) character.

| Entity | Available permissions |
|---|---|
| `pipeline` | `view`, `edit`, `create`, `delete`, `execute`, `abort`. The `view` permission also grants access to pipeline execution data. |
| `code_repository` | `view`, `edit`, `create`, `delete`, `push`, `review` |
| `artifact_registry` | `view`, `edit`, `delete`, `uploadartifact`, `downloadartifact`, `deleteartifact`, `quarantineartifact`, `firewallexceptionapprove` |
| `user` | `view`, `manage`, `invite`, `impersonate` |

---

## How agent permissions work

Understand how pipeline-level agent permissions are evaluated and applied at runtime.

- The `permissions` block scopes the agent's access token down to only the specified entities and actions. The token cannot perform any action you do not list, even if the agent author holds broader permissions.
- The agent receives a runtime token with these permissions injected, independent of the pipeline author's personal permissions.
- This replaces the default behavior where the agent inherits the authoring user's credentials via an MCP Connector for Harness.
- Permissions are evaluated at pipeline execution time and apply for the duration of the agent step.

---

## Current limitations

The agent permission token currently supports access to the following Harness entities only:

- **Pipelines** (including execution data)
- **Code Repositories**

Fetching data from the following modules is **not supported** with the agent permission token at this time: CI, CD, CCM, STO, SCS, and IaCM. For access to these modules, continue using user-configured permissions via an MCP Connector.

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

- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/harness-agents" target="_blank">Worker Agents</a>: Execute tasks inside Harness pipelines.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/example-agents" target="_blank">Worker Agent examples</a>: Explore PR review, IaC plan safety, and spec-driven development examples.