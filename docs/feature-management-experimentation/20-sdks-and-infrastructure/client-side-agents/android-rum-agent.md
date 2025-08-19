---
title: Android RUM Agent
sidebar_label: Android RUM Agent
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about FME's Real User Monitoring (RUM) Agent for Android.

FME's Android RUM Agent collects events about your users' experience when they use your application and sends this information to FME services. This allows you to measure and analyze the impact of feature flag changes on performance metrics.

## Language Support

FME's Android RUM Agent is designed for Android applications written in Java or Kotlin and is compatible with Android SDK versions 15 and later (4.0.3 Ice Cream Sandwich).

## Initialization
 
Set up FME's RUM Agent in your code with the following three steps:

### 1. Import the Agent into your project

Import the Agent into your project with the following line:

<Tabs>
<TabItem value="Gradle Groovy">

```groovy
implementation 'io.split.client:android-rum-agent:0.4.0'
```

</TabItem>
<TabItem value="Gradle Kotlin DSL">

```kotlin
implementation("io.split.client:android-rum-agent:0.4.0")
```

</TabItem>
</Tabs>

### 2. Setup the Agent

To allow the Agent to send information to FME services, specify the SDK through your app's `AndroidManifest.xml` file, as a `meta-data` tag inside the `application` tag.

```xml title="AndroidManifest initialization"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <application ...>
    <activity ...>...</activity>

    <meta-data
      android:name="io.split.android.rum.SPLIT_SDK_KEY"
      android:value="YOUR_SDK_KEY" />

  </application>
</manifest>
```

Alternatively, you can call the `setup` method on the `SplitRumAgent` object. This value will override the one specified through the `AndroidManifest.xml`.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitRumAgent.setup("YOUR_SDK_KEY");
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
SplitRumAgent.setup("YOUR_SDK_KEY")
```

</TabItem>
</Tabs>

### 3. Add an Identity

While the Agent will work without having an Identity, events won't be sent to FME services until at least one is set.

Identity objects consist of a key and a [traffic type](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/). The traffic type value must match the name of a traffic type that you have defined in Harness FME.

The RUM Agent provides methods to manage Identities, as shown below:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// add one Identity
SplitRumAgent.addIdentity(new Identity("my_user", "user"));

// add multiple Identities
SplitRumAgent.addIdentities(
  new Identity("my_user", "user"),
  new Identity("my_account", "account")
);

// remove one Identity
SplitRumAgent.removeIdentity(new Identity("my_user", "user"));

// remove all Identities
SplitRumAgent.removeIdentities();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// add one Identity
SplitRumAgent.addIdentity(Identity("my_user", "user"))

// add multiple Identities
SplitRumAgent.addIdentities(
  Identity("my_user", "user"),
  Identity("my_account", "account")
)

// remove one Identity
SplitRumAgent.removeIdentity(Identity("my_user", "user"))

// remove all Identities
SplitRumAgent.removeIdentities()
```

</TabItem>
</Tabs>

## Configuration

FME's Android RUM Agent can be configured to change its default behavior. The following options are available:
- Log Level: Level of logging. Valid values are `DEBUG`, `INFO`, `WARNING` and `ERROR`.
- Prefix: Optional prefix to append to the `eventTypeId` of the events sent to Harness. For example, if you set the prefix to "my-app", the event type "error" will be sent as "my-app.error". The prefix "split.rum" is used by default if no prefix is configured.
- User Consent: User consent status used to control the tracking of events. Possible values are `GRANTED`, `DECLINED`, and `UNKNOWN`. The default value is `'GRANTED'`. See the [User consent](#user-consent) section for details.

 These options can be configured using the `AndroidManifest.xml` or programmatically. Values specified programmatically will override values set through the `AndroidManifest.xml`. Both methods are demonstrated below.

Configuration using the manifest file:

```xml titlel="AndroidManifest.xml configuration"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <application ...>
    <activity ...>...</activity>

    <meta-data
      android:name="io.split.android.rum.SPLIT_SDK_KEY"
      android:value="YOUR_SDK_KEY" />

    <!-- Configuration -->
    <meta-data
      android:name="io.split.android.rum.LOG_LEVEL"
      android:value="DEBUG" />

    <meta-data
      android:name="io.split.android.rum.PREFIX"
      android:value="pre" />

  </application>
</manifest>
```

Configuration specified programatically:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitRumConfiguration config = new SplitRumConfiguration.Builder()
  .setPrefix("pre")
  .setLogLevel(LogLevel.DEBUG)
  .build();

SplitRumAgent.setup("YOUR_SDK_KEY", config);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val config = SplitRumConfiguration.Builder()
  .setPrefix("pre")
  .setLogLevel(LogLevel.DEBUG)
  .build()

  SplitRumAgent.setup("YOUR_SDK_KEY", config)
```

</TabItem>
</Tabs>

## Events

FME's Android RUM Agent collects a number of events by default.

### Default events

| **Event type ID** | **Description** | **Has value?** | **Has properties?** |
| --- | --- | --- | --- |
| crash | Any unhandled exception that causes the application to crash. | No | ```{ message: string, trace: string }``` |
| error | Exceptions tracked via the `trackError` method. | No | ```{ message: string, trace: string }``` |
| app_start | Time in milliseconds elapsed until app is launched | Yes | No |
| anr | Sent if an ANR (Application Not Responding) is detected. | No | No |
| device_info | Information provided by the OS about a device. This is sent the first time the Agent runs on the device. | No | ```{ id: string, display: string, product: string, device: string, board: string, manufacturer: string, brand: string, model: string, hardware: string, base: string, incremental: string, sdkVersion: string, host: string, fingerprint: string, release: string, baseOs: string, socManufacturer: string, securityPatch: string, abis: string }``` |

### Automatic metric creation

FME will automatically create [metrics](/docs/feature-management-experimentation/release-monitoring/metrics/) for a subset of the event types received from the Android RUM Agent. These "out of the box metrics" are auto-created for you:

| **Event type** | **Metric name** |
| --- | --- |
| split.rum.error | Count of Application Errors - Split Agents |
| split.rum.crash | Count of Crashes - Split Agents |
| split.rum.app_start | Average App Start Time - Split Agents |
| split.rum.anr | Count of ANRs - Split Agents |

For a metric that was auto-created, you can manage the [definition](/docs/feature-management-experimentation/release-monitoring/metrics/) and [alert policies](/docs/feature-management-experimentation/experimentation/metrics/alert-policies#create-a-metric-alert-policy) like you would for any other metric. If you delete a metric that was auto-created, FME will not re-create the metric, even if the event type is still flowing.

## Advanced use cases

### Custom properties

Each event for the metrics described above automatically includes a `session_id` property that can be use to filter certain events when defining Split metrics for experimentation purposes. Learn more about [metric definitions and how to define property filters](/docs/feature-management-experimentation/release-monitoring/metrics/)

| **name** | **Description** |
| --- | --- |
| session_id | ID of the session in which the event took place. |

Custom properties can be also added to a tracked event, as shown below: 

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
// add a single property
SplitRumAgent.setProperty("property_name", "property_value");

// add multiple properties
Map<String, Object> newProperties = new HashMap<>();
newProperties.put("property_name", "property_value");
newProperties.put("property_name_2", "property_value_2");
SplitRumAgent.setProperties(newProperties);

// get all properties
Map<String, Object> properties = SplitRumAgent.getProperties();

// remove a single property
SplitRumAgent.removeProperty("property_name_2");

// remove all properties
SplitRumAgent.removeProperties();
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// add a single property
SplitRumAgent.setProperty("property_name", "property_value")

// add multiple properties
SplitRumAgent.setProperties(
  mapOf(
    "property_name" to "property_value",
    "property_name_2" to "property_value_2",
  )
)

// get all properties
val properties: Map<String, Object> = SplitRumAgent.getProperties()

// remove a single property
SplitRumAgent.removeProperty("property_name_2")

// remove all properties
SplitRumAgent.removeProperties()
```

</TabItem>
</Tabs>

### Custom events

Custom events can be tracked using the following options: 
- the `track` method
- the specialized `trackError` method
- the specialized `trackTimeFromStart`
These methods are demonstrated below.

Using the `track` methods: 

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
Map<String, Object> properties = new HashMap<>();
properties.put("property_name", "property_value");

// Track event
SplitRumAgent.track("event_type_id");

// Track event with value
SplitRumAgent.track("event_type_id", 100L);

// Track event with properties
SplitRumAgent.track("event_type_id", properties);

// Track event with value and properties
SplitRumAgent.track("event_type_id", 100L, properties);
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Track event
SplitRumAgent.track("event_type_id")

// Track event with value
SplitRumAgent.track("event_type_id", 100)

// Track event with properties
SplitRumAgent.track("event_type_id", mapOf("property_name" to "property_value"))

// Track event with value and properties
SplitRumAgent.track("event_type_id", 100, mapOf("property_name" to "property_value"))
```

</TabItem>
</Tabs>

Using the `trackError` method:

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitRumAgent.trackError(new Throwable("my_error"));
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
SplitRumAgent.trackError(Throwable("my_error"))
```

</TabItem>
</Tabs>

Using the `trackTimeFromStart` method. This method generates an event which value is the number of milliseconds between app launch and the moment the method is called.

<Tabs groupId="java-kotlin-choice">
<TabItem value="java" label="Java">

```java
SplitRumAgent.trackTimeFromStart("content_loaded");
```

</TabItem>
<TabItem value="kotlin" label="Kotlin">

```kotlin
SplitRumAgent.trackTimeFromStart("content_loaded")
```

</TabItem>
</Tabs>

### User consent

By default the Agent will send events to Harness servers, but you can disable this behavior until user consent is explicitly granted.

The `userConsent` configuration parameter lets you set the initial consent status of the Agent, and the `SplitRumAgent.setUserConsent(boolean)` method lets you grant (enable) or decline (disable) dynamic event tracking.

There are three possible initial states:
 * `'GRANTED'`: The user grants consent for tracking events. The Agent sends them to Harness servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: The user declines consent for tracking events. The Agent does not send them to Harness servers.
 * `'UNKNOWN'`: The user neither grants nor declines consent for tracking events. The Agent tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively.

The status can be updated at any time with the `setUserConsent` method.

Working with user consent is demonstrated below.

```javascript title="User consent: Initial config, getter and setter"
SplitRumAgent.setup('YOUR_SDK_KEY', {
  // Overwrites the initial consent status of the Agent, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data,
  // so the Agent will locally track data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
  userConsent: 'UNKNOWN'
});

// `getUserConsent` method returns the current consent status.
SplitRumAgent.getUserConsent() == UserConsent.GRANTED;

// `setUserConsent` method lets you update the consent status at any time.
// Pass `true` for 'GRANTED' and `false` for 'DECLINED'.
SplitRumAgent.setUserConsent(true); // Consent status changed from 'UNKNOWN' to 'GRANTED'. Data will be sent to Harness FME servers.
SplitRumAgent.getUserConsent() == UserConsent.GRANTED;

SplitRumAgent.setUserConsent(false); // Consent status changed from 'GRANTED' to 'DECLINED'. Data will not be sent to Harness FME servers.
SplitRumAgent.getUserConsent() == UserConsent.DECLINED;
```


<!-- @TODO ### SDK integration -->