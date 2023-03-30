---
title: Update Jira Issues in CD Stages
description: Update Jira issues in the execution of a Pipeline.
sidebar_position: 2
helpdocs_topic_id: urdkli9e74
helpdocs_category_id: qd6woyznd7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to update a Jira issue using the Update Jira step.

You can add the Update Jira step to a Harness CD stage or an Approval stage.

You can also [create Jira Issues](create-jira-issues-in-cd-stages.md) and add [Jira Approval stages and steps](../../../platform/9_Approvals/adding-jira-approval-stages.md).

## Before You Begin

* [Connect to Jira](../../../platform/7_Connectors/connect-to-jira.md)
* [Adding Jira Approval Stages and Steps](../../../platform/9_Approvals/adding-jira-approval-stages.md)

## Visual Summary

The following video shows you how to use the Jira Create, Jira Update, and Jira Approval steps:

## Limitations

* Harness supports only Jira fields of type `Option`, `Array`, `Any`, `Number`, `Date`, and `String`. Harness does not integrate with Jira fields that manage users, issue links, or attachments. This means that Jira fields like Assignee and Sprint are not accessible in Harness' Jira integration.

## Add a Jira Update step

1. In a Harness CD or approval stage, in **Execution**, select **Add Step**.
2. Select **Jira Update**. The Jira update step appears.

![](static/jira-update-step.png)

3. In **Name**, enter a name that describes the step.
4. In **Timeout**, enter how long you want Harness to try to update the issue before failing (and initiating the stage or step [Failure Strategy](../../../platform/8_Pipelines/define-a-failure-strategy-on-stages-and-steps.md)).
5. In **Jira Connector**, create or select the [Jira Connector](../../../platform/7_Connectors/connect-to-jira.md) to use.
6. In **Issue Key**, enter the Jira issue key of the issue you want to update.

### Use an expression in issue key

In **Issue Key**, you can use an expression to reference the key ID from another Jira create or Jira update step.

The Jira create or Jira update step you want to reference must be before the Jira update step that references it in the stage.

First, identify the step where you want to get the ID from. In this example, we'll use a Jira create step.

You'll have to close the Jira update step to get the the ID from the previous step. An ID is required, so you can just enter any number for now and select **Save**. In the pipeline, select **Execution History**.

Select a successful execution, and select the Jira create step in the execution.

Select the **Output** tab, locate the **Key** setting, and select the copy button.

![](static/update-jira-issues-in-cd-stages-15.png)

The expression will look something like this:

`<+pipeline.stages.Jira_Stage.spec.execution.steps.jiraCreate.issue.key>`

Now you have the expression that references the key ID from this step.

Go back to your Jira update step. You can select **Edit Pipeline**.

In **Issue Key**, select **Expression**.

![](static/use-expression-in-issue-key.png)

In **Issue Key**, paste the expression you copied from the previous Jira create step.

Now this Jira update step will update the issue created by the Jira create step.

Some users can forget that when you use a Jira create step it creates a new, independent Jira issue every time it is run. If you are using the same issue ID in Jira update, you are updating a new issue every run.

### Optional configuration

In **Optional Configuration**: 
* In **Status**, enter the status type (Issue Action) to update the issue with (In Progress, Done, etc). Harness will automatically update the issue with this status.
* In **Transition Name**, enter the name of the transition to move the issues into (for example, `Transition to`, `PR Testing`, `Ready for Test`).

![](static/status-and-transition.png)

If the issue is not part of a Jira workflow and does not have transition options, then the step will fail. For more information, go to [Statuses and transitions](https://support.atlassian.com/jira-cloud-administration/docs/work-with-issue-workflows/#Workingwithworkflows-steps) from Atlasssian.

### Add issue fields

You can select specific fields to update within a Jira issue. For more information, go to [Jira Custom Fields](../../../first-gen/continuous-delivery/model-cd-pipeline/workflows/jira-integration.md#jira-custom-fields).

In **Optional Configuration**, select **+ Fields** to add Jira fields.

![](static/add-jira-fields.png)

### Jira Date field support

Among the custom fields Harness supports are Baseline End Date and Start Date Time. If your Jira project uses these fields, they are available in Fields:

![](./static/update-jira-issues-in-cd-stages-19.png)

Once you have selected these fields their settings appear.

![](./static/update-jira-issues-in-cd-stages-20.png)

You can also use advanced dates using stage variables and the `current()` function. For example:

* `<+currentDate().plusDays(2).plusMonths(1)>`: current date plus one month and two days.
* `<+currentTime()>`: for current date time fields.

Harness supports the following functions.

For date-only fields:

 `currentDate().plusYears(1).plusMonths(1).plusWeeks(1).plusDays(1)`

For date and time fields:

`currentTime().plusYears(1).plusMonths(1).plusWeeks(1).plusDays(1).plusHours(1).plusMinutes(1).plusSeconds(1).plusNanos(1)`

The number 1 is used as an example. You can add whatever number you need.

### Update Issue Type field support

Harness supports updating the Jira Issue Type. 

1. Enter an **Issue Key** in the Jira update step. 
2. In the **Add Jira Fields** dialog, select **Issue Type**, then select **Add**. The **Issue Type** field appears under **Optional Configuration**.
   
   ![](static/modify-issue-type.png)
   
3. Select a new issue type to modify the Issue Type of the selected Jira issue, and select **Apply Changes**. 

  ![](static/update-issue-type.png)

The issue type for the selected Jira issue is now updated with the issue type you selected.

## Advanced settings

In **Advanced**, you can use the following options:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

## Apply and test

Click **Apply Changes**. The Jira update step is added to the stage.

Run the pipeline.

In the pipeline execution view, select the **Jira Update** step, and then select the **Output** tab.

You can see all of the fields for the new Jira issue you created.

Locate **URL** and copy its value.

![](./static/update-jira-issues-in-cd-stages-21.png)

In a new browser tab, paste the URL and press enter.

The updated issue appears in Jira.

## See Also

* [Create Jira Issues in CD Stages](create-jira-issues-in-cd-stages.md)
* [Adding Jira Approval Stages and Steps](../../../platform/9_Approvals/adding-jira-approval-stages.md)

