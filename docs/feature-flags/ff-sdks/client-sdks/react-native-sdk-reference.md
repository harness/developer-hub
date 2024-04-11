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

* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Feature Flags Overview](../../get-started/overview)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-react-native-client-sdk/releases)

## Prerequisites

To use this SDK, make sure you: 

* Install [React 17](https://react.dev/learn/installation) or newer.
* Install [Node.js 16](https://nodejs.org/en/download) or a newer version. 
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-react-native-client-sdk)

To follow along with our test code sample, make sure you've done the following:

* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/ff-creating-flag/create-a-project#create-an-sdk-key).
* Create a project using [Expo](https://expo.dev/tools#cli).

## Install the SDK

To set up the React Native SDK, you have the following options:

 - You can install the React Native SDK using `npm-install` by running the following cammand in your terminal:

```
$ npm install --save ff-react-native-client-sdk
```

 - You can also install with yarn by running the followiung command in your terminal:

```
yarn add @harnessio/ff-react-native-client-sdk
```

### Initialize the SDK

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

### Code Sample of initializing the SDK

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

### Code samples using Expo

The following is a complete code example using Expo that you can use to test the `harnessappdemodarkmode` flag you created on the Harness Platform. 

When you run the code, it will:

 - Render a loading screen
 - Connect to the FF service.
 - Retrieve all flags.
 - Access a flag using the useFeatureFlag hook
 - Access several flags using the `useFeatureFlags` hook.

The following code can be placed in the `src/App.js` file:

```
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import {
  FFContextProvider,
  useFeatureFlag,
  useFeatureFlags
} from '@harnessio/ff-react-native-client-sdk'

export default function App() {
  return (
    <View style={styles.container}>
      <FFContextProvider
        apiKey="YOUR_API_KEY"
        target={{
          identifier: 'reactnativeclientsdk',
          name: 'ReactNativeClientSDK'
        }}
      >
        <SingleFeatureFlag />
        <MultipleFeatureFlags />
      </FFContextProvider>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%'
  }
})

function SingleFeatureFlag() {
  const flagValue = useFeatureFlag('harnessappdemodarkmode')

  return (
    <Text>The value of "harnessappdemodarkmode" is {JSON.stringify(flagValue)}</Text>
  )
}

function MultipleFeatureFlags() {
  const flags = useFeatureFlags()

  return (
    <>
      <Text>Here are all our flags:</Text>
      <Text>{JSON.stringify(flags, null, 2)}</Text>
    </>
  )
}
```

## Using The React Native SDK

### Async mode

By default, the React Native Client SDK will block rendering of children until the initial load of feature flags has completed. 

This ensures that children have immediate access to all flags when they are rendered. 

However, in some circumstances it may be beneficial to immediately render the application and handle display of loading on a component-by-component basis. 

The React Native Client SDK's asynchronous mode allows this by passing the optional async prop when connecting with the `FFContextProvider`.

### Caching evaluations
In practice, flags rarely change and so it can be useful to cache the last received evaluations from the server to allow your application to get started as fast as possible. Setting the cache option as true or as an object (see interface below) will allow the SDK to store its evaluations to localStorage and retrieve at startup. 

This lets the SDK get started near instantly and begin serving flags, while it carries on authenticating and fetching up-to-date evaluations from the server behind the scenes.

```
<FFContextProvider
  apiKey="YOUR_API_KEY"
  target={{
    identifier: 'reactclientsdk',
    name: 'ReactClientSDK'
  }}
  options={{
    cache: true
  }}
>
  <MyApp />
</FFContextProvider>
The cache option can also be passed as an object with the following options.

interface CacheOptions {
  // maximum age of stored cache, in ms, before it is considered stale
  ttl?: number
  // storage mechanism to use, conforming to the Web Storage API standard, can be either synchronous or asynchronous
  // defaults to localStorage
  storage?: AsyncStorage | SyncStorage
}

interface SyncStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

interface AsyncStorage {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
}
```

### Overriding the Internal Logger

By default, the React Client SDK will log errors and debug messages using the `console` object. In some cases, it can be useful to instead log to a service or silently fail without logging errors.

```
const myLogger = {
  debug: (...data) => {
    // do something with the logged debug message
  },
  info: (...data) => {
    // do something with the logged info message
  },
  error: (...data) => {
    // do something with the logged error message
  },
  warn: (...data) => {
    // do something with the logged warning message
  }
}

return (
  <FFContextProvider
    apiKey="YOUR_API_KEY"
    target={{
      identifier: 'reactclientsdk',
      name: 'ReactClientSDK'
    }}
    options={{
      logger: myLogger
    }}
  >
    <MyApp />
  </FFContextProvider>
)
```

## Using the API

### FFContextProvider
The `FFContextProvider` component is used to set up the React context to allow your application to access feature flags using the `useFeatureFlag` and `useFeatureFlags` hooks and `withFeatureFlags` [High Order Components](https://legacy.reactjs.org/docs/higher-order-components.html). At minimum, it requires the `apiKey` you have set up in your Harness Feature Flags account, and the `target`. You can think of a `target` as a user.

The `FFContextProvider` component also accepts an options object, a `fallback` component, an array of `initialEvaluations`, an `onError` handler, and can be placed in Async mode using the `async` prop. The fallback component will be displayed while the SDK is connecting and fetching your flags. The `initialEvaluations` prop allows you pass an array of evaluations to use immediately as the SDK is authenticating and fetching flags. The `onError` prop allows you to pass an event handler which will be called whenever a network error occurs.

```
import { Text } from 'react-native'
import { FFContextProvider } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  return (
    <FFContextProvider
      async={false} // OPTIONAL: whether or not to use async mode
      apiKey="YOUR_API_KEY" // your SDK API key
      target={{
        identifier: 'targetId', // unique ID of the Target
        name: 'Target Name',  // name of the Target
        attributes: { // OPTIONAL: key/value pairs of attributes of the Target
          customAttribute: 'this is a custom attribute',
          anotherCustomAttribute: 'this is something else'
        }
      }}
      fallback={<Text>Loading...</Text>} // OPTIONAL: component to display when the SDK is connecting
      options={{ // OPTIONAL: advanced configuration options
        cache: false,
        baseUrl: 'https://url-to-access-flags.com',
        eventUrl: 'https://url-for-events.com',
        streamEnabled: true,
        debug: false,
        eventsSyncInterval: 60000
      }}
      initialEvaluations={evals} // OPTIONAL: array of evaluations to use while fetching
      onError={handler} // OPTIONAL: event handler to be called on network error
    >
      <CompontToDisplayAfterLoad /> <!-- component to display when Flags are available -->
    </FFContextProvider>
  )
}
```

### useFeatureFlag 

The `useFeatureFlag` hook returns a single named flag value. An optional second argument allows you to set what value will be returned if the flag does not have a value. By default `useFeatureFlag` will return `undefined` if the flag cannot be found.

:::info-note
When rendered in Async mode, the default value will be returned until the flags are retrieved. Consider using the `useFeatureFlagsLoading` hook to determine when the SDK has finished loading.
:::

```
import { Text } from 'react-native'
import { useFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  const myFlagValue = useFeatureFlag('flagIdentifier', 'default value')

  return <Text>My flag value is: {myFlagValue}</Text>
}
```

The `useFeatureFlags` hook also eturns an object of flag identifier/flag value pairs. You can pass an array of flag identifiers or an object of flag identifier/default value pairs. If an array is used and a flag cannot be found, the returned value for the flag will be undefined. If no arguments are passed, all flags will be returned.

```
import { Text } from 'react-native'
import { useFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  const myFlagValues = useFeatureFlags()

  return (
    <>
      <Text>My flag values are:</Text>
      <Text>{JSON.stringify(myFlagValues, null, 2)}</Text>
    </>
  )
}
```

#### Getting A Subset Of Flags

```
const myFlagValues = useFeatureFlags(['flag1', 'flag2'])
```

#### Getting A Subset Of Flags with Custom Default Values

```
const myFlagValues = useFeatureFlags({
  flag1: 'defaultForFlag1',
  flag2: 'defaultForFlag2'
})
```

### usingFeatureFlagsLoading

The `useFeatureFlagsLoading` hook returns a boolean value indicating whether the SDK is currently loading flags from the server.
```
import { Text } from 'react-native'
import {
  useFeatureFlagsLoading,
  useFeatureFlags
} from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  const isLoading = useFeatureFlagsLoading()
  const flags = useFeatureFlags()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Text>My flag values are:</Text>
      <Text>{JSON.stringify(flags, null, 2)}</Text>
    </>
  )
}
```

### useFeatureFlagsClient

The React Native Client SDK internally uses the Javascript Client SDK to communicate with Harness. Sometimes it can be useful to be able to access the instance of the Javascript Client SDK rather than use the existing hooks or higher-order components (HOCs). The `useFeatureFlagsClient` hook returns the current Javascript Client SDK instance that the React Native Client SDK is using. This instance will be configured, initialized and have been hooked up to the various events the Javascript Client SDK provides.

```
import { Text } from 'react-native'
import {
  useFeatureFlagsClient,
  useFeatureFlagsLoading
} from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  const client = useFeatureFlagsClient()
  const loading = useFeatureFlagsLoading()

  if (loading || !client) {
    return <Text>Loading...</Text>
  }

  return (
    <Text>
      My flag value is: {client.variation('flagIdentifier', 'default value')}
    </Text>
  )
}
```

### ifFeatureFlag

The `ifFeatureFlag` higher-order component (HOC) wraps your component and conditionally renders only when the named flag is enabled or matches a specific value.

```
import { Text } from 'react-native'
import { ifFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  return <Text>This should render if the flag is on</Text>
}

const MyConditionalComponent = ifFeatureFlag('flag1')(MyComponent)
```

You can, then, use `MyConditionalComponent` as a normal component, and only render if `flag1`'s value is true.

#### Conditionally with a specific value

```
import { Text } from 'react-native'
import { ifFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  return <Text>This should render if the flag evaluates to 'ABC123'</Text>
}

const MyConditionalComponent = ifFeatureFlag('flag1', { matchValue: 'ABC123' })(
  MyComponent
)
```

You can then use `MyConditionalComponent` as a normal component, and only render if flag1's value matches the passed condition.

#### Loading fallback when in async mode

If Async mode is used, by default the component will wait for flags to be retrieved before showing. This behaviour can be overridden by passing an element as `loadingFallback`; when loading the `loadingFallback` will be displayed until the flags are retrieved, at which point the component will either show or hide as normal.

```
import { Text } from 'react-native'
import { ifFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  return <Text>This should render if the flag is on</Text>
}

const MyConditionalComponent = ifFeatureFlag('flag1', {
  loadingFallback: <Text>Loading...</Text>
})(MyComponent)
```

### withFeatureFlags

The `withFeatureFlags` higher-order component (HOC) wraps your component and adds `flags` and loading as additional props. `flags` contains the evaluations for all known flags and `loading` indicates whether the SDK is actively fetching flags.

```
import { Text } from 'react-native'
import { withFeatureFlags } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent({ flags }) {
  return <Text>Flag1's value is {flags.flag1}</Text>
}

const MyComponentWithFlags = withFeatureFlags(MyComponent)
```

#### Loading in async mode

If Async mode is used, the `loading` prop will indicate whether the SDK has completed loading the flags. When loading completes, the `loading` prop will be `false` and the `flags` prop will contain all known flags.

```
import { Text } from 'react-native'
import { withFeatureFlags } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent({ flags, loading }) {
  if (loading) {
    return <Text>Loading...</Text>
  }

  return <Text>Flag1's value is {flags.flag1}</Text>
}

const MyComponentWithFlags = withFeatureFlags(MyComponent)
```

### withFeatureFlagsClient

The React Native Client SDK internally uses the Javascript Client SDK to communicate with Harness. Sometimes it can be useful to be able to access the instance of the Javascript Client SDK rather than use the existing hooks or higher-order components (HOCs). The `withFeatureFlagsClient` HOC wraps your component and adds featureFlagsClient as additional prop. `featureFlagsClient` is the current Javascript Client SDK instance that the React Native Client SDK is using. This instance will be configured, initialized and have been hooked up to the various events the Javascript Client SDK provides.

```
import { Text } from 'react-native'
import { withFeatureFlagsClient } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent({ featureFlagsClient }) {
  if (featureFlagsClient) {
    return (
      <Text>
        Flag1's value is {featureFlagsClient.variation('flag1', 'no value')}
      </Text>
    )
  }

  return <Text>The Feature Flags client is not currently available</Text>
}

const MyComponentWithClient = withFeatureFlagsClient(MyComponent)
```

## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

### Evaluate a boolean Variation


```
//get boolean evaluation  
let evaluation = await client.boolVariation("demo_bool_evaluation", false)
```
### Evaluate a number Variation


```
//get number evaluation  
let numberEvaluation = await client.numberVariation("demo_number_evaluation", 0)
```
### Evaluate a string Variation


```
//get string evaluation  
let stringEvaluation = await client.stringVariation("demo_string_evaluation", "default");
```
### Evaluate a JSON Variation


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

### Sample code for a React application

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
