---
title: Install Harness Self-Managed Enterprise Edition in a demo/non-production environment
sidebar_label: Install in a demo/non-prod environment
description: Harness supports Self-Managed Enterprise Edition installation in your cloud provider for demo/non-production environments. Tutorials are available for you to learn how to install in your cloud provider.
sidebar_position: 1
---

To use Harness Self-Managed Enterprise Edition for demonstration, non-production development, or capability-assessment purposes, we offer tutorials to help you get started quickly on various providers. These tutorials are made to mirror the methods used at Harness for deployment testing.

:::info
For organizations planning to deploy Harness Self-Managed Enterprise Edition in a production environment, Harness requires that you engage with our Post-Sales Engineering team. This will ensure that we can assist you in setting up and deploying the platform to meet your enterprise-grade objectives such as high availability, build speed, and data reliability. Contact [Harness Support](mailto:support@harness.io) for more information.

:::

### Demo/non-production installation requirements

Regardless of the cloud or Kubernetes provider you use, validate the following before you install Harness Self-Managed Enterprise Edition:

- Your provider can meet the infrastructure requirements for our [development environment reference architecture](/docs/self-managed-enterprise-edition/install/harness-helm-chart/#development-environment-deployment-infrastructure).
- You utilize a [Supported Kubernetes version](/docs/self-managed-enterprise-edition/smp-supported-platforms/#supported-kubernetes-versions).
- You have a recent version of kubectl and a [supported Helm client](/docs/self-managed-enterprise-edition/install/install-using-helm/#helm-client-version-compatibility).
- You can provision and use Persistent Volumes. This is often taken care of by various block storage drivers within your cloud platform, such as the [EBS CSI Driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) for Amazon EKS.

### Quickstart architecture

Regardless of the cloud provider you use, our Quickstart process attempts to deploy an architecture that matches this reference:

![Quickstart architecture](./static/smp-quickstart-arch.png)

### Quickstart Networking

Harness Self-Managed Enterprise Edition's Helm deployment has methods to configure connections to existing production ingress controllers and load balancers your operations might currently use.

Harness Helm charts also ship with configurations for both an out-of-the-box NGINX ingress controller and a load balancer. You can set up and deploy these configurations to simplify the deployment process and modify them later to fit your production-level requirements.

### Demo installation options

You can install Harness Self-Managed Enterprise Edition for demo/non-prod purposes on the following cloud platforms:

- [Amazon Web Services (AWS)](/docs/self-managed-enterprise-edition/demo-non-prod-install/install-in-aws.md)
- [Google Cloud Platform (GCP)](/docs/self-managed-enterprise-edition/demo-non-prod-install/install-in-gcp.md)

