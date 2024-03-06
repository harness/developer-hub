---
title: Pipeline FAQs
description: Frequently asked questions about pipelines.
sidebar_position: 4
redirect_from:
  - /docs/platform/pipelines/w_pipeline-steps-reference/pipeline-faq
---

#### Q: How can I get the status of Harness pipeline during the run itself?
A: You can use any status value in a JEXL condition. For example, `<+pipeline.stages.cond.spec.execution.steps.echo.status> == "FAILED"`.
The expression `<+execution.steps.[step Id].status>` resolves to the status of a step. For example, `<+execution.steps.mystep.status>`.

#### Q: Is there a trigger with condition type On pipeline completion, so that once one pipeline completes it triggers another pipeline?
A: We do not have a trigger, but, we do have a Pipeline Chaining stage that lets you start a pipeline based on a pipeline completion.

### In pipeline chaining, is it possible to reference a child's variables in the parent pipeline without using outputs?

We can refer to child execution expression in parent pipeline only via outputs using the following expression `<+pipeline.stages.child.pipeline.stages.b_stage.spec.artifacts.primary.tag>`.



#### Q: Is there a limit to the number of pipelines a project can have?
A: No, there is no limit to how many pipelines can be created in a project.

#### Q: What is the character limit on pipeline names?
A: The character limit is 128 characters.

### Is there a limit to the number of pipelines a project can have? What is the character limit on pipeline names?

Harness allows an unlimited number of pipelines, but the pipeline name cannot exceed 128 characters.



#### Q: How can I specify my pipeline to pick the right delegate for my environment?
A: In the pipeline's Advanced Settings, you can pass in a delegate selector as a fixed, runtime input, or expression to ensure the correct delegate is leveraged for the pipeline. 

### How can I specify my pipeline to select a delegate based on a tag?

In the advanced tab of your pipeline, you can add specific tags in the [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#delegate-tags) field.


#### Q: How long are Harness deployment logs visible in the UI?
A: The default retention is set per account and its value is 6 months.

#### Q: When a pipeline is deleted, are all the logs that the pipeline produced (delegate, audit, deploy) deleted as well?
A: When a pipeline is deleted, the audit details are retained. The execution logs are deleted.

#### Q: Does the Console Log have a limit on the number of lines shown?
A: Harness deployment logging has the following limitations: A hard limit of 25MB for logs produced by 1 Stage step. Logs beyond this limit will be skipped and not available for download as well.
Harness always saves the final log line that contains the status (Success, Failure, etc) even if logs go beyond the limit. In cases where the final log line is itself very large and logs are already beyond max limit (25MB), Harness shows a limited portion of the line from the end (10KB of data for the log line).

#### Q: Can I see all the pipeline executions in one view if I am an account admin?
A: In Harness NextGen, it is not possible to view all pipeline executions under a single view. This is due to the three levels of scoping in the platform. Depending on the organization and project, pipeline executions can be viewed on the execution history tab.

#### Q: Do we have a stage-level configuration where I can set the environment variables and is available to all steps?
A: In CIE, if you have set environment variables at the stage level, they will be available for all steps. In CD, you can use stage variables or pipeline variables to achieve your use-case of using the same variables anywhere in pipeline and stages.

#### Q: What happened to the pause button?
A: We have deprecated the pause button. The pause button wasn't consistent, and it put pipelines in a bad state.




#### How to print all custom defined pipeline variables in shell script
You can install jq and can use below command
```
json_content='<+pipeline>'
variables=$(echo "$json_content" | jq -r 'recurse | objects | select(has("variables")) | .variables | to_entries | map("\(.key) = \(.value)") | join(" ")')
echo "$variables"
```

#### How to get a failure error for the pipeline

You can make use of the getExecutionDetailV2 API and get the error details under executionErrorInfo with a status as failed.

#### How do I get error details for a failed pipeline execution?

You can use the `getExecutionDetailV2` API to get the error details under `executionErrorInfo` with the status as `failed`.

### How can I make my pipeline dependent on the RBAC permissions of the user that runs the pipeline? Is that info accessible from inside the pipeline? 


We don't have a variable like `<+currentuser.role>` that will return the role for user, but you can use a variable to get the user's email address. For more information, go to [Pipeline trigger by email](/docs/platform/variables-and-expressions/harness-variables/#pipelinetriggeredbyemail).

You can also make an API call to list all roles assigned to the user and decide the next step accordingly. For more information, go to [Get aggregated user](https://apidocs.harness.io/tag/User#operation/getAggregatedUser) in the API documentation.

### How can I block an API key used to trigger a pipeline execution per environment?

You can use Harness Service Accounts to define granular roles and permissions for what users have access to. This allows you to scope the API keys to specific resources/environments and ensure there is no cross-scope access.

### Is the user able to execute the pipeline through the API?

Yes, you can execute the pipeline through the [Pipeline execution API](https://apidocs.harness.io/tag/Pipeline-Execution).

### Is the user can able to execute the pipeline through CLI?

Yes, you can use the API curl or custom webhook curl in any CLI to execute the pipeline.

### Is the user can able to execute the pipeline using the Harness CLI command?

No, currently Harness CLI don't have any command for pipeline execution.

### What is the recommended or consensus time delay before making an API call to the apiUrl returned from a Harness trigger for starting a pipeline?

A good average would be 20-30 seconds, but unfortunately there is no way to give a precise estimate of an interval to wait before calling this API.
This API only starts giving success response when the pipeline execution kicks in. In between, we need to load the pipeline’s yaml and all the referred templates, which can take some time, especially if the entities are git-synced, in which case we need to fetch all of them from git. To be 100% safe, we would recommend a polling approach, like, try calling the API 10s after the trigger execution was requested. If it fails, wait for another 10s, try again, and so forth.

### How do I fix the error “You are missing the following permission: Create / Edit Pipelines”?

To resolve the error ```You are missing the following permission: Create / Edit Pipelines```, you need to assign the ```Write Pipelines``` permission to your user.

### How can I easily disable pipeline triggers?

On the triggers page, you'll see a toggle icon on the right side under Enabled, you just need to toggle it off and the trigger will be disabled.

### What is my webhook identifier to trigger pipelines?

When you name an entity, Harness automatically generates its identifier. You can edit the Identifier when you are creating the entity, but not after the entity is saved. If you rename the entity, the Identifier remains the same. The generated Identifier is based on the entity name and meets the identifier naming restrictions. If an entity name cannot be used because it's already occupied by another entity, Harness automatically adds a prefix in the form of -1, -2, etc.

### How can I easily disable pipeline triggers

You can navigate to the trigger under pipeline and can toggle the enable button to disable the trigger on top left

### What permission do I need to see deployments for all projects?

You can create a role and add view permission for pipeline with account scope, you can find sample one as below for having execute permission similarly you can create one for just view access
https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#rbac-workflow-examples

### How can user only edit existing pipeline but should not be able to create any new pipeline?

You can create the Roles and Resource Group like below..
- Roles : Create/Edit,
- RG : Select the specific pipelines within RG that the user should be able to edit.
This will allow them to edit the pipelines that exists and can not create any new one. They need to select all the pipelines.

### How do I avoid hitting the GitHub API rate limit when using multiple templates and Git-stored pipelines?

To minimize GitHub calls from Harness, enabling the bi-directional git experience may significantly reduce the number of requests.

### If we abort the pipeline and a step is being executed, will it be immediately stopped or it will finish the step task execution and after that abort the execution?

When you [abort a pipeline](https://developer.harness.io/docs/platform/pipelines/failure-handling/abort-pipeline), the pipeline will finish executing its current task and then stop execution.

### Is the user can approve the pipeline through the API using token of service account?

The Service Account API token is not supported with Approval API, you need to use the personal access token.

### Why can't I resume my pipeline after a delegate release?

Harness maintains a local cache of all connected delegates to execute tasks and optimize performance. The cache is refreshed every 3 minutes, which means that it may take up to 3 minutes for a new delegate to be eligible to execute a task once it's connected. This has been in production for a few years and has proven to be effective.

To ensure a smooth transition between bringing up a new delegate and terminating an old pod, we recommend having a grace period. In our YAML configuration, we use the `minReadySeconds` field to ensure that old pods die after 2 minutes of a new pod being in the ready state. If your delegate YAML file doesn't have this field, you can download a new YAML and add it to prevent older pods from being killed before the new pod receives traffic.

### How can I increase the concurrent pipeline execution limit?

You can increase the limit unto 1000 by navigating to Account Settings --> Account Resource --> Default Settings --> Pipeline

### Which API method can I use to invoke a pipeline when using multiple dynamic parameters?

It depends of your scenario. If you use the same set of inputs to invoke a pipeline, Harness recommends that you use the [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList) API method. You can refer to an existing input set in the InputSet API method, so you don't need to specify all the parameters each time. For example, if you have a pre-defined input set for staging deployments, you can create an input set called `staging-inputset`, as well as others for different environments. Then, you can use the `environment_name` to dynamically select the appropriate input set.

If your pipeline has a very specific context of each execution, where you need to pass different parameters on each execution, Harness recommends that you execute your [Pipeline with Runtime Input YAML](https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetYaml).

### What is the expected behavior when a customer aborts a pipeline task, and what actions are taken to ensure a clean state in the system?

When you initiate an abort for a pipeline task, the expected behavior is to take actions to halt the task's execution as promptly as possible.
Harness has a method, `io.harness.delegate.service.DelegateAgentServiceImpl#abortDelegateTask`, which is used to abort a task. This method typically leverages `Thread.interrupt()` to initiate the abort process. The key here is to interrupt or cancel the running task effectively.

An abort could leave the system in a potentially inconsistent or 'dirty' state, it's crucial to consider rollback procedures.

Delegate actions, such as canceling or ending running tasks, should play a central role in preventing system inconsistencies and maintaining system integrity.

### I use a Slack bot to send messages about test job results. Why can't I find a variable for the job URL?

For the pipeline execution URL: `\<+pipeline.execution.url>`

https://docs.harness.io/article/lml71vhsim-harness-variables#pipeline_execution_url

### What is the RBAC to hide pipelines?

We currently don't support the ability to hide pipelines with RBAC.
However, you can achieve this by creating a role and resource group that has access to specific pipelines. Once created, assign the role and resource group to the users. This way, users can view the pipelines but can only execute them based on the resource group assignments.

### How can I provide access to specific pipelines in Harness?

You can use [RBAC](/docs/platform/role-based-access-control/rbac-in-harness/)
 to create a resource group and select specific pipelines to have access.

### Why can't I remove my pipeline?

If you need to delete Harness Resources forcefully, you can go to **Account resources** and then to **Default Settings**. Under General, you can select the **Enable Force Delete of Harness Resources** option. Then you can delete the pipeline from the Harness UI. This option allows entities to be force deleted.

### How can I disable a pipeline?

You can use the Deployment Freeze option. For more information, go to [Deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze/).

### If we have a main pipeline linked to a chained pipeline, when the main pipeline is executed, which pipeline settings have precedence?

For example, if a main pipeline has notifications set, pipeline timeout set and chain pipeline is a template pipeline with notifications set, pipeline timeout set.

The notification/timeout settings for each entity will be honored as the pipeline progresses.

### How can I restore deleted pipelines?

Unfortunately, we don't soft delete entities and hard delete them. Therefore they can't be easily restored. Some entities can be restored using YAML from the audit trail.

### Which RBAC permissions are required for users who execute pipeline tasks using the API?

The user needs the same permissions to execute pipeline tasks via API as they would need when running the same tasks through the Harness UI.




## Pipeline access control


## Pipeline APIs

## Abort pipelines

## Other pipeline questions

For additional information and questions about pipelines generally, pipeline components (such as delegates, connectors, and secrets), and module-specific pipelines (such as CI/CD pipelines), go to the module and Platform documentation and the other FAQ pages.
