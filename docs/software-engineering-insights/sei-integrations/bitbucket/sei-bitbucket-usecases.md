---
title: Bitbucket Use Cases
description: Recommended Widgets and Metrics for Bitbucket Integration
sidebar_position: 15
sidebar_label: Bitbucket Use Cases

---

For engineering leaders it is essential for analyzing activity in your Bitbucket repositories, providing insights into contributions, collaboration, and process efficiency. The SCM widgets in SEI can be used with the Bitbucket integration to enable leaders to monitor developer productivity, track rework, and identify trends in pull requests (PRs) and code reviews.

This topic includes use cases for some of the most popular widgets used to measure developer metrics with the Bitbucket integration.

## Key widgets

### Measure Trellis Scores

[Trellis Scores](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview) are a proprietary productivity metric developed by SEI to provide a holistic view of team and individual performance in software development. These scores are derived from a combination of key performance factors, including [Code Quality](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#quality), [Code Volume](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#volume), [Speed](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#speed), [Impact](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#impact), [Proficiency](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#proficiency), and [Collaboration](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/sei-trellis-scores-overview#leadership-and-collaboration).

Using Bitbucket data, the Trellis widgets help measure essential metrics across these factors, such as Rework, Coding Days, Lines of Code, Cycle Time, and more. Follow the resources below to set up a Trellis profile and use the Trellis widgets for viewing insights into your engineering team’s performance.

* [Create Trellis profile](/docs/software-engineering-insights/sei-profiles/trellis-profile)
* [Trellis Score widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#trellis-score-report)
* [Trellis Scores by Collection widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#trellis-score-by-collection)
* [Individual Raw Stats widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#individual-raw-stats)
* [Individual Raw Stats by Collection widget](/docs/software-engineering-insights/sei-metrics-and-reports/trellis-scores/trellis-score-reports#raw-stats-by-collection)

### Measure DORA

For teams working on DevOps, DORA metrics like Lead Time for Changes and Mean Time to Restore (MTTR) are important. If your team uses Bitbucket as the SCM, the widgets below can help identify delays in delivery or recovery from issues.

* [Lead Time for Changes](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/dora-metrics#lead-time-for-changes)
* [Mean Time to Restore](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/dora-metrics#mean-time-to-restore-mttr)


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

The Bitbucket integration in SEI supports numerous other SCM widgets. For more recommendations or to explore additional SCM reports, contact [Harness Support](/docs/software-engineering-insights/sei-support) for guidance.

:::