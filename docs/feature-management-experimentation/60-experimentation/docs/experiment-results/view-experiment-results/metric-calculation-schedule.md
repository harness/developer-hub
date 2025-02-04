---
title: Metric calculation schedule
sidebar_label: Metric calculation schedule
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 4
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab <br /> ✘ images still hosted on help.split.io <br /> </button>
</p>

When you have a feature flag with percentage distribution targeting, Split automatically calculates metrics for the feature flag treatments. You can view the calculated metrics results on the Metrics impact tab. You can also manually initiate a metric recalculation to update the metric results to reflect the most recent data.

## When metric cards are updated

Every change to a feature flag, including modifying the percentage targeting rules, leads to a new version. **Metric impact calculations are automatically run for feature flag versions that include a percentage targeting rule.** They can also be calculated on demand at any time by clicking the Recalculate metrics button. While you can manually calculate impact for a feature flag with no % targeting rules, Split won't run any statistical analysis in those cases.

Some examples are:

* an absolute value for a treatment served by a particular rule
* a difference between treatments. Because each rule only serves one treatment, this only applies to the "any" rule, for which statistical analysis is not possible anyways

### Automated calculation frequency

We compute metric impact on an expanding schedule. The longer the test runs (i.e., the older the latest version is) the longer before a metric update. We do that because the data collected is gradually less likely to move the metric. Metric calculations for definitions run as follows:

* Every 5 minutes for the first 30 minutes
* Every 15 minutes for the next 5.5 hours
* Every 30 minutes for the next 6 hours
* Every 1 Hour for the next 12 hours

That’s the first 24 hours

* Every 2 Hours for the next 24 hours
* Every 4 Hours for the next 2 days
* Every 6 Hours for the following 2 days
* Every 8 Hours for the following 2 days
* Every 12 Hours for the following 4 days

That’s the first 12 days 

* Every Day for the following 12 days
* Every 2 Days for the following 24 days
* Every 3 Days for the following 24 days

That’s the first 72 days

* Every 5 Days for the next 15 days
* One last run on day 90
* Everything else is manual

Metrics impact updates one last time after a version ends. You can manually recalculate at any time. This is useful if you add or update metrics. The last calculation time is visible in the Metrics Impact tab.

## Manually recalculating metrics

You can manually run calculations on-demand by clicking the Recalculate button. Recalculations can be run for key metrics only, or for all metrics (key, guardrail, and supporting). **Most recalculations take up to five minutes, but can take longer, depending on the size of your data and the length of your experiment.**

Reasons you may choose to recalculate metrics:
* If you create or modify a metric after the last updated metric impact calculation, recalculate to get the latest results.
* If you assign a metric to the Key metrics or Supporting metrics groups, recalculate to populate results for those metrics.
* If the current version of this feature flag was created more than 28 days ago, recalculate to update results with the most recent data. Note that Split’s data retention period is 90 days. The influence of data points prior to 90 days are lost, even if the feature flag version is older than 90 days.

The Recalculate button will be disabled when:

* **No impressions for this version are received within the current retention period (i.e., the last 90 days).** To enable the recalculation, check that the SDK is correctly initialized in your code and verify that the metric event was sent.
* **A forced recalculation is already scheduled.** A calculation is in progress.  You can click the Recalculate button again, as soon as the currently running calculation finishes.

If you have questions or need help troubleshooting, contact [support@split.io](mailto:support@split.io).