---
title: Post-move remediation guide
description: Fix broken references and recreate resources after moving a project across organizations.
sidebar_label: Post-move remediation guide
sidebar_position: 15
tags:
  - project-movement
  - remediation
  - post-move
keywords:
  - post-move remediation
  - fix broken references
  - project move
---

After moving a project from one organization to another, you need to fix broken references and recreate organization-level resources in the destination organization. This guide walks you through the remediation steps.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Testing and fixing pipelines after a project move](#pipelines).
- [Recreating organization-level connectors, secrets, and templates](#connectors-and-secrets).
- [Updating services, environments, and access controls](#services-and-environments).
- [Handling Terraform pipelines and configuration updates](#pipelines).

---

## Before you begin

Before you start fixing issues after a project move, make sure:

- **The project move completed successfully**: Verify the project appears in the destination organization.
- **You have appropriate permissions**: You need permissions in the destination organization to create connectors, secrets, templates, and configure access controls. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles.
- **You have the pre-move inventory**: Reference the list of organization-level resources you documented before the move. Go to <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-guide" target="_blank">Pre-move validation checklist</a> for details.

---

## Fix issues after moving a project

After the move completes, review the following resources and make any necessary updates. This list covers common issues, but you might need to take additional steps depending on your project setup.

### Pipelines

- **Test pipelines**: Run all pipelines to find broken references.
- **Update references**: Point pipeline references to connectors and secrets in the destination organization.
- **Recreate templates**: Recreate any organization-level templates in the destination organization.
- **Update identifiers**: Update YAML files that have hardcoded `orgIdentifier` values to match the new organization.
- **Fix pipeline chaining**: Update pipeline chaining references if you also moved the child pipelines.

:::warning Pipelines using Terraform might fail
If a pipeline that uses Terraform fails after the move, re-run it. Failures can happen if the pipeline was running when the move started and it cannot access files from the Terraform Plan step. These files include the inherited plan, exported JSON plan, and exported human-readable plan. Go to <a href="/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step#review-terraform-plan-and-apply-steps" target="_blank">Review Terraform Plan and Apply steps</a>, <a href="/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step#export-json-representation-of-terraform-plan" target="_blank">Export JSON representation of Terraform Plan</a>, and <a href="/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step#export-human-readable-representation-of-terraform-plan" target="_blank">Export human-readable representation of Terraform Plan</a> for details.

The same issue affects Terragrunt pipelines, except Terragrunt does not use the exported JSON or human-readable plans.
:::

### Connectors and secrets

Recreate organization-level connectors and secrets in the destination organization if your project needs them.

### Services and environments

- **Update service resources**: Update service manifest sources and artifact sources that reference connectors from the old organization.
- **Update environment configuration**: Update environment configuration files and connection strings as needed.
- **Recreate overrides and infrastructure**: Recreate service overrides and infrastructure definitions that referenced organization-level resources.

### Notifications and webhooks

- **Update notification rules**: Update notification rules that reference channels from the old organization.
- **Recreate webhook configurations**: Recreate webhook configurations using connectors and secrets from the destination organization.
- **Test custom triggers**: Test and update custom webhook triggers.

### Access control

Create organization-level RBAC components and assign role bindings to make sure users and service accounts still have the access they need.

### Monitored services

Update monitored services that still reference resources from the old organization.

### Policy management

- **Review policy sets**: Check all policy sets in the moved project for references to organization-level policies.
- **Recreate policies**: Recreate organization-level policies in the destination organization if your policy sets need them.
- **Update references**: Update policy sets to reference policies from the destination organization.
- **Verify policy evaluations**: Test that all policy evaluations still work correctly.

### Update bookmarks and URLs

Update any bookmarks, saved URLs, and runbooks that reference the old organization path.

---

## Related articles

- <a href="/docs/platform/organizations-and-projects/move-projects/pre-move-guide" target="_blank">Pre-move validation checklist</a> - Check dependencies before moving a project.
- <a href="/docs/platform/organizations-and-projects/projects" target="_blank">Create organizations and projects</a> - Manage organizations and projects in Harness.
- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> - Understand roles and permissions.
- <a href="/docs/platform/pipelines/pipeline-chaining" target="_blank">Pipeline chaining</a> - Configure pipeline chaining.
