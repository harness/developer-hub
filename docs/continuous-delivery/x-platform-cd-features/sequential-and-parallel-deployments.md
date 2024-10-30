---
title: Sequential and Parallel Deployments
description: How you can do sequential and parallel deployments with multi-service, multi-environment and multi-infrastructure
sidebar_position: 300
---

Pipelines can be executed with multiple services and environments. Configured services and environments are mapped to different stages and each stage executes a Service ,Environment and Infrastructure belonging to environment

## Execution Sequence

Users can configure the sequence of deployment as Sequential or Parallel.

When you click on **Deploy multiple Services** you see an option for **Deploy Services in Parallel**. When you check that it will allow you to deploy your services in parallel.

![](./static/service_parallel.png)

:::important note
By default, the execution sequence is sequential deployment for services.
:::

When you click on **Deploy to multiple Environments or Infrastructures** you see an option for **Deploy to Environments or Infrastructures in Parallel**. When you check that it will allow you to deploy your infrastructure and environment in parallel.

![](./static/environment_infrastructure.png)

## Scenarios

### Sequential Deployment in Multi Services and Multi-Infrastructure

Sample configuration:-

- **Services**: S1, S2
- **Environment**: E1
- **Infrastructure**: I1, I2

Each service is sequentially deployed in a collection of Infrastructure instructed by the YAML configuration of the pipeline stage.

Each service is deployed in one infrastructure first and then followed by the second infrastructure.

![](./static/service_infra_sequence.png)

The deployment sequence is as follows:

**`S1 I1 -> S2 I1 -> S1 I2 -> S2 I2`**

### Parallel Deployment in Multiple Services and Sequential in Multiple Environment/Infrastructure

Sample configuration:-

- **Services**: S1, S2
- **Environment**: E1
- **Infrastructure**: I1, I2

Each service will be deployed parallelly in different infrastructure.

![](./static/service_parallel_infra_seq.png)

The deployment sequence is as follows:

Parallel Deployments:

1. 1(S1 I1) and 2 (S1 I2) will be deployed in parallel (same service across different infrastructures).
2. 3(S2 I1) and 4 (S2 I2) will be deployed in parallel (same service across different infrastructures).

Sequential Deployments:

1. After 1 (S1 I1) is deployed, then 3 (S2 I1) will be deployed sequentially (different services in the same infrastructure).
2. After 2 (S1 I2) is deployed, then 4 (S2 I2) will be deployed sequentially (different services in the same infrastructure).

In summary, same services (e.g., S1) are deployed in parallel across different infrastructures, while different services (e.g., S1 and S2) within the same infrastructure are deployed sequentially.

![](./static/Parallel_service_seq_infra.png)

### Sequential Deployment in Multi-Services and Parallel Multi-Infrastructure

Sample configuration:-

- **Services**: S1, S2
- **Environment**: E1
- **Infrastructure**: I1, I2


![](./static/service_parallel_infra_seq.png)

Each service is deployed sequentially, but the infrastructures are deployed in parallel.

The deployment sequence is as follows:
Parallel Deployments:

1. 1 (S1 I1) and 2 (S2 I1) will be deployed in parallel (different services within the same infrastructure).
2. 3 (S1 I2) and 4 (S2 I2) will be deployed in parallel (different services within the same infrastructure).

Sequential Deployments:

1. After 1 (S1 I1) is deployed, then 3 (S1 I2) will be deployed sequentially (same service across different infrastructures).
2. After 2 (S2 I1) is deployed, then 4 (S2 I2) will be deployed sequentially (same service across different infrastructures).

In summary, different services within the same infrastructure are deployed in parallel, while the same service across different infrastructures is deployed sequentially.

![](./static/seq_service_parallel_infra.png)

### Multi Service in Parallel and Multi Infrastructure in Parallel

Sample configuration:-

- **Services**: S1, S2
- **Environment**: E1
- **Infrastructure**: I1, I2

Both services and infrastructure are deployed in parallel.

The deployment sequence is as follows:
**`S1 I1 -> S2 I1 -> S1 I2 -> S2 I2`**

![](./static/service_parallel_infra_parallel.png)

### Multi service in parallel and multi environment and multi Infrastructure in sequential 

Sample configuration:-

- **Services**: S1, S2
- **Environment_1_Infrastructure_1**: I1, I2
- **Environment_2_Infrastructure_2**: K82, K81

![](./static/multi_service_parallel_multi_env_infra_seq.png)

Services are deployed in parallel sequentially in the infrastructures.

The deployment sequence is as follows:
**`S1 I1 -> S2 I1 -> S1 I2 -> S2 I2 -> S1 K82 -> S2 K81 -> S2 K82 -> S2 K81`**

### Multi service in sequential and multi environment and multi Infrastructure in parallel

Sample configuration:-

- **Services**: S1, S2
- **Environment_1_Infrastructure_1**: I1, I2
- **Environment_2_Infrastructure_2**: K82, K81

![](./static/multi_service_sequence_multi_env_multi_infra_parallel.png)

Services are deployed sequentially, but the environments and infrastructures are deployed in parallel.

The deployment sequence is as follows:
**`S1 I1 -> S1 I2 -> S1 K82 -> S1 K81 -> S2 I1 -> S2 I2 -> S2 K82 -> S2 K81`**

Infrastructure takes precedence, and all Infrastructure gets one Service followed by other Services.

## Deployment and Concurrency

### Max Concurrency

When you view a multi service or environment deployment, you can see **Max Concurrency**:

![](./static/max_concurrency.png)

Max concurrency changes based on the following:

* If you select **Deploy services in parallel**, Max concurrency is equal to the number of services.
* If you select **Deploy to Environments or Infrastructures in parallel**, Max concurrency is equal to the number of environments or infrastructures.
* If you select **Deploy services in parallel** and **Deploy to Environments or Infrastructures in parallel**, Max concurrency is equal to the number of services multiplied by the number of environments.