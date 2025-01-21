---
title: Velocity dashboard
description: Measure AI productivity insights
sidebar_position: 12
sidebar_label: Velocity

---

The AI Insights velocity dashboard presents a side-by-side comparison of velocity between teams using AI and those not using AI, along with contributing metrics. It provides a detailed view of your development team’s speed and efficiency, helping you track progress across key metrics such as PR Lead Time, commit frequency, and code volume.

### Key metrics and their importance

* **PR Lead Time:** Measures the time taken from opening a pull request to merging it. A shorter PR lead time indicates faster code review and integration, leading to quicker feature delivery and fewer bottlenecks.
* **Commit Frequency:** Tracks how often developers commit code. Higher commit frequency suggests an active development cycle, enabling incremental progress and quicker identification of issues.
* **Code Volume:** Evaluates the amount of code added, modified, or removed. Monitoring code volume helps understand workload distribution and identify trends in development activity.

## Velocity boost

The Velocity Boost represents the percentage change in the overall velocity score when comparing teams using AI coding assistants versus those who aren't. This metric helps quantify the productivity improvement AI tools bring to your development process.

Velocity Boost is calculated by comparing the average velocity scores between two cohorts:

* **Cohort A:** Developers not using AI tools.
* **Cohort B:** Developers using AI tools.

The Velocity Score is derived from the weighted average of the following five metrics:

* PR Lead Time
* Average Commits
* Average PRs Created
* Average PRs Merged
* Average New Lines

The five metrics listed above play a key role in determining a team’s overall velocity score. Each metric reflects a different aspect of productivity, and their combined insights help measure the overall impact of AI tools on the development process.

## PR Lead Time

This metric measures the average time for a Pull Request from creation to merge.
Shorter lead times indicate more efficient workflows, enabling teams to deliver code faster and minimize bottlenecks. For example, teams using AI tools is expected to experience significantly reduced lead times, reflecting the enhanced productivity and support provided by AI-powered coding assistants.

The widget displays the current averages for both the cohorts i.e. teams using AI tools compared to those not using them. 
It also includes trend lines that show daily changes in lead time over the specified time period, in terms of number of days taken to complete a PR.

### Scoring & calculation

For each cohort (e.g., teams using AI tools versus those not using AI tools), PR Lead Time is calculated by averaging the time taken for all PRs merged within a specific time period. 

The formula for calculating the **Average PR Lead Time** in this case follows these steps:

If calculating the **average PR lead time per week**, the formula is:

$$
\text{Average PR Lead Time per Week} = \frac{\sum (\text{PR Lead Time per Week})}{\text{Number of Weeks in Scope}}
$$

Where:  
* **PR Lead Time per Week** = The average lead time for all PRs merged within a specific week.  
* **Number of Weeks in Scope** = The count of complete weeks within the selected period.

**Example Calculation (Weekly):**  
Given the following weekly data:

| Week  | PRs Merged | PR Lead Time (Avg per Week) |
|-------|------------|----------------------------|
| Week 4 (Jan 22-28) | 3          | 4 days                         |
| Week 5 (Jan 29-5)  | 4          | 5 days                         |
| Week 6 (Feb 6-12)  | 5          | 6 days                         |

The average PR lead time is calculated as:

$$
\text{Average PR Lead Time} = \frac{15\, \text{days}}{3\, \text{weeks}} = 5\, \text{days per week}
$$

## Average Number of Commits per Developer

The Average Number of Commits per Developer metric measures the average number of code commits made by each developer during a specific period. This metric provides insight into team engagement and development activity over time.

The Velocity Dashboard presents this metric using trend lines that compare the commit activity of teams using AI coding assistants versus those who are not. The Y-axis displays the volume of commits, allowing you to track patterns and fluctuations in activity across the monitored period.

### Scoring & Calculation

This metric is derived using the following formula:

$$
\text{Average Commits (Weekly)} = \frac{\text{Total Number of Commits in the Week}}{\text{Number of Developers in the Cohort}}
$$

Where:

* **Total Number of Commits in the Week**: The sum of all commits made by the cohort during the week.
* **Number of Developers in the Cohort**: The total number of active developers in the cohort during the same week.

## Average Commits per Week per Developer (Overall)

This metric provides a broader view of commit activity across multiple weeks:

### Scoring & calculation

The calculation is:

$$
\text{Average Commits (Overall)} = \frac{\sum \left( \text{Average Commits for Each Week} \right)}{\text{Number of Weeks}}
$$

Where:

* **Sum of Average Commits for Each Week**: The total of weekly averages calculated for each week.
* **Number of Weeks**: The total number of weeks in the selected period.

### How to interpret

A higher commit frequency often indicates a more active and engaged development team. Stable or increasing trends suggest consistent productivity and effective workflows. Teams using AI tools may show variations in commit patterns, as AI-assisted coding can lead to more consolidated or optimized commits.

However, the focus should not solely be on the number of commits. Consistency and the context of the commits, such as their impact on the codebase and alignment with sprint goals, are equally important.
