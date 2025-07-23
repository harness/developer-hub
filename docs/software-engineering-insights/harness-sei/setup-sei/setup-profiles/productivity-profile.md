---
title: Productivity profile
description: Learn how to create a Productivity Profile in SEI 2.0 to track developer contribution and activity.
sidebar_label: Productivity profile
sidebar_position: 2
---

A **Productivity Profile** helps you define how developer activity and contribution metrics are calculated in SEI 2.0. These profiles surface key insights such as coding frequency, pull request behavior, and work completed per developer — without requiring any manual resource definitions.

The SEI system automatically derives these metrics from your connected **Source Code Management (SCM)** and **Issue Management (IM)** systems data, based on where developer contributions are detected.To ensure attribution is accurate, make sure each developer has their SCM usernames and IM account IDs added in the [developer settings](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams).

## Prerequisites

Before you begin:

* The SEI 2.0 module must be enabled for your Harness account.
* You must have the SEI Admin role to create or manage Productivity Profiles.
* At least one Source Code Manager or Issue Management type integration should be present in the account.

## Setup a Productivity Profile

To get started:

* In your Harness project, go to the SEI module.
* Navigate to Account Management > Profiles.
* Select the Productivity tab under the profiles section.
* Click + New Productivity Profile.
* Enter a Profile Name and optional description.
* Enable the metrics you want to track and configure them using the sections below.
* Click Save once you're done.

Once saved, associate the profile with an Org Tree. SEI will begin powering productivity metrics based on this configuration.

### Enable / disable metrics

You can choose which metrics to enable in the profile and configure their thresholds or categorization logic where applicable.

| Metric                                 | Description                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------- |
| Coding Days per Month              | Tracks the average number of days developers actively push code.            |
| PR Velocity – PRs Merged per Month | Counts the number of PRs merged per month across target branches.           |
| PR Cycle Time                      | Measures the average time from PR creation to merge.                        |
| Lines of Code                    | Calculates total lines of code added, modified, or deleted across branches. |
| Work Completed Per Dev             | Tracks work items (features, bugs) completed by each developer.             |
| Comments per PR                    | Averages the number of review comments on each PR.                          |
| Time to First Comment              | Measures the average time from PR creation to first review comment.         |

### PR Size Thresholds

These thresholds help categorize PRs for size based analysis in metrics like PR Velocity.

* Small PR Threshold (default: 10 lines changed)
* Medium PR Threshold (default: 100 lines changed)
* PRs < Small threshold: Small
* PRs between Small and Medium: Medium
* PRs > Medium → Large

### Work Completed Per Developer

This metric tracks completed work items (e.g., Features and Bugs) assigned to each developer.

#### Define how you track features

* Select Issue Types (e.g., Story, Task)
* Define complexity of the feature based on effort estimation i.e. story points:
  * Simple: 1–2 points
  * Medium: 3–4 points
  * Complex: 5+ points

#### Define how you track bugs

* Select Issue Types (e.g., Bug)
* Define severity of the work item using work-item level priority filters:
  * Minor
  * Major
  * Critical

#### Define the statuses that represent active work

Select statuses from your issue management system that represent development phases e.g. In Progress, Dev Testing, Ready for QA etc. This is used to calculate Work Completed Per Dev and to contextualize effort timelines in feature delivery for every developer.

### Save and Apply the Profile

After configuring the desired metrics:

* Click **Save** to finalize the profile.
* Associate the profile with one or more **Org Trees** to apply the logic across developers.

Metrics will automatically be computed based on SCM and IM data — no additional setup or resource mapping is required.






