---
 title: Move projects 
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

A project is a group of harness modules, their pipelines, and other resources used to organize and manage resources in an organization. The move projects feature allows you to transfer projects between organizations, which is useful during reorganizations, or ownership transitions.

This capability enables teams to adapt to structural changes while preserving project configuration, resources, and history, supporting flexible governance across evolving team structures.

## What happens when you move a project 

When you move a project to another organization in Harness, several actions take place in the background.

1. **Entities inside the project are moved:** Pipelines, services, environments, and other [entities](#supported-entities) are carried over to the new organization. These entities remain intact; however, references to external items are validated during the move.

2. **Dependencies become stale:** If the project depends on connectors, secrets, or templates defined at the old organization level, those items may no longer be accessible in the new organization. Because organizations are isolated, these dependencies must be recreated in the new organization. Any references to account- or project-level entities remain intact.

3. **Audit logs are generated:** All project moves are logged with details such as the user, timestamp, source organization, and destination organization. These audit trails provide accountability to support compliance requirements.

## Prerequisites and permissions

To move a project between organization resources, you need the following roles on the project, its source organization, and the destination organization:

- Move Permission on the project that you want to move.
- Create Permission on the destination organization.

## Supported Modules

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
  - In the Continuous Delivery module, the following entities are not supported: Policy as Code (OPA), GitOps, and Continuous Verification. 
:::

For detailed pre-move and post-move verification steps, refer to the [project movement checklist](project-movement-checklist.md).