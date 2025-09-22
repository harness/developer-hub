---
title: Java SDK
sidebar_label: Java SDK
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/java-sdk-is-there-a-jar-file/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/java-sdk-time-out-error-nosuchmethoderror-google-common/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/java-sdk-how-to-change-log-level/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/java-sdk-fatal-alert-handshake-failure/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/java-sdk-exception-pkix-path-building-failed/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

This guide provides detailed information about our Java SDK. All of our SDKs are open source. Go to our [Java SDK GitHub repository](https://github.com/splitio/java-client) to see the source code.

If you prefer to use the SDK as a standalone JAR file, it’s available for download from the Maven Central Repository. For example, the JAR for version 4.2.1 can be downloaded [here](https://repo1.maven.org/maven2/io/split/client/java-client/4.2.1/java-client-4.2.1.jar). You can browse all available versions [here](https://repo1.maven.org/maven2/io/split/client/java-client/).

## Language support

The Java SDK supports JDK8 and later.

:::tip[Rule-based segments support]
Rule-based segments are supported in SDK versions 4.16.0 and above. No changes are required to your SDK implementation, but updating to a supported version is required to ensure compatibility.

Older SDK versions will return the control treatment for flags using rule-based segments and log an impression with a special label for unsupported targeting rules.
:::

## Initialization

To get started, set up FME in your code base using the following two steps.

### 1. Import the SDK into your project

Import the SDK into your project using one of the following two methods:

<Tabs>
<TabItem value="Maven">

```java
<dependency>
    <groupId>io.split.client</groupId>
    <artifactId>java-client</artifactId>
    <version>4.18.0</version>
</dependency>
```

</TabItem>
<TabItem value="Gradle">

```java
compile 'io.split.client:java-client:4.18.0'
```

</TabItem>
</Tabs>

If you cannot find the dependency, it may be due to the lag in the sync time between Sonatype and Maven central. In this case, use the following repository:

<Tabs>
<TabItem value="XML">

```java
<repositories>
  <repository>
    <id>sonatype releases</id>
    <url>https://oss.sonatype.org/content/repositories/releases/</url>
  </repository>
</repositories>
```

</TabItem>
</Tabs>

### 2. Instantiate the SDK and create a new SDK factory client

:::danger[If upgrading an existing SDK - Block until ready changes]
Starting version 3.0.1, SplitClientConfig#ready(int) is deprecated and migrated to a two part implementation:
* Set the desired value in `SplitClientConfig#setBlockUntilReadyTimeout(int)`.
* Call `SplitClient#blockUntilReady()` or `SplitManager#blockUntilReady()`.
:::

When the SDK is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds, depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while it's in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, block until the SDK is ready. Do this by setting the desired wait using `.setBlockUntilReadyTimeout()` in the configuration and calling `blockUntilReady()` on the client. Do this all as a part of the startup sequence of your application.

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Use the code snippet below with your own API key. Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a server-side SDK API key. See [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys) to learn more.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

SplitClientConfig config = SplitClientConfig.builder()
   .setBlockUntilReadyTimeout(10000)
   .build();

SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY", config);
SplitClient client = splitFactory.client();
try {
    client.blockUntilReady();
} catch (TimeoutException | InterruptedException e) {
    // log & handle
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.SplitClient
import io.split.client.SplitClientConfig
import io.split.client.SplitFactory
import io.split.client.SplitFactoryBuilder

val config: SplitClientConfig = SplitClientConfig.builder()
            .setBlockUntilReadyTimeout(10000)
            .build()
val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY", config)
val client: SplitClient = splitFactory.client()
try {
    client.blockUntilReady()
} catch (e: Exception) {
    // log & handle
}
```

</TabItem>
</Tabs>

Now you can start asking the SDK to evaluate treatments for your customers.

## Using the SDK

### Basic use

After you instantiate the SDK factory client, you can start using the `getTreatment` method of the SDK factory client to decide what version of your features your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `key` attribute that corresponds to the end user that you are serving the feature to.

Then use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning the [control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment).

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
String treatment = client.getTreatment("key","FEATURE_FLAG_NAME");

if (treatment.equals("on")) {
    // insert code here to show on treatment
} else if (treatment.equals("off")) {
    // insert code here to show off treatment
} else {
    // insert your control treatment code here
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
val treatment = client.getTreatment("key","FEATURE_FLAG_NAME")

when (treatment) {
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
```

</TabItem>
</Tabs>

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes), the SDK's `getTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the Rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `java.lang.Long` or `java.lang.Integer`.
* **Dates:** Express the value in `milliseconds since epoch`. In Java, `milliseconds since epoch` is of type `java.lang.Long`. For example, the value for the `registered_date` attribute below is `System.currentTimeInMillis()`, which is a long.
* **Booleans:** Use type `java.lang.boolean`.
* **Sets:** Use type `java.util.Collection`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.codigo.client.SplitClient;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

import java.util.Map;
import java.util.HashMap;
import java.util.Date;

SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY");
SplitClient client = splitFactory.client();

Map<String, Object> attributes = new HashMap<String, Object>();
attributes.put("plan_type", "growth");
attributes.put("registered_date", System.currentTimeMillis());
attributes.put("deal_size", 1000);
attributes.put("paying_customer", true);
List<String> perms = Arrays.asList("read", "write");
attributes.put("permissions", perms);

String treatment = client.getTreatment("key", "FEATURE_FLAG_NAME", attributes);

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
import io.split.client.SplitClient
import io.split.client.SplitFactory
import io.split.client.SplitFactoryBuilder

val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY")
val client: SplitClient = splitFactory.client()

val perms = listOf("read", "write")
val attributes = mapOf("plan_type" to "growth",
                        "registered_date" to System.currentTimeMillis(),
                        "deal_size" to 1000,
                        "paying_customer" to true,
                        "permissions" to perms)

val treatment = client.getTreatment("key", "FEATURE_FLAG_NAME", attributes)

when (treatment) {
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
```

</TabItem>
</Tabs>

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// getTreatments
List<String> featureFlagNames = Arrays.asList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
Map<String, String> treatments = client.getTreatments("KEY", featureFlagNames);

// getTreatmentsByFlagSet
Map<String, String> treatmentsBySet = client.getTreatmentsByFlagSet("KEY", "backend");

// getTreatmentsByFlagSets
List<String> flagSetNames = Arrays.asList("backend", "server_side");
Map<String, String> treatmentsBySets = client.getTreatmentsByFlagSets("KEY", flagSetNames);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// getTreatments
val featureFlagNames = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val treatments = client.getTreatments("KEY", featureFlagNames)

// getTreatmentsByFlagSet
val treatmentsBySet = client.getTreatmentsByFlagSet("KEY", "backend")

// getTreatmentsByFlagSets
val flagSetNames = listOf("backend", "server_side")
val treatmentsBySets = client.getTreatmentsByFlagSets("KEY", flagSetNames)
```

</TabItem>
</Tabs>

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations), you should use the `getTreatmentWithConfig` method. This method returns an object containing the treatment and associated configuration.

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `null` for the config parameter.

This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitResult result = client.getTreatmentWithConfig("KEY", "FEATURE_FLAG_NAME");
String treatment = result.treatment();
if (null != result.config()) {
    MyConfiguration config = gson.fromJson(result.config(), MyConfiguration.class);
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val result: SplitResult = client.getTreatmentWithConfig("KEY", "FEATURE_FLAG_NAME")
val config: String = result.config()
val treatment: String = result.treatment()
```

</TabItem>
</Tabs>

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult instead of strings. Example usage below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// getTreatmentsWithConfig
List<String> featureFlagNames = Arrays.asList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
Map<String, SplitResult> treatments = client.getTreatmentsWithConfig("KEY", featureFlagNames, attributes);

// getTreatmentsWithConfigByFlagSet
Map<String, SplitResult> treatmentsBySet = client.getTreatmentsWithConfigByFlagSet("KEY", "backend");

// getTreatmentsWithConfigByFlagSets
List<String> flagSetNames = Arrays.asList("backend", "server_side");
Map<String, SplitResult> treatmentsBySets = client.getTreatmentsWithConfigByFlagSets("KEY", flagSetNames);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// getTreatmentsWithConfig
val featureFlagNames = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val treatments: Map<String, SplitResult> = client.getTreatmentsWithConfig("KEY", featureFlagNames)

// getTreatmentsWithConfigByFlagSet
val treatmentsBySet: Map<String, SplitResult> = client.getTreatmentsWithConfigByFlagSet("KEY", "backend")

// getTreatmentsWithConfigByFlagSets
val flagSetNames = listOf("backend", "server_side")
val treatmentsBySets: Map<String, SplitResult> = client.getTreatmentsWithConfigByFlagSets("KEY", flagSetNames)
```

</TabItem>
</Tabs>

### Append properties to impressions

[Impressions](/docs/feature-management-experimentation/feature-management/monitoring-analysis/impressions) are generated by the SDK each time a `getTreatment` method is called. These impressions are periodically sent back to Harness servers for feature monitoring and experimentation.

You can append properties to an impression by passing an object of key-value pairs to the `getTreatment` method. These properties are then included in the impression sent by the SDK and can provide useful context to the impression data.

Three types of properties are supported: strings, numbers, and booleans.

```java title="Java"
EvaluationOptions evaluationOptions = new EvaluationOptions(new HashMap<String, Object>() {{ put("prop1", "val1"); }});

String treatment = client.getTreatment("key", "FEATURE_FLAG_NAME", evaluationOptions);
```

### Shutdown

Make sure to call `.destroy()` before letting a process using the SDK exit as it gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions and events. The Java SDK specifically subscribes to the JVM shutdown hook (SIGTERM signal) which in normal circumstances is invoked automatically by the JVM during a shutdown process. This means that on a graceful shutdown of the server, the client will automatically call destroy() and will flush the buffers and release the resources.

In cases where you don't want our SDK to automatically destroy on shutdown, you can use the config: `disableDestroyOnShutDown()` (example usage in the [Configuration](#configuration) section below) and set it to `true`. If you do this, the SDK ignores any signals like SIGTERM and it is your responsibility to properly call destroy at the right time. If a manual shutdown is required, you can then call:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
client.destroy();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
client.destroy()
```

</TabItem>
</Tabs>

After `destroy()` is called, any subsequent invocations to `client.getTreatment()` or manager methods result in `control` or empty list, respectively.

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users' actions and metrics.

Refer to the [Events](/docs/feature-management-experimentation/release-monitoring/events/) guide for more information about using track events in feature flags.

In the examples below you can see that the `.track()` method can take up to five arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `getTreatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value used in creating the metric. This field can be sent in as null or 0 if you intend to only use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) A map of key value pairs that can filter your metrics. To learn more about event property capture, refer to the [Events property capture](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK successfully queued the event to be sent back to Harness servers on the next event post. The SDK returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method is provided.

In the case that a bad input has been provided, you can read more about our SDK's expected behavior in our [Events](/docs/feature-management-experimentation/release-monitoring/events/) guide.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// If you would like to send an event without a value
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
boolean trackEvent = client.track("john@doe.com", "user", "page_load_time");

// If you would like to associate a value to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example
boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", 83.334);

// If you would like to associate a value and properties to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES});
// Example
HashMap<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);

boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", 83.334, properties);

// If you would like to associate just properties to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", {PROPERTIES});
// Example
HashMap<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);

boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", properties);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// If you would like to send an event without a value
val trackEvent: Boolean = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE")
// Example
val trackEvent: Boolean = client.track("john@doe.com", "user", "page_load_time")

// If you would like to associate a value to an event
val trackEvent: Boolean = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE)
// Example
val trackEvent: Boolean = client.track("john@doe.com", "user", "page_load_time", 83.334)

// If you would like to associate a value and properties to an event
val trackEvent: Boolean = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES})
// Example
val properties = mapOf("package" to "premium",
                                    "admin" to true,
                                    "discount" to 50)

val trackEvent: Boolean = client.track("john@doe.com", "user", "page_load_time", 83.334, properties)

// If you would like to associate just properties to an event
val trackEvent: Boolean = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", {PROPERTIES})
// Example
val properties = mapOf("package" to "premium",
                                    "admin" to true,
                                    "discount" to 50)

val trackEvent: Boolean = client.track("john@doe.com", "user", "page_load_time", properties)
```

</TabItem>
</Tabs>

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| featuresRefreshRate | The SDK polls Harness servers for changes to feature rollout plans. This parameter controls this polling period in seconds. | 60 seconds |
| segmentsRefreshRate  | The SDK polls Harness servers for changes to segments at this rate (in seconds). | 60 seconds |
| impressionsRefreshRate  | The treatment log captures which customer saw what treatment (on, off, etc.) at what time. This log is periodically flushed back to Harness servers. This configuration controls how quickly the cache expires after a write (in seconds). | 60 seconds |
| telemetryRefreshRate  | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds |
| eventsQueueSize  | When using `.track`, the number of events to be kept in memory. | 500 |
| eventFlushIntervalInMillis  | When using `.track`, how often (in milliseconds) the events queue is flushed to Harness servers. | 30000 ms |
| connectionTimeout | HTTP client connection timeout (in ms). | 15000ms |
| readTimeout | HTTP socket read timeout (in ms). | 15000ms |
| setBlockUntilReadyTimeout | If specified, the client building process blocks until the SDK is ready to serve traffic or the specified time has elapsed. If the SDK is not ready within the specified time, a `TimeOutException` is thrown (in ms). | 0ms |
| impressionsQueueSize | Default queue size for impressions. | 30K |
| disableLabels | Disable labels from being sent to Harness servers. Labels may contain sensitive information. | enabled |
| disableIPAddress | Disable sending IP Address & hostname to the backend. | enabled |
| proxyHost | The location of the proxy. | localhost |
| proxyPort | The port of the proxy. | -1 (not set) |
| proxyUsername  | Username to authenticate against the proxy server. | null |
| proxyPassword  | Password to authenticate against the proxy server. | null |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK falls back to the polling mechanism. If false, the SDK polls for changes as usual without attempting to use streaming. | true |
| impressionsMode | Defines how impressions are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG.  In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, all impressions are queued and sent to Harness; this is useful for validations. Use DEBUG mode when you want every impression to be logged in Harness FME when trying to debug your SDK setup.  This setting does not impact the impression listener which receives all generated impressions locally. | OPTIMIZED |
| operationMode | Defines how the SDK synchronizes its data. Two operation modes are currently supported: <br />- STANDALONE. <br />- CONSUMER| STANDALONE |
| storageMode | Defines what kind of storage the SDK is going to use. With MEMORY, the SDK uses its own storage and runs as STANDALONE mode. Set REDIS mode if you want the SDK to run with this implementation as CONSUMER mode. | MEMORY |
| flagSetsFilter | This setting allows the SDK to only synchronize the feature flags in the specified flag sets, avoiding unused or unwanted flags from being synced on the SDK instance, bringing all the benefits from a reduced payload. | null |
| threadFactory | Defines what kind of thread the SDK is going to use. Allows the SDK to use Virtual Threads. | null |
| inputStream | This setting allows the SDK supports InputStream to use localhost inside a JAR. | null |
| FileTypeEnum | Defines which kind of file is going to be the inputStream. Supported files are YAML and JSON for inputStream. | null |

To set each of the parameters defined above, use the following syntax:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

SplitClientConfig config = SplitClientConfig.builder()
                            .impressionsRefreshRate(60)
                            .connectionTimeout(15000)
                            .readTimeout(15000)
                            .enableDebug()
                            .setBlockUntilReadyTimeout(10000)
                            .flagSetsFilter(Arrays.asList("backend", "server_side"))
                            .build();

SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY",config);
SplitClient client = splitFactory.client();
client.blockUntilReady();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

val config: SplitClientConfig = SplitClientConfig.builder()
            .impressionsRefreshRate(60)
            .connectionTimeout(15000)
            .readTimeout(15000)
            .enableDebug()
            .setBlockUntilReadyTimeout(10000)
            .flagSetsFilter(Arrays.asList("backend", "server_side"))
            .build()

val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY", config)
val client: SplitClient = splitFactory.client()
client.blockUntilReady()
```

</TabItem>
</Tabs>

## Connecting to a Split Proxy instance

The SDK can connect to a Split Proxy instance as though it was connecting to our CDN, and the Proxy synchronizes the data and writes impressions and events back to Harness FME servers. Be sure to install the Split Proxy by following the steps in [Split Proxy guide](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy).

Use the `.endpoint()` property in the SplitClientConfig builder object to point the Java SDK to the Synchronizer, making sure to use the same port specified in the Proxy command line. When creating the `SplitFactory` object, use the custom API key specified in the `client-apikeys` parameter for the Proxy. The Proxy uses the SDK key when connecting to Harness FME servers. Refer to the following code example to connect to a Proxy instance:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

public class SplitSD {
    public static void main(String[] args) {
      SplitClientConfig config = SplitClientConfig.builder()
           .setBlockUntilReadyTimeout(10000)
           .endpoint("https://myproxy.com","https://myproxy.com")
           .authServiceURL("https://myproxy.com" + "/api/auth")
           .telemetryURL("https://myproxy.com" + "/api/v1")
           .build();
      SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY", config);
      SplitClient client = splitFactory.client();
      try {
        client.blockUntilReady()
        String treatment = client.getTreatment("user10","sample_feature_flag");
        if (treatment.equals("on")) {
          System.out.print("Treatment is on");
        } else if (treatment.equals("off")) {
          System.out.print("Treatment is off");
        } else {
          System.out.print("SDK Not ready");
        }
      } catch (Exception e) {
          System.out.print("Exception: "+e.getMessage());
      }
    }
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.SplitFactoryBuilder
import io.split.client.SplitClient
import io.split.client.SplitClientConfig
import io.split.client.SplitFactory

fun main (args: Array<String>){
    val config: SplitClientConfig = SplitClientConfig.builder()
                .setBlockUntilReadyTimeout(10000)
                .endpoint("https://myproxy.com","https://myproxy.com")
                .authServiceURL("https://myproxy.com" + "/api/auth")
                .telemetryURL("https://myproxy.com" + "/api/v1")
                .build()
    val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY", config)
    val client: SplitClient = splitFactory.client()
    try {
        client.blockUntilReady()
        val treatment = client.getTreatment("key", "FEATURE_FLAG_NAME", attributes)
        when (treatment) {
            "on" -> {
                println("Treatment is on")
            }
            "off" -> {
                println("Treatment is off")
            }
            else -> {
                println("SDK Not ready")
            }
        }
    } catch (e: Exception) {
        println("Exception: " + e.message)
    }
}
```

</TabItem>
</Tabs>

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (aka off-the-grid mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the features. To use the SDK in localhost mode, you must replace the API Key with "localhost" value.

With this mode, you can instantiate the SDKS using one of the following methods:

* JSON: Full support, for advanced cases or replicating an environment by pulling rules from Harness FME servers (from version `4.7.0`).
* YAML: Supports dynamic configs, individual targets and default rules (from version `3.1.0`).
* .split: Legacy option, only treatment result.

### JSON

Since version `4.7.0`, our SDK supports localhost mode by using the JSON format. This version allows the user to map feature flags and segment definitions in the same format as the APIs receive the data.

This new mode needs extra configuration to be set

| **Name** | **Description** | **Type** |
| --- | --- | --- |
| splitFile | Indicates the path of the feature flags file location to read | String |
| segmentDirectory | Indicates the path where all the segment files are located | String |
| localhostRefreshEnabled | Flag to run synchronization refresh for feature flags and segments in localhost mode. | Boolean |

#### splitFile

The following splitFile is a JSON that represents a SplitChange:

<Tabs>
<TabItem value="Java SplitChange Schema">

```java
public class SplitChange {
    public List<Split> splits;
    public long since;
    public long till;
}
```

</TabItem>
<TabItem value="Java Split Schema">

```java
public class Split {
    public String name;
    public int seed;
    public Status status;
    public boolean killed;
    public String defaultTreatment;
    public List<Condition> conditions;
    public String trafficTypeName;
    public long changeNumber;
    public Integer trafficAllocation;
    public Integer trafficAllocationSeed;
    public int algo;
    public Map<String, String> configurations;
}
```

</TabItem>
<TabItem value="Kotlin SplitChange Schema">

```kotlin
class Split(
    var splits: List<Split>?,
    var since: Long?,
    var till: Long?,
)
```

</TabItem>
<TabItem value="Kotlin Split Schema">

```kotlin
class Split(
    var name: String?,
    var seed: Int?,
    var status: Status?,
    var killed: Boolean?,
    var defaultTreatment: String?,
    var conditions: List<Condition>?,
    var trafficTypeName: String?,
    var changeNumber: Long?,
    var trafficAllocation: Int?,
    var trafficAllocationSeed: Int?,
    var algo: Int?,
    configurations: Map<String, String>?
)
```

</TabItem>
<TabItem value="JSON example">

```json
{
  "splits": [
    {
      "trafficTypeName": "user",
      "name": "feature_flag_1",
      "trafficAllocation": 100,
      "trafficAllocationSeed": -1364119282,
      "seed": -605938843,
      "status": "ACTIVE",
      "killed": false,
      "defaultTreatment": "off",
      "changeNumber": 1660326991072,
      "algo": 2,
      "configurations": {},
      "conditions": [
        {
          "conditionType": "ROLLOUT",
          "matcherGroup": {
            "combiner": "AND",
            "matchers": [
              {
                "keySelector": {
                  "trafficType": "user",
                  "attribute": null
                },
                "matcherType": "IN_SEGMENT",
                "negate": false,
                "userDefinedSegmentMatcherData": {
                  "segmentName": "segment_1"
                },
                "whitelistMatcherData": null,
                "unaryNumericMatcherData": null,
                "betweenMatcherData": null,
                "booleanMatcherData": null,
                "dependencyMatcherData": null,
                "stringMatcherData": null
              }
            ]
          },
          "partitions": [
            {
              "treatment": "on",
              "size": 0
            },
            {
              "treatment": "off",
              "size": 100
            }
          ],
          "label": "in segment segment_1"
        },
        {
          "conditionType": "ROLLOUT",
          "matcherGroup": {
            "combiner": "AND",
            "matchers": [
              {
                "keySelector": {
                  "trafficType": "user",
                  "attribute": null
                },
                "matcherType": "ALL_KEYS",
                "negate": false,
                "userDefinedSegmentMatcherData": null,
                "whitelistMatcherData": null,
                "unaryNumericMatcherData": null,
                "betweenMatcherData": null,
                "booleanMatcherData": null,
                "dependencyMatcherData": null,
                "stringMatcherData": null
              }
            ]
          },
          "partitions": [
            {
              "treatment": "on",
              "size": 50
            },
            {
              "treatment": "off",
              "size": 50
            }
          ],
          "label": "default rule"
        }
      ]
    }
  ],
  "since": -1,
  "till": 1660326991072
}
```

</TabItem>
</Tabs>

#### segmentDirectory

The provided segment directory must have the json files of the corresponding segment linked to previous feature flag definitions. According to the file sample above: `feature_flag_1` has `segment_1` linked. That means that the segmentDirectory needs to have `segment_1` definition.

<Tabs>
<TabItem value="Java SegmentChange Schema">

```java
public class SegmentChange {
    public String id;
    public String name;
    public List<String> added;
    public List<String> removed;
    public long since;
    public long till;
}
```

</TabItem>
<TabItem value="Kotlin SegmentChange Schema">

```kotlin
class SegmentChange(
    var id: String,
    var name: String,
    var added: List<String>,
    var removed: List<String>,
    var since: Long,
    var till: Long
)
```

</TabItem>
<TabItem value="JSON example">

```json
{
  "name": "segment_1",
  "added": [
    "example1",
    "example2"
  ],
  "removed": [],
  "since": -1,
  "till": 1585948850110
}
```

</TabItem>
</Tabs>

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java Init example">

```java
SplitClientConfig config = SplitClientConfig.builder()
       .splitFile("parentRoot/featureFlags.json")
       .segmentDirectory("parentRoot/segments")
       .setBlockUntilReadyTimeout(10000)
       .build();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin Init example">

```kotlin
val config: SplitClientConfig = SplitClientConfig.builder()
                .splitFile("parentRoot/featureFlags.json")
                .segmentDirectory("parentRoot/segments")
                .setBlockUntilReadyTimeout(10000)
                .build()
```

</TabItem>
</Tabs>

### YAML

Since version `3.1.0`, our SDK supports a type of localhost feature flag definition file that uses the YAML format. This new format allows the user to map different keys to different treatments within a single feature flag and also add configurations to them. The format is a list of single-key maps (one per mapping feature-flag-keys-config) which is defined as follows:

<Tabs>
<TabItem value="YAML">

```yaml
## - feature_name:
##     treatment: "treatment_applied_to_this_entry"
##     keys: "single_key_or_list"
##     config: "{\"desc\" : \"this applies only to ON treatment\"}"

- my_feature_flag:
    treatment: "on"
    keys: "key"
    config: "{\"desc\" : \"this applies only to ON treatment\"}"
- some_other_feature_flag:
    treatment: "off"
- my_feature_flag:
    treatment: "off"
- other_feature_flag:
    treatment: "off"
    keys: ["key_1", "key_2"]
    config: "{\"desc\" : \"this overrides multiple keys and returns off treatment for those keys\"}"
```

</TabItem>
</Tabs>

In the example above, we have four entries:

 * The first entry defines that for feature flag `my_feature_flag`, the key `key` returns the treatment `on` and the `on` treatment is tied to the configuration `{"desc" : "this applies only to ON treatment"}`.
 * The second entry defines that the feature flag `some_other_feature_flag` always returns the `off` treatment and no configuration.
 * The third entry defines that `my_feature_flag` always returns `off` for all keys that don't match another entry (in this case, any key other than `key`).
 * The fourth entry shows how an example overrides a treatment for a set of keys.

Use the SplitConfigBuilder object to set the location of the localhost YAML file as shown in the example below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java Init example">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactoryBuilder;

SplitClientConfig config = SplitClientConfig.builder()
       .splitFile("parentRoot/split.yaml")
       .setBlockUntilReadyTimeout(10000)
       .build();
SplitClient client = SplitFactoryBuilder.build("localhost", config).client();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin Init example">

```kotlin
import io.split.client.SplitFactoryBuilder
import io.split.client.SplitClient
import io.split.client.SplitClientConfig

val config: SplitClientConfig = SplitClientConfig.builder()
            .splitFile("parentRoot/split.yaml")
            .setBlockUntilReadyTimeout(10000)
            .build()
val client: SplitClient = SplitFactoryBuilder.build("localhost", config).client()
```

</TabItem>
</Tabs>

### .SPLIT file

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitClientConfig config = SplitClientConfig.builder().setBlockUntilReadyTimeout(10000).build();
SplitFactory splitFactory = SplitFactoryBuilder.build("localhost", config);
SplitClient client = splitFactory.client();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config: SplitClientConfig = SplitClientConfig.builder().setBlockUntilReadyTimeout(10000).build()
val splitFactory: SplitFactory = SplitFactoryBuilder.build("localhost", config)
val client: SplitClient = splitFactory.client()
```

</TabItem>
</Tabs>

In this mode, the SDK loads a mapping of feature flag name to treatment from a file at `$HOME/.split`. For a given flag, the treatment specified in the file is returned for every customer.

`getTreatment` calls for a feature flag and only returns the one treatment that you defined in the file. You can then change the treatment as necessary for your testing in the file. Any feature that is not provided in the `features` map returns [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if the SDK is asked to evaluate them.

The format of this file is two columns separated by a whitespace. The left column is the feature flag name and the right column is the treatment name. The following is a sample `.split` file:

```bash title="Shell"
reporting_v2 on ## sdk.getTreatment(*, reporting_v2) will return 'on'

double_writes_to_cassandra off

new-navigation v3
```

### Input Stream

Since version `4.9.0`, the SDK supports InputStream to use localhost inside a JAR. To achieve this, we added new parameters in splitFile property to set the InputStream. The first param is an InputStream of the file that we want to read. And the second is a FileTypeEnum which can be either `YAML`, or `JSON`. Here is an example code to demonstrate how to use this new feature:

<Tabs>
<TabItem value="YAML">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactoryBuilder;
import io.split.client.utils.FileTypeEnum;

import java.io.FileInputStream;
import java.io.InputStream;

InputStream inputStream = new FileInputStream("parentRoot/split.yaml");
SplitClientConfig config = SplitClientConfig.builder()
       .splitFile(inputStream, FileTypeEnum.YAML)
       .setBlockUntilReadyTimeout(10000)
       .build();
SplitClient client = SplitFactoryBuilder.build("localhost", config).client();
```

</TabItem>
<TabItem value="JSON">

```java
import io.split.client.SplitFactoryBuilder;
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.utils.FileTypeEnum;

import java.io.FileInputStream;
import java.io.InputStream;

InputStream inputStream = new FileInputStream("parentRoot/split.json");
SplitClientConfig config = SplitClientConfig.builder()
       .splitFile(inputStream, FileTypeEnum.JSON)
       .setBlockUntilReadyTimeout(10000)
       .build();
SplitClient client = SplitFactoryBuilder.build("localhost", config).client();
```

</TabItem>
<TabItem value="Kotlin example">

```kotlin
import io.split.client.SplitFactoryBuilder
import io.split.client.SplitClient
import io.split.client.SplitClientConfig
import io.split.client.utils.FileTypeEnum

import java.io.FileInputStream
import java.io.InputStream

val inputStream = new FileInputStream("parentRoot/split.json");
val config: SplitClientConfig = SplitClientConfig.builder()
            .splitFile(inputStream, FileTypeEnum.JSON)
            .setBlockUntilReadyTimeout(10000)
            .build()
val client: SplitClient = SplitFactoryBuilder.build("localhost", config).client()
```

</TabItem>
</Tabs>

## State Sharing: Redis Integration

Before you get started with the cache, download the correct version of Redis to your machine. Make sure to start your Redis server. Refer to the [Redis documentation](https://redis.io/topics/quickstart) for help. After that, followi the additional three steps to set up the cache with Redis.

#### 1. Install the Redis Wrapper into your project

Import the Redis Wrapper into your project using one of the two methods below:

<Tabs>
<TabItem value="Maven">

```java
<dependency>
    <groupId>io.split.client</groupId>
    <artifactId>redis-wrapper</artifactId>
    <version>3.1.1</version>
</dependency>
```

</TabItem>
<TabItem value="Gradle">

```java
compile 'io.split.client:redis-wrapper:1.0.0'
```

</TabItem>
</Tabs>

#### 2. Set up the Split Synchronizer

 Set up the [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) to sync data to a Redis cache. Once you set up the synchronizer, go to the following step #3 to instantiate:

#### 3. Instantiate the SDK factory client with Redis enabled

To run the SDK with Redis, you need to provide the Redis storage wrapper. Refer to the following to provide the wrapper:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Building the Redis storage wrapper with some configurations of choice.
CustomStorageWrapper redis = RedisInstance.builder()
				.host("localhost")
				.port(6379)
				.timeout(1000)
				.database(0)
				.prefix("java")
				.build();
// Building the SDK config with the Redis wrapper referenced.
SplitClientConfig splitConfig = SplitClientConfig.builder()
                        .customStorageWrapper(redis)
                        .operationMode(OperationMode.CONSUMER)
                        .storageMode(StorageMode.REDIS)
                        .build();
// Then just build the factory as usual.
SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_API_KEY", config);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Building the Redis storage wrapper with some configurations of choice.
val redis: CustomStorageWrapper = RedisInstance.builder()
        .host("localhost")
        .port(6379)
        .timeout(1000)
        .database(0)
        .prefix("java")
        .build()
// Building the SDK config with the Redis wrapper referenced.
val splitConfig: SplitClientConfig = SplitClientConfig.builder()
                .customStorageWrapper(redis)
                .operationMode(OperationMode.CONSUMER)
                .storageMode(StorageMode.REDIS)
                .build()
// Then just build the factory as usual.
val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_API_KEY", config)
```

</TabItem>
</Tabs>

#### Redis wrapper configuration

When you create a new instance for the Redis wrapper, you can provide your own configurations for some values.

| **Field name(s)** | **Description** | **Default value** |
| --- | --- | --- |
| timeout| Timeout that the connections is going to handle. | 1000 |
| host | Hostname where the Redis instance is. | localhost  |
| port | HTTP port used in the connection. | 6379  |
| database | Numeric database to be used. | 0 |
| user | Redis cluster user. Leave empty if no User is used. | ""  |
| password | Redis cluster password. Leave empty if no password is used. | "" |
| prefix | Best practice is to use a prefix in case the Redis instance is shared by many SDKs. | "" |
| jedisPool| You can provide your own implementation of JedisPool. | null |
| maxTotal| Max number of pool connections. | 8 |

#### Redis cluster support

The SDK supports Redis with Cluster. Note that a stable release of Cluster has shipped since Redis 3.0. For further information about Redis Cluster, refer to the [Cluster documentation](https://redis.io/topics/cluster-spec).

Use the following configuration for Redis in Cluster mode.

| **Variable** | **Type** | **Description** |
| --- | --- | --- |
| clusterNodes | Set\<HostAndPort\> | The list of cluster nodes. |
| jedis | JedisCluster | Jedis contains the list of cluster nodes. |
| keyHashTag | string | Custom hashtag to be used. |

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// Building the Redis storage wrapper with some configurations of choice.
Set<HostAndPort> jedisClusterNodes = new HashSet<HostAndPort>();
jedisClusterNodes.add(new HostAndPort("cluster-node1", 6071));
jedisClusterNodes.add(new HostAndPort("cluster-node2", 6072));
jedisClusterNodes.add(new HostAndPort("cluster-node3", 6073));
JedisCluster jedis = new JedisCluster(jedisClusterNodes);
CustomStorageWrapper redis = RedisInstance.builder()
                              .jedisCluster(jedis)
                              .hashtag("{SPLITIO}")
                              .prefix("java:")
                              .build();
SplitClientConfig config = SplitClientConfig.builder()
                            .customStorageWrapper(redis)
                            .operationMode(OperationMode.CONSUMER)
                            .storageMode(StorageMode.REDIS)
                            .setBlockUntilReadyTimeout(10000)
                            .enableDebug()
                            .build();
SplitFactory splitFactory =  SplitFactoryBuilder.build("apikey", config);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Building the Redis storage wrapper with some configurations of choice.
val jedisClusterNodes = setOf<HostAndPort>(
                                HostAndPort("cluster-node1", 6071),
                                HostAndPort("cluster-node2", 6072),
                                HostAndPort("cluster-node3", 6073))
        val jedis = JedisCluster(jedisClusterNodes)
        val redis: CustomStorageWrapper = RedisInstance.builder()
            .jedisCluster(jedis)
            .hashtag("{SPLITIO}")
            .prefix("java:")
            .build();
        val splitConfig: SplitClientConfig = SplitClientConfig.builder()
            .customStorageWrapper(redis)
            .operationMode(OperationMode.CONSUMER)
            .storageMode(StorageMode.REDIS)
            .build()
val splitFactory: SplitFactory = SplitFactoryBuilder.build("apikey", config)
```

</TabItem>
</Tabs>

:::info[Redis Cluster]
The Java SDK performs multi-key operations in certain methods such as `mget` (to return values of all specified keys) or `keys` (to return all the keys that matches a particular pattern) to avoid multiple calls to Redis. Redis Cluster does not allow these operations unless you use hashtags. Hashtags ensure that multiple keys are allocated in the same hash slot. The SDK allows you to use a custom key hashtag for storing keys. If this option is missing, it uses a default hashtag of `{SPLITIO}` when `cluster` mode is specified in the configuration. Keep in mind that multi-key operations may become unavailable during a resharding of the hash slots, calls to `getTreatments`, or `manager.splitNames()`, causing `splitKeys` to fail.
:::

## Manager

Use the Split Manager to get a list of features available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY");
SplitManager manager = splitFactory.manager();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY")
val manager: SplitManager = splitFactory.manager()
```

</TabItem>
</Tabs>

The Manager then has the following methods available:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java Manager interface">

```java
/**
 * Retrieves the feature flags that are currently registered with the
 * SDK.
 *
 * @return a List of SplitView or empty.
 */
List<SplitView> splits();

/**
 * Returns the feature flags registered with the SDK of this name.
 *
 * @return SplitView or null
 */
SplitView split(String SplitName);

/**
 * Returns the feature flag names registered with the SDK.
 *
 * @return a List of String containing feature flag names or empty
 */
List<String> splitNames();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin Manager interface">

```kotlin
/**
* Retrieves the feature flags that are currently registered with the
* SDK.
*/
fun splits(): List<SplitView>

/**
* Returns the feature flags registered with the SDK of this name.
*/
fun split(SplitName: String): SplitView

/**
* Returns the feature flag names registered with the SDK.
*/
fun splitNames(): List<String>

```

</TabItem>
</Tabs>

The `SplitView` object that you see referenced above has the following structure:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java SplitView">

```java
public class SplitView {
    public String name;
    public String trafficType;
    public boolean killed;
    public List<String> treatments;
    public long changeNumber;
    public Map<String, String> configs;
    public List<String> sets;
    public String defaultTreatment;
    public boolean impressionsDisabled;
    public List<Prerequisites> prerequisites;
}
```

</TabItem>
<TabItem value="java-prerequisites" label="Java Prerequisites">

```java
public class Prerequisites {
    public String featureFlagName;
    public List<String> treatments;
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin SplitView">

```kotlin
class SplitView(
    var name: String?,
    var trafficType: String?,
    var killed: Boolean,
    var treatments: List<String>?,
    var changeNumber: Long,
    var sets: List<String>?,
    var defaultTreatment: String?,
    var impressionsDisabled: boolean,
    var prerequisites: List<Prerequisites>
)
```

</TabItem>
</Tabs>

## Listener

FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*.

The SDK sends the generated impressions to the impression listener immediately. As a result, be careful while implementing handling logic to avoid blocking the main thread. As the second parameter, specify the size of the queue acting as a buffer (see the snippet below).

If the impression listener is slow at processing the incoming data, the queue fills up and any subsequent impressions are dropped.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitClientConfig config = SplitClientConfig.builder()
    .integrations(
            IntegrationsConfig.builder()
                    .impressionsListener(new MyImpressionListener(), 500)
                    .build())
    .build();

SplitFactoryBuilder.build("YOUR_SDK_KEY", config).client();


// Custom Impression listener class
static class MyImpressionListener implements ImpressionListener {

  @Override
  public void log(Impression impression) {
      // Send this data somewhere. Printing to console for now.
      System.out.println(impression);
  }

  @Override
  public void close() {
      // Do something
  }
}
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config: SplitClientConfig = SplitClientConfig.builder()
            .integrations(
                IntegrationsConfig.builder()
                    .impressionsListener(MyImpressionListener(), 500)
                    .build())
            .build()
SplitFactoryBuilder.build("YOUR_SDK_KEY", config).client()

// Custom Impression listener class
class MyImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Send this data somewhere. Printing to console for now.
        println(impression);
    }
    override fun close() {
        // Do something
    }
}
```

</TabItem>
</Tabs>

## Logging

The Java SDK uses slf4j-api for logging. If you do not provide an implementation for slf4j, you see the following error in your logs:

<Tabs>
<TabItem value="Text">

```java
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```

</TabItem>
</Tabs>

You can get the SDK to log by providing a concrete implementation for SLF4J. For instance, if you are using log4j, you should import the following dependency.

<Tabs>
<TabItem value="pom.xml">

```java
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.7.21</version>
</dependency>
```

</TabItem>
</Tabs>

If you have a log4j.properties in your classpath, the SDK log is visible. The following is an example of log4j.properties entry:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
log4j.rootLogger=DEBUG, A1
log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%-4r [%t] %-5p %c %x - %m%n
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
log4j.rootLogger=DEBUG, A1
log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%-4r [%t] %-5p %c %x - %m%n
```

</TabItem>
</Tabs>

The following is an example of initializing the logger object in Java:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SplitSD {

	final static Logger logger = LoggerFactory.getLogger(SplitSD.class);
	public static void main(String[] args) {
		SplitClientConfig config = SplitClientConfig.builder()
				   .setBlockUntilReadyTimeout(10000)
				   .enableDebug()
				   .build();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;
import org.slf4j.LoggerFactory

class SplitSD {
    inline fun <reified T:Any> logger() = LoggerFactory.getLogger(T::class.java)
}
```

</TabItem>
</Tabs>

## Thread Factory

Since version `4.10.0`, the Java SDK provides support for Virtual Threads using the config threadFactory, instead of traditional threads. Below is an example of how to set it up:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

import java.util.concurrent.ThreadFactory;

ThreadFactory virtualThreadFactory = Thread.ofVirtual().factory();
SplitClientConfig config = SplitClientConfig.builder()
                            .setBlockUntilReadyTimeout(10000)
                            .threadFactory(virtualThreadFactory)
                            .build();

SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY",config);
SplitClient client = splitFactory.client();
client.blockUntilReady();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactory;
import io.split.client.SplitFactoryBuilder;

val virtualThreadFactory = Thread.ofVirtual().factory();
val config: SplitClientConfig = SplitClientConfig.builder()
            .setBlockUntilReadyTimeout(10000)
            .threadFactory(virtualThreadFactory)
            .build()

val splitFactory: SplitFactory = SplitFactoryBuilder.build("YOUR_SDK_KEY", config)
val client: SplitClient = splitFactory.client()
client.blockUntilReady()
```

</TabItem>
</Tabs>

## Integrations

### New Relic

The New Relic integration annotates New Relic transactions with FME feature flags information that can be used to correlate application metrics with feature flag changes. This integration is implemented as a synchronous impression listener and it can be enabled as shown below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitClientConfig config = SplitClientConfig.builder()
    .integrations(
            IntegrationsConfig.builder()
                    .newRelicImpressionListener()
                    .build())
    .build();

SplitFactoryBuilder.build("YOUR_SDK_KEY", config).client();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config: SplitClientConfig = SplitClientConfig.builder()
            .integrations(
                IntegrationsConfig.builder()
                    .newRelicImpressionListener()
                    .build())
            .build()

SplitFactoryBuilder.build("YOUR_SDK_KEY", config).client()
```

</TabItem>
</Tabs>

This integration is only enabled if the SDK detects the New Relic agent in the classpath. If the agent is not detected, the following error will be displayed in the logs (if logging is enabled):
```
WARN [main] (IntegrationsConfig.java:72) - New Relic agent not found. Continuing without it
```

## Network proxy

If you need to use a network proxy, you can configure proxies by setting the `proxyHost` and `proxyPort` options in the SDK configuration (refer [Configuration](#configuration) section for more information). The SDK reads those variables and uses them to perform the server request.

## Advanced: WebLogic container

WebLogic and the Java SDK contain a reference to Google Guava. If you are currently deploying a web application that contains our Java SDK into WebLogic, instruct the container to load Guava from the app classpath and not from the container.

If you have an existing **weblogic.xml** file in your deployment, add: `<package-name>com.google.common.*</package-name>` under the `<prefer-application-packages>` tag. If you do not, create the file and place it under the directory `WEB-INF`.

Here is a sample of a **weblogic.xml** file that includes the previously mentioned Guava classpath loading instruction.

<Tabs>
<TabItem value="weblogic.xml">

```java
<?xml version="1.0" encoding="UTF-8"?>
<weblogic-web-app xmlns="http://xmlns.oracle.com/weblogic/weblogic-web-app">
  <context-root>/testing-java</context-root>
  <container-descriptor>
    <prefer-web-inf-classes>false</prefer-web-inf-classes>
    <prefer-application-packages>
      <package-name>com.google.common.*</package-name>
    </prefer-application-packages>

  </container-descriptor>
</weblogic-web-app>
```

</TabItem>
</Tabs>

## Troubleshooting

### Timeout Error: NoSuchMethodError: com.google.common.collect.Multisets.removeOccurrences

Using the Java SDK within certain frameworks, the SDK always times out. The logs show the following error:

```swift
2602 [split-splitFetcher-0] ERROR io.split.engine.experiments.RefreshableSplitFetcher  - RefreshableSplitFetcher failed: com.google.common.collect.Multisets.removeOccurrences(Lcom/google/common/collect/Multiset;Ljava/lang/Iterable;)Z
...
java.lang.NoSuchMethodError: com.google.common.collect.Multisets.removeOccurrences(Lcom/google/common/collect/Multiset;Ljava/lang/Iterable;)Z
```

This error happens because the Java SDK depends on the Google Guava library version 19.0 or higher. If your framework uses an older Guava version (< 19.0), this method will be missing, causing the error.

Upgrade the Google Guava dependency in your project to version 19.0 or above to resolve this issue.

### How to change log level in the Java SDK

When integrating the Java SDK into a framework that uses Log4J, the SDK outputs many debug lines. Is it possible to change the log level?

Yes. The Java SDK respects the `log4j.properties` configuration file used by your Java application. To reduce logging verbosity and set the log level to `ERROR`, add these lines to your `log4j.properties` file: 

```
log4j.logger.split.org.apache = ERROR
log4j.logger.io.split = ERROR
```

This will suppress debug and info logs from the SDK, showing only error messages.

### Error using JRE 6.x: "fatal alert: handshake_failure"

Using the Java SDK with JDK 1.6 (JRE 6.x), you may encounter the following SSL connection error when trying to connect to split.io:

```yaml
.RECV TLSv1 ALERT: fatal, handshake_failure

handling exception: javax.net.ssl.SSLHandshakeException: Received fatal alert: handshake_failure
```

Java 1.6 supports TLSv1 but does not support the high-strength ciphers required by split.io’s security protocol.

To fix this issue, you have two options:

1. Upgrade your JDK to version 1.7 or above. These versions include support for the stronger ciphers by default.
1. If upgrading is not an option, install the Java Cryptography Extension (JCE) provided by your JVM vendor for Java 6 to enable support for high-strength ciphers.

### Exception: PKIX path building failed

When initializing the Java SDK `SplitFactory` object, you may see the following error:

```yaml
RefreshableSplitFetcher failed: 
Problem fetching splitChanges:
sun.security.validator.ValidatorException: 
PKIX path building failed:
sun.security.provider.certpath.SunCertPathBuilderException:
unable to find valid certification path to requested target
```

This indicates that Java could not verify the SSL certificate from Split.io, preventing a secure connection between the SDK and Harness FME servers.

Manually install Split.io's certificates into your JVM’s trust store:

1. Download the certificates for both `sdk.split.io` and `events.split.io`:

   ```bash
   openssl s_client -showcerts -connect sdk.split.io:443 </dev/null 2>/dev/null | openssl x509 -outform PEM > splitsdkcert.pem
   openssl s_client -showcerts -connect events.split.io:443 </dev/null 2>/dev/null | openssl x509 -outform PEM > spliteventscert.pem
   ```

1. Import the certificates into the Java `cacerts` keystore (replace `[JAVA_HOME]` with your Java installation path):

   ```bash
   keytool -importcert -file splitsdkcert.pem -keystore [JAVA_HOME]/lib/security/cacerts -alias "splitsdkcert"
   keytool -importcert -file spliteventscert.pem -keystore [JAVA_HOME]/lib/security/cacerts -alias "spliteventscert"
   ```

1. Restart your Java application.

#### Certificate renewals

Harness FME relies on Split.io's managed certificates for secure SDK communication. When Split.io rotates or renews its certificates, your application should continue working if:

* Your JVM's default trust store already contains the required certificate authorities (most modern JDKs do).
* Or, you've installed the intermediate/root certificates instead of the short-lived leaf certificates.

However, if you manually imported specific leaf certificates, you'll need to repeat the steps above when Split.io updates them. To avoid manual updates, consider updating your JDK to the latest version so its default trust store includes up-to-date CAs.

#### Check certificate expiry proactively

To see when Split.io's certificates expire, run:

```bash
echo | openssl s_client -connect sdk.split.io:443 -servername sdk.split.io 2>/dev/null \
    | openssl x509 -noout -dates

echo | openssl s_client -connect events.split.io:443 -servername events.split.io 2>/dev/null \
    | openssl x509 -noout -dates
```

This outputs something like the following:

```
notBefore=Mar  1 00:00:00 2025 GMT
notAfter=May 30 23:59:59 2025 GMT
```

If the `notAfter` date is approaching and you manually imported certificates, repeat the installation steps above.
