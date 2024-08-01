---
title: React Client SDK reference
description: This topic explains how to use the Harness Feature Flags SDK in your React Client application.
sidebar_position: 70
helpdocs_category_id: y1oewjcb0q
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/client-sdks/react-client
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />


This topic describes how to use the Harness Feature Flags SDK for your React Client application. 

For getting started quickly, you can use our [sample code from the SDK README](https://github.com/harness/ff-react-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [React Client SDK GitHub Repository](https://github.com/harness/ff-react-client-sdk).

## Before you begin

* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-react-client-sdk/releases)

## Prerequisites

To use this SDK, make sure you've: 

* Installed Node.js v12 or a newer version.
* Installed React.js v16.7 or a newer version.
* [Created a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Created an SDK key and made a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key)

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

Import `FFContextProvider` from `@harnessio/ff-react-client-sdk` to wrap your application. This allows you to access the Feature Flags service. For example: 

```
import { FFContextProvider } from '@harnessio/ff-react-client-sdk'
```
### Add your Client SDK key

To connect to the correct environment that you set up on the Harness Platform, you need to add the Client SDK key from that environment. Input the Client SDK key into the `apiKey` parameter, for example:

```
apiKey="YOUR_API_KEY"
```
### Add a target

<details>
<summary>What is a target?</summary> 
Targets are used to control which users see which variation of a feature flag, for example, if you want to do internal testing, you can enable the flag for some users and not others. When creating a target, you give it a name and a unique identifier. Often, targets are users but you can create a target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about targets, go to [Targeting Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).

To add a target that you want to evaluate, build it using `cfTarget` and pass in arguments for the following:


|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| identifier | Unique ID for the target. | Required | `identifier: 'HT_1',` |
| name | Name for this target. This does not have to be unique. **Note**: If you don’t provide a value, the name will be the same as the identifier. Read Regex requirements for target names and identifiers below for accepted characters. | Required | `name: 'Harness_Target_1'` |
| attributes | Additional data you can store for a target, such as email addresses or location. These are key/pair values. | Optional | `email: 'demo@harness.io’ location: 'EMEA'` |

<details>
<summary> Regex requirements for target names and identifiers. </summary>

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
| baseUrl | The URL used to fetch feature flag evaluations. When using the relay proxy, make sure the URL you provide is publicly available. | `https://config.ff.harness.io/api/1.0` |
| eventUrl | The URL for posting metrics data to the feature flag service. When using the relay proxy, make sure the URL you provide is publicly available. | `https://events.ff.harness.io/api/1.0` |
| streamEnabled | Set to `true` to enable streaming mode. Set to `false` to disable streaming mode. | `true` |

```
options={{ // OPTIONAL: advanced options
        baseUrl: 'https://url-to-access-flags.com',
        eventUrl: 'https://url-for-events.com',
        streamEnabled: true,
        debug: true
      }}
```

## Evaluate a flag

Evaluating a flag is when the SDK processes all flag rules and returns the correct variation of that flag for the target you provide. 

If a matching flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. The default value is undefined, however you can optionally set the default value to something else, which is particularly useful if you plan to use async mode on startup. For more information about async mode, go to [Use async mode](#use-async-mode).

With this SDK you can evaluate a single flag or a multiple flags. To do this, import and use one of the following hooks and pass in:

* Identifier of the flag you want to evaluate
* (Optional) The default variation 

#### Evaluating a single flag
Import and use `useFeatureFlag`, for example: 

```
import { useFeatureFlag } from '@harnessio/ff-react-client-sdk'
 
// ...

function MyComponent() {
  const myFlagValue = useFeatureFlag('flagIdentifier', 'default value')
 
  return <p>My flag value is: {myFlagValue}</p>
}
```
:::info note
If the flag can’t be found, undefined is returned unless you passed in a different default value.
:::

#### Evaluating multiple flags
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

You can also return a subset of flags by using the following:

#### Returning a subset of flags

```
const myFlagValues = useFeatureFlags(['flag1', 'flag2'])
```
#### Returning a subset of flags with customized default values

```
const myFlagValues = useFeatureFlags({
  flag1: 'defaultForFlag1',
  flag2: 'defaultForFlag2'
})
```

## Test your app is connected to Harness

When you receive a response showing the current status of your feature flag, go to the Harness Platform and toggle the flag on and off. Then, check your app to verify if the flag variation displayed is updated with the variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />



## Mock the SDK when testing with Jest

When testing your React application with Jest, you may want to mock the SDK to avoid making network requests. You can do this by using the `TestWrapper` component included in the SDK. This component accepts a listing of flags and their values, and mocks the SDK to return those values. 

:::info note
To use the `TestWrapper` component, you must import it from the `dist/cjs/test-utils` directory (not from the main SDK package), as shown in the example below.
:::

### Example

In the example below, we use Testing Library to render the component `<MyComponent />` that internally uses the `useFeatureFlag` hook.

```
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@harnessio/ff-react-client-sdk/dist/cjs/test-utils'

// ...

test('it should render the flag value', () => {
  render(
    <TestWrapper flags={{ flag1: 'value1', flag2: 'value2' }}>
      <MyComponent />
    </TestWrapper>
  )

  expect(screen.getByText('value1')).toBeInTheDocument()
})
```

## Additional options

### Use async mode

By default, the React Client SDK blocks the rendering of children until the initial load of feature flags has completed. This ensures that children have immediate access to all flags when they are rendered. However, in some circumstances it may be beneficial to immediately render the application and handle the display of loading on a component-by-component basis. The React Client SDK's asynchronous mode allows this by passing the optional async prop when connecting with the `FFContextProvider`. For example: 

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
When using async mode, the loading prop indicates whether the SDK has finished loading the flags. When loading completes, the loading prop will be false, and the flags prop will contain all known flags. To use this, import the `withFeatureFlags` higher-order component and pass in your component, for example:
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
:::warning
When using async mode, the default value is returned until the flags are retrieved. If you use the `useFeatureFlag` or `useFeatureFlags` hooks, the default value is undefined unless you change it when evaluating the flag. If you are using `withFeatureFlags`, you will receive an empty object. 
:::

### Display a loading component until flags are returned in async mode

When using async mode and the `ifFeatureFlag HOC`, by default the component won’t display until the flags are retrieved. This behavior can be overridden by passing a `loadingFallback` element in the options object. This will display the `loadingFallback` until the flags are retrieved, then the component will either show or hide as normal. 

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

##### Render if the flag is enabled 
By default `ifFeatureFlag` will render the component if the named flag evaluates as truthy. In the below example, you can use `MyConditionalComponent` as a normal component and it will render the `MyComponent` component if the flag is enabled.

```
import { ifFeatureFlag } from '@harnessio/ff-react-client-sdk'
// ...
function MyComponent() {
  return <p>This renders if the flag is enabled</p>
}
const MyConditionalComponent = ifFeatureFlag('flag1')(MyComponent)
``` 
##### Render if the condition is matched

By default the component will display if the flag value is evaluated as truthy. This behavior can be overridden by passing the matchValue option in the options object. The flag value will then be compared with `matchValue` to determine whether it should display. For example:

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
