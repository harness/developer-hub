---
title: Set Up Your Harness Account for Azure Blueprint
description: The first step in integrating your Blueprint definitions into Harness is setting up the necessary Harness account components --  Delegates, Cloud Providers, and Source Repo Providers. This topic describ…
sidebar_position: 200
helpdocs_topic_id: 0qc8f6w5qn
helpdocs_category_id: 4on0a5avqo
helpdocs_is_private: false
helpdocs_is_published: true
---

The first step in integrating your Blueprint definitions into Harness is setting up the necessary Harness account components: Delegates, Cloud Providers, and Source Repo Providers.

This topic describes how to set up these components for Blueprint.

Once you set your account for Blueprint, you can begin integrating your Blueprint definitions. See [Add Azure Blueprints to Harness](add-azure-blueprints-to-harness.md).


### Before You Begin

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* Get an overview of provisioning with Blueprint in [Azure ARM and Blueprint Provisioning with Harness](../../concepts-cd/deployment-types/azure-arm-and-blueprint-provision-with-harness.md).
* [Delegate Installation and Management](../../../firstgen-platform/account/manage-delegates/delegate-installation.md)
* [Add Cloud Providers](../../../firstgen-platform/account/manage-connectors/cloud-providers.md)
* [Add Source Repo Providers](../../../firstgen-platform/account/manage-connectors/add-source-repo-providers.md)

### Limitations

See [Azure Blueprint How-tos](azure-blueprint-how-tos.md).

### Step 1: Install a Harness Delegate

A Harness Delegate performs the Blueprint provisioning in your Blueprint definitions. When installing the Delegate for your Blueprint provisioning, consider the following:

* The Delegate must also be able to connect to your definition repo. The Delegate will pull the definition at deployment runtime.
* All Harness Delegates types can use Blueprint.

To install a Delegate, follow the steps in [Delegate Installation and Management](../../../firstgen-platform/account/manage-delegates/delegate-installation.md). Once you install the Delegate and it registers with Harness, you'll see it on the Harness Delegates page.

### Step 2: Set Up the Azure Cloud Provider

A Harness Azure Cloud Provider connects to your Azure subscription using your Client ID and Tenant ID.

Follow the steps in [Add Microsoft Azure Cloud Provider](../../../firstgen-platform/account/manage-connectors/add-microsoft-azure-cloud-provider.md) to connect Harness to Azure.

The Azure service account for the Azure Cloud Provider will need the roles required for the Azure resources you are provisioning.

See **Azure Blueprint** in [Add Microsoft Azure Cloud Provider](../../../firstgen-platform/account/manage-connectors/add-microsoft-azure-cloud-provider.md).

### Step 3: Set Up Source Repo Provider

Harness pulls Azure Blueprint definitions from a Git repo, such as GitHub.

Add a Harness Source Repo Provider to connect Harness to the Git account/repo for your blueprints.

If Source Repo Provider connects to a Git account, you can specify the repo in each Infrastructure Provisioner that uses that Source Repo Provider.

See [Add Source Repo Providers](../../../firstgen-platform/account/manage-connectors/add-source-repo-providers.md).

### Next Step

[Add Azure Blueprints to Harness](add-azure-blueprints-to-harness.md)

