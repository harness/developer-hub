---
title: Terraform how-tos
description: Harness has first-class support for HashiCorp Terraform.
sidebar_position: 1
helpdocs_topic_id: w6i5f7cpc9
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness has first-class support for HashiCorp [Terraform](https://www.terraform.io/) as an infrastructure provisioner.

See the following Terraform How-tos:

* [Provision Target Deployment Infra Dynamically with Terraform](../../cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform.md)
* [Plan Terraform Provisioning with the Terraform Plan Step](run-a-terraform-plan-with-the-terraform-plan-step.md)
* [Provision with the Terraform Apply Step](run-a-terraform-plan-with-the-terraform-apply-step.md)
* [Remove Provisioned Infra with the Terraform Destroy Step](remove-provisioned-infra-with-terraform-destroy.md)
* [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step.md)

For a conceptual overview of Harness Terraform integration, see [Terraform Provisioning with Harness](terraform-provisioning-with-harness.md).

## Important: Install Terraform on Delegates

Terraform must be installed on the Delegate to use a Harness Terraform Provisioner. You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

See [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools.md).

### Target OS and architecture

You will need to change the following scripts based on the operating system and architecture of the machine that is running the delegate.

- Linux on x86(Intel or AMD): linux_amd64
- Linux on Arm: linux_arm64
- MacOs on x86(Intel): darwin_amd64
- MacOs on ARM(Apple): darwin_arm64

### Custom delegate image

The recommended method for installing third party tools on your delegate is to create your own delegate image, push it to a container registry, and then to modify your delegate deployments to use your new custom image.

For more information, go to [Build custom delegate images with third-party tools](https://developer.harness.io/docs/platform/delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools/).

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

### Init Script

Alternativly you can install terraform when a delegate pod is launched by specifying an initilization script in the delegates environment.

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
