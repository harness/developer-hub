---
title: EC2-backed and serverless faults
sidebar_position: 5
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-and-serverless-faults
---

AWS faults are categorized into serverless, EC2-backed, and serverless combined with EC2-backed faults. Links to the respective faults are provided.

## Serverless faults

These experiments primarily involve ECS Fargate and aren't dependent on EC2 instances. They focus on altering the state or resources of ECS containers without direct container interaction.

Faults that belong to this category are listed below:

1. [ECS Fargate CPU Hog](./ecs-fargate-cpu-hog.md)

2. [ECS Fargate Memory Hog](./ecs-fargate-memory-hog.md)

3. [AWS ECS Invalid Container Image](./ecs-invalid-container-image.md)

4. [AWS ECS Update Container Resource Limit](./ecs-update-container-resource-limit.md)

5. [AWS ECS Update Container Timeout](./ecs-update-container-timeout.md)

6. [AWS ECS Update Task Role](./ecs-update-task-role.md)

7. [AWS ECS Container Volume Detach](./ecs-container-volume-detach.md)

## EC2-backed faults

These experiments induce chaos within a container and depend on an EC2 instance. Typically, these are prefixed with "ECS container" and involve direct interaction with the EC2 instances hosting the ECS containers.

Faults that belong to this category are listed below:

1. [AWS ECS Agent Stop](./ecs-agent-stop.md)

2. [AWS ECS Container CPU Hog](./ecs-container-cpu-hog.md)

3. [AWS ECS Container HTTP Latency](./ecs-container-http-latency.md)

4. [AWS ECS Container HTTP Modify Body](./ecs-container-http-modify-body.md)

5. [AWS ECS Container HTTP Reset Peer](./ecs-container-http-reset-peer.md)

6. [AWS ECS Container HTTP Status Code](./ecs-container-http-status-code.md)

7. [AWS ECS Container IO Stress](./ecs-container-io-stress.md)

8. [AWS ECS Container Memory Hog](./ecs-container-memory-hog.md)

9. [AWS ECS Container Network Latency](./ecs-container-network-latency.md)

10. [AWS ECS Container Network Loss](./ecs-container-network-loss.md)

11. [AWS ECS Instance Stop](./ecs-instance-stop.md)

## EC2-backed and serverless faults

These experiments are versatile and are applicable to both serverless ECS tasks and those backed by EC2 instances. They generally involve task-level chaos or access restrictions without causing direct in-container or in-VM disruptions.

Faults that belong to this category are listed below:

1. [AWS ECS Task Stop](./ecs-task-stop.md)

2. [AWS ECS Task Scale](./ecs-task-scale.md)

3. [AWS ECS Network Restrict](./ecs-network-restrict.md)

