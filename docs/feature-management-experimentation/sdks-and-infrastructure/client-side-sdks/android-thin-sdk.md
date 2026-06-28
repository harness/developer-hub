---
title: Android Thin SDK
sidebar_label: Android Thin SDK
description: Set up the Harness FME Android Thin SDK in Android apps. The thin SDK calls FME cloud for flag evaluations, so rollout plans and segment definitions never leave the cloud and the SDK only receives flag evaluation results.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide covers the FME **Android Thin SDK**. Unlike the standard [Android SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk), the thin SDK does not download flag definitions or segment data. It calls FME cloud to evaluate flags for a given target and caches the results locally for fast subsequent lookups.

Use the thin SDK when you want to keep rollout configuration server-side, minimize what is shipped on device, or restrict the targeting data exposed to clients.

All of our SDKs are open source. Go to our [Android Thin SDK GitHub repository](https://github.com/splitio/android-thin-client) to see the source code.

## Before you begin

The Android Thin SDK is compatible with Android API 21 and later (5.0 Lollipop) and supports apps written in Kotlin or Java.

The library is published on Maven Central as `io.split.client:android-thin-client`.

## Initialization

To get started, set up FME in your code base with the following two steps.

### 1. Import the SDK into your project

Add the SDK as a dependency in your app module's Gradle build script:

<Tabs groupId="gradle-dsl">
<TabItem value="kotlin" label="Kotlin DSL">

```kotlin title="build.gradle.kts"
dependencies {
    implementation("io.split.client:android-thin-client:1.0.0")
}
```

</TabItem>
<TabItem value="groovy" label="Groovy DSL">

```groovy title="build.gradle"
dependencies {
    implementation 'io.split.client:android-thin-client:1.0.0'
}
```

</TabItem>
</Tabs>

### 2. Instantiate the SDK and create a new SDK factory client

You build the factory with an `SdkKey` and a default `Target`, then get the SDK client from it. The client is what you call `getTreatment` and `track` on.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.thin.SdkKey
import io.split.client.thin.SplitFactoryBuilder
import io.split.client.thin.Target

// Build the factory with an SDK key and a default target
val factory = SplitFactoryBuilder.build(
    context = applicationContext,
    sdkKey = SdkKey("YOUR_SDK_KEY"),
    defaultTarget = Target(
        // matchingKey identifies the entity being evaluated: an internal user id,
        // an account id, a device id, or a UUID for anonymous users.
        key = Key(matchingKey = "CUSTOMER_ID"),
        attributes = mapOf("plan" to "premium"), // optional, used for targeting rules
        trafficType = "user",
    ),
)

// Get the client instance bound to the default target
val client = factory.getClient()
```

</TabItem>
<TabItem value="java" label="Java">

```java
import io.split.client.thin.Key;
import io.split.client.thin.SdkKey;
import io.split.client.thin.SplitFactoryBuilder;
import io.split.client.thin.Target;

import java.util.Map;

// Build the factory with an SDK key and a default target
SplitFactory factory = SplitFactoryBuilder.build(
    getApplicationContext(),
    new SdkKey("YOUR_SDK_KEY"),
    new Target(
        // matchingKey identifies the entity being evaluated: an internal user id,
        // an account id, a device id, or a UUID for anonymous users.
        new Key("CUSTOMER_ID"),
        Map.of("plan", "premium"), // optional, used for targeting rules
        "user"
    )
);

// Get the client instance bound to the default target
SplitClient client = factory.getClient();
```

</TabItem>
</Tabs>

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application. Avoid creating additional factories without a good reason (for example, using different SDK keys in the same app), since each factory opens its own sync connections and consumes additional resources.

`SplitFactoryBuilder.build` requires a `Context` (the SDK uses the application context internally), an `SdkKey`, and a default `Target`. `SplitClientConfig` is optional; if omitted, defaults are used.

If the SDK key or matching key fails validation, `build` returns a no-op factory that logs the error and returns fallback values from every call. Construct your `SdkKey` and `Target` carefully (see Configure fallback treatments to control what the no-op factory returns).

Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](/docs/feature-management-experimentation/api-keys) to learn more.

A factory can serve more than one target. If your app evaluates flags for multiple users, accounts, or other entities, see [Instantiate multiple clients](#instantiate-multiple-clients) under Advanced use.

#### Bucketing keys

`Key` accepts a separate `bucketingKey` alongside the matching key, for example to keep a user in the same bucket after they sign in:

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val target = Target(
    key = Key(matchingKey = "user-123", bucketingKey = "anon-cookie-abc"),
    trafficType = "user",
)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Target target = new Target(
    new Key("user-123", "anon-cookie-abc"),
    "user"
);
```

</TabItem>
</Tabs>

The matching key drives targeting-rule evaluation; the bucketing key drives the percentage rollout assignment. When `bucketingKey` is omitted, the matching key is used for both.


## Use the SDK

The following explains how to use this SDK.

### Basic use

After the SDK is instantiated it warms up by fetching the initial set of treatments for the default target from FME cloud. Until that completes, calls to `getTreatment` may return the configured fallback treatment (or [`control`](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if no fallback is set).

Subscribe to [`SDK_READY`](#subscribe-to-events) before evaluating. Once the listener fires, `getTreatment` returns the latest result for the requested flag and target.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.addEventListener(object : SplitEventListener() {
    override fun onReadyView(client: SplitClient, metadata: SdkReadyMetadata?) {
        when (client.getTreatment("FEATURE_FLAG_NAME").treatment) {
            "on" -> {
                // insert code here to show on treatment
            }
            "off" -> {
                // insert code here to show off treatment
            }
            else -> {
                // insert your control treatment code here
            }
        }
    }
})
```

</TabItem>
<TabItem value="java" label="Java">

```java
client.addEventListener(new SplitEventListener() {
    @Override
    public void onReadyView(SplitClient client, SdkReadyMetadata metadata) {
        EvaluationResult result = client.getTreatment("FEATURE_FLAG_NAME");
        String treatment = result.getTreatment();
        if (treatment.equals("on")) {
            // insert code here to show on treatment
        } else if (treatment.equals("off")) {
            // insert code here to show off treatment
        } else {
            // insert your control treatment code here
        }
    }
});
```

</TabItem>
</Tabs>

### Using attributes in flag evaluations

Attributes live on the [Target](#initialization), not on individual evaluation calls. When you instantiate the SDK you provide a Target that includes the matching key, traffic type, and any attributes used for [custom-attribute targeting](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes). To change them later, call [`setTarget`](#update-the-targets-attributes-or-key) on the same client. If you need to evaluate for an entirely different identity in parallel, instantiate an additional client via [`getClient`](#instantiate-multiple-clients) instead.

Whenever the matching key, bucketing key, or attributes change, the SDK refetches evaluations from FME cloud for the updated Target.

Valid attribute types are strings, numbers, booleans, and collections of those. `null` entries are dropped before the request is sent. Dates are expected as milliseconds since epoch (UTC); pass `System.currentTimeMillis()` or a precomputed `Long`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val target = Target(
    key = Key(matchingKey = "CUSTOMER_ID"),
    trafficType = "user",
    attributes = mapOf(
        "plan_type" to "growth",
        "deal_size" to 10000,
        "paying_customer" to true,
        "permissions" to listOf("read", "write"),
        "registered_date" to System.currentTimeMillis(),
    ),
)

client.setTarget(target)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Map<String, Object> attributes = new HashMap<>();
attributes.put("plan_type", "growth");
attributes.put("deal_size", 10000);
attributes.put("paying_customer", true);
attributes.put("permissions", Arrays.asList("read", "write"));
attributes.put("registered_date", System.currentTimeMillis());

Target target = new Target(
    new Key("CUSTOMER_ID"),
    attributes,
    "user"
);

client.setTarget(target);
```

</TabItem>
</Tabs>

### Multiple evaluations at once

To evaluate several flags in a single call, use one of the variations of `getTreatments`:

* `getTreatments(flags)` returns a result for each flag name you pass in.
* `getTreatmentsByFlagSets(flagSets)` returns a result for every flag in the listed [flag sets](/docs/feature-management-experimentation/feature-management/manage-flags/using-flag-sets-to-boost-sdk-performance) currently cached in the SDK.

Both methods return a `List<EvaluationResult>`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Get treatments for a list of flag names
val flagNames = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val results = client.getTreatments(flagNames)

// Get treatments for the union of multiple flag sets
val flagSets = listOf("frontend", "client_side")
val bySets = client.getTreatmentsByFlagSets(flagSets)

// results / bySets have the following form:
// [
//   EvaluationResult(flag = "FEATURE_FLAG_NAME_1", treatment = "on", changeNumber = 1700000000000),
//   EvaluationResult(flag = "FEATURE_FLAG_NAME_2", treatment = "visa", changeNumber = 1700000000000),
// ]
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Get treatments for a list of flag names
List<String> flagNames = Arrays.asList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
List<EvaluationResult> results = client.getTreatments(flagNames);

// Get treatments for the union of multiple flag sets
List<String> flagSets = Arrays.asList("frontend", "client_side");
List<EvaluationResult> bySets = client.getTreatmentsByFlagSets(flagSets);
```

</TabItem>
</Tabs>

### Evaluation result

Every evaluation method returns an `EvaluationResult` (or a `List` of them). The shape is:

```kotlin
data class EvaluationResult(
    val flag: String,         // the flag name evaluated
    val treatment: String,    // 'on', 'off', a custom treatment, or 'control'
    val config: String? = null,       // stringified JSON of the dynamic configuration, when present
    val changeNumber: Long? = null,   // version of the flag definition this result was produced from
    val flagSets: Set<String> = emptySet(), // the flag sets the flag belongs to
)
```

If a flag cannot be evaluated, `treatment` is the [fallback treatment](#configure-fallback-treatments) (or `"control"` if no fallback is set).

[Dynamic configurations](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations) are opt-in. By default the SDK does not request them, so `result.config` is `null` and no configuration data is exposed in the response. Set [`configsEnabled = true`](#configuration) at factory init to receive them. When enabled, `config` is a stringified JSON you parse with your library of choice before reading values.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val result = client.getTreatment("FEATURE_FLAG_NAME")
val config = result.config?.let { JSONObject(it) }

// result has the following form:
// EvaluationResult(
//   flag = "FEATURE_FLAG_NAME",
//   treatment = "on",
//   config = "{\"color\":\"red\",\"size\":\"L\"}",
//   changeNumber = 1700000000000,
//   flagSets = setOf("frontend", "client_side")
// )
```

</TabItem>
<TabItem value="java" label="Java">

```java
EvaluationResult result = client.getTreatment("FEATURE_FLAG_NAME");
JSONObject config = result.getConfig() != null ? new JSONObject(result.getConfig()) : null;
```

</TabItem>
</Tabs>

### Update the target's attributes or key

Use `setTarget` to update the active target on an existing client when the session's identity or attributes change (the user logs in, switches accounts, an attribute flips). To run two identities in parallel during the same session, instantiate a second client via [`getClient`](#instantiate-multiple-clients) instead.

The call returns synchronously. Any change to the matching key, bucketing key, or attributes triggers a background refetch of evaluations from FME cloud. Reads issued before the refetch lands operate on an empty cache for the new target, so `getTreatment` returns the configured fallback treatment for each flag (or [`control`](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if no fallback is set). A change that only updates `trafficType` keeps the eval cache and skips the refetch.

Once the refetch lands, the SDK fires [`SDK_UPDATE`](#subscribe-to-events) on the same client. Subscribe to that event to refresh any UI that depends on flag values.

If the input is not a valid target, `setTarget` is a safe no-op: the current target is kept and the call does not throw.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.setTarget(
    Target(
        key = Key(matchingKey = "user-456"),
        trafficType = "user",
        attributes = mapOf("plan_type" to "enterprise", "deal_size" to 50000),
    )
)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Map<String, Object> attributes = new HashMap<>();
attributes.put("plan_type", "enterprise");
attributes.put("deal_size", 50000);

client.setTarget(new Target(
    new Key("user-456"),
    attributes,
    "user"
));
```

</TabItem>
</Tabs>

### Shutdown

The SDK exposes two lifecycle methods on the client:

- `flush()` posts any tracked events and telemetry that are still buffered locally, without tearing down the client. Use it before a user-facing transition where you want pending data to land on FME cloud even if the client keeps running.
- `destroy()` flushes pending data and tears down this client instance: it stops background sync, closes connections, releases resources, and removes the client from its parent factory. After `destroy()`, `getTreatment*` calls return the configured fallback (or `control` if none is set), `track` returns `false`, and `manager.flagNames` returns an empty list on a fully-torn-down factory.

`SplitFactory` also exposes `destroy()`, which tears down the factory and every client it created. There is no `factory.flush()`; flush at the client level.

All three methods are Kotlin `suspend` functions, so call them from a coroutine. From Java, the same operations are available as deprecated `*Async(callback)` overloads (`flushAsync`, `destroyAsync`).

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import kotlinx.coroutines.runBlocking

runBlocking {
    client.flush()
    client.destroy()
    factory.destroy()
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
client.flushAsync(error -> {
    // optional: handle error
});
client.destroyAsync(error -> {
    // optional: handle error
});
factory.destroyAsync(error -> {
    // optional: handle error
});
```

</TabItem>
</Tabs>

## Track

Use the `track` method to record any actions your customers perform. Each action is an `event` and corresponds to an `event type`. Calling `track` is the first step to getting experimentation data into Harness FME and lets you measure the impact of your feature flags on user actions and metrics. [Learn more about using track events](/docs/feature-management-experimentation/release-monitoring/events/).

The thin client takes the matching key and [traffic type](/docs/feature-management-experimentation/traffic-types/) from the [Target](#initialization) bound to the client, so the `track` call itself takes only three arguments:

* **eventType:** (String, required) The event type to record. Full requirements on this argument are:
     * Contains 80 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, period, or colon.
     * This is the regular expression used to validate the value: `^[a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}$`
* **value:** (Optional) The value used when creating the metric. Pass `null` or `0` to use count-based metrics. The expected data type is **Double**.
* **properties:** (Optional) A map of key-value pairs used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME supports three types of property values:
     * **Strings:** Use type String.
     * **Numbers:** Use type Number.
     * **Booleans:** Use type Boolean.

`track` returns a boolean indicating whether the event was successfully queued to be sent to Harness on the next flush. It returns `false` if the input failed validation or if the client has been destroyed. The thin client does not validate the traffic-type value against your FME project; an unknown traffic type still queues the event but the backend rejects it on ingest.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Event type only
var queued: Boolean = client.track("page_load")

// Event type and value
queued = client.track("page_load_time", 83.334)

// Event type, value, and properties
val properties = mapOf(
    "package" to "premium",
    "admin" to true,
    "discount" to 50,
)
queued = client.track("checkout", 49.99, properties)

// Event type and properties only (skip value with a named argument)
queued = client.track("checkout", properties = properties)
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Event type only
boolean queued = client.track("page_load", null, null);

// Event type and value
queued = client.track("page_load_time", 83.334, null);

// Event type, value, and properties
Map<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);
queued = client.track("checkout", 49.99, properties);

// Event type and properties only (skip value with null)
queued = client.track("checkout", null, properties);
```

</TabItem>
</Tabs>

## Configuration

The SDK has a small set of configuration knobs, each tuned to a reasonable default. Pass an optional `SplitClientConfig` as the fourth argument to `SplitFactoryBuilder.build` to override any of them.

Configuration is grouped into a few top-level fields alongside `sdkKey` and `defaultTarget`:

- `sync` controls how the SDK keeps evaluations fresh (mode, polling, push rate, ready timeout, url overrides).
- `filters` limits which flags are evaluated and synced.
- `storage` configures the on-device cache. See [Configure cache behavior](#configure-cache-behavior).
- `fallbackTreatments` defines what to return when the SDK cannot evaluate a flag. See [Configure fallback treatments](#configure-fallback-treatments).
- `logLevel` and `configsEnabled` are top-level flags.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| `logLevel` | SDK log level. One of `NONE`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `VERBOSE`. | `NONE` |
| `configsEnabled` | Whether the SDK requests dynamic configurations along with treatments. Off by default to minimize payload; enable it if you read `EvaluationResult.config`. | `false` |
| `sync.mode` | Synchronization mode. `STREAMING` keeps a persistent connection open and applies updates as they arrive, falling back to polling when streaming is unavailable; `POLLING` refetches on a fixed interval; `SINGLE_SYNC` fetches once at startup and stops. | `STREAMING` |
| `sync.pollingRate` | Polling interval in seconds for the polling mode (and the fallback path when streaming is unavailable). Minimum 60. | `3600` (1 hour) |
| `sync.pushRate` | Interval in seconds for posting tracked events and telemetry. Minimum 30. | `1800` (30 minutes) |
| `sync.readyTimeout` | Time in seconds to wait before firing `SDK_READY_TIMEOUT`. Set to `-1` to disable the timeout. | `10` |
| `sync.serviceEndpoints` | Url overrides for SDK services. Provide hosts only; the SDK appends paths internally. Supported keys: `auth`, `evaluations`, `events`, `streaming`. | Default Harness FME hosts |
| `storage.prefix` | Prefix prepended to the SDK's on-device database name. Useful for isolating storage between SDK instances sharing the same process. Must match `^[a-zA-Z0-9_]{1,80}$`. | `null` (no prefix) |
| `filters.flagSets` | Restrict evaluation and sync to flags that belong to one or more flag sets. | `null` (all flags) |
| `fallbackTreatments` | Treatments returned when the SDK cannot evaluate a flag (not ready, flag not found, parse error). See [Configure fallback treatments](#configure-fallback-treatments). | `null` |

To set each of the parameters defined above, use the following syntax. The Kotlin DSL and the Java builder are equivalent; pick whichever fits your codebase.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.thin.FallbackTreatment
import io.split.client.thin.FallbackTreatmentsConfiguration
import io.split.client.thin.SplitClientConfig
import io.split.client.thin.splitClientConfig

val config = splitClientConfig {
    logLevel = SplitClientConfig.LogLevel.INFO
    configsEnabled = false

    sync {
        mode = SplitClientConfig.SyncMode.STREAMING
    }

    filters {
        flagSets = setOf("frontend")
    }

    fallbackTreatments {
        global(FallbackTreatment("off"))
        byFlag(mapOf("my-feature" to FallbackTreatment("on", "{\"color\":\"blue\"}")))
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import io.split.client.thin.FallbackTreatment;
import io.split.client.thin.FallbackTreatmentsConfiguration;
import io.split.client.thin.SplitClientConfig;

import java.util.Map;
import java.util.Set;

SplitClientConfig config = new SplitClientConfig.Builder()
    .logLevel(SplitClientConfig.LogLevel.INFO)
    .configsEnabled(false)
    .sync(new SplitClientConfig.SyncConfig.Builder()
        .mode(SplitClientConfig.SyncMode.STREAMING)
        .build())
    .filters(new SplitClientConfig.FiltersConfig.Builder()
        .flagSets(Set.of("frontend"))
        .build())
    .fallbackTreatments(FallbackTreatmentsConfiguration.builder()
        .global(new FallbackTreatment("off"))
        .byFlag(Map.of("my-feature", new FallbackTreatment("on", "{\"color\":\"blue\"}")))
        .build())
    .build();
```

</TabItem>
</Tabs>

### Sync modes

The SDK supports three synchronization modes, controlled by `sync.mode`. Pick the one that matches your runtime and freshness requirements.

- **`STREAMING`** (default). The SDK keeps a long-lived connection open to FME cloud and applies rollout plan changes the moment they are published. Best for long-running app sessions where flag changes should take effect without a restart. If the streaming connection cannot be established or drops mid-session (network issues, restrictive proxies, captive networks), the SDK transparently falls back to polling at `sync.pollingRate` and retries streaming in the background, keeping flags in sync.

- **`POLLING`**. The SDK refetches evaluations on a fixed interval set by `sync.pollingRate` (default 3600 seconds, minimum 60 seconds). Use this when streaming is blocked at the network layer, or when you want predictable, periodic refreshes instead of streaming push updates.

- **`SINGLE_SYNC`**. The SDK fetches evaluations once at startup, fires `SDK_READY`, and stops syncing. Use this when you want a one-shot evaluation pass with no background updates over the client's lifetime.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config = splitClientConfig {
    sync {
        mode = SplitClientConfig.SyncMode.POLLING
        pollingRate = 120
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitClientConfig config = new SplitClientConfig.Builder()
    .sync(new SplitClientConfig.SyncConfig.Builder()
        .mode(SplitClientConfig.SyncMode.POLLING)
        .pollingRate(120)
        .build())
    .build();
```

</TabItem>
</Tabs>

Regardless of the mode, tracked events and telemetry are flushed on a separate cadence controlled by `sync.pushRate`.

### Configure cache behavior

The SDK persists evaluations on device so a fresh app launch can serve cached values immediately while the SDK refetches in the background. Storage is backed by a Room (SQLite) database the SDK manages internally; you do not need to configure a backend.

When persistent storage finds evaluations from a previous session, the SDK fires [`SDK_READY_FROM_CACHE`](#subscribe-to-events) so you can begin evaluating instantly against cached values while the SDK fetches fresh evaluations from FME cloud in the background.

The one user-facing knob is `storage.prefix`, prepended to the SDK's on-device database name. Use it to keep multiple SDK keys or apps isolated within the same process. The prefix must match `^[a-zA-Z0-9_]{1,80}$`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config = splitClientConfig {
    storage {
        prefix = "my_app"
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitClientConfig config = new SplitClientConfig.Builder()
    .storage(new SplitClientConfig.StorageConfig.Builder()
        .prefix("my_app")
        .build())
    .build();
```

</TabItem>
</Tabs>

The SDK pauses background sync automatically when the app goes to the background (via `ProcessLifecycleOwner`) and resumes when the app returns to the foreground. No additional configuration is required.


## Manager

Use the Manager to get the list of feature flag names the SDK currently has loaded. The thin Manager exposes a single accessor, `flagNames`; methods that return full flag definitions (`split(name)`, `splits()`) are not part of the thin client surface. Get the Manager from the same factory you used for your client:

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val manager: SplitManager = factory.getManager()

val flagNames: List<String> = manager.flagNames
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitManager manager = factory.getManager();

List<String> flagNames = manager.getFlagNames();
```

</TabItem>
</Tabs>

`flagNames` returns the flag names currently cached on the SDK. Before the client is ready, the list is empty; wait for `SDK_READY` before calling, see [Subscribe to events](#subscribe-to-events).

If you set [`filters.flagSets`](#configuration) at factory init, `flagNames` returns only the names in those sets, since flags outside the configured sets are never fetched.

## Logging

The SDK writes log messages to Logcat with a `SplitSDK` tag, routing each level to its matching `android.util.Log` method (`Log.e`, `Log.w`, `Log.i`, `Log.d`, `Log.v`). Logging is off by default; turn it on by setting `logLevel` at factory init.

`logLevel` accepts the following values, in order of increasing verbosity:

- `NONE` (default). No logs.
- `ERROR`. Failures only, such as network errors and validation rejections.
- `WARN`. Warnings and errors. Typically covers non-fatal issues like invalid input that the SDK accepted as a no-op or sanitized.
- `INFO`. High-level lifecycle events such as factory init and readiness transitions, plus everything above.
- `DEBUG`. Internal milestones useful when diagnosing a specific behavior, plus everything above.
- `VERBOSE`. Maximum detail. Useful when assembling repro information for support; expect a high volume of Logcat output.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config = splitClientConfig {
    logLevel = SplitClientConfig.LogLevel.DEBUG
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitClientConfig config = new SplitClientConfig.Builder()
    .logLevel(SplitClientConfig.LogLevel.DEBUG)
    .build();
```

</TabItem>
</Tabs>

## Configure fallback treatments

Fallback treatments let you define a treatment value (and optional dynamic configuration) to be returned when a flag cannot be evaluated, for example when the SDK is not ready, the flag does not exist, or a transient error occurs. By default, the SDK returns the reserved `control` treatment, but you can override this globally and/or per flag at the SDK level.

This is useful when you want to:

- Maintain a predictable user experience during outages or evaluation failures (avoid unexpected `control` when not even local cache exists)
- Protect critical user flows by returning a safe, stable treatment (for example, forcing `off` during an incident)
- Customize behavior per flag so each evaluation inherits appropriate safe defaults if something goes wrong

Each entry, global or per flag, can be either a `FallbackTreatment(treatment)` or a `FallbackTreatment(treatment, config)`, where `config` is a JSON string available on the [evaluation result](#evaluation-result) when [`configsEnabled`](#configuration) is on. The builder also exposes `global(String)` and `byFlagStrings(Map<String, String>)` convenience overloads for the bare-string case.

### Global fallback treatment

Set a global fallback treatment when initializing the SDK factory. This value is returned whenever any flag cannot be evaluated.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config = splitClientConfig {
    fallbackTreatments {
        global(FallbackTreatment("off", "{\"reason\":\"global-fallback\"}"))
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitClientConfig config = new SplitClientConfig.Builder()
    .fallbackTreatments(FallbackTreatmentsConfiguration.builder()
        .global(new FallbackTreatment("off", "{\"reason\":\"global-fallback\"}"))
        .build())
    .build();
```

</TabItem>
</Tabs>

### Flag-level fallback treatment

You can also configure fallback treatments per flag, alongside `global`. A per-flag entry always takes precedence over the global fallback, so if both are defined the SDK returns the flag-level value when that specific flag cannot be evaluated.

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config = splitClientConfig {
    fallbackTreatments {
        global(FallbackTreatment("off"))
        byFlag(
            mapOf(
                "checkout_v2" to FallbackTreatment("control_v1", "{\"reason\":\"flag-level-fallback\"}"),
                "new_dashboard" to FallbackTreatment("off"),
            )
        )
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitClientConfig config = new SplitClientConfig.Builder()
    .fallbackTreatments(FallbackTreatmentsConfiguration.builder()
        .global(new FallbackTreatment("off"))
        .byFlag(Map.of(
            "checkout_v2", new FallbackTreatment("control_v1", "{\"reason\":\"flag-level-fallback\"}"),
            "new_dashboard", new FallbackTreatment("off")
        ))
        .build())
    .build();
```

</TabItem>
</Tabs>

For more information, see [Fallback treatments](/docs/feature-management-experimentation/feature-management/setup/fallback-treatment/).

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple clients

Use a second client when your app needs to evaluate for two identities at the same time, for example a logged-in user *and* the account that user belongs to, or two users on the same device. Each client is bound to its own target and runs its own readiness lifecycle, so the SDK can return treatments for both identities in parallel without one overwriting the other.

Call `factory.getClient()` with no arguments to get the client bound to the factory's [default target](#initialization). Pass a target to create or retrieve a client for a different identity.

The factory keys clients by matching key (and bucketing key when set). Calling `getClient` twice with the same key returns the same client; if the second call passes a different `trafficType` or different `attributes`, the SDK applies the change in the background via `setTarget` rather than creating a duplicate client.

Each client manages its own readiness, events, and pending writes. Wait for or check readiness on the specific client before evaluating; see [Subscribe to events](#subscribe-to-events) for the event listeners (useful when the client may already be ready from a prior `getClient` call).

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val factory = SplitFactoryBuilder.build(
    applicationContext,
    "YOUR_SDK_KEY",
    Target(Key("CUSTOMER_USER_ID"), trafficType = "user"),
)

// Default target client (bound to CUSTOMER_USER_ID / "user")
val userClient = factory.getClient()

// Second client for the account that owns this user
val accountClient = factory.getClient(
    Target(Key("CUSTOMER_ACCOUNT_ID"), trafficType = "account"),
)

val userPoll = userClient.getTreatment("user-poll")
val accountPerms = accountClient.getTreatment("account-permissioning")

accountClient.track("account_created")
```

</TabItem>
<TabItem value="java" label="Java">

```java
SplitFactory factory = SplitFactoryBuilder.build(
    getApplicationContext(),
    new SdkKey("YOUR_SDK_KEY"),
    new Target(new Key("CUSTOMER_USER_ID"), null, "user"),
    null
);

// Default target client (bound to CUSTOMER_USER_ID / "user")
SplitClient userClient = factory.getClient(null);

// Second client for the account that owns this user
SplitClient accountClient = factory.getClient(
    new Target(new Key("CUSTOMER_ACCOUNT_ID"), null, "account")
);

EvaluationResult userPoll = userClient.getTreatment("user-poll");
EvaluationResult accountPerms = accountClient.getTreatment("account-permissioning");

accountClient.track("account_created", null, null);
```

</TabItem>
</Tabs>

When an identity is no longer in scope, destroy its client to free its readiness listeners and stop syncing for that key. See [Shutdown](#shutdown) for the call shape: `client.destroy()` removes that one client from the factory's registry; `factory.destroy()` tears down the factory and every client it created. For sequential identity changes on a single client, prefer [`setTarget`](#update-the-targets-attributes-or-key) over destroying and recreating.

### Subscribe to events

You can listen for four different events from the SDK.

* `SDK_READY_FROM_CACHE`. Fires when the SDK can serve cached evaluations from a previous session. If a cache from a previous session is present, this event fires almost immediately with stale-but-usable results. If no cache is available, the event still fires, together with `SDK_READY`, signaling that there were no cached results to load.
* `SDK_READY`. Fires once the SDK has fetched a fresh set of evaluations for the current target from FME cloud and is ready to serve them.
* `SDK_READY_TIMEOUT`. Fires if the SDK has not reached the `SDK_READY` state within the `sync.readyTimeout` window (10 seconds by default; set to `-1` to disable). The SDK continues to fetch in the background and emits `SDK_READY` once it succeeds; calls made before then return the configured fallback treatment, or `control` if no fallback is set.
* `SDK_UPDATE`. Fires when the SDK applies an update to its evaluations (for example, after a streaming push, a poll cycle, or a target switch).

Listeners are registered with `client.addEventListener(listener)`. A listener extends `SplitEventListener` and overrides only the callbacks it needs. Each event exposes two callbacks: the base callback (`onReady`, `onReadyFromCache`, `onUpdate`, `onTimeout`) runs on a background thread, and the `*View` variant (`onReadyView`, `onReadyFromCacheView`, `onUpdateView`, `onTimeoutView`) runs on the main UI thread.

:::tip Pick the right thread
Touch UI from `*View` callbacks. Do work that may block (network calls, disk I/O, heavy computation) from the non-`View` callbacks. Blocking the main thread from a `*View` callback will jank or freeze your app.
:::

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.thin.SdkReadyMetadata
import io.split.client.thin.SdkUpdateMetadata
import io.split.client.thin.SplitClient
import io.split.client.thin.SplitEventListener

client.addEventListener(object : SplitEventListener() {
    override fun onReady(client: SplitClient, metadata: SdkReadyMetadata?) {
        // Fresh evaluations from FME cloud are available; safe to evaluate.
    }

    override fun onReadyFromCache(client: SplitClient, metadata: SdkReadyMetadata?) {
        // Cached evaluations restored from a previous session; results may be stale.
    }

    override fun onUpdateView(client: SplitClient, metadata: SdkUpdateMetadata?) {
        // Evaluations changed; re-evaluate the impacted flags and refresh affected UI.
        val updatedFlags = metadata?.names ?: return
        val results = client.getTreatments(updatedFlags)
    }

    override fun onTimeout(client: SplitClient) {
        // SDK did not become ready within sync.readyTimeout.
        // Calls return the configured fallback treatment (or `control`
        // if no fallback is set) until ready.
    }
})
```

</TabItem>
<TabItem value="java" label="Java">

```java
import io.split.client.thin.SdkReadyMetadata;
import io.split.client.thin.SdkUpdateMetadata;
import io.split.client.thin.SplitClient;
import io.split.client.thin.SplitEventListener;

client.addEventListener(new SplitEventListener() {
    @Override
    public void onReady(SplitClient client, SdkReadyMetadata metadata) {
        // Fresh evaluations from FME cloud are available; safe to evaluate.
    }

    @Override
    public void onReadyFromCache(SplitClient client, SdkReadyMetadata metadata) {
        // Cached evaluations restored from a previous session; results may be stale.
    }

    @Override
    public void onUpdateView(SplitClient client, SdkUpdateMetadata metadata) {
        // Evaluations changed; re-evaluate the impacted flags and refresh affected UI.
        if (metadata == null || metadata.getNames() == null) return;
        List<EvaluationResult> results = client.getTreatments(metadata.getNames());
    }

    @Override
    public void onTimeout(SplitClient client) {
        // SDK did not become ready within sync.readyTimeout.
        // Calls return the configured fallback treatment (or `control`
        // if no fallback is set) until ready.
    }
});
```

</TabItem>
</Tabs>

#### Include metadata

`metadata` provides additional context for events:

- `onReady` / `onReadyFromCache` (and their `*View` variants): `SdkReadyMetadata` with `isInitialCacheLoad` (`true` when there were no cached results to load and the event was synthesized alongside `SDK_READY`) and `lastUpdateTimestamp` (milliseconds since epoch when the cache was last updated; `null` when `isInitialCacheLoad` is `true`).
- `onUpdate` / `onUpdateView`: `SdkUpdateMetadata` with `type` (`FLAGS_UPDATE` or `SEGMENTS_UPDATE`) and `names` (list of impacted flag names; empty for segment-only updates).

<Tabs groupId="java-kotlin-choice">
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.addEventListener(object : SplitEventListener() {
    override fun onReady(client: SplitClient, metadata: SdkReadyMetadata?) {
        val initialCacheLoad: Boolean? = metadata?.isInitialCacheLoad
        val lastUpdateTimestamp: Long? = metadata?.lastUpdateTimestamp
    }

    override fun onUpdate(client: SplitClient, metadata: SdkUpdateMetadata?) {
        val type: SdkUpdateMetadata.Type? = metadata?.type
        val names: List<String>? = metadata?.names
    }
})
```

</TabItem>
<TabItem value="java" label="Java">

```java
client.addEventListener(new SplitEventListener() {
    @Override
    public void onReady(SplitClient client, SdkReadyMetadata metadata) {
        Boolean initialCacheLoad = metadata.isInitialCacheLoad();
        Long lastUpdateTimestamp = metadata.getLastUpdateTimestamp();
    }

    @Override
    public void onUpdate(SplitClient client, SdkUpdateMetadata metadata) {
        SdkUpdateMetadata.Type type = metadata.getType();
        List<String> names = metadata.getNames();
    }
});
```

</TabItem>
</Tabs>
