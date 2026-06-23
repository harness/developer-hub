---
title: Local CLI Plan
description: Execute the plan command against your local environment with the Harness CLI.
sidebar_label: Local CLI Plan
sidebar_position: 20
keywords:
  - iacm cli
  - harness cli
  - terraform plan
  - opentofu plan
  - local plan
  - cli commands
tags:
  - cli
  - iacm
  - plan
  - terraform
  - opentofu
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

<!-- :::warning Install the unified Harness CLI 3.0
For install, authentication, and workspace commands, use the unified **Harness CLI 3.0**. The standalone install and login steps for the earlier CLI are deprecated for IaCM. Go to [Harness CLI 3.0 for IaCM](/docs/infra-as-code-management/cli-commands/harness-cli) to install and authenticate, then return here to run a local plan.
::: -->

The `harness iacm plan` command lets you run OpenTofu or Terraform plans against your local code while using secrets and configuration stored securely in Harness. The command uploads your local directory, triggers a default plan pipeline in your workspace, and displays execution results in the Harness UI. This approach combines the speed of local development with enterprise-grade security and pipeline integration.

Building upon [Harness CLI capabilities](/docs/platform/automation/cli/reference), the `harness iacm plan` command eliminates the need to store provider credentials locally. When you run the command, Harness uploads your working directory to a temporary storage location (retained for 7 days), triggers the default plan pipeline configured in your workspace, and executes the plan using secrets stored in Harness. Pipeline logs display a "Remote Execution" message to indicate the plan ran against your local code rather than a Git repository.

---

## Before you begin

- **Harness account with IaCM enabled:** You need **Infrastructure as Code Management** under **Infrastructure** in Harness when it is entitled on your account. For how to access or create a Harness account, see [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide).

    :::info Contact Harness support

    If IaCM does not appear, go to [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View** and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these, an administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to understand how roles work.
- **Workspace access:** You need **View** and **Edit** permissions on the IaCM workspace. An administrator assigns these via [IaCM workspace permissions](/docs/infra-as-code-management/workspaces/workspace-rbac).
- **OpenTofu or Terraform installed locally:** Install [OpenTofu](https://opentofu.org/) or [Terraform](https://terraform.io/) on your machine. The CLI does not bundle these tools.
<!-- - **Harness CLI 3.0 installed and authenticated:** [Install and authenticate the Harness CLI 3.0](/docs/infra-as-code-management/cli-commands/harness-cli). -->
- **Workspace with default plan pipeline configured:** A default plan pipeline must be configured in your workspace. A default plan pipeline is a pre-configured pipeline that runs when you execute the CLI plan command. Workspaces can have one default plan and one default apply pipeline. Go to [Configure default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to set this up.

---

## Run a local plan

The following example shows how to plan your local OpenTofu or Terraform changes. The command uploads your working directory, triggers the default plan pipeline, and displays the pipeline execution URL.

### Create a sample Terraform configuration

Create a file named `main.tf` in your workspace directory to test the command:

```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```

### Command syntax

Run the following command from the root of your repository or the workspace path configured in your Harness workspace:

```bash
harness iacm plan --org-id <orgname> --project-id <projectName> --workspace-id <workspaceName>
```

The command performs the following actions:

1. Uploads your current working directory to Harness (files are retained for 7 days)
2. Triggers the default plan pipeline configured in your workspace
3. Prints the pipeline execution URL to your terminal
4. Executes the plan using the `init` and `plan` stages in the pipeline

**Command output:** The CLI prints the pipeline execution URL (for example, `https://app.harness.io/...`). Plan output appears in the Harness UI pipeline logs. The command exits with code 0 on success or a non-zero code on failure.

**What happens during remote execution:** The plan runs in a Harness-managed environment. The pipeline uses secrets stored in the workspace (for example, AWS credentials, GCP service accounts) rather than reading from your local environment variables. Pipeline logs display a "Remote Execution" message to indicate the plan ran against your local code rather than pulling from a Git repository.

### Configuration file (optional)

Simplify execution by adding a `.harness/workspace.yaml` file to automatically provide required arguments:

```yaml
org: <orgName>
project: <projectName>
workspace: <workspaceName>
```

**File placement:** Place this file at the root of your project (the directory where you run the `harness iacm plan` command).

**Precedence rules:** CLI flags override values in the configuration file. If both the config file and CLI flags are missing required arguments, the command fails with an error message listing the missing values.

---

## Limitations

- **Command execution path:** The command must be executed from the root of your repository or the folder path specified in the workspace configuration. Running it from a subdirectory may result in incomplete uploads or missing files.
- **Pipeline structure:** Only pipelines with one IaCM stage (containing both `init` and `plan` steps) are supported. Pipelines with multiple IaCM stages or separate init/plan stages will fail.
- **Upload size and retention:** Harness uploads the specified directory and its contents, retaining them for up to 7 days. After this period, the data is automatically deleted. Re-running the pipeline after 7 days requires re-uploading.
- **No apply execution:** The `harness iacm plan` command is intended for planning only. It does not execute apply operations. Use a pipeline apply step to apply changes.
- **Network requirements:** Your machine must be able to reach Harness API endpoints (for example, `app.harness.io`). Firewall or proxy configurations may require allowlisting these endpoints.

---

## Troubleshooting

<!-- <Troubleshoot
  issue="harness iacm plan command fails with authentication error in Harness CLI 3.0"
  mode="fallback-only"
  fallback="Run `harness auth status` to confirm your active profile and token. If your token expired or is invalid, run `harness auth login` (use `--profile` if you log into multiple accounts). In CI or any non-interactive shell, set `HARNESS_API_KEY` instead of running `harness auth login`. If it still fails, confirm your profile or API key has Execute permission on the IaCM workspace and that your `--org-id`, `--project-id`, and `--workspace-id` values are correct."
/> -->

<Troubleshoot
  issue="harness iacm plan fails with 'default plan pipeline not configured' in IaCM workspace"
  mode="docs"
  fallback="Configure a default plan pipeline in your workspace settings. Go to the workspace, select Settings > Default Pipelines, and choose a pipeline with init and plan stages."
/>

<Troubleshoot
  issue="harness iacm plan command returns 'workspace not found' error"
  mode="docs"
  fallback="Verify the workspace ID, project ID, and org ID are correct. Run 'harness iacm workspace list' to see available workspaces."
/>

<Troubleshoot
  issue="harness iacm plan uploads fail due to file size or network timeout"
  mode="docs"
  fallback="Ensure your workspace directory is under 500MB and your network can reach Harness API endpoints. Exclude large files using .gitignore patterns."
/>

<Troubleshoot
  issue="Terraform plan fails in remote execution with missing provider credentials in Harness IaCM"
  mode="docs"
  fallback="The plan runs in your workspace's default plan pipeline, which uses the credentials and secrets configured in that workspace, not your local environment. Store provider credentials in the workspace connector or secret manager. The CLI does not pass local environment variables or local backend configuration to the remote execution."
/>

---

## Next steps

You have successfully run a local Terraform plan using the Harness CLI. You can now review the plan output in the Harness UI and execute the apply step via a pipeline.

- Go to [Configure default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to set up default apply pipelines.
- Go to [Manage workspaces](/docs/infra-as-code-management/workspaces/workspace-tabs) to learn about workspace configuration and state management.
<!-- - Go to [Harness CLI 3.0 for IaCM](/docs/infra-as-code-management/cli-commands/harness-cli) to explore additional CLI commands. -->