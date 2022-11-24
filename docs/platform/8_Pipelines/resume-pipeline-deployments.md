---
title: Retry Failed Executions from any Stage
description: Describes how to resume Pipeline deployments that fail during execution.
# sidebar_position: 2
helpdocs_topic_id: z5n5llv35m
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

Pipeline execution might fail for many reasons, such as infrastructure changes or changes to resource access. In such cases, rerunning an entire Pipeline can be costly and time-consuming. 

Harness provides an option to resume Pipeline executions from any executed Stage or from the failed Stage. These options enable you to quickly rerun stages after you identify the cause of the failure. 

Retrying a Pipeline or Stage is different from rerunning a Pipeline or Stage. When you rerun, you can select new values for Runtime Inputs. When you retry a Pipeline or Stage, you are running the Pipeline or Stage exactly as it was run before. See [Run Specific Stages in Pipeline](/article/95q2sp1hpr-run-specific-stage-in-pipeline).Harness provides an option to resume Pipeline executions from any previously executed Stage or from the failed Stage.

### Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)
* [Create Organizations and Projects](/article/36fw2u92i4-create-an-organization)
* [Add a Stage](/article/2chyf1acil-add-a-stage#add-a-stage)
* Make sure you have **Execute** permissions for Pipeline to run a specific Stage of the Pipeline. For example, the [Pipeline Executor](/article/yaornnqh0z-permissions-reference) default role in the Project where your Pipeline is located.

### Limitations

* You can retry Pipelines when they are in **Failed**, **Aborted**, **Expired,** or **Rejected** status.
* You cannot retry a Stage's execution if it was run successfully. You need to rerun the Pipeline and select Stage. This will be a new run of the Stage. To rerun a successful Stage in a Pipeline, click **Rerun** in the execution. For more information, see [Rerun Stage](/article/95q2sp1hpr-run-specific-stage-in-pipeline#rerun_stage).
* You cannot change mandatory settings, parameters, or conditions when you retry.

### Review: Serial and Parallel Stages

Stages can be added to Pipelines serially and in parallel. Here is an example that shows both:

![](https://files.helpdocs.io/i5nl071jo5/articles/z5n5llv35m/1638424479637/screenshot-2021-12-01-at-6-17-20-pm.png)How you run and retry Stages is different depending on whether you are retrying a serial or a parallel Stage.

### Option: Retry Serial Stages

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](https://ngdocs.harness.io/article/36fw2u92i4-create-an-organization).

You can [create a Pipeline](/article/2chyf1acil-add-a-stage#step_1_create_a_pipeline) from CI and CD module in your Project, and then [add Stages](/article/2chyf1acil-add-a-stage#add-a-stage) for any module.

Click on the failed deployment that you want to retry and click **Retry** **Failed Pipeline**.

![](https://files.helpdocs.io/i5nl071jo5/articles/z5n5llv35m/1637154875593/screenshot-2021-11-17-at-5-08-59-pm.png)The Retry Pipeline settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/z5n5llv35m/1638364753170/screenshot-2021-12-01-at-6-48-21-pm.png)Choose the failed Stage or any previous Stage to retry the Pipeline. The [Runtime Inputs](/article/f6yobn7iq0-runtime-inputs) for the selected and later stages are automatically filled from the previous execution. You can modify these Runtime Inputs while retrying the Pipeline.

### Option: Retry Parallel Stages

When there are parallel Stages in your Pipeline and one of the parallel Stages fails, you can execute the failed Stage or all the parallel Stages.

Let's take an example of a Pipeline that has parallel Stages.

![](https://files.helpdocs.io/i5nl071jo5/articles/z5n5llv35m/1638363171286/screenshot-2021-12-01-at-6-17-20-pm.png)If Stage stage1 fails, you can either execute all the parallel Stages or only the failed Stage.

![](https://files.helpdocs.io/i5nl071jo5/articles/z5n5llv35m/1638363869808/screenshot-2021-12-01-at-5-58-16-pm.png)All the previous values are populated for the stages. You can keep them or modify them as needed.

You cannot retry any execution that is more than 30 days old.### See Also

* [Run Pipelines using Input Sets and Overlays](/article/gfk52g74xt-run-pipelines-using-input-sets-and-overlays)
* [Run Specific Stages in Pipeline](/article/95q2sp1hpr-run-specific-stage-in-pipeline)

