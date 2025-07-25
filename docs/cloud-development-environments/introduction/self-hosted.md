---
title: Harness CDE Deployment Models
description: Detailed guide to get started with Harness CDE Deployment Models. 
sidebar_position: 3
sidebar_label: Deployment Models
redirect_from: 
- /docs/cloud-development-environments/introduction/quickstart-guide
- /docs/cloud-development-environments/introduction/beta-usage
---

Harness Cloud Development Environments (CDE), also known as **Harness Gitspaces**, are on-demand, remote development environments that come pre-configured with everything you need for instant coding. Gitspaces are fully managed by Harness but offer different deployment options.

Refer to our [quickstart tutorial](/docs/cloud-development-environments/introduction/quickstart-tutorial.md) for a detailed, step-by-step guide to getting started with Gitspaces.

## Deployment Models

There are two deployment models for Harness Gitspaces:

### Harness-Hosted Model

**Harness-Hosted Gitspaces** are on-demand, remote development environments that can be launched instantly with a single click **hosted and managed** by **Harness**. 

With this deployment model:

* Harness-Hosted Gitspaces are **fully managed and operated by Harness**, requiring **no maintenance on your part**.
* All Gitspaces in this model run entirely within the **Harness Cloud (Harness-managed infrastructure)**.
* **No infrastructure setup** is needed, you can create and launch a Gitspace in just a few minutes, **without any configuration**.

#### Getting Started with Harness-Hosted Gitspaces

You can start using Harness-Hosted Gitspaces in either of the following ways:

1. **Create Harness-Hosted Gitspaces**: Launch directly from your Harness UI with no prerequisites. Refer to [Creating Harness Hosted Gitspaces](/docs/cloud-development-environments/manage-gitspaces/create-gitspaces.md) for details.
2. **Use Secure Connect with Harness-Hosted Gitspaces**: Use your privately-owned, on-prem assets (like private Docker and artifact registries) with your Gitspaces using the **Secure Connect** feature. See [Using Secure Connect](/docs/cloud-development-environments/features-of-gitspaces/secure-connect.md) for more information.

### Self-Hosted Model

**Self-Hosted Gitspaces** are on-demand, remote development environments hosted within **your organization’s infrastructure**.

With this deployment model:

* Self-Hosted Gitspaces run on **your organization’s infrastructure**, managed by the **Harness Control Plane**.
* They are **pre-configured for instant coding** and provide an **added layer of security** by offering **full control** over infrastructure and data.
* They reduce the risk of **external data exposure** and **prevent source code from being cached or accessed by third-party cloud services**.

For more details, see [Overview & Key Concepts](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md).

#### Getting Started with Self-Hosted Gitspaces

To start using Self-Hosted Gitspaces, you must **complete the prerequisites** and **configure your infrastructure within Harnes**s to host your Gitspaces. Refer to [Configuring Self-Hosted Gitspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps) for instructions.

### Self-Hosted vs. Harness-Hosted

Harness-Hosted Gitspaces are fully managed by Harness, simplifying setup and management for end-users.
However, as organizations scale and adopt stricter security and compliance standards, **Harness-Hosted Gitspaces may present certain enterprise challenges**:

* **Security & Data Sovereignty**: Limited control over source code and developer data.
* **Customization Limitations**: Hosted solutions may not support deep customization of tooling and environment setups.
* **Latency Issues**: Fixed hosted regions may cause performance problems for globally distributed teams.

By contrast, **Self-Hosted Gitspaces** address these concerns by offering full infrastructure control.

| **Use Case**              | **Self-Hosted Gitspaces**             | **Harness-Hosted Gitspaces**  |
| ------------------------- | ------------------------------------- | ----------------------------- |
| **Infrastructure**        | Managed by customer                   | Managed by Harness            |
| **Security & Compliance** | Full control by customer              | Shared responsibility model   |
| **Source Code**           | Stored within customer infrastructure | Stored and cached in Harness  |
| **Data Residency**        | Customer-defined and governed         | Stored in Harness Cloud       |
| **Latency/Location**      | Global flexibility (customer-managed) | Limited to predefined regions |