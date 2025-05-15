---
title: Metric capping
sidebar_position: 20
---

With metric capping, teams can reduce the impact outliers and bots on their data. Any outlier values in your metrics will be capped and replaced with a fixed threshold value allowing for more meaningful experiment results, faster.

## Overview

Harness FME receives all raw events in the time frame of a version of a feature flag.

At the time of metric calculation, the aggregation of the raw events per user (or account or other traffic type) is capped at the defined metric cap, which is set by the user for that metric.

The cap for an event can be set for the number of times it occurs 1) within a 24 hour period from the first impression in a version of an experiment or 2) in total in a version of an experiment.

The capped sum, count, or average per user is then used for the metric distribution and t-test.

All raw events, regardless of the cap, are received and logged by Harness FME and accessible in the Event types admin page. These are shown as raw events.

## Implementation

For example: you set a metric cap on homepage views to 10 per user. Trevor looked at the homepage 4 times and Sophie 20 times. When the metric card is calculated Trevor will have 4 home page views and Sophie’s homepage views will be reduced to 10. **Both users are still included in the experiment analysis**.

*Per user per day* is based on 24 hours time window from a user’s first impression within a particular version of an experiment.

<img src="https://help.split.io/hc/article_attachments/360019398752" alt="per_user.png" width="600" />

The table below shows when capping can be used for the various across and per functions.

|                                  | Per User | Per User Per Day |
|----------------------------------|----------|------------------|
| Count of events per user         | &check;  | &check;          |
| Sum of event values per user     | &check;  | &check;          |
| Average of event values per user | &check;  | X                |
| Ratio of two events per user     | &check;  | X                |
| Percent of unique users          | N/A      | N/A              |
| Count of events                  | &check;  | &check;          |
| Sum of event values              | &check;  | &check;          |
| Average of event values          | N/A      | N/A              |
| Count of unique users            | N/A      | N/A              |

## Examples

Across metrics will be capped at a per user level and provide total counts and sums after the caps are applied to any outlier user(s). They will be the same as below, except for average and unique users, which don't apply.

### Function: Count of events per user

Example: Capping the number of homepage views per user.

Description: Capping this function is most useful for minimizing bot activity in your experiment analysis.

### Function: Sum of event values per user

Example: Capping the checkout value of a user.

Description: Capping the sum of values that is passed in an event on a per user basis.

### Function: Average of event values per user

Example: Capping the average revenue generated per user.

Description: This type of capping is only available on per user basis, not per user per day - as this function is more useful to our customers over a longer timeframe.

### Function: Ratio of two events per user

Example: Capping the number of hotel searches before a user makes a booking.

Description: The capping value is dependent on the order of events (numerator and denominator).

This metric cannot be capped on per day basis, as both events may not happen within 24 hours, causing the metric value to be 0.

* To cap a metric to 10 hotel searches for 1 hotel booking, input 10.
* To cap the ratio of invites clicked to invites sent at 10 clicks to 100 sent, input 0.1.