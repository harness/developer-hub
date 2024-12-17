---
title: Metrics details and trends
sidebar_label: Metrics details and trends
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends <br /> ✘ images still hosted on help.split.io </button>
</p>

Validate your metric by understanding its value and impact over time, dispersion, and sample population. You can click **View more** on a metric card on the Metrics impact tab to understand its trend over time and statistical information. In addition, you can:
* Review the Impact snapshot chart for an up-to-date, aggregated view of the expected impact over baseline for each treatment and an estimated range for that impact

* Select more treatments, to compare the impact against the baseline in the Impact over time chart

* Review the aggregated metric value for all treatments in the Values over time chart

The charts and tables are reflective of what you preselect within the Metrics impact tab, such as the feature flag version, targeting rule, treatment, and baseline chosen for comparison. 

## Accessing metric line charts and tables

To access metric line charts and tables:

1. From the left navigation panel, select **Feature flags**.
2. In the Feature flags panel, select your desired feature flag. 
2. Click the Metrics impact tab in your feature flag, in the Key metrics area, click the metric you want to analyze.
3. Select the desired chart to review.

## Metric meta data

The metric meta section displays the meta information associated with that metric such as owner, tags, and description. 

## Line charts

You can view line chart data for a feature flag version. Hover over a point on the line chart to update the values in the table. 

Before analyzing line charts, make sure the filters you are interested in are applied on the feature flag Metrics impact tab (e.g., the feature flag version, targeting rule, or baseline).

### Viewing impact snapshot

The Impact snapshot chart shows an up-to-date, aggregated view of the expected impact over the baseline for each feature treatment (variation) and an estimated range for that impact. 

#### Dimensional analysis

On the impact snapshot chart, you can analyze data for ___key metrics___ using [dimensional analysis](https://help.split.io/hc/en-us/articles/14824241665421-Using-dimensional-analysis). This allows you to:

* **Unlock deeper insights.** Understand unexpected spikes in your metric results that are driving top-line metrics at a dimensional level.
* **Run more data-driven experiments.** Iterate on your next hypotheses or run follow-up experiments using the insights gained on what worked or didn’t in past experiments.

___Important: [Multiple comparison correction](https://help.split.io/hc/en-us/articles/360037852431-Multiple-comparison-correction) is not applied to dimensional analysis.___

Before you can select a _dimension_ to analyze on the metric Impact snapshot, you need to send a corresponding _[event property](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties)_, for the event measured by the metric. (You can set event properties in code when you call the Split SDK's `track` method.) An Admin also needs to [configure dimensions and values](https://help.split.io/hc/en-us/articles/14824241665421-Using-dimensional-analysis#configuring-dimensions-and-values) to show them in the Select a dimension dropdown.

To view dimensional analysis on the metric Impact snapshot:

1. Select a baseline treatment on the Metrics impact tab.
2. Select a dimension in the Select a dimension dropdown. The Impact snapshot for the selected dimension is displayed.
3. In the Underlying data table below the line chart, you can select dimension values to be shown on the line chart.

Admins can choose the dimension values that are shown in the Underlying data table by clicking **Manage dimensions**.  Values that are not specified as dimension values in Admin settings are listed under “Other”.

If you have questions or concerns about your impact snapshot, contact support@split.io. 

### Viewing impact over time

The Impact over time chart allows you to visualize the aggregated value of the metric in each treatment of a feature flag. The chart represents the cumulative impact and is based on all the data Split has received up until the last calculation update. You can hover over a point on the chart to update the values in the table.

To view impact over time:

1. Select a baseline treatment on the Metrics impact tab.
2. Select treatments for comparison in the underlying data table.

 <img src="https://help.split.io/hc/article_attachments/360043113532/Screen_Shot_2019-11-15_at_2.11.35_PM.png" alt="Screen_Shot_2019-11-15_at_2.11.35_PM.png" width="635" />

### Viewing value over time

The Values over time chart allows you to visualize the average value of the metric for each treatment of your feature flag. You can also view how the estimated range of the metric value has changed over time.

 <img src="https://help.split.io/hc/article_attachments/360043113692/Screen_Shot_2019-11-15_at_2.15.30_PM.png" alt="Screen_Shot_2019-11-15_at_2.15.30_PM.png" width="656" />

## Metric tables
 
The following section describes the tables shown on the metric details page below the three time charts.

### Impact 

All criteria are necessary and sufficient to view your data when you select a treatment and a baseline treatment. A statistical comparison is made with the analyzed metric. A description of these columns are shown below.

| **Title** | **Description** | 
| --- | --- |
| **Impact**| The relative impact between the treatments you are comparing.| 
| **Error Margin** | The chance (dependent on your account's default significance threshold) that the interval between the mean +/- the error margin contains the true metric value. | 
| **P-value** | The probability of seeing a result at least as extreme as the result we observed, if the null hypothesis were true.| 

### Viewing metric dispersion 

The information displayed within the metric dispersion section of the table is dependent on the type of metric you are analyzing. When available, you can understand the minimum, maximum, median, and the 95th percentile of your metric. The metrics dispersion allows you to measure the spread of your data, or the variability in your sample. This section also includes the absolute total contributing to the metric value. For example, if you are measuring the count of purchases per user, you can see the actual count of purchases in each treatment and the uplift between the treatments. The table below highlights which columns is available based on the type of metric you are analyzing and those which show as N/A.

|  | **Total / Average / Contributors ** | **Mean** | **Stdev** | **Min** | **Median** | **95th Percentile** | **Max** |
| --- | --- | --- | --- | --- | --- |--- | --- | 
| **PER USER** | | | | | | | | 
| Count of events per user | yes | yes | yes | yes | yes | yes | yes | 
| Sum of event values per user | yes | yes | yes | yes | yes | yes | yes | 
| Average of the event values per user | N/A | yes | yes | yes | yes | yes | yes | 
| Ratio of two events per user | N/A | yes | yes | yes | yes | yes | yes | 
| Percent of unique users | yes | yes | N/A | N/A | N/A | N/A | N/A | 
| **ACROSS USERS** | | | | | | | | 
| Count of events | yes | N/A | N/A | N/A | N/A | N/A | N/A | 
| Sum of event values | yes | N/A | N/A | N/A | N/A | N/A | N/A | 
| Average of event values | yes | N/A | N/A | N/A | N/A | N/A | N/A | 
| Ratio of two events per user | yes | N/A | N/A | N/A | N/A | N/A | N/A | 
| Count of unique users | yes | N/A | N/A | N/A | N/A | N/A | N/A | 

| **Title** | **Description** | 
| --- | --- | 
| **Mean**| The mean is equal to the sum of all the data points in the data set, divided by the number of contributors in the data set.| 
| **Stdev** | The standard deviation represents the variance of the data set as compared to the mean.| 
| **Min** | The smallest data point in the data set.| 
| **Median** | The midpoint of the data set.| 
| **Max** | The largest data point in the data set.| 
| **95th percentile** | 95% of the time, the metric value is at or below this value.|

### Sample population 

This section of the table provides information about the metric's sample population. A description of these columns are listed below: 

| **Title** | **Description** |
| --- | --- | 
| **In treatment** | The number of unique user keys that were served a treatment, and in some cases sent an event measured by the metric. | 
| **Excluded** | The number of unique user keys excluded from the analysis. For more information, see the Exclusions section in [Attribution and exclusion](https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion#potential-complications). | 
| **Sample size** | The number of unique user keys remaining in the sample after exclusions. |

In most cases, the _In treatment_ value equals the number of user keys that were served a treatment. However, there are some metric definition settings that cause the _In treatment_ value to be ___less___ than the number of user keys that were served a treatment. (Consequently _Sample size_ would also be less.) These metric definition settings are explained below.

* For a metric measured as **Average of event values**, user keys that did not send the event are not included in the metric calculation. Thus, they would not be counted in the _In treatment_ value, even though they may have been served the treatment.

* For a metric measured as **Ratio of two events**, user keys with a zero dominator (event count) are not included in the metric calculation. Thus, these user keys would not be counted in the **In treatment** value for this metric, even though they may have been served the treatment.

* For a metric with a **Has done the following event** filter (in the metric definition Advanced section), the events that are filtered out are not included in the metric calculation. Thus, a user key that is filtered out is also not counted in the _In treatment_ value, even though the user key may have been served the treatment.
