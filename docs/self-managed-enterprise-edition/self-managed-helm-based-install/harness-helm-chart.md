---
title: Harness Helm chart for Self-Managed Enterprise Edition
description: The core modules and components, as well as the optional dependencies and additions, that are included in the Harness Helm chart.
# sidebar_position: 2
helpdocs_topic_id: nsx1d4z86l
helpdocs_category_id: 66qbyn7ugu
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness recommends Helm package manager for the installation and deployment of Self-Managed Enterprise Edition. Helm offers benefits including:

* Declarative and dynamic application management
* Built-in scalability
* Chart reuse across environments
* Repeatable results you can automate

The Harness Helm chart packages the core modules and components that are required to operate Harness at scale.

For instructions on installing Self-Managed Enterprise Edition using Helm, see Install Harness Self-Managed Enterprise Edition Using Helm.

## Supported modules

Self-Managed Enterprise Edition supports the installation of the following Harness modules by Helm chart.



| **Module** | **Helm Install** | **Notes** |
| :-- | :-: | :-- |
| Continuous Delivery | ✓ | Gitops is not included. |
| Security Testing Orchestration | ✓ |  |
| Service Reliability Management | ✓ | Error Tracking is not included. |
| Continuous Integration | ✓ |  |
| Feature Flags | X |  |
| Cloud Costs Management | X |  |
| Harness Chaos Engineering | X |  |
| Harness Platform | ✓ | Policy as Code (Harness Policy Engine) and Custom Dashboards are not included. |

## Requirements

The following infrastructure is required to install Self-Managed Enterprise Edition using Helm.

Support each node with 8 cores vCPU and a minimum of 12 GB memory.

### Production environment

The production environment requires the following resources.

| **Modules** | **Pods** | **CPU** | **Memory (GB)** | **Storage (GB)** |
| --- | --- | --- | --- | --- |
| CD (including Platform) | 38 | 49.3 | 123.2 | 1070 |
| CD and CI | 40 | 51.3 | 135.2 | 1070 |
| CD and STO | 42 | 52.3 | 130.2 | 1070 |
| CD, CI and STO | 44 | 54.3 | 142.2 | 1070 |

### Development environment

The development environment requires the following resources.

| **Modules** | **Pods** | **CPU** | **Memory (GB)** | **Storage (GB)** |
| --- | --- | --- | --- | --- |
| CD (including Platform) | 20 | 22.8 | 58.4 | 530 |
| CD and CI | 21 | 23.8 | 64.4 | 530 |
| CD and STO | 22 | 24.3 | 61.9 | 530 |
| CD, CI and STO | 23 | 25.3 | 67.9 | 530 |

## Included components

Harness Helm chart includes the following components.

**Table 1. Platform components for Continuous Delivery**

| **Component** | **Description** |
| :-- | :-- |
| **Access control** | Provides pipelines with access controls including Kubernetes Role-Based Access Control (RBAC). |
| **Data capture** | Responsible for the capture of data related to the operation of Harness Pipelines, including but not limited to events, tasks, metrics, and logs. |
| **CV Nextgen** | Provides continuous verification (CV) services to Pipeline components including deployments, services, and logs. Aggregates data from multiple providers, including performance metrics, from monitoring activities for dashboard presentation. |
| **Gateway** | Manages application gateway services across Harness Pipelines. |
| **Harness Manager** | Responsible for the analysis and presentation of actionable data from the end-to-end Harness Pipeline in an administrative user interface. |
| **Harness Storage Proxy** | Supplies proxy services for storage. |
| **LE Nextgen** | Supplies Harness Learning Engine (LE), a machine-learning component used to fine-tune Pipelines and identify and flag anomalies. |
| **Log service** | Provides frontend logging services to Harness Pipelines. |
| **MinIO** | A distributed object storage system providing Kubernetes-based, S3-compatible storage. You can use MinIO to store runtime logs (build logs) for Harness Pipelines. |
| **MongoDB** | A NoSQL database offering high-volume storage of data represented as key-value pairs contained in documents and collections of documents. |
| **NextGen UI** | Provides the user interface for Harness NextGen. |
| **NgAuth UI** | User interface component for the AngularJS `ng-auth` authentication service. |
| **NgManager** | Provides NextGen Harness Manager. |
| **Pipeline service** | Supports creating a pipeline. |
| **Platform service** | Represents the Harness Platform service. |
| **Redis** | Provides services for Redis, an in-memory data structure store. |
| **Scm service** | Provides source code management services. |
| **Template service** | Provides Harness templates to enable the design of reusable content, logic, and parameters in Pipelines. |
| **Test Intelligence Service** | Provides the Test Intelligence service. |
| **TimescaleDB** | Provides the TimescaleDB time-series SQL database. |


**Table 2. Harness Platform components**

The following components are included in addition to the Harness Platform components.

| **Component** | **Module** |
| :-- | :-- |
| **Ci-manager** | Continuous Integration |
| **Sto-core** | Enables the creation and management of Harness Security Testing Orchestration |
| **Sto-manager** | Provides core services for Harness Security Testing Orchestration |


**Table 3. Optional dependencies**

| **Dependency** | **Description** |
| :-- | :-- |
| **Ingress Controller** | [Istio](https://istio.io/latest/about/service-mesh/) is an open-source service mesh that supports the Kubernetes Ingress Controller. |
| **Istio** | Supported by default. |

