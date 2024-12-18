---
title: Environment by Branch in Harness Database DevOps
sidebar_label: Environment by Branch
description: Using branch-based environments in Harness Database DevOps
sidebar_position: 11
---

## Overview

Harness Database DevOps supports managing database changes using environment-specific branches. This approach allows you to maintain different configurations for development, staging, and production environments within your Git repository.

:::info
Head over to our YouTube for a tutorial on how to set up [Harness Database DevOps with GitOps](https://youtu.be/5JbTEx2ekWo?si=GFx9uRG0x9o3bIvt). 
:::

## Why Use Environment Branches in Harness Database DevOps?

Here are several reasons to use environment branches with Harness Database DevOps:

1. **Consistency with Application Deployment**: If you're using a branch-per-environment strategy for application deployment, managing database changes the same way ensures consistency across your stack.

2. **Environment-Specific Configurations**: Each environment (dev, staging, prod) can have different database configurations, managed independently through separate branches.

3. **Controlled Progression**: Test and validate changes in lower environments before promoting to production, using Harness Database DevOps's deployment pipelines.

4. **Easier Rollbacks**: Harness Database DevOps can quickly roll back changes by reverting to a previous commit in the environment's branch.

5. **Audit Trail**: Each branch provides a clear history of changes, enhancing traceability in Harness Database DevOps.

### What are the tradeoffs of Branch Per Environment?

While using a branch per environment can be beneficial, it's important to consider the tradeoffs:

 1. **Increased Complexity**: Managing multiple branches can add complexity to your workflow.
 2. **Potential for Drift**: Environments may drift apart if changes aren't properly propagated across branches.
 3. **Merge Conflicts**: You may encounter more merge conflicts when promoting changes between environments.
 4. **Overhead**: Maintaining separate branches for each environment requires more resources and management.

The biggest reason to use this approach is if you already do it for your application deployment. This ensures that your database and application changes are managed consistently.

### How to Configure

To configure deployments by environment branch in Harness DB DevOps:

 1. Create a database instance in Harness. This instance will associate your schema configuration with the database connector.
 2. In your schema configuration, specify the branch for each environment. You will specify the branch of the code from which you want to deploy. 
 3. In your Git repository, you will create pull requests that merge changes from your development branch into your staging branch. When you merge a pull request, Harness will automatically detect the change and apply it to the corresponding environment.
 4. When a change is committed (e.g., a merge from development to staging), the trigger will initiate the deployment pipeline for that specific environment.
 5. In your deployment pipeline, define the steps that specify which database changes to apply based on the environment. 
 6. You can, then, track the status of each change set and roll back changes if necessary.
 7. Ensure that your database connector is properly configured to connect to the respective database instances.

## Conclusion 

Deploying to database instances by environment branch can offer significant benefits, especially when aligned with your application deployment strategy. However, it's important to carefully consider the tradeoffs and choose the approach that best fits your team's workflow and needs. 