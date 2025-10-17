---
 title: Move a project 
 description: Overview of moving projects between organizations, including prerequisites, limitations, and how to request or perform a move.
 sidebar_label: Overview
 sidebar_position: 1
 tags:
   - organizations
   - projects
   - project-migration
   - cross-org
   - governance
   - admin
 keywords:
   - move projects
   - migrate project between organizations
   - transfer project
   - organization restructure
---

The move projects feature allows you to transfer projects between organizations, which is useful during reorganizations, or ownership transitions.

This capability enables teams to adapt to structural changes while preserving project configuration, resources, and history, supporting flexible governance across evolving team structures.

## What happens when you move a project 

1. **Modules and entities are moved**: [Supported modules and entities](#supported-modules), such as pipelines, services, environments, and monitored services, are carried over to the destination organization.

2. **Dependencies become stale**: Resources scoped at the source organization level—like connectors, secrets, templates, webhooks, or notifications may become inaccessible. These dependencies need to be recreated or updated in the destination organization. References to account- or project-level entities remain intact.

3. **Access control and policies**: Organization-level RBAC policies, governance rules, and security policies do not transfer and must be reapplied in the destination organization.

4. **Audit logs**: Old audit logs are maintained, but redirect links to the source organization may break.

For detailed pre-move verification and post-move remediation steps, refer to the [project movement checklist](project-movement-checklist.md).

## Prerequisites and permissions

To move a project across organizations, you need the following roles on the project, its source organization, and the destination organization:

- Move Permission on the project that you want to move.
- Create Permission on the destination organization.

## Supported modules

* [Platform](/docs/platform/platform-whats-supported)
* [Continuous Delivery](/docs/continuous-delivery/cd-integrations)
* [Continuous Integration](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix)
* [Internal Developer Portal](/docs/internal-developer-portal/whats-supported)
* [Security Test Orchestration](/docs/security-testing-orchestration/whats-supported/sto-deployments)
* [Supply Chain Security](/docs/software-supply-chain-assurance/ssca-supported)
* [Code Repository](/docs/code-repository/code-supported)
* [Database DevOps](/docs/database-devops/dbdevops-supported-platforms.md)
* [Software Engineering Insights](/docs/software-engineering-insights/sei-support)

:::note [Unsupported Entities](/docs/platform/references/harness-entity-reference)
  In the Continuous Delivery module, the following entities are not supported: 
    - Policy as Code (OPA). 
    - GitOps.
    - Continuous Verification. 
:::

