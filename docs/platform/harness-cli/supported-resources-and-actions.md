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

## What you will learn in this topic

By the end of this page, you will know:

* Which resources are available in each CLI module.
* Which actions each resource supports (`list`, `get`, `create`, `update`, `delete`, `execute`, `push`, and `pull`).
* Which resources support multi-level scoping through the `--level` flag.
* How to interpret the create and update behavior types shown in the matrix.

---

## Before you begin

* **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
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

For examples and detailed usage information, see [Platform commands](/docs/platform/harness-cli/harness-cli-commands/platform-commands).

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

For examples and detailed usage information, see [Continuous Delivery commands](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands).

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
| `execution:abort`        |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `execution:retry`        |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `execution:retry_history`|   —  |  ✓  |    —   |    —   |    —   |    —    |
| `trigger`                |   ✓  |  ✓  |    Y   |    Y   |    ✓   |    —    |
| `input_set`              |   ✓  |  ✓  |    Y   |    Y   |    ✓   |    —    |
| `runtime_input_template` |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `approval_instance`      |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `approval_instance:approve` |  — |  —  |    —   |    —   |    —   |    ✓    |
| `approval_instance:reject`  |  — |  —  |    —   |    —   |    —   |    ✓    |
| `template`               |   ✓  |  ✓  |    Y   |    —   |    —   |    —    |
| `template_version`       |   ✓  |  ✓  |    —   |    Y   |    ✓   |    —    |
| `template_version:set-stable` | — |  — |    —   |    ✓   |    —   |    —    |
| `freeze_window`          |   L  |  ✓  |    —   |    —   |    —   |    —    |
| `global_freeze`          |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `service`                |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `environment`            |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `infrastructure`         |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `service_override`       |   ✓  |  ✓  |    S   |   GTP  |    ✓   |    —    |

---

## Artifact Registry

The Artifact Registry module manages registries, artifacts, artifact versions, and metadata. It also provides specialized `push`, `pull`, and `execute` operations.

For examples and detailed usage information, see [Artifact Registry commands](/docs/platform/harness-cli/harness-cli-commands/artifact-registry-commands).

| Resource                         | list | get | create | update | delete | execute |   push   | pull |
| -------------------------------- | :--: | :-: | :----: | :----: | :----: | :-----: | :------: | :--: |
| `registry`                       |   ✓  |  ✓  |    S   |    —   |    ✓   |    ✓    |     —    |   —  |
| `registry:firewall_scan`         |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `registry:migrate`               |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `registry_metadata`              |   —  |  ✓  |    —   |   GTP  |    —   |    —    |     —    |   —  |
| `artifact`                       |   ✓  |  ✓  |    —   |    —   |    ✓   |    ✓    | Multiple |   ✓  |
| `artifact:bulk`                  |   —  |  —  |    —   |    —   |    ✓   |    —    |     —    |   —  |
| `artifact_metadata`              |   —  |  ✓  |    —   |   GTP  |    —   |    —    |     —    |   —  |
| `artifact_version`               |   ✓  |  ✓  |    —   |    —   |    ✓   |    ✓    |     —    |   —  |
| `artifact_version:copy`          |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `artifact_version:firewall_scan` |   —  |  —  |    —   |    —   |    —   |    ✓    |     —    |   —  |
| `artifact_version_metadata`      |   —  |  ✓  |    —   |   GTP  |    —   |    —    |     —    |   —  |
| `artifact_file`                  |   ✓  |  —  |    —   |    —   |    —   |    —    |     —    |   —  |

The `push` column reads `Multiple` for `artifact` because each package format has its own qualified noun. The 18 supported formats are `artifact:generic`, `artifact:maven`, `artifact:npm`, `artifact:python`, `artifact:nuget`, `artifact:rpm`, `artifact:cargo`, `artifact:go`, `artifact:conda`, `artifact:dart`, `artifact:composer`, `artifact:ruby`, `artifact:swift`, `artifact:puppet`, `artifact:debian`, `artifact:conan`, `artifact:helm`, and `artifact:docker`.

The `execute` column on `artifact` covers the five package-manager install helpers: `artifact:npm_install`, `artifact:npm_ci`, `artifact:pip_install`, `artifact:mvn_install`, and `artifact:dotnet_restore`.

`harness configure registry` is a registry-level action that writes local package-manager client configuration. It does not map to one of the columns above.

---

## Infrastructure as Code Management

The Infrastructure as Code Management module manages Terraform and OpenTofu workspaces, Ansible hosts, inventories, and playbooks, and the module and provider registries.

For examples and detailed usage information, see [Infrastructure as Code Management commands](/docs/platform/harness-cli/harness-cli-commands/iacm-commands).

| Resource          | list | get | execute |
| ----------------- | :--: | :-: | :-----: |
| `workspace`       |   ✓  |  ✓  |    ✓    |
| `host`            |   ✓  |  ✓  |    —    |
| `inventory`       |   ✓  |  ✓  |    —    |
| `playbook`        |   ✓  |  ✓  |    —    |
| `registry_module` |   ✓  |  ✓  |    —    |
| `provider`        |   ✓  |  ✓  |    —    |

Workspace `create`, `update`, and `delete` commands are planned for Harness CLI v3.1.

---

## Code Repository

The Code Repository module manages repositories, pull requests, reviewers and codeowners, AI review insights, branches, commits, tags, comments, and status checks.

For examples and detailed usage information, see [Code Repository commands](/docs/platform/harness-cli/harness-cli-commands/code-repository-commands).

| Resource                 | list | get | create | update | delete | execute |
| ------------------------ | :--: | :-: | :----: | :----: | :----: | :-----: |
| `repository`             |   L  |  ✓  |    S   |   GTP  |    ✓   |    —    |
| `pr`                     |   ✓  |  ✓  |    S   |   GTP  |    —   |    —    |
| `pr:mine`                |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `pr:review_pending`      |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `pr:merge`               |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `pr:close`               |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `pr:review`              |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `pr:insight`             |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `pr:review_group`        |   —  |  ✓  |    —   |    —   |    —   |    —    |
| `pr_suggested_reviewer`  |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `pr_suggested_label`     |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `pr_success_criterion`   |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `code_principal`         |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `pr_reviewer`            |   ✓  |  —  |    ✓   |    —   |    ✓   |    —    |
| `pr_codeowner`           |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `branch`                 |   ✓  |  ✓  |    S   |    —   |    ✓   |    —    |
| `commit`                 |   ✓  |  ✓  |    —   |    —   |    —   |    —    |
| `pr_commit`              |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `tag`                    |   ✓  |  —  |    S   |    —   |    ✓   |    —    |
| `pr_activity`            |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `pr_comment`             |   ✓  |  —  |    Y   |   GTP  |    ✓   |    —    |
| `pr_check`               |   ✓  |  —  |    —   |    —   |    —   |    —    |
| `commit_check`           |   ✓  |  —  |    —   |    —   |    —   |    —    |

---

## GitOps

The GitOps module manages Argo CD-backed agents, applications, destination clusters, source repositories, and ApplicationSets.

For examples and detailed usage information, see [GitOps commands](/docs/platform/harness-cli/harness-cli-commands/gitops-commands).

| Resource                        | list | get | create | update | delete | execute |
| ------------------------------- | :--: | :-: | :----: | :----: | :----: | :-----: |
| `gitops_agent`                  |   ✓  |  ✓  |    S   |    —   |    ✓   |    ✓    |
| `gitops_agent:install`          |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `gitops_application`            |   ✓  |  ✓  |    Y   |    Y   |    ✓   |    ✓    |
| `gitops_application:sync`       |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `gitops_application:refresh`    |   —  |  —  |    —   |    —   |    —   |    ✓    |
| `gitops_cluster`                |   ✓  |  ✓  |    Y   |    Y   |    ✓   |    —    |
| `gitops_repository`             |   ✓  |  ✓  |    Y   |    Y   |    ✓   |    —    |
| `gitops_application_set`        |   ✓  |  ✓  |    Y   |    Y   |    ✓   |    —    |

---

## Harness Worker Agents

Harness Worker Agents are Harness-managed automation workers. The `agent` noun lives in the `platform` module.

For examples and detailed usage information, see [Worker Agent commands](/docs/platform/harness-cli/harness-cli-commands/worker-agent-commands).

| Resource | list | get | create | update | delete |
| -------- | :--: | :-: | :----: | :----: | :----: |
| `agent`  |   ✓  |  ✓  |    Y   |    Y   |    —   |

---

## Governance

The Governance module manages OPA-based policies, policy sets, and policy evaluations.

For examples and detailed usage information, see [Governance commands](/docs/platform/harness-cli/harness-cli-commands/governance-commands).

| Resource            | list | get | create | update | delete |
| ------------------- | :--: | :-: | :----: | :----: | :----: |
| `policy`            |   ✓  |  ✓  |    S   |   GTP  |    ✓   |
| `policy_set`        |   ✓  |  ✓  |    S   |   GTP  |    ✓   |
| `policy_evaluation` |   ✓  |  —  |    —   |    —   |    —   |

---

## Audit

The Audit module provides read-only access to audit events across the Harness platform.

For examples and detailed usage information, see [Audit commands](/docs/platform/harness-cli/harness-cli-commands/audit-commands).

| Resource      | list | get |
| ------------- | :--: | :-: |
| `audit_event` |   ✓  |  ✓  |

---

## Related articles

* [Global flags and output](/docs/platform/harness-cli/global-flags-and-output): Review shared flags, output formats, filtering, and pagination.
* [Platform commands](/docs/platform/harness-cli/harness-cli-commands/platform-commands): Manage accounts, RBAC, connectors, and secrets.
* [Continuous Delivery commands](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands): Run pipeline and deployment workflows.
