---
title: AWS Lambda Deployments Overview
description: A summary of Harness AWS Lambda implementation.
sidebar_position: 70
helpdocs_topic_id: 96mqftt93v
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/5fnx4hgwsa).This topic describes the concept of a Harness AWS Lambda deployment by describing the high-level steps involved.

For a quick tutorial, see the [AWS Lambda Quickstart](https://docs.harness.io/article/wy1rjh19ej-aws-lambda-deployments).

### Before You Begin

Before learning about Harness AWS Lambda deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### What Does Harness Need Before You Start?

A Harness AWS Lambda deployment requires the following:

* AWS account - An AWS account you can connect to Harness.
* Lambda function file stored on an artifact server, typically AWS S3.

### Artifact Source Support

Harness supports the following artifact sources with Lambda:

* [Jenkins](https://docs.harness.io/article/qa7lewndxq-add-jenkins-artifact-servers)
* [Artifactory](https://docs.harness.io/article/nj3p1t7v3x-add-artifactory-servers)
* [AWS S3](../../aws-deployments/lambda-deployments/1-delegate-and-connectors-for-lambda.md)
* [Nexus](https://docs.harness.io/article/rdhndux2ab-nexus-artifact-sources)
* [Custom Artifact Source](https://docs.harness.io/article/jizsp5tsms-custom-artifact-source)

### What Does Harness Deploy?

Setting up a Lambda deployment is as simple as adding your function zip file, configuring function compute settings, and adding aliases and tags. Harness takes care of the rest of the deployment, making it consistent, reusable, and safe with automatic rollback.

[![](./static/aws-lambda-deployments-overview-24.png)](./static/aws-lambda-deployments-overview-24.png)

Basically, the Harness setup for Lambda is akin to using the AWS CLI  [aws lambda](https://docs.aws.amazon.com/cli/latest/reference/lambda/index.html#cli-aws-lambda)  [create-function](https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html),  [update-function-code](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html), and  [update-function-configuration](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-configuration.html) commands, as well as the many other commands that are needed.

The benefit with Harness is that you can set up your Lambda deployment once, with no scripting, and then have your Lambda functions deployed automatically as they are updated in your AWS S3 bucket. You can even templatize the deployment Environment and Workflow for use by other devops and developers in your team.

Furthermore, Harness manages Lambda function versioning to perform rollback when needed.

### What Does a Harness AWS Lambda Deployment Involve?

The following list describes the major steps of a Harness AWS Lambda deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness Shell Script or ECS **Delegate** in AWS. | Typically, the Shell Script or ECS Delegate is installed in the same AWS VPC as your Lambda functions.When you set up a Harness AWS Cloud Provider, you can use the same IAM credentials as the installed Delegate.The IAM role you assign to the Delegate requires the standard Lambda Permissions.See [Delegate Installation and Management](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation).See [Lambda Permissions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html) from AWS. |
| 2 | Add an **AWS** **Cloud Provider**. | An AWS Cloud Provider is a connection to your AWS account.If you use AWS S3 to store your Lambda function files, the AWS Cloud Provider is used to obtain the Lambda function file from AWS S3.The AWS Cloud Provider is also used to connect to Lambda and deploy your function.When you set up a Harness AWS Cloud Provider, you can use the same IAM credentials as the installed Delegate.See [Add Cloud Providers](https://docs.harness.io/article/whwnovprrb-cloud-providers). |
| 3 | Create the Harness **Application** for your Lambda CD Pipeline. | The Harness Application represents a group of microservices, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD.See [Create an Application](https://docs.harness.io/article/bucothemly-application-configuration). |
| 4 | Create the Harness **Service** using the **AWS Lambda** Deployment Type. | Add a Lambda function file as an artifact in a Harness Service, define a function specification, and any config variables and files.See [Services for Lambda](../../aws-deployments/lambda-deployments/2-service-for-lambda.md). |
| 5 | Create the Harness **Environment** and Infrastructure Definition for your deployment, and any overrides. | Using the Harness AWS Cloud Provider you set up, you can select the IAM role, region, and other components of the target environment for your deployment.You can also override any Service settings, such as config variables and files. This enables you to use a single Service with multiple Harness Environments.See [Define Your Kubernetes Target Infrastructure](../../kubernetes-deployments/define-your-kubernetes-target-infrastructure.md). |
| 6 | Create the Basic deployment for Lambda in Harness **Workflows**. | The Workflow deploys the Lambda function as defined in the Harness Service to the AWS Lambda environment in the Harness Infrastructure Definition.See [Lambda Workflows and Deployments](../../aws-deployments/lambda-deployments/4-lambda-workflows-and-deployments.md). |
| 7 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your AWS Lambda CD:* [Deploy Individual Workflows](https://docs.harness.io/article/5ffpvrohi3-deploy-a-workflow)
* [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2)
* [Infrastructure Provisioners Overview](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner)
 |

### Next Steps

Read the following topics to build on what you've learned:

* [AWS Lambda Quickstart](https://docs.harness.io/article/wy1rjh19ej-aws-lambda-deployments) tutorial

