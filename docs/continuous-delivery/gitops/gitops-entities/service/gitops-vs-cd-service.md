---
title: GitOps vs CD Services
description: Learn the key differences between GitOps and CD services in Harness.
sidebar_position: 20
---

# GitOps vs CD Services

This topic explains the key differences between GitOps and CD services in Harness, helping you understand which approach best fits your deployment needs.

## Overview

Harness supports two primary approaches for continuous delivery:

1. **CD Services**: The Harness deployment approach that uses pipelines to define and execute deployment steps explicitly
2. **GitOps Services**: A declarative approach that continuously synchronizes your deployments with Git repository manifests

While both approaches achieve the goal of deploying applications, they differ significantly in philosophy, workflow, and implementation.

## Key Differences

### Deployment Philosophy

| CD Services | GitOps Services |
|------------------------|-----------------|
| **Push-based**: Changes are actively pushed through the pipeline to target environments | **Pull-based**: The GitOps Agent continuously pulls the desired state from Git |
| **Procedural**: Defines a sequence of steps to perform the deployment | **Declarative**: Defines the desired end-state in Git, letting the system figure out how to achieve it |
| **Event-triggered**: Deployments start when triggered by events (Git changes, webhooks, schedules) | **Continuously reconciled**: Automatically ensures the cluster matches the state defined in Git |

### Service Definition

| CD Services | GitOps Services |
|------------------------|-----------------|
| Focused on artifact sources, manifests, and variable definitions | Primarily focused on linking to Git repositories and manifests (Release Repo and Deployment Repo) |
| Requires explicit specification of deployment steps | Uses a GitOps agent to sync with Git repositories automatically |
| Service definition specifies exactly how deployment happens | Service definition points to where the desired state is defined |
| Configuration changes require updating the service or pipeline | Configuration changes are made directly in the Git repository |

### Service Variables

| CD Services | GitOps Services |
|------------------------|-----------------|
| Variables defined directly in the service | Variables can reference configuration files stored in Git |
| Variable overrides managed in pipeline executions | Variable overrides can be managed through PR pipelines |
| Fixed variable references | Dynamic variable resolution using expressions like `<+env.name>` and `<+cluster.name>` |
| Variables typically used for single environment deployments | Variables designed to support multi-environment deployments through expressions |

### Implementation in Harness

| CD Services | GitOps Services |
|------------------------|-----------------|
| Uses Harness Delegates for deployments | Uses GitOps Agents (based on Argo CD) for deployments |
| Deployment executed through CD pipelines with explicit steps | Deployment continuously reconciled by the GitOps Agent |
| Service variables managed through Harness | Service variables can reference configuration files in Git |
| Dashboard shows deployment executions and pipeline runs | Dashboard shows sync status, health, and resource utilization |

### Architecture Components

| CD Services | GitOps Services |
|------------------------|-----------------|
| Harness Delegate handles deployment operations | GitOps Agent (with Application Controller, Repo Server) handles deployments |
| Configuration stored primarily in Harness | Configuration primarily stored in Git repositories |
| Pipelines define deployment flow | Git commits drive deployment changes |
| Direct interaction with target environments | GitOps Agent mediates interaction with target environments |

## When to Use Each Approach

### Choose CD Services When You:

- Need fine-grained control over deployment steps
- Require complex deployment orchestration
- Have approval processes that must gate deployments
- Need to integrate with multiple systems during deployment
- Want explicit control over when deployments occur

### Choose GitOps Services When You:

- Want Git to be the single source of truth for your deployments
- Prefer a declarative approach to defining application state
- Need continuous reconciliation between Git and your clusters
- Have multiple teams working on the same deployments
- Want automated drift detection and correction

## Hybrid Approaches

You can also combine both approaches in Harness:

1. **GitOps for application deployments, CD for infrastructure**: Use GitOps for application services while managing infrastructure with CD pipelines
2. **CD pipelines that trigger GitOps synchronization**: Create pipelines that interact with your GitOps services through PR pipelines
3. **Mixed environment strategy**: Use GitOps for some environments (e.g., development) and CD for others (e.g., production)

## Next Steps

- [Learn more about GitOps Services](/docs/continuous-delivery/gitops/gitops-entities/service/service)
- [Compare GitOps Services with PR Pipelines](/docs/continuous-delivery/gitops/pr-pipelines/service/service#using-gitops-services-with-pr-pipelines)