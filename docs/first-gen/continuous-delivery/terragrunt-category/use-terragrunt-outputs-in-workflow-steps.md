---
title: Use Terragrunt Outputs in Workflow Steps
description: Terragrunt outputs can be used in Workflow steps by using the expression ${terragrunt.output_name}.
sidebar_position: 80
helpdocs_topic_id: sd6hbtqcbv
helpdocs_category_id: noj782z9is
helpdocs_is_private: false
helpdocs_is_published: true
---

When you use a Terragrunt Provision step in a Workflow, any of the Terragrunt config source's Terraform script outputs can be used in Workflow settings that follow the step.

You reference an output with a Harness variable expression in the format `${terragrunt.output_name}`.

You can reference the output regardless of whether the Terragrunt Infrastructure Provisioner is used in the Infrastructure Definition in the Workflow settings.This topic demonstrates how to use these expressions in other Workflow steps.


### Before You Begin

This topic assumes you have read the following:

* [Terragrunt Provisioning with Harness](../concepts-cd/deployment-types/terragrunt-provisioning-with-harness.md)
* [Set Up Your Harness Account for Terragrunt](set-up-your-harness-account-for-terragrunt.md)
* [Add Terragrunt Configuration Files](add-terragrunt-configuration-files.md)
* [Map Dynamically Provisioned Infrastructure using Terragrunt](map-terragrunt-infrastructure.md)
* [Provision using the Terragrunt Provision Step](provision-using-the-terragrunt-provision-step.md)

Other useful topics:

* [Perform a Terragrunt Dry Run](perform-a-terragrunt-dry-run.md)
* [Remove Provisioned Infra with Terragrunt Destroy](remove-provisioned-infra-with-terragrunt-destroy.md)

### Limitations

You can only reference a Terraform output once the Terraform plan has been applied by the Terragrunt Provision step.

If a Terragrunt Provision step is set to run as a plan, you cannot reference its Terraform outputs.

Once the plan has been applied by another Terragrunt Provision step, you can reference the Terraform script outputs.

See [Perform a Terragrunt Dry Run](perform-a-terragrunt-dry-run.md).

### Step 1: Add a Workflow Step

This topic assumes you have a Workflow that uses a Terragrunt Provision step.

Add a Workflow step after the Terragrunt Provision step where you want to use the Terraform script outputs.

Typically, you add a [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) step.

### Step 2: Enter the Output Variable Expression

You can reference any Terraform output using the variable expression in the format `${terragrunt.output_name}`.

For example, let's say the Terraform script source of the Terragrunt config file in the Terragrunt Infrastructure Provisioner has a Kubernetes cluster name output.

You can add a Shell Script step in your Workflow and use `echo ${terragrunt.clusterName}` to print the value.

In the following diagram, you can see two outputs in the Terraform script referenced and echoed in a Shell Script step and then resolved in the logs:

![](./static/use-terragrunt-outputs-in-workflow-steps-00\.png)

The Shell Script step simply contains:


```
echo "Terragrunt outputs: "   
  
echo "clusterName: " ${terragrunt.clusterName}  
  
echo "sleepoutputModule3: " ${terragrunt.sleepoutputModule3}
```
### Notes

Terragrunt output expressions cannot be evaluated or published under the following conditions:

* The Shell Script step script uses `exit 0`. Bash exit prevents outputs from being published.
* No Terragrunt apply is performed by the Terragrunt Provision step. In some cases, a Terragrunt plan might be run using the [Set Terragrunt as Plan](perform-a-terragrunt-dry-run.md) option, but no further step performs the Terragrunt apply. If there is no Terragrunt apply, there are no output values.

