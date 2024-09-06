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

### Configure your Workspace Template

1. In your **Account Settings**, select **Templates** from the navigation panel.  
2. Click **New Template** to begin creating a workspace template.  
3. Name your template and fill in all the required fields.  
4. Add the necessary variables:  
   - **Environment Variables** for environment-specific settings.  
   - **Terraform Variables** to define project-specific Terraform configurations.  
5. Navigate to the **YAML** section to preview or edit the generated configuration.

### Review your Workspace Template

1. After creating the template, navigate to the **Overview** section to see a summary of the template.  
2. If adjustments are needed, click **Edit** to modify the template.

### Apply your Workspace Template

1. In one of your projects, create a new workspace.  
2. When prompted, choose one of the following options:  
   - **Start from Scratch** to create a workspace without a template.  
   - **Start with Template** to apply a pre-configured template.  
3. Select **Start with Template** and assign a name to the new workspace.  
4. Review the applied variables such as:  
   - **bar_one** for the environment variable.  
   - **bar_two** for the Terraform variable.

### Run your Workspace with the Template

1. In your workspace, run the default pipelines (Plan, Provision, Check for Drift) using the provided buttons.  
2. Review the workspace configurations, including budget and provisioner settings, under the **Configurations** tab.

</TabItem>  
</Tabs>
---
Workspace templates simplify workspace setup and ensure consistent configurations across projects, reducing manual effort and the risk of misconfiguration. By following the steps outlined above, you can create, edit, and apply templates to streamline your workspace management.  
