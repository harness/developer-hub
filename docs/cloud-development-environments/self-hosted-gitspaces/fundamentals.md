---
title: Overview & Key Concepts
description: Understand the basic fundamentals of Self-Hosted Gitspaces. 
sidebar_position: 1
sidebar_label: Overview & Key Concepts
---

:::info
**Self Hosted Gitspaces** are currently available behind the Feature Flag ``CDE_HYBRID_ENABLED``. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.
:::

**Self-Hosted Gitspaces** are on-demand remote development environments hosted within your organization’s infrastructure. These environments come pre-configured for instant coding and provide an added layer of security by offering **full control** over infrastructure and data. This reduces the risk of external data exposure and prevents source code from being cached or accessed by third-party cloud services.

---

## What’s Supported with Self Hosted Gitspaces?
### Cloud Infrastructure Providers
We support the following cloud infrastructure providers for self-hosted Gitspaces:
- **[Google Cloud Platform (GCP)](https://cloud.google.com/docs)**
- **[Amazon Web Services (AWS)](https://docs.aws.amazon.com/)**

### Git Providers
We support the following git providers for self-hosted Gitspaces:
- **[Cloud-based Git Providers](/docs/cloud-development-environments/git-providers/cloud-providers)**
- **[On-premises Git Providers](/docs/cloud-development-environments/git-providers/on-prem-providers)**

To learn more about what's supported with self-hosted Gitspaces, visit [What's Supported](/docs/cloud-development-environments/introduction/whats-supported.md#deployment-models).

---

## Key Concepts
To understand how self-hosted Gitspaces work and explore the underlying architecture, go through the [Self-Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md) documentation. Refer to [Configuring Self-Hosted Gitspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps) to get started with Self Hosted Gitspaces. 
There are a few key concepts that form the foundation of how self-hosted Gitspaces operate:

### Harness Control Plane
The **Harness Control Plane** manages Gitspaces workflows. Users configure their infrastructure and initiate Gitspaces from the Harness UI (managed by Harness Control Plane). The control plane:

* Sends tasks to customer infrastructure
* Accepts responses back
* Maintains central orchestration logic for lifecycle operations

To understand more about this component, please refer to [Self Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture.md#harness-control-plane)

### Delegate 
**Harness Delegate** is a service that you install in your infrastructure to establish and maintain a **connection between Harness Control Plane and your infrastructure**. Self Hosted Gitspaces run in your own infrastructure, but are managed by Harness Control Plane. Thus to establish and maintain communication between the Harness Control Plane and Customer's infrastructure, customer need to **install Harness Delegate in their infrastructure**. Read more about [Harness Delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

To understand more about this step and its implementation, please refer to [Setup Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/steps/runner-delegate.md)

### VM Runner
The **VM Runner** is responsible for **managing the VM lifecycle**. The VM Runner creates a VM on demand for executing the tasks. When the Delegate receives any Task Request from the Harness Control Plane, it forwards the request to the Runner, which executes the task on the created VM and manages the VM lifecycle according to the request. Read more about [VM Runner](https://docs.drone.io/runner/vm/overview/).

To understand more about this step and its implementation, please refer to [Setup Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/steps/runner-delegate.md)

### CDE Gateway
The **CDE Gateway** plays a key role in ensuring reliable connectivity, secure access, and controlled traffic flow. It is responsible for **routing** user requests to the appropriate Gitspaces. The CDE gateway also handles **authentication**, ensuring that only users with valid access tokens can access Gitspaces. From a **security** perspective, the CDE gateway ensures that all incoming traffic to a Gitspace VM originates from trusted components. This controlled entry point greatly reduces the surface area for potential attacks and enforces strict traffic policies.

### Terraform Module
A **Terraform module** is a reusable package of Terraform configuration files designed to provision related infrastructure components together. The [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/gcp/latest) is used to provision and set up all the **necessary resources** required to run and use **Self-Hosted Gitspaces** in your own infrastructure. It automates tasks like VPC creation, sub-network setup, IAM roles and policies configuration, and other supporting services needed to run and use Self-Hosted Gitspaces.

To understand more about this step and its implementation, please refer to [Configure and Use the Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform.md)

---

## Next Steps
Get started with configuring Self Hosted Gitspaces by following the steps mentioned here: [Get Started with Self-Hosted Gitspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps/)