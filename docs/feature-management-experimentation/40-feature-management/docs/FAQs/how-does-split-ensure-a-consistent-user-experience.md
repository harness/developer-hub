---
title: How does Split ensure a consistent user experience?
sidebar_label: How does Split ensure a consistent user experience?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience </button>
</p>

## Random and Deterministic

Split SDKs use a deterministic hashing algorithm to decide what experience (treatment) to deliver for a feature flag. The algorithm takes two inputs:

* The id. The id can be an anonymous user id, a logged in user id, an account number or any other entity representable as a string. The type of the id is indicated by its [traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type). 
* The feature flag. When the SDK initializes, it downloads targeting plans for all flags. The seed, which is a random number for each feature flag, is cached as part of the rollout plan, and is consistent for every SDK that evaluates that flag.

For example, user_1234 hits a getTreatment and the flag has the seed 123456.  These are combined and run through a deterministic hashing algorithm, which is consistent every time.  That hash value is converted into a number, which is then normalized using Mod 100 and put into one of 100 buckets.  The result is the user is put into the same bucket every time, for that feature flag, independent of which SDK calls the flag.  One way to think of it is the bucket is what’s assigned a treatment, not the user.

As long as the user has the same ID, they get the same hash value, the seed will be the same, and the resulting Mod 100 value and bucket are consistent. If a feature is exposed to 10% of the users and the bucket for a hashed value is 26, that user is not assigned the feature. If the exposure rises to 30%, then the user gets the feature.

Split doesn't know anything about user ahead of time. The evaluation described above happens every time for every user and the user is put in the same bucket. The seed for a feature flag is unique to the flag and the environment. If a customer has a staging and a production environment, the seed will have a unique value for each. 

## Limit exposure

Limit exposure can play a role in this bucketing as well.  All users are bucketed first based on whether or not they are participating in the targeting rules.  Users are first bucketed by limit exposure and then bucketed by the rules. 

If you set your exposure to 50/50 then users put in buckets 0-49 will be subject to the targeting rules and the default rule, at which time they will be bucketed again.  Users in buckets 50-99 will be given the default treatment, which is the experience you give to users that you don't want to include in the new feature or experiment.

## Order of Treatment

The order in which you set your treatments can also have an impact on ensuring a consistent experience.  This is described in more detail [here](https://help.split.io/hc/en-us/articles/360030117011-Why-setting-the-order-of-treatments-matters).

## Traffic Type

As noted above, you can set the granularity of your targets using traffic type.  You can target users using a UUID, usually something that is created by them logging into your site.  If the user is anonymous, you can use a cookie or session ID or device ID.  But in that case you have a chance that the same user may not come back using the same browser or device, in which case it's impossible to make sure they get the same experience.  For more on anonymous users you can watch [this video](https://help.split.io/hc/en-us/articles/360029915971-Consistent-experience-from-anonymous-to-logged-In).

If you want [everyone in an account to get the same experience](https://help.split.io/hc/en-us/articles/360029718252-Best-practices-when-targeting-an-account-or-organization) you can use an account ID.  In that case, if you do 50/50 distribution keep in mind that because the accounts will be randomly distributed it's possible that more big accounts (with lots of individual users) will fall into one side of that 50/50 feature flag.  For experimentation purposes that means the actual end user count could be much higher than 50% on that side.