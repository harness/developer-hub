---
title: Resume Pipeline Executions using API
description: You can use the resumeExecution API to resume Pipeline deployment executions that meet the following criteria --  Failed. Aborted. Expired. Rejected. You cannot resume Successful or Paused executions. T…
# sidebar_position: 2
helpdocs_topic_id: 612oq2dsqy
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the **resumeExecution** API to resume Pipeline deployment executions that meet the following criteria:

* Failed
* Aborted
* Expired
* Rejected

You cannot resume Successful or Paused executions.This is similar to resuming Pipeline executions in the Harness Manager. See [Resume Pipeline Deployments](/article/4dvyslwbun-resume-a-pipeline-deployment).

In this topic:

* [Before You Begin](#before_you_begin)
* [Supported Platforms and Technologies](#supported_platforms_and_technologies)
* [Limitations](#limitations)
* [Review: Permissions](#review_permissions)
* [Review: What Can Be Resumed](#review_what_can_be_resumed)
* [Step: Resume Pipeline](#step_resume_pipeline)
* [See Also](#see_also)

### Before You Begin

* [Use Pipelines API](/article/rfqmu6cejy-use-pipelines-api)
* [Pipelines](/article/zc1u96u6uj-pipeline-configuration)
* [Create Pipeline Templates](/article/60j7391eyy-templatize-pipelines)
* [Pipeline Skip Conditions](/article/6kefu7s7ne-skip-conditions)

### Supported Platforms and Technologies

See [Supported Platforms and Technologies](/article/220d0ojx5y-supported-platforms).

### Limitations

You can't modify any of the below mentioned settings:

* **You cannot change mandatory settings when you resume:** You cannot change **Start New Deployment** inputs, variables, and Artifacts that are passed when you started your deployment.
* You can resume a Pipeline that failed, expired, aborted, or was rejected.
* The Pipeline and the Workflows used in the Pipeline can't be changed.
* The templatization can't be changed.
* You cannot add any new stage or change any of the existing stages.

### Review: Permissions

To resume a Pipeline using resumeExecution, a Harness User must belong to a User Group that has the following Application Permissions:

* **Permission Type:** Deployments, **Action:** Execute Pipeline
* **Permission Type:** Deployments, **Action:** Execute Pipeline, **Application:** <Application>
* **Permission Type:** Deployments, **Action:** Execute Pipeline, **Environment:** <Environment Type>, **Application:** <Application>, but only to <Environment Type>

### Review: What Can Be Resumed

You can resume Pipeline executions that meet the following criteria:

* Failed
* Aborted
* Expired
* Rejected

You cannot resume Successful or Paused executions.This includes Pipelines with different configurations, such as:

* Pipelines with [runtime inputs](/article/zc1u96u6uj-pipeline-configuration).
* [Templated Pipelines](/article/60j7391eyy-templatize-pipelines).
* Pipelines with [Approval stages](/category/4edbfn50l8-approvals) (approved or rejected).
* Pipelines with parallel stage executions. In this case, both stages are resumed.
* Pipelines with [skip conditions](/article/6kefu7s7ne-skip-conditions).

### Step: Resume Pipeline

Here's an example of the resumeExecution API mutation:


```
mutation{  
  resumeExecution(input:{  
    applicationId:"LzcrN4VLTAW-dqZAtnsc_g"  
    pipelineExecutionId:"hUtAJdKOSxKWaTSkFlciyg"  
    pipelineStageName:"STAGE 3"  
  }){  
    execution{  
      status  
      id  
    }  
  }  
}
```
You simply need to provide the Application ID, Pipeline execution ID, and the name of the stage where you want to resume the execution.

To see the status of a Pipeline execution and see if it can be resumed:


```
{  
  execution(executionId: "<pipelineExecutionId>") {  
    id  
    ... on PipelineExecution {  
      status  
      pipelineStageExecutions {  
        pipelineStageElementId  
        pipelineStageName  
        pipelineStepName  
        ... on ApprovalStageExecution {  
          approvalStepType  
          status  
        }  
        ... on WorkflowStageExecution {  
          runtimeInputVariables {  
            allowedValues  
            defaultValue  
            allowMultipleValues  
            fixed  
            name  
            required  
            type  
          }  
          status  
          workflowExecutionId  
        }  
      }  
    }  
  }  
}
```
Note that `pipelineExecutionId` is the execution ID for a Pipeline's deployment. It is not the Pipeline ID.This will give you output with the stage names and statuses for the Pipeline, which you can use with `resumeExecution`:


```
{  
  "data": {  
    "execution": {  
      "id": "ddUCod0mT5ykAxOHjSvabg",  
      "status": "FAILED",  
      "pipelineStageExecutions": [  
        {  
          "pipelineStageElementId": "quPSKqBNQQ270Oao83d-hA",  
          "pipelineStageName": "STAGE 1",  
          "pipelineStepName": "Mongo",  
          "runtimeInputVariables": null,  
          "status": "FAILED",  
          "workflowExecutionId": "DQd-S3YER1S9cn7i6e68FQ"  
        },  
        {  
          "pipelineStageElementId": "Ohb83Po3Tz-zwslDp-QAMA",  
          "pipelineStageName": "STAGE 1",  
          "pipelineStepName": "Redis",  
          "runtimeInputVariables": null,  
          "status": "FAILED",  
          "workflowExecutionId": "FhdCOPbPTimmCyZJZhh4Tg"  
        },  
...
```
### See Also

* [Resume Pipeline Deployments](/article/4dvyslwbun-resume-a-pipeline-deployment)

