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

These deployments are different from Harness deployments using container orchestration platforms like [Kubernetes](../../first-gen-quickstarts/kubernetes-quickstart.md), [Helm](../../first-gen-quickstarts/helm-quickstart.md), [Pivotal](../../first-gen-quickstarts/pivotal-cloud-foundry-quickstart.md), [AWS ECS](../../first-gen-quickstarts/aws-ecs-deployments.md), and [Azure](../azure-deployments/aks-howtos/azure-deployments-overview.md).

Traditional deployments involve obtaining an application package from an artifact source, such as a WAR file in an AWS S3 bucket, and deploying it to a target host, such an AWS AMI.

For an overview, see [Traditional Deployments (SSH) Overview](../concepts-cd/deployment-types/traditional-deployments-ssh-overview.md).

Traditional Deployments How-tos:

* [Connect to Your Repos and Target SSH Platforms](connect-to-your-target-ssh-platform.md)
* [Add Artifacts and App Stacks for Traditional (SSH) Deployments](add-artifacts-for-ssh-deployments.md)
* [Add Scripts for Traditional (SSH) Deployments](add-deployment-specs-for-traditional-ssh-deployments.md)
* [Define Your Traditional (SSH) Target Infrastructure](define-your-traditional-ssh-target-infrastructure.md)
* [Create Default Application Directories and Variables](../model-cd-pipeline/applications/set-default-application-directories-as-variables.md)
* [Create a Basic Workflow for Traditional (SSH) Deployments](create-a-basic-workflow-for-traditional-ssh-deployments.md)

