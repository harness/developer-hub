---
title: iOS Thin SDK
sidebar_label: iOS Thin SDK
description: Set up the Harness FME iOS Thin SDK in Swift apps. The thin SDK calls FME cloud for flag evaluations, so rollout plans and segment definitions never leave the cloud and the SDK only receives flag evaluation results.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info[Beta]
The iOS Thin SDK is currently in beta and is scheduled for general availability in the next few days.
:::

This guide covers the FME **iOS Thin SDK**. Unlike the standard [iOS SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-sdk), the thin SDK does not download flag definitions or segment data. It calls FME cloud to evaluate flags for a given target and caches the results locally for fast subsequent lookups.

Use the thin SDK when you want to keep rollout configuration server-side, minimize what is shipped on device, or restrict the targeting data exposed to clients.

All of our SDKs are open source. Go to our [iOS Thin SDK GitHub repository](https://github.com/splitio/ios-thin-client) to see the source code.

## Before you begin

The iOS Thin SDK is compatible with iOS 13 and later and macOS 10.15 and later, and requires Swift 5.5 or later. Only modern Swift is supported; there are no Objective-C bindings.

The library is distributed as a Swift package and imported as `SplitThin`.

## Initialization

To get started, set up FME in your code base with the two following steps.

### 1. Import the SDK into your project

Add the SDK as a Swift Package Manager dependency. In Xcode, choose **File** > **Add Package Dependencies...** and enter the repository URL, or add it to your `Package.swift`:

```swift title="Package.swift"
dependencies: [
    .package(url: "https://github.com/splitio/ios-thin-client.git", from: "1.0.0-beta1"),
],
targets: [
    .target(
        name: "YourApp",
        dependencies: [
            .product(name: "SplitThin", package: "ios-thin-client"),
        ]
    ),
]
```

### 2. Instantiate the SDK and create a new SDK factory client

You build the factory with an SDK key and a default `Target`, then get the SDK client from it. The client is what you call `getTreatment` and `track` on.

```swift title="Swift"
import SplitThin

// Build the factory with an SDK key and a default target
let factory = DefaultSplitFactoryBuilder()
    .setSdkKey(SdkKey("YOUR_SDK_KEY"))
    .setTarget(Target(
        // matchingKey identifies the entity being evaluated: an internal user id,
        // an account id, a device id, or a UUID for anonymous users.
        matchingKey: "CUSTOMER_ID",
        attributes: ["plan": "premium"], // optional, used for targeting rules
        trafficType: "user"
    ))
    .build()

// Get the client instance bound to the default target
guard let client = factory?.getClient() else { return }
```

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application. Avoid creating additional factories without a good reason (for example, using different SDK keys in the same app), since each factory opens its own sync connections and consumes additional resources.

`build()` returns `SplitFactory?`. It returns `nil` if the SDK key is empty, the target is missing, the matching key is empty, or the configured service endpoints are invalid. Errors are logged through the SDK logger. Use the optional binding above (or `if let`) before calling into the factory.

Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](/docs/feature-management-experimentation/api-keys) to learn more.

A factory can serve more than one target. If your app evaluates flags for multiple users, accounts, or other entities, see [Instantiate multiple clients](#instantiate-multiple-clients) under Advanced use.

#### Bucketing keys

The `Target` initializer accepts a separate `bucketingKey` alongside the matching key, for example to keep a user in the same bucket after they sign in:

```swift title="Swift"
let target = Target(
    matchingKey: "user-123",
    bucketingKey: "anon-cookie-abc",
    trafficType: "user"
)
```

If you prefer to construct the `Key` explicitly, the equivalent is:

```swift title="Swift"
let target = Target(
    key: Key(matchingKey: "user-123", bucketingKey: "anon-cookie-abc"),
    trafficType: "user"
)
```

The matching key drives targeting-rule evaluation; the bucketing key drives the percentage rollout assignment. When `bucketingKey` is omitted, the matching key is used for both.

## Use the SDK

### Basic use

After the SDK is instantiated it warms up by fetching the initial set of treatments for the default target from FME cloud. Until that completes, calls to `getTreatment` may return the configured fallback treatment (or [`control`](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if no fallback is set).

Subscribe to [`onReady`](#subscribe-to-events) before evaluating. Once the listener fires, `getTreatment` returns the latest result for the requested flag and target.

```swift title="Swift"
final class SplitListener: SplitEventListener {
    weak var client: SplitClient?

    init(client: SplitClient) {
        self.client = client
    }

    func onReady(_ metadata: SdkReadyMetadata) {
        let result = client?.getTreatment(flag: "FEATURE_FLAG_NAME")
        switch result?.treatment {
        case "on":
            // insert code here to show on treatment
            break
        case "off":
            // insert code here to show off treatment
            break
        default:
            // insert your control treatment code here
            break
        }
    }
}

client?.addEventListener(SplitListener(client: client))
```

### Using attributes in flag evaluations

Attributes live on the [Target](#initialization), not on individual evaluation calls. When you instantiate the SDK you provide a Target that includes the matching key, traffic type, and any attributes used for [custom-attribute targeting](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes). To change them later, call [`setTarget`](#update-the-targets-attributes-or-key) on the same client. If you need to evaluate for an entirely different identity in parallel, instantiate an additional client via [`getClient`](#instantiate-multiple-clients) instead.

Whenever the matching key, bucketing key, or attributes change, the SDK refetches evaluations from FME cloud for the updated Target.

Valid attribute types are strings, numbers, booleans, and arrays of those. `nil` entries are dropped before the request is sent. Dates are expected as milliseconds since epoch (UTC); pass `Date().timeIntervalSince1970 * 1000` or a precomputed `Int64`.

```swift title="Swift"
let target = Target(
    matchingKey: "CUSTOMER_ID",
    trafficType: "user",
    attributes: [
        "plan_type": "growth",
        "deal_size": 10000,
        "paying_customer": true,
        "permissions": ["read", "write"],
        "registered_date": Int64(Date().timeIntervalSince1970 * 1000),
    ]
)

client?.setTarget(target: target)
```

### Multiple evaluations at once

To evaluate several flags in a single call, use one of the variations of `getTreatments`:

* `getTreatments(flags:)` returns a result for each flag name you pass in.
* `getTreatmentsByFlagSets(flagSets:)` returns a result for every flag in the listed [flag sets](/docs/feature-management-experimentation/feature-management/manage-flags/using-flag-sets-to-boost-sdk-performance) currently cached in the SDK.

Both methods return an `[EvaluationResult]`.

```swift title="Swift"
// Get treatments for a list of flag names
let flagNames = ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"]
let results = client?.getTreatments(flags: flagNames)

// Get treatments for the union of multiple flag sets
let flagSets = ["frontend", "client_side"]
let bySets = client?.getTreatmentsByFlagSets(flagSets: flagSets)

// results / bySets have the following form:
// [
//   EvaluationResult(flag: "FEATURE_FLAG_NAME_1", treatment: "on", flagSets: ["frontend"]),
//   EvaluationResult(flag: "FEATURE_FLAG_NAME_2", treatment: "visa", flagSets: ["frontend", "client_side"]),
// ]
```

### Evaluation result

Every evaluation method returns an `EvaluationResult` (or an array of them). The shape is:

```swift title="Swift"
public struct EvaluationResult {
    public let flag: String          // the flag name evaluated
    public let treatment: String     // "on", "off", a custom treatment, or "control"
    public let config: String?       // stringified JSON of the dynamic configuration, when present
    public let changeNumber: Int64?  // version of the flag definition this result was produced from
    public let flagSets: [String]    // sets the flag belongs to
}
```

If a flag cannot be evaluated, `treatment` is the [fallback treatment](#configure-fallback-treatments) (or `"control"` if no fallback is set).

[Dynamic configurations](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations) are opt-in. By default the SDK does not request them, so `result.config` is `nil` and no configuration data is exposed in the response. Set [`configsEnabled = true`](#configuration) at factory init to receive them. When enabled, `config` is a stringified JSON you parse before reading values.

```swift title="Swift"
let result = client?.getTreatment(flag: "FEATURE_FLAG_NAME")
var config: [String: Any]? = nil
if let configString = result?.config, let data = configString.data(using: .utf8) {
    config = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
}

// result has the following form:
// EvaluationResult(
//   flag: "FEATURE_FLAG_NAME",
//   treatment: "on",
//   config: "{\"color\":\"red\",\"size\":\"L\"}",
//   changeNumber: 1700000000000,
//   flagSets: ["frontend"]
// )
```

### Update the target's attributes or key

Use `setTarget` to update the active target on an existing client when the session's identity or attributes change (the user logs in, switches accounts, an attribute flips). To run two identities in parallel during the same session, instantiate a second client via [`getClient`](#instantiate-multiple-clients) instead.

The call returns synchronously. Any change to the matching key, bucketing key, or attributes triggers a background refetch of evaluations from FME cloud. Reads issued before the refetch lands operate on an empty cache for the new target, so `getTreatment` returns the configured fallback treatment for each flag (or [`control`](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if no fallback is set). A change that only updates `trafficType` keeps the eval cache and skips the refetch.

Once the refetch lands, the SDK fires [`onUpdate`](#subscribe-to-events) on the same client. Subscribe to that event to refresh any UI that depends on flag values.

```swift title="Swift"
client?.setTarget(target: Target(
    matchingKey: "user-456",
    attributes: [
        "plan_type": "enterprise",
        "deal_size": 50000,
    ],
    trafficType: "user"
))
```

### Shutdown

The SDK exposes two lifecycle methods on the client:

- `flush()` posts any tracked events and telemetry that are still buffered locally, without tearing down the client. Use it before a user-facing transition where you want pending data to land on FME cloud even if the client keeps running.
- `destroy()` flushes pending data and tears down this client instance: it stops background sync, closes connections, releases resources, and removes the client from its parent factory. After `destroy()`, `getTreatment*` calls return the configured fallback (or `control` if none is set), `track` returns `false`, and `manager.getFlagNames()` returns an empty list on a fully-torn-down factory.

`SplitFactory` also exposes `destroy()`, which tears down the factory and every client it created. There is no `factory.flush()`; flush at the client level.

All three methods are `async`, so call them from an async context.

```swift title="Swift"
await client.flush()
await client.destroy()
await factory.destroy()
```

## Track

Use the `track` method to record any actions your customers perform. Each action is an `event` and corresponds to an `event type`. Calling `track` is the first step to getting experimentation data into Harness FME and lets you measure the impact of your feature flags on user actions and metrics. [Learn more about using track events](/docs/feature-management-experimentation/release-monitoring/events/).

The thin client takes the matching key and [traffic type](/docs/feature-management-experimentation/traffic-types/) from the [Target](#initialization) bound to the client, so the `track` call itself takes only three arguments:

* **eventType:** (String, required) The event type to record. Full requirements on this argument are:
     * Contains 80 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, period, or colon.
     * This is the regular expression used to validate the value: `^[a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}$`
* **value:** (Optional) The value used when creating the metric. Pass `nil` or `0` to use count-based metrics. The expected data type is **Double**.
* **properties:** (Optional) An `EventProperties` (`[String: Any]`) map of key-value pairs used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME supports three types of property values:
     * **Strings:** Use type String.
     * **Numbers:** Use type Double or Int.
     * **Booleans:** Use type Bool.

`track` returns a boolean indicating whether the event was successfully queued to be sent to Harness on the next flush. It returns `false` if the input failed validation or if the client has been destroyed. The thin client does not validate the traffic-type value against your FME project; an unknown traffic type still queues the event but the backend rejects it on ingest. The result is marked `@discardableResult`, so you can ignore it when you do not need to act on the queue outcome.

```swift title="Swift"
// Event type only
var queued: Bool = client?.track(eventType: "page_load", value: nil, properties: nil) ?? false

// Event type and value
queued = client?.track(eventType: "page_load_time", value: 83.334, properties: nil) ?? false

// Event type, value, and properties
let properties: EventProperties = [
    "package": "premium",
    "admin": true,
    "discount": 50,
]
queued = client?.track(eventType: "checkout", value: 49.99, properties: properties) ?? false

// Event type and properties only (skip value with nil)
queued = client?.track(eventType: "checkout", value: nil, properties: properties) ?? false
```

## Configuration

The SDK has a small set of configuration knobs, each tuned to a reasonable default. Build a `SplitClientConfig` with `SplitClientConfig.builder()` and pass it to the factory builder with `.setConfig(...)` to override any of them.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| `logLevel` | SDK log level. One of `.none`, `.error`, `.warning`, `.info`, `.debug`, `.verbose`. | `.none` |
| `configsEnabled` | Whether the SDK requests dynamic configurations along with treatments. Off by default to minimize payload; enable it if you read `EvaluationResult.config`. | `false` |
| `syncMode` | Synchronization mode. `.streaming` keeps a persistent connection open and applies updates as they arrive, falling back to polling when streaming is unavailable; `.polling` refetches on a fixed interval; `.singleSync` fetches once at startup and stops. | `.streaming` |
| `pollingRate` | Polling interval in seconds for the polling mode (and the fallback path when streaming is unavailable). Minimum 60. | `3600` (1 hour) |
| `pushRate` | Interval in seconds for posting tracked events and telemetry. Minimum 30. | `1800` (30 minutes) |
| `readyTimeout` | Time in seconds to wait before firing `sdkReadyTimedOut`. Set to `-1` to disable the timeout. | `10` |
| `serviceEndpoints` | Url overrides for SDK services. Built with `ServiceEndpoints.builder()`. Provide hosts only; the SDK appends paths internally. | Default Harness FME hosts |
| `prefix` | Prefix prepended to the SDK's on-device database name. Useful for isolating storage between SDK instances sharing the same process. Must match `^[a-zA-Z0-9_]{1,80}$`. | `nil` (no prefix) |
| `evaluationFilters` | Restrict evaluation and sync to flags that belong to one or more flag sets. Built with `EvaluationFilters(flagSets:)`. | `nil` (all flags) |
| `fallbackTreatments` | Treatments returned when the SDK cannot evaluate a flag (not ready, flag not found, parse error). See [Configure fallback treatments](#configure-fallback-treatments). | empty config |

To set each of the parameters defined above, use the following syntax:

```swift title="Swift"
import SplitThin

let config = SplitClientConfig.builder()
    .set(logLevel: .info)
    .set(configsEnabled: false)
    .set(syncMode: .streaming)
    .set(evaluationFilters: EvaluationFilters(flagSets: ["frontend"]))
    .set(fallbackTreatments: FallbackTreatmentsConfig.builder()
        .global(FallbackTreatment(treatment: "off"))
        .byFlag(["my-feature": FallbackTreatment(treatment: "on", config: "{\"color\":\"blue\"}")])
        .build())
    .build()

let factory = DefaultSplitFactoryBuilder()
    .setSdkKey(SdkKey("YOUR_SDK_KEY"))
    .setTarget(Target(matchingKey: "CUSTOMER_ID", trafficType: "user"))
    .setConfig(config)
    .build()
```

### Sync modes

The SDK supports three synchronization modes, controlled by `syncMode`. Pick the one that matches your runtime and freshness requirements.

- **`.streaming`** (default). The SDK keeps a long-lived connection open to FME cloud and applies rollout plan changes the moment they are published. Best for long-running app sessions where flag changes should take effect without a restart. If the streaming connection cannot be established or drops mid-session (network issues, restrictive proxies, captive networks), the SDK transparently falls back to polling at `pollingRate` and retries streaming in the background, keeping flags in sync.

- **`.polling`**. The SDK refetches evaluations on a fixed interval set by `pollingRate` (default 3600 seconds, minimum 60 seconds). Use this when streaming is blocked at the network layer, or when you want predictable, periodic refreshes instead of streaming push updates.

- **`.singleSync`**. The SDK fetches evaluations once at startup, fires `onReady`, and stops syncing. Use this when you want a one-shot evaluation pass with no background updates over the client's lifetime.

```swift title="Swift"
let config = SplitClientConfig.builder()
    .set(syncMode: .polling)
    .set(pollingRate: 120)
    .build()
```

Regardless of the mode, tracked events and telemetry are flushed on a separate cadence controlled by `pushRate`.

### Configure cache behavior

The SDK persists evaluations on device so a fresh app launch can serve cached values immediately while the SDK refetches in the background. Storage is backed by a CoreData store the SDK manages internally; you do not need to configure a backend.

When persistent storage finds evaluations from a previous session, the SDK fires [`onReadyFromCache`](#subscribe-to-events) on the [`SplitEventListener`](#subscribe-to-events) with values pre-loaded so you can begin evaluating instantly against cached values while the SDK fetches fresh evaluations from FME cloud in the background.

The one user-facing knob is `prefix`, prepended to the SDK's on-device store name. Use it to keep multiple SDK keys or apps isolated within the same process. The prefix must match `^[a-zA-Z0-9_]{1,80}$`.

```swift title="Swift"
let config = SplitClientConfig.builder()
    .set(prefix: "my_app")
    .build()
```

The SDK stores its short-lived auth token in the iOS Keychain. No additional configuration is required.

## Manager

Use the Manager to get the list of feature flag names the SDK currently has loaded. The thin Manager exposes a single method, `getFlagNames()`; methods that return full flag definitions (`splits`, `split(featureName:)`) are not part of the thin client surface. Get the Manager from the same factory you used for your client:

```swift title="Swift"
let manager = factory.manager()

let flagNames = manager.getFlagNames()
```

`getFlagNames()` returns the flag names currently cached on the SDK. Before the client is ready, the array is empty; wait for `onReady` before calling, see [Subscribe to events](#subscribe-to-events).

If you set [`evaluationFilters`](#configuration) at factory init, `getFlagNames()` returns only the names in those flag sets, since flags outside the configured sets are never fetched.

## Logging

The SDK writes log messages to the console. Logging is off by default; turn it on by setting `logLevel` at factory init.

`logLevel` accepts the following values, in order of increasing verbosity:

- `.none` (default). No logs.
- `.error`. Failures only, such as network errors and validation rejections.
- `.warning`. Warnings and errors. Typically covers non-fatal issues like invalid input that the SDK accepted as a no-op or sanitized.
- `.info`. High-level lifecycle events such as factory init and readiness transitions, plus everything above.
- `.debug`. Internal milestones useful when diagnosing a specific behavior, plus everything above.
- `.verbose`. Maximum detail. Useful when assembling repro information for support; expect a high volume of output.

```swift title="Swift"
let config = SplitClientConfig.builder()
    .set(logLevel: .debug)
    .build()
```

## Configure fallback treatments

Fallback treatments let you define a treatment value (and optional dynamic configuration) to be returned when a flag cannot be evaluated, for example when the SDK is not ready, the flag does not exist, or a transient error occurs. By default, the SDK returns the reserved `control` treatment, but you can override this globally and/or per flag at the SDK level.

This is useful when you want to:

- Maintain a predictable user experience during outages or evaluation failures (avoid unexpected `control` when not even local cache exists)
- Protect critical user flows by returning a safe, stable treatment (for example, forcing `off` during an incident)
- Customize behavior per flag so each evaluation inherits appropriate safe defaults if something goes wrong

Each entry, global or per flag, can be either a bare treatment string or a `FallbackTreatment(treatment:config:)`, where `config` is a JSON string available on the [evaluation result](#evaluation-result) when [`configsEnabled`](#configuration) is on. `FallbackTreatment` conforms to `ExpressibleByStringLiteral`, so a `[String: FallbackTreatment]` dictionary literal accepts bare strings alongside full `FallbackTreatment(...)` values.

### Global fallback treatment

Set a global fallback treatment when initializing the SDK factory. This value is returned whenever any flag cannot be evaluated.

```swift title="Swift"
let fallbacks = FallbackTreatmentsConfig.builder()
    .global(FallbackTreatment(treatment: "off", config: "{\"reason\":\"global-fallback\"}"))
    .build()

let config = SplitClientConfig.builder()
    .set(fallbackTreatments: fallbacks)
    .build()
```

### Flag-level fallback treatment

You can also configure fallback treatments per flag, alongside `global`. A per-flag entry always takes precedence over the global fallback, so if both are defined the SDK returns the flag-level value when that specific flag cannot be evaluated.

```swift title="Swift"
let fallbacks = FallbackTreatmentsConfig.builder()
    .global("off")
    .byFlag([
        "new_dashboard": "off",
        "checkout_v2": FallbackTreatment(treatment: "control_v1", config: "{\"reason\":\"flag-level-fallback\"}"),
    ])
    .build()

let config = SplitClientConfig.builder()
    .set(fallbackTreatments: fallbacks)
    .build()
```

For more information, see [Fallback treatments](/docs/feature-management-experimentation/feature-management/setup/fallback-treatment/).

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple clients

Use a second client when your app needs to evaluate for two identities at the same time, for example a logged-in user *and* the account that user belongs to, or two users on the same device. Each client is bound to its own target and runs its own readiness lifecycle, so the SDK can return treatments for both identities in parallel without one overwriting the other.

Call `factory.getClient()` with no arguments to get the client bound to the factory's [default target](#initialization). Pass a target to create or retrieve a client for a different identity.

The factory keys clients by matching key (and bucketing key when set). Calling `getClient` twice with the same key returns the same client; if the second call passes a different `trafficType` or different `attributes`, the SDK applies the change in the background via `setTarget` rather than creating a duplicate client.

Each client manages its own readiness, events, and pending writes. Wait for or check readiness on the specific client before evaluating; see [Subscribe to events](#subscribe-to-events) for the event listeners (useful when the client may already be ready from a prior `getClient` call).

```swift title="Swift"
guard let factory = DefaultSplitFactoryBuilder()
    .setSdkKey(SdkKey("YOUR_SDK_KEY"))
    .setTarget(Target(matchingKey: "CUSTOMER_USER_ID", trafficType: "user"))
    .build()
else { return }

// Default target client (bound to CUSTOMER_USER_ID / "user")
let userClient = factory.getClient()

// Second client for the account that owns this user
let accountClient = factory.getClient(
    Target(matchingKey: "CUSTOMER_ACCOUNT_ID", trafficType: "account")
)

let userPoll = userClient.getTreatment(flag: "user-poll")
let accountPerms = accountClient.getTreatment(flag: "account-permissioning")

accountClient.track(eventType: "account_created", value: nil, properties: nil)
```

When an identity is no longer in scope, destroy its client to free its readiness listeners and stop syncing for that key. See [Shutdown](#shutdown) for the call shape: `client.destroy()` removes that one client from the factory's registry; `factory.destroy()` tears down the factory and every client it created. For sequential identity changes on a single client, prefer [`setTarget`](#update-the-targets-attributes-or-key) over destroying and recreating.

### Subscribe to events

You can listen for four different events from the SDK.

* `onReadyFromCache`. Fires when the SDK can serve cached evaluations from a previous session. If a cache from a previous session is present, this event fires almost immediately with stale-but-usable results. If no cache is available, the event still fires, together with `onReady`, signaling that there were no cached results to load.
* `onReady`. Fires once the SDK has fetched a fresh set of evaluations for the current target from FME cloud and is ready to serve them.
* `onReadyTimedOut`. Fires if the SDK has not reached the ready state within the `readyTimeout` window (10 seconds by default; set to `-1` to disable). The SDK continues to fetch in the background and emits `onReady` once it succeeds; calls made before then return the configured fallback treatment, or `control` if no fallback is set.
* `onUpdate`. Fires when the SDK applies an update to its evaluations (for example, after a streaming push, a poll cycle, or a target switch).

Listeners conform to the `SplitEventListener` protocol. The protocol provides default empty implementations for all four methods, so you only override the callbacks you need. Register a listener with `client.addEventListener(_:)` and remove it with `client.removeEventListener(_:)`. Callbacks run on the SDK's internal queue; dispatch back to `DispatchQueue.main` if you need to touch UI.

```swift title="Swift"
import SplitThin

final class MyListener: SplitEventListener {
    weak var client: SplitClient?

    init(client: SplitClient) {
        self.client = client
    }

    func onReady(_ metadata: SdkReadyMetadata) {
        // Fresh evaluations from FME cloud are available; safe to evaluate.
    }

    func onReadyFromCache(_ metadata: SdkReadyFromCacheMetadata) {
        // Cached evaluations restored from a previous session; results may be stale.
    }

    func onReadyTimedOut() {
        // SDK did not become ready within readyTimeout.
        // Calls return the configured fallback treatment (or `control`
        // if no fallback is set) until ready.
    }

    func onUpdate(_ metadata: SdkUpdateMetadata) {
        // Evaluations changed; refresh affected state for the impacted flags.
        let results = client?.getTreatments(flags: metadata.names)
    }
}

let listener = MyListener(client: client)
client.addEventListener(listener)

// Later, to stop receiving events from this listener:
client.removeEventListener(listener)
```

#### Include metadata

`metadata` provides additional context for events:

- `onReady` / `onReadyFromCache`: `SdkReadyMetadata` / `SdkReadyFromCacheMetadata` with `isInitialCacheLoad` (`true` when there were no cached results to load and the event was synthesized alongside `onReady`) and `lastUpdateTimestamp` (milliseconds since epoch when the cache was last updated; `nil` when `isInitialCacheLoad` is `true`).
- `onUpdate`: `SdkUpdateMetadata` with `type` (`.flagsUpdate` or `.segmentsUpdate`) and `names` (list of impacted flag names; empty for segment-only updates).

```swift title="Swift"
final class MyListener: SplitEventListener {
    func onReady(_ metadata: SdkReadyMetadata) {
        let initialCacheLoad: Bool = metadata.isInitialCacheLoad
        let lastUpdateTimestamp: Int64? = metadata.lastUpdateTimestamp
    }

    func onUpdate(_ metadata: SdkUpdateMetadata) {
        let type: SdkUpdateMetadataType = metadata.type
        let names: [String] = metadata.names
    }
}
```
