---
title: Continuous Delivery & GitOps FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps.
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

See - /docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes

#### What happens if my manifest files are changed during pipeline execution, will harness pick the latest file?

The files are fetched only during the execution step i.e. during rollout. if the files are changed and committed before the "Fetch file" step is executed in the rollout phase, Harness will pick the latest file.

#### Can I encrypt the Token/Secret passed in the INIT_SCRIPT?

Directly this cannot be encrypted but this use can be achieved by creating the k8s secret for the credentials and referring them in the init script.

**example** -

``` aws_access_key=kubectl get secrets/pl-credentials --template={{.data.aws_access_key}} | base64 -d```
```aws_secret_key= kubectl get secrets/pl-credentials --template={{.data.aws_secret_key}} | base64 -d```

Another approach would be saving the value in Harness's secret manager/any other secret manager and referencing it in the script.
Check this for more info - /docs/platform/secrets/add-use-text-secrets

#### K8s delete command is not working with the native helm?

The K8s delete command/step does not work with native helm deployment because Harness has different logic to maintain versioning and rollback for native helm and k8s.In the case of the native helm, If the deployment fails, we’ll uninstall it ourselves. However, if the user wants to pass some command flags with Uninstall, that can be passed by selecting Uninstall and passing the relevant command flags. 

Check this for more details - /docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#uninstall-command-flag

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

Certainly! You can find a step-by-step guide on how to deploy the delegate in a task-definition for ECS on our official documentation page: [link to documentation](/docs/platform/delegates/install-delegates/docker-delegate-to-ecs-fargate/).

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

#### If I delete an infradef after deployments are done to it, what are the implications other than potential dashboard data loss for those deployments ?

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

#### Do we support rollback of deployment post production ? 

Yes, certainly we have that capability, to know more about this please see, [Documentation](/docs/continuous-delivery/manage-deployments/rollback-deployments)

#### How can I override the lite-engine image for the Container Run step,to pull images from ECR instead of docker hub? 

Yes, certainly that can be acheived by using Docker Connector with your registry URL and anonymous access would help you to acheive that.

#### How can only set of user able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](/docs/platform/approvals/adding-harness-approval-stages/#select-approvers)

#### How Kubernetes Pruning option work during the deployment?

If you have enabled the Kubernetes Pruning in your deployment. In that case, it will remove any resources that were present in an old manifest but are no longer present in the manifest used for the current deployment.

For reference: [Prune Kubernetes resources](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/) 

#### How release: {{ .Release.Name }} will help in steady state check in helm deployment?

We perform a pod fetch based on this label, which allows us to show deployed pods in the step output and also track the same for instance sync. If we don't add these, both won't work as expected.

For reference: [Steady state check](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/#spec-requirements-for-steady-state-check-and-versioning)

#### Where we need to add label release: {{ .Release.Name }}?

For any manifest object which creates the pod, you have to add this label in its spec. Adding it in Service, Deployment, StatefulSet and DaemonSet should be enough.

#### What does the release name mean in the Infrastructure?

The release name is used to create a harness release history object, which contains some metadata about the workloads. This helps us perform the steady state check.

#### I have a pipeline in CG that has a variable of ${artifact.buildNo} in a command and same variable is not working in NextGen.

You can use artifact.tag in NG , which is equivalent to artifact.buildNo from CG, you can find more details around mapping as below:
/docs/platform/variables-and-expressions/harness-variables/#migrating-firstgen-expressions-to-nextgen 

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

Sure! An example of the calculation can be found in the following [Documentation](/docs/continuous-delivery/get-started/service-licensing-for-cd/#example). This example illustrates how the number of service instances corresponds to the consumed service licenses.

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

You can use Ternary operators to achieve this use case more information on this here: /docs/platform/variables-and-expressions/harness-variables/#ternary-operators

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

Yes, Harness NextGen often offers customization options to define the loop exit conditions, maximum iteration counts, sleep intervals between iterations, and more information here /docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/

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

#### Can I set up advanced deployment strategies for Google Cloud Functions, like canary deployments?

The harness supports advanced deployment strategies like canary deployments for Google Cloud Functions. This allows you to roll out updates gradually and assess their impact before a full release.

#### Zero results returned when trying to find deployment data from 2020?

We do have 6 month Data retention period as mentioned in doc: https://www.harness.io/pricing?module=cd# 
So older deployments will not be available.

#### Currently we make use of this feature from FirstGen. Is there, or will there be an equivalent feature in Next Gen?

/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/publish-pipeline-events-to-an-http-endpoint/ 

You can Use Webhook notifications in NG to inform an external application of an event.
/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#webhook-notifications 

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

You can refer to this doc : /docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/

For CD :

You can use API to create file in harness file store and then refer it to other stage. https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders

Or

You can just write a file on the delegate and use the same delegate.

#### How can I get pipeline exectuion details via API

This API can be used to fetch pipleine execution details : https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getExecutionDetailV2

#### How to do a Flank Deployment in Harness?

You can use Deployment Templates for this use case. You can find more information on this here: /docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/

#### How to test harness entities (service, infra, environment) changes through automation

Harness by default will not let the user push something or create any entity which is not supported or incorrect as our yaml validator always make sure the entity is corrected in the right format.
 
You can use yaml lint to verify the yaml format of the entity and in order to answer your question there is no way to perform testing (automation testing, unit testing) etc of harness entities before releasing any change within those entities.

#### What kind of order do we apply to the Docker Tags as part of the artifact we show for the users? 

Except for the latest version of Nexus, it is in alphabetical order.

#### Is there a way to use a Pipeline within a pipeline in a template? 

We do not support this, nor do we plan to at this time, due to the complexity already with step, stage and pipeline templates being nested within each other. 

Resolving inputs across those levels is very expensive and difficult to manage for end users.

#### In Harness can we refer to a secret created in Org in the Account level connector?
No higher-level entity can refer to lower-scoped entities e.g. we cannot refer to a secret created in Org in the Account level connector.

#### Do we have multi-select for inputs in NG as we had in FG?

Multiple selection is allowed for runtime inputs defined for pipelines, stages, and shell script variables. You must specify the allowed values in the input as mentioned in the above examples.

The multiple selection functionality is currently behind the feature flag, PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES. Contact Harness Support to enable the feature.

#### In the declarative rollback, it will rollback also the secrets and config maps used in the last successful execution?

During rollback, Harness reapplies the previous manifest. This is the declarative method, and it includes the ConfigMap and Secrets of the last known good state.  

/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes

#### When making a change to a template, you have to manually go through all the places that template is referenced and run “reconcile” Is this by design?
Yes, this is by design 	/docs/platform/templates/templates-best-practices/#reconciliation

#### Is this the right format to push a secret to the Azure key vault? secret.setVaule("azurevauly://avidentifier/pathToSecret", secretVaule)
secret.setValue is not supported. Secrets can be referred to only using secret.getValue("azurevauly://avidentifier/pathToSecret") or secret.getValue("secretIdentifierInHarness")

#### Why it is that you cannot use OCI Helm registries with Helm Chart triggers?
OCI Helm does let us poll the repository for changes, we can get a list of chart versions, but we cannot poll and detect a new version. This capability hasn't been built by OCI Helm

#### Can we use variables in the vault path to update the location dynamically based on environment?

A expression can be used in the URL, for example - Setting up a PATH variable in the pipeline and calling that variable in the get secret - echo "text secret is: " <+secrets.getValue(<+pipeline.variables.test>)>

#### Can we add a delay of n minutes before a pipeline is invoked via trigger?

We don't have any timer for the trigger. It will trigger the pipeline whenever a change is made in the master branch.
Since this is a webhook.
 
As a workaround, a shell script can be added to sleep for 10 mins or n mins as per requirements

#### How can I manually launch a pipeline which has conditional execution based on trigger data?

Pipeline will run into an error because trigger basesd expression will be null.
 
We can add a workaround, instead of adding the condition such as - "<+trigger.event> == "PR"", set it to a variable, pass the variable value at runtime, and set the default value as <+trigger.event> == "PR", so when the pipeline is executed with a trigger default value is passed and it while executing it manually, you can set it as false to skip the condition of this execution.

#### what are PerpetualTask?

PerpetualTasks" refers to any task that is running on the delegate continuously and lasting indefinitely. All the tasks have task id, ex - rCp6RpjYTK-Q4WKqcxalsA associated with it, we can filter the delegate logs based on the task ID and we can check what step is continuously failing at the delegate, it could be reading secrets from the vault or taking a lock over some resource.

#### Does Harness have cache layer for the Helm chart repo index during deployment steps?

We have a caching mechanism where we create a cache folder (based on connectorID) and store the repositories.yaml file there.

#### Is it possible to disable First Generation?

Yes, You should see the toggle "Allow Harness First generation Access" setting in NG Account Overview UI. Use this to enable and disable the first gen access

#### How do I use OPA policy to enforce environment type for each deployment stage in a pipeline i.e. prod or preprod?

The infra details are passed as stage specs.

For example, to access the environment type, the path would be - input.pipeline.stages[0].stage.spec.infrastructure.environment.type
You will have to loop across all the stages to check its infra spec.

#### How do I add annotations to the canary deployment

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

Our recommendation is to use the first option, anyway harness doesn’t track ingress rules so by using apply step you don’t lose anything.

#### How to get Bearer token to make Web API calls?

You can get the bear token from the "acl" network request. Open the network tab and search for acl and check the request headers.
You will find the bearer token under Authorization.

#### In pipeline template variable location is there any option to move or place the variables according to our requirements?

You can modify the YAML file to change the variable order. Currently, moving the variable order is not supported in UI.

#### The delegates set `PROXY_HOST` and `PROXY_PORT`, which is different from `HTTP_PROXY` in CI step?

Yes, we use the "PROXY_HOST" and "PROXY_PORT" variable values to build the "HTTP_PROXY" ( or "HTTPS_PROXY") environment variable and inject it

#### How do I delete k8s resources which are part of the release?

During deployment Harness creates a ConfigMap listing the resources of the release and uses the release name for tracking them. The release name is defined in the Infrastructure settings, in Cluster Details, in Advanced.
 
If this config map is deleted or if the resource is not deployed via Harness then we delete step won't be able to find the given resources.

#### Can I add CI/CD steps to customer stage?

Native CI and CD steps are not supported for custom stage, These steps cannot be added via UI. Adding them manually will result in an error while running the pipeline - "Stage details sweeping output cannot be empty"

#### How can we deploy a specific resource in a helm chart as part of rolling deployment?

If it is a Kubernetes/Helm, you can use an Apply Step
 
/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step/
 
You can take a specific file from the manifest and execute it separately (before or after) the normal deployment.  To prevent the file from being included in the normal part of the deployment, you would include this # harness.io/skip-file-for-deploy at the top of the file.

#### What kind of payload type is supported for policy step?

Policy step is onl ysupported against a JSON payload.

#### How to achieve Parallel Execution of Deploy one service to multiple Infrastructures?

You can add maxConcurrency: X in the repeat strategy, which is the number of concurrent instances running at a time.
eg - if maxConcurrency: 5, it will run 5 concurrent/parallel step/stage.

#### Do we support expression for Harness Variable?

We do not support expression for Harness variables currently created at project account or org level. Only fixed values are currently supported.

#### Can terraform vars in terraform step contain hyphen ?

Terraform vars are exported as shell environment variables. The shell variables itself has a restriction in their naming coonvention that it should not contain hyphen and hence this is not supported.

#### How to properly pass tag inputs in api call for harness file store ?

For Harness file store tags are key value pairs and hence they need to be specified in the similar way , below is an example of how this needs to be specified:

```tags=[{"key":"tag","value":"value"}]```

#### How to handle the scenario where powershell scripts does not correctly return the status code on failure ?

Though it is an issue with Powershell where it does not return the error code correctly we need this for our step to proceed further and reflect the status correctly. Consider wrapping the code like below in the script:

```
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

<execution code>

exit $LASTEXITCODE
```

#### When making a change to a template, do we have to manually go through all the places that template is referenced and run “reconcile” ?

Yes, it is expected design behaviour. Please refer more on this in following [Documentation](/docs/platform/templates/templates-best-practices/#reconciliation)

#### If declarative rollback is enabled, will it rollback secrets and configmaps or we need to enable versioning ?

No, Versioning is not done when declarative rollback is enabled. Please refer more on this in following [Documentation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning/)

#### How do I use an output from one stage in a looping strategy of another stage ?

If there is certainty in terms of number of Stages created, this could be achieved by creating a intermediary shell script which is concatenating output variables from previous stages with a “,” and building a list which can them be passed onto the next stage for lopping over this list. For more on this please refer this in following [Documentation](/docs/platform/pipelines/best-practices-for-looping-strategies/)

#### Do we support services and envs at the org level ?

Yes, we do. For more please refer this in following [Documentation](/docs/continuous-delivery/get-started/services-and-environments-overview/#creating-services-at-an-account-or-organization-level)

#### Can Expressions operate within Harness Variables for configurations at the account level in the Next-Gen version?

No, higher level entity cannot refer to lower scoped entities. Please refer more on this in following [Documentation](/docs/platform/variables-and-expressions/add-a-variable/)

#### Can we use a Pipeline within a pipeline in a template ?

No, This is a limitation with templates. We do not support creating pipelines stage templates.

#### Does an expression retrieve from which branch the pipeline loaded the yaml ?

No, there is no such expression which will always show from which branch the pipeline yaml was loaded.

#### Can we run two input sets of a pipeline together in parallel ?

No, It needs to be a different execution everytime.

#### Can we select a delegate and see what steps have ran on it without going into each pipeline execution?

No, we don’t have this capability.

#### In FG how can I remove the old plan-file and start again with a fresh plan to make the workflow run successfully?

You can enable "Skip Terraform Refresh when inheriting Terraform plan" option, please refer this in following [Documentation](https://docs.harness.io/article/ux2enus2ku-add-terraform-scripts#option_2_skip_terraform_refresh_when_inheriting_terraform_plan)

#### For variables do we have options to intake parameters via dropdown or radio buttons etc ?

Yes we do, here in the following [Documentation](/docs/platform/variables-and-expressions/runtime-inputs/#supplying-runtime-inputs-during-execution) , with allowed values you can have multiple inputs to select from range of values allowed.

#### In fetch pipeline summary API, what does the fields "numOfErrors" and "deployments" mean?

Deployments field has list of number of total executions per day for last 7 days and numOfErrors field has list of number of failed executions per day for last 7 days.

#### Is there a way I can update the git repo where the pipeline YAML resides?

Yes you can use this API [here](https://apidocs.harness.io/tag/Pipelines#operation/update-pipeline-git-metadata) to update the Git repo of the pipeline.

#### Is it possible to reference a connectors variable in a pipeline?

we do not support referencing variables/values from the connector into the pipeline.

#### What is the plan and procedure for upgrading to the latest ArgoCD version using Harness?

The process of upgrading to the latest ArgoCD version through Harness has been streamlined to minimize overhead. We aim to swiftly release new versions shortly after they are released upstream, following a brief phase of regression testing on our side. This approach ensures that you can benefit from the latest features and enhancements with minimal delays.
 
#### How can I stay informed about the availability of new ArgoCD versions and the upgrade process?

You can stay informed about new ArgoCD versions and the upgrade process through our regular release notes. These release notes provide detailed information about the changes, enhancements, and fixes in each version. You can find the release notes at this in following [Notes](https://developer.harness.io/release-notes/continuous-delivery)

#### What is the easiest way to determine the ArgoCD version using a GitOps agent?

An easy method to identify the ArgoCD version is by creating a GitOps agent and inspecting the associated manifest.

#### Is there a way to generate a dynamic file with some information in one stage of the pipeline and consume that file content in a different pipeline stage?

You can use API to create file in harness file store and then refer it to other stage. [here](https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders)
Or you can just write a file on the delegate and use the same delegate.

#### Why is a certain pipeline step not running even though it meets the conditional execution criteria?

If a specific pipeline step is not running despite meeting the conditional execution criteria, it could be due to the presence of a failure strategy at the pipeline level. The failure strategy takes precedence over conditional execution settings. 

#### How do I resolve No eligible delegate(s) in account to execute task. Delegate(s) not supported for task type {TERRAFORMTASKNGV6} error?

Upgrading the delegate to latest version should resolve this issue.

#### What is MonitoredService?

Monitored service are used for service reliability management. You can find more details on this in following [Documentation](/docs/service-reliability-management/monitored-service/create-monitored-service/)

#### I'm trying to use a specific KMS key to encrypt my AWS Lambda's environment variables, but the Lambda seems to default to the AWS managed key. What could be the issue?

By default, AWS Lambda uses an AWS managed key for environment variable encryption. If you're specifying a KMS key using the kmsKeyArn parameter in the Lambda function definition YAML but still seeing the AWS managed key being used, it might be due to how the kmsKeyArn is defined in your YAML.

#### How can I ensure that my specified KMS key is used to encrypt my Lambda's environment variables?

To make sure that your specified KMS key (kmsKeyArn) is used to encrypt your Lambda's environment variables, you need to ensure that the YAML key is written in camel case format, which is kmsKeyArn. Additionally, make sure that the KMS key ARN is accurate and accessible in your AWS account.

#### Can you provide an example YAML snippet with the correct usage of kmsKeyArn for Lambda's environment variables?

```
functionName: "ff2"
handler: handler.hello
role: "arn:aws:iam::01447erole2"
runtime: nodejs14.x
kmsKeyArn: "arn:aws:kms:ue78fb6117cfd"   # Make sure the ARN is accurate
environment:
  variables:
    key: "val"
```
#### How to conver a variable to Lowercase?

You can use .toLowerCase() for example <+<+stage.variables.ENVIRONMENT>.toLowerCase()> and retry the pipeline?

#### Can I create a single, generic GitHub connector that works for multiple GitHub accounts?

No, the GitHub connector in Harness requires a specific URL tied to a GitHub account. A unique connector is needed for each GitHub account you want to connect to.

#### How do I write to file store ?

You can use API to create/update files in the file store [Documentation](https://apidocs.harness.io/tag/File-Store#operation/update)

#### Explain what 'freeze window' means

Freeze Window can be setup in Harness with certain rules. No deployments can be run during this window. 
A freeze window is defined using one or more rules and a schedule. The rules define the Harness orgs, projects, services, and environments to freeze.
Deployment freeze does not apply to Harness GitOps PR pipelines.
You cannot edit enabled deployment freeze windows. If the deployment freeze window you want to change is enabled, you must first disable it, make your changes, then enable it again.

#### What Roles are required to edit Pipeline Triggers and Input Sets

The roles required to edit Pipeline Triggers and Inpout sets are "View and Create / Edit"

#### If we have multiple services using this same pipeline template, both within and outside the same project, does Harness differentiate each pipeline execution by service? If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step, would approving the service1 pipeline cause the service2 pipeline to be rejected?

The pipelines will run just fine, as you used the template and specified different services at the runtime , so it will run independently. 

#### Service showing as active but hasn't been part of a deployment in over 30 days

Harness shows the Active instances is say you had a deployment and the VM got deployed from a Harness deployment. No matter if we deploy anything else on the VM , until the VM is up and running as it is linked with the service. It will show as active instance. The 30 days mentioned here /docs/continuous-delivery/get-started/service-licensing-for-cd/#active-services , is for service based licence calculation and usage for CD. 

#### Can we access the file from Harness file store as a file ?

The contents of the file in the Harness file store can be read as ```<+fileStore.getAsString("filename")>``` . However if we need it as a file itself we will need to write it back to a file in the step and then use it:
```
cat>>filename.txt<<EOF
<+fileStore.getAsString("filenameInHarnessFileStore")>
EOF
```
#### Do we need to escape '{' in manifest for go templating ?

The curly brackets are special characters for go and hence we need to escape it. If we do not escape in the manifest the templating will fail to render.

#### Can we use multiple condition check in conditional execution for stages and steps ?

We support having multiple condition check in the conditional execution. If you need to execute the stage based on two condition being true you can make use of AND operator, a sample is below:
```<+pipeline.variables.var1>=="value1" & <+pipeline.variables.var2>=="value2"```

#### Can we persist variables in the pipeline after the pipeline run is completed ?

We do not persist the variables and the variables are only accessible during the context of execution. You can make api call to write it as harness config file and later access the Harness file or alternatively you have a config file in git where you can push the var using a shell script and later access the same config file.

#### Can we access harness variable of one pipeline from another pipeline ?

One pipeline cannot access the vairables of other pipelines. Only values of variable created at project, account and org level can be accessed by pipelines. These values for these type of variables are fixed and cannot be changed by pipelines direcltly. These variable values can be updated via the UI or API.

#### Can I use Helm charts with Harness GitOps?

Yes, Harness GitOps supports Helm charts for defining and deploying Kubernetes applications. You can version-control Helm charts in your Git repository and use Harness to manage the deployment lifecycle.

#### Does Harness GitOps support rollback and roll-forward capabilities?

Yes, Harness GitOps includes rollback and roll-forward capabilities. In case of deployment failures or issues, you can use Harness to automatically roll back to a previously known good state or roll forward to a fixed version.

#### Does the Harness GitOps Agent support high availability and scalability?

A: Yes, the Harness GitOps Agent supports high availability and scalability by allowing you to deploy multiple agents across different clusters. This ensures redundancy and load distribution.

#### Can I control access and permissions for the Harness GitOps Agent?

Yes, you can control access and permissions for the Harness GitOps Agent. It communicates securely with the Harness platform using an API token, and you can manage users' access to the Harness platform through role-based access control.

#### Can I use the Harness GitOps Agent with different Kubernetes distributions?

Yes, the Harness GitOps Agent is designed to work with various Kubernetes distributions, including managed Kubernetes services like Amazon EKS, Google Kubernetes Engine (GKE), and Azure Kubernetes Service (AKS), as well as self-hosted Kubernetes clusters.

#### Getting an error while evaluating expression/ Expression evaluation fails

The concatenation in the expression /tmp/spe/<+pipeline.sequenceId> is not working because a part of expression <+pipeline.sequenceId> is integer so the concatenation with /tmp/spec/ is throwing error because for concat, both the values should be string only.

So we can invoke the toString() on the integer value then our expression should work. So the final expression would be /tmp/spe/<+pipeline.sequenceId.toString()>

Also please see the Feature Flag: PIE_EXPRESSION_CONCATENATION

#### Can I use the Service Propogation Feature to deploy dev and prod pipelines without changing critical parameters?

Yes, the Service Propogation allows you to provide fixed critical parameters. Please refer more on this in the following [Documentation 1](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services/) and [Documentation 2](/docs/continuous-delivery/x-platform-cd-features/overrides-v2/).

#### Do we need to manually filter the API response to check if the pipeline was executed by a trigger in NG ?

Yes,Harness NG uses REST APIs not graphql, this means that we need to review the api calls they are making and provide them the api endpoints that are parity. 

#### Do we support nested AD groups syncing to Harness on AD SCIM sync?

Enabling Azure AD provisioning in Harness allows user provisioning from Azure AD. Users directly provisioned require group assignment in Harness, while Azure AD group members' group assignments are managed in Azure AD. Please refer more on this in the following [Documentation](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)

####  Do we have the export manifests option in NG like we have in CG?

No, we have a dry-run step, that will export manifest for customer to use in other steps, but there is no option to inherit manifest.Please refer more on this in the following [Documentation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-dry-run/)

#### What YAML parser is being used for harness YAML ,Pipelines or Templates?

We have a YAML schema available on GitHub that you can pull into your IDE for validation.
It is available on [Github Repository](https://github.com/harness/harness-schema/tree/main/v0) and one can look at [Jackson](https://github.com/FasterXML/jackson) as well.

It has usages as following: 

- The schema makes it easy for users to write pipeline and Template YAMLs in their favourite IDE such as IntelliJ/VS. The schema can be imported into the IDE, then used to validate the YAMLs as they are being written and edited.
- The same schema is used internally by Harness to validate YAMLs; so the validation is now standardised.

#### Can there be a way to select a delegate and see what steps have ran on it without going into each pipeline execution?

No, we don't have this capability.

#### Do we have an expression to retrieve from which branch the pipeline loaded the yaml?

No, we don't have such an expression which will always show from which branch the pipeline yaml was loaded.

#### Is there to check the pipeline was ever run in last two years?

As per the current design, the execution history is available up to the past 6 months only.

#### How do I form a OPA Policy to identify pipeline source ?

In pipeline YAML, we dont have pipeline source identifer but the remote pipelines will have githubConfig section, which can be used to form any required policy.

#### How do I check what YAML is checked against the OPA policies?

The actual YAML that is passed to the OPA engine can be viewd by following these steps - 
Create any policy, and apply it on the pipeline.
Go to evaluation under the policy menu
Click on the required pipeline and open the policy, you can see the actual YAML under the "Input" window.

#### How do I preserve my Manual approval step msg format in email body?

Emails are rendered in HTML, so different HTML tags can be added to approval steps message and these tag will be resolved as per HTML defination and same will be vivsible in email's body

#### How can we assign terraform output (e.g. VPC CIDR) to harness Pipeline or stage variable?

We have implemented a feature for capturing the the output of the Apply step.
You can use something like this to copy the json output in a file - 
```echo "<+pipeline.stages.EC2_deploy.spec.execution.steps.TerraformApply_1.output.TF_JSON_OUTPUT_ENCRYPTED>" > /opt/harness-delegate/aaabbb.txt```

Doc for reference - /docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs

#### How do I filter policy evaluation by status?

Under the evaluations section of policies we have a dropdown to filter based on status of policy evaluations. Currently we only support failed and sucess status not warned/warning

#### How do I created a OPA policy to enforce environment type?

The infra details are passed as stage specs.
For example, to access the environment type, the path would be - input.pipeline.stages[0].stage.spec.infrastructure.environment.type
You will have to loop across all the stages to check its infra spec.

#### How do I access one pipeline variables from another pipeline ?

Directly, it may not be possible. 
 
As a workaround, A project or org or account level variable can be created and A shell script can be added in the P1 pipeline after the deployment which can update this variable with the deployment stage status i.e success or failure then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable

#### What happens when the CPU and memory usage of a Delegate exceeds a certain threshold with the DYNAMIC_REQUEST_HANDLING flag set to true?

When CPU and memory usage exceed a specified threshold (or the default value of 70% if not specified) with the DYNAMIC_REQUEST_HANDLING flag set to true, the Delegate will reject tasks and will not attempt to acquire any new tasks. Instead, it will wait until resource usage decreases.

#### Will the Delegate crash or shut down if it rejects tasks due to resource usage exceeding the threshold?

No, the Delegate will not crash or shut down when it rejects tasks due to high resource usage. It will remain operational but will not attempt to acquire any new tasks until resource levels decrease.

#### How does the Delegate handle task acquisition when it's busy due to resource constraints?

Think of the Delegate's behavior as a queue. If the Delegate is busy and cannot acquire tasks due to resource constraints, other eligible Delegates will be given the opportunity to acquire those tasks.

#### What happens if there are no other eligible Delegates available to acquire tasks when the current Delegate is busy?

If there are no other eligible Delegates available to acquire tasks when the current Delegate is busy, the pipeline will remain in a running state, waiting for a Delegate to become less busy. However, if no Delegate becomes less busy during a specified timeout period, the pipeline may fail.

#### Is it possible to specify a custom threshold for rejecting tasks based on resource usage?

Yes, you can choose to specify a custom threshold for rejecting tasks based on CPU and memory usage. This threshold is controlled by the DELEGATE_RESOURCE_THRESHOLD configuration. If you don't specify a threshold, the default value of 70% will be used.

#### How can I pass a value from one pipeline to another in a chained pipeline setup?

You can pass a value from one pipeline to another by using output variables from the first pipeline and setting them as input variables in the second pipeline.

#### How do I access the value of an output variable from one child pipeline in another child pipeline within a chained pipeline?

To access the value of an output variable from one child pipeline in another child pipeline within a chained pipeline, you need to define the output variable in the first pipeline and set it as an input variable in the second pipeline.

#### Can you provide an example of how to use output variables from one child pipeline as input variables in another child pipeline within a chained pipeline?

Sure, in the first child pipeline, you can define an output variable like "image_id" and set its value to something like "<+pipeline.sequenceID>". In the second child pipeline, you can then set an input variable with the same name, "image_id," and it will automatically receive the value passed from the first child pipeline.

#### What is the benefit of passing values between child pipelines in a chained pipeline configuration?

Passing values between child pipelines allows you to create dynamic and interconnected workflows. It enables you to reuse and share data and results between different stages of your deployment or automation process, enhancing flexibility and efficiency in your pipeline execution.

#### Can you provide step-by-step instructions on how to set email as a notification preference for a user group?

Sure, to set email as a notification preference for a user group, go to the user group settings, locate the notification preferences section, select "email," and then save your changes. This will enable notifications to be sent to the members of that group via email.

#### What is the cause of the "OAUTH access restrictions" error when moving a pipeline to Git in Harness?

The "OAUTH access restrictions" error occurs when attempting to move a pipeline to Git if OAuth access is enabled for the Git experience in Harness.

#### What is PIE_GITX_OAUTH, and how does it relate to OAuth with Git in Harness?

PIE_GITX_OAUTH is a feature that enables OAuth integration with Git in Harness. When it's enabled, OAuth credentials are used for interactions with Git repositories.

#### Can I switch between OAuth and connector credentials for Git operations in Harness?

Yes to same some extend, you can switch between OAuth and connector credentials. If OAuth is set and you wish to use connector credentials, you can delete the OAuth configuration, and Harness will prompt you to use the connector's credentials while performing git actions.
For more info check - /docs/platform/git-experience/oauth-integration/

#### How to pass variables to Rego policy language

The OPA engine is designed to enforce policies based on data and rules that are predefined and provided as policies. It does not support taking dynamic input/variable values for policy evaluation during evaluations because policies are typically intended to be static and consistent. You can add a policy step as a workaround to work with variables during executions.

#### Can I download pipeline or step execution logs via the UI? 

Yes, you can. First we will need to enable this Feature Flag on your account "SPG_LOG_SERVICE_ENABLE_DOWNLOAD_LOGS". After this Feature Flag is enabled, a Downloads logs selector will be available in the edit pipeline (3 dots on top right panel of pipeline execution screen). 

For more details please see: [/docs/platform/pipelines/download-logs/]

#### Service hooks for Kubernetes and Helm deployments to fetch Helm Chart dependencies. 

This is possible, but a Feature Flag "CDS_K8S_SERVICE_HOOKS_NG" needs to be enabled. 

For more details please see: [/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks]

#### Using Helm v3.8.0 Binary

Harness supports using Helm v3.8.0 binaries. Please contact Harness support to enable the appropriate feature flags. 

#### Harness Cloudformation Deploying base stack gets stuck with message "Invalid request: The null format is not valid"

This is likely due to referencing the context variable at multiple places (e.g. ${context.basestackpre.basestackname}) in the CloudFormation Deploy Base Stack step and the step seems to be failing because of not being able to retrieve the proper values from the context variable as configured on the workflow.

#### What is the correct way to specify org or account level connectors in terraform resources ?
We should always prefix the scope of the connector ref before providing them in the resource file. For example if it is a org level conncetor the correct way to specify it is `org.myconnectorref`


#### Why do we get error in terraform provider that a project level resource can not be used at org level?
We have a top down hierarchy of the resources which goes account > org > project . You can refer any parent level resource at the child level but the reverse is not true. SO you should be able to reference a account level resource while creating a project level resource but not a project level resource while creating an account level resource.

#### What does the error `The order in patch list: [map[name:PROXY_PASSWORD value:] map[name:SOMEFIELD value:false] ......] doesn't match $setElementOrder list` means ?

The above error signifies that we have duplicate entries in the envVar in the manifest which is not allowed. To get rid of the error check the manifest envVar section for any duplicate entries, remove it and then re-run the pipeline.

#### Can we set auto upgrade to on for ECS fargate delegates ?

We do not have auto upgrade feature available for docker delegates which is what runs in fargate. We will have to manually change the task spec json file to change the image to the newest version.


#### Why some data for the resource configurations returned by api are json but not the get pipeline detail api ?

The reason the get api call for pipeline is returning a yaml because the pipeline is stored as yaml in harness. As this api call is for fetching the pipeline hence it is returning the yaml definition of the pipeline and not the json.
If still you need json representation of the output you can use a parser like yq to convert the response.

#### How can we access helm repo name from the helm connector?

We do not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in custom deployment template. For normal usage we can make an api call to get the connector details and get the repo name from the "helmRepoUrl" attribute.

#### Where does Harness Store release history for kuberenetes deployments using declarative rollback?

For decalarative rollback , Harness stores the release history data in secrets. 

#### Can we use terraform plan from one stage in apply step in another stage ?

The inherit from plan option for the terraform apply step can be used only within same stage. It is not possible to run plan step in one stage and then use inherit from plan option for apply step in another stage.

#### What is the recommended way to save the state file for terraform pipelines?

For testing scenarios you can run the terraform without remote backend for saving the terraform state file however for prodcution runs it is always recommended to start with a remote backend configured from first run.


#### How can we add newline in mail body sent from email step ?

The email body sent uses a html format and hence the newline character will not work for adding newline entries. We need to make use of html line break for this `<br>`.

#### Can CD Delegate act as an orchestrator?

We support CD delegate act as an orchestrator only while using container steps and with lite-engine only .

#### Saving Inputsets in a different repo than the pipeline

You can save input sets in a different repo from the pipeline. All you need to do is go to Account Settings --> Account Resources --> Default Settings
Go under Git Experience and checkmark Allow different repo for Pipeline and InputSets. Now while trying to save the input you can save it in a different repo. 

#### Mark step as Failed in a running pipeline(User marked Failure) 

You can now mark Step in a pipeline as Failed. To enable the option, go to Account Settings --> Account Resources --> Default Settings
Go under Pipelines and checkmark Allow users to mark a running Step as failure. 

#### How to view Deployment history (Artifact SHA) for a single service on an environment

You can go to Service under the project --> Summary will show you the details with what artifact version and environment. 

#### Harness enabling auto-deployment

To have automatic deployment in Harness, you can make use of triggers. On new artifact. 
https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/triggers/trigger-a-deployment-on-a-time-schedule/
As soon as your build is complete and it publishes a new artifact you can setup a trigger on that and it will trigger a Harness Deployment. 

#### Question about deployToAll yaml field, The pipeline yaml for the environment contains deployToAll field. What does that field do?

The field is used when you use the deploy to multiple infrastructures option. 
This field is for deploy to all infra inside an environment. 
 
[Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/)
 
#### How to exit a workflow without marking it as failed

You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. 

#### 2 Deployments in pipeline, is it possible for me to rollback the stage 1 deployment if the stage 2 tests returned errors?

We do have a pipeline rollback feature that is behind a feature flag. This might work better as you would be able to have both stages separate, with different steps, as you did before, but a failure in the test job stage could roll back both stages.
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-for-pipelines)
  
Also, for the kubernetes job, if you use the Apply step instead of Rollout then the step will wait for the job to complete before proceeding, and you would not need the wait step.

#### Backup resource yaml files

We do have git experience where you can save your yaml files for pipeline , inputset and templates to your git. 

[Documentation](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities)
 
We don't save yaml's for service and other entities like we used to in First Generation: [Documentation](https://developer.harness.io/docs/frequently-asked-questions/harness-faqs/git-exp-vs-config-as-code/#does-the-configuration-as-code-support-matrix-include-entities-supported-by-git-experience)
 
[Documentation](https://developer.harness.io/docs/frequently-asked-questions/harness-faqs/git-exp-vs-config-as-code/#why-did-harness-reduce-the-number-of-supported-entities-backed-by-git)


#### Running into Harness Platform Rate limits?

Please note that harness does limit accessive API and execution limitations. Harness does reserve the right to change these limits. 
See site fore more details [https://developer.harness.io/docs/platform/rate-limits/]

#### How are Harness secrets tied to connector, and what to watch for. 

Customers should be mindful of the fact that connectors are often tied to a secret (password or sshkey) that may expire. This is often a common cause of execution failures with connector errors. 

#### How to visualize and compare pipeline changes? 

Harness allows users to compare changes to a pipeline YAML. This is often useful tool to determine why a pipeline has changed behavior. 
See site for more details [https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/]

#### Harness rollback deployments. 

Harness Rollback deployments initiate a rollback of the most recent successful deployment. Note that this feature is behind a feature flag '''POST_PROD_ROLLBACK'''. Rollback deployments are currently supported by the following deployment types only (Kubernetes, Tanzu Application Services, Amazon ECS)

#### Do we allow one-time scheduling of pipeline execution ?

Yes, one can set a cron rule that just happens once, it has repeat reschedule icon in UI. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#run-once).

#### Do we expect the 2-way git sync functionality to be added to NextGen?

No, we are not bringing the 2 way git sync back in its first Gen form. Instead, we provide git experience support for pipelines, templates today.
On our roadmap, we will provide git experience for service, environments and overrides.Please refer more on this in the following [Documentation](https://developer.harness.io/docs/faqs/git-exp-vs-config-as-code/).

#### Do we support propogation of multiple service stage ?

No, this feature is yet to be added, we will update about this very soon.

#### Is the expression <+configFile.getAsBase64("myFile")> only supported when using service config file and not a config file in File Store? 

Yes, It works for config files added to the service and not any config file from the file store. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store/#reference-files-in-the-file-store-using-an-expression).

#### Can we increase the Workflow Queue limit ?

No, for the Harness based locking on infrastructure, currently the max is 20 and its not configurable, since we allow only 1 concurrent execution per infra. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/workflows/workflow-queuing/#limitations).

### Does the container step in CD override the entry point when using the command input?

The entry point in the base image will be overwritten as we have to run the commands specified in the run step.

### How does Harness Terraform Work and Rollback Work?
Harness integrates with Terraform to create tasks that define infrastructure changes, execute Terraform plans, and apply changes to your infrastructure. In case of issues or failures, it provides the capability to roll back to a previously known good state using Terraform state management.

### What are Service Variables in the context of Harness?
Service Variables in Harness are dynamic parameters or values that can be used within your deployment workflows to customize and control the behaviour of your services and pipelines.

### What is the purpose of overriding Service Variables in the Environment configured in the Stage Harness?
Overriding Service Variables allows you to modify or specify specific values for your services in a particular environment or stage, ensuring that each deployment uses the appropriate configurations.

### How do I override Service Variables in a Harness Environment within a Stage?
You can override Service Variables in Harness by navigating to the specific Environment within a Stage configuration and then editing the Environment's settings. You can specify new values for the Service Variables in the Environment settings.

### Can I override Service Variables for only certain services within an Environment
You can selectively override Service Variables for specific services within an Environment.

### What happens if I don't override Service Variables for a specific Environment in a Stage?
If you don't override Service Variables for a particular Environment in a Stage, the values defined at the Service level will be used as the default configuration. This can be useful for consistent settings across multiple Environments.

### Can I use expressions or reference other variables when overriding Service Variables?
You can use expressions and reference other variables when overriding Service Variables in Harness. This allows you to create dynamic configurations based on the values of other variables or calculations.

### Are there any safety measures to prevent unintended changes when overriding Service Variables?
Harness typically provides auditing features to track changes made to Service Variables, helping prevent unintended changes and ensuring accountability.

### Can I revert or undo the overrides for Service Variables in an Environment?
You can revert or undo the overrides for Service Variables in an Environment anytime you can revert variables to their default values.

### What are some common use cases for overriding Service Variables in an Environment?

   - **Environment-specific configurations:** Tailoring database connection strings, API endpoints, or resource sizes for different environments (e.g., dev, staging, production).
   - **Scaling:** Adjusting resource allocation and load balancer settings for different deployment environments.

### Where can I find more information and documentation on overriding Service Variables in Harness?
You can find detailed documentation and resources on how to override Service Variables in Harness here:https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides/

### What can be templated using Harness Templates in Next Gen?
You can create templates for various components like steps, stages, and pipelines.

### Can I version control Harness Templates?
Yes, Harness typically provides version control for templates, allowing you to track changes and roll back to previous versions if needed.

### Can I share templates across different projects or teams?
Yes, you can share templates across projects and teams in Harness If the template is created at the organisation and account level scope, making it easy to maintain consistency and best practices.

### Can I customize or modify templates for specific use cases?
Yes, you can customize templates for specific use cases by creating versions of templates and making adjustments as needed. Templates provide a starting point that can be used for specific requirements.

### Is it possible to deploy Cloud Functions across multiple GCP regions with Harness?
Yes, you can configure deployment pipelines in Harness to deploy your Google Cloud Functions across multiple regions for redundancy and improved performance.

### What deployment strategies can I use with Google Cloud Functions in Harness?
The harness supports various deployment strategies, including Blue/Green, Canary, and Rolling deployments. You can choose the strategy that best fits your use case and define deployment criteria and rollback conditions accordingly.

### Can I use Harness to manage environment-specific configurations for my Cloud Functions?
Yes, Harness supports environment-specific configurations for your functions. You can use Harness secrets management to store sensitive information, such as API keys or database credentials, and inject them into your Cloud Functions during deployment.

### What types of events can trigger notifications in Harness pipelines?
Notifications can be triggered for various events, such as pipeline starts, pipeline successes, pipeline failures, specific workflow steps, and manual approvals. You can customize the triggers based on your requirements.

### What is Kustomize, and how does it relate to Harness Next-Gen?
Kustomize is a Kubernetes-native configuration management tool that simplifies the customization of Kubernetes manifests. In Harness Next-Gen, Kustomize is used to manage and customize Kubernetes manifests for deployments.

### What are Kustomize overlays, and why are they useful?
Kustomize overlays are a way to customize and extend Kubernetes manifests without modifying the original base manifests. Overlays allow you to apply environment-specific configurations, such as namespace, labels, and resource limits, to the base manifests, making it easier to manage different environments (e.g., dev, test, prod) within a single repository.

### Can I use variables and secrets with Kustomize overlays in Harness?
Yes, you can use Harness variables and secrets in your Kustomize overlays to parameterize configurations and securely manage sensitive data.

### What is the deployment process for Kustomize-based applications in Harness Next-Gen?
When you deploy a Kustomize-based application in Harness, Harness will automatically apply the specified overlay based on the target environment, ensuring that the Kustomized Kubernetes manifests are deployed correctly.

### Can I preview and validate Kustomize manifests in Harness before deployment?**
Yes, Harness provides a preview and validation feature for Kustomize manifests, allowing you to review and validate the customised manifests for correctness before initiating a deployment.

### What are the benefits of using Kustomize manifest with Harness Next-Gen for Kubernetes deployments?
Using Kustomize with Harness simplifies the management of Kubernetes manifests by providing a declarative and version-controlled approach to customizations. It ensures consistency across environments and simplifies the deployment process.

### Does Harness Next-Gen support GitOps workflows with Helm Charts?
Yes, you can integrate Harness Next-Gen with Git repositories that use Helm Charts for GitOps workflows. Harness can synchronize with your Git repository, pull Helm Charts, and deploy them as needed.

### Can I use Helm Charts from public repositories like Helm Hub with Harness Next-Gen?
You can use Helm Charts from public Helm repositories like Helm Hub. Harness Next-Gen allows you to specify the Helm repository URL and Chart version when configuring your deployment.

### Can I use SSH keys for authentication in Harness Next-Gen SSH deployments?
Yes, Harness Next-Gen supports SSH key-based authentication. When deploying to remote servers, you can configure Harness to use SSH keys for secure authentication.

### Can I use SSH deployments in combination with other deployment strategies in Harness Next-Gen?
Yes, you can incorporate SSH deployments into your deployment pipelines along with other strategies, such as container deployments or Helm Chart deployments, to support complex multi-tiered applications.

### Which versions of ArgoCd that the latest version of the GitOps agent support? 
We currently support v2.7.8
 
### The GitOps agent updater, can you advise that this will update the agent, argocd and redis? Is this also true if use the option to bring our own ArgoCd?
 
It is used to update agents only whenever a new version is available. The Argo CD components upgrade must be done manually

 
### Also, is it possible to automate the provisioning of the GitOps agent using a helm chart without having to register/create the agent in the UI first? At the moment it looks like you need to create the agent in the UI which then generates the yaml or helm chart for you.
Yes, using Terraform, it is possible to automate the provisioning of the GitOps agent without having to register/create an agent in the UI.

### Is there a way in the harness where we can use bash shell over WinRM connection?
Yes, you can use Bash shell over WinRM connection in Harness. In the Shell Script step, you can select Bash as the Script Type and specify the WinRM target host to execute the script on.

### Is it possible to use Helm hooks in Harness Helm deployments?
Yes, you can use Helm hooks in Harness Helm deployments. Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process.

#### I have a placmenetStrategy defined but I don't see it reflected in the task.
Please check if you have defined placement strategy in service definition and not under task definition

#### When I started setting up the pipelines in Harness, I used my Github PAT. But I couldn't find where I set it and was wondering if it's allowed to be updated by the PAT owner or from your side.
Usually Git PAT is stored in secret manager and you reference that secret inside connector, so need to update the PAT in secret manager where it's stored.

#### We have templated workflow variables and wish these can be passed from git based Triggers. The values for these variables will be metadata of a pull request
You can create workflow variable and set the value to corresponding metadata field available as per type of trigger pullrequest variable

#### How to clone files from git repository within a Shell script step?
We do not natively support leveraging GitHub Connectors within a shell script. However, you can configure an SSH Key or HTTP Authentication by referring to the same secret as your connector does in your shell script. This way, you only need to define and rotate your credentials in one place.
