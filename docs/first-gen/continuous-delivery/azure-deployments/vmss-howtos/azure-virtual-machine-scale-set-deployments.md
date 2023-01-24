---
title: Azure Virtual Machine Scale Set Deployments Overview
description: Currently, this feature is behind the Feature Flag AZURE_VMSS. Contact Harness Support to enable the feature. To deploy an Azure virtual machine scale set (VMSS) using Harness, you only need to provi…
# sidebar_position: 2
helpdocs_topic_id: 1h0723zsvm
helpdocs_category_id: 4o8zim2tfr
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `AZURE_VMSS`. Contact [Harness Support](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@harness.io) to enable the feature.To deploy an Azure virtual machine scale set (VMSS) using Harness, you only need to provide two things: an instance image and a base VMSS template.

Harness creates a new VMSS from the base VMSS template and adds instances using the instance image you provided.

For detailed instructions on deploying a VMSS using Harness, see the following how-tos. They are listed in the order they are commonly performed.

* [Connect to Azure for VMSS Deployments](connect-to-your-azure-vmss.md)
* [Add Your Azure VM Image for Deployment](add-your-azure-vm-image-for-deployment.md)
* [Define Your Azure VMSS Target Infrastructure](define-your-azure-vmss-target-infrastructure.md)
* [Create an Azure VMSS Basic Deployment](create-an-azure-vmss-basic-deployment.md)
* [Create an Azure VMSS Canary Deployment](create-an-azure-vmss-canary-deployment.md)
* [Create an Azure VMSS Blue/Green Deployment](create-an-azure-vmss-blue-green-deployment.md)

Harness uses tagging and naming for versioning. See [Azure VMSS Versioning and Naming](azure-vmss-versioning-and-naming.md).

### Before You Begin

Before learning about Harness VMSS deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### Limitations

Harness uses the Azure SDK among other methods and Authenticated proxy is not supported for Azure SDK. Consequently, you cannot use Azure connections for artifacts, machine images, etc, that require proxy authentication. This is an Azure limitation, not a Harness limitation. This is a known Azure limitation with Java environment properties and their SDK.

### What Does Harness Need Before You Start?

A Harness VMSS deployment requires the following:

* A working Azure VM instance image that Harness will use to create your instances.
* A working VMSS that Harness will use as a template for the new VMSS(s) it creates.
* An Azure VM to host the Harness Delegate that will perform the deployment tasks.
* Azure subscription you will use to connect Harness to your Azure platform. The subscription must have a Reader role at minimum. This role is only used by the Harness Delegate when it uses the Azure APIs to discover target VMs.
* SSH key for Harness to set up on the new VMSS instances. This enables users to log into the new instances.

### What Does Harness Deploy?

Harness takes the instance image and base VMSS you provide and creates a new VMSS and populates it with instances using the image. You can specify the desired, min, and max instances for the new VMSS, resize strategy, and other settings in Harness.

### What Operation Systems are Supported?

Linux and Windows VMSS deployments are supported.

### What Does a Harness VMSS Deployment Involve?

The following list describes the major steps of a Harness VMSS deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Links** |
| 1 | Install a Harness Delegate on a VM in your target Azure subnet. | [Connect to Azure for VMSS Deployments](connect-to-your-azure-vmss.md) |
| 2 | Add the VM instance image Harness will use for creating new instances in the new VMSS. | [Add Your Azure VM Image for Deployment](add-your-azure-vm-image-for-deployment.md) |
| 3 | Select an existing VMSS to use as template when Harness creates a new VMSS. | [Define Your Azure VMSS Target Infrastructure](define-your-azure-vmss-target-infrastructure.md) |
| 4 | Create a Harness Workflow to perform deployment. | Select the [deployment strategy](../../concepts-cd/deployment-types/deployment-concepts-and-strategies.md) you want to perform: <br /><br />&bull;&nbsp; [Create an Azure VMSS Basic Deployment](create-an-azure-vmss-basic-deployment.md) <br /><br />&bull;&nbsp; [Create an Azure VMSS Canary Deployment](create-an-azure-vmss-canary-deployment.md) <br /><br />&bull;&nbsp; [Create an Azure VMSS Blue/Green Deployment](create-an-azure-vmss-blue-green-deployment.md) |

