---
title: Using CloudFormation Outputs in Workflow Steps
description: Use CloudFormation output expressions in other Workflow steps.
# sidebar_position: 2
helpdocs_topic_id: ez8bgluqg5
helpdocs_category_id: hupik7gwhc
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/vynj4hxt98).The CloudFormation output variables you use to map CloudFormation template outputs in an Infrastructure Definition can also be output in other Workflow commands.

For example, if you use `${cloudformation.Region}` to map a region output to the AWS region in an Infrastructure Definition, you can add a Shell Script step in your Workflow and use `echo ${cloudformation.Region}` to print the value.

In this topic:

* [Before You Begin](using-cloudformation-outputs-in-workflow-steps.md#before-you-begin)
* [Visual Summary](#visual_summary)
* [Step 1: Add A Workflow Step](#step_1_add_a_workflow_step)
* [Step 2: Enter the Output Variable Expression](#step_2_enter_the_output_variable_expression)

### Before You Begin

* [CloudFormation Provisioning with Harness](../../concepts-cd/deployment-types/cloud-formation-provisioning-with-harness.md)
* [Set Up Your Harness Account for CloudFormation](cloud-formation-account-setup.md)
* [Add CloudFormation Templates](add-cloud-formation-templates.md)
* [Map CloudFormation Infrastructure](map-cloud-formation-infrastructure.md)
* [Provision using CloudFormation Create Stack](provision-cloudformation-create-stack.md)

### Visual Summary

When you use a Harness CloudFormation Infrastructure Provisioner to map template outputs to Infrastructure Definition settings, you create variable expressions and use them as parameters.

In the following example, we show:

* Required outputs.
* The outputs used for the optional Target Group and Application Load Balancer.
* The stage Target Group and Application Load Balancer used for Blue/Green deployments.

![](./static/using-cloudformation-outputs-in-workflow-steps-04.png)

As you can see, you map the CloudFormation template outputs using this syntax, where `exact_name` is the name of the output:


```
${cloudformation.*exact\_name*}
```
Once these variable expressions are defined as Infrastructure Definition parameters, and used by the CloudFormation Create Stack step in a Workflow, they can be used elsewhere in the Workflow.

### Step 1: Add A Workflow Step

This topic assumes you have a Workflow that uses an Infrastructure Definition that is dynamically mapped to a Harness CloudFormation Infrastructure Provisioner, and a CloudFormation Create Stack step in the Workflow that provisions that infrastructure.

For details, see [Map CloudFormation Infrastructure](map-cloud-formation-infrastructure.md).

Add a Workflow step where you want to use the CloudFormation template output value. Typically, this is a [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) step.

### Step 2: Enter the Output Variable Expression

You can use any variable expression that is already used in the Infrastructure Definition in the Workflow settings.

For Canary Workflows, the Infrastructure Definition is added in the Phase settings. Therefore, you can only use the output variable expression within the Phase.

For example, let's say you use `${cloudformation.AutoScalingGroup}` to map an ASG output to the ASG in an Infrastructure Definition. You can add a Shell Script step in your Workflow and use `echo ${cloudformation.AutoScalingGroup}` to print the value.

