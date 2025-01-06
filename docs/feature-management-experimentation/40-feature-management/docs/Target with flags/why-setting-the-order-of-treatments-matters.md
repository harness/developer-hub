---
title: Why setting the order of treatments matters
sidebar_label: Why setting the order of treatments matters
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030117011-Why-setting-the-order-of-treatments-matters </button>
</p>

With Split, rules are evaluated from the top down. 

1. Individually target - users you explicitly assign to a treatment
2. Limit exposure - If set to less than 100%, the excluded users are given the default treatment you specify in the treatments list.
3. Targeting rules - specific subsets of users targeted by attributes
4. The final rule, which is labeled as "Serve" or "Distribute treatments as follows" in the UI - users not individually targeted and not targeted by a targeting rule. This is a "catch-all" which assigns treatments for the remaining population not previously excluded or targeted.

As with rules, the order of treatments matters.  For example, if you have 3 (or more) treatments you’ll want to think through order based on how you want things to change as you change percentages, particularly if you want to maintain a consistent user experience, as described [here](https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience).

Let's use changing the default rule as an example, with `status_quo`, `treatment1`, `treatment2` set to 33/33/34.  You want to move everyone out of 'status_quo' and set `treatment2` to 67%.

If you had your treatments in the above order (`status_quo`, `treatment1`, `treatment2`), setting `status_quo` to 0% and `treatment2` to 67% would cause the users from `status_quo` to move to `treatment1` and the users from `treatment1` to move to `treatment2`.  Clearly, this may not be the right experience for your users.

If, however, you have `status_quo` in the middle of the order (`treatment1`, `status_quo`, `treatment2`), then when you set `status_quo` to 0% and `treatment2` to 67% this does not impact the users in `treatment1`.  This would also be true if you set `treatment1` to 66% and `status_quo` to 0%.  The 34% originally assigned to `treatment2` would remain consistent.  See how this can apply to rolling out an experiment below.

Let's say you have more than three treatments.  In this case, the `status_quo` was the safe treatment, and if any of the treatments were found to have a bad experience the plan is to move those users to `status_quo`.  If we decide `treatment2` was bad and we try to give that 20% to `status_quo` by setting `treatment2` to zero and increasing `status_quo` to 40%, we will actually cause an undesired shift: users in `treatment1` would get `status_quo` as well since the first 40 buckets, which had been distributed between `status_quo` and `treatment1`, now all get `status_quo`. Buckets 40-59, which had been getting `treatment2` would then get `treatment1`. Users who were getting `treatment3` and `treatment4` are unaffected.

<table style={{width: '100%', height: '132px'}}>
  <thead>
    <tr style={{height: '22px'}}>
      <th style={{textAlign: 'center', height: '22px'}}>Even Distribution</th>
      <th style={{textAlign: 'center', height: '22px'}}>Buckets</th>
      <th style={{textAlign: 'center', height: '22px'}}>T2 to status_quo</th>
    </tr>
  </thead>
  <tbody>
    <tr style={{height: '22px'}}>
      <td style={{textAlign: 'center', height: '22px'}}>status_quo</td>
      <td style={{textAlign: 'center', height: '22px'}}>0-19</td>
      <td style={{textAlign: 'center', height: '44px'}} rowspan="2">status_quo</td>
    </tr>
    <tr style={{height: '22px'}}>
      <td style={{textAlign: 'center', height: '22px'}}>treatment1</td>
      <td style={{textAlign: 'center', height: '22px'}}>20-39</td>
    </tr>
    <tr style={{height: '22px'}}>
      <td style={{textAlign: 'center', height: '22px'}}>treatment2</td>
      <td style={{textAlign: 'center', height: '22px'}}>40-59</td>
      <td style={{textAlign: 'center', height: '22px'}}>treatment1</td>
    </tr>
    <tr style={{height: '22px'}}>
      <td style={{textAlign: 'center', height: '22px'}}>treatment3</td>
      <td style={{textAlign: 'center', height: '22px'}}>60-79</td>
      <td style={{textAlign: 'center', height: '22px'}}>treatment3</td>
    </tr>
    <tr style={{height: '22px'}}>
      <td style={{textAlign: 'center', height: '22px'}}>treatment4</td>
      <td style={{textAlign: 'center', height: '22px'}}>80-99</td>
      <td style={{textAlign: 'center', height: '22px'}}>treatment4</td>
    </tr>
  </tbody>
</table>

One way to 'move' users between multivariate treatments while only removing users from `treatment2` is to take advantage of Dynamic Configuration, assuming you can represent the differences between treatments using a set of configured values.  In this case, you'd set the configuration of `treatment2` to the `status_quo` settings, which would give them the `status_quo` experience.

| Even Distribution |	Buckets |	Dynamic Config |
| status_quo | 0-19 | status_quo |
| treatment1 | 20-39 | treatment1 |
| treatment2 | 40-59 | status_quo |
| treatment3 | 60-79 | treatment3 |
| treatment4 | 80-99 | treatment4 |
 

## Limiting traffic

Limit exposure allows you to exclude a percentage of users from your rules. For example, you can set exposure to 20% and then set the "Distribute treatments as follows" setting to 0/50/50 for `status_quo`, `treatment1`, and `treatment2`.  Effectively, each of the two 50/50 treatments gets 10% of traffic.  The advantage of this approach is that as you add traffic to the rules by increasing the limit exposure setting, no users switch from, in our example, `treatment1` to `treatment2`.  They move from `status_quo` (set as the default treatment) to one of the two treatments.

This is also useful if you have a number of complex rules and you want to increase the participation across all the rules at once. 

## Including traffic for experimentation

But what if you want to see all of the impressions on the Metrics impact tab? Even if you're not going to include the unallocated `status_quo` users in the analysis. Again, order matters if you want to make sure adding traffic doesn't move users that are in the experiment between treatments.  In this case, you'd order the excluded users to be between the two treatments.

As you roll-out more users, by decreasing the percentage in `status_quo` and increasing each of the other treatments, existing users in those two treatments will remain in the same treatment they were in previously.

## Individually target

Individually targeted evaluations are done in the order of the treatments. Consider a situation where user 12345 is individually targeted for `status_quo`. Even if user 12345 is in the beta-users or Employee segments individually targeted for `treatment1`, they will still get `status_quo`, because that's evaluated first.