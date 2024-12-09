---
title: Why are the counts different from other tools?
sidebar_label: Why are the counts different from other tools?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025467112-Why-are-the-counts-different-from-other-tools </button>
</p>

<h2 id="question" class="header-anchor">Question</h2>
<p>
  Why are number of visitors/impressions and/or the number of events different
  when I compare Split to other tools?
</p>
<h2 id="answer" class="header-anchor">Answer</h2>
<p>
  Most companies have a variety of tools to count and track user visits and interactions
  on their web and mobile applications. While it can be helpful to compare
  the numbers between, say, Split and Google Analytics, it is not unusual or unexpected
  that the numbers are different. There can be a number of reasons for this:
</p>
<p>
  <strong>Sampling and configuration settings</strong>
</p>
<p>
  Sampling: Tools such as Google Analytics sample data in common configurations,
  sending a representative subset of the data instead of the entire data set.
  This obviously results in a potentially dramatic difference in what you see when
  comparing numbers. Google Analytics will warn you if you the data is being
  sampled. You can configure the precision/speed ratio or reduce the timeframe
  over which data is sampled to avoid it all together.
</p>
<p>
  Filtering: Many tools allow you to set filtering criteria to include or exclude
  specific traffic, perhaps blocking internal traffic, spam, bots, excluding time
  ranges or IP addresses, etc. Make sure to use the same filtering logic
  across all tools, or at least account for the differences.
</p>
<p>
  Time Zones and Time Windows: Some analytics tools use the the user's location
  while others may default to UTC or some other time zone. This affects the
  day boundary for reports. Also, the start time of an experiment may not
  coincide neatly with the output from another tool. Make sure you are looking
  at the same window of time when comparing data.
</p>
<p>
  <strong>Attribution and exclusion</strong>
</p>
<p>
  Because different attribution logic is used by various tools it's not uncommon
  for values of a similar metric to vary by 10-15%. It's important to understand
  how things like omni-channel conversions are handled. For example, a user
  may get an impression/treatment on one device, perhaps an ad on a phone, and
  then convert (or perform some other tracked action) from a browser.
</p>
<p>
  When experimenting, Split will exclude users from results under certain circumstances.
  For example, a user that switches targeting rules more than once within the same
  version of an experiment. This is not a usual circumstance and the number
  of users excluded for these reasons may be small, but there are cases where the
  design of a test could cause many users to be excluded because of changing targeting
  rules more than once.
</p>
<p>
  Detailsdescribing how Split's attribution logic and how it's handled when
  users change treatments and/or rules within a version can be found in the
  <a href="https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion" target="_self">Attribution and exclusion</a>
  article in the Help Center.
</p>
<p>
  In addition, Split's
  <a href="https://help.split.io/hc/en-us/articles/360025376251-Metric-Details-and-Trends" target="_self">Metric's Details and Trends</a>
  feature quickly highlights any excluded users.
</p>
<p>
  <strong>Browsers and mobile devices</strong>
</p>
<p>
  Implementation on the browser or mobile device can impact the collection of data.
  This is exacerbated by the relative lack of control over user interaction. Abruptly
  closing a browser window or a mobile app can impede data from being captured.
</p>
<p>
  Also, content blockers are becoming more common as users seek to avoid ads and
  more attention is placed on privacy concerns. These blockers can impact
  a wide range of client-side trackers, not just ads. Depending on what's
  blocked, they could cause the results computed by various analytic tools to differ.
</p>
<p>
  Server side feature flags: One way to mitigate the issues posed by the lack of
  control on the client side, and create greater consistency in the user experience,
  is to move feature flags to a back end service for evaluation.
</p>
<ul class="article-list">
  <li class="article-list-item ">
    <a href="https://help.split.io/hc/en-us/articles/360025281872-Moving-Splits-to-the-Back-End">Moving feature flags to the backend</a>
  </li>
</ul>
<p>
  Be aware that moving feature flags to the back-end may exacerbate the difference
  in counts if content blockers come into play since client-side content blocking
  doesn't impact server-side flags.
</p>
<p>
  When using the JavaScript or mobile SDKs, configuration options (such as
  <a href="https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#configuration" target="_self">these</a>
  for JavaScript) can be tuned to ensure you'll capture the greatest possible number
  of impressions and/or events. In particular, the RefreshRates can have
  a significant impact when lowered.
</p>
<p>
  A number of articles in the Help Center describe why you may be missing or getting
  improper impression counts in Split, and how to avoid some of these issues:
</p>
<ul class="article-list">
  <li class="article-list-item ">
    <a class="article-list-link" href="https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready">Block traffic until the SDK is ready</a>
  </li>
  <li class="article-list-item ">
    <a class="article-list-link" href="https://help.split.io/hc/en-us/articles/360007632132-Why-are-Impressions-not-showing-in-Split-">Why are Impressions not showing in Split?</a>
  </li>
  <li>
    <a class="article-list-link" href="https://help.split.io/hc/en-us/articles/360012551371-Why-does-the-Javascript-SDK-return-Not-Ready-status-in-Slow-Networks-" target="_self">Javascript SDK on slow networks</a>
  </li>
  <li class="article-list-item ">
    <a class="article-list-link" href="https://help.split.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-Control-treatments" target="_self">Always getting Control treatments</a>
  </li>
</ul>
<p>
  Split has robust data pipelines and attribution logic. If you do find a mismatch
  in numbers that is greater than the expected variance between tools, we're happy
  to work with you to troubleshoot the discrepancy. Open a support ticket from
  our site or send an email to
  <a href="mailto:help@split.io" target="_self">help@split.io</a>
</p>