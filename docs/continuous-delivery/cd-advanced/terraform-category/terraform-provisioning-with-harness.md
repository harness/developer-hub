---
title: Terraform Provisioning with Harness
description: Use Terraform as part of your deployment process.
sidebar_position: 2
helpdocs_topic_id: boug6e884h
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use Terraform to provision infrastructure as part of your deployment process.

Harness can provision any resource that is supported by a Terraform [provider or plugin](https://www.terraform.io/docs/configuration/providers.html).

:::note

Looking for how-tos? See [Terraform how-tos](terraform-how-tos.md).

:::

## Terraform Provisioning Options

You can use Harness with Terraform in two ways:

* **Target Infra Provisioning:** provision the target infrastructure for a deployment, and then deploy to that provisioned infrastructure.
* **Non-target Provisioning:** provision any resources other than the target infrastructure for the deployment.

You can do both in the same stage if you want.

## Terraform Target Infra Provisioning Summary

You set up a Terraform target infrastructure provisioning in the following order:

1. Select **Dynamic Provisioning**. In the Pipeline Infrastructure, you select the **Dynamic Provisioning** option and select **Terraform**. Harness automatically adds the Terraform Plan, [Harness Approval](../approvals/using-harness-approval-steps-in-cd-stages.md), and Terraform Apply steps. You can change these steps, but plan, approve, and apply is the most common process. We use that process in our Terraform documentation.
2. In the **Terraform Plan** step, you link Harness to the Terraform scripts you want to use. You add the scripts by connecting to a Git repo where the scripts are kept and setting up any inputs and other common options.
3. **Map outputs to the** **target Infrastructure**. Harness needs a few script outputs so that it can target the provisioned infrastructure, such as namespace. You simply map some script outputs to the required Harness target infrastructure settings.
4. **Deployment**. The Pipeline deploys to the provisioned infrastructure defined in its target Infrastructure Definition.

See [Provision Target Deployment Infra Dynamically with Terraform](../../cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform.md).

### Limitations

Infrastructure provisioning is limited to what is available in the target environment.

For example, the cloud-agnostic Kubernetes infrastructure requires that you have an existing cluster, so you cannot provision a new cluster. But it does let you provision a namespace.

The Google Kubernetes Engine infrastructure option lets you provision a cluster and namespace.

## Use Terraform for Non-deployment Provisioning

You can use the Harness Terraform steps to provision any non-target resources also. You simply add the steps in the stage Execution.

See:

* [Plan Terraform Provisioning with the Terraform Plan Step](run-a-terraform-plan-with-the-terraform-plan-step.md)
* [Provision with the Terraform Apply Step](run-a-terraform-plan-with-the-terraform-apply-step.md)
* [Remove Provisioned Infra with the Terraform Destroy Step](remove-provisioned-infra-with-terraform-destroy.md)
* [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step.md)

## Terraform Rollback

When rollback happens, Harness rolls back the provisioned infrastructure to the previous successful version of the Terraform state.

Harness won't increment the serial in the state, but perform a hard rollback to the exact version of the state provided.

Harness determines what to rollback using the Provision Identifier entered in the Terraform Rollback step.

If you've made these settings using Harness expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

See [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step.md).

### Rollback Limitations

Let's say you deployed two modules successfully already: module1 and module2. Next, you try to deploy module3, but deployment failed. Harness will roll back to the successful state of module1 and module2.

However, let's look at the situation where module3 succeeds and now you have module1, module2, and module3 deployed. If the next deployment fails, the rollback will only roll back to the Terraform state with module3 deployed. Module1 and module2 weren't in the previous Terraform state, so the rollback excludes them.

## Important: Install Terraform on Delegates

Terraform must be installed on the Delegate to use a Harness Terraform Provisioner. You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

See [Install Software on the Delegate with Initialization Scripts](../../../platform/2_Delegates/delegate-guide/run-scripts-on-delegates.md).


```bash
# Install TF  
curl -O -L  https://releases.hashicorp.com/terraform/0.12.25/terraform_0.12.25_linux_amd64.zip  
unzip terraform_0.12.25_linux_amd64.zip  
mv ./terraform /usr/bin/  
# Check TF install  
terraform --version
```
