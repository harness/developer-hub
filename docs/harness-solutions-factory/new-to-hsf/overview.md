---
title: Harness Solutions Factory (HSF) Overview
sidebar_label: Overview & Key Concepts
description: Learn about Harness Solutions Factory.
keywords:
  - hsf overview
  - self-service workflows
  - harness template library
  - factory floor
  - mini factory
  - operating modes
tags:
  - hsf
  - overview
sidebar_position: 10
redirect_from: 
    - /kb/reference-architectures/hsf/overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Solutions Factory (HSF) is an automation framework that deploys and manages Harness platform resources through self-service workflows, governed templates, and Infrastructure as Code. It gives platform engineering teams a repeatable foundation for onboarding teams to Harness at scale, without requiring each team to configure their own pipelines, projects, or environments from scratch.

It is now source available, and both [Harness Solutions Factory](https://github.com/harness/harness-solutions-factory) and [Harness Template Library](https://github.com/harness/harness-template-library) can be found on GitHub.

### Key capabilities
- **Self-service workflows:** Development teams can request Harness resources (projects, pipelines, environments) through IDP workflow. No direct platform or Terraform knowledge is required.
- **IaC-backed governance:** Every resource HSF creates is backed by a Terraform workspace in IaCM. Changes go through plan-and-approve cycles, and drift is surfaced in the IDP catalog.
- **Out-of-the-box templates:** HSF ships with pre-built templates for common platform operations: project setup, CI pipeline onboarding, security scanning, build farm configuration, and delegate management.
- **Managed updates:** When Harness releases new versions of HSF, a scheduled pipeline creates a pull request in the harness-solutions-factory and harness-template-library repos. You review and merge on your timeline; nothing auto-applies.

## Core concepts
### 1. Self-service workflows
Workflows are the user-facing entry point to HSF. A user selects a workflow in IDP, fills out some details, and submits. HSF then triggers a pipeline that creates the requested resource, registers it in the IDP catalog, and optionally gates on an approval before applying the changes. Users can watch the execution in real time and access outputs directly from the catalog entry once provisioning is complete.

Example workflows include:

- **Deploy Harness SAST & SCA Templates**
- **Harness Project Setup**
- **Deploy Harness CI Golden Standard Templates**

### 2. Template Library
Harness Template Library houses all the templates that are created by Harness. They reflect best practices validated by the Harness Center of Excellence (CoE) and implementation engineering team. These templates serve as the foundation for all workflows created through HSF.

This repository is stored in [Github](https://github.com/harness/harness-template-library). 

When you deploy HSF, you will have the option to make a point in time copy of this repository in a SCM of your choice. This is where you will customize.

### 3. [Factory Floors](../use-hsf/mini-factory-and-factory-floor.md)
A **Factory Floor** will apply the core resource pipelines into an existing project. This will allow running the HSF framework directly within the consumer project and allows for distributed architecture.

Each floor deploys the following pipelines: 

- `Bulk Workspace Management`
- `Create and Manage IACM Workspaces`
- `Execute Drift Analysis`
- `Plan and Validate IACM Workspaces`
- `Provision Workspace`
- `Teardown IACM Workspaces`

### 4. [Mini Factory](../use-hsf/mini-factory-and-factory-floor.md)
A **Mini Factory** is an isolated project within the Platform Management organization and is intended to be a place to collect and manage the project workspaces. As part of this, a new project is created.

### 5. [Hub](../use-hsf/hsf-hub.md)
**Hub** is a project that exposes all Harness IDP workflows as API-triggerable pipelines, enabling customers to integrate them into their own self-service portals.

### 6. [Operating modes](../use-hsf/hsf-hub.md)
The different **operating modes** allows usage of HSF with and without Harness IDP.
:::tip Which operating mode should I use?

**Core+IDP**: The default, traditional model. Use if you have Harness IDP licensed and/or want the full self-service portal experience.

**Core+Hub**: Use if you want to remove the Harness IDP dependency (available in v2.4+). Hub provides the workflow layer via chained pipelines and ABAC.

**Core+Backstage**: Use if your organization already has Backstage or another internal developer portal and wants to connect it via API.
:::

HSF Core are the core 16 pipelines of Harness Solutions Factory

#### *HSF Core + Harness IDP*

This operating model is the traditional model and the only one that has been supported till now. It leverages Harness IDP features to execute workflows, run pipeline stages and control RBAC.

#### *HSF Core + HSF Hub*

This operating model is new with HSF 2.4. Removing the dependency on Harness IDP, HSF Hub is a new project that gets created to house all of the best practice templates from Custom Template Library. It runs a chained pipeline from this project and is controlled by ABAC.

#### *HSF Core + Backstage (or BYO API Connector)*

This operating model is new with HSF 2.4. It allows you to bring your own form of Backstage or API to trigger a HSF Core pipeline.

Go to [How HSF works](./how-hsf-works.md) to understand how the concepts above fit together, including the Pilot Light and Solutions Factory distinction and how a single request becomes a provisioned resource.

---

## Prerequisites

Before HSF can be deployed, confirm the following:

- The IDP, IaCM, and Harness Code Repository modules are enabled on your account. If you do not have these licensed, Harness can provide a limited license to cover HSF usage for managing Harness entities.
- You have an account with admin-level permissions, or can coordinate with someone who does to generate a temporary Personal Access Token (PAT). This token is used to create account-level resources during deployment and can be deleted afterward.
- No account-level OPA policies are in place that would block pipeline execution.

---

## Choose your onboarding path

There are two ways to get HSF into your account. Which one applies to you depends on whether you have a Professional Services engagement.

<Tabs>
<TabItem value="ps-assisted" label="Professional Services" default>

Use this path if your organization has a Professional Services engagement. HSF is delivered as part of an existing Professional Services package at no additional cost.

Reach out to your Harness account team to confirm your eligibility. A Professional Services engineer then runs the deployment for you, which creates a dedicated Harness Platform Management organization in your account along with all the core pipelines, workspaces, repositories, and user groups HSF needs to operate.

Your first step after the deployment completes is [Get started with HSF Post Deployment](./get-started.md) to configure users, notifications, and your container registry.

</TabItem>
<TabItem value="self-service" label="Self-service">

Use this path if you do not have a Professional Services engagement and you have both IDP and IaCM licensed on your account. HSF is source available, so you can deploy it yourself.

You run the deployment locally with OpenTofu or mise against your own account.

1. Go to [Deploy Harness Solutions Factory](./hsf-deployment-guide.md) to run the deployment.
2. Go to [Get started with HSF Post Deployment](./get-started.md) to configure users, notifications, and your container registry.

</TabItem>
</Tabs>

Both paths produce the same result and converge on the same post-deployment configuration. Go to [Created Resources](../use-hsf/created-resources.md) to review exactly what gets created in your account.
