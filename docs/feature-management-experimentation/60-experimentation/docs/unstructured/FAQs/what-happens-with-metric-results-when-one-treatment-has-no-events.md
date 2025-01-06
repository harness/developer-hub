---
title: What happens with metric results when one treatment has no events?
sidebar_label: What happens with metric results when one treatment has no events?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029085092-What-happens-with-metric-results-when-one-treatment-has-no-events <br /> ✘ images still hosted on help.split.io </button>
</p>

<h2 id="question" class="header-anchor">Question</h2>
<p>
  What happens on my metric cards when I don't have events coming in for one treatment?
  Will I get statistical significance? How should I view my metric card?
</p>
<h2 id="answer" class="header-anchor">Answer</h2>
<p>
  The system will test the difference between any mean values, even if one of them happens to be 0. As a result, you can still get statistically significant results, a card that turns red or green.
</p>
<p>
  In this scenario we use the absolute change instead of the relative change. If
  one treatment is 0 and the other treatment isn't 0, as long as there is a relevant
  sample size and the appropriate variance in the data, the stats calculations
  are not impacted.
</p>
<p>
  In this case, the table on the Details and Trends page will show the appropriate
  data for the treatments.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360030689551/Screen_Shot_2019-06-11_at_7.57.41_AM.png" alt="Screen_Shot_2019-06-11_at_7.57.41_AM.png" />
</p>
<p>
  In addition to seeing no events in the table for one of the treatments, the chart
  for Impact over time will be blank, reinforcing that we are using the absolute
  change.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360030722232/Screen_Shot_2019-06-11_at_7.57.02_AM.png" alt="Screen_Shot_2019-06-11_at_7.57.02_AM.png" />
</p>
<p>
  But if you select Values over time, then you will see the means metric value
  for all of the treatments. A treatment that has no events will have the metric
  value zero.
</p>