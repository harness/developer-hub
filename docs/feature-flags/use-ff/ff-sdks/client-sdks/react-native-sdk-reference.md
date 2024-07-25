---
title: React Native SDK reference
description: This topic explains how to use the Harness Feature Flags SDK in your React Native application.
sidebar_position: 50
helpdocs_topic_id: z2w6uj9mzb
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/client-sdks/react-native-sdk-reference
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'

<Smpno />

This topic describes how to use the Harness Feature Flags SDK for your React Native application.

## Before You Begin

* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on the [GitHub Release Page](https://github.com/harness/ff-react-native-client-sdk/releases)

## Prerequisites

To use this SDK, make sure you:

* Install [React 17](https://react.dev/learn/installation) or a newer version.
* Install [Node.js 16](https://nodejs.org/en/download) or a newer version.

To follow along with our test code sample, make sure you've done the following:

* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key).
* Create a project using [Expo](https://expo.dev/tools#cli).

## Install the SDK

To set up the React Native Client SDK, you have the following options:

 - You can install the React Native SDK using npm by running the following command in your terminal:

```shell
npm install @harnessio/ff-react-native-client-sdk
```

 - You can also install with yarn by running the following command in your terminal:

```shell
yarn add @harnessio/ff-react-native-client-sdk
```

### Initialize the SDK

To initialize the React Native SDK, you need to:

1. import the FF context provider
2. provide a client SDK key
3. provide a target

### Import the FF context provider

The FF context provider is responsible for connecting to the Harness Feature Flags service and retrieving your feature flag values. It provides the various hooks and higher-order components with the data they need to operate. You should try to include this as high up in your JSX render tree as possible to ensure that it can serve all the views of your application. 

```jsx
import { FFContextProvider } from '@harnessio/ff-react-native-client-sdk'
```


### Add your client SDK key
To use the provider, wrap your application code in the `FFContextProvider` component and pass in your client SDK key and target.

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. Input the Client SDK Key into the `apiKey` prop, for example:

```jsx
export default function App() {
  return (
    <View>
      <FFContextProvider
        apiKey="YOUR_API_KEY"
        target={target}
      >
        <MyApplicationCode/>
      </FFContextProvider>
    </View>
  )
}
```

### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users, but you can create a Target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).

To add a Target that you want to Evaluate, pass an object using the `target` prop.


|               |                                                       |              |                         |
|---------------|-------------------------------------------------------|--------------|-------------------------|
| **Parameter** | **Description**                                       | **Required?** | **Example**             |
| identifier    | Unique ID for the Target.                             | Required     | `user1234`              |
| name          | Name for the Target.                                  | Optional     | `User 1234`             |
| attributes    | Object of key/value pairs of meta data for the target | Optional     | `{ region: 'US-East' }` |

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

By default, the React Native Client SDK is configured to connect to the Harness Feature Flags service, establish a stream (where supported) and periodically report back flag metrics. Using the `options` prop, you can configure the following options of the SDK:

|                    |                                                                                  |                                                                                                                                   |                                        |
|--------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **Name**           | **Example**                                                                      | **Description**                                                                                                                   | **Default Value**                      |
| cache              | `cache: true`                                                                    | Cache evaluations to use during the next start up of the SDK.                                                                     | `false`                                |
| baseUrl            | `baseUrl: 'https://config.ff.harness.io/api/1.0'`                                | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000`               | `https://config.ff.harness.io/api/1.0` |
| eventUrl           | `eventUrl: 'https://events.ff.harness.io/api/1.0'`                               | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |
| streamEnabled      | `streamEnabled: true`                                                            | Set to `true` to enable streaming mode. Set to `false` to disable streaming mode.                                                 | `true`                                 |
| debug              | `debug: true`                                                                    | Set to `true` to enable debug mode. Set to `false` to disable debug mode.                                                         | `false`                                |
| eventsSyncInterval | `eventsSyncInterval: 60000`                                                      | The interval **in milliseconds** at which we send metrics.                                                                        | `60000` (milliseconds)                 |
| pollingEnabled     | `pollingEnabled: true`                                                           | Set to `true` to enable polling mode. Set to `false` to disable polling mode.                                                     | `false`                                |
| pollingInterval    | `pollingInterval: 60000`                                                         | The interval **in milliseconds** that we poll for changes when you are using polling mode.                                        | `60000` (milliseconds)                 |
| logger             | `logger: { debug: myDebugFn, info: myInfoFn, error: myErrorFn, warn: myWarnFn }` | The logger to use when logging debug, info, error and warning messages.                                                           | `console`                              |

Use the `options` prop to declare the configuration options you want to use, for example:


```jsx
<FFContextProvider
  apiKey="YOUR_API_KEY"
  target={target}
  options={{
    cache: true,
    streamEnabled: false
  }}
>
 <MyApplicationCode/>
</FFContextProvider>
```

### Code example using Expo

The following is a complete code example using Expo that you can use to test the `harnessappdemodarkmode` flag you created on the Harness Platform. 

When you run the code, it will:

 - Render a loading screen
 - Connect to the FF service.
 - Retrieve all flags.
 - Access a flag using the `useFeatureFlag` hook.
 - Access several flags using the `useFeatureFlags` hook.

First create your Expo project and install the dependencies.

```shell
npx create-expo-app my-demo-app
cd my-demo-app
npm install @harnessio/ff-react-native-client-sdk
```

The following code can be placed in the `src/App.js` file:

```jsx
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import {
  FFContextProvider,
  useFeatureFlag,
  useFeatureFlags
} from '@harnessio/ff-react-native-client-sdk'

export default function App() {
  // typically your target identifier and name should be retrieved from
  // user details and pertain to the current user
  const target = {
    identifier: 'YOUR_TARGET_IDENTIFIER',
    name: 'YOUR TARGET NAME'
  }
  
  return (
    <View style={styles.container}>
      <FFContextProvider
        apiKey="YOUR_API_KEY"
        target={target}
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

## Use the React Native SDK

### Async mode

By default, the React Native Client SDK will block rendering of children until the initial load of feature flags has completed. 

This ensures that children have immediate access to all flags when they are rendered. 

However, in some circumstances it might be beneficial to immediately render the application and handle display of loading on a component-by-component basis. 

The React Native Client SDK's asynchronous mode allows this by passing the optional async prop when connecting with the `FFContextProvider`.

## Streaming and polling

By default, the React Native Client SDK will set up a stream to keep the feature flag values up-to-date when things
change in your Harness project. When a change is made in the Harness project, Harness will send an event to the SDK and
the SDK will serve the changed value. This is great when your application needs to change in near-real-time when a
feature flag changes (for example, your application might need to display a maintenance screen when the backend APIs are
being updated). However, in some circumstances, polling might be a better option. When streaming is disabled and polling
is enabled, the SDK will periodically poll for current feature flag values and keep your application up-to-date. By
default, the interval for polling is 60 seconds and can be adjusted to suit your application.

### Streaming

Streaming is enabled by default and can be disabled using the `streamEnabled` option and passing `false`. In the event
that the stream is interrupted, the SDK will attempt to reconnect automatically. If after a number of attempts the
stream cannot be re-established, the SDK will switch to polling unless specifically disabled using the `pollingEnabled`
option.

### Polling

Polling is disabled by default and can be enabled using the `pollingEnabled` option and passing `true`. When enabled,
the SDK will poll for feature flag value changes every 60 seconds, this can be adjusted using the `pollingInterval`
option and passing the number of milliseconds you want the SDK to wait between polling.

## Cache evaluations

In practice flags rarely change and so it can be useful to cache the last received evaluations from the server to allow
your application to get started as fast as possible. Setting the `cache` option as `true` or as an object (see interface
below) will allow the SDK to store its evaluations to `localStorage` and retrieve at startup. This lets the SDK get
started near instantly and begin serving flags, while it carries on authenticating and fetching up-to-date evaluations
from the server behind the scenes.

```jsx
<FFContextProvider
  apiKey="YOUR_API_KEY"
  target={target}
  options={{
    cache: true
  }}
>
  <MyApp />
</FFContextProvider>
```

The `cache` option can also be passed as an object with the following options.

```typescript
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

## Override the internal logger

By default, the React Client SDK will log errors and debug messages using the `console` object. In some cases, it
can be useful to instead log to a service or silently fail without logging errors.

```jsx
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
    target={target}
    options={{
      logger: myLogger
    }}
  >
    <MyApp />
  </FFContextProvider>
)
```

## Fast startup

By default, the React Native Client SDK will connect to the Harness Feature Flags service to get the current feature
flag values and then render your application. Using a combination of the `cache` option
(see [Caching evaluations](#caching-evaluations) above) and Async mode (see [Async mode](#async-mode) above), you can
instruct the SDK to instead render immediately using previously cached values (in the case of a returning user) or
default values (in the case of new users). The SDK will immediately render your application and asynchronously connect
to the Harness Feature Flags service to make sure the cached feature flag values are kept up-to-date.

```jsx
<FFContextProvider
  async
  apiKey="YOUR_API_KEY"
  target={target}
  options={{
    cache: true
  }}
>
  <MyApp />
</FFContextProvider>
```

## Use the API

### `FFContextProvider`

The `FFContextProvider` component is used to set up the React context to allow your application to access feature flags
using the `useFeatureFlag` and `useFeatureFlags` hooks
and `withFeatureFlags` [HOC](https://reactjs.org/docs/higher-order-components.html). At minimum, it requires
the `apiKey` you have set up in your Harness Feature Flags account, and the `target`. You can think of a `target` as a
user.

The `FFContextProvider` component also accepts an `options` object, a `fallback` component, an array
of `initialEvaluations`, an `onError` handler, and can be placed in [Async mode](#Async-mode) using the `async` prop.
The `fallback` component will be displayed while the SDK is connecting and fetching your flags. The `initialEvaluations`
prop allows you pass an array of evaluations to use immediately as the SDK is authenticating and fetching flags.
The `onError` prop allows you to pass an event handler which will be called whenever a network error occurs.

```jsx
import { Text } from 'react-native'
import { FFContextProvider } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  return (
    <FFContextProvider
      async={false} // OPTIONAL: whether or not to use async mode
      apiKey="YOUR_API_KEY" // your SDK API key
      target={{
        identifier: 'YOUR_TARGET_IDENTIFIER', // replace with a unique ID for the Target 
        name: 'YOUR TARGET NAME',  // replace with the unique name of the Target
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
        eventsSyncInterval: 60000,
        pollingEnabled: false,
        pollingInterval: 60000
      }}
      initialEvaluations={evals} // OPTIONAL: array of evaluations to use while fetching
      onError={handler} // OPTIONAL: event handler to be called on network error
    >
      <CompontToDisplayAfterLoad /> <!-- component to display when Flags are available -->
    </FFContextProvider>
  )
}
```

### `useFeatureFlag`

The `useFeatureFlag` hook returns a single named flag value. An optional second argument allows you to set what value
will be returned if the flag does not have a value. By default `useFeatureFlag` will return `undefined` if the flag
cannot be found.

> N.B. when rendered in [Async mode](#Async-mode), the default value will be returned until the flags are retrieved.
> Consider using the [useFeatureFlagsLoading hook](#usefeatureflagsloading) to determine when the SDK has finished
> loading.

```jsx
import { Text } from 'react-native'
import { useFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  const myFlagValue = useFeatureFlag('flagIdentifier', 'default value')

  return <Text>My flag value is: {myFlagValue}</Text>
}
```

### `useFeatureFlags`

The `useFeatureFlags` hook returns an object of flag identifier/flag value pairs. You can pass an array of flag
identifiers or an object of flag identifier/default value pairs. If an array is used and a flag cannot be found, the
returned value for the flag will be `undefined`. If no arguments are passed, all flags will be returned.

> N.B. when rendered in [Async mode](#Async-mode), the default value will be returned until the flags are retrieved.
> Consider using the [useFeatureFlagsLoading hook](#usefeatureflagsloading) to determine when the SDK has finished
> loading.

```jsx
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

#### Get a subset of Flags

```jsx
const myFlagValues = useFeatureFlags(['flag1', 'flag2'])
```

#### Get a subset of Flags with custom default values

```jsx
const myFlagValues = useFeatureFlags({
  flag1: 'defaultForFlag1',
  flag2: 'defaultForFlag2'
})
```

### `useFeatureFlagsLoading`

The `useFeatureFlagsLoading` hook returns a boolean value indicating whether the SDK is currently loading flags from the
server.

```jsx
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

### `useFeatureFlagsClient`

The React Native Client SDK internally uses the Javascript Client SDK to communicate with Harness. Sometimes it can be
useful to be able to access the instance of the Javascript Client SDK rather than use the existing hooks or higher-order
components (HOCs). The `useFeatureFlagsClient` hook returns the current Javascript Client SDK instance that the React
Native Client SDK is using. This instance will be configured, initialized, and hooked up to the various events the
Javascript Client SDK provides.

```jsx
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

### `ifFeatureFlag`

The `ifFeatureFlag` higher-order component (HOC) wraps your component and conditionally renders only when the named flag
is enabled or matches a specific value.

```jsx
import { Text } from 'react-native'
import { ifFeatureFlag } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent() {
  return <Text>This should render if the flag is on</Text>
}

const MyConditionalComponent = ifFeatureFlag('flag1')(MyComponent)
```

You can then use `MyConditionalComponent` as a normal component, and only render if `flag1`'s value is truthy.

#### Use conditions with a specific value

```jsx
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

You can then use `MyConditionalComponent` as a normal component, and only render if `flag1`'s value matches the passed
condition.

#### Load fallback when in async mode

If [Async mode](#Async-mode) is used, by default the component will wait for flags to be retrieved before showing. This
behaviour can be overridden by passing an element as `loadingFallback`; when loading the `loadingFallback` will be
displayed until the flags are retrieved, at which point the component will either show or hide as normal.

```jsx
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

### `withFeatureFlags`

The `withFeatureFlags` higher-order component (HOC) wraps your component and adds `flags` and `loading` as additional
props. `flags` contains the evaluations for all known flags and `loading` indicates whether the SDK is actively fetching
flags.

```jsx
import { Text } from 'react-native'
import { withFeatureFlags } from '@harnessio/ff-react-native-client-sdk'

// ...

function MyComponent({ flags }) {
  return <Text>Flag1's value is {flags.flag1}</Text>
}

const MyComponentWithFlags = withFeatureFlags(MyComponent)
```

#### Load in async mode

If [Async mode](#Async-mode) is used, the `loading` prop will indicate whether the SDK has completed loading the flags.
When loading completes, the `loading` prop will be `false` and the `flags` prop will contain all known flags.

```jsx
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

### `withFeatureFlagsClient`

The React Native Client SDK internally uses the Javascript Client SDK to communicate with Harness. Sometimes it can be
useful to be able to access the instance of the Javascript Client SDK rather than use the existing hooks or higher-order
components (HOCs). The `withFeatureFlagsClient` HOC wraps your component and adds `featureFlagsClient` as additional
prop. `featureFlagsClient` is the current Javascript Client SDK instance that the React Native Client SDK is using. This
instance will be configured, initialized, and been hooked up to the various events the Javascript Client SDK provides.

```jsx
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

