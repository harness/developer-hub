---
title: Using Manual Harness Approval Stages
description: Approve or reject a Pipeline at any point in its execution using Manual Approval Stages.
# sidebar_position: 2
helpdocs_topic_id: fkvso46bok
helpdocs_category_id: 2d7y1cr09y
helpdocs_is_private: false
helpdocs_is_published: true
---

You can specify Harness User Group(s) to approve or reject a Pipeline at any point in its execution. During deployment, the User Group members use the Harness Manager to approve or reject the Pipeline deployment manually.

Approvals are added in between Stages to prevent the Pipeline execution from proceeding without an approval.

For example, in a [Build Pipeline](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md), you might want to add an approval stage between a Build Stage and an Integration Test Stage.

Other approval methods are:

* [Manual Harness Approval Steps in CD Stages](https://docs.harness.io/article/43pzzhrcbv-using-harness-approval-steps-in-cd-stages): add Approval steps to a stage for manual intervention.
* [Adding Jira Approval Stages and Steps](adding-jira-approval-stages.md): add Jira Approval stages and steps.

### Before you begin

* [Add a Stage](../8_Pipelines/add-a-stage.md)

### Visual Summary

Here's a Manual Approval Stage step during the execution of a Pipeline:

![](./static/adding-harness-approval-stages-15.png)
An approver can approve/reject the stage, stopping the Pipeline. The approver can also add comments and define variables for use by subsequent approvers and steps.

Here's a quick video that walks you through setting up and running the step:

Here's what a Manual Approval Stage and step looks like in YAML:

YAML Example
```
- stage:  
      name: Manual Stage  
      identifier: Manual_Stage  
      description: ""  
      type: Approval  
      spec:  
          execution:  
              steps:  
                  - step:  
                        name: Approval  
                        identifier: approval  
                        type: HarnessApproval  
                        timeout: 1d  
                        spec:  
                            approvalMessage: |-  
                                Please review the following information  
                                and approve the pipeline progression  
                            includePipelineExecutionHistory: true  
                            approvers:  
                                minimumCount: 1  
                                disallowPipelineExecutor: false  
                                userGroups:  
                                    - docs  
                            approverInputs:  
                                - name: myvar  
                                  defaultValue: myvalue  
      failureStrategies: []
```
### Step 1: Add Approval Stage

In a CD Pipeline, click **Add Stage**.

Click **Approval**.

Enter a name and then click **Harness Approval**. The **Harness Approval** stage appears, containing a new **Approval** step.

Click the **Approval** step.

### Step 2: Set Timeout

Set a default for the step timeout. Leave enough time for the Users in **Approvers** to see and respond to the waiting step.

The default timeout for an Approval step is **1d** (24 hours). You can use `**w**`  for week, `**d**`  for day, `**h**`  for hour, `**m**`  for minutes, `**s**`  for seconds and `**ms**` for milliseconds. For example, 1d for one day.

The maximum timeout duration is 24 days.The timeout countdown appears when the step in executed.

![](./static/adding-harness-approval-stages-16.png)
### Option: Add Message

In **Approval Message**, add the message for the Users in **Approvers**.

### Option: Include Pipeline Execution History in Approval Details

Enable this option to provide approvers with the execution history for this Pipeline. This can help approvers make their decision.

### Step 3: Select Approvers

In **Approvers**, in **User Groups**, select the Harness User Groups across Project/Org/Account scope, that will approve the step.

![](./static/adding-harness-approval-stages-17.png)
In **Number of approvers**, enter how many of the Users in the User Groups must approve the step.

### Option: Prevent Approval by Pipeline Executor

If you don't want the User that initiated the Pipeline execution to approve this step, select the **Disallow the executor from approving the pipeline** option.

### Option: Approver Inputs

You can enter variables and when the approver views the step they can provide new values for the variables.

If there are multiple approvers, the first approver sees the variables as you entered them in the step. If the first approver enters new values, the next approver sees the values the first approver entered.

A third approver will see all of the variables the first and second approver provided.

The variable values entered by the final approver populate the expressions created from the inputs.

For example, if there were three approvers and you added a Shell Script step that referenced the input variables with an expression, the expression would render the variable values entered by the final, third approver.

You can reference input variables using the `approverInputs` expression:

`<+pipeline.stages.[stage_name].spec.execution.steps.[step_name].output.approverInputs.[variable_name]>`

These variables can serve as inputs to later stages of the same Pipeline, where they support conditional execution or user overrides. 

For example, in a subsequent step's **Conditional Execution** settings, you could use an expression that only runs the step if the expression evaluates to 1.

`<+pipeline.stages.Shell_Script.spec.execution.steps.Harness_Approval_Step.output.approverInputs.foo> == 1`

### Option: Advanced Settings

See:

* [Step Skip Condition Settings](../8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../2_Delegates/delegate-guide/select-delegates-with-selectors.md)

### See also

* [Using Manual Harness Approval Steps in CD Stages](https://docs.harness.io/article/43pzzhrcbv-using-harness-approval-steps-in-cd-stages)
* [Update Jira Issues in CD Stages](https://docs.harness.io/article/urdkli9e74-update-jira-issues-in-cd-stages)

