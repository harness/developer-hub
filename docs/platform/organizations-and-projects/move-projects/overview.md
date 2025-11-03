---
 title: Move a project 
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
This feature requires the `PL_PROJECT_MOVEMENT_ENABLED` feature flag. Contact [Harness support](mailto:support@harness.io) to enable it.
:::

This feature allows you to transfer a project from one organization to another within your Harness account. It can be used when a project needs to be moved to a different organization, such as during ownership transfers.

## What happens when you move a project 

1. **Entities are moved**: [Supported entities](#supported-modules), such as pipelines, services, environments, and monitored services, are carried over with the project to the destination organization.

2. **Organization-scoped resources need reconfiguration**: Resources scoped at the source organization level become inaccessible after the move. You might need to recreate connectors, secrets, templates, webhooks, and notifications in the destination organization, and then update any project references to point to these new resources.

3. **Access control requires reconfiguration**: Organization-level RBAC policies, governance rules, and security policies do not transfer and must be recreated in the destination organization. All Project-level access control components including role bindings, resource groups, and roles are migrated asynchronously. While the move is in progress, users may experience temporary access restrictions during the move process.

4. **Audit logs**: Existing audit logs remain in the source organization and are not moved with the project. Any links in these logs pointing to the moved project or older organization will become inaccessible.

For detailed pre-move validation and post-move remediation steps, see the [Move a Project guide](./pre-move-and-post-move-guide.md).

## Prerequisites

To move a project across organizations, you need the following permissions:

- Move permission for the project that you want to move.
- Create project permission in the destination organization.

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

