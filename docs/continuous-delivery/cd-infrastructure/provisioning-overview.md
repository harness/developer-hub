---
title: Provisioning overview
description: Learn the basics of how provisioning works in Harness CD.
sidebar_position: 1
---

:::note

Currently, the dynamic provisioning documented in this topic is behind the feature flag `CD_NG_DYNAMIC_PROVISIONING_ENV_V2`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Harness provisioning is categorized into the following use cases:
- **Ad hoc provisioning**: temporary and on-demand provisioning of resources for specific tasks or purposes.
- **Dynamic infrastructure provisioning**: provision the target deployment environment as part of the same deployment process. Typically, dynamic infrastructure provisioning is for temporary pre-production environments, such as dev, test, and qa. Production environments are usually pre-existing.

## Important notes

- **Dynamic infrastructure provisioning**: 
  - Only provisioners that produce outputs can be used in an **Infrastructure Definition** to dynamically provision deployment target infrastructure.
  - Currently, dynamic provisioning of target infrastructure is not supported for the AWS ASG, AWS SAM, and SpotInst deployment types.
  - Dynamic provisioning is not supported when [using multiple services and environments](/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv) in a pipeline stage.

## Ad hoc provisioning

To perform ad hoc provisioning in your Harness Deploy stage, you use provisioning steps as part of the stage **Execution** section.

For example, in the following figure, Harness Terraform Plan and Apply steps are used to provision the required AWS IAM resources, which are independent of the rolling deployment to the Kubernetes cluster itself.

<figure>

<docimage path={require('./static/f530119b890406045779f2dbec421ec43fb9a0bfd3739b4f401b6f2c02f3a84f.png')} width="60%" height="60%" title="Click to view full size image" />  

<figcaption>Figure 1: Ad hoc resource provisioning.</figcaption>
</figure>

### Documentation

See the following topics for steps on how to perform ad hoc provisioning:

- Terraform:
  - [Terraform Plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step)
  - [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)
  - [Terraform Rollback](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step). To see the Terraform Rollback step, toggle the **Rollback** setting.
- [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos)
- [Terraform Cloud](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments)
- CloudFormation:
  - [Create Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step)
  - [Delete Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/remove-provisioned-infra-with-the-cloud-formation-delete-step)
  - [Rollback Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/rollback-provisioned-infra-with-the-cloud-formation-rollback-step). To see the Rollback Stack step, toggle the **Rollback** setting.
- [Azure Resource Management (ARM)](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning)
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning)
- [Shell Script](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning)

## Dynamic infrastructure provisioning

Dynamic infrastructure provisioning creates your target infrastructure dynamically during the execution of your pipeline.

To perform dynamic provisioning in your Harness Deploy stage, you add provisioning steps to the stage **Environment** settings. Then you map specific provisioner script/template outputs to the target infrastructure in the same stage **Environment** section. 

For example, the name of the target Kubernetes cluster namespace is provisioned by the Terraform Apply step in **Environment** section and then mapped to that stage's target **Infrastructure**.

At deployment runtime, Harness does the following: 

1. Provisions the target environment using your script/template.
2. Uses the script/template outputs to locate it and deploy to it.

<figure>

<docimage path={require('./static/e4a8290505cd2ca85b1f0305b34c92a2aefb23ecec14b36e13baa7231499fa3e.png')} width="80%" height="80%" title="Click to view full size image" />  

<figcaption>Figure 2: CD stage target infrastructure provisioning and mapping.</figcaption>
</figure>

### Documentation

See the following topics for steps on how to perform dynamic provisioning:

- [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure) (also applies to Helm, Native Helm, and Kustomize)
- [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions)
- [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-lambda-cd-quickstart)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
- [VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)

### Dynamic provisioning and deployment type support matrix

The following table shows the provisioners you can use with each deployment type for *dynamic provisioning*.


|                            | Terraform and Terraform Cloud | CloudFormation | Terragrunt | Azure Resource Manager (ARM) | Azure Blueprint | Shell Script |
| -------------------------- | ----------------------------- | -------------- | ---------- | ---------------------------- | --------------- | ------------ |
| Kubernetes                 | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |
| Azure Web Apps             | ✔️                            |                | ✔️           | ✔️                           | ✔️              | ✔️           |
| AWS ECS                    | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| AWS Lambda                 | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| Spot Elastigroup           | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| Google Cloud Functions     | ✔️                            |                | ✔️         |                              |                 | ✔️           |
| Serverless.com framework   | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| Tanzu Application Services | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |
| SSH deployments            | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |
| WinRM deployments          | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |

### Dynamic provisioning outputs for mapping

To use dynamic provisioning, you map outputs from your provisioner script/template that tell Harness what infrastructure to provision and use as the deployment target infrastructure.

You use these outputs in Harness expressions that you enter in the Harness infrastructure settings.

The format for the expression is `<+provisioner.OUTPUT_NAME>`.

For example, if a Terraform script has the following output, the expression is `<+provisioner.default_namespace>`:

```
output "default_namespace" {
  value = kubernetes_namespace.example.metadata[0].name
}
```

Here you can see the expression used to map the output in the infrastructure settings:

<figure>

<docimage path={require('./static/519f60992faffa19425e1436699a0d3ce27de43a16de9ad1e90b86288122235f.png')} width="60%" height="60%" title="Click to view full size image" />

<figcaption>Figure: Mapped output</figcaption>
</figure>


The following table shows the **Infrastructure Definition** settings that are mapped to provisioner outputs.

|      **Infra type**       |           **Infra settings that require mapping**            |
| ------------------------- | ------------------------------------------------------------ |
| Kubernetes Direct         | **Namespace**, **Release Name** (optional)                   |
| Kubernetes GCP            | **Namespace**, **Cluster**, **Release Name** (optional)      |
| Kubernetes Azure          | **Namespace**, **Cluster**                                   |
| Kubernetes AWS            | **Namespace**, **Cluster**, **Release Name** (optional)      |
| Physical Data Center      | **Host Array Path**, **Host Attributes**                     |
| SSH and WinRM on AWS      | **Region**, **Tags**                                         |
| SSH and WinRM on Azure    | **Subscription Id**, **Resource Group**, **Tags**            |
| Azure Web App             | **Subscription**, **Resource Group**                         |
| Google Cloud Functions    | **Region**, **Project**                                      |
| AWS Lambda                | **Region**                                                   |
| AWS ECS                   | **Region**, **Cluster**                                      |
| Tanzu App Services        | **Organization**, **Space**                                  |
| Serverless.com AWS Lambda | **Region**, **Stage**                                        |


## Using ad hoc and dynamic provisioning together

Ad hoc and dynamic provisioning can be used together. 

For example, you can: 

1. Dynamically provision the target deployment Kubernetes namespace in the stage **Environment**.
2. Deploy your services to the provisioned namespace in the stage **Execution**. 
3. Use subsequent ad hoc provisioning steps in **Execution** to change the provisioned namespace, etc.

Dynamic provisioning is configured in a CD Deploy stage's **Environment** settings and ad hoc provisioning is configured in its **Execution** settings.

At deployment runtime, Harness processes the **Environment** settings first, along with its dynamic provisioning, followed by the **Execution** settings, containing its ad hoc provisioning.

Consequently, the **Environment** settings cannot reference subsequent **Execution** settings, but the **Execution** settings can reference previous **Environment** settings.

For example, if you dynamically provisioned a Kubernetes namespace in the **Environment** settings and mapped the namespace output using the expression `<+provisioner.default_namespace>`, you can reference the namespace in the **Execution** steps settings using the same expression, including any files that those steps use. 

But if you performed ad hoc provisioning in the **Execution** steps, you cannot reference the outputs of those steps in the **Environment** settings.

## Service Instances (SIs) consumption

Harness Service Instances (SIs) aren't consumed and no other licensing is required when a Harness stage uses Azure ARM to provision resources.

When Harness deploys artifacts via Harness services to the provisioned infrastructure in the same stage or pipeline, SIs licensing is consumed.