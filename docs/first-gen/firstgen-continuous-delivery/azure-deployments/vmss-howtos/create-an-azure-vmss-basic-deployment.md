---
title: Create an Azure VMSS Basic Deployment
description: Currently, this feature is behind the Feature Flag AZURE_VMSS. Contact Harness Support to enable the feature.. A Basic virtual machine scale set (VMSS) deployment sets up a new VMSS using the image y…
# sidebar_position: 2
helpdocs_topic_id: 74htogyjad
helpdocs_category_id: 4o8zim2tfr
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `AZURE_VMSS`. Contact [Harness Support](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@harness.io) to enable the feature. A Basic virtual machine scale set (VMSS) deployment sets up a new VMSS using the image you supplied in [Add Your Azure VM Image for Deployment](/article/c43hmoj6ic-add-your-azure-vm-image-for-deployment) and the base VMSS template you selected in [Define Your Azure VMSS Target Infrastructure](/article/2976rmk4kd-define-your-azure-vmss-target-infrastructure).

You specify the range of instances you want for the new VMSS and then the percentage or count for the actual deployment.

For other deployment strategies, see [Create an Azure VMSS Canary Deployment](/article/ebq6gwgs5r-create-an-azure-vmss-canary-deployment), and [Create an Azure VMSS Blue/Green Deployment](/article/9op1u6dgks-create-an-azure-vmss-blue-green-deployment).In this topic:

* [Before You Begin](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#before_you_begin)
* [Supported Platforms and Technologies](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#undefined)
* [Step 1: Create the Basic Workflow](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#step_1_create_the_basic_workflow)
* [Step 2: Azure Virtual Machine Scale Set Setup](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#step_2_azure_virtual_machine_scale_set_setup)
* [Option: Use Variable Expressions in Settings](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#option_use_variable_expressions_in_settings)
* [Step 3: Upgrade Virtual Machine Scale Set](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#step_3_upgrade_virtual_machine_scale_set)
* [Step 4: Deploy](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#step_4_deploy)
* [Review: Harness Revision Tags](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#review_harness_revision_tags)
* [Option: Templatize the Workflow](https://docs.harness.io/article/74htogyjad-create-an-azure-vmss-basic-deployment#option_templatize_the_workflow)

### Before You Begin

* [Azure Virtual Machine Scale Set Deployments Overview](/article/1h0723zsvm-azure-virtual-machine-scale-set-deployments)
* [Define Your Azure VMSS Target Infrastructure](/article/2976rmk4kd-define-your-azure-vmss-target-infrastructure)
* [Add Your Azure VM Image for Deployment](/article/c43hmoj6ic-add-your-azure-vm-image-for-deployment)
* [Connect to Azure for VMSS Deployments](/article/d5hob1zuip-connect-to-your-azure-vmss)
* [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation)
* [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts)

### Supported Platforms and Technologies

See [Supported Platforms and Technologies](/article/220d0ojx5y-supported-platforms).

### Step 1: Create the Basic Workflow

In your Harness Application, click **Workflows**, and then click **Add Workflow**.

Enter the new Workflow's settings.

#### Name

Enter a name for the Workflow. You will use this name to locate the Workflow in Deployments and to add it to [Pipelines](/article/zc1u96u6uj-pipeline-configuration).

#### Workflow Type

Select **Basic**. See [Deployment Concepts and Strategies](/article/325x7awntc-deployment-concepts-and-strategies).

For other deployment strategies, see [Create an Azure VMSS Canary Deployment](/article/ebq6gwgs5r-create-an-azure-vmss-canary-deployment), and [Create an Azure VMSS Blue/Green Deployment](/article/9op1u6dgks-create-an-azure-vmss-blue-green-deployment).#### Environment

Select the Environment you created in [Define Your Azure VMSS Target Infrastructure](/article/2976rmk4kd-define-your-azure-vmss-target-infrastructure).

#### Service

Select the Service you created in [Add Your Azure VM Image for Deployment](/article/c43hmoj6ic-add-your-azure-vm-image-for-deployment).

#### Infrastructure Definition

Select the Infrastructure Definition you created in [Define Your Azure VMSS Target Infrastructure](/article/2976rmk4kd-define-your-azure-vmss-target-infrastructure).

#### Submit

When you are done, click **Submit**.

The steps for the Basic Workflow VMSS deployment are generated automatically.

Next, we'll take a look at each step's settings and how you can change them.

### Step 2: Azure Virtual Machine Scale Set Setup

The Azure Virtual Machine Scale Set Setup step is where you specify the default settings for the new VMSS.

In particular, you specify the min, max, and desired number of instances for the new VMSS.

These correspond to the **Instance limits** settings in **Auto created scale condition** in VMSS:

![](https://files.helpdocs.io/kw8ldg1itf/articles/74htogyjad/1602620781424/image.png)Later, in the **Upgrade Virtual Machine Scale Set** step, you will upgrade the number of instances by a percentage or count of the desired instances.

#### Name

Enter a name for the Workflow step.

#### Virtual Machine Scale Set Name

Enter a name for the new VMSS. This is the name that will appear in the **Virtual machine scale sets** blade in Azure.

Hyphens in the names are converted to double underscores in Azure. For example, if you enter `doc-basic` the name in Azure will be `doc__basic`.The first time you deploy, the name of the new VMSS is given the suffix `__1`. Each time you deploy a new VMSS using the same Harness Infrastructure Definition, the suffix is incremented, such as `__2`.

You can use the default name, which is a concatenation of the names of your Application, Service, and Environment: `${app.name}_${service.name}_${env.name}`.

For information on naming and versioning, see [Azure VMSS Versioning and Naming](/article/w67zx6mv87-azure-vmss-versioning-and-naming).#### Instances

Select **Fixed** or **Same as already running Default Instances**.

For **Same as already running Default instances**, Harness determines if there is a previous VMSS deployment for the same Infrastructure Definition. If one is present, Harness takes the number of instances from there. If there is no previous deployment, Harness uses the default of 6.

If there is more than one scaling policy attached to the already running, previously deployed VMSS, Harness uses the policy named **Auto created scale condition** or **Profile1**.

**Fixed** allows you to set the min, max, and desired number of instances for the new VMSS.

##### No Autoscaling Policy Attached to Base VMSS

When deploying a new VMSS from a base VMSS with no autoscaling policies (manual scaling), the following occurs:

* The first deployment will create a default of six instances.
* The next deployment instance count will be the same as previous number of running instances.
* This new VMSS will still have no autoscaling policy attached since the base VMSS has none. Only the instance number will change depending on the number of running instances of the previous deployment.

#### Maximum Instances

Specify maximum instance count.

#### Minimum Instances

Specify minimum instance count.

#### Desired Instances

Specify the desired instance count. This is the same as default instance count in VMSS:


> In case there is a problem reading the resource metrics and the current capacity is below the default capacity, then to ensure the availability of the resource, Autoscale will scale out to the default.


> If the current capacity is already higher than the default capacity, Autoscale will not scale in.

#### Resize Strategy

Select whether you want Harness to resize the new VMSS instances first, or after it has downsized the old instances.

#### Auto Scaling Steady State Timeout

Enter how long you want Harness to wait for this step to finish. If the step's execution exceeds this timeout, Harness fails the deployment.

### Option: Use Variable Expressions in Settings

You can use [Harness variable expressions](/article/9dvxcegm90-variables), such as [Workflow variables](/article/766iheu1bk-add-workflow-variables-new-template), in certain step settings.

When you deploy the Workflow, alone, in a Pipeline, or by a [Trigger](/article/xerirloz9a-add-a-trigger-2), you will be prompted to provide values for the variables.

To see if a Workflow variable can be used in a setting, enter `$` or `${workflow.variables` and see the available expressions.

### Step 3: Upgrade Virtual Machine Scale Set

Use the Upgrade Virtual Machine Scale Set step to set the desired instances for the new VMSS.

You can select a percentage or count.

This is the same as the **Scale mode** settings in **Auto created scale condition** in VMSS:

![](https://files.helpdocs.io/kw8ldg1itf/articles/74htogyjad/1602620781424/image.png)#### Name

Enter a name for the Workflow step.

#### Desired Instances

Set the number of instances that the VMSS will attempt to deploy and maintain.

* If you select **Count**, enter the actual number of instances.
* If you select **Percent**, enter a percentage of the available capacity.

Your setting cannot exceed your **Maximum Instances** setting in the Workflow's preceding **Azure Virtual Machine Scale Set Setup** step.

This setting corresponds to the **Maximum** setting in **Instance limits** in VMSS.

You can use [Harness variable expressions](/article/9dvxcegm90-variables), such as [Workflow variables](/article/766iheu1bk-add-workflow-variables-new-template), in this setting.### Step 4: Deploy

1. When you have set up your Workflow, click **Deploy**.
2. In **Artifacts**, select the image you supplied in [Add Your Azure VM Image for Deployment](/article/c43hmoj6ic-add-your-azure-vm-image-for-deployment).
3. Click **Submit**.

#### Azure Virtual Machine Scale Set Setup

In **Azure Virtual Machine Scale Set Setup**, you can see Harness look for a VMSS with the same name.


```
Starting Azure Virtual Machine Scale Set Setup  
Getting all Harness managed Virtual Machine Scale Sets  
Found [0] Harness managed Virtual Machine Scale Sets  
New revision of Virtual Machine Scale Set: [1]  
New Virtual Machine Scale Set will be created with name: [doc__basic__1]  
Using user defined input min: [1], max: [2] and desired: [1] for deployment
```
If it finds a VMSS with the same name, it prepares to create a new VMSS and increment its suffix by 1. Here is the second deployment of doc\_\_basic. You can see a new name `doc__basic__2`.


```
Starting Azure Virtual Machine Scale Set Setup  
Getting all Harness managed Virtual Machine Scale Sets  
Found [1] Harness managed Virtual Machine Scale Sets  
Getting the most recent active Virtual Machine Scale Set with non zero capacity  
Found most recent active Virtual Machine Scale Set: [doc__basic__1]  
New revision of Virtual Machine Scale Set: [2]  
New Virtual Machine Scale Set will be created with name: [doc__basic__2]  
Using user defined input min: [1], max: [2] and desired: [1] for deployment
```
If Harness finds an old VMSS with a non-zero capacity, it will downscale it to 0 as part of the Resize Strategy.

Next, you can see Harness create the new VMSS using the base VMSS template to selected in the Infrastructure Definition and the image you selected in the Service:


```
Start getting gallery image references id [/subscriptions/1234567891011/resourceGroups/devVMSSResourceGroup/providers/Microsoft.Compute/galleries/devVMSSGallery/images/devVMLinuxDefinition/versions/1.0.0]  
Using gallery image id [/subscriptions/1234567891011/resourceGroups/devVMSSResourceGroup/providers/Microsoft.Compute/galleries/devVMSSGallery/images/devVMLinuxDefinition/versions/1.0.0], publisher [Harness], offer [Harness-Offer],sku [Harness-SKU], osState [Generalized]  
Getting base Virtual Machine Scale Set [devScaleSet]  
Creating new Virtual Machine Scale Set: [doc__basic__1]  
New Virtual Machine Scale Set: [doc__basic__1] created successfully
```
#### Upgrade Virtual Machine Scale Set

In Upgrade Virtual Machine Scale Set, you can see the new VMSS upscaled to its desired instances:


```
Starting Azure VMSS Deploy  
Clearing scaling policy for scale set: [doc__basic__1]  
Set VMSS: [doc__basic__1] desired capacity to [1]  
  
Successfully set desired capacity  
  
Checking the status of VMSS: [doc__basic__1] VM instances  
  
Virtual machine instance: [doc__basic__1_1] provisioning state: [Creating]  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Updating]  
  
Received success response from Azure for VMSS: [doc__basic__1] update capacity  
  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Updating]  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Updating]  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Provisioning succeeded]  
  
All the VM instances of VMSS: [doc__basic__1] are provisioned successfully  
Attaching scaling policy to VMSS: [doc__basic__1] as number of Virtual Machine instances has reached to desired capacity  
  
Total number of new instances deployed for Scale Set: [doc__basic__1] is [1]   
Total number of instances of old Scale Set: [] is [0]  
  
No deployment error. Execution success  
No scale set found with the name = [], hence skipping  
No scale set found with the name = [], hence skipping
```
Lastly, Harness downscales the previous version. In the following example, we have deployed `doc__basic__2` and so `doc__basic__1` is downscaled:


```
Clearing scaling policy for scale set: [doc__basic__1]  
Set VMSS: [doc__basic__1] desired capacity to [0]  
Successfully set desired capacity  
  
Checking the status of VMSS: [doc__basic__1] VM instances  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Provisioning succeeded]  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Deleting]  
Virtual machine instance: [doc__basic__1_0] provisioning state: [Deleting]  
All the VM instances of VMSS: [doc__basic__1] are deleted successfully  
Not attaching scaling policy to VMSS: [doc__basic__1] while down sizing it
```
Congratulations. Your deployment was successful.

For information on naming and versioning, see [Azure VMSS Versioning and Naming](/article/w67zx6mv87-azure-vmss-versioning-and-naming).### Option: Templatize the Workflow

You can parameterize the Workflow's settings to turn it into a template. When it is deployed, values are provided for the parameters.

See [Templatize a Workflow](/article/bov41f5b7o-templatize-a-workflow-new-template).

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

