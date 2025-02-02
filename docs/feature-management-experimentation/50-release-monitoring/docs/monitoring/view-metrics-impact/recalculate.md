---
title: Recalculate metrics for newest data
sidebar_label: Recalculate
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab <br /> ✘ images still hosted on help.split.io <br /> <span style={{backgroundColor:'#ffae42'}}> ✘ is the calculation schedule up to date? </span><br /> <span style={{backgroundColor:'#c2e2f2'}}> ✘ Ani to review </span> </button>
</p>

<span style={{backgroundColor:'#c2e2f2'}}>When you have a feature flag with percentage distribution targeting, Split automatically calculates metrics for the feature flag treatments. You can view the calculated metrics results on the Metrics impact tab. You can also manually initiate a metric recalculation to update the metric results to reflect the most recent data.</span>

## Automated calculation frequency

Automatic calculations are run for feature flag versions that include a percentage targeting rule. The duration between automatic calculations scales with the length of the version since the longer the experiment has run, the less likely that the data collected in the last few hours can move the metric. You can see the last calculation time on the Metrics impact tab.

The automated calculation schedule is:
<div style={{backgroundColor:'#ffae42'}}>
* After 5 minutes, then
* After 30 minutes, then
* After 1 hour, then
* Every 1 hour until 12 hours, then
* Every 2 hours until 24 hours, then
* Every 1 day until 7 days, then
* On day 14, then
* On day 21, then
* On day 28
</div>

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