---
title: Harness Self-Managed Enterprise Edition Overview
sidebar_label: Overview
description: This topic provides the basics on how to create a Harness account and first project. These are the first tasks that come after installing the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 2
helpdocs_topic_id: 09gjhl0tcw
helpdocs_category_id: tvlmjozubh
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/self-managed-enterprise-edition/introduction/harness-self-managed-enterprise-edition-overview
  - /docs/self-managed-enterprise-edition/introduction/getting-started-with-self-managed-enterprise-edition
---

This topic provides an architecture overview, installation links, and the basics on how to create a Harness account and your first project. Perform these tasks soon after you install Harness Self-Managed Enterprise Edition, before you move on to other configuration tasks.

To install Harness Self-Managed Enterprise Edition in a Kubernetes cluster with Helm, go to [Install Harness Self-Managed Enterprise Edition Using Helm](../self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga.md).

## Architecture overview
You can install Harness Self-Managed Enterprise Edition in a Kubernetes cluster or on virtual machines.

Review the following diagrams for your installation type.

### Kubernetes cluster configuration

Harness Self-Managed Enterprise Edition is installed in a Kubernetes cluster in the following configuration.

![](./static/harness-self-managed-enterprise-edition-overview-00.png)

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

To create a project, do the following:

1. From the **Continuous Delivery** start page, select **Create Project**.

   ![](./static/getting-started-with-self-managed-enterprise-edition-03.png)

2. In **Invite Collaborators**, type of the names of the collaborators you want to invite.

    ![](./static/getting-started-with-self-managed-enterprise-edition-04.png)

3. Enter the project name, and optionally enter a description and tags for your project.

   ![](./static/getting-started-with-self-managed-enterprise-edition-05.png)

4. Select **Setup Later**.

### Next steps

To get started with Harness Self-Managed Enterprise Edition, go to the following Harness module topics:

* Harness CCM: [Introduction to Cloud Cost Management](/docs/cloud-cost-management/getting-started-ccm/continuous-efficiency-overview).
* Harness CET: [Set up Continuous Error Tracking (CET)](/docs/continuous-error-tracking/getting-started/cet-setup).
* Harness CI: [CI Pipeline Quickstart](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md).
* Harness CD: [CD Pipeline Basics](../../continuous-delivery/get-started/key-concepts.md).
* Harness FF: [Get started with a flag](/docs/feature-flags/ff-onboarding/getting-started-with-feature-flags).
* Harness STO: [Security Testing Orchestration Basics](../../security-testing-orchestration/onboard-sto/security-testing-orchestration-basics.md).
* Harness Chaos Engineering: [Get started with Harness Chaos Engineering](/docs/category/get-started-with-harness-chaos-engineering-ce).
