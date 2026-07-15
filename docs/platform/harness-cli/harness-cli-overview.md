---
title: Harness CLI Overview
sidebar_label: Overview
description: A unified command-line interface for managing Harness pipelines, artifacts, infrastructure, and platform resources.
sidebar_position: 1
---

The Harness CLI provides a command-line interface for managing and automating resources across your Harness account. From a single terminal, you can trigger deployments, manage resources, rotate secrets, query audit logs, and perform many of the same actions available in the Harness UI.

Common use cases include:

* **Automating repetitive tasks:** Create and manage pipelines, connectors, secrets, and other resources in bulk using YAML files or command-line flags.
* **Integrating with CI/CD workflows:** Trigger pipeline executions, monitor execution status, and automate deployment workflows from scripts and external automation tools.
* **Troubleshooting and validation:** View execution logs, inspect resource configurations, and verify connector connectivity without leaving the terminal.
* **Managing resources at scale:** Export resources as JSON, compare configurations, and audit changes across accounts, organizations, and projects.

---

## What will you learn in this topic?

By the end of this page, you will understand:

* How Harness CLI commands are structured, including actions, resources, identifiers, and flags.
* Which actions are available and the operations they support.
* How resource-specific commands extend base actions for specialized workflows.
* Which Harness modules are supported and the resources available within each module.
* How to discover and explore available commands directly from the terminal.

---

## Command structure

Every Harness CLI command follows a consistent `action resource identifier flags` pattern:

```sh
harness <action> <resource> [identifier] [flags]
```

For example:

```sh
harness list pipeline
harness get secret my-secret --level account
harness execute pipeline deploy-prod --branch main
harness create project -f project.yaml
```

This predictable command structure makes the CLI easier to learn and use. After you identify the action and resource you want to work with, you can discover available options through built-in help and tab completion. 

Tab completion suggests resources, identifiers, flags, and valid values directly from the Harness API, helping you construct commands efficiently and accurately.

---

## Core actions

The CLI provides six core actions that are available across most resources:

| Action    | Description                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`    | Display a collection of resources. You can optionally filter results by a parent resource, such as listing executions for a specific pipeline. |
| `get`     | Retrieve details for a single resource by its identifier.                                                                                      |
| `create`  | Create a new resource from a YAML file (`--file` or `-f`) or by specifying values with `--set` flags.                                          |
| `update`  | Modify an existing resource by updating fields with `--set` or removing fields with `--del`.                                                   |
| `delete`  | Remove a resource by its identifier.                                                                                                           |
| `execute` | Run or trigger an operation, such as executing a pipeline, starting a scan, or running an HQL query.                                           |

Some modules provide additional actions. For example, the Artifact Registry module includes `push` and `pull` commands for uploading and downloading package content.

---

## Advanced resource operations

Some resources support specialized operations that extend the six core actions. These operations are represented using a `resource:operation` syntax.

```sh
harness get pipeline:summary <id>
harness execute pipeline:input_set <id>
harness push artifact:docker my-image:1.0
harness execute registry:firewall_scan <id>
```

Resource operations provide access to functionality that is specific to a particular resource. For example, `pipeline:summary` returns a lightweight overview of a pipeline without retrieving its complete YAML definition.

To discover available resource operations, run the following command:

```sh
harness list noun --matrix
```

This command displays all supported resources and resource operations available in your installed CLI version.

---

## Modules

The Harness CLI organizes commands into modules. Each module groups related resources within a specific functional area:

| Module | Resources it covers |
| --- | --- |
| **Platform** | Authentication, profiles, account hierarchy, RBAC, connectors, secrets, delegates, OPA governance policies, and audit trail |
| **Continuous Delivery** | Pipelines, executions, triggers, templates, deployment freezes, services, environments, infrastructure definitions, and service overrides |
| **Artifact Registry** | Registries, artifacts, versions, metadata, push, pull, security scans, and migrations |
| **Infrastructure as Code Management** | Terraform and OpenTofu workspaces and operations (plan, apply, destroy) |
| **Code Repository** | Repositories, pull requests, branches, commits, and tags |
| **AI Evaluations** | Datasets, metrics, metric sets, evaluation targets, models, evaluation runs, and suites |
| **Knowledge Graph** | Entity graph schema and HQL query engine (run, validate, explain) |

All modules use the same command structure, flag conventions, and output formats. Once you learn how to work with one module, you can apply the same patterns across the rest of the CLI.

---

## Discover commands interactively

You can explore available modules, resources, actions, and command options directly from the terminal:

```sh
harness list noun --matrix       # Show resources and supported actions
harness list module              # Show available modules
harness get module pipeline      # Show module details and guides
harness get noun pipeline        # Show resource fields and actions
harness list pipeline --help     # Show command usage and flags
```

If you enter an invalid resource name, the CLI suggests the closest matching resource and exits with a non-zero status code.

---

## Next steps

- Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) to get the CLI on your machine.
- Go to [Authenticate](/docs/platform/harness-cli/authenticate) to log in and configure profiles.
- Go to [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions) to see the full resource and action matrix.
