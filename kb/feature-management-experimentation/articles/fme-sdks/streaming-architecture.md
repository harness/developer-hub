---
title: FME SDK streaming architecture
sidebar_label: SDK streaming architecture
helpdocs_is_private: true
helpdocs_is_published: false
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033557092-SDK-overview </button>
</p>

When you integrate Split SDKs, consider the following to make sure that you have the correct set up depending on your use case, customers, security considerations, and architecture.
 
* **Understand Split's architecture**. Split's SDKs were built to be scalable, reliable, fast, independent, and secure.
* **Determine which SDK type**. Depending on your use case and your application stack, you may need a server-side or client-side SDK. 
* **Understand security considerations**. Client- and server-side SDKs have different security considerations when managing and targeting using your customers' PII.
* **Determine which API key**. In Split, there are three types of keys with each providing different levels of access to Split's API. Understand what each key provides access to and when to use each API key.
* **Determine which SDK language**. Split supports serveral SDKs across various languages. With Split, you can use multiple SDKs if your product is comprised of applications written in multiple languages.
* **Determine if you need to use the Split Synchronizer & Proxy**. By default, Split's SDKs keep segment and feature flag definitions synchronized as users navigate across disparate systems, treatments, and conditions. However, some languages do not have a native capability to keep a shared local cache of this data to properly serve treatments. For these cases, we built the Split Synchronizer. To learn more, refer to the [Split Synchronizer and Proxy guide](https://help.split.io/hc/en-us/articles/360019686092-Split-synchronizer-proxy).

## Streaming architecture overview

Split's SDKs were built to be scalable, reliable, fast, independent, and secure.

* **Scalable**. Split is currently serving more than 50 billion Split feature flag evaluations per day. If you've shopped online, purchased an airline ticket, or received a text message from service provider, you've likely experienced Split.
* **Reliable and fast**. Our scalable and flexible architecture uses a dual-layer CDN to serve feature flags anywhere in the world in less than 200 ms. In most instances, Split rollout plan updates are streamed to Split's SDKs, which takes a fraction of a second. In less than 10% of cases, for very large feature flag definitions (or large dynamic configs) or segment updates with a large number of key changes, a notification of the change is streamed and the changes are retrieved by an API fetch request. Our SDKs store the Split rollout plan locally to serve feature flags without a network call and without interruption in the event of a network outage.
* **Independent with no Split dependency**. Split ships the evaluation engine to each SDK creating a weak dependency with Split's backend and increasing both speed and reliability. There are no network calls to Split to decide a user's treatment.
* **Secure with no PII required**. No customer data needs to be sent through the cloud to Split. Use customer data in your feature flag evaluations without exposing this data to third parties.

## Streaming versus polling

Split updates can be streamed to Split's SDKs sub second or retrieved on configurable polling intervals.

When streaming, Split utilizes [server-sent events (SSE)](https://www.w3schools.com/html/html5_serversentevents.asp) to notify Split’s SDKs when a feature flag definition is updated, a segment definition is updated, or a feature flag is killed. For feature flag and segment definition updates, the Split SDK reacts to this notification and fetches the latest feature flag definition or segment definition. When a feature flag is killed, the notification triggers a kill event immediately. When the SDK is running with streaming enabled, your updates take effect in milliseconds.

Enable streaming when it is important to:

* Reduce network traffic caused by frequent polling
* Propagate split updates to every customer and/or service in real-time

When polling, the SDK asks the server for updates on configurable polling intervals. Each request is optimized to fetch delta changes resulting in small payload sizes.

Utilize polling when it is important to:

* Maintain a lower memory footprint. Each streaming connection is treated as an independent request
* Support environments with unreliable connectivity such as mobile networks. Mobile environments benefit from a low-frequency polling architecture
* Maintain robust security practices. Maintaining an always-open streaming connection poses risk
* Maintain control over frequency and when to initiate a network call

:::info

Streaming is currently supported for the below SDKs with the minimum version shown below.

* .NET 6.1.0
* Android 2.6.0
* Browser 0.1.0
* Go 5.2.0
* iOS 2.7.0
* Java 4.0.0
* JavaScript 10.12.0
* Node.js 10.12.0
* React 1.2.0
* React Native 0.0.1
* Redux 1.2.0
* Ruby 7.1.0
* Python: 8.3.0
:::