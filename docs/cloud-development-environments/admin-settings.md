---
title: Gitspace Settings
description: Learn more about how you use the reset gitspaces integration to connect Harness to your privately-owned, on-prem assets. 
sidebar_position: 11
sidebar_label: Gitspace Settings
---

Gitspace Settings provide you some general settings to control the Gitspace behavior. With these settings, you can configure Gitspaces behavior to suit your organization standards and policies. This gives you access and grained control over different Gitspace requirements like controlling Gitspace git providers, code editors, image paths, etc. 

This document will take you through all the Gitspace settings available and how you can use them to customize your organization's Gitspaces behaviour. 

---

## Before you begin
Before you begin and start customizing your Gitspace settings, ensure you have the following prerequisites met: 
1. You must have **account-level access** to configure Gitspace settings since these settings are only available at the account level. 
2. You should either have the **CDE admin** role or **account admin** role permissions to be able to configure these settings. 

---

## Gitspace Settings
As an admin, you can configure the following Gitspace settings: 
- **Git Providers**: Manage and control the git providers available for your account's Gitspaces. 
- **Code Editors**: Manage the code editors available for your account's Gitspaces. 
- **Cloud Regions & Machine Types**: Specify the cloud regions and machine types available for your account's Gitspaces. 
- **Gitspace Images**: Specify the gitspace images available for your account's Gitspaces. 

If you have all the prerequisites met, you can access the **Gitspace Settings** from the **Account Settings**. You'll be able to find it under the **General** tab. These Gitspace settings hold true for **all the Gitspaces created in your account**. Only CDE admins can manage and change these settings, CDE users can view these settings but they don't have edit access over the same. 

![](./static/admin-settings-1.png)

Lets deep dive into the Gitspace settings and understand how you can use them to customize your organization's Gitspaces behaviour. 

### Git Providers
With this setting feature, you can **customize the git providers** available for your account's Gitspaces i.e. all CDE users can create Gitspaces only with these specific Git providers configured here. They won't be able to create any Gitspace with any other git provider. 
Once you've added and customised this setting, hit **Save** to save your setting changes. 

// use cases

![](./static/git-provider-admin-2.png)

### Code Editors
This setting allows you to **manage the code editors** available for your account's Gitspaces. This helps you control the code editor your CDE users can use to write and edit code. 

// use cases

![](./static/code-editor-admin-2.png)

### Cloud Regions & Machine Types
With this setting feature, you can **control the cloud regions and machine types** for your account's Gitspaces. For all the available infrastructure providers, you can specify and select the cloud regions and machine types for that region. You can select either all the available machines in a region, or can just select a few to be available to your CDE users. 

![](./static/cloudregions-provider-admin3.png)

### Gitspace Images






