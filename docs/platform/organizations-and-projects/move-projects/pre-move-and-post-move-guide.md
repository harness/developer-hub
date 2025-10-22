---
title: Pre-move and post-move guide
description: Pre-move and post-move guide ensures successful project movement across organizations.
sidebar_label: Pre-move and post-move guide
sidebar_position: 2
tags:
  - project-movement
  - checklist
  - validation
keywords:
  - project move checklist
  - pre-move validation
  - post-move Remediation
---

This guide helps you decide if a project move is right for you and what to consider before finalizing the decision.

## Pre-move validation

Before moving a project, validate the following entities to ensure they are not affected by inaccessible resources or broken references.

1. Pipelines:
    - Pipelines that refer organization-level connectors will break after the move.
    - Secrets used in pipelines may be scoped at the organization level. After moving to a destination organization, these secrets might become unavailable. 
    - Templates used to build pipelines may be scoped at the organization level. Review and make these templates available in the destination organization; otherwise, pipelines may fail to render or execute.
    - YAML entities may use fully qualified identifiers, such as `orgIdentifier`, that reference the source organization. These identifiers will become obsolete post move.
    - [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining) will fail if the child pipeline’s project is moved.
    - Pipelines that are running when a project is moved may fail.

2. Notifications:
    - If a notification rule uses a channel from the source organization, the reference will break.
    - Email notification channels using organization-level user groups will stop working.

3. Services:
    - Project-level services like manifest sources and artifact sources referencing organization-level connectors will break.

4. Environments:
    - Environment configuration files, application settings, manifest sources, or connection strings referencing organization-level resources will become unavailable.
    - Service overrides, infrastructure definitions, or GitOps clusters referencing organization-level resources will break. 

5. Monitored Services:
    - Services or environments referencing organization-level resources will become inaccessible.

6. Webhooks:
    - Git connectors, generic webhooks, or Slack webhooks using connectors or secrets referencing organization-level resources will break.
    - Triggers where organization identifiers and project identifiers are present will be no longer functional.

7. Access control:
    - Organization-level RBAC policies do not transfer when a project is moved and must be reapplied in the destination organization to maintain proper access controls.
    - When a project move is initiated, all access control components are migrated asynchronously. During this process, access to the project will be temporarily blocked for users.

8. Audit logs:
    - Historical data and execution records are fully preserved when a project is moved. However, links in the audit logs may break which redirects to the entity on the source organization.


:::note Important note
- Redirection links in pipelines, webhooks, audit logs, or other entities that reference the source organization may stop working after a project is moved, as the source organization will no longer be accessible.
    
    For example, if Project P is moved from organization O1 to O2, new audit logs will be generated under the destination organization (O2). However, existing links in the logs that reference the source organization (O1) will no longer work.

- The project movement will not be allowed if a project with the same identifier already exists in the destination organization.

    For example, if Project P is being moved from organization O1 to O2, and organization B already has a project with the same identifier (i.e., Project P), the project movement will not be allowed.
:::

## Post-move remediation



- Review pipeline failures for clear, actionable errors to resolve issues.
- Recreate organization-level connectors and secrets in the destination organization.
- Update notification channels to use destination organization resources.
- Verify and update RBAC policies.
- Update any hardcoded organization identifiers in YAML configurations.



