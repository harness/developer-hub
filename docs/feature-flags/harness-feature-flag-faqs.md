---
title: FAQs
description: This article addresses some frequently asked questions about Harness Feature Flags (FF).
sidebar_position: 2
redirect_from:
  - /docs/faqs/harness-feature-flag-faqs/
  - /kb/feature-flags
---

## Licenses, installation, and initial setup

<details>
<summary><strong>What do I need in order to get started with Harness Feature Flag?</strong></summary>

You need a GitHub account, and IDE or text editor, a Harness account with the Feature Flag module, and the ability to run `npm install` in your local environment.

</details>

<details>
<summary><strong>How do I install NPM?</strong></summary>

Go to the [npm-install documentation](https://docs.npmjs.com/cli/v7/commands/npm-install) for information about installing NPM.

</details>

<details>
<summary><strong>How to get started with GitHub/Git and Feature Flags?</strong></summary>

You need to clone your Git repository on your local machine using a `git clone` command, such as `git clone https://github.com/MY_ORG/MY_REPO.git`

</details>

<details>
<summary><strong>Can my development team generate and control feature flags solely through Git and Harness pipelines?</strong></summary>

Yes, Harness offers a powerful Git-based workflow for FF management, providing flexibility and control to development teams.  The Harness Git Experience provides a seamless way to manage feature flags using Git. Here's how it works:

- <strong>Git Experience with Feature Flags:</strong> You can manage your Feature Flags directly from a YAML file in your Git repository. This approach allows you to leverage Git for FF management alongside the Harness Platform.
- <strong>Two-Way Synchronization:</strong> With Git Experience enabled, any changes you make to FF on the Harness Platform are committed to Git automatically. Similarly, any commits made in Git for FF are reflected in the Harness Platform. This two-way synchronization ensures that you can work on FF entirely within Git, within the Harness Platform, or even both simultaneously. Your changes are kept in sync across both platforms.

For instructions and more information, go to [Manage Feature Flags in Git Repositories](https://developer.harness.io/docs/feature-flags/use-ff/ff-creating-flag/manage-featureflags-in-git-repos).

If you have any further questions or need assistance, contact [Harness Support](mailto:support@harness.io) for additional guidance.

</details>

<details>
<summary><strong>How do I add a Feature Flags SDK to my project?</strong></summary>

For an example of adding an SDK to a project, go to [Get started with an SDK](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/java-quickstart).

</details>

<details>
<summary><strong>How do I configure the source code for feature flags?</strong></summary>

You need to have the source code level setup so that the application can communicate with Harness Feature Flags. For a walkthrough, go to [Get started with an SDK](https://developer.harness.io/docs/feature-flags/get-started/java-quickstart).

</details>

<details>
<summary><strong>Is there a way to see MAU utilization at the project level?</strong></summary>

Currently, license utilization is shown at the account level only.

</details>

<details>
<summary><strong>Flag creation keeps failing</strong></summary>

Make sure the feature flag ID (identifier) doesn't have illegal characters. The regex used for feature flag IDs is `^[a-zA-Z0-9_][a-zA-Z0-9._$-]*$`.

</details>

<details>
<summary><strong>Can I recover a deleted Feature Flags project?</strong></summary>

We can't recover (undelete) deleted Feature Flags projects due to GDPR Data Retention rules that state that <em>personal data should never be retained longer than strictly necessary to accomplish the set business purpose.</em>

</details>

<details>
<summary><strong>I paid by credit card and my credit card expired. I've updated the card but I didn't get a bill. What could be the issue?</strong></summary>

Your bill will be generated at your next billing date. You can [check your billing date in the Harness UI](https://app.harness.io/ng/account/replaceWithYourAccountIDHere/settings/billing).

</details>

<details>
<summary><strong>Can I associate tags with feature flags?</strong></summary>

Yes, you can attach tags to feature flags.

</details>

<details>
<summary><strong>Is Harness Feature Flags GDPR compliant?</strong></summary>

While Harness does not yet provide an option for European data residency, Harness Feature Flags is GDPR compliant out-of-the-box and provide teams easy abstractions to remain so in any use case.

The Harness SDKs do not communicate to us any user data that you do not choose to send as an attribute - we do not require or by default send any PII. If any more identifiable customer data needs to be used for flag targeting, it can easily be masked or passed through a custom abstraction layer so that what Harness has is anonymized or not directly traceable back to end-users. Additionally, all data is encrypted in transit.

The most identifiable information that must be stored by Harness in the US, then, is the IP and email address of the actual customer’s team members, and we provide a data protection agreement to cover this data if necessary.

</details>
<details>
<summary><strong>What happens if Harness Feature Flags goes down?</strong></summary>

Harness Feature Flags do not communicate with the SDKs at runtime to decide what to serve a user. They simply used the cached or default state at the time of the session.

Harness availability will have no impact on your application or your users. Every flag has a default state, and the flag states are cached locally on the SDK. As a result, the SDKs will always have a state to serve users if they can not receive any updates on the current flag state from Harness. It will either serve the most recently cached state, or it will serve the default state. 

</details>

<details>
<summary><strong>Can Feature Flags be used across different environments within a project?</strong></summary>

Yes, Feature Flags are available across all environments within a project, but their state is independent for each environment. This means that the same flag can be toggled on in one environment and off in another. For example, in Project X, you could have Flag_1 toggled on in Environment_A and off in Environment_B.

</details>

<details>
<summary><strong>What is the relationship between Feature Flags and environments?</strong></summary>

Once you create a project in Harness, you need to create at least one environment before you can create Feature Flags. Feature Flags can be configured and used independently in different environments within the same project. The state of a flag (whether it’s on or off) is independent across environments.

</details>
<details>
<summary><strong>How do we test if my app is connected to Harness?</strong></summary>

To verify the connection, toggle the feature flag in the Harness platform. Then, check if the flag variation updates correctly in your app after toggling.

</details>
<details>
<summary><strong>How do we enable or disable streaming mode?</strong></summary>

You can enable streaming mode by setting the enableStream option to true. By default, streaming is enabled.

</details>

## FF permissions and users

<details>
<summary><strong>What's the difference between the Feature Flag Create/Edit and Toggle permissions?</strong></summary>

The **Create/Edit** permission allows the user to create and edit feature flags. The user can't turn the flag on for users without the **Toggle** permission.

The **Toggle** permission allows users to turn flags on and off for users.

This separation of permission allows you to follow the security principle of least privilege. For example, internally you can have multiple people who create flags, several who can toggle flags in QA, and only a few who can toggle flags in production.

</details>

<details>
<summary><strong>Can I block users from toggling feature flags in certain environments, such as QA or production environments?</strong></summary>

Harness suggests using [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) to restrict users from toggling flags in certain environments.

OPA exists to assert if the current state of a flag is allowed by the policy or not, regardless of what change was just made. RBAC exists to decide if someone is allowed to perform a certain change or not, such as toggling a flag in the production environment.

</details>

## SDKs

<details>
<summary><strong>What is the difference between client-side and server-side SDKs?</strong></summary>

* Server SDKs are supposed to be used in a trusted environment, like servers or Kubernetes pods. Server SDKs synchronize flag rulesets in the background and keep an in-memory cache. When an application makes the call for flag value, the evaluation happens locally, and no network call is made. Hence, it is very fast and efficient.
* Client SDKs are designed to work in a non-trusted environment, like user browsers or mobile phones. Feature evaluation happens on the server-side, and the SDK only gets the evaluated results of the flags.

For more information, see [Client-side and server-side SDKs](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks).

</details>
<details>
<summary><strong>What data does Harness Feature Flags receive from the SDKs?</strong></summary>

The feature flag SDKs do not send any data that you do not opt-in to send us. The only data communicated by default is an anonymous target identifier so that we can track evaluations. Other than this identifier, all attributes used to evaluate the feature flags by the SDK must be inserted into the code by your team. Harness can receive as much or as little identifying information as you decide is necessary for properly targeting your feature flags.

</details>
<details>
<summary><strong>Where is the flag state evaluated?</strong></summary>

The state of a flag is evaluated by the SDK, not on Harness Feature Flag's server. The state of the flags in the system is delivered to the SDKs either through polling or streaming updates from Harness. The SDK then evaluates the flag rules locally based on the current session. The only data communicated back to Harness is the evaluation data - essentially, what state of a flag was served in this session for analytics purposes.

Since the SDKs cache the flag states locally as well, Harness Feature Flags does not need to communicate with the SDKs to serve a session to a user unless the flag state has changed.

</details>
<details>
<summary><strong>How do we handle errors or failures in the SDK?</strong></summary>

If the SDK fails to initialize or fetch flags, it will emit the `Event.FAILED` event. You should listen for this event to handle errors gracefully.

</details>
<details>
<summary><strong>How do I change the polling interval?</strong></summary>

You can set the `pollInterval` option to control the interval at which the SDK polls for flag changes. The value is in milliseconds.

</details>
<details>
<summary><strong>Why are flag evaluations taking longer than expected?</strong></summary>

- Polling Interval: If you're using polling mode, the default `pollInterval` is 60 seconds. If you need faster updates, reduce this interval (but be mindful of API rate limits).
- SDK Streaming: Ensure that `enableStream` is set to true if you need real-time flag evaluations without waiting for polling cycles.
- Network Latency: If your app is running behind a proxy or in a different network region, network latency might impact the time it takes to fetch flags.

</details>
<details>
<summary><strong>What happens if the SDK cannot evaluate a flag?</strong></summary>

If a flag cannot be evaluated (for example, due to a network error or if the flag doesn't exist), the SDK will return the provided default value.

</details>
<details>
<summary><strong>Can I evaluate a flag without initializing the SDK?</strong></summary>

No, you must initialize the SDK before evaluating any flags. The SDK needs to establish a connection to the Harness platform to fetch flag data, which is done during initialization. Ensure that await `client.waitForInitialization()` completes before making any evaluations.
</details>
<details>
<summary><strong>I try to add attributes when initialize, but I cannot see it in the console. Where can I found it or is there anything I missed?</strong></summary>

If you have already initialized the SDK with the attributes and are not seeing them in the console, it is possible that the attributes are not being passed correctly?

In your code snippet, it looks like you are using a builder pattern to initialize the Target object. However, you may be overwriting the attributes each time you call .setAttributes, which could be why you're not seeing all of them in the console.

</details>
<details>
<summary><strong>How can I handle SDK shutdown gracefully?</strong></summary>

To ensure that resources are released properly, call the `close()` method when you're done with the SDK or if the application is about to terminate.

</details>
<details>
<summary><strong>Is support for multi-variable JSON flags consistent across all SDKs?</strong></summary>

Yes, multi-variable JSON flags are supported across all SDKs.

</details>

<details>
<summary><strong>For the server-side SDK, are multiple calls needed to retrieve configurations for Feature Flags and Target Groups?</strong></summary>

No, only one call each is required to fetch all Feature Flag configurations and Target Group configurations for the environment.

</details>

<details>
<summary><strong>How does the server-side SDK handle polling mode?</strong></summary>

In polling mode, the SDK periodically polls the server for configuration updates (default interval of 60 seconds) and updates the cache accordingly.

</details>

<details>
<summary><strong>How does the streaming mode work?</strong></summary>

Streaming provides a persistent connection to the SDKs. Harness Feature-Flags uses [Server-sent events](https://en.wikipedia.org/wiki/Server-sent_events) to send messages to the servers whenever the feature flag rules change. This has the following benefits:

* Updates the flag in a few hundred milliseconds.
* Avoids any delays by delivering real-time updates to end-users/targets.
* Ensures that every change that is made is dispersed to every user in real-time propagating them across every server.

For more information, see [Communication strategy between SDKs and Harness Feature Flags](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags).

</details>
<details> 
<summary><strong>How can I avoid spikiness in request rates from SDKs?</strong></summary>

You can configure the SDKs to run in polling mode instead of streaming mode.

In streaming mode, a long-lived connection stays open to listen for updates. When a flag or target group changes, all SDKs receive the update simultaneously, which can create spikes in request rates.

In polling mode, each SDK periodically requests the latest feature configurations or target groups from the CDN at a set interval (minimum 1 minute). This spreads requests evenly over time, resulting in a more stable and predictable request pattern.

If a flag or group changes in SaaS, SDKs pick up the update during their next poll, so they are only out-of-date for at most the configured poll interval.

</details> 

<details> 
<summary><strong>Can I run multiple instances of the Feature Flags SDK in a single application?</strong></summary>

No. Running multiple instances of the SDK within a single application is not supported or recommended. Each SDK instance maintains its own internal state and cache, and sharing them across instances can lead to unpredictable or incorrect behavior.

</details> 

<details> 
<summary><strong>What happens if I run multiple SDK instances in one app?</strong></summary>

If multiple SDK instances are initialized within the same process, they may share the same local cache. Because the cache is keyed only by flag or segment ID (not by project or environment), flag updates from one environment can overwrite or block updates from another. This can result in inconsistent feature flag behavior.

</details> 

<details> 
<summary><strong>Why do flag updates behave inconsistently when using multiple SDK instances?</strong></summary>

Each SDK instance compares incoming flag updates against its cached version. When two SDK instances share the same cache and the same flag ID exists in both environments, the instance with the higher version number “wins.” Updates from environments with lower flag versions may be ignored until their version surpasses the higher one.

</details> 

<details> 
<summary><strong>Is running multiple SDK instances across separate apps supported?</strong></summary>

Yes. Running separate applications, each with its own SDK instance, is fully supported. Each app maintains an isolated cache, so flag toggling and target group rules behave as expected.

</details> 

<details> 
<summary><strong>How can I safely support multiple SDK, Harness environments, or projects?</strong></summary>

To safely manage multiple environments or projects, run a single SDK instance per process. If you need to connect to multiple environments, use separate services or processes, each with its own SDK configuration.

</details> 

<details> 
<summary><strong>What is the recommended architecture to avoid SDK conflicts?</strong></summary>

The best practice is to run one SDK instance per application process. If your application must interact with multiple Harness environments or projects, create separate microservices or worker processes, each maintaining its own SDK instance and configuration.

</details> 

<details> 
<summary><strong>In a multi-service deployment, what happens if one service fails?</strong></summary>

Each service is deployed independently. If Service A fails, only Service A will rollback. The deployment of Service B or any other service will not be affected.

</details> 

<details> 
<summary><strong>Why isn’t the artifact being validated when using a trigger with an expression in the service step?</strong></summary>

The service step cannot validate artifact values provided as expressions. Validation only works reliably for fixed values. Expressions can potentially resolve to null at runtime, so mandatory validation cannot be enforced at this step.

</details> 

<details> 
<summary><strong>Does the Java SDK support HTTP proxy configuration?</strong></summary>

Yes. Starting with Java SDK version 1.8.3, experimental support for HTTP proxy configuration is available. You can set the following properties:

```
http.proxyHost / https.proxyHost

http.proxyPort / https.proxyPort

http.proxyUser

http.proxyPassword
```

These settings are passed directly to `OkHttp`.

</details> 

<details>
<summary><strong>Why do I need to run the OpenSSL command to re-encode the private key when setting up a GitHub App connector?</strong></summary>

The OpenSSL command converts a private key into unencrypted PKCS#8 PEM format.

Some systems, like GitHub Apps, require private keys specifically in PKCS#8 format instead of the traditional PKCS#1 format. Running this command ensures your key is properly formatted and compatible.

</details>

<details>
<summary><strong>How does the metric aggregate/batch the data before sending it to Harness?</strong></summary>

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

</details>

<details>
<summary><strong>What happens during client-side SDK initialization?</strong></summary>

The SDK is initialized for a specific target, enabling personalized flag evaluations.

</details>

<details>
<summary><strong>What are some best practices or guidelines for securing an API key while using the JavaScript SDK?</strong></summary>

Client and server keys serve [different purposes](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks/#sdk-types).

In short, client keys ensure that evaluations are carried out on the Feature Flag backend, preventing sensitive flag data from being pulled into the application’s memory.

</details>

<details>
<summary><strong>I am looking for an explanation of the behavior after an SDK's feature flag changes.</strong></summary>

You can find a detailed overview of how Harness Feature Flags' SDKs behave after a flag change in the following table: [Communication loop between Harness and the SDKs](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags#polling).

</details>

<details>
<summary><strong>Can I call initialize more than once to update attributes?</strong></summary>

Currently, FF doesn't have an option to update attributes without closing the SDK. You need to close and reinitialize the SDK to update attributes.

</details>

<details>
<summary><strong>Android app supports minSdkVersion 21, but the Harness SDK requires minSdkVersion 24. Which features of the Harness SDK require SDK 24, and whether it's possible to reduce the minimum SDK requirement to 21?</strong></summary>

The SDK does support version 21, but desugaring needs to be enabled. Our minSDKVersion is 21, and desugaring must be enabled. [Github] (https://github.com/harness/ff-android-client-sdk/blob/main/README.md#requirements)

</details>

<details>
<summary><strong>Why was SSE read timeout in javascript-client-sdk previously logged as an error and why is it now logged as a debug message starting in version 1.26.2?</strong></summary>

In earlier versions of the Harness FF JavaScript Client SDK, "SSE read timeouts" were logged as errors. However, this could be misleading, as occasional disconnections in real-time streaming environments are common and not necessarily a problem.

Starting in version 1.26.2, these timeouts are now logged at the debug level instead of the error level. This change was made because:

Temporary disconnections can naturally occur due to network conditions, and flagging these as errors was causing unnecessary alarm.
The SDK handles the timeout by switching to a backup method (polling) while it attempts to reconnect to the SSE stream.
By logging these as debug messages, the SDK reduces noise in the logs while still ensuring that any genuine, persistent connection issues can be detected.

</details>

<details>
<summary><strong>How does the SDK handle an SSE timeout?</strong></summary>

When the SDK detects an SSE timeout, it automatically:

- Switches to polling as a fallback method. This ensures that the system continues to function even while the SSE connection is being reestablished.
- Attempts to reconnect to the SSE stream in the background.

The polling method provides an alternative way to fetch updates from the server, ensuring that the client can still receive data even if the SSE connection is temporarily lost.

</details>

<details>
<summary><strong>When should I consider an "SSE read timeout" to be a genuine issue?</strong></summary>

An "SSE read timeout" is generally not a problem unless one or more of the following conditions occur:

- Repeated Timeouts: The system consistently encounters SSE timeouts and the connection cannot be reestablished.
- Failure to Reconnect: If the SDK fails to reconnect to the SSE stream after several attempts, this may indicate a more serious issue, such as a network or server-side problem.

</details>

<details>
<summary><strong>Is it expected that the client.on(Event.CHANGED) events in the Node.js SDK will fire for all flags during the initial loading of the client?</strong></summary>

Yes, in the Node.js SDK, the client.on(Event.CHANGED) events will fire for all flags during the client's initial loading, both when initializing or polling. For streaming, it will trigger for individual flags as they change.

</details>

<details>
<summary><strong>How do we configure a custom logger for the Node.js SDK?</strong></summary>

You can configure a custom logger by passing a logger instance as part of the options when initializing the SDK.

</details>
<details>
<summary><strong>How do I resolve the error: "Unable to fetch flag data"?</strong></summary>

- Invalid API Key: Ensure that the Server SDK Key you're using is valid and properly set up in the Harness platform.
- Connectivity Issues: If your app can't connect to https://config.ff.harness.io, make sure there’s no network issue or firewall blocking the connection.
- Base URL for Relay Proxy: If you're using a Relay Proxy, the `baseUrl` should be set to http://localhost:7000 (or wherever your Relay Proxy is running). If this is misconfigured, the SDK won't be able to fetch flags.

</details>
<details>
<summary><strong>How can I debug issues with the SDK?</strong></summary>

- Using Winston Logger: You can pass a custom logger, such as winston, to the SDK to log events and data at different log levels (e.g., debug, info, error).
- Check SDK Initialization: Add a listener for the `Event.READY` event to ensure the SDK initialized correctly.

</details>
<details>
<summary><strong>What should I do if the SDK fails to initialize?</strong></summary>

If the SDK fails to initialize, check the following:

- Invalid SDK Key: Ensure that the Server SDK Key you're using is correct and belongs to the right environment in the Harness platform.
- Network Issues: Verify that your server can connect to https://config.ff.harness.io/api/1.0 (or your custom base URL). This is critical for fetching flag data.
- Event Listener: The SDK emits an `Event.FAILED` event when it fails to initialize. Listen to this event to get more information on the failure.

</details>

## FF auth-secret

<details>
<summary><strong>What is the purpose of the auth-secret setting in the Harness Relay Proxy configuration?</strong></summary>

The auth-secret setting in the Harness Relay Proxy configuration is used to provide an authentication secret that is utilized by the proxy to sign the JSON Web Tokens (JWTs) it sends to the SDKs. This signing process adds a layer of security by ensuring that the SDKs are using valid and authorized JWTs, preventing the use of spoofed tokens.

The authentication secret is used to sign the JWT (JSON Web Token) that we provide to the SDK during the authentication process (more at jwt.io). The SDK then uses this JWT to authenticate all subsequent requests. Typically, the authentication secret is a randomly generated string, ensuring security.

</details>

<details>
<summary><strong>How does the auth-secret work with the SDK authentication process?</strong></summary>

When the SDK performs authentication, it receives a JWT. By signing this JWT with the auth-secret, the proxy can validate the authenticity of the JWT. This prevents unauthorized access and ensures that the SDK is using a valid token for authentication.

</details>

<details>
<summary><strong>Do I have to use a secret manager to configuring the auth-secret?</strong></summary>

Yes, you must [set up a secret manager](/docs/feature-flags/use-ff/relay-proxy/configuration/#auth) to configure the auth-secret. The secret manager ensures that sensitive information, like the authentication secret, is securely stored and managed.

</details>

## FF Relay Proxy

<details>
<summary><strong>What happens if my application connects directly to Harness and Harness goes down using the Relay Proxy v1?</strong></summary>

If your application connects directly to Harness without using Relay Proxy, the SDK in your application will continue using the last cached flag values stored internally during Harness downtime. However, if new instances of your application (e.g., Kubernetes pods) are started during the downtime, they will fail to fetch flag values from Harness and fall back to the default values.

</details>

<details>
<summary><strong>How does Relay Proxy V2 handle downtime in Harness?</strong></summary>

When using Relay Proxy V2, it caches the latest flag values in its Redis instance. This ensures that new instances of your application (e.g., newly scaled pods) can authenticate and retrieve flag data seamlessly, even during Harness downtime. Once Harness is back online, changes made to the flags will be propagated to the Relay Proxy and your applications automatically.

</details>

<details>
<summary><strong>What happens when I use Relay Proxy V1 in offline mode?</strong></summary>

In offline mode, Relay Proxy V1 does not fetch flag data from Harness. Instead, it loads flag configurations from a local config file. As a result, the configuration seen in the Harness UI may not match the one being used by your applications. To update flag configurations in offline mode, you must modify the config file, redeploy the proxy, and restart the service.

</details>

<details>
<summary><strong>What are the potential causes of this "connection reset" error?</strong></summary>

There are several potential causes for the error:

- Network Issues: Unstable or intermittent network connectivity between your relay proxy and the remote server.
- Remote Server Issues: The remote server might be under heavy load, rate-limiting connections, or encountering other issues that cause it to reset connections.
- SSL/TLS Handshake Problems: Configuration issues related to SSL/TLS, such as expired certificates or incompatible encryption settings, can cause the connection to be reset.
- Timeouts or Resource Limits: Either the proxy or the remote server might have resource limitations, such as insufficient CPU, memory, or network bandwidth, causing the connection to time out or be reset.

</details>

<details>
<summary><strong>What does the error "SSE read timeout" mean?</strong></summary>

The "SSE read timeout" error occurs when the Server-Sent Events (SSE) stream disconnects due to network interruptions or other temporary issues. SSE is a mechanism used by many applications to push real-time updates from a server to the client.

These timeouts can be caused by:

- Network instability between the client and server.
- Server-side disconnects or timeouts.
- Firewall or proxy interference affecting SSE connections.

While the disconnection is logged as a timeout, it's generally a transient issue rather than a critical failure.

</details>

<details>
<summary><strong>Do I need to redeploy and restart the service when enabling/disabling flags with Relay Proxy V1 in offline mode?</strong></summary>

Yes, with Relay Proxy V1 in offline mode, enabling or disabling flags requires modifying the config file, redeploying the proxy, and restarting the service for the changes to take effect.

</details>

<details>
<summary><strong>Does Relay Proxy V2 support high availability (HA) mode?</strong></summary>

Yes, Relay Proxy V2 supports high availability (HA) mode, which allows multiple read-replica pods to handle app requests, improving reliability and scalability.

</details>

<details>
<summary><strong>Can Relay Proxy V1 scale horizontally?</strong></summary>

No, Relay Proxy V1 can only scale vertically (i.e., by adding more resources to a single instance). It does not support horizontal scaling or high availability mode like Relay Proxy V2.

</details>

<details>
<summary><strong>How does using Relay Proxy V2 improve application performance during Harness downtime?</strong></summary>

Using Relay Proxy V2 ensures that even if Harness is down, new instances of your application can still retrieve the latest flag values from the cached data in Redis, minimizing disruption. This reduces the risk of falling back to default flag values when scaling up new application instances during downtime.

</details>

<details>
<summary><strong>What is the main difference between Relay Proxy V1 and V2?</strong></summary>

The key difference between Relay Proxy V1 and V2 is that V2 supports caching flag values in Redis and high availability (HA) mode. This enables better scalability and ensures that new instances of your application can seamlessly fetch flag data, even if Harness is temporarily down. Relay Proxy V1 does not support Redis caching or HA mode and instead relies on a local config file, which requires manual updates and redeployments to reflect changes.

</details>

<details>
<summary><strong>Does Relay Proxy V2 work even if my app is disconnected from Harness?</strong></summary>

Yes, Relay Proxy V2 will continue to serve flag values from its local Redis cache even if the app is disconnected from Harness. It ensures uninterrupted flag management for your applications during periods of downtime, so new instances can continue to operate normally until Harness comes back online.

</details>

<details>
<summary><strong>Is Relay Proxy V1 suitable for production environments?</strong></summary>

Relay Proxy V1 can be used in production environments, but it may require more manual intervention, especially during downtime or when flag configurations change. Since it doesn’t support high availability mode, flag management can be less efficient and harder to scale. If reliability and scalability are important, Relay Proxy V2 is a better choice.

</details>

<details>
<summary><strong>How can I ensure high availability for my application using Relay Proxy?</strong></summary>

To ensure high availability for your application, you should use Relay Proxy V2, which supports horizontal scaling with multiple read-replica pods. This allows you to handle a larger number of requests and ensures that your application continues to operate without disruption, even if one of the proxy instances fails.

</details>

<details>
<summary><strong>We have setup relay proxy v2, the Proxy+Redis on server ABC, what do I tell the other product teams that are using scripts to call feature flags from the baseURL “https://config.ff.harness.io/api/1.0”?</strong></summary>

The base URL (https://config.ff.harness.io/api/1.0) is configured in the `SDK_BASE_URL` environment variable. If the proxy setup is correctly configured, teams will need to point their requests to the proxy's endpoint (server ABC:port) rather than the original base URL. You need to update their scripts to point to the proxy server's URL (server ABC:port). This is because the proxy intercepts and caches requests, meaning calls need to route through it to benefit from Redis caching and proxy functionality.
</details>

## FF Jira integration

<details>
<summary><strong>When configuring the Jira integration with a Harness token I am get an invalid API token error.</strong></summary>

If the Jira integration setup causes a `Harness API token is invalid` error, make sure the token has the `Account Viewer` role. The user account you use to create the token must have this role in order for the token to inherit it.

</details>

<details>
<summary><strong>With FF Jira integration, does this app record any data?</strong></summary>

Harness stores the following data:

* The install details sent to Harness by Jira, which includes a shared secret so Harness can authenticate and a Client ID (which is just a UUID).
* The ticket IDs you have linked to a flag, such as `Flag_1 links to ticket ABC-1234`.

Harness stores the following data:

* The install details sent to Harness by Jira, which includes a shared secret so Harness can authenticate and a Client ID (which is just a UUID).
* The ticket IDs you have linked to a flag, such as `Flag_1 links to ticket ABC-1234`.

Harness stores the minimum essential data needed to link flags to tickets. If the user searches for a ticket through the Harness UI, Harness requests from Jira a list of tickets matching the search term. Harness gets back a list of ticket IDs and their summaries to display in the Harness UI. However, Harness stores only the ticket ID of the selected ticket.
</details>

<details>
<summary><strong>Is the FF Jira integration free for Enterprise-level usage or there is any license term?</strong></summary>

The FF Jira integration doesn't include any added cost.

</details>

## FF APIs and endpoints

<details>
<summary><strong>What happens if the API key, which is only used to read the flag status and not for any flag update operations, is compromised?</strong></summary>

This can lead to multiple issues:

* The compromised key could allow attackers to view or modify the state of your feature flags.
* This could lead to enabling or disabling features in ways that disrupt your application or expose sensitive functionality prematurely.

If feature flags control access to sensitive features or data:

* Critical services could be disabled, leading to downtime or degraded performance.

</details>

<details>
<summary><strong>In the metrics available by API, can I determine that a target has evaluated a FF?</strong></summary>

Currently, the API returns the total number of evals.

</details>

<details>
<summary><strong>What data is transmitted when configuring the eventUrl for posting metrics to the Feature Flag service?</strong></summary>

The `eventUrl`, used by the Metrics service, sends a metrics payload that includes a map of Flags, Targets, and Evaluation results. This data is used to populate the Targets list with targets that might not exist in the UI. This endpoint is enabled by default, and you can disable it, if needed.

</details>

<details>
<summary><strong>What is the purpose of the stream endpoint? How does it maintain its connection state? Can I expect disruptions or issues with it?</strong></summary>

The `/stream` endpoint serves as a long-lived connection using server-sent events (SSE) to maintain its connection state. A `keepalive` signal is dispatched every 20 seconds to ensure that the connection remains active and open. The primary purpose of the `/stream` connection is to remain continuously open and receptive to events. You should not experience disruptions or issues. Its role is to detect changes in a designated flag and provide updated values as needed.
</details>

<details>
<summary><strong>Can I expect to see data transmission on the stream endpoint, and how should I maintain its liveliness?</strong></summary>

While using the `/stream` endpoint, you can't observe data transmission. To keep the connection alive, a `keepalive` signal must be sent at the network level. This ensures that the connection remains open and responsive to events.
</details>

<details>
<summary><strong>Is there a maximum duration for the stream connection, and what happens if it's terminated?</strong></summary>

The `/stream` connection is automatically terminated by the load balancer every 24 hours. In such cases, the FF SDK is designed to promptly reestablish the connection to ensure continuous operation.
</details>

<details>
<summary><strong>Can I use an API to export all feature flag states?</strong></summary>

Yes, you can use the [Get all Feature Flags for the Project endpoint](https://apidocs.harness.io/tag/Feature-Flags#operation/GetAllFeatures).
</details>

<details>
<summary><strong>In the Update Feature Flag API, what is variation-identifier?</strong></summary>

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

</details>


## FF targets

<details>
<summary><strong>What is a target and target group?</strong></summary>

Target is an entity in your application domain on which you want to make a flag decision. Some examples are end-users or customer accounts.

Target group is a collection of targets. For example, Beta Customers, Premium Customers, US Users, and so on.

For more information, see [Add targets](/docs/feature-flags/use-ff/ff-target-management/add-targets) and [Manage target groups](/docs/feature-flags/use-ff/ff-target-management/add-target-groups).
</details>

<details>
<summary><strong>What is a "target" in the context of feature flags?</strong></summary>

In the context of feature flags, a target refers to an entity to which feature flag rules and variations can be applied. Targets can be individual users, devices, sessions, or any other identifiable entity in your system. The feature flag service evaluates these targets based on defined rules and attributes to determine which variations of a feature flag should be served to them.

</details>

<details>
<summary><strong>Does location-based evaluation work with feature flags?</strong></summary>

Yes, feature flags can evaluate targets based on their geographical location. This is typically done using location-based attributes. If your application tracks users' geographical information explicitly (e.g., their profile includes a "country" or "region" field), the feature flag service can evaluate this attribute during rule matching.

</details>

<details>
<details>
<summary><strong>Why is the default variation always being served for a specific target?</strong></summary>

When the default variation is consistently being served for a target, it often means that there are specific conditions that are causing the flag to fail to resolve to the intended variation.

</details>
<details>
<summary><strong>What should I check if my feature flag always returns the default variation for a specific target?</strong></summary>

- Flag Configuration: Review the flag's targeting rules to ensure that the conditions for the specific target are correctly defined. These might include rules based on environment, user attributes, or other variables.

- Target Group Membership: Ensure that the target is included in the appropriate groups or segments. If the target isn't a part of any defined group, the flag may fall back to the default variation.

- User Attributes or Targeting Conditions: If the flag uses user attributes or specific conditions to resolve the variation, make sure that the target meets the expected criteria. Missing or incorrect attributes might prevent the correct variation from being served.

- Environment-Specific Settings: Check if the flag's behavior is different in different environments (e.g., staging vs production). Some environments may have different targeting rules or configurations that affect how the flag is evaluated.

- Evaluation Logs: If possible, enable detailed logging for flag evaluations. Logs may provide insight into why the flag is returning the default variation instead of the intended one.

</details>
<summary><strong>Are there any privacy concerns with using location-based feature flags?</strong></summary>

When using location-based feature flags, it’s important to ensure that any geographical data you use complies with relevant privacy regulations, such as GDPR. Make sure that the location data you track is either anonymized or handled according to your privacy policy.

</details>

<details>
<summary><strong>What is the recommended value for identifier and name?</strong></summary>

While you can add targets using the Harness UI, this method is not the main one for adding targets. You typically add targets and define their attributes in your application using a Feature Flags SDK. The targets added in your code are discovered automatically and populated in the Harness UI.

</details>

<details>
<summary><strong>Do I need to add targets in Harness manually?</strong></summary>

No. Targets are auto-discovered as they are used in the Applications when evaluating flags. Here is an example in Java of how you define a target in an application and use it to evaluate the flag:

```java
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
</details>

<details>
<summary><strong>If I set targets and then do a percentage rollout on a feature flag, does the percentage include those already opted in, effectively stacking percentages?</strong></summary>

No, target-specific overrides take priority. The rollout percentage applies to users without target-specific overrides.

For example, if you have 100 targets and 5 have overrides, the pool for the rollout is 95. If you do a 10% rollout, it means 9 or 10 new targets (14 or 15 total). Actual numbers may vary due to weights, not exact percentages, as each target has a chance of getting `true` or `false` in a rollout.
</details>

<details>
<summary><strong>Can attributes be used for targeting? We have several things to do targeting such as the customerId, customerType, appVersion. I plan to use attributes for this.</strong></summary>

Yes, attributes can be used for targeting.
</details>

<details>
<summary><strong>How to make the targets anonymous?</strong></summary>

You need to set `isPrivate(true)` on the target to make the target anonymous.
</details>

<details>
<summary><strong>For target groups with the "Target based on condition" criteria type, can I see which targets belong to the group?</strong></summary>

No, since the criteria might pertain to attributes. Evaluations are done in real time based on what attributes are sent. It's possible to have the same target match or not match based on an individual SDK's usage.
</details>

<details>
<summary><strong>In Optimizely, we had complex rules with "OR" conditions for target groups. Does Harness support similar complex rules or "OR" rules in general?</strong></summary>

Currently, Harness supports "OR" rules for defining target groups. However, if you require complex "AND" rules or more intricate rule combinations, you can achieve this by providing an additional attribute that combines the criteria you need. For example, you can create a new attribute that combines both the "name1" and "name2" fields to meet your specific conditions.

If you find that your use case requires enhanced rule capabilities beyond what is currently available, we encourage you to open an Enhancement Request. Our Product team reviews these requests and works to enhance the platform based on user feedback and requirements, so your input can help shape future features and improvements.

Complex ruleset JSON example

```json
[
  "and",
  [
    "or",
    [
      "or",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "123"
      }
    ],
    [
      "or",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "1234"
      }
    ],
    [
      "or",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "1235"
      }
    ],
    [
      "and",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "1234"
      },
      {
        "match_type": "exact",
        "name": "name2",
        "type": "custom_attribute",
        "value": "321"
      }
    ]
  ]
]
```
</details>

<details>
<summary><strong>Does the relay proxy offer both Polling and Streaming options for communication?</strong></summary>

Yes, the Relay Proxy provides configuration choices for both Streaming and Polling communication methods.
</details>

<details>
<summary><strong>What is an appropriate or optimal way to add a hard refresh for mobile browsers?</strong></summary>

The latest version of the FF SDK has a `refreshEvaluations` function that you can call to manually refresh evaluations on demand. For more information, go to the [mobile device support documentation in the FF SDK GitHub repository](https://github.com/harness/ff-javascript-client-sdk/blob/HEAD/mobile_device_support.md).

It is not recommended to reload on `Event.ERROR`, because this can be triggered by minor or irrelevant issues such as a poor cellular connection. For more nuanced error types, go to the documentation in the FF SDK GitHub repo about [listening to events from the client instance](https://github.com/harness/ff-javascript-client-sdk/tree/ec5bc61e69fae761a0372fa81c4395519ebb32cd#listening-to-events-from-the-client-instance).

For mobile browsers (e.g. non-webview), our testing found that the following event triggered most consistently across various browsers and operating systems when the browser comes to the foreground:

```
document.addEventListener('visibilitychange', (event) => {
  // See https://developer.chrome.com/blog/page-lifecycle-api/
  cf.refreshEvaluations();
});
```

For more information, go to [Make flags resilient during a mobile web browser refresh](https://developer.harness.io/docs/feature-flags/get-started/mobile-browser-refresh).
</details>

<details>
<summary><strong>How do you include a target using custom data?</strong></summary>

To include a target, initialize the JavaScript SDK with your target's details and desired attributes. For example:

```
const cf = initialize('api_key', {
  identifier: 'Harness',
  attributes: {
    lastUpdated: Date(),
    host: location.href
  }
});
```

This setup allows you to use ``lastUpdated`` and ``host`` in creating group rules.
</details>

<details>
<summary><strong>Is it secure to store the client-sdk-key in session storage?</strong></summary>

Yes, it is secure. Read [SDK Types documentation](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks#sdk-types) for more information.
</details>

<details>
<summary><strong>What can a client do with client-sdk-key besides evaluating feature flags?</strong></summary>

The client SDK keys are intended only for evaluation purposes on Harness servers and do not allow users to extract data from their Harness account. This means that even if someone inspects a web application and obtains the client SDK key, they cannot access any confidential information stored in Harness.
</details>

## Other FF FAQs
<details>
<summary><strong>Can we call initialize more than once to update attributes?</strong></summary>

We do not have a option to do update without closing the sdk. So ee will need to close the SDK and re-init it in the mean time, to force the attributes to update.
</details>

<details>
<summary><strong>We specify that a percentage rollout gets hashed to create a number between 1-100 which is used for the percentage rollout. Does the attribute get combined with the flagID at all</strong></summary>

We don’t involve the flag ID in the hash. However you can choose to hash on different target attributes, you can change it in the UI when setting the percentage rollouts.
</details>

<details>
<summary><strong>Would a target always be in the same bucket regardless of the feature flag? What I mean by that is if I roll out multiple flags which are entirely independent of 10% TRUE, I would expect a different 10% to be used for both flags, otherwise, the first x% of targets would be the first to see new features which seems unintended.</strong></summary>

Yeah, a target will generally always be in the same bucket. a target with the identifier “test” will always come out as 57. so a 50/50 split will always be false.
</details>

<details>
<summary><strong>How do I configure the bucket behaviour so that I can release two features simultaneously to two different buckets? I.e. I want to deliver true to buckets 1-10 for flag 1 and true to buckets 10-20 for another feature.</strong></summary>

For your 1-10 flag you could create a “Multivariate” with the variations: “variant”, “excluded” and “control” and set to serve 10% “variant“ and 90% to exclude with 0 to control. 

for your 10-20 flag you could create a “Multivariate” with the variations: “excluded”, “variant” and “control” and set it to serve 10% “excluded “, 10% to “variant” and 80% to control. 
</details>

<details>
<summary><strong>Is there a way to configure what buckets to use for TRUE and false? There are cases where I don't want the same targets always to get the feature rollout, especially if I am trying to experiment with different flags and I don't want both targets to overlap.</strong></summary>

Yeah, the buckets are fairly static. so 50/50 on a boolean flag will always have true in the first 50 and false in the second 50. You can, however, create a “Multivariate” flag and what order you add the variations is what order the buckets are created. so Creating a “string” flag with “false” first and “true” second will switch the order. You can also use this to add control groups. Some users would create a flag with 3 variations: “control”, “excluded” and “variant” as a way to mix what users see.
</details>

<details>
<summary><strong>Is there a reason you are not concatenating the feature flag ID along with the identifier before hashing to identify the bucket?</strong></summary>

Regarding concatenating the feature flag ID along with the identifier before hashing to identify the bucket, this is not currently a feature in Harness.
</details>

<details>
<summary><strong>Is there a way to check in Harness UI what variation a target got served? Say I need to validate what flags a customer is seeing is there a way to do that?</strong></summary>

To check what variation a target got served in Harness UI, you can go to the Feature Flags dashboard, select the flag you want to check, and then click on the Analytics tab. From there, you can filter by target and see which variation was served to that target.
</details>

<details>
<summary><strong>How to fetch stale flags in org and projects?</strong></summary>

You can use the API https://apidocs.harness.io/tag/Feature-Flags#operation/GetAllFeatures to fetch stale FF, you need to use status=potentially-stale in the API.
</details>

<details>
<summary><strong>Why am I getting a target segment not found error?</strong></summary>
```
target segment not found%!(EXTRA string-some-target-here)
```
This error occurs if a user is trying to add a target group that does not exist as a target to a Feature Flag.
</details>

<details>
<summary><strong>Why am I getting a target not created error?</strong></summary>
```
target not created 'target'
```
This error occurs if a user is trying to add a target that already exists.
</details>

<details>
<summary><strong>How to retrieve the feature flag state for a specific target via API?</strong></summary>

The best approach today to achieve this usecase is if you want to know what a specific target will get for a specific flag, you can instantiate one of the SDKs, connect with an SDK key and evaluate that target. It’s the most reliable way of doing it since it’s exactly what the target will be doing.
</details>

<details>
<summary><strong>How does the client SDK handle target creation when a service restarts and authenticates?</strong></summary>

When a service restarts and authenticates, it must supply the target information itself. The SDK does not store or manage targets on the Harness side. Therefore, the customer's application is responsible for providing the target and its associated data during authentication. Typically, this information would be retrieved from a session if it pertains to a user, or fetched from a user store. This ensures that the service has the necessary target data upon restarting and re-authenticating.
</details>

<details>
<summary><strong>Does deleting a Flag in one environment delete it from all other environments?</strong></summary>

Yes, deleting a flag in one environment does delete it from all environments.
</details>

<details>
<summary><strong>Why weren't delete actions included in the Feature Flag Admin role?</strong></summary>

Deleting a flag can lead to catastrophic consequences. To safeguard against this, we want our users to think carefully about permissions. The Feature Flag Admin role can do almost everything except delete to prevent accidental or unintended deletions.
</details>

<details>
<summary><strong>How can I grant delete permissions to a user if the Feature Flag Admin role does not include it?</strong></summary>

If you need to grant delete permissions to a user, you have two options:

1. Use one of the out-of-the-box roles: Project Admin, Org Admin, or Account Admin. All of these roles include the delete flag permission and allow users to perform all necessary actions.
2. Create a specific role that includes the delete permission and assign that role to your users. This way, you can tailor permissions to your exact needs while maintaining control over potentially destructive actions.
</details>

<details>
<summary><strong>What does warning NU1701 mean?</strong></summary>

The warning NU1701 is a common issue encountered in .NET projects when there are compatibility problems between the project and the NuGet packages it depends on. This warning typically indicates that a referenced package was restored using a target framework that does not fully support the target framework of the project.
</details>

<details>
<summary><strong>How can I resolve the issue where the `ff-service` cannot connect to the database, resulting in the error `FATAL: database 'cf_db'` does not exist (SQLSTATE 3D000)"?</strong></summary>

In the event that the `ff-service` is unable to connect to the database due to this error, it is likely due to the migration failing. You can resolve this issue by following these steps:

 1. Delete the Migration Job:

 - Identify and delete the migration job that was created during the initial setup. This can usually be done through your Kubernetes management tool or command line interface.
 2. Reinstall the Helm Chart:

 - Reinstalling the Helm chart will re-trigger the migration and setup process, ensuring that the database is created correctly. By deleting the failed migration job and reinstalling the Helm chart, you can resolve the database connection issue and ensure the ff-service connects to the newly created database.
</details>

<details>
<summary><strong>Why is my feature flag returning the default variation for a specific target always?</strong></summary>

The default variation is returned when the feature flag evaluation either fails or does not match the defined conditions for the target. This can happen due to misconfigured targeting rules, SDK integration issues, or incorrect environment setup.
</details>

<details>
<summary><strong>Why does the feature flag work for one target but not another?</strong></summary>

This discrepancy may occur due to differences in the way the targets are configured. Targeting rules, audience segmentation, or SDK setup might differ between targets, causing the flag to behave differently for each.
</details>

<details>
<summary><strong>What does it mean when the feature flag evaluation fails?</strong></summary>

This may happen if the target doesn't meet any conditions, if there's a problem fetching the flag, or if the evaluation logic encounters an error.
</details>

<details>
<summary><strong>What steps can I take to resolve the issue of the default variation being served?</strong></summary>

1. Compare the flag configuration and targeting rules between targets.
2. Ensure the SDK is correctly initialized and integrated with the environment.
3. Check logs for errors or issues in the flag evaluation process.
4. Verify the target meets the necessary conditions to receive the intended variation.
5. Confirm the correct flag version is deployed to the right environment.
</details>

<details>
<summary><strong>What would be the best practice for targeting large user groups(in millions)?</strong></summary>

The best practice is to use attribute-based targeting. Assign an attribute (e.g., emailWhitelist) to users in the large group and create a rule based on that attribute. This approach avoids performance issues and ensures a more manageable solution.
</details>

<details>
<summary><strong>How does targeting a large group impact the client-side SDKs?</strong></summary>

Client-side SDKs will need to fetch larger documents, increasing data transfer time and affecting overall evaluation speed. This can cause noticeable delays on the client-side due to limited processing power and resources compared to server-side environments. These performance bottlenecks can lead to poor user experience.
</details>

<details>
<summary><strong>Why is it recommended to use attributes instead of targeting users directly?</strong></summary>

Using attributes (like emailWhitelist: true) helps:
1. Improve performance by using more efficient lookup methods (e.g., equals instead of in).
2. Avoid UI management issues, since you don’t have to manually manage such a large list of users.
</details>

<details>
<summary><strong>What does the error "FF-SDK Streaming: SSE read timeout" mean?</strong></summary>

This error indicates that the Server-Sent Events (SSE) stream used by the Harness SDK has been disconnected, typically due to network issues or other interruptions. It is a normal occurrence in varied network conditions.
</details>

<details>
<summary><strong>Is the "FF-SDK Streaming: SSE read timeout" a critical issue?</strong></summary>

In most cases, this error is not critical. Starting from version 1.26.2 of the Harness FF JavaScript Client SDK, this timeout is logged at a debug level to indicate that disconnections are expected and normal. The system will attempt to reconnect, and in the meantime, it uses polling as a fallback.
</details>

<details>
<summary><strong>What can I do to prevent SSE read timeouts?</strong></summary>

Since occasional SSE disconnections are normal, there's no need to prevent them. However, ensuring a stable network connection can help reduce the frequency of timeouts. You should only investigate further if timeouts happen frequently or if the SDK fails to reconnect after multiple attempts.
</details>

<details>
<summary><strong>When adding Target Group, is there a way of adding multiple Ids in one copy ?</strong></summary>

You can use the api and provide multiple values in one go
</details>
<details>
<summary><strong>Is there a way to create a Target group in one environment and then promote it across the other environments?</strong></summary>

We have APIs to create target groups  [API](https://apidocs.harness.io/tag/Target-Groups), which can further be automated using pipelines.
</details>
<details>
<summary><strong>Can we manage targets and target groups using Git Sync? is it possible to move targets between target groups using Git Sync?</strong></summary>

No, Git Sync is only used for managing flag configurations. Targets and target groups cannot be managed or moved between groups through Git Sync.
</details>
<details>
<summary><strong>Why shouldn't I use a server-side SDK key in client-side applications?</strong></summary>

Using a server-side SDK key in client-side applications (like browser or mobile apps) is not secure because client-side environments can be easily inspected and compromised by users. Attackers can use browser developer tools or unpack mobile apps to access sensitive information, including the SDK key. Server-side SDK keys should only be used in secure server environments.
</details>

<details>
<summary><strong>How do I enable verbose logging to view these details?</strong></summary>

To see these logs, you need to set your logger level to debug. Keep in mind that debug-level logs may not be suitable for production environments, as they can generate a significant amount of information.
</details>

<details>
<summary><strong>Can I see which target group rule evaluated to true to return the flag value in the .NET SDK logs?</strong></summary>

Yes, in the .NET SDK, verbose logging can provide detailed information about which target group rules were evaluated and whether they matched. To access these logs, your logging level should be set to debug.

</details>

