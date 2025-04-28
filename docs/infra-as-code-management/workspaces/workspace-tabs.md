---
title: Workspace Settings
description: Learn about workspace settings and the information in your workspace tabs. 
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Your workspace serves as a centralized environment that seamlessly links your infrastructure code with the resources you provision. This document offers a comprehensive guide to each tab within your workspace, empowering you to efficiently manage resources, configurations, and integrations.

## Prerequisites
- A created workspace, go to [Create/clone a workspace](https://developer.harness.io/docs/infra-as-code-management/workspaces/create-workspace) to find out more.

:::tip new workspaces
If you are new to Harness IaCM, check out the [onboarding guide](/docs/infra-as-code-management/get-started/) to learn more about IaCM, supported frameworks like [OpenTofu](https://opentofu.org/), and how to prepare your workspace with connectors to code repositories and cloud providers, as well as running pipelines against it to provision and store your infrastructure state. 
:::

## Workspace tabs
This document walks through each tab of a workspace, explaining its data, settings, and usage to help you configure and manage your workspace effectively.

### Resources
The Resources tab compiles information from the infrastructure code associated with your workspace. It lists all provisioned resources, such as servers and databases.
- **Usage:** This tab helps you monitor and manage the resources provisioned by your pipelines, providing insights into the current state and configuration of each resource.
---
### Variables
The Variables tab is populated from the variables defined within your infrastructure code, commonly in your `variables.tf` file.

:::info
Variables can be set in any of the following ways:
- **Explicit variables:** You can state that exact value of the variable directly in your code.
- **Variable reference:** You can set a variable value directly in the variables tab of your workspace and reference it with the `var.variable_reference` syntax in your OpenTofu/Terraform code. 
- **Default values** Setting default values acts as a fallback and prevents unexpected errors in cases where you referenced a variable that doesn't match any reference in your workspace variables, e.g. it is misspelled or has been manually removed.
- **Consider sensitive information:** In some cases you may want to store a variable with sensitive information such as database passwords or other secret. In these cases, you can label your OpenTofu/Terraform code as `sensitive = true`
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

### Activity History
The Activity History tab logs actions performed within the workspace, such as 'plan' and 'apply' steps executed via pipelines.
- **Usage:** Use this tab to track the success or failure of specific actions, aiding in troubleshooting and auditing.
---
### State
The State tab provides access to your complete infrastructure state file, offering critical insights into your current configuration and dependencies of your resources.
- **Usage:** Utilize this tab to conduct audits and maintain consistency across your infrastructure setup, ensuring alignment with your desired state.

For detailed instructions on managing your infrastructure state, visit [Provision workspace](https://developer.harness.io/docs/infra-as-code-management/workspaces/provision-workspace).

---
### Configuration
Derived from the initial setup steps of your workspace, including cost estimation settings, selected connectors, and default pipelines.
- **Usage:** Provides a quick overview of your workspace's configuration, allowing for easy edits and updates.

#### Advanced options
Workspaces configuration advanced options offer the ability to configure additional settings for your workspace, including:
- **Submodules:** Use submodules from your repository's `modules/` folder. 
  Go to [Submodule Usage](/docs/infra-as-code-management/iacm-features/module-registry/root-sub-module-usage) for more information.
- **Sparse checkout:** Provide paths to directories to do a sparse checkout on given patterns to clone specific directories from the repository.  
  Refer to [git documentation](https://git-scm.com/docs/git-sparse-checkout#_internalscone_pattern_set) for more details.
---
### CLI Integration
This tab provides guidance on integrating the OpenTofu/Terraform CLI with Harness as a backend.
- **Usage:** It offers step-by-step instructions for setting up CLI integration, facilitating seamless management of your infrastructure code.

For step-by-step instructions on CLI integration, check out [CLI Integration Guide](https://developer.harness.io/docs/infra-as-code-management/workspaces/cli-integration).