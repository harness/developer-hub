---
title: SCM Coding Days
description: How is the SCM Coding Days metric calculated on SEI?
sidebar_label: SCM Coding Days
sidebar_position: 40
---

This topic provides a guide on how the **SCM Coding Days** metric is calculated across various SCM reports on SEI.

Coding Days can be defined as the metric representing the number of unique days within a specified time range during which a developer has committed code changes. This metric aims to quantify the developer's active engagement in coding activities over a given period.

## Scope of Measurement

The Coding Days metric is measured across 4 types of reports on SEI.

1. Trellis Raw Stats report
2. Trellis Developer report
3. SCM Coding Days report
4. SCM Coding Days Single Stat report

### Trellis Raw Stats report

In the Raw Stats report the Coding Days metric displays the count of unique days on which a developer has committed code changes. To configure this report on your Insight, go to [Trellis Insight: Tutorial](/docs/category/trellis-scores)

```bash
Calculation: Number of days in the selected time range with at least one commit.
```

### Trellis Developer report

In the Trellis Developer report the Coding Days metric displays the average number of coding days per week that a developer has worked on during the selected time period. To configure this report on your Insight, go to [Trellis Insight: Tutorial](/docs/category/trellis-scores)

```bash
Calculation: Raw coding days divided by the total number of weeks in the selected time range.
```

### SCM Coding Days report

In the SCM Coding Days report the metric displays the coding days count based on the selected metrics in the widget configuration.

```bash
Calculation: Depends on the specific metric chosen in the widget configuration (e.g., Average Coding Days per Week).
```

### SCM Coding Days Single Stat report

In this report the metric displays the coding days count per month based on the selected metrics in the widget configuration.

```bash
Calculation: Raw coding days divided by the total number of days in a month.
```

## Calculation Example

Consider a developer A, with commits between October 1, 2023, and December 31, 2023.

### Trellis Raw Stats

* Developer A has committed code changes on 23 unique days within the specified time range.

### Trellis Developer report

* Total days in the range: 92 days (from October 1 to December 31).
* Total weeks in the range: 92 days / 7 days per week ≈ 13.14 weeks.
* Average Coding Days per Week: 23 coding days / 13.14 weeks = 1.75 days per week.

### SCM Coding Days Single Stat

* Total days in a month (assuming 30 days): 30 days.
* Average Coding Days per Month: 23 coding days / 30 days ≈ 0.76 days per month.

### Summary

* Developer A had 23 unique coding days.
* On average, Developer A coded approximately 1.75 days per week.
* The average coding days per month for Developer A was approximately 0.76 days.

These calculations provide insights into Developer A’s coding activity, breaking it down into daily, weekly, and monthly perspectives. The Coding Days metric is a flexible measure that helps understand a developer's engagement on the codebase over different time periods.