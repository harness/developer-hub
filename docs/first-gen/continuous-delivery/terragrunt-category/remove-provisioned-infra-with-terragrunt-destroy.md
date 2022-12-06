---
title: Remove Provisioned Infra with Terragrunt Destroy
description: You can add a Terragrunt Destroy Workflow step to remove any provisioned infrastructure, just like running the terragrunt run-all destroy command.
sidebar_position: 70 
helpdocs_topic_id: 1zmz2vtdo2
helpdocs_category_id: noj782z9is
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add a **Terragrunt** **Destroy** Workflow step to remove any provisioned infrastructure, just like running the `terragrunt run-all destroy` command. See [destroy](https://terragrunt.gruntwork.io/docs/features/execute-terraform-commands-on-multiple-modules-at-once/#the-run-all-command) from Terragrunt.

The Terragrunt **Destroy** step is independent of any other Terragrunt provisioning step in a Workflow. It is not restricted to removing the infrastructure deployed in its Workflow. It can remove any infrastructure you have provisioned using a Terragrunt Infrastructure Provisioner.


### Before You Begin

This topic assumes you have read the following:

* [Terragrunt Provisioning with Harness](../concepts-cd/deployment-types/terragrunt-provisioning-with-harness.md)
* [Set Up Your Harness Account for Terragrunt](set-up-your-harness-account-for-terragrunt.md)
* [Add Terragrunt Configuration Files](add-terragrunt-configuration-files.md)
* [Map Dynamically Provisioned Infrastructure using Terragrunt](map-terragrunt-infrastructure.md)
* [Provision using the Terragrunt Provision Step](provision-using-the-terragrunt-provision-step.md)
* [Perform a Terragrunt Dry Run](perform-a-terragrunt-dry-run.md)

### Review: What Gets Destroyed?

The `terragrunt run-all destroy` command removes all the Terraform modules you specify.

When you create a Harness Terragrunt Infrastructure Provisioner you specify the Terragrunt config file (.hcl). That file references Terraform modules that Harness will use for provisioning.

When you destroy the provisioned infrastructure, you specify the Terragrunt Infrastructure Provisioner for Harness to use to locate the Terragrunt file and Terraform module.

There are two ways to use the Terragrunt Destroy:

* Destroy the infrastructure provisioned by the last successful use of a specific Terragrunt Infrastructure Provisioner, via a **Terragrunt** **Provision** step. Harness will use the same input values and backend configuration (Remote state) set up in the Terragrunt Infrastructure Provisioner.
* Destroy the infrastructure by entering new input values and backend configuration (Remote state) for a specific Terragrunt Infrastructure Provisioner.

Which method you use is determined by the **Inherit configurations from previous Terragrunt Provision step** option in the Terragrunt Destroy step.

![](./static/remove-provisioned-infra-with-terragrunt-destroy-01\.png)

When the Terragrunt Provision step is executed, Harness saved the **Inline Values** and **Backend Configuration** values using a combination of the following:

* **Infrastructure Provisioner** used.
* **Environment** used for the Workflow.
* **Workspace** used (or `default` if no workspace was specified).

You can decide to use these by selecting the **Inherit configurations from previous Terragrunt Provision step** option or provide your own **Inline Values** and **Backend Configuration** values by not selecting this option.

#### Inherit configurations from previous Terragrunt Provision step

When you use the Terragrunt Destroy step, you specify the Provisioner and Workspace to use, and Harness gets the the **Inline Values** and **Backend Configuration** values from the last **successful** execution of that Provisioner.

When Terragrunt Destroy is run, it uses the same combination to identify which **Inline Values** and **Backend Configuration** values to use. You simply need to provide the Provisioner and Workspace.

#### Specify Backend Configuration (Remote State)

You can specify a Backend Configuration (Remote State) to use to identify the infrastructure to destroy.

You simply need to specify a Terragrunt Infrastructure Provisioner so that Harness knows where to look for the files.

In Terragrunt Destroy, you *disable* the **Inherit configurations from previous Terragrunt Provision step** option and then provide the input value and remote state settings to use.

### Step 1: Add Terragrunt Destroy Step

In the **Post-deployment Steps** of the Workflow, click **Add Step**, and then select **Terragrunt** **Destroy**.

The Terragrunt Destroy settings appear.

### Step 2: Select Provisioner and Workspace

Select the Terragrunt Infrastructure Provisioner and Workspace that was used to provision the infrastructure you want to destroy.

Typically, this is the Terragrunt Provisioner and Workspace used in the **Pre-deployment Steps**.

### Option: Select Delegate

In **Delegate Selector**, enter the Delegate Selector for the Delegate that you want to execute this step. Typically, this is the same Selector used to select a Delegate in the **Terragrunt** **Provision** step.

See [Select Delegates with Selectors](https://docs.harness.io/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors).

### Option: Inherit configurations from previous Terragrunt Provision Step

As described in [Review: What Gets Destroyed?](#review_what_gets_destroyed), select this option to destroy the infrastructure provisioned by the last successful **Terragrunt** **Provision** step in the Workflow.

If you select this option, then the **Input Values** and **Backend Configuration** settings are disabled.

### Option: Set as Terragrunt Destroy Plan and Export

Select this option to make this Terragrunt Destroy step a Terragrunt plan. This is useful when you want to use an Approval step to approve Terragrunt Destroy steps.

This is the same as running `terragrunt run-all destroy` in Terragrunt.

If you select this option, Harness generates a plan to destroy all the known resources.

Later, when you want to actually destroy the resources, you add another Terragrunt Destroy step and select the option **Inherit following configurations from Terragrunt Destroy Plan**.

The **Inherit following configurations from Terragrunt Destroy Plan** option only appears if the **Set as Terragrunt Destroy Plan and Export** option was set in the preceding Terragrunt Destroy step.

The Terragrunt Plan is stored in a Secrets Manager as an encrypted text.

See [Add a Secrets Manager](https://docs.harness.io/article/uuer539u3l-add-a-secrets-manager).

#### Terragrunt Plan Size Limit

The Terragrunt Plan is stored in the default Harness Secrets Manager as encrypted text. This is because plans often contain variables that store secrets.

The Terragrunt plan size must not exceed the secret size limit for secrets in your default Secret Manager. AWS Secrets Manager has a limitation of 64KB. Other supported Secrets Managers support larger file size.

See [Add a Secrets Manager](https://docs.harness.io/article/uuer539u3l-add-a-secrets-manager).

#### Terragrunt Destroy Plan Output Variable

If you select the **Set as Terragrunt Destroy Plan and Export** option, you can display the output of the plan using the variable expression `${terraformDestroy.tfplan}`.

For example, you can display the plan output in a [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) step.

The plan is associated with the Terraform script source of the Terragrunt config file in the Terragrunt Infrastructure Provisioner.

### Option: Inherit following configurations from Terragrunt Destroy Plan

Select this option to apply the previous Terragrunt Destroy step if that step has the **Set as Terragrunt Destroy Plan and Export** option enabled.

As noted above in [Option: Set as Terragrunt Destroy Plan and Export](#option_set_as_terragrunt_destroy_plan_and_export), the **Inherit following configurations from Terragrunt Destroy Plan** option only appears if the **Set as Terragrunt Destroy Plan and Export** option was set in the preceding Terragrunt Destroy step.

### Step 3: Input Values

Enter the input values to use when destroying the infrastructure.

The Terragrunt Infrastructure Provisioner you are using (the Terragrunt Infrastructure Provisioner you selected in the **Provisioner** setting earlier), identifies the Terraform script where the inputs are located.

See **Input Values** in [Provision using the Terragrunt Provision Step](provision-using-the-terragrunt-provision-step.md).

### Step 4: Backend Configuration

In **Backend Configuration (Remote state)**, enter values for each backend config (remote state variable) in the Terragrunt config.tf file or Terraform script.

See **Backend Configuration (Remote state)** in [Provision using the Terragrunt Provision Step](provision-using-the-terragrunt-provision-step.md).

### Option: Terragrunt Environment Variables

You can remove any Terragrunt environment variables you created using the Terragrunt Provision steps.

You cannot add new environment variables in the Terragrunt Destroy step.

If you select the **Inherit configurations from previous Terragrunt Provision Step** option, then the environment variables are also inherited from the environment variables set in any pervious Terragrunt provisioning step in the Workflow.

