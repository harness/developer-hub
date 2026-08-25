---
title: Continuous Delivery
sidebar_label: Continuous Delivery
description: Use the Harness CLI to manage the Continuous Delivery module, including pipelines, executions, triggers, input sets, templates, freeze windows, services, environments, infrastructure definitions, and service overrides.
sidebar_position: 2
keywords:
  - harness cli
  - continuous delivery
  - pipeline commands
  - cd commands
  - execute pipeline
  - services
  - environments
  - execution logs
---

Continuous Delivery in Harness orchestrates how your software moves from source code to production. The CLI gives you full access to the deployment lifecycle: define pipelines as YAML, trigger executions, stream logs, and configure the services, environments, and infrastructure that make up your delivery targets.

This page covers every Continuous Delivery resource available in the CLI, from pipeline management and execution tracking to environment configuration and service overrides.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- List, create, update, and delete pipeline definitions as YAML.
- Execute a pipeline with runtime inputs, input sets, or YAML files.
- Abort and retry executions, and review retry history.
- Track execution status and retrieve step-level logs.
- Create, update, and delete triggers, input sets, templates, and template versions.
- Approve or reject a waiting approval instance.
- Work with freeze windows and the global freeze status.
- Create and manage services, environments, infrastructure definitions, and service overrides.

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Project scope configured:** Pipelines and Continuous Delivery resources require `--org` and `--project`. Set them in your profile with `harness auth setscope` or pass them on each command.

---

## Pipelines

A pipeline is a YAML-defined sequence of stages and steps that orchestrates your CI/CD workflow. The CLI manages pipelines as YAML files, so you can round-trip definitions between the API and your local file system for version control and code review.

### List pipelines

```sh
harness list pipeline
harness list pipeline --search "<search_term>"
harness list pipeline --all --format jsonl
harness list pipeline --columns "name,id,lastRun,status"
harness list pipeline --ui
```

### Get a pipeline

Returns the full YAML definition. Use `--format json` to convert the definition to JSON, and `--raw` to return the full API envelope.

```sh
harness get pipeline <pipeline_id>
harness get pipeline <pipeline_id> --format json
harness get pipeline <pipeline_id> --raw
harness get pipeline <pipeline_id> -o <output_file>.yaml
harness get pipeline <pipeline_id> --branch <branch_name>
```

For a lightweight overview without the full YAML body:

```sh
harness get pipeline:summary <pipeline_id>
```

### Create a pipeline

The CLI reads the identifier and metadata from the YAML body:

```sh
harness create pipeline -f <pipeline_file>.yaml
```

To create a Git-backed pipeline instead of an inline one, pass the Git connector, repository, and file path:

```sh
harness create pipeline -f <pipeline_file>.yaml \
  --connector <connector_id> \
  --repo <repository_name> \
  --file-path <path_in_repo>.yaml
```

### Update a pipeline

Fetch the YAML, edit locally, and push it back:

```sh
harness get pipeline <pipeline_id> > <pipeline_file>.yaml
$EDITOR <pipeline_file>.yaml
harness update pipeline <pipeline_id> -f <pipeline_file>.yaml
```

### Delete a pipeline

```sh
harness delete pipeline <pipeline_id>
```

### Work with v1-schema pipelines

The `pipeline_v1` noun provides read-only access to v1-schema pipelines for legacy API compatibility.

```sh
harness list pipeline_v1
harness get pipeline_v1 <pipeline_id>
```

---

## Execute a pipeline

Running a pipeline starts the defined stages, streams progress to your terminal, and exits with the pipeline's terminal status (0 for success, 1 for failure).

### Run directly

Pass individual runtime values with `--input key=value`, which is repeatable. Add `--follow` to stream progress until the execution reaches a terminal status.

```sh
harness execute pipeline <pipeline_id>
harness execute pipeline <pipeline_id> --branch <branch_name>
harness execute pipeline <pipeline_id> --input <key>=<value> --input <key>=<value>
harness execute pipeline <pipeline_id> --follow
```

### Run with an input set

Input sets are pre-saved collections of runtime values that let you repeat a known configuration without manual input. The `pipeline:input_set` variant uses the input set list endpoint, so Harness merges the input sets server-side.

```sh
harness execute pipeline <pipeline_id> --input-set <input_set_id>
harness execute pipeline:input_set <pipeline_id> --input-set <input_set_id>
```

### Run with a YAML inputs file

For fully scripted CI runs, pass all runtime inputs in a file:

```sh
harness execute pipeline <pipeline_id> --input-file <inputs_file>.yaml
```

### Run with dynamic validation

The `pipeline:dynamic` variant validates the pipeline YAML through the validators endpoint before it runs.

```sh
harness execute pipeline:dynamic <pipeline_id>
```

### Check required inputs before running

Inspect the runtime input template to see every `<+input>` placeholder that the pipeline expects:

```sh
harness get runtime_input_template <pipeline_id>
```

---

## Abort and retry executions

Use interrupts to stop a running execution, and retry to re-run a failed one. Both accept the execution identifier on its own or as `<pipeline_id>/<execution_id>`.

### Abort an execution

Interrupt a running execution. Use `--interrupt-type` to select the interrupt behavior.

```sh
harness execute execution:abort <execution_id>
harness execute execution:abort <pipeline_id>/<execution_id>
harness execute execution:abort <execution_id> --interrupt-type AbortAll|Abort|Pause|Resume|StageRollback|ExpireAll|Retry
```

### Retry a failed execution

Retry a failed execution using the `<pipeline_id>/<execution_id>` format. Use `--retry-stages` to name the stages to retry, or `--only-failed-stages` to retry just the stages that failed.

```sh
harness execute execution:retry <pipeline_id>/<execution_id>
harness execute execution:retry <pipeline_id>/<execution_id> --only-failed-stages
harness execute execution:retry <pipeline_id>/<execution_id> --retry-stages <stage_id>
harness execute execution:retry <pipeline_id>/<execution_id> --input <key>=<value> --follow
harness execute execution:retry <pipeline_id>/<execution_id> --input-file <inputs_file>.yaml
```

### Review retry history

Show the retry history and the stages that remain retryable for an execution.

```sh
harness get execution:retry_history <execution_id>
harness get execution:retry_history <pipeline_id>/<execution_id>
```

---

## Track executions

After starting a pipeline, use execution resources to monitor progress, inspect individual steps, and retrieve logs.

### List recent executions

Filter the list by status, branch, or module. The pipeline identifier is optional and scopes the list to a single pipeline.

```sh
harness list execution
harness list execution <pipeline_id>
harness list execution --status <status>
harness list execution --branch <branch_name>
harness list execution --module <module>
harness list execution --limit 5 --format json
```

### Get execution details

Add `--no-graph` to skip the stage and step graph in the response.

```sh
harness get execution <execution_id>
harness get execution <pipeline_id>/<execution_id>
harness get execution <execution_id> --no-graph
harness get execution <execution_id> --format json
```

### List steps in an execution

Each execution breaks down into individual steps with their own status and duration. The expanded list includes loop and matrix iterations.

```sh
harness list execution_step <execution_id>
harness list execution_step <pipeline_id>/<execution_id>
```

### Retrieve execution logs

List the log keys for an execution, then fetch the logs for a key. Passing an execution identifier to `get execution_log` returns every log stream for that execution. Use `--follow` to stream logs live, `--ui` to launch the interactive log viewer, and `--save` to write the log to a file.

```sh
harness list execution_log <execution_id> --all
harness get execution_log <execution_id>
harness get execution_log <log_key>
harness get execution_log <execution_id> --follow
harness get execution_log <execution_id> --ui
harness get execution_log <execution_id> --save <output_file>.log
```

---

## Triggers

Triggers start pipeline executions automatically in response to events such as git pushes, cron schedules, or webhook payloads. Trigger identifiers are scoped to a pipeline, so they use the `<pipeline_id>/<trigger_id>` format on get, update, and delete.

### List and get triggers

```sh
harness list trigger <pipeline_id>
harness list trigger <pipeline_id> --search "<search_term>"
harness get trigger <pipeline_id>/<trigger_id>
harness get trigger <pipeline_id>/<trigger_id> --format json
```

### Create a trigger

Create a trigger from a YAML body. The file carries the full trigger definition.

```sh
harness create trigger <pipeline_id> -f <trigger_file>.yaml
```

### Update a trigger

```sh
harness update trigger <pipeline_id>/<trigger_id> -f <trigger_file>.yaml
harness get trigger <pipeline_id>/<trigger_id> | harness update trigger <pipeline_id>/<trigger_id> -f -
```

### Delete a trigger

The CLI prompts for confirmation. Pass `-y` to skip the prompt in scripts.

```sh
harness delete trigger <pipeline_id>/<trigger_id>
harness delete trigger <pipeline_id>/<trigger_id> -y
```

---

## Input sets

Input sets store pre-defined runtime values for a pipeline. They let you re-run a pipeline with a consistent set of inputs without providing them manually each time. Input set identifiers use the `<pipeline_id>/<input_set_id>` format on get, update, and delete.

### List and get input sets

```sh
harness list input_set <pipeline_id>
harness get input_set <pipeline_id>/<input_set_id>
```

### Create an input set

Create an input set from a YAML body.

```sh
harness create input_set <pipeline_id> -f <input_set_file>.yaml
```

### Update an input set

```sh
harness update input_set <pipeline_id>/<input_set_id> -f <input_set_file>.yaml
harness update input_set <pipeline_id>/<input_set_id> -f -
```

### Delete an input set

The CLI prompts for confirmation. Pass `-y` to skip the prompt.

```sh
harness delete input_set <pipeline_id>/<input_set_id>
harness delete input_set <pipeline_id>/<input_set_id> -y
```

---

## Templates

Templates are reusable building blocks (stages, steps, or entire pipelines) that you reference across multiple pipeline definitions. They promote consistency and reduce duplication across your Continuous Delivery workflows.

### List and get templates

A `get template` call returns the stable version of the template.

```sh
harness list template
harness list template --all --format json
harness get template <template_id>
```

### Create a template

Create a template from a YAML body.

```sh
harness create template -f <template_file>.yaml
```

---

## Template versions

Each template carries one or more versions, and exactly one of them is marked stable. Version identifiers use the `<template_id>/<version>` format.

### List and get versions

```sh
harness list template_version <template_id>
harness get template_version <template_id>/<version>
```

### Update a version

```sh
harness update template_version <template_id>/<version> -f <template_file>.yaml
```

### Set the stable version

Mark a specific version as the stable version that `get template` returns and that pipelines resolve by default.

```sh
harness update template_version:set-stable <template_id>/<version>
```

### Delete a version

The CLI prompts for confirmation. Pass `-y` to skip the prompt.

```sh
harness delete template_version <template_id>/<version>
harness delete template_version <template_id>/<version> -y
```

---

## Freeze windows

Freeze windows block pipeline executions during specified time periods, typically around production releases, holidays, or planned maintenance. They protect environments from accidental deployments during sensitive windows.

```sh
harness list freeze_window --level account
harness list freeze_window --level project --org <org_id> --project <project_id>
harness get freeze_window <freeze_id>
harness get global_freeze
```

---

## Approval instances

When a pipeline includes an approval stage, execution pauses until the approval is granted. Use the CLI to view approval instances for an execution and to record a decision without opening the Harness UI.

### List and get approval instances

Pass the execution identifier as a positional argument when listing.

```sh
harness list approval_instance <execution_id>
harness list approval_instance <execution_id> --format json
harness get approval_instance <approval_instance_id>
```

### Approve an approval instance

Approve a waiting Harness approval instance. Use `--comment` to record a reason, and `--approver-input key=value`, which is repeatable, to supply approver inputs.

```sh
harness execute approval_instance:approve <approval_instance_id>
harness execute approval_instance:approve <approval_instance_id> --comment "<comment>"
harness execute approval_instance:approve <approval_instance_id> \
  --approver-input <key>=<value> \
  --approver-input <key>=<value>
```

### Reject an approval instance

```sh
harness execute approval_instance:reject <approval_instance_id>
harness execute approval_instance:reject <approval_instance_id> --comment "<comment>"
```

---

## Services

A service represents what you deploy: the artifact, the manifest, and any configuration that defines your application. Services are the "what" in a Continuous Delivery workflow and stay consistent across environments.

```sh
harness list service
harness list service --format json --all
harness get service <service_id>
harness get service <service_id> --format json
```

Create a service:

```sh
harness create service \
  --set identifier=<service_id> \
  --set name="<service_name>"
```

Update a service:

```sh
harness update service <service_id> --set description="<description>"
harness update service <service_id> --set tags.team=<team_name>
```

Delete a service:

```sh
harness delete service <service_id>
```

---

## Environments

An environment represents where you deploy: production, staging, QA, or any target that receives a service. Environments hold environment-specific configuration like variables, manifests, and overrides.

```sh
harness list environment
harness list environment --format json --all
harness get environment <environment_id>
harness get environment <environment_id> --format json
```

Create an environment:

```sh
harness create environment \
  --set identifier=<environment_id> \
  --set name="<environment_name>" \
  --set type=Production
```

The `type` field accepts `Production` or `PreProduction`. To create the environment from a YAML body instead, pass `-f <environment_file>.yaml`.

Update an environment:

```sh
harness update environment <environment_id> --set description="<description>"
```

Delete an environment:

```sh
harness delete environment <environment_id>
```

---

## Infrastructure definitions

An infrastructure definition describes the target compute where a service is deployed within an environment. It specifies the cluster, namespace, region, or other infrastructure details that Harness needs to execute the deployment.

```sh
harness list infrastructure --env <environment_id>
harness list infrastructure --env <environment_id> --format json
harness get infrastructure <infrastructure_id> --env <environment_id>
harness get infrastructure <infrastructure_id> --env <environment_id> --format json
```

Create an infrastructure definition:

```sh
harness create infrastructure \
  --set identifier=<infrastructure_id> \
  --set name="<infrastructure_name>" \
  --set environmentRef=<environment_id> \
  --set type=<infrastructure_type>
```

Update an infrastructure definition:

```sh
harness update infrastructure <infrastructure_id> --set description="<description>"
```

Delete an infrastructure definition:

```sh
harness delete infrastructure <infrastructure_id>
```

---

## Service overrides

Service overrides let you customize service configuration for a specific environment. They override manifests, variables, or config files without modifying the base service definition, which keeps your service portable across all environments.

```sh
harness list service_override --env <environment_id>
harness list service_override --env <environment_id> --format json
harness get service_override <override_id>
```

Create a service override:

```sh
harness create service_override \
  --set identifier=<override_id> \
  --set serviceRef=<service_id> \
  --set environmentRef=<environment_id> \
  --set type=ENV_SERVICE_OVERRIDE
```

The `type` field accepts `ENV_GLOBAL_OVERRIDE` or `ENV_SERVICE_OVERRIDE`.

Update a service override:

```sh
harness update service_override <override_id> \
  --set description="<description>"
```

Delete a service override:

```sh
harness delete service_override <override_id>
```

---

## Related articles

- Go to [CLI for Continuous Delivery](/docs/continuous-delivery/cli-for-continuous-delivery) to manage services, environments, infrastructure definitions, and service overrides from within the CD module.
- Go to [Artifact Registry](/docs/platform/harness-cli/harness-cli-commands/artifact-registry-commands) to push artifacts and run security scans.
- Go to [Infrastructure as Code Management](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) to manage Terraform and OpenTofu workspaces.
- Go to [Code Repository](/docs/platform/harness-cli/harness-cli-commands/code-repository-commands) to manage repositories and pull requests.
