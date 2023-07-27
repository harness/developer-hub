---
title: Terraform how-tos
description: Harness has first-class support for HashiCorp Terraform.
sidebar_position: 2
helpdocs_topic_id: w6i5f7cpc9
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness has first-class support for HashiCorp [Terraform](https://www.terraform.io/) as an infrastructure provisioner.

You can use Harness with Terraform in the following ways:

* **Local provisioning:** you can run configuration files on the Harness delegate(s) installed in your environment.
* **Terraform Cloud/Enterprise:** you can run Terraform Cloud workspaces by connecting Harness to your Terraform Cloud account.

You can do both methods in the same stage if you want.

For a conceptual overview of Harness Terraform integration, go to [Terraform Provisioning with Harness](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness/).

## Running Terraform Cloud workspaces how-tos

In addition to running Terraform configuration files locally on the Harness delegate, Harness supports running Terraform Cloud and Enterprise workspaces.

For more information, go to  [Terraform Cloud deployments](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments).

## Running Terraform locally how-tos

You can use the Harness Terraform steps to provision any resources. You simply add the steps in the Deploy or Custom stage **Execution**.

For steps on how to run Terraform configuration files on Harness delegates installed in your environment, go to:

* [Plan Terraform Provisioning with the Terraform Plan Step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step)
* [Provision with the Terraform Apply Step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)
* [Remove Provisioned Infra with the Terraform Destroy Step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/remove-provisioned-infra-with-terraform-destroy)
* [Rollback Provisioned Infra with the Terraform Rollback Step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step)


### Important: Install Terraform on delegates

Terraform must be installed on the delegate to use **local** Terraform configuration files in Harness Terraform steps. This is not required for running Terraform Cloud/Enterprise workspaces.

You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

Go to [Build custom delegate images with third-party tools](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/).

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

### Target OS and architecture

You will need to change the following scripts based on the operating system and architecture of the machine that is running the delegate.

- Linux on x86(Intel or AMD): linux_amd64
- Linux on Arm: linux_arm64
- MacOs on x86(Intel): darwin_amd64
- MacOs on ARM(Apple): darwin_arm64

### Custom delegate image

The recommended method for installing third party tools on your delegate is to create your own delegate image, push it to a container registry, and then to modify your delegate deployments to use your new custom image.

For more information, go to [Build custom delegate images with third-party tools](https://developer.harness.io/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/).

```dockerfile
ARG DELEGATE_TAG=23.03.78705
ARG DELEGATE_IMAGE=harness/delegate
FROM $DELEGATE_IMAGE:$DELEGATE_TAG

USER 0

RUN useradd -u 1001 -g 0 harness

# Install TF
RUN curl -LO  https://releases.hashicorp.com/terraform/1.3.1/terraform_1.3.1_linux_amd64.zip \
  && unzip -q terraform_1.3.1_linux_amd64.zip \
  && mv ./terraform /usr/bin/ \
  && terraform --version

USER 1001
```

### Init script

Alternatively, you can install Terraform when a delegate pod is launched by specifying an initialization script in the delegate YAML `INIT_SCRIPT` [environment variable](https://developer.harness.io/docs/platform/delegates/delegate-reference/delegate-environment-variables/).

```bash
# Install TF  
microdnf install unzip
curl -O -L https://releases.hashicorp.com/terraform/1.3.5/terraform_1.3.5_linux_amd64.zip
unzip terraform_1.3.5_linux_amd64.zip
mv ./terraform /usr/bin/

# Check TF install
terraform --version
```

## References

[Download Terraform](https://www.terraform.io/downloads) from Hashicorp.
