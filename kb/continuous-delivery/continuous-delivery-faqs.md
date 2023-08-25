---
title: Continuous Delivery & GitOps FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps.
redirect_from:
  - /faqs
  - /ci-faqs
# sidebar_position: 2
---
# FAQ

This article addresses some frequently asked questions about Harness Continuous Delivery (CD).



#### How to use the "for" condition while using jexl condition for the trigger?

Suppose that trigger payload has multiple records and you want to search for a particular string so you can make use of jexl for loop to iterate the list and match a string as below:

`for (item : <+trigger.payload.commits>) { if (item.message == "mymessage") {return true;} }; return false;`


#### How to use the token for OCI repo in AWS ECR as the token by default expires every 12 hours?

We can set up the AWS Secret Manager connector, then save the ECR auth token into it. Set up automatic token rotation (say at 10hr intervals) within AWS secret manager. Then have the Harness connector link to that AWS SecretManager secret, so it pulls a fresh token every time.


#### In First Gen we use WINDOWS_RUNTIME_PATH while setting up a runtime directory, what is the corresponding way in Next Gen?

In NG we are not using any setup variables anymore, since it is Harness's internal step where we basically create a temp dir for the execution. We are creating a working directory in the Command Init unit on this %USERPROFILE% location.


#### In templateInput window why do we only show variables that have runtime input and not the ones which have a static value for input?

We only show runtime because we intend to show the user what is required of them for input.
The form gets too long if we expose all the fixed values and we only require in the form the ones which need input and not what has already defined values.


#### How do we clean the state file for Terraform if there is no remote backend configured?

For the terraform step if the remote backend is not configured, the state file is being managed by Harness and it maps to the provisioner identifier itself. Hence the only way to get rid of the state file is to change the provisioner identifier in this scenario.

#### How to use reference modules in sub-directories as part of a Terraform step? 

In Harness, users may want to reference sub-modules as part of a Terraform step. Here is a sample code as part of the tf file that can be utilized:

module "transit-gateway" {
  source = "git::https://gitlab.com/rubrik-octo/lab/source-modules.git//site-deploy/transit-gateway"
}

Here you see a single git repository named 'source-modules, that has multiple modules inside various folders. By using the '//' at the end of the source location, you can instruct Terraform to checkout a specific folder. 


#### Do we need to install jq library in delegate machine or harness itself providing jq by default?

Harness by default does not provide by default the jq on delegate host. You need to add the below command in your INIT_SCRIPT for this.

```microdnf install jq```

#### Can plan from terraform step be encrypted using a read only secret manager ?

For encrypting terraform plan with the selected secret manager we need the ability to write the encrypted plan to the secret manager and hence read only secret manager will not work for this scenario.


#### What operations are performed as part of the cleanup step in ssh command task.

For SSH, we by default add an initialize step and a clean step apart from command execution step. As part of the cleanup step we we delete the working directory that lies within /tmp on the remote connected host.

#### Whether pipeline GitHub triggers support for project variable reference?

Pipeline GitHub triggers won’t support project variable reference. As trigger yaml is independent of the pipeline yaml and the trigger will not be aware of the expression output. 

#### Is it possible to use conditional execution in looping strategies?

If you use a looping strategy then you will not be able to apply conditional execution on the child steps.

#### How to upload a file into a specific folder present in the harness filestore from the pipeline stage (PowerShell script)?

This can be achieved by using an API which you can invoke using PowerShell https://apidocs.harness.io/tag/File-Store/#operation/create

#### How to Use Expressions or Variables in Repeat Looping Strategy?

To pass a dynamic array as an input to the looping strategy of the next step, you can replace <+execution.steps.ShellScript_1.output.outputVariables.ARRAY1> with <+<+execution.steps.ShellScript_1.output.outputVariables.ARRAY1>.split(",")>. This change allows you to split the array into individual items using a comma as the delimiter.

#### Why the "Always Execute this Step” condition does not always run in the CD pipeline?

Always execute step runs regardless of success or failure but in order to trigger this condition on failure the previous step should be considered as failure, if the error is rolled back then it is not considered a failure. Hence, the next step's Conditional Execution is not executed. Therefore, a failure strategy such as “Mark as failure” or "ignore failure" is required.


#### Can we retain more than 2 older release secrets and config maps?

No, Harness uses a fixed limit of 2 in its release history cleanup logic. This value cannot be changed. 

See - https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes


#### What happens if my manifest files are changed during pipeline execution, will harness pick the latest file?

The files are fetched only during the execution step i.e. during rollout. if the files are changed and committed before the "Fetch file" step is executed in the rollout phase, Harness will pick the latest file.


#### Can I encrypt the Token/Secret passed in the INIT_SCRIPT?

Directly this cannot be encrypted but this use can be achieved by creating the k8s secret for the credentials and referring them in the init script.

**example** -

``` aws_access_key=kubectl get secrets/pl-credentials --template={{.data.aws_access_key}} | base64 -d```
```aws_secret_key= kubectl get secrets/pl-credentials --template={{.data.aws_secret_key}} | base64 -d```


Another approach would be saving the value in Harness's secret manager/any other secret manager and referencing it in the script.
Check this for more info - https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets


#### K8s delete command is not working with the native helm?

The K8s delete command/step does not work with native helm deployment because Harness has different logic to maintain versioning and rollback for native helm and k8s.In the case of the native helm, If the deployment fails, we’ll uninstall it ourselves. However, if the user wants to pass some command flags with Uninstall, that can be passed by selecting Uninstall and passing the relevant command flags. 

Check this for more details - https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#uninstall-command-flag


#### How do I run helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment. you can leverage the shell script step and run the helm uninstall ```release-name``` command from the delegate onto the cluster.
To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate. 

For this use case within the shell script, you can simply reference credentials as ${HARNESS_KUBE_CONFIG_PATH}

```export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test```

With this even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.

#### In the Rollout Deployment step, how Harness retrieves the events in the Wait for Steady State phase?

During the "Wait for Steady State" phase, Harness retrieves events using the ```kubectl rollout status``` command, which retrieves information directly from the Kubernetes API server. Harness continuously polls the Kubernetes API server while a rollout is in progress, ensuring that it remains updated until the rollout is either completed or encounters an error.

#### When migrating from FirstGen to NextGen, will the release number of ConfigMaps and Secrets be reset to 1?

In the case of migrating from Harness FirstGen to Harness NextGen, the numbering of `ConfigMaps` and `Secrets` in Kubernetes will not be automatically reset to start from 1 again. The numbering is based on the release history and is incremented based on the latest release number.

When you migrate your application to Harness NextGen and continue to use the same release name as before, the versioning will not be reset. Harness will fetch the `ConfigMap` in the cluster that stores all the Harness releases with their respective numbers. It will retrieve the latest release number from the `ConfigMap` and increment it by 1 for the next deployment. If versioning is enabled, Harness will append `-<release-number>` to each `ConfigMap`/`Secret` declared in the manifest.

Therefore, if you migrate to Harness NextGen and use the same cluster and release name, the release number will not break. The numbering will continue based on the existing release history.

It's important to note that Harness provides a declarative rollback feature, which eliminates the need for resource versioning. This means that even if you don't maintain the numbering scheme, you can still perform rollbacks effectively using the declarative rollback feature provided by Harness.

For more information, you can refer to the documentation on declarative rollback in the link provided: [Harness Declarative Rollback](https://docs.harness.io/article/6y7xs2rh5a-declarative-rollback).

#### How can I turn off FG (First Generation) responses or remove the switch to CG option?

To disable FG responses, please follow these steps:
1. Go to your account settings.
2. Locate the "Allow First Gen Access" option.
3. Turn off the "Allow First Gen Access" setting.
4. Once disabled, the "Launch First Gen" button will no longer be visible, and you will no longer receive FG responses.

#### We have multiple accounts, like sandbox and prod, and we want to move the developments from sandbox to prod easily. Is there a solution for this?

Absolutely! We recommend customers to use test orgs or projects for sandbox development. Our hierarchical separation allows them to isolate test cases from production workloads effectively.

For pipeline development concerns, we have a solution too. Customers can utilize our built-in branching support from GitX. You can create a separate branch for building and testing pipeline changes. Once the changes are tested and verified, you can merge the changes into their default branch.

Sandbox accounts are most valuable for testing external automation running against Harness, which helps in building or modifying objects. This way, you can test changes without affecting production environments.

#### Can you provide an example of deploying the delegate in a task-definition for ECS (Amazon Elastic Container Service)?

Certainly! You can find a step-by-step guide on how to deploy the delegate in a task-definition for ECS on our official documentation page: [link to documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/docker-delegate-to-ecs-fargate/).

Additionally, we have a GitHub repository with a Terraform module that demonstrates the process of deploying the delegate in ECS Fargate: [link to GitHub repository](https://github.com/harness-community/terraform-aws-harness-delegate-ecs-fargate/tree/main). This resource can further assist you in implementing the delegate deployment.

#### What are the main differences between using JSON and YAML as a Values file for GO Templating?

1. YAML 1.2 does not allow tabs for indentation.
2. YAML imposes limitations on key lengths.
3. YAML uses some different unicode escape sequences.

However, apart from these differences, basic JSON documents are considered valid YAML and can be used with GO Templating.

#### Under what condition does an immutable delegate automatically upgrade?

AutoUpgrade initiates when a new version of the delegate is published, not when the delegate is expired.

#### Under what condition does an immutable delegate automatically upgrade?

AutoUpgrade initiates when a new version of the delegate is published, not when the delegate is expired.

#### Is there an environment variable to set when starting the container to force the Docker delegate to use client tool libs from harness-qa-public QA repo?

To achieve this, you need to create a test image that points to the harness-qa-public QA repository. This involves updating the Docker file with the appropriate path to the QA buckets.

#### Is there a method to simulate CloudFormation changes without actually applying them?

Yes, you can achieve this by utilizing the Change Set Feature. First, create a change set to preview the changes that will be made. Once you are satisfied with the preview, you can execute the change set using the command: [aws cloudformation execute-change-set](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/execute-change-set.html). This allows you to assess the impact of the changes before applying them.

#### Is it possible to include FirstGen measures and dimensions in custom dashboards using NextGen dashboards?

Yes, NG Dashboards support CG (Custom Group) Data, and you can create custom dashboards with FirstGen measures and dimensions using the "create dashboard" option.

#### What steps are involved in obtaining output from a chained pipeline for use in a different stage?
 
To get output from a chained pipeline and utilize it in another stage, you need to specify the expression of the output variable for the chained pipeline at the parent pipeline level in the output section.

### If I delete an infradef after deployments are done to it, what are the implications other than potential dashboard data loss for those deployments ?

At the moment there is no dependency on the instance sync and infrastructure definition. Infra definition is used only to generate infra details the instance sync itself is done for service and environment, only in case if any these are deleted the instance sync will stop and delete instances.

**Note:**
If you are using the default release name format in Harness FirstGen as `release-${infra.kubernetes.infraId}`, it's important to note that when migrating to Harness NextGen, you will need to replace `${infra.kubernetes.infraId}` with the new expression.

In Harness NextGen, a similar expression `<+INFRA_KEY>` is available for defining release names. However, it's crucial to understand that these expressions will resolve to completely different values compared to the expressions used in Harness FirstGen.

#### Is it possible to have drop down options for multiple input?

You can make the variable as Input and  define multiple allowed values by selecting checkbox Allowed values

#### How to Make a Pipeline Failure or Step Failure if some condition is not passed In Bash script?

You can set below in script ```set -e``` - Exit immediately when a command fails, or you can set exit code to non zero if certain conditions match and that should fail the step.

#### Is there an easy way to see all the recent deployments of that workflow that have run?

You can use deployment filter and select the workflow and time range and you will able to see all the deployment for that workflow within that time range

#### Is there any  option to execute HTTP steps on the target environment?

As HTTP step is meant to connect over http protocol, delegate can initiate http sessions and get the response as per request setup so using target environment will not help.

#### WINRM Download artifact is not working in NG, after setting correct environment variables(HARNESS_ENV_PROXY and HTTP_PROXY).

Please check the delegate version used as this feature was released with delegate version 791xx and make sure in console logs you are able to see Using HTTP_PROXY environment variable.

#### Error with release name too long

In the deployment logs in Harness you may get an error similar to this:

```
6m11s Warning FailedCreate statefulset/release-xxx-xxx create Pod release-xxx-xxx-0 in StatefulSet release-xxx-xxx failed error: Pod "release-xxx-xxx-0" is invalid: metadata.labels: Invalid value: "release-xxx-xxx-xxx": must be no more than 63 characters
```

This is an error coming from the kubernetes cluster stating that the release name is too long.  This can be adjusted in Environments > click Name of the Environment in Question > Infrastructure Definitions > click Name of the Infrastructure Definition in Question > scroll down > expand Advanced > modify the Release name to be something shorter

#### Pipeline GitHub trigger support for project variable reference?

This is not possible as trigger yaml is independent of the pipeline yaml and the trigger will not be aware of the expression output.

#### Procedure to take backup of the Services

We do not have any backup ability for services out of the box but you can take the backup of service yamls and use them later for creating service if there is any issue with the service.

#### Harness FirstGen Graphql API to create Harness pipelines in a specific application

We do not have a way to create a new pipeline using Graphql in FirstGen. However, we do support API to create Harness pipelines in NextGen.

### Do we support rollback of deployment post production ? 

Yes, certainly we have that capability, to know more about this please see, [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/rollback-deployments/)

### How can I override the lite-engine image for the Container Run step,to pull images from ECR instead of docker hub? 

Yes, certainly that can be acheived by using Docker Connector with your registry URL and anonymous access would help you to acheive that.

#### How can only set of user able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/#select-approvers)


#### How Kubernetes Pruning option work during the deployment?

If you have enabled the Kubernetes Pruning in your deployment. In that case, it will remove any resources that were present in an old manifest but are no longer present in the manifest used for the current deployment.

For reference: [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/) 


#### How release: {{ .Release.Name }} will help in steady state check in helm deployment?

We perform a pod fetch based on this label, which allows us to show deployed pods in the step output and also track the same for instance sync. If we don't add these, both won't work as expected.

For reference: [Steady state check](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/#spec-requirements-for-steady-state-check-and-versioning)


#### Where we need to add label release: {{ .Release.Name }}?

For any manifest object which creates the pod, you have to add this label in its spec. Adding it in Service, Deployment, StatefulSet and DaemonSet should be enough.


#### What does the release name mean in the Infrastructure?

The release name is used to create a harness release history object, which contains some metadata about the workloads. This helps us perform the steady state check.

#### I have a pipeline in CG that has a variable of ${artifact.buildNo} in a command and same variable is not working in NextGen.

You can use artifact.tag in NG , which is equivalent to artifact.buildNo from CG, you can find more details around mapping as below:
https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#migrating-firstgen-expressions-to-nextgen 

#### Is it possible to apply Notification Rule on Environment level for workflow failure/success

Workflow Notification strategy we can only interpret below field so all the notification rule will be applied on workflow level
Condition,Scope, User Group

#### Does Harness support cloning "Instance type requirements" and "Instance purchase options" from base ASG in CG

No, We do not support copying of these properties in CG. All of them come under the MixedInstancesPolicy property of an Auto Scaling group which we do not copy from base ASG.
Allocation strategies & Instance purchase options come under the InstancesDistribution property of MixedInstancesPolicy.


#### Would it be possible to be able to modify the looping stage runs inside of pipeline execution

You can use Matrix strategies, there you can use labels:
To use the matrix labels naming strategy, do the following:
1. In Harness, select Account Settings.
2. Select Account Resources, then select Pipeline.
3. Set Enable Matrix Labels By Name to true.
4. Select Save.


#### I have a placmenetStrategy defined but I don't see it reflected in the task.

As placmenetStrategy can be defined in task definition as well as in service definition. Harness picks placmenetStrategy from service definition, so please make sure its added under service definition.

#### How do you determine the number of service instances/licenses for our services?

We calculate service licenses based on the active service instances deployed in the last 30 days. This includes services from both successful and failed deployments. This includes if the Step involving a Service was skipped during a Pipeline execution.

#### What is considered an active service instance for license calculation?

An active service instance is determined by finding the 95th percentile of the number of service instances of a particular service over a period of 30 days.

#### How are licenses consumed based on the number of service instances?

Each service license is equivalent to 20 active service instances. The number of consumed licenses is calculated based on this ratio.

#### Is there a minimum number of service instances that still consume licenses?

Yes, even if a service has 0 active instances, it still consumes 1 service license.

#### Are the licenses calculated differently for different types of services, such as CG and NG?

No, the calculation method remains the same for both CG (Continuous Delivery) and NG (Next-Generation) services.

#### Can you provide an example of how service licenses are calculated based on service instances?

Sure! An example of the calculation can be found in the documentation [here](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#example). This example illustrates how the number of service instances corresponds to the consumed service licenses.

#### Is on-demand token generation valid for both Vault's Kubernetes auth type and app role-based auth?

No, on-demand token generation is only valid for app role-based auth.

#### How can I upload a file to a specific folder in the Harness file store from a pipeline stage using PowerShell script?

You can achieve this by invoking the Harness API using PowerShell. The API endpoint you need to use is: https://apidocs.harness.io/tag/File-Store#operation/create

#### Is there a configuration option to preserve more than two older release secrets and config maps in Kubernetes deployments?

No, currently, there is no configurable option to increase the number of older release secrets and config maps that can be preserved. The number of stored releases is fixed.

#### How is the release history stored for Kubernetes deployments?

If declarative rollback is used, the release history is stored in secrets. Otherwise, it is stored in a single config map or secret.

#### What happens when the limit of stored releases is reached?

When the limit of stored releases is reached, older releases are automatically cleaned up. This is done to remove irrelevant data for rollback purposes and to manage storage efficiently.

#### Can we obtain the raw `plan.out` file instead of the JSON output in the Terraform step?

Yes, you can access the raw `plan.out` file by using the `humanReadableFilePath` variable.

#### Can I override some values in the Helm chart during the deployment of a service in Kubernetes?

Yes, you can override values in the Helm chart during the service deployment in Kubernetes.

#### How can I use values files to override Helm chart values during deployment?

You can define your input values in separate files, known as values files. These files can be stored and optionally tracked in Git. Harness allows you to specify these values files in your service definition, which will be used during the deployment.

#### What is the advantage of using values files over '--set' option for Helm chart overrides?

Using values files provides a more organized and maintainable way to manage overrides in Helm charts. It is considered a best practice, and it allows you to easily track and version your input values for deployments.

#### How can Harness detect if the sub tickets in Jira are closed before the approval process runs?

The first step is to make API calls to the Jira issue endpoint. By inspecting the response from the API call, you can check if the 'subtask' field is populated for the main issue.  Once you identify the subtask issue keys from the API response, you can create a loop to retrieve the status of each sub ticket using their respective issue keys. This will allow you to determine if the sub tickets are closed or not before proceeding with the approval process in Harness.

#### Can we use matrices to deploy multiple services to multiple environments when many values in services and environments are not hardcoded?

Yes, you can use matrices for deploying multiple services to multiple environments even if many values in services and environments are not hardcoded.

#### What are some examples of values that are not hardcoded in the deployment setup?

Some examples of values that are not hardcoded include chart versions, values YAMLs, infradef, and namespaces. These are currently treated as runtime inputs.

#### When querying the Harness Approval API, the Approval Details are returning with message No Approval found for execution

The api will only return Approval details if there are any approval step pending for approval, If there are no such executions currently than its expected to return No Approval found for execution

#### Trigger another stage with inputs in a given pipeline?
You cannot do it if the stage is part of the same pipeline. However, using Pipeline A and running a custom trigger script inside it can trigger the CI stage which is part of Pipeline B.

#### How can we use conditionals within variables using jexl?
You can use Ternary operators to achieve this use case more information on this here: https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#ternary-operators

#### How do we easily change git folders in a repo for the git exp project?
The default branch and file path will not be changeable after the creation as we store data in Git end and only metadata is stored in Harness. 
You can change it to the required path while creating the initial entity you can select the folder other than.harness Now you can recreate the entity using the same yaml and make minor changes like file path and entity id.

#### How long is the main repo content cached before the latest pipeline code version is pulled from the remote Github repo?
The content is cached for each branch the file has been fetched for to date. The expiry time for content is 30 days. 

We don’t auto-reload cache on Back End as a synchronous job or similar. Any execution of that particular pipeline or involving that particular template/input set updates the cached content as we fetch everything from GIT during execution.

Until any user-driven operation is performed, e.g. reload-from-git button on UI, execution of the pipeline / any entity via RUN button / UI or execution of entity via trigger etc.

#### Is there a way to force the pipeline editor to read the latest version from the remote Github repo?
Yes, the “reload-from-git” option on three dots does the job.

#### Not able to delete the template having an “Ad” string in between with adblocker installed?
It will happen due to an ad blocker extension installed on the user system - and it will happen only for the template with the name of the template Eg:(Sysdig AdHoc) containing an “Ad” string in between, and when this is sent in the API as a path or a query param - this will get blocked by the ad blocker.
 
These ad blockers have some rules for the URIs - if it contains strings like “advert”, “ad”, “double-click”, “click”, or something similar - they block it.

#### Pipeline variables are not being translated in HTTP step assertion and output variables.
Expression to assert Numeric values, Please note that asserting on integers should be done without quotes since both sides of the assertions should be of number format (for JEXL).

* <+httpResponseCode>==200
* 200==<+httpResponseCode>
* <+pipeline.variables.EXPECTED_RESPONSE>==<+httpResponseCode>


Expression to assert on Strings would require double quotes. Please note that it would require Double Quotes on both ends.

#### Can I customize the looping conditions and behaviour?
Yes, Harness NextGen often offers customization options to define the loop exit conditions, maximum iteration counts, sleep intervals between iterations, and more information here https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/

#### What are the use cases for utilizing a Looping Strategy in Harness NextGen?
Looping strategies are useful for scenarios like canary deployments, gradual rollouts, and validation checks where you want to keep iterating until you achieve the desired result.

#### Can I deploy different versions of serverless functions using Harness?
Yes, Harness generally allows users to deploy multiple versions of serverless functions, helping in testing and gradual rollout.

#### At the organizational level, I aim to establish a user group to which I can assign a resource group containing numerous distinct pipelines across specific projects.

We don’t support this. We don’t support specific pipeline selections for specific projects for an Organization. But the User can limit the access to the projects by selecting specific projects as Scopes to apply in Org level resource group.

#### Does Harness support blue-green or canary deployments for serverless applications?
Yes, Harness supports advanced deployment strategies like blue-green and canary deployments for serverless applications. These strategies allow you to roll out updates gradually and mitigate risks associated with new releases.

#### Can I set up automated testing for my serverless applications with Harness?
Absolutely. Harness enables you to incorporate automated testing into your deployment pipelines, including unit tests, integration tests, and performance tests. This ensures that your serverless applications meet quality standards before reaching production.

#### How does Harness handle rollbacks in serverless deployments?
If an issue arises during a deployment, Harness can automatically trigger a rollback to the previous version of your serverless application. This helps maintain system stability and minimizes downtime.

### Can I set up advanced deployment strategies for Google Cloud Functions, like canary deployments?
The harness supports advanced deployment strategies like canary deployments for Google Cloud Functions. This allows you to roll out updates gradually and assess their impact before a full release.

#### Zero results returned when trying to find deployment data from 2020?
We do have 6 month Data retention period as mentioned in doc: https://www.harness.io/pricing?module=cd# 
So older deployments will not be available.

#### Currently we make use of this feature from FirstGen. Is there, or will there be an equivalent feature in Next Gen?
https://developer.harness.io/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/publish-pipeline-events-to-an-http-endpoint/ 

You can Use Webhook notifications in NG to inform an external application of an event.
https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#webhook-notifications 

#### How to use spilt function on variable
You can split on any delimiter and use index based access.
For ex: if you have a variable with prod-environment-variable so you can use below to get prod
<+<+pipeline.variables.envVar>.split('-')[0]>

#### How to use Substring function on variable
You can use substring function and need to pass starting and end index
For ex: if you have a variable with prod-environment-variable so you can use below to get prod
<+<+pipeline.variables.envVar>.substring(0,3)>

#### How to pass value to a variable manually while running from ui if same pipeline is configured to run via trigger and using variable from trigger.
You can check the triggerType variable to identify if pipeline was invoked via trigger or manually and can use below jell condition 
<+<+pipeline.triggerType>=="MANUAL"?<+pipeline.variables.targetBranch>:<+trigger.targetBranch>>

#### Can I set up advanced deployment strategies for Google Cloud Functions, like canary deployments?
The harness supports advanced deployment strategies like canary deployments for Google Cloud Functions. This allows you to roll out updates gradually and assess their impact before a full release.

#### How to concatenate secrets with string

You use either of following expressions:

```<+secrets.getValue("test_secret_" + <+pipeline.variables.envVar>)>```

OR

```<+secrets.getValue("test_secret_".concat(<+pipeline.variables.envVar>))>```

#### Can a non-git-sync'd pipeline consume a git-sync'd template from a non-default branch?

Yes an Inline pipeline can consume a template from non-default branch.  More on this can be referenced here https://developer.harness.io/release-notes/whats-new/#continuous-delivery-version-79811

#### Is there a way I can update the git repo where the pipeline YAML resides?

Yes you can use this API https://apidocs.harness.io/tag/Pipelines#operation/update-pipeline-git-metadata to update the Git repo of the pipeline.

#### Is there a way to generate a dynamic file with some information in one stage of the pipeline and consume that file content in a different pipeline stage?

For CI :

You can refer to this doc : https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/

For CD :

You can use API to create file in harness file store and then refer it to other stage. https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders

Or

You can just write a file on the delegate and use the same delegate.

#### How can I get pipeline exectuion details via API

This API can be used to fetch pipleine execution details : https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getExecutionDetailV2

### How to do a Flank Deployment in Harness?
You can use Deployment Templates for this use case. You can find more information on this here: https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/

### How to test harness entities (service, infra, environment) changes through automation

Harness by default will not let the user push something or create any entity which is not supported or incorrect as our yaml validator always make sure the entity is corrected in the right format.
 
You can use yaml lint to verify the yaml format of the entity and in order to answer your question there is no way to perform testing (automation testing, unit testing) etc of harness entities before releasing any change within those entities.

### What kind of order do we apply to the Docker Tags as part of the artifact we show for the users? 

Except for the latest version of Nexus, it is in alphabetical order.

###Is there a way to use a Pipeline within a pipeline in a template? 
We do not support this, nor do we plan to at this time, due to the complexity already with step, stage and pipeline templates being nested within each other. 

Resolving inputs across those levels is very expensive and difficult to manage for end users.


### In Harness can we refer to a secret created in Org in the Account level connector?
No higher-level entity can refer to lower-scoped entities e.g. we cannot refer to a secret created in Org in the Account level connector.

### Do we have multi-select for inputs in NG as we had in FG?
Multiple selection is allowed for runtime inputs defined for pipelines, stages, and shell script variables. You must specify the allowed values in the input as mentioned in the above examples.

The multiple selection functionality is currently behind the feature flag, PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES. Contact Harness Support to enable the feature.

### In the declarative rollback, it will rollback also the secrets and config maps used in the last successful execution?
During rollback, Harness reapplies the previous manifest. This is the declarative method, and it includes the ConfigMap and Secrets of the last known good state.  

https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes

### When making a change to a template, you have to manually go through all the places that template is referenced and run “reconcile” Is this by design?
Yes, this is by design 	https://developer.harness.io/docs/platform/templates/templates-best-practices/#reconciliation

### Is this the right format to push a secret to the Azure key vault? secret.setVaule("azurevauly://avidentifier/pathToSecret", secretVaule)
secret.setValue is not supported. Secrets can be referred to only using secret.getValue("azurevauly://avidentifier/pathToSecret") or secret.getValue("secretIdentifierInHarness")

### Why it is that you cannot use OCI Helm registries with Helm Chart triggers?
OCI Helm does let us poll the repository for changes, we can get a list of chart versions, but we cannot poll and detect a new version. This capability hasn't been built by OCI Helm

### Can we use variables in the vault path to update the location dynamically based on environment?

A expression can be used in the URL, for example - Setting up a PATH variable in the pipeline and calling that variable in the get secret - echo "text secret is: " <+secrets.getValue(<+pipeline.variables.test>)>

### Can we add a delay of n minutes before a pipeline is invoked via trigger?

We don't have any timer for the trigger. It will trigger the pipeline whenever a change is made in the master branch.
Since this is a webhook.
 
As a workaround, a shell script can be added to sleep for 10 mins or n mins as per requirements

### How can I manually launch a pipeline which has conditional execution based on trigger data?

Pipeline will run into an error because trigger basesd expression will be null.
 
We can add a workaround, instead of adding the condition such as - "<+trigger.event> == "PR"", set it to a variable, pass the variable value at runtime, and set the default value as <+trigger.event> == "PR", so when the pipeline is executed with a trigger default value is passed and it while executing it manually, you can set it as false to skip the condition of this execution.

### what are PerpetualTask?

PerpetualTasks" refers to any task that is running on the delegate continuously and lasting indefinitely. All the tasks have task id, ex - rCp6RpjYTK-Q4WKqcxalsA associated with it, we can filter the delegate logs based on the task ID and we can check what step is continuously failing at the delegate, it could be reading secrets from the vault or taking a lock over some resource.

### Does Harness have cache layer for the Helm chart repo index during deployment steps?

We have a caching mechanism where we create a cache folder (based on connectorID) and store the repositories.yaml file there.

### Is it possible to disable First Generation?

Yes, You should see the toggle "Allow Harness First generation Access" setting in NG Account Overview UI. Use this to enable and disable the first gen access

### How do I use OPA policy to enforce environment type for each deployment stage in a pipeline i.e. prod or preprod?

The infra details are passed as stage specs.

For example, to access the environment type, the path would be - input.pipeline.stages[0].stage.spec.infrastructure.environment.type
You will have to loop across all the stages to check its infra spec.

### How do I add annotations to the canary deployment

Use apply step to create the canary ingress rule. We do support additional values.yaml override with apply step and this can be used for shifting the traffic, for example:
Create ingress template/ingress-canary:

nginx.ingress.kubernetes.io/canary: true nginx.ingress.kubernetes.io/canary-by-header: always nginx.ingress.kubernetes.io/canary-by-header-value: x-checkout-canary nginx.ingress.kubernetes.io/canary-weight: {{.Values.weight}}
 
Using apply step, apply templates/ingress-canary with values.yaml content:
weight: 10
 
To progress, using apply step, apply template/ingress-canary with values.yaml content:
weight: n
 
If weight is a constant value and having a loose ingress resource is not an issue then  declare both primary and canary ingress in the manifest that will be applied during both canary and primary deployment. Since there wouldn’t be any changes to the ingress rules itself then there shouldn’t be any effect if they are going to reapply canary ingress in the primary deployment.

Our recommendation is to use the first option, anyway harness doesn’t track ingress rules so by using apply step you don’t lose anything.

### How to get Bearer token to make Web API calls?

You can get the bear token from the "acl" network request. Open the network tab and search for acl and check the request headers.
You will find the bearer token under Authorization.

### In pipeline template variable location is there any option to move or place the variables according to our requirements?

You can modify the YAML file to change the variable order. Currently, moving the variable order is not supported in UI.

### The delegates set `PROXY_HOST` and `PROXY_PORT`, which is different from `HTTP_PROXY` in CI step?

Yes, we use the "PROXY_HOST" and "PROXY_PORT" variable values to build the "HTTP_PROXY" ( or "HTTPS_PROXY") environment variable and inject it

### How do I delete k8s resources which are part of the release?

During deployment Harness creates a ConfigMap listing the resources of the release and uses the release name for tracking them. The release name is defined in the Infrastructure settings, in Cluster Details, in Advanced.
 
If this config map is deleted or if the resource is not deployed via Harness then we delete step won't be able to find the given resources.

### Can I add CI/CD steps to customer stage?

Native CI and CD steps are not supported for custom stage, These steps cannot be added via UI. Adding them manually will result in an error while running the pipeline - "Stage details sweeping output cannot be empty"

### How can we deploy a specific resource in a helm chart as part of rolling deployment?

If it is a Kubernetes/Helm, you can use an Apply Step
 
https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step/
 
You can take a specific file from the manifest and execute it separately (before or after) the normal deployment.  To prevent the file from being included in the normal part of the deployment, you would include this # harness.io/skip-file-for-deploy at the top of the file.

### What kind of payload type is supported for policy step?

Policy step is onl ysupported against a JSON payload.

### How to achieve Parallel Execution of Deploy one service to multiple Infrastructures?

You can add maxConcurrency: X in the repeat strategy, which is the number of concurrent instances running at a time.
eg - if maxConcurrency: 5, it will run 5 concurrent/parallel step/stage.

### Do we support expression for Harness Variable?

We do not support expression for Harness variables currently created at project account or org level. Only fixed values are currently supported.



### Can terraform vars in terraform step contain hyphen ?

Terraform vars are exported as shell environment variables. The shell variables itself has a restriction in their naming coonvention that it should not contain hyphen and hence this is not supported.


### How to properly pass tag inputs in api call for harness file store ?

For Harness file store tags are key value pairs and hence they need to be specified in the similar way , below is an example of how this needs to be specified:

```tags=[{"key":"tag","value":"value"}]```


### How to handle the scenario where powershell scripts does not correctly return the status code on failure ?

Though it is an issue with Powershell where it does not return the error code correctly we need this for our step to proceed further and reflect the status correctly. Consider wrapping the code like below in the script:

```
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

<execution code>

exit $LASTEXITCODE
```
