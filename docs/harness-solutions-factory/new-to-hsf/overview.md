---
title: Harness Solutions Factory (HSF) Overview
sidebar_label: Overview & Key Concepts
description: Learn about Harness Solutions Factory.
sidebar_position: 10
redirect_from: 
    - /kb/reference-architectures/hsf/overview
---

Harness Solutions Factory (HSF) is an automation framework that deploys and manages Harness platform resources through self-service workflows, governed templates, and Infrastructure as Code. It gives platform engineering teams a repeatable foundation for onboarding teams to Harness at scale, without requiring each team to configure their own pipelines, projects, or environments from scratch.

### Key Capabilities
- **Self-service workflows:** Development teams can request Harness resources — projects, pipelines, environments — through IDP workflow. No direct platform or Terraform knowledge is required.
- **IaC-backed governance:** Every resource HSF creates is backed by a Terraform workspace in IaCM. Changes go through plan-and-approve cycles, and drift is surfaced in the IDP catalog.
- **Out-of-the-box templates:** HSF ships with pre-built templates for common platform operations: project setup, CI pipeline onboarding, security scanning, build farm configuration, and delegate management.
- **Managed updates:** When Harness releases new versions of HSF, a scheduled pipeline creates a pull request in the harness-solutions-factory and harness-template-library repos. You review and merge on your timeline — nothing auto-applies.

## Core Concepts
### 1. Self-Service Workflows
Workflows are the user-facing entry point to HSF. A user selects a workflow in IDP, fills out some details, and submits. HSF then triggers a pipeline that creates the requested resource, registers it in the IDP catalog, and optionally gates on an approval before applying the changes. Users can watch the execution in real time and access outputs directly from the catalog entry once provisioning is complete.

Example workflows include:

- **Deploy Harness SAST & SCA Templates**
- **Harness Project Setup**
- **Deploy Harness CI Golden Standard Templates**

### 2. Harness Template Library
Harness Template Library houses all the templates that are created by Harness. They reflect best practices validated by the Harness Center of Excellence (CoE) and implementation engineering team. These templates serve as the foundation for all workflows created through HSF.

This repository is stored in Harness Code Repository and is copied over locally when you first deploy HSF. 

### 3. Custom Harness Template Library
Custom Harness Template Library houses all the templates that are customized and created by your organization. You can make a copy of the templates that are provided by Harness and change it to meet your software needs. 

This repository is stored in Harness Code Repository and is copied over locally when you first deploy HSF. 

### 4. [Factory Floors](../use-hsf/mini-factory-and-factory-floor.md)
A **Factory Floor** will apply the core resource pipelines into an existing project. This will allow running the HSF framework directly within the consumer project and allows for distributed architecture.

Each floor deploys the following pipelines: 
- `Execute Drift Analysis`
- `Provision Workspace`
- `Bulk Workspace Management`
- `Create and Manage IACM Workspaces`
- `Teardown IACM Workspaces`
-  `Plan and Validate IACM Workspaces`

### 5. [Mini Factory](../use-hsf/mini-factory-and-factory-floor.md)
A **Mini Factory** is an isolated project within the Platform Management organization and is intended to be a place to collect and manage the project workspaces. As part of this, a new project is created.

### 6. [Hub](../use-hsf/hsf-hub.md)
**Hub** is a project that exposes all Harness IDP workflows as API-triggerable pipelines, enabling customers to integrate them into their own self-service portals.

### 7. [Operating Modes](../use-hsf/hsf-hub.md)
The different **operating modes** allows usage of HSF with and without Harness IDP.

HSF Core are the core 12 pipelines of Harness Solutions Factory

#### *HSF Core + Harness IDP*

This operating model is the traditional model and the only one that has been supported till now. It leverages Harness IDP features to execute workflows, run pipeline stages and control RBAC.

#### *HSF Core + HSF Hub*

This operating model is new with HSF 2.4. Removing the dependency on Harness IDP, HSF Hub is a new project that gets created to house all of the best practice templates from Custom Template Library. It runs a chained pipeline from this project and is controlled by ABAC.

#### *HSF Core + Backstage (or BYO API Connector)*

This operating model is new with HSF 2.4. It allows you to bring your own form of Backstage or API to trigger a HSF Core pipeline.

## Next Steps
- [Get Started](get-started.md) with Harness Solutions Factory to learn how to deploy and manage your resources.