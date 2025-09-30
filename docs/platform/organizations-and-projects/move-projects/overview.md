---
 title: Move projects 
 description: Overview of moving projects between organizations, including prerequisites, limitations, and how to request or perform a move.
 sidebar_label: Overview
 tags:
   - organizations
   - projects
   - project-migration
   - cross-org
   - governance
   - admin
 keywords:
   - move projects
   - migrate project between organizations
   - transfer project
   - organization restructure
---

A project is a group of harness modules, their pipelines, and other resources used to organize and manage resources in an organization. The move projects feature allows you to transfer projects between organizations, which is useful during acquisitions, reorganizations, or ownership transitions.

This capability enables teams to adapt to structural changes while preserving project configuration, resources, and history, supporting flexible governance across evolving team structures.

## What Happens When You Move a Project 

When you move a project to another organization in Harness, several actions take place in the background. Understanding these steps helps you anticipate changes and review configurations after the move.

1. Project ownership is transferred: Every project in Harness belongs to an organization.  Moving a project updates its ownership to associate it with the new organization while keeping it under the same account.

2. Entities inside the project are moved: Pipelines, services, environments, and other CI/CD entities are carried over to the new organization. These entities remain intact, but references to external items are validated during the move.

3. Organization-level dependencies are re-validated: If the project depends on connectors, secrets, or templates defined at the old organization level, those items may no longer be accessible in the new organization. Because organizations are isolated, these dependencies must be recreated or re-linked in the new organization.

4. Audit logs are created: All project moves are automatically logged with details including the user, timestamp, source organization, and destination organization. These audit trails provide accountability and help administrators track organizational changes for compliance purposes.

For detailed pre-move and post-move verification steps, refer to the [project movement checklist](project-movement-checklist.md).

## Prerequisites and permissions

To move a project between organization resources, you need the following roles on the project, its source organization, and the destination organization:

- Move Permission on the project that you want to move.
- Create Permission on the destination organization.

## Supported Entities

When a project is moved to a new organization in Harness, different entities behave differently. Understanding what moves automatically, what requires manual updates, and what may break is essential for a smooth transition.

### Pipelines

Pipelines move with the project, including executions, input sets, triggers, variables, and notifications. However, there are some limitations:

- Pipeline chaining fails if a child pipeline is moved.
- Pipelines that depend on project-level delegates may take approximately one minute to run after the move.
- OPA is not supported.

### Secrets

Project-scoped secrets are preserved and move with the project automatically during the migration. However, Organization-scoped secrets must be recreated in the destination organization as they don't transfer between organizations due to isolation boundaries.

Additionally, custom triggers and webhooks that reference organization or project identifiers will fail after the move and need to be updated with the new organizational context to function properly.

### User Groups, Roles, and Permissions

Project-level roles and permissions remain intact during the move, ensuring that user access within the project continues unchanged. However, Organization-level RBAC policies do not transfer and must be reapplied in the destination organization to maintain proper access controls at the organizational level.

### Audit Logs and History

Historical data and execution records are fully preserved when moving projects, ensuring no loss of audit trails or pipeline run history. However, direct links to audit logs may break temporarily as they contain organization-specific URLs. 

Usage metrics and telemetry continue to reflect the original organization until the next reporting cycle updates the references.

### Integrations (Notifications, Webhooks, APIs)

Pipeline notifications and account-level integrations continue to function normally after the move since they operate at a higher scope. However, generic webhooks and Slack webhooks that contain organization or project identifiers will fail and require reconfiguration. 

Similarly, existing API requests using old organization or project identifiers must be updated to reference the new organizational context.