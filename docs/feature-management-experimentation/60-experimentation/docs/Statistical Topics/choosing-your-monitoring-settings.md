---
title: Choosing your monitoring settings
sidebar_label: Choosing your monitoring settings
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035504952-Choosing-your-monitoring-settings </button>
</p>

<p>
  There are two configurable parameters for feature monitoring - the length of
  the monitoring window and the degradation threshold.&nbsp;These can be changed in the <a href="/hc/en-us/articles/360020640752" target="_blank" rel="noopener">Monitor and Experiment Settings</a> section of your admin panel. 
</p>
<p>
  The window length is set at an account level whilst the degradation thresholds
  are set per-metric. As a default, the monitoring window is set to 24 hours and
  the degradation threshold is set at 0. By adjusting these parameters you can
  tailor the coverage and sensitivity of feature monitoring alerts in a way that
  best suits your organization and metrics.
</p>
<h1 id="h_01J9H24BXQSHSC99C7TNPN3MB6">Choosing the Monitoring Window&nbsp;</h1>
<p>
  The monitoring window is the period of time during which we monitor your feature
  flag for any severe degradations. A longer window means your flag will have more
  time to accrue data, giving you additional power to detect degradations that
  might have been missed with a smaller sample. However a longer window also means
  that we will use stricter significance criteria for alerts due to the increased
  number of checks expected during a longer window.
</p>
<h2 id="h_01J9H24BXQYK6FC3BANXBG9N26">Significance thresholds used for monitoring</h2>
<p>
  In order to control the false positive rate during the monitoring window we adjust
  the significance threshold that the p-value must meet before an alert is fired.
</p>
<p>
  Unavoidably, every statistical comparison has a chance of returning a false positive
  result. Hence, if this effect was unaccounted for, the more statistical comparisons
  we made the higher your chances of getting a false alert would be. Applying an
  adjustment to the significance threshold allows us to control the false positive
  rate and ensure that the likelihood of getting a false alert, across the whole
  of the monitoring window, is no higher than your chosen level (5% by default).
</p>
<p>
  The level of adjustment is directly dependent on how many times we intend to
  calculate your results during your chosen monitoring window. We divide the default
  significance threshold set for your account by the number of times we will check
  for degradations during the selected monitoring window.
</p>
<p>
  For example, if your monitoring window is 30 minutes, we expect to run 6 calculations
  during that time. In this case, if your significance threshold is set to 0.05
  in your statistical settings, the p-value would need to be below 0.008 (0.05
  / 6) for an alert to fire in this time window. If your window was instead set
  to 24 hours, we expect 52 calculations and hence a p-value would need to be below
  0.001 (0.05 / 52) for an alert to fire. This adjustment means that a longer monitoring
  window will have slightly less ability to detect small degradations at the beginning
  of your release or rollout.
</p>
<p>
  If you expect high traffic volumes, a shorter window will enable you to detect
  smaller degradations faster. On the other hand, if you have lower traffic volumes
  then a longer window will allow more time for your feature flags to accrue data.
  Note that we require at least 355 samples in both treatments before we can confidently
  test for significance. Hence, in order to benefit from the monitoring functionality
  your window should be long enough to ensure you have reached that minimum sample
  size. You can read more about Split's minimum sample size requirement
  <a href="https://help.split.io/hc/en-us/articles/360020641472#normal-distribution" target="_blank" rel="noopener">here</a>.
</p>

# Choosing your degradation thresholds

<p>
  For alert policies, we allow you to set a degradation threshold. Then,&nbsp;rather than testing for statistically significant evidence of <em>any</em> impact as we do for our standard metric analyses, we test for significant evidence of an impact <em>larger</em> than that threshold, in the opposite direction to the metric’s desired direction. This allows to you to tailor the alerts to fire only for degradations of a size that are important to you.
</p>
<p>
   By default this threshold is set to 0. This would be equivalent to our standard metric analyses, except for the two differences discussed above - the stricter significance thresholds and the one-sided nature of the test i.e. we only test for degradations and not for improvements. 
</p>
<p>
  By design, if your observed impact is equal to the set threshold it will not fire an alert.&nbsp; Instead, an alert only fires when the entire confidence interval - which represents the <em>range</em> of likely values - is above or below your set threshold.&nbsp;Hence, it is not unexpected for you to see a degradation in the metrics larger than your set threshold without an alert firing. This would just mean that the statistics suggest this result could just be due to noise in the data rather than a real degradation.
</p>
<p>
  For example, if the results were as shown in the image below, an alert would not have fired for the first 3 checks, even though the observed impact is already above your set alert threshold after Check 2. The reason no alert fires in these earlier checks is because the error margin, or confidence interval, on the impact is too wide to be confident that the impact really is greater than your threshold.&nbsp;However for the fourth and fifth checks, an alert would fire.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/30836025186445" alt="Alerting_Approach_Graph_V2.png" />
</p>
<p>
  Hence, for an alert to fire, the observed degradation will need to be a certain amount more extreme than the threshold you’ve chosen. Exactly how much more extreme it would need to be (sometimes called the Minimum Detectable Effect) depends on the sensitivity of the metric, which is influenced primarily by sample size and the variance in the metric values. We recommend setting an alert threshold that is <em>less extreme</em> than any degradation which you would definitely want to be alerted for. Chose a threshold which is close to the boundary between a safe or acceptable degradation and a degradation which you would want to know about.&nbsp;
</p>
<p>
  The <a href="https://help.split.io/hc/en-us/articles/360035681852" target="_blank" rel="noopener">Alert Policy Sensitivity Calculators</a> on this page allow you to see what range of degradations your policy is likely to be able to detect based on the metric characteristics and your chosen settings.
</p>