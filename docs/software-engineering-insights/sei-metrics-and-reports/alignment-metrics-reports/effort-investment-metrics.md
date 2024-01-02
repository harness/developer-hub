---
title: Effort investment metrics
description: Supported reports for Effort investment or Business Alignment on SEI
sidebar_position: 25
sidebar_label: Effort investment metrics
---

Effort investment, also known as alignment, helps you analyze how engineering teams invest their efforts and align with business needs and strategic initiatives. With these metrics, you can:

* Pinpoint wasteful unplanned work, maximize engineering ROI, and reduce waste.
* Measure PM-Engineering collaboration, eliminate back and forth, and endeavor to _build it right the first time_.
* Evaluate offshore, outsourced, and vendor decisions, and quantify these contributions to determine the best options.
* Maximize software cost capitalization by automatically determining software development time for accounting reports.
* Identify whether teams are working on uncategorized work; indicating hygiene gaps, deviation from strategic initiatives, or other issues.
* Ensure teams aren't deviating from business goals.

## Effort investment reports and widgets

Add these widgets to your Insights to analyze effort investment metrics.

* **Effort Alignment Report:** Helps you automatically categorize work and time into capitalizable and non-capitalizable items.
* **Effort Investment By Engineer Report:** Helps you track and manage investment of individual engineers' efforts towards business initiatives, strategic areas, task types, and more.
* **Effort Investment Single Stat:** Provides a single measure of effort investment over the given time range.
* **Effort Investment Trend Report:** Understand how work is trending across task categories and strategic initiatives, where resources are allocated, and how allocation varies over time.
* **Issue Progress Report:** Analyze progress on effort investment categories.
* **Program Progress Report:** Analyze progress by program.

:::tip

Use [Business Alignment Insights](/docs/software-engineering-insights/sei-insights#business-alignment) to observe these metrics.

:::

## Effort investment configuration

Effort investment metrics are driven by [Investment profiles](/docs/software-engineering-insights/sei-profiles/investment-profile). When you add an effort investment widget to an Insight, you select an Investment profile to associate with the widget. The data ingested by the widget depends on the categories defined in the Investment profile.

Reports can be filtered by different attributes available through your [integrations](/docs/category/integrations), including custom fields specified in the integration or [Collection](/docs/software-engineering-insights/sei-projects-and-collections/project-and-collection-overview). If you include multiple filters, they are inherently combined with an `AND` operator.

### Categories

Categories define the data that you want to compare within an Investment profile. For example, you could compare issue types (such as bugs, stories, and tasks), projects, components, or other dimensions (such as infrastructure, support, and development).

To add a category, select Add Category, enter a name, and then select Filters.

### Allocation Goals

After adding [categories](#categories), you can set goals for how much time you want developers to work on each category.

Adjust the sliders to define the Ideal range for each category. You can set ranges from zero to 100. After defining your ideal range, SEI automatically calculates the Acceptable range and Poor range based on your ideal.  SEI implements the concept of blast radius on the provided ideal range. The radius is determined by the ideal range.

Reports can be filtered by different attributes available through your [integrations](/docs/category/integrations), including custom fields specified in the integration or [Collection](/docs/software-engineering-insights/sei-projects-and-collections/project-and-collection-overview). If you include multiple filters, they are inherently combined with an `AND` operator.