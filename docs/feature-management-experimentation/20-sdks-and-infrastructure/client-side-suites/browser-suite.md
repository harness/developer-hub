---
title: Browser Suite
sidebar_label: Browser Suite
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22622277712781-Browser-Suite </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our JavaScript Browser Suite, an SDK designed to leverage the full power of FME. The Browser Suite is built on top of the [Browser SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk) and the [Browser RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent), offering a unified solution, optimized for web development.

The Suite provides the all-encompassing essential programming interface for working with your FME feature flags, as well as capabilities for automatically tracking performance measurements and user events. Code currently using Browser SDK or Browser RUM Agent can be easily upgraded to Browser Suite, which is designed as a drop-in replacement.

## Language support

The JavaScript Browser Suite supports all major browsers. While the library was built to support ES5 syntax, it depends on native support for ES6 Promise. If the Promise object is not available in your target browsers, you will need an ES6 Promise polyfill.

:::tip[Rule-based segments support]
Rule-based segments are supported in SDK versions 2.2.0 and above. No changes are required to your SDK implementation, but updating to a supported version is required to ensure compatibility.

Older SDK versions will return the control treatment for flags using rule-based segments and log an impression with a special label for unsupported targeting rules.
:::

## Initialization

Set up FME in your code base with the following two steps:

### 1. Import the Suite into your project

You can import the Suite into your project by installing the NPM package.

<Tabs>
<TabItem value="NPM (recommended)">

```bash
npm install --save @splitsoftware/browser-suite
```

</TabItem>
<TabItem value="Yarn">

```bash
yarn add @splitsoftware/browser-suite
```

</TabItem>
<TabItem value="CDN bundle">

```html
<script src="//cdn.split.io/sdk/browser-suite-2.1.0.min.js"></script>

```

</TabItem>
</Tabs>

:::info[NPM package is recommended over CDN bundle]
We strongly recommend installing the SDK via NPM or your package manager of choice. The package brings out-of-the-box IntelliSense, TypeScript declarations and tree-shaking support, allowing you to take advantage of optimizations offered by modern module bundlers like Webpack and Rollup.

We also support a prebuilt bundle distributed via CDN. This is particularly useful for quick tests, PoC's or very specific use cases, but it is a large file and may slow down your page load time.
:::

### 2. Instantiate the Suite and create a new SDK client

In your code, instantiate the Suite client as shown below.

<Tabs>
<TabItem value="Using ES modules">

```javascript
import { SplitSuite } from '@splitsoftware/browser-suite';

// Instantiate the Suite
const suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that
    // the user belongs to.
    // This could also be a cookie you generate for anonymous users
    key: 'key'
  }
});

// And get the client instance you'll use
const client = suite.client();
```

</TabItem>
<TabItem value="Using CommonJS">

```javascript
var SplitSuite = require('@splitsoftware/browser-suite').SplitSuite;

// Instantiate the Suite
var suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that
    // the user belongs to.
    // This could also be a cookie you generate for anonymous users
    key: 'key'
  }
});

// And get the client instance you'll use
var client = suite.client();
```

</TabItem>
<TabItem value="Using CDN bundle">

```javascript
// Instantiate the Suite. CDN exposes a splitio object globally,
// with a reference to the SplitSuite (as well as any extra modules)

var suite = splitio.SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    // key represents your internal user id, or the account id that
    // the user belongs to.
    // This could also be a cookie you generate for anonymous users
    key: 'key'
  }
});

// And get the client instance you'll use
var client = suite.client();
```

</TabItem>
</Tabs>

When the Suite is instantiated, it starts synchronizing feature flag and segment definitions from Harness servers, and also starts collecting performance and user events for the configured key and its optional traffic type (which if not set, defaults to `'user'`).

We recommend instantiating the Suite once as a singleton and reusing it throughout your application.

Configure the Suite with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients.  See [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys) to learn more.

## Using the Suite

### Basic use

When the Suite is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of the data. If the Suite is asked to evaluate which treatment to show to a user for a specific feature flag while in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the Suite does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

To make sure the Suite is properly loaded before asking it for a treatment, block until the Suite is ready, as shown below. We set the client to listen for the `SDK_READY` event triggered by the Suite before asking for an evaluation.

After the `SDK_READY` event fires, you can use the `getTreatment` method to return the proper treatment based on the `FEATURE_FLAG_NAME` and the `key` variables you passed when instantiating the Suite.

You can use an if-else statement as shown below and insert the code for the different treatments that you defined in Harness FME. Remember to handle the client returning control, for example, in the final else statement.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment('FEATURE_FLAG_NAME');

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

```javascript
client.on(client.Event.SDK_READY, function() {
  const treatment: SplitIO.Treatment = client.getTreatment('FEATURE_FLAG_NAME');

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

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the Suite's `getTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method has a number of variations that are described below. Each of these additionally has a variation that takes an attributes argument, which can defines attributes of the following types: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type Number.
* **Dates:** Use type Date and express the value in `milliseconds since epoch`. <br />**Note:** Milliseconds since epoch is expressed in UTC. If your date or date-time combination is in a different timezone, first convert it to UTC, then transform it to milliseconds since epoch.
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

```javascript
const attributes: SplitIO.Attributes = {
  // date attributes are handled as `millis since epoch`
  registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
  // this string will be compared against a list called `plan_type`
  plan_type: 'growth',
  // this number will be compared agains a const value called `deal_size`
  deal_size: 10000,
  // this array will be compared against a set called `permissions`
  permissions: ['read', 'write']
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

Attributes can optionally be bound to the client at any time during the Suite lifecycle. These attributes are stored in memory and used in every evaluation to avoid the need to keep the attribute set accessible through the whole app. When an evaluation is called, the attributes provided (if any) at evaluation time are combined with the ones that are already loaded into the Suite memory, with the ones provided at function execution time taking precedence. This enables those attributes to be overridden or hidden for specific evaluations.

An attribute is considered valid if it follows one of the types listed below:
- String
- Number
- Boolean
- Array

The Suite validates these before storing them and if there are invalid or missing values, possibly indicating an issue, the methods return the boolean `false` and do not update any value.

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

// Set attributes returns true unless there is an issue storing it
var result = client.setAttributes(attributes);

// Set one attribute and returns true unless there is an issue storing it
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

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the Suite instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the Suite instance.

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

```javascript
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

This method will return an object with the structure below:

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

```javascript
type TreatmentResult = {
  treatment: string,
  config: string | null
};
```

</TabItem>
</Tabs>

As you can see from the object structure, the config is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the Suite returns `null` for the config parameter. This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

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

```javascript
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

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [`getTreatments`](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to TreatmentResults instead of strings. See example usage below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// Getting treatments by feature flag names
var flagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
var treatmentResults = client.getTreatmentsWithConfig(flagNames);

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

```javascript
// Getting treatments by feature flag names
const flagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
let treatmentResults: SplitIO.TreatmentsWithConfig = client.getTreatmentsWithConfig(flagNames);

// Getting treatments by set
treatmentResults = client.getTreatmentsWithConfigByFlagSet('frontend');

// Getting treatments for the union of multiple sets
const flagSets = ['frontend', 'client_side'];
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
</Tabs>

### Append properties to impressions

[Impressions](/docs/feature-management-experimentation/feature-management/impressions) are generated by the Suite each time a `getTreatment` method is called. These impressions are periodically sent back to Harness servers for feature monitoring and experimentation.

You can append properties to an impression by passing an object of key-value pairs to the `getTreatment` method. These properties are then included in the impression sent by the Suite and can provide useful context to the impression data.

Three types of properties are supported: strings, numbers, and booleans.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
const evaluationOptions = {
  properties: { 
    package: "premium", 
    admin: true, 
    discount: 50 
  }
};

const treatment = client.getTreatment('FEATURE_FLAG_NAME', undefined, evaluationOptions);
```

</TabItem>
<TabItem value="TypeScript">

```typescript
const evaluationOptions: SplitIO.EvaluationOptions = {
  properties: { 
    package: "premium", 
    admin: true, 
    discount: 50 
  }
};

const treatment: string = client.getTreatment('FEATURE_FLAG_NAME', undefined, evaluationOptions);
```

</TabItem>
</Tabs>

### Track

Tracking **events** is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your feature flags on your users' actions and metrics. See the [Events](/docs/feature-management-experimentation/release-monitoring/events/) documentation for more information.

The Suite automatically collects some RUM metrics and sends them to Harness FME. Specifically, some [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) events (see [Default events](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#default-events)) and Web Vitals events are automatically collected by the Suite. Learn more about these and other events in the [Browser RUM Agent](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#events) documentation.

To track custom events, you can use the Suite client's `track` method or the Suite RUM agent's `track` method. Both methods are demonstrated in the code example below.

The Suite client's `track` method sends events for the identity configured on the client instance or passed as a parameter to this method. The `track` method can take up to four arguments. The proper data type and syntax for each are:

* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you have defined in your instance of Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The Suite RUM agent's `track` method sends events for all the identities configured on all instances of the Suite clients. For those clients that have not been configured with a traffic type, the `track` method uses the default traffic type `user`. The Suite RUM agent's `track` method can take up to three of the four arguments described above: `EVENT_TYPE`, `VALUE`, and `PROPERTIES`. 

<Tabs>
<TabItem value="Track per identity (client's track)">

```javascript
var client = suite.client();

// The expected parameters are:
var queued = client.track('TRAFFIC_TYPE', 'EVENT_TYPE', eventValue, eventProperties);

// Example with both a value and properties
var properties = { package : "premium", admin : true, discount : 50 };
var queued = client.track('user', 'page_load_time', 83.334, properties);

// Example with only properties
var properties = { package : "premium", admin : true, discount : 50 };
var queued = client.track('user', 'page_load_time', null, properties);
```

</TabItem>
<TabItem value="Track for all identities (RUM agent's track)">

```javascript
var SplitRumAgent = suite.rumAgent();

// The expected parameters are:
var queued = SplitRumAgent.track('EVENT_TYPE', eventValue, eventProperties);

// Example with both a value and properties
var properties = { package : "premium", admin : true, discount : 50 };
var queued = SplitRumAgent.track('page_load_time', 83.334, properties);

// Example with only properties
var properties = { package : "premium", admin : true, discount : 50 };
var queued = SplitRumAgent.track('page_load_time', null, properties);
```

</TabItem>
</Tabs>

The `track` methods returns a boolean value of `true` or `false` to indicate whether or not the Suite was able to successfully queue the event to be sent back to Harness servers on the next event post. The `track` method returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if incorrect input has been provided. See the [Track events](/docs/feature-management-experimentation/release-monitoring/events/) documentation for more information.

### Shutdown

Harness FME browser solutions are designed to evict pending impressions and events when a page is hidden or closed. Nonetheless you can call the `suite.destroy()` method before letting a process using the Suite exit. This method gracefully shuts down the SDK Suite by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions and events.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
// You can just destroy and move on:
suite.destroy();

// destroy() returns a promise, so if you want to, for example,
// navigate to another page without losing impressions, you
// can do that once the promise resolves.
suite.destroy().then(function() {
  document.location.replace('another_page');
});
```

</TabItem>
</Tabs>

After the `destroy` method is called and finishes, any subsequent invocations to `getTreatment`/`getTreatments` or manager methods result in `control` or an empty list, respectively. You can also call `destroy` on the client instance, which will stop the specific Suite client and remove this client's identity from the Suite's RUM agent, but will keep the Suite running.

:::warning[Important!]
A call to the Suite's `destroy` method destroys all client objects and stops the Suite's RUM agent from tracking events. To create a new client instance, first create a new Suite instance.
:::

## Configuration

The Suite has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the Suite. The parameters available for configuration are shown below in separate tables for those parameters that affect feature flagging, those that affect the Suite RUM agent, and those that affect both.

Feature flagging parameters:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| core.labelsEnabled | Enable impression labels from being sent to Harness FME servers. Labels may contain sensitive information. | true |
| startup.readyTimeout | Maximum amount of time in seconds to wait before firing the `SDK_READY_TIMED_OUT` event | 10 |
| startup.requestTimeoutBeforeReady | The Suite has two main endpoints it uses /splitChanges and /mySegments that it hits to get ready. This config sets how long (in seconds) the Suite will wait for each request it makes as part of getting ready. | 5 |
| startup.retriesOnFailureBeforeReady | How many retries on /splitChanges and /mySegments we will do while getting the Suite ready | 1 |
| startup.eventsFirstPushWindow | Use to set a specific timer (expressed in seconds) for the first push of events, starting on Suite initialization. | 10 |
| scheduler.featuresRefreshRate | The Suite polls Harness servers for changes to feature rollout plans. This parameter controls this polling period in seconds. | 60 |
| scheduler.segmentsRefreshRate | The Suite polls Harness servers for changes to segment definitions. This parameter controls this polling period in seconds. | 60 |
| scheduler.impressionsRefreshRate | The Suite sends information on who got what treatment at what time back to Harness servers to power analytics. This parameter controls how often this data is sent to Harness servers. The parameter should be in seconds. | 300 |
| scheduler.impressionsQueueSize | The max amount of impressions we queue. If the queue is full, the Suite flushes the impressions and resets the timer. | 30000 |
| scheduler.eventsPushRate | The Suite sends tracked events to Harness servers. This setting controls that flushing rate in seconds. | 60 |
| scheduler.eventsQueueSize | The max amount of events we queue. If the queue is full, the Suite flushes the events and resets the timer. | 500 |
| scheduler.telemetryRefreshRate | The Suite caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds (1 hour) |
| sync.splitFilters | Filter specific feature flags to be synced and evaluated by the Suite. This is formed by a type string property and a list of string values for the given criteria. Using the types 'bySet' (recommended, flag sets are available in all tiers) or 'byName', pass an array of strings defining the query. If empty or unset, all feature flags are downloaded by the Suite. | [] |
| sync.impressionsMode | This configuration defines how impressions (decisioning events) are queued on the Suite. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, ALL impressions are queued and sent to Harness; this is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `OPTIMIZED` |
| sync.enabled | Controls the Suite continuous synchronization flags. When `true`, a running Suite processes rollout plan updates performed in Harness FME (default). When `false`, it fetches all data upon init, which ensures a consistent experience during a user session and optimizes resources when these updates are not consumed by the app. | true |
| sync.requestOptions.getHeaderOverrides | A callback function that can be used to override the Authentication header or append new headers to the Suite's HTTP(S) requests. | undefined |
| storage | Pluggable storage instance to be used by the Suite as a complement to in memory storage. Only supported option today is `InLocalStorage`. See the [Configuration](#configuring-localstorage-cache-for-the-sdk) section for details. | In memory storage |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the Suite will fallback to the polling mechanism. If false, the Suite will poll for changes as usual without attempting to use streaming. | true |

Suite RUM agent parameters:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| rumAgent.prefix | Optional prefix to append to the `eventTypeId` of the events sent to Harness by the RUM Agent. For example, if you set the prefix to 'my-app', the event type 'error' will be sent as 'my-app.error'. | undefined |
| rumAgent.pushRate | The Agent posts the queued events data in bulks. This parameter controls the posting rate in seconds. | 30 |
| rumAgent.queueSize | The maximum number of event items the RUM Agent will queue. If more values are queued, events will be dropped until they are sent to Harness FME. | 5000 |
| rumAgent.eventCollectors | The RUM Agent tracks some events by default using event collectors. These event collectors include errors, navigation timing metrics (`page.load.time` and `time.to.dom.interactive` event types), and Web-Vitals. You can disable any of them by setting their value to `false`. Go to [RUM Agent events](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#events) for more information on each event. | \{ errors: true, navigationTiming: true, webVitals: true \} |

Shared parameters:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| debug | Either a boolean flag, string log level or logger instance for activating logging. See the [Logging](#logging) section for details. | false |
| userConsent | User consent status used to control the tracking of events and impressions. Possible values are `GRANTED`, `DECLINED`, and `UNKNOWN`. See the [User consent](#user-consent) section for details. | `GRANTED` |

To set each of the parameters defined above, use the following syntax:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var suite = SplitSuite({
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
  debug: false,
  rumAgent: {
    prefix: 'my-app',
    pushRate:     30, // 30 sec
    queueSize:  5000,
    eventCollectors: {
      errors: true,
      navigationTiming: true,
      webVitals: true
    }
  }
});
```

</TabItem>
<TabItem value="TypeScript">

```javascript
const suite: ISuiteSDK = SplitSuite({
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
  debug: false,
  rumAgent: {
    prefix: 'my-app',
    pushRate:     30, // 30 sec
    queueSize:  5000,
    eventCollectors: {
      errors: true,
      navigationTiming: true,
      webVitals: true
    }
  }
});
```

</TabItem>
</Tabs>

### Configuring LocalStorage cache for the Suite

To use the pluggable `InLocalStorage` option of the Suite and be able to cache flags for subsequent loads in the same browser, you need to pass it to the Suite config as the `storage` option.

This `InLocalStorage` function accepts an optional object with options described below:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| prefix | An optional prefix for your data, to avoid collisions. This prefix is prepended to the existing "SPLITIO" localStorage prefix. | `SPLITIO` |
| expirationDays | Number of days before cached data expires if it was not updated. If cache expires, it is cleared when the SDK is initialized. | 10 |
| clearOnInit | When set to `true`, the SDK clears the cached data on initialization unless it was cleared within the last 24 hours. This 24-hour window is not configurable. If the cache is cleared (whether due to expiration or `clearOnInit`), both the 24-hour period and the `expirationDays` period are reset. | false |

<Tabs>
<TabItem value="With ES Modules">

```javascript
import { SplitSuite, InLocalStorage } from '@splitsoftware/browser-suite';

const suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  storage: InLocalStorage({
    prefix: 'MY_PREFIX',
    expirationDays: 10,
    clearOnInit: false
  })
});

// Now use the Suite as usual
const client = suite.client();
```

</TabItem>
</Tabs>

## Localhost mode

For testing, a developer can evaluate FME feature flags on their development machine without requiring network connectivity. To achieve this, the Suite can be started in **localhost** mode (aka off-the-grid or offline mode). In this mode, the Suite neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine the treatment returned by any given feature flag.

Define the feature flags you want to use in the `features` object map. All `getTreatment` calls for a feature flag now only return the one treatment (and config, if defined) that you have defined in the map. You can then change the treatment as necessary for your testing. To update a treatment or a config, or to add or remove feature flags from the mock cache, update the properties of the `features` object you've provided. The SDK simulates polling for changes and updates from it. Do not assign a new object to the `features` property because the SDK has a reference to the original object and will not detect the change.

Any feature flag that is not provided in the `features` map returns the [control treatment](/docs/feature-management-experimentation/feature-management/control-treatment) if the SDK is asked to evaluate it.

You can use the additional configuration parameters below when instantiating the SDK in `localhost` mode.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| scheduler.offlineRefreshRate | The refresh interval for the mocked features treatments. | 15 |
| features | A fixed mapping of which treatment to show for our mocked features. | {} <br />By default we have no mocked features. |

To use the SDK in localhost mode, replace the SDK key on `authorizationKey` property with `'localhost'`, as shown in the example below. Note that you can define in the `features` object a feature flag name and its treatment directly or use a map to define both a treatment and a dynamic configuration.

If you define just a string as the value for a feature flag name, any config returned by our SDKs are always null. If you use a map, we return the specified treatment and the specified config (which can also be null).

<Tabs>
<TabItem value="Using ES modules">

```javascript
import { SplitSuite } from '@splitsoftware/browser-suite';

const suite = SplitSuite({
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
  },
});

const client = suite.client();

// The following code will be evaluated once the engine finishes the initialization
client.on(client.Event.SDK_READY, () => {
  // The sentence below will return 'on'
  const t1 = client.getTreatment('reporting_v2');
  // The sentence below will return an object with the structure of: {treatment:'visa',config:'{ "color":"blue" }'
  const t2 = client.getTreatmentWithConfig('billing_updates');
  // The sentence below will return 'control' because that feature does not exist
  const t3 = client.getTreatmentWithConfig('navigation_bar_changes');
});
```

</TabItem>
</Tabs>

## Manager

Use the Split Manager to get a list of features available to the SDK client. To instantiate a Manager in your code base, use the same suite instance that you used for your client:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  }
});

var manager = suite.manager();

manager.once(manager.Event.SDK_READY, function() {
  // Once it's ready, use the manager
});
```

</TabItem>
<TabItem value="TypeScript">

```javascript
const suite: ISuiteSDK = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  }
});

const manager: SplitIO.IManager = suite.manager();

manager.once(manager.Event.SDK_READY, function() {
  // Once it's ready, use the manager
});
```

</TabItem>
</Tabs>

The Manager has the following methods available:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
/**
 * Returns the feature flag registered within the SDK that matches this name.
 *
 * @return SplitView or null.
 */
var splitView = manager.split('name-of-feature-flag');

/**
 * Retrieves all the feature flags that are currently registered within the SDK.
 *
 * returns a List of SplitViews.
 */
var splitViewsList = manager.splits();

/**
 * Returns the names of all feature flags registered within the SDK.
 *
 * @return a List of Strings of the features' names.
 */
var splitNamesList = manager.names();
```

</TabItem>
<TabItem value="TypeScript">

```javascript
/**
 * Returns the feature flag registered within the SDK that matches this name.
 *
 * @return SplitView or null.
 */
const splitView: SplitIO.SplitView = manager.split('name-of-feature-flag');

/**
 * Retrieves all the feature flags that are currently registered within the SDK.
 *
 * returns a List of SplitViews.
 */
const splitViewsList: SplitIO.SplitViews = manager.splits();

/**
 * Returns the names of all feature flags registered within the SDK.
 *
 * @return a List of Strings of the features' names.
 */
const splitNamesList: SplitIO.SplitNames = manager.names();
```

</TabItem>
</Tabs>

The `SplitView` object referenced above has the following structure:

<Tabs>
<TabItem value="TypeScript">

```typescript
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
  impressionsDisabled: boolean,
  prerequisites: Array<{ flagName: string, treatments: string[] }>
}
```

</TabItem>
</Tabs>

## Listener

The SDK Suite sends impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*. For that purpose, the Suite's configurations have a parameter called `impressionListener` where an implementation of `ImpressionListener` could be added. This implementation **must** define the `logImpression` method and it receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| impression | Object | Impression object that has the feature, key, treatment, label, etc. |
| attributes | Object | A map of attributes passed to `getTreatment`/`getTreatments` (if any). |
| sdkLanguageVersion | String| The version of the SDK. In this case the language is `browserjs` plus the version currently running. |

:::info[Note]
There are two additional keys on this object, `ip` and `hostname`. They are not captured but kept for consistency with server-side SDKs.
:::

### Implement custom impression listener

The following is an example of how to implement a custom impression listener.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
function logImpression(impressionData) {
  // do something with the impression data.
}

var suite = SplitSuite({
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

```javascript
class MyImprListener implements SplitIO.IImpressionListener {
  logImpression(impressionData: SplitIO.ImpressionData) {
    // do something with impressionData
  }
}

const suite: ISuiteSDK = SplitSuite({
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

To trim as many bits as possible from the user application builds, we divided the logger in implementations that contain the log messages for each log level: `ErrorLogger`, `WarnLogger`, `InfoLogger`, and `DebugLogger`. Higher log level options contain the messages for the lower ones, with DebugLogger containing them all. To enable descriptive logging, you need to plug in a logger instance as shown below:

<Tabs>
<TabItem value="ES Modules">

```javascript
import { SplitSuite, DebugLogger } from '@splitsoftware/browser-suite';

const suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: DebugLogger() // other options are `InfoLogger`, `WarnLogger` and `ErrorLogger`
});
```

</TabItem>
<TabItem value="CommonJS">

```javascript
var splitio = require('@splitsoftware/browser-suite');

var suite = splitio.SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: splitio.DebugLogger() // other options are `InfoLogger`, `WarnLogger` and `ErrorLogger`
});
```

</TabItem>
</Tabs>

You can also enable the Suite logging via a boolean or log level value as `debug` settings, and change it dynamically by calling the Suite Logger API. However, in any case where the proper logger instance is not plugged in, instead of a human readable message, you'll get a code and optionally some params for the log itself. If you find yourself in a scenario where you need to parse this information, you can check the constant files in our javascript-commons repository (where you have tags per version if needed) under the [logger folder](https://github.com/splitio/javascript-commons/blob/master/src/logger/).

```javascript title="Logger API"
import { SplitSuite } from '@splitsoftware/browser-suite';

const suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: true // other options are 'ERROR', 'WARN', 'INFO' and 'DEBUG
});

// Or you can use the Logger API methods which have an immediate effect.
suite.Logger.setLogLevel('WARN'); // Acceptable values are: 'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'
suite.Logger.enable(); // equivalent to `setLogLevel('DEBUG')`
suite.Logger.disable(); // equivalent to `setLogLevel('NONE')`
```

Suite logging can also be globally enabled via a localStorage value by opening your DevTools console and typing the following:

```javascript title="Enable logging from browser console"
// Acceptable values are 'DEBUG', 'INFO', 'WARN', 'ERROR' and 'NONE'
// Other acceptable values are 'on', 'enable' and 'enabled', which are equivalent to 'DEBUG' log level
localStorage.splitio_debug = 'on' <enter>

```

## Advanced use cases

This section describes advanced use cases and features provided by the Suite.

### Instantiate multiple clients

FME supports the ability to release based on multiple traffic types. For example, with traffic types, you can release to `users` in one feature flag and `accounts` in another. If you are unfamiliar with using multiple traffic types, refer to the [Traffic type guide](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) for more information.

Each Suite client is tied to one specific customer ID at a time, so if you need to roll out feature flags by different traffic types, instantiate multiple clients, one for each traffic type. For example, you may want to roll out the feature `user-poll` by `users` and the feature `account-permissioning` by `accounts`.

You can do this with the example below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
var suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'CUSTOMER_ACCOUNT_ID',
    // Instantiate the suite once and provide the ID for one of the
    // traffic types that you plan to release to. It doesn't
    // matter which you pick to start off with.
  },
});

// now when you call suite.client(), the suite creates a client
// using the Account ID and traffic type name (if any)
// you passed in during the suite creation.
var account_client = suite.client();

// to create another client for a User instead, just pass in a User ID

// This is only valid after at least one client has been initialized.
var user_client = suite.client('CUSTOMER_USER_ID');

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

```javascript
const suite: ISuiteSDK = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'CUSTOMER_ACCOUNT_ID'
    // instantiate the suite once and provide the ID for one of the
    // traffic types that you plan to release to. It doesn't
    // matter which you pick to start off with.
  },
});

// now when you call suite.client(), the suite will create a client
// using the Account ID you passed in during the suite creation.
const account_client: SplitIO.IClient = suite.client();

// to create another client for a User instead, just pass in a
// User ID to the suite.client() method. This is only valid after
// at least one client has been initialized.
const user_client: SplitIO.IClient = suite.client('CUSTOMER_USER_ID');

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

The events captured by the RUM Agent are sent to Harness servers using the traffic types and keys of the created client. If no traffic type is provided, the traffic type is `user` by default.

:::info[Number of Suite instances]
While the Suite does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of instances down to **one** or **two**.
:::

### Subscribe to events

You can listen for four different events from the Suite.

* `SDK_READY_FROM_CACHE`. This event fires once the Suite is ready to evaluate treatments using a version of your rollout plan cached in localStorage from a previous session (which might be stale). If there is data in localStorage, this event fires almost immediately, since access to localStorage is fast; otherwise, it doesn't fire.
* `SDK_READY`. This event fires once the Suite is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `SDK_READY_TIMED_OUT`. This event fires if there is no cached version of your rollout plan cached in localStorage, and the Suite could not download the data from Harness servers within the time specified by the `readyTimeout` configuration parameter. This event does not indicate that the Suite initialization was interrupted.  The Suite continues downloading the rollout plan and fires the `SDK_READY` event when finished.  This delayed `SDK_READY` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `SDK_UPDATE`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

The syntax to listen for each event is shown below:

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
function whenReady() {
  var treatment = client.getTreatment('YOUR_SPLIT');
  if (treatment === 'on') {
    // insert on code
  } else if (treatment === 'off') {
    // insert off code
  } else {
    // insert control code (usually the same as default treatment)
  }
}
client.once(client.Event.SDK_READY, function () {
  // the client is ready to evaluate treatments according to the latest feature flag definitions
});

client.once(client.Event.SDK_READY_TIMED_OUT, function () {
  // this callback will be called after the set timeout period has elapsed if and only if the client
  // is not ready for that time. You can still call getTreatment()
  // but it could return CONTROL.
});

client.on(client.Event.SDK_UPDATE, function () {
  // fired each time the client state changes.
  // For example, when a feature flag or a segment changes.
  console.log('Feature flag or segment definitions have been updated!');
});

// This event fires only using the LocalStorage option and if there's Harness FME data stored in the browser.
client.once(client.Event.SDK_READY_FROM_CACHE, function () {
  // Fired after the Suite could confirm the presence of the Harness FME data.
  // This event fires really quickly, since there's no actual fetching of information.
  // Keep in mind that data might be stale, this is NOT a replacement of SDK_READY.
});
```

</TabItem>
<TabItem value="TypeScript">

```javascript
function whenReady() {
  const treatment: SplitIO.Treatment = client.getTreatment('YOUR_SPLIT');

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
  // For example, when a feature flag or a segment changes.
  console.log('Feature flag or segment definitions have been updated!');
});

// This event fires only using the LocalStorage option and if there's Harness FME data stored in the browser.
client.once(client.Event.SDK_READY_FROM_CACHE, function () {
  // Fired after the Suite could confirm the presence of the Harness FME data.
  // This event fires really quickly, since there's no actual fetching of information.
  // Keep in mind that data might be stale, this is NOT a replacement of SDK_READY.
});
```

</TabItem>
</Tabs>

### User consent

The Suite allows you to disable the tracking of events and impressions until user consent is explicitly granted or declined.

The `userConsent` configuration parameter lets you set the initial consent status of the Suite instance, and the Suite method `UserConsent.setStatus(boolean)` lets you grant (enable) or decline (disable) the dynamic data tracking.

There are three possible initial states:
 * `'GRANTED'`: the user grants consent for tracking events and impressions. The Suite sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: the user declines consent for tracking events and impressions. The Suite does not send them to Harness FME servers.
 * `'UNKNOWN'`: the user neither grants nor declines consent for tracking events and impressions. The Suite tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively. The status can be updated at any time with the `UserConsent.setStatus` Suite method.

<Tabs>
<TabItem value="User consent: initial config, getter and setter">

```javascript
var suite = SplitSuite({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  // Overwrites the initial consent status of the suite instance, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
  // so the suite will locally track data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
  userConsent: 'UNKNOWN'
});


// `getStatus` method returns the current consent status.
suite.UserConsent.getStatus() === suite.UserConsent.Status.UNKNOWN;

// `setStatus` method lets you update the suite consent status at any moment.
// Pass `true` for 'GRANTED' and `false` for 'DECLINED'.
suite.UserConsent.setStatus(true); // Consent status changed from 'UNKNOWN' to 'GRANTED'. Data will be sent to Harness FME servers.
suite.UserConsent.getStatus() === suite.UserConsent.Status.GRANTED;

suite.UserConsent.setStatus(false); // Consent status changed from 'GRANTED' to 'DECLINED'. Data will not be sent to Harness FME servers.
suite.UserConsent.getStatus() === suite.UserConsent.Status.DECLINED;

```

</TabItem>
</Tabs>

### RUM agent configuration

The Suite handles the setup of the RUM agent using the same SDK key. Configurations for [Logging](#logging), [User consent](#user-consent) and [Identities](#instantiate-multiple-clients) are also shared between the Suite and the RUM agent.

You can further configure the RUM agent using the `rumAgent` property of the Suite configuration object, which is passed as the second argument to the RUM agent's [`setup` method](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#configuration):

```javascript
import { SplitSuite } from '@splitsoftware/browser-suite';

const suite = SplitSuite({
  ...
  rumAgent: {
    // Optional prefix to append to the `eventTypeId` of the events sent to Harness.
    // For example, if you set the prefix to 'my-app', the event type 'error' will be sent as 'my-app.error'.
    prefix: 'my-app',
    // The agent posts the queued events data in bulks. This parameter controls the posting rate in seconds.
    pushRate: 30,
    // The maximum number of event items we want to queue. If we queue more values, events will be dropped until they are sent to Harness FME.
    queueSize: 5000,
  }
})
```

To extend the RUM agent with custom event collectors or properties, you can use the `SplitRumAgent` singleton instance, retrieving it with the Suite's `rumAgent` method, as shown below:

```javascript
import { SplitSuite, SplitRumAgent, routeChanges } from '@splitsoftware/browser-suite';

SplitRumAgent.register(routeChanges());

const suite = SplitSuite(config);

suite.rumAgent().setProperties({ 'application': 'application_name' });
```