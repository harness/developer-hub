---
title: Browser RUM Agent
sidebar_label: Browser RUM Agent
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-Agent </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about FME's Real User Monitoring (RUM) Agent for Web browsers.

FME's Browser RUM Agent collects events about your users' experience when they visit your web application and sends this information to FME services. This allows you to measure and analyze the impact of feature flag changes on performance metrics.

:::info[Migrating from v0.x to v1.x]
When upgrading, consider that the `webVitals` event collector (`import { webVitals } from '@splitsoftware/browser-rum-agent';`) is not exported anymore, but registered by default.

In case you were registering it with specific options, you can now pass the options in the `eventCollectors` property of the `setup` configuration object.

For example, replace this:

```javascript
import { SplitRumAgent, webVitals } from '@splitsoftware/browser-rum-agent';

SplitRumAgent.register(webVitals(WEB_VITALS_OPTIONS));

SplitRumAgent.setup(YOUR_SDK_KEY);
```

With this:

```javascript
import { SplitRumAgent } from '@splitsoftware/browser-rum-agent';

SplitRumAgent.setup(YOUR_SDK_KEY, {
  eventCollectors: { webVitals: WEB_VITALS_OPTIONS }
});
```

See the [Web Vitals](#web-vitals) section for more information about Google Web Vitals metrics collected by the Browser RUM Agent.
:::

## Language Support

FME's Browser RUM Agent is compatible with EcmaScript 5 syntax and therefore supports the majority of today's popular browsers, with the exception of older browsers like IE. We rely on the browser [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) support to reliably send information to FME services for processing. For browsers that do not support Beacon API, the RUM Agent defaults to using [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instead. 

Additional Web APIs like Promise, History and Performance APIs, highly available in modern browser, are required to collect some specific events, but not for the regular operation of the Agent. See the [Events section](#events) for specific events and their compatibility.

## Initialization
 
Set up FME's RUM Agent in your code with the following two steps:

### 1. Import the Agent into your project

FME's RUM Agent is delivered as a NPM package and as a script UMD bundle hosted in a CDN. You can import the Agent into your project using either of the two methods, as shown below.

<Tabs>
<TabItem value="NPM package (recommended)">
```bash
npm install --save @splitsoftware/browser-rum-agent
```
</TabItem>
<TabItem value="CDN bundle">
```html
<script src="https://cdn.split.io/rum-agent/browser-rum-agent-1.0.0.min.js"></script>
```
</TabItem>
</Tabs>

### 2. Setup the Agent

You can initialize the Browser RUM Agent in your code as shown below.

<Tabs>
<TabItem value="Using ES modules (NPM package)">
```javascript
import { SplitRumAgent } from '@splitsoftware/browser-rum-agent';

SplitRumAgent
  .setup('YOUR_SDK_KEY')
  .addIdentities([
    { key: 'key', trafficType: 'a_traffic_type' },
    { key: 'another_key', trafficType: 'another_traffic_type' }
  ]);
```
</TabItem>
<TabItem value="Using CommonJS (NPM package)">
```javascript
const { SplitRumAgent } = require('@splitsoftware/browser-rum-agent');
 
SplitRumAgent
  .setup('YOUR_SDK_KEY')
  .addIdentities([
    { key: 'key', trafficType: 'a_traffic_type' },
    { key: 'another_key', trafficType: 'another_traffic_type' }
  ]);
```
</TabItem>
<TabItem value="Using script tags (CDN version)">
```html
<!-- Add the following script tags as high as possible in the `<head>` section of the main page -->
<script src="https://cdn.split.io/rum-agent/browser-rum-agent-1.0.0.min.js"></script>
<script>
  window.SplitRumAgent
    .setup('YOUR_SDK_KEY')
    .addIdentities([
      { key: 'key', trafficType: 'a_traffic_type' },
      { key: 'another_key', trafficType: 'another_traffic_type' }
    ]);
</script>
```
</TabItem>
</Tabs>

Alternatively, you can initialize the Agent in two parts. First, import the Agent early in the code execution order, and then postpone setting the identities until that information is available. 

<Tabs>
<TabItem value="Using CommonJS (NPM package)">
```javascript
import { SplitRumAgent } from '@splitsoftware/browser-rum-agent';
SplitRumAgent.setup('YOUR_SDK_KEY');
 
// In a different file or part of your code, where the identities are available:
SplitRumAgent.addIdentity({ key: 'user_id', trafficType: 'user' });
```
</TabItem>
<TabItem value="Using script tags (CDN version)">
```html
<script src="https://cdn.split.io/rum-agent/browser-rum-agent-1.0.0.min.js"></script>
<script>
  window.SplitRumAgent.setup('YOUR_SDK_KEY');
</script>

<!-- Later in the page, anywhere where you can add javascript, add: -->
<script>
  window.SplitRumAgent.addIdentity({ key: 'user_id', trafficType: 'user' });
</script>
```
</TabItem>
</Tabs>

Identity objects consist of a key and a [traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type). The traffic type value must match the name of a traffic type that you have defined in Harness FME.

These identities are used to associate the events captured by the RUM Agent to some user, before sending them to FME services. If you provide more than one identity, the captured events will be duplicated and sent to FME services for each identity.

## Configuration

The RUM Agent can be configured to change its default behavior. The following options are available:
- Prefix: Optional prefix to append to the `eventTypeId` of the events sent to Harness. For example, if you set the prefix to `'my-app'`, the event type `'error'` will be sent as `'my-app.error'`. It defaults to `'split.rum'`.
- Push Rate: The Agent posts the queued events data in bulks. This parameter controls the posting rate in seconds. The default value is `30`.
- Queue Size: The maximum number of event items we want to queue. If we queue more values, events will be dropped until they are sent to Harness FME. The default value is `5000`.
- User Consent: User consent status used to control the tracking of events and impressions. Possible values are `'GRANTED'`, `'DECLINED'`, and `'UNKNOWN'`. The default value is `'GRANTED'`. See the [User consent](#user-consent) section for details.

These options can be configured programmatically, as demonstrated below:

```javascript
SplitRumAgent.setup('YOUR_SDK_KEY', {
  prefix: 'my-app',
  pushRate: 30,
  queueSize: 5000,
  userConsent: 'GRANTED'
});
```

## Events

FME's RUM Agent collects a number of browser events by default and can be extended by registering *event collectors*. Event collectors collect additional events that are relevant to your application. They are not shipped by default with the Agent itself to avoid increasing your bundle size with unnecessary code.

Event collectors are available when using the NPM package, or with a "full" version of the UMD bundle hosted in our CDN. They can be imported and registered as follows:

<Tabs>
<TabItem value="Using ES modules (NPM package)">
```javascript
import { SplitRumAgent, routeChanges } from '@splitsoftware/browser-rum-agent';

SplitRumAgent.register(routeChanges());
```
</TabItem>
<TabItem value="Using script tags (CDN version)">
```html
<script src="https://cdn.split.io/rum-agent/browser-rum-agent-1.0.0.full.min.js"></script>
<script>
  SplitRumAgent.register(SplitRumAgent.routeChanges());
</script>
```
</TabItem>
</Tabs>

Refer to the table below and the following sections for more information about the default events and the available event collectors.

### Default events

| **Event type ID** | **Description** | **Has value?** | **Has properties?** |
| --- | --- | --- | --- |
| error | Any JavaScript unhandled error and promise rejection | No | ```{ message: string, stack: string }``` |
| page.load.time | Time in milliseconds elapsed until the document is fully loaded and parsed. It is equivalent to the time until the [load event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) is fired. | Yes | No |
| time.to.dom.interactive | Time in milliseconds until the document is ready and before the full page load time. If this time is high, it usually implies that the critical rendering path is complex and that the download of resources will start later. Related to the [domInteractive](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/domInteractive) property. | Yes | No |

#### Web Vitals

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web. 

The RUM Agent uses the Google [web-vitals NPM package](https://www.npmjs.com/package/web-vitals) to collect the Web Vitals metrics.

By default, the Agent will collect all metrics supported by the web-vitals package:
* **Core Web Vitals:**
    - [Cumulative Layout Shift (CLS)](https://web.dev/cls/)
    - [Interaction to Next Paint (INP)](https://web.dev/inp/)
    - [Largest Contentful Paint (LCP)](https://web.dev/lcp/)
* **Other metrics:**
    - [First Contentful Paint (FCP)](https://web.dev/fcp/)
    - [Time to First Byte (TTFB)](https://web.dev/ttfb/)
    - [First Input Delay (FID)](https://web.dev/fid/)

You can also configure the Agent to collect only a subset of the web-vitals:

```javascript
SplitRumAgent.setup('YOUR_SDK_KEY', {
  eventCollectors: {
    webVitals: {
      reportOptions: {
        // collects only the core web-vitals
        onCLS: true, 
        onINP: true,
        onLCP: true, 
        // other web-vital metrics are not collected
        onFCP: false,
        onTTFB: false,
        onFID: false
      }
    }
  }
});  
```

The format of collected events is shown below:

```typescript
type WebVitalsEvent = {
  eventTypeId: 'webvitals.cls' | 'webvitals.inp' | 'webvitals.lcp' | 'webvitals.fcp' | 'webvitals.ttfb' | 'webvitals.fid',
  value: number, // value in milliseconds
  properties: {
    rating: 'good' | 'needsImprovement' | 'poor',
    navigationType: 'navigate' | 'reload' | 'back_forward' | 'back-forward-cache' | 'prerender' | 'restore'
  }
}
```

### Time to Interactive

[Time to Interactive (TTI)](https://web.dev/tti/) is a metric that measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input.

The RUM Agent exports an event collector for TTI, which internally uses the [tti-polyfill NPM package](https://www.npmjs.com/package/tti-polyfill) to collect it.

You can set it as follows:

```javascript
import { SplitRumAgent, tti } from '@splitsoftware/browser-rum-agent';

SplitRumAgent.register(tti());
```

Unlike `webVitals`, the `tti` collector does not support any configuration options.

The format of collected event is shown below:

```typescript
type TTIEvent = {
  eventTypeId: 'time.to.interactive',
  value: number, // TTI value in milliseconds
}
```

### Route Changes

Route changes are events that are triggered when the user navigates to a new page in a Single-Page Application (SPA). 

The RUM Agent exports an event collector for route changes.

You can set the Agent to collect route change events as follows:

```javascript
import { SplitRumAgent, routeChanges } from '@splitsoftware/browser-rum-agent';

SplitRumAgent.register(routeChanges());
```

You can also configure the Agent to collect only a subset of the route changes, by providing a filter callback. For example, to ignore hash (fragment) changes:

```javascript
SplitRumAgent.register(routeChanges({
  filter({ fromUrl, toUrl }) {
    return fromUrl.split('#')[0] !== toUrl.split('#')[0];
  }
}));
```

The format of a collected event is shown below:

```typescript
type RouteChangesEvent = {
  eventTypeId: 'route.change',
  value: number | undefined, // Value of the `duration` property
  properties: {
    // URL value before the change, without including the origin (protocol, host and port)
    fromUrl: string,
    // URL value after the change, without including the origin (protocol, host and port)
    toUrl: string,
    // Type of URL change
    // * `pushState` indicates a new entry added to the history stack, when `history.pushState` is called
    // * `replaceState` indicates the entry at the current index in the history stack being replaced, when `history.replaceState` is called
    // * `popstate` indicates a change to an arbitrary index in the history stack
    historyChangeSource: 'pushState' | 'replaceState' | 'popstate',

    /* Browsers that support the Performance Timeline API will include the following properties: */
    // Estimated duration of the navigation transition in milliseconds. The calculation is based on a time window of long tasks and resources around the history change event.
    duration?: number,
    // Value of performance.now() when the navigation started
    startTime?: number,
    // Time spent on the previous route (`fromUrl`) in milliseconds
    timeOnRoute?: number,
  }
}
```

## Automatic metric creation

FME will automatically create [metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) for a subset of the event types received from the Browser RUM Agent. These "out of the box metrics" are auto-created for you:

| **Event type** | **Metric name** | 
| --- | --- |
| split.rum.error | Count of Application Errors - Split Agents |
| split.rum.page.load.time | Average Page Load Time - Split Agents |
| split.rum.webvitals.cls | Average CLS - Split Agents |
| split.rum.webvitals.inp | Average INP - Split Agents |
| split.rum.webvitals.lcp | Average LCP - Split Agents |
| split.rum.webvitals.fcp | Average FCP - Split Agents |
| split.rum.webvitals.ttfb | Average TTFB - Split Agents |
| split.rum.webvitals.fid | Average FID - Split Agents |

For a metric that was auto-created, you can manage the [definition](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) and [alert policies](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting) like you would for any other metric. If you delete a metric that was auto-created, FME will not re-create the metric, even if the event type is still flowing.

## Advanced use cases

### Custom properties

Each event for the metrics described above automatically includes three properties that can be use to filter certain events when defining Split metrics for experimentation purposes. Learn more about [metric definitions and how to define property filters](https://help.split.io/hc/en-us/articles/22005565241101-Metrics).

| **Name** | **Description** | **Values** | 
| --- | --- | --- | 
| connectionType | Speed of connection  | 2g, 3g, 4g |
| url | The url that generated the metric |  |
| userAgent | The user agent |  |

Custom properties can be also added to a tracked event by using the `setProperties` method:

```javascript
SplitRumAgent.setProperties({ 'property_name': 'property_value' }); // set a single or multiple properties as a map object of key/value pairs

const properties = SplitRumAgent.getProperties(); // get all properties as a map object of key/value pairs

SplitRumAgent.removeProperties(); // remove properties
```

### Custom events

There are multiple methods to track custom events: 
- using the `track` method
- using the specialized `trackError` method
- registering a custom event collector
These methods are demonstrated below.

Using the `track` method: 

```javascript
SplitRumAgent.track('event_type_id'); // track a single event without value 
SplitRumAgent.track('event_type_id', 100); // track a single event with value
SplitRumAgent.track('event_type_id', 100, { 'property_name': 'property_value' }); // track a single event with value and properties
```

Using the `trackError` method:

```javascript
SplitRumAgent.trackError('error_message'); // Shorthand for track('error', undefined, { message: 'error_message', stack: 'unavailable' })
SplitRumAgent.trackError(errorObject); // Shorthand for track('error', undefined, { message: error.message, stack: error.stack })
```

Registering a custom event collector:

```javascript
SplitRumAgent.register(({ track }) => {
  track({
    eventTypeId: 'event_type_id',
    value: 100, // optional value
    properties: { 'property_name': 'property_value' } // optional properties
  })
});
```

### Async/Lazy loading

Including the RUM Agent code in your application bundle will increase its size and impact the captured performance metrics.

If you want to avoid this, you can load the Agent asynchronously by [lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) it, for example by using dynamic imports or async script tags:


<Tabs>
<TabItem value="Dynamic import (NPM package)">
```javascript
import('@splitsoftware/browser-rum-agent').then(({ SplitRumAgent }) => {
  SplitRumAgent
    .setup('YOUR_SDK_KEY')
    .addIdentity({ key: 'user_id', trafficType: 'user' });
}).catch(err => {
  console.error('Error loading Agent', err);
});
```
</TabItem>
<TabItem value="Async script tag (CDN version)">
```html
<script async src="https://cdn.split.io/rum-agent/browser-rum-agent-1.0.0.min.js" onload="setupRumAgent()"></script>
<script>
  function setupRumAgent() {
    SplitRumAgent
      .setup('YOUR_SDK_KEY')
      .addIdentity({ key: 'user_id', trafficType: 'user' });
  }
</script>
```
</TabItem>
</Tabs>

:::info[Missing error events on lazy loading]
When using lazy loading, the RUM Agent will normally not be able to capture any errors that occur before the Agent has finished loading. To solve this, you can place the following script tag in the `<head>` section of your page.

```html
<script>
(function(w){
  var g=w.__error={e1:[],l1:function(e){g.e1.push(e);},e2:[],l2:function(e){g.e2.push(e);}};
  w.addEventListener('error', g.l1);
  w.addEventListener('unhandledrejection', g.l2);
}(window))
</script>
```

This script captures regular JavaScript errors and unhandled promise rejections, and stores them in memory. Once the RUM Agent loads, it sends the captured errors to FME services for processing, ensuring that even errors occurring before the Agent is fully loaded are not missed.
:::

### User consent

By default the Agent will send events to Harness FME servers, but you can disable this behavior until user consent is explicitly granted.

The `userConsent` configuration parameter lets you set the initial consent status of the Agent, and the `SplitRumAgent.setUserConsent(boolean)` method lets you grant (enable) or decline (disable) dynamic event tracking.

There are three possible initial states:
 * `'GRANTED'`: The user grants consent for tracking events. The Agent sends them to Harness FME servers. This is the default value if `userConsent` param is not defined.
 * `'DECLINED'`: The user declines consent for tracking events. The Agent does not send them to Harness FME servers.
 * `'UNKNOWN'`: The user neither grants nor declines consent for tracking events. The Agent tracks them in its internal storage, and eventually either sends them or not if the consent status is updated to `'GRANTED'` or `'DECLINED'` respectively.

The status can be updated at any time with the `setUserConsent` method.

Working with user consent is demonstrated below.

```javascript title="User consent: Initial config, getter and setter"
SplitRumAgent.setup('YOUR_SDK_KEY', {
  // Overwrites the initial consent status of the Agent, which is 'GRANTED' by default.
  // 'UNKNOWN' status represents that the user has neither granted nor declined consent for tracking data, 
  // so the Agent will locally track data but not send it to Harness FME servers until consent is changed to 'GRANTED'.
  userConsent: 'UNKNOWN'
});

// `getUserConsent` method returns the current consent status.
SplitRumAgent.getUserConsent() === 'UNKNOWN';

// `setUserConsent` method lets you update the consent status at any time.
// Pass `true` for 'GRANTED' and `false` for 'DECLINED'.
SplitRumAgent.setUserConsent(true); // Consent status changed from 'UNKNOWN' to 'GRANTED'. Data will be sent to Harness FME servers.
SplitRumAgent.getUserConsent() === 'GRANTED';

SplitRumAgent.setUserConsent(false); // Consent status changed from 'GRANTED' to 'DECLINED'. Data will not be sent to Harness FME servers.
SplitRumAgent.getUserConsent() === 'DECLINED';
```

<!-- @TODO ### SDK integration -->

## Example apps

The following repository contains different example apps that demonstrate how to use FME's Browser RUM Agent:

* [Browser RUM Agent examples](https://github.com/splitio/browser-rum-agent-examples)