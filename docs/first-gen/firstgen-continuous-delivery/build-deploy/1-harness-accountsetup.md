---
title: Connect to Your Artifact Build and Deploy Pipeline Platforms
description: Set up the Harness Delegate, Artifact Server, and Cloud Provider for the Pipeline.
# sidebar_position: 2
helpdocs_topic_id: xiys9djs0h
helpdocs_category_id: j1q21aler1
helpdocs_is_private: false
helpdocs_is_published: true
---

You need to set up the following common Harness account-level component, before creating Harness Application containing your Artifact Build and Deploy Workflows and Pipelines:

* [Harness Delegate](/article/xiys9djs0h-1-harness-accountsetup#step_1_install_a_harness_delegate)
* [Artifact Server](/article/xiys9djs0h-1-harness-accountsetup#step_2_create_an_artifact_server)
* [Cloud Provider](/article/xiys9djs0h-1-harness-accountsetup#step_3_create_a_cloud_provider)

In this topic:

* [Before You Begin](https://docs.harness.io/article/xiys9djs0h-1-harness-accountsetup#before_you_begin)
* [Step 1: Install a Harness Delegate](https://docs.harness.io/article/xiys9djs0h-1-harness-accountsetup#step_1_install_a_harness_delegate)
* [Step 2: Create an Artifact Server](https://docs.harness.io/article/xiys9djs0h-1-harness-accountsetup#step_2_create_an_artifact_server)
* [Step 3: Create a Cloud Provider](https://docs.harness.io/article/xiys9djs0h-1-harness-accountsetup#step_3_create_a_cloud_provider)
* [Next Steps](https://docs.harness.io/article/xiys9djs0h-1-harness-accountsetup#next_steps)

### Before You Begin

* [CI/CD with the Build Workflow](/article/wqytbv2bfd-ci-cd-with-the-build-workflow)
* [Delegate Installation Overview](/article/igftn7rrtg-delegate-installation-overview)

### Step 1: Install a Harness Delegate

The Harness Delegate is a service you run in your local network or VPC to connect all of your artifact, infrastructure, collaboration, verification, and other providers with the Harness Manager.

As explained in [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts), when you set up Harness for the first time, you install a Harness Delegate in your target infrastructure (for example, Kubernetes cluster, ECS cluster, EC2 subnet, Pivotal Cloud Foundry space, etc). Once the Delegate is installed, you can set up the resources and model your release process.

The Delegate performs all deployment operations. To do so, it needs network connectivity to your artifact server, such as Jenkins, and your cloud deployment environment, such as a Kubernetes cluster or AWS. Also, the roles associated with the Delegate must have the policies needed to perform its operations.

For detailed information on installing Harness Delegates, see [Manage Harness Delegates](https://docs.harness.io/category/gyd73rp7np-manage-delegates).

### Step 2: Create an Artifact Server

After installing the Delegate, create an Artifact Server in Harness to connect to Jenkins or any other artifact server that you use. Provide the necessary credentials when you set up the Artifact Server.

For detailed information on creating an Artifact Server, see [Add Artifact Servers](/article/7dghbx1dbl-configuring-artifact-server).

### Step 3: Create a Cloud Provider

After installing the Delegate, you also need to create a Cloud Provider in Harness to connect to your target deployment environment. For some Cloud Providers, such as Kubernetes Cluster and AWS, the Cloud Providers can assume the credentials assigned to the Delegate.

For more information on creating a Cloud Provider, see [Add Cloud Providers](/article/whwnovprrb-cloud-providers).

Now that your Harness account-level components are set up, you can build your Harness Application containing your Artifact Build and Deploy Workflows and Pipelines.

### Next Steps

* [Add Your Build and Deploy Pipeline Artifacts](/article/xhh8oi4bkh-2-service-and-artifact-source)

