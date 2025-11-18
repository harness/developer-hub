---
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 15
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/sdk-readiness-always-times-out-when-running-in-kubernetes-and-istio-proxy/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/split-manager-returns-incomplete-list-of-feature-flags
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/error-gettreatment-you-passed-split-name-that-does-not-exist-in-this-environment
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/sdk-never-gets-ready-regardless-of-the-ready-timeout-value
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/always-getting-control-treatments
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/why-are-impressions-not-showing-in-split
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk/why-is-the-sdk-making-hundreds-of-network-calls-without-using-gettreatment-or-track-methods/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-general-sdk
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-client-side-sdks/android-ios-javascript-sdk-client-on-never-runs
---

## Overview

Our SDKs have a standardized interface for inputs to every method. If you have issues getting up and running with any of our SDKs or aren't getting the expected return from any method or to the Split UI, you can find a detailed view of the types of validation that our SDK performs for each method below.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab-number">
<TabItem value="1" label="GetTreatment Method Validation">

Below are the expected input data types for the method `getTreatment(key, split_name, attributes)`:

* key: `string` that is less than or equal to 250 characters
* split_name: `string`
* attributes: `dictionary`

:::info
For iOS, Android, and JavaScript, this method also has a signature of `getTreatment(split_name, attributes)`. If you are troubleshooting any of these SDKs, feel free to skip the Key Validations section below.
:::

### Key Validations

- `key == null` or `undefined` (or similar for each language)
   - SDK will return control
   - SDK will log the following error to the console: 
     ```
     getTreatment: you passed a null or undefined key, the key must be a non-empty string
     ```
   - No Impression will be logged back to Split servers
- `key` is longer than 250 characters
   - SDK will return control
   - SDK will log the error:
     ```
     getTreatment: key too long - must be 250 characters or less
     ```
   - No Impression will be logged back to Split servers
- `key` is of type number and is finite
   - SDK will perform best effort to stringify the input and return a treatment for the converted response
   - SDK will log the error:
     ```
     getTreatment: key too long - must be 250 characters or less
     ```
- `key` is not of type string or finite number or object type
   - SDK will return control
   - SDK will log the error:
     ```
     getTreatment: you passed an invalid key type, key must be a non-empty string
     ```
   - No Impression will be logged back to Split servers

- `key` is an empty string
   - SDK will return control
   - SDK will log the error:
     ```
     getTreatment: you passed an empty string, key must be a non-empty string
     ```
   - No Impression will be logged back to Split servers

### Split Name Validations

- `split_name == null` or `undefined`
  - SDK will return control
  - SDK will log the error “getTreatment: you passed a null or undefined split name, split name must be a non-empty string”
  - No Impression will be logged back to Split servers
- `split_name` is not of type string  
  - SDK will return control  
  - SDK will log the error:  
    ```
    getTreatment: you passed an invalid split name, split name must be a non-empty string
    ```  
  - No Impression will be logged back to Split servers

- `split_name` is an empty string  
  - SDK will return control  
  - SDK will log the error:  
    ```
    getTreatment: you passed an invalid split name, split name must be a non-empty string
    ```  
  - No Impression will be logged back to Split servers

- `split_name` has whitespace at the beginning or end  
  - SDK will evaluate with the trimmed version of the split name  
  - SDK will log the warning:  
    ```
    getTreatment: split name “X” has extra whitespace, trimming
    ```  
  - An Impression will be logged with the trimmed split name

## Attributes Validations

- `attributes` is not of type dictionary  
  - SDK will return control  
  - SDK will log the error:  
    ```
    getTreatment: attributes must be of type dictionary
    ```  
  - No Impression will be logged back to Split servers

</TabItem>
<TabItem value="2" label="Track Method Validation">

Below are the errors and expected behavior you can expect from the SDK on the `track(key, traffic_type_name, event_type, value)` method.

:::info
For iOS, Android, and JavaScript, this method also has signatures without a `traffic_type_name` or `key`. If you are troubleshooting any of these SDKS, feel free to skip the Key and Traffic Type Validations sections below.
:::

## Key Validations

- `key == null` or `undefined`  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed a null or undefined key, key must be a non-empty string
    ```  
  - No event will be logged back to Split servers

- `key` is of type number  
  - SDK will log a warning:  
    ```
    track: key X is not of type string, converting to string
    ```  
  - SDK will stringify the key and store it as a string

- `key` is not of type string or number  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed an invalid key, key must be a non-empty string
    ```  
  - No event will be logged back to Split servers

- `key` is an empty string  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed an empty key, key must be a non-empty string
    ```  
  - No event will be logged back to Split servers

- `key` is longer than 250 characters  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: key too long - must be 250 characters or less
    ```  
  - No event will be logged back to Split servers

## Event Type Validations

- `event_type` is an empty string  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed an empty event_type, event_type must be a non-empty String
    ```  
  - No event will be logged back to Split servers

- `event_type == null` or `undefined`  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed a null or undefined event_type, event_type must be a non-empty String
    ```  
  - No event will be logged back to Split servers

- `event_type` not of type string  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed an invalid event_type, event_type must be a non-empty String
    ```  
  - No event will be logged back to Split servers

- `event_type` does not conform to regexp  
  - Regular expression: `^[a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}$`  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed “EVENT_TYPE_VALUE”, event name must adhere to the regular expression [a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}. This means an event name must be alphanumeric, cannot be more than 80 characters long, and can only include a dash, underscore, period, or colon as separators of alphanumeric characters
    ```  
  - No event will be logged back to Split servers

## Traffic Type Validations

- `traffic_type_name == null` or `undefined`  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed a null or undefined traffic_type_name, traffic_type_name must be a non-empty string
    ```  
  - No event will be logged back to Split servers

- `traffic_type_name` not of type string  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed an invalid traffic_type_name, traffic_type_name must be a non-empty string
    ```  
  - No event will be logged back to Split servers

- `traffic_type_name` is an empty string  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: you passed an empty traffic_type_name, traffic_type_name must be a non-empty string
    ```  
  - No event will be logged back to Split servers

- `traffic_type_name` has capitalized letters  
  - SDK will log a warning:  
    ```
    track: traffic_type_name should be all lowercase - converting string to lowercase
    ```  
  - Event will be logged back to Split servers with `traffic_type_name` lowercased

## Value Validations

- `value` is not null and not a finite number  
  - SDK will return `false`  
  - SDK will log the error:  
    ```
    track: value must be a number
    ```  
  - No event will be logged back to Split servers

</TabItem>
<TabItem value="3" label="Factory Instantiation Validation">

Below is a view of the validation to expect when instantiating the SDK factory

## Validation for SplitFactoryBuilder.build("YOUR_API_KEY", config);

- `api_key` is an empty string  
  - SDK will log the error:  
    ```
    factory instantiation: you passed an empty api_key, api_key must be a non-empty string
    ```

- `api_key` is null or undefined  
  - SDK will log the error:  
    ```
    factory instantiation: you passed a null or undefined api_key, api_key must be a non-empty string
    ```

- (Backend SDKs only) `api_key` is browser type  
  - SDK will log the error:  
    ```
    factory instantiation: you passed a browser type api_key, please grab an api key from the Split console that is of type sdk
    ```

If any of the above errors occur:  

- Any calls to `getTreatment` and `getTreatments` will return control or map of controls  
- Any calls to `track` will return `false`  
- Any manager methods will return null or an empty collection

## Instantiation with a Key (JavaScript and mobile SDKs only)

- `key` is an empty string  
  - SDK will log the error:  
    ```
    factory instantiation: you passed an empty key, key must be a non-empty string
    ```

- `key` is null or undefined  
  - SDK will log the error:  
    ```
    factory instantiation: you passed a null or undefined key, key must be a non-empty string
    ```

- (JS only) `key` is an empty string  
  - SDK will log the error:  
    ```
    client instantiation: you passed an empty key, key must be a non-empty string
    ```

- (JS only) `key` is null or undefined  
  - SDK will log the error:  
    ```
    client instantiation: you passed a null or undefined key, key must be a non-empty string
    ```

If any of the above errors occur:  

- Any calls to `getTreatment` and `getTreatments` will return control or map of controls  
- Any calls to `track` will return `false`  
- Any manager methods will return null or an empty collection

## Validations if ready config is not properly set

- `ready == null` (Backend SDKs only)  
  - SDK will log the warning:  
    ```
    no ready parameter has been set - incorrect control treatments could be logged
    ```
    if no ready config has been set when building the factory

- (JavaScript SDK only) No proper callbacks for either the event or the ready promise  
  - SDK will log the warning:  
    ```
    No listeners for SDK Readiness detected. Incorrect control treatments could be logged if you call getTreatment while the SDK is not yet ready
    ```

- (JavaScript SDK only) If readiness events are subscribed to **after** the SDK is ready  
  - SDK will log the warning:  
    ```
    A listener was added for {event name} on the SDK, which has already fired and won’t be emitted again. The callback won’t be executed.
    ```

</TabItem>
<TabItem value="4" label="GetTreatments Method Validation">

Below are the expected input data types for the method `getTreatments(key, split_names)`:

- `key`: string that is less than or equal to 250 characters  
- `split_names`: array

## Split Names Validations

- `split_names` is null, undefined, or not an array  
  - SDK will return `null`  
  - SDK will log the error:  
    ```
    getTreatments: split_names must be a non-empty array
    ```  
  - No Impressions will be logged back to Split servers

- `split_names` is an empty array  
  - SDK will return an empty object or collection  
  - SDK will log the error:  
    ```
    getTreatments: split_names must be a non-empty array
    ```  
  - No Impressions will be logged back to Split servers

## Validations for each split name in the split_names array

- All the same checks as defined in the `getTreatment` section above will be performed on each split name.  
- The SDK will validate each split name and log the corresponding error.  
- It will filter out any invalid inputs and only include the valid inputs in the returned dictionary.

</TabItem>
<TabItem value="5" label="Manager Interface Validation">

Below are validations for the `manager.split(split_name)` method:

- `split_name` is null or undefined  
  - SDK will return `null`  
  - SDK will log the error:  
    ```
    split: you passed a null or undefined split name, split name must be a non-empty string
    ```

- `split_name` is an empty string  
  - SDK will return `null`  
  - SDK will log the error:  
    ```
    split: you passed an empty split name, split name must be a non-empty string
    ```

- `split_name` is not of type string  
  - SDK will return `null`  
  - SDK will log the error:  
    ```
    split: you passed an invalid split name, split name must be a non-empty string
    ```

</TabItem>
</Tabs>

## Validation for a Destroyed Client

Below is the behavior you can expect from the client if it is used after it has been destroyed:

* All methods will log the error “Client has already been destroyed - no calls possible”.
* Any calls to `getTreatment` and `getTreatments` will return control or map of controls.
* Any calls to track will return false.
* Any manager methods will return null or an empty collection.

## Tracked events not showing

Events sent via `client.track()` may not appear in the Harness FME UI even if the call succeeds. This usually happens because the FME Cloud silently rejects requests with invalid data.

Common causes include event type names containing invalid characters, such as spaces (e.g., `client.track("userId", "client", "my conversion");`), or specifying a traffic type that doesn’t exist in your Split organization (e.g., `client.track("userId", "IncorrectTrafficType", "conversion");`).

To resolve this, ensure event type names and traffic types follow the guidelines in [SDKs and Customer-Deployed Components](/docs/feature-management-experimentation/sdks-and-infrastructure), and verify that the traffic types you use are defined in your organization.

## SDK never gets ready regardless of the ready timeout value

The SDK never reaches the ready state, no matter how long the ready timeout is set.

There are several possible reasons for this issue:

* If you are using a server-side SDK (Python, Ruby, Go, PHP, Node.js, or Java) but the API key provided is for client-side usage, the Harness FME servers expect different calls for Segment information depending on API key type, causing readiness failure.
* Extremely large segments in your Split environment can delay SDK readiness significantly. Segments containing tens of thousands of records require a long time to download into the SDK cache.
* Slow network connection to `sdk.split.io` can impact readiness. To verify network speed, you can run `curl sdk.split.io -s -o /dev/null -w "%{time_starttransfer}\n"`. This command returns the time taken to start the response for the GET request.

Ensure you are using the correct type of API key for your SDK (server-side keys for server SDKs, client-side keys for client SDKs) and avoid extremely large segments where possible to reduce SDK cache download time.

## SDK readiness timeout in Kubernetes with Istio proxy

When running an application that uses the FME SDK in a Kubernetes container configured with an Istio proxy, the SDK may consistently throw a "not ready" exception.

Enabling SDK debug logging shows HTTP requests to the Split API failing with `connection refused` errors, for example:

```
DEBUG - 2021/09/13 12:48:07 [GET] https://sdk.split.io/api/splitChanges?since=-1
DEBUG - 2021/09/13 12:48:07 Authorization [ApiKey]: xxxx...xxxx
DEBUG - 2021/09/13 12:48:07 Headers: map[Accept-Encoding:[gzip] Content-Type:[application/json] Splitsdkmachineip:[x.x.x.x] Splitsdkmachinename:[ip-x-x-x-x] Splitsdkversion:[go-6.0.2]]
ERROR - 2021/09/13 12:48:07 Error requesting data to API: https://sdk.split.io/api/splitChanges?since=-1 Get "https://sdk.split.io/api/splitChanges?since=-1": dial tcp 151.101.3.9:443: connect: connection refused
ERROR - 2021/09/13 12:48:07 Error fetching split changes Get "https://sdk.split.io/api/splitChanges?since=-1": dial tcp 151.101.3.9:443: connect: connection refused
```

The SDK requests are being blocked by a proxy or firewall within the Kubernetes environment. To verify connectivity, SSH into the pod and run the following command: `curl -v https://sdk.split.io`.

If the response is a `404`, the host is reachable and the issue is likely related to the Istio mesh configuration. Ensure the application container starts only after the Istio sidecar proxy is ready. 

Add the following setting to the Istio configuration:

```bash
--set meshConfig.defaultConfig.holdApplicationUntilProxyStarts=true
```

## Incomplete list of feature flags returned by Split Manager

When using the SDK factory Manager object to fetch a list of information about feature flags, the list might be incomplete and missing some flags that exist in the environment. This happens if the SDK cache has not been completely downloaded and the SDK status is not yet ready. In this case, the Manager object returns a partial list based on the current contents of the cache.

To avoid this, make sure the SDK is ready before using the factory Manager object, which is the same requirement that applies when calling `getTreatment`. Refer to each SDK’s documentation for details on how to check SDK readiness.

## getTreatment called with a feature flag name that does not exist in the environment

When using an FME SDK and calling getTreatment with a list of feature flag names, errors like the following may appear in the logs:

```
admin     10 May 2019, 18:10:12    2019-05-10T17:10:12,445 ERROR [admin] [f0f338a964a0e3e1/07cfe07d08568096] [SplitClientImpl:256] - getTreatment: you passed "SPLIT NAME" that does not exist in this environment, please double check what Splits exist in the web console.
```

This error is part of the SDK’s validation mechanism. It occurs if the `getTreatment` call includes a feature flag name that does not exist in the environment associated with the API key used. Since the SDK cannot calculate a treatment for a non-existent feature flag, it throws this error.

Ensure that the feature flag names passed to `getTreatment` exist in the environment. One way to avoid passing incorrect flag names is to use the SDK’s Manager object to retrieve the list of valid feature flag names in the environment, then verify against that list before making `getTreatment` calls.

For example, in Java:

```java
SplitFactory splitFactory = SplitFactoryBuilder.build("YOUR_API_KEY");
// Some code
boolean checkIfSplitExists(String splitName) { 
    List<String> splitNames = splitFactory.manager().splitNames();
    for (int i = 0; i < splitNames.size(); i++) {
        if (splitNames.get(i).equals(splitName)) 
            return true;
    }
    return false;
}
```

## Always getting control treatments from getTreatment

When using the SDK, the control treatment is either always or very often returned from the `getTreatment` call.

A control treatment return usually means one of the following:

* There is an issue with the network connection to Harness FME servers and HTTP calls are timing out. Enable the SDK debugging log file to verify if there are any network errors.
* The SDK is still downloading relevant feature flag definitions and Segments from Harness FME servers and has not finished by the time the getTreatment call is executed.

Control treatments are most commonly returned when using the mobile SDKs (JavaScript, Android, and iOS) because these SDKs run on users' devices that may have slow or unreliable network connections.

To avoid this, always call getTreatment only after the SDK has fired the SDK_READY event. This ensures the SDK has completed downloading all necessary information from Harness FME servers and helps prevent control treatments from being returned prematurely.

For example, in the JavaScript SDK: 

```javascript
client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment("SPLIT_NAME");
  if (treatment == "on") {
      // insert code here to show on treatment
  } else if (treatment == "off") {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});
```

## SDKs making hundreds of network calls without using getTreatment or track methods

When using any FME SDK library, you might notice the SDK making hundreds of network calls to split.io even though neither `getTreatment` nor `track` methods are being called.

If the Split.io library is encapsulated in a class and a new instance of the factory and client objects is created each time the client object is needed, then all these objects remain live in memory and continue synchronizing feature flag and segment changes with split.io, generating excessive network traffic.

For example, in the JavaScript SDK:

```javascript
class SplitIO {
    constructor() {
        this.factory = splitio({
            core: {
                authorizationKey: 'xxxx',
                key: 'CUSTOMER_ID',
                trafficType: 'client'
            }
        });
        this.client = this.factory.client();
    }
}
mySplit = new SplitIO();
mySplit2 = new SplitIO();
mySplit3 = new SplitIO();
```

Harness recommends using a singleton factory object and a single client object, especially if you use only one traffic type and customer ID. If you need to change either, instantiate only the client object from the existing factory, as in this example:

```javascript
class SplitIO {
    constructor() {
        this.factory = splitio({
            core: {
                authorizationKey: 'xxxx',
                key: 'CUSTOMER_ID',
                trafficType: 'client'
            }
        });
    }
    createClient(key, trafficType) {
        return this.factory.client(key, trafficType);
    }
}
mySplit = new SplitIO();
client1 = mySplit.createClient(myKey, myTrafficType);
client2 = mySplit.createClient(myKey2, myTrafficType2);
```

## Impressions not showing in Harness FME

When using any SDK and calling the `getTreatment` method, the call returns a correct treatment value. However, the impression is not sent to Harness FME servers and does not appear in the Live Tail view of a feature flag or in the Data Hub.

There are several possible reasons for this issue:

* When using Redis and Split Synchronizer:

  * The Synchronizer may be unable to read the Impression key in Redis. Check for errors in the Synchronizer debug log or via the Synchronizer admin console (`http://[Synchronizer host]:3010/admin/dashboard`) to diagnose the problem.
  * The Synchronizer may not be keeping up with the volume of impressions flowing from the SDK. See [Handling High Impression Rates with the Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer#handling-high-impression-rates-with-synchronizer) for solutions.

* When the SDK connects directly to Harness FME servers:

  * All SDKs run a thread that frequently checks the SDK cache for unpublished events and impressions. This frequency is controlled by the `impressionsRefreshRate` parameter for impressions and `eventsPushRate` for events. If the application exits while there is still unpublished cache, these will not be posted to Harness servers.
  * The Key ID (e.g., customer or account ID) used for the impression exceeds 250 characters.
  * If the SDK runs in an environment that does not support multi-threading (such as Ruby Unicorn or Python Gunicorn), only the main thread runs to calculate treatments, but the post-impressions thread does not run.

To resolve this:

* For mobile SDKs (Android and iOS), use the `client.Flush()` method to post impressions on demand, for example when the application is sent to the background.
* Always call the `destroy()` method on the client object before exiting your application. This flushes all unpublished impressions and events. Refer to the SDK language-specific documentation for method syntax. It is recommended to add a delay or wait after calling `destroy()` to allow internal impression posting threads to complete.
* Ensure the Key ID string used in `getTreatment` calls is no longer than 250 characters.
* Verify that your application server supports multi-threading. If it does not, install the Synchronizer and Redis, and configure the SDK to connect to Redis for cache management.

## SDK_READY event handler never called when using client.on method

When using the `client.on` method in JavaScript Browser, Android, or iOS SDKs, the code block inside the `SDK_READY` event handler sometimes never gets executed, indicating that the `SDK_READY` event does not fire as expected.

```javascript
client.on(SplitEvent.SDK_READY, new SplitEventTask() {
    treatment = client.getTreatment("Split Name")
});
```

The `SDK_READY` event fires only once, after the SDK factory has downloaded all necessary data to calculate treatments from Harness FME servers. If the `client.on` method is called after the `SDK_READY` event has already fired, the callback will never execute because the event does not re-fire.

Even if a cache exists before SDK factory initialization, the SDK will always make an HTTP call to sync with Harness FME servers before firing `SDK_READY`. To ensure your event handler runs, call `client.on` immediately *after* initializing the factory, before any awaited operations. It is recommended to create a wrapper around the SDK client that tracks readiness via an `isSDKReady` flag set inside the `SDK_READY` event callback.

Below are example implementations for each SDK language (JavaScript, Android, iOS) demonstrating the recommended pattern.

<Tabs queryString="mobile-sdk-examples">
<TabItem value="android" label="Android SDK">

In the Android wrapper class, we are using a static variable to indicate the SDK is ready. This will work if you have only one instance of the wrapper class.

```java
public class SplitSDK {
    public SplitClient client;
    public static boolean isSDKReady=false;
    SplitSDK(String APIKey, Key userId, Context appContext) throws Exception {
        SplitClientConfig config = SplitClientConfig.builder()
                .build();
        try {
            SplitFactory splitFactory = SplitFactoryBuilder.build(APIKey, userId, config, appContext);
            this.client = splitFactory.client();
            this.client.on(SplitEvent.SDK_READY, new SplitEventTask() {
                 @Override
                 public void onPostExecutionView(SplitClient client) {
                     SplitSDK.isSDKReady = true;
                 }
             });
        } catch (Exception e) {
            System.out.print("Exception: " + e.getMessage());
        }
    }
}
```

</TabItem>
<TabItem value="ios" label="iOS SDK">

```swift
class SplitWrapper {
    var isSDKReady=false
    var client:SplitClient
    init(apiKey: String, key: Key) {
        let config = SplitClientConfig()
        let builder = DefaultSplitFactoryBuilder()
        let factory = builder.setApiKey(apiKey)
            .setKey(key)
            .setConfig(config)
            .build()
        self.client = factory!.client
        self.client.on(event: SplitEvent.sdkReady) {
            self.isSDKReady=true
        }
    }
}
```

</TabItem>
<TabItem value="browser" label="JavaScript Browser SDK">

```javascript
class SplitIO {
    constructor() {
        this.isSDKReady=false;
        this.factory = splitio({
            core: {
                authorizationKey: APIKEY,
                key: userKey,
                trafficType: userTrafficType
            },
            startup: {
                readyTimeout: 4
            },
        });
        this.client = this.factory.client();
        this.client.on(this.client.Event.SDK_READY, () => {
           this.isSDKReady=true;
        });
    }
}
```

</TabItem>
</Tabs>