---
title: Provision target deployment infrastructure dynamically with Terraform
description: Dynamically provision the target infrastructure using the Terraform Plan and Apply steps.
sidebar_position: 3
helpdocs_topic_id: uznls2lvod
helpdocs_category_id: y5cc950ks3
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Terraform in Harness CD pipeline stages for ad hoc provisioning or to provision the target deployment infrastructure for the stage.

This topic provides a brief overview of the steps involved in provisioning a CD stage's target deployment infrastructure using the **Terraform Plan** and **Apply** steps.

This topic also covers some important requirements.

## Terraform dynamic infrastructure provisioning summary

Setting up dynamic provisioning involves adding Terraform scripts to the stage **Environment** settings that provision the pipeline stage's target infrastructure.

Next, you map specific, required script outputs to the Harness **Infrastructure Definition** for the stage, such as the target namespace.

During deployment, Harness provisions the target deployment infrastructure and then the stage's **Execution** steps deploy to the provisioned infrastructure.


### Dynamic provisioning steps for different deployment types

Each of the deployment types Harness supports (Kubernetes, AWS ECS, etc.) require that you map different Terraform script outputs to the Harness infrastructure settings in the pipeline stage.

To see how to set up dynamic provisioning for each deployment type, go to the following topics:

- [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure)
  - The Kubernetes infrastructure is also used for Helm, Native Helm, and Kustomize deployment types.
- [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- [Spot Elastigroup](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment)
- [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions)
- [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-lambda-cd-quickstart)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)	
- [Windows VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)
- [Custom deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial)

## Important: install Terraform on delegates

Terraform must be installed on the Delegate to use a Harness Terraform Provisioner. You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

See [Build custom delegate images with third-party tools](https://developer.harness.io/docs/platform/Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools).


```bash
#!/bin/bash

# Check if microdnf is installed
if ! command -v microdnf &> /dev/null
then
    echo "microdnf could not be found. Installing..."
    yum install -y microdnf
fi

# Update package cache
microdnf update

# Install Terraform
microdnf install -y terraform

```

## Dynamic provisioning steps

When you enable dynamic provisioning in a CD Deploy stage's **Environment** settings, Harness automatically adds the necessary Harness Terraform steps:

- **Terraform Plan step**: the Terraform Plan step connects Harness to your repo and pulls your Terraform scripts.
- **Approval step**: Harness adds a Manual Approval step between the Terraform Plan and Terraform Apply steps. You can remove this step or follow the steps in [Using Manual Harness Approval Steps in CD Stages](../../x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages) to configure the step.
  - You can also use a [Jira or ServiceNow Approval](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-jira-and-service-now-approval-steps-in-cd-stages) step.
- **Terraform Apply step**: the Terraform Apply step simply inherits its configuration from the Terraform Plan step you already configured and applies it.

:::important

You must use the same **Provisioner Identifier** in the Terraform Plan and Terraform Apply steps:  

<docimage path={require('./static/provision-infra-dynamically-with-terraform-05.png')} width="80%" height="80%" title="Click to view full size image" /> 

:::

For details on configuring the Terraform steps, go to:

- [Terraform Plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step)
- [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)


### Terraform Rollback

The **Terraform Rollback** step is automatically added to the **Rollback** section.

![](./static/provision-infra-dynamically-with-terraform-07.png)

For details on configuring the Terraform Rollback step, go to  [Terraform Rollback](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step). 

When rollback happens, Harness rolls back the provisioned infrastructure to the previous successful version of the Terraform state.

Harness won't increment the serial in the state, but perform a hard rollback to the exact version of the state provided.

Harness determines what to roll  back using the **Provisioner Identifier**.

If you've made these settings expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

### Rollback limitations

Let's say you deployed two modules successfully already: module1 and module2. Next, you try to deploy module3, but deployment failed. Harness will roll back to the successful state of module1 and module2.

However, let's look at the situation where module3 succeeds and now you have module1, module2, and module3 deployed. If the next deployment fails, the rollback will only roll back to the Terraform state with module3 deployed. Module1 and module2 weren't in the previous Terraform state, so the rollback excludes them.

