---
title: Angular utilities
sidebar_label: Angular utilities
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Angular utilities built on top of our [JavaScript Browser SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk). An Angular Service and an Angular Guard are provided in this utilities in ESM2020, FESM2020 and FESM2015 module formats. The service provides an easy way to interact with the underneath SDK and work towards any use cases through simplified methods. You can also import from this utilities an Angular Guard to wait for SDK to be ready.

All of our SDKs are open source. Go to our [Angular Utilities GitHub repository](https://github.com/splitio/angular-sdk-plugin) to see the source code.

## Language support

These utilities guarantee support with Angular v15.2.10 or later.

## Initialization

Set up FME in your code base with the following two steps:

### 1. Import the utilities into your project

Import the utilities into your project using the following NPM command:

```bash title="NPM"
npm install --save @splitsoftware/splitio-angular@3.0.0
```

### 2. Instantiate the service

```javascript title="TypeScript (using ES modules)"
import { SplitService } from '@splitsoftware/splitio-angular';

const sdkReady = false;

// Inject service
constructor(private splitService: SplitService){}

// Instantiate the Service
public initPlugin() {

  // Create the config for the plugin.
  const sdkConfig = {
    core: {
      authorizationKey: 'YOUR_SDK_KEY',
      key: 'key'
    }
  };

  // init method returns an observable for sdk readiness
  this.splitService.init(sdkConfig).subscribe(() => {
    this.sdkReady = true
  });
}
```

:::info[Notice for TypeScript]
With the SDK package on NPM, you get the SplitIO namespace, which contains useful types and interfaces for you to use.

Feel free to access the declaration files if IntelliSense is not enough.
:::

We recommend instantiating the service once as a singleton and reusing it throughout your application.

Configure the service with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys) to learn more.

## Using the service

### Basic use

When the SDK is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while its in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, block until the SDK is ready, as shown below. You can subscribe to `splitService.sdkReady$` observable provided by splitService before asking for an evaluation.

After the observable calls back, you can use the `getTreatment` method to return the proper treatment based on the `FEATURE_FLAG_NAME` and the `key` variable you passed when instantiating the SDK.

Then use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning control.

```javascript title="TypeScript"
this.splitService.sdkReady$.subscribe(() => {
  const treatment: SplitIO.Treatment = this.splitService.getTreatment('FEATURE_FLAG_NAME');

  if (treatment == "on") {
      // insert code here to show on treatment
  } else if (treatment == "off") {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});
```

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the splitService's `getTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type Number.
* **Dates:** Use type Date and express the value in `milliseconds since epoch`. <br />*Note:* Milliseconds since epoch is expressed in UTC. If your date or date-time combination is in a different timezone, first convert it to UTC, then transform it to milliseconds since epoch.
* **Booleans:** Use type Boolean.
* **Sets:** Use type Array.

```javascript title="TypeScript"
const attributes: SplitIO.Attributes = {
  // date attributes are handled as `millis since epoch`
  registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
  // this string will be compared against a list called `plan_type` or against another string
  plan_type: 'growth',
  // this number will be compared agains a number value called `deal_size`
  deal_size: 10000,
  // this array will be compared against a set called `permissions`
  permissions: ['read', 'write']
};

const treatment: SplitIO.Treatment = this.splitService.getTreatment('FEATURE_FLAG_NAME', attributes);

if (treatment === 'on') {
  // insert on code here
} else if (treatment === 'off') {
  // insert off code here
} else {
  // insert control code here
}
```

You can pass your attributes in exactly this way to the `splitService.getTreatments` method.

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for.
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluates all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs>
<TabItem value="Treatments">

```javascript
const flagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];

const treatments: SplitIO.Treatments = this.splitService.getTreatments(flagNames);

// treatments will have the following form:
// {
//   FEATURE_FLAG_NAME_1: 'on',
//   FEATURE_FLAG_NAME_2: 'visa'
// }
```

</TabItem>
<TabItem value="TreatmentsByFlagSet">

```javascript

const treatments: SplitIO.Treatments = this.splitService.getTreatmentsByFlagSet('frontend');

// treatments will have the following form:
// {
//   FEATURE_FLAG_NAME_1: 'on',
//   FEATURE_FLAG_NAME_2: 'visa'
// }
```

</TabItem>
<TabItem value="TreatmentsByFlagSets">

```javascript
const flagSetNames = ['frontend', 'client_side'];

const treatments: SplitIO.Treatments = this.splitService.getTreatmentsByFlagSets(flagSetNames);

// treatments will have the following form:
// {
//   FEATURE_FLAG_NAME_1: 'on',
//   FEATURE_FLAG_NAME_2: 'visa'
// }
```

</TabItem>
</Tabs>

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), use the `getTreatmentWithConfig` method. This method returns an object with the structure below:

```javascript title="TypeScript"
type TreatmentResult = {
  treatment: string,
  config: string | null
};
```

From the object structure, the config is a stringified version of the configuration JSON defined in Harness FME. If no configuration is defined for a treatment, the SDK returns `null` for the config parameter. This method takes the same set of arguments as the standard `getTreatment` method. Refer to the examples below for proper usage:

```javascript title="TypeScript"
const treatmentResult: SplitIO.TreatmentWithConfig = this.splitService.getTreatmentWithConfig('FEATURE_FLAG_NAME', attributes);
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

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to TreatmentResults objects instead of strings. Example usage below.

<Tabs>
<TabItem value="getTreatmentsWithConfig">

```javascript
const featureFlagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];

const treatmentResults: SplitIO.TreatmentsWithConfig = this.splitService.getTreatmentsWithConfig(featureFlagNames);

// treatmentResults will have the following form:
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```

</TabItem>
<TabItem value="getTreatmentsWithConfigByFlagSet">

```javascript
const treatmentResults: SplitIO.TreatmentsWithConfig = this.splitService.getTreatmentsWithConfigByFlagSet('frontend');

// treatmentResults will have the following form:
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```

</TabItem>
<TabItem value="getTreatmentsWithConfigByFlagSets">

```javascript
const flagSetsNames = ['frontend', 'client_side'];

const treatmentResults: SplitIO.TreatmentsWithConfig = this.splitService.getTreatmentsWithConfigByFlagSets(flagSetsNames);

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

### Shutdown

Call the `splitService.destroy()` method before letting a process using the SDK exit, as this method gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.

```javascript title="TypeScript"
// You can just destroy and remove the variable reference and move on:
splitService.destroy();
splitService = null;

// destroy() returns a promise, so if you want to, for example,
// navigate to another page without losing impressions, you
// can do that once the promise resolves.
splitService.destroy().then(function() {
  splitService = null;

  router.navigate(['/another']);
});
```

After `destroy()` is called and finishes, any subsequent invocations to `getTreatment`/`getTreatments` or manager methods result in `control` or empty list, respectively.

:::warning[Important!]
A call to the `destroy()` method also destroys the splitService object. When creating new client instance, first initialize the service again.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to getting experimentation data into Harness FME and allows you to measure the impact of your features on your users' actions and metrics. [Learn more about using track events](/docs/feature-management-experimentation/release-monitoring/events/).

In the examples below, you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are:

* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you have defined Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value is used to create the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) An object of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the splitService was able to successfully queue the event to be sent back to Harness servers on the next event post. The service returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

In the case that a bad input is provided, you can read more about our [SDK's expected behavior](/docs/feature-management-experimentation/release-monitoring/events/).

```javascript title="TypeScript"
// The expected parameters are:
const queued: boolean = this.splitService.track('TRAFFIC_TYPE', 'EVENT_TYPE', eventValue, , { properties });

// Example with both a value and properties
const properties = {package : "premium", admin : true, discount : 50};
const queued = this.splitService.track('user', 'page_load_time', 83.334, properties);

// Example with only properties
const properties = {package : "premium", admin : true, discount : 50};
const queued = this.splitService.track('user', 'page_load_time', null, properties);
```

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while providing the config to the splitService.init method as shown in the Initialization section of this doc. To learn about the available configuration options, go to the [JavaScript SDK Configuration section](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk#configuration).

## Manager

To get a list of features available to the SDK factory client, you can use the methods available on splitService as shown below:

```javascript title="TypeScript"
import { SplitService } from '@splitsoftware/splitio-angular';
this.splitService.init({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  storage: InLocalStorage({
    prefix: 'MY_PREFIX'
  })
});
// Now use the service as usual
this.splitService.sdkReady$.subscribe(() => {

  // Get the array of feature flags data in SplitView format.
  const views: SplitIO.SplitViews =
     this.splitService.getSplits();

  // Get the data of a specific feature flag in SplitView format.
  const view: SplitIO.SplitView | null =
     this.splitService.getSplit('billing_updates');

  // Get the array of feature flag names.
  const names: SplitIO.SplitNames =
     this.splitService.getSplitNames();

})
```

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
  sets: Array<string>,
  defaultTreatment: string,
  impressionsDisabled: boolean,
  prerequisites: Array<{
    flagName: string,
    treatments: string[]
  }>
}
```

### Feature flag prerequisites

Feature flag prerequisites allow you to define dependency relationships between flags. A flag is only evaluated if all of its prerequisites evaluate to one of the specified treatments. If any prerequisite is not met, the flag is not evaluated and its `defaultTreatment` is served.

Prerequisites are evaluated before allowlists and targeting rules, enabling you to design complex rollout strategies and conditional flag logic.

For example:

```typescript
const splitView: SplitView = {
  name: "flagB",
  trafficType: "user",
  killed: false,
  treatments: ["on", "off"],
  changeNumber: 123456789,
  configs: {},
  sets: [],
  defaultTreatment: "off",
  impressionsDisabled: false,
  prerequisites: [
    {
      flagName: "flagA",
      treatments: ["on"]
    }
  ]
};
```

In this example, the `flagB` flag will only be evaluated if the `flagA` flag returns the `on` treatment. Otherwise, `flagB` will serve its `defaultTreatment` `"off"`.

## Listener

FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an *impression listener*. For this purpose, the SDK's configurations have a parameter called `impressionListener` where an implementation of `ImpressionListener` could be added. This implementation **must** define the `logImpression` method and it receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| impression | Object | Impression object that has the feature, key, treatment, label, etc. |
| attributes | Object | A map of attributes passed to `getTreatment`/`getTreatments` (if any). |
| sdkLanguageVersion | String| The version of the SDK. In this case the language is `angular` plus the version currently running. |

:::info[Note]
There are two additional keys on this object, `ip` and `hostname`. They are not captured on the client side but kept for consistency.
:::

## Implement custom impression listener

The following is an example of how to implement a custom impression listener:

```javascript title="TypeScript"
import { SplitService } from '@splitsoftware/splitio-angular';

class MyImprListener implements SplitIO.IImpressionListener {
  logImpression(impressionData: SplitIO.ImpressionData) {
    // do something with impressionData
  }
}

this.splitService.init({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
   },
   impressionListener: {
    logImpression: new MyImprListener()
   })
});
```

An impression listener is called asynchronously from the corresponding evaluation, but is almost immediate.

Even though the SDK does not fail if there is an exception in the listener, do not block the call stack.

## Logging

To enable SDK logging in the browser, open your DevTools console and type the following:

```javascript title="Enable logging from browser console"
// Acceptable values are 'DEBUG', 'INFO', 'WARN', 'ERROR' and 'NONE'
// Other acceptable values are 'on', 'enable' and 'enabled', which are equivalent to 'DEBUG' log level
localStorage.splitio_debug = 'on' <enter>
```

Reload the browser to start seeing the logs.

You can also enable the logging via SDK settings and programmatically by calling the Logger API.

```javascript title="Logger API (TypeScript)"
import { SplitFactory } from '@splitsoftware/splitio';

const sdk: SplitIO.ISDK = SplitFactory({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'key'
  },
  debug: true // Debug boolean option can be passed on settings.
  // Acceptable values are: 'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'.
  // It takes precedence over the localStorage flag.
});
```

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple SDK clients

FME supports the ability to release based on multiple traffic types. For example, with traffic types, you can release to `users` in one feature flag and `accounts` in another. If you are unfamiliar with using multiple traffic types, refer to the [Traffic type guide](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) for more information.

Each SDK factory client is tied to one specific customer ID at a time, so if you need to roll out features by different traffic types, instantiate multiple SDK clients, one for each traffic type. For example, you may want to roll out the feature `user-poll` by `users` and the feature `account-permissioning` by `accounts`.

You can do this with the example below:

```javascript title="TypeScript"
import { SplitService } from '@splitsoftware/splitio-angular';

this.splitService.init({
  core: {
    authorizationKey: 'YOUR_SDK_KEY',
    key: 'CUSTOMER_ACCOUNT_ID'
    // instantiate the sdk and service once and provide the ID for one of the
    // traffic types that you plan to release to. It doesn't
    // matter which you pick to start off with.
   }
});

// to create another client for a User instead, just pass in a
// User ID to the splitService.initClient() method. This is only valid after
// at least one client has been initialized.
this.splitService.initClient('CUSTOMER_USER_ID');

// check treatment for user-poll and CUSTOMER_USER_ID
const user_poll_treatment: SplitIO.Treatment =
  this.splitService.getTreatment('user-poll');

// check treatment for account-permissioning and CUSTOMER_ACCOUNT_ID
const account_permissioning_treatment: SplitIO.Treatment =
  this.splitService.getTreatment('CUSTOMER_USER_ID','account-permissioning');

// track events for accounts
this.splitService.track('CUSTOMER_USER_ID','account', 'PAGELOAD', 7.86);

// or track events for users
this.splitService.track('user', 'ACCOUNT_CREATED');
```

In every getTreatment and track method, you can add an user id as first parameter to define which client to use. If a user id parameter is not present, splitService uses the one in SDK config.

:::info[Number of SDK instances]
While the SDK does not put any limitations on the number of instances that can be created, we strongly recommend keeping the number of SDKs down to **one** or **two**.
:::

### Subscribe to events

You can subscribe to four different observables of the splitService.

* `sdkReadyFromCache$`. This event fires once the SDK is ready to evaluate treatments using a version of your rollout plan cached in localStorage from a previous session (which might be stale). If there is data in localStorage, this event fires almost immediately, since access to localStorage is fast; otherwise, it doesn't fire.
* `sdkReady$`. This event fires once the SDK is ready to evaluate treatments using the most up-to-date version of your rollout plan, downloaded from Harness servers.
* `sdkReadyTimedOut$`. This event fires if there is no cached version of your rollout plan cached in localStorage, and the SDK could not download the data from Harness servers within the time specified by the `readyTimeout` configuration parameter. This event does not indicate that the SDK initialization was interrupted.  The SDK continues downloading the rollout plan and fires the `sdkReady$` event when finished.  This delayed `sdkReady$` event may happen with slow connections or large rollout plans with many feature flags, segments, or dynamic configurations.
* `sdkUpdate$`. This event fires whenever your rollout plan is changed. Listen for this event to refresh your app whenever a feature flag or segment is changed in Harness FME.

The syntax to subscribe for each Observable is shown below:

```javascript title="TypeScript"
function whenReady() {
  const treatment: SplitIO.Treatment = this.splitService.getTreatment('FEATURE_FLAG_NAME');

  if (treatment === 'on') {
    // insert on code
  } else if (treatment === 'off') {
    // insert off code
  } else {
    // insert control code (usually the same as default treatment)
  }
}

// the service is ready for start making evaluations with your data
this.splitService.sdkReady$.subscribe(() => {
   whenReady();
}

this.splitService.sdkReadyTimedOut$.subscribe(() => {
   // this callback will be called after 1.5 seconds if and only if the client
   // is not ready for that time. You can still call getTreatment()
   // but it could return CONTROL.
}

this.splitService.sdkUpdate$.subscribe(() => {
   // fired each time the client state change.
   // For example, when a feature flag or segment changes.
   console.log('The SDK has been updated!');
}

// This event will fire only using the LocalStorage option and if there's FME data stored in the browser.
this.splitService.sdkReadyFromCache$.subscribe(() => {
   // Fired after the SDK could confirm the presence of the FME data.
   // This event fires really quickly, since there's no actual fetching of information.
   // Keep in mind that data might be stale, this is NOT a replacement of sdkReady.
}
```

## Angular Guard

These utilities provide an Angular Guard that allows you to avoid loading an angular component if the SDK is not ready.

```javascript title="TypeScript"
import { SplitioGuard } from '@splitsoftware/splitio-angular';

const routes: Routes = [
  {
    path: 'feature',
    component: FeatureComponent,
    // with this guard, featureComponent doesn't load until the SDK is ready
    canActivate: [SplitioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Example apps

The following are example applications detailing how to configure and instantiate the FME Angular utilities on commonly used platforms.

* [Angular](https://github.com/splitio/angular-sdk-examples)