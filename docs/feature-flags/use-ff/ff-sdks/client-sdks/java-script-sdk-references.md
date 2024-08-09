---
title: JavaScript SDK reference
description: This topic explains how to use the Harness Feature Flags SDK in your JavaScript application.
sidebar_position: 400
helpdocs_topic_id: bmlvsxhp13
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/client-sdks/java-script-sdk-references
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />

This topic describes how to use the Harness Feature Flags Javascript SDK for your JavaScript application.

For getting started quickly, you can use our [sample code from the JavaScript SDK README](https://github.com/harness/ff-javascript-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [JavaScript SDK GitHub Repository.](https://github.com/harness/ff-javascript-client-sdk)

## Before You Begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-javascript-client-sdk/releases)

## Requirements

To use this SDK, make sure you:

* Create a JavaScript application to use with the SDK, or [clone our sample application](https://github.com/harness/ff-javascript-client-sdk) to use.
* Download the SDK from our [GitHub Repository](https://github.com/harness/ff-javascript-client-sdk).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create a Client SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key).

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
  import { initialize, Event } from 'https://unpkg.com/@harnessio/ff-javascript-client-sdk/dist/sdk.client.js'  
</script>
```
Make sure you install the latest version of the SDK, which you can view in [GitHub](https://github.com/harness/ff-javascript-client-sdk) and in [Version](#version).If you need to support browsers that no longer support ES modules, run the following script instead:


```
<script src="https://unpkg.com/@harnessio/ff-javascript-client-sdk/dist/sdk.client-iife.js"></script>  
<script>  
  var initialize = HarnessFFSDK.initialize  
  var Event = HarnessFFSDK.Event  
</script>
```
## Initialize the SDK

To initialize the JavaScript SDK, you need to:

1. Add your Client SDK key to connect to your Harness Environment.
2. Add a target that you want to evaluate against a Feature Flag.
3. (Optional) Configure the SDK.
4. Complete the initialization with the SDK using the client SDK Key, target, and Configuration parameters you set.

### Add your Client SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. Input the Client SDK Key into the `FeatureFlagSDKKey` parameter.

### Add a target

<details>
<summary>What is a target?</summary> 
Targets are used to control which users see which variation of a Feature Flag, for example, if you want to do internal testing, you can enable the flag for some users and not others. When creating a target, you give it a name and a unique identifier. Often targets are users but you can create a target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about targets, go to [Targeting users with flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).

To create a target, you **must enter an identifier** but you can optionally add a name and additional attributes.

The below shows the data type for each parameter:


```
interface Target {  
  identifier: string  
  name?: string  
  attributes?: object  
}
```
<details>
<summary> Regex requirements for target names and identifiers </summary>

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

When initializing the SDK, you also have the option of providing alternative configurations by using the `Options` interface.

```
interface Options {
  baseUrl?: string
  eventUrl?: string
  eventsSyncInterval?: number
  pollingInterval?: number
  pollingEnabled?: boolean
  streamEnabled?: boolean
  debug?: boolean
}
```

|                       |                                                                                                                                   |                                                        |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| Name                  | Description                                                                                                                       | Default value                                          |
| baseURL               | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: http://localhost:7000                 | `https://config.ff.harness.io/api/1.0`                 |
| eventUrl              | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0`                 |
| eventsSyncInterval    | The interval **in milliseconds** that we post flag evaluation metrics.                                                            | `60000` (milliseconds)                                 |
| pollingInterval       | The interval **in milliseconds** that we poll for changes when the SDK is running in polling mode.                                | `60000` (milliseconds)                                 |
| streamEnabled         | Set to `true` to enable streaming mode. Set to `false` to disable streaming mode.                                                 | `true`                                                 |
| pollingEnabled        | Set to `true` to enable polling mode. Set to `false` to disable polling mode.                                                     | `true`                                                 |
| debug                 | Set to `true` to enable SDK debug level logging. Set to `false` to disable debug level logging                                    | `false`                                                |


### Complete the initialization

Complete the initialization using the FeatureFlagSDKKey, target, and Options variables:


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
## Evaluate a flag

Evaluating a flag is when the SDK processes all flag rules and returns the correct variation of that flag for the target you provide. If a matching flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned.

There are different methods for the different variation types and for each method you need to pass in:

* Identifier of the flag you want to evaluate
* The default variation

The flag is evaluated against the target you pass in when initializing the SDK.
```
const value = cf.variation('Dark_Theme', false) // second argument is the default value when variation does not exist
```

### (Optional) Provide a set of evaluations

In some cases it might be useful to provide the SDK with a set of evaluations that it can serve instantly. You
might consider this when you need to:

- **Reduce application startup time** by providing default values or a snapshot of evaluations. For example, if your
  application is server-side generated, then it might make sense to retrieve evaluations on the server and provide them
  in the HTML of the page to be injected into the SDK.
- **Provide network redundancy** by allowing your app to detect network connectivity issues when accessing the service and loading evaluations from another source.

To provide a set of evaluations:

* Call the `setEvaluations` method at any time after initializing the client. The
`setEvaluations` method takes an array of `Evaluation` objects as an argument.

  ```typescript
  client.setEvaluations(evals);
  ```

  Where `Evaluation` is defined as:

  ```typescript
  export interface Evaluation {
    flag: string // Feature flag identifier
    identifier: string // variation identifier
    value: boolean | string | number | object | undefined // variation value
    kind: string // boolean | json | string | int
    deleted?: boolean // mark that feature flag is deleted
  }
  ```

## Streaming and polling mode
By default, Harness Feature Flags SDK has streaming enabled and polling enabled. Both modes can be toggled according to your preference using the SDK's configuration.

### Streaming mode
Streaming mode establishes a continuous connection between your application and the Feature Flags service.
This allows for real-time updates on feature flags without requiring periodic checks.
If an error occurs while streaming and `pollingEnabled` is set to `true`,
the SDK will automatically fall back to polling mode until streaming can be reestablished.
If `pollingEnabled` is `false`, streaming will attempt to reconnect without falling back to polling.

### Polling mode
In polling mode, the SDK will periodically check with the Feature Flags service to retrieve updates for feature flags. The frequency of these checks can be adjusted using the SDK's configurations.

### No streaming or polling
If both streaming and polling modes are disabled (`streamEnabled: false` and `pollingEnabled: false`),
the SDK will not automatically fetch feature flag updates after the initial fetch.
This means that after the initial load, any changes made to the feature flags on the Harness server will not be reflected in the application until the SDK is re-initialized or one of the modes is re-enabled.

This configuration might be useful in specific scenarios where you want to ensure a consistent set of feature flags
for a session or when the application operates in an environment where regular updates are not necessary. However, it's essential to be aware that this configuration can lead to outdated flag evaluations if the flags change on the server.

To configure the modes:

```typescript

const options = {
  streamEnabled: true, // Enable or disable streaming - default is enabled
  pollingEnabled: true, // Enable or disable polling - default is enabled if stream enabled, or disabled if stream disabled.
  pollingInterval: 60000, // Polling interval in ms, default is 60000ms which is the minimum. If set below this, will default to 60000ms.

}

const client = initialize(
        'YOUR_SDK_KEY',
        {
          identifier: 'Harness1',
          attributes: {
            lastUpdated: Date(),
            host: location.href
          }
        },
        options
)
```

## Listen for events

### Register the event listener

The `cf` method allows you to listen for the different events triggered by SDK and deal with them as needed, for example:


```
client.on(Event.READY, flags => {
  // Event happens when connection to server is established
  // flags contains all evaluations against SDK key
})

client.on(Event.FLAGS_LOADED, evaluations => {
  // Event happens when flags are loaded from the server
})

client.on(Event.CACHE_LOADED, evaluations => {
  // Event happens when flags are loaded from the cache
})

client.on(Event.CHANGED, flagInfo => {
  // Event happens when a changed event is pushed
  // flagInfo contains information about the updated feature flag
})

client.on(Event.DISCONNECTED, () => {
  // Event happens when connection is disconnected
})

client.on(Event.CONNECTED, () => {
  // Event happens when connection established
})

client.on(Event.POLLING, () => {
  // Event happens when polling begins
})

client.on(Event.POLLING_CHANGED, flagInfo => {
  // Event happens when SDK polls for flags
  // flagInfo contains the polled feature flags
})


client.on(Event.POLLING_STOPPED, () => {
  // Event happens when polling stops
})

client.on(Event.ERROR, error => {
  // Event happens when connection some error has occurred
})

client.on(Event.ERROR_AUTH, error => {
  // Event happens when unable to authenticate
})

client.on(Event.ERROR_FETCH_FLAGS, error => {
  // Event happens when unable to fetch flags from the service
})

client.on(Event.ERROR_FETCH_FLAG, error => {
  // Event happens when unable to fetch an individual flag from the service
})

client.on(Event.ERROR_METRICS, error => {
  // Event happens when unable to report metrics back to the service
})

client.on(Event.ERROR_STREAM, error => {
  // Event happens when the stream returns an error
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

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the flag on and off. Then, check your app to verify if the flag variation displayed is updated with the variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />

To close the SDK client, call the following function:

```
cf.close();
```

## Sample code for a JavaScript application

Here is a sample code for using Harness Feature Flag SDKs with a JavaScript application:


```
var initialize = HarnessFFSDK.initialize  
      var Event = HarnessFFSDK.Event  
  
      var log = msg => {  
        document.querySelector('#log').innerHTML += `$\{msg}\n`  
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
