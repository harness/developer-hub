---
title: User profiles
description: This topic describes user profiles for Harness Self-Managed Enterprise Edition.
sidebar_position: 2
---

This topic provides detailed information about the different types of user profiles and the specific license requirements for accessing and using Harness Self-Managed Enterprise Edition.

## User profiles

There are four user profiles for Harness Self-Managed Enterprise Edition.

- Demo
- Small
- Medium
- Large

| **Size** | **# of users** | **Parallel executions (CD)** | **Parallel executions (CI)** |**Parallel executions (STO)** | **Chaos experiments** |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Demo|Up to 10|2|2|2|2|
| Small|Up to 200|50|50|50|50|
| Medium|Up to 1000|250|250|250|250|
| Large|Up to 3000|500|500|500|500|

### Free demo users

This profile is used for demonstration purposes to allow you to test Harness Self-Managed Enterprise Edition before onboarding. This profile enables you to run up to six simultaneous executions across three modules and one Chaos Engineering experiment.

#### Demo user requirements

Core CPU and memory requirements depend on the modules you use for demo purposes.

- **CI and CD:** Minimum 3 core CPU and 14 Gi memory
- **STO:** Additional 0.4 core CPU and 750 Mi memory
- **Chaos Engineering:** Additional 0.4 core CPU and 750 Mi memory

#### Core service requirements

Harness has identified the resource requirements for each service, which you can scale via HPA based on usage. The base specifications of core services are provided below.

##### CI-Manager

   ```yaml
    java:
      memory: "2048m"
    replicaCount: 1
    resources:
      limits:
        memory: 3Gi
      requests:
        cpu: 2
        memory: 3Gi
   ```

##### Access-Control

   ```yaml
    java:
      memory: 384m
    replicaCount: 1
    resources:
      limits:
        memory: 1536Mi
      requests:
        cpu: 1
        memory: 1536Mi
   ```

##### Gateway

   ```yaml
    java:
      memory: 1536
    replicaCount: 1
    resources:
      limits:
        memory: 3072Mi
      requests:
        cpu: 256m
        memory: 3072Mi
   ```

##### Harness-Manager

   ```yaml
    java:
      memory: "2048"
    replicaCount: 1
    resources:
      limits:
        memory: 4Gi
      requests:
        cpu: 1
        memory: 4Gi
   ```

##### Log-Service

   ```yaml
    replicaCount: 1
    resources:
      limits:
        memory: 2Gi
      requests:
        cpu: 1
        memory: 2Gi
   ```

##### NG-Manager

   ```yaml
    java:
      memory: "2048m"
    replicaCount: 1
    resources:
      limits:
        memory: 4Gi
      requests:
        cpu: 2
        memory: 4Gi
   ```

##### Pipeline-Service

   ```yaml
    java:
      memory: "3072m"
    replicaCount: 1
    resources:
      limits:
        memory: 4Gi
      requests:
        cpu: 2
        memory: 4Gi
   ```

##### Platform-Service

   ```yaml
    java:
      memory: "1536m"
    replicaCount: 1
    resources:
      limits:
        memory: 2Gi
      requests:
        cpu: 1
        memory: 2Gi
   ```

### Scale small, medium, and large profiles via HPA

Harness tested HPA for services by running total of 3,000 pipelines (CI+CD) with one user. Harness tested with ~250 users and 1,500 pipeline executions. Each user executed six pipelines.

You can scale your environment by adding HPA on each service.

#### Use HPA for small profiles

The following YAML adds autoscaling for a small profile.

   ```yaml
   autoscaling:
      enabled: true
      minReplicas: 1
      maxReplicas: 2
      targetCPU: 80
      targetMemory: 80
   ```

#### Use HPA for medium profiles

The following YAML adds autoscaling for a medium profile.

   ```yaml
    autoscaling:
      enabled: true
      minReplicas: 1
      maxReplicas: 3
      targetCPU: 80
      targetMemory: 80
   ```

#### Use HPA for large profiles

The following YAML adds autoscaling for a large profile.

   ```yaml
    autoscaling:
      enabled: true
      minReplicas: 1
      maxReplicas: 4
      targetCPU: 80
      targetMemory: 80
   ```

## Acquire a license

Contact [Harness Support](mailto:support@harness.io) for license information.
