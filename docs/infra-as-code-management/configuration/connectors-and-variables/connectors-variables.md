---
title: Connectors & Variable Sources
description: Learn how to configure connectors, environment variables, OpenTofu/Terraform variables, and variable files in your IaCM workspace.
sidebar_position: 10
redirect_from: 
  - "/docs/infra-as-code-management/project-setup/input-variables"
  - "/docs/infra-as-code-management/manage-projects/connectors-variables"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

**Connectors and Variables** define the full set of inputs and integrations your workspace uses when running **Plan**, **Apply**, or **Drift detection** pipelines. These inputs can come from multiple sources and are resolved based on a clear order of precedence.

## Connectors
A **connector** is required to authenticate with cloud providers or external systems. Most workspace operations, like fetching modules or variable files, depend on a connector.

:::info supported connectors
IaCM supports the following cloud providers and external systems through connectors:
- **AWS**: Amazon Web Services integration
- **GCP**: Google Cloud Platform integration
- **Azure**: Microsoft Azure integration
- **Vault**: HashiCorp Vault integration for secrets management

Go to the [IaCM What's Supported](/docs/infra-as-code-management/whats-supported) page for detailed configuration information.

:::tip add connectors
Connectors can be added via Account Settings or directly from your workspaces **Connectors and Variables** tab.
:::

### Add a connector
1. From your workspace **Connectors and Variables** tab, click **+ Connector**.
2. Select an existing connector from your account or project scope (e.g., `aws-oidc`).

Or, you can add a new connector by clicking **+ New Connector**.

:::info interactive guide
Also, see [Add Connectors](/docs/infra-as-code-management/get-started/#add-connectors) for an interactive guide.
:::

### Connectors from templates
If your workspace is created from a workspace template, it may include connectors defined in the template.

- These appear in the **Connectors and Variables** tab.
- Currently, these connectors **cannot be modified** in the workspace.

### Multiple Connectors
You can attach more than one connector to a workspace. This allows your IaCM runs to access multiple cloud providers or external systems from a single workspace (for example, both AWS and Azure). However, a workspace can only have one connector per provider type (for example, one AWS, one GCP, one Azure).

- Connectors appear in the **Connectors and Variables** tab.
- If a workspace is created from a template, template-defined connectors are included automatically (read-only).
- You can add more connectors inline or select from account/project scope.

---

## Secrets Management
The **Vault** connector provides HashiCorp Vault integration for secrets management in IaCM workspaces.

**Key features:**
- **Workspace-level attachment**: Vault connectors are attached at the workspace level
- **Authentication methods**: Currently supports **Token** and **JWT** authentication
- **Flexible configuration**: Can be added to workspaces after creation or through variable sets
- **Runtime injection**: Secrets are automatically injected into runtime environments as environment variables
- **Provider initialization**: Harness automatically adds environment variables based on the selected authentication type, which you must consume to initialize the Vault provider in your OpenTofu/Terraform code.

---

## Variable sources
:::info set variables
You can provide variables in the following ways:

- **Variable Sets:** Reusable collections of variables and secrets defined at the account level and applied to multiple workspaces.
- **Workspace Templates:** Predefined templates that inject connectors and variables into workspaces.
- **Workspace-level variables:** Environment variables and OpenTofu/Terraform variables defined directly in the workspace.
- **Variable files:** `.tfvars`, `.json`, or `.yaml` files stored in Git and linked to the workspace.
- **Connectors:** Authentication references for cloud providers, Git, and external systems (used for fetching modules, variable files, or credentials).
- **HCL defaults:** Default values defined directly in your OpenTofu/Terraform code.
- **Pipeline-level variables:** Values passed at runtime from pipelines.
  :::

### Order of precedence

Variables can be defined in multiple places. The order of precedence determines which value is used if the same variable appears more than once.

<DocTable>
| Priority       | Source                                                                 |
|----------------|------------------------------------------------------------------------|
| 1 (highest)    | Workspace Template variables                                           |
| 2              | Workspace-level variables (Environment or OpenTofu/Terraform variables)|
| 3              | Variable Sets (in their assigned priority order)                       |
| 4 (lowest)     | HCL default values in your code                                        |
</DocTable>

**If a variable is defined in multiple places, Harness resolves conflicts using this order of precedence.**

---

## Environment variables
Environment variables provide runtime configuration for your infrastructure. These behave like standard shell variables and can be used by your provisioning logic, module behavior, or CLI tooling.

- **Key**: The name of the variable (e.g., `TF_LOG`, `ENVIRONMENT`).
- **Value**: You can set a static value, insert a pipeline variable (FQN), or use **`<+input>`** for runtime input.

### Add an environment variable
1. Click **+ New Environment Variable**.
2. Define the `Type` (usually `string`).
3. Provide a `Key` and a `Value`.

```yaml
# Example: Static and runtime-injected environment variables
environmentVariables:
  - key: TF_LOG
    value: INFO
    type: String
    source: CUSTOM
  - key: ENVIRONMENT
    value: <+input>
    type: String
    source: CUSTOM
```

---

## OpenTofu/Terraform variables
OpenTofu/Terraform variables (`variable {}` blocks in your code) must be declared by name and value. These are injected into Terraform runs and used in your `*.tf` files.

1. Click **+ Add Variable** under the **OpenTofu/Terraform Variables** section.
2. Define the `Key` to match your Terraform variable name.
3. Set the `Value`, or use **`<+input>`** for runtime prompts.

---

Each variable declared in your OpenTofu/Terraform code must be supplied with a value from one of the following input sources. If a variable is defined in multiple places, the order of precedence determines which value is used:

The following options are available in order of precedence, go to [Order of Precedence](#order-of-precedence) for the full list of variable options in order of precedence:

#### Option 1: Define default values in HCL
You can assign a default value directly in your OpenTofu/Terraform code. This acts as a fallback if no value is provided from the workspace or pipeline.

```hcl
# main.tf
variable "instance_type" {
  type    = string
  default = "t3.micro"
}
```

#### Option 2: Provide values in the Workspace
Configure variables in the OpenTofu/Terraform Variables section of your workspace. These values override any defaults in your code.

```yaml
# Workspace configuration
terraformVariables:
  - key: instance_type
    value: <+input> # or a static value like "t3.large"
    type: String
    source: CUSTOM
```

:::tip runtime input
Use `<+input>` to prompt users for values at runtime.
:::

---

## Variable files
Variable files allow you to inject multiple variables via `.tfvars`, `.json`, or `.yaml` files stored in Git.

### Add a variable file
1. Click **+ New Variable File**.
2. Select the **Connector** to access your Git repo.
3. Choose a repository, branch, and file path (e.g., `main`, `envs/dev.tfvars`).

:::note
Harness will retrieve and use this file during your pipeline execution. You can include multiple files if needed.
:::

```yaml
# Workspace variable file definition
variableFiles:
  - type: Git
    spec:
      connectorRef: account.git_connector
      repoName: terraform-configs
      branch: main
      paths:
        - envs/dev.tfvars
```

:::info variable file source
Your variable files and HCL can come from the same Git repository or different repositories.
:::

---

## Variable Sets
A Variable Set is a reusable collection of environment variables, OpenTofu/Terraform variables, and secrets. They allow you to standardize configuration across multiple workspaces.

Variable Sets are supported at the account, org, and project level:

- Navigate to **Account Settings** > **IaCM Settings** > **Variable Sets**.
- **Create:** Click **Create a new Variable Set**.
- **Update:** Click an existing Variable Set tile.
- **Delete:** Use the ellipsis menu on a Variable Set tile and select **Delete**.

When applied to a workspace, Variable Sets can be prioritized. Variables from a higher-priority set will override those from lower-priority sets.

### Referenced By Tab
When viewing a Variable Set, you can use the **Referenced By** tab to see all workspaces where the variable set is being used. This helps you identify the downstream impact when making changes to a variable set, ensuring you understand which workspaces might be affected by any modifications.

:::info Variable Set Priority
When multiple Variable Sets are applied to a workspace, you can control their priority to determine which values take precedence when conflicts occur:

1. In the Connectors and Variables tab of a workspace, you can view all attached Variable Sets.
2. Variable Sets can be reordered using drag-and-drop functionality to change their priority.
3. The system will clearly indicate when variables conflict between sets, showing which one takes precedence.
4. Priority order is: Priority 1 > Priority 2 > Priority 3, etc.
:::

When variables with the same name exist in multiple Variable Sets, the value from the highest priority set will be used. The interface will show which Variable Set is providing the value that will actually be used during execution.

---

## Input Sources and Runtime Behavior
Each variable shows its **source**, such as:

- `TEMPLATE`: inherited from the selected Template.
- `CUSTOM`: defined directly in the workspace.

You can use **`<+input>`** to prompt users to supply values at runtime.

---

## Next Steps
- [Provision your workspace](/docs/infra-as-code-management/workspaces/provision-workspace) using the configured inputs.
- [Add OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to enforce policy compliance.