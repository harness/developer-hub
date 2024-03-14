---
title: Abort a pipeline, stage, or step
description: Abort pipeline, stage, or step execution
sidebar_position: 6
redirect_from:
  - /docs/platform/pipelines/abort-pipeline
---

This topic explains how to stop an in-progress pipeline, stage, or step. Take care when using this option as it can have additional impacts.

## Required permissions

To abort a pipeline, stage, or step, you need permission to abort pipelines. There are two primary ways you can configure this with [Harness RBAC](/docs/platform/role-based-access-control/rbac-in-harness.md):

* **Pipeline Execute** permission: By default, this permission grants you the ability to initiate and interact with pipeline executions, including running pipelines, aborting pipelines and pipeline components (stages and steps), retrying/rerunning pipelines, and so on.
* (Beta) **Abort** permission: To control the **Abort** permission separately from other pipeline execute functions, you can enable the Feature Flag `CDS_PIPELINE_ABORT_RBAC_PERMISSION` by contacting [Harness Support](mailto:support@harness.io).
   * Enabling this feature flag can take several days because it requires migrating your existing users to this permissions structure.
   * If the **Abort** permission isn't listed in your account's RBAC settings, then your account is using the default **Pipeline Execute** permission functionality to control all pipeline execution functions (run, abort, retry, and so on).

Permissions are contained in [roles](https://developer.harness.io/docs/platform/role-based-access-control/add-manage-roles), which can be narrowly scoped, such as the **Pipeline Executor** role, or broadly scoped, like the **Account Admin** role.

## Abort a pipeline

When you abort a pipeline:

* The pipeline finish executing the current task and then stops.
* The pipeline status becomes **Aborted**.
* Harness **does not** clean up resources that were created during pipeline execution, such as pods.

:::warning

Abort pipelines as a last resort. The abort action stops the pipeline execution and causes the pipeline to end execution in an aborted state. This prevents end-of-pipeline cleanup tasks from happening and can leave infrastructure in an unresolved state.

:::

To terminate a running pipeline, go to the pipeline's execution details, select **More Options** (&vellip;), and then select **Abort Pipeline**.

![](../static/1521187fad164055c77e9cbf28cf20ce38abb2a9f24d96b4a1d38b295402bfe2.png)

## Abort a stage

When you abort a stage:

* The stage finishes executing the current task and then stops. Then the pipeline stops, and the pipeline status becomes **Aborted**. Stages after the aborted stage do not run.
* Harness **does not** clean up resources that were created during stage execution, such as pods.

To terminate a running stage in a running pipeline, go to the pipeline's execution details, select the stage you want to terminate, and select the **Stop** icon next to the stage name.

![](../static/c30861565d02349af1a775fbeb5f673b1543f660d3e1905cf741686983a81a64.png)

:::tip

To clean up the workspace and revert back to the old state, [mark the stage as failed](/docs/platform/pipelines/failure-handling/mark-as-failed).

![](../static/f2b19d998705a16884766f9fcd39d73baabc1dc6ed9b61b7dac5d284c29602f2.png)

:::

## Abort a step

You can initiate an abort on the **Verify** step. For more information, go to [Abort verification](/docs/continuous-delivery/verify/configure-cv/abort-verification).
