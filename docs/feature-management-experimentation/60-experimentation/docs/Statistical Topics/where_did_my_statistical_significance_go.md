---
title: Where did my statistical significance go?
sidebar_label: Where did my statistical significance go?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360040999531-Where-did-my-statistical-significance-go </button>
</p>

<h2 id="h_01JENNVCX7EG1K5TJ0DN42EFBP">Background</h2>
<p>
  One common question we get from experimentation customers is: My metric showed
  statistical significance yesterday and now it doesn't. How can that be?
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0GKR7K89VVWY3XA4NEZCW40" alt="metrics-question.png" width="611" height="110" />
</p>
<p>
  When you use fixed horizon to calculate your metrics, it is possible that your metrics change from conclusive to inconclusive. You
  were so excited on Tuesday to see that your metric had a statistically significant
  uplift of almost 75% only to have your hopes dashed on Wednesday when the latest
  recalculation of that metric showed a statistically inconclusive and smaller
  increase over the baseline.
</p>
<p>
  A metric in Split is classified as statistically significant if the calculated
  p-value is less than or equal to the statistical significance setting for your
  organization (defaults to 0.05).&nbsp;
</p>
<h2 id="h_01JENNVCX72WJ59029STB2TTCZ">New Data = New Information</h2>
<p>
  That said, a metric shifts from being statistically significant to being inconclusive
  because data that came in during the intervening period added to the total picture
  such that the calculations comparing the treatment to the baseline shifted to
  being inconclusive (p-value &gt; 0.05). It may be because of seasonality (users
  behave differently on Wednesdays than they do on Tuesdays) or it may simply be
  because the effect of the new treatment was not influential enough to change
  the behavior of a batch of new users in the same way as the previous users. Finally,
  it's possible that the first calculation was a false positive and that additional
  data representative of the true effect of the treatment corrected that mistake.
</p>
<p>
  One thing to note about the above example is that the confidence interval for
  the metric when statistically significant is rather wide (+4.20% to +144.42%)
  which suggests, that although a significant p-value was calculated, the data
  is still somewhat noisy and uncertain.
</p>
<h2 id="h_01JENNVCX7WJ3NHP7V5F9J9G0A">Bottom Line: No Peeking!</h2>
<p>
  The possibility of early noisy data and false positives is a key reason it is
  important to decide how long your experiment runs prior to starting it and to
  not pick a winner sooner than that based on a metric reaching significance. In
  addition to multiple decision points increasing the chance of seeing a false
  positive, more data gives you more confidence in the durability of the effect
  you are seeing. Before starting your experiment, use the
  <a href="https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators" target="_self">Sample size and sensitivity calculators</a>
  to see how many users have to encounter your experiment in order to see a meaningful
  swing in metrics. These calculators also take into account your seasonality cycle
  (typically seven days = one week), so that your experiment's duration sees an
  equal number of phases from the cycle.
</p>
<h2 id="h_01JENNVCX7NYJ08HJWME16SJ25">
  Sequential Testing
</h2>
<p>
  If you are using the sequential testing method, you can peek at your results. Also, with these types of tests, your results are always valid, and they won't change once they reach significance ( unless there is strong seasonality). Once you set this feature to <em>on</em>, you can check your results as many times as you want as soon as you start your measurements.
</p>