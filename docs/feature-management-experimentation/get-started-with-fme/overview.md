---
title: Split Feature Management & Experimentation (FME) Overview
sidebar_label: ★★ Overview
description: How to make Split Feature Management & Experimentation work for you
sidebar_position: 1
---

Split Feature Management & Experimentation (FME) is a feature management solution with smart capabilities, such as GitOps, pipelines, automations, and monitoring.

Watch this video for an introduction to Harness Feature Flags:

<!-- Video:
https://www.loom.com/share/0ff74ed44f7c44a6b33c4d3b83046695-->
<DocVideo src="https://www.loom.com/share/0ff74ed44f7c44a6b33c4d3b83046695" />

## What are feature flags

Feature flags are a way that developers can conditionally turn certain sections of their code (or code paths) on or off. You can think of feature flags as an extension of Continuous Delivery - a way to put changes into production behind a flag and turn them on in a controlled way later (or hide and remove them in the same way). They form the basis of feature flag management.

A Feature Flag is a decision point in your code that can change the behavior of your software. It can help you plan the following strategies:

- Who gets access to the feature first
- Who can test the changes
- Progressive rollouts of the feature
- Turn on a feature on a specific date

A feature flag is like a powerful `if` statement.

```
if(HarnessFeatureFlag["newamazingfeature"] == true) {
  renderNewAmazingFeature();
}
```

Feature flags and the practice of feature flagging are also known as *feature toggle*, *release toggle*, *experiment toggle*, and in some situations, *ops toggle*. If you aren't using a formal feature flagging solution (whether built or bought), you may see feature flags represented as variables in a config file.

![Diagram illustrating the concept of feature flags.](./static/what-is-a-flag.png)

### Benefits in production

In general, teams adopt feature flags because they want to increase their delivery velocity while further reducing the risk of doing so. Putting different features behind flags allows teams to deploy code in smaller chunks and to deploy more often. This creates multiple "save points" and allows different features to go to into production code even when they're not ready to be fully rolled out. This helps other developers stay in sync while continuing to develop major features. The feature flag becomes the control point for teams once changes are deployed to production.

When you use feature flags, you'll see a few changes on the engineering side almost immediately:

- Velocity increases because you can merge feature branches sooner and deploy more often without needing to isolate incomplete features.
- It's easier to control the state of changes across environments when you use a feature flag, instead of custom scripting or other secret admin commands.
- You can hand a feature flag over to your PM, manager, or other stakeholders and let them decide when to enable a feature. You can continue with your other development work uninterrupted.

And across the rest of the organization, you'll see benefits as well:

- You can serve your customers faster by letting anyone use a feature flag for experimental or beta features, without having to wait for engineering availability or responsiveness.
- Release coordination is greatly simplified because PMs and marketing teams can own releases fully, without needing expensive and time-consuming launch coordination with engineering.
- Everyone has more visibility into what's available and where, because feature flags provide a common UI for important new feature configuration.

## Reasons to use feature flags

Feature flags provide the following opportunities to software delivery teams:

### Ship only when you're ready

With the rise of continuous delivery, development teams ship new code to production all the time. However, this fast pace of shipping the code brings new kinds of risks.

Feature flags provide the control to developers to ship the features only when they are ready. The teams can push new codes directly to users in minutes using the feature flags.

### Test in production

Having an opportunity to test with real, live users in the production environment can provide a much more accurate understanding of the system's behavior. But how do you perform testing in the production environment without worrying about roll‐back or redeploy in case of any roadblocks? The feature flag management platform comes with powerful targeting and custom rules to control access to new features. You can instantly turn off the access to any feature, bringing back the old behavior simply by toggling the Feature Flag.

### Percentage deployments

In a percentage-based rollout, small numbers of users are selected to test the new feature. You can gradually increase or decrease that percentage over time. This method provides the opportunity to observe the behavior of the system under new changes. You can push the changes to all your user bases only when the changes are stable and user feedback is positive.

### Analyze the impact of a feature on monitored services

The Harness Service Reliability Management (SRM) module provides tools to help meet Service Level Objectives (SLOs) and identify root causes of changes to service health. By connecting a Feature Flag to an SRM-monitored service, you can analyze how that service's health is impacted when you turn the flag on or off.

### User feedback

The ability to release changes to a limited set of users makes it much easier to gather feedback about the product. You can create a group of users and target feature flags specifically to that group. Testing new features with a subset of users allows developers to find and address the bugs before the major release.

## First time setup

Here's how to get started with Harness Feature Flags:

1. Install one of our [open-source SDKS](/docs/category/sdks-overview) into your application code.
2. Add a flag statement around the code you want to control.
3. The SDKs will fetch the right configuration per session from Harness.
4. Use the Feature Flags UI to toggle flags on or off for some or all of your end users.

For a more comprehensive guide, go to the [Feature Flags onboarding guide](./onboarding-guide.md).

## Using Feature Flags SDKs

SDKs are the libraries you add to your code to authenticate, configure and manage feature flag usage.

All of our SDKs are open-source, provided per-language, and backed by public APIs.

The SDKs all follow the same basic logic:

1. Authenticate with Harness.
2. Identify a [target](/docs/category/manage-target-users-and-groups) for the session.
3. Retrieve an evaluation for all relevant flags for the session.
4. Serve the correct code path.
5. Send metrics back to Harness.
