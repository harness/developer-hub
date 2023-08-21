---
title: Update Jira issues in CD stages
description: Update Jira issues in the execution of a pipeline.
sidebar_position: 2
---

This topic describes how to update a Jira issue using the Update Jira step.

You can add the Update Jira step to a Harness CD stage or an Approval stage.

You can also [update Jira issues](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages) and [add Jira approval stages and steps](/docs/platform/Approvals/adding-jira-approval-stages).

## Before you begin

* [Connect to Jira](/docs/platform/Connectors/Ticketing-Systems/connect-to-jira): You can add a Harness Jira connector before or during the Create Jira step setup.
* [Adding Jira approval stages and steps](/docs/platform/Approvals/adding-jira-approval-stages)

## Visual Summary

The following video shows you how to use the Jira Create, Jira Update, and Jira Approval steps:

## Limitations

* Harness supports only Jira fields of type `Option`, `Array`, `Any`, `Number`, `Date`, and `String`. Harness does not integrate with Jira fields that manage users, issue links, or attachments. This means that Jira fields like Assignee and Sprint are not accessible in Harness' Jira integration.

## Add a Jira Update step

1. In a Harness CD or Approval stage, in **Execution**, select **Add Step**.
2. Select **Jira Update**. The Jira Update step appears.

![](./static/update-jira-issues-in-cd-stages-14.png)

3. In **Name**, enter a name that describes the step.
4. In **Timeout**, enter how long you want Harness to try to update the issue before failing (and initiating the stage or step [failure strategy](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps)).
5. In **Jira Connector**, create or select the [Jira connector](/docs/platform/Connectors/Ticketing-Systems/connect-to-jira) to use.
6. In **Project**, select a Jira project from the list. A Jira project is used to create the issue key and ID when the issue is created. The unique issue number is created automatically by Jira.
7. In **Issue Type**, select a Jira issue type from the list of types in the Jira project you selected.

## Use an expression in Issue Key

In **Issue Key**, you can use an expression to reference the Key ID from another Jira Create or Jira Update step.

The Jira Create or Jira Update step you want to reference must be before the Jira Update step that references it in the stage.

First, identify the step where you want to get the ID from. In this example, we'll use a Jira Create step.

You'll have to close the Jira Update step to get the the ID from the previous step. An ID is required, so you can just enter any number for now and click **Save**. In the pipeline, select **Execution History**.

Select a successful execution, and click the Jira Create step in the execution.

Select the **Output** tab, locate the **Key** setting, and select the copy button.

![](./static/update-jira-issues-in-cd-stages-15.png)

The expression will look something like this:

`<+pipeline.stages.Jira_Stage.spec.execution.steps.jiraCreate.issue.key>`

Now you have the expression that references the key ID from this step.

Go back to your Jira Update step. You can just select **Edit Pipeline**.

In **Issue Key**, select **Expression**.

![](./static/update-jira-issues-in-cd-stages-16.png)

**Issue Key**, paste in the expression you copied from the previous Jira Create step.

Now this Jira Update step will update the issue created by the Jira Create step.

Some users can forget that when you use a Jira Create step it creates a new, independent Jira issue every time it is run. If you are using the same issue ID in Jira Update, you are updating a new issue every run.

### Optional configuration

In **Optional Configuration**: 
* In **Status**, enter the status type (Issue Action) to update the issue with (In Progress, Done, etc). Harness will automatically update the issue with this status.
* In **Transition Name**, enter the name of the transition to move the issues into (for example, `Transition to`, `PR Testing`, `Ready for Test`).

![](static/status-and-transition.png)

If the issue is not part of a Jira workflow and does not have transition options, then the step will fail. For more information, go to [statuses and transitions](https://support.atlassian.com/jira-cloud-administration/docs/work-with-issue-workflows/#Workingwithworkflows-steps) from Atlasssian.

### Add Issue fields

You can select specific fields to update within a Jira issue. For more information, go to [Jira custom fields](https://support.atlassian.com/jira-cloud-administration/docs/custom-fields-types-in-company-managed-projects/).

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

1. Enter an **Issue Key** in the Jira Update step. 
2. In the **Add Jira Fields** dialog, select **Issue Type**, then select **Add**. The **Issue Type** field appears under **Optional Configuration**.
   
   ![](static/modify-issue-type.png)
   
3. Select a new issue type to modify the Issue Type of the selected Jira issue, and select **Apply Changes**. 

  ![](static/update-issue-type.png)

The issue type for the selected Jira Issue is now updated with the issue type you selected.

## Advanced settings

In **Advanced**, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/Governance/Policy-as-code/harness-governance-overview)

## Apply and test

Select **Apply Changes**. The Jira Update step is added to the stage.

Run the pipeline.

In the pipeline execution view, select the **Jira Update** step, and then select the **Output** tab.

You can see all of the fields for the new Jira issue you created.

Locate **URL** and copy its value.

![](./static/update-jira-issues-in-cd-stages-21.png)

In a new browser tab, paste the URL and press enter.

The updated issue appears in Jira.


## Parent issue support

Harness supports parent links (the `issuelink` field in Jira). 

This support enables you to do the following:

* The Jira Create step can now be used to create issues with existing issues as their parent.
* The Jira Update step can be used to update the parent of a specific issue.
* A sub-task can be created using the Jira Create step.
* A ticket parent can be provided by simply typing the parent issue key in **Parent Link** setting, such as `TJI-47890`. 

To use parent links, do the following:

1. In the Jira Create or Update step, select **Optional Configuration**.
2. Select **Fields**. 
3. In **Add Jira Fields**, select **Parent Link**, and select **Add**.
   
   ![picture 0](static/8144e6b546672f2faa646b364fccf73a07d8617ca8e23797eb49b6f132f7c8cc.png)  

4. In **Parent Link**, add the parent issue key.
