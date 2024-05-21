---
title: Using manual Harness approval steps in CD stages
description: This topic describes how to enable Harness user group(s) to approve or reject a stage at any point in its execution.
sidebar_position: 1
---

This topic describes how to enable Harness user group(s) to approve or reject a stage at any point in its execution.

During deployment, the user group members use the Harness Manager to approve or reject the deployment manually.

Approvals are usually added in between stage steps to prevent the stage execution from proceeding without an approval.

For example, in a [Kubernetes blue green deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment), you might want to add an approval step between the stage deployment step, where the new app version is deployed to the staging environment, and the Swap Primary with Stage step, where production traffic is routed to the pods for the new version.

### Add an Approval step in a CD stage

1. In a CD stage, in **Execution**, select **Add Step**.
2. Select **Harness Approval**. The **Harness Approval** settings appear.
3. Follow the steps in [Harness Approval stages](/docs/platform/approvals/adding-harness-approval-stages) to add Approval steps for manual intervention.

### Video
   
   Here's a manual approval step during the execution of a pipeline:

   ![](./static/using-harness-approval-steps-in-cd-stages-00.png)

   An approver can approve or reject the step, stopping the pipeline. The approver can also add comments and define variables for use by subsequent approvers and steps.

   Here's a quick video that walks you through setting up and running the step:

   <!-- Video:
   https://www.youtube.com/watch?v=V-d6kaMBf-w-->
   <DocVideo src="https://www.youtube.com/watch?v=V-d6kaMBf-w" />

### Sample YAML

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
         isAutoRejectEnabled: false
   ```

## See also

- [Update Jira Issues in CD Stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages)
- [Using Harness Approval APIs](/kb/continuous-delivery/articles/harness-approval-api)
- [Add ServiceNow Approval steps and stages](/docs/platform/approvals/service-now-approvals)
