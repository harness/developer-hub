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

This feature allows you to move a project across organizations, which is useful during restructuring, or ownership transitions.

## What happens when you move a project 

1. **Entities are moved**: [Supported entities](#supported-modules), such as pipelines, services, environments, and monitored services, are carried over with the project to the destination organization.

2. **Dependencies need to be reconfigured**: Resources scoped at the source organization level—like connectors, secrets, templates, webhooks, or notifications may become inaccessible. These dependencies need to be recreated or updated in the destination organization. References to account- or project-level entities remain intact.

3. **Access control and policies**: Organization-level RBAC policies, governance rules, and security policies do not transfer and must be reapplied in the destination organization. When a project move is initiated, all access control components are migrated asynchronously. During this process, access to the project will be temporarily blocked for users.

4. **Audit logs**: Existing audit logs are preserved, but any links in the logs pointing to source organization resources may break, as those resources will no longer be accessible.

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
* [Supply Chain Security](/docs/software-supply-chain-assurance/ssca-supported)
* [Code Repository](/docs/code-repository/code-supported)
* [Database DevOps](/docs/database-devops/dbdevops-supported-platforms.md)

:::note Unsupported [Entities](/docs/platform/references/harness-entity-reference)
  In the Continuous Delivery and GitOps module, the following entities are not supported: 
    - [Policy as Code (OPA)](/docs/category/policy-as-code)
    - [GitOps](/docs/category/get-started-with-gitops)
    - [Continuous Verification](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step)
:::

