---
title: JavaScript Thin SDK
sidebar_label: JavaScript Thin SDK
description: Set up the Harness FME JavaScript Thin SDK in browser apps, serverless functions, and edge runtimes. The thin SDK calls FME cloud for flag evaluations, so rollout plans and segment definitions never leave the cloud and the SDK only receives flag evaluation results.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide covers the FME **JavaScript Thin SDK**. Unlike the standard [JavaScript Browser SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk), the thin SDK does not download flag definitions or segment data. It calls FME cloud to evaluate flags for a given target and caches the results locally for fast subsequent lookups.

Use the thin SDK when you want to keep rollout configuration server-side, minimize client bundle size, or restrict the targeting data exposed to clients. It runs in modern browsers, serverless functions, and edge runtimes such as Cloudflare Workers, Vercel Edge Functions, AWS Lambda, and Deno.

The library is published on npm as [`@splitsoftware/splitio-thin-client`](https://www.npmjs.com/package/@splitsoftware/splitio-thin-client) in CommonJS and ES module formats.

All of our SDKs are open source. Go to our [JavaScript Thin SDK GitHub repository](https://github.com/splitio/javascript-thin-client) to see the source code.

## Before you begin

The JavaScript Thin SDK runs on any modern JavaScript runtime: all major browsers (Internet Explorer and legacy Edge are not supported), Node.js, and modern serverless or edge platforms. No polyfills are required.

Two notes for non-browser runtimes:

- **Persistence**: the bundled `createLocalStorage(prefix?)` helper depends on the browser `localStorage` API. Outside the browser, the SDK runs in-memory by default. To persist evaluations in serverless or edge environments, implement the public `PersistentStorage` interface against your storage of choice (for example, Cloudflare KV, Redis, IndexedDB, or AsyncStorage) and pass it via `storage`.
- **Streaming**: streaming sync uses the native `EventSource` (SSE) API. In runtimes where it is not available, the SDK automatically falls back to polling.

## Initialization

Set up FME in your code base with the following two steps:

### 1. Import the SDK into your project

Install the SDK from npm (or your preferred package manager). The package ships in CommonJS and ES module formats, with TypeScript type definitions included.

```bash
npm install --save @splitsoftware/splitio-thin-client
```

### 2. Instantiate the SDK and create a new SDK factory client

You instantiate and configure the factory, then get the SDK client from it. The client is what you call `getTreatment` and `track` on.

<Tabs>
<TabItem value="JavaScript (using CommonJS)">

```javascript
var { SplitFactory } = require('@splitsoftware/splitio-thin-client');

// Instantiate the SDK with an SDK key and a default target
var factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: {
    // key identifies the entity being evaluated: an internal user id,
    // an account id, a device id, or a cookie for anonymous users.
    key: 'key',
    trafficType: 'user',
    // attributes are optional and used for targeting rules
    attributes: { plan: 'premium' }
  }
});

// Get the client instance bound to the default target
var client = factory.getClient();
```

</TabItem>
<TabItem value="TypeScript (using ES modules)">

```typescript
import { SplitFactory } from '@splitsoftware/splitio-thin-client';

// Instantiate the SDK with an SDK key and a default target
const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: {
    // key identifies the entity being evaluated: an internal user id,
    // an account id, a device id, or a cookie for anonymous users.
    key: 'key',
    trafficType: 'user',
    // attributes are optional and used for targeting rules
    attributes: { plan: 'premium' }
  }
});

// Get the client instance bound to the default target
const client = factory.getClient();
```

</TabItem>
</Tabs>

:::info[Notice for TypeScript]
The SDK package ships TypeScript declaration files. All public types live on the ambient `SplitIO` namespace (for example, `SplitIO.SplitClient`, `SplitIO.Target`, `SplitIO.EvaluationResult`); the only named module exports are the runtime entry points `SplitFactory` and `createLocalStorage`. In most cases, inference from `SplitFactory(...)` is enough so you do not need to reference the types directly.

Feel free to dive into the declaration files if IntelliSense is not enough.
:::

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application. Avoid creating additional factories without a good reason (for example, using different SDK keys in the same app), since each factory opens its own sync connections and consumes additional resources.

Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a client-side SDK API key. This is a special type of API token with limited privileges for use in browsers or mobile clients. See [API keys](/docs/feature-management-experimentation/api-keys) to learn more.

A factory can serve more than one target. If your app evaluates flags for multiple users, accounts, or other entities, see [Instantiate multiple clients](#instantiate-multiple-clients) under Advanced use.

#### Bucketing keys

`target.key` accepts a bare matching-key string, as in the snippet above. Pass an object instead when you want to use a separate `bucketingKey`, for example to keep a user in the same bucket after they sign in:

```typescript
const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: {
    key: { matchingKey: 'user-123', bucketingKey: 'anon-cookie-abc' },
    trafficType: 'user'
  }
});
```

The matching key drives targeting-rule evaluation; the bucketing key drives the percentage rollout assignment. When `bucketingKey` is omitted, the matching key is used for both.

## Use the SDK

### Basic use

After the SDK is instantiated it warms up by fetching the initial set of treatments for the default target from FME cloud. Until that completes, calls to `getTreatment` may return the configured fallback treatment (or [`control`](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if no fallback is set).

Wait for the `SDK_READY` event before evaluating, or check `client.isReady()` synchronously. After it fires, `getTreatment` returns the latest result for the requested flag and target.

<Tabs groupId="java-type-script">
<TabItem value="JavaScript">

```javascript
client.on(client.Event.SDK_READY, function() {
  var result = client.getTreatment('FEATURE_FLAG_NAME');

  if (result.treatment === 'on') {
      // insert code here to show on treatment
  } else if (result.treatment === 'off') {
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
  const result = client.getTreatment('FEATURE_FLAG_NAME');

  if (result.treatment === 'on') {
      // insert code here to show on treatment
  } else if (result.treatment === 'off') {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});
```

</TabItem>
</Tabs>

### Using attributes in flag evaluations

Attributes live on the [Target](#initialization), not on individual evaluation calls. When you instantiate the SDK you provide a Target that includes the matching key, traffic type, and any attributes used for [custom-attribute targeting](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes). To change them later, call [`setTarget`](#update-the-targets-attributes-or-key) on the same client. If you need to evaluate for an entirely different identity in parallel, instantiate an additional client via [`getClient`](#instantiate-multiple-clients) instead.

Whenever the matching key, bucketing key, or attributes change, the SDK refetches evaluations from FME cloud for the updated Target.

Valid attribute types are strings, numbers, booleans, and arrays of those. `null` and `undefined` entries are dropped before the request is sent. Dates are expected as milliseconds since epoch (UTC); the SDK does not parse `Date` objects, so convert with `getTime()` before passing them in.

<Tabs groupId="java-type-syntax">
<TabItem value="TypeScript">

```typescript
const target: SplitIO.Target = {
  key: { matchingKey: 'CUSTOMER_ID' },
  trafficType: 'user',
  attributes: {
    plan_type: 'growth',
    deal_size: 10000,
    paying_customer: true,
    permissions: ['read', 'write'],
    registered_date: new Date('2026-01-15T00:00:00Z').getTime(),
  },
};

client.setTarget(target);
```

</TabItem>
</Tabs>

### Multiple evaluations at once

To evaluate several flags in a single call, use one of the variations of `getTreatments`:

* `getTreatments(flags)` returns a result for each flag name you pass in.
* `getTreatmentsByFlagSets(flagSets)` returns a result for every flag in the listed [flag sets](/docs/feature-management-experimentation/feature-management/manage-flags/using-flag-sets-to-boost-sdk-performance) currently cached in the SDK.

Both methods return a readonly array of `EvaluationResult` objects.

<Tabs groupId="java-type-multiple-evals">
<TabItem value="TypeScript">

```typescript
// Get treatments for a list of flag names
const flagNames = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'];
const results = client.getTreatments(flagNames);

// Get treatments for the union of multiple flag sets
const flagSets = ['frontend', 'client_side'];
const bySets = client.getTreatmentsByFlagSets(flagSets);

// results / bySets have the following form:
// [
//   { flag: 'FEATURE_FLAG_NAME_1', treatment: 'on', flagSets: ['frontend'], changeNumber: 1700000000000 },
//   { flag: 'FEATURE_FLAG_NAME_2', treatment: 'visa', flagSets: ['frontend', 'client_side'], changeNumber: 1700000000000 },
// ]
```

</TabItem>
</Tabs>

### Evaluation result

Every evaluation method returns an `EvaluationResult` (or a readonly array of them). The shape is:

```typescript title="TypeScript"
interface EvaluationResult {
  flag: string; // the flag name evaluated
  treatment: string; // 'on', 'off', a custom treatment, or 'control'
  config?: string; // stringified JSON of the dynamic configuration, when present
  changeNumber?: number; // version of the flag definition this result was produced from
  flagSets: readonly string[]; // sets the flag belongs to
}
```

If a flag cannot be evaluated, `treatment` is the [fallback treatment](#configure-fallback-treatments) (or `'control'` if no fallback is set).

[Dynamic configurations](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations) are opt-in. By default the SDK does not request them, so `result.config` is `undefined` and no configuration data is exposed in the response. Set [`configsEnabled: true`](#configuration) at factory init to receive them. When enabled, `config` is a stringified JSON you parse with `JSON.parse` before reading values.

<Tabs groupId="java-type-treatments-with-config">
<TabItem value="TypeScript">

```typescript
const result = client.getTreatment('FEATURE_FLAG_NAME');
const config = result.config ? JSON.parse(result.config) : null;

// result has the following form:
// {
//   flag: 'FEATURE_FLAG_NAME',
//   treatment: 'on',
//   config: '{"color":"red","size":"L"}',
//   changeNumber: 1700000000000,
//   flagSets: ['frontend']
// }
```

</TabItem>
</Tabs>

### Update the target's attributes or key

Use `setTarget` to update the active target on an existing client when the session's identity or attributes change (the user logs in, switches accounts, an attribute flips). To run two identities in parallel during the same session, instantiate a second client via [`getClient`](#instantiate-multiple-clients) instead.

The call returns synchronously. Any change to the matching key, bucketing key, or attributes triggers a background refetch of evaluations from FME cloud. Reads issued before the refetch lands operate on an empty cache for the new target, so `getTreatment` returns the configured fallback treatment for each flag (or [`control`](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if no fallback is set). A change that only updates `trafficType` keeps the eval cache and skips the refetch.

Once the refetch lands, the SDK fires [`SDK_UPDATE`](#subscribe-to-events) on the same client. Subscribe to that event to refresh any UI that depends on flag values.

If the input is not a valid target, `setTarget` is a safe no-op: the current target is kept, a warning is logged, and the call does not throw.

<Tabs groupId="java-type-set-target">
<TabItem value="TypeScript">

```typescript
// bare-string key shorthand (equivalent to { matchingKey: 'user-456' })
client.setTarget({ key: 'user-456', trafficType: 'user' });

// full target with attributes
client.setTarget({
  key: { matchingKey: 'user-456' },
  trafficType: 'user',
  attributes: { plan_type: 'enterprise', deal_size: 50000 },
});
```

</TabItem>
</Tabs>

### Shutdown

The SDK exposes two lifecycle methods, both async and Promise-returning:

- `flush()` posts any tracked events queued so far to FME services and resolves when the flush completes.
- `destroy()` flushes pending events, removes event listeners, stops sync work, and releases resources. After it resolves, subsequent `getTreatment*` calls return the configured fallback treatment for each flag (or `control` if no fallback is set), `track` returns `false`, and `manager.getFlagNames()` returns an empty list.

Both methods are available on individual clients. The factory exposes `destroy` only, which flushes and tears down every client it created and then tears down the factory itself. Once a factory is destroyed, create a new factory instance if you need to start the SDK again.

<Tabs groupId="java-type-shutdown">
<TabItem value="TypeScript">

```typescript
await client.flush();
await client.destroy();

await factory.destroy();
```

</TabItem>
</Tabs>

## Track

Use the `track` method to record any actions your customers perform. Each action is an `event` and corresponds to an `event type`. Calling `track` is the first step to getting experimentation data into Harness FME and lets you measure the impact of your feature flags on user actions and metrics. [Learn more about using track events](/docs/feature-management-experimentation/release-monitoring/events/).

The thin client takes the matching key and [traffic type](/docs/feature-management-experimentation/traffic-types/) from the [Target](#initialization) bound to the client, so the `track` call itself takes only three arguments:

* **eventType:** (String, required) The event type to record. Full requirements on this argument are:
     * Contains 80 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, period, or colon.
     * This is the regular expression we use to validate the value: `^[a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}$`
* **value:** (Optional) The value used when creating the metric. Pass `0` or omit the argument to use count-based metrics. The expected data type is **Integer** or **Float**.
* **properties:** (Optional) An object of key-value pairs used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME supports three types of property values:
     * **Strings:** Use type String.
     * **Numbers:** Use type Number.
     * **Booleans:** Use type Boolean.

`track` returns a boolean indicating whether the event was successfully queued to be sent to Harness on the next flush. It returns `false` if the input failed validation or if the client has been destroyed. The thin client does not validate the traffic-type value against your FME project; an unknown traffic type still queues the event but the backend rejects it on ingest.

<Tabs groupId="java-type-track">
<TabItem value="TypeScript">

```typescript
// Event type only
let queued: boolean = client.track('page_load');

// Event type and value
queued = client.track('page_load_time', 83.334);

// Event type, value, and properties
const properties: SplitIO.Properties = { package: 'premium', admin: true, discount: 50 };
queued = client.track('checkout', 49.99, properties);

// Event type and properties only (skip value with undefined)
queued = client.track('checkout', undefined, properties);
```

</TabItem>
</Tabs>

## Configuration

The SDK has a small set of configuration knobs, each tuned to a reasonable default. Override any of them when instantiating the SDK.

Configuration is grouped into a few top-level fields alongside `sdkKey` and `target`:

- `sync` controls how the SDK keeps evaluations fresh (mode, polling, push rate, ready timeout, url overrides).
- `filters` limits which flags are evaluated and synced.
- `storage` plugs in a local cache. See [Configure cache behavior](#configure-cache-behavior).
- `fallbackTreatments` defines what to return when the SDK cannot evaluate a flag. See [Configure fallback treatments](#configure-fallback-treatments).
- `logLevel` and `configsEnabled` are top-level flags.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| `logLevel` | SDK log level. One of `none`, `error`, `warn`, `info`, `debug`, `verbose`. | `none` |
| `configsEnabled` | Whether the SDK requests [dynamic configurations](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations) along with treatments. When `false` (the default), `result.config` is `undefined` and no configuration data is exposed. When `true`, the same evaluation methods (`getTreatment`, `getTreatments`, `getTreatmentsByFlagSets`) return results with `config` populated. | `false` |
| `storage` | Local cache used to persist evaluations across SDK restarts. Use `createLocalStorage(prefix?)` for browser localStorage, or pass any object that implements the `PersistentStorage` interface. See [Configure cache behavior](#configure-cache-behavior). | `undefined` (in-memory only) |
| `sync.mode` | Synchronization mode. `streaming` keeps a persistent SSE connection open and applies updates as they arrive, falling back to polling when streaming is unavailable; `polling` refetches on a fixed interval; `single_sync` fetches once at startup and stops. | `streaming` |
| `sync.pollingRate` | Polling interval in seconds for the polling mode (and the fallback path when streaming is unavailable). Minimum 60 seconds. | `3600` (1 hour) |
| `sync.pushRate` | Interval in seconds for posting tracked events and telemetry. Minimum 30 seconds. | `1800` (30 minutes) |
| `sync.readyTimeout` | Time in seconds to wait before firing `SDK_READY_TIMED_OUT`. Set to `-1` to disable the timeout. | `10` |
| `sync.serviceEndpoints` | Url overrides for SDK services. Provide hosts only; the SDK appends paths internally. Supported keys: `api`, `auth`, `events`, `telemetry`, `streaming`. | Default Harness FME hosts |
| `filters.flagSets` | Restrict evaluation and sync to flags that belong to one or more flag sets. | `undefined` (all flags) |
| `fallbackTreatments` | Treatments returned when the SDK cannot evaluate a flag (not ready, flag not found, parse error). See [Configure fallback treatments](#configure-fallback-treatments). | `undefined` |

To set each of the parameters defined above, use the following syntax:

```typescript
import { SplitFactory, createLocalStorage } from '@splitsoftware/splitio-thin-client';

const settings: SplitIO.SplitFactorySettings = {
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'key', trafficType: 'user' },

  logLevel: 'info',
  configsEnabled: false,

  storage: createLocalStorage('my_app'),

  filters: { flagSets: ['frontend'] },

  fallbackTreatments: {
    global: 'off',
    byFlag: { 'my-feature': { treatment: 'on', config: '{"color":"blue"}' } }
  }
};

const factory = SplitFactory(settings);
```

### Sync modes

The SDK supports three synchronization modes, controlled by `sync.mode`. Pick the one that matches your runtime and freshness requirements.

- **`streaming`** (default). The SDK keeps a long-lived connection open to FME cloud and applies rollout plan changes the moment they are published. Best for long-running browser sessions and Node services where flag changes should take effect without a restart. If the streaming connection cannot be established or drops mid-session (network issues, restrictive proxies, or a runtime without server-sent events), the SDK transparently falls back to polling at `sync.pollingRate` and retries streaming in the background, keeping flags in sync.

- **`polling`**. The SDK refetches evaluations on a fixed interval set by `sync.pollingRate` (default 1 hour, minimum 60 seconds). Use this when streaming is blocked at the network layer, or when you want predictable, periodic refreshes instead of streaming push updates.

- **`single_sync`**. The SDK fetches evaluations once at startup, fires `SDK_READY`, and stops syncing. Use this for ephemeral runtimes (serverless functions, edge workers, server-side rendering) where the SDK lives for a single request and there is no value in keeping a connection open. See [Serverless and edge environments](#serverless-and-edge-environments) for the full pattern.

```typescript
import { SplitFactory } from '@splitsoftware/splitio-thin-client';

const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'CUSTOMER_ID', trafficType: 'user' },
  sync: {
    mode: 'polling',
    pollingRate: 120,
  },
});
```

Regardless of the mode, tracked events and telemetry are flushed on a separate cadence controlled by `sync.pushRate`.

### Configure cache behavior

By default the SDK keeps evaluations in memory and refetches them on every page load. To persist evaluations across page loads in the same browser, pass `createLocalStorage(prefix?)` as the `storage` option. It returns a ready-to-use store backed by the browser's `localStorage`.

```typescript
import { SplitFactory, createLocalStorage } from '@splitsoftware/splitio-thin-client';

const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'CUSTOMER_ID', trafficType: 'user' },
  storage: createLocalStorage('my_app'),
});
```

When persistent storage is configured and a cache from a previous session is found, the SDK fires [`SDK_READY_FROM_CACHE`](#subscribe-to-events) so you can begin evaluating instantly against cached values while the SDK fetches fresh evaluations from FME cloud in the background.

The optional `prefix` is prepended to every key the SDK writes, useful for keeping multiple SDK keys or apps isolated within the same `localStorage` origin. Must match `^[a-zA-Z0-9_]{1,80}$`.

## Manager

Use the Manager to get the list of feature flag names the SDK currently has loaded. The thin Manager exposes a single method, `getFlagNames()`; methods that return full flag definitions (`split(name)`, `splits()`) are not part of the thin client surface. Get the Manager from the same factory you used for your client:

<Tabs groupId="java-type-manager">
<TabItem value="TypeScript">

```typescript
const manager = factory.manager();

const flagNames = manager.getFlagNames();
```

</TabItem>
</Tabs>

`getFlagNames()` returns a readonly array of the flag names currently cached on the SDK. Before the client is ready, the array is empty; wait for `SDK_READY` (or check `client.isReady()`) before calling, see [Subscribe to events](#subscribe-to-events).

If you set [`filters.flagSets`](#configuration) at factory init, `getFlagNames()` returns only the names in those sets, since flags outside the configured sets are never fetched.

## Logging

The SDK writes log messages to the browser console with a `[Split]` prefix, routing each level to its matching `console` method (`console.error`, `console.warn`, `console.info`, `console.debug`). Logging is off by default; turn it on by setting `logLevel` at factory init.

`logLevel` accepts the following values, in order of increasing verbosity:

- `'none'` (default). No logs.
- `'error'`. Failures only, such as network errors and validation rejections.
- `'warn'`. Warnings and errors. Typically covers non-fatal issues like invalid input that the SDK accepted as a no-op or sanitized.
- `'info'`. High-level lifecycle events such as factory init and readiness transitions, plus everything above.
- `'debug'`. Internal milestones useful when diagnosing a specific behavior, plus everything above.
- `'verbose'`. Maximum detail. Useful when assembling repro information for support; expect a high volume of console output.

<Tabs groupId="java-type-logging">
<TabItem value="TypeScript">

```typescript
import { SplitFactory } from '@splitsoftware/splitio-thin-client';

const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'CUSTOMER_ID', trafficType: 'user' },
  logLevel: 'debug',
});
```

</TabItem>
</Tabs>

## Configure fallback treatments

Fallback treatments let you define a treatment value (and optional dynamic configuration) to be returned when a flag cannot be evaluated, for example when the SDK is not ready, the flag does not exist, or a transient error occurs. By default, the SDK returns the reserved `control` treatment, but you can override this globally and/or per flag at the SDK level.

This is useful when you want to:

- Maintain a predictable user experience during outages or evaluation failures (avoid unexpected `control` when not even local cache exists)
- Protect critical user flows by returning a safe, stable treatment (for example, forcing `off` during an incident)
- Customize behavior per flag so each evaluation inherits appropriate safe defaults if something goes wrong

Each entry, global or per flag, can be either a bare treatment string or a `{ treatment, config }` object, where `config` is a JSON string available on the [evaluation result](#evaluation-result) when [`configsEnabled`](#configuration) is on.

### Global fallback treatment

Set a global fallback treatment when initializing the SDK factory. This value is returned whenever any flag cannot be evaluated.

```typescript
const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'CUSTOMER_ID', trafficType: 'user' },
  fallbackTreatments: {
    global: {
      treatment: 'off',
      config: '{"reason":"global-fallback"}',
    },
  },
});

const client = factory.getClient();
```

### Flag-level fallback treatment

You can also configure fallback treatments per flag, alongside `global`. A per-flag entry always takes precedence over the global fallback, so if both are defined the SDK returns the flag-level value when that specific flag cannot be evaluated.

```typescript
const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'CUSTOMER_ID', trafficType: 'user' },
  fallbackTreatments: {
    global: 'off',
    byFlag: {
      'checkout_v2': {
        treatment: 'control_v1',
        config: '{"reason":"flag-level-fallback"}',
      },
      'new_dashboard': 'off',
    },
  },
});

const client = factory.getClient();
```

For more information, see [Fallback treatments](/docs/feature-management-experimentation/feature-management/setup/fallback-treatment/).

## Advanced use cases

This section describes advanced use cases and features provided by the SDK.

### Instantiate multiple clients

Use a second client when your app needs to evaluate for two identities at the same time, for example a logged-in user *and* the account that user belongs to, or two users on the same page. Each client is bound to its own target and runs its own readiness lifecycle, so the SDK can return treatments for both identities in parallel without one overwriting the other.

Call `factory.getClient()` with no arguments to get the client bound to the factory's [default target](#initialization). Pass a target to create or retrieve a client for a different identity.

The factory keys clients by matching key. Calling `getClient` twice with the same matching key returns the same client; if the second call passes a different `trafficType` or different `attributes`, the SDK applies the change in the background via `setTarget` rather than creating a duplicate client.

Each client manages its own readiness, events, and pending writes. Wait for or check readiness on the specific client before evaluating; see [Subscribe to events](#subscribe-to-events) for the event listeners and the synchronous `isReady` / `isReadyFromCache` checks (useful when the client may already be ready from a prior `getClient` call).

<Tabs groupId="java-type-multiple-clients">
<TabItem value="TypeScript">

```typescript
const factory = SplitFactory({
  sdkKey: 'YOUR_SDK_KEY',
  target: { key: 'CUSTOMER_USER_ID', trafficType: 'user' },
});

// Default target client (bound to CUSTOMER_USER_ID / 'user')
const userClient = factory.getClient();

// Second client for the account that owns this user
const accountClient = factory.getClient({
  key: 'CUSTOMER_ACCOUNT_ID',
  trafficType: 'account',
});

const userPoll = userClient.getTreatment('user-poll');
const accountPerms = accountClient.getTreatment('account-permissioning');

accountClient.track('account_created');

// When you no longer need an identity, destroy its client to free its readiness
// listeners and stop syncing for that key.
await accountClient.destroy();
```

</TabItem>
</Tabs>

`client.destroy()` removes that one client from the factory's registry; `factory.destroy()` tears down the factory and every client it created. Destroy any client whose identity is no longer in scope. For sequential identity changes on a single client, prefer [`setTarget`](#update-the-targets-attributes-or-key) over destroying and recreating.

### Subscribe to events

You can listen for four different events from the SDK.

* `SDK_READY_FROM_CACHE`. Fires when the SDK can serve cached evaluations from a previous session. If a `storage` is configured (see [Configure cache behavior](#configure-cache-behavior)) and a cache is present, this event fires almost immediately with stale-but-usable results. If no cache is available, the event still fires, together with `SDK_READY`, signaling that there were no cached results to load.
* `SDK_READY`. Fires once the SDK has fetched a fresh set of evaluations for the current target from FME cloud and is ready to serve them.
* `SDK_READY_TIMED_OUT`. Fires if the SDK has not reached the `SDK_READY` state within the `sync.readyTimeout` window (10 seconds by default; set to `-1` to disable). The SDK continues to fetch in the background and emits `SDK_READY` once it succeeds; calls made before then return the configured fallback treatment, or `control` if no fallback is set.
* `SDK_UPDATE`. Fires when the SDK applies an update to its evaluations (for example, after a streaming push, a poll cycle, or a target switch).

The syntax to listen for each event is shown below:

<Tabs groupId="java-type-events">
<TabItem value="JavaScript">

```javascript
function whenReady() {
  const result = client.getTreatment('FEATURE_FLAG_NAME');

  if (result.treatment === 'on') {
    // insert on code
  } else if (result.treatment === 'off') {
    // insert off code
  } else {
    // insert control code (usually the same as default treatment)
  }
}

client.once(client.Event.SDK_READY, () => {
  // The client has fresh evaluations from FME cloud
  whenReady();
});

function onTimedOut(reason) {
  // Called after `sync.readyTimeout` seconds (10 seconds by default)
  // if the client is not ready in time. You can still call
  // `getTreatment()` but it returns the configured fallback treatment
  // (or `control` if no fallback is set) until ready.
}
client.once(client.Event.SDK_READY_TIMED_OUT, onTimedOut);

// Use `off` to remove a listener you no longer need:
client.off(client.Event.SDK_READY_TIMED_OUT, onTimedOut);

client.on(client.Event.SDK_UPDATE, () => {
  // Fired each time the client receives an updated set of evaluations.
});

client.once(client.Event.SDK_READY_FROM_CACHE, () => {
  // Fired when the SDK has restored evaluations from the local cache.
  // Cached results may be stale; this is NOT a replacement for SDK_READY.
});
```

</TabItem>
</Tabs>

#### Include metadata

`metadata` provides additional context for events:

- `SDK_READY` / `SDK_READY_FROM_CACHE`: Includes `initialCacheLoad` (`true` when there were no cached results to load and the event was synthesized alongside `SDK_READY`) and `lastUpdateTimestamp` (milliseconds since epoch when the cache was last updated; `undefined` when `initialCacheLoad` is `true`).
- `SDK_UPDATE`: Includes `type` (always `FLAGS_UPDATE` in the thin client) and `names` (list of impacted flag names).
- `SDK_READY_TIMED_OUT`: A short string describing the reason the timeout fired.

For example: 

```typescript
client.on(client.Event.SDK_UPDATE, (metadata: SplitIO.SdkUpdateMetadata) => {
  const type: SplitIO.SdkUpdateMetadataType = metadata.type;
  const names: string[] = metadata.names;
})

client.on(client.Event.SDK_READY, (metadata: SplitIO.SdkReadyMetadata) => {
  const initialCacheLoad: boolean = metadata.initialCacheLoad;
  const lastUpdateTimestamp: number | undefined = metadata.lastUpdateTimestamp;
})

client.on(client.Event.SDK_READY_FROM_CACHE, (metadata: SplitIO.SdkReadyMetadata) => {
  const initialCacheLoad: boolean = metadata.initialCacheLoad;
  const lastUpdateTimestamp: number | undefined = metadata.lastUpdateTimestamp;
})

client.on(client.Event.SDK_READY_TIMED_OUT, (reason: string) => {
  console.log('SDK_READY_TIMED_OUT:', reason);
})
```

#### Checking readiness synchronously

The `SDK_READY_FROM_CACHE`, `SDK_READY`, and `SDK_READY_TIMED_OUT` events fire only once per client. If you attach a listener after the event has already fired, it will never be triggered. For this reason, the client exposes two synchronous getters you can call at any time:

```javascript
if (client.isReady()) {
  whenReadyCallback();
} else {
  client.on(client.Event.SDK_READY, whenReadyCallback);
}

// Likewise for cache readiness
if (client.isReadyFromCache()) {
  // it's safe to read cached evaluations
}
```

### Serverless and edge environments

In ephemeral runtimes such as edge workers (Cloudflare, Vercel), serverless handlers (AWS Lambda, Vercel/Netlify Functions), or server-side rendering, persistent caching does not apply: each request starts fresh, so a cache cannot be reused across invocations. Instead, run the SDK in `single_sync` mode so it makes one fetch at startup, evaluates, and stops. Destroy the factory before the handler returns so any tracked events are flushed, facilitating a clean process teardown.

<Tabs groupId="java-type-serverless">
<TabItem value="TypeScript">

```typescript
import { SplitFactory } from '@splitsoftware/splitio-thin-client';

export async function handler(request) {
  const factory = SplitFactory({
    sdkKey: 'YOUR_SDK_KEY',
    target: { key: getUserId(request), trafficType: 'user' },
    sync: { mode: 'single_sync' },
  });

  const client = factory.getClient();

  // Wait for the one-shot fetch before evaluating.
  await new Promise(resolve => client.once(client.Event.SDK_READY, resolve));

  const treatment = client.getTreatment('FEATURE_FLAG_NAME');

  // Flush events and tear down before the handler returns.
  await factory.destroy();

  return respond(treatment);
}
```

</TabItem>
</Tabs>

Skip configuring `storage` in this mode, treatment-level caching is not too useful on ephemeral environments.
