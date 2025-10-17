---
title: Project movement checklist
description: Pre-move checklist and post-move  steps to ensure successful project migration between organizations.
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
  - post-move Remediation
  - project transfer steps
---

The below checklist can be used for both pre-move verification and post-move remediation to ensure a project is moved with minimal disruption.

## Pre-move verification

When a project is moved, you may see warnings for unsupported entities or broken references. Key entities to watch are listed below:

1. Pipelines:
    - Pipelines that refer organization-level connectors will break after the move.
    - Secrets used in pipelines may be scoped at the organization level. After moving to a destination organization, these secrets might become unavailable. 
    - Templates used to build pipelines may be scoped at the organization level. Review and make these templates available in the destination organization; otherwise, pipelines may fail to render or execute.
    - YAML entities may use fully qualified identifiers, such as orgIdentifiers, that reference the source organization. These references may become stale and cause errors.
    - [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining) will fail if the child pipeline’s project is moved.
    - Pipelines that are running during the project move may fail.

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
    - Triggers where organization identifiers and project identifiers are present will be no longer functional.

7. Access control:
    - Organization-level RBAC policies do not transfer when a project is moved and must be reapplied in the destination organization to maintain proper access controls.

8. Audit logs:
    - Historical data and execution records are fully preserved when a project is moved. However, links in the audit logs may break which redirects to the entity on the source organization.

9. Security and Governance:
    - Policies from the source organization will be removed as part of the policy set.
    - Freeze windows with services or environments referencing source organization resources will break. 


:::note Important note
1. **Redirect links may break** - Redirect links in pipelines, webhooks, audit logs, or other entities may stop working after a project is moved across organizations, as the source organization will no longer be available or referenced.

   For example, if Project P is moved from Organization O1 to O2,  audit logs will be generated under the destination organization. However, any redirection links that reference the source organization (O1) in those logs will no longer function.

2. **Project identifier reuse restriction** - Creating a project with the same identifier in the source organization is not allowed. For example, if Project P was moved from Organization A to Organization B, then creating a project with the same identifier as Project P in Organization A would not be allowed.
:::

## Post-move remediation

You may see warning messages across the project where references are no longer accessible and require reconfiguration. Some key points are outlined below:

- Review pipeline failures for clear, actionable errors to resolve issues.
- Recreate organization-level connectors and secrets in the destination organization.
- Update notification channels to use destination organization resources.
- Verify and update RBAC policies.
- Update any hardcoded organization identifiers in YAML configurations.



