---
title: Applying filters
sidebar_label: Applying filters
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border: '1px', fontFamily: 'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020848451-Applying-filters  <br /> adjusted formatting <br /> images still hosted on google </button>
</p>

Split provides the ability to filter your metric results, so you can analyze impact with greater depth and precision. There are three required filters for analysis:

- **Version or custom dates.** Identify which version of the feature flag you want to get information from, or select a custom date to view your results. By default, Split selects the last feature flag version.
- **Targeting rule.** If you are using a special targeting rule, select the one that corresponds to the traffic you want to gain insight into. By default, Split selects the default rule, which is the last rule in the Targeting section of your feature flag definition.
- **Treatments.** Select two treatments to compare, so you can understand how one treatment is performing against another. For example, you would select “on” as the treatment and “off” as the baseline for an on/off feature flag.

Optionally, you can filter the metrics displayed by metric tag, metric owner, or metric result.


## Selecting a version

Each time a feature flag definition is changed in any way, Split creates a new version. Versioning is intended to support focused and rigorous analysis of changes you make to your features.

Select a version of the feature flag to see your metric results calculated for the lifetime of that version.

<p>
  <img src="https://lh5.googleusercontent.com/r6GzUUxwqP0AFHbyuM0boGLPqzi2oFYovDhqyw47mK9oID9wQO-fEr6uV5KOX9j3nJQl8j8md_gNni0gksx_mJIKgJhcBpokuSVZ2uCkoc4m2PooJ_u14299LazmwGkKoTB6h5tSaE5gqaesk4JIs1g" alt="applying_filters_selecting_a_version.png" width="749" height="322" />
</p>

:::info[Which changes trigger a new version?]

<table data-number-column="false" data-layout="wide" data-autosize="false" data-pm-slice="[] 1">
  <tbody>
    <tr>
      <th class="pm-table-header-content-wrap" data-colwidth="511">
        Change scope
      </th>
      <th class="pm-table-header-content-wrap" data-colwidth="134">
        New version is created
      </th>
    </tr>
    <tr>
      <td class="pm-table-cell-content-wrap" data-colwidth="511">
        Any field on the <b>Definition</b> tab, including <b>Name</b> or <b>Description</b> of <b>Treatments</b>, <b>Dynamic configuration</b>, <b>Individual targets</b>, <b>Targeting rules</b>, and <b>Alert baseline treatment</b>.
      </td>
      <td class="pm-table-cell-content-wrap" data-colwidth="134">
        Yes
      </td>
    </tr>
    <tr>
      <td class="pm-table-cell-content-wrap" data-colwidth="511">
        Editable fields in the feature flag <b>Details</b> panel, including <b>Description</b>, <b>Tags</b>, <b>Ownership</b>, and <b>Rollout status</b>.
      </td>
      <td class="pm-table-cell-content-wrap" data-colwidth="134">
        No
      </td>
    </tr>
  </tbody>
</table>
If you have made what you consider to be an insubstantial change to a feature flag definition (such as enhancing descriptions of your treatments, or adding a user to individual targets), consider using the custom date filter to combine versions.

:::

## Selecting custom dates

With the custom date filter, you can analyze your feature flag impact for any period of time that your flag has been active within Split’s [data retention period](https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion#data-retention) (the last 90 days). For example, a particular week of interest or before and after a major event. 

With this option, you can:

- Combine multiple versions and analyze results in aggregate.
- Select a start date and leave the end date ongoing.
- Select a fixed time in the past, and do deeper analysis on a given timeframe.
- Slice your data to remove unwanted information.

**How it works**

- **Analyzing your results between a custom start and end time:** Select a start time and end time within the last 90 days. If an experiment encompasses multiple change versions, the system combines the relevant versions that are active in the time period. The results are calculated only once when you click “Generate results”. If you want to refresh results on-demand at a later time, you can do so by clicking on the recalculate button.
- **Analyzing results between a custom start time and ongoing end time:** Select a start time within the last 90 days or the feature flag creation date (if it was created within 90 days) and keep the end time open by selecting the _Ongoing_ checkbox. The ongoing custom date filter remains active and the system automatically includes any new data or versions in the analysis. The schedule follows our [automated calculation frequency](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab#automated-alculation-frequency). As always, you can request a recalculation before the next scheduled time by clicking on the recalculate button. 
- **Trimming:** The impression data is trimmed by the start and end times. This means the impressions seen by your end users prior to the start time and after the end time are excluded from the calculation even if they are part of the merged versions. If the experiment is ongoing, the data is trimmed at the start time and results are calculated for the impressions seen after that point.

**How to set custom dates**


To start using custom dates on your analysis, do the following:

1. Select your feature flag and then click the **Metrics impact** tab.
2. In the **View impact for** menu list, select **Custom dates**.

<p>
  <img src="https://lh4.googleusercontent.com/vvrH9nQpqlRUZqOjVQkC-EkhMcHvOHaUi1-NUpwJN6gT3JgYqOWRlZeimE4pN4cBUefAo6_yGNY9f3qDm-8ksUnpv5LaTrWH7mTBasPvbovbOz3OBMYN1WKcjvIAhTH08_XN0yvgNZrMvgwyljUFhgI" alt="_" />
</p>
  

3. Select the desired start date for your analysis. You can set a datetime granularity down to the minute. The time is displayed in your device’s local time. If you see grayed out dates, it means either the feature flag was not yet created, or it is beyond our data retention period of 90 days.

4. Select an end time for your analysis, or select the **Ongoing** option. By selecting **Ongoing**, you are leaving the end date open, so new feature flag version changes will not reset your analysis. New data from those versions will be automatically included in your analysis.

5. To start calculations for that period and get results, click the Generate results button. This operation may take 5-10 minutes for a small experiment, and 30 minutes or more for big experiments.

<p>
  <img src="https://lh4.googleusercontent.com/8q4CtTtunJNMVmfMflbtp3WKgMpuGg3u4JP9V8ssgHPrVGmNlVyCCrlMAZAyeK2bFHVZyIn5IPLsjJa4z5I_t6_nTIjLtbhxrWR4m3eqoQGekVzdjXD4K8C813B7tKQPP_tl4p7SOp8Xc_RwPDMzHeA" alt="_" />
</p>

### Scenarios to be aware of

When you perform analysis with custom dates, be aware that some combinations can return results that are difficult or impossible to analyze. The following are some of the possible scenarios that could occur while combining different versions of the same feature flag:

- **Excluding users switching treatments more than once:** If a user switches between targeting rules once, a user’s events are attributed to the most recent treatment and rule. The [logic for attribution](https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion) remains the same as for the single versions. But since now it's possible to combine different versions, it could be that many users are excluded from the measurements, since they were exposed to multiple treatments in the time frame of analysis.

- **Inconsistent or ambiguous results when targeting rules are dramatically changed or removed.** 

  - A change in targeting rules excludes users from the measurements. For example, if you set Version 1 - 40/60, Version 2 - 30/70, Version 3 - 50/50, and Version 4 - 70/30, then you will be excluding 10% of your users on the first update, then 20%, and then again 20%. If the [logic for attribution](https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion) determines that the reallocated users see a different treatment on each update, then you will be excluding 50% of the users from the experiment since they switched what they saw. In general, the less you modify the percentages, the less users will be excluded from the measurements, and the larger the dataset for your experiment.
  - If any of the versions included in the time range has a treatment with 100% allocation, then it's impossible to bucket users and execute statistical calculations. A message will be shown stating that the sample size is invalid.

Sharing results is not currently supported when analyzing with custom dates.

## Selecting a targeting rule
 
To ensure statistical rigor and prevent issues that could arise due to unequal distributions across the sample set, we require customers to filter their results by the targeting rule used in the evaluation. 

To see a statistically significant comparison when comparing two treatments, select a label that you want to see your metrics results. If you select the **any** targeting rule, your metrics results still show up, but do not display statistical significance. 

<p>
  <img src="https://help.split.io/hc/article_attachments/15859729852941" alt="metric-impact-targeting-rule.png" />
</p>

## Selecting treatment and baseline
 
View metrics cards for the customers exposed to a particular treatment as well as compared against customers exposed to two treatments. Select the treatment that you want to view metric results for and optionally add a baseline comparison if you want to see statistically significant comparisons.

<p>
  <img src="https://help.split.io/hc/article_attachments/15859771931149" alt="metric-impact-treatment-and-baseline.png" />
</p>

## Selecting tags and owners
 
If your account has many metrics, you can filter the metrics displayed down to those with a particular tag and a particular owner. To filter metrics, do the following:

1. Select the desired feature flag and then click the **Metrics impact** tab. 

<p>
    <img src="https://help.split.io/hc/article_attachments/15859822297869" alt="metric-impact-tags-and-owners.png" />
</p>

2. In the Results area, click **0 more filters applied**. The Filtered by area appears. Fill in the fields as follows:
   * In the Metric tag field, enter the desired tag to filter down your metrics.
   * In the Metric owner field, enter the user or group to filter down your metrics.
3. Click the **Apply** button to apply your selections.   

For more information about tags and owners, refer to the [tags](https://help.split.io/hc/en-us/articles/360020839151) and [owners](https://help.split.io/hc/en-us/articles/360020582092) guides.
