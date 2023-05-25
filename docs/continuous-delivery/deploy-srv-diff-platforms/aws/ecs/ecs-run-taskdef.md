---
title: Run an ECS Task 
description: Run individual tasks separately in your ECS pipelines.
sidebar_position: 3
---

In addition to deploying tasks as part of your standard ECS deployment, you can use the ECS Run Task step to run individual tasks separately in your ECS pipelines.

The ECS Run Task step is available in all ECS deployment [deployment strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts).

For more information, see [Running tasks from AWS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_run_task.html).

An example of when you run a task separately is a one-time or periodic batch job that does not need to keep running or restart when it finishes.

:::note

If you are new to Harness ECS support, go to [ECS deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial).

:::

## Important notes

- You cannot enter multiple task definitions in the same ECS Run Task step. You can use multiple step instead.
- Harness supports JSON and YAML for all ECS manifests. You can use both JSON and YAML for your task and service definitions. 


For information on running ECS Tasks, go to the AWS docs [Run a standalone task in the classic Amazon ECS console](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_run_task.html), [RunTask](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html), and [Amazon ECS capacity providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html).

To ensure that your deployments are successful, please follow the AWS schema syntax for each manifest type:

* [RegisterTaskDefinition](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RegisterTaskDefinition.html)
* [Run Task](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html).

## Required AWS IAM policies

The ECS Run Task step uses the Harness AWS connector set up in the stage's environment's infrastructure definition. The AWS credentials provided to the AWS connector must meet the minimum IAM policies for running tasks:

- `AmazonECSTaskExecutionRolePolicy`: This policy allows Amazon ECS to manage tasks on your behalf.
- `AmazonEC2ContainerRegistryReadOnly`: This policy grants read-only access to the Amazon ECR registry to pull the container images required for your task.
- `AmazonSSMManagedInstanceCore`: This policy is required if you plan to use AWS Systems Manager to manage your container instances. It grants necessary permissions to interact with managed instances.
- `AmazonEC2ContainerServiceforEC2Role`: This policy grants Amazon ECS the necessary permissions to manage container instances in your EC2 instances.

:::note

Depending on your specific requirements and configuration, you may need to modify or create additional policies to allow other AWS services to interact with your ECS tasks.

:::

## Running ECS tasks summary

The ECS Run Task step uses the target region and cluster settings of the Harness stage's **Environment** settings.

The ECS Run Task step is the same as use the [run-task command](https://docs.aws.amazon.com/cli/latest/reference/ecs/run-task.html) in the AWS ECS CLI.

The ECS Run Task step has two stages:

1. Harness registers the task you define in the step and verifies the registration.
2. Harness triggers the task, and determines if it was triggered successfully.

The output in the step's deployment looks something like this:

```
Deploying..

TaskDefinition: arn:aws:ecs:us-east-1:012345678910:task-definition/task-auto:1899 

 ECS Task Request Definition Content 
launchType: FARGATE
networkConfiguration:
  awsvpcConfiguration:
    securityGroups:
    - sg-afc848e7 
    subnets:
    - subnet-9757dc98
    assignPublicIp: ENABLED
count: null
Triggering 1 tasks with task definition task-auto:1899
1 Tasks were triggered successfully and 0 failures were received.
Task => arn:aws:ecs:us-east-1:012345678910:task/ecs-cluster-3/c1d7b47aa35c4a6d94b466c429aa6846 succeeded
Skipped Steady State Check
Success.
```

If you are new to ECS task scheduling and running tasks manually, review the following topics from AWS:

* [Scheduling Amazon ECS tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduling_tasks.html)
* [Running tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_run_task.html)
* [RunTask API](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html)

## Add the ECS Run Task step

You can only add the step to a stage deploying a Harness service using the ECS deployment type. 

If you are new to Harness ECS support, go to [ECS deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial).

1. In your stage, in **Execution**, select **Add Step**, and then select **ECS Run Task**.

## Task Definition

There are two ways to add the ECS task definition to the Harness service:

- **Task Definition**: Add a connection to the task definition file in a remote Git repository, local Harness File Store, or object storage (AWS S3).
- **Task Definition ARN**: Add the task definition ARN.
  - The task definition ARN points to an existing task created and available in the AWS cluster with the required definition.
  - The task definition will be fetched using the task ARN provided and added to the ECS service configuration provided in the Harness ECS service Service Definition.
  - During deployment, the required task is deployed with the desired count provided in the Service Definition.

If you are new to ECS, review the AWS documentation on [ECS Task Definitions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html).

## ECS Run Task Request Definition

In **ECS Run Task Request Definition**, you can customize how Amazon ECS places tasks using placement constraints and placement strategies just like using a Capacity provider strategy in the ECS console.

All of the parameters supported by the [RunTask API](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html) can be updated using the **ECS Run Task Request Definition**. 


## Skip Steady-State Check

If you do not select this option, Harness will not check to see if the task was triggered.

If you do select this option, Harness will poll the ECS task to see if it triggered successfully.


## Advanced settings

In **Advanced**, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)
