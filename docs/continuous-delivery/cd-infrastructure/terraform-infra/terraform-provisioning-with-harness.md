---
title: Terraform Provisioning Overview
description: Use Terraform as part of your deployment process.
sidebar_label: Overview
sidebar_position: 1
helpdocs_topic_id: boug6e884h
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
keywords:
  - terraform provisioning
  - infrastructure as code
  - terraform harness
  - terraform integration
tags:
  - terraform
  - infrastructure
canonical_url: https://www.harness.io/blog/automation-of-harness-e2e-entity-creation-using-opentofu
redirect_from:
  - /docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-how-tos
---

This topic describes how to use Terraform to provision infrastructure as part of your deployment process. Harness can provision any resource that is supported by a Terraform [provider or plugin](https://www.terraform.io/docs/configuration/providers.html). You can provision target deployment infrastructure dynamically, run ad hoc provisioning tasks, or integrate with Terraform Cloud and Enterprise workspaces.

---

## What you will learn

- **Terraform provisioning options:** Understand dynamic infrastructure provisioning, ad hoc provisioning, and Terraform Cloud integration.
- **Rollback behavior:** Learn how Harness handles Terraform state rollback when deployments fail.
- **Delegate requirements:** Understand Terraform installation requirements for local execution.

---

## Terraform provisioning options

You can use Harness with Terraform in the following ways:

* **Dynamic infrastructure provisioning:** Provision the target infrastructure for a deployment as part of the stage's **Environment** settings, and then deploy to that provisioned infrastructure in the same stage.
* **Ad hoc provisioning:** Provision any resources other than the target infrastructure for the deployment.
  * **Local provisioning:** Run configuration files on the Harness Delegate(s) installed in your environment.
  * **Terraform Cloud/Enterprise:** Run Terraform Cloud workspaces by connecting Harness to your Terraform Cloud account.

You can use all methods in the same stage.

Go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview) to understand the differences between these provisioning options.

---

## Dynamic infrastructure provisioning summary

Dynamic provisioning uses your Terraform scripts to provision the target deployment infrastructure for the current pipeline stage. Dynamic provisioning with Terraform is supported for most Harness integrations. The steps required for each integration are covered in their documentation.

Go to [Provision infrastructure dynamically with Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform) to configure dynamic provisioning.

We support using Terraform provisioning with an **OIDC-enabled AWS connector**, but it requires Delegate version `854xx` or later. Go to [AWS OIDC connector reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) to configure OIDC authentication.

### Limitations

Infrastructure provisioning is limited to what is available in the target environment.

For example, the cloud-agnostic Kubernetes infrastructure requires that you have an existing cluster, so you cannot provision a new cluster. But it does let you provision a namespace.

The Google Kubernetes Engine infrastructure option lets you provision a cluster and namespace.

---

## Running Terraform locally

You can use the Harness Terraform steps to provision any resources. You add the steps in the Deploy or Custom stage **Execution**.

Go to the following pages to learn how to run Terraform configuration files on Harness Delegates installed in your environment:

* Go to [Plan Terraform provisioning with the Terraform Plan step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step) to preview infrastructure changes before applying them.
* Go to [Provision with the Terraform Apply step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step) to create or update infrastructure.
* Go to [Remove infrastructure with the Terraform Destroy step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/remove-provisioned-infra-with-terraform-destroy) to remove provisioned infrastructure.
* Go to [Rollback infrastructure with the Terraform Rollback step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step) to revert to a previous Terraform state.

---

### Terraform rollback

When rollback happens, Harness rolls back the provisioned infrastructure to the previous successful version of the Terraform state.

Harness will not increment the serial in the state, but perform a hard rollback to the exact version of the state provided.

Harness determines what to rollback using the Provisioner Identifier entered in the Terraform Rollback step.

If you have made these settings using Harness expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

Go to [Rollback infrastructure with the Terraform Rollback step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step) to configure rollback steps.

---

### Rollback limitations

Let us say you deployed two modules successfully already: module1 and module2. Next, you try to deploy module3, but deployment failed. Harness will roll back to the successful state of module1 and module2.

However, let us look at the situation where module3 succeeds and now you have module1, module2, and module3 deployed. If the next deployment fails, the rollback will only roll back to the Terraform state with module3 deployed. Module1 and module2 were not in the previous Terraform state, so the rollback excludes them.

---

### Install Terraform on delegates

Terraform must be installed on the delegate to use local Terraform configuration files in Harness Terraform steps. 

You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

Go to [Build custom delegate images with third-party tools](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools) to install Terraform on delegates.

The Harness Delegate uses RedHat Universal Base Image (redhat/ubi8).

The following example script installs Terraform 1.9.8 (current stable release as of January 2026):

```bash
#!/bin/bash

# Update the system and install necessary tools
sudo yum update -y
sudo yum install -y curl unzip

# Install Terraform
TERRAFORM_VERSION="1.9.8"
TERRAFORM_URL="https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip"
curl -LO $TERRAFORM_URL
unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip
sudo install terraform /usr/local/bin/
rm terraform_${TERRAFORM_VERSION}_linux_amd64.zip

# Check TF install
terraform --version
```

---

## Running Terraform on remote workspaces

In addition to running Terraform configuration files locally on the Harness Delegate, Harness supports running Terraform Cloud and Enterprise workspaces. 

There are two ways you can run Terraform Cloud and Enterprise workspaces:

- **Run configuration files locally using the CLI** and configure them to execute on a remote workspace. To do this, you need to add the remote configuration to the Terraform files. Afterward, during the Terraform Plan and Apply steps, select the **Run on Remote Workspace** option so that Harness can recognize that the execution will be done remotely. Go to [Running Terraform locally](#running-terraform-locally) to learn how to configure local execution with remote state.

- **Set up the workspace and Terraform files on a Terraform Cloud/Enterprise account** and trigger runs from Harness pipelines. Go to [Terraform Cloud deployments](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments) to configure Terraform Cloud integration.

---

## Terraform logs

All logs produced by Terraform are printed in Harness step execution logs.

Logs that are coming from `stdout` will be printed as they are, and logs from `stderr` will be printed in red.

---

## Related concepts

You have learned about Terraform provisioning options in Harness. You can now configure Terraform steps in your pipelines to provision infrastructure dynamically or run ad hoc provisioning tasks.

- Go to [Provision infrastructure dynamically with Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform) to provision target deployment infrastructure in pipeline stages.
- Go to [Terraform Cloud deployments](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments) to integrate with Terraform Cloud and Enterprise workspaces.
- Go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview) to understand other provisioning options available in Harness.
