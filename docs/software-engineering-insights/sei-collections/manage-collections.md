---
title: Manage Collections
description: Create and edit Collections.
sidebar_position: 40
---

Collections are groupings representing subdivisions of a [Collection category](./manage-collection-cat.md). By default, each Collection category has one root, or **All**, Collection. For example, the Teams category automatically has an **All Teams** Collection. Under the root Collection, you can create any number of Collections and Collection levels.

For example, in the Teams category, you can have a Collection for your Engineering teams, and then you can create a child Collection for the Front End team under the Engineering teams Collection. The resulting hierarchy might look like this:

* Harness project
  * Teams (Collection category)
    * All Teams (Root Collection)
      * Engineering teams (Parent Collection)
        * Front End team (Child Collection)
        * Other Engineering teams...
      * Other teams...

Inheritance flows down the Collection levels. For example, Collection categories and Collections inherit SEI connectors from the associated [Harness project](/docs/category/organizations-and-projects), and child Collections inherit [Insights associations](#manage-insights-associations) from their ancestor Collections. For more information about the relationship between projects, Collection categories, and Collections, go to [Collection hierarchies](./collections-overview.md).

## View Collections

In your Harness project, go to the SEI module, select **Account**, and then select **Collection Setup** under **Data Settings**.

<!-- image: where to find Collections list -->

Collection categories are shown as tabs on the **Collection Setup** page. Select a category tab to view the Collections under that category. This page shows only Collection categories and Collections relevant to the current project. Switch projects to view Collection categories and Collections for other projects.

<!-- image: Collections list page -->

The **Flat List** view shows a summary of the Collections in the Collection category. The **Path** is the Collection's hierarchical position in the Collection category. Select a Collection's **Name** to view or edit it.

<!-- image: Collections - Flat List view -->

Select **Tree View** to switch to a hierarchical outline view. Use the arrow icons to expand and collapse Collections levels.

Options for editing Collections are only available on **Flat List** view.

<!-- image: Collections - tree view -->

## Add and edit Collections

1. In your Harness project, go to the SEI module, select **Account**, and then select **Collection Setup** under **Data Settings**.
2. Select the tab for the Collection category where you want to add or edit a Collection. This page shows only Collection categories and Collections relevant to the current project. Make sure you are in the correct project before creating or editing Collections.
3. To edit an existing Collection, select the Collection in the **Name** column. To add a Collection, select **+ [Collection Category]**. For example, in the **Teams** category, select **+ Teams**.
4. In the **Basic Info** settings, you can:

   * Enter a **Name**, **Description**, and **Tags**. Collection names must be unique within each project.
   * Specify users who can manage this Collection.
   * Change the associated **Collection Category**.
   * Change the Collection's position in the hierarchy by changing the **Parent Node**.

5. Use the **Insights** settings to [manage Insights associations](#manage-insights-associations). By default, child Collections automatically inherit Insights associations from their ancestor Collections.
6. Use the **Definition** settings to define [integrations](/docs/category/connectors-and-integrations) associated with the Collection. By default, if you don't specify any integrations, the Collection automatically inherits integrations from the associated project.
7. Select **Save**.

### Manage Insights associations

All [Insights](../sei-insights.md) must be associated with at least one Collection. You can configure these associations through Collection settings or when creating or editing Insights. For information about creating and editing Insights, go to [Insights](../sei-insights.md).

:::info Inheritance

By default, a child Collection automatically inherits Insights associations from its ancestor Collections. Inherited associations can't be removed from child Collections.

Adding an Insight association to a Collection also adds that association to any descendant Collections.

Adding an Insight association to a Collection category applies the association to all Collections under that category.

:::

To view or edit a Collection's Insights associations:

1. Follow the steps to [add and edit Collections](#add-and-edit-collections), and go to the Collection's **Insights** settings.
2. Select Insights on the **Available Insights** list and use the left and right arrows to move them to the **Associated Insights** list.
3. Use the up and down arrows on the **Associated Insights** list to change the order in which the Insights are presented when viewing Insights on the Insights list or the **All Insights** dropdown menu on the Insights header.
4. Select **Set as Default** to designate the default Insight for the Collection.
5. Select **Save**.
