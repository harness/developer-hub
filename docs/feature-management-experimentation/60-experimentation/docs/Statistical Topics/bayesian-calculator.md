---
title: Bayesian calculator
sidebar_label: Bayesian calculator
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044412352-Bayesian-calculator </button>
</p>

<div>
  <div>
    Bayesian and Frequentist statistics are two different frameworks that can
    be used to analyse your experimental results. Their results differ, in part,
    because they ask different questions of the data and provide different guarantees.
  </div>
  <div>&nbsp;</div>
  <div>
    Frequentist statistics provide strong error controls, and give a more binary
    answer (statistically significant vs inconclusive). The Frequentist approach
    asks whether the data provides enough evidence to reject the null hypothesis,
    and to conclude that there is <em>some</em> difference between the conversion
    rates of the two treatments.
  </div>
  <div>&nbsp;</div>
  <div>
    The Bayesian approach, rather than having a strict threshold, asks which
    of the potential values for the impact are most&nbsp;<em>likely</em>. It
    can suggest the probability that there is a true difference of a given size
    even if that probability is not as high as our desired confidence threshold.
  </div>
  <div>&nbsp;</div>
  <div>
    When testing larger changes, such as a new feature or algorithm, there is
    often a cost to incorrectly thinking you are having an impact. This may be
    technical or product debt, or the costs of basing decisions on how to invest
    future resources and effort on misleading information. To help reduce these
    risks we apply the Frequentist methods at Split, as reaching statistical
    significance provides strong confidence that your treatment really did change
    user behavior.
  </div>
  <div>&nbsp;</div>
  <div>
    However in cases where it is not feasible to reach statistical significance
    in the Frequentist framework, using the Bayesian probabilities may aid in
    a decision. If there is little cost to making a change, you may want to go
    with the most likely winner despite not having full confidence; however it
    is risky to draw inferences and plan out further work and iterations in this
    situation.
  </div>
  <div>&nbsp;</div>
  <div>
    You can use the calculator below to see what the results of a Bayesian analysis
    would look like for percent unique metrics, just enter the sample size (number
    of visitors) and the number of those who completed the event (number of conversions)
    for each group.&nbsp;
  </div>
</div>
<p>&nbsp;</p>
<p>
  <iframe style={{width: '1400px', height: '1000px', border: 0, borderRadius: '4px', overflow: 'hidden'}} src="https://split-bp-calc.herokuapp.com/" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</p>