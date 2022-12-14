---
title: React Client SDK Reference
description: This topic explains how to use the Harness Feature Flags SDK in your React Client application.
tags: 
   - feature flag
   - React Client
   - SDK
# sidebar_position: 7
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use the Harness Feature Flags SDK for your React Client application. 

For getting started quickly, you can use our [sample code from the SDK README](https://github.com/harness/ff-react-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [React Client SDK GitHub Repository](https://github.com/harness/ff-react-client-sdk).

## Before You Begin

* [Getting Started with Feature Flags](../../1-ff-onboarding/2-ff-getting-started/2-getting-started-with-feature-flags.md)
* [Feature Flags Overview](../../1-ff-onboarding/1-cf-feature-flag-overview.md)
* [Client-Side and Server-Side SDKs](../1-sdk-overview/1-client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../1-sdk-overview/2-communication-sdks-harness-feature-flags.md)

## Version

The current version of this SDK is **1.0.0.**

## Prerequisites

To use this SDK, make sure you've: 

* Installed Node.js v12 or a newer version.
* Installed React.js v16.7 or a newer version.
* [Create a Feature Flag on the Harness Platform](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md#step-3-create-an-sdk-key)

## Install the SDK

First, install the SDK as a dependency in your application. You can install using npm or Yarn: 

### Install using npm

```
npm install @harnessio/ff-react-client-sdk
```
### Install using Yarn

```
yarn add @harnessio/ff-react-client-sdk
```

## Initialize the SDK

To initialize the React Client SDK, you need to:

1. Import the relevant components.
2. Add your Client SDK key to connect to your Harness Environment.
3. Add a Target that you want to Evaluate against a Feature Flag.
4. (Optional) Configure the SDK options.
5. Complete the initialization.

### Import the components

Import `FFContextProvider`  from `@harnessio/ff-react-client-sdk` to wrap your application. This allows you to access the Feature Flags service. For example: 

```
import { FFContextProvider } from '@harnessio/ff-react-client-sdk'
```
### Add your Client SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. Input the Client SDK Key into the `apiKey` parameter, for example:

```
apiKey="YOUR_API_KEY"
```
### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Targeting Users With Flags](../../2-ff-using-flags/4-ff-target-management/3-targeting-users-with-flags.md).

To add a Target that you want to Evaluate, build it using `cfTarget` and pass in arguments for the following:


|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| identifier | Unique ID for the Target. | Required | `identifier: 'HT_1',` |
| name | Name for this Target. This does not have to be unique. **Note**: If you don’t provide a value, the name will be the same as the identifier. Read Regex requirements for Target names and identifiers below for accepted characters. | Required | `name: 'Harness_Target_1'` |
| attributes | Additional data you can store for a Target, such as email addresses or location. These are key/pair values. | Optional | `email: 'demo@harness.io’ location: 'EMEA'` |

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
<FFContextProvider
      apiKey="YOUR_API_KEY"
      target={{
    identifier: 'HT_1',
    name: 'Harness_Target_1'   attributes: { // OPTIONAL: key/value pairs of attributes
           email: 'demo@harness.io',
           location: 'EMEA'
        }
      }}
    >
```
### Configure the SDK

You can configure the following features of the SDK:



|  |  |  | 
| --- | --- | --- | 
| **Name** | **Description** | **Default Value** |
| baseUrl | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, make sure the URL you provide is publicly available. | `https://config.ff.harness.io/api/1.0` |
| eventUrl | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, make sure the URL you provide is publicly available. | `https://events.ff.harness.io/api/1.0` |
| streamEnabled | Set to `true` to enable streaming mode. Set to `false` to disable streaming mode. | `true` |

```
options={{ // OPTIONAL: advanced options
        baseUrl: 'https://url-to-access-flags.com',
        eventUrl: 'https://url-for-events.com',
        streamEnabled: true,
        allAttributesPrivate: false,
        privateAttributeNames: ['customAttribute'],
        debug: true
      }}
```

## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch Flags, the default value is returned. The default value is undefined, however you can optionally set the default value to something else, which is particularly useful if you plan to use async mode on start up. For more information about async mode, go to [Use async mode](#use-async-mode).

With this SDK you can evaluate a single Flag or a multiple Flags. To do this, import and use one of the following hooks and pass in:

* Identifier of the Flag you want to evaluate
* (Optional) The default Variation 

#### Evaluating a single Flag
Import and use `useFeatureFlag`, for example: 

```
import { useFeatureFlag } from '@harnessio/ff-react-client-sdk'
 
// ...

function MyComponent() {
  const myFlagValue = useFeatureFlag('flagIdentifier', 'default value')
 
  return <p>My flag value is: {myFlagValue}</p>
}
```
:::note
If the Flag can’t be found, undefined is returned unless you passed in a different default value.
:::

#### Evaluating multiple Flags
Import and use `useFeatureFlags`, for example: 

```
import { useFeatureFlags } from '@harnessio/ff-react-client-sdk'

// ...
 
function MyComponent() {
  const myFlagValues = useFeatureFlags()
 
  return (
    <>
      <p>My flag values are:</p>
      <pre>{JSON.stringify(myFlagValues, null, 2)}</pre>
    </>
  )
}
```

You can also return a subset of Flags by using the following:

#### Returning a subset of Flags

```
const myFlagValues = useFeatureFlags(['flag1', 'flag2'])
```
#### Returning a subset of Flags with customized default values

```
const myFlagValues = useFeatureFlags({
  flag1: 'defaultForFlag1',
  flag2: 'defaultForFlag2'
})
```

## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

## Additional options

### Use async mode

By default, the React Client SDK blocks the rendering of children until the initial load of Feature Flags has completed. This ensures that children have immediate access to all Flags when they are rendered. However, in some circumstances it may be beneficial to immediately render the application and handle the display of loading on a component-by-component basis. The React Client SDK's asynchronous mode allows this by passing the optional async prop when connecting with the `FFContextProvider`. For example: 

```
import { FFContextProvider } from '@harnessio/ff-react-client-sdk'
 
function MyComponent() {
  return (
    <FFContextProvider
      async // OPTIONAL: whether or not to use async mode
      apiKey="YOUR_API_KEY" // your SDK API key
      target={{
        identifier: 'HT_1', // unique ID of the Target
        name: 'Harness_Target_1',  // name of the Target
        attributes: { // OPTIONAL: key/value pairs of attributes
          email: 'demo@harness.io',
          location: 'EMEA'
        }
```
When using async mode, the loading prop indicates whether the SDK has finished loading the Flags. When loading completes, the loading prop will be false, and the flags prop will contain all known Flags. To use this, import the `withFeatureFlags` higher-order component and pass in your component, for example:
```
import { withFeatureFlags } from '@harnessio/ff-react-client-sdk'

function MyComponent({ flags, loading }) {
  if (loading) {
    return <p>Loading...</p>
  }
  return <p>Flag1's value is {flags.flag1}</p>
}
const MyComponentWithFlags = withFeatureFlags(MyComponent)
```
:::caution
When using async mode, the default value is returned until the Flags are retrieved. If you use the `useFeatureFlag` or `useFeatureFlags` hooks, the default value is undefined unless you change it when Evaluating the Flag. If you are using `withFeatureFlags`, you will receive an empty object. 
:::

### Display a loading component until Flags are returned in async mode

When using async mode and the `ifFeatureFlag HOC`, by default the component won’t display until the Flags are retrieved. This behavior can be overridden by passing a `loadingFallback` element in the options object. This will display the `loadingFallback` until the Flags are retrieved, then the component will either show or hide as normal. 

For example: 

```
import { ifFeatureFlag } from '@harnessio/ff-react-client-sdk'
 
// ...
 
function MyComponent() {
  return <p>This should render if the flag is on</p>
}
 
const MyConditionalComponent = ifFeatureFlag('flag1', {
  loadingFallback: <p>Loading...</p>
})(MyComponent)
```
#### Conditionally render a component

You can conditionally render a component by using `ifFeatureFlag`, which is a [higher-order component (HOC)](https://reactjs.org/docs/higher-order-components.html) that wraps your component and returns it only when the named Flag is enabled or matches a specific value. 

##### Render if the Flag is enabled 
By default `ifFeatureFlag` will render the component if the named Flag evaluates as truthy. In the below example, you can use `MyConditionalComponent` as a normal component and it will render the `MyComponent` component if the Flag is enabled.

```
import { ifFeatureFlag } from '@harnessio/ff-react-client-sdk'
// ...
function MyComponent() {
  return <p>This renders if the flag is enabled</p>
}
const MyConditionalComponent = ifFeatureFlag('flag1')(MyComponent)
``` 
##### Render if the condition is matched

By default the component will display if the Flag value is evaluated as truthy. This behavior can be overridden by passing the matchValue option in the options object. The Flag value will then be compared with `matchValue` to determine whether it should display. For example:

```
import { ifFeatureFlag } from '@harnessio/ff-react-client-sdk'
 
// ... 

function MyComponent() {
  return <p>This should render if the flag evaluates to 'ABC123'</p>
}
 
const MyConditionalComponent = ifFeatureFlag('flag1', { matchValue: 'ABC123' })(
  MyComponent
)
```

## Sample code for a React Client application

```
import React from 'react'
import ReactDOM from 'react-dom'
 
import {
  FFContextProvider,
  useFeatureFlag,
  useFeatureFlags
} from '@harnessio/ff-react-client-sdk'
 
ReactDOM.render(<App />, document.querySelector('#react-root'))
 
function App() {
  return (
    <FFContextProvider
      apiKey="YOUR_API_KEY"
      target={{
        identifier: 'reactclientsdk',
        name: 'ReactClientSDK'
      }}
    >
      <SingleFeatureFlag />
      <MultipleFeatureFlags />
    </FFContextProvider>
  )
}
 
function SingleFeatureFlag() {
  const flagValue = useFeatureFlag('harnessappdemodarkmode')
 
  return (
    <p>The value of "harnessappdemodarkmode" is {JSON.stringify(flagValue)}</p>
  )
}

function MultipleFeatureFlags() {
  const flags = useFeatureFlags()
 
  return (
    <>
      <p>Here are all our flags:</p>
      <pre>{JSON.stringify(flags, null, 2)}</pre>
    </>
  )
}
```
