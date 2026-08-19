---
title: Developer Environment Setup
description: Set up a local environment for Harness Template Library development using either the DevContainer or the container-based Makefile workflow.
sidebar_label: Developer Environment Setup
keywords:
  - developer environment setup
  - devcontainer setup
  - local container development
tags:
  - hsf
  - configurations
sidebar_position: 10
redirect_from:
  - /kb/reference-architectures/hsf/htl/developer-env-setup
---

Developing for the Harness Template Library (HTL) requires a local environment with
Docker, Terraform or OpenTofu, and Git installed. Choose either the DevContainer or the
local container-based Makefile workflow described below to get set up.

---

## Before you begin

- **Container engine:** A supported version of Docker or a [Docker-compatible engine](https://code.visualstudio.com/remote/advancedcontainers/docker-options).
- **Git:** Git installed locally so you can clone the Harness Template Library repository.
- **Terraform or OpenTofu:** Required for template development. Both DevContainer and Makefile workflows supply these inside the container, so a local install is optional.

---

## Use the DevContainer in this repository

This repository includes support for DevContainers. To install this into your environment, you need the following:

- A supported version of Docker or a [Docker-compatible engine](https://code.visualstudio.com/remote/advancedcontainers/docker-options)
- The [DevContainers extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), or a compatible extension for your IDE

Once your development environment is ready, clone this repository into your IDE. For VS Code installations, you are prompted to reopen the workspace in a new container.

To modify the DevContainer, edit the `devcontainer.json` file at the root of this repository, then reload.

<!-- HDH-542: CDE section hidden from navigation. Section and link preserved below.
## Use Harness CDE (Gitspaces)

Harness supports the use of Cloud Development Environments (Harness Gitspaces), which launch an interactive environment using the Harness CDE module. Go to [Harness Cloud Development Environments](/docs/cloud-development-environments) to review how to configure one.
-->

---

## Local container-based development

A robust `Makefile` configuration is included within this repository. The command file contains frequently used shortcuts and commands. To use this solution, you need the following:

- A supported version of Docker or a [Docker-compatible engine](https://code.visualstudio.com/remote/advancedcontainers/docker-options)
- `Make` installed for your OS: [Windows](https://gnuwin32.sourceforge.net/packages/make.htm), or Mac with Xcode command line tools installed [or with Homebrew GNU Make](https://formulae.brew.sh/formula/make)

Go to [Local Testing Using Make](/docs/harness-solutions-factory/configurations/local-testing-using-make) to review the testing workflow in detail.

To get the current list of available commands, enter `make help` in a Terminal session in this directory:

```text
debug            Loads the current directory into the container to allow running commands locally
init             Executes Terraform/Tofu `init`. Pass `migrate` to delete any local `backed.tf` and a `-migrate-state` will be performed.
plan             Executes a Terraform/Tofu `plan`
plan_output      Executes a Terraform/Tofu `plan`
plan_show        Executes a Terraform/Tofu `plan`
apply            Automatically runs a Terraform/Tofu `apply`
destroy          Automatically runs a Terraform/Tofu `destroy`
refresh          Refreshes the statefile
output           Display the Terraform/Tofu outputs | To return a single output, pass `RESOURCE=<terraform-output-name>`
fmt              Formats the Terraform files in the current directory
fmt_all          Formats all Terraform files in the entire repository
testing_cleanup  Removes the local `.terraform` and `.terraform.lock.hcl` files.
cycle            Idempotency Check. Runs the commands - init, destroy, apply, and plan
teardown         Full Suite Cleanup.  Runs the commands - destroy and testing_cleanup
all              End-to-end testing. Runs the commands - init, fmt, plan, apply, destroy, testing_cleanup
version_tests    Runs an entire suite of executions for a template based on the chose type. Supported types: terraform or tofu - e.g `type=tofu`
full_suite       Cycles a full End-to-end testing for all versions listed. Reads all versions in the .terraform_verions and .tofu_versions files.
generate         Generate a new directory using a template type. The argument `name=<new-template-name>` needs to be passed along with this command
```

---

## Next steps

Your local environment is ready for Harness Template Library development. Continue with the following:

- [Local Testing Using Make](/docs/harness-solutions-factory/configurations/local-testing-using-make): Run the full test suite against your templates locally.
- [Using mise](/docs/harness-solutions-factory/configurations/using-mise): Manage Terraform and OpenTofu tool versions consistently.
- [Create a new template in a custom HTL](/docs/harness-solutions-factory/custom-harness-template-library/creating-new-template-custom-htl): Build your first template once your environment is set up.
