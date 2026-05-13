---
title: Provision target deployment infrastructure dynamically with CloudFormation
description: Provision a CD stage's target deployment infra using CloudFormation.
sidebar_position: 3
sidebar_label: Provision Infrastructure Dynamically
helpdocs_topic_id: 6jfl7i6a5u
helpdocs_category_id: mlqlmg0tww
helpdocs_is_private: false
helpdocs_is_published: true
keywords:
  - cloudformation
  - dynamic provisioning
  - infrastructure provisioning
  - cd pipeline
  - aws cloudformation
tags:
  - cloudformation
  - continuous-delivery
  - aws
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import DocImage from '@site/src/components/DocImage';

You can use CloudFormation in Harness CD pipelines to provision target deployment infrastructure dynamically during pipeline execution. Dynamic provisioning means Harness automatically creates the infrastructure your application needs before deploying to it. This guide shows you how to configure the CloudFormation Create Stack step to provision infrastructure, map outputs to your deployment targets, and set up automatic rollback.

:::info Dynamic provisioning scope
Dynamic provisioning is limited to what is available in the target environment. For example, cloud-agnostic Kubernetes Cluster Connectors (connectors that work with any Kubernetes cluster regardless of cloud provider) require an existing cluster, so you cannot provision a new cluster. However, you can provision a namespace within an existing cluster.
:::

---

## Before you begin

- **Harness account with Continuous Delivery enabled:** You need **Continuous Delivery** under **Deployments** in Harness. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support

    If Continuous Delivery does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline and Environment permissions:** View and Create/Edit permissions on Environments, Create/Edit on Pipelines, and View on Connectors. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

- **AWS account:** Access to create CloudFormation stacks and provision target resources (EC2, EKS, ECS, Lambda, etc.). Go to [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) to understand IAM role requirements.

- **CloudFormation template knowledge:** Basic understanding of CloudFormation template structure, Outputs section, and Parameters. Go to [AWS CloudFormation template anatomy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html) to learn template basics.

- **Existing pipeline and environment:** A CD pipeline with an environment configured. Go to [Create pipelines](/docs/platform/pipelines/add-a-stage) and [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) to set up pipelines and environments.

- **Deployment type knowledge:** Dynamic provisioning configuration varies by deployment type. Choose your deployment type below and review its specific requirements:

  - [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure): Also used for Helm, Native Helm, and Kustomize
  - [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
  - [AWS ASG](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial)
  - [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
  - [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
  - [Spot Elastigroup](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot/spot-deployment)
  - [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart)
  - [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
  - [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
  - [Windows VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)

---

## Provision target infrastructure dynamically

When you enable dynamic provisioning in a CD Deploy stage's **Environment** settings, Harness automatically adds the necessary CloudFormation steps to your pipeline. These steps appear in the pipeline editor under the **Environment** tab. Go to the **Environment** section of your stage to view and configure them.

The automatically-added steps include:

- **Create Stack step:** Connects to your CloudFormation template repository and creates your stack.
- **Manual Approval step:** Optional approval gate between Create Stack and Delete Stack steps. You can remove this step or configure it. Go to [Using manual approval steps in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages) to configure manual approvals or [Using Jira and ServiceNow approval steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-jira-and-service-now-approval-steps-in-cd-stages) to use Jira or ServiceNow approvals.
- **Delete Stack step:** Removes resources provisioned by the Create Stack step. The Delete Stack step is optional. You can configure whether to delete the stack after deployment, keep it for subsequent deployments, or delete it only on pipeline failure.

:::tip CloudFormation timing
CloudFormation stack creation can take 10-30 minutes depending on the resources being provisioned. Monitor progress in the pipeline execution console under the Create Stack step logs. Harness waits for the stack to reach CREATE_COMPLETE status before proceeding to the deployment steps.
:::

---

### Configure the Create Stack step

You use the **Create Stack** step in the **Environment** section of a CD stage to perform dynamic provisioning. The step provisions target infrastructure at runtime and maps CloudFormation outputs to your stage's Infrastructure Definition settings.

Go to [Provision with the CloudFormation Create Stack step](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step) to configure all available options in the Create Stack step.

---

### Add an AWS Connector

Add or select a Harness [AWS Connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) in the Create Stack step. The connector includes the credentials needed to create CloudFormation stacks and provision target resources.

The AWS Connector requires IAM permissions to create CloudFormation stacks and provision target resources (EC2, EKS, ECS, etc.). Go to [AWS Connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) to configure required permissions and authentication.

For example, to give full access to create and manage EKS clusters, you could use a policy like this:

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

Ensure that the credentials include the `ec2:DescribeRegions` policy. This is required by default. It can be made optional with the feature flag `CDS_AWS_DESCRIBE_REGIONS_OPTIONAL`. Go to [AWS Connector DescribeRegions - Optional](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference#describeregions---optional) for details.

Harness delegates execute CloudFormation operations. Ensure your delegate has network access to AWS and the AWS CLI installed. Go to [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview) to configure delegates.

---

### Select a region

Select the AWS region where you want to provision resources in the **Region** field.

---

### Add your CloudFormation template

You can add your CloudFormation template in the following ways:

* **Inline:** Enter the template directly in the **Template File** field. You can use CloudFormation-compliant JSON or YAML.
* **AWS S3:** Enter the URL of the S3 bucket containing the template file. This can be a public or private URL. If you use a private URL, the AWS credentials in the **AWS Connector** setting authenticate the request. Ensure the credentials include the **AmazonS3ReadOnlyAccess** policy and the `ec2:DescribeRegions` policy described in [AWS Connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference). The `ec2:DescribeRegions` policy is required by default. Go to [AWS Connector DescribeRegions - Optional](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference#describeregions---optional) for details.
* **Remote:** Select a Git repository where your template is located. Add or select a Harness Git Connector for the repository. Go to [Code Repo Connectors](/docs/category/code-repo-connectors) to configure Git Connectors.

#### Expression and secret support in templates

You can use Harness expressions and secrets in templates for dynamic values. They resolve at runtime. Go to [Add text secrets](/docs/platform/secrets/add-use-text-secrets) and [Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to configure expressions and secrets.

---

### Name your stack

Enter a name for the CloudFormation stack Harness will create in the **Stack Name** field.

This is the same as the `--stack-name` option in the AWS CloudFormation CLI `create-stack` command:

```bash
aws cloudformation create-stack --stack-name test --template-body file://eks.yml
```

---

### CloudFormation Parameter Files

You can use CloudFormation parameter files to specify input parameters for the stack.

This is the same as using the AWS CloudFormation CLI `create-stack` option `--parameters` with a JSON parameters file:

```bash
aws cloudformation create-stack --stackname startmyinstance  
--template-body file:///some/local/path/templates/startmyinstance.json  
--parameters https://your-bucket-name.s3.amazonaws.com/params/startmyinstance-parameters.json
```

Example JSON parameter file:

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

To add parameter files:

1. In **CloudFormation Parameter Files**, click **Add**.
2. In **Parameter File Connector**, select your Git platform, then select or add a Git Connector. Go to [Code Repo Connectors](/docs/category/code-repo-connectors) to configure Git Connectors. For AWS S3, go to [Add an AWS Connector](/docs/platform/connectors/cloud-providers/add-aws-connector).
3. In **Parameter File Details**, enter the following:
   - **Identifier:** Enter an Identifier for the file. This name indicates what the parameters are for.
   - **Repo Name:** If the Git Connector does not have the repository path, enter it here.
   - **Git Fetch Type:** Select **Latest from Branch** or use a Git commit ID or tag.
   - **Parameter File Details:** Enter the path to the file from the root of the repository. To add multiple files, click **Add Path File**.

<DocImage path={require('./static/provision-target-deployment-infra-dynamically-with-cloud-formation-03.png')} alt="CloudFormation parameter file configuration showing Git connector, repository details, and file paths" title="Click to view full size" />
<p align="center"><em>CloudFormation parameter file configuration in the Create Stack step</em></p>

#### Encrypted text secrets and expressions in parameter files

Harness expressions and secrets are supported in parameter files and **Parameter File Details** settings. They resolve at runtime. Go to [Add text secrets](/docs/platform/secrets/add-use-text-secrets) to configure secrets.

---

### CloudFormation Parameters Overrides

You can override parameters added in **Parameter File Details**.

In **CloudFormation Parameters Overrides**, click **Specify Inline Parameters**.

Click **Retrieve Names from template** to retrieve the parameters from the JSON file. You can also manually enter the names and values.

For each parameter you want to override, enter a new value in **Value**.

Harness text secrets are supported. Go to [Add text secrets](/docs/platform/secrets/add-use-text-secrets) to configure secrets.

---

### Specify the IAM role ARN

Enter the AWS Role ARN to use when creating the stack in the **Role ARN** field. Use an existing AWS Identity and Access Management (IAM) service role that CloudFormation can assume.

This is the same as the role you would use when creating a stack using the AWS console [Permissions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-add-tags.html) setting or CLI.

Go to [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) to understand IAM service role requirements.

---

### Specify Capabilities

To acknowledge the capabilities in the CloudFormation template, click in **Specify Capabilities** and select capabilities.

This acknowledges that the template contains certain capabilities (for example, `CAPABILITY_AUTO_EXPAND`), giving AWS CloudFormation the specified capabilities before it creates the stack. This is the same as using the `--capabilities` option in the `aws cloudformation create-stack` CLI command. Go to [AWS CloudFormation create-stack](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/create-stack.html) for details.

---

### Tags

Tags are arbitrary key-value pairs that can be used to identify your stack for purposes such as cost allocation.

A **Key** consists of any alphanumeric characters or spaces. Tag keys can be up to 127 characters long.

A **Value** consists of any alphanumeric characters or spaces. Tag values can be up to 255 characters long.

Enter the tags in JSON or YAML (lowercase is required).

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

---

### Configure stack status checks

In **Continue Based on Stack Statuses**, you can add the stack states that allow provisioning to continue.

Harness checks if the stack is in `ROLLBACK_COMPLETE` state before deployment. If the stack is in `ROLLBACK_COMPLETE`, Harness deletes the stack and then triggers the deployment. This prevents conflicts with existing failed stacks. Deleting the stack removes any partially-created resources and allows a clean stack creation.

---

## Advanced settings

Configure advanced step options:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

---

## Map CloudFormation outputs to infrastructure settings

Now that the Create Stack step is configured in **Dynamic provisioning**, Harness provisions the infrastructure defined in your CloudFormation template.

There are two provisioning use cases:

1. **Provisioning supporting resources:** If you are provisioning a resource in your deployment infrastructure that is not the deployment target (such as an AWS secret or IAM role), define the deployment target in **Infrastructure Definition** as usual.
2. **Provisioning the deployment target:** If you will deploy directly into the provisioned resource as part of the deployment target (such as an EKS cluster or VPC), you need to map CloudFormation outputs to the required **Infrastructure Definition** settings so Harness can target and deploy to the provisioned infrastructure.

This section covers use case 2: provisioning the deployment target.

The required Infrastructure Definition settings are specific CloudFormation template outputs. Which settings are required depends on the type of target infrastructure you are provisioning. For example, a platform-agnostic Kubernetes cluster infrastructure only requires the target namespace in the target cluster.

To map CloudFormation template outputs to Infrastructure Definition settings:

1. Ensure your CloudFormation template defines the required outputs in the Outputs section. To find output names, open your CloudFormation template and locate the Outputs section. Each output key can be referenced in the mapping expression.

2. In the **Infrastructure Definition** setting that requires a value from your template output, select **Expression**.

<DocImage path={require('./static/provision-target-deployment-infra-dynamically-with-cloud-formation-05.png')} alt="Infrastructure Definition field with Expression option selected" title="Click to view full size" />
<p align="center"><em>Select Expression to map CloudFormation outputs to Infrastructure Definition settings</em></p>

3. Enter a Harness expression that references the output. The expression format is:

   `<+infrastructureDefinition.provisioner.steps.[Create Stack step Id].output.[output name]>`

   You can find the Create Stack step ID in the step settings:

   <DocImage path={require('./static/provision-target-deployment-infra-dynamically-with-cloud-formation-06.png')} alt="Create Stack step showing the step ID field" title="Click to view full size" />
   <p align="center"><em>Find the step ID in the Create Stack step settings</em></p>

   For example, for a Kubernetes deployment, you need to map the `namespace` output to the **Namespace** setting in Infrastructure Definition. For a Create Stack step with the ID **create123** and an output named **namespace**, the expression is:

   `<+infrastructureDefinition.provisioner.steps.create123.output.namespace>`

   <DocImage path={require('./static/provision-target-deployment-infra-dynamically-with-cloud-formation-07.png')} alt="Infrastructure Definition Namespace field populated with CloudFormation output expression" title="Click to view full size" />
   <p align="center"><em>Map the namespace output to the Infrastructure Definition Namespace field</em></p>

Now Harness has the provisioned target infrastructure configured and will deploy to the dynamically-created infrastructure.

---

## Approval step

By default, Harness adds a Manual Approval step between the Create Stack and Delete Stack steps. You can remove this step or configure it. Go to [Using manual approval steps in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages) to configure manual approvals.

You can also use other approval step types. Go to [Using Jira and ServiceNow approval steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-jira-and-service-now-approval-steps-in-cd-stages) to use Jira or ServiceNow approvals.

Ensure that the AWS Connector credentials include the `ec2:DescribeRegions` policy. This is required by default. It can be made optional with the feature flag `CDS_AWS_DESCRIBE_REGIONS_OPTIONAL`. Go to [AWS Connector DescribeRegions - Optional](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference#describeregions---optional) for details.

---

## CloudFormation Rollback Stack step

The CloudFormation Rollback Stack step is automatically added to the **Rollback** section of your stage.

<DocImage path={require('./static/provision-target-deployment-infra-dynamically-with-cloud-formation-08.png')} alt="Pipeline editor showing the CloudFormation Rollback Stack step in the Rollback section" title="Click to view full size" />
<p align="center"><em>CloudFormation Rollback Stack step appears automatically in the Rollback section</em></p>

When rollback happens, Harness runs the last successfully provisioned version of the stack. The "last successfully provisioned version" means the most recent CloudFormation stack that reached CREATE_COMPLETE or UPDATE_COMPLETE status in a previous successful pipeline execution. If this is the first deployment and no previous successful version exists, rollback deletes the stack.

In the **CloudFormation Rollback Stack** step, in **Provisioner Identifier**, enter the same provisioner identifier you used in the Create Stack step.

The **Provisioner Identifier** is a unique name you assign to the Create Stack step. This identifier links the Create Stack, Rollback Stack, and Delete Stack steps together. You can find it in the Create Stack step's **Advanced** section under **Provisioner Identifier**.

Harness determines what to rollback using a combination of `Provisioner Identifier + Harness account id + Harness org id + Harness project id`.

If you have made these settings expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

---

## Troubleshooting

<Troubleshoot
  issue="Stack name already exists error when creating CloudFormation stack in Harness CD"
  mode="docs"
  fallback="Ensure the stack name is unique or delete the existing stack. Use the Continue Based on Stack Statuses setting to configure how Harness handles existing stacks."
/>

<Troubleshoot
  issue="Permission denied errors when creating AWS resources with CloudFormation in Harness CD"
  mode="docs"
  fallback="Verify the AWS Connector credentials include required IAM permissions for CloudFormation and target resources. Check the CloudFormation service role ARN has sufficient permissions."
/>

<Troubleshoot
  issue="CloudFormation template validation failure in Harness pipeline"
  mode="docs"
  fallback="Validate your CloudFormation template syntax using the AWS CloudFormation console or CLI. Ensure all required parameters are provided and resource references are correct."
/>

<Troubleshoot
  issue="Output mapping expression error in Infrastructure Definition for CloudFormation"
  mode="docs"
  fallback="Verify the output name exists in your CloudFormation template Outputs section. Ensure the Create Stack step ID in the expression matches the actual step ID. Check that the stack reached CREATE_COMPLETE status before the expression is evaluated."
/>

<Troubleshoot
  issue="CloudFormation rollback step fails in Harness CD pipeline"
  mode="docs"
  fallback="Verify the Provisioner Identifier in the Rollback Stack step matches the Create Stack step. Check that a previous successful stack version exists. Review CloudFormation stack events in the AWS console for detailed error messages."
/>

---

## Next steps

You have configured dynamic provisioning with CloudFormation for your CD pipeline. Harness now provisions target infrastructure automatically during deployment and rolls back changes on failure.

- [Provision with Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness): Use Terraform as an alternative infrastructure provisioner
- [CloudFormation How-tos](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-how-tos) — advanced CloudFormation features and rollback strategies
- [Create environments](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments) — manage multiple provisioned environments
