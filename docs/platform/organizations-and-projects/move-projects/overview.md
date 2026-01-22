---
 title: Move a project (Closed Beta)
 description: Overview of moving a project between organizations, including prerequisites, Supported modules and how to request or perform a move.
 sidebar_label: Overview
 sidebar_position: 1
 tags:
   - organizations
   - projects
   - move project
 keywords:
   - move projects
   - move project between organizations
   - transfer project
   - organization restructure
---

:::note Feature availability
1. This feature is currently in **closed beta**, and is available for select accounts only. The access is determined based on the currently [supported modules and entities](#supported-modules).
2. This feature requires the `PL_PROJECT_MOVEMENT_ENABLED` feature flag. Contact [Harness support](mailto:support@harness.io) to enable it.
:::

This feature allows you to move a project from one organization to another within your Harness account. It can be used when a project needs to be moved to a different organization, such as during ownership transfers between teams.

## What happens when you move a project 

1. **Entities are moved**: Entities from the [supported modules](#supported-modules), such as pipelines, services, and environments, are carried over with the project to the destination organization.

2. **Organization-scoped resources**: Resources scoped at the organization level referenced in the project become inaccessible after the move. You might need to recreate connectors, secrets, templates, webhooks, and notifications in the destination organization, and then update any project references to point to these new resources.

3. **Access control components**: 
    - Organization-level RBAC components such as [User groups](/docs/platform/role-based-access-control/add-user-groups/#create-groups-by-inheritance)/[Service accounts](/docs/platform/role-based-access-control/heirarchichal-support-for-service-accounts) inherited from the Organization into the project and their associated role bindings, do not move and must be recreated in the destination organization if required. Moreover, roles reused from the Organization into a project will not be moved as well.
    - All Project-level access control components including users, service accounts, user groups, role bindings, resource groups, and roles are moved asynchronously. While the move is in progress, users or service accounts that have access to the project might temporarily be unable to access it.

4. **Audit logs**: For Organization-level audit logs: 
    - Logs belonging to the project before the move stay in the source organization and are not transferred.
    - Links in old audit logs pointing to the moved project in the older organization will break as they still contain the older organization.
    - New audit logs for the moved project will appear in the newer organization.

For detailed pre-move validation and post-move remediation steps, refer the [guide](./pre-move-and-post-move-guide.md).

## Supported modules

* [Platform](/docs/platform/platform-whats-supported)
* [Continuous Delivery and GitOps](/docs/continuous-delivery/cd-integrations)
* [Continuous Integration](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix)
* [Internal Developer Portal](/docs/internal-developer-portal/whats-supported)
* [Security Test Orchestration](/docs/security-testing-orchestration/whats-supported/sto-deployments)
* [Code Repository](/docs/code-repository/code-supported)
* [Database DevOps](/docs/database-devops/dbdevops-supported-platforms.md)

:::note Unsupported [Entities](/docs/platform/references/harness-entity-reference)
  In the Continuous Delivery and GitOps module, the following entities are not supported: 
    - [Policy as Code (OPA)](/docs/category/policy-as-code)
    - [GitOps](/docs/category/get-started-with-gitops)
    - [Continuous Verification](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step)
:::

