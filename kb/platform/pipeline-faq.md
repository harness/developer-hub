---
title: Pipeline FAQs
description: Frequently asked questions about pipelines.
sidebar_position: 4
redirect_from:
  - /docs/platform/pipelines/w_pipeline-steps-reference/pipeline-faq
---

This page answer some frequently asked questions about pipelines in Harness. For additional information and questions about pipelines generally, pipeline components (such as delegates, connectors, and secrets), and module-specific pipelines (such as CI/CD pipelines), go to the module and Platform documentation and the other FAQ pages.

## How many pipelines can I have?

There is no limit to the number of pipelines you can create in a project.

## Is there a character limit for pipeline names?

Pipeline names are limited to 128 characters.

## Pipeline access control

### Can I disable a pipeline?

With Harness CD, you can use a [Deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze/) to do this.

### How do I fix the error "You are missing the following permission: Create / Edit Pipelines"?

To create or edit pipelines, you need the `Create/Edit` or `Write` pipelines permission in Harness. Your permissions are determined by your assigned [roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#rbac-components).

### Can I use RBAC to hide pipelines?

Harness RBAC doesn't offer a setting to hide pipelines. However, you can achieve this by creating a role and resource group that has visibility (access) to specific pipelines. Then assign users to the role and resource group accordingly. This way, users can view a limited set of pipelines and execute them only if permitted by the resource group assignments. For more information, go to [RBAC in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) and [Resource group scope and refinement](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups)

### Can I provide access to specific pipelines in Harness?

You can use [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) to create a [resource group](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) that has visibility (access) to specific pipelines.

### Can I allow a user to edit existing pipelines but not create new pipelines?

Harness doesn't distinguish the create and edit permissions. To block creation while allowing editing of pipelines, you need to use [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) to create a role with the `Create/Edit` pipeline permission, and define a resource group containing the specific pipelines that you want the user to be able to edit. Then assign the user to that role/resource group accordingly.

By selecting specific, individual pipelines when configuring the resource group, the user can edit the selected existing pipelines only. They can't create new ones. Note that whenever new pipelines are created, you must adjust this resource group to include the new pipelines if you want the user to be able to edit them.

### Can I make my pipeline dependent on the RBAC permissions of the user that runs the pipeline?

Harness doesn't have a variable like `<+currentuser.role>` that returns the role for user running the pipeline; however, you can use a variable to get the user's email address. For more information, go to [Pipeline trigger by email](/docs/platform/variables-and-expressions/harness-variables/#pipelinetriggeredbyemail).

You can also set the first step of the pipeline to call the [Get aggregated user](https://apidocs.harness.io/tag/User#operation/getAggregatedUser) endpoint, which lists all roles assigned to the user, and then configure a [conditional execution](https://developer.harness.io/docs/platform/pipelines/step-skip-condition-settings) that only allows the pipeline to proceed if the roles pass a JEXL condition.

## API

### Can I run pipelines through the API or CLI?

Yes, you can execute the pipeline through the [Pipeline execution API](https://apidocs.harness.io/tag/Pipeline-Execution).

You can use the API curl or custom webhook curl in your preferred CLI to execute pipelines.

The Harness CLI doesn't have a built-in command for pipeline execution.

### Which RBAC permissions are required to execute pipeline tasks using the API?

The user needs the same permissions to execute pipeline tasks via API as they would need when running the same tasks through the Harness UI.

### Can I block API keys used to trigger pipeline execution per environment?

You can use [Harness Service Accounts](https://developer.harness.io/docs/platform/role-based-access-control/add-and-manage-service-account) to define granular roles and permissions for what users have access to. This allows you to scope the API keys to specific resources/environments and ensure there is no cross-scope access.

### Which API method can I use to invoke a pipeline when using multiple dynamic parameters?

It depends of your scenario. If you use the same set of inputs to invoke a pipeline, Harness recommends that you use the [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList) endpoint.

You can refer to an existing input set in the InputSet API method, so you don't need to specify all the parameters each time. For example, if you have a pre-defined input set for staging deployments, you can create an input set called `staging-inputset`, as well as others for different environments. Then, you can use the `environment_name` to dynamically select the appropriate input set.

If your pipeline has a very specific context of each execution, where you need to pass different parameters on each execution, Harness recommends that you use the [Pipeline with Runtime Input YAML](https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetYaml) endpoint.

### Can I use a service account token to approve a pipeline through the API?

Service Account API tokens aren't supported for the Approval API. You must use a personal access token.

### Can I use the API to get a failed pipeline's error details?

You can use the [getExecutionDetailV2 API](https://apidocs.harness.io/tag/Pipeline-Execution-Details/#operation/getExecutionDetailV2) to get the `executionErrorInfo` if the pipeline's status is `failed`.

### How do I avoid hitting the GitHub API rate limit when using multiple templates and Git-stored pipelines?

To minimize GitHub calls from Harness, enabling the bi-directional Git Experience can significantly reduce the number of requests.

## Pipeline triggers

### Can I disable pipeline triggers?

On the Triggers page, switch the **Enabled** toggle to disable a trigger.

### What is the webhook identifier for a pipeline trigger?

On the Triggers list, you can find a trigger's [identifier (ID)](https://developer.harness.io/docs/platform/references/entity-identifier-reference/) under the trigger name. You can get the webhook URL by selecting the **Link** icon in the **Webhook** column.

### What is the recommended time delay before making an API call to a pipeline trigger's apiUrl?

A good average would be 20-30 seconds, but it is impossible to give a precise interval to wait before calling this API.

This API returns successful responses only when pipeline execution kicks in. Between trigger initiation and pipeline start, Harness loads the pipeline YAML and referred templates, which can take some time, especially if the entities are Git-synced and need to be fetched from Git.

To be safe, Harness recommends a polling approach. For example, try calling the API ten seconds after trigger initiation. If this fails, wait another ten seconds and try again, and so on.

### Can I create a trigger that starts another pipeline when one pipeline ends?

You can't create a trigger for this, but you can set up [Pipeline chaining](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining).

## Stop pipelines

### What is expected when I abort a pipeline, and what actions are taken to ensure a clean state in the system?

When you [abort a pipeline, stage, or step](https://developer.harness.io/docs/platform/pipelines/failure-handling/abort-pipeline), the expected behavior is to take actions to halt the task's execution as promptly as possible.

Harness has a method, `io.harness.delegate.service.DelegateAgentServiceImpl#abortDelegateTask`, that aborts a task. This method typically leverages `Thread.interrupt()` to initiate the abort process. The key here is to interrupt or cancel the running task effectively.

An abort could leave the system in a potentially inconsistent or 'dirty' state, it's crucial to consider rollback procedures.

Delegate actions, such as canceling or ending running tasks, should play a central role in preventing system inconsistencies and maintaining system integrity.

### If I abort a pipeline while a step is running, is it immediately stopped or does it finish the step first?

When you [abort a pipeline](https://developer.harness.io/docs/platform/pipelines/failure-handling/abort-pipeline), the pipeline finishes executing its current task and then stops the pipeline execution.

### What happened to the pause button?

Harness deprecated the pause button because it was inconsistent and put pipelines in a bad state.

## Chain pipelines

### With chained pipelines, when the main pipeline runs, which pipeline settings take precedence?

Settings are triggered and utilized as the pipeline progresses. For example, the main pipeline runs initially and uses the main pipeline's settings. When the pipeline reaches the Pipeline stage (the chained/child pipeline), it uses the child pipeline's settings while executing the chained pipeline. 

For example, if the main pipeline has notification settings and the child pipeline has different notification settings, the child pipeline settings only apply while the child pipeline runs. Otherwise the main pipeline settings are used.

### In pipeline chaining, can I reference the child pipeline's variables in the parent pipeline without using outputs?

You must use output to export the variable and then you can use a Harness expression to reference the variable in the parent pipeline. For example, this expression calls an artifact tag from a stage in a child pipeline.

```
<+pipeline.stages.ID_OF_CHILD_PIPELINE_STAGE_IN_PARENT_PIPELINE.pipeline.stages.ID_OF_STAGE_IN_CHILD_PIPELINE.spec.artifacts.primary.tag>
```

Make sure the expression is called in the parent pipeline after the child pipeline runs, or else the value will not be available to resolve the expression.

## Delete pipelines

### Why can't I remove a pipeline?

In general, you need delete permissions to remove a pipeline, even if you created the pipeline originally. Your permissions my have changed.

If an error occurs where you aren't able to delete a pipeline that you created, you can forcefully delete Harness resources. To do this, go to **Account resources** and select **Default Settings**. Under General, select **Enable Force Delete of Harness Resources**.

Once force deletion of Harness resources is enabled in your account, and you can delete the pipeline from the Harness UI. Consider disabling this setting after you have deleted the pipeline so that it doesn't remain enabled indefinitely.

### Can I restore deleted pipelines?

Unfortunately, it is generally not possible to recover deleted entities. Some entities can be restored using YAML from the [audit trail](https://developer.harness.io/docs/platform/governance/audit-trail/), but this is not guaranteed.

### When I delete a pipeline, are all logs (delegate, audit, deploy, build) produced by the pipeline also deleted?

When a pipeline is deleted, the audit details are retained, and the execution logs are deleted.

## Pipeline executions and logs

### Can I increase the concurrent pipeline execution limit?

Depending on your plan tier, you can [set the pipeline execution concurrency limit](https://developer.harness.io/docs/platform/pipelines/pipeline-settings) up to 1000.

### Can I get a pipeline's status while it's running?

While you can't get the status for the entire pipeline, you can call the status of specific stages or steps.

You can use Harness expressions to reference the status of completed stages and steps in a pipeline, such as:

```yaml
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.status>
<+pipeline.stages.STAGE_ID.status>
<+execution.steps.STEP_ID.status>
```

This can be useful, for example, when configuring [conditional executions](https://developer.harness.io/docs/platform/pipelines/step-skip-condition-settings).

### How long are Harness deployment logs visible in the UI?

The default pipeline execution [data retention](https://developer.harness.io/docs/platform/references/data-retention) period is six months. However, dashboard and list filters in the UI often default to 30 days. If you're looking for executions older than 30 days, make sure the filter is not limiting the visible data.

### Is the a line limit on the console log?

Yes. For details, go to [Deployment logs and limitations](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations/).

### What permission do I need to see deployments for all projects?

You need permissions to view pipelines at the account scope to access deployments for all projects. For more information and examples, go to [RBAC in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness).

### Can I see all pipeline executions for my account in one place if I am an account admin?

It is not possible to view all pipeline executions for an entire account under a single view due to the [three-tier permissions hierarchy](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes). You need to drill down into an organization or project to view the execution history for that org/project.

### What queries can I use in the pipeline execution history search?

You can search by pipeline name or tag.

## Pipeline notifications

### How do I make a pipeline report to Slack?

You can [configure Slack notifications](https://developer.harness.io/docs/platform/notifications/send-notifications-using-slack) to trigger messages for different pipeline events.

When executing the pipeline don't check the box for notifying only me.

### Can I include more data in a pipeline's Slack notifications?

Harness doesn't provide built-in support for adding additional details to Slack notifications; however, you can use a Shell Script or Run step with a script such as the following:

```json
curl -X POST -H 'Content-type: application/json' --data '{
  "text": "Slack notifications - Harness",
  "attachments": [
    {
      "fallback": "Notification from Harness",
      "color": "#3AA3E3",
      "fields": [
        {
          "title": "Pipeline Name",
          "value": "<+pipeline.name>",
          "short": true
        },
        {
          "title": "Triggered by",
          "value": "<+pipeline.triggeredBy.email>",
          "short": true
        },
        {
          "title": "Environment",
          "value": "<+pipeline.stages.deploynginx.spec.env.name>",
          "short": true
        },
        {
          "title": "Service",
          "value": "<+pipeline.stages.deploynginx.spec.service.name>",
          "short": true
        }
      ]
    }
  ]
}'  https://hooks.slack.com/services/<your information>
```

### I use a Slack bot to send messages about test job results. What is the job URL variable?

In Harness, use the [pipeline execution URL expression](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipeline_execution_url) `<+pipeline.execution.url>`.

## Delegates

### Can I force my pipeline to pick the right delegate for my environment?

You can configure [delegate selectors](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).

### Can I force my pipeline to select a delegate based on a tag?

You can configure [delegate selectors](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).

### Why can't I resume my pipeline after a delegate release?

Harness maintains a local cache of all connected delegates to execute tasks and optimize performance. The cache is refreshed every 3 minutes, which means that it may take up to 3 minutes for a new delegate to be eligible to execute a task once it's connected. This has been in production for a few years and has proven to be effective.

To ensure a smooth transition between bringing up a new delegate and terminating an old pod, we recommend having a grace period. In our YAML configuration, we use the `minReadySeconds` field to ensure that old pods die after 2 minutes of a new pod being in the ready state. If your delegate YAML file doesn't have this field, you can download a new YAML and add it to prevent older pods from being killed before the new pod receives traffic.

## Variables

### How do I  make environment variables available to all steps?

In Harness CI, stage variables are environment variables that are inherently available to all steps in the stage. You can also set pipeline variables.

In Harness CD, you can use stage variables or pipeline variables to make variables available throughout the pipeline.

### Can I use a shell script to print all custom defined pipeline variables?

Yes. You can do this in a Run step or a Shell Script step. For example, you could install JQ and run the following script:

```
json_content='<+pipeline>'
variables=$(echo "$json_content" | jq -r 'recurse | objects | select(has("variables")) | .variables | to_entries | map("\(.key) = \(.value)") | join(" ")')
echo "$variables"
```

### How do I get the stage execution ID to use in a template?

You can use the expression `<+pipeline.stages.STAGE_ID.executionId>` to get the execution ID of a specific stage in the pipeline. Replace `STAGE_ID` with the identifier of the stage you want to reference.
































## Pipelines

### How do I trigger an Azure pipeline?

To trigger an Azure pipeline, you can use the script step and invoke/trigger any pipeline using a cURL or webhook.

### How do I verify my account?

Harness has identified an increase in the unauthorized usage of the free pipeline minutes Harness makes available on Harness Cloud. To combat such unauthorized usage, Harness requires that you use your work email, not your personal email, to register your account.
 
If you face this issue on an account that was registered using your work mail ID, please reach out to our support team and share the execution URL where you got this error so we can review it further.

### Unable to view shell script content used in pipeline

If you are using a step template, you will need to navigate to the template and switch to the yaml view, and you will be able to see the content.

### How user can make sure the build artifacts that go to harness will come from protected branches before production deployment?

You can select the Artifact filter option and provide the expression as per your need in the Artifact source config of the service.

### Deploy stage requires a service defined. Can I set up a pipeline without a service defined at a stage?

Yes, you can use the custom stage. This is a selection you can make initially while defining a pipeline stage.

### How can I pass input variables to pipelines using a custom Curl trigger in Harness?

You can pass input variables to a pipeline using a custom Curl trigger in Harness by making a POST request to the Webhook URL associated with the pipeline trigger. You can include your custom variables as JSON data in the request body. Here's an example command:

```shell
curl -X POST -H 'content-type: application/json' \
--url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=&orgIdentifier=default&projectIdentifier=CD_Docs&pipelineIdentifier=Triggers&triggerIdentifier=Custom' \
-d '{"sample_key": "sample_value"}'
```

Replace `{"sample_key": "sample_value"}` with your custom variables, such as `{"tag": "stable-perl"}`, which can be declared as part of the pipeline and provided as runtime inputs when triggering the pipeline.

### How can I assign the same delegate replica to all steps in my pipeline?

While there isn't a dedicated configuration option for this purpose, you can output the environment variable $HOSTNAME in a Shell script and refer the delegate selector of the subsequent steps to that output.
**Short example:**

```
# Step 1
name: select_delegate
identifier: select_delegate
spec:
  spec:
    script: |
      HOST_SELECTOR=$HOSTNAME
  ...
  outputVariables:
    - name: HOST_SELECTOR
      type: String
      value: HOST_SELECTOR
# Step 2
name: use delegate
identifier: use_delegate
spec:
  ...
  delegateSelectors:
    - <+execution.steps.select_delegate.output.outputVariables.HOST_SELECTOR>
```

### Does the NextGen platform support the same cron syntax for triggers as the FirstGen platform?

Yes, the NextGen platform supports both the QUARTZ and UNIX syntax formats for cron triggers. For more information, go to [Schedule Pipelines Using Cron Triggers](/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#schedule-the-trigger).

### How can I customize a build pipeline? For example, how can I create a script to clone the repo from TFS?

You can run a script in a run step of a build pipeline, as detailed in this [Run step settings](/docs/continuous-integration/use-ci/run-step-settings), and you should be able to clone the repo.








### When we try to open a Git-enabled pipeline, why doesn't the branch dropdown display all the branches?

This behavior is expected when there are many branches in the repo due to pagination. To select branches that are not listed, try entering the full branch name manually. This should allow you to open the pipeline from that branch.

### How many branches are listed in the branch dropdown UI when we try to open a Git-enabled pipeline?

We typically list 20-30 branches, depending on the Git provider. Fetching all branches would be time-consuming.





### What is the Graphql API query to list executions with details between a specific time range?

```
{
    executions(filters:[{startTime:{operator:AFTER, value:1643285847000}},{endTime:{operator:BEFORE,value:1656332247000}}], limit:30) {
      pageInfo {
           limit
           offset
       total
     }
     nodes {
            startedAt
            endedAt
     tags {
           name
           value
     }
       id
       application {
                    id
                    name
     }
      status
     cause {
    ... on ExecutedByUser {
             user {
                   email
      }
     }
    ... on ExecutedByTrigger {
       trigger {
                id
                name
       }
      }
     }
    ... on PipelineExecution {
      pipeline {
                id
                name
     }
     memberExecutions{
      nodes{
    ... on WorkflowExecution{
       workflow{
                id
                name
     }
      id
     artifacts {
                buildNo
     artifactSource {
                     name
      }
     }
     outcomes{
      nodes{
    ... on DeploymentOutcome{
          service{
                  id
                  name
     }
          environment{
                      id
                      name
            }
           }
          }
         }
        }
       }
      }
     }
    ... on WorkflowExecution {
       workflow {
                 id
                 name
     }
              id
       artifacts {
                  buildNo
    artifactSource {
                  name
       }
      }
    outcomes{
             nodes{
    ... on DeploymentOutcome{
             service{
                     id
                     name
     }
             environment{
                         id
                         name
        }
          }
         }
        }
       }
      }
     }
    }
```

### Connector error causing pipeline failure

Connectors are often tied to a secret, such as a password or SSH key, that can expire. Expired credentials are a common cause of execution failures with connector errors. If your build fails due to a connector error, check your connector's configuration to confirm that the credentials aren't expired.

### What is the workflow for secrets, especially concerning the potential exposure of production secrets? Do secrets pulled by a delegate ever flow back to the Harness platform?

The secrets pulled by a delegate during pipeline execution do not make their way back to the Harness platform. Delegates connect to various secret managers as the pipeline progresses, but the secret information itself is not sent to Harness. This ensures that production secrets remain secure and are not exposed within the Harness platform. You can refer to these [docs](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

### VAULT operation error: Decryption failed after 3 retries for secret

Sometimes, you might encounter errors while executing pipelines. These errors could be due to issues with the network or the delegate's connection to the Vault where the secret is created. The first step is to verify that the delegates are operational and that the connectors used in the pipelines are connected properly. If the connectivity test fails, log in to the delegate and attempt to reach the connector URL from there.


### Is there a limit to the number of triggers a pipeline can have?

There is no limit to the number of triggers for a pipeline.
