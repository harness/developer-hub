---
title: Overview & Key Concepts
description: Overview & Key Concepts of Environment Management in the Internal Developer Portal. 
sidebar_position: 1
---

## Overview

Environment Management in Harness IDP is a feature that enables developers and platform engineers to create, configure and manage environments, all from a single point within Harness IDP. An environment is a collection of software services that are deployed using CD tools and run in a specific infrastructure configured using IaCM tools. This feature provides a self-service, automated and repeatable approach to configure and manage environments.

### Impact and Benefits
In modern software delivery where environments sit at the very core of every developer's workflow, it is important to maintain a delicate balance between governance, consistency and accessibility across all the environments. Without environment management, setting up environments is slow, inconsistent, and hard to track, leaving developers dependent on other teams and increasing costs and risks. 

Environment Management fixes this by making environments easy to create, consistent, and secure, while giving developers more autonomy and speeding up delivery. By adopting Environment Management, organizations gain the following benefits: 
- **Improved Developer Experience**: Developers work independently without waiting on other teams, leading to faster iterations and quicker delivery. 
- **Built-in Guardrails & Governance**: Security risks are minimized by ensuring proper guardrails and policies are baked in the environment lifecycle management and with proper access control using RBAC. 
- **Improved Software Quality & Reliability**: Standardized, repeatable setups eliminate drift, making it easier to catch issues early and ship with better with confidence.

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

1. **Environment Blueprints**: 
Templates that define how environments should be created (e.g. Infrastructure Workspace Templates, Service Deployment Pipelines). Blueprints standardize environment setup and ensure consistency across teams.
2. **Lifecycle Management**:
Supports Day 2 operations such as creating, updating, and deleting infrastructure and services. 
3. **Platform Orchestrator**:
Handles provisioning and cleanup of infrastructure resources with complex interdependencies. It abstracts away deployment order and dependencies so environments work reliably end-to-end.
4. **Native to IDP**:
Tightly integrated with the IDP Catalog, giving developers a simple, unified interface to discover and provision environments, while enabling platform teams to enforce standards.
5. **Native to Harness**: 
Built as a core feature of Harness IDP, while leveraging the strengths of Harness **CD** and **IaCM** for infrastructure provisioning, service deployment, and governance.

## Key Concepts




