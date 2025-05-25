---
title: iOS RUM Agent
sidebar_label: iOS RUM Agent
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22545155055373-iOS-RUM-Agent </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about FME's Real User Monitoring (RUM) Agent for iOS.

FME's iOS RUM Agent collects events about your users' experience when they use your application and sends this information to FME services. This allows you to measure and analyze the impact of feature flag changes on performance metrics.

## Language Support

FME's iOS RUM Agent is designed for iOS applications written in Swift and is compatible with iOS SDK versions 12 and later.

## Initialization
 
Set up FME's RUM Agent in your code with the following three steps:

### 1. Import the Agent into your project

#### Swift Package Manager
Import the Agent into your project using Swift Package Manager pointing to the iOS RUM repo [URL](https://github.com/splitio/ios-rum). Currently, the last version is `0.4.0`.

#### Cocoa Pods
You can also import the Agent into your Xcode project using CocoaPods, adding it in your **Podfile**.

```swift title="Podfile"
pod 'SplitRum', '~> 0.4.0'
```

:::warning[Important]
If you get the `Sandbox: rsync.samba(19690) deny(1) file-read-data ...` error, make sure that the **ENABLE_USER_SCRIPT_SANDBOXING** project flag is set to 'No'
:::

### 2. Setup the Agent

To allow the Agent to send information to FME services, you need to call the `setup` method on the `SplitRum` object.

```swift title="Swift"
try? SplitRum.setup(apiKey: "YOUR_SDK_KEY")
```

:::warning[Important]
The Crashlytics framework has a compatibility issue that interferes with the proper functioning of RUM Agent when Crashlytics is initialized first. To resolve this, initialize the RUM Agent using the setup method before starting Crashlytics.

```swift
  try? SplitRum.setup(apiKey: "YOUR_SDK_KEY")
  FirebaseApp.configure()
```
:::

Alternatively, you can create a `SplitRumAgent-Info.plist` file with a key called `apiKey` and your SDK KEY as its value. Then call the `setup` method without parameters.

```xml title="SplitRumAgent-Info.plist configuration"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>apiKey</key>
	<string>YOUR_SDK_KEY</string>
</dict>
</plist>
```

```swift title="Swift"
try? SplitRum.setup()
```

Arguments passed to the `setup` method will override any value contained in the `SplitRumAgent-Info.plist`. When initializing the Agent, the `setup` method will throw an error if any parameter invalid, so this method must be called using a `try` clause.

### 3. Add an Identity

While the Agent will work without having an Identity, events won't be sent to FME services until at least one is set.

Identity objects consist of a key and a [traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type). You can only pass values that match the names of traffic types already defined in Harness FME.

 The RUM Agent provides methods to manage Identities, as shown in the table below.

```swift title="Swift"
// add one Identity
SplitRum.addIdentity(key: "my_user", trafficType: "user")

// add multiple Identities
SplitRum.add(identities: [
            SplitIdentity(key: "user_key1", trafficType: "user"),
            SplitIdentity(key: "user_key2", trafficType: "user")
            ])

// remove one Identity
SplitRum.removeIdentity(key: "my_user", trafficType: "user")

// remove all Identities
SplitRum.removeIdentities()
```

## Configuration

FME's iOS RUM Agent can be configured to change its default behavior. The following options are available:
- Log Level: level of logging. Valid values are `VERBOSE`, `DEBUG`, `INFO`, `WARNING`, `ERROR` and `NONE`.

 Log level can be configured using the `SplitRumAgent-Info.plist` file or programmatically. Values specified programmatically will override any of the same values specified in the configuration file.

Configuration using the manifest file:

```xml titlel="AndroidManifest.xml configuration"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>apiKey</key>
	<string>YOUR_SDK_KEY</string>
  <key>logLevel</key>
	<string>DEBUG</string>
</dict>
</plist>
```

Configuration specified programmatically:

```swift title="Swift"
let config = SplitRumConfig().logLevel(.verbose)
SplitRum.setup(apiKey: "YOUR_SDK_KEY", config: config)
```

## Events

FME's iOS RUM Agent collects a number of events by default.

### Default events and properties

| **Event type ID** | **Description** | **Has value?** | **Has properties?** |
| --- | --- | --- | --- |
| crash | Any unhandled error that causes the application to crash. | No | ```{ signal: int, message: string }``` |
| error | Errors tracked via the `trackError` method. | No | ```{ errorCode: int, errorMessage: string, isFatal: boolean, errorType: string, errorMethod: string }``` |
| app_start | Time in milliseconds elapsed until app is launched. | Yes | No |
| hangs | Sent if an application hang is detected. | No | No |
| device_info | Information provided by the OS about a device. This is sent the first time the Agent runs on the device. The device ID recorder is the ASIdentifierManager.shared().advertisingIdentifier value. | No | ```{ id: string, model: string, osName: string, osVersion: string }``` |

Each event for the metrics described above automatically includes a `session_id` property that can be use to filter certain events when defining Split metrics for experimentation purposes. Learn more about [metric definitions and how to define property filters](https://help.split.io/hc/en-us/articles/22005565241101-Metrics).

| **Name** | **Description** |
| --- | --- |
| session_id | ID of the session in which the event took place. |

## Automatic metric creation

FME will automatically create [metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) for a subset of the event types received from the iOS RUM Agent. These "out of the box metrics" are auto-created for you:

| **Event type** | **Metric name** | 
| --- | --- |
| split.rum.error | Count of Application Errors - Split Agents |
| split.rum.crash | Count of Crashes - Split Agents |
| split.rum.app_start | Average App Start Time - Split Agents |
| split.rum.anr | Count of ANRs - Split Agents |

For a metric that was auto-created, you can manage the [definition](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) and [alert policies](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting) like you would for any other metric. If you delete a metric that was auto-created, FME will not re-create the metric, even if the event type is still flowing.

## Advanced use cases

### Custom properties

Custom properties can be also added to a tracked event by using the various methods for managing them.

```swift title="Swift"
// add a single property
SplitRum.setProperty(name: "property_name", value: "property_value")

// add multiple properties
SplitRum.set(properties: ["property_name_1": "property_value_1", "property_name_2": "property_value_2"])

// remove property
func remove(property: "property_name")
```

### Custom events

Custom events can be tracked using the following options: 
- the `track` method
- the specialized `trackError` method
These methods are demonstrated below.

Using the `track` methods: 

```swift title="Swift"
// Examples
// Track event for an identity``
let result = SplitRum.track(eventType: "event_type_id",
                            userKey: "user",
                            trafficType: "traffic_type",
                            value: 100.0,
                            properties: ["property_name_1": "value1", "property_name_2": "value2"])

// Track event with value and properties
let result = SplitRum.track(eventType: "event_type_id",
                            value: 0.1,
                            properties: ["property_name_1": "value1", "property_name_2": "value2"])
```

Using the `trackError` method:

```swift title="Swift"
let errorInfo = SplitErrorEvent(message: "Error reaching server", isFatal: false).method("fetchData").code(-100).type(MyErrorEnum.type)
let result = SplitRum.track(error: SplitErrorEvent(message: "Error tracked manually", isFatal: true))
```

Using the `trackTimeFromStart` method. This method generates an event which value is the number of milliseconds between app launch and the moment the method is called.

```swift title="Swift"
SplitRum.trackTimeFromStart(marker: "data_loaded")
```

### User consent

By default the Agent will send events to Harness FME servers, but you can disable this behavior until user consent is explicitly granted.

The `userConsent` configuration parameter lets you set the initial consent status of the Agent, and the `SplitRum.setUserConsent(boolean)` method lets you grant (enable) or decline (disable) dynamic event tracking.

There are three possible initial states:
 * `'GRANTED'`: The user grants consent for tracking events and impressions. The SDK sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: The user declines consent for tracking events and impressions. The SDK does not send them to Harness FME servers.
 * `'UNKNOWN'`: The user neither grants nor declines consent for tracking events and impressions. The SDK tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively.

The status can be updated at any time with the `setUserConsent` factory method.

Working with user consent is demonstrated below.

```swift title="User consent: Initial config, getter and setter"
  // Overwrites the initial consent status of the factory instance, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
  let cfg = SplitRumConfig().userConsent(.unknown)

  // so the Agent locally tracks data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
  try? SplitRum.setup(apiKey: apiKey, config: config)

  // Changed User Consent status to 'GRANTED'. Data will be sent to Harness FME servers.
  SlitRum.setUserConsent(enabled: true);
  // Changed User Consent status to 'DECLINED'. Data will not be sent to Harness FME servers.
  SlitRum.setUserConsent(enabled: false);

  // The 'getUserConsent' method returns User Consent status.
  // We expose the constants for customer checks and tracking.
  if (SlitRum.userConsent == UserConsent.declined) {
      print("USER CONSENT DECLINED");
  }
  if (SlitRum.userConsent == UserConsent.granted) {
      print("USER CONSENT GRANTED");
  }
  if (SlitRum.userConsent == UserConsent.unknown) {
      print("USER CONSENT UNKNOWN");
  }
```