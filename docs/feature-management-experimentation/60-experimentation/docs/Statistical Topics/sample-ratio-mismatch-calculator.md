---
title: Sample ratio mismatch calculator
sidebar_label: Sample ratio mismatch calculator
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044715132-Sample-ratio-mismatch-calculator </button>
</p>

<p>
  When using a percentage based rollout, there will always be some randomness in
  how many visitors are assigned to each of your treatments. For example, when
  running an experiment with a 50% : 50% rollout, you are unlikely to see
  <em>exactly</em> 50% of visitors assigned to each treatment. However you should
  see close to that number, and if you see something very different, this may indicate
  what is called a Sample Ratio Mismatch (SRM).&nbsp;
</p>
<div>&nbsp;</div>
<p>
  We automatically check for a statistically significant deviation from the expected
  sample sizes for every feature flag with a percentage based rollout. Learn more
  about sample ratio mismatches, potential causes and how we check for them
  <a href="/hc/en-us/articles/360020636472" target="_self">here</a>.&nbsp;
</p>
<div>&nbsp;</div>
<p>
  The size of a deviation which should be cause for concern depends on the total
  sample size. Smaller samples are inherently noisier, and more subject to deviations
  from the expected ratios of samples in each treatment, whereas larger samples
  tend to more closely match expected ratios. The calculator below can be used
  to help visualize the range of likely sample sizes when there are no underlying
  issues, and allow you to manually calculate a p-value for your sample size ratios.
</p>
<p>&nbsp;</p>
<p>
  <iframe style={{width: '1400px', height: '1000px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://split-srm-calc.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>