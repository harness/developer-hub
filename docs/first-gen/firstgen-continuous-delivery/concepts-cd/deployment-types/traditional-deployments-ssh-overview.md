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

For How-tos on Traditional deployments, see [Traditional (SSH) Deployments How-tos](/article/6pwni5f9el-traditional-deployments-overview).You can perform traditional deployments to AWS and Azure, and to any server on any platform via a platform agnostic [Physical Data Center](/article/stkxmb643f-add-physical-data-center-cloud-provider) connection. In all cases, you simply set up a Harness Infrastructure Definition and target the hosts on the platform.

These deployments are different from Harness deployments using container orchestration platforms like [Kubernetes](/article/7in9z2boh6-kubernetes-quickstart), [Helm](/article/2aaevhygep-helm-quickstart), [Pivotal](/article/hy819vmsux-pivotal-cloud-foundry-quickstart), [AWS ECS](/article/j39azkrevm-aws-ecs-deployments), and [Azure](/article/kiuft72fr5-azure-deployments-overview).

For a Build and Deploy Pipeline using a Traditional deployment, see [Artifact Build and Deploy Pipelines Overview](/article/0tphhkfqx8-artifact-build-and-deploy-pipelines-overview).Traditional deployments involve obtaining an application package from an artifact source, such as a WAR file in an AWS S3 bucket, and deploying it to a target host, such as a virtual machine.

### Supported Packaging Formats

Harness supports the following traditional deployment packaging formats: WAR, JAR, TAR, RPM, ZIP, Docker, and custom files.

All of these formats are also supported by other Harness deployment types, such as Kubernetes, Helm, PCF, ECS, etc.  This guide is concerned with traditional deployments outside of the container orchestration platforms.

### Supported Platforms and Technologies

See **SSH** in [Supported Platforms and Technologies](/article/220d0ojx5y-supported-platforms).

### Deployment Summary

For a general overview of how Harness works, see [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).

The following list describes the major steps involved in a Traditional deployment:

1. Installing the Harness Delegate in your target infrastructure. See [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation).
2. Add a connection to your artifact server. See [Add Artifactory Servers](/article/nj3p1t7v3x-add-artifactory-servers).
3. Add a connection to your cloud provider. This is a connection to your deployment infrastructure, either physical or hosted in a cloud platform like AWS, GCP, or Azure. See [Add Cloud Providers](/article/whwnovprrb-cloud-providers).
4. Create the Harness Application for your deploying your application packages.
5. Create the Harness Service using the SSH type.
	1. Add your packaged application file(s) as an Artifact Source.
6. Create the Harness Environment containing the [Infrastructure Definition](https://docs.harness.io/article/n39w05njjv-environment-configuration#add_an_infrastructure_definition) definition of your deployment infrastructure.
7. Create the Basic Deployment Workflow.
8. Deploy the Workflow.
9. Next steps:
	1. Create a Harness Pipeline for your deployment, including Workflows and Approval steps. For more information, see [Pipelines](https://docs.harness.io/article/zc1u96u6uj-pipeline-configuration) and [Approvals](/article/0ajz35u2hy-approvals).
	2. Create a Harness Trigger to automatically deploy your Workflows or Pipeline according to your criteria. For more information, see [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2).
	3. Create Harness Infrastructure Provisioners for your deployment environments. For more information, see [Infrastructure Provisioners](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner).

### Next Step

Traditional Deployments How-tos:

* [Connect to Your Repos and Target SSH Platforms](/article/mk5pjqyugc-connect-to-your-target-ssh-platform)
* [Add Artifacts and App Stacks for Traditional (SSH) Deployments](/article/umpe4zfnac-add-artifacts-for-ssh-deployments)
* [Add Scripts for Traditional (SSH) Deployments](/article/ih779z9kb6-add-deployment-specs-for-traditional-ssh-deployments)
* [Define Your Traditional (SSH) Target Infrastructure](/article/5qh02lv090-define-your-traditional-ssh-target-infrastructure)
* [Create Default Application Directories and Variables](/article/lgg12f0yry-set-default-application-directories-as-variables)
* [Create a Basic Workflow for Traditional (SSH) Deployments](/article/8zff5k2frj-create-a-basic-workflow-for-traditional-ssh-deployments)

