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

This guide highlights key pointers to be aware of before moving a project and what may be required afterward.

## Pre-move validation

Before moving a project, validate the entities to ensure they are not affected by inaccessible resources or broken references. Please note that this is not an exhaustive list.

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
    - When a project move is initiated, all access control components belonging to the project are migrated asynchronously. During this process, access to the project will be temporarily blocked for users.

8. Audit logs:
    - Historical audit logs are fully preserved when a project is moved. Note that the audit logs before the project was moved might contain links that refer to the older org. These links might break when accessed after the project is moved.


:::note Important note
- Links referencing the source organization—such as those in pipelines, webhooks, or audit logs—may stop working after a project is moved. Bookmarks or URLs with account, organization, or project identifiers are not redirected and will become outdated.
- The project movement will not be allowed if a project with the same identifier already exists in the destination organization.

    For example, if Project P is being moved from organization O1 to O2, and organization B already has a project with the same identifier (i.e., Project P), the project movement will not be allowed.
:::

## Post-move remediation

After a project is moved, the following tips can help you identify and fix broken references. Note that this list is not exhaustive and additional actions might be needed depending on your project setup.

- Review pipeline failures for clear, actionable errors to resolve issues.
- Recreate organization-level connectors and secrets in the destination organization, if required.
- Update notification channels to use destination organization resources.
- Verify and update RBAC policies.



