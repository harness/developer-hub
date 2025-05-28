---
title: Fundamentals
description: Learn more about the basic fundamentals of Self Hosted Gitspaces. 
sidebar_position: 1
sidebar_label: Fundamentals
---

Scope: (what's supported)
- GCP Infra
- cloud + on-prem providers

Concepts:
- Terraform registry
- GCP VM
- Runner
- Delegate

## Get Started with Self Hosted Gitspaces

This is a quick guide to get started with Self Hosted Gitspaces. You can get started with Self Hosted Gitspaces by following the given steps: 
### 1. Go through the Prerequisites and Fundamentals
It's important to understand the underlying architecture and fundamentals of self hosted Gitspaces. Please ensure you read through these resources and understand everything in detail before getting started with self hosted Gitspaces. 
- [Self Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md)
- [Fundamental Concepts](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md)
- [Prerequisites](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md)

### 2. Configure Gitspace Infrastructure in Harness UI
You can start by configuring your Gitspace Infrastructure in Harness UI. This helps you to configure your GCP infra details easily from the Harness UI, which will be further used while creating Gitspaces. This does require specific GCP Infra details like GCP Project, Regions, etc. To learn more about this step, go to [configure Gitspace Infrastructure](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-ui.md). 

### 3. Configure and Setup Terraform Module
Once you have configured your Gitspace Infra in the Harness UI, your next step is to initialise and apply the **Harness Gitspaces** Terraform Module to configure the specific GCP infrastructure required to setup self hosted Gitspaces. This step creates infrastructure in your given GCP project to run self hosted Gitspaces. This step also includes the creation of VM Instances required for the Gateway, for the installation and setup of runner and delegates and for the Gitspace machines setup. To learn more about this step, go to [configure and setup Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md).

### 4. Setup Runner and Install Delegate 
Once your terraform module is setup, you need to setup runner and install delegate in your GCP VM Instance to complete the self hosted setup. Since this is your GCP Infra, we'll need this setup to allow the Harness Control Plane to send and accept requests to create and start self hosted Gitspaces. To learn more, refer to [setup runner and install delegate](/docs/cloud-development-environments/self-hosted-gitspaces/runner-delegate.md). 

### 5. Manage Gitspaces
Once your setup is done, you can easily start by creating your Gitspaces in your self hosted infrastructure and manage them easily from the Gitspaces UI. To learn more about managing Gitspaces, refer to [managing Gitspaces](/docs/cloud-development-environments/manage-gitspaces/create-gitspaces.md)

## Prerequisites
You need to follow these prerequisites to get started with self hosted Gitspaces: 
| **Prerequisite**    | **Description** | **Documentation Guide** | 
| -------- | ------- | ---------- | 
| **GCP VM Instance**  | You must have an active GCP VM Instance in your GCP Project to create and start your self hosted Gitspaces.   | [Guide](https://cloud.google.com/compute/docs/instances/create-start-instance) |
| **Enable APIs in GCP Project** | Your GCP Project (where your have created your GCP VM Instance) should have the following APIs enabled:  <ul><li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) - api/cloudresourcemanager.googleapis.com</li><li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) - api/compute.googleapis.com</li><li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) - api/certificatemanager.googleapis.com</li><li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) - api/iam.googleapis.com</li><li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) - api/dns.googleapis.com</li></ul>   | [Guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) |
| **Service Account** | You must have a Service Account with the "Owner" permission in the same GCP Project where you have your GCP VM Instance.| [Guide](https://cloud.google.com/iam/docs/service-accounts-create) | 
| **Service Account Key** | You must create and download a Service Account Key in the same GCP Project and service account, this key is usually in the form of a **JSON** or **P12 file**, which contains the credentials necessary for the service account to authenticate. | [Guide](https://cloud.google.com/iam/docs/keys-create-delete) | 
| **OpenTofu / Terraform** | You must have OpenTofu or Terraform installed on your machine with internet access (please ensure you have the SA key downloaded here) | <ul><li>[OpenTofu Installation Guide](https://opentofu.org/docs/intro/install/)</li><li>[Terraform Installation Guide](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)</li></ul> | 