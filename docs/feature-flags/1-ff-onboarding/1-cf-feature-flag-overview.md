---
title: Feature Flags Overview
description: This article shows you how to build Feature Management Feature management solutions enable businesses to dynamically control the availability of application features to end-users. In simple terms, a…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 7n9433hkc0
helpdocs_category_id: tsswat9k6o
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Feature Flags (FF) is a feature management solution that lets you change your software's functionality without deploying new code. It does this by allowing you to hide code or behavior without having to ship new versions of the software. A feature flag is like a powerful `if` statement.


```
if(HarnessFeatureFlag["newamazingfeature"] == true) {  
  renderNewAmazingFeature();  
}
```
A Feature Flag is a decision point in your code that can change the behavior of your software. It can help you plan the following strategies:

* Who gets access to the feature first
* Who can test the changes
* Progressive rollouts of the feature
* Turn on a feature on a specific date

## Blog posts

You can read our blog posts to introduce you to Feature Flags:

* [Introducing Harness Feature Flags](https://harness.io/blog/product-updates/introducing-harness-feature-flags/)
* [Feature Flags: What They Are & How To Use Them](https://harness.io/blog/feature-flags/what-are-feature-flags/)
* [Implement Your First Feature Flag](https://harness.io/blog/feature-flags/implement-your-first-feature-flag/)

## Reasons to use Feature Flags

Feature Flag management provides the following opportunities to the developers:

### Ship only when you're ready

With the rise of continuous delivery, development teams ship new code to production all the time. However, this fast pace of shipping the code brings new kinds of risks.

Feature Flags provide the control to developers to ship the features only when they are ready. The teams can push new codes directly to users in minutes using the feature flags.

### Test in production

Having an opportunity to test with real, live users in the production environment can provide a much more accurate understanding of the system’s behavior. But how do you perform testing in the production environment without worrying about roll‐back or redeploy in case of any roadblocks? The feature flag management platform comes with powerful targeting and custom rules to control access to new features. You can instantly turn off the access to any feature, bringing back the old behavior simply by toggling the Feature Flag.

### Percentage deployments

In a percentage-based rollout, small numbers of users are selected to test the new feature. You can gradually increase or decrease that percentage over time. This method provides the opportunity to observe the behavior of the system under new changes. You can push the changes to all your user bases only when the changes are stable and user feedback is positive.

### User feedback

The ability to release changes to a limited set of users makes it much easier to gather feedback about the product. You can create a group of users and target feature flags specifically to that group. Testing new features with a subset of users allows developers to find and address the bugs before the major release.

