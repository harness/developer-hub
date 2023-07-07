---
title: Manage Org Units
description: Create and edit Org Units.
sidebar_position: 40
---

Org Units are groupings representing subdivisions of an [Org Unit category](./manage-org-unit-cat.md). By default, each Org Unit category has one root, or **All**, Org Unit. For example, the Teams category automatically has an **All Teams** Org Unit. Under the root Org Unit, you can create any number of Org Units and Org Unit levels.

For example, in the Teams category, you can have an Org Unit for your Engineering teams, and then you can create a child Org Unit for the Front End team under the Engineering teams Org Unit. The resulting hierarchy might look like this:

* Harness project
  * Teams (Org Unit category)
    * All Teams (Root Org Unit)
      * Engineering teams (Parent Org Unit)
        * Front End team (Child Org Unit)
        * Other Engineering teams...
      * Other teams...

Inheritance flows down the Org Unit levels. For example, Org Unit categories and Org Units inherit connectors from the associated [Harness project](/docs/category/organizations-and-projects), and child Org Units inherit [Insights associations](#manage-insights-associations) from their ancestor Org Units. For more information about the relationship between projects, Org Unit categories, and Org Units, go to [Pivot Point hierarchies](./pivot-points-overview.md).

## View Org Units

In your Harness project, go to the SEI module, select **Account**, and then select **Pivot Point Setup** under **Data Settings**.

<!-- image: where to find Org Units list -->

Org Unit categories are shown as tabs on the **Pivot Point Setup** page. Select a category tab to view the Org Units under that category. This page shows only Org Unit categories and Org Units relevant to the current project. Switch projects to view Org Unit categories and Org Units for other projects.

<!-- image: Org units list page -->

On the **Flat List** view:

* The **Path** column shows the Org Unit's hierarchical position in the Org Unit category.
* The **# of Insights** column indicates the number of Insights specifically associated with that Org Unit. This number **doesn't** include inherited Insights from parent Org Units.
* Select the **Root Org Unit** name to view or edit the root Org Unit.

<!-- image: Org Units - Flat List view -->

Select **Tree View** to switch to a hierarchical outline view. Use the arrow icons to expand and collapse Org Units levels.

Options for editing Org Units are only available on **Flat List** view.

<!-- image: Org Units - tree view -->

## Add and edit Org Units

1. In your Harness project, go to the SEI module, select **Account**, and then select **Pivot Point Setup** under **Data Settings**.

<!-- image: where to find Org Units list -->

2. Select the Org Unit categories are shown as tabs on the **Pivot Point Setup** page. Select the category where you want to add or edit an Org Unit. This page shows only Org Unit categories and Org Units relevant to the current project. Make sure you are in the correct project before creating or editing Org Units.

<!-- image: Org units list page -->

3. To add an Org Unit, select **+ [OU Category]**. For example, in the **Teams** category, select **+ Teams**. To edit an existing Org Unit, select the Org Unit in the **Name** column.
4. In the **Basic Info** settings, you can: <!-- image: Edit Org Unit - Basic Info settings -->

   * Enter a **Name** and **Description**. Org unit names must be unique within each project.
   * Change the associated **Org Unit Category**.
   * Change the Org Unit's position in the hierarchy by changing the **Parent Node**.

5. Use the **Insights** settings to [manage Insights associations](#manage-insights-associations). By default, child Org Units automatically inherit Insights associations from their ancestor Org Units.
6. Use the **Definitions** settings to define [integrations](/docs/category/connectors-and-integrations) associated with the Org Unit. By default, if you don't specify any integrations, the Org Unit automatically inherits integrations from the associated project.
7. Select **Save**.

<!-- image: Edit Org Unit - definitions settings -->

### Manage Insights associations

All [Insights](../sei-metrics-and-insights/sei-insights.md) must be associated with at least one Org Unit. You can configure these associations through Org Unit settings or when creating or editing Insights. For information about creating and editing Insights, go to [Insights](../sei-metrics-and-insights/sei-insights.md).

:::info Inheritance

By default, a child Org Unit automatically inherits Insights associations from its ancestor Org Units. Inherited associations can't be removed from child Org Units.

Adding an Insight association to an Org Unit also adds that association to any descendant Org Units.

Adding an Insight association to an Org Unit category applies the association to all Org Units under that category.

:::

To view or edit an Org Unit's Insights associations:

1. Follow the steps to [add and edit Org Units](#add-and-edit-org-units), and go to the Org Unit's **Insights** settings.

<!-- image: Edit Org Unit - Insights settings -->

2. Select Insights on the **Available Insights** list and use the left and right arrows to move them to the **Associated Insights** list.
3. Use the up and down arrows on the **Associated Insights** list to change the order in which the Insights are presented when viewing Insights on the Insights list or the **All Insights** dropdown menu on the Insights header.
4. Select **Set as Default** to designate the default Insight for the Org Unit.
5. Select **Save**.
