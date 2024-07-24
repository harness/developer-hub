---
title: iOS SDK reference
description: This topic explains how to use the Continuous Features (CF) SDK in your iOS application.
sidebar_position: 30
helpdocs_topic_id: 6qt2v8g92m
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/client-sdks/ios-sdk-reference 
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />

This topic describes how to use the Harness Feature Flags iOS SDK for your iOS application. 

For getting started quickly, you can use our [sample code from the SDK README](https://github.com/harness/ff-ios-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [iOS SDK GitHub Repository.](https://github.com/harness/ff-ios-client-sdk)

The SDK caches your Feature Flags. If the cache can't be accessed, the `defaultValue` is used.

### Before you begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-ios-client-sdk/releases)

## Requirements

* [Download the SDK from our GitHub repository](https://github.com/harness/ff-ios-client-sdk)
* Create an iOS application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-ios-client-sdk).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key).

## Install the SDK

You can install the iOS SDK using the following dependency managers:

* Swift Package Manager (SPM)
* CocoaPods
* Carthage

### Install using SwiftPM

If you are using [Swift Package Manager](https://swift.org/package-manager/), you can add the SDK as a dependency in either an Xcode project or in a Package.swift file:

**Xcode**:

Select **File > Swift Packages > Add Package Dependency** and enter the [iOS SDK repository clone URL](https://github.com/harness/ff-ios-client-sdk), then select your desired version constraints.

**Package.swift:**

Add `ff-ios-client-sdk` to the dependencies section of your `Package.swift` file, for example:


```
dependencies: [  
      .package(url: "https://github.com/drone/ff-ios-client-sdk.git", .upToNextMinor(from: "1.0.3"))  
]
```
### Install using CocoaPods

CocoaPods is built with Ruby and can be installed with the default Ruby on macOS. You can use a Ruby Version manager, however, we recommend that you use the standard Ruby available on macOS.To install the iOS using [CocoaPods](https://cocoapods.org/), complete the following steps:

1. To install CocoaPods using the default Ruby available on macOS, use the `sudo` command when installing the gems, for example:
```
$ sudo gem install cocoapods
```
2. Once Cocoapods is installed, create a `Podfile` in your root project folder:
```
$ pod init
```
3. Import the `ff-ios-client-sdk` to your `.xcproject`. To do this,  add `ff-ios-client-sdk` to your newly created Podfile, for example:
```
platform :ios, '10.0'  
use_frameworks!  
  
target 'MyApp' do  
  pod 'ff-ios-client-sdk'  
end  

```
Then, save the changes.
4. Use the install command to install the packages:
```
$ pod install
```
Make sure that you are using `.xcworkspace`  instead of your `.xcodeproj`  to utilize the imported Pods.

### Install using Carthage

To integrate your application using Carthage, complete the following step:

1. Go to the root folder of your project and create a `Cartfile`. This where you put all the dependencies that you use with Carthage:
```
$ touch Cartfile
```
2. Add the following line to your `Cartfile`:
```
github "drone/ff-ios-client-sdk"
```
3. Fetch the source for `ff-ios-client-sdk` from the repository specified in the `Cartfile`:
```
$ carthage update --no-build
```
A new folder `Carthage` is created at the same location as `Cartfile` and `.xcodeproj`. In the `Carthage` folder, another folder called `Checkout` is created, this folder contains the source code.

4. Create a project for `ff-ios-client-sdk` dependency.

	1. Run the following command from your project's root folder:
	```
	//From your project's root folder  
	$ cd Carthage/Checkouts/ff-ios-client-sdk
	```
	2. Then run the following command:
	```
	$ swift package generate-xcodeproj
	```
	3. Or, you can enter it all on the same line:
	```
	//From your project's root folder  
	$ cd Carthage/Checkouts/ff-ios-client-sdk && swift package generate-xcodeproj
	```
5. Build the project and place it in the `Build` folder next to `Checkouts`. Run the following command from your project's root folder:
```
$ carthage build --use-xcframeworks --platform iOS
```
6. In your application targets’ **General** tab, in the **Frameworks**, **Libraries**, and **Embedded Content**, drag and drop the `.xcframework` file from the `Carthage/Build` folder.
7. In **Embed**, select **Embed & Sign**.
8. Import the `ff_ios_client_sdk`.
9. (Optional) When a new version of `ff-ios-client-sdk` is available and you want to update this dependency, run:
```
$ carthage update --use-xcframeworks --platform iOS
```

## Import the SDK

To import the SDK, use the following command:


```
import ff_ios_client_sdk
```
## Initialize the SDK

To initialize the iOS SDK, you need to:

1. Add your Client SDK key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. (Optional) Configure the SDK options.
4. Complete the initialization with the SDK using the Client SDK Key, Target, and Configuration parameters you set.

### Add your Client SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. Input the Client SDK Key into the `apiKey` parameter.

### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).

To add a Target, build it using `CfTarget.builder` and pass in arguments for the following:



|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| identifier | ID of the Target.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Required | `.identifier("HT_1")` |

<details>
<summary> Regex requirements for Target names and identifiers </summary>

**Identifier** 

Regex: `^[A-Za-z0-9.@_-]*$`  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
  
The characters can be lowercase or uppercase but cannot include accented letters, for example `Cafe_789`.  
  
**Name**
Regex: `^[\\p{L}\\d .@_-]*$`  
  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
 (space)  
  
The characters can be lowercase or uppercase and can include accented letters, for example `Café_123`.

</details>


For example:


```
let target = CfTarget.builder().setIdentifier("HT_1").build()
```
### Configure the SDK

You can configure the following features of the SDK:



|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Default Value** |
| baseUrl | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, make sure the URL you provide is publicly available. | `https://config.ff.harness.io/api/1.0` |
| eventUrl | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, make sure the URL you provide is publicly available. | `https://events.ff.harness.io/api/1.0` |
| pollInterval | The interval **in seconds** that we poll for changes when you are using stream mode. | `60` (seconds) |
| streamEnabled | Set to `true` to enable streaming mode.Set to `false` to disable streaming mode. | `true` |
| analyticsEnabled | Set to `true` to enable analytics.Set to `false` to disable analytics.**Note**: When enabled, analytics data is posted every 60 seconds. | `true` |

Use `cfConfiguration.builder` to declare the configuration options you want to use, for example:


```
let configuration = CfConfiguration.builder().setStreamEnabled(true).build()
```
### Complete the initialization

Complete the initialization using the `apiKey`, `configuration`, and `target` variables, for example:


```
CfClient.sharedInstance.initialize(apiKey: "YOUR_API_KEY", configuration: configuration, target: target)
```
Additionally, you can also pass in a `cache:onCompletion` object that adopts the `StorageRepositoryProtocol`. This is optional, if you choose not to use it the internal built-in cache will be used instead.

### Sample of initializing the SDK

initialize(apiKey:configuration:cache:onCompletion:)


```
let configuration = CfConfiguration.builder().setStreamEnabled(true).build()  
let target = CfTarget.builder().setIdentifier("Harness_Target_1").build()  
CfClient.sharedInstance.initialize(apiKey: "YOUR_API_KEY", configuration: configuration, target: target) { (result) in  
	switch result {  
		case .failure(let error):  
			//Do something to gracefully handle initialization/authorization failure  
		case .success:  
			//Continue to the next step after successful initialization/authorization    
	}  
}
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

The Flag is evaluated against the Target you pass in when initializing the SDK.

#### Evaluate a string Variation


```
CfClient.sharedInstance.stringVariation("your_evaluation_id", defaultValue: String?) { (evaluation) in  
	//Make use of the fetched `String` Evaluation  
}
```
### Evaluate a boolean Variation


```
CfClient.sharedInstance.boolVariation("your_evaluation_id", defaultValue: Bool?) { (evaluation) in  
	//Make use of the fetched `Bool` Evaluation  
}
```
### Evaluate a number Variation


```
CfClient.sharedInstance.numberVariation("your_evaluation_id", defaultValue: Int?) { (evaluation) in  
	//Make use of the fetched `Int` Evaluation  
}
```
### Evaluate a JSON Variation


```
CfClient.sharedInstance.jsonVariation("your_evaluation_id", defaultValue: [String:ValueType]?) { (evaluation) in  
	//Make use of the fetched `[String:ValueType]` Evaluation  
}
```
`ValueType` can be one of the following:

* ValueType.bool(Bool)
* ValueType.string(String)
* ValueType.int(Int)
* ValueType.object([String:ValueType])

## Listen for events


The `registerEventsListener` method provides a way to register a listener for different events that might be triggered by SDK.

The possible events, reasons for being emitted, and their responses are outlined in the following table:



|                 |                                                                                                                                                                                                                                                                                                                                                                                                                                             |                |
|-----------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| **EVENT\_TYPE** | **Reason**                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Response**   |
| onOpen          | The SDK has successfully opened a streaming connection to the Feature Flags service, and is listening for events. No further action required from your application code.                                                                                                                                                                                                                                                                    | -              |
| onComplete      | The SDK has closed the streaming connection to the Feature Flags service and is no longer listening for events. <br/>This can happen if the SDK is shutdown, of if there is a transient networking issue, and the SDK will attempt to reconnect. In both cases, no further action is required.                                                                                                                                              | -              |
| onEventListener | The SDK has streamed a new evaluation after a flag has been changed using the Harness web application. You should evaluate any flags to get the latest variation. <br/>*Note* this is for individual flag changes only, and this event is not applicable to target group changes. <br/>See `EVALUATION_RELOAD` for streaming target group changes.                                                                                          | `Evaluation`   |
| onPolling       | This event can be emitted for 3 reasons. <br/>1) A target group change has been made using the Harness web application, and all evaluations has been reloaded. <br/>2) Streaming has been disabled and the SDK is in polling mode, and a poll has completed which has reloaded all evaluations. <br/>3) The SDK has disconnected from the stream and has entered polling mode, and a poll has completed which has reloaded all evaluations. | `[Evaluation]` |


```
CfClient.sharedInstance.registerEventsListener() { (result) in  
	switch result {  
		case .failure(let error):  
			//Gracefully handle error  
		case .success(let eventType):  
			switch eventType {  
				case .onPolling(let evaluations):  
					//Received all evaluation flags -> [Evaluation]  
				case .onEventListener(let evaluation):  
					//Received an evaluation flag -> Evaluation  
				case .onComplete:  
					//Received a completion event, meaning that the   
					//SSE has been disconnected  
				case .onOpen(_):  
					//SSE connection has been established and is active  
			}  
		}  
	}  
}
```
## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />

To close the SDK client, call this method:

```
CfClient.sharedInstance.destroy() 
```
You also need to call this method when changing accounts on the `CfTarget` object to re-initialize and fetch Evaluations for the correct Target.

## Additional options

### Using our public API methods

You can also use the public API methods to initialize and implement the Feature Flag iOS SDKs. All the below methods are called on `CfClient.sharedInstance`.

The Public API exposes the following methods that you can utilize:


```
public func initialize(apiKey:configuration:target:cache:onCompletion:)
```

```
public func stringVariation(evaluationId:defaultValue:completion:)
```

```
public func boolVariation(evaluationId:defaultValue:completion:)
```

```
public func numberVariation(evaluationId:defaultValue:completion:)
```

```
public func jsonVariation(evaluationId:defaultValue:completion:)
```

```
public func registerEventsListener(events:onCompletion:)
```

```
public func destroy()
```
## Sample code for an iOS application

Here is a sample code for using the Harness iOS SDK with an iOS application:


```
import UIKit  
import ff_ios_client_sdk  
class ViewController: UIViewController {  
  override func viewDidLoad() {  
    super.viewDidLoad()  
    NSLog("Start")  
    let config = CfConfiguration.builder()  
      .setStreamEnabled(true)  
      .build()  
    let target = CfTarget.builder().setIdentifier("Harness").build()  
    CfClient.sharedInstance.initialize(  
      apiKey: "YOUR_API_KEY,  
      configuration:config,  
      target: target  
    ) { [weak self] result in  
      switch result {  
        case .failure(let error):  
          NSLog("End: Error \(error)")  
        case .success():  
          NSLog("Init: Ok")  
          CfClient.sharedInstance.boolVariation(evaluationId: "EVALUATION_ID", { (eval) in  
            print("Value: \(eval!)")  
          })  
          CfClient.sharedInstance.registerEventsListener() { (result) in  
            switch result {  
              case .failure(let error):  
                print(error)  
              case .success(let eventType):  
                switch eventType {  
                  case .onPolling:  
                    print("Event: Received all evaluation flags")  
                  case .onEventListener(let evaluation):  
                    print("Event: Received an evaluation flag, \(evaluation!)")  
                  case .onComplete:  
                    print("Event: SSE stream has completed")  
                  case .onOpen:  
                    print("Event: SSE stream has been opened")  
                  case .onMessage(let messageObj):  
                    print(messageObj?.event ?? "Event: Message received")  
                }  
            }  
          }  
      }  
    }  
  }  
  override func viewWillDisappear(_ animated: Bool) {  
    CfClient.sharedInstance.destroy()  
    NSLog("End: Ok")  
    super.viewWillDisappear(animated)  
  }  
}  

```

## Troubleshooting 

The SDK logs the following codes for certain lifecycle events, for example authentication, which can aid troubleshooting.

| **Code** | **Description**                                                                                               | **Log Level** |
|----------|:--------------------------------------------------------------------------------------------------------------|---------------|
| **1000** | Successfully initialized                                                                                      | Info          |
| **1001** | Failed to initialize due to authentication error                                                              | Error         |
| **1002** | Failed to initialize due to a missing or empty API key                                                        | Error         |
| **1003** | `WaitForInitialization` configuration option was provided and the SDK is waiting for initialization to finish | Info          |
| **2000** | Successfully authenticated                                                                                    | Info          |
| **2001** | Authentication failed with a non-recoverable error                                                            | Error         |
| **2002** | Authentication failed and is retrying                                                                         | Warn          |
| **2003** | Authentication failed and max retries have been exceeded                                                      | Error         |
| **3000** | SDK closing                                                                                                   | Info          |
| **3001** | SDK closed successfully                                                                                       | Info          |
| **4000** | Polling service started                                                                                       | Info          |
| **4001** | Polling service stopped                                                                                       | Info          |
| **5000** | Streaming connected                                                                                           | Info          |
| **5001** | Streaming disconnected                                                                                        | Warn          |
| **5002** | Streaming event received                                                                                      | Debug         |
| **5003** | Streaming disconnected and is retrying to connect                                                             | Info          |
| **5004** | Streaming service stopped                                                                                     | Info          |
| **5005** | Stream is still retrying to connect after 4 attempts                                                          | Warn          |
| **6000** | Evaluation was successful                                                                                     | Debug         |
| **6001** | Evaluation failed and the default value was returned                                                          | Info          |
| **7000** | Metrics service has started                                                                                   | Info          |
| **7001** | Metrics service has stopped                                                                                   | Info          |
| **7002** | Metrics posting failed                                                                                        | Warn          |
| **7003** | Metrics posting success                                                                                       | Debug         |

