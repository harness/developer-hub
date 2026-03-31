---
title: Harness Solutions Factory release notes
sidebar_label: Harness Solutions Factory
date: 2026-02-03T10:00
tags: [Harness Solutions Factory]
sidebar_position: 20
redirect_from:
  - /kb/reference-architectures/hsf/changelog
  - /docs/harness-solutions-factory/changelog
---

These release notes summarize what changed in the [Harness Solutions Factory](https://github.com/harness/harness-solutions-factory) repository and in related Harness Developer Hub documentation. For setup and architecture, start with [Harness Solutions Factory Docs](/docs/harness-solutions-factory).

---

## February 2026

### New Features & Enhancements

- **HSF Hub core:** Introduced the HSF Hub core framework and a root `terraform.tf` placeholder so you can run in `hsf_core_mode` with a clear baseline layout.

- **Optional Harness IDP during factory setup:** Pilot Light, Solutions Factory, and Factory Floor respect `should_use_harness_idp`. When set to `false`, Unpack skips provisioning Harness IDP and treats IDP resources as optional, which suits environments that manage IDP separately.

- **Custom Template Library as a full HTL mirror:** Custom Template Library can be configured as a one-time full mirror of the official Harness Template Library repository.

- **Terraform variable files in Factory Floor:** The Factory Floor Create and Manage pipeline accepts Terraform variable files via `RESOURCE_VARS_FILES`, so you can supply per-resource variables without ad hoc workarounds.

- **Landing zone content in Solutions Factory:** Solutions Factory content now includes landing zone details for clearer handoff from factory to deployed environments.

---

### Feature Improvements

- **IACM stages in core mode:** Pilot Light, Factory Floor, and Solutions Factory use IACM stages when running in `hsf_core_mode`, aligning execution with the rest of the Harness IaC workflow.

- **Organization access for HSF users:** Pilot Light configures HSF users with shared access to organization-level resources where appropriate.

- **Factory Floor governance:** Factory Floor includes tighter RBAC and OPA policy patterns so teams can delegate access with clearer guardrails.

- **Merge strategy rules:** Pilot Light updates Code Repository merge strategy rules to match current branching guidance.

---

### Deprecations

- **Legacy AWS factory connector:** The dedicated **HSF Solutions Factory Connector** and related deprecated AWS connector metadata are **removed effective with HSF repository v2.4.0 (February 2026)** and are no longer delivered in updated Pilot Light bundles. **Action required:** Before you mirror or apply v2.4.0, configure a standard Harness [AWS connector](/docs/platform/connectors/cloud-providers/add-aws-connector) (overview: [Connect to a cloud provider](/docs/platform/connectors/cloud-providers/connect-to-a-cloud-provider)) and align workspace variables using [Harness Solutions Factory Docs](/docs/harness-solutions-factory) and [Created resources](/docs/harness-solutions-factory/use-hsf/created-resources); then run `Manage Pilot Light` so the upgrade does not depend on the removed connector.

- **Register Official IDP Templates pipeline:** The **Register Official IDP Templates** pipeline is **removed in HSF v2.4.0 (February 2026)**. Register templates with **Register Custom IDP Templates** and the custom Harness template library instead. **Migration:** Use [Workflows](/docs/harness-solutions-factory/use-hsf/workflows) for how default workflows are registered and for **Register Custom IDP Templates**, and [Customize using Custom HTL](/docs/harness-solutions-factory/custom-harness-template-library/customizing-using-custom-htl) for `idp_registry_mgr.yaml` and registration scope.

---

## December 2025

### New Features & Enhancements

- **Automatic Custom Template Library load on Unpack:** Unpack for Solutions Factory can load custom template library resources automatically as part of deployment, reducing manual import steps.

- **Kubernetes service account in pipeline infrastructure:** Pilot Light, Factory Floor, and Solutions Factory support `kubernetes_serviceaccount` in pipeline infrastructure definitions.

---

### Feature Improvements

- **Service account secrets and external secret stores:** Pilot Light ignores drift on the service account secret so you can point at a different secrets provider without Terraform fighting the live value.

- **Service account token rotation schedule:** Default rotation for the service account token is weekly on Sundays at 03:00 unless you override it.

---

## November 2025

### Feature Improvements

- **Mirror pull requests and notifications:** The Mirror Repos pipeline can email members of `org.HSF_Mirror_Reviewers` when new pull requests open, and example cron values in `terraform.tfvars.example` match the trigger behavior.

- **Factory Floor workspaces and IDP templates:** Factory Floor Create Manage Workspaces pulls IDP resource templates from the official HTL repository and avoids removing a workspace on approval rejection if the workspace has changed since the request.

- **Conditional IACM and IDP in Solutions Factory:** Create Manage Workspaces can skip or run IACM and IDP registration based on workspace location and pipeline variables.

---

### Bug Fixes & Improvements

- **Mirror Repos email noise:** Mirror Repos sends notifications when a **new** pull request is created, not on unrelated events.

---

## October 2025

### New Features & Enhancements

- **Mini-Factory and Core Framework:** Adds Mini-Factory for scalable HSF environments, a Core Framework layout, and moves Solutions Factory IACM pipelines into a clearer structure. Solutions Factory adopts the factory-floor operating model. See [Mini-Factory and Factory Floor Docs](/docs/harness-solutions-factory/use-hsf/mini-factory-and-factory-floor).

- **Pull-request-driven upgrades and Unpack:** Mirror Repos supports pull-request-based runs with a dedicated trigger configuration. **Unpack Solutions Factory** is a self-contained unarchive pipeline that removes itself when finished. OpenTofu plugin steps are used consistently across IACM stages.

- **Mirror review group:** Adds `hsf_mirror_reviewers` and wires Mirror Repos to use it together with CODEOWNERS for `@org.HSF_Mirror_Reviewers`.

- **HSF Adjustment step for merge strategies:** The Execute IACM Workspaces Apply-only path can run an HSF Adjustment step that updates branch merge strategies to match your policy.

- **Bulk IDP registration:** Bulk workspace IDP registration can register IDP layouts and scorecards as well as entities.

---

### Feature Improvements

- **Token rotation and service accounts:** Pilot Light improves token rotation and expands options for creating service accounts.

- **Workspace defaults:** Pilot Light and Solutions Factory workspaces drop unnecessary default variables and ship leaner default pipelines.

- **Solutions Factory template layout:** Pipelines and layouts are reorganized; obsolete resources are removed. Register IDP Templates no longer performs legacy layout and scorecard setup handled elsewhere.

---

### Bug Fixes & Improvements

- **Factory Floor and Solutions Factory:** Fixes include ephemeral IDP entity cleanup in Create Manage, correct handling of `DRONE_OUTPUT` in Mirror Repos, JSON decoding of node selectors from workspace locals, and boolean handling in bulk IDP registration.

---

### ⚠️ Breaking Changes

- **Remote Pilot Light moved out of this repository:** The **RemotePilotLight** feature is removed from the main HSF repository and maintained separately.

- **Who is affected:** Anyone cloning or upgrading from a layout that referenced in-repo Remote Pilot Light modules or default repo paths from that era.

- **Action required:** After upgrade, align your remote-pilot-light configuration with the repository and branch your organization standardizes on, and update any automation that assumed the old path. Consult [Get started with Harness Solutions Factory Docs](/docs/harness-solutions-factory/new-to-hsf/get-started) and your internal runbooks for the supported split-repo layout. You can pin an earlier repository tag temporarily while you migrate; plan to move off unsupported tags as soon as your runbooks are updated.

---

## September 2025

### New Features & Enhancements

- **CI Golden Standard templates and docs:** Documentation and factory support for [Deploy Harness CI Golden Standard Templates Docs](/docs/harness-solutions-factory/use-hsf/workflows#deploy-harness-ci-golden-standard-templates) clarify day-one CI pipeline patterns for containerized applications.

---

### Feature Improvements

- **Developer Hub corrections:** Fixes include a typo in **RESOURCE_VARS_ENVS_SECRETS** documentation and **CI Module Primer** behavior so teams can set the Docker connector during setup.

- **Manage IACM Workspace configuration:** Corrects plugin settings for the Manage IACM Workspace step in Create IACM Workspace.

---

## August 2025

### Feature Improvements

- **Register IDP Templates:** You can load templates from a single directory and choose a custom registration file name and path.

- **Ephemeral workspaces and Create and Manage:** Create and Manage handles IACM behavior for ephemeral workspaces so teardown and apply remain reliable.

---

### Bug Fixes & Improvements

- **Teardown and workspace removal:** Fixes a failure when teardown removed a workspace while the pipeline still depended on it.

---

## July 2025

### New Features & Enhancements

- **HSF 2.2 and IDP 2.0 alignment:** Major upgrade aligning factory workflows with IDP 2.0: IDP registration uses the new module pattern, create-and-manage and provision flows register and update IDP resources in lockstep, IACM pipelines and defaults are expanded, ephemeral workspaces are supported end to end, and optional approvals streamline workspace management. Email notifications fire when an approval is waiting. For scope and terminology, see [HSF 2.x Docs](/docs/harness-solutions-factory/new-to-hsf/hsf2-x).

- **Bulk workspace management:** Adds patterns for bulk workspace IDP registration and management alongside the refreshed create-manage flows.

---

### Feature Improvements

- **Simpler Git inputs and plugin context:** The Create Manage pipeline no longer requires Git repository path in all cases. Create Manage Workspace passes `HARNESS_ACCT` and `HARNESS_API_KEY` into plugins that need account context.

- **Register IDP Templates parameters:** Removes legacy parameters and simplifies variables for Register IDP Templates (v2.2.1).

- **Remote Pilot Light setup:** Updates default setup paths and variables for remote Pilot Light configurations shipped with this release.

---

### Deprecations

- **HSF AWS connector and `provider_connector`:** The HSF-specific AWS connector is marked **deprecated**, and `provider_connector` is removed from Pilot Light and Solutions Factory workspace variables effective **HSF v2.2.0 (July 2025)**. The legacy **HSF Solutions Factory Connector** and related bundle metadata are **removed from Pilot Light with HSF v2.4.0 (February 2026)**—plan migrations before applying that line. **Action required:** Move to a standard Harness [AWS connector](/docs/platform/connectors/cloud-providers/add-aws-connector) (see [Connect to a cloud provider](/docs/platform/connectors/cloud-providers/connect-to-a-cloud-provider)) and the variable layout in [Harness Solutions Factory Docs](/docs/harness-solutions-factory) and [Created resources](/docs/harness-solutions-factory/use-hsf/created-resources).

---

## June 2025

### New Features & Enhancements

- **Default Docker Hub connector for factory pipelines:** An organization-level Docker Hub connector can serve as the default for HSF pipelines so image pulls work without per-pipeline duplication.

---

## May 2025

### Feature Improvements

- **Supply chain and operations:** HSF and HTL codebases were scanned with no blocking issues reported at the time of the release notes entry. Delegate deployment was automated to simplify scaling, the Python SDK image used in pipelines was refreshed, and deployments were validated against IDP 2.0.

- **Templates and plugins:** STO Primer templates accept CPU and memory as stage variables, and a plugin pipeline fix ensures hidden files are copied when expected.

---

## April 2025

### New Features & Enhancements

- **Connectors and images:** Pilot Light and Solutions Factory accept a custom repository connector and overrides for plugin images so air-gapped or private-registries workflows are easier to support.

- **Custom Template Library in Harness Code:** New installations can use a scaffold custom template library repository in Harness Code, with account-level variables for connector and repository paths. A public **`custom-harness-template-library`** boilerplate repository documents the layout alongside the HTL docs refresh.

- **CCM Cluster Orchestrator template:** Adds a template for CCM Cluster Orchestrator deployment in the template library.

- **Central build farm and IDP:** The IDP workflow accommodates artifact managers in central build farm scenarios.

---

### Feature Improvements

- **Template library documentation:** Expanded guidance for local development, creating and customizing templates, and moving between Harness Cloud and self-managed Kubernetes. See [Custom Harness Template Library Docs](/docs/harness-solutions-factory/custom-harness-template-library/setup-custom-htl).

- **Scaffold and layout cleanup:** Template files were reorganized for easier customization; Artifactory assets moved to clearer directory names; OCI Helm path typos were corrected; several variables were renamed for consistency.

- **Remote Pilot Light bootstrap:** Remote Pilot Light can generate the customization repository from a configurable GitHub source repository.

---

## March 2025

### Feature Improvements

- **Repository rules:** Pilot Light repository setup supports `repo_owners` overrides for rules, adds default branch rules, and updates `.harness/CODEOWNERS` accordingly.

- **Configuration flags and URLs:** Solutions Factory honors the `HSF_ENABLED` flag, Remote Pilot Light accepts account-specific URLs, and Register IDP Templates uses the `hsf_url` variable consistently.

---

## February 2025

### Feature Improvements

- **IACM and IDP plugins:** Solutions Factory Create Manage IAC workspaces integrate with the Manage Iacm Workspace plugin. Register IDP moves to the Python script flow for registration.

- **Pilot Light automation:** Token rotation uses the **harness-token-rotation** plugin, mirror repositories use **harness-cr-mirror-repositories**, and Manage Pilot Light adds an explicit approval gate.

---

## December 2024

### New Features & Enhancements

- **Admin and user provisioning:** Pilot Light can set up HSF admins and users with clearer permission scoping across the organization.

---

## November 2024

### Feature Improvements

- **Delegates and template library:** Pipelines can specify `delegate_selectors`. Pilot Light provisions default custom template library repositories and connectors consistent with the new library layout.

- **Mirror and IDP workflows:** Mirror Repos isolates working directories per step and fixes workspace variable expansion issues. Register IDP workflows handle larger payloads reliably.

---

### Bug Fixes & Improvements

- **Kubernetes Remote Pilot Light:** Restores the correct image reference for Remote Pilot Light when deploying on Kubernetes.

---

## October 2024

### New Features & Enhancements

- **Admin token rotation pipeline:** Adds a scheduled rotation pipeline for platform admin tokens, with Remote Pilot Light able to trigger rotation runs. Pilot Light and Solutions Factory default delegate selectors toward build-farm patterns where appropriate.

- **Harness Code connector:** Introduces the **harness_code_repository_tpl_official** connector for template-library Git access.

---

### Feature Improvements

- **IAC dry runs and IDP registration:** Pilot Light and Solutions Factory can dry-run IACM pipelines. Register IDP gains filtered and child imports, better empty-filter handling, and null-safe handling for API-driven template variables. Pilot Light IDP workflows are updated to match.

- **Workspace lifecycle:** Account resources respect HSF admin membership changes. `INCLUDE_HARNESS_ENVS` defaults to `false` on the Create and Manage template to avoid unexpected environment injection.

---

### ⚠️ Breaking Changes

- **Template Library code removed from the bundle:** Legacy in-repo Template Library scaffolds and modules are removed in favor of Git-backed template libraries and the official connector.

- **Who is affected:** Anyone still referencing deleted Template Library paths or old `Workspace::SolutionsFactory` connector-only patterns from pre-2.0 layouts.

- **Action required:** Migrate to the connector and workspace model in [Harness Solutions Factory Docs](/docs/harness-solutions-factory) and pin to a supported template-library repository before upgrading past this line. Earlier repository tags remain available if you need a short overlap while you migrate.

---

## August 2024

### New Features & Enhancements

- **Initial release:** First generally documented release of Harness Solutions Factory for bootstrapping Pilot Light, Solutions Factory, and related workspaces.

---

### Feature Improvements

- **IACM and delegates:** Create Manage IACM handles ECS delegates without incorrect working-directory cleanup. Pilot Light passes `remote_account_url` into the IDP catalog workspace, fixes `harness_platform_url` handling, and updates Central Build Farm Docker Hub metadata.

- **Harness Cloud Builds:** Delegate image factory paths support Harness Cloud Builds for teams using that execution mode.

---
