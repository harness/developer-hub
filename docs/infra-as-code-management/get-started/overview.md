---
title: Harness Infrastructure as Code Management (IaCM) Overview
sidebar_label: Overview & Key Concepts
description: Learn about Harness Infrastructure as Code Management.
sidebar_position: 10
---

Welcome to the Harness Infrastructure as Code Management (IaCM) guide! This document will provide you with an overview of IaCM and introduce key concepts to help you manage your infrastructure efficiently and effectively.

## Overview

As organizations scale, Infrastructure as Code (IaC) becomes crucial for efficient, consistent, and secure infrastructure management. By allowing teams to define, deploy, and manage infrastructure using code, IaC ensures repeatability, reduces errors, and enhances collaboration.

Harness IaCM connects your infrastructure code in your repository with the resources you provision in your cloud accounts, using isolated **workspaces**, repeatable **pipelines**, and shared **connectors**. It streamlines and secures IaC with policy, drift detection, cost insight, and auditing so teams can scale while keeping control and visibility.

### Supported provisioners

Harness IaCM supports the following **provisioners** and related automation:

- **OpenTofu:** Open-source infrastructure as code, compatible with the Terraform ecosystem. See [OpenTofu](https://opentofu.org/) and [What's supported in IaCM](/docs/infra-as-code-management/whats-supported).
- **Terraform:** MPL-licensed Terraform up to **v1.5.x**. BSL-licensed releases (**v1.6.0** and later) are not supported; use [OpenTofu](https://opentofu.org/docs/intro/migration/) as a drop-in alternative where applicable. See [What's supported in IaCM](/docs/infra-as-code-management/whats-supported).
- **Terragrunt:** Thin wrapper that orchestrates OpenTofu/Terraform modules and shared configuration across environments. See [Terragrunt](https://terragrunt.gruntwork.io/) and the Terragrunt path in [Get started with IaCM](/docs/infra-as-code-management/get-started#terragrunt).
- **Ansible (configuration management):** Define inventories and playbooks for configuration and automation on target hosts (for example over SSH or WinRM), alongside your core IaC workflows. See [Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/overview).

### Key Features

- **Policy enforcement:** Define and enforce policies at configuration time to prevent unauthorized changes and restrict modifications to critical resources. [Learn more about policy enforcement](/docs/infra-as-code-management/policies-governance/opa-workspace).
- **Drift detection:** Harness IaCM continuously monitors your infrastructure, alerting you to discrepancies between declared state and what is actually provisioned. [Explore drift detection](/docs/infra-as-code-management/pipelines/operations/drift-detection).
- **Pull request (PR) automation:** Manage PRs within Harness with visual comparisons and cost estimates for proposed changes. [Discover PR automation](/docs/infra-as-code-management/pipelines/operations/pr-automation).
- **Advanced pipeline capabilities:** Customize pipelines with security checks, parallel stages, and other patterns. [Find out more about pipeline capabilities](/docs/infra-as-code-management/pipelines/operations/iacm-cd-pipeline).
- **State management and auditing:** Manage state with controlled access and history tied to provisioned workspaces. [Understand state management and workspace provisioning](/docs/infra-as-code-management/workspaces/provision-workspace).
- **Cost management:** Estimate the cost of proposed changes before you apply them. [Learn about cost management](/docs/infra-as-code-management/workspaces/cost-estimation).

For a more detailed demo, check out the [IaCM overview video](https://youtu.be/IzLP270Daqo?si=U-JC0YbLskXevajC).

## How it fits together

A typical IaCM journey looks like this:

1. **Connectors:** Configure **Git** (or Harness Code Repository) and **cloud provider** connectors so Harness can reach your code and your accounts. [Connectors and variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) applies to how workspaces and pipelines use these resources; platform-wide connector setup is covered under [Code repositories](/docs/platform/connectors/code-repositories/connect-to-code-repo) and [Cloud providers](/docs/category/cloud-providers).
2. **Workspace:** Create a **workspace** that points at your repository path, provisioner type (OpenTofu, Terraform, Terragrunt, and related settings), backend/state expectations, and the connectors the workspace should use.
3. **Provision pipeline:** Run a pipeline that executes **init**, **plan**, and **apply** (for example via the Terraform/OpenTofu plugin steps). [Provision a workspace](/docs/infra-as-code-management/workspaces/provision-workspace) and [Tofu/Terraform plugins](/docs/infra-as-code-management/cli-commands/terraform-plugins) describe the commands and flow.
4. **Optional approval:** Add an **approval** step between **plan** and **apply** so reviewers can confirm changes (and cost estimates, if enabled) before infrastructure is updated.

For **Terragrunt** workspaces, you can set a default **Folder Path** on the workspace and optionally set **Folder Path Override** per run on each Terragrunt pipeline step, such as **init**, **plan**, and **apply**. This is useful for monorepos and per-environment paths without separate workspaces. Details appear in the Terragrunt content under [Get started with IaCM](/docs/infra-as-code-management/get-started#terragrunt).

## Key Concepts

Infrastructure as Code (IaC) is the ability to define cloud resources as code, allowing for repeatable infrastructure configuration. Examples of IaC tools include HashiCorp Terraform and Amazon CloudFormation.

### Workspace

Your workspace is a container for your infrastructure resources: IaC code, **variables**, **connectors** (code repository and cloud provider), **state**, and **pipelines**. [Get started with IaCM](/docs/infra-as-code-management/get-started) walks through creating a workspace and linking connectors.

### Operations

Operations are actions taken to manage and maintain your infrastructure using IaC tools.

- **Provision:** Applying infrastructure configuration to create or update cloud resources. Provision flows usually follow **init → plan → apply** in a pipeline. [Learn about provisioning](/docs/infra-as-code-management/workspaces/provision-workspace).
- **Destroy:** Removing resources managed by the workspace’s IaC. [Explore destroy workflows](/docs/infra-as-code-management/workspaces/destroy-workspaces).
- **Drift detection:** Occurs when actual infrastructure diverges from the state defined by your IaC. [Understand drift detection](/docs/infra-as-code-management/pipelines/operations/drift-detection).

### Resources

Resources are components and services managed by your IaC tool and cloud provider.

- **Cloud resource:** Any instance of cloud infrastructure that is currently running.
- **Cloud provider:** A platform offering cloud computing services that you connect with a **connector**.
- **Harness state tracking:** Tracks the current state of a stack and changes over time within a workspace.
- **Terraform/OpenTofu state backend:** Where state is stored and locked for shared use. [Remote backends](/docs/infra-as-code-management/remote-backends/use-backends) covers backend options and Harness-managed state.
- **Variables:** Values that parameterize IaC and pipeline behavior. [Learn about connectors and variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) in IaCM.

Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to begin hands-on setup or continue your IaCM journey.
