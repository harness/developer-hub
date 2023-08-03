---
title: React Native SDK reference
description: This topic explains how to use the Harness Feature Flags SDK in your React Native application.
sidebar_position: 50
helpdocs_topic_id: z2w6uj9mzb
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />


This topic describes how to use the Harness Feature Flags SDK for your React Native application. 

For getting started quickly, you can use our [sample code from the SDK README](https://github.com/harness/ff-react-native-client-sdk). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [React Native SDK GitHub Repository](https://github.com/harness/ff-react-native-client-sdk).

## Before You Begin

* [Getting Started with Feature Flags](/docs/feature-flags/ff-onboarding/getting-started-with-feature-flags)
* [Feature Flags Overview](../../ff-onboarding/cf-feature-flag-overview.md)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

The current version of this SDK is **1.0.2.**

## Prerequisites

To use this SDK, make sure you: 

* Install [React 16](https://reactjs.org/) or newer.
* Install [React Native 0.63](https://reactnative.dev/docs/environment-setup) or newer.
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-react-native-client-sdk)
* Create a React Native application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-react-native-client-sdk).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/ff-creating-flag/create-a-project#create-an-sdk-key)

## Install the SDK

To set up the React Native SDK, complete the following steps:

### Install directly to the package.json file

Install the React Native SDK by adding it to your project's `package.json` file:


```
"ff-react-native-client-sdk": "1.0.2",
```
### Install using npm

You can also use `npm install`:


```
$ npm install --save ff-react-native-client-sdk
```
### Install on IOS

For installing on iOS, run the following commands from the project root folder:


```
$ cd ios  
$ pod install
```
## Initialize the SDK

To initialize the React Native SDK, you need to:

1. Import the `cfClientInstance` base instance. This provides all the features of the SDK.
2. Add your Client SDK key to connect to your Harness Environment.
3. Add a Target that you want to Evaluate against a Feature Flag.
4. (Optional) Configure the SDK options.
5. Complete the initialization with the SDK using the Client SDK Key, Target, and Configuration parameters you set.

### Import the base instance

Use the following command to import the `cfClientInstance` base instance:


```
import cfClientInstance from 'ff-react-native-client-sdk';
```
### Add your Client SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. Input the Client SDK Key into the `apiKey` parameter, for example:


```
const apiKey = "YOUR_API_KEY";
```
### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/ff-target-management/targeting-users-with-flags).

To add a Target that you want to Evaluate, build it using `cfTarget` and pass in arguments for the following:


|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| identifier | Unique ID for the Target. | Required | `.identifier("HT_1")` |

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
const cfTarget = new CfTarget();  
cfTarget.identifier = 'HT_1';
```
### Configure the SDK

You can configure the following features of the SDK:



|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Example** | **Description** | **Default Value** |
| baseUrl | `baseUrl = "``https://config.ff.harness.io/api/1.0"``;` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://config.ff.harness.io/api/1.0` |
| eventUrl | `eventUrl = "``https://events.ff.harness.io/api/1.0"``;` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |
| pollInterval | `pollInterval = 60;` | The interval **in seconds** that we poll for changes when you are using stream mode. | `60` (seconds) |
| streamEnabled | `streamEnabled = true;` | Set to `true` to enable streaming mode.Set to `false` to disable streaming mode. | `true` |
| analyticsEnabled | `analyticsEnabled = true;` | Set to `true` to enable analytics.Set to `false` to disable analytics.**Note**: When enabled, analytics data is posted every 60 seconds. | `true` |

Use `cfConfiguration` to declare the configuration options you want to use, for example:


```
const cfConfiguration = new CfConfiguration();  
cfConfiguration.streamEnabled = false;
```
### Complete the initialization

Complete the initialization using the apiKey, cfConfiguration, and cfTarget variables, for example:


```
const result = await cfClientInstance.initialize(apiKey, cfConfiguration, cfTarget);
```
### Sample of initializing the SDK


```
import cfClientInstance, {CfConfiguration, CfTarget} from 'ff-react-native-client-sdk';  
  
const client = cfClientInstance;  
  
const cfConfiguration = new CfConfiguration();  
cfConfiguration.streamEnabled = true;  
  
const cfTarget = new CfTarget();  
cfTarget.identifier = 'Harness_Target_1';  
  
const apiKey = "YOUR_API_KEY";  
  
const result = await cfClientInstance.initialize(apiKey, cfConfiguration, cfTarget);
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

#### Evaluate a boolean Variation


```
//get boolean evaluation  
let evaluation = await client.boolVariation("demo_bool_evaluation", false)
```
#### Evaluate a number Variation


```
//get number evaluation  
let numberEvaluation = await client.numberVariation("demo_number_evaluation", 0)
```
#### Evaluate a string Variation


```
//get string evaluation  
let stringEvaluation = await client.stringVariation("demo_string_evaluation", "default");
```
#### Evaluate a JSON Variation


```
//get json evaluation  
let jsonEvaluation = await client.jsonVariation("demo_json_evaluation", {});
```
## Listen for events

### Register the event listener

Use `client.registerListener` to register a listener for different events that might be triggered by SDK.

The possible events and their responses are outlined in the following table:



|  |  |
| --- | --- |
| **Event Type** | **Return Value** |
| "start" | null |
| "end" | null |
| "evaluation\_polling" | List |
| "evaluation\_change" | EvaluationResponse |

### Close the event listener

When the listener is not needed, you can remove the desired listener from the internal list to avoid unexpected behavior.


```
client.unregisterListener(eventsListener)
```
## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />

To close the SDK client, call this method:

```
client.destroy()
```

## Additional options

### Use the Harness Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/relay-proxy/) you need to change the default URL.

To do this, import the following URL helper functions:


```
from featureflags.config import with_base_url  
from featureflags.config import with_events_url
```
Then pass them with the new URLs when creating your client.


```
    client = CfClient(api_key,  
                      with_base_url("https://config.feature-flags.uat.harness.io/api/1.0"),  
                      with_events_url("https://event.feature-flags.uat.harness.io/api/1.0"))
```
### Use our public API methods

Our Public API exposes the following methods that you can use:


```
async initialize(apiKey: string, config: CfConfiguration, target:CfTarget)
```

```
boolVariation(evalutionId: string, defaultValue?: boolean)
```

```
stringVariation(evalutionId: string, defaultValue?:string)
```

```
numberVariation(evalutionId: string, defaultValue?:number)
```

```
jsonVariation(evalutionId: string, defaultValue: any)
```

```
registerListener(listener: (type: string, flags: any) => void)
```

```
unregisterListener(listener: (type: string, flags: any) => void)
```

```
destroy()
```
## Sample code for a React application

Here is a sample code for using Harness Feature Flag SDKs with a React Native application. To learn more about using the sample React application, go to the [React Native SDK GitHub repository](https://github.com/harness/ff-react-native-client-sdk).


```
import cfClientInstance, {CfConfiguration, CfTarget} from '@harnessio/ff-react-native-client-sdk';  
  
export default function App() {  
  const flagName = 'harnessappdemodarkmode';  
  
  const [client, setClient] = useState(null);  
  const [flagValue, setFlagValue] = useState(null);  
  
  async function initializeClient() {  
    let cfClient = cfClientInstance;  
    let cfConfig = new CfConfiguration();  
    cfConfig.streamEnabled = true;  
  
    const cfTarget = new CfTarget();  
    cfTarget.identifier = 'Harness RN Sample App'  
  
    const apiKey = "your-client-sdk-key";  
  
    try {  
      await cfClientInstance.initialize(apiKey, cfConfig, cfTarget);  
    } catch (err) {  
      console.log(err);  
    }  
    setClient(cfClient);  
  }  
  
  async function evalFlag() {  
    let res = await client.boolVariation(flagName, false);  
    setFlagValue(res.value);  
  }  
  
  useEffect(() => {  
    if (client == null) {  
      initializeClient();  
    } else {  
      evalFlag();  
    }  
  });  
  
  return (  
    <View style={styles.container}>  
      <Text>  
        Feature flag '{flagName}' is {JSON.stringify(flagValue)}  
      </Text>  
    </View>  
  );  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#fff',  
    alignItems: 'center',  
    justifyContent: 'center',  
  },  
});
```
