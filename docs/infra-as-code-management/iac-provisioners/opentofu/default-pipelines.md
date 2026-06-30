---
title: Default pipelines for OpenTofu
sidebar_label: Default Pipelines
description: Configure and run default pipelines for OpenTofu workspaces in Harness IaCM.
sidebar_position: 50
keywords:
  - opentofu
  - default pipelines
  - iacm
  - tofu
tags:
  - iacm
  - opentofu
---

import HarnessApiData from '@site/src/components/HarnessApiData';

Default pipelines provide a streamlined way to run common OpenTofu operations across your workspaces. When you assign a pipeline to an OpenTofu workspace, Harness automatically uses the `tofu` binary with the OpenTofu version pinned to your workspace configuration. The four default pipeline types are Plan, Provision, Detect Drift, and Destroy.

Pipelines using the `IACMTerraformPlugin` step type are provisioner-agnostic and work with both OpenTofu and Terraform workspaces. You can assign these pipelines at the project level so every OpenTofu workspace inherits them, or override them at the workspace level for specialized requirements.

---

## What you will learn

- How pipeline compatibility works with OpenTofu workspaces
- The four default pipeline types and what each one does for OpenTofu workspaces
- How OpenTofu version pinning works with default pipelines
- When to override default pipelines at the workspace level

---

## Pipeline compatibility with OpenTofu workspaces

When configuring default pipelines in **Project Settings > IaCM Defaults**, assign pipelines that are compatible with your workspace provisioner.

OpenTofu plugin steps (`IACMOpenTofuPlugin`) are provisioner-agnostic and can be used with both OpenTofu and Terraform workspaces. If your pipeline includes OpenTofu-specific functionality, configure it with the appropriate OpenTofu plugin steps.

You can assign default pipelines at the project level or override them for individual workspaces. Go to [Default Pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to learn how to configure and assign default pipelines.

---

## Default pipeline types

Harness IaCM provides four default pipeline types for OpenTofu workspaces. Each pipeline is pre-configured with the appropriate OpenTofu plugin commands.

- **Plan:** Runs `tofu init` and `tofu plan` to preview infrastructure changes without applying them. This pipeline is useful for reviewing what OpenTofu will do before committing to changes.
- **Provision:** Runs the full provisioning workflow with `tofu init`, `tofu plan`, an approval step, and `tofu apply`. This pipeline is the primary way to create or update infrastructure managed by OpenTofu.
- **Detect Drift:** Runs the OpenTofu plugin to identify infrastructure drift (changes made outside of OpenTofu). This pipeline is typically scheduled to run periodically to catch manual changes.
- **Destroy:** Runs `tofu init`, `tofu plan -destroy`, an approval step, and `tofu destroy` to remove all infrastructure managed by the workspace. This pipeline is irreversible.

:::danger Destroy is irreversible
The Destroy pipeline removes all infrastructure resources managed by your OpenTofu workspace. This action cannot be undone. To prevent accidental execution, the Destroy pipeline is located in the workspace **Configuration** tab under **Danger Zone**.
:::

Go to [Default Pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to learn how to configure default pipelines at the project level and override them at the workspace level.

---

## OpenTofu version behavior

When an OpenTofu workspace runs a compatible pipeline, Harness uses the OpenTofu version configured for that workspace. When you create or edit a workspace, you select an OpenTofu version. All pipeline runs for that workspace will use the selected version when executing `tofu` commands.

If you update the OpenTofu version in your workspace configuration, subsequent pipeline runs will use the new version. Harness manages the OpenTofu binary installation automatically based on the version you select.

Go to [What is supported](/docs/infra-as-code-management/whats-supported) to review the OpenTofu versions supported by Harness IaCM.

---

## Related concepts

- [Default Pipelines](/docs/infra-as-code-management/pipelines/default-pipelines): Full configuration steps for setting up default pipelines at the project and workspace levels.
- [OpenTofu plugin commands](/docs/infra-as-code-management/iac-provisioners/opentofu/plugin-commands): Reference for all OpenTofu commands available in Harness pipelines.
- [Create a workspace](/docs/infra-as-code-management/workspaces/create-workspace): Learn how to create OpenTofu workspaces and select the OpenTofu version.
