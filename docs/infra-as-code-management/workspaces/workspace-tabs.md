---
title: Workspace Settings
description: Learn about workspace settings and the information in your workspace tabs.
keywords:
  - workspace settings
  - workspace tabs
  - resources tab
  - variables and connectors
  - activity history
  - cli integration
tags:
  - iacm
  - workspaces
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FAQ } from '@site/src/components/AdaptiveAIContent';

Your workspace links your infrastructure code with the resources you provision. This document covers each tab within your workspace, so you can manage resources, configurations, and integrations effectively.

## Before you begin

- A created workspace. Go to [Create/clone a workspace](/docs/infra-as-code-management/workspaces/create-workspace) to create one.

:::tip New workspaces
If you are new to Harness IaCM, go to the [onboarding guide](/docs/infra-as-code-management/get-started/) to review IaCM concepts, supported frameworks like [OpenTofu](https://opentofu.org/), and how to prepare your workspace with connectors to code repositories and cloud providers, as well as running pipelines against it to provision and store your infrastructure state.
:::

## Workspace tabs
This document walks through each tab of a workspace, explaining its data, settings, and usage to help you configure and manage your workspace effectively.

### Resources
The Resources tab surfaces infrastructure state from OpenTofu/Terraform in a structured and readable format. It lists all managed resources, referenced data sources, and exposed outputs defined in your workspace configuration.

This tab includes three subtabs:
- **Resources:** Infrastructure components actively provisioned and managed by OpenTofu/Terraform.
- **Data Sources:** External values fetched at runtime (for example, existing VPCs, AMIs). These are now extracted from the state file for easier visibility.
- **Outputs:** Values exposed by your modules, typically used to pass data between pipeline stages or systems.

Use this tab to validate state, inspect dependencies, and troubleshoot issues, without digging through raw state files.

---

### Variables and connectors
The **Variables and Connectors** tab lets you define the inputs and integrations required to run your IaCM workspace pipelines. These settings apply to operations such as `init`, `plan`, `apply`, or drift detection.

#### Connectors
Connectors allow your workspace to authenticate with cloud providers, Git repositories, or other external systems. For example, a Git connector may be required to fetch variable files, or a cloud connector (like `aws-oidc`) may be needed for provisioning infrastructure.

You can add connectors at the **Account**, **Project**, or **Organization** level.

#### Variables
Variables are used to inject configuration values into your infrastructure code. You can define:

- **Environment variables** for shell-level runtime config (for example, `TF_LOG`, `ENVIRONMENT`)
- **OpenTofu/Terraform variables** that map to `variable {}` blocks in your `.tf` files
- **Variable files** (`.tfvars`, `.json`, or `.yaml`) stored in Git and referenced at runtime

These values can be statically defined, prompted at runtime with `<+input>`, or injected from pipeline variables.

:::info Configure connectors and variables
Go to [Configure Connectors and Variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) for setup instructions and YAML examples.

Variables can be set in any of the following ways:
- **Explicit variables:** State the exact value of the variable directly in your code.
- **Variable reference:** Set a variable value directly in the variables tab of your workspace and reference it with the `var.variable_reference` syntax in your OpenTofu/Terraform code.
- **Default values:** Setting default values acts as a fallback and prevents unexpected errors in cases where a referenced variable does not match any reference in your workspace variables, for example, it is misspelled or has been manually removed.
- **Consider sensitive information:** In some cases you may want to store a variable with sensitive information such as database passwords or other secrets. In these cases, you can label your OpenTofu/Terraform code as `sensitive = true`.
:::


<Tabs>
<TabItem value="Explicit variable">
```hcl
resource "aws_instance" "demo_ec2" {
  instance_type = "t2.micro"
}
```
</TabItem>
<TabItem value="Variable reference">
```hcl
resource "aws_instance" "demo_ec2" {
  instance_type = var.instance_type
}
```
</TabItem>
<TabItem value="Default values & sensitive information">
```hcl
resource "aws_instance" "demo_ec2" {
  instance_type = var.instance_type
  db_password = var.db_password
}
variable "db_password" {
    description = "Database password"
    type = string
    sensitive = true
  }
```
</TabItem>
</Tabs>

---

### Activity history
The Activity History tab logs actions performed within the workspace, such as 'plan' and 'apply' steps executed via pipelines.
- **Usage:** Use this tab to track the success or failure of specific actions, aiding in troubleshooting and auditing.

---

### State
The State tab provides access to your complete infrastructure state file, offering critical insights into your current configuration and dependencies of your resources.
- **Usage:** Use this tab to conduct audits and maintain consistency across your infrastructure setup, ensuring alignment with your desired state.
- **State versions:** The State tab lists previous versions of your state file. Every run that stores state adds a new version, and all historical versions are retained.
- **State rollback:** From the State tab, you can roll back to any previous state version. Harness restores the selected version as a new version without modifying your cloud infrastructure. Go to [Roll back workspace state](/docs/infra-as-code-management/workspaces/state-rollback) to restore a previous version.

Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) for detailed instructions on managing your infrastructure state.

---

### Configuration
Derived from the initial setup steps of your workspace, including cost estimation settings, and default pipelines.
- **Usage:** Provides a quick overview of your workspace's configuration, allowing for easy edits and updates.

#### Advanced options
Workspaces configuration advanced options offer the ability to configure additional settings for your workspace, including:
- **Submodules:** Use submodules from your repository's `modules/` folder. Go to [Submodule usage](/docs/infra-as-code-management/registry/module-registry/module-registry-overview#root%26submoduleusage) to configure them.
- **Sparse checkout:** Provide paths to directories to do a sparse checkout on given patterns to clone specific directories from the repository. Go to [Git sparse-checkout documentation](https://git-scm.com/docs/git-sparse-checkout#_internalscone_pattern_set) for the pattern syntax.

---

### CLI integration
This tab provides guidance on integrating the OpenTofu/Terraform CLI with Harness as a backend.
- **Usage:** It offers step-by-step instructions for setting up CLI integration, facilitating seamless management of your infrastructure code.

Go to [CLI Integration Guide](/docs/infra-as-code-management/workspaces/cli-integration) for step-by-step instructions on CLI integration.

---

## FAQs

<FAQ
  question="What happens when I roll back workspace state?"
  mode="docs"
  fallback="Harness restores the selected version as a new version without modifying your cloud infrastructure. Go to Roll back workspace state for the full procedure."
/>

<FAQ
  question="At what levels can I configure connectors for a workspace?"
  mode="docs"
  fallback="You can add connectors at the Account, Project, or Organization level."
/>