---
title: GitOps Environment By Branch 
sidebar_label: GitOps Environment By Branch
displayed_sidebar: dbdevopsbeta
description: Basic terminology and concepts related to Harness Database DevOps
# sidebar_position: 10
---

Harness GitOps Environment By Branch is an approach to managing infrastructure and application deployments using Git as the single source of truth. Harness GitOps lets you perform GitOps deployments in Harness. If you'd like to learn more about Harness GitOps, you can refer to the [Harness GitOps basics doc](../continuous-delivery/gitops/get-started/harness-git-ops-basics.md). 

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

## Accelerate Innovation Velocity

Harness DB DevOps is a powerful tool that helps accelerate innovation velocity, particularly in the context of managing and evolving database schemas. By using DB DevOps, development teams can introduce new features, improve existing ones, and deploy updates more rapidly and safely. 

By integrating DB DevOps into your development workflow, teams can accelerate their innovation velocity by automating and streamlining database schema changes. DB DevOps reduces the friction associated with database updates, allowing teams to focus on delivering new features and improvements faster and with greater confidence. This, in turn, enhances the overall agility of the development process, enabling organizations to stay competitive and responsive to market demands.

## Deploy to database instance by environment branch

Environment branches in Git allow teams to maintain separate configurations for different environments (e.g., development, staging, production) within the same repository.

