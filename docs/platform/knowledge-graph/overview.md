---
title: Knowledge Graph Overview
description: Learn how the Harness Knowledge Graph models software delivery resources as connected entities, enabling contextual queries and AI-assisted analysis.
sidebar_label: Overview
sidebar_position: 1
keywords:
  - knowledge graph
  - software delivery
  - devops data
  - hql
tags:
  - knowledge-graph
  - platform
  - harness-ai
---

The Harness Knowledge Graph organizes Harness resources into a graph of **entities** and **relationships**, providing a unified view of your software delivery environment.

Resources such as pipelines, executions, services, environments, infrastructure, artifacts, repositories, governance policies, and identities are represented as entities in the graph. The relationships between these entities capture how resources are associated throughout the software delivery lifecycle.

By representing resources and their relationships in a single graph, the Knowledge Graph enables [Harness Query Language (HQL)](/docs/platform/dashboards/dashboard-standard/harness-query-language) and Harness AI to retrieve, analyze, and reason over connected information instead of isolated resources.

## What you will learn in this topic

By the end of this page, you will understand:

* How the Harness Knowledge Graph models Harness resources.
* How entities and relationships provide context across related resources.
* Why the Knowledge Graph is useful for analyzing software delivery activity.
* How to query the Knowledge Graph using HQL.
* Common use cases for the Knowledge Graph.
* How Harness AI uses the Knowledge Graph to provide contextual insights.

---

## Why use the Knowledge Graph?

Answering questions about your delivery environment often requires information from multiple Harness resources.

For example, investigating a failed deployment may require the pipeline execution, deployed service, artifact, target environment, infrastructure, policy evaluations, and the identity that initiated the deployment.

The Knowledge Graph connects these related resources, allowing you to retrieve and analyze them as a single, connected view instead of manually correlating information across the Harness platform.

For example, a pipeline execution can be associated with:

```text id="kgwhy1"
Pipeline Execution
    ├── Service
    ├── Artifact
    ├── Environment
    ├── Infrastructure
    ├── Repository
    ├── Policy
    └── Identity
```

This connected view enables you to answer questions such as:

* Which services experienced deployment failures in Production during the last seven days?
* Which artifacts were associated with failed deployments?
* Which pipelines have the highest failure rate?
* Which policy evaluations failed during production deployments?


## Core concepts

The Harness Knowledge Graph represents Harness resources as entities and connects them through relationships. Together, they provide the context needed to query and analyze related resources.

### Entities

An **entity** represents a Harness resource in the Knowledge Graph. Each entity contains properties that describe the resource, such as its name, type, or status.

The Knowledge Graph can represent resources such as:

| Entity                 | Description                               | Example                         |
| ---------------------- | ----------------------------------------- | ------------------------------- |
| **Pipeline**           | Pipeline definitions                      | CI and CD pipelines             |
| **Pipeline Execution** | Individual pipeline runs                  | Successful or failed executions |
| **Stage**              | Logical groups of steps within a pipeline | Build, Deploy, Approval         |
| **Step**               | Individual operations within a stage      | Build, Shell Script, Terraform  |
| **Service**            | Services managed in Harness               | `payment-api`                   |
| **Environment**        | Deployment environments                   | Production, QA, Staging         |
| **Infrastructure**     | Target infrastructure                     | Kubernetes, VM, Cloud           |
| **Artifact**           | Deployable artifacts                      | Container images, Helm charts   |
| **Repository**         | Source code repositories                  | Git repositories                |
| **Policy**             | Governance policies and evaluations       | OPA policies                    |
| **Identity**           | Users and service accounts                | User or service principal       |

### Relationships

A **relationship** connects two entities in the Knowledge Graph and describes how they are associated.

For example, a pipeline execution can be connected to the pipeline, service, artifact, environment, infrastructure, repository, policy, and identity associated with that execution.

```text
Pipeline Execution
 ├── Pipeline
 ├── Service
 ├── Artifact
 ├── Environment
 ├── Infrastructure
 ├── Repository
 ├── Policy
 └── Identity
```

These relationships enable you to navigate from one resource to another without manually correlating information across multiple resources.

### Operational context

Operational context is the complete view of a resource and its related entities.

For example, a failed pipeline execution becomes more meaningful when viewed together with the associated service, artifact, environment, infrastructure, policies, and identity.

```text
Failed Pipeline Execution
        │
        ├── Service: payment-api
        ├── Artifact: payment-api:v2.8.1
        ├── Environment: Production
        ├── Infrastructure: EKS Cluster
        ├── Policy: Production Approval
        └── Identity: jane.doe@example.com
```

This connected view helps you answer questions such as:

* Which artifact was deployed?
* Which environment was affected?
* Which policy evaluation failed?
* Who initiated the deployment?
* Which service experienced the failure?

> **Note**: Entities represent resources. Relationships connect those resources. Together, they provide the operational context used by HQL and Harness AI.

---

## Accessing the Knowledge Graph

The Knowledge Graph serves as the foundation for retrieving connected resource data. Applications access the graph to traverse entities and relationships instead of querying individual resources independently.

You can interact with the Knowledge Graph by writing HQL queries or asking questions in natural language through Harness AI.

For example, consider the following question:

> Which production deployments of `payment-api` failed policy evaluation during the last seven days?

Answering this question requires traversing multiple related resources rather than retrieving a single record.

```text
User request
       │
       ▼
Knowledge Graph
(Entities + Relationships)
       │
       ├── Traverse related entities
       ├── Retrieve connected data
       └── Build operational context
       │
       ▼
HQL results or AI response
```

Whether the request originates from an HQL query or a natural language prompt, the Knowledge Graph provides the connected context required to retrieve meaningful results.

---

## Common use cases

The Knowledge Graph enables you to analyze software delivery activity by connecting related resources across the Harness platform. Instead of querying individual resources, you can retrieve operational context that spans pipelines, executions, services, environments, artifacts, policies, and identities.

### Investigate pipeline failures

Analyze pipeline failures by correlating executions with the services, environments, infrastructure, and policies involved in the deployment.

**Example**

> Which services experienced deployment failures in the Production environment during the last seven days, and which stages failed most frequently?

---

### Analyze deployments

Trace deployments across the resources involved in a release to understand what changed and where it was deployed.

**Example**

> Which version of `payment-api` was deployed to Production, which artifact was used, and which infrastructure hosted the deployment?

---

### Investigate governance

Understand how governance policies impact software delivery by correlating policy evaluations with deployment activity.

**Example**

> Which production deployments failed policy evaluation during the last 30 days, and which services were affected?

---

### Analyze delivery performance

Identify trends across pipeline executions to understand where delivery time is spent.

**Example**

> Which deployment stages consistently have the longest execution duration across Production deployments?

---

### Trace resource relationships

Navigate connected resources to understand how a deployment is related to other objects in your delivery environment.

**Example**

Starting with a pipeline execution, you can identify:

* The pipeline that initiated the execution.
* The deployed service and artifact.
* The target environment and infrastructure.
* Associated policy evaluations.
* The user or service account that initiated the deployment.

---


