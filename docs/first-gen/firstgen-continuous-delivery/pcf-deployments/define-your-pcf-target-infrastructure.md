---
title: Define Your Tanzu Target Infrastructure
description: Create Infrastructure Definitions that describe your target deployment environments in the Environment.
sidebar_position: 100 
helpdocs_topic_id: r1crlrpjk4
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

In the Environment, you create [Infrastructure Definitions](/article/v3l3wqovbe-infrastructure-definitions) that describe your target deployment environments. Tanzu Application Service (TAS, formerly PCF) Infrastructure Definitions specify the following:

* The TAS deployment type.
* The TAS Cloud Provider that you added, as described in [Add Cloud Providers](/article/whwnovprrb-infrastructure-providers#pivotal_cloud_foundry_pcf).
* The TAS organization to use.
* The target TAS space that the app you are deploying is scoped to.
* Any specific Harness Services that you want to scope the Infrastructure Definition to. If you choose not to scope to specific Services, the Infrastructure Definition may be used with any TAS Service.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Add Infrastructure Definition](https://docs.harness.io/article/r1crlrpjk4-define-your-pcf-target-infrastructure#step_1_add_infrastructure_definition)
* [Step 2: Name](#step_2_name)
* [Step 3: Cloud Provider Type](#step_3_cloud_provider_type)
* [Step 4: Deployment Type](#step_4_deployment_type)
* [Step 5: Cloud Provider](#step_5_cloud_provider)
* [Step 6: Organization](#step_6_organization)
* [Step 7: Space](#step_7_space)
* [Step 8: Scope to Specific Services](#step_8_scope_to_specific_services)
* [Option: Use Variables in the Infrastructure Definition](#option_use_variables_in_the_infrastructure_definition)
* [Next Steps](#next_steps)

### Before You Begin

* See [Connect to Your Target Tanzu Account](/article/nh4afrhvkl).
* See [Define Your Tanzu Target Infrastructure](/article/r1crlrpjk4).

### Step 1: Add Infrastructure Definition

To add an Infrastructure Definition, do the following:

1. In your Environment, click **Add Infrastructure Definition**. The **Infrastructure Definition** dialog appears.

The **Infrastructure Definition** dialog has the following fields.

### Step 2: Name

Enter a name for your Infrastructure Definition. You will use this name to select this Infrastructure Definition when you create Harness Workflows.

### Step 3: Cloud Provider Type

Select **Pivotal Cloud Foundry**.

### Step 4: Deployment Type

Select **Pivotal Cloud Foundry**.

### Step 5: Cloud Provider

Select the Cloud Provider to use to connect to the foundation. This will be one of the TAS Cloud Providers you set up in [Add Cloud Providers](/article/whwnovprrb-infrastructure-providers#pivotal_cloud_foundry_pcf).

The roles associated with the TAS user account used in the Cloud Provider determine what orgs will appear in the **Organization** setting.

### Step 6: Organization

The active TAS orgs available to the TAS user account used in the Cloud Provider are listed. Select the TAS org for the development account.

### Step 7: Space

Select the space where the application you are deploying is scoped.

### Step 8: Scope to Specific Services

Select this option to scope this Infrastructure Definition to the Harness TAS Service you want to deploy.

If you do not select this setting, you can select this Infrastructure Definition when you create a Workflow for **any** TAS Service.

### Option: Use Variables in the Infrastructure Definition

You can use Service variables in the TAS Infrastructure Definition **Organization** and **Space** settings:

![](./static/define-your-pcf-target-infrastructure-23.png)This allows you to set the orgs and spaces in a Service, and have the Infrastructure Definition act as a template that multiple Services can use.

The orgs specified must be available to the TAS user account used to set up the TAS Cloud Provider used in the Infrastructure Definition.### Next Steps

* [Override Tanzu Manifests and Config Variables and Files](/article/r0vp331jnq-override-pcf-manifests-and-config-variables-and-files)
* [Create a Basic Tanzu Deployment](/article/c92izkztka-create-a-basic-pcf-deployment)
* [Create a Canary Tanzu Deployment](/article/99bxiqfi1u-create-a-canary-pcf-deployment)
* [Create a Blue/Green Tanzu Deployment](/article/52muxcsr1v-create-a-blue-green-pcf-deployment)

