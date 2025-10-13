---
title: Local Testing Using Make
description: This document details the available Makefile commands.  The goal is to simplify the various commands to rapid testing and prototyping.
sidebar_position: 2
---
This document details the available Makefile commands.  The goal is to simplify the various commands to rapid testing and prototyping.

## Prerequisites

This document assumes that your local development environment has followed the steps outline in the [Developer Environment Setup](./developer-env-setup.md) guide.  Please review those requirements to ensure that you have all the tools necessary to proceed.

## Commands
_Note: a local list of available target commands can be printed by  running the command `make help`_

### TERRAFORM CONTROLS
| Command | Description | Notes |
| --- | --- | --- |
| init [migrate] | executes Terraform/Tofu `init` | If the command includes `migrate`, then any local `backed.tf` will be removed and a `-migrate-state` will be performed.|
| plan | Executes a Terraform/Tofu `plan` ||
| plan_output | Executes a Terraform/Tofu `plan` includes generating a tfplan file in the local directory ||
| plan_show | Executes a Terraform/Tofu `show` on a previously generated terraform.tfplan file and stores the file in human-readable format as terraform.tfplan.out ||
| apply | Automatically runs a Terraform/Tofu `apply` ||
| destroy | Automatically runs a Terraform/Tofu `destroy` ||
| refresh | Refreshes the statefile ||
| output [RESOURCE] | Display the Terraform/Tofu outputs | To return a single output, pass `RESOURCE=<terraform-output-name>`|
| fmt | Formats the Terraform files in the current directory ||
| fmt_all | Formats all Terraform files in the entire repository ||
| testing_cleanup | Removes the local `.terraform` and `.terraform.lock.hcl` files. ||
| debug | Loads the current directory into the container to allow running commands locally ||
| help | Prints all of the local targets ||

### TERRAFORM Test Suites
| Command | Description | Notes |
| --- | --- | --- |
| cycle | Idempotency Check | Runs the commands - init, destroy, apply, and plan |
| teardown | Full Suite Cleanup | Runs the commands - destroy and testing_cleanup|
| deploy [dryrun] | Applies the Terraform template | Runs the commands - init, plan, and apply. Note: If the argument `dryrun` is passed then the `apply` step is skipped.|
| all | End-to-end testing | Runs the commands - init, fmt, plan, apply, destroy, testing_cleanup |
| version_tests [type] | Runs an entire suite of executions for a template based on the chose type | Supported types: terraform or tofu - e.g `type=tofu` |
| full_suite | Cycles a full End-to-end testing for all versions listed | Reads all versions in the .terraform_verions and .tofu_versions files. |

### SCAFFOLD CONTROLS
| Command | Description | Notes |
| --- | --- | --- |
| generate type=terraform [name]| Generate a new directory using a template type  | The argument `name=<new-template-name>` needs to be passed along with this command |

