---
title: Trellis metrics calculation
description: How all the Trellis Metrics in the Trellis Score report and the Raw Stats report are calculated on SEI?
sidebar_label: Trellis metrics calculation
sidebar_position: 40
---

This topic provides a guide on how all the Trellis Metrics in the Trellis Score report and the Raw Stats report are calculated on the SEI module.

Trellis supports two types of reports on SEI: Trellis Score Reports and Raw Stats Reports.

### Raw Stats Report Metrics

* PRs: Total number of pull requests contributed by the engineer or the respective collection in the selected timeframe.
* Commits: Total number of commits contributed by the engineer or the respective collection in the selected timeframe.
* Bug Fixed: Total number of items with issue type BUG that was resolved by the engineer or the respective collection in the selected timeframe.
* PRs commented: Total number of pull requests to which comments were added by the engineer or the respective collection in the selected timeframe.
* No. of PRs commented: Total number of pull requests to which comments were added by the engineer or the respective collection in the selected timeframe.
* No. of PRs approved: Total number of pull requests that were approved by the engineer or the respective collection in the selected timeframe.
* Rework: These are the most recent modifications to the codebase, made within the last 30 days or the time duration configured for Legacy code under the report settings. To learn more, go to Rafactored lines.
* Legacy Rework: These are lines of code that are older than 30 days, or the time duration configured for Legacy code under the report settings. To learn more, go to Legacy lines.
* Lines of Code: This metric calculates the total number of lines of code contributed by an engineer within the selected time frame. To learn more, go to Lines of Code
* Story points: Total number of story points contributed by the engineer or the respective collection in the selected timeframe.
* Unique file extension: Total number of unique files to which the engineer contributed or the respective collection in the selected timeframe.
* Unique repos: Total number of unique repositories to which the engineer contributed or the respective collection in the selected timeframe.
* Coding days: This displays the number of unique days within a specified time range during which a developer has committed code changes. To learn more, go to Coding Days.


### Ticket Portion in Raw Stats Reports

The **Ticket Portion** field is a useful metric that helps measure how much time each individual user has contributed to the overall resolution of a ticket. It represents the proportion of time a particular user worked on a ticket relative to the total amount of time the ticket was open.

#### Calculation Example

To better understand this, let's consider an example: **User X** was initially assigned a ticket and worked on it for **15 days** from October 18, 2023, to November 2, 2023. After that, the ticket was reassigned to **User Y**, who worked on it for **34 days** from November 2, 2023, to December 7, 2023.

To calculate **User X's Ticket Portion**, we need to divide their time spent working on the ticket (15 days) by the total amount of time the ticket was open (15 days + 34 days). So the calculation would look like this:

```
User X's ticket portion = Time spent by User X / Total time the ticket was open
User X's ticket portion = 15 days / (15 days + 34 days)
User X's ticket portion = 15 days / 49 days
User X's ticket portion = 0.306
```

This calculation gives us **User X's Ticket Portion**, which is approximately **0.31** when rounded to two decimal places. By using this metric, we can better understand how much each user has contributed to the overall ticket resolution process, which can help us identify areas where improvements can be made.

