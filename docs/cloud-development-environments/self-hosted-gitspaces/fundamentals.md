---
title: Fundamentals
description: Learn more about the basic fundamentals of Self-Hosted Gitspaces. 
sidebar_position: 1
sidebar_label: Fundamentals
---

**Self-Hosted Gitspaces** are on-demand remote development environments hosted within your organization’s infrastructure. These environments come pre-configured for instant coding and provide an added layer of security by offering **full control** over infrastructure and data. This reduces the risk of external data exposure and prevents source code from being cached or accessed by third-party cloud services.

### What’s Supported with Self Hosted Gitspaces?
* Currently, we only support **GCP Cloud VMs** as the infrastructure option for self-hosted Gitspaces. Support for **AWS Cloud VMs** is in progress and will be available soon.
* You can create and manage self-hosted Gitspaces using either cloud-based or on-premises Git providers, offering enhanced security and greater control over your source code.

To learn more about what's supported with self-hosted Gitspaces, visit [What's Supported](/docs/cloud-development-environments/introduction/whats-supported.md).


### Key Concepts
To understand how self-hosted Gitspaces work and explore the underlying architecture, visit the [Self-Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md) documentation.
There are a few key concepts that form the foundation of how self-hosted Gitspaces operate:

#### Harness Control Plane
The **Harness Control Plane** manages Gitspaces workflows. Users configure their infrastructure and initiate Gitspaces from the Harness UI (managed by Harness Control Plane). The control plane:

* Sends tasks to customer infrastructure
* Accepts responses back
* Maintains central orchestration logic for lifecycle operations

To understand more about this component, please refer to [Self Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md#harness-control-plane)

#### Delegate 
Harness Delegate is a service that you install in your infrastructure to establish and maintain a connection between Harness Control Plane and your infrastructure. Self Hosted Gitspaces run in your own infrastructure, but are managed by Harness Control Plane. Thus to establish and maintain communication between the Harness Control Plane and Customer's infrastructure, customer need to install Harness Delegate in their infrastructure. Read more about [Harness Delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

To understand more about this step and its implementation, please refer to [Setup Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/runner-delegate.md)

#### VM Runner
The Runner is responsible for managing the VM lifecycle. The VM Runner maintains a pool of VMs for executing the tasks. When the Delegate receives any Task Request from the Harness Control Plane, it forwards the request to the Runner, which executes the task on the available VM and manages the VM lifecycle according to the request. Read more about [VM Runner](https://docs.drone.io/runner/vm/overview/).

To understand more about this step and its implementation, please refer to [Setup Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/runner-delegate.md)

#### Gateway
The Gateway is responsible for routing all requests to Gitspaces.

#### Terraform Registry

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
- [Prerequisites](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md#prerequisites)  

### 2. Configure Gitspace Infrastructure in the Harness UI

Start by configuring your Gitspace infrastructure via the Harness UI. This allows you to input your infrastructure details like Project ID, regions, etc., which will be referenced later during provisioning.

[Configure Gitspace Infrastructure](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-ui.md)

### 3. Configure and Set Up the Terraform Module

Once the infrastructure is defined in the UI, proceed to initialize and apply the **Harness Gitspaces Terraform Module**. This module will:

- Create all required infrastructure in your GCP Project  
- Set up VM instances for the Gateway

[Set Up Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md)

### 4. Set Up Runner and Install Delegate

After provisioning, install the Runner and Delegate on your GCP VM Instance. This ensures the Harness Control Plane can communicate with your infrastructure to create and manage Gitspaces.

[Set Up Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/runner-delegate.md)

### 5. Manage Gitspaces

Once the setup is complete, you can begin creating Gitspaces directly from the UI and manage them seamlessly.

[Manage Gitspaces](/docs/cloud-development-environments/manage-gitspaces/create-gitspaces.md)