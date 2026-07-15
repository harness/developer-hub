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

## What will you learn in this topic?

By the end of this page, you will know how to:

- List, create, update, and delete pipeline definitions as YAML.
- Execute a pipeline with runtime inputs, input sets, or YAML files.
- Track execution status and retrieve step-level logs.
- Work with triggers, input sets, templates, and freeze windows.
- Create and manage services, environments, infrastructure definitions, and service overrides.

---

## Before you begin

- **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.
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

Returns the full YAML definition:

```sh
harness get pipeline <pipeline_id>
harness get pipeline <pipeline_id> --format json
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

---

## Execute a pipeline

Running a pipeline starts the defined stages, streams progress to your terminal, and exits with the pipeline's terminal status (0 for success, 1 for failure).

### Run directly

```sh
harness execute pipeline <pipeline_id>
harness execute pipeline <pipeline_id> --branch <branch_name>
```

### Run with an input set

Input sets are pre-saved collections of runtime values that let you repeat a known configuration without manual input:

```sh
harness execute pipeline:input_set <pipeline_id> --input-set <input_set_id>
```

### Run with a YAML inputs file

For fully scripted CI runs, pass all runtime inputs in a file:

```sh
harness execute pipeline <pipeline_id> -f <inputs_file>.yaml
```

### Check required inputs before running

Inspect the runtime input template to see what values the pipeline expects:

```sh
harness get runtime_input_template <pipeline_id>
```

---

## Track executions

After starting a pipeline, use execution resources to monitor progress, inspect individual steps, and retrieve logs.

### List recent executions

```sh
harness list execution
harness list execution <pipeline_id>
harness list execution --limit 5 --format json
```

### Get execution details

```sh
harness get execution <execution_id>
harness get execution <execution_id> --format json
```

### List steps in an execution

Each execution breaks down into individual steps with their own status and duration:

```sh
harness list execution_step <execution_id>
```

### Retrieve execution logs

Fetch the log output for an entire execution or drill into specific steps:

```sh
harness list execution_log <execution_id> --all
harness get execution_log <execution_id>
```

---

## Triggers

Triggers start pipeline executions automatically in response to events such as git pushes, cron schedules, or webhook payloads. Use the CLI to view which triggers are configured and their current state. Pass the pipeline identifier as a positional argument.

```sh
harness list trigger <pipeline_id>
harness get trigger <trigger_id>
harness get trigger <trigger_id> --format json
```

---

## Input sets

Input sets store pre-defined runtime values for a pipeline. They let you re-run a pipeline with a consistent set of inputs without providing them manually each time. Pass the pipeline identifier as a positional argument when listing.

```sh
harness list input_set <pipeline_id>
harness get input_set <input_set_id>
```

---

## Templates

Templates are reusable building blocks (stages, steps, or entire pipelines) that you reference across multiple pipeline definitions. They promote consistency and reduce duplication across your Continuous Delivery workflows.

```sh
harness list template
harness list template --all --format json
harness get template <template_id>
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

When a pipeline includes an approval stage, execution pauses until the approval is granted. Use the CLI to view approval instances for a specific execution. Pass the execution identifier as a positional argument.

```sh
harness list approval_instance <execution_id>
harness list approval_instance <execution_id> --format json
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
  --set type=<environment_type>
```

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
  --set environmentRef=<environment_id>
```

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

## Next steps

- Go to [Artifact Registry](/docs/platform/harness-cli/harness-cli-commands/artifact-registry-commands) to push artifacts and run security scans.
- Go to [Infrastructure as Code Management](/docs/platform/harness-cli/harness-cli-commands/iacm-commands) to manage Terraform and OpenTofu workspaces.
- Go to [Code Repository](/docs/platform/harness-cli/harness-cli-commands/code-repository-commands) to manage repositories and pull requests.
