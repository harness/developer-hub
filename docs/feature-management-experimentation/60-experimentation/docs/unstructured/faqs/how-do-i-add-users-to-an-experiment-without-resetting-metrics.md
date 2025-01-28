---
title: How do I add users to an experiment without resetting metrics?
sidebar_label: How do I add users to an experiment without resetting metrics?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360061143571-How-do-I-add-users-to-an-experiment-without-resetting-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  Any change you make to a feature flag will cause metrics to reset, for a very
  good reason: you don't want to bias your experiment or pollute your metrics by
  making a change that's inconsistent with the experiment to date. If you are experimenting
  on users in the US and add users from South America after a couple of weeks the
  results may not be representative of a truly random population.
</p>
<p>
  That said, there are cases where you may want to add users to an experiment without
  resetting metrics.
</p>
<h2 id="h_01JENPT2MR87EKTZ9WMVW2768E">Adding users to a treatment</h2>
<p>
  In some cases, you may want to add specific users, such as QA team members or
  beta customers, to a treatment without impacting the experiment. This is generally
  accomplished by directly assigning the keys/IDs using a rule separate from those
  dividing the population on which you are experimenting. What happens if you want
  to give a new beta user access to a new feature during the test without resetting
  the metrics?
</p>
<p>
  The easiest way to do this is to create a rule separate from the rules randomly
  dividing traffic by percentage. Instead of adding individual user IDs to the
  rule, you can use a segment and add users to the segment. This does not directly
  change the feature flag, so metrics are not reset, and the metrics are calculated
  on a per rule basis. So, even if it's only a single user to start, you may want
  to use a segment so that you have the flexibility to add users in the future
  without resetting metrics.
</p>
<p></p>
<p>
  <img src="https://help.split.io/guide-media/01H17SW4SGER1AHPFPY2SME1AJ" alt="new-beta-user.png" />
</p>
<p></p>
<h2 id="h_01JENPT2MRQJFG590FY6WQTM89">Adding users to a test</h2>
<p>
  Perhaps you want to only allow a portion of your users into an experiment, maybe
  to reduce the risk of a new feature by exposing it to only a smaller set of your
  overall population. A simple way to do that is to use limit exposure. You
  can set the treatments to 50/50 but only send a percentage of the visitors to
  the rules, with everyone else going to the default treatment, as shown below.
  By increasing the exposure limit you add more users to the test.
</p>
<p>
  The Default treatment could be the same as <strong>off</strong>, or it could
  be a third treatment, and as you increase the exposure limit, you increase the
  number of people participating in an experiment.
</p>
<p>
   src="https://help.split.io/guide-media/01H17T0GYFTQ9023Z24CDDABME" alt="add-to-test.png">
</p>
<h3 id="h_01JENPT2MREFY6F8KPA9KM3NDC">Using dependencies</h3>
<p>
  However, with this approach each time you increase exposure limit you are changing
  the feature flag. That means the metrics will reset.
</p>
<p>
  In order to add traffic without resetting the metrics, you can use Dependencies.
  Dependent feature flags assign users based on rules in a parent. For example,
  you might have a feature flag called <em>traffic_control</em> as the parent,
  which has a simple rule that sets 10% of users to on and 90% to off
</p>
<p>
  Then, in your test feature flag, you could have a rule that feature flags the
  traffic using percentages, but only for the 10% of the users that qualify. This
  has the same effect as limit exposure, but the percentage of users participating
  in the test is controlled by the parent feature flag.
</p>
<p>
  In the above example, 10% of the users meet the criteria of being in the
  <em>on</em> treatment in the parent feature flag, and of those, 50% will get
  the new feature and 50% will not. As you increase the percentage in the
  on treatment in the parent feature flag, traffic_control, you will increase the
  number of users in your test without resetting the metrics.
</p>
<p>
  Remember, there are very good reasons why you want to reset metrics if you change
  the profile of your test, so you should consider if doing the above will bias
  your results in any way. But if the introduction of new traffic is purely
  random and from the same base population this may well be a technique worth investigating.
</p>