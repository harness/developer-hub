---
title: Trellis Scores
description: Trellis Scores helps you understand your team's productivity.
sidebar_position: 70
---

Trellis Scores are a proprietary scoring mechanism from SEI that help you understand your team's productivity. Trellis Scores are calculated from factors such as code quality, code volume, speed, impact, proficiency, and collaboration. You can adjust the weight given to each factor, allowing for tailored assessments based on individual profiles.

## Quality

Quality is defined by two metrics: Percentage of rework and percentage of legacy rework.

* **Percentage of Rework:** This measure reflects changes to recently-written code in the past 30 days. A lower percentage of change is associated with a better Trellis Score. Industry standards recommend that an acceptable percentage is between 7.5 and 37.5 percent.
* **Percentage of Legacy Rework:** This measure reflects changes to old code and changes added more than 30 days ago. A lower percentage of change is associated with a better Trellis Score. Industry standards recommend that an acceptable percentage is between between 7.5 and 37.5 percent.

By default, all changes to code written in the last 30 days are considered rework.

:::info What is rework?

Rework is defined as changes to existing code, regardless of the age of the code. This includes alterations, fixes, enhancements, or optimizations. Rework is measured to gauge code stability, the frequency of necessary changes, and the efficiency of development efforts.

:::

## Impact

:::info

The Impact factor depends on the [Investment profile](../sei-profiles/investment-profile.md). The metrics that contribute to the Impact factor require categories from the Investment profile as input parameters.

To configure this, go to [Configure the Impact Factor in a Trellis profile](../sei-profiles/trellis-profile.md#enable-the-impact-factor).

:::

Impact is defined by two metrics: High impact bugs worked on per month and high impact stories worked on per month. *Impact* refers to the ticket's perceived significance or priority.

* **High Impact bugs worked on per month:** This measure represents the number of resolved, high impact bug tickets that the developer was assigned to within the selected time frame. The metric value in the report is normalized to show the average number of resolved, high impact bug tickets per month. If more than one developer worked on the same ticket, developers are credited proportionately. The average number of bugs worked on per month is between 2 and 3.
* **High Impact stories worked on per month:** This measure represents the number of resolved, high impact story tickets that the developer was assigned to within the selected time frame. The metric value in the report is normalized to show the average number of resolved, high impact story tickets per month. If more than one developer worked on the same ticket, developers are credited proportionately. The average number of stories worked on per month is between 3 and 7.5.

## Volume

Volume measures the quantity of code that the developer is working on. The default volume score is calculated using the following six metrics:

* **Number of PRs per month:** This is the number of Pull Requests a developer submitted within the selected time frame. The metric value in the report is normalized to show the average number of pull requests a developer submitted per month. It is recommended that developers submit between 5 and 7.5 PRs each month.
* **Number of Commits per month:** This is the average number of commits a developer has submitted within the selected time frame. The metric value in the report is normalized to show the average number of commits a developer contributes per month. The industry standard for the number of commits per month is between 10 and 15.
* **Lines of Code per month:** The Lines of Code metric calculates the total number of lines of code contributed by an engineer within the selected time frame. The metric value in the trellis report is normalized to show the average number of lines of code contributed per month. The industry standard recommends between 125 and 185 lines of code each month.
* **Number of bugs worked on per month:** This is the number of resolved bug tickets assigned to a developer within the selected time frame. The metric value in the report is normalized to show the average number of resolved bug tickets assigned to a developer per month. If more than one developer worked on the same ticket, developers are credited proportionately. The average number of bugs worked on per month is between 2 and 3.
* **Number of Stories worked on per month:** This is the number of resolved story tickets assigned to a developer within the selected time frame. The metric value in the report is normalized to show the average number of resolved story tickets assigned to a developer per month. If more than one developer worked on the same ticket, developers are credited proportionately. The average number of stories worked on per month is between 5 and 7.
* **Number of Story Points worked on per month:** This is the number of resolved story points assigned to a developer within the selected time frame. The metric value in the report is normalized to show the average number of resolved story points assigned to a developer per month. If more than one developer worked on the same ticket, developers are credited proportionately.

## Speed

Speed measures the pace at which developers are writing and submitting code. Speed is determined by the following three metrics:

* **Average Coding Days per Week:** A coding day is any day where a developer commits code. This metric is calculated by dividing the number of coding days by a specified number of weeks. This metric quantifies how consistently developers actively contribute code to the codebase. Higher values indicate frequent code commits, which can indicate faster development. The recommended goal for coding days per week is 3.2 days.
* **Average PR Cycle Time:** This represents the time elapsed from PR creation to closing. The average PR cycle time should be less than 7 days. This metric is calculated as the elapsed time between PR creation and closure.
* **Average Time Spent Working On Issues:** This is the average time spent on each issue resolved in the last 30 days or any specified time period. This typically doesn't include time spent in the **Done** status. Time is counted only when the developer is assigned to an issue. The average time spent working on issues should be between 3 and 5 days. This metric is calculated by dividing the total time by the total number of issues recorded in the period.

:::warning

It is not recommended to change these metrics from their default values, because they are based on industry standards.

:::

## Proficiency

Proficiency measures how many projects are currently being worked on. It is based on two metrics: Technical breadth and repo breadth.

* **Technical Breadth:** This is the number of unique files that were worked on in the last 30 days. It is recommended that technical breadth average between 2 and 3 unique files per month.
* **Repo Breadth:** This is the number of unique repositories with successful code commits. It is recommended that a developer works on between 2 and 3 unique repos per month.

## Leadership and Collaboration

Leadership and collaboration measures developer teamwork and contribution to peer reviews. This is calculated from the following four metrics:

* **Number of PRs approved per month:** This number represents how many PRs a developer approved within the selected time frame. The metric value in the report is normalized to show the average number of PRs a developer approved per month. The recommended number of approved PRs is between 2 and 7.
* **Number of PRs commented on per month:** This number represents how many PRs a developer commented within the selected time frame. The metric value in the report is normalized to show the average number of PRs a developer commented per month. The typical range for this value is between 2 and 7 PRs per month.
* **Average Response Time for PR approvals:** This is the average time taken to approve another developer's PR. The industry standard for an PR approval time is between 0.75 and 2 days.
* **Average Response Time for PR comments:** This is the average time taken for a developer to add review comments on a PR. The industry standard for a responding to a PR comment is between 0.75 and 1.5 days.

## Modify factors and weights

A [Trellis profile](../sei-profiles/trellis-profile.md) is required to calculate your Trellis Score and to modify the factors and weights that contribute to your score.

In the **Factors and Weights** section of your Trellis profile, you can enable and disable individual [factors] to include or exclude them from your Trellis Score calculation.

You can set benchmarks or thresholds for each factor. Benchmarks define target performance levels that need to be met or exceeded for a positive score.

You can also adjust the weight of each factor. Assign a low weight (1-5) to make less important factors have a lower impact on your score. Assign a higher weight (5-10) to make more important factors have a higher impact on your score.

Weights are relative. For example, if all factors are weighted 5, then all factors are still equal.

## Trellis Score widgets and reports

Add these widgets to your Insights to analyze Trellis Scores.

* **Trellis Score Report:** Trellis Scores by developer.
* **Trellis Scores by Collection:** Trellis Scores organized by [Collection](../sei-projects-and-collections/manage-collections.md).
* **Individual Raw Stats:** A table of base values that contribute to Trellis Scores.
* **Raw Stats by Collection:** Base values organized by [Collection](../sei-projects-and-collections/manage-collections.md).

### Raw stats

The **Individual Raw Stats** and **Raw Stats by Collection** widgets shows tables of base values that contribute to Trellis Scores.

By default, the **Individual Raw Stats** widget shows the following raw, pre-calculation values for each developer:

* PRs
* Commits
* Coding days
* Average PR cycle time (in days)
* Average issue resolution time (in days)
* PRs commented on
* PRs approved
* Percentage of rework

You can edit the widget to show different values (add/remove columns) or apply filtering.

<figure>

![](./static/trellis-score-raw-stats.png)

<figcaption>Individual Raw Stats</figcaption>
</figure>

You can use the **Download** icon to download the raw stats report.

<figure>

![](./static/trellis-score-raw-stats-download.png)

<figcaption>Use the <b>Download</b> icon to download the Individual Raw Stats data.</figcaption>
</figure>

## Trellis Score visibility

You can also limit access to Trellis Scores. The support for Trellis Scores is currently unavailable on Harness SEI BETA.

## Associations & Advanced Options

This allows users to associate profiles with specific Projects and Collections within an organization. This helps in managing and applying profiles effectively.

* Projects: Contributors can select a project to view available Collections and assign Trellis profiles to specific projects. This feature helps in organizing and categorizing teams under different projects, allowing for a more granular management of Trellis profiles.
* Collections: Contributors can select Collections that may apply a Trellis profile. By associating Collection with Trellis profiles, contributors can ensure that the right profiles are applied to the appropriate teams or units within the organization. This facilitates customized score calculations.

#### Exclusions

Exclusions allow users to exclude specific Pull Requests (PRs) and commit from the current Trellis profile, potentially impacting score calculations.

* Excluding Pull Requests: Users can specify PRs to be excluded from the current Trellis profile. Exclusions are helpful when certain PRs or commits should not be considered in score calculations, such as those related to experimental or non-standard work.
* Excluding Commits: Users can list commits to be excluded from the current Trellis profile. Excluded commits are not factored into score calculations.

#### Development Stages Mapping

Development Stages Mapping allows users to map a Trellis profile with development stages from an issue management tool. Mapping development stages is valuable when organizations want to attribute scores to developers based on their contributions at different stages of a project's life cycle.

These features enhance the customization and precision of performance assessments within an organization using Trellis Scores.