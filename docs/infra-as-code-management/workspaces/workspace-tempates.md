---
title: Create a Workspace Template 
description: Learn how to create and manage workspace templates for standardized configurations.
sidebar_position: 20
sidebar_label: Workspace templates
---

<CTABanner
  buttonText="Learn More"
  title="Pending release"
  tagline="The IaCM Workspace Templates feature is currently pending release and will be available soon!"
  link="https://developer.harness.io/roadmap/#iacm"
  closable={true}
  target="_self"
/>

import Tabs from '@theme/Tabs';  
import TabItem from '@theme/TabItem';  
 
With workspace templates, you can standardize workspace configurations across your projects by predefining essential variables, configuration settings, and other workspace options. This helps streamline workspace setup, ensuring consistency and reducing manual configuration efforts.  

### Prerequisites
Before you begin configuring workspace templates, ensure that you have:
- Appropriate permissions to create templates. Go to [RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) to find out how to set users role-based access control.
- Access to an account or project where the templates will be applied.

:::tip  
Workspace templates allow you to predefine variables and settings that can be reused across multiple workspaces, reducing the need for repetitive setup and ensuring consistent configurations.  
:::

## Configure Workspace Templates
To configure workspace templates and standardize your workspace setups, follow this interactive guide:

<Tabs>  
<TabItem value="Create workspace templates">  
   <iframe  
      src="https://app.tango.us/app/embed/6686c1ea-fb9b-4a94-ad1e-021c34b8a19f"  
      title="Create a Workspace Template"  
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
<TabItem value="Add variables & edit templates"> 
   <iframe 
      src="https://app.tango.us/app/embed/ceb4cbae-aae8-40d5-8b68-70e72cd4a7cf" 
      title="Add variables to your Harness IaCM workspace template" 
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
<TabItem value="Apply templates"> 
   <iframe 
    src="https://app.tango.us/app/embed/fb4819c2-3985-48da-90f4-1db8ae839fc5" 
    title="Apply Harness IaCM workspace templates to your new workspace." 
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
Follow these steps to:

- Create and review a new workspace template.
- Review and edit an existing workspace template.
- Apply a workspace template to a new workspace.

   ## Create a new workspace template
   1. In your **Account Settings**, select **Templates** from the Account-level resources section.  
   2. Click the **New Template** dropdown and select **Infra Workspace**.
   3. Name your template and provide a suitable version label.  
   4. Select **Start**.

   This will bring you to your templates **General** tab that contains a typical workspace setup form as describes in the [IaCM onboarding guide](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide#create-a-workspace).

   Once you complete your workspace setup:

   5. Select the **Variables** tab and add workspace variables (optional).
   6. Select **Save**. 
   7. Select **YAML** from the Visual/YAML toggle option to preview or edit the generated configuration.

   ## Review and edit your existing Workspace Templates
   1. Select **Templates** to navigate to the workspace template overview page.
   - Either from the breadcrumb menu or via **Account settings**, then **Templates**.
   2. Select your workspace template to review.
   3. To edit, select **Open in Template Studio**.
   4. Update your workspace settings and select **Save**.

   ## Apply your Workspace Template
   1. In one of your projects, create a new workspace.  
   2. When prompted, choose one of the following options:  
      - **Start from Scratch** to create a workspace without a template.  
      - **Start with Template** to apply a pre-configured template.  
   3. Select **Start with Template** and assign a name to the new workspace.  
   4. Review the applied configuration and variables.
</TabItem>  
</Tabs>
---
Workspace templates simplify workspace setup and ensure consistent configurations across projects, reducing manual effort and the risk of misconfiguration. By following the steps outlined above, you can create, edit, and apply templates to streamline your workspace management.