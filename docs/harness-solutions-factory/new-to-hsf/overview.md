---
title: Harness Solutions Factory (HSF) Overview
sidebar_label: Overview & Key Concepts
description: Learn about Harness Solutions Factory.
sidebar_position: 10
redirect_from: 
    - /kb/reference-architectures/hsf/overview
---

Harness Solutions Factory (HSF) is a scalable automation framework designed to help organizations rapidly deploy and manage **Harness resources** through **self-service workflows**, **governance**, and **best practices** — all out of the box.

Whether you’re enabling new teams, setting up golden templates, or driving adoption of Harness at scale, HSF provides a repeatable, governed foundation to help you get started faster and stay standardized across your organization.

### Key Capabilities
- **Self-Service Enablement:** Empower development teams to deploy their own Harness resources using guided workflows — no YAML editing or pipeline scripting required.
- **Governance by Design:** Enforce organizational standards automatically through reusable templates and pre-approved configurations.
- **Accelerated Time to Value:** Reduce setup from days or weeks to minutes using out-of-the-box automation.
- **Continuous Standardization:** Ensure all Harness resources stay aligned with best practices.

## Core Concepts
### 1. Self-Service Workflows
Workflows are the user-facing automation steps in HSF.

These guided processes help teams create, configure, and deploy new Harness resources — such as projects, pipelines, and repositories — following approved standards.

Example workflows include:

- **Deploy Harness SAST & SCA Templates**
- **Harness Project Setup**
- **Deploy Harness CI Golden Standard Templates**

### 2. Harness Template Library
Harness Template Library houses all the templates that are created by Harness. They reflect best practices validated by our Center of Excellence (CoE) and implementation engineering team. These templates serve as the foundation for all workflows created through HSF.

This repository is stored in Harness Code Repository and is copied over locally when you first deploy HSF. 

### 3. Custom Harness Template Library
Custom Harness Template Library houses all the templates that are customized and created by your organization. You can make a copy of the templates that are provided by Harness and change it to meet your software needs. 

This repository is stored in Harness Code Repository and is copied over locally when you first deploy HSF. 

### 4. Factory Floors
A **Factory Floor** will apply the core resource pipelines into an existing project. This will allow running the HSF framework directly within the consumer project and allows for distributed architecture.

Each floor deploys the following pipelines: 
- `Execute Drift Analysis`
- `Provision Workspace`
- `Bulk Workspace Management`
- `Create and Manage IACM Workspaces`
- `Teardown IACM Workspaces`
-  `Plan and Validate IACM Workspaces`

### 5. Mini Factory
A **Mini Factory** is an isolated project within the Platform Management organization and is intended to be a place to collect and manage the project workspaces. As part of this, a new project is created.

## Next Steps
- [Get Started](get-started.md) with Harness Solutions Factory to learn how to deploy and manage your resources.