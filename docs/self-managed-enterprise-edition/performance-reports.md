---
title: Performance test reports
description: View test environment and resource configuration test scenarios and results.
sidebar_position: 27
---

This topic includes a series of test reports focusing on the performance and scalability of Harness Self-Managed Enterprise Edition. The reports provide detailed insights into the test environment, resource configurations, test scenarios, and their outcomes.

The test reports offer valuable insights into the performance, scalability, and reliability of Harness Self-Managed Enterprise Edition. They demonstrate the platform's capability to handle concurrent CI/CD executions effectively across different scenarios and workload conditions. The detailed results and observations serve as a reference for evaluating the platform's suitability for various deployment environments and project requirements.

## Test environment

The test reports document the environment in which the performance tests were conducted. This includes details such as the Kubernetes version used (GKE), the database configuration (Mongo Atlas M60), and the Redis setup (GCP Memory Store).

## Harness services

The reports outline the various services utilized within the Harness Self-Managed Enterprise Edition, deployed using Helm charts. Each service's configuration, including the number of replicas and resource allocations per replica (CPU and memory), is provided for a comprehensive understanding of the setup.

## Test scenarios

### Concurrent CI executions

Concurrent CI executions are initiated with specific steps, including initializing Kubernetes pods, cloning repositories, and executing parallel steps with sleep intervals. These tests evaluate the platform's ability to handle high loads of CI executions efficiently.

### Concurrent CD executions

Concurrent CD executions involve fetching Docker artifacts from external repositories and executing sequential steps, including Canary deploy, Canary delete, Rolling deploy, and Kubernetes Delete. These tests focus on the platform's ability to orchestrate complex deployment workflows under heavy loads.

## Performance test reports

Harness publishes performance test reports with each release. Select a report below to view report details.

### 2025 reports

<details>
<summary>January 08, 2025</summary>

This document details information about following :

1. Test Environment and resource configuration
2. Test scenario and results

### [Environment](#)
- GKE (Kubernetes Server Version) : 1.30.x

### [Database](#)
- Mongo Atlas M60

### [Redis](#)
- GCP Memory Store (11 GB)

### [Harness Services](#)

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.23.0) 
:::info
- **The below performance tests results are obtained using Managed MongoDB and Managed Redis (as mentioned above).**  
- **The default SMP Helm Chart includes in-cluster MongoDB and Redis Sentinel, so performance results may vary accordingly.**
:::

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.23.0 |
| ci-manager               |    4     |         3         |          6           | harness-0.23.0 |
| pipeline-service         |    8     |         4         |          10          | harness-0.23.0 |
| manager                  |    7     |         3         |          12          | harness-0.23.0 |
| log-service              |    4     |         3         |          12          | harness-0.23.0 |
| ng-manager               |    6     |         2         |          6           | harness-0.23.0 |
| scm                      |    2     |        0.5        |          1           | harness-0.23.0 |
| gateway                  |    5     |         1         |          4           | harness-0.23.0 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.23.0 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.23.0 |
| change-data-capture      |    1     |         4         |          6           | harness-0.23.0 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.23.0 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.23.0 |
| platform-service         |    2     |        0.5        |          3           | harness-0.23.0 |
| template-service         |    2     |         1         |          8           | harness-0.23.0 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.23.0 |
| sto-manager              |    2     |         3         |          6           | harness-0.23.0 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.23.0 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.23.0 |
| timescaledb              |    2     |         1         |          2           | harness-0.23.0 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.23.0 |

#### Override file : https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml

### [Test Scenarios](#)
  
#### [ >  3500 concurrent CI Executions [INLINE]](#)
Each CI pipeline would 
- initialise a k8s pod and git clone repo  
- run 5 parallel steps (100 sec sleep)
- run template with 2 parallel steps (140sec sleep)

Projects : 1  
Pipelines : 3500  
Stages per pipeline : 1  
Delegates : 15 (1cpu/4gi)  
Trigger type : webhook  
Test class : [CI_PIPELINE_WEBHOOK_RUN](../locust_tasks/ci_pipeline_webhook_run.py)

> Result : **PASS**  
Avg Execution Time: **5min 50sec**
  
#### [ >  2700 concurrent CD Executions [INLINE]](#)
Each CD pipeline would 
- fetch docker artifact from AWS ECR repo
- run following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects : 1  
Pipelines : 2700  
Stages per pipeline : 1   
Delegates : 80 (1cpu/4gi)  
Test class : [CD_PIPELINE_WEBHOOK_RUN](../locust_tasks/cd_pipeline_webhook_run.py)

> Result : **PASS**  
Avg Execution Time: **5min 55sec**

</details>

### 2024 reports

<details>
<summary>August 28,2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

### [Environment](#)
- GKE (Kubernetes Server Version) : 1.29.x

### [Database](#)
- Mongo Atlas M60

### [Redis](#)
- GCP Memory Store (11 GB)

### [Harness Services](#)

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.19.0) 

:::note
- **The below performance tests results are obtained using Managed MongoDB and Managed Redis (as mentioned above).**  
- **The default SMP Helm Chart includes in-cluster MongoDB and Redis Sentinel, so performance results may vary accordingly.**
:::

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.19.0 |
| ci-manager               |    4     |         3         |          6           | harness-0.19.0 |
| pipeline-service         |    8     |         4         |          10          | harness-0.19.0 |
| manager                  |    7     |         3         |          12          | harness-0.19.0 |
| log-service              |    3     |         3         |          12          | harness-0.19.0 |
| ng-manager               |    6     |         2         |          6           | harness-0.19.0 |
| scm                      |    2     |        0.5        |          1           | harness-0.19.0 |
| gateway                  |    5     |         1         |          4           | harness-0.19.0 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.19.0 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.19.0 |
| change-data-capture      |    1     |         4         |          6           | harness-0.19.0 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.19.0 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.19.0 |
| platform-service         |    2     |        0.5        |          3           | harness-0.19.0 |
| template-service         |    2     |         1         |          8           | harness-0.19.0 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.19.0 |
| sto-manager              |    2     |         3         |          6           | harness-0.19.0 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.19.0 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.19.0 |
| timescaledb              |    2     |         1         |          2           | harness-0.19.0 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.19.0 |

#### Override file : https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml

### [Test Scenarios](#)
  
#### [ >  3300 concurrent CI Executions [INLINE]](#)
Each CI pipeline would 
- initialise a k8s pod and git clone repo  
- run 5 parallel steps (100 sec sleep)
- run template with 2 parallel steps (140sec sleep)

Projects : 1  
Pipelines : 3300  
Stages per pipeline : 1  
Delegates : 15 (1cpu/4gi)  
Trigger type : webhook  
Test class : [CI_PIPELINE_WEBHOOK_RUN](../locust_tasks/ci_pipeline_webhook_run.py)

> Result : **PASS**  
Avg Execution Time: **6min 31sec**
  
#### [ >  2500 concurrent CD Executions [INLINE]](#)
Each CD pipeline would 
- fetch docker artifact from AWS ECR repo
- run following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects : 1  
Pipelines : 2500  
Stages per pipeline : 1   
Delegates : 70 (1cpu/4gi)  
Test class : [CD_PIPELINE_WEBHOOK_RUN](../locust_tasks/cd_pipeline_webhook_run.py)

> Result : **PASS**  
Avg Execution Time: **5min 52sec**

</details>

<details>
<summary>July 8, 2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.28.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (11 GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.18.0)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.18.0 |
| ci-manager               |    4     |         3         |          6           | harness-0.18.0 |
| pipeline-service         |    7     |         4         |          10          | harness-0.18.0 |
| manager                  |    7     |         3         |          12          | harness-0.18.0 |
| log-service              |    3     |         3         |          12          | harness-0.18.0 |
| ng-manager               |    6     |         2         |          6           | harness-0.18.0 |
| scm                      |    2     |        0.5        |          1           | harness-0.18.0 |
| gateway                  |    5     |         1         |          4           | harness-0.18.0 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.18.0 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.18.0 |
| change-data-capture      |    1     |         4         |          6           | harness-0.18.0 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.18.0 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.18.0 |
| platform-service         |    2     |        0.5        |          3           | harness-0.18.0 |
| template-service         |    2     |         1         |          8           | harness-0.18.0 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.18.0 |
| sto-manager              |    2     |         3         |          6           | harness-0.18.0 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.18.0 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.18.0 |
| timescaledb              |    2     |         1         |          2           | harness-0.18.0 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.18.0 |

#### Override file

[override-perf.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml)

#### Test scenarios

##### >  3000 concurrent CI Executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1  
Pipelines: 3000  
Stages per pipeline: 1  
Delegates: 15 (1cpu/4gi)  
Trigger type: webhook \
Test class: `CI_PIPELINE_WEBHOOK_RUN`

> Result: **PASS**
Avg Execution Time: **6min 36sec**

##### >  2300 concurrent CD Executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1  
Pipelines: 2300  
Stages per pipeline: 1   
Delegates: 60 (1cpu/4gi) \
Test class: `CD_PIPELINE_WEBHOOK_RUN`

> Result: **PASS**
Avg Execution Time: **6min 4sec**

</details>

<details>
<summary>June 5, 2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.27.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (11 GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.15.0)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.15.0 |
| ci-manager               |    4     |         3         |          6           | harness-0.15.0 |
| pipeline-service         |    7     |         4         |          10          | harness-0.15.0 |
| manager                  |    7     |         3         |          12          | harness-0.15.0 |
| log-service              |    3     |         3         |          12          | harness-0.15.0 |
| ng-manager               |    6     |         2         |          6           | harness-0.15.0 |
| scm                      |    2     |        0.5        |          1           | harness-0.15.0 |
| gateway                  |    5     |         1         |          4           | harness-0.15.0 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.15.0 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.15.0 |
| change-data-capture      |    1     |         4         |          6           | harness-0.15.0 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.15.0 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.15.0 |
| platform-service         |    2     |        0.5        |          3           | harness-0.15.0 |
| template-service         |    2     |         1         |          8           | harness-0.15.0 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.15.0 |
| sto-manager              |    2     |         3         |          6           | harness-0.15.0 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.15.0 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.15.0 |
| timescaledb              |    2     |         1         |          2           | harness-0.15.0 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.15.0 |

#### Override file

[override-perf.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml)

#### Test scenarios

##### >  2500 concurrent CI Executions INLINE
Each CI pipeline does the following:

- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 2500 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/4gi) \
Trigger type: webhook \
Test class: `CI_PIPELINE_WEBHOOK_RUN`

> Result: **PASS**
Avg Execution Time: **6.34min**

##### >  2000 concurrent CD Executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1 \
Pipelines: 2000 \
Stages per pipeline: 1 \
Delegates: 50 (1cpu/4gi) \
Test class: `CD_PIPELINE_RUN`

> Result: **PASS**
Avg Execution Time: **5.46min**

</details>

<details>
<summary>April 30, 2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.26.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (11 GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.15.0)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.15.0 |
| ci-manager               |    4     |         3         |          6           | harness-0.15.0 |
| pipeline-service         |    7     |         4         |          10          | harness-0.15.0 |
| manager                  |    7     |         3         |          12          | harness-0.15.0 |
| log-service              |    3     |         3         |          12          | harness-0.15.0 |
| ng-manager               |    6     |         2         |          6           | harness-0.15.0 |
| scm                      |    2     |        0.5        |          1           | harness-0.15.0 |
| gateway                  |    5     |         1         |          4           | harness-0.15.0 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.15.0 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.15.0 |
| change-data-capture      |    1     |         4         |          6           | harness-0.15.0 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.15.0 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.15.0 |
| platform-service         |    2     |        0.5        |          3           | harness-0.15.0 |
| template-service         |    2     |         1         |          8           | harness-0.15.0 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.15.0 |
| sto-manager              |    2     |         3         |          6           | harness-0.15.0 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.15.0 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.15.0 |
| timescaledb              |    2     |         1         |          2           | harness-0.15.0 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.15.0 |

#### Override file

[override-perf.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml)

#### Test scenarios

##### >  2500 concurrent CI Executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 2500 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/4gi) \
Trigger type: webhook \
Test class: `CI_PIPELINE_WEBHOOK_RUN`

> Result: **PASS**
Avg Execution Time: **6.45min**

##### >  2000 concurrent CD Executions INLINE
Each CD pipeline does the following:

- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:

   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1 \
Pipelines: 2000 \
Stages per pipeline: 1 \
Delegates: 50 (1cpu/4gi) \
Test class: `CD_PIPELINE_RUN`

> Result: **PASS**
Avg Execution Time: **5.20min**

</details>

<details>
<summary>April 1, 2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.26.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (11 GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.14.6)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.14.6 |
| ci-manager               |    4     |         3         |          6           | harness-0.14.6 |
| pipeline-service         |    7     |         4         |          10          | harness-0.14.6 |
| manager                  |    7     |         3         |          12          | harness-0.14.6 |
| log-service              |    3     |         3         |          12          | harness-0.14.6 |
| ng-manager               |    5     |         2         |          6           | harness-0.14.6 |
| scm                      |    2     |        0.5        |          1           | harness-0.14.6 |
| gateway                  |    5     |         1         |          4           | harness-0.14.6 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.14.6 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.14.6 |
| change-data-capture      |    1     |         4         |          6           | harness-0.14.6 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.14.6 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.14.6 |
| platform-service         |    2     |        0.5        |          3           | harness-0.14.6 |
| template-service         |    2     |         1         |          8           | harness-0.14.6 |
| ti-service               |    2     |         1         |          6           | harness-0.14.6 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.14.6 |
| sto-manager              |    2     |         3         |          6           | harness-0.14.6 |
| gitops                   |    2     |         2         |          2           | harness-0.14.6 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.14.6 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.14.6 |
| timescaledb              |    2     |         1         |          2           | harness-0.14.6 |
| verification-svc         |    2     |        0.3        |          4           | harness-0.14.6 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.14.6 |

#### Override file

[override-perf.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml)

#### Test scenarios

##### >  2000 concurrent CI Executions INLINE
Each CI pipeline does the following:

- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 2000 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/4gi) \
Trigger type: webhook \
Test class: `CI_PIPELINE_WEBHOOK_RUN`

> Result: **PASS**
Avg Execution Time: **6.45min**

##### >  2000 concurrent CD Executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:

   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1 \
Pipelines: 2000 \
Stages per pipeline: 1 \
Delegates: 47 (1cpu/4gi) \
Test class: `CD_PIPELINE_RUN`

> Result: **PASS**
Avg Execution Time: **5.20min**

</details>

<details>
<summary>February 29, 2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.26.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (11 GB)

#### Harness services

Helm chart : https://github.com/harness/helm-charts/releases/tag/harness-0.13.4

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.13.4 |
| ci-manager               |    4     |         3         |          6           | harness-0.13.4 |
| pipeline-service         |    7     |         4         |          10          | harness-0.13.4 |
| manager                  |    7     |         3         |          12          | harness-0.13.4 |
| log-service              |    3     |         3         |          12          | harness-0.13.4 |
| ng-manager               |    5     |         2         |          6           | harness-0.13.4 |
| scm                      |    2     |        0.5        |          1           | harness-0.13.4 |
| gateway                  |    5     |         1         |          4           | harness-0.13.4 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.13.4 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.13.4 |
| change-data-capture      |    1     |         4         |          6           | harness-0.13.4 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.13.4 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.13.4 |
| platform-service         |    2     |        0.5        |          3           | harness-0.13.4 |
| template-service         |    2     |         1         |          8           | harness-0.13.4 |
| ti-service               |    2     |         1         |          6           | harness-0.13.4 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.13.4 |
| sto-manager              |    2     |         3         |          6           | harness-0.13.4 |
| gitops                   |    2     |         2         |          2           | harness-0.13.4 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.13.4 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.13.4 |
| timescaledb              |    2     |         1         |          2           | harness-0.13.4 |
| verification-svc         |    2     |        0.3        |          4           | harness-0.13.4 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.13.4 |

#### Override file

[override-perf.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml)

#### Test scenarios

##### >  2000 concurrent CI Executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 2000 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/4gi) \
Trigger type: webhook \
Test class: `CI_PIPELINE_WEBHOOK_RUN`

> Result : **PASS**
Avg Execution Time: **6.5min**

##### >  1500 concurrent CD Executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 40 (1cpu/4gi) \
Test class: `CD_PIPELINE_RUN`

> Result: **PASS**
Avg Execution Time: **5.1min**

</details>

<details>
<summary>January 31, 2024</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.25.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (11 GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.13.0)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    4     |         1         |          5           | harness-0.13.0 |
| ci-manager               |    4     |         3         |          6           | harness-0.13.0 |
| pipeline-service         |    7     |         4         |          10          | harness-0.13.0 |
| manager                  |    7     |         3         |          12          | harness-0.13.0 |
| log-service              |    3     |         3         |          12          | harness-0.13.0 |
| ng-manager               |    5     |         2         |          6           | harness-0.13.0 |
| scm                      |    2     |        0.5        |          1           | harness-0.13.0 |
| gateway                  |    5     |         1         |          4           | harness-0.13.0 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.13.0 |
| nginx-ingress-controller |    1     |         5         |          10          | harness-0.13.0 |
| change-data-capture      |    1     |         4         |          6           | harness-0.13.0 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.13.0 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.13.0 |
| platform-service         |    2     |        0.5        |          3           | harness-0.13.0 |
| template-service         |    2     |         1         |          8           | harness-0.13.0 |
| ti-service               |    2     |         1         |          6           | harness-0.13.0 |
| sto-core                 |    4     |        0.5        |         1.5          | harness-0.13.0 |
| sto-manager              |    2     |         3         |          6           | harness-0.13.0 |
| gitops                   |    2     |         2         |          2           | harness-0.13.0 |
| ui                       |    3     |        0.1        |         0.5          | harness-0.13.0 |
| policy-mgmt              |    3     |        0.3        |          1           | harness-0.13.0 |
| timescaledb              |    2     |         1         |          2           | harness-0.13.0 |
| verification-svc         |    2     |        0.3        |          4           | harness-0.13.0 |
| ng-dashboard-aggregator  |    2     |       0.25        |          2           | harness-0.13.0 |

#### Override file

[override-perf.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf.yaml)

#### Test scenarios

##### >  2000 concurrent CI Executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 2000 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/4gi) \
Trigger type: webhook \
Test class: `CI_PIPELINE_WEBHOOK_RUN`

> Result : **PASS**
Avg Execution Time: **6.5min**

##### >  1500 concurrent CI Executions GitX
Each CI pipeline does the following:
- Initializes a Kubernetes pod and git clone repo
- Runs 5 parallel steps (360 sec sleep) and echo statements

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/2gi) \
Trigger type: webhook \
Test class: `CI_PIPELINE_REMOTE_RUN`

> Result: **PASS**
Avg Execution Time: **8.5min**

##### >  1000 concurrent CD Executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1 \
Pipelines: 1000 \
Stages per pipeline: 1 \
Delegates: 26 (1cpu/4gi) \
Test class: `CD_PIPELINE_RUN`

> Result: **PASS**
Avg Execution Time: **4.5min**

</details>

### 2023 reports

<details>
<summary>December 28, 2023</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.25.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (5GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.11.2)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |    Version     |
|--------------------------|:--------:|:-----------------:|:--------------------:|:--------------:|
| access-control           |    5     |         1         |          5           | harness-0.11.2 |
| ci-manager               |    6     |         3         |          6           | harness-0.11.2 |
| pipeline-service         |    10    |         4         |          12          | harness-0.11.2 |
| manager                  |    6     |         3         |          12          | harness-0.11.2 |
| log-service              |    3     |         3         |          12          | harness-0.11.2 |
| ng-manager               |    4     |         3         |          8           | harness-0.11.2 |
| scm                      |    2     |        0.5        |          1           | harness-0.11.2 |
| gateway                  |    2     |         2         |          6           | harness-0.11.2 |
| default-backend          |    1     |        0.1        |         0.2          | harness-0.11.2 |
| nginx-ingress-controller |    2     |         5         |          10          | harness-0.11.2 |
| change-data-capture      |    1     |         4         |          5           | harness-0.11.2 |
| next-gen-ui              |    2     |        0.5        |         0.5          | harness-0.11.2 |
| ng-auth-ui               |    2     |        0.1        |         0.1          | harness-0.11.2 |
| platform-service         |    2     |        0.5        |          3           | harness-0.11.2 |
| template-service         |    2     |         1         |          8           | harness-0.11.2 |
| ti-service               |    1     |         3         |          6           | harness-0.11.2 |
| sto-core                 |    1     |        0.5        |         0.75         | harness-0.11.2 |
| sto-manager              |    1     |         3         |          6           | harness-0.11.2 |
| gitops                   |    1     |         2         |          2           | harness-0.11.2 |
| ui                       |    1     |        0.5        |         0.5          | harness-0.11.2 |
| policy-mgmt              |    1     |        0.5        |         0.5          | harness-0.11.2 |
| timescaledb              |    2     |         1         |          2           | harness-0.11.2 |

#### Override file

[override-perf-ci-cd-ff.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml)

#### Manager config : update LOG_STREAMING_SERVICE_EXTERNAL_URL = `<smp host url>`/log-service/

#### Test scenarios

##### >  1800 concurrent CI Executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (100 sec sleep)
- Runs template with 2 parallel steps (140sec sleep)

Projects: 1 \
Pipelines: 1800 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/2gi) \
trigger: webhook

> Result: **PASS**
Total Execution Time: **7.2min**

##### >  1500 concurrent CI Executions GitX
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (360 sec sleep) and echo statements

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 15 (1cpu/2gi) \
trigger: webhook

> Result: **PASS**
Total Execution Time: **10.3min**

##### >  1000 concurrent CD Executions INLINE
Each CD pipeline:
- Fetches a Docker artifact from AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1 \
Pipelines: 1000 \
Stages per pipeline: 1 \
Delegates: 27 (1cpu/4gi)

> Result: **PASS**
Total Execution Time: **4.5min**

</details>

<details>
<summary>October 27, 2023</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.26.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (5GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.9.2)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |                       Version                        |
|--------------------------|:--------:|:-----------------:|:--------------------:|:----------------------------------------------------:|
| access-control           |    5     |         1         |          5           |                    harness-0.9.2                     |
| ci-manager               |    6     |         3         |          6           |                    harness-0.9.2                     |
| pipeline-service         |    10    |         4         |          12          | harness-0.9.2 + fixes <br/> (to be released in 0.11) |
| manager                  |    6     |         3         |          12          | harness-0.9.2 + fixes <br/> (to be released in 0.10) |
| log-service              |    1     |        10         |          24          |                    harness-0.9.2                     |
| ng-manager               |    4     |         3         |          8           | harness-0.9.2 + fixes <br/> (to be released in 0.10) |
| scm                      |    2     |        0.5        |          1           |                    harness-0.9.2                     |
| gateway                  |    2     |         2         |          6           |                    harness-0.9.2                     |
| default-backend          |    1     |        0.1        |         0.2          |                    harness-0.9.2                     |
| nginx-ingress-controller |    2     |         5         |          10          |                    harness-0.9.2                     |
| change-data-capture      |    1     |         4         |          5           |                    harness-0.9.2                     |
| next-gen-ui              |    2     |        0.5        |         0.5          |                    harness-0.9.2                     |
| ng-auth-ui               |    2     |        0.1        |         0.1          |                    harness-0.9.2                     |
| platform-service         |    2     |        2.5        |          3           |                    harness-0.9.2                     |
| template-service         |    2     |         1         |          8           | harness-0.9.2 + fixes <br/> (to be released in 0.11) |
| ti-service               |    1     |         3         |          6           |                    harness-0.9.2                     |
| sto-core                 |    1     |        0.5        |         0.75         |                    harness-0.9.2                     |
| sto-manager              |    1     |         3         |          6           |                    harness-0.9.2                     |
| gitops                   |    1     |         2         |          2           |                    harness-0.9.2                     |
| ui                       |    1     |        0.5        |         0.5          |                    harness-0.9.2                     |
| policy-mgmt              |    1     |        0.5        |         0.5          |                    harness-0.9.2                     |
| timescaledb              |    2     |         1         |          2           |                    harness-0.9.2                     |

#### Override file

[override-perf-ci-cd-ff.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml)

#### Manager config
update `LOG_STREAMING_SERVICE_EXTERNAL_URL` = `<smp host url>`/log-service/

#### Test scenarios

##### >  1500 concurrent CI executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (70 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 10 (1cpu/2gi)

> Result: **PASS**
Total Execution Time: **6min**

##### >  1500 concurrent CI executions GitX
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 5 parallel steps (140 sec sleep) and echo statements

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 10 (1cpu/2gi)

> Result: **PASS**
Total Execution Time: **5min**

##### >  500 concurrent CD executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1
Pipelines: 500
Stages per pipeline: 1
Delegates: 18 (1cpu/4gi)

> Result: **PASS**
Total Execution Time: **4.5min**

</details>

<details>
<summary>October 6, 2023</summary>

This report details information about the following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment
- GKE (Kubernetes Version): 1.26.x

#### Database
- Mongo Atlas M60

#### Redis
- GCP Memory Store (5GB)

#### Harness services

[Helm chart](https://github.com/harness/helm-charts/releases/tag/harness-0.8.2)

| Service Name             | Replicas | CPU (per replica) | Memory (per replica) |                       Version                        |
|--------------------------|:--------:|:-----------------:|:--------------------:|:----------------------------------------------------:|
| access-control           |    5     |         1         |          5           |                    harness-0.8.2                     |
| ci-manager               |    6     |         3         |          6           |                    harness-0.8.2                     |
| pipeline-service         |    10    |         4         |          12          | harness-0.8.2 + fixes <br/> (to be released in 0.11) |
| manager                  |    6     |         3         |          12          |                    harness-0.8.2                     |
| log-service              |    1     |        10         |          24          |                    harness-0.8.2                     |
| ng-manager               |    4     |         3         |          8           |                    harness-0.8.2                     |
| scm                      |    2     |        0.5        |          1           |                    harness-0.8.2                     |
| gateway                  |    2     |         2         |          6           |                    harness-0.8.2                     |
| default-backend          |    1     |        0.1        |         0.2          |                    harness-0.8.2                     |
| nginx-ingress-controller |    2     |         5         |          10          |                    harness-0.8.2                     |
| change-data-capture      |    1     |         4         |          5           |                    harness-0.8.2                     |
| next-gen-ui              |    2     |        0.5        |         0.5          |                    harness-0.8.2                     |
| ng-auth-ui               |    2     |        0.1        |         0.1          |                    harness-0.8.2                     |
| platform-service         |    2     |        2.5        |          3           |                    harness-0.8.2                     |
| template-service         |    2     |         1         |          8           | harness-0.8.2 + fixes <br/> (to be released in 0.11) |
| ti-service               |    1     |         3         |          6           |                    harness-0.8.2                     |
| sto-core                 |    1     |        0.5        |         0.75         |                    harness-0.8.2                     |
| sto-manager              |    1     |         3         |          6           |                    harness-0.8.2                     |
| gitops                   |    1     |         2         |          2           |                    harness-0.8.2                     |
| ui                       |    1     |        0.5        |         0.5          |                    harness-0.8.2                     |
| policy-mgmt              |    1     |        0.5        |         0.5          |                    harness-0.8.2                     |
| timescaledb              |    2     |         1         |          2           |                    harness-0.8.2                     |

##### Override file

[override-perf-ci-cd-ff.yaml](https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml)

#### Test scenarios

##### >  1500 concurrent CI executions INLINE
Each CI pipeline does the following:
- Initializes a Kubernetes pod and Git clone repo
- Runs 4 parallel steps (70 sec sleep)
- Runs template with 2 parallel steps (140 sec sleep)

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 10 (1cpu/2gi)

> Result: **PASS**
Total Execution Time: **6min**

##### >  1500 concurrent CI executions GitX
Each CI pipeline does the following:
- Initializes a K8s pod and Git clone repo
- Runs 5 parallel steps (140 sec sleep) and echo statements

Projects: 1 \
Pipelines: 1500 \
Stages per pipeline: 1 \
Delegates: 10 (1cpu/2gi)

> Result: **PASS**
Total Execution Time: **4.2min**

##### >  500 concurrent CD executions INLINE
Each CD pipeline does the following:
- Fetches a Docker artifact from an AWS ECR repo
- Runs the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects: 1
Pipelines: 500
Stages per pipeline: 1
Delegates: 18 (1cpu/4gi)

> Result: **PASS**
Total Execution Time: **4.2min**

</details>

