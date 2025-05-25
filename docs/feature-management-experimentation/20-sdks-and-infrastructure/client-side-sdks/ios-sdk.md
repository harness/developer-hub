---
title: iOS SDK
sidebar_label: iOS SDK
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our iOS SDK. All of our SDKs are open source. Go to our [iOS SDK GitHub repository](https://github.com/splitio/ios-client) to see the source code.

## Language support

This library is compatible with iOS and tvOS deployment target versions 9.0+, macOS 10.11+, and watchOS 7.0+. Xcode 12 and later is also required, but we recommend the minimum version necessary to publish apps on the [AppStore](https://developer.apple.com/news/?id=ib31uj1j). 

## Initialization

To get started, set up FME in your code base with the two following steps.

### 1. Import the SDK into your project

#### Swift Package Manager

You can import the SDK in your project by using Swift Package Manager. This can be done through XCode or by editing manually the **Package.swift** file to add the iOS SDK repository as a dependency.

#### CocoaPods

You can also import the SDK into your Xcode project using CocoaPods, adding it in your **Podfile**.

```swift title="Podfile"
pod 'Split', '~> 3.2.0'
```

#### Carthage

This is another option to import the SDK. Just add it in your **Cartfile**.

```swift title="Cartfile"
github "splitio/ios-client" 3.2.0
```

Once added, follow the steps provided in the [Carthage Readme](https://github.com/Carthage/Carthage/blob/master/README.md#if-youre-building-for-ios-tvos-or-watchos).

### 2. Instantiate the SDK and create a new SDK factory client

The first time that the SDK is instantiated, it starts background tasks to update an in-memory cache and in-storage cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of the data.

If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while it is in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](https://help.split.io/hc/en-us/articles/360020528072-Control-treatment).

After the first initialization, the fetched data is stored. Further initializations fetch data from that cache and the configuration is available immediately.

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Configure the SDK with the SDK key for the FME environment that you would like to access. The SDK key is available in Harness FME Admin settings. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

```swift title="Swift"
import Split

// Your SDK key
let sdkKey: String = "YOUR_SDK_KEY"

//User Key
// key represents your internal user id, or the account id that 
// the user belongs to. 
// This could also be a UUID you generate for anonymous users.
let key: Key = Key(matchingKey: "key")

// Configuration
let config = SplitClientConfig()

//SDK Factory
let builder = DefaultSplitFactoryBuilder()
let factory = builder.setApiKey(sdkKey).setKey(key).setConfig(config).build()

//SDK Factory Client
let client = factory?.client
```

## Using the SDK

### Basic use

To make sure the SDK is properly loaded before asking it for a treatment, wait until the SDK is ready as shown below. We set the client to listen for the `sdkReady` event triggered by the SDK before asking for an evaluation.

Once the `sdkReady` event fires, you can use the `getTreatment` method to return the proper treatment based on the feature flag name you pass and the key you passed when instantiating the SDK.

From there, you need to use an if-else-if block as shown below and plug the code in for the different treatments that you defined in Harness FME. Make sure to remember the final else branch in your code to handle the client returning control.

```swift title="Swift"
client?.on(event: SplitEvent.sdkReady) {
  // Evaluate feature flag
  let treatment = client?.getTreatment("FEATURE_FLAG_NAME")

  if treatment == "on" {
      // insert code here to show on treatment
  } else if treatment == "off" {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
}
client?.on(event: SplitEvent.sdkReadyTimedOut) {
  //handle for timeouts here
  print("SDK time out")
}
```

Also, a `sdkReadyFromCache` event is available, which allows you to be aware of when the SDK has loaded data from cache. This way it is ready to evaluate feature flags using those locally cached definitions.

```swift title="Swift"
client?.on(event: SplitEvent.sdkReadyFromCache) {
  // Evaluate feature flag
  let treatment = client?.getTreatment("FEATURE_FLAG_NAME")

  if treatment == "on" {
      // insert code here to show on treatment
  } else if treatment == "off" {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
}
```

Starting from version 2.24.5, it is possible to configure the handler to run in a background thread or specify a custom queue.

<Tabs>
<TabItem value="Running in Background">
```swift
client?.on(event: SplitEvent.sdkReadyFromCache, runInBackground: true) {
  // Handler code
}
```
</TabItem>
<TabItem value="Custom Queue">
```swift
let customQueue = DispatchQueue(label: "custom-queue")
client?.on(event: SplitEvent.sdkReadyFromCache, queue: customQueue) {
  // Handler code
}
```
</TabItem>
</Tabs>


### Attribute syntax

To [target based on custom attributes](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes), the SDK's `getTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the Rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `Int64`.
* **Dates:** Use the value `TimeInterval`. For instance, the value for the `registered_date` attribute below is `Date().timeIntervalSince1970`, which is a `TimeInterval` value.
* **Booleans:** Use type `Bool`.
* **Sets:** Use type `[String]`.

```swift title="Swift"
var attributes: [String:Any] = [:]

attributes["plan_type"] = "growth"
attributes["registered_date"] = Date().timeIntervalSince1970
attributes["deal_size"] = 1000
attributes["paying_customer"] = true
let perms: [String] = ["read", "write"];
attributes["permissions"] = perms

// See client initialization above
let treatment = client?.getTreatment("FEATURE_FLAG_NAME", attributes: attributes)

if treatment == "on" {
    // insert code here to show on treatment
} else if treatment == "off" {
    // insert code here to show off treatment
} else {
    // insert your control treatment code here
}
```

### Binding attributes to the client

Attributes can be bound to the client at any time during the SDK lifecycle. These attributes will be stored in memory and used in every evaluation to avoid the need for keeping the attribute set accessible through the whole app. These attributes can be cached into the persistent caching mechanism of the SDK making them available for future sessions, as well as part of the SDK_READY_FROM_CACHE flow by setting the `persistentAttributesEnabled` to true. No need to wait for your attributes to be loaded at every session before evaluating flags that use them. 

When an evaluation is called, the attributes provided (if any) at evaluation time are combined with the ones already loaded into the SDK memory, with the ones provided at function execution time take precedence, enabling for those attributes to be overridden or hidden for specific evaluations. 

An attribute is considered valid if it follows one of the types listed below:
- String
- Number
- Boolean
- Array

The SDK validates these before storing them and if there are invalid or missing values, possibly indicating an issue, the methods return the boolean `false` and do not update any value.

The snippet below shows how to update these attributes:

```Swift
@objc public protocol SplitClient {

  /**
    Set one single attribute and returns true unless there is an issue storing it.
    If `persistentAttributesEnabled` config is enabled, the attribute is also written to the persistent cache.
  */
  func setAttribute(name: String, value: Any) -> Bool

  /**
    Retrieves the value of a given attribute stored in cache.
  */
  func getAttribute(name: String) -> Any?

  /**
    Set multiple attributes and returns true unless there is an issue storing them.
    If `persistentAttributesEnabled` config is enabled, the attributes are also written to the persistent cache.
  */
   func setAttributes(_ values: [String: Any]) -> Bool

  /**
    Retrieves a Map with the values of all attributes stored in cache.
  */
  func getAttributes() -> [String: Any]?

  /**
    Remove one single attribute and returns true unless there is an issue deleting it.
    If `persistentAttributesEnabled` config is enabled, the attribute is also deleted from the persistent cache and won't be available in a subsequent session.
  */
  func removeAttribute(name: String) -> Bool

  /**
    Clear the whole attribute cache and return true unless there is an issue with the operation and some attributes might still be cached.
    If `persistentAttributesEnabled` config is enabled, the attributes are also deleted from the persistent cache and won't be available in a subsequent session.
  */
  func clearAttributes() -> Bool
}
```

```swift title="Swift"
// Prepare a Map with several attributes
var attributes: [String:Any] = [:]
attributes["plan_type"] = "growth"
attributes["registered_date"] = Date().timeIntervalSince1970
attributes["deal_size"] = 1000

// Now set these on the client
let result = client.setAttributes(attributes)

// Set one attribute
let result = client.setAttribute(name: "registered_date", value: Date().timeIntervalSince1970)

// Get an attribute
let result = client.getAttribute(name: "registered_date")

// Get all attributes
let result = client.getAttributes()

// Remove an attribute
let result = client.removeAttribute(name: "deal_size")

// Remove all attributes
let result = client.clearAttributes()
```

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` method of the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

```swift title="Swift"
// Assuming client is an instance of a class that has these methods
let featureFlagNames = ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"]
let treatments = client.getTreatments(splits: featureFlagNames, attributes: nil)

let treatmentsByFlagSet = client.getTreatmentsByFlagSet("frontend", attributes: nil)

let flagSets = ["frontend", "client_side"]
let treatmentsByFlagSets = client.getTreatmentsByFlagSets(flagSets, attributes: nil)

// Treatments will have the following form:
// [
//   "FEATURE_FLAG_NAME_1": "on",
//   "FEATURE_FLAG_NAME_2": "visa"
// ]

// Treatments will have the following form:
// [
//   "FEATURE_FLAG_NAME_1": "on",
//   "FEATURE_FLAG_NAME_2": "visa"
// ]
```

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](https://help.split.io/hc/en-us/articles/360026943552), use the `getTreatmentWithConfig` methods. These methods returns an object containing the treatment and associated configuration.

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `null` for the config parameter.

This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

```swift title="Swift"
let result = client.getTreatmentWithConfig("new_boxes", attributes: attributes)
let config = try? JSONSerialization.jsonObject(with: result.config.data(using: .utf8)!, options: []) as? [String: Any]
let treatment = result.treatment
```

If you need to get multiple evaluations at once, you can also use `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to splitResults instead of strings. Refer to the example below.

```swift title="Swift"
let featureFlagList = ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2", "FEATURE_FLAG_NAME_3"]
let treatments = client?.getTreatmentsWithConfig(splits: featureFlagList, attributes: nil)

let treatmentsByFlagSet = client.getTreatmentsWithConfigByFlagSet("frontend", attributes: nil)

let flagSets = ["frontend", "client_side"]
let treatmentsByFlagSets = client.getTreatmentsWithConfigByFlagSets(flagSets, attributes: nil)

// treatments will have the following form:
// {
//   "FEATURE_FLAG_NAME_1": { "treatment": "on", "config": "{ \"color\":\"red\" }"},
//   "FEATURE_FLAG_NAME_2": { "treatment": "visa", "config": "{ \"color\":\"red\" }"}
// }
```

### Append properties to impressions

[Impressions](https://help.split.io/hc/en-us/articles/360020585192-Impressions) are generated by the SDK each time a `getTreatment` method is called. These impressions are periodically sent back to Split's servers for feature monitoring and experimentation.

You can append properties to an impression by passing an object of key-value pairs to the `getTreatment` method. These properties are then included in the impression sent by the SDK and can provide useful context to the impression data.

Three types of properties are supported: strings, numbers, and booleans.

```swift title="Swift"

let evaluationOptions: EvaluationOptions = EvaluationOptions(
    properties: [
        "package": "premium",
        "admin": true,
        "discount": 50
    ]
)

let treatment = getTreatment("FEATURE_FLAG_NAME", attributes: nil, evaluationOptions: evaluationOptions)
```

### Shutdown

Before letting your app shut down, call `destroy()` as it gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions and events.

```swift title="Swift"
client?.destroy()
```

Also, this method has a completion closure which can be used to run some code after destroy was executed. For instance, the following snippet waits until destroy has finished to continue execution:

```swift title="Swift"
let semaphore = DispatchSemaphore(value: 0)
client?.destroy(completion: {
    _ = semaphore.signal()
})
semaphore.wait()
```

After `destroy()` is called, any subsequent invocations to the `client.getTreatment()` or `manager` methods result in `control` or empty list respectively.

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users’ actions and metrics.

[Learn more](https://help.split.io/hc/en-us/articles/360020585772) about using track events in feature flags.

In the examples below, you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are:

* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`.
* **VALUE:** (Optional) The value used in creating the metric. This field can be sent in as null or 0 if you intend to only use the count function when creating a metric. The expected data type is **Double**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK was able to successfully queue the event sent back to Harness servers on the next event post. The SDK returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method is provided.

In case  a bad input is provided, you can read more about our SDK's expected behavior in our [Events](https://help.split.io/hc/en-us/articles/360020585772-Track-events) guide.

```swift title="Swift"
// Event without a value
let resp = client?.track(trafficType: "TRAFFIC_TYPE", eventType: "EVENT-TYPE")
// Example
let resp = client?.track(trafficType: "user", eventType: "page_load_time")

// If you would like to associate a value to an event
let resp = client?.track(trafficType: "TRAFFIC_TYPE", eventType: "EVENT-TYPE", value: VALUE)
// Example
let resp = client?.track(trafficType: "user", eventType: "page_load_time", value: 83.334)

// If you would like to associate just properties to an event
let resp = client?.track(trafficType: "TRAFFIC_TYPE", eventType: "EVENT-TYPE", properties: PROPERTIES)
// Example
let properties: [String:Any] = ["package": "premium", "discount": 50, "admin": true]
let resp = client?.track(trafficType: "user", eventType: "page_load_time", properties: properties)

// If you would like to send an event but you've already defined the traffic type in the config of the client
let resp = client?.track(eventType: "EVENT-TYPE")
// Example
let resp = client?.track(eventType: "page_load_time")

// If you would like to associate a value to an event and you've already defined the traffic type in the config of the client
let resp = client.track(eventType: "EVENT-TYPE", value: VALUE)
// Example
let resp = client?.track(eventType: "page_load_time", value: 83.334)

// If you would like to associate properties to an event and you've already defined the traffic type in the config of the client
let resp = client.track(eventType: "EVENT-TYPE", properties: PROPERTIES)
// Example
let properties: [String:Any] = ["package": "premium", "discount": 50, "admin": true]
let resp = client?.track(eventType: "page_load_time", proerties: properties)
```

## Manager

Use the Split Manager to get a list of feature flags available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

```swift title="Swift"
let apiKey: String = "YOUR_API_KEY"
let key: Key = Key(matchingKey: "key")
let config = SplitClientConfig()
let builder = DefaultSplitFactoryBuilder()
let factory =
builder.setApiKey(apiKey).setKey(key).setConfig(config).build()
let manager = factory?.manager
```

The Manager then has the following properties and methods available.

```swift title="Swift"
/**
 * Retrieves the feature flags that are currently registered with the
 * SDK.
 *
 * @return an array of SplitView or empty.
 */
var splits: [SplitView] { get }

/**
 * Returns the names of feature flags registered with the SDK.
 *
 * @return an array of String (feature flag names) or empty
 */
var splitNames: [String] { get }

/**
 * Returns the feature flag registered with the SDK of this name.
 *
 * @return SplitView or nil
 */
func split(featureName: String) -> SplitView?
```

The `SplitView` class referenced above has the following structure.

```swift title="Swift"
public class SplitView: NSObject, Codable {

    @objc public var name: String?
    @objc public var trafficType: String?
    @objc public var defaultTreatment: String?
    public var killed: Bool?
    @objc public var isKilled: Bool {
        return killed ?? false
    }
    @objc public var treatments: [String]?
    @objc public var sets: [String]?
    public var changeNumber: Int64?

    @objc public var changeNum: NSNumber? {
        return changeNumber as NSNumber?
    }
    @objc public var configs: [String: String]?
    @objc public var impressionsDisabled: Bool = false

}
```

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| featuresRefreshRate | The SDK polls Harness servers for changes to feature flags at this rate (in seconds). | 3600 seconds (1 hour) |
| segmentsRefreshRate | The SDK polls Harness servers for changes to segments at this rate (in seconds). | 1800 seconds (30 minutes) |
| impressionRefreshRate | The treatment log captures which customer saw what treatment (on, off, etc.) at what time. This log is periodically flushed back to Harness servers. This configuration controls how quickly the cache expires after a write (in seconds). | 1800 seconds (30 minutes) |
| impressionsQueueSize | Default queue size for impressions. | 30K |
| eventsPushRate | When using `.track`, how often the events queue is flushed to Harness servers. | 1800 seconds|
| eventsPerPush | Maximum size of the batch to push events. | 2000 |
| eventsFirstPushWindow | Amount of time to wait for the first flush. | 10 seconds |
| eventsQueueSize | When using `.track`, the number of **events** to be kept in memory. | 10000 |
| trafficType | (optional) The default traffic type for events tracked using the `track` method. If not specified, every `track` call should specify a traffic type. | not set |
| telemetryRefreshRate | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds (1 hour) |
| logLevel | Enables logging according to the level specified. Options are `NONE`, `VERBOSE`, `DEBUG`, `INFO`, `WARNING`, and `ERROR`. | `NONE` |
| synchronizeInBackground | Activates synchronization when application host is in background. | false |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism when in foreground. In the event of an issue with streaming, the SDK falls back to the polling mechanism. If false, the SDK polls for changes as usual without attempting to use streaming. | true |
| sync | Optional SyncConfig instance. Use it to filter specific feature flags to be synced and evaluated by the SDK. These filters can be created with the `SplitFilter::bySet` static function (recommended, flag sets are available in all tiers), or `SplitFilter::byName` static function, and appended to this config using the `SyncConfig` builder. If not set or empty, all feature flags are downloaded by the SDK. | null |
| offlineRefreshRate | The SDK periodically reloads the localhost mocked feature flags at this given rate in seconds. This can be turned off by setting it to -1 instead of a positive number. | -1 (off) |
| sdkReadyTimeOut | Amount of time in milliseconds to wait before notifying a timeout. | -1 (not set) |
| persistentAttributesEnabled | Enables saving attributes on persistent cache which is loaded as part of the SDK_READY_FROM_CACHE flow. All functions that mutate the stored attributes map affect the persistent cache.| false |
| syncEnabled | Controls the SDK continuous synchronization flags. When `true`, a running SDK processes rollout plan updates performed in Harness FME (default). When `false`, it fetches all data upon init, which ensures a consistent experience during a user session and optimizes resources when these updates are not consumed by the app. | true |
| impressionsMode | This configuration defines how impressions (decisioning events) are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, ALL impressions are queued and sent to Harness; this is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `OPTIMIZED` |
| userConsent | User consent status used to control the tracking of events and impressions. Possible values are `GRANTED`, `DECLINED`, and `UNKNOWN`. See the [User consent](#user-consent) section for details. | `GRANTED` |
| encryptionEnabled | Enables or disables encryption for cached data. | `false` |
| httpsAuthenticator | If set, the SDK uses it to authenticate network requests. To set this value, an implementation of SplitHttpAuthenticator must be provided. | `nil` |
| prefix | Allows to use a prefix when naming the SDK storage. Use this when using multiple `SplitFactory` instances with the same SDK key. | `nil` |
| certificatePinningConfig | If set, enables certificate pinning for the given domains. For details, see the [Certificate pinning](#certificate-pinning) section below. | null |

To set each of the parameters defined above, use the syntax below:

```swift title="Swift"
import Split

// Your SDK key
let sdkKey: String = "YOUR_SDK_KEY"

//User Key
let key: Key = Key(matchingKey: "key")

//Configuration
let config = SplitClientConfig()
config.impressionRefreshRate = 30
config.isDebugModeEnabled = false
let syncConfig = SyncConfig.builder()
                    .addSplitFilter(SplitFilter.bySet(["frontend"]))
                    .build()
config.sync = syncConfig

//SDK Factory
let builder = DefaultSplitFactoryBuilder()
let factory =
builder.setApiKey(sdkKey).setKey(key).setConfig(config).build()

//SDK Client
let client = factory?.client
```

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in 'localhost' mode. In this mode, the SDK neither polls nor updates Harness servers, rather it uses an in-memory data structure to determine what treatments to show to the customer for each of the features.

To use the SDK in localhost mode, replace the API Key with "localhost", as shown in the example below:

Since version 2.1.0, our SDK supports a new type of localhost feature flag definition file using the YAML format. This new format allows the user to map different keys to different treatments within a single feature flag, and add configurations to them. This file must be included into the project bundle and it is used as an initial file. It is copied to the cache folder, then it can be edited while app is running to simulate feature flag changes. When no file is added to the app bundle, an error occurs. The file periodically reloads. This period can be updated through the offlineRefreshRate config. Also, the refresh process can be turned off by setting this config to -1.

The new format is a list of single-key maps (one per mapping feature_flag-keys-config), defined as follows:

```yaml title="YAML"
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
 * The second entry defines that the feature flag `some_other_feature` will always return the `off` treatment and no configuration.
 * The third entry defines that `my_feature` always returns `off` for all keys that don't match another entry. In this case, any key other than `key`.
 * The fourth entry shows how an example to override a treatment for a set of keys.

You can set the name of the localhost YAML file within cache folder as shown in the example below:

```swift title="Swift"
// SDK key must be "localhost"
let apiKey: String = "localhost"
let key: Key = Key(matchingKey: "key")
let config = SplitClientConfig()
config.splitFile = "localhost.yaml"
let builder = DefaultSplitFactoryBuilder()
self.factory =
builder.setApiKey("localhost").setKey(key).setConfig(config).build()
```

If SplitClientConfig.splitFile is not set, the SDK maintains backward compatibility by trying to load the legacy file (.splits), now deprecated. In this mode, the SDK loads a local file called *localhost.splits* which has the following line format:

Starting from version 2.24.2, it is possible to update feature flag definitions programmatically by using the Localhost factory's `updateLocalhost` method, as shown below.

```swift title="Swift"
// SDK key must be "localhost"
let apiKey: String = "localhost"
let key: Key = Key(matchingKey: "key")
let config = SplitClientConfig()
let builder = DefaultSplitFactoryBuilder()
self.factory = builder.setApiKey("localhost").setKey(key).setConfig(config).build()

// SplitLocalhostDataSource protocol declares the updating methods
if guard let datasource = self.factory as? SplitLocalhostDataSource else { return }

// Yalm file content
datasource.updateLocalhost(yaml: yaml_content)

// Split file content
datasource.updateLocalhost(splits: splits_content)
```

FEATURE_FLAG_NAME TREATMENT

Additionally, you can include comments to the file starting a line with the ## character.

**Example:** A sample *localhost.splits* file

```bash title="Shell"
 ## This line is a comment
 ## Following line has feature flag = FEATURE_ONE and treatment = ON
 FEATURE_ONE ON
 FEATURE_TWO OFF
 ## Previous line has feature flag = FEATURE_TWO, treatment = OFF
```

By enabling debug mode, the *localhost* file location is logged to the console so that it's possible to open it with a text editor when working on the simulator. When using the device to run the app, the file can be modified by overwriting the app's bundle from the **Device and Simulators** tool.

## Listener

FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression handler*.

The SDK sends the generated impressions to the impression handler right away. As a result, be careful while implementing handling logic to avoid blocking the main thread. Generally speaking, you should create a separate thread to handle incoming impressions. Refer to the snippet below.

```swift title="Swift"
let config = SplitClientConfig()
config.impressionListener = { impression in
        // Do some work on main thread
        DispatchQueue.global().async {
            // Do some async work (use this most of the time!)
        }
}  

let key: Key = Key(matchingKey: "key")
let builder = DefaultSplitFactoryBuilder()
let factory =
builder.setApiKey(apiKey).setKey(key).setConfig(config).build()
let client = factory?.client
```

In regards with the data available here, refer to the `impression` objects interface and description of each field below. There are two fields in particular that are different for Swift and Obj-C so see the corresponding tab:

```swift title="Swift"
  feature: String?
  keyName: String?
  treatment: String?
  time: Int64?
  changeNumber: Int64?
  label: String?
  bucketingKey: String?
  attributes: [String: Any]?
```

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| keyName | String? | Key which is evaluated. |
| bucketingKey | String? | Key which is used for bucketing, if provided. |
| feature | String? | Feature flag which is evaluated. |
| treatment | String? | Treatment that is returned. |
| time/timestamp | Int64?/NSNumber? | Timestamp of when the impression is generated. |
| label | String? | Targeting rule in the definition that matched resulting in the treatment being returned. |
| changeNumber/changeNum | Int64?/NSNumber? | Date and time of the last change to the targeting rule that the SDK used when it served the treatment. It is important to understand when a change made to a feature flag got picked up by the SDKs and whether one of the SDK instances is not picking up changes. |
| attributes | [String: Any]? | A map of attributes passed to `getTreatment`/`getTreatments`, if any. |

## Flush

The flush() method sends the data stored in memory (impressions and events) to Harness FME servers and clears the successfully posted data. If a connection issue is experienced, the data will be sent on the next attempt.

```swift title="Swift"
client.flush()
```

## Background synchronization

Since version 2.11.0, background synchronization is available for devices having iOS 13+.
To enable this feature, just follow the next 4 steps:

1. Enable _[Background Mode Fetch](https://developer.apple.com/documentation/watchkit/background_execution/enabling_background_sessions)_ capability for your app.
2. Add the SDK background sync task identifier *io.split.bg-sync.task* to the Permitted background task scheduler identifiers section of the Info.plist .
3. Set the Split config flag _synchronizeInBackground_ to true .

```swift title="Swift"
let config = SplitClientConfig()
config.synchronizeInBackground = true

...
```

4. Schedule the background sync during app startup. e.g., _application(\_:didFinishLaunchingWithOptions:)_

```swift title="Swift"
SplitBgSynchronizer.shared.schedule()

...
```

:::warning[Important!]
Due to an iOS limitation for background fetch capability, only one task identifier is allowed for that purpose. If there is already a current background fetch identifier registered, background sync may not work.
:::

## Logging

To enable SDK logging, the `logLevel` setting is available in `SplitClientConfig` class:

```swift title="Setup logs"
// This setting type is `SplitLogLevel`. 
// The available values are .verbose, .debug, .info, .warning, .error and .none
  let config = SplitClientConfig() 
  config.logLevel = .verbose

  ...
```

The following shows an example output:

<p>
  <img src="/hc/article_attachments/15254306501901" alt="ios_log_example.png" />
</p>

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple SDK clients

In versions previous to 2.14.0, you had to create more that one SDK instance to evaluate for different users IDs. From v2.14.0 on, FME supports the ability to create multiple clients, one for each user ID. For example, if you need to roll out feature flags for different user IDs, you can instantiate multiple clients, one for each ID. You can then evaluate them using the corresponding client. You can do this using the example below:

```swift title="Swift"
// Create factory
let key = Key(matchingKey: "anonymous_user")
let config = SplitClientConfig()
let factory = DefaultSplitFactoryBuilder().setApiKey(authorizationKey)
    .setKey(key)
    .setConfig(config).build()

// Now when you call factory.client, the SDK will create a client
// using the anonymous_user key
// you passed in during the factory creation
let anonymousClient = factory.client

// To create another client for a user instead, pass in a User ID
let userClient = factory.client(matchingKey: "user_id")

// Add events handler for each client to be notified when SDK is ready
anonymousClient.on(event: SplitEvent.sdkReady, execute: {
  // anonymousClient is ready to evaluate
  // Check treatment for anonymous users
  let accountPermissioningTreatment = anonymousClient.getTreatment("some_feature_flag")
})

userClient.on(event: SplitEvent.sdkReady, execute: {
  // userClient is ready to evaluate
  // Check treatment for the feature flag and user_id
  let userPollTreatment = userClient.getTreatment("some_feature_flag")
})
```

:::info[Number of SDK instances]
While the SDK does not put any limitations on the number of instances that you can create, we strongly recommend keeping the number of SDKs down to **one** or **two**.
:::

### Subscribe to events

You can listen for four different events from the SDK.

* `sdkReadyFromCache`. This event fires once the SDK is ready to evaluate treatments using a locally cached version of your rollout plan from a previous session (which might be stale). If there is data in the cache, this event fires almost immediately, since access to the cache is fast; otherwise, it doesn't fire.
* ` sdkReady`. This event fires once the SDK is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* ` sdkReadyTimedOut`. This event fires if there is no cached version of your rollout plan in disk cache, and the SDK could not fully download the data from Harness servers within the time specified by the `sdkReadyTimeOut` property of the `SplitClientConfig` object. This event does not indicate that the SDK initialization was interrupted. The SDK continues downloading the rollout plan and fires the `sdkReady` event when finished.  This delayed `sdkReady` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `sdkUpdated`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

SDK event handling is done through the function `on(event:execute:)`, which receives a closure as an event handler.

The code within the closure is executed on the main thread. For that reason, running code in the background must be done explicitly.

The syntax to listen for an event is shown below.

```swift title="Swift"
...
let client = factory.client

client.on(event: SplitEvent.sdkReady, execute: {
    // The client is ready to evaluate treatments according to the latest feature flag definitions
    // Do some stuff on main thread
})

// Or
client.on(event: SplitEvent.sdkReadyTimedOut) {
  // This callback will be called if and only if the client is configured with ready timeout and
  // is not ready for that time or if the API key is wrong. 
  // You can still call getTreatment() but it could return CONTROL.

  // Do some stuff on main thread
}

client.on(event: SplitEvent.sdkReadyFromCache) {
  // Fired after the SDK could confirm the presence of the FME data.
  // This event fires quickly, since there's no actual fetching of information.
  // Keep in mind that data might be stale, this is NOT a replacement of sdkReady.

  // Do some stuff on main thread
}

client.on(event: SplitEvent.sdkUpdated) {
  // fired each time the client state change. 
  // For example, when a feature flag or segment changes.

  // Do some stuff on main thread
}

...
```

### User consent

The SDK allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined.

The `userConsent` configuration parameter lets you set the initial consent status of the SDK instance, and the factory method `setUserConsent(enabled: Bool)` lets you grant (enable) or decline (disable) dynamic data tracking.

There are three possible initial states:
 * `'GRANTED'`: The user grants consent for tracking events and impressions. The SDK sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: The user declines consent for tracking events and impressions. The SDK does not send them to Harness FME servers.
 * `'UNKNOWN'`: The user neither grants nor declines consent for tracking events and impressions. The SDK tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively.

The status can be updated at any time with the `setUserConsent` factory method.

Working with user consent is demonstrated below.

```swift title="User consent: Initial config, getter and setter"
  let config = SplitClientConfig()
  // Overwrites the initial consent status of the factory instance, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 

  // so the SDK locally tracks data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
  config.userConsent = .unknown
  guard let factory = DefaultSplitFactoryBuilder()
      .setApiKey("YOUR_SDK_KEY")
      .setKey(Key(matchingKey: "user_key"))
      .setConfig(config)
      .build() else {
      return
  }

  // Changed User Consent status to 'GRANTED'. Data will be sent to Harness FME servers.
  factory.setUserConsent(enabled: true);
  // Changed User Consent status to 'DECLINED'. Data will not be sent to Harness FME servers.
  factory.setUserConsent(enabled: false);

  // The 'getUserConsent' method returns User Consent status.
  // We expose the constants for customer checks and tracking.
  if (factory.userConsent == UserConsent.declined) {
      print("USER CONSENT DECLINED");
  }
  if (factory.userConsent == UserConsent.granted) {
      print("USER CONSENT GRANTED");
  }
  if (factory.userConsent == UserConsent.unknown) {
      print("USER CONSENT UNKNOWN");
  }
```

### Certificate pinning

The SDK allows you to constrain the certificates that the SDK trusts, using one of the following techniques:

1. Pin a certificate's `SubjectPublicKeyInfo`, by providing the public key as a ___base64 SHA-256___ hash or a ___base64 SHA-1___ hash.
2. Pin a certificate's entire certificate chain (the root, all intermediate, and the leaf certificate), by providing the certificate chain as a .der file.

Each pin corresponds to a host. For subdomains, you can optionally use wildcards, where `*` will match one subdomain (e.g. `*.example.com`), and `**` will match any number of subdomains (e.g `**.example.com`).

You can optionally configure a handler to execute on certificate validation failure for a host.

To set the SDK to require pinned certificates for specific hosts, add the `CertificatePinningConfig` object to `SplitClientConfig`, as shown below.

```swift title="Swift"
// Define pins for certificate pinning
let certBuilder = CertificatePinningConfig.builder()

// Provide a base 64 SHA-256 hash
certBuilder.addPin(host: "www.example1.com", hashKey: "sha256/7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=")

// Provide a certificate file name. This file has to be added to the bundle.
certBuilder.addPin(host: "www.example2.com", certificateName: "certificate.der")

// Set a failure handler
certBuilder.certificatePinningConfig { host in
  print("Failed validation for host \(host)")
}

// Set the CertificatePinningConfig property for the SDK factory client configuration
let config = SplitClientConfig()
config.certificatePinningConfig = certBuilder.build()
// you can add other configuration properties here

...
```