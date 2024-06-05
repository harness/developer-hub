---
title: Harness UI overview
description: Explore the Harness UI and navigate to the desired modules.
sidebar_position: 40
redirect_from:
  - /docs/getting-started/harness-ui-overview
  - /docs/get-started/harness-ui-overview
---

import select_modules from './static/select-modules-leftnav.png'
import customize_left_nav from './static/configure-leftnav.png'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can interact with the Harness platform through the Harness UI. It is designed to be intuitive and easy to use, while also providing robust features and capabilities for managing software releases.

You can explore Harness through various dimensions:

* **Account:** The account scope includes account-level settings and account-wide view of projects, modules, and so on.
* **Organization:** Drill down into a specific organization to access organization-level settings and project/module usage within that organization.
* **Project:** Drill down further into a specific project and access project-level settings and module usage within that project.
* **Module:** Select a module to access the features and functionality of that module.

## Harness navigation version 2.0

Harness navigation 2.0 brings an overhauled navigation experience that caters to different personas, addresses their unique needs, and ultimately reduces task completion time.

Once enabled on your account, you'll notices changes to the left and top navigation, while most of the central page experience remains consistent with navigation 1.0.

This experience also introduces *multi-module mode* and *single module mode* so you can work across multiple modules or focus on a specific module, depending on your needs. As you could in navigation 1.0, you can configure the side panel to show or hide specific modules.

This video provides a walkthrough of the new navigation experience and highlights its benefits.

<!-- Video:
https://www.loom.com/share/776bbe67da47483598a07196aec3915f?sid=fda91036-713d-4201-a8b6-7cc44cd2e07f-->
<DocVideo src="https://www.loom.com/share/776bbe67da47483598a07196aec3915f?sid=fda91036-713d-4201-a8b6-7cc44cd2e07f" />

The left navigation for version 2.0 includes the following options.

<Tabs>
<TabItem value="scope" label="Scope" default>

Your [scope](/docs/platform/role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes) is given at the top of the left navigation. Select the scope (**Account**, **Organization**, or **Project**) to change your scope.

You can change scope levels entirely (or example, drill down from organization or project scope) or select different entities at the same scope (such as a different project or organization).

The remainder of the left nav updates based on the selected scope.

For example, at the account and project scope, the Overview summarizes recent activity in the account or project, but there is no overview at the Organization scope.

</TabItem>
<TabItem value="dashboards" label="Dashboards">

To access Dashboard view, select the grid at the top of the left navigation, and then select **Dashboards**.

Dashboard view streamlines the left navigation to focus on dashboards, minimizing modules and non-dashboard settings.

To exit Dashboard view, select the grid again and then select either **Productivity View** or **Administrative Settings**.

</TabItem>
<TabItem value="pande" label="Pipelines and Executions">

At the project scope, use the **Pipelines** and **Executions** links to explore all pipelines and the execution history for the project.

</TabItem>
<TabItem value="modules" label="Modules">

Each scope reflects a list of modules used in or available to that account, organization, or project.

Modules are labeled by their primary functionality:

* **Deployments:** [Continuous Delivery & GitOps](/docs/continuous-delivery)
* **Builds:** [Continuous Integration](/docs/continuous-integration)
* **Feature Flags:** [Feature Flags](/docs/feature-flags)
* **Code:** [Code Repository](/docs/code-repository)
* **Cloud Costs:** [Cloud Cost Management](/docs/cloud-cost-management)
* **Service Reliability:** [Service Reliability Management](/docs/service-reliability-management)
* **Security Tests:** [Security Testing Orchestration](/docs/security-testing-orchestration)
* **Chaos:** [Chaos Engineering](/docs/chaos-engineering)
* **Error Tracking:** [Continuous Error Tracking](/docs/continuous-error-tracking)

:::tip

To quickly drill down into a module, select the grid at the top of the left navigation, and then select a module.

:::

</TabItem>
<TabItem value="oandp" label="Organizations and Projects">

You can drill down to lower [organization and project](/docs/platform/organizations-and-projects/create-an-organization) scopes from higher scopes.

* At the account scope, you can find lists of **Organizations** and **Projects** under that account.
* At the organization scope, you can find a list of **Projects** under that account.

Visibility depends on your permissions.

</TabItem>
<TabItem value="settings" label="Settings">

Each scope provides access to its respective scope-level settings: **Account Settings**, **Organization Settings**, and **Project Settings**.

While the contents of these pages are the same, navigation 2.0 introduces a cleaned-up interface for simplified browsing and minimal distraction.

Account settings include:

* General: Account Details, [Default Settings](/docs/platform/settings/default-settings), and SMTP configuration
* Account-level shared resources like [delegates](/docs/platform/delegates/delegate-concepts/delegate-overview), [variables](/docs/platform/variables-and-expressions/add-a-variable), [secrets](/docs/platform/secrets/secrets-management/harness-secret-manager-overview), [templates](/docs/platform/templates/template), and more.
* [Access Control](/docs/category/platform-access-control)
* Security and governance, including [Authentication](/docs/platform/authentication/authentication-overview.md), [Policies](/docs/category/policy-as-code), and [Audit Trail](/docs/category/audit-trail).
* [Subscriptions](/docs/platform/get-started/subscriptions-licenses/subscriptions)

Additional options may be present depending on your module usage and access, such as GitOps settings and cloud cost integrations.

Not all settings are available at all scopes.

:::tip

To quickly jump to the account view and manage account settings, select the grid at the top of the left navigation, and then select **Administrative Settings**.

This enables Admin Settings view, which focuses on account administration and minimizes visibility of modules.

:::

</TabItem>
<TabItem value="help" label="Help">

This section provides links to documentation, community, and support resources.

</TabItem>
<TabItem value="profile" label="My Profile">

You profile, indicated by an initial icon at the bottom of the left navigation, includes:

* Your API keys and tokens.
* Quick links for projects you own.
* Your display name.
* The email address associated with your profile.
* Options to change your password or toggle 2FA.
* Option to switch accounts if your email address is linked to multiple Harness accounts.

</TabItem>
</Tabs>

## Harness legacy navigation version 1.0

The left navigation for version 1.0 includes the following options.

<Tabs>
<TabItem value="project" label="Project" default>

Explore [projects](/docs/platform/organizations-and-projects/create-an-organization) in your Harness account. Project visibility depends on your permissions.

</TabItem>
<TabItem value="dashboards1" label="Dashboards">

Explore dashboards relevant to your account and modules.

</TabItem>
<TabItem value="modules1" label="Modules">

Modules are labeled by their icon and primary functionality:

* **Deployments:** [Continuous Delivery & GitOps](/docs/continuous-delivery)
* **Builds:** [Continuous Integration](/docs/continuous-integration)
* **Feature Flags:** [Feature Flags](/docs/feature-flags)
* **Code:** [Code Repository](/docs/code-repository)
* **Cloud Costs:** [Cloud Cost Management](/docs/cloud-cost-management)
* **Service Reliability:** [Service Reliability Management](/docs/service-reliability-management)
* **Security Tests:** [Security Testing Orchestration](/docs/security-testing-orchestration)
* **Chaos:** [Chaos Engineering](/docs/chaos-engineering)
* **Error Tracking:** [Continuous Error Tracking](/docs/continuous-error-tracking)

</TabItem>
<TabItem value="accountsettings" label="Account Settings">

Account settings include:

* Overview
* [Authentication](/docs/platform/authentication/authentication-overview.md)
* Account resources (shared resources such as [delegates](/docs/platform/delegates/delegate-concepts/delegate-overview), [variables](/docs/platform/variables-and-expressions/add-a-variable), [secrets](/docs/platform/secrets/secrets-management/harness-secret-manager-overview), [templates](/docs/platform/templates/template), [default settings](/docs/platform/settings/default-settings), and more)
* [Policies](/docs/category/policy-as-code)
* [Access Control](/docs/category/platform-access-control)
* [Billing, Subscriptions, and Plans](/docs/platform/get-started/subscriptions-licenses/subscriptions)
* [Audit Trail](/docs/category/audit-trail)
* [Organizations](/docs/platform/organizations-and-projects/projects-and-organizations)

Additional options may be present depending on your module usage and access.

</TabItem>
<TabItem value="help1" label="Help">

This section provides links to documentation, community, and support resources.

</TabItem>
<TabItem value="profile1" label="My Profile">

You profile, indicated by an initial icon at the bottom of the left navigation, includes:

* Your API keys and tokens.
* Quick links for projects you own.
* Your display name.
* The email address associated with your profile.
* Options to change your password or toggle 2FA.
* Option to switch accounts if your email address is linked to multiple Harness accounts.

</TabItem>
</Tabs>

## Customize navigation

You can show or hide modules according to your preferences.

<Tabs>
<TabItem value="legacy" label="Navigation 1.0" default>

To customize your navigation in legacy navigation (1.0):

1. Below the list of modules in the left navigation, select the **Select Modules** grid icon.

   <img src={select_modules} alt="Select module option in left nav" width="25%" height="25%"/>

2. Select the wrench icon to customize your navigation.

   <img src={customize_left_nav} alt="Option to customize left nav" width="50%" height="50%"/>

3. To show or hide a module on the left nav, select or deselect the checkbox next to the module name.
4. To rearrange the order of the modules, drag and drop the modules.
5. Harness automatically saves your changes. Select the **X** in the upper right corner to exit navigation configuration.
</TabItem>
<TabItem value="new" label="Navigation 2.0">

To customize navigation in navigation 2.0:

1. At the top of the left navigation, select the grid icon.
2. Select **Configure**.
3. To show or hide a module on the left nav, select or deselect the checkbox next to the module name.
4. To rearrange the order of the modules, drag and drop the modules.
5. Harness automatically saves your changes. Select the **X** in the upper right corner to exit navigation configuration.

</TabItem>
</Tabs>
