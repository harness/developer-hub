---
title: Get Started with Harness Hosted Gitspaces
description: Detailed guide to get started with Harness Hosted Gitspaces. 
sidebar_position: 2
sidebar_label: Harness Hosted Gitspaces
redirect_from: /docs/cloud-development-environments/introduction/beta-usage
---

**Harness Hosted Gitspaces** are on-demand, remote development environments that can be launched instantly with a single click. This document serves as a quickstart guide to help users get started with Harness Hosted Gitspaces. Please refer to our [quickstart tutorial](/docs/cloud-development-environments/introduction/quickstart-tutorial.md) guide for a detailed, step-by-step demo on how to get started with Gitspaces.

- Harness-Hosted GitSpaces are **fully managed and operated** by Harness, requiring **no maintenance from your side**.
- All Gitspaces in this model run entirely within the **Harness Cloud (Harness-managed infrastructure)**.
- **No infrastructure setup** is needed — you can create and launch a Gitspace in just a few minutes, **without any configuration**.

## Get Started with Harness-Hosted GitSpaces

### Prerequisite

Please ensure that the **Harness CDE module** is enabled in your Harness account before you proceed. You can reach out to the team at **[cde-interest@harness.io](mailto:cde-interest@harness.io)** to get this enabled.

### Understanding the Requirements

Before you begin, make sure you’ve read through the supported features and understood the capabilities of Harness-Hosted Gitspaces. This will help you refine your requirements and plan your use case more effectively. 
- [What's Supported](/docs/cloud-development-environments/introduction/whats-supported.md)
- [Gitspace Configuration](/docs/cloud-development-environments/deep-dive-into-gitspaces/gitspace-configuration.md)
- [Gitspace Lifecycle](/docs/cloud-development-environments/deep-dive-into-gitspaces/lifecycle-of-gitspaces.md)
- [Features of Gitspaces](/docs/category/features-of-gitspaces)

### Creating Your First Gitspace

Once you’re clear on your use case and requirements, you can start by creating your first Gitspace. No configuration is required to get started - all you need is your source code repository link, and you can dive straight into creating your Gitspace. Refer to [Creating Gitspaces](/docs/cloud-development-environments/manage-gitspaces/create-gitspaces.md) for detailed steps.

### Developing in Your Gitspace

You can now begin developing in your Gitspace and customize it to fit your specific needs.

The configuration for your Gitspace is stored in the `.devcontainer/devcontainer.json` file within your project’s repository. This file includes all the metadata and settings for your development environment, allowing you to tailor your setup using various properties. For more details, refer to the [Gitspace Configuration Guide](docs/cloud-development-environments/deep-dive-into-gitspaces/gitspace-configuration.md).

Here are some key features of developing in GitSpaces:

#### [Private Docker Images](/docs/cloud-development-environments/features-of-gitspaces/private-docker-images.md)

Harness Gitspaces support the use of **private Docker images**, allowing you to pull them using artifact repository connectors like **JFrog Artifactory**, **Docker Registry**, and **Amazon ECR** - enabling seamless personalization of your Gitspace.

![](./static/private-docker-images-1.png)

#### [Secure Connect Integration](/docs/cloud-development-environments/features-of-gitspaces/secure-connect.md)

Harness Gitspaces offer the **Secure Connect** feature, providing a robust and secure proxy solution. This allows seamless integration with your on-premises, privately-hosted assets, such as Docker Registries and Artifact Repositories.

#### [Port Forwarding](/docs/cloud-development-environments/develop-using-cde/port-forwarding.md)

**Port Forwarding** in Gitspaces bridges your remote development environment and local machine. It allows developers to access services running inside Gitspaces as if they were running locally.

![](./static/port-forward-latest.png)

You can explore more [features of Gitspaces here](https://developer.harness.io/docs/category/features-of-gitspaces).

### Customizing and Managing Your Gitspace

You can further customize your Gitspace to meet your specific needs by modifying its configuration. Use the `devcontainer.json` properties to set up environment variables, `runArgs`, and configure `containerUser` and `remoteUser` for your GitSpaces. Learn more about how to [customize your Gitspace](https://developer.harness.io/docs/category/developing-in-gitspaces) using the `devcontainer.json` file.

Additionally, Gitspaces can be managed directly from the Harness UI. You can easily start, stop, or delete a Gitspace as needed. Find more details about [managing your Gitspaces](https://developer.harness.io/docs/category/managing-gitspaces).

