---
title: GitOps with Database DevOps
sidebar_label: GitOps with Database DevOps
description: Using GitOps principles with Harness Database DevOps
sidebar_position: 10
---

## GitOps in Database DevOps

GitOps is an operational framework that takes DevOps best practices used for application development such as version control, collaboration, compliance, and CI/CD, and applies them to infrastructure automation.

GitOps can be applied to Harness Database DevOps in a multitude of ways, including:

 - storing configurations, database schemas, and migration scrips in Git repos,
 - using pull requests and code reviews for database changes,
 - implementing automated deployments triggered by changes to the Git repo.

:::info
Head over to our YouTube for a tutorial on how to set up [Harness Database DevOps with GitOps](https://youtu.be/5JbTEx2ekWo?si=GFx9uRG0x9o3bIvt). 
:::

### Implementation Approaches

When implementing GitOps with Database DevOps, you can choose between two main approaches:

 1. **Environment by Branch**: Using separate branches for different environments
 2. **Trunk-Based Development** - Using a single main branch with environment-specific contexts

Choose the approach that best aligns with your existing development practices and organizational needs. You can learn more about [Environment by Branch](environment_by_branch.md) and [Trunk-Based Development](./trunk-based-development.md) in our Harness Database DevOps docs. 
