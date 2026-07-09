---
title: Environment Blueprints in Harness IDP
description: Learn more about Environment Blueprints in Harness IDP. 
sidebar_label: Environment Blueprint YAML
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 3
---

This page covers the complete YAML schema for defining an Environment Blueprint. For a conceptual overview, go to [Overview & Key Concepts](/docs/internal-developer-portal/environment-management/overview). To create a blueprint through the UI, go to [Create an Environment Blueprint](/docs/internal-developer-portal/environment-management/blueprints/create-environment-blueprint).

## Environment blueprint YAML

An Environment Blueprint is defined using a **declarative YAML format**. The YAML structure defines infrastructure templates, services, dependencies, and lifecycle management for environments. 

---

### Core components
An environment blueprint YAML has the following core components: 

**1. API Definition**
- `apiVersion`: Always `harness.io/v1` for Environment Blueprints
- `kind`: Must be `EnvironmentBlueprint`
- `name`: Human-readable name for the blueprint
- `identifier`: Unique identifier for the blueprint (auto-generated)
- `owner`: Access control specification (group or user)

**2. Specification (`spec`)**
- `entities`: List of infrastructure, service components and other entities
- `inputs`: User-configurable parameters for the blueprint

```YAML {8,9}
apiVersion: harness.io/v1
kind: EnvironmentBlueprint
type: ''
name: <blueprint-name>
identifier: <blueprint-identifier>
owner: group:account/_account_all_users
spec:
  entities: []
  inputs: {}
```

---

### Entity specification

Each entity in an Environment Blueprint represents a component (infrastructure or service) that will be provisioned or deployed. Entities are the building blocks that define what gets created and how they interact with each other.

---

#### Entity structure

Each entity in the blueprint is composed of **2 main parts**:

**1. Backend** - Describes the lifecycle implementation of the entity
- Defines **how** the entity is provisioned, deployed, or managed
- Specifies the **backend type** (`HarnessIACM` for infrastructure, `Catalog` or `HarnessCD` for services). Go to [Backend Types](/docs/internal-developer-portal/environment-management/blueprints/env-blueprint-yaml#backend-types) to learn more.
- Contains configuration values and operational steps

**2. Interface** - Defines how the entity relates to other entities specified in the blueprint
- Declares dependencies on other entities
- Specifies **entity-level** user-configurable inputs
- Defines the entity's interaction model

```yaml
entities:
- identifier: <entity-name>
  interface:              # How entity relates to others
    dependencies: []      # List of entities this depends on
    inputs: {}           # User-configurable parameters
  backend:                # Lifecycle implementation
    type: <backend-type>  # HarnessIACM, Catalog, or HarnessCD
    values: {}           # Configuration and settings
    steps: {}            # Operational steps (for IaCM)
```

---

#### Entity parameters

| Parameter | Type | Description | Example |
|-----------|------|-----------|---------|
| `identifier` | string | Unique name for the entity within the blueprint | `namespace`, `frontend`, `backend` |
| `interface` | object | Defines entity relationships and user inputs | See Interface Parameters below |
| `backend` | object | Defines the lifecycle implementation of the entity | See Backend Parameters below |

**Interface Parameters**

| Parameter | Type | Description | Example |
|-----------|------|-----------|---------|
| `dependencies` | array | List of entity identifiers this entity depends on | `[{"identifier": "namespace"}]` |
| `inputs` | object | User-configurable parameters with types and defaults at the entity level | `{"replicas": {"type": "integer", "default": 1}}` |

**Backend Parameters**

| Parameter | Type | Description | Example |
|-----------|------|-----------|---------|
| `type` | string | Backend type for entity provisioning | `HarnessIACM`, `Catalog`, `HarnessCD` |
| `values` | object | Configuration settings specific to the backend type | Varies by backend type |
| `steps` | object | Operational steps for lifecycle management **(IaCM only)** | `{"create": {"template": "MyTemplate"}}` |

---

### Backend types

Environment Blueprints support three main **backend types**:

---

#### 1. HarnessIACM backend (infrastructure)

Used for provisioning infrastructure resources using Infrastructure as Code Management. 

In this definition, `backend.type` is set to `HarnessIACM`.

**YAML Structure**

```YAML {4}
entities:
- identifier: namespace
  backend:
    type: HarnessIACM
    values:
      workspace: Namespace-${{env.config.name}}
    steps:
      create:
        template: TempNamespace  # Workspace Template ID
        version: '1'
      apply:
        pipeline: DefaultProvision  # Provision pipeline ID
        variables:
          name: temp-${{env.config.name}}
      destroy:
        pipeline: DefaultDestroy  # Destroy pipeline ID
        variables:
          name: temp-${{env.config.name}}
      delete: {}
      pause: {}
      resume: {}
```

**HarnessIACM Backend Parameters (`backend.values`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|----------|
| `workspace` | string | Workspace name for IaCM operations | `Namespace-${{env.config.name}}` |

**HarnessIACM Backend Steps (`backend.steps`)**

| Step | Required | Description | Parameters |
|------|----------|-------------|------------|
| `apply` | Yes | Provisions infrastructure with "upsert" behavior - creates initially and updates on changes | `pipeline`, `variables` |
| `destroy` | Yes | Destroys previously provisioned infrastructure | `pipeline`, `variables` |
| `create` | No | Initializes infrastructure (e.g., IaCM Workspace) before first provisioning | `template`, `version` |
| `delete` | No | Deletes initialized but unprovisioned infrastructure | None |

**Step Dependencies:**
- `create` must be executed before first `apply` operation
- `delete` must be executed after `destroy` operation  
- `create` and `delete` steps must be used together (both or neither)

**Example Configuration:**
```yaml
steps:
  create:
    template: TempNamespace
    version: '1'
  apply:
    pipeline: DefaultProvision
    variables:
      name: temp-${{env.config.name}}
  destroy:
    pipeline: DefaultDestroy
    variables:
      name: temp-${{env.config.name}}
  delete: {}
```

**Referencing Resources Across Scopes**

When referencing Harness resources (such as IaCM workspace templates or catalog entities) in your blueprint, you can reference resources from different organizational scopes using scope prefixes:

- **Project scope** (default): Use just the identifier - `MyResource`
- **Organization scope**: Prefix with `org.` - `org.MyResource`
- **Account scope**: Prefix with `account.` - `account.MyResource`

This enables you to reference shared resources across your Harness hierarchy while maintaining proper access control. For example, environments created at the project level can reference IaCM workspace templates or catalog entities defined at the organization or account level.

:::info Scope Hierarchy
Resources must respect the Harness organizational hierarchy. A project-level environment can reference resources from its parent organization or account, but resources maintain their defined scope boundaries and access permissions.
:::

---

#### 2. Catalog backend (services)

Used for deploying application services from the IDP catalog.

In this definition, `backend.type` is set to `Catalog`.

**YAML Structure**

```yaml {14}
entities:
- identifier: frontend
  interface:
    dependencies:
    - identifier: namespace  # Depends on infrastructure
    inputs:
      version:
        type: string
        default: v1.1.0
      replicas:
        type: integer
        default: 1
  backend:
    type: Catalog
    values:
      identifier: frontend  # Component ID from catalog
      variables:
        replicas: ${{entity.config.replicas}}
        version: ${{entity.config.version}}
      environment:
        identifier: mycluster
        infra:
          identifier: ssemteamdelegate
          namespace: ${{dependencies.namespace.output.name}}
    steps:
      apply:
        pipeline: DeployService
      destroy:
        pipeline: UninstallService
```

**Catalog Backend (`backend.values`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|----------|
| `identifier` | string | Component (service) ID from the IDP catalog | `frontend`, `backend` |
| `variables` | object | Input variables passed to the component | `{"replicas": "${{entity.config.replicas}}"}` |
| `environment` | object | Target deployment environment specification | See environment parameters below |

:::caution
The `values.variables` field maps to service-level variables on the Harness Service, not pipeline-level variables. If your deployment pipeline defines variables at the pipeline level (for example, `pipeline.variables.COMMIT_SHA`), those variables cannot be resolved through `values.variables`. Use the [HarnessCD backend](#3-harnesscd-backend-services) instead and pass pipeline variables under `steps.apply.variables`.
:::

**Environment Parameters (`backend.values.environment`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|----------|
| `identifier` | string | CD Service Environment identifier where services will be deployed | `mycluster` |
| `infra` | object | Infrastructure specification within the environment | See infra parameters below |

**Infrastructure Parameters (`backend.values.environment.infra`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|----------|
| `identifier` | string | Infrastructure identifier | `ssemteamdelegate` |

**Catalog Backend Steps (`backend.steps`)**

| Step | Required | Description | Parameters |
|------|----------|-------------|------------|
| `apply` | Yes | Deploys the service using the specified pipeline | `pipeline` |
| `destroy` | Yes | Removes the deployed service using the specified pipeline | `pipeline` |

#### 3. HarnessCD Backend (Services)

Used for deploying application services when your deployment pipelines use pipeline-level variables. Unlike the `Catalog` backend type, where `values.variables` maps to service-level variables on the Harness Service, the `HarnessCD` backend type lets you define pipeline variables (for example, `COMMIT_SHA`) directly under `steps.apply.variables`.

In this definition, `backend.type` is set to `HarnessCD`.

**YAML Structure**

```yaml {7}
entities:
- identifier: backend
  interface:
    dependencies:
    - identifier: namespace
  backend:
    type: HarnessCD
    values:
      service: ssem           # Harness CD service identifier
      variables:                  # Service-level variables (not pipeline-level)
      environment:
        identifier: mycluster
        infra:
          identifier: ssemteam
          namespace: my-app-${{env.config.namespace}}
    steps:
      apply:
        pipeline: Deploy
        variables:                # Pipeline-level variables
          COMMIT_SHA: ${{env.config.COMMIT_SHA}}
      destroy:
        pipeline: Uninstall
```

**HarnessCD Backend (`backend.values`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `service` | string | Harness CD service identifier | `frontend`, `backend` |
| `variables` | object | Service-level input variables passed to the Harness Service | `{"IMAGE_TAG": "${{env.config.IMAGE_TAG}}"}` |
| `environment` | object | Target CD environment specification | See Environment Parameters below |

**Environment Parameters (`backend.values.environment`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `identifier` | string | CD Service Environment identifier where the service will be deployed | `mycluster` |
| `infra` | object | Infrastructure specification within the environment | See infra parameters below |

**Infrastructure Parameters (`backend.values.environment.infra`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `identifier` | string | Infrastructure identifier | `ssemteam` |
| `namespace` | string | Kubernetes namespace for the deployment (supports templating) | `my-app-${{env.config.name}}` |

**HarnessCD Backend Steps (`backend.steps`)**

| Step | Required | Description | Parameters |
|------|----------|-------------|------------|
| `apply` | Yes | Deploys the service using the specified pipeline | `pipeline`, `variables` |
| `destroy` | Yes | Removes the deployed service using the specified pipeline | `pipeline` |

**Step Parameters (`backend.steps.apply`)**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `pipeline` | string | Deploy pipeline identifier | `Deploy` |
| `variables` | object | Pipeline-level variables passed directly to the pipeline at execution time | `{"COMMIT_SHA": "${{env.config.COMMIT_SHA}}"}` |

### Configure TTL (time-to-live)

You can configure TTL for environments in the environment blueprint. Defining a TTL specifies how long an environment can run before it is **automatically paused**. This helps control costs and prevents lingering environments.

Based on the TTL specification, there are two environment types: **Ephemeral** and **Long-lived**. Go to [Types of Environments](/docs/internal-developer-portal/environment-management/environments#types-of-environments) to learn more.

#### Set TTL in an environment blueprint

To define a TTL, add the `spec.ttl` field to the environment blueprint YAML. The `ttl` field is specified as follows:

**1. TTL specification**

```yaml
spec:
  ttl:
    kind: <ttl-kind>
    default: <default-ttl-duration>   # Optional
    max: <max-ttl-duration>           # Optional
```

Durations support hours, minutes, and seconds (e.g., `1h`, `30m`, `1h30m`).

**2. TTL kinds**

* **`fixed`** - A fixed, preconfigured duration in the blueprint. Users **cannot** change it when creating an environment.
* **`custom`** - A user-configurable duration chosen at environment creation time.
* **`none`** - No TTL. The environment is **long-lived** and is only paused/stopped when a user does so explicitly.

**3. TTL parameters**

* **`default`** - The default TTL duration for the blueprint (optional).
* **`max`** - The maximum allowed TTL duration for the blueprint (optional).

**4. Examples**

Fixed 1-hour TTL; the environment pauses automatically after 1 hour:

```yaml
spec:
  ttl:
    kind: fixed
    default: 1h
    max: 24h
```

User-defined TTL with a default of 3 hours (if no input is provided) and a 24-hour cap:

```yaml
spec:
  ttl:
    kind: custom
    default: 3h
    max: 24h
```

Long-lived environment (no automatic pause):

```yaml
spec:
  ttl:
    kind: none
```

**Note:** When you update an environment’s configuration, the environment is **re-provisioned** and the TTL is **reset**. The new TTL countdown starts from the time of the update.

:::info Enforcing TTL with OPA Policies
Platform engineers can use Harness OPA governance to enforce TTL requirements across all blueprints, e.g., blocking blueprints that use `ttl.kind: none` or that exceed a maximum TTL. These policies are evaluated automatically when a blueprint is created or updated. Go to [Centralized Policy Governance for IDP Catalog Entities](/docs/internal-developer-portal/environment-management/opa-governance) to enforce configuration standards on blueprints.
:::

---

### Blueprint outputs

A blueprint can define an `outputs` block under `spec` to expose values from its entities once the environment is provisioned. These values appear in the **Outputs** tab of the environment detail page and can be referenced by other environments using cross-environment output syntax.

```yaml
spec:
  outputs:
    <output-name>:
      type: string
      description: <optional description>
      value: <expression>
```

The `value` field uses the entity output expression format described in [YAML Templating System](#yaml-templating-system).

**IaCM entity output** (Terraform output from a workspace):

```yaml
spec:
  outputs:
    namespace-name:
      type: string
      value: ${{entity.namespace.output.name}}
```

**IaCM pipeline output** (output from a provisioning pipeline stage):

```yaml
spec:
  outputs:
    apply-result:
      type: string
      value: ${{entity.namespace.provision.apply.output.output.outputVariables.name}}
```

**CD pipeline output** (stage output from a deployment pipeline):

```yaml
spec:
  outputs:
    release-name:
      type: string
      value: ${{entity.frontend.deploy.HelmDeploy_1.output.releaseHelmChartOutcome.name}}
```

:::note
For IaCM entities, output values are sourced from Terraform outputs of the workspace. For CD entities, output values are sourced from stage outputs of the deployment pipeline.
:::

---


### YAML templating system

Environment Blueprints use a powerful templating system for dynamic configuration:

#### Template variables

| Variable Type | Format | Description |
|---|---|---|
| Environment Config | `${{env.config.name}}` | Access blueprint-level inputs defined in `spec.inputs`. |
| Entity Config | `${{entity.config.replicas}}` | Access entity-level inputs defined in `interface.inputs`. |
| Entity Output | `${{entity.<id>.output.<path>}}` | Reference an output from an entity in this blueprint. For a specific pipeline stage and step: `${{entity.<id>.<stage>.<step>.output.<path>}}` |
| Dependency Output | `${{dependencies.<id>.output.<path>}}` | Reference an output from a dependent entity. For a specific pipeline stage and step: `${{dependencies.<id>.<stage>.<step>.output.<path>}}` |

#### Example usage

```yaml
# Dynamic workspace naming
workspace: Namespace-${{env.config.name}}

# Variable mapping from inputs
variables:
  replicas: ${{entity.config.replicas}}
  version: ${{entity.config.version}}

# Dependency resolution
namespace: ${{dependencies.namespace.output.name}}
```

Output values are populated once environment entities finish provisioning (IaCM workspaces) or deploying (CD services). To see the resolved output values for a running environment, open the environment and select the **Outputs** tab.

---

### Scope & hierarchy
Environment Blueprints can be created at the **account**, **organization**, or **project** scope. The scope is determined by the `orgIdentifier` and `projectIdentifier` fields in the blueprint YAML:

- A blueprint with no `orgIdentifier` or `projectIdentifier` is created at the **account scope**.
- A blueprint with only an `orgIdentifier` is created at the **org scope**.
- A blueprint with both `orgIdentifier` and `projectIdentifier` is created at the **project scope**.

Environments are currently created at the **project scope**. However, an environment can reference a blueprint from its own project scope, its parent org scope, or the account scope.


#### Reference blueprints from environments

When an environment references a blueprint, the blueprint identifier uses a scope prefix to indicate which scope the blueprint belongs to:

* `account.my-blueprint`: references a blueprint at the account scope
* `org.my-blueprint`: references a blueprint at the org scope
* `my-blueprint` (no prefix): references a blueprint at the same scope as the environment (project level)

:::info Migration
Existing environments that referenced blueprints without a scope prefix have been automatically migrated to use the `account.` prefix, since all pre-existing blueprints were at account level. No action is required for existing account-level blueprints.
:::

In an environment blueprint, all the entities, workspace templates, pipelines, etc. are also created at the **project scope**.

#### Environment management RBAC

Harness IDP provides granular Role-Based Access Control (RBAC) for environment management, allowing you to control who can view, create, edit, or delete environment blueprints and environments. The RBAC model follows the Harness platform hierarchy with different scopes for blueprints and environments.

##### Permissions Hierarchy

The environment management RBAC is structured across two main resource types:

| Resource Type | Scope | Available Permissions | Resource Group Options |
|---------------|-------|----------------------|------------------------|
| **Environment Blueprint** | Account, Org, or Project Level | <ul><li>**VIEW**: View environment blueprints</li><li>**CREATE**: Create new blueprints</li><li>**EDIT**: Edit existing blueprints</li><li>**DELETE**: Delete environment blueprints</li></ul> | <ul><li>All Environment Blueprints</li><li>Specific Environment Blueprints</li></ul> |
| **Environment** | Project Level | <ul><li>**VIEW**: View environments</li><li>**CREATE**: Create new environments</li><li>**EDIT**: Edit existing environments</li><li>**DELETE**: Delete environments</li></ul> | <ul><li>All Environments</li><li>Specific Environments</li></ul> |

For a complete overview of all IDP resources and their permissions across different scopes, refer to the [Permissions & Resources table](/docs/internal-developer-portal/rbac/scopes#permissions--resources-idp-20) in the IDP RBAC documentation.

##### Configuring RBAC for Environment Management

To configure access control for environment management:

1. **For Environment Blueprints (Account, Org, or Project Level)**:
   - Navigate to the settings for the relevant scope (Account Settings, Org Settings, or Project Settings) → **Access Control** → **Roles**
   - Navigate to **Account Settings** → **Access Control** → **Roles**
   - Create or edit a role and assign Environment Blueprint permissions (VIEW, CREATE, EDIT, DELETE)
   - Create a **Resource Group** and select either:
     - **All Environment Blueprints** - Grants access to all blueprints in the account
     - **Specific Environment Blueprints** - Grants access to selected blueprints only
   - Assign the role and resource group to users or user groups

2. **For Environments (Project Level)**:
   - Navigate to **Project Settings** → **Access Control** → **Roles**
   - Create or edit a role and assign Environment permissions (VIEW, CREATE, EDIT, DELETE)
   - Create a **Resource Group** and select either:
     - **All Environments** - Grants access to all environments in the project
     - **Specific Environments** - Grants access to selected environments only
   - Assign the role and resource group to users or user groups

:::tip
For more information on configuring RBAC in Harness, refer to the [RBAC documentation](/docs/platform/role-based-access-control/rbac-in-harness).
:::  

---

### Example blueprint YAML

```yaml
apiVersion: harness.io/v1
kind: EnvironmentBlueprint
type: ''
name: TempEnvironment
identifier: temp_environment
owner: group:account/_account_all_users
spec:
  entities:
  # Infrastructure Entity
  - identifier: namespace
    backend:
      type: HarnessIACM
      values:
        workspace: Namespace-${{env.config.name}}
      steps:
        create:
          template: TempNamespace
          version: '1'
        apply:
          pipeline: DefaultProvision
          variables:
            name: temp-${{env.config.name}}
        destroy:
          pipeline: DefaultDestroy
          variables:
            name: temp-${{env.config.name}}
        delete: {}
  
  # Frontend Service Entity
  - identifier: frontend
    interface:
      dependencies:
      - identifier: namespace
      inputs:
        version:
          type: string
          default: v1.1.0
        replicas:
          type: integer
          default: 1
    backend:
      type: Catalog
      values:
        identifier: frontend
        variables:
          replicas: ${{entity.config.replicas}}
          version: ${{entity.config.version}}
        environment:
          identifier: mycluster
          infra:
            identifier: ssemteamdelegate
            namespace: ${{dependencies.namespace.output.name}}
        steps:
          apply:
            pipeline: DeployService
          destroy:
            pipeline: UninstallService
  
  # Backend Service Entity
  - identifier: backend
    interface:
      dependencies:
      - identifier: namespace
      inputs:
        version:
          type: string
          default: v1.3.2
        replicas:
          type: integer
          default: 1
    backend:
      type: Catalog
      values:
        identifier: backend
        variables:
          replicas: ${{entity.config.replicas}}
          version: ${{entity.config.version}}
        environment:
          identifier: mycluster
          infra:
            identifier: ssemteamdelegate
            namespace: ${{dependencies.namespace.output.name}}
      steps:
        apply:
          pipeline: DeployService
        destroy:
          pipeline: UninstallService
  
  # Blueprint-level inputs
  inputs:
    name:
      type: string
      default: demo
```

---

## Create environment blueprints

For a step-by-step UI walkthrough of the blueprint creation flow, go to [Create an Environment Blueprint](/docs/internal-developer-portal/environment-management/blueprints/create-environment-blueprint).

