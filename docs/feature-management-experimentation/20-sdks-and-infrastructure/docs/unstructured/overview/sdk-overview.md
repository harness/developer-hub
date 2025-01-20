---
title: SDK overview
sidebar_label: FME SDK overview
helpdocs_is_private: true
helpdocs_is_published: false
id: sdk-overview
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

## SDK types

Our supported SDKs fall into two categories:

| **Type** | **Overview** |
| --- | --- | 
| Client-side | <ul><li> Designed to be used by a single traffic type in the browser, mobile device, or mobile application </li><li> Intended to be used in a potentially less secure environment </li><li> This includes Split's JavaScript, iOS, and Android SDKs </li></ul>  | 
| Server-side | <ul><li> Designed to work for multiple traffic types, like users or customers (many of them per SDK) as opposed to client-side that are bound to one (typically a single user or account in session) </li><li> Intended to be used in a secure environment, such as your infrastructure </li></ul> |

## Security considerations

Client- and server-side SDKs have different security considerations:
 
| **Type** | **Security Considerations** |
| --- | --- | 
| Client-side | <ul><li> These SDKs run on the browser or in a mobile device, they can be compromised by users unpacking a mobile app or use the browser's developer tools to inspect the page </li><li>Client-side SDK APIs are more restricted in regards to what information they can access because it's a less secure environment. <br />For example, client-side SDKs uses a specific endpoint (/mySegments) which only returns a list of segments in which the key used during instantiation is included. This provides for a much smaller amount of data, allowing for a smaller memory footprint in memory constrained environments of the browser and mobile apps </li></ul>| 
| Server-side | <ul><li> These SDKs operate within your own infrastructure making them not accessible by end users </li><li>When targeting by private or sensitive data on the server-side, this information won't leave your infrastructure, keeping your sensitive data under your control </li></ul>|

## API keys

Typically, you need one API key per Split environment, and additionally, you may want to issue extra API keys per microservice of your product using Split for better security isolation. You must identify which type of SDK you're using to ensure you select the appropriate API key type.
 
Within Split, the following three types of keys each provide different levels of access to Split's API: 
 
| **Type** | **Overview** |
| --- | --- | 
| Server-side | <ul><li> Configure server-side SDKs to use a server-side api key </li><li> Grants access to fetch feature flags and segments associated within the provided API key's environment </li><li> Never expose server-side keys in untrusted contexts </li><li> Do not put your server-side API keys in client-side SDKs </li><li>If you accidentally expose your server-side API key, you can revoke it in the API keys tab in Admin settings </li></ul>| 
| Client-side | <ul><li> Configure client-side SDKs to use the client-side api key </li><li> Grants access to fetch featuer flags and segments for the provided key within the provided API key's environment </li></ul>|
| Admin | <ul><li> Use for access to Split's developer admin API </li><li> This key provides broader access to multiple environments unlike the other API keys that are scoped to a specific environment </li><li> Do not share this API key with your customers </li><li> If you accidentally expose your admin API key, you can revoke it in the API keys tab in Admin settings </li></ul>|

## Supported SDKs

Using Split involves using one of our SDKs. The Split team builds and maintains these SDKs for some of the most popular language libraries and are available under open source licenses. Go to our GitHub repository for more information.

| **SDK** | **API Key/Type** | **Links** |
| --- | --- | --- | 
| Android | client-side | [Docs](https://help.split.io/hc/en-us/articles/360020343291-Android-SDK) & [GitHub](https://github.com/splitio/android-client) | 
| Angular utilities | client-side | [Docs](https://help.split.io/hc/en-us/articles/6495326064397-Angular-utilities) & [GitHub](https://github.com/splitio/angular-sdk-plugin) |
| Browser | client-side | [Docs](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK) & [GitHub](https://github.com/splitio/javascript-browser-client) |
| Flutter plugin | client-side | [Docs](https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin) & [GitHub](https://github.com/splitio/flutter-sdk-plugin) |
| iOS | client-side | [Docs](https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK) & [GitHub](https://github.com/splitio/ios-client) | 
| JavaScript | client-side | [Docs](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK) & [GitHub](https://github.com/splitio/javascript-client) | 
| React | client-side | [Docs](https://help.split.io/hc/en-us/articles/360038825091) & [GitHub](https://github.com/splitio/react-client) | 
| React Native | client-side | [Docs](https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK) & [GitHub](https://github.com/splitio/react-native-client) |
| Redux | client-side | [Docs](https://help.split.io/hc/en-us/articles/360038851551) & [GitHub](https://github.com/splitio/redux-client) | 
| GO | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020093652-Go-SDK) & [GitHub](https://github.com/splitio/go-client) | 
| Java | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020405151-Java-SDK) & [GitHub](https://github.com/splitio/java-client) |
| .NET | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020240172--NET-SDK) & [GitHub](https://github.com/splitio/.net-core-client) | 
| Node.js | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK) & [GitHub](https://github.com/splitio/javascript-client) | 
| PHP | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020350372-PHP-SDK) & [GitHub](https://github.com/splitio/php-client) | 
| PHP Thin-Client | server-side | [Docs](https://help.split.io/hc/en-us/articles/18305128673933-PHP-Thin-Client-SDK) & [GitHub](https://github.com/splitio/php-thin-client) |
| Python | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020359652-Python-SDK) & [GitHub](https://github.com/splitio/python-client) | 
| Ruby | server-side | [Docs](https://help.split.io/hc/en-us/articles/360020673251-Ruby-SDK) & [GitHub](https://github.com/splitio/ruby-client) | 

## Evaluator service

For languages with no native SDK support, Split offers the Split Evaluator, a small service capable of evaluating all available features for a given customer via a REST endpoint. This service is available as a Docker container for ease of installation and is compatible with popular framework like Kubernetes when it comes to supporting standard health checks to achieve reliable uptimes. Learn more about the [Split evaluator](https://help.split.io/hc/en-us/articles/360020037072-Split-Evaluator).

## Synchronizer service

By default, Split's SDKs keep segment and feature flag definitions synchronized in an in-memory cache for speed at evaluating feature flags. However, some languages do not have a native capability to keep a shared local cache of this data to properly serve treatments. For these cases, we built Split Synchronizer to maintain an external cache like Redis. To learn more, read about [Split Synchronizer](https://help.split.io/hc/en-us/articles/360019686092-Split-Synchronizer).

## Proxy service

Split Proxy enables you to deploy a service in your own infrastructure that behaves like Split's servers and is used by both server-side and client-side SDKs to synchronize the flags without directly connecting to Split's backend.

This tool reduces connection latencies between the SDKs and the Split server, and can be used when a single connection is required from a private network to the outside for security reasons. To learn more, read about [Split Proxy](https://help.split.io/hc/en-us/articles/4415960499213-Split-Proxy).

## Supported agents

Split's real user monitoring (RUM) agents collect detailed information about your users' experience when they visit your application. This information is used to analyze site impact, measure the degradation of performance metrics in relation to feature flag changes and alert the owner of the feature flag about such degradation.

| **Agent** | **API Key/Type** | **Docs** |
| --- | --- | --- | 
| Android | client-side | [Docs](https://help.split.io/hc/en-us/articles/18530305949837-Android-RUM-Agent) |
| iOS | client-side | [Docs](https://help.split.io/hc/en-us/articles/22545155055373-iOS-RUM-Agent) |
| Browser | client-side | [Docs](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-Agent) | 