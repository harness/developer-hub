---
title: Interpreting inconclusive results
sidebar_label: Interpreting inconclusive results
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360037814751-Interpreting-inconclusive-results <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  <span>Inconclusive metrics for a feature flag that do not reach statistical significance, can be confusing and disappointing. It means the data does not support your original hypothesis for that metric (unless you were running a ‘do-no-harm’ test) and there is not enough evidence to conclude that the treatment had any an actual impact.</span>
</p>
<p>
  <span>However, you should not be disheartened by inconclusive metrics. For one thing, they are very common; successful tech giants such as Google and Bing report that only about 10% to 20% of their experiments generate positive results</span><a href="https://hbr.org/2017/09/the-surprising-power-of-online-experiments"><span>[1]</span></a><span>. They are also very valuable; while not having your hypothesis validated might feel disappointing, this actually is one of the main ways experimentation can bring value. Getting an inconclusive result can keep you from spending time and resources developing features that are not bringing the value you thought they would.</span>
</p>
<h2 id="h_01JEN2M1FFDFKTVHX2B4T948DG">
  <span>Interpreting inconclusive metrics</span>
</h2>
<p>
  <span>A metric is inconclusive when, based on a statistical analysis, the system cannot confidently indicate whether it had a desired or undesired impact. Alongside the measured difference between the treatments, we show the confidence interval around this measured value via the ‘impact lies between’ text on the metric cards. When a metric is inconclusive, the confidence interval will include 0% impact since we have not been able to rule out the possibility that the treatment has no or negative impact on your metric.</span>
</p>
<p>
  <span>One of the first things to look out for when interpreting statistically inconclusive metrics is the ‘power’ of the metric. Not reaching statistical significance does </span><strong>not</strong><span> mean that your treatment had no impact -- it means that there wasn’t enough evidence to say that there </span><em><span>was</span></em><span> an impact. This is a subtle but important difference.</span>
</p>
<p>
  <span>Each metric for a given test will only have enough power to detect impacts greater than a given size -- this is the metric’s minimum likely detectable effect (MLDE). Getting an inconclusive result means it is unlikely that your test had an impact greater than this MLDE, in either direction, but there could be an impact smaller than this value that the test was not able to detect given the current number of experimental units. The current MLDE can be displayed by hovering over the question mark on your inconclusive metric card.</span>
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0G0FAWQ6N4Q7Y0F9SAX6S0N" alt="Screenshot_2023-05-15_at_12.28.00.png" width="299" />
</p>
<p>
  <img src="https://help.split.io/guide-media/01H0G0FAT5ZF7F1ZAW7AMN6Z7F" alt="Screenshot_2023-05-15_at_12.28.12.png" width="438" />
</p>
<p>
  <span>For example in the image above, the hover text indicates that your treatment didn’t impact the number of bookings per user by more than a relative change of 3.76%, but that there may be an impact smaller than that value.</span>
</p>
<p>
  <span>To reduce the MLDE so that it is possible to discover potential impacts smaller than this, you need a larger sample size. This may mean running the experiment for a longer period of time or with a different percentage rollout. You can use the sample size and sensitivity calculators on </span><a href="https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators#h_ac56f9d9-2f8a-4967-a350-5730fe8e87b9"><span>this page</span></a><span> to help understand how long you would need to run an experiment to get the required sensitivity.</span>
</p>
<h2 id="h_01JEN2M1FF5T2ZF5PZ4V091HXB">
  <span>Learning from inconclusive results</span>
</h2>
<p>
  <span>Inconclusive tests can still provide valuable learning opportunities. It is worth looking in to the results to see if certain segments responded differently to your treatment. While this may not provide enough evidence by itself to draw strong conclusions, it can provide insights and ideas for additional iterations or further testing.</span>
</p>
<p>
  <span>For example, you may see that although there was no significant impact across all users, there was a notable impact in the desired direction for a subset of your users, such as premium users or users from a particular geographic location. This might suggest it's worthwhile to repeat the test specifically targeting that set of users.</span>
</p>
<p>
  Inconclusive results may also indicate that some of your assumptions about your
  users are invalid, for example what they want or what they find useful. It may
  also suggest that problems, or pain points, are not what you thought they were.
  These are all valuable lessons that inform future hypotheses and tests.
</p>
<h2 id="h_01JEN2M1FFTH1NPZ8MBFRTD7PH">
  <span>Next steps</span>
</h2>
<p>
  When the metrics do not clearly indicate which treatment performed better, it
  is often best to keep the current, default state, the control treatment. If there
  is no reason to believe making a change will bring any benefit, then sticking
  with the current state will avoid unnecessary changes to the user experience.
</p>
<p>
  However if you have your own reasons to favor one treatment over the other, perhaps
  it is cheaper or easier to maintain, then an inconclusive result can give you
  confidence that making that change will not disadvantage your users and you can
  safely go with your preference.
</p>
<p>
  Finally, if you are seeing inconclusive results too often, it may be a sign that
  you should test bigger, bolder changes. Subtle changes often have subtle impacts,
  which require higher levels of traffic to be detectable. Sometimes you need to
  go big; making more dramatic and visible changes to your product will be more
  likely to produce significant results and controlled experimentation provides
  a way to safely test your big ideas.
</p>