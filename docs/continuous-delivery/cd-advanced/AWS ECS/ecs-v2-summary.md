---
title: AWS ECS support summary
description: Harness ECS support.
sidebar_position: 1
---

Harness NextGen has revamped its AWS ECS support from its [FirstGen implementation](../../../first-gen/continuous-delivery/aws-deployments/ecs-deployment/ecs-deployments-overview.md). This includes how you configure Harness and ECS services and perform rolling, canary, and blue green deployments.

For users coming from Harness FirstGen, this is a significant change and requires time to upgrade previous pipelines.

This topic describes the changes and provides some best practices to help you migrate from FirstGen or create new ECS deployments in Harness.

## ECS delegates

Harness FirstGen users who used the FirstGen ECS Delegate can now use a Kubernetes, Helm, or Docker delegate. To continue using an ECS-based delegate in NextGen, see the blog post [How to deploy Delegate in Amazon ECS for Harness NG](https://community.harness.io/t/how-to-deploy-delegate-in-amazon-ecs-for-harness-ng/13056).

## Get started with ECS in NextGen

- [ECS deployment tutorial](../../onboard-cd/cd-quickstarts/ecs-deployment-tutorial.md)

## ECS basics

Official AWS ECS docs explain ECS concepts in detail, but let's review a few important points:

- An ECS Task is the smallest deployable entity in ECS.
  - A Task Definition is the configuration for a task. It contains task information such as the container definition, image, etc.

- An ECS service is an entity that manages a group of the same tasks.
  - An ECS service generally contains information about load balancing, task count, task placement strategies across availability zones, etc.

- ECS deeply integrates with many other AWS native services such as AWS ECR, App Mesh, Cloud Formation, etc.

## Summary of ECS changes from Harness FirstGen to NextGen

Please review the following changes to how Harness uses ECS in Harness FirstGen and NextGen.

### Removed ECS steps and workflow types in ECS NextGen

The following FirstGen ECS steps and workflow types are removed in ECS NextGen:

- ECS Service Setup step.
- Upgrade Containers step.
- ECS Daemon Service Setup step.
- ECS Steady State Check step.
- Basic ECS Workflow type.

### New deployment types introduced in ECS NextGen

- Added support for rolling deployment.
- Revamped the Canary deployment behavior.

For details about the new deployment types, go to the [ECS deployment tutorial](../../onboard-cd/cd-quickstarts/ecs-deployment-tutorial.md).

### ECS Run Task updated in ECS NextGen

A new  ECS Run Task Request Definition setting was introduced in the ECS Run Task Step.

This is covered in the [ECS deployment tutorial](../../onboard-cd/cd-quickstarts/ecs-deployment-tutorial.md#ecs-run-task-step).  

### Infrastructure Definitions

- Harness has made Infrastructure Definitions a lighter configuration you can reuse for other ECS Services.
- The ECS Infrastructure Definition no longer has ECS service-specific properties like `Networking`, `ExecutionRoleARN`, and `AWSVPC`. These have been moved to the ECS Service Definition.

## ECS changes in detail

Please review the following changes in Harness entities and ECS files.

### Harness ECS Service

- The Harness ECS Service now has more parameters in its the Task Definition and Service Definition settings.
- ECS Scaling Policies have moved to the ECS Service from the ECS Service Setup step and are now configurable as YAML or JSON files in the Service.
- Scalable Targets have moved from the ECS Service Setup step and are now configurable as YAML or JSON param files in the Harness Service.
- The AWS VPC, Security Group, Subnets, Execution Role ARN have moved out of the Harness Infrastructure Definition and are now part of the Harness Service Definition configuration.
- The Service Definition requires more configuration:
  - `serviceName`
  - `loadbaBancer` properties
  - `networkConfiguration`
  - `desiredCount`
- You can manipulate the deployment behavior via the new `deploymentConfiguration` properties `maximumPercent` and `minimumHealthyPercent`. See [DeploymentConfiguration](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html) from AWS.

### ECS Task Definition support in NextGen

The following samples demonstrate the ECS Task Definition parameters supported in NextGen.

#### Sample Task Definition and supported parameters

Here is a YAML example highlighting the changes. Harness supports standard AWS ECS YAML and JSON.

```yaml
ipcMode:
executionRoleArn: <ecsInstanceRole Role ARN>
containerDefinitions:
- dnsSearchDomains:
  environmentFiles:
  entryPoint:
  portMappings:
  - hostPort: 80
    protocol: tcp
    containerPort: 80
  command:
  linuxParameters:
  cpu: 0
  environment: []
  resourceRequirements:
  ulimits:
  dnsServers:
  mountPoints: []
  workingDirectory:
  secrets:
  dockerSecurityOptions:
  memory:
  memoryReservation: 128
  volumesFrom: []
  stopTimeout:
  image: <+artifact.image>
  startTimeout:
  firelensConfiguration:
  dependsOn:
  disableNetworking:
  interactive:
  healthCheck:
  essential: true
  links:
  hostname:
  extraHosts:
  pseudoTerminal:
  user:
  readonlyRootFilesystem:
  dockerLabels:
  systemControls:
  privileged:
## ECS NextGen Update
## This is the ECS Task Definition name. Harness won't append anything to it during deployment
  name: nginx
placementConstraints: []
memory: '512'
## ECS NextGen Update
## The taskRoleARN property needs to be provided as this is the ECS Instance Role ARN
taskRoleArn: <ecsInstanceRole Role ARN>
family: sainath-fargate
pidMode:
requiresCompatibilities:
  - FARGATE
networkMode: awsvpc
runtimePlatform:
cpu: '256'
inferenceAccelerators:
proxyConfiguration:
volumes: []
```

#### Sample Task Definition and supported parameters

Here is a JSON example highlighting the changes. Harness supports standard AWS ECS YAML and JSON.

```json
{
    "ipcMode": null,
    "executionRoleArn": "<ecsInstanceRole Role ARN>",
    "containerDefinitions": [
        {
            "dnsSearchDomains": null,
            "environmentFiles": null,
            "entryPoint": null,
            "portMappings": [
                {
                    "hostPort": 80,
                    "protocol": "tcp",
                    "containerPort": 80
                }
            ],
            "command": null,
            "linuxParameters": null,
            "cpu": 0,
            "environment": [],
            "resourceRequirements": null,
            "ulimits": null,
            "dnsServers": null,
            "mountPoints": [],
            "workingDirectory": null,
            "secrets": null,
            "dockerSecurityOptions": null,
            "memory": null,
            "memoryReservation": 128,
            "volumesFrom": [],
            "stopTimeout": null,
            "image": "<+artifact.image>",
            "startTimeout": null,
            "firelensConfiguration": null,
            "dependsOn": null,
            "disableNetworking": null,
            "interactive": null,
            "healthCheck": null,
            "essential": true,
            "links": null,
            "hostname": null,
            "extraHosts": null,
            "pseudoTerminal": null,
            "user": null,
            "readonlyRootFilesystem": null,
            "dockerLabels": null,
            "systemControls": null,
            "privileged": null,
            "name": "nginx"
        }
    ],
    "placementConstraints": [],
    "memory": "512",
    "taskRoleArn": "<ecsInstanceRole Role ARN>",
    "family": "fargate-task-definition",
    "pidMode": null,
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "networkMode": "awsvpc",
    "runtimePlatform": null,
    "cpu": "256",
    "inferenceAccelerators": null,
    "proxyConfiguration": null,
    "volumes": []
}
```

### ECS NextGen Service Definition support in NextGen

The following samples demonstrate the ECS Service Definition parameters supported in NextGen.

#### Sample Service Definition and supported parameters

Here is a YAML example highlighting the changes. Harness supports standard AWS ECS YAML and JSON.

```yaml
launchType: FARGATE
## ECS NextGen update
## The Service name, Desired Count, and network configuration needs to be defined in the Service Definition now
serviceName: myapp
desiredCount: 2
networkConfiguration:
  awsvpcConfiguration:
    securityGroups:
    - <Security Group Id>
    subnets:
    - <Subnet Id>
    assignPublicIp: ENABLED
## ECS NextGen update
## We can define the deployment behavior properties in the Service Definition and Harness will deploy with the defined configuration
deploymentConfiguration:
  maximumPercent: 200
  minimumHealthyPercent: 100
loadBalancers:
- targetGroupArn: <+targetGroupArn>
  containerName: nginx
  containerPort: 80    
```

#### Sample Service Definition and supported parameters

Here is a JSON example highlighting the changes. Harness supports standard AWS ECS YAML and JSON.

```json
{
    "launchType": "FARGATE",
    "serviceName": "myapp",
    "desiredCount": 1,
    "networkConfiguration": {
        "awsvpcConfiguration": {
            "securityGroups": [
                "<Security Group Id>"
            ],
            "subnets": [
                "<Subnet Id>"
            ],
            "assignPublicIp": "ENABLED"
        }
    },
    "deploymentConfiguration": {
        "maximumPercent": 100,
        "minimumHealthyPercent": 0
    }
}
```

### ECS Run Task Request Definition support in NextGen

Supported schema details can be found in [RunTask](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html) from AWS.

### Infrastructure Definitions

The following changes have to made to Infrastructure Definitions in NextGen:

- The ECS Infrastructure Definitions in NextGen do not have AWS VPC, Security Group, Network Policies. This configuration is now moved to the Harness ECS service.
- The ECS cluster can be a Harness Runtime Input. This makes the Infrastructure Definition reusable for other clusters in a given environment.
- Infrastructure Definition YAML has changed for ECS. Below is a YAML example, although both YAML and JSON are supported.

```yaml
infrastructureDefinition:
  name: ecs-dev-cluster
  identifier: ecsDevCluster
  description: "Sandbox Development Cluster"
  tags: {}
  orgIdentifier: default
  projectIdentifier: cdProductManagement
  environmentRef: devEcs
  deploymentType: ECS
  type: ECS
  spec:
    connectorRef: account.awsEcs
    region: us-east-1
    cluster: staging
  allowSimultaneousDeployments: false

```

## Best practices

Please review the following best practices for using ECS in Harness NextGen.

### Templates and ECS deployments

- You can template your pipelines in Harness NextGen.
- Harness templates create reusable logic for Harness entities like steps, stages, and pipelines. 
- You can link templates in your pipelines or share them with your teams for improved efficiency. 
- If you want to use this feature when you create a new entity like a step, click `Start with Template`. For more information, go to [Templates Overview](../../../platform/templates/../13_Templates/template.md).

### ECS Service configuration

- Although you can use the Harness [File Store](../../cd-services/cd-services-general/add-inline-manifests-using-file-store.md) for local file storage in your account, for production we recommend storing ECS manifests in remote stores like Github, Bitbucket, AWS S3, etc. Remote stores support version control on files for tracking and reverting changes.

- Harness recommends using Harness Service variables to template ECS service parameters. For example, You can refer to Service variables in your manifests using variable expressions such as `<+serviceVariables.serviceName>`. For more information, go to [Built-in and Custom Harness Variables Reference](../../../platform/12_Variables-and-Expressions/harness-variables.md).

### ECS Environment configuration

If Harness Service **Configuration Parameters** need to be overridden based on Infrastructure, Harness recommends using Harness Service variables and overriding them at the Environment level.

For example, if the AWS Security Group in the ECS Service Definition needs to be overridden for a Harness Environment, we recommend creating a Service variable `securityGroup` in the Harness Service and using it in ECS Service Definition Manifest as `<+serviceVariables.securityGroup>`.

The variable `securityGroup` value can be overridden at the Environment level. For more information, go to [Services and environments overview](../../onboard-cd/cd-concepts/services-and-environments-overview.md). 

### Rolling deployments

To achieve phased rollout of ECS deployments, we recommend using the `deploymentConfiguration` field in the ECS Service Definition.

For example:

```yaml
deploymentConfiguration:
  maximumPercent: 100
  minimumHealthyPercent: 80
```

To understand how this configuration works, go to [Service definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html) from AWS.


### Blue Green deployments

- Harness recommends using an [Approval](/docs/category/approvals) step between the ECS Blue Green Create Service and ECS Blue Green Swap Target Groups steps. Approval steps can verify new service deployment health before shifting traffic from the old service to the new service.

- For critical services with high availability requirements, Harness recommends enabling the **Do not downsize old service** option in the ECS Blue Green Swap Target Groups step. When this option is enabled, Harness will not downsize the old service. This method can help in faster rollbacks as the rollback process only switches traffic at the load balancer.
