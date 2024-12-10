---
title: Setting up and using metrics
sidebar_label: Setting up and using metrics
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics </button>
</p>

A metric is a measurement of success for your experiment on your website, application, backend performance, etc. It tells you if your experiments are improving, degrading, or are having no effect on your visitors’ experience, based on their behavior. You can measure customer behavior and customer experience in your application by sending events such as clicks, views, checkout events, page load time, or any other event that measures behavior or experience. This helps you make informed decisions about your product and performance. 

Once you begin collecting and analyzing your data, you’re likely to find it easier to reach a confident decision about your business challenges, allowing for continuous improvements over time. Also, having all of your key data points attached directly to your feature flags can help you roll out new products and manage risks. 

# How metrics are created

Metrics can be created in Split when you have two types of data: impressions and events. 

* **[Impressions](https://help.split.io/hc/en-us/articles/360020585192-Impressions)** occur when a visitor is assigned a treatment (i.e., variations) for a feature flag.
* **[Events](https://help.split.io/hc/en-us/articles/360020585772-Events)** track information and actions a user takes while in that feature flag.

# Creating a metric

To create a metric, do the following:

1. From the left navigation, click **Create Metric**. The Create a metric page appears.

  <img src="https://help.split.io/hc/article_attachments/30833216435725" alt="setting_up_and_using_metrics_create.png" />

2. To specify information for a metric, enter the following:

    * In the Name field, enter a human identifiable name.
    * In the Owners field, enter who the owners of the metrics are, e.g., administrators, homepage team, etc. Use owners to isolate metrics in the browse panes to those _owned by me_ and simplify [permissions](https://help.split.io/hc/en-us/articles/360020579052-Permissions). **Note: Ownership does not grant editing rights.**
    * In the Tags field, optionally add one or more [tags](https://help.split.io/hc/en-us/articles/360020839151) to help you categorize the metric. You can use tags to select a particular team or feature release. 
    * In the Description field, optionally describe your metric so your team members understand its purpose and meaning.
3. Click the **Create** button to create your metric.

Once you create your metric, you can now define your metric.

# Building a metric definition

You can define what you want to measure. To define your metric, do the following:

1. In the Select the desired impact field, select whether you would like to see this metric increase or decrease. In most A/B testing tools, this would be deemed the winning direction.
2. In the Select traffic type field, select what traffic type you would like to measure this metric for. Be aware that the traffic type for the metric must match the traffic type for the feature flag you want it applied to.
3. In the Measured as field, define functions to perform or calculate specific analyses on events. These functions can be performed per your traffic type. For more information, refer to the **About statistical comparison** section later in this guide.
4. In the Value field, optionally select which property you want to use as the value field. For more information, refer to the [Event property capture](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide.
5. In the Properties field, optionally define if there are any specific event properties to filter by for measuring this metric. For more information, refer to the [Event property capture](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide.

## Statistical comparison possible. Measured per user

When calculating metrics per user, first each user's individual contribution is calculated. Then each user adds a single data point to the distribution of the user metric results, hence they all have the same weight in the result. We use the resulting distribution for statistical testing of the metrics below.

All the examples assume that users are used for the traffic type in the experiment and the users were exposed to a particular treatment of a particular feature flag version.

Be aware that while this states for each user, it’s whatever traffic type you’re using at the time. 

| **Function** | **Description** | **Example** |
| --- | --- | --- |
| **Count of events per [traffic type]** | For each traffic type, the number of times they perform an event is calculated. | Measure the average number of times a user visits your website. <br /><br /> Measure the average number of support tickets a user files with your support team. |
| **Sum of event values per [traffic type]** | For each traffic type, the sum of their event values is calculated.| Measure the total value of items purchased by a user. <br /><br /> Measure the total number of minutes a user listened to media on your website. |
| **Average of the event values per [traffic type]** | For each traffic type, the average value of the user's events is calculated. | Measure the average value of items a user purchases. <br /><br /> Measure the average page load time a user experiences. |
| **Ratio of two events per [traffic type]** | For each traffic type, the ratio of the number of times two different events are performed is calculated. | Measure the number of hotel searches that occur for a user to make a hotel booking. <br /><br /> Measure the number of invites sent for a user to accept the invite. |
| **Percent of unique [traffic type]** | The number of distinct traffic types that performed the event as a percent of those in the sample is calculated. | Measure what percent of your sample size clicked the checkout button. <br /><br /> Measure the percent of users who filed a support ticket. |

# Applying a filter

You can optionally apply filters and filter properties, and a cap to your metric value. Filters help you improve the sensitivity of your metric by refining the sample used in the analysis. Filtering provides deeper analysis of how customers progress through a particular flow in your product. This allows you to see the behavior of customers who reach particular points in the funnel, such as abandonment by those who visited a product page, or those who added something to their cart. By filtering with events, it’s enforcing that the user has at some point seen both events of a particular version.

 Also, use filtering to create metrics that target only users who engage in a particular behavior, for example, observing the support ticket rate of those users who experience an exception or of users who completed the onboarding process. For more information about applying filters, refer to the [Apply filters](https://help.split.io/hc/en-us/articles/360020848451-Apply-filters) guide. To apply filters, do the following:

1. Towards the bottom of the Metrics page, click the **Show advanced** link. The Advanced section displays.

  <img src="https://help.split.io/hc/article_attachments/30833216436109" alt="setting_up_and_using_metrics_advanced.png" />

2. In the Filter by list, optionally apply a filter to these analyses. 
3. In the Properties field, optionally apply a property filter to the ‘has done’ event you’re filtering your metric by.
4. In the Cap at field, apply a cap to your metric value. With metric capping, any outlier value in your metrics is capped and replaced with a fixed threshold value. This reduces the variance and increases the sensitivity of your metric. When a metric cap is set to a per user per day, this is 24 hours from a user’s first impression within a particular version of a feature flag. Refer to [Metric capping](https://help.split.io/hc/en-us/articles/360022165552-Metric-capping) for more information.
5. Once finished, click **Create** to create your metric. Your new metric appears.

**Note: To get access to alert policies, contact your customer success manager or support to enable your account. If you create a metric that is measured on a per traffic type basis, you can create an alert policy for this metric. For more information about alert policies, refer to the [metric alerting guide](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting).**

# Viewing metric impact results overview

The Metrics impact tab shows the impact of your experiment or feature rollout on your customers. To make data-driven decisions on your features, it is critical to review and interpret the data that you have collected before deciding to roll out the functionality to more customers.

Whether the impact is statistically positive, negative, or inconclusive, the insights are a valuable resource. The data on the Metrics impact tab allows you to ensure safe and reliable feature delivery while powering data-driven decisions.

Be aware of the following:

* Understand how your most important metrics (overall evaluation criteria) are both positively and negatively impacted to learn more about what your customers expect and how you should change your feature functionality.
* Compare the actual impact with your team's preliminary hypothesis.
* Ensure that you understand the impact and tradeoffs on your account's guardrail and performance metrics.

## Viewing metrics impact

To view the impact of your experiments on your account's metrics, do the following:

1. From the left navigation, click **Feature flags** and select the desired feature flag.
2. From your feature flag, click the **Metrics impact** tab. The Results page appears. The page shows how your account's metrics change when looking at customers in a particular treatment as well as when comparing treatments.

  <img src="https://help.split.io/hc/article_attachments/30833216436493" alt="setting_up_and_using_metrics_view.png" />

 **Note: Automatic calculations run for flag versions which include a percentage targeting rule. On-demand calculations can be run at any time by clicking the Recalculate metrics button. Be aware that the recalculate button may be disabled in certain conditions. For more information, refer to the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451#About-recalculating-metrics) guide.**

3. In the View impact for criteria area, select a version of the experiment to see your metrics results. 
4. In the With targeting rule field, select a targeting rule used in your evaluation. Split ensures fair distribution across a filtered set and statistical rigor.
5. To view statistically valid results when you compare two treatments, select a label for which you want to see your metrics results. If you select the targeting rule **any**, your metrics results display, but statistical significance is not computed.
6. Select the treatment for which you would like to view metrics impact and optionally add a baseline comparison to see statistical comparisons. You can view metrics cards for users exposed to a particular treatment. To compare users exposed to different treatments, select the desired version, targeting rule, and treatments that you want to compare. When you select the treatment, you see the number of users in that treatment.
7. In the Summary of metrics impact section, view how long your experiment has been running, and the last update time for the metrics displayed below. You can also force a recalculation of your metrics using the **Recalculate** button. This recalculation usually takes around 5 minutes but is dependent on the length of your experiment and the size of your data.
8. In the Key metrics section, selected key metrics for this feature flag. If you are releasing a new feature behind this feature flag, display the key success metrics for this feature release here.

  **Note: A good practice is to have no more than 5 metrics. We recommend this because too many key metrics slow down the processing time to reach statistical significance.**

9. In the Guardrail metrics section, the account-wide guardrail metrics display. Any metrics that changed in a statistically positive and negative way display first.
10. In the Supporting metrics section, the supporting metrics that were added for the feature flag display. Any metrics that changed in a statistically positive and negative way display first.

Learn more about [applying filters](https://help.split.io/hc/en-us/articles/360020848451) to your data and [understanding the impact](https://help.split.io/hc/en-us/articles/360020890491) on your customers.

If you have any additional questions or need help troubleshooting, email us at [support@split.io](mailto:support@split.io).

## Filtering results view

To view a filtered version of your results, do the following:

1. On the Metric impacts tab, in the carousel section, filter down to metrics with a positive or negative impact by clicking the tile. You can deselect and view all by clicking the tile again. Filters allow you to filter down to metrics that have either a positive or negative impact.
2. Select tags and owners. You can filter the metrics displayed down to those with a particular tag and/or a particular owner. Learn more about using [tags](https://help.split.io/hc/en-us/articles/360020839151) and [owners](https://help.split.io/hc/en-us/articles/360020582092) in Split.
3. Share applied filters. Use the **Share** button to send your metrics impact page to key stakeholders. Click **Share** and a shareable URL is added to your clipboard.The shareable URL provides a view of the metrics impact page for that specific feature flag. The version, targeting rules, treatment comparisons, applied tags, and applied owners are all shared. Users can then filter the metrics positively and negatively impacted.

# Reviewing metrics impact during review periods

Making conclusions about your metrics impact during set review periods reduces the chance of errors and allows you to account for seasonality in your data. Split always shows your current metrics impact and if you are between review periods. The following describes the incomplete and complete states. 

**Note: Avoid making conclusive product decisions in between review periods or at a minimum ensure that you have run for at least one review period.**

## Incomplete
The review period can be incomplete for two reasons:

* Your feature flag did not run for the minimum review period configured for your account.
* Your feature flag is currently running and is between review periods.

## Complete
The review period is complete when the feature flag has run for the minimum review period, set by your account in either a current or previous version of your feature flag. A 14-day review period (configured by default) is ready for review on day 14, 28, 42, and so forth.

## Change settings
If you believe that the default review period for your account is too long or too short, you can reach out to your administrator to adjust your [statistical settings](https://help.split.io/hc/en-us/articles/360020640752).

# Understanding your metric impact

Your metrics cards show different states depending on the label selected, the traffic distribution, the data available, and whether a baseline is selected. The following summary explains each card's state.

For each metric, you can register whether you want the number to go up (e.g., revenue) or down (e.g., churn).

**Significant desired impact**

A metric card returns with the message 'Significant desired impact' and is green, it’s because of these factors:

* The change matches the desired direction.
* There is evidence that the treatment selected had a different impact on the metric than the baseline treatment selected. The p-value is less than the defined significance threshold of 0.05 or your configured significance threshold. 

**Significant undesired impact**

When a metric card returns with the message 'Significant undesired impact' and is red, it’s because of these factors:

* The change does NOT match the desired direction.
* The p-value is less than the defined significance threshold of 0.05 or your account-wide significance setting. In this case, there is evidence that the treatment selected had a different impact on the metric than the baseline treatment selected.

**Statistically inconclusive**

A metric card returns with the message 'Statistically inconclusive' if the metric impact is unclear. The card displays this yellow state if:

* There was little evidence to believe that there was an impact. In this case, the lower the p-value, the more evidence of an impact. Here, the p-value is greater than the defined significance threshold of 0.05, (or your account-wide significance setting). 
* Said otherwise, if a true effect does exist, it’s likely to be smaller than the minimum, detectable effect for this metric, given the sample size of the test. Refer to [Sample size and sensitivity calculators](https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators) for more information about detectable effect sizes via our calculators. 

## Error messages when viewing metrics

The following are error messages that might arise when viewing your metrics.

* **When the baseline value = 0.** This is determined by the absolute value for the metric for users in the baseline treatment. We cannot calculate relative impact and show ’N/A’ on the card. Instead, we provide the confidence interval based on the absolute impact between the two treatments. The same information is provided as the statistically significant and statistically inconclusive cards on hover but in absolute terms rather than relative.
* **Statistical comparison not possible.** A metric card returns with this message you try to view a metric for a single treatment.Select a baseline treatment for comparison to see the statistical comparison where available. If this doesn't resolve your issue, and you continue to have problems with your metrics, contact [support@split.io](mailto:support@split.io).
* **Needs more data.** A metric card returns this message when the treatments being compared have not reached the minimum sample size. We require a sample size of at least 10 or higher in each treatment before we calculate significance for your metrics. The default setting is 355.
* **Metric not available.** A metric card returns this message for several reasons. Refer to [Understanding metric impacts](https://help.split.io/hc/en-us/articles/360020890491-Understanding-metric-impact#not-available-card) for more information. If the troubleshooting information does not resolve your issue, contact [support@split.io](mailto:support@split.io).

# When metric cards are updated

Every change to a feature flag, including modifying the percentage targeting rules, leads to a new version. Split versions must have percentage targeting rules. If they don't, metric impact is not automatically calculated. They can be calculated on demand at any time by clicking the Recalculate metrics button. While you can manually calculate impact for a feature flag with no % targeting rules, Split won't run any statistical analysis in those cases.

 Some examples are:

* an absolute value for a treatment served by a particular rule
* a difference between treatments. Because each rule only serves one treatment, this only applies to the "any" rule, for which statistical analysis is not possible anyways

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

## About experimental review periods

A best practice is to respect experimental review periods. You shouldn’t draw conclusions about the impact of your metrics every time you compute them. This is called peeking which leads to errors, notably the following three types: failing to account for seasonality, early signal, and false positives.

User behavior changes by time of day or day of week. For example, let’s say you have a restaurant booking platform. If your change has a dramatic impact for users who book on Sunday night, it might not be representative of all your users. Many events only come days later. They can book a restaurant several days ahead. They won‘t confirm or pay until then.

We won’t block you from seeing your current metrics impact. The review period doesn’t influence the data process. It provides a caution against making a decision too early, without accounting for seasonality, or gaming statistical significance. It’s a common practice for mature experimentation teams; they wait for the experiment to run for a set the number of days before making a decision.

You can set it to either an account-wide or per-feature flag setting. Outside of the review period, we warn you that results MAY not be representative. Use appropriate judgment: if your review period is 14 days, the results on day 15, 16 or 17 are likely reliable. Be aware if your product has a very specific cadence. For example, processing pay stubs must include full periods to capture a representative cycle. 

# Sharing your results

Sharing results allows you to download a copy of your metrics impact results in various formats or share via URL. You can:

* Share the outcome of your experiments with colleagues without them needing to visit Split
* Keep a record of experiment outcomes in your preferred documentation formats or applications
* Conduct further manual analysis or visualizations as desired
* Import the metric results into your own internal systems
* View results in a tabular format

To generate the results, do the following:

1. On the Metrics impact tab, under Results, the Share results list is on the right side of the page, above the metric cards.
2. Click **Share results**. This allows you to view the list of format options.

  <img src="https://help.split.io/hc/article_attachments/30833238583053" alt="setting_up_and_using_metrics_share.png" /> 
3. Click your chosen format. Your browser downloads the file. A message appears on the page when the file has finished downloading. 

When you click Copy URL, this copies a URL link to your current view in the Split app to your clipboard but does not download a file.

# Available formats

You can generate a report containing your metrics impact results in the below formats:

## CSV
This format contains the observed metric data and the results of the statistical analyses. The report contains one row per metric and is intended to be human readable as well as appropriate for further manual analyses or reporting.

## JSON
This format contains the observed metric data, the results of the statistical analyses, as well as the statistical settings and metric definitions at the time of analysis. This format is intended for ingesting data into other tools and databases.

## PDF
This format presents a visual representation of your metrics impact results, similar to the Split user interface. This format is ideal for sharing results with stakeholders and for quickly understanding the high level outcomes of your tests.

## Copy URL
This copies a URL link to your current view in the Split app to your clipboard. This does require that anyone you share this with must have a Split account.

# Additional essential guides

The following are guides that walk you through additional capabilities of our Split application:

Refer to our [Foundational concepts](https://help.split.io/hc/en-us/articles/9648555765133-Foundational-concepts) guide for more information about foundational concepts of the Split application..

Refer to our [Feature flag management](https://help.split.io/hc/en-us/articles/9650375859597-Feature-flag-management) guide more information about how to create and manage feature flags.

Refer to our [Creating a rollout plan](https://help.split.io/hc/en-us/articles/9805284145549-Creating-a-rollout-plan) guide for more about creating rollout plans.