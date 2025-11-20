---
title: State Migration
description: Learn how to migrate and import infrastructure state in Harness IaCM workspaces.
sidebar_position: 20
---

When using Harness Infrastructure as Code Management (IaCM), one of its benefits is automatic state storage for your <Tooltip id="iacm.workspace">workspace</Tooltip>. Your state will automatically be used when no backend code block is configured in your OpenTofu/Terraform code. Additionally, you can leverage the Harness-stored state locally or in other workflows by using an HTTP backend block configured based on your workspace location and identifier.

If you currently use a 3rd party state storage you can [continue to use this as configured](/docs/infra-as-code-management/remote-backends/use-backends) with Harness IaCM, but if you wish to migrate your state to Harness you can do so via one of the methods described below.

## Local CLI
Configure your OpenTofu codebase locally with authentication set for your existing backend configuration to manually migrate your state files to Harness IaCM. Validate this by running `tofu init` and validating it completes successfully.

Migrate your state files to Harness IaCM by configuring your OpenTofu/Terraform codebase locally as follows:
- Set authentication for your existing backend configuration (Link to auth options or include in code snippet example)

:::info example backend block

You will now need to make sure you have a workspace defined in Harness for the current Tofu project. If one has not been created, [do so now](/docs/infra-as-code-management/workspaces/create-workspace). When viewing the created workspace, navigate to the `CLI Integration` tab where you can view the HTTP backend block for leveraging the workspace state locally. Copy this backend block into your Tofu code and remove the existing backend.

![Workspace Local Backend Config](./static/workspace-cli-integration.png)

To authenticate to the IaCM backend you will need to set `TF_HTTP_PASSWORD` to a Harness API key with `State:Access` permissions on the workspace we are migrating to. 

With the new backend configured, the old removed, and authentication set, you should be able to execute `tofu ini -migrate-state` which will execute automatic migration of your state from your existing backend to IaCM.

You can validate the state in Harness has been populated by viewing the `State` tab in the workspace ui.

At this point you should be able to completely remove the backend block from your codebase to prepare the code for execution in IaCM. You can also keep the IaCM HTTP backend block in a local file that is in your `.gitignore` file so you can use the IaCM state locally going forward.

### Terraform Cloud

For Terraform Cloud to Harness IaCM, migrate your state using the local CLI with the following steps:
- Pull your existing state to a local file
- Re-initialize your local environment to use your local file
- Migrate to Harness IaCM using the `init` command

Go to [plugin commands](/docs/infra-as-code-management/cli-commands/terraform-plugins) for more information about supported OpenTofu and Terraform commands.

:::info tofu automatic migration
OpenTofu does not currently support automatic migration with the `tofu-init -migration-state` command
:::

Start by defining (if not existing already) the backend block for your local environment to use the existing Terraform Cloud state. Once configured and initialized, pull the state locally by executing `tofu state pull > terraform.tfstate`. 

You can now remove your Terraform Cloud backend block, and the local terraform configuration `rm -rf .terraform`. If you re-initialize the project the configuration should see the local state file and use it going forward. You can confirm this by running a `tofu plan` and checking the results.

If we now add the Harness backend block from the Workspace `Local CLI` tab, set authentication in your environment, we should be able to run the `tofu ini -migrate-state` command and your state will be pushed from the local file to Harness storage. 

### Harness Pipeline

Another strategy for migrating state to Harness storage is to run a successful `tofu apply` in an IaCM pipeline, which takes a snapshot of your state into Harness (to enable the resources and state tab in the workspace) and then removing the existing backend block.

To do this we must [configure our workspace](/docs/infra-as-code-management/workspaces/create-workspace) with all necessary configuration to do an Apply while also authenticating to the existing backend. You will need to execute a successful Apply in an IaCM stage. After the Apply you can validate the state has been copied to Harness by viewing the `State` tab in the target workspace. 

Once you have validated the state exists in Harness, you can remove the existing backend block from the Tofu code. The next time the Tofu is executed by IaCM, Harness will see that no backend has been configured and automatically load the Harness-stored state.
