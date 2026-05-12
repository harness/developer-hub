---
title: AWS CDK use cases and examples
description: AWS CDK provisioning patterns, deployment types, and code examples for Harness.
sidebar_position: 2
sidebar_label: Use Cases and Examples
keywords:
  - aws cdk
  - cdk examples
  - dynamic provisioning
  - ad hoc provisioning
  - deployment types
tags:
  - continuous delivery
  - aws
  - infrastructure
---

import DocImage from '@site/src/components/DocImage';

This topic explains AWS CDK provisioning patterns in Harness and provides code examples for common deployment scenarios. AWS CDK allows you to provision infrastructure using familiar programming languages, either independently or as part of a deployment workflow.

---

## Provisioning patterns

Harness supports two AWS CDK provisioning patterns:

- **Ad hoc provisioning:** Temporary and on-demand provisioning of resources for specific tasks or purposes. Use this pattern to provision infrastructure independently, without deploying applications. This is useful for creating test environments, setting up shared resources, or managing infrastructure as a standalone workflow.

- **Dynamic infrastructure provisioning:** Provision the target deployment environment as part of the same deployment process. Harness provisions the infrastructure first, then deploys your application to the newly created resources. Typically, dynamic infrastructure provisioning is for temporary pre-production environments such as dev, test, and qa. Production environments are usually pre-existing.

The provisioning pipeline steps are configured the same way for both patterns. Multi-account deployments are supported, allowing you to deploy to different AWS accounts using a single connector by overriding the region and assuming a different IAM role. Go to [AWS CDK Provisioning](/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-provisioning#aws-connector-configuration-optional) to configure multi-account deployments.

Go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview) to understand Harness provisioning concepts and use cases.

---

## Flexible infrastructure provisioning

Harness AWS CDK provisioning gives you the flexibility to provision infrastructure independently or as part of a deployment workflow. You can use AWS CDK provisioning on its own to manage infrastructure without deploying artifacts, or combine it with Harness deployment services to provision infrastructure and deploy applications in a single pipeline.

### Service Instances (SIs) consumption

Harness optimizes licensing by not consuming Service Instances (SIs) when using AWS CDK for infrastructure provisioning alone. This allows you to provision infrastructure at no additional licensing cost. SI licensing applies only when Harness deploys artifacts to the provisioned infrastructure in the same stage or pipeline.

---

## Dynamic provisioning by deployment type

Each deployment type Harness supports (Kubernetes, AWS ECS, and others) requires that you map different CDK stack outputs to the Harness infrastructure settings in the pipeline stage. In your Harness pipeline, navigate to the stage **Environment** tab and select **AWS CDK** as the provisioner to configure dynamic provisioning.

The following deployment types support dynamic provisioning with AWS CDK:

- [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure)
  - The Kubernetes infrastructure is also used for Helm, Native Helm, and Kustomize deployment types.
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- [Spot Elastigroup](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot/spot-deployment)
- [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
- [Windows VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)

Go to the documentation for your deployment type to understand which CDK stack outputs are required for dynamic provisioning.

---

## Example: ECS infrastructure provisioning

This example shows an AWS CDK TypeScript application that provisions the infrastructure for an ECS deployment and includes the required output of AWS region.

```TypeScript
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';

class EcsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a VPC (Virtual Private Cloud)
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Specify the number of availability zones
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc,
    });

    // Define an ECS Fargate service using a sample container image
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
      cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      },
    });

    // Define an output for the AWS region (CfnOutput exports stack values)
    new cdk.CfnOutput(this, 'RegionOutput', {
      value: cdk.Aws.REGION,
      description: 'AWS region of the stack',
    });

    // Define an output for the ECS cluster name
    new cdk.CfnOutput(this, 'ClusterNameOutput', {
      value: cluster.clusterName,
      description: 'Name of the ECS cluster',
    });
  }
}

const app = new cdk.App();
new EcsCdkStack(app, 'EcsCdkStack');

```

### Using CDK outputs in Harness

In the Harness Infrastructure Definition, you map CDK stack outputs to their corresponding settings using expressions in the format `<+provisioner.STACK_NAME.OUTPUT_NAME>`. For example:

- `<+provisioner.EcsCdkStack.RegionOutput>` references the AWS region output
- `<+provisioner.EcsCdkStack.ClusterNameOutput>` references the ECS cluster name output

Go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to learn about Harness expression syntax.

<DocImage path={require('./static/0982655fcd2dfeb4043905e6f878f29c6005dd8d9e0d659898055fb2750d214f.png')} width="40%" height="40%" title="Click to view full size image" />
<p align="center"><em>Mapping CDK outputs to Harness infrastructure settings</em></p>

The `CfnOutput` construct in your CDK application exports stack values that Harness can reference. Each output you define becomes available as an expression variable after the CDK Deploy step completes successfully.

---

## Next steps

You understand AWS CDK provisioning patterns and how to structure CDK applications for different deployment types. You can now configure CDK provisioning in your Harness pipelines.

- Go to [AWS CDK Provisioning](/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-provisioning) to configure CDK steps in your pipeline.
- Go to [Build your own CDK image](/docs/continuous-delivery/cd-infrastructure/aws-cdk/cdk-image-build) to customize CDK plugin images with specific versions and dependencies.
- Go to [AWS ECS deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial) to provision ECS infrastructure with CDK and deploy containerized applications.
