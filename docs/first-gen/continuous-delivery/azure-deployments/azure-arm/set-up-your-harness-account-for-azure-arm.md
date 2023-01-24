---
title: Set Up Your Harness Account for Azure ARM
description: Set up Harness account components for ARM provisioning.
sidebar_position: 200
helpdocs_topic_id: l3do0np70h
helpdocs_category_id: 3i7h1lzlt2
helpdocs_is_private: false
helpdocs_is_published: true
---

The first step in integrating your ARM templates into Harness is setting up the necessary Harness account components: Delegates, Cloud Providers, and Source Repo Providers.

This topic describes how to set up these components for ARM.

Once you set your account for ARM, you can begin integrating your ARM templates. See [Add Azure ARM Templates to Harness](add-azure-arm-templates.md).

In this topic:

* [Before You Begin](set-up-your-harness-account-for-azure-arm.md#before-you-begin)
* [Limitations](set-up-your-harness-account-for-azure-arm.md#limitations)
* [Step 1: Install a Harness Delegate](set-up-your-harness-account-for-azure-arm.md#step-1-install-a-harness-delegate)
* [Step 2: Set Up the Azure Cloud Provider](set-up-your-harness-account-for-azure-arm.md#step-2-set-up-the-azure-cloud-provider)
* [Step 3: Set Up Source Repo Provider](set-up-your-harness-account-for-azure-arm.md#step-3-set-up-source-repo-provider)
* [Option: Set Up the Harness Artifact Server](set-up-your-harness-account-for-azure-arm.md#option-set-up-the-harness-artifact-server)

### Before You Begin

* [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts)
* Get an overview of provisioning with ARM in [Azure ARM and Blueprint Provisioning with Harness](../../concepts-cd/deployment-types/azure-arm-and-blueprint-provision-with-harness.md).
* [Delegate Installation and Management](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation)
* [Add Cloud Providers](https://docs.harness.io/article/whwnovprrb-cloud-providers)
* [Add Source Repo Providers](https://docs.harness.io/article/ay9hlwbgwa-add-source-repo-providers)

### Limitations

See [Azure Resource Management (ARM) How-tos](azure-arm-and-blueprint-how-tos.md).

### Step 1: Install a Harness Delegate

A Harness Delegate performs the ARM provisioning in your ARM templates. When installing the Delegate for your ARM provisioning, consider the following:

* Install the Delegate where it can connect to the target infrastructure.
	+ If you are using ARM to provision the target infrastructure for an Azure Web App deployment, make sure this Delegate is in, or can connect to, the resource group for your Azure Web App.
* The Delegate must also be able to connect to your template repo. The Delegate will pull the templates at deployment runtime.
* All Harness Delegates types can use ARM.

To install a Delegate, follow the steps in [Delegate Installation and Management](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation). Once you install the Delegate and it registers with Harness, you'll see it on the Harness Delegates page.

### Step 2: Set Up the Azure Cloud Provider

A Harness Azure Cloud Provider connects to your Azure subscription using your Client ID and Tenant ID.

Follow the steps in [Add Microsoft Azure Cloud Provider](https://docs.harness.io/article/4n3595l6in-add-microsoft-azure-cloud-provider) to connect Harness to Azure.

The Azure service account for the Azure Cloud Provider will need the roles required for the Azure resources you are provisioning.

See **Azure Resource Management (ARM)** in [Add Microsoft Azure Cloud Provider](https://docs.harness.io/article/4n3595l6in-add-microsoft-azure-cloud-provider).

### Step 3: Set Up Source Repo Provider

Harness pulls Azure ARM templates from a Git repo, such as GitHub.

Add a Harness Source Repo Provider to connect Harness to the Git repo for your templates.

You can also add your templates and parameters inline in Harness. In this case, you do not need a Source Repo Provider.

See [Add Source Repo Providers](https://docs.harness.io/article/ay9hlwbgwa-add-source-repo-providers).

### Option: Set Up the Harness Artifact Server

If you are performing ARM provisioning as part of [Azure Web App deployment](../azure-webapp-category/azure-web-app-deployments-overview.md), add a Harness Artifact Server to connect Harness to your Docker artifact server, such as a Docker Registry or Artifactory.

See [Connect to Azure and Artifact Repo for Your Web App Deployments](../azure-webapp-category/connect-to-azure-for-web-app-deployments.md).

If you store the artifact Docker image in Azure Container Registry, then you can use the Azure Cloud Provider you set up and skip the Artifact Server setup.If you simply going to provision resources without deploying anything, then you don't need to set up a Harness Artifact Server.

