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

The Harness delegate is crucial to [Harness Database DevOps](/docs/database-devops/overview.md) because it gives us access to your infrastructure on which we execute jobs that require database network connectivity. The Harness Delegate acts as an agent that facilitates the connection between the [Harness CI/CD](../../continuous-integration/get-started/overview.md) pipeline and the database. It enables the execution of database changes in a secure and efficient manner. The Delegate can be configured to connect to various database instances, ensuring that the right credentials and access parameters are used for each environment.

## Communication Protocol between Services and Customer Infra

![Harness DB DevOps architecture diagram](./static/detailed-architectural-diagram.png)

## Understanding How Secret's Info is Sent to Build Pods

1. All secret requests are first sent as expressions from Harness to Delegates, where they are decrypted inside the Pod init request.
2. Decrypted secrets are added as Kubernetes Secrets in the same namespace where build pods are deployed.
3. Those secrets are referenced inside the Pod definition using imagePullSecrets.

:::info
Container registry credentials are stored as .dockercfg type secret in Kubernetes secret, allowing the Pod to pull images from the specified registry in the stepGroup.
:::
