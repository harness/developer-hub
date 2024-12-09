---
title: Sample ratio mismatch check
sidebar_label: Sample ratio mismatch check
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019981952-Sample-ratio-mismatch-check </button>
</p>

### Question

<p>
  How can I troubleshoot a Sample Ratio Mismatch in my feature flag?
</p>
<h3 id="h_01JENNESWRFM95B3FC6KWZ5Q7R">
  <a id="answer" class="header-anchor" href="#answer"></a>Answer
</h3>
<p>
  Split’s sample ratio check detects whether there is a sampling bias in your randomization.
  The check ensures the the percentage of the treatments selected by the targeting
  rules engine matches the requested percentage within a reasonable confidence
  interval.
</p>
<p>
  The most common reasons for a sample ratio mismatch to occur:
</p>
<ul>
  <li>
    <p>
      <strong>Customer Exclusion</strong>: Users may be being excluded from
      your metric impact analysis due to flipping targeting rules twice or
      more. If for some reason more users are excluded from one treatment than
      another a sample ratio mismatch will result. You can learn more about
      exclusion in Split in our
      <a href="https://docs.split.io/docs/attribution-exclusion#section-user-exclusion">product documentation</a>.
    </p>
  </li>
  <li>
    <strong>Dropped Impressions</strong>: If spotty network coverage or some
    other communication issue makes it impossible for instances of the Split
    SDK to transmit impressions to the Split cloud, you could see a sample ratio
    mismatch occur if for some reason more impressions for one treatment are
    dropped than those for another treatment. The frequency with which the SDK
    flushes impressions can be tuned with an SDK initialization parameter.
  </li>
</ul>
<p>
  If you have concerns of any potential for a bias in your targeting that may result
  in a sample ratio mismatch, you can conduct an
  <a href="https://help.split.io/hc/en-us/articles/360031279312-Running-an-A-A-test" target="_self">A/A test</a>
  before you start your experiment.&nbsp;
</p>