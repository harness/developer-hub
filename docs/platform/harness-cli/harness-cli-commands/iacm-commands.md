---
title: Infrastructure as Code Management
sidebar_label: Infrastructure as Code Management
description: Use the Harness CLI to manage the Infrastructure as Code Management module, including Terraform and OpenTofu workspaces, Ansible hosts, inventories, playbooks, and the module and provider registries.
sidebar_position: 4
keywords:
  - harness cli
  - iacm
  - infrastructure as code
  - terraform
  - opentofu
  - workspace
  - plan
  - ansible
  - playbook
  - inventory
  - module registry
  - provider
---

Infrastructure as Code Management (IaCM) in Harness provisions and manages cloud infrastructure through Terraform and OpenTofu. IaCM also tracks Ansible inventories and playbooks, and provides a private Terraform module and provider registry. The CLI lets you list workspaces, inspect their current status, run remote plans, and browse your Ansible and registry inventory without opening the Harness UI.

This page covers all Infrastructure as Code Management resources and actions available in the CLI.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- List and filter workspaces across your project.
- Inspect workspace configuration, state, and execution history.
- Run a remote Terraform or OpenTofu plan from the command line.
- Browse Ansible hosts, inventories, and playbooks.
- Browse the Terraform modules and providers published to the IaCM registry.

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Project scope configured:** IaCM resources are project-scoped and require `--org` and `--project`. Set them in your profile or pass them on each command.
- **Workspace exists:** Operations run against existing workspaces. Create workspaces through the Harness UI or API before you run CLI operations.

:::note
Workspace `create`, `update`, and `delete` commands are planned for Harness CLI v3.1. Until then, provision workspaces through the Harness UI or the REST API. Once a workspace exists, you can drive it fully from the CLI.
:::

---

## Workspaces

A workspace represents a single Terraform or OpenTofu root module along with its state, variables, and connected source repository. Workspaces track the lifecycle of your infrastructure from initial creation through updates and eventual destruction. Each workspace belongs to a project and maintains its own execution history.

### List workspaces

View all workspaces in your current project to see what infrastructure is managed and the current state of each workspace.

```sh
harness list workspace
harness list workspace --all --format json
harness list workspace --search "<search_term>"
harness list workspace --columns "name,id,status,lastRun"
```

### Get workspace details

Retrieve the full configuration for a workspace, including its connected repository, variable sets, provider versions, and last execution status.

```sh
harness get workspace <workspace_id>
harness get workspace <workspace_id> --format json
```

---

## Run a remote plan

Execute a remote Terraform or OpenTofu plan on a workspace. The CLI streams execution output in real time and exits with the operation status code (0 for success, 1 for failure). Use a plan to validate your configuration and review proposed infrastructure changes before you commit them.

```sh
harness execute workspace <workspace_id>
```

If a `.harness/workspace.yaml` file is present in the current directory, the CLI reads the workspace from that file and you can omit the identifier:

```sh
harness execute workspace
```

Narrow or force the plan with these flags:

- **`--target`:** Restricts the plan to specific resource addresses.
- **`--replace`:** Forces replacement of the given resource addresses.
- **`--force`:** Runs the plan without the interactive confirmation prompt.

```sh
harness execute workspace <workspace_id> --target <resource_address>
harness execute workspace <workspace_id> --replace <resource_address>
harness execute workspace <workspace_id> --force
```

---

## Ansible hosts, inventories, and playbooks

IaCM tracks the Ansible hosts, inventories, and playbooks in your project. These resources are read-only in the CLI.

### List and get hosts

Filter hosts by name, by the inventory they belong to, or by their current status.

```sh
harness list host
harness list host --search "<search_term>"
harness list host --inventory <inventory_id>
harness list host --status <status>
harness get host <host_id>
```

### List and get inventories

```sh
harness list inventory
harness list inventory --all --format json
harness get inventory <inventory_id>
```

### List and get playbooks

```sh
harness list playbook
harness list playbook --all --format json
harness get playbook <playbook_id>
```

---

## Module and provider registries

IaCM provides a private registry for the Terraform and OpenTofu modules and the Terraform providers that your teams consume. Both resources are read-only in the CLI.

### List and get registry modules

```sh
harness list registry_module
harness list registry_module --all --format json
harness get registry_module <module_id>
```

### List and get providers

```sh
harness list provider
harness list provider --all --format json
harness get provider <provider_id>
```

---

## Common workflows

### List all workspaces in JSON for scripting

Export workspace data for use in CI pipelines, reports, or automation scripts.

```sh
harness list workspace --all --format jsonl | jq -r '.identifier'
```

### Check workspace status across multiple projects

Combine the command with scope flags to audit workspaces in different projects.

```sh
harness list workspace --org <org_id> --project <project_id>
```

### Plan from a checked-out repository

Run the plan from the directory that holds your `.harness/workspace.yaml` file so that CI jobs do not need to hard-code a workspace identifier.

```sh
cd <repository_directory>
harness execute workspace --force
```

---

## Related articles

- [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands): Manage pipelines and deployment resources.
- [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands): Manage account resources, connectors, and secrets.
