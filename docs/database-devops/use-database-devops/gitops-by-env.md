---
title: GitOps Environment By Branch 
sidebar_label: GitOps Environment By Branch
displayed_sidebar: dbdevopsbeta
description: Basic terminology and concepts related to Harness Database DevOps
# sidebar_position: 10
---

Harness GitOps Environment By Branch is an approach to managing infrastructure and application deployments using Git as the single source of truth. Harness GitOps lets you perform GitOps deployments in Harness. If you'd like to learn more about Harness GitOps, you can refer to the [Harness GitOps basics doc](../continuous-delivery/gitops/get-started/harness-git-ops-basics.md). 

:::info
If you'd like to follow a YouTube video 
:::

## GitOps as a Service

GitOps is an operational framework that takes DevOps best practices used for application development such as version control, collaboration, compliance, and CI/CD, and applies them to infrastructure automation.

GitOps can be applied to Harness DB DevOps in a multitude of ways, including:

 - storing configurations, database schemas, and migration scrips in Git repos,
 - using pull requests and code reviews for database changes,
 - implementing automated deployments triggered by changes to the Git repo.

We, at Harness, encourage you to use GitOps-as-a-Service for your databases as it has many benefits for your workflow and for your product such as:

 - improving collaboration between developers and database adminstrators
 - enhancing audit trails and complaince
 - easier rollbacks and version control for database states

## Deploy to database instance by environment branch

Environment branches in Git allow teams to maintain separate configurations for different environments (e.g., development, staging, production) within the same repository.

### Why Deploy to Database Instance by Environment Branch?

There are several reasons why you might want to deploy to a database instance by environment branch:

 1. **Consistency with Application Deployment**: If you're using a different GitOps tool to deploy your application with a branch per
 environment, managing your database changes the same way ensures consistency across your entire stack.
 2. **Environment-Specific Configurations**: Each environment (dev, staging, prod) may require different database configurations. Using 
  separate branches allows you to maintain these configurations independently.
 3. **Controlled Progression**: Changes can be tested and validated in lower environments (e.g., dev, staging) before being merged into the production branch.
 4. **Easier Rollbacks**: If an issue occurs in one environment, you can easily roll back by reverting to a previous commit in that 
  environment's branch.
 5. **Audit Trail**: Each branch provides a clear history of changes specific to that environment, enhancing traceability and compliance.

### What are the tradeoffs of Branch Per Environment?

While using a branch per environment can be beneficial, it's important to consider the tradeoffs:

 1. **Increased Complexity**: Managing multiple branches can add complexity to your workflow.
 2. **Potential for Drift**: Environments may drift apart if changes aren't properly propagated across branches.
 3. **Merge Conflicts**: You may encounter more merge conflicts when promoting changes between environments.
 4. **Overhead**: Maintaining separate branches for each environment requires more resources and management.

The biggest reason to use this approach is if you already do it for your application deployment. This ensures that your database and application changes are managed consistently.

### Trunk-Based Development for Harness Database DevOps 

For teams using trunk-based development, an alternative approach is to use a single branch with context-based deployments. This is similar to Liquibase's 'context per environment' feature. In this model:

 1. All changes are made to the main branch.
 2. Environment-specific configurations are managed using contexts or labels.
 3. Deployments are controlled by applying the appropriate context during the deployment process.

## How to Configure

To configure deployments by environment branch in Harness DB DevOps:

 1. In your schema configuration, specify the branch for each environment.
 2. 


## Conclusion 

Deploying to database instances by environment branch can offer significant benefits, especially when aligned with your application deployment strategy. However, it's important to carefully consider the tradeoffs and choose the approach that best fits your team's workflow and needs. 