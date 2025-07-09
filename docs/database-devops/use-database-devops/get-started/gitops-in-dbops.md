---
title: GitOps with Database DevOps
sidebar_label: GitOps with Database DevOps
description: Apply GitOps to database delivery using Harness, version schema changes, automate deployments, and ensure compliance via Git-driven workflows.
slug: /database-devops/gitops-in-database-devops
sidebar_position: 10
keywords:
  - gitops
  - database devops
  - harness db devops
  - database automation
  - version control
  - db schema management
  - harness database devops
  - database gitops
  - ci/cd for databases
  - git-based deployment
  - db schema versioning
  - database automation
  - devops database
tags:
  - gitops
  - database devops
  - ci/cd
  - harness
  - database automation
  - version control
  - db schema management
---

GitOps is an operational framework that brings DevOps best practices—such as version control, collaboration, compliance, and CI/CD—into the realm of infrastructure and database automation. In the context of Harness Database DevOps, GitOps enables teams to manage schema changes with the same rigor and scalability as application code. You can apply GitOps principles in several impactful ways:

- Store configurations, database schemas, and migration scripts in Git repositories  
- Use pull requests and peer reviews to manage and approve changes  
- Trigger automated deployments through changes committed to Git  

By integrating GitOps into your database lifecycle, you gain traceability, auditability, and reliable deployment workflows across all environments.

## Implementation Approaches

When adopting GitOps for database management, two primary branching strategies are commonly used:

1. **Environment-by-Branch**  
   Each environment (e.g., dev, staging, prod) has a dedicated Git branch. Changes are promoted by merging from lower to higher environments.  

2. **Trunk-Based Development**  
   A single mainline branch (e.g., `main` or `trunk`) is used, with pipelines or metadata controlling environment-specific behavior.  
   → [Learn more](./gitops/trunk-based-development.md)

::: tip  
> If you're not currently using a GitOps-based branching approach, Harness recommends adopting **trunk-based development**. It simplifies change management, accelerates delivery, and aligns well with modern CI/CD and database promotion workflows.
:::
