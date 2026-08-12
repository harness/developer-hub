---
title: Register a Module
description: Register an OpenTofu or Terraform module in the Harness IaCM Module Registry using the onboarding pipeline flow, including storage type selection, auto-sync, and org/project scoping.
sidebar_position: 50
sidebar_label: Register a Module
keywords:
  - IaCM
  - Module Registry
  - register module
  - onboarding pipeline
  - auto-sync
  - artifact storage
  - OpenTofu
  - Terraform
tags:
  - IaCM
  - registry
redirect_from: /docs/infra-as-code-management/iacm-features/module-registry/module-registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

:::info Module Registry 2.0 Beta
The onboarding pipeline flow, Artifact storage, auto-sync, and org/project-scoped modules are in beta. Contact [Harness Support](mailto:support@harness.io) to enable these features. Go to [Module Artifacts](/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts) for a detailed explanation of how artifact storage and the onboarding pipeline work.
:::

Registering a module connects a Git repository to the Module Registry and makes its tagged versions available for consumption. During registration, you configure the module's repository, storage type, scope, and onboarding pipeline.

You can register a module through the **Add New Module** wizard or the `harness_platform_infra_module` Terraform resource.

---

## Before you begin

- **Git tag**: A module version is a Git tag. Create a tag or release on your module's repository before you register, otherwise there are no versions for the registry to pick up. Go to [Tags](/docs/code-repository/work-in-repos/tag/) to tag with Harness Code Repository.
- **Module structure**: Your repository must follow the expected layout. Go to [Set Up a Module](/docs/infra-as-code-management/registry/module-registry/module-structure) to prepare the repository.
- **Pipeline permissions**: You need **View**, **Create/Edit**, and **Execute** permissions on Pipelines in the target project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Git authentication**: Your Git connector must be able to access the module repository. This is separate from the `TF_TOKEN_app_harness_io` authentication used when a workspace consumes the registered module at runtime. Go to [Use a Module](/docs/infra-as-code-management/registry/module-registry/registered-module-settings#use-a-module) to configure runtime authentication.

:::note Delegate version
If you connect to your code repository through a [delegate](/docs/platform/delegates/delegate-concepts/delegate-overview/), ensure the delegate version is `25.01.85000` or later.
:::

---

## Understand module tags and versions

The Module Registry uses three different tag-related concepts. Only Git tags represent module versions.

| Term | What it is |
| --- | --- |
| **Tags** field on the module | Optional organizational labels inside Harness for search and filtering. These are not versions. |
| **Git Tag Pattern** field | A wildcard filter (for example, `SQSv*`) that limits which Git tags become module versions. |
| Git tags in the repository | The actual Git tags that correspond to module versions. |

For example, if your repository has tags `SQSv.1.0.0`, `SQSv.1.0.1`, `S3v.1.0.0`, and `S3v.1.0.1`, set **Git Tag Pattern** to `SQSv*` to onboard only the SQS module versions.

---

## Module scopes

You can register a module at the **account**, **organization**, or **project** scope. The scope controls where the module is visible and who can consume it.

| Scope | Visibility |
| --- | --- |
| Account | Available to all organizations and projects in the account. |
| Organization | Available to all projects within the selected organization. |
| Project | Available only within the selected project. |

Regardless of module scope, the onboarding pipeline always runs inside a Harness project. Select the org and project in Step 2 of the wizard where your shared onboarding pipelines live.

---

## Register a module

Registration is a three-step wizard titled **Add New Module**. You can also register using the Terraform/OpenTofu provider.

<Tabs>
<TabItem value="step-by-step" label="Step-by-step">

### Step 1: Module details

1. In the Harness left navigation, select **Infrastructure as Code Management**, then select **Module Registry**.
2. Click **New Module**.
3. Under **Basic information**, configure the module identity:
   - In the **Name** field, enter a module name. This identifier is used when referencing the module in OpenTofu or Terraform configurations.
   - In the **Provider** field, enter the provider name (for example, `aws`, `gcp`, or `azurerm`).
   - Optionally, select the **Edit** icon next to **Description** to add a description.
   - Optionally, select the **Edit** icon next to **Tags** to add organizational labels for search and filtering. Tags are not version identifiers.
4. Under **Repository**, configure the source:
   - For **Select Git Provider**, select **Harness Code Repository** or **Third-party Git provider**.
   - From the **Git Connector** dropdown, select the connector that has read access to your module repository.
   - From the **Git Fetch Type** dropdown, select how Harness retrieves the module. The default is **Latest from Branch**.
   - From the **Git Branch** dropdown, select or enter the target branch.
   - Optionally, in the **Folder Path** field, enter the path to your module if it is not at the repository root. Go to [Register a module from a subdirectory](#register-a-module-from-a-subdirectory) for details.
5. Select **Advanced** to expand storage options, then configure:
   - Under **Storage type**, select **Artifact** (recommended) or **Git reference**. Artifact is preselected.

     | Storage type | How it works | When to use |
     | --- | --- | --- |
     | **Artifact** (recommended) | Packages each version as a ZIP artifact on the IaCM server. No Git credentials are needed at workspace runtime. | Use for all new modules. |
     | **Git reference** (legacy) | Links directly to a specific Git tag in your repository. Workspaces retrieve the module from Git during execution and require Git credentials at runtime. | Only if you have a specific reason to retain legacy behavior. This flow is being deprecated. |

     :::warning Git reference constraint
     Git reference is supported only when a single Git connector is consistently used across all modules in the registry.
     :::

   - Optionally, in the **Git Tag Pattern** field, enter a wildcard filter to limit which Git tags become module versions (for example, `SQSv*`). Go to [Understand module tags and versions](#understand-module-tags-and-versions) for details.
6. Click **Next**.

### Step 2: Organization and Project

1. From the **Organization** dropdown, select the organization where the onboarding pipeline will run.
2. From the **Project** dropdown, select the project.

:::info Onboarding runs in a project
Even when a module is registered at account or org scope, the onboarding pipeline runs inside a Harness project. Harness recommends keeping onboarding pipelines in a dedicated project, separate from your working workspaces.
:::

3. Click **Next**.

### Step 3: Execution pipeline

The execution pipeline fetches your module's metadata from Git and populates the registry. Each time you push a new matching Git tag, the pipeline runs and the new version appears in the Module Registry.

1. From the pipeline list, select a pipeline to fetch module metadata:
   - **Default Pipelines** lists the auto-generated onboarding pipeline (`iacm_auto_generated_onboarding_pipeline`). Select it if you do not need a custom onboarding flow.
   - **Custom Pipelines** lists any pipelines already in the selected project. Select a custom pipeline if you need a modified onboarding flow.
   - If no pipeline exists in the selected project, Harness creates `iacm_auto_generated_onboarding_pipeline` automatically when you click **Create**.
2. Confirm the **Enable auto-sync** checkbox is selected. When enabled, Harness creates a webhook trigger on the selected pipeline so each new matching Git tag triggers a sync automatically, without manual re-registration. 

    If you do not enable auto-sync, you can trigger a sync manually by clicking the **Sync** button on the module page at any time.

3. Click **Create**.

:::note Customize the onboarding pipeline
To inspect or customize the pipeline before running it, create it manually first in **Infrastructure > Pipelines > Create a Pipeline**, then select it here. The pipeline must contain an IaCM stage with a `module-onboarding` step and the `moduleId` variable set. The module ID appears on the module detail page after the module is created.
:::

</TabItem>
<TabItem value="interactive" label="Interactive guide" default>

<div style={{position: 'relative', paddingBottom: 'calc(62.7315% + 41px)', height: '0px', width: '100%'}}>
  <iframe
    src="https://demo.arcade.software/f1PBSt1bwI4Qq8bl0E68?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
    title="Add a New Module to the IaCM Registry"
    frameBorder="0"
    loading="lazy"
    allowFullScreen
    allow="clipboard-write; autoplay"
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light'}}
  />
</div>

</TabItem>
<TabItem value="terraform" label="Terraform/OpenTofu provider">

Register a module with the `harness_platform_infra_module` resource. The `repository` field is the repository **name only**, not a URL.

```hcl
resource "harness_platform_infra_module" "example" {
  name        = "my-module"
  description = "Example module"
  system      = "aws"  # the provider

  # Repository name only, not a URL
  repository           = "tf-aws-vpc"
  repository_branch    = "main"
  repository_path      = "modules/network"  # optional; re-roots resolution
  repository_connector = "account.mygithub"

  # Onboarding pipeline (Module Artifacts flow)
  onboarding_pipeline         = "iacm_auto_generated_onboarding_pipeline"
  onboarding_pipeline_org     = "default"
  onboarding_pipeline_project = "IaCM_Project"
  onboarding_pipeline_sync    = true  # enable auto-sync
}
```

:::warning Repository field format
The `repository` field must be the repository **name only**, not a full URL. Entering a full URL causes registration to fail.
:::

**Bootstrap the onboarding pipeline first.** The pipeline must already exist before Terraform can reference it. Create it one of two ways:

- **Register one module through the UI first.** The Add New Module wizard creates `iacm_auto_generated_onboarding_pipeline` automatically. All subsequent Terraform registrations can point to it.
- **Create it via the onboarding API**:

```bash
curl -X POST \
  'https://app.harness.io/gateway/iacm/api/modules/pipeline/onboarding' \
  -H 'Harness-Account: ACCOUNT_ID' \
  -H 'x-api-key: HARNESS_PAT' \
  -H 'Content-Type: application/json' \
  -d '{ "org": "default", "project": "my_project" }'
```

</TabItem>
</Tabs>

---

## Register a module from a subdirectory {#register-a-module-from-a-subdirectory}

By default, the registry expects the root module (`main.tf`) at the repository root and submodules inside a `modules/` folder. If your module does not sit at the repository root, for example in a monorepo holding multiple modules, set the **Folder Path** field when you register it. **Folder Path** maps to the `repository_path` argument on the `harness_platform_infra_module` Terraform resource.

Setting **Folder Path** re-roots all resolution, including where the registry looks for the `modules/` folder, so submodules are discovered relative to the path you set.

**Example**: Root module lives in `terraform/infrastructure`:

```
.
├── README.md
└── terraform/
    └── infrastructure/
        ├── main.tf
        ├── variables.tf
        ├── outputs.tf
        └── modules/
            └── submoduleA/
                └── main.tf
```

Set **Folder Path** during registration:

1. In the **New Module** wizard, configure the module name, provider, connector, and repository.
2. In the **Folder Path** field, enter the path from the repository root to the directory containing the root module, for example `terraform/infrastructure`.
3. Complete the remaining fields and click **Create**.

Or set the equivalent `repository_path` argument in Terraform:

```hcl
resource "harness_platform_infra_module" "example" {
  name                 = "my-module"
  system               = "aws"
  repository           = "tf-aws-vpc"
  repository_branch    = "main"
  repository_path      = "terraform/infrastructure"
  repository_connector = "account.mygithub"
}
```

:::info Submodules not appearing?
Confirm that **Folder Path** points at the directory containing `main.tf` and that submodules sit in a `modules/` folder directly under that path. Metadata collection is one level deep, so deeply nested submodules are not surfaced even though they remain usable through the `//` subpath syntax.
:::

---

## Troubleshooting

<Troubleshoot
  issue="Onboarding pipeline fails on the clone step in Harness IaCM Module Registry"
  mode="general"
  fallback="Verify that the Git connector has read access to the module repository and that the repository name and branch are correct in the module configuration."
/>

<Troubleshoot
  issue="No module versions appear after the onboarding pipeline completes in Harness IaCM"
  mode="general"
  fallback="Confirm that the repository has at least one matching Git tag. The onboarding pipeline processes tagged versions; branches are not synced."
/>

<Troubleshoot
  issue="Auto-sync does not trigger on new tags in Harness IaCM Module Registry"
  mode="general"
  fallback="Confirm that Enable auto-sync is selected and that the webhook was created successfully. Select the pipeline's Triggers tab to verify the trigger is active. If it shows a Failed status, verify that the Git connector has permissions to register webhooks on the repository, then delete the failed trigger and re-enable auto-sync."
/>

---

## Next steps

- Go to [Explore Module Details](/docs/infra-as-code-management/registry/module-registry/registered-module-settings) to review your registered module's parsed metadata and published versions.
- Go to [Use a Module](/docs/infra-as-code-management/registry/module-registry/registered-module-settings#use-a-module) to reference the registered module from an OpenTofu or Terraform configuration.
- Go to [Test a Module](/docs/infra-as-code-management/registry/module-registry/module-registry-testing) to set up automated module testing.
