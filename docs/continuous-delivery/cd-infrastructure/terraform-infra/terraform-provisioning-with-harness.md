---
title: Terraform provisioning overview
description: Use Terraform as part of your deployment process.
sidebar_position: 1
helpdocs_topic_id: boug6e884h
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

:::info

Dynamic provisioning is only supported in [Service and Environments v1](/docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2/). Dynamic provisioning will be added to Service and Environments v2 soon. Until then, you can create a stage to provision the target infrastructure and then a subsequent stage to deploy to that provisioned infrastructure.

:::

This topic describes how to use Terraform to provision infrastructure as part of your deployment process.

Harness can provision any resource that is supported by a Terraform [provider or plugin](https://www.terraform.io/docs/configuration/providers.html).

:::note

Looking for how-tos? See [Terraform how-tos](terraform-how-tos).

:::

## Terraform Provisioning Options

You can use Harness with Terraform in the following ways:

* **Dynamic Infra Provisioning:** you can provision the target infrastructure for a deployment as part of the stage's Environment settings, and then deploy to that provisioned infrastructure in the same stage.
* **General Provisioning:** provision any resources other than the target infrastructure for the deployment.
  * **Local provisioning:** you can run configuration files on the Harness delegate(s) installed in your environment.
  * **Terraform Cloud/Enterprise:** you can run Terraform Cloud workspaces by connecting Harness to your Terraform Cloud account.

You can do all methods in the same stage if you want.

## Terraform Dynamic Infra Provisioning Summary

:::info

Dynamic provisioning is only supported in [Service and Environments v1](/docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2/). Dynamic provisioning will be added to Service and Environments v2 soon. Until then, you can create a stage to provision the target infrastructure and then a subsequent stage to deploy to that provisioned infrastructure.

:::

You set up Terraform dynamic infrastructure provisioning in the following order:

1. Select **Dynamic Provisioning**. 
   1. In the Pipeline Infrastructure, you select the **Dynamic Provisioning** option and select **Terraform**. Harness automatically adds the Terraform Plan, [Harness Approval](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages), and Terraform Apply steps. You can change these steps, but plan, approve, and apply is the most common process. We use that process in our Terraform documentation.
2. In the **Terraform Plan** step, you link Harness to the Terraform scripts you want to use. You add the scripts by connecting to a Git repo where the scripts are kept and setting up any inputs and other common options.
3. **Map outputs to the** **target Infrastructure**. Harness needs a few script outputs so that it can target the provisioned infrastructure, such as namespace. You simply map some script outputs to the required Harness target infrastructure settings.
4. **Deployment**. The Pipeline deploys to the provisioned infrastructure defined in its target Infrastructure Definition.

See [Provision Target Deployment Infra Dynamically with Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform).

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

See [Build custom delegate images with third-party tools](https://developer.harness.io/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

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
