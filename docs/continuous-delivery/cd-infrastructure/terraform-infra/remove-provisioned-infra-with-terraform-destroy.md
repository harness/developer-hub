---
title: Remove Infra with the Terraform Destroy step
description: Remove any Terraform provisioned infrastructure.
sidebar_position: 6
helpdocs_topic_id: j75xc704c8
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to add a Terraform Destroy step to remove any provisioned infrastructure, just like running the `terraform destroy` command. See [destroy](https://www.terraform.io/docs/commands/destroy.html) from Terraform.

The **Terraform Destroy** step is independent of any other Terraform provisioning steps. It's not restricted to removing the infrastructure deployed in its stage. It can remove any infrastructure you've provisioned using Harness.

## Before You Begin

* [Terraform Provisioning with Harness](terraform-provisioning-with-harness)
* [Provision Target Deployment Infra Dynamically with Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform)
* [Provision with the Terraform Apply Step](run-a-terraform-plan-with-the-terraform-apply-step)

## Important: Install Terraform on Delegates

Terraform must be installed on the Delegate to use a Harness Terraform Provisioner. You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

See [Build custom delegate images with third-party tools](https://developer.harness.io/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools).


```bash
# Install TF  
curl -O -L  https://releases.hashicorp.com/terraform/0.12.25/terraform_0.12.25_linux_amd64.zip  
unzip terraform_0.12.25_linux_amd64.zip  
mv ./terraform /usr/bin/  
# Check TF install  
terraform --version
```
## Review: What Gets Destroyed?

When you add Terraform Plan and Apply steps, you specify the Terraform script that Harness will use for provisioning. You add a **Provisioner Identifier** to each step to identify the provisioning.

![](./static/remove-provisioned-infra-with-terraform-destroy-00.png)

When you destroy the provisioned infrastructure, you specify the same **Provisioner Identifier** in the Terraform Destroy step. The Provisioner Identifier enables Harness to locate the same Terraform script used for provisioning.

![](./static/remove-provisioned-infra-with-terraform-destroy-01.png)

## Step 1: Add the Terraform Destroy Step

You can add the Terraform Destroy step in the following places:

* The **Execution** steps of a stage.
* The steps of an **Infrastructure**'s **Dynamic Provisioning** section.
* The **Rollback** steps of a stage's **Execution** or **Infrastructure** using **Dynamic Provisioning**.

In **Name**, enter a name for the step. You can use the name to reference the Terraform Destroy settings.

## Step 2: Configuration Type

There are three options:

* **Inline:** Removes the provisioned resources you identify using **Provisioner Identifier** and other settings.
* **Inherit from Plan:** Removes the resources defined in the Harness **Terraform Plan** step that you identify using **Provisioner Identifier**. Similar to `terraform plan -destroy`.
* **Inherit from Apply:** Removes the resources defined in the Harness Terraform Apply step that you identify using **Provisioner Identifier**. Similar to `terraform destroy`.

## Step 3: Reference the Provisioner Identifier

In **Provisioner Identifier**, enter the same Provisioner Identifier you used in the Terraform Apply step that provisioning the resources you want to destroy.

Click **Apply Changes**.

The Terraform Destroy step is added.

## Command line options

:::note

Currently, FEATURE_NAME is behind the feature flag `CDS_TERRAFORM_CLI_OPTIONS_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

This setting allows you to set the Terraform CLI options for Terraform commands depending on the Terraform step type. For example: `-lock=false`, `-lock-timeout=0s`.

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-18.png)

## Skip Terraform Refresh

Terraform refresh command won't be running when this setting is selected.


## See Also

* [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step)

