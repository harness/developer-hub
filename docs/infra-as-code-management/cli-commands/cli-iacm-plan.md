---
title: Local CLI Plan
description: Execute the plan command against your local environment with the Harness CLI.
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Run OpenTofu/Terraform plan against your local environment.**

Building upon [Harness robust CLI capabilities](/docs/platform/automation/cli/examples/), the IaCM module introduces the `harness iacm plan` command to simplify the process of planning infrastructure changes locally Designed for developers working with local OpenTofu or Terraform files, `harness iacm plan` ensures secure execution and seamless integration with Harness pipelines.

:::info Key Features
- **Local Execution with Remote Security:** Eliminate the need for storing secrets locally. The `harness iacm plan` command uses secrets securely stored in the associated Harness workspace, combining the convenience of local development with enterprise-grade security.
- **Pipeline-Triggered Execution:** The command integrates seamlessly with Harness pipelines. When triggered, the pipeline references your local code changes instead of pulling from a Git repository. Perfect for developers iterating on local changes.
- **Default Plan Pipelines:** The CLI utilizes default plan pipelines configured in your workspace. If no default is set, users are guided to configure one in their workspace settings.
- **Guardrails for Safety:**
  - **No Apply Executed:** The `harness iacm plan` command is intended for planning only.
  - **IaCM Stage Constraints:** Supports pipelines with a single IaCM stage containing both `init` and `plan`.
- **Retention Policy:** Harness securely uploads the specified directory and its contents, retaining them for up to 7 days. After this period, the data is automatically deleted.
- **Remote Execution Display:** Logs will display a "Remote Execution" message to indicate that the plan is executed against local code rather than a Git repository.
:::

---
## Get started
### Prerequisites
- [Install Harness CLI](/docs/platform/automation/cli/install/).
- Configured your [default plan pipeline](/docs/infra-as-code-management/pipelines/default-pipelines#configure-and-run-default-pipelines).

### Run the command

The following example shows how to plan your local OpenTofu/Terraform changes:
:::note sample tf file
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```
:::

### CLI command
Run the following command to plan your local OpenTofu/Terraform changes:
```bash
harness iacm plan --org-id <orgname> --project-id <projectName> --workspace-id <workspaceName>
```

:::tip Configuration file
Simplify execution by adding a `.harness/workspace.yaml` file to automatically provide required arguments:
```yaml
org: <orgName>
project: <projectName>
workspace: <workspaceName>
```
Place this file at the root of your project or the root of the workspace path.
:::

---
## Target and replace support
<!-- Placeholder for target and replace support -->

## Restrictions
- The command must be executed from the root of your repository or the folder path specified in the workspace configuration.
- Only pipelines with one IaCM stage (containing `init` and `plan`) are supported.
---
This addition to the [Harness CLI toolkit](/docs/platform/automation/cli/examples/) empowers you with enhanced flexibility, security, and efficiency in managing infrastructure as code. By bridging local development workflows with Harness's enterprise-grade capabilities, `harness iacm plan` is a game-changer for modern DevOps teams.