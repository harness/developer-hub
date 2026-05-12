---
title: Provision with the CloudFormation Create Stack step
description: Provision using the CloudFormation Create Stack step.
sidebar_position: 3
sidebar_label: CloudFormation Create Stack Step
helpdocs_topic_id: pq58d0llyx
helpdocs_category_id: 31zj6kgnsg
helpdocs_is_private: false
helpdocs_is_published: true
keywords:
  - cloudformation
  - create stack
  - provisioning
  - cd pipeline
  - aws cloudformation
tags:
  - cloudformation
  - continuous-delivery
  - aws
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import DocImage from '@site/src/components/DocImage';

This topic describes how to provision resources in a CD stage's deployment infrastructure using the CloudFormation **Create Stack** step.

You use the CloudFormation **Create Stack** step in a CD stage's **Execution** section as part of the deployment process. Add the Create Stack step at the point in your deployment workflow where you need the infrastructure provisioned. Typically, you add it before steps that deploy your application to the provisioned infrastructure. The **Create Stack** step runs the CloudFormation template and supporting files that you supply inline or from your repositories (Git, AWS S3). Harness provisions the CloudFormation stack defined in the template as part of the stage's **Execution**.

You can also use **Create Stack** in the **Infrastructure** section of a CD stage for dynamic provisioning. When you use Create Stack in the Infrastructure section, Harness provisions the infrastructure before running any Execution steps. You can map CloudFormation template outputs to Infrastructure Definition settings to tell Harness where to deploy. During deployment, Harness first provisions the target deployment infrastructure and then the stage's Execution steps deploy to the provisioned infrastructure. Go to [Provision target infrastructure dynamically](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-target-deployment-infra-dynamically-with-cloud-formation) to configure dynamic provisioning.

---

## Prerequisites

- **Harness account with Continuous Delivery enabled:** You need **Continuous Delivery** under **Deployments** in Harness. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support

    If Continuous Delivery does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline and Deploy stage permissions:** You need **Create/Edit** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#continuous-delivery), **View** and **Create/Edit** for [Environments](/docs/platform/role-based-access-control/permissions-reference#continuous-delivery), and **View** for [Connectors](/docs/platform/role-based-access-control/permissions-reference#connectors). An administrator must assign you a role that includes these permissions. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to configure roles.

- **AWS account:** Access to create CloudFormation stacks and provision target resources (EC2, EKS, ECS, Lambda, etc.). Go to [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) to understand IAM role requirements.

- **CloudFormation template knowledge:** Basic understanding of CloudFormation template structure, parameters, outputs, and stack states. Go to [AWS CloudFormation template anatomy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html) to learn template basics.

- **Existing CD pipeline with Deploy stage:** A CD pipeline with a Deploy stage configured. Go to [Add a stage](/docs/platform/pipelines/add-a-stage) to set up pipelines and stages.

- **CloudFormation provisioning fundamentals:** Understanding of how CloudFormation provisioning works in Harness. Go to [CloudFormation provisioning with Harness](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-provisioning-with-harness) to understand CloudFormation integration concepts.

---

## Configure the Create Stack step

In the **Execution** section of your Deploy stage, click **Add Step**, and then select the **CloudFormation Create Stack** step.

<DocImage path={require('../../cd-advanced/cloudformation-howto/static/provision-with-the-cloud-formation-create-stack-step-00.png')} alt="Add Step menu showing CloudFormation Create Stack option" title="Click to view full size" />
<p align="center"><em>Select CloudFormation Create Stack from the Add Step menu</em></p>

The **Create Stack** step is where you connect Harness to your templates and provide additional settings.

---

### Name

In **Name**, enter a name for the step, for example, **Create EC2 Instance**.

Harness will create an [Entity Id](/docs/platform/references/entity-identifier-reference) using the name. The Id is important because you can use Harness expressions to reference settings in this step from another step. For example, to reference the stack name in another step, use `<+pipeline.stages.[stage-id].spec.execution.steps.[create-stack-step-id].spec.configuration.stackName>`.

Go to [Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to learn about expression syntax and usage.

---

### Timeout

In **Timeout**, enter how long Harness should wait to complete the step before failing the step and initiating the [Step and Stage Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps).

:::tip CloudFormation timing
CloudFormation stack creation can take 10-30 minutes depending on the resources being provisioned. Monitor progress in the pipeline execution console under the Create Stack step logs. Harness waits for the stack to reach CREATE_COMPLETE status before proceeding.
:::

---

### Provisioner Identifier

Enter a unique value in **Provisioner Identifier**.

The **Provisioner Identifier** identifies the provisioning done by this step. You reference the **Provisioner Identifier** in other steps to refer to the provisioning done by this step.

Only one **Create Stack** step with a specific **Provisioner Identifier** can be added in the same stage. If you add multiple **Create Stack** steps with the same **Provisioner Identifier**, only the first **Create Stack** step will be successful. Subsequent Create Stack steps with the same Provisioner Identifier will fail with an error. This ensures each provisioned stack can be uniquely identified for rollback and cleanup operations.

The most common use of **Provisioner Identifier** is between the Create Stack, Delete Stack, and Rollback Stack steps. For example, in the case of a **Create Stack** failure, the **Rollback Stack** step rolls back the provisioning from the **Create Stack** step using its **Provisioner Identifier**.

<DocImage path={require('../../cd-advanced/cloudformation-howto/static/provision-with-the-cloud-formation-create-stack-step-01.png')} alt="Provisioner Identifier field in Create Stack step and matching identifier in Rollback Stack step" title="Click to view full size" />
<p align="center"><em>Provisioner Identifier links Create Stack and Rollback Stack steps together</em></p>

Ultimately, Harness determines what stack to roll back to using a combination of `Provisioner Identifier + Harness account id + Harness org id + Harness project id`.

#### Provisioner Identifier scope

The **Provisioner Identifier** is a Project-wide setting. You can reference it across Pipelines in the same Project.

For this reason, it is important that all your Project members know the Provisioner Identifiers. This will prevent one member building a Pipeline from accidentally impacting the provisioning of another member's Pipeline.

---

### AWS Connector

Add or select the Harness [AWS Connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) that will be used for this step. The AWS Connector includes the credentials needed to perform the provisioning.

The AWS Connector requires IAM permissions to create CloudFormation stacks and provision target resources (EC2, EKS, ECS, etc.). Go to [AWS Connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) to configure required permissions and authentication. For CloudFormation-specific permissions, go to [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) to understand IAM service role requirements.

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

### Region

Select the AWS region where you want to provision resources in the **Region** field.

---

### Template File

You can add your CloudFormation template in the following ways:

* **Inline:** Enter the template directly in the **Template File** field. You can use CloudFormation-compliant JSON or YAML.
* **AWS S3:** Enter the URL of the S3 bucket containing the template file. This can be a public or private URL. If you use a private URL, the AWS credentials in the **AWS Connector** setting authenticate the request. Ensure the credentials include the **AmazonS3ReadOnlyAccess** policy and the `ec2:DescribeRegions` policy described in [AWS Connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference). The `ec2:DescribeRegions` policy is required by default. Go to [AWS Connector DescribeRegions - Optional](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference#describeregions---optional) for details.
* **Remote:** Select a Git repository where your template is located. Add or select a Harness Git Connector for the repository. Go to [Code Repo Connectors](/docs/category/code-repo-connectors) to configure Git Connectors.

#### Expression and secret support in templates

You can use Harness expressions and secrets in templates for dynamic values. They resolve at runtime. Go to [Add text secrets](/docs/platform/secrets/add-use-text-secrets) and [Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to configure expressions and secrets.

---

### Stack Name

Enter a name for the CloudFormation stack Harness will create in the **Stack Name** field.

This is the same as the `--stack-name` option in the `aws cloudformation create-stack` command:

```bash
aws cloudformation create-stack --stack-name test --template-body file://eks.yml
```

:::info Stack update behavior
If a CloudFormation stack with the specified name already exists and is in a healthy state, the Create Stack step will update the existing stack with the new template. However, if the stack is in `ROLLBACK_COMPLETE` state, Harness deletes the stack first and then creates a new one. Go to [Configure stack status checks](#configure-stack-status-checks) to understand how Harness handles different stack states.
:::

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

<DocImage path={require('../../cd-advanced/cloudformation-howto/static/provision-with-the-cloud-formation-create-stack-step-02.png')} alt="CloudFormation parameter file configuration showing Git connector, repository details, and file paths" title="Click to view full size" />
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

Tags are arbitrary key-value pairs that identify your stack for purposes such as cost allocation.

A **Key** consists of any alphanumeric characters or spaces. Tag keys can be up to 127 characters long.

A **Value** consists of any alphanumeric characters or spaces. Tag values can be up to 255 characters long.

Enter tags in JSON or YAML format (lowercase is required):

```json
[{  
    "key": "string",  
    "value": "string"  
},{  
    "key": "string",  
    "value": "string"  
}]
```

Harness supports [CloudFormation-compliant JSON or YAML for tags](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).

---

### Configure stack status checks

In **Continue Based on Stack Statuses**, add the stack states that allow provisioning to continue.

Harness checks if the stack is in `ROLLBACK_COMPLETE` state before deployment. If the stack is in `ROLLBACK_COMPLETE`, Harness deletes the stack and then triggers the deployment. ROLLBACK_COMPLETE indicates a previous stack creation failed and left the stack in an incomplete state. Deleting the stack removes any partially-created resources and allows a clean stack creation.

---

## Advanced settings

The Create Stack step supports standard Harness step settings. Configure advanced step options:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

---

## Troubleshooting

<Troubleshoot
  issue="Stack name already exists error when creating CloudFormation stack in Harness CD"
  mode="docs"
  fallback="If the existing stack is in a healthy state, Harness updates it. If the stack is in ROLLBACK_COMPLETE state, Harness deletes it and creates a new one. Ensure the stack name is unique or use the Continue Based on Stack Statuses setting to configure how Harness handles existing stacks."
/>

<Troubleshoot
  issue="Permission denied errors when creating AWS resources with CloudFormation in Harness CD"
  mode="docs"
  fallback="Verify the AWS Connector credentials include required IAM permissions for CloudFormation and target resources. Check the CloudFormation service role ARN has sufficient permissions. Ensure the delegate has network access to AWS."
/>

<Troubleshoot
  issue="CloudFormation template validation failure in Harness pipeline"
  mode="docs"
  fallback="Validate your CloudFormation template syntax using the AWS CloudFormation console or CLI. Ensure all required parameters are provided and resource references are correct. Check that expressions and secrets resolve correctly at runtime."
/>

<Troubleshoot
  issue="CloudFormation parameter file not found in Harness Create Stack step"
  mode="docs"
  fallback="Verify the parameter file path is correct relative to the repository root. Check that the Git Connector has access to the repository and branch. Ensure the parameter file exists at the specified path."
/>

<Troubleshoot
  issue="Role ARN authentication failure in CloudFormation Create Stack step"
  mode="docs"
  fallback="Verify the Role ARN is correct and exists in your AWS account. Ensure the AWS Connector credentials have permission to assume the role. Check that the role's trust policy allows CloudFormation to assume it."
/>

---

## Next steps

You have configured the CloudFormation Create Stack step. Harness provisions your CloudFormation stack during pipeline execution using the template and settings you specified.

- [Provision target infrastructure dynamically](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-target-deployment-infra-dynamically-with-cloud-formation): Use Create Stack in the Infrastructure section for dynamic provisioning
- [CloudFormation How-tos](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-how-tos): Advanced CloudFormation features and rollback strategies
- [CloudFormation Delete Stack step](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/remove-provisioned-infra-with-the-cloud-formation-delete-step): Remove provisioned resources
