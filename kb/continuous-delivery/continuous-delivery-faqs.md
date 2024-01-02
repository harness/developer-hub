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

We can set up the AWS Secret Manager connector, then save the ECR auth token into it. Set up automatic token rotation (say at 10hr intervals) within AWS secret manager. Then have the Harness connector link to that AWS SecretManager secret, so it pulls a fresh token every time.

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

You can use artifact.tag in NG , which is equivalent to artifact.buildNo from CG, you can find more details around mapping in : [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#migrating-firstgen-expressions-to-nextgen)

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

Yes, the Harness GitOps Agent is designed to work with various Kubernetes distributions, including managed Kubernetes services like Amazon EKS, Google Kubernetes Engine (GKE), and Azure Kubernetes Service (AKS), as well as self-hosted Kubernetes clusters.

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
 
[Documentation](https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-for-pipelines)
  
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
See site for more details [here](https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/).

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

#### I have a placmenetStrategy defined but I don't see it reflected in the task.
Please check if you have defined placement strategy in service definition and not under task definition

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
Harness CD pipelines help you to orchestrate and automate your Google Cloud Function deployments and push updated functions to Google Cloud.

See more on this here : [Documentation](https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func/)

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

#### What documents bundle should I refer to when migrating from CG to NG ?

On migration you can refer the following documentations for assistance :
- [Migrator GH](https://github.com/harness/migrator)
- [Comparison page to compare different aspects](https://developer.harness.io/docs/get-started/harness-first-gen-vs-harness-next-gen)
- [Feature Parity Matrix](https://developer.harness.io/assets/files/FirstGen%20and%20NextGen%20CD%20feature%20parity%20matrix-43d79b7d53d3a9abfda19ffa59c6ea78.pdf)
- [CDNG Upgrade Faq](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/cdng-upgrade-faq/)
- [Recording for Project V/S Application](https://www.loom.com/share/62f698a3820e4542a471e4d40d41c686?sid=3dc6f3b9-9369-4133-9452-08795c597351)

#### Is there a way to enforce a specific duration on a canary deployment?

No. There is no particular way to enforce duration, Canary deployment lives until you delete it.

#### Is it necessary for the infrastructure definition in a First Gen workflow to be mandatory ENTITY type for it to work correctly with allowed values?

Yes, it is mandatory for the infrastructure definition in a First Gen workflow to be enitity type.

#### Can Harness able to monitor for when a particular image tag changes on DockerHub in order to initiate a hands-free build and push to our repo?

Yes, You can setup a trigger based on the image tag changes on DockerHub repo as suggested in this[ doc.](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/)

#### Why can't I refer to an output within a CD stage using a looping strategy anymore? 
If you're using an absolute expression (for example: `<+pipeline.stages.stage_identifier>`), it will break your pipeline because matrices create a new identifier per iteration (`stage_1`, `stage_2`). To avoid your pipeline breaking, you can shortcut your expression to the step name (for example: `<+steps.step_identifier>`), and then you don't need to specify the stage identifier.

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


- ##### Terraform or APIs Used for Initial Configuration:

   - If the customer initially created the Harness configuration using Terraform, they can easily change the organization identifier by modifying the configuration file.
Likewise, if APIs were used for the initial configuration, the same approach applies to change the organization identifier.
- ##### Creation from UI:

   - If the customer originally created the configuration through the user interface (UI), a different process is required.
In such cases, the customer can follow these steps:
   - Utilize GET APIs to retrieve the existing configuration.
   - Create a new configuration for the new organization using the create APIs.
   - This allows for the necessary overrides and adaptations as needed for the new organization's requirements.

Please refer more on this in the following Documentation : [Get Service Overrides](https://apidocs.harness.io/tag/ServiceOverrides#operation/getServiceOverrides) and [Create Service Overrides](https://apidocs.harness.io/tag/ServiceOverrides#operation/createServiceOverride)


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
[Documentataion](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)

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

Github
Gitlab
Bitbucket
Generic Git Provider
Custom Remote Source Repository
Google Cloud Storage
Amazon S3 Storage
Helm OCI Repository (ACR, ECR, GAR, Artifactory)
Helm HTTP Server Repository (Nexus, Artifactory)
Harness Local File Store

#### What are some of the Artifact Repository for Container images to deploy with Chart?

DockerHub
Amazon Elastic Container Registry
Google Container Registry
Azure Container Registry
Custom Artifact Source
Google Artifact Registry
GitHub Package Registry
Nexus 3
Artifactory

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

Yes, it is possible to create a single custom plugin that can be used in both the CI and CD modules. The documentation for creating custom plugins is similar for both modules, and the same plugin can be used in both. The only difference is in how the plugin is used in the pipeline. In the CI module, the plugin is used in a Plugin step, while in the CD module, it is used in a Containerized step. As long as the plugin is designed to work in both types of steps, it can be used in both modules.
Sources: https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step

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

Harness delegates do not control AWS profiles, this is likely configured manually through the delegate by the user and should be reviewed by the author.

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

One can refer to the following [Documentation](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#migrating-firstgen-expressions-to-nextgen)

Please read more on `workflow variables` in the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/workflows/add-workflow-variables-new-template/)

Please read more on `regular platform variables` in the following [Documentation](https://developer.harness.io/tutorials/cd-pipelines/variables/)

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

Yes, based on plan we have such restrictions. Please read more on this in following [Documentation](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/pipeline-settings/)

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

Hanress uses private keys to secure the Github App in the platform which ensures the security maintenance of the Github public App as well !

#### What is the limitation time limit for a pipeline execution ?

The proposed times are `35 days` for Paid customers, and `4 hours` for Verified Free customers.
This is taken affect as an enhancement from before with following reasons :
- The total number of pipelines that the customer can run is limited. If some pipelines run/wait for months, they take up valuable resources from other projects in the account.
- Most times, very long running pipelines are waiting on something (approvals, test results, deployments) that took longer than expected. A quicker timeout will raise the issue to the account users that something went wrong, instead of indefinitely waiting.
- Long running pipelines are a drain on our resources as well.

Please read more on this in the following Documentations:
- [Document on deloyment logs](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations)
- [Document on pipeline settings](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/pipeline-settings/)

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

### "Is there an expression, such as '\<+pipeline.stages.Deploy.strategy.finalStatus>', to get the status of a stage outside of the looping strategy?"
The expression "\<+strategy.currentStatus>" only works within the context of the looping strategy, there is no expression like "\<+pipeline.stages.Deploy.strategy.finalStatus>" to get the status of a stage outside of the looping strategy.

You can try using the expression "\<+pipeline.stages.STAGE_ID.status>" to get the status of a specific stage.

### Unable to edit Delegate profiles in NextGen
DelegateProfile is deprecated in Harness NextGen, and you can leverage INIT_SCRIPT to run scripts at delegate startup. There is no option to associate Delegate configurations with delegates in Harness NextGen.

### I have a pipeline containing different stages DEV-QA-UAT-PROD. In UAT I'm using Canary deployment and in PROD it's Blue-Green. In these scenarios how Harness provides proper Roll Back strategies?
Harness provides a declarative rollback feature that can perform rollbacks effectively in different deployment scenarios.
 
For Canary deployment in UAT, you can define the percentage of traffic to route to the new version and set up conditions to switch traffic between the old and new versions. If an anomaly is detected during the canary deployment, Harness will automatically trigger a rollback to the previous version.
 
For Blue-Green deployment in PROD, you can define the conditions to switch traffic between the blue and green environments. If an issue is detected in the green environment, you can easily switch back to the blue environment using the declarative rollback feature.
 
You can define the failure strategy on stages and steps in your pipeline to set up proper rollback strategies. You can add a failure strategy in the deploy stage by either ignoring the failure for the shell script or getting a manual intervention where you can mark that step as a success. Additionally, you can use the declarative rollback feature provided by Harness to perform rollbacks effectively in different deployment scenarios.


### We have a parent pipeline with the child pipelines and wanted to know if there is any built-in variable to check if the pipeline is triggered by another pipeline. 
There is no built-in variable to check if a pipeline is triggered by another pipeline. Even if a pipeline is triggered by another pipeline, it will still be considered a "Manual" trigger type. You may need to use a custom variable or some other method to track this information.

### After moving the pipeline source code from Inline to Repository. Is there a way to roll back this change as we cannot find it in the UI?
No, You should not face any issues with the trigger when it comes to inline or remote pipeline. There is no way to roll back. 
 
However, you can copy the yaml from your git and create a new inline pipeline in Harness or you can use the import from remote option and create a new remote pipeline let us know if you encounter any issues with the trigger we will help you with the next steps.

### Is it possible to remove permissible actions from the Wait Step?
No, it is not possible to remove the permissible actions from the Wait Step. The Wait Step provides the options to Mark as Success and Mark as Failed, which are necessary for the step to proceed with the pipeline execution. 

### How to change the pipeline source code back from the repository to inline? Is there a way to roll back this change as we cannot find it in the UI?
There is no way to roll back, You can copy the yaml from your git and create a new inline pipeline in Harness or you can use the import from remote option and create a new remote pipeline. 

### Is it possible to remove permissible actions from the Wait Step?
No, removing the permissible actions from the Wait Step is not possible. The Wait Step provides the options to Mark as Success and Mark as Failed, which are necessary for the step to proceed with the pipeline execution. 

However, you can set a failure strategy for the Wait Step to ensure that the pipeline execution fails if the step is marked as failed. Additionally, you can set a longer timeout duration to ensure that the mandatory waiting time is enforced.

### We want our helm deployments through Harness to wait for the objects to be in the ready state and then only exit with status. Currently, it is executing helm upgrade and exiting but we wanted to run something like this: helm upgrade --install --atomic --timeout 20m \<release_name> \<chart_name> How can we do this with Harness?

Using --atomic and --timeout flags to the Helm command in the "Command" field of the "Helm Deployment" step. This should work to ensure that the deployment waits for the objects to be in the ready state and then exits with status.
 
However, please note that the --timeout flag specifies the time to wait for any individual Kubernetes operation (like creating a pod or service) to complete, not the time to wait for all objects to be in the ready state. So if you have a large number of objects to deploy, you may need to increase the timeout value accordingly.
 
Also, please make sure that your Helm chart includes the necessary readiness probes for your objects to be considered ready by Kubernetes. Harness will wait for the readiness probes to pass before considering the deployment successful.

### To store my shell script when I use Harness File Store I don’t see any option like Bitbucket, or GitHub.
As of today, we have only two options to select the shell script provision script. That is inline and Harness file store.

### How can I specify to use the account connector during migration?
This config will do that  connector-scope: accountIn case you want to do it connector to connector basis you can refer to this - https://harness.github.io/migrator/advanced/overrides-and-settings

### How to download pipeline logs based on the given pipeline execution key?
You can use the cURL command to download pipeline logs based on the given pipeline execution key. Here's an example command:
```
curl 'https://app.harness.io/gateway/log-service/blob/download?accountID=ACCOUNT_ID&prefix=PIPELINE_EXECUTION_PREFIX_KEY' \
  -X 'POST' \
  -H 'authorization: <Bearer TOKEN>' \
  -H 'content-type: application/json' \
  -H 'x-harness-token: <HARNESS-TOKEN>' \
  --compressed
  ```
Replace ACCOUNT_ID, PIPELINE_EXECUTION_PREFIX_KEY, TOKEN, and HARNESS-TOKEN with your own values. You can find the PIPELINE_EXECUTION_PREFIX_KEY by going to the Builds page in Harness and selecting the pipeline execution you want to download logs for. The TOKEN and HARNESS-TOKEN can be obtained by following the steps.

### Is it possible to publish some custom data like outputs from the variables or custom messages, strings (any information basically) in the Artifacts tab?
The only way to publish data in the Artifacts tab is by providing a URL to a publicly accessible location where the artifact is stored. If you do not have any public buckets, you can consider using a private bucket and generating a pre-signed URL to access the artifact. 
 
This URL can be used in the file_urls setting of the Artifact Metadata Publisher plugin to publish the artifact in the Artifacts tab. Another option is to use a different cloud storage provider that allows you to generate temporary URLs for private objects, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.

### How to pass the dynamic tag of the image from the CI pipeline to the CD Pipeline to pull the image.
A project or org or account level variable can be created and A shell_script/Run Step can be added in the P1 pipeline to export or output the required variable then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable

### "How can I dynamically reference step group IDs within a loop, such as loop_0, loop_1, loop_2, as they change dynamically?"
You can achieve this usecase using the expression \<+execution.steps.step-group-id\<+strategy.identifierPostFix>.steps.step-id.output.outputVariables.var>

### How does Harness GitOps ensure consistency between the desired state of infrastructure and its actual state?

Harness GitOps ensures consistency between the desired state of infrastructure and its actual state by continuously monitoring the desired state in Git and syncing it with the live state in the Kubernetes cluster using an operator. 

This ensures that the target state (cluster) is continually converged with the desired state (manifests), making the deployed applications and infrastructures fully-traceable and fully-versioned artifacts.

### How do Harness CD SSH deployments handle authentication and authorization for remote servers?
To authenticate and authorize remote servers for SSH deployments, Harness CD uses SSH Private Key to authenticate to the remote VM/server. For steps, you can refer to Passwordless SSH using public-private key pairs.

#### How to refer to the name and identifier for Infrastructure Definition using build-in variables from another stage?
ENV details can be referred from the previous stage using output expressions of that stage.

#### How to Make Two Stages Run on the Same Delegate Pod?
For your use case to run both stages in one pod, you can refer to this doc - https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/
With this, you can configure steps in the same pod.

#### How do I pass parameters for the docker run command?
In the build and push step, we have a section called build arguments, this can be leveraged to pass build arguments.
To run docker commands, as part of your build process, please refer to this doc - https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage/

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

### Are policies supported in a GitOps application?
OPA policies are not supported in a GitOps application in Harness. Currently, it is supported for pipelines, templates and flags.

### How to disable auto sync for production environments only within the GitOps app
You can update the RBAC to disable auto-sync for the entire GitOps app, but this may not be ideal if you want to enable auto-sync for other environments within the app.

### How the order or precedence of file in the k8sdeploy component is used when multiple values yaml were used.
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

#### Every time when I run kubernetes deployment, harness create new version of configmap even of there were no changes which force pods redeployment. Is there a way to specify for harness to create new configmap only when changes detected?

You can skip the versioning, it can be skipped by using these two ways:
 
Annotate the manifest provided in the Harness service's Manifests section with harness.io/skip-versioning: "true".
 
In the Harness service's Manifest Configuration page, select Manifests > Advanced, and then select the Skip Versioning checkbox.
 
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

### Are policies supported in a GitOps application?
Policies are not supported in a GitOps application in Harness. Currently, it is supported for pipelines, templates and flags.

### How can I check if the CloudFormation Stack is created successfully?

After running the pipeline, you can check your AWS Management console for CloudFormation to verify the creation of the new CloudFormation Stack.

### How do I create a Google Cloud Storage bucket in the Google Cloud console?

You can create a Google Cloud Storage bucket by logging into the Google Cloud console and following the steps outlined in the Create new Bucket documentation: https://cloud.google.com/storage/docs/creating-buckets

### Which storage options does Harness support for Google Cloud Functions 1st gen?

For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.

### What are the limitations when using Google Cloud Functions 2nd gen with Harness?

Harness does not currently support Google Cloud Source Repository for Google Cloud Functions 2nd gen. Only Google Cloud Storage is supported for this version.

### Can access to specific environments be restricted for users or user groups?

Yes, access to specific environments can be restricted to users or user groups. By creating resource groups, and roles, and assigning permissions, users or groups can be limited to deploying to specific environments only.

### What role do environment variables play, and where can they be utilized?

Environment variables serve as global variables for a specific environment. These variables can be leveraged in pipelines, manifests, and other configurations associated with that environment.

### How are service configurations overridden in specific environments?

Service configuration overrides allow you to override service properties when deploying into a particular environment. This flexibility enables you to customize settings based on the target environment.

### Can an environment have multiple infrastructure definitions?

Yes, an environment can contain multiple infrastructure definitions, each representing a specific VM, Kubernetes cluster, or target infrastructure. When selecting an environment in a pipeline, you can choose from these definitions.

### What is the role of Environment Service Overrides in override priority?

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

#### What are the Feature Flags required for Git Experience ?

Feature Flags for Git Experience usage are - `CDS_ENV_GITX`, ` CDS_INFRA_GITX` and  `CDS_SERVICE_GITX`

#### How does Harness provide enhanced control to users in the deployment sequence for applying autoscaling policies in ECS Blue-Green deplotment ?

 Harness exposes further control to users when in the deployment sequence they want to apply the autoscaling policies. This ensures that the existing containers are not impacted during release and after release it scales down based on traffic demand.
 Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#enable-auto-scaling-in-swap-step)

#### How does Harness conduct pre-deployment validations and manage ECS Blue and Green services by updating tags based on target groups before initiating the deployment?

Harness performs some validations before the deployment. Before the deployment, Harness identifies ECS Blue and Green services based on the target group and updates tags accordingly. It then starts the deployment. One may enable the Feature Flag - `CDS_ECS_BG_VALIDATION` to use the feature on account. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#ecs-blue-green-service-validation)

#### What can cause this error : There are no eligible delegates available in the account to execute the task. Non active delegates , `TERRAGRUNT_PLAN_TASK_NG_V2` Task type not supported by delegate(s) ?

Please check if the delegate versions are mismatched via init_scripts and are based on latest version or not.
Also one can go through [Delegate FAQs](https://developer.harness.io/docs/faqs/harness-delegate-faqs/) for more insights.

#### What is the proper method for constructing a Harness pipeline to execute a rolling restart of a service, analogous to the "kubectl rollout restart deployment `<deploymentName>` " command ?

Hanress uses `patchManifest` stage type with `LAST_ROLLOUT = now()` in Spinnaker to achieve it today. Please read more on this in the Spinnaker [Documentation](https://spinnaker.io/docs/guides/user/kubernetes-v2/patch-manifest/)

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

Yes, the feature `Artifact Bundle Support with Tanzu Application Deployments` associated behind the FF - `CDS_ENABLE_TAS_ARTIFACT_AS_MANIFEST_SOURCE_NG` now enables the acceptance of any artifact bundle, including those with bundled artifacts and manifests, from any artifact source in zip format. This allows deployment with Tanzu Application Service Deployment Swimlanes. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart#add-the-manifest-and-artifact-as-an-artifact-bundle)

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
