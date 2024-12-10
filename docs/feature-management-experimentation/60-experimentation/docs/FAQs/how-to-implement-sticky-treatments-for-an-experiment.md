---
title: How to implement sticky treatments for an experiment?
sidebar_label: How to implement sticky treatments for an experiment?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360051389331-How-to-implement-sticky-treatments-for-an-experiment </button>
</p>

<h2 id="h_01JENPSA4T0KQX92J4WFHKGQAM">The challenge</h2>
<p>
  How do I ensure that once a treatment is assigned to a particular key (user id), that the same treatment will be assigned to that key in the future, regardless of any changes to the rollout plan or to the values of attributes associated with the user id?
</p>
<p>
  Because each instance of the SDK is an independent targeting engine with no local record of the treatment previously assigned to a key, to achieve this goal it is necessary to somehow maintain state, so that a user is always assigned the same treatment they saw the first time they visited, even if a change to the rollout plan would flip the user to another treatment, or if the value of an attribute associated with a user changed such that they switched to a different targeting rule. One example of when it would be desirable to maintain consistency is a feature flag that controls the value associated with an offer of some sort, such as the interest rate for a loan or a promotional discount on a product.
</p>
<h2 id="h_01JENPSA4T8YX8Y0YKWNNBBTPM">Split's targeting engine</h2>
<p>
  Split computes treatments very quickly. In Java, for instance, treatments are computed on the order of a few hundred microseconds. This means Split can be used in the most performance-intensive components of your application.
</p>
<p>
  To achieve this speed, Split by design, does not retain state. Specifically, after Split assigns a treatment to a user, it does not remember what was assigned. Given the scale of our customers' use cases, retaining a history of every treatment assigned to every key would negatively impact the requirements for speed and size efficiency in our SDKs.
</p>
<p>
  For feature flags that use traffic allocation or percentage rollouts, Split uses a deterministic hashing algorithm to ensure that we give end users a consistent experience where they do not change treatments. As long as a feature flag's targeting rules and the values passed for the attributes used in those rules do not change, the user gets the exact same treatment every single time.
</p>
<p>
  Of course, if you change the feature flag's targeting rules, some users may be moved from one treatment to another. This could happen if they fall under a different rule or if the percentages in a rule are changed. That is the intent for an overwhelming number of use cases but is not ideal in some scenarios.
</p>
<p>
  More information on how Split's deterministic hashing and its targeting engine work can be found<a href="https://help.split.io/hc/en-us/articles/360043397251-Split-and-Consistent-Assignment-of-Treatments"> here</a> and<a href="https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience-"> here</a>.
</p>
<h2 id="h_01JENPSA4TN0EXTJ4N3EWQZK0N">
  Experiment implications
</h2>
<p>
  This solution will maintain the assignment of a treatment to a particular id across changes in a feature flag's rollout plan, but those changes will create a new version of the flag and reset the metrics. Because the solution caches the original treatment rather than call getTreatment for subsequent visits, a sticky user's behavior will not be counted in the metrics of the new version. However as long as the definition of the feature flag does not change, caching the original treatment for a visitor based on attributes whose values subsequently change will attribute that user's subsequent behaviors to whatever rule and treatment applied on the original call to getTreatment.
</p>
<h2 id="h_01JENPSA4TVDJ0J4D21CHDR1NN">The solution</h2>
<h3 id="h_01JENPSA4T18505N0EMQGC4YKT">
  Saving state
</h3>
<p>
  The core functionality necessary to make treatments sticky regardless of changes to a feature flag's rules is the ability to store state; in this case the treatment returned by the first call to getTreatment to a flag for a particular user id and set of attributes. How you store this state is up to you; feasible approaches depend on where you are calling getTreatment, the traffic type of the feature flag, and whether or not you are interested in sticky treatments to deal with the case of a known user’s attribute values changing over the lifetime of a flag.
</p>
<p>
  The latter situation is the simplest. If you are passing attribute values for a given id (key) to pass to getTreatment, you must have some system in which you are associating attributes with that known user id. In this case, store the original treatment for the id in that same system.
</p>
<p>
  If the getTreatment call is server side, then conceivably you have some sort of caching server, like Redis available where you can maintain an association between the id and the original treatment for the feature flag returned from getTreatment.
</p>
<p>
  Anonymous traffic type feature flags on the client side have the most potential problems, particularly for browsers. You can cache the original treatment in a cookie or in local storage, but there is no guarantee that the user of the browser won’t clear that cookie or local storage value. Of course you typically have that same issue with the id you are passing to getTreatment for an anonymous traffic type feature flag, so it’s problematic, but not disastrous.
</p>
<p>
  Because the problem domain here is extensive, aside from the few general suggestions given above, this article assumes that you have come up with a scheme for storing state that works for your particular situation.
</p>
<h3 id="h_01JENPSA4TYFJ3YC7P8MRFCPFB">
  Logic
</h3>
<p>
  So once you have a plan for storing state associated with a user id, how do you structure the code around the getTreatment call for the feature flag where the initially assigned treatment should remain sticky?
</p>

```
/* Check for stored state for this feature flag for the given key */
existingTreatment = getStoredTreatment(key, featureFlagName);

/* If we have a cached treatment, use that */
if (existingTreatment != null) {
  treatment = existingTreatment;
} else { /* Otherwise, call getTreatment and cache the result */
  treatment = getTreatment(key, featureFlagName, attributes);
  putStoredTreatment(key, featureFlagName, treatment);
}
```

<p>
  This pseudo code assumes that the variables key, featureFlagName, and attributes have been initialized with the appropriate values. The server-side SDK variant of the getTreatment call is used here. For a client-side SDK you will have specified the key at initialization time.
</p>

###  A refinement

<p>
  A problem with this scheme to make the treatment sticky is that it does exactly that - treatments are sticky regardless of any changes to the feature flag. What happens if you decide to kill the feature flag or roll it out 100 percent? Doing so requires either code changes or the ability to flush the cache that's maintaining state. This deficit kind of defeats the purpose of feature flags. There are a number of ways to get around this. We will discuss one of the simplest, which is to add a second feature flag which controls whether or not the flag for your experiment should maintain stickiness. Here is how that would look in code, keeping in mind that the definition of the feature flag to control stickiness should be defined such that it's default targeting rule returns either <em>on</em> (treatment of the flag being controlled should be sticky) or <em>off</em>(treatment of the flag being controlled should be calculated directly, clearing any stored state). For this example, the names of the relevant flags are new_feature_experiment and new_feature_experiment_sticky.
</p>

```
/* Check for stored state for this feature flag for the given key */
if (getTreatment(key, "new_feature_experiment_sticky", attributes) == "on") {
  /* Treatment should be sticky */
  existingTreatment = getStoredTreatment(key, "new_feature_experiment");
          
  /* If we have a cached treatment, use that */
  if (existingTreatment != null) {
    treatment = existingTreatment;
  } else { /* Otherwise, call getTreatment and cache the result */
    treatment = getTreatment(key, "new_feature_experiment", attributes);
    putStoredTreatment(key, featureFlagName, treatment);
  }
} else {
  /* Treatment is not sticky, clear cached value if it exists */
  clearStoredTreatment(key, "new_feature_experiment")
  treatment = getTreatment(key, "new_feature_experiment", attributes);
}
```

### Limitations

<p>
  This technique cannot be used for feature flags using dynamic config, unless the program caches the configuration information in addition to the treatment name. And then one would not be able to change the configuration info in the feature flag definition and have it updated while the treatment remained sticky. This limitation could be worked around by having a well-known individually targeted user id for each treatment and then calling getTreatment with the appropriate individually targeted user_id for the cached treatment.
</p>