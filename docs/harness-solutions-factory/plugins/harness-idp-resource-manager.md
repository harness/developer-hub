---
title: IDP Resource Manager Plugin
description: Understand how to customize and configure the IDP Resource Manager Plugin
sidebar_position: 2
---

# Harness IDP Resource Manager Plugin Reference

The Harness IDP Resource Manager plugin provides full lifecycle management for [Harness Internal Developer Portal (IDP)](https://developer.harness.io/docs/internal-developer-portal) entities. Use it in your Harness pipelines to register, update, query, and remove IDP entities such as workflows, resources, systems, and components. The plugin also supports backwards compatibility with IDP 1.0-style configurations via Git sync.

## Important notes

:::info
- The plugin requires Python 3.11+ and Docker with `buildx` support at runtime.
- The `remove` operation is **destructive and irreversible**. Always verify `PLUGIN_SCOPES` before running.
- The `view` mode requires IDP 2.0. It is not supported on IDP 1.0 accounts.
- `PLUGIN_PROJECT_ID` requires `PLUGIN_ORG_ID` to be set. Project-scoped operations without an org will fail.
- `PLUGIN_HARNESS_URL` is deprecated. Use `PLUGIN_HARNESS_URI` for all new configurations.
:::

## Plugin image

```
harnesssolutionfactory/harness-idp-resource-manager:latest
```

## Operation modes

Set `PLUGIN_SWITCH` to control what the plugin does. If not set, the plugin defaults to `main`.

| Mode | Description |
|------|-------------|
| `main` / `register` | Register or upsert IDP entities from a registration file or filter template |
| `register_multi` | Register multiple resources using a shared payload template with substitution |
| `view` | List all entities of a specified type. Requires IDP 2.0 |
| `check` | Verify IDP 2.0 compatibility and resource existence at a given scope |
| `property` | Update a custom metadata property on an existing entity |
| `remove` | ⚠️ Delete all entities at the specified scope(s). Destructive operation |
| `children` | Register child entities from a parent template directory |
| `legacy` | Register entities using IDP 1.0-style Git sync |

## Supported entity types

Set `PLUGIN_ENTITY_TYPE` to target a specific kind of IDP catalog entity. Applies to all modes except `check`.

| Value | Description |
|-------|-------------|
| `workflow` | IDP software templates / workflows |
| `resource` | Infrastructure or platform resources |
| `system` | Logical groupings of related components |
| `component` | Services, libraries, websites, or other software components |

## Use in Harness pipelines

Add the plugin as a **Plugin** step in your stage. The examples below cover each operation mode.

### Register workflows

Register workflows from the Harness Template Library using a registration file:

```yaml
- step:
    type: Plugin
    name: Register Workflows
    identifier: register_workflows
    description: Register IDP workflows from the template library
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: register
        PLUGIN_ENTITY_TYPE: workflow
        PLUGIN_WORKING_DIR: <+stepGroup.steps.Clone_Repository.spec.cloneDirectory>
        PLUGIN_REGISTRATION_FILE: idp_registration_mgr.yaml
        PLUGIN_FILTER_TEMPLATE: <+pipeline.variables.filter_template>
        PLUGIN_INCLUDE_CHILDREN: <+pipeline.variables.include_children>
        PLUGIN_ORG_ID: <+pipeline.variables.org_id>
        PLUGIN_PROJECT_ID: <+pipeline.variables.project_id>
        PLUGIN_DEBUG_MODE: "false"
```

### Register resources from a Jinja2 template

Register IDP resources by rendering a Jinja2 template with a JSON payload:

```yaml
- step:
    type: Plugin
    name: Register Resources
    identifier: register_resources
    description: Register IDP resources using a Jinja2 template and JSON payload
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: register
        PLUGIN_ENTITY_TYPE: resource
        PLUGIN_WORKING_DIR: <+stepGroup.steps.Clone_Repository.spec.cloneDirectory>
        PLUGIN_ENTITY_TEMPLATE: idp_resource_templates/default_hsf_workspace_resource.yaml.j2
        PLUGIN_ENTITY_PAYLOAD: '{"resource_name":"Account Workspace","is_resource_drifted":"true","workspace_uri":"https://app.harness.io/ng/account/ABC123/module/iacm/orgs/my-org/projects/my-project/workspaces/my-workspace"}'
        PLUGIN_ORG_ID: Harness_Platform_Management
        PLUGIN_PROJECT_ID: Solutions_Factory
        PLUGIN_DEBUG_MODE: "false"
```

### Register systems from a static entity file

Register IDP systems directly from a YAML entity file without template rendering:

```yaml
- step:
    type: Plugin
    name: Register Systems
    identifier: register_systems
    description: Register IDP systems from a static entity file
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: register
        PLUGIN_ENTITY_TYPE: system
        PLUGIN_WORKING_DIR: <+stepGroup.steps.Clone_Repository.spec.cloneDirectory>
        PLUGIN_ENTITY_FILE: lob/core.yaml
        PLUGIN_ORG_ID: Harness_Platform_Management
        PLUGIN_PROJECT_ID: Solutions_Factory
        PLUGIN_USE_TEMPLATE_MGR: "false"
```

### Register components

Register IDP components from a static entity file:

```yaml
- step:
    type: Plugin
    name: Register Components
    identifier: register_components
    description: Register IDP components from a static entity file
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: register
        PLUGIN_ENTITY_TYPE: component
        PLUGIN_WORKING_DIR: <+stepGroup.steps.Clone_Repository.spec.cloneDirectory>
        PLUGIN_ENTITY_FILE: lob/core.yaml
        PLUGIN_ORG_ID: Harness_Platform_Management
        PLUGIN_PROJECT_ID: Solutions_Factory
        PLUGIN_USE_TEMPLATE_MGR: "false"
```

### Query entities

List all existing entities of a given type:

```yaml
- step:
    type: Plugin
    name: Get Workflows
    identifier: get_workflows
    description: Retrieve all existing workflows from IDP
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: view
        PLUGIN_ENTITY_TYPE: workflow
```

### Check entity existence at scope

Verify IDP 2.0 compatibility and whether resources exist at a given scope:

```yaml
- step:
    type: Plugin
    name: Check Resources
    identifier: check_resources
    description: Check if resources exist at a specific org and project scope
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: check
        PLUGIN_ORG_ID: CDK_Prod
        PLUGIN_PROJECT_ID: Enterprise_IT_IOPS_Orchestration
```

### Update a custom property

Update a dot-notation metadata property on an existing entity:

```yaml
- step:
    type: Plugin
    name: Update Resource Properties
    identifier: update_resource_props
    description: Set a custom metadata property on an existing IDP resource
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: property
        PLUGIN_ENTITY_TYPE: resource
        PLUGIN_ENTITY_ID: account_workspace
        PLUGIN_HSF_PROPERTY: metadata.hsf.is_drifted
        PLUGIN_HSF_VALUE: "false"
        PLUGIN_ORG_ID: Harness_Platform_Management
        PLUGIN_PROJECT_ID: Solutions_Factory
```

### Remove entities at scope

:::danger
This is a destructive, irreversible operation. All entities at the specified scope(s) will be permanently deleted. Verify `PLUGIN_SCOPES` before running.
:::

```yaml
- step:
    type: Plugin
    name: Delete Workflows
    identifier: delete_workflows
    description: Remove all workflows at a specified scope
    spec:
      connectorRef: <+input>
      image: harnesssolutionsfactory/harness-idp-resource-manager:latest
      settings:
        PLUGIN_HARNESS_URI: <+pipeline.variables.hsf_account_url>
        PLUGIN_HARNESS_ACCT: <+account.identifier>
        PLUGIN_HARNESS_API_KEY: <+pipeline.variables.HARNESS_PLATFORM_KEY>
        PLUGIN_SWITCH: remove
        PLUGIN_ENTITY_TYPE: workflow
        PLUGIN_SCOPES: account.Harness_Platform_Management
```

---

## Settings reference

### Connection and authentication

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_HARNESS_URI` | String | Yes | — | Base URL of the Harness platform. Example: `https://app.harness.io` |
| `PLUGIN_HARNESS_ACCT` | String | Yes | — | Your Harness account identifier. Example: `HT1234569XFhhslllddd12` |
| `PLUGIN_HARNESS_API_KEY` | String | Yes | — | API token with permissions to manage IDP entities. Example: `pat.xxxxx` |
| `PLUGIN_HARNESS_URL` | String | No | — | **Deprecated.** Alternative variable for the Harness API URL. Use `PLUGIN_HARNESS_URI` instead. |

### Operation control

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_SWITCH` | String | No | `main` | Operation mode. See [Operation modes](#operation-modes) for accepted values. |
| `PLUGIN_ENTITY_TYPE` | String | No | `workflow` | Type of IDP entity to manage. Accepted values: `workflow`, `resource`, `system`, `component`. Not used in `check` mode. |
| `PLUGIN_DEBUG_MODE` | String | No | `false` | Set to `true` to enable verbose debug logging. |

### Scope and organization

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_ORG_ID` | String | No | Account scope | Organization identifier. If omitted, operations default to account scope. |
| `PLUGIN_PROJECT_ID` | String | No | Account scope | Project identifier. Requires `PLUGIN_ORG_ID` to be set. |
| `PLUGIN_SCOPES` | String | No | — | Scope(s) for `remove` operations. Accepts comma-separated values. Format: `all`, `account`, `account.ORG_ID`, or `account.ORG_ID.PROJ_ID`. Example: `account.Harness_Platform_Management` |

### File and directory configuration

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_WORKING_DIR` | String | No | `/harness/harness-template-library` | Full path to the directory containing configuration or template files. |
| `PLUGIN_REGISTRATION_FILE` | String | Conditional | — | YAML file (relative to `PLUGIN_WORKING_DIR`) that lists entities to register. Required if `PLUGIN_FILTER_TEMPLATE` is not set. Applies to `main`, `register`, `children` modes. Example: `idp_registration_mgr.yaml` |

### Template and entity registration

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_FILTER_TEMPLATE` | String | Conditional | — | Workflow, template name, or directory name within `PLUGIN_WORKING_DIR` to register. Required if `PLUGIN_REGISTRATION_FILE` is not set. Applies to `main`, `register`, `children`, `legacy` modes. Example: `sto-sast-primer` |
| `PLUGIN_FILTER_TAG` | String | No | — | Tag filter for narrowing entity results in `view` mode. Example: `managed_entity` |
| `PLUGIN_INCLUDE_CHILDREN` | String | No | `no` | Set to `yes` to load child entities from the `PLUGIN_FILTER_TEMPLATE` directory. Applies to `main`, `register`, `children`, `legacy` modes. |
| `PLUGIN_ENTITY_FILE` | String | Conditional | — | Path to a YAML entity definition file, relative to `PLUGIN_WORKING_DIR`. Required for non-template registration in `register` mode. Example: `lob/core.yaml` |
| `PLUGIN_ENTITY_TEMPLATE` | String | Conditional | — | Path to a Jinja2 template file, relative to `PLUGIN_WORKING_DIR`. Required when using template rendering. Example: `idp_resource_templates/default_hsf_workspace_resource.yaml.j2` |
| `PLUGIN_ENTITY_PAYLOAD` | String (JSON) | Conditional | — | JSON object with variables for Jinja2 template injection. Required when `PLUGIN_ENTITY_TEMPLATE` is set. Applies to `register` and `register_multi` modes. Example: `'{"resource_name":"workspace","workspace_uri":"https://..."}'` |
| `PLUGIN_USE_TEMPLATE_MGR` | String | No | `true` | Set to `true` to use Jinja2 template rendering. Set to `false` to use static entity files. |

### Entity management

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_ENTITY_ID` | String | Conditional | — | Identifier of the entity to update or delete. Required for entity-specific operations in `remove` and `property` modes. Example: `my_resource` |
| `PLUGIN_RESOURCES` | String | Conditional | — | Comma-separated list of resource names for `register_multi` mode. Example: `lab,lab_workshop` |

### Custom properties

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_HSF_PROPERTY` | String | Yes (in `property` mode) | — | Dot-notation path of the metadata property to update. Example: `metadata.hsf.is_drifted` |
| `PLUGIN_HSF_VALUE` | String | Yes (in `property` mode) | — | Value to assign to `PLUGIN_HSF_PROPERTY`. Example: `false` |

### Legacy settings

| Setting | Type | Required | Default | Description |
|---------|------|----------|---------|-------------|
| `PLUGIN_REPO_BRANCH` | String | Yes (in `legacy` mode) | `main` | Git branch used for IDP 1.0-style Git sync registration. |

---

## Local development

### Docker examples

The plugin can be run directly with Docker for local testing. Mount your local template library into the container so the plugin can locate entity files.

**Register workflows:**

```bash
docker run --rm -it \
  -e PLUGIN_HARNESS_URI=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCT=your_account_id \
  -e PLUGIN_HARNESS_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=register \
  -e PLUGIN_ENTITY_TYPE=workflow \
  -e PLUGIN_WORKING_DIR=/harness/harness-template-library \
  -e PLUGIN_REGISTRATION_FILE=idp_registration_mgr.yaml \
  -e PLUGIN_DEBUG_MODE=true \
  -v /path/to/template-library:/harness/harness-template-library \
  -v $(pwd):/harness \
  harnesssolutionsfactory/harness-idp-resource-manager:latest
```

**Register resources with a Jinja2 template:**

```bash
docker run --rm -it \
  -e PLUGIN_HARNESS_URI=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCT=your_account_id \
  -e PLUGIN_HARNESS_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=register \
  -e PLUGIN_ENTITY_TYPE=resource \
  -e PLUGIN_WORKING_DIR=/harness/harness-template-library \
  -e PLUGIN_ENTITY_TEMPLATE=idp_resource_templates/default_hsf_workspace_resource.yaml.j2 \
  -e 'PLUGIN_ENTITY_PAYLOAD={"resource_name":"my-workspace","is_resource_drifted":"false","workspace_uri":"https://app.harness.io/..."}' \
  -e PLUGIN_ORG_ID=my_org \
  -e PLUGIN_PROJECT_ID=my_project \
  -e PLUGIN_DEBUG_MODE=true \
  -v /path/to/template-library:/harness/harness-template-library \
  -v $(pwd):/harness \
  harnesssolutionsfactory/harness-idp-resource-manager:latest
```

**View all workflows:**

```bash
docker run --rm -it \
  -e PLUGIN_HARNESS_URI=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCT=your_account_id \
  -e PLUGIN_HARNESS_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=view \
  -e PLUGIN_ENTITY_TYPE=workflow \
  harnesssolutionsfactory/harness-idp-resource-manager:latest
```

**Update a custom property:**

```bash
docker run --rm -it \
  -e PLUGIN_HARNESS_URI=https://app.harness.io \
  -e PLUGIN_HARNESS_ACCT=your_account_id \
  -e PLUGIN_HARNESS_API_KEY=your_api_key \
  -e PLUGIN_SWITCH=property \
  -e PLUGIN_ENTITY_TYPE=resource \
  -e PLUGIN_ENTITY_ID=my_resource \
  -e PLUGIN_HSF_PROPERTY=metadata.hsf.is_drifted \
  -e PLUGIN_HSF_VALUE=false \
  -e PLUGIN_ORG_ID=my_org \
  -e PLUGIN_PROJECT_ID=my_project \
  harnesssolutionsfactory/harness-idp-resource-manager:latest
```