---
title: React Native SDK
sidebar_label: React Native SDK
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our React Native SDK. This SDK is built on top of our JS SDK core modules but is optimized for React Native applications. This SDK also has a pluggable API you can use to include more functionality optionally and keep your bundle leaner. 

If already using our isomorphic JavaScript SDK, consider this [migration guide](https://help.split.io/hc/en-us/articles/360059966112-Browser-SDK-Migration-Guide) to understand the changes of the new pluggable API.

All of our SDKs are open source. Go to our [React Native SDK GitHub repository](https://github.com/splitio/react-native-client) to see the source code.

:::info[Migrating from v0.x to v1.x]
Refer to this [migration guide](https://github.com/splitio/react-native-client/blob/development/MIGRATION-GUIDE.md) for complete information on updating to v1.x.
:::

## Language support

The FME SDK for React Native supports both React Native bare projects (using [React-Native CLI](https://reactnative.dev/docs/environment-setup)) and Expo managed projects (using [Expo CLI](https://docs.expo.io/get-started/installation/)).

It has been validated with React Native v0.59 and later, and Expo v36 and later, but should also work with older versions.

## Initialization
 
Set up FME in your code base with two steps.

### 1. Import the SDK into your project

Install the package in your project:

<Tabs>
<TabItem value="With NPM">
```bash
npm install @splitsoftware/splitio-react-native
```
</TabItem>
<TabItem value="With Yarn">
```bash
yarn add @splitsoftware/splitio-react-native
```
</TabItem>
<TabItem value="With Expo CLI">
```bash
expo install @splitsoftware/splitio-react-native
```
</TabItem>
</Tabs>

The SDK supports two synchronization mechanisms, **streaming** (default and recommended) and **polling** which is the fallback in cases where streaming is not supported or as a temporary measure in case of any issues detected on the persistent connection. We recommend following the steps below to enable the necessary support for the Event Source modules.

- For React Native bare projects, you need to *link* the native modules of the package.

If using React Native 0.59 or below, run `react-native link @splitsoftware/splitio-react-native`

If using React Native 0.60+, the [autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) is available and you don't need to run `react-native link`, but you still need to install the pods if developing for iOS, with the command `npx pod-install ios`.

- For Expo managed projects, SDK native modules cannot be used, but you can still support streaming by *polyfilling* the global EventSource constructor:

Install an EventSource implementation such as [react-native-event-source](https://www.npmjs.com/package/react-native-event-source):

```bash
expo install react-native-event-source
```

Polyfill the global EventSource constructor, for example, by including the following in your project entrypoint file (e.g., `App.jsx`): 

```javascript
import RNEventSource from 'react-native-event-source';

globalThis.EventSource = RNEventSource;
```

### 2. Instantiate the SDK and create a new SDK factory client

<Tabs>
<TabItem value="TypeScript (with ES modules)">
```typescript
import { SplitFactory } from '@splitsoftware/splitio-react-native';
 
// Instantiate the SDK
const factory: SplitIO.IBrowserSDK = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that 
    // the user belongs to. 
    // This could also be a cookie you generate for anonymous users
    key: 'key'
  }
});
 
// And get the client instance you'll use
const client: SplitIO.IBrowserClient = factory.client();
```
</TabItem>
<TabItem value="JavaScript (with CommonsJS)">
```javascript
var SplitFactory = require('@splitsoftware/splitio-react-native').SplitFactory;
 
// Instantiate the SDK
var factory = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that 
    // the user belongs to. 
    // This could also be a cookie you generate for anonymous users
    key: 'key'
  }
});
 
// And get the client instance you'll use
var client = factory.client();
```
</TabItem>
</Tabs>

:::info[Notice for TypeScript]
With the SDK package you get the SplitIO namespace, which contains useful types and interfaces for you to use.

Feel free to dive into the declaration files if IntelliSense is not enough!
:::

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application. Consider instantiating it once in the global scope, or in the `componentDidMount` method of your application root component.

Configure the SDK with the SDK key for the FME environment that you would like to access. The SDK key is available in Harness FME Admin settings. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients.  See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

## Using the SDK
 
### Basic use

When the SDK is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while its in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment). 

To make sure the SDK is properly loaded before asking it for a treatment, block until the SDK is ready, as shown below. We set the client to listen for the `SDK_READY` event triggered by the SDK before asking for an evaluation. 

After the `SDK_READY` event fires, you can use the `getTreatment` method to return the proper treatment based on the `FEATURE_FLAG_NAME` and the `key` variables you passed when instantiating the SDK.

Then use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning control.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">
```javascript
client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment("FEATURE_FLAG_NAME");
 
  if (treatment == "on") {
      // insert code here to show on treatment
  } else if (treatment == "off") {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});
```
</TabItem>
<TabItem value="TypeScript">
```typescript
client.on(client.Event.SDK_READY, function() {
  const treatment: SplitIO.Treatment = client.getTreatment("FEATURE_FLAG_NAME");
 
  if (treatment == "on") {
      // insert code here to show on treatment
  } else if (treatment == "off") {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});
```
</TabItem>
</Tabs>

:::info[Notice when debugging in Android]
When running your app in debug mode on an Android device or emulator, you might get a warning notification stating that *"Setting a timer for a long period of time is a performance and correctness issue on Android"*. 

The warning is explained [here](https://github.com/facebook/react-native/issues/12981#issuecomment-652745831). It is intended to make developers aware that timer callbacks are invoked in foreground, and therefore timers could be delayed while the app is in background.

Since the SDK uses timers for periodically pushing data to Harness FME servers, it is acceptable if those operations are delayed while the app is in background, and so it is completely safe to ignore or [hide this warning](https://reactnative.dev/docs/debugging#console-errors-and-warnings). If there is any concern, feel free to contact us through support.

```javascript
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
```
:::

### Attribute syntax 

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `getTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method has a number of variations that are described below. Each of these additionally has a variation that takes an attributes argument, which can defines attributes of the following types: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type Number.
* **Dates: ** Use type Date and express the value in `milliseconds since epoch`. <br />*Note:* Milliseconds since epoch is expressed in UTC. If your date or date-time combination is in a different timezone, first convert it to UTC, then transform it to milliseconds since epoch.
* **Booleans:** Use type Boolean.
* **Sets:** Use type Array.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var attributes = {
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
 
var treatment = client.getTreatment('FEATURE_FLAG_NAME', attributes);
 
if (treatment === 'on') {
  // insert on code here
} else if (treatment === 'off') {
  // insert off code here
} else {
  // insert control code here
}
```
</TabItem>
<TabItem value="TypeScript">
```typescript
const attributes: SplitIO.Attributes = {
  // date attributes are handled as `millis since epoch`
  registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
  // this string will be compared against a list called `plan_type`
  plan_type: 'growth',
  // this number will be compared agains a const value called `deal_size`
  deal_size: 10000,
  // this array will be compared against a set called `permissions`
  permissions: [‘read’, ‘write’]
};
 
const treatment: SplitIO.Treatment = client.getTreatment('FEATURE_FLAG_NAME', attributes);
 
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

You can pass your attributes in exactly this way to the `client.getTreatments` method.

### Binding attributes to the client

Attributes can optionally be bound to the client at any time during the SDK lifecycle. These attributes are stored in memory and used in every evaluation to avoid the need to keep the attribute set accessible through the whole app. When an evaluation is called, the attributes provided (if any) at evaluation time are combined with the ones that are already loaded into the SDK memory, with the ones provided at function execution time taking precedence. This enables those attributes to be overridden or hidden for specific evaluations.

An attribute is considered valid if it follows one of the types listed below:
- String
- Number
- Boolean
- Array

The SDK validates these before storing them and if there are invalid or missing values, possibly indicating an issue, the methods return the boolean `false` and do not update any value.

To use these methods, refer to the example below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var attributes = {
  registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
  plan_type: 'growth',
  deal_size: 10000,
  paying_customer: true,
  permissions: ["read", "write"]
};

// set attributes returns true unless there is an issue storing it
var result = client.setAttributes(attributes);

// set one attribute and returns true unless there is an issue storing it
var result = client.setAttribute('paying_customer', false);

// Get an attribute
var plan_type = client.getAttribute('plan_type');

// Get all attributes
var stored_attributes = client.getAttributes();

// Remove an attribute
var result = client.removeAttribute('permissions');

// Remove all attributes
var result = client.clearAttributes();

```
</TabItem>
</Tabs>

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// Getting treatments by feature flag names
var flagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
var treatments = client.getTreatments(flagNames);

// Getting treatments by set
treatments = client.getTreatmentsByFlagSet('frontend');

// Getting treatments for the union of multiple sets
var flagSets = ['frontend', 'client_side'];
treatments = client.getTreatmentsByFlagSets(flagSets);

// treatments have the following form:
// {
//   FEATURE_FLAG_NAME_1: 'on',
//   FEATURE_FLAG_NAME_2: 'visa'
// }
```
</TabItem>
<TabItem value="TypeScript">
```typescript
// Getting treatments by feature flag names
const flagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
let treatments: SplitIO.Treatments = client.getTreatments(flagNames);

// Getting treatments by set
treatments = client.getTreatmentsByFlagSet('frontend');

// Getting treatments for the union of multiple sets
const flagSets = ['frontend', 'client_side'];
treatments = client.getTreatmentsByFlagSets(flagSets);

// treatments have the following form:
// {
//   FEATURE_FLAG_NAME_1: 'on',
//   FEATURE_FLAG_NAME_2: 'visa'
// }
```
</TabItem>
</Tabs>

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you should use the `getTreatmentWithConfig` method.

This method returns an object with the structure below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var TreatmentResult = {
  String treatment;
  String config; // or null if there is no config for the treatment
}
```
</TabItem>
<TabItem value="TypeScript">
```typescript
type TreatmentResult = {
  treatment: string,
  config: string | null
};
```
</TabItem>
</Tabs>

As you can see from the object structure, the config will be a stringified version of the configuration JSON  defined in Harness FME. If there is no configuration defined for a treatment, the SDK will return `null` for the config parameter.

This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var treatmentResult = client.getTreatmentWithConfig('FEATURE_FLAG_NAME', attributes);
var configs = JSON.parse(treatmentResult.config);
var treatment = treatmentResult.treatment;
 
if (treatment === 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment === 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```
</TabItem>
<TabItem value="TypeScript">
```typescript
const treatmentResult: SplitIO.TreatmentWithConfig = client.getTreatmentWithConfig('FEATURE_FLAG_NAME', attributes);
const configs = JSON.parse(treatmentResult.config);
const treatment = treatmentResult.treatment;

if (treatment === 'on') {
  // insert on code here and use configs here as necessary
} else if (treatment === 'off') {
  // insert off code here and use configs here as necessary
} else {
  // insert control code here
}
```
</TabItem>
</Tabs>

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to TreatmentResults instead of strings. Example usage below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// Getting treatments by feature flag names
var featureFlagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
 
var treatmentResults = client.getTreatmentsWithConfig(featureFlagNames);

// Getting treatments by set
treatmentResults = client.getTreatmentsWithConfigByFlagSet('frontend');

// Getting treatments for the union of multiple sets
var flagSets = ['frontend', 'client_side'];
treatmentResults = client.getTreatmentsWithConfigByFlagSets(flagSets);

// treatmentResults will have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```
</TabItem>
<TabItem value="TypeScript">
```typescript
// Getting treatments by feature flag names
const featureFlagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
 
const treatmentResults: SplitIO.TreatmentsWithConfig = client.getTreatmentsWithConfig(featureFlagNames);

// Getting treatments by set
treatmentResults = client.getTreatmentsWithConfigByFlagSet('frontend');

// Getting treatments for the union of multiple sets
const flagSets = ['frontend', 'client_side'];
treatmentResults = client.getTreatmentsWithConfigByFlagSets(flagSets);

// treatmentResults have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```
</TabItem>
</Tabs>

### Shutdown

You can call the `client.destroy()` method to gracefully shut down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions. 
If the SDK was instantiated in the `componentDidMount` method of a React component, `destroy` should be called in the corresponding `componentWillUnmount` method. 

However while releasing resources if the SDK is not needed anymore is a good practice, since the SDK automatically hooks to application state transitions (foreground, background) data synchronization is managed by the SDK and pending events are flushed automatically. 

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// You can just destroy and remove the variable reference and move on:
user_client.destroy();
user_client = null;
 
// destroy() returns a promise, so if you want to, for example,
// navigate to another page without losing impressions, you 
// can do that once the promise resolves.
user_client.destroy().then(function() {
  user_client = null;

  document.location.replace('another_page');
});
```
</TabItem>
</Tabs>

After `destroy()` is called and finishes, any subsequent invocations to `getTreatment`/`getTreatments` or manager methods result in `control` or empty list, respectively.

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users’ actions and metrics.

[Learn more](https://help.split.io/hc/en-us/articles/360020585772) about using track events in feature flags. 

In the examples below you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are: 

* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period. 
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK was able to successfully queue the event to be sent back to Harness servers on the next event post. The SDK returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

In the case that a bad input has been provided, you can read more about our SDK's expected behavior [here](https://help.split.io/hc/en-us/articles/360020585772-Track-events) 

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// The expected parameters are:
var queued = client.track('TRAFFIC_TYPE', 'EVENT_TYPE', eventValue, { properties });

// Example with both a value and properties
var properties = { package : "premium", admin : true, discount : 50 };
var queued = client.track('user', 'page_load_time', 83.334, properties);

// Example with only properties
var properties = { package : "premium", admin : true, discount : 50 };
var queued = client.track('user', 'page_load_time', null, properties);
```
</TabItem>
<TabItem value="TypeScript">
```typescript
// Example with both a value and properties
const properties: SplitIO.Properties = { package: "premium", admin: true, discount: 50 };
const queued: boolean = client.track('user', 'page_load_time', 83.334, properties);

// Example with only properties
const properties = { package: "premium", admin: true, discount: 50 };
const queued = client.track('user', 'page_load_time', null, properties);
```
</TabItem>
</Tabs>

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- | 
| core.labelsEnabled | Enable impression labels from being sent to Harness FME's backend. Labels may contain sensitive information. | true |
| startup.readyTimeout | Maximum amount of time in seconds to wait before firing the `SDK_READY_TIMED_OUT` event | 10 |
| startup.requestTimeoutBeforeReady | The SDK has two main endpoints it uses /splitChanges and /mySegments that it hits to get ready. This config sets how long (in seconds) the SDK will wait for each request it makes as part of getting ready. | 5 |
| startup.retriesOnFailureBeforeReady | How many retries on /splitChanges and /mySegments we will do while getting the SDK ready | 1 |
| startup.eventsFirstPushWindow | Use to set a specific timer (expressed in seconds) for the first push of events, starting on SDK initialization. | 10 |
| scheduler.featuresRefreshRate | The SDK polls Harness servers for changes to feature rollout plans. This parameter controls this polling period in seconds. | 60 |
| scheduler.segmentsRefreshRate | The SDK polls Harness servers for changes to segment definitions. This parameter controls this polling period in seconds. | 60 |
| scheduler.impressionsRefreshRate | The SDK sends information on who got what treatment at what time back to Harness servers to power analytics. This parameter controls how often this data is sent to Harness servers. The parameter should be in seconds. | 300 |
| scheduler.impressionsQueueSize | The max amount of impressions we queue. If the queue is full, the SDK flushes the impressions and resets the timer. | 30000 |
| scheduler.eventsPushRate | The SDK sends tracked events to Harness servers. This setting controls that flushing rate in seconds. | 60 |
| scheduler.eventsQueueSize | The max amount of events we queue. If the queue is full, the SDK flushes the events and resets the timer. | 500 |
| scheduler.telemetryRefreshRate | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds (1 hour) |
| sync.splitFilters | Filter specific feature flags to be synced and evaluated by the SDK. This is formed by a type string property and a list of string values for the given criteria. Using the types 'bySet' (recommended, flag sets are available in all tiers) or 'byName', pass an array of strings defining the query. If empty or unset, all feature flags are downloaded by the SDK. | [] |
| sync.impressionsMode | This configuration defines how impressions (decisioning events) are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, ALL impressions are queued and sent to Harness; this is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `OPTIMIZED` |
| sync.enabled | Controls the SDK continuous synchronization flags. When `true`, a running SDK processes rollout plan updates performed in Harness FME (default). When `false`, it fetches all data upon init, which ensures a consistent experience during a user session and optimizes resources when these updates are not consumed by the app. | true |
| sync.requestOptions.getHeaderOverrides | A callback function that can be used to override the Authentication header or append new headers to the SDK's HTTP(S) requests. | undefined |
| debug | Either a boolean flag, string log level or logger instance for activating SDK logs. See [logging](#logging) for details. | false |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | true |
| userConsent | User consent status used to control the tracking of events and impressions. Possible values are `GRANTED`, `DECLINED`, and `UNKNOWN`. See [User consent](#user-consent) for details. | `GRANTED` |

To set each of the parameters defined above, use the following syntax.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var sdk = SplitFactory({
  startup: {
    readyTimeout:                 10, // 10 sec
    eventsFirstPushWindow:        10  // 10 sec
  },
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'YOUR_KEY'
  },
  scheduler: {
    featuresRefreshRate:      5, // 5 sec 
    segmentsRefreshRate:     60, // 60 sec 
    impressionsRefreshRate: 300, // 300 sec
    impressionsQueueSize: 30000, // 30000 items
    eventsPushRate:          60, // 60 sec
    eventsQueueSize:        500, // 500 items
    telemetryRefreshRate:  3600  // 1 hour
  },
  sync: {
    splitFilters: [{
      type: 'bySet',
      values: ['frontend']
    }],
    impressionsMode: 'OPTIMIZED'
  },
  streamingEnabled: true,
  debug: false
});
```
</TabItem>
<TabItem value="TypeScript">
```typescript
const sdk: SplitIO.IBrowserSDK = SplitFactory({
  startup: {
    readyTimeout:                 10, // 10 sec
    eventsFirstPushWindow:        10  // 10 sec
  },
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'YOUR_KEY'
  },
  scheduler: {
    featuresRefreshRate:      5, // 5 sec 
    segmentsRefreshRate:     60, // 60 sec 
    impressionsRefreshRate: 300, // 300 sec
    impressionsQueueSize: 30000, // 30000 items
    eventsPushRate:          60, // 60 sec
    eventsQueueSize:        500, // 500 items
    telemetryRefreshRate:  3600  // 1 hour
  },
  sync: {
    splitFilters: [{
      type: 'bySet',
      values: ['frontend']
    }],
    impressionsMode: 'OPTIMIZED'
  },
  streamingEnabled: true,
  debug: false
});
```
</TabItem>
</Tabs>

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (aka off-the-grid or offline mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the features. 

Define the feature flags you want to use in the `features` object map. All `getTreatment` calls for a feature flag now only return the one treatment (and config, if defined) that you have defined in the map. You can then change the treatment as necessary for your testing. To update a treatment or a config, or to add or remove feature flags from the mock cache, update the properties of the `features` object you've provided. The SDK simulates polling for changes and updates from it. Do not assign a new object to the `features` property because the SDK has a reference to the original object and will not detect the change.

Any feature that is not provided in the `features` map returns the [control treatment](/docs/feature-management-experimentation/feature-management/control-treatment) if the SDK was asked to evaluate them.

You can use the additional configuration parameters below when instantiating the SDK in `localhost` mode.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- | 
| scheduler.offlineRefreshRate | The refresh interval for the mocked features treatments. | 15 |
| features | A fixed mapping of which treatment to show for our mocked features. | {} <br />By default we have no mocked features. |

To use the SDK in localhost mode, replace the SDK Key on `authorizationKey` property with `'localhost'`, as shown in the example below. Note that you can define in the `features` object a feature flag name and its treatment directly or use a map to define both a treatment and a dynamic configuration.

If you define just a string as the value for a feature flag name, any config returned by our SDKs will always be null. If you use a map, we return the specified treatment and the specified config (which can also be null).

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">
```javascript
import { SplitFactory } from '@splitsoftware/splitio-react-native';

var sdk = SplitFactory({
  core: {
    authorizationKey: 'localhost'
  },
  features: {
    'reporting_v2': 'on', // example with just a string value for the treatment
    'billing_updates': { treatment: 'visa', config: '{ "color": "blue" }' }, // example of a defined config 
    'show_status_bar': { treatment: 'off', config: null } // example of a null config
  },
  scheduler: {
    offlineRefreshRate: 15 // 15 sec
  }
});
 
var client = sdk.client();

// The following code will be evaluated once the engine finishes the initialization
client.on(client.Event.SDK_READY, function() {
  // The sentence below will return 'on'
  var t1 = client.getTreatment('reporting_v2') 
  // The sentence below will return an object with the structure of: {treatment:'visa',config:'{ "color":"blue" }'}
  var t2 = client.getTreatmentWithConfig('billing_updates') 
  // The sentence below will return 'control' because that feature does not exist
  var t3 = client.getTreatmentWithConfig('navigation_bar_changes') 
});
```
</TabItem>
<TabItem value="TypeScript">
```typescript
import { SplitFactory } from '@splitsoftware/splitio-react-native';

const sdk: SplitIO.IBrowserSDK = SplitFactory({
  core: {
    authorizationKey: 'localhost'
  },
  features: {
    'reporting_v2': 'on', // example with just a string value for the treatment
    'billing_updates': { treatment: 'visa', config: '{ "color": "blue"}' } // example of a defined config 
    'show_status_bar': { treatment: 'off', config: null } // example of a null config
  },
  scheduler: {
    offlineRefreshRate: 15 // 15 sec
  }
});
 
const client: SplitIO.IBrowserClient = sdk.client();

// The following code will be evaluated once the engine finishes the initialization
client.on(client.Event.SDK_READY, () => {
  // The sentence below will return 'on'
  const t1: SplitIO.Treatment = client.getTreatment('reporting_v2');
  // The sentence below will return an object with the structure of: {treatment:'visa',config:'{ "color":"blue" }'
  const t2: SplitIO.Treatment = client.getTreatmentWithConfig('billing_updates');
  // The sentence below will return 'control' because that feature does not exist
  const t3: SplitIO.Treatment = client.getTreatmentWithConfig('navigation_bar_changes');
});
```
</TabItem>
</Tabs> 

:::info[Testing with Jest]

We recommend using the SDK in localhost mode for your tests.

For example, you can mock the module import (see [Jest documentation](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options) for details) to instantiate the SDK in localhost mode as shown below:

```javascript
jest.mock('@splitsoftware/splitio-react-native', () => {
  const splitio = jest.requireActual('@splitsoftware/splitio-react-native');
  return {
    ...splitio,
    SplitFactory: () => {
      return splitio.SplitFactory({
        core: {
          authorizationKey: 'localhost',
        },
        // Mock your feature flags and treatments here
        features: {
            feature_flag_1: 'on',
        }
      });
    },
  };
});
```

It is not recommended to use the default (online) mode of the SDK in your tests because it slows them down and increases their instability due to network latencies. However, if you must use it, you need to polyfill the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which is used by the SDK but not provided by Jest and Node.js. [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) is a good option for that.
:::

## Manager

Use the Split Manager to get a list of features available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var factory = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  }
});
 
var manager = factory.manager();

manager.once(manager.Event.SDK_READY, function() {
  // Once it's ready, use the manager
});
```
</TabItem>
<TabItem value="TypeScript">
```typescript
const factory: SplitIO.IBrowserSDK = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  }
});
 
const manager: SplitIO.IManager = factory.manager();

manager.once(manager.Event.SDK_READY, function() {
  // Once it's ready, use the manager
});
```
</TabItem>
</Tabs>

The Manager then has the following methods available.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
/**
 * Returns the feature flag registered with the SDK of this name.
 *
 * @return SplitView or null.
 */
var splitView = manager.split('name-of-feature-flag');
 
/**
 * Retrieves the feature flags that are currently registered with the
 * SDK.
 *
 * returns a List of SplitViews.
 */
var splitViewsList = manager.splits();
 
/** 
 * Returns the names of feature flags registered with the SDK.
 *
 * @return a List of Strings of the feature flag names.
 */
var splitNamesList = manager.names();
```
</TabItem>
<TabItem value="TypeScript">
```typescript
/**
 * Returns the feature flag registered with the SDK of this name.
 *
 * @return SplitView or null.
 */
const splitView: SplitIO.SplitView = manager.split('name-of-feature-flag');
 
/**
 * Retrieves the feature flags that are currently registered with the
 * SDK.
 *
 * returns a List of SplitViews.
 */
const splitViewsList: SplitIO.SplitViews = manager.splits();
 
/** 
 * Returns the names of feature flags registered with the SDK.
 *
 * @return a List of Strings of the feature flag names.
 */
const splitNamesList: SplitIO.SplitNames = manager.names();
```
</TabItem>
</Tabs>

The `SplitView` object referenced above has the following structure:

```typescript title="TypeScript"
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

## Listener
 
FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*. For that purpose, the SDK's configurations have a parameter called `impressionListener` where an implementation of `ImpressionListener` could be added. This implementation **must** define the `logImpression` method and it receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| impression | Object | Impression object that has the feature, key, treatment, label, etc. |
| attributes | Object | A map of attributes passed to `getTreatment`/`getTreatments` (if any). |
| sdkLanguageVersion | String| The version of the SDK. In this case the language is `reactnative` plus the version currently running. |

:::info[Note]
There are two additional keys on this object, `ip` and `hostname`. They are not captured on the client side but kept for consistency.
:::

## Implement custom impression listener

Here is an example of how implement a custom impression listener.
 
<Tabs groupId="java-type-script">
<TabItem value="JavaScript">
```javascript
function logImpression(impressionData) {
  // do something with the impression data.
}
 
var factory = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  impressionListener: {
    logImpression: logImpression
  }
});
```
</TabItem>
<TabItem value="TypeScript">
```typescript
class MyImprListener implements SplitIO.IImpressionListener {
  logImpression(impressionData: SplitIO.ImpressionData) {
    // do something with impressionData
  }
}
 
const factory: SplitIO.IBrowserSDK = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  impressionListener: {
    logImpression: new MyImprListener()
  }
});
```
</TabItem>
</Tabs>

An impression listener is called asynchronously from the corresponding evaluation, but is almost immediate. 

Even though the SDK does not fail if there is an exception in the listener, do not block the call stack.

## Logging
 
To trim as many bits as possible from the user application builds, we divided the logger in implementations that contain the log messages for each log level: `ErrorLogger`, `WarnLogger`, `InfoLogger`, and `DebugLogger`. Higher log level options contain the messages for the lower ones, with DebugLogger containing them all.
Thus, to enable descriptive SDK logging you need to plug in a logger instance as shown below:

<Tabs>
<TabItem value="Logger instance (TypeScript)">
```javascript
import { SplitFactory, DebugLogger } from '@splitsoftware/splitio-react-native';
 
const sdk: SplitIO.IBrowserSDK = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: DebugLogger() // other options are `InfoLogger`, `WarnLogger` and `ErrorLogger`
});
```
</TabItem>
<TabItem value="Logger instance (JavaScript)">
```javascript
var splitio = require('@splitsoftware/splitio-react-native');
 
var sdk = splitio.SplitFactory({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: splitio.DebugLogger() // other options are `InfoLogger`, `WarnLogger` and `ErrorLogger`
});
```
</TabItem>
</Tabs>

You can also enable the SDK logging via a boolean or log level value as `debug` settings, and change it dynamically by calling the SDK Logger API.

However, in any case where the proper logger instance is not plugged in, instead of a human readable message you'll get a code and optionally some params for the log itself. 
While these logs would be enough for the Split support team, if you find yourself in a scenario where you need to parse this information, you can check the constant files in our javascript-commons repository (where you have tags per version if needed) under the [logger folder](https://github.com/splitio/javascript-commons/blob/master/src/logger/).


<Tabs>
<TabItem value="Logger API (TypeScript)">
```javascript
import { SplitFactory } from '@splitsoftware/splitio-react-native';
 
const sdk: SplitIO.IBrowserSDK = SplitFactory({ 
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: true // other options are 'ERROR', 'WARN', 'INFO' and 'DEBUG
});
 
// Or you can use the Logger API methods which have an immediate effect.
sdk.Logger.setLogLevel('WARN'); // Acceptable values are: 'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'
sdk.Logger.enable(); // equivalent to `setLogLevel('DEBUG')`
sdk.Logger.disable(); // equivalent to `setLogLevel('NONE')`
```
</TabItem>
<TabItem value="Logger API (JavaScript)">
```javascript
var splitio = require('@splitsoftware/splitio-react-native');
 
var sdk = splitio.SplitFactory({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: true // other options are 'ERROR', 'WARN', 'INFO' and 'DEBUG
});
 
// Or you can use the Logger API methods which have an immediate effect.
sdk.Logger.setLogLevel('WARN'); // Acceptable values are: 'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'
sdk.Logger.enable(); // equivalent to `setLogLevel('DEBUG')`
sdk.Logger.disable(); // equivalent to `setLogLevel('NONE')`
```
</TabItem>
</Tabs>

## Advanced use cases 

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple SDK clients

FME supports the ability to release based on multiple traffic types. For example, with traffic types, you can release to `users` in one feature flag and `accounts` in another. If you are unfamiliar with using multiple traffic types, refer to the [Traffic type guide](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) for more information.

Each SDK factory client is tied to one specific customer ID at a time, so if you need to roll out feature flags by different traffic types, instantiate multiple SDK clients, one for each traffic type. For example, you may want to roll out the feature `user-poll` by `users` and the feature `account-permissioning` by `accounts`. 

You can do this with the example below.
 
<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var factory = SplitFactory({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'CUSTOMER_ACCOUNT_ID', 
    // Instantiate the sdk once and provide the ID for one of the
    // traffic types that you plan to release to. It doesn't
    // matter which you pick to start off with.
  },
});
 
// When you call factory.client(), the sdk will create a client 
// using the Account ID passed in during the factory creation in the `key` field.
var account_client = factory.client();
 
// To create another client for a User instead, just pass in a User ID (of traffic type user).
// Note: this is only valid after at least one client has been initialized.
var user_client = factory.client('CUSTOMER_USER_ID'); 
 
// check treatment for user-poll and CUSTOMER_USER_ID
var user_poll_treatment = user_client.getTreatment('user-poll');
 
// check treatment for account-permissioning and CUSTOMER_ACCOUNT_ID
var account_permissioning_treatment = account_client.getTreatment('account-permissioning');
 
// track events for accounts
user_client.track('account', 'PAGELOAD', 7.86);
 
// or track events for users
account_client.track('user', 'ACCOUNT_CREATED');
```
</TabItem>
<TabItem value="TypeScript">
```typescript
const sdk: SplitIO.IBrowserSDK = SplitFactory({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'CUSTOMER_ACCOUNT_ID' 
    // Instantiate the sdk once and provide the ID for one of the
    // traffic types that you plan to release to. It doesn't
    // matter which you pick to start off with. 
  },
});
 
// When you call factory.client(), the sdk will create a client 
// using the Account ID passed in during the factory creation in the `key` field.
const account_client: SplitIO.IBrowserClient = factory.client();
 
// To create another client for a User instead, just pass in a User ID (of traffic type user).
// Note: this is only valid after at least one client has been initialized.
const user_client: SplitIO.IBrowserClient = factory.client('CUSTOMER_USER_ID'); 
 
// check treatment for user-poll and CUSTOMER_USER_ID
const user_poll_treatment: SplitIO.Treatment =
  user_client.getTreatment('user-poll');
 
// check treatment for account-permissioning and CUSTOMER_ACCOUNT_ID
const account_permissioning_treatment: SplitIO.Treatment =
  account_client.getTreatment('account-permissioning');

// track events for accounts
user_client.track('account', 'PAGELOAD', 7.86);
 
// or track events for users
account_client.track('user', 'ACCOUNT_CREATED');
```
</TabItem>
</Tabs>

:::info[Number of SDK instances]
While the SDK does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of SDKs down to **one** or **two**.
:::

### Subscribe to events
 
You can listen for three different events from the SDK.

* `SDK_READY`. This event fires once the SDK is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `SDK_READY_TIMED_OUT`. This event fires if the SDK could not download the data from Harness servers within the time specified by the `readyTimeout` configuration parameter. This event does not indicate that the SDK initialization was interrupted.  The SDK continues downloading the rollout plan and fires the `SDK_READY` event when finished.  This delayed `SDK_READY` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `SDK_UPDATE`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

The syntax to listen for each event is shown below.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
function whenReady() {
  var treatment = client.getTreatment('YOUR_FEATURE_FLAG');
 
  if (treatment === 'on') {
    // insert on code
  } else if (treatment === 'off') {
    // insert off code
  } else {
    // insert control code (usually the same as default treatment)
  }
}
 
// the client is ready for start making evaluations with your data
client.once(client.Event.SDK_READY, whenReady);
 
client.once(client.Event.SDK_READY_TIMED_OUT, function () {
  // this callback will be called after 1.5 seconds if and only if the client
  // is not ready for that time. You can still call getTreatment() 
  // but it could return CONTROL.
});
 
client.on(client.Event.SDK_UPDATE, function () {
  // fired each time the client state change. 
  // For example, when a feature flag or segment changes.
  console.log('The SDK has been updated!');
});
```
</TabItem>
<TabItem value="TypeScript">
```typescript
function whenReady() {
  const treatment: SplitIO.Treatment = client.getTreatment('YOUR_FEATURE_FLAG');
 
  if (treatment === 'on') {
    // insert on code
  } else if (treatment === 'off') {
    // insert off code
  } else {
    // insert control code (usually the same as default treatment)
  }
}
 
// the client is ready for start making evaluations with your data
client.once(client.Event.SDK_READY, whenReady);
 
client.once(client.Event.SDK_READY_TIMED_OUT, () => {
  // this callback will be called after 1.5 seconds if and only if the client
  // is not ready for that time. You can still call getTreatment() 
  // but it could return CONTROL.
});
 
client.on(client.Event.SDK_UPDATE, () => {
  // fired each time the client state change. 
  // For example, when a feature flag or segment changes.
  console.log('The SDK has been updated!');
});
```
</TabItem>
</Tabs>

### User consent

The SDK allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined.

The `userConsent` configuration parameter lets you set the initial consent status of the SDK instance, and the factory method `UserConsent.setStatus(boolean)` lets you grant (enable) or decline (disable) dynamic data tracking.

There are three possible initial states:
 * `'GRANTED'`: The user grants consent for tracking events and impressions. The SDK sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: The user declines consent for tracking events and impressions. The SDK does not send them to Harness FME servers.
 * `'UNKNOWN'`: The user neither grants nor declines consent for tracking events and impressions. The SDK tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively.

The status can be updated at any time with the `UserConsent.setStatus` factory method.

Working with user consent is demonstrated below.

```javascript title="User consent: Initial config, getter and setter"
var factory = SplitFactory({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  // Overwrites the initial consent status of the factory instance, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
  // so the SDK will locally track data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
  userConsent: 'UNKNOWN'
});

// `getStatus` method returns the current consent status.
factory.UserConsent.getStatus() === factory.UserConsent.Status.UNKNOWN;

// `setStatus` method lets you update the factory consent status at any time.
// Pass `true` for 'GRANTED' and `false` for 'DECLINED'.
factory.UserConsent.setStatus(true); // Consent status changed from 'UNKNOWN' to 'GRANTED'. Data will be sent to Harness FME servers.
factory.UserConsent.getStatus() === factory.UserConsent.Status.GRANTED;

factory.UserConsent.setStatus(false); // Consent status changed from 'GRANTED' to 'DECLINED'. Data will not be sent to Harness FME servers.
factory.UserConsent.getStatus() === factory.UserConsent.Status.DECLINED;

```

### Usage with React SDK

The [React SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk) is a wrapper around the JavaScript SDK that provides a more React-friendly API based on React components and hooks. You can use the React Native SDK with the React SDK in your React Native application following this [Usage Guide](https://help.split.io/hc/en-us/articles/360038825091-React-SDK#usage-with-react-native).

## Example apps

Here is an example application detailing how to configure and instantiate the Split React Native SDK. 

* [React Native & Expo examples](https://github.com/splitio/react-native-sdk-example)
