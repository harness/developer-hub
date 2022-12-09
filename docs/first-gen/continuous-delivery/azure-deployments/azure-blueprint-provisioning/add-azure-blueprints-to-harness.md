---
title: Add Azure Blueprints to Harness
description: Add your Azure Blueprint definitions to Harness using Harness Infrastructure Provisioners.
# sidebar_position: 2
helpdocs_topic_id: u4dej7jsix
helpdocs_category_id: 4on0a5avqo
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to add your Azure Blueprint definitions to Harness using Harness Infrastructure Provisioners. This involves providing the Git repo location of the Blueprint definitions and setting its scope in Harness.

Once you've added the definition as an Infrastructure Provisioner, you can use the Infrastructure Provisioner in a Harness Workflow to provision the Azure resources. Harness will run your Blueprint definition and create its Azure resources.

In this topic:

* [Before You Begin](add-azure-blueprints-to-harness.md#before-you-begin)
* [Limitations](add-azure-blueprints-to-harness.md#limitations)
* [Visual Summary](add-azure-blueprints-to-harness.md#visual-summary)
* [Supported Platforms and Technologies](add-azure-blueprints-to-harness.md#undefined)
* [Step 1: Add Harness Delegate](add-azure-blueprints-to-harness.md#step-1-add-harness-delegate)
* [Step 2: Add Source Source Provider](add-azure-blueprints-to-harness.md#step-2-add-source-source-provider)
* [Step 3: Add the Infrastructure Provisioner](add-azure-blueprints-to-harness.md#step-3-add-the-infrastructure-provisioner)
* [Next Step](add-azure-blueprints-to-harness.md#next-step)
* [Configure As Code](add-azure-blueprints-to-harness.md#configure-as-code)

### Before You Begin

* Get an overview of provisioning with ARM in [Azure ARM and Blueprint Provisioning with Harness](../../concepts-cd/deployment-types/azure-arm-and-blueprint-provision-with-harness.md).
* [Set Up Your Harness Account for Azure Blueprint](set-up-harness-for-azure-blueprint.md)

### Limitations

* See [Azure Blueprint How-tos](azure-blueprint-how-tos.md).
* Unlike other provisioners supported by Harness, Azure Blueprint definitions cannot be added to Infrastructure Definitions. Blueprint definitions cannot be used as deployment targets. You can simply use them in a Workflow to provision resources.  
You can use ARM templates to provision deployment target environments. See [Provision and Deploy to ARM Provisioned Infrastructure](../azure-arm/target-azure-arm-or-blueprint-provisioned-infrastructure.md).

### Visual Summary

The following video shows you how to add an ARM template from [Azure's ARM templates GitHub account](https://github.com/Azure/azure-quickstart-templates) to Harness as a Harness Infrastructure Provisioner.

### Supported Platforms and Technologies

See [Supported Platforms and Technologies](https://docs.harness.io/article/220d0ojx5y-supported-platforms).

### Step 1: Add Harness Delegate

Make sure you have set up a Harness Delegate as described in [Set Up Your Harness Account for Azure Blueprint](set-up-harness-for-azure-blueprint.md).

The Delegate must be able to connect to your Git provider to add the Blueprint folder, and to pull its package at deployment runtime.

### Step 2: Add Source Source Provider

Harness Source Repo Providers connect your Harness account with your Git platform accounts.

For Azure Blueprint, you add a Harness Source Repo Provider and connect it to the Git repo for your definitions.

For steps on setting up a Source Repo Provider, see [Add Source Repo Providers](https://docs.harness.io/article/ay9hlwbgwa-add-source-repo-providers).

Next, you use this Source Repo Provider as the source of your Harness Infrastructure Provisioner.

### Step 3: Add the Infrastructure Provisioner

In your Harness Application, click **Infrastructure Provisioners**.

Click **Add Infrastructure Provisioner**, and then click **ARM Template**. Blueprints are also managed under this Infrastructure Provisioner type.

In **Azure Resource Type**, select **Blueprint**.

In **Scope**, enter the scope for the definition. The `targetScope` in the blueprint identifies its scope.

Your assign.json file must have a `scope` property (`properties.scope`). The `scope` is the target subscription of the Blueprint assignment (format: `/subscriptions/{subscriptionId}`). For management group level assignments, the property is required.

For example:


```
{  
    "identity": {  
    "type": "SystemAssigned"  
    },  
    "location": "westus2",  
    "properties": {  
    "blueprintId": "/providers/Microsoft.Management/managementGroups/HarnessARMTest/providers/Microsoft.Blueprint/blueprints/101-boilerplate-mng/versions/v2",  
    "resourceGroups": {  
        "SingleRG": {  
        "name": "mng-001",  
        "location": "eastus"  
        }  
    },  
    "locks": {  
        "mode": "none"  
    },  
    "parameters": {  
        "principalIds": {  
        "value": "0000000-0000-0000-0000-0000000000"  
        },  
        "genericBlueprintParameter": {  
        "value": "test"  
        }  
    },  
    "scope": "/subscriptions/0000000-0000-0000-0000-0000000000"  
    }  
}
```
In **Source Type**, **Git Repository** is selected. It is the only option currently.

If you select **Git Repository**, select the Harness Source Repo Provider you set up to connect Harness to your Git repo.

In **Commit**, enter the branch or commit ID for the repo.

Enter the branch name or commit ID.

In **File Path**, enter path to the definition folder in the Git repo. You don't need to enter the repo name, as that is set up in the Harness Source Repo Provider.

Click **Submit**.

The Infrastructure Provisioner is added.

Now you can use the Infrastructure Provisioner in a Harness Workflow to provision the Azure resources. Harness will run your Blueprint definition and create its Azure resources.

### Next Step

* [Provision using Azure Blueprint Definitions](provision-using-azure-blueprint-definitions.md)

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

