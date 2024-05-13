#### How do I use OPA policy to enforce environment type for each deployment stage in a pipeline i.e. prod or preprod?

The infra details are passed as stage specs.

For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
You will have to loop across all the stages to check its infra spec.


#### What kind of payload type is supported for policy step?

Policy step is onl ysupported against a JSON payload.


#### How do I form a OPA Policy to identify pipeline source ?

In pipeline YAML, we dont have pipeline source identifer but the remote pipelines will have githubConfig section, which can be used to form any required policy.


#### How do I check what YAML is checked against the OPA policies?

The actual YAML that is passed to the OPA engine can be viewd by following these steps - 
Create any policy, and apply it on the pipeline.
Go to evaluation under the policy menu
Click on the required pipeline and open the policy, you can see the actual YAML under the "Input" window.


#### How do I filter policy evaluation by status?

Under the evaluations section of policies we have a dropdown to filter based on status of policy evaluations. Currently we only support failed and sucess status not warned/warning


#### How do I created a OPA policy to enforce environment type?

The infra details are passed as stage specs.
For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
You will have to loop across all the stages to check its infra spec.


#### How to pass variables to Rego policy language

The OPA engine is designed to enforce policies based on data and rules that are predefined and provided as policies. It does not support taking dynamic input/variable values for policy evaluation during evaluations because policies are typically intended to be static and consistent. You can add a policy step as a workaround to work with variables during executions.


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



#### Is there any way to enforce the pipeline naming convention while creating or cloning the pipeline
Currently, there is no built-in way to enforce pipeline naming conventions while creating or cloning pipelines in Harness. However, you can create a OPA policy that can be applied using the On Save event for a pipeline to enforce the naming convention. 
 
The policy can check if the pipeline name matches the repo name and deny the pipeline creation if it doesn't match. More on OPA Policy here: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/


#### Can we deploy lambda function without update-function-code policy
Harness needs this permission to modify code in lambda function and in rollback also this is needed.
Although, you can deploy a new function without this permission but can't update an existing function.


#### What is the Account setting for image pull policy for setupAddonContainer during initialize phase ?

We have Account settings named `Default Image Pull Policy For Add On Container` for image pull policy for setupAddonContainer during initialize phase.


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


#### How can one validate an issue while saving a pipeline ?

For validating an issue first one should know how we save a pipeline : 

- When user click on pipeline save, we try to validate the yaml using schema
- If pipeline contains templates, we try to fetch templates and nested templates too so that we can see any issues
- We create filters and other validations based on different types of stages
- We do policy evaluations
- Finally, inline vs remote where we have remote dependency.
- Essentially, the pipeline size, the nested structure & location can vary the response times.
If one feels like an issue for latency in API response receiving please consider above steps and take actions accordingly.


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


#### Is it possible to access the JSON/YAML input passed to the policy engine in the pipeline?

Unfortunately, you cannot refer to this JSON within the pipeline. However, you can access all evaluated policies, along with their input, through the UI.


#### Is there a method for enforcing pipeline naming conventions during pipeline creation or cloning?

At present, there is no built-in mechanism to enforce pipeline naming conventions when creating or cloning pipelines in Harness. Nevertheless, you can establish an OPA policy and apply it using the On Save event for a pipeline to enforce the naming convention.


#### Does OPA policy evaluate by resolving expressions present in pipeline YAML?

Unfortunately, Runtime input variables can not be evaluated just by OPA policy. You can implement policy steps in the pipeline to run the policy against the provided variable value.


#### Is there a way to simply update the ECS scaling policy without redeploying the ECS service ?

Many users opt for a shell script approach, where a configuration file is utilized and set as an environment variable. Subsequently, a shell script is crafted to execute the relevant AWS CLI commands, facilitating the update of scaling policies for a deployed service. This versatile method allows for customization and automation across various scenarios and configurations


#### How do we know if a deployment is failing due to Service Control Policy implemented in our AWS account.

If there is any restriction from SCP you will get error with an explicit deny in a service control policy.

 User: arn:aws:iam::7799:user/JohnDoe is not authorized to perform: codecommit:ListRepositories because no service control policy allows the codecommit:ListRespositories action


#### What do we mean by the term delegate expiration ?

Delegates expire after six months. Delegate expiration does not mean the delegate stops working. You may experience issues because the backend has moved too far ahead, and the delegate is no longer backward compatible.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#delegate-expiration-policy). Also find release notes based on delegates - [here](https://developer.harness.io/release-notes/delegate/)


#### Why is the GitConfig block not available for remote pipeline policy evaluation?

Policies are evaluated first in case of pipelines being saved and for the first time, we create the pipeline inline and then perform git sync to sync the file with git repo. This may cause a false alert for the first save but should not have an issue in the next modifications.


#### What limitations in Go template rendering of manifests compared to Helm have been identified, and how has the decision been made to address this issue by running it as a Helm job ?

Helm template can render the manifests but Go template cannot. There are limitations in the go template. One may run it as a helm job.
**Note**
- In case of Helm template and application of network policy update with usage of Blue-Green or Canary deployments, please try to run the apply step and apply the network policies before deploying
  Please read more on Apply Step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/)


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


#### Can one implement a system that enables customers to define quotas or limits for Service Instances ?

No, we don’t have a mechanism to let users cap their service instance below their subscribed amount and have the system warn you. But, one can always bake an OPA policy step that triggers a warning in their pipelines if their quota is reached.
Please read more on OPA policy step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)


#### What permissions are required to restrict access to creating or editing OPA policies ?

To control the ability to create or edit OPA policies, consider utilizing the `core_governancePolicy_edit` policy. For a comprehensive list of permissions, please refer to the provided [Documentation](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference#governance-policies).


#### Is there a method to configure the Harness GitOps agent auto updater to utilize our Artifactory proxy for Docker Hub, considering policy of not allowing Kubernetes clusters to access the public internet directly ?

Organizations can import the GitOps Image from the specified [Docker Hub repository](https://hub.docker.com/r/harness/gitops-agent/tags) into their JFrog Artifactory. However, utilizing the auto updater feature may not be feasible in this scenario. Nonetheless, manual copying of the image to the Artifactory and subsequent pulling from there remains an alternative approach.
Please read more on Harness GitOps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/)


####  Can one use OPA policies for Terraform Lint?

Yes, for Infrastructure as Code Management (IaCM) within Continuous Delivery (CD), you can use OPA (Open Policy Agent) policies for Terraform linting. 
- For CD, you need to export the lint to a variable, limited to `256KB`, and pass it to the policy step, as we don't have a native lint step. 
- For IaCM, while there isn't a built-in `tflint` step, it can be accomplished using a plugin. OPA policies can be written against Terraform plan, workspace, and state for enforcing governance.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)


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


####  How to ensure a stage with a step group appears before a stage with a deployment of kubernetes

You can create a OPA policy to ensure this.


#### How can I force a template consumer to a new version?

One can use the provided OPA policies to enforce. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/governance/policy-as-code/sample-policy-use-case)


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


#### What is Harness' pipeline execution history retention policy?

[Harness retains pipeline execution data for 6 months.](https://developer.harness.io/docs/platform/references/data-retention)


#### Can one effectively enforce the reconciliation of changes in the template with consuming pipelines in a forceful manner?

Yes, one can utilize Open Policy Agent (OPA) to enforce the use of a stable template, ensuring consistency across consuming pipelines.
Here's an example OPA policy:
```yaml
package pipeline

template := "account.deploystagetemplate"
stableVersion := "v2"


# Deny a pipeline if the stage uses the template above
# without the stable version stated
deny[msg] {
	stage = input.pipeline.stages[_].stage

	# Check if the stage matches but doesn't have a template
	stage.template.templateRef == template
	stage.template.versionLabel != stableVersion

	# Show a human-friendly error message
	msg = sprintf(
		"Stage %s, has template %s, with version %s, it should be version %s",
		[stage.name, template, stage.template.versionLabel, stableVersion],
	)
}
```
You can always update the template versions manually. Go to [Reconcile Pipeline Templates](https://developer.harness.io/docs/platform/templates/reconcile-pipeline-templates/) for more information. 


#### Does Harness enforce any policy that denies the fetching of the latest tag of an image, as indicated by the error message : `admission webhook: <webhook-name> denied the request. Validation error: An image tag is required. rule require-image-tag failed at path`?

Harness does not enforce any policy regarding fetching the latest image tags.
To debug this error, consider the following implementations:
- Ensure the correct image tag is specified in the YAML configuration.
- For more details, go to [Latest Published Tag](https://developer.harness.io/kb/continuous-delivery/articles/last-published-tag/).


#### How can I prevent Terraform state drift caused by AWS ECR permissions policies created by Harness?

There are a couple of approaches you can take to mitigate this issue:

- Pre-create ECR repository: To avoid state drift, consider creating the ECR repository with the necessary permissions beforehand. Create an IAM policy that grants the required permissions for Harness actions, such as creating and updating services, tasks, and container instances. Attach this policy to the IAM role used by the ECS cluster. By doing this, ensure that the ECR repository has the correct permissions from the start, reducing the likelihood of drift.
- Modify Harness AWS connector permissions: Another option is to prevent Harness from altering IAM policies by adjusting the permissions within the Harness AWS connector. However, be cautious with this approach as it may impact the functionality of your deployment pipeline. Removing permissions related to the IAM policy from the Harness AWS connector can prevent unwanted changes to ECR permissions policies. Evaluate the impact on your workflow before implementing this solution.

By managing permissions and considering the implications of changes made by Harness, you can effectively address Terraform state drift and maintain the stability of your deployment environment.


#### What ECR permissions policy that Harness create as part of the AWS Lambda service deployment?
Harness creates the policy which is essential for performing various ECS-related actions like creating and updating services, tasks, and container instances.


#### How to avoid Harness creating a permissions policy and applying it to an AWS ECR repository that we are specifying as an artifact location for our AWS Lambda deployment configuration in Harness. These permissions are creating Terraform state drift on the ECR repository?
To prevent Terraform state drift, we recommend that you create the ECR repository with the required permissions beforehand. This can be achieved by crafting an IAM policy that grants the necessary permissions and attaching it to the IAM role utilized by the ECS cluster.

Alternatively, you can prevent Harness from altering IAM policies by removing the relevant permissions from the Harness AWS connector. However, this could affect the functionality of your deployment pipeline.


#### How can policy evaluations be conducted through an API?
Currently, we cannot do policy evaluations via APIs.


