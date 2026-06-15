---
title: Move a project (Closed Beta)
description: Overview of moving a project between organizations, including prerequisites, Supported modules and how to request or perform a move.
sidebar_label: Overview
sidebar_position: 1
sidebar_class_name: hidden
tags:
  - organizations
  - projects
  - move project
keywords:
  - move projects
  - move project between organizations
  - transfer project
  - organization restructure
redirect_from:
  - /docs/platform/organizations-and-projects/move-projects/overview
---

Harness allows you to move a project from one organization to another within your account. This is useful when you need to transfer project ownership between teams or restructure your organization hierarchy.

This feature is currently in **closed beta** and available for select accounts only. Access is determined based on the currently [supported modules and entities](#supported-modules).

:::note Feature availability
This feature requires the `PL_PROJECT_MOVEMENT_ENABLED` feature flag. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Understand what happens when you move a project](#what-happens-when-you-move-a-project).
- [Review supported modules and unsupported entities](#supported-modules).
- [Plan your project move with pre-move and post-move guides](#what-happens-when-you-move-a-project).

---

## Before you begin

Before you move a project between organizations, make sure you have:

- **Appropriate permissions**: The `core_project_move` permission to move project from source project and `core_project_create` permission to create projects in destination organization. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles.
- **Review of supported modules**: Confirm that your project uses only supported modules and entities. Go to [Supported modules](#supported-modules) to check compatibility.
- **Pre-move validation**: Review the pre-move checklist to understand what will break during the move. Go to <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-guide" target="_blank">Pre-move validation checklist</a> to prepare.

---

## What happens when you move a project 

When you move a project from one organization to another, the following changes occur:

### Entities move with the project

Entities from the [supported modules](#supported-modules) (such as pipelines, services, and environments) move with the project to the destination organization.

### Organization-level resources become inaccessible

Resources scoped at the organization level (connectors, secrets, templates, webhooks, and notifications) become inaccessible after the move. You need to recreate these resources in the destination organization and update project references to point to the new resources. Go to <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-guide" target="_blank">Pre-move validation checklist</a> to review what will break.

### Access control components

- **Organization-level RBAC components**: User groups and service accounts inherited from the organization level do not move with the project. You need to recreate them in the destination organization if your project needs them. Roles reused from the organization level also stay behind. Go to <a href="/docs/platform/role-based-access-control/add-user-groups/#create-groups-by-inheritance" target="_blank">Create groups by inheritance</a> and <a href="/docs/platform/role-based-access-control/heirarchichal-support-for-service-accounts" target="_blank">Hierarchical support for service accounts</a> for details.
- **Project-level access control components**: Project-level access controls (users, service accounts, user groups, role bindings, resource groups, and roles) move with the project asynchronously. Users might temporarily lose access during the move.

### Audit logs

- **Historical logs**: Audit logs from before the move stay in the source organization. They do not transfer with the project.
- **Broken links**: Links in old audit logs that point to the project will break because they still reference the old organization.
- **New logs**: After the move, new audit logs for the project appear in the destination organization.

Go to <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-guide" target="_blank">Pre-move validation checklist</a> and <a href="/docs/platform/organizations-and-projects/move-projects/post-move-guide" target="_blank">Post-move remediation guide</a> for detailed validation and remediation steps.

---

## Supported modules

Project moves are supported for the following Harness modules:

* <a href="/docs/platform/platform-whats-supported" target="_blank">Platform</a>: Full support.
* <a href="/docs/continuous-delivery/cd-integrations" target="_blank">Continuous Delivery and GitOps</a>: Supported except <a href="/docs/category/get-started-with-gitops" target="_blank">GitOps</a> and <a href="/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step" target="_blank">Continuous Verification</a> entities.
* <a href="/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix" target="_blank">Continuous Integration</a>: Full support.
* <a href="/docs/internal-developer-portal/whats-supported" target="_blank">Internal Developer Portal</a>: Supported except <a href="/docs/category/scorecards" target="_blank">Scorecards</a>.
* <a href="/docs/security-testing-orchestration/whats-supported/sto-deployments" target="_blank">Security Test Orchestration</a>: Full support.
* <a href="/docs/code-repository/code-supported" target="_blank">Code Repository</a>: Full support.
* <a href="/docs/database-devops/dbdevops-supported-platforms" target="_blank">Database DevOps</a>: Full support.

Go to <a href="/docs/platform/references/harness-entity-reference" target="_blank">Harness entity reference</a> for details about all Harness entities.

---

## Related articles

- <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-guide" target="_blank">Pre-move validation checklist</a> - Check dependencies before moving a project.
- <a href="/docs/platform/organizations-and-projects/move-projects/post-move-guide" target="_blank">Post-move remediation guide</a> - Fix issues after moving a project.
- <a href="/docs/platform/organizations-and-projects/projects" target="_blank">Create organizations and projects</a> - Manage organizations and projects in Harness.
- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> - Understand roles and permissions.
