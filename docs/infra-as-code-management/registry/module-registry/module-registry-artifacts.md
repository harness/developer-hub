---
title: Module Artifacts
description: How to create a module in the Harness IaCM Module Registry, choose Artifact or Git reference storage, connect an onboarding pipeline, and use auto-sync.
sidebar_position: 20
keywords:
- IaCM
- Module Registry
- artifact storage
- artifact registry
- OpenTofu modules
- Terraform modules
- git reference storage
- automatic version syncing
- auto-sync
- onboarding pipeline
tags:
- IaCM
- registry
---

<CTABanner
buttonText="Learn more"
title="Coming soon!"
tagline="Module Registry Artifacts is currently pending release and will be available soon!"
link="/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts"
closable={true}
target="_blank"
/>

:::warning Pending release
Module Registry Artifacts is currently **pending release** and will be available soon!
:::

The Harness IaCM Module Registry lets you store and version OpenTofu or Terraform modules centrally. You choose how each module is stored—**Artifact** (ZIP on the IaCM server, no Git credentials at workspace runtime) or **Git reference** (metadata resolved from Git on use, as in the original flow). **Module onboarding** (the execution pipeline you attach in the wizard) and **auto-sync** (webhook-driven runs when new tags appear) work the same way for **either** storage type; only the pipeline’s packaging step differs when you use Artifact storage.

:::info Document scope and availability
The wizard steps below (storage choice, onboarding pipeline, auto-sync) apply **whether you select Artifact or Git reference**. This page describes the newer registry experience, which is **not yet enabled for all accounts**. Until it is generally available, use [Register a module](/docs/infra-as-code-management/registry/module-registry) for the flow that all customers can follow today.
:::

### What will you learn?

- **Module setup:** Module name, provider, Git connector, repository, **storage type (Artifact or Git reference)**, and optional tag pattern.
- **Module onboarding:** How to connect an onboarding pipeline and complete the first sync so versions appear in the registry.
- **Auto-sync:** How to keep new tags onboarded automatically via a webhook trigger (optional).

## Prerequisites

- **Harness account with IaCM enabled:** Ensure the IaCM module is enabled in your account. If you don't see IaCM in the left navigation, see [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).
- **Git repository:** A repository containing your OpenTofu or Terraform module, accessible via a configured Harness connector.
- **Pipeline permissions:** Permission to create and run pipelines in the target Harness project. You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these permissions, an administrator must assign you a role that includes them (for example, Project Admin or a custom role). See [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles).

## Configure module details

The following steps configure the module name, provider, connector, repository, storage type, and tag pattern in the first part of the **New Module** wizard.

### Step 1: Navigate to the Module Registry

1. In the Harness left navigation, select **Infrastructure as Code Management**.
2. Select **Module Registry**.
3. Select **New Module**.

### Step 2: Configure module details

1. Enter a **Module Name**. This is the identifier used when referencing the module in OpenTofu or Terraform.
2. Enter the **Module Provider** (for example, aws, gcp, or azurerm).
3. Select the **Git Connector** that has access to your module repository.
4. Select the **Repository** from the dropdown. Available repositories are populated based on the selected connector.
5. Optionally, enter a **Folder Path** if your module is not at the root of the repository.
6. Select the **Git Fetch Type** (defaults to Latest from Branch).
7. Select or enter the **Repository Branch**.

### Step 3: Choose storage type (Artifact or Git reference)

1. Expand the **Advanced** section.
2. Under **Storage Type**, select **Artifact** or **Git reference**.

:::info Artifact vs Git reference
- **Artifact:** Harness packages each module version as a ZIP file and stores it on the IaCM server. Workspace executions fetch the artifact directly; no Git credentials are required at runtime.
- **Git reference:** The original V1 behavior. Harness fetches module metadata directly from Git on each execution. Git credentials must be available in all workspaces that use the module.

Use **Artifact** for new modules unless you have a specific reason to retain Git reference behavior.
:::

3. In the same **Advanced** section, optionally enter a **Git Tag Pattern** to filter which tags are onboarded. The pattern uses wildcard-style matching (for example, `module-name/*` for path-like tag names).

   Suppose your repository has multiple module families tagged in Git like this:

   `SQSv.1.0.0`, `SQSv.1.0.1`, `SQSv.1.0.2`, `S3v.1.0.0`, `S3v.1.0.1`

   To onboard **only** the SQS tags, set **Git Tag Pattern** to `SQSv*`. That matches every tag that starts with `SQSv` and excludes `S3v*` (and any other prefix) unless you add a broader pattern.

## Module onboarding

After you finish **Configure module details**, the module creation wizard continues with **Organization and Project**, then **Execution pipeline**. The sections below apply **regardless of storage type**—they describe how to wire the onboarding pipeline, optional auto-sync, and the first sync.

:::info Onboarding runs in a project
Even when module registry or module settings are available at the **account** level, the **onboarding pipeline still runs in a Harness project**. In **Organization and Project**, choose the project where your shared or **common** onboarding pipelines live (or where you maintain the default pipeline). The pipeline list on **Execution pipeline** is scoped to that project’s pipelines.
:::

### Connect the onboarding pipeline

The onboarding pipeline clones your module repository, detects tags, and extracts the README and metadata for each version. If you use **Artifact** storage, the pipeline also packages each version and uploads it to the IaCM server; if you use **Git reference**, it registers versions so the registry and workspaces can resolve them from Git according to your configuration.

On the **Execution pipeline** step of the wizard:

1. Select a pipeline from the list of available **Default Pipelines** or **Custom Pipelines**, or leave no selection to use the default onboarding pipeline.
2. Note that the selected **Organization** and **Project** determine which pipelines appear in this list.

:::tip Inspect or customize the pipeline
If you want to inspect or customize the onboarding pipeline before running it, create it manually first and select it here. To create a pipeline manually, go to **Infrastructure** > **Pipelines** > **Create a Pipeline** in your project; see [Harness Pipelines](/docs/category/pipelines). The pipeline must contain an IaCM stage with a module-onboarding step and the **moduleId** variable set. The module ID is displayed on the module detail page after the module has been created.
:::

### Enable auto-sync

1. At the bottom of the **Execution pipeline** step, confirm that the **Enable auto-sync** checkbox is checked. It is enabled by default.

With auto-sync enabled, Harness creates a webhook trigger on the onboarding pipeline. When a new tag is pushed to the module repository, the trigger runs the pipeline and the new version becomes available in the registry without manual action—**for both Artifact and Git reference** modules.

:::tip Manual sync
If you do not enable auto-sync, you can still trigger a sync manually by selecting the **Sync** button on the module page after creation.
:::

## Troubleshooting

<details>
<summary>Onboarding pipeline fails on clone step</summary>

**Solution:** Verify that the Git connector has read access to the module repository and that the repository name and branch are correct in the module configuration.

</details>

<details>
<summary>No module versions appear after the pipeline completes</summary>

**Solution:** Confirm that the repository has at least one Git tag. The onboarding step only processes tagged versions. Branches are not synced.

</details>

<details>
<summary>Auto-sync does not trigger on new tags</summary>

**Solution:** Check that the **Enable auto-sync** checkbox is checked and that the webhook was created successfully. Navigate to the pipeline and inspect the Triggers tab to confirm the webhook trigger is active. If the trigger shows a **Failed** status (for example, because webhook registration on the Git provider did not complete), verify that the Git connector has the necessary permissions to register webhooks on the repository. Then delete the failed trigger from the Triggers tab and re-enable auto-sync on the module page so a new trigger is created, or re-save the connector and re-enable auto-sync on the module.

</details>

## Next Steps

You've added a module using the storage type you selected. Workspaces can reference the module according to that mode (artifact fetch or Git reference).

- [Register a module](/docs/infra-as-code-management/registry/module-registry)
- [Test module versions](/docs/infra-as-code-management/registry/module-registry/module-registry-testing)
