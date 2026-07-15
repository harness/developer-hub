---
title: Supported resources and actions
sidebar_label: Supported Resources
description: A complete matrix of every resource the Harness CLI supports and which actions are available on each one.
sidebar_position: 4
keywords:
  - harness cli
  - supported resources
  - noun verb matrix
  - cli capabilities
---

This page provides a reference matrix of all resources supported by the Harness CLI and the actions available for each resource. Use it to verify whether a specific operation is supported before building scripts, integrations, or automation workflows.

For detailed examples, flags, and usage information, see the module-specific pages linked throughout this guide.

---

## What will you learn in this topic?

By the end of this page, you will know:

* Which resources are available in each CLI module.
* Which actions each resource supports (`list`, `get`, `create`, `update`, `delete`, `execute`, `push`, and `pull`).
* Which resources support multi-level scoping through the `--level` flag.
* How to interpret the create and update behavior types shown in the matrix.

---

## Before you begin

* **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.
* **Interactive alternative:** Run `harness list noun --matrix` in your terminal to view the same information directly from your installed CLI version.

---

## Matrix legend

| Symbol | Meaning                                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------------------- |
| `✓`    | Action is supported                                                                                                        |
| `—`    | Action is not supported                                                                                                    |
| `L`    | Supports the `--level` flag for multi-scope resources (account, organization, or project)                                  |
| `S`    | Set-fields: Creates a resource using `--set key=value` or positional arguments                                             |
| `GTP`  | Get-then-put: Updates a resource by fetching the current state, applying `--set` or `--del` changes, and saving the result |
| `Y`    | YAML-native: Manages a resource through YAML files using `--file` or `-f`                                                  |

All `list` actions support pagination flags (`--limit`, `--offset`, `--all`, and `--count`) by default.

---

## Platform

The Platform module manages the Harness account hierarchy, role-based access control, connectors, secrets, delegates, and related administrative resources. These foundational resources are used throughout the Harness platform.

See [Platform commands](/docs/platform/harness-cli/harness-cli-commands/platform-commands) for examples and detailed usage information.

| Resource          | list | get | create | update | delete | execute |
| ----------------- | :--: | :-: | :----: | :----: | :----: | :-----: |
| `account`         |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `organization`    |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `project`         |   L  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `user`            |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `user_group`      |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `service_account` |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `role`            |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `role_assignment` |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `resource_group`  |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `permission`      |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `connector`       |   L  |  ✓  |    S   |   GTP  |    ✓   |    ✓    |
| `delegate`        |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `delegate_token`  |   ✓  |  —  |    ✓   |    —   |    ✓   |    —    |
| `secret`          |   L  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `setting`         |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `entity_usage`    |   ✓  |  —  |    —   |    —   |    —   |    —    |

---

## Continuous Delivery

The Continuous Delivery module manages pipelines, executions, triggers, templates, freeze windows, services, environments, infrastructure definitions, and service overrides.

See [Continuous Delivery commands](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) for examples and detailed usage information.

| Resource                 | list | get | create | update | delete | execute |
| ------------------------ | :--: | :-: | :----: | :----: | :----: | :-----: |
| `pipeline`               |   ✓  |  Y  |    Y   |    Y   |    ✓   |    ✓    |
| `pipeline:dynamic`       |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `pipeline:input_set`     |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `pipeline:summary`       |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `pipeline_v1`            |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `execution`              |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `execution_step`         |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `execution_log`          |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `trigger`                |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `input_set`              |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `runtime_input_template` |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `approval_instance`      |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `template`               |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `freeze_window`          |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `global_freeze`          |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `service`                |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `environment`            |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `infrastructure`         |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `service_override`       |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |

---

## Artifact Registry

The Artifact Registry module manages registries, artifacts, artifact versions, and metadata. It also provides specialized `push`, `pull`, and `execute` operations.

See [Artifact Registry commands](/docs/platform/harness-cli/harness-cli-commands/artifact-registry-commands) for examples and detailed usage information.

| Resource                         | list | get | create | update | delete | execute |   push   | pull |
| -------------------------------- | :--: | :-: | :----: | :----: | :----: | :-----: | :------: | :--: |
| `registry`                       |   ✓  |  ✓  |    S   |    —   |    ✓   |    ✓    |     —    |   —  |
| `registry:firewall_scan`         |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `registry:migrate`               |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `registry_metadata`              |   —  |  ✓  |    —   |   GTP  |    —   |    —    |     —    |   —  |
| `artifact`                       |   ✓  |  ✓  |    —   |    —   |    ✓   |    —    | Multiple |   ✓  |
| `artifact_metadata`              |   —  |  ✓  |    —   |   GTP  |    —   |    —    |     —    |   —  |
| `artifact_version`               |   ✓  |  ✓  |    —   |    —   |    ✓   |    ✓    |     —    |   —  |
| `artifact_version:copy`          |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `artifact_version:firewall_scan` |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `artifact_version_metadata`      |   —  |  ✓  |    —   |   GTP  |    —   |    —    |     —    |   —  |
| `artifact_file`                  |   ✓  |  —  |    —   |    —   |    —   |    —    |     —    |   —  |

---

## Infrastructure as Code Management

The Infrastructure as Code Management module manages Terraform and OpenTofu workspaces and their lifecycle operations.

See [Infrastructure as Code Management commands](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) for examples and detailed usage information.

| Resource    | list | get | execute |
| ----------- | :--: | :-: | :-----: |
| `workspace` |   ✓  |  ✓  |    ✓    |

---

## Code Repository

The Code Repository module manages repositories, pull requests, branches, commits, and tags.

See [Code Repository commands](/docs/platform/harness-cli/harness-cli-commands/code-repository-commands) for examples and detailed usage information.

| Resource      | list | get | create | update | delete | execute |
| ------------- | :--: | :-: | :----: | :----: | :----: | :-----: |
| `repository`  |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `pr`          |   ✓  |  ✓  |    S   |   GTP  |    —   |    —    |
| `pr:merge`    |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `pr:close`    |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `branch`      |   ✓  |  ✓  |    S   |    —   |    ✓   |    —    |
| `commit`      |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `tag`         |   ✓  |  —  |    S   |    —   |    ✓   |    —    |
| `pr_activity` |   ✓  |  —  |    —   |    —   |    —   |    —    |

---

## Governance

The Governance module manages OPA-based policies, policy sets, and policy evaluations.

| Resource            | list | get | create | update | delete |
| ------------------- | :--: | :-: | :----: | :----: | :----: |
| `policy`            |   ✓  |  ✓  |    S   |   GTP  |    ✓   |
| `policy_set`        |   ✓  |  ✓  |    S   |   GTP  |    ✓   |
| `policy_evaluation` |   ✓  |  —  |    —   |    —   |    —   |

---

## Audit

The Audit module provides read-only access to audit events across the Harness platform.

| Resource      | list | get |
| ------------- | :--: | :-: |
| `audit_event` |   ✓  |  ✓  |

---

## Next steps
* Go to [Global flags and output](/docs/platform/harness-cli/global-flags-and-output) to learn about shared flags, output formats, filtering, and pagination.
* Go to [Platform commands](/docs/platform/harness-cli/harness-cli-commands/platform-commands) for account, RBAC, connector, and secret management examples.
* Go to [Continuous Delivery commands](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) for pipeline and deployment workflows.
* See [Continuous Delivery commands](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) for pipeline and deployment workflows.
