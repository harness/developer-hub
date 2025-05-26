---
title: Android SDK
sidebar_label: Android SDK
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Android SDK. All of our SDKs are open source. Go to our [Android SDK GitHub repository](https://github.com/splitio/android-client) to see the source code.

## Language support

This library is designed for Android applications written in Java or Kotlin and is compatible with Android SDK versions 19 and later (4.4 Kit Kat).

:::warning[Important]

Starting with `Android v3.0.0`, this SDK now relies on `WorkManager v2.7.1`. This requires your application to use at least `compileSdk 31`.

If you haven't upgraded to use API 31, you can force the downgrade of the `WorkManager` dependency.
```groovy
implementation("androidx.work:work-runtime") {
    version {
        strictly("2.6.0")
    }
}
```
:::

## Initialization

To get started, set up FME in your code base with the following two steps.

### 1. Import the SDK into your project

Import the SDK into your project using the following line:

```java title="Gradle"
implementation 'io.split.client:android-client:5.2.0'
```

### 2. Instantiate the SDK and create a new SDK factory client

The first time the SDK is instantiated, it starts background tasks to update an in-memory cache and in-storage cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds, depending on the size of the data.

If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while it is in this intermediate state, it may not have the data necessary to run the evaluation. In this circumstance, the SDK does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

After the first initialization, the fetched data is stored. Further initializations fetch data from that cache and the configuration is immediately available.

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Configure the SDK with the SDK key for the FME environment that you would like to access. The SDK key is available in Harness FME Admin settings. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
import io.split.android.client.SplitClient;
import io.split.android.client.SplitClientConfig;
import io.split.android.client.SplitFactory;
import io.split.android.client.SplitFactoryBuilder;
import io.split.android.client.api.Key;

// SDK key
String sdkKey = "YOUR_SDK_KEY";

// Build SDK configuration by default
SplitClientConfig config = SplitClientConfig.builder()
  .build();

// Create a new user key to be evaluated
// key represents your internal user id, or the account id that 
// the user belongs to.
String matchingKey = "key";
Key key = new Key(matchingKey);

// Create factory
SplitFactory splitFactory = SplitFactoryBuilder.build(sdkKey, key, config, getApplicationContext());

// Get client instance
SplitClient client = splitFactory.client();
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
import io.split.android.client.SplitClient
import io.split.android.client.SplitClientConfig
import io.split.android.client.SplitFactory
import io.split.android.client.SplitFactoryBuilder
import io.split.android.client.api.Key

// SDK key
val sdkKey = "YOUR_SDK_KEY"

// Build default SDK configuration
val config: SplitClientConfig = SplitClientConfig.builder().build()

// Create a new user key to be evaluated
// key represents your internal user id, or the account id that 
// the user belongs to.
val matchingKey = "key"
val key: Key = Key(matchingKey)

// Create factory
val splitFactory: SplitFactory =
    SplitFactoryBuilder.build(sdkKey, key, config, applicationContext)

// Get client instance
val client: SplitClient = splitFactory.client()
```
</TabItem>
</Tabs>


## Using the SDK

The following explains how to use this SDK.

### Basic usage

To make sure the SDK is properly loaded before asking it for a treatment, wait until the SDK is ready as shown below. We set the client to listen for the `SDK_READY` event triggered by the SDK before asking for an evaluation. Once the `SDK_READY` event fires, use the `getTreatment` method to return the proper treatment based on the FEATURE_FLAG_NAME you pass and the key you passed when instantiating the SDK. From there, use an if-else-if block as shown below and plug the code in for the different treatments that you defined in Harness FME. Make sure to remember the final else branch in your code to handle the client returning control.

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

client.on(SplitEvent.SDK_READY_TIMED_OUT, new SplitEventTask() {
  @Override
  public void onPostExecution(SplitClient client) {
    // handle for timeouts here
  }

  @Override
  public void onPostExecutionView(SplitClient client) {
    // handle for timeouts here
  }
}  

```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
  client.on(SplitEvent.SDK_READY, object : SplitEventTask() {

    override fun onPostExecution(client: SplitClient) {
        // Execute background logic here
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
})
```
</TabItem>
</Tabs>

Also, a `SDK_READY_FROM_CACHE` event is available, which allows to be aware of when the SDK has loaded data from cache. This way, it is ready to evaluate feature flags using those locally cached definitions.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
client.on(SplitEvent.SDK_READY_FROM_CACHE, new SplitEventTask() {
  @Override
  public void onPostExecution(SplitClient client) {
    //Background Code in Here
  }

  @Override
  public void onPostExecutionView(SplitClient client) {
    //UI Code in Here
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
client.on(SplitEvent.SDK_READY_FROM_CACHE, object : SplitEventTask() {
    override fun onPostExecution(client: SplitClient) {
        // Execute background logic here
    }

    override fun onPostExecutionView(client: SplitClient) {
        // Execute logic in main thread here
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
})
```
</TabItem>
</Tabs>

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `getTreatment` methods need to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the Rollout plan as defined in Harness FME to decide which treatment is assigned to this key.

The `getTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `java.lang.Long` or `java.lang.Integer`.
* **Dates:** Express the value in `milliseconds since epoch`. In Java, `milliseconds since epoch` is of type `java.lang.Long`. For example, the value for the `registered_date` attribute below is `System.currentTimeInMillis()`, which is a long.
* **Booleans:** Use type `java.lang.boolean`.
* **Sets:** Use type `java.util.Collection`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
import java.util.Map;
import java.util.HashMap;
import java.util.Date;

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

### Binding attributes to the client

Attributes can be bound to the client at any time during the SDK lifecycle. These attributes are stored in memory and used in every evaluation to avoid the need for keeping the attribute set accessible through the whole app. These attributes can be cached into the persistent caching mechanism of the SDK making them available for future sessions, as well as part of the SDK_READY_FROM_CACHE flow by setting the `persistentAttributesEnabled` to true. There is no need to wait for your attributes to be loaded at every session before evaluating flags that use them. 

When an evaluation is called, the attributes provided (if any) at evaluation time are combined with the ones already loaded into the SDK memory, with the ones provided at function execution time take precedence, enabling for those attributes to be overriden/hidden for specific evaluations. 

An attribute is considered valid if it follows one of the types listed below:
- String
- Number
- Boolean
- Array

The SDK validates these before storing them and if there are invalid or missing values, possibly indicating an issue, the methods return the boolean `false` and do not update any value.

See below the definitions for the API which is exposed on the `client`:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
public interface AttributesManager {
    /**
    * Set one single attribute and returns true unless there is an issue storing it. 
    * If `persistentAttributesEnabled` config is enabled, the attribute is also written to the persistent cache.
    */
    boolean setAttribute(String attributeName, Object value);

    /**
    * Retrieves the value of a given attribute stored in cache.
    */
    @Nullable
    Object getAttribute(String attributeName);

    /**
     * Set multiple attributes and returns true unless there is an issue storing them. 
     * If `persistentAttributesEnabled` config is enabled, the attributes are also written to the persistent cache.
     */
    boolean setAttributes(Map<String, Object> attributes);

    /**
    * Retrieves a Map with the values of all attributes stored in cache.
    */
    @NonNull
    Map<String, Object> getAllAttributes();

    /**
     * Remove one single attribute and returns true unless there is an issue deleting it. 
     * If `persistentAttributesEnabled` config is enabled, the attribute is also deleted from the persistent cache and won't be available in a subsequent session.
     */
    boolean removeAttribute(String attributeName);
    
    /**
     * Clear the whole attribute cache and return true unless there is an issue with the operation and some attributes might still be cached. 
     * If `persistentAttributesEnabled` config is enabled, the attributes are also deleted from the persistent cache and won't be available in a subsequent session.
     */
    boolean clearAttributes();
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
interface AttributesManager {
    /**
     * Set one single attribute and returns true unless there is an issue storing it.
     * If `persistentAttributesEnabled` config is enabled, the attribute is also written to the persistent cache.
     */
    fun setAttribute(attributeName: String, value: Any): Boolean

    /**
     * Retrieves the value of a given attribute stored in cache.
     */
    fun getAttribute(attributeName: String): Any?

    /**
     * Set multiple attributes and returns true unless there is an issue storing them.
     * If `persistentAttributesEnabled` config is enabled, the attributes are also written to the persistent cache.
     */
    fun setAttributes(attributes: Map<String, Any>): Boolean

    /**
     * Retrieves a Map with the values of all attributes stored in cache.
     */
    fun getAllAttributes(): Map<String, Any>

    /**
     * Removes one single attribute and returns true unless there is an issue deleting it.
     * If `persistentAttributesEnabled` config is enabled, the attribute is also deleted from the persistent cache and won't be available in a subsequent session.
     */
    fun removeAttribute(attributeName: String): Boolean

    /**
     * Clears the whole attribute cache and returns true unless there is an issue with the operation and some attributes might still be cached.
     * If `persistentAttributesEnabled` config is enabled, the attributes are also deleted from the persistent cache and won't be available in a subsequent session.
     */
    fun clearAttributes(): Boolean
}
```
</TabItem>
</Tabs>

Refer to the example below to see how to use these methods:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
import java.util.Map;
import java.util.HashMap;
import java.util.Date;

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

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` method of the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
List<String> featureFlagNames = Lists.newArrayList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
Map<String, String> treatments = client.getTreatments(featureFlagNames, null);

Map<String, String> treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", null);

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
val featureFlagNames: List<String> = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val treatments: Map<String, String> = client.getTreatments(featureFlagNames, null)

val treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", null)

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

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), use the `getTreatmentWithConfig` method. This method returns an object containing the treatment and associated configuration.

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `null` for the config parameter.

This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
SplitResult result = cli.getTreatmentWithConfig("new_boxes", attributes);
Gson gson = new Gson();
Map map = gson.fromJson(result.config(), Map.class);
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

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult objects instead of strings. Example usage below.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java

List<String> flagNames = Lists.newArrayList("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2");
Map<String, SplitResult> treatments = client.getTreatmentsWithConfig(flagNames, null);

Map<String, SplitResult> treatmentsByFlagSet = client.getTreatmentsWithConfigByFlagSet("frontend", null);

List<String> flagSetNames = List.newArrayList("frontend", "client_side");
Map<String, SplitResult> treatmentsByFlagSets = client.getTreatmentsWithConfigByFlagSets(flagSetNames, null);

// treatments have the following form:
// {
//   "FEATURE_FLAG_NAME_1": { "treatment": "on", "config": "{ \"color\":\"red\" }" },
//   "FEATURE_FLAG_NAME_2": { "treatment": "visa", "config": "{ \"color\":\"red\" }" }
// }
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
val flagNames: List<String> = listOf("FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2")
val treatments: Map<String, SplitResult> = client.getTreatmentsWithConfig(flagNames, null)

val treatmentsByFlagSet = client.getTreatmentsWithConfigByFlagSet("frontend", null)

val flagSetNames = listOf("frontend", "client_side");
val treatmentsByFlagSets = client.getTreatmentsWithConfigByFlagSets(flagSetNames, null)

// treatments have the following form:
// {
//   "FEATURE_FLAG_NAME_1": { "treatment": "on", "config": "{ \"color\":\"red\" }" },
//   "FEATURE_FLAG_NAME_2": { "treatment": "visa", "config": "{ \"color\":\"red\" }" }
// }
```
</TabItem>
</Tabs>

### Append properties to impressions

[Impressions](/docs/feature-management-experimentation/feature-management/impressions) are generated by the SDK each time a `getTreatment` method is called. These impressions are periodically sent back to Split's servers for feature monitoring and experimentation.

You can append properties to an impression by passing an object of key-value pairs to the `getTreatment` method. These properties are then included in the impression sent by the SDK and can provide useful context to the impression data.

Three types of properties are supported: strings, numbers, and booleans.

<Tabs groupId="java-kotlin-choice">
<TabItem value="Java">
```java
// Create a Map for properties
Map<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);

// Create EvaluationOptions with the properties
EvaluationOptions evaluationOptions = new EvaluationOptions(properties);

// Get treatment using the evaluation options
String treatment = client.getTreatment("FEATURE_FLAG_NAME", evaluationOptions);
```
</TabItem>
<TabItem value="Kotlin">
```kotlin
// Create a Map for properties
val properties = mapOf(
    "package" to "premium",
    "admin" to true,
    "discount" to 50
)

// Create EvaluationOptions with the properties
val evaluationOptions = EvaluationOptions(properties)

// Get treatment using the evaluation options
val treatment = client.getTreatment("FEATURE_FLAG_NAME", evaluationOptions)
```
</TabItem>
</Tabs>

### Shutdown

It is good practice to call the `destroy` method before your app shuts down or is destroyed, as this method gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.

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

After `destroy()` is called, any subsequent invocations to the `client.getTreatment()` or `manager` methods result in `control` or empty list respectively.

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users' actions and metrics. Refer to the [Events](https://help.split.io/hc/en-us/articles/360020585772) guide to learn about using track events. In the examples below, you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are:

* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 80 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Float**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK was able to successfully queue the event to be sent back to Harness servers on the next event post. The SDK will return `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

In case a bad input is provided, refer to the [Track events](https://help.split.io/hc/en-us/articles/360020585772-Track-events) guide for information about our SDK's expected behavior.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
// Event without a value
boolean trackEvent = client.track("TRAFFIC_TYPE", "EVENT_TYPE");
// Example
boolean trackEvent = client.track("user", "page_load_time");

// Associate value to an event
boolean trackEvent = client.track("TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example  
boolean trackEvent = client.track("user", "page_load_time", 83.334);

// If you would like to send an event but you've already defined the traffic type in the config of the client
boolean trackEvent = client.track("EVENT_TYPE");
// Example
boolean trackEvent = client.track("page_load_time");

// If you would like to associate a value to an event and you've already defined the traffic type in the config of the client
boolean trackEvent = client.track("EVENT_TYPE", VALUE);
// Example  
boolean trackEvent = client.track("page_load_time", 83.334);

// If you would like to associate a value and properties to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES});
// Example  
HashMap<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);

boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", 83.334, properties);

// If you would like to associate just properties to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", null, {PROPERTIES});
// Example  
HashMap<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);

boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", null, properties);
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
// Event without a value
val trackEvent = client.track("user", "page_load_time")

// Associate value to an event
val trackEvent = client.track("user", "page_load_time", 83.334)

// If you would like to send an event but you've already defined the traffic type in the config of the client
val trackEvent = client.track("page_load_time")

// If you would like to associate a value to an event and you've already defined the traffic type in the config of the client
val trackEvent = client.track("page_load_time", 83.334)

// If you would like to associate a value and properties to an event
val trackEvent = client.track(
    "john@doe.com",
    "user",
    "page_load_time",
    83.334,
    mapOf(
        "package" to "premium",
        "admin" to true,
        "discount" to 50
    )
)

// If you would like to associate just properties to an event
val trackEvent = client.track(
    "john@doe.com",
    "user",
    "page_load_time",
    null,
    mapOf(
        "package" to "premium",
        "admin" to true,
        "discount" to 50
    )
)
```
</TabItem>
</Tabs>

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| featuresRefreshRate | The SDK polls Harness servers for changes to feature flags at this rate (in seconds). | 3600 seconds |
| segmentsRefreshRate | The SDK polls Harness servers for changes to segments at this rate (in seconds). | 1800 seconds |
| impressionsRefreshRate | The treatment log captures which customer saw what treatment (on, off, etc.) at what time. This log is periodically flushed back to Harness servers. This configuration controls how quickly the cache expires after a write (in seconds). | 1800 seconds |
| telemetryRefreshRate | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds (1 hour) |
| eventsQueueSize | When using `.track`, the number of **events** to be kept in memory. | 10000 |
| eventFlushInterval | When using `.track`, how often is the events queue flushed to Harness servers. | 1800 seconds |
| eventsPerPush | Maximum size of the batch to push events. | 2000 |
| trafficType | When using `.track`, the default traffic type to be used. | not set |
| connectionTimeout  | HTTP client connection timeout (in ms). | 10000 ms |
| readTimeout | HTTP socket read timeout (in ms). | 10000 ms |
| impressionsQueueSize | Default queue size for impressions. | 30K |
| disableLabels | Disable labels from being sent to Harness servers. Labels may contain sensitive information. | true |
| logLevel | Enables logging according to the level specified. Options are `NONE`, `VERBOSE`, `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `ASSERT`. | `NONE` |
| proxyHost | The location of the proxy using standard URI: `scheme://user:password@domain:port/path`. If no port is provided, the SDK  defaults to port 80. | null |
| ready | Maximum amount of time in milliseconds to wait before notifying a timeout. | -1 (not set) |
| synchronizeInBackground | Activates synchronization when application host is in background. | false |
| synchronizeInBackgroundPeriod | Rate in minutes in which the background synchronization would check the conditions and trigger the data fetch if those are met. Minimum rate allowed is 15 minutes. | 15 |
| backgroundSyncWhenBatteryNotLow | When set to true, synchronize in background only if battery level is not low. | true |
| backgroundSyncWhenWifiOnly | When set to true, synchronize in background only when the available connection is wifi (unmetered). When false, background synchronization takes place as long as there is an available connection. | false |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism when in foreground. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | true |
| syncConfig | Optional SyncConfig instance. Use it to filter specific feature flags to be synced and evaluated by the SDK. These filters can be created with the `SplitFilter::bySet` static function (recommended, flag sets are available in all tiers), or `SplitFilter::byName` static function, and appended to this config using the `SyncConfig` builder. If not set or empty, all feature flags are downloaded by the SDK. | null |
| persistentAttributesEnabled | Enables saving attributes on persistent cache which is loaded as part of the SDK_READY_FROM_CACHE flow. All functions that mutate the stored attributes map affect the persistent cache. | false |
| syncEnabled | Controls the SDK continuous synchronization flags. When `true`, a running SDK processes rollout plan updates performed in Harness FME (default). When `false`, it fetches all data upon init, which ensures a consistent experience during a user session and optimizes resources when these updates are not consumed by the app. | true |
| impressionsMode | This configuration defines how impressions (decisioning events) are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, ALL impressions are queued and sent to Harness; this is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `OPTIMIZED` |
| userConsent | User consent status used to control the tracking of events and impressions. Possible values are `GRANTED`, `DECLINED`, and `UNKNOWN`. See [User consent](#user-consent) for details. | `GRANTED` |
| encryptionEnabled | If set to `true`, the local database contents is encrypted. | false |
| prefix | If set, the prefix will be prepended to the database name used by the SDK. | null |
| certificatePinningConfiguration | If set, enables certificate pinning for the given domains. For details, see the [Certificate pinning](#certificate-pinning) section below. | null |

To set each of the parameters defined above, use the syntax below.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
import io.split.android.client.*;
import java.util.Arrays;

SplitFilter splitFilter = SplitFilter.bySet(Arrays.asList("frontend"));

SplitClientConfig config = SplitClientConfig.builder()
                            .impressionsRefreshRate(60)
                            .connectionTimeout(15000)
                            .readTimeout(15000)
                            .syncConfig(SyncConfig.builder()
                                .addSplitFilter(splitFilter)
                                .build())
                            .build();

// SDK key
String sdkKey = "YOUR_SDK_KEY";

// Create a new user key to be evaluated
String matching = "key";
String bucketingKey = null;
Key k = new Key(matchingKey,bucketingKey);

// Create factory
SplitFactory splitFactory = SplitFactoryBuilder.build(sdkKey, k, config, getApplicationContext());

// Get client instance
SplitClient client = splitFactory.client();
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
val splitFilter: SplitFilter = SplitFilter.bySet(listOf("frontend"))

val config: SplitClientConfig = SplitClientConfig.builder()
    .impressionsRefreshRate(60)
    .connectionTimeout(15000)
    .readTimeout(15000)
    .syncConfig(
        SyncConfig.builder()
            .addSplitFilter(splitFilter)
            .build()
    )
    .build()

val splitFactory: SplitFactory = SplitFactoryBuilder
    .build(
        "YOUR_SDK_KEY",
        Key("key"),
        config,
        applicationContext
    )

val client: SplitClient = splitFactory.client()
```
</TabItem>
</Tabs>

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, you can start the SDK in **localhost** mode (aka, off-the-grid mode). In this mode, the SDK neither polls or updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the feature flags. To use the SDK in localhost mode, replace the API Key with `localhost`, as shown in the example below:

Since version 2.2.0, our SDK supports a new type of localhost feature flag definition file, using the YAML format. This new format allows the user to map different keys to different treatments within a single feature flag, and also add configurations to them. The new format is a list of single-key maps (one per mapping feature_flag-keys-config), defined as follows:

```yaml title="YAML"
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

In the example above, we have four entries:

 * The first entry defines that for feature flag `my_feature`, the key `key` returns the treatment `on` and the `on` treatment is tied to the configuration `{"desc" : "this applies only to ON treatment"}`.
 * The second entry defines that the feature flag `some_other_feature` always returns the `off` treatment and no configuration.
 * The third entry defines that `my_feature` always returns `off` for all keys that don't match another entry (in this case, any key other than `key`).
 * The fourth entry shows an example on how to override a treatment for a set of keys.

In this mode, the SDK loads the yaml file from a resource bundle file at the assets' project `src/main/assets/splits.yaml`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
import io.split.android.client.SplitClient;
import io.split.android.client.SplitFactoryBuilder;
import io.split.android.client.api.Key;

// Create a new user key to be evaluated
String matching = "key";
Key k = new Key(matchingKey);

SplitClient client = SplitFactoryBuilder.build("localhost", k, getApplicationContext()).client();
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
import io.split.android.client.SplitFactoryBuilder
import io.split.android.client.api.Key

// Create a new user key to be evaluated
val key = Key("key")

val client = SplitFactoryBuilder.build(
    "localhost",
    key,
    applicationContext
).client()
```
</TabItem>
</Tabs>

If a split.yaml or split.yml is not found in assets, the SDK maintains backward compatibility by trying to load the legacy file (split.properties), which is now deprecated.

The format of this file is a properties file as key-value line. The key is the feature flag name, and the value is the treatment name. The following is a sample `split.properties` file:

```java title="split.properties"
## this is a comment

## sdk.getTreatment(*, reporting_v2) will return 'on'
reporting_v2=on

double_writes_to_cassandra=off

new-navigation=v3
```

## Manager

Use the Split Manager to get a list of feature flags available to the SDK factory client. To instantiate a Manager in your code base, use the same factory that you used for your client.

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
 * Returns the names of feature flags registered with the SDK.
 *
 * @return a List of String (Feature flag names) or empty
 */
List<String> splitNames();
```
</TabItem>
<TabItem value="kotlin" label="Kotlin">
```kotlin
/**
 * Retrieves the feature flags that are currently registered with the
 * SDK.
 *
 * @return a List of SplitView or empty.
 */
fun splits(): List<SplitView>

/**
 * Returns the feature flags registered with the SDK of this name.
 *
 * @return SplitView or null
 */
fun split(SplitName: String): SplitView?

/**
 * Returns the names of features flags registered with the SDK.
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
    public boolean impressionsDisabled;
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
    var impressionsDisabled: Boolean
)
```
</TabItem>
</Tabs>

## Listener

FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*.

The SDK sends the generated impressions to the impression listener right away. Because of this, be careful while implementing handling logic to avoid blocking the main thread. Generally speaking, you should create a separate thread to handle incoming impressions. Refer to the snippet below:

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
| changeNumber | Long | Date and time of the last change to the targeting rule that the SDK used when it served the treatment. It is important to understand when a change made to a feature flag is picked up by the SDKs and whether one of the SDK instances is not picking up changes. |
| attributes | Map\<String, Object\> | A map of attributes passed to `getTreatment`/`getTreatments`, if any. |
| previousTime | Long | If SDK is deduping and a matching impression is seen before on the lifetime of the instance this is its timestamp. |

## Flush

The flush() method sends the data stored in memory (impressions and events) to the Harness FME servers and clears the successfully posted data. If a connection issue is experienced, the data is sent on the next attempt. If you want to flush all pending data when your app goes to background, a good place to call this method is the onPause callback of your MainActivity.

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

To enable SDK logging, the `logLevel` setting is available in `SplitClientConfig` class:

```swift title="Setup logs"
// This setting type is `SplitLogLevel`. 
// The available values are DEBUG, INFO, WARNING, ERROR, ASSERT and NONE
SplitClientConfig.Builder builder = SplitClientConfig.builder()
    .logLevel(Log.VERBOSE)
SplitClientConfig config = builder.build();

  ...
```

The following shows an example output:

![](./static/android-sdk-log-example.png)

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple SDK clients

In versions previous to 2.10.0, you had to create more that one SDK instance to evaluate for different users IDs. From 2.10.0 on, FME supports the ability to create multiple clients, one for each user ID. For example, if you need to roll out feature flags for different user IDs, you can instantiate multiple clients, one for each ID. You can then evaluate them using the corresponding client.

You can do this using the example below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">
```java
// Create factory
Key key = new Key("anonymous_user");
SplitClientConfig config = SplitClientConfig.builder().build();
SplitFactory splitFactory = SplitFactoryBuilder.build("yourAuthKey", key, config, getApplicationContext());

// Now when you call factory.client(), the SDK will create a client
// using the Key you passed in during the factory creation
SplitClient anonymousClient = splitFactory.client();

// To create another client for a user instead, just pass in a different Key or id
SplitClient userClient = splitFactory.client("user_id");

// Add events handler for each client to be notified when SDK is ready
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
val splitFactory = SplitFactoryBuilder.build("yourAuthKey", key, config, getApplicationContext())

// Now when you call factory.client(), the SDK will create a client
// using the Key you passed in during the factory creation
val anonymousClient = splitFactory.client()

// To create another client for a user instead, just pass in a different Key or id
val userClient = splitFactory.client("user_id")

// Add events handler for each client to be notified when SDK is ready
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

:::info[Number of SDK instances]
While the SDK does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of SDKs down to **one** or **two**.
:::

### Subscribe to events

You can listen for four different events from the SDK.

* `SDK_READY_FROM_CACHE`. This event fires once the SDK is ready to evaluate treatments using a locally cached version of your rollout plan from a previous session (which might be stale). If there is data in the cache, this event fires almost immediately, since access to the cache is fast; otherwise, it doesn't fire.
* `SDK_READY`. This event fires once the SDK is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `SDK_READY_TIMED_OUT `. This event fires if there is no cached version of your rollout plan in disk cache, and the SDK could not fully download the data from Harness servers within the time specified by the `ready` setting of the `SplitClientConfig` object. This event does not indicate that the SDK initialization was interrupted.  The SDK continues downloading the rollout plan and fires the `SDK_READY` event when finished.  This delayed `SDK_READY` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `SDK_UPDATE`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

An event is an extension of a SplitEventTask.

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

    open fun onPostExecution(client: SplitClient) {

    }

    open fun onPostExecutionView(client: SplitClient) {

    }
}
```
</TabItem>
</Tabs>

`onPostExecution` is executed in the background when the event is triggered. This step is used to perform background computation, which can take a long time.

`onPostExecutionView` is invoked on the UI thread after `onPostExecution` finishes.

The syntax to listen for an event can be seen below.

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

// When the SDK couldn't fetch definitions before *config.ready* time
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

// When the SDK couldn't fetch definitions before *config.ready* time
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

The SDK allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined.

The `userConsent` configuration parameter lets you set the initial consent status of the SDK instance, and the factory method `setUserConsent(enabled: Bool)` lets you grant (enable) or decline (disable) dynamic data tracking.

There are three possible initial states:
 * `'GRANTED'`: The user grants consent for tracking events and impressions. The SDK sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: The user declines consent for tracking events and impressions. The SDK does not send them to Harness FME servers.
 * `'UNKNOWN'`: The user neither grants nor declines consent for tracking events and impressions. The SDK tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively.

The status can be updated at any time with the `setUserConsent` factory method.

Working with user consent is demonstrated below.

```java title="User consent: Initial config, getter and setter"
// Overwrites the initial consent status of the factory instance, which is 'GRANTED' by default.
// 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
// so the SDK locally tracks data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
SplitClientConfig config = SplitClientConfig.builder()
        .userConsent(UserConsent.UNKNOWN)
        .build();

try {
    SplitFactory factory = SplitFactoryBuilder.build("YOUR_SDK_KEY",
            new Key(mUserKey, null),
            config, context);

    // Changed User Consent status to 'GRANTED'. Data is sent to Harness FME servers.
    factory.setUserConsent(true);
    // Changed User Consent status to 'DECLINED'. Data is not sent to Harness FME servers.
    factory.setUserConsent(false);

    // The 'getUserConsent' method returns User Consent status.
    // We expose the constants for customer checks and tracking.
    if (factory.getUserConsent() == UserConsent.DECLINED) {
        Log.i(TAG, "USER CONSENT DECLINED");
    }
    if (factory.getUserConsent() == UserConsent.GRANTED) {
        Log.i(TAG, "USER CONSENT GRANTED");
    }
    if (factory.getUserConsent() == UserConsent.UNKNOWN) {
        Log.i(TAG, "USER CONSENT UNKNOWN");
    }

} catch (Exception e) {
}
```

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

// Set the CertificatePinningConfiguration property for the SDK factory client configuration
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

// Set the CertificatePinningConfiguration property for the SDK factory client configuration
val config = SplitClientConfig.builder()
    .certificatePinningConfiguration(certPinningConfig)
    // you can add other configuration properties here
    .build()

```
</TabItem>
</Tabs>