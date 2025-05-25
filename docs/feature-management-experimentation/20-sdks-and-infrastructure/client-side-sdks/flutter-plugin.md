---
title: Flutter plugin
sidebar_label: Flutter plugin
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Flutter plugin which is built on top of our [Android SDK](https://help.split.io/hc/en-us/articles/360020343291-Android-SDK) and [iOS](https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK) mobile SDKs. The plugin provides you a way to interact with the native SDKs.

All of our SDKs are open source. Go to our [Flutter GitHub repository](https://github.com/splitio/flutter-sdk-plugin) to see the source code.

## Language support

Dart SDK v2.16.2 and greater, and Flutter v2.5.0 and greater.

:::warning[Platform support]
This plugin currently supports the Android and iOS platforms.
:::

## Initialization

Set up FME in your code base with the following two steps:

### 1. Add the package in your pubspec.yaml file

```yaml title="pubspec.yaml" 
dependencies:
  splitio: 0.2.0
```

### 2. Instantiate the plugin

```dart title="Flutter"
/// Initialize Split plugin
import 'package:splitio/split_client.dart';
import 'package:splitio/splitio.dart';
/// KEY represents your internal user id, or the account id that 
/// the user belongs to. 
/// This could also be a cookie you generate for anonymous users.
final Splitio _split = Splitio('YOUR_SDK_KEY', 'KEY');
```

We recommend instantiating the `Splitio` object once as a singleton and reusing it throughout your application.

Configure the plugin with the SDK key for the FME environment that you would like to access. The SDK key is available in Harness FME Admin settings. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

## Using the plugin

### Basic use

When the SDK is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds, depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while it's in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](https://help.split.io/hc/en-us/articles/360020528072-Control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, wait until the SDK is ready, as shown below. You can use the `onReady` parameter when creating the client to get notified when this happens.

After the observable calls back, you can use the `getTreatment` method to return the proper treatment based on the `FEATURE_FLAG_NAME` and the `key` variable you passed when instantiating the SDK. Then use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning control.

```dart title="Flutter"
/// Get treatment
_split.client(onReady: (client) async {
  final String treatment = await client.getTreatment('FEATURE_FLAG_NAME');

  if (treatment == 'on') {
    /// Insert code here to show on treatment
  } else if (treatment == 'off') {
    /// Insert code here to show off treatment
  } else {
    /// Insert your control treatment code here
  }
});
```

### Attribute syntax

To [target based on custom attributes](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes), pass the client's `getTreatment` method as an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account. The `getTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type num (int or double).
* **Dates:** Express the value in milliseconds since epoch. <br />*Note:* Milliseconds since epoch is expressed in UTC. If your date or date-time combination is in a different timezone, first convert it to UTC, then transform it to milliseconds since epoch.
* **Booleans:** Use type bool.
* **Sets:** Use type List or Set.

```dart title="Flutter"
final attributes = {
  // date attributes are handled as `millis since epoch`
  'registered_date': DateTime.now().millisecondsSinceEpoch,
  // this string will be compared against a list called `plan_type` or against another string
  'plan_type': 'growth',
  // this number will be compared against a number value called `deal_size`
  'deal_size': 10000,
  // this array will be compared against a set called `permissions`
  'permissions': ['read', 'write']
};

final String treatment =
    await _client.getTreatment('FEATURE_FLAG_NAME', attributes);

if (treatment == 'on') {
  // insert on code here
} else if (treatment == 'off') {
  // insert off code here
} else {
  // insert control code here
}
```

### Binding attributes to the client

Attributes can optionally be bound to the client at any time during the SDK lifecycle. These attributes are stored in memory and used in every evaluation to avoid the need to keep the attribute set accessible through the whole app. When an evaluation is called, the attributes provided (if any) at evaluation time are combined with the ones that are already loaded into the SDK memory, with the ones provided at function execution time taking precedence. This enables those attributes to be overridden or hidden for specific evaluations.

An attribute is considered valid if it follows one of the types listed below:
- String
- Number
- Boolean
- Array

The SDK validates these before storing them and if there are invalid or missing values, possibly indicating an issue, the methods return the boolean `false` and do not update any value.

To use these methods, refer to the example below:

```dart title="Flutter"
var attributes = {
  'registered_date': DateTime.now().millisecondsSinceEpoch,
  'plan_type': 'growth',
  'deal_size': 10000,
  'paying_customer': true,
  'permissions': ['read', 'write']
};

// set attributes returns a future which completes with a true unless there is an issue storing it
var result = await client.setAttributes(attributes);

// set one attribute and returns a future which completes with a true value unless there is an issue storing it
var result = await client.setAttribute('paying_customer', false);

// Get an attribute
var planType = await client.getAttribute('plan_type');

// Get all attributes
var storedAttributes = await client.getAttributes();

// Remove an attribute
var result = await client.removeAttribute('permissions');

// Remove all attributes
var result = await client.clearAttributes();

```

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs>
<TabItem value="getTreatments">
```dart
const featureFlagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
var treatments = {};

_split.client(onReady: (client) async {
  treatments = await client.getTreatments(featureFlagNames);
});
```
</TabItem>
<TabItem value="getTreatmentsByFlagSet">
```dart
var treatments = {};

_split.client(onReady: (client) async {
  treatments = await client.getTreatmentsByFlagSet('frontend');
});
```
</TabItem>
<TabItem value="getTreatmentsByFlagSets">
```dart
var treatments = {};

_split.client(onReady: (client) async {
  treatments = await client.getTreatmentsByFlagSets('frontend', 'client_side');
});
```
</TabItem>
</Tabs>

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](https://help.split.io/hc/en-us/articles/360026943552), use the `getTreatmentWithConfig` method.

This method returns an object containing the treatment and associated configuration:

```dart title="Flutter"
class SplitResult {
  final String treatment;
  final String? config;
}
```

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `null` for the config parameter.

This method taskes the exact set of arguments as the standard `getTreatment` method. See below examples on proper usage:

```dart title="getTreatmentWithConfig"
SplitResult result = await client.getTreatmentWithConfig('FEATURE_FLAG_NAME');
var configs = result.config;
var treatment = result.treatment;

if (treatment == 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment == 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to `SplitResult` objects instead of strings. Example usage below.

<Tabs>
<TabItem value="getTreatmentsWithConfig">
```dart
SplitResult result = await client.getTreatmentsWithConfig('FEATURE_FLAG_NAME');
var configs = result.config;
var treatment = result.treatment;

if (treatment == 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment == 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```
</TabItem>
<TabItem value="getTreatmentsWithConfigByFlagSet">
```dart
SplitResult result = await client.getTreatmentsWithConfigByFlagSet('frontend');
var configs = result.config;
var treatment = result.treatment;

if (treatment == 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment == 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```
</TabItem>
<TabItem value="getTreatmentsWithConfigByFlagSets">
```dart
SplitResult result = await client.getTreatmentsWithConfigByFlagSets(['frontend', 'client_side']);
var configs = result.config;
var treatment = result.treatment;

if (treatment == 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment == 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```
</TabItem>
</Tabs>

### Shutdown

Call the `client.destroy()` method once you've stopped using the client, as this method gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.

```dart title="Flutter"
/// You should call destroy() on the client once it is no longer needed:
_client.destroy();
```

After `destroy()` is called and finishes, any subsequent invocations to `getTreatment`/`getTreatments` or manager methods result in `control` or empty list, respectively.

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users' actions and metrics. [Learn more about using track events](https://help.split.io/hc/en-us/articles/360020585772).

In the examples below, you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are:

* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **TRAFFIC_TYPE:** (Optional) The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined Harness FME.
* **VALUE:** (Optional) The value is used to create the metric. The expected data type is **double**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about [event properties](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties). FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the client was able to successfully queue the event to be sent back to Harness servers on the next event post. The service returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method is provided.

In the case that a bad input is provided, you can read more about our [SDK's expected behavior](https://help.split.io/hc/en-us/articles/360020585772-Track-events).

```dart title="Flutter"
_split.client(onReady: (client) async {
  /// Named parameters are optional
  client.track('EVENT_TYPE',
      trafficType: 'TRAFFIC_TYPE',
      value: 120.25,
      properties: {'package': 'premium', 'admin': true, 'discount': 50});
});
```

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override values when instantiating the `Splitio`:

```dart title="Flutter"
final SplitConfiguration configurationOptions = SplitConfiguration(
  trafficType: 'user',
  logLevel: SplitLogLevel.debug,
  syncConfig: SyncConfig.flagSets('frontend', 'client_side'),
  persistentAttributesEnabled: true);

final Splitio _split =
  Splitio('YOUR_SDK_KEY', 'KEY', configuration: configurationOptions);
```

The parameters available for configuration are shown below.

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
| impressionsQueueSize | Default queue size for impressions. | 30K |
| enableDebug | Enabled verbose mode. | false |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism when in foreground. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | true |
| persistentAttributesEnabled | Enables saving attributes on persistent cache which is loaded as part of the SDK_READY_FROM_CACHE flow. All functions that mutate the stored attributes map affect the persistent cache. | false |
| impressionListener | Enables impression listener. If true, generated impressions stream in the impressionsStream() method of Splitio. | false |
| syncConfig | Use it to filter specific feature flags to be synced and evaluated by the SDK. It can be created with the `SyncConfig.flagSets('sets')` method (recommended, flag sets aree available in all tiers) or `SyncConfig(names: ["feature-flag-1", "feature-flag-2"])` for individual names. If not set, all flags are downloaded. | not set |
| syncEnabled | Controls the SDK continuous synchronization flags.  When `true`, a running SDK processes the rollout plan updates which is performed in Harness FME (default). When `false`, it fetches all data upon init, which ensures a consistent experience during a user session and optimizes resources when these updates are not consumed by the app. | true |
| userConsent | User consent status controls the tracking of events and impressions. Possible values are `UserConsent.granted`, `UserConsent.decline`, and `UserConsent.unknown`. See [User consent](#user-consent) for details. | `UserConsent.granted` |
| encryptionEnabled | Enables or disables encryption for cached data. | `false` |
| logLevel | Enables logging according to the level specified. Options are `SplitLogLevel.none`, `SplitLogLevel.verbose`, `SplitLogLevel.debug`, `SplitLogLevel.info`, `SplitLogLevel.warning`, and `SplitLogLevel.error`. | `SplitLogLevel.none` |
| impressionsMode | This configuration defines how impressions (decisioning events) are queued. Supported modes are `ImpressionsMode.optimized`, `ImpressionsMode.none`, and `ImpressionsMode.debug`. In `ImpressionsMode.optimized` mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In `ImpressionsMode.none` mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use `ImpressionsMode.none` when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In `ImpressionsMode.debug` mode, ALL impressions are queued and sent to Harness. This is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `ImpressionsMode.optimized` |
| readyTimeout | Maximum amount of time (in seconds) to wait until the `onTimeout` callback is fired or `whenTimeout` future is completed. A negative value means no timeout. | 10 seconds |
| certificatePinningConfiguration | If set, enables certificate pinning for the given domains. For details, see the [Certificate pinning](#certificate-pinning) section below. | null |

## Manager

Use these methods on Splitio instance to get a list of the feature flags available to the SDK factory client.

```dart title="Flutter"
/// Retrieves the feature flags that are currently registered with the SDK.
Future<List<SplitView>> splits();

/// Returns the feature flags registered with the SDK of this name.
Future<SplitView?> split(String splitName);

/// Returns the names of feature flags registered with the SDK.
Future<List<String>> splitNames();
```

The `SplitView` class referenced above has the following structure:

```dart title="Flutter"
class SplitView {
  String name;
  String trafficType;
  bool killed = false;
  List<String> treatments = [];
  int changeNumber;
  Map<String, String> configs = {};
  List<String> sets = [];
  String defaultTreatment;
}
```

## Listener

FME SDKs send impression data back to Harness servers periodically as a result of evaluating feature flags. To additionally send this information to a location of your choice, use the `impressionsStream`.

This provides a stream that publishes `Impression` objects every time one is generated.

```dart title="Flutter"
final Splitio _split = Splitio(_apiKey, _matchingKey,
  configuration: SplitConfiguration(
    trafficType: "user",
  ));

StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
  /// Fired each time an impression has been generated.
});
```

The `Impression` class has the following format.

```dart title="Flutter"
class Impression {
  final String? key;
  final String? bucketingKey;
  final String? split;
  final String? treatment;
  final num? time;
  final String? appliedRule;
  final num? changeNumber;
  final Map<String, dynamic> attributes;
}
```

An impression listener is called asynchronously from the corresponding evaluation, but is almost immediate.

## Logging

To enable logging, the `logLevel` setting is available in the configuration class:

```dart title="Setup logs"
final Splitio _split = Splitio(_sdkKey, _matchingKey,
  configuration: SplitConfiguration(
    logLevel: SplitLogLevel.debug,
  ));
```

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple SDK clients

FME supports the ability to release based on multiple traffic types. For example, with traffic types, you can release to `users` in one feature flag and `accounts` in another. If you are unfamiliar with using multiple traffic types, refer to the [Traffic type guide](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) for more information.

Each SDK factory client is tied to one specific customer ID at a time, so if you need to roll out feature flags by different keys, instantiate multiple SDK clients, one for each traffic type. For example, you may want to roll out the feature `USER_POLL` by `users` and the feature `ACCOUNT_PERMISSIONING` by `accounts`. You can do this with the example below:

```dart title="Flutter"
final Splitio _split = Splitio('YOUR_SDK_KEY', 'ACCOUNT_ID');

/// Create a client for the default key, in this case, the account id.
final SplitClient _accountClient = _split.client(onReady: (client) async {
  var userPollTreatment = client.getTreatment('USER_POLL');
});

/// To create another client for a user instead, just pass in a
/// User ID to the splitService.initClient() method. (This is only valid after
/// at least one client has been initialized).
final SplitClient _userClient = _split.client(
    matchingKey: 'USER_ID',
    onReady: (client) async {
      var accountPermissioningTreatment =
          client.getTreatment('ACCOUNT_PERMISSIONING');
    });

/// Track events for accounts
_userClient.track('PAGELOAD', value: 7.86);

/// Track events for users
_accountClient.track('ACCOUNT_CREATED');
```

:::info[Number of SDK instances]
While the SDK does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of clients down to **one** or **two**.
:::

### Subscribe to events

You can subscribe to four different callbacks when creating a client.

* `onReadyFromCache`. This event fires once the SDK is ready to evaluate treatments using a locally cached version of your rollout plan from a previous session (which might be stale). If there is data in the cache, this event fires almost immediately, since access to the cache is fast; otherwise, it doesn't fire.
* `onReady`. This event fires once the SDK is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `onTimeout`. This event fires if there is no cached version of your rollout plan in disk cache, and the SDK could not fully download the data from Harness servers within the time specified by the `readyTimeout` configuration parameter. This event does not indicate that the SDK initialization was interrupted. The SDK continues downloading the rollout plan and fires the `onReady` event when finished. This delayed `onReady` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `onUpdate`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

```dart title="Flutter"
final Splitio _split = Splitio('YOUR_SDK_KEY', 'ACCOUNT_ID');

_split.client(onReady: (client) {
  /// Client has fetched the most up-to-date definitions.
}, onReadyFromCache: (client) {
  /// Fired after the SDK could confirm the presence of the FME data.
  /// This event fires really quickly, since there's no actual fetching of information.
  /// Keep in mind that data might be stale, this is NOT a replacement of sdkReady.
}, onUpdated: (client) {
  /// Fired each time the client state changes, for example,
  /// when a feature flag or a segment changes.
}, onTimeout: (client) {
  /// Fired if the client was not able to be ready.
  /// GetTreatment can still be called but the result may be CONTROL.
});
```

You can also receive Futures (or a Stream, for the Update event) by accessing the following methods in the client.

```dart title="Flutter"
_client.whenReady().then((client) {
  /// Client has fetched the most up-to-date definitions.
});

_client.whenReadyFromCache((client) {
  /// Fired after the SDK could confirm the presence of the FME data.
  /// This event fires really quickly, since there's no actual fetching of information.
  /// Keep in mind that data might be stale, this is NOT a replacement of sdkReady.
});

StreamSubscription<SplitClient> streamSubscription = _client.whenUpdated().listen((client) {
  /// Fired each time the client state changes, for example,
  /// when a feature flag or a segment changes.
});

_client.whenTimeout().then((client) {
  /// Fired if the client was not able to be ready.
  /// GetTreatment can still be called but the result may be CONTROL.
});
```

### User consent

The plugin allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined.

The `userConsent` configuration parameter lets you set the initial consent status of the SDK, and the `Splitio` method `setUserConsent(enabled: bool)` lets you grant (enable) or decline (disable) the dynamic data tracking.

The following are the three possible initial states:

 * `UserConsent.granted`. The user grants consent for tracking events and impressions. The SDK sends them to the Harness FME servers. This is the default value if the `userConsent` param is not defined.
 * `UserConsent.declined`. The user declines consent for tracking events and impressions. The SDK does not send them to the Harness FME servers.
 * `UserConsent.unknown`. The user neither grants nor declines consent for tracking events and impressions. The SDK tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively. The status can be updated at any time with the `setUserConsent` factory method.

```dart title="User consent: initial config, getter and setter"
  // Overwrites the initial consent status of the factory instance, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
  // so the SDK locally tracks data but not send it to Harness FME servers until consent is changed to 'GRANTED'.

  final Splitio _split = Splitio(_sdkKey, _matchingKey,
    configuration: SplitConfiguration(
      userConsent: UserConsent.unknown,
    ));

  // Changed User Consent status to 'GRANTED'. Data will be sent to Harness FME servers.
  _split.setUserConsent(true);
  // Changed User Consent status to 'DECLINED'. Data will not be sent to Harness FME servers.
  _split.setUserConsent(false);

  // The 'getUserConsent' method returns User Consent status.
  // We expose the constants for customer checks and tracking.

  UserConsent userConsent = await _split.getUserConsent();
  if (userConsent == UserConsent.declined) {
    print("USER CONSENT DECLINED");
  }

  if (userConsent == UserConsent.granted) {
    print("USER CONSENT GRANTED");
  }

  if (userConsent == UserConsent.unknown) {
    print("USER CONSENT UNKNOWN");
  }
```

### Certificate pinning

The plugin allows you to constrain the certificates that it trusts, by pinning a certificate's `SubjectPublicKeyInfo` providing the public key as a ___base64 SHA-256___ hash or a ___base64 SHA-1___ hash.

Each pin corresponds to a host. For subdomains, you can optionally use wildcards, where `*` will match one subdomain (e.g. `*.example.com`), and `**` will match any number of subdomains (e.g `**.example.com`).

To set the plugin to require pinned certificates for specific hosts, add the `CertificatePinningConfiguration` object to the configuration, as shown below.

```dart title="Flutter"
    // Define pins for certificate pinning
    final CertificatePinningConfiguration pinningConfig = CertificatePinningConfiguration()

    // Provide a base 64 SHA-256 hash
    .addPin("*.example1.com", "sha256/7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=");

    // Set the CertificatePinningConfiguration property for the SDK factory client configuration
    SplitConfiguration config = SplitConfiguration(
          certificatePinningConfiguration: pinningConfig);

```

### Link with native factory

A native SplitFactory instance can be shared with the plugin to save resources when evaluations need to be performed on native platform logic. To do so, do the following:

#### Android

1. If not created already, create a subclass of Android's `Application`, and add its name to the Manifest.

```java title="Android"
public class CustomApplication extends Application {

}
```

```xml title="AndroidManifest.xml"
   <application
        android:label="my_app"
        android:name=".CustomApplication"
        android:icon="@mipmap/ic_launcher">
```

2. Add the Android SDK dependency to your project's `build.gradle` file.

```groovy title="Gradle"
dependencies {
    implementation 'io.split.client:android-client:split_version'
    ...
}
```

3. Create a property in your subclass of `Application` to hold your factory instance.
4. Initialize the factory in the `onCreate` callback of your `Application` subclass.

```java title="Android"
public class CustomApplication extends Application {
    private SplitFactory factory;

    @Override
    public void onCreate() {
        super.onCreate();

        try {
            factory = SplitFactoryBuilder
                .build("YOUR_SDK_KEY",
                    new Key("USER_KEY"),
                    SplitClientConfig.builder()
                        .build(),
                    getApplicationContext());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
```

5. Make the `Application` subclass implement the `SplitFactoryProvider` interface, and return the previously created factory in the overridden `getSplitFactory()` method.
```java title="Android"
public class CustomApplication extends Application implements SplitFactoryProvider {
    private SplitFactory factory;

    @Override
    public void onCreate() {
        ...
    }

    @Override
    public SplitFactory getSplitFactory() {
        return factory;
    }
}
```

#### iOS

1. Add the iOS SDK dependency to your app's `Podfile`.

```podfile title="Podfile"
  pod 'Split', '~> 2.15.0'
...
```

2. Add a property in your AppDelegate class to hold the factory instance. Make sure to import `Split`.

```swift title="iOS"
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {

  private var splitFactory: SplitFactory?

  ...
}
```

3. Initialize the factory just before the `GeneratedPluginRegistrant.register(with: self)` line.

```swift title="iOS"
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {

  private var splitFactory: SplitFactory?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    let config = SplitClientConfig()
    splitFactory = DefaultSplitFactoryBuilder()
            .setConfig(config)
            .setApiKey("YOUR_SDK_KEY")
            .setKey(Key(matchingKey: "USER_KEY"))
            .build()
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  ...
}
```

4. Implement the `SplitFactoryProvider` protocol in your `AppDelegate` and return the previously created factory in the overridden `getFactory()` method.

```swift title="iOS"
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate, SplitFactorProvider {

  private var splitFactory: SplitFactory?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    ...
  }

  func getFactory() -> SplitFactory? {
    splitFactory
  }
}
```

:::warning[Warning]
By using this method, all configuration declared when instantiating the Plugin in Flutter are ignored, since the factory is already instantiated and its configuration loaded.

Instantiating the factory natively prevents the plugin from setting up an Impression Listener, so impressions won't be accessible from Flutter. However, Impression Listeners can still be added and used in native code.
:::