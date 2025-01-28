---
title: Harness Infrastructure as Code Management (IaCM) Overview
sidebar_label: Overview & key concepts
description: Learn about Harness Infrastructure as Code Management.
sidebar_position: 10
---

Welcome to the Harness Infrastructure as Code Management (IaCM) guide! This document will provide you with an overview of IaCM and introduce key concepts to help you manage your infrastructure efficiently and effectively.

## Overview

As organizations scale, Infrastructure as Code (IaC) becomes crucial for efficient, consistent, and secure infrastructure management. By allowing teams to define, deploy, and manage infrastructure using code, IaC ensures repeatability, reduces errors, and enhances collaboration.

Harness Infrastructure as Code Management (IaCM) supports [**OpenTofu**](https://opentofu.org/) and Legacy Terraform (up to v1.5.x), providing a comprehensive solution that addresses common challenges in infrastructure management. By connecting your infrastructure code stored in your code repository with the resources provisioned via your cloud provider, Harness IaCM ensures isolated, manageable environments. It simplifies and enhances IaC processes with advanced features that streamline, secure, and optimize your infrastructure management, enabling your organization to scale effectively while maintaining control and visibility.

### Key Features

- **Policy Enforcement:** Define and enforce policies at configuration time to prevent unauthorized changes and restrict modifications to critical resources. [Learn more about policy enforcement](https://developer.harness.io/docs/category/policy--governance).
- **Drift Detection:** Harness IaCM continuously monitors your infrastructure, alerting you to any discrepancies between the declared state and the actual provisioned resources. [Explore drift detection](https://developer.harness.io/docs/infra-as-code-management/pipelines/operations/drift-detection).
- **Pull Request (PR) Automation:** Manage PRs directly within Harness, complete with visual comparisons and cost estimations for proposed changes. [Discover PR automation](https://developer.harness.io/docs/infra-as-code-management/pipelines/operations/pr-automation).
- **Advanced Pipeline Capabilities:** Customize your pipelines to include security checks, parallel executions, and other advanced features. [Find out more about pipeline capabilities](https://developer.harness.io/docs/infra-as-code-management/pipelines/operations/iacm-cd-pipeline).
- **State Management and Auditing:** Securely manage state files with controlled access and a full revision history with provisioned workspaces. [Understand state management and workspace provisioning](https://developer.harness.io/docs/infra-as-code-management/workspaces/provision-workspace).
- **Cost Management:** Harness provides cost estimations for proposed changes, helping teams to assess the financial impact before implementation. [Learn about cost management](https://developer.harness.io/docs/infra-as-code-management/workspaces/cost-estimation).

For a more detailed demo, check out the [IaCM overview video](https://youtu.be/IzLP270Daqo?si=U-JC0YbLskXevajC).

## Key Concepts

Infrastructure as Code (IaC) is the ability to define cloud resources as code, allowing for repeatable infrastructure configuration. Examples of IaC tools include HashiCorp Terraform and Amazon CloudFormation.

### Workspace
Your workspace is a container for your infrastructure resources, integrating IaC code, variables, cloud provider connections, state files, and workflows. [Go to the create workspace guide](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide#create-a-workspace) to learn more.

### Operations
Operations are actions taken to manage and maintain your infrastructure using IaC tools.

- **Provision:** Applying infrastructure configuration to create cloud resources. [Learn about provisioning](https://developer.harness.io/docs/infra-as-code-management/workspaces/provision-workspace).
- **Destroy:** Removing all resources provisioned by the IaC code. [Explore the destroy operation](https://developer.harness.io/).
- **Drift Detection:** Occurs when the actual state of your infrastructure deviates from the state defined by your IaC code, identifying discrepancies between the declared and running infrastructure. [Understand drift detection](https://developer.harness.io/docs/infra-as-code-management/pipelines/operations/drift-detection).

### Resources
Resources are components and services managed by your IaC tool and cloud provider.

- **Cloud Resource:** Any instance of cloud infrastructure that is currently running.
- **Cloud Provider:** A company offering cloud computing services.
- **Harness State Tracking:** Monitors the current state of a stack and tracks changes.
- **Terraform State Backend:** Manages access to and changes in a shared Terraform state file. [Understand state backend](https://developer.harness.io/docs/category/remote-backends).
- **Variables:** Elements used to extend and customize IaC code. [Learn about pipeline variables](https://developer.harness.io/docs/infra-as-code-management/project-setup/input-variables).

Go to [the IaCM onboarding guide](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide) to get started or continue your IaCM journey!

