---
title: Provision target deployment infrastructure dynamically with CloudFormation
description: Provision a CD stage's target deployment infra using CloudFormation.
sidebar_position: 3
helpdocs_topic_id: 6jfl7i6a5u
helpdocs_category_id: mlqlmg0tww
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use CloudFormation in Harness CD pipeline stages for ad hoc provisioning or to provision the target deployment infrastructure for the stage.

This topic provides a brief overview of the steps involved in provisioning a CD stage's target deployment infrastructure using the **CloudFormation Create Stack** step.

This topic also covers some important requirements.

## Important notes

Target infrastructure provisioning is limited to what is available in the target environment.

For example, the cloud-agnostic Kubernetes Cluster Connector requires that you have an existing cluster, so you cannot provision a new cluster. But it does let you provision a namespace.

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-00.png)

## CloudFormation dynamic infrastructure provisioning summary

Setting up dynamic provisioning involves adding a CloudFormation template to the stage **Environment** settings that provisions the pipeline stage's target infrastructure.

Next, you map specific, required script outputs to the Harness **Infrastructure Definition** for the stage, such as the target namespace.

During deployment, Harness provisions the target deployment infrastructure and then the stage's **Execution** steps deploy to the provisioned infrastructure.

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
- [Custom deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial)


## Dynamic provisioning steps

When you enable dynamic provisioning in a CD Deploy stage's **Environment** settings, Harness automatically adds the necessary Harness CloudFormation steps:

- **Create Stack** step: this step connects Harness to your CloudFormation template repo and applies your CloudFormation templates.
- **Approval step**: Harness adds a Manual Approval step between the Create Stack and Delete Stack steps. You can remove this step or follow the steps in [Using Manual Harness Approval Steps in CD Stages](../../x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages) to configure the step.
  - You can also use a [Jira or ServiceNow Approval](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-jira-and-service-now-approval-steps-in-cd-stages) step.
- **Delete Stack** step: you can use the Delete Stack step to remove resources provisioned by the Create Stack step.

### AWS Connector

In the Create Stack step, you will add or select a Harness [AWS Connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/) that will be used for this step. The AWS Connector will include the credentials needed to perform the provisioning.

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

Ensure that the credentials include the `ec2:DescribeRegions` policy described in [AWS connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/).

See also: [AWS CloudFormation service role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html) from AWS.


### CloudFormation Rollback

The CloudFormation Rollback Step is automatically added to the **Rollback** section.

![](./static/provision-target-deployment-infra-dynamically-with-cloud-formation-08.png)

When rollback happens, Harness runs the last successfully provisioned version of the stack.

In the  **CloudFormation Rollback Stack** step, in **Provisioner Identifier**, enter the same provisioner identifier you used in the Create Stack step.

Harness determines what to rollback using a combination of `Provisioner Identifier + Harness account id + Harness org id + Harness project id`.

If you've made these settings expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

## Summary

Now that you have the Create Stack and Rollback Stack steps set up, when you run your Pipeline Harness will provision your CloudFormation stack and perform rollback on failure.

