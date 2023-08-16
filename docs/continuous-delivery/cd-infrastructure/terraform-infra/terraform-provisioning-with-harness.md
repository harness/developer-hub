---
title: Terraform provisioning overview
description: Use Terraform as part of your deployment process.
sidebar_position: 1
helpdocs_topic_id: boug6e884h
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---


This topic describes how to use Terraform to provision infrastructure as part of your deployment process.

Harness can provision any resource that is supported by a Terraform [provider or plugin](https://www.terraform.io/docs/configuration/providers.html).

:::note

Looking for how-tos? See [Terraform how-tos](terraform-how-tos).

:::

## Terraform provisioning options

You can use Harness with Terraform in the following ways:

* **Dynamic infrastructure provisioning:** you can provision the target infrastructure for a deployment as part of the stage's **Environment** settings, and then deploy to that provisioned infrastructure in the same stage.
* **Ad hoc provisioning:** provision any resources other than the target infrastructure for the deployment.
  * **Local provisioning:** you can run configuration files on the Harness delegate(s) installed in your environment.
  * **Terraform Cloud/Enterprise:** you can run Terraform Cloud workspaces by connecting Harness to your Terraform Cloud account.

You can do all methods in the same stage if you want.

For details on these provisioning options, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

## Terraform dynamic infrastructure provisioning summary

Dynamic provisioning uses your Terraform scripts to provision the target deployment infrastructure for the current pipeline stage.

Dynamic provisioning with Terraform is supported for most Harness integrations. The steps required for each integration are covered in their documentation.

For more information, go to [Provision Target Deployment Infra Dynamically with Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform).

### Limitations

Infrastructure provisioning is limited to what is available in the target environment.

For example, the cloud-agnostic Kubernetes infrastructure requires that you have an existing cluster, so you cannot provision a new cluster. But it does let you provision a namespace.

The Google Kubernetes Engine infrastructure option lets you provision a cluster and namespace.


## Running Terraform locally

You can use the Harness Terraform steps to provision any resources. You simply add the steps in the Deploy or Custom stage **Execution**.

For steps on how to run Terraform configuration files on Harness delegates installed in your environment, go to:

* [Plan Terraform Provisioning with the Terraform Plan Step](run-a-terraform-plan-with-the-terraform-plan-step)
* [Provision with the Terraform Apply Step](run-a-terraform-plan-with-the-terraform-apply-step)
* [Remove Provisioned Infra with the Terraform Destroy Step](remove-provisioned-infra-with-terraform-destroy)
* [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step)

### Terraform Rollback

When rollback happens, Harness rolls back the provisioned infrastructure to the previous successful version of the Terraform state.

Harness won't increment the serial in the state, but perform a hard rollback to the exact version of the state provided.

Harness determines what to rollback using the Provision Identifier entered in the Terraform Rollback step.

If you've made these settings using Harness expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

See [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step).

### Rollback Limitations

Let's say you deployed two modules successfully already: module1 and module2. Next, you try to deploy module3, but deployment failed. Harness will roll back to the successful state of module1 and module2.

However, let's look at the situation where module3 succeeds and now you have module1, module2, and module3 deployed. If the next deployment fails, the rollback will only roll back to the Terraform state with module3 deployed. Module1 and module2 weren't in the previous Terraform state, so the rollback excludes them.

### Important: Install Terraform on Delegates

Terraform must be installed on the delegate to use local Terraform configuration files in Harness Terraform steps. 

You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

For more information, go to [Build custom delegate images with third-party tools](https://developer.harness.io/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/).

The Harness delegate uses RedHat Universal Base Image (redhat/ubi8).

Here's an example of the script to install Terraform:

```bash
#!/bin/bash

# Update the system and install necessary tools
sudo yum update -y
sudo yum install -y curl unzip

# Install Terraform
TERRAFORM_VERSION="1.3.5"
TERRAFORM_URL="https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip"
curl -LO $TERRAFORM_URL
unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip
sudo install terraform /usr/local/bin/
rm terraform_${TERRAFORM_VERSION}_linux_amd64.zip

# Check TF install
terraform --version
```

## Running Terraform Cloud workspaces

In addition to running Terraform configuration files locally on the Harness delegate, Harness supports running Terraform Cloud and Enterprise workspaces.

For more information, go to  [Terraform Cloud deployments](terraform-cloud-deployments.md).
