---
title: Harness UI Overview
description: Explore the Harness UI and navigate to the desired modules.
sidebar_position: 40

---

```mdx-code-block
import new_left_nav from './static/new-nav-left.png'
import select_modules from './static/select-modules-leftnav.png'
import module_info from './static/module-info1.png'
import customize_left_nav from './static/configure-leftnav.png'
import reorder_modules from './static/drag-drop-modules1.png'

```

Harness is a comprehensive CI/CD platform that streamlines software delivery for modern enterprises. It provides a powerful and user-friendly interface for managing software releases, deployments, and rollbacks.

You can interact with the Harness platform through the Harness UI. It is designed to be intuitive and easy to use, while also providing robust features and capabilities for managing software releases.

The Harness UI is organized into several key areas. This topic explains how you can: 
- View your account and profile information.
- View subscription details.
- Navigate and select modules.

```mdx-code-block
<img src={new_left_nav} alt="new-left-nav" height="50" width="200" />
```




## Projects

A Harness project is a group of Harness modules, their pipelines, and resources. For example, a project might have a Harness CI pipeline to build code and push an image and a Harness CD pipeline to deploy that image to a cloud platform.

For more information, see [Create Organizations and Projects](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization).

## Deployments

The **Deployments** module in Harness is designed to provide visibility and control over the deployment process, making it easier to manage and troubleshoot deployments across multiple projects and environments. You can create your CD pipelines in this module and view the status of all deployments across all projects, filter and sort the deployments based on various criteria, and drill down into the details of individual deployments.

For more information, see [Continuous Delivery & GitOps](https://developer.harness.io/docs/continuous-delivery).

## Builds

The **Builds** module in Harness is a component of the platform that provides a centralized view of all the builds that have been executed or are currently in progress. It allows you to manage and monitor your build activity across all your projects and environments.

For more information, see [Continuous Integration](https://developer.harness.io/docs/continuous-integration).


## Feature Flags

Feature flags are a key component of Harness that allows you to control the availability and behavior of specific features in your application. With feature flags, you can release new features to specific groups of users, test features before making them available to all users, and gradually roll out features to ensure a smooth transition.

For more information, see [Feature Flags](https://developer.harness.io/docs/feature-flags)

## Select modules and customize left navigation

Harness also has the following modules: 

- Chaos Engineering
- Security Tests
- Cloud Cost Management
- Service Reliability Management

To navigate to your desired module, perform the following steps: 
1. In the left navigation, click **Select Modules**.
   
   ```mdx-code-block
   <img src={select_modules} alt="Select module option in left nav" height="50" width="200"/>

   ```

   The modules appear in various functional categories: 
   - Build & Test
     - Continuous Integration
     - Chaos Engineering
     - Security Tests
     
   - Deploy Changes
     - Continuous Delivery & GitOps
     - Feature Flags
   - Manage Impact
     - Cloud Cost Management
     - Service Reliability Management
  
    You can find more information about each module by selecting the info icon beside it.

    ```mdx-code-block
    <img src={module_info} alt="Option to view module info" height="70" width="300"/>
    ```

2. To configure your left navigation, select **Customize your navigation**.

    ```mdx-code-block
    <img src={customize_left_nav} alt="Option to customize left nav" height="70" width="300"/>
    ```

3. To reorder the modules, drag each module to its desired position. 
   
     ```mdx-code-block
    <img src={reorder_modules} alt="Reorder modules" height="70" width="300"/>
    ```

4. Select the modules you want to see in the left navigation. Harness automatically saves your selection, and you can see the selected modules in your left navigation.
   
## Account Settings

### Overview 

Account Overview shows your Harness account details.

To view your Harness account details, go to **Account Settings** and click **Overview**.

Your account overview details are shown.

### Authentication

This section provides options for you to set up authentication for users, enforce password policies, and restrict email domain.

For more information, refer to [Authentication Overview](../platform/3_Authentication/1-authentication-overview.md).

### Account Resources

Account resources are shared and available for use within any organization or project within your account.​

For better isolation of resources, it is recommended that you create resources at the organization or project scope.​

### Policies

You can define and store policies centrally and then apply them to entities and events across the Harness Platform.

For more information, see [Harness Policy as Code](https://developer.harness.io/docs/category/policy-as-code)

### Access Control

Harness Role-Based Access Control (RBAC) helps you manage who has access to your Harness resources, what they can do with those resources, and in what scope they have access.​

For more information, see [Role-based Access Control](https://developer.harness.io/docs/category/role-based-access-control)

### Subscriptions

Harness provides the following plans:

- Free
- Team
- Enterprise

You can activate a yearly or monthly subscription with Harness after choosing your modules and plan.

Your subscription and plan details are displayed in Subscriptions.

### Audit Trail

With Audit Trail in Harness, you can view and track changes to the Harness resources in your Harness account.​

For more information, go to [Audit Trail](https://developer.harness.io/docs/category/audit-trail).

### Organizations

Harness Organizations (Orgs) allow you to group projects that share the same goal.​

For more information, refer to [Projects and Organizations](https://developer.harness.io/docs/platform/organizations-and-projects/projects-and-organizations).

## My Profile

To view your profile information, go to MY PROFILE.

The following profile information is displayed:

- Basic information
- Projects
- API keys

You can also do the following from the profile page:
- Enable/disable two-factor authentication​
- Change password
- Switch account​
- Add a new API key and token.


