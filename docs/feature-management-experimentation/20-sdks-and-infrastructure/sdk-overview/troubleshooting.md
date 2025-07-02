---
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025918571-Troubleshooting </button>
</p>

When you integrate FME SDKs, consider the following to make sure that you have the correct set up depending on your use case, customers, security considerations, and architecture.
 
* **Understand Harness FME architecture**. FME SDKs were built to be scalable, reliable, fast, independent, and secure.
* **Determine which SDK type**. Depending on your use case and your application stack, you may need a server-side or client-side SDK. 
* **Understand security considerations**. Client- and server-side SDKs have different security considerations when managing and targeting using your customers' PII.
* **Determine which API key**. There are three types of Harness FME authentication tokens with each providing different levels of access to Harness FME API. Understand what each key provides access to and when to use each API key.
* **Determine which SDK language**. FME supports serveral SDKs across various languages. With FME, you can use multiple SDKs if your product is comprised of applications written in multiple languages.
* **Determine if you need to use the Split Synchronizer & Proxy**. By default, Harness FME SDKs keep segment and feature flag definitions synchronized as users navigate across disparate systems, treatments, and conditions. However, some languages do not have a native capability to keep a shared local cache of this data to properly serve treatments. For these cases, we built the Split Synchronizer. To learn more, refer to the [Split Synchronizer guide](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer).

## Streaming architecture overview

Harness FME SDKs were built to be scalable, reliable, fast, independent, and secure.

* **Scalable**. Harness FME is currently serving more than 50 billion feature flag evaluations per day. If you've shopped online, purchased an airline ticket, or received a text message from service provider, you've likely experienced FME.
* **Reliable and fast**. Our scalable and flexible architecture uses a dual-layer CDN to serve feature flags anywhere in the world in less than 200 ms. In most instances, FME definition updates are streamed to FME SDKs, which takes a fraction of a second. In less than 10% of cases, for very large feature flag definitions (or large dynamic configs) or segment updates with a large number of key changes, a notification of the change is streamed and the changes are retrieved by an API fetch request. Our SDKs store the FME definition locally to serve feature flags without a network call and without interruption in the event of a network outage.
* **Independent with no Harness FME dependency**. Harness FME ships the evaluation engine to each FME SDK creating a weak dependency with Harness FME backend and increasing both speed and reliability. There are no network calls to Harness to decide a user's treatment.
* **Secure with no PII required**. No customer data needs to be sent through the cloud to Harness servers. Use customer data in your feature flag evaluations without exposing this data to third parties.

## Streaming versus polling

FME updates can be streamed to FME SDKs sub second or retrieved on configurable polling intervals.

When streaming, Harness FME utilizes [server-sent events (SSE)](https://www.w3schools.com/html/html5_serversentevents.asp) to notify FME SDKs when a feature flag definition is updated, a segment definition is updated, or a feature flag is killed. For feature flag and segment definition updates, the FME SDK reacts to this notification and fetches the latest feature flag definition or segment definition. When a feature flag is killed, the notification triggers a kill event immediately. When the SDK is running with streaming enabled, your updates take effect in milliseconds.

Enable streaming when it is important to:

* Reduce network traffic caused by frequent polling
* Propagate FME updates to every customer and/or service in real-time

When polling, the SDK asks the server for updates on configurable polling intervals. Each request is optimized to fetch delta changes resulting in small payload sizes.

Utilize polling when it is important to:

* Maintain a lower memory footprint. Each streaming connection is treated as an independent request
* Support environments with unreliable connectivity such as mobile networks. Mobile environments benefit from a low-frequency polling architecture
* Maintain robust security practices. Maintaining an always-open streaming connection poses risk
* Maintain control over frequency and when to initiate a network call

:::warning[Streaming is currently supported for the below SDKs with the minimum version shown below.]

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
| Client-side | <ul><li> Designed to be used by a single traffic type in the browser, mobile device, or mobile application </li><li>Intended to be used in a potentially less secure environment</li><li>This includes Harness FME's JavaScript, iOS, and Android SDKs </li></ul>  | 
| Server-side | <ul><li> Designed to work for multiple traffic types, like users or customers (many of them per SDK) as opposed to client-side that are bound to one (typically a single user or account in session)</li><li>Intended to be used in a secure environment, such as your infrastructure </li></ul> |

## Security considerations

Client- and server-side SDKs have different security considerations:
 
| **Type** | **Security Considerations** |
| --- | --- | 
| Client-side | <ul><li> These SDKs run on the browser or in a mobile device, they can be compromised by users unpacking a mobile app or use the browser's developer tools to inspect the page </li><li>Client-side SDK APIs are more restricted in regards to what information they can access because it's a less secure environment <br />For example, client-side SDKs uses a specific endpoint (/mySegments) which only returns a list of segments in which the key used during instantiation is included. This provides for a much smaller amount of data, allowing for a smaller memory footprint in memory constrained environments of the browser and mobile apps </li></ul>| 
| Server-side | <ul><li> These SDKs operate within your own infrastructure making them not accessible by end users </li><li>When targeting by private or sensitive data on the server-side, this information won't leave your infrastructure, keeping your sensitive data under your control </li></ul>|

## API keys

Typically, you need one API key token per FME environment, and additionally, you may want to issue extra API keys per microservice of your product using Harness FME for better security isolation. You must identify which type of SDK you're using to ensure you select the appropriate API key type.
 
Within Harness FME, the following three types of keys each provide different levels of access to Harness FME's API: 
 
| **Type** | **Overview** |
| --- | --- | 
| Server-side | <ul><li> Configure server-side SDKs to use a server-side api key </li><li>Grants access to fetch feature flags and segments associated within the provided API key's environment </li><li>Never expose server-side keys in untrusted contexts </li><li>Do not put your server-side API keys in client-side SDKs </li><li>If you accidentally expose your server-side API key, you can revoke it in the API keys tab in Admin settings </li></ul>| 
| Client-side | <ul><li> Configure client-side SDKs to use the client-side api key </li><li>Grants access to fetch featuer flags and segments for the provided key within the provided API key's environment </li></ul>|
| Admin | <ul><li> Use for access to Harness FME's developer admin API </li><li>This key provides broader access to multiple environments unlike the other API keys that are scoped to a specific environment </li><li>Do not share this API key with your customers </li><li>If you accidentally expose your admin API key, you can revoke it in the API keys tab in Admin settings </li></ul>|

## Supported SDKs

Using Harness FME involves using one of our SDKs. The Harness FME team builds and maintains these SDKs for some of the most popular language libraries and are available under open source licenses. Go to our GitHub repository for more information.

| **SDK** | **API Key/Type** | **Links** |
| --- | --- | --- | 
| Android | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk) & [GitHub](https://github.com/splitio/android-client) | 
| Angular utilities | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/angular-utilities) & [GitHub](https://github.com/splitio/angular-sdk-plugin) |
| Browser | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk) & [GitHub](https://github.com/splitio/javascript-browser-client) |
| Flutter plugin | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/flutter-plugin) & [GitHub](https://github.com/splitio/flutter-sdk-plugin) |
| iOS | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-sdk) & [GitHub](https://github.com/splitio/ios-client) | 
| JavaScript | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk) & [GitHub](https://github.com/splitio/javascript-client) | 
| React | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk) & [GitHub](https://github.com/splitio/react-client) | 
| React Native | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-native-sdk) & [GitHub](https://github.com/splitio/react-native-client) |
| Redux | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/redux-sdk) & [GitHub](https://github.com/splitio/redux-client) | 
| Elixir Thin-Client | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/elixir-thin-client-sdk) & [GitHub](https://github.com/splitio/elixir-thin-client) |
| GO | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/go-sdk) & [GitHub](https://github.com/splitio/go-client) | 
| Java | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk) & [GitHub](https://github.com/splitio/java-client) |
| .NET | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/net-sdk) & [GitHub](https://github.com/splitio/.net-core-client) | 
| Node.js | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk) & [GitHub](https://github.com/splitio/javascript-client) | 
| PHP | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-sdk) & [GitHub](https://github.com/splitio/php-client) | 
| PHP Thin-Client | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-thin-client-sdk) & [GitHub](https://github.com/splitio/php-thin-client) |
| Python | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk) & [GitHub](https://github.com/splitio/python-client) | 
| Ruby | server-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/ruby-sdk) & [GitHub](https://github.com/splitio/ruby-client) | 

## Evaluator service

For languages with no native SDK support, Harness FME offers the Split Evaluator, a small service capable of evaluating all available features for a given customer via a REST endpoint. This service is available as a Docker container for ease of installation and is compatible with popular framework like Kubernetes when it comes to supporting standard health checks to achieve reliable uptimes. Learn more about the [Split evaluator](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-evaluator).

## Synchronizer service

By default, Harness FME's SDKs keep segment and feature flag definitions synchronized in an in-memory cache for speed at evaluating feature flags. However, some languages do not have a native capability to keep a shared local cache of this data to properly serve treatments. For these cases, we built Split Synchronizer to maintain an external cache like Redis. To learn more, read about [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer).

## Proxy service

Split Proxy enables you to deploy a service in your own infrastructure that behaves like Harness servers and is used by both server-side and client-side SDKs to synchronize the flags without directly connecting the Harness backend.

This tool reduces connection latencies between the SDKs and Harness servers, and can be used when a single connection is required from a private network to the outside for security reasons. To learn more, read about [Split Proxy](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy).

## Supported agents

Harness FME real user monitoring (RUM) agents collect detailed information about your users' experience when they visit your application. This information is used to analyze site impact, measure the degradation of performance metrics in relation to feature flag changes and alert the owner of the feature flag about such degradation.

| **Agent** | **API Key/Type** | **Docs** |
| --- | --- | --- | 
| Android | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent) |
| iOS | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/ios-rum-agent) |
| Browser | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent) |