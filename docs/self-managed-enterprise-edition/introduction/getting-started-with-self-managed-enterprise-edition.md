---
title: Harness Self-Managed Enterprise Edition Overview
sidebar_label: Overview
description: This topic provides the basics on how to create a Harness account and first project. These are the first tasks that come after installing the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 2
redirect_from:
  - /docs/self-managed-enterprise-edition/introduction/harness-self-managed-enterprise-edition-overview
helpdocs_topic_id: 09gjhl0tcw
helpdocs_category_id: tvlmjozubh
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides an architecture overview, installation links, and the basics on how to create a Harness account and your first project. These are the first tasks that come after you install Harness Self-Managed Enterprise Edition.

For links to information about using CI and CD pipelines, as well as the basics on Security Testing Orchestration (STO), go to [Next steps](/docs/self-managed-enterprise-edition/introduction/getting-started-with-self-managed-enterprise-edition#next-steps).

## Architecture overview
Harness Self-Managed Enterprise Edition can be installed in a Kubernetes cluster or on virtual machines.

Review the following diagrams for your installation type.

### Kubernetes cluster configuration

Harness Self-Managed Enterprise Edition is installed in a Kubernetes cluster in the following configuration.

![](./static/harness-self-managed-enterprise-edition-overview-00.png)To install Harness Self-Managed Enterprise Edition in a Kubernetes cluster, use the following instructions:

1. For Self-Managed Enterprise Edition with Helm, go to [Install Harness Self-Managed Enterprise Edition Using Helm](../self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga.md).
2. For Self-Managed Enterprise Edition with KOTS, go to [Install Self-Managed Enterprise Edition Using KOTS](../deploy-with-kots/kubernetes-cluster-on-prem-kubernetes-cluster-setup.md).

**AWS architecture**

![](./static/aws_architecture_smpOverview.png)

## Create your Harness account

You create your Harness account the first time you use Harness Self-Managed Enterprise Edition. You are automatically assigned the Harness user role, **Account Admin**.

![](./static/getting-started-with-self-managed-enterprise-edition-01.png)

To create your Harness account, do the following:

1. On the Harness **Sign up** page, enter your email address and a secure password.

2. Select **Sign up**.

   After your account is created, you arrive at the **Continuous Delivery** start page.
   
   ![](./static/getting-started-with-self-managed-enterprise-edition-02.png)

## Create your first project

It takes time to learn how to create complex CI/CD pipelines. You can start with opening a project and inviting collaborators. 

To create a project, do the following:

1. From the **Continuous Delivery** start page, select **Create Project**.

   ![](./static/getting-started-with-self-managed-enterprise-edition-03.png)

2. In **Invite Collaborators**, type of the names of the collaborators you want to invite.

    ![](./static/getting-started-with-self-managed-enterprise-edition-04.png)

3. Enter the project name, and optionally enter a description and tags for your project.

   ![](./static/getting-started-with-self-managed-enterprise-edition-05.png)

4. Select **Setup Later**.

### Next steps

To get started with creating pipelines and Helm-based installs in Harness Self-Managed Enterprise Edition, go to [Harness Docs](https://docs.harness.io/):

* For Harness CI, go to [CI Pipeline Quickstart](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md).
* For Harness CD, go to [CD Pipeline Basics](../../continuous-delivery/get-started/cd-pipeline-basics.md).
* For Harness STO, go to [Security Testing Orchestration Basics](../../security-testing-orchestration/onboard-sto/security-testing-orchestration-basics.md).
* For Harness Chaos Engineering, go to [Get started with Harness Chaos Engineering](/docs/category/get-started-with-harness-chaos-engineering-ce).
