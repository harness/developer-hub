---
title: Infrastructure as Code Management
sidebar_label: Infrastructure as Code Management
description: Use the Harness CLI to manage the Infrastructure as Code Management module, including listing workspaces, inspecting configurations, and executing Terraform and OpenTofu plan, apply, and destroy operations.
sidebar_position: 4
keywords:
  - harness cli
  - iacm
  - infrastructure as code
  - terraform
  - opentofu
  - workspace
  - plan
  - apply
  - destroy
---

Infrastructure as Code Management (IaCM) in Harness provisions and manages cloud infrastructure through Terraform and OpenTofu. Each workspace tracks a set of infrastructure resources along with their state file, variables, and execution history. The CLI lets you list workspaces, inspect their current status, and trigger provisioning operations without opening the Harness UI.

This page covers all Infrastructure as Code Management resources and actions available in the CLI.

---

## What will you learn in this topic?

By the end of this page, you will know how to:

- List and filter workspaces across your project.
- Inspect workspace configuration, state, and execution history.
- Trigger plan, apply, and destroy operations from the command line.
- Stream execution output to your terminal for real-time feedback.

---

## Before you begin

- **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.
- **Project scope configured:** Workspaces are project-scoped and require `--org` and `--project`. Set them in your profile or pass them on each command.
- **Workspace exists:** Operations run against existing workspaces. Create workspaces through the Harness UI or API before executing CLI operations.

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

## Execute workspace operations

Trigger provisioning operations on a workspace directly from your terminal. The CLI streams execution output in real time and exits with the operation status code (0 for success, 1 for failure). Use these operations to provision, update, or tear down infrastructure without opening the Harness UI.

### Plan

Preview the changes Terraform or OpenTofu will make without actually applying them. Use plan to validate your configuration and review proposed infrastructure changes before committing.

```sh
harness execute workspace <workspace_id> --set operation=plan
```

### Apply

Execute the planned changes and provision or update your infrastructure. Apply modifies real resources in your cloud provider based on the current workspace configuration.

```sh
harness execute workspace <workspace_id> --set operation=apply
```

### Destroy

Tear down all resources managed by the workspace. Destroy removes every resource tracked in the workspace state file. Use this to decommission environments or clean up temporary infrastructure.

```sh
harness execute workspace <workspace_id> --set operation=destroy
```

---

## Common workflows

### Validate before applying

Run a plan first, review the output, and apply only if the changes match your expectations.

```sh
harness execute workspace <workspace_id> --set operation=plan
harness execute workspace <workspace_id> --set operation=apply
```

### List all workspaces in JSON for scripting

Export workspace data for use in CI pipelines, reports, or automation scripts.

```sh
harness list workspace --all --format jsonl | jq -r '.identifier'
```

### Check workspace status across multiple projects

Combine with scope flags to audit workspaces in different projects.

```sh
harness list workspace --org <org_id> --project <project_id>
harness list workspace --org <org_id> --project <project_id>
```

---

## Next steps

- Go to [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) to manage pipelines and deployment resources.
- Go to [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands) to manage account resources, connectors, and secrets.
