---
title: Tofu/Terraform Plugin Commands
description: Explore how to use Tofu/Terraform commands within your pipelines effectively.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Incorporate an [OpenTofu](https://opentofu.org/) or Terraform Plugin step in your pipeline to execute specific IaC commands at designated stages. This topic provides a detailed look at the available commands within the Infrastructure as Code Management (IaCM) module. For instance, incorporating a [Provision operation](/docs/infra-as-code-management/workspaces/provision-workspace) automatically configures your pipeline with the `init`, `plan`, and `apply` commands by default.

### IaCM Supported Commands
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
</TabItem>
<TabItem value="Add a new command step">
<DocVideo src="https://app.tango.us/app/embed/732528d2-2863-4c7c-8951-12459f301c6c" title="Harness IaCM: Add an OpenTofu or Terraform command step to your pipeline" />
</TabItem>
</Tabs>

## Command Descriptions
### Initialize
The `init` command prepares a working directory containing IaC configuration files, performing key functions like:

- **Backend Initialization:** Sets up the backend for state management. Visit [OpenTofu backend documentation](https://opentofu.org/docs/language/settings/backends/configuration/) for more information on infrastructure initialization.
- **Provider Installation:** Downloads and installs necessary provider plugins to interact with service provider APIs.
- **Module Installation:** Downloads and sets up modules included in the configuration within the `.terraform` directory.
---

### Plan
The `plan` command creates an execution plan to preview the actions OpenTofu/Terraform will take to align the infrastructure with the specified configuration. This includes:
- **State Refresh**: Updates the state file with the latest data from the managed infrastructure.
- **Configuration Comparison**: Analyzes current versus desired states to identify necessary changes.
- **Change Proposal**: Lists the actions that `apply` will execute to reach the desired state.

Harness IaCM supports resource targeting and replacement, allowing you to specify which resources to focus on during a plan operation. You can use environment variable prefixes to define these targets or replacements:
- `PLUGIN_PLAN_TARGET_`
- `PLUGIN_PLAN_REPLACE_`

For example, set `PLUGIN_PLAN_TARGET_1=tfcode.bucket1` to target a specific resource.

---

### Apply
The `apply` command executes the proposed plan to modify the infrastructure state:
- **Executing Plan**: Implements the changes outlined in the plan to modify resource states.
- **State Update**: Updates the state file to reflect the new status of the infrastructure.
---

### Destroy
The `destroy` command removes all resources managed by OpenTofu/Terraform:
- **Resource Removal**: Identifies and eliminates all managed resources, respecting their interdependencies.
---

### Plan & Destroy
The `plan-destroy` command prepares a plan for dismantling infrastructure, outlining:
- **Destruction Overview**: Highlights which resources will be removed if the plan is executed.
---

### Plan - Refresh Only
The `plan-refresh-only` command focuses on updating the state file to mirror real-time data without altering the infrastructure:
- **State Refresh**: Updates the state file with the current infrastructure status.

:::tip use case
In scenarios where drift is detected, but there are unreviewed changes pending in your configuration code, the `plan-refresh-only` step is ideal. It refreshes the state to reconcile drift without applying any pending code updates, ensuring only the manual changes are addressed. Go to [Drift Detection](/docs/infra-as-code-management/pipelines/operations/drift-detection#handle-drift) to see a specific example.
:::
---

### Apply - Refresh Only
The `apply-refresh-only` applies a state update without changing the infrastructure:
- **Immediate State Update**: Refreshes the state file to ensure it accurately reflects the current infrastructure conditions.
---

### Detect Drift
The `detect-drift` command is a built-in operation that compares the real infrastructure with your OpenTofu/Terraform state and highlights any discrepancies. While not an official Tofu/Terraform command, this step uses `plan` under the hood with specific flags to perform drift detection.

This is useful for detecting infrastructure changes made outside IaC, such as resources added manually via a cloud console.

:::tip Example use case
Suppose your IaC configuration provisions an SQS queue. Later, someone manually creates an EC2 instance in the same environment. When `detect-drift` is run, Harness identifies the EC2 instance as drift and fails the pipeline. You can then:
- Import the EC2 instance into your state.
- Delete it if it's unintended.
- Ignore it if it's intentionally unmanaged.
:::

Drift detection is typically used in scheduled pipelines or as a safeguard before provisioning operations.

To learn more, including a full YAML example, visit the [Drift Detection documentation](/docs/infra-as-code-management/pipelines/operations/drift-detection).

---

### Import
The `import` command allows you to bring existing infrastructure under IaC control. This feature is now supported in Harness pipelines, similar to the `init` or `plan` commands. Key benefits include:

- **Seamless Integration:** Supports the `import` command, so users don't need to execute it manually outside of Harness.
- **Infrastructure Management:** Allows you to bring existing infrastructure under the control of IaC.

#### Example Usage:
Suppose you have an existing AWS S3 bucket that you want to manage using IaC. You can use the import command as follows:

```hcl
import aws_s3_bucket.my_bucket my-existing-bucket
```

In this example, `aws_s3_bucket.my_bucket` is the resource name in your IaC configuration, and `my-existing-bucket` is the identifier of the existing S3 bucket in AWS. The import command associates the existing bucket with your IaC configuration, allowing you to manage it as part of your infrastructure code. This process effectively transitions the resource under IaC management without altering its current state.

---

### Removed
The `removed` command allows you to remove resources from your state file, without necessarily destroying them. This feature is now supported in Harness pipelines, similar to the `init` or `plan` commands. Key benefits include:

- **Seamless Integration:** Supports the `removed` command, so users don't need to execute it manually outside of Harness.
- **Infrastructure Management:** Allows you to remove resources from your state file, without necessarily destroying them.

#### Example Usage:
Suppose you have an existing AWS EC2 instance that you want to remove from your state file. You can use the removed command as follows:

```hcl
removed {
  from = aws_instance.<instance_name>
  lifecycle {
    destroy = false
  }
}
```

In this example, `aws_instance.<instance_name>` is the resource name in your IaC configuration. The removed command removes the resource from your state file, without destroying it. 

---

### Validate
The `validate` command checks the configuration for errors:
- **Syntax Checks**: Ensures all configuration files are syntactically correct.
- **Consistency Checks**: Confirms all configurations are internally consistent with no unresolved references or missing mandatory arguments.
---

