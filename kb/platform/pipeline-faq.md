---
title: Pipeline FAQs
description: Frequently asked questions about pipelines.
sidebar_position: 4
redirect_from:
  - /docs/platform/pipelines/w_pipeline-steps-reference/pipeline-faq
canonical_url: https://www.harness.io/blog/ci-cd-pipeline-as-code-with-harness
---

<!--

Contributor Guidelines

Before you add new content, please search for existing FAQs to avoid duplications.

Ensure that your contributions are organized according to the following categories:

- General/miscellaneous
- Pipeline access control
- API
- Pipeline triggers
- Stop pipelines
- Chain pipelines
- Delete pipelines
- Pipeline executions and logs
- Pipeline templates
- Pipeline notifications
- Delegates
- Variables

You can search for a heading, for example, ## API, and add your new FAQ under the category that's appropriate to keep the file's organizational structure.

-->

This page answers some frequently asked questions about pipelines in Harness. For additional information and questions about pipelines generally, pipeline components (such as delegates, connectors, and secrets), and module-specific pipelines (such as CI/CD pipelines), go to the module and [Platform documentation](/docs/platform) and the other FAQ pages.

## General/miscellaneous

### How many pipelines can I have?

There is no limit to the number of pipelines you can create in a project.

### Is there a character limit for pipeline names?

Pipeline names are limited to 128 characters.

### What Harness method does recommend to update all pipelines when underlying configs were updated in the Git repository?

Harness Git Experience typically syncs unidirectional, from Harness to your Git repos. However, with bidirectional sync enabled, changes made on either the Git repo or Harness are automatically synchronized.

For more information, go to [Set up bidirectional sync for Git Experience](/docs/platform/git-experience/gitexp-bidir-sync-setup/).

### How does bidirectional sync for Git Experience handle a default pipeline repo with branch protection?

Branch protection rules in Git serve as safeguards that cannot be tampered with or bypassed by Harness. Therefore, our actions are restricted to the capabilities of the access token you provide.

When Harness initiates a push, it operates with the same authority as a user issuing commands through their CLI. Harness Git Experience ensures that you're always working with the latest updates, eliminating any chance of stale data.

If you're not utilizing bidirectional sync, Harness won't automatically update anything. While execution utilizes the latest version, outside of that, you might encounter outdated pipelines or entities based on the last time they were executed or manually reloaded. However, with bidirectional sync enabled, you'll consistently see the most up-to-date version pulled directly from Git.

For more information, go to [Set up bidirectional sync for Git Experience](/docs/platform/git-experience/gitexp-bidir-sync-setup/).

### When I try to open a Git-stored pipeline, why doesn't the branch dropdown display all the branches?

This behavior is expected when there are more than 20-30 branches in the repo due to pagination. To select branches that are not listed, try manually entering the full branch name. This should allow you to open the pipeline from that branch.

### Where to find the callback_id parameter needed for approving the Harness pipeline via API?

Set the **Callback ID** in the Approval step, under **Approval Callback Identifier**.

### Does the Harness NextGen community edition support LDAP login?

Community edition did not support LDAP. As of December 2023, the community edition is retired in favor of [Harness Open Source](/docs/open-source/overview).

### Can monitoring be added for changes to a Harness file-store object?

Currently, there is no support for connecting monitoring services for the Harness file-store.

### How can I determine which Harness version I am using?

Refer to the link: `https://app.harness.io/gratis/ng/static/versions.html`.

### Can Harness console output image files?

Harness console does not support rendering image files.

## Pipeline access control

### Can I disable a pipeline?

With Harness CD, you can use a [Deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze/) to do this.

### How do I fix the error "You are missing the following permission: Create / Edit Pipelines"?

To create or edit pipelines, you need the Create/Edit or Write pipelines permission in Harness. Your permissions are determined by your assigned [roles and resource groups](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness#rbac-components).

### Can I use RBAC to hide pipelines?

Harness RBAC doesn't offer a setting to hide pipelines. However, you can achieve this by creating a role and resource group that has visibility (access) to specific pipelines. Then assign users to the role and resource group accordingly. This way, users can view a limited set of pipelines and execute them only if permitted by the resource group assignments. For more information, go to [RBAC in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) and [Resource group scope and refinement](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups)

### Can I provide access to specific pipelines in Harness?

You can use [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) to create a [resource group](https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups) that has visibility (access) to specific pipelines.

### Can I allow a user to edit existing pipelines but not create new pipelines?

Harness doesn't distinguish the create and edit permissions. To block creation while allowing editing of pipelines, you need to use [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) to create a role with the `Create/Edit` pipeline permission, and define a resource group containing the specific pipelines that you want the user to be able to edit. Then assign the user to that role/resource group accordingly.

By selecting specific, individual pipelines when configuring the resource group, the user can edit the selected existing pipelines only. They can't create new ones. Note that whenever new pipelines are created, you must adjust this resource group to include the new pipelines if you want the user to be able to edit them.

### Can I make my pipeline dependent on the RBAC permissions of the user that runs the pipeline?

Harness doesn't have a variable like `<+currentuser.role>` that returns the role for user running the pipeline; however, you can use a variable to get the user's email address. For more information, go to the [pipeline.triggeredBy.email expression](/docs/platform/variables-and-expressions/harness-variables/#pipeline-expressions).

You can also set the first step of the pipeline to call the [Get aggregated user](https://apidocs.harness.io/tag/User#operation/getAggregatedUser) endpoint, which lists all roles assigned to the user, and then configure a [conditional execution](https://developer.harness.io/docs/platform/pipelines/step-skip-condition-settings) that only allows the pipeline to proceed if the roles pass a JEXL condition.

### Can Harness NextGen sync projects, connectors, etc., to GitHub in addition to pipelines, InputSets, and templates?

No, Harness NextGen Git Experience only supports syncing pipelines, input sets, and templates to Git repositories. Other entities such as projects and connectors cannot be synced to Git repositories using Harness NextGen Git Experience.

### How can we trigger a Lambda function from Harness and pass variables such as credentials (username and password) during the trigger?

To trigger a Lambda function from Harness and pass variables such as credentials, you can use the below steps:

- In the Payload section, you can pass in any variables or data you want to send to the Lambda function. For example, you can pass in credentials as environment variables or as part of the payload data.
- Save and run the pipeline to trigger the Lambda function with the specified payload.

You can use Harness trigger functionality to trigger the AWS Lambda pipeline execution based on your requirements. You can use Cron-based Triggers, Trigger pipelines on a new artifact or Webhook triggers.

### What happens if a test pipeline is triggered from the deployment pipeline?

The triggered test pipeline will run independently and will not be part of the original deployment pipeline. It will have its stages and steps, separate from the deployment pipeline.

### How can we handle test failures if the test pipeline is triggered independently?

If the test pipeline fails, you can utilize the rollback feature to revert the deployment. However, this rollback functionality depends on having a previous successful execution to revert to.

### Is there a way to integrate the triggered test pipeline within the original deployment pipeline?

No, currently there is no way to fully integrate a triggered test pipeline within the original deployment pipeline. The test pipeline will always operate as a separate entity.

### How does Resource Group control access?

A Resource Group in Harness is an RBAC (Role-Based Access Control) component that defines the objects (resources) a user or service account can access. These objects include projects, pipelines, connectors, secrets, delegates, environments, and more. Assigning a resource group to a user, user group, or service account grants them access to the resources defined in that group.

### How does the scope of a Resource Group impact access control?

The scope of a Resource Group determines where it can be applied and which resources it can access. For example, a resource group created at the project scope will only be available for that specific project, while one created at the organization level can provide access to all projects within that organization, depending on the selected Resource Scope options.

###  What happens if a user belongs to multiple user groups with different Resource Groups?

In Harness, permissions are additive. If a user belongs to multiple user groups with different Resource Groups, their total permissions will be the sum of all roles and resource groups from all groups they belong to, as well as any directly assigned permissions. This means users could have broader access based on their collective assignments.

### What is the principle of least privilege (PoLP), and how does it apply to Resource Groups?

The principle of least privilege (PoLP) means granting users only the minimum access needed to perform their tasks. In Harness, to maintain PoLP, it's important to carefully assign roles and resource groups, ensuring users don't have access to more resources or permissions than necessary. Custom roles and resource groups can be created to fine-tune access control.

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

### What is the GraphQL API query to list executions with details between a specific time range?

<details>
<summary>GraphQL to list execution details within a specific time range</summary>

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

</details>

### How do I avoid hitting the GitHub API rate limit when using multiple templates and Git-stored pipelines?

To minimize GitHub calls from Harness, enabling the bi-directional Git Experience can significantly reduce the number of requests.

### Can we set up separate failure strategies for individual steps in a step group?

No, failure strategies apply to all steps within a step group.

### How can I restrict approval for the user who ran the pipeline?

You can select the **Disallow the executor from approving the pipeline** option in the Approval step.
## Pipeline triggers

### How can I obtain the triggered build version value, trigger ID, or trigger URL during pipeline runtime when a pipeline is triggered by a PR?

Harness provides specific expressions to access information about the trigger during pipeline runtime. For the username associated with the PR changes, you can use `<+pipeline.triggeredBy.name>`, which will give you the name of the user who initiated the PR. To get the ID of the trigger that fired the execution, the expression `<+pipeline.triggeredBy.triggerIdentifier>` can be utilized. However, it's important to note that Harness does not offer an expression to retrieve the URL to the trigger. Therefore, while you can easily access the username and trigger ID, obtaining the trigger URL directly in the pipeline runtime is not supported.

### Can I disable pipeline triggers?

On the Triggers page, switch the **Enabled** toggle to disable a trigger.

### How do automated pipeline triggers behave when reconciliation is required?

The automated pipeline triggers will not work until the reconciliation is complete.

### What is the webhook identifier for a pipeline trigger?

On the Triggers list, you can find a trigger's [identifier (ID)](https://developer.harness.io/docs/platform/references/entity-identifier-reference/) under the trigger name. You can get the webhook URL by selecting the **Link** icon in the **Webhook** column.

### What is the recommended time delay before making an API call to a pipeline trigger's apiUrl?

A good average would be 20-30 seconds, but it is impossible to give a precise interval to wait before calling this API.

This API returns successful responses only when pipeline execution kicks in. Between trigger initiation and pipeline start, Harness loads the pipeline YAML and referred templates, which can take some time, especially if the entities are Git-synced and need to be fetched from Git.

To be safe, Harness recommends a polling approach. For example, try calling the API ten seconds after trigger initiation. If this fails, wait another ten seconds and try again, and so on.

### Can I create a trigger that starts another pipeline when one pipeline ends?

You can't create a trigger for this, but you can set up [Pipeline chaining](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining).

### How can I pass input variables to pipelines using a custom curl trigger in Harness?

You can pass input variables to a pipeline using a custom curl trigger in Harness by making a POST request to the Webhook URL associated with the pipeline trigger.

You can include your custom variables as JSON data in the request body.

For example:

```shell
curl -X POST -H 'content-type: application/json' \
--url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=&orgIdentifier=default&projectIdentifier=CD_Docs&pipelineIdentifier=Triggers&triggerIdentifier=Custom' \
-d '{"sample_key": "sample_value"}'
```

Replace `{"sample_key": "sample_value"}` with your custom variables, such as `{"tag": "stable-perl"}`, which can be declared as part of the pipeline and provided as runtime inputs when triggering the pipeline.

You could also configure the trigger to ingest payload contents by using `<+trigger.payload...>` expressions in the trigger's pipeline input.

### Is there a limit to the number of triggers a pipeline can have?

There is no limit to the number of triggers for a pipeline.

### Does Harness NextGen support the same cron syntax for triggers as FirstGen?

Yes, Harness NextGen supports both the QUARTZ and UNIX syntax formats for cron triggers. For more information, go to [Schedule Pipelines Using Cron Triggers](/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#schedule-the-trigger).

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

### Can I trigger an Azure pipeline from a Harness pipeline?

To trigger an Azure pipeline from a Harness pipeline, you can use a Shell Script or Run step and invoke/trigger any pipeline using a cURL or webhook.

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

### Account verification error with Harness Cloud builds on Free plan

Recently Harness has been the victim of several Crypto attacks that use our Harness-managed build infrastructure (Harness Cloud) to mine cryptocurrencies. Harness Cloud is available to accounts on the Free tier of Harness CI. Unfortunately, to protect our infrastructure, Harness now limits the use of the Harness Cloud build infrastructure to business domains and block general-use domains, like Gmail, Hotmail, Yahoo, and other unverified domains.

To address these issues, you can do one of the following:

* Use the local runner build infrastructure option, or upgrade to a paid plan to use the self-managed VM or Kubernetes cluster build infrastructure options. There are no limitations on builds using your own infrastructure.
* Create a Harness account with your work email and not a generic email address, like a Gmail address.

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

### Why does the Overview page show an active deployment while the pipeline history indicates it finished successfully?

You might need to enable the feature flag `DEBEZIUM_ENABLED` for your account. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

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

### Connector error causing pipeline failure

Connectors are often tied to a secret, such as a password or SSH key, that can expire. Expired credentials are a common cause of execution failures with connector errors. If your build fails due to a connector error, check your connector's configuration to confirm that the credentials aren't expired.

### How frequently does the Harness connector perform status checks?

Status checks typically occur every 30 minutes.

### VAULT operation error: Decryption failed after 3 retries for secret

Such errors in pipeline execution can arise from issues with the network's or the delegate's connection to the Vault where the secret exists. First, verify that the delegates are operational and that the connectors used in the pipelines are connected properly. If either the delegate or connector connectivity test fails, log in to the delegate and attempt to reach the connector URL from there manually.

### Can Harness execute TSQL scripts in Azure?

TSQL scripts can be executed with the Run Step or via a shell script, provided that Harness has the correct access within Azure to run the script.

### What is "SYSTEM - dashboard_cleanup" seen in Audit Trail?

It is a scheduled task designed to clean up dashboards that have no tiles. This includes dashboards with no visualization tiles, and even those with hard-coded text tiles.

### When encountering the error message "WARNING: Collection ansible.windows does not support Ansible version 2.13.13," what should be checked?

Check if the Harness Delegate was recently updated, and also confirm the version of Ansible being executed.

## Pipeline templates

### What is the frequency that we need to reconcile pipeline template changes?

If changes are made within the pipeline, then no reconciliation is required.  However, if changes are made outside of the pipeline and it has an entity that was recently updated, then reconciliation is required.  For example, if you update the environment on the Environment tab and not in Pipeline Studio, Harness prompts you to reconcile the pipeline.

### Which version will the templates take of an already configured pipeline trigger?

This will depend on how the template is configured. You can select the version that needs to be selected if the latest one is not configured to be used by default.

### What is the purpose of reconciliation within pipeline template changes?

Harness detects updates made to referenced entities if those updates are made outside of Pipeline Studio. When you are viewing a pipeline in Pipeline Studio, if a referenced entity has an update, Harness informs you and prompts you to update the pipeline. This process of updating the referenced entities in the pipeline is called pipeline reconciliation. The process ensures that you are aware that referenced entities have updates, and you can choose to integrate those changes into the pipeline.

For more information, go to [Reconcile pipeline template changes](/docs/platform/templates/reconcile-pipeline-templates/).

### When I try to upgrade a pipeline to a later version, why is it forcing me to reconcile, even after updating and saving the pipeline with a new template version?

This could be due to modifications in the pipeline template. Significant changes in runtime inputs might prompt the appearance of the reconcile option.

### If we deploy new versions of templates, what happens when an existing pipeline consumes a fixed version vs "always use a stable version"?

Versioning a template enables you to create a new template without modifying the existing one. When you plan to introduce a major change in a project that depends on an existing template, you can use versioning. You can create multiple versions of a template.

### Can I upgrade a pipeline that is using templates without reconciliation?

If changes are made within the pipeline, then no reconciliation is required.  However, if changes are made outside of the pipeline and it has an entity that was recently updated, then reconciliation is required.  For example, if you update the environment on the **Environment tab** and not in Pipeline Studio, Harness prompts you to reconcile the pipeline.

### What causes entities referenced pipeline to go out of sync?

When Harness APIs detect pipeline template changes that require reconciliation, you get the following error.

```Some of the entities referenced in this pipeline have gone out of sync.```

For more information, go to [Reconcile pipeline template changes](/docs/platform/templates/reconcile-pipeline-templates/).

### Can we initiate a test pipeline from our deployment pipeline template?

No, triggering another pipeline from a custom webhook trigger will not integrate the triggered pipeline within the original pipeline. The triggered pipeline will operate independently with its stages and steps.

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

In Harness, use the pipeline execution URL [expression](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables) `<+pipeline.execution.url>`.

### Can a PagerDuty notification be sent when a connector is disconnected?

Harness connectors do not support notifications at this time.

## Delegates

### Can I force my pipeline to pick the right delegate for my environment?

You can configure [delegate selectors](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).

### Can I force my pipeline to select a delegate based on a tag?

You can configure [delegate selectors](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).

### Why can't I resume my pipeline after a delegate release?

Harness maintains a local cache of all connected delegates to execute tasks and optimize performance. The cache is refreshed every 3 minutes, which means that it may take up to 3 minutes for a new delegate to be eligible to execute a task once it's connected. This has been in production for a few years and has proven to be effective.

To ensure a smooth transition between bringing up a new delegate and terminating an old pod, Harness recommends having a grace period. Harness uses the `minReadySeconds` field in our YAML configuration to ensure that old pods die after 2 minutes of a new pod being in the ready state. If your delegate YAML file doesn't have this field, you can download a new YAML and add it to prevent older pods from being killed before the new pod receives traffic.

### How can I assign the same delegate replica to all steps in my pipeline?

While there isn't a dedicated configuration option for this purpose, you can output the environment variable `$HOSTNAME` in a shell script and then configure the [delegate selectors](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) of the subsequent steps to ingest that output.

For example, here is some truncated YAML for two steps, one that outputs the `$HOSTNAME` and another that ingest that output for the delegate selector.

```yaml
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

### Do secrets pulled by a delegate ever flow back to the Harness platform?

The secrets pulled by a delegate during pipeline execution do not make their way back to the Harness platform.

Delegates connect to various [secret managers](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview) as the pipeline progresses, but the secret information itself is not sent to Harness. This ensures that production secrets remain secure and are not exposed within the Harness platform.

### What is the difference between a GitOps agent and Harness Delegates?

A GitOps agent creates a worker specifically for GitOps tasks, while the delegate is used to connect to other third-party apps for deployments.

### Can both the GitOps agent and Harness Delegate be run simultaneously?

The GitOps agent operates independently of the delegate, so there is no conflict between running both simultaneously.

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

### I can't view the contents of a shell script in a step template in my pipeline.

If you are using a step template, you must go to the template itself and view the template YAML to view the shell script contents.

### How do I obtain the stage execution ID to use in a template?

You can utilize the expression `<+pipeline.stages.STAGE_ID.executionId>` to retrieve the execution ID of a specific stage in the pipeline. Replace `STAGE_ID` with the identifier of the stage you wish to reference.

### Is it possible to set a notification for a failed status check?

Currently there is no support for notifications when a status check fails.

### Why did updating the app ID in NextGen to the new Microsoft Entra ID app cause a conflict with FirstGen mapping in SAML authentication, despite them being considered separate instances?

When creating a new SAML app integration in NextGen, it automatically inherits the settings from the existing FirstGen app integration. Consequently, any modifications made to the SAML app integration in NextGen will also impact the integration in FirstGen.

This occurs because the SAML app integration settings are stored at the account level, affecting all instances associated with that account. To prevent conflicts between the SAML app integrations in FirstGen and NextGen, ensure that the email addresses used in both instances match.

### How can I create a delegate with Terraform?

The `main.tf` sample file includes a delegate token option, facilitating automatic delegate registration at the token's scope upon installation. For instance, a project token automatically registers the delegate at the project scope. To locate the listed delegate, navigate to the project where the token was generated.

### What are there discrepancies between the user list, access control, and dashboard?

Harness includes user login data in audit history, but it's not structured for analytics purposes. Creating a custom view for this data isn't currently supported.

### How to import multiple template versions with terraform provider?
As of today only one template can be imported at a time. For every version of the template, a new resource is maintained. This applies to all entities regardless of version. Terraform (TF) helps manage these resources/entities, with each version of the template being treated as a separate entity.

### How can I copy an input set from one pipeline to another if there is no export option available when selecting the input set I want to copy?
Harness does not support built-in functionality for this use case. However, you can manually copy the content from the Inputset YAML and create a new Inputset YAML in the desired project or pipeline, making sure to update the metadata accordingly.

### What does this expression do ```<+secrets.getValue("")>```syntax in a pipeline?
You can retrieve a secret value, such as `GitHub_PAT`, using the `<+secrets.getValue("")>` syntax in a pipeline. If the secret is at the project level, use `<+secrets.getValue("GitHub_PAT")>`. For an organization-level secret, use `<+secrets.getValue("org.GitHub_PAT")>`, and for an account-level secret, use `<+secrets.getValue("account.GitHub_PAT")>`.

### Can a trigger be created from a specific directory within a Git repository?
Trigger cannot be created from a specific directory however you can create a trigger for a repository and then use a condition in your trigger such as starts with or Changed Files option to achieve your usecase.

### How can we create and utilize variables and input variables within a pipeline?
Currently, creating a variable at any level based on an input at the pipeline level is not supported.

However, you can pass the value from a pipeline-level input to a stage or step-level variable.

### Is there a method to create a single pipeline for deployment that can be used across multiple repositories and services, all managed through code? If so, could you provide details on how to set this up effectively?
Yes, you can create a reusable pipeline template that can be used for multiple repos and services. This can be achieved by creating a pipeline template in Harness and then referencing it in your code.

You can then use this template to deploy your services across multiple environments. For more information on creating pipeline templates and on pipeline templates : https://developer.harness.io/docs/platform/templates/create-pipeline-template/ and https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities/

### Could you please let me know the maximum number of account variables that can be created per account?
We do not have any limits on the number of variables that can be created per account.

### After the deployment is completed, I want to automatically send an email that includes details about all the Jira tickets involved in the build. How can I accomplish this?
We provide pipeline notifications to alert users about approvals and other events Pipeline Notifications Documentation : https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/

### How can I access variables defined within a service, infrastructure, environment, or scope?
To access variables in the the Service, Infrastructure and Environment. You can use our inbuilt variables https://developer.harness.io/docs/platform/variables-and-expressions/harness-expressions-reference#service-expressions and You can get environment and Infrastructure expressions from here similar way in your pipeline.

### Could you please explain how delegate selection is handled in both Service and Infrastructure steps?
The service will use the connector delegate selector during the artifact fetch task. The connector will employ a delegate or delegate selector as specified, and the same delegate will be used if no delegate selector is defined at the step, stage, or pipeline level. 

### Why does the pipeline name (or other fields) appear differently in Pipeline Studio compared to the Pipeline Listing Page?

The difference in pipeline names and other fields between the Pipeline Studio and the Pipeline Listing Page occurs because these interfaces pull data from different sources:

1. **Pipeline Studio**: This interface displays information directly from the YAML file in your Git repository, showing the values as they currently exist in the branch you're working on.

2. **Pipeline Listing Page**: This interface retrieves information from the Harness Database (DB), reflecting the last updates made via the Harness UI or API.

Discrepancies arise when the YAML file in any Git branch has different values compared to what's stored in the Harness DB. For example, if the pipeline name in the Git YAML file does not match the name stored in the Harness DB, you’ll see different names in the two interfaces.

When you make updates to the pipeline via the Harness UI, these changes are saved both to the Harness DB and to the YAML file in the selected Git branch. However, other branches in your repository may still carry outdated YAML files with old values.

To maintain consistency across all branches and interfaces, ensure that any manual changes to the YAML in Git are synchronized with updates made in the Harness UI. It’s also a good practice to regularly update all relevant branches to keep them aligned with the Harness DB.