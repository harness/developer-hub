---
title: Manage Org Unit categories
description: Create and edit Org Unit categories
sidebar_position: 30
---

Org Unit categories are broad classifications that serve as containers for [Org Units](./manage-org-units.md) but are not, themselves, Org Units. For example, **Teams** is an Org Unit category; whereas **Engineering Team** and **Docs Team** are Org Units under the **Teams** category.

Each [Harness project](/docs/category/organizations-and-projects) has three default Org Unit categories: Teams, Projects, and Sprints. You can modify the default categories and create custom categories.

:::info Harness projects and Org Unit projects

The **Projects** Org Unit category is not the same as your Harness projects. This category is meant to represent sub-projects under the umbrella of the Harness Project. For example, if your Harness projects align with apps that you develop, your sub-projects could be epics, components, or Jira projects.

:::

For more information about the relationship between projects, Org Unit categories, and Org Units, go to [Pivot Point hierarchies](./pivot-points-overview.md).

## View, edit, and enable/disable Org Unit categories

1. In your Harness project, go to the SEI module, select **Account**, and then select **Pivot Point Setup** under **Data Settings**. <!-- image: Where to find org unit category settings -->

   Org Unit categories are shown as tabs on the **Pivot Point Setup** page. This page shows only Org Unit categories and Org Units relevant to the current project. Switch projects to view Org Unit categories and Org Units for other projects. <!-- image: Org units list page -->

2. Select the tab for the Org Unit category that you want to edit, and then select the **Settings** icon next to the Org Unit category name.
3. On the **Edit Org Unit Category** dialog, you can:

   * Edit the **Name** and **Description**.
   * Enable or disable the Org Unit category. Disabled categories are not visible on landing pages, Insights, or elsewhere in SEI, except on the Org Unit Settings page for SEI Admin users. <!-- image: Edit Org Unit Category page -->

## Add Org Unit categories

:::tip Get Support

Adding custom Org Unit categories is considered an advanced feature. It is recommended to contact [Harness Support](mailto:support@harness.io) to ensure proper configuration.

:::

1. In your Harness project, go to the SEI module, select **Account**, and then select **Pivot Point Setup** under **Data Settings**. <!-- image: Where to find org unit category settings -->

   Org Unit categories are shown as tabs on the **Pivot Point Setup** page. This page shows only Org Unit categories and Org Units relevant to the current project. Make sure you are in the correct project before creating an Org Unit category. <!-- image: Org units list page -->

2. Select **Add Custom**.
3. Enter a **Name** and **Description**.
4. Select **Enable Org Unit Category** to make the category available for Insights and elsewhere in SEI.
5. Enter the **Root OU Name**.

   This is the name of the default, root Org Unit in this Org Unit category. It usually follows the format of `All + Org Unit category name`. For example, the root Org Unit for the Teams category is `All Teams`.

6. Select **Save**.

<!-- image: Add org unit category dialog -->

The new Org Unit category is added as a tab on the **Pivot Point Setup** page. From here, [add Org Units](./manage-org-units.md) to your new Org Unit category.

<!-- image: Org units list with new category tab -->
