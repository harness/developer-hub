---
title: Create a Workspace Template 
description: Learn how to create and manage workspace templates for standardized configurations.
sidebar_position: 20
sidebar_label: Workspace templates
---
import Tabs from '@theme/Tabs';  
import TabItem from '@theme/TabItem';  
 
With workspace templates, you can standardize workspace configurations across your projects by predefining essential variables, configuration settings, and other workspace options. This helps streamline workspace setup, ensuring consistency and reducing manual configuration efforts.  

### Prerequisites
Before you begin configuring workspace templates, ensure that you have:
- Admin or template creation permissions.
- Access to an account or project where the templates will be applied.

:::tip  
Workspace templates allow you to predefine variables and settings that can be reused across multiple workspaces, reducing the need for repetitive setup and ensuring consistent configurations.  
:::

## Configure Workspace Templates
To configure workspace templates and standardize your workspace setups, follow this interactive guide:

<Tabs>  
<TabItem value="Interactive guide">  
<iframe  
    src="<TangoURL>"  
    title="How to Create a Workspace Template"  
    style={{ minHeight: '640px' }}  
    width="100%"  
    height="100%"  
    referrerpolicy="strict-origin-when-cross-origin"  
    frameborder="0"  
    webkitallowfullscreen="true"  
    mozallowfullscreen="true"  
    allowfullscreen="true"  
></iframe>  
</TabItem>  
<TabItem value="Step-by-step">

1. In your **Account Settings**, select **Templates** from the Accout-level resources section.  
2. Click the **New Template** dropdown and select **Infra Workspace**.
3. Name your template and provide a suitable version label.  
4. Select **Start**.

This will bring you to your templates **General** tab that contains a typical workspace setup form as describes in the [IaCM onboarding guide](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide#create-a-workspace).

Once you complete your workspace setup:

5. Select the **Variables** tab and add workspace variables (optional).
6. Select **Save**. 
7. Select **YAML** from the Visual/Yaml toggle option to preview or edit the generated configuration.
---
</TabItem>  
</Tabs>

### Review and edit your Workspace Template
1. Select **Templates** to navigate to the workspace template overview page.
- Either from the breadcrumb menu or via **Account settings**, then **Templates**.
2. Select your workspace template to review.
3. To edit, select **Open in Template Studio**.

### Apply your Workspace Template
1. In one of your projects, create a new workspace.  
2. When prompted, choose one of the following options:  
   - **Start from Scratch** to create a workspace without a template.  
   - **Start with Template** to apply a pre-configured template.  
3. Select **Start with Template** and assign a name to the new workspace.  
4. Review the applied configuration and variables.

### Run your Workspace with the Template
1. In your workspace, run the default pipelines (Plan, Provision, Check for Drift) using the provided buttons.  
2. Review the workspace configurations, including budget and provisioner settings, under the **Configurations** tab.
---
Workspace templates simplify workspace setup and ensure consistent configurations across projects, reducing manual effort and the risk of misconfiguration. By following the steps outlined above, you can create, edit, and apply templates to streamline your workspace management.  
