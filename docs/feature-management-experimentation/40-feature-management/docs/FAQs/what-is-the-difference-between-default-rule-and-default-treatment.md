---
title: What is the difference between Default Rule and Default Treatment?
sidebar_label: What is the difference between Default Rule and Default Treatment?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360046839932-What-is-the-difference-between-Default-Rule-and-Default-Treatment <br /> ✘ images still hosted on help.split.io </button>
</p>

## Question

Given the following scenario: A feature flag with a simple on and off feature flag. if I allocate 10% of my traffic through the traffic allocation feature, then I assume that only 10% of people will be presented with this feature flag, however, how does the 'set the default rule' and 'set the default treatment' options come into play?

## Answer

When calculating the treatment by calling the SDK's getTreatment you are calling it for 100% of the people who hit the feature flag.  You need to make sure that everyone gets some sort of treatment, whether OFF or ON or something else.  

Limit traffic limits the number of users who participate in the targeting rules and the default rule.  In other words, if you set Traffic Allocation to 10% then 10% of the users will be subject to the Rules you set up.  The remaining 90% will get the default treatment.

If you have a two versions of a new feature and you want to expose either to only 10% of you population you might create three treatments: version1, version2, unallocated, where unallocated doesn't expose them to any version of the new feature.  You could then set the Traffic Allocation to 10% and then maybe set the Default Rule to 50/50 for version1/version2.  You'd set the Default Treatment to unallocated.


Traffic Allocation is useful for moving users from an unallocated state into rules when doing experimentation and/or when you have more than just two treatments.  If only two treatments, it's also useful if you have a lot of rules and you want to increase participation across all rules in a consistent fashion.  It's also useful in excluding users from the metrics calculated if you're using Split for experimentation.  In cases where you have just two treatments and you are rolling out to a percentage, traffic allocation doesn't really buy you anything.

For example, the following examples have the same result in terms of traffic distribution. 

In one, 90% of the users are getting Off as a result of the default rule and NO users are going to the default treatment.

In the next one, 90% of the users are getting OFF as a result of going to the default treatment.