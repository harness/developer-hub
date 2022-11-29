---
title: Azure VMSS Versioning and Naming
description: Currently, this feature is behind the Feature Flag AZURE_VMSS. Contact Harness Support to enable the feature.. In this topic, we cover how Harness names, tags, and versions the VMSS and instances you…
# sidebar_position: 2
helpdocs_topic_id: w67zx6mv87
helpdocs_category_id: 4o8zim2tfr
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `AZURE_VMSS`. Contact [Harness Support](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@harness.io) to enable the feature. In this topic, we cover how Harness names, tags, and versions the VMSS and instances you deploy.

In this topic:

* [Before You Begin](#before_you_begin)
* [VMSS and Instance Names](#vmss_and_instance_names)
* [Harness Revision Tags](#harness_revision_tags)

### Before You Begin

* [Create an Azure VMSS Basic Deployment](/article/74htogyjad-create-an-azure-vmss-basic-deployment)
* [Create an Azure VMSS Canary Deployment](/article/ebq6gwgs5r-create-an-azure-vmss-canary-deployment)
* [Create an Azure VMSS Blue/Green Deployment](/article/9op1u6dgks-create-an-azure-vmss-blue-green-deployment)
* [Azure Virtual Machine Scale Set Deployments Overview](/article/1h0723zsvm-azure-virtual-machine-scale-set-deployments)
* [Define Your Azure VMSS Target Infrastructure](/article/2976rmk4kd-define-your-azure-vmss-target-infrastructure)
* [Add Your Azure VM Image for Deployment](/article/c43hmoj6ic-add-your-azure-vm-image-for-deployment)
* [Connect to Your Azure VMSS](/article/d5hob1zuip-connect-to-your-azure-vmss)
* [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation)
* [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts)

### VMSS and Instance Names

The VMSS and its new instances created by Harness are named using the VMSS name you entered in the **Azure Virtual Machine Scale Set Setup** Workflow step, and given an incremental suffix.

For example, if the VMSS is named `doc__basic`, the first instance is named `doc__basic__1`, and the second `doc__basic__2`.

Each subsequent deployment using the same Harness Infrastructure Definition will increment the suffix on the name of the deployed VMSS, regardless of the name of VMSS.

For example, here are three VMSS deployments:

![](https://files.helpdocs.io/kw8ldg1itf/articles/74htogyjad/1602700829023/image.png)The first two `doc__basic` deployments are Basic Workflows and the `doc__canary` VMSS is a Canary Workflow. The `doc__canary` VMSS has the suffix `__3` because it used the same Infrastructure Definition as the `doc__basic` Workflows.

### Harness Revision Tags

Harness adds three Azure tags to each VMSS it deploys. These tags are used for revision tracking.

Do not delete these tags.You can see the tags on the VMSS:

![](https://files.helpdocs.io/kw8ldg1itf/articles/74htogyjad/1602629635220/image.png)The tags are:

* `HARNESS_REVISION` — The unique revision number of the VMSS, with an incremental suffix.
* `Name` — The name of the VMSS, with an incremental suffix.
* `Created` — The timestamp of the VMSS creation.

With each deployment of a VMSS using the same Harness Infrastructure Definition, the suffixes of `HARNESS_REVISION` and `Name` tags are incremented:

![](https://files.helpdocs.io/kw8ldg1itf/articles/74htogyjad/1602629600479/image.png)