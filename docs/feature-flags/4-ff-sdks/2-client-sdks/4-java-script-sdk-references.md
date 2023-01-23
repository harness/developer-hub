---
title: JavaScript SDK Reference
description: This topic explains how to use the Harness Feature Flags SDK in your JavaScript application.
tags: 
   - helpDocs
   - Javascript SDK
   - SDK
   - feature flag
# sidebar_position: 2
helpdocs_topic_id: bmlvsxhp13
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use the Harness Feature Flags Javascript SDK for your JavaScript application.

For getting started quickly, you can use our [sample code from the JavaScript SDK README](https://github.com/harness/ff-javascript-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [JavaScript SDK GitHub Repository.](https://github.com/harness/ff-javascript-client-sdk)

## Before You Begin

Make sure you read and understand:

* [Feature Flags Overview](../../1-ff-onboarding/1-cf-feature-flag-overview.md)
* [Getting Started with Feature Flags](../../1-ff-onboarding/2-ff-getting-started/2-getting-started-with-feature-flags.md)
* [Client-Side and Server-Side SDKs](../1-sdk-overview/1-client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../1-sdk-overview/2-communication-sdks-harness-feature-flags.md)

## Version

The current version of this SDK is **1.6.0.**

## Requirements

To use this SDK, make sure you:

* Create a JavaScript application to use with the SDK, or [clone our sample application](https://github.com/harness/ff-javascript-client-sdk) to use.
* Download the SDK from our [GitHub Repository](https://github.com/harness/ff-javascript-client-sdk).
* [Create a Feature Flag on the Harness Platform](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create a Client SDK key and make a copy of it](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md#step-3-create-an-sdk-key).

## Install the SDK

You can install the SDK using npm, Yarn, or by importing it directly from unpkg.

#### Install using npm

Run the following command:


```
npm i @harnessio/ff-javascript-client-sdk  

```
Then, import the SDK using the following command:


```
import { initialize, Event } from '@harnessio/ff-javascript-client-sdk'
```
#### Install using Yarn

Run the following command:


```
yarn add @harnessio/ff-javascript-client-sdk
```
Then, import the SDK using the following command:


```
import { initialize, Event } from '@harnessio/ff-javascript-client-sdk'
```
#### Install directly from unpkg

Run the following script:


```
<script type="module">  
  import { initialize, Event } from 'https://unpkg.com/@harnessio/ff-javascript-client-sdk@1.6.0/dist/sdk.client.js'  
</script>
```
Make sure you install the latest version of the SDK, which you can view in [GitHub](https://github.com/harness/ff-javascript-client-sdk) and in [Version](#version).If you need to support browsers that no longer support ES modules, run the following script instead:


```
<script src="https://unpkg.com/@harnessio/ff-javascript-client-sdk@1.6.0/dist/sdk.client.js"></script>  
<script>  
  var initialize = HarnessFFSDK.initialize  
  var Event = HarnessFFSDK.Event  
</script>
```
## Initialize the SDK

To initialize the JavaScript SDK, you need to:

1. Add your Client SDK key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. (Optional) Configure the SDK.
4. Complete the initialization with the SDK using the Client SDK Key, Target, and Configuration parameters you set.

### Add your Client SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. Input the Client SDK Key into the `FeatureFlagSDKKey` parameter.

### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Targeting Users With Flags](../../2-ff-using-flags/4-ff-target-management/3-targeting-users-with-flags.md).

To create a Target, you **must enter an identifier** but you can optionally add a name and additional attributes.

The below shows the data type for each parameter:


```
interface Target {  
  identifier: string  
  name?: string  
  anonymous?: boolean  
  attributes?: object  
}
```
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

### Configure the SDK

To configure the SDK, you can add `Options`, for example:


```
interface Options {  
  baseUrl?: string  
  debug?: boolean  
}
```
### Complete the initialization

Complete the initialization using the FeatureFlagSDKKey, Target, and Options variables:


```
initialize(FeatureFlagSDKKey: string, target: Target, options?: Options)
```
For example:


```
const cf = initialize('00000000-1111-2222-3333-444444444444', {  
    identifier: YOUR-TARGET-IDENTIFIER,      // Target identifier  
    name: YOUR-TARGET-NAME,                  // Optional target name  
    attributes: {                            // Optional target attributes  
      email: 'sample@sample.com'  
    }  
  });
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

The Flag is evaluated against the Target you pass in when initializing the SDK.
```
const value = cf.variation('Dark_Theme', false) // second argument is the default value when variation does not exist
```
## Listen for events

### Register the event listener

The `cf` method allows you to listen for the different events triggered by SDK and deal with them as needed, for example:


```
cf.on(Event.READY, flags => {  
  // Event happens when connection to server is established  
  // flags contains all evaluations against SDK key  
})  
  
cf.on(Event.CHANGED, flagInfo => {  
  // Event happens when a changed event is pushed  
  // flagInfo contains information about the updated feature flag  
})  
  
cf.on(Event.DISCONNECTED, () => {  
  // Event happens when connection is disconnected  
})  
  
cf.on(Event.ERROR, () => {  
  // Event happens when a connection error has occurred  
})
```
### Close the event listener

To turn off the listeners, use `cf.off`. You can turn off the listener when there is an error, or turn off all listeners on command.

**Turn off listener when there is an error:**


```
cf.off(Event.ERROR, () => {  
  // Do something when an error occurs  
})
```
**Turn off all listeners:**


```
cf.off()
```
## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

## Close the SDK

When closing your application, call `cf.close()` to close the SDK.


```
cf.close();
```
## Sample code for a JavaScript application

Here is a sample code for using Harness Feature Flag SDKs with a JavaScript application:


```
var initialize = HarnessFFSDK.initialize  
      var Event = HarnessFFSDK.Event  
  
      var log = msg => {  
        document.querySelector('#log').innerHTML += `${msg}\n`  
      }  
  
      var cf = initialize(  
        'ed56f3ec-1aa6-4bc2-a519-6ebcc3f0541f',  
        {  
          identifier: 'Harness1',  
          attributes: {  
            lastUpdated: Date(),  
            host: location.href  
          }  
        }  
      )  
  
      cf.on(Event.READY, flags => {  
        log(JSON.stringify(flags, null, 2))  
      })  
  
      cf.on(Event.CHANGED, flagInfo => {  
        if (flagInfo.deleted) {  
          log('Flag is deleted')  
          log(JSON.stringify(flagInfo, null, 2))  
        } else {  
          log('Flag is changed')  
          log(JSON.stringify(flagInfo, null, 2))  
        }  
      })
```
