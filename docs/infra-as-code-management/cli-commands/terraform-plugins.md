---
title: Tofu/Terraform Plugin Commands
sidebar_label: Tofu/Terraform Plugin Commands
description: Explore how to use Tofu/Terraform commands within your pipelines effectively.
keywords:
  - terraform
  - tofu
  - iacm
  - opentofu
  - terraform plan
  - terraform apply
  - drift detection
  - terraform commands
tags:
  - iacm
  - terraform
sidebar_position: 10
redirect_from:
  - /docs/infra-as-code-management/pipelines/terraform-plugins
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Incorporate an [OpenTofu](https://opentofu.org/) or Terraform Plugin step in your pipeline to execute specific Infrastructure as Code (IaC) commands at designated stages. This topic provides a detailed look at the available commands within the Infrastructure as Code Management (IaCM) module.

When you create a [Provision operation](/docs/infra-as-code-management/workspaces/provision-workspace), Harness automatically configures your pipeline with the `init`, `plan`, and `apply` commands by default. You can also add individual command steps manually to customize your pipeline flow, validate configurations, detect drift, or manage existing infrastructure.

---

## What you will learn

- **Command execution flow:** How `init`, `plan`, and `apply` run in sequence during provisioning operations.
- **Resource targeting and replacement:** When and how to use the `target` and `replace` parameters to focus on specific resources.
- **Drift detection vs refresh:** The difference between detecting infrastructure drift and refreshing state files.
- **Bringing existing resources under IaC:** How the `import` and `removed` commands manage pre-existing infrastructure.
- **Enforcing code quality:** Using `validate` and `fmt` to catch errors and maintain consistent style.

---

## Supported commands

<Tabs>
<TabItem value="Supported commands">
The supported commands include:
- [init](#initialize)
- [plan](#plan)
- [apply](#apply)
- [destroy](#destroy)
- [plan-destroy](#plan--destroy)
- [plan-refresh-only](#plan---refresh-only)
- [apply-refresh-only](#apply---refresh-only)
- [detect-drift](#detect-drift)
- [import](#import)
- [removed](#removed)
- [validate](#validate)
- [fmt](#fmt)
</TabItem>
<TabItem value="Add a new command step">
<DocVideo src="https://app.tango.us/app/embed/732528d2-2863-4c7c-8951-12459f301c6c?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=true&skipBranding=false&skipCover=true" title="Add an OpenTofu or Terraform command step to your pipeline" />
</TabItem>
</Tabs>

:::info Required permissions
To execute Terraform/Tofu commands in pipelines, you need:
- **Execute** permission on the pipeline
- **Edit** permission on the IaCM workspace (for state-modifying commands like apply, destroy)
- **View** permission is sufficient for read-only commands (plan, validate, fmt)

Go to [Workspace permissions (RBAC)](/docs/infra-as-code-management/workspaces/workspace-rbac) to configure roles.
:::

:::note Supported versions
Harness IaCM supports OpenTofu 1.6+ and Terraform 1.0+. Some commands (like `removed`) require OpenTofu 1.7+ or Terraform 1.7+. Go to [Create a workspace](/docs/infra-as-code-management/workspaces/create-workspace) to specify your provisioner version.
:::

---

## Command descriptions

---

### Initialize
The `init` command prepares a working directory containing IaC configuration files, performing key functions like:

- **Backend initialization:** Sets up the backend (remote storage for your Terraform state file) for state management. Go to [OpenTofu backend documentation](https://opentofu.org/docs/language/settings/backends/configuration/) to learn how backends manage state during initialization.
- **Provider installation:** Downloads and installs necessary provider plugins to interact with service provider APIs. Harness workspaces use connectors to authenticate with cloud providers. Go to [Cloud provider connectors](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference) to configure access.
- **Module installation:** Downloads and sets up modules included in the configuration within the `.terraform` directory.

---

### Plan
The `plan` command creates an execution plan to preview the actions OpenTofu/Terraform will take to align the infrastructure with the specified configuration. This includes:
- **State refresh:** Updates the state file (which tracks the current status of your managed infrastructure) with the latest data from the managed infrastructure.
- **Configuration comparison:** Analyzes current versus desired states to identify necessary changes.
- **Change proposal:** Lists the actions that `apply` will execute to reach the desired state.

**Pipeline behavior:** The `plan` step succeeds even when changes are detected — it only fails if an error occurs (invalid configuration, missing provider). Detected changes are displayed in the execution logs but do not stop the pipeline.

#### Optional configuration
Harness IaCM supports resource targeting and replacement as part of the `plan` step with the following parameters:
- `target`: Target specific resources (and their dependencies) to focus on during a `plan`, and subsequent `apply` or `destroy` operations. Set these parameters in the Terraform Plugin step's **Optional Configuration** section in the pipeline editor.
- `replace`: Replace specific resources during a `plan`, and subsequent `apply` or `destroy` operations.

For example, set `target=tfcode.bucket1` to target a specific resource.

#### Control plan flags with PLUGIN_ environment variables

The `plan` step builds its OpenTofu/Terraform command line from `PLUGIN_` prefixed environment variables, not from the standard `TF_CLI_ARGS_plan` convention. Set these as **workspace variables** or **step environment variables** to override the corresponding CLI flag:

| Environment variable | CLI flag | Default | Description |
| --- | --- | --- | --- |
| `PLUGIN_LOCK` | `-lock=` | `true` | Disable or enable state locking during the operation. |
| `PLUGIN_LOCK_TIMEOUT` | `-lock-timeout=` | unset | Duration to retry acquiring a lock before giving up. |
| `PLUGIN_PLAN_REFRESH` | `-refresh=` | `true` | Update state before planning to detect drift. Set to `false` to skip the refresh. |
| `PLUGIN_PLAN_REFRESH_ONLY` | `-refresh-only` | `false` | Plan only refreshes state and makes no infrastructure changes. |
| `PLUGIN_PLAN_REPLACE` | `-replace=` | `[]` | Force replacement of a resource by address prefix. Accepts multiple prefixes. |
| `PLUGIN_PLAN_TARGET` | `-target=` | `[]` | Limit the plan to specific resources by address prefix. Accepts multiple prefixes. |
| `PLUGIN_PLAN_DESTROY` | `-destroy` | `false` | Generate a plan to destroy all managed resources. |
| `PLUGIN_OUT` | `-out=` | unset | Path to save the generated plan file. |
| `PLUGIN_STATE` | `-state=` | unset | Path to a Terraform state file to use for the plan. |
| `PLUGIN_ALLOW_DEFERRAL` | `-allow-deferral` | unset | Allow deferred changes in the plan output. |

The `target` and `replace` optional configuration parameters described above set `PLUGIN_PLAN_TARGET` and `PLUGIN_PLAN_REPLACE` respectively.

:::warning TF_CLI_ARGS_plan has no effect on this step
The `plan` step does not read `TF_CLI_ARGS_plan` or any other `TF_CLI_ARGS_*` variable except `TF_CLI_ARGS_fmt` (see [Fmt](#fmt)). Setting `TF_CLI_ARGS_plan` is silently ignored, the step still runs with its default flags. Use the `PLUGIN_` prefixed variable from the table above instead, for example `PLUGIN_PLAN_REFRESH=false` to disable the state refresh.
:::

:::info target use case
Suppose you want to run multiple pipelines in sequence, each targeting a different resource. In this case, you can use the `target` parameter to specify which resource each pipeline should focus on.

When the `apply` or `destroy` step is executed, it will only apply the changes to the resources specified in the `target` parameter, without affecting other resources.
:::

---

### Apply
The `apply` command executes the proposed plan to modify the infrastructure state:
- **Executing plan:** Implements the changes outlined in the plan to modify resource states.
- **State update:** Updates the state file to reflect the new status of the infrastructure.

---

### Destroy
The `destroy` command removes all resources managed by OpenTofu/Terraform:
- **Resource removal:** Identifies and eliminates all managed resources, respecting their interdependencies.

---

### Plan & Destroy
The `plan-destroy` command prepares a plan for dismantling infrastructure, outlining:
- **Destruction overview:** Highlights which resources will be removed if the plan is executed.

---

### Plan - Refresh only
The `plan-refresh-only` command focuses on updating the state file to mirror real-time data without altering the infrastructure:
- **State refresh:** Updates the state file with the current infrastructure status.

:::tip use case
In scenarios where drift is detected, but there are unreviewed changes pending in your configuration code, the `plan-refresh-only` step is ideal. It refreshes the state to reconcile drift without applying any pending code updates, ensuring only the manual changes are addressed. Go to [Drift Detection](/docs/infra-as-code-management/pipelines/operations/drift-detection#handle-drift) to see a specific example.
:::

---

### Apply - Refresh only
The `apply-refresh-only` applies a state update without changing the infrastructure:
- **Immediate state update:** Refreshes the state file to ensure it accurately reflects the current infrastructure conditions.

---

### Detect drift
The `detect-drift` command is a built-in operation that compares the real infrastructure with your OpenTofu/Terraform state and highlights any discrepancies (known as drift). While not an official Tofu/Terraform command, this step uses `plan` under the hood with specific flags to perform drift detection.

This is useful for detecting infrastructure changes made outside IaC, such as resources added manually via a cloud console.

:::tip Example use case
Suppose your IaC configuration provisions an SQS queue. Later, someone manually creates an EC2 instance in the same environment. When `detect-drift` is run, Harness identifies the EC2 instance as drift and fails the pipeline. You can then:
- Import the EC2 instance into your state.
- Delete it if it's unintended.
- Ignore it if it's intentionally unmanaged.
:::

Drift detection is typically used in scheduled pipelines or as a safeguard before provisioning operations.

Go to [Drift Detection](/docs/infra-as-code-management/pipelines/operations/drift-detection) to see a full YAML example.

---

### Import
The `import` command allows you to bring existing infrastructure under IaC control. This feature is now supported in Harness pipelines, similar to the `init` or `plan` commands. Key benefits include:

- **Seamless integration:** Supports the `import` command, so users do not need to execute it manually outside of Harness.
- **Infrastructure management:** Allows you to bring existing infrastructure under the control of IaC.

#### Example usage
Suppose you have an existing AWS S3 bucket that you want to manage using IaC. You can use the import command as follows:

```hcl
import aws_s3_bucket.my_bucket my-existing-bucket
```

In this example, `aws_s3_bucket.my_bucket` is the resource name in your IaC configuration, and `my-existing-bucket` is the identifier of the existing S3 bucket in AWS. The import command associates the existing bucket with your IaC configuration, allowing you to manage it as part of your infrastructure code. This process effectively transitions the resource under IaC management without altering its current state.

---

### Removed
The `removed` command allows you to remove resources from your state file. This feature is now supported in Harness pipelines, similar to the `init` or `plan` commands. Key benefits include:

- **Seamless integration:** Supports the `removed` command, so users do not need to execute it manually outside of Harness.
- **Infrastructure management:** Allows you to remove resources from your state file.

#### Example usage
Suppose you have an existing AWS EC2 instance that you want to remove from your state file. You can use the removed command as follows:

```hcl
removed {
  from = aws_instance.<instance_name>
  lifecycle {
    destroy = false
  }
}
```

In this example, `aws_instance.<instance_name>` is the resource name in your IaC configuration. The `lifecycle { destroy = false }` block ensures that the resource is only removed from the state file and is not destroyed in your actual infrastructure. Without the `lifecycle` block or when `destroy = true` is set, the `removed` block can destroy resources. The example above explicitly preserves the infrastructure by setting `destroy = false`.

---

### Validate
The `validate` command checks the configuration for errors:
- **Syntax checks:** Ensures all configuration files are syntactically correct.
- **Consistency checks:** Confirms all configurations are internally consistent with no unresolved references or missing mandatory arguments.

**Pipeline behavior:** The `validate` step fails the pipeline if syntax errors or consistency issues are found, preventing invalid configurations from proceeding to `plan` or `apply`.

---

### Fmt
The `fmt` command rewrites OpenTofu/Terraform configuration files to a canonical format and style:
- **Format application:** Applies consistent indentation, spacing, and alignment across all `.tf` and `.tfvars` files in the working directory.
- **Style enforcement:** Ensures configuration files conform to the standard style conventions, making them easier to read and review.

By default, `fmt` rewrites files in place and exits with a zero status code whether or not changes were made, so a plain `fmt` step will not fail the pipeline on unformatted code.

**Pipeline behavior:** By default, `fmt` always succeeds (exit code 0) even if files are reformatted. To fail the pipeline when unformatted code is detected, set the `TF_CLI_ARGS_fmt` pipeline variable to `-check`. With this flag, `fmt` exits with a non-zero code if any files require reformatting, causing the step to fail. Go to [Pipeline variables](/docs/platform/variables-and-expressions/add-a-variable) to configure this.

---

## Related concepts

Now that you understand IaC commands in Harness pipelines, explore how to apply them:

- [Create a provisioning pipeline](/docs/infra-as-code-management/pipelines/default-pipelines): Step-by-step guide to building a pipeline with these commands.
- [Create a workspace](/docs/infra-as-code-management/workspaces/create-workspace): Learn how workspaces use these commands during provisioning.
- [Drift detection and remediation](/docs/infra-as-code-management/pipelines/operations/drift-detection): Use detect-drift in scheduled pipelines to catch manual changes.
- [Harness cloud provider connectors](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference): Configure authentication for Terraform providers.
