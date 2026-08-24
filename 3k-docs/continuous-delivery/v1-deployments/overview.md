---
title: Deployments overview
description: Deploy services to any target platform from a single pipeline stage in Harness.
sidebar_position: 1
---

Harness Deployments lets you deploy services to your infrastructure from a pipeline stage you configure end-to-end in the pipeline studio. A stage is one of several stage types available when you build a pipeline, alongside Build, Blank canvas, and others. Because it is a unified model, the same pipeline can contain CI steps, CD steps, security testing steps, and more.

---

## The stage wizard

When you add a stage to a pipeline and select a deployment target, the stage wizard walks you through five steps:

1. **Specify details** — name the stage and choose the deployment target (for example, Kubernetes).
2. **Configure services** — select or create a service with the manifests, artifact sources, and configuration files your application needs.
3. **Configure environments** — select the environment and infrastructure definition that point to the cluster or platform where Harness deploys.
4. **Choose deployment strategy** — select the rollout pattern that fits your release process.
5. **Review and add stage** — Harness adds the strategy-specific steps to the stage canvas automatically.

---

## What you configure

A stage has three top-level configuration objects:

- **Service** — defines what you are deploying: the application manifests, container images, config files, and variables. Services are reusable across pipelines and stages.
- **Environment** — a logical representation of where you deploy (for example, `production` or `staging`). Environments hold one or more infrastructure definitions.
- **Infrastructure definition** — links the environment to the actual compute resources. It holds the connector credentials and target-specific settings such as cluster name and namespace.

Go to [Kubernetes services](./kubernetes/kubernetes-services.md) and [Kubernetes infrastructure](./kubernetes/kubernetes-infrastructure.md) to configure these for Kubernetes deployments.

---

## Supported deployment targets

The following deployment targets are available:

- **Kubernetes** — deploy to any Kubernetes cluster, GKE, AKS, EKS, or Rancher-managed cluster.

---

## Next steps

- Go to [Kubernetes Deployments overview](./kubernetes/overview.md) to walk through the Kubernetes-specific stage setup.
