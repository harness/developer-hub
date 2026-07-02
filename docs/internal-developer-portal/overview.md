---
title: Overview
description: A home for developers to create, manage, and explore software.
sidebar_position: 1
sidebar_label: Overview
redirect_from:
  - /docs/internal-developer-portal/get-started/overview
  - /docs/internal-developer-portal/getting-started/overview
  - /docs/internal-developer-portal/key-concepts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Harness Internal Developer Portal (IDP) is a unified platform that empowers developers to build, discover, and manage software while platform engineers automate standards and governance.**

Harness IDP enables you to:

- *Create* new software components quickly while adhering to your company's best practices.
- *Automate* day-to-day developer tasks and processes by creating self-service Workflows. 
- *Manage* the software you own with a developer-centric view of service health, deployments, and alerts.
- *Explore* your organization's entire software ecosystem to discover technical documentation, APIs, and services.

Fully integrated with the Harness platform, Harness IDP boosts **developer productivity** and satisfaction while reducing **maintenance overhead** for platform engineering teams, enabling your organization to ship faster with higher quality.

---

## What is Harness IDP?

An Internal Developer Portal (IDP) is a centralized platform that brings together all the tools, services, and knowledge developers need to build and ship software efficiently. It serves as the **single source of truth** for your organization's software ecosystem.

To read more about the Harness IDP core product pillars, go to [Product Pillars](/docs/internal-developer-portal/overview.md#product-pillars). 

Here's a quick overview of **how Harness IDP works**:
![](./static/overview-page-flow.png)

Here's how Harness IDP boosts developer productivity and reduce overhead toil for platform engineers:

- **For Platform Engineers:** Automate developer workflows with built-in standards and guardrails. Build *golden paths* that free your team from repetitive tasks, enforce best practices across all services, and scale your platform; all while maintaining control and governance.
- **For Developers:** Get productive faster with *self-service access* to everything you need. Create new services in minutes using pre-approved templates, discover any API or documentation instantly, and access all your tools from one unified interface; no more context switching or waiting on tickets.
---

## Product Pillars

Harness IDP is built on some core pillars that work together to deliver a complete and productive developer experience. Here's how each pillar helps you:

<Tabs>
<TabItem value="catalog" label="Software Catalog" default>

#### Your Single Source of Truth for All Software Assets

The Software Catalog provides a **centralized registry** of all your services, APIs, libraries, and infrastructure components. Track ownership, dependencies, and metadata in **one searchable location**.

**Key Capabilities:**
- Discover any service or API instantly with powerful Catalog search. 
- Visualize service dependencies and relationships, with all the context in one place. 
- Track service ownership and contact information. 
- Auto-import and populate Catalog from Git and Harness CD. 

[Learn more about Software Catalog →](/docs/internal-developer-portal/catalog/overview)

![](./static/software-catalog-overview.png)

</TabItem>

<TabItem value="workflows" label="Workflows">

#### Automate Service Onboarding and Day-2 operations

Self-Service Workflows eliminate repetitive tasks by providing developers with **golden path templates** for common operations. Platform engineers build the workflows once, and developers use them repeatedly.

**Key Capabilities:**
- Create new services from pre-approved templates. 
- Provision infrastructure and cloud resources automatically. 
- Configure CI/CD pipelines without manual setup. 
- Execute day-to-day operations with a simple form. 

[Learn more about Workflows →](/docs/internal-developer-portal/flows/overview)

![](./static/workflows-overview-latest.png)

</TabItem>

<TabItem value="scorecards" label="Scorecards">

#### Measure and enforce Software Quality standards

Scorecards help you **define, track, and improve Software Quality** across your organization. Set standards for security, reliability, documentation, and DevOps maturity, then measure compliance automatically. Get **automated visibility** into which services meet your standards and which need improvement.

**Key Capabilities:**
- Define quality checks and maturity standards. 
- Measure compliance across all services. 
- Track improvement over time with trends. 
- Enforce production readiness gates. 

[Learn more about Scorecards →](/docs/internal-developer-portal/scorecards/scorecard)

![](./static/scorecards-overview-latest.png)

</TabItem>

<TabItem value="environment-management" label="Environment Management">

#### Create, configure, and manage environments with self-service

Environment Management enables developers and platform engineers to **create, configure, and manage environments from a single point of control**. Provide a **self-service, automated, and repeatable** way to manage environments efficiently with built-in guardrails and governance.

**Key Capabilities:**
- Create environments using standardized blueprints and templates.
- Manage Day 2 operations (create, update, delete) for infrastructure and services.
- Orchestrate complex infrastructure provisioning with Platform Orchestrator.
- Enforce governance and compliance through RBAC and policies.

[Learn more about Environment Management →](/docs/internal-developer-portal/environment-management/overview)

</TabItem>

<TabItem value="plugins" label="Plugins">

#### Enrich your Software Catalog with contextual metadata

Plugins display additional **metadata** about software components and entities **directly in the catalog**, showing information like CI/CD pipelines, alerts, incidents, and more; all without leaving the portal.

**Key Capabilities:**
- View CI/CD pipeline status, deployment history, and build information about software components directly in the Catalog.
- Monitor alerts, incidents, and service health in real-time.
- Upload and use custom plugins tailored to your internal tools.
- Continuously expanding plugin library with new integrations.

[Learn more about Plugins →](/docs/internal-developer-portal/plugins/overview)

</TabItem>

<TabItem value="techdocs" label="TechDocs">

#### Documentation that lives with your Code

TechDocs enables a docs-as-code approach where documentation lives alongside your source code in Git. Write docs in **Markdown**, commit them alongside your source code, and publish automatically. Your team can discover and access documentation instantly through the **Docs tab** in the Catalog, no more outdated wikis or scattered knowledge.

**Key Capabilities:**
- Write documentation in Markdown alongside your code.
- Support for MkDocs plugins including Material theme, diagrams, and code documentation.
- Search across all documentation.
- Version docs alongside code for consistency.

[Learn more about TechDocs →](/docs/internal-developer-portal/catalog/integrate-tools/techdocs/enable-docs)

</TabItem>
</Tabs>

---

## Video Overview

Watch this video to learn more about Harness IDP:

<DocVideo src="https://www.youtube.com/embed/sVnI93bCr38?si=MpENxU9qv3me28cv" />

---

## Get Started

Ready to get started with Harness IDP? Follow these simple steps:

1. [Enable Harness IDP](/docs/internal-developer-portal/get-started)
2. [Setup Git Integrations](/docs/internal-developer-portal/get-started)
3. [Populate Your Catalog](/docs/internal-developer-portal/get-started)
4. [Create Your First Workflow](/docs/internal-developer-portal/get-started)
5. [Configure Plugins](/docs/internal-developer-portal/plugins/overview)
6. [Define Quality Scorecards](/docs/internal-developer-portal/scorecards/scorecard)

---