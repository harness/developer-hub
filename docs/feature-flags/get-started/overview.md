---
title: Harness Feature Flags (FF) Overview
sidebar_label: Overview
description: An overview of how Harness Feature Flags work
sidebar_position: 1
helpdocs_topic_id: 7n9433hkc0
helpdocs_category_id: tsswat9k6o
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Feature Flags (FF) is a feature management solution with smart capabilities, such as GitOps, pipelines, automations, and monitoring.

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

Watch this video for an introduction to Feature Flags:

<!-- Video:
https://www.loom.com/share/0ff74ed44f7c44a6b33c4d3b83046695-->
<docvideo src="https://www.loom.com/share/0ff74ed44f7c44a6b33c4d3b83046695" /> 

## First time setup 

Here's how to get started with Harness Feature Flags:

- Install one of our [open-source SDKS](https://developer.harness.io/docs/category/sdks-overview) into your application code. 
- Add a flag statement around the code you want to control.
- The SDKs will fetch the right configuration per session from Harness.
- Use the Feature Flags UI to toggle flags on or off for some or all of your end users.

## Using Feature Flags SDKs

SDKs are the libraries you add to your code to authenticate, configure and manage feature flag usage.

All of our SDKs are open-source, provided per-language, and backed by public APIs.

The SDKs all follow the same basic logic:

- Authenticate with Harness.
- Identify a [target](https://developer.harness.io/docs/category/manage-target-users-and-groups) for the session.
- Retrieve an evaluation for all relevant flags for the session.
- Serve the correct code path.
- Send metrics back to Harness.

## Reasons to use Feature Flags

Feature Flags provide the following opportunities to software delivery teams

### Ship only when you're ready

With the rise of continuous delivery, development teams ship new code to production all the time. However, this fast pace of shipping the code brings new kinds of risks.

Feature Flags provide the control to developers to ship the features only when they are ready. The teams can push new codes directly to users in minutes using the feature flags.

### Test in production

Having an opportunity to test with real, live users in the production environment can provide a much more accurate understanding of the system’s behavior. But how do you perform testing in the production environment without worrying about roll‐back or redeploy in case of any roadblocks? The feature flag management platform comes with powerful targeting and custom rules to control access to new features. You can instantly turn off the access to any feature, bringing back the old behavior simply by toggling the Feature Flag.

### Percentage deployments

In a percentage-based rollout, small numbers of users are selected to test the new feature. You can gradually increase or decrease that percentage over time. This method provides the opportunity to observe the behavior of the system under new changes. You can push the changes to all your user bases only when the changes are stable and user feedback is positive.

### Analyze the impact of a feature on monitored services

The Harness Service Reliability Management (SRM) module provides tools to help meet Service Level Objectives (SLOs) and identify root causes of changes to service health. By connecting a Feature Flag to an SRM-monitored service, you can analyze how that service's health is impacted when you turn the flag on or off.

### User feedback

The ability to release changes to a limited set of users makes it much easier to gather feedback about the product. You can create a group of users and target feature flags specifically to that group. Testing new features with a subset of users allows developers to find and address the bugs before the major release.

:::tip
You can also learn more using our [Feature Flag tutorials](/tutorials/feature-flags).
:::
