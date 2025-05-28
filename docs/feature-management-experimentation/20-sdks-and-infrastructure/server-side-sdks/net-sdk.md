---
title: .NET SDK
sidebar_label: .NET SDK
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020240172--NET-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our .NET SDK. All of our SDKs are open source. Go to our [.NET SDK GitHub repository](https://github.com/splitio/dotnet-client) to learn more.

## Language Support

This SDK supports the following .NET platform versions:
  - .NET Framework 4.5 and later
  - .NET Core 2.x and 3.x
  - .NET 8, .NET 7, .NET 6 and .NET 5

## Initialization

:::warning[Important!]
We unified the source code for Splitio and Splitio-net-core packages in one repository and there is no need to have two packages anymore. The last release of Splitio-net-core was 6.2.3. For current and future releases please use our Splitio package.
:::

### 1. Import the SDK into your project

Use NuGet in the command line or the Package Manager UI in Visual Studio.

```csharp title="NuGet"
Install-Package Splitio -Version 7.10.0
```

### 2. Instantiate the SDK and create a new SDK factory client

:::danger[If upgrading an existing SDK - Block until ready changes]
Starting version 5.0.0, .Ready is deprecated and migrated to the following implementation:
Call `SplitClient.BlockUntilReady(int milliseconds)` or `SplitManager.BlockUntilReady(int milliseconds)`.
:::

When the SDK is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while its in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, block until the SDK is ready. This is done by using `.BlockUntilReady(int milliseconds)` method as part of the instantiation process of the SDK factory client as shown below. Do this all as a part of the startup sequence of your application. If SDK is not ready after the specified time, the SDK fails to initialize and throws a `TimeoutException` error.

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Use the code snippet below with your own API key. Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a server-side SDK API key. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

```csharp title="C#"
using Splitio.Services.Client.Classes;

var config = new ConfigurationOptions();

var factory = new SplitFactory("YOUR_SDK_KEY", config);
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

Now you can start asking the SDK to evaluate treatments for your customers.

## Using the SDK

### Basic use

After you instantiate the SDK factory client, you can use the `GetTreatment` method of the SDK factory client to decide what version of your features your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `key` attribute that corresponds to the end user that you are serving the feature to.

Then use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning the [control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

<Tabs>
<TabItem value="GetTreatment">

```csharp
// The KEY here represents the ID of the user/account/etc you're trying to evaluate a treatment for
var treatment = sdk.GetTreatment("KEY","FEATURE_FLAG_NAME");

if (treatment == "on")
{
    // insert code here to show on treatment
}
else if (treatment == "off")
{
    // insert code here to show off treatment
}
else
{
    // insert your control treatment code here
}
```

</TabItem>
<TabItem value="GetTreatmentAsync">

```csharp
// The KEY here represents the ID of the user/account/etc you're trying to evaluate a treatment for
var treatment = await sdk.GetTreatmentAsync("KEY","FEATURE_FLAG_NAME");

if (treatment == "on")
{
    // insert code here to show on treatment
}
else if (treatment == "off")
{
    // insert code here to show off treatment
}
else
{
    // insert your control treatment code here
}
```

</TabItem>
</Tabs>

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `GetTreatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `GetTreatment` call. These attributes are compared and evaluated against the attributes used in the Rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `GetTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `long` or `int`.
* **Dates: ** Express the value for these attributes in `milliseconds since epoch` and as objects of class `DateTime`.
* **Booleans:** Use type `bool`.
* **Sets:** Use type `List<string>`.

<Tabs>
<TabItem value="GetTreatment">

```csharp
using Splitio.Services.Client.Classes;

var factory = new SplitFactory("YOUR_SDK_KEY");
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}

var values = new List<string> { "read", "write" };

var attributes = new Dictionary<string, object>
{
    { "plan_type", "growth" },
    { "registered_date", System.DateTime.UtcNow },
    { "deal_size", 1000 },
    { "paying_customer", true },
    { "permissions", values }
};

var treatment = sdk.GetTreatment("KEY", "FEATURE_FLAG_NAME", attributes);

if (treatment == "on")
{
    // insert code here to show on treatment
}
else if (treatment == "off")
{
    // insert code here to show off treatment
}
else
{
    // insert your control treatment code here
}
```

</TabItem>
<TabItem value="GetTreatmentAsync">

```csharp
using Splitio.Services.Client.Classes;

var factory = new SplitFactory("YOUR_SDK_KEY");
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}

var values = new List<string> { "read", "write" };

var attributes = new Dictionary<string, object>
{
    { "plan_type", "growth" },
    { "registered_date", System.DateTime.UtcNow },
    { "deal_size", 1000 },
    { "paying_customer", true },
    { "permissions", values }
};

var treatment = await sdk.GetTreatmentAsync("KEY", "FEATURE_FLAG_NAME", attributes);

if (treatment == "on")
{
    // insert code here to show on treatment
}
else if (treatment == "off")
{
    // insert code here to show off treatment
}
else
{
    // insert your control treatment code here
}
```

</TabItem>
</Tabs>

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `GetTreatments` from the SDK factory client to do this.
* `GetTreatments`: Pass a list of the feature flag names you want treatments for.
* `GetTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `GetTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs>
<TabItem value="GetTreatments">

```csharp
var featureFlagNames = new List<string> { "FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2" };
var result = client.GetTreatments("KEY", featureFlagNames);
```

</TabItem>
<TabItem value="GetTreatmentsByFlagSet">

```csharp
var result = client.GetTreatmentsByFlagSet("KEY", "backend");
```

</TabItem>
<TabItem value="GetTreatmentsByFlagSets">

```csharp
var flagSets = new List<string> { "backend", "server_side" };
var result = client.GetTreatmentsByFlagSets("KEY", flagSets);
```

</TabItem>
<TabItem value="GetTreatmentsAsync">

```csharp
var featureFlagNames = new List<string> { "FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2" };
var result = await client.GetTreatmentsAsync("KEY", featureFlagNames);
```

</TabItem>
<TabItem value="GetTreatmentsByFlagSetAsync">

```csharp
var result = await client.GetTreatmentsByFlagSetAsync("KEY", "backend");
```

</TabItem>
<TabItem value="GetTreatmentsByFlagSetsAsync">

```csharp
var flagSets = new List<string> { "backend", "server_side" };
var result = await client.GetTreatmentsByFlagSetsAsync("KEY", flagSets);
```

</TabItem>
</Tabs>

You can also use the [Split Manager](#manager) to get all of your treatments at once.

### Get Treatments with Configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you should use the `GetTreatmentWithConfig` method.

This method returns an object containing the treatment and associated configuration.

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `null` for the config parameter.

This method takes the exact same set of arguments as the standard `GetTreatment` method. See below for examples on proper usage:

<Tabs>
<TabItem value="GetTreatmentWithConfig">

```csharp
var featureFlagResult = splitClient.GetTreatmentWithConfig("KEY", "FEATURE_FLAG_NAME");
var config = JsonConvert.DeserializeObject(featureFlagResult.Config);
var treatment = featureFlagResult.Treatment;
```

</TabItem>
<TabItem value="GetTreatmentWithConfigAsync">

```csharp
var featureFlagResult = await splitClient.GetTreatmentWithConfigAsync("KEY", "FEATURE_FLAG_NAME");
var config = JsonConvert.DeserializeObject(featureFlagResult.Config);
var treatment = featureFlagResult.Treatment;
```

</TabItem>
</Tabs>

If you need to get multiple evaluations at once, you can also use the `GetTreatmentsWithConfig` methods. These methods take the exact same arguments as the [GetTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult instead of strings. Example usage below:

<Tabs>
<TabItem value="GetTreatmentsWithConfig">

```csharp
var featureFlagNames = new List<string> { "FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2" };
var featureFlagResults = splitClient.GetTreatmentsWithConfig("KEY", featureFlagNames);
```

</TabItem>
<TabItem value="GetTreatmentsWithConfigByFlagSet">

```csharp
var featureFlagResults = splitClient.GetTreatmentsWithConfigByFlagSet("KEY", "backend");
```

</TabItem>
<TabItem value="GetTreatmentsWithConfigByFlagSets">

```csharp
var flagSets = new List<string> { "backend", "server_side" };
var featureFlagResults = splitClient.GetTreatmentsWithConfigByFlagSets("KEY", flagSets);
```

</TabItem>
<TabItem value="GetTreatmentsWithConfigAsync">

```csharp
var featureFlagNames = new List<string> { "FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2" };
var featureFlagResults = await splitClient.GetTreatmentsWithConfigAsync("KEY", featureFlagNames);
```

</TabItem>
<TabItem value="GetTreatmentsWithConfigByFlagSetAsync">

```csharp
var featureFlagResults = await splitClient.GetTreatmentsWithConfigByFlagSetAsync("KEY", "backend");
```

</TabItem>
<TabItem value="GetTreatmentsWithConfigByFlagSetsAsync">

```csharp
var flagSets = new List<string> { "backend", "server_side" };
var featureFlagResults = await splitClient.GetTreatmentsWithConfigByFlagSetsAsync("KEY", flagSets);
```

</TabItem>
</Tabs>

### Shutdown

Call the `.destroy()` method before letting a process using the SDK exit, as this method gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.

If a manual shutdown is required, call the `client.Destroy()` method.

<Tabs>
<TabItem value="Destroy">

```csharp
client.Destroy();
```

</TabItem>
<TabItem value="DestroyAsync">

```csharp
await client.DestroyAsync();
```

</TabItem>
</Tabs>

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

[Learn more](https://help.split.io/hc/en-us/articles/360020585772) about using track events in feature flags.

In the examples below, you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `GetTreatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Double**.
* **PROPERTIES:** (Optional) A map of key value pairs that can be used to filter your metrics. Learn more about event property capture [in the Events guide](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties). FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK can successfully queue the event to be sent back to Harness servers on the next event post. The SDK returns `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

In case a bad input is provided, refer to the [Events](https://help.split.io/hc/en-us/articles/360020585772-Track-events) guide for more information about our SDK's expected behavior.

<Tabs>
<TabItem value="Track">

```csharp
// If you would like to send an event without a value
bool success = client.Track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
bool success = client.Track("john@doe.com", "user", "page_load_time");

// If you would like to associate a value to an event
bool success = client.Track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example
bool success = client.Track("john@doe.com", "user", "page_load_time", 83.334);

// If you would like to associate a value and properties to an event
bool trackEvent = client.Track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES});
// Example
var properties = new Dictionary<string, object>
{
    { "package", "premium" },
    { "admin", true },
    { "discount", 50 }
};

bool trackEvent = client.Track("john@doe.com", "user", "page_load_time", 83.334, properties);

// If you would like to associate just properties to an event
bool trackEvent = client.Track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", properties: {PROPERTIES});
// Example
var properties = new Dictionary<string, object>
{
    { "package", "premium" },
    { "admin", true },
    { "discount", 50 }
};

bool trackEvent = client.Track("john@doe.com", "user", "page_load_time", properties: properties);
```

</TabItem>
<TabItem value="TrackAsync">

```csharp
// If you would like to send an event without a value
bool success = await client.TrackAsync("KEY", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
bool success = await client.TrackAsync("john@doe.com", "user", "page_load_time");

// If you would like to associate a value to an event
bool success = await client.TrackAsync("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example
bool success = await client.TrackAsync("john@doe.com", "user", "page_load_time", 83.334);

// If you would like to associate a value and properties to an event
bool trackEvent = await client.TrackAsync("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES});
// Example
var properties = new Dictionary<string, object>
{
    { "package", "premium" },
    { "admin", true },
    { "discount", 50 }
};

bool trackEvent = await client.TrackAsync("john@doe.com", "user", "page_load_time", 83.334, properties);

// If you would like to associate just properties to an event
bool trackEvent = await client.TrackAsync("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", properties: {PROPERTIES});
// Example
var properties = new Dictionary<string, object>
{
    { "package", "premium" },
    { "admin", true },
    { "discount", 50 }
};

bool trackEvent = await client.TrackAsync("john@doe.com", "user", "page_load_time", properties: properties);
```

</TabItem>
</Tabs>

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| FeaturesRefreshRate | The SDK polls Harness servers for changes to feature flags at this rate (in seconds). | 5 seconds |
| SegmentsRefreshRate | The SDK polls Harness servers for changes to segments at this rate (in seconds). | 60 seconds |
| ImpressionsRefreshRate | The treatment log captures which customer saw what treatment (on, off, etc) at what time. This log is periodically flushed back to Harness servers. This configuration controls how quickly the cache expires after a write (in seconds). | 30 seconds |
| TelemetryRefreshRate | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds |
| ConnectionTimeout | HTTP client connection timeout (in ms). | 15000ms |
| ReadTimeout | HTTP socket read timeout (in ms). | 15000ms |
| LabelsEnabled | Enable/disable labels from being sent to the Harness servers. Labels may contain sensitive information. | true |
| EventsFirstPushWindow | The SDK collects the events generated by the customer. This setting controls the number of seconds to wait for sending the events to the Harness servers (in seconds) after the SDK is built. | 10 seconds |
| EventsPushRate | The SDK collects the events generated by the customer. This setting controls how frequently the events are sent to the Harness servers (in seconds) after the first push. | 60 seconds |
| EventsQueueSize | The SDK collects the events generated by the customer. This setting controls how many events are stored locally before sending them to the Harness servers (for standalone mode only). | 500 |
| IPAddressesEnabled | Disable machine IP and Hostname from being sent to Harness servers. IP and Hostname may contain sensitive information. | true |
| StreamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | true |
| ImpressionsMode | Defines how impressions are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG.  In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, all impressions are queued and sent to Harness; this is useful for validations. Use DEBUG mode when you want every impression to be logged user interface when trying to debug your SDK setup.  This setting does not impact the impression listener which receives all generated impressions locally. | Optimized |
| ProxyHost | The name of the proxy host. | string.empty |
| ProxyPort | The port number on Host to use. | 0 (not set) |
| FlagSetsFilter | This setting allows the SDK to only synchronize the feature flags in the specified flag sets, avoiding unused or unwanted flags from being synced on the SDK instance, bringing all the benefits from a reduced payload. | null |

To set each of the parameters above, use the following syntax:

```csharp title="C#"
var config = new ConfigurationOptions
{
    ReadTimeout = 15000,
    ConnectionTimeout = 15000,
    FlagSetsFilter = new List<string> { "backend", "server_side" }
};

var factory = new SplitFactory("YOUR_SDK_KEY", config);
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

## Sharing state: Redis integration

**Configuring this Redis integration section is optional for most setups. Read below to determine if it might be useful for your project**

By default, the SDK factory client stores the state it needs to compute treatments (rollout plans, segments, and so on) in memory. As a result, it is easy to get set up with FME: instantiate a client and start using it.

This simplicity hides one important detail that is worth exploring. Because each SDK factory client downloads and stores state separately, a change in a feature flag is picked up by every client on its own schedule. If a customer issues back-to-back requests that are served by two different machines behind a load balancer, the customer can see different treatments for the same feature flag because one SDK factory client may not have picked up the latest change. This drift in clients is natural and usually ignorable as long as each client sets an aggressive value for `FeaturesRefreshRate` and `SegmentsRefreshRate`. You can learn more about setting these rates in the [Configuration section](#configuration) below.

However, if your application requires a total guarantee that SDK clients across your entire infrastructure pick up a change in a feature flag at the exact same time, then the only way to ensure that is to externalize the state of the SDK factory client in a data store hosted on your infrastructure.

We currently support Redis for this external data store.

To use the .Net SDK with Redis, you need to set up the Split Synchronizer and instantiate the SDK in Consumer mode.

### Producer

Refer to our [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) documents and follow the steps there to get everything set to sync data to your Redis cache. After you do that, come back to set up the Consumer.

### Consumer

First, import Splitio.Redis NuGet package into your project.

Use NuGet in the command line or the Package Manager UI in Visual Studio.

```csharp title="NuGet"
Install-Package Splitio.Redis -Version 7.10.0
```

To initiate an SDK with support for Redis as consumer mode, use the following code snippet:

```csharp title="C#"
using Splitio.Services.Client.Classes;

var cacheAdapterConfigurationOptions = new CacheAdapterConfigurationOptions
{
    Type = AdapterType.Redis,
    Host = "localhost",
    Port = "6379",
    Password = "",
    Database = 2,
    ConnectTimeout = 5000,
    ConnectRetry = 3,
    SyncTimeout = 1000,
    UserPrefix = "my_user_prefix",
    PoolSize = 1
};

var config = new ConfigurationOptions
{
    Mode = Mode.Consumer,
    CacheAdapterConfig = cacheAdapterConfigurationOptions
};

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

Available modes are *standalone* (default, for in-memory cache) and *consumer* (for Redis cache).

### SSL support for Redis connections

This is a basic snippet to set it up

```csharp title="C#"
using Splitio.Services.Client.Classes;
using Splitio.Domain;

var tlsConfig = new TlsConfig(ssl: true);
var cacheAdapterConfigurationOptions = new CacheAdapterConfigurationOptions
{
   // ....
   TlsConfig = tlsConfig
};
```

There are two more functions that you can optionally set up, for an advanced use case, that we provide to the library underneath if set:
* If you want to be responsible for validating the certificate supplied by the remote party, you should define the CertificateValidationFunc. [Doc](https://github.com/StackExchange/StackExchange.Redis/blob/main/src/StackExchange.Redis/ConfigurationOptions.cs#L158)
* If you want to be responsible for selecting the certificate used for authentication, you should define CertificateSelectionFunc. [Doc](https://github.com/StackExchange/StackExchange.Redis/blob/main/src/StackExchange.Redis/ConfigurationOptions.cs#L151)

```csharp title="C#"
using Splitio.Services.Client.Classes;
using Splitio.Domain;

var tlsConfig = new TlsConfig(ssl: true)
{
    CertificateValidationFunc = CertificateValidation,
    CertificateSelectionFunc = CertificateSelection
};

var cacheAdapterConfigurationOptions = new CacheAdapterConfigurationOptions
{
   // ....
   TlsConfig = tlsConfig
};
```

```csharp title="C#"
private X509Certificate2 CertificateSelection(object sender, string targetHost, X509CertificateCollection localCertificates, X509Certificate remoteCertificate, string[] acceptableIssuers)
{
    // your custom code
}

private bool CertificateValidation(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
{
    // your custom code
}
```

### Redis cluster support

The FME .NET SDK version **7.10.0 and above** supports Redis with [Cluster](https://redis.io/topics/cluster-spec).

To initiate the SDK with support for Redis Cluster, use the following code snippet:

```csharp title="C#"
using Splitio.Services.Client.Classes;

var clusterNodes = new Splitio.Domain.ClusterNodes
(
    new List<string>() { "RedisNode1:6379", "RedisNode2:6380", "RedisNode3:6381", ... },
    "{SPLITIO}"  // KeyHashTag added to user prefix
);
var cacheAdapterConfigurationOptions = new CacheAdapterConfigurationOptions
{
    Type = AdapterType.Redis,
    RedisClusterNodes = clusterNodes,
    Password = "",
    Database = 2,
    ConnectTimeout = 5000,
    ConnectRetry = 3,
    SyncTimeout = 1000,
    UserPrefix = "my_user_prefix",
    PoolSize = 1
};

var config = new ConfigurationOptions
{
    Mode = Mode.Consumer,
    CacheAdapterConfig = cacheAdapterConfigurationOptions
};

var factory = new SplitFactory("YOUR_SDK_KEY", config);
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

:::warning[The KeyHashTag Parameter]
The KeyHashTag is a required parameter. If left empty, the SDK will by default use "\{SPLITIO\}" as the KeyHashTag value. The KeyHashTag value is added to the user prefix to improve SDK performance in Redis Cluster.
You should use the same KeyHashTag value in the [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) app synching to the same Redis cluster.
:::

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (aka off-the-grid mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the feature flags.

To use the SDK in localhost mode, replace the SDK Key with "localhost", as shown in the example below:

Since version 4.1.2, our SDK supports a new type of localhost feature flag definition file, using the YAML format.
This new format allows the user to map different keys to different treatments within a single feature flag, and also add configurations to them.
The new format is a list of single-key maps (one per mapping feature_flag-keys-config), defined as follows:

```yaml title="YAML"
## - feature_name:
##     treatment: "treatment_applied_to_this_entry"
##     keys: "single_key_or_list"
##     config: "{\"desc\" : \"this applies only to ON treatment\"}"

- my_feature:
    treatment: "on"
    keys: "key"
    config: "{\"desc\" : \"this applies only to ON treatment\"}"
- some_other_feature:
    treatment: "off"
- my_feature:
    treatment: "off"
- other_feature:
    treatment: "off"
    keys: ["key_1", "key_2"]
    config: "{\"desc\" : \"this overrides multiple keys and returns off treatment for those keys\"}"
```

In the example above, we have four entries:
 * The first entry defines that for feature flag `my_feature`, the key `key` returns the treatment `on` and the `on` treatment is tied to the configuration `{"desc" : "this applies only to ON treatment"}`.
 * The second entry defines that the feature flag `some_other_feature` always returns the `off` treatment and no configuration.
 * The third entry defines that `my_feature` always returns `off` for all keys that don't match another entry (in this case, any key other than `key`).
 * The fourth entry shows how an example to override a treatment for a set of keys.


Once you've defined your yaml file, you can instantiate the SDK in localhost mode as detailed below:

```csharp title="C#"
var config = new ConfigurationOptions
{
    LocalhostFilePath = "FILE_PATH"
};

var factory = new SplitFactory("localhost", config);
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

The SDK maintains backward compatibility by the legacy file (.split), now deprecated.

```csharp title="C#"
var config = new ConfigurationOptions
{
    LocalhostFilePath = "$HOME/.split"
};

var factory = new SplitFactory("localhost", config);
var client = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

In this mode, the SDK loads a mapping of feature flag name to treatment from a file at `$HOME/.split`. For a given feature flag, the treatment specified in the file is returned for every customer.

`GetTreatment` calls for a feature flag only return the one treatment that you defined in the file. You can then change the treatment as necessary for your testing in the file. Any feature flag that is not provided in the `features` map returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment) if the SDK is asked to evaluate them.

The format of this file is two columns separated by a whitespace. The left column is the feature flag name, and the right column is the treatment name. Here is a sample `.split` file.

```bash title="Shell"
reporting_v2 on ## sdk.getTreatment(*, reporting_v2) will return 'on'

double_writes_to_cassandra off

new-navigation v3
```

## Manager

Use the Split Manager to get a list of feature flags available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

```csharp title="Manager"
var factory = new SplitFactory("YOUR_SDK_KEY");
var splitManager = factory.Manager();
```

The Manager has the following methods available.

<Tabs>
<TabItem value="Manager interface">

```csharp
/**
* Retrieves the feature flags that are currently registered with the
* SDK.
*
* @return a List of SplitView or empty.
*/
List<SplitView> Splits();

/**
* Returns the feature flags registered with the SDK of this name.
*
* @return SplitView or null
*/
SplitView Split(string splitName);

/**
* Returns the names of feature flags registered with the SDK.
*
* @return a List of String (feature flag names) or empty
*/
List<String> SplitNames();
```

</TabItem>
<TabItem value="Manager interface async">

```csharp
/**
* Retrieves the feature flags that are currently registered with the
* SDK.
*
* @return a List of SplitView or empty.
*/
Task<List<SplitView>> SplitsAsync();

/**
* Returns the feature flags registered with the SDK of this name.
*
* @return SplitView or null
*/
Task<SplitView> SplitAsync(string splitName);

/**
* Returns the names of feature flags registered with the SDK.
*
* @return a List of String (feature flag names) or empty
*/
Task<List<String>> SplitNamesAsync();
```

</TabItem>
</Tabs>

The `SplitView` object that you see referenced above has the following structure.

```csharp title="SplitView"
public class SplitView
{
  public string name { get; }
  public string trafficType { get; }
  public bool killed { get; }
  public List<string> treatments { get; }
  public long changeNumber { get; }
  public Dictionary<string, string> configs { get; }
  public string defaultTreatment { get; }
  public List<string> sets { get; }
}
```

## Listener

FME SDKs send impression data back to Harness servers periodically and as a result of evaluating feature flags. To additionally send this information to a location of your choice, define and attach an impression listener.

The SDK sends the generated impressions to the impression listener right away.

To create an impression listener, you need to implement an `IImpressionListener` interface.

```csharp title="Listener"
public class CustomImpressionListener: IImpressionListener
{
  ...

  public void Log(KeyImpression impression)
  {
    //Implement your custom code
  }
}
```

Then add a configuration to attach to it.

```csharp title="Configuration"
...
configurations.ImpressionListener = new CustomImpressionListener();
...

var factory = new SplitFactory("YOUR_SDK_KEY", configurations);
var sdk = factory.Client();

try
{
    sdk.BlockUntilReady(10000);
}
catch (Exception ex)
{
    // log & handle
}
```

## Proxy

If you need to use a proxy, you can configure proxies by setting the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. The SDK reads those variables and uses them to perform the server request. [Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.defaultproxy?view=net-7.0)

Also you can configure proxies by setting the ProxyHost and ProxyPort properties in the SDK configuration (refer [Configuration](#configuration) section for more information). The SDK uses those properties, with higher precedence than environment variables, to perform the server request. [Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.net.webproxy.-ctor?view=net-7.0#system-net-webproxy-ctor(system-string-system-int32))

## Logging

### SDK logging

The .NET SDK uses Common.Logging for logging. It allows you to configure different adapters such as log4net or NLog, and you can also write your own adapter by implementing an `ILoggerFactoryAdapter` interface. For more details, go [here](http://netcommon.sourceforge.net/docs/2.1.0/reference/html/ch01.html).

The following is an example of how to configure NLog and its adapter.

```csharp title="C#"
var configLog = new NLog.Config.LoggingConfiguration();
var fileTarget = new NLog.Targets.FileTarget();
configLog.AddTarget(“file”, fileTarget);
fileTarget.FileName = @“mylog.log”;
fileTarget.ArchiveFileName = “ANYFILENAME”;
fileTarget.LineEnding = NLog.Targets.LineEndingMode.CRLF;
fileTarget.Layout = “${longdate} ${level: uppercase = true} ${logger} - ${message} - ${exception:format=tostring}“;
fileTarget.ConcurrentWrites = true;
fileTarget.CreateDirs = true;
fileTarget.ArchiveNumbering = NLog.Targets.ArchiveNumberingMode.Date;
var rule = new NLog.Config.LoggingRule(“*”, NLog.LogLevel.Debug, fileTarget);
configLog.LoggingRules.Add(rule);
NLog.LogManager.Configuration = configLog;

System.Collections.Specialized.NameValueCollection properties = new System.Collections.Specialized.NameValueCollection();
properties[“configType”] = “INLINE”;
Common.Logging.LogManager.Adapter = new MyAdapter();
```

The .NET Core SDK uses [Microsoft.Extensions.Logging](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging?view=dotnet-plat-ext-3.0) that works well with a variety of built-in and third-party logging providers.

The following example shows how to include the SDK logs in only one line by updating your Startup class.

```csharp title="C#"
//...
using Microsoft.Extensions.Logging;

public class Startup
{
    //...

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
        //...

        loggerFactory.AddSplitLogs();
    }
}
```

In the following example we use [Serilog](https://github.com/serilog/serilog-extensions-logging-file) to configure text file logging. Of course you can use the tool of your preference.

```csharp title="C#"
    loggerFactory
        .AddSplitLogs()
        .AddFile("Logs/myapp-{Date}.txt", LogLevel.Debug); // calling Serilog AddFile method
```

### Enable debug logging using Log4net library in ASP .NET Core App

The following is an example that enables debug logging using the Log4net library in the ASP .NET Core app.

**Environment**

log4net 2.0.12

.NET Core 3.1

To use this example, do the following:

1. [Download the project](https://github.com/splitio/split-dotnet-debug-log-examples/tree/main/SplitLog4netExample_NETCore) and open the project from Visual Studio.
2. Open the SplitInitializer.cs file and replace the "SDK API KEY" text with the server-side SDK KEY.
3. Optionally edit the log4net.config file to change the log file path, name or format.

### Enable debug logging using Log4net library

The following is an example that enables debug logging using the Log4net library in .NET framework console app.

**Environment**

log4net 2.0.8

.NET Framework 4.8

To use this example, do the following:

1. [Download the project](https://github.com/splitio/split-dotnet-debug-log-examples/tree/main/SplitLog4netExample_NETFramework) and open the project from Visual Studio.
2. Open the Program.cs file and update the apikey variable with the server-side SDK KEY.
3. Optionally edit the log4net.config file to change the log file path, name, or format.

### Custom logging

To use a custom logger, implement the interface `ISplitLogger` which is defined as follows:
```csharp title="C#"
public interface ISplitLogger
{
    void Debug(string message, Exception exception);
    void Debug(string message);
    void Error(string message, Exception exception);
    void Error(string message);
    void Info(string message, Exception exception);
    void Info(string message);
    void Trace(string message, Exception exception);
    void Trace(string message);
    void Warn(string message, Exception exception);
    void Warn(string message);
    bool IsDebugEnabled { get; }
}
```

The following is an example of how config the customer logger in the SDK:

:::info[Note]
It's the developer's responsibility to ensure that the following logger methods don't crash, and can handle logging levels if a custom logger is user.
:::

```csharp title="C#"
using Microsoft.Extensions.Logging;

public class CustomLoggerImplementation : ISplitLogger
{
    public void Debug(string message, Exception exception)
    {
        // your code
    }

    // Should implement interface.
}

// ...

var config = new ConfigurationOptions
{
    ...
    Logger = new CustomLoggerImplementation()
};

var factory = new SplitFactory("YOUR_SDK_KEY", config);
var sdk = factory.Client();
```