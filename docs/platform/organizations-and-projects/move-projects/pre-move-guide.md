---
title: Pre-move validation checklist
description: Validate organization-level dependencies before moving a project across organizations.
sidebar_label: Pre-move validation checklist
sidebar_position: 5
tags:
  - project-movement
  - checklist
  - validation
keywords:
  - project move checklist
  - pre-move validation
  - organization dependencies
---

Moving a project from one organization to another requires careful planning to maintain service continuity and prevent broken dependencies. This checklist helps you identify what might break during the move so you can plan accordingly.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Identify organization-level dependencies that will break during a project move.
- Validate pipelines, connectors, secrets, and access controls before the move.
- Understand important considerations and limitations for project moves.

---

## Before you begin

Before you move a project between organizations, make sure you have:

- **Account Admin or Organization Admin permissions**: You need these permissions to move projects and set up access controls. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles.
- **Access to both organizations**: You need permissions in both the source and destination organizations to check what resources exist and recreate them where needed.
- **Inventory of organization-level resources**: Make a list of all connectors, secrets, templates, policies, and access controls your project uses at the organization level.
- **No running pipelines**: Make sure all pipelines in the project have finished running before you start the move.

---

## Check dependencies before moving a project

Before you move a project, review these items for organization-level dependencies that will break after the move. 

This list covers the most common issues. Your project might have additional organization-level dependencies not listed here.

| Category | Dependency | Impact After Move |
|----------|-----------|-------------------|
| **Pipelines** | Organization-level connectors | Pipelines that use connectors from the organization level will break after the move. |
| | Organization-level secrets | If your pipelines use secrets scoped at the organization level, those secrets will no longer be accessible in the new organization. |
| | Organization-level templates | Templates used to build pipelines might be scoped at the organization level. Make sure these templates exist in the destination organization, or your pipelines will fail to render or execute. |
| | Hardcoded organization identifiers | YAML files might include hardcoded references such as `orgIdentifier`. These will still point to the old organization, but this will not affect pipeline execution. |
| | Pipeline chaining | If you use pipeline chaining, moving the child pipeline will break the chain. Go to <a href="/docs/platform/pipelines/pipeline-chaining" target="_blank">Pipeline chaining</a> for details. |
| | Running pipelines | Any pipelines currently running will fail when the move starts. Finish all pipeline runs before you begin the move. |
| **Notifications** | Organization-level channels | Notification rules that use channels from the organization level will break after the move. |
| | User group notifications | Email notifications that use organization-level user groups will stop working. |
| **Git Experience** | Git file paths | Git file paths will become outdated after the move because they still point to the old organization in URLs and navigation links. |
| **Services** | Manifest and artifact sources | Services that use manifest sources and artifact sources with organization-level connectors will break. |
| **Environments** | Configuration files | Environment configurations, application settings, manifest sources, and connection strings that reference organization-level resources will become unavailable. |
| | Service overrides and infrastructure | Service overrides, infrastructure definitions, and GitOps clusters that reference organization-level resources will break. |
| **Monitored services** | Organization-level resources | Services or environments that reference organization-level resources will become inaccessible after the move. |
| **Webhooks** | Connectors and secrets | Git connectors, generic webhooks, and Slack webhooks that use organization-level connectors or secrets will break. |
| | Custom webhook triggers | Custom webhook triggers will stop working. |
| **Access control** | Organization-level RBAC components | User groups and service accounts inherited from the organization level do not move with the project. You will need to recreate them in the destination organization if your project still needs them. Roles reused from the organization level also stay behind. Go to <a href="/docs/platform/role-based-access-control/add-user-groups/#create-groups-by-inheritance" target="_blank">Create groups by inheritance</a> and <a href="/docs/platform/role-based-access-control/heirarchichal-support-for-service-accounts" target="_blank">Hierarchical support for service accounts</a> for details. |
| | Temporary access restrictions | Project-level access controls (users, service accounts, user groups, role bindings, resource groups, and roles) move with the project, but this happens in the background. Users might temporarily lose access during the move. |
| **Audit logs** | Historical logs | Audit logs from before the move stay in the source organization. They do not transfer with the project. |
| | Broken links | Links in old audit logs that point to the project will break because they still reference the old organization. |
| | New logs | After the move, new audit logs for the project will appear in the destination organization. |
| **Policy management** | Project-level policies | Project-level policies and policy sets move with the project to the destination organization. |
| | Organization-level policies | Organization-level policies referenced by the project will no longer be accessible. You might need to recreate these policies in the destination organization or update your policy sets to use policies that exist there. |
| | Policy set references | Policy sets that reference organization-level policies will break and need to be updated to use policies from the destination organization. |
| **Terraform** | State file inconsistencies | Terraform state and configuration files that reference the project might become inconsistent after the move. |
| | Provider identifiers | Resources created with the Harness Terraform Provider include organization and project identifiers. After the move, these identifiers will not match the new organization. |

:::note

- **Broken links** - Links that reference the source organization (in pipelines, webhooks, audit logs, bookmarks, or URLs) will stop working after the move. Harness does not redirect these links.
- **Duplicate project identifiers** - You cannot move a project if another project with the same identifier already exists in the destination organization. For example, if you are moving Project P from organization O1 to O2, and O2 already has a project named P, the move will fail.
- **Manual Terraform updates** - Harness does not automatically update Terraform configuration or state files after a move. You need to manually update your Terraform resources and state files.

:::

---

## Related articles

- <a href="/docs/platform/organizations-and-projects/move-projects/post-move-guide" target="_blank">Post-move remediation guide</a> - Fix issues after moving a project.
- <a href="/docs/platform/organizations-and-projects/projects" target="_blank">Create organizations and projects</a> - Manage organizations and projects in Harness.
- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> - Understand roles and permissions.
