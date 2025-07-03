---
title: EC2-backed and serverless faults
sidebar_position: 5
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-and-serverless-faults
- /docs/chaos-engineering/chaos-faults/aws/ec2-and-serverless-faults
---

AWS faults are categorized into serverless, EC2-backed, and serverless combined with EC2-backed faults. Links to the respective faults are provided.

## Serverless faults

These experiments primarily involve ECS Fargate and aren't dependent on EC2 instances. They focus on altering the state or resources of ECS containers without direct container interaction.

Faults that belong to this category are listed below:

1. [ECS Fargate CPU Hog](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-fargate-cpu-hog)

2. [ECS Fargate Memory Hog](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-fargate-memory-hog)

3. [AWS ECS Invalid Container Image](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-invalid-container-image)

4. [AWS ECS Update Container Resource Limit](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-update-container-resource-limit)

5. [AWS ECS Update Container Timeout](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-update-container-timeout)

6. [AWS ECS Update Task Role](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-update-task-role)

7. [AWS ECS Container Volume Detach](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-volume-detach)

## EC2-backed faults

These experiments induce chaos within a container and depend on an EC2 instance. Typically, these are prefixed with "ECS container" and involve direct interaction with the EC2 instances hosting the ECS containers.

Faults that belong to this category are listed below:

1. [AWS ECS Agent Stop](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-agent-stop)

2. [AWS ECS Container CPU Hog](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-cpu-hog)

3. [AWS ECS Container HTTP Latency](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-http-latency)

4. [AWS ECS Container HTTP Modify Body](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-http-modify-body)

5. [AWS ECS Container HTTP Modify Header](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-http-modify-header)

6. [AWS ECS Container HTTP Reset Peer](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-http-reset-peer)

7. [AWS ECS Container HTTP Status Code](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-http-status-code)

8. [AWS ECS Container IO Stress](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-io-stress)

9. [AWS ECS Container Memory Hog](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-memory-hog)

10. [AWS ECS Container Network Latency](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-network-latency)

11. [AWS ECS Container Network Loss](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-container-network-loss)

12. [AWS ECS Instance Stop](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-instance-stop)

## EC2-backed and serverless faults

These experiments are versatile and are applicable to both serverless ECS tasks and those backed by EC2 instances. They generally involve task-level chaos or access restrictions without causing direct in-container or in-VM disruptions.

Faults that belong to this category are listed below:

1. [AWS ECS Task Stop](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-task-stop)

2. [AWS ECS Task Scale](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-task-scale)

3. [AWS ECS Network Restrict](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ecs-network-restrict)

