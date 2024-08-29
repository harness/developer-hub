---
title: Harness Deployment Strategies FAQs
description: Frequently asked questions about Harness deployment strategies.
sidebar_position: 10
---
This article addresses some frequently asked questions about Harness deployment strategies.

### How to use FOR condition while using JEXL condition for triggers?

Suppose a trigger payload has multiple records and you want to search for a particular string, you can make use of the JEXL FOR loop to iterate the list and match a string as shown below:

`for (item : <+trigger.payload.commits>) { if (item.message == "mymessage") {return true;} }; return false;`


### Terraform stage fails with "failed to find plan".

The Terraform stage requires both Plan and Apply steps in the same stage to properly trigger.


### Why did the deployment got triggered despite the freeze window I set?

Pipelines executed with custom webhook triggers can override deployment freeze. This can be enabled by associating the API key or Service Account API key authorization with [Deployment freeze override permissions](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#trigger-freeze).


### Why is the deployment failing at a step level with the error message, "Invalid request: ConnectException: Connection refused (Connection refused)"?

Check the access control for the network.  The request could be blocked on the network side.


### How do I set up a cron expression so it triggers on the first Wednesday of each month at 15:00 hrs?

Set the cron trigger type to QUARTZ and set the expression to: `0 0 15 ? * 3#1 *`.


### Is there a variable to check who triggered the pipeline?

Yes.  You can use `<+pipeline.triggeredBy.email>`.


### Do pipeline GitHub triggers support project variable reference?

Pipeline GitHub triggers don't support project variable reference as the trigger YAML is independent of the pipeline YAML and the trigger will not be aware of the expression output. 


### Is it possible to use conditional execution in looping strategies?

If you use a looping strategy then you will not be able to apply conditional execution on the child steps.


### How to use expressions or variables in repeat looping strategy?

To pass a dynamic array as an input to the looping strategy of the next step, you can replace ```<+execution.steps.ShellScript_1.output.outputVariables.ARRAY1>``` with 
```<+<+execution.steps.ShellScript_1.output.outputVariables.ARRAY1>.split(",")>```. This change allows you to split the array into individual items using a comma as the delimiter.


### Why the "Always Execute this Step” condition does not always run in the CD pipeline?

Always execute step runs regardless of success or failure. But, to trigger this condition on failure, the previous step should be considered as failure. If the error is rolled back, then it is not considered a failure. Hence, the next step's conditional execution is not executed. Therefore, a failure strategy such as “Mark as Failure” or "Ignore Failure" is required.


### What are the main differences between using JSON and YAML as a Values file for G0 Templating?

- YAML 1.2 does not allow tabs for indentation.
- YAML imposes limitations on key lengths.
- YAML uses different unicode escape sequences.

However, apart from these differences, basic JSON documents are considered valid YAML and can be used with Go Templating.


### If I delete an infrastructure definition after deployments are done to it, what are the implications other than potential dashboard data loss for those deployments?

At the moment there is no dependency on the instance sync and infrastructure definition. Infrastructure definition is used only to generate infrastructure details. The instance sync is done for service and environment. Only in case if any these are deleted, the instance sync will stop and delete instances.

:::info

If you are using the default release name format in Harness FirstGen as `release-${infra.kubernetes.infraId}`, it's important to note that when migrating to Harness NextGen, you will need to replace `${infra.kubernetes.infraId}` with the new expression. In Harness NextGen, a similar expression `<+INFRA_KEY>` is available for defining release names. However, it's crucial to understand that these expressions will resolve to completely different values compared to the expressions used in Harness FirstGen.

:::


### Is there an easy way to see all the recent deployments of a workflow that had run?

You can use deployment filter and select the workflow and time range and you will able to see all the deployment for that workflow within that time range


### Error when release name is too long.

In the deployment logs in Harness, you may get an error similar to this:

```
6m11s Warning FailedCreate statefulset/release-xxx-xxx create Pod release-xxx-xxx-0 in StatefulSet release-xxx-xxx failed error: Pod "release-xxx-xxx-0" is invalid: metadata.labels: Invalid value: "release-xxx-xxx-xxx": must be no more than 63 characters
```

This is an error coming from the kubernetes cluster stating that the release name is too long.  This can be adjusted in the Environments section.
1. Select the environment in question.
2. Select infrastructure definitions, and select the name of the infrastructure definition.
3. Scroll down and expand **Advanced**, and then modify the release name to be something shorter.


### Pipeline GitHub trigger support for project variable reference?

This is not possible as the trigger YAML is independent of the pipeline YAML and the trigger will not be aware of the expression output.


### Do we support rollback of deployment post production? 

Yes, certainly we have that capability. To know more about this, go to, [Rollback deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/rollback-deployments)


### How can specific users be able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](https://developer.harness.io/docs/platform/approvals/adding-Harness-approval-stages/#select-approvers)


### How Kubernetes pruning option work during the deployment?

If you have enabled the Kubernetes pruning in your deployment, it will remove any resources that were present in old manifests that are no longer present in the manifest used for the current deployment.

For more details, go to [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/).


### How release: \{\{ .Release.Name }} help in steady state check in Helm deployment?

We perform a pod fetch based on this label, which allows us to show the deployed pods in the step output and also track the same for instance sync. If we don't add these, both won't work as expected.

For more details, go to [Steady state check](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart/#spec-requirements-for-steady-state-check-and-versioning).


### Is it possible to apply notification rule on environment level for workflow failure/success?

Workflow notification strategy can only interpret Condition,Scope, and User Group fields. So, all the notification rules are applied on workflow level.


### Is it possible to modify the looping stage runs inside a pipeline execution?

You can use Matrix strategies where you can use labels. To use the matrix labels naming strategy, do the following:
1. In Harness, select Account Settings.
2. Select Account Resources, then select Pipeline.
3. Set Enable Matrix Labels By Name to true.
4. Select Save.


### How do you determine the number of service instances/licenses for our services?

We calculate service licenses based on the active service instances deployed in the last 30 days. This includes services from both successful and failed deployments. This includes if the step involving a service was skipped during a pipeline execution.


### Is there a configuration option to preserve more than two older release secrets and config maps in Kubernetes deployments?

No. Currently, there is no configurable option to increase the number of older release secrets and config maps that can be preserved. The number of stored releases are fixed.


### What are some examples of values that are not hardcoded in the deployment setup?

Some examples of values that are not hardcoded include chart versions, values YAMLs, infrastructure definition, and namespaces. These are currently treated as runtime inputs.


### Trigger another stage with inputs in a given pipeline?

You cannot do it if the stage is part of the same pipeline. However, using pipeline A and running a custom trigger script inside it can trigger the CI stage which is part of pipeline B.


### Can I use ternary operators with triggers?

Yes, you can [use ternary operators with triggers](https://developer.harness.io/kb/continuous-delivery/articles/ternary-operator).


### How long is the main repo content cached before the latest pipeline code version is pulled from the remote Github repository?

The content is cached for each branch from where the file has been fetched for to date. The expiry time for the content is 30 days. 

We don’t auto-reload cache on backend as a synchronous job or similar. Any execution of that particular pipeline or involving that particular template/input set updates the cached content as we fetch everything from Git during execution.

Until any user-driven operation is performed, for example, reload-from-Git button on UI, execution of the pipeline/any entity via the RUN button/UI or execution of entity via trigger, and so on.


### Can I customize the looping conditions and behavior?

Yes, Harness NextGen often offers customization options to define the loop exit conditions, maximum iteration counts, sleep intervals between iterations, and more information [here](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).


### What are the use cases for utilizing looping strategy in Harness NextGen?

Looping strategies are useful for scenarios like canary deployments, gradual rollouts, and validation checks where you want to keep iterating until you achieve the desired result.


### Zero results returned when trying to find deployment data from 2020.

We have a 6 month data retention period as mentioned in [Documentation](https://www.Harness.io/pricing?module=cd#). 
Deployments older that that are not available.

<!---what's this


### Currently we make use of this feature from FirstGen. Is there, or will there be an equivalent feature in Next Gen?

Consider the below mentions :
- Reference 1 : [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/publish-pipeline-events-to-an-http-endpoint/)
- Reference 2 : You can Use Webhook notifications in NG to inform an external application of an event. Refer to this [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#webhook-notifications) 
  
--->


### How to pass value to a variable manually while running from UI if same pipeline is configured to run via trigger and using variable from trigger?

You can check the triggerType variable to identify if pipeline was invoked via trigger or manually and can use the following JEXL condition:
```<+<+pipeline.triggerType>=="MANUAL"?<+pipeline.variables.targetBranch>:<+trigger.targetBranch>>```


### How to do a Flank Deployment in Harness?

You can use deployment templates for this use case. You can find more information on this [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/).


### Can we add a delay of n minutes before a pipeline is invoked via trigger?

We don't have any timer for the trigger. It will trigger the pipeline whenever a change is made in the master branch.
Since this is a webhook.
 
As a workaround, a shell script can be added to sleep for 10 mins or n mins as per requirements


### How can I manually launch a pipeline which has conditional execution based on trigger data?

Pipeline will run into an error because trigger based expression will be null.
 
We can add a workaround, instead of adding the condition such as - ```<+trigger.event> == "PR"```, set it to a variable, pass the variable value at runtime, and set the default value as ```<+trigger.event> == "PR"```, so when the pipeline is executed with a trigger default value is passed and it while executing it manually, you can set it as false to skip the condition of this execution.


### How do I use OPA policy to enforce environment type for each deployment stage in a pipeline i.e. prod or preprod?

The infra details are passed as stage specs.

For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
You will have to loop across all the stages to check its infra spec.


### How do I add annotations to the canary deployment

Annotations can be added to canary deployment by following either of these methods:

1. Use apply step to create the canary ingress rule. We do support additional values.yaml override with apply step and this can be used for shifting the traffic, for example:
   1. Create ingress template/ingress-canary:
      ```
      nginx.ingress.kubernetes.io/canary: true nginx.ingress.kubernetes.io/canary-by-header: always nginx.ingress.kubernetes.io/canary-by-header-value: x-checkout-canary nginx.ingress.kubernetes.io/canary-weight: {{.Values.weight}} ```
 
   2. Using apply step, apply templates/ingress-canary with values.yaml content:
      ```weight: 10```
 
   3. To progress, using apply step, apply template/ingress-canary with values.yaml content:
      ```weight: n```

2. If weight is a constant value and having a loose ingress resource is not an issue then  declare both primary and canary ingress in the manifest that will be applied during both canary and primary deployment. Since there wouldn’t be any changes to the ingress rules itself then there shouldn’t be any effect if they are going to reapply canary ingress in the primary deployment.

Our recommendation is to use the first option, anyway Harness doesn’t track ingress rules so by using apply step you don’t lose anything.


### How to achieve Parallel Execution of Deploy one service to multiple Infrastructures?

You can add maxConcurrency: X in the repeat strategy, which is the number of concurrent instances running at a time.
eg - if maxConcurrency: 5, it will run 5 concurrent/parallel step/stage.


### How do I use an output from one stage in a looping strategy of another stage ?

If there is certainty in terms of number of Stages created, this could be achieved by creating a intermediary shell script which is concatenating output variables from previous stages with a “,” and building a list which can them be passed onto the next stage for lopping over this list. For more on this please refer this in following [Documentation](https://developer.harness.io/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies)


### Can we run two input sets of a pipeline together in parallel ?

No, It needs to be a different execution every time.


### In fetch pipeline summary API, what does the fields "numOfErrors" and "deployments" mean?

Deployments field has list of number of total executions per day for last 7 days and numOfErrors field has list of number of failed executions per day for last 7 days.


### Why is a certain pipeline step not running even though it meets the conditional execution criteria?

If a specific pipeline step is not running despite meeting the conditional execution criteria, it could be due to the presence of a failure strategy at the pipeline level. The failure strategy takes precedence over conditional execution settings. 


### Explain what 'freeze window' means?

Freeze Window can be setup in Harness with certain rules. No deployments can be run during this window. 
A freeze window is defined using one or more rules and a schedule. The rules define the Harness orgs, projects, services, and environments to freeze.
Deployment freeze does not apply to Harness GitOps PR pipelines.
You cannot edit enabled deployment freeze windows. If the deployment freeze window you want to change is enabled, you must first disable it, make your changes, then enable it again.


### Service showing as active but hasn't been part of a deployment in over 30 days.

Harness shows the Active instances is say you had a deployment and the VM got deployed from a Harness deployment. No matter if we deploy anything else on the VM , until the VM is up and running as it is linked with the service. It will show as active instance. The 30 days mentioned [here](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#active-services) , is for service based licence calculation and usage for CD. 


### Can we use multiple condition check in conditional execution for stages and steps?

We support having multiple condition check in the conditional execution. If you need to execute the stage based on two condition being true you can make use of AND operator, a sample is below:
```<+pipeline.variables.var1>=="value1" & <+pipeline.variables.var2>=="value2"```


### Does Harness GitOps support rollback and roll-forward capabilities?

Yes, Harness GitOps includes rollback and roll-forward capabilities. In case of deployment failures or issues, you can use Harness to automatically roll back to a previously known good state or roll forward to a fixed version.


### Do we need to manually filter the API response to check if the pipeline was executed by a trigger in Next Gen?

Yes,Harness NG uses REST APIs not graphql, this means that we need to review the api calls they are making and provide them the api endpoints that are parity. 


### How do I access one pipeline variables from another pipeline?

Directly, it may not be possible. 
 
As a workaround, A project or org or account level variable can be created and A shell script can be added in the P1 pipeline after the deployment which can update this variable with the deployment stage status i.e success or failure then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.Harness.io/tag/Variables#operation/updateVariable


### How does the Delegate handle task acquisition when it's busy due to resource constraints?

Think of the Delegate's behavior as a queue. If the Delegate is busy and cannot acquire tasks due to resource constraints, other eligible Delegates will be given the opportunity to acquire those tasks.


### What is the benefit of passing values between child pipelines in a chained pipeline configuration?

Passing values between child pipelines allows you to create dynamic and interconnected workflows. It enables you to reuse and share data and results between different stages of your deployment or automation process, enhancing flexibility and efficiency in your pipeline execution.


### Saving InputSets in a different repo than the pipeline.

You can save input sets in a different repo from the pipeline. All you need to do is go to ```Account Settings --> Account Resources --> Default Settings```
Go under Git Experience and checkmark Allow different repo for Pipeline and InputSets. Now while trying to save the input you can save it in a different repo. 


### Harness enabling auto-deployment.

To have automatic deployment in Harness, you can make use of triggers. On new artifact. 
Refer this [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/triggers/trigger-a-deployment-on-a-time-schedule/)
As soon as your build is complete and it publishes a new artifact you can setup a trigger on that and it will trigger a Harness Deployment. 


### How to exit a workflow without marking it as failed.

You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. 


### 2 Deployments in pipeline, is it possible for me to rollback the stage 1 deployment if the stage 2 tests returned errors?

We do have a pipeline rollback feature that is behind a feature flag. This might work better as you would be able to have both stages separate, with different steps, as you did before, but a failure in the test job stage could roll back both stages.
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines)
  
Also, for the kubernetes job, if you use the Apply step instead of Rollout then the step will wait for the job to complete before proceeding, and you would not need the wait step.


### Harness rollback deployments. 

Harness Rollback deployments initiate a rollback of the most recent successful deployment. Rollback deployments are currently supported by the following deployment types only (Kubernetes, Tanzu Application Services, Amazon ECS)


### Do we allow one-time scheduling of pipeline execution?

Yes, one can set a cron rule that just happens once, it has repeat reschedule icon in UI. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#run-once).


### What are Service Variables in the context of Harness?
Service Variables in Harness are dynamic parameters or values that can be used within your deployment workflows to customize and control the behaviour of your services and pipelines.


### What is the purpose of overriding Service Variables in the Environment configured in the Stage Harness?
Overriding Service Variables allows you to modify or specify specific values for your services in a particular environment or stage, ensuring that each deployment uses the appropriate configurations.


### What are some common use cases for overriding Service Variables in an Environment?

   - **Environment-specific configurations:** Tailoring database connection strings, API endpoints, or resource sizes for different environments (e.g., dev, staging, production).
   - **Scaling:** Adjusting resource allocation and load balancer settings for different deployment environments.


### Can I use Harness to manage environment-specific configurations for my Cloud Functions?
Yes, Harness supports environment-specific configurations for your functions. You can use Harness secrets management to store sensitive information, such as API keys or database credentials, and inject them into your Cloud Functions during deployment.


### What types of events can trigger notifications in Harness pipelines?
Notifications can be triggered for various events, such as pipeline starts, pipeline successes, pipeline failures, specific workflow steps, and manual approvals. You can customize the triggers based on your requirements.


### We have templated workflow variables and wish these can be passed from Git based Triggers. The values for these variables will be metadata of a pull request
You can create workflow variable and set the value to corresponding metadata field available as per type of trigger pullrequest variable


### Can I control sequence of serial and parallel in Multi Services/Environments ?

No, we cannot control the sequence for Multi Services/Environment deployments. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/#deploying-in-parallel-or-serial).


### What does the "Freeze Window" feature in a CD pipeline do and what does it block?
The "Freeze Window" feature in a CD (Continuous Delivery) pipeline allows for the creation of a period during which certain actions, specifically those related to CD stages, are restricted. However, account administrators can still execute CD pipelines during this freeze window by default. Users without the "Override" permission cannot execute pipelines containing CD stages during the freeze window. The freeze window primarily affects actions associated with CD stages in the pipeline. More details about its functionality can be found in this section: [Freeze Windows Only Apply to CD Stages](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#freeze-windows-only-apply-to-cd-stages).


### How can I generate a report of all deployments made so far?
You can always create dashboards to help you gain insights into your data. However, please note that we have a default retention period for CDS of 6 months. If you need to extend this period, please reach out to Harness support.


### Can we trigger a pipeline with a Git push on Bitbucket?
Yes, you can trigger the pipeline with a Git event through Bitbucket. You can refer to our [doc](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/) and [video](https://www.youtube.com/watch?v=y8s351IJLXw&t=113s&ab_channel=Harness) tutorial.


### Why can't I refer to an output within a CD stage using a looping strategy anymore? 
If you're using an absolute expression (for example: `<+pipeline.stages.stage_identifier>`), it will break your pipeline because matrices create a new identifier per iteration (`stage_1`, `stage_2`). To avoid your pipeline breaking, you can shortcut your expression to the step name (for example: `<+steps.step_identifier>`), and then you don't need to specify the stage identifier.


### When the Harness Approval times out, how do I mark the pipeline as a successful execution?
On the Harness Approval step or the custom one, go to the advanced tab and include a failure strategy; the perform action should be "Mark as Success."


### Is there a way to enforce a specific duration on a canary deployment?

No. There is no particular way to enforce duration, Canary deployment lives until you delete it.


### Can Harness able to monitor for when a particular image tag changes on DockerHub in order to initiate a hands-free build and push to our repo?

Yes, You can setup a trigger based on the image tag changes on DockerHub repo as suggested in this[ doc.](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/)


###  Why can I run the pipeline during a freeze window?
You're probably an administrator or you have the permission to [override freeze windows](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#access-control). Users with this role can still perform deployments.


### What annotations can be applied in Harness?

Harness provides several annotations that can be applied to Kubernetes resources. Here are the annotations and their purposes:

1. `Harness.io/skip-versioning: "true"`:
   - Purpose: Use this annotation when versioning of a resource is not required. Harness stores this information in a ConfigMap in your Kubernetes cluster.
   - Reference: [Kubernetes Versioning and Annotations](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels/)

2. `Harness.io/direct-apply: "true"|"false"`:
   - Purpose: Set this annotation to "true" to make a manifest an unmanaged workload. This is useful for scenarios like Canary and Blue-Green deployments where you want to deploy additional workloads as unmanaged.
   - Reference: [What can I deploy in Kubernetes?](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/)

3. `annotations: Harness.io/primary-service: "true"` and `annotations: Harness.io/stage-service: "true"`:
   - Purpose: Use these annotations when you have multiple services, and Harness needs to identify the primary service. These annotations are commonly used in Blue-Green Deployments.
   - Reference: [Create a Kubernetes Blue-Green deployment](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/)

4. `Harness.io/skipPruning: "true"`:
   - Purpose: Apply this annotation to ensure that a resource is not pruned. This is typically used for resources deployed by Harness to prevent accidental removal.
   - Reference: [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/)

These annotations help customize and control how Harness manages and deploys resources in your Kubernetes environment.


### What are queue steps in Harness, and how do they work?

Queue steps in Harness enable you to define a specific number of steps that can be executed simultaneously within a pipeline. You can configure the queue step by setting the maximum number of steps allowed to run concurrently and specify a timeout value.


### How can I use queue steps to control resource usage in my Harness pipelines?

To use queue steps in your Harness pipeline:

1. Open the desired pipeline in Harness.
2. Select the stage where you want to add the queue step.
3. Click the "Add Step" button and choose "Queue" from the available steps.
4. Configure the queue step by specifying the maximum number of concurrent steps and a timeout value.
5. Add the steps you want to run within the queue step. These steps will execute one at a time, respecting the maximum concurrent limit.
6. Save your changes and run the pipeline.

For detailed guidance on using queue steps to control resource usage in Harness pipelines, refer to the Harness documentation section titled [Control Resource Usage with Queue Steps](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/control-resource-usage-with-queue-steps/)


### How can I schedule cron trigger at 10:00 hrs, every 3 months, 4th Monday of every month UTC?
You can use  0 0 10 ? 1/3 2#4 *.


### Is there an existing solution in place or under development to accommodate a use case where a customer intends to employ their existing JIRA instance for managing deployment processes and approvals?

In the context of Harness, there is no necessity to create a duplicate ticket for approval purposes. Instead, a streamlined approach involves utilizing the "Approval" and "Update" steps while omitting the "Create" step. Additionally, you can designate the JIRA issue key as a runtime input, allowing individuals to input the relevant issue key when initiating the process. This approach ensures efficiency and avoids the redundancy of ticket creation.


### Is there a specific rationale behind the restriction on using expressions when defining the deployment group for multi-environment deployments?

Yes, this is indeed a limitation at present. When we initially introduced this feature, it was designed with fixed and runtime input support. Additionally, it's worth noting that we do not currently support passing a list for the service or environment field via an expression.


### How can I verify that my CD pipeline has resulted in a successful deployment? 

Harness Continuous Verification (CV) integrates with APM providers. By using machine learning Continuous Verification can be a powerful tool for verifying a CD deployment


### How does Harness Service-based licensing work? 

Harness uses a Service-based license model to charge Harness customers using its Continuous Delivery module. 

The CD License calculation uses the Active Services count and the number of Service Instances each active Service deployment creates.

For more information, go to [Service-based licensing and usage for CD](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd).


### "Is there an equivalent option in NG for "Last Successfully Deployed" in triggers?"

Yes. One can use the expression `<+lastPublished.tag> expression`. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#artifact-polling).


### How to pass the Environment and Infrastructure Definition as a string as a runtime parameter?
You can use the expression \<+trigger.webhook.payload.ref> to get the branch name from the GitHub webhook payload and pass it as the Environment value. In your pipeline, go to the stage where you want to set the Environment value, click on the Environment dropdown, select Runtime Input, and then enter a name for the input. In the Value field, enter the expression \<+trigger.webhook.payload.ref>. 
 
This will dynamically set the Environment value to the branch name from the GitHub webhook payload.


### When we specify a namespace, I notice that that namespace isn't being leveraged in the actual Apply step of the deployment.
The namespace specified in the infrastructure should be used during apply. Any namespace in the entities in the manifest would take precedence over that, however.
 
The manifest could also specify the namespace as a values.yaml reference. In an Apply step, you can override values.yaml and specify different namespaces for that particular Apply step.


### Can you run a step or a stage when the pipeline is aborted?
No, when a pipeline is aborted, the pipeline execution stops and the pipeline enters an aborted state. The status of the pipeline will be Aborted. 
 
However, you can mark a specific stage as failed during pipeline execution by selecting the Mark Stage As Failed option. This lets you abort a step that is running and trigger a configured failure strategy after the step is aborted.


### How to use the output from one stage in the looping strategy of another stage?
You can achieve this by following the steps documented here in this [article](https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables).


### What do the fetch files step do in rollout deployment?
The Fetch files task in the Rollout Deployment step leverages the GitHub connector configured in the service to fetch the manifests. Harness will also render and resolve any of the Harness variables defined in the values.yaml file of the service and add them to the manifest/Helm chart using Go/Helm templating. 

Harness fetches any secrets referenced in the values.yaml file and resolves them in the manifest. Harness masks secret output in its logs.


### Is there a built-in Harness variable for the helm chart version in the pipeline?
Yes, you can use the expression \<+trigger.manifest.version> to have the new chart version that initiated the Trigger passed in as the version to deploy. This expression can reference the chart version in your pipeline stage steps.

For non-trigger-based execution, you can use the expression \<+manifests.MANIFEST_ID.helm.version> to reference the Helm chart version in your pipeline stage steps. The MANIFEST_ID is located in service.serviceDefinition.spec.manifests.manifest.identifier in the Harness service YAML. You can also use Harness variable expressions or runtime inputs to pass in the Helm chart version at execution.


### Multiple deployment stages in my pipeline not able to see the previous stages console log in the second execution.

The execution not present when the pipeline is re-run is by design if the pipeline is re-run the older execution ID is purged along with the logs and only the current/latest logs are preserved.
The selective execution of the stages in the pipeline, where the user can run specific stages of the pipeline, Just enable this setting under - Advanced options of the pipeline.


### Save input sets on another Git repository.

We have this feature but it needs to be enabled from the Account level Settings. 
Go to Account Settings --> Account Resources --> Git Experience --> Allow different repo for Pipeline and InputSets, enable this and Now you can save the input set in different repo. 

Go to [Documentation](https://developer.harness.io/docs/platform/Git-experience/Git-settings/#enforce-Git-experience) for more details.


### Auto-Reject previous deployments paused in this step on approval.

If you have multiple services using this same pipeline template, both within and outside the same project, If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step. 
As the template used here has been specified with different services at the runtime, so it will run independently. 

### How to enable additional failure strategies?

Once you click on Add under Failure strategies, you can select the timeout failure strategy by default It select All Errors and you can an action say Manual Intervention or another option.
Go to [Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) for more details.


### We have a pipeline that is configured to deploy a selected service based on input. There currently isn't a way to filter the list of Deployment executions by the selected service.

If you want to specifically check the executions for a specific service. 
You can do so by going to Service and then click on the service you want to see the executions for.
Even under deployment, you can open the filter option and only enter service name and it will list all executions for the service.


### We already have running workload deployed using rolling deployment in Harness. But when we tried to change the deployment to canary, we face with following error.

Apply manifest failed with error: The Deployment "sample-app" is invalid: spec.selector: Invalid value: v1.LabelSelector\{MatchLabels\:map[string]string\{"app":"sample-app", "Harness.io/track":"stable", "release":"sample-app"}, MatchExpressions:[]v1.LabelSelectorRequirement(nil)}: field is immutable

Make sure the instance/deployment which was deployed as rolling is not present at the time when you are trying the canary in the cluster(You can manually delete the deployment) and then try again as looks like instance is running and we can not add extra label which gets added as part of canary.
Or you can change the namespace so that new instance will be deployed to new namespace.


### We have triggers configured on branch push and pull request events in Harness from Github but we noticed on PR edits we get multiple executions triggered. Is there a way to have these events only trigger one build?

you can put conditions on the trigger which you do not want to initiate on particular events.
 
Doc reference [here](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/#set-trigger-conditions)


### How to get full 40 character Git SHA into our pipeline?

you can use expression to Git Commit SHA: 
 
Manual builds: \<+codebase.commitSha>
Webhook triggers: \<+codebase.commitSha> or \<+trigger.commitSha>


### Is there a way to run a pipeline based two inputs set at the same time?

No, there is no way to run a pipeline simultaneously on two different input sets.


### How do we resolve error "Current execution is queued as another execution is running with the given resource key"

This error message indicates that there is already a running execution with the same resource key as the current execution that is queued. More on resource constraints can be referenced [here](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-resource-constraints/#resource-constraints-summary)


### Why one cannot configure multiple manifests in non-helm environment?

At present, we only support Helm K8s and Helm deployments ( not charts as they are treated as artifacts) with multiple manifest services because , allowing for all swimlanes can cause a mega service that can deploy multiple applications and can cause problem in management of the same.


### Can user mix and match images from different container registries within a single deployment?

Yes, By configuring each service with the appropriate image repository and tag details, you can seamlessly deploy applications using images from different registries in the same deployment.


### Does Harness Support Customized Deployment Types?

Yes, Harness supports Custom Deployments using Deployment Templates
For more details please see [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/).


### What does a failure strategy consist of?

First: Error conditions that trigger the failure strategy.
Second: Actions to take when the specified error conditions occur.


### Getting error - "The incoming YAML exceeds the limit XXXXX code points". How do I resolve this?

The issue is due to a very large sized yaml. This is an issue with the snakeyaml lib
The YAML size needs to be reduced or use matrix/strategies to add multiple steps/stages instead of adding them one by one.


### Is there any way to increase task count of ECS service without ECS service deployment?

Currently, the task count of ECS cannot be changed without doing any deployment in Harness but changes can be made to ECS deployment directly on AWS.


### If we manually increase the task count in AWS directly? Or decrease as well, would it impact subsequent pipeline deployment?

It shouldn't impact except the fact that if the subsequent deployment has a different task count, it would override the existing one


### How do I pass --target-path to deploy the code into the different path in Azure Web App deployment?

Unfortunately, we currently don't have any parameters to pass the target path.


### Does triggers abort the already running previous pipeline executions?
We have autoAbortPreviousExecutions setting in trigger, which when set as true will automatically aborts any previously running executions of the pipeline.


### Is there any way by which we can not provide project name in the webhook curl and it works by unique identifier?

Since the triggers are linked to pipelines, org ID and project ID is required parameter for it.


### How can I use canary with native helm deployment strategy?

You can only perform a rolling deployment strategy for Native Helm(no canary or blue-green).


### I am using AWS ASG template and would like to fetch "New ASG Name" while deployment/workflow/pipeline executes. Is it available in context? If yes then how can I get new asg name? 

We support both old and new ASG names via variable, which should help you with this use case to run custom scripting if required on old ASG.
 
Both new and old ASG: $\{ami.newAsgName}, $\{ami.oldAsgName} documented here:
https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/variables/built-in-variables-list#aws-amiasg-1


### Should the Fetch Instances step return only one instance for executing a trigger to an external orchestrator, such as Ansible or Puppet?

Fetch instance should return the instance on which the artifact will be deployed.


### Does Harness continually/occasionally re-Fetch Instances for Deployment Templates to keep the service instance count accurate, even if a Kubernetes deployment scales up outside of a deploy pipeline ?

For a deployment that may scale up or down after the initial deployment, the Fetch instance script should be designed to consistently return the current state of the system, and this script is executed periodically as part of a Perpetual task to ensure accuracy.


### Why am I receiving the message 'Current execution is queued as another execution is running with given resource key' in the step resource constraint?

Harness automatically includes Resource Constraints in each stage to prevent simultaneous resource requests. This message indicates that the current execution is queued because another execution with the same resource key is already in progress. To allow multiple pipelines to deploy to the same infrastructure concurrently, you can enable the 'Allow simultaneous deployments on the same infrastructure' option in the Stage's Infrastructure settings.


### Can I execute a step when a pipeline is aborted?

No, when a pipeline is aborted, the pipeline execution stops and the pipeline enters an aborted state. The status of the pipeline will be Aborted. Harness will not clean up the resources that are created during pipeline execution.
However, you can mark a specific stage as failed during pipeline execution by selecting the Mark Stage As Failed option. This lets you abort a step that is running and trigger a configured failure strategy after the step is aborted.
You can then configure a failure strategy to perform a custom action, such as resetting the status.


### How to deploy Azure SpringApps JAR via Harness CD?

You can take advantage of our ssh deployment and include a step to download the JAR.


### Can Terraform be used in Harness without specifying a backend configuration while ensuring safety and reliability?

For production deployments, it is strongly advised to set up a proper backend configuration. However, for testing and experimentation, it is possible to run Terraform in Harness without a backend configuration. In this scenario, the state is stored on the Harness side and is not directly accessible.


### How can I trigger a pipeline after another pipeline has succeeded?

You can trigger deployments and builds by using our custom triggers. Additionally, we offer the pipeline chain functionality, which enables you to execute pipelines through a parent pipeline.


### How do I stop a pipeline based on a condition?

To stop a pipeline based on a condition, you can incorporate conditional or failure execution in specific steps. Configure expressions so that if the condition is not met, you can mark the step as a failure or introduce a manual intervention step to mark the entire pipeline as a failure. You can trigger various error types to initiate the failure strategy in your step.


### How can the namespace definition be utilized in the actual Apply step of the deployment?

We recommend declaring the namespace in the values.yaml using the following expression: `<+infra.namespace>`, especially if you have the namespace attribute declared within your manifests.


### Is user can able to create the input set in different repo and branch from the pipeline?
No, the input set can only be created in the same repo and branch where the pipeline exist.


### What this error means "Not found previous successful rollback data, hence skipping rollback" after the execution failure?
This error means execution can't able to rollback to the previous version because there's no successful deployment is there for the pipeline.


### Can we get details what branch did trigger the pipeline and who did it; the time the pipeline failed or terminated,  while using Microsoft Teams Notification 
These details are not available by default as only (status, time, pipeline name url etc) is only sent and if you need these details might ned to use custom shell script


### If there is temporary failure/communication issue for sometime while connecting to service how to make sure step is tried multiple times instead of getting failed with tried once
You can configure failure strategy and use retry option for multiple run


### I want to run a step always irrespective of failure or success
You can use conditional execution and configure Always execute this stage


### Can we change failure strategy while running the execution?
Yes, you can use failure strategy as runtime input and can select/configure while running the execution 


### How to get helm chart version from helm based triggers?

The helm version is part of the trigger payload. The expression that contains the Helm version is `<+trigger.manifest.version>` .


### Is there a way I can create multiple triggers in the same pipeline such that each trigger is registered with a different GitHub repo as a webhook?

Yes, you can create multiple triggers in the same pipeline, each registered with a different GitHub repo as a webhook. To do this, you would create a separate trigger for each GitHub repo, and specify the appropriate repository name and event type for each trigger.


### How can I deploy the application on a custom specified location in the Azure web app?

Currently, we don't have any facility to do the web app deployment in the custom-specified location in Azure. Alternatively, you can use the shell script step and use the Azure CLI to pass the required argument


### Is it possible to trigger a CI stage by a trigger of type artifact? 

The trigger variables for CI aren't set so historically we did not support triggering of CI stage.


### Does failed deployments auto-rollback on all the failed deployments that have occurred ?

No, it does not necessarily mean that deployments auto-roll back. The action taken on failed deployments depends on the specific configuration and practices set up in the deployment pipelines. Organizations can define various actions to take when a failure occurs, including manual intervention, notification, or automatic rollback to a previous working version. If an organization desires more visibility into rollbacks, they can create a dashboard or monitoring system specifically designed to track and display information about rollback events.


### Is there a way to filter how many of the deployments were to production ?

Yes, we can filter deployments if the environments used for the same are marked as `Prod`


### Is there a plan to introduce a cosign step within deploy stage ?

For users who wish to incorporate image signing into their Continuous Deployment (CD) process, they have the flexibility to utilize our `container` steps as a solution. This approach allows users to sign images before deploying them as needed, providing a customizable and versatile deployment workflow.
Please read more on Containerize Step Grpous in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups)


### Is there a way to get the name of the person triggering the execution ?

Yes, one can use the [expressions](ttps://developer.harness.io/docs/platform/variables-and-expressions/Harness-variables) `<+pipeline.triggeredBy.email>` and `<+pipeline.triggeredBy.email>`.


### Can we fix a max queue length in Queue step?

No, this feature is not supported for queue steps. The queue operates on a first-in, first-out (FIFO) basis with a maximum capacity of 20. Any executions beyond this limit will result in failure.


### How can I make sure build artifacts pulled into Harness come from protected branches before production deployment?

You can select the Artifact filter option and configure the service's Artifact source as needed.


### Can one deduce that the objective involves fetching files from S3 for deployment in this scenario?

Yes, one can try to use a service deployment and use our `Custom Remote Manifest Option` to fetch it.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-custom-remote-script-and-manifests/)


### Is there is an ECS DNS Blue/Green deployment similar to First-Gen in the Next Gen?

In the next generation, we support the utilization of a `load balancer` with target groups for the switching between blue and green deployments.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-v2-summary/)
For First-Gen reference read the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/aws-deployments/ecs-deployment/ecs-blue-green-workflows/#ecs-bluegreen-using-dns).


### When publishing an artifact, what is the specific interval for polling and can a user configure it ?

Polling interval for publishing an artifact is `1 minute`. Harness don't allow to configure this by user
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#important-notes)


### What is the artifact polling interval for triggers?

Artifacts are polled at every 1-minute interval


### What is the default behavior on calling the triggerexecutiondetails rest API endpoint if the trigger is not active?

We will return an error message("trigger history not found") until the trigger event becomes available.


###  What is the default behavior, if I don't pass any value for a variable, Does Harness render it as blank or "null"?

In run pipeline form and in triggers, if the input set is not applied, empty values are sent as “”, and if the input set is applied, they are sent as \<+input> which is treated as null.


### I don't have the option to create an InputSet in Git?

For the input set to be added in Git, We require the pipeline to be on Git as well. Input sets are linked to the pipeline and get stored in the same repo and branch as the pipeline definition.

Once you move your pipeline to Git, the option to create an input set on Git will also be available.


### Does Harness Next Gen support the "Skip artifact version already deployed" parameter as present in First Gen?

We do support "Skip artifact version already deployed" for WinRM SSH deployment. It is present under the advanced section of the pipeline.


### How do we resolve the issue when a pipeline is getting triggered twice though there is only one trigger?

Check if you have 2 Harness webhooks pointing to this same account registered in your repo? If there are, please delete one of them, each repo is supposed to have only one Harness webhook registered in it. Also please check if there is a webhook configured at the organization level.


### Every time when I run kubernetes deployment, Harness create new version of configmap even of there were no changes which force pods redeployment. Is there a way to specify for Harness to create new configmap only when changes detected?

You can skip the versioning, it can be skipped by using these two ways:
 
1. Annotate the manifest provided in the Harness service's Manifests section with Harness.io/skip-versioning: "true".
 
2. In the Harness service's Manifest Configuration page, select Manifests > Advanced, and then select the Skip Versioning checkbox.


### After a successful deployment with the namespace "x" and another failed deployment with the same namespace (x), we switched the namespace and now it seems it cannot properly do a helm history.

You can enable the Ignore Release History Failed Status option to have Harness ignore these errors and proceed with install/upgrade. More on this can be referred here: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart/#ignore-release-history-failed-status)


### How can one avoid scale down of Old APP creating a Blue Green Deployment ?

Following steps can be the used for avoiding the scaledown of Old App in Blue Green Deployment:
- One can select instance count for old app in that case instead of % and give desire value as 0, this will skip the re-sizing of the Old App.
- Disable `Downsize old application` in swap route step, this will avoid to touch the Old APP after deployment.


### What is the time limit for a pipeline execution?

The maximum limits for a single pipeline run are 35 days for paid plans and 4 hour for free plans with a verified account.

These limits are applied because:
- There is a limit on the total number of concurrent and queued executions. If some pipelines run/wait for days/weeks, they consume valuable resources from other projects in the account and delay queues.
- Usually, very long running pipelines are waiting on something (approvals, test results, deployments) that took longer than expected. A quicker timeout makes it clear that something went wrong in the workflow, instead of indefinitely waiting.
- Long running pipelines impact the availablility of Harness resources.

For more information, go to [Deployment logs and limitations](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations) and [Pipeline settings](https://developer.harness.io/docs/platform/pipelines/pipeline-settings).


### Can we disable the Fetch Instances in custom deployment stage ?

No, Fetch instances manifest check the deployed resources exist to be used at surface up on dashboard.
Disabling such is not an available option.


### How long does the Perpetual Task in Service instance count stays live and what is the interval period of this check ?

Perpetual Task run after 10 mins interval which sync instances details, But stays alive for 2 weeks. So, after 10 mins service dashboard should be updated but live expectation can be for upto 2 weeks from here.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#how-instance-information-is-obtained)


### Do we support exported variables for looping strategies?

No, we don't support the exporting of variables using looping strategies.
Please read more on output variables in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#scoping-output-variables-using-aliases).


### For Input Sets is there any specific RBAC?

No, We dont have RBAC for Input Sets. Please read more on input sets in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/input-sets/)


### Is it expected that, after pushing a new artifact to an initially empty Docker repository linked to a trigger, the trigger's status shifts from pending to success only triggering the pipeline upon the second push?

Upon creating or updating a trigger, there's a five to ten-minute delay before the polling job initiates and the trigger becomes operational. It's advised to wait for this duration before pushing the artifact, according to general recommendations from the deployment platform.
After 5-10 mins of the trigger status turns success, any tag collected should trigger the pipeline.


### Can we use Infra variable in service config YAML (Like to use this variable as artifact path etc)?
No the Infra variable will not be available for service config, these Infra variable can be used in deployment manifest etc but not is service config as these variable will resolve in later part of deployment 


### Is there an expression, such as "\<+pipeline.stages.Deploy.strategy.finalStatus>", to get the status of a stage outside of the looping strategy?
The expression `\<+strategy.currentStatus>` only works within the context of the looping strategy, there is no expression like `\<+pipeline.stages.Deploy.strategy.finalStatus>` to get the status of a stage outside of the looping strategy.

You can try using the expression `\<+pipeline.stages.STAGE_ID.status>` to get the status of a specific stage.


### I have a pipeline containing different stages DEV-QA-UAT-PROD. In UAT I'm using Canary deployment and in PROD it's Blue Green. In these scenarios how Harness provides proper rollback strategies?
Harness provides a declarative rollback feature that can perform rollbacks effectively in different deployment scenarios.
 
For Canary deployment in UAT, you can define the percentage of traffic to route to the new version and set up conditions to switch traffic between the old and new versions. If an anomaly is detected during the canary deployment, Harness will automatically trigger a rollback to the previous version.
 
For Blue-Green deployment in PROD, you can define the conditions to switch traffic between the blue and green environments. If an issue is detected in the green environment, you can easily switch back to the blue environment using the declarative rollback feature.
 
You can define the failure strategy on stages and steps in your pipeline to set up proper rollback strategies. You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. Additionally, you can use the declarative rollback feature provided by Harness to perform rollbacks effectively in different deployment scenarios.


### We have a parent pipeline with the child pipelines and wanted to know if there is any built-in variable to check if the pipeline is triggered by another pipeline. 
There is no built-in variable to check if a pipeline is triggered by another pipeline. Even if a pipeline is triggered by another pipeline, it will still be considered a "Manual" trigger type. You may need to use a custom variable or some other method to track this information.


### After moving the pipeline source code from Inline to Repository. Is there a way to roll back this change as we cannot find it in the UI?
No, You should not face any issues with the trigger when it comes to inline or remote pipeline. There is no way to roll back. 
 
However, you can copy the yaml from your Git and create a new inline pipeline in Harness or you can use the import from remote option and create a new remote pipeline let us know if you encounter any issues with the trigger we will help you with the next steps.


### We want our helm deployments through Harness to wait for the objects to be in the ready state and then only exit with status. Currently, it is executing helm upgrade and exiting but we wanted to run something like this: helm upgrade "--install --atomic --timeout 20m \<release_name> \<chart_name>" How can we do this with Harness?

Using --atomic and --timeout flags to the Helm command in the "Command" field of the "Helm Deployment" step. This should work to ensure that the deployment waits for the objects to be in the ready state and then exits with status.
 
However, please note that the --timeout flag specifies the time to wait for any individual Kubernetes operation (like creating a pod or service) to complete, not the time to wait for all objects to be in the ready state. So if you have a large number of objects to deploy, you may need to increase the timeout value accordingly.
 
Also, please make sure that your Helm chart includes the necessary readiness probes for your objects to be considered ready by Kubernetes. Harness will wait for the readiness probes to pass before considering the deployment successful.


### Is it possible to publish some custom data like outputs from the variables or custom messages, strings (any information basically) in the Artifacts tab?

The only way to publish data in the Artifacts tab is by providing a URL to a publicly accessible location where the artifact is stored. If you do not have any public buckets, you can consider using a private bucket and generating a pre-signed URL to access the artifact. 
 
This URL can be used in the file_urls setting of the Artifact Metadata Publisher plugin to publish the artifact in the Artifacts tab. Another option is to use a different cloud storage provider that allows you to generate temporary URLs for private objects, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.


### "How can I dynamically reference step group IDs within a loop, such as loop_0, loop_1, loop_2, as they change dynamically?"
You can achieve this use case using the expression \<+execution.steps.step-group-id\<+strategy.identifierPostFix>.steps.step-id.output.outputVariables.var>


### How do Harness CD SSH deployments handle authentication and authorization for remote servers?
To authenticate and authorize remote servers for SSH deployments, Harness CD uses SSH Private Key to authenticate to the remote VM/server. For steps, you can refer to Passwordless SSH using public-private key pairs.


### What events can trigger the execution of rollback strategy steps - an error, like exit code 1, during Terraform plan step execution?
The Rollback strategy steps can be triggered by various events such as failure of a step or stage, timeout errors, or execution-time input timeout errors.
Yes, an error during Terraform plan step execution, such as exit code 1, can trigger the Rollback strategy steps.


### If the fallback strategy steps include only a Terraform rollback step using the same provisioner identifier what will happen?
During a rollback in Harness, the provisioned infrastructure is reverted to the previous successful version of the Terraform state using configuration files or Terraform configuration from the latest successful deployment with a matching Provisioner Identifier. The rollback is a hard rollback to the exact version of the state provided, without incrementing the state's serial number. The Provisioner Identifier determines what to rollback, and if settings are expressed, Harness uses runtime values when evaluating expressions.


### Are there any limitations to terraform rollback?
There are limitations to rollbacks. If, for example, modules 1 and 2 were successfully deployed, and module 3 failed, the rollback will only revert to the successful state of modules 1 and 2. However, if module 3 succeeds, and the subsequent deployment fails, the rollback will only include the state with module 3 deployed, excluding modules 1 and 2. Additionally, rollback is not possible if the Terraform Apply step is run with the Skip state storage option enabled and no Terraform backend is configured in the Terraform files. In such a scenario, using the Rollback step would be incorrectly set up and could lead to unexpected results.


### Why do triggers, sometimes stay in the "pending" state for many minutes, perhaps 10-15 minutes or more?
Whenever a trigger is created or updated, it takes about five to ten minutes for the polling job to start, and for the trigger to be in a working state. Harness recommends that you wait for five to ten minutes after a trigger is created or updated to push the artifact.
 This seems to be the expected result, it may take 10-15 for the trigger to get active.


### AutoScaler manifest file deployment is throwing 400 and failing with  An error occurred while trying to set the rules. The autoscaler responded with: Bad Request Reason
As we can see that it was failing while setting the rule, so need to validate the Rule section in manifest and you can try applying the manifest directly on cli.


### How would I deploy to a pipeline via api call but not have to specify all stages ?

One can pass the api call to deploy a pipeline , but it should contain all the stages mentioned in the pipeline.
To allow selective stage(s) executions? option. You can set webhook triggers to run specific pipeline stages using this option.
example yaml : 
```sh
trigger:
  name: stage3Trigger
  identifier: stage3Trigger
  enabled: true
  description: ""
  tags: {}
  stagesToExecute:
    - stage3
  orgIdentifier: NgTriggersOrg
  projectIdentifier: viniciusTest
pipelineIdentifier: ThreeStagesPipeline
source:
  type: Webhook
  spec:
    type: Custom
    spec:
      payloadConditions: []
      headerConditions: []
inputYaml: |
  pipeline:
    identifier: ThreeStagesPipeline
    stages:
      - stage:
          identifier: stage3
          type: Custom
          variables:
            - name: stage3var
              type: String
              value: stage3Var
```

Please read more on this in the following documentation on [Run specific stage on pipeline](https://developer.harness.io/docs/platform/pipelines/run-specific-stage-in-pipeline/).


### Is there a platform page where we can view the deployed image tags for each environment associated with a service ?

One can click on a service and  see all the environments and the artifacts that have been deployed. Higher level views can be accomplished through dashboard like DORA metrics. Please read  more insights on this in the documentation on [Monitor deployments and services in CD dashboards](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/).


### How are Input Sets used during deployments?

During deployments, variables and secrets defined in Input Sets are injected into your application code or environment configurations.


### What types of data can be stored in Input Sets?

Input Sets can store Variables: String values used in deployments.


### What are Harness Overlays?

Harness Overlays are specialized Input Sets that enable you to customize deployments for specific environments or stages. They allow you to override or augment existing Input Set configurations without modifying the original set.


### Is the user can able to to share input set between project in one organization?
No, as per the current design user can't share the input set with other projects.


### Can user change the pipeline name through the Git?
Name is metadata and will be changed if the user changes the Pipeline name from the Harness itself. So, if a user wants to see the updated name in the Pipeline and deployments listing, the user needs to update via Harness.


### How can we upload some mandatory test evidence file before allowing some deployment and fetch them later in pipeline?

You can use [API] (https://apidocs.Harness.io/tag/File-Store#operation/create) to first create the file and then fetch them later in execution.


### We're working on a Harness Pipeline (To Create a JIRA Issue) and want to trigger it via a python script (on AWS Lambda). While triggering the pipeline, we also need to send JIRA Issue Description data into it.  

You can use API to execute the pipeline [api](https://apidocs.Harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetList)

In the created pipeline you can add a Jira update step with the required details to update the issue [Doc](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages/)


### How can we calculate the instance of a service where number of pods change?

We can calculate the service licenses and instances in following methods for CG and NG both.

- List services deployed in the last 30 days. Service is considered in calculation even if it was part of any failed deployments
- For every found service we find the 95th Percentile of the number of its service instances across a period of 30 days and it represents active service instances
- Based on service instances we calculate the number of consumed licenses
- 1 service license is equal to 20 active service instances

Please find an example [here](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#example).


### I want to set up a chained pipeline in orgA/ProjectA with a pipeline in orgB/ProjectB. I want to restrict triggering the pipeline in orgB/ProjectB to only be possible through the pipeline in orgA/ProjectA. How can I implement this?

We would suggest using RBAC to only allow a certain user with access to those pipelines with execute permission, because we need execute permissions for the parent and child pipelines to ensure successful execution.


### We'd like a step in a Pipeline where it checks the Docker tag name of the artifact and if it doesn't contain "master" or "main", it fails the pipeline.

You can use conditional execution and use expression \<+artifact.tag> to check if it equals the required value and run the pipeline


### How does Harness provide enhanced control to users in the deployment sequence for applying autoscaling policies in ECS Blue-Green deployment?

 Harness exposes further control to users when in the deployment sequence they want to apply the autoscaling policies. This ensures that the existing containers are not impacted during release and after release it scales down based on traffic demand.
 Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#enable-auto-scaling-in-swap-step)


### How does Harness conduct pre-deployment validations and manage ECS Blue and Green services by updating tags based on target groups before initiating the deployment?

Harness performs some validations before the deployment. Before the deployment, Harness identifies ECS Blue and Green services based on the target group and updates tags accordingly. It then starts the deployment. One may enable the Feature Flag - `CDS_ECS_BG_VALIDATION` to use the feature on account. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#ecs-blue-green-service-validation)


### What is the proper method for constructing a Harness pipeline to execute a rolling restart of a service, analogous to the `kubectl rollout restart deployment <deploymentName>` command ?

Harness uses `patchManifest` stage type with `LAST_ROLLOUT = now()` in Spinnaker to achieve it today. Please read more on this in the Spinnaker [Documentation](https://spinnaker.io/docs/guides/user/kubernetes-v2/patch-manifest/)


### Is there a way to control the label when running a multi-service deployment?

This is the default behavior. One can enable account level setting to display names. It's under pipeline section - enable Matrix by names.



### Is there a way to schedule a cron trigger to run at specific time every other week?

Yes, In Schedule, use the settings to schedule the trigger. When you edit a Cron trigger later, you can type or paste in a Cron expression.The Cron expression will be evaluated against UTC time. Please read more on this in the [Documentation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#schedule-the-trigger)


### My pipeline is queued due to resource constraint although no other pipeline in the project is using same infrastructure.

Resource constraints has account level scoping by default, so if same infrastructure is used with combination of service/env/Infra ID in different Harness projects also it can still result into queuing of the infrastructure.


### How to read files under project's helm folder during project deployment?

We do not have a way to read the values file directly and access any variables from the same. It can only be read as part of the service deployment.

If you need to access the file values you need to pull the file from your repo in a shell script step and then publish the corresponding value as output variable. 



### Do we have a way to optionally exclude some values file fetch in the manifest based on condition?

Currently we do not have a way to exclude or make the values file list optional. If you run a helm deployment by specifying a values.yaml and if the yaml does not exist it will fail the deployment.


### Why the pipeline gets failed with message "deployment exceeded it's progress deadline"?

When we deploy any workload in our kubernetes deployment after the deployment is done we run the wait for steady step during which we check for the status of the deployment done in kubernetes with help of kubectl command. If the command is not returning anything and it exceeds the task run time threshold on kubernetes we see this error message. Also as we were unable to confirm the status of the deployment due to above failure we mark the deployment as failure as well.

### Is it part of the design that in the webhook trigger, an API URL for status is provided without the need for authorization?

Yes, this is kept by design. For more details, go to [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-deployments-using-custom-triggers/#enforcing-authorization-for-custom-triggers).


### What is the purpose of merging values YAML files?
Merging values YAML files allows for:

* Overriding default values with environment-specific settings.
* Combining configuration from multiple sources (e.g., Service Definition and Service Overrides).
* Adapting deployments to different environments without modifying the base configuration.


### Are rolling deployments suitable for all applications?

Rolling deployments are not suitable for all applications, especially those that:

* Cannot tolerate any downtime at all.
* Require complex configurations or dependencies that are difficult to update in a rolling fashion.
* Have highly stateful data that cannot be easily migrated between nodes.


### Can I combine different strategies in my pipeline? 
Yes, you can combine strategies, like using a canary deployment within a blue-green approach for further gradual rollout within the separate environment.


### Can I run deployments for multiple stages at once? 
Yes, you can run pipeline stages in parallel, deploying different services simultaneously.


### What's the benefit of using step groups? 
Step groups simplify managing related steps, allowing you to apply common settings like skipping and failure strategies to all members.


### Does Harness encrypt the image tag for the container during rollout deployment output?

No, we don't. Try checking SHA of the tag and find image ID from the output of the service step with the `<+artifact.tag>` expression.


### Does Harness support SSH deployments using the GCP connector like AWS and Azure ?

No, this feature is yet to be supported. We suggest to use ssh key or user and password as data center as an alternative at the moment.


### Is it considered an error when using helm template "--show-only` `templates/secret.yaml my-chart" results in an empty manifest, even though the template exists, and how can one prevent or handle this error message?

It will be feasible for them to consider adding a line at the top of their manifests to prevent rendering to be empty when using helm template `--show-only`. This approach would not only address the error but also provide the advantage of skipping these objects during deployment. For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/ignore-a-manifest-file-during-deployment/#ignore-a-manifest).



### How do we pass the output list of first step to next step looping strategy "repeat", the output can be a list or array which needs to be parsed?

The Output Variable of the shell script is a string, which you are trying to pass as a list of strings, to avoid this :
- First you need to convert your array list into a string and then pass it as an output variable.
- Then convert this string into a list of string again before passing it to the repeat strategy.

For more details, go to [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/repeat-strategy).


### How to carry forward the output variable when looping steps?

If you are using looping strategies on steps or step groups in a pipeline, and need to carry forward the output variables to consequtive steps or with in the loop, you can use `<+strategy.iteration>` to denote the iteration count.


### We need to pull deployments events from Harness to datadog/custom when any PROD deployment is successful.

You can use Webhook notifications to post the pipeline event to an endpoint and you can review and use the JSON Harness posts to your webhook endpoint


### Can I use the same cluster for running the Harness Delegate and containerized step group(s), or is it required to use separate clusters?

Certainly! one has the flexibility to use the same cluster for both the Harness Delegate and containerized step group(s). However, it's important to note that this is not a requirement. Harness is designed to accommodate various deployment scenarios, allowing you to optimize resource utilization based on your specific needs. Feel free to configure your setup according to your preferences and resource allocation strategy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups#important-notes)


### Is there a way to show instances over time in NextGen, similar to the current “Service instances over time” dashboard in First Gen?

Yes, the Instance view per service is visible in the Service Dashboard.
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#services-dashboard).


### Is there any way the user can have custom webhook trigger with placeholders for services, artifacts, tag to provide dynamic values in cURL to execute the pipeline like Next Gen triggers?

Yes, one can use custom webhook triggers with placeholders for services, artifacts, and tags to provide dynamic values in cURL to execute the pipeline. You can pass in this data when the pipeline execution is triggered using a custom cURL trigger. Please read more on custom triggers in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-deployments-using-custom-triggers/)


### How can we trigger a pipeline at specific time?

You can make use of CRON based trigger to execute a pipeline


###  How to setup trigger for on new artifact for JFrog?

You can create a docker connector(using jfrog details) and create a trigger on New artifact of type docker by selecting the jfrog connector created as first step.


### What is the use of terraform-config-inspect binary in delegates?

This binary is used for rendering the terraform code in the CG version and is not used for NG-related deployments.


### How does swapping work for AGS Blue Green deployment?

This is how ASG Blue Green deployment works during swapping routes. If you have a load balancer with 2 listeners, Listener A forwards to Target Group TG1 and Listener B forwards to Target Group TG2, then after swapping routes the result will be as follows:
Listener A forwards to Target Group TG2 and Listener B forwards to Target Group TG1.
This is how traffic is shifting from stage to prod. Listener A - always belongs to stage and Listener B - is to prod, but the TGs should swap.


### Is it possible to retry the entire stage for Timeout Errors in the failure strategy?
At present, We don't have the feature to retry an entire stage in a pipeline, we only allow retry steps for individual steps within a stage of a pipeline for Timeout Errors in failure strategy.


### If the approval step is timed out, Is there any way to continue deployment?

You can use the failure strategy to move the pipeline forward if the approval step is timeout.
On the approval step's advance section, go to failure strategy and use the mark as success to make the step successful and the pipeline will move to the next step.


### What are the best possible ways to create Harness deployment secrets, connectors, pipelines, etc?

Creating resources is totally up to the customer's requirement, we provide all three ways to create Harness resources -
* Via Terraform
* Via UI
* Via API

The docs for API and terraform resource provider and Harness docs. Please go through it and choose the one which best suits your needs -
* [API docs](https://apidocs.Harness.io/)
* [Terraform provider](https://registry.terraform.io/providers/Harness/Harness/latest/docs)
* [Harness docs](https://developer.harness.io/docs/continuous-delivery)


### With the blue green deployment, how do we annotate the service if we have two services to be deployed but only the primary service should be used while switching the traffic?

You can add the annotation ```Harness.io/primary-service: "true"``` for your primary service and dont add any annotation for the secondary service. With this config, Harness will create a third service and your secondary service will be untouched while switching the traffic


### Why my Kubernetes rollout is replacing all pods from the old version without waiting for the new version to surge?

During a rollout, Harness does not change the behavior of how Kubernetes kills and starts pods. This depends on the strategy defined in the maxSurge and maxUnavailable attributes. Please, read Kubernetes documentation for more information.


### Why am I seeing this alert “No values.yaml found for manifest” in my deployment?

When deploying a Kubernetes application type, the system checks for a ```values.yaml``` file as part of the manifest, similar to how Helm evaluates its default values file. If you receive the alert ```no values.yaml found for manifest```, it simply means that your manifest doesn't include a ```values.yaml``` file. This file is not mandatory, and the alert is harmless.


### Does old version to K8S Server (eg. v1.11.10) service deploy get supported in Harness?

Yes, if the deployment versions supported in First Gen was available, the NextGen will be available as well.
For more information, go to [What's supported in Harness Platform](https://developer.harness.io/docs/platform/platform-whats-supported).


### Does Harness provide Salesforce Deployment Template?

Yes, Salesforce deployment template will help users deploy salesforce application and is available for users. For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support).


### How does Harness support Google Cloud Run Deployment Templates?

Google Cloud Run Deployment Templates help in deployment template will help users deploy Google Cloud Run-based services
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#google-cloud-run-deployment-template)


### Does Harness provide template library for Elastic Beanstalk services?

Yes ,Elastic Beanstalk Deployment template is used for deployment template will help users deploy Elastic Beanstalk services.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#elastic-beanstalk---sample).


### Does Harness offer any complex deployment strategies for Serverless Lambda?

No, we soon will have feature for Canary with traffic shifting but most other deployments are at hold.


### when I push to create a new branch, push new code to a branch the trigger does not pick it up?

we have a Feature Flag CDS_NG_CONVERT_BRANCH_TO_PUSH_WEBHOOK_BITBUCKET_ON_PREM for triggers on-premises BitBucket to fire on the first push to a new branch.


### Can we use wildcard for the Github repo name on the trigger of a pipeline?

Providing a repo name creates a GitHub repo URL, So in this case we cannot use wildcard conditions.


### How can we use the Github event type "X-GitHub-Event: pull_request_review"?

You need to create a custom trigger to use the Github event type `X-GitHub-Event: pull_request_review.


### How can one handle credentials rotation policies for AWS connectors that require access key id and secret access key without the usage of delegate?

While a functioning and stable delegate is imperative, it is advisable to prioritize its use. However, if there is a preference for connecting via platform, provided there is an external secrets manager in place and a streamlined process for automatic key updates within that system during rotations, integration through that avenue could be considered.
**Note** 
- Continuous Delivery cannot use the Platform based auth for all the connectors because the deployment jobs run on the delegate. Things like GitHub are feasible, but AWS, GCP, and Azure are not really possible because the credential exchange happens on the delegate.


### Does using organizational environments come with the same limitations observed at the organizational and account levels, particularly regarding the unavailability of the service metric page and rollback features?

The service metrics page is not available for organizational/environment-level services. However, all other features are on par with project-level/ org-level services and environments without limitations. For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/).


###  If the Delegate uses a KubeConfig if we are leveraging KubeCTL, where is the KubeConfig stored on the Delegate on using Terraform?

One may use the command : `export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}`. For more details, go to [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/Harness-variables/#kubernetes-deployment-expressions).


### What is the recommended approach for implementing Terraform dynamic provisioning of infrastructure, specifically in relation to creating the Terraform file without the kube_config specification?

The recommended approach for utilizing Terraform dynamic provisioning of infrastructure involves creating the Terraform file without including the `kube_config` specification. This practice ensures a more effective implementation of Terraform for dynamic infrastructure provisioning.
For more details, go to [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/Harness-variables/#kubernetes-deployment-expressions).


### Why does the trigger execution details API sometimes return a 400 error after initiating a pipeline, and what's the recommended time gap for reliable execution between these API calls?

In the existing process, we await the initiation of the actual pipeline execution. Upon selecting "run pipeline," pre-run checks are performed, followed by the creation of a plan for pipeline execution. The data is returned to trigger only after the execution plan is established. Harness is considering optimizing this process soon by transitioning the execution API flow to an asynchronous model to enhance efficiency.



### What is the cutover strategy for canaries when the labels are immutable and the deployment pre-exists?

Please follow below mentioned steps as a work around:
- deploy same version using Canary with name: `<name>-temp`
- delete deployment `<name>`
- deploy same version using Canary with name: `<name>`
- delete deployment `<name>-temp`
Deletion can be done manually with `kubectl`, or as a one-off in a Harness pipeline.



### How to loop the Command Step on all target hosts?

Use the "repeat" looping strategy with the expression stage.output.hosts after the Fetch Instances step for deployment templates.
This ensures the commands run on each host retrieved via the Fetch Instances step.


### How to trigger a pipeline on another pipeline completion?
The user can add the shell script step with a custom webhook curl at the end of the pipeline to trigger another pipeline.


### How to create a single custom webhook trigger and create multiple input sets for each service and pass it the webhook curl command?
As per the current design service runtime inputs are not configurable in the trigger.


### Is the user can able to roll back the pipeline execution which is marked as success by failure strategy and there are no other previous successful executions?
No, As per the rollback requirement, there should be a previous successful execution.


### How can I easily disable pipeline triggers?
The user can go to the trigger page and disable the trigger with just one click on a button.


### The user would like to be able to deploy multiple artifacts in the same execution and not have to choose only one. Is that possible?
Yes, User can configure the multi-service deployment or else you can configure the parallel stages with the same service with different artifact. Doc: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/#deploy-multiple-services-to-one-environment.



### How to trigger the Harness pipeline when we have a new file getting pushed to MS SharePoint?
As per the current design, there's no out of box solution for this but you can configure custom triggers and provide the webhook in MS Sharepoint.


### I want my step to be skipped if there was failure and we have marked Ignore Failure in failure strategy.

You can have conditional execution, something like `<+pipeline.stages.<<staged>>.spec.execution.steps.<<stepid>>.status> != "IGNORE_FAILED"`


### Is there a way to prevent editing the input set during the rerun of pipelines?

No, currently, there is no way to prevent a user from editing an input set.


### How can I reduce the number of AWS calls during deployment to mitigate issues?

You can optimize your deployment process by reducing the number of AWS calls. Refer to the AWS Connector Settings Reference for information on AWS backoff strategies. Implementing these strategies can help in managing AWS calls and potentially improve the execution of your deployment scripts.



### Getting truncated logs in a pipeline execution.

We do have a pipeline single line limit which is 25KB for a single line in logs. 
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations/).


### How to schedule your deployment?

We have Cron based trigger so that you can execute a pipeline at given time.
For more details, go to [Documentation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/).


### How to get string from `<+eventPayload.repository.name>` in trigger config?

Harness works with JEXL, you can use Java string methods for various tasks. For example, if you want to remove a specific prefix like "PSS.CPN.", you can use this expression: `<+<+eventPayload.repository.name>.replace("PSS.CPN.", "")>`.
 
If the repository name doesn't always start with "PSS.CPN." but the prefix is always the same length, you can try a different method, like this: `<+<+eventPayload.repository.name>.substring(7)>`. This will skip the first seven characters of the string.


### How does Harness NG rollback if something goes wrong in Production. Will it be automatically done or do we need to trigger anything manually?

You can perform rollbacks manually, automatically, or use a hybrid option (triggering it automatically but requiring approval before it happens).
Post-deployment rollback: This can be considered a manual approach, allowing you to rollback deployments that succeeded on technical criteria but that you want to roll back for other reasons. 
Rollback as a failure strategy: This could be considered an automatic approach. Whenever something is deployed into your environment and an issue occurs during the execution, the failure strategy will trigger the rollback flow. This can be a custom flow or a pre-generated one by Harness.


### How does rollback works if there are any configuration related changes like change in env variable between earlier version and current version?

This will depend on your deployment type. Let's suppose you're using Kubernetes. As mentioned in the response to the first question, we're going to revert all the manifests that were changed using a declarative approach or the standard approach (Kubernetes default).
 
For example:
Declarative approach: kubectl apply -f (prevision version of manifest) instead of kubectl rollout undo
Standard: kubectl rollout undo
 
To enable declarative rollback, configure the Harness service options. These options are defined in the service because they are tied to the service's manifests.


### What will happen to running pipeline if deployment freeze is enabled?

If a pipeline is running and a freeze happens, the pipeline will continue to run until the current stage of the pipeline has executed. Once that stage executes, the freeze is implemented and no further stages will execute.


### How to define Helm values files as optional during a deployment?

Currently, we don't support this feature. We're currently working on this feature as a long-term one. For more information, go to [Allow Helm Values files on Deploys to be Optional](https://ideas.Harness.io/continuous-delivery/p/allow-helm-values-files-on-deploys-to-be-optional).


### Which variables should I use to consistently obtain source and target branches using triggers even if the pipeline is run manually?

You can utilize the following codebase expressions to retrieve the PR number, source branch, and target branch:

- `<+codebase.prNumber>`
- `<+codebase.sourceBranch>`
- `<+codebase.targetBranch>`


### Can I use my own release names within each namespace of my cluster, allowing for multiple matching release names across a single cluster, despite the dialogue indicating that release names must be unique across the entire cluster?

Harness utilizes the release name for tracking releases. The release name is crucial as it's used to create the corresponding Harness release ConfigMap or Secret. Therefore, it needs to be unique within each namespace in the cluster. This means you can have the same release name in different namespaces within the same cluster but not within the same namespace.

While you can choose your own release name and using `release-+INFRA_KEY` is not mandatory, we recommend it. This is because there's a risk of errors if users manually assign the same name for different deployments within the same namespace. However, if you ensure each release name is unique per namespace, that approach will work as well.

For example, if you have `app1` as a release name and two different namespaces like `prod` and `dev`, you can deploy using the same `app1` release name in both namespaces.


### Can Harness incorporate a feature that utilizes a tool like bash CLI (e.g., bosh interpolate) to generate the evaluated manifest, perform YAML linting/validation, and enhance the user experience before deployment?

Currently, there is no native step for running the bosh CLI within Harness. The optimal approach would involve creating a custom step that utilizes the CLI for manifest generation.


### How does the default release naming scheme work when deploying multiple Helm charts with the same infrastructure definition?

When deploying multiple Helm charts using the same infrastructure definition, the default release naming scheme can potentially use the same release name for each chart. However, Harness allows for customization of the release name using pipeline variables or runtime inputs. This flexibility ensures that each deployment can have a unique release name, preventing any confusion during the upgrade or rollback of charts.


### Which command does Harness use to apply the manifests during a Blue Green deployment?

We use a kubectl command similar to the one below: `kubectl --kubeconfig=config apply --filename=manifests.yaml --record`


### How can I retrieve the list of files modified in a pull request that triggered a pipeline execution?

The method to fetch modified files varies based on your Git provider, as the payload structure is unique for each provider's trigger mechanism. For instance, when using GitHub, you can obtain the list of modified files within a pull request by utilizing the following expression: `<+trigger.payload.head_commit.modified>`. This approach allows you to access specific details about the changes that initiated the pipeline execution.


### Is there a way to capture the the services that are being deployed as a variable?

If there are multiple services deployed as part of a stage we can get the service name corresponding to each service deployment but there is no built in variable which gives list of all services that have been selected for deployment.


### Can one implement a system that enables customers to define quotas or limits for Service Instances?

No, we don’t have a mechanism to let users cap their service instance below their subscribed amount and have the system warn you. But, one can always bake an OPA policy step that triggers a warning in their pipelines if their quota is reached.
Please read more on OPA policy step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)


### How can one use AWS CodeDeploy Template support at Harness?

The AWS CodeDeploy Deployment Template will allow us to set the infrastructure and the ability to fetch the instances deployed via AWS CodeDeploy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#aws-codedeploy---deployment-template-sample).


### Can a shell script step's output variable be used to determine the failure strategy of the same or subsequent steps in a conditional execution scenario, such as setting a failure strategy based on specific conditions like a DNS name check?

Unfortunately, utilizing the output variable of a shell script step to determine the failure strategy for the same or subsequent steps is not feasible. When a shell script step concludes with a non-zero exit status, the output variable remains unset, precluding its use in subsequent steps or for defining the failure strategy. In such scenarios, reliance on the non-zero exit status is necessary to trigger the failure strategy.
Please read more on Failure Strategy in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/).

### What is the Queue step in Harness?
The Queue step is used to control the access order to the resources during deployment and prevent multiple pipelines from requesting the same resources at the same time.


### How does the Queue step help control resource usage during deployment?
The Queue step prevents collision and queue deployments, ensuring that the first pipeline completes before the second pipeline can continue, thus controlling resource access.


### When should Queue steps be added to a pipeline?
Queue steps should be added whenever the resource you want to protect is used, for example, before the Terraform Apply step in pipeline A and before the deployment step in pipeline B.


### Does Harness support triggers in GitEx?

No, Harness does not support [triggers](https://developer.harness.io/docs/platform/triggers/tutorial-cd-trigger) for GitEx.


### How to diagnose instances where pipeline fails to initiate due to trigger issues ?

If a pipeline doesn't start in response to an incoming event, do the following:

- Check the execution history (select Execution History in the top right of the Pipeline Studio).
- Verify that the runtime inputs are correct.
- Check the payloads sent from the Git provider and compare the relevant fields with your trigger conditions. For example, in GitHub you can view the full payload of each event sent from a specific webhook.

Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/#troubleshoot-Git-event-triggers).


### How to prepare Azure VMSS deployment in Harness ?

Harness provides a template specific to Azure VMSS Deployment which can be referred from the following [Custom Template Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#azure-vmss---deployment-template-sample)


### What is the priority for status of an executed pipeline based on different looping/failure strategies?

Harness has a status calculation logic that works based on the priority of the statuses.
- Negative(abort/failed/expired/errored) statues has more priority. It means if any stage is negative status then the parent would also be marked with that negative status hence the pipeline would also be marked with negative status.
- In negative statuses the priority is
```ABORTED > ABORTED > FAILED > FREEZE_FAILED > APPROVAL_REJECTED > EXPIRED```
- If all the stages are positive(success/ignore-failed) then only the pipeline would be marked with the above statuses.
- The order of priority in positive statuses
```IGNORE_FAILED > SUCCEEDED```
So if a stage is success and other is ignore-failed then pipeline would be marked as Ingore-failed.(Provided no subsequent stages has negative status).
Same goes for negative statuses.


### What are the potential statuses of nodes (stages/steps) when utilizing a looping strategy ?

The [statuses of the nodes](https://developer.harness.io/docs/platform/variables-and-expressions/Harness-variables/#strategy-expressions) (stages/steps) using a looping strategy are `RUNNING`, `FAILED`, `SUCCESS`.

### Can we create a dashboard which shows realtime status of pipeline deployments?

Yes, you can use field "status" in dashboard to check the status of pipeline


### We have a single artifact that is deployed multiple times with different run arguments as different services in parallel in a deployment. When the pipeline is run each service asks to select the artifact tag. They should all be set to the same tag. Is there a way to select the artifact tag once and use it for all 10 of the services?

For the first service you can keep the tag as runtime value, with it also declare a pipeline variable and keep it as runtime input.
 
For all other service, provide the pipeline variable expression as a value for tag.
 
So now when you run the pipeline, the first service will ask for the tag value and you can copy the same tag value to pipeline variable which is also a runtime input which will then be assigned to all other services.


### How is infra key formed for deployments?

The infra key is formed from service Id + environment Id + connector Id +  infrastructure Id


### How to differentiate between infra key if service Id, environment Id, connector Id, infrastructure Id are same to ensure deployments are not queued?

You can either change the connector id (creating duplicate connector with same spec) or Change the secret identifier in case of secure shell deployments.


### How to use Github event type X-GitHub-Event: pull_request_review in triggers

You can use custom triggers and use header conditions to match the attribute type.


### Blue/Green Deployment not scaling back up after Scale Down step.

If a replica count isn't defined on the Deployment, the Scale Down Step will set the replicas count permanently to `0`. Once a replica count is defined on the Deployment, the Blue/Green Swap Step should scale the appropriate Deployment correctly.

If using a `Horizontal Pod Autoscaler` to scale replicas, you can set the `Delete Resources` flag in the Scale Down step to delete the resources instead of scaling them down. This will cause the Staging pod to be deleted so that when a new deployment happens, the pods are scaled appropriately to 1 replica and then picked up by the `Horizontal Pod Autoscaler`.


### How can one obtain the overall status of a group after the looping process, particularly within a multi-environment deployment stage?

Harness provides the overall status after the looping process. The `Expression Engine V2` serves this purpose and was specifically designed for such use-cases.
Please read more on this in the following [Documentation][https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2/]


### In the context of a multi-environment deployment stage followed by a custom notification stage, is there a method to ascertain the status of the deployment stage?

Yes, there is a method to determine the status of the deployment stage within such a setup. Utilizing the Expression Engine V2 facilitates this requirement. Comprehensive information and guidance on this functionality can be found in the provided [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2/)


### How are Service Entities tagged for categorization during deployments, and how do custom dashboards utilize these tags to filter Services and associated pipeline executions?

Service Entities can be configured with tags to categorize the same during deployments. Custom Dashboards now expose Service Tags and Service Execution Tags as a dimension. Visualizations can be configured to filter Services and associated pipeline executions based on Service Tags.
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/).


### Is there a method available to implement a percentage-based repeat strategy for Shell Script Hosts similar to the functionality present in FirstGen?

For a rolling strategy, you specify the desired number of instances to deploy per phase. If you have multiple target hosts in a stage and wish to deploy a certain proportion of instances per phase, you can configure it accordingly. This allows for a flexible deployment approach where the number of instances per phase can be defined either as a count or a percentage.
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#rolling).


### Does Harness support "Skip instances with the same artifact version already deployed" feature on NextGen?

Yes, this feature parity to FirstGen is now available. For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#targetting-specific-hosts-for-deployment).


### How does Harness ensure that the tag fetched in the service step is consistently the latest for both triggers and manual executions?

The expression `<+lastPublished.tag>` sorts the tags lexically rather than by the "created at" date. One can try replacing `<+lastPublished.tag>` with `<+trigger.artifact.build>` in the trigger's configuration ensures that it always fires using the latest collected tag.
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#artifact-limits-and-display-in-the-Harness-ui).


### How to trigger one pipeline from another and use the first pipeline's shell script output as inputs for the second, ensuring runtime inputs like environment and infrastructure names are passed?

One can use output variables from one pipeline as inputs for another, defining the receiving pipeline's variables as runtime inputs.
For more details, go to [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)


### How to fix Invalid argument(s): Loop items list cannot be null?

The error message `Invalid argument(s): Loop items list cannot be null` typically indicates where the loop is expecting a list of items to iterate over, but it receives a null value instead.

If you are using a matrix, repeat, or parallelism looping strategy, it could be that no item is configured or the expression used is not returning the correct set of values and resulting in a null.


### Why did my Artifact Triggers stop working?

If Artifact Triggers stop working, it's possible that the Perpetual Task assigned to poll the artifact has gotten into a bad state. To reset the Perpetual Task so that new artifacts can be polled, disable all triggers pointing to the same Artifact and then re-enable them. Perpetual Tasks are shared across all triggers pointing to the same artifact so disabling all of them and re-enabling them will create a new Perpetual Task to poll the artifact.


### Can we configure looping strategy on the stage if the stage is created from a stage template?

We have to do looping configuration inside the template itself as the stage will not have the looping configuration if it is created from a stage template.



### How I can add runtime generated override file to a service before helm rendering?

The values file resolution will only happen once the actual deployment step runs. We can add values.yaml override from file store or any other source repo in the manifest and update the values.yaml using api call or cli with dynamic information. If we want to use any output variable from the pipeline we can use the same expression directly in the values.yaml and while fetching the file the expressions will be resolved. We just need to ensure that the steps from where the output variable expressions are copied executes before the actual deployment step runs.


### What does fetch file step in helm deployment actually fetches?

The fetch file step in the helm deployment fetches all the values.yaml and expands any variable expression that have been used inside the values.yaml.


### What does this expression ```<+trigger.payload.service.tag.name>``` do?
This expression resolves the service tag name as used as a part of the custom trigger.


### lastPublished.tag does not support alternate branch name strategy?
Harness does not always look for a master for lastPublished.tag. The successful services have their Git artifacts ending with -master. But I believe the failed one does not have any tag that ends with the master but may be -the main.

This is coming from your trigger settings and the input given here is to check for `<+lastPublished.tag>.regex(-master$)`.

Please change the value to `<+lastPublished.tag>.regex(-main$)` if the tags end in -main only for this service.


### What does expression infra.variables.projectID mean?

There are no variables inside an infrastructure definition. But, When you are using a custom deployment template in your infrastructure you can use variables inside that.


### Trigger is getting disabled for Pipelines which are not saved in the Default Branch.
To enable triggers for other branches in the Harness pipeline, you'll need to create a trigger for each branch you'd like to enable. You can follow the same steps as creating a trigger for the default branch, but specify the branch name in the Pipeline Reference Branch field in the Trigger Input Repo tab.
This will ensure that the trigger uses the pipeline and input set definitions in the branch specified in the webhook payload.
You can refer to the below docs for more details:
- [API](https://developer.harness.io/docs/platform/Git-experience/manage-input-sets-in-simplified-Git-experience) 
- [API](https://developer.harness.io/docs/platform/Git-experience/manage-a-Harness-pipeline-repo-using-Git-experience)


### What does exit status 1 mean?
A Harness pipeline returning exit status 1 typically signifies an error during execution, such as compilation/build failures, test errors, deployment issues, or integration problems. Diagnosing specific issues requires reviewing logs and error messages.


### Does Harness support multiple IaC provisioners?
You can refer to this documentation to know what all IaC provisioner Harness supports -[API] (https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/provisioning-overview/#dynamic-provisioning-and-deployment-type-support-matrix)


### How to move pipeline from one project to another?

You can try the following steps:

Export the pipeline from the source project as a YAML file.
Import the YAML file into the target project.
Update any references to input sets or other entities that may have changed due to the move.
Test the pipeline in the target project to ensure it is working as expected.


### How to trigger a pipeline on a pipeline completion?

You can add the curl command from the trigger at the last step of the current pipeline to trigger the next pipeline.


### what is the pipeline retry interval in Harness?

When you set the failure strategy to Retry Step, you can specify the retry count for a step or all steps in the stage. [Doc](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/#retry-count-expression)


###  How to ensure a stage with a step group appears before a stage with a deployment of kubernetes?

You can create a OPA policy to ensure this.


### What image tag expression should be used for periodic deployment of a binary version triggered by cron?

If it's not a custom trigger, use `<+trigger.artifact.build>` in the image tag field. Otherwise, reference the payload JSON to construct the expression.
For more details, go to [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#using-the-triggerartifactbuild-and-lastpublishedtag-expressions).


### Can one deploy Salesforce component without using S3 bucket ?

Yes, one can deploy using custom artifact without using the S3 artifact. For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support).


### How can variables/outputs be accessed between steps using the looping strategy, especially in dynamically provisioned infrastructure scenarios like Terraform within a Deployment stage?

Use `<+pipeline.stages.Deploy_<+strategy.iteration.toString()>.spec.provisioner.steps.TerraformApply.output.logic_app_callback_url>` to reference dynamically provisioned infrastructure within the same stage in a looping strategy.
For more details, go to [Documentation](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).


### Can we trigger all executions in all organizations?

We cannot trigger all pipelines at once in an org or project.


### What is allowSimultaneousDeployments?

In Harness, the `allowSimultaneousDeployments` setting in the infrastructure definition YAML file that controls whether multiple deployments can occur concurrently on the same infrastructure. When set to true, Harness permits simultaneous deployments, allowing multiple deployment pipelines to execute concurrently without waiting for each other to finish. Conversely, setting it to false restricts simultaneous deployments, ensuring that only one deployment can occur on the infrastructure at a time. This choice depends on specific deployment requirements and infrastructure capacity, as enabling simultaneous deployments can expedite the deployment process but may require careful consideration of performance and stability implications.


### What is a matrix looping strategy?

A matrix is a looping strategy in Harness that iterates over a series of elements. It can be used in stages or steps to repeat a set of actions for each element in the matrix. Matrices can be one-dimensional or multi-dimensional and can be customized with maxConcurrency and nodeName settings. You can use expressions to reference matrix values in your steps. The current status and live status expressions can be used to retrieve the current execution status of looping strategies for nodes in a pipeline or stage. The Git Experience in NextGen supports storing matrix configurations in a Git repository.

Sources: [Additional matrix examples](https://developer.harness.io/docs/platform/pipelines/looping-strategies/additional-matrix-examples), [Harness variables](https://developer.harness.io/docs/platform/variables-and-expressions/Harness-variables), [API](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).


### Does the change in config trigger deployment again?

If you have setup a webhook trigger, then yes for the push event if the config changed is of the pipeline and GitEx project.


### JEXL to skip an item in repeat looping strategy?

To skip an item in a repeat looping strategy using JEXL, you can use an if condition within the repeat block. For example, if you want to skip the second item in the repeat list, you can use the following JEXL expression:

```
repeat:
  items:
    - item1
    - <% if (strategy.iteration != 1) { %>item2<% } %>
    - item3
```

In this example, the if condition checks if the current iteration is not equal to 1. If it is not equal to 1, then the item ""item2" is included in the repeat list. If it is equal to 1, then ""item2"" is skipped and the repeat list continues with ""item3""."


### Can a Harness pipeline triggered by a webhook on a pull request determine the specific files modified in the pull request?

Yes, when a Harness webhook is triggered by a pull request, you can identify the modified files within the event payload under the `"changedFiles"` key. To access this information, navigate to Trigger and then Activity History within Harness.


### We need an option of kubectl replace command in kubernetes Rolling Deployment?

Currently, this feature is not available in the Harness Platform but there is an enhancement request for this in the [Harness ideas portal](https://Harness-io.canny.io/continuous-delivery/p/need-an-option-of-kubectl-replace-command-in-kubernetes-rolling-deployment).


### What is the recommended way to name Kubernetes jobs in Harness pipelines when using Rolling Deployment and native Helm deployment for the same chart?

When deploying Kubernetes jobs in Harness pipelines, especially when utilizing Rolling Deployment alongside native Helm deployment for the same chart, it's essential to adopt a consistent naming convention for jobs to ensure successful tracking and management. While applying a unique suffix such as `{{ now | unixEpoch }}` can facilitate parallel job execution during Rolling Deployment, it can lead to tracking issues when Helm renders the chart with a different job name.

The recommended approach is to use a naming convention that accounts for both scenarios.

For Rolling Deployment, maintaining a unique suffix like `{{ now | unixEpoch }}` is suitable.

For Native Helm deployment, it's advisable to utilize a name that remains consistent across deployments, such as `job-migration-db-{{ .Release.Revision }}`.


### Is Custom Stage considered a Continuous Delivery stage? Is execution of a pipeline without any Service entity considered towards Total deployments?

Yes, we consider Custom stage as part of CD stage as of now to update the dashboards, and a deployments without Service is not possible for CD Stage hence it would not be considered towards total deployments
Please read more on custom stages in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage)


### What is the correct expression to reference artifact version in rollback phase?

One can use the expression `rollbackArtifact.version` . This is a change from FirstGen to NextGen where rollback artifact version was getting automatically resolved
Please find an example use case on this in our [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#pipeline-sample-setup---cicd)


### Is there a way to see which user acts on the wait step to mark it as a success or mark it as fail?

One can look at having Harness approval step in addition to wait step for this use case, also can set a failure strategy in case it timeout
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-Harness-approval-steps-in-cd-stages/#add-approval-step)


### Why am I getting an error that my trigger has empty or missing pipelineBranchName?

```
Failed while requesting Pipeline Execution through Trigger: Unable to continue trigger execution. Pipeline with identifier: $PIPELINE_ID, with org: $ORG, with ProjectId: $PROJ, For Trigger: $TRIGGER has missing or empty pipelineBranchName in trigger's yaml.
```

If you've recently migrated your Pipeline and Input Set(s) from Inline to Remote, you may encounter this error. To fix this, the Trigger needs to reference a Remote Input Set. It is required for Triggers to reference a Remote Input Set when using Remote Input Sets and Remote Pipelines.


### Why can't I see any Harness Status Checks in my Github Branch Protection Rules after I already setup the trigger?

To get Harness Status Checks to show up in the Branch Protection Rules, you'll need to trigger the Harness Pipeline at least once with a Pull Request first. Only then can you see the Harness Status Checks in the Github Branch Protection Rules and enforce it on branches.



### How do I setup a Pipeline Trigger for Tag and Branch creation in Github?

The out of the box Github Trigger type does not currently support this however, you can use a Custom Webhook trigger and follow the below steps in order to achieve this. 

1. Create a Custom Webhook trigger
2. Copy the Webhook URL of the created trigger
3. Configure a Github Repository Webhook pasting in the URL copied from Step 2 in the Payload URL
4. Set the content type to `application/json`
5. Select `Let me select individual events.` for the `Which events would you like to trigger this webhook?` section
6. Check the `Branch or tag creation` checkbox

### Is it possible to loop over multiple stages?

No, looping over the stage set is not possible. You will have to create an individual looping strategy for each stage.

### How to troubleshoot "Invalid request: Invalid Load balancer configuration in Service." error?

This can happen in following cases:
- No target groups attached to LB
- Multiple services attached to target groups
- Service is attached to both target groups
  
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#visual-summary).


### Can I create dynamically create parallel steps based on a condition?

You can use Harness expressions in looping strategies to achieve this.


### What does this error message mean: "Invalid request: Trying to run more than 256 concurrent stages/steps."?

This error message occurs when your pipeline attempts to run more than 256 steps at once. This can be caused by a looping strategy creating parallel or matrix steps.


### How can I determine if a step is being retried during execution?

One can utilize the expression `<+execution.steps.STEP_ID.retryCount>` to determine if a step is being retried during execution, this helps in handling retries within your pipeline.
For more details, go to [Retry count Expression](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/#retry-count-expression).


### How should customers handle updates to image versions if they mirror our images?

Customers who mirror our organization's images should follow a protocol where they have a one-month window to conduct security scans or other tests on new CI build images before deployment. Harness publishes new versions of required images every two weeks, and each image is backwards-compatible with the previous two releases.
For more details, go to [Harness CI Image updates ](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/Harness-ci/#Harness-ci-image-updates).


### How does marking a Pipeline as Failed differ from aborting it?

Marking a Pipeline as Failed provides a more controlled approach, allowing users to trigger specific Failure Strategies while maintaining the integrity of the Pipeline execution process. For more details, go to [Marking a pipeline as failed](https://developer.harness.io/docs/platform/pipelines/failure-handling/mark-as-failed-pipeline/#marking-a-pipeline-as-failed).


### How do I get the index of a looping strategy?
You can use the `<+strategy.identifierPostFix>` expression to get the index of a strategy. For more information, go to [identifierPostFix expressions](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism/#identifierpostfix-expressions) documentation.


### How do I get the action of my Git trigger in an expression?
Git triggers use webhooks, and webhooks usually have a payload that you can utilize. The action used to trigger the webhook must be included in the Git payload so that you can reference the action using the `<+trigger.payload.action>` expression.




### How are the statistics on the Continuous Delivery overview page calculated?

The [Continuous Delivery overview page](/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments#overview-and-services-dashboards) displays statistics for deployments and services that can sometimes seem unreasonable or incorrect. However, these numbers are correct and are generally caused by the time frame that the statistic is measured over. 

For example, say that we have a statistic `failure rate` that is measured over 30 days. Then we collect the following data:

Days 0 - 30 `failure rate`: 5%
Days 31 - 60 `failure rate`: 15%

Then when displaying the `failure rate` for the last 30 days you would see `15%` and you would see that your `failure rate` increased by `300%`!
So the statistic will have a red arrow pointing up marked as a `300%` increment in failure rate. 

This value accurately measures the change in the failure rate, from 5% to 15%. 


### Why am I getting an invalid request when trying to get the deployment status of a pipeline?

```
Invalid request: Trigger event history doesn't exist for event with eventId 123456789012345678012346 Exception occurred: Trigger event history doesn't exist for event with eventId 123456789012345678012346
```

If you are receiving the above error even after you've confirmed that the pipeline was triggered, it's possible that you triggered the API to lookup the status of the deployment faster than when the deployment actually happened. To fix this, add a `sleep` to your script or wait a few seconds before using the API to ensure ample time for the pipeline's status to register, and be queried.


### What options are available for freezing deployments in Harness?

In Harness, you can freeze deployments at different levels such as project, environment, or organization.


### Can I update a cron trigger programmatically?

Yes, you can use the [Update Trigger endpoint](https://apidocs.Harness.io/tag/Triggers/#operation/updateTrigger) and pass the entirety of the updated trigger YAML (including the updated cron expression) in the body.

### How can I access the list of pipeline executions from the last 24 hours?

You can use the API provided by Harness to get a list of pipeline executions. Specifically, the Pipeline [Execution Details API](https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getListOfExecutions) allows you to retrieve the list of executions. You will need to process the API response to filter the results by date to get executions from the last 24 hours.

### Is there an alternative way to list pipeline executions if audit events are enabled?

Yes, if audit events for pipeline executions are enabled (which include events like Pipeline Start, Pipeline End, Stage Start, and Stage End), you can use the [Audit Events API](https://apidocs.harness.io/tag/Audit#operation/getAuditEventList) to list the executions. To enable capturing these events, you must turn on the "Enable Pipeline Execution Audit Events" setting under the pipeline category in the account-level settings.

### What happens when the Connector URL for a job execution option is enabled in Jenkins step?

When the Connector URL for job execution is enabled, the system uses the connector URL for the host part of the API calls. This means that instead of using the internal IP address returned in the first API call to Jenkins, the system will use the predefined connector URL. This approach ensures that the job trigger URL is reachable, avoiding issues caused by internal IP addresses that may not be accessible from your environment.

### How does enabling the Connector URL option affect the job execution process in Jenkins?

Enabling the Connector URL option affects the job execution process by modifying the way the job trigger URL is formed. Instead of using the internal IP address from the job URL obtained in the first API call, the system will only take the job identifier details from the response. It then combines these details with the connector URL to form the second API call URL. This ensures that the URL used to trigger the job is correct and reachable, preventing potential failures due to inaccessible internal IP addresses.

### Why is my rollback step being skipped even though I don't have an execution condition?

This can happen if the `If the pipeline executes successfully up to this point (default)` option is selected in the **Conditional Execution** configuration of the step. If this option is selected, the rollback step won't be able to run due to the failure of the pipeline. By default, rollback steps are only run if the pipeline deployment fails. When this option is selected for a rollback step, the pipeline would not have executed successfully causing the step to be skipped.

### Why is my helm deployment failing with a `resource name may not be empty` error even though the `helm template` command works fine?

```
Error INSTALLATION FAILED: rendered manifests contain a resource that already exists. Unable to continue with install: could not get information about the resource Deployment "" in namespace "$NAMESPACE": resource name may not be empty
```

This issue is caused by a misconfiguration in the helm chart files. Either the `values.yaml` file or helm manifests themselves is not properly formatted or providing a valid value for a resource name. `helm template` does not lint helm charts or check for syntax errors. `helm template` only returns the output of the helm chart exactly how it is defined. To resolve this, try using `helm lint` on the manifest files and checking if there are any linting issues with the helm chart.


### Will the ECS deploy feature create new resources based on the service configuration file like service/task/scaling policy/scaling target or do we need to create the infra before ECS deploy?

Yes, ECS Deploy will deploy any files specified in the service. If a service/task/scaling policy/scaling target are specified, the ECS Deploy stage will deploy all of those. If you only specify a scaling target, ECS Deploy will only deploy that single resource. 


### Why am I getting a `stageIdentifier` error when creating a trigger through the Harness API?

```
Failed while Saving Trigger: stageIdentifier can not be blank/missing. artifactRef can not be blank/missing.
```

This error happens when specifying the `withServiceV2` parameter of the API. By default, this value is `false` however, if using ServiceV2, it needs to be set to `true`.


### Why can't I set an output variable in Harness using a python script in a script step?

If an environment variable is set in a Python script, it will not be available in the Bash script for consumption. In Unix-like systems, a child process (such as a Python script) cannot directly modify the environment of its parent process (such as the shell that runs the Python script). In order for the Bash script to consume the variable from the child Python script, the Python script would have to return that value. For example,
```
MY_VARIABLE_HERE=$(python3 my_python_script.py)
```

The other method would be to write a shell script in the Python script for Bash to consume the variables.
```
import os

# Set environment variable
os.environ["MY_ENV_VAR"] = "test"

# Write the environment variable to a file
with open("/tmp/env_var.sh", "w") as file:
    file.write(f"export MY_ENV_VAR={os.environ['MY_ENV_VAR']}\n")

print("Environment variable MY_ENV_VAR set to:", os.environ["MY_ENV_VAR"])
EOF
```

### Why did my artifact trigger my pipeline only once?
If artifacts aren't triggering pipelines even though there were multiple artifacts pushed, it may be due to the `Execute Triggers With All Collected Artifacts or Manifests` configuration option. By default, artifact triggers are configured to only trigger once if more than one artifact or manifest is returned in a 1 minute interval. This configuration option allows triggers to execute for each artifact or manfiest collected regardless of the polling interval. To enable this feature, go to your Harness project/org/account **Default Settings**, select **Pipeline**, and then enable **Execute Triggers With All Collected Artifacts or Manifests**.

For more information on this topic, go to [Trigger pipelines on a new artifact](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#important-notes) documentation
