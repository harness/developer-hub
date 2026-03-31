---
title: Manage IacM Workspace Plugin
description: Understand how to customize and configure the Manage IaCM Workspace Plugin
sidebar_position: 1
---

# Manage IACM Workspace Plugin Reference

The Manage IACM Workspace plugin provides full lifecycle management for [Harness IACM](https://developer.harness.io/docs/infrastructure-as-code-management) workspaces. Use it in your Harness pipelines to create, update, query, or delete IACM workspaces, manage variables and secrets, and perform bulk tag refactoring — all through a single, configurable plugin step.

## Important notes

:::info
- The plugin requires Python 3.11+ and Docker with `buildx` support at runtime.
- The `remove` operation is **destructive and irreversible**. Use it only after confirming the correct workspace identifier.
- Secret variables (`PLUGIN_RESOURCE_VARS_SECRETS`, `PLUGIN_RESOURCE_VARS_ENVS_SECRETS`) are passed as Harness secret references and are never logged or exposed in plain text.
:::

## Plugin image

```
harnesssolutionfactory/harness-manage-iacm-workspace:latest
```

## Operation modes

Set the `PLUGIN_SWITCH` variable to control what the plugin does.

| Mode | Alias | Description |
|------|-------|-------------|
| `main` | `register` | Create or update an IACM workspace with variables and configuration |
| `view` | — | Query and retrieve workspace details; supports filtering by tags and attributes |
| `remove` | — | ⚠️ Delete a workspace by identifier (destructive) |
| `refactor` | — | Bulk-update workspace tags and source classification |

## Use in Harness pipelines

Add the plugin as a **Plugin** step in your stage. The examples below cover each operation mode.

### Create or update a workspace

```yaml
- step:
    type: Plugin
    name: Provision IACM Workspace
    identifier: provision_workspace
    description: Create or update IACM workspace with Terraform variables and configuration
    spec:
      connectorRef: <+input>
      image: harnesssolutionfactory/harness-manage-iacm-workspace:latest
      settings:
        PLUGIN_HARNESS_ENDPOINT: <+pipeline.variables.harness_endpoint>
        PLUGIN_HARNESS_ACCOUNT_ID: <+account.identifier>
        PLUGIN_API_KEY: <+secrets.getValue("harness_api_key")>
        PLUGIN_SWITCH: main
        PLUGIN_RESOURCE_NAME: my-workspace
        PLUGIN_RESOURCE_OWNER: platform-team
        PLUGIN_RESOURCE_VARS: '{"harness_platform_account":"<+account.identifier>","organization_name":"my-org"}'
        PLUGIN_RESOURCE_VARS_SECRETS: '{"api_secret":"<+secrets.getValue(\"api_secret\")>"}'
        PLUGIN_GIT_REPOSITORY_BRANCH: main
        PLUGIN_GIT_REPOSITORY_CONNECTOR: org.harness_template_repo
        PLUGIN_GIT_REPOSITORY_NAME: https://git.harness.io/account/org/repo.git
        PLUGIN_GIT_REPOSITORY_PATH: workspaces/my-workspace
        PLUGIN_HARNESS_PORTAL_RESOURCES: iacm/api/orgs/my-org/projects/my-project/workspaces
        PLUGIN_HARNESS_PLATFORM_KEY: org.hsf_platform_api_key
        PLUGIN_IAC_PROVISIONER_TYPE: opentofu
        PLUGIN_IAC_PROVISIONER_VERSION: "1.10.0"
        PLUGIN_WORKSPACE_ORG: my-organization
        PLUGIN_WORKSPACE_PROJECT: my-project
        PLUGIN_WORKSPACE_TAGS: '{"source":"official","type":"infrastructure"}'
        PLUGIN_SHOULD_OVERWRITE_VARIABLES: "false"
        PLUGIN_INCLUDE_HARNESS_ENVS: "false"
        PLUGIN_DEBUG: "false"
```

### Create a workspace from a template

```yaml
- step:
    type: Plugin
    name: Create Workspace from Template
    identifier: create_templated_workspace
    description: Create IACM workspace from a Harness workspace template
    spec:
      connectorRef: <+input>
      image: harnesssolutionfactory/harness-manage-iacm-workspace:latest
      settings:
        PLUGIN_HARNESS_ENDPOINT: <+pipeline.variables.harness_endpoint>
        PLUGIN_HARNESS_ACCOUNT_ID: <+account.identifier>
        PLUGIN_API_KEY: <+secrets.getValue("harness_api_key")>
        PLUGIN_SWITCH: main
        PLUGIN_RESOURCE_NAME: template-workspace
        PLUGIN_RESOURCE_OWNER: platform-team
        PLUGIN_WORKSPACE_ORG: my-organization
        PLUGIN_WORKSPACE_PROJECT: my-project
        PLUGIN_WORKSPACE_TEMPLATE_IDENTIFIER: base-infrastructure
        PLUGIN_WORKSPACE_TEMPLATE_VERSION: "1.0"
        PLUGIN_RESOURCE_VARS: '{"environment":"production"}'
```

### Query workspaces by tags

```yaml
- step:
    type: Plugin
    name: Get Workspaces by Tags
    identifier: get_workspaces_by_tags
    description: Retrieve workspace identifiers filtered by tags
    spec:
      connectorRef: <+input>
      image: harnesssolutionfactory/harness-manage-iacm-workspace:latest
      settings:
        PLUGIN_HARNESS_ENDPOINT: <+pipeline.variables.harness_endpoint>
        PLUGIN_HARNESS_ACCOUNT_ID: <+account.identifier>
        PLUGIN_API_KEY: <+secrets.getValue("harness_api_key")>
        PLUGIN_SWITCH: view
        PLUGIN_WORKSPACE_TAGS: '{"source":"official","type":"infrastructure"}'
        PLUGIN_RETURN_KEY: identifier
        PLUGIN_IGNORE_HSF_SYSTEM: "true"
```

### Filter workspaces by attribute

```yaml
- step:
    type: Plugin
    name: Filter Workspaces by Attribute
    identifier: filter_workspaces
    description: Query a specific workspace by identifier
    spec:
      connectorRef: <+input>
      image: harnesssolutionfactory/harness-manage-iacm-workspace:latest
      settings:
        PLUGIN_HARNESS_ENDPOINT: <+pipeline.variables.harness_endpoint>
        PLUGIN_HARNESS_ACCOUNT_ID: <+account.identifier>
        PLUGIN_API_KEY: <+secrets.getValue("harness_api_key")>
        PLUGIN_SWITCH: view
        PLUGIN_FILTER_KEY: identifier
        PLUGIN_FILTER_VALUE: my-workspace
        PLUGIN_RETURN_KEY: identifier
```

### Find workspaces tagged for decommission

```yaml
- step:
    type: Plugin
    name: Get Workspaces for Decommission
    identifier: get_workspaces_decomm
    description: Find all workspaces marked for decommissioning
    spec:
      connectorRef: <+input>
      image: harnesssolutionfactory/harness-manage-iacm-workspace:latest
      settings:
        PLUGIN_HARNESS_ENDPOINT: <+pipeline.variables.harness_endpoint>
        PLUGIN_HARNESS_ACCOUNT_ID: <+account.identifier>
        PLUGIN_API_KEY: <+secrets.getValue("harness_api_key")>
        PLUGIN_SWITCH: view
        PLUGIN_WORKSPACE_TAGS: '{"decommission":"true"}'
        PLUGIN_RETURN_KEY: identifier
```

### Delete a workspace

:::danger
This is a destructive, irreversible operation. Double-check `PLUGIN_RESOURCE_NAME` before running.
:::

```yaml
- step:
    type: Plugin
    name: Remove IACM Workspace
    identifier: remove_workspace
    description: Permanently delete an IACM workspace by identifier
    spec:
      connectorRef: <+input>
      image: harnesssolutionfactory/harness-manage-iacm-workspace:latest
      settings:
        PLUGIN_HARNESS_ENDPOINT: <+pipeline.variables.harness_endpoint>
        PLUGIN_HARNESS_ACCOUNT_ID: <+account.identifier>
        PLUGIN_API_KEY: <+secrets.getValue("harness_api_key")>
        PLUGIN_SWITCH: remove
        PLUGIN_RESOURCE_NAME: workspace-to-delete
```
## Settings reference

### Connection and authentication

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_HARNESS_ENDPOINT` | String | Yes | — | Base URL of the Harness platform. Example: `https://app.harness.io` |
| `PLUGIN_HARNESS_ACCOUNT_ID` | String | Yes | — | Your Harness account identifier. Example: `uZuUmmrnT4qQRx5XF0ZtkQ` |
| `PLUGIN_HARNESS_PORTAL_RESOURCES` | String | Yes | — | API path to the workspace resources endpoint. Example: `iacm/api/orgs/my-org/projects/my-project/workspaces` |
| `PLUGIN_HARNESS_PLATFORM_KEY` | String | Yes | `org.hsf_platform_api_key` | Platform API key identifier used for authentication. |
| `PLUGIN_API_KEY` | String | Yes | — | API key for authenticating requests. Example: `pat.xxxxx.xxxxx` |

### Operation control

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_SWITCH` | String | No | `main` | Operation mode. One of: `main`, `view`, `remove`, `refactor`. |
| `PLUGIN_DEBUG` | Boolean | No | `false` | Set to `true` to enable verbose debug logging. |

### Workspace configuration

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_RESOURCE_NAME` | String | Yes | — | Workspace identifier. Example: `my-workspace` |
| `PLUGIN_RESOURCE_OWNER` | String | Yes | — | Team or individual that owns the workspace. Example: `platform-team` |
| `PLUGIN_WORKSPACE_ORG` | String | No | `Harness_Platform_Management` | Organization identifier within Harness. |
| `PLUGIN_WORKSPACE_PROJECT` | String | No | `Solutions_Factory` | Project identifier within the organization. |
| `PLUGIN_WORKSPACE_TAGS` | String (JSON) | No | `{}` | Key-value tags applied to the workspace. Used for filtering in `view` and `refactor` modes. Example: `{"source":"official","type":"infrastructure"}` |
| `PLUGIN_WORKSPACE_TEMPLATE_IDENTIFIER` | String | No | `skipped` | Workspace template ID. Required when provisioning from a template. Example: `base-infrastructure` |
| `PLUGIN_WORKSPACE_TEMPLATE_VERSION` | String | No | `skipped` | Version of the workspace template to use. Example: `1.0` |

### Git repository settings

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_GIT_REPOSITORY_BRANCH` | String | Yes | `main` | Git branch to use for the workspace. |
| `PLUGIN_GIT_REPOSITORY_CONNECTOR` | String | Yes | `org.Harness_Template_Library_Repo` | Harness connector identifier for the Git repository. |
| `PLUGIN_GIT_REPOSITORY_NAME` | String | Yes | — | Full URL of the Git repository. Example: `https://git.harness.io/account/org/repo.git` |
| `PLUGIN_GIT_REPOSITORY_PATH` | String | No | — | Subdirectory path within the repository. Example: `workspaces/my-workspace` |

### IaC configuration

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_IAC_PROVISIONER_TYPE` | String | No | `opentofu` | IaC provisioner to use. Accepted values: `opentofu`, `terraform`. |
| `PLUGIN_IAC_PROVISIONER_VERSION` | String | No | `1.8.0` | Version of the provisioner. Example: `1.10.0` |
| `PLUGIN_IAC_PROVIDER_CONNECTOR` | String | No | `""` | Harness connector for the IaC provider. Example: `org.hsf_solutions_factory_connector` |

### Variable management

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_RESOURCE_VARS` | String (JSON) | No | `{}` | Terraform input variables passed to the workspace. Example: `{"key":"value","env":"prod"}` |
| `PLUGIN_RESOURCE_VARS_SECRETS` | String (JSON) | No | `{}` | Terraform variables sourced from Harness secrets. Example: `{"api_key":"secret_value"}` |
| `PLUGIN_RESOURCE_VARS_FILES` | String (JSON Array) | No | `[]` | List of variable files to include. Example: `["terraform.tfvars","prod.tfvars"]` |
| `PLUGIN_RESOURCE_VARS_ENVS` | String (JSON) | No | `{}` | Environment variables passed to the provisioner. Example: `{"LOG_LEVEL":"info"}` |
| `PLUGIN_RESOURCE_VARS_ENVS_SECRETS` | String (JSON) | No | `{}` | Environment variables sourced from Harness secrets. Example: `{"API_SECRET":"secret"}` |
| `PLUGIN_OVERRIDES` | String (JSON) | No | `{}` | Environment-specific variable overrides. Example: `{"prod":{"key":"terraform_key"}}` |
| `PLUGIN_SHOULD_OVERWRITE_VARIABLES` | Boolean | No | `false` | When `true`, replaces all existing variables. When `false`, merges with existing values. |

### Advanced settings

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_INCLUDE_HARNESS_ENVS` | Boolean | No | `false` | When `true`, injects standard Harness environment variables into the workspace. |
| `PLUGIN_IS_EPHEMERAL` | Boolean | No | `false` | When `true`, marks the workspace as ephemeral (short-lived, for temporary environments). |

### Filtering and query options (`view` mode)

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_FILTER_KEY` | String | No | — | Workspace attribute to filter by. Example: `identifier`, `repository_connector` |
| `PLUGIN_FILTER_VALUE` | String | No | — | Value to match against the filter key. Example: `my-workspace` |
| `PLUGIN_RETURN_KEY` | String | No | — | Workspace attribute to return in query results. Example: `identifier` |
| `PLUGIN_IGNORE_HSF_SYSTEM` | Boolean | No | `false` | When `true`, excludes internal HSF system workspaces from results. |

---

## Local development

### Docker examples

The plugin can be run directly with Docker for local testing.

**Create or update a workspace:**

```bash
docker run --rm \
  -e PLUGIN_HARNESS_ENDPOINT=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCOUNT_ID=your_account_id \
  -e PLUGIN_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=main \
  -e PLUGIN_RESOURCE_NAME=my-workspace \
  -e PLUGIN_RESOURCE_OWNER=platform-team \
  -e PLUGIN_RESOURCE_VARS='{"harness_platform_account":"your_account","organization_name":"my-org"}' \
  -e PLUGIN_GIT_REPOSITORY_BRANCH=main \
  -e PLUGIN_GIT_REPOSITORY_CONNECTOR=org.harness_template_repo \
  -e PLUGIN_GIT_REPOSITORY_NAME=https://git.harness.io/account/org/repo.git \
  -e PLUGIN_GIT_REPOSITORY_PATH=workspaces/my-workspace \
  -e PLUGIN_HARNESS_PORTAL_RESOURCES=iacm/api/orgs/my-org/projects/my-project/workspaces \
  -e PLUGIN_HARNESS_PLATFORM_KEY=org.hsf_platform_api_key \
  -e PLUGIN_IAC_PROVISIONER_TYPE=opentofu \
  -e PLUGIN_IAC_PROVISIONER_VERSION=1.10.0 \
  -e PLUGIN_WORKSPACE_ORG=Harness_Platform_Management \
  -e PLUGIN_WORKSPACE_PROJECT=Solutions_Factory \
  -e PLUGIN_WORKSPACE_TAGS='{"source":"official","type":"infrastructure"}' \
  -e PLUGIN_SHOULD_OVERWRITE_VARIABLES=false \
  harnesssolutionfactory/harness-manage-iacm-workspace:latest
```

**Query workspaces by tags:**

```bash
docker run --rm \
  -e PLUGIN_HARNESS_ENDPOINT=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCOUNT_ID=your_account_id \
  -e PLUGIN_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=view \
  -e PLUGIN_WORKSPACE_TAGS='{"source":"official","type":"infrastructure"}' \
  -e PLUGIN_RETURN_KEY=identifier \
  -e PLUGIN_IGNORE_HSF_SYSTEM=true \
  harnesssolutionfactory/harness-manage-iacm-workspace:latest
```

**Delete a workspace:**

```bash
docker run --rm \
  -e PLUGIN_HARNESS_ENDPOINT=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCOUNT_ID=your_account_id \
  -e PLUGIN_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=remove \
  -e PLUGIN_RESOURCE_NAME=workspace-to-delete \
  harnesssolutionfactory/harness-manage-iacm-workspace:latest
```