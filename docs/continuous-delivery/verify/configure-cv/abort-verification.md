---
title: Abort verification
description: Learn how to abort a running Verify step.
sidebar_position: 30
---

## Required permissions
- Pipelines: Execute

Users who have the required permissions can abort a running Verify step. The `Abort Verification` command becomes available only after verification has begun, and it includes the following options:
- Mark as success
- Mark as failure

The Abort Verification command stops verification and assigns the specified success or failure state to the Verify step. Harness then proceeds to the next step or stage in the pipeline.

If you select **Mark as failure**, any failure strategy that is configured for the step is applied. If the failure strategy is set to *Manual Intervention*, any user who has the required permissions to intervene may choose to mark the step as a success.

To abort verification, do the following:
- In Harness, go to **Deployments** > **Pipelines**, and then click the desired pipeline. 

- Make sure that you are on the **Pipeline Studio** tab.

- If the pipeline is running, skip to the next step. Else, select **Run**.

- Wait until the Verify step has begun (the step status changes from `Not Started` to `In Progress`).

- On the **Details** tab of the step's summary view, select **Abort Verification**, and then select one of the following options:

  - **Mark as Success**
  - **Mark as Failure**

  The **Abort Verification** command also appears in the console view.

- At the prompt, confirm that you want the step to be aborted. 

  Harness aborts the verification step.