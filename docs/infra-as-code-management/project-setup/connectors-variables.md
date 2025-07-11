---
title: Connectors and Variables
description: Learn how to configure connectors, environment variables, OpenTofu/Terraform variables, and variable files in your IaCM workspace.
sidebar_position: 10
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

**Connectors and Variables** define the full set of inputs and integrations your workspace uses when running Plan, Apply, or Drift detection pipelines. This combined configuration is known as a **variable set**, and it includes:
- Connectors for authenticating with cloud providers or Git
- Environment variables and OpenTofu/Terraform variables
- Variable files stored in version control

---

## Connectors
A **connector** is required to authenticate with cloud providers or external systems. Most workspace operations, like fetching modules or variable files, depend on a connector.

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
- Template-sourced connectors are marked with a **TEMPLATE** source label.
- Currently, these connectors **cannot be modified** in the workspace.

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

Order of precedence:
	1.	Pipeline-level variable (highest)
	2.	Workspace configuration
	3.	HCL default value in your code (lowest)

### Option 1: Define default values in HCL
You can assign a default value directly in your OpenTofu/Terraform code. This acts as a fallback if no value is provided from the workspace or pipeline.

```hcl
# main.tf
variable "instance_type" {
  type    = string
  default = "t3.micro"
}
```

### Option 2: Provide values in the Workspace
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

### Option 3: Override with Pipeline Variables
If your workspace is triggered by a reusable pipeline, you can pass in values from pipeline-level variables. These take precedence over workspace or HCL values.
<Tabs>
<TabItem value="pipeline" label="Pipeline Variables">
```yaml
# Pipeline YAML
variables:
  - name: aws_region
    type: String
    value: us-west-2
```
</TabItem>
<TabItem value="workspace-ref" label="Workspace Reference">
```yaml
# Workspace configuration using pipeline FQN
terraformVariables:
  - key: region
    value: <+pipeline.variables.aws_region>
    type: String
```
</TabItem>
</Tabs>

:::tip
You can use [Harness pipeline variables](/docs/platform/variables-and-expressions/harness-variables/) by referencing their **Fully-Qualified Name (FQN)** in the value field.
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

## Input Sources and Runtime Behavior
Each variable shows its **source**, such as:
- `TEMPLATE`: inherited from the selected Template.
- `CUSTOM`: defined directly in the workspace.

You can use **`<+input>`** to prompt users to supply values at runtime.

---

## Next Steps
- [Provision your workspace](/docs/infra-as-code-management/workspaces/provision-workspace) using the configured inputs.
- [Add OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to enforce policy compliance.