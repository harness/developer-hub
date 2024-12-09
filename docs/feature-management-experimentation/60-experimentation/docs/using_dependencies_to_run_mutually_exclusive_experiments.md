---
title: Using dependencies to run mutually exclusive experiments
sidebar_label: Using dependencies to run mutually exclusive experiments
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038843991-Using-dependencies-to-run-mutually-exclusive-experiments </button>
</p>

<p>
  Mutually exclusive experiments are experiments that share no user traffic. The
  goal of mutually excluding experiments is to ensure that a single user cannot
  participate in more than one experiment at the same time. Mutually exclusive
  experiments run simultaneously but in isolation from each other.
</p>
<p>
  Generally speaking, when you run experiments with feature flags, you are testing
  feature variations (Split feature flag treatments) against a baseline. The baseline
  is your set of metric results for your base case (when a new feature is off).
  You typically compare the results of each feature variation (treatment)
  against your base case metrics (baseline) to see how the treatment performs.
</p>
<p>
  While, in most cases, experiments can run concurrently and share user traffic without interfering with one another, you may choose to run some of your experiments in mutual exclusion. This may be because you anticipate interactions between variations (treatments) of different experiments, or because a variation (treatment) of one experiment would disrupt a consistent baseline for another experiment. Mutually excluding the experiments keeps your baseline and feature experiences consistent (free of the variations of another experiment), which may in some cases lead to more accurate results.
</p>
<p>
  Compared with experiments that share user traffic, mutually excluding experiments has the following advantage and disadvantage:
</p>
<p>Pro:</p>
<ul>
  <li>
    Zero possibility of mutually exclusive experiments interfering with one another.
  </li>
</ul>
<p>Con:</p>
<ul>
  <li>
    More time is required to reach sufficient traffic volumes for mutually exclusive experiments to produce reliable statistical results.
  </li>
</ul>
<p>
  Split’s experimentation advisors are prepared to assist our customers in setting
  effective concurrent and progressive experimentation strategies.
  <a href="mailto:support@split.io">Contact us</a>
  to discuss your options and create an effective experimentation plan.
</p>
# Creating mutually exclusive experiments
<p>
  In this guide, we will divide our user traffic to create mutually exclusive
  experiments. A parent feature flag divides the user traffic. The experiments
  are controlled and measured using dependent feature flags.
</p>
## Setting up the parent feature flag
<p>
  We create a parent feature flag named <em>pdp_test_parent</em> with four treatments, one for each of the experiments, as well as a <em>not-in-experiments</em> treatment. In this example, we use a percentage-based targeting rule to divide traffic, but you could also use attribute based targeting rules.
</p>
<p>
  To create the parent feature flag:
</p>
<ol>
  <li>
    In the Split UI, on the left navigation panel click <strong>Feature flags</strong>.
  </li>
  <li>
    Click the <strong>Create feature flag</strong> button.
  </li>
  <li>
    Enter a name for the flag, such as <em>pdp_test_parent</em>.
  </li>
  <li>
    Select a traffic type and owners for the flag, and click <strong>Create</strong>.
  </li>
  <li>
    Select a Split Environment and click the <strong>Initiate Environment</strong> button.
  </li>
  <li>
    In the Treatments section, create four treatments:
    <ul>
      <li>
        <em>pdp-test-a</em>
      </li>
      <li>
        <em>pdp-test-b</em>
      </li>
      <li>
        <em>pdp-test-c</em>
      </li>
      <li>
        <em>not-in-experiments</em>
      </li>
    </ul>
  </li>
  <li>
    Set the default treatment to be <em>not-in-experiments</em>.
  </li>
</ol>
<p class="wysiwyg-indent1">
  <img src="https://help.split.io/guide-media/01HVHQB7ZZV6GKWPPX7F0389VK" width="1000" />
</p>
<ol start="8">
  <li>
    In the Targeting section, in Targeting rules, select <strong>Distribute treatments as follows</strong>. Allocate the following user traffic percentages:
    <ul>
      <li>
        <em>pdp-test-a</em> - 33%
      </li>
      <li>
        <em>pdp-test-b</em> - 33%
      </li>
      <li>
        <em>pdp-test-c</em> - 34%
      </li>
      <li>
        <em>not-in-experiments</em> - 0%
      </li>
    </ul>
  </li>
</ol>
<p>
  <img src="https://help.split.io/guide-media/01HVHR7QMDENH45P6HNH8P7SFV" width="1000" />
</p>
<ol start="9">
  <li>
    Set the
    <strong>Alert baseline treatment</strong> to be <em>not-in-experiments</em>.
  </li>
  <li>
    You may want to restrict who can edit this feature flag’s targeting rules in the selected Environment. To do this click the <strong>Editing</strong> button on the Details tab, select <strong>Restrict who can edit</strong>, add or remove an editor, and click <strong>Apply</strong>.
  </li>
</ol>
<p>
  <strong><em>Note:</em></strong> If the <em>pdp_test_parent</em> feature flag is killed, then the default <em>not-in-experiments</em> treatment will be assigned to all user traffic. (No user traffic will reach the dependent flags.)
</p>
<p>
  <strong><em>When you are evaluating feature flags in your source code</em></strong>, you should not have any code toggling on the parent feature flag evaluation (i.e. your code should not call `getTreatment` for <em>pdp_test_parent</em> nor conditionally execute code based on this flag’s treatment results). The parent feature flag exists solely for use in the targeting rules of the dependent feature flags.
</p>
<h2 id="h_01HVHQB3VDA9K5TP9QZX21CECH">Setting up dependent flags</h2>
<p>
  After the parent feature flag is created to divide user traffic, we can create dependent (child) feature flags to receive user traffic. The user traffic of each dependent feature flag will not be shared with another dependent feature flag. This means that dependent feature flags are mutually exclusive.
</p>
<p>
  To create a dependent (child) feature flag:
</p>
<ol>
  <li>
    In the Split UI, on the left navigation panel click <strong>Feature flags</strong>.
  </li>
  <li>
    Click the <strong>Create feature flag</strong> button.
  </li>
  <li>
    Enter a name for the flag, such as <em>pdp-test-a</em>.
  </li>
  <li>
    Select the <strong><em>same traffic type</em></strong> as you did for the <em>php-test-parent</em> flag, select owners, and click <strong>Create</strong>.
  </li>
  <li>
    Select the <strong><em>same Environment</em></strong> as you did for the <em>php-test-parent</em> flag and click the <strong>Initiate Environment</strong> button.
  </li>
  <li>
    In the Treatments section, create two treatments:
    <ol>
      <li>
        <em>on</em>
      </li>
      <li>
        <em>off</em>
      </li>
    </ol>
  </li>
  <li>
    Set the default treatment to be <em>off</em>.
  </li>
  <li>
    In the Targeting section, in Targeting rules, click the <strong>Add attribute based targeting rules</strong> button.
  </li>
  <li>
    Select ‘is in flag’ in the matcher dropdown, select <em>pdp_test_parent</em> from the attributes dropdown, and select <em>pdp-test-a</em> from the values dropdown.
  </li>
  <li>
    Select
    <strong>Distribute treatments as follows</strong> and allocate user traffic percentages to this dependent flag’s treatments. For fastest experimental results, you can set <em>on</em> to 50% and <em>off</em> to 50% (or you may enter a smaller percentage for <em>on</em>, to begin a gradual rollout of the <em>php-test-a</em> feature).
  </li>
</ol>
<p>
  <img src="https://help.split.io/guide-media/01H0JY5M58YBE0HPJK0PCZ51T1" alt="Screenshot_2023-05-16_at_15.46.34.png" width="1000" />
</p>
<ol start="11">
  <li>
    Set the <strong>Alert baseline treatment</strong> to be <em>off</em>.
  </li>
  <li>
    Repeat steps 1-11 to create two more dependent feature flags: <em>pdp-test-b</em> and <em>pdp-test-c</em>.
  </li>
</ol>
<p>
  <strong><em>In your source code</em></strong>, you should directly evaluate these dependent feature flags. Your source code should be agnostic to the parent feature flag (that has the sole purpose of dividing traffic among the dependent flags). For a React code example, see this <a href="https://www.split.io/blog/a-step-by-step-guide-to-running-mutually-exclusive-experiments-in-react/">blog</a>.
</p>
<p>
  For more information about dependent feature flags, see the <a href="https://help.split.io/hc/en-us/articles/360020527652-Target-with-dependencies">Target with dependencies</a> help page.
</p>
<h2 id="h_01HVHQHXJSH5T6830C6EWV4WF1">Viewing mutually exclusive experiment results</h2>
<p>
  Once your experiments have been running for a sufficient duration, you can view the results of each mutually exclusive experiment on the <a href="https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab">Metrics impact</a> tab of each dependent (child) feature flag. The metric results you see when comparing any two treatments of a child flag are generated by user populations that are mutually exclusive. You can be sure that the experimental results are free of the influence of the other experiments because no user was exposed to more than one treatment of any of the mutually exclusive experiments.
</p>
<h1 id="h_01HVHQHXJS4971XC9A5H4GQK6M">Considerations and limitations</h1>
<p>
  Mutually exclusive experiments carry some inherent limitations. You should be aware of the following limitations and considerations when using a parent feature flag to create mutually exclusive experiments by dividing traffic among child flags.
</p>
<h2 id="h_01HVHQHXJSZXAD1MY50VA8BAJJ">Ending an experiment and reallocating users</h2>
<p>
  The Split feature flag (parent flag) that divides traffic between mutually exclusive experiments uses a random and deterministic hashing algorithm to allocate traffic. Suppose you want to end one of the concurrent mutually exclusive experiments and reallocate the users to the other experiments (and you are sure this will not invalidate your results). To learn how your traffic would be reallocated, see <a href="https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience">How does Split ensure a consistent user experience?</a> You may also consider using <a href="https://help.split.io/hc/en-us/articles/360026943552-Dynamic-configuration">dynamic configuration</a> in your flag definitions if you anticipate ending a mutually exclusive experiment early.
</p>
<p>
  <strong><em>Note: </em></strong>We generally do not recommend re-using the divisions created by the parent feature flag for new experiments, because you would be experimenting with the subset of your user population that was exposed to an earlier experiment. This subset may not be representative of your entire user population.
</p>
<h2 id="h_01HVHQHXJSD6AA361VK5QYKWCC">Scaling limitations for multiple mutual experiments</h2>
<p>
  When you opt to make some of your experiments mutually exclusive, you channel
  a large portion of user traffic away from each of these experiments. As a result
  of decreased user traffic, you lose statistical power. To compensate, you may
  need to extend the duration of your experiments to reach statistical significance
  and/or reach your target level of confidence.
  Since mutually exclusive experiments scale poorly, we recommend you use mutually exclusive experiments only when you clearly have interference between experiments.
</p>