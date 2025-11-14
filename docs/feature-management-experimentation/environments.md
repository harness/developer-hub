---
title: Environments
sidebar_position: 20
redirect_from: 
  - /docs/feature-management-experimentation/team-and-project-settings/
  - /docs/feature-management-experimentation/management-and-administration/fme-settings/
---

## Overview

Environments allow you to manage your feature flag throughout your development lifecycle, from local development to staging and production.

When you first create your account, your default project is provided with two environments which are named `Staging` and `Production` by default. Each environment is automatically set up with its own API keys. These API keys are used to connect the FME SDK to a specific environment.

Each feature flag that you create has its own set of targeting rules in each environment making it easy to define different targeting rules in your staging and production environments. This allows you to quickly change the targeting rules for a specific feature flag for quality testing on your staging environment with confidence that the feature flag is not enabled for users on your production environments.

## Manage environments

You can manage your environments for each project from your Admin settings. You can also add new environments or edit existing ones. Every project in Split has its own environments. Environments typically represent the SDLC, with one for each stage: Dev, Test, Staging, Production. There's usually no reason to have more than one Split environment per SDLC environment, other than if multiple projects use the same environments.

That said, there are cases where you might have multiple staging, dev or even production environments in Split. There are some best practice recommendations:

* Every feature flag should go through all your team's environments (dev, test, & production). Skipping directly to production can lead to bugs showing up directly in production that you might otherwise uncover earlier.

* It's common, and often critical, to have environment-level permission controls enabled for production environment(s). New, inexperienced teammates may accidentally edit a feature flag or make a rollout change they did not have the authority to make. For any pre-production environments, permission controls are not as important given the lack of customer impact and the robust auditing capability.

* For any pre-production environments, our guidance is to keep it simple - focus on simple on/off instead of creating complex targeting plans. For most companies, pre-production environments often have dummy data and just a few hundred customers, and is most often used for testing.

* You don't necessarily need to see metrics in pre-production environments - unless, for example, you're doing a performance test.

We're cognizant that many companies have their own unique requirements and Harness is always happy to help define an approach that will work best for you.

## Navigate environments

The Environments section provides you and your team insights into the feature flags configured in each environment. Teams can now easily toggle between any environment via the environments dropdown.

Navigate to the environments icon to quickly see the status of each feature flag in a given environment and a log of feature flag changes to quickly see any modifications made by your team. Summary statistics and sorting provide an easy starting point to find the feature flags you and your team are managing.

![](./static/flags-by-env.png)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Harness FME">

## Environment-level fields

When creating or editing an environment, the following fields are available:

| Field | Description | Options / Notes |
|:---:|:---:|:---:|
| Name | Enter a descriptive environment name. | e.g., `FME-Documentation-Staging` |
| Environment type | Select the type of environment. | - **Production**<br />- **Pre-production** |
| Approvals | Configure approval workflows for feature flags and segments. | **Required approvals for changes**: Toggle on/off to enforce approvals.<br /><br />**Approval type**: Choose one of the following radio buttons.<br /><br />- **Let submitters choose their approver(s)**<br />- **Restrict who can approve (select users or groups)** |

All edit/export permissions are enforced through [RBAC Resource Groups and Roles](/docs/feature-management-experimentation/permissions/rbac). This ensures consistent governance across projects and environments.

To create or update an environment:

1. From the FME navigation menu, click **FME Settings** and click **Projects** under **Project settings**.
1. Click **View** under the **Actions** column for the project you want to create an environment in.
1. Click on the **Actions** dropdown menu on the **Environments** tab and select **Create environment** or **Edit** for an existing environment.

   ![](./static/create-environment.png)

1. In the **Edit** environment panel:
   
   - Enter a name.
   - Select the environment type: **Production** or **Pre-production**.
   - Configure approvals:
      - Toggle **Required approvals for changes** on or off.
      - Select the approval mode: **Let submitters choose approvers** or **Restrict who can approve**.

1. Click **Save** to apply the changes.

</TabItem>
<TabItem value="Legacy Split">

## Create environments

When you first create your account, you are provided with two environments. To manage your environments, go to the **Projects** tab in your **Admin settings** page. Select the project that you want to edit environments for. You can: 

* Rename environments to match your deployment process as well update their permissions by clicking **Edit**.
* Add additional environments by clicking **Create environment**.

![](./static/create-env.png)

</TabItem>
</Tabs>

## Localhost

A developer can set up a feature flag on their development machine without the SDK requiring network connectivity. This is called the localhost environment. This environment does not show up in the user interface because, by definition, that requires network connectivity. To configure your SDK for this mode, refer to your language SDK guide.
