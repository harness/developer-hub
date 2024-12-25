---
title: Foundational concepts
sidebar_label: Foundational concepts
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025335091-Step-4-Create-a-metric-monitor-and-measure-the-impact </button>
</p>

Take 5 minutes to learn the foundational concepts of Split’s Feature Data Platform.

# What is a feature flag?
A feature flag wraps or gates a section of your code, allowing it to be selectively turned on or off remotely with precision, down to the level of an individual user, at any time, without a new code deployment.

# Decouple your deploy from your feature release
Feature flags allow you to decouple your deploy from your release, so your work in progress and new features are deployed in a turned-off state to any environment, which includes production, without impacting your users. 

# Control your release with targeting rules
Once your code is deployed, you can instantly turn on or off features for any individual user, group of users, or percentage of users, by creating or updating targeting rules. This approach facilitates faster software delivery practices with greater safety, including: 

* Trunk-based development to reduce time lost merging code branches
* Testing in production to allow dev, QA, and stakeholder review without impacting your users
* Early access or beta testing for a subset of your users in production
* Canary releases and monitored rollouts to limit the blast radius of release incidents
* Instant kill switches to shut off exposure to a feature without rollback or redeploy
* Infrastructure migration without downtime or risk of data loss
* Experimentation and A/B testing to make bigger bets with less risk

# The role of data in Split
The Split Feature Data Platform provides visibility into your controlled releases by comparing data about feature flag evaluations with data about what happened after those evaluations. The data points that feed those comparisons are impressions and events. The results of those comparisons are called metrics.

# Impressions
An impression is a record of a targeting decision made. It is created automatically each time a feature flag is evaluated and contains details about the user or unique key for which the evaluation was performed, the targeting decision, the targeting rule that drove that decision, and a time stamp. Refer to the [Impressions](https://help.split.io/hc/en-us/articles/360020585192-Impressions) guide for more information.

# Events
An event is a record of user or system behavior. Events can be as simple as a page visited, a button clicked, or response time observed, and as complex as a transaction record with a detailed list of properties. An event doesn’t refer to a feature flag. The association between flag evaluations and events is computed for you. An event, associated with a user (or other unique keys), arriving after a flag decision for that same unique key, is attributed to that evaluation by Split’s attribution engine.

To be ingested by Split, an event must contain the same user or unique key for which a feature flag evaluation was performed and a time stamp. Events are sent to Split from within your application, either from an existing customer data platform or error subsystem, or with a bulk upload using Split’s REST API. Numerous events in integrations streamline event ingest for you.

# Metrics
Split calculates metrics by attributing events to impressions and applying metric definitions to them. A metric definition can be as simple as a count of events per user or as complex as an average of values pulled from an event’s property after filtering those same events by another property. 

For example, from a stream of room_reservation events, calculate the average number of room nights booked for platinum members by examining the room_nights property after filtering the room_reservation events to those where the property club_membership = platinum.

To promote one version of the truth, metrics are defined in a central location, not on a flag-by-flag basis, and all metrics are calculated for all flags. Split lets you elevate any metric your account created to be a key metric for a given feature flag. Then all the remaining metrics are sorted by impact and displayed immediately below the key metrics. This design, unique to Split, avoids blind spots caused by only looking for what you expect to find which automatically surfaces unexpected impacts. Refer to the [Metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) guide for more information. 

# Alerts
Alerts notify metric stakeholders and the team rolling out a particular feature when a metric threshold has exceeded a rollout or experiment that uses a percentage rollout rule.

Alerts, like the metrics they are based on, are centrally defined once, and then applied to every rollout or experiment automatically. This is another design unique to Split. Our goal is to make learning and safety at speed the default experience, for every rollout. Once you define thresholds for metrics, any future rollout or experiment that exceeds them will fire an alert. When that happens, notifications are sent out, and an alert box is presented on the Targeting and Alerts tabs for the feature flag in question. Refer to the [Configuring metric alerting](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting) guide for more information.

# Using Split in your application
Targeting decisions are made locally, in memory, from within your own application code. There is never a reason to send private user data to Split’s network. Let’s take a look at how this is accomplished.

# Split SDKs
To use Split, include and initialize one of Split’s SDKs in your application. Once the SDK is initialized, targeting rules are retrieved from a nearby content delivery network (CDN) node, cached inside your code, and updated in real-time in milliseconds using a streaming architecture. 

As needed, your application makes a just-in-time call to the Split SDK in local memory, passing the feature flag name, the userId or unique key, and optionally, a map of user or session attributes. The response is returned instantly, with no need for a network call. After the evaluation is performed, the SDK asynchronously returns an impression record to Split. Refer to our [SDK overview](https://help.split.io/hc/en-us/articles/360033557092-SDK-overview) for more information.

# Split evaluator
As an alternative to using Split’s SDKs, you can make REST API calls to a Split Evaluator hosted inside your own infrastructure. Like the SDK, this method never requires you to send private user data to Split’s network. The evaluator makes it possible to operate from within languages that do not yet have a published Split SDK and should only be used in that case. Refer to the [Split evaluator](https://help.split.io/hc/en-us/articles/360020037072-Split-Evaluator) guide for more information.

# Split's structure
Split is architected to support teams and organizations of any size, from a single developer to multiple value-stream enterprises. Take a moment to familiarize yourself with the concepts of your Split account, project, environment, and objects, e.g., users, groups, tags, traffic types, feature flags, segments, and metrics.

![](https://help.split.io/hc/article_attachments/30794709286029)

# Account
Your company has one Split account. Your account is the highest level container. Split support may ask you for your account ID to speed troubleshooting. You’ll find your account ID in the URL for every page you visit in the Split application.

## Users
A Split user is someone with access to the Split user interface. Administrators can invite new users to Split. All paid plans include SSO for user authentication and can support either invites or just in time provisioning.

## Groups
A group is a convenient way to manage a collection of users in your account. You can use groups to grant administrative controls and grant environment, feature flag, or segment-level controls. Refer to the [Manage user groups](https://help.split.io/hc/en-us/articles/360020812952-Manage-user-groups) guide for more information.

## Projects
Projects provide separation or partitioning of work to reduce clutter or to enforce security. All accounts have at least one project. Use multiple projects only when you want to deliberately separate the work of different teams, product lines, or areas of work from each other. By design, objects within Split are not meant to be shared or moved across projects. Refer to the [Projects](https://help.split.io/hc/en-us/articles/360023534451-Workspaces) guide for more information.

## Environment
Within each project, you may have multiple environments, such as development, staging, and production. Refer to the [Environments](https://help.split.io/hc/en-us/articles/360019915771-Environments) guide for more information.

## Feature Flags
Feature flags are created at the project level where you specify the feature flag name, traffic type, owners, and description. Targeting rules are then created and managed at the environment level as part of the feature flag definition. Refer to the [Feature flag management](https://help.split.io/hc/en-us/articles/9650375859597-Feature-flag-management) guide for more information.

## Targeting rule
Targeting rules for each feature flag are created at the environment level. For example, this supports one set of rules in your staging environment and another in production. Rules may be based on user or device attributes, membership in a segment, a percentage of a randomly distributed population, a list of individually specified user or unique key targets, or any combination of the above. Refer to the [Creating a rollout plan](https://help.split.io/hc/en-us/articles/9805284145549-Creating-a-rollout-plan) guide for more information.

## Segment
A segment is a list of users or unique keys for targeting purposes. Segments are created at the environment level. Refer to the [Segments](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment) guide for more information.

## Traffic type
Targeting decisions are made on a per-user or per unique key basis, but what are the available types of unique keys you intend to target? These are your traffic types, and you can define up to ten unique key types at the project level.

For feature flags that make decisions or observe metrics at the userId level, the traffic type should be user. If decisions and observations are based on account membership (to facilitate all users for a particular customer being treated the same, for instance), the traffic type should be account. Other common types are anonymous and device, but you have total flexibility in employing different traffic types. Refer to the [Traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) guide for more information.

## Tag
Use tags to organize and filter feature flags, segments, and metrics across the Split user interface. Because they allow you to filter items in lists, they are a great way to filter by team, epic, layer of system (front-end vs back-end), or any other. Refer to the [Tags](https://help.split.io/hc/en-us/articles/360020839151-Tags) guide for more information on how to use them.

## Statuses
Statuses provide a way for teams to indicate which stage of a release or rollout a feature is in at any given moment, and as a way for teammates to filter their feature flags to see only features in a particular stage of the internal release process. There is a fixed list of status types. Refer to the [Use statuses](https://help.split.io/hc/en-us/articles/4405023981197-Use-statuses) guide for more information.

## Additional essential guides
Now that you have a grounding in our foundational concepts, the following links take you to our essential guides that walk you through:

* [Creating and managing a feature flag](https://help.split.io/hc/en-us/articles/9650375859597)
* [Creating a rollout plan](https://help.split.io/knowledge/articles/9805284145549/en-us?brand_id=4847928)
* [Setting up and using metrics](https://help.split.io/hc/en-us/articles/9652327065485)