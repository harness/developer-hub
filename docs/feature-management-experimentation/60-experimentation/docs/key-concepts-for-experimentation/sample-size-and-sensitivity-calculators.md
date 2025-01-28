---
title: Sample size and sensitivity calculators
sidebar_label: Sample size and sensitivity calculators
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators </button>
</p>

<h2 id="h_01HYDZ3HPXC122KDBBXQE02JD1">Experiment sensitivity</h2>
<p>
  When running an experiment it is important to ensure you have a large enough sample to be able to detect impacts of the size that are important to you. If your sample size is too low your experiment will be underpowered and you would be unlikely to detect a reasonably sized impact.
</p>
<p>
 Experiment sensitivity refers to the ability of your experiment to detect small changes. Each metric in your experiment has a Minimum Likely Detectable Effect (MLDE) - this is the smallest change which, if it exists, is likely to be detected and shown as statistically significant. Impacts smaller than the MLDE may be missed and not reach significance because the sample size was too low to confidently distinguish the impact from random noise.
</p>
<p>
  The larger the sample you have the smaller the impacts your experiment will be able to detect. It is often a trade-off between speed (not having to run the experiment longer to get a larger sample size) and sensitivity (being able to detect smaller changes).
</p>
<p>
  It is recommended you decide how long your experiment will run up front, and resist the temptation to change your original plans if you do not reach significance after the initial run-time. This is to avoid false-positive results - if left for an infinite time, any experiment will eventually cross over into significance purely by chance.
</p>
<p>
  We have created a set of calculators to help you decide how long to run your experiment. If you have a size of impact in mind which you want your experiment to be able to detect, you can use the <a href="#h_96364ca2-928c-46de-a4b7-5ebcf2c4ea52" target="_self">sample size calculators</a> to work out how large a sample you need to ensure your experiment has the sensitivity to detect impacts of that size. Otherwise, you can use the <a href="#h_ac56f9d9-2f8a-4967-a350-5730fe8e87b9" target="_self">sensitivity calculators</a> to see the kinds of impacts you can expect to be able to detect for a range of experiment lengths.
</p>
<p>
  Note that these calculators assume a significance threshold of 0.05 and a power
  threshold of 80%. For simplicity, they also assume that your sample size grows
  by the same amount every day. This may not always be a safe assumption if, for
  example, you are using accounts or logged in users as a traffic type and expect
  many repeat visits from the same unique keys. If this is the case we recommend
  using an estimate of the number of new unique visitors per day averaged over
  the runtime you are considering.&nbsp;
</p>
<p>
  See the
  <a href="#h_57c272cb-1dfd-4085-aa1c-368d89e34096" target="_self">Using the Calculators</a>
  section below for further information on the inputs to these calculators.&nbsp;&nbsp;
</p>
<h2 id="h_96364ca2-928c-46de-a4b7-5ebcf2c4ea52">
  Sample Size Calculators
</h2>
<p>
  By using the calculators below you can see how long you need to run your experiment to have a good chance of detecting a given effect size if it does exist. 
</p>
<p>
  If your metric is a count, sum, average or ratio metric, use the first
  <a href="#h_9859c3c7-1c9c-44d1-980d-416359eebda6" target="_self">calculator</a>
  for means metrics. Otherwise, if your metric is a percent of unique users metric,
  use the second
  <a href="#h_c354a74b-975a-4cb9-9c39-20aa82927294" target="_self">calculator</a>
  for proportions.&nbsp;
</p>
<h3 id="h_9859c3c7-1c9c-44d1-980d-416359eebda6">Calculator for mean metrics</h3>
<p>
  <iframe style={{width: '900px', height: '900px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://exp-calculators-means-9ecaf91e3a35.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>
<p>&nbsp;</p>
<h3 id="h_c354a74b-975a-4cb9-9c39-20aa82927294">Calculator for percent unique metrics</h3>
<p>
  <iframe style={{width: '900px', height: '900px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://exp-calculators-proportions-00c422485fac.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>
<h2 id="h_ac56f9d9-2f8a-4967-a350-5730fe8e87b9">Sensitivity Calculators</h2>
<p>
  By using the calculators below you can see the kinds of impacts you can expect to detect for a range of experiment lengths.
</p>
<p>
  If your metric is a count, sum, average or ratio metric, use the first
  <a href="#h_79194d74-5629-4dde-a770-943c378b35d1" target="_self">calculator</a>
  for means metrics. Otherwise, if your metric is a percent of unique users metric,
  use the second
  <a href="#h_da37a5a5-5501-4067-9646-20814610c317" target="_self">calculator</a>
  for proportions.&nbsp;
</p>
<p>
  The first graph shows you the Minimum Likely Detectable Effect - the smallest
  relative percentage change that your experiment is likely to detect, if it exists
  - for a range of different experiment lengths. As you can see, a longer running
  experiment enables you to detect smaller changes to your metrics.&nbsp;
</p>
<p>
  The second graph shows you how large or small the comparison metric would need
  to be for you to expect to see a significant result. Only if your treatment causes
  the comparison metric to change to a value outside of the grey shaded region
  can you expect to reach significance.&nbsp;
</p>
<h3 id="h_79194d74-5629-4dde-a770-943c378b35d1">Calculator for mean metrics</h3>
<h3 id="h_01HYDZ3HPXHDENRX3WT1E4SRNP">&nbsp;</h3>
<p>
  <iframe style={{width: '1100px', height: '1300px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://csb-16kyv-2r8njoik3.now.sh/?codemirror=1" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>

<h3 id="h_da37a5a5-5501-4067-9646-20814610c317">Calculator for percent unique metrics</h3>

<p>
  <iframe style={{width: '1100px', height: '1300px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://csb-5kd7k-42pc8nrsq.now.sh/?codemirror=1" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>
<h2 id="h_57c272cb-1dfd-4085-aa1c-368d89e34096">Using the calculators</h2>
<p>
  If you have the experiment pack and are unsure of any of the data required for
  the calculator, we recommend looking at the metric results for a similar feature
  flag you have already run or running a <em>100% off</em>&nbsp;feature flag with
  your intended targeting rules. You can then find the sample size, metric value
  and standard deviation from the
  <a href="/hc/en-us/articles/360025376251" target="_blank" rel="noopener">Metric Details and Trends</a>
  view reached by clicking into the metric card.
</p>
<h3 id="h_01HYDZ3HPX5E5WNPGNHQHXYFKH">Expected sample size per day</h3>
<p>
  This is the total sample size expected to enter your experimental rule each day,
  or your Daily Active Users (DAU). It will be the total across both treatments
  rather than per treatment.
</p>
<p>
  The Sample size column is shown under the Sample population section of the data
  table. You may need to adjust this to get to a daily estimate.&nbsp;
</p>
<p>
  For example, imagine you see the below table for a feature flag that ran for
  a full week, to get the estimated sample size per day, first sum the sample sizes
  across the two treatments, to get 2000, then divide by 7 to get an estimated
  daily value of 285 users.&nbsp;
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/26908355583885" alt="Screen_Shot_2019-10-31_at_14.14.37.png" />
</p>
<h3 id="h_01HYDZ3HPXEC4MV4CYWCTHEPX8">Baseline Metric Value</h3>
<p>
  This is the expected value of the metric in your control group or the value you
  expect to see for the treatment set as the baseline. If you are using a reference
  feature flag, you can also find an estimate for this value in the Metric Details
  and Trends view, you will need the number under the Mean column in the Metric
  Dispersion section of the data table.
</p>
<h3 id="h_01HYDZ3HPXSECMGS07GPK8ADJC">Baseline Standard Deviation&nbsp;</h3>
<p>
  The standard deviation characterizes how much variation there is in your metric.
  It is needed for the Means calculators but not for the percent-unique calculator.&nbsp;
</p>
<p>
  You can find this value under the Stdev column in the Metric Dispersion section
  of the data table.
</p>
<p>&nbsp;</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/26908355596685" alt="Screen_Shot_2019-10-31_at_14.13.35.png" />
</p>
<h3 id="h_01HYDZ3HPXHVSKSMFWEV58E1QH">
  What size (relative%) change do you want to be able to detect?&nbsp;
</h3>
<p>
  This is the smallest change which, if it exists, is likely to be detected and
  shown as statistically significant. Impacts smaller than this may be missed and
  not reach significance. In this section input the smallest change to your metric
  that you would definitely want to know about.&nbsp;
</p>
<h3 id="h_01HYDZ3HPX7MD90FJGMG1517VJ">Days in your typical seasonality cycle</h3>
<p>
  The number of days in your seasonality cycle is similar to your review period.
  It is the length of time needed to ensure a representative set of users. For
  example, if you typically see your business-level metrics vary across different
  days of the week, you should use a seasonality cycle and review period of at
  least a week.
</p>
<p>
  Split encourages making decisions after full
  <a href="/hc/en-us/articles/360020635912" target="_blank" rel="noopener">Review Periods</a>
  to help account for seasonality in your data. Hence, if your review period is
  set to 14 days, even if you had enough sample size after 12 days we still recommend
  running your experiment for a full review period of 14 days. These calculators
  will round up the recommended run time to the next full seasonality cycle.&nbsp;
</p>