---
title: Traditional Deployments (SSH) Overview
description: Traditional deployments use application package files and a runtime environment (Tomcat, JBoss) in Harness. For How-tos on Traditional deployments, see Traditional (SSH) Deployments How-tos. You can…
# sidebar_position: 2
helpdocs_topic_id: aig5tw1zvo
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

Traditional deployments use application package files and a runtime environment (Tomcat, JBoss) in Harness.

For How-tos on Traditional deployments, see [Traditional (SSH) Deployments How-tos](../../traditional-deployments/traditional-deployments-overview.md).You can perform traditional deployments to AWS and Azure, and to any server on any platform via a platform agnostic [Physical Data Center](../../../firstgen-platform/account/manage-connectors/add-physical-data-center-cloud-provider.md) connection. In all cases, you simply set up a Harness Infrastructure Definition and target the hosts on the platform.

These deployments are different from Harness deployments using container orchestration platforms like [Kubernetes](../../../first-gen-quickstarts/kubernetes-quickstart.md), [Helm](../../../first-gen-quickstarts/helm-quickstart.md), [Pivotal](../../../first-gen-quickstarts/pivotal-cloud-foundry-quickstart.md), [AWS ECS](../../../first-gen-quickstarts/aws-ecs-deployments.md), and [Azure](../../azure-deployments/aks-howtos/azure-deployments-overview.md).

For a Build and Deploy Pipeline using a Traditional deployment, see [Artifact Build and Deploy Pipelines Overview](artifact-build-and-deploy-pipelines-overview.md).Traditional deployments involve obtaining an application package from an artifact source, such as a WAR file in an AWS S3 bucket, and deploying it to a target host, such as a virtual machine.

### Supported Packaging Formats

Harness supports the following traditional deployment packaging formats: WAR, JAR, TAR, RPM, ZIP, Docker, and custom files.

All of these formats are also supported by other Harness deployment types, such as Kubernetes, Helm, PCF, ECS, etc.  This guide is concerned with traditional deployments outside of the container orchestration platforms.

### Supported Platforms and Technologies

See **SSH** in [Supported Platforms and Technologies](../../../starthere-firstgen/supported-platforms.md).

### Deployment Summary

For a general overview of how Harness works, see [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md).

The following list describes the major steps involved in a Traditional deployment:

1. Installing the Harness Delegate in your target infrastructure. See [Harness Delegate Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation.md).
2. Add a connection to your artifact server. See [Add Artifactory Servers](../../../firstgen-platform/account/manage-connectors/add-artifactory-servers.md).
3. Add a connection to your cloud provider. This is a connection to your deployment infrastructure, either physical or hosted in a cloud platform like AWS, GCP, or Azure. See [Add Cloud Providers](../../../firstgen-platform/account/manage-connectors/cloud-providers.md).
4. Create the Harness Application for your deploying your application packages.
5. Create the Harness Service using the SSH type.
	1. Add your packaged application file(s) as an Artifact Source.
6. Create the Harness Environment containing the [Infrastructure Definition](/docs/first-gen/continuous-delivery/model-cd-pipeline/environments/environment-configuration) definition of your deployment infrastructure.
7. Create the Basic Deployment Workflow.
8. Deploy the Workflow.
9. Next steps:
	1. Create a Harness Pipeline for your deployment, including Workflows and Approval steps. For more information, see [Pipelines](../../model-cd-pipeline/pipelines/pipeline-configuration.md) and [Approvals](../../model-cd-pipeline/approvals/approvals.md).
	2. Create a Harness Trigger to automatically deploy your Workflows or Pipeline according to your criteria. For more information, see [Triggers](../../model-cd-pipeline/triggers/add-a-trigger-2.md).
	3. Create Harness Infrastructure Provisioners for your deployment environments. For more information, see [Infrastructure Provisioners](../../model-cd-pipeline/infrastructure-provisioner/add-an-infra-provisioner.md).

### Next Step

Traditional Deployments How-tos:

* [Connect to Your Repos and Target SSH Platforms](../../traditional-deployments/connect-to-your-target-ssh-platform.md)
* [Add Artifacts and App Stacks for Traditional (SSH) Deployments](../../traditional-deployments/add-artifacts-for-ssh-deployments.md)
* [Add Scripts for Traditional (SSH) Deployments](../../traditional-deployments/add-deployment-specs-for-traditional-ssh-deployments.md)
* [Define Your Traditional (SSH) Target Infrastructure](../../traditional-deployments/define-your-traditional-ssh-target-infrastructure.md)
* [Create Default Application Directories and Variables](../../model-cd-pipeline/applications/set-default-application-directories-as-variables.md)
* [Create a Basic Workflow for Traditional (SSH) Deployments](../../traditional-deployments/create-a-basic-workflow-for-traditional-ssh-deployments.md)

