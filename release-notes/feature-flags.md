---
title: Feature Flags release notes
sidebar_label: Feature Flags
date: 2023-08-03T10:00:25
tags: [NextGen, "feature flags"]
sidebar_position: 6
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/feature-flags/rss.xml" />

Review the notes below for details about recent changes to Harness Feature Flags (FF). For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.


:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::

## Latest - August 3, 2023

<Tabs>
  <TabItem value="What's new">

This release does not include new features.


  </TabItem>
  <TabItem value="Early access">

This release does not include early access features.


  </TabItem>
  <TabItem value="Fixed issues">

#### Feature Flags server, version 1.1078.1

* Due to an error with gitSync logic on environment creation, the activation for the new environment did not get properly created when GitSync was enabled. (FFM-8812) 
  
  To resolve this, we:
  - Fixed the gitSync function for newly created environment.
  - Added gitSync for deleted environments. 

* Sending a GET request to the /targets/${IDENTIFIER} endpoint returned a 200 error code, even if the target didn't exist. This error code has been changed to 404. (FFM-8810)

* Previously, a multivareate flag's variation values had an erroneous maximum limit of 2704 bytes, with a poor error message if this was exceeded. 
This limit has been raised to 25000 bytes, with a clear error message if this is exceeded. (FFM-8660)

* Targets sent by the server-side SDKs were not being updated in the database. This meant if a sever-side target changed, while evaluations worked as expected, the updated attributes were not shown in the UI. This fix ensures targets are correctly upserted. (FFM-8600)


  </TabItem>
</Tabs>

## Previous releases

<details>
<summary>2023 releases</summary>

#### July 27, 2023

##### What's new

###### Feature Flags UI

* When specifying percentages for a rollout, the UI now provides feedback while you edit to let you know the percentage that requires assignment. (FFM-8085)

##### Early access

This release does not include early access features.

##### Fixed issues

#### Feature Flags UI

* Fixed an issue where the API call was triggered twice in the front end when creating a flag. (FFM-8192)

#### July 24, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Ruby** server SDK has been updated to version **1.1.3** with the following updates.

* Fixed an issue where if no attributes were given in the target, the SDK sometimes threw a TypeError exception when processing rules. (FFM-8725)

#### July 21, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Android** client SDK has been updated to version **1.1.3** with the following updates.

* The SDK's cache has been rewritten to improve its stability. (FFM-8630)

* The gradle wrapper has been included in the SDK repository so that users can build without having to install gradle. (FFM-7868)

#### July 20, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

* The **.NET** server SDK has been updated to version **1.1.9** with the following update.

  * Fixed an issue where using the relay proxy caused the SDK to crash. (FFM-8686)

* The **Ruby** server SDK has been updated to version **1.1.2** with the following update.

  * There was an issue where if a feature flag was configured to use a custom attribute with the `IN` operator clause, the `IN` operator didn't work correctly. This issue has been fixed. (FFM-8670)

#### July 19, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

The Feature Flags server has been updated to version **1.1077.0** with the following updates.

* Previously, the developer count reported under the Feature Flags license usage page (**Account Settings > Subscriptions > Feature Flags > License Count**) included a 'System' user that should not be counted towards the customer's total count of developers. This fix excludes the 'System' user from the count. (FFM-8658)

* Previously, targets sent by the server-side SDKs were not being updated in the database. This meant if a server-side target changed, evaluations worked as expected, but the updated attributes were not shown in the UI. This fix ensures targets are correctly updated. (FFM-8600)

#### July 18, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Android** client SDK has been updated to version **1.1.2** with the following update.

* There was an issue where the python SDK failed when connecting to the proxy. When connecting to Harness SaaS, the SDK extracts the `accountID` from the auth response and adds it to a header in all future requests. The `accountID` is not availabe to the SDK when connecting to the proxy, so it failed due to its absence. This fix ensures the SDK skips the header if `accountID` does not exist. (FFM-8686)

#### July 17, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Python** server SDK has been updated to version **1.2.2** with the following update.

* Fixed an issue where the SDK was crashing when used with the relay proxy. (FFM-8544)

#### July 14, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js** server SDK has been updated to version **1.3.1** with the following updates.

* Previously, calling waitForInitialization was resolving before the SDK was fully initialized, leading to default values being served until initialization completes. This issue has been fixed. (FFM-8615)

#### July 13, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

#### Feature Flags server

The Feature Flags server has been updated to version **1.1076.0** with the following updates.

* Fixed an issue where the query parameter `identifier` in the API `https://app.harness.io/gateway/cf/admin/segments` did not work correctly. (FFM-8298)

* The flag pipeline was not updating the build number. This issue has been fixed. (FFM-8140)

* Target attributes were not updating on conflict. This issue has been fixed. (FFM-8549, ZD 46770)

#### July 4, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

* The **Java** server SDK has been updated to version **1.2.4** with the following update.

  * Fixed an issue where, if a flag had prerequisite flags configured, only the first prerequisite flag was being processed and the remaining were being ignored. (FFM-6412)

The **Python** server SDK has been updated to version **1.2.1** with the following update.

  * The SDK incorrectly logged low level debug information as errors. This issue has been fixed. (FFM-8544)

#### July 3, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

##### Feature Flags SDKs

* The **Erlang** server SDK has been updated to version **2.0.1** with the following update.

  * Some SDK dependencies were not included in releases created by `mix`. This issue has been fixed. (FFM-8364)

* The **Android** client SDK has been updated to version **1.1.1** with the following updates.

  * Removed the following error, which is reported by Gradle's Lint task. (FFM-8551)

    `checkClientTrusted is empty, which could cause insecure network traffic due to trusting arbitrary TLS/SSL certificates presented by peers`

  * Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections. (FFM-7037)

* The **iOS** client SDK has been updated to version **1.1.0** with the following updates.

  * The following methods now have an alternative overloaded version that allows you to get the result of the flag directly in the return value, without the need to provide a closure block. (FFM-8056)

    * stringVariation()
    * boolVariation()
    * numberVariation()
    * jsonVariation()

  * Added TLS support for custom/private certs in the iOS SDK for config, stream and metric endpoints. (FFM-7015)

    The CfConfigurationBuilder now has new methods for taking a list of X.509 certificate authority (CA) certs. This list must also include any intermediate CAs the Apple security APIs may need to resolve the full trust chain. 

    For custom certificates, you must also ensure that the Subject Alternative Names (SANs) are set up correctly in the CA for domain name validation to pass.

    The new function setTlsTrustedCAs() takes a list of X.509 CA certificates in PEM format, which will be used to verify the server's web cert sent during TLS handshake. Each PEM certificate must include the BEGIN/END CERTIFICATE headers.

  * Made the following improvements. (FFM-8045)

    *  Added standardized SDK error codes for events such as initialization, authentications, etc. For a full list, go to [Troubleshooting](/docs/feature-flags/ff-sdks/client-sdks/ios-sdk-reference#troubleshooting).
    * Added general improvements to logging statements, reducing verbose logging to the console. 
    * Added support for configurable custom loggers. For code examples, go to the [SDK repository](https://github.com/harness/ff-ios-client-sdk/blob/main/docs/further_reading.md#custom-loggers).

  * Added retries for the authentication, and other endpoints. Network timeouts and certain HTTP error codes will be retried with a random delay up to 3 times. (FFM-8049)

  * Added a new API, refreshEvaluations(), that can be called by a mobile app coming to the foreground to update any SSE events that were missed while the app was suspended. (FFM-8160)

  * It is no longer necessary to call registerEventsListener() to start listening to events—calling initlialize() should be enough. (FFM-8106)

  * When a target group is created Harness sends an event to connected SDKs to refetch all flags. The IOS SDK previously didn't do this refetch, and now does. (FFM-8137)

  * Previously, when a target group event was received the SDK fetched all flags, but did not return an event so that apps could be updated accordingly. With this fix, in this case, the SDK returns the onPolling event after all flags are fetched. (FFM-8174)

  * Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections. (FFM-8048)

#### June 30, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Erlang** server SDK has been updated to version **2.0.0** with the following updates.

:::caution
The following are breaking changes for Erlang applications only.  

* Due to a new dependency on a murmur3 hashing library implemented in Elixir, the following is now required to use the SDK in Erlang applications:

  * Elixir version 1.13.4 or above must be installed on your build system when compiling your application.

  * Rebar3 `rebar_mix` must be installed in your Rebar3 plugins.

  For full details, go to [Install the SDK for Erlang applications](/docs/feature-flags/ff-sdks/server-sdks/erlang-sdk-reference/#for-erlang-applications).

This update does not affect Elixir applications, and no further action is required for Elixir applications upon upgrading to this version of the SDK.
:::

These changes are part of issue FFM-8364:

* Enhancement: Implemented retry logic for authentication, polling, and metrics services for resilience and fault tolerance.
* Enhancement: Changed supervisor restart intensity from 1 restart in 5 seconds to 4 restarts in 5 seconds.
* The murmur3 nif library has been replaced by pure Elixir library.

#### June 28, 2023

##### What's new

###### Feature Flags UI

* On the **Feature Flags** page, when viewing the state of flags across all environments, the flag status column now scrolls all the rows as one. This makes it easier to view flag and environment states on one screen. (FFM-7643)

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Python** server SDK has been updated to version **1.2.0** with the following updates. (FFM-8300)

  * To improve performance, the SDK now sends targets to the metrics service in batches of 1000. Up to 200 batches, or 200K unique targets, can be sent in the metrics window. This is not user-configurable, and is controlled through the SDK. For more information, go to [Feature Flag FAQs](/docs/frequently-asked-questions/harness-faqs/harness-feature-flag-faqs#how-does-the-metric-aggregatebatch-the-data-before-sending-it-to-harness).

  * The SDK no longer allows `events_sync_interval` to be set below 60 seconds. If it is, the value defaults to 60 seconds.

#### June 26, 2023

##### What's new

This release does not include new features.  

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js** server SDK has been updated to version **1.3.0** with the following updates.

* The following changes are included in issue number FFM-8289:

  * Added validation to the JWT token returned by the Feature Flags authentication service.
  * Previously, if the SDK failed to authenticate with the Feature Flags service, the SDK crashed. With this fix, the SDK now logs a warning and serves the default variations you provided in your evaluation calls.
  * Added a list of codes that are logged for each lifecycle event of the SDK, such as initialization, authentication, and so on. For a full list of codes, go to [Troubleshooting](/docs/feature-flags/ff-sdks/server-sdks/node-js-sdk-reference#troubleshooting).


#### June 22, 2023

##### What's new

This release does not include new features.  

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **JavaScript** client SDK has been updated to version **1.14.0** with the following update.

* Added a new function, `refreshEvaluations()`, which can be called to programmatically trigger a full refetch of evaluations from the server. (FFM-8141)

#### June 21, 2023

##### What's new

This release does not include new features.  

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server/UI

The **FF server** has been updated to version **1.1075.0** with the following updates.

* The Activity tab on the flag detail page was sometimes slow to load on flags with many (hundreds) of historical changes. This has been resolved, and this tab's loading times are improved. (FFM-8256)

* On the flag detail page, Flag Pipeline tab, the pipeline execution list was sorted with most recent executions last. This ordering has been reversed so that the most recent pipeline executions are shown first. This allows pending executions to be viewed at the top.

* Where users had multiple target rules, in certain circumstances users couldn't delete these rules when the wrong IDs were returned. This fix addresses the problem of the incorrect IDs being returned, and ensures the targets can be removed.

###### Feature Flags SDKs

The **Python** server SDK has been updated to version **1.1.16** with the following updates.

* Previously, if the SDK evaluated flags with a large amount of targets (tens of thousands), the SDK could encounter `read_timeout` errors. This fix increases the HTTP timeout of the SDK, and imposes a limit of 50,000 on the number of targets that can be sent to the UI. (FFM-8231)

  **Known issue** - We are working on resolving the following issue in a future version:

  * During a metrics interval, if you evaluate flags with more than 50,000 unique targets (based on identifier, name and attributes), then only the first 50,000 targets get sent in the request to the metrics API. This means that the targets that are not included in the request do not appear in the UI, but when they are included in evaluations during subsequent metrics intervals, they will be correctly registered in the UI.

#### June 19, 2023

##### What's new

###### Feature Flags UI

* In the onboarding flow, we added a new button and text box for a new project when there are no environments created. (FFM-7393)

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags UI

* The view in the modal screen for setting up GitEx was not wide enough to show appropriate errors. This issue has been fixed. (FFM-7311)

* The Create a new flag button did not behave as expected on the onboarding screen if there were existing flags. This issue has been fixed. (FFM-8019)

###### Feature Flags SDKs

* The **Java** server SDK has been updated to version **1.2.3** with the following updates.

  * There were reports of customers having difficulty running the SDK because of a missing dependency, `oksse`. Unless users have the JitPack repo in their POM/Gradle file, they are likely to have this problem at compile time. With this fix, we've removed the `oksse` dependency and now use `okhttp-sse` instead. (FFM-5915)

  * Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections. (FFM-7037)

  * Updated the `maven-model` dependency to version 3.5.0 to remove the CVE-2022-4245 vulnerability. (FFM-8133)

  * Updated to the latest version of Guava, 32.0.1-jre, to remove security issues. (FFM-8233)

* The **Android** client SDK has been updated to version **1.1.0** with the following updates.

  * Added a new API to allow SDK users to provide a trusted TLS CA certificate for connecting to Feature Flag services with private root CAs. (FFM-7008)

  * Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections. (FFM-7037)

  * Fixed broken links in the first time setup documentation. (FFM-7867)

* The **.NET** server sdk has been updated to version **1.1.8** with the following updates.

  * Added additional headers to SDK HTTP requests for better analytics. (FFM-7477)

  * Reworked metrics caching to use a map instead of a queue. This improves memory usage and performance. (FFM-7475)

  * We now send the SDK version information with the metrics payload for better analytics and tracking. (FFM-6904)

  * Added logging when a default evaluation is served. (FFM-7473)

  * Standardized and improved Logging across the SDK. (FFM-7472)

  * Fixed error handling when a null target is passed in. (FFM-8128)

#### June 14, 2023

##### What's new

###### Feature Flags SDKs

Updated the ff-flutter-client-sdk version 2.0.0 to use null safety. (FFM-8222)

Flutter 2.0 and Dart 2.12 and later are required. For more information, go to [Sound null safety](https://dart.dev/null-safety) in the Dart documentation.

##### Early access

This release does not include early access features.

##### Fixed issues

#### Feature Flags SDKs

Updated the ff-erlang-server-sdk to version 1.1.0 to add an optional logging configuration option so that the logging level can be set for the SDK. (FFM-8217)

If this option is not set, the SDK uses the default log level of `warning`. To see an example logging configuration, go to [the SDK readme](https://github.com/harness/ff-erlang-server-sdk/blob/main/README.md#set-logging-level).

#### June 9, 2023

##### What's new

###### Feature Flags SDKs

* To aid in debugging, we added a list of codes logged for each lifecycle of the SDK. (FFM-7363)

  Some of the lifecycle events these codes cover are:

  * Initialization
  * Authentication
  * Polling
  * Streaming
  * Evaluation
  * Metrics
  * Close

For a full list of codes, go to [Troubleshooting](/docs/feature-flags/ff-sdks/server-sdks/python-sdk-reference/#troubleshooting).

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Python** server SDK has been updated to version **1.1.15** with the following update.

* Previously, the SDK crashed if `client.close()` was called at any point before a stream event was sent to the SDK. With this fix, the SDK closes all threads correctly. (FFM-7363)

###### Feature Flags UI

* In the user onboarding flow, the Create a New Flag button did not behave as expected. This issue has been fixed. (FFM-8019)

* Previously, a user could select Feature Flags in Harness without having a license, and would then get a 404 error. Now, users only see the FF module if they have an active license (including a free license). (FFM-8002)

* Previously, there was an edge case where an extremely large number of pages in a UI listing could cause performance degradation. This issue has been fixed, and page numbering is now disabled if the page count exceeds 1000 pages. (FFM-7993)

* There was an issue where toggling between the Targets and Target Groups pages caused the new page to re-render. This issue has been fixed. (FFM-7965)

#### June 8, 2023

##### What's new

###### Feature Flags SDKs

The **React** client SDK has been updated to version **1.4.0** with the following enhancements. (FFM-6920)

* Added a new [useFeatureFlagsLoading](https://github.com/harness/ff-react-client-sdk#usefeatureflagsloading) hook to allow apps to react to changing of loading state.

* Added a new [TestWrapper](https://github.com/harness/ff-react-client-sdk#testing-with-jest) testing component to allow easy mocking of the network portion of the SDK for use in [Jest](https://github.com/harness/ff-react-client-sdk#testing-with-jest) unit tests.


##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **React** client SDK has been updated to version **1.4.0** with the following updates. (FFM-6920)

* Updated the included JavaScript SDK from version 1.10.0 to version 1.13.0.

* Refactored all hooks and Higher Order Components (HOCs) to ensure proper triggering of metrics.

#### June 7, 2023

##### What's new

This release does not include new features. 

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

* The **Node.js** server SDK has been updated to version **1.2.17** with the following update.

  * Previously, when `client.close()` was called, the SSE stream was not terminated. This fix ensures that the SSE stream is properly terminated. (FFM-8116)

#### June 5, 2023

##### What's new

###### Feature Flags SDKs

* The **Python** server SDK has been updated to version **1.14** with the following updates.

  * The SDK now sends extra headers to backend requests to aid in diagnostics. (FFM-7362)

  * The SDK now retries on failed client authentication requests for specific HTTP errors. If client authentication fails, the SDK serves the default values you provide in `variation` calls. (FFM-7177)

##### Early access

This release does not include early access features.

##### Fixed issues

This release does not include fixed issues.

#### June 1, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags UI

* Previously, display of the FF module depended on an internal Harness feature flag. Now, display of the FF module is instead based on having an active license (including 'free'). (FFM-7866)

* Previously when a new user was onboarding in the Feature Flags page, when they selected **Get Started**, they saw a dropdown of flags, even though they hadn't created any flags yet. Now, when users do not have any existing flags, they see a text box that prompts them to create one.

###### Feature Flags SDKs

* The **iOS** client SDK has been updated to version **1.0.4** with the following updates.

  * Fixed the stream connection to have a read timeout of 60 seconds. This enables stale connections to be detected and closed, and retries to be started for polling/SSE connections. (FFM-8051)
  * Fixed a nil pointer dereference bug that caused the SDK to crash under certain conditions. (FFM-8034)

#### May 25, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

The **FF server** has been updated to version **1.1071.0** with the following updates.

* For customers with a large volume of targets (in the millions), the Target page load time could be slow. Harness has introduced additional indexes to improve the response time of this page. (FFM-7988)

* There was an issue when Git Sync was first configured, a sync was not attempted until a flag was changed or a new one was created. With this fix, a sync is immediately attempted when you configure Git Sync, and the existing flags in your project are backed up to the remote file. (FFM-7681)

###### Feature Flags SDKs

The **Python** server SDK has been updated to version **1.1.12** with the following update.

*  There was an issue where if an error occurred when processing a new stream event, the SDK could potentially log a blank string. This issue has been fixed and the SDK now logs these errors correctly. (FFM-8015)

#### May 24, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

#### Feature Flags SDKs

The **Python** server SDK has been updated to version **1.1.11** with the following update.

* Fixed an issue where the SDK was not evaluating flags with multiple and/or nested prerequisites correctly.

#### May 23, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags UI

* The toggle for turning Git Sync on and off was causing the branch settings menu to disappear and display the **Set Up Git Sync** button incorrectly. This issue has been fixed. (FFM-7786)
* The Target and Target Group pages reported successful save and edit operations before the operations completed. This issue has been fixed. (FFM-7609)

#### May 22, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Ruby** server SDK has been updated to version **1.1.1** with the following updates.

* Fixed evaluator logic. Before, if a target group had multiple clauses, all clauses had to evaluate to true for the entire condition to be true. This logic has been changed to match that of other SDKs. Now only one condition clause needs to be true. (FFM-6503)

* Certain log messages will now be coded with a unique 4-digit number to help identify issues across SDKs. (FFM-7324)
  
  Response code patterns for each SDK stage are:
  * Initialization - 1xxx
  * Auth - 2xxx
  * Close - 3xxx
  * Polling - 4xxx
  * Streaming - 5xxx
  * Evaluation - 6xxx
  * Metrics - 7xxx

#### May 19, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

The **FF server** has been updated to version **1.1054.2** with the following update.

* The Identifier search filter sometimes incorrectly used a wildcard match. This happened if two flags had overlapping names such as `flag_one` and `flag_one_b`. The detail view of `flag_one_b` sometimes returned `flag_one` details instead. Because flags order by creation, this only happened when flags were created in a certain order. This fix uses an exact match when searching for flag identifiers. (FFM-7928)

#### May 15, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

* Previously, re-enabling Git Experience did not trigger an immediate Git sync. With this change, flags are synchronized as soon as Git Experience is re-enabled. (FFM-7670)

* Some Git sync operations were failing if there was a large volume of flags and environments. This fix increased the transaction time-out for Git sync calls to allow processing of a large number of the flags. (FFM-7638)

* Policy checks weren't being carried out on flag rules added from the Target Group details page. This issue has been fixed. (FFM-7607)(FFM-7606)

* Previously, Feature Flag permissions and roles assigned to users or user groups in Access Control were applied at the account and project levels, but not at the organization level. With this change, roles and permissions assigned at the organization level are now honored. (FFM-7376)

* When you try to delete a flag that is a prerequisite to another flag, the UI now shows an improved message that explains why this cannot be done: *Cannot delete flag which is a prerequisite for other flags*. (FFM-5105)

#### May 4, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

* Fixed an issue in the onboarding flow where the flag validation did not work as expected. (FFM-7534)

#### April 26, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js** server SDK was updated to version **1.2.16** with the following update:

* The eventsource library was opening three separate streams instead of one when the library disconnected and reconnected. This issue has been fixed. (FFM-7412)

#### April 22, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

##### Feature Flags UI

* Fixed an issue where the metrics loading spinner was hanging indefinitely. (FFM-6735)

* Updated the field validation for the **YAML path** field in the Git connection form to prevent entering invalid path names beginning with `./`. (FFM-7448)

#### Latest - April 11, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

##### Feature Flags UI

* Fixed an issue where the metrics loading spinner was hanging indefinitely. (FFM-6735)

* Updated the field validation for the **YAML path** field in the Git connection form to prevent entering invalid path names beginning with `./`. (FFM-7448)

#### April 11, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags UI

Fixed an issue where users with reduced access could not create Feature Flags SDK Keys as a result of a permission mismatch between the frontend and backend. (FFM-7295)

#### April 10, 2023

##### What's new

* The UI now provides improved RBAC messaging when trying to toggle or edit a flag in an environment without the correct permissions. (FFM-7234)

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

The **FF server** has been updated to version **1.1007.0** with the following updates.

* Previously, the number of flags returned in the **Target Management** page was capped at 100.  This change lets Harness show all flags even if the number is greater than 100. (FFM-7457)
* Feature Flag identifiers now follow the same guidelines as the Harness Platform entities. This means they can include a `$` in the name. (FFM-7436)
* Previously, FF was only checking permissions at the account and project level. With this update, permissions and roles assigned at the organization level will also be honored. (FFM-7376)


#### April 5, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

* The **Python** server SDK has been updated to version **1.1.10** with the following update.
  * The SDK now logs an error if an evaluation fails and the default variation is returned. (FFM-7360)

* The **Ruby** server SDK has been updated to version **1.1.0** with the following updates.
  * Metrics counters are now stored in a map, instead of a queue, for more efficient memory usage. The metric payload size should now also be smaller, resulting in more efficient network bandwidth usage. (FFM-7285)
  * Improved the authentication retry logic to only retry on certain HTTP codes. Certain error codes will be treated as transient and others not. Ensured that while the SDK is authenticating, default values are served. (FFM-7325)
  * Added a Ruby on Rails example in the SDK [repository](https://github.com/harness/ff-ruby-server-sdk). (FFM-6926)
  * Disabling the metrics processor didn't disable entries being written to the queue, causing an eventual memory leak. This fix corrects this behavior. (FFM-6965)
  * Added TLS support to the SDK and updated the documentation in the SDK [repository](https://github.com/harness/ff-ruby-server-sdk).

* The **Apex** server SDK has been updated to version **beta 0.5.1** with the following update.
  * The JSON parsing code was unable to parse the fields `createdAt` and `modifiedAt` in the Target Segment response, because the values were too large for an Integer data type. This issue has been fixed. (FFM-7812)

#### April 4, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js** server SDK was updated to version **1.2.15** with the following update.

* Occasionally, the retry strategy could open several event streams at once if the application disconnected intermittently. This issue has been fixed and the SDK opens only one stream when the EventSource library reconnects. (FFM-7412)
* The EventSource library was updated to version 2.1.4. (FFM-7421)

#### March 30, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

The **FF server** has been updated to version **1.979.0**, with the following update.

* Before this update, targets never expired. Now, targets expire if they have not been updated for 60 days, except when used in flag rule, or when part of a target group's include/exclude lists. For more information, go to [How targets expire](/docs/feature-flags/ff-target-management/add-targets#how-targets-expire).

###### Feature Flags SDKs

* The **Java server SDK** has been updated to version **1.2.2**, with the following updates.

  * Minor internal changes were made to make it easier for developers to use classes that were previously marked private.

* The **Go server SDK** has been updated to version **0.1.8** with the following update.

  * Previously, a few logs on startup would use fmt.Println() instead of using the custom logger passed in via harness.WithLogger(logger). This could cause these startup logs to be in a different format, and appear to be logged at an `error` level instead of logged correctly as `debug`. This has been resolved and all logs emitted by the SDK now go through the custom logger if it's passed in. (FFM-7347)

#### March 29, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Go server SDK** has been updated to version **0.1.7**, with the following updates.

* Previously if a custom logger was passed in to the SDK through the harness.WithLogger(logger) function, the custom logger was not used when logging HTTP requests. This could cause HTTP request logs to be in a different format, and appear to be logged at an `error` level instead of correctly logged `debug`. This has been resolved, and all logs emitted by the SDK now go through the custom logger if it's passed in. (FFM-7327)

* Added a flag code cleanup example and some information on how to run the example in the [Go SDK repository](https://github.com/harness/ff-golang-server-sdk). (FFM-6794)

* Added documentation in the [Harness flag_cleanup repository](https://github.com/harness/flag_cleanup) on how to clean up flags automatically using Harness pipelines. (FFM-6796)


#### March 28, 2023

##### What's new

The [**Erlang server SDK**](/docs/feature-flags/ff-sdks/server-sdks/erlang-sdk-reference), which was in Beta, has been released as GA with version **1.0.0**. This release includes the following updates.

* **Breaking changes**

  - Changes to mulit-instance behavior. Go to the [Readme](https://github.com/harness/ff-erlang-server-sdk#run-multiple-instances-of-the-sdk) for updated instructions and code samples for the following:
    - If you define a multi-instance configuration, and one of the instances (including the default instance) fails to authenticate, then the other instances do not attempt to start, and the SDK does not boot.
    - You can choose not to start the default instance.

* **Enhancements**
  - The SDK is now available on [hex.pm](https://hex.pm/).
  - Improved logging for debugging purposes

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Erlang server SDK** was released as GA, version **1.0.0**, and includes the following bug fix:

* There was an issue in multi-instance functionality that prevented users from starting up multiple instances. This issue has been fixed. (FFM-7187)

#### March 23, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js server SDK** has been updated to version **1.2.14** with the following updates:

* The EventSource library was updated to version 2.1.3. (FFM-7198)
* On streaming errors, the error was not included in the `retrying` event payload. This fix adds the error to the payload. (FFM-7198)
* Checks were added to see if errors are eligible for retries, and if not, the SDK stops retrying. (FFM-7198)
* The SDK now logs each retry. This ensures the most recent error is logged if errors change during retries. (FFM-7198)


#### March 23, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js server SDK** has been updated to version **1.2.13** with the following update:

* A race condition during initialization could cause some flag evaluation calls (when called immediately after calling waitForInitialization) to return the default value instead of the actual evaluated value. This issue has been fixed. (FFM-7289) 


#### March 21, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags server

The **FF server** has been upated to version **1.968.0** and includes the following updates:

* When searching for a flag, the search filter sometimes failed if the flag description was null rather than empty. This issue has been fixed. (FFM-7213)
* When using GitSync to save a flag with a floating point value, the feature flag service generated an error.
The service now correctly handles floating point numbers saved from Git. (FFM-7118)


#### March 16, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Java server SDK** has been updated to version **1.2.1** and includes the following update:

* When an SDK key was not supplied, the SDK continually retried. This issue was fixed and now, if authentication fails, the SDK no longer retries constantly, and instead generates a MissingSdkKeyException. (FFM-7214)


#### March 15, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Node.js server SDK** has been updated to version **1.2.12** and includes the following update:

* The event source was updated to version 2.1.2. This adds eligible errors to the `retrying` event payload. (FFM-7198)

#### March 09, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The **Java server SDK** has been updated to version **1.2.0** and includes the following updates:

* Improved support for TLS allows custom CA certificates to be provided. (FFM-7004)
* A new HTTP header, `Harness-SDK-Info`, was added. This header helps the Feature Flag service identify connected client SDKs apart from server SDKs. (FFM-7038)
* Error handling for invalid SDK keys has been improved. (FFM-6964)

#### March 08, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags UI

- Onboarding examples displayed a flag name instead of the required flag identifier. This issue is now fixed. (FFM-6921)

#### March 02, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The **Node.js server SDK** has been updated to version **1.2.11** and includes the following updates:

- All three retry strategies no longer fire off their initial retry at the same time. (FFM-7002)
- The eventsource library now closes correctly if `eventsource.close` is called while it's in a RETRYING state. (FFM-7002)
- The SDK no longer retries on 40x errors. It now only retries on 50x and I/O errors. (FFM-7002)


#### February 24, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The **Node.js server SDK** has been updated to version **1.2.10** and includes the following updates:
- The Node.js SDK uses the eventsource library. **In rare cases**, an issue occurred when a 500 response was received from the remote system, the connection seemed to close and stop retrying. However, if it received an unspecified error, for example if the endpoint doesn’t exist or goes down suddenly, or if the remote system closed the connection, then the SDK tried to connect to the /stream endpoint every second, forever. This issue was resolved with the following updates:

  - The SDK now falls back to polling if the stream disconnects. (FFM-4204)
  - The SDK attempts to reconnect on retryable errors using an exponential backoff and retry strategy provided by the Harness fork of eventsource. (FFM-4204)
  - A new retry event is emitted so the SDK can log the current retry attempt. (FFM-4204)

#### February 21, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The **Python server SDK** has been updated to version **1.1.9** and includes the following update:
* SSE updates were stopping due to a lost connection. Now, the SSE connection is reestablished if it drops. (FFM-6932) 

#### February 15, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The **.NET server SDK** has been updated to version **1.1.7** and includes the following updates:

* The default poll interval was corrected from 20 seconds to 60 seconds, consistent with the other SDKs. (FFM-3691)
* The SSE EventSource was not detecting that a connection may have dropped. The SDK will now reconnect correctly if it loses its connection to the stream endpoint. (FFM-6877)

#### February 9, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

- The **Flutter client SDK** has been updated to version **1.0.10** and includes the following updates:
  - This SDK now uses Android SDK 1.0.20. (FFM-6822)
  - This update fixes excessive network calls when calling flag evaluation functions. (FFM-6822)

- The **Python server SDK** has been updated to version **1.1.8** and includes the following updates:
  - Added `wait_for_initialization` to the client API, which can be called to block the thread until all groups and flags have been retrieved and loaded into the cache. (FFM-6549)
  - Added `is_initialized` to the client API, which can be called at any time to check if the initial retrieval and caching of groups and flags has been completed. (FFM-6549)

  :::info note
  For an example usage of `wait_for_initialization` go to [the SDK's repository](https://github.com/harness/ff-python-server-sdk/blob/main/examples/wait_for_initialization_example/wait_for_initialization.py).
  :::


#### February 6, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flags UI

* The **Complete** button at the end of the onboarding flow was always enabled. Now, it is disabled until the user receives a successful evaluation. (FFM-5987)

###### Feature Flag SDKs

The **Python SDK** has been updated to version **1.1.7** and includes the following new feature:

* When adding targets to a group based on conditions, the `in` operator is now case-sensitive in the SDK. (FFM-5991)

  :::info note 
  If you are targeting any groups using the `in` operator, ensure that your target condition takes into account the case sensitivity of the operator.
  :::

#### January 27, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The **Java server SDK** has been updated to version **1.1.11** and includes the following changes:

- Timeout errors were logged due to the code calling `awaitTermination()` before `shutDown()` when stopping the update processor. There was also a misleading warning about the poller not being restarted. These issues have been fixed. (FFM-6581)


#### January 26, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flag SDKs
- The **React client SDK** has been updated to version **1.1.0** and includes the following changes:
  - You can now listen for errors that are caused by network issues. For more information about this, go to [the SDK's readme file.](https://github.com/harness/ff-react-client-sdk/blob/main/README.md) (FFM-6578)
  - You can now provide the SDK with a set of evaluations that it can serve instantly upon initialization. For more information about this, go to [the SDK's readme file.](https://github.com/harness/ff-react-client-sdk/blob/main/README.md) (FFM-6578) 

- The **Javascript client SDK** has been updated to version **1.8.0** and includes the following change:
  - You can now provide the SDK with a set of evaluations that it can serve instantly upon initialization. For more information about this, go to [the SDK's readme file.](https://github.com/harness/ff-javascript-client-sdk/blob/main/README.md) (FFM-6489)

- The **Android client SDK** has been updated to version **1.0.19** and includes the following changes:
  - A new event was added, `SSE_RESUME`, which fires if the application loses and regains internet.  When the event fires: 
    - The SDK internally reloads all feature config into cache. (FFM-6574)
    - Applications can listen to this event to ensure event listeners don't miss any streamed events during periods of downtime.

#### January 25, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The **Go server SDK** has been updated to version **0.1.6** and includes the following update:
* Some target segment include rules were not working for numeric values. This issue has been fixed. (FFM-6384)

#### January 24, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flag SDKs
- The **Android client SDK** has been updated to version **1.0.18**. This fixes a bug that caused unhandled exception errors due to duplicate callbacks during the SDK initialization. (FFM-6395)
- The **Flutter client SDK** has been updated to version **1.0.8**. This includes the following:
  - Fixed a bug that caused applications to shut down in response to API errors caused by no internet connection. (FFM-6395)
  - Fixed a bug that caused streaming to stop working if internet connectivity was lost. (FFM-6395) 

#### January 23, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flag SDKs
- The **Javascript SDK** has been updated to version **1.7.0**. This fix adds the `Harness-AccountID` and `Harness-EnvironmentID` fields to the HTTP request header in all calls after the initial authorization request. These values are extracted from the JWT, so you don't need to add a value for them. (FFM-6507)

- The **Android client SDK** has been updated to version **1.0.17**. This includes the following changes:
  - Fixed a bug that caused a 401 error when the SDK tried to send a request to the `stream` endpoint if the request was to a non-production environment. (FFM-4603)
  -   Fixed a bug that caused the SDK to stop working if an identifier isn't provided during the SDK initialization. The SDK will now use the name if you don't provide an identifier. You will receive an error if you don't provide either a name or identifier as at least one of these is required for all client-side SDKs. (FFM-6396)

#### January 21, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags authentication service

The Feature Flags authentication service has been updated to version 1.0.6 with the following update:

* The authentication service was logging warnings as it tried to authenticate with each cluster in turn. This could produce warnings even when authentication was eventually successful. Now, if authentication is successful, no warnings are logged. (FFM-6557)

#### January 19, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flags SDKs
- The **Javascript client SDK** has been updated to version **1.6.0**. This includes the following changes:
  - You can now customise the interval of how often metrics data is sent to the metrics endpoint. (FFM-6498)
  - If the metrics data is not successfully posted to the endpoint after two attempts, the data is cleared to ensure the metrics data doesn't get too large and cause performance issues. (FFM-6509)

- The **Java server SDK** has been updated to version **1.1.10**. This includes the following changes:
  -  Improvements to how the metrics endpoint processes platform targets. (FFM-6392)
  -  Fixed a bug that caused an error due to incompatibility with an older version of OkHttp. (FFM-6442)
  
- The **Ruby server SDK** has been updated to version **1.0.6**. This fixes dependency issues with OpenAPI that caused errors when trying to initialize the SDK. (FFM-6523)

#### January 17, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flags UI

* If you changed the environment, and then opened the **Pipeline** tab or **Environment** tab on a second screen, the environment you set defaulted to the original one. This has been fixed and the environment you select is consistent through all tabs. 


#### January 10, 2023

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flags UI

- Fixed a bug that prevented a completion tick from appearing in the UI after an evaluation had successfully passed. (FFM-6127)

- Fixed an error that caused the Complete button at the end of the Get Started flow to link to the beginning of the flow instead of linking to the expected Feature Flag list page. (FFM-5988)

- Resolved an issue that caused you to scroll unnecessarily when you expanded the target attribute or operator dropdown menus when creating a target. (FFM-5187)

- Fixed a bug where scrollbars were unnecessarily displayed in the target groups section of the targets page during loading. (FFM-4053)

###### Feature Flag SDKs

* The **Ruby server SDK** has been updated to version **1.0.5**. This fixes a bug that caused the SDK to not wait for initialization when using the `wait_for_initialization` method. (FFM-6393)

</details>

<details>
<summary>2022 releases</summary>

#### December 22, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues
###### Feature Flags UI

* Resolved an issue that caused the edit section of a pipeline not to load on the Feature Flag module. (FFM-5948)

#### December 15, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The Java server SDK has been updated to version 1.1.9 and includes the following update:

* A NullPointerException was thrown when a null target was given. This update fixes the MetricsProcessor to handle nulls correctly. (FFM-6125)

#### December 13, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

* Fixed a bug where target names were labelled "UNDEFINED" on the Harness UI if the name contained spaces. (FFM-5866)

**FF SDKs**

The Python SDK has been updated to version 1.1.5. This includes the following changes:

- Fixed a bug where only one target was registered as a metric when multiple, unique targets evaluations were made. (FFM-5995)

- Fixed a bug that caused an error the first time a metrics request was sent. (FFM-5995)

#### December 7, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

- Fixed a UI bug where the dialog box during the flag creation was shorter in length than it should be. (FFM-5509)

- Resolved an issue that caused flag lists to load slowly. (FFM-5507)

- Fixed a bug that caused flag pipeline stages to continue to run even if previous stages had failed. (FFM-5289)

- Fixed a minor UI bug where the back and next buttons during the Get Started flow were pushed out of the browser view. (FFM-5086)

- Resolved a minor UI bug that caused the empty state image in the Feature Flags landing page to be incorrectly aligned. (FFM-3839)

**Feature Flag SDKs**

The Java SDK has been updated to version 1.1.8. This version includes the following changes:

- Added a check to ensure the correct variations are served when a flag has nested prerequisite flags. (FFM-5306)
- Fixed a bug where the Target ID set by the customer was being overwritten and set to the default value. (FFM-5471)
- Fixed an issue with our internal dependencies that prevented the Java SDK version 1.1.7 from initializing. (FFM-5944)

#### December 1, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flag SDKs**

- The .NET SDK has been updated to version 1.1.6. This adds a check to ensure the correct variations are served when a flag has nested prerequisite flags. (FFM-5307)

- The Python SDK has been updated to version 1.1.4. This includes the following changes:

  - Added a check to ensure the correct variations are served when a flag has nested prerequisite flags. (FFM-5263)
  - Fixed a bug where requests continuously repeated themselves when using the SDK's streaming mode. (FFM-5352)

#### November 30, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flags SDKs

The .NET server SDK has been updated to version 1.1.6 with the following update:

* When a flag depended on a prerequisite flag being true, the evaluation failed if the prerequisite flag's variation `value` and `identifier` were identical. This issue has been fixed and the evaluation now works correctly in that case. (FFM-5307)


#### November 29, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

- Minor UI bug resolved in which buttons for creating Flags were sometimes pushed out of the browser view. (FFM-5336)

- Added a warning that Flag Variation names cannot contain only numerical characters. (FFM-4581)

- Resolved an issue where the Getting Started flow was inadvertently showing only Xamarin instructions in some cases. (FFM-5203)

**Feature Flag SDKs**

The Android SDK has been updated to version 1.0.14. This update fixes a bug that prevented metric data from appearing in the UI.

#### November 21, 2022

##### What's new

A new React Client SDK has been released for Feature Flags as version 1.0.0. To read more about this SDK, see the Reference Guide and the GitHub repository.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flag SDKs**

- The Ruby SDK has been updated to version 1.0.3. This fixes the following issues:

  - The SDK is now compatible with Ruby 2.6. (FFM-5354)
  - Some JSON was being incorrectly rendered in Flag responses. This has been fixed and responses are in the correct format. (FFM-4755)
  - When using a prerequisite Flag, if the identifier and value were not identical, the wrong value for the original Flag was returned. Now, the correct value is returned. (FFM-5355)
  - Target groups were storing data incorrectly due to an incorrect variable, the variable has now been fixed and data is stored correctly. (FFM-4058)

#### November 11, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

* When submitting an invalid YAML file for Feature Flag steps in a Pipeline, you now receive an error describing why the YAML is invalid. Previously the incorrect YAML was accepted and only showed a general error during pipeline execution. (FFM-4557)

**Feature Flag SDKs**

- The Java SDK has been updated to version 1.1.6.0. This fixes the following issues:

  - A bug where sometimes the SDK was not closed before making a new request. (FFM-3246)

  - Previously when setting metrics to false, the metrics weren't posted but continued to queue. This has been fixed so that they don't queue, therefore saving memory. (FFM-3694)

  - The Java SDK previously took the first value for Flag rules, instead of cycling through all the rules, so the Flag was not evaluated as expected. This issue has been resolved and the SDK now successfully goes through and evaluates the list of rules for the IN clause. (FFM-4744)

  - A thread leak was fixed for the metrics processor. (FFM-4849)

  - Previously the OR and AND operators for Target Group attribute rules were both treated as AND operators. Now, the OR operator works correctly. (FFM-4808)

  - An inconsistency in the percentage distribution of multivariate Flags has been fixed, so the percentages now work correctly. (FFM-4830)

#### November 6, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

- Added validation messages to Flag pipelines to ensure you know which fields must be completed for your pipeline to run successfully. (FFM-3176)

- Fixed a bug that was causing some failure strategies not to show on Feature Flag Pipeline stages. (FFM-4844)

**Feature Flag SDKs**

The Android SDK has been updated to 1.0.13.

* This fixes a bug where metric data was not showing in the UI.

#### October 31, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

- **Javascript SDK**

  The Javascript SDK has been updated to 1.4.14.

  This fixes a bug to ensure that Target identifiers are sent as a string before authorization, to prevent authorization errors. (FFM-5104)

- **.NET SDK**

  The .NET SDK has been updated to 1.1.5.

  The SDK will now print debug logs for analytics to the console. (FFM-4835)

- **Java SDK**

  The Java SDK has been updated to 1.1.5.3. This fixes the following bugs:

  - OR conditions being incorrectly treated as AND conditions. (FFM-4808)

  - Multivariate Flags using percentage roll-outs showing inconsistent amounts of results based on the inserted percentages. (FFM-4830)

#### October 25, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* A potential race condition during initialization was detected in the Android SDK version 1.0.11. This issue has been resolved in version 1.0.12.

#### October 21, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

- Some accounts were not able to use failure strategies on their Feature Flags pipeline stages. We've fixed this bug and all accounts can now use failure strategies. (FFM-4844)
- On the Harness Platform, any Get Started with Feature Flag buttons will now take you directly to the first stage of the Get Started flow, instead of the Overview page. (FFM-4740)

#### October 20, 2022

##### What's new

This release does not include new features.

##### Early access

We've released a beta version of an Apex SDK for Feature Flags.

For more information and to access this SDK, see the Apex SDK reference guide and the GitHub repository.

##### Fixed issues

The Python server SDK has been updated to version 1.1.3. (FFM-4744)

* This fixes a bug where OR conditions in Target Groups were incorrectly treated as AND conditions. If you use Target Group functionality, make sure to upgrade to this latest version as soon as possible.

#### October 18, 2022

##### What's new

You can now add a default pipeline to your Feature Flags that will be applied when you add targeting rules, or when you enable or disable a Flag. This means that you can ensure your Flag changes go through the process you want them to, allowing for better security and more consistent operations. For example, you can add an approval step so all your production Flag changes must be approved before they are executed, or you can send a Slack notification every time a Flag changes.

For more information about how to use a default pipeline for your Flags, go to Add a Default Pipeline for Flag Changes.

##### Early access

This release does not include early access features.

##### Fixed issues

The Java Server SDK has been updated to version 1.1.5.2. (FFM-4744)

* This fixes a notable bug where Target Group evaluations with multiple attributes were not evaluated beyond the first listed attribute. If you use Target Group functionality, make sure to upgrade to this latest version as soon as possible.

#### October 5, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* The Go SDK has been updated to version 0.1.3 to fix the SDK's internal dependencies. You do not need to take any action. (FFM-4678)

#### September 29, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* The audit log for a Feature Flag previously didn't show human-friendly messages and did not log all changes, making it difficult to understand what was updated. This has now been fixed and the audit log shows easy to understand messages for all events including adding or removing a clause, or adding an item to the exclusion list. (FFM-4481)

#### September 26, 2022

##### What's new

For self-serve customers, you can now create and upgrade a Feature Flags subscription directly through the Harness Platform instead of contacting our Sales team, meaning you can manage your subscription quickly, securely, and at any time.

For information about the current plans you can subscribe to, go to Pricing & Plans. For more information about how to use subscriptions, go to Subscribe to Feature Flags.

##### Early access

This release does not include early access features.

##### Fixed issues

This release does not include fixed issues.

#### September 9, 2022

##### What's new

The Feature Flag PHP SDK has been released. This means you can now connect an application that uses PHP when using Harness Feature Flags.

For more information about the PHP SDK, go to the PHP Reference Guide. For information about Feature Flag SDKs, go to our SDK Overview.

To get the SDK, go to our PHP Git Repository.

##### Early access

This release does not include early access features.

##### Fixed issues

The Node.js SDK has been updated to version 1.2.8. (FFM-4494)

* This update fixed a bug that caused the SDK to unexpectedly shut down when a Target Group was deleted. This has been fixed and you can now deleted Target Groups without issue.

#### September 1, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

The .NET SDK has been updated to version 1.1.4. (FFM-4463)

* This update fixed a bug that occurred when running the SDK with the Relay Proxy in offline mode. This has been fixed and the SDK can now run the Relay Proxy in offline mode.

#### August 31, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* The Python SDK has been updated to version 1.1.2 to update two of the dependencies in the SDK. For security purposes, please ensure to update the SDK to this version. (FFM-4425)

#### August 25, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

###### Feature Flag SDKs

The .NET SDK has been updated to version 1.1.3. Fixes in this update include:

- The package name for the SDK has changed from ff-netF48-server-sdk to ff-dotnet-server-sdk. To use this version, make sure you remove the old package name and use the new one.

- The sample app in the .NET SDK Git repository has been updated to the new version 1.1.3. (FFM-3651)

- The default configuration of the .NET SDK didn't have analytics enabled. (FFM-3520)

  This has been fixed and analytics is now set to true and enabled as default.

- When using the Relay Proxy with the .NET SDK, the URL for sending events was incorrect. (FFM-3652)

  The events URL has now been updated so it directs to the correct place.

- The .NET SDK README file has been updated to rename the Target data. (FFM-3759)

  The example Target data is now consistent across the sample code in the README and the SDK Reference Guide.

- The .NET SDK README file has updated to remove an extra period and a reference to debugging that was causing the example to fail. (FFM-4306)
  You can now run the example successfully.

- When evaluating Target Groups that used an IN operator, the SDK was only evaluating the first Target. (FFM-4358)
  The logic has now been fixed so that the SDK will check all values when an IN operator is used for a Target Group.

###### Relay proxy

* The proxy had a dependency on a JWT package that is no longer maintained. This fix updated the JWT dependency to a package that is maintained. (FFM-3867)
* The proxy had a dependency on ff-server, which is in a private repository. This fix removed the dependency on ff-server. (FFM-3965)
* Harness provided a tool to generate offline config files. For details, go to [Run the Relay Proxy in offline mode](/docs/feature-flags/relay-proxy/deploy-relay-proxy#run-the-relay-proxy-in-offline-mode) (FFM-3772)

#### August 18, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

- When creating a stage on pipeline template, Name and Description fields were displayed . (FFM-4098)

  As these fields are not required for creating a stage using a template, they have been removed from the About your Stage screen. You will no longer be able to enter a name and description for stages on a Pipeline template, but note this applies to templates only.

- When using a Pipeline and configuring a Flag stage, only the first 15 Flags in your Project would appear as an option in the Select Flag menu. (FFM-3716)

  This has been fixed and you can now select any Flag in your Project.

**Feature Flag SDKs**

The Python SDK has been updated to Version 1.1.1. Fixes in this update include:

- Removing the type of Flag check on Prerequisite Flags. (FFM-3868)

  Previously, if you created a Multivariate Flag as a Prerequisite Flag, once you turned the Flag on you couldn't turn it off again. This bug has been fixed and you can now turn Flags with Multivariate Prerequisite Flags.

- The Node.js SDK has been updated to Version 1.2.7. Fixes in this update include:
  - When using conditions for Target Groups, and conditions were treated as or conditions, meaning some Targets were not selected. (FFM-4331)
    This has now been fixed and conditions are treated correctly.

#### August 8, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

**Feature Flags UI**

- On the Harness Platform, when no Environment had been added to a project, the tooltip for a Flag toggle was displaying HTML. (FFM-4094)

  This has been fixed to remove the raw HTML text.

- On the Harness Platform, when the value of a Variation was set as a long non-breaking string, the content on the left bar of the Flag detail page overflowed into the main content of the page. (FFM-4010)

  This has been fixed so that the value will now wrap correctly.

**Feature Flag SDKs**

The Go SDK has been updated to Version 0.1.2. Fixes in this update include:

- The polling interval is now measured in seconds instead of minutes. (FFM-3676)
  This means the interval is now 60 seconds, instead of 1 minute. If you are using the default configuration, there are no actions for you. If you configured the polling interval, you need to convert the configuration from minutes to seconds. For more information, see Configure the SDK in the Go SDK Reference Guide.
- A check has been added to ensure that when a Flag has nested Prerequisite Flags, the correct Variations are served. (FFM-4043)
  You can now turn off analytics using the Go SDK. For more information, see Configure the SDK in the Go SDK Reference Guide. (FFM-3677)

#### August 1, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

- During the Feature Flag Getting Started tutorial on the Harness Platform, some buttons displayed an extra + symbol. (FFM-4056)

  This has been fixed and the extra symbols have been removed.

- On the Feature Flags UI, when adding a Flag to a Target, some text boxes did not adjust to fit the full width of the table. (FFM-4055)

  This has now been fixed and the text boxes adjust as necessary.

#### July 27, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* An issue where Flag Evaluations were always returning the default Variation in the Feature Flag Node.js SDK has been fixed. Previously, if the Target you sent to Evaluate against a Flag was part of a Target Group, the default Variation was always returned instead of the valid Variation for that Flag. This is now fixed and the correct Variation is returned for all Targets. (FFM-4175)

* Due to this fix, the Feature Flag Node.js SDK has been updated to version 1.2.6.

#### July 18, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* On the Harness UI, when you deleted the Environment you were currently active in, the identifier for that Environment should have been removed from the URL but wasn't. (FFM-3984) This issue has been fixed and the Environment identifier is now removed from the URL when you delete an active Environment.

#### July 11, 2022

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

- On the Target and Target Group page UI, when there are no Flag rules added the layout is now correctly aligned and stretches to the full available height. (FFM-3931)

- On the Flags page UI, when you enter a search term that returns no results, the search bar is no longer cleared and you can use the Clear Search button. (FFM-3877)

- When filtering Flags and you receive more than a single page of results then reset the filter or select another filter, the page number is updated correctly. (FFM-3876)
- When editing a multivariate Flag that has two Variations, the trash icon is now displayed at the end of each Variation row. (FFM-3714)

- The Retry button displayed when there is an error now reloads the Flag endpoint instead of the Environment endpoint. (FFM-3713)

- On the Flag details page, the Save or Cancel footer now aligns correctly with the panel. (FFM-3712)

</details>
