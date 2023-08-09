---
title: Provision target deployment infrastructure dynamically with CloudFormation
description: Provision a CD stage's target deployment infra using CloudFormation.
sidebar_position: 3
helpdocs_topic_id: 6jfl7i6a5u
helpdocs_category_id: mlqlmg0tww
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use CloudFormation in Harness CD pipeline stages for ad hoc provisioning or to provision the target deployment infrastructure for the stage. Provisioning the target deployment infrastructure is called **dynamic provisioning**.

This topic provides a brief overview of the steps involved in dynamic provisioning using the **CloudFormation Create Stack** step.

This topic also covers some important requirements.

## Important notes

Dynamic provisioning is limited to what is available in the target environment.

For example, the cloud-agnostic Kubernetes Cluster Connector requires that you have an existing cluster, so you cannot provision a new cluster. But it does let you provision a namespace.

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-00.png)

## CloudFormation dynamic provisioning summary

Setting up dynamic provisioning involves adding a CloudFormation template to the **Environment** settings of the stage that provisions the pipeline stage's target infrastructure.

Next, you map the required script outputs to the Harness **Infrastructure Definition** for the stage, such as the target namespace.

During deployment, Harness provisions the target deployment infrastructure and then the stage's **Execution** steps deploy to that provisioned infrastructure.

### Dynamic provisioning steps for different deployment types

Each of the deployment types Harness supports (Kubernetes, AWS ECS, etc.) require that you map different CloudFormation template outputs to the Harness infrastructure settings in the pipeline stage.

To see how to set up dynamic provisioning for each deployment type, go to the following topics:

- [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure)
  - The Kubernetes infrastructure is also used for Helm, Native Helm, and Kustomize deployment types.
- [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- [Spot Elastigroup](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment)
- [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions)
- [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-lambda-cd-quickstart)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)	
- [Windows VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)



## Dynamic provisioning steps

When you enable dynamic provisioning in a CD Deploy stage's **Environment** settings, Harness automatically adds the necessary Harness CloudFormation steps:

- **Create Stack** step: this step connects Harness to your CloudFormation template repo and applies your CloudFormation templates.
- **Approval step**: Harness adds a Manual Approval step between the Create Stack and Delete Stack steps. You can remove this step or follow the steps in [Using Manual Harness Approval Steps in CD Stages](../../x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages) to configure the step.
  - You can also use a [Jira or ServiceNow Approval](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-jira-and-service-now-approval-steps-in-cd-stages) step.
- **Delete Stack** step: you can use the Delete Stack step to remove resources provisioned by the Create Stack step.

### Create Stack step

You use the Create Stack step in the **Environment** section of a CD stage to perform dynamic provisioning.

You add your provisioning CloudFormation template to the step. Then, at runtime,  the step provisions the target infrastructure.

You map the required CloudFormation template outputs to the stage's Infrastructure Definition settings to ensure that the provisioned infrastructure is used as the stage deployment target infrastructure.

For details on configuring the **Create Stack** step, go to [Provision with the CloudFormation Create Stack step](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step).

### AWS Connector


In the Create Stack step, you will add or select a Harness [AWS Connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/) that will be used for this step. The AWS Connector will include the credentials needed to perform the provisioning.

1. Add or select the Harness [AWS Connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference) that will be used for this step. The AWS Connector will include the credentials needed to perform the provisioning.


The credentials required for provisioning depend on what you are provisioning.

For example, if you wanted to give full access to create and manage EKS clusters, you could use a policy like this:


```json
{  
     "Version": "2012-10-17",  
     "Statement": [  
         {  
             "Effect": "Allow",  
             "Action": [  
                 "autoscaling:*",  
                 "cloudformation:*",  
                 "ec2:*",  
                 "eks:*",  
                 "iam:*",  
                 "ssm:*"  
             ],  
             "Resource": "*"  
         }  
     ]  
 }
```
Ensure that the credentials include the `ec2:DescribeRegions` policy described in [AWS Connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference).

See [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) from AWS.

### Region

1. Select the region for the resources you are provisioning.

### Template File

You can add your template in the following ways:

* **Inline:** just enter the template in **Template File**. You can use CloudFormation-compliant JSON or YAML.
* **AWS S3:** enter the URL of the S3 bucket containing the template file. This can be a public or private URL. If you use a private URL, the AWS credentials in the **AWS Connector** setting are used for authentication. Ensure that the credentials include the **AmazonS3ReadOnlyAccess** policy and the `ec2:DescribeRegions` policy described in [AWS Connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference).
* **Remote:** select a Git repo where you template is located. You'll add or select a Harness Git Connector for the repo. See [Code Repo Connectors](https://newdocs.helpdocs.io/category/xyexvcc206).

#### Expression and Secret Support in Templates

Harness expressions and secrets can be used in templates. They are resolved at runtime.

See:

* [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets)
* [Built-in and Custom Harness Variables Reference](/docs/platform/12_Variables-and-Expressions/harness-variables.md)

### Stack Name

1. Enter a name for the CloudFormation stack Harness will create.

This is the same as the `--stack-name` option in the `aws cloudformation create-stack` command.

```
aws cloudformation create-stack --stack-name test --template-body file://eks.yml
```

### CloudFormation Parameter Files

You can use CloudFormation parameters files to specify input parameters for the stack.

This is the same as using the AWS CloudFormation CLI `create-stack` option `--parameters` and a JSON parameters file:


```
aws cloudformation create-stack --stackname startmyinstance  
--template-body file:///some/local/path/templates/startmyinstance.json  
--parameters https://your-bucket-name.s3.amazonaws.com/params/startmyinstance-parameters.json
```

Where the JSON file contains parameters such as these:

```json
[  
  {  
    "ParameterKey": "KeyPairName",  
    "ParameterValue": "MyKey"  
  },   
  {  
    "ParameterKey": "InstanceType",  
    "ParameterValue": "m1.micro"  
  }  
]
```

1. In **Cloud Formation Parameter Files**, click **Add**.
2. In **Parameter File Connector**, select your Git platform, and the select or add a Git Connector. See [Code Repo Connectors](https://newdocs.helpdocs.io/category/xyexvcc206) for steps on adding a Git Connector.
   
   For AWS S3, see [Add an AWS Connector](/docs/platform/Connectors/Cloud-providers/add-aws-connector).
3. In **Parameter File Details**, enter the following:

   + **Identifier:** enter an Identifier for the file. This is just a name that indicates what the parameters are for.
   + **Repo Name:** if the Git Connector does not have the repo path, enter it here.
   + **Git Fetch Type:** select **Latest from Branch** or use a Git commit Id or tag.
   + **Parameter File Details:** enter the path to the file from the root of the repo. To add multiple files, click **Add Path File**.

Here's an example:

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-03.png)

#### Encrypted Text Secrets and Expressions in Parameter Files and Settings

Harness expressions and secrets can be used in parameter files and in the **Parameter File Details** settings. They are resolved at runtime.

See:

* [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets)
* [Built-in and Custom Harness Variables Reference](/docs/platform/12_Variables-and-Expressions/harness-variables.md)

### CloudFormation Parameters Overrides

You can override parameters added in **Parameter File Details**.

In **CloudFormation Parameters Overrides**, click **Specify Inline Parameters**.

In **CloudFormation Parameters Overrides**, click **Retrieve Names from template** to retrieve the parameters from the JSON file. You can also manually enter the names and values.

For each parameter you want to override, enter a new values in **Value**.

Harness text secrets are supported. See [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

### Role ARN

Enter the AWS Role ARN to use when creating the stack. Use an existing AWS Identity and Access Management (IAM) service role that CloudFormation can assume.

This is the same as the role you would use when creating a stack using the AWS console [Permissions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-add-tags.html) setting or CLI.

See [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) from AWS.

### Specify Capabilities

To acknowledge the capabilities in the CloudFormation template, click in **Specify Capabilities** and select capabilities.

This acknowledges that the template contains certain capabilities (for example, `CAPABILITY_AUTO_EXPAND`), giving AWS CloudFormation the specified capabilities before it creates the stack. This is the same as using the `--capabilities` option in the `aws cloudformation create-stack` CLI command. See [create-stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/create-stack.html).

### Tags

Tags are arbitrary key-value pairs that can be used to identify your stack for purposes such as cost allocation.

A **Key** consists of any alphanumeric characters or spaces. Tag keys can be up to 127 characters long.

A **Value** consists of any alphanumeric characters or spaces. Tag values can be up to 255 characters long.

1. Enter the tags in JSON or YAML (lowercase is required).

JSON example:

```json
{
  "Key" : String,
  "Value" : String
}
```

YAML example:

```yaml
Key: String
Value: String
```

Harness supports [CloudFormation-compliant JSON or YAML for tags](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).

### Continue based on stack statuses

In **Continue Based on Stack Statuses**, you can add the stack states that allow provisioning.

Harness checks if the stack is in `ROLLBACK_COMPLETE` state before the deployment. If present, Harness deletes the stack and then triggers the deployment.

## Advanced settings

In **Advanced**, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/Governance/Policy-as-code/harness-governance-overview)

## Map outputs to target infra settings

Now that the Create Stack step is set up in **Dynamic provisioning**, Harness is configured to provision the infrastructure defined in your CloudFormation template.

There are two options:

1. If you are simply provisioning a resource in your deployment infrastructure that is not intended as the deployment target, such as an AWS secret, you can define the deployment target in **Infrastructure Definition** as you would if you were not provisioning anything.
2. If you will deploy directly into the provisioned resource as part of the deployment target, you need to provide the required **Infrastructure Definition** settings so Harness can target and deploy to the provisioned infrastructure.

We'll cover option 2.

The required settings are specific outputs from your CloudFormation template. Which settings are required depends on the type of target infrastructure you are provisioning/targeting.

For example, a platform-agnostic Kubernetes cluster infrastructure only requires the target namespace in the target cluster.

To map the CloudFormation template output to the Infrastructure Definition setting, ensure that the template has the CloudFormation Output defined.

In the **Infrastructure Definition** setting, select **Expression**:

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-05.png)

In the setting, enter a Harness expression that references the output.

The expressions follow the format:

`<+infrastructureDefinition.provisioner.steps.[Create Stack step Id].output.[output name]>`

You can find the Id in the step:

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-06.png)

For example, for a Kubernetes deployment, you need to map the `namespace` output to the **Namespace** setting in Infrastructure Definition.

So for a Create Stack step with the Id **create123** and an output named **namespace**, the expression is:

`<+infrastructureDefinition.provisioner.steps.create123.output.namespace>`

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-07.png)

Now Harness has the provisioned target infrastructure set up.


## Approval step

By default, Harness adds an Approval step between the Create Stack and Delete Stack steps. You can remove this step or follow the steps in [Using Manual Harness Approval Steps in CD Stages](../../x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages.md) to configure the step.

You can also use other Approval step types.

Ensure that the credentials include the `ec2:DescribeRegions` policy described in [AWS connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/).

See also: [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) from AWS.


## CloudFormation Rollback Stack step

The CloudFormation Rollback Step is automatically added to the **Rollback** section.

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-08.png)

When rollback happens, Harness runs the last successfully provisioned version of the stack.

In the  **CloudFormation Rollback Stack** step, in **Provisioner Identifier**, enter the same provisioner identifier you used in the Create Stack step.

Harness determines what to rollback using a combination of `Provisioner Identifier + Harness account id + Harness org id + Harness project id`.

If you've made these settings expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

## Summary

Now that you have the Create Stack and Rollback Stack steps set up, when you run your Pipeline Harness will provision your CloudFormation stack and perform rollback on failure.

