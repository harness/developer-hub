---
title: Metric capping
sidebar_label: Metric capping
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360022165552-Metric-capping </button>
</p>

<p>
  With metric capping, teams can reduce the impact outliers and bots on their data.
  Any outlier values in your metrics will be capped and replaced with a fixed threshold
  value allowing for more meaningful experiment results, faster.
</p>
<h3 id="overview" class="header-anchor">Overview</h3>
<ol>
  <li>
    <p>
      Split receives all raw events in the time frame of a version of a feature
      flag.
    </p>
  </li>
  <li>
    <p>
      At the time of metric calculation, the aggregation of the raw events
      per user (or account or other traffic type) is capped at the defined
      metric cap, which is set by the user for that metric.
    </p>
  </li>
  <li>
    <p>
      The cap for an event can be set for the number of times it occurs 1)
      within a 24 hour period from the first impression in a version of an
      experiment or 2) in total in a version of an experiment.
    </p>
  </li>
  <li>
    <p>
      The capped sum, count, or average per user is then used for the metric
      distribution and t-test.
    </p>
  </li>
</ol>
<p>
  All raw events, regardless of the cap, are received and logged by Split and accessible
  in the Event types admin page. These are shown as raw events.
</p>
<h3 id="implementation" class="header-anchor">Implementation</h3>
<p>
  For example: you set a metric cap on homepage views to 10 per user. Trevor looked
  at the homepage 4 times and Sophie 20 times. When the metric card is calculated
  Trevor will have 4 home page views and Sophie’s homepage views will be reduced
  to 10.
  <strong>Both users are still included in the experiment analysis.</strong>
</p>
<p>
  <em>Per user per day</em> is based on 24 hours time window from a user’s first
  impression within a particular version of an experiment.
</p>
<p>
  <img src="https://help.split.io/guide-media/01GW8E88T5STNKTJF3VPXDFKCV" alt="per_user.png" />
</p>
<p>
  The table below shows the when capping can be used for the various
  <em>across</em> and <em>per</em> functions.
</p>
<p>
  <img src="https://help.split.io/guide-media/01GW8V3KWBGYFZRN2J99YKZXR6" alt="table.png" />
</p>
<h3 id="examples" class="header-anchor">Examples</h3>
<p>
  Across metrics will be capped at a per user level and provide total counts and
  sums after the caps are applied to any outlier user(s). They will be the same
  as below, except for average and unique users, which don't apply.
</p>
<h4 id="function--count-of-events-per-user" class="header-anchor">Function : Count of Events per User</h4>
<p>
  Example : Capping the number of homepage views per user.<br />
  Description : Capping this function is most useful for minimizing bot activity
  in your experiment analysis
</p>
<h4 id="function--sum-of-event-values-per-user" class="header-anchor">Function : Sum of Event Values per User</h4>
<p>
  Example : Capping the checkout value of a user<br />
  Description : Capping the sum of values that is passed in an event on a per user
  basis
</p>
<h4 id="function--average-of-event-values-per-user" class="header-anchor">Function : Average of Event Values per User</h4>
<p>
  Example: Capping the average revenue generated per user<br />
  Description : This type of capping is only available on per user basis, not per
  user per day - as this function is more useful to our customers over a longer
  timeframe.
</p>
<h4 id="function--ratio-of-two-events-per-user" class="header-anchor">Function : Ratio of Two Events per User</h4>
<p>
  Example : Capping the number of hotel searches before a user makes a booking<br />
  Description : The capping value is dependent on the order of events (numerator
  and denominator)
</p>
<p>
  This metric cannot be capped on per day basis, as both events may not happen
  within 24 hours, causing the metric value to be 0.
</p>
<ul>
  <li>
    <p>
      To cap a metric to 10 hotel searches for 1 hotel booking input 10.
    </p>
  </li>
  <li>
    <p>
      To cap the ratio of invites clicked to invites sent at 10 clicks to 100
      sent input 0.1.
    </p>
  </li>
</ul>