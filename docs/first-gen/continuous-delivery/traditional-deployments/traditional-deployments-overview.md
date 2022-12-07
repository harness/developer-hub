---
title: Traditional (SSH) Deployments How-tos
description: An overview of traditional deployments using Harness.
sidebar_position: 10
helpdocs_topic_id: 6pwni5f9el
helpdocs_category_id: td451rmlr3
helpdocs_is_private: false
helpdocs_is_published: true
---

The following topics discuss how to perform Traditional deployments using application package files and a runtime environment (Tomcat, JBoss) in Harness.

These deployments are different from Harness deployments using container orchestration platforms like [Kubernetes](https://docs.harness.io/article/7in9z2boh6-kubernetes-quickstart), [Helm](https://docs.harness.io/article/2aaevhygep-helm-quickstart), [Pivotal](https://docs.harness.io/article/hy819vmsux-pivotal-cloud-foundry-quickstart), [AWS ECS](https://docs.harness.io/article/j39azkrevm-aws-ecs-deployments), and [Azure](../azure-deployments/aks-howtos/azure-deployments-overview.md).

Traditional deployments involve obtaining an application package from an artifact source, such as a WAR file in an AWS S3 bucket, and deploying it to a target host, such an AWS AMI.

For an overview, see [Traditional Deployments (SSH) Overview](../concepts-cd/deployment-types/traditional-deployments-ssh-overview.md).

Traditional Deployments How-tos:

* [Connect to Your Repos and Target SSH Platforms](connect-to-your-target-ssh-platform.md)
* [Add Artifacts and App Stacks for Traditional (SSH) Deployments](add-artifacts-for-ssh-deployments.md)
* [Add Scripts for Traditional (SSH) Deployments](add-deployment-specs-for-traditional-ssh-deployments.md)
* [Define Your Traditional (SSH) Target Infrastructure](define-your-traditional-ssh-target-infrastructure.md)
* [Create Default Application Directories and Variables](https://docs.harness.io/article/lgg12f0yry-set-default-application-directories-as-variables)
* [Create a Basic Workflow for Traditional (SSH) Deployments](create-a-basic-workflow-for-traditional-ssh-deployments.md)

