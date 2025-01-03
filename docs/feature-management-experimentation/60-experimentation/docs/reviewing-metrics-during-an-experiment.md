---
title: Reviewing metrics during an experiment
sidebar_label: Reviewing metrics during an experiment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360021867572-Reviewing-metrics-during-an-experiment </button>
</p>

<h3 id="reviewing-metrics" class="header-anchor">Reviewing metrics</h3>
<p>
  With Split, it is easy to check the change in a metric at any time; but to determine
  that the observed change represents a meaningful difference in the underlying
  populations, one first needs to collect a sufficient amount of data. If you look
  for significance too early or too often, you are guaranteed to find it eventually.
</p>
<p>
  Similarly, the precision at which we can detect changes is directly correlated
  with the amount of data collected, so evaluating an experiment’s results with
  a small sample introduces the risk of missing a meaningful change. The target
  sample size at which one should evaluate the experimental results is based on
  what size of effect is meaningful (the minimum detectable effect), the variance
  of the underlying data, and the rate at which it is acceptable to miss this effect
  when it is actually present (the power).
</p>
<p>
  The Experimental review period feature is intended to help avoid reaching conclusions
  before taking into account how long an experiment should run. You can find
  more information on review periods and when metric cards are updated in this
  <a href="https://help.split.io/hc/en-us/articles/360019836212-When-are-Metric-Cards-updated" target="_self">article</a>.
</p>
<h3 id="changing-an-experiment" class="header-anchor">Changing an experiment</h3>
<p>
  During the course of an experiment the
  <strong>metrics and review period will reset any time you make a change to the feature flag</strong>.
  This ensures that you are evaluating your metrics based on a consistent distribution
  of the population. When the distribution changes, your experiment resets.
</p>
<p>
  If you change a metric during a running experiment the metric card will show
  a message saying that we have no data for that card. The next time the calculations
  are made for that experiment (the frequency depends on the age of the experiment)
  the card will be updated to reflect the new metric definition. Versions of the
  experiment that have already been completed will not get recalculated.
</p>
<h3 id="ramp-plans" class="header-anchor">Ramp plans</h3>
<p>
  You will want to take these things into consideration when you develop your ramp
  plan. For percentage-based rollouts it is recommended that you start with a debugging
  phase: aimed at reducing risk of obvious bugs or bad user experience. The goal
  of this phase is not to make a decision, but to limit risk; therefore, there
  is no need to wait at this phase to gain statistical significance. Ideally, a
  few quick ramps—to 1%, 5%, or 10% of users—each lasting a day, should be sufficient
  for debugging.
</p>
<p>
  It's during the maximum power ramp (MPR) phase that you'll want to hold your
  experiment for, in most cases, at least a week. This phase gives the most statistical
  power to detect differences between treatment and control. For a two-variant
  experiment (treatment and control), a 50/50 distribution of all users is the
  MPR. For a three-variant experiment (two treatments and control) MPR is a 33/33/34
  distribution of all users. You should spend at least a week on this step of the
  ramp to collect enough data on treatment impact.
</p>
<p>
  If the targeting is more complex, you may want to use Traffic allocation as a
  way of moving from risk mitigation to MPR. This could avoid the need to make
  small discrete changes to the targeting rules.
</p>
<p>
  You may have further phases to test scalability, or perhaps to hold out a small
  percentage of users to understand the long term impact.
</p>
<p>
  <span>Since any change to the experiment will trigger a reset, one best practice is to create a segment for the individual target for each treatment. This allows you to add and delete users from the individual targets without modifying the experiment.</span>
</p>