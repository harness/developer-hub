---
title: Local CLI Plan
description: Upload local Terraform or OpenTofu code to Harness and run a plan using workspace secrets and configuration.
sidebar_label: Local CLI Plan
sidebar_position: 20
keywords:
  - iacm cli
  - harness cli
  - terraform plan
  - opentofu plan
  - local plan
  - cli commands
  - harness execute workspace
tags:
  - cli
  - iacm
  - plan
  - terraform
  - opentofu
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The `harness execute workspace` command lets you run Terraform or OpenTofu plans against your local code while using secrets and configuration stored securely in Harness. The command zips and uploads your local directory, triggers the default plan pipeline in your workspace, and streams execution results back to your terminal. This approach combines the speed of local development with enterprise-grade security and pipeline integration.

Building on the [Harness CLI](/docs/platform/harness-cli/harness-cli-overview), the `harness execute workspace` command eliminates the need to store provider credentials locally. When you run the command, Harness zips and uploads your working directory to temporary storage (retained for 7 days), triggers the default plan pipeline configured in your workspace, and executes the plan using secrets stored in Harness. Pipeline logs display a "Remote Execution" message to indicate the plan ran against your local code rather than a Git repository.

---

## What you will learn in this topic

- How to run `harness execute workspace` to zip and upload local Terraform or OpenTofu code and trigger a remote plan
- How to configure `.harness/workspace.yaml` to avoid repeating workspace and scope arguments on every run
- Which flags control plan targeting, resource replacement, and branch overrides
- How to troubleshoot common failures when running local plans

---

## Before you begin

- **Harness CLI installed and authenticated:** Go to [Install and upgrade the Harness CLI](/docs/platform/harness-cli/install-and-upgrade) to install the CLI, then go to [Authenticate the Harness CLI](/docs/platform/harness-cli/authenticate) to log in and set your default org and project.
- **Harness account with IaCM enabled:** You need Infrastructure as Code Management under Infrastructure in Harness when it is entitled on your account. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to create your first workspace.

    :::info Contact Harness support

    If IaCM does not appear, go to [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View** and **Execute** permissions for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). An administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to understand how roles work.
- **Workspace access:** You need **View** and **Edit** permissions on the IaCM workspace. An administrator assigns these via [IaCM workspace permissions](/docs/infra-as-code-management/workspaces/workspace-rbac).
- **Workspace with a default plan pipeline configured:** A default plan pipeline must be configured in your workspace. A default plan pipeline is a pre-configured pipeline that runs when you execute the CLI plan command. Go to [Configure default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to set this up.

---

## Run a local plan

The following example shows how to plan your local Terraform or OpenTofu changes. The command zips your working directory, uploads it to Harness, triggers the default plan pipeline, and displays the pipeline execution URL.

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
harness execute workspace <workspace_id>
```

If your default org and project are set in your CLI profile, only the workspace ID is required. To pass scope explicitly:

```bash
harness execute workspace <workspace_id> --org <org_id> --project <project_id>
```

The command performs the following actions:

1. Zips your current working directory and uploads it to Harness (files are retained for 7 days)
2. Triggers the default plan pipeline configured in your workspace
3. Prints the pipeline execution URL to your terminal
4. Executes the plan using the `init` and `plan` stages in the pipeline

**Command output:** The CLI prints the pipeline execution URL, for example `https://app.harness.io/...`. Plan output appears in the Harness UI pipeline logs. The command exits with code 0 on success or a non-zero code on failure.

**What happens during remote execution:** The plan runs in a Harness-managed environment. The pipeline uses secrets stored in the workspace, for example AWS credentials and GCP service accounts, rather than reading from your local environment variables. Pipeline logs display a "Remote Execution" message to indicate the plan ran against your local code rather than pulling from a Git repository.

### Optional flags

The `harness execute workspace` command supports these flags for plan operations:

- **`--target <resource>`:** Target a specific resource. Repeat the flag to target more than one resource.
- **`--replace <resource>`:** Mark a specific resource for replacement. Repeat the flag for multiple resources.
- **`--force`:** Skip the confirmation prompt before running the plan.
- **`--branch <branch>`:** Run the plan against a specific Git branch instead of uploading local code.

For example, target two resources and skip the confirmation prompt:

```bash
harness execute workspace <workspace_id> --target aws_instance.web --target aws_s3_bucket.assets --force
```

### Configuration file (optional)

Simplify execution by adding a `.harness/workspace.yaml` file to automatically provide required arguments:

```yaml
org: <orgName>
project: <projectName>
workspace: <workspaceId>
```

**File placement:** Place this file at the root of your project, in the directory where you run `harness execute workspace`.

**Precedence rules:** CLI flags override values in the configuration file. If both the config file and CLI flags are missing required arguments, the command fails with an error message listing the missing values.

---

## Limitations

The following constraints apply when using `harness execute workspace` for local plans.

- **Command execution path:** Run the command from the root of your repository or the folder path specified in the workspace configuration. Running it from a subdirectory may result in incomplete uploads or missing files.
- **Pipeline structure:** Only pipelines with one IaCM stage containing both `init` and `plan` steps are supported. Pipelines with multiple IaCM stages or separate init and plan stages will fail.
- **Upload size and retention:** Harness uploads the specified directory and its contents, retaining them for up to 7 days. After this period, the data is automatically deleted. Re-running the pipeline after 7 days requires re-uploading.
- **Plan only by default:** The `harness execute workspace` command runs a plan operation when no operation flag is specified. To apply changes, go to [IaCM CLI commands](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) to learn about apply and destroy operations.
- **Network requirements:** Your machine must be able to reach Harness API endpoints, for example `app.harness.io`. Firewall or proxy configurations may require allowlisting these endpoints.

---

## Troubleshooting

<Troubleshoot
  issue="harness execute workspace fails with authentication error in Harness CLI"
  mode="fallback-only"
  fallback="Run `harness auth status` to confirm your active profile and token. If your token is expired or invalid, run `harness auth login`. In CI or a non-interactive shell, set the HARNESS_API_KEY environment variable instead of running harness auth login. Confirm your profile or API key has Execute permission on the IaCM workspace and that your --org, --project, and workspace ID values are correct."
/>

<Troubleshoot
  issue="harness execute workspace fails with 'default plan pipeline not configured' in IaCM workspace"
  mode="docs"
  fallback="Configure a default plan pipeline in your workspace settings. Go to the workspace, select Settings > Default Pipelines, and choose a pipeline with init and plan stages."
/>

<Troubleshoot
  issue="harness execute workspace returns 'workspace not found' error"
  mode="docs"
  fallback="Verify the workspace ID, project ID, and org ID are correct. Run 'harness list workspace' to see available workspaces."
/>

<Troubleshoot
  issue="harness execute workspace uploads fail due to file size or network timeout"
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

You have run a local Terraform plan using the Harness CLI. Review the plan output in the Harness UI and decide whether to proceed with an apply.

- Go to [Configure default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to set up default apply pipelines.
- Go to [Manage workspaces](/docs/infra-as-code-management/workspaces/workspace-tabs) to learn about workspace configuration and state management.
- Go to [IaCM CLI commands](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) to explore apply, destroy, and state operations available in the Harness CLI.
