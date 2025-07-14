---
title: Configure Self-Hosted Gitspaces
sidebar_position: 1
sidebar_label: Configure Self-Hosted Gitspaces
---

Welcome to the Self-Hosted Gitspaces configuration guide! This document will walk you through the key steps to configure and set up Self-Hosted Gitspaces in your environment.

### Prerequisites

You need to follow these prerequisites to get started with self-hosted Gitspaces:

| **Prerequisite**    | **Description** | **Documentation Guide** | 
| -------- | ------- | ---------- | 
| **Enable APIs in GCP Project** | Your GCP Project (where your have created your GCP VM Instance) should have the following APIs enabled:  <ul><li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) - api/cloudresourcemanager.googleapis.com</li><li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) - api/compute.googleapis.com</li><li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) - api/certificatemanager.googleapis.com</li><li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) - api/iam.googleapis.com</li><li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) - api/dns.googleapis.com</li></ul>   | [Docs](https://cloud.google.com/endpoints/docs/openapi/enable-api) |
| **Service Account** | You must have a Service Account with the "Owner" permission in the same GCP Project where you have your GCP VM Instance.| [Docs](https://cloud.google.com/iam/docs/service-accounts-create) | 
| **Service Account Key** | You must create and download a Service Account Key in the same GCP Project and service account, this key is usually in the form of a **JSON** or **P12 file**, which contains the credentials necessary for the service account to authenticate. | [Docs](https://cloud.google.com/iam/docs/keys-create-delete) | 
| **Terraform/OpenTofu** | You must have Terraform/OpenTofu installed on your machine with internet access (please ensure you have the SA key downloaded here) | [Docs](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) |
| **DNS Propogation** | You must verify that the domain or subdomain you use for self hosted Gitspaces has been properly delegated and that DNS propogation has completed. | [Docs](https://www.catchpoint.com/dns-monitoring/dns-delegation) | 

## Get Started with Self-Hosted Gitspaces

This is a quick guide to help you set up and launch your Self-Hosted Gitspaces. Follow the steps below:

### 1. Go Through the Architecture & Key Concepts

Before you begin setup, it’s important to understand the **underlying architecture** and **concepts of Self-Hosted Gitspaces**. 

🔗 Make sure to review the following **documentation** thoroughly:

- [Self-Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md)  
- [Key Concepts](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md)   

### 2. Configure Gitspace Infrastructure via Harness UI

Start by configuring your **Gitspace infrastructure via the Harness UI**. This allows you to input your infrastructure details like Project ID, regions, etc., which will be referenced later during provisioning.

🔗 [Configure Gitspace Infrastructure via Harness UI](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui.md)

### 3. Configure and Set Up the Terraform Module

Once the infrastructure is configured in the UI, proceed to initialize and use the **Harness Gitspaces Terraform Module**. This module will **create all required GCP infrastructure** and will set up VM instances for the CDE Gateway. 

🔗 [Set Up Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform.md)

### 4. Set Up Runner and Install Delegate

After provisioning, install the **Runner and Delegate** on your GCP VM Instance. This ensures the Harness Control Plane can communicate with your infrastructure to create and manage Gitspaces.

🔗 [Set Up Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/steps/runner-delegate.md)

### 5. Create Machines & Gitspaces

Once the setup is complete, you can begin by **creating machines** and **Gitspaces** directly. 

🔗 [Create and Manage Machines](/docs/cloud-development-environments/self-hosted-gitspaces/steps/manage-self-hosted.md)
