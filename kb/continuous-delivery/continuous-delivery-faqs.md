---
title: Continuous Delivery & GitOps FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps.
---

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

```
module "transit-gateway" {
  source = "git::https://gitlab.com/rubrik-octo/lab/source-modules.git//site-deploy/transit-gateway"
}
```
Here you see a single git repository named 'source-modules, that has multiple modules inside various folders. By using the '//' at the end of the source location, you can instruct Terraform to checkout a specific folder. 

#### Do we need to install jq library in delegate machine or harness itself providing jq by default?

Harness by default does not provide by default the jq on delegate host. You need to add the below command in your INIT_SCRIPT for this.

```microdnf install jq```

#### Why can't I access dashboards?  It says `Requires Upgrade to Enterprise Plan to set up Dashboards`

Dashboards requires an Enterprise license for all modules except for the CCM module

#### I'm getting `Secret in version "v1" cannot be handled as a Secret: illegal base64 data at input byte`.  What does it mean?

K8s secrets need to be encoded with base64.  If the encoding is wrong you might get this error.  If creating a k8s secrets and it's not base64 encoded you can use stringData instead:
https://kubernetes.io/docs/concepts/configuration/secret/#restriction-names-data

#### How do I submit a feature request for the Harness Platform?

In the documentation scroll down and at the bottom under Resources click on Feature Requests.  It will lead you to this internal portal: https://ideas.harness.io/

#### The deployment still got triggered despite the freeze window I've set.  What gives?

Pipelines executed with custom webhook triggers can override deployment freeze. This can be enabled by associating the API key or Service Account API key authorization with deployment freeze override permissions (https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#trigger-freeze)

#### The deployment is failing at a step with the error message `Invalid request: ConnectException: Connection refused (Connection refused)`.  What gives?

Check the access control for the network.  It could be that the request is blocked on the network side

#### Are there variables for account and company name?

`<+account.name>` and `<+account.companyName>`

#### How do I set up a cron expression so it tiggers on the first Wednesday of each month at 15:00?

Set the cron trigger type to QUARTZ and for the expression set it to `0 0 15 ? * 3#1 *`

#### Is there a variable to check who's triggered the pipeline?

Yes.  You can use `<+pipeline.triggeredBy.email>`

#### Why can't I create resources using the harness terraform provider in my harness prod-3 cluster account?

It could be the endpoint needs to be set to `https://app3.harness.io/gateway`

#### Can plan from terraform step be encrypted using a read only secret manager ?

For encrypting terraform plan with the selected secret manager we need the ability to write the encrypted plan to the secret manager and hence read only secret manager will not work for this scenario.

#### What operations are performed as part of the cleanup step in ssh command task.

For SSH, we by default add an initialize step and a clean step apart from command execution step. As part of the cleanup step we we delete the working directory that lies within /tmp on the remote connected host.

#### Whether pipeline GitHub triggers support for project variable reference?

Pipeline GitHub triggers won’t support project variable reference. As trigger yaml is independent of the pipeline yaml and the trigger will not be aware of the expression output. 

#### Is it possible to use conditional execution in looping strategies?

If you use a looping strategy then you will not be able to apply conditional execution on the child steps.

#### How to upload a file into a specific folder present in the harness filestore from the pipeline stage (PowerShell script)?

This can be achieved by using an API which you can invoke using [PowerShell]( https://apidocs.harness.io/tag/File-Store/#operation/create).

#### How to Use Expressions or Variables in Repeat Looping Strategy?

To pass a dynamic array as an input to the looping strategy of the next step, you can replace ```<+execution.steps.ShellScript_1.output.outputVariables.ARRAY1>``` with 
```<+<+execution.steps.ShellScript_1.output.outputVariables.ARRAY1>.split(",")>```. This change allows you to split the array into individual items using a comma as the delimiter.

#### Why the "Always Execute this Step” condition does not always run in the CD pipeline?

Always execute step runs regardless of success or failure but in order to trigger this condition on failure the previous step should be considered as failure, if the error is rolled back then it is not considered a failure. Hence, the next step's Conditional Execution is not executed. Therefore, a failure strategy such as “Mark as failure” or "ignore failure" is required.

#### What happens if my manifest files are changed during pipeline execution, will harness pick the latest file?

The files are fetched only during the execution step i.e. during rollout. if the files are changed and committed before the "Fetch file" step is executed in the rollout phase, Harness will pick the latest file.

#### Can I encrypt the Token/Secret passed in the INIT_SCRIPT?

Directly this cannot be encrypted but this use can be achieved by creating the k8s secret for the credentials and referring them in the init script.

**example** -

``` aws_access_key=kubectl get secrets/pl-credentials --template={{.data.aws_access_key}} | base64 -d```
```aws_secret_key= kubectl get secrets/pl-credentials --template={{.data.aws_secret_key}} | base64 -d```

Another approach would be saving the value in Harness's secret manager/any other secret manager and referencing it in the script.
Check for more info in - [Documentation](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets)

#### K8s delete command is not working with the native helm?

The K8s delete command/step does not work with native helm deployment because Harness has different logic to maintain versioning and rollback for native helm and k8s. In the case of the native helm, If the deployment fails, we’ll uninstall it ourselves. However, if the user wants to pass some command flags with Uninstall, that can be passed by selecting Uninstall and passing the relevant command flags. 

Check this for more details - [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#uninstall-command-flag)

#### How do I run helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment. you can leverage the shell script step and run the helm uninstall ```release-name``` command from the delegate onto the cluster.
To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate. 

For this use case within the shell script, you can simply reference credentials as $\{HARNESS_KUBE_CONFIG_PATH}

```export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test```

With this even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.

#### In the Rollout Deployment step, how Harness retrieves the events in the Wait for Steady State phase?

During the "Wait for Steady State" phase, Harness retrieves events using the ```kubectl rollout status``` command, which retrieves information directly from the Kubernetes API server. Harness continuously polls the Kubernetes API server while a rollout is in progress, ensuring that it remains updated until the rollout is either completed or encounters an error.

#### When migrating from FirstGen to NextGen, will the release number of ConfigMaps and Secrets be reset to 1?

In the case of migrating from Harness FirstGen to Harness NextGen, the numbering of `ConfigMaps` and `Secrets` in Kubernetes will not be automatically reset to start from 1 again. The numbering is based on the release history and is incremented based on the latest release number.

When you migrate your application to Harness NextGen and continue to use the same release name as before, the versioning will not be reset. Harness will fetch the `ConfigMap` in the cluster that stores all the Harness releases with their respective numbers. It will retrieve the latest release number from the `ConfigMap` and increment it by 1 for the next deployment. If versioning is enabled, Harness will append `-<release-number>` to each `ConfigMap`/`Secret` declared in the manifest.

Therefore, if you migrate to Harness NextGen and use the same cluster and release name, the release number will not break. The numbering will continue based on the existing release history.

It's important to note that Harness provides a declarative rollback feature, which eliminates the need for resource versioning. This means that even if you don't maintain the numbering scheme, you can still perform rollbacks effectively using the declarative rollback feature provided by Harness.

For more information, you can refer to the documentation on declarative rollback in the link provided: [Harness Declarative Rollback](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#declarative-rollback).

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

Yes, certainly we have that capability, to know more about this please see, [Documentation](https://developer.harness.io/docs/continuous-delivery/manage-deployments/rollback-deployments)

#### How can I override the lite-engine image for the Container Run step,to pull images from ECR instead of docker hub? 

Yes, certainly that can be acheived by using Docker Connector with your registry URL and anonymous access would help you to acheive that.

#### How can only set of user able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/#select-approvers)

#### How Kubernetes Pruning option work during the deployment?

If you have enabled the Kubernetes Pruning in your deployment. In that case, it will remove any resources that were present in an old manifest but are no longer present in the manifest used for the current deployment.

For reference: [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/) 

#### How release: \{\{ .Release.Name }} will help in steady state check in helm deployment?

We perform a pod fetch based on this label, which allows us to show deployed pods in the step output and also track the same for instance sync. If we don't add these, both won't work as expected.

For reference: [Steady state check](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/#spec-requirements-for-steady-state-check-and-versioning)

#### Where we need to add label release: \{\{ .Release.Name }}?

For any manifest object which creates the pod, you have to add this label in its spec. Adding it in Service, Deployment, StatefulSet and DaemonSet should be enough.

#### What does the release name mean in the Infrastructure?

The release name is used to create a harness release history object, which contains some metadata about the workloads. This helps us perform the steady state check.

#### I have a pipeline in CG that has a variable of ```${artifact.buildNo}``` in a command and same variable is not working in NextGen.

You can use artifact.tag in NG , which is equivalent to artifact.buildNo from CG, you can find more details around mapping in : [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#migrate-firstgen-expressions-to-nextgen)

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

Sure! An example of the calculation can be found in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#example). This example illustrates how the number of service instances corresponds to the consumed service licenses.

#### Is on-demand token generation valid for both Vault's Kubernetes auth type and app role-based auth?

No, on-demand token generation is only valid for app role-based auth.

#### How can I upload a file to a specific folder in the Harness file store from a pipeline stage using PowerShell script?

You can achieve this by invoking the Harness API using PowerShell. The API endpoint you need to use is: [API Endpoint](https://apidocs.harness.io/tag/File-Store#operation/create)

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

You can use Ternary operators to achieve this use case more information on this [here](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#ternary-operators).
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

* ```<+httpResponseCode>==200```
* ```200==<+httpResponseCode>```
* ```<+pipeline.variables.EXPECTED_RESPONSE>==<+httpResponseCode>```

Expression to assert on Strings would require double quotes. Please note that it would require Double Quotes on both ends.

#### Can I customize the looping conditions and behaviour?

Yes, Harness NextGen often offers customization options to define the loop exit conditions, maximum iteration counts, sleep intervals between iterations, and more information [here](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
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

We do have 6 month Data retention period as mentioned in [Documentation](https://www.harness.io/pricing?module=cd#) 
So older deployments will not be available.

#### Currently we make use of this feature from FirstGen. Is there, or will there be an equivalent feature in Next Gen?

Consider the below mentionings :
- Reference 1 : [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/publish-pipeline-events-to-an-http-endpoint/)
- Reference 2 : You can Use Webhook notifications in NG to inform an external application of an event. Refer to this [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#webhook-notifications) 

#### How to use spilt function on variable

You can split on any delimiter and use index based access.
For ex: if you have a variable with prod-environment-variable so you can use below to get prod
```<+<+pipeline.variables.envVar>.split('-')[0]>```

#### How to use Substring function on variable

You can use substring function and need to pass starting and end index
For ex: if you have a variable with prod-environment-variable so you can use below to get prod
```<+<+pipeline.variables.envVar>.substring(0,3)>```

#### How to pass value to a variable manually while running from ui if same pipeline is configured to run via trigger and using variable from trigger.

You can check the triggerType variable to identify if pipeline was invoked via trigger or manually and can use below jell condition 
```<+<+pipeline.triggerType>=="MANUAL"?<+pipeline.variables.targetBranch>:<+trigger.targetBranch>>```

#### How to concatenate secrets with string

You use either of following expressions:

```<+secrets.getValue("test_secret_" + <+pipeline.variables.envVar>)>```

OR

```<+secrets.getValue("test_secret_".concat(<+pipeline.variables.envVar>))>```

#### Can a non-git-sync'd pipeline consume a git-sync'd template from a non-default branch?

Yes an Inline pipeline can consume a template from non-default branch.

:::info Template Library

Reference specific versions of a template on a different branch from the pipeline.

While using Harness Git Experience for pipelines and templates, you can now link templates from specific branches.

Previously, templates were picked either from the same branch as the pipeline, if both pipelines and templates were present in the same repository, or from the default branch of the repository, if templates were stored in a different repository than the pipeline.

The default logic will continue to be used if no branch is specified when selecting the template, but if a specific branch is picked while selecting the template then templates are always picked from the specified branch only.

:::

#### Is there a way to generate a dynamic file with some information in one stage of the pipeline and consume that file content in a different pipeline stage?

For CI :

You can refer to this [Documentation](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/).

For CD :

You can use API to create file in harness file store and then refer it to other stage. Refer [here](https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders).

Or

You can just write a file on the delegate and use the same delegate.

#### How to do a Flank Deployment in Harness?

You can use Deployment Templates for this use case. You can find more information on this [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/).

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

The multiple selection functionality is currently behind the feature flag, ```PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES```. Contact Harness Support to enable the feature.

#### In the declarative rollback, it will rollback also the secrets and config maps used in the last successful execution and can we retain more than 2 older release secrets and config maps?
?

During rollback, Harness reapplies the previous manifest. This is the declarative method, and it includes the ConfigMap and Secrets of the last known good state.  
Harness uses a fixed limit of 2 in its release history cleanup logic. This value cannot be changed. 
Refer more on this in [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#important-notes)

#### Is this the right format to push a secret to the Azure key vault? secret.setVaule("azurevauly://avidentifier/pathToSecret", secretVaule)
secret.setValue is not supported. Secrets can be referred to only using ```secret.getValue("azurevauly://avidentifier/pathToSecret")``` or `secret.getValue("secretIdentifierInHarness")`
#### Why it is that you cannot use OCI Helm registries with Helm Chart triggers?
OCI Helm does let us poll the repository for changes, we can get a list of chart versions, but we cannot poll and detect a new version. This capability hasn't been built by OCI Helm

#### Can we use variables in the vault path to update the location dynamically based on environment?

A expression can be used in the URL, for example - Setting up a PATH variable in the pipeline and calling that variable in the get secret - echo "text secret is: " ```<+secrets.getValue(<+pipeline.variables.test>)>```

#### Can we add a delay of n minutes before a pipeline is invoked via trigger?

We don't have any timer for the trigger. It will trigger the pipeline whenever a change is made in the master branch.
Since this is a webhook.
 
As a workaround, a shell script can be added to sleep for 10 mins or n mins as per requirements

#### How can I manually launch a pipeline which has conditional execution based on trigger data?

Pipeline will run into an error because trigger basesd expression will be null.
 
We can add a workaround, instead of adding the condition such as - ```<+trigger.event> == "PR"```, set it to a variable, pass the variable value at runtime, and set the default value as ```<+trigger.event> == "PR"```, so when the pipeline is executed with a trigger default value is passed and it while executing it manually, you can set it as false to skip the condition of this execution.

#### what are PerpetualTask?

PerpetualTasks" refers to any task that is running on the delegate continuously and lasting indefinitely. All the tasks have ```task id```, ```ex - rCp6RpjYTK-Q4WKqcxalsA``` associated with it, we can filter the delegate logs based on the task ID and we can check what step is continuously failing at the delegate, it could be reading secrets from the vault or taking a lock over some resource.

#### Does Harness have cache layer for the Helm chart repo index during deployment steps?

We have a caching mechanism where we create a cache folder (based on connectorID) and store the ```repositories.yaml``` file there.

#### Is it possible to disable First Generation?

Yes, You should see the toggle "Allow Harness First generation Access" setting in NG Account Overview UI. Use this to enable and disable the first gen access

#### How do I use OPA policy to enforce environment type for each deployment stage in a pipeline i.e. prod or preprod?

The infra details are passed as stage specs.

For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
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

Yes, we use the ```PROXY_HOST``` and ```PROXY_PORT``` variable values to build the ```HTTP_PROXY (or HTTPS_PROX)Y``` environment variable and inject it

#### How do I delete k8s resources which are part of the release?

During deployment Harness creates a ConfigMap listing the resources of the release and uses the release name for tracking them. The release name is defined in the Infrastructure settings, in Cluster Details, in Advanced.
 
If this config map is deleted or if the resource is not deployed via Harness then we delete step won't be able to find the given resources.

#### Can I add CI/CD steps to customer stage?

Native CI and CD steps are not supported for custom stage, These steps cannot be added via UI. Adding them manually will result in an error while running the pipeline - "Stage details sweeping output cannot be empty"

#### How can we deploy a specific resource in a helm chart as part of rolling deployment?

If it is a Kubernetes/Helm, you can use an Apply Step
 
Please refer more on this in [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step/)
 
You can take a specific file from the manifest and execute it separately (before or after) the normal deployment.  To prevent the file from being included in the normal part of the deployment, you would include this ```# harness.io/skip-file-for-deploy``` at the top of the file.

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

Yes, it is expected design behaviour. Please refer more on this in following [Documentation](https://developer.harness.io/docs/platform/templates/templates-best-practices/#reconciliation)

#### If declarative rollback is enabled, will it rollback secrets and configmaps or we need to enable versioning ?

No, Versioning is not done when declarative rollback is enabled. Please refer more on this in following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-releases-and-versioning/)

#### How do I use an output from one stage in a looping strategy of another stage ?

If there is certainty in terms of number of Stages created, this could be achieved by creating a intermediary shell script which is concatenating output variables from previous stages with a “,” and building a list which can them be passed onto the next stage for lopping over this list. For more on this please refer this in following [Documentation](https://developer.harness.io/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies)

#### Do we support services and envs at the org level ?

Yes, we do. For more please refer this in following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/services-and-environments-overview/#creating-services-at-an-account-or-organization-level)

#### Can Expressions operate within Harness Variables for configurations at the account level in the Next-Gen version?

No, higher level entity cannot refer to lower scoped entities. Please refer more on this in following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable/)

#### Can we use a Pipeline within a pipeline in a template ?

No, This is a limitation with templates. We do not support creating pipelines stage templates.

#### Does an expression retrieve from which branch the pipeline loaded the yaml ?

No, there is no such expression which will always show from which branch the pipeline yaml was loaded.

#### Can we run two input sets of a pipeline together in parallel ?

No, It needs to be a different execution everytime.

#### Can we select a delegate and see what steps have ran on it without going into each pipeline execution?

No, we don’t have this capability.

#### In Harness FirstGen, how can I remove the old plan-file and start again with a fresh plan to make the workflow run successfully?

You can [enable the Skip Terraform Refresh when inheriting Terraform plan option](https://developer.harness.io/docs/first-gen/continuous-delivery/terraform-category/add-terraform-scripts#option-2-skip-terraform-refresh-when-inheriting-terraform-plan).

#### For variables do we have options to intake parameters via dropdown or radio buttons etc ?

Yes we do, here in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#supplying-runtime-inputs-during-execution) , with allowed values you can have multiple inputs to select from range of values allowed.

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

#### Why is a certain pipeline step not running even though it meets the conditional execution criteria?

If a specific pipeline step is not running despite meeting the conditional execution criteria, it could be due to the presence of a failure strategy at the pipeline level. The failure strategy takes precedence over conditional execution settings. 

#### How do I resolve No eligible delegate(s) in account to execute task. Delegate(s) not supported for task type ```{TERRAFORMTASKNGV6}``` error?

Upgrading the delegate to latest version should resolve this issue.

#### What is MonitoredService?

Monitored service are used for service reliability management. You can find more details on this in following [Documentation](https://developer.harness.io/docs/service-reliability-management/monitored-service/create-monitored-service/)

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

You can use .toLowerCase() for example ```<+<+stage.variables.ENVIRONMENT>.toLowerCase()>``` and retry the pipeline?

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

The roles required to edit Pipeline Triggers and Inpout sets are ```View and Create / Edit```

#### If we have multiple services using this same pipeline template, both within and outside the same project, does Harness differentiate each pipeline execution by service? If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step, would approving the service1 pipeline cause the service2 pipeline to be rejected?

The pipelines will run just fine, as you used the template and specified different services at the runtime , so it will run independently. 

#### Service showing as active but hasn't been part of a deployment in over 30 days

Harness shows the Active instances is say you had a deployment and the VM got deployed from a Harness deployment. No matter if we deploy anything else on the VM , until the VM is up and running as it is linked with the service. It will show as active instance. The 30 days mentioned [here](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#active-services) , is for service based licence calculation and usage for CD. 

#### Can we access the file from Harness file store as a file ?

The contents of the file in the Harness file store can be read as ```<+fileStore.getAsString("filename")>``` . However if we need it as a file itself we will need to write it back to a file in the step and then use it:
```
cat>>filename.txt<<EOF
<+fileStore.getAsString("filenameInHarnessFileStore")>
EOF
```
#### Do we need to escape '\{' in manifest for go templating ?

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

Yes, the Harness GitOps Agent is designed to work with various Kubernetes distributions, including managed Kubernetes services like Amazon EKS, Google Kubernetes Engine (GKE), and Azure Kubernetes Service (AKS), as well as self-managed Kubernetes clusters.

#### Getting an error while evaluating expression/ Expression evaluation fails

The concatenation in the expression /tmp/spe/\<+pipeline.sequenceId> is not working because a part of expression \<+pipeline.sequenceId> is integer so the concatenation with /tmp/spec/ is throwing error because for concat, both the values should be string only.

So we can invoke the toString() on the integer value then our expression should work. So the final expression would be /tmp/spe/\<+pipeline.sequenceId.toString()>

#### Can I use the Service Propogation Feature to deploy dev and prod pipelines without changing critical parameters?

Yes, the Service Propogation allows you to provide fixed critical parameters. Please refer more on this in the following [Documentation 1](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services/) and [Documentation 2](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/overrides-v2/).

#### Do we need to manually filter the API response to check if the pipeline was executed by a trigger in NG ?

Yes,Harness NG uses REST APIs not graphql, this means that we need to review the api calls they are making and provide them the api endpoints that are parity. 

#### Do we support nested AD groups syncing to Harness on AD SCIM sync?

Enabling Azure AD provisioning in Harness allows user provisioning from Azure AD. Users directly provisioned require group assignment in Harness, while Azure AD group members' group assignments are managed in Azure AD. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)

####  Do we have the export manifests option in NG like we have in CG?

No, we have a dry-run step, that will export manifest for customer to use in other steps, but there is no option to inherit manifest.Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-dry-run/)

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

Doc for reference - [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs)

#### How do I filter policy evaluation by status?

Under the evaluations section of policies we have a dropdown to filter based on status of policy evaluations. Currently we only support failed and sucess status not warned/warning

#### How do I created a OPA policy to enforce environment type?

The infra details are passed as stage specs.
For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
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

Sure, in the first child pipeline, you can define an output variable like ```image_id``` and set its value to something like ```<+pipeline.sequenceID>```. In the second child pipeline, you can then set an input variable with the same name, ```image_id```, and it will automatically receive the value passed from the first child pipeline.

#### What is the benefit of passing values between child pipelines in a chained pipeline configuration?

Passing values between child pipelines allows you to create dynamic and interconnected workflows. It enables you to reuse and share data and results between different stages of your deployment or automation process, enhancing flexibility and efficiency in your pipeline execution.

#### Can you provide step-by-step instructions on how to set email as a notification preference for a user group?

Sure, to set email as a notification preference for a user group, go to the user group settings, locate the notification preferences section, select "email," and then save your changes. This will enable notifications to be sent to the members of that group via email.

#### What is the cause of the "OAUTH access restrictions" error when moving a pipeline to Git in Harness?

The ```OAUTH access restrictions``` error occurs when attempting to move a pipeline to Git if OAuth access is enabled for the Git experience in Harness.

#### What is PIE_GITX_OAUTH, and how does it relate to OAuth with Git in Harness?

```PIE_GITX_OAUTH``` is a feature that enables OAuth integration with Git in Harness. When it's enabled, OAuth credentials are used for interactions with Git repositories.

#### Can I switch between OAuth and connector credentials for Git operations in Harness?

Yes to same some extend, you can switch between OAuth and connector credentials. If OAuth is set and you wish to use connector credentials, you can delete the OAuth configuration, and Harness will prompt you to use the connector's credentials while performing git actions.
For more info check - [Documentation](https://developer.harness.io/docs/platform/git-experience/oauth-integration/)

#### How to pass variables to Rego policy language

The OPA engine is designed to enforce policies based on data and rules that are predefined and provided as policies. It does not support taking dynamic input/variable values for policy evaluation during evaluations because policies are typically intended to be static and consistent. You can add a policy step as a workaround to work with variables during executions.

#### Can I download pipeline or step execution logs via the UI? 

Yes, you can. First we will need to enable this Feature Flag on your account ```SPG_LOG_SERVICE_ENABLE_DOWNLOAD_LOGS```. After this Feature Flag is enabled, a Downloads logs selector will be available in the edit pipeline (3 dots on top right panel of pipeline execution screen). 

For more details please see: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks)

#### Service hooks for Kubernetes and Helm deployments to fetch Helm Chart dependencies. 

This is possible.

For more details please see: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks)


#### Using Helm v3.8.0 Binary

Harness supports using Helm v3.8.0 binaries. Please contact Harness support to enable the appropriate feature flags. 

#### Harness Cloudformation Deploying base stack gets stuck with message "Invalid request: The null format is not valid"

This is likely due to referencing the context variable at multiple places (e.g. $\{context.basestackpre.basestackname}) in the CloudFormation Deploy Base Stack step and the step seems to be failing because of not being able to retrieve the proper values from the context variable as configured on the workflow.

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

You can save input sets in a different repo from the pipeline. All you need to do is go to ```Account Settings --> Account Resources --> Default Settings```
Go under Git Experience and checkmark Allow different repo for Pipeline and InputSets. Now while trying to save the input you can save it in a different repo. 

#### Mark step as Failed in a running pipeline(User marked Failure) 

You can now mark Step in a pipeline as Failed. To enable the option, go to ```Account Settings --> Account Resources --> Default Settings```
Go under Pipelines and checkmark Allow users to mark a running Step as failure. 

#### How to view Deployment history (Artifact SHA) for a single service on an environment

You can go to Service under the project --> Summary will show you the details with what artifact version and environment. 

#### Harness enabling auto-deployment

To have automatic deployment in Harness, you can make use of triggers. On new artifact. 
Refer this [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/triggers/trigger-a-deployment-on-a-time-schedule/)
As soon as your build is complete and it publishes a new artifact you can setup a trigger on that and it will trigger a Harness Deployment. 

#### Question about deployToAll yaml field, The pipeline yaml for the environment contains deployToAll field. What does that field do?

The field is used when you use the deploy to multiple infrastructures option. 
This field is for deploy to all infra inside an environment. 
[Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/)
 
#### How to exit a workflow without marking it as failed

You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. 

#### 2 Deployments in pipeline, is it possible for me to rollback the stage 1 deployment if the stage 2 tests returned errors?

We do have a pipeline rollback feature that is behind a feature flag. This might work better as you would be able to have both stages separate, with different steps, as you did before, but a failure in the test job stage could roll back both stages.
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines)
  
Also, for the kubernetes job, if you use the Apply step instead of Rollout then the step will wait for the job to complete before proceeding, and you would not need the wait step.

#### Backup resource yaml files

- We do have git experience where you can save your yaml files for pipeline , inputset and templates to your git. 
[Documentation](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities)
 
- We don't save yaml's for service and other entities like we used to in First Generation: 
[Documentation 1](https://developer.harness.io/docs/faqs/git-exp-vs-config-as-code#does-the-configuration-as-code-support-matrix-include-entities-supported-by-git-experience) and [Documentation 2](https://developer.harness.io/docs/faqs/git-exp-vs-config-as-code#why-did-harness-reduce-the-number-of-supported-entities-backed-by-git).


#### Running into Harness Platform Rate limits?

Please note that harness does limit accessive API and execution limitations. Harness does reserve the right to change these limits. 
See site for more details [here](https://developer.harness.io/docs/platform/rate-limits/)

#### How are Harness secrets tied to connector, and what to watch for. 

Customers should be mindful of the fact that connectors are often tied to a secret (password or sshkey) that may expire. This is often a common cause of execution failures with connector errors. 

#### How to visualize and compare pipeline changes? 

Harness allows users to compare changes to a pipeline YAML. This is often useful tool to determine why a pipeline has changed behavior. 
See site for more details [here](https://developer.harness.io/docs/platform/pipelines/executions-and-logs/view-and-compare-pipeline-executions).

#### Harness rollback deployments. 

Harness Rollback deployments initiate a rollback of the most recent successful deployment. Note that this feature is behind a feature flag '''POST_PROD_ROLLBACK'''. Rollback deployments are currently supported by the following deployment types only (Kubernetes, Tanzu Application Services, Amazon ECS)

#### Do we allow one-time scheduling of pipeline execution ?

Yes, one can set a cron rule that just happens once, it has repeat reschedule icon in UI. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#run-once).

#### Do we expect the 2-way git sync functionality to be added to NextGen?

No, we are not bringing the 2 way git sync back in its first Gen form. Instead, we provide git experience support for pipelines, templates today.
On our roadmap, we will provide git experience for service, environments and overrides.Please refer more on this in the following [Documentation](https://developer.harness.io/docs/faqs/git-exp-vs-config-as-code/).

#### Do we support propogation of multiple service stage ?

No, this feature is yet to be added, we will update about this very soon.

#### Is the expression \<+configFile.getAsBase64("myFile")> only supported when using service config file and not a config file in File Store? 

Yes, It works for config files added to the service and not any config file from the file store. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store/#reference-files-in-the-file-store-using-an-expression).

#### Can we increase the Workflow Queue limit ?

No, for the Harness based locking on infrastructure, currently the max is 20 and its not configurable, since we allow only 1 concurrent execution per infra. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/workflows/workflow-queuing/#limitations).

#### Does the container step in CD override the entry point when using the command input?

The entry point in the base image will be overwritten as we have to run the commands specified in the run step.

#### How does Harness Terraform Work and Rollback Work?
Harness integrates with Terraform to create tasks that define infrastructure changes, execute Terraform plans, and apply changes to your infrastructure. In case of issues or failures, it provides the capability to roll back to a previously known good state using Terraform state management.

#### What are Service Variables in the context of Harness?
Service Variables in Harness are dynamic parameters or values that can be used within your deployment workflows to customize and control the behaviour of your services and pipelines.

#### What is the purpose of overriding Service Variables in the Environment configured in the Stage Harness?
Overriding Service Variables allows you to modify or specify specific values for your services in a particular environment or stage, ensuring that each deployment uses the appropriate configurations.

#### How do I override Service Variables in a Harness Environment within a Stage?
You can override Service Variables in Harness by navigating to the specific Environment within a Stage configuration and then editing the Environment's settings. You can specify new values for the Service Variables in the Environment settings.

#### Can I override Service Variables for only certain services within an Environment
You can selectively override Service Variables for specific services within an Environment.

#### What happens if I don't override Service Variables for a specific Environment in a Stage?
If you don't override Service Variables for a particular Environment in a Stage, the values defined at the Service level will be used as the default configuration. This can be useful for consistent settings across multiple Environments.

#### Can I use expressions or reference other variables when overriding Service Variables?
You can use expressions and reference other variables when overriding Service Variables in Harness. This allows you to create dynamic configurations based on the values of other variables or calculations.

#### Are there any safety measures to prevent unintended changes when overriding Service Variables?
Harness typically provides auditing features to track changes made to Service Variables, helping prevent unintended changes and ensuring accountability.

#### Can I revert or undo the overrides for Service Variables in an Environment?
You can revert or undo the overrides for Service Variables in an Environment anytime you can revert variables to their default values.

#### What are some common use cases for overriding Service Variables in an Environment?

   - **Environment-specific configurations:** Tailoring database connection strings, API endpoints, or resource sizes for different environments (e.g., dev, staging, production).
   - **Scaling:** Adjusting resource allocation and load balancer settings for different deployment environments.

#### Where can I find more information and documentation on overriding Service Variables in Harness?

You can find detailed documentation and resources on how to override Service Variables in Harness here: [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides/)

#### What can be templated using Harness Templates in Next Gen?
You can create templates for various components like steps, stages, and pipelines.

#### Can I version control Harness Templates?
Yes, Harness typically provides version control for templates, allowing you to track changes and roll back to previous versions if needed.

#### Can I share templates across different projects or teams?
Yes, you can share templates across projects and teams in Harness If the template is created at the organisation and account level scope, making it easy to maintain consistency and best practices.

#### Can I customize or modify templates for specific use cases?
Yes, you can customize templates for specific use cases by creating versions of templates and making adjustments as needed. Templates provide a starting point that can be used for specific requirements.

#### Is it possible to deploy Cloud Functions across multiple GCP regions with Harness?
Yes, you can configure deployment pipelines in Harness to deploy your Google Cloud Functions across multiple regions for redundancy and improved performance.

#### What deployment strategies can I use with Google Cloud Functions in Harness?
The harness supports various deployment strategies, including Blue/Green, Canary, and Rolling deployments. You can choose the strategy that best fits your use case and define deployment criteria and rollback conditions accordingly.

#### Can I use Harness to manage environment-specific configurations for my Cloud Functions?
Yes, Harness supports environment-specific configurations for your functions. You can use Harness secrets management to store sensitive information, such as API keys or database credentials, and inject them into your Cloud Functions during deployment.

#### What types of events can trigger notifications in Harness pipelines?
Notifications can be triggered for various events, such as pipeline starts, pipeline successes, pipeline failures, specific workflow steps, and manual approvals. You can customize the triggers based on your requirements.

#### What is Kustomize, and how does it relate to Harness Next-Gen?
Kustomize is a Kubernetes-native configuration management tool that simplifies the customization of Kubernetes manifests. In Harness Next-Gen, Kustomize is used to manage and customize Kubernetes manifests for deployments.

#### What are Kustomize overlays, and why are they useful?
Kustomize overlays are a way to customize and extend Kubernetes manifests without modifying the original base manifests. Overlays allow you to apply environment-specific configurations, such as namespace, labels, and resource limits, to the base manifests, making it easier to manage different environments (e.g., dev, test, prod) within a single repository.

#### Can I use variables and secrets with Kustomize overlays in Harness?
Yes, you can use Harness variables and secrets in your Kustomize overlays to parameterize configurations and securely manage sensitive data.

#### What is the deployment process for Kustomize-based applications in Harness Next-Gen?
When you deploy a Kustomize-based application in Harness, Harness will automatically apply the specified overlay based on the target environment, ensuring that the Kustomized Kubernetes manifests are deployed correctly.

#### Can I preview and validate Kustomize manifests in Harness before deployment?**
Yes, Harness provides a preview and validation feature for Kustomize manifests, allowing you to review and validate the customised manifests for correctness before initiating a deployment.

#### What are the benefits of using Kustomize manifest with Harness Next-Gen for Kubernetes deployments?
Using Kustomize with Harness simplifies the management of Kubernetes manifests by providing a declarative and version-controlled approach to customizations. It ensures consistency across environments and simplifies the deployment process.

#### Does Harness Next-Gen support GitOps workflows with Helm Charts?
Yes, you can integrate Harness Next-Gen with Git repositories that use Helm Charts for GitOps workflows. Harness can synchronize with your Git repository, pull Helm Charts, and deploy them as needed.

#### Can I use Helm Charts from public repositories like Helm Hub with Harness Next-Gen?
You can use Helm Charts from public Helm repositories like Helm Hub. Harness Next-Gen allows you to specify the Helm repository URL and Chart version when configuring your deployment.

#### Can I use SSH keys for authentication in Harness Next-Gen SSH deployments?
Yes, Harness Next-Gen supports SSH key-based authentication. When deploying to remote servers, you can configure Harness to use SSH keys for secure authentication.

#### Can I use SSH deployments in combination with other deployment strategies in Harness Next-Gen?
Yes, you can incorporate SSH deployments into your deployment pipelines along with other strategies, such as container deployments or Helm Chart deployments, to support complex multi-tiered applications.

#### Which versions of ArgoCd that the latest version of the GitOps agent support? 
We currently support v2.8.2
 
#### The GitOps agent updater, can you advise that this will update the agent, argocd and redis? Is this also true if use the option to bring our own ArgoCd?
 
It is used to update agents only whenever a new version is available. The Argo CD components upgrade must be done manually

 
#### Also, is it possible to automate the provisioning of the GitOps agent using a helm chart without having to register/create the agent in the UI first? At the moment it looks like you need to create the agent in the UI which then generates the yaml or helm chart for you.
Yes, using Terraform, it is possible to automate the provisioning of the GitOps agent without having to register/create an agent in the UI.

#### Is there a way in the harness where we can use bash shell over WinRM connection?
Yes, you can use Bash shell over WinRM connection in Harness. In the Shell Script step, you can select Bash as the Script Type and specify the WinRM target host to execute the script on.

#### Is it possible to use Helm hooks in Harness Helm deployments?
Yes, you can use Helm hooks in Harness Helm deployments. Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process.

#### When I started setting up the pipelines in Harness, I used my Github PAT. But I couldn't find where I set it and was wondering if it's allowed to be updated by the PAT owner or from your side.
Usually Git PAT is stored in secret manager and you reference that secret inside connector, so need to update the PAT in secret manager where it's stored.

#### We have templated workflow variables and wish these can be passed from git based Triggers. The values for these variables will be metadata of a pull request
You can create workflow variable and set the value to corresponding metadata field available as per type of trigger pullrequest variable

#### How to clone files from git repository within a Shell script step?
We do not natively support leveraging GitHub Connectors within a shell script. However, you can configure an SSH Key or HTTP Authentication by referring to the same secret as your connector does in your shell script. This way, you only need to define and rotate your credentials in one place.

#### Can I send content of a pipeline as attachment in email within harness ?

No, email step in pipelines do not support attachments.

#### Can I control sequence of serial and parellel in  Multi Services/Environments ?

No, we cannot control the sequence for Multi Services/Environment deployments. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/#deploying-in-parallel-or-serial)

#### Do we have an example for ternary operators ?

Yes, pleare refer to the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/ternary-operator/)

#### Does Harness Support Google cloud functions 1st Gen and 2nd Gen?
Yes, Harness supports both 1st gen and 2nd gen. 

See more on this here : [Documentation](https://developer.harness.io/docs/faqs/continuous-delivery-faqs/#google-cloud-functions)


#### How can I use Harness CD with Google Cloud Functions?

Harness CD pipelines help you to orchestrate and automate your [Google Cloud Function deployments](https://developer.harness.io/docs/continuous-delivery/get-started/cd-tutorials/gcp-cloud-func) and push updated functions to Google Cloud.

#### Is it possible to add variables at the Infrastructure Definition level?
As of now, Harness does not provide direct support for variables within infrastructure definitions. However, you can achieve a similar outcome by using tags in the form of `key:value`. For example, you can define a tag like `region:us-east` and reference it using the following expression: `<+infra.tags.region>`.

#### What does the "Freeze Window" feature in a CD pipeline do and what does it block?
The "Freeze Window" feature in a CD (Continuous Delivery) pipeline allows for the creation of a period during which certain actions, specifically those related to CD stages, are restricted. However, account administrators can still execute CD pipelines during this freeze window by default. Users without the "Override" permission cannot execute pipelines containing CD stages during the freeze window. The freeze window primarily affects actions associated with CD stages in the pipeline. More details about its functionality can be found in this section: [Freeze Windows Only Apply to CD Stages](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#freeze-windows-only-apply-to-cd-stages).

#### How can I generate a report of all deployments made so far?
You can always create dashboards to help you gain insights into your data. However, please note that we have a default retention period for CDS of 6 months. If you need to extend this period, please reach out to Harness support.

#### Does a pipeline delegate selector override the service infrastructure?
It doesn't override the service infrastructure. Instead, it only changes which delegate will execute the necessary operations of your pipeline.

#### Can we trigger a pipeline with a git push on bitbucket?
Yes, you can trigger the pipeline with a git event through bitbucket. You can refer to our [doc](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/) and [video](https://www.youtube.com/watch?v=y8s351IJLXw&t=113s&ab_channel=harness) tutorial.

#### Why can't I refer to an output within a CD stage using a looping strategy anymore? 
If you're using an absolute expression (for example: `<+pipeline.stages.stage_identifier>`), it will break your pipeline because matrices create a new identifier per iteration (`stage_1`, `stage_2`). To avoid your pipeline breaking, you can shortcut your expression to the step name (for example: `<+steps.step_identifier>`), and then you don't need to specify the stage identifier.

#### When the Harness Approval times out, how do I mark the pipeline as a successful execution?
On the Harness Approval step or the custom one, go to the advanced tab and include a failure strategy; the perform action should be "Mark as Success."

####  How do I propagate an environment's namespace to another stage?
By using the following expression on the target stage, you will be able to propagate the namespace. Expression: `<+pipeline.stages.STAGE_IDENTIFIER.spec.infrastructure.output.namespace>`

#### How do I redeploy all services in a new cluster?
 Currently, this isn't possible. You need to redeploy all of your CD pipelines with a new infrastructure target.

#### What documents should I refer to when migrating from CG/FG to NG?

- [Migrator tool GitHub repository](https://github.com/harness/migrator)
- [Upgrade guide](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd)
- [Feature Parity Matrix](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/feature-parity-matrix)
- [CDNG Upgrade Faq](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/cdng-upgrade-faq/)
- [Recording for Project V/S Application](https://www.loom.com/share/62f698a3820e4542a471e4d40d41c686?sid=3dc6f3b9-9369-4133-9452-08795c597351)

#### Is there a way to enforce a specific duration on a canary deployment?

No. There is no particular way to enforce duration, Canary deployment lives until you delete it.

#### Is it necessary for the infrastructure definition in a First Gen workflow to be mandatory ENTITY type for it to work correctly with allowed values?

Yes, it is mandatory for the infrastructure definition in a First Gen workflow to be enitity type.

#### Can Harness able to monitor for when a particular image tag changes on DockerHub in order to initiate a hands-free build and push to our repo?

Yes, You can setup a trigger based on the image tag changes on DockerHub repo as suggested in this[ doc.](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/)

#### How do I dynamically load values.yaml per environment?
Many of Harness's fields allow you to switch from a static field to an expression field. In your Helm chart/kubernetes manifests declaration, you can switch the values field to an expression field and use an expression like `<+env.name>-values.yaml`. Then, in your repository, create a value per environment.

####  Why can I run the pipeline during a freeze window?
You're probably an administrator or you have the permission to [override freeze windows](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#access-control). Users with this role can still perform deployments.

#### What does the error 'org.eclipse.jgit.api.errors.TransportException: git-upload-pack not permitted on' mean?

This error typically indicates a permission issue related to the Git connector used in the pipeline. It often occurs when the credentials or tokens being used for Git access lack the necessary permissions to clone or access the specified repository. To resolve it, validate the authentication setup and ensure the provided credentials have the required permissions for the repository in question.

#### Harness Annotations and Their Usage

#### What annotations can be applied in Harness?

Harness provides several annotations that can be applied to Kubernetes resources. Here are the annotations and their purposes:

1. `harness.io/skip-versioning: "true"`:
   - Purpose: Use this annotation when versioning of a resource is not required. Harness stores this information in a ConfigMap in your Kubernetes cluster.
   - Reference: [Kubernetes Versioning and Annotations](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-annotations-and-labels/)

2. `harness.io/direct-apply: "true"|"false"`:
   - Purpose: Set this annotation to "true" to make a manifest an unmanaged workload. This is useful for scenarios like Canary and Blue-Green deployments where you want to deploy additional workloads as unmanaged.
   - Reference: [What can I deploy in Kubernetes?](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/)

3. `annotations: harness.io/primary-service: "true"` and `annotations: harness.io/stage-service: "true"`:
   - Purpose: Use these annotations when you have multiple services, and Harness needs to identify the primary service. These annotations are commonly used in Blue-Green Deployments.
   - Reference: [Create a Kubernetes Blue-Green deployment](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/)

4. `harness.io/skipPruning: "true"`:
   - Purpose: Apply this annotation to ensure that a resource is not pruned. This is typically used for resources deployed by Harness to prevent accidental removal.
   - Reference: [Prune Kubernetes resources](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/prune-kubernetes-resources/)

These annotations help customize and control how Harness manages and deploys resources in your Kubernetes environment.

#### How can Harness address resource management challenges in continuous delivery, particularly with Terraform pipelines?

Harness provides a solution through a feature called "queue steps." This feature allows you to control concurrent execution at the delegate level, effectively limiting the resources used by concurrent processes.

#### What are queue steps in Harness, and how do they work?

Queue steps in Harness enable you to define a specific number of steps that can be executed simultaneously within a pipeline. You can configure the queue step by setting the maximum number of steps allowed to run concurrently and specify a timeout value.

#### How can I use queue steps to control resource usage in my Harness pipelines?

To use queue steps in your Harness pipeline:

1. Open the desired pipeline in Harness.
2. Select the stage where you want to add the queue step.
3. Click the "Add Step" button and choose "Queue" from the available steps.
4. Configure the queue step by specifying the maximum number of concurrent steps and a timeout value.
5. Add the steps you want to run within the queue step. These steps will execute one at a time, respecting the maximum concurrent limit.
6. Save your changes and run the pipeline.

For detailed guidance on using queue steps to control resource usage in Harness pipelines, refer to the Harness documentation section titled [Control Resource Usage with Queue Steps](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/control-resource-usage-with-queue-steps/)

#### How to identify which stage executed again as part of re-run for failed pipeline
Navigate to the stage and you will able to see message “This stage has been re-executed.”

#### Logs timestamp and start/end time of pipeline is not matching.
This usually happens if any failed pipeline was re-run and some of stage were not ran and we do show logs for older execution
In retry we do copy the logs from previous execution for the stage which we are actually not running.
For example: original execution stage1 → stage2 → stage3->stage4.
If the original execution is failing at stage3 and we retry from stage3, the logs for stage1 and stage2 in latest execution will be copied from original execution along with the log timings.

#### Can we access Phase level exported context variable in Rollback step
No phase level exported variable will not be accessible in Rollback and need to export context variable on workflow level 

#### How can I schedule cron trigger "at 10:00 every 3 months **4th Monday** of every month UTC" ?
You can use  0 0 10 ? 1/3 2#4 *

#### Can we migrate a specific secret from on SM to another SM?

No, It is a feature yet to be added.

#### How long can a pipeline be left running ?

A pipeline can be left running for `35 days` on enterprise account and 4 hours for verified free customers.

#### Do we support the creation of PR  at the time of pipeline creation ?

No, we support creating remote entities. We have not onboarded API to create PR  and it is as per product decision.
We can look forward to add this in future. Please refer more on this in following [Documentation](https://apidocs.harness.io/tag/Pipelines/#operation/update-pipeline)

#### How can customer execute a `helm dependency update` command with Helm Command Flags ?

For this specific use case please refer to our documentation [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#use-case-add-private-repositories-as-a-helm-chart-dependency)

#### Is there a comprehensive spec for the Reconcile functionality in NG?

We have it added in our API docs which you can refer [here](https://apidocs.harness.io/tag/Pipeline-Refresh/#operation/validateTemplateInputs)

#### Does Harness have documentation for specific user roles?

You can follow the [CD new user onboarding guides](/docs/category/new-users), which include guides for developers, admins, pipeline designers, and platform engineers.

#### Is it anticipated that the harness pipeline will initiate the verification of 'access' permissions to an environment at the outset of an execution, as opposed to conducting such verification progressively as the pipeline advances?

Yes, You can deploy to selective stages.

#### Do we support OCI repository and automation for adding a new repository in our gitops approach?

Yes, Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/oci-support/helm-oci-repository-aws-ecr)

#### Is there a way to exclude something in a search criteria as a step from all applications in a list of pipelines?

Yes, the regex can be used in search bar for searching pipelines. For now, search bar only check for name, identifier, tag key, tag value and label.

#### Is there a way to get the list of pipelines which does not have smoke test integrated as a step from all applications?

No. For now, search bar only check for name, identifier, tag key, tag value and label.

#### How can I retrieve the header from the built-in HTTP step? 

Usually step input should be accessible. Headers are accessible as well if you know the key. Output variable can be defined as
```
key -> variable name to be exported
value -> <+execution.steps.Http_1.spec.headers.test>
```
Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step/)

#### What could be the reason for SSH timeout ?

If you are facing SSH timeout error please check for possible cause below :

- Check if you are able to SSH from delegate terminal to the host itself
- Check if the firewall rules are have delegate IPs whitelisted 
- Check if the host is reachable before or during first time setup
- Check if the Proxy/VPN used is having correct configurations 
- Check if there is a policy for rotating IP's, need to update the same in existing configuration
- Check the host URI if it has undergone any changes in credentials
- Check if correct delegate is picked during the execution , if not use delegate selector to pick the correct one .
- Check the timeout defined for the step is optimum to reach the host if not cross check and increase accordingly .
- Check  if any recent feature flags enabled causing this .


#### Can customer control `Skip Harness label selector` or they need to be simply added ? 

No, Harness will automatically change behavior.
The expected behavior is as follows: In the scenario where a canary deployment is initially performed and subsequently switched to a rolling deployment for the same service and manifest, users will no longer encounter the selector error.
Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments/)

#### Which specific failure type should be employed to verify "assertion errors" when utilizing the HTTP step with an assertion rule, ensuring a distinct failure behavior distinct from the options provided?

The failure type should be `Unknown`. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step/)

#### How can a customer do migrating of Service Override for Environments for large configurations?

* **Terraform or APIs Used for Initial Configuration:** If the customer initially created the Harness configuration using Terraform, they can easily change the organization identifier by modifying the configuration file. Likewise, if APIs were used for the initial configuration, the same approach applies to change the organization identifier.
* **Creation from UI:** If the customer originally created the configuration through the user interface (UI), a different process is required. In such cases, the customer can follow these steps:
   - Utilize GET APIs to retrieve the existing configuration.
   - Create a new configuration for the new organization using the create APIs.
   - This allows for the necessary overrides and adaptations as needed for the new organization's requirements.

Please refer more on this in the following documentation: [Get Service Overrides](https://apidocs.harness.io/tag/ServiceOverrides#operation/getServiceOverrides) and [Create Service Overrides](https://apidocs.harness.io/tag/ServiceOverrides#operation/createServiceOverride).

#### Is there an existing solution in place or under development to accommodate a use case where a customer intends to employ their existing JIRA instance for managing deployment processes and approvals?

In the context of Harness, there is no necessity to create a duplicate ticket for approval purposes. Instead, a streamlined approach involves utilizing the "Approval" and "Update" steps while omitting the "Create" step. Additionally, you can designate the JIRA issue key as a runtime input, allowing individuals to input the relevant issue key when initiating the process. This approach ensures efficiency and avoids the redundancy of ticket creation.

#### Is there a specific rationale behind the restriction on using expressions when defining the deployment group for multi-environment deployments ?

Yes, this is indeed a limitation at present. When we initially introduced this feature, it was designed with fixed and runtime input support. Additionally, it's worth noting that we do not currently support passing a list for the service or environment field via an expression.

#### Is the flag enabled for our entire account, or can it be configured for individual projects?

No, it can be only specific to entire account or multiple accounts that an organisation holds.

#### If we opt to disable the feature while it's still in beta, can Harness assist with that process?

Yes, we can assist with disabling the feature while it's still in beta.

####  Is there a way to get the service artifact source identifier with builtin variables?

Yes, one can try expression `<+artifacts.primary.identifier>`. Please refer more on this in the [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#expression-examples)

#### Is there a way to cache terraform plugins in delegates?

Yes, one can try to set this environment variable `TF_PLUGIN_CACHE_DIR` . Also refer the following [Documentation](https://developer.hashicorp.com/terraform/cli/config/config-file#provider-plugin-cache)

#### Depooy stage keeps asking for a Service. Can I setup a stage without a service?

Yes, you can use custom stage instead of deploy stage. 


#### How to do an initial setup of a CD pipeline stage?

The modeling of a Deploy stage includes

1. Create a pipeline.
2. Add a CD stage.
3. Define a service.
4. Target an environment and infrastructure.
5. Select execution steps.


#### How can I verify that my CD pipeline has resulted in a successful deployment? 

Harness Continuous Verification (CV) integrates with APM providers. By using machine learning Continuous Verification can be a powerful tool for verifying a CD deployment

#### How does Harness Service-based licensing work? 

Harness uses a Service-based license model to charge Harness customers using its Continuous Delivery module. 

The CD License calculation uses the Active Services count and the number of Service Instances each active Service deployment creates.

For more information, go to [Service-based licensing and usage for CD](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd).

#### Is there a way to tag the pipeline executions with specific values like release name in NG?

Yes. Go to `Services > Summary > ENV GROUP > Instances` and see the release name. But, we tag entities not executions. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/references/tags-reference/)

#### Is there a way to get Canary Deployments to deploy resources that aren't Kubernetes Deployments?

No. The above feature on to manage cronjobs in next-gen is yet to come.

#### Is there anyway to get what is already deployed in an env by script, step, built-in variable?

There is no built-in variable or step that can directly provide information on what is already deployed in an environment.
Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables)

#### "Is there an equivalent option in NG for "Last Successfully Deployed" in triggers?"

Yes. One can use the expression `<+lastPublished.tag> expression`. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#artifact-polling)

#### Is there a way to interrogate artifact details in a shell script step for SSH use cases, enabling behavior modification in deployment, without transferring it to the end server first ?

One can use command step to copy the artifact to the delegate  to inspect. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step/)

#### How many concurrent executions can one account accomplish ?

We have a limit of 500 concurrent executions per account to avoid any issues.

#### What is the interval between artifact version collection for perpetual task?

It is `1 minute` for artifact collection and `2 minutes` for manifests in Next-gen.

#### Is there a way to see YAML view in Service Overrides when version is 2.0?

Please check if the Feature-Flag `CDS_SERVICE_OVERRIDES_2_0` is enabled for the account.

#### Can the interval for the artifact version collection PT on the delegate be adjustable?

No. Currently it is not configurable.
#### Is it possible to configure a Step Group to run on only a subset of the VMs in the infrastructure?

No, it is not possible to configure a Step Group to run on only a subset of the VMs in the infrastructure. The VMs are grouped at the Environment/Infrastructure level and cannot be further restricted at the Step Group level. 

You would need to apply the restriction at the Step level for each step that needs to run on a subset of the VMs.

#### Is it possible to create Stage Groups similar to Step Groups? If not how can I achieve a similar feature at the Stage Level?
Currently, it is not possible to use  Stage Groups similar to Step Groups. However you can make use of chained pipelines to achieve your use case. More information on chained pipelines here: https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/ 

#### How to pass the Environment and Infrastructure Definition as a string as a runtime parameter?
You can use the expression \<+trigger.webhook.payload.ref> to get the branch name from the GitHub webhook payload and pass it as the Environment value. In your pipeline, go to the stage where you want to set the Environment value, click on the Environment dropdown, select Runtime Input, and then enter a name for the input. In the Value field, enter the expression \<+trigger.webhook.payload.ref>. 
 
This will dynamically set the Environment value to the branch name from the GitHub webhook payload.

#### We're moving from Bitbucket to GitHub. Are there any steps we need to take to migrate our pipelines from Bitbucket to GitHub?
You can import a pipeline from your Bitbucket repo to Harness. To import a pipeline from Bitbucket to GitHub, you would need to create a new connector for GitHub and then import the pipeline from Bitbucket to harness once done use the move git option as shown below to move the imported pipeline to your GitHub. You can retire the old pipeline in Bitbucket after the migration.

#### When we specify a namespace, I notice that that namespace isn't being leveraged in the actual Apply step of the deployment.
The namespace specified in the infrastructure should be used during apply. Any namespace in the entities in the manifest would take precedence over that, however.
 
The manifest could also specify the namespace as a values.yaml reference. In an Apply step, you can override values.yaml and specify different namespaces for that particular Apply step.

#### Can you run a step or a stage when the pipeline is aborted?
No, when a pipeline is aborted, the pipeline execution stops and the pipeline enters an aborted state. The status of the pipeline will be Aborted. 
 
However, you can mark a specific stage as failed during pipeline execution by selecting the Mark Stage As Failed option. This lets you abort a step that is running and trigger a configured failure strategy after the step is aborted.

#### Is there any way to enforce the pipeline naming convention while creating or cloning the pipeline
Currently, there is no built-in way to enforce pipeline naming conventions while creating or cloning pipelines in Harness. However, you can create a OPA policy that can be applied using the On Save event for a pipeline to enforce the naming convention. 
 
The policy can check if the pipeline name matches the repo name and deny the pipeline creation if it doesn't match. More on OPA Policy here: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/

#### What are the differences between Native Helm Deployment in FirstGen and NextGen Harness?
here are a few key differences between Native Helm Deployment in FirstGen and NextGen Harness:

1. Versioning: Harness NextGen supports versioning of Helm deployments. This allows you to track changes to your deployments and roll back to previous versions if necessary. Harness FirstGen does not support versioning of Helm deployments.
2. Rollback: Harness NextGen supports rollbacks of Helm deployments. This allows you to roll back to a previous version of your deployment if something goes wrong. Harness FirstGen does not support rollbacks of Helm deployments.
3. Helm 3: Harness NextGen supports Helm 3. Harness FirstGen supports both Helm 2 and Helm 3.

#### Do I need to install Helm on the target cluster for Native Helm Deployment?
No, you do not need to install Helm on the target cluster for Native Helm Deployment. Harness will install Helm on the target cluster for you.

#### How to delete/remove version in template?
You can click on 3 dots(kebab menu) from the template library. Then click on the delete option then choose the version of the template you want to delete.

#### How to use the output from one stage in the looping strategy of another stage
You can achieve this by following the steps documented here in this article: https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables

#### What do the fetch files step do in rollout deployment?
The Fetch files task in the Rollout Deployment step leverages the GitHub connector configured in the service to fetch the manifests. Harness will also render and resolve any of the Harness variables defined in the values.yaml file of the service and add them to the manifest/Helm chart using Go/Helm templating. 

Harness fetches any secrets referenced in the values.yaml file and resolves them in the manifest. Harness masks secret output in its logs.

#### How to get ECR image and tag information in the stage?
You should be able to see the artifacts details in the service output of the execution, you can reference this value via expressions in the next stage.

#### How to pass values from CI of Pipeline A console logs to CD Pipeline of Pipeline B
The only way you can achieve this is to store this first pipeline output variable in file store or in git config then you can pull the same in your pipeline B. There is no built-in variable to achieve this use case in Harness.

#### What type of file types does Harness File Store support and what is the limit of the filesize?
Harness file storage supports various file types including tar, zip, txt, log, JSON, XML, and more. The file size limit for Harness file storage is 2GB per file.

#### How to store filesize like we have dump for around 3GB to 5GB in the Harness file store?
If your dump file is between 3GB to 5GB, you may need to split it into multiple files before uploading to Harness file storage.

#### How to upload the files to Harness file storage using API?
The Harness API supports uploading files to file storage. You can use the API endpoint /api/1.0/file-versions/upload to upload files to Harness file storage.

#### Is there a built-in Harness variable for the helm chart version in the pipeline?
Yes, you can use the expression \<+trigger.manifest.version> to have the new chart version that initiated the Trigger passed in as the version to deploy. This expression can reference the chart version in your pipeline stage steps.

For non-trigger-based execution, you can use the expression \<+manifests.MANIFEST_ID.helm.version> to reference the Helm chart version in your pipeline stage steps. The MANIFEST_ID is located in service.serviceDefinition.spec.manifests.manifest.identifier in the Harness service YAML. You can also use Harness variable expressions or runtime inputs to pass in the Helm chart version at execution.

#### Is there an option to copy services/environments/connectors from one project to another.

The easiest way for this would be to copy the yaml for the service/environment or connectors and create the service/env / connector in another project via yaml and paste and create it. But no direct way to copy it to another project. 

#### Multiple deployment stages in my pipeline not able to see the previous stages console log in the second execution

The execution not present when the pipeline is re-run is by design if the pipeline is re-run the older execution ID is purged along with the logs and only the current/latest logs are preserved.
The selective execution of the stages in the pipeline, where the user can run specific stages of the pipeline, Just enable this setting under - Advanced options of the pipeline.

#### Question about values yaml overrides, if we have multiple values yaml overrides for one service. Whats the order of applying then which one will be last? And is there a way to reorder them or I need to add them I right order from the beginning ?

The last upload values yaml will take priority for override. 
For example there are 3 over rides named a , b and c , values yaml will be applied in this order : 
 
`go template manifest.yaml -f a.yaml -f b.yaml -f c.yaml`
Unfortunately, there is no way to change/ arrange the order. You can remove and add them back as per above order.

#### Variable substitution problem when moving from First Gen to Next Gen

We might see errors around the variable substitution when moving them from First Gen to Next Gen, 
It could be due to how we define variables in Next Gen as compared to First Gen.

Harness expressions are identified using the \<+...> syntax. For example, \<+pipeline.name>.

#### How to setup allowedvalue for entity reference

Unfortunately, it won't work. These are supposed to be ENTITY types. This is by design. 
In the entity type, you can't specify the allowed values. It's only for the Text, Email & Number type. The infradefinition is dependent field on the environment. Hence it will populate once you select the environment. 

#### Save input sets on another git repository

We have this feature but it needs to be enabled from the Account level Settings. 
Go to Account Settings --> Account Resources --> Git Experience --> Allow different repo for Pipeline and InputSets, enable this and Now you can save the input set in different repo. 

[documentation](https://developer.harness.io/docs/platform/git-experience/git-settings/#enforce-git-experience)

#### Auto-Reject previous deployments paused in this step on approval

If you have multiple services using this same pipeline template, both within and outside the same project, If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step. 
As the template used here has been specified with different services at the runtime, so it will run independently. 

#### Sharing dashboard to a person who is not a Harness user

The sharing option for the harness dashboard requires picking a specific user group within the harness itself along with different levels of access. So they will only have access to the dashboard and not a user who is not part of any group in harness.

#### CDNG Notifications custom slack notifications

 It is possible to create a shell script that sends notifications through Slack, in this case, we can refer to this article:

 https://discuss.harness.io/t/custom-slack-notifications-using-shell-script/749

#### How to delete a template version without deleting the template

When you click on Delete Template option in the template , you will get all the version listed out and you will need to select the version to be deleted. 

#### Is there a way to get all the services list present in harness along with their id's and other meta data via gql

We have the API to get the services list based on ApplicationID. 
 
https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-services-api#fetch-the-list-of-services-for-a-given-application

```
{  
  services(  
    filters: [  
 { application: { operator: EQUALS, values: ["<applicationId>"] } }  
 ]  
    limit: 1000  
  ) {  
    pageInfo {  
      total  
    }  
    nodes {  
      id  
      name  
    }  
  }  
}
```
#### Creation of environment via API?

We do support API's for the nextgen : https://apidocs.harness.io/tag/Environments#operation/createEnvironmentV2

```
curl -i -X POST \
  'https://app.harness.io/ng/api/environmentsV2?accountIdentifier=string' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY_HERE' \
  -d '{
    "orgIdentifier": "string",
    "projectIdentifier": "string",
    "identifier": "string",
    "tags": {
      "property1": "string",
      "property2": "string"
    },
    "name": "string",
    "description": "string",
    "color": "string",
    "type": "PreProduction",
    "yaml": "string"
  }'
```
#### Question about new update to Services and Environments

The v2 experience has more robust service and environment entities. V2 has service variables, independent infrastructure definitions, environment groups, and file and variable overrides.

With v2, you'll notice a major reduction in the configuration included in pipelines. These changes are also reflected in the Harness APIs.

All new deployment types (ECS, Deployment Template, SSH, WinRM, etc.) are available in v2 only. New innovations such as Enterprise GitOps, multi-services and multi-environments, and environment groups, are in v2 only.

The new v2 experience has been designed to provided users and organizations with simpler configurations and an improved ability to scale.

#### Deleting a Monitored Service

You should see a Service Reliability module on your left panel. There you will see the monitored Services. You will need to delete the monitored service from here.

#### How to enable additional failure strategies

Once you click on Add under Failure strategies, you can select the timeout failure strategy by default It select All Errors and you can an action say Manual Intervention or another option.
[Documentataion](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)

#### Variables in NextGen from migration from First Gen to be used in Jira Approval step

Triggered by \<+deploymentTriggeredBy>
This isn't a variable in Next Gen rather you should use : \<+pipeline.triggeredBy.name>
 
Branch: \<+trigger.sourceBranch>
PR Number: \<+trigger.prNumber>
PR Title: \<+trigger.prTitle>
These will not directly work in the Jira Approval step as it doesn't have any reference to the trigger and I am validating this internally on how can we print this information. 
 
You can certainly use variables like  \<+pipeline.stages.stagename.name> stagename is the name of your stage say for Deploy and that will resolve correctly to the values.
 
 Artifact: \<+artifact.displayName>
 Artifact Description \<+artifact.description>
 Artifact Build Number: \<+artifact.buildNo>
 
These aren't the correct variables in NG.  [Here are the correct variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#artifact)

#### We have a pipeline that is configured to deploy a selected service based on input. There currently isn't a way to filter the list of Deployment executions by the selected service.

If you want to specifically check the executions for a specific service. 
You can do so by going to Service and then click on the service you want to see the executions for.
Even under deployment, you can open the filter option and only enter service name and it will list all executions for the service.

#### Can we deploy lambda function without update-function-code policy
Harness needs this permission to modify code in lambda function and in rollback also this is needed.
Although, you can deploy a new function without this permission but can't update an existing function.

#### We already have running workload deployed using rolling deployment in harness. But when we tried to change the deployment to canary, we face with following error.
Apply manifest failed with error: The Deployment "sample-app" is invalid: spec.selector: Invalid value: v1.LabelSelector\{MatchLabels\:map[string]string\{"app":"sample-app", "harness.io/track":"stable", "release":"sample-app"}, MatchExpressions:[]v1.LabelSelectorRequirement(nil)}: field is immutable

Make sure the instance/deployment which was deployed as rolling is not present at the time when you are trying the canary in the cluster(You can manually delete the deployment) and then try again as looks like instance is running and we can not add extra label which gets added as part of canary.
Or you can change the namespace so that new instance will be deployed to new namespace.

#### Download artifact for winrm is not working while Nexus if windows machine is behind proxy in CG
Nexus is supported for NG but not in CG, so you can use custom powershell script something like below:
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"

#### Kubernetes deployment is failing with error Invalid request: Failed to get namespace/ConfigMap/release-releaseid
Looks like while trying to fetch the release configmap the command is failing try running the command directly to see the behaviour on delegate host
kubectl get pods -n namespace
kubectl describe configmaps release-releaseid


#### I am using Git experience and have created a remote pipeline that is stored in Github. Is there a builtin variable to reference the branch name? 
No , there is no built in variable to refer for Git experience you need to use custom script to populate the variable

####  I am working on overrides creation using Terraform. As I see according to the latest update overrides were moved from the Environments tab to a separate tab. We have a use case where I must create all the 3 types provided under service-specific overrides. How to get YAML representation for all 3 types of override

You can get the the detail under Example Usage here https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service_overrides_v2

#### When do we mask a secret value in shell script?

To mask a secret's value in a script, then that secret should be at least once used or refrenced in the script (referencing the secret as echo \<+secrets.getValue("pattoken")>)

#### Is delegate token masked in if used in shell script?

Delegate tokens are already present in the memory and we know those need to be sanitized, so they are masked by default.

#### We have triggers configured on branch push and pull request events in Harness from Github but we noticed on PR edits we get multiple executions triggered. Is there a way to have these events only trigger one build?

you can put conditions on the trigger which you do not want to initiate on particular events.
 
Doc reference [here](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/#set-trigger-conditions)

#### how to get full 40 character Git SHA into our pipeline.

you can use expression to Git Commit SHA: 
 
Manual builds: \<+codebase.commitSha>
Webhook triggers: \<+codebase.commitSha> or \<+trigger.commitSha>

#### Is there a way to run a pipeline based two inputs set at the same time?

No, there is no way to run a pipeline simultaneously on two different input sets.

#### How do we resolve error "Current execution is queued as another execution is running with the given resource key"

This error message indicates that there is already a running execution with the same resource key as the current execution that is queued. More on resource constraints can be referenced [here](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-resource-constraints/#resource-constraints-summary)

#### Is there a quick way of exporting all services we have deployed in the last 3 months? Into like a spreadsheet?

You can create a dashboard for the services deployed which can then be exported as PDF/Spreadsheet.

#### Is it possible to use eddsa keys with harness Git?

Yes we support ed25519 key, Command we used to generate key :

```
ssh-keygen -t ed25519 -b 256 -f /Users/test/Documents/temp/edd -m pem
```

#### How can we import list of all services

You can create a dashboard for the services deployed which can then be exported as PDF/Spreadsheet.

#### For SAM deployments what version of image supports IRSA option.

The image harnessdev/sam-deploy:1.82.0-1.0.0 supports IRSA and assume role on delegate.

#### Does a shared path in a SAM Build Manifest show where the download happens?

No, shared paths does not dictate where the download happens. There could be multiple shared paths provided , but it does not mean our manifests would be downloaded in that shared path.

#### How are pipeline tags passed in filters using list pipeline API

piepline tags are passed as key-value pair : 

```
"pipelineTags": [
      {
        "key": "test",
        "value": null
      }
    ]
```

#### What are OAuth App access restrictions in a Git environment, and how do they affect my ability to push changes to a repository?

OAuth App access restrictions in a Git environment are security measures implemented by an organization to limit data access by third-party applications, even if the user has correct authorization credentials. These restrictions are typically applied to protect sensitive data and ensure secure collaboration. When these restrictions are in place, it may affect your ability to push changes to a repository. If you encounter an error message similar to "Although you appear to have the correct authorization credentials, the organization has enabled OAuth App access restrictions," it means that you are subject to these limitations.

#### How to pass JSON string as a command line argument in shell script

with the command the json string should be passed in sigle quotes for example:

python3 eample.py `<+trigger.payload>`

`<trigger.payload>` resolves to JSON.

#### Is there a way to execute python code directly in the Custom Shell script step?

Our method of executing shell scripts follows a specific approach. Rather than utilizing the customary './file.sh' approach, which employs the shebang line and initiates with Python, we employ '/bin/bash ./file.sh'. This ensures that the script runs exclusively as a bash script.
 
Therefore to make it work put the Python command in a file and execute it. So, the idea is that the bash script will execute as a shell script hence it will not understand the Python command. If we put the Python commands in a script and then run it within shell script it will work.

#### How could we get the image with repo, but without a tag?

Deploying an image without a tag will fetch the image with tag "latest", to do so you can provide a default value for the image tag as "latest" whenever no tag is provided it will use a default value.

#### Can we echo the secret we store in Harness through an API

No, the secret are not supposed to be returned in plain text as it can be a security concern.

#### Why one cannot configure multiple manifests in non-helm environment ?

At present, we only support Helm K8s and Helm deployments ( not charts as they are treated as artifacts) with multiple manifest services because , allowing for all swimlanes can cause a mega service that can deploy multiple applications and can cause problem in management of the same.

#### Where can I find a sample pipeline for building and upgrading custom delegate images ?

Please refer to the sample repository here : [Github Repo](https://github.com/harness-community/custom-delegate)
It is recommended to have path for production use delegates over INIT_SCRIPT.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/)

#### What is one possible reason for implementing a delegate per namespace in a Kubernetes cluster, particularly when multiple teams are operating out of the same cluster and don't want to grant cluster-admin access to all teams?

One reason to have a delegate per namespace is when multiple teams work within the same Kubernetes cluster. It's not feasible to grant cluster-admin access to every team, so instead, they can use Kubernetes connectors on a per-namespace basis.

An alternative approach is to use read-only delegates with service account tokens and the cluster master URL. However, if long-lived tokens are undesirable, teams can opt for a delegate per namespace in their respective projects, with Kubernetes connectors that choose the right delegate selector.

#### Is there a way to prevent the "Get Started" prompt from popping up for newly transitioned teams coming over to NG?

No, for now it not an optionable event. We may include a feature flag on this in future.

#### Can we add a file with the same name in 2 different directories in the File Store ?

Yes, one can add a file with same name in 2 different directories having in account both files have unique ids.

#### What could be the possible issue for not able create a SNOW ticket from a template ?

One can check for below possibilities : 

-  Is the Harness app installed in the servicenow instance used by this connector.
Please refer here for [Reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages/#servicenow-user-roles)

- Is the permissions for the integrated user include `x_harne_harness_ap.integration_user_role`.
Please refer here for [Reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages/#:~:text=Make%20sure%20you%20have%20the%20following%20roles)

#### If `Do Not Delete Pipeline Execution Details` setting is not enabled, how long do we keep execution details before deleting them ?

We keep execution details for 6 months be default. If this setting is enabled, (Set to true)  we will not delete pipeline executions even after pipeline entity itself is deleted.

#### What is the Account setting for image pull policy for setupAddonContainer during initialize phase ?

We have Account settings named `Default Image Pull Policy For Add On Container` for image pull policy for setupAddonContainer during initialize phase.

####  How long does Harness keep the plan execution summary for ?

We keep the plan execution summary for 6 months.

#### Is it possible to run GitHub Action steps in a custom pipeline stage ?

No,  GitHub Action steps are not available in custom pipeline stages. They are limited to cloud build infrastructure.

#### Where can one find the define delegate selector in Shell Script steps ?

The delegate selector field is displayed conditionally based on the step type. If you're using a shell script step, the field is recently moved from the advanced tab to the optional config in the step parameters tab.

#### Do we have audit trials for changes in Dashboard ?

No, this feature is yet to come.

#### How can one dynamically build the name of a secret ?

Harness expressions are assessed and replaced within the script before script execution commences, allowing only the use of precomputed values and prohibiting the utilization of values calculated during script execution.
One can use an example like `<+secrets.getValue(<+....OutputVariables.AppCredentialsPath>)>`


#### What are the Helm version limitations on the Harness Platform?

Helm 3 is deprecated so there is limited support for Helm 2. Helm 3 is now the default for Harness Helm Chart Deployments.

#### What are some of the Manifest source locations that Harness can fetch the Helm Chart from?

* Github
* Gitlab
* Bitbucket
* Generic Git Provider
* Custom Remote Source Repository
* Google Cloud Storage
* Amazon S3 Storage
* Helm OCI Repository (ACR, ECR, GAR, Artifactory)
* Helm HTTP Server Repository (Nexus, Artifactory)
* Harness Local File Store

#### What are some of the Artifact Repository for Container images to deploy with Chart?

* DockerHub
* Amazon Elastic Container Registry
* Google Container Registry
* Azure Container Registry
* Custom Artifact Source
* Google Artifact Registry
* GitHub Package Registry
* Nexus 3
* Artifactory

#### Can user mix and match images from different container registries within a single deployment?

Yes, By configuring each service with the appropriate image repository and tag details, you can seamlessly deploy applications using images from different registries in the same deployment.

#### Limitations of Helm Chart dependencies on Git Source Repositories

Helm chart dependencies are not supported in Git source repositories. Helm chart dependencies are supported in Helm Chart Repositories.

#### Can I execute Builds in Harness CD?

Continuous Integration (CI) can be performed in Harness using the module. 
For more details, please see this link: [here](https://developer.harness.io/docs/continuous-integration/get-started/key-concepts/)

#### What is Harness GitOps?

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync the state with your live Kubernetes cluster.
For more details please see [here](https://developer.harness.io/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics/)

#### Does Harness Support Customized Deployment Types?

Yes, Harness supports Custom Deployments using Deployment Templates
For more details please see [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/)

#### How can I deploy infrastructure using a scripted method as part of my CD Stage?

One method is to use the Harness Terraform Provider. 
More information about this can be found at this link: [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)

#### What does a failure strategy consist of?

First: Error conditions that trigger the failure strategy.
Second: Actions to take when the specified error conditions occur.

#### What if I have a custom provisioning tool, how can Harness support this?

Harness has first-class support for Terraform, Terragrunt, AWS CloudFormation, Azure ARM, and Blueprint provisioners, but to support different provisioners, or your existing shell script implementations, Harness includes Shell Script provisioning.
More details here [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning)

#### Can I use AWS CDK provisioning?

Yes.

#### I am getting "Backend not initialised error" when running terragrunt plan with specific module?

When dealing with specific modules, we don't initiate terraform init directly; instead, we use the terragrunt terragrunt-info command. 
To initialize the backend properly, you need to run terraform init, and this initialization process is triggered automatically when you select the "All modules" option.

#### How do I update values for initialdelayseconds for helm delegates?
You can override Helm chart values by providing a custom values file or by specifying values directly on the command line when installing or upgrading a chart or passing the YAML in terraform script

#### Does terraform step keep the working directory persistence?
In the both plan and apply step we clean up the directories of Terraform.
 
#### How do I access files created during plan step of terraform for apply step?
Workspace gets cleaned after every run of Plan or Apply step.
version control can be used to store these files and later reference them.

#### I want to force all new pipelines created to be stored in git?
We provide the option to enforce a Git-centric experience for all pipelines and templates.
To guarantee that your resource configurations are exclusively stored in Git repositories, you can enforce this Git-centric experience within your Harness account. 
You can achieve this by enabling the "Enforce Git Experience for Pipelines and Templates" setting.

#### Getting error - "The incoming YAML exceeds the limit XXXXX code points", How do I resolve this?

The issue is due to a very large sized yaml. This is an issue with the snakeyaml lib
The YAML size needs to be reduced or use matrix/strategies to add multiple steps/stages instead of adding them one by one.

#### What is the primary difference between the new delegates and the legacy delegates?

We redesigned our delegates to enhance security and stability while introducing advanced features like High Availability and metrics scraping.
These improved delegates are referred to as "immutable delegates". 
While the fundamental task execution remains largely unchanged, the new delegates are designed to offer additional features and improvements. 

#### How can I distinguish between the legacy delegates and the new delegates?

Legacy delegates are identifiable by their image tag and versioning scheme, which is always "harness/delegate:latest." 
The new delegates have a different versioning scheme and are designed to offer enhanced functionality.

#### Does the new delegate not support authentication by passing accountSecret it requires using of delegate token?

These are actually the same thing, there was just a name change in new delegates. They can however fallback to ACCOUNT_SECRET if you don’t provide DELEGATE_TOKEN variable, but they can be the same value. 
Note, depending on how you provide the secret (i.e. if it’s through a secret resource or plain env variable) the actual secret value might need to be base64 encoded.

####  I do not see in the new delegate helm chart is the option to specify delegateProfile, is that still supported?

DelegateProfile is deprecated, you can leverage INIT_SCRIPT to run scripts at delegate startup. Adding few Links that can help you get going.
Helm chart: https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml#L87
INIT_SCRIPT documentation: https://developer.harness.io/docs/platform/delegates/install-delegates/overview/#use-init_script

#### How do I set Output Variable in Powershell?

To set the Output variable in powershell, Please use this format for setting up the env variable value in the script - `$env:outputvariablename=value`

#### How to fetch a PEM certificate from AWS Secrets Manager without losing its formatting?

In case of multi-line secrets please try and re-direct the output to a temp file and use that for base64.

#### How Do I preserve the formating of multiline secret in shell script?

Please the use below command-
```
echo ${secrets.getValue("key_file")} > /tmp/id_rsa_base64
cat /tmp/id_rsa_base64 | base64 -di

```

#### Is there a way persist terraform steps working directory?
This is by design we always clean the working directory on each terraform step and working directory cannot be persisted

#### How do I preserve quotes in Output Variable?

To preserve the quotes please encapsulate the array by single quotes('')

#### How do I list Github Tags for custom artifact when the curl returns a json array without any root element?

We cannot provide an array directly to the custom artifact. It needs a root element to parse the json response.

#### Is there any way to increase task count of ECS service without ECS service deployment?

Currently, the task count of ECS cannot be changed without doing any deployment in Harness but changes can be made to ECS deployment directly on AWS.

#### If we manually increase the task count in AWS directly? Or decrease as well, would it impact subsequent pipeline deployment?

It shouldn't impact except the fact that if the subsequent deployment has a different task count, it would override the existing one

#### How can I check the status of connectors?

You can check the status of connectors at the Account, ORG, and Project levels.

#### Is there a centralized dashboard to monitor all connectors?

Currently, we do not have a centralized dashboard to monitor all connectors.

#### How often are connector statuses updated?

Connector statuses are updated frequently. When a connector's status fails, the result is cached, and the next update occurs when the connector is referred to in a pipeline run.

#### Are there any metrics available to monitor connector status?

Currently, there are no metrics exposed for monitoring connector status. However, there is an API available to monitor the status of individual connectors.

#### Can I monitor the activity of connectors through logging?

We do not have logging to check connector activity directly. To monitor logs for specific events, you can select one delegate for a connector with issues, and logs can be parsed for that delegate to check for connector activity.

#### How to use the Stage Variable inside the Shell Script?

A variable expression can be used to access stage variables in pipelines.
Just hover over your variable name, and you will see an option to copy the variable expression path, You can reference this path in shell script.

#### How do I pass --target-path to deploy the code into the different path in Azure Web App deployment?

Unfortunately, we currently don't have any parameters to pass the target path.

#### How do I set secrets starting with numbers in NG?

Naming conventions in NG are consistently applied to all entity types. According to our existing convention, we do not permit identifiers to start with numbers.

#### How do I change the service artifact source based on environment?

You can use variable expressions in artifact source templates to allow team members to select the repository, path, and tags to use when they run pipelines using artifact source templates. To override service variables at the environment level, you can create environment-level variables and override them for different environments.

#### How do I save the dry-run step rendered manifest?

You can view the dry-run manifest as an output variable of the step

#### Differentiate between inline and remote pipelines in OPA policy?

In the remote pipeline when passed against the OPA engine, the following info is passed -
 
```
"pipeline": {
    "gitConfig": {
      "branch": "master",
      "filePath": ".harness/test_GITX_OAUTH.yaml",
      "repoName": "harness-pipeline"
    },
    "identifier": "test_GITX_OAUTH",
```

Remote pipelines have git-config info in YAML but for the inline pipeline, we don't pass anything. It directly starts with the identifier -

``` 
"pipeline": {
    "identifier": "test",
    "name": "test1234",
 ```
 
A policy can be created to check of above info.

#### Why do I see delay in OPA evaluation for remote pipelines?

In the case of remote pipelines, where customers can make updates to files in Git, we provide validations asynchronously when a user attempts to access the file. If a customer opens the pipeline through the user interface, they will encounter an option labeled "validations." In the event of a failure in the OPA policy, we will be able to inform the user that a modification was made in Git that is not in compliance. This is done to give the user insight into the situation, although we won't be able to prevent users from still making updates to YAML files in Git

#### Does triggers abort the already running previous pipeline executions?
We have autoAbortPreviousExecutions setting in trigger, which when set as true will automatically aborts any previously running executions of the pipeline.

#### Can a single custom plugin be created that could be used in steps for both the CI and CD modules?

Yes, it is possible to create a single custom plugin that can be used in both the CI and CD modules. The documentation for creating custom plugins is similar for both modules, and the same plugin can be used in both. The only difference is in how the plugin is used in the pipeline. In the CI module, the plugin is used in a [Plugin step](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins), while in the CD module, it is used in a [Containerized step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step). As long as the plugin is designed to work in both types of steps, it can be used in both modules.

#### The current documentation advises us to use the drone plugin model. How similar will this be with the move to gitness?

Gitness is using Drone plugins so no rework would be necessary.
The only changes with Gitness is you need to provide an additional mapping file that defines inputs and maps those inputs into the plugin container.
 
#### Why is the plan sent to the secret manager?

The plan is sent to the secret manager as part of the design. This is a deliberate approach to how secrets are managed within the system.

#### Is there an option to decrypt the plan at a different point in the process?

Yes, there is an option to decrypt the plan, but it can be done at either the Harness platform end or the delegate end.

#### Are there limitations to decrypting the plan at the Harness platform end?

Yes, there is a limitation to consider. Decryption at the Harness platform end is only compatible with the Harness secret manager. Other secret management solutions may not support this option.

#### Is there any way by which we can not provide project name in the webhook curl and it works by unique identifier?

Since the triggers are linked to pipelines, org ID and project ID is required parameter for it.

#### How can I use canary with native helm deployment strategy?

You can only perform a rolling deployment strategy for Native Helm(no canary or blue-green).

#### I am using AWS ASG template and would like to fetch "New ASG Name" while deployment/workflow/pipeline executes. Is it available in context? If yes then how can I get new asg name? 

We support both old and new ASG names via variable, which should help you with this use case to run custom scripting if required on old ASG.
 
Both new and old ASG: $\{ami.newAsgName}, $\{ami.oldAsgName} documented here:
https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/variables/built-in-variables-list#aws-amiasg-1

#### Which has higher priority, Namespace set in manifest or Namespace provided in infra definition in Harness?

The namespace mentioned in the YAML file will have higher priority than the one mentioned in the infra definition.

#### We have setup deploy pipeline which is connected to ECR artifact, in which we can select an image from ecr and it's tag when run the pipeline. How can we use image and tag information in the stage

You should be able to see the artifacts details in service output of the execution, you can reference this value via expressions in the next stage.

#### How can I call another pipeline without any request body from a API?

Please use this this API - https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetYaml
YAML body is not required for it.

#### Is it possible to safely and reliably use Terraform in Harness without specifying a backend config?

For production purposes we highly recommend using your custom backend config, for testing purposes, you can use it without a backend (the state is stored at the harness side) which cannot be accessed.

#### Is the state file fully and uniquely identified by the combination of "provisioner ID" and "workspace name"?

Yes, State files are uniquely identifiable using "provisionerID" and "Workspace Name" that is why the provisioner ID should always be unique.

####  Is there a reliable way to use Terraform in Harness without state conflicts?

The Provisioner Identifier is a Project-wide setting. You can reference it across Pipelines in the same Project.
For this reason, it's important that all your Project members know the Provisioner Identifiers. This will prevent one member building a Pipeline from accidentally impacting the provisioning of another member's Pipeline

#### Is the location of the state file independent of what delegate the pipeline runs on?

Yes, the State file is present at Harness SaaS not on delegates.

#### Is "Scope to Specific Services" for Infra definitions going to available for NG as well ?

Yes, Scope to Specific Services for Infra definitions will be onboarded soon for Next-Gen as well.
For how to use Scope to Specific Services in First-Gen, please follow this [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/environments/infrastructure-definitions/)

#### How can one validate an issue while saving a pipeline ?

For validating an issue first one should know how we save a pipeline : 

- When user click on pipeline save, we try to validate the yaml using schema
- If pipeline contains templates, we try to fetch templates and nested templates too so that we can see any issues
- We create filters and other validations based on different types of stages
- We do policy evaluations
- Finally, inline vs remote where we have remote dependency.
- Essentially, the pipeline size, the nested structure & location can vary the response times.
If one feels like an issue for latency in API response receiving please consider above steps and take actions accordingly.

#### How can one use HELM expressions ?

Please follow the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#helm-chart-expressions)

#### How can one use `AWS CDK Infra Provisioning Support` on Harness ?

Harness lets users run AWS CDK Workloads via the Container Based Steps.
Please follow more on this [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/aws-cdk/)

#### Does Microsoft Teams support full Gitops ?

No, Microsoft Teams does not support Gitops.

#### Should the Fetch Instances step return only one instance for executing a trigger to an external orchestrator, such as Ansible or Puppet ?

Fetch instance should return the instance on which the artifact will be deployed.

#### Does Harness continually/occasionally re-Fetch Instances for Deployment Templates to keep the service instance count accurate, even if a K8s Deployment scales up outside of a deploy pipeline ?

For a deployment that may scale up or down after the initial deployment, the Fetch instance script should be designed to consistently return the current state of the system, and this script is executed periodically as part of a Perpetual task to ensure accuracy.

#### Do we currently support IP whitelisting for requests made against the Harness API ?

Yes, to configure this, please proceed to the UI where you will find an option with two checkboxes: one for API and the other for UI. You can define the CIDRs in the respective fields and apply the settings accordingly. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/security/add-manage-ip-allowlist/)

#### Where can one find all `Active CD Feature Flags` for Harness ?

Please find all the `Active CD Feature Flags` in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations#active-cd-feature-flags/)

#### Is it possible to hide an executed script from being displayed in the console/execution logs ?

No, this functionality enhancement is yet to come.

#### Is it possible to set a pipeline variable as an array of strings ?

One can set a comma separated strings and split them wherever one wants to use as array.
Possible example expression can be : `<+pipeline.variables.targetIds.split(",")>`

#### Is there a way to determine whether the pipeline method was stored remotely or inline?

This information is available through our OPA policies. To illustrate, you can create a policy to validate the pipeline YAML/JSON when running the pipeline. Here's an example policy:

```
package pipeline

# Generate an error if the pipeline is inline
deny[msg] {
    input.pipeline.gitConfig # Check if gitConfig exists

    # Display a user-friendly error message
    msg := sprintf("Pipeline is inline")
}
```

#### How to parse multiple yaml manifests in policy steps?

At present, OPA evaluations are performed using JSON inputs for evaluation purposes. The system automatically converts YAML data into JSON and then forwards it to the OPA service for evaluation. While this process works seamlessly for single YAML files, for multiple YAML files it won't work since we don't support it currently.

#### How to allow remote pipelines to run only with origin from a main branch?

You can achieve this using our OPA policies, here is an example:

```
package pipeline

# Generate an error if the pipeline is running on a branch other than 'main'
deny[msg] {
    input.pipeline.gitConfig.branch != "main" # Check if the branch is 'main'

    # Display a user-friendly error message
    msg := sprintf("Running the pipeline on a branch other than 'main' is not allowed. The selected branch was: '%s'", input.pipeline.gitConfig.branch)
}
```

#### How to solve the following error? Invalid request: Profile definition must end with ']

Harness Delegates do not control AWS profiles, this is likely configured manually through the delegate by the user and should be reviewed by the author.

#### Why am I receiving the message 'Current execution is queued as another execution is running with given resource key' in the step resource constraint?

Harness automatically includes Resource Constraints in each stage to prevent simultaneous resource requests. This message indicates that the current execution is queued because another execution with the same resource key is already in progress. To allow multiple pipelines to deploy to the same infrastructure concurrently, you can enable the 'Allow simultaneous deployments on the same infrastructure' option in the Stage's Infrastructure settings.

#### What is the process for marking a currently running Continuous Verification step as successful?

To mark a running Continuous Verification step as successful, you can use Manual Intervention as a failure strategy. If the step exceeds the defined timeout for example, the manual intervention is triggered, and you can subsequently mark it as successful.

#### How can I output values within double quotes while preserving them?

To keep the quotes intact, you can encapsulate the array with single quotes ('').

#### How to reference a connector in shell script or Powershell script?

Currently, you can't leverage a connector within a script step. However, you can manually integrate to an API referring to the same credentials as the connector.

#### How to Override an Image Connector for a Containerized Step Group?

In the step group configuration, navigate to the optional configuration and edit the "Override Image Connector" field.

#### How to get pipeline execution output through the API?

Using the following API Method [getExecutionDetailV2](https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getExecutionDetailV2) along with the flag `renderFullBottomGraph` equals to `true`, will return the complete response.

#### How to deploy a manifest without a service linked to the stage?

You can deploy manifests by writing a script within a custom stage. However, it's recommended to use CD stages for deploying manifests.

#### How to use Harness Secrets in GitOps?

We do not have this feature available currently.

#### Is it possible to use Harness for managing cluster updates like ingress and IAM roles in EKS, without the Infrastructure Definition targeting a specific namespace, and ensuring that my YAML files are applied as expected?

The namespace in the YAML file will have higher priority than the one in the infra definition.

#### Can I use a single tar file containing Terraform code, uploaded to an S3 bucket, as the source for Terraform Plan and Apply steps in Harness?

Currently, we do not expect a zip file in the S3 bucket, but rather a folder structure with corresponding Terraform configuration files.

#### Can I execute a step when a pipeline is aborted?

No, when a pipeline is aborted, the pipeline execution stops and the pipeline enters an aborted state. The status of the pipeline will be Aborted. Harness will not clean up the resources that are created during pipeline execution.
However, you can mark a specific stage as failed during pipeline execution by selecting the Mark Stage As Failed option. This lets you abort a step that is running and trigger a configured failure strategy after the step is aborted.
You can then configure a failure strategy to perform a custom action, such as resetting the status.

#### While creating a Lambda function, is it possible to retrieve artifacts from GitHub?

We do not have a built-in GitHub source for Lambda function artifacts. The supported sources for artifacts, as you mentioned, are S3, ECR, Jenkins, Nexus, and Artifactory. Additionally, we offer support for custom artifacts, but please note that it may require a significant amount of customization.

#### How can I send the pipeline's logs to Loki?

To accomplish this, you can download the logs using our API method "download-logs-via-api" and then send them to Loki. We do not have built-in functionality for this.

#### How to deploy Azure SpringApps JAR via Harness CD?

You can take advantage of our ssh deployment and include a step to download the JAR.

#### Can Terraform be used in Harness without specifying a backend configuration while ensuring safety and reliability?

For production deployments, it is strongly advised to set up a proper backend configuration. However, for testing and experimentation, it is possible to run Terraform in Harness without a backend configuration. In this scenario, the state is stored on the Harness side and is not directly accessible.

#### For Terraform States, is the state file fully and uniquely identified by the combination of "provisioner ID" and "workspace name"?

Yes, you can also use other combinations if required.

#### How can I use Terraform in Harness without encountering state conflicts?

The Provisioner Identifier is a Project-wide setting, and you can reference it across Pipelines in the same Project. It's important that all Project members are aware of the Provisioner Identifiers to prevent one member, who is building a Pipeline, from accidentally impacting the provisioning of another member's Pipeline.

#### Is the location of the Terraform State independent of the delegate?

Yes, when using a secret manager to store the state file, its location depends on where it's stored in the manager and is not tied to the delegate.

#### How can I trigger a pipeline after another pipeline has succeeded?

You can trigger deployments and builds by using our custom triggers. Additionally, we offer the pipeline chain functionality, which enables you to execute pipelines through a parent pipeline.

#### Is it possible to store HTTP step's output as a secret?

The masking is not supported with an HTTP step in this way however you may be able to use a shell script step and list the output variable as a secret in the output of that step which will have it be treated as a secret it any subsequent steps.

#### Is it possible to access the JSON/YAML input passed to the policy engine in the pipeline?

Unfortunately, you cannot refer to this JSON within the pipeline. However, you can access all evaluated policies, along with their input, through the UI.

#### Is there a method for enforcing pipeline naming conventions during pipeline creation or cloning?

At present, there is no built-in mechanism to enforce pipeline naming conventions when creating or cloning pipelines in Harness. Nevertheless, you can establish an OPA policy and apply it using the On Save event for a pipeline to enforce the naming convention.

#### How do I stop a pipeline based on a condition?

To stop a pipeline based on a condition, you can incorporate conditional or failure execution in specific steps. Configure expressions so that if the condition is not met, you can mark the step as a failure or introduce a manual intervention step to mark the entire pipeline as a failure. You can trigger various error types to initiate the failure strategy in your step.

#### How can we return dynamically generated information to a calling application upon the successful completion of pipelines initiated by API calls from other applications?

You can configure pipeline outputs throughout the stages to include all the data you want to compile. Then, upon execution completion, you can include a shell script that references these outputs and sends the compiled information to the desired API.

#### Can a Step Group be configured to run on a specific subset of the VMs within the infrastructure?

No, it's not possible to configure a Step Group to run on only a subset of the VMs in the infrastructure. VMs are grouped at the Environment/Infrastructure level, and this grouping cannot be further restricted at the Step Group level. To achieve this, you would need to apply the restriction at the individual Step level for each step that needs to run on a specific subset of the VMs.

#### Does Harness provide support for Keyfactor?

Currently, we do not offer direct support or a connector to Keyfactor.

#### Are services, environments, connectors, and overrides available for versioning within the GitExperience like pipelines?

Unfortunately, these entities cannot be versioned at the moment. However, you can manage and control them using Terraform, which allows for versioning.

#### How can the namespace definition be utilized in the actual Apply step of the deployment?

We recommend declaring the namespace in the values.yaml using the following expression: `<+infra.namespace>`, especially if you have the namespace attribute declared within your manifests.

#### What is the most likely cause of a 403 error when using a service account token for a Terraform pipeline?

In most cases, the Terraform script is attempting to assume a role within the delegate, and the permissions associated with the service account are insufficient. Delegates are created with a default service account that lacks IRSA configuration.


#### Is user can able to create the input set in different repo and branch from the pipeline?
No, the input set can only be created in the same repo and branch where the pipeline exist.

#### What this error means "Not found previous successful rollback data, hence skipping rollback" after the executon failure?
This error means execution can't able to rollback to the preious version becuse there's no successful deployment is there for the pipeline.

#### Can user executes the powershell command on non-default powershell version?
No, harness only executes the PowerShell script on the default PowerShell terminal of the machine.

#### In the WinRM execution when user tries to execute the command step is skipping in the execution without any condition configurution?
If the command step is skipping that means you have marked the "Skip instances with the same artifact version already deployed" in Advanced.

#### Can we get details what branch did trigger the pipeline and who did it; the time the pipeline failed or terminated,  while using Microsoft Teams Notification 
These details are not available by default as only(status, time, pipeline name url etc0 is only sent and if you need these details might ned to use custom shell script

#### How to create role binding (to a usergroup) through the api
You can use below api by updating the details
‘’’ https://app.harness.io/authz/api/roleassignments/multi?accountIdentifier=string&orgIdentifier=string&projectIdentifier=string' \ ‘’’

#### If there is temporary failure/communication issue for sometime while connecting to service how to make sure step is tried multiple times instead of getting failed with tried once
You can configure failure strategy and use retry option for multiple run

#### How can we provide more details in approval step for approver
You can use Include stage execution details in approval option so that approvers get the execution history for this Pipeline. This can help approvers make their decision.

#### I want to run a step always irrespective of failure or success
You can use conditional execution and configure Always execute this stage

#### How to dynamically generate a tag
Currently we can not use Harness variable expression for tag

#### Can we change failure strategy while running the execution 
Yes, you can use failure strategy as runtime input and can select/configure while running the execution 

#### How to pass list of multiple domains for allowing whitelisting while using api ?

Domain whitelisting api takes domain as input array. So if we have multiple domains to be passed this needs to be done as coma separeted string entries in the array. Below is a sample for the same:

```
curl -i -X PUT \
  'https://app.harness.io/ng/api/authentication-settings/whitelisted-domains?accountIdentifier=xxxx' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: REDACTED' \
  -d '["gmail.com","harness.io"]'

```

#### Can the domain whitelisting api be used for ip allowlist as well?

No, we have a separate ip allowlist api and the domain whitelisting api is very specific to domain whitelisting and does not take ip inputs. Below api should be used for ip allowlist:

```
v1/ip-allowlist
```

#### Is there any built-in variable to access one pipeline execution outputs in another pipeline?

The variable access works only in the context of current executing pipelines. We do not have a built-in way to access some other pipeline execution variables from another pipeline.


#### How can we utilise output variables from one pipeline execution in another execution?

We have a api which can be used in a shell script step or a http step to make an api call for fetching execution detail of another pipeline `api/pipelines/execution/v2/{planExecutionId}`. If we pass the attribute `renderFullBottomGraph` as true in this api call we get all the variables in the pipeline as response.
This can later be parsed to get the desired output variables and published accordingly to be used in other steps/pipeline.


#### How to know if a connector is failing ?

Currently we do not have a way to notify on connector failure. We do show in the UI if any connector is failing the connection test as we will be testing the connectors at regular interval. 
We do however have api for testing connectors on demand as well. We can create a cron for our critical connectors test and create a notification through the cron based on the test results.


#### What are the options for passing helm flag in first gen?

Helm flags can be passed in first gen at workflow level under "Configure Helm deploy" Option. We can also pass command flags under service inside chart specification option.


#### What is the difference between helm flag options at workflow level and sevice level in first gen?

The helm flag configured at workflow level needs to be not command specific otherwise the command can fail. It will also be applied to all the helm commands. The command flag passed at service level are tagged to a specific command. So they will be added only to that specific command. Hence here we can use command specific flags as well.


#### Can we block access to only api calls from certain ip ?

The ip allowlist options can be configured optionally for UI and api. If we only want to block api access we need to select only UI option during configruation. This way access to api call from those api range will not be allowed.


#### Does Shell Script provisioning step has built in output variables?

Shell Script provoisioning step does not have script output variables similar to shell script step. Their variable configruation step only have option for input variables.

#### How to access output variables from shell provisioning step?

The shell script provisioning step expects the output to be put to a json form inside the file $PROVISIONER_OUTPUT_PATH. This is then subsequently accessed in next step with Instance variable like below
 
`<+pipeline.stages.shellscriptprovision.spec.execution.steps.shell1.output.Instances>`


#### Is there a short notation for accessing step output variable within the same stepgroup ?

Within the same step group we can shorten the expression for accessing step variable. A sample expression is below:

`<+stepGroup.steps.step1Identifier.output.outputVariables.myvar>`

#### Is there a short notation for accessing step output variable within same stage and outside of step group?

We can also shorten the expression for accessing output variables of a step inside the step group to be accessed by another step outside the step group. Below is the expression example:
```
<+execution.steps.somestepgroup.steps.ShellScript_1.output.outputVariables.myvar>
```

#### How to use secret identifiers for secret variables?

Secret variables need to select which secret identifier they resolve to. However it allows for use of expression as well. We can have a variable assigned type as expresion and use a runtime input variable in that expression. The runtime input in this secnario will be treated as the secret identifier.

An example expression will be below:

```
<+<+pipeline.variables.someinput>+"secret">
```
Here someinput variable can be runtime input and if we need to access a secret with name "devsecret" the input to variable "someinput" should be "dev".


#### Can we utilise git connetor to get the file in a shell script step?

We can not reference the connector for git inside the shell script step. If we need to clone a repo we need to use git cli commands. We can however store the credentials for git in harness secretes and reference the secrets for authetication in cli command.


#### Can we add two primary artifact in the service?

We can add two primary artifacts in the service however the execution will run with only one primary artifact. At the runtime we need to select which primary artifact the pipeline will run with.


#### How to get the kubeconfig that a kubernetes deployment runs with?

The kubernetes cofiguration can be accessed in the same stage the kubernetes deployment ran. To access the configuration we can set the kubeconfig with below environment variable configuration and run the corresponding kubectl commands:

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl get configmaps
```

#### Can we skip manually creating the kubeconfig when using the native EKS deployment method in AWS, since we provide connection details in the AWS connector?

Yes, we do not need to create the kubeconfig file manually. We just need to have this binary installed on the delegate `aws-iam-authenticator`. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-elastic-kubernetes-service-eks)

#### Do we have a inline values override in next gen? 

We do not have a separate option for inline values yaml override. However in Next gen we allow to use values override from Harness file store. So we can create the values yaml override in harness file store and add it in the values override configruation.


#### Does harness give jenkins prompt as well while executing jenkins jobs in pipeline?

The jenkins prompt message are very specific to jenkins environment and the interaction for the prompts need to be done in jenkins itselg. We do not show the same prompt for interaction in pipeline execution.

#### Is there a way to cache terraform plugins for harness terraform pipeline executions?

We can use the caching functionality provided by terraform for this purpose. We need to set the below environment variable for the terraform pipelines:

```
TF_PLUGIN_CACHE_DIR=/opt/harness-delegate/<plugincachedirectory>
```

#### Can the name of the yaml file be changed once the remote pipeline is created?

It is possible to change some attributes of git related configuration for the pipeline after creation. It is possible to change the path or name of the yaml file using both harness UI and api.

#### How to get information for user who logged in to Harness platform?

We can get the information for user login from audit log, if this information is needed using api this can be done through audit log api.


#### Do we expand variable expression inside single quotes in script step?

Harness expands all the variable expression used inside the script before executing it. Even if it is wrapped around the single quotes it will still be expanded.

#### Is there a way to avoid using helm template command in kubernetes helm deployment?

For kubernetes helm we will always run the template command as this is how we get the rendered manifest. The workflow using kubernetes helm perform the final deployment using the rendered manifest and kubectl commands.
 
If we do not want to use template command we need to be using native helm type of deployment.

#### Is space allowed in variable names?

Space in pipeline variable names does not confirm to the naming convention for the variables used. Varaible names can only contain alphanumerics -, _ and $ . 

#### How to get helm chart version from helm based triggers ?

The helm version is part of the trigger payload. The expression that conatians the helm version is `<+trigger.manifest.version>` .

#### Can we transition to any status in jira using update step?

Jira supports transition to steps as per the workflow defined for the project. Only allowed transition from a specic status to another as per the workflow will be allowed.

#### Can we use stage variable belonging to one stage before the stage execution?

It is not possible to access the stage variable belonging to a stage prior to its execution. It will not be available in context until the stage comes in execution. We should use pipeline variables which has global scope for the pipeline and is available for access from begining of the pipeline.


#### What is the correct url format for Azure git repo to be used in git ops repository?

The url format for the Azure git repo to be specified in gitOps repository is below:
```
https://someuser@dev.azure.com/someuser/someproject/_git/test.git
```

#### Is there a way I can create multiple triggers in the same pipeline such that each trigger is registered with a different GitHub repo as a webhook?

Yes, you can create multiple triggers in the same pipeline, each registered with a different GitHub repo as a webhook. To do this, you would create a separate trigger for each GitHub repo, and specify the appropriate repository name and event type for each trigger.

#### I am unable to create secrets starting with numbers in Next Gen?

Naming conventions in Next Gen are consistently applied to all entity types. According to our existing convention, we do not permit identifiers to start with numbers.

#### How do I change the service artifact source based on the environment?

You can use variable expressions in artifact source templates to allow team members to select the repository, path, and tags to use when they run pipelines using artifact source templates. To override service variables at the environment level, you can create environment-level variables and override them for different environments.

#### How can I deploy the application on a custom specified location in the Azure web app?

Currently, we don't have any facility to do the web app deployment in the custom-specified location in Azure. Alternatively, you can use the shell script step and use the Azure CLI to pass the required argument

#### How do I provide runtime input to the custom secret manager (Connector and Template)?

You can set a variable in the custom secret manager and set its value as runtime time.

#### How do I pass secrets into the Container Step?

We got an update from the team that referencing a secret type output variable in a container step or CI steps is not currently supported.

#### Is rotation of harness_platform_token in teraform resource management supported?

No, currently we do not support rotation of platform token.

#### Is it possible to trigger a CI stage by a trigger of type artifact? 

The trigger variables for CI aren't set so historically we did not support triggering of CI stage.

#### Why on echoing the date powershell shell script step adding an extra line?

Using the Write-Host command instead of echo will get the result in one line.

#### How do I access the artifacts metadata from the service definition in the pipeline?

You can get the artifact metadata from the service step output, each output value can be referred to via the corresponding expression.

#### Which API can I use to get the Projects and ORGs on the account?

You should use:
https://apidocs.harness.io/tag/Organization/#operation/get-organizations for getting organizations within an account. The "org" parameter is an optional parameter

```
curl -i -X GET \
'https://app.harness.io/v1/orgs?&page=0&limit=30&sort=name&order=ASC' \
-H 'Harness-Account: REDACTED' \
-H 'x-api-key: REDACTED'
```

Please use https://apidocs.harness.io/tag/Org-Project#operation/get-org-scoped-projects for getting projects scoped to an org.

```
curl -i -X GET \
'https://app.harness.io/v1/orgs/default/projects?has_module=true&page=0&limit=30&sort=name&order=ASC' \
-H 'Harness-Account: REDACTED' \
-H 'x-api-key: REDACTED'
```

#### Does failed deployments auto-rollback on all the failed deployments that have occured ?

No, it does not necessarily mean that deployments auto-roll back. The action taken on failed deployments depends on the specific configuration and practices set up in the deployment pipelines. Organizations can define various actions to take when a failure occurs, including manual intervention, notification, or automatic rollback to a previous working version. If an organization desires more visibility into rollbacks, they can create a dashboard or monitoring system specifically designed to track and display information about rollback events.

#### Is there a way to filter how many of the deployments were to production ?

Yes, we can filter deployments if the environments used for the same are marked as `Prod`

#### Is there a plan to introduce a `cosign` step within deploy stage ?

For users who wish to incorporate image signing into their Continuous Deployment (CD) process, they have the flexibility to utilize our `container` steps as a solution. This approach allows users to sign images before deploying them as needed, providing a customizable and versatile deployment workflow.
Please read more on Containerize Step Grpous in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups)

#### How can one utilize outputs from the Terraform/Terragrunt apply steps effectively ?

utilizing outputs from Terraform/Terragrunt apply steps follows a similar approach. After executing the Terraform/Terragrunt apply step, the outputs are accessible in the 'Step Output' section. These outputs can be accessed using expressions. For instance, one can access an output using `<+pipeline.stages.stag1.spec.execution.steps.TerraformApply_4.output.get("test-output-name2")>`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)


#### Is there a way to ignore a CV step in Next-Gen if it started running ?

No, this feature can be found in First-Gen but it will introduced in Next-Gen soon.

#### Do we have the functionality in NextGen for marking continuous verification errors as "Not a Risk" ?

Yes, it is behind the feature flag `SRM_LOG_FEEDBACK_ENABLE_UI`. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/verify/cv-results/log-feedback/)

#### Is there a way to get the name of the person triggering the execution ?

Yes, one can use the expressions `<+pipeline.triggeredBy.email>` and `<+pipeline.triggeredBy.email>` . Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipelinetriggeredbyname)

#### Does `workflow variables` in Current-Gen work same as `regular platform variables` in Next-Gen ?

For infomation about this, go to:
* [Migrate variables and expressions from firstgen to nextgen](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#migrate-firstgen-expressions-to-nextgen)
* [Workflow variables](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/workflows/add-workflow-variables-new-template/)
* [Add and reference variables](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable)

#### How can multi-service pipelines be executed in parallel as stages while ensuring that users select a single environment for all these parallel stages?

One can use the following expression : `<+pipeline.variables.var_name>`

#### How do we treat sidecars from an ECS licensing perspective?

We calculate the total number of instances that the task spawns, including sidecars. However, we may not count these instances separately if they are associated with the same task.

#### How do we detect service licenses for SSH deployments ?

Please consider the following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#ssh-and-winrm).
Feel free to reach out to us in case of issues.

#### Does creating a CD stage with cleanup scripts cost usage of license ?

No, It won’t use a license if an artifact isn’t being deployed onto a target host.

#### Is cache intelligence available between CD steps, or just for CI ?

It is only present in CI as caching dependencies needs to build an artifact is a CI only concept.

#### Can we not not use `<+input>.executionInput()`  in the ternary operator to wait for user entry ?

No, this is not possible yet for the excution. We may consider this as Enhancement Request in upcoming future.

#### Do we allow rotation of `harness_platform_token` in teraform resource management ?

No, we don't. Please refer more on this in the Terraform-Harness[Documentation](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_token)

#### What is the time parameter for AWS back-off strategy ?

For AWS back-off strategy, parameters of time are in milliseconds. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#aws-backoff-strategy/)

#### Can I implement a custom approval step that runs a script, calls Jira, and fails if the issue count is greater than 0 ?

No, it is not yet introduced for Jira. It is only applicable for Harness Approvals at the moment

#### Can we fix a max queue length in queue step ?

No, this feature is not supported for queue steps. The queue operates on a first-in, first-out (FIFO) basis with a maximum capacity of 20. Any executions beyond this limit will result in failure.

#### Does Harness support the use of two Target Groups and allow the utilization of either the Load Balancer or Route53 DNS for orchestrating the switching between the routes to the Blue or Green Services ?

In the next generation, we support the utilization of a `load balancer` with target groups for the switching between blue and green. In the current generation, we used to support both `load balancer` and `Route53 DNS` for this purpose

#### How can one tell if a service is v1 or v2 ?

For V1 services, they only include a name, description, and tag. There is no service definition associated with these services. However V2 services consists of them all including `service definitions`, `manifest path` and `artifact` if one wants to pass an image in pipeline at runtime.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2)

#### Does Harness have restrictions for running parallel jobs in trial accounts ?

Yes, there are [concurrency limits](https://developer.harness.io/docs/platform/pipelines/pipeline-settings) by plan tier.

#### What can be an alternative for facing API rate limit issues while running pipelines with templates backed up by Github ?

Please one can try using the below alternatives :

- Utilise different Connectors with different access tokens for remote enitities
- One can use Github App to have extended limits on API requests. The GitHub App has a higher API rate limit, especially if its configured for a GitHub Org.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support/).
One can also follow the provided [Documentations from Github](https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-github-app-installations)

#### Where can one find the documentations for pre-requisites when migrating from First-Gen to Next-Gen ?

Please find the pre-requisite for migration documentation [here](https://harness.github.io/migrator/prerequisites)

#### Can one filter the artifact files based on the extension (such as `*.zip`) ?

Yes, one can use the `Artifact Filter` instead of `Artifact Directory` when creating an Artifact and apply the regex to filter the path.

### How can I make sure build artifacts pulled into Harness come from protected branches before production deployment?

You can select the Artifact filter option and configure the service's Artifact source as needed.

#### How does Harness currently handle sorting based on timestamps for fetching the GCR Artifacts ?

As of today, our system does not sort data based on timestamps. Instead, it employs lexical sorting.
We are actively exploring and considering transitioning from lexical to time-based sorting. This change would enhance the handling of timestamps.

#### How can one parse a JSON string in a pipeline expression ?

Please one may follow steps mentioned below :

- Use the expression `<+ json.object(<+pipeline.variable.myJsonThing>)>` 
- One can also try JQuery in a shell script or container step and capture output variables
- Read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/json-and-xml-functors/)

#### What is the feature flag for the bi-directional GitSync ?

One can enable the Feature-Flag `PIE_GIT_BI_DIRECTIONAL_SYNC` to fetch the feature.
Please read more on All Continuous Delivery FFs in this [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations/#active-cd-feature-flags/) 

#### How can the GitHub Repository values be cloned in Continuous Delivery Module ?

We provide with a git-clone step for to fetch values or clone repository in the Continuous Delivery Module.
Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step)

#### Can one deduce that the objective involves fetching files from S3 for deployment in this scenario?

Yes, one can try to use a service deployment and use our `Custom Remote Manifest Option` to fetch it.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-custom-remote-script-and-manifests/)

#### Can one use GitHub Actions in the  Continuous Delivery Module ?

No, we have disabled the `GitHub Actions` for our  Continuous Delivery Module.
One may refer to the CI Github Action step [Documentation](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step/) for more insights

#### Is there a way to conditionally include specific values in a YAML configuration file ?

No, one cannot add conditionals to the `values.yaml`.One can only apply conditionals in the actual manifest.

#### How to backup the Harness configuration yamls in a Git repository ?

One can always access entities on our Harness platform without the much requirements of a backup.
But one can follow below in case to do so :

- Try retrieving the files use the API calls, if not one can use` bidirectional sync` as an alternative by enabling the Feature-Flag `PIE_GIT_BI_DIRECTIONAL_SYNC` to fetch the feature
- Apart from obtaining YAMLs through an API, within the Git experience, there is also a functionality called `Import from Git`. This feature enables users to create entities in Harness by utilizing YAMLs stored in a Git repository.

#### What is feature associated with the FF in First-Gen called `CDS_CG_INLINE_SSH_COMMAND` ?

The feature associated with the First-Gen flag called `CDS_CG_INLINE_SSH_COMMAND` introduces an alternative mode of script execution. By default, user-provided scripts are copied to a temporary file on the host and then executed. However, in cases where certain host machines have restrictions on file creation and execution, particularly in the`/tmp` folder, this feature allows for direct script execution using an SDK. This eliminates the need to create temporary files, making it more adaptable to systems with limitations on file operations in specific directories.

#### How can one fetch the details of `Subscription License Count` and `Subscription end date` ?

One can use the curl command as - 
``` 
curl --location 'https://app.harness.io/gateway/ng/api/licenses/<accountIdentifier>/summary?routingId=<accountIdentifier>&moduleType=CD' \
--header 'authorization: <Bearer token>' \ 
```

The response to above call should look like something below - 

```
{
  "edition": "ENTERPRISE",
  "licenseType": "PAID",
  "moduleType": "CD",
  "maxExpiryTime": <Subscription end date>,
  "totalWorkload": <Subscription License Count>,
  "totalServiceInstances": 0
}
```

#### Do we have an API to get details for usage percentage of active service instance ?

No, we don't have an API to calculate the percentage , it is based on UI implementation on `License Count` and the current number of active services

#### Is there is an ECS DNS Blue/Green deployment similar to First-Gen in the Next-Gen ?

In the next generation, we support the utilization of a `load balancer` with target groups for the switching between blue and green deployments.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-v2-summary/)
For First-Gen reference read the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/aws-deployments/ecs-deployment/ecs-blue-green-workflows/#ecs-bluegreen-using-dns)

#### How can one fetch the provisioner Id in a pipeline using Terraform with an expression ?

One can fetch the provisioner Id in a pipeline using expression `<+stage.pipeline.variables.HARNESS_PROVISIONER_ID>`.
Please read more on how to provision target deployment infrastructure dynamically with terraform in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform/)

#### When publishing an artifact, what is the specific interval for polling and can a user configure it ?

Polling interval for publishing an artifact is `1 minute`. Harness don't allow to configure this by user
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#important-notes)

#### What is the work flow for secrets in Harness SaaS ?

Secrets retrieved by a delegate do not get transmitted back to the central platform. Delegates establish connections with diverse secret managers throughout the pipeline execution, without transmitting any confidential information back to the platform
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/)


#### What is the artifact polling interval for triggers?

Artifacts are polled at every 1-minute interval

#### Can I configure artifact polling internally?

Currently, this interval of 1 minute is hard coded but we have an enhancement request in progress to expose this made configurable.
Please contact Harness support for more info

#### What is the default behavior on calling the triggerexecutiondetails rest API endpoint if the trigger is not active?

We will return an error message("trigger history not found") until the trigger event becomes available.

####  What is the default behavior, if I don't pass any value for a variable, Does Harness render it as blank or "null"?

In run pipeline form and in triggers, if the input set is not applied, empty values are sent as “”, and if the input set is applied, they are sent as \<+input> which is treated as null.

#### I don't have the option to create an inputset in git?

For the input set to be added in git, We require the pipeline to be on git as well. Input sets are linked to the pipeline and get stored in the same repo and branch as the pipeline definition.

Once you move your pipeline to git, the option to create an input set on git will also be available.

#### Can we use our vault for storing terraform apply step output?

Currently, only the Harness secret manager is supported.

#### How do I encrypt for my terraform output?

Terraform output can be encrypted once you configure a secret manager for the "Encrypt JSON output" field under the optional configuration of terraform apply step.

#### Can you please provide the info on how long the secret created from the terraform apply step stays in place and how it gets overridden?

The secret will be always unique but the expression of it is the same depending on the terraforming apply step. It is stored in the secrets at the project level. The secret exists till the pipeline is not finished.
Once the pipeline failed|passed|aborted… it means the pipeline finished the execution and we clean the secret.
There is no way to control how long it is kept.

#### How do I trim space from variables as harness preserves space in variable value?

If you want variables to be trimmed before being fed into their pipeline, you can define the variable like this:
 
```<+<+variable.MY_VARIABLE>.trim()>```

#### Does Harness NG support the "Skip artifact version already deployed" parameter as present in CG?

We do support "Skip artifact version already deployed" for WinRM SSH deployment. It is present under the advanced section of the pipeline.

#### How do I select a single delegate pod for all my steps if multiple delegates are on the same selector?

Currently, only selectors can selected for steps. Though we can pass the delegate selector from one step to another if there are multiple delegates with that selector it will pick any available.

#### Does OPA policy evaluate by resolving expressions present in pipeline YAML?

Unfortunately, Runtime input variables can not be evaluated just by OPA policy. You can implement policy steps in the pipeline to run the policy against the provided variable value.

#### Can we refer output variable of type secret in container step?

 Output variable of type secret cannot be referred in the container step, the same variable can be referred to if it's type string.

#### How do we resolve the issue when a pipeline is getting triggered twice though there is only one trigger?

Check if you have 2 Harness webhooks pointing to this same account registered in your repo? If there are, please delete one of them, each repo is supposed to have only one Harness webhook registered in it. Also please check if there is a webhook configured at the organization level.

#### Is there a way to use Harness platform manager for terrafrom plan encrytpion/decryption?

Enabling the ff `CDS_TERRAFORM_TERRAGRUNT_PLAN_ENCRYPTION_ON_MANAGER_NG` feature flag if the default Harness secret manager is selected for the encryption/decryption of Terraform plans, please not that the FF does not work for custom or other secret managers.

#### Every time when I run kubernetes deployment, harness create new version of configmap even of there were no changes which force pods redeployment. Is there a way to specify for harness to create new configmap only when changes detected?

You can skip the versioning, it can be skipped by using these two ways:
 
1. Annotate the manifest provided in the Harness service's Manifests section with harness.io/skip-versioning: "true".
 
2. In the Harness service's Manifest Configuration page, select Manifests > Advanced, and then select the Skip Versioning checkbox.

#### After a successful deployment with the namespace "x" and another failed deployment with the same namespace (x), we switched the namespace and now it seems it cannot properly do a helm history.

You can enable the Ignore Release History Failed Status option to have Harness ignore these errors and proceed with install/upgrade. More on this can be referred here: [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/#ignore-release-history-failed-status)

#### How can one avoid scale down of Old APP creating a Blue-Green Deployment ?

Following steps can be the used for avoiding the scaledown of Old App in Blue-Green Deployment:
- One can select instance count for old app in that case instead of % and give desire value as 0, this will skip the re-sizing of the Old App.
- Disable `Downsize old application` in swap route step, this will avoid to touch the Old APP after deployment.

#### How many Execution Status are present in the pipeline execution ?

Harness provides 31 Enum Strings status for pipeline execution status namely : 
```sh

Enum: "Running" "AsyncWaiting" "TaskWaiting" "TimedWaiting" "Failed" "Errored" "IgnoreFailed" "NotStarted" "Expired" "Aborted" "Discontinuing" "Queued" "Paused" "ResourceWaiting" "InterventionWaiting" "ApprovalWaiting" "WaitStepRunning" "QueuedLicenseLimitReached" "QueuedExecutionConcurrencyReached" "Success" "Suspended" "Skipped" "Pausing" "ApprovalRejected" "InputWaiting" "AbortedByFreeze" "NOT_STARTED" "INTERVENTION_WAITING" "APPROVAL_WAITING" "APPROVAL_REJECTED" "Waiting"
```
One can also filter config their required status by creating a wrapper logic.
Please read more on this in the following [Documentation](https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getExecutionDetailV2)

#### How can one setup and use Github App in Github Connectors ?

Harness has provided video-configured guide on setting up the Github App with Git connectors.
Please refer the same in this [Documentation](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support/)

Harness uses private keys to secure the Github App in the platform which ensures the security maintenance of the Github public App as well !

#### What is the time limit for a pipeline execution?

The maximum limits for a single pipeline run are 35 days for paid plans and 4 hour for free plans with a verified account.

These limits are applied because:
- There is a limit on the total number of concurrent and queued executions. If some pipelines run/wait for days/weeks, they consume valuable resources from other projects in the account and delay queues.
- Usually, very long running pipelines are waiting on something (approvals, test results, deployments) that took longer than expected. A quicker timeout makes it clear that something went wrong in the workflow, instead of indefinitely waiting.
- Long running pipelines impact the availablility of Harness resources.

For more information, go to [Deloyment logs and limitations](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations) and [Pipeline settings](https://developer.harness.io/docs/platform/pipelines/pipeline-settings).

#### Why can one not set Enironment Groups in Chained pipeline expression as expression ?

This functionality is not yet supported. We expect this to be available very soon.

#### Is there a method to modify permissions for write access to the `/tmp` directory in order to mitigate the risk of a team unintentionally or intentionally deleting it, thereby avoiding potential disruptions for other teams that rely on it without restrictions ?

No, we don't have such feature availibility now.
Although one can simply use containerized step groups instead of having teams work out of `/tmp`.
Please refer more on containerized step group in this [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/)

#### Can we create Custom remoete manifest template in Next-Gen ?

No, this feauture is yet to be introduced.

#### Can we disable the Fetch Instances in custom deployment stage ?

No, Fetch instances manifest check the deployed resources exist to be used at surface up on dashboard.
Disabling such is not an available option.

#### What expression can be employed to account for the status of children within a matrix when the default expression `currentStatus` does not suffice ?

By default the expression we use is currentStatus which does not take into account the status of children inside matrix. Inorder to acheive the same behaviour we can use `liveStatus` expression.

#### Can one implement execution of the pipeline using the following expression  `<+stage.variables.Notification_To> != ""` ?

One can also use implementation `<+stage.variables.Notification_To> != "" || <+stage.variables.Notification_To> != "null"` for more reliable results as this will always resolve as a boolean value instead of an empty string.

#### Can we configure channels dynamically using expressions for pipelie Slack notification ?

No, We do not resolve the expression in the test channel capability, the user would need to hardcode a channel and test
Also, we do not log the resolved pipeline expression into the slack notification configuration

#### How long does the Perpetual Task in Service instace count stays live and what is the interval perid of this check ?

Perpetual Task run after 10 mins interval which sync instances details, But stays alive for 2 weeks. So, after 10 mins service dashboard should be updated but live expectation can be for upto 2 weeks from here.
Please read more on this in the following [Documentaion](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#how-instance-information-is-obtained)

#### Is there a way to pass output variables between commands with in a command step ?

No, output variables can only be passed between steps or stages, not within a single command step
Please read more on this [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables)

#### Do we support Terraform Harness provider configuring New Relic as a health source for a monitored service ?

Yes, we support health source like  `New Relic` , `ElasticSearch`, `Sumologic Metrics`, `Sumologic Log`, `Splunk Signal FX`,`Grafana Loki Log`,`Azure Metrics`, `Azure Log Health`, `Prometheus`, `Datadog` and `Metrics`.

#### What is the variable type set to if an echo for the variable is made ?

The variable type is available for all inclusion types (ex. int, float,..etc). If one wishes to constraint the value accordingly, they can use expressions in case of the same ( say for int one can use the method `intValue()` or `expression.toInteger()` )
Please read more on the variable inputs in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables#number-variables)

#### Do we support exported variables for looping strategies ?

No, we don't support the exporting of variables using looping strategies.
Please read more on output variables in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#scoping-output-variables-using-aliases)

#### How to give the user access to WinRM resources:
Run command winrm configSDDL default and it should open the the dialogue, check if user configured for login already present in the last otherwise add the user

#### How to fetch user group id by name using graphql
You can use below query 
query\{userGroupByName(name:"Basic User")\{id}}

#### How to fetch application by name using graphql
You can use below query 
query\{applicationByName(name:"appname")\{id}}

#### How to enable certificate authentication while using winrm
Its disabled by default and need to run below command to enable
Set-Item -Path WSMan:\localhost\Service\Auth\Certificate -Value $true

#### How to fix error Socket Connection Failed for url windowshost on port 5985
Check if port 5985 is opened and test the communication for winrm 

#### Reconcile is taking pretty long time while using remote temple stored in git
Check in network time response for templates to troubleshot if there is any issue/slowness while communicating to git

#### Does Harness allow passing of multi-environment as an expression ?

No, we don’t support passing in multi environment as an expression. The feature will be available soon
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/)

#### Can one use a Repeat Looping Strategy if the infrastructure definitions are stored in a variable as CSV, and how can one access and perform actions for individual items within the Repeat Loop ?

You can leverage a Repeat Looping Strategy to iterate through infrastructure definitions stored in a CSV variable. Utilize the following YAML snippet:
```sh
repeat:
  items: <+VariableExpression>.split(",")
```

To access individual items within the Repeat Loop, use the `<+repeat.item>` expression

#### How to create an AWS connector using `aws-iam-authenticator` on EKS Cluster with webIdentityToken ?

Please read how to set AWS connector on EKS Cluster in this [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-elastic-kubernetes-service-eks)
Also, to align with AWS changes, it's important to note that the previous method of accomplishing this task has been deprecated in `kubectl version 1.21`. To address this, when utilizing the `Iam-authenticator plugin`, it is necessary to create a `Fargate profile` as part of the updated procedure.

#### Is it possible to get a `KUBECONFIG` file in a shell script within Harness for K8s connectors ?

Yes, we have it documentated for the steps. Please refer to the following documentations on [Shell script include infrastructure](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#include-infrastructure-selectors) and [Shell script run K8s](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#running-kubernetes-commands-in-the-shell-script)

#### For Input Sets is there any specific RBAC ?

No, We dont have RBAC for Input Sets. Please read more on input sets in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/input-sets/)

#### What is the oldest version of kubernetes we support for the delegates for firstgen and nextgen ?

Oldest Kubectl Client version being used is `1.16`. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations/)

#### Is there a way to simply update the ECS scaling policy without redeploying the ECS service ?

Many users opt for a shell script approach, where a configuration file is utilized and set as an environment variable. Subsequently, a shell script is crafted to execute the relevant AWS CLI commands, facilitating the update of scaling policies for a deployed service. This versatile method allows for customization and automation across various scenarios and configurations

#### Is it expected that, after pushing a new artifact to an initially empty Docker repository linked to a trigger, the trigger's status shifts from `pending` to `success` only triggering the pipeline upon the second push ?

Upon creating or updating a trigger, there's a five to ten-minute delay before the polling job initiates and the trigger becomes operational. It's advised to wait for this duration before pushing the artifact, according to general recommendations from the deployment platform.
After 5-10 mins of the trigger status turns success, any tag collected should trigger the pipeline.

#### Can we use Infra variable in service config yaml(Like to use this variable as artefact path etc)
No the Infra variable will not be available for service config, these Infra variable can be used in deployment manifest etc but not is service config as these variable will resolve in later part of deployment 

#### Can we use Env/Infra etc variable as skip condition for approval stage
If approval is added as stage then these variables will not be available and only account/org/project or pipeline variables will be available, If you are using approval as step inside Deploy stage than you can access Env/Infra variables as well

#### What is the equivalent variable for  $\{artifact.label.get(“labelkey)} In NG
You can use  `<+artifact.label.get(“labelkey”)>`

#### "Is there an expression, such as '\<+pipeline.stages.Deploy.strategy.finalStatus>', to get the status of a stage outside of the looping strategy?"
The expression "\<+strategy.currentStatus>" only works within the context of the looping strategy, there is no expression like "\<+pipeline.stages.Deploy.strategy.finalStatus>" to get the status of a stage outside of the looping strategy.

You can try using the expression "\<+pipeline.stages.STAGE_ID.status>" to get the status of a specific stage.

#### Unable to edit Delegate profiles in NextGen
DelegateProfile is deprecated in Harness NextGen, and you can leverage INIT_SCRIPT to run scripts at delegate startup. There is no option to associate Delegate configurations with delegates in Harness NextGen.

#### I have a pipeline containing different stages DEV-QA-UAT-PROD. In UAT I'm using Canary deployment and in PROD it's Blue-Green. In these scenarios how Harness provides proper Roll Back strategies?
Harness provides a declarative rollback feature that can perform rollbacks effectively in different deployment scenarios.
 
For Canary deployment in UAT, you can define the percentage of traffic to route to the new version and set up conditions to switch traffic between the old and new versions. If an anomaly is detected during the canary deployment, Harness will automatically trigger a rollback to the previous version.
 
For Blue-Green deployment in PROD, you can define the conditions to switch traffic between the blue and green environments. If an issue is detected in the green environment, you can easily switch back to the blue environment using the declarative rollback feature.
 
You can define the failure strategy on stages and steps in your pipeline to set up proper rollback strategies. You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. Additionally, you can use the declarative rollback feature provided by Harness to perform rollbacks effectively in different deployment scenarios.


#### We have a parent pipeline with the child pipelines and wanted to know if there is any built-in variable to check if the pipeline is triggered by another pipeline. 
There is no built-in variable to check if a pipeline is triggered by another pipeline. Even if a pipeline is triggered by another pipeline, it will still be considered a "Manual" trigger type. You may need to use a custom variable or some other method to track this information.

#### After moving the pipeline source code from Inline to Repository. Is there a way to roll back this change as we cannot find it in the UI?
No, You should not face any issues with the trigger when it comes to inline or remote pipeline. There is no way to roll back. 
 
However, you can copy the yaml from your git and create a new inline pipeline in Harness or you can use the import from remote option and create a new remote pipeline let us know if you encounter any issues with the trigger we will help you with the next steps.

#### How to change the pipeline source code back from the repository to inline? Is there a way to roll back this change as we cannot find it in the UI?
There is no way to roll back, You can copy the yaml from your git and create a new inline pipeline in Harness or you can use the import from remote option and create a new remote pipeline. 

#### Is it possible to remove permissible actions from the Wait Step?
No, removing the permissible actions from the Wait Step is not possible. The Wait Step provides the options to Mark as Success and Mark as Failed, which are necessary for the step to proceed with the pipeline execution. 

However, you can set a failure strategy for the Wait Step to ensure that the pipeline execution fails if the step is marked as failed. Additionally, you can set a longer timeout duration to ensure that the mandatory waiting time is enforced.

#### We want our helm deployments through Harness to wait for the objects to be in the ready state and then only exit with status. Currently, it is executing helm upgrade and exiting but we wanted to run something like this: helm upgrade --install --atomic --timeout 20m \<release_name> \<chart_name> How can we do this with Harness?

Using --atomic and --timeout flags to the Helm command in the "Command" field of the "Helm Deployment" step. This should work to ensure that the deployment waits for the objects to be in the ready state and then exits with status.
 
However, please note that the --timeout flag specifies the time to wait for any individual Kubernetes operation (like creating a pod or service) to complete, not the time to wait for all objects to be in the ready state. So if you have a large number of objects to deploy, you may need to increase the timeout value accordingly.
 
Also, please make sure that your Helm chart includes the necessary readiness probes for your objects to be considered ready by Kubernetes. Harness will wait for the readiness probes to pass before considering the deployment successful.

#### To store my shell script when I use Harness File Store I don't see any option like Bitbucket, or GitHub.

As of today, we have only two options to select the shell script provision script. That is inline and Harness file store.

#### How can I specify to use the account connector during migration?
This config will do that  connector-scope: accountIn case you want to do it connector to connector basis you can refer to this - https://harness.github.io/migrator/advanced/overrides-and-settings

#### How to download pipeline logs based on the given pipeline execution key?

You can [download execution logs](https://developer.harness.io/docs/platform/pipelines/executions-and-logs/download-logs) from the Harness UI or via API.

#### Is it possible to publish some custom data like outputs from the variables or custom messages, strings (any information basically) in the Artifacts tab?

The only way to publish data in the Artifacts tab is by providing a URL to a publicly accessible location where the artifact is stored. If you do not have any public buckets, you can consider using a private bucket and generating a pre-signed URL to access the artifact. 
 
This URL can be used in the file_urls setting of the Artifact Metadata Publisher plugin to publish the artifact in the Artifacts tab. Another option is to use a different cloud storage provider that allows you to generate temporary URLs for private objects, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.

#### How to pass the dynamic tag of the image from the CI pipeline to the CD Pipeline to pull the image.
A project or org or account level variable can be created and A shell_script/Run Step can be added in the P1 pipeline to export or output the required variable then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable

#### "How can I dynamically reference step group IDs within a loop, such as loop_0, loop_1, loop_2, as they change dynamically?"
You can achieve this usecase using the expression \<+execution.steps.step-group-id\<+strategy.identifierPostFix>.steps.step-id.output.outputVariables.var>

#### How does Harness GitOps ensure consistency between the desired state of infrastructure and its actual state?

Harness GitOps ensures consistency between the desired state of infrastructure and its actual state by continuously monitoring the desired state in Git and syncing it with the live state in the Kubernetes cluster using an operator. 

This ensures that the target state (cluster) is continually converged with the desired state (manifests), making the deployed applications and infrastructures fully-traceable and fully-versioned artifacts.

#### How do Harness CD SSH deployments handle authentication and authorization for remote servers?
To authenticate and authorize remote servers for SSH deployments, Harness CD uses SSH Private Key to authenticate to the remote VM/server. For steps, you can refer to Passwordless SSH using public-private key pairs.

#### How to refer to the name and identifier for Infrastructure Definition using build-in variables from another stage?
ENV details can be referred from the previous stage using output expressions of that stage.

#### How to Make Two Stages Run on the Same Delegate Pod?
For your use case to run both stages in one pod, you can refer to this doc - https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/
With this, you can configure steps in the same pod.

#### Why am I not able to execute the pipeline, even if have "execute" permissions?
We have different scopes under which resources are assigned, if the user running a pipeline that has account-level resources, the user needs view access to those resources as well to execute the pipeline.

#### What events can trigger the execution of rollback strategy steps - an error, like exit code 1, during Terraform plan step execution?
The Rollback strategy steps can be triggered by various events such as failure of a step or stage, timeout errors, or execution-time input timeout errors.
Yes, an error during Terraform plan step execution, such as exit code 1, can trigger the Rollback strategy steps.

#### If the fallback strategy steps include only a Terraform rollback step using the same provisioner identifier what will happen?
During a rollback in Harness, the provisioned infrastructure is reverted to the previous successful version of the Terraform state using configuration files or Terraform configuration from the latest successful deployment with a matching Provisioner Identifier. The rollback is a hard rollback to the exact version of the state provided, without incrementing the state's serial number. The Provisioner Identifier determines what to rollback, and if settings are expressed, Harness uses runtime values when evaluating expressions.

#### Are there any limitations to terraform rollback?
There are limitations to rollbacks. If, for example, modules 1 and 2 were successfully deployed, and module 3 failed, the rollback will only revert to the successful state of modules 1 and 2. However, if module 3 succeeds, and the subsequent deployment fails, the rollback will only include the state with module 3 deployed, excluding modules 1 and 2. Additionally, rollback is not possible if the Terraform Apply step is run with the Skip state storage option enabled and no Terraform backend is configured in the Terraform files. In such a scenario, using the Rollback step would be incorrectly set up and could lead to unexpected results.

#### How do I use a custom stage to do the Terraform Cloud Run step?
The run step is only supported in the CI and CD stages. For the custom stage, please use the shell script step.

#### Why do triggers, sometimes stay in the "pending" state for many minutes, perhaps 10-15 minutes or more?
Whenever a trigger is created or updated, it takes about five to ten minutes for the polling job to start, and for the trigger to be in a working state. Harness recommends that you wait for five to ten minutes after a trigger is created or updated to push the artifact.
 This seems to be the expected result, it may take 10-15 for the trigger to get active.

#### How do I provide, the Jira project as an expression for the Jira approval step?
In the Jira approval step For the the Jira project field, we only support fixed and runtime input for now, Expressions are not supported.

#### Why does having a number as a variable type append ".0" to round numbers?
Number-type variables are always treated as doubles as per design (double-precision floating-point).
-1.79769313486231E308 to -4.94065645841247E-324 for negative values.
4.94065645841247E-324 to 1.79769313486232E308 for positive values.
You can explicitly cast it to an integer-like expression.intValue()

#### How to disable auto sync for production environments only within the GitOps app
You can update the RBAC to disable auto-sync for the entire GitOps app, but this may not be ideal if you want to enable auto-sync for other environments within the app.

#### How the order or precedence of file in the k8sdeploy component is used when multiple values yaml were used.
When using multiple values YAML files in Harness Kubernetes Services, the highest priority is given to the last file, and the lowest priority to the first file.

#### How to make Pipeline  input value required?
You need to select the checkbox "Set Variable as Required During Runtime" after editing the variable

#### Which variable we can use to refer artifact repository 
You can use variable \<+artifacts.primary.repositoryName>

#### Helm Pipeline is failing with helm: not found error
Check the Helm version you are trying to use is installed on selected delegate and also you can print and check $PATH variable if helm binary path is set correctly

#### Autoscaler manifest file deployment is throwing 400 and failing with  An error occurred while trying to set the rules. The autoscaler responded with: Bad Request Reason
As we can see that it was failing while setting the rule, so need to validate the Rule section in manifest and you can try applying the manifest directly on cli.

#### Tags are sorted differently in FirstGen and NextGen

As of today we do not sort on timestamp. It is sorted lexically.
Also , the artifact collection in First Gen was different.
We did artifact collection in First Gen and we do not do artifact collection in Next Gen.
With collection we kept a track on our side by caching which is why we could show the list in sorted manner.
We do not do that in NG anymore and We make API calls on the fly and show it. 
Docker does not guarantee an order and there is no timestamp information provided, so we sort lexically. 

#### Multi-service deploy skipping services in case of a failure for any 1 stage

Lets take an example that max concurrency is set to 15. 
As the max concurrency is 15 and the when the first 15 executions started the failure one was running for 4m 57seconds, but other successfully one finished in around 30-40second, say first 15 started, 
1,2,3,4,5,6,7,8,9,10 ... 14 completed in 30-40seconds so next 16,17,18,---29 will picked as it will always run 15 concurrently, but 15 job is still running. same way the new 14 also completed in 30-40seconds so it picked up next 14 and so on. so till 82 it picked up the job which ran but soon after that the failure one completed and it skipped all the next runs.

#### Kubernetes Delegate Step Requires Service as Input

The K8s Delete Step requires a Service because it's configured in a deploy stage. The user needs to provide a service and Harness can delete the namespace, the release name, or a manifest file associated with the Service

#### Active Service Instances Showing in the Services

When we do a deployed using Harness. We always will see the Active Instance in thr service based on the deployed. 
Harness does a sync task every 10mins to the infrastructure where the instances was deployed. 
If we remove the host , harness will show 0 active instances after the 10min sync runs. 

#### API to get license count, expiry date

You can use the licenses API endpoint for Subscription License Count and Subscription end date
``` 
curl --location 'https://app.harness.io/gateway/ng/api/licenses/<accountIdentifier>/summary?routingId=<accountIdentifier>&moduleType=CD' \
--header 'authorization: <Bearer token>' \
``` 
The result should be like this:
``` 
{
  "edition": "ENTERPRISE",
  "licenseType": "PAID",
  "moduleType": "CD",
  "maxExpiryTime": <Subscription end date>,
  "totalWorkload": <Subscription License Count>,
  "totalServiceInstances": 0
}
```

#### Skip preflight check option diabled for git based pipelines while executing the pipeline

For the pipelines which are stored remotely in git, Skip preflight check option diabled for git based pipelines while executing the pipeline. As pipeline is under git and can go through changes without harness getting involved, Harness will not be able to pre-compute the checks. So we skip it to avoid false positives. 
 
#### Unable to see real time console logs for a pipeline execution.

It could be that you are nopt able to see real time console logs for a pipleine execution but once the pipeline completes it shows all the logs. 
You can open the devleoper tools and check the network while the pipeline is executing. If you see a failed stream api , then issue most likely is on the proxy settings. You also need to make sure Server-Sent Events are not blocked:
 
Reference : https://stackoverflow.com/questions/13672743/eventsource-server-sent-events-through-nginx

#### How to use the a json type secret value. 

Let's take an example that your secret value is json and you stored it as a secret in Harness. Yoiu should reference it with singlw quote like :

```TEST_KEY='<+secrets.getValue("boa-uat-gcp-key")}>'```

#### Pipelines notiiofcations on slack secret expression for slack webhook url

You can also store the slack webhook url as secret in Harness and then use it for the pipeline notifcations.

Use the below expression : 
```<+secrets.getValue("slack_webhook_url")>```
Here the slack_webhook_url is secret stored in Harness which has the real webhook url value. 

#### Unable to delete a service

When you are trying to delete a service and it gives you an error saying it has running insatances. But you have already remove the pipeline/environment etc
As When you deploy using Harness , Harness runs a perpetal task to validate about the depployed instance using the infrastructure definition. 
Yoi can either bring down the instance from the infrastucture and then delete the service or use the Force Delete option in Harness if you want to delete the servie but still keep the deployed instance up and running. 

#### Freeze window slack notifictaion

You can setup slack notification on Freeze window enabling. When go set a freeze window , go to notiifcation and select the option "Freeze window is enabled and active" amd under method choose the slack and set the slack webhook url. 

#### Where can one find the metadata of the step/stage executed in a pipeline ?

One can now find the metadata of any step/stage in a pop-over of the same on hovering the entity. This is a recent change from showing the data from stage name to a pop-over.

#### Where can one find the API request and response demo for execution of Pipeline with Input Set ?

One can use the below curl example to do so :

```sh
curl -i -X POST \
  'https://app.harness.io/pipeline/api/pipeline/execute/{identifier}/inputSetList?accountIdentifier=string&orgIdentifier=string&projectIdentifier=string&moduleType=string&branch=string&repoIdentifier=string&getDefaultFromOtherRepo=true&useFQNIfError=false&notesForPipelineExecution=' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY_HERE' \
  -d '{
    "inputSetReferences": [
      "string"
    ],
    "withMergedPipelineYaml": true,
    "stageIdentifiers": [
      "string"
    ],
    "lastYamlToMerge": "string"
  }'
```

Please read more on this in the following documentation on [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList)

#### How would I deploy to a pipeline via api call but not have to specify all stages ?

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

Please read more on this in the following documentation on [Run specific stage on pipeline](https://developer.harness.io/docs/platform/pipelines/run-specific-stage-in-pipeline/)

#### Is there a platform page where we can view the deployed image tags for each environment associated with a service ?

One can click on a service and  see all the environments and the artifacts that have been deployed. Higher level views can be accomplished through dashboard like DORA metrics. Please read  more insights on this in the documentation on [Monitor deployments and services in CD dashboards](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/)

#### Are there any plans to extend support for additional step types, such as Policy (OPA), Approvals, etc., within container-based step groups?

Yes, this feature is under build and soon will be available to customers.

#### Do we have any Harness disaster recovery documentation for our internal process ?

Yes, Harness ensures disaster recovery with SaaS infrastructure spanning us-west1 and us-west2, featuring two Kubernetes clusters for seamless failover in case of GCP outage, connected to managed and external data services.
Please read more on the following in documentation on [Harness SaaS Architechture](https://developer.harness.io/docs/harness-cloud-operations/harness_saas_architecture/)

#### What does Harness suggest to backup and restore Self-Managed Enterprise Edition Helm installations ? 

Harness recommends using Velero to back up and restore Helm-based installations of Harness Self-Managed Enterprise Edition.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-restore-helm/)

#### How can we do secret migration using Go-Code file ?

One can always use the secrets.go mentioned in the [Github Public Repo](https://github.com/harness/migrator/blob/master/secrets.go)

```sh
package main

import (
    log "github.com/sirupsen/logrus"
    "github.com/urfave/cli/v2"
)

func migrateSecrets(*cli.Context) (err error) {
    promptConfirm := PromptSecretDetails()
    err = MigrateEntities(promptConfirm, []string{migrationReq.SecretScope}, "secrets", Secret)
    if err != nil {
        log.Fatal("Failed to migrate secrets")
    }
    return
    }
```

Please read more on Migrating secrets in the following [Documentation](https://github.com/harness/migrator/blob/master/secrets.go)

#### When working with SAM Templates, how can one specify the branch instead of the default master when providing a commit ID as a tag during the download manifests step, as it currently attempts to pull from the non-existent master branch ?

In the Download Manifests step, you can specify the branch name by using the expression `<+pipeline.stages.STAGE_NAME.spec.serviceConfig.serviceDefinition.spec.manifests.MANIFEST_IDENTIFIER.spec.store.spec.branch>`. Replace `STAGE_NAME` with the name of your stage and `MANIFEST_IDENTIFIER` with the identifier of your manifest. You can then use this expression in the Branch/Commit Id field to specify the branch you want to pull from.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-sam-deployments)

#### Can one manage Flux applications with Harness GitOps ?

Yes  one can manage Flux applications with Harness GitOps. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/use-flux/)

#### Can we apply any Kubernetes Manifest without a Harness Kubernetes Service ?

Yes, One can apply any Kubernetes Manifest without a Harness Kubernetes Service . Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/#apply-manifests-from-a-remote-source). Also consider watching this video based on use case [here](https://www.loom.com/share/492afdbb9cb8484980b6d1617830a399?sid=8fc34aec-009c-491a-85f5-ffd5e062e4d0)

#### Can one define an optional tfvar files in terraform support ?

Yes, with minimal delegate version requested `816xx` one can do so. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/optional-tf-var-files)

#### Can one delete the default Org in with admin access ?

No, This was never supported, it is as per design. One cannot delete the already present default org.

#### Can we use json functor in http step with functions like length, concat ?

Yes, you can use JSON functors with functions like length and concat in an HTTP step. Here is an example of using the concat function in an HTTP step:

Value: `<+json.concat("Hello ", "World!")>`
And here is an example of using the length function in an HTTP step:

Value: `<+json.length(<+pipeline.variables.array>)>`
In both cases, the JSON functor is used to manipulate the input values and return a new value that can be used in the HTTP step.

#### How does Harness handle Helm chart dependencies in a Command Template?

Harness automatically resolves and manages Helm chart dependencies when executing Helm commands based on your Helm Command Template configuration.

#### How are Input Sets used during deployments?

During deployments, variables and secrets defined in Input Sets are injected into your application code or environment configurations.

#### Can I use variables in a Helm Command Template?

Yes, Helm Command Templates support the use of variables, allowing you to customize Helm commands based on dynamic values during deployment.

#### What types of data can be stored in Input Sets?

Input Sets can store Variables: String values used in deployments.

#### How is a Helm Command Template different from a Helm Chart?

While a Helm Chart is a package of pre-configured Kubernetes resources, a Helm Command Template in Harness is designed specifically for executing Helm commands within a deployment.

#### What are Harness Overlays?

Harness Overlays are specialized Input Sets that enable you to customize deployments for specific environments or stages. They allow you to override or augment existing Input Set configurations without modifying the original set.

#### What are the benefits of using Conditional Executions?

Increased automation: Automate manual decisions and dynamically adjust your pipeline based on various conditions.

Improved efficiency: Skip unnecessary steps to save time and resources.

Enhanced reliability: Ensure only relevant steps are executed, reducing potential errors and inconsistencies.

Greater flexibility: Adapt your pipeline to specific scenarios and requirements.

#### How do Overlays work?

Overlays take precedence over the base Input Set when applied. Values defined in the Overlay will override or augment the corresponding values in the base set.

#### Can I combine multiple conditions in Conditional Executions?

Yes, you can combine multiple conditions using logical operators (AND, OR) to create more complex execution logic.

#### How can I achieve version control for Templates?

Harness provides built-in version control for Templates, enabling you to:

* Track changes and revert to previous versions.

* Compare different versions and identify changes.

* Create branches and collaborate on Template development.

#### Is there a wildcard on execution filter/search that I can use for artifact?

While doing the search you currently can't use the regex as we don't support it. 

#### Getting cannot list files for prefix error for execution logs downloading API

If you are getting the error while trying to use the API to download the logs for an execution , you have to get the FF PIE_SIMPLIFY_LOG_BASE_KEY enabled by reaching out to Harness Support. And you will be able to only download logs using the API post feature flag enabled executions. It won't work for older executions. Hence you will need to use the Harness Ui to download the logs for older executions. 

#### How to fetch API status for adding any automation based on API result. 

For Ex : Delegate tken creation API :

```
curl -i -X POST 'https://app.harness.io/ng/api/delegate-token-ng?accountIdentifier=xxxxxxxxxxxxxxxxxxx&orgIdentifier=string&projectIdentifier=string&tokenName=tokendelnew&revokeAfter=0' 
-H 'x-api-key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

We get the output as : 
```
{
"metaData": { },
"resource": {
"uuid": null,
"accountId": "jxxxxxxxxxxxxxhg",
"name": "tokendelnew",
"createdBy": null,
"createdByNgUser": {
"type": "SERVICE_ACCOUNT",
"name": "terraformrpoviderusheer",
"email": "terrio",
"username": "terraformrpoviderusheer",
"accountId": "jxxxxxxxxxxxxxxxx_hg",
"jwtclaims": {}
},
"createdAt": 17xxxxxxxxxxx,
"status": "ACTIVE",
"value": "OTxxxxxxxxxxxxxxxxxxxxxxxg=",
"ownerIdentifier": null,
"revokeAfter": 0
},
"responseMessages": [ ]
}
```

We can use use the status from the above output , in case of failure it will be "ERROR", we can also use the http output codes such as 200 for success and 400 for failure.

#### Is the user can able to to share input set between project in one organization?
No, as per the current design user can't share the input set with other projects.

#### How can user change the default branch for a pipeline?
Harness loads the pipeline from the default branch of the repository which is set in Git.

#### Is the NextGen Delegate can be installed on a EC2 instance without docker?
As per the current design, NextGen Delegate cannot be installed on an EC2 instance without Docker. The NextGen Delegate is a Docker container that runs on the host machine.

#### Can user change the pipeline name through the git?
Name is metadata and will be changed if the user changes the Pipeline name from the harness itself. So, if a user wants to see the updated name in the Pipeline and deployments listing, the user needs to update via Harness.

#### Is it possible to copy orgs, projects, pipelines from one account to another?
As per the current design, it's not possible to copy orgs and projects. But you can copy the pipeline from one account to another manually by copying the yaml file.

#### How to get \<+artifacts.primary.tag> tag in custom stage?
As per the current design there's no service(Artifact config) in custom stage, without this expression will get null in return. So in the custom stage these expression will not work. But you can use the output variable to pass the details from CD stage to the Custom stage as suggested in this [doc](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)

#### What is Ad hoc provisioning in AWS CDK?
Ad hoc provisioning in AWS CDK refers to the temporary and on-demand provisioning of resources for specific tasks or purposes. It allows users to create resources as needed, serving immediate requirements.

#### Can you provide an example of dynamic provisioning using AWS CDK TypeScript for an ECS deployment?
In the Harness Infrastructure Definition, you map outputs to their corresponding settings using expressions in the format \<+provisioner.STACK_NAME.OUTPUT_NAME>. For example, \<+provisioner.EcsCdkStack.RegionOutput> maps the required AWS region output for an ECS deployment.

#### Is it necessary to deploy artifacts via Harness services when using AWS CDK provisioning?
No, deploying artifacts via Harness services is not required for AWS CDK provisioning in a stage. You can set up an AWS CDK provisioner and use it in a stage to provision infrastructure without deploying any artifacts.

#### How do resolve terragrunt plan returning the error "fork/exec /usr/bin/terraform: argument list too long"

the "argument list too long" error is typically related to how you are passing variables and configurations to Terraform and Terragrunt. By using configuration files, and reducing the number of arguments you can resolve this issue. 
 
The same can be referred [here] (https://github.com/gruntwork-io/terragrunt/issues/2132)

#### How do we add comment with Jira step.

To add comment you need to use "Comment" as a key and "\\" to add line breaks

#### Can we use FQN for inputs in Dashboards

Yes we can use, example : $\{runtime_inputs_info.fqn}

#### How can we upload some mandatory test evidence file before allowing some deployment and fetch them later in pipeline

You can use [API] (https://apidocs.harness.io/tag/File-Store#operation/create) to first create the file and then fetch them later in execution.

#### We're working on a Harness Pipeline (To Create a JIRA Issue) and want to trigger it via a python script (on AWS Lambda). While triggering the pipeline We also need to send JIRA Issue Description data into it.  

You can use API to execute the pipeline [api](https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetList)

In the created pipeline you can add a Jira update step with the required details to update the issue [Doc](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages/)

#### I need something that value I can change in the middle of pipline (automatically using bash script for example).
So define variable with default value and then in the middle of the pipeline change it's value

You can assign a stage variable value via shell script in Harness pipeline by using the Script Output Variables option in the Shell Script step.
First, declare the variable in your script and export it. For example, if you want to set the value of a stage variable named myvar to 123, you can add the following line to your script:

`export myvar=123`

Then, in the Shell Script step, go to Script Output Variables and add a new output variable. Set the Name to the name of the stage variable (myvar in this example) and set the Value to the name of the exported variable in your script (myvar in this example).
Now, the value of the stage variable myvar will be set to 123 after the Shell Script step is executed. You can reference this value in subsequent steps using the Harness expression 

`<+execution.stages.[stage_id].output.outputVariables.myvar>`

#### How can we calculate the instance of a service where number of pods change?

We can calculate the service licenses and instances in following methods for CG and NG both.

- List services deployed in the last 30 days. Service is considered in calculation even if it was part of any failed deployments
- For every found service we find the 95th Percentile of the number of its service instances across a period of 30 days and it represents active service instances
- Based on service instances we calculate the number of consumed licenses
- 1 service license is equal to 20 active service instances

Please find an example [here](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#example)

#### Does dashboards loads based on the volume of the data

For the first time dashboards might take time in loading the data, once the data is loaded we cache all queries from there on.

#### we have a config file which is required for a CLI tool ran using a custom shell script. Is it possible to somehow store this file within harness rather than directly on the delegate and reference it in the custom shell script execution?

You can use API [API]https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders to create or fetch files from Harness file store in the shell script.

#### Can I execute specific pipelines simultaneously and queue the rest using these controls?

Yes, by using Pipeline Chaining, you can specify the order of execution for your pipelines. If you want two pipelines to execute simultaneously, you can set up the chaining accordingly. The system's automatic execution limits and plan-based limits will handle queuing for you, ensuring that additional pipeline executions wait until the limits allow them to proceed.

#### In case of CD pipeline, the use case is like, we need to deploy multiple services via single pipeline, for which we can use multiservice select, and we can refer the artifact of previous stage to the next stage. However, is there any possible way by which I can refer to the single service of previous stage and its artifact.Use case if for approval stage where we need to run the stage once as only one approval should be required to deploy multiple services.

For using a single service of the previous stage and its artifact you can use the expressions from the previous stage service output variables, and you can use the expression in your next service artifact.

#### I want to set up a chained pipeline in orgA/ProjectA with a pipeline in orgB/ProjectB. I want to restrict triggering the pipeline in orgB/ProjectB to only be possible through the pipeline in orgA/ProjectA. How can I implement this?

We would suggest using RBAC to only allow a certain user with access to those pipelines with execute permission, because we need execute permissions for the parent and child pipelines to ensure successful execution.

#### While creating an MSK connector role, we encountered the error "User: arn:aws:sts::44ddsnfjdnfs-deploy-cicd-role/AWSCloudFormation is not authorized to perform: iam:CreateRole..." with a Status Code 403. How can we resolve this issue?

The error indicates a permission issue related to IAM (Identity and Access Management) policies. Follow these steps to resolve the issue:

1. IAM Policy Review
2.IAM Permissions Boundary
3.Service Control Policies (SCP)
4.Policy Trust Relationships

#### How do we know if a deployment is failing due to Service Control Policy implemented in our AWS account.

If there is any restriction from SCP you will get error with an explicit deny in a service control policy.

 User: arn:aws:iam::7799:user/JohnDoe is not authorized to perform: codecommit:ListRepositories because no service control policy allows the codecommit:ListRespositories action

#### Is there a way we can use Harness manager to encryt Terraform Plan instead of using delegate.

We have a FF CDS_TERRAFORM_TERRAGRUNT_PLAN_ENCRYPTION_ON_MANAGER_NG we would suggest enabling it, with this FF we will use Harness manager to encryt plan instead of using delegate. Please note that he FF does not work for custom or other secret managers.

#### The current condition is \<+stage.variables.Notification_To> != " ". Can it be changed to \<+stage.variables.Notification_To> != ""?

Yes, you can change the condition to \<+stage.variables.Notification_To> != "". However, it's important to note that when the condition is specified as an empty string (""):

If the variable \<+stage.variables.Notification_To> is not an empty string, the condition evaluates to true, and the associated stage/step will be executed.

If the variable \<+stage.variables.Notification_To> is an empty string, the condition will be false, and the associated stage/step may not be executed.

#### Is there a way to use one yaml file stored in git repo and use it in two different projects?

We cannot as the pipeline YAML has details like project identifier, Org Identifier which is unique.But you can create a pipeline-level template at the account level and use it in all projects.

#### My WinRM pipeline stage script completes on the server but not in Harness. What could be the issue?

If your WinRM script is not completing in Harness, it may be due to the script not returning an exit code. Ensure that your script includes a proper exit statement (e.g., exit 0 for success or exit 1 for failure) to indicate the end of script execution.

#### I notice that log lines from my file are not appearing during WinRM script execution in Harness. Why is this happening?

The absence of log lines may indicate that your script never returned an exit code. Make sure your WinRM script includes proper logging statements and returns an exit code to provide visibility into the script's execution status.

#### I have a terraform code which I will need to use it deploy resources for Fastly service. And, I would like to know should I create a pipeline in CI or CD module and what's the reasoning behind it?

The decision on whether to create your pipeline in the Continuous Deployment (CD) module or Continuous Integration (CI) module depends on your specific use case and deployment strategy.

If your goal is to automate the deployment of infrastructure whenever there are changes in your code, and you are using Terraform for provisioning, it is advisable to create a pipeline in the CD module. This ensures that your application's infrastructure stays current with any code modifications, providing seamless and automated deployment.

Alternatively, if your use of Terraform is focused on provisioning infrastructure for your CI/CD pipeline itself, it is recommended to establish a pipeline in the CI module. This allows you to automate the provisioning of your pipeline infrastructure, ensuring its availability and keeping it up-to-date.

In broad terms, the CI module is typically dedicated to building and testing code, while the CD module is designed for deploying code to production. However, the specific use case and deployment strategy will guide your decision on where to create your pipeline.

It's worth noting that you also have the option to incorporate both types of processes within a single pipeline, depending on your requirements and preferences.

#### We'd like a step in a Pipeline where it checks the Docker tag name of the artifact and if it doesn't contain `master` or `main`, it fails the pipeline.

You can use conditional execution and use expression \<+artifact.tag> to check if it equals the required value and run the pipeline

#### We would like to run terraform step in a pipeline with specific version of terraform and another pipelines terraform step with different version of terraform.

To achieve this use case you will need to use two different delegates with the required Terraform version installed.

#### Are policies supported in a GitOps application?

OPA policies are not supported in a GitOps application in Harness. Currently, it is supported for pipelines, templates and flags.

#### How can I check if the CloudFormation Stack is created successfully?

After running the pipeline, you can check your AWS Management console for CloudFormation to verify the creation of the new CloudFormation Stack.

#### How do I create a Google Cloud Storage bucket in the Google Cloud console?

You can create a Google Cloud Storage bucket by logging into the Google Cloud console and following the steps outlined in the Create new Bucket documentation: https://cloud.google.com/storage/docs/creating-buckets

#### Which storage options does Harness support for Google Cloud Functions 1st gen?

For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.

#### What are the limitations when using Google Cloud Functions 2nd gen with Harness?

Harness does not currently support Google Cloud Source Repository for Google Cloud Functions 2nd gen. Only Google Cloud Storage is supported for this version.

#### Can access to specific environments be restricted for users or user groups?

Yes, access to specific environments can be restricted to users or user groups. By creating resource groups, and roles, and assigning permissions, users or groups can be limited to deploying to specific environments only.

#### What role do environment variables play, and where can they be utilized?

Environment variables serve as global variables for a specific environment. These variables can be leveraged in pipelines, manifests, and other configurations associated with that environment.

#### How are service configurations overridden in specific environments?

Service configuration overrides allow you to override service properties when deploying into a particular environment. This flexibility enables you to customize settings based on the target environment.

#### Can an environment have multiple infrastructure definitions?

Yes, an environment can contain multiple infrastructure definitions, each representing a specific VM, Kubernetes cluster, or target infrastructure. When selecting an environment in a pipeline, you can choose from these definitions.

#### What is the role of Environment Service Overrides in override priority?

Environment Service Overrides take precedence at the highest level in the priority order. Understanding how these overrides impact service settings is crucial for effective configuration.

#### How long we retain data post migration for CG SaaS ?

Harness keeps data retention for CD NG - 6 months (execution data) and audit trail for 2 years.
Please read more on this on our Pricing webpage - [here](https://www.harness.io/pricing?module=cd#)
Also follow more on this in the following [Documentation](https://developer.harness.io/docs/platform/references/data-retention/)

#### What are the features supported for these resources in Git Experience ?

Key features of Git Experience are supported by these resources similar to pipeline and templates.
Please read more on this in the [Documentation](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/#key-features)

#### How can remote Services, Environment and Infrastructure be created and consumed in Git Experience ?

In Git Experience one can have following options: 
- Remote resources can be persisted in different repositories and branches
- Support for linking these entities in Remote and Inline pipelines
- Moving inline resources to Remote resources
- Support for in-built features such as Service Dashboard and  Post Production Rollback for remote Services

#### How does Harness provide enhanced control to users in the deployment sequence for applying autoscaling policies in ECS Blue-Green deplotment ?

 Harness exposes further control to users when in the deployment sequence they want to apply the autoscaling policies. This ensures that the existing containers are not impacted during release and after release it scales down based on traffic demand.
 Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#enable-auto-scaling-in-swap-step)

#### How does Harness conduct pre-deployment validations and manage ECS Blue and Green services by updating tags based on target groups before initiating the deployment?

Harness performs some validations before the deployment. Before the deployment, Harness identifies ECS Blue and Green services based on the target group and updates tags accordingly. It then starts the deployment. One may enable the Feature Flag - `CDS_ECS_BG_VALIDATION` to use the feature on account. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#ecs-blue-green-service-validation)

#### What can cause this error : There are no eligible delegates available in the account to execute the task. Non active delegates , `TERRAGRUNT_PLAN_TASK_NG_V2` Task type not supported by delegate(s) ?

Please check if the delegate versions are mismatched via init_scripts and are based on latest version or not.
Also one can go through [Delegate FAQs](https://developer.harness.io/docs/faqs/harness-delegate-faqs/) for more insights.

#### What is the proper method for constructing a Harness pipeline to execute a rolling restart of a service, analogous to the "kubectl rollout restart deployment `<deploymentName>` " command ?

Harness uses `patchManifest` stage type with `LAST_ROLLOUT = now()` in Spinnaker to achieve it today. Please read more on this in the Spinnaker [Documentation](https://spinnaker.io/docs/guides/user/kubernetes-v2/patch-manifest/)

#### How does the newly introduced support for Azure Logs as a Health Source in Harness contribute to service monitoring, particularly through the utilization of Cloud Metrics and Cloud Logs ? 

Harness has now launched support for Azure Logs Support as a Health Source for CV and has enabaled for all accounts . Users can use Cloud Metrics and Cloud Logs to monitor their deployed service. This was a feature parity item with Harness First Gen. One may also follow the same in our [Documenatation](https://developer.harness.io/docs/service-reliability-management/monitored-service/health-source/azurelogs/)

#### Are there any Feature Flags required for GitOps ?

No, all GitOps features should seamlessly function without the need to enable any Feature Flags.

#### Is there a way to control the label when running a multi-service deployment ?

This is the default behaviour. One can enable account level setting to display names. It's under pipeline section - enable Matrix by names.

#### Is there a limitation on the output size from steps in Harness, specifically when attempting to use a container to process and generate values in YAML configs, base64 encode them, and pass to the next step, where the output variable appears to be truncated?

Yes, there is a limit of 256 KB for the output size from steps in Harness. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#variable-value-size)

#### What do we mean by the term delegate expiration ?

Delegates expire after six months. Delegate expiration does not mean the delegate stops working. You may experience issues because the backend has moved too far ahead, and the delegate is no longer backward compatible.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#delegate-expiration-policy). Also find release notes based on delegates - [here](https://developer.harness.io/release-notes/delegate/)

#### Is it possible to get through an expression the uninstall flags from a helm service ?

One can try below example to find and uninstall the same :
```sh
commandFlagsJson='<+json.format(<+pipeline.stages.deploy.spec.manifests.helm_hello_world.commandFlags>)>'
commandType=$(echo $commandFlagsJson | jq '.[] | select(.commandType=="Uninstall") | .flag')

echo $commandType
```

#### Is it necessary to associate the IAM (Identity and Access Management) with the Service Account (SA) for Kubernetes ?

Yes, it is required. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-elastic-kubernetes-service-eks)

#### Is it now possible to deploy any kind of artifact bundle, including those with bundled artifacts and manifests, using Tanzu Application Service Deployment Swimlanes in Harness ?

Yes, the feature `Artifact Bundle Support with Tanzu Application Deployments` associated now enables the acceptance of any artifact bundle, including those with bundled artifacts and manifests, from any artifact source in zip format. This allows deployment with Tanzu Application Service Deployment Swimlanes. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart#add-the-manifest-and-artifact-as-an-artifact-bundle)

#### Does Harness provide Refresh Token Support with Tanzu App Service Deployment ?

Yes, Harness now takes in a refresh token into the Tanzu connector associated behind the FF - `CDS_CF_TOKEN_AUTH`. You can get the refresh token from the cf config.json on the delegate. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-tas-connector#refresh-token-support)

#### Is there an official method in Harness to expose the connector, allowing GitHub requests to be made without storing a machine token within Harness ?

No, this is not yet possible as the shell script is connector agnostic. If the shell script runs on a delegate with access or credentials it can inherit those creds for the shell command. Please feel free to file a canny request.

#### Is there a way to schedule a cron trigger to run at specific time every other week ?

Yes, In Schedule, use the settings to schedule the trigger. When you edit a Cron trigger later, you can type or paste in a Cron expression.The Cron expression will be evaluated against UTC time. Please read more on this in the [Dcumetation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/#schedule-the-trigger)

#### Is OPA only available in Enterprise tier ?

Yes. Please follow this on Pipeline Governance pricing page [here](https://www.harness.io/pricing?module=cd#)

#### How to filter pipeline execution for particular branch/repo etc

You can add pipeline tag and assign the value while runtime and can apply filter on those

#### My pipeline is queued due to resource constraint although no other pipeline in the project is using same infrastructure

Resource constraints has account level scoping by default, so if same infrastructure is used with combination of service/env/Infra ID in different Harness projects also it can still result into queuing of the infrastructure

#### Harness is not waiting for workload to reach steady state

Check if Skip Steady state check is enabled for that step as by default Harness perform steady state check

#### Can we send pipeline notification for events based on variable expression evaluation?

We do not currently have a way to add a condition based on variable expression evaluation in pipeline. We do have notify step which can be added in the pipeline and we can execute the step based on some condition.


#### Can we use variable expression in ecs task service definition and service config definition?

We can add variable expression in the yaml used for task service definition or service config definition. These will be expanded and correspodning evaluated values will be uesd.

#### Why terraform script file is initialising with null value in the path ?

Terraform script directory on delegate is based on some default values like org project however it also has the provisioner identifier in the path. If we are using provisioner identifier with an expression and for some reason the expression resolves to null, we will see a null in the path initialized as well.

#### How to make a  file we create in a step accessible in next step?

If there are multiple pods in a delegate then we can not gurantee the same pod will be selected if the delegate name is being used as a delegate selector. If one step is executed in one pod and the other one on a differnet pod the file will not be accessible. To avoid this scenario we can make use of pod affinfity by using delegate hostname as selector. Below documentation guides on how we can use the same as selector:

https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/


#### Why writing the secret to a file and displaying the content of the file in the same step still shows up as masked in log ?

Within the same step context we will still be aware about the secret so it is treated as same in the log. If you still want to see the content in the log you can output the same file in a separate shell step. 

#### Why terraform provider does not allow to change pipeline name in the input set created using terraform provider ?

The input set is associated with specific pipelines. So once it is created it can not be associated with other pipelines. That is why when you are changing the pipeline identifier it is giving you the corresponding error. I can see the same error at my end also if I try to change the pipeline identifier.

The other attributes of input set you can change in the yaml like what are the variables and their value but not the pipeline tagged.


#### How to read files under project's helm folder during project deployment?

We do not have a way to read the values file directly and access any variables from the same. It can only be read as part of the service deployment.

If you need to access the file values you need to pull the file from your repo in a shell script step and then publish the corresponding value as output variable. 


#### Does FirstGen support authentication using the GitHub app?

Github_app authentication is only supported for next gen. First gen does not have support for this authentication.

#### What is the difference between git provider and github provider in first gen?

Git provider is platform agnostic and can be used for all the source repos. Github provider is specifically designed for git and to laverage the functionality provided by OPTIMIZED_GOT_FETCH_FILES feature.



#### Do we have a way to optionally exclude some values file fetch in the manifest based on condition ?

Currently we do not have a way to exclude or make the values file list optional. If you run a helm deployment by specifying a values.yaml and if the yaml does not exist it will fail the deployment.

#### What does the below error in the lambda function deployment signifies ?

`aws/lambda/testLambda-dev already exists in stack arn:aws:cloudformation:us-east-2:xxxxxxxx...`


The error comes in scenario where there was a previous failed deployment but the logs still exist in the cloudwatch logs. We need to remove the log and try the deployment again.


#### Which certificate harness uses to validate connectivity to terraform Cloud end point while using terraform cloud provider ?

The terraform cloud connector will use the delegate to test the connectivity and for any task run by delegate itslef it will be utilising the jvm truststore for ssl validation of the connection. So if the terraform cloud endpoint is using a self-signed cert we need to update the delegate truststore with the cert detail for the same.

#### How to create a harness file using api with the content from a file?

We can pass the file as well in the api to create a harness file and not only the content. The below sample demonstrate how we can pass the file name in the api call.

```
curl -i -X POST 'https://app.harness.io/gateway/ng/api/file-store?routingId=ux26DQG4Rg6K7J8jWagkjg&accountIdentifier=ux26DQG4Rg6K7J8jWagkjg&orgIdentifier=default&projectIdentifier=cseajhang' \
 -H 'authority: app.harness.io' \
 -H 'accept: */*' \
 -H 'accept-language: en-GB,en;q=0.5' \
 -H 'x-api-key: xxx.xxx.xxx.xxx' \
 -F name="myfileapi" \
 -F description="" \
 -F identifier="myfileapi" \
 -F fileUsage="CONFIG" \
 -F content=@"/Users/amitjha/deletethisfile.txt" \
 -F tags="[]" \
 -F type="FILE" \
 -F parentIdentifier="Root" \
 -F mimeType="txt/plain"

 ```

#### How can we pass variable to stage templates from pipeline ?

We can create stage variables in the stage template and make it as runtimeInputs. In the pipeline where we are using this template these stage variables will now be reflected under variable options. We can either let them be runtime input or pass an expression as per our requirement. This way we do not have to change the template and let them be generic and only make corresponding changes in the pipeline where we are using them.

#### Why the pipeline gets failed with message `deployment exceeded it's progress deadline`?

When we deploy any workload in ouir kubernetes deployment after the deployment is done we run the wait for steady step during which we check for the status of the deployment done in kubernetes with help of kubectl command. If the command is not returning anything and it exceeds the task run time threshold on kubernetes we see this error message. Also as we were unable to confirm the status of the deployment due to above failure we mark the deployment as failure as well.

#### Can we delete the default organisation?

We do not have a way to delete the default organisation either through UI or api.

#### Does Harness run bash scripts with "set -e" as default ?

We do not set any additional command option on top of the script that was provided in the script task.

#### How to check for the script file which harness creates for running the script task?

Harness by default creates a script file with the script provided in shell script configuration inside the /tmp folder.

#### Does the temp script file created by Harness gets automatically removed?

At the end of execution Harness cleans up the temporary script file. If we need to view the content of the file we can add a sleep command in our script and while it is executing the task we can check in /tmp location on the delegate where the script is being executed for the content of the file.

#### Does aws secret manager supports IRSA?

We support RSA for secret manager authentication. We can use Assume role using STS option and configure our delegate for IRSA.


#### Is there a way to restrict user to have only create permission for all the environment but execute on only few ?

For environment we do have access role , in case you do not want to give the user the ability to deploy to the environment and just create/edit it you can remove the access role for the same. So one uer can have a role binding with create access for all the environment types and another role binding with access permission to only few environment types to which we want to allow this user to deploy.

#### Can we create our own custom environment types?

We do not have a way to create environment types, by default there are only two environment types, production and pre-production.


#### Can we have dynamic tags for the pipeline execution?

We can use variable expression to have dynamic tags for the pipeline. For example we can create a pipeline variable and set the variable as runtime. We can use this variable in the tag configuration for the pipeline. Each time the pipeline executes the tag for that execution will be set as per the value of the expression passed.


#### Can I run multiple terraform pipeline concurrently?

Terraform init command does not work if we run init for the same work directory in parallel. Hence such concurrent execution will fail with the error 'Failed to Install Provider'

#### Does http step for mtls end point also ignore certificate check ?

If we do not provide any certificate for the end point the TLS ignore will basically force the client to not validate the server however the same is not true for the server which is expecting certificate as well for client validation. Hence for mtls end point this will fail.

#### Is there a way to disable the banner for license expiry for selected user groups ?

We do not have a way to disable the banner for license expiry by any configuration.

#### Why we are not getting values for new helm manifest variables?

The feature to get the newer variables for helm manifest (currently behind CDS_HELM_FETCH_CHART_METADATA_NG)requires delegate versions to be 801xx or newer. If there is any delegate in the account which is older we do not enable the feature and the variables will not be populated even if the task runs on a newer version of delegate.


#### Is there a way to force helm deployments to use helm upgrade command instead of helm install for first helm deployment?

Harness by default while performing the helm deployment look for any previous installation, if it does not find one it consider the current deployment as first and then runs the helm install command. From the next run it will run the helm upgrade command, this behaviour is not configurable.
#### On Harness approval steps, when using expressions for the description, how can we add line breaks ?

One can try using the expression `\\` or `\u000a` to make an expression work.

#### Is it required to have the delegate installed on a ECS cluster ?

Delegate can be installed anywhere as long as it has access to the target Ecs cluster. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#install-and-register-the-harness-delegate)

#### How can one add custom certs using with custom truststore for delegate version later than `23.10.81202` ?

To add custom certificates for a Docker, Kubernetes, or Helm delegate with an immutable image type version later than 23.10.81202, you can follow these steps:

- Prepare the custom cert file(s). Certificates must be in PEM format
- Mount the file(s) to the /opt/harness-delegate/ca-bundle/ directory inside the delegate container
- Start the delegate with the root user

Please read more on this in the follwing [Documenatation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/#install-with-custom-certificates)

#### Do we not show a Service summary for services created at the account level and org level ?

Yes, the support for Service summary is only present for a project level service currently by design.

#### Is it part of the design that in the webhook trigger, an API URL for status is provided without the need for authorization ?

Yes, this is kept by design. For more on this please go through the provided [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-deployments-using-custom-triggers/#enforcing-authorization-for-custom-triggers) 

#### What could be the reason for getting following error for Jenkins : `Invalid request: Failed to collect environment variables from Jenkins` ?

It is possible that the EnvInject plugin is not properly configured or enabled in Jenkins. You can check if the plugin is installed and enabled by going to `Jenkins > Manage Jenkins > Manage Plugins` and searching for `EnvInject`. If it is not installed, you can install it from the `Available` tab. If it is installed but not enabled, you can enable it from the Installed tab. Additionally, make sure that the job has the necessary permissions to access the environment variables.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/jenkins)

#### For an HTTP step communicating with an mTLS endpoint, if there is no certificate configuration, does it ignore SSL validation like it does for a single TLS handshake ?

In the context of mTLS, it is expected that the client (delegate) always needs to present a certificate; otherwise, the server will not accept the request. In contrast, with TLS, setting SSL ignore will instruct the client not to validate the server. It's important to note that this behavior aligns with the expected security practices for mutual TLS communication.

#### What is the purpose of merging values YAML files?
Merging values YAML files allows for:

* Overriding default values with environment-specific settings.
* Combining configuration from multiple sources (e.g., Service Definition and Service Overrides).
* Adapting deployments to different environments without modifying the base configuration.

#### What happens if a key exists in both files (Service Overrides and Service Definition) but with different values?

The value from the Service Overrides file takes priority, overriding the value from the Service Definition.

#### Are rolling deployments suitable for all applications?

Rolling deployments are not suitable for all applications, especially those that:

* Cannot tolerate any downtime at all.
* Require complex configurations or dependencies that are difficult to update in a rolling fashion.
* Have highly stateful data that cannot be easily migrated between nodes.

#### Are there any limitations with Overrides V2?

Runtime inputs are not supported for Infrastructure Specific and Service & Infrastructure Specific variables.

#### What types of settings can be overridden?

* Manifests
* Config Files
* Variables
* Application Settings and Connection Strings (Global Environment only)

#### Can I combine different strategies in my pipeline? 
Yes, you can combine strategies, like using a canary deployment within a blue-green approach for further gradual rollout within the separate environment.

#### Why is Harness migrating to Overrides V2?

* To provide more flexibility and control over overrides.
* To enable infrastructure variable management and service-specific infrastructure overrides.
* To streamline override management using YAML objects.
* To allow configuration at account and organizational levels.

#### How does the merging process work in Harness?

Harness merges values of YAML files at runtime based on the following rules:

* Key-value pairs from Service Overrides precede those in the Service Definition.
* Pairs with unique keys are combined into a single file.\
* Conflicting keys (same name, different values) result in the Service Overrides value being used.

#### Can I run deployments for multiple stages at once? 
Yes, you can run pipeline stages in parallel, deploying different services simultaneously.

#### What's the benefit of using step groups? 
Step groups simplify managing related steps, allowing you to apply common settings like skipping and failure strategies to all members.

#### Does Harness encrypt the image tag for the container during rollout deployment output?

No, we don't. Try checking SHA of the tag and find image ID from the output of the service step with the `<+artifact.tag>` expression.

#### Is there a way to pass the branchname in update git metadata api ?

No, we dont have branch name as a input to the git metadata api, we can update only the connector, file path and the repository.

#### How can I change the path of the YAML file for the current pipeline to a non-default branch in another repository in git metadata api ?

As per the API, our objective is to modify the Git metadata that we have stored. GitX does not store the branch as metadata.
To change the YAML file path for an existing pipeline to a non-default branch in a different repository, you can follow these steps:
- Copy the YAML file to the target repository's non-default branch.
- Import the YAML file from the Git repository.
By following these steps, you can effectively change the path of the YAML file for your pipeline to a non-default branch in another repository.

#### Can I change a template's Git connector but keep the same version, repo, and so on?

Go to the list of templates, select **More Options** (&vellip;), and then select **Edit Git Metadata**. From there, you can change the Git connector while maintaining the other settings.

#### Can the `[beta]` endpoint for "account connectors" on the Harness API return CCM connectors ?

No, the endpoint may not directly provide CCM connectors. Please ensure that the correct values are used for the "Harness-Account" header and "x-api-key" header.
example :

```sh
➜ curl -i -X GET \
  'https://app.harness.io/v1/connectors/_lab_ccm' \
  -H "Harness-Account: $HARNESS_ACCOUNT_ID" \
  -H "x-api-key: $HARNESS_PLATFORM_API_KEY"
```

Expected Response : 

```sh
{"message":"Invalid request: Connector type [CEK8sCluster] is not supported","code":null,"errors":[],"error_metadata":null}
```

Instead please try using a non [beta] endpoint : 
example :
```sh
➜ curl -i -X GET \
  "https://app.harness.io/ng/api/connectors/_lab_ccm?accountIdentifier=$HARNESS_ACCOUNT_ID" \
  -H "x-api-key: $HARNESS_PLATFORM_API_KEY"
```

#### Does Harness support SSH deployments using the GCP connector like AWS and Azure ?

No, this feature is yet to be supported. We suggest to use ssh key or user and password as datacenter as an alternative at the moment.

#### Is the design of Basic intended to incorporate that behavior, similar to what is done in first Gen, where Ecs revisions are not utilized in the same manner as Ecs ?

Yes, the design of Basic includes that behavior because we manage the versions through the task name and handle versioning specifically for rollback purposes in first Gen, distinguishing it from the way Ecs revisions are managed. One needs to use rolling if they want harness to not perform the naming convention changes. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/)

#### Can one configure how many versions of the tanzu apps required to be maintained for Blue-Green Deployments ?

Yes, Users can now configure how many versions of the tanzu apps that they want Harness to maintain for Blue Green Deployments with enabling Feature Flag: `CDS_PCF_SUPPORT_BG_WITH_2_APPS_NG`. Currently we maintain 3 (Active, Inactive, and Most recent Successful deployment). With this feature we now manage Active and Inactive more inline with the industry standard Blue Green Deployment. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart/#blue-green-deployment-support-with-a-configurable-amount-of-tanzu-applications-to-maintain)

#### Is it considered an error when using helm template `--show-only` `templates/secret.yaml my-chart` results in an empty manifest, even though the template exists, and how can one prevent or handle this error message ?

It will be feasible for them to consider adding a line at the top of their manifests to prevent rendering to be empty when using helm template `--show-only`. This approach would not only address the error but also provide the advantage of skipping these objects during deployment. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/ignore-a-manifest-file-during-deployment/#ignore-a-manifest)


#### Do we support expressions in tags for pipeline level ?

Yes, we support pipeline expression tags to feteh details. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/references/tags-reference/)

#### Is there a way to use the `<+stage>` output as json in our functors ?

Yes, you can use the JSON format function to format the output of a stage as JSON and then use it in your functors. 
Here's an example expression that formats the output of a stage named "myStage" as JSON:
`<+json.format(<+pipeline.stages.myStage.output>)>`
You can then use this expression in your functors to select specific values from the JSON output of the stage.

Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2)

#### Is there a hardcoded timeout in the Custom Secrets Manager template when receiving passwords from a remote source ?

Yes, currently, 20 sec is the timeout configured for the custom Secret Manager’s fetch secret task.

#### How do we pass the output list of first step to next step looping strategy "repeat", the output can be a list or array which needs to be parsed ?

The Output Variable of the shell script is a string, which you are trying to pass as a list of strings, to avoid this :
- First you need to convert your array list into a string and then pass it as an output variable.
- Then convert this string into a list of string again before passing it to the repeat strategy.

Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/repeat-strategy)

#### Can a trigger for a CD pipeline be configured to automatically pick up the tag value `<+trigger.payload.tag>` when the pipeline is executed via the trigger, and alternatively pick up `<+pipeline.variables.tag>` when the pipeline is executed manually ?

For the above usecase we should use Ternary operators , refer the [docs](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#ternary-operators) for more on this.
You can give a condition :
`<+condition?<value_if_true>:<value_if_false>>`

For the true condition `<+pipeline.triggerType>` should be WEHOOK_CUSTOM, please refer [docs](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#ternary-operators) and for the false condition you can put a runtime input `<+input>` or a pipeline variable

Finally the ternary operator condition should look like:
`<+<+pipeline.triggerType>=="MANUAL"?<+pipeline.variables.tag>:<+trigger.payload.tag>>`

Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/ternary-operator/)


#### Does the Azure connector support service principles ?

Yes. We support System Assigned Managed Identity and User Assigned Managed Identity in the Azure Global and Government environments.
The service principal maps to a managed identity.

#### How to carry forward the output variable when looping steps ?

If you are using looping strategies on steps or step groups in a pipeline, and need to carry forward the output variables to consequtive steps or with in the loop, you can use `<+strategy.iteration>` to denote the iteration count.

#### How many versions of Terraform does Harness support ?

Harness supports the following Terraform versions: `v1.3.5, v1.1.9, v1.0.0, v0.15.5, v0.15.0 and v0.14.0`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations#terraform-version-support)

#### Why Does the Expression `<+artifacts.primary.identifier>` Return "primary" Instead of the Actual Identifier?

To obtain the actual identifier instead, please open a support ticket to enable the feature flag `CDS_ARTIFACTS_PRIMARY_IDENTIFIER`.

#### How to Generate a Clickable Link in Harness Approval Message?

While we do not officially support it, a clickable link is accessible in the Input tab of the Harness Approval step.

#### How Can I Leverage the Uninstall Helm Flag Within a Custom Script?

While it's not officially supported, you can obtain all Helm flags used in the Service step. Here's an example of how to retrieve them: `<+pipeline.stages.deploy.spec.manifests.helm_hello_world.commandFlags>`

#### Why doesn't the pipeline roll back when the Container Step times out?

The Container Step is being deprecated, and support for it will no longer be provided. Instead, we recommend incorporating a step group that is container-based in your pipeline and proceeding to create a Run step. This step will function similarly to the container step, but the rollback will operate as expected.

#### We need to pull deployments events from harness to datadog/custom when any PROD deployment is successful.

You can use Webhook notifications to post the pipeline event to an endpoint and you can review and use the JSON Harness posts to your webhook endpoint

#### Does shell script step uses delegate selector from connector used

By default shell script doesn’t uses the connector selector and task can go to any delegate, if you need to use same delegate you have to specify the selector

####  Can we use command step for custom stage

No this is not supported as of now, as currently command step is only applicable in ssh/winrm type deployment

#### How would licensing work if a prospect prefers to use Harness CD solely as a script orchestrator for their existing pre-defined process without utilizing Harness Service or Environment for tracking ?

We don't charge separately for infrastructure provisioning swimlanes or custom script orchestration like 'cdk deploy.' Our current licensing model is straightforward, and there's no additional fee for this usage.

#### Can I use the same cluster for running the Harness Delegate and containerized step group(s), or is it required to use separate clusters ?

Certainly! one has the flexibility to use the same cluster for both the Harness Delegate and containerized step group(s). However, it's important to note that this is not a requirement. Harness is designed to accommodate various deployment scenarios, allowing you to optimize resource utilization based on your specific needs. Feel free to configure your setup according to your preferences and resource allocation strategy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups#important-notes)

#### What are the Google Cloud Functions supported by Harness ?

Harness supports deploying Google Functions 1st gen and 2nd gen. But for Google Cloud Functions 2nd gen, Harness does not support Google Cloud Source Repository at this time. Only Google Cloud Storage is supported. For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions/#supported-versions)

#### Is there a way to show instances over time in NextGen, similar to the current “Service instances over time” dashboard in First gen ?

Yes, the Instance view per service is visible in the Service Dashboard.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#services-dashboard)

#### Can the linking of a GitOps cluster to an environment behave similarly to updating existing entities, allowing for seamless updates rather than producing an error when a link already exists ?

Indeed, the linking of a GitOps cluster to an environment involves an 'insert' call, creating a new link. However, it's worth noting that there's also an 'update' call in place, enabling the system to update the link when necessary, akin to the behavior observed with secret/connector/pipeline entities.
Please follow more in our [API Documentation](https://apidocs.harness.io/tag/Clusters/#operation/AgentClusterService_Update)

#### Do instances deployed over 30 days ago show in the Active Service breakdown? How are Service Instances (SIs) counted, considering those active within the last 30 days but deployed earlier, and those removed before 30 days ?

Yes. We don't show instances deployed older than 30 days in Active Service breakdown. However, we would still count the SIs that were active in the last 30days even if they are deployed earlier. SIs which got removed before 30days will not be accounted in the SI calculation.

#### Does Harness support Azure Container Apps ?
No, due to low customer request it is not on our roadmap. Please feel free to create a request for the same.
Please read more on what we support in Harness in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations)

#### Does Harness provides drift detection for k8s non-gitops pipelines ?

No, this feature is still under development and not yet supported. We hope to deliver this soon !

#### What safeguard is implemented regarding step inputs or parameters in a system to be part of the expanded JSON ?

Following steps are measures one can consider : 
- If your step inputs or parameters size is greater than 4 KB, then it cannot be part of your expanded JSON. This is to safeguard your system.
- Harness uses the greater than sign `(>)` to terminate expressions. To avoid ambiguous results, make sure that your scripts do not include a greater than sign.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2/#limitations)

#### Is there any way the user can have custom webhook trigger with placeholders for services, artifacts, tag to provide dynamic values in curl to execute the pipeline like CG triggers ?

Yes, one can use custom webhook triggers with placeholders for services, artifacts, and tags to provide dynamic values in cURL to execute the pipeline. You can pass in this data when the pipeline execution is triggered using a custom cURL trigger. Please read more on custom triggers in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-deployments-using-custom-triggers/)

#### What recommendation can be made if a service's chart is currently on V3?

Yes, If the chart is v3 in service should be same.
Note! If your development team still uses Helm 2, you can reintroduce the binary on the delegate. Harness is not responsible for any vulnerabilities or risks that might result from reintroducing the Helm 2 binary. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#important-notes)

#### Does Harness entities rely on account name changes ?

No, Harness entities use immutable entity identifiers to refer to entities, and these identifiers are generated automatically based on the entity name. If an entity name is changed, the identifier remains the same. Therefore, Harness entities do not rely on account name changes.

#### How does Conditional Execution behave in a stage when considering steps that have their own Conditional Execution compared to those that don't within the same stage ?

The stage Conditional Execution applies to all steps that do not have their own Conditional Execution. A step's Conditional Execution overrides its stage's Conditional Execution.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/key-concepts#conditional-executions)

#### Do we have predefined rollback step while using shell script provisioning

No, Out for the box Rollback step is not available and you need to add your own scripts under Rollback section of the stage Environment

#### How can we trigger a pipeline at specific time

You can make use of CRON based trigger to execute a pipeline

####   I need to run my step in delegate host?

You can create a shell script and select option as execute on delegate under Execution Target

####  How to setup trigger for on new artifcat for jfrog?

You can create a docker connector(using jfrog details) and create a trigger on New artifact of type docker by selecting the jfrog connector created as first step.

#### How to get the certs path in windows os?

Local machine certificate can be found at HKEY_LOCAL_MACHINE root in the registry, and Current user certificate store is located under the HKEY_CURRENT_USER registry root.

#### How can I get the stage execution ID?

Currently, we do not have inbuilt variables to provide the stage execution ID.
Only pipeline execution ID can be fetched using the inbuilt variable - `<+pipeline.executionId>`

#### How to get stage execution ID using Shell script?

The following script can provide the stage execution ID -
```
url="<+stage.executionUrl>"
stage_value=$(echo "$url" | grep -oP 'stage=([^&]+)' | awk -F'=' '{print $2}')
echo "The last stage value is: $stage_value"
```
#### I want to limit the scope to just template viewers, so set the role bindings accordingly. But the problem is that there is a default role-binding for Organization Viewer which overrides my other settings and allows them to see all Org level resources.

The project_viewer and org_viewer are the default group to which the user will get added. This is by design but you can remove the roles assigned to these groups and only add the required user group to that user and it should work as expected.

#### What is the use of terraform-config-inspect binary in delegates?

This binary is used for rendering the terraform code in the CG version and is not used for NG-related deployments.

#### We want to tag a build and push it to GitHub, Can this be done using any inbuilt harness functionality or we have to use commands to achieve this?

Unfortunately, we don't have any built-in feature in Harness to tag a build and push it to SCM.
You will have to use the command line Git, IDEs, or other Git tools.

#### How does swapping work for AGS Blue Green deployment?

This is how ASG Blue Green deployment works during swapping routes. If you have a load balancer with 2 listeners, Listener A forwards to Target Group TG1 and Listener B forwards to Target Group TG2, then after swapping routes the result will be as follows:
Listener A forwards to Target Group TG2 and Listener B forwards to Target Group TG1.
This is how traffic is shifting from stage to prod. Listener A - always belongs to stage and Listener B - is to prod, but the TGs should swap.

#### What does feature flag CDS_TERRAFORM_TERRAGRUNT_PLAN_ENCRYPTION_ON_MANAGER_NG do?

When this feature flag is activated, If the harness inbuilt secret manager is used then the encryption will happen at the manager’s end for TF plans.

#### Is it possible to retry the entire stage for Timeout Errors in the failure strategy?
At present, We don't have the feature to retry an entire stage in a pipeline, we only allow retry steps for individual steps within a stage of a pipeline for Timeout Errors in failure strategy.

#### We are facing an issue with the wrong password getting used for secrets. we have a special character(&., |) in the password. How to resolve it?

You can reference secrets in scripts, but text secrets with line breaks or other special characters(recognized in the shell)might interfere with script execution.
To address this, you can encode the value as base64 and decode and write the secret to a file. For example, the following command decodes a secret from base64 -
writes it to a file:
`echo <+secrets.getValue("my_secret")> | base64 -d > /path/to/file.txt`

#### What happens if my delegate uses a CG token?

Since the CG token did not have any scope, The delegate will get registered at the account level in NG.

#### Why is AIDA providing the response even if it is disabled?

The AIDA bot has multiple flavors, The one you see is the AIDA support bot and this is enabled by default. Other AIDA bots need to be enabled in account settings. The AIDA support bot does not collect any data and just works on our Harness docs and knowledge base. We leverage the OpenAIs framework to form answers from inputs from docs based on the questions. No account data is collected for this.
Once you enable the AIDA in settings, you will see the AIDA suggestions for your pipeline failures and OPA policies. Terms and conditions are specific to the above modules.
The AIDA support bot is just to help you with simple queries related to Harness. let me know if you still want to get this disabled for your account.

#### How can I pass variables from one pipeline to other pipelines?

You can define a variable at the project/org/account level depending on the pipeline's scope and use that variable in all 3 pipelines.
If the values of the variable need to be updated by pipeline 1 before pipeline 2 can use it. You can use the API to update the variable value from pipeline 1 - https://apidocs.harness.io/tag/Variables#operation/updateVariable

#### Why can't my delegate create a release in the namespace?

Note that the delegate must have either cluster-admin permissions in the target cluster (allowing it to deploy to any namespace in the cluster) or admin permissions in the target namespace (distributed model https://developer.harness.io/docs/faqs/harness-delegate-faqs/#can-i-install-the-delegate-in-other-namespaces This model places a delegate in each namespace in the cluster. It limits each delegate to deploying into its own namespace.).

#### Why is Harness requesting the use of work email instead of personal email for account registration?

Harness has identified a surge in unauthorized usage of the free pipeline minutes offered on Harness Cloud. To address this concern and enhance security, we now require users to register their accounts using their official work email instead of personal email.

#### Pipeline tags do not get updated when YAML is updated via GIT?

If a user modifies the branch in the YAML, adds new tags, saves the changes, and then navigates to the List page, the Metadata may become out of sync. This can lead to discrepancies between the displayed tags and the actual configuration.

#### What steps can users take to mitigate the impact of tag synchronization issues?

Currently, we consider tags as metadata and DB is the source of truth for metadata. To make sure tags are updated always. Please
use UI to update the Tags.

#### How to access custom variables in scripts?

You can access the variables using the expression.
Also for your reference, you can click on the copy icon by the side of the variable to get its corresponding expression for access.

#### How do I add custom certificates to Harness Delegates?

You can use the instructions mentioned here to install custom certificates - https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/

#### Do we need the root user on Delegate for installing certs?

Importing certificates involves two steps: firstly, importing certs into the Delegate Java trust store, and secondly, importing the certificate into the underlying OS (RHEL). The first step does not require the root user, but the second one does due to restrictions imposed by Red Hat. Therefore, the overall answer is YES.
If you wish to run the delegate as a non-root user while including custom certs to bypass Red Hat restrictions, you can create your own delegate Docker image with the necessary certificates. The steps for doing this are documented here: https://github.com/harness/delegate-dockerfile?tab=readme-ov-file#build-image-with-custom-ca-certs

#### Do we need to add the SecurityContext for installing custom certs?

If you are already running the delegate as the root user, then this setting is not required. By default, if fsGroup is not set, Kubernetes will mount files with user=root and group=root. In this scenario, only the root user can read the file. Setting fsGroup to 1001 allows a non-root user to read the file. When starting a delegate without running as root and also setting fsGroup to 1001, the delegate can import certs into the Java trust store but is unable to import them into the underlying OS.

#### If the approval step is timed out, Is there any way to continue deployment?

You can use the failure strategy to move the pipeline forward if the approval step is timeout.
On the approval step's advance section, go to failure strategy and use the mark as success to make the step successful and the pipeline will move to the next step.

#### Why is the GitConfig block not available for remote pipeline policy evaluation?

Policies are evaluated first in case of pipelines being saved and for the first time, we create the pipeline inline and then perform git sync to sync the file with git repo. This may cause a false alert for the first save but should not have an issue in the next modifications.

#### Can you please help me with how to pass expressions required as runtime input to the static pipeline from the API?

If you are making use of runtime inputs you can check the below API call which allows you to pass a runtime input YAML for the pipeline:
* https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetYaml

There is another API that gives you a runtime input template YAML which you can use in the first API call:
* https://apidocs.harness.io/tag/Pipeline-Input-Set#operation/runtimeInputTemplate

#### Can I turn off the feature to Not hide/replace secrets with ***?

By design, we hide the secrets, and currently, we don't have a feature to unhide it.

#### We would like to know if it is possible to have 2 Harness projects using the same pipeline that is saved in the Git repo?

Unfortunately no, All the Harness pipelines are associated with a project ID, and only one project ID is allowed for the pipeline.

#### What does the exceeding quota log error in the harness delegate log mean?

We collect delegate logs in case we need to troubleshoot any issues in your pipelines so that you don't have to collect and send us logs. The error is harmless since it doesn't affect any functionality. You can choose to disable sending logs to us by adding an env variable in the delegate YAML documented at https://developer.harness.io/docs/platform/delegates/delegate-reference/delegate-environment-variables/

#### What are the best possible ways to create harness deployment secrets, connectors, pipelines, etc?

Creating resources is totally up to the customer's requirement, we provide all three ways to create harness resources -
* Via Terraform
* Via UI
* Via API

The docs for API and terraform resource provider and harness docs. Please go through it and choose the one which best suits your needs -
* [API docs](https://apidocs.harness.io/)
* [Terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs)
* [Harness docs](https://developer.harness.io/docs/continuous-delivery)

#### How do I delete the Harness entity even if my pipelines or other entities reference it?

You can force delete a Harness entity even if your pipelines or other entities reference it.
The Harness account admin can enable or disable the force delete option in the account's default settings.

#### What is the default release name used for k8s/helm dploymenet done via Harness pipeline?

The default release name is ```release-<+INFRA_KEY_SHORT_ID>```

#### When we deploy multiple service to same infra, will it get a unique identifier if we are using the default release name ```release-<+INFRA_KEY_SHORT_ID>```?

Yes, The infrastructure key is generated by combining the serviceIdentifier, environmentIdentifier, and a specific set of values unique to each infrastructure definition implementation. Hence we would get a unique release name even when we deploy multiple services to same infra using the default release name.

#### With the blue green deployment, how do we annotate the service if we have two services to be deployed but only the primary service should be used while switching the traffic?

You can add the annotation ```harness.io/primary-service: "true"``` for your primary service and dont add any annotation for the secondary service. With this config, Harness will create a third service and your secondary service will be untouched while switching the traffic

#### Why my Kubernetes rollout is replacing all pods from the old version without waiting for the new version to surge?

During a rollout, Harness does not change the behavior of how Kubernetes kills and starts pods. This depends on the strategy defined in the maxSurge and maxUnavailable attributes. Please, read Kubernetes documentation for more information.

#### How to Identify Pipelines Using the 'Always use the stable version' Option in Templates via REST Calls?

The pipeline YAML displays the template version, but it doesn't explicitly indicate if it's set to ```Always use the stable version```.

#### Why am I seeing this alert “No values.yaml found for manifest” in my deployment?

When deploying a Kubernetes application type, the system checks for a ```values.yaml``` file as part of the manifest, similar to how Helm evaluates its default values file. If you receive the alert ```no values.yaml found for manifest```, it simply means that your manifest doesn't include a ```values.yaml``` file. This file is not mandatory, and the alert is harmless.

#### How can I enable debug logging for the Terraform Plan Step?

To activate debug logging for the Terraform Plan step, include the environment variable ```TF_LOG=debug``` in the Advanced tab of your Terraform Plan step.

#### Does Harness support V0 and V1 Json schema ?

No, Harness only supports V0 schema yet. V1 schema is under development phase.

#### Does Harness support `distroless` image in the container run step ?

No, Harness does not support distroless images yet, we will introduce to adapt this soon.
Please read more on Container steps in the [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step/)

#### Is the variable `<+ambiance.metadata.executionMode>` intended to be exposed as an expression variable ?

The variable `<+ambiance.metadata.executionMode>` is not currently exposed, and we do not intend to expose it. However, to address the one's requirement, we have consider exposing a new expression that customers can use for their specific needs.

#### Does Harness support OpenTofu native steps in Continuous Module ?

No, Harness does not yet support OpenTofu native steps due to less usage to Terraform.
Please read more on Native Helm in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/)

#### Does old version to K8S Server (eg. v1.11.10) service deploy get supported in Harness ?

Yes, if the deployment versions supported in First Genwas available, the NextGen will be available as well.
For more information, go to [What's supported in Harness Platform](https://developer.harness.io/docs/platform/platform-whats-supported).

#### Does Harness actively working on the connector to make it compatible with Jira Cloud , or should one initiate the setup of a delegate for the Jira connector ?

Yes, one would need delegate for setting up jira connector, platform based jira connector is not planned to be supported

#### Does Harness provide Salesforce Deployment Template ?

Yes, Salesforce deployment template will help users deploy salesforce application and is available for users
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support)

#### How does Harness support Google Cloud Run Deployment Templates ?

Google Cloud Run Deployment Templates help in deployment template will help users deploy Google Cloud Run-based services
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#google-cloud-run-deployment-template)

#### Does Harness provide template library for Elastic Beanstalk services ?

Yes ,Elastic Beanstalk Deployment template is used for deployment template will help users deploy Elastic Beanstalk services.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#elastic-beanstalk---sample)

#### What is the timeout for JWT for FirstGen and NextGen ?

The expiration of JWT for FirstGen and NextGen is set to 24 hours and it can be set from Account Authentication Settings page.

#### Does Harness offer any complex deployment strategies for Lambda ?

No, we soon will have feature for Canary with traffic shifting but most other deployments are at hold.

#### when I push to create a new branch, push new code to a branch the trigger does not pick it up.

we have a Feature Flag CDS_NG_CONVERT_BRANCH_TO_PUSH_WEBHOOK_BITBUCKET_ON_PREM for triggers on-premises BitBucket to fire on the first push to a new branch.

#### Can we use wildcard for the github repo name on the trigger of a pipeline.

Providing a repo name creates a GitHub repo URL, So in this case we cannot use wildcard conditions.

#### How do I create a Dashboard in NG, which shows all the CD pipelines which are executing currently, in real-time ?

Youu can use the "status" field in dashboards to get the status of the deployments

#### How is infra key formed for deployments.

The Infrastructure key (the unique key used to restrict concurrent deployments) is now formed with the Harness account Id + org Id + project Id + service Id + environment Id + connector Id + infrastructure Id.

#### What if the infra key formed in case when account Id + org Id + project Id + service Id + environment Id are same and the deployments are getting queued because of it.

To make the deployment work you can :

1. Add a connector in the select host field and specify the host.
2. Change the secret identifie (create a new with same key but differen identifier)

#### How can we use the Github event type `X-GitHub-Event: pull_request_review

You need to create a custom trigger to use the Github event type `X-GitHub-Event: pull_request_review.

#### We have a single ECR artifact that is deployed multiple times with different run arguments as different services in parallel in a deployment. When the pipeline is run each service asks to select the ECR artifact tag. They should all be set to the same tag. Is there a way to select the ECR artifact tag once and use it for all 10 of the services?

For the first service we can keep the tag as runtime value, with it also declare a pipeline variable and keep it as runtime input.
 
For all other service, provide the pipeline variable expression as a value for tag.
 
So now when we run the pipeline, the first service will ask for the tag value and you can copy the same tag value to pipeline variable which is also a runtime input which will then be assigned to all other services.

#### How to create a dashboard to identify builds that are ending with an 'timeout' in a specific task.

You can create a custom dimension to achieve this case, for example : Custom Dimension : 

```contains"(${pipeline_execution_summary_ci.error_message}, "timeout")```

#### How can one handle credentials rotation policies for AWS connectors that require access key id and secret access key without the usage of delegate ?

While a functioning and stable delegate is imperative, it is advisable to prioritize its use. However, if there is a preference for connecting via platform, provided there is an external secrets manager in place and a streamlined process for automatic key updates within that system during rotations, integration through that avenue could be considered.
**Note** 
- Continuous Delivery cannot use the Platform based auth for all the connectors because the deployment jobs run on the delegate. Things like GitHub are feasible, but AWS, GCP, and Azure are not really possible because the credential exchange happens on the delegate

#### Can we use Continous Verification inside CD module without any dependency of SRM ?

Yes, one can set up a Monitored Service in the Service Reliability Management module or in the `Verify step` in a CD stage.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-new-relic/#review-cv-setup-options)

#### Does Harness support the utilization of the report path to showcase test results through the container step ?

Yes, Harness supports utilization of the report path for container steps and containrized group steps as well.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/#report-paths)

#### How can one deliver react-native based projects/mobile CD tests on Harness ?

Harness does not specifically support react-native based CD options but one can always be suggested to use ShellScript steps or Container-steps to do the same.
Please read more on [How to use Shellscript](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/) and [Container Steps](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step/)

#### Does using organizational environments come with the same limitations observed at the organizational and account levels, particularly regarding the unavailability of the service metric page and rollback features ?

The service metrics page is not available for organizational/environment-level services. However, all other features are on par with project-level/ org-level services and environments without limitations.
Please read more on CD Service monitoring in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/)

####  If the Delegate uses a KubeConfig if we are leveraging KubeCTL, where is the KubeConfig stored on the Delegate on using Terraform ?

One may use the command : `export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}`. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#kubernetes)

#### What is the recommended approach for implementing Terraform dynamic provisioning of infrastructure, specifically in relation to creating the Terraform file without the `kube_config` specification ?

The recommended approach for utilizing Terraform dynamic provisioning of infrastructure involves creating the Terraform file without including the `kube_config` specification. This practice ensures a more effective implementation of Terraform for dynamic infrastructure provisioning.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#kubernetes)

#### Why does the trigger execution details API sometimes return a 400 error after initiating a pipeline, and what's the recommended time gap for reliable execution between these API calls ?

In the existing process, we await the initiation of the actual pipeline execution. Upon selecting "run pipeline," pre-run checks are performed, followed by the creation of a plan for pipeline execution. The data is returned to trigger only after the execution plan is established. Harness is considering optimizing this process soon by transitioning the execution API flow to an asynchronous model to enhance efficiency.

#### Can we connect to a Databricks cluster ?

No, We do not have a native integration. If one is using terraform, they need to define the access block by following the [Terraform Docs](https://registry.terraform.io/providers/databricks/databricks/0.2.4/docs#authentication)
Wherever the delegate is hosted it needs network access to reach out and communicate to databricks.

#### What limitations in Go template rendering of manifests compared to Helm have been identified, and how has the decision been made to address this issue by running it as a Helm job ?

Helm template can render the manifests but Go template cannot. There are limitations in the go template. One may run it as a helm job.
**Note**
- In case of Helm template and application of network policy update with usage of Blue-Green or Canary deployments, please try to run the apply step and apply the network policies before deploying
  Please read more on Apply Step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/)

#### Does Harness allow a customer to set a quota or a limit on Service Instances ?

No, we don’t have a mechanism to let users cap their service instance below their subscribed amount and have the system warn them.

#### What is the cutover strategy for canaries when the labels are immutable and the deployment pre-exists ?

Please follow below mentioned steps as a work around:
- deploy same version using Canary with name: `<name>-temp`
- delete deployment `<name>`
- deploy same version using Canary with name: `<name>`
- delete deployment `<name>-temp`
Deletion can be done manually with `kubectl`, or as a one-off in a Harness pipeline.

#### In a Helm deployment with custom certificates, what is essential regarding DNS-compliant keys? ? How should delegates be restarted after modifying the secret for changes to take effect ?

Please follow below suggestions:

- Ensure that the secret containing custom certificates adheres strictly to DNS-compliant keys, avoiding underscores primarily. Following any modification to this secret, it is imperative to restart all delegates to seamlessly incorporate the changes.
- Helm Installation Command:
```sh
helm upgrade -i nikkelma-240126-del --namespace harness-delegate-ng --create-namespace \
  harness-delegate/harness-delegate-ng \
  --set delegateName=nikkelma-240126-del \
  --set accountId=_specify_account_Id_ \
  --set delegateToken=your_Delegatetoken_= \
  --set managerEndpoint=https://app.harness.io/gratis \
  --set delegateDockerImage=harness/delegate:version_mentioned \
  --set replicas=1 --set upgrader.enabled=true \
  --set-literal destinationCaPath=_mentioned_path_to_destination \
  --set delegateCustomCa.secretName=secret_bundle
```
- CA Bundle Secret Creation (Undesirable):
```sh
kubectl create secret generic -n harness-delegate-ng ca-bundle --from-file=custom_certs.pem=./local_cert_bundle.pem
```
- CA Bundle Secret Creation (Desirable, no underscore in first half of from-file flag):
```sh
kubectl create secret generic -n harness-delegate-ng ca-bundle --from-file=custom-certs.pem=./local_cert_bundle.pem
```
Please read more on Custom Certs in the following [Documentation](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/)

#### What is the purpose of Harness PR Pipelines in GitOps?

Harness PR Pipelines provide first-class support for modifying GitOps Applications, especially those generated by ApplicationSets with the Git Generator. These pipelines enable users to make targeted changes to microservices in specific target environments, such as development or staging.

#### How does a GitOps ApplicationSet differ from traditional GitOps Applications?

An ApplicationSet acts as an Application factory, defining an application template and syncing it to multiple target environments. It uses generators, such as the Git Generator, to dynamically generate parameters and achieve application automation across various target environments.

#### What functors are available for JSON?

 select Used to select specific attribute values based on a path within the JSON structure.
 object Selects objects using a JSON key.
 list Returns a list object and allows extracting items using list methods like get.
 format Formats the provided JSON object into a readable string format.

#### What functors are available for XML?

xml select Selects an XML file based on an XPath expression.

#### What is the Command Step?

The Command Step allows you to run commands on target hosts in SSH and WinRM deployments, as well as within deployment templates. You can use it for various tasks like:

Running scripts on all target hosts.
Downloading the deployment artifact.
Copying the artifact or configuration files.

#### How do download and copy commands differ?

Download: The delegate executes commands on the target hosts to directly download the artifact. Requires access to the target and network connectivity.

Copy: The delegate downloads the artifact and then copies it to the target hosts. Offers more flexibility but requires network connectivity to both the artifact server and target hosts.

#### How to loop the Command Step on all target hosts?

Use the "repeat" looping strategy with the expression stage.output.hosts after the Fetch Instances step for deployment templates.
This ensures the commands run on each host retrieved via the Fetch Instances step.

#### How to run the Command Step on the delegate?

Use the "Run on Delegate" option in the step settings.
This is useful for scripts that need to be run on the delegate instead of the target hosts.

#### What versions of Harness Delegate are compatible? 
The Container step requires Delegate version  1 0 780xx

#### Can I set resource limits for the container? 
Yes, you can define limits for memory and CPU in the "Set container resources" section.


#### How to trigger a pipeline on another pipeline completion?
The user can add the shell script step with a custom webhook curl at the end of the pipeline to trigger another pipeline.

#### Is it possible to change the pipeline ID after the creation?
No, As per the current design, once a pipeline is created, its ID (entity identifier) is immutable and cannot be changed.

#### How to create a single custom webhook trigger and create multiple input sets for each service and pass it the webhook curl command?
As per the current design service runtime inputs are not configurable in the trigger.

#### How can I see all currently running pipelines from all projects?
As per the current design, the user can only able to see the all-running pipeline for specific projects not for all projects.

#### Is the user can deploy the service to individual environments?
Yes, the user can configure the environment as runtime input.

#### Is the user can able to roll back the pipeline execution which is marked as success by failure strategy and there are no other previous successful executions?
No, As per the rollback requirement, there should be a previous successful execution.

#### How can I easily disable pipeline triggers?
The user can go to the trigger page and disable the trigger with just one click on a button.

#### How to recover the deleted secret in the harness?
If the secret is deleted you can't recover it.

#### Is there an option to revert the remote pipeline to inline?
You can copy the yaml and create another inline pipeline with the same yaml and delete the older one. There is no direct way to move it back to inline.

#### I have created a single pipeline for the test and dev branches. First time moving to Git I selected test branch but again I wanted to store this pipeline in the dev branch also but it's not allowing it. Is there any way?
You can copy the same pipeline in another branch while updating the pipeline select Start a pull request to merge in another branch and merge the changes in git.

#### The user would like to be able to deploy multiple artifacts in the same execution and not have to choose only one. Is that possible?
Yes, User can configure the multi-service deployment or else you can configure the parallel stages with the same service with different artifact. Doc: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/#deploy-multiple-services-to-one-environment


#### How to share files between CD stages?
1st Option: You can use API to create a file in the harness file store and then refer it to another stage. https://apidocs.harness.io/tag/File-Store#operation/listFilesAndFolders
2nd Option: You can just write a file on the delegate and use the same delegate.

#### Is the user can able to change the name of the pipeline while executing?
As per the current design, it's not possible to change the name of the pipeline while executing.


#### How to filter the pipelines or bundle the pipelines based on categories?
As per the current design, you can filter the pipeline by using the tags.

#### How to trigger the harness pipeline when we have a new file getting pushed to MS SharePoint?
As per the current design, there's no out of box solution for this but you can configure custom triggers and provide the webhook in MS Sharepoint.

#### I would like to be able to re-run a pipeline without the need to provide inputs again, A similar feature to the Rebuild option in Jenkins?
Yes, you can re-run the old execution with the same runtime input you provided earlier.

#### The user is getting this error while adding GitOps agent: "failed to create cluster in argo: createClusterInArgo: rpc error: code = InvalidArgument desc = cannot register cluster: in- cluster has been disabled". What needs to be enabled?
The user needs to make the required changes in the config map ( cluster.inClusterEnabled: 'true' ).

#### I want to know how can we use this docker image selenium-mod in our pipelines?
User can use the RUN step and run the required docker image. Doc: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/run-step/#container-registry-and-image


#### How to fetch files from the harness file store in the run step?
To fetch files from the Harness file store in a Run step, you can use the following example:

```
- step:
    type: Run
    name: Fetch Files from File Store
    identifier: fetch_files
    spec:
      shell: Sh
      command: |
        harness file-store download-file --file-name <file_name> --destination <destination_path>
```
Replace "filename" with the name of the file you want to fetch from the file store, and "destinationpath" with the path where you want to save the file on the target host.

#### Is there a way the user can pull from Bitbucket/Github inside the Harness Delegate and then push it to the target server?

Yes, you can use the git clone step and after that, you can push the files to the target server with the shell script/run step in the stage.

#### I want my step to be skipped if there was failure and we have marked Ignore Failure in failure strategy

You can have conditional execution, something like `<+pipeline.stages.<<staged>>.spec.execution.steps.<<stepid>>.status> != "IGNORE_FAILED"`

#### Can we add a skip condition on env/infa used in a stage?

No, Env/Infra deatils are not present once the stage is initilzed and gets resolved once the stage starts, so adding conditions on these will not work.

#### Is it possible to have a single cluster using potentially matching release names?

Harness uses a release name for tracking releases. The release name is used to create the corresponding Harness release ConfigMap or Secret.

So we recommend to name it unique across namespaces, so you can use matching release names in clusters if namespaces are different.

#### How to use the Opsgenie plugin and integration with Harness to create new alerts based on testcase health?

We do have different built-in notification mechanisms,  slack/email/ms teams/pager duty or custom, but if you want to integrate opsgenie, you have to create a shell script and make a call to opsgenie utilizing the api exposed by opsgenie to use for alert purposes.

#### Is there a way to prevent editing the input set during the rerun of pipelines?

No, currently, there is no way to prevent a user from editing an input set.

#### Is it possible for me to specify an artifact source based on the environment?

You can create overrides for manifest, config file, variable, and values.yaml.
For artifact overrides, I would suggest creating a variable override. You can define the artifact as an expression and use the variable expression.
Create separate variables for prod and non-prod and override the values based on the env.

#### I have a terraform apply step inside a stage with matrix or loop, I want to know if that means the underlying repo will be cloned every time the step runs for each matrix/loop item?

Yes, the underlying repo will be cloned for each run of the step in looping.

#### How do I configure autoscaling for ECS manifests?

To configure autoscaling for ECS manifests, you need to set up Scalable Targets. You can follow the instructions provided in the ECS Deployment Tutorial to learn how to configure autoscaling using Scalable Targets.

#### What is a Scalable Target and how does it relate to autoscaling in ECS?

Scalable Targets are configurations that define the resources you want to scale, such as Amazon ECS services. In the context of autoscaling ECS manifests, Scalable Targets help you manage the scaling policies for your ECS services.

#### Can I monitor CloudWatch Alarms for ECS autoscaling issues?

Currently, we do not have a direct method to retrieve CloudWatch Alarms data. While Continuous Verification supports fetching CloudWatch Logs and Metrics, alarms are not included. For more information on how to configure Continuous Verification, you can refer to the documentation.

#### Is there any inbuilt variable to get the stage execution ID -

Currently, no we do not have an inbuilt variable to get stage execution ID.
You can use the below script to get the execution ID of stage -

```
url="<+stage.executionUrl>"

stage_value=$(echo "$url" | grep -oP 'stage=([^&]+)' | awk -F'=' '{print $2}')

echo "The last stage value is: $stage_value"

```

#### How can I reduce the number of AWS calls during deployment to mitigate issues?

You can optimize your deployment process by reducing the number of AWS calls. Refer to the AWS Connector Settings Reference for information on AWS backoff strategies. Implementing these strategies can help in managing AWS calls and potentially improve the execution of your deployment scripts.

#### How to stick the pipeline to fetch files always from the helm3-based delegate?

One way would be to add a "helm 3" tag to your helm 3 delegates and modify the helm connector to use delegates that have a helm 3 tag.

#### Pipeline Abort Notification

You need to go to the Notify Section in the pipeline and select the pipeline end notification type even for abort pipeline notifications. You can choose the type of notification slack, email etc. 

#### Can Terragrunt steps be used independently?

The Terragrunt steps can be used independently or you can connect them by using the same Provisioner Identifier in all of the steps
Here's how to use all the steps together:

Terragrunt Plan step:
Add the Terragrunt Plan step and define the Terragrunt script for it to use.
Select Apply in Command.
Enter a Provisioner Identifier.
Terragrunt Apply step:
Select Inherit from Plan in Configuration Type.
Reference the Terragrunt Plan step using the same Provisioner Identifier.
Terragrunt Destroy step:
Select Inherit from Apply or Inherit from Plan in Configuration Type.
Reference the Terragrunt Apply or Plan step using the same Provisioner Identifier.
Terragrunt Rollback step:
Reference the Terragrunt Apply or Plan step using the same Provisioner Identifier.

#### How can you use CloudFormation with Harness?

You can use Harness with CloudFormation in two ways:
Dynamic infrastructure provisioning: you can provision the target infrastructure for a deployment as part of the stage's Environment settings, and then deploy to that provisioned infrastructure in the same stage.
Ad hoc provisioning: provision any resources other than the target infrastructure for the deployment.

#### Remote stage template and the pipeline exist in the same Git repo

In order to use the Template in your Pipeline if your remote stage template and pipeline are both present in the same Git repository, make sure your pipeline and template are both present in the same branch.

#### When you create a Git connector to the repo for your project

Make sure the connector must use the Enable API access option and token. The Connector must use the Enable API access option and Username and Token authentication. Harness requires the token for API access. Generate the token in your account on the Git provider and add it to Harness as a Secret. Next, use the token in the credentials for the Git Connector.

#### What are Execution notes in a pipeline?

You can add a pipeline execute note after the execution of the pipeline. Currently this can be achive via UI as well as the API.
https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getNotesForExecution

#### Getting truncated logs in a pipeline execution.

We do have a pipeline single line limit which is 25KB for a single line in logs. 
Its documented here : https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations/

#### Re-run pipeline takes too much time

If you pipeline is stored in GIT and using multiple stages and templates which also are stored in git, it might take a few seconds as Harness makes APi calls and fetches inputs from git. 

#### Accessing a variable in namepsace of an environment which is defined in the shell script step of the pipeline.

You will need to add a custom stage and then export an output variable in order to use this output variable in the deploy stage environment variable as when the pipeline will execute it will initialize the service and environment before getting to tht shell setp. 

#### Using filestore serviceVariables and service secret field

The expression ```<+serviceVariables>``` with secret variables in service is not supported in fileStore. 

#### Switching from First Gen to Next Gen and vice versa users get User not authorised error

As First Gen and Next Gen Users are separated, hence the users needs to be added in both First Gen and Next Gen in order to access both. 
If user is added in First Gen and not in Next Gen he will get the above error and vice versa.

#### Fetch and update a Harness secret

You can always leverage Harness API to uopdate your existing Secrets. 
Api Doc : https://apidocs.harness.io/tag/Account-Secret#operation/delete-account-scoped-secret

#### Custom logo for template not showing up during pipeline execution

This is the expected behaviour that while execution, in the graph we do not display icon for template similar to pipelineStudio. 
It is same for step and stage templates as well. 

#### Step group variables not accessible between steps using stepGroup expression in container step

The Container Step creates its step group with the Init and Run steps during pipeline execution. The reason why the container step creates its own Step Group is, that the additional Init Step is needed to create a build pod with containers.

Since the inner container step group is created, the ```<+stepGroup>``` expression in the Container Step script refers to the inner step group, not to the outer Deployment Dry Run group. Hence, we can’t use ```<+stepGroup>``` in the container step to access the outer step group steps.

We need to use the following expressions to get the Deployment Dry Run group steps identifiers/names in the Container Step,

Get Deployment Dry Run step identifier:

```
<+execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.identifier>
or,
<+pipeline.stages.Test_Policy.spec.execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.identifier>

Get Deployment Dry Run step name:

<+execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.name>
or,
<+pipeline.stages.Test_Policy.spec.execution.steps.kubernetes_compliance_check1.steps.k8s_dry_run.name>
```

#### Reconcile message on git experience pipeline but nothing to update

Always check your your template yaml for extra characters which is not required as part of the pipeline yaml. 

#### Masking the httpResponseBody as it contains secret

Currently you can't obfuscate the httpsresponse body. 

#### Environment Selection Options appearing in Custom Stages

Yes you can have the environment selection in custom stage. 
https://developer.harness.io/docs/platform/pipelines/add-a-stage/#environments-and-infrastructure-definitions-in-custom-stages

#### Create WinRM Credential using terraform.

You can automate creating winrm credential/secret key via our existing API as listed here https://apidocs.harness.io/tag/Account-Secret#operation/create-account-scoped-secret

#### Is it possible to change the company and account name in Harness

You can reach out to Harness Support as this can be done from the backend.

#### Create custom Harness Pipeline variables and provide a set of value to choose from at the runtime. 

Yes you can create custom Harness Pipeline variables and provide a set of value to choose from at the runtime to choose from. 
This document should help you : https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/

#### Consuming the events from audit trail

In order to consume the events from audit trail, you need to use audit streaming : https://developer.harness.io/docs/platform/governance/audit-trail/audit-streaming/
 
We also have API for audit events : https://developer.harness.io/docs/platform/governance/audit-trail/audit-streaming/ 
 
#### Conditional service overrides or manifest overrides?

You can override at environment level:
https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-and-override-values-yaml-files
 
So you can create multiple yaml file and can use expression in yaml path to resolve correctly.
 
You can also override at runtime:
https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-and-override-values-yaml-files#override-values-at-runtime

#### How do I make a pipeline step report to Slack?

For a pipeline step failure, you should be able to just set a Notification rule for the pipeline, and check the Step Failed option and add the Slack Webhook URL as per the [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#slack-notifications.

#### How to schedule your deployment

We have Cron based trigger so that you can execute a pipeline at given time:
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/schedule-pipelines-using-cron-triggers/)

#### How to get string from ```<+eventPayload.repository.name>``` in trigger config

Harness works with JEXL, you can use Java string methods for various tasks. For example, if you want to remove a specific prefix like "PSS.CPN.", you can use this expression: ```<+<+eventPayload.repository.name>.replace("PSS.CPN.", "")>```.
 
If the repository name doesn't always start with "PSS.CPN." but the prefix is always the same length, you can try a different method, like this: ```<+<+eventPayload.repository.name>.substring(7)>```. This will skip the first seven characters of the string.

#### How does Harness NG rollback if something goes wrong in Production. Will it be automatically done or do we need to trigger anything manually?

You can perform rollbacks manually, automatically, or use a hybrid option (triggering it automatically but requiring approval before it happens).
Post-deployment rollback: This can be considered a manual approach, allowing you to rollback deployments that succeeded on technical criteria but that you want to roll back for other reasons. 
Rollback as a failure strategy: This could be considered an automatic approach. Whenever something is deployed into your environment and an issue occurs during the execution, the failure strategy will trigger the rollback flow. This can be a custom flow or a pre-generated one by Harness.

#### How does rollback works if there are any configuration related changes like change in env variable between earlier version and current version?

This will depend on your deployment type. Let's suppose you're using Kubernetes. As mentioned in the response to the first question, we're going to revert all the manifests that were changed using a declarative approach or the standard approach (Kubernetes default).
 
For example:
Declarative approach: kubectl apply -f (prevision version of manifest) instead of kubectl rollout undo
Standard: kubectl rollout undo
 
To enable declarative rollback, configure the Harness service options. These options are defined in the service because they are tied to the service's manifests.

#### What Kustomize binary versions Harness Support.

Harness includes Kustomize binary versions 3.5.4 and 4.0.0. By default, Harness uses 3.5.4. 
To use 4.0.0, you must enable the feature flag NEW_KUSTOMIZE_BINARY in your account

#### What will happen to running pipeline if deployment freeze is enabled.

If a pipeline is running and a freeze happens, the pipeline will continue to run until the current stage of the pipeline has executed. Once that stage executes, the freeze is implemented and no further stages will execute.

#### How to get the build id from a pipeline?

You can use the expression `<+pipeline.executionId>` to get the build ID from a pipeline.

#### How to delete a job after its execution is complete?

You can add a shell script to check the job status before executing the Kubernetes Delete. To run kubectl commands, it's required to use the Harness Kubeconfig as an environment variable. Here's an example script for guidance:

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl wait --for=condition=complete job/myjob -n <+infra.namespace>
```

#### Dashboards disappeared suddenly, how to resolve?

One possible reason for this issue could be the expiration of the CD license. Custom dashboards are a feature of the paid license, and their disappearance may occur if the license has expired. If your license has not expired, we recommend reaching out to Harness support for further assistance.

#### Why is the Terraform task type not supported by the delegate even after installing Terraform on it?

This generally represents a bug on the delegate, and upgrading its version may resolve the issue. If this doesn't address the problem, we recommend opening a ticket.

#### How to resolve "Encryption Failed After 3 Retries" exception during Terraform Plan?

If you encounter the exception "Encryption failed after 3 retries" during the Terraform Plan, it's often due to network issues or restrictions. To address this problem, consider the following steps:
* Check Network Connectivity: Verify the network connection between the delegate and the secret manager. If you are using Harness Secret Manager, ensure there is connectivity between the delegate and Google KMS.
* Company Network Policies: If your company has strict network policies, you can use this feature flag `CDS_TERRAFORM_TERRAGRUNT_PLAN_ENCRYPTION_ON_MANAGER_NG`  that shifts the responsibility of decrypting the secret from the delegate to our manager. This approach means your delegate won't require network permissions to access KMS.

#### How to mark the pipeline as success even the approval got rejected?

To configure a pipeline to be marked as successful even if an approval is rejected, follow these steps:
1. Navigate to the `Advanced` tab of your pipeline configuration.
2. Under this tab, locate the section labeled `Failure Strategy`.
3. In this section, select `Approval Rejection` from the dropdown `On Failure of type`.
4. Next, choose the `Perform Action` option.
5. From the available actions, select `Mark as Success`.

#### Where can I find the CD release notes?

Go to the [Continuous Delivery release notes](https://developer.harness.io/release-notes/continuous-delivery/).

#### Where can I find the workflow.startTs variable?

The variable `${workflow.startTs}` is from Harness FirstGen, which is no longer supported. In Harness NextGen, although the concept of a 'workflow' doesn't exist, there is a similar variable that indicates when the pipeline started: `<+pipeline.startTs>`

#### How to define Helm values files as optional during a deployment?

Currently, we don't support this feature. We're currently working on this feature as a long-term one. For more information, go to [Allow Helm Values files on Deploys to be Optional](https://ideas.harness.io/continuous-delivery/p/allow-helm-values-files-on-deploys-to-be-optional).

#### How can I pass output variables from one pipeline stage to another when calling a pipeline from within a pipeline?

To pass output variables from one stage of a pipeline to another, you should utilize pipeline chaining. Firstly, in your parent pipeline, you need to define the output variable in the output section of the initial stage. Then, in the subsequent stage, reference this output variable using the expression `<+pipeline.PIPELINE_STAGE_ID.outputVariables.OUTPUT_VARIABLE_NAME>`. This setup ensures that when the parent pipeline is executed, the output variable from the first stage is seamlessly passed to the second stage as an input variable.

For more detailed guidance and examples, go to:

- [Chained Pipeline Output Variables](https://developer.harness.io/kb/continuous-delivery/articles/chained-pipeline-output-variables)
- [Pipeline Chaining](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining)
- [Output Variable for PowerShell Script](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script)

#### Can I execute a pipeline through the Harness command line?

As per the current design, executing a pipeline directly through the Harness CLI is not possible. However, you can run the API in any CLI to execute the pipeline.

#### Which variables should I use to consistently obtain `<+trigger.sourceBranch>` and `<+trigger.targetBranch>`, even if the pipeline is run manually?

You can utilize the following codebase expressions to retrieve the PR number, source branch, and target branch:

- `<+codebase.prNumber>`
- `<+codebase.sourceBranch>`
- `<+codebase.targetBranch>`

#### Can I use my own release names within each namespace of my cluster, allowing for multiple matching release names across a single cluster, despite the dialogue indicating that release names must be unique across the entire cluster?

Harness utilizes the release name for tracking releases. The release name is crucial as it's used to create the corresponding Harness release ConfigMap or Secret. Therefore, it needs to be unique within each namespace in the cluster. This means you can have the same release name in different namespaces within the same cluster but not within the same namespace.

While you can choose your own release name and using `release-+INFRA_KEY` is not mandatory, we recommend it. This is because there's a risk of errors if users manually assign the same name for different deployments within the same namespace. However, if you ensure each release name is unique per namespace, that approach will work as well.

For example, if you have `app1` as a release name and two different namespaces like `prod` and `dev`, you can deploy using the same `app1` release name in both namespaces.

#### How can I create overrides V2 at the infrastructure, environment, and service levels using CLI/API?

You can use the following API method to create overrides: [Create Service Override API](https://apidocs.harness.io/tag/ServiceOverrides#operation/createServiceOverride).

#### Why is my Triggers tab disabled when using the old Git sync experience?

The Triggers tab can be disabled when the pipeline isn't set to the default branch. However, please note that the Git Old Sync experience is no longer supported. We recommend upgrading your project to the latest version.

#### Can I specify a value in the release note during a pipeline execution?

Currently, it's not possible to define a note value from within the pipeline execution through expression/steps. However, you can modify the note while the execution is running by accessing the "Add Notes" section at the top of the page.

#### Can Harness incorporate a feature that utilizes a tool like bash CLI (e.g., bosh interpolate) to generate the evaluated manifest, perform YAML linting/validation, and enhance the user experience before deployment?

Currently, there is no native step for running the bosh CLI within Harness. The optimal approach would involve creating a custom step that utilizes the CLI for manifest generation.

#### Can manual approval stages in Harness be configured to make approverInputs mandatory?

The approver inputs are optional by default. However, it is possible to enforce a policy that denies a pipeline from proceeding if the approver input is not provided. Below is an example of a policy that can be applied using the On Run/On Save event for a pipeline:

```
package pipeline

# Deny a pipeline if an Approval step is missing approver inputs
deny[msg] {
    stage := input.pipeline.stages[_].stage
    step := stage.spec.execution.steps[_].step
    step.type == "HarnessApproval"
    count(step.spec.approverInputs) == 0
    msg := sprintf("Approval step '%s' in stage '%s' is missing approver inputs", [step.name, stage.name])
}
```

#### How to restrict Harness from creating files in the .harness folder within git repositories?

Currently, we do not support this kind of restriction. However, if your Git provider can block file creation in specific paths, this can be achieved.

#### How does the default release naming scheme work when deploying multiple Helm charts with the same infrastructure definition?

When deploying multiple Helm charts using the same infrastructure definition, the default release naming scheme can potentially use the same release name for each chart. However, Harness allows for customization of the release name using pipeline variables or runtime inputs. This flexibility ensures that each deployment can have a unique release name, preventing any confusion during the upgrade or rollback of charts.

#### The Deploy stage requires a service defined. Can I set up a pipeline without a service defined in the stage?

Yes, you can use the Custom stage. This is a selection you can make initially while defining a pipeline stage.

#### How to retrieve the service artifact tag in the deploy stage?

You can retrieve the service artifact by using the following expression `<+artifacts.primary.tag>`.

#### Which command does Harness use to apply the manifests during a blue-green deployment?

We use a kubectl command similar to the one below: `kubectl --kubeconfig=config apply --filename=manifests.yaml --record`

#### How can I retrieve the list of files modified in a pull request that triggered a pipeline execution?

The method to fetch modified files varies based on your Git provider, as the payload structure is unique for each provider's trigger mechanism. For instance, when using GitHub, you can obtain the list of modified files within a pull request by utilizing the following expression: `<+trigger.payload.head_commit.modified>`. This approach allows you to access specific details about the changes that initiated the pipeline execution.

#### What does the message "TERRAFORM_TASK_NG_V7 Task type not supported by delegate(s)" indicate ?

If we are using the assume role feature with terraform for aws connection we need a delegate version 81202 or later. If the delegate is older we get the above exception.

#### Can we use searchTerm and sved filter together in api call for listing pipelines?

Only one search type is allowed for the api. We can make use of either the searchTerm or saved filter identifier in the api call.

#### What does saved filter indetifier denotes in the api call for listing pipelines or execution?

In the ui we have an option to save the filter form with specific names so that it can be reused for search functionalities. These filters when saved are assigned unique identifiers. These identifiers need to be passed in the corresponding api call if we want to take advantage of the filter form specified in that saved filter.

#### Is there a way to capture the the services that are being deployed as a variable?

If there are multiple services deployed as part of a stage we can get the service name corresponding to each service deployment but there is no built in variable which gives list of all services that have been selected for deployment.

#### Why pipeline reconcile removes the variable from pipeline?

If the pipeline is using a stage template and the template does not contain the variable but the pipeline has that variable for the stage, the pipeline validation will identify this as a differnece from the existing template and will request to reconcile. Once reconciled it will restore the state of template which does not have the variable and hence the variable will be removed. If we want the variable to persist we will need to make change to the existing template to add the variable in the template itself.

#### Do we need to have the service variable available in service configuration to add an override at environment level?

If the variable is not existing at the service level while creating environment override we will not get the variable in the list for selection. We still however can add a new variable and that will be considered for the override. 

#### Can we utilise kubernetes pruning for kubernetes helm deployments?

Kubernetes helm deployments are similar to native kubernetes deployment once the template is rendered from the helm chart. Hence we can take advantage of the pruning functionality for the templates which we want to remove if not present in the rendered manifest template.

#### Do we have pruning functionality available for native helm deployments?

Helm natively takes care of removing any template changes that is done to the chart between two helm release. Hence we need not do any explicit action as helm implicitely takes care of removing these resources.

#### Can we checkout helm repos completely and not just the chart for helm chart manifest?

In the helm manifest configuration we specify the helm chart and only the charts are pulled as part of the fetch. Also even if we specify the manifest from source repo they need to confirm to standard helm directory structure. If there are any config files in the repo that needs to be accessed for deployemtn it is recommended to fetch the files separately.

#### Does native helm deployment support any plugin functionality.

We do not have any built in plugin support for helm deployments however we do have service hooks which can be used for any such functionality like using helm secrets.

#### When helm step runs install and upgrade command?

For any helm deployment it first tries to check if there is any existing helm release, if it does not find any release it treats the deployment as first deployment and runs the helm install command. If it finds the existing release it runs helm upgrade command.

#### Do we have a way of adding certificate at project/org level to be consumed by gitops agent ?

We do not have a way to add certificates at different scope for project/org/account level for gitops agent. This is an agent side configuration and need to be done at the agent itself reference doc [link](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/harness-git-ops-agent-with-self-signed-certificates)

#### Can one implement a system that enables customers to define quotas or limits for Service Instances ?

No, we don’t have a mechanism to let users cap their service instance below their subscribed amount and have the system warn you. But, one can always bake an OPA policy step that triggers a warning in their pipelines if their quota is reached.
Please read more on OPA policy step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)

#### How can one migrate a service to a higher scope (if available at projeect level) ?

Currently, there's no built-in way to move or upgrade services to higher levels. When sharing a service, it needs to have a scope at either the organizational or account level. Fortunately, you can always use the terraform provider to recreate those services at a higher level.
Please read more on how to use Terraform provider in the following [Documentation](https://developer.harness.io/docs/platform/get-started/tutorials/onboard-terraform-provider)

#### How can one use AWS CodeDeploy Template support at Harness ?

The AWS CodeDeploy Deployment Template will allow us to set the infrastructure and the ability to fetch the instances deployed via AWS CodeDeploy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#aws-codedeploy---deployment-template-sample)

#### Is there any known limitations with Harness CI/CD that we need to be aware of as it relates to being FedRamp ready in SMP ?

There should be no operational challenges encountered while utilizing Harness SMP within current FedRAMP environment.

#### Is it possible to query pipelines based on tags and require that pipelines contain multiple specified tags using an **AND** condition, instead of the default **OR** condition ?

We currently don't have a specific matching setting, and our support for tags operates exclusively with an OR operation. We recognize the necessity to update the documentation accordingly.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/tags/apply-filters-using-tags/#tags_search_logic)

#### Is there any internal or external documentation available for building and deploying updates for an Azure SQL Server database ?

No, We do not have a prescribed way to do this it would need to be their own scripts.

#### How can a stage be skipped when asserting a CD built-in variable with multi-service/multi-env ?

In a multi-service, multi-environment scenario, an approach to bypass the staging process involves using the `<+matrix.identifier>` to skip based on the infrastructure identifier. It seems the intention is to skip specific infrastructures in a multi-service configuration, based on their configuration.

#### Is there a way we can add the pipeline execution notes from the execution step like using a variable or anything apart from adding them manually from the UI ?

No, we cannot add the pipeline execution notes from the execution step using a variable.

#### How can we configure the `Error: Invalid yaml passed. Error due to - The incoming YAML document exceeds the limit: 3145728 code points` ?

Only solution around this is error is to improve the pipeline within the boundary limit of Yaml size.
Please read more on this in the [FastXML Documentation](https://github.com/FasterXML/jackson-dataformats-text/tree/2.15/yaml#maximum-input-yaml-document-size-3-mb)

#### Can a shell script step's output variable be used to determine the failure strategy of the same or subsequent steps in a conditional execution scenario, such as setting a failure strategy based on specific conditions like a DNS name check ?

Unfortunately, utilizing the output variable of a shell script step to determine the failure strategy for the same or subsequent steps is not feasible. When a shell script step concludes with a non-zero exit status, the output variable remains unset, precluding its use in subsequent steps or for defining the failure strategy. In such scenarios, reliance on the non-zero exit status is necessary to trigger the failure strategy.
Please read more on Failure Strategy in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/)

#### What is the Queue step in Harness?
The Queue step is used to control the access order to the resources during deployment and prevent multiple pipelines from requesting the same resources at the same time.

#### What Jira Date fields are supported by Harness?
The harness supports the Baseline End Date and Start Date Time fields.

#### How does the Queue step help control resource usage during deployment?
The Queue step prevents collision and queue deployments, ensuring that the first pipeline completes before the second pipeline can continue, thus controlling resource access.

#### What is the purpose of the Resource Key in the Queue step?
The Resource Key is used to enter a unique key, which is the same key added to the Queue steps in other pipelines.

#### What is the purpose of the issue link field in Jira?
The issue link field in Jira is used to support parent links, enabling the Jira Create step to create issues with existing issues as their parent.

#### What is the purpose of the Acquire Resource Lock step in Harness?
The Acquire Resource Lock step places a resource lock on the infrastructure and queues the Workflows in the FIFO (First In, First Out) order.

#### What is the purpose of the Harness Jira connector?
The Harness Jira connector allows you to create and update Jira issues, and to use Jira issues in Approval steps.

#### When should Queue steps be added to a pipeline?
Queue steps should be added whenever the resource you want to protect is used, for example, before the Terraform Apply step in pipeline A and before the deployment step in pipeline B.

#### Can you update Jira issues using Harness?
Yes, you can update Jira issues and add Jira approval stages and steps using Harness.

#### What does the Resource Key support the different types of values?
The Resource Key supports Fixed Values, Runtime Inputs, and Expression

#### Does Harness support connector for SMB in NextGen, which earlier was availble in CurrentGen ?

No, Harness does not support SMB connector in NextGen. We recommend you to use Custom Artifact Source.
Please read more on Custom Artifact in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/add-a-custom-artifact-source-for-cd/)

#### Does Harness provide APIs to force reconcile pipelines ?

No, Harness does not have a public API for force reconcile, but these APIs are soon to be provided. 
Please read more on Reconciler APIs in the [API Documentation](https://apidocs.harness.io/tag/Reconciler)

#### Can we see the commit associated with the manifest harness pulls for a k8s deploy step ?

To fetch manifest commit id in service one can use the expression `<+manifest.MANIFEST_ID.commitId>`. One can also go through delegate logs for morew suitable requests.
Please read more on manifest commit Id in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#manifestmanifest_idcommitid)

#### Does Harness support Triggers in GitX ?

No, Harness does not support [triggers](https://developer.harness.io/docs/platform/triggers/tutorial-cd-trigger) for GitX.

#### How to diagnose instances where pipeline fails to initiate due to trigger issues ?

If a pipeline doesn't start in response to an incoming event, do the following:

- Check the execution history (select Execution History in the top right of the Pipeline Studio).
- Verify that the runtime inputs are correct.
- Check the payloads sent from the Git provider and compare the relevant fields with your trigger conditions. For example, in GitHub you can view the full payload of each event sent from a specific webhook.

Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/#troubleshoot-git-event-triggers)

#### Where can we notice upcoming Features or changes for Continuous Delivery at Harness ?

Harness has published Public Facing Product Roadmap for Harness CD for new upcoming plans around Continuous Delivery.
Please find the Release in this [Documentation](https://developer.harness.io/roadmap/#cd)

#### Is there a method to execute `K8sBlueGreenStageScaleDown` across various stages within the deployment ? 

Yes, Harness supports execution of `K8sBlueGreenStageScaleDown` step in one stage with deployment in other.
Please find a suitable example in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/#add-the-execution-steps)

#### What permissions are required to restrict access to creating or editing OPA policies ?

To control the ability to create or edit OPA policies, consider utilizing the `core_governancePolicy_edit` policy. For a comprehensive list of permissions, please refer to the provided [Documentation](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference#governance-policies).

####  Is there a variable available to indicate the Helm v2 path for installation on the delegate ?

Below following could be the required solution for the same :

- One needs to install path via the INIT_SCRIPT field
```yaml
name: INIT_SCRIPT
          value: ""
```

- After the installation of the binary, export it to PATH
- Unlike FirstGen, variables are now not present for Helm2 and Helm3 for immutable delegates
**Note : One can’t have the same delegate using v2 and v3 for Helm**

Please read more on helm2 in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart/#helm-2-in-native-helm)

#### How are GCP Cloud Run services billed ?

They are facilitated through Deployment Templates. Consequently, deploying a service to a specific environment, such as "infra1," incurs billing for one service.

#### Does Harness support any scripts available to migrate GCR triggers to GAR ?

No, one can create a script and use the api to re-create them.
Please read more on this in our [API Docs](https://apidocs.harness.io/tag/Triggers#operation/createTrigger)

#### What is the log limit of CI step log fetch step and how can one export the logs ?

Harness deployment logging has the following limitations:

- A hard limit of **25MB** for an entire step's logs. Deployment logs beyond this limit are skipped and not available for download.
The log limit for Harness CI steps is **5MB**, and you can export full CI logs to an external cache.
- The Harness log service has a limit of 5000 lines. Logs rendered in the Harness UI are truncated from the top if the logs exceed the 5000 line limit.

Please read more on this in the following [Documentation on logs and limitations](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations/) and [Truncated execution logs](https://developer.harness.io/kb/continuous-integration/continuous-integration-faqs/#truncated-execution-logs)

#### Does Harness provide Pause/Resume Pipeline functionality in NextGen ?

Yes, the Pause/Resume Pipeline functionality is provided behind the `FF: PIE_DEPRECATE_PAUSE_INTERRUPT_NG`. It is not planned to depricate the feature but due to feature complexity it is advisable to use the Harness Approval steps. 
Please read more on how to use Automated Harness Approval steps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#prevent-approval-by-pipeline-executor)

#### How to prepare Azure VMSS Deployment in Harness ?

Harness provides a template specific to Azure VMSS Deployment which can be referred from the following [Custom Template Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#azure-vmss---deployment-template-sample)

#### What is the priority for status of an executed pipeline based on different looping/failure strategies ?

Harness has a status calculation logic that works based on the priority of the statuses.
- Negative(abort/failed/expired/errored) statues has more priority. It means if any stage is negative status then the parent would also be marked with that negative status hence the pipeline would also be marked with negative status.
- In negative statuses the priority is
```ABORTED > ABORTED > FAILED > FREEZE_FAILED > APPROVAL_REJECTED > EXPIRED```
- If all the stages are positive(success/ignore-failed) then only the pipeline would be marked with the above statuses.
- The order of priority in positive statuses
```IGNORE_FAILED > SUCCEEDED```
So if a stage is success and other is ignore-failed then pipeline would be marked as Ingore-failed.(Provided no subsequent stages has negative status).
Same goes for negative statuses.

#### Does Harness provide allowance for View, Edit and Access permissions for Input sets, independently of Pipeline permissions ?

Yes, with feature availability of Access Control for Input Sets, one can view, edit and access permissions for Input sets, independently of Pipeline permissions.
Below are the features and usages for the above feature :
- Access controls for Input Sets: manage visibility and editing
- Smooth transition for users with Execute rights on Pipelines
- Beneficial for Golden Pipeline users handling various Deployments
- API/Terraform users may require code updates
- Hide Input Sets from "manual" users, improving automation workflows
This feature can be enabled using the `FF: CDS_INPUT_SET_MIGRATION` after a pre-requisite `FF: CDS_INPUT_SET_MIGRATION` as enabled.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/input-sets/#manage-access-to-input-sets)

#### Does Harness support Kubernetes traffic shifting for Istio ?

Yes, Kubernetes Traffic Shifting Support for Istio and other Open Source Service Mesh Providers
- One can now integrate with istio and generic service mesh interface providers like flomesh
- One can perform traffic shifting for Blue Green and Canary Deployments
- One generate the configuration for traffic shifting on the fly or you can bring your own traffic shifting definition

This feature is provided behind the `FF: CDS_K8S_TRAFFIC_ROUTING_NG`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/traffic-shifting-step/)

#### Does Harness provide AWS SAM and Serverless.com manifest from Harness Filestore ?

Yes, One can now download their AWS SAM & Serverless.com Manifests from the Harness Filestore and AWS S3.
This is provided behind the `FF: CDS_CONTAINER_STEP_GROUP_AWS_S3_DOWNLOAD`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/manifest-sources-for-serverless-lambda)

#### How can one fetch defined variables in Service Overrides V2 in different components ?

One can always fetch variables using the expression `<+serviceVariables.varName>` to access the override variables.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/overrides-v2)

#### How many concurrent parallel executions are allowed by Harness ?

Harness has a limitation of running concurrent 256 parallel executions.

#### How can we mimic the functionality of assigning Usage Scopes in FirstGen connectors to specify allowed usage for environment types within NextGen ?

Functionality for assigning scopes are not yet possible to create. One can try using policies to enforce restriction.
Please read more on OPA Policies the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/)

##### Is it possible to customize Slack notifications for pipeline executions to include additional information such as the Project/Organization ?

No, this feature is yet to be introduced. Please read more on how to create slack notification in the following [Documentation](https://developer.harness.io/docs/platform/notifications/send-notifications-using-slack/)

#### What is the ratio for service instance to active service moving forward ?

The ratio for Service Instance to Active Service is **21**. Please read more on this in this following [Documentation](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#what-are-service-instances)

#### Is there a method to configure the Harness GitOps agent auto updater to utilize our Artifactory proxy for Docker Hub, considering policy of not allowing Kubernetes clusters to access the public internet directly ?

Organizations can import the GitOps Image from the specified [Docker Hub repository](https://hub.docker.com/r/harness/gitops-agent/tags) into their JFrog Artifactory. However, utilizing the auto updater feature may not be feasible in this scenario. Nonetheless, manual copying of the image to the Artifactory and subsequent pulling from there remains an alternative approach.
Please read more on Harness GitOps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/)

#### Can one use remote stage templates with different branches but same repository as the pipelines ?

Yes, one can use remote stage templates with different branches but same repository as the pipelines. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/templates/create-a-remote-stage-template)

#### What are the potential statuses of nodes (stages/steps) when utilizing a looping strategy ?

The statuses of the nodes (stages/steps) using a looping strategy are `RUNNING`, `FAILED`, `SUCCESS`.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#strategy)

#### Is there a way to create a github repository tag in Harness ?

One can use `curl` commands to create tags via API for [Github repository tags](https://docs.github.com/en/rest/repos/tags?apiVersion=2022-11-28). 
Please read more on this in the following [Documentation](https://developer.harness.io/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-actions/#set-up-the-workflow)

#### What pattern should be specified for the scopedFilePath parameter in this API call ?

The scopedFilePath parameter value depends on the file's scope:

- For a file on the project level, use scopedFilePath = `/path/to/file`.
- For a file on the organization level, use scopedFilePath = `org:/path/to/file`.
- For a file on the account level, use scopedFilePath = `account:/path/to/file`.
Remember to encode `/path/to/file` as `%2Fpath%2Fto%2Ffile`. Populate query arguments based on the file's storage location and identifiers such as accountIdentifier, orgIdentifier, and projectIdentifier.

Please read more on this in the following [Documentation](https://apidocs.harness.io/tag/File-Store#operation/getFileContentUsingScopedFilePath)

#### What is the impact on Kubernetes deployments when it comes to the immutability of labels?

Kubernetes labels are immutable. If a specific deployment object already exists in the cluster, you cannot change its labels.
- If the deployment object already exists before the Harness deployment, it might conflict with the default Harness Kubernetes canary deployment due to the use of the label `harness.io/track`.
- If you are deploying different Harness deployment objects to the same cluster, you might encounter a selector error.
Please read more on this in the following [Documentation on Invalid value LabelSelector](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/skip-harness-label-selector-tracking-on-kubernetes-deployments/)

#### What are the constraints regarding Kustomize build commands within Harness, specifically in terms of supported commands and their functionality ?

Harness supports the Kustomize `build` command only. The Kustomize `build` command builds a kustomization target from a directory or URL.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/use-kustomize-for-kubernetes-deployments#limitations-1)

#### Can we use expression without providing the full path (pipeline+stage+step) when we provision infra dynamically

No, when we provision infra dynamically it is considered as a separate execution, therefore all the variables that are referenced need to be referenced with full path.

#### Can we create a dashboard which shows realtime status of pipeline deployments

Yes, you can use field "status" in dashboard to check the status of pipeline

#### We have a single artifact that is deployed multiple times with different run arguments as different services in parallel in a deployment. When the pipeline is run each service asks to select the artifact tag. They should all be set to the same tag. Is there a way to select the artifact tag once and use it for all 10 of the services?

For the first service you can keep the tag as runtime value, with it also declare a pipeline variable and keep it as runtime input.
 
For all other service, provide the pipeline variable expression as a value for tag.
 
So now when you run the pipeline, the first service will ask for the tag value and you can copy the same tag value to pipeline variable which is also a runtime input which will then be assigned to all other services.

#### How to reference the tag of artifact in deploy stage.

You can use ```<+artifacts.primary.tag>``` expression

#### How is infra key formed for deployments

The infra key is formed from service Id + environment Id + connector Id +  infrastructure Id

#### How to differentiate between infra key if service Id, environment Id, connector Id, infrastructure Id are same to ensure deployments are not queued

You can either change the connector id (creating duplicate connector with same spec) or Change the secret identifier in case of secure shell deployments.

#### How to use Github event type X-GitHub-Event: pull_request_review in triggers

You can use custom triggers and use header conditions to match the attribute type.

#### We have a pipeline generator tool that we would like to automate. We have a software project in python that outputs ~30 harness pipelines as yaml. Changes could result in new pipelines being created, or old ones being destroyed. I would like to automate the syncing of these pipeline resources with Harness.

Yes, the pipeline will be in sync depending on the type of pipeline created, you can use the [API](https://apidocs.harness.io/tag/Pipeline#operation/postPipelineV2) , if the pipeline created is a remote pipeline, than we would suggest using : [API](https://developer.harness.io/docs/platform/git-experience/gitexp-bidir-sync-setup) to sync the pipeline with Git.

#### Is it possible to create a pipeline / delete a pipeline using the Harness Git Experience? As in, if I push a yaml file into a git repo, could that create a new pipeline automatically? If that is not the case, would this require a REST API call to facilitate the pipeline resource management(creation/deletion)?

Directly pushing a YAML into .harness folder will not create the pipeline, you can either use pipeline create [API] (https://apidocs.harness.io/tag/Pipeline#operation/postPipelineV2) or if the you already have the pipeline YAML you can use [API](https://apidocs.harness.io/tag/Pipeline#operation/importPipeline) to import and create the pipeline.

#### In the overview page why Environments always showed 0 when the reality there are some environments

The overview page offers a summary of deployments and overall health metrics for the project. Currently, the fields are empty as there are no deployments within the project. Once a deployment is in the project, these fields will be automatically updated.

#### Why can't I add a command script step template to a Custom stage?

The command script step template is only available in CD stages.

#### Can I sync the Harness service to Git?

Yes, we have a [bi-directional functionality to sync the Harness entities](https://developer.harness.io/docs/platform/git-experience/gitexp-bidir-sync-setup).

#### Blue/Green Deployment not scaling back up after Scale Down Step

If a replica count isn't defined on the Deployment, the Scale Down Step will set the replicas count permanently to `0`. Once a replica count is defined on the Deployment, the Blue/Green Swap Step should scale the appropriate Deployment correctly.

If using a `Horizontal Pod Autoscaler` to scale replicas, you can set the `Delete Resources` flag in the Scale Down step to delete the resources instead of scaling them down. This will cause the Staging pod to be deleted so that when a new deployment happens, the pods are scaled appropriately to 1 replica and then picked up by the `Horizontal Pod Autoscaler`.

#### Will there be support for service account keys in the approval API?

At present, our authentication system exclusively accommodates user API Key-based authentication. However, it is pertinent to note that support for service account authentication is under development as feature request.

#### How does the log verification process manage user-provided search queries, specifically focusing on negative queries aimed at identifying errors or exceptions?

Log verification takes in a user-provided search query. Queries should be negative queries that look at errors or exceptions. Typically, no more than 100 to 1000 errors in a minute.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/what-is-cv/#queries-and-limitations)

#### How does the requirement for all applications within an ArgoCD appset to be managed by the same AGENT, despite links being able to connect to multiple clusters, affect the usability of ArgoCD Application Sets?

The requirement that all applications within an ArgoCD appset must be managed by the same AGENT, despite the capability of links to connect to multiple clusters, is indeed recognized as a limitation of ArgoCD Application Sets.
Please read more on ArgoCD ApplicationSet in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/appset-basics/)

#### What is the optimal number of ArgoCD instances required for bootstrapping environments and managing GitOps infrastructure?

The installation of the ArgoCD reconciler concurrently with environment creation streamlines the execution of GitOps practices at scale, thus mitigating the complexities associated with bootstrapping environments and managing GitOps infrastructure.
Please read more on this in our blog on [ArgoCD, Terraform and Harness](https://www.harness.io/blog/argocd-terraform-and-harness)

#### Is there an established method within NextGen for modifying the serviceID?

No, service identifiers are immutable and cannot be changes, names are though available to change.
Please read more this in the following [Documentation](https://developer.harness.io/docs/platform/references/entity-identifier-reference/)

#### How can one obtain the overall status of a group after the looping process, particularly within a multi-environment deployment stage?

Harness provides the overall status after the looping process. The `Expression Engine V2` serves this purpose and was specifically designed for such use-cases.
Please read more on this in the following [Documentation][https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2/]

#### In the context of a multi-environment deployment stage followed by a custom notification stage, is there a method to ascertain the status of the deployment stage?

Yes, there is a method to determine the status of the deployment stage within such a setup. Utilizing the Expression Engine V2 facilitates this requirement. Comprehensive information and guidance on this functionality can be found in the provided [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/expression-v2/)

#### What specific role does the `Add Deployment Repo Manifest` serve within the manifests for a Kubernetes service enabled with GitOps functionality?

The `Add Deployment Repo Manifest` primarily serves as a means to access additional repositories within the PR Pipeline. While the Release Repo is utilized directly by the pipeline, the Deployment Repo facilitates the retrieval of information from another repository, enhancing the pipeline's functionality and flexibility

#### How are Service Entities tagged for categorization during deployments, and how do custom dashboards utilize these tags to filter Services and associated pipeline executions?

Service Entities can be configured with tags to categorise the same during deployments. Custom Dashboards now expose Service Tags and Service Execution Tags as a dimension. Visualisations can be configured to filter Services and associated pipeline executions based on Service Tags.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/)

#### Is there a method available to implement a percentage-based repeat strategy for Shell Script Hosts similar to the functionality present in FirstGen?

For a rolling strategy, you specify the desired number of instances to deploy per phase. If you have multiple target hosts in a stage and wish to deploy a certain proportion of instances per phase, you can configure it accordingly. This allows for a flexible deployment approach where the number of instances per phase can be defined either as a count or a percentage.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#rolling)

#### What considerations need to be addressed regarding the integration of S3 steps within our containerized CD step groups, particularly concerning multi-line environment variables and file sharing across different stages?

Harness provides plugins which execute predefined functions and essentially serve as templated scripts, adaptable to any programming language, to perform specific tasks. One can also leverage [Drone plugin](https://plugins.drone.io/plugins/s3) for the same.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step/)

#### Is it normal for the `k8sdelete` step with the release name option to delete only specific entities, unlike helm uninstall, when the chart was initially deployed using the native helm option?

The current behavior is as expected. Initially, only Kubernetes delete with the release name label was supported. However, a feature request has been made to support Helm uninstall or delete, which would be a separate type of step.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources/)

#### For Helm Subchart support, if there are multiple subcharts, is there a way to define and manage these additional subcharts beyond the single field provided?

The utilization of Multiple Helm Charts facilitates the deployment of individual standalone Helm Charts via a single service. These charts, akin to artifact sources, correspond to Helm Charts per environment. The Sub Chart feature becomes particularly beneficial when users possess an umbrella chart with dependencies, as exemplified in the provided [GitHub repository](https://github.com/thisrohangupta/custom-remote-test-repo/tree/main/parent-chart/charts). Upon accessing`/charts/`, both the primary chart and child chart can be obtained.
One can also configure the YAML to add additional sub chart dependencies.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts#using-subcharts)

#### Does the GitHub connector solely support authenticated access and lack provisions for anonymous access, particularly for public repositories?

Yes, at present, Harness only supports authenticated access. However, the feature to enable anonymous access will soon be made available.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference/)

####  Can one use OPA policies for Terraform Lint?

Yes, for Infrastructure as Code Management (IaCM) within Continuous Delivery (CD), you can use OPA (Open Policy Agent) policies for Terraform linting. 
- For CD, you need to export the lint to a variable, limited to `256KB`, and pass it to the policy step, as we don't have a native lint step. 
- For IaCM, while there isn't a built-in `tflint` step, it can be accomplished using a plugin. OPA policies can be written against Terraform plan, workspace, and state for enforcing governance.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)

#### Does Harness support deleting a Service and automatically removing associated resources from Kubernetes?

Yes, Harness initially considered the request, but it was ultimately rejected. The majority of our users prefer to manage their Kubernetes clusters' cleanup processes independently. Uniformity across the platform is crucial, and introducing special actions within the delete service feature was deemed inappropriate. Instead, users can utilize a Kubernetes delete step by providing the manifest YAML or objects for cleanup, which aligns with current practices. For customers seeking cloud and infrastructure management capabilities, alternative solutions can be explored, such as those available through platforms like Spinnaker, which offer dedicated cloud management features.

#### Does Harness support `Skip instances with the same artifact version already deployed` feature on NextGen?

Yes, this feature parity to FirstGen is now available ! Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#targetting-specific-hosts-for-deployment)

#### How does Harness ensure that the tag fetched in the service step is consistently the latest for both triggers and manual executions?

The expression `<+lastPublished.tag>` sorts the tags lexically rather than by the "created at" date. One can try replacing `<+lastPublished.tag>` with `<+trigger.artifact.build>` in the trigger's configuration ensures that it always fires using the latest collected tag.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#artifact-limits-and-display-in-the-harness-ui)

#### How to trigger one pipeline from another and use the first pipeline's shell script output as inputs for the second, ensuring runtime inputs like environment and infrastructure names are passed?

One can use output variables from one pipeline as inputs for another, defining the receiving pipeline's variables as runtime inputs.
Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)

#### Is there a way to switch aws accounts while using native terraform step?

Yes, Harness supports an AWS Connector to have the terraform plan and apply step assume a role to perform the provisioning of infrastructure.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#aws-connector-provider-credential-authentication-for-terraform-plan-and-apply-steps)


#### Is it possible to insert a hyperlink with markdown in the approval message?

In order to resolve this version as an hyperlink on slack you can use (`|`) symbol to seperate the link and text to creeate a hyperlink. This Slack formatting includes the link and the text you want to display, separated by a pipe (`|`) character. 

Replace the URL and version with your actual values, and enclose the link and the version text inside `<>`, such as `<https://github.com/harness/guestbook/blob/main/.harness/inputover.yaml | Version>`

#### How can we know the default branch on GitHub enterprise?
In GitHub Enterprise, the default branch for repositories is typically set to "main" or "master" depending on the organization's preferences or configuration. To confirm the default branch for a repository in GitHub Enterprise, you can follow these steps:

1: Navigate to the repository on GitHub Enterprise.

2: Click on the "Settings" tab, located towards the right side of the repository's menu bar.

3: In the Settings menu, select the "Branches" option from the left sidebar.

4: Look for a section titled "Default branch" or "Default branch name."

5: The default branch name will be displayed here.
If you have the necessary permissions, you may also be able to change the default branch from this settings page.


#### How to configure the boolean input?
When asking for boolean input, you can use string as input. In this case, "true" and "false" would represent boolean values.


#### How to deploy a manifest from the same branch as a build?
You can use the output variable and pass it to the deploy stage or use webhook tigger and pass it using \<+tigger.sourceBranch\>

#### How to fix Invalid argument(s): Loop items list cannot be null

The error message `Invalid argument(s): Loop items list cannot be null` typically indicates where the loop is expecting a list of items to iterate over, but it receives a null value instead.

If you are using a matrix, repeat, or parallelism looping strategy, it could be that no item is configured or the expression used is not returning the correct set of values and resulting in a null.

#### Is there any OPA policy to prevent certain expressions in pipelines?
To create an OPA (Open Policy Agent) policy that prevents certain expressions in pipelines within Harness, you'll need to define rules that evaluate the expressions used in your pipelines and deny execution based on specific criteria. Here's a simplified example of how you can achieve this:package harness.policies

default allow = false

deny_execution \{
    input.request.method \== "POST"  \# Assuming we're checking for a specific HTTP method
    pipeline \:= input.request.body.pipeline
    expression \:= pipeline.steps[_].expression
    contains(expression, "dangerous_function")  \# Check if the expression contains a dangerous function
\}

contains(expression, substring) \{
    expression = substring
\}

contains(expression, substring) \{
    startswith(expression, substring_with_dot)  # Check if the substring appears with a dot after it (to avoid matching within function names)
    index := indexof(expression, ".")
    expression[index + 1:] == substring
\}


#### What's this error means "HTTP Error Status (400 - Invalid Format) received."?
The HTTP error status code 400 means "Bad Request," indicating that the server cannot process the request due to malformed syntax or invalid format in the client's request or yaml. This typically occurs when the server cannot understand the request due to missing or incorrect parameters, headers, or data formatting.

#### What is the service id naming convention?
As a best practice the name of entities should be in a such a way that it can be identified easily with the name and we do have Description field associated as well which will help us to provide more details.

#### Why did my Artifact Triggers stop working?

If Artifact Triggers stop working, it's possible that the Perpetual Task assigned to poll the artifact has gotten into a bad state. To reset the Perpetual Task so that new artifacts can be polled, disable all triggers pointing to the same Artifact and then re-enable them. Perpetual Tasks are shared across all triggers pointing to the same artifact so disabling all of them and re-enabling them will create a new Perpetual Task to poll the artifact.

#### Why can't I see a new Service Override I created through the API in the UI

If using the `updateServiceOverride` [V1 Service API](https://apidocs.harness.io/tag/ServiceOverrides/#operation/updateServiceOverride) API, you will not be able to see the Service Override as this API is creating a V1 Service Override. V1 Services have been deprecated and thus is no longer supported. To create a Service Override via the API, use the new [V2 Service API ](https://apidocs.harness.io/tag/Environments/#operation/upsertServiceOverride).

#### Why can't I deploy an ARM template?

If you are getting the below error when attempting to deploy ARM templates, it might be because `$schema` and `contentVersion` parameters have not been removed from the Parameters File yet. This is due to a limitation in the Azure Java SDK and REST API.

```
Status code 400, "{"error":{"code":"InvalidRequestContent","message":"The request content was invalid and could not be deserialized: 'Error converting value \"https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#\" to type 'Azure.Deployments.Core.Definitions.DeploymentParameterDefinition'. Path 'properties.parameters.$schema', line 1, position 6636.'."}}"
```

For an example of a valid Paramters File, go to [ARM parameter file](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning/#arm-parameter-file).

#### What is the scopedFilePath parameter in the API call to fetch file-store detail?

The `scopedFilePath` parameter is a way of specifying where the file-store is located. The convention for this is as below:

```
File on project level:
  scopedFilePath = /path/to/file
File on org level:
  scopedFilePath = org:/path/to/file
File on account level:
  scopedFilePath = account:/path/to/file
 ```

#### How do I specify the `scopedFilePath` parameter in the API call?

The `scopedFilePath` parameter must be encoded before passing it as a parameter. For example, if the value is `/path/to/file`, you must provide the encoded value as "%2Fpath%2Fto%2Ffile". Currently, the curl requires a double encoded value, so all the `%2` in the encoding must be converted to `%252F` when using curl.

#### What is the example of a sample API call using scopedFilePath parameter?

Below is an example api, this already takes care of double encoding while being used in the curl, substitue the values as per the usage, please note that the scopedFilePath in the below example is double encoded.

```
curl -i -X GET \
  'https://app.harness.io/ng/api/file-store/files/%252Ftestfolder%252Fdummy%2520folder%252Fdummy%2520file/content?accountIdentifier=xxxx&orgIdentifier=default&projectIdentifier=cseajhang' \
  -H 'x-api-key: pat.xxx.xxx.xxx'

```

#### Can we configure looping strategy on the stage if the stage is created from a stage template?

We have to do looping configuration inside the template itself as the stage will not have the looping configuration if it is created from a stage template.


#### Is Nesting of chained pipelines allowed ?

No, if the pipeline being chained also has a chained pipeline stage it is not allowed to be used in chained pipeline

#### How to move dashboard to a different folder?

Once you have created a dashboard inside a folder and want to move it you can simply edit the dashboard and change the folder name in the edit options. If the dashboard is inside a normal folder it will be moved completely, if it is inside a shared folder a copy of the dashboard will still remain in the shared folder.

#### Does harness have banner messages that admins can set?

Harness Does not have a way to configure a banner message for display in UI.

#### When do we get missing permission core_secret_access error?

If the user does not have role assigned for secret at any specific scope, while accessing this resource the user will get such error. To avoid this add the secrete permission to any of the role assigned to the user through proper scope using resource group.

#### Why I am not getting option to select multiple infrastructure?

Multiple infrastructure option is enabled only when the option "Deploy to multiple Environments or Infrastructures" is selected in the environment section of the pipeline.

#### Why I do not see the stages from the chained pipeline in the compiled yaml?

As the pipeline is chained in the execution view we provide a link to the child pipeline execution, once we go to that execution we can view the compiled yaml of chained pipeline stages. But we can not see it in the compiled yaml of parent execution.

#### When I use that template in my pipeline, I do not see it's output variables under the Variables section in my pipeline.

Pipeline variables section is only for input variables that will be passed to the the pipeline during the run.

#### How I can add runtime generated override file to a service before helm rendering?

The values file resolution will only happen once the actual deployment step runs. We can add values.yaml override from file store or any other source repo in the manifest and update the values.yaml using api call or cli with dynamic information. If we want to use any output variable from the pipeline we can use the same expression directly in the values.yaml and while fetching the file the expressions will be resolved. We just need to ensure that the steps from where the output variable expressions are copied executes before the actual deployment step runs.

#### What does fetch file step in helm deployment actually fetches?

The fetch file step in the helm deployment fetches all the values.yaml and exapands any variable expression that have been used inside the values.yaml.

#### How do we pass the initScript for delegates which are installed using default delegate helm chart?

We can create a values.yaml file and provide the initScript in that values.yaml and use this as a values.yaml override in helm install command for delegate.

#### What is the parent identifier in making call to fetch the details for apiKey?

The parent identifier is the identifier of the user which has been used to create the api key. We need to get the actual user identifier and not the email id of the user. We can get the user identifier when we click on the user under AccessControl menu in the browser url or alternatively we can make a api call to fetch the details of the user which includes the identifier as well.

#### Does Harness supports multiple IaC provisioners?

Harness does support multiple Iac provisioners, few examples are terraform, terragrunt, cloud formation, shell script provisioning etc. 


#### What happens if we use multiple delegate selectors in configuration?

Providing multiple delegate selectors implies that we want a delegate which has all the tags used in the delegate selector configuration. If there is no delegate with all these selectors none of the delegates will be selected for the task.

#### Does http step supports mtls?

Http step does support mtls communication, we can use the certificate and private key for establishing the mtls connection with the provided end point.

#### How to get Harness secrets from Powershell?

You can refer to any harness secret inside the script `<+secrets.getValue("secret_identifier")>`

#### How to mask a secret that is used as an output variable

Secret will be visible in the following areas of the pipeline execution:

* On the Output tab of the step where the output variable originates.
* In the step logs for any later steps that reference that variable.

If there is any secret that needs to be used, we recommend creating a harness secret and referring to that directly within the pipeline instead of using it as an output variable.

#### How can I configure approval emails in child pipelines to direct recipients to the parent pipeline execution instead of the child?

Yes, the approval message links you to the child pipeline rather than the parent pipeline.

#### How to check whether my account was part of prod 1 prod 2 or prod 3
You can go to the account settings and then you can see the Harness cluster option. There you can see that in which cluster your account is in.

#### Is this a valid expression? ```<+<+codebase.commitSha>.substring(8)>```
Yes, this expression is valid. The expression ```<+<+codebase.commitSha>.substring(8)> ```suggests that it is part of a codebase where codebase.commitSha represents a commit SHA. .substring(8) would extract a substring starting from the 9th character (index 8) of codebase.commitSha. This means it would return the portion of the commit SHA starting from the 9th character onward.

#### What does this expression ```<+trigger.payload.service.tag.name>``` do?
This expression resolves the service tag name as used as a part of the custom trigger.

#### How to get secrets from the organization in bash?
> To reference a secret at the organization scope, include the org modifier in the expression, for example, ```<+secrets.getValue("org.some_secret_identifier")>```

#### How to create a support ticket to harness?
To access the "Submit a Ticket" option in the Harness platform, follow these steps:

Navigate to the Harness platform and locate the sidebar menu.
Within the sidebar menu, look for the "Help" option.
Click on the "Help" option to expand its menu.
Within the expanded menu, you should find the "Submit a Ticket" option.
Click on "Submit a Ticket" to proceed with submitting a ticket for assistance.
Following these steps should help you access the "Submit a Ticket" option within the Harness platform.

#### What does the PL_ENFORCE_DELEGATE_REGISTRATION_ALLOWLIST feature flag do?

When this feature flag is enabled, delegates utilizing an immutable image type are required to undergo allowlist verification by the Harness Manager. This entails verifying if their IP/CIDR address is included in the allowed list provided by the Harness Manager.

However, when this feature flag is disabled, delegates with an immutable image type can register without undergoing allowlist verification. In other words, they are not required to have their IP/CIDR address listed in the allowlist to register.

For additional context and detailed information on delegate registration and allowlist verification, you can refer to the Harness documentation available at the following link: [API](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-registration/#allowlist-verification)

#### HTTP Error Status 400 Invalid Format received

```HTTP Error Status (400 - Invalid Format) received. Please check the requested file path [.harness/request_formTEST_Clone.yaml] / branch [master] / Github repo name [RequestForm] to see if they exist or not.
```

This error indicates that there's an issue with the format of the requested file path `.harness/request_formTEST_Clone.yaml` in the master branch of the GitHub repo named RequestForm. The solution involves checking if the file path, branch, and repository exist and ensuring the correct format is used. This could include verifying the file path's spelling, ensuring proper GitHub repository access, and confirming the file's YAML syntax is correct.

#### How do I copy a connector?
You can copy the connector yaml but there is no option to copy a connector in UI.

#### lastPublished.tag does not support alternate branch name strategy?
Harness does not always look for a master for lastPublished.tag. The successful services have their git artefacts ending with -master. But I believe the failed one does not have any tag that ends with the master but may be -the main.

This is coming from your trigger settings and the input given here is to check for `<+lastPublished.tag>.regex(-master$)`

Please change the value to `<+lastPublished.tag>.regex(-main$)` if the tags end in -main only for this service

#### What does this error mean ERROR io.harness.delegate.message.MessageServiceImpl - Error reading message from the channel
This error message indicates that there was an issue reading a message from a channel in Harness Delegate. It could be caused by a network connectivity issue or a problem with the channel itself.

To troubleshoot this issue, you can try the following steps:

Check the network connectivity between the Delegate and the Harness Manager. Ensure that no firewalls or proxies are blocking the connection.

Check the logs for any other error messages that might provide more information about the issue.

Restart the Delegate and try again.

If the issue persists, contact Harness Support for further assistance.

API  (https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen)   
API (https://developer.harness.io/kb/platform/articles/delegate-installation-gke-error).  
API (https://developer.harness.io/release-notes/self-managed-enterprise-edition)

#### Is there a way to test the deletion of resources removed/renamed in the helm chart?
Yes, you can test the deletion of resources removed/renamed in the Helm chart by using the --prune flag with the Helm upgrade command. This flag will remove any resources that are no longer defined in the chart. You can also use the --dry-run flag to simulate the upgrade and see what changes will be made without actually applying them.

#### Can I move a connector from one project to another?
There is no option as such which can move one connector from one project to another.

#### What does error missing permission core_secret_access?
This error message indicates that the user or role does not have the required permission to access secrets in Harness. To resolve this issue, you need to grant the user or role the "core_secret_access" permission. This permission allows users to access secrets in Harness. You can grant this permission by going to the User Group or Role that the user belongs to and adding the "core_secret_access" permission if you are still facing issues.

#### How to send Slack notifications for rules evaluations
This is not supported yet. You can always raise this as a feature request using our new idea portal (https://ideas.harness.io/) 

#### What does expression infra.variables.projectID mean?

There are no variables inside an infrastructure definition. But, When you are using a custom deployment template in your infrastructure you can use variables inside that.

#### How to run a pipeline with previous execution variables?

When you click on re-run the pipeline of a particular execution the variables at the runtime are already populated, but they are selectable as of now. Means they can be edited.

#### What's the time zone for CT M-F
Central Time (CT) is UTC-6 during standard time and UTC-5 during daylight saving time, observed Monday to Friday.

#### When I use that template in my pipeline, I do not see its output variables under the Variables section in my pipeline
Currently, we only display input variables under the variables section, but not output variables and this is by design.

#### How I can add runtime generated override file to a service before helm rendering
You can add an override file at runtime in service override or by utilizing override v2 enabled for your account. You can specify the path and branch of the override file during runtime. This is how you can perform overrides in the service before helm rendering."

#### Write a policy which restricts a step from a template to come from a branch named testing.
package template
Deny a step if it comes from a branch named testing
```
deny[msg] {
    step := input.template.spec.execution.steps[_].step
    step.templateRef == ""my_template""
    step.gitConfig.branch == ""testing""
    msg := sprintf(""Step '%s' in template '%s' cannot come from branch 'testing'"", [step.name, input.template.metadata.name])
}
```

#### What are default variables?
I'm assuming you are referring to default values for runtime inputs in Harness.

You can specify default values for runtime inputs in templates or when writing pipelines in YAML. In the Pipeline Studio's Visual Editor, you can select the Value type selector to select Runtime Input, and then select the Settings icon next to the field to enter the Default value.

When writing pipelines in YAML, you can specify a default value by appending the .default() method to ```<+input>```. For example: ```<+input>.default(bengaluru)```. If your default value has a comma, you must escape the value string using the format 'VALUE'. For example: ```<+input>.default('london,uk')```.

You can also use a JSON object as the default value for runtime input. Here's an example of a default value that uses a JSON object: ```""<+input>.default('{""risk"": 100,""availabilityVsCost"": ""balanced"",""drainingTimeout"": 120,""lifetimePeriod"": ""days"",""fallbackToOd"": true}')""."```

#### Trigger is getting disabled for Pipelines which are not saved in the Default Branch.
To enable triggers for other branches in the Harness pipeline, you'll need to create a trigger for each branch you'd like to enable. You can follow the same steps as creating a trigger for the default branch, but specify the branch name in the Pipeline Reference Branch field in the Trigger Input Repo tab.
This will ensure that the trigger uses the pipeline and input set definitions in the branch specified in the webhook payload.
You can refer to the below docs for more details:[API] (https://developer.harness.io/docs/platform/git-experience/manage-input-sets-in-simplified-git-experience) [API] (https://developer.harness.io/docs/platform/git-experience/manage-a-harness-pipeline-repo-using-git-experience)

#### What does exit status 1 mean
A harness pipeline returning exit status 1 typically signifies an error during execution, such as compilation/build failures, test errors, deployment issues, or integration problems. Diagnosing specific issues requires reviewing logs and error messages.

#### Does Harness support multiple IaC provisioners?
You can refer to this documentation to know what all IaC provisioner harness supports -[API] (https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/provisioning-overview/#dynamic-provisioning-and-deployment-type-support-matrix)

#### Can we modify the audience in the generated JWT token to use it for purposes beyond AWS authentication?

Modifying the audience (aud) claim in a JWT means changing who the token is intended for. In AWS authentication, it typically specifies AWS services. However, you can adjust it for other systems or services as long as they understand and accept this change. Just make sure the system you're sending the token to knows how to handle the modified audience claim according to its own requirements and security rules. 

#### Can we use the harness cli tool to import a YAML file and create a new job?

You can first import the pipeline YAML from git via Harness CLI, [example] (https://developer.harness.io/docs/platform/automation/cli/examples)

#### How do I use an HTTP Step to send multipart requests in harness

Harness doesn't directly support multipart/form-data uploads in the HTTP step , you can:
 
1. Prepare your data in the desired format (e.g., JSON payload) within the script step of your pipeline.
Utilize a tool like jq or similar to modify the data into multipart/form-data format, generating key-value pairs separated by boundaries.
Store the formatted data as a string variable within the pipeline.
 
2. Use a script step to call the API:
 
In a subsequent script step, utilize tools like wget or curl to make the PUT request to the File Store API endpoint.
Include the pre-processed data variable as the body of the request, setting the Content-Type header to "multipart/form-data".
Use appropriate authentication mechanisms (e.g., API key) in the request headers.

#### what is a stateful set

Stateful Blue-Green Deployment in Kubernetes is a method of updating applications in a way that reduces downtime and ensures data consistency, especially for applications that store data or have stateful components like databases [Doc] (https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/)

#### Pipeline execution failed and giving an pop up "Plan execution not found"

The error "Plan execution not found" indicates that the system cannot locate the execution plan needed to run the pipeline. To resolve it:

Double-check the pipeline configuration.
Ensure the execution plan exists and is accessible.
Check permissions for accessing the plan.
Review logs
Retry the execution after addressing any issues found.

#### Where are the settings for an individual user email notifications?

However, in general, email notification settings can be configured at the account level in Harness. To enable or disable email notifications, go to Account Settings > Account Resources > Default Settings > Notifications, and then turn on or off the corresponding toggle. If you want to send email notifications to non-Harness users, you must configure your own SMTP server and enable the Enable Emails to be sent to non-Harness Users default setting. [Sources] (https://developer.harness.io/docs/platform/notifications/notification-settings)

#### How to move pipeline from one project to another

You can try the following steps:

Export the pipeline from the source project as a YAML file.
Import the YAML file into the target project.
Update any references to input sets or other entities that may have changed due to the move.
Test the pipeline in the target project to ensure it is working as expected.

#### How to trigger a pipeline on a pipeline completion

You can add the curl command from the trigger at the last step of the current pipeline to trigger the next pipeline.

#### How to check if a key exist in serviceVariables

You can use [API](https://apidocs.harness.io/tag/Services#operation/createServicesV2) to retrive complete information about the service.

#### Is there a way to obtain the account private key to authenticate with Hashicorp Vault using the OIDC public key?

We don't support OIDC with Hashicorp Vault as of today.

#### can we use Terraform to reconcile pipeline

No, Terraform does not have the ability to reconcile the pipeline. However, Harness warns you when a pipeline references a template that needs to be reconciled when you change it. To resolve conflicts in the pipeline YAML, you can select Reconcile in the Pipeline Studio, which opens the Template Error Inspection page where you can view the Git YAML differences for the pipeline and see which lines have been modified.

#### Expression results in String, but custom filter expressions must result in yes or no.

As of now string, number and expression is supported

#### Harness NG API

We do have Harness NG API, [API Doc](https://apidocs.harness.io/)

#### Are there any access permissions or restrictions that might be affecting the execution of Python commands within Terraform?

No We don't have any restrictions on running the python in terraform

#### Can i convert the pipeline.startTS to a datetime in Harness using a ternery operator

Ternary operator are essentially used for expressing conditional statements and cannot be used for conversion. [DOC](https://developer.harness.io/kb/continuous-delivery/articles/ternary-operator/)

#### Can I use Harness OIDC provider with Hashicorp vault

We don't support OIDC with Hashicorp Vault as of today.

#### what is the pipeline retry interval in harness

When you set the failure strategy to Retry Step, you can specify the retry count for a step or all steps in the stage. [Doc](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy/#retry-count-expression)

#### How to format pipeline.startTs field in a human readable way?

You can use echo ```<+new("java.util.Date", <+pipeline.startTs>)>```

#### How to list harness services using curl ?

You can use [API](https://apidocs.harness.io/tag/Account-Services#operation/get-account-scoped-services)

####  How to ensure a stage with a step group appears before a stage with a deployment of kubernetes

You can create a OPA policy to ensure this.

#### How to get all services using Harness API ?

You can use the [Monitored services API get services endpoint](https://apidocs.harness.io/tag/Monitored-Services#operation/getServices) to fetch the services in specific project, or you can use the [Services API get service list endpoint] (https://apidocs.harness.io/tag/Services#operation/getServiceList).

####  Getting error Invalid request: API rate limit exceeded for user ID 102833628. If you reach out to GitHub Support for help, please include the request ID D775:6578D3C5.

The rate limit issue is from GitHub (which will be autoreslved in some time) [Doc](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-github-app-installations) ,if you are using same connector for all remote entities. You can use different connectors with different access token to avoid this issue.

#### Can I authenticate to a secret manager with workload identity

Currently, Harness does not support authentication to a secret manager with workload identity. However, you can use a custom secret manager to authenticate with a secret manager.

#### How to get all the stage names that has been executed till now

You can use [API](https://apidocs.harness.io/tag/Pipeline#operation/getPipelineSummary) to fetch the pipeline summary.

#### What image tag expression should be used for periodic deployment of a binary version triggered by cron?

If it's not a custom trigger, use `<+trigger.artifact.build>` in the image tag field. Otherwise, reference the payload JSON to construct the expression.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#using-the-triggerartifactbuild-and-lastpublishedtag-expressions)

#### Can one deploy Salesforce component without using S3 bucket ?

Yes, one can deploy using custom artifact without using the S3 artifact. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support)

#### How does the AWS connector currently handle OIDC authentication?

Users can now leverage the AWS connector to configure OIDC authentication. This only leverages the account ID parameter when we send the token payload to the AWS STS service. This feature is provided behind the feature flag `FF:CDS_AWS_OIDC_AUTHENTICATION`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#harness-aws-connector-settings)

#### How can I force a template consumer to a new version?

One can use the provided OPA policies to enforce. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/governance/policy-as-code/sample-policy-use-case)

#### Can template changes cascade down to end users, or must users always update with a new version?

Best practice suggests that end users reference the "stable" version of the template, allowing updates whenever necessary without requiring user intervention. Non-ideal condition is to change the version of the template via editing template.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/templates/template/#versioning)

#### What is the recommended approach for achieving fine-grained access tokens restricted to a single repository per pipeline? Is creating one GitHub app per repository overkill, and how do other finance customers typically address this challenge?

The primary recommendation is to use GitHub Apps, but considering the limit, an alternative is "Deploy Keys," although this option entails significant overhead. Another suggestion is to have their instance of GitHub Enterprise, which may mitigate some limitations, albeit at an additional cost.

#### How can one troubleshoot the error `ERROR: Error during SonarScanner execution`?

Most scanners cannot scan java source code, only compiled images like jar files. Also, configure the Exclude field with `**/*.java`
Please read more on STO requirements in the following [Documentation](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)

#### Do we have the capability in a dashboard or anything that will surface untagged resources?

Yes, we have options for identifying untagged resources. In perspectives, filtering label X = NULL can indicate the percentage of untagged resources and their trend over time. For detailed identification, Cloud Asset Governance provides a better approach.
Please read more on Cloud Asset Governance Architecture in the following [Documentation](https://developer.harness.io/docs/cloud-cost-management/architecture-diagrams/cloud_asset_governance_architecture).

#### How can variables/outputs be accessed between steps using the looping strategy, especially in dynamically provisioned infrastructure scenarios like Terraform within a Deployment stage?

Use `<+pipeline.stages.Deploy_<+strategy.iteration.toString()>.spec.provisioner.steps.TerraformApply.output.logic_app_callback_url>` to reference dynamically provisioned infrastructure within the same stage in a looping strategy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).

#### How can one enable a dropdown box to display the list of versions available in a Google Cloud Storage bucket when using it as an Artifact source for a service?

Harness does not support this feature yet. Please read more on GCS service in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions/#adding-a-cloud-function-service).

#### What is the harness variable replacement for a service name?

The variable expression for the Service name in Harness is given as `<+service.name>`.

#### Can I copy an existing connector?

No, you will not be able to copy the connector but you can copy the connector YAML.

#### Can we trigger all executions in all organizations?

We cannot trigger all pipelines at once in an org or project.

#### What is allowSimultaneousDeployments?

In Harness, the `allowSimultaneousDeployments` setting in the infrastructure definition YAML file that controls whether multiple deployments can occur concurrently on the same infrastructure. When set to true, Harness permits simultaneous deployments, allowing multiple deployment pipelines to execute concurrently without waiting for each other to finish. Conversely, setting it to false restricts simultaneous deployments, ensuring that only one deployment can occur on the infrastructure at a time. This choice depends on specific deployment requirements and infrastructure capacity, as enabling simultaneous deployments can expedite the deployment process but may require careful consideration of performance and stability implications.

#### Why am I unable to see Applications from a connected ArgoCD Project?

Please verify your RBAC permissions and project ID of the application in your application YAML in your cluster.

#### How to create a Harness project from Terraform?

You need to prepare a Terraform script of the resources you want to create in your project. Before that, if you want to create a project with Terraform in an org then you need to set up all the required resources using the Terraform Provider script.  You can reference the Terraform resources from the [Harness Terraform Provider API documentation](https://registry.terraform.io/providers/harness/harness/latest/docs).

#### What is a matrix looping strategy?

A matrix is a looping strategy in Harness that iterates over a series of elements. It can be used in stages or steps to repeat a set of actions for each element in the matrix. Matrices can be one-dimensional or multi-dimensional and can be customized with maxConcurrency and nodeName settings. You can use expressions to reference matrix values in your steps. The current status and live status expressions can be used to retrieve the current execution status of looping strategies for nodes in a pipeline or stage. The Git Experience in NextGen supports storing matrix configurations in a Git repository.

Sources: [Additional matrix examples](https://developer.harness.io/docs/platform/pipelines/looping-strategies/additional-matrix-examples), [Harness variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables), [API](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).

#### What is ingress.yaml used for?

An ingress.yaml file in Kubernetes serves as a configuration blueprint for managing Ingress resources, which control external access to services within the cluster. These files contain settings defining rules for routing incoming HTTP and HTTPS traffic based on specified criteria such as hostnames and URL paths. Typically structured in YAML format, an ingress.yaml file outlines how requests from external sources are directed to different services within the Kubernetes cluster. This includes specifying which services handle traffic for particular hostnames or paths, along with any necessary configurations such as load balancing or SSL termination. In essence, ingress.yaml files provide a way to centrally manage and define the ingress behaviour for applications running in a Kubernetes environment, facilitating efficient routing and external access control.

#### Does the change in config trigger deployment again?

If you have setup a webhook trigger, then yes for the push event if the config changed is of the pipeline and GitEx project.

#### Is there any harness API to know the status of connectors like Bitbucket and Artifactory as such? Because for any reason if the last check is failed, the connector connection seems stale further?

You can check the status of the connector using the [API](https://apidocs.harness.io/tag/Connectors#operation/validateTheIdentifierIsUnique) call to check if a Connector can successfully connect Harness to a third-party tool using the an Account and Connector ID.

#### How can we export users from the Harness?

To export users from Harness, you can utilize our API method `getUsers`. Currently, we do not support a direct functionality for exporting all users. Go to [getUsers API](https://apidocs.harness.io/tag/User#operation/getUsers) for more details.

#### Can I write a policy that restricts the Build and Push to GCR, GAR, and ACR step types?

Yes. For example:

```
"package pipeline
deny[msg] {
    stage = input.pipeline.stages[_].stage
    step = stage.spec.execution.steps[_].step
    step.type == ""BuildAndPushGCR"" or
    step.type == ""BuildAndPushACR"" or
    step.type == ""BuildAndPushGAR""
    msg = sprintf(""Step type '%s' is not allowed in this pipeline"", [step.type])
}"
```

#### Can we turn off storage and logging from Google APIs?

In Google Cloud Platform (GCP), while it's not always possible to completely disable storage and logging functionalities for specific APIs, you can exercise granular control over them. For instance, in Google Cloud Storage (GCS), you can manage access permissions for buckets and set up lifecycle policies to control data retention. Similarly, in Google Cloud Logging, you can't entirely turn off logging, but you can filter log entries, manage log retention periods, and export logs to external destinations. Utilizing IAM permissions, configuring lifecycle policies, and implementing log filtering mechanisms allow you to effectively manage storage and logging while aligning with your organization's security and compliance requirements. Regular monitoring and auditing of these configurations ensure they continue to meet your organization's needs.

#### Can I pull in environment files from Git?

It is not possible to pull the environment YAML file from Git. Import from Git feature is not yet available for service and Environment for GitEx.

#### I need an asset governance rule to take the value from the tag "ApplicationID" and copy it to the new tag "AppID".

We cannot copy a tag value, but we can update the tag value with a new one.

#### JEXL to skip an item in repeat looping strategy?

To skip an item in a repeat looping strategy using JEXL, you can use an if condition within the repeat block. For example, if you want to skip the second item in the repeat list, you can use the following JEXL expression:

```
repeat:
  items:
    - item1
    - <% if (strategy.iteration != 1) { %>item2<% } %>
    - item3
```

In this example, the if condition checks if the current iteration is not equal to 1. If it is not equal to 1, then the item ""item2" is included in the repeat list. If it is equal to 1, then ""item2"" is skipped and the repeat list continues with ""item3""."

#### How to create a Harness expression that formats an integer to datetime?

There is no specific Harness expression to format an integer to datetime. However, you can use Java's SimpleDateFormat class to format a date and time string from an integer value. Here's an example expression that formats an integer value to a date and time string:

```
<+new java.text.SimpleDateFormat(""yyyy-MM-dd HH:mm:ss"").format(new java.util.Date(<+pipeline.variables.my_integer_variable>))>
```

Replace my_integer_variable with the name of your integer variable. This expression uses the SimpleDateFormat class to format the integer value as a date and time string in the format `""yyyy-MM-dd HH:mm:ss""."`

#### Is there a way to disable a pipeline? Like, keep it around instead of deleting it but not making it executable?

We do offer OPA policies, which could prove beneficial in this case by simply preventing the pipeline from running as needed.

```
package pipeline
deny[msg] {
# Find all Custom Stages
input.pipeline.name == "sample"
msg := sprintf("Execution not allowed for the pipeline '%s' ", [input.pipeline.name])
}
```

#### Why is core_secret_access necessary for deploying pipelines? What does granting this permission mean? Will it enable access to secret contents?

The `core_secret_access` permission is crucial for users to deploy pipelines in Harness. However, granting this permission does not automatically provide access to view the contents of secrets. Instead, it allows users to access the secrets for utilization within pipelines and other components of the Harness platform.
For further details regarding permissions, go to [API Permissions Reference](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference/).

#### Can a service account email be used to log in through the Harness UI?

No, service account emails cannot be utilized for logging into the Harness UI. Service accounts are specifically designed for programmatic access to Harness resources and are not intended or configured for UI login purposes.

#### Can a Harness pipeline triggered by a webhook on a pull request determine the specific files modified in the pull request?

Yes, when a Harness webhook is triggered by a pull request, you can identify the modified files within the event payload under the `"changedFiles"` key. To access this information, navigate to Trigger and then Activity History within Harness.

#### We need an option of kubectl replace command in kubernetes Rolling Deployment?

Currently, this feature is not available in the Harness Platform but there is an enhancement request for this in the [Harness ideas portal](https://harness-io.canny.io/continuous-delivery/p/need-an-option-of-kubectl-replace-command-in-kubernetes-rolling-deployment).

#### What is the recommended way to name Kubernetes jobs in Harness pipelines when using Rolling Deployment and native Helm deployment for the same chart?

When deploying Kubernetes jobs in Harness pipelines, especially when utilizing Rolling Deployment alongside native Helm deployment for the same chart, it's essential to adopt a consistent naming convention for jobs to ensure successful tracking and management. While applying a unique suffix such as `{{ now | unixEpoch }}` can facilitate parallel job execution during Rolling Deployment, it can lead to tracking issues when Helm renders the chart with a different job name.

The recommended approach is to use a naming convention that accounts for both scenarios.

For Rolling Deployment, maintaining a unique suffix like `{{ now | unixEpoch }}` is suitable.

For Native Helm deployment, it's advisable to utilize a name that remains consistent across deployments, such as `job-migration-db-{{ .Release.Revision }}`.

#### Can I create a template from an existing pipeline?

Yes, you can save an existing pipeline as a template in Harness. Simply navigate to the Pipeline Studio of the desired pipeline, and click on the dropdown menu beside the Save button in the top right corner. Then, select **Save as Template**.

#### How can I configure the delegate to utilize a new version of the Helm binary?

To integrate a new version of the Helm binary with the delegate:

1. Install the desired version of the Helm binary on the delegate host.
2. Set `HELM3_PATH` environment variable to point to the location of the newly installed Helm binary.

   This can be accomplished by adding the following lines to the delegate's YAML file:

   ```
   - name: HELM3_PATH
     value: /path/to/new/helm/binary
   ```

   Replace `/path/to/new/helm/binary` with the actual path to the newly installed Helm binary.

3. Restart the delegate to apply the changes.

#### Why does a variable of type string get converted to an octal equivalent when passed to the manifest?

A variable that is of string type might be getting converted to an octal equivalent when being passed to a kubernetes manifest. Example: The variable `020724`  would be passed through as `8660`.

The go templating is converting to the octal equivalent if the numerical input starts with 0 before applying them to the cluster. Adding double quotes around the JEXL in the values.yaml file shall preserve the actual value (Example: `"<+pipeline.variables.date>"`).

#### What pipeline statuses are considered when determining concurrent active pipeline executions ?

Concurrent active pipeline executions comprises of active and in-progress executions. This includes those that are paused temporarily by steps such as the wait step or approval step. Currently there are plans to exclude pipelines that are waiting for approval.

#### How do I find the output variables of a stage from a pipeline execution through the API?

The output of the pipeline execution can be reetrieved through SubGraph API as described under https://apidocs.harness.io/tag/Pipeline-Execution-Details#operation/getExecutionDetailV2

Each nodemap corresponds to a stage in the execution and the output variables along with the values shall be available under the "outcomes" field under "nodemap". 

#### How do I find node and plan execution ids of a pipeline execution?

Node and plan execution ids may be required to fetch details about an execution and query the API for results. 
Plan execution id is specific to a pipeline execution and can be found in the url of the pipeline execution. For example: `/executions/R0CWuTW8T6Gl7BcshaJpxQ`

Node execution id is specific to a stage and can be fetched from the list of API calls with a filter `stageNodeId`. Below is a sample API call that uses the `stageNodeId`

`https://app.harness.io/gateway/pipeline/api/pipelines/execution/v2/<planexecutionid>?routingId=<accountid>&orgIdentifier=<orgname>&projectIdentifier=<project-name>&accountIdentifier=<accountid>&stageNodeId=<stagenodeid>`

#### Which entities such as service or environment are factors that determine the metrics displayed in Deployment Dashboard?

In our setup, two Looker dashboard models are specifically designed to showcase data solely from pipeline executions with a CD stage. The data aggregation and presentation within these views adapt dynamically based on the chosen attributes for display on the dashboard
Please read more on Looker/Dashboard Behaviour in the following [Doumentation](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories-usage/#behaviour)

#### Is `Custom Stage` considered a Continuous Delivery stage? Is execution of a pipeline without any Service entity considered towards Total deployments?

Yes, we consider Custom stage as part of CD stage as of now to update the dashboards, and a deployments without Service is not possible for CD Stage hence it would not be considered towards total deployments
Please read more on custom stages in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage)

#### What is the correct expression to reference artifact version in rollback phase?

One can use the expression `rollbackArtifact.version` . This is a change from FirstGen to NextGen where rollback artifact version was getting automatically resolved
Please find an example use case on this in our [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#pipeline-sample-setup---cicd)

#### Does Harness allow license key, and how is it used?

Harness prefers API keys instead of license keys to enter in the product.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/)

#### Does Harness provide control over Abort Pipeline to users exclusively?

Yes, Harness provides control over abort pipelines as a feature behind the FF: `CDS_PIPELINE_ABORT_RBAC_PERMISSION`. This feature allows a control abort operation that kills the pipeline/stage without any cleanup.
This consists of a pre-requisite FF: `CDS_PIPELINE_ABORT_RBAC_PERMISSION_MIGRATION` enabled required for this feature to be in use, if this is not done, one may wind up with users who could abort the pipeline earlier and now cannot.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/failure-handling/abort-pipeline/)

#### Can we add Pipeline Chain Stage inside a Pipeline Template ?

No, we do not allow users to add Chained Pipeline stage inside templates
Please read more on Chained Pipeline in the following [Documentation](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/)

#### Is there a way to see which user acts on the wait step to mark it as a success or mark it as fail?

One can look at having Harness approval step in addition to wait step for this usecase, also can set a failure strategy in case it timeout
Please read more on Harness approval step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#add-approval-step)

#### How to efficiently extract specific tag values from JSON output, like querying an AWS ECR Repo via the AWS CLI, using the json.select feature with shell script variables or outputs?

The output variable cannot be used in the same step its created.
The output variables can be used within:
- the stage
- inside the pipeline
- inside a step group

Please read more on this in the following [Documentation](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)

#### What is the closest expression for parity from Current Gen to Next Gen?

One can use the expression `<+exportedVariables.getValue()>` for similar usecase in Next Gen
Please read more on this in the following [Doumentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/#scoping-output-variables-using-aliases)

#### How can we refer to the current pipeline execution Url?

Yes, Harness provides the expression `<+pipeline.executionUrl>` to fetch the current variable pipeline execution Url
Please read more on pipeline expressions in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipelineexecutionurl)

#### Why am I getting an Invalid Repository Error on my Pipeline Trigger?

If you've recently migrated your Pipeline and Input Set(s) from Inline to Remote, you may encounter this error. To fix this, the Trigger needs to reference a Remote Input Set.  It is required for Triggers to reference a Remote Input Set when using Remote Input Sets and Remote Pipelines.

#### Why am I getting an error that my trigger has empty or missing pipelineBranchName?

```
Failed while requesting Pipeline Execution through Trigger: Unable to continue trigger execution. Pipeline with identifier: $PIPELINE_ID, with org: $ORG, with ProjectId: $PROJ, For Trigger: $TRIGGER has missing or empty pipelineBranchName in trigger's yaml.
```

If you've recently migrated your Pipeline and Input Set(s) from Inline to Remote, you may encounter this error. To fix this, the Trigger needs to reference a Remote Input Set. It is required for Triggers to reference a Remote Input Set when using Remote Input Sets and Remote Pipelines.


#### What's the difference between matchType all and any?

If using a Filtered List to deploy to multiple environments, you can dynamically set which environments to deploy to using tags. The `matchType` field is used to define the operator for the tags list.

All - Only deploy to environments matching all the tags.

Any - Deploy to environments matching any of the tags.


#### Why is my pipeline timing out even though my step hasn't reached the timeout yet?

If your pipeline is timing out before your step has a chance to hit the timeout threshold, it's likely that the pipeline itself has a timeout that has already been reached. You can find the relevant pipeline setting in Advanced Settings > Pipeline Timeout Settings.


#### Why can't I see any Harness Status Checks in my Github Branch Protection Rules after I already setup the trigger?

To get Harness Status Checks to show up in the Branch Protection Rules, you'll need to trigger the Harness Pipeline at least once with a Pull Request first. Only then can you see the Harness Status Checks in the Github Branch Protection Rules and enforce it on branches.


#### How do I setup a Pipeline Trigger for Tag and Branch creation in Github?

The out of the box Github Trigger type does not currently support this however, you can use a Custom Webhook trigger and follow the below steps in order to achieve this. 

1. Create a Custom Webhook trigger
2. Copy the Webhook URL of the created trigger
3. Configure a Github Repository Webhook pasting in the URL copied from Step 2 in the Payload URL
4. Set the content type to `application/json`
5. Select `Let me select individual events.` for the `Which events would you like to trigger this webhook?` section
6. Check the `Branch or tag creation` checkbox


####  What is a "groupName", and how would I add it to an NRQL query for Continuous Verification?

A groupName is an identifier used to logically group metrics. To add a groupName to a New Relic Query, add it in the `Map Metric(s) to Harness Services` section of the Health Source.


#### Why am I unable to Download Deployment Logs via the API?

If the Deployment Stage/Step has no logs to download, the Download Deployment Logs API will fail with the following error

```
Download DeploymentLogs APi Failed with error : org.springframework.web.client.HttpClientErrorException$NotFound: 404 Not Found: "{<EOL> "error_msg": "cannot list files for prefix"<EOL>}<EOL>"
```

#### Why am I getting UPGRADE FAILED when trying to deploy my Helm Chart?

```
Error: UPGRADE FAILED: unable to build kubernetes objects from current release manifest: resource mapping not found for name: "$RESOURCE_NAME" namespace: "" from "": no matches for kind "HorizontalPodAutoscaler" in version "autoscaling/v2beta2" ensure CRDs are installed first
```

This error happens if you have recently upgraded your Kuberenetes Cluster without ensuring that your Helm Releases' API Versions are supported in the new Kubernetes Cluster version. When attempting to upgrade them after, Helm will throw the above error due to the deprecated API no longer existing in the current Kubernetes Cluster. To fix this, you'll need to upgrade the API Version on the Helm Release manually by following the steps in the [Helm Documentation](https://helm.sh/docs/topics/kubernetes_apis/#updating-api-versions-of-a-release-manifest).

To avoid this in the future, please make sure to perform any Helm Release upgrades prior to upgrading your Kubernetes Cluster. A detailed list of deprecated and supported Kubernetes APIs can be found in the [Kubernetes Documentation](https://kubernetes.io/docs/reference/using-api/deprecation-guide/).


#### Can our git experience be used for services. environments, and pipelines? Can we enforce that all resources for a specific projects only come from a specific git repo?

Yes, git experience can be used for services, envs and infra as well, also one can always enforce git repo for all entities at all levels (account, org, project).

#### Can the internal mapping in Git experience be modified, and how do we prevent a broken state if a GitLab project/repository moves? How can we fix this issue?

Reconfiguration within Harness is required if resources are moved across repositories or Git providers. Although manual, it can be automated through APIs for specific needs.

#### Which API is utilized for modifying configuration in the `update-git-metadata` API request for pipelines?

Please find an example API call below : 
```sh
curl --location --request PUT 'https://app.harness.io/gateway/pipeline/api/pipelines/<PIPELINE_IDENTIFIER>/update-git-metadata?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORG_ID>&projectIdentifier=<PROJECT_IDENTIFIER>&connectorRef=<CONNECTOR_REF_TO_UPDATE>&repoName=<REPO_NAME_TO_UPDATE>&filePath=<FILE_PATH_TO_UPDATE>' \
  -H 'x-api-key: <API_KEY>' \
  -H 'content-type: application/json' \

```
Pleae read more on this in the following [Documentation](https://apidocs.harness.io/tag/Pipeline#operation/importPipeline)

#### Is it expected behavior for members of a group with permissions to create/edit Non-Production environments to be able to delete infrastructure definitions within those environments, despite not having explicit deletion permissions?

Yes, The behavior of infrastructure deletion is consistent with environment update operations. Infrastructure operations are treated as environment updates, which explains the ability to delete infrastructure definitions within the environment.
Please read more on Environment and InfraDefintion behaviour in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/#important-notes)

#### Are we planning to maintain Harness DockerHub Images alongside the Harness GCR Images?

Yes, both Docker hub and GAR images are published and maintained.

#### What is the character limit for HTTP response body variable in HTTP steps?

Harness impose a limitation of 256KB on variable character limit for HTTP steps as well.

#### How to troubleshoot "Invalid request: Invalid Load balancer configuration in Service." error?

This can happen in following cases:
- No target groups attached to LB
- Multiple services attached to target groups
- Service is attached to both target groups
  
Please read more on ECS Blue-Green Steps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#visual-summary)

#### Does Harness support methods to convert `<+pipeline.startTs>` into a readable format, such as 'ddmmyyyyhhmm'?
No, Harness does not support this conversion date format on variables
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/)
