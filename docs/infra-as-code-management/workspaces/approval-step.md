---
title: Add 'Approval Plan' Step to Infrastructure stage
description: Learn how to use the Approval Step to review resource changes before applying them
sidebar_position: 40
---

It is likely that you'd like to see the result and impact of the Terraform plan before applying it against the resources. In order to do that, you can add an Approval step to you flow. 
The Approval step will present the following information:
1. The Resources that were added (including Terraform outputs)
2. The Resources that were deleted
3. The Resources that were changed
4. Cost estimation **[coming soon]**
5. OPA rules that were evaluated so far in the flow **[coming soon]**

Once you've reviewed the plan and are confident in the proposed changes, you can approve it. Approving the plan acknowledges that you understand the modifications that will be made to your infrastructure.

To use the 'Approval Plan' step, perform the following steps:
1. Go to the pipeline, where you have the Infrastructure stage that you would like to add the approval step to
2. Edit the stage and go to the "Execution" tab
3. Click on "add step" when hovering Between the "Plan" and "Apply" steps
4. From the "Step Library", select "IaCM Approval" and add it to the pipeline. 

![Resources](./static/add-approval-step.png)

Note that the 'Approval Plan' step has a time out of up to *60 minutes* (can be configured when editing the step). Upon time out, the pipeline will fail.

During pipeline execution, once the 'Approval Plan' pops up, you can see all the changes and decide whether to approve or reject the change. Approving will run the "Apply" command, while reject will fail the pipeline.
If you have the right access control, you are able to click on each resource and see which attributes have changed. 

![Resources](./static/approval-runtime.png)
