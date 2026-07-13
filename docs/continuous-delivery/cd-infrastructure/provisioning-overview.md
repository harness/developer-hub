---
title: Provisioning overview
sidebar_label: Provisioning Overview
description: Learn how ad hoc and dynamic infrastructure provisioning work in Harness CD.
keywords:
  - infrastructure provisioning
  - ad hoc provisioning
  - dynamic provisioning
  - Terraform
  - CloudFormation
tags:
  - continuous-delivery
  - cd-infrastructure
  - provisioning
sidebar_position: 1
redirect_from:
  - /docs/continuous-delivery/cd-infrastructure/dynamic-infrastructure-provisioning
---

Harness provides flexible provisioning options to support different deployment workflows and infrastructure requirements. Depending on your use case, you can provision infrastructure in different ways.

Harness supports the following provisioning use cases:

- **Ad hoc provisioning:** Temporary and on-demand provisioning of resources for specific tasks or purposes.
- **Dynamic infrastructure provisioning:** Provisions the target deployment environment as part of the deployment process. It is used for temporary pre-production environments, such as development, testing, and QA. Production environments are generally pre-provisioned and exist before deployment.

---

## What will you learn in this topic?

- **Ad hoc provisioning:** How to provision resources with provisioning steps in the stage **Execution** section, and which provisioners and steps are available.
- **Dynamic infrastructure provisioning:** How Harness provisions and maps target infrastructure during pipeline execution, and which deployment types are supported.
- **Output mapping:** How to map provisioner outputs to Harness infrastructure settings using the `<+provisioner.OUTPUT_NAME>` expression.
- **Combined provisioning:** How ad hoc and dynamic provisioning work together in a single stage.

---

## Ad hoc provisioning

Ad hoc provisioning creates infrastructure on demand to support a specific task or short-term requirement.

To perform ad hoc provisioning in your Harness Deploy stage, you use provisioning steps as part of the stage **Execution** section.

For example, in the following figure, Harness Terraform Plan and Apply steps provision the required AWS IAM resources, which are independent of the rolling deployment to the Kubernetes cluster itself.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('./static/f530119b890406045779f2dbec421ec43fb9a0bfd3739b4f401b6f2c02f3a84f.png')} width="80%" height="80%" alt="Ad hoc resource provisioning with Terraform Plan and Apply steps in the Execution section" title="Click to view full size image" />
</div>

### Ad hoc provisioning steps

The following topics describe how to use each supported provisioner for ad hoc provisioning:

- Terraform:
  - [Terraform Plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step)
  - [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)
  - [Terraform Rollback](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step) (enable the **Rollback** setting to view this step).
  - [Terraform Cloud](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments)
- Terragrunt:
  - [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos)
- CloudFormation:
  - [Create Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-with-the-cloud-formation-create-stack-step)
  - [Delete Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/remove-provisioned-infra-with-the-cloud-formation-delete-step)
  - [Rollback Stack](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/rollback-provisioned-infra-with-the-cloud-formation-rollback-step) (enable the **Rollback** setting to view this step).
- Azure:
  - [Azure Resource Management (ARM)](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning)
  - [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning)
- Shell Script:
  - [Shell Script](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning)
- AWS CDK:
  - [AWS CDK](/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-provisioning)

---

## Dynamic infrastructure provisioning

Dynamic infrastructure provisioning creates your target infrastructure dynamically during the execution of your pipeline.

To perform dynamic provisioning in your Harness Deploy stage, you add provisioning steps to the stage **Environment** settings. Then you map specific provisioner script or template outputs to the target infrastructure in the same stage **Environment** section.

For example, the Terraform Apply step in the **Environment** section provisions the name of the target Kubernetes cluster namespace, which is then mapped to that stage's target **Infrastructure**.

At deployment runtime, Harness performs the following:

1. Provisions the target environment using your script or template.
2. Uses the script or template outputs to locate it and deploy to it.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('./static/e4a8290505cd2ca85b1f0305b34c92a2aefb23ecec14b36e13baa7231499fa3e.png')} width="80%" height="80%" alt="CD stage target infrastructure provisioning and mapping in the Environment section" title="Click to view full size image" />
</div>

:::info Supported provisioners for dynamic provisioning
Only provisioners that produce outputs can be used in an **Infrastructure Definition** to dynamically provision deployment target infrastructure.
:::

:::warning unsupported scenarios
- Dynamic provisioning of target infrastructure is not supported for the AWS ASG, AWS SAM, and SpotInst deployment types.
- Dynamic provisioning is not supported when [using multiple services and environments](/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv) in a pipeline stage.
:::

### Dynamic provisioning by deployment type

Use the following topics to learn how to perform dynamic provisioning for each supported deployment type:

- [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure) (also applies to Helm, Native Helm, and Kustomize).
- [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions)
- [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
- [VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)

### Dynamic provisioning and deployment type support matrix

The following table lists the provisioners supported for dynamic provisioning with each deployment type:

|                            | Terraform and Terraform Cloud | CloudFormation | Terragrunt | Azure Resource Manager (ARM) | Azure Blueprint | Shell Script | AWS CDK |
| -------------------------- | ----------------------------- | -------------- | ---------- | ---------------------------- | --------------- | ------------ | ------------ |
| Kubernetes                 | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |   ✔️           |
| Azure Web Apps             | ✔️                            |                | ✔️           | ✔️                           | ✔️              | ✔️           | ✔️           |
| AWS ECS                    | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |✔️           |
| AWS Lambda                 | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |✔️           |
| Spot Elastigroup           | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |✔️           |
| Google Cloud Functions     | ✔️                            |                | ✔️         |                              |                 | ✔️           |✔️           |
| Serverless.com framework   | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |✔️           |
| Tanzu Application Services | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |✔️           |
| SSH deployments            | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |✔️           |
| WinRM deployments          | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |✔️           |

### Dynamic provisioning outputs for mapping

To use dynamic provisioning, you map outputs from your provisioner script or template that tell Harness what infrastructure to provision and use as the deployment target infrastructure.

You use these outputs in Harness expressions that you enter in the Harness infrastructure settings. 

The format for the expression is `<+provisioner.OUTPUT_NAME>`.

For example, if a Terraform script has the following output, the expression is `<+provisioner.default_namespace>`:

```hcl
output "default_namespace" {
  value = kubernetes_namespace.example.metadata[0].name
}
```

The following figure shows the expression used to map the output in the infrastructure settings:

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('./static/519f60992faffa19425e1436699a0d3ce27de43a16de9ad1e90b86288122235f.png')} width="80%" height="80%" alt="Provisioner output mapped to a Harness infrastructure setting using an expression" title="Click to view full size image" />
</div>

The following table shows the **Infrastructure Definition** settings that are mapped to provisioner outputs:

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

---

## Combine ad hoc and dynamic provisioning

You can use ad hoc and dynamic provisioning together in the same stage.

For example, you can:

1. Dynamically provision the target deployment Kubernetes namespace in the stage **Environment**.
2. Deploy your services to the provisioned namespace in the stage **Execution**.
3. Use subsequent ad hoc provisioning steps in **Execution** to change the provisioned namespace.

You configure dynamic provisioning in a CD Deploy stage's **Environment** settings and ad hoc provisioning in its **Execution** settings.

At deployment runtime, Harness processes the **Environment** settings first, along with its dynamic provisioning, followed by the **Execution** settings, containing its ad hoc provisioning.

Consequently, the **Environment** settings cannot reference subsequent **Execution** settings, but the **Execution** settings can reference previous **Environment** settings.

For example, if you dynamically provisioned a Kubernetes namespace in the **Environment** settings and mapped the namespace output using the expression `<+provisioner.default_namespace>`, you can reference the namespace in the **Execution** steps settings using the same expression, including any files that those steps use.

However, if you performed ad hoc provisioning in the **Execution** steps, you cannot reference the outputs of those steps in the **Environment** settings.

:::info Azure ARM and Service Instance (SI) consumption

Provisioning infrastructure with Azure Resource Manager (ARM) does not consume Harness Service Instances (SIs) or require additional licensing.

If the same stage or pipeline also deploys artifacts to the provisioned infrastructure using Harness services, Service Instance licensing is consumed.

:::

---

## Next steps

- Go to [Infrastructure provisioning FAQs](/docs/continuous-delivery/cd-infrastructure/provisioning-faqs) to review frequently asked questions about Harness infrastructure provisioning.
- Go to [Terragrunt provisioning](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos) to provision infrastructure with Terragrunt.
- Go to [Shell Script provisioning](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning) to provision infrastructure with a shell script.
- Go to [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure) to define and dynamically provision Kubernetes target infrastructure.
