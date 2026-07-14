---
title: Software Engineering Insights Troubleshooting
description: Learn how to troubleshoot common Software Engineering Insights issues.
sidebar_label: Overview
sidebar_position: 5
redirect_from:
  - /kb/software-engineering-insights/sei-faqs/sei-system-faqs
  - /docs/software-engineering-insights/troubleshoot-sei/sei-troubleshooting-faqs
---

This page provides information to help you troubleshoot issues with Software Engineering Insights. If you need additional help, contact [Harness Support](/docs/software-engineering-insights/sei-support) or visit the [Harness Community](https://developer.harness.io/community/).

## Can we track on how long was an issue open before it got delivered (Ticket, Story, Epic, etc.)?

Yes. We can track the time a ticket, story, or epic was open before it got delivered. This is often referred to as lead time or velocity.

## Can we show what was delivered in Production?

Yes. We can show what was delivered in Production, but it depends on how the user has defined their delivery workflow.

## Can we show if a task was in the commitment of the week or was it creep?

Yes. We can show whether a task was part of the commitment for the week or if it was added later, often referred to as "creep" tickets.

## Can we track improvement in developer productivity over time?

Yes. SEI can display trends that show whether the team or project is improving over time.

## Can I customize the Trellis Score Visualization for Kanban metrics and comparisons?

Customization options may depend on your specific tools and access rights. If you have editing rights you should be able to modify the Trellis Dashboard to suit your requirements, including adding comparisons or adjusting views.

## Do we have widgets for Kanban?

Yes. The key Kanban metrics are -

* **Lead Time:** Lead time measures the time it takes for a software development task to move from the moment it's added to the Kanban board until it's marked as complete. It reflects the total time a task spends in the Kanban workflow.
* **Cycle Time:** Cycle time focuses on the "active work" phase in Kanban, measuring the duration between when a team member starts a task and when they finish it. Cycle time begins when a task enters the active workflow.
* **Work-in-progress:** Work-in-progress also often referred to as WIP represents the number of tasks currently in the "active" or "in-progress" stages within the Kanban system. It provides a snapshot of ongoing work at any given time.
* **Throughput:** Throughput quantifies the number of tasks or work items your team successfully completes within a specific time frame, like a day or a week. It measures your team's productivity during that period.

## Can I associate a Business Alignment profile to a report?

Business Alignment profiles are applied at the Report level.

To begin with this you can create a new BA profile with the necessary details. After creating the profile, return to the insight where you want to use it and access the BA report settings.

Now you can switch between existing BA profiles from the profile selection option.

## What is the idle session timeout, and is there a non-idle session timeout?

The idle session timeout is currently set to 3 hours. This means that when a user is inactive for 3 hours, the user interface (UI) will automatically log them out and terminate their session.

## What are the rules for mapping a pull request (PR) to a work item?

A pull request can be mapped to a work item only if all the following conditions are met:
- PR title or branch must contain the work item ID.
- PR must be created **after** the work item was created.
- PR creator must be the current or previous assignee of the work item.

## Why is my PR not counted in Trellis productivity metrics?

Only merged PRs are considered in Trellis metrics. PRs that are closed without being merged—even if created earlier—are excluded from the count.

## Does Harness capture the time between PR creation and approval, including pipeline execution like build, tests, and quality scans?

It depends on how the profile is configured. Harness can capture this time if the profile includes tracking for the stages between PR creation and approval

## How is Lead Time calculated for each stage?

The Lead Time for a stage is determined by the time difference between the start time of the current stage and the start time of the previous stage. This approach focuses on the time it takes for an issue to reach a particular stage for the first time, rather than the duration spent within that stage.

### What are the different methods to calculate Lead Time?

- Average Lead Time: Calculates the average time spent in each stage across all tickets. The overall Lead Time is the sum of the average times for all stages.
- Median Lead Time: Identifies the middle value of Lead Times for each stage, ensuring that half of the tasks are completed faster and the other half take longer. The overall Lead Time is the sum of the median times for all stages.
- 90th Percentile Lead Time: Represents the time within which 90% of tasks are completed, excluding the most extreme delays. The overall Lead Time is the sum of the 90th percentile times for all stages.

## How can I calculate Lead Time manually?

To manually calculate Lead Time:

1. Determine the start and end points of the change request process, typically from ticket creation to deployment in production.
1. Record timestamps for each stage of the development process.
1. Subtract the start time from the end time to find the total Lead Time.

Repeat this process for multiple change requests to analyze trends and areas for improvement

## Why isn’t my Jira ticket being mapped to the pull request (PR)?

The Jira ticket is not mapped because its issue ID does not appear in any of the required locations. 

Specifically:

- The PR title does not contain the Jira issue ID.
- The source branch name does not include the Jira issue ID.
- No commit message references the Jira ticket ID.

To enable mapping, ensure that the Jira issue ID is included in at least one of the locations described above.

For troubleshooting guidance about the Harness platform, secrets, or other modules, go to the [Platform Knowledge Base](/docs/category/knowledge-base/) or [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).
