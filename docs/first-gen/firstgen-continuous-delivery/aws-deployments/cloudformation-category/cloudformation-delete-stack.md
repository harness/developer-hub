---
title: Remove Provisioned Infra with CloudFormation Delete Stack
description: Add a CloudFormation Delete Stack Workflow step to remove any provisioned infrastructure.
# sidebar_position: 2
helpdocs_topic_id: i1agf0s6h4
helpdocs_category_id: hupik7gwhc
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/article/1fjmm4by22). Switch to [NextGen](/article/vynj4hxt98).You can add a CloudFormation Delete Stack Workflow step to remove any provisioned infrastructure, just like running the `cloudformation delete-stack` command. See [delete-stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/delete-stack.html) from AWS.

In this topic:

* [Before You Begin](#before_you_begin)
* [Review: What Gets Deleted?](#review_what_gets_deleted)
	+ [Delete Using Default Steps](#delete_using_default_steps)
	+ [Delete Using Stack Name](#delete_using_stack_name)
* [Step 1: Add CloudFormation Delete Stack](#step_1_add_cloud_formation_delete_stack)
* [Option 1: Delete Stack by Name](#option_1_delete_stack_by_name)
* [Option 2: Delete Stack Using Defaults](#option_2_delete_stack_using_defaults)

### Before You Begin

* [CloudFormation Provisioning with Harness](/article/qj0ems5hmg-cloud-formation-provisioning-with-harness)
* [Set Up Your Harness Account for CloudFormation](/article/308nblm0vc-cloud-formation-account-setup)
* [Add CloudFormation Templates](/article/wtper654tn-add-cloud-formation-templates)
* [Map CloudFormation Infrastructure](/article/4xtxj2f88b-map-cloud-formation-infrastructure)
* [Provision using CloudFormation Create Stack](/article/5wdb3r765g-provision-cloudformation-create-stack)
* [Using CloudFormation Outputs in Workflow Steps](/article/ez8bgluqg5-using-cloudformation-outputs-in-workflow-steps)

### Review: What Gets Deleted?

CloudFormation Delete Stack can delete any CloudFormation stack. You identify the stack you want deleted using its stack name or by using the default settings in the Workflow CloudFormation steps.

Let's look at a couple examples:

#### Delete Using Default Steps

When you provision infrastructure using CloudFormation, you add a **CloudFormation Create Stack** step in the **Workflow Pre-deployment Steps** section. If you do not enter a custom name for that stack, Harness names the stack using the `HarnessStack-` prefix and the ID of the Environment used.

If you want to delete that stack, add the **CloudFormation Delete Stack** step to the **Post-deployment Steps** of the same Workflow.

In **CloudFormation Delete Stack**, do not enter a custom name, and ensure you specify the same settings as the CloudFormation Create Stack step (Provisioner, AWS Cloud Provider, Region).

The **CloudFormation Delete Stack** step will delete the stack created by the **CloudFormation Create Stack** step.

#### Delete Using Stack Name

You can also use the **Use Custom Name** setting in the **CloudFormation Delete Stack** step to delete any stack by name.

This is the same as the [delete-stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/delete-stack.html) API command.

To see the list of stacks and their names, you can simply run:


```
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE
```
### Step 1: Add CloudFormation Delete Stack

1. In the **Post-deployment Steps** of the Workflow, click **Add Step**, and then select **CloudFormation Delete Stack**. The CloudFormation Delete Stack settings appear.

### Option 1: Delete Stack by Name

If you want to specify the name of a specific stack, do the following:

1. In **AWS Cloud Provider**, select the AWS Cloud Provider with credentials to delete stacks. Typically, this is the same AWS Cloud Provider you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.  
  
For details on permissions, see [Set Up Your Harness Account for CloudFormation](/article/308nblm0vc-cloud-formation-account-setup).
2. In **Region**, select the same region you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
3. Select **Use Custom Stack Name** and enter the name of the stack to delete in **Custom Stack Name**.
4. Click **Submit**.

### Option 2: Delete Stack Using Defaults

If you want to delete the exact same stack you provisioned using the **CloudFormation Create Stack** step in this Workflow, do the following:

1. In **Provisioner**, select the same CloudFormation Infrastructure Provisioner you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
2. In **AWS Cloud Provider**, select the same AWS Cloud Provider you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
3. In **Region**, select the same region you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
4. Click **Submit**.

