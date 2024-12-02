---
title: Azure DevOps Use Cases
description: Recommended Widgets and Metrics for Azure DevOps Integration
sidebar_label: Azure DevOps Use Cases
sidebar_position: 56
---

This topic includes use cases for some of the most popular widgets used to measure developer metrics with the Azure DevOps integration.

## Key widgets

### Measure Trellis Scores

[Trellis Scores](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview) are a proprietary productivity metric developed by SEI to provide a holistic view of team and individual performance in software development. These scores are derived from a combination of key performance factors, including [Code Quality](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#quality), [Code Volume](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#volume), [Speed](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#speed), [Impact](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#impact), [Proficiency](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#proficiency), and [Collaboration](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#leadership-and-collaboration).

Using Azure Repos data, the Trellis widgets help measure essential metrics across these factors, such as Rework, Coding Days, Lines of Code, Cycle Time, and more. Follow the resources below to set up a Trellis profile and use the Trellis widgets for viewing insights into your engineering team’s performance.

* [Create Trellis profile](/docs/software-engineering-insights/sei-profiles/trellis-profile)
* [Trellis Score widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#trellis-score-report)
* [Trellis Scores by Collection widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#trellis-score-by-collection)
* [Individual Raw Stats widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#individual-raw-stats)
* [Individual Raw Stats by Collection widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#raw-stats-by-collection)

### Measure DORA

For teams working on DevOps, DORA metrics like Lead Time for Changes and Mean Time to Restore (MTTR) are important. If your team uses Azure Repos as the SCM or Azure Boards as the issue management the widgets below can help identify delays in delivery or recovery from issues.

* [Lead Time for Changes](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/#lead-time-for-changes)
* [Mean Time to Restore](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/#mean-time-to-restore-mttr)

### Business alignment

A measure of how effectively engineering efforts contribute to strategic business outcomes, such as customer satisfaction, adoption, and operational efficiency. Use the Azure Boards integration to set up a Business Alignment profile within SEI, and use the Business Alignment widget to track key alignment metrics.

* [Create Business Alignment profile](/docs/software-engineering-insights/sei-profiles/business-alignment-profile)
* [Configure the Business Alignment widget](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sei-business-alignment-reports)

### Sprint activity tracking

Use these widgets to measure crucial sprint metrics, like Velocity and Predictability, providing insight into how consistently teams deliver within a sprint.

* [Single Stats](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports#sprint-metrics-single-stat)
* [Trend Report](/docs/software-engineering-insights/sei-metrics-and-reports/planning/sprint-metrics/sei-sprints-metrics-reports#sprint-metrics-percentage-trend-report)

### Track hygiene

Hygiene refers to how well the team manages and tracks ongoing work, which supports effective planning. Good hygiene practices reflect a team’s discipline in tracking issues, addressing backlogs, and planning future work. Use these widgets to pinpoint areas that need attention, identify process bottlenecks, and ensure work management practices align with the team’s goals.

* [Hygiene report](/docs/software-engineering-insights/sei-metrics-and-reports/hygiene-metrics)
* [Issues report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/issues-reports)
* [Issues Backlog Trend report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/issues-reports)
* [Issue Resolution Time report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/issues-reports)

### Developer contributions

Monitor individual contributions to understand how often developers are committing code and contributing to the codebase. These metrics can highlight engagement, focus areas, and workload distribution among team members. The following widgets are commonly used:

* [SCM Coding Days Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-coding-days-report)
* [SCM Coding Days Single Stat](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-coding-days-report)

### Pull request activity

Use SCM PR widgets to analyze the flow of PRs through your repositories, assess PR lead time, and understand team collaboration during reviews. These widgets help identify bottlenecks, improve efficiency, and ensure code quality through better collaboration.

* [SCM PRs Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-prs-report)
* [SCM PR Lead Time by Stage Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-pr-lead-time-by-stage-report)
* [SCM Review Collaboration Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-review-collaboration-report)

### Code rework and quality

Understanding rework is essential to improving code quality and maintaining high standards in development. The [SCM Rework widget](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/scm-reports#scm-rework-report) tracks rework volumes over time, helping teams identify which areas of code are more prone to revisions and need improvement.

:::info

The Azure DevOps integration in SEI supports numerous other widgets. For more recommendations or to explore additional reports, contact [Harness Support](/docs/software-engineering-insights/sei-support) for guidance.

:::