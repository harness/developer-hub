---
title: Cloud Development Environments Release Notes
sidebar_label: Cloud Development Environments
date: 2024-09-18T20:00
sidebar_position: 13
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/cloud-developer-environment/rss.xml" />

Review the notes below for details about recent changes to **Harness Cloud Development Environments**.


:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## 🚀 Releasing Self-Hosted Gitspaces — July \[2025.07.v1]

### Introducing Harness Self-Hosted Gitspaces

We’re thrilled and excited to announce the **BETA release of Harness Self-Hosted Gitspaces** — a big step forward in improving developer experience and productivity at enterprise scale.

Self-Hosted Gitspaces are on-demand, remote cloud development environments hosted within your **organization’s own infrastructure**. These environments come **pre-configured for instant coding** and provide an **extra layer of security** by giving you full control over infrastructure and data. This helps reduce the risk of external data exposure and ensures your source code isn’t cached or accessed by third-party cloud services.
Read more about **[Self-Hosted Gitspaces](/docs/cloud-development-environments/introduction/self-hosted)**.

// Video Link

### Why Self-Hosted?

Local development environments often create more problems than they solve — inconsistent setups, endless configuration hours, security and compliance risks, and the list goes on.
Harness Hosted Cloud Development Environments solve these challenges by delivering speed and simplicity to developers.

Harness-Hosted Gitspaces are fully managed by Harness and reduce setup complexity for end users.
However, as organizations grow and adopt stricter security and compliance standards, Harness-Hosted Gitspaces can pose some enterprise-level challenges:

* **Security & Data Sovereignty**: Lack of full control over source code and developer data.
* **Customization Limitations**: Hosted solutions may not support deep customization of tooling and environment setup.
* **Latency Issues**: Fixed hosted regions can lead to performance issues for globally distributed teams.

In contrast, Self-Hosted Gitspaces solve these challenges by offering complete infrastructure and data control. 

Read more about the different **[Use Cases of Self-Hosted Gitspaces](/docs/cloud-development-environments/introduction/self-hosted#self-hosted-vs-harness-hosted-gitspaces)**.

### Get Started

If you’re interested and want to get started with Self-Hosted Gitspaces, here’s what you need to do:

1. **Go Through the Prerequisites and Fundamentals**: Before you begin, it’s important to understand the **underlying architecture** and **concepts of Self-Hosted Gitspaces**.

   * 🔗 [Self-Hosted Gitspaces Architecture](/docs/cloud-development-environments/deep-dive-into-gitspaces/self-hosted-architecture)
   * 🔗 [Fundamental Concepts](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals)
   * 🔗 [Prerequisites](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals#prerequisites)

2. **Configure Gitspace Infrastructure via Harness UI**: Start by configuring your **Gitspace infrastructure in the Harness UI**. This lets you input your infrastructure details, which will be referenced later during provisioning.

   * 🔗 [Configure Gitspace Infrastructure via Harness UI](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui)

3. **Configure and Set Up the Terraform Module**: Once the infrastructure is configured in the UI, initialize and use the **Harness Gitspaces Terraform Module**. This module will create all required GCP infrastructure and set up VM instances for the CDE Gateway.

   * 🔗 [Set Up Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform)

4. **Set Up Runner and Install Delegate**: After provisioning, install the **VM Runner and Delegate** on your GCP VM instance. This ensures the Harness Control Plane can establish a connection with your infrastructure to create and manage Gitspaces.

   * 🔗 [Set Up Runner and Install Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/steps/runner-delegate)

5. **Create Machines & Gitspaces**: Once everything is set up, you can start **creating machines** and **Gitspaces** directly.

   * 🔗 [Create and Manage Machines](/docs/cloud-development-environments/self-hosted-gitspaces/steps/manage-self-hosted)

### What’s Coming Next?

We have a lot of exciting features on the way:

* AWS infrastructure support for Self-Hosted Gitspaces
* RBAC for admin functionality
* Admin-controlled features to manage Gitspaces access
* Support for custom machine images
* …and many more!

✨ Stay tuned for our next release - happening soon!
