#### Can you provide an example of deploying the delegate in a task-definition for Amazon Elastic Container Service (Amazon ECS)?

Certainly! You can find a step-by-step guide on how to deploy the delegate in a task-definition for ECS on our [official documentation page](https://developer.harness.io/docs/platform/delegates/install-delegates/docker-delegate-to-ecs-fargate/).

Additionally, we have a GitHub repository with a Terraform module that demonstrates the process of [deploying the delegate in ECS Fargate](https://github.com/harness-community/terraform-aws-harness-delegate-ecs-fargate/tree/main). This resource can further assist you in implementing the delegate deployment.


#### Can terraform vars in terraform step contain hyphen ?

Terraform vars are exported as shell environment variables. The shell variables itself has a restriction in their naming coonvention that it should not contain hyphen and hence this is not supported.


#### In Harness FirstGen, how can I remove the old plan-file and start again with a fresh plan to make the workflow run successfully?

You can [enable the Skip Terraform Refresh when inheriting Terraform plan option](https://developer.harness.io/docs/first-gen/continuous-delivery/terraform-category/add-terraform-scripts#option-2-skip-terraform-refresh-when-inheriting-terraform-plan).


#### How can we assign terraform output (e.g. VPC CIDR) to harness Pipeline or stage variable?

We have implemented a feature for capturing the the output of the Apply step.
You can use something like this to copy the json output in a file - 
```echo "<+pipeline.stages.EC2_deploy.spec.execution.steps.TerraformApply_1.output.TF_JSON_OUTPUT_ENCRYPTED>" > /opt/harness-delegate/aaabbb.txt```

Doc for reference - [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs)


#### What is the correct way to specify org or account level connectors in terraform resources ?
We should always prefix the scope of the connector ref before providing them in the resource file. For example if it is a org level conncetor the correct way to specify it is `org.myconnectorref`



#### Why do we get error in terraform provider that a project level resource can not be used at org level?
We have a top down hierarchy of the resources which goes account > org > project . You can refer any parent level resource at the child level but the reverse is not true. SO you should be able to reference a account level resource while creating a project level resource but not a project level resource while creating an account level resource.


#### Can we use terraform plan from one stage in apply step in another stage ?

The inherit from plan option for the terraform apply step can be used only within same stage. It is not possible to run plan step in one stage and then use inherit from plan option for apply step in another stage.


#### What is the recommended way to save the state file for terraform pipelines?

For testing scenarios you can run the terraform without remote backend for saving the terraform state file however for prodcution runs it is always recommended to start with a remote backend configured from first run.



#### Is there a way to cache terraform plugins in delegates?

Yes, one can try to set this environment variable `TF_PLUGIN_CACHE_DIR` . Also refer the following [Documentation](https://developer.hashicorp.com/terraform/cli/config/config-file#provider-plugin-cache)


####  I am working on overrides creation using Terraform. As I see according to the latest update overrides were moved from the Environments tab to a separate tab. We have a use case where I must create all the 3 types provided under service-specific overrides. How to get YAML representation for all 3 types of override

You can get the the detail under Example Usage here https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service_overrides_v2


#### How can I deploy infrastructure using a scripted method as part of my CD Stage?

One method is to use the Harness Terraform Provider. 
More information about this can be found at this link: [here](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)


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


#### Is there a way persist terraform steps working directory?
This is by design we always clean the working directory on each terraform step and working directory cannot be persisted


#### Is there a way to cache terraform plugins for harness terraform pipeline executions?

We can use the caching functionality provided by terraform for this purpose. We need to set the below environment variable for the terraform pipelines:

```
TF_PLUGIN_CACHE_DIR=/opt/harness-delegate/<plugincachedirectory>
```


#### How can one utilize outputs from the Terraform/Terragrunt apply steps effectively ?

utilizing outputs from Terraform/Terragrunt apply steps follows a similar approach. After executing the Terraform/Terragrunt apply step, the outputs are accessible in the 'Step Output' section. These outputs can be accessed using expressions. For instance, one can access an output using `<+pipeline.stages.stag1.spec.execution.steps.TerraformApply_4.output.get("test-output-name2")>`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)



#### Do we allow rotation of `harness_platform_token` in teraform resource management ?

No, we don't. Please refer more on this in the Terraform-Harness[Documentation](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_token)


#### How can one fetch the provisioner Id in a pipeline using Terraform with an expression ?

One can fetch the provisioner Id in a pipeline using expression `<+stage.pipeline.variables.HARNESS_PROVISIONER_ID>`.
Please read more on how to provision target deployment infrastructure dynamically with terraform in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform/)


#### Can we use our vault for storing terraform apply step output?

Currently, only the Harness secret manager is supported.


#### How do I encrypt for my terraform output?

Terraform output can be encrypted once you configure a secret manager for the "Encrypt JSON output" field under the optional configuration of terraform apply step.


#### Can you please provide the info on how long the secret created from the terraform apply step stays in place and how it gets overridden?

The secret will be always unique but the expression of it is the same depending on the terraforming apply step. It is stored in the secrets at the project level. The secret exists till the pipeline is not finished.
Once the pipeline failed|passed|aborted… it means the pipeline finished the execution and we clean the secret.
There is no way to control how long it is kept.


#### Are there any limitations to terraform rollback?
There are limitations to rollbacks. If, for example, modules 1 and 2 were successfully deployed, and module 3 failed, the rollback will only revert to the successful state of modules 1 and 2. However, if module 3 succeeds, and the subsequent deployment fails, the rollback will only include the state with module 3 deployed, excluding modules 1 and 2. Additionally, rollback is not possible if the Terraform Apply step is run with the Skip state storage option enabled and no Terraform backend is configured in the Terraform files. In such a scenario, using the Rollback step would be incorrectly set up and could lead to unexpected results.


#### Can one define an optional tfvar files in terraform support ?

Yes, with minimal delegate version requested `816xx` one can do so. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/optional-tf-var-files)


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


#### How do resolve terragrunt plan returning the error "fork/exec /usr/bin/terraform: argument list too long"

the "argument list too long" error is typically related to how you are passing variables and configurations to Terraform and Terragrunt. By using configuration files, and reducing the number of arguments you can resolve this issue. 
 
The same can be referred [here] (https://github.com/gruntwork-io/terragrunt/issues/2132)


#### I have a terraform code which I will need to use it deploy resources for Fastly service. And, I would like to know should I create a pipeline in CI or CD module and what's the reasoning behind it?

The decision on whether to create your pipeline in the Continuous Deployment (CD) module or Continuous Integration (CI) module depends on your specific use case and deployment strategy.

If your goal is to automate the deployment of infrastructure whenever there are changes in your code, and you are using Terraform for provisioning, it is advisable to create a pipeline in the CD module. This ensures that your application's infrastructure stays current with any code modifications, providing seamless and automated deployment.

Alternatively, if your use of Terraform is focused on provisioning infrastructure for your CI/CD pipeline itself, it is recommended to establish a pipeline in the CI module. This allows you to automate the provisioning of your pipeline infrastructure, ensuring its availability and keeping it up-to-date.

In broad terms, the CI module is typically dedicated to building and testing code, while the CD module is designed for deploying code to production. However, the specific use case and deployment strategy will guide your decision on where to create your pipeline.

It's worth noting that you also have the option to incorporate both types of processes within a single pipeline, depending on your requirements and preferences.


#### We would like to run terraform step in a pipeline with specific version of terraform and another pipelines terraform step with different version of terraform.

To achieve this use case you will need to use two different delegates with the required Terraform version installed.


#### Why terraform script file is initialising with null value in the path ?

Terraform script directory on delegate is based on some default values like org project however it also has the provisioner identifier in the path. If we are using provisioner identifier with an expression and for some reason the expression resolves to null, we will see a null in the path initialized as well.


#### Why terraform provider does not allow to change pipeline name in the input set created using terraform provider ?

The input set is associated with specific pipelines. So once it is created it can not be associated with other pipelines. That is why when you are changing the pipeline identifier it is giving you the corresponding error. I can see the same error at my end also if I try to change the pipeline identifier.

The other attributes of input set you can change in the yaml like what are the variables and their value but not the pipeline tagged.



#### Which certificate harness uses to validate connectivity to terraform Cloud end point while using terraform cloud provider ?

The terraform cloud connector will use the delegate to test the connectivity and for any task run by delegate itslef it will be utilising the jvm truststore for ssl validation of the connection. So if the terraform cloud endpoint is using a self-signed cert we need to update the delegate truststore with the cert detail for the same.


#### Can I run multiple terraform pipeline concurrently?

Terraform init command does not work if we run init for the same work directory in parallel. Hence such concurrent execution will fail with the error 'Failed to Install Provider'


#### How many versions of Terraform does Harness support ?

Harness supports the following Terraform versions: `v1.3.5, v1.1.9, v1.0.0, v0.15.5, v0.15.0 and v0.14.0`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations#terraform-version-support)


#### What is the use of terraform-config-inspect binary in delegates?

This binary is used for rendering the terraform code in the CG version and is not used for NG-related deployments.


#### What are the best possible ways to create harness deployment secrets, connectors, pipelines, etc?

Creating resources is totally up to the customer's requirement, we provide all three ways to create harness resources -
* Via Terraform
* Via UI
* Via API

The docs for API and terraform resource provider and harness docs. Please go through it and choose the one which best suits your needs -
* [API docs](https://apidocs.harness.io/)
* [Terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs)
* [Harness docs](https://developer.harness.io/docs/continuous-delivery)


#### Can we connect to a Databricks cluster ?

No, We do not have a native integration. If one is using terraform, they need to define the access block by following the [Terraform Docs](https://registry.terraform.io/providers/databricks/databricks/0.2.4/docs#authentication)
Wherever the delegate is hosted it needs network access to reach out and communicate to databricks.


#### I have a terraform apply step inside a stage with matrix or loop, I want to know if that means the underlying repo will be cloned every time the step runs for each matrix/loop item?

Yes, the underlying repo will be cloned for each run of the step in looping.


#### Create WinRM Credential using terraform.

You can automate creating winrm credential/secret key via our existing API as listed here https://apidocs.harness.io/tag/Account-Secret#operation/create-account-scoped-secret


#### What does the message "TERRAFORM_TASK_NG_V7 Task type not supported by delegate(s)" indicate ?

If we are using the assume role feature with terraform for aws connection we need a delegate version 81202 or later. If the delegate is older we get the above exception.


#### How can one migrate a service to a higher scope (if available at projeect level) ?

Currently, there's no built-in way to move or upgrade services to higher levels. When sharing a service, it needs to have a scope at either the organizational or account level. Fortunately, you can always use the terraform provider to recreate those services at a higher level.
Please read more on how to use Terraform provider in the following [Documentation](https://developer.harness.io/docs/platform/get-started/tutorials/onboard-terraform-provider)


#### What is the optimal number of ArgoCD instances required for bootstrapping environments and managing GitOps infrastructure?

The installation of the ArgoCD reconciler concurrently with environment creation streamlines the execution of GitOps practices at scale, thus mitigating the complexities associated with bootstrapping environments and managing GitOps infrastructure.
Please read more on this in our blog on [ArgoCD, Terraform and Harness](https://www.harness.io/blog/argocd-terraform-and-harness)


#### Is there a way to switch aws accounts while using native terraform step?

Yes, Harness supports an AWS Connector to have the terraform plan and apply step assume a role to perform the provisioning of infrastructure.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#aws-connector-provider-credential-authentication-for-terraform-plan-and-apply-steps)



#### Does Harness supports multiple IaC provisioners?

Harness does support multiple Iac provisioners, few examples are terraform, terragrunt, cloud formation, shell script provisioning etc. 



#### Are there any access permissions or restrictions that might be affecting the execution of Python commands within Terraform?

No We don't have any restrictions on running the python in terraform


#### How to create a Harness project from Terraform?

You need to prepare a Terraform script of the resources you want to create in your project. Before that, if you want to create a project with Terraform in an org then you need to set up all the required resources using the Terraform Provider script.  You can reference the Terraform resources from the [Harness Terraform Provider API documentation](https://registry.terraform.io/providers/harness/harness/latest/docs).


#### In terraform how do you return a null value from a `for_each`

In Terraform, you can return a null value from a `for_each` expression by using the `null` function or the `null` literal directly.
Here's an example of how you can use both approaches:

Using the `null` function:
```
variable "my_map" {
  type = map(any)
  default = {
    key1 = "value1"
    key2 = null
  }
}

resource "aws_instance" "my_instances" {
  for_each = var.my_map

  # Other resource attributes...
}
```

Using the `null` literal directly:
```
variable "my_map" {
  type = map(any)
  default = {
    key1 = "value1"
    key2 = null
  }
}

resource "aws_instance" "my_instances" {
  for_each = var.my_map

  # Other resource attributes...
}
```
Both approaches will result in `key2` in the `my_map` variable being set to a `null` value, causing Terraform to not create an instance for that key when using `for_each`.


#### How does the Encrypt json output setting work in the Terraform Apply stage?

This setting will temporarily create a secret that stores the Terraform output JSON. The secret will be created using the Harness Secret Manager provider and will be available for use during the pipeline execution. The secret is then deleted at the end of the execution. For more information, go to [Encrypt the Terraform Apply JSON outputs](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs).


#### How do I retrieve encrypted Terraform Output data from a Terraform Apply stage?

To retrieve encrypted Terraform Output data, find the `TF_JSON_OUTPUT_ENCRYPTED` output variable and reference it using a Harness expression. For example, `<+pipeline.stages.stage1.spec.execution.steps.TerraformApply_1.output.TF_JSON_OUTPUT_ENCRYPTED>`. The value will be encrypted in the Harness UI but, the values will be available in downstream steps and stages. For more information, go to [Encrypt the Terraform Apply JSON outputs](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#encrypt-the-terraform-apply-json-outputs).


#### Does Harness support storing the Terraform Plan on the Harness Delegate temporarily?

Yes, users can now store the terraform plan on the delegate and leverage it in the apply step. This now bypasses the restriction to store the plan in a secrets manager and let users store it locally.
This feature is behind the feature flag, `CDS_STORE_TERRAFORM_PLAN_FILE_LOCALLY_ON_DELEGATE`. Harness Delegate version 827xx or later is required for this feature.
Go to [Store Terraform Plan on Harness Delegate](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step/#store-terraform-plan-on-harness-delegate) and [Demo Video](https://www.loom.com/share/bc5a4f382d584b228b4ea2c82eb94a7c?sid=b9fac5c3-c11b-4f50-acff-f4fd2b3cc83a) for more information.


#### How do I get a file from a different source and use it in a terraform step during runtime?
You can have a shell script step in which you fetch the file from your corresponding source and have it stored on the delegate at any specific path and refer that path in your terraform config. You just need to ensure that your plan and apply runs on the same delegate. Below is documentation for how you can achieve that:
https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/


