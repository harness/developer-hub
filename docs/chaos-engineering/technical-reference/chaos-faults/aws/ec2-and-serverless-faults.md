---
title: EC2-backed and serverless faults
sidebar_position: 3
---

AWS faults are categorized into serverless, EC2-backed, and serverless combined with EC2-backed faults. Links to the respective faults are provided. 

## Serverless faults

These experiments primarily involve ECS Fargate and aren't dependent on EC2 instances. They focus on altering the state or resources of ECS containers without direct container interaction.

Faults that belong to this category are listed below:

1. [ECS Fargate CPU Hog](./ecs-fargate-cpu-hog)

2. [ECS Fargate Memory Hog](./ecs-fargate-memory-hog)

3. [AWS ECS Invalid Container Image](./ecs-invalid-container-image)

4. [AWS ECS Update Container Resource Limit](./ecs-update-container-resource-limit)

5. [AWS ECS Update Container Timeout](./ecs-update-container-timeout)

6. [AWS ECS Update Task Role](./ecs-update-task-role)

7. [AWS ECS Container Volume Detach](./ecs-container-volume-detach)

## EC2-backed faults

These experiments induce chaos within a container and depend on an EC2 instance. Typically, these are prefixed with "ECS container" and involve direct interaction with the EC2 instances hosting the ECS containers.

Faults that belong to this category are listed below:

1. [AWS ECS Agent Stop](./ecs-agent-stop)

2. [AWS ECS Container CPU Hog](./ecs-container-cpu-hog)

3. [AWS ECS Container HTTP Latency](./ecs-container-http-latency)

4. [AWS ECS Container HTTP Modify Body](./ecs-container-http-modify-body)

5. [AWS ECS Container HTTP Reset Peer](./ecs-container-http-reset-peer)

6. [AWS ECS Container HTTP Status Code](./ecs-container-http-status-code)

7. [AWS ECS Container IO Stress](./ecs-container-io-stress)

8. [AWS ECS Container Memory Hog](./ecs-container-memory-hog)

9. [AWS ECS Container Network Latency](./ecs-container-network-latency)

10. [AWS ECS Container Network Loss](./ecs-container-network-loss)

11. [AWS ECS Instance Stop](./ecs-instance-stop)

## EC2-backed and serverless faults

These experiments are versatile and are applicable to both serverless ECS tasks and those backed by EC2 instances. They generally involve task-level chaos or access restrictions without causing direct in-container or in-VM disruptions.

Faults that belong to this category are listed below:

1. [AWS ECS Task Stop](./ecs-task-stop)

2. [AWS ECS Network Restrict](./ecs-network-restrict)