---
title: Overview
slug: /release-orchestration/overview/what-is-release-orchestration
description: Learn about release orchestration and how it helps manage complex software releases
sidebar_position: 1
---

import DocImage from '@site/src/components/DocImage';

Release Orchestration (BETA) offers a unified framework for modeling, scheduling, automating, and tracking complex software releases across multiple functions, teams, environments, and delivery tools. It orchestrates every step of the software release, from planning releases using Harness AI to production deployments, feature flag enablement, and end-to-end visibility throughout the software release/delivery lifecycle. 

<DocImage path={require('../static/overview.png')} title="Click to view full size image" />

With Harness Release Orchestration, teams define **Processes** (release blueprints) comprising **Phases** and **Activities** that execute across DevOps tools, ranging from infrastructure provisioning and CI/CD to feature flags and external systems.

<DocImage path={require('../static/release-sample.png')} title="Click to view full size image" />

Releases can run on demand or be scheduled to align with business cycles, such as daily, weekly, monthly, or custom. Releases can be linked with the process to achieve the required automation and visibility.

<DocImage path={require('../static/calendar.png')} title="Click to view full size image" />

### Harness Release Orchestration vs Traditional Release Management

Release Orchestration fundamentally transforms how release lifecycles are managed, compared to traditional release management practices that often rely on manual coordination, spreadsheets, and ad-hoc processes. On the contrary, Release Orchestration offers:

- **Structured process modeling** in place of informal checklists
- **Automated execution** instead of manual coordination
- **Real-time visibility** rather than status updates via email or meetings
- **Built-in governance, compliance, and auditability** instead of manual compliance tracking
- **Reusable processes (release blueprints)** to standardize release workflows

### Key Benefits 

In today's complex software environments, which involve multiple teams, tools, and processes, releases without orchestration can become fragmented. This fragmentation makes it difficult to manage releases and brings up the following challenges:

- **Coordinate activities** across CI, CD, feature flags, and external systems for seamless integration and collaboration
- **Achieve end-to-end traceability** (for example, linking code to a deployment)
- **Enforce governance, compliance, and auditability**
- **Visualize and report** on the status and progress of releases
- **Respond quickly** to incidents or rollbacks
- **Execute different functions** in a unified way

Release Orchestration addresses these challenges by offering a unified layer to model, automate, and track the entire release process, ensuring every event, activity, and artifact is linked and queryable. In fact, Release Orchestration enables several capabilities for modern software delivery teams.

- It enables standardization by allowing the creation of standardized release processes that can be reused across different release types, ensuring greater consistency and reducing errors.

- Teams gain complete visibility into release status, progress, and health throughout all phases and activities, promoting informed decision-making.

- Collaboration is enhanced through clear ownership, defined approvals, and streamlined sign-offs, supporting cross-team alignment. 

- Automation of repetitive tasks is made easy, yet the framework remains flexible enough to accommodate manual interventions when necessary. 

- Release Orchestration supports compliance by maintaining audit trails, traceability, and adherence to organizational policies and regulatory requirements.

As you dive deeper into the documentation, we will walk you through all the essential components and entities all the way from modelling your first process to scheduling your release.  

## Next Steps

- Learn about [key concepts](./key-concepts.md) in release orchestration
- Explore [common use cases](./use-cases.md)

