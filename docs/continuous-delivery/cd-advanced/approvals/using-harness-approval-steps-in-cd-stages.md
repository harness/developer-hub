---
title: Using Manual Harness Approval Steps in CD Stages
description: This topic describes how to enable Harness User Group(s) to approve or reject a stage at any point in its execution.
sidebar_position: 1
helpdocs_topic_id: 43pzzhrcbv
helpdocs_category_id: bz4zh3b75p
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to enable Harness User Group(s) to approve or reject a stage at any point in its execution.

During deployment, the User Group members use the Harness Manager to approve or reject the deployment manually.

Approvals are usually added in between stage steps to prevent the stage execution from proceeding without an approval.

For example, in a [Kubernetes Blue Green Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md), you might want to add an approval step between the Stage Deployment step, where the new app version is deployed to the staging environment, and the Swap Primary with Stage step, where production traffic is routed to the pods for the new version.

Other approval methods are:

* [Harness Approval Stages](../../../platform/9_Approvals/adding-harness-approval-stages.md): add Approval stages for manual intervention.
* [Adding Jira Approval Stages and Steps](../../../platform/9_Approvals/adding-jira-approval-stages.md): add Jira Approval stages and steps.
* [Adding ServiceNow Approval Steps and Stages](../../../platform/9_Approvals/service-now-approvals.md) for ServiceNow Approval stages and steps.

## Before You Begin

* [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)

## Visual Summary

Here's a manual approval step during the execution of a Pipeline:

![](./static/using-harness-approval-steps-in-cd-stages-00.png)

An approver can approve/reject the step, stopping the Pipeline. The approver can also add comments and define variables for use by subsequent approvers and steps.

Here's a quick video that walks you through setting up and running the step:

<!-- Video:
https://www.youtube.com/watch?v=V-d6kaMBf-w-->
<docvideo src="https://www.youtube.com/watch?v=V-d6kaMBf-w" />


Here's what a manual approval step looks like in YAML:

```yaml
- step:  
      type: HarnessApproval  
      name: Harness Approval Step  
      identifier: Harness_Approval_Step  
      timeout: 1d  
      spec:  
          approvalMessage: Test  
          includePipelineExecutionHistory: true  
          approvers:  
              userGroups:  
                  - docs  
              minimumCount: 1  
              disallowPipelineExecutor: false  
          approverInputs:  
              - name: foo  
                defaultValue: bar
```
## Step 1: Add Approval Step

1. In a CD stage, in **Execution**, click **Add Step**.
2. Click **Harness Approval**. The **Harness Approval** settings appear.

## Step 2: Set Timeout

Set a default for the step timeout. Leave enough time for the Users in **Approvers** to see and respond to the waiting step.

The default timeout for an Approval step is **1d** (24 hours). 

You can use: 

- `w`  for week
- `d`  for day
- `h`  for hour
- `m`  for minutes
- `s`  for seconds
- `ms` for milliseconds

For example, 1d for one day.

The maximum timeout duration is 24 days.The timeout countdown appears when the step in executed.

![](./static/using-harness-approval-steps-in-cd-stages-01.png)

## Option: Add Message

1. In **Approval Message**, add the message for the Users in **Approvers**.

* **Include Pipeline execution history in approval details:** enable this option to show approvers the Pipeline's execution history. This can help an approver compare the current execution info with historical data.

## Step 3: Select Approvers

1. In **User Groups**, select the Harness User Groups that will approve the step. See [Add and Manage User Groups](../../../platform/4_Role-Based-Access-Control/4-add-user-groups.md).
2. In **Number of approvers that are required at this step**, enter how many of the Users in the User Groups must approve the step.

## Option: Prevent Approval by Pipeline Executor

If you don't want the User that initiated the Pipeline execution to approve this step, select the **Disallow the executor from approving the pipeline** option.

Even if the User is in the User Group selected in **User Group**, they won't be able to approve this step.

## Option: Approver Inputs

In **Inputs to be provided by approver**, you can enter variables and when the approver views the step, they can provide new values for the variables.

If there are multiple approvers, the first approver sees the variables as you entered them in the step. If the first approver enters new values, the next approver sees the values the first approver entered.

A third approver will see all of the variables the first and second approver provided.

The variable values entered by the final approver populate the expressions created from the inputs.

For example, if there were three approvers and you added a Shell Script step that referenced the input variables with an expression, the expression would render the variable values entered by the final, third approver.

You can reference input variables using the `approverInputs` expression:

`<+pipeline.stages.[stage_name].spec.execution.steps.[step_name].output.approverInputs.[variable_name]>`

These variables can serve as inputs to later stages of the same Pipeline, where they support conditional execution or user overrides. 

For example, in a subsequent step's **Conditional Execution** settings, you could use an expression that only runs the step if the expression evaluates to 1.

`<+pipeline.stages.Shell_Script.spec.execution.steps.Harness_Approval_Step.output.approverInputs.foo> == 1`

## Option: Advanced Settings

See:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../../../platform/2_Delegates/delegate-guide/select-delegates-with-selectors.md)

## See Also

* [Update Jira Issues in CD Stages](../ticketing-systems-category/update-jira-issues-in-cd-stages.md)

