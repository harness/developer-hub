---
title: Go SDK
sidebar_label: Go SDK
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020093652-Go-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Go SDK. All of our SDKs are open source. Go to our [Go SDK GitHub repository](https://github.com/splitio/go-client) to learn more.

## Language support

The Go SDK supports Go language version 1.18 and above. 

## Initialization
 
### SDK architecture

The Go SDK can run in three different modes to fit in different infrastructure configurations.

* **in-memory-standalone:** The default (if no mode is specified) and most straightforward operation mode uses an in-memory storage to keep feature flags, segments, and queued impressions/metrics, as well as its own synchronization tasks that periodically keep feature flags and segments up to date, while flushing impressions and metrics to the Harness servers.
* **redis-consumer:** This mode uses Redis as a broker to retrieve feature flags and segments and store impressions and metrics. It also requires the [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) to be running in the background, populating Redis with segments and feature flags, and flushing impressions and metrics to the Harness servers. This mode is useful if you have multiple instances of SDKs running (either in the same or a different language) and want to have a single synchronization point in your infrastructure.
* **localhost:** This mode should be used to stub the FME service when running local tests or development processes. It parses a file (either one specified by the user or `$HOME/.splits`) that defines feature flags and treatments to provide the developer with a predictable result of running `Treatment()` calls. 

### 1. Installing the SDK into your Go environment

Since version 6, the Go SDK uses modules to handle all dependencies including itself, and due to semantic import versioning, both `dep` and bare-bones `go-get` are deprecated. To start using our SDK with modules, update your `go.mod` file as follows:

```go title="go.mod"
require "github.com/splitio/go-client/v6 v6.7.0"
```

And update the import paths in your application to use the `v6` package suffix as follows:

```go title="example.go"
import "github.com/splitio/go-client/v6/splitio/client
```

```go title="Go get"
go get github.com/splitio/go-client/v6@v6.7.0
```

:::warning[If using Synchronizer with Redis - Synchronizer 2.x required after SDK Version 5.0.0]
Since version 2.0.0 of the split-synchronizer, we use a more efficient scheme to store impressions in Redis. This approach is faster and easier on your Redis instances, since it yields better throughput of impressions to the backend. If you use this SDK with the synchronizer in Redis or Proxy mode, you will need the newest versions of our Split Synchronizer. It is recommended that once you're using SDK versions compatible with Split-Sync 2.0 on all your applications pointing to the Redis instance maintained by the Split-Sync, you disable backwards compatibility (this is as easy as changing a parameter to `true` on the JSON config or an environment variable to `on` if you're using the docker image).
:::

### 2. Import the SDK into your project

You can import the SDK into your project as shown below.

```go title="go-client > v6.7.0"
import (
	"github.com/splitio/go-client/v6/splitio/client"
	"github.com/splitio/go-client/v6/splitio/conf"
)
```

:::info[Using a wrapper]
Starting on version v6.0.0, every breaking change will require that you update your imports in cases where the SDK is used across multiple files.
It is recommended to create a wrapper that keeps it encapsulated. The package/file should be responsible for instantiating a single instance and exposing its functionality.
:::

### 3. Instantiate the SDK and create a new SDK factory client

:::danger[If upgrading an existing SDK - Block until ready changes]
Starting version 4.0.0, cfg.BlockUntilReady is deprecated and migrated to the following implementation:
* Call `SplitClient#BlockUntilReady(int)` or `SplitManager#BlockUntilReady(int)`.
:::

When the SDK is instantiated in `inmemory-standalone` operation mode, it kicks off background tasks to update an in-memory or Redis cache.

This process can take up to a few hundred milliseconds depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while it is in this intermediate state, it may not have the data necessary to run the evaluation. In this circumstance, the SDK does not fail, but instead returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, you need to block until the SDK is ready. You can block by using the `BlockUntilReady(int)` method as part of the instantiation process of the SDK factory client as shown below. Do this as a part of the startup sequence of your application.

Instantiating two (or more) different factories results in multiple instances of synchronization tasks, so you can have different instances of the SDK with different SDK Keys running within a single application.

In the most common scenario, you should instantiate and reuse a single SDK factory throughout your application.

Configure the SDK with the SDK key for the FME environment that you would like to access. The SDK key is available in Harness FME Admin settings. Select a server-side SDK API key. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

```go title="Go"
func main() {
  	cfg := conf.Default()
	factory, err := client.NewSplitFactory("YOUR_SDK_KEY", cfg)
	if err != nil {
		fmt.Printf("SDK init error: %s\n", err)
		return
	}

	splitClient := factory.Client()
	err = splitClient.BlockUntilReady(10)
	if err != nil {
		fmt.Printf("SDK timeout: %s\n", err)
		return
	}
	// ...
}
```

Now you can start asking the SDK to evaluate treatments for your customers.

## Using the SDK
 
### Basic use

After you instantiate the SDK factory client, you can start using the client's `Treatment` method to decide what version of your feature flags your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `key` attribute that corresponds to the end user that you are serving the feature flag to.

Then use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning the [control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

```go title="Go"
// The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
treatment := splitClient.Treatment("KEY", "FEATURE_FLAG_NAME", nil)
if treatment == "on" {
  // insert code here to show on treatment
} else if treatment == "off" {
  // insert code here to show off treatment 
} else {
  // insert your control treatment code here
}
```

The arguments for the `Treatment()` call are:

* **key:** Either a string or a compound key that includes to strings. The matching key is used for evaluation purposes, and the bucketing key is used to determine the treatment based on the percentages specified in the feature flag creation user interface.
* **featureFlagName:** The name of the feature flag you are evaluating.
* **attributes:** A `map[string]interface{}` element that contains the attributes that are used by specific conditions that rely on information other than the key for matching purposes.

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `Treatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `Treatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or off` treatment to this account.

The `Treatment()` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `int64`.
* **Dates: ** Express the value in `seconds since epoch` in `int64`.
* **Booleans:** Use type `bool`.
* **Sets:** Pass as `string slice ([]string)`.

```go title="Go"
	attributes := make(map[string]interface{})
	attributes["plan_type"] = "growth";
	attributes["registered_date"] = time.Now().UTC().Unix()
	attributes["deal_size"] = 10000;
	attributes["paying_customer"] = true;
	attributes["permissions"] = []string{"read","write"}
```

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `Treatments` from the SDK factory client to do this.
* `Treatments`: Pass a list of the feature flag names you want treatments for.
* `TreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `TreatmentsByFlagSets`: Evaluates all flags that are part of the provided set names and are cached on the SDK instance.


<Tabs>
<TabItem value="Treatments">
```go
splitClient := factory.Client()
treatments := splitClient.Treatments(
	"KEY",
	[]string{"FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2", "FEATURE_FLAG_NAME_3"},
	nil,
)
 
for featureFlag, treatment := range treatments {
	fmt.Printf("Treatment for feature flag %s is %s\n", featureFlag, treatment)
}
```
</TabItem>
<TabItem value="TreatmentsByFlagSet">
```go
splitClient := factory.Client()
treatments := splitClient.TreatmentsByFlagSet("KEY", "backend", nil)
```
</TabItem>
<TabItem value="TreatmentsByFlagSets">
```go
splitClient := factory.Client()
treatments := splitClient.TreatmentsByFlagSets("KEY", []string{"backend", "server_side"}, nil)
```
</TabItem>
</Tabs>

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you should use the `TreatmentWithConfig` method.

This method will return an object containing the treatment and associated configuration.

The config element will be a stringified version of the configuration JSON defined in Harness FME. If there are no configs defined for a treatment, the SDK returns `nil` for the config parameter.

This method takes the exact same set of arguments as the standard `Treatment` method. See below for examples on proper usage:

```go title="Go"
result := splitClient.TreatmentWithConfig("KEY", "FEATURE_FLAG_NAME", attributes)
var configs MyConfiguration // User custom configuration structure
if result.Config != nil {
    err = json.Unmarshal([]byte(*result.Config), &config)
    if err != nil {
        fmt.Println("Error:", err)
    }
}
treatment := result.Treatment
```

If you need to get multiple evaluations at once, you can also use the `TreatmentsWithConfig` methods. These methods take the exact same arguments as the [Treatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult objects instead of strings. Example usage below.

<Tabs>
<TabItem value="TreatmentsWithConfig">
```go
TreatmentResults := splitClient.TreatmentsWithConfig("KEY", []string{"FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"}, attributes)
// TreatmentResults will have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }	
```
</TabItem>
<TabItem value="TreatmentsWithConfigByFlagSet">
```go
TreatmentResults := splitClient.TreatmentsWithConfigByFlagSet("KEY", "backend", attributes)
```
</TabItem>
<TabItem value="TreatmentsWithConfigByFlagSets">
```go
TreatmentResults := splitClient.TreatmentsWithConfigByFlagSets("KEY", []string{"backend", "server_side"}, attributes)
```
</TabItem>
</Tabs>

### Shutdown

Call the `.Destroy()` method before letting a process using the SDK exit, as this method gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions. Call the `splitClient.Destroy()` method when the `kill` signal is cached by your application. After `.Destroy()` is called, any subsequent invocations to the `splitClient.Treatment()` or `manager` methods results in `control` or empty list, respectively.

The example below shows how to catch the stop signal and call the `Destroy()` method.

```go title="Go"
func main() {
    sigs := make(chan os.Signal, 2)
    signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

    cfg := conf.Default()
    factory, err := client.NewSplitFactory("YOUR_SDK_KEY", cfg)

    if err != nil {
      fmt.Printf("SDK init error: %s\n", err)
      return
    }

    splitClient := factory.Client()
    err = splitClient.BlockUntilReady(10)
    if err != nil {
      fmt.Printf("SDK timeout: %s\n", err)
      return
    }

    client := factory.Client()

    go func() {
        <-sigs
        splitClient.Destroy()
        os.Exit(0)
    }()
}
```

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

[Learn more](https://help.split.io/hc/en-us/articles/360020585772) about using track events in feature flags. 

In the examples below, you can see that the `Track()` method can take up to five arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `Treatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period. 
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**. 
* **PROPERTIES:** (Optional) A Map of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

:::warning[Redis Support]
If you are using our SDK with Redis, you need Split Synchronizer **2.3.0** version at least in order to support *properties* in the `track` method.
:::

```go title="Go"
// If you would like to send an event without a value 
err = splitClient.Track("key", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
err = splitClient.Track("john@doe.com", "user", "page_load_time"); 

// If you would like to associate a value to an event
err = splitClient.Track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example  
err= splitClient.Track("john@doe.com", "user", "page_load_time", 83.334)

// If you would like to associate just properties to an event
err = splitClient.Track("key", "TRAFFIC_TYPE", "EVENT_TYPE", nil, {PROPERTIES})

// If you would like to associate a value and properties to an event
err = splitClient.Track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES})
// Example
properties := make(map[string]interface{})
properties["package"] = "premium"
properties["admin"] = true
properties["discount"] = 50

err = splitClient.Track("key", "TRAFFIC_TYPE", "EVENT_TYPE", 83.334, properties)
```

## Configuration
 
### Basic configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Field name(s)** | **Description** | **Default value** |
| --- | --- | --- | 
| IPAddress | String in the format xxx.xxx.xxx.xxx containing the IP address that you want to be logged when submitting impressions. | By default, the SDK tries to figure out your IP address automatically. If this does not work, it falls back to *unknown*. |
| InstanceName | Unique identifier for this instance. | By default, the IP address is taken and the dots are replaced with hyphens. |
| LabelsEnabled | Whether impressions should include information about the label of the condition that matched. | true |
| Logger | User custom logger that must implement `logging.LoggerInterface` as described in the `go-toolkit` repo. | nil |
| LoggerConfig | Struct `logging.LoggerOptions` that allows you to customize the SDK's own logger. | See LoggerOptions section. |
| OperationMode | Defines how the SDK synchronizes and stores its data. Four operation modes are currently supported: <br />*&nbsp;`inmemory-standalone`<br />*&nbsp;`redis-consumer`<br />*&nbsp;`localhost` | `inmemory-standalone` |
| Redis | Describes the Redis connection information (host, port, etc.) and allows you to specify a prefix to avoid conflicts with other SDKs. | See Redis section. |
| SplitFile | Filename to be used when operating in `localhost` mode. | `.splits` within the user's home folder |
| TaskPeriods | Embedded struct that allows the developer to choose how frequently each synchronization task is run. | See TaskPeriods section. |
| IPAddressesEnabled | Flag to disable IP addresses and host name from being sent to the Harness servers.  | true |
| ImpressionsMode | Defines how impressions are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG.  In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, all impressions are queued and sent to Harness; this is useful for validations. Use DEBUG mode when you want every impression to be logged in Harness FME when trying to debug your SDK setup.  This setting does not impact the impression listener which receives all generated impressions locally. | `optimized` |

The SDK factory receives two arguments, the API key and a pointer to a configuration structure.

In most of our examples, we pass `nil` to use the default values. If we want to customize the SDK parameters we need to pass in the appropriate struct.

To set each of the parameters defined above, use the following syntax. Use this syntax as an example of how to pass in a custom config.

Note that we are not instantiating the struct on our own, but rather calling a `conf.Default()` method, which returns a valid configuration that you can then tailor to your specific needs.

```go title="Go"
import (
	"fmt"
	"github.com/splitio/go-client/splitio/client"
	"github.com/splitio/go-client/splitio/conf"
	"github.com/splitio/go-toolkit/logging"
)
 
func main() {
	sdkConf := conf.Default()
	sdkConf.LoggerConfig.LogLevel = logging.LevelInfo
	factory, err := client.NewSplitFactory("YOUR_SDK_KEY", sdkConf)
  
  // ...
}
```

### Advanced configuration

These options are available under the `Advanced` property of the main configuration structure.

| **Field name(s)** | **Description** | **Default value** |
| --- | --- | --- | 
| HTTPTimeout | Timeout for HTTP calls in seconds. | 30 |
| SegmentQueueSize | Number of segments that can be queued for update (set to something greater than the number of segments your org has) | 500 |
| SegmentWorkers | Number of background tasks for updating segments. Set in conjunction with `SegmentQueueSize` based on the number of segments you have defined. | 10 |
| ImpressionListener | Custom implementation of impression listener interface. | nil |
| EventsBulkSize  | Number of events to send per post. | 1000 |
| EventsQueueSize | Max number of events in the queue. Only in memory mode. | 10000 |
| ImpressionsQueueSize | Max number of impressions in the queue. Only in memory mode. | 10000 |
| StreamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | true |
| FlagSetsFilter | This setting allows the SDK to only synchronize the feature flags in the specified flag sets, avoiding unused or unwanted flags from being synced on the SDK instance, bringing all the benefits from a reduced payload. | empty |

```go title="Go"
import (
	"fmt"
	"github.com/splitio/go-client/splitio/client"
	"github.com/splitio/go-client/splitio/conf"
	"github.com/splitio/go-toolkit/logging"
)

func main() {
	sdkConf := conf.Default()
	sdkConf.LoggerConfig.LogLevel = logging.LevelInfo
    cfg.Advanced.FlagSetsFilter = []string{"backend", "server_side"}
	factory, err := client.NewSplitFactory("YOUR_SDK_KEY", sdkConf)

  // ...
}
```

### Logger configuration

These options customize the logger used by the SDK by default `"github.com/splitio/go-toolkit/logging"`.

| **Field name(s)** | **Description** | **Default value** |
| --- | --- | --- | 
|  &nbsp;ErrorWriter<br />&nbsp;WarningWriter<br />&nbsp;InfoWriter<br />&nbsp;DebugWriter<br />&nbsp;VerboseWriter | Each log-level has its own writer (a struct implementing Go's default interface `io.Writer`), meaning each level can be forwarded to a output stream. | By default all levels are configured to use Go's `os.Stdout` to output messages. |
| LogLevel | Minimum log level that makes it to its writer. Use constants defined in github.com/splitio/go-toolkit/logging: <br />&nbsp;`logging.LevelError`<br />&nbsp;`logging.LevelWarning`<br />&nbsp;`logging.LevelInfo`<br />&nbsp;`logging.LevelDebug`<br />&nbsp;`logging.LevelVerbose` | `logging.LevelError` |

### Redis configuration

`redis-consumer` operation mode depends on Redis to function as the name suggests.

The SDK configuration has the embedded struct `.Redis` where you can set up all of the parameters related to the Redis connection.

| **Field name(s)** | **Description** | **Default value** |
| --- | --- | --- | 
| Host | Hostname where the Redis instance is. | localhost  | 
| Port | HTTP port to be used in the connection | 6379  | 
| Database | Numeric database to be used | 0 | 
| Password | Redis cluster password. Leave empty if no password is used. | "" | 
| Prefix | Best practice is to use a prefix in case the Redis instance is shared by many SDKs. | "" | 
| TLSConfig | TLS configuration structure (ref: https://golang.org/pkg/crypto/tls/#Config) | False

```go title="Go"
func main() {
	cfg := conf.Default()
	cfg.Redis.Host = "localhost"
	cfg.Redis.Prefix = "go"
	cfg.OperationMode = "redis-consumer"
	factory, err := client.NewSplitFactory("YOUR_SDK_KEY", cfg)
	if err != nil {
		fmt.Printf("SDK init error: %s\n", err)
		return
	}

	splitClient := factory.Client()
	err = splitClient.BlockUntilReady(10)
	if err != nil {
		fmt.Printf("SDK timeout: %s\n", err)
		return
	}
	// ...
}
```

### Task periods

When running in `inmemory-standalone` the SDK uses synchronization tasks that run in the background to keep the feature flags up to date and post impressions to the backend.
This configuration structure can be used to change the execution period of each of those tasks.

| **Field name(s)** | **Description** | **Default value** |
| --- | --- | --- | 
| *&nbsp;SplitSync<br />*&nbsp;SegmentSync<br />*&nbsp;ImpressionSync<br />*&nbsp;GaugeSync<br />*&nbsp;CounterSync<br />*&nbsp;LatencySync<br />*&nbsp;EventsSync | All of these parameters change the time to wait between subsequent executions of each task. | 30 | 

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (also known as off-the-grid mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the feature flags. To use the SDK in localhost mode, you must replace the API key with localhost value.

With this mode, you can instantiate the SDKS using one of the following methods:

* JSON: Full support, for advanced cases or replicating an environment by pulling rules from Harness FME servers (from version `v6.3.0`).
* YAML: Supports dynamic configs, individual targets, and default rules (from version `4.0.0`).
* .split: Legacy option, only treatment result.

### JSON

Since version `v6.3.0`, our SDK supports localhost mode by using the JSON format. This version allows the user to map feature flags and segment definitions in the same format as the APIs receive the data.

This new mode needs extra configuration to be set

| **Name** | **Description** | **Type** |
| --- | --- | --- |
| splitFile | Indicates the path of the split file location to read | string |
| segmentDirectory | Indicates the path where all the segment files are located | string |
| localhostRefreshEnabled | Flag to run synchronization refresh for feature flags and segments in localhost mode. | bool |

#### splitFile

The following splitFile is a JSON that represents a SplitChange:

<Tabs>
<TabItem value="SplitChange Schema">
```go
type SplitChangesDTO struct {
	Till   int64      `json:"till"`
	Since  int64      `json:"since"`
	Splits []SplitDTO `json:"splits"`
}
```
</TabItem>
<TabItem value="Split Schema">
```go
type SplitDTO struct {
	ChangeNumber          int64             `json:"changeNumber"`
	TrafficTypeName       string            `json:"trafficTypeName"`
	Name                  string            `json:"name"`
	TrafficAllocation     int               `json:"trafficAllocation"`
	TrafficAllocationSeed int64             `json:"trafficAllocationSeed"`
	Seed                  int64             `json:"seed"`
	Status                string            `json:"status"`
	Killed                bool              `json:"killed"`
	DefaultTreatment      string            `json:"defaultTreatment"`
	Algo                  int               `json:"algo"`
	Conditions            []ConditionDTO    `json:"conditions"`
	Configurations        map[string]string `json:"configurations"`
}
```
</TabItem>
<TabItem value="JSON example">
```json
{
  "splits": [
    {
      "trafficTypeName": "user",
      "name": "feature_flag_1",
      "trafficAllocation": 100,
      "trafficAllocationSeed": -1364119282,
      "seed": -605938843,
      "status": "ACTIVE",
      "killed": false,
      "defaultTreatment": "off",
      "changeNumber": 1660326991072,
      "algo": 2,
      "configurations": {},
      "conditions": [
        {
          "conditionType": "ROLLOUT",
          "matcherGroup": {
            "combiner": "AND",
            "matchers": [
              {
                "keySelector": {
                  "trafficType": "user",
                  "attribute": null
                },
                "matcherType": "IN_SEGMENT",
                "negate": false,
                "userDefinedSegmentMatcherData": {
                  "segmentName": "segment_1"
                },
                "whitelistMatcherData": null,
                "unaryNumericMatcherData": null,
                "betweenMatcherData": null,
                "booleanMatcherData": null,
                "dependencyMatcherData": null,
                "stringMatcherData": null
              }
            ]
          },
          "partitions": [
            {
              "treatment": "on",
              "size": 0
            },
            {
              "treatment": "off",
              "size": 100
            }
          ],
          "label": "in segment segment_1"
        },
        {
          "conditionType": "ROLLOUT",
          "matcherGroup": {
            "combiner": "AND",
            "matchers": [
              {
                "keySelector": {
                  "trafficType": "user",
                  "attribute": null
                },
                "matcherType": "ALL_KEYS",
                "negate": false,
                "userDefinedSegmentMatcherData": null,
                "whitelistMatcherData": null,
                "unaryNumericMatcherData": null,
                "betweenMatcherData": null,
                "booleanMatcherData": null,
                "dependencyMatcherData": null,
                "stringMatcherData": null
              }
            ]
          },
          "partitions": [
            {
              "treatment": "on",
              "size": 50
            },
            {
              "treatment": "off",
              "size": 50
            }
          ],
          "label": "default rule"
        }
      ]
    }
  ],
  "since": -1,
  "till": 1660326991072
}
```
</TabItem>
</Tabs>

#### segmentDirectory

The provided segment directory must have the JSON files of the corresponding segment linked to previous feature flag definitions. According to the Split file sample above, `feature_flag_1` has `segment_1` linked. That means that the segmentDirectory needs to have `segment_1` definition.

<Tabs>
<TabItem value="SegmentChange Schema">
```go
type SegmentChangesDTO struct {
	Name    string   `json:"name"`
	Added   []string `json:"added"`
	Removed []string `json:"removed"`
	Since   int64    `json:"since"`
	Till    int64    `json:"till"`
}
```
</TabItem>
<TabItem value="JSON example">
```json
{
  "name": "segment_1",
  "added": [
    "example1",
    "example2"
  ],
  "removed": [],
  "since": -1,
  "till": 1585948850110
}
```
</TabItem>
</Tabs>

```go title="Init example"
sdkConf := conf.Default()
sdkConf.SplitFile = "./splitChange.json"
sdkConf.SegmentDirectory = "./segments"
factory, err := client.NewSplitFactory("localhost", sdkConf)
```

### YAML

Since version `4.0.0`, our SDK supports a type of localhost feature flag definition file that uses the YAML format. This new format allows the user to map different keys to different treatments within a single feature flag and also add configurations to them. The format is a list of single-key maps (one per mapping split-keys-config) which is defined as follows:

```yaml title="YAML"
# - feature_flag_name:
#     treatment: "treatment_applied_to_this_entry"
#     keys: "single_key_or_list"
#     config: "{\"desc\" : \"this applies only to ON treatment\"}"

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
 * The fourth entry shows how an example overrides a treatment for a set of keys.

Use the SplitConfigBuilder object to set the location of the Split localhost YAML file as shown in the example below:

```go title="Init example"
sdkConf := conf.Default()
sdkConf.SplitFile = "./splits.yaml"
factory, err := client.NewSplitFactory("localhost", sdkConf)
```

### .SPLIT file

```go title="Go"
sdkConf := conf.Default()
factory, err := client.NewSplitFactory("localhost", sdkConf)
```

In this mode, the SDK loads a mapping of feature flag name to treatment from a file at `$HOME/.split`. For a given flag, the treatment specified in the file is returned for every customer. 

`getTreatment` calls for a feature flag and only returns the one treatment that you defined in the file. You can then change the treatment as necessary for your testing in the file. Any feature flag that is not provided in the `featureFlag` map returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment) if the SDK is asked to evaluate them.

The format of this file is two columns separated by a whitespace. The left column is the feature flag name and the right column is the treatment name. The following is a sample `.split` file:

```bash title="Shell"
reporting_v2 on ## sdk.getTreatment(*, reporting_v2) will return 'on'

double_writes_to_cassandra off

new-navigation v3
```

## Manager
 
Use the Split Manager to get a list of feature flags available to the SDK factory client. 

To instantiate a Manager in your code base, use the same factory that you used for your client.

```go title="Go"
package main
 
import (
	"fmt"
	"github.com/splitio/go-client/splitio/client"
)
 
func main() {
	factory, err := client.NewSplitFactory("YOUR_SDK_KEY", nil)
	if err != nil {
		fmt.Printf("SDK init error: %s\n", err)
		return
	}
  
	manager := factory.Manager()
  
  // ...
}
```

The Manager then has the following methods available.

```go title="Manager Interface"
// Returns the names of all the feature flags in storage
SplitNames() []string
// Returns a partial view of all feature flags in the storage
Splits() []SplitView
// Returns a partial view of a single feature flag given it's name
Split(featureFlagName string) *SplitView
```

The `SplitView` object that you see referenced above has the following structure.

```go title="SplitView"
type SplitView struct {	
	Name                string                 `json:"name"`
	TrafficType         string                 `json:"trafficType"`
	Killed              bool                   `json:"killed"`
	Treatments          []string               `json:"treatments"`
	ChangeNumber        int64                  `json:"changeNumber"`
	Configs             map[string]string      `json:"configs"`
	DefaultTreatment    string                 `json:"defaultTreatment"`
	Sets                []string               `json:"sets"`
  ImpressionsDisabled bool                   `json:"impressionsDisabled"`
}
```

## Listener

FME SDKs send impression data back to Harness servers periodically when evaluating feature flags. To send this information to a location of your choice, define and attach an *impression listener*. Use the SDK's `impressionListener` parameter, where you can add an implementation of `ImpressionListener`. This implementation **must** define the `LogImpression` method. It receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| Impression | Impression | Impression object that has the feature flag name, treatment result, label, etc. |
| Attributes | map[string]interface{} | A list of attributes passed by the client. |
| InstanceID | string | The IP address of the machine running the SDK. |
| SDKLanguageVersion | string | The version of the SDK. In this case the language is `go` plus the version. |

## Implement a custom impression listener

Here is an example of how implement a custom impression listener.

```go title="Custom listener example"
// Import ImpressionListener interface
import (
  "github.com/splitio/go-client/splitio/impressionListener"
)

// Implementation Sample for a Custom Impression Listener
type CustomImpressionListener struct {
}

func (i *CustomImpressionListener) LogImpression(data impressionlistener.ILObject) {
  // Custom behavior
}
```

## Attach a custom impression listener

Here is an example of how to implement a custom impression listener.

```go title="Attach a listener"
import (
  "github.com/splitio/go-client/splitio/client"
)

func main() {
  customImpressionListener := &CustomImpressionListener{}
  sdkConf := conf.Default()
  sdkconf.Advanced.ImpressionListener = customImpressionListener
  factory, err := client.NewSplitFactory("YOUR_SDK_KEY", sdkConf)
 
  // ...
}
```

## Logging
 
SDK is intended to be embedded in other applications, so our logging should be the least intrusive possible. You can either supply your own logger (as long as it is wrapped in an adapter implementing the logger interface defined in our go-toolkit repo/logging package) or can use the SDK's own logger configuring its minimum `loglevel` and a writer for each of the levels.

:::info[Note]
By default, only error-level messages are logged, and all writer outputs are set to `os.Stdout`.
:::

### Custom logging

To use a custom logger, implement the interface `LoggingInterface` from the `logging` package located in the `go-toolkit` repo, which is defined as follows.
```go title="Go"
type LoggerInterface interface {
	Error(msg ...interface{})
	Warning(msg ...interface{})
	Info(msg ...interface{})
	Debug(msg ...interface{})
	Verbose(msg ...interface{})
}
```

Below is an example of an HTTP logger sending messages to a server.

:::info[Note]
It is the developer's responsibility to ensure that this logger's methods do not panic, and to handle logging levels if a custom logger is user. 
:::

```go title="Go"
type HttpLogger struct {
	url   string
	level int
}
 
// Generic function to be used by different log levels to send messages
func (l *HttpLogger) log(messages []string) {
	// blocking call to send messages via http
}
 
func (l *CustomLogger) Debug(msgs ...interface{}) {
	if l.level < constants.DebugLevel { // constants defined by user
		return
	}
	var messages []string
	for _, msg := range msgs {
		str, conv := msg.(string)
		if conv {
			messages = append(messages, str)
		}
	}
	go log(messages) // async call to avoid blocking the SDK 
}
 
// Should implement Error, Warning, Info, Debug, Verbose.
// All with the same signature.
 
func main() {
  sdkConf := conf.Default()
  sdkConf.Logger = &HttpLogger{url: "http://mylogs.io/"}
  factory, err := client.NewSplitFactory("YOUR_SDK_KEY", sdkConf)
  
  // ...
}
```

### SDK logging

In this example, we use our logging library's FileRotateWriter for the **Error** log level, which outputs logging messages to a file pattern until a max file size is reached, then switching to a new a file.

```go title="Go"
	var errorWriter io.Writer
	errorWriter, err := logging.NewFileRotate(&logging.FileRotateOptions{
		BackupCount: 2,
		MaxBytes:    1000000,
		Path:        os.Getenv("HOME") + "/splitErrors.log",
	})
 
	if err != nil {
		fmt.Println("Error while instantiating writer, will fallback to stderr")
		fmt.Println(err)
		errorWriter = os.Stderr
	}
 
  sdkConf := conf.Default()
  sdkConf.LoggerConfig.LogLevel = logging.LevelInfo
  sdkConf.LoggerConfg.ErrorWriter = errorWriter,
  factory, err := client.NewSplitFactory("YOUR_SDK_KEY", sdkConfg)
	// ...
```

## Proxy
 
If you need to use a proxy, you can configure proxies by setting the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. The SDK reads those variables and uses them to perform the server request.

```go title="Example: Environment variables"
$ export HTTP_PROXY="http://10.10.1.10:3128"
$ export HTTPS_PROXY="http://10.10.1.10:1080"
```
