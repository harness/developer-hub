---
title: SEI 2.0 - Key concepts
description: The new experience for measuring engineering insights in Harness SEI
sidebar_label: Key concepts
sidebar_position: 10
---

Harness Software Engineering Insights (SEI) 2.0 is a complete reimagination of how engineering organizations can understand, measure, and improve software delivery. It brings together signals across your SDLC, connects them with organizational context, and transforms them into actionable insights for teams, managers, and executives.

This topic outlines the core concepts that power SEI 2.0.

## Overview

SEI 2.0 is built around a set of flexible building blocks that help you answer critical questions like:

* Are our engineering teams operating efficiently?
* How is work flowing from idea to production?
* Where are the bottlenecks in our delivery pipeline?
* Are we meeting our reliability and velocity goals?

To answer these questions, SEI 2.0 introduces a simplified and extensible data model, powered by five key concepts:

* [Developers](#developers)
* [Org Tree(s)](#org-tree)
* [Team](#teams)
* [Profiles](#profiles)
* Dashboards/Insights

## Core Concepts

### Developers

Developers represent the individual engineers participating in the software delivery lifecycle. SEI 2.0 automatically resolves developer identities across tools like Git, Jira, GitHub, GitLab, PagerDuty, and more.

* Automatically de-duplicated using email, name, username, or integration-specific identifiers.
* Used as the foundational unit for all metrics and team-level views.
* Supports flexible mapping to teams, projects, and organizations.

### Org Tree

The Org Tree represents your organizational hierarchy and structure within SEI. It provides the foundation for grouping contributors, scoping insights, and enabling access control across the platform.
At present, the Org Tree is powered by CSV-based imports from your HRIS system (e.g., Workday, BambooHR). The CSV must include a contributor attribute (such as ManagerEmail or ManagerID) that defines the reporting relationship between individuals.

Using this structure, SEI automatically builds a manager-reportee tree, allowing you to view and analyze metrics in the context of real-world teams and reporting lines.

::: info Coming Soon
Multi-level groupings (e.g., Department → Function → Team) will be supported in future iterations. This will allow organizations to model more complex hierarchies and operational structures, making it easier to analyze engineering performance across departments, locations, and lines of business.
:::

### Teams

Teams are the core unit of measurement in SEI 2.0. Every leaf node in the Org Tree is treated as a Team, making it the fundamental grouping for surfacing insights, applying goals, and driving accountability.

Each Team represents a group of developers working together within the organizational hierarchy and is automatically derived from the Org Tree structure.

#### Key Characteristics

* Auto-derived: Every leaf node in the Org Tree is automatically considered a Team.
* Configurable: Each Team has its own configuration to define how metrics are calculated and displayed.
* Contextualized: Teams include metadata such as associated integrations, relevant services, repositories, pipelines, or environments.

#### Team Configuration

Each Team includes a configuration layer that defines:

* Relevant integrations: GitHub, GitLab, Jira, Harness, PagerDuty, etc.
* Included assets: Repositories, pipelines, services, environments.
* Metric-specific settings: Definitions for production deployments, valid incidents, ticket types, branches, and more.

This configuration adds precision to how metrics such as Deployment Frequency, Lead Time, MTTR or any other metric are calculated—ensuring they accurately reflect the work and delivery scope of each Team.

### Profiles

**Profiles** control **what SEI measures** and **how it measures it** by enabling or disabling specific metrics and defining which event types power those metrics. They provide a flexible way to customize SEI insights to your organization’s goals and workflows.


Each Profile includes which **metrics** are enabled or disabled (e.g., Deployment Frequency, Lead Time, Change Failure Rate) & the **events and signals** that power those metrics.

#### Types of Profiles

SEI 2.0 supports three main types of Profiles, each optimized for different measurement objectives:

| Profile Type        | Focus Area                                  | Metrics Powered                                                  |
|---------------------|---------------------------------------------|-----------------------------------------------------------------|
| **Efficiency**      | Delivery performance and flow (DORA metrics) | Deployment Frequency, Lead Time for Changes, Change Failure Rate, MTTR |
| **Productivity**    | Developer productivity and collaboration     | PR throughput, Review time, Commit patterns                     |
| **Business Alignment** | Alignment of engineering output to business goals | Feature delivery, sprint health, work item completion           |

#### Relationship to Teams

- Teams define **where the data comes from** (repositories, pipelines, services).
- Profiles define **what data is used and how** to calculate each metric.
- Each **Org Tree** can have **only one Profile of each type** (Efficiency, Productivity, Business Alignment).
- The assigned Profile applies to the **entire Org Tree and all Teams within it**.
- This ensures consistent measurement and reporting across all organizational units under that tree.
