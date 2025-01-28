---
title: Using the metric details and trends data
sidebar_label: Using the metric details and trends data
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030966171-Using-the-metric-details-and-trends-data <br /> ✘ images still hosted on help.split.io </button>
</p>

<h2 id="h_01JEN2Q80X3V207XXJ32ZWX4VK">
  Overview<span></span>
</h2>
<p>
  <span>When you click in to a metric card from the metrics impact tab, you can see more in-depth details of the performance of the two selected treatments, as well as how these have changed over time. You can find more information on what is shown in the metrics details and trends view in this </span><a href="/hc/en-us/articles/360025376251" target="_blank" rel="noopener">article</a><span>.</span>
</p>
<p>
  <span>We show the results, along with the output of our statistical analyses such as the p-value and the error margin, so that you can see how the results would have looked had you checked the impact at a particular point in the past. For example, you can check how the results would have looked at the end of a review period, even if the review period has now passed.</span>
</p>
<h2 id="h_01JEN2Q80XQBZ0P9Z2DVSB1G3R">Concluding on interim data</h2>
<p>
  <span>Although we show the statistical results for multiple interim points, we caution against drawing conclusions from interim data. Each interim point at which the data is analyzed has its own chance of bringing a false positive result, so looking at more points brings more chance of a false positive. You can read more about statistical significance and false positives in this <a href="/hc/en-us/articles/360020641472" target="_blank" rel="noopener">article</a>. If you were to look at all the p-values from the interim analysis points and claim a significant result if any of those were below your significance threshold, then you would have a substantially higher false positive rate than expected based on the threshold alone. For example, you would have far more than a 5% chance of seeing a falsely significant result when using a significance threshold of 0.05, if you concluded on any significant p-value shown in the metric details and trends view. This is because there are multiple chances for you to happen upon a time when the natural noise in the data happened to look like a real impact. For this reason it is good practice to only draw conclusions from your experiment at the predetermined conclusion point(s), such as at the end of the review period. You can read more about reviewing metrics during an experiment in this <a href="/hc/en-us/articles/360021867572" target="_blank" rel="noopener">article</a>.</span>
</p>
<h2 id="h_01JEN2Q80XMN1FG28C4SGB2TDG">
  <span>Interpreting the line chart and trends</span>
</h2>
<p>
  <span>The line chart provides a visualization of how the measured impact has changed since the beginning of the feature flag. This may be useful for gaining insights on any seasonality or for identifying any unexpected sudden changes in the performance of the treatments.</span>
</p>
<p>
  <span>However it is important to remember that there will naturally be noise and variation in the data, especially when the sample size is low at the beginning of a feature flag, so some differences in the measured impact over time are to be expected. Additionally, since the data is cumulative, it may be expected that the impact changes as the run time of your feature flag increases. For example, the fraction of users who have done an event may be expected to increase over time simply because the users have had more time to do the action.</span>
</p>
<h2 id="h_01JEN2Q80X4SQ1P8SSZBM7RTY3">
  <span>Example Interpretation</span>
</h2>
<p>
  <span>The image below shows the impact over time line chart for an example A/A test - a feature flag where there is no true difference between the performance of the treatments. Despite there being no difference between the treatments, and hence a constant true impact of zero, the line chart shows a large measured difference at the beginning, and an apparent trend upwards over time - this is due only to noise in the data at the early stages of the feature flag when the sample size is low, and the measured impact moving towards the true value as more data arrives.</span>
</p>
<p>
  <img src="https://help.split.io/guide-media/01GW8S7Z53CNPFYEGGCKCPDJWW" alt="Impact_over_time_noise_AA_example.png" width="837" />
</p>
<p>
  <span>Note also that in the chart above there are 3 calculation buckets for which the error margin is entirely below zero, and hence the p-values at those points in time would imply a statistically significant impact. This is again due to noise and the unavoidable chance of false positive results - if you weren't aware of the risk of <em>peeking</em> at the data, or of considering multiple evaluations of your feature flag at different points in time, then you may have concluded that a meaningful impact had been detected. However, by following the recommended practice of concluding only at the predetermined end time of your feature flag you would eventually have seen a statistically <em>in</em>conclusive result as expected for an A/A test.</span>
</p>