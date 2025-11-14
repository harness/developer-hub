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

Before moving a project, check the following items for organization-level dependencies that may break after the move:

:::note
This list covers common issues but is not exhaustive. Additional organization-level dependencies may exist in your project.
:::

1. Pipelines:
    - Pipelines that refer organization-level connectors will break after the move.
    - Secrets used in pipelines may be scoped at the organization level. After moving to a destination organization, these secrets might become unavailable. 
    - Templates used to build pipelines may be scoped at the organization level. Review and make these templates available in the destination organization; otherwise, pipelines may fail to render or execute.
    - YAML entities may use fully qualified identifiers, such as `orgIdentifier`, that reference the source organization. These identifiers will not be updated with destination organization identifier.
    - [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining) will fail if the child pipeline’s project is moved.
    - Any pipelines running in the project will fail when the move operation begins. It’s recommended to complete all pipeline executions before initiating the project move.

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
    - Custom webhook triggers will be no longer functional.

7. Access control:
    - Organization-level RBAC policies aren’t transferred during a project move. You may need to recreate them in the destination organization to ensure proper access controls are maintained.
    - When a project move is initiated, all project-level access control components including users, service accounts, user groups, role bindings, resource groups, and roles are migrated asynchronously. While the move is in progress, users may experience temporary access restrictions during the move process.
    - If an account-level resource group includes a project that is being moved, Harness automatically updates the resource group to reflect the new organization. No action is required from users.

8. Audit logs:
    - Account-level audit logs: No impact - all logs remain accessible.
    - Organization-level audit logs: 
        - Logs belonging to the project from before the move stay in the source organization and are not transferred.
        - Links in old logs pointing to the moved project in the older organization will break.
        - New audit logs for the moved project will appear in the newer organization.

9. Terraform Resource and State Management:
    - Terraform state and configuration files that reference the moved project may become inconsistent after the move.
    - Resources created using the Harness Terraform Provider include organization and project identifiers that will no longer match the new organization.


:::note Important note
- Links referencing the source organization—such as those in pipelines, webhooks, or audit logs—may stop working after a project is moved. Bookmarks or URLs with account, organization, or project identifiers are not redirected and will become outdated.
- The project movement will not be allowed if a project with the same identifier already exists in the destination organization. For example, if Project P is being moved from organization O1 to O2, and organization B already has a project with the same identifier (i.e., Project P), the project movement will not be allowed.
:::

## Post-move remediation

After a project is moved, the following tips can help you identify and fix broken references. Note that this list is not exhaustive and additional actions might be needed depending on your project setup.

- Review pipeline failures for clear, actionable errors to resolve issues.
- Recreate organization-level connectors and secrets in the destination organization, if required.
- Update notification channels to use destination organization resources.
- Verify and update RBAC policies.



