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
    - Pipelines that reference organization-level resources such as connectors will break after the move.
    - Secrets used in pipelines may be scoped at the organization level. After moving to a new organization, these secrets will no longer be accessible. 
    - Templates used to build pipelines may be scoped at the organization level. Review and make these templates available in the new organization; otherwise, pipelines may fail to render or execute.
    - YAML entities may use fully qualified identifiers, such as `orgIdentifier`. These identifiers will not be updated with the new organization identifier. This will not affect the pipeline execution, though.
    - [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining) will fail if the child pipeline’s project is moved.
    - Any pipelines running in the project will fail when the move operation begins. It’s recommended to complete all pipeline executions before initiating the project move.

2. Notifications:
    - If a notification rule uses a channel from the organization, the reference will break after the move.
    - Email notification channels using organization-level user groups will stop working.

3. Git Experience: Git file paths become stale after the move, as they still reference the older organization in URLs and navigation links. 

4. Services: Project-level services like manifest sources and artifact sources referencing organization-level connectors will break.

5. Environments:
    - Environment configuration files, application settings, manifest sources, or connection strings referencing organization-level resources will become unavailable.
    - Service overrides, infrastructure definitions, or GitOps clusters referencing organization-level resources will break. 

6. Monitored Services: Services or environments referencing organization-level resources will become inaccessible after the move.

7. Webhooks:
    - Git connectors, generic webhooks, or Slack webhooks using connectors or secrets referencing organization-level resources will break.
    - Custom webhook triggers will be no longer functional.

8. Access control:
    - Organization-level RBAC components such as [User groups](/docs/platform/role-based-access-control/add-user-groups/#create-groups-by-inheritance)/[Service accounts](/docs/platform/role-based-access-control/heirarchichal-support-for-service-accounts) inherited from the Organization into the project and their associated role bindings, do not move and must be recreated in the destination organization if required. Moreover, roles reused from the Organization into a project will not be moved as well.
    - When a project move is initiated, all project-level access control components including users, service accounts, user groups, role bindings, resource groups, and roles are moved asynchronously. While the move is in progress, users may experience temporary access restrictions during the move process.

9. Audit logs: Organization-level audit logs: 
    - Logs belonging to the project before the move stay in the source organization and are not transferred.
    - Links in old audit logs pointing to the moved project in the older organization will break as they still contain the older organization.
    - New audit logs for the moved project will appear in the newer organization.

10. Policy Management:
    - Project-level policies and policy sets are moved with the project to the destination organization.
    - Organization-level policies and policy sets referenced by the project will become inaccessible after the move. You may need to recreate these policies in the destination organization or update policy sets to reference policies available in the destination organization.
    - Policy Sets that reference organization-level policies will break after the move and need to be updated to use policies from the destination organization.

11. Terraform Resource and State Management:
    - Terraform state and configuration files that reference the moved project may become inconsistent after a project is moved.
    - Resources created using the Harness Terraform Provider include organization and project level identifiers that will no longer match the new organization identifier.

:::warning Important note
- Links referencing the source organization—such as those in pipelines, webhooks, or audit logs—may stop working after a project is moved. Bookmarks or URLs with account, organization, or project identifiers are not redirected and will become outdated.
- The project movement will **not be allowed** if a project with the same identifier already exists in the destination organization. For example, if Project P is being moved from organization O1 to O2, and organization B already has a project with the same identifier (i.e., Project P), the project movement will not be allowed.
- Harness does not provide automated tools to update Terraform configuration or state files after project movement. You must manually manage and update your Terraform resources and state files when moving projects across organizations.
:::

## Post-move remediation

After a project is moved, ensure to review the following resources. Note that this list is not exhaustive and additional actions might be needed depending on your project setup.

1. Pipelines
    - Test all pipelines to identify broken references.
    - Update pipeline references to use connectors and secrets from the destination organization.
    - Recreate organization-level templates in the destination organization.
    - Update YAML entities with hardcoded `orgIdentifier` references to match the new organization.
    - Fix pipeline chaining references if child pipelines were also moved.
    
        :::warning Pipelines using Terraform will be impacted
        In case of pipeline failure, re-run it to ensure it works as expected. Failure can occur if the pipeline is running execution between the Terraform Plan step and the Terraform Apply/Destroy step and is unable to access files generated in the Terraform plan step. These files include the [inherited plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step#review-terraform-plan-and-apply-steps), [exported JSON plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step#export-json-representation-of-terraform-plan), or [exported human-readable plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step#export-human-readable-representation-of-terraform-plan)

        The same behavior applies to Terragrunt, but Terragrunt does not use the exported JSON plan or the exported human-readable plan.
        :::

2. Connectors and Secrets: Recreate organization-level connectors and secrets in the new organization if required.

3. Services and Environments
    - Update service manifest sources and artifact sources if they reference connectors from previous organization.
    - Update environment configuration files and connection strings if required.
    - Recreate service overrides and infrastructure definitions that reference source organization-level resources if required.

4. Notifications and Webhooks
    - Update notification rules if they refer the organization channels from the older organization.
    - Recreate webhook configurations using destination organization connectors and secrets if required
    - Test custom webhook triggers and update as needed.

5. Access Control: Create organization-level RBAC components and assign role bindings as required to ensure that users and service accounts still have the intended access.

6. Monitored Services: Update monitored services if these still reference resources from previous organization.

7. Policy Management:
    - Review all policy sets in the moved project to identify any references to organization-level policies.
    - Recreate organization-level policies in the destination organization if they are required by policy sets in the moved project.
    - Update policy sets to reference policies from the destination organization instead of the source organization.
    - Verify that all policy evaluations continue to work correctly after the move.

Additionally, you may need to update bookmarks, saved URLs and runbooks to use the new organization path, that reference the old organization.

