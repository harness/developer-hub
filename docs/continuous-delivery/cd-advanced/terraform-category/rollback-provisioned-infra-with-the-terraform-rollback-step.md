---
title: Rollback Infra with the Terraform Rollback step
description: Roll back provisioning and return to pre-deployment state.
sidebar_position: 6
helpdocs_topic_id: jgi6d73noy
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to roll back your provisioned infrastructure and resources and return your environment to its pre-deployment state.

## Before You Begin

* [Terraform Provisioning with Harness](terraform-provisioning-with-harness.md)
* [Provision Target Deployment Infra Dynamically with Terraform](../../cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform.md)
* [Provision with the Terraform Apply Step](run-a-terraform-plan-with-the-terraform-apply-step.md)

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

## Review: Terraform Rollback

When rollback happens, Harness rolls back the provisioned infrastructure to the previous successful version of the Terraform state.

Harness won't increment the serial in the state, but perform a hard rollback to the exact version of the state provided.

Harness determines what to rollback using the **Provisioner Identifier**.

If you've made these settings expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

### Rollback Limitations

Let's say you deployed two modules successfully already: module1 and module2. Next, you try to deploy module3, but deployment failed. Harness will roll back to the successful state of module1 and module2.

However, let's look at the situation where module3 succeeds and now you have module1, module2, and module3 deployed. If the next deployment fails, the rollback will only roll back to the Terraform state with module3 deployed. Module1 and module2 weren't in the previous Terraform state, so the rollback excludes them.

## Step 1: Add the Terraform Rollback Step

You can add the Terraform Rollback step in two places:

* The **Rollback** steps of a stage's Infrastructure, in **Dynamic Provisioning**:

![](./static/rollback-provisioned-infra-with-the-terraform-rollback-step-16.png)

* The **Rollback** steps of a stage's **Execution**:

![](./static/rollback-provisioned-infra-with-the-terraform-rollback-step-17.png)

Add the **Terraform Rollback** step.

In **Name**, enter a name for the step. You can use the name to reference the Terraform Rollback settings.

## Step 2: Reference the Provisioner Identifier

In **Provisioner Identifier**, enter the same Provisioner Identifier you used in the Terraform Plan and Apply steps.

![](./static/rollback-provisioned-infra-with-the-terraform-rollback-step-18.png)

Click **Apply Changes**.

The Terraform Rollback step is added to the **Rollback** steps.

## See Also

* [Remove Provisioned Infra with Terraform Destroy](remove-provisioned-infra-with-terraform-destroy.md)

