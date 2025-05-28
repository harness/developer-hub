---
title: Redux SDK
sidebar_label: Redux SDK
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038851551-Redux-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Redux SDK. This library is built on top of our regular [JavaScript SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk) to ease the integration in applications using Redux by providing a [reducer](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers) to manage the Split-related state, a set of [actions](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#actions) that you can use to interact with the SDK, [selectors](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#selectors) to easily get Split-desired data, and helper functions to access some of the underlying SDK functionality to support all use cases.

Taking advantage of our JavaScript SDK being isomorphic, we also support [SSR](https://redux.js.org/usage/server-rendering) by using the underlying [SDK in Node.js](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk)

This library also offers some extra features for users of React that are using [react-redux](https://github.com/reduxjs/react-redux) bindings.

All of our SDKs are open source. Go to our [Redux SDK GitHub repository](https://github.com/splitio/redux-client) to see the source code.

:::info[Migrating from v1.x to v2.x]
Refer to the [migration guide](https://github.com/splitio/redux-client/blob/development/MIGRATION-GUIDE.md) for information on upgrading to v2.x.
:::

## Language support and requirements

This SDK is compatible with Redux v3 and later. It requires the [redux-thunk](https://github.com/reduxjs/redux-thunk) package to be installed on the app, which is included by default if your project is using the [Redux Toolkit](https://redux-toolkit.js.org/). This means you don't need to run `npm install redux-thunk` if Redux Toolkit is already installed.

For `react-redux` users, the SDK supports its v4 and later.

In SSR setups, our library code is prepared to run in Node.js 14+.

## Initialization
 
Set up FME in your code base in two steps.

### 1. Import the SDK into your project

The SDK is published using `npm`, so it's fully integrated with your workflow. You should be able to add it with `yarn` too.

<Tabs>
<TabItem value="NPM">

```bash
npm install --save @splitsoftware/splitio-redux
```

</TabItem>
<TabItem value="Yarn">

```bash
yarn add @splitsoftware/splitio-redux
```

</TabItem>
</Tabs>

### 2. Integrate the SDK in your application

You need to combine the Split reducer with yours when creating your store and use the `initSplitSdk` action creator, which returns a thunk, to set things in motion. You can use the [combineReducers](https://redux.js.org/api/combinereducers#combinereducersreducers) function of Redux on the `splitio` key. You can mount it at a different key but might require some extra code if you use the specific functionality for [react-redux](#advanced-usage-with-react--redux).

For the client side, the Redux documentation [recommends](https://redux.js.org/introduction/getting-started#basic-example) creating a single store to be used as the source of truth for your state. This is where we'll plug in the Split reducer.

For Server-Side Rendering, the Redux documentation [suggests](https://redux.js.org/usage/server-rendering#handling-the-request) creating a store per request, which is why we provide a function to create stores, where each instance will include the Split reducer.

<Tabs>
<TabItem value="Client Side with Redux Toolkit">

```javascript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { splitReducer, initSplitSdk } from '@splitsoftware/splitio-redux';

const sdkBrowserConfig = {
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that 
    // the user belongs to. 
    // This could also be a cookie you generate for anonymous users.
    key: 'key'
  }
};

// Create the Redux Store
const store = configureStore(
  combineReducers({
    splitio: splitReducer,
    ... // Combine Split reducer with your own reducers
  }),
  // The SDK requires thunk middleware, which is included by default by Redux Toolkit
);

// Initialize the SDK by calling the initSplitSdk and passing the config in the parameters object.
store.dispatch(initSplitSdk({ config: sdkBrowserConfig }));

export default store;
```

</TabItem>
<TabItem value="Client Side with Redux">

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Requirement for asynchronous actions
import { splitReducer, initSplitSdk } from '@splitsoftware/splitio-redux';

const sdkBrowserConfig = {
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that 
    // the user belongs to. 
    // This could also be a cookie you generate for anonymous users.
    key: 'key'
  }
};

// Create the Redux Store
const store = createStore(
  combineReducers({
    splitio: splitReducer,
    ... // Combine Split reducer with your own reducers
  }),
  // Add thunk middleware, used by SDK async actions
  applyMiddleware(thunk)
);

// Initialize the SDK by calling the initSplitSdk and passing the config in the parameters object.
store.dispatch(initSplitSdk({ config: sdkBrowserConfig }));

export default store;
```

</TabItem>
<TabItem value="Server Side">

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Requirement for asynchronous actions
import { splitReducer, initSplitSdk } from '@splitsoftware/splitio-redux';

const sdkNodeConfig = {
  core: {
    authorizationKey: 'YOUR_SDK_KEY'
  }
};
/**
 * initSplitSdk should be called only once, to keep a single SDK factory instance.
 * The returned action is dispatched each time a new store is created, to update 
 * the Split status at the state. 
 */
const initSplitSdkAction = initSplitSdk({ config: sdkNodeConfig });

const reducers = combineReducers({
  splitio: splitReducer,
  ... // Combine Split reducer with your own reducers
});

export default function storeCreator() {
  // Pass the reducers combined, including the splitReducer to each new store you create.
  const store = createStore(reducers, applyMiddleware(thunk));
  // Dispatch the initSplitSdk returned action the new store instance.
  store.dispatch(initSplitSdkAction);

  return store;
}
```

</TabItem>
</Tabs>

:::info[Notice for TypeScript]
With the SDK package on NPM, you get the SplitIO namespace, which contains useful types and interfaces.

Feel free to dive into the declaration files if IntelliSense is not enough!
:::

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

## Using the SDK

The SDK via its reducer keeps a portion of the store state up to date. The state data adheres to the following schema:

<Tabs>
<TabItem value="Split state shape">

```javascript
{
  // 'splitio' is the key where the Split reducer is expected to be mounted.
  'splitio': {
    // The following properties indicate the current status of the SDK main client (the one bound to the key provided in the config).
    'isReady': true, // boolean flag indicating if the SDK is ready
    'isReadyFromCache': false, // boolean flag indicating if the SDK is ready from cache
    'isTimedout': false, // boolean indicating if the SDK is in a timed out state. Note: it will get ready eventually unless it's misconfigured
    'hasTimedout': false, // boolean indicating if the SDK has ever been in a timed out state
    'isDestroyed': false, // boolean indicating if the SDK has been destroyed. Read more in the shutdown section
    'lastUpdate': 56789592012, // timestamp of the last SDK state change (either timed out, got ready, destroyed or processed an update from the cloud)

    /** 
     * The 'treatments' property contains the evaluations of feature flags.
     * Each evaluation consist of TreatmentResult objects associated to the key used on the evaluation and the feature flag name.
     * We recommend that you use the provided selector functions for ease of consumption.
     */
    'treatments': { 
      'feature_flag_name_1': {
        'key': {
          'treatment': 'on',
          'config': "{'copy': 'better copy', 'color': 'red'}"
        }
      },
      'feature_flag_2': {
        'key': {
          'treatment': 'off',
          'config': null
        }
      }
    },
    /**
     * The 'status' property contains the status of the non-default clients, i.e., the ones that are not bound to the key provided in the config.
     */
    'status': {
      'key': {
        'isReady': true, 'isReadyFromCache': false, 'isTimedout': false, 'hasTimedout': false, 'isDestroyed': false, 'lastUpdate': 56789592012
      }
    }
  }
}
```

</TabItem>
</Tabs>
 
### Basic use

When the SDK is initialized, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of data. If the SDK is asked to evaluate a feature flag while it's in this intermediate state, it may not have the necessary data and will queue the evaluation until it is ready.

To make sure the SDK is fully loaded before using a treatment, wait until the SDK factory client is ready. You can check SDK readiness in one of the following ways:

 - Provide an `onReady` callback as a parameter to the `initSplitSdk` function.
 - Check the `isReady` property of the `splitio` Redux state.
 - Check if the `initSplitSdk` returned promise is resolved.
 - Check the `isReady` property from the `splitio` selector result.

After the SDK is ready, you can use the SDK to evaluate feature flags.

<Tabs>
<TabItem value="Providing onReady callback">

```javascript
import { initSplitSdk } from '@splitsoftware/splitio-redux';

function onReadyCallback() {
  // Use the SDK now that it is ready to properly evaluate.
}

// Along with the config, you can provide a callback to be executed once the SDK is ready, to handle accordingly.
store.dispatch(initSplitSdk({ 
  config: sdkConfig,
  onReady: onReadyCallback
}));
```

</TabItem>
<TabItem value="Using isReady flag on the state">

```javascript
// You should have already initialized the SDK.
let isSplitReady = false;

const handleChange = () => {
  const isReadyFlag = store.getState().splitio.isReady;

  if (isReadyFlag) {
    // Keep in mind that the store subscription will be triggered any time an action is dispatched, 
    // and some part of the state tree may potentially have changed.
    isSplitReady = true;
    
    // Use the SDK now that it is ready to properly evaluate.
  }
}

// Note: If you're using react-redux you could do this via mapStateToProps. Read more below!
store.subscribe(handleChange);
```

</TabItem>
<TabItem value="Using initSplitSdk returned promise">

```javascript
import { initSplitSdk } from '@splitsoftware/splitio-redux';

function onReadyCallback() {
  // Use the SDK now that it is ready to properly evaluate.
}

// initSplitSdk action creator would return a promise. If the SDK is ready already the promise will be resolved by this time.
store.dispatch(initSplitSdk({ config: sdkConfig })).then(onReadyCallback);
```

</TabItem>
<TabItem value="Using isReady property from the selector result">

```javascript
import { initSplitSdk, selectStatus } from '@splitsoftware/splitio-redux';

// initSplitSdk action creator would return a promise. If the SDK is ready already the promise will be resolved by this time.
store.dispatch(initSplitSdk({ config: sdkConfig }));

// Use the selector to get the isReady flag from the state.
const { isReady } = selectStatus(store.getState().splitio);
```

</TabItem>
</Tabs>

The `getTreatments` action creator evaluates feature flag treatments for the given `splitNames` (array of feature flag names) and `key` (e.g., user or account ID) values. In the browser, the key value is taken from the configuration and bound to the client, so you don't need to pass it here unless you need to change the key.

If the SDK is not ready when you dispatch the `getTreatments` action, the library queues that evaluation and loads the result into the state once the `SDK_READY` event is emitted. If you happen to queue more than one evaluation for the same `splitName` and `key` the SDK will keep the latest set of attributes and evaluate only once. 

<Tabs>
<TabItem value="Client side (browser)">

```javascript
import { getTreatments } from '@splitsoftware/splitio-redux';

// Dispatch action to evaluate and load treatments for a feature flag. The key used is the one passed in the config.
store.dispatch(getTreatments({ splitNames: ['feature_flag_1'] }));
// Or a list of feature flags.
store.dispatch(getTreatments({ splitNames: ['feature_flag_2', 'feature_flag_3'] }));
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
import { getTreatments } from '@splitsoftware/splitio-redux';

// Dispatch action to evaluate and load treatments for a feature flag. In Node.js we need to provide the key on each getTreatments.
store.dispatch(getTreatments({ splitNames: ['feature_flag_1'], key: 'key' }));
// Or a list of feature flags.
store.dispatch(getTreatments({ splitNames: ['feature_flag_2', 'feature_flag_3'], key: 'key' }));
```

</TabItem>
</Tabs>

After feature flag treatments are part of the state, use the `splitio.treatments` slice of state or our selectors to access the feature flag evaluation results and write the code for the different treatments that you defined in Harness FME. Remember to handle the client returning control in your code. 

<Tabs>
<TabItem value="Client side (browser)">

```javascript
// Import treatment value selector.
import { selectTreatmentAndStatus } from '@splitsoftware/splitio-redux');

// Get the treatment corresponding to the key bound to the main client for feature_flag_1 feature flag.
const { treatment, isReady } = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1');

if (isReady) {
  if (treatment === 'on') {
    // insert on code here
  } else if (treatment === 'off') {
    // insert off code here
  } else {
    // insert control code here
  }
}

// Alternatively you could access the treatments directly from the store or your own custom selectors.
const splitTreatments = store.getState().splitio.treatments;
const treatment = splitTreatments['key']['feature_flag_1'].treatment;
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
// Import treatment value selector.
import { selectTreatmentAndStatus } from '@splitsoftware/splitio-redux');

// Get the treatment corresponding to the key of value 'key' for feature_flag_1 feature flag.
const { treatment } = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1', 'key');

if (treatment === 'on') {
  // insert on code here
} else if (treatment === 'off') {
  // insert off code here
} else {
  // insert control code here
}

// Alternatively you can access the treatments directly from the store or your own custom selectors.
const splitTreatments = store.getState().splitio.treatments;
const treatment = splitTreatments['key']['feature_flag_1'].treatment;
```

</TabItem>
</Tabs>

Note that these treatments won't be updated automatically when there is a change to your feature flags or segments. This is to avoid flickering. If you want to react to SDK events, see the [Subscribe to events](#subscribe-to-events) section below.

### Attribute syntax 

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `getTreatments` action creator needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatments` action creator call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The SDK supports five types of attributes: strings, numbers, dates, booleans, and sets. The data type and syntax for each are: 

* **Strings:** Use type String.
* **Numbers:** Use type Number.
* **Dates: ** Use type Date and express the value in `milliseconds since epoch`. <br />*Note:* Milliseconds since epoch is expressed in UTC. If your date or date-time combination is in a different timezone, first convert it to UTC, then transform it to milliseconds since epoch.
* **Booleans:** Use type Boolean.
* **Sets:** Use type Array.

<Tabs>
<TabItem value="Client side (browser)">

```javascript
import { selectTreatmentAndStatus, getTreatments } from '@splitsoftware/splitio-redux');

const attributes = {
  // date attributes are handled as `millis since epoch`
  registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
  // this string will be compared against a list called `plan_type`
  plan_type: 'growth',
  // this number will be compared agains a const value called `deal_size`
  deal_size: 10000,
  // this boolean will be compared against a const value called `paying_customer`
  paying_customer: true,
  // this array will be compared against a set called `permissions`
  permissions: ["read", "write"]
};

// You can pass the attributes with any getTreatments action using the `attributes` key of the parameters.
store.dispatch(getTreatments({ splitNames: ['feature_flag_1'], attributes: attributes }));

const { treatment } = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1');

if (treatment === 'on') {
  // insert on code here
} else if (treatment === 'off') {
  // insert off code here
} else {
  // insert control code here
}
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
import { selectTreatmentAndStatus, getTreatments } from '@splitsoftware/splitio-redux');

const attributes = {
  // date attributes are handled as `millis since epoch`
  registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
  // this string will be compared against a list called `plan_type`
  plan_type: 'growth',
  // this number will be compared agains a const value called `deal_size`
  deal_size: 10000,
  // this boolean will be compared against a const value called `paying_customer`
  paying_customer: true,
  // this array will be compared against a set called `permissions`
  permissions: ["read", "write"]
};

// You can pass the attributes with any getTreatments action using the `attributes` key of the parameters.
store.dispatch(getTreatments({ splitNames: ['feature_flag_1'], key: 'key', attributes: attributes }));

const { treatment } = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1', 'key');

if (treatment === 'on') {
  // insert on code here
} else if (treatment === 'off') {
  // insert off code here
} else {
  // insert control code here
}
```

</TabItem>
</Tabs>

### Multiple evaluations at once

If you want to evaluate treatments for multiple feature flags at once, you can pass a list of feature flag names to the `getTreatments` action creator.

You can also evaluate multiple feature flags at once using flag sets. In that case, you can use the `flagSets` property instead of the `splitNames` property when calling the `getTreatments` action creator. Like `splitNames`, the `flagSets` property must be an array of string, each one corresponding to a different flag set name.

<Tabs>
<TabItem value="Evaluating by feature flag names">

```javascript
store.dispatch(getTreatments({ splitNames: ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'] }));
```

</TabItem>
<TabItem value="Evaluating by flag sets">

```javascript
store.dispatch(getTreatments({ flagSets: ['frontend', 'client_side'] }));
```

</TabItem>
</Tabs>

For retrieving the treatments from the store, you can use the `selectTreatmentAndStatus` selector. Note that this selector retrieves a single treatment value for a given feature flag name, so you need to call it for each feature flag name.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// Getting treatments from the store
const treatments = {
  FEATURE_FLAG_NAME_1: selectTreatmentAndStatus(store.getState().splitio, 'FEATURE_FLAG_NAME_1').treatment,
  FEATURE_FLAG_NAME_2: selectTreatmentAndStatus(store.getState().splitio, 'FEATURE_FLAG_NAME_2').treatment
};
```

</TabItem>
</Tabs>

### Get Treatments with Configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you don't need to call a specific action creator for your evaluations. Instead, our SDK stores both the treatment and the associated config (or null if there isn't one) in the Redux state. To access this values you can either use the `selectTreatmentWithConfigAndStatus` selector (recommended) or just access the config from the state.

Each evaluation entry loaded into the state under the `treatments` key will have the structure below:

<Tabs>
<TabItem value="TypeScript">

```typescript
type TreatmentWithConfig = {
  treatment: string,
  config: string | null
};
```

</TabItem>
</Tabs>

As you can see from the object structure, the config will be a stringified version of the configuration JSON  defined in Harness FME. If there is no configuration defined for a treatment, the SDK will return `null` for the config parameter.

The `selectTreatmentWithConfigAndStatus` selector takes the exact same set of arguments as `selectTreatmentAndStatus`, as shown below.

<Tabs>
<TabItem value="Client side (browser)">

```javascript
// Import treatment with config selector.
import { selectTreatmentWithConfigAndStatus } from '@splitsoftware/splitio-redux');

// Get the TreatmentResult corresponding to the key bound to the client (which value is 'key' on this snippet) for 'feature_flag_1' feature flag.
const treatmentResult = selectTreatmentWithConfigAndStatus(store.getState().splitio, 'feature_flag_1').treatment;
const config = JSON.parse(treatmentResult.config);
const treatment = treatmentResult.treatment;

if (treatment === 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment === 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}


// Alternatively you could access the TreatmentResults directly from the store or your own custom selectors.
const splitTreatments = store.getState().splitio.treatments;
const treatmentResult = splitTreatments['key']['feature_flag_1'];
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
// Import treatment with config selector.
import { selectTreatmentWithConfigAndStatus } from '@splitsoftware/splitio-redux');

// Get the TreatmentResult corresponding to the key of value 'key' for 'feature_flag_1' feature flag.
const treatmentResult = selectTreatmentWithConfigAndStatus(store.getState().splitio, 'feature_flag_1', 'key').treatment;
const config = JSON.parse(treatmentResult.config);
const treatment = treatmentResult.treatment;

if (treatment === 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment === 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}


// Alternatively you could access the TreatmentResults directly from the store or your own custom selectors.
const splitTreatments = store.getState().splitio.treatments;
const treatmentResult = splitTreatments['key']['feature_flag_1'];
```

</TabItem>
</Tabs>

### Append properties to impressions

[Impressions](/docs/feature-management-experimentation/feature-management/impressions) are generated by the SDK each time an evaluation is done using the `getTreatments` action creator. These impressions are periodically sent back to Split's servers for feature monitoring and experimentation.

You can append properties to an impression by passing an object of key-value pairs to the `getTreatments` action creator. These properties are then included in the impression sent by the SDK and can provide useful context to the impression data.

Three types of properties are supported: strings, numbers, and booleans.

<Tabs>
<TabItem value="Client side (browser)">

```javascript
const properties = { 
  package: "premium", 
  admin: true, 
  discount: 50 
};

// You can pass the properties with any getTreatments action using the `properties` key of the parameters.
store.dispatch(getTreatments({ splitNames: ['feature_flag_1'], properties: properties }));
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
const properties = { 
  package: "premium", 
  admin: true, 
  discount: 50 
};

// You can pass the properties with any getTreatments action using the `properties` key of the parameters.
store.dispatch(getTreatments({ splitNames: ['feature_flag_1'], key: 'key', properties: properties }));
```

</TabItem>
</Tabs>

### Shutdown

Call the `destroySplitSdk` function to gracefully shutdown the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.
This function can be used as an action creator to update the `splitio` slice.

<Tabs>
<TabItem value="Client side (browser)">

```javascript
import { destroySplitSdk } from '@splitsoftware/splitio-redux';

// you can dispatch the action to update the status at the store
store.dispatch(destroySplitSdk());
 
// the dispatched Thunk action returns a promise available as the return value of dispatch itself.
// this promise always resolves once the SDK has been shutdown
store.dispatch(destroySplitSdk()).then(() => {
  console.log(store.getState().splitio.isDestroyed); // prints `true`
});
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
import { destroySplitSdk } from '@splitsoftware/splitio-redux';

function serverClose() {
  // on scenarios where you need to destroy the SDK without dispatching the action, such as on server-side,
  // you can attach a callback that is invoked once the SDK has been shutdown
  destroySplitSdk({
    onDestroy: function() {
      console.log("Split destroyed");
    }
  });

});

```

</TabItem>
</Tabs>

After `destroySplitSdk()` is dispatched and resolved, the evaluated treatments at the store will keep their current treatment values. However, if there is any subsequent attempt to use the `getTreatments` action creator, the treatments will be updated to `control` to be consistent with the JavaScript SDK. Also, the SDK [manager](#manager) methods will result in empty values.

:::warning[Important!]
Destroying the SDK is meant to be definitive. A call to the `destroySplitSdk` function also destroys the factory object. Attempting to restart the destroyed SDK by using the `initSplitSdk` action creator is not recommended and might lead to unexpected behavior.
:::

## Track

You can use the `track` method to record any actions your users perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users’ actions and metrics. Go to [Events](https://help.split.io/hc/en-us/articles/360020585772) to learn more about using track events in feature flags. 

The `track` method takes a params object with up to five arguments. The data type and syntax for each are:

* **key:** The `key` variable used in the `getTreatments` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period. 
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK was able to successfully queue the event to be sent back to Harness servers on the next event post. The SDK returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

It is important to mention that this method does not interact with the Redux store. It's only an abstraction on top of the underlying SDK track method, so you can only import one Split package.

<Tabs>
<TabItem value="Client side (browser)">

```javascript
import { track } from '@splitsoftware/splitio-redux';

const eventProperties = {package : "premium", admin : true, discount : 50};

// On the client side, SDK clients are bound to a key. If you don't provide a key, the SDK will use the key provided in the config. You can provide a different key to the track method if you want to track an event for a different key, like an account ID for example.
function track: (
  params: { key?: SplitIO.SplitKey, trafficType: string, eventType: string, value?: number, properties?: SplitIO.Properties }
) => boolean;

// Example with both a value and properties
const queued = track({ trafficType: 'user', eventType: 'page_load_time', value: 83.334, properties: eventProperties });
// Example with only properties 
const queued = track({ trafficType: 'user', eventType: 'page_load_time', properties: eventProperties });
// Most basic event you can track would require trafficType and eventType (just skip the value or properties params if you don't have any associated with your event)
const queued = track({ trafficType: 'user', eventType: 'page_load_time' });

// Example for a different key than the one provided in the SDK config
const queued = track({ key: ACCOUNT_ID, trafficType: 'account', eventType: 'page_load_time' });
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
import { track } from '@splitsoftware/splitio-redux';

const eventProperties = {package : "premium", admin : true, discount : 50};

// On the server side the client is not bound to any key, so you need to provide these on the track call.
function track: (
  params: { key: SplitIO.SplitKey, trafficType: string, eventType: string, value?: number, properties?: SplitIO.Properties }
) => boolean;

// Example with both a value and properties
const queued = track({ key: USER_ID, trafficType: 'user', eventType: 'page_load_time', value: 83.334, properties: eventProperties });
// Example with only properties 
const queued = track({ key: USER_ID, trafficType: 'user', eventType: 'page_load_time', properties: eventProperties });
// Most basic event you can track would require key, trafficType and eventType (just skip the value or properties params if you don't have any associated with your event)
const queued = track({ key: USER_ID, trafficType: 'user', eventType: 'page_load_time' });
```

</TabItem>
</Tabs>

## Configuration

The SDK has a number of parameters for configuring performance. Each parameter is set to a reasonable default. However, you can override these value in the `config` object passed to the `initSplitSdk` action creator, as shown in the [Initialization](#initialization) section above.

To learn about all the available configuration options, go to the [JavaScript SDK Configuration section.](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#configuration)

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To do this, start the SDK in **localhost** mode (also called off-the-grid or offline mode). In this mode, the SDK neither polls or updates from Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the features. 

When instantiating the SDK in localhost mode, your `authorizationKey` is `"localhost"`. Define the feature flags you want to use in the `features` object map. All feature flag evaluations with `getTreatments` actions return the one treatment (and config, if defined) that you have defined in the map. You can then change the treatment as necessary for your testing. If you want to update a treatment or a config, or to add or remove feature flags from the mock cache, update the properties of the `features` object you've provided. The SDK simulates polling for changes and updates from it. Do not assign a new object to the `features` property because the SDK has a reference to the original object and will not detect the change.

Any feature flag that is not provided in the `features` map returns the [control treatment](/docs/feature-management-experimentation/feature-management/control-treatment) if the SDK is asked to evaluate them. Use the following additional configuration parameters when instantiating the SDK in `localhost` mode:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- | 
| scheduler.offlineRefreshRate | The refresh interval for the mocked feature flags treatments. | 15 |
| features | A fixed mapping of which treatment to show for our mocked feature flags. | {} <br />By default we have no mocked feature flags. |

To use the SDK in localhost mode, replace the SDK Key with "localhost", as shown in the following test example. Note that you can define the object between a feature flag name and treatment directly or use a map to define both a treatment and a dynamic configuration.

If you define just a string as the value for a feature flag name, the config returned by the SDK is null. If you use a map, the SDK returns the specified treatment and the specified config, which can also be null.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
const config = {
  core: {
    authorizationKey: 'localhost',
    key: 'user_id'
  },
  features: {
    'reporting_v2': 'on', // example with just a string value for the treatment
    'billing_updates': { treatment: 'visa', config: '{ "color": "blue" }' }, // example of a defined config
    'show_status_bar': { treatment: 'off', config: null } // example of a null config
  }
};

store.dispatch(initSplitSdk({ config: sdkConfig }));
```

</TabItem>
</Tabs> 

For a complete unit test example using Jest and React Testing Library, check [App.test.js](https://github.com/splitio/react-redux-sdk-examples/blob/master/src/__tests__/App.js).

## Manager

Use the Split Manager to get a list of feature flags available to the SDK factory client. The Manager uses the data fetched from Harness servers upon SDK initialization, so you should wait for the SDK to be ready after initialization (as explained in the [basic use](#basic-use) section) before using the manager; otherwise, the manager functions will return null values and empty arrays.

You can access the manager functionality through the exposed `getSplitNames`, `getSplit`, and `getSplits` helper functions, as explained below.

<Tabs>
<TabItem value="TypeScript">

```typescript
import { getSplitNames, getSplit, getSplits } from '@splitsoftware/splitio-redux'

/** 
 * Returns the names of feature flags registered with the SDK.
 *
 * @return a List of Strings of the feature flag names.
 */
const splitNamesList: SplitIO.SplitNames = getSplitNames();

/**
 * Returns the feature flag registered with the SDK of this name.
 *
 * @return SplitView or null.
 */
const splitView: SplitIO.SplitView = getSplit(splitName: string);
 
/**
 * Retrieves the feature flags that are currently registered with the SDK.
 *
 * @return List of SplitViews.
 */
const splitViewsList: SplitIO.SplitViews = getSplits();

/**
 * where each SplitView object has the following shape
 */
type SplitView = {
  name: string,
  trafficType: string,
  killed: boolean,
  treatments: Array<string>,
  changeNumber: number,
  configs: {
    [treatmentName: string]: string
  },
  defaultTreatment: string,
  sets: Array<string>,
  impressionsDisabled: boolean
}
```

</TabItem>
</Tabs>

Example usage:

<Tabs>
<TabItem value="Client side (Browser)">

```javascript
import { getSplitNames, initSplitSdk, getTreatments } from '@splitsoftware/splitio-redux';

// You need to initialize the SDK and wait for readiness to properly use the manager methods.
store.dispatch(initSplitSdk({ config: sdkBrowserConfig, onReady: onReadyCallback }));

function onReadyCallback() {
  const myFeatureFlags = getSplitNames();

  store.dispatch(getTreatments({ splitNames: myFeatureFlags }));
}
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
import { getSplitNames, initSplitSdk, getTreatments } from '@splitsoftware/splitio-redux';

// You need to initialize the SDK and wait for readiness to properly use the manager methods.
const initSplitSdkAction = initSplitSdk({ config: sdkNodeConfig, onReady: onReadyCallback });
let myFeatureNames = [];

function onReadyCallback() {
  myFeatureNames = getSplitNames();
}

// Remember that the actions should be dispatched per request, so the results are loaded to the store that you'll return for the requesting user/entity.
// The SDK should be ready by this point so it can evaluate immediately.
function requestHandler(params) {
  store.dispatch(initSplitSdkAction); // Loads Split general data into the store.
  store.dispatch(getTreatments({ key: params.key, splitNames: myFeatureNames })); // Load the treatments and configs into the store.
}
```

</TabItem>
</Tabs>

For more details on about using the Manager, go to [JavaScript SDK Manager](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#manager).

## Listener
 
FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*. For that purpose, the SDK's configurations have a parameter called `impressionListener` where an implementation of `ImpressionListener` could be added. This implementation **must** define the `logImpression` method and it receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| impression |  | Object | Impression object that has the feature flag, key, treatment, label, etc. |
| attributes | Object | A map of attributes used on the evaluation (if any). |
| sdkLanguageVersion | String| The version of the SDK. In this case the language is `redux` plus the version of the underlying SDK. |

:::info[Note]
There are two additional keys on this object, `ip` and `hostname`. They are not used on the browser.
:::

## Implement custom impression listener

You can implement a custom impression listener as shown in the example below.
 
<Tabs>
<TabItem value="Client side (Browser)">

```javascript
import { initSplitSdk } from '@splitsoftware/splitio-redux';

function logImpression(impressionData) {
  // do something with the impression data.
}

// Create the config for the SDK factory.
const sdkBrowserConfig = { 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  impressionListener: {
    logImpression: logImpression
  }
});

store.dispatch(initSplitSdk({ config: sdkBrowserConfig }));
```

</TabItem>
<TabItem value="Server side (Node.js/SSR)">

```javascript
import { initSplitSdk } from '@splitsoftware/splitio-redux';

function logImpression(impressionData) {
  // do something with the impression data.
}

// Create the config for the SDK factory.
const sdkNodeConfig = { 
  core: {
    authorizationKey: 'YOUR_SDK_KEY'
  },
  impressionListener: {
    logImpression: logImpression
  }
});

store.dispatch(initSplitSdk({ config: sdkNodeConfig }));
```

</TabItem>
</Tabs>

An impression listener is called asynchronously from the corresponding evaluation, but is almost immediate. 

Even though the SDK does not fail if there is an exception in the listener, do not block the call stack.

## Logging
 
To enable SDK logging in the browser, see how the SDK Logging works on [the client side](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#logging) or [the server side](https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK#logging) depending on where you're running the SDK.

## Advanced use cases

This section describes advanced use cases and features provided by the Redux SDK.

### Instantiate multiple SDK clients
 
When running **on the client side** the Redux SDK factory client is tied to one specific key or ID at a time which usually belongs to one traffic type (for example, `user`, `account`, `organization`). This enhances performance and reduces caching data in the SDK.

FME supports the ability to release features to multiple keys with different traffic types. With traffic types, you can release to `users` in one feature flag and `accounts` in another. Go to [Traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) to learn more.

If you need to roll out feature flags by different traffic types, the SDK instantiates multiple clients, one for each traffic type. For example, you may want to roll out the feature flag `user-poll` by `users` and the feature flag `account-permissioning` by `accounts`. 

You can do this by providing a new key to be used when triggering evaluations or tracking events. See some examples below:
 
<Tabs>
<TabItem value="Client side (Browser)">

```javascript
import { initSplitSdk, getTreatments, track, selectTreatmentAndStatus, selectTreatmentWithConfigAndStatus } from '@splitsoftware/splitio-redux';

const sdkBrowserConfig = {
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'CUSTOMER_ACCOUNT_ID', // This is the key that will be bound to the client.
  }
};

store.dispatch(initSplitSdk({ config: sdkBrowserConfig, onReady: onReadyCallback }));

// Regular track for bound account client (where key would be CUSTOMER_ACCOUNT_ID)
const queuedAccountEvent = track({ trafficType: 'account', eventType: 'ACCOUNT_CREATED' });
// Tracking events with a key parameter on the client side will get a new client (or reuse it if already created) and track events for the given key
const queuedUserEvent = track({ key: 'CUSTOMER_USER_ID', trafficType: 'user', eventType: 'PAGELOAD', value: 7.86 }); 

function onReadyCallback() {
  // Dispatch action to evaluate and load treatments for a feature flag (where key would be CUSTOMER_ACCOUNT_ID)
  store.dispatch(getTreatments({ splitNames: ['feature_flag_1'] }));
  // Providing a different key will get a new client (or reuse it if already created) and calculate treatments for this key too.
  store.dispatch(getTreatments({ splitNames: ['feature_flag_2'], key: 'CUSTOMER_USER_ID' }));

  // To access the values for the different clients, you can use our selectors.
  // If you're using multiple keys, you should provide the key when retrieving the data with the selectors, otherwise we'll default to the first entry found.
  const accountTreatment = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1', 'CUSTOMER_ACCOUNT_ID').treatment;
  const userTreatment = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_2', 'CUSTOMER_USER_ID').treatment;

  const accountTreatmentAndConfig = selectTreatmentWithConfigAndStatus(store.getState().splitio, 'feature_flag_1', 'CUSTOMER_ACCOUNT_ID').treatment;
  const userTreatmentAndConfig = selectTreatmentWithConfigAndStatus(store.getState().splitio, 'feature_flag_2', 'CUSTOMER_USER_ID').treatment;
}
```

</TabItem>
</Tabs>

:::info[Number of SDK instances]
While the SDK does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of SDKs down to **one** or **two**.
:::

### Subscribe to events
 
The underlying JavaScript SDK has four different events:

* `SDK_READY_FROM_CACHE`. This event fires in client-side code if using the `LOCALSTORAGE` storage type. This event fires once the SDK is ready to evaluate treatments using the rollout plan cached in localStorage from a previous session (which might be stale). If there is data in localStorage, this event fires almost immediately, since access to localStorage is fast; otherwise, it doesn't fire.
* `SDK_READY`. This event fires once the SDK is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `SDK_READY_TIMED_OUT`. This event fires if there is no cached version of your rollout plan in localStorage, and the SDK could not download the data from Harness servers within the time specified by the `readyTimeout` configuration parameter. This event does not indicate that the SDK initialization was interrupted.  The SDK continues downloading the rollout plan and fires the `SDK_READY` event when finished.  This delayed `SDK_READY` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `SDK_UPDATE`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

Besides managing `SDK_READY` on initialization, as explained in the [basic use](#basic-use) section, you can also add callbacks for the other events as shown below:

<Tabs>
<TabItem value="Client and Server side">

```javascript
import { initSplitSdk } from '@splitsoftware/splitio-redux';

function onReadyCallback() {
  // Use the SDK now that it is ready to properly evaluate.
}

function onReadyFromCacheCallback() {
  // Use the SDK to evaluate using data from the local storage cache.
}

function onTimedoutCallback() {
  // Optionally handle timeout. SDK might be ready at a later point unless there's a problem on the setup.
}

function onUpdateCallback() {
  // Optionally handle SDK update event. SDK was ready and processed an update on either your feature flags or segments
  // that might change the result of an evaluation.
}

// Provide the callbacks if you're using the config.
store.dispatch(initSplitSdk({ 
  config: sdkConfig,
  onReady: onReadyCallback,
  onReadyFromCache: onReadyFromCacheCallback,
  onTimedout: onTimedoutCallback,
  onUpdate: onUpdateCallback;
}));
```

</TabItem>
</Tabs>

You can also access the readiness state of any SDK factory client with the `selectStatus` selector, or when retrieving treatments with the `selectTreatmentAndStatus` or `selectTreatmentWithConfigAndStatus` selectors.

<Tabs>
<TabItem value="Retrieve client status">

```javascript
import { selectStatus, selectTreatmentAndStatus } from '@splitsoftware/splitio-redux';

// Retrieves current status of the SDK factory client with USER_ID key. If no key is provided, the main client status is returned.
const { isReady, isReadyFromCache, isTimedout, hasTimedout, isDestroyed, lastUpdate } = selectStatus(store.getState().splitio, USER_ID);

// Readiness properties are also available in the selector result.
const { isReady, isReadyFromCache, isTimedout, hasTimedout, isDestroyed, lastUpdate, treatment } = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1', USER_ID);
```

</TabItem>
</Tabs>

You can also do this from the store directly.

<Tabs>
<TabItem value="Retrieve client status directly from store">

```javascript
// Accessing the status of the main client from the splitio slice of state
const { isReady, isReadyFromCache, hasTimedout, isDestroyed } = store.getState().splitio;
```

</TabItem>
</Tabs>

The `getTreatments` action creator accepts two optional parameters, `evalOnUpdate` and `evalOnReadyFromCache`, which are `false` by default to avoid unwanted flickering. These parameters are **only for client side** and will be ignored if set on the server side.

When `evalOnUpdate` is explicitly set to true, the given treatment will be re-evaluated in the event of an `SDK_UPDATE` being triggered by the underlying SDK. You can use it to re-render your components whenever there is a change due to a rollout update or a feature flag being killed.

<Tabs>
<TabItem value="Client side (Browser)">

```javascript
  // The results for feature_flag_1 and feature_flag_2 will be re-evaluated whenever an update is processed,
  // and updated in the Redux store if they changed.
  // If you wanted to stop reacting to updates, dispatch the action again with the desired key,
  // feature flag names an evalOnUpdate as false (to override the behavior).
  store.dispatch(getTreatments({ splitNames: ['feature_flag_1', 'feature_flag_2'], evalOnUpdate: true }));
```

</TabItem>
</Tabs>

When `evalOnReadyFromCache` is explicitly set to true, the given treatment will be re-evaluated in the event of an `SDK_READY_FROM_CACHE` being triggered by the underlying SDK. Therefore, this param is only relevant when using 'LOCALSTORAGE' as storage type, since otherwise the event is never emitted.

Keep in mind that if there was no cache previously loaded on the browser or the event has already fired, this parameter will take no effect. Also, consider that when evaluating from cache you might be using a stale snapshot until the SDK is ready.

<Tabs>
<TabItem value="Client side (Browser)">

```javascript
  // The results for feature_flag_1 and feature_flag_2 will be evaluated when the Sdk is ready or an update is processed.
  // However only feature_flag_1 will be evaluated also if the Sdk is ready from cache.
  store.dispatch(initSplitSdk({ config: sdkBrowserConfig, onReadyFromCache: onReadyFromCacheCallback, onReady: onReadyCallback }));
  store.dispatch(getTreatments({ splitNames: ['feature_flag_1'], evalOnUpdate: true, evalOnReadyFromCache: true }));
  store.dispatch(getTreatments({ splitNames: ['feature_flag_2'], evalOnUpdate: true }));
  
  function onReadyFromCacheCallback() {
    // feature_flag_1 is different than 'control' since we instructed the SDK to evaluate once cache is loaded.
    const feature_flag_1 = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1').treatment;
    // feature_flag_2 is 'control' still as it wasn't evaluated with cached data.
    const feature_flag_2 = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_2').treatment;
    ...
  }
  
  function onReadyCallback() {
    // both feature flags treatments should be different than 'control' given that any pending evaluation is calculated once SDK is ready
    const feature_flag_1 = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_1').treatment;
    const feature_flag_2 = selectTreatmentAndStatus(store.getState().splitio, 'feature_flag_2').treatment;
    ...
  }
```

</TabItem>
</Tabs>

### Usage with React + Redux
 
We provide extra functionality for users of [react-redux](https://github.com/reduxjs/react-redux) with two High Order Components (HOCs). In the future we'll add more mapState functions for your convenience.

The `connectSplit` HOC connects a given component with the `splitio` slice and `getTreatments` action creator already bound to the dispatch, so you don't need to dispatch that action yourself. 

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
import { connectSplit, selectTreatmentAndStatus, getSplitNames } from '@splitsoftware/splitio-redux';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    props.getTreatments({ splitNames: ['myFeatureFlag'] }));
  };

  render() {
    const { splitio } = props;

    const isMyFeatureFlagOn = selectTreatmentAndStatus(splitio, 'myFeatureFlag').treatment === 'on';
    
    if (isMyFeatureFlagOn) {
      return (<MyFeatureFlagOnComponent />);
    } else {
      return (<MyFeatureFlagDefaultComponent />);
    }
  }
}

export default connectSplit()(MyComponent);

// If you've mounted the Redux SDK reducer in a key of the state other than `splitio`, you need to provide
// a callback for retrieving the feature flag related slice of state. 
// If not provided, it will default to using `state.splitio`.
export default connectSplit((state) => {
  return state['my_key_for_split_reducer'];
})(MyComponent);
```

</TabItem>
</Tabs>

The `connectToggler` HOC simplifies toggling when you have a component version for "on" treatment and a different one for any other treatments (including "control"). For example:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
import { connectToggler } from '@splitsoftware/splitio-redux';

const ComponentOn = () => {
  return (...);
}

const ComponentDefault = () => {
  return (...);
}

// This component renders ComponentOn if 'myFeatureFlag' evaluation yielded 'on', otherwise it renders ComponentDefault
const FeatureFlagToggler = connectToggler('myFeatureFlag')(ComponentOn, ComponentDefault);

// If you need to evaluate for a different key than the one bound to the factory config, 
// you can pass it as the second param of the decorator.
const key = 'key';
const FeatureFlagTogglerForOtherKey = connectToggler('myFeatureFlag', key)(ComponentOn, ComponentDefault);

// If you've mounted the Redux SDK reducer in a key of the state other than `splitio`, you need to provide
// a callback for retrieving the feature flag related slice of state as the 3rd parameter. 
// If not provided, it will default to using `state.splitio`.
const FeatureFlagTogglerFromCustomStateKey = connectToggler('myFeatureFlag', key, (state) => {
  return state['my_key_for_split_reducer'];
})(ComponentOn, ComponentDefault);
```

</TabItem>
</Tabs>

### User consent

The SDK factory allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined. To learn how to configure this feature, refer to the [JavaScript SDK User consent](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#user-consent) section.

When using the Redux SDK, you can access the underlying SDK factory instance via the `splitSdk` object, as shown below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
import { splitSdk, initSplitSdk, ... } from '@splitsoftware/splitio-redux';

// `splitSdk.factory` is null until `initSplitSdk` action creator is called
store.dispatch(initSplitSdk({ config: sdkBrowserConfig }));

splitSdk.factory.UserConsent.getStatus();
```

</TabItem>
<TabItem value="TypeScript">

```typescript
import { splitSdk, initSplitSdk, ... } from '@splitsoftware/splitio-redux';

// `splitSdk.factory` is null until `initSplitSdk` action creator is called
store.dispatch(initSplitSdk({ config: sdkBrowserConfig }));

(splitSdk.factory as SplitIO.IBrowserSDK).UserConsent.getStatus();
```

</TabItem>
</Tabs>

## Example apps

The following example application shows how you can integrate the React SDK into your code.

* [React + Redux](https://github.com/splitio/react-redux-sdk-examples)
