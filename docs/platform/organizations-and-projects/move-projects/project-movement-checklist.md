---
title: Project movement checklist
description: Pre-move checklist and post-move verification steps to ensure successful project migration between organizations.
sidebar_label: Project Movement Checklist
sidebar_position: 2
tags:
  - organizations
  - projects
  - project-movement
  - checklist
  - verification
  - best-practices
keywords:
  - project move checklist
  - pre-move verification
  - post-move validation
  - project transfer steps
---

The following checklist provides guidance for both pre-movement preparation and post-movement validation to ensure a seamless transition with minimal disruption.

## Pre-Movement Verification

While moving a project across organizations, you may see warning messages on various pages due to unsupported entities or broken references. Some key entities to watch for are listed below:

1. Pipelines:
    - Pipelines referencing organization-level connectors will break after the move.
    - Secrets used in pipelines may be scoped at the organization level. After moving to a new organization, these secrets might become unavailable. Recreate them in the destination organization.
    - Templates used to build pipelines may be scoped at the organization level. Review and make these templates available in the destination organization; otherwise, pipelines may fail to render or execute.
    - YAML entities may use fully qualified identifiers, such as orgIdentifiers, that reference the source organization. If not updated, these references can become stale and cause errors.
    - [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining) will fail if the child pipeline’s project is moved.
    - Running pipelines may fail during the project move.

2. Notifications:
    - If a notification rule uses a channel from the source organization, the reference will break.
    - Notifications will stop if a notification channel has connectivity mode "Delegate" with tags specific to organization-level delegates. 
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
    - Triggers where organization identifiers and project identifiers are present will break.

7. Access control:
    - Organization-level RBAC policies do not transfer and must be reapplied in the destination organization to maintain proper access controls.

8. Audit logs:
    - Historical data and execution records are fully preserved when moving projects. However, links in the audit logs may break which redirects to the entity on the source organization.

9. Security and Governance:
    - Policies from the source organization will be removed as part of the policy set.
    - Freeze windows with services or environments referencing source organization resources will break. 


:::note Important note
1. **Redirect links may break** - Redirect links in pipelines, webhooks, audit logs, or other entities may stop working after a project is moved across organizations, as the source organization will no longer be available or referenced.

   For example, if Project P is moved from Organization O1 to O2,  audit logs will be generated under the destination organization. However, any redirection links that reference the source organization (O1) in those logs will no longer function.

2. **Project identifier reuse restriction** - Creating a project with the same identifier in the source organization is not allowed. For example, if Project P was moved from Organization A to Organization B, then creating a project with the same identifier as Project P in Organization A would not be allowed.
:::

## Post-Movement Remediation

- Check for broken references and entities from the source organization.
- Review pipeline failures for clear, actionable errors to resolve issues.
- Recreate organization-level connectors in the destination organization.
- Recreate organization-level secrets in the destination organization.
- Update notification channels to use destination organization resources.
- Verify and update RBAC policies for proper access control.
- Update any hardcoded organization identifiers in YAML configurations.



