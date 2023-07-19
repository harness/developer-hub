---
title: Collection hierarchies
description: Learn how projects and Collections create hierarchies in SEI.
sidebar_position: 10
---

Collection hierarchies in SEI keep data organized. At the top of the hierarchy is a [Harness project](/docs/category/organizations-and-projects). Under each project are Collection categories and one or more levels of Collections.

* **Harness project:** The umbrella for the SEI Collection hierarchy. Collection categories and Collections exist under their associated project; they don't span across projects. While multiple projects can have Collection categories and Collections with the same name, these are distinct groups under their designated project.
* **Collection categories:** Broad classifications that serve as containers for Collections but are not, themselves, Collections. For example, **Teams** is a Collection category; whereas **Engineering Team** and **Docs Teams** are Collections under the **Teams** category.
* **Collections:** Groupings, or narrow classifications, that are subdivisions of Collection categories. Each Collection category also has one root group that is the **All** Collection. For example, the root Collection for the **Teams** category is **All Teams**.

<figure>

![](./static/collections-hierarchies-diagram.png)

<figcaption>Figure 1: A diagram of the relationship between projects, Collection categories, and Collections. SEI connectors (integrations) feed data from your SDLC tools into the project and the corresponding Collection categories and Collections. Data is ultimately displayed on Insights, which are associated with particular Collections.</figcaption>
</figure>

Projects, Collection categories, and Collections provide a broad way of organizing, filtering, and scoping data so you can examine data for different teams, lines of business, development initiatives, sprints, or other scopes. From there, you can configure [metrics and reports](/docs/category/metrics-and-reports) to further refine and examine different facets of your teams' data.

## Projects

[Projects](/docs/category/organizations-and-projects), in addition to the roles they serve elsewhere in the Harness Platform, provide an umbrella for you to organize the Collection hierarchy and access Insights associated with specific Collections.

Collection categories and Collections exist under their associated project; they don't span across projects. While multiple projects can have Collection categories and Collections with the same name, these are distinct groups under their designated project.

[Insights](../sei-insights.md) are associated with a specific project and one or more specific Collection categories and Collections under that project. It is not possible to create Insights that aggregate data from multiple projects.

On your [Insights](../sei-insights.md), widgets derive data from [integrations](/docs/category/connectors-and-integrations) that are inherited from the Collection associated with the Insights. Collections inherit integrations from the [SEI connectors](/docs/category/connectors-and-integrations) defined in the associated project.

While you can create projects from within the SEI module, projects are part of the Harness Platform and can be associated with multiple modules. For information about configuring Harness projects, go to the Harness Platform documentation on [Organizations and Projects](/docs/category/organizations-and-projects).

## Collection categories

Collection categories are broad classifications that serve as containers for Collections but are not, themselves, Collections. For example, **Teams** is an Collection category; whereas **Engineering Team** and **Docs Team** are Collections under the **Teams** category.

Each project has three default Collection categories: Teams, Projects, and Sprints. You can modify the default categories and create custom categories.

:::info Harness projects and Collection projects

The **Projects** Collection category is not the same as your Harness projects. This category is meant to represent sub-projects under the umbrella of the Harness Project. For example, if your Harness projects align with apps that you develop, then your sub-projects could be epics, components, or Jira projects.

:::

For information about configuring Collection categories, go to [Manage Collection categories](./manage-collection-cat.md).

## Collections

Under each Collection category are one or more levels of Collections. Collections are groupings, or focused classifications, that are subdivisions of Collection categories. Inheritance flows down the Collection levels. For example, all Collection categories and Collections automatically inherit SEI connectors from the associated Harness project.

By default, each Collection category has one root, or **All**, Collection node. For example, the Teams category automatically has an **All Teams** Collection. Under the root node, you can create any number of Collections and Collection levels.

For example, in the Teams category, assume that you have a Collection for your Engineering teams, and you then create a child Collection for the Front End team under the Engineering teams Collection. The Front End team Collection inherits all Insights associated with the parent Collection (the Engineering teams Collection). The resulting hierarchy might look like this:

* Project
  * Teams (Collection category)
    * All Teams (Root Collection)
      * Engineering teams (Parent Collection)
        * Front End team (Child Collection)
        * Other Engineering teams...
      * Other teams...

For information about configuring Collections, go to [Manage Collections](./manage-collections.md).

## Contributors

Contributors are developers and other team members that complete actions and activities that contribute to your SEI metrics and insights. Contributors are represented by contributor records in SEI. SEI contributor records associate related user accounts across your SDLC tools and can be used to populate contributor-based Collections.

For information about managing contributors, go to [Manage contributors](./manage-contributors.md).
