---
title: "Upgrading from 4.x to 5.x and above"
sidebar_label: "Upgrading from 4.x to 5.x and above"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360021480912-Ruby-SDK-Upgrading-from-4-x-to-5-x-and-above </button>
</p>

## Issue

Under the hood, Split SDK has a hashing algorithm that divides users across treatments. For example, given a 50/50 split between two treatments (e.g., on and off), the hashing algorithm decides which user is in the on treatment and which one is in the off treatment.

Split has used two hashing algorithms:
* Legacy Hash (or Algorithm 1). This is simple implementation that is optimized for speed, but suffers from uneven distributions when you have < 100 users.
* Murmur Hash (or Algorithm 2). This is an industry standard implementation that is both fast and gives even distribution whether evaluating 10, 100, or a 1M users.

Ruby SDK versions 4.x and below, had an issue which resulted in any feature flag that was meant to use the Murmur hash would instead use the Legacy hash. This leads to the following problem: If you are using SDKs from multiple languages, Ruby would not be consistent with other languages.

Version 5.0.0 and above of the Ruby SDK fixes the issue. However, as noted above, as you upgrade the Ruby SDK, you need to account for any active feature flags.

For any feature flags that were in the process of ramp (meaning some users are being shown one treatment and others are being shown the other treatment), once you upgrade the SDK, the hashing algorithm will change, which means the users may shift from one treatment to another.

## Recommendation

In a perfect situation, the new SDK Ruby is applied when all experiments are in 100% distribution, if this is not possible, the recommendation is to create a new version for such current running feature flags to reset the metrics calculation, potentially this will give existing users different treatments, however, they will not be excluded from metric calculation since no treatments changes are recorded within the same version.