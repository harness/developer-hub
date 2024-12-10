---
title: Alert policy sensitivity calculator
sidebar_label: Alert policy sensitivity calculator
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035681852-Alert-policy-sensitivity-calculator </button>
</p>

#  Alert policy sensitivity

<p>
  There are two configurable parameters for feature monitoring - the length of the monitoring window and the degradation threshold. These can be changed in the <a href="https://help.split.io/hc/en-us/articles/360020640752" target="_blank" rel="noopener">Monitor and Experiment Settings</a> section of your admin panel. By adjusting these parameters you can tailor the coverage and sensitivity of feature monitoring alerts in the way that best suits your organization and metrics. See <a href="https://help.split.io/hc/en-us/articles/360035504952?flash_digest=6d4b16bfe110af1e4dea384bf878409d61d30bfd&amp;flash_digest=ddbe4a4ee843bd2a5d26a1960d88d9f2c2f7da3e" target="_blank" rel="noopener">this article</a> for a more in depth discussion on factors to consider when choosing these settings.
</p>

## Sensitivity calculators

<p>
  As with any statistical test in experimentation, we can't detect
  <em>everything</em><em>-</em>each metric will only have the power
  to detect degradations larger than a given size. Smaller degradations will not
  be distinguishable from natural noise and variations in your data.
</p>
<p>
  The calculators below can be used to help you calculate what range of degradations
  you can expect to be able to detect for a given sample size and set of metric
  characteristics.If your metric is a count, sum, average or ratio metric,
  use the first
  <a href="#h_9859c3c7-1c9c-44d1-980d-416359eebda6" target="_self">calculator</a>
  for means metrics. Otherwise, if your metric is a percent of unique users metric,
  use the second
  <a href="#h_c83fdd4e-10cc-42d3-b87c-62cdb264ec13" target="_self">calculator</a>
  for proportions. Note that these calculators assume your statistical settings
  are set at a significance threshold of 0.05 and a power threshold of 80%.
</p>
<p>
  For example, imagine you have a Percentage of Unique Users metric which has a value of 60% in the baseline treatment, and you use a relative degradation threshold of 10%. If the desired direction of the metric is a decrease, then we would be testing for evidence that the Percentage of Unique Users in the comparison group is <em>more</em> than 66% (more than 10% higher than the baseline value).
</p>
<p>
  Assuming a 50/50 percentage rollout of users between baseline and comparison treatments, an Org wide significance level of 0.05, and a monitoring window of 24 hours, with 10,000 unique users you would only see an alert if the observed percentage for the comparison group increased by more than 16.2% and hence had a value higher than 69.7%. If instead you had 1000 or 100,000 unique users, the comparison group value would need to be higher than 77% and 67%, respectively, for an alert to be raised.
</p>

## Using the calculators

<p>
  If you have the experiment pack and you are unsure of any of the data required
  for the calculator, we recommended looking at the metric results for a similar
  feature flag you have already ran, or running a <em>100% off</em> flag with your
  intended targeting rules. You can then find the sample size, metric value and
  standard deviation from the
  <a href="https://help.split.io/hc/en-us/articles/360025376251" target="_blank" rel="noopener">Metric details and trends</a>
  view reached by clicking into the metric card.
</p>
### Expected sample size during the monitoring window
<p>
  This is the total sample size expected to enter your experimental rule during
  the monitoring window, it will be the total across both treatments rather than
  per treatment.
</p>
<p>
  The Sample size column is shown under the Sample population section of the data
  table. You may need to adjust this value if the feature flag you are referencing
  ran for a different length of time than your chosen monitoring window length.
</p>
<p>
  For example, imagine you see the below table for a feature flag which ran for
  48 hours, and you intend to run a similar flag with a monitoring window length
  of 24 hours. To get the estimated sample size during the 24 hour monitoring window,
  first sum the sample sizes across the two treatments, to get 2000, then divide
  by 2 to go from 48 hours to 24 hours - this will give you an estimated sample
  size during the monitoring window of 1000.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/26883568432397" alt="Screen_Shot_2019-10-31_at_14.14.37.png" />
</p>

### Baseline metric value

<p>
  This is the expected value of the metric in your control group, or the value
  you expect to see for the treatment set as the alerting baseline. If you are
  using a reference feature flag, you can also find an estimate for this value
  in the Metric Details and Trends view, you will need the number under the Mean
  column in the Metric Dispersion section of the data table.
</p>

### Baseline standard deviation

<p>
  The standard deviation characterises how much variation there is in your metric.
  It is needed for the Means calculators but not for the percent-unique calculator.
</p>
<p>
  You can find this value under the Stdev column in the Metric Dispersion section
  of the data table.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/26883568466445" alt="Screen_Shot_2019-10-31_at_14.13.35.png" />
</p>

## Means calculator

<p>
  <iframe style={{width: '900px', height: '850px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://exp-calc-alertmeans-confwindow-baf229399d58.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>

## Proportions calculator

<p>
  <iframe style={{width: '900px', height: '850px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://exp-calc-alertprop-confwindow-8c155dbd4fc1.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>