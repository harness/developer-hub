---
title: Bullseye reports
description: Bullseye is a C++ code coverage tool.
sidebar_position: 20
---

[Bullseye](https://www.bullseye.com/) is a C++ code coverage tool. You can use the Bullseye reports in SEI to analyze code coverage trends or identify code areas with poor test coverage.

Use the [generic SEI integration](../../sei-integrations/sei-integration-generic.md) to integrate with BullsEye, and then add any of the following Bullseye reports to your [Insights](../../sei-insights.md):

* Bullseye Branch Coverage Report
* Bullseye Branch Coverage Trend Report
* Bullseye Code Coverage Report
* Bullseye Code Coverage Score Trend Report
* Bullseye Decision Coverage Report
* Bullseye Decision Coverage Trend Report
* Bullseye Function Coverage Report
* Bullseye Function Coverage Trend Report

## Bullseye metrics

Metrics reported on Bullseye reports include:

* Branch coverage:
   * Percentage of branches covered and not covered.
   * Number of branches covered and not covered.
* Decision coverage:
   * Percentage of decisions covered and not covered.
   * Number of decisions covered and not covered.
* Function coverage:
   * Percentage of functions covered and not covered.
   * Number of functions covered and not covered.
* Overall (aggregate) code coverage.

<!--
Aggregate code coverage is a percentage that is calculated as follows:

```
Percentage of code covered = ( Number of covered branches, decision, and functions ) / ( Total number of branches, decisions, and functions )
```
-->