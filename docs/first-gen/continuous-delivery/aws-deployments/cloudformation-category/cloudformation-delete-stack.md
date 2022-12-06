---
title: Remove Provisioned Infra with CloudFormation Delete Stack
description: Add a CloudFormation Delete Stack Workflow step to remove any provisioned infrastructure.
# sidebar_position: 2
helpdocs_topic_id: i1agf0s6h4
helpdocs_category_id: hupik7gwhc
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/vynj4hxt98).You can add a CloudFormation Delete Stack Workflow step to remove any provisioned infrastructure, just like running the `cloudformation delete-stack` command. See [delete-stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/delete-stack.html) from AWS.


### Before You Begin

* [CloudFormation Provisioning with Harness](../../concepts-cd/deployment-types/cloud-formation-provisioning-with-harness.md)
* [Set Up Your Harness Account for CloudFormation](cloud-formation-account-setup.md)
* [Add CloudFormation Templates](add-cloud-formation-templates.md)
* [Map CloudFormation Infrastructure](map-cloud-formation-infrastructure.md)
* [Provision using CloudFormation Create Stack](provision-cloudformation-create-stack.md)
* [Using CloudFormation Outputs in Workflow Steps](using-cloudformation-outputs-in-workflow-steps.md)

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
   For details on permissions, see [Set Up Your Harness Account for CloudFormation](cloud-formation-account-setup.md).
2. In **Region**, select the same region you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
3. Select **Use Custom Stack Name** and enter the name of the stack to delete in **Custom Stack Name**.
4. Click **Submit**.

### Option 2: Delete Stack Using Defaults

If you want to delete the exact same stack you provisioned using the **CloudFormation Create Stack** step in this Workflow, do the following:

1. In **Provisioner**, select the same CloudFormation Infrastructure Provisioner you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
2. In **AWS Cloud Provider**, select the same AWS Cloud Provider you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
3. In **Region**, select the same region you selected in the **CloudFormation Create Stack** step that created the stack you want to delete.
4. Click **Submit**.

