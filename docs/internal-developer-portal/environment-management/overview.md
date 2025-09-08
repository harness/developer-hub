---
title: Overview & Key Concepts
description: Overview & Key Concepts of Environment Management in the Harness IDP. 
sidebar_position: 1
---

:::info
**Harness IDP Environment Management** feature is currently behind the feature flag `IDP_SSEM`. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.
:::

## Overview

Environment Management in Harness IDP enables developers and platform engineers to **create, configure, and manage environments from a single point of control**. An environment is a collection of software services deployed using CD tools and executed on infrastructure provisioned through IaCM tools. This feature provides a **self-service, automated, and repeatable** way to manage environments efficiently.

### Impact and Benefits

In modern software delivery, environments sit at the very core of every developer’s workflow. Maintaining the right balance between **governance, consistency, and accessibility** is critical. Without environment management, setup becomes slow, inconsistent, and difficult to track - leaving developers dependent on other teams, while driving up costs and risks.

Harness IDP Environment Management solves this by making environments **easy to create, consistent, and secure**, while giving developers autonomy and speeding up delivery. By adopting Environment Management, organizations gain the following benefits:

* **Improved Developer Experience**: Developers can work independently without relying on other teams, enabling faster iterations and quicker delivery.
* **Built-in Guardrails & Governance**: Security and compliance are enforced through guardrails and policies baked into the environment lifecycle, with access controlled via RBAC.
* **Improved Software Quality & Reliability**: Standardized, repeatable setups eliminate drift, making it easier to catch issues early and ship with greater confidence.

### Environment Management Stack
Environment Management is a core feature of Harness IDP. It gives developers a self-service way to create and manage environments, while platform engineers define the standards behind them.

**Harness IDP** is the control center for this feature, but it works closely with other Harness modules to make it powerful:
- **IaCM (Infrastructure Management)**: Provisions and manages the infrastructure needed for service deployment.
- **CD (Service Deployment)**: Deploys services into those environments with the target infrastructure points.
- **Harness IDP**: Enables developers to create, configure and manage environments.

Together, these modules ensure every environment is consistent, secure, and easy to use, from infra setup to service deployment, while keeping the developer experience simple and self-service.

![](./static/env-mgmt.jpg)


### Key Features
Environment Management in Harness IDP brings together various features to make environments easy to create, manage, and operate.

1. **Environment Blueprints:**
   Templates that define how environments should be created (e.g., Infrastructure Workspace Templates, Service Deployment Pipelines). Blueprints standardize setup processes and ensure **consistency across teams**.
2. **Lifecycle Management:**
   Supports **Day 2 operations** such as creating, updating, and deleting infrastructure and services to keep environments up-to-date and optimized.
3. **Platform Orchestrator:**
   Orchestrates the provisioning and cleanup of infrastructure resources, even with complex interdependencies. It abstracts away deployment sequences and dependencies, ensuring environments run **reliably end-to-end**.
4. **Native to IDP:**
   Fully integrated with the **IDP Catalog**, providing developers with a unified and intuitive interface to **discover and provision environments**, while giving platform teams the ability to enforce organizational standards and guardrails.
5. **Native to Harness:**
   Built as a **core feature** of Harness IDP, leveraging the proven strengths of **Harness CD** and **IaCM** for infrastructure provisioning, service deployment, and governance. **Built upon Harness Pipelines**, it can seamlessly onboard existing IaCM and CD templates and pipelines, enabling teams to adapt and modernize without starting from scratch.

## Key Concepts

### Environment Blueprint
An Environment Blueprint is a collection of infrastructure templates, services, their configurations and lifecycle management details of each. When a blueprint is instantiated, it generates running instances of Environments. Blueprints are typically owned and maintained by the Platform Engineering team. Go to [Environment Blueprints](/docs/internal-developer-portal/environment-management/env-blueprint-yaml.md) to learn more. 

### Environment
An Environment is instantiated using an Environment Blueprint and represents the deployed infrastructure and services, as defined in the blueprint. It is a collection of software services deployed using CD tools and executed on infrastructure provisioned through IaCM tools. Go to [Environments](/docs/internal-developer-portal/environment-management/environments.md) to learn more.

### Service (IDP Component)
A Component in IDP Catalog represents a service or any other type of software component. For Environment Management use-cases, an IDP Component represents the service being deployed using CD. Go to [Catalog Entities](/docs/internal-developer-portal/catalog/data-model#harness-idp-entities-idp-20) to learn more.

### Workspace
IaCM Workspace is a container for your infrastructure resources. It integrates IaC code, variables, cloud provider connections, state files, and workflows. In Terraform, each workspace has its own state file, which tracks the status of its managed resources. Go to [Workspaces](/docs/category/workspaces) to learn more.

### Workspace Templates
With IaCM Workspace Templates, you can standardize workspace configurations across your projects by predefining essential variables, configuration settings, and other workspace options. Go to [Workspace Templates](/docs/infra-as-code-management/workspaces/workspace-templates) to learn more.




