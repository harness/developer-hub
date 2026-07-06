---
title: OpenTofu plugin commands
sidebar_label: Plugin Commands
description: Reference for all OpenTofu plugin commands available in Harness IaCM pipelines.
sidebar_position: 60
keywords:
  - opentofu
  - tofu
  - plugin commands
  - iacm
  - tofu init
  - tofu plan
  - tofu apply
tags:
  - iacm
  - opentofu
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

OpenTofu plugin steps execute the `tofu` binary during pipeline execution. When you add an OpenTofu plugin step to your pipeline, you select which command to run (init, plan, apply, and so on). The pipeline executes that command against your infrastructure code using the OpenTofu version configured in your workspace.

Each command performs a specific operation in the OpenTofu lifecycle, from initializing providers to applying infrastructure changes to validating configuration syntax.

---

## What you will learn

- The difference between the `tofu` binary used by OpenTofu and the `terraform` binary
- Network requirements for OpenTofu plugin commands
- Minimum OpenTofu version required for each command
- What each OpenTofu command does in Harness IaCM pipelines

---

## How Harness selects the binary

OpenTofu uses the `tofu` binary, not the `terraform` binary. Although the CLI commands remain the same (`init`, `plan`, `apply`, and so on), Harness executes them using either the `tofu` or `terraform` binary based on the workspace provisioner.

Harness automatically uses the correct binary based on your workspace provisioner type. If you create an OpenTofu workspace, the plugin steps use `tofu`. If you create a Terraform workspace, the plugin steps use `terraform`.

---

## Network requirements

During `tofu init`, OpenTofu downloads required providers from the OpenTofu registry and retrieves modules from the sources referenced in your configuration. Ensure delegates can reach the OpenTofu registry and any external module or provider sources your configuration uses.

For air-gapped environments where internet access is not available, you can use custom plugin images with pre-installed providers or configure a private module registry. Go to [Custom Images](/docs/infra-as-code-management/pipelines/plugin-images) to learn how to build and use custom plugin images for OpenTofu.

---

## Version requirements

Different OpenTofu commands require different minimum versions. The table below shows the minimum OpenTofu version needed for each command in Harness IaCM pipelines.

| Command | Minimum OpenTofu version |
|---------|--------------------------|
| init | 1.6+ |
| plan | 1.6+ |
| apply | 1.6+ |
| destroy | 1.6+ |
| plan-destroy | 1.6+ |
| plan-refresh-only | 1.6+ |
| apply-refresh-only | 1.6+ |
| detect-drift | 1.6+ |
| validate | 1.6+ |
| fmt | 1.6+ |
| import (block syntax) | 1.6+ |
| removed (block syntax) | 1.7+ |

The `import` block syntax is available in OpenTofu 1.6 and later. The `removed` block syntax was introduced in OpenTofu 1.7. Harness IaCM generally supports the most recent OpenTofu minor versions. Go to [What is supported](/docs/infra-as-code-management/whats-supported) to review the currently supported versions.

---

## Available commands

### init

The `init` command prepares your working directory by downloading providers, initializing the backend, and installing modules. This command must run before any other OpenTofu command in your pipeline.

Go to [OpenTofu init documentation](https://opentofu.org/docs/cli/commands/init/) to understand how initialization works.

---

### plan

The `plan` command creates an execution plan showing what infrastructure changes OpenTofu will make. It compares your configuration files to the current state and displays additions, modifications, and deletions. The plan does not make any changes to real infrastructure.

Go to [OpenTofu plan documentation](https://opentofu.org/docs/cli/commands/plan/) to learn about plan options and output.

---

### apply

In Harness pipelines, the `apply` command executes the changes proposed in the plan. It creates, updates, or deletes infrastructure resources to match your configuration. After apply completes, OpenTofu updates the state file to reflect the new infrastructure state.

Go to [OpenTofu apply documentation](https://opentofu.org/docs/cli/commands/apply/) to understand apply behavior.

---

### destroy

When used in an OpenTofu plugin step, the `destroy` command removes all infrastructure resources managed by OpenTofu for the workspace. This is the opposite of apply. Destroy respects resource dependencies and removes resources in the correct order.

Go to [OpenTofu destroy documentation](https://opentofu.org/docs/cli/commands/destroy/) to learn about destruction order and safeguards.

---

### plan-destroy

The `plan-destroy` command shows what resources will be removed if you run destroy, without actually removing them. This is useful for reviewing the impact of a destroy operation before committing to it.

---

### plan-refresh-only

The `plan-refresh-only` command updates the state file to match the current state of real infrastructure without making any changes. This is useful when infrastructure has drifted (been modified outside OpenTofu) and you want to reconcile the state file without applying code changes. This operation refreshes state only. It does not create, modify, or delete infrastructure resources.

---

### apply-refresh-only

The `apply-refresh-only` command updates the state file to match the current infrastructure without modifying infrastructure resources. It applies the state refresh identified during a `plan-refresh-only` operation. No infrastructure resources are created, updated, or destroyed.

---

### detect-drift

The `detect-drift` command is a Harness-specific operation that compares the real infrastructure with the infrastructure recorded in the OpenTofu state. The command reports infrastructure drift by comparing the current infrastructure with the recorded state. Drift occurs when resources are modified outside OpenTofu (for example, manual changes in the cloud provider console).

---

### import

The `import` command brings existing infrastructure under OpenTofu management. In OpenTofu 1.6+, you use the `import` block syntax in your configuration files to declare resources to import. Harness executes the import during the plan and apply steps.

Go to [OpenTofu import documentation](https://opentofu.org/docs/cli/commands/import/) to learn about import block syntax.

---

### removed

The `removed` command removes resources from the OpenTofu state file without destroying the actual infrastructure. This is useful when you want to stop managing a resource with OpenTofu but keep the resource running in your cloud provider. The `removed` block syntax was introduced in OpenTofu 1.7.

---

### validate

The `validate` command checks your OpenTofu configuration files for syntax errors and internal consistency. It does not access remote state or contact the provider APIs. This is a fast, local-only check that catches configuration mistakes early.

Go to [OpenTofu validate documentation](https://opentofu.org/docs/cli/commands/validate/) to understand what validate checks.

---

### fmt

The `fmt` command reformats your OpenTofu configuration files to match the canonical style. It adjusts indentation, spacing, and alignment. By default, `fmt` rewrites files in place and exits successfully even if it made changes. To fail the pipeline when unformatted code is detected, set the `TF_CLI_ARGS_fmt` pipeline variable to `-check`.

Go to [OpenTofu fmt documentation](https://opentofu.org/docs/cli/commands/fmt/) to learn about formatting rules.

---

## Troubleshooting

<Troubleshoot
  issue="OpenTofu plugin command fails with binary not found error in Harness IaCM pipeline"
  mode="docs"
  fallback="Verify the workspace provisioner is set to OpenTofu and that the selected OpenTofu version is supported. If you use a custom plugin image, ensure it contains the required OpenTofu version. Go to /docs/infra-as-code-management/pipelines/plugin-images to learn about custom images."
/>

---

## Next steps

Once you are familiar with OpenTofu plugin commands and pipeline execution, you can speed up your development workflow by running plans from your local machine.

Go to [Local CLI plan for OpenTofu](/docs/infra-as-code-management/iac-provisioners/opentofu/local-cli-plan) to learn how to validate OpenTofu changes locally using the Harness CLI.
