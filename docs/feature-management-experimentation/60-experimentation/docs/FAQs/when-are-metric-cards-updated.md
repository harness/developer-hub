---
title: When are metric cards updated?
sidebar_label: When are metric cards updated?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019836212-When-are-metric-cards-updated </button>
</p>

<p class="p1">
  Feature flag versions are automatically calculated when they include percentage
  targeting rules. Flag versions that do not include percentage targeting rules
  will not be automatically calculated but can be calculated on-demand at any time
  via the Recalculate metrics button.
</p>
<p class="p1">
  <span>The duration between updates scales with the length of the version since the older the experiment, the less likely that the data collected in the last few hours can move the metric.</span>
</p>
<p>
  <span>At the beginning of a version, calculations are run every 15 minutes for definitions updated in the past hour. The time between these calculations increases incrementally through the duration of a version. Feature flags will be updated every hour for the first 12 hours and then alternate hours until it has been running for 24 hours. The calculation schedule will then move to daily until day 14 of a flag version. Final automated calculations will be run on day 21 and day 28 of a flag</span><span> version.</span>
</p>
<p>
  You can manually recalculate at any time, which is particularly useful if you
  add or update metrics. You can also see the last calculation time on the
  Metrics impact tab.
</p>
<h3 id="h_01HA3275YF38N5TMFQBQVG6Q60">Review Periods</h3>
<p>
  If you are using fixed horizon, as a best practice you should establish experimental
  review periods. Making conclusions about the impact of your metrics during set
  experimental review periods will minimize the chance of errors and allow you
  to account for seasonality in your data.
</p>
<p>
  Perhaps, you see a spike in data on certain days of the week. It would be against
  best practice to make your product decisions based on the data observed only
  on those days, or without including those days. Or, a key event, such as arriving
  for a restaurant reservation, may not happen until a few weeks after the impression.
</p>
<p>
  We will always show your current metrics impact, the review period has no direct
  impact on the metrics, neither the ingestion of events nor the recalculation
  of metrics. It's there as a <em>guideline</em> for users to provide a caution
  against making a decision too early or without accounting for seasonality, even
  if the card shows as statistically significant.
</p>
<p>
  Experimental review periods are a common practice for sophisticated growth and
  experimentation teams. For some experimentation teams, no decisions can be made
  until the experiment has run for a set number of days.
</p>
<p>
  As it’s an account setting, whatever you set may or may not be applicable for
  a specific experiment. That’s why the warning says it MAY not be conclusive.
  In other words, if it’s set at 14 days, in many cases the results on day 15 are
  probably as accurate as the results on day 14 (or 16 or 17 or….). The exception
  would be if there is a very specific cadence to the results.
</p>
<p>
  This<a href="https://help.split.io/hc/en-us/articles/360021867572-Reviewing-Metrics-during-an-experiment" target="_self">article</a>provides
  more information on reviewing your metrics cards.
</p>