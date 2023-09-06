---
title: Add an approval plan step to an infrastructure stage
description: Learn how to use the approval step to review resource changes before applying them.
sidebar_position: 40
---

If you want to see the result and impact of the Terraform plan before applying it against the resources, you can add an approval step to your flow. 

The Approval step provides the following information:

*  The Resources that were added (including Terraform outputs).
*  The Resources that were deleted.
*  The Resources that were changed.
*  Cost estimation **[coming soon]**.
*  OPA rules that were evaluated so far in the flow **[coming soon]**.

Once you've reviewed the plan and are confident in the proposed changes, you can approve it. Approving the plan acknowledges that you understand the modifications that will be made to your infrastructure.

To use the approval plan step, perform the following steps:

1. Go to the pipeline where you want to add an approval step to the infrastructure stage.
2. Edit the stage, and then select the **Execution** tab.
3. Hover between the **Plan** and **Apply** steps, and then select **add step**.
4. From the **Step Library**, select **IaCM Approval** and add it to the pipeline. 

![Resources](./static/add-approval-step.png)

Note that the approval plan step has a timeout of up to *60 minutes*. You can configure this setting when you are editing the step). Upon timeout, the pipeline fails.

During pipeline execution, once the approval plan appears, you can see all the changes and decide whether to approve or reject the changes. Approving runs the **Apply** command. Rejecting causes the pipeline to fail.

If you have the right access control, you can select on each resource and see which attributes have changed. 

![Resources](./static/approval-runtime.png)
