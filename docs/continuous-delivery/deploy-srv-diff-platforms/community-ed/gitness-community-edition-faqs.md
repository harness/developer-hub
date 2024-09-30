---
title: Harness Open Source and Free Edition FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps, specifically for Open Source and Free Edition swimlanes.
sidebar_position: 100
---

This article addresses some frequently asked questions about Harness Open Source and Free Edition deployments.

### Do you have a free version of Harness CD?

Harness CD has two free options to get started. 

- The [Harness CD & GitOps SaaS Free Plan](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg) is the recommended option for new users since there is no server side installation to manage.
- If a self-managed yet lightweight option is needed, then the recommended option is to use [Harness Open Source](/docs/open-source/overview).

:::warning
As of Dec 2023, the Harness CD Community Edition (CE) is retired in favor of [Harness Open Source](/docs/open-source/overview).

:::

### What can I do with Harness CD Community Edition?

- Today, Harness CD Community Edition can perform Kubernetes deployments only. This means pulling remote manifests and artifacts and deploying them to a local or remote Kubernetes cluster.
- You can also use Harness CD features such as automated rolling, canary and blue green deployments, automated infrastructure provisioning, integrated approvals and notifications, full YAML-based development, and Harness Git Experience.
- In the near future, Amazon Web Services (AWS) (Elastic Container Service (ECS), Auto Scale Groups (ASG), CloudFormation, Lambda, etc), Microsoft Azure (Virtual Machine Scale Sets (VMSS), WebApps, Azure Kubernetes Service (AKS), Azure Container Registry (ACR), Azure Resource Manager (ARM), Blueprint), .NET, Google Cloud Build, VM, Tanzu Application Services (TAS), Serverless, and traditional (Tomcat, etc) deployments will be supported.

### Can I upgrade to a paid plan from Harness CD Community Edition?

Yes, you can upgrade from within Harness in **Account Settings** > **Subscriptions** or by contacting [Harness Sales](mailto:sales@harness.io).

### What data does Community Edition collect?

By default, Harness CD Community Edition shares minor usage details with Harness. These details help us understand and improve how the system behaves in real-world scenarios.

When you install an instance of Harness CD Community Edition, Harness collects the email address used to sign up in Harness, the number of users added to your Harness CD Community Edition, and the number of builds, deployments, and pipelines, and the information described above.

Harness uses this information for sales, support, product updates, security updates, policy updates, and license compliance.

The use of this information is governed by our [Privacy Policy](https://harness.io/privacy).

If you would like us to stop processing your data, or if you have any other questions or requests concerning your data, please contact the [Harness Privacy Team](mailto:privacy@harness.io). For more information on how we process your data, go to our [Privacy Policy](https://harness.io/privacy).

### The current documentation advises us to use the Drone plugin model. How similar will this be with the move to Gitness?

Gitness is using Drone plugins so rework is not necessary.
The only changes with Gitness is you need to provide an additional mapping file that defines inputs and maps those inputs into the plugin container.

