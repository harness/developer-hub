---
title: Provisioning overview
description: Learn the basics of how provisioning works in Harness CD.
sidebar_position: 1
---

:::note

Currently, the dynamic provisioning documented in this topic is behind the feature flag `CD_NG_DYNAMIC_PROVISIONING_ENV_V2`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Harness provisioning is categorized into the following use cases:
- Ad hoc provisioning: temporary and on-demand provisioning of resources for specific tasks or purposes.
- Dynamic infrastructure provisioning: provision the target deployment environment as part of the same deployment process. Typically, dynamic infrastructure provisioning is for temporary pre-production environments, such as dev, test, and qa. Production environments are usually pre-existing.

## Important notes

- Only provisioners that produce outputs can be used in an **Infrastructure Definition** to dynamically provision deployment target infrastructure.
- Currently, dynamic provisioning of target infrastructure is not supported for the AWS ASG and SpotInst deployment types.
- Dynamic provisioning is not supported when [using multiple services and environments](/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv) in a pipeline stage.

## Ad hoc provisioning

To perform ad hoc provisioning in your Harness Deploy stage, you use provisioning steps as part of the stage **Execution** section.

For example, in the following image, Harness Terraform Plan and Apply steps are used to provision the required AWS IAM resources, which are independent of the rolling deployment to the Kubernetes cluster itself.

<figure>

<docimage path={require('./static/f530119b890406045779f2dbec421ec43fb9a0bfd3739b4f401b6f2c02f3a84f.png')} width="60%" height="60%" title="Click to view full size image" />  

<figcaption>Figure 1: Ad hoc resource provisioning.</figcaption>
</figure>

### Documentation

See the following topics for steps on how to perform ad hoc provisioning:

- Terraform and Terraform Cloud
- CloudFormation
- Terragrunt
- Azure Resource Manager (ARM)
- Azure Blueprint
- Shell Script

## Dynamic infrastructure provisioning

Dynamic infrastructure provisioning creates your target infrastructure dynamically during the execution of your pipeline.

To perform dynamic provisioning in your Harness Deploy stage, you map specific provisioner script/template outputs to the target infrastructure settings in the stage **Environment** section. For example, a target Kubernetes cluster namespace is mapped to the stage's **Infrastructure**.

At deployment runtime, Harness does the following: 

1. Provisions the target environment using your script/template.
2. Uses the script/template outputs to locate it and deploy to it.

<figure>

<docimage path={require('./static/e4a8290505cd2ca85b1f0305b34c92a2aefb23ecec14b36e13baa7231499fa3e.png')} width="80%" height="80%" title="Click to view full size image" />  

<figcaption>Figure 2: CD stage target infrastructure provisioning and mapping.</figcaption>
</figure>

### Documentation

See the following topics for steps on how to perform dynamic provisioning:

- Kubernetes (including Helm, Native Helm, and Kustomize)
- Azure Web Apps
<!-- - AWS ASG -->
- AWS ECS
- AWS Lambda
- AWS SAM
<!-- - Spot Elastigroup -->
- Google Cloud Functions
- Serverless.com framework
- Tanzu Application Services
- SSH deployments
- WinRM deployments
- Custom deployments

### Provisioner and deployment type support matrix

The following table shows the provisioners you can use with each deployment type for *dynamic provisioning*.


|                            | Terraform and Terraform Cloud | CloudFormation | Terragrunt | Azure Resource Manager (ARM) | Azure Blueprint | Shell Script |
| -------------------------- | ----------------------------- | -------------- | ---------- | ---------------------------- | --------------- | ------------ |
| Kubernetes                 | ✔️                            |                |            |                              |                 | ✔️           |
| Azure Web Apps             | ✔️                            |                |            | ✔️                           | ✔️              | ✔️           |
| AWS ECS                    | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| AWS Lambda                 | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| AWS SAM                    | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| Spot Elastigroup           | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| Google Cloud Functions     | ✔️                            |                | ✔️         |                              |                 | ✔️           |
| Serverless.com framework   | ✔️                            | ✔️             | ✔️         |                              |                 | ✔️           |
| Tanzu Application Services | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |
| SSH deployments            | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |
| WinRM deployments          | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |
| Custom deployments         | ✔️                            | ✔️             | ✔️         | ✔️                           | ✔️              | ✔️           |

### Dynamic provisioning outputs for mapping

To use dynamic provisioning, you map outputs from your provisioner script/template that tell Harness what infrastructure to provision and use as the deployment target environment.

You use these outputs in Harness expressions that you enter in the Harness infrastructure settings.

The format for the expression is `<+provisioner.OUTPUT_NAME>`.

For example, if a Terraform script has the following output, the expression is `<+provisioner.default_namespace>`:

```
output "default_namespace" {
  value = kubernetes_namespace.example.metadata[0].name
}
```

The following table shows the **Infrastructure Definition** settings that are mapped to provisioner outputs.

|      **Infra type**       |           **Infra settings that require mapping**            |
| ------------------------- | ------------------------------------------------------------ |
| Kubernetes direct         | **Namespace**, **Release Name** (optional)                   |
| Kubernetes GCP            | **Namespace**, **Cluster**, **Release Name** (optional)      |
| Kubernetes Azure          | **Namespace**, **Cluster**                                   |
| Kubernetes AWS            | **Namespace**, **Cluster**, **Release Name** (optional)      |
| Physical Data Center      | **Host Array Path**, **Host Attributes**                     |
| SSH and WinRM on AWS      | **Region**, **Tags**                                         |
| SSH and WinRM on Azure    | **Subscription Id**, **Resource Group**, **Tags**            |
| Azure Web App             | **Subscription**, **Resource Group**                         |
| Google Cloud Functions    | **Region**, **Project**                                      |
| AWS SAM                   | **Region**                                                   |
| AWS Lambda                | **Region**                                                   |
| AWS ECS                   | **Region**, **Cluster**                                      |
| Tanzu App Services        | **Organization**, **Space**                                  |
| Serverless.com AWS Lambda | **Region**, **Stage**                                        |


## Using ad hoc and dynamic provisioning together

Ad hoc and dynamic provisioning can be used together. For example, you can dynamically provision the target deployment Kubernetes namespace and deploy your services to it, and then use ad hoc provisioning steps to track resource utilization, etc.

Dynamic provisioning is configured in a CD Deploy stage's **Environment** settings and ad hoc provisioning is configured in its **Execution** settings.

At deployment runtime, Harness processes the **Environment** settings first, along with its dynamic provisioning, followed by the **Execution** settings, containing its ad hoc provisioning.

Consequently, the **Environment** settings cannot reference subsequent **Execution** settings, but the **Execution** settings can reference previous **Environment** settings.

For example, if you dynamically provisioned a Kubernetes namespace in the **Environment** settings using the expression `<+provisioner.default_namespace>`, you can reference it in the **Execution** steps settings, including any files that those steps use. 

But if you performed ad hoc provisioning in the **Execution** steps, you cannot reference the outputs of those steps in the **Environment** settings.

## Service Instances (SIs) consumption

Harness Service Instances (SIs) aren't consumed and no other licensing is required when a Harness stage uses Azure ARM to provision resources.

When Harness deploys artifacts via Harness services to the provisioned infrastructure in the same stage or pipeline, SIs licensing is consumed.