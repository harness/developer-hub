---
 title: Move projects 
 description: Overview of moving projects between organizations, including prerequisites, limitations, and how to request or perform a move.
 sidebar_label: Overview
 sidebar_position: 1
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

A project is a group of harness modules, their pipelines, and other resources used to organize and manage resources in an organization. The move projects feature allows you to transfer projects between organizations, which is useful during reorganizations, or ownership transitions.

This capability enables teams to adapt to structural changes while preserving project configuration, resources, and history, supporting flexible governance across evolving team structures.

## What happens when you move a project 

When you move a project to another organization in Harness, several actions take place in the background.

1. **Entities inside the project are moved:** Pipelines, services, environments, and other [entities](#supported-entities) are carried over to the new organization. These entities remain intact; however, references to external items are validated during the move.

2. **Dependencies become stale:** If the project depends on connectors, secrets, or templates defined at the old organization level, those items may no longer be accessible in the new organization. Because organizations are isolated, these dependencies must be recreated in the new organization. Any references to account- or project-level entities remain intact.

3. **Audit logs are generated:** All project moves are logged with details such as the user, timestamp, source organization, and destination organization. These audit trails provide accountability to support compliance requirements.

For detailed pre-move and post-move verification steps, refer to the [project movement checklist](project-movement-checklist.md).

## Prerequisites and permissions

To move a project between organization resources, you need the following roles on the project, its source organization, and the destination organization:

- Move Permission on the project that you want to move.
- Create Permission on the destination organization.

## Supported Entities

When a project is moved across organizations, the following entities are supported.

### Pipelines
  
Pipelines move with the project, including executions, input sets, triggers, variables, and notifications. However, there are some limitations:

  - Pipeline chaining fails if a child pipeline is moved.
  - Pipelines that depend on project-level delegates may take approximately one minute to run after the move.
  - Pipelines that were running during the move operation might fail.

### Secrets

Project-scoped secrets are preserved and move with the project automatically during the migration. However, Organization-scoped secrets must be recreated in the destination organization as they don't transfer between organizations due to isolation boundaries.

Additionally, triggers that reference organization or project identifiers will fail after the move and must be updated to function properly.

### Access control Components

Project-level roles and permissions remain intact during the move, ensuring that user access within the project continues unchanged. However, Organization-level RBAC policies do not transfer and must be reapplied in the destination organization to maintain proper access controls.

### Audit Logs

Historical data and execution records are fully preserved when moving projects, ensuring no loss of audit trails or pipeline run history. However, links in the audit logs may break which redirects to the entity on the old organization. 

### Notifications and Webhooks

Notifications continue to function normally after the move. However, generic webhooks and Slack webhooks that contain organization or project identifiers will fail and require reconfiguration. 

:::note Redirection may break

Redirect links in pipelines, webhooks, audit logs, or other entities may stop working after a project is moved across organizations, as the old organization will no longer be available or referenced.

For example, if Project P is moved from Organization O1 to O2, new entities such as audit logs will be generated under the new organization. However, any redirection links that reference the old organization (O1) in those logs will no longer function.

:::