---
title: iOS SDK Reference
description: This topic explains how to use the Continuous Features (CF) SDK in your iOS application.
tags: 
   - helpDocs
   - Continuous features
   - SDK
   - iOS SDK
# sidebar_position: 2
helpdocs_topic_id: 6qt2v8g92m
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use the Harness Feature Flags iOS SDK for your iOS application. 

For getting started quickly, you can use our [sample code from the SDK README](https://github.com/harness/ff-ios-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [iOS SDK GitHub Repository.](https://github.com/harness/ff-ios-client-sdk)

The SDK caches your Feature Flags. If the cache can't be accessed, the `defaultValue` is used.

### Before you begin

Make sure you read and understand:

* [Feature Flags Overview](../../1-ff-onboarding/1-cf-feature-flag-overview.md)
* [Getting Started with Feature Flags](../../1-ff-onboarding/2-ff-getting-started/2-getting-started-with-feature-flags.md)
* [Client-Side and Server-Side SDKs](../1-sdk-overview/1-client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../1-sdk-overview/2-communication-sdks-harness-feature-flags.md)

## Version

The current version of this SDK is **1.0.3.**

## Requirements

* [Download the SDK from our GitHub repository](https://github.com/harness/ff-ios-client-sdk)
* Create an iOS application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-ios-client-sdk).
* [Create a Feature Flag on the Harness Platform](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md#step-3-create-an-sdk-key).

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

CocoaPods is built with Ruby and can be installed with the default Ruby on macOS. You can use a Ruby Version manager, however, we recommend that you use the standard Ruby available on macOS.To install the iOS using [CocoaPods](https://cocoapods.org//), complete the following steps:

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

For more information about Targets, go to [Targeting Users With Flags](../../2-ff-using-flags/4-ff-target-management/3-targeting-users-with-flags.md).

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
- (dash)  
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

The following allows you to listen for the different events triggered by SDK and deal with them as needed, for example:


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
				case .onMessage(let messageObj):  
					//An empty Message object has been received  
			}  
		}  
	}  
}
```
## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

## Close the SDK

To avoid memory leaks, we recommend closing your application when it's not in use:


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
