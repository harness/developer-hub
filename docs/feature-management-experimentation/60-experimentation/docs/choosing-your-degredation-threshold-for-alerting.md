---
title: Choosing your degredation threshold for alerting
sidebar_label: Choosing your degredation threshold for alerting
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030908431-Choosing-your-degradation-threshold-for-alerting <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  For alert policies, rather than testing for statistically significant evidence of <em>any</em> impact as we do for our standard metric analyses, we test for significant evidence of an impact <em>larger</em> than your chosen degradation threshold, in the opposite direction to the metric’s desired direction.
</p>
<p>
  This means that, by design, if your observed impact is equal to the set threshold it will not fire an alert. Instead, an alert only fires when the entire confidence interval - which represents the <em>range</em> of likely values - is above or below your set threshold.Hence, it is not unexpected for you to see a degradation in the metrics larger than your set threshold without an alert firing. This would just mean that the statistics suggest this result could just be due to noise in the data rather than a real degradation.
</p>
<p>
  For example, if the results were as shown in the image below, an alert would not have fired for the first 3 checks, even though the observed impact is already above your set alert threshold after Check 2. The reason no alert fires in these earlier checks is because the error margin, or confidence interval, on the impact is too wide to be confident that the impact really is greater than your threshold.However for the fourth and fifth checks, an alert would fire.
</p>
<p>
  <img src="https://help.split.io/guide-media/01GW8V3XSB8K0AG4CW951VJBQW" alt="Alerting_Approach_Graph_V2.png" />
</p>
<p>
  Hence, for an alert to fire, the observed degradation will need to be a certain amount more extreme than the threshold you’ve chosen. Exactly how much more extreme it would need to be (sometimes called the Minimum Detectable Effect) depends on the sensitivity of the metric, which is influenced primarily by sample size and the variance in the metric values.
</p>
<p>
  The calculators below can be used to help you calculate what range of degradations
  you can expect to detect for a given sample size and set of metric characteristics.If
  your metric is a count, sum, average or ratio metric, use the first
  <a href="#h_9859c3c7-1c9c-44d1-980d-416359eebda6" target="_self">calculator</a>
  for means metrics. Otherwise, if your metric is a percent of unique users metric,
  use the second
  <a href="#h_c83fdd4e-10cc-42d3-b87c-62cdb264ec13" target="_self">calculator</a>
  for proportions. Note that these calculators assume your statistical settings
  are set at a significance threshold of 0.05 and a power threshold of 80%. We
  also assume that you are using the default monitoring window length of 24 hours,
  since we adjust the significance threshold according to your chosen monitoring
  window length, if you are using something other than 24 hours the minimum degradation
  to fire an alert will be slightly different to what is shown by this calculator.
</p>
<p>
  For example, imagine you have a <em>Percentage of unique users</em> metric which has a value of 60% in the baseline treatment, and you use a relative degradation threshold of 10%. If the desired direction of the metric is a decrease, then we would be testing for evidence that the Percentage of Unique Users in the comparison group is <em>more</em> than 66% (more than 10% higher than the baseline value).
</p>
<p>
  Assuming a 50/50 percentage rollout of users between baseline and comparison treatments, and an Org wide significance level of 0.05, with 10,000 unique users you would only see an alert if the observed percentage for the comparison group increased by more than 16.2% and hence had a value higher than 69.7%. If instead you had 1000 or 100,000 unique users, the comparison group value would need to be higher than 77% and 67%, respectively, for an alert to be raised.
</p>
<p>
  Hence, we recommend setting an alert threshold that is <em>less extreme</em> than any degradation which you would definitely want to be alerted for. Chose a threshold which is close to the boundary between a safe or acceptable degradation and a degradation which you would want to know about.
</p>
<h2 id="h_01J6CRFZTX4JRG4XQN1KKQZ04P">Using the calculators</h2>
<p>
  If you are unsure of any of the data required for the calculator we recommended
  looking at the metric results for a similar feature flag you have already ran,
  or running a "100% off" feature flag with your intended targeting rules. You
  can then find the sample size, metric value and standard deviation from the
  <a href="/hc/en-us/articles/360025376251" target="_blank" rel="noopener">Metric Details and Trends</a>
  view reached by clicking into the metric card.
</p>
<h3 id="h_01J6CRFZTXPT1CZHQD4J6FPTPY">Expected sample size during the monitoring window</h3>
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
  48 hours, and you intend to run a similar feature flag with a monitoring window
  length of 24 hours. To get the estimated sample size during the 24 hour monitoring
  window, first sum the sample sizes across the two treatments, to get 2000, then
  divide by 2 to go from 48 hours to 24 hours - this will give you an estimated
  sample size during the monitoring window of 1000.
</p>
<p>
  <img src="https://help.split.io/guide-media/01GW91D45YKE914DNKW6J1D9QD" alt="Screen_Shot_2019-10-31_at_14.14.37.png" />
</p>
<h3 id="h_01J6CRFZTX6RWWBSVQCPKCQ82M">Baseline Metric Value</h3>
<p>
  This is the expected value of the metric in your control group, or the value
  you expect to see for the treatment set as the alerting baseline. If you are
  using a reference feature flag, you can also find an estimate for this value
  in the Metric details and trends view, you will need the number under the Mean
  column in the Metric dispersion section of the data table.
</p>
<h3 id="h_01J6CRFZTX33V0PGAR3B7DKEPP">Baseline Standard Deviation</h3>
<p>
  The standard deviation characterises how much variation there is in your metric.
  It is needed for the Means calculators but not for the percent-unique calculator.
</p>
<p>
  You can find this value under the Stdev column in the Metric dispersion section
  of the data table.
</p>
<p></p>
<p>
  <img src="https://help.split.io/guide-media/01GW90AW66ZB6012VKRB4YFNPD" alt="Screen_Shot_2019-10-31_at_14.13.35.png" />
</p>
<h2 id="h_9859c3c7-1c9c-44d1-980d-416359eebda6">Means calculator</h2>
<p></p>
<p>
  <iframe style={{width: '900px', height: '850px', border: '0', borderRadius: '4px', overflow: 'hidden'}} src="https://exp-calculators-means-9ecaf91e3a35.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>
<p></p>
<h2 id="h_c83fdd4e-10cc-42d3-b87c-62cdb264ec13">Proportions Calculator</h2>
<p>
  <iframe style={{width: '900px', height: '850px', border: '0', borderRadius: '4px', overflow: 'hidden'}} src="https://exp-calculators-proportions-00c422485fac.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>
<p></p>