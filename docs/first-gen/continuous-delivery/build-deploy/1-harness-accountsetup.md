---
title: Connect to Your Artifact Build and Deploy Pipeline Platforms
description: Set up the Harness Delegate, Artifact Server, and Cloud Provider for the Pipeline.
sidebar_position: 20
helpdocs_topic_id: xiys9djs0h
helpdocs_category_id: j1q21aler1
helpdocs_is_private: false
helpdocs_is_published: true
---

You need to set up the following common Harness account-level component, before creating Harness Application containing your Artifact Build and Deploy Workflows and Pipelines:

* [Harness Delegate](1-harness-accountsetup.md#step-1-install-a-harness-delegate)
* [Artifact Server](1-harness-accountsetup.md#step-2-create-an-artifact-server)
* [Cloud Provider](1-harness-accountsetup.md#step-3-create-a-cloud-provider)

In this topic:

* [Before You Begin](1-harness-accountsetup.md#before-you-begin)
* [Step 1: Install a Harness Delegate](1-harness-accountsetup.md#step-1-install-a-harness-delegate)
* [Step 2: Create an Artifact Server](1-harness-accountsetup.md#step-2-create-an-artifact-server)
* [Step 3: Create a Cloud Provider](1-harness-accountsetup.md#step-3-create-a-cloud-provider)
* [Next Steps](1-harness-accountsetup.md#next-steps)

### Before You Begin

* [CI/CD with the Build Workflow](../concepts-cd/deployment-types/ci-cd-with-the-build-workflow.md)
* [Delegate Installation Overview](https://docs.harness.io/article/igftn7rrtg-delegate-installation-overview)

### Step 1: Install a Harness Delegate

The Harness Delegate is a service you run in your local network or VPC to connect all of your artifact, infrastructure, collaboration, verification, and other providers with the Harness Manager.

As explained in [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts), when you set up Harness for the first time, you install a Harness Delegate in your target infrastructure (for example, Kubernetes cluster, ECS cluster, EC2 subnet, Pivotal Cloud Foundry space, etc). Once the Delegate is installed, you can set up the resources and model your release process.

The Delegate performs all deployment operations. To do so, it needs network connectivity to your artifact server, such as Jenkins, and your cloud deployment environment, such as a Kubernetes cluster or AWS. Also, the roles associated with the Delegate must have the policies needed to perform its operations.

For detailed information on installing Harness Delegates, see [Manage Harness Delegates](https://docs.harness.io/category/gyd73rp7np-manage-delegates).

### Step 2: Create an Artifact Server

After installing the Delegate, create an Artifact Server in Harness to connect to Jenkins or any other artifact server that you use. Provide the necessary credentials when you set up the Artifact Server.

For detailed information on creating an Artifact Server, see [Add Artifact Servers](https://docs.harness.io/article/7dghbx1dbl-configuring-artifact-server).

### Step 3: Create a Cloud Provider

After installing the Delegate, you also need to create a Cloud Provider in Harness to connect to your target deployment environment. For some Cloud Providers, such as Kubernetes Cluster and AWS, the Cloud Providers can assume the credentials assigned to the Delegate.

For more information on creating a Cloud Provider, see [Add Cloud Providers](https://docs.harness.io/article/whwnovprrb-cloud-providers).

Now that your Harness account-level components are set up, you can build your Harness Application containing your Artifact Build and Deploy Workflows and Pipelines.

### Next Steps

* [Add Your Build and Deploy Pipeline Artifacts](2-service-and-artifact-source.md)

