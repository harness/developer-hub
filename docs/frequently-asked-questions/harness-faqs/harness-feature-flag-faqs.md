---
title: Feature Flags (FF) FAQs
description: This article addresses some frequently asked questions about Harness Feature Flags (FF).
# sidebar_position: 2
helpdocs_topic_id: oo05aywiel
helpdocs_category_id: y7j7dl46ua
helpdocs_is_private: false
helpdocs_is_published: true
---

This article addresses some frequently asked questions about Harness Feature Flags (FF).

In this topic:

* [What is a target and target group?](harness-feature-flag-faqs.md#what-is-a-target-and-target-group)
* [Do I need to add targets in Harness manually?](harness-feature-flag-faqs.md#do-i-need-to-add-targets-in-harness-manually)
* [What is the difference between client-side and server-side SDKs?](harness-feature-flag-faqs.md#what-is-the-difference-between-client-side-and-server-side-sdks)
* [How does the streaming mode work?](harness-feature-flag-faqs.md#how-does-the-streaming-mode-work)
* [How does the metric aggregate/batch the data before sending it to Harness?](harness-feature-flag-faqs.md#how-does-the-metric-aggregatebatch-the-data-before-sending-it-to-harness)
* [What Happens if Harness Feature Flag goes down?](harness-feature-flag-faqs.md#what-happens-if-harness-feature-flag-goes-down)
* [Where is Flag State evaluated?](harness-feature-flag-faqs.md#where-is-the-flag-state-evaluated)
* [Is Harness Feature Flags GDPR compliant?](harness-feature-flag-faqs.md#is-harness-feature-flags-gdpr-compliant)
* [What happens when Harness Feature Flags is unavailable?](harness-feature-flag-faqs.md#what-happens-when-harness-feature-flags-is-unavailable)
* [What data does Harness Feature Flags receive from the SDKs?](harness-feature-flag-faqs.md#what-data-does-harness-feature-flags-receive-from-the-sdks)

## What is a target and target group?

Target is an entity in your application domain on which you want to make a flag decision. Some examples are end-users or customer accounts.

Target group is a collection of targets. For example, Beta Customers, Premium Customers, US Users, and so on.

For more information, see [Add targets](/docs/feature-flags/ff-target-management/add-targets) and [Manage target groups](/docs/feature-flags/ff-target-management/add-target-groups).

## Do I need to add targets in Harness manually?

No. Targets are auto-discovered as they are used in the Applications when evaluating flags. Here is an example in Java of how you define a target in an application and use it to evaluate the flag:


```
     Target target = Target.builder()  
                          .name("User1")  
                          .attributes(new HashMap<String, Object>())  
                          .identifier("user1@example.com")  
                          .build();  
                          .build();  
      boolean result =  
            cfClient.boolVariation("toggle", target, false);  
        log.info("Boolean variation is " + result);
```
For more information, see [Java SDK reference](../../feature-flags/ff-sdks/server-sdks/integrate-feature-flag-with-java-sdk.md) and [Add targets](/docs/feature-flags/ff-target-management/add-targets).

## What is the difference between client-side and server-side SDKs?

* Server SDKs are supposed to be used in a trusted environment, like servers or Kubernetes pods. Server SDKs synchronize flag rulesets in the background and keep an in-memory cache. When an application makes the call for flag value, the evaluation happens locally, and no network call is made. Hence, it is very fast and efficient.
* Client SDKs are designed to work in a non-trusted environment, like user browsers or mobile phones. Feature evaluation happens on the server-side, and the SDK only gets the evaluated results of the flags.

For more information, see [Client-side and server-side SDKs](../../feature-flags/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md).

## How does the streaming mode work?

Streaming provides a persistent connection to the SDKs. Harness Feature-Flags uses [Server-sent events](https://en.wikipedia.org/wiki/Server-sent_events) to send messages to the servers whenever the feature flag rules change. This has the following benefits:

* Updates the flag in a few hundred milliseconds.
* Avoids any delays by delivering real-time updates to end-users/targets.
* Ensures that every change that is made is dispersed to every user in real-time propagating them across every server.

For more information, see [Communication strategy between SDKs and Harness Feature Flags](../../feature-flags/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags.md).

## How does the metric aggregate/batch the data before sending it to Harness?

**On Server SDKs:**

**Evaluations**
1. On every flag evaluation, a metric is constructed using a combination of `flag identifier`, `variation identifier`, `variation value` and `target`.
2. A map is used to store metrics, with the key being the metric itself, and the value being a counter that keeps track of how many times this metric occurred `map['{flag}-{variation}-{value}-{target}'] += 1`.
3. Every minute, the metrics are pushed to the server.

**Targets**
1. On every flag evaluation, the Target is pushed to a map. 
2. A map is used to store targets, with the key being a combination of `target identifier`, `target name` and `target attributes`, and the value is the `target` itself `map[identifier, name, attributes] = target`.
3. Every minute, the targets are pushed to the server meaning you will shortly see them within the Target Management page on Harness.
4. If you evaluate flags using over 200,000 unique targets per minute, the following will apply:

   1. The first 200,000 targets will be sent and registered as normal.
   2. Targets 200,001 and onwards will not be sent in the request, so they won't be shown in the Target Management page on Harness.
   3. The targets that weren't included in this one-minute interval will eventually get registered when they are included in subsequent evaluations.

## What happens if Harness Feature Flag goes down?

Harness Feature Flags do not communicate with the SDKs at runtime to decide what to serve a user. They simply used the cached or default state at the time of the session.

Harness availability will have no impact on your application or your users. Every flag has a default state, and the flag states are cached locally on the SDK. As a result, the SDKs will always have a state to serve users if they can not receive any updates on the current flag state from Harness. It will either serve the most recently cached state, or it will serve the default state. 

## Where is the flag state evaluated?

The state of a flag is evaluated by the SDK, not on Harness Feature Flag's server. The state of the flags in the system is delivered to the SDKs either through polling or streaming updates from Harness. The SDK then evaluates the flag rules locally based on the current session. The only data communicated back to Harness is the evaluation data - essentially, what state of a flag was served in this session for analytics purposes.

Since the SDKs cache the flag states locally as well, Harness Feature Flags does not need to communicate with the SDKs to serve a session to a user unless the flag state has changed.

## Is Harness Feature Flags GDPR compliant?

While Harness does not yet provide an option for European data residency, Harness Feature Flags is GDPR compliant out-of-the-box and provide teams easy abstractions to remain so in any use case.

The Harness SDKs do not communicate to us any user data that you do not choose to send as an attribute - we do not require or by default send any PII. If any more identifiable customer data needs to be used for flag targeting, it can easily be masked or passed through a custom abstraction layer so that what Harness has is anonymized or not directly traceable back to end-users. Additionally, all data is encrypted in transit.

The most identifiable information that must be stored by Harness in the US, then, is the IP and email address of the actual customer’s team members, and we provide a data protection agreement to cover this data if necessary.

## What happens when Harness Feature Flags is unavailable?

Harness Feature Flags does not communicate with the SDKs at runtime to determine what to serve a user. It uses the cached or default state at the time of the session.

Harness availability will have no impact on your application or your users. Every flag has a default state, and the flag states are cached locally on the SDK. As a result, the SDKs will always have a state to serve users if they cannot receive any updates on the current flag state from Harness. It will serve either the most recently cached state or the default state. 

## What data does Harness Feature Flags receive from the SDKs?

The feature flag SDKs do not send any data that you do not opt-in to send us. The only data communicated by default is an anonymous target identifier so that we can track evaluations. Other than this identifier, all attributes used to evaluate the feature flags by the SDK must be inserted into the code by your team. Harness can receive as much or as little identifying information as you decide is necessary for properly targeting your feature flags.

