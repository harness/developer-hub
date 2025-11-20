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

3. Git Experience:
    - Git file paths become stale after the move, as they still reference the source organization in URLs and navigation links. 

4. Services:
    - Project-level services like manifest sources and artifact sources referencing organization-level connectors will break.

5. Environments:
    - Environment configuration files, application settings, manifest sources, or connection strings referencing organization-level resources will become unavailable.
    - Service overrides, infrastructure definitions, or GitOps clusters referencing organization-level resources will break. 

6. Monitored Services:
    - Services or environments referencing organization-level resources will become inaccessible.

7. Webhooks:
    - Git connectors, generic webhooks, or Slack webhooks using connectors or secrets referencing organization-level resources will break.
    - Custom webhook triggers will be no longer functional.

8. Access control:
    - Organization-level RBAC policies aren’t transferred during a project move. You may need to recreate them in the destination organization to ensure proper access controls are maintained.
    - When a project move is initiated, all project-level access control components including users, service accounts, user groups, role bindings, resource groups, and roles are moved asynchronously. While the move is in progress, users may experience temporary access restrictions during the move process.
    - If an account-level resource group includes a project that is being moved, Harness automatically updates the resource group to reflect the new organization. No action is required from users.

9. Audit logs:
    - Account-level audit logs: No impact - all logs remain accessible.
    - Organization-level audit logs: 
        - Logs belonging to the project from before the move stay in the source organization and are not transferred.
        - Links in old logs pointing to the moved project in the older organization will break.
        - New audit logs for the moved project will appear in the newer organization.

10. Terraform Resource and State Management:
    - Terraform state and configuration files that reference the moved project may become inconsistent after a project is moved.
    - Resources created using the Harness Terraform Provider include organization and project level identifiers that will no longer match the new organization identifier.
    - Terraform state and configuration management are highly variable, depending on how you define, reference, and structure your Terraform code, you may need to manually update your Terraform state and configuration files after the move.

:::note Important note
- Links referencing the source organization—such as those in pipelines, webhooks, or audit logs—may stop working after a project is moved. Bookmarks or URLs with account, organization, or project identifiers are not redirected and will become outdated.
- The project movement will not be allowed if a project with the same identifier already exists in the destination organization. For example, if Project P is being moved from organization O1 to O2, and organization B already has a project with the same identifier (i.e., Project P), the project movement will not be allowed.
- Harness does not provide automated tools to update Terraform configuration or state files after project movement. You must manually manage and update your Terraform resources and state files when moving projects across organizations.
:::

## Post-move remediation

After a project is moved, you may follow these steps to identify and fix broken references. Note that this list is not exhaustive and additional actions might be needed depending on your project setup.

1. Pipelines
    - Test all pipelines to identify broken references.
    - Update pipeline references to use connectors and secrets from the destination organization.
    - Recreate organization-level templates in the destination organization.
    - Update YAML entities with hardcoded `orgIdentifier` references to match the new organization.
    - Fix pipeline chaining references if child pipelines were also moved.

2. Connectors and Secrets
    - Recreate organization-level connectors and secrets in the destination organization.

3. Services and Environments
    - Update service manifest sources and artifact sources to reference destination organization connectors.
    - Update environment configuration files and connection strings.
    - Recreate service overrides and infrastructure definitions that reference source organization-level resources.

4. Notifications and Webhooks
    - Recreate notification channels in the destination organization.
    - Update notification rules to use the destination organization channels.
    - Recreate webhook configurations using destination organization connectors and secrets.
    - Test custom webhook triggers and update as needed.

5. Access Control
    - Recreate organization-level RBAC policies in the destination organization and verify that users and service accounts still have the expected project access.

6. Monitored Services
    - Update monitored services to reference destination organization resources.

7. Terraform Management
    - Review Terraform configuration (`.tf`) and state files for any hardcoded organization references.
    - Run `terraform plan` to identify any drift or inconsistencies.
    - Update organization references (e.g., org_id, organization_id) manually in both `.tf` and state files if necessary.
    - Apply changes once the plan shows the expected alignment.

Additionally, you may need to update bookmarks, saved URLs and runbooks to use the new organization path, that reference the old organization.

