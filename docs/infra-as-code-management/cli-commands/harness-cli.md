---
title: Harness CLI for IaCM
sidebar_label: Harness CLI
sidebar_position: 10
description: Install, authenticate, and run the Harness CLI to manage IaCM workspaces from your terminal.
keywords:
  - harness cli
  - iacm cli
  - harness auth login
  - workspace
  - execute workspace
  - terraform plan
  - opentofu plan
  - harness list workspace
tags:
  - iacm
  - cli
  - onboarding
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The **Harness CLI** is the unified command-line interface for Harness. It uses one consistent grammar across every module, so the way you install, authenticate, and run commands for IaCM matches the rest of the Harness platform. This guide shows you how to install the CLI, log in, set your scope, and manage IaCM workspaces from your terminal.

---

## What you will learn in this topic

- How to install the Harness CLI and verify the installation
- How to authenticate and set your default org and project scope
- How to list and inspect IaCM workspaces from the terminal
- How to trigger Terraform or OpenTofu plan operations with `harness execute workspace`

---

## Before you begin

- **A Harness account:** Access to a project that contains at least one IaCM workspace. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to create your first workspace.
- **A supported operating system:** macOS or Linux on `amd64` or `arm64`. Windows is not supported. Use WSL (Windows Subsystem for Linux) if you are on Windows. The installer downloads the matching binary automatically.
- **IaCM workspace permissions:** You need **View** and **Execute** permissions on IaCM workspaces. Go to the [Permissions reference](/docs/platform/role-based-access-control/permissions-reference#iacm) to review IaCM permissions. An administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to understand how roles work.
- **An API key (optional):** Required only for CI pipelines and automated scripts. Go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys) to create one with the required IaCM permissions at the project or org scope.
- **`curl` available on your `PATH`:** The install step uses `curl` to download the installer.

---

## Install the Harness CLI

Run the canonical install one-liner. It downloads the latest release for your platform and installs the `harness` binary to `~/.local/bin`.

```bash
curl -fsSL https://raw.githubusercontent.com/harness/cli/main/install.sh | sh
```

The installer downloads the binaries, optionally adds `~/.local/bin` to your `PATH`, and optionally enables shell completions.

:::tip Pass installer flags through a pipe
When you pass flags through a pipe, use `sh -s --` so the shell forwards the flags to the installer:

```bash
# Install only the core harness binary, non-interactively, to a custom directory
curl -fsSL https://raw.githubusercontent.com/harness/cli/main/install.sh | sh -s -- --core --non-interactive --install-dir /usr/local/bin
```
:::

Confirm the install:

```bash
harness version
```

### Enable shell completions

Tab completion resolves identifiers against the live Harness API and returns `id<tab>Name` suggestions. Tab completion queries the Harness API in real time to resolve workspace IDs, org names, and project names.

<Tabs>
<TabItem value="zsh" label="Zsh" default>

```bash
source <(harness completion zsh)
```

</TabItem>
<TabItem value="bash" label="Bash">

```bash
source <(harness completion bash)
```

</TabItem>
</Tabs>

Add the line to your `.zshrc` or `.bashrc` to make completions permanent. The installer can do this for you.

---

## Authenticate

Log in with the interactive flow. This launches an interactive terminal prompt (TUI) that creates a profile (a saved set of credentials and scope settings) and stores your token.

```bash
harness auth login
```

The command saves profile config to `~/.harness/config.yaml` and the token to `~/.harness/credentials`. Use `--profile <name>` to log into more than one account:

```bash
harness auth login --profile staging
```

Use the `--profile` flag on any command to switch profiles: `harness list workspace --profile staging`.

:::tip Non-interactive authentication
For CI pipelines and automated scripts, set the `HARNESS_API_KEY` environment variable instead of running an interactive login. The CLI resolves auth in this order: `--profile` flag, then `HARNESS_API_KEY`, then `HARNESS_PROFILE`, then CI runner variables, then the default profile.
:::

:::info Token expiry
Interactive login tokens can be configured to expire in 30, 90, or 180 days, or set to a custom date or no expiration. Go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys#token-expiry) to configure token expiration. If your token expires, re-run `harness auth login`.
:::

### Set your default org and project

The org and project scope determines which Harness resources your CLI commands target by default. Set them once so you do not repeat the values on every command:

```bash
harness auth setscope --org <org-id> --project <project-id>
```

Run `harness auth setscope` with no flags to choose your org and project from an interactive list.

### Check your status

Run the following command to confirm your active profile, account, and token state:

```bash
harness auth status
```

---

## Manage IaCM workspaces

The Harness CLI grammar is `harness <verb> <noun> [identifier] [flags]`. The IaCM noun is `workspace`. The following commands cover the core workspace flow.

### List workspaces

List every workspace in your scoped project:

```bash
harness list workspace
```

Filter by name with `--search`:

```bash
harness list workspace --search prod
```

The output includes the workspace `identifier`, `name`, `status`, and last `updated` time.

### Get a workspace

Retrieve a single workspace by its identifier (shown in `list workspace` output, typically a short alphanumeric string):

```bash
harness get workspace <workspace-id>
```

### Execute a workspace

Run a Terraform or OpenTofu plan against a workspace. By default, the command zips and uploads your local working directory to Harness, triggers the default plan pipeline, and streams execution output to your terminal:

```bash
harness execute workspace <workspace-id>
```

To view execution history in the Harness UI, go to **Infrastructure > Workspaces > [workspace] > Execution History**.

:::info Workspace state locking
Harness implements state locking to prevent multiple users or processes from modifying the state simultaneously. If another user or CI job is running an operation on the same workspace, your command will wait until the lock is released or fail with a lock error.
:::

The `execute workspace` command supports these flags for plan operations:

- **`--target <resource>`:** Target a specific resource. Repeat the flag to target more than one resource.
- **`--replace <resource>`:** Mark a specific resource for replacement. Repeat the flag for multiple resources.
- **`--force`:** Skip the confirmation prompt before running the plan.
- **`--branch <branch>`:** Run the plan against a specific Git branch instead of uploading local code.

For example, target two resources and skip the prompt:

```bash
harness execute workspace my-workspace --target aws_instance.web --target aws_s3_bucket.assets --force
```

:::tip Discover any command
Append `--help` at any level to list the available verbs, nouns, and flags, for example `harness execute workspace --help`.
:::

---

## Troubleshooting

<Troubleshoot
  issue="harness: command not found after installing the Harness CLI"
  mode="fallback-only"
  fallback={`The install directory is not on your PATH. Add ~/.local/bin to your PATH (export PATH="$HOME/.local/bin:$PATH"), then restart your shell or re-run the installer and accept the PATH update prompt.`}
/>

<Troubleshoot
  issue="harness auth login fails or hangs with no interactive prompt in Harness CLI"
  mode="fallback-only"
  fallback="Interactive login requires a TTY. In CI or a non-interactive shell, set the HARNESS_API_KEY environment variable instead of running harness auth login."
/>

<Troubleshoot
  issue="harness list workspace returns no workspaces or an empty result in Harness IaCM"
  mode="docs"
  fallback="Your default org and project may be unset or pointing at the wrong scope. Run harness auth setscope --org <org-id> --project <project-id> and confirm the project contains IaCM workspaces."
/>

---

## Next steps

You installed the Harness CLI, authenticated, and ran the core IaCM workspace commands. Continue with the local planning workflow and the full command grammar.

- Go to [Local CLI Plan](/docs/infra-as-code-management/cli-commands/cli-iacm-plan) to run Terraform plans against your local files.
- Go to [IaCM CLI commands](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) to explore apply, destroy, and state operations available in the Harness CLI.
- Go to [Supported OpenTofu and Terraform commands](/docs/infra-as-code-management/cli-commands/terraform-plugins) to learn how to use Terraform commands within your pipelines.
