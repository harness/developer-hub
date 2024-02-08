---
title: Performance test reports
description: View test environment and resource configuration test scenarios and results.
sidebar_position: 27
---

Harness publishes performance test reports with each release. Select a report below to view test report details.

<details>
<summary>October 27, 2023</summary>

This document details information about following:
1. Test environment and resource configuration
2. Test scenario and results

### Environment
- GKE (Kubernetes Version): 1.26.x 

### Database
- Mongo Atlas M60

### Redis
- GCP Memory Store (5GB)

### Harness services

Helm chart : https://github.com/harness/helm-charts/releases/tag/harness-0.9.2

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

#### Override file: 
https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml

#### Manager config: 
update `LOG_STREAMING_SERVICE_EXTERNAL_URL` = `<smp host url>`/log-service/

### Test scenarios
  
#### >  1500 concurrent CI executions INLINE
Each CI pipeline would:
- initialize a k8s pod and git clone repo  
- run 5 parallel steps (70 sec sleep)
- run template with 2 parallel steps (140sec sleep)

Projects: 1  
Pipelines: 1500  
Stages per pipeline: 1  
Delegates: 10 (1cpu/2gi)  

> Result : **PASS**  
Total Execution Time: **6min**
  
#### >  1500 concurrent CI executions GitX
Each CI pipeline would:
- initialize a k8s pod and git clone repo
- run 5 parallel steps (140 sec sleep) and echo statements

Projects: 1  
Pipelines: 1500  
Stages per pipeline: 1  
Delegates: 10 (1cpu/2gi)  

> Result: **PASS**  
Total Execution Time: **5min**
  
#### >  500 concurrent CD executions INLINE
Each CD pipeline would:
- fetch docker artifact from AWS ECR repo
- run the following steps in order:
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

This document details information about following:
1. Test environment and resource configuration
2. Test scenario and results

### Environment
- GKE (Kubernetes Version) : 1.26.x 

### Database
- Mongo Atlas M60

### Redis
- GCP Memory Store (5GB)

### Harness services

Helm chart : https://github.com/harness/helm-charts/releases/tag/harness-0.8.2

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

#### Override file: 
https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml

### Test scenarios
  
#### >  1500 concurrent CI executions INLINE
Each CI pipeline would:
- initialize a k8s pod and git clone repo  
- run 4 parallel steps (70 sec sleep)
- run template with 2 parallel steps (140sec sleep)

Projects: 1  
Pipelines: 1500  
Stages per pipeline: 1  
Delegates: 10 (1cpu/2gi)  

> Result: **PASS**  
Total Execution Time: **6min**
  
#### >  1500 concurrent CI executions GitX
Each CI pipeline would 
- initialize a k8s pod and git clone repo
- run 5 parallel steps (140 sec sleep) and echo statements

Projects: 1  
Pipelines: 1500  
Stages per pipeline: 1  
Delegates: 10 (1cpu/2gi)  

> Result: **PASS**  
Total Execution Time: **4.2min**
  
#### >  500 concurrent CD executions INLINE
Each CD pipeline would:
- fetch docker artifact from AWS ECR repo
- run the following steps in order:
   - Canary deploy
   - Canary delete
   - Rolling deploy
   - K8s Delete

Projects : 1  
Pipelines : 500  
Stages per pipeline : 1   
Delegates : 18 (1cpu/4gi)

> Result : **PASS**  
Total Execution Time: **4.2min**

</details>
