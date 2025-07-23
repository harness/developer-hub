---
sidebar_position: 2
title: Deployment Architecture
description: Understand the deployment architecture of Harness Database DevOps, including components, data flow, and integration points.
keywords:
  - deployment architecture
  - harness database devops
  - dbops architecture
  - database devops components
  - data flow
  - infrastructure setup
  - dbops system design
  - harness architecture diagram
  - database deployment lifecycle
  - ci cd database pipeline
tags:
  - harness-db-devops
  - deployment-architecture
  - system-design
  - dbops-infrastructure
  - ci-cd-integration
---

Welcome to the Harness Database DevOps Product Documentation. This guide will assist you in  integrating database operations into your application deployment workflows. Our Database DevOps module enables you to manage database schemas, orchestrate changes, and ensure consistency across all your environments. Let's dive into how Harness Database DevOps can streamline your database change management and enhance your overall deployment strategy.

## Before you begin, review the following:

- [All about Database DevOps](/docs/database-devops/overview.md)

## Harness DB DevOps Architecture


:::info
Before you can access Harness Database DevOps, you must have Harness enable the following feature flag, `DBOPS_ENABLED`. To enable the feature flag, please contact [Harness Support](mailto:support@harness.io).
:::



   ![Harness DB DevOps architecture diagram](./static/database-devops-architecture.png)



[Harness Database DevOps](/docs/database-devops/overview.md) is crucial to the Harness Delegate because it integrates database change management into [Harness CI](../../continuous-integration/get-started/overview.md), enabling organizations to apply DevOps best practices to their database operations. Here are several key points that highlight its importance:

 1. **Orchestration of Database Changes**: Harness Database DevOps allows for the orchestration of database changes in a manner similar to application code deployments. This means that database changes can be managed through pipelines, ensuring that they are executed in a controlled and automated way. This orchestration helps to eliminate the manual processes that often slow down deployments when database changes are involved.

 2. **Integration with CI/CD Practices**: By incorporating database changes into the CI/CD pipeline, Harness enables teams to ship database updates with the same frequency and reliability as application code. This is particularly important for organizations that deploy applications multiple times a day but face delays when needing to make database changes.

 3. **Visibility and Governance**: Database DevOps provides enhanced visibility into the state of databases across different environments. This visibility is essential for DBAs and DevOps teams to track changes, understand the deployment status, and ensure compliance with governance policies. The ability to compare database schemas between environments and enforce policies on allowed changes helps maintain database integrity and performance.

 4. **Collaboration Between Teams**: The integration of database changes into the deployment pipeline fosters collaboration between database administrators (DBAs) and application development teams. This collaboration is vital for ensuring that database changes are made safely and effectively, allowing developers to implement features at a faster pace while DBAs can enforce necessary guardrails.

 5. **Automated Rollback and Impact Analysis**: Harness Database DevOps supports automated rollback processes and impact analysis for database changes. This capability is essential for mitigating risks associated with deploying changes that could negatively affect database performance or stability. By providing tools to analyze the potential impact of queries before they are executed, organizations can prevent issues before they arise.

 6. **Utilization of Delegates**: The Harness Delegate acts as an agent that facilitates the connection between the CI/CD pipeline and the database. It enables the execution of database changes in a secure and efficient manner. The Delegate can be configured to connect to various database instances, ensuring that the right credentials and access parameters are used for each environment.

In summary, Database DevOps is vital to the Harness Delegate as it enhances the overall deployment process by integrating database management into CI/CD workflows, improving visibility, governance, and collaboration, while also enabling automation and risk mitigation. This integration ultimately leads to faster, more reliable, and safer database deployments.

## Communication Protocol between Services and Customer Infra


   ![Harness DB DevOps architecture diagram](./static/detailed-architectural-diagram.png)


## Understanding How Secret's Info is Sent to Build Pods

1. All secret requests are first sent as expressions from Harness to Delegates, where they are decrypted inside the Pod init request.
2. Decrypted secrets are added as Kubernetes Secrets in the same namespace where build pods are deployed.
3. Those secrets are referenced inside the Pod definition using imagePullSecrets.

:::info
Container registry credentials are stored as .dockercfg type secret in Kubernetes secret, allowing the Pod to pull images from the specified registry in the stepGroup.
:::

