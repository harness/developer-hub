---
title: JavaScript SDK to Browser SDK migration guide
sidebar_label: JavaScript SDK to Browser SDK migration guide
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- applies to JavaScript SDK, Browser SDK -->

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-control-treatments </button>
</p>

Refer to this document to check API differences and migration details for moving from **JavaScript SDK v10.15.x** using [NPM](https://www.npmjs.com/package/@splitsoftware/splitio) or [Github](https://github.com/splitio/javascript-client) to **Browser SDK v0.1.x** using [NPM](https://www.npmjs.com/package/@splitsoftware/splitio-browserjs) or [Github](https://github.com/splitio/javascript-browser-client). 

## Requirements

Browser SDK has the [same browser requirements](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK#language-support) as JavaScript SDK (it supports ES5 syntax and requires Promises support) but also requires [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) support.

Therefore, to target old browsers such as IE10, users must polyfill the Fetch API besides Promises.  More details [here](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK#language-support).

## Installation and import
 	
| | JavaScript SDK 10.15.x | Browser SDK 0.1.x |
| --- | --- | --- |
| Install NPM package | `> npm install @splitsoftware/splitio` | `> npm install @splitsoftware/splitio-browserjs` |
| Import with ES6 module syntax | `import { SplitFactory } from ‘@splitsoftware/splitio’` | `import { SplitFactory } from ‘@splitsoftware/splitio-browserjs’` |
| Import with CommonJS | `const { SplitFactory } = require( ‘@splitsoftware/splitio’)` | `const { SplitFactory } = require( ‘@splitsoftware/splitio-browserjs’)` |
| Install with CDN script tag | `<script src="//cdn.split.io/sdk/split-10.15.4.min.js"></script>` | Two variants are available at the moment: <br /> Slim/Regular version: <br /> `<script src="//cdn.split.io/sdk/split-browser-0.1.0.min.js"></script>` <br /> Full version: regular + pluggable modules (InLocalStorage, integrations and loggers) <br /> `<script src="//cdn.split.io/sdk/split-browser-0.1.0.full.min.js"></script>` |
| Instantiate with CDN | `var factory = splitio({...})` | `var factory = splitio({...})` or `var factory = splitio.SplitFactory({...})` |

## Configuration and API

Most configuration params are the same in [JavaScript SDK](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#configuration) and [Browser SDK](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK#configuration).  SDK client and manager APIs (i.e., method signatures) are also the same. The differences:

### Traffic type

| JavaScript SDK 10.15.x | Browser SDK 0.1.x |
| --- | --- |
| Clients can be bound to a traffic type to track events without the need to pass the traffic type. <br /> <pre>var factory = SplitFactory(\{<br></br>core: \{<br></br>   authorizationKey: 'YOUR_API_KEY',<br></br>   key: 'USER_ID',<br></br>   trafficType: 'YOUR_CUSTOMER_TRAFFIC_TYPE'<br></br> \}<br></br>\});<br></br><br></br>// Must not pass traffic type to track call if provided on the factory settings<br></br><br></br>var mainClient = factory.client();<br></br>mainClient.track('EVENT_TYPE', eventValue);<br></br><br></br>// or when creating a new client with a traffic type.<br></br><br></br>var newClient = factory.client('NEW_KEY', 'NEW_TRAFFIC_TYPE');<br></br>newClient.track('EVENT_TYPE', eventValue);</pre> | Clients cannot be bound to a traffic type, so for tracking events we always need to pass the traffic type. This simplifies the `track` method signature, by removing ambiguity of when it should receive the traffic type or not. | <pre>var factory = SplitFactory(\{<br></br> core: \{<br></br>   authorizationKey: 'YOUR_API_KEY',<br></br>   key: 'USER_ID',<br></br>   trafficType: 'YOUR_CUSTOMER_TRAFFIC_TYPE'<br></br> \}<br></br>\});<br></br><br></br>// Must not pass traffic type to track call if provided on the factory settings<br></br><br></br>var mainClient = factory.client();<br></br>mainClient.track('EVENT_TYPE', eventValue);<br></br><br></br>// or when creating a new client with a traffic type.<br></br><br></br>var newClient = factory.client('NEW_KEY', 'NEW_TRAFFIC_TYPE');<br></br>newClient.track('EVENT_TYPE', eventValue);</pre> | NOT ALLOWED<br/>The `core.trafficType` config param, and the second param of `factory.client()` are ignored. |

### Bucketing key

Bucketing key support was removed from Browser SDK. So passing an object as a key is not allowed:

``` javascript
var factory = SplitFactory({
 core: {
   authorizationKey: 'YOUR_API_KEY',

   // NOT SUPPORTED: key must be a string
   key: { matchingKey: 'YOUR_MATCHING_KEY', bucketingKey: 'YOUR_BUCKETING_KEY' }
 }
});

// NOT SUPPORTED: key must be a string
var newClient = factory.client({ matchingKey: 'NEW_MATCHING_KEY', bucketingKey: 'NEW_BUCKETING_KEY' });
```

### Pluggable modules

Some configuration params are based on pluggable modules now, in favor of size reduction.

When using ES module imports, the pluggable modules that are not imported are not included in the final output build.

The impact of each module on the final bundle size is roughly estimated in the Export Analysis section of [Bundlephobia entry](https://bundlephobia.com/result?p=@splitsoftware/splitio-browserjs@0.1.0).

Importing pluggable modules with ES module imports:

```javascript
import {
 SplitFactory,
 // Pluggable modules:
 ErrorLogger, WarnLogger, InfoLogger, DebugLogger,
 InLocalStorage, GoogleAnalyticsToSplit, SplitToGoogleAnalytics }
from '@splitsoftware/splitio-browserjs';
```
When using CDN script tags, you can opt for using the regular/slim version without pluggable modules or the full one with them.

Accessing pluggable modules with the full CDN bundle (they are not available on the slim version):

```javascript
const {
 SplitFactory,
 // Pluggable modules:
 ErrorLogger, WarnLogger, InfoLogger, DebugLogger,
 InLocalStorage, GoogleAnalyticsToSplit, SplitToGoogleAnalytics }
= window.splitio;
```

### Logging

In the Browser SDK, you must “plug” a logger instance in the `debug` config param to have human-readable message codes.

You can set a boolean or string log level value as `debug` config param, as in the regular JavaScript SDK, but in that case, most log messages will display a code number instead.

Those message codes are listed in the public repository: [`Error`](https://github.com/splitio/javascript-commons/blob/development/src/logger/messages/error.ts), [`Warning`](https://github.com/splitio/javascript-commons/blob/development/src/logger/messages/warn.ts), [`Info`](https://github.com/splitio/javascript-commons/blob/development/src/logger/messages/info.ts), [`Debug`](https://github.com/splitio/javascript-commons/blob/development/src/logger/messages/debug.ts). More details [here](https://help.split.io/hc/en-us/articles/360058730852-Browser-SDK#logging).

| JavaScript SDK 10.15.x | Browser SDK 0.1.x |
| --- | --- |
| <pre>import \{ SplitFactory \} from '@splitsoftware/splitio'<br></br><br></br>var factory = SplitFactory(\{<br></br> …,<br></br> debug: 'DEBUG' // other options are: true, false,<br></br>                // 'INFO', 'WARN' and 'ERROR'<br></br>\});<br></br></pre> | <pre>import \{ SplitFactory, DebugLogger \} from '@splitsoftware/splitio-browserjs'<br></br><br></br>var factory = SplitFactory(\{<br></br> …,<br></br> debug: DebugLogger() // other options are: true, false, 'DEBUG',<br></br>                      // 'INFO', 'WARN', 'ERROR', InfoLogger(),<br></br>                      // WarnLogger(), and ErrorLogger()<br></br>\}); </pre> |

### Configuring LocalStorage

| JavaScript SDK 10.15.x | Browser SDK 0.1.x |
| --- | --- |
| <pre>import \{ SplitFactory \} from '@splitsoftware/splitio'<br></br><br></br>var sdk = SplitFactory(\{<br></br> core: \{<br></br>   authorizationKey: 'YOUR_API_KEY',<br></br>   key: 'USER_ID',<br></br> \},<br></br><br></br> storage: \{<br></br>   type: 'LOCALSTORAGE',<br></br>   prefix: 'MYPREFIX'<br></br> \}<br></br>});</pre> | <pre>import \{<br></br>  SplitFactory,<br></br>  InLocalStorage <br></br>\} from '@splitsoftware/splitio-browserjs'<br></br><br></br>var sdk = SplitFactory(\{<br></br> core: \{<br></br>   authorizationKey: 'YOUR_API_KEY',<br></br>   key: 'USER_ID',<br></br> },<br></br><br></br> storage: InLocalStorage(\{<br></br>   prefix: 'MYPREFIX'<br></br> \})<br></br>\});</pre> |

<!-- Commenting out, as this info is outdated (we no longer document the `integrations` config parameter and we now do support Localhost mode in Browser SDK).

### Configuring integrations

| JavaScript SDK 10.15.x | Browser SDK 0.1.x |
| --- | --- |
| <pre>import \{ SplitFactory \} from '@splitsoftware/splitio'<br></br><br></br>var factory = SplitFactory(\{<br></br> core: \{<br></br>   authorizationKey: 'YOUR_API_KEY',<br></br>   key: 'USER_ID',<br></br> \},<br></br><br></br> integrations: [<br></br>   \{<br></br>     type: 'GOOGLE_ANALYTICS_TO_SPLIT',<br></br>     identities: [\{<br></br>       key: 'USER_ID',<br></br>       trafficType: 'user'<br></br>     \}]<br></br><br></br>   \}, \{<br></br>     type: 'SPLIT_TO_GOOGLE_ANALYTICS'<br></br>   \}<br></br> ]<br></br>\});</pre> | <pre>import \{<br></br>  SplitFactory,<br></br>  GoogleAnalyticsToSplit,<br></br>  SplitToGoogleAnalytics<br></br>\} from '@splitsoftware/splitio-browserjs'<br></br><br></br>var factory = SplitFactory(\{<br></br> core: \{<br></br>   authorizationKey: 'YOUR_API_KEY',<br></br>   key: 'USER_ID'<br></br> \},<br></br> integrations: [<br></br>   GoogleAnalyticsToSplit(\{<br></br>     identities: [\{<br></br>       key: 'USER_ID',<br></br>       trafficType: 'user'<br></br>     \}]<br></br>   \}),<br></br><br></br>   SplitToGoogleAnalytics()<br></br> ]<br></br>\});</pre> |

### Localhost mode
Not supported.  Split hasn’t yet decided how to expose this feature as a pluggable module in favor of size reduction.

| JavaScript SDK 10.15.x | Browser SDK 0.1.x |
| --- | --- |
| <pre>var sdk = SplitFactory(\{<br></br> core: \{<br></br>   authorizationKey: 'localhost'<br></br> \},<br></br><br></br> features: \{<br></br>  'reporting_v2': 'on', // example with just a string value for the treatment<br></br>  'billing_updates': \{ treatment: 'visa', config: '\{ "color": "blue" \}' \} //example of a defined config<br></br>  'show_status_bar': \{ treatment: 'off', config: null \} // example of a null config<br></br>\},<br></br> scheduler: \{<br></br>   offlineRefreshRate: 15 // 15 sec<br></br> \}<br></br>\});</pre> | NOT SUPPORTED YET |
-->

## Additional Notes

CDN bundle size:

* JavaScript SDK (https://cdn.split.io/sdk/split-10.15.4.min.js ): 126656 B (123.7 kB)
* Browser SDK
  * Slim/regular (https://cdn.split.io/sdk/split-browser-0.1.0.min.js ): 69338 B (67.7 kB)
  * Full (https://cdn.split.io/sdk/split-browser-0.1.0.full.min.js  ): 93163 B (91.0 kB)

NPM package size:

* [JavaScript SDK](https://bundlephobia.com/result?p=@splitsoftware/splitio@10.15.4): 109.7 kB minified
* [Browser SDK](https://bundlephobia.com/result?p=@splitsoftware/splitio-browserjs@0.1.0): 87.2 kB minified