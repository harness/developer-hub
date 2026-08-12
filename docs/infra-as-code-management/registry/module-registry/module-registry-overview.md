---
title: Module Registry
description: Overview of the Harness IaCM Module Registry, a centralized catalog for publishing, discovering, and versioning reusable OpenTofu and Terraform modules.
sidebar_position: 10
sidebar_label: Overview
keywords:
  - IaCM
  - Module Registry
  - OpenTofu modules
  - Terraform modules
  - module catalog
  - artifact storage
  - auto-sync
tags:
  - IaCM
  - registry
redirect_from:
  - /docs/infra-as-code-management/registry/module-registry/module-registry-code-structure
  - /docs/infra-as-code-management/registry/module-registry/root-sub-module-usage
  - /docs/infra-as-code-management/registry/module-registry/module-registry-tabs
  - /docs/infra-as-code-management/registry/module-registry/iacm-module-governance
  - /docs/infra-as-code-management/iacm-features/module-registry/module-registry-code-structure
  - /docs/infra-as-code-management/iacm-features/module-registry/root-sub-module-usage
  - /docs/infra-as-code-management/iacm-features/module-registry/module-registry-tabs
  - /kb/reference-architectures/iacm/iacm-module-governance
  - /docs/infra-as-code-management/registry/module-registry/content/root-submodule-usage
---

:::info Module Registry 2.0 Beta
Module Registry now supports Auto Sync and Artifact storage. New versions onboard automatically through your Harness pipelines. Go to [Module Artifacts](/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts) to understand how artifact storage and auto-sync work.

To enable Module Registry 2.0 for your account, contact [Harness Support](mailto:support@harness.io).
:::

The Harness IaCM Module Registry is a centralized catalog where you publish, discover, and version reusable OpenTofu or Terraform modules. You use the registry to find approved modules, pin workspaces to specific versions, and reuse infrastructure across projects instead of copying configuration.

<!-- SCREENSHOT: Module Registry catalog page showing the list of registered modules with version badges, storage type indicators (Artifact or Git reference), and the search bar. Navigate to Infrastructure as Code Management, then select Module Registry. -->

---

## What you will learn

By the end of this page, you will understand:

- **How a Git tag becomes a module version**: How a new Git tag triggers the onboarding pipeline and creates a versioned, discoverable entry in the registry.
- **How Harness processes and stores modules**: How Harness packages each tagged commit as a ZIP artifact and extracts structured metadata including inputs, outputs, resources, and documentation.
- **How teams consume registered modules**: How engineers find modules in the catalog, inspect version details, and reference a specific version from their workspace configurations.
- **The module lifecycle stages**: The end-to-end flow from structuring your repository to testing, managing versions, and governing module usage.

---

## How the Module Registry works

When you push a Git tag to a module repository, a Harness pipeline triggers and onboards that tag as a new module version. The pipeline fetches the tagged commit, packages it as a ZIP artifact, and registers the version in the catalog. If you enable auto-sync, every subsequent tag you push triggers the pipeline automatically so the registry stays current without manual re-registration.

During onboarding, Harness parses each module version and extracts structured metadata: variable definitions, outputs, provisioned resources, submodule declarations, and README documentation. This metadata is stored alongside the artifact so teams can review what a module does before they reference it. Because the artifact is stored independently of your Git repository, workspace executions fetch and use the module without requiring Git credentials at runtime.

Teams discover modules through the registry catalog, filter by scope (account, organization, or project), and inspect available versions alongside their parsed documentation. To consume a module, a workspace configuration references the registry source address with a specific version. Harness resolves and authenticates that source automatically when the workspace runs.

---

## The module workflow

The Module Registry follows a lifecycle from preparing a module in Git to governing how your teams use approved versions.

| Stage | What you do |
| --- | --- |
| [Set Up a Module](/docs/infra-as-code-management/registry/module-registry/module-structure) | Prepare an OpenTofu or Terraform module repository with the required file structure so the registry can parse it. |
| [Register a Module](/docs/infra-as-code-management/registry/module-registry) | Register the module from a Git repository, configure the onboarding pipeline and auto-sync, and publish tagged versions as artifacts. |
| [Explore and Use a Module](/docs/infra-as-code-management/registry/module-registry/registered-module-settings) | Browse module versions and parsed metadata, then reference a version from your OpenTofu or Terraform configuration. |
| [Test a Module](/docs/infra-as-code-management/registry/module-registry/module-registry-testing) | Validate new module versions with automated test pipelines before teams adopt them. |
| [Manage Version Lifecycle](/docs/infra-as-code-management/registry/module-registry/module-version-lifecycle-management) | Apply version lifecycle tiers and enforce upgrade policies in Harness pipelines. |
| [Govern Module Usage](/docs/infra-as-code-management/registry/module-registry/module-governance) | Apply OPA policies to control which modules and versions teams can use. |

---

## Next steps

- Go to [Set Up a Module](/docs/infra-as-code-management/registry/module-registry/module-structure) to structure your module repository before registering it.
- Go to [Register a Module](/docs/infra-as-code-management/registry/module-registry) to add a module to the registry and configure the onboarding pipeline.
- Go to [Module Artifacts](/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts) to understand how artifact storage and auto-sync work.
