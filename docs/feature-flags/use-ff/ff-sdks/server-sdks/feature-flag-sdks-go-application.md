---
title: Go SDK reference
description: This topic explains how to integrate your feature flags with Go SDK.
sidebar_position: 20
helpdocs_topic_id: 4c8wljx60w
helpdocs_category_id: kkiqy1f6d7
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/server-sdks/feature-flag-sdks-go-application
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpyes from '../shared/note-smp-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpyes />


This topic describes how to use the Harness Feature Flags Go SDK for your Go application. 

For getting started quickly, you can use our [sample code from the SDK README](https://github.com/harness/ff-golang-server-sdk). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [Go SDK GitHub Repository.](https://github.com/harness/ff-golang-server-sdk)

## Before you begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-golang-server-sdk/releases)

## Requirements

To use this SDK, make sure you:

- Starting with SDK version v0.1.21, Golang version 1.20 or later is required.
- Earlier versions of the SDK require Golang versions newer than 1.6 but older than 1.19.
- For installation details, please refer to [Golang's official installation guide](https://go.dev/doc/install).
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-golang-server-sdk)
* Create a Go application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-golang-server-sdk/blob/main/examples/getting_started.go).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key).

## Install the SDK

Install the SDK using the following Go command:


```
go get github.com/harness/ff-golang-server-sdk
```
## Import the SDK

Import the SDK using the following Go command: 


```
import harness "github.com/harness/ff-golang-server-sdk/client"
```
## Initialize the SDK

To initialize the Go SDK, you need to:

1. Add your Server SDK Key to connect to your Harness Environment.
2. (Optional) Configure the SDK options. For more details on what features you can configure for this SDK, go to [Configure the SDK](feature-flag-sdks-go-application.md#configure-the-sdk).
3. Complete the initialization by creating an instance of the Feature Flag client and  passing in the Server SDK Key and Configuration.
4. Add a Target that you want to Evaluate against a Feature Flag.

### Add the Server SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Server SDK Key from that Environment. Input the Server SDK Key into the `sdkKey` parameter. For example:


```
client, err := harness.NewCfClient(sdkKey)
```
### Configure the SDK

You can configure the following features of the SDK:



|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Example** | **Description** | **Default Value** |
| baseUrl | `harness.WithURL("https://config.ff.harness.io/api/1.0")` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://config.ff.harness.io/api/1.0` |
| eventUrl | `harness.WithEventsURL("https://events.ff.harness.io/api/1.0")` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |
| pollInterval | `harness.WithPullInterval(60))` | The interval **in seconds** that we poll for changes when you are using stream mode. | `60 (seconds)` |
| streamEnabled | `harness.WithStreamEnabled(false)` | Set to `true` to enable streaming mode.Set to `false` to disable streaming mode. | `true` |
| analyticsEnabled | `harness.WithAnalyticsEnabled(false)` | Set to `true` to enable analytics.Set to `false` to disable analytics.**Note**: Analytics are not cached. | `true` |

For further configuration options and samples, such as configuring your logger or using the SDK with the Relay Proxy, go to [Additional Options](feature-flag-sdks-go-application.md#additional-options).

### Complete the initialization

Complete  the initialization by creating an instance of the Feature Flag client and passing in the `sdkKey`, and any configuration options. For example:


```
// Create Options  
client, err := harness.NewCfClient(myApiKey,   
 harness.WithURL("https://config.ff.harness.io/api/1.0"),   
 harness.WithEventsURL("https://events.ff.harness.io/api/1.0"),   
 harness.WithPullInterval(1),  
 harness.WithStreamEnabled(false))
```
### Block initialization 

By default, when initializing the Harness Feature Flags client, the initialization process is non-blocking. This means that the client creation call returns immediately,
allowing your application to continue its startup process without waiting for the client to be fully initialized. If you evaluate a flag before the client has finished initializing,
the default variation you provided can be returned as the evaluation result, because the SDK has not finished caching your remote Flag configuration stored in Harness.

You can choose to wait for the client to finish initializing before continuing. To achieve this, you can use the `WithWaitForInitialized` option, which blocks until the client is fully initialized. Example usage:

```go
client, err := harness.NewCfClient(sdkKey, harness.WithWaitForInitialized(true))

if err != nil {
log.ErrorF("could not connect to FF servers %s", err)
}

result, err := client.BoolVariation("identifier_of_your_boolean_flag", &target, false)
```


In this example, WaitForInitialized blocks for up to 5 authentication attempts. If the client is not initialized within 5 authentication attempts, it returns an error.

This can be useful if you need to unblock after a certain time.

```go
// Try to authenticate only 5 times before returning a result
client, err := harness.NewCfClient(sdkKey, harness.WithWaitForInitialized(true), harness.WithMaxAuthRetries(5))

if err != nil {
log.Fatalf("client did not initialize in time: %s", err)
}
```

### Add a target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).


To add a Target, build it and pass in arguments for the following:



|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| `Identifier` | Unique ID for the Target.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Required | `Identifier: "HT_1"` |
| `Name` | Name for this Target. This does not have to be unique. **Note**: If you don’t provide a value, the name will be the same as the identifier.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Optional**Note**: If you don't want to send a name, don't send the parameter. Sending an empty argument will cause an error. |  `Name: "Harness_Target_1"` |
| `Attributes` | Additional data you can store for a Target, such as email addresses or location. | Optional | `Attributes: &map[string]interface{}{"email":"demo@harness.io"},` |

<details>
<summary> Regex requirements for Target names and identifiers </summary>

**Identifier** 

Regex: `^[A-Za-z0-9.@_-]*$`  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
  
The characters can be lowercase or uppercase but cannot include accented letters, for example `Cafe_789`.  
  
**Name**
Regex: `^[\\p{L}\\d .@_-]*$`  
  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
 (space)  
  
The characters can be lowercase or uppercase and can include accented letters, for example `Café_123`.

</details>

For example:

#### Create a Target


```
target2 := evaluation.Target{  
 Identifier: "HT_1",  
 Name: "Harness_Target_1",  
 Attributes: &map[string]interface{}{"email":"demo@harness.io"},  
}
```
#### Create a Target with the builder

If you create a Target with the builder, use `Custom` instead of `Attributes`.


```
target := dto.NewTargetBuilder("HT_1").  
 Name("Harness_Target_1").  
 Custom("email", "demo@harness.io").  
 Build()
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. This will be indicated by:

1. The SDK will log an `info` level log that the default variation was returned.
2. Evaluation calls will return an `error` as well as the default variation that you can handle.

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The Target object you want to evaluate against
* The default Variation

For example:

### Evaluate a string Variation


```
client.StringVariation(flagName, &target, "default_string")
```
### Evaluate a boolean Variation


```
showFeature, err := client.BoolVariation(featureFlagKey, &target, false)
```
### Evaluate a number Variation


```
client.NumberVariation(flagName, &target, -1)
```
### Evaluate a JSON Variation


```
client.JSONVariation(flagName, &target, types.JSON{"darkmode": false})
```

:::note

If you evaluate a feature flag when initialization fails, the default variation you provided is returned as the evaluation result.

:::

## Test Your App is Connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />

To close the SDK client:

* Assuming you have initialized an SDK client instance named `client`, call the following function:

    ```
    client.close()
    ```

## Additional options

### Configure your logger

The SDK has a default logger, however, you can provide your own logger to the SDK by passing it in as a configuration option. 

For example, the following creates an instance of the logrus logger and passes it in as a configuration option:


```
logger := logrus.New()  
logger.SetLevel(logrus.ErrorLevel)  
  
 // Create a feature flag client  
client, err := harness.NewCfClient(sdkKey, harness.WithLogger(logger))
```
### Use the Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/use-ff/relay-proxy/) you need to change the default URL and events URL to `http://localhost:7000` when initializing the SDK. For example:


```
client, err := harness.NewCfClient(apiKey,  
harness.WithURL("http://localhost:7000"),  
harness.WithEventsURL("http://localhost:7000"))
```

### Configure your HTTP Client

The SDK has a default HTTP client, however, you can provide your own HTTP client to the SDK by passing it in as a configuration option.

For example, the following creates an HTTP client using custom CAs for Harness Self-Managed Enterprise Edition (on premises).

```
// Create a custom TLS configuration
tlsConfig := &tls.Config{
    RootCAs: certPool,
}

transport := &http.Transport{
    TLSClientConfig: tlsConfig,
}

httpClient := http.Client{Transport: transport}
	client, err := harness.NewCfClient(apiKey, 
	    harness.WithEventsURL("https://ffserver:8003/api/1.0"), 
	    harness.WithURL("https://ffserver:8003/api/1.0"), 
	    harness.WithHTTPClient(&httpClient))

```

For a full example of providing custom CAs for Harness Self-Managed Enterprise Edition, see our [TLS Example](https://github.com/harness/ff-golang-server-sdk/blob/main/examples/tls/example.go)

## Sample code for a Go application

Here is a sample code for integrating with the Go SDK:


```
package main  
  
 import (  
         "context"  
         "fmt"  
         "log"  
         "time"  
   
         harness "github.com/harness/ff-golang-server-sdk/client"  
         "github.com/harness/ff-golang-server-sdk/dto"  
         "github.com/sirupsen/logrus"  
)  
  
 const sdkKey = "your SDK key"  
  
 const featureFlag = "harnessappdemodarkmode"  
  
 func main() {  
  
        logger := logrus.New()  
        logger.SetLevel(logrus.ErrorLevel)  
      
        client, err := harness.NewCfClient(myApiKey,   
                 harness.WithURL("https://config.ff.harness.io/api/1.0"),   
                 harness.WithEventsURL("https://events.ff.harness.io/api/1.0”),   
                 harness.WithPullInterval(1),  
                 harness.WithLogger(logger),  
                 harness.WithStreamEnabled(false)  
)  
  
        defer func() {  
               if err := client.Close(); err != nil {  
                     log.Printf("error while closing client err: %v", err)  
               }  
         }()  
  
        if err != nil {  
                 log.Printf("could not connect to CF servers %v", err)  
         }  
  
        target := dto.NewTargetBuilder("HT_1").  
                 Name("Harness_Target_1").  
                 Custom("email", "demo@harness.io").  
                 Build()  
      
        ctx, cancel := context.WithCancel(context.Background())  
  
         go func() {  
                 for {  
                        select {  
                         case <-ctx.Done():  
                                 return  
                         default:  
                                 showFeature, err :=     client.BoolVariation(featureFlag, &target, false)  
  
                                  if err != nil {  
                                        fmt.Printf("Error getting value: %v", err)  
                                  }  
  
                                  fmt.Printf("KeyFeature flag '%s' is %t for this user\n", featureFlag, showFeature)  
                      time.Sleep(10 * time.Second)  
                 }  
             }  
        }()  
  
        time.Sleep(5 * time.Minute)  
        cancel()  
}
```

## Troubleshooting
The SDK logs the following codes for certain lifecycle events, for example authentication, which can aid troubleshooting.

| **Code** | **Description**                                                                                               | **Log Level** |
|----------|:--------------------------------------------------------------------------------------------------------------|---------------|
| **1000** | Successfully initialized                                                                                      | Info          |
| **1001** | Failed to initialize due to authentication error                                                              | Error         |
| **1002** | Failed to initialize due to a missing or empty API key                                                        | Error         |
| **1003** | `WaitForInitialization` configuration option was provided and the SDK is waiting for initialization to finish | Info          |
| **2000** | Successfully authenticated                                                                                    | Info          |
| **2001** | Authentication failed with a non-recoverable error                                                            | Error         |
| **2002** | Authentication failed and is retrying                                                                         | Warn          |
| **2003** | Authentication failed and max retries have been exceeded                                                      | Error         |
| **3000** | SDK closing                                                                                                   | Info          |
| **3001** | SDK closed successfully                                                                                       | Info          |
| **4000** | Polling service started                                                                                       | Info          |
| **4001** | Polling service stopped                                                                                       | Info          |
| **5000** | Streaming connected                                                                                           | Info          |
| **5001** | Streaming disconnected                                                                                        | Warn          |
| **5002** | Streaming event received                                                                                      | Debug         |
| **5003** | Streaming disconnected and is retrying to connect                                                             | Info          |
| **5004** | Streaming service stopped                                                                                     | Info          |
| **6000** | Evaluation was successful                                                                                     | Debug         |
| **6001** | Evaluation failed and the default value was returned                                                          | Info          |
| **7000** | Metrics service has started                                                                                   | Info          |
| **7001** | Metrics service has stopped                                                                                   | Info          |
| **7002** | Metrics posting failed                                                                                        | Warn          |
| **7003** | Metrics posting success                                                                                       | Debug         |
| **7004** | Metrics max target size exceeded                                                                              | Warn          |
| **7007** | Metrics max evaluation size reached                                                                           | Warn          |
