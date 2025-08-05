---
title: Android Suite
sidebar_label: Android Suite
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22916666123277-Android-Suite </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Android Suite, an SDK designed to leverage the full power of FME. The Android Suite is built on top of the [Android SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk) and the [Android RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent), offering a unified solution, optimized for Android development.

The Suite provides the all-encompassing essential programming interface for working with your FME feature flags, as well as capabilities for automatically tracking performance measurements and user events. Code currently using Android SDK or Android RUM Agent can be easily upgraded to Android Suite, which is designed as a drop-in replacement.

## Language support

This library is designed for Android applications written in Java or Kotlin and is compatible with Android SDK versions 19 and later (4.4 Kit Kat).

## Initialization

Set up FME in your code base with the following two steps:

### 1. Import the Suite into your project

Import the SDK into your project including the dependency as follows:

```java title="Gradle"
implementation 'io.split.client:android-suite:2.1.1'
```

:::warning[Important]
When upgrading from Android SDK and/or Android RUM Agent to Android Suite, you need to remove individual project dependencies for the SDK and Agent. The dependency for the Suite replaces these dependencies.
:::

### 2. Instantiate the Suite and create a new SDK client

In your code, instantiate the Suite client as shown below.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// SDK key
String sdkKey = "YOUR_SDK_KEY";

// Build Suite configuration by default
SplitSuiteConfiguration config = SplitSuiteConfiguration.builder().build();

// Create a new user key to be evaluated
// key represents your internal user id, or the account id that 
// the user belongs to
String matchingKey = "key";
Key k = new Key(matchingKey);

// Create Suite
SplitSuite suite = SplitSuiteBuilder.build(sdkKey, k, config, getApplicationContext());

// Get SDK suite client instance
SplitClient client = suite.client();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// SDK key
val sdkKey = "YOUR_SDK_KEY"

// Build Suite configuration by default
val config: SplitSuiteConfiguration = SplitSuiteConfiguration.builder().build()

// Create a new user key to be evaluated
// key represents your internal user id, or the account id that 
// the user belongs to
val matchingKey = "key"
val key: Key = Key(matchingKey)

// Create Suite
val splitFactory: SplitSuite =
    SplitSuiteBuilder.build(sdkKey, key, config, applicationContext)

// Get SDK factory client instance
val client: SplitClient = splitFactory.client()
```

</TabItem>
</Tabs>

:::warning[Important]
If you are upgrading from FME's Android RUM Agent to Android Suite and you have setup or config information for the Android RUM Agent in the `AndroidManifest.xml`, then this information will be overridden by the Suite initialization. That is why we recommended that you remove this information from `AndroidManifest.xml` when upgrading.
:::

When the Suite is instantiated, it starts synchronizing feature flag and segment definitions from Harness servers, and also starts collecting performance and user events for the configured key and its optional traffic type (which if not set, defaults to `'user'`).

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Configure the Suite with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients.  See [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys) to learn more.

## Using the Suite

### Basic use

When the Suite is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of the data. If the Suite is asked to evaluate which treatment to show to a user for a specific feature flag while in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the Suite does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

To make sure the Suite is properly loaded before asking it for a treatment, block until the Suite is ready, as shown below. We set the client to listen for the `SDK_READY` event triggered by the Suite before asking for an evaluation.

After the `SDK_READY` event fires, you can use the `getTreatment` method to return the proper treatment based on the `FEATURE_FLAG_NAME` and the `key` variables you passed when instantiating the Suite.

You can use an if-else statement as shown below and insert the code for the different treatments that you defined in Harness FME. Remember to handle the client returning control, for example, in the final else statement.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
client.on(SplitEvent.SDK_READY, new SplitEventTask() {

    @Override
    public void onPostExecution(SplitClient client) {
      // Logic in background here
    }

    @Override
    public void onPostExecutionView(SplitClient client) {
      // Execute logic in main thread here
      String treatment = client.getTreatment("FEATURE_FLAG_NAME");
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
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.on(SplitEvent.SDK_READY, object : SplitEventTask() {

    override fun onPostExecution(client: SplitClient) {
        // Logic in background here
    }

    override fun onPostExecutionView(client: SplitClient) {
        // Execute main thread logic here
        when (client.getTreatment("FEATURE_FLAG_NAME")) {
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
```

</TabItem>
</Tabs>

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the Suite's `getTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method has a number of variations that are described below. Each of these additionally has a variation that takes an attributes argument, which can defines attributes of the following types: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `java.lang.Long` or `java.lang.Integer`.
* **Dates:** Express the value in milliseconds since epoch. In Java, milliseconds since epoch is of type java.lang.Long. For example, the value for the registered_date attribute below is `System.currentTimeInMillis()`, which is a long.
* **Booleans:** Use type `java.lang.Boolean`.
* **Sets:** Use type `java.util.Collection`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
Map<String, Object> attributes = new HashMap<String, Object>();
attributes.put("plan_type", "growth");
attributes.put("registered_date", System.currentTimeMillis());
attributes.put("deal_size", 1000);
attributes.put("paying_customer", true);
String[] perms = {"read", "write"};
attributes.put("permissions",perms);

// See client initialization above
String treatment = client.getTreatment("FEATURE_FLAG_NAME", attributes);

if (treatment.equals("on")) {
    // insert on code here
} else if (treatment.equals("off")) {
    // insert off code here
} else {
    // insert control code here
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val attributes = mapOf(
    "plan_type" to "growth",
    "registered_date" to System.currentTimeMillis(),
    "deal_size" to 1000,
    "paying_customer" to true,
    "permissions" to arrayOf("read", "write")
)

// See client initialization above
when (client.getTreatment("FEATURE_FLAG_NAME", attributes)) {
    "on" -> {
        // insert on code here
    }
    "off" -> {
        // insert off code here
    }
    else -> {
        // insert control code here
    }
}
```

</TabItem>
</Tabs>

You can pass your attributes in exactly this way to the `client.getTreatments` method.

### Binding attributes to the client

Attributes can optionally be bound to the client at any time during the Suite lifecycle. These attributes are stored in memory and used in every evaluation to avoid the need to keep the attribute set accessible through the whole app. When an evaluation is called, the attributes provided (if any) at evaluation time are combined with the ones that are already loaded into the Suite memory, with the ones provided at function execution time taking precedence. This enables those attributes to be overridden or hidden for specific evaluations.

An attribute is considered valid if it follows one of the types listed below:
- String
- Number
- Boolean
- Array

The Suite validates these before storing them and if there are invalid or missing values, possibly indicating an issue, the methods return the boolean `false` and do not update any value.

To use these methods, refer to the example below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Prepare a Map with several attributes
Map<String, Object> attributes = new HashMap<String, Object>();
attributes.put("plan_type", "growth");
attributes.put("registered_date", System.currentTimeMillis());
attributes.put("deal_size", 1000);
// Now set these on the client
client.setAttributes(attributes);
// Set one attribute
boolean result = client.setAttribute("plan_type", "growth");
// Get an attribute
Object planType = client.getAttribute("plan_type");
// Get all attributes
Map<String, Object> allAttributes = client.getAllAttributes();
// Remove an attribute
boolean result = client.removeAttribute("deal_size");
// Remove all attributes
boolean result = client.clearAttributes();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Set multiple attributes
client.setAttributes(
    mapOf(
        "plan_type" to "growth",
        "registered_date" to System.currentTimeMillis(),
        "deal_size" to 1000
    )
)
// Set one attribute
val result = client.setAttribute("plan_type", "growth")
// Get an attribute
val planType = client.getAttribute("plan_type")
// Get all attributes
val allAttributes = client.allAttributes
// Remove an attribute
val result = client.removeAttribute("deal_size")
// Remove all attributes
val result = client.clearAttributes()
```

</TabItem>
</Tabs>

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the Suite instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the Suite instance.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Getting treatments by feature flag names
List<String> featureFlagNames = Lists.newArrayList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
Map<String, String> treatments = client.getTreatments(featureFlagNames, null);

// Getting treatments by set
Map<String, String> treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", null);

// Getting treatments for the union of multiple sets
List<String> flagSets = Lists.newArrayList("frontend", "client_side");
Map<String, String> treatmentsByFlagSets = client.getTreatmentsByFlagSets(flagSets);

// Treatments will have the following form:
// {
//   "FEATURE_FLAG_NAME_1": "on",
//   "FEATURE_FLAG_NAME_2": "visa"
// }
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Getting treatments by feature flag names
val featureFlagNames: List<String> = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val treatments: Map<String, String> = client.getTreatments(featureFlagNames, null)

// Getting treatments by set
val treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", null)

// Getting treatments for the union of multiple sets
val flagSets = listOf("frontend", "client_side")
val treatmentsByFlagSets = client.getTreatmentsByFlagSets(flagSets)

// Treatments have the following form:
// {
//   "FEATURE_FLAG_NAME_1": "on",
//   "FEATURE_FLAG_NAME_2": "visa"
// }
```

</TabItem>
</Tabs>

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you should use the `getTreatmentWithConfig` method.

This method will return an object with the structure below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitResult result = client.getTreatmentWithConfig("new_boxes", attributes);

String config = result.config();
String treatment = result.treatment();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val result: SplitResult = client.getTreatmentWithConfig("new_boxes", attributes)

val config: String = result.config()
val treatment: String = result.treatment()
```

</TabItem>
</Tabs>

As you can see from the object structure, the config is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the Suite returns `null` for the config parameter. This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitResult treatmentResult = client.getTreatmentWithConfig("FEATURE_FLAG_NAME", attributes);
String configs = treatmentResult.config();
String treatment = treatmentResult.treatment();

if (treatment.equals("on")) {
  // insert on code here and use configs here as necessary
} else if (treatment.equals("off")) {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val treatmentResult: SplitResult = client.getTreatmentWithConfig("FEATURE_FLAG_NAME", attributes)
val configs: String? = treatmentResult.config()
val treatment: String = treatmentResult.treatment()

when (client.getTreatment("FEATURE_FLAG_NAME", attributes)) {
    "on" -> {
        // insert on code here
    }
    "off" -> {
        // insert off code here
    }
    else -> {
        // insert control code here
    }
}
```

</TabItem>
</Tabs>

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to TreatmentResults instead of strings. See example usage below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Getting treatments by feature flag names
List<String> featureFlagNames = Lists.newArrayList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
Map<String, String> treatments = client.getTreatments(featureFlagNames, null);

// Getting treatments by set
Map<String, String> treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", null);

// Getting treatments for the union of multiple sets
List<String> flagSets = Lists.newArrayList("frontend", "client_side");
Map<String, String> treatmentsByFlagSets = client.getTreatmentsByFlagSets(flagSets);

// Treatments will have the following form:
// {
//   "FEATURE_FLAG_NAME_1": "on",
//   "FEATURE_FLAG_NAME_2": "visa"
// }
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Getting treatments by feature flag names
val featureFlagNames: List<String> = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val treatments: Map<String, String> = client.getTreatments(featureFlagNames, null)

// Getting treatments by set
val treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", null)

// Getting treatments for the union of multiple sets
val flagSets = listOf("frontend", "client_side")
val treatmentsByFlagSets = client.getTreatmentsByFlagSets(flagSets)

// Treatments have the following form:
// {
//   "FEATURE_FLAG_NAME_1": "on",
//   "FEATURE_FLAG_NAME_2": "visa"
// }
```

</TabItem>
</Tabs>

### Track

Tracking events is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users' actions and metrics. See the [Events](/docs/feature-management-experimentation/release-monitoring/events/) documentation for more information.

The Suite automatically collects some RUM metrics and sends them to Harness FME. Specifically, crashes, ANRs and app start time (see [Default events](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent/#default-events)) are automatically collected by the Suite. Learn more about these and other events in the [Android RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent/#events) documentation.

To track custom events, you can use the `client.track()` method or the `suite.track()` method. Both methods are demonstrated in the code examples below.

The `client.track()` method sends events **_for the identity configured on the client instance_**. This `track` method can take up to four arguments. The proper data type and syntax for each are:

* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you have defined in your instance of Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `suite.track()` method sends events **_for all the identities_** configured on all instances of the Suite clients. For those clients that have not been configured with a traffic type, this `track` method uses the default traffic type `user`. This `track` method can take up to three of the four arguments described above: `EVENT_TYPE`, `VALUE`, and `PROPERTIES`.

Tracking per identity using `client.track()`:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitClient client = suite.client();

// The expected parameters are:
client.track(TRAFFIC_TYPE, EVENT_TYPE, eventValue, eventProperties);

// Example with both a value and properties
Map<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);
client.track("user", "screen_load_time", 83.334, properties);

// Example with only properties
Map<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50L);
client.track("user", "screen_load_time", properties);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val client = suite.client()

// The expected parameters are:
client.track(TRAFFIC_TYPE, EVENT_TYPE, eventValue, eventProperties)

// Example with both a value and properties
val properties = mapOf(
  "package" to "premium",
  "admin" to true,
  "discount" to 50L
)
client.track("user", "screen_load_time", 83.334, properties)

// Example with only properties
val properties = mapOf(
  "package" to "premium",
  "admin" to true,
  "discount" to 50L
)
client.track("user", "screen_load_time", properties)
```

</TabItem>
</Tabs>

Tracking for all identities using `suite.track()`:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java

// The expected parameters are:
suite.track('EVENT_TYPE', eventValue, eventProperties);

// Example with both a value and properties
Map<String, Object> properties = new HashMap();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50L);
suite.track("screen_ad_time", 83.334, properties);

// Example with only properties
Map<String, Object> properties = new HashMap();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50L);
suite.track("screen_load_time", null, properties);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// The expected parameters are:
suite.track('EVENT_TYPE', eventValue, eventProperties)

// Example with both a value and properties
val properties = mapOf(
  "package" to "premium",
  "admin" to true,
  "discount" to 50L
)
suite.track("screen_ad_time", 83.334, properties)

// Example with only properties
val properties = mapOf(
  "package" to "premium",
  "admin" to true,
  "discount" to 50L
)
suite.track("screen_load_time", null, properties);
```

</TabItem>
</Tabs>

The `client.track()` methods return a boolean value of `true` or `false` to indicate whether or not the Suite was able to successfully queue the event, to be sent back to Harness servers on the next event post.

### Shutdown

It is good practice to call the `destroy` method before your app shuts down or is destroyed, as this method gracefully shuts down the Suite by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
suite.destroy();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
suite.destroy()
```

</TabItem>
</Tabs>

After the `suite.destroy()` method is called and finishes, any subsequent invocations to `getTreatment` or manager methods result in `control` or an empty list, respectively. You can also call `destroy` on the client instance, which will stop the specific Suite client, but will keep the Suite running.

:::warning[Important]
The `suite.destroy()` method destroys all the Suite client instances. To create a new client instance, first create a new Suite instance.
:::

## Configuration

The Suite has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the Suite. The parameters available for configuration are shown below in separate tables for those parameters that affect feature flagging, those that affect the Suite RUM agent, and those that affect both.

Feature flagging parameters:


| **Configuration** | **Description** | **Default value** |
|---|---|---|
| featuresRefreshRate | The Suite polls Harness servers for changes to feature flags at this rate (in seconds). | 3600 seconds |
| segmentsRefreshRate | The Suite polls Harness servers for changes to segments at this rate (in seconds). | 1800 seconds |
| impressionsRefreshRate | The treatment log captures which customer saw what treatment (on, off, etc.) at what time. This log is periodically flushed back to Harness servers. This configuration controls how quickly the cache expires after a write (in seconds). | 1800 seconds |
| telemetryRefreshRate | The Suite caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds (1 hour) |
| eventsQueueSize | When using the `track` method, the number of **events** to be kept in memory. | 10000 |
| eventFlushInterval | When using the `track` method, how often is the events queue flushed to Harness servers. | 1800 seconds |
| eventsPerPush | Maximum size of the batch to push events. | 2000 |
| trafficType | When using the `track` method, the default traffic type to be used. | not set |
| connectionTimeout | HTTP client connection timeout (in ms). | 10000 ms |
| readTimeout | HTTP socket read timeout (in ms). | 10000 ms |
| impressionsQueueSize | Default queue size for impressions. | 30K |
| disableLabels | Disable labels from being sent to Harness servers. Labels may contain sensitive information. | true |
| proxyHost | The location of the proxy using standard URI: `scheme://user:password@domain:port/path`. If no port is provided, the Suite defaults to port 80. | null |
| ready | Maximum amount of time in milliseconds to wait before notifying a timeout. | -1 (not set) |
| synchronizeInBackground | Activates synchronization when application host is in background. | false |
| synchronizeInBackgroundPeriod | Rate in minutes in which the background synchronization would check the conditions and trigger the data fetch if those are met. Minimum rate allowed is 15 minutes. | 15 |
| backgroundSyncWhenBatteryNotLow | When set to true, synchronize in background only if battery level is not low. | true |
| backgroundSyncWhenWifiOnly | When set to true, synchronize in background only when the available connection is wifi (unmetered). When false, background synchronization takes place as long as there is an available connection. | false |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism when in foreground. In the event of an issue with streaming, the Suite will fallback to the polling mechanism. If false, the Suite will poll for changes as usual without attempting to use streaming. | true |
| syncConfig | Optional SyncConfig instance. Use it to filter specific feature flags to be synced and evaluated by the Suite. These filters can be created with the `SplitFilter::bySet` static function (recommended, flag sets are available in all tiers), or `SplitFilter::byName` static function, and appended to this config using the `SyncConfig` builder. If not set or empty, all feature flags are downloaded by the Suite. | null |
| persistentAttributesEnabled | Enables saving attributes on persistent cache which is loaded as part of the SDK_READY_FROM_CACHE flow. All functions that mutate the stored attributes map affect the persistent cache. | false |
| syncEnabled | Controls the SDK continuous synchronization flags. When `true`, a running Suite processes rollout plan updates performed in Harness FME (default). When `false`, it fetches all data upon init, which ensures a consistent experience during a user session and optimizes resources when these updates are not consumed by the app. | true |
| impressionsMode | This configuration defines how impressions (decisioning events) are queued on the Suite. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, ALL impressions are queued and sent to Harness; this is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `OPTIMIZED` |
| userConsent | User consent status used to control the tracking of events and impressions. Possible values are `GRANTED`, `DECLINED`, and `UNKNOWN`. See [User consent](#user-consent) for details. | `GRANTED` |
| encryptionEnabled | If set to `true`, the local database contents is encrypted. | false |
| prefix | If set, the prefix will be prepended to the database name used by the Suite. | null |
| certificatePinningConfiguration | If set, enables certificate pinning for the given domains. For details, see the [Certificate pinning](#certificate-pinning) section below. | null |
| expirationDays | Number of days to keep cached data before it is considered expired. | 10 days |
| clearOnInit | If set to `true`, clears any previously stored rollout data when the SDK initializes. Useful to force fresh data fetch on startup. | false |
| rolloutCacheConfiguration | Specifies how long rollout data is kept in local storage before expiring. | null |

Suite RUM agent parameters:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| prefix | Optional prefix to append to the `eventTypeId` of the events sent to Harness by the Suite RUM agent. For example, if you set the prefix to 'my-app', the event type 'error' will be sent as 'my-app.error'. | null |

Shared parameters:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| logLevel | Enables logging according to the level specified. Options are `NONE`, `VERBOSE`, `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `ASSERT`. | `NONE` |

To set each of the parameters defined above, use the following syntax:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
RolloutCacheConfiguration rolloutCacheConfig = RolloutCacheConfiguration.builder()
    .expirationDays(5) // Override the default expiration of 10 days
    .clearOnInit(true)
    .build();

SplitSuite suite = SplitSuiteBuilder.build(
    sdkKey,
    new Key("user_id"),
    SplitClientConfig
        .builder()
        .featuresRefreshRate(30)
        .segmentsRefreshRate(30)
        .impressionsRefreshRate(30)
        .impressionsQueueSize(30000)
        .eventFlushInterval(60)
        .eventsQueueSize(500)
        .telemetryRefreshRate(3600)
        .logLevel(SplitLogLevel.VERBOSE)
        .rolloutCacheConfiguration(rolloutCacheConfig)
        .build(),
    applicationContext);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val rolloutCacheConfig = RolloutCacheConfiguration.builder()
    .expirationDays(5) // Override the default expiration of 10 days
    .clearOnInit(true)
    .build()

val suite: SplitSuite = SplitSuiteBuilder.build(
    sdkKey,
    Key("user_id"),
    SplitClientConfig
        .builder()
        .featuresRefreshRate(30)
        .segmentsRefreshRate(30)
        .impressionsRefreshRate(30)
        .impressionsQueueSize(30000)
        .eventFlushInterval(60)
        .eventsQueueSize(500)
        .telemetryRefreshRate(3600)
        .logLevel(SplitLogLevel.VERBOSE)
        .rolloutCacheConfiguration(rolloutCacheConfig)
        .build(),
    applicationContext)
```

</TabItem>
</Tabs>

### Configure cache behavior

The SDK stores rollout data locally to speed up initialization and support offline behavior. By default, the cache expires after 10 days. You can override this or force clear the cache on Suite initialization.

The minimum value for cache expiration is 1 day. Any lower value will revert to the default of 10 days. Even if you enable the option to clear the cache on initialization, the Suite will only clear it once per day to avoid excessive network usage.

You can configure cache behavior using the `rolloutCacheConfiguration` setting:

```kotlin
val rolloutCacheConfig = RolloutCacheConfiguration.builder()
    .expirationDays(5) // Override the default expiration of 10 days
    .clearOnInit(true)
    .build()
```

- `expirationDays`: Number of days to keep cached data before it is considered expired. Default: 10 days.
- `clearOnInit`: If set to `true`, clears previously stored rollout data when the SDK initializes. Default: `false`.

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the Suite requiring network connectivity. To achieve this, you can start the Suite in **localhost** mode (aka, off-the-grid mode). In this mode, the Suite neither polls or updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the feature flags. To use the Suite in localhost mode, replace the SDK Key with `localhost`, as shown in the example below/

The format for defining the definitions is as follows:

<Tabs>
<TabItem value="YAML">

```yaml
## - feature_name:
##     treatment: "treatment_applied_to_this_entry"
##     keys: "single_key_or_list"
##     config: "{\"desc\" : \"this applies only to ON treatment\"}"

- my_feature:
    treatment: "on"
    keys: "key"
    config: "{\"desc\" : \"this applies only to ON treatment\"}"
- some_other_feature:
    treatment: "off"
- my_feature:
    treatment: "off"
- other_feature:
    treatment: "off"
    keys: ["key_1", "key_2"]
    config: "{\"desc\" : \"this overrides multiple keys and returns off treatment for those keys\"}"
```

</TabItem>
</Tabs>

In the example above, we have four entries:

 * The first entry defines that for feature flag `my_feature`, the key `key` returns the treatment `on` and the `on` treatment is tied to the configuration `{"desc" : "this applies only to ON treatment"}`.
 * The second entry defines that the feature flag `some_other_feature` always returns the `off` treatment and no configuration.
 * The third entry defines that `my_feature` always returns `off` for all keys that don't match another entry (in this case, any key other than `key`).
 * The fourth entry shows an example on how to override a treatment for a set of keys.

In this mode, the FME SDK Suite loads the yaml file from a resource bundle file at the assets' project `src/main/assets/splits.yaml`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.android.client.SplitClient;
import io.split.android.client.SplitFactoryBuilder;
import io.split.android.client.api.Key;

// Create a new user key to be evaluated
String matchingKey = "key";
Key key = new Key(matchingKey);

SplitClient client = SplitSuiteBuilder.build("localhost", key, getApplicationContext()).client();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.android.client.SplitFactoryBuilder
import io.split.android.client.api.Key

// Create a new user key to be evaluated
val key = Key("key")

val client = SplitSuiteBuilder.build(
    "localhost",
    key,
    applicationContext
).client()
```

</TabItem>
</Tabs>

## Manager

Use the Split Manager to get a list of feature flags available to the SDK client. To instantiate a Manager in your code base, use the same factory that you used for your client.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_API_KEY");
SplitManager manager = splitFactory.manager();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val splitFactory: SplitFactory = SplitFactoryBuilder.build(
    "api_key",
    Key("key"),
    applicationContext
)

val manager: SplitManager = splitFactory.manager()
```

</TabItem>
</Tabs>

The Manager then has the following methods available.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
/**
 * Retrieves the feature flags that are currently registered with the
 * Suite.
 *
 * @return a List of SplitView or empty.
 */
List<SplitView> splits();

/**
 * Returns the feature flags registered with the Suite of this name.
 *
 * @return SplitView or null
 */
SplitView split(String SplitName);

/**
 * Returns the names of feature flags registered with the Suite.
 *
 * @return a List of String (FME feature flag names) or empty
 */
List<String> splitNames();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
/**
 * Retrieves the feature flags that are currently registered with the
 * Suite.
 *
 * @return a List of SplitView or empty.
 */
fun splits(): List<SplitView>

/**
 * Returns the feature flags registered with the Suite of this name.
 *
 * @return SplitView or null
 */
fun split(SplitName: String): SplitView?

/**
 * Returns the names of features flags registered with the Suite.
 *
 * @return a List of String (feature flag names) or empty
 */
fun splitNames(): List<String>

```

</TabItem>
</Tabs>

The `SplitView` object referenced above has the following structure.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
public class SplitView {
    public String name;
    public String trafficType;
    public boolean killed;
    public List<String> treatments;
    public long changeNumber;
    public Map<String, String> configs;
    public String defaultTreatment;
    public List<String> sets;
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
class SplitView(
    var name: String?,
    var trafficType: String?,
    var killed: Boolean,
    var treatments: List<String>?,
    var changeNumber: Long
    var defaultTreatment: String?
    var sets: List<String>
)
```

</TabItem>
</Tabs>

## Listener

The FME Suite sends impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*.

The Suite sends the generated impressions to the impression listener right away. Because of this, be careful while implementing handling logic to avoid blocking the thread. Generally speaking, you should create a separate thread to handle incoming impressions. Refer to the snippet below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitClientConfig config = SplitClientConfig.builder()
                        .impressionListener(new MyImpressionListener())
                        .build();

class MyImpressionListener implements ImpressionListener {
    @Override
    public void log(Impression impression) {
        // Do something on UI thread
        new Thread(new Runnable() {
            public void run() {
                // Do something in another thread (use this most of the time!)
            }
        }).start();
    }

    @Override
    public void close() {
    }
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
class MyImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Do something on UI thread
        Thread {
            // Do something in another thread (use this most of the time!)
        }.start()
    }

    override fun close() {

    }
}

val config = SplitClientConfig.builder()
    .impressionListener(MyImpressionListener())
    .build()
```

</TabItem>
</Tabs>

In regards with the data available here, refer to the `Impression` objects interface and information about each field below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
    String key();
    String bucketingKey();
    String split();
    String treatment();
    Long time();
    String appliedRule();
    Long changeNumber();
    Map<String, Object> attributes();
    Long previousTime();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
    key(): String?
    bucketingKey(): String?
    split(): String?
    treatment(): String?
    time(): Long?
    appliedRule(): String?
    changeNumber(): Long?
    attributes(): Map<String, Any?>?
    previousTime(): Long?
```

</TabItem>
</Tabs>

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| key | String | Key which is evaluated. |
| bucketingKey | String | Key which is used for bucketing, if provided. |
| split | String | Feature flag which is evaluated. |
| treatment | String | Treatment that is returned. |
| time | Long | Timestamp of when the impression is generated. |
| appliedRule | String | Targeting rule in the definition that matched resulting in the treatment being returned. |
| changeNumber | Long | Date and time of the last change to the targeting rule that the Suite used when it served the treatment. It is important to understand when a change made to a feature flag is picked up by the Suite and whether one of the Suite instances is not picking up changes. |
| attributes | Map\<String, Object\> | A map of attributes passed to `getTreatment`/`getTreatments`, if any. |
| previousTime | Long | If Suite is deduping and a matching impression is seen before on the lifetime of the instance this is its timestamp. |

## Flush

The `flush` method sends the data stored in memory (impressions and events tracked using client's `track` method) to the Harness FME servers and clears the successfully posted data. If a connection issue is experienced, the data is sent on the next attempt. If you want to flush all pending data when your app goes to the background, a good place to call this method is the `onPause` callback of your activity.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
client.flush();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.flush()
```

</TabItem>
</Tabs>

## Logging

To enable logging, the `logLevel` setting is available in `SplitClientConfig` class:

```swift title="Setup logs"
// This setting type is `SplitLogLevel`. 
// The available values are DEBUG, INFO, WARNING, ERROR, ASSERT and NONE
SplitClientConfig.Builder builder = SplitClientConfig.builder()
    .logLevel(SplitLogLevel.VERBOSE)
SplitClientConfig config = builder.build();

  ...
```

## Advanced use cases

This section describes advanced use cases and features provided by the Suite.

### Instantiate multiple clients

FME supports the ability to create multiple clients, one for each user ID. Each Suite client is tied to one specific customer ID at a time. For example, if you need to roll out feature flags for different user IDs, you can instantiate multiple clients, one for each ID. You can then evaluate them using the corresponding client.

You can do this with the example below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Create factory
Key key = new Key("anonymous_user");
SplitClientConfig config = SplitClientConfig.builder().build();
SplitSuite suite = SplitSuiteBuilder.build("yourAuthKey", key, config, getApplicationContext());
// Now when you call suite.client(), the Suite will create a client
// using the Key you passed in during the factory creation
SplitClient anonymousClient = suite.client();
// To create another client for a user instead, just pass in a different Key or id
SplitClient userClient = suite.client("user_id");
// Add events handler for each client to be notified when Suite is ready
anonymousClient.on(SplitEvent.SDK_READY, new SplitEventTask() {
    @Override
    public void onPostExecutionView(SplitClient client) {
        // Check treatment for account-permissioning and anonymousClient
        String accountPermissioningTreatment = anonymousClient.getTreatment("account-permissioning");
    }
});
userClient.on(SplitEvent.SDK_READY, new SplitEventTask() {
    @Override
    public void onPostExecutionView(SplitClient client) {
        // Check treatment for user-poll and userClient
        String userPollTreatment = userClient.getTreatment("user-poll");
    }
});
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Create factory
val key = Key("anonymous_user")
val config = SplitClientConfig.builder().build()
val suite = SplitSuiteBuilder.build("yourAuthKey", key, config, getApplicationContext())
// Now when you call suite.client(), the Suite will create a client
// using the Key you passed in during the factory creation
val anonymousClient = suite.client()
// To create another client for a user instead, just pass in a different Key or id
val userClient = suite.client("user_id")
// Add events handler for each client to be notified when Suite is ready
anonymousClient.on(SplitEvent.SDK_READY, object : SplitEventTask() {
    override fun onPostExecutionView(client: SplitClient) {
        // Check treatment for account-permissioning and anonymousClient
        val accountPermissioningTreatment = anonymousClient.getTreatment("account-permissioning")
    }
})
userClient.on(SplitEvent.SDK_READY, object : SplitEventTask() {
    override fun onPostExecutionView(client: SplitClient) {
        // Check treatment for user-poll and userClient
        val userPollTreatment = userClient.getTreatment("user-poll")
    }
})
```

</TabItem>
</Tabs>

The events captured by the Suite's RUM agent are sent to Harness servers using the traffic types and keys of the created client. If no traffic type is provided, the traffic type is `user` by default.

:::info[Number of Suite instances]
While the Suite does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of instances down to **one** or **two**.
:::

### Subscribe to events

You can listen for four different events from the Suite.

* `SDK_READY_FROM_CACHE`. This event fires once the Suite is ready to evaluate treatments using a locally cached version of your rollout plan from a previous session (which might be stale). If there is data in the cache, this event fires almost immediately, since access to the cache is fast; otherwise, it doesn't fire.
* `SDK_READY`. This event fires once the Suite is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `SDK_READY_TIMED_OUT`. This event fires if there is no cached version of your rollout plan in disk cache, and the Suite could not download the data from Harness servers within the time specified by the `ready` setting of the `SplitClientConfig` object. This event does not indicate that the Suite initialization was interrupted. The Suite continues downloading the rollout plan and fires the `SDK_READY` event when finished. This delayed `SDK_READY` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `SDK_UPDATE`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

To define what is executed after each event, create an extension of `SplitEventTask`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
public class SplitEventTask {
    public void onPostExecution(SplitClient client) { }
    public void onPostExecutionView(SplitClient client) { }
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
open class SplitEventTask {
    open fun onPostExecution(client: SplitClient) { }
    open fun onPostExecutionView(client: SplitClient) { }
}
```

</TabItem>
</Tabs>

Both the `onPostExecution` and `onPostExecutionView` methods are executed after the SDK event is triggered. The `onPostExecution` method is executed on a background thread, so we recommend it's used in cases where heavy computation is needed. The `onPostExecutionView` method is executed on the UI thread, so we recommend it's only used for short tasks or manipulating the UI.

The syntax to listen for each event is shown below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
client.on(SplitEvent.SDK_READY, new SplitEventTask() {
  @Override
  public void onPostExecution(SplitClient client) {
    // Background Code in Here
  }
  @Override
  public void onPostExecutionView(SplitClient client) {
    // UI Code in Here
  }
});
// When definitions and any bound attributes were loaded from cache
client.on(SplitEvent.SDK_READY_FROM_CACHE, new SplitEventTask() {
  @Override
  public void onPostExecution(SplitClient client) {
    // Background Code in Here
  }
  @Override
  public void onPostExecutionView(SplitClient client) {
    // UI Code in Here
  }
});
// When the Suite couldn't fetch definitions before *config.ready* time
client.on(SplitEvent.SDK_READY_TIMED_OUT, new SplitEventTask() {
  @Override
  public void onPostExecution(SplitClient client) {
    // Background Code in Here
  }
  @Override
  public void onPostExecutionView(SplitClient client) {
    // UI Code in Here
  }
});
// When definitions have changed
client.on(SplitEvent.SDK_READY_UPDATE, new SplitEventTask() {
  @Override
  public void onPostExecution(SplitClient client) {
    // Background Code in Here
  }
  @Override
  public void onPostExecutionView(SplitClient client) {
    // UI Code in Here
  }
});
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.on(SplitEvent.SDK_READY, object : SplitEventTask() {
    override fun onPostExecution(client: SplitClient) {
        // Background Code in Here
    }
    override fun onPostExecutionView(client: SplitClient) {
        // UI Code in Here
    }
})
// When definitions were loaded from cache
client.on(SplitEvent.SDK_READY_FROM_CACHE, object : SplitEventTask() {
    override fun onPostExecution(client: SplitClient) {
        // Background Code in Here
    }
    override fun onPostExecutionView(client: SplitClient) {
        // UI Code in Here
    }
})
// When the Suite couldn't fetch definitions before *config.ready* time
client.on(SplitEvent.SDK_READY_TIMED_OUT, object : SplitEventTask() {
    override fun onPostExecution(client: SplitClient) {
        // Background Code in Here
    }
    override fun onPostExecutionView(client: SplitClient) {
        // UI Code in Here
    }
})
// When definitions have changed
client.on(SplitEvent.SDK_UPDATE, object : SplitEventTask() {
    override fun onPostExecution(client: SplitClient) {
        // Background Code in Here
    }
    override fun onPostExecutionView(client: SplitClient) {
        // UI Code in Here
    }
})
```

</TabItem>
</Tabs>

### User consent

The Suite allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined.

The `userConsent` configuration parameter lets you set the initial consent status of the Suite instance, and the Suite method `UserConsent.setStatus(boolean)` lets you grant (enable) or decline (disable) the dynamic data tracking.

There are three possible initial states:
 * `'GRANTED'`: the user grants consent for tracking events and impressions. The Suite sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: the user declines consent for tracking events and impressions. The Suite does not send them to Harness FME servers.
 * `'UNKNOWN'`: the user neither grants nor declines consent for tracking events and impressions. The Suite tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively. The status can be updated at any time with the `setUserConsent` Suite method.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Overwrites the initial consent status of the Suite instance, which is 'GRANTED' by default.
// 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
// so the Suite locally tracks data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
SplitClientConfig config = SplitClientConfig.builder()
    .userConsent(UserConsent.UNKNOWN)
    .build();
SplitSuite suite = SplitSuiteBuilder.build("YOUR_SDK_KEY",
        new Key(mUserKey, null),
        config, context);
// Changed User Consent status to 'GRANTED'. Data is sent to Harness FME servers.
suite.setUserConsent(true);
// Changed User Consent status to 'DECLINED'. Data is not sent to Harness FME servers.
suite.setUserConsent(false);
// The 'getUserConsent' method returns User Consent status.
// We expose the constants for customer checks and tracking.
if (suite.getUserConsent() == UserConsent.DECLINED) {
    Log.i(TAG, "USER CONSENT DECLINED");
} else if (suite.getUserConsent() == UserConsent.GRANTED) {
    Log.i(TAG, "USER CONSENT GRANTED");
} else if (suite.getUserConsent() == UserConsent.UNKNOWN) {
    Log.i(TAG, "USER CONSENT UNKNOWN");
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Overwrites the initial consent status of the Suite instance, which is 'GRANTED' by default.
// 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
// so the Suite locally tracks data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
val config: SplitClientConfig = SplitClientConfig.builder()
    .userConsent(UserConsent.UNKNOWN)
    .build()
val suite: SplitSuite = SplitSuiteBuilder.build("YOUR_SDK_KEY",
        Key(mUserKey, null),
        config, context)
// Changed User Consent status to 'GRANTED'. Data is sent to Harness FME servers.
suite.setUserConsent(true)
// Changed User Consent status to 'DECLINED'. Data is not sent to Harness FME servers.
suite.setUserConsent(false)
// The 'getUserConsent' method returns User Consent status.
// We expose the constants for customer checks and tracking.
if (suite.getUserConsent() == UserConsent.DECLINED) {
    Log.i(TAG, "USER CONSENT DECLINED")
} else if (suite.getUserConsent() == UserConsent.GRANTED) {
    Log.i(TAG, "USER CONSENT GRANTED")
} else if (suite.getUserConsent() == UserConsent.UNKNOWN) {
    Log.i(TAG, "USER CONSENT UNKNOWN")
}
```

</TabItem>
</Tabs>

### Certificate pinning

The SDK allows you to constrain the certificates that the SDK trusts, using one of the following techniques:

1. Pin a certificate's `SubjectPublicKeyInfo`, by providing the public key as a ___base64 SHA-256___ hash or a ___base64 SHA-1___ hash.
2. Pin a certificate's entire certificate chain (the root, all intermediate, and the leaf certificate), by providing the certificate chain as a .der file.

Each pin corresponds to a host. For subdomains, you can optionally use wildcards, where `*` will match one subdomain (e.g. `*.example.com`), and `**` will match any number of subdomains (e.g `**.example.com`).

You can optionally configure a listener to execute on certificate validation failure for a host.

To set the SDK to require pinned certificates for specific hosts, add the `CertificatePinningConfiguration` object to `SplitClientConfig.Builder`, as shown below.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.android.client.network.CertificatePinningConfiguration;
import io.split.android.client.SplitClientConfig;
import com.yourApp.R; // to reference your res/ folder

// Define pins for certificate pinning
CertificatePinningConfiguration certPinningConfig = CertificatePinningConfiguration.builder()

    // Provide a base 64 SHA-256 hash
    .addPin("*.example1.com", "sha256/7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=")

    // Provide a certificate chain as a 'res/raw/cert.der' file
    .addPin("*.example2.com", context.getResources().openRawResource(R.raw.cert))

    // Provide a listener to log failure
    .failureListener((host, certificateChain) -> {
        Log.d("CertPinning", "Certificate pinning failure for " + host);
    })

    .build();

// Set the CertificatePinningConfiguration property for the SDK client configuration
SplitClientConfig config = SplitClientConfig.builder()
    .certificatePinningConfiguration(certPinningConfig)
    // you can add other configuration properties here
    .build();

```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.android.client.network.CertificatePinningConfiguration
import io.split.android.client.SplitClientConfig
import com.yourApp.R // to reference your res/ folder

// Define pins for certificate pinning
val certPinningConfig = CertificatePinningConfiguration.builder()

    // Provide a base 64 SHA-256 hash
    .addPin("*.example1.com", "sha256/7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=")

    // Provide a certificate chain as a 'res/raw/cert.der' file
    .addPin("*.example2.com", context.getResources().openRawResource(R.raw.cert))

    // Provide a listener to log failure
    .failureListener { host, certificateChain ->
        Log.d("CertPinning", "Certificate pinning failure for $host")
    }

    .build()

// Set the CertificatePinningConfiguration property for the SDK client configuration
val config = SplitClientConfig.builder()
    .certificatePinningConfiguration(certPinningConfig)
    // you can add other configuration properties here
    .build()

```

</TabItem>
</Tabs>

### RUM agent configuration

The Suite handles the setup of its RUM agent using the same SDK key. Configurations for [Logging](#logging) and [Identities](#instantiate-multiple-clients) are also shared with the Suite's RUM agent.

You can further configure the RUM agent passing a `SplitSuiteConfiguration` object instead of `SplitClientConfiguration`. To create this object, use a `SplitSuiteConfigurationBuilder`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Optionally create feature flagging configuration
SplitClientConfig splitClientConfig = SplitClientConfig
    .builder()
    .logLevel(SplitLogLevel.VERBOSE)
    .build();

// Create a SplitSuiteConfiguration builder
SplitSuiteConfigurationBuilder suiteConfigurationBuilder = SplitSuiteConfiguration.builder();

// Specify a prefix for the Suite events
suiteConfigurationBuilder = suiteConfigurationBuilder.setPrefix("myprefix_");

// Create the SplitSuiteConfiguration, passing the optional SplitClientConfig for feature flagging
SplitSuiteConfiguration splitSuiteConfiguration = suiteConfigurationBuilder
    .build(splitClientConfig);

// Instantiate the Suite passing in the SplitSuiteConfiguration
SplitSuite suite = SplitSuiteBuilder.build(
    "YOUR_SDK_KEY",
    new Key("key1"),
    splitSuiteConfiguration,
    applicationContext);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Optionally create feature flagging configuration
val splitClientConfig: SplitClientConfig = SplitClientConfig
    .builder()
    .logLevel(SplitLogLevel.VERBOSE)
    .build()

// Create a SplitSuiteConfiguration builder
var suiteConfigurationBuilder = SplitSuiteConfiguration.builder()

// Specify a prefix for the Suite events
suiteConfigurationBuilder = suiteConfigurationBuilder.setPrefix("myprefix_")

// Create the SplitSuiteConfiguration, passing the optional SplitClientConfig for feature flagging
val splitSuiteConfiguration: SplitSuiteConfiguration = suiteConfigurationBuilder
    .build(splitClientConfig)

// Instantiate the Suite passing in the SplitSuiteConfiguration
val suite: SplitSuite = SplitSuiteBuilder.build(
    "YOUR_SDK_KEY",
    Key("key1"),
    splitSuiteConfiguration,
    applicationContext
)
```

</TabItem>
</Tabs>