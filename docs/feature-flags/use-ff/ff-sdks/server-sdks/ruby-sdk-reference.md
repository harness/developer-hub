---
title: Ruby SDK reference
description: This topic explains how to use the Harness Feature Flags (FF) SDK in your Ruby application.
sidebar_position: 80
helpdocs_topic_id: uora4f0f22
helpdocs_category_id: kkiqy1f6d7
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/server-sdks/ruby-sdk-reference
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpyes from '../shared/note-smp-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpyes />


This topic describes how to use the Harness Feature Flags Ruby SDK for your Java application.

For getting started quickly, you can use our [sample code from the Ruby SDK README](https://github.com/harness/ff-ruby-server-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [Ruby SDK GitHub Repository.](https://github.com/harness/ff-ruby-server-sdk)

## Before you begin

You should read and understand the following:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-ruby-server-sdk/releases)

## Requirements

To use this SDK, make sure you:  

* Install [Ruby 2.7](https://www.ruby-lang.org/en/documentation/installation/) or newer
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-ruby-server-sdk)
* Create a Java application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-ruby-server-sdk).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`
* [Create an SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key)

## Install the SDK

Install the Ruby SDK using gem, for example:


```
gem install harness-featureflags
```
Or by adding the following snippet to your project's `Gemfile` file:


```
gem "ff-ruby-server-sdk"
```
## Clone the SDK Repository

Run the following command to clone the Feature Flag SDK repository:


```
git clone --recurse-submodules git@github.com:harness/ff-ruby-server-sdk.git
```
## Initialize the SDK

To initialize the Go SDK, you need to:

1. Add your Server SDK Key to connect to your Harness Environment.
2. (Optional) Configure the SDK options.
3. Pass in the Server SDK Key and configuration options.
4. Add a Target that you want to Evaluate against a Feature Flag.

### Add the Server SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Server SDK Key from that Environment. For example:


```
key = "YOUR_API_KEY_GOES_HERE"
```
### Configure the SDK

You can configure the following features of the SDK:



|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Example** | **Description** | **Default Value** |
| baseUrl | `config_url("https://config.ff.harness.io/api/1.0")` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://config.ff.harness.io/api/1.0` |
| eventUrl | `event_url("https://events.ff.harness.io/api/1.0")` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |
| pollInterval | `poll_interval_in_seconds(60)` | The interval **in seconds** that we poll for changes when you are using stream mode. | `60` (seconds) |
| streamEnabled | `stream_enabled(true)` | Set to `true` to enable streaming mode.Set to `false` to disable streaming mode. | `true` |
| analyticsEnabled | `analytics_enabled(true)` | Set to `true` to enable analytics.Set to `false` to disable analytics.**Note**: When enabled, analytics data is posted every 60 seconds. | `true` |

For further configuration options and samples, such as configuring your logger or using the SDK with the Relay Proxy, go to [Additional Options](feature-flag-sdks-go-application.md#additional-options).

### Complete the initialization

Complete  the initialization by creating an instance of the Feature Flag client and passing in the Server SDK Key and any configuration options. For example:


```
client.init(key, config)
```
### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).

To add a Target, build it and pass in arguments for the following:



|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| `identifier` | Unique ID for the Target.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Required | `identifier="HT_1"` |
| `name` | Name for this target. This does not have to be unique. **Note**: If you don’t provide a value, Harness generates the name based on the ID. Read **Regex requirements for target names and identifiers** below for accepted characters. | Optional **Note**: If you don't want to send a name, don't send the parameter. Sending an empty argument causes an error. | `("Harness_Target_1")` |
| `attributes` | Additional data you can store for a Target, such as email addresses or location. | Optional | `attributes={"email": "demo@harness.io"})` |

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


```
target = Target.new("Harness_Target_1", identifier="HT_1", attributes={"email": "demo@harness.io"})
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The Target object you want to evaluate against
* The default Variation

For example:

### Evaluate a string Variation


```
def string_variation(identifier, target, default_value)
```
### Evaluate a boolean Variation


```
def bool_variation(identifier, target, default_value)
```
### Evaluate a number Variation


```
def number_variation(identifier, target, default_value)
```
### Evaluate a JSON Variation


```
def json_variation(identifier, target, default_value)
```
## Test your app is connected to Harness

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

### Use the Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/use-ff/relay-proxy/) you need to change the default URL and events URL to `http://localhost:7000` when initializing the SDK. For example:


```
config = ConfigBuilder.new  
                      .config_url("https://config.feature-flags.uat.harness.io/api/1.0")  
                      .event_url("https://event.feature-flags.uat.harness.io/api/1.0")  
                      .build
```
## Use our public API methods

Our Public API exposes the following methods that you can use for instantiating, initializing, and closing the SDK:


```
def initialize(api_key = nil, config = nil, connector = nil)
```

```
def init(api_key = nil, config = nil, connector = nil)
```

```
def wait_for_initialization
```

```
def close
```
## Sample code for a Ruby application

Here is a sample code for using the Feature Flag Ruby SDK:


```
require "logger"  
require "securerandom"  
  
require_relative '../lib/ff/ruby/server/sdk/dto/target'  
require_relative '../lib/ff/ruby/server/sdk/api/config'  
require_relative '../lib/ff/ruby/server/sdk/api/cf_client'  
require_relative '../lib/ff/ruby/server/sdk/api/config_builder'  
  
flag_b = "flag1"  
flag_n = "flag2"  
flag_s = "flag3"  
flag_j = "flag4"  
  
clients = {}  
targets = {}  
  
logger = Logger.new(STDOUT)  
  
executor = Concurrent::FixedThreadPool.new(100)  
  
keys = {  
  
  "Freemium" => "1f3339b4-e004-457a-91f7-9b5ce173eaaf",  
  "Non-Freemium" => "a30cf6aa-67f2-4545-8ac7-f86709f4f3a0"  
}  
  
keys.each do |name, key|  
  
  targets[name] = Target.new("ruby_target_" + name)  
  
  config = ConfigBuilder.new  
                        .logger(logger)  
                        .build  
  
  client = CfClient.new(key, config)  
  
  # .config_url("https://config.feature-flags.uat.harness.io/api/1.0")  
  # .event_url("https://event.feature-flags.uat.harness.io/api/1.0")  
  
  client.init  
  
  config.logger.debug "We will wait for the initialization"  
  
  client.wait_for_initialization  
  
  config.logger.debug "Initialization is complete"  
  
  clients[name] = client  
end  
  
iterations = 10  
  
counted = 0  
count_to = keys.size * iterations  
  
logger.debug "To count: " + count_to.to_s  
  
keys.each do |name, key|  
  
  client = clients[name]  
  target = targets[name]  
  
  executor.post do  
  
    (1..iterations).each do |iteration|  
  
      logger.debug name + " :: iteration no: " + iteration.to_s  
  
      bool_result = client.bool_variation(flag_b, target, false)  
      number_result = client.number_variation(flag_n, target, -1)  
      string_result = client.string_variation(flag_s, target, "unavailable !!!")  
      json_result = client.json_variation(flag_j, target, JSON.parse("{}"))  
  
      logger.debug name + " :: '" + flag_b.to_s + "' has the value of: " + bool_result.to_s  
      logger.debug name + " :: '" + flag_n.to_s + "' has the value of: " + number_result.to_s  
      logger.debug name + " :: '" + flag_s.to_s + "' has the value of: " + string_result.to_s  
      logger.debug name + " :: '" + flag_j.to_s + "' has the value of: " + json_result.to_s  
      logger.debug "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"  
  
      counted = counted + 1  
  
      logger.debug "Counted: " + counted.to_s  
  
      sleep 10  
    end  
  end  
end  
  
while counted != count_to  
  
  sleep(1)  
end  
  
clients.each do |name, client|  
  
  logger.debug name + " :: closing"  
  
  client.close  
end  

```

## Troubleshooting
The SDK logs the following codes for certain lifecycle events, for example authentication, which can aid troubleshooting.

| **Code** | **Description**                                                                          |
|----------|:-----------------------------------------------------------------------------------------|
| **1000** | Successfully initialized                                                                 |
| **1001** | Failed to initialize due to authentication error                                         |
| **1002** | Failed to initialize due to a missing or empty API key                                   |
| **2000** | Successfully authenticated                                                               |
| **2001** | Authentication failed with a non recoverable error                                       |
| **2002** | Authentication failed and is retrying                                                    |
| **2003** | Authentication failed and max retries have been exceeded                                 |
| **4000** | Polling service started                                                                  |
| **4001** | Polling service stopped                                                                  |
| **5000** | Streaming service started                                                                |
| **5001** | Streaming service stopped                                                                |
| **5002** | Streaming event received                                                                 |
| **5003** | Streaming disconnected and is retrying to connect                                        |
| **5004** | Streaming stopped                                                                        |
| **6000** | Evaluation was successfully                                                              |
| **6001** | Evaluation failed and the default value was returned                                     |
| **7000** | Metrics service has started                                                              |
| **7001** | Metrics service has stopped                                                              |
| **7002** | Metrics posting failed                                                                   |
| **7003** | Metrics posting success                                                                  |
