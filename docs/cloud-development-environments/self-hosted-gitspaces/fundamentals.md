---
title: Fundamentals
description: Learn more about the basic fundamentals of Self-Hosted Gitspaces. 
sidebar_position: 1
sidebar_label: Fundamentals
---

**Self-Hosted Gitspaces** are on-demand remote development environments hosted within your organization’s infrastructure. These environments come pre-configured for immediate coding and provide an added layer of security by offering **full control** over infrastructure and data. This reduces the risk of external data exposure and prevents source code from being cached or accessed by third-party cloud services.

### Scope (What’s Supported)
- GCP Infrastructure  
- Cloud + On-Prem Providers  

### Concepts
- Terraform Registry  
- GCP Virtual Machine (VM)  
- Runner  
- Delegate  


## Prerequisites

You need to follow these prerequisites to get started with self-hosted Gitspaces:

| **Prerequisite**    | **Description** | **Documentation Guide** | 
| -------- | ------- | ---------- | 
| **Enable APIs in GCP Project** | Your GCP Project (where your have created your GCP VM Instance) should have the following APIs enabled:  <ul><li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) - api/cloudresourcemanager.googleapis.com</li><li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) - api/compute.googleapis.com</li><li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) - api/certificatemanager.googleapis.com</li><li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) - api/iam.googleapis.com</li><li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) - api/dns.googleapis.com</li></ul>   | [Guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) |
| **Service Account** | You must have a Service Account with the "Owner" permission in the same GCP Project where you have your GCP VM Instance.| [Guide](https://cloud.google.com/iam/docs/service-accounts-create) | 
| **Service Account Key** | You must create and download a Service Account Key in the same GCP Project and service account, this key is usually in the form of a **JSON** or **P12 file**, which contains the credentials necessary for the service account to authenticate. | [Guide](https://cloud.google.com/iam/docs/keys-create-delete) | 
| **Terraform** | You must have Terraform installed on your machine with internet access (please ensure you have the SA key downloaded here) | [Guide](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) |

## Get Started with Self-Hosted Gitspaces

This is a quick guide to help you set up and launch your Self-Hosted Gitspaces. Follow the steps below:

### 1. Go Through the Prerequisites and Fundamentals

Before you begin setup, it’s important to understand the underlying architecture and concepts of Self-Hosted Gitspaces. Make sure to review the following documentation thoroughly:

- [Self-Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md)  
- [Fundamental Concepts](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md)  
- [Prerequisites](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md)  

### 2. Configure Gitspace Infrastructure in the Harness UI

Start by configuring your Gitspace infrastructure via the Harness UI. This allows you to input your GCP details like Project ID, regions, etc., which will be referenced later during provisioning.

🔗 [Configure Gitspace Infrastructure](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-ui.md)

### 3. Configure and Set Up the Terraform Module

Once the infrastructure is defined in the UI, proceed to initialize and apply the **Harness Gitspaces Terraform Module**. This module will:

- Create all required infrastructure in your GCP Project  
- Set up VM instances for the Gateway  
- Install and configure the Runner and Delegate  
- Launch Gitspace machines  

🔗 [Set Up Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md)

### 4. Set Up Runner and Install Delegate

After provisioning, install the Runner and Delegate on your GCP VM Instance. This ensures the Harness Control Plane can communicate with your infrastructure to create and manage Gitspaces.

🔗 [Set Up Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/runner-delegate.md)

### 5. Manage Gitspaces

Once the setup is complete, you can begin creating Gitspaces directly from the UI and manage them seamlessly.

🔗 [Manage Gitspaces](/docs/cloud-development-environments/manage-gitspaces/create-gitspaces.md)