---
title: Feature Flags (FF) FAQs
description: This article addresses some frequently asked questions about Harness Feature Flags (FF).
sidebar_position: 3
helpdocs_topic_id: oo05aywiel
helpdocs_category_id: y7j7dl46ua
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/feature-flag-use-cases
---

This article addresses some frequently asked questions about Harness Feature Flags (FF).

## What is a target and target group?

Target is an entity in your application domain on which you want to make a flag decision. Some examples are end-users or customer accounts.

Target group is a collection of targets. For example, Beta Customers, Premium Customers, US Users, and so on.

For more information, see [Add targets](/docs/feature-flags/use-ff/ff-target-management/add-targets) and [Manage target groups](/docs/feature-flags/use-ff/ff-target-management/add-target-groups).

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
For more information, see [Java SDK reference](/docs/feature-flags/use-ff/ff-sdks/server-sdks/integrate-feature-flag-with-java-sdk.md) and [Add targets](/docs/feature-flags/use-ff/ff-target-management/add-targets).

## What is the difference between client-side and server-side SDKs?

* Server SDKs are supposed to be used in a trusted environment, like servers or Kubernetes pods. Server SDKs synchronize flag rulesets in the background and keep an in-memory cache. When an application makes the call for flag value, the evaluation happens locally, and no network call is made. Hence, it is very fast and efficient.
* Client SDKs are designed to work in a non-trusted environment, like user browsers or mobile phones. Feature evaluation happens on the server-side, and the SDK only gets the evaluated results of the flags.

For more information, see [Client-side and server-side SDKs](../feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md).

## How does the streaming mode work?

Streaming provides a persistent connection to the SDKs. Harness Feature-Flags uses [Server-sent events](https://en.wikipedia.org/wiki/Server-sent_events) to send messages to the servers whenever the feature flag rules change. This has the following benefits:

* Updates the flag in a few hundred milliseconds.
* Avoids any delays by delivering real-time updates to end-users/targets.
* Ensures that every change that is made is dispersed to every user in real-time propagating them across every server.

For more information, see [Communication strategy between SDKs and Harness Feature Flags](../feature-flags/use-ff/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags.md).

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

## What are some best practices or guidelines for securing an API key while using the JavaScript SDK? 

Client and server keys serve [different purposes](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks/#sdk-types).

In short, client keys ensure that evaluations are carried out on the Feature Flag backend, preventing sensitive flag data from being pulled into the application’s memory.

## What happens if the API key, which is only used to read the flag status and not for any flag update operations, is compromised?

This can lead to multiple issues:

* The compromised key could allow attackers to view or modify the state of your feature flags.
* This could lead to enabling or disabling features in ways that disrupt your application or expose sensitive functionality prematurely.

If feature flags control access to sensitive features or data:

* Critical services could be disabled, leading to downtime or degraded performance.

## What is `AUTH_SECRET` in the relay proxy?

The authentication secret is used to sign the JWT (JSON Web Token) that we provide to the SDK during the authentication process (more at jwt.io). The SDK then uses this JWT to authenticate all subsequent requests. Typically, the authentication secret is a randomly generated string, ensuring security.

## What happens if my application connects directly to Harness and Harness goes down using the Relay Proxy v1?

If your application connects directly to Harness without using Relay Proxy, the SDK in your application will continue using the last cached flag values stored internally during Harness downtime. However, if new instances of your application (e.g., Kubernetes pods) are started during the downtime, they will fail to fetch flag values from Harness and fall back to the default values.

## How does Relay Proxy V2 handle downtime in Harness?

When using Relay Proxy V2, it caches the latest flag values in its Redis instance. This ensures that new instances of your application (e.g., newly scaled pods) can authenticate and retrieve flag data seamlessly, even during Harness downtime. Once Harness is back online, changes made to the flags will be propagated to the Relay Proxy and your applications automatically.

## What happens when I use Relay Proxy V1 in offline mode?

In offline mode, Relay Proxy V1 does not fetch flag data from Harness. Instead, it loads flag configurations from a local config file. As a result, the configuration seen in the Harness UI may not match the one being used by your applications. To update flag configurations in offline mode, you must modify the config file, redeploy the proxy, and restart the service.

## Do I need to redeploy and restart the service when enabling/disabling flags with Relay Proxy V1 in offline mode?

Yes, with Relay Proxy V1 in offline mode, enabling or disabling flags requires modifying the config file, redeploying the proxy, and restarting the service for the changes to take effect.

## Does Relay Proxy V2 support high availability (HA) mode?

Yes, Relay Proxy V2 supports high availability (HA) mode, which allows multiple read-replica pods to handle app requests, improving reliability and scalability.

## Can Relay Proxy V1 scale horizontally?

No, Relay Proxy V1 can only scale vertically (i.e., by adding more resources to a single instance). It does not support horizontal scaling or high availability mode like Relay Proxy V2.

## How does using Relay Proxy V2 improve application performance during Harness downtime?

Using Relay Proxy V2 ensures that even if Harness is down, new instances of your application can still retrieve the latest flag values from the cached data in Redis, minimizing disruption. This reduces the risk of falling back to default flag values when scaling up new application instances during downtime.

## What is the main difference between Relay Proxy V1 and V2?

The key difference between Relay Proxy V1 and V2 is that V2 supports caching flag values in Redis and high availability (HA) mode. This enables better scalability and ensures that new instances of your application can seamlessly fetch flag data, even if Harness is temporarily down. Relay Proxy V1 does not support Redis caching or HA mode and instead relies on a local config file, which requires manual updates and redeployments to reflect changes.

## Does Relay Proxy V2 work even if my app is disconnected from Harness?

Yes, Relay Proxy V2 will continue to serve flag values from its local Redis cache even if the app is disconnected from Harness. It ensures uninterrupted flag management for your applications during periods of downtime, so new instances can continue to operate normally until Harness comes back online.

## Is Relay Proxy V1 suitable for production environments?

Relay Proxy V1 can be used in production environments, but it may require more manual intervention, especially during downtime or when flag configurations change. Since it doesn’t support high availability mode, flag management can be less efficient and harder to scale. If reliability and scalability are important, Relay Proxy V2 is a better choice.

## How can I ensure high availability for my application using Relay Proxy?

To ensure high availability for your application, you should use Relay Proxy V2, which supports horizontal scaling with multiple read-replica pods. This allows you to handle a larger number of requests and ensures that your application continues to operate without disruption, even if one of the proxy instances fails.

## We have setup relay proxy v2, the Proxy+Redis on server ABC, what do I tell the other product teams that are using scripts to call feature flags from the baseURL “https://config.ff.harness.io/api/1.0”?

The base URL (https://config.ff.harness.io/api/1.0) is configured in the SDK_BASE_URL environment variable. If the proxy setup is correctly configured, teams will need to point their requests to the proxy's endpoint (server ABC:port) rather than the original base URL. You need to update their scripts to point to the proxy server's URL (server ABC:port). This is because the proxy intercepts and caches requests, meaning calls need to route through it to benefit from Redis caching and proxy functionality.

## How to make the targets anonymous?

You need to set `isPrivate(true)` on the target to make the target anonymous.

## Can Feature Flags be used across different environments within a project?

Yes, Feature Flags are available across all environments within a project, but their state is independent for each environment. This means that the same flag can be toggled on in one environment and off in another. For example, in Project X, you could have Flag_1 toggled on in Environment_A and off in Environment_B.

## What is the relationship between Feature Flags and environments?

Once you create a project in Harness, you need to create at least one environment before you can create Feature Flags. Feature Flags can be configured and used independently in different environments within the same project. The state of a flag (whether it’s on or off) is independent across environments.

## What is a "target" in the context of feature flags?

In the context of feature flags, a target refers to an entity to which feature flag rules and variations can be applied. Targets can be individual users, devices, sessions, or any other identifiable entity in your system. The feature flag service evaluates these targets based on defined rules and attributes to determine which variations of a feature flag should be served to them.

## Does location-based evaluation work with feature flags?

Yes, feature flags can evaluate targets based on their geographical location. This is typically done using location-based attributes. If your application tracks users' geographical information explicitly (e.g., their profile includes a "country" or "region" field), the feature flag service can evaluate this attribute during rule matching.

## Are there any privacy concerns with using location-based feature flags?

When using location-based feature flags, it’s important to ensure that any geographical data you use complies with relevant privacy regulations, such as GDPR. Make sure that the location data you track is either anonymized or handled according to your privacy policy.

## In the Update Feature Flag API, what is variation-identifier?

`variation-identifier` is the identifier of the variation you want to modify:

```json
{
  "instructions": [
    {
      "kind": "addRule",
      "parameters": {
        "uuid": "a54f1bb2-e00e-4b1c-a724-30aac4a3bcf9",
        "priority": 1,
        "serve": {
          "variation": "deployed"
        },
        "clauses": [
          {
            "op": "segmentMatch",
            "values": [
              "test"
            ]
          }
        ]
      }
    }
  ]
}
```

## I try to add attributes when initialize, but I cannot see it in the console. Where can I found it or is there anything I missed?

If you have already initialized the SDK with the attributes and are not seeing them in the console, it is possible that the attributes are not being passed correctly?
In your code snippet, it looks like you are using a builder pattern to initialize the Target object. However, you may be overwriting the attributes each time you call .setAttributes, which could be why you're not seeing all of them in the console.

## What is the recommended value for identifier and name?

While you can add targets using the Harness UI, this method is not the main one for adding targets. You typically add targets and define their attributes in your application using a Feature Flags SDK. The targets added in your code are discovered automatically and populated in the Harness UI.

## Can attributes be used for targeting? We have several things to do targeting such as the customerId, customerType, appVersion. I plan to use attributes for this.

Yes, attributes can be used for targeting.

## Android app supports minSdkVersion 21, but the Harness SDK requires minSdkVersion 24. Which features of the Harness SDK require SDK 24, and whether it's possible to reduce the minimum SDK requirement to 21?

The SDK does support version 21, but desugaring needs to be enabled. Our minSDKVersion is 21, and desugarding must be enabled. [Github] (https://github.com/harness/ff-android-client-sdk/blob/main/README.md#requirements)

## What are the potential causes of this "connection reset" error?

There are several potential causes for the error:

Network Issues: Unstable or intermittent network connectivity between your relay proxy and the remote server.
Remote Server Issues: The remote server might be under heavy load, rate-limiting connections, or encountering other issues that cause it to reset connections.
SSL/TLS Handshake Problems: Configuration issues related to SSL/TLS, such as expired certificates or incompatible encryption settings, can cause the connection to be reset.
Timeouts or Resource Limits: Either the proxy or the remote server might have resource limitations, such as insufficient CPU, memory, or network bandwidth, causing the connection to time out or be reset.

## What does the error "SSE read timeout" mean?

The "SSE read timeout" error occurs when the Server-Sent Events (SSE) stream disconnects due to network interruptions or other temporary issues. SSE is a mechanism used by many applications to push real-time updates from a server to the client.

These timeouts can be caused by:

Network instability between the client and server.
Server-side disconnects or timeouts.
Firewall or proxy interference affecting SSE connections.

While the disconnection is logged as a timeout, it's generally a transient issue rather than a critical failure.

## Why was SSE read timeout in javascript-client-sdk previously logged as an error and why is it now logged as a debug message starting in version 1.26.2?

In earlier versions of the Harness FF JavaScript Client SDK, "SSE read timeouts" were logged as errors. However, this could be misleading, as occasional disconnections in real-time streaming environments are common and not necessarily a problem.

Starting in version 1.26.2, these timeouts are now logged at the debug level instead of the error level. This change was made because:

Temporary disconnections can naturally occur due to network conditions, and flagging these as errors was causing unnecessary alarm.
The SDK handles the timeout by switching to a backup method (polling) while it attempts to reconnect to the SSE stream.
By logging these as debug messages, the SDK reduces noise in the logs while still ensuring that any genuine, persistent connection issues can be detected.

## How does the SDK handle an SSE timeout?

When the SDK detects an SSE timeout, it automatically:

Switches to polling as a fallback method. This ensures that the system continues to function even while the SSE connection is being reestablished.
Attempts to reconnect to the SSE stream in the background.

The polling method provides an alternative way to fetch updates from the server, ensuring that the client can still receive data even if the SSE connection is temporarily lost.

## When should I consider an "SSE read timeout" to be a genuine issue?

An "SSE read timeout" is generally not a problem unless one or more of the following conditions occur:

Repeated Timeouts: The system consistently encounters SSE timeouts and the connection cannot be reestablished.

Failure to Reconnect: If the SDK fails to reconnect to the SSE stream after several attempts, this may indicate a more serious issue, such as a network or server-side problem.

##  Why is the default variation always being served for a specific target?

When the default variation is consistently being served for a target, it often means that there are specific conditions that are causing the flag to fail to resolve to the intended variation.

## What should I check if my feature flag always returns the default variation for a specific target?

Flag Configuration: Review the flag's targeting rules to ensure that the conditions for the specific target are correctly defined. These might include rules based on environment, user attributes, or other variables.

Target Group Membership: Ensure that the target is included in the appropriate groups or segments. If the target isn't a part of any defined group, the flag may fall back to the default variation.

User Attributes or Targeting Conditions: If the flag uses user attributes or specific conditions to resolve the variation, make sure that the target meets the expected criteria. Missing or incorrect attributes might prevent the correct variation from being served.

Environment-Specific Settings: Check if the flag's behavior is different in different environments (e.g., staging vs production). Some environments may have different targeting rules or configurations that affect how the flag is evaluated.

Evaluation Logs: If possible, enable detailed logging for flag evaluations. Logs may provide insight into why the flag is returning the default variation instead of the intended one.

## Is it expected that the client.on(Event.CHANGED) events in the Node SDK will fire for all flags during the initial loading of the client?

Yes, in the Node SDK, the client.on(Event.CHANGED) events will fire for all flags during the client's initial loading, both when initializing or polling. For streaming, it will trigger for individual flags as they change.


## How do we configure a custom logger for the Nodejs SDK?

You can configure a custom logger by passing a logger instance as part of the options when initializing the SDK

## How do we test if my app is connected to Harness?

To verify the connection, toggle the feature flag in the Harness platform. Then, check if the flag variation updates correctly in your app after toggling.

## How do we enable or disable streaming mode?

You can enable streaming mode by setting the enableStream option to true. By default, streaming is enabled.

## How do we handle errors or failures in the SDK?

If the SDK fails to initialize or fetch flags, it will emit the Event.FAILED event. You should listen for this event to handle errors gracefully

## How do I change the polling interval?

You can set the pollInterval option to control the interval at which the SDK polls for flag changes. The value is in milliseconds

## What happens if the SDK cannot evaluate a flag?

If a flag cannot be evaluated (for example, due to a network error or if the flag doesn't exist), the SDK will return the provided default value.

## Can I evaluate a flag without initializing the SDK?

No, you must initialize the SDK before evaluating any flags. The SDK needs to establish a connection to the Harness platform to fetch flag data, which is done during initialization. Ensure that await client.waitForInitialization() completes before making any evaluations.

## Why are flag evaluations taking longer than expected?

Polling Interval: If you're using polling mode, the default pollInterval is 60 seconds. If you need faster updates, reduce this interval (but be mindful of API rate limits).
SDK Streaming: Ensure that enableStream is set to true if you need real-time flag evaluations without waiting for polling cycles.
Network Latency: If your app is running behind a proxy or in a different network region, network latency might impact the time it takes to fetch flags.

## How can I handle SDK shutdown gracefully?

To ensure that resources are released properly, call the close() method when you're done with the SDK or if the application is about to terminate.

## How do I resolve the error: "Unable to fetch flag data"?

Invalid API Key: Ensure that the Server SDK Key you're using is valid and properly set up in the Harness platform.

Connectivity Issues: If your app can't connect to https://config.ff.harness.io, make sure there’s no network issue or firewall blocking the connection.

Base URL for Relay Proxy: If you're using a Relay Proxy, the baseUrl should be set to http://localhost:7000 (or wherever your Relay Proxy is running). If this is misconfigured, the SDK won't be able to fetch flags.

## How can I debug issues with the SDK?

Using Winston Logger: You can pass a custom logger, such as winston, to the SDK to log events and data at different log levels (e.g., debug, info, error).

Check SDK Initialization: Add a listener for the Event.READY event to ensure the SDK initialized correctly.

## What should I do if the SDK fails to initialize?

If the SDK fails to initialize, check the following:

Invalid SDK Key: Ensure that the Server SDK Key you're using is correct and belongs to the right environment in the Harness platform.

Network Issues: Verify that your server can connect to https://config.ff.harness.io/api/1.0 (or your custom base URL). This is critical for fetching flag data.

Event Listener: The SDK emits an Event.FAILED event when it fails to initialize. Listen to this event to get more information on the failure.