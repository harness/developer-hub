---
title: Feature Flags release notes
sidebar_label: Feature Flags
date: 2024-10-21T08:09:25
tags: [NextGen, "feature flags"]

sidebar_position: 11
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/feature-flags/rss.xml" />

Review the notes below for details about recent changes to Harness Feature Flags (FF). For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::

#### Last updated: October 21, 2024

## October 2024

### Relay Proxy

#### Version 2.0.6

**Fixed Issues**:

- Upgrades dependencies to resolve CVEs
- Reduces pushpin log level from info to error level. This reduces the amount of ephemeral pod storage the Proxy consumes in k8s.
- Ensures the Proxy only writes to the response body if the response hasn't already been committed.

### Java SDK

#### Version 1.8.0

**New features and enhancements**:
 - New `HarnessConfig` options: 
 -- `maxRequestRetry`: Defines the maximum number of retry attempts for the following request: authentication, polling, metrics, and reacting to stream events
 -- `flushAnalyticsOnClose`: Indicates whether to flush analytics data when the SDK is closed. 
 -- `flushAnalyticsOnCloseTimeout`: The timeout for flushing analytics on SDK close. (FFM-12087)
 
 For full details, see associated Java docs and for sample usage, see [`ConfigExample`](https://github.com/harness/ff-java-server-sdk/blob/main/examples/src/main/java/io/harness/ff/examples/ConfigExample.java). 

**Fixed Issues**:
 - Resolved an issue where initial connection attempts to the
 stream, as well as reconnection attempts after disconnection, were
 limited to 5 tries. Now, reconnection attempts have no limit and
 utilize exponential backoff, with a 60-second cap on retry
 intervals reached after several attempts. (FFM-12087)
 - Fixed a memory leak caused when the SDK was closed but the
 stream’s `ScheduledExecutorService` remained active. All SDK
 resources are now properly shut down when `close()` is called.
 - Addressed an issue where, after calling `close()` and shutting
 down the stream, the SDK would still make a poll request,
 resulting in error logs due to evicted network resources. Now, no
 polling requests are made after `close()` is invoked.

## September 2024

### Relay Proxy

#### Version 2.0.5

**New features and enhancements**:

 - If you include a `Harness-SDK-ApplicationID` header in your request to the Proxy it will be included in the logs e.g. `{"level":"info","ts":"2024-09-10T15:36:00+01:00","caller":"middleware/middleware.go:44","msg":"request","component":"LoggingMiddleware","method":"GET","path":"/client/env/:environment_uuid/feature-configs","status":401,"took":"80.619µs","appID":"app-123"}`

**Fixed Issues**

 - Fixes an issue where the cache status wasn't being reported properly in the `/health` response if the Proxy disconnected/reconnected to redis after startup
 - Fixes an issue where a stale inventory key would remain in redis even though stale assets had been removed which caused unecessary memory usage in redis.

#### Version 2.0.4

**Fixed Issues**:
  - Fixes an issue where the Proxy could send SSE events with truncated flag identifiers if the flag identifiers contained an underscore e.g. `HELLO_WORLD`. When the Primary Proxy starts up it pulls down config from Saas, compares it with the config in redis and generates SSE events to make sure SDKs don't miss out on changes. However in this scenario if the flag identifier contained an underscore e.g. `HELLO_WORLD` the SSE event would indicate a change for the flag `HELLO`.

#### Version 1.0.5

**Fixed Issues**

 - Fixes CVEs by upgrading packages and dependencies

### Erlang SDK

#### Version 3.0.1

**Fixed Issues**:
 - Fixed an issue where a flag or target group change would not be stored with the `Outdated` error. 

### .NET SDK
#### Version 1.7.2
**New features and enhancements**:
 - Added .NET 8.0 TFM. (FFM-12057)
 - Upgraded `System.IdentityModel.Tokens.Jwt` for .NET 7.0 and 8.0
 TFMs.
 - Remove unused `Disruptor` library.

### Javascript Client SDK

#### Version 1.13.0

**New features and enhancements**:
 - Added the `authRequestReadTimeout` config option. Have a look at the [readme](https://github.com/harness/ff-javascript-client-sdk/blob/main/README.md#authentication-request-timeout) for further information and how to enable it. (FFM-11972)

**Bug fixes**: 
 - If authentication fails, the correct error will be logged instead of `Invalid Token`. (FFM-11972)

### React Client SDK

#### Version 1.13.0

**New features and enhancements**:
 - Bumped Javascript SDK to 1.13.0. (FFM-11972, FFM-11852, ZD-68087)

### React Native SDK

#### Version 2.2.0

**New features and enhancements**:
 - Bumped FF React SDK to 2.2.0. (FFM-11972)

### Ruby SDK

#### Version 1.3.2

**Fixed Issues**:
 - No longer ships `rake`, `minitest` and `standard` as dependencies. (FFM-11995)

## August 2024

### Node.js SDK

#### Version 1.8.3

**Fixed issues**:
 - Patched Axios CVE: `CVE-2024-39338`. (FFM-11888)

### Relay Proxy

#### Version 2.0.3

**Fixed Issues**:
  - Cached data from old Proxy Keys is now removed from redis. There was an issue where if you configured a Proxy with Proxy Key A, then reconfigured it with Proxy Key B and restarted the service you would end up with config for Proxy Key A & B in Redis when there should only be config for Proxy Key B.
  - Fixes a race condition where concurrent map access could happen in the Primary Proxy when it's aggregating metrics data.
  - Cleans up error logs that shouldn't have been logged.

### Java SDK

#### Version 1.7.0

**New features and enhancements**:
 - Introduced the ability to store and retrieve `FeatureSnapshot` (previous and current feature config). 
 - Updated `FeatureSnapshot` for JavaSDK. (FFM-1844)

### Javascript SDK

#### Version 1.27.0

**Fixed issues**:
 - Added `maxStreamRetries` config option. (FFM-11788, ZD-66828)
 - If retries are exhausted, one of these two states would occur:
    1. If polling is enabled, the SDK would remain in polling mode and no further streaming reconnection attempts would be made. The default polling option, if not supplied, is whatever the `streamingEnabled` value is or,
    2. If polling is disabled, the SDK would not get any further evaluation updates for the remainder of the SDK client instance's life. The SDK would need re-initialised, e.g the app being restarted, to get new evaluations in this state.
 - Fixed an edge case where if the stream disconnects and resumes during a request made by the fallback poller (60 seconds later), the fallback poller will not be disabled and will continue polling for the lifetime of the SDK instance. (FFM-11852, ZD-68087)

#### Version 1.26.3

**Fixed issues**:
 - The following CVEs have been patched:
    - [ws](https://github.com/advisories/GHSA-3h5v-q93c-6h6q)
    - [braces](https://github.com/advisories/GHSA-grv7-fg5c-xmjg)

### Python SDK

#### Version 1.7.0

**Enhancements**:
 - Added `httpx_args` option. (FFM-11935):
   - For further reading, you can refer to this [doc on `httpsx_args`](https://github.com/harness/ff-python-server-sdk/blob/main/docs/further_reading.md#httpx-configuration-options)
   - You can find a [sample of the change by Harness](https://github.com/harness/ff-python-server-sdk/blob/main/examples/with_httpx_args_example/with_httpx_args.py) in our Python SDK repo.

## July 2024

### Relay Proxy

#### Version 2.0.2:
**Fixed Issues**:
 - Fixed an issue where username & password auth for redis wasn't working
 - Fixes an issue where the Proxy didn't validate the environment in the request matched the environment in the token claims
 - Explicitly makes `REDIS_ADDR` a required environment variable. A connection to redis is required for the Proxy to function but the `REDIS_ADDR` wasn't explicitly requried in the code which could lead to vauge startup errors if you forgot to set it.
 - Reduces excessive memory usage from having an excessive amount of labels on prometheus metrics. This required is to remove the following labels from the following metrics
  - Removed the `key` label from the following metrics
    - `ff_proxy_redis_cache_scan_duration`
    - `ff_proxy_redis_cache_write_count`
    - `ff_proxy_redis_cache_read_count`
    - `ff_proxy_redis_cache_remove_count`
    - `ff_proxy_redis_cache_scan_count`
  - Removed the `method` label from the `ff_proxy_http_requests_total` metric
  - Removed the `envID` label from the `ff_proxy_http_requests_duration` metric
  - Removed the `url` and `envID` label from the `ff_http_requests_content_length_histogram` metric

**Enhancements**:
  - Optimises memory by reducing the number of memory allocations
  - Adds support for using the `Harness-Target` header to perform evaluations. This means that if you're using an SDK that sends the Target in the `Harness-Target` the Proxy will use it to perform the evaluation rather than having to fetch the target from redis to perform the evaluation.
  - Cleans up unecessary error logs

### Android SDK

#### Version 2.2.3

**Fixed issues**:
 - Fixed an issue where the SDK Client would not be closed correctly if `Close()` or `CloseWithFuture()` was called, and `Streaming` and/or `Polling` requests would continue to be made in the background. (FFM-11779)

#### Version 2.2.2

**Fixed issues**:
 - Fixed the high initialization latency for large projects. (FFM-11750)
 - Resolved an issue where using the callback method to initialize the SDK when the device had no connectivity. It would fail to give a `success/failure` result until the device regains connectivity. Now, a failure result is immediately sent and a success callback will be sent when the device is able to reconnect once the SDK initializes successfully. (FFM-11750)

### Java SDK

#### Version 1.6.1

**Fixed issues**:
 - Sorted `AND/OR` rules when caching a group instead of during an evaluation call. This change prevents latency that could occur if the group is large. (FFM-11654)

### .NET SDK

#### Version 1.7.1

**Fixed issues**:
 - Fixed incorrect number variation warning message. (FFM-11759, ZD-66232)
 - Fixed an issue when `client.close()` is called the stream remains connected. The stream now exits correctly and resources are released. (FFM-11801, ZD-66232)
 - If `WaitForInitialization()` was called and no timeout argument provided, the SDK could block permanently on unrecoverable authentication failures.  Now, the SDK will unblock immediately on `40x` errors, and retry up to 10 times on `50x` errors, after which it will unblock. (FFM-11759, ZD-66232)

**New features and enhancements**:
 - Add `FlagsLoaded` Event - see [events](https://github.com/harness/ff-dotnet-server-sdk/blob/main/docs/further_reading.md#listen-on-events). (FFM-11759, ZD-66232)

### Python SDK

#### Version 1.6.4

**Fixed issues**:
 - Fixed an issue where SDK dependencies, `tenacity` and `typing_extensions`, were pinned to fixed versions, which could make integration with the SDK impossible if different versions are specified in an application or its dependencies. (FFM-11770, ZD-66342)

#### Version 1.6.3

**Fixed issues**:
 - Pins `typing_extensions` to latest release compatible with 3.7 to resolve compatibility issues with code brought in from the OAPI Generator. (FFM-11655)
 - Added a guard around the debug log. The guard being a `None` check on the feature config type before we attempt to log it. (PL-51773)

### Ruby SDK

#### Version 1.3.1

**Fixed issues**:
 - Sorted `AND/OR` rules when caching a group instead of during an evaluation call. This change prevents latency that could occur if the group is large. (FFM-11657)

## June 2024

### Relay Proxy

#### Version 2.0.1

**New features and enhancements**:
- Beta support added to support AND rules in Harness Saas. To opt in to this feature you need to configure your Proxy to set the `AND_RULES` environment variable to `true`
- Adds the same validation that Harness Saas uses on Targets in the `/client/auth` path. This prevents the Proxy from accepting invalid targets from SDKs and logging out an error when it tries to forward them to Saas

**Bug Fixes**:
- This fixes a bug where the Proxy metric aggregation wouldn't work properly with certain SDKs (Java, .NET)
- Fixes an issue where the context could time out and prevent connect/disconnect stream events from being published to redis.
- Fixes an issue introduced in `2.0.0` that caused read replicas to not close streams with SDKs properly
- There was an issue with how the Proxy handled redis URLs prefixed with `redis://`. This fixes that issue so that all of the below options work for configuring the redis URL

### Android SDK

#### Version 2.2.1

**New features and enhancements**:
 - Added a new method for closing the SDK. The `closeWithFuture()` method can be used to ensure the SDK has been closed before continuing, for example, re-initializing the SDK. (FFM-11625, ZD-64818)

### Flutter SDK

#### Version 2.2.1 

**Fixed issues**:
 - Fixed an issue on Android where the SDK would crash with the error,
  `java.lang.IllegalStateException: Reply already submitted`, if the SDK was closed and re-initialised multiple times within quick successions. (FFM-11625, ZD-64818)

### Golang SDK

#### Version 0.1.24

**Fixed issues**:
 - Sorted `AND/OR` rules when caching a group instead of during an evaluation call. This change prevents latency that could occur if the group is large. (FFM-11653)
 
**New features and enhancements**:
 - Bumped `go-retryablehttp` from 0.7.4 to 0.7.7.

### .NET SDK

#### Version 1.7.0

**New features and enhancements**:
 - Further cache optimisations to improve performance and reduce memory usage. (FFM-11619)
 - Exposes new `jsonVariationToken` method which supports JSON array variations.  Note that `jsonVariation` has been marked as `Obsolete` due to the fact it only supports JSON object variations. (FFM-11548)
 
#### Version 1.6.10

**New features and enhancements**:
 - Improves SDK evaluation performance and memory usage.
 - Update to use `PackageLicenseExpression`. 
 - Make `System.Net.Http` conditional. (FFM-11509)
 - Optimize IN clause rules. (FFM-11056)
 - Cherry pick 1.6.9 patch. (FFM-11531)
 - Remove excessive `ToList()` allocations in Evaluator. (FFM-11551)
 - Wrap log statements with if statements. (FFM-11557)
 - `SeenTargets` cache memory improvements. (FFM-11549)
 - Sort rules when retrieving instead of per evaluation. (FFM-11585)
 - Remove rules sorting from the evaluation path. (FFM-11597)

**Fixed issues**:
 - Fixed an issue where streams would not remain open for longer than 60 seconds when the SDK is running .NET 4.8:
  -- Previously, if the stream disconnected, it would take 70 seconds for it to reconnect. It now reconnects using an exponential backoff and delay, where the base delay is 500ms. (FFM-11573, ZD-64099)
 - The SDK version has been bumped from `1.6.x` to `1.7.0-rc2`. (FFM-11549)
 - Fix streaming issues for .NET 4.8. (FFM-11573, ZD-64099)

### Node.js SDK

#### Version 1.8.2

**Fixed issues**:
 - Sorted `AND/OR` rules when caching a group instead of during an evaluation call. This change prevents latency that could occur if the group is large. (FFM-11656)

#### Version 1.8.1

**Fixed issues**:
 - Patched CVE for `braces`. (FFM-11673)

#### Version 1.8.0

**New features and enhancements**:
 - Global Axios settings are no longer configured by the SDK, which could override Axios settings used elsewhere in an application.  The default timeout is `30s` but can be changed using options within `axiosTimeout`. See: ['Available Options' in the Node.js further reading docs in the GitHub repo](https://github.com/harness/ff-nodejs-server-sdk/blob/main/docs/further_reading.md#available-options). (FFM-9097)
 - Added SDK support for `AND/OR` rules (Please note that this feature is not GA yet). (FFM-11243)
 - The `target-segments v2-rule` parameter has been added and ready to use. (FFM-11364)

### Python SDK

#### Version 1.6.2

**New features and enhancements**:
 - Bumped `requests` from 2.31.0 to 2.32.0.

**Fixed issues**:
 - Sorted `AND/OR` rules when caching a group instead of during an evaluation call. This change prevents latency that could occur if the group is large. (FFM-11656)
 - Fixed error logging when metrics are processed for targets without any attributes. (FFM-11655)

## May 2024

### Golang SDK

#### Version 0.1.23

**New features and enhancements**:
 - Previously, from versions `v0.1.21` to `v0.1.22`, a critical bug was identified where evaluation metrics processing could cause a system panic. This occurred when at least one evaluation involved a target with `nil attributes` — either due to attributes being omitted or explicitly set to nil. This release addresses this issue by implementing a fix that prevents such panics. (FFM-11470, ZD-63281)

**Enhanced Testing**: 
 - To ensure the stability and reliability of this fix and similar functionalities, we have expanded the evaluation metrics suite of unit tests. These additional tests will help safeguard against regressions and improve code coverage.

**Fixed issues**:
 - Versions `v0.1.21` and `v0.1.22` have been retracted.
 - Removes GitHub Actions step `Static Code Analysis / Build (push)` as it is constantly failing due to out of date credentials. These checks have moved to Harness CI but this step had yet to be removed until now.

#### Version 0.1.22

:::info Version 0.1.22 Retracted
This version was retracted on 13th May 2024 due to a critical bug being identified. Please use Version 0.1.23 or later versions. 
:::

 - Refactored the evaluation logic to remove inefficiencies in the `GetAttr(ibute)` function. (FFM-11332)
 - Upgraded the Go SDK version in analytics. 

### Java SDK

#### Version 1.6.0

**New features and enhancements**:
 - Updated the Java SDK example to include a delay. (FFM-10981)
 - Target v2 updates: 
  - Added support for `AND/OR` in clauses. (FFM-11193)
  - Returns false when no clauses exist. (FFM-10861)
 - Added a new query parameter to `target-segments`. (FFM-11356)
 - Added a config option to suppress the SDK code `6001`. (FFM-11425, ZD-62796)
 - Updated BC to 1.78.1. (FFM-11502)
 - Downgraded the OpenAPI plugin to allow for a broader range of Springboot compatibility. (FFM-11459)

### .NET SDK

#### Version 1.6.9

**New features and enhancements**:
 - Added SDK support for `AND/OR` rules - **feature not GA yet**. (FFM-11242)
 - You can now use the `target-segments v2-rule` parameter. (FFM-11363)

**Fixed issues**:
 - Fixed a `Null Pointer Exception` that occurred when a `null` target was used in an evaluation with analytics enabled. (FFM-11537, ZD-63847)

### Python SDK

#### Version 1.6.1

**New features and enhancements**:
 - SDK support has been added for `AND/OR` rules. Please note that this feature is not generally available yet. (FFM-11455)
 - Improved the retry logic used by SDK `http` requests, as well as the clarity of logs if requests fail. (FFM-11441)

**Fixed issues**:
 - Only deletes cache key if it exists. (FFM-11331, ZD-62250)

### React Client SDK

#### Version 1.11.0

 - We've reduced the ES (ECMAScript) target to 2018. (FFM-11353)
 - The Javascript SDK has also been updated. 

### Ruby SDK

#### Version 1.3.0

**New features and enhancements**:
 - Target v2: Adding SDK support for `AND/OR` rules. Please note that this feature is not generally available yet. (FFM-11241)
 - Adding `rules-v2` query parameter to optimise the rules that the FF backend sends for `AND/OR` rules. Please note that this feature is not generally available yet. (FFM-11365)

**Fixed issues**:
 - If the metrics buffer size fills, it no longer flushes and sends all metrics to the FF service, which could affect evaluation performance.  Instead, it logs a warning that the buffer is full and does not process anymore metrics for that interval. (FFM-11211)
 - Optimizes the payloads sent by the metrics service. Previously, there would be an individual payload entry based on `flag + variation served + target`.  Now, the entry is based on `flag + variation`.  This drastically reduces payload size for similar evaluations served for targets. The SDK continues to register targets correctly as before. 
 - Fixes an issue where targets used in evaluations across metrics intervals would still be included in payloads. Now, only unique targets are included in payloads.

## April 2024

### Android SDK

#### Version 2.2.0

Bug fixes:

 - The `NetworkInfoProvider` has been replaced. This was due to customers experiencing crashes while using the Harness library for Feature Flags, specifically in the Andriod app. (FFM-11216, ZD-61312)

Security Updates: 
 - The `bouncycastle` dependency has been updated to 1.78 to remove CVE-2024-29857. (FFM-11222)
 - The `threeten` dependency has been updated to 2.6.9 to remove CVE-2024-23081. (FFM-11223)

#### Version 2.1.1

 - This update fixes a `ConcurrentModificationException` that could be thrown if network connectivity was lost and regained. (FFM-11156)

### Golang SDK

#### Version 0.1.21 - Retracted

:::info Version 0.1.21 Retracted
This version was retracted on 13th May 2024 due to a critical bug being identified. Please use Version 0.1.23 or later versions. 
:::

**New features and enhancements**:
 - SDK support for processing `AND/OR` rules:
  - Note that this feature is not enabled yet and the SDK will continue to use the existing group rule format until further notice. (FFM-11297)
 - Internal metrics code enhancements.

**Fixed issues**:
 - Fixed an issue where only a single target would be registered in a metrics window.(FFM-11297)

#### Version 0.1.20

 - Optimized the evaluation logic to be more efficient. (FFM-11183)

#### Version 0.1.19

 - Added additional debug logging around evaluation logic. (FFM-11091)

### Javascript SDK

#### Version 1.26.1

 - The Stream disconnections and timeouts are now logged at `debug` level. If the SDK takes longer than 5 separate requests to reconnect, it will log an error. It will then continue to log errors for every 5 failed reconnection attempts. (FFM-11248)

#### Version 1.26.1

 - Replace `btoa` usage with custom Base64 encoding to handle non-ASCII characters. (FFM-11103, ZD-60634)

### .NET SDK

#### Version 1.6.8

 - We've fixed an issue where evaluation related debug logs, even if debugging wasn't enabled, would cause extra latency when making evaluations. This fix restores performance to do normal pre-logging levels. (FFM-11121)
 - There are no longer `information` logs json payloads. (FFM-11022)

#### Version 1.6.7

 - Logs flags/groups payload as `info` level log. (FFM-11022)

#### Version 1.6.6

 - We've made cache & exception handling improvements including:
 -- improving cache locking and synchronization,
 -- improving stream error handling,
 -- increasing the capacity of dictionary, and
 -- additional cache recovery checks. (FFM-11089)

### Node.js SDK 

#### Version 1.7.0

 - Applies metrics hardening to Node SDK.. (FFM-11022)
 - Applies standard Metrics Enhancements. (FFM-11022)
 - Fixed issue where only the first prerequisite was being processed. (FFM-9291)
 - Adds `Harness-SDK-Info`, `Harness-AccountID`, or `Harness-EnvironmentID` headers. (FFM-7051)
 - Adds support for custom TLS CA certificates. (FFM-7017)

### PHP SDK (Beta)

#### Version 0.2.0 

 - Fixed the JWT fields missing in the cache on authentication. (FFM-11123, ZD-60936)
 - Added SDK type, version, and lang to the HTTP header. (FFM-7037)

## March 2024

### Android SDK

#### Version 2.1.0

**Enhancements**:
 - We've provided a new configuration option that allows polling to be disabled. Do have a look at the [streaming and polling mode on GitHub](https://github.com/harness/ff-android-client-sdk/blob/main/docs/further_reading.md#streaming-and-polling-mode) for information on how to use this feature. (FFM-10961)
 - This version now updates the `GettingStarted` application to demonstrate usage of all initialzation methods. You can have look at our updated [Initialzation Documentation on GitHub](https://github.com/harness/ff-android-client-sdk/blob/main/docs/further_reading.md#client-initialization-options) for more details. 

**Bug Fixes**:
 - We have fixed an issue that resulted in the `initialize` success callback again being triggered if the SDK needed to re-authenticate. This would happen in scenarios such as losing connectivity. Because of this, any code you supplied specifically related to initiailization success would get executed again. The `initialize` callback has been updated to correct this. Do feel free to have a look at the new [callback documentation on GitHub](https://github.com/harness/ff-android-client-sdk/blob/main/docs/further_reading.md#using-callback) for more information on this. (FFM-10940)
 - The issue involving having to register for a second, or multiple, event listeners at the same time as an event comes through has been resolved. On the previously registered listener, it could throw an unchecked `ConcurrentModificationException`.

#### Version 2.0.2 

 - We have fixed the non-blocking behaviour. (FFM-8138)
 - We've updated `okhttp` and `okio-jvm` in relation to CVE-2023-3635. (FFM-10903)

#### Version 2.0.1

 - We've added support for the `Retry-After` header. (FFM-10745)
 - The `TooManyRequestsException` error has now been resolved. (FFM-10879)

### Flutter SDK

#### Version 2.2.0

 - We've tidied up behaviours around flag deletion: 
 -- Previously, if a flag was deleted, its evaluations would remain in the SDK cache and any variation calls made to it would result in an out-of-date evaluation for your target. (FFM-8138)
 -- This update exposes a new `EVALUATION_DETE` event you can listen for which is emitted when a flag has been deleted.
 - We've fixed an issue in iOS where if an evaluation failed, `null` would be returned instead of the default variation that was supplied.
 - We've upgraded Feature Flags iOS SDK to 1.3.0.
 - We've upgraded Feature Flags Android SDK to 2.0.2.

### Golang SDK

#### Version 0.1.18

 - This adds Connection: closes header to metrics requests. (FFM-11039)

### iOS SDK

#### Version 1.3.0

 - We've tidied up behaviour around flag deletion:
 -- It now exposes new `onDelete` event that you can listen for which is emitted when a flag has been deleted.
 - Previously, if a flag was deleted, its evaluations would remain in the SDK cache and any variation calls made to it would result in an out-of-date evaluation for your target. (FFM-10877)
 - It doesn't report metrics when default variation served which would result in inaccurate flag metrics. (FFM-8318)

### Java SDK

#### Version 1.5.2

 - We've removed the metrics flush on map overflow. (FFM-10816)
 - We've added `Retry-After` HTTP header support. (FFM-10821)

### Javascript SDK

#### Version 1.26.0

 - We have enabled the logger to be overridden so users can use their own logger. (FFM-10880)

### .NET SDK

#### Version 1.6.5

 - When you're making an evalution, if the Flag or Group cache are found to be in an invalid state, then a cache refresh is made and the evaluation re-attempted once. This cache refresh has a default timeout of 5 seconds, which can be decreased or increased by using the new configuration option `SetCacheRecoveryTimeout(int timeoutMilliseconds)`. (FFM-11022)

#### Version 1.6.4

 - The Evaluation logic refactored to use immutable principles, to aid in maintenance and readability. (FFM-11057)
 - If the target group cache is found to be in an invalid state, such that any groups that beloing to a flag are not in the cache, the SDK will asynchronously update the group cache and immediately return the default variation.
 - There are extra evaluation logs added to aid troubleshooting.

#### Version 1.6.3

 - This update now generates additional debug-level logs that detail the flag, target, and the specific reason for the variation result. This includes identifying the exact rule, such as a group rule, that led to the served variation. (FFM-11002)

#### Version 1.6.2

 - The exception handling in auth success callback has been resolved. (FFM-11002)

#### Version 1.6.1

 - We've fixed an analytics issue that caused a target's attributes to not be sent in analytics payloads, as well fail to appear in the UI. (FFM-10943)
 - We've resolved an issue that caused new targets to not be sent in analytics payloads. This issue commonly happened when multiple instances of the SDK were created.

#### Version 1.6.0

 - We've made further enhancements to the 'evaluations per second' performance. The SDK can now process an extra 90,000 evaluations per second. (FFM-10837)
 - This version marks `Target.isPrivate` as 'no longer obsolete'. We've also made improvements to the SDK processing of private targets: 
 -- Previously, the private targets were still stored in cache, but only dropped at the end of a metrics interval. The SDK no longer stores private targets in cache at any point. 

#### Version 1.5.0

 - We've increased evaluation performance for when analytics are enabled. This provides up to an 80% decrease in mean time to process 100k evaluations using 100k unique targets. (FFM-10822)
 - We've made improvements to analytics cache for per-interval processing. You can now process analytics for unique evaluations for up to 2K flags with 5 variations each and can now process up to 100K unique targets.

### Node.js SDK

#### Version 1.6.1

 - We have fixed an issue that resulted in metrics requests failing and displaying a `400: Bad Request` error message. (FFM-10963)
 - We've upgraded Axios to 1.6.8 to address a [CVE]( https://security.snyk.io/package/npm/follow-redirects/1.15.5) that highlighted known vulnerabilities in the `follow-redirects` package.

### Python SDK

#### Version 1.6.0

 - We've added support for custom TLS CA certs. (FFM-7006)

#### Version 1.5.0

 - This update keeps track of targets that have been used in evaluations. It will no loner send targets already seen in the mtrics payload. This allows for fair processing of new targets for analytics purposes. (FFM-10837) 
 - The following bugs have been fixed:
 -- We've resolved an issue where if a target was marked as `anonymous`, it would be sent in analytics.  
 -- We've also fixed the typing of `get_flag_kind` method. 

### React SDK

#### Version 1.10.0

 - We've updated the Javascript Client SDK to 1.26.0 and we've updated the `README` to show you how to override the internal logger. (FFM-10886)

#### Version 1.9.0

 - We've updated the internal Javascript Client SDK to v1.25.0 to unlock the ability to change the mechanism used for caching flags. (FFM-10875)

## February 2024

### Android SDK

#### Version 2.0.0

 - There's been a major refactoring in the 2.0.0 version of the Android SDK which included some API changes and additional imporovements:

 -- <u>Improvements</u>

This is a major hardening effort of the SDK to improve its overall reliability:

 --- With a now simplified threading model, we now use a dedicated thread for authentication, streaming and polling which lives for the lifetime of the SDK until `close()` is called. Previous `1.x.x` versions of the SDK would start and stop threads on demand and/or submit code to thread pools. This made it difficult to identify critical regions in the code and was error prone.
 --- A 2nd thread is now used for posting metrics to the analytics backend however all interactions between the two threads are done via a `ConcurrentHashMap()` and passing a read-only authentication token, no other state is needed for metrics.
 --- The user entry points into the SDK such as `boolVariation()`, `stringVariation()`, `numberVariation()` and so on are now designed in such a way that they will never perform network activity. Instead they will only query the internal cache. This prevents unexpected blocking of UI code or code that is sensitive to delays.
 --- There is proper use of constructors and final fields to make SDK thread state immutable (and reduce the likelihood of null pointer exceptions where possible).
 --- Centralized error handling, the SDK will reset itself on dropped connections, timed out connections or any other exception. it will never get into undefined state but restart after a delay of 1 minute.
 --- Centralized network detection, SDK thread will go to sleep when there is no network and wake up when an Android network online event is detected.
 
 -- <u>API Deprecations</u>
 
 --- The following overloaded versions of `initialize()` have been marked deprecated:
 ```
 public void initialize(final Context context, final String apiKey, final CfConfiguration config,final Target target, final CloudCache cloudCache, @Nullable final AuthCallback authCallback) throws IllegalStateException
 public void initialize(final Context context, final String apiKey, final CfConfiguration config,
 final Target target, final AuthCallback authCallback) throws IllegalStateException
 public void initialize(final Context context, final String apiKey, final CfConfiguration config,
 final Target target, final CloudCache cloudCache) throws IllegalStateException
 ```
 
 --- A custom cache can now be configured via a new configuration property `io.harness.cfsdk.CfConfiguration.Builder.cache()` , `AuthCallback` and `AuthResult` have been deprecated. The SDK will now follow the same API style as other Harness SDKs. Instead of providing a callback on `initialize()` you should call `waitForInitialization()` directly after `initialize()`. For example:

 ```
 client.initialize(this, apiKey, sdkConfiguration, target)
 if (client.waitForInitialization(30_000)) {
  // SDK started ok
  } else {
    // SDK did not start in time, re-authentication will be retried in the background until success or client.close() is called
    // You should expect default values to be served
    }
```

#### Version 1.2.5

 - We've updated the `README` with instructions on how to add a ProGuard rule for Release builds. (FFM-10499)
 - Now doesn't throw the `RejectedExecutionException` inside the `runRescheduleThreadWrapEx()`.

### Flutter SDK

#### Version 2.1.3

 - The `CFClient.destroy` is now fixed after not completing correctly on iOS. (FFM-10596)

### iOS SDK

#### Version 1.2.0

 - Resolved an issue where the `AnalyticsManager` class was causing crashes. For context, this class uses a dictionary and does not sanitize the thread when reading/writing which was causing crashes due to race conditions.

### Java SDK

#### Version 1.5.1

 - We've updated logback to remove `CVE-2023-6481`. (FFM-10377)
 - Used a single `ExecutorService` for `UpdateProcessor`. (FFM-10760)

### JavaScript SDK

### Version 1.25.0

 - It allows the overriding of cache storage mechanism. (FFM-10772)
 - Removed React Native Android detection. (FFM-10810)

#### Version 1.24.0

 - Disables streaming if Reactive Native + Android are detected. (FFM-10442)

### .NET SDK

#### Version 1.4.3

 - Doesn't make network requests from the Evaluation thread. (FFM-10645)
 - The cache buffer size is configurable. 
 - We have fixed an issue where the `Disabling metrics` acion would not disable metrics in all scenarios. 

#### Version 1.4.2

 - We have resolved important issues which prevented evaluation metrics from growing exponentially in memory and flushed frequently, while preserving complete metrics accuracy. (FFM-10627)
 - Bumped `System.IdentityModel.Tokens.Jwt` from 6.15.0 to 6.34.0.
 - Wiremock has been upgraded. (FFM-10410)
 - `Analytics` has now been separated into `EvaluationAnalytics` and `TargetAnalytics`. (FFM-10602)

### React SDK

#### Version 1.8.1

 - We've fixed an issue where the new `useFeatureFlagsClient` hook and the `withFeatureFlagsClient` HOC were not correctly exported, making it more complex to import into your application (FFM-10591)
 
#### Version 1.8.0

- We've added a new `useFeatureFlagsClient` hook and `withFeatureFlagsClient` HOC to allow easy access to the instance of the Javascript Client SDK which the React Client SDK uses under the hood (FFM-10522)

## January 2024

### Apex SDK

#### Version 0.1.3 Beta

 - It now re-authenticates using the `FFPoller`, to ensure that scheduled jobs continue to run after the auth token has expired.
 - It now includes a synchronous initialization option.

### Android SDK

#### Version 1.2.4

 - Fixed the null pointer when calling the `initialize()` function. (FFM-10499)

#### Version 1.2.3

 - Fixed uncaught exception error that occurs if initialization fails.

### Flutter SDK

#### Version 2.1.2 

 - This fixes the Android application crash when using the back button and re-opening the app. (FFM-10501)
 - We've bumped the `uuid` package to ^4.3.3.

#### Version 2.1.1

 - We've added support for Kotlin version 1.7.x for Android projects. Previously, the compilation would fail due to Kotlin compilation issues.
 - We've upgraded Feature Flags' Android SDK to 1.2.3, which ensures the SDK will not crash the application should initialization fails. For full details of all Feature Flags Android SDK relases, please see the: [Feature Flags' Android Client SDK Changelog](https://github.com/harness/ff-android-client-sdk/releases).

### Java SDK

#### Version 1.5.0

 - Upgraded `okhttp` and the following CVEas have been resolved:
 -- CVE-2023-3635, 
 -- CVE-2022-24329,
 -- CVE-2020-29582

 - Delete events were throwing `ApiException` errors. This is now resolved. 
 - The `commons-collections404` has now been removed.
 - `maven-model` has now been removed.
 - `threetenbp` has now been removed. 
 - Add GraalVM example application (experimental).
 - The Gradle `dependency-check` plugin has been added. 
 - Add Gradle dependency-check plugin.
 - `ch.qos.logback:logback-classic` has been upgraded from 1.2.11 to 1.3.12. (FFM-10373)

### Javascript SDK

#### Version 1.23.0

 - We've added defensive code around the `BTOA` usage. (FFM-10499)

#### Version 1.22.0

 - When using the `cache` option, the cache key is now based on target and instance to be more unique. (FFM-10453)

### Node.js SDK

#### Version 1.6.0

 - We now support `strictNullChecks` when passing an `undefined` target to client variation methods. (FFM-10413)

### Python SDK

#### Version 1.4.0

 - You can use the new `get_flag_type` public method to check the type of a flag at any time. If you'd like to see an example of this, have a look at the [`get_flag_type.py`](https://github.com/harness/ff-python-server-sdk/blob/main/examples/get_flag_type_example/get_flag_type.py).(FFM-10393)
 -  We've added a more robust variation method, `int_or_float_variation` to evaluate number flags. This method ensures that a number flag with either integer or float variations (or both) will be evaluated correctly. The `int_variation` and `number_variation` methods could fail to evaluate depending on if the variation served was of the expected type. We recommend using this new method going forward for number flag evaluations.

### React SDK

#### Version 1.7.0

 - This version updates the JavaScript SDK to the latest version. This will now make your experience using with React Native much better. (FFM-10488)

# Previous releases

<details>
<summary>2023 releases</summary>

## December 2023

### Android SDK

#### Version 1.2.2 

 - We resolved a `ClassCastException` that would cause the SDK to crash when returning the default variation. 
 - We have now resolved the `jsonVariation` issue and it is now returning the default variation.
 - We did some refactoring to improve the code quality. 
 - We no longer post metrics for default variations being used.

### Erlang SDK

#### Version 3.0.0

**Breaking Percentage Rollout Changes**

 - The percentage rollout hash algorithm was slightly different compared to other Feature Flags SDKs, which resulted in a different bucket allocation for the same target. The overall distribution was the same, but this change ensures that the same target will get the same allocation per SDK. 
 - If a custom BucketBy field is set on the web app, but it can’t be found in a target, then the SDK will fall back to bucketing by target identifier for that target and a warning will be logged.

### JavaScript SDK

#### Version 1.21.0

 - Added the `Harness-Target` header.

### .NET SDK

#### Version 1.4.1 

 - The thread safety metrics issue have been resolved.
 - We no longer store duplicate targets used by metrics in memory. 
 - Uses the global target identifier for evaluation metrics.
 - `Config.ConnectionTimeout` is being treated as seconds internally rather than milliseconds. 

#### Version 1.4.0

 - Added the `WaitForInitialization()` method and have deprecated the InitializeAndWait() method. 

### React Native SDK

#### Version 1.0.3

 - The React Native SDK for Harness Feature Flags is now deprecated and will no longer be actively maintained. 

We encourage users to migrate to our React SDK. For more information on transitioning to the React SDK, please refer to the [React SDK Documentation](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/client-sdks/react-client).

## November 2023

### Android SDK

#### Version 1.2.5

 - Only log Flag/Segment not found warning in valid scenarios

#### Version 1.2.1

 - The Flag/Target Group streaming updates no longer result in a `ClassCastException`.
 - The Target group streaming changes are now sent in the `EVALUATION_RELOADED` event instead of `EVALUATION_CHANGED`.

#### Version 1.2.0

 - Add dependency-check-gradle to build
 - Improve logging + Adding SDK error codes
 - Update SSE implementation
 - Bump minSdk to 21 and targetSdk to 33
 - Fixed jsonVariation always returns default value
 - Update client API code to use latest ff-api definitions
- Fixed metrics reporting 0 in payload
- Avoid posting metrics if total evaluation count is 0
- Add refreshEvaluations
- Retry on Client Authentication failures
- Add retry interceptor to authentication
- Add waitForInit

### Golang SDK

####  Version 0.1.6

 - Add dead SSE stream detection
 - SSE reconnection improvements
 - Use Harness fork of r3labs/sse
 - Add analytics headers to requests made by the SDK

### Java SDK

### Version 1.4.0

 - Updated the percentage rollout hash to match GoLang SDK.
 - Dropped SSE event log down from `INFO` to `DEBUG`.

#### Version 1.3.1

 - Added Java 21 Support.
 - Marked private attributes not working. 
 - Improved stream restart logic. 
 
### Node.js SDK

#### Version 1.4.0

 - Can now remediate build time CVEs.
 - Can now fall back to identifier if the `bucketBy` attribute is not found.

#### Version 1.3.7

 - Upgrade Axios due to CVE

### Python SDK 

#### Version 1.3.0

 - The below requests now implement a retry mechanism of up to 10 retries on retryable errors:
    - target-segments, 
    - feature-config, 
    - target-segments/\{identifier}, and 
    - feature-config/\{identifier}.

Fixed issues

 - Pip upgraded to 23.3.
 - Requests upgraded to 2.31.0.
 - Changed Murmur3 hash calculation to be unsigned instead of signed to ensure the Python SDK produces the same hash as other SDKs for use in percentage rollout caclculation. 
 - Deleted resources are only removed from the local cache where the SDK would try to fetch deleted resources from the server after SSE delete events, resulting in 404 errors.
 - The SDK now throws and catches an exception instead of returning 'None', which would previously result in an uncaught `AttributeError` when flag or group requests failed after exceeding all retry attempts.
 - When requesting a variation on the wrong flag type (e.g., requesting a boolean on a string) would attempt to evaluate. Now, an SDK error code is logged, and the default variation is returned.
 - Improved the logic to stop polling if streaming is enabled. Additionally, fixed an issue where the poller would stop and not make any more flag updates after encountering an exception during a request.
 - Logging to correctly indicate when a stream disconnects and the SDK falls back to polling.
 - Changed various verbose logs from info to debug.

#### Version 1.2.4

 - Set default log level to WARNING 

### Ruby SDK

#### Version 1.2.1

 - Used pessimistic version operator for the minor versions.

#### Version 1.2.0

 - The percentage rollout bucket by logic is now fixed to match Golang SDK.

### SMP 0.11.0 Release

 - The Feature Flag Pipeline steps, RBAC permissions for specific environments (or environment types) returned a `no permissions` error when the user had the required permission. This has now been resolved. (FFM-9672)
 - The feature flag module did not ship with an OOTB role that could toggle flags. This meant that:
 -- Customers on the free tier could only toggle flags as admin users because they were unable to create custom roles.
  - As a result of resolving, you can now:
 -- ship with an OOTB "feature flag admin" role that contains all the feature flag permissions (excluding delete),
 -- assign users the "feature flag admin" role to allow them to toggle flags. (FFM-9542)
 
### SMP 0.12.0 Release

  - The Specific Targeting section of the Flag detail page would not display a variation if the name was not set has now been fixed. If the name is not set, the page will now fall back to the identifier. (FFM-9858)
 - The Feature Flags onboarding wasn't able fetch metrics to complete the verification step. This has now been resolved. (FFM-9743)
 - A new Feature Flag targeting rule could be saved without adding a target or target group which has now been fixed. (FFM-9871)

## October 2023

### Golang SDK

#### Version 0.1.15

New features and enhancements

- [Flag cleanup automation](https://developer.harness.io/docs/feature-flags/use-ff/ff-creating-flag/manage-stale-flags) beta available to all customers. This feature helps remove stal flags from your code automatically.

Fixed Issues

 - If SSE disconnects, it now reconnects immediately instead of at every polling interval
 - Fixes panic that occurs when swapping from streaming to polling
 - Refactored streaming and polling code to aid maintainability

#### Version 0.1.13

 - Added codes to aid in SKD troubleshooting. [More info in the SDK docs.](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/server-sdks/feature-flag-sdks-go-application#troubleshooting)
 - Enhanced reporting of evaluation errors 

### Javascript SDK

#### Version 1.20.0

 - Deprecated non-supported options

### .NET SDK

#### Version 1.2.2

 - Fix targets not updating correctly
 - Fix hostname validation on custom TLS certs

#### Version 1.2.1

 - Previously, only the first prerequisite was processed. Now, all prerequisites are used correctly. (FFM-7871)
 - The rules operator 'equal_sensitive' did not work correctly in all cases. This functionality has been standardized with other SDKs. (FFM-9219)
 - Previously, the SDK did not enforce a minimum poll interval. This issue has been corrected so a poll interval is now enforced. (FFM-9220)
 - Fixed the version/account/env metadata reported in headers for metrics processing. (FFM-9207)
 - Update to latest OpenAPI spec to improve handling of null items defined as optional. (FFM-9221)
 - Support Microsoft.Extensions.Logging. (FFM-939)  
 - TLS support for custom CAss (FFM-7007)
 - CVE: Update wiremock to latest version 1.5.36. (FFM-9472)
 - CVE: Update Newtonsoft.Json to version 13.0.3. (FFM-9473)
 - CVE: Update NuGet.Frameworks to version 6.5.1. (FFM-9474)

### Node SDK

#### Version 1.3.6

 - Updated to use Logger for logging instead of console.log

#### Version 1.3.5

 - Avoid sending empty metric payloads
 - Upgrade `lru-cache` to version 7 which contains a significant performance increase
 - Add support for `nodeNext` module resolution

### Python SDK

#### Version 1.2.3

 - Fixed an issue where `SDKCODE1003` was logged even when `wait_for_initialzation` was not called 

## September 2023

### Flutter SDK

#### Version 2.1.0

 - Released to support Flutter Web

### iOS SDK

#### Version 1.1.2

 - Fixed issue with metric target evaluation. 

#### Version 1.1.1

 - Fix runtime failure when target is nil. 

### Java SDK

#### Version 1.3.0

 - Standardized SDK error codes. 

### Javascript SDK

#### Version 1.18.0

 - Emit flags as part of polling intervals using POLLING_CHANGED event.

#### Version 1.16.0

 - Changing evaluation handling for Flutter Web.
 - Removed dependencies Guava and MapDB. 
 - Added retry enhancements to authentication failures.
 - Local connector now creates a metrics folder.

## August 2023

### Feature Flags 

#### Server Updates

##### Version 1.1079.0

 - Improved cache store handling for pre-evaluations.
 - Added an infrequent error caused by a panic during flag deletion.
 - Automatically disable Git sync if flags.yml can not be found.
 - Automatically time out if events take too long to send, rather than hanging indefinitely.
 - Added additional test coverage for target attributes with IN clauses.
 - Mark a flag as stale if the Flag previously had evaluations but has not in 60 days.

##### Version 1.1078.1

 - Due to an error with gitSync logic on environment creation, the activation for the new environment did not get properly created when GitSync was enabled.
 - To resolve this, we:
  - Fixed the gitSync function for newly created environment.
  - Added gitSync for deleted environments. 
- Sending a GET request to the /targets/$\{IDENTIFIER} endpoint returned a 200 error code, even if the target didn't exist. This error code has been changed to 404.
- Previously, a multivareate flag's variation values had an erroneous maximum limit of 2704 bytes, with a poor error message if this was exceeded. 
This limit has been raised to 25000 bytes, with a clear error message if this is exceeded.
- Targets sent by the server-side SDKs were not being updated in the database. This meant if a sever-side target changed, while evaluations worked as expected, the updated attributes were not shown in the UI. This fix ensures targets are correctly upserted.

#### UI Updates

##### Version 0.357.0

 - Previously, the Feature Flags modal screen disappeared when the user clicked in the background, which caused the data to disappear. This issue has been fixed.
 - Previously, on the flag details page, if all target groups were assigned to rules, the Percentage Rollout target groups selection would disappear. This issue has been fixed. 
 - Previously, when creating a flag targeting rule, using autocomplete search for a target group could remove target groups from other rules within the same flag. This issue has been fixed.

##### Version 0.357.0

 - Previously, the permission to create a feature flag was required across all environments. This restriction has been removed. 
 - Previously, when users selected **All Environments** from the **Environments** dropdown menu, then refreshed the page or went to another page, the **Back** button didn't return the user to the All Environments page. This issue has been resolved.

### Apex SDK

#### Version 0.1.2

 - Avoid loading all flag/target segment config into two cache keys, instead use a key per item, so we don’t exceed SFDC account limits and get `cache.ItemSizeLimitExceededException`. 

### Javascript SDK

#### Version 1.15.0

 - If the SDK was being suspended while inside a mobile app in a webview, our SDK didn't support this usecase and required workarounds.
 - Removed a third-party SSE library causing event-handling errors.

### Node.js SDK

#### Version 1.3.2

 - Previously when using waitForInitialization, if the SDK encountered an authentication failure, it neither resolved nor rejected the promise. This could potentially lead to a Node.js process termination with an exit code of 0 when no operations were performed outside the asynchronous function block where it was called. The SDK now correctly rejects the promise in the event of an authentication failure. This rejection will provide error details. 
 
### React SDK

#### Version 1.5.0

- Version released. Upgrades JavaScript SDK version to 1.15.0

### Ruby SDK

#### Version 1.1.4

 - This release fixes an error where "Starts With" target group rules did not receive data in the correct format to be processed by the Ruby SDK. (FFM-9036)

#### Version 1.1.2

 - The Ruby SDK did not handle the 'IN' operator correctly. If a target group used the 'IN' operator in a rule, then that rule would fail to evaluate correctly. This could lead to the wrong variation being served to a target. The SDK has been updated to correctly handle IN operators for target group rules.

## July 2023

### Feature Flags 

#### UI Updates

##### Version 0.355.0

 - When specifying percentages for a rollout, the UI now provides feedback while you edit to let you know the percentage that requires assignment.
 - Fixed an issue where the API call was triggered twice in the front end when creating a flag.


#### Server Updates

##### Version 1.1077.0

 - Fixed an issue where if no attributes were given in the target, the SDK sometimes threw a TypeError exception when processing rules.
 - Previously, the developer count reported under the Feature Flags license usage page (**Account Settings > Subscriptions > Feature Flags > License Count**) included a 'System' user that should not be counted towards the customer's total count of developers. This fix excludes the 'System' user from the count. 
- Previously, targets sent by the server-side SDKs were not being updated in the database. This meant if a server-side target changed, evaluations worked as expected, but the updated attributes were not shown in the UI. This fix ensures targets are correctly updated.

##### Version 1.1076.0

 - Fixed an issue where the query parameter `identifier` in the API `https://app.harness.io/gateway/cf/admin/segments` did not work correctly. 
 - The flag pipeline was not updating the build number. This issue has been fixed. 
 - Target attributes were not updating on conflict. This issue has been fixed.

### Android SDK

#### Version 1.1.3

 - The SDK's cache has been rewritten to improve its stability.
 - The Gradle wrapper has been included in the SDK repository so that users can build without having to install Gradle.

#### Version 1.1.2

 - There was an issue where the python SDK failed when connecting to the proxy. When connecting to Harness SaaS, the SDK extracts the `accountID` from the auth response and adds it to a header in all future requests. The `accountID` is not availabe to the SDK when connecting to the proxy, so it failed due to its absence. This fix ensures the SDK skips the header if `accountID` does not exist. 

#### Version 1.1.1

 - Removed the following error, which is reported by Gradle's Lint task:
   * `checkClientTrusted`` is empty, which could cause insecure network traffic due to trusting arbitrary TLS/SSL certificates presented by peers.
 - Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections.

### Erlang SDK

#### Version 2.0.1

 - Some SDK dependencies were not included in releases created by `mix`. This issue has been fixed. 

### iOS SDK

#### Version 1.1.0

 - The following methods now have an alternative overloaded version that allows you to get the result of the flag directly in the return value, without the need to provide a closure block.

    * stringVariation()
    * boolVariation()
    * numberVariation()
    * jsonVariation()

  * Added TLS support for custom/private certs in the iOS SDK for config, stream and metric endpoints.

    * The CfConfigurationBuilder now has new methods for taking a list of X.509 certificate authority (CA) certs. This list must also include any intermediate CAs the Apple security APIs may need to resolve the full trust chain. 

    * For custom certificates, you must also ensure that the Subject Alternative Names (SANs) are set up correctly in the CA for domain name validation to pass.

    * The new function setTlsTrustedCAs() takes a list of X.509 CA certificates in PEM format, which will be used to verify the server's web cert sent during TLS handshake. Each PEM certificate must include the BEGIN/END CERTIFICATE headers.

  * Made the following improvements.

    *  Added standardized SDK error codes for events such as initialization, authentications, etc. For a full list, go to [Troubleshooting](/docs/feature-flags/use-ff/ff-sdks/client-sdks/ios-sdk-reference#troubleshooting).
    * Added general improvements to logging statements, reducing verbose logging to the console. 
    * Added support for configurable custom loggers. For code examples, go to the [SDK repository](https://github.com/harness/ff-ios-client-sdk/blob/main/docs/further_reading.md#custom-loggers).

  * Added retries for the authentication, and other endpoints. Network timeouts and certain HTTP error codes will be retried with a random delay up to 3 times. (FFM-8049)

  * Added a new API, refreshEvaluations(), that can be called by a mobile app coming to the foreground to update any SSE events that were missed while the app was suspended. (FFM-8160)

  * It is no longer necessary to call registerEventsListener() to start listening to events—calling initlialize() should be enough. (FFM-8106)

  * When a target group is created Harness sends an event to connected SDKs to refetch all flags. The IOS SDK previously didn't do this refetch, and now does. (FFM-8137)

  * Previously, when a target group event was received the SDK fetched all flags, but did not return an event so that apps could be updated accordingly. With this fix, in this case, the SDK returns the onPolling event after all flags are fetched. (FFM-8174)

  * Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections. (FFM-8048)

### Java SDK

#### Version 1.2.4

 - Fixed an issue where, if a flag had prerequisite flags configured, only the first prerequisite flag was being processed and the remaining were being ignored.

### .NET SDK

#### Version 1.1.9

  - Fixed an issue where using the relay proxy caused the SDK to crash. 

### Node.js SDK

#### Version 1.3.1

 - Previously, calling waitForInitialization was resolving before the SDK was fully initialized, leading to default values being served until initialization completes. This issue has been fixed. 

### Python SDK

#### Version 1.2.2

 - Fixed an issue where the SDK was crashing when used with the relay proxy. 

#### Version 1.2.1

 - The SDK incorrectly logged low level debug information as errors. This issue has been fixed. 

### Ruby SDK

#### Version 1.1.3

 - Released current version. 
 - Fixed an issue where if no attributes were given in the target, the SDK sometimes threw a TypeError exception when processing rules.

#### Version 1.1.2

  - There was an issue where if a feature flag was configured to use a custom attribute with the `IN` operator clause, the `IN` operator didn't work correctly. This issue has been fixed.

## June 2023

### Feature Flags 

#### UI Updates

##### Version 0.353.0

 - The Create a new flag button did not behave as expected on the onboarding screen if there were existing flags. This issue has been fixed.

##### Version 0.351.0

 - On the **Feature Flags** page, when viewing the state of flags across all environments, the flag status column now scrolls all the rows as one. This makes it easier to view flag and environment states on one screen.
 - In the onboarding flow, we added a new button and text box for a new project when there are no environments created. 
 - The view in the modal screen for setting up GitEx was not wide enough to show appropriate errors. This issue has been fixed. 
 - In the user onboarding flow, the Create a New Flag button did not behave as expected. This issue has been fixed. 
 - Previously, a user could select Feature Flags in Harness without having a license, and would then get a 404 error. Now, users only see the FF module if they have an active license (including a free license).
 - Previously, there was an edge case where an extremely large number of pages in a UI listing could cause performance degradation. This issue has been fixed, and page numbering is now disabled if the page count exceeds 1000 pages.
 - There was an issue where toggling between the Targets and Target Groups pages caused the new page to re-render. This issue has been fixed.

##### Version 0.349.0

 - Previously, display of the FF module depended on an internal Harness feature flag. Now, display of the FF module is instead based on having an active license (including 'free').
 - Previously when a new user was onboarding in the Feature Flags page, when they selected **Get Started**, they saw a dropdown of flags, even though they hadn't created any flags yet. Now, when users do not have any existing flags, they see a text box that prompts them to create one.

#### Server Updates

##### Version 1.1075.0
 - The Activity tab on the flag detail page was sometimes slow to load on flags with many (hundreds) of historical changes. This has been resolved, and this tab's loading times are improved.
 - On the flag detail page, Flag Pipeline tab, the pipeline execution list was sorted with most recent executions last. This ordering has been reversed so that the most recent pipeline executions are shown first. This allows pending executions to be viewed at the top.
 - Where users had multiple target rules, in certain circumstances users couldn't delete these rules when the wrong IDs were returned. This fix addresses the problem of the incorrect IDs being returned, and ensures the targets can be removed.

### Android SDK 

#### Version 1.1.0

 - Added a new API to allow SDK users to provide a trusted TLS CA certificate for connecting to Feature Flag services with private root CAs.
 - Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections.
 - Fixed broken links in the first time setup documentation.

### Erlang SDK 

#### Version 1.1.0

 - Erlang SDK updated.
 - You can now add an optional logging configuration option so that the logging level can be set for the SDK.
 - If this option is not set, the SDK uses the default log level of `warning`. To see an example logging configuration, go to [the SDK readme](https://github.com/harness/ff-erlang-server-sdk/blob/main/README.md#set-logging-level).

### Flutter SDK 

#### Version 2.0.0

 - Flutter SDK updated.
 - Flutter 2.0 and Dart 2.12 and later are required. For more information, go to [Sound null safety](https://dart.dev/null-safety) in the Dart documentation.

### iOS SDK 

#### Version 1.0.4

 - Fixed the stream connection to have a read timeout of 60 seconds. This enables stale connections to be detected and closed, and retries to be started for polling/SSE connections.
 - Fixed a nil pointer dereference bug that caused the SDK to crash under certain conditions.

### Java SDK 

#### Version 1.2.3

 - There were reports of customers having difficulty running the SDK because of a missing dependency, `oksse`. Unless users have the JitPack repo in their POM/Gradle file, they are likely to have this problem at compile time. With this fix, we've removed the `oksse` dependency and now use `okhttp-sse` instead. 
 - Added `Harness-SDK-Info`, `Harness-EnvironmentID` and `Harness-AccountID` HTTP headers to outbound HTTP connections.
 - Updated the `maven-model` dependency to version 3.5.0 to remove the CVE-2022-4245 vulnerability. 
 - Updated to the latest version of Guava, 32.0.1-jre, to remove security issues.

### JavaScript SDK 

#### Version 1.14.0

 - Added a new function, `refreshEvaluations()`, which can be called to programmatically trigger a full refetch of evaluations from the server.

### .NET SDK 

#### Version 1.1.8

 -Added additional headers to SDK HTTP requests for better analytics.
 - Reworked metrics caching to use a map instead of a queue. This improves memory usage and performance.
 - We now send the SDK version information with the metrics payload for better analytics and tracking. 
 - Added logging when a default evaluation is served.
 - Standardized and improved Logging across the SDK.
 - Fixed error handling when a null target is passed in.

### Node.js SDK 

#### Version 1.3.0 

Due to a new dependency on a murmur3 hashing library implemented in Elixir, the following is now required to use the SDK in Erlang applications:
   - Elixir version 1.13.4 or above must be installed on your build system when compiling your application.
   - Rebar3 `rebar_mix` must be installed in your Rebar3 plugins.
   - For full details, go to Install the SDK for Erlang applications.
   - This update does not affect Elixir applications, and no further action is required for Elixir applications upon upgrading to this version of the SDK.

 - Enhancement: Implemented retry logic for authentication, polling, and metrics services for resilience and fault tolerance.
 - Enhancement: Changed supervisor restart intensity from 1 restart in 5 seconds to 4 restarts in 5 seconds.
 - The murmur3 nif library has been replaced by pure Elixir library.

The following changes are included in issue number FFM-8289:
   - Added validation to the JWT token returned by the Feature Flags authentication service.
   -  Previously, if the SDK failed to authenticate with the Feature Flags service, the SDK crashed. With this fix, the SDK now logs a warning and serves the default variations you provided in your evaluation calls.
   - Added a list of codes that are logged for each lifecycle event of the SDK, such as initialization, authentication, and so on. For a full list of codes, go to [Troubleshooting](/docs/feature-flags/use-ff/ff-sdks/server-sdks/node-js-sdk-reference#troubleshooting).

#### Version 1.2.17

 - Previously, when `client.close()` was called, the SSE stream was not terminated. This fix ensures that the SSE stream is properly terminated.

### Python SDK 

#### Version 1.2.0 

 - To improve performance, the SDK now sends targets to the metrics service in batches of 1000. Up to 200 batches, or 200K unique targets, can be sent in the metrics window. This is not user-configurable, and is controlled through the SDK. For more information, go to [Feature Flag FAQs](/docs/faqs/harness-feature-flag-faqs#how-does-the-metric-aggregatebatch-the-data-before-sending-it-to-harness). 
 - The SDK no longer allows `events_sync_interval` to be set below 60 seconds. If it is, the value defaults to 60 seconds.

#### Version 1.1.6

 - Previously, if the SDK evaluated flags with a large amount of targets (tens of thousands), the SDK could encounter `read_timeout` errors. This fix increases the HTTP timeout of the SDK, and imposes a limit of 50,000 on the number of targets that can be sent to the UI.

 - **Known issue** - We are working on resolving the following issue in a future version:
   - During a metrics interval, if you evaluate flags with more than 50,000 unique targets (based on identifier, name and attributes), then only the first 50,000 targets get sent in the request to the metrics API. This means that the targets that are not included in the request do not appear in the UI, but when they are included in evaluations during subsequent metrics intervals, they will be correctly registered in the UI.

#### Version 1.1.5

To aid in debugging, we added a list of codes logged for each lifecycle of the SDK. Some of the lifecycle events these codes cover are:
  - `Initialization`
  - `Authentication`
  - `Polling`
  - `Streaming`
  - `Evaluation`
  - `Metrics`
  - `Close`

For a full list of codes, go to Troubleshooting.

Troubleshooting.

#### Version 1.1.15

 - Previously, the SDK crashed if `client.close()` was called at any point before a stream event was sent to the SDK. With this fix, the SDK closes all threads correctly.

#### Version 1.1.14

 - The SDK now sends extra headers to backend requests to aid in diagnostics.
 - The SDK now retries on failed client authentication requests for specific HTTP errors. If client authentication fails, the SDK serves the default values you provide in `variation` calls.

### React SDK 

#### Version 1.4.0 

 - Added a new [useFeatureFlagsLoading](https://github.com/harness/ff-react-client-sdk#usefeatureflagsloading) hook to allow apps to react to changing of loading state.
 - Added a new [TestWrapper](https://github.com/harness/ff-react-client-sdk#testing-with-jest) testing component to allow easy mocking of the network portion of the SDK for use in [Jest](https://github.com/harness/ff-react-client-sdk#testing-with-jest) unit tests.
 - Updated the included JavaScript SDK from version 1.10.0 to version 1.13.0.
 - Refactored all hooks and Higher Order Components (HOCs) to ensure proper triggering of metrics.

## May 2023

### Feature Flags 

#### UI Updates

##### Version 0.349.0

 - The toggle for turning Git Sync on and off was causing the branch settings menu to disappear and display the **Set Up Git Sync** button incorrectly. This issue has been fixed.
 - The Target and Target Group pages reported successful save and edit operations before the operations completed. This issue has been fixed.

##### Version 0.347.0

 - Fixed an issue in the onboarding flow where the flag validation did not work as expected.

#### Server Updates

##### Version 1.1071.0

 - For customers with a large volume of targets (in the millions), the Target page load time could be slow. Harness has introduced additional indexes to improve the response time of this page. 
 - There was an issue when Git Sync was first configured, a sync was not attempted until a flag was changed or a new one was created. With this fix, a sync is immediately attempted when you configure Git Sync, and the existing flags in your project are backed up to the remote file. 

##### Version 1.1054.2

 - The Identifier search filter sometimes incorrectly used a wildcard match. This happened if two flags had overlapping names such as `flag_one` and `flag_one_b`. The detail view of `flag_one_b` sometimes returned `flag_one` details instead. Because flags order by creation, this only happened when flags were created in a certain order. This fix uses an exact match when searching for flag identifiers. 

##### Version 1.1041.0

 - Previously, re-enabling Git Experience did not trigger an immediate Git sync. With this change, flags are synchronized as soon as Git Experience is re-enabled. 
 - Some Git sync operations were failing if there was a large volume of flags and environments. This fix increased the transaction time-out for Git sync calls to allow processing of a large number of the flags.
 - Policy checks weren't being carried out on flag rules added from the Target Group details page. This issue has been fixed.
 - Previously, Feature Flag permissions and roles assigned to users or user groups in Access Control were applied at the account and project levels, but not at the organization level. With this change, roles and permissions assigned at the organization level are now honored. 
 - When you try to delete a flag that is a prerequisite to another flag, the UI now shows an improved message that explains why this cannot be done: *Cannot delete flag which is a prerequisite for other flags*. 

### Python SDK 

#### Version 1.1.12

 - There was an issue where if an error occurred when processing a new stream event, the SDK could potentially log a blank string. This issue has been fixed and the SDK now logs these errors correctly.

#### Version 1.1.11

 - Fixed an issue where the SDK was not evaluating flags with multiple and/or nested prerequisites correctly.

### Ruby SDK 

#### Version 1.1.1

 - Fixed evaluator logic. Before, if a target group had multiple clauses, all clauses had to evaluate to true for the entire condition to be true. This logic has been changed to match that of other SDKs. Now only one condition clause needs to be true.
 - Certain log messages will now be coded with a unique 4-digit number to help identify issues across SDKs.
 - Response code patterns for each SDK stage are:
   - Initialization - 1xxx
   - Auth - 2xxx
   - Close - 3xxx
   - Polling - 4xxx
   - Streaming - 5xxx
   - Evaluation - 6xxx
   - Metrics - 7xxx

## April 2023

### Feature Flags 

#### UI Updates

##### Version 0.346.0

 - Fixed an issue where the metrics loading spinner was hanging indefinitely.
 - Fixed an issue where users with reduced access could not create Feature Flags SDK Keys as a result of a permission mismatch between the frontend and backend.

##### Version 0.345.0

 - The UI now provides improved RBAC messaging when trying to toggle or edit a flag in an environment without the correct permissions.

#### Server Updates

##### Version 1.1007.0

 - Previously, the number of flags returned in the **Target Management** page was capped at 100.  This change lets Harness show all flags even if the number is greater than 100.
 - Feature Flag identifiers now follow the same guidelines as the Harness Platform entities. This means they can include a `$` in the name.
 - Previously, FF was only checking permissions at the account and project level. With this update, permissions and roles assigned at the organization level will also be honored.

### Apex SDKs 

#### Version 0.5.1 Beta

 - The JSON parsing code was unable to parse the fields `createdAt` and `modifiedAt` in the Target Segment response, because the values were too large for an Integer data type. This issue has been fixed.

### Node.js SDKs 

#### Version 1.2.16

 - The eventsource library was opening three separate streams instead of one when the library disconnected and reconnected. This issue has been fixed.
 - Updated the field validation for the **YAML path** field in the Git connection form to prevent entering invalid path names beginning with `./`.

#### Version 1.2.15

 - Occasionally, the retry strategy could open several event streams at once if the application disconnected intermittently. This issue has been fixed and the SDK opens only one stream when the EventSource library reconnects.
 - The EventSource library was updated to version 2.1.4.

### Python SDKs 

#### Version 1.1.10

 - The SDK now logs an error if an evaluation fails and the default variation is returned.

### Ruby SDKs 

#### Version 1.1.10

 -  Metrics counters are now stored in a map, instead of a queue, for more efficient memory usage. The metric payload size should now also be smaller, resulting in more efficient network bandwidth usage. 
 - Improved the authentication retry logic to only retry on certain HTTP codes. Certain error codes will be treated as transient and others not. Ensured that while the SDK is authenticating, default values are served.
 - Added a Ruby on Rails example in the SDK [repository](https://github.com/harness/ff-ruby-server-sdk).
 - Disabling the metrics processor didn't disable entries being written to the queue, causing an eventual memory leak. This fix corrects this behavior. 
 - Added TLS support to the SDK and updated the documentation in the SDK [repository](https://github.com/harness/ff-ruby-server-sdk).

## March 2023

### Feature Flags 

#### UI Updates

##### Version 0.341.0

 - Onboarding examples displayed a flag name instead of the required flag identifier. This issue is now fixed.

#### Server Updates

##### Version 1.979.0

 - Before this update, targets never expired. Now, targets expire if they have not been updated for 60 days, except when used in flag rule, or when part of a target group's include/exclude lists. For more information, go to [How targets expire](/docs/feature-flags/use-ff/ff-target-management/add-targets#how-targets-expire).

##### Version 1.968.0

 - When searching for a flag, the search filter sometimes failed if the flag description was null rather than empty. This issue has been fixed.
 - When using GitSync to save a flag with a floating point value, the feature flag service generated an error.
 - The service now correctly handles floating point numbers saved from Git.

### Erlang SDK

#### Version 1.0.0 Beta

The **Erlang server SDK**, which was in Beta, has been released as GA. 

This release includes the following updates:
 - **Breaking changes**
  - Changes to mulit-instance behavior. Go to the [Readme](https://github.com/harness/ff-erlang-server-sdk#run-multiple-instances-of-the-sdk) for updated instructions and code samples for the following:
  - If you define a multi-instance configuration, and one of the instances (including the default instance) fails to authenticate, then the other instances do not attempt to start, and the SDK does not boot.
  - You can choose not to start the default instance.

* **Enhancements**
  - The SDK is now available on [hex.pm](https://hex.pm/).
  - Improved logging for debugging purposes

 - There was an issue in multi-instance functionality that prevented users from starting up multiple instances. This issue has been fixed. (FFM-7187)

### Go SDK

#### Version 0.1.8

 - Previously, a few logs on startup would use fmt.Println() instead of using the custom logger passed in via harness.WithLogger(logger). This could cause these startup logs to be in a different format, and appear to be logged at an `error` level instead of logged correctly as `debug`. This has been resolved and all logs emitted by the SDK now go through the custom logger if it's passed in.

#### Version 0.1.7

 - Previously if a custom logger was passed in to the SDK through the harness.WithLogger(logger) function, the custom logger was not used when logging HTTP requests. This could cause HTTP request logs to be in a different format, and appear to be logged at an `error` level instead of correctly logged `debug`. This has been resolved, and all logs emitted by the SDK now go through the custom logger if it's passed in.
 - Added a flag code cleanup example and some information on how to run the example in the [Go SDK repository](https://github.com/harness/ff-golang-server-sdk).
 - Added documentation in the [Harness flag_cleanup repository](https://github.com/harness/flag_cleanup) on how to clean up flags automatically using Harness pipelines.

### Java SDK

#### Version 1.2.2

 - Minor internal changes were made to make it easier for developers to use classes that were previously marked private.

#### Version 1.2.1

 -When an SDK key was not supplied, the SDK continually retried. This issue was fixed and now, if authentication fails, the SDK no longer retries constantly, and instead generates a MissingSdkKeyException. 

#### Version 1.2.0

 - Improved support for TLS allows custom CA certificates to be provided.
 - A new HTTP header, `Harness-SDK-Info`, was added. This header helps the Feature Flag service identify connected client SDKs apart from server SDKs.
 - Error handling for invalid SDK keys has been improved.

### Node.js SDK

#### Version 1.2.14

- The EventSource library was updated to version 2.1.3. 
- On streaming errors, the error was not included in the `retrying` event payload. This fix adds the error to the payload. 
- Checks were added to see if errors are eligible for retries, and if not, the SDK stops retrying. 
- The SDK now logs each retry. This ensures the most recent error is logged if errors change during retries.

#### Version 1.2.13

 - A race condition during initialization could cause some flag evaluation calls (when called immediately after calling waitForInitialization) to return the default value instead of the actual evaluated value. This issue has been fixed. 

#### Version 1.2.12

The event source was updated to version 2.1.2. This adds eligible errors to the `retrying` event payload. 

#### Version 1.2.11

  - All three retry strategies no longer fire off their initial retry at the same time.
  - The eventsource library now closes correctly if `eventsource.close` is called while it's in a RETRYING state.
  - The SDK no longer retries on 40x errors. It now only retries on 50x and I/O errors.

## February 2023

### Feature Flags 

#### UI Updates

##### Version 0.339.0

 - The **Complete** button at the end of the onboarding flow was always enabled. Now, it is disabled until the user receives a successful evaluation.

#### Server Updates

##### Version 0.341.0

### Flutter SDK

#### Version 1.0.10

  - This SDK now uses Android SDK 1.0.20.
  - This update fixes excessive network calls when calling flag evaluation functions. 

### .NET SDK

#### Version 1.1.7

 - The default poll interval was corrected from 20 seconds to 60 seconds, consistent with the other SDKs. 
 - The SSE EventSource was not detecting that a connection may have dropped. The SDK will now reconnect correctly if it loses its connection to the stream endpoint.

### Node.js SDK

#### Version 1.2.10

The Node.js SDK uses the eventsource library. **In rare cases**, an issue occurred when a 500 response was received from the remote system, the connection seemed to close and stop retrying. However, if it received an unspecified error, for example if the endpoint doesn’t exist or goes down suddenly, or if the remote system closed the connection, then the SDK tried to connect to the /stream endpoint every second, forever. This issue was resolved with the following updates:
  - The SDK now falls back to polling if the stream disconnects.
  - The SDK attempts to reconnect on retryable errors using an exponential backoff and retry strategy provided by the Harness fork of eventsource.
  - A new retry event is emitted so the SDK can log the current retry attempt.

### Python SDK

#### Version 1.1.9

 - SSE updates were stopping due to a lost connection. Now, the SSE connection is reestablished if it drops. 

#### Version 1.1.8

  - Added `wait_for_initialization` to the client API, which can be called to block the thread until all groups and flags have been retrieved and loaded into the cache. 
  - Added `is_initialized` to the client API, which can be called at any time to check if the initial retrieval and caching of groups and flags has been completed.
   :::info note
  For an example usage of `wait_for_initialization` go to [the SDK's repository](https://github.com/harness/ff-python-server-sdk/blob/main/examples/wait_for_initialization_example/wait_for_initialization.py).
  :::

#### Version 1.1.7

 - When adding targets to a group based on conditions, the `in` operator is now case-sensitive in the SDK. 
 :::info note 
  If you are targeting any groups using the `in` operator, ensure that your target condition takes into account the case sensitivity of the operator.
  :::

## January 2023

### Feature Flags 

#### UI Updates

##### Version 0.335.0

 - If you changed the environment, and then opened the **Pipeline** tab or **Environment** tab on a second screen, the environment you set defaulted to the original one. This has been fixed and the environment you select is consistent through all tabs. 
 - Fixed a bug that prevented a completion tick from appearing in the UI after an evaluation had successfully passed. 
 - Fixed an error that caused the Complete button at the end of the Get Started flow to link to the beginning of the flow instead of linking to the expected Feature Flag list page.
 - Resolved an issue that caused you to scroll unnecessarily when you expanded the target attribute or operator dropdown menus when creating a target. 
 - Fixed a bug where scrollbars were unnecessarily displayed in the target groups section of the targets page during loading.

#### Server Updates

##### Version 1.0.6

 - The Feature Flags authentication service has been updated to version 1.0.6 with the following update:
   - The authentication service was logging warnings as it tried to authenticate with each cluster in turn. 
   - This could produce warnings even when authentication was eventually successful. Now, if authentication is successful, no warnings are logged.

### Android SDK 

#### Version 1.0.19

 - A new event was added, `SSE_RESUME`, which fires if the application loses and regains internet.  When the event fires: 
    - The SDK internally reloads all feature config into cache. 
    - Applications can listen to this event to ensure event listeners don't miss any streamed events during periods of downtime.

#### Version 1.0.18

 - This fixes a bug that caused unhandled exception errors due to duplicate callbacks during the SDK initialization.

#### Version 1.0.17

  - Fixed a bug that caused a 401 error when the SDK tried to send a request to the `stream` endpoint if the request was to a non-production environment.
  -   Fixed a bug that caused the SDK to stop working if an identifier isn't provided during the SDK initialization. The SDK will now use the name if you don't provide an identifier. You will receive an error if you don't provide either a name or identifier as at least one of these is required for all client-side SDKs.

### Flutter SDK 

#### Version 1.0.8

This includes the following:
  - Fixed a bug that caused applications to shut down in response to API errors caused by no internet connection. 
  - Fixed a bug that caused streaming to stop working if internet connectivity was lost.

### Go SDK 

#### Version 0.1.6

 - Some target segment include rules were not working for numeric values. This issue has been fixed. 

### Java SDK 

#### Version 1.1.11

 - Timeout errors were logged due to the code calling `awaitTermination()` before `shutDown()` when stopping the update processor. There was also a misleading warning about the poller not being restarted. These issues have been fixed. 

#### Version 1.1.10

 - Improvements to how the metrics endpoint processes platform targets.
 - Fixed a bug that caused an error due to incompatibility with an older version of OkHttp.

### Javascript SDK 

#### Version 1.8.0

 - You can now provide the SDK with a set of evaluations that it can serve instantly upon initialization. For more information about this, go to [the SDK's readme file.](https://github.com/harness/ff-javascript-client-sdk/blob/main/README.md).

#### Version 1.7.0

 -  The **Javascript SDK** has been updated to version **1.7.0**. This fix adds the `Harness-AccountID` and `Harness-EnvironmentID` fields to the HTTP request header in all calls after the initial authorization request. These values are extracted from the JWT, so you don't need to add a value for them. 

#### Version 1.6.0

 - You can now customise the interval of how often metrics data is sent to the metrics endpoint.
 - If the metrics data is not successfully posted to the endpoint after two attempts, the data is cleared to ensure the metrics data doesn't get too large and cause performance issues.

### React SDK 

#### Version 1.1.0

  - You can now listen for errors that are caused by network issues. For more information about this, go to [the SDK's readme file.](https://github.com/harness/ff-react-client-sdk/blob/main/README.md) 
  - You can now provide the SDK with a set of evaluations that it can serve instantly upon initialization. For more information about this, go to [the SDK's readme file.](https://github.com/harness/ff-react-client-sdk/blob/main/README.md).

### Ruby SDK 

#### Version 1.0.6

 - This fixes dependency issues with OpenAPI that caused errors when trying to initialize the SDK. 

#### Version 1.0.5

 - This fixes a bug that caused the SDK to not wait for initialization when using the `wait_for_initialization` method.

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
* Harness provided a tool to generate offline config files. For details, go to [Run the Relay Proxy in offline mode](/docs/feature-flags/use-ff/relay-proxy/deploy-relay-proxy#run-the-relay-proxy-in-offline-mode) (FFM-3772)

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
