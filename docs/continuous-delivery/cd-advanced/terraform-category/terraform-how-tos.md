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

See [Install Software on the Delegate with Initialization Scripts](../../../platform/2_Delegates/delegate-guide/run-scripts-on-delegates.md).


```bash
# Install TF  
microdnf install unzip  
curl -O -L https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_darwin_amd64.zip  
unzip terraform_1.1.9_darwin_amd64.zip  
mv ./terraform /usr/bin/  
# Check TF install  
terraform --version
```
See also: [Download Terraform](https://www.terraform.io/downloads) from Hashicorp.

