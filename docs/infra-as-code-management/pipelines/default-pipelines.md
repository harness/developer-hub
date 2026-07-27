---
title: Default Pipelines
description: Learn how to use Harness IaCM default pipelines
keywords:
  - default pipelines
  - iacm pipelines
  - project defaults
  - workspace defaults
  - infrastructure as code
tags:
  - iacm
  - pipelines
sidebar_position: 20
redirect_from: /docs/infra-as-code-management/pipelines/operations/default-pipelines
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

IaCM Default Pipelines offer a streamlined approach to provisioning, destroying, and managing infrastructure workspaces by allowing you to run your pre-configured pipelines directly from any workspace. These pipelines can be easily created and set as defaults at the project level, providing quick and consistent access across all workspaces. This functionality ensures a seamless experience and maintains uniformity throughout your infrastructure management. 

In addition, as some workspaces may require specialized pipelines, you can overwrite the defaults at the workspace level. This will not disrupt any other workspace using the project level defaults.

:::danger danger zone
A pipeline containing the `destroy` command will remove all saved infrastructure managed by your Harness workspace.
:::

---

## Before you begin

- **IaCM permissions:** View and Create/Edit permissions for IaCM Pipelines, and Edit permissions for Project Settings to configure IaCM Defaults. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Existing pipelines:** At least one pipeline created for each operation you want to set as a default (Plan, Provision, Detect Drift, Destroy). Go to [Pipeline Operations](/docs/infra-as-code-management/pipelines/operations-overview) to add operational features to your pipelines before assigning them as defaults.

<DocVideo src="https://www.youtube.com/embed/KvdzUWs8urE" title="Harness IaCM: Default Pipelines" />

---

## Configure and run default pipelines

<Tabs>
<TabItem value="Interactive guide" label="Interactive Guide" default>
<DocVideo src="https://app.tango.us/app/embed/82d2b223-b468-4cdf-a311-be4fdf59ce6c?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Harness IaCM: Default Pipelines" />
</TabItem>
<TabItem value="Step-by-step" label="Step-by-Step">

### Set your project-level default pipelines
1. In your IaCM module, select **Project settings**, then select **IaCM Defaults**.
2. Select the appropriate pipelines for your default categories and frameworks (OpenTofu / Terraform):
   - **Plan:** Pipeline for running the plan only.
   - **Provision:** Pipeline for initializing, planning, approving, and applying changes.
   - **Detect Drift:** Pipeline for detecting drift between your configuration and provider state. 
   - **Destroy:** Pipeline for initializing, planning, approving, and destroying infrastructure.

### Review your default pipelines in your workspace
3. Select **Workspaces**, then select one of your workspaces to run your default pipelines.
4. Select the **Configuration** tab and scroll down to **Default pipelines** to inspect or override your default pipelines at the selected workspace-level (this will not affect your project level settings).

### Run your default pipelines in your workspace
5. While in your workspace, run your default pipelines against it with the `Plan`, `Provision` and `Check for Drift` buttons.

:::note execute the destroy pipeline
To prevent accidental execution, the Destroy pipeline is in your workspace’s **Configuration** tab, under **Danger Zone**.

To run it, select **Destroy workspace**.
:::

</TabItem>
</Tabs>

Review previously run pipelines by selecting your workspace and reviewing the **Execution History** tab.

---

## Next steps

You have configured default pipelines at the project level and can now run Plan, Provision, and Detect Drift operations directly from any workspace.

- Go to [Pipeline Operations](/docs/infra-as-code-management/pipelines/operations-overview) to add approval gates, drift detection, PR automation, and queue steps to your default pipelines.
- Go to [Remove and import resources](/docs/infra-as-code-management/pipelines/remove-resources) to safely remove infrastructure resources from state without destroying them.
- Go to [Custom images](/docs/infra-as-code-management/pipelines/plugin-images) to use your own Terraform or OpenTofu plugin images in your IaCM pipeline stages.
