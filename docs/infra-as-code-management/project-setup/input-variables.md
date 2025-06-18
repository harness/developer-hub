---
title: Configure Connectors and Variables
description: Learn how to configure connectors, environment variables, Tofu/Terraform variables, and variable files in your IaCM workspace.
sidebar_position: 10
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

**Connectors and Variables** allows you to define inputs and integrations required by your workspace before running Plan, Apply, or Drift detection pipelines. This includes connecting to cloud providers, injecting variable values, and referencing files from Git repositories.

---

## Connectors
A **connector** is required to authenticate with cloud providers or external systems. Most workspace operations, like fetching modules or variable files, depend on a connector.

:::tip add connectors
Connectors can be added via Account Settings or directly from your workspaces **Connectors and Variables** tab.
:::

### Add a Connector
From your workspace **Connectors and Variables** tab, click **+ Connector**, and select an existing connector from your account or project scope (e.g., `aws-oidc`).

Or, you can add a new connector by clicking **+ New Connector**.

---

## Environment Variables
Environment variables provide runtime configuration for your infrastructure. These behave like standard shell variables and can be used by your provisioning logic, module behavior, or CLI tooling.

- **Key**: The name of the variable (e.g., `TF_LOG`, `ENVIRONMENT`).
- **Value**: You can set a static value, insert a pipeline variable (FQN), or use `<+input>` for runtime input.

### Add an Environment Variable
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

## OpenTofu/Terraform Variables
OpenTofu/Terraform variables (`variable {}` blocks in your code) must be declared by name and value. These are injected into Terraform runs and used in your `*.tf` files.

1. Click **+ Add Variable** under the **OpenTofu/Terraform Variables** section.
2. Define the `Key` to match your Terraform variable name.
3. Set the `Value`, or use `<+input>` for runtime prompts.

---

There are two common ways to supply values to your declared variables:

### Option 1: Static or Runtime Input
This method is best when you want to prompt the user for input (e.g., during a demo), or apply a fixed value to all runs.

```hcl
# main.tf
variable "instance_type" {
  type    = string
  default = "t3.micro"
}
```

```yaml
# Workspace configuration
terraformVariables:
  - key: instance_type
    value: <+input>
    type: String
    source: CUSTOM
```

### Option 2: Inject from Pipeline Variable
If you’re using a reusable pipeline to trigger multiple workspaces, you can pass in values dynamically from pipeline-level variables.

```yaml
# Pipeline variable defined in your pipeline YAML
variables:
  - name: aws_region
    type: String
    value: us-west-2
```
```yaml
# Workspace configuration using pipeline FQN
terraformVariables:
  - key: region
    value: <+pipeline.variables.aws_region>
    type: String
```

:::tip
You can use [Harness pipeline variables](/docs/platform/variables-and-expressions/harness-variables/) by referencing their **Fully-Qualified Name (FQN)** in the value field.
:::




---

## Variable Files
Variable files allow you to inject multiple variables via `.tfvars`, `.json`, or `.yaml` files stored in Git.

### Add a Variable File
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

---

## Input Sources and Runtime Behavior
Each variable shows its **source**, such as:
- `TEMPLATE`: inherited from the selected Template.
- `CUSTOM`: defined directly in the workspace.

You can use `<+input>` to prompt users to supply values at runtime.

---

## Example Use Case
A demo or workshop environment may require different AWS regions and names for each execution. You can:

- Define these as `<+input>` to prompt per run.
- Inject pipeline variables for automation.
- Reference variable files in Git for version control.

---

## Next Steps
- [Provision your workspace](/docs/infra-as-code-management/workspaces/provision-workspace) using the configured inputs.
- [Add OPA Policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to enforce policy compliance.