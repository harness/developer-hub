---
title: Business Alignment profile
description: Use the Business Alignment profile to generate Business Alignment report for your engineering team.
sidebar_position: 10
sidebar_label: Business Alignment profile
---

Business Alignment profiles help you understand where engineers are allocating their time through effort investment metrics. It is one of the most critical components of engineering metrics by connecting engineering to business value.\

The Business Alignment profile feature is currently in **BETA** and is behind the entitlement `<NEW_BA_PROFILES>.`
Contact [Harness Support](mailto:support@harness.io) to enable this feature.

<DocVideo src="https://www.youtube.com/embed/f3fLqermTGo?si=qFF0PVof8Q36kkr3" />

## Important concepts

### Investment Categories

**Categories** define the data that you want to compare within an Business Alignment profile. For example, you could compare issue types (such as Bugs, Stories, and Tasks), Projects, Components, or other dimensions (such as Infrastructure, Support, and Development).

In the profile configuration, we have the **Default Category** with no Filters. You can customize this category by adding custom **Filter Sets** and their associated conditions and defining custom allocation goals. You can also customize and configure the scope of fetching tickets that should be considered for the metric calculation.

The `uncategorized` category in the profile configuration covers all the items that do not belong to any other defined category. You can customize the uncategorized category with custom allocation goals and use them in your Alignment metric calculation.

For each category, you can define its own separate set of **Filters** and **Allocation Goals**.

The categories are placed based on the ranking provided.

Find more information on the relationship between ranking categories and effort investment calculation [here](/docs/software-engineering-insights/sei-profiles/investment-profile#allocation-goals).

### Allocation Goals

After adding [categories](https://developer.harness.io/docs/software-engineering-insights/sei-profiles/investment-profile#categories), you can set goals for how much time you want developers to work on each category.

Define the Ideal range for each category. You can set ranges in percentage values. After defining your ideal range, SEI automatically calculates the Acceptable range and Poor range based on your ideal.

## Range calculation example

For simplicity, the ranges in this example are given in whole numbers.

Assume your categories are bugs, stories, and tasks, and you want developers to spend 20 to 30 per cent of their time working on bugs. You would set the ideal range for bugs to 20% (minimum) and 30% (maximum). SEI then calculates the Acceptable range and Poor range on either side of your ideal.

This example could result in the following ranges:&#x20;

* **Zero to 10 per cent:** Poor
* **10 to 20 per cent:** Acceptable
* **20 to 30 per cent:** Ideal
* **30 to 40 per cent:** Acceptable
* **40 to 100 per cent:** Poor

## Configure the Business Alignment profile

To create or edit Business Alignment profiles:

1. Go to your **SEI settings**.
2. Select **Business Alignment** under **Profiles**.
3. To create a profile, select **New Business Alignment Profile**. To edit an existing profile, select the profile's name in the profiles list.

For each category, you can define its own set of **Filters** and **Allocation goals**.

### Configure Filters for Categories

**Filters** are the criteria that determine what kind of work or tasks fall into each category.&#x20;

To set up these Filters:

* Decide on the logical relationship between different Filter Sets i.e. whether they should be combined using `AND` (all conditions must be met) or `OR` (any condition can be met).
* Define the specific conditions for each Filter. This involves selecting attributes from the `PROPERTIES` dropdown, setting a condition (like equals or not equals) from the `CONDITIONS` dropdown, and then specifying the `VALUE` for that condition.
* You can add multiple conditions for the same Filter Set and add at most three Filter Set combinations allowing you to create a detailed and accurate definition for each category.

### Scope of Fetching Tickets

This allows you to define how broadly you gather ticket data based on your Filters. Select one of the following options:

* **All Tickets and immediate children where the conditions matches with the parent ticket:** Fetches all tickets and their immediate children where the condition matches with the parent ticket.
* **All Tickets and all descendants where the conditions matches with the parent ticket**: Fetches all tickets and all their descendants if the condition matches with the parent ticket.
* **Only Leaf Descendants where the conditions matches with the parent ticket:** Targets only the leaf descendants of tickets where the condition matches with the parent ticket.
* **All Tickets and descendants for an Epic:** This option is comprehensive, covering all tickets and their descendants within a specific epic.

### Defining Allocation Goals

Finally, you will set the allocation goals for each category. This involves deciding how much of your team's time and effort should ideally go into each category.

* Set an ideal resource allocation range as a percentage. This is your target for how much effort should go into each category.
* You can also customize what is considered an acceptable range. This gives some flexibility while still aligning with your overall objectives.

Now you can associate this profile in your report to generate the BA report to help you align engineering work with business goals, ensuring that time and effort are spent where they're most valuable.